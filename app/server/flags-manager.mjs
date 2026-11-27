/**
 * FGC Open Scorebars — World & Regional Flag Asset Manager (0 dependencies)
 * 252 World Countries + 3,148 Regional/State/Province/Prefecture Flags across 139 countries!
 * Powered by open FGC community flag assets (TournamentStreamHelper) + flagcdn fallback.
 *
 * Flags download on-demand the instant they are viewed or selected, OR in bulk packs
 * (All Countries / By Continent / By Country Regions / Full World Pack), and cache locally
 * under data/flags/ (gitignored) so tournaments run 100% offline!
 */

import fs from 'node:fs';
import path from 'node:path';

const TSH_RAW_BASE = 'https://raw.githubusercontent.com/joaorb64/TournamentStreamHelper/main/assets';
const FLAGCDN_BASE = 'https://flagcdn.com';

function safeCode(code) {
  const clean = String(code || '').trim().toUpperCase();
  return /^[A-Z0-9]{2}(-[A-Z0-9]{1,8})?$/.test(clean) ? clean : '';
}

export function createFlagManager(rootDir, dataDir) {
  const FLAGS_DIR = path.join(dataDir, 'flags');
  const COUNTRIES_DIR = path.join(FLAGS_DIR, 'countries');
  const REGIONS_DIR = path.join(FLAGS_DIR, 'regions');
  const INDEX_PATH = path.join(rootDir, 'flags-world-index.json');

  for (const d of [FLAGS_DIR, COUNTRIES_DIR, REGIONS_DIR]) {
    fs.mkdirSync(d, { recursive: true });
  }

  let catalog = { continents: [], totalCountries: 0, totalRegions: 0, countries: [] };
  const countryMap = new Map();
  const regionMap = new Map();
  const inFlight = new Map();

  try {
    if (fs.existsSync(INDEX_PATH)) {
      catalog = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
      for (const c of (catalog.countries || [])) {
        countryMap.set(c.c, c);
        const rf = c.rf || c.c;
        for (const r of (c.r || [])) {
          const sub = r.c.slice(c.c.length + 1);
          regionMap.set(r.c, {
            ...r,
            cc: c.c,
            ct: c.ct,
            countryName: c.n,
            folder: rf,
            fileBase: r.f || sub
          });
        }
      }
    }
  } catch (err) {
    console.error('[flags-manager] Failed to load flags-world-index.json:', err.message);
  }

  const downloadJob = {
    running: false,
    scope: '',
    label: '',
    done: 0,
    total: 0,
    cached: 0,
    failed: 0,
    current: '',
    error: ''
  };

  function getCachedPath(code) {
    const clean = safeCode(code);
    if (!clean) return null;
    if (clean.includes('-')) {
      const [cc, sub] = clean.split('-');
      const dir = path.join(REGIONS_DIR, cc);
      for (const ext of ['.png', '.svg']) {
        const fp = path.join(dir, `${sub}${ext}`);
        if (fs.existsSync(fp)) {
          try { if (fs.statSync(fp).size > 60) return { filePath: fp, mime: ext === '.svg' ? 'image/svg+xml' : 'image/png' }; } catch {}
        }
      }
      return null;
    }
    for (const ext of ['.png', '.svg']) {
      const fp = path.join(COUNTRIES_DIR, `${clean}${ext}`);
      if (fs.existsSync(fp)) {
        try { if (fs.statSync(fp).size > 60) return { filePath: fp, mime: ext === '.svg' ? 'image/svg+xml' : 'image/png' }; } catch {}
      }
    }
    return null;
  }

  function listCachedSet() {
    const cachedCountries = new Set();
    const cachedRegionsByCountry = new Map();
    let totalCachedRegions = 0;

    try {
      for (const fn of fs.readdirSync(COUNTRIES_DIR)) {
        const m = fn.match(/^([A-Z0-9]{2})\.(png|svg)$/i);
        if (m) cachedCountries.add(m[1].toUpperCase());
      }
    } catch {}

    try {
      for (const ccDir of fs.readdirSync(REGIONS_DIR)) {
        const fullDir = path.join(REGIONS_DIR, ccDir);
        try {
          if (!fs.statSync(fullDir).isDirectory()) continue;
          const cc = ccDir.toUpperCase();
          const set = new Set();
          for (const fn of fs.readdirSync(fullDir)) {
            const m = fn.match(/^([A-Z0-9]{1,8})\.(png|svg)$/i);
            if (m) set.add(`${cc}-${m[1].toUpperCase()}`);
          }
          if (set.size) {
            cachedRegionsByCountry.set(cc, set);
            totalCachedRegions += set.size;
          }
        } catch {}
      }
    } catch {}

    return { cachedCountries, cachedRegionsByCountry, totalCachedRegions };
  }

  function getCatalog() {
    const { cachedCountries, cachedRegionsByCountry, totalCachedRegions } = listCachedSet();
    const countries = (catalog.countries || []).map(c => {
      const regSet = cachedRegionsByCountry.get(c.c);
      const out = {
        ...c,
        cached: cachedCountries.has(c.c),
        rcCached: regSet ? regSet.size : 0
      };
      if (regSet && regSet.size) {
        out.cachedRegCodes = [...regSet];
      }
      return out;
    });
    return {
      continents: catalog.continents || [],
      totalCountries: catalog.totalCountries || countries.length,
      totalRegions: catalog.totalRegions || 0,
      cachedCountries: cachedCountries.size,
      cachedRegions: totalCachedRegions,
      countries
    };
  }

  async function ensureFlagImage(code) {
    const clean = safeCode(code);
    if (!clean) return null;

    const hit = getCachedPath(clean);
    if (hit) return hit;

    if (inFlight.has(clean)) return inFlight.get(clean);

    const task = (async () => {
      const urls = [];
      let destDir = COUNTRIES_DIR;
      let destBase = clean;

      if (clean.includes('-')) {
        const [cc, sub] = clean.split('-');
        destDir = path.join(REGIONS_DIR, cc);
        destBase = sub;
        const meta = regionMap.get(clean);
        const folder = meta?.folder || cc;
        const fileBase = meta?.fileBase || sub;
        urls.push({
          url: `${TSH_RAW_BASE}/state_flag/${encodeURIComponent(folder)}/${encodeURIComponent(fileBase)}.png`,
          ext: '.png',
          mime: 'image/png'
        });
        if (fileBase !== sub.toLowerCase()) {
          urls.push({
            url: `${TSH_RAW_BASE}/state_flag/${encodeURIComponent(folder)}/${encodeURIComponent(sub.toLowerCase())}.png`,
            ext: '.png',
            mime: 'image/png'
          });
        }
        // flagcdn supports all US states & UK nations in crisp SVG as fallback
        if (cc === 'US' || cc === 'GB') {
          urls.push({
            url: `${FLAGCDN_BASE}/${clean.toLowerCase()}.svg`,
            ext: '.svg',
            mime: 'image/svg+xml'
          });
        }
      } else {
        const meta = countryMap.get(clean);
        const fileBase = meta?.f || clean.toLowerCase();
        urls.push({
          url: `${TSH_RAW_BASE}/country_flag/${encodeURIComponent(fileBase)}.png`,
          ext: '.png',
          mime: 'image/png'
        });
        urls.push({
          url: `${FLAGCDN_BASE}/${clean.toLowerCase()}.svg`,
          ext: '.svg',
          mime: 'image/svg+xml'
        });
      }

      fs.mkdirSync(destDir, { recursive: true });

      for (const cand of urls) {
        try {
          const res = await fetch(cand.url, {
            headers: { 'User-Agent': 'FGC-Open-Scorebars/2.8' },
            signal: AbortSignal.timeout(10000)
          });
          if (!res.ok) continue;
          const buf = Buffer.from(await res.arrayBuffer());
          if (buf.length <= 60) continue;
          const fp = path.join(destDir, `${destBase}${cand.ext}`);
          const tmp = `${fp}.${process.pid}.${Date.now()}.tmp`;
          fs.writeFileSync(tmp, buf);
          fs.renameSync(tmp, fp);
          return { filePath: fp, mime: cand.mime };
        } catch {}
      }
      return null;
    })();

    inFlight.set(clean, task);
    try {
      return await task;
    } finally {
      inFlight.delete(clean);
    }
  }

  function startPackDownload({ scope = 'countries', continent = '', country = '' } = {}) {
    if (downloadJob.running) {
      return { alreadyRunning: true, ...downloadJob };
    }
    const queue = [];
    let label = 'All World Countries';

    if (scope === 'countries') {
      label = 'All World Countries';
      for (const c of (catalog.countries || [])) {
        if (!c.noImg) queue.push({ code: c.c, name: c.n });
      }
    } else if (scope === 'continent' || scope === 'continent-full') {
      const ct = String(continent || 'EU').toUpperCase();
      const ctMeta = (catalog.continents || []).find(x => x.id === ct);
      const includeRegs = scope === 'continent-full';
      label = `${ctMeta ? ctMeta.name : ct}${includeRegs ? ' (Countries + Regions)' : ' (Countries)'}`;
      for (const c of (catalog.countries || [])) {
        if (c.ct !== ct) continue;
        if (!c.noImg) queue.push({ code: c.c, name: c.n });
        if (includeRegs && Array.isArray(c.r)) {
          for (const r of c.r) queue.push({ code: r.c, name: `${c.n} · ${r.n}` });
        }
      }
    } else if (scope === 'country-regions') {
      const cc = safeCode(country);
      const cMeta = countryMap.get(cc);
      label = `${cMeta ? cMeta.n : cc} Regions`;
      if (cMeta) {
        if (!cMeta.noImg) queue.push({ code: cMeta.c, name: cMeta.n });
        for (const r of (cMeta.r || [])) queue.push({ code: r.c, name: r.n });
      }
    } else if (scope === 'full-world') {
      label = 'Full World Pack (Countries + All Regions)';
      for (const c of (catalog.countries || [])) {
        if (!c.noImg) queue.push({ code: c.c, name: c.n });
        for (const r of (c.r || [])) queue.push({ code: r.c, name: `${c.n} · ${r.n}` });
      }
    }

    if (!queue.length) {
      return { started: false, error: 'No flags matched the selected pack scope.' };
    }

    Object.assign(downloadJob, {
      running: true,
      scope,
      label,
      done: 0,
      total: queue.length,
      cached: 0,
      failed: 0,
      current: 'Starting...',
      error: ''
    });

    const concurrency = 10;
    const worker = async () => {
      while (queue.length > 0 && downloadJob.running) {
        const item = queue.shift();
        if (!item) break;
        downloadJob.current = item.name;
        try {
          const hit = await ensureFlagImage(item.code);
          if (hit) downloadJob.cached++;
          else downloadJob.failed++;
        } catch {
          downloadJob.failed++;
        }
        downloadJob.done++;
      }
    };

    Promise.all(Array.from({ length: concurrency }, () => worker()))
      .catch(err => { downloadJob.error = err.message; })
      .finally(() => {
        downloadJob.running = false;
        downloadJob.current = 'Done';
      });

    return { started: true, ...downloadJob };
  }

  function stopPackDownload() {
    downloadJob.running = false;
    return { ...downloadJob };
  }

  function getDownloadStatus() {
    return { ...downloadJob };
  }

  function clearCache({ scope = 'all', country = '' } = {}) {
    if (scope === 'country-regions' && country) {
      const cc = safeCode(country);
      const dir = path.join(REGIONS_DIR, cc);
      if (cc && fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
      return { cleared: true, scope, country: cc };
    }
    if (fs.existsSync(COUNTRIES_DIR)) fs.rmSync(COUNTRIES_DIR, { recursive: true, force: true });
    if (fs.existsSync(REGIONS_DIR)) fs.rmSync(REGIONS_DIR, { recursive: true, force: true });
    fs.mkdirSync(COUNTRIES_DIR, { recursive: true });
    fs.mkdirSync(REGIONS_DIR, { recursive: true });
    return { cleared: true, scope: 'all' };
  }

  return {
    getCatalog,
    ensureFlagImage,
    startPackDownload,
    stopPackDownload,
    getDownloadStatus,
    clearCache
  };
}
