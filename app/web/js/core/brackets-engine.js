/**
 * FGC Open Scorebars — Brackets & Pools Studio Engine
 * Renders 4 full broadcast tournament visualization modes inside brackets.html:
 *   1. 'top8-de'      : Full 11-slot Top 8 Double Elimination Bracket + 4 SVG Connector styles
 *   2. 'pools-groups' : Multi-Pool / Groups Progress Cards (Pool A1, A2, B1, B2... with W-L & Advancing Top Cut)
 *   3. 'pool-tree'    : Single-Pool 8-Player Double Elimination Tree (QF -> SF -> Pool Finals -> Top 8 Qualifiers)
 *   4. 'top16-table'  : Broadcast Top 16 / Phase Standings & Bracket Status Leaderboard
 * Zero dependencies, 100% offline.
 */
(function (global) {
  'use strict';

  const POOL_TREE_SLOTS = [
    { id: 'pqf1', zone: 'winners', col: 0, label: 'Pool Quarterfinal 1', short: 'PQF 1' },
    { id: 'pqf2', zone: 'winners', col: 0, label: 'Pool Quarterfinal 2', short: 'PQF 2' },
    { id: 'pqf3', zone: 'winners', col: 0, label: 'Pool Quarterfinal 3', short: 'PQF 3' },
    { id: 'pqf4', zone: 'winners', col: 0, label: 'Pool Quarterfinal 4', short: 'PQF 4' },
    { id: 'psf1', zone: 'winners', col: 1, label: 'Pool Semifinal 1',    short: 'PSF 1' },
    { id: 'psf2', zone: 'winners', col: 1, label: 'Pool Semifinal 2',    short: 'PSF 2' },
    { id: 'pwf',  zone: 'winners', col: 2, label: 'Pool Winners Final',  short: 'POOL WF' },
    { id: 'plqf1', zone: 'losers', col: 0, label: 'Pool Losers R1 · A',  short: 'PLR1 A' },
    { id: 'plqf2', zone: 'losers', col: 0, label: 'Pool Losers R1 · B',  short: 'PLR1 B' },
    { id: 'plsf',  zone: 'losers', col: 1, label: 'Pool Losers Semi',    short: 'PLSF' },
    { id: 'plf',   zone: 'losers', col: 2, label: 'Pool Losers Final',   short: 'POOL LF' }
  ];

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  function cleanSeed(v) {
    const n = Number(String(v ?? '').replace(/^seed\s*/i, '').replace(/^#/, '').trim());
    return Number.isInteger(n) && n >= 1 ? n : null;
  }

  function emptyPlayer() {
    return { name: 'TBD', sponsor: '', flag: '', region: '', seed: '', character: '', avatar: '', handle: '', score: 0 };
  }

  function renderIsoFlag(pl, FLAGS_MAP, showFlags, showIso) {
    if (!showFlags && !showIso) return '';
    const code = String(pl?.flag || '').toUpperCase().trim();
    const f = code && FLAGS_MAP[code] ? FLAGS_MAP[code] : null;
    const svg = showFlags && f ? `<span class="bks-flag-svg">${f.svg}</span>` : '';
    const txt = showIso ? `<span class="bks-iso-txt">${esc(code || '—')}</span>` : '';
    return `<div class="bks-iso">${svg}${txt || (svg ? '' : '<span>—</span>')}</div>`;
  }

  function renderMatchCard(slotId, m, opts) {
    const { FLAGS_MAP, showFlags, showIso, showSeeds, showSponsor, isPreview, selectedSlot, qualTag } = opts;
    const isLive = m.state === 'active' || m.state === 'called';
    const p1Win = m.winnerSide === 'p1';
    const p2Win = m.winnerSide === 'p2';
    const s1 = showSeeds ? cleanSeed(m.p1?.seed) : null;
    const s2 = showSeeds ? cleanSeed(m.p2?.seed) : null;
    const isSel = isPreview && selectedSlot === slotId;

    const row = (pl, isWin, isLose, sd) => `
      <div class="bks-row ${isWin ? 'is-winner' : ''} ${isLose ? 'is-loser' : ''}">
        ${renderIsoFlag(pl, FLAGS_MAP, showFlags, showIso)}
        ${sd ? `<div class="bks-seed">#${sd}</div>` : ''}
        <div class="bks-name-wrap">
          ${showSponsor && pl.sponsor ? `<span class="bks-sp">${esc(pl.sponsor)}</span>` : ''}
          <span class="bks-name">${esc(pl.name || 'TBD')}</span>
        </div>
        <div class="bks-score">${m.state === 'open' && Number(pl.score || 0) === 0 && (!pl.name || pl.name === 'TBD') ? '—' : Number(pl.score ?? 0)}</div>
      </div>`;

    const statusBadge = isLive
      ? '<span class="bks-live-dot">● LIVE</span>'
      : (qualTag && m.state === 'complete'
        ? `<span class="bks-qual-tag">${esc(qualTag)}</span>`
        : (m.state === 'complete' ? '<span>FINAL</span>' : '<span>UPCOMING</span>'));

    return `
      <div class="bks-match bks-anim-item ${isLive ? 'is-active' : ''} ${isSel ? 'is-selected' : ''}" data-bk-slot="${esc(slotId)}">
        <div class="bks-match-head">
          <span>${esc(m.roundText || slotId.toUpperCase())}${m.locked ? ' 🔒' : ''}</span>
          ${statusBadge}
        </div>
        ${row(m.p1 || emptyPlayer(), p1Win, p2Win, s1)}
        ${row(m.p2 || emptyPlayer(), p2Win, p1Win, s2)}
      </div>`;
  }

  function buildWirePath(a, b, style) {
    const midX = a.r + (b.l - a.r) * 0.5;
    if (style === 'curved') {
      const dx = Math.max(24, (b.l - a.r) * 0.55);
      return `M ${a.r.toFixed(1)} ${a.cy.toFixed(1)} C ${(a.r + dx).toFixed(1)} ${a.cy.toFixed(1)}, ${(b.l - dx).toFixed(1)} ${b.cy.toFixed(1)}, ${b.l.toFixed(1)} ${b.cy.toFixed(1)}`;
    }
    if (style === 'rounded') {
      const dy = b.cy - a.cy;
      if (Math.abs(dy) < 4) return `M ${a.r.toFixed(1)} ${a.cy.toFixed(1)} L ${b.l.toFixed(1)} ${b.cy.toFixed(1)}`;
      const rad = Math.min(12, Math.abs(dy) / 2, Math.max(4, (b.l - a.r) * 0.28));
      const sgn = dy > 0 ? 1 : -1;
      return [
        `M ${a.r.toFixed(1)} ${a.cy.toFixed(1)}`,
        `L ${(midX - rad).toFixed(1)} ${a.cy.toFixed(1)}`,
        `Q ${midX.toFixed(1)} ${a.cy.toFixed(1)} ${midX.toFixed(1)} ${(a.cy + sgn * rad).toFixed(1)}`,
        `L ${midX.toFixed(1)} ${(b.cy - sgn * rad).toFixed(1)}`,
        `Q ${midX.toFixed(1)} ${b.cy.toFixed(1)} ${(midX + rad).toFixed(1)} ${b.cy.toFixed(1)}`,
        `L ${b.l.toFixed(1)} ${b.cy.toFixed(1)}`
      ].join(' ');
    }
    return `M ${a.r.toFixed(1)} ${a.cy.toFixed(1)} L ${midX.toFixed(1)} ${a.cy.toFixed(1)} L ${midX.toFixed(1)} ${b.cy.toFixed(1)} L ${b.l.toFixed(1)} ${b.cy.toFixed(1)}`;
  }

  function drawConnectors(hostEl, pairs, style) {
    const wrap = hostEl.querySelector('#bks-tree-wrap');
    const svg = hostEl.querySelector('#bks-svg-lines');
    if (!wrap || !svg) return;
    const wW = wrap.offsetWidth;
    const wH = wrap.offsetHeight;
    if (!wW || !wH) return;
    svg.setAttribute('viewBox', `0 0 ${wW} ${wH}`);

    // Walk offsetParent chain to wrap so CSS entry transforms (translate/scale) never distort wire positions!
    const getBox = (id) => {
      const el = wrap.querySelector(`[data-bk-slot="${id}"]`);
      if (!el) return null;
      let left = 0;
      let top = 0;
      let cur = el;
      let guard = 0;
      while (cur && cur !== wrap && guard < 12) {
        left += cur.offsetLeft || 0;
        top += cur.offsetTop || 0;
        cur = cur.offsetParent;
        guard++;
      }
      if (cur !== wrap) {
        const wr = wrap.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        if (!wr.width || !wr.height) return null;
        const sx = wW / wr.width;
        const sy = wH / wr.height;
        return {
          l: (r.left - wr.left) * sx,
          r: (r.right - wr.left) * sx,
          cy: ((r.top + r.bottom) / 2 - wr.top) * sy
        };
      }
      return {
        l: left,
        r: left + el.offsetWidth,
        cy: top + el.offsetHeight / 2
      };
    };

    const paths = [];
    for (const [fromId, toId] of pairs) {
      const a = getBox(fromId);
      const b = getBox(toId);
      if (!a || !b) continue;
      paths.push(`<path d="${buildWirePath(a, b, style)}" />`);
    }
    svg.innerHTML = paths.join('');
  }

  /* =========================================================================
     MODE 1: FULL TOP 8 DOUBLE ELIMINATION BRACKET
     ========================================================================= */
  function renderTop8Bracket(hostEl, state, opts) {
    const bk = state.brackets || {};
    const top8 = state.top8 || {};
    const T8E = global.FGC_TOP8_ENGINE;
    const slots = T8E ? T8E.resolveAllBracketSlots(top8) : (top8.sourceSlots || {});

    const gfr = slots.gfr || { p1: emptyPlayer(), p2: emptyPlayer(), state: 'open' };
    const gfrHasData = Boolean((gfr.p1?.name && gfr.p1.name !== 'TBD') || (gfr.p2?.name && gfr.p2.name !== 'TBD') || gfr.state === 'active' || gfr.state === 'complete');
    const resetMode = bk.showGfReset || top8.showGfReset || 'auto';
    const showReset = resetMode === 'show' || (resetMode !== 'hide' && gfrHasData);

    const cardOpts = {
      ...opts,
      showFlags: bk.showFlags !== false,
      showIso: bk.showIso !== false,
      showSeeds: bk.showSeeds !== false,
      showSponsor: bk.showSponsor !== false
    };

    hostEl.innerHTML = `
      <div class="bks-tree-wrap" id="bks-tree-wrap">
        <svg class="bks-svg-lines" id="bks-svg-lines" aria-hidden="true"></svg>

        <section class="bks-zone winners">
          <div class="bks-zone-tag">▲ WINNERS BRACKET</div>
          <div class="bks-grid winners-cols ${showReset ? '' : 'no-reset'}">
            <div class="bks-col" style="--col-i:0">
              <div class="bks-col-head">Winners Semifinals</div>
              ${renderMatchCard('wsf1', slots.wsf1 || {}, cardOpts)}
              ${renderMatchCard('wsf2', slots.wsf2 || {}, cardOpts)}
            </div>
            <div class="bks-col" style="--col-i:1">
              <div class="bks-col-head">Winners Final</div>
              ${renderMatchCard('wf', slots.wf || {}, cardOpts)}
            </div>
            <div class="bks-col" style="--col-i:2">
              <div class="bks-col-head">Grand Final</div>
              ${renderMatchCard('gf', slots.gf || {}, { ...cardOpts, qualTag: '👑 CHAMPION' })}
            </div>
            ${showReset ? `
            <div class="bks-col" style="--col-i:3">
              <div class="bks-col-head">Grand Final Reset</div>
              ${renderMatchCard('gfr', slots.gfr || {}, { ...cardOpts, qualTag: '👑 CHAMPION' })}
            </div>` : ''}
          </div>
        </section>

        <section class="bks-zone losers">
          <div class="bks-zone-tag">▼ LOSERS BRACKET</div>
          <div class="bks-grid losers-cols">
            <div class="bks-col" style="--col-i:0">
              <div class="bks-col-head">Losers Round 1</div>
              ${renderMatchCard('lr1_1', slots.lr1_1 || {}, cardOpts)}
              ${renderMatchCard('lr1_2', slots.lr1_2 || {}, cardOpts)}
            </div>
            <div class="bks-col" style="--col-i:1">
              <div class="bks-col-head">Losers Quarterfinals</div>
              ${renderMatchCard('lqf1', slots.lqf1 || {}, cardOpts)}
              ${renderMatchCard('lqf2', slots.lqf2 || {}, cardOpts)}
            </div>
            <div class="bks-col" style="--col-i:2">
              <div class="bks-col-head">Losers Semifinal</div>
              ${renderMatchCard('lsf', slots.lsf || {}, cardOpts)}
            </div>
            <div class="bks-col" style="--col-i:3">
              <div class="bks-col-head">Losers Final</div>
              ${renderMatchCard('lf', slots.lf || {}, cardOpts)}
            </div>
          </div>
        </section>
      </div>`;

    const pairs = [
      ['wsf1', 'wf'], ['wsf2', 'wf'], ['wf', 'gf'],
      ['lr1_1', 'lqf1'], ['lr1_2', 'lqf2'],
      ['lqf1', 'lsf'], ['lqf2', 'lsf'], ['lsf', 'lf']
    ];
    if (showReset) pairs.push(['gf', 'gfr']);
    drawConnectors(hostEl, pairs, opts.connectorStyle || 'orthogonal');
    requestAnimationFrame(() => drawConnectors(hostEl, pairs, opts.connectorStyle || 'orthogonal'));
  }

  /* =========================================================================
     MODE 2: POOLS / GROUPS LIVE STANDINGS & ADVANCEMENT PROGRESS
     ========================================================================= */
  function renderPoolsGroups(hostEl, state, opts) {
    const bk = state.brackets || {};
    const FLAGS_MAP = opts.FLAGS_MAP || global.FGC_FLAGS || {};
    const showFlags = bk.showFlags !== false;
    const showIso = bk.showIso !== false;
    const showSeeds = bk.showSeeds !== false;
    const showSponsor = bk.showSponsor !== false;
    const pools = Array.isArray(bk.pools) && bk.pools.length ? bk.pools : [];
    const visibleCount = Math.min(pools.length, Number(bk.poolsPerPage || 4));
    const pageIdx = Math.max(0, Number(bk.poolsPage || 0));
    const slice = pools.slice(pageIdx * visibleCount, pageIdx * visibleCount + visibleCount);
    const list = slice.length ? slice : pools.slice(0, 4);
    const cols = list.length <= 2 ? 2 : list.length === 3 ? 3 : list.length <= 4 ? 2 : 3;

    hostEl.innerHTML = `
      <div class="bks-pools-grid cols-${cols}">
        ${list.map((pool, pi) => {
          const isSel = opts.isPreview && opts.selectedPoolId === pool.id;
          const status = String(pool.status || 'live').toLowerCase();
          const stLabel = status === 'complete' ? 'COMPLETE' : status === 'upcoming' ? 'UPCOMING' : '● IN PROGRESS';
          const advW = Number(pool.advanceWinners ?? 1);
          const advL = Number(pool.advanceLosers ?? 1);
          const rows = Array.isArray(pool.players) ? pool.players : [];
          return `
            <article class="bks-pool-card bks-anim-item ${isSel ? 'is-selected' : ''}" data-pool-id="${esc(pool.id)}" style="--col-i:${pi}">
              <header class="bks-pool-head">
                <div class="bks-pool-title-wrap">
                  <span class="bks-pool-code">${esc(pool.name || `POOL ${pi + 1}`)}</span>
                  ${pool.subtitle ? `<span class="bks-pool-sub">${esc(pool.subtitle)}</span>` : ''}
                </div>
                <span class="bks-pool-status is-${esc(status)}">${stLabel}</span>
              </header>
              <div class="bks-pool-cols-hdr">
                <span>#</span><span>PLAYER</span><span>W-L</span><span>STATUS</span>
              </div>
              <div class="bks-pool-rows">
                ${rows.map((p, ri) => {
                  const rank = ri + 1;
                  const qual = p.status || (rank <= advW ? 'winners' : rank <= (advW + advL) ? 'losers' : 'out');
                  const qualTxt = qual === 'winners' ? 'WINNERS' : qual === 'losers' ? 'LOSERS' : qual === 'alive' ? 'PLAYING' : 'OUT';
                  const sd = showSeeds ? cleanSeed(p.seed) : null;
                  return `
                    <div class="bks-pool-row is-${esc(qual)}">
                      <span class="bks-pr-rank">${rank}</span>
                      <div class="bks-pr-player">
                        ${renderIsoFlag(p, FLAGS_MAP, showFlags, showIso)}
                        ${sd ? `<span class="bks-seed">#${sd}</span>` : ''}
                        <span class="bks-pr-name">
                          ${showSponsor && p.sponsor ? `<span class="bks-sp">${esc(p.sponsor)}</span>` : ''}
                          ${esc(p.name || `Player ${rank}`)}
                        </span>
                      </div>
                      <span class="bks-pr-wl">${Number(p.wins ?? 0)}-${Number(p.losses ?? 0)}</span>
                      <span class="bks-pr-pill is-${esc(qual)}">${qualTxt}</span>
                    </div>`;
                }).join('')}
              </div>
            </article>`;
        }).join('')}
      </div>`;
  }

  /* =========================================================================
     MODE 3: SINGLE-POOL 8-PLAYER DOUBLE ELIMINATION TREE
     ========================================================================= */
  function renderPoolTree(hostEl, state, opts) {
    const bk = state.brackets || {};
    const slots = bk.poolTreeSlots || {};
    const getM = (id, fb) => slots[id] || { id, roundText: fb, state: 'open', winnerSide: null, p1: emptyPlayer(), p2: emptyPlayer() };
    const cardOpts = {
      ...opts,
      showFlags: bk.showFlags !== false,
      showIso: bk.showIso !== false,
      showSeeds: bk.showSeeds !== false,
      showSponsor: bk.showSponsors !== false && bk.showSponsor !== false
    };
    const poolTitle = bk.poolTreeTitle || bk.activePoolName || 'POOL A1 — DOUBLE ELIMINATION';

    hostEl.innerHTML = `
      <div class="bks-tree-wrap" id="bks-tree-wrap">
        <svg class="bks-svg-lines" id="bks-svg-lines" aria-hidden="true"></svg>

        <section class="bks-zone winners">
          <div class="bks-zone-tag">▲ ${esc(poolTitle)} · WINNERS SIDE</div>
          <div class="bks-grid winners-cols no-reset">
            <div class="bks-col compact-4" style="--col-i:0">
              <div class="bks-col-head">Pool Quarters</div>
              ${renderMatchCard('pqf1', getM('pqf1', 'POOL QF 1'), cardOpts)}
              ${renderMatchCard('pqf2', getM('pqf2', 'POOL QF 2'), cardOpts)}
              ${renderMatchCard('pqf3', getM('pqf3', 'POOL QF 3'), cardOpts)}
              ${renderMatchCard('pqf4', getM('pqf4', 'POOL QF 4'), cardOpts)}
            </div>
            <div class="bks-col" style="--col-i:1">
              <div class="bks-col-head">Pool Semifinals</div>
              ${renderMatchCard('psf1', getM('psf1', 'POOL SF 1'), cardOpts)}
              ${renderMatchCard('psf2', getM('psf2', 'POOL SF 2'), cardOpts)}
            </div>
            <div class="bks-col" style="--col-i:2">
              <div class="bks-col-head">Pool Winners Final</div>
              ${renderMatchCard('pwf', getM('pwf', 'POOL WINNERS FINAL'), { ...cardOpts, qualTag: '★ TOP 8 [W]' })}
            </div>
          </div>
        </section>

        <section class="bks-zone losers">
          <div class="bks-zone-tag">▼ POOL LOSERS SIDE (1 QUALIFIES TO TOP 8 LOSERS)</div>
          <div class="bks-grid losers-cols no-reset">
            <div class="bks-col" style="--col-i:0">
              <div class="bks-col-head">Pool Losers R1</div>
              ${renderMatchCard('plqf1', getM('plqf1', 'LOSERS R1 A'), cardOpts)}
              ${renderMatchCard('plqf2', getM('plqf2', 'LOSERS R1 B'), cardOpts)}
            </div>
            <div class="bks-col" style="--col-i:1">
              <div class="bks-col-head">Pool Losers Semi</div>
              ${renderMatchCard('plsf', getM('plsf', 'POOL LOSERS SEMI'), cardOpts)}
            </div>
            <div class="bks-col" style="--col-i:2">
              <div class="bks-col-head">Pool Losers Final</div>
              ${renderMatchCard('plf', getM('plf', 'POOL LOSERS FINAL'), { ...cardOpts, qualTag: '★ TOP 8 [L]' })}
            </div>
          </div>
        </section>
      </div>`;

    const pairs = [
      ['pqf1', 'psf1'], ['pqf2', 'psf1'], ['pqf3', 'psf2'], ['pqf4', 'psf2'],
      ['psf1', 'pwf'], ['psf2', 'pwf'],
      ['plqf1', 'plsf'], ['plqf2', 'plsf'], ['plsf', 'plf']
    ];
    drawConnectors(hostEl, pairs, opts.connectorStyle || 'orthogonal');
    requestAnimationFrame(() => drawConnectors(hostEl, pairs, opts.connectorStyle || 'orthogonal'));
  }

  /* =========================================================================
     MODE 4: TOP 16 / PHASE STANDINGS LEADERBOARD
     ========================================================================= */
  function renderTop16Table(hostEl, state, opts) {
    const bk = state.brackets || {};
    const FLAGS_MAP = opts.FLAGS_MAP || global.FGC_FLAGS || {};
    const showFlags = bk.showFlags !== false;
    const showIso = bk.showIso !== false;
    const showSeeds = bk.showSeeds !== false;
    const showSponsor = bk.showSponsors !== false && bk.showSponsor !== false;
    const rows = Array.isArray(bk.top16Rows) && bk.top16Rows.length ? bk.top16Rows.slice(0, 16) : [];
    const left = rows.slice(0, 8);
    const right = rows.slice(8, 16);

    const renderCol = (list, offset, title) => `
      <div class="bks-standings-col">
        <div class="bks-col-head" style="text-align:left;padding:6px 12px;">${title}</div>
        ${list.map((p, idx) => {
          const rank = p.place || (offset + idx + 1);
          const st = String(p.status || (rank <= 4 ? 'winners' : rank <= 8 ? 'losers' : 'out')).toLowerCase();
          const stTxt = st === 'winners' ? 'WINNERS' : st === 'losers' ? 'LOSERS' : (st === 'alive' || st === 'in') ? 'ACTIVE' : 'OUT';
          const sd = showSeeds ? cleanSeed(p.seed) : null;
          const wlTxt = (p.record && String(p.record).trim()) ? String(p.record).trim() : `${Number(p.wins ?? 0)}-${Number(p.losses ?? 0)}`;
          return `
            <div class="bks-t16-row bks-anim-item is-${esc(st)}" style="--col-i:${idx}">
              <span class="bks-t16-rank">${rank}</span>
              ${renderIsoFlag(p, FLAGS_MAP, showFlags, showIso)}
              ${sd ? `<span class="bks-seed">#${sd}</span>` : ''}
              <div class="bks-t16-info">
                <div class="bks-t16-name">
                  ${showSponsor && p.sponsor ? `<span class="bks-sp">${esc(p.sponsor)}</span>` : ''}
                  ${esc(p.name || `PLAYER ${offset + idx + 1}`)}
                </div>
                ${p.character ? `<div class="bks-t16-char">${esc(p.character)}</div>` : ''}
              </div>
              <span class="bks-pr-wl">${esc(wlTxt)}</span>
              <span class="bks-pr-pill is-${esc(st)}">${stTxt}</span>
            </div>`;
        }).join('')}
      </div>`;

    hostEl.innerHTML = `
      <div class="bks-t16-grid">
        ${renderCol(left, 0, 'TOP 8 — WINNERS & CONTENDERS (1ST – 8TH)')}
        ${renderCol(right, 8, 'TOP 16 — ELIMINATION CUT (9TH – 16TH)')}
      </div>`;
  }

  function renderBracketsStage(hostEl, state, opts = {}) {
    if (!hostEl) return;
    const mode = opts.forcedMode || state?.brackets?.mode || 'top8-de';
    if (mode === 'pools-groups') return renderPoolsGroups(hostEl, state, opts);
    if (mode === 'pool-tree') return renderPoolTree(hostEl, state, opts);
    if (mode === 'top16-table') return renderTop16Table(hostEl, state, opts);
    return renderTop8Bracket(hostEl, state, opts);
  }

  global.FGC_BRACKETS_ENGINE = {
    POOL_TREE_SLOTS,
    renderBracketsStage,
    drawConnectors
  };
})(typeof window !== 'undefined' ? window : globalThis);
