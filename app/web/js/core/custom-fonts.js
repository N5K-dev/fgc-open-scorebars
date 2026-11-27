/* ============================================================================
   FGC Open Scorebars — Global Custom PC Fonts Engine (Zero Dependencies)
   Shared across index.html (Scorebars), vs.html (VS Splash), results.html (Top 8),
   and panel.html (Control Panel). Supports:
     - Uploaded PC font files (.ttf, .otf, .woff, .woff2) served from /media/fonts/
     - Locally installed PC font names (e.g., Cervo, Helvetica Neue, Impact)
   ============================================================================ */
(() => {
  const STORAGE_KEY = 'fgc_open_scorebar_custom_fonts_v1';
  const STYLE_ID = 'fgc-custom-fonts-css';
  const isHttp = location.protocol === 'http:' || location.protocol === 'https:';

  let fontsList = [];
  const listeners = new Set();

  function escCssStr(s) {
    return String(s || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]/g, '');
  }
  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function getFontKey(f) {
    if (!f) return '';
    return f.kind === 'system' ? `sys:${f.family || f.name}` : `custom:${f.id}`;
  }

  function getCssFamilyName(f) {
    if (!f) return '';
    if (f.kind === 'system') return String(f.family || f.name || '').trim();
    return `FGC_CF_${String(f.id || '').replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  }

  function injectFontFaces(list) {
    let styleEl = document.getElementById(STYLE_ID);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      document.head.appendChild(styleEl);
    }
    const rules = [];
    for (const f of (list || [])) {
      if (f.kind === 'file' && f.url) {
        const fam = escCssStr(getCssFamilyName(f));
        const fmt = f.format ? ` format("${escCssStr(f.format)}")` : '';
        const srcUrl = escCssStr(f.url);
        rules.push(
          `@font-face {\n` +
          `  font-family: "${fam}";\n` +
          `  src: url("${srcUrl}")${fmt};\n` +
          `  font-weight: 100 900;\n` +
          `  font-style: normal;\n` +
          `  font-display: swap;\n` +
          `}`
        );
      }
    }
    styleEl.textContent = rules.join('\n');
    // Warm fonts asynchronously so Canvas 2D exports & overlays paint cleanly
    if (document.fonts && typeof document.fonts.load === 'function') {
      for (const f of (list || [])) {
        if (f.kind === 'file') {
          document.fonts.load(`700 32px "${getCssFamilyName(f)}"`).catch(() => {});
        }
      }
    }
  }

  function setFonts(list) {
    fontsList = Array.isArray(list) ? list : [];
    injectFontFaces(fontsList);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fontsList)); } catch {}
    listeners.forEach(fn => { try { fn(fontsList); } catch {} });
  }

  function getFonts() {
    return fontsList;
  }

  function resolveFontStack(fontKey, builtInStacks) {
    const key = String(fontKey || '').trim();
    if (!key || key === 'theme') return null;
    if (builtInStacks && builtInStacks[key]) return builtInStacks[key];
    if (key.startsWith('custom:')) {
      const id = key.slice(7);
      const found = fontsList.find(f => f.id === id);
      const fam = found ? getCssFamilyName(found) : `FGC_CF_${id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
      return `"${escCssStr(fam)}", 'Barlow Condensed', 'Segoe UI', sans-serif`;
    }
    if (key.startsWith('sys:')) {
      const fam = key.slice(4).trim();
      if (!fam) return null;
      return `"${escCssStr(fam)}", 'Barlow Condensed', 'Segoe UI', sans-serif`;
    }
    // Direct fallback if user pasted a raw local font family name
    return `"${escCssStr(key)}", 'Barlow Condensed', 'Segoe UI', sans-serif`;
  }

  function resolveCanvasFamily(fontKey, fallback = '"Russo One", "Barlow Condensed", sans-serif') {
    const key = String(fontKey || '').trim();
    if (!key || key === 'theme') return fallback;
    if (key.startsWith('custom:')) {
      const id = key.slice(7);
      const found = fontsList.find(f => f.id === id);
      const fam = found ? getCssFamilyName(found) : `FGC_CF_${id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
      return `"${escCssStr(fam)}", "Barlow Condensed", sans-serif`;
    }
    if (key.startsWith('sys:')) {
      const fam = key.slice(4).trim();
      return fam ? `"${escCssStr(fam)}", "Barlow Condensed", sans-serif` : fallback;
    }
    return `"${escCssStr(key)}", "Barlow Condensed", sans-serif`;
  }

  function buildSelectOptionsHtml(builtInOptions, list = fontsList) {
    const base = (builtInOptions || [])
      .map(([v, l]) => `<option value="${escHtml(v)}">${escHtml(l)}</option>`)
      .join('');
    if (!list || !list.length) return base;
    const customOpts = list.map(f => {
      const val = getFontKey(f);
      const icon = f.kind === 'system' ? '🖥️' : '📁';
      const label = `${icon} ${f.name || f.family || f.id}`;
      return `<option value="${escHtml(val)}">${escHtml(label)}</option>`;
    }).join('');
    return `${base}<optgroup label="💻 Custom PC Fonts">${customOpts}</optgroup>`;
  }

  function onChange(fn) {
    if (typeof fn === 'function') listeners.add(fn);
    return () => listeners.delete(fn);
  }

  async function fetchAndSync() {
    if (!isHttp) return fontsList;
    try {
      const r = await fetch('/api/fonts', { cache: 'no-store' });
      if (r.ok) {
        const list = await r.json();
        setFonts(list);
      }
    } catch {}
    return fontsList;
  }

  // Load cached fonts immediately so there is zero FOUC
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) setFonts(JSON.parse(cached));
  } catch {}

  window.FGC_CUSTOM_FONTS = {
    setFonts,
    getFonts,
    getFontKey,
    getCssFamilyName,
    resolveFontStack,
    resolveCanvasFamily,
    buildSelectOptionsHtml,
    onChange,
    fetchAndSync
  };
})();
