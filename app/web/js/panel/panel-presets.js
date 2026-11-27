/**
 * FGC Open Scorebars — Universal "My Presets" (with Live Visual Mini-Thumbnails)
 * & Combined Tournament Broadcast Packs (Apply All Together OR Individually per Module!)
 * Zero dependencies, 100% offline.
 */
(() => {
  'use strict';

  const P = window.__FGC_PANEL__;
  if (!P) return;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  // Clean visual-only key lists (so applying ANY saved preset NEVER wipes player names, scores, or bracket results!)
  const VS_VISUAL_KEYS = [
    'viewMode', 'design', 'matchupBoardPreset', 'matchupShowScore', 'matchupShowSeeds', 'matchupShowHandles',
    'matchupCardBg', 'matchupCardBorder', 'matchupWinColor', 'matchupLosColor', 'matchupVsBadgeBg',
    'matchupCardRadius', 'matchupShellOpacity', 'matchupGlobalY', 'matchupGlobalX', 'matchupGlobalScale', 'matchupArtPos',
    'avatarMode', 'bgMode', 'bgColor1', 'bgColor2', 'p1Color', 'p2Color', 'accentColor',
    'pattern', 'patternSpeed', 'patternDir', 'patternOpacity', 'patternScale',
    'splitOverride', 'frameStyle', 'frameColor', 'frameAccent', 'frameThickness', 'frameInset', 'frameOpacity', 'frameGlow',
    'bandTop', 'bandBottom', 'bandLeft', 'bandRight', 'bandStyle', 'bandColor', 'bandAccent', 'bandDualSideColor', 'bandThickness', 'bandOpacity', 'bandGlow', 'bandAnim',
    'headerStyle', 'headerScale', 'headerOffsetY', 'headerOffsetX', 'headerAlign', 'headerWidth', 'headerOpacity', 'headerSurface',
    'headerBgColor', 'headerBgColor2', 'headerTextColor', 'headerEyebrowColor', 'headerBorderColor', 'headerBorderWidth', 'headerRadius',
    'headerFontSize', 'headerFormatBg', 'headerFormatText', 'headerGlow', 'headerOrder', 'headerFormatPos', 'showEyebrow',
    'dividerStyle', 'dividerAnim', 'dividerSpeed', 'dividerWidth', 'dividerTilt', 'dividerColor', 'dividerColor2', 'dividerGlow', 'dividerOpacity', 'dividerOffsetX',
    'emblemStyle', 'emblemText', 'emblemScale', 'emblemOffsetX', 'emblemOffsetY', 'emblemRotate', 'emblemAnim', 'emblemBgColor', 'emblemTextColor', 'emblemStrokeColor', 'emblemGlow',
    'plateStyle', 'plateSurface', 'plateBgColor', 'plateBgColor2', 'plateTextColor', 'plateSponsorColor', 'plateBorderColor', 'plateBorderWidth', 'plateRadius', 'plateShadow',
    'plateOpacity', 'plateWidth', 'plateMinHeight', 'plateScale', 'plateBottom', 'plateEdgeX', 'plateSkew', 'plateGlow', 'plateAlign',
    'plateScorePos', 'plateScoreBg', 'plateScoreText', 'plateAvatarPos', 'plateInfoOrder', 'plateMetaOrder', 'plateFlagPos',
    'plateFlagBg', 'plateFlagBgSource', 'plateFlagBgOpacity', 'plateFlagBgFadeStart', 'plateFlagBgFadeEnd', 'plateFlagBgAngle', 'plateFlagBgZoom', 'plateFlagBgBlur', 'plateFlagBgBlend', 'plateFlagBgAnim',
    'fontDisplay', 'nameScale', 'sponsorScale', 'charNameScale', 'scoreScale', 'flagSize',
    'flagMode', 'showFlags', 'showSponsor', 'showBracket', 'showSeed', 'showCharName', 'showScore', 'showH2H', 'h2hOffsetY', 'flagWatermarkOpacity',
    'p1Zoom', 'p2Zoom', 'p1OffsetX', 'p2OffsetX', 'p1OffsetY', 'p2OffsetY', 'p1Flip', 'p2Flip', 'charShadow', 'charIdleAnim',
    'entryAnim', 'entrySpeed', 'ambientAnim', 'logoPos', 'logoScale', 'showLogo'
  ];

  const BK_VISUAL_KEYS = [
    'mode', 'design', 'bgMode', 'bgColor1', 'bgColor2', 'customColors',
    'fontDisplay', 'fontBody', 'fontScale', 'headerStyle', 'cellStyle', 'connectorStyle', 'connectorThickness', 'cellRadius',
    'pattern', 'patternSpeed', 'patternDir', 'patternOpacity', 'patternScale', 'entryAnim',
    'showFlags', 'showIso', 'showSeeds', 'showSponsors', 'showLogo', 'showTicker', 'showGfReset', 'poolsPerPage'
  ];

  const RES_VISUAL_KEYS = [
    'design', 'aspect', 'layoutOverride', 'cardStyle', 'cardBorderStyle', 'cardBorderWidth', 'cardCutSize', 'cardBorderColor', 'cardBorderFx', 'fontDisplay',
    'bgMode', 'bgColor1', 'bgColor2', 'accentColor', 'goldColor',
    'pattern', 'patternSpeed', 'patternDir', 'patternOpacity', 'patternScale',
    'entryAnim', 'entrySpeed', 'staggerMs', 'ambientAnim', 'cardIdleAnim',
    'flagMode', 'avatarMode', 'showFlags', 'showCrown', 'showHandles', 'showCharName', 'showSponsor', 'showEntrants', 'showLogo', 'showSeed', 'showTop12',
    'charZoom', 'charOffsetY', 'charOffsetX', 'charFlip',
    'infoAlign', 'infoVPos', 'infoOffsetX', 'infoOffsetY', 'infoScrim',
    'nameScale', 'metaScale', 'rankPos', 'rankScale', 'rankOffsetX', 'rankOffsetY',
    'headerScale', 'cardGap', 'artFit', 'artFocusY', 'artStripWidth', 'artEdgeFade'
  ];

  function pickSlice(src, keys, defaults) {
    const out = {};
    const s = src || {};
    const d = defaults || {};
    for (const k of keys) {
      const val = s[k] !== undefined ? s[k] : d[k];
      if (val !== undefined) out[k] = typeof val === 'object' && val !== null ? structuredClone(val) : val;
    }
    return out;
  }

  function getScope(p) {
    return p?.scope || 'scorebar';
  }

  function getPresetsByScope(scope) {
    return (P.getPresetsDb() || []).filter(p => getScope(p) === scope);
  }

  /* =========================================================================
     SNAPSHOT BUILDERS & CLEAN APPLIERS (SINGULAR OR COMBINED!)
     ========================================================================= */
  function buildVsSnapshot(name) {
    const st = P.getState();
    const vsSlice = pickSlice(st.vs, VS_VISUAL_KEYS, P.DEFAULT_STATE_REF.DEFAULT_VS);
    return {
      scope: 'vs',
      name,
      viewMode: vsSlice.viewMode === 'matchup-2x2' ? 'matchup-2x2' : '1v1',
      vs: vsSlice
    };
  }

  function buildBracketsSnapshot(name) {
    const st = P.getState();
    const bkSlice = pickSlice(st.brackets, BK_VISUAL_KEYS, P.DEFAULT_STATE_REF.DEFAULT_BRACKETS);
    return {
      scope: 'brackets',
      name,
      mode: bkSlice.mode || 'top8-de',
      brackets: bkSlice
    };
  }

  function buildResultsSnapshot(name) {
    const st = P.getState();
    const resSlice = pickSlice(st.results, RES_VISUAL_KEYS, P.DEFAULT_STATE_REF.DEFAULT_RESULTS);
    const placements = Array.isArray(st.results?.placements) ? st.results.placements : [];
    const cardShapes = placements.slice(0, 12).map(pl => String(pl?.cardShape || 'global'));
    if (cardShapes.some(s => s && s !== 'global')) resSlice.cardShapes = cardShapes;
    return {
      scope: 'results',
      name,
      aspect: resSlice.aspect || '16:9',
      results: resSlice
    };
  }

  function buildBundleSnapshot(name, include, notes = '') {
    const modules = {};
    if (include.scorebar) modules.scorebar = P.buildScorebarSnapshot(name);
    if (include.vs) modules.vs = buildVsSnapshot(name);
    if (include.brackets) modules.brackets = buildBracketsSnapshot(name);
    if (include.results) modules.results = buildResultsSnapshot(name);
    return {
      scope: 'bundle',
      name,
      notes: String(notes || '').trim().slice(0, 120),
      modules
    };
  }

  function applyVsSnapshot(p, silent = false) {
    if (!p?.vs) return;
    const merged = {
      ...pickSlice(P.DEFAULT_STATE_REF.DEFAULT_VS, VS_VISUAL_KEYS, P.DEFAULT_STATE_REF.DEFAULT_VS),
      ...structuredClone(p.vs)
    };
    if (merged.matchupArtPos && typeof merged.matchupArtPos === 'object') {
      merged.matchupArtPos = { __replace: true, ...merged.matchupArtPos };
    } else {
      merged.matchupArtPos = null;
    }
    P.commitState({ vs: { ...merged, introNonce: Date.now() } }, true);
    if (!silent) P.toast(`⚔️ VS Preset applied: ${p.name}`);
  }

  function applyBracketsSnapshot(p, silent = false) {
    if (!p?.brackets) return;
    const merged = {
      ...pickSlice(P.DEFAULT_STATE_REF.DEFAULT_BRACKETS, BK_VISUAL_KEYS, P.DEFAULT_STATE_REF.DEFAULT_BRACKETS),
      ...structuredClone(p.brackets)
    };
    P.commitState({ brackets: { ...merged, introNonce: Date.now() } }, true);
    if (!silent) P.toast(`🌿 Brackets Preset applied: ${p.name}`);
  }

  function applyResultsSnapshot(p, silent = false) {
    if (!p?.results) return;
    const saved = structuredClone(p.results);
    const savedShapes = Array.isArray(saved.cardShapes) ? saved.cardShapes : null;
    delete saved.cardShapes;
    const merged = {
      ...pickSlice(P.DEFAULT_STATE_REF.DEFAULT_RESULTS, RES_VISUAL_KEYS, P.DEFAULT_STATE_REF.DEFAULT_RESULTS),
      ...saved
    };
    const st = P.getState();
    const curPl = Array.isArray(st.results?.placements) ? st.results.placements : [];
    if (curPl.length) {
      merged.placements = curPl.map((pl, i) => ({
        ...pl,
        cardShape: savedShapes?.[i] || 'global'
      }));
    }
    P.commitState({ results: { ...merged, introNonce: Date.now() } }, true);
    if (!silent) P.toast(`🏅 Results Preset applied: ${p.name}`);
  }

  function applyBundleModule(pack, modKey) {
    const m = pack?.modules?.[modKey];
    if (!m) return;
    if (modKey === 'scorebar') {
      P.applyScorebarSnapshot(m);
      P.toast(`🎛 Scorebar from "${pack.name}" applied!`);
    } else if (modKey === 'vs') {
      applyVsSnapshot({ ...m, name: `${pack.name} (VS)` });
    } else if (modKey === 'brackets') {
      applyBracketsSnapshot({ ...m, name: `${pack.name} (Brackets)` });
    } else if (modKey === 'results') {
      applyResultsSnapshot({ ...m, name: `${pack.name} (Top 8)` });
    }
  }

  function applyFullBundle(pack) {
    const mods = pack?.modules || {};
    const applied = [];
    if (mods.scorebar) { P.applyScorebarSnapshot(mods.scorebar); applied.push('Scorebar'); }
    if (mods.vs) { applyVsSnapshot(mods.vs, true); applied.push('VS Splash'); }
    if (mods.brackets) { applyBracketsSnapshot(mods.brackets, true); applied.push('Brackets'); }
    if (mods.results) { applyResultsSnapshot(mods.results, true); applied.push('Results'); }
    if (applied.length) {
      P.toast(`🏆 Tournament Pack "${pack.name}" applied (${applied.join(' + ')})!`);
    }
  }

  /* =========================================================================
     LIVE VISUAL MINI-THUMBNAIL RENDERERS (ALL 4 WORKSPACES + 4-QUAD PACK!)
     ========================================================================= */
  function buildScorebarPresetThumb(p) {
    const base = P.THEMES.find(t => t.id === p.theme) || P.THEMES[0];
    if (!base) return '<div class="mp-thumb"><span class="mp-thumb-badge">SCOREBAR</span></div>';
    const customPv = { ...base.pv };
    if (p.tweaks?.customColors) {
      if (p.tweaks.p1Color) { customPv.p1 = p.tweaks.p1Color; customPv.sc1 = p.tweaks.p1Color; }
      if (p.tweaks.p2Color) { customPv.p2 = p.tweaks.p2Color; customPv.sc2 = p.tweaks.p2Color; }
      if (p.tweaks.centerColor) { customPv.cborder = p.tweaks.centerColor; customPv.ct = p.tweaks.centerColor; }
    }
    if (p.style?.fillMode === 'solid' && p.style.bg1) {
      customPv.bg = p.style.bg1; customPv.bg1 = p.style.bg1; customPv.bg2 = p.style.bg1;
    } else if (p.style?.fillMode === 'gradient' && p.style.bg1 && p.style.bg2) {
      const g = `linear-gradient(135deg, ${p.style.bg1}, ${p.style.bg2})`;
      customPv.bg = g; customPv.bg1 = g; customPv.bg2 = g;
    }
    const synthetic = { ...base, pv: customPv };
    return P.buildThemeMiniPreview(synthetic);
  }

  function buildVsPresetThumb(p) {
    const vs = p.vs || {};
    const d = (P.VS_DESIGNS || []).find(x => x.id === vs.design) || (P.VS_DESIGNS || [])[0] || {};
    const isCustom = vs.bgMode === 'custom';
    const bgL = isCustom ? (vs.bgColor1 || '#1e293b') : (d.bgLeft || '#1e293b');
    const bgR = isCustom ? (vs.bgColor2 || '#0f172a') : (d.bgRight || '#0f172a');
    const p1 = isCustom ? (vs.p1Color || d.p1 || '#ff5a1f') : (d.p1 || '#ff5a1f');
    const p2 = isCustom ? (vs.p2Color || d.p2 || '#2563eb') : (d.p2 || '#2563eb');
    const acc = (vs.accentColor && vs.accentColor.trim()) ? vs.accentColor : (d.accent || '#facc15');
    const plateBg = (vs.plateBgColor && vs.plateBgColor.trim()) ? vs.plateBgColor : (d.plateBg || 'rgba(10,12,20,0.92)');
    const is2x2 = (p.viewMode || vs.viewMode) === 'matchup-2x2';

    if (is2x2) {
      const cardBg = (vs.matchupCardBg && vs.matchupCardBg.trim()) ? vs.matchupCardBg : (d.lightBg ? 'rgba(255,255,255,0.9)' : 'rgba(10,14,24,0.88)');
      const winCol = (vs.matchupWinColor && vs.matchupWinColor.trim()) ? vs.matchupWinColor : p1;
      const losCol = (vs.matchupLosColor && vs.matchupLosColor.trim()) ? vs.matchupLosColor : p2;
      const vsBg = (vs.matchupVsBadgeBg && vs.matchupVsBadgeBg.trim()) ? vs.matchupVsBadgeBg : `linear-gradient(135deg,${p1},${p2})`;
      const muCard = (topCol) => `
        <div class="mp-mu-card" style="background:${cardBg};border-top:2px solid ${topCol};">
          <div style="background:linear-gradient(135deg,${p1}66,transparent);"></div>
          <div style="background:linear-gradient(225deg,${p2}66,transparent);"></div>
          <i style="background:${vsBg};"></i>
        </div>`;
      return `
        <div class="mp-thumb" style="background:${vs.bgMode === 'transparent' ? 'repeating-conic-gradient(#1f2436 0% 25%, #121622 0% 50%) 50% / 12px 12px' : bgL};">
          <div class="mp-mu-grid">
            ${muCard(winCol)}${muCard(losCol)}${muCard(winCol)}${muCard(losCol)}
          </div>
          <span class="mp-thumb-badge">2×2</span>
        </div>`;
    }

    const embBg = (vs.emblemBgColor && vs.emblemBgColor.trim()) ? vs.emblemBgColor : `linear-gradient(135deg,${p1},${p2})`;
    return `
      <div class="mp-thumb">
        <div class="mp-vs-split">
          <div class="mp-vs-half" style="background:${vs.bgMode === 'transparent' ? 'repeating-conic-gradient(#1f2436 0% 25%, #121622 0% 50%) 50% / 12px 12px' : bgL};"></div>
          <div class="mp-vs-half" style="background:${vs.bgMode === 'transparent' ? 'repeating-conic-gradient(#1f2436 0% 25%, #121622 0% 50%) 50% / 12px 12px' : bgR};"></div>
        </div>
        <div class="mp-vs-div" style="background:${(vs.dividerColor && vs.dividerColor.trim()) ? vs.dividerColor : acc};"></div>
        <div class="mp-vs-emb" style="background:${embBg};border-color:${acc};">${esc(vs.emblemText || 'VS')}</div>
        <div class="mp-vs-plates">
          <div class="mp-vs-plate" style="background:${plateBg};border-bottom-color:${p1};"></div>
          <div class="mp-vs-plate" style="background:${plateBg};border-bottom-color:${p2};"></div>
        </div>
        <span class="mp-thumb-badge">1v1</span>
      </div>`;
  }

  function buildBracketsPresetThumb(p) {
    const bk = p.brackets || {};
    const d = (P.BRACKETS_DESIGNS || []).find(x => x.id === bk.design) || (P.BRACKETS_DESIGNS || [])[0] || {};
    const cc = bk.customColors || {};
    const bg = bk.bgMode === 'transparent'
      ? 'repeating-conic-gradient(#1f2436 0% 25%, #121622 0% 50%) 50% / 12px 12px'
      : (bk.bgMode === 'custom' ? `linear-gradient(135deg, ${bk.bgColor1 || '#0a2878'}, ${bk.bgColor2 || '#040814'})` : (d.bg || '#091338'));
    const acc = cc.enabled && cc.accentColor ? cc.accentColor : (d.accent || '#facc15');
    const acc2 = cc.enabled && cc.accentColor2 ? cc.accentColor2 : (d.accent2 || '#38bdf8');
    const cellBg = cc.enabled && cc.cellBg ? cc.cellBg : (d.cellBg || '#f1f5f9');
    const mode = p.mode || bk.mode || 'top8-de';
    const modeLbl = mode === 'pools-groups' ? 'POOLS' : mode === 'pool-tree' ? 'TREE' : mode === 'top16-table' ? 'TOP 16' : 'TOP 8';

    if (mode === 'pools-groups') {
      return `
        <div class="mp-thumb" style="background:${bg};">
          <div class="mp-mu-grid" style="height:44px;">
            <div style="background:${cellBg};border-top:3px solid ${acc};border-radius:3px;opacity:0.92;"></div>
            <div style="background:${cellBg};border-top:3px solid ${acc2};border-radius:3px;opacity:0.92;"></div>
            <div style="background:${cellBg};border-top:3px solid ${acc2};border-radius:3px;opacity:0.92;"></div>
            <div style="background:${cellBg};border-top:3px solid ${acc};border-radius:3px;opacity:0.92;"></div>
          </div>
          <span class="mp-thumb-badge">${modeLbl}</span>
        </div>`;
    }
    return `
      <div class="mp-thumb" style="background:${bg};">
        <div class="mp-bk-canvas">
          <div class="mp-bk-col">
            <div class="mp-bk-box" style="background:${cellBg};border-left-color:${acc};"></div>
            <div class="mp-bk-box" style="background:${cellBg};border-left-color:${acc};"></div>
            <div class="mp-bk-box" style="background:${cellBg};border-left-color:${acc2};"></div>
          </div>
          <div class="mp-bk-col">
            <div class="mp-bk-box" style="background:${cellBg};border-left-color:${acc};"></div>
            <div class="mp-bk-box" style="background:${cellBg};border-left-color:${acc2};"></div>
          </div>
          <div class="mp-bk-col">
            <div class="mp-bk-box" style="background:${cellBg};border-left-color:${acc};height:14px;"></div>
          </div>
        </div>
        <span class="mp-thumb-badge">${modeLbl}</span>
      </div>`;
  }

  function buildResultsPresetThumb(p) {
    const r = p.results || {};
    const d = (P.RESULTS_DESIGNS || []).find(x => x.id === r.design) || (P.RESULTS_DESIGNS || [])[0] || {};
    const bg = r.bgMode === 'transparent'
      ? 'repeating-conic-gradient(#1f2436 0% 25%, #121622 0% 50%) 50% / 12px 12px'
      : (r.bgMode === 'custom' ? `linear-gradient(135deg, ${r.bgColor1 || '#1d356b'}, ${r.bgColor2 || '#060912'})` : (d.bg || '#0b1224'));
    const gold = (r.goldColor && r.goldColor.trim()) ? r.goldColor : (d.gold || '#facc15');
    const acc = (r.accentColor && r.accentColor.trim()) ? r.accentColor : (d.accent || '#38bdf8');
    const cardBg = d.cardBg || 'rgba(13,19,36,0.9)';
    const aspect = p.aspect || r.aspect || d.defaultAspect || '16:9';
    const is45 = aspect === '4:5';
    return `
      <div class="mp-thumb" style="background:${bg};">
        <div class="mp-res-canvas ${is45 ? 'is-45' : ''}">
          <div class="mp-res-card c1" style="background:${cardBg};border-color:${gold};box-shadow:inset 0 2px 0 ${gold};"></div>
          <div class="mp-res-card" style="background:${cardBg};border-color:${acc};"></div>
          <div class="mp-res-card" style="background:${cardBg};border-color:${acc};"></div>
          <div class="mp-res-card" style="background:${cardBg};border-color:${acc};"></div>
          <div class="mp-res-card" style="background:${cardBg};border-color:${acc};"></div>
          <div class="mp-res-card" style="background:${cardBg};border-color:${acc};"></div>
          <div class="mp-res-card" style="background:${cardBg};border-color:${acc};"></div>
        </div>
        <span class="mp-thumb-badge">${is45 ? '4:5' : '16:9'}</span>
      </div>`;
  }

  function buildThumbForPreset(p) {
    const sc = getScope(p);
    if (sc === 'vs') return buildVsPresetThumb(p);
    if (sc === 'brackets') return buildBracketsPresetThumb(p);
    if (sc === 'results') return buildResultsPresetThumb(p);
    return buildScorebarPresetThumb(p);
  }

  function buildBundleQuadThumb(pack) {
    const mods = pack?.modules || {};
    const cell = (key, tag, html) => `
      <div class="pack-quad-cell ${mods[key] ? '' : 'is-off'}">
        ${mods[key] ? html : '<span style="font-size:9px;color:var(--muted);">—</span>'}
        <span class="pack-quad-tag">${tag}</span>
      </div>`;
    return `
      <div class="pack-quad-thumb">
        ${cell('scorebar', '🎛 SB', mods.scorebar ? buildScorebarPresetThumb(mods.scorebar) : '')}
        ${cell('vs', '⚔️ VS', mods.vs ? buildVsPresetThumb(mods.vs) : '')}
        ${cell('brackets', '🌿 BK', mods.brackets ? buildBracketsPresetThumb(mods.brackets) : '')}
        ${cell('results', '🏅 TOP8', mods.results ? buildResultsPresetThumb(mods.results) : '')}
      </div>`;
  }

  /* =========================================================================
     CRUD API HELPERS (HTTP + OFFLINE FALLBACK)
     ========================================================================= */
  async function savePresetEntry(payload) {
    if (P.isHttp) {
      const res = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        P.setPresetsDb(await res.json());
        refreshAllPresetViews();
        return true;
      }
      return false;
    } else {
      const list = [...(P.getPresetsDb() || [])];
      const sc = payload.scope || 'scorebar';
      const idx = list.findIndex(x => (x.scope || 'scorebar') === sc && x.name.toLowerCase() === payload.name.toLowerCase());
      const entry = { id: idx >= 0 ? list[idx].id : `preset-${sc}-${Date.now()}`, ...payload, savedAt: Date.now() };
      if (idx >= 0) list[idx] = entry;
      else list.unshift(entry);
      P.setPresetsDb(list);
      refreshAllPresetViews();
      return true;
    }
  }

  async function deletePresetById(id) {
    if (P.isHttp) {
      const res = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      if (res.ok) P.setPresetsDb(await res.json());
    } else {
      P.setPresetsDb((P.getPresetsDb() || []).filter(p => p.id !== id));
    }
    refreshAllPresetViews();
  }

  function exportPresetJson(p) {
    const data = {
      format: p.scope === 'bundle' ? 'fgc-tournament-pack-v1' : 'fgc-open-preset-v3',
      ...p
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const slug = String(p.name || 'preset').toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
    a.download = `${slug}.${p.scope === 'bundle' ? 'fgcpack' : 'fgcpreset'}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    P.toast(`⬇ Exported: ${p.name}`);
  }

  async function importPresetJsonFile(file) {
    try {
      const parsed = JSON.parse(await file.text());
      let items = [];
      if (Array.isArray(parsed)) items = parsed;
      else if (parsed.modules && typeof parsed.modules === 'object') items = [{ ...parsed, scope: 'bundle' }];
      else if (parsed.vs && !parsed.style) items = [{ ...parsed, scope: 'vs' }];
      else if (parsed.brackets && !parsed.style) items = [{ ...parsed, scope: 'brackets' }];
      else if (parsed.results && !parsed.style) items = [{ ...parsed, scope: 'results' }];
      else if (parsed.style || parsed.theme) items = [{ ...parsed, scope: 'scorebar' }];
      else throw new Error('Unrecognized preset file format');

      for (const it of items) {
        if (!it.name) it.name = file.name.replace(/\.json$/i, '');
        await savePresetEntry(it);
      }
      P.toast(`⬆ Imported ${items.length} preset(s) into My Presets!`);
    } catch (err) {
      P.toast(`⚠️ Import failed: ${err.message}`);
    }
  }

  /* =========================================================================
     SIDEBAR "★ MY PRESETS" GALLERY RENDERER (SCOREBARS / VS / BRACKETS / RESULTS)
     ========================================================================= */
  function renderSidebarMyPresets(scope, gridEl) {
    if (!gridEl) return;
    const list = getPresetsByScope(scope);
    const countIds = { scorebar: 'theme-count', vs: 'vs-design-count', brackets: 'bk-design-count', results: 'res-design-count' };
    if ($(countIds[scope])) $(countIds[scope]).textContent = list.length;
    const isEs = window.FGC_I18N?.getLang?.() === 'es';
    const metaLabel = {
      scorebar: isEs ? '🎛 Marcador' : '🎛 Scorebar',
      vs: P.getState().vs?.viewMode === 'matchup-2x2' ? '🧩 Matchups 2×2' : '⚔️ VS 1v1',
      brackets: '🌿 Brackets',
      results: isEs ? '🏅 Top 8' : '🏅 Top 8'
    }[scope] || 'Preset';

    const quickHtml = `
      <div class="my-preset-quick-bar">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
          <strong style="font-size:11px;color:#fef08a;">★ Save Current ${metaLabel}</strong>
          <button type="button" data-open-packs-modal="1" style="padding:2px 7px;font-size:10px;border-color:rgba(250,204,21,0.45);color:#fde68a;">🏆 Full Tournament Pack</button>
        </div>
        <div class="my-preset-quick-row">
          <input type="text" id="mp-quick-name-${scope}" placeholder="Name (e.g. EVO 2026)..." maxlength="48" />
          <button type="button" class="primary" data-mp-save-scope="${scope}" style="padding:5px 10px;font-size:11px;white-space:nowrap;">💾 Save</button>
        </div>
      </div>`;

    const cardsHtml = list.map((p) => {
      const sub = scope === 'scorebar'
        ? `Theme: ${p.theme || 'custom'}`
        : scope === 'vs'
          ? `${(p.viewMode || p.vs?.viewMode) === 'matchup-2x2' ? 'Matchups 2×2' : '1v1 VS Splash'} · ${p.vs?.design || 'custom'}`
          : scope === 'brackets'
            ? `${p.mode || p.brackets?.mode || 'top8-de'} · ${p.brackets?.design || 'custom'}`
            : `${p.aspect || p.results?.aspect || '16:9'} · ${p.results?.design || 'custom'}`;
      return `
        <div class="my-preset-card" data-mp-id="${esc(p.id)}">
          ${buildThumbForPreset(p)}
          <div class="my-preset-meta">
            <strong>${esc(p.name)}</strong>
            <span class="vs-tier-badge EPIC">SAVED</span>
          </div>
          <div class="my-preset-sub">${esc(sub)}</div>
          <div class="my-preset-actions">
            <button type="button" class="primary" data-mp-apply="${esc(p.id)}" style="flex:1;">✨ Apply</button>
            <button type="button" data-mp-export="${esc(p.id)}" title="Export as JSON">⬇</button>
            <button type="button" data-mp-del="${esc(p.id)}" title="Delete preset">✕</button>
          </div>
        </div>`;
    }).join('') || `
      <div style="padding:18px 12px;text-align:center;color:var(--muted);font-size:11px;border:1px dashed var(--border);border-radius:8px;">
        No saved <b>${metaLabel}</b> presets yet.<br/>Customize your look and click <b>💾 Save</b> above!
      </div>`;

    gridEl.innerHTML = quickHtml + cardsHtml;
  }

  /* =========================================================================
     TOURNAMENT BROADCAST PACKS & UNIFIED MY PRESETS MODAL (#packs-modal)
     ========================================================================= */
  let activePacksTab = 'bundle';

  function renderPacksModal() {
    const body = $('packs-list-host');
    if (!body) return;
    $('packs-modal-tabs')?.querySelectorAll('button[data-ptab]').forEach(b => {
      b.classList.toggle('active-chip', b.dataset.ptab === activePacksTab);
    });
    const saveBox = $('packs-bundle-save-box');
    const singleSaveBox = $('packs-single-save-box');
    if (saveBox) saveBox.style.display = activePacksTab === 'bundle' ? 'flex' : 'none';
    if (singleSaveBox) singleSaveBox.style.display = activePacksTab === 'bundle' ? 'none' : 'flex';
    const singleLbl = $('packs-single-save-label');
    if (singleLbl) {
      const names = { scorebar: '🎛 Current Scorebar', vs: '⚔️ Current VS Splash (1v1 / 2×2)', brackets: '🌿 Current Brackets', results: '🏅 Current Results / Top 8' };
      singleLbl.textContent = `💾 Save ${names[activePacksTab] || 'Preset'}`;
    }

    const list = getPresetsByScope(activePacksTab);
    if (activePacksTab === 'bundle') {
      body.innerHTML = list.map((pack) => {
        const mods = pack.modules || {};
        const modBtns = [
          mods.scorebar ? `<button type="button" data-pack-mod="${esc(pack.id)}" data-mod="scorebar" title="Apply ONLY Scorebar from this pack">🎛 SB</button>` : '',
          mods.vs ? `<button type="button" data-pack-mod="${esc(pack.id)}" data-mod="vs" title="Apply ONLY VS Splash from this pack">⚔️ VS</button>` : '',
          mods.brackets ? `<button type="button" data-pack-mod="${esc(pack.id)}" data-mod="brackets" title="Apply ONLY Brackets from this pack">🌿 BK</button>` : '',
          mods.results ? `<button type="button" data-pack-mod="${esc(pack.id)}" data-mod="results" title="Apply ONLY Top 8 Results from this pack">🏅 Top8</button>` : ''
        ].filter(Boolean).join('');
        return `
          <div class="my-preset-card">
            ${buildBundleQuadThumb(pack)}
            <div class="my-preset-meta">
              <strong>🏆 ${esc(pack.name)}</strong>
              <span class="vs-tier-badge EPIC">PACK</span>
            </div>
            ${pack.notes ? `<div class="my-preset-sub">${esc(pack.notes)}</div>` : ''}
            <div class="my-preset-actions">
              <button type="button" class="primary" data-pack-apply-all="${esc(pack.id)}" style="flex:1;">⚡ Apply All</button>
              <button type="button" data-mp-export="${esc(pack.id)}" title="Export Tournament Pack (.json)">⬇ JSON</button>
              <button type="button" data-mp-del="${esc(pack.id)}" title="Delete Pack">✕</button>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;padding-top:4px;border-top:1px solid rgba(255,255,255,0.06);">
              <span style="font-size:9.5px;color:var(--muted);">Apply single:</span>
              <div class="pack-mod-chips">${modBtns}</div>
            </div>
          </div>`;
      }).join('') || `
        <div style="grid-column:1/-1;padding:24px;text-align:center;color:var(--muted);font-size:12px;border:1px dashed var(--border);border-radius:10px;">
          🏆 No Tournament Broadcast Packs saved yet.<br/>
          Name your tournament above (e.g. <b>EVO Spain 2026</b>), choose which modules to include, and save your entire broadcast look in 1 click!
        </div>`;
      return;
    }

    body.innerHTML = list.map((p) => {
      const sub = activePacksTab === 'scorebar'
        ? `Theme: ${p.theme || 'custom'}`
        : activePacksTab === 'vs'
          ? `${(p.viewMode || p.vs?.viewMode) === 'matchup-2x2' ? 'Matchups 2×2' : '1v1 VS Splash'} · ${p.vs?.design || 'custom'}`
          : activePacksTab === 'brackets'
            ? `${p.mode || p.brackets?.mode || 'top8-de'} · ${p.brackets?.design || 'custom'}`
            : `${p.aspect || p.results?.aspect || '16:9'} · ${p.results?.design || 'custom'}`;
      return `
        <div class="my-preset-card">
          ${buildThumbForPreset(p)}
          <div class="my-preset-meta">
            <strong>${esc(p.name)}</strong>
            <span class="vs-tier-badge PRO">${activePacksTab.toUpperCase()}</span>
          </div>
          <div class="my-preset-sub">${esc(sub)}</div>
          <div class="my-preset-actions">
            <button type="button" class="primary" data-mp-apply="${esc(p.id)}" style="flex:1;">✨ Apply</button>
            <button type="button" data-mp-export="${esc(p.id)}" title="Export JSON">⬇</button>
            <button type="button" data-mp-del="${esc(p.id)}" title="Delete">✕</button>
          </div>
        </div>`;
    }).join('') || `
      <div style="grid-column:1/-1;padding:22px;text-align:center;color:var(--muted);font-size:12px;border:1px dashed var(--border);border-radius:10px;">
        No saved <b>${activePacksTab}</b> presets yet. Save one above or directly from the Designs sidebar!
      </div>`;
  }

  function updateAllCounts() {
    const all = P.getPresetsDb() || [];
    const sbCnt = all.filter(p => getScope(p) === 'scorebar').length;
    const vsCnt = all.filter(p => getScope(p) === 'vs').length;
    const bkCnt = all.filter(p => getScope(p) === 'brackets').length;
    const resCnt = all.filter(p => getScope(p) === 'results').length;
    const packCnt = all.filter(p => getScope(p) === 'bundle').length;

    const isEs = window.FGC_I18N?.getLang?.() === 'es';
    const mpLbl = isEs ? '★ Mis Presets' : '★ My Presets';
    if ($('hdr-packs-count')) $('hdr-packs-count').textContent = all.length;
    if ($('btn-sb-my-presets-tab')) $('btn-sb-my-presets-tab').textContent = sbCnt ? `${mpLbl} (${sbCnt})` : mpLbl;
    if ($('btn-vs-my-presets-tab')) $('btn-vs-my-presets-tab').textContent = vsCnt ? `${mpLbl} (${vsCnt})` : mpLbl;
    if ($('btn-bk-my-presets-tab')) $('btn-bk-my-presets-tab').textContent = bkCnt ? `${mpLbl} (${bkCnt})` : mpLbl;
    if ($('btn-res-my-presets-tab')) $('btn-res-my-presets-tab').textContent = resCnt ? `${mpLbl} (${resCnt})` : mpLbl;
    if ($('ptab-cnt-bundle')) $('ptab-cnt-bundle').textContent = packCnt;
    if ($('ptab-cnt-scorebar')) $('ptab-cnt-scorebar').textContent = sbCnt;
    if ($('ptab-cnt-vs')) $('ptab-cnt-vs').textContent = vsCnt;
    if ($('ptab-cnt-brackets')) $('ptab-cnt-brackets').textContent = bkCnt;
    if ($('ptab-cnt-results')) $('ptab-cnt-results').textContent = resCnt;
  }

  function refreshAllPresetViews() {
    updateAllCounts();
    const cats = P.getCurrentCats();
    if (cats.sb === 'my-presets') renderSidebarMyPresets('scorebar', $('theme-grid'));
    if (cats.vs === 'my-presets') renderSidebarMyPresets('vs', $('vs-design-grid'));
    if (cats.bk === 'my-presets') renderSidebarMyPresets('brackets', $('bk-design-grid'));
    if (cats.res === 'my-presets') renderSidebarMyPresets('results', $('res-design-grid'));
    if ($('packs-modal')?.classList.contains('open')) renderPacksModal();
  }

  function openPacksModal(tab) {
    if (tab) activePacksTab = tab;
    $('packs-modal')?.classList.add('open');
    renderPacksModal();
  }

  function applyPresetById(id) {
    const p = (P.getPresetsDb() || []).find(x => x.id === id);
    if (!p) return;
    const sc = getScope(p);
    if (sc === 'scorebar') {
      P.applyScorebarSnapshot(p);
      P.toast(`✨ Scorebar Preset applied: ${p.name}`);
    } else if (sc === 'vs') {
      applyVsSnapshot(p);
    } else if (sc === 'brackets') {
      applyBracketsSnapshot(p);
    } else if (sc === 'results') {
      applyResultsSnapshot(p);
    } else if (sc === 'bundle') {
      applyFullBundle(p);
    }
  }

  /* =========================================================================
     GLOBAL EVENT DELEGATION FOR ALL SIDEBARS + PACKS MODAL
     ========================================================================= */
  function handleMyPresetActionClick(e) {
    const openPacks = e.target.closest('[data-open-packs-modal]');
    if (openPacks) { openPacksModal('bundle'); return true; }

    const saveBtn = e.target.closest('[data-mp-save-scope]');
    if (saveBtn) {
      const scope = saveBtn.dataset.mpSaveScope;
      const inp = $(`mp-quick-name-${scope}`);
      const name = inp?.value?.trim();
      if (!name) {
        P.toast('Enter a preset name first');
        inp?.focus();
        return true;
      }
      const payload = scope === 'scorebar' ? P.buildScorebarSnapshot(name)
        : scope === 'vs' ? buildVsSnapshot(name)
        : scope === 'brackets' ? buildBracketsSnapshot(name)
        : buildResultsSnapshot(name);
      savePresetEntry(payload).then((ok) => {
        if (ok) {
          if (inp) inp.value = '';
          P.toast(`💾 Saved preset: ${name}`);
        }
      });
      return true;
    }

    const applyBtn = e.target.closest('[data-mp-apply]');
    if (applyBtn) { applyPresetById(applyBtn.dataset.mpApply); return true; }

    const applyAllBtn = e.target.closest('[data-pack-apply-all]');
    if (applyAllBtn) {
      const pack = (P.getPresetsDb() || []).find(x => x.id === applyAllBtn.dataset.packApplyAll);
      if (pack) applyFullBundle(pack);
      return true;
    }

    const modBtn = e.target.closest('[data-pack-mod]');
    if (modBtn) {
      const pack = (P.getPresetsDb() || []).find(x => x.id === modBtn.dataset.packMod);
      if (pack) applyBundleModule(pack, modBtn.dataset.mod);
      return true;
    }

    const expBtn = e.target.closest('[data-mp-export]');
    if (expBtn) {
      const p = (P.getPresetsDb() || []).find(x => x.id === expBtn.dataset.mpExport);
      if (p) exportPresetJson(p);
      return true;
    }

    const delBtn = e.target.closest('[data-mp-del]');
    if (delBtn) {
      const p = (P.getPresetsDb() || []).find(x => x.id === delBtn.dataset.mpDel);
      if (p) {
        deletePresetById(p.id).then(() => P.toast(`Deleted: ${p.name}`));
      }
      return true;
    }
    return false;
  }

  for (const gridId of ['theme-grid', 'vs-design-grid', 'bk-design-grid', 'res-design-grid', 'packs-list-host']) {
    $(gridId)?.addEventListener('click', (e) => {
      if (handleMyPresetActionClick(e)) {
        e.stopImmediatePropagation();
      }
    }, true);
  }

  // Quick Save buttons inside each workspace's right sidebar header
  const wireQuickSaveBtn = (btnId, filterBtnId, scope) => {
    $(btnId)?.addEventListener('click', () => {
      $(filterBtnId)?.click();
      setTimeout(() => $(`mp-quick-name-${scope}`)?.focus(), 40);
    });
  };
  wireQuickSaveBtn('btn-sb-quick-save', 'btn-sb-my-presets-tab', 'scorebar');
  wireQuickSaveBtn('btn-vs-quick-save', 'btn-vs-my-presets-tab', 'vs');
  wireQuickSaveBtn('btn-bk-quick-save', 'btn-bk-my-presets-tab', 'brackets');
  wireQuickSaveBtn('btn-res-quick-save', 'btn-res-my-presets-tab', 'results');

  // Top Header Packs Modal triggers & controls
  $('btn-open-packs')?.addEventListener('click', () => openPacksModal('bundle'));
  $('btn-close-packs-modal')?.addEventListener('click', () => $('packs-modal')?.classList.remove('open'));
  $('packs-modal')?.addEventListener('click', (e) => {
    if (e.target === $('packs-modal')) $('packs-modal').classList.remove('open');
  });
  $('packs-modal-tabs')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-ptab]');
    if (!btn) return;
    activePacksTab = btn.dataset.ptab;
    renderPacksModal();
  });

  $('btn-save-bundle-pack')?.addEventListener('click', async () => {
    const name = $('pack-bundle-name')?.value?.trim();
    if (!name) { P.toast('Enter a Tournament Pack name first'); $('pack-bundle-name')?.focus(); return; }
    const include = {
      scorebar: $('chk-pack-sb')?.checked !== false,
      vs: $('chk-pack-vs')?.checked !== false,
      brackets: $('chk-pack-bk')?.checked !== false,
      results: $('chk-pack-res')?.checked !== false
    };
    if (!include.scorebar && !include.vs && !include.brackets && !include.results) {
      return P.toast('Select at least one module to include');
    }
    const notes = $('pack-bundle-notes')?.value?.trim() || '';
    const payload = buildBundleSnapshot(name, include, notes);
    const ok = await savePresetEntry(payload);
    if (ok) {
      if ($('pack-bundle-name')) $('pack-bundle-name').value = '';
      if ($('pack-bundle-notes')) $('pack-bundle-notes').value = '';
      P.toast(`🏆 Tournament Pack saved: ${name}`);
    }
  });

  $('btn-save-single-pack')?.addEventListener('click', async () => {
    const name = $('pack-single-name')?.value?.trim();
    if (!name) { P.toast('Enter a preset name first'); $('pack-single-name')?.focus(); return; }
    const payload = activePacksTab === 'scorebar' ? P.buildScorebarSnapshot(name)
      : activePacksTab === 'vs' ? buildVsSnapshot(name)
      : activePacksTab === 'brackets' ? buildBracketsSnapshot(name)
      : buildResultsSnapshot(name);
    const ok = await savePresetEntry(payload);
    if (ok) {
      if ($('pack-single-name')) $('pack-single-name').value = '';
      P.toast(`💾 Saved preset: ${name}`);
    }
  });

  $('btn-import-pack-json')?.addEventListener('click', () => $('file-import-pack-json')?.click());
  $('file-import-pack-json')?.addEventListener('change', async (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (f) await importPresetJsonFile(f);
  });

  // Expose hooks so panel-app.js calls us whenever presetsDb updates or a sidebar switches to 'my-presets'
  window.FGC_PRESETS_UI = {
    renderSidebarMyPresets,
    buildScorebarPresetThumb,
    refreshAllPresetViews,
    openPacksModal,
    updateAllCounts
  };

  refreshAllPresetViews();
})();
