/**
 * FGC Open Scorebars — 100% Pixel-Perfect 1:1 WYSIWYG PNG Export Engine
 * Uses the user's locally installed Chromium/Edge/Chrome browser via native CDP
 * (zero npm dependencies!) so exported PNGs match the live preview & OBS pixel-for-pixel:
 *   - All custom zoom / X / Y / flip framing & element layout overrides
 *   - All 4:5 vertical & 16:9 broadcast layouts, Top 12, Matchups 2x2, Pools, Pool Tree, Top 16
 *   - All SVG flags, SVG bracket wires, CSS clip-paths, backdrops & Custom PC Fonts!
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

let cachedBrowserPath = undefined;
export function findChromiumExecutable() {
  if (cachedBrowserPath !== undefined) return cachedBrowserPath;
  const candidates = [];
  if (process.platform === 'win32') {
    const pf86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
    const pf = process.env['ProgramFiles'] || 'C:\\Program Files';
    const local = process.env['LOCALAPPDATA'] || '';
    candidates.push(
      path.join(pf86, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
      path.join(pf, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
      path.join(pf, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(pf86, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      local ? path.join(local, 'Google', 'Chrome', 'Application', 'chrome.exe') : '',
      path.join(pf, 'BraveSoftware', 'Brave-Browser', 'Application', 'brave.exe'),
      local ? path.join(local, 'BraveSoftware', 'Brave-Browser', 'Application', 'brave.exe') : ''
    );
  } else if (process.platform === 'darwin') {
    candidates.push(
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
      '/Applications/Chromium.app/Contents/MacOS/Chromium'
    );
  } else {
    candidates.push(
      '/usr/bin/microsoft-edge',
      '/usr/bin/google-chrome',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium'
    );
  }
  for (const p of candidates) {
    if (p && fs.existsSync(p)) {
      cachedBrowserPath = p;
      return p;
    }
  }
  cachedBrowserPath = null;
  return null;
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address();
      const port = typeof addr === 'object' && addr ? addr.port : 0;
      srv.close(() => resolve(port));
    });
  });
}

class MiniCdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 0;
    this.pending = new Map();
    this.ws = null;
  }
  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('CDP connect timeout')), 8000);
      this.ws.addEventListener('open', () => { clearTimeout(t); resolve(); }, { once: true });
      this.ws.addEventListener('error', (e) => { clearTimeout(t); reject(new Error('CDP WebSocket error')); }, { once: true });
    });
    this.ws.addEventListener('message', (ev) => {
      let msg;
      try { msg = JSON.parse(String(ev.data)); } catch { return; }
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject, timer } = this.pending.get(msg.id);
        clearTimeout(timer);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || 'CDP error'));
        else resolve(msg.result);
      }
    });
    this.ws.addEventListener('close', () => {
      for (const [, p] of this.pending) {
        clearTimeout(p.timer);
        p.reject(new Error('CDP socket closed'));
      }
      this.pending.clear();
    });
  }
  send(method, params = {}, timeoutMs = 15000) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP timeout on ${method}`));
      }, timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  close() {
    try { this.ws?.close(); } catch {}
  }
}

// Warm reusable browser singleton (auto-shuts down after 90s idle to keep RAM at 0 when unused)
let browserProc = null;
let browserPort = 0;
let browserProfileDir = '';
let idleShutdownTimer = null;
let exportQueue = Promise.resolve();

export function shutdownExportBrowser() {
  clearTimeout(idleShutdownTimer);
  idleShutdownTimer = null;
  if (browserProc) {
    try { browserProc.kill('SIGKILL'); } catch {}
    browserProc = null;
  }
  if (browserProfileDir) {
    try { fs.rmSync(browserProfileDir, { recursive: true, force: true }); } catch {}
    browserProfileDir = '';
  }
  browserPort = 0;
}

process.on('exit', shutdownExportBrowser);
process.on('SIGINT', () => { shutdownExportBrowser(); process.exit(0); });
process.on('SIGTERM', () => { shutdownExportBrowser(); process.exit(0); });

function scheduleIdleShutdown() {
  clearTimeout(idleShutdownTimer);
  idleShutdownTimer = setTimeout(() => shutdownExportBrowser(), 90000);
  idleShutdownTimer.unref?.();
}

async function ensureExportBrowser() {
  if (browserProc && !browserProc.killed && browserProc.exitCode === null && browserPort) {
    try {
      const r = await fetch(`http://127.0.0.1:${browserPort}/json/version`);
      if (r.ok) {
        scheduleIdleShutdown();
        return browserPort;
      }
    } catch {}
    shutdownExportBrowser();
  }

  const exe = findChromiumExecutable();
  if (!exe) {
    const err = new Error('NO_BROWSER');
    err.code = 'NO_BROWSER';
    throw err;
  }

  const port = await getFreePort();
  const profileDir = path.join(os.tmpdir(), `fgc-scorebar-png-${process.pid}-${Date.now()}`);
  fs.mkdirSync(profileDir, { recursive: true });

  const proc = spawn(exe, [
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--disable-background-networking',
    '--hide-scrollbars',
    '--mute-audio',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    '--window-size=1920,1080',
    'about:blank'
  ], { stdio: 'ignore' });

  browserProc = proc;
  browserPort = port;
  browserProfileDir = profileDir;
  proc.on('exit', () => {
    if (browserProc === proc) {
      browserProc = null;
      browserPort = 0;
    }
  });

  const t0 = Date.now();
  while (Date.now() - t0 < 12000) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (r.ok) {
        const list = await r.json();
        if (Array.isArray(list) && list.some(t => t.type === 'page' && t.webSocketDebuggerUrl)) {
          scheduleIdleShutdown();
          return port;
        }
      }
    } catch {}
    await sleep(180);
  }
  shutdownExportBrowser();
  throw new Error('Headless export browser did not start in time');
}

async function runCapture({ url, width, height, transparent, stageSelector }) {
  const port = await ensureExportBrowser();
  const listResp = await fetch(`http://127.0.0.1:${port}/json/list`);
  const list = await listResp.json();
  const target = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl) || list.find(t => t.webSocketDebuggerUrl);
  if (!target) {
    shutdownExportBrowser();
    throw new Error('No export page target available');
  }

  const cdp = new MiniCdpClient(target.webSocketDebuggerUrl);
  await cdp.connect();
  try {
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false
    });
    if (transparent) {
      await cdp.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
    } else {
      await cdp.send('Emulation.setDefaultBackgroundColorOverride', {});
    }

    await cdp.send('Page.navigate', { url });

    // Wait for initial state hydrate, custom PC fonts, images & SVG wires!
    const waitExpr = `(async () => {
      const sleep = (ms) => new Promise(r => setTimeout(r, ms));
      const deadline = Date.now() + 7000;
      while (Date.now() < deadline) {
        const st = document.querySelector(${JSON.stringify(stageSelector)});
        if (st && !st.classList.contains('is-booting')) break;
        await sleep(60);
      }
      if (document.fonts && document.fonts.ready) {
        try { await Promise.race([document.fonts.ready, sleep(2200)]); } catch {}
      }
      const imgDeadline = Date.now() + 5000;
      while (Date.now() < imgDeadline) {
        const imgs = Array.from(document.querySelectorAll('img')).filter(im => {
          const src = im.getAttribute('src');
          if (!src) return false;
          const cs = getComputedStyle(im);
          return cs.display !== 'none' && cs.visibility !== 'hidden';
        });
        if (imgs.every(im => im.complete)) break;
        await sleep(75);
      }
      // Also await any CSS background-image URLs (e.g., 1080p game preview backdrops)
      const bgUrls = new Set();
      for (const node of [document.body, document.querySelector(${JSON.stringify(stageSelector)})]) {
        if (!node) continue;
        const bg = getComputedStyle(node).backgroundImage || '';
        for (const m of bg.matchAll(/url\\(["']?([^"')]+)["']?\\)/g)) {
          if (m[1] && !m[1].startsWith('data:')) bgUrls.add(m[1]);
        }
      }
      if (bgUrls.size > 0) {
        await Promise.all(Array.from(bgUrls).map(u => new Promise(resolve => {
          const im = new Image();
          const t = setTimeout(resolve, 4500);
          im.onload = im.onerror = () => { clearTimeout(t); resolve(); };
          im.src = u;
        })));
      }
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      await sleep(160);
      return true;
    })()`;

    await cdp.send('Runtime.evaluate', { expression: waitExpr, awaitPromise: true, returnByValue: true }, 16000);
    const shot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true
    }, 15000);

    // Navigate back to about:blank so SSE sockets from export page close immediately!
    await cdp.send('Page.navigate', { url: 'about:blank' }).catch(() => {});
    scheduleIdleShutdown();
    return Buffer.from(shot.data, 'base64');
  } finally {
    cdp.close();
  }
}

export function captureOverlayPng(opts) {
  const job = exportQueue.then(() => runCapture(opts));
  exportQueue = job.catch(() => {});
  return job;
}
