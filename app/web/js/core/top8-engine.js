/**
 * FGC Open Scorebars — Unified Top 8 Engine (Phase 4)
 * Shared zero-dependency Bracket + Matchup (1v1 & 2x2) normalizer, non-destructive
 * manual override resolver, SVG orthogonal connector renderer, and overlay DOM builder.
 */
(function (global) {
  'use strict';

  const TOP8_SLOT_DEFS = [
    { id: 'wsf1',  zone: 'winners', col: 0, label: 'Winners Semi-Final 1', short: 'WSF 1' },
    { id: 'wsf2',  zone: 'winners', col: 0, label: 'Winners Semi-Final 2', short: 'WSF 2' },
    { id: 'wf',    zone: 'winners', col: 1, label: 'Winners Final',        short: 'WF' },
    { id: 'gf',    zone: 'winners', col: 2, label: 'Grand Final',          short: 'GF' },
    { id: 'gfr',   zone: 'winners', col: 3, label: 'Grand Final Reset',    short: 'GF RESET' },
    { id: 'lr1_1', zone: 'losers',  col: 0, label: 'Losers Round 1 · A',   short: 'LR1 A' },
    { id: 'lr1_2', zone: 'losers',  col: 0, label: 'Losers Round 1 · B',   short: 'LR1 B' },
    { id: 'lqf1',  zone: 'losers',  col: 1, label: 'Losers Quarter-Final 1', short: 'LQF 1' },
    { id: 'lqf2',  zone: 'losers',  col: 1, label: 'Losers Quarter-Final 2', short: 'LQF 2' },
    { id: 'lsf',   zone: 'losers',  col: 2, label: 'Losers Semi-Final',    short: 'LSF' },
    { id: 'lf',    zone: 'losers',  col: 3, label: 'Losers Final',         short: 'LF' }
  ];

  const BOARD_PRESETS = {
    opening:  { win: ['wsf1', 'wsf2'], los: ['lr1_1', 'lr1_2'], winTitle: 'WINNERS SEMIFINALS', losTitle: 'LOSERS ROUND 1' },
    quarters: { win: ['wsf1', 'wsf2'], los: ['lqf1', 'lqf2'],   winTitle: 'WINNERS SEMIFINALS', losTitle: 'LOSERS QUARTERFINALS' },
    finals:   { win: ['wf', 'gf'],     los: ['lsf', 'lf'],      winTitle: 'WINNERS & GRAND FINALS', losTitle: 'LOSERS SEMIS & FINAL' }
  };

  function emptyPlayer() {
    return { name: 'TBD', sponsor: '', flag: '', region: '', seed: '', character: '', avatar: '', handle: '', score: 0 };
  }

  function createEmptyBracketSlots() {
    const out = {};
    for (const def of TOP8_SLOT_DEFS) {
      out[def.id] = {
        id: def.id,
        roundText: def.label.toUpperCase(),
        state: 'open',
        winnerSide: null,
        p1: emptyPlayer(),
        p2: emptyPlayer()
      };
    }
    return out;
  }

  function mergePlayer(base, over) {
    if (!over) return { ...emptyPlayer(), ...(base || {}) };
    return {
      ...emptyPlayer(),
      ...(base || {}),
      ...over
    };
  }

  /** Non-destructive merge: tournament sourceSlots + operator manualOverrides */
  function resolveBracketSlot(slotId, top8) {
    const def = TOP8_SLOT_DEFS.find(d => d.id === slotId);
    const src = top8?.sourceSlots?.[slotId] || null;
    const ov = top8?.manualOverrides?.[slotId] || null;
    const base = src || {
      id: slotId,
      roundText: def ? def.label.toUpperCase() : slotId.toUpperCase(),
      state: 'open',
      winnerSide: null,
      p1: emptyPlayer(),
      p2: emptyPlayer()
    };
    if (!ov) return { ...base, locked: false, hasOverride: false };
    return {
      ...base,
      ...ov,
      p1: mergePlayer(base.p1, ov.p1),
      p2: mergePlayer(base.p2, ov.p2),
      locked: Boolean(ov.locked),
      hasOverride: true
    };
  }

  function resolveAllBracketSlots(top8) {
    const out = {};
    for (const def of TOP8_SLOT_DEFS) {
      out[def.id] = resolveBracketSlot(def.id, top8);
    }
    return out;
  }

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  function cleanSeed(v) {
    const n = Number(String(v ?? '').replace(/^seed\s*/i, '').replace(/^#/, '').trim());
    return Number.isInteger(n) && n >= 1 ? n : null;
  }

  function renderFlagBadge(p, FLAGS_MAP, showIso) {
    const code = String(p?.flag || '').toUpperCase().trim();
    const f = code && FLAGS_MAP[code] ? FLAGS_MAP[code] : null;
    if (f && showIso) return `<span class="bk-flag-svg">${f.svg}</span><span>${esc(code)}</span>`;
    if (f) return `<span class="bk-flag-svg">${f.svg}</span>`;
    return code ? `<span>${esc(code)}</span>` : '<span>—</span>';
  }

  function renderInlineFlags(p, FLAGS_MAP) {
    const c = String(p?.flag || '').toUpperCase().trim();
    const r = String(p?.region || '').toUpperCase().trim();
    const list = [c && FLAGS_MAP[c], (r && r !== c) && FLAGS_MAP[r]].filter(Boolean);
    return list.map(f => `<span class="res-flag" style="width:24px;height:16px;">${f.svg}</span>`).join('');
  }

  function resolveCharArt(p, game, pack, isHttp, buildCharRenderUrl, resolveMediaSrc) {
    if (p?.character && isHttp && typeof buildCharRenderUrl === 'function') {
      return buildCharRenderUrl(game, pack, p.character);
    }
    if (p?.avatar && typeof resolveMediaSrc === 'function') {
      return resolveMediaSrc(p.avatar);
    }
    return '';
  }

  /** Render Full Double Elimination Top 8 Bracket + SVG Orthogonal Connectors */
  function renderBracketView(hostEl, state, opts = {}) {
    if (!hostEl) return;
    const top8 = state.top8 || {};
    const res = state.results || {};
    const FLAGS_MAP = opts.FLAGS_MAP || global.FGC_FLAGS || {};
    const resolveMediaSrc = opts.resolveMediaSrc || (u => u);
    const slots = resolveAllBracketSlots(top8);

    const theme = top8.bracketTheme || 'bracket-cpt-pro';
    hostEl.dataset.bkTheme = theme;

    const gfr = slots.gfr;
    const gfrHasData = Boolean((gfr.p1?.name && gfr.p1.name !== 'TBD') || (gfr.p2?.name && gfr.p2.name !== 'TBD') || gfr.state === 'active' || gfr.state === 'complete');
    const showReset = top8.showGfReset === 'show' || (top8.showGfReset !== 'hide' && gfrHasData);
    const showSeed = top8.showSeeds !== false && res.showSeed !== false;
    const showFlags = top8.showFlags !== false;
    const showSponsor = top8.showSponsor !== false;
    const showIso = top8.bracketShowIso !== false;
    const showTicker = top8.showBracketTicker !== false;
    const tickerTxt = (top8.bracketTickerText || '').trim() || `${res.title || 'TOP 8 BRACKET'} · LIVE BROADCAST`;
    const activeSlotId = top8.activeMatchSlot || 'wf';
    const rawLogo = res.logoUrl || state.vs?.logoUrl || '';
    const logoUrl = res.showLogo !== false && rawLogo ? resolveMediaSrc(rawLogo) : '';

    const renderMatchBox = (slotId) => {
      const m = slots[slotId];
      const isLive = m.state === 'active' || m.state === 'called';
      const p1Win = m.winnerSide === 'p1';
      const p2Win = m.winnerSide === 'p2';
      const s1 = showSeed ? cleanSeed(m.p1?.seed) : null;
      const s2 = showSeed ? cleanSeed(m.p2?.seed) : null;
      const isSel = opts.isPreview && opts.selectedSlot === slotId;

      const rowHtml = (pl, isWin, isLose, sd) => `
        <div class="bk-row ${isWin ? 'is-winner' : ''} ${isLose ? 'is-loser' : ''}">
          ${(showFlags || showIso) ? `<div class="bk-iso">${showFlags ? renderFlagBadge(pl, FLAGS_MAP, showIso) : (pl.flag ? `<span>${esc(String(pl.flag).toUpperCase())}</span>` : '<span>—</span>')}</div>` : ''}
          ${sd ? `<div class="bk-seed">#${sd}</div>` : ''}
          <div class="bk-name-wrap">
            ${showSponsor && pl.sponsor ? `<span class="bk-sp">${esc(pl.sponsor)}</span>` : ''}
            <span>${esc(pl.name || 'TBD')}</span>
          </div>
          <div class="bk-score">${Number(pl.score ?? 0)}</div>
        </div>`;

      const statusTag = isLive
        ? '<span class="bk-live-dot">● LIVE</span>'
        : (m.state === 'complete' ? '<span>FINAL</span>' : '<span>UPCOMING</span>');

      return `
        <div class="bk-match ${isLive ? 'is-active' : ''} ${isSel ? 'is-selected' : ''}" data-bk-slot="${slotId}">
          <div class="bk-match-tag">
            <span>${esc(m.roundText || slotId.toUpperCase())}${m.locked ? ' 🔒' : ''}</span>
            ${statusTag}
          </div>
          ${rowHtml(m.p1 || emptyPlayer(), p1Win, p2Win, s1)}
          ${rowHtml(m.p2 || emptyPlayer(), p2Win, p1Win, s2)}
        </div>`;
    };

    hostEl.innerHTML = `
      <div class="bk-shell">
        <header class="bk-header">
          <div class="bk-header-left">
            <img class="bk-logo ${logoUrl ? 'active' : ''}" src="${esc(logoUrl)}" alt="" crossorigin="anonymous" />
            <div>
              <div class="bk-title">${esc(res.title || 'TOP 8 BRACKET')}</div>
              <div class="bk-sub">${esc(res.subtitle || 'DOUBLE ELIMINATION FINALS')}</div>
            </div>
          </div>
          <div class="bk-badge">TOP 8 BRACKET</div>
        </header>

        <div class="bk-canvas-wrap" id="bk-canvas-wrap">
          <svg class="bk-svg-lines" id="bk-svg-lines" aria-hidden="true"></svg>

          <section class="bk-zone winners">
            <div class="bk-zone-tag">▲ WINNERS BRACKET</div>
            <div class="bk-grid winners-cols ${showReset ? '' : 'no-reset'}">
              <div class="bk-col">
                <div class="bk-col-head">Winners Semifinals</div>
                ${renderMatchBox('wsf1')}
                ${renderMatchBox('wsf2')}
              </div>
              <div class="bk-col">
                <div class="bk-col-head">Winners Final</div>
                ${renderMatchBox('wf')}
              </div>
              <div class="bk-col">
                <div class="bk-col-head">Grand Final</div>
                ${renderMatchBox('gf')}
              </div>
              ${showReset ? `
              <div class="bk-col">
                <div class="bk-col-head">Grand Final Reset</div>
                ${renderMatchBox('gfr')}
              </div>` : ''}
            </div>
          </section>

          <section class="bk-zone losers">
            <div class="bk-zone-tag">▼ LOSERS BRACKET</div>
            <div class="bk-grid losers-cols">
              <div class="bk-col">
                <div class="bk-col-head">Losers Round 1</div>
                ${renderMatchBox('lr1_1')}
                ${renderMatchBox('lr1_2')}
              </div>
              <div class="bk-col">
                <div class="bk-col-head">Losers Quarterfinals</div>
                ${renderMatchBox('lqf1')}
                ${renderMatchBox('lqf2')}
              </div>
              <div class="bk-col">
                <div class="bk-col-head">Losers Semifinal</div>
                ${renderMatchBox('lsf')}
              </div>
              <div class="bk-col">
                <div class="bk-col-head">Losers Final</div>
                ${renderMatchBox('lf')}
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer class="bk-ticker-bar ${showTicker ? '' : 'hidden-el'}">
        <span class="bk-ticker-pill">${esc((res.game || 'FGC').toUpperCase())}</span>
        <span>${esc(tickerTxt)}</span>
        <span>${res.entrantsCount ? `${esc(res.entrantsCount)} ENTRANTS` : 'LIVE'}</span>
      </footer>`;

    // Draw orthogonal SVG connector lines between bracket boxes after layout!
    requestAnimationFrame(() => drawBracketConnectors(hostEl, showReset));
  }

  function drawBracketConnectors(hostEl, showReset) {
    const wrap = hostEl.querySelector('#bk-canvas-wrap');
    const svg = hostEl.querySelector('#bk-svg-lines');
    if (!wrap || !svg) return;
    const wr = wrap.getBoundingClientRect();
    if (!wr.width || !wr.height) return;
    const scaleX = wrap.offsetWidth / wr.width;
    const scaleY = wrap.offsetHeight / wr.height;
    svg.setAttribute('viewBox', `0 0 ${wrap.offsetWidth} ${wrap.offsetHeight}`);

    const getBox = (id) => {
      const el = wrap.querySelector(`[data-bk-slot="${id}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        l: (r.left - wr.left) * scaleX,
        r: (r.right - wr.left) * scaleX,
        cy: ((r.top + r.bottom) / 2 - wr.top) * scaleY
      };
    };

    const pairs = [
      ['wsf1', 'wf'], ['wsf2', 'wf'],
      ['wf', 'gf'],
      ['lr1_1', 'lqf1'], ['lr1_2', 'lqf2'],
      ['lqf1', 'lsf'], ['lqf2', 'lsf'],
      ['lsf', 'lf']
    ];
    if (showReset) pairs.push(['gf', 'gfr']);

    const paths = [];
    for (const [fromId, toId] of pairs) {
      const a = getBox(fromId);
      const b = getBox(toId);
      if (!a || !b) continue;
      const midX = a.r + (b.l - a.r) * 0.5;
      paths.push(`<path d="M ${a.r.toFixed(1)} ${a.cy.toFixed(1)} L ${midX.toFixed(1)} ${a.cy.toFixed(1)} L ${midX.toFixed(1)} ${b.cy.toFixed(1)} L ${b.l.toFixed(1)} ${b.cy.toFixed(1)}" />`);
    }
    svg.innerHTML = paths.join('');
  }

  /** Render Top 8 Matchups 2x2 Board with Dynamic VS Design Theming & Interactive 8-Character Framing */
  function renderMatchupView(hostEl, state, mode, opts = {}) {
    if (!hostEl) return;
    const top8 = state.top8 || {};
    const res = state.results || {};
    const vs = state.vs || {};
    const fromVs = Boolean(opts.fromVs);
    const FLAGS_MAP = opts.FLAGS_MAP || global.FGC_FLAGS || {};
    const resolveMediaSrc = opts.resolveMediaSrc || (u => u);
    const buildCharRenderUrl = opts.buildCharRenderUrl;
    const isHttp = Boolean(opts.isHttp);
    const game = (fromVs ? (vs.game || res.game) : (res.game || vs.game)) || 'tekken8';
    const pack = (fromVs ? (vs.pack || res.pack) : (res.pack || vs.pack)) || 'full';
    const showSeed = fromVs ? (vs.matchupShowSeeds !== false) : (res.showSeed !== false);
    const showScore = fromVs ? (vs.matchupShowScore !== false) : true;
    const showHandles = fromVs ? (vs.matchupShowHandles !== false) : (res.showHandles !== false);
    const slots = resolveAllBracketSlots(top8);
    const artPosMap = (vs.matchupArtPos && typeof vs.matchupArtPos === 'object') ? vs.matchupArtPos : {};
    const gX = Number(vs.matchupGlobalX || 0);
    const gY = Number(vs.matchupGlobalY || 0);
    const gScale = Math.max(40, Math.min(350, Number(vs.matchupGlobalScale ?? 100))) / 100;
    const selectedMuKey = opts.selectedMuKey || '';
    const vsBadgeTxt = (vs.emblemText && String(vs.emblemText).trim()) ? String(vs.emblemText).trim().slice(0, 6) : 'VS';

    hostEl.dataset.muTheme = fromVs ? 'sync-vs' : (top8.matchupTheme || 'matchup-battle-coliseum');

    const rawLogo = (fromVs ? (vs.logoUrl || res.logoUrl) : (res.logoUrl || vs.logoUrl)) || '';
    const logoUrl = (fromVs ? vs.showLogo !== false : res.showLogo !== false) && rawLogo ? resolveMediaSrc(rawLogo) : '';
    const titleTxt = (fromVs ? (res.title || state.tournament || state.brackets?.title) : (res.title || state.tournament)) || 'TOP 8 MATCHUPS';
    const subTxt = (fromVs ? (vs.subtitle || res.subtitle || state.brackets?.subtitle) : res.subtitle) || 'WINNERS & LOSERS MATCHUPS';

    // BOARD 2x2 (2 Winners + 2 Losers)
    const presetKey = fromVs ? (vs.matchupBoardPreset || 'opening') : (top8.boardPreset || 'opening');
    const customSlots = Array.isArray(vs.matchupCustomSlots) && vs.matchupCustomSlots.length === 4 ? vs.matchupCustomSlots : ['wsf1', 'wsf2', 'lr1_1', 'lr1_2'];
    const bp = (fromVs && presetKey === 'custom')
      ? { win: [customSlots[0], customSlots[1]], los: [customSlots[2], customSlots[3]], winTitle: 'WINNERS MATCHUPS', losTitle: 'LOSERS MATCHUPS' }
      : (BOARD_PRESETS[presetKey] || BOARD_PRESETS.opening);

    const buildHalfArt = (slotId, slotShort, side, player, artUrl) => {
      const key = `${slotId}_${side}`;
      const pos = artPosMap[key] || {};
      const x = gX + Number(pos.x || 0);
      const y = gY + Number(pos.y || 0);
      const sc = gScale * (Math.max(40, Math.min(350, Number(pos.scale ?? 100))) / 100);
      const flip = (pos.flip !== undefined && pos.flip !== null) ? Boolean(pos.flip) : (side === 'p2');
      const isSel = Boolean(opts.isPreview && selectedMuKey === key);
      const halfCls = side === 'p1' ? 'left' : 'right';
      const label = `${slotShort} · ${side.toUpperCase()} (${player.name || 'TBD'})${player.character ? ' · ' + player.character : ''}`;
      const tf = `translate(${x}px, ${y}px) scale(${sc.toFixed(3)}) scaleX(${flip ? -1 : 1})`;
      return `<div class="mu-pair-half ${halfCls} mu-char-hit ${isSel ? 'is-selected' : ''}" data-mu-key="${esc(key)}" data-mu-slot="${esc(slotId)}" data-mu-side="${side}" data-mu-label="${esc(label)}">${artUrl ? `<img src="${esc(artUrl)}" alt="" crossorigin="anonymous" style="transform:${tf};transform-origin:50% 130px;" />` : ''}</div>`;
    };

    const renderPairCard = (slotId) => {
      const def = TOP8_SLOT_DEFS.find(d => d.id === slotId);
      const slotShort = def ? def.short : slotId.toUpperCase();
      const m = slots[slotId] || { roundText: slotId.toUpperCase(), p1: emptyPlayer(), p2: emptyPlayer() };
      const p1 = m.p1 || emptyPlayer();
      const p2 = m.p2 || emptyPlayer();
      const art1 = resolveCharArt(p1, game, pack, isHttp, buildCharRenderUrl, resolveMediaSrc);
      const art2 = resolveCharArt(p2, game, pack, isHttp, buildCharRenderUrl, resolveMediaSrc);
      const sd1 = showSeed ? cleanSeed(p1.seed) : null;
      const sd2 = showSeed ? cleanSeed(p2.seed) : null;
      const hasScore = showScore && (Number(p1.score || 0) > 0 || Number(p2.score || 0) > 0 || m.state === 'complete');

      return `
        <article class="mu-pair-card" data-bk-slot="${slotId}">
          <div class="mu-pair-art">
            <div class="mu-pair-round-tag">${esc(m.roundText || slotId.toUpperCase())}</div>
            ${buildHalfArt(slotId, slotShort, 'p1', p1, art1)}
            <div class="mu-pair-vs">${esc(vsBadgeTxt)}</div>
            ${buildHalfArt(slotId, slotShort, 'p2', p2, art2)}
          </div>
          <div class="mu-pair-foot">
            <div class="mu-foot-side left">
              <div class="mu-foot-meta">
                ${renderInlineFlags(p1, FLAGS_MAP)}
                ${p1.sponsor ? `<span>${esc(p1.sponsor)}</span>` : ''}
                ${sd1 ? `<span class="res-seed-pill">#${sd1}</span>` : ''}
              </div>
              <div class="mu-foot-name">${esc(p1.name || 'TBD')}</div>
              <div class="mu-foot-sub">${esc([p1.character, showHandles ? p1.handle : ''].filter(Boolean).join(' · '))}</div>
            </div>
            <div class="mu-foot-score">${hasScore ? `${Number(p1.score || 0)} - ${Number(p2.score || 0)}` : esc(vsBadgeTxt)}</div>
            <div class="mu-foot-side right">
              <div class="mu-foot-meta">
                ${renderInlineFlags(p2, FLAGS_MAP)}
                ${p2.sponsor ? `<span>${esc(p2.sponsor)}</span>` : ''}
                ${sd2 ? `<span class="res-seed-pill">#${sd2}</span>` : ''}
              </div>
              <div class="mu-foot-name">${esc(p2.name || 'TBD')}</div>
              <div class="mu-foot-sub">${esc([p2.character, showHandles ? p2.handle : ''].filter(Boolean).join(' · '))}</div>
            </div>
          </div>
        </article>`;
    };

    hostEl.innerHTML = `
      <div class="mu-shell">
        <header class="mu-header">
          <div class="bk-header-left">
            <img class="bk-logo ${logoUrl ? 'active' : ''}" src="${esc(logoUrl)}" alt="" crossorigin="anonymous" />
            <div>
              <div class="mu-title">${esc(titleTxt)}</div>
              <div class="mu-sub">${esc(subTxt)}</div>
            </div>
          </div>
          <div class="bk-badge">TOP 8 MATCHUPS</div>
        </header>

        <div class="mu-board-2x2">
          <div class="mu-board-col">
            <div class="mu-col-banner win"><span>▲ ${bp.winTitle}</span><span>WINNERS</span></div>
            ${renderPairCard(bp.win[0])}
            ${renderPairCard(bp.win[1])}
          </div>
          <div class="mu-board-col">
            <div class="mu-col-banner los"><span>▼ ${bp.losTitle}</span><span>LOSERS</span></div>
            ${renderPairCard(bp.los[0])}
            ${renderPairCard(bp.los[1])}
          </div>
        </div>
      </div>`;
  }

  global.FGC_TOP8_ENGINE = {
    TOP8_SLOT_DEFS,
    BOARD_PRESETS,
    createEmptyBracketSlots,
    resolveBracketSlot,
    resolveAllBracketSlots,
    renderBracketView,
    renderMatchupView,
    drawBracketConnectors
  };
})(typeof window !== 'undefined' ? window : globalThis);
