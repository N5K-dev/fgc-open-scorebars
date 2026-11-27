/**
 * FGC Open Scorebars — Top 8 / Results Vector Card Geometry, Border & Safe-Inset Engine
 * Zero-dependency precision SVG frame renderer for results.html + shared catalog for panel.html.
 *
 * Solves CSS clip-path + border chopping 100%:
 *   - Draws exact continuous anti-aliased SVG contours inset strictly inside each card's silhouette
 *   - Supports 12 broadcast card shapes (Global AND Per-Card individual overrides!)
 *   - Supports 8 border styles (Solid, Double, HUD Corners, Dashed, Metallic Gradient, Neon, Rails, None)
 *   - Supports 6 border FX (Clean, Soft Glow, Neon Pulse, Shimmer Sweep, Marching Energy Trace, Champion Trace)
 *   - Automatically computes mathematical safe content insets so Rank Badge, Crown, Name, Char & @Handle
 *     are NEVER clipped by diagonal cuts, octagons, slants, notches, or shield crests!
 */
(function (global) {
  'use strict';

  const CARD_SHAPES = [
    { id: 'angled',     label: 'Angled 2-Corner Cut',      short: 'Angled Cut' },
    { id: 'chamfer',    label: 'Octagon 4-Corner Bevel',   short: 'Octagon Bevel' },
    { id: 'hex-crown',  label: 'Royal Deep Octagon / Hex', short: 'Royal Hex' },
    { id: 'slant',      label: 'Broadcast Slant Blade',    short: 'Slant Blade' },
    { id: 'tech-notch', label: 'Cyber Tech Notch',         short: 'Tech Notch' },
    { id: 'ticket',     label: 'Championship Cutout',      short: 'Ticket Cut' },
    { id: 'crest',      label: 'Royal Shield Crest',       short: 'Shield Crest' },
    { id: 'sharp',      label: 'Sharp Editorial Box',      short: 'Sharp Box' },
    { id: 'rounded',    label: 'Smooth Rounded Card',      short: 'Rounded' },
    { id: 'glass',      label: 'Liquid Frosted Glass',     short: 'Frosted Glass' },
    { id: 'comic',      label: 'Manga / Comic Hard Ink',   short: 'Comic Ink' },
    { id: 'minimal',    label: 'Clean Minimalist Frame',   short: 'Minimal' }
  ];

  const BORDER_STYLES = [
    { id: 'solid',    label: 'Solid Crisp Contour' },
    { id: 'double',   label: 'Double Frame (Outer + Inner)' },
    { id: 'corners',  label: 'HUD Corner Brackets + Hairline' },
    { id: 'dashed',   label: 'Tactical Dashed Line' },
    { id: 'gradient', label: 'Metallic Sheen Gradient' },
    { id: 'neon',     label: 'Neon Core + Glow Rim' },
    { id: 'rails',    label: 'Top & Bottom Heavy Rails' },
    { id: 'none',     label: 'Borderless (No Stroke)' }
  ];

  const BORDER_FX = [
    { id: 'none',           label: 'Clean Crisp (Static)' },
    { id: 'soft-glow',      label: 'Soft Edge Halo' },
    { id: 'neon-pulse',     label: 'Neon Breathing Pulse' },
    { id: 'shimmer',        label: 'Metallic Light Shimmer' },
    { id: 'marching-trace', label: 'Animated Energy Trace (All)' },
    { id: 'champ-trace',    label: 'Animated Energy Trace (1st Only)' }
  ];

  const VALID_SHAPES = new Set(CARD_SHAPES.map(s => s.id));
  const VALID_BORDERS = new Set(BORDER_STYLES.map(s => s.id));
  const VALID_FX = new Set(BORDER_FX.map(s => s.id));

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function fmt(n) {
    return (Math.round(n * 10) / 10).toString();
  }

  /** Resolve effective shape for a specific card (Per-Card Override > Global Override > Layout/Design Default) */
  function resolveCardShape(pl, idx, res, design, effLayout) {
    const perCard = String(pl?.cardShape || '').trim();
    if (perCard && perCard !== 'global' && VALID_SHAPES.has(perCard)) return perCard;

    const globalOv = String(res?.cardStyle || 'theme').trim();
    if (globalOv && globalOv !== 'theme' && VALID_SHAPES.has(globalOv)) return globalOv;

    // Layout-specific iconic factory defaults (only when user hasn't manually overridden)
    if (effLayout === 'crown-graffiti' && idx === 0) return 'hex-crown';
    if (effLayout === 'skew-neon') return 'slant';
    const dCard = String(design?.cardStyle || 'angled').trim();
    return VALID_SHAPES.has(dCard) ? dCard : 'angled';
  }

  /**
   * Compute geometry points / SVG paths + CSS clip-path + mathematical safe content insets
   * for exact rendered pixel dimensions (w x h).
   */
  function computeShapeGeometry(shape, w, h, cutPx, padInset, isRowCard) {
    const minDim = Math.min(w, h);
    const maxCut = isRowCard ? Math.max(8, Math.floor(h * 0.28)) : Math.max(10, Math.floor(minDim * 0.16));
    const defaultCut = shape === 'hex-crown'
      ? Math.round(clamp(minDim * 0.088, 16, 36))
      : shape === 'crest'
        ? Math.round(clamp(minDim * 0.085, 16, 34))
        : shape === 'angled'
          ? Math.round(clamp(minDim * 0.068, 14, 26))
          : shape === 'slant'
            ? Math.round(clamp(h * 0.055, 12, 24))
            : shape === 'tech-notch'
              ? Math.round(clamp(minDim * 0.068, 14, 26))
              : shape === 'ticket'
                ? Math.round(clamp(minDim * 0.055, 11, 20))
                : Math.round(clamp(minDim * 0.06, 12, 22));

    const c = clamp(cutPx > 0 ? cutPx : defaultCut, 6, maxCut);
    const p = Math.max(0.5, padInset);
    const W = Math.max(20, w);
    const H = Math.max(20, h);

    // Helper: polygon points array -> SVG path + CSS clip-path
    const polyPath = (pts) => pts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${fmt(pt[0])} ${fmt(pt[1])}`).join(' ') + ' Z';
    const cssPoly = (pts) => `polygon(${pts.map(pt => `${fmt(pt[0])}px ${fmt(pt[1])}px`).join(', ')})`;

    // Rounded rect path helper
    const rrectPath = (x, y, rw, rh, rad) => {
      const r = clamp(rad, 0, Math.min(rw, rh) / 2);
      if (r <= 0.5) return `M ${fmt(x)} ${fmt(y)} L ${fmt(x + rw)} ${fmt(y)} L ${fmt(x + rw)} ${fmt(y + rh)} L ${fmt(x)} ${fmt(y + rh)} Z`;
      return [
        `M ${fmt(x + r)} ${fmt(y)}`,
        `L ${fmt(x + rw - r)} ${fmt(y)}`,
        `Q ${fmt(x + rw)} ${fmt(y)} ${fmt(x + rw)} ${fmt(y + r)}`,
        `L ${fmt(x + rw)} ${fmt(y + rh - r)}`,
        `Q ${fmt(x + rw)} ${fmt(y + rh)} ${fmt(x + rw - r)} ${fmt(y + rh)}`,
        `L ${fmt(x + r)} ${fmt(y + rh)}`,
        `Q ${fmt(x)} ${fmt(y + rh)} ${fmt(x)} ${fmt(y + rh - r)}`,
        `L ${fmt(x)} ${fmt(y + r)}`,
        `Q ${fmt(x)} ${fmt(y)} ${fmt(x + r)} ${fmt(y)} Z`
      ].join(' ');
    };

    let clipCss = 'none';
    let borderRadius = '0px';
    let outerD = '';
    let innerD = '';
    let cornersD = '';
    let railsD = '';

    // Safe inner spacing adjustments (added to base margins so inner badges & text NEVER touch diagonal cuts!)
    let safe = { badgeTop: 12, badgeLeft: 12, crownTop: 10, crownRight: 16, infoLeft: 16, infoRight: 16, infoBottom: 14, rowPadLeftAdd: 0 };

    const makeBoxInset = (q) => ({ x0: q, y0: q, x1: W - q, y1: H - q });

    if (shape === 'angled') {
      // Top-right & bottom-left 45-deg bevels
      const mkPts = (q, cv) => {
        const b = makeBoxInset(q);
        const k = Math.max(4, cv - q * 0.42);
        return [[b.x0, b.y0], [b.x1 - k, b.y0], [b.x1, b.y0 + k], [b.x1, b.y1], [b.x0 + k, b.y1], [b.x0, b.y1 - k]];
      };
      clipCss = cssPoly(mkPts(0, c));
      outerD = polyPath(mkPts(p, c));
      innerD = polyPath(mkPts(p + 5.5, Math.max(4, c - 2)));
      const arm = Math.min(28, Math.max(14, c + 6));
      cornersD = [
        `M ${fmt(p)} ${fmt(p + arm)} L ${fmt(p)} ${fmt(p)} L ${fmt(p + arm)} ${fmt(p)}`,
        `M ${fmt(W - p - c - arm * 0.6)} ${fmt(p)} L ${fmt(W - p - c)} ${fmt(p)} L ${fmt(W - p)} ${fmt(p + c)} L ${fmt(W - p)} ${fmt(p + c + arm * 0.6)}`,
        `M ${fmt(W - p)} ${fmt(H - p - arm)} L ${fmt(W - p)} ${fmt(H - p)} L ${fmt(W - p - arm)} ${fmt(H - p)}`,
        `M ${fmt(p + c + arm * 0.6)} ${fmt(H - p)} L ${fmt(p + c)} ${fmt(H - p)} L ${fmt(p)} ${fmt(H - p - c)} L ${fmt(p)} ${fmt(H - p - c - arm * 0.6)}`
      ].join(' ');
      railsD = `M ${fmt(p)} ${fmt(p)} L ${fmt(W - p - c)} ${fmt(p)} M ${fmt(p + c)} ${fmt(H - p)} L ${fmt(W - p)} ${fmt(H - p)}`;
      safe = {
        badgeTop: 12,
        badgeLeft: 14,
        crownTop: Math.round(10 + c * 0.22),
        crownRight: Math.round(14 + c * 0.8),
        infoLeft: Math.round(12 + Math.max(8, c * (W < 340 ? 0.54 : 0.72))),
        infoRight: 14,
        infoBottom: Math.round(12 + c * 0.22),
        rowPadLeftAdd: Math.round(c * 0.6)
      };
    } else if (shape === 'chamfer' || shape === 'hex-crown') {
      // 4-corner octagon bevel (chamfer = crisp medium, hex-crown = bold royal octagon)
      const cy = shape === 'hex-crown' ? Math.round(clamp(c * 1.18, 14, Math.floor(H * 0.16))) : c;
      const cx = shape === 'hex-crown' ? Math.round(clamp(c * 1.18, 14, Math.floor(W * 0.14))) : c;
      const mkPts = (q, dx, dy) => {
        const b = makeBoxInset(q);
        const kx = Math.max(4, dx - q * 0.42);
        const ky = Math.max(4, dy - q * 0.42);
        return [
          [b.x0 + kx, b.y0], [b.x1 - kx, b.y0],
          [b.x1, b.y0 + ky], [b.x1, b.y1 - ky],
          [b.x1 - kx, b.y1], [b.x0 + kx, b.y1],
          [b.x0, b.y1 - ky], [b.x0, b.y0 + ky]
        ];
      };
      clipCss = cssPoly(mkPts(0, cx, cy));
      outerD = polyPath(mkPts(p, cx, cy));
      innerD = polyPath(mkPts(p + 6, Math.max(4, cx - 2.5), Math.max(4, cy - 2.5)));
      const arm = Math.min(24, Math.max(12, Math.round(cx * 0.65)));
      cornersD = [
        `M ${fmt(p)} ${fmt(p + cy + arm)} L ${fmt(p)} ${fmt(p + cy)} L ${fmt(p + cx)} ${fmt(p)} L ${fmt(p + cx + arm)} ${fmt(p)}`,
        `M ${fmt(W - p - cx - arm)} ${fmt(p)} L ${fmt(W - p - cx)} ${fmt(p)} L ${fmt(W - p)} ${fmt(p + cy)} L ${fmt(W - p)} ${fmt(p + cy + arm)}`,
        `M ${fmt(W - p)} ${fmt(H - p - cy - arm)} L ${fmt(W - p)} ${fmt(H - p - cy)} L ${fmt(W - p - cx)} ${fmt(H - p)} L ${fmt(W - p - cx - arm)} ${fmt(H - p)}`,
        `M ${fmt(p + cx + arm)} ${fmt(H - p)} L ${fmt(p + cx)} ${fmt(H - p)} L ${fmt(p)} ${fmt(H - p - cy)} L ${fmt(p)} ${fmt(H - p - cy - arm)}`
      ].join(' ');
      railsD = `M ${fmt(p + cx)} ${fmt(p)} L ${fmt(W - p - cx)} ${fmt(p)} M ${fmt(p + cx)} ${fmt(H - p)} L ${fmt(W - p - cx)} ${fmt(H - p)}`;
      safe = {
        badgeTop: Math.round(10 + cy * 0.36),
        badgeLeft: Math.round(10 + cx * 0.78),
        crownTop: Math.round(8 + cy * 0.32),
        crownRight: Math.round(12 + cx * 0.8),
        infoLeft: Math.round(12 + Math.max(8, cx * (W < 340 ? 0.52 : 0.68))),
        infoRight: Math.round(12 + Math.max(8, cx * (W < 340 ? 0.52 : 0.68))),
        infoBottom: Math.round(12 + cy * 0.24),
        rowPadLeftAdd: Math.round(cx * 0.72)
      };
    } else if (shape === 'slant') {
      // Dynamic broadcast parallelogram slant
      const sk = clamp(cutPx > 0 ? cutPx : Math.round(clamp(h * 0.055, 12, 24)), 8, Math.floor(W * 0.14));
      const mkPts = (q, s) => {
        const b = makeBoxInset(q);
        return [[b.x0 + s, b.y0], [b.x1, b.y0], [b.x1 - s, b.y1], [b.x0, b.y1]];
      };
      clipCss = cssPoly(mkPts(0, sk));
      outerD = polyPath(mkPts(p, sk));
      innerD = polyPath(mkPts(p + 5.5, sk));
      const arm = 24;
      cornersD = [
        `M ${fmt(p + sk + arm)} ${fmt(p)} L ${fmt(p + sk)} ${fmt(p)} L ${fmt(p + sk - Math.min(sk, arm * 0.4))} ${fmt(p + arm)}`,
        `M ${fmt(W - p - arm)} ${fmt(p)} L ${fmt(W - p)} ${fmt(p)} L ${fmt(W - p - Math.min(sk, arm * 0.4))} ${fmt(p + arm)}`,
        `M ${fmt(W - p - sk - arm)} ${fmt(H - p)} L ${fmt(W - p - sk)} ${fmt(H - p)} L ${fmt(W - p - sk + Math.min(sk, arm * 0.4))} ${fmt(H - p - arm)}`,
        `M ${fmt(p + arm)} ${fmt(H - p)} L ${fmt(p)} ${fmt(H - p)} L ${fmt(p + Math.min(sk, arm * 0.4))} ${fmt(H - p - arm)}`
      ].join(' ');
      railsD = `M ${fmt(p + sk)} ${fmt(p)} L ${fmt(W - p)} ${fmt(p)} M ${fmt(p)} ${fmt(H - p)} L ${fmt(W - p - sk)} ${fmt(H - p)}`;
      safe = {
        badgeTop: 12,
        badgeLeft: Math.round(12 + sk * 0.95),
        crownTop: 10,
        crownRight: Math.round(14 + sk * 0.35),
        infoLeft: Math.round(14 + sk * 0.38),
        infoRight: Math.round(14 + sk * 0.98),
        infoBottom: 14,
        rowPadLeftAdd: Math.round(sk * 0.85)
      };
    } else if (shape === 'tech-notch') {
      // Cyber stepped esports notch at top-right & bottom-left + crisp mini bevel on other two corners
      const s = Math.max(8, Math.round(c * 0.48));
      const len = Math.round(clamp(c * 2.2, 26, Math.floor(W * 0.26)));
      const mkPts = (q) => {
        const b = makeBoxInset(q);
        const sq = Math.max(4, s - q * 0.42);
        return [
          [b.x0 + sq, b.y0],
          [b.x1 - len, b.y0],
          [b.x1 - len + sq, b.y0 + sq],
          [b.x1 - sq, b.y0 + sq],
          [b.x1, b.y0 + sq * 2],
          [b.x1, b.y1 - sq],
          [b.x1 - sq, b.y1],
          [b.x0 + len, b.y1],
          [b.x0 + len - sq, b.y1 - sq],
          [b.x0 + sq, b.y1 - sq],
          [b.x0, b.y1 - sq * 2],
          [b.x0, b.y0 + sq]
        ];
      };
      clipCss = cssPoly(mkPts(0));
      outerD = polyPath(mkPts(p));
      innerD = polyPath(mkPts(p + 5.5));
      cornersD = [
        `M ${fmt(p)} ${fmt(p + s + 18)} L ${fmt(p)} ${fmt(p + s)} L ${fmt(p + s)} ${fmt(p)} L ${fmt(p + s + 22)} ${fmt(p)}`,
        `M ${fmt(W - p - len - 14)} ${fmt(p)} L ${fmt(W - p - len)} ${fmt(p)} L ${fmt(W - p - len + s)} ${fmt(p + s)} L ${fmt(W - p - s)} ${fmt(p + s)} L ${fmt(W - p)} ${fmt(p + s * 2)}`,
        `M ${fmt(W - p)} ${fmt(H - p - s - 18)} L ${fmt(W - p)} ${fmt(H - p - s)} L ${fmt(W - p - s)} ${fmt(H - p)} L ${fmt(W - p - s - 22)} ${fmt(H - p)}`,
        `M ${fmt(p + len + 14)} ${fmt(H - p)} L ${fmt(p + len)} ${fmt(H - p)} L ${fmt(p + len - s)} ${fmt(H - p - s)} L ${fmt(p + s)} ${fmt(H - p - s)} L ${fmt(p)} ${fmt(H - p - s * 2)}`
      ].join(' ');
      railsD = `M ${fmt(p + s)} ${fmt(p)} L ${fmt(W - p - len)} ${fmt(p)} M ${fmt(p + len)} ${fmt(H - p)} L ${fmt(W - p - s)} ${fmt(H - p)}`;
      safe = {
        badgeTop: Math.round(12 + s * 0.4),
        badgeLeft: Math.round(14 + s * 0.6),
        crownTop: Math.round(12 + s * 1.15),
        crownRight: Math.round(16 + s * 0.6),
        infoLeft: Math.round(16 + s * 0.6),
        infoRight: Math.round(16 + s * 0.6),
        infoBottom: Math.round(14 + s * 1.1),
        rowPadLeftAdd: Math.round(s * 0.8)
      };
    } else if (shape === 'ticket') {
      // Championship plaque with angled corners + symmetric side notch indent
      const k = Math.max(8, Math.round(c * 0.72));
      const nw = Math.max(6, Math.round(c * 0.42));
      const nh = Math.max(12, Math.round(clamp(H * 0.08, 10, 22)));
      const my = Math.round(H * 0.5);
      const mkPts = (q) => {
        const b = makeBoxInset(q);
        const kq = Math.max(4, k - q * 0.42);
        return [
          [b.x0 + kq, b.y0], [b.x1 - kq, b.y0], [b.x1, b.y0 + kq],
          [b.x1, my - nh], [b.x1 - nw, my - nh * 0.55], [b.x1 - nw, my + nh * 0.55], [b.x1, my + nh],
          [b.x1, b.y1 - kq], [b.x1 - kq, b.y1], [b.x0 + kq, b.y1], [b.x0, b.y1 - kq],
          [b.x0, my + nh], [b.x0 + nw, my + nh * 0.55], [b.x0 + nw, my - nh * 0.55], [b.x0, my - nh],
          [b.x0, b.y0 + kq]
        ];
      };
      clipCss = cssPoly(mkPts(0));
      outerD = polyPath(mkPts(p));
      innerD = polyPath(mkPts(p + 5.5));
      cornersD = [
        `M ${fmt(p)} ${fmt(p + k + 14)} L ${fmt(p)} ${fmt(p + k)} L ${fmt(p + k)} ${fmt(p)} L ${fmt(p + k + 14)} ${fmt(p)}`,
        `M ${fmt(W - p - k - 14)} ${fmt(p)} L ${fmt(W - p - k)} ${fmt(p)} L ${fmt(W - p)} ${fmt(p + k)} L ${fmt(W - p)} ${fmt(p + k + 14)}`,
        `M ${fmt(W - p)} ${fmt(H - p - k - 14)} L ${fmt(W - p)} ${fmt(H - p - k)} L ${fmt(W - p - k)} ${fmt(H - p)} L ${fmt(W - p - k - 14)} ${fmt(H - p)}`,
        `M ${fmt(p + k + 14)} ${fmt(H - p)} L ${fmt(p + k)} ${fmt(H - p)} L ${fmt(p)} ${fmt(H - p - k)} L ${fmt(p)} ${fmt(H - p - k - 14)}`
      ].join(' ');
      railsD = `M ${fmt(p + k)} ${fmt(p)} L ${fmt(W - p - k)} ${fmt(p)} M ${fmt(p + k)} ${fmt(H - p)} L ${fmt(W - p - k)} ${fmt(H - p)}`;
      safe = {
        badgeTop: Math.round(10 + k * 0.4),
        badgeLeft: Math.round(12 + k * 0.8),
        crownTop: Math.round(10 + k * 0.35),
        crownRight: Math.round(12 + k * 0.8),
        infoLeft: Math.round(14 + Math.max(k * 0.8, nw + 4)),
        infoRight: Math.round(14 + Math.max(k * 0.8, nw + 4)),
        infoBottom: Math.round(12 + k * 0.25),
        rowPadLeftAdd: Math.round(k * 0.7)
      };
    } else if (shape === 'crest') {
      // Royal shield crest: bold chamfered top crown shoulders + tapered bottom crest
      const tx = Math.round(clamp(c * 1.25, 16, Math.floor(W * 0.16)));
      const ty = Math.round(clamp(c * 0.95, 14, Math.floor(H * 0.14)));
      const bx = Math.round(clamp(c * 1.1, 14, Math.floor(W * 0.14)));
      const by = Math.round(clamp(c * 0.72, 10, Math.floor(H * 0.1)));
      const mkPts = (q) => {
        const b = makeBoxInset(q);
        const txq = Math.max(4, tx - q * 0.42);
        const tyq = Math.max(4, ty - q * 0.42);
        const bxq = Math.max(4, bx - q * 0.42);
        const byq = Math.max(4, by - q * 0.42);
        return [
          [b.x0 + txq, b.y0],
          [b.x1 - txq, b.y0],
          [b.x1, b.y0 + tyq],
          [b.x1, b.y1 - byq],
          [b.x1 - bxq, b.y1],
          [W * 0.5, b.y1],
          [b.x0 + bxq, b.y1],
          [b.x0, b.y1 - byq],
          [b.x0, b.y0 + tyq]
        ];
      };
      clipCss = cssPoly(mkPts(0));
      outerD = polyPath(mkPts(p));
      innerD = polyPath(mkPts(p + 6));
      cornersD = [
        `M ${fmt(p)} ${fmt(p + ty + 20)} L ${fmt(p)} ${fmt(p + ty)} L ${fmt(p + tx)} ${fmt(p)} L ${fmt(p + tx + 20)} ${fmt(p)}`,
        `M ${fmt(W - p - tx - 20)} ${fmt(p)} L ${fmt(W - p - tx)} ${fmt(p)} L ${fmt(W - p)} ${fmt(p + ty)} L ${fmt(W - p)} ${fmt(p + ty + 20)}`,
        `M ${fmt(W - p)} ${fmt(H - p - by - 16)} L ${fmt(W - p)} ${fmt(H - p - by)} L ${fmt(W - p - bx)} ${fmt(H - p)} L ${fmt(W - p - bx - 18)} ${fmt(H - p)}`,
        `M ${fmt(p + bx + 18)} ${fmt(H - p)} L ${fmt(p + bx)} ${fmt(H - p)} L ${fmt(p)} ${fmt(H - p - by)} L ${fmt(p)} ${fmt(H - p - by - 16)}`
      ].join(' ');
      railsD = `M ${fmt(p + tx)} ${fmt(p)} L ${fmt(W - p - tx)} ${fmt(p)} M ${fmt(p + bx)} ${fmt(H - p)} L ${fmt(W - p - bx)} ${fmt(H - p)}`;
      safe = {
        badgeTop: Math.round(10 + ty * 0.42),
        badgeLeft: Math.round(12 + tx * 0.82),
        crownTop: Math.round(8 + ty * 0.36),
        crownRight: Math.round(12 + tx * 0.85),
        infoLeft: Math.round(14 + bx * 0.82),
        infoRight: Math.round(14 + bx * 0.82),
        infoBottom: Math.round(12 + by * 0.25),
        rowPadLeftAdd: Math.round(tx * 0.72)
      };
    } else {
      // Rectangular / Rounded family: sharp (4px), rounded (16px), glass (18px), comic (6px), minimal (6px)
      const rad = shape === 'glass' ? 18 : shape === 'rounded' ? 16 : shape === 'sharp' ? 4 : 6;
      borderRadius = `${rad}px`;
      clipCss = 'none';
      outerD = rrectPath(p, p, W - p * 2, H - p * 2, Math.max(0, rad - p * 0.5));
      innerD = rrectPath(p + 5.5, p + 5.5, W - (p + 5.5) * 2, H - (p + 5.5) * 2, Math.max(0, rad - 5));
      const arm = Math.min(26, Math.max(14, rad + 10));
      const r0 = Math.max(2, rad - p * 0.4);
      cornersD = [
        `M ${fmt(p)} ${fmt(p + arm)} L ${fmt(p)} ${fmt(p + r0)} Q ${fmt(p)} ${fmt(p)} ${fmt(p + r0)} ${fmt(p)} L ${fmt(p + arm)} ${fmt(p)}`,
        `M ${fmt(W - p - arm)} ${fmt(p)} L ${fmt(W - p - r0)} ${fmt(p)} Q ${fmt(W - p)} ${fmt(p)} ${fmt(W - p)} ${fmt(p + r0)} L ${fmt(W - p)} ${fmt(p + arm)}`,
        `M ${fmt(W - p)} ${fmt(H - p - arm)} L ${fmt(W - p)} ${fmt(H - p - r0)} Q ${fmt(W - p)} ${fmt(H - p)} ${fmt(W - p - r0)} ${fmt(H - p)} L ${fmt(W - p - arm)} ${fmt(H - p)}`,
        `M ${fmt(p + arm)} ${fmt(H - p)} L ${fmt(p + r0)} ${fmt(H - p)} Q ${fmt(p)} ${fmt(H - p)} ${fmt(p)} ${fmt(H - p - r0)} L ${fmt(p)} ${fmt(H - p - arm)}`
      ].join(' ');
      railsD = `M ${fmt(p + r0)} ${fmt(p)} L ${fmt(W - p - r0)} ${fmt(p)} M ${fmt(p + r0)} ${fmt(H - p)} L ${fmt(W - p - r0)} ${fmt(H - p)}`;
      safe = {
        badgeTop: 12,
        badgeLeft: 12,
        crownTop: 10,
        crownRight: 16,
        infoLeft: 16,
        infoRight: 16,
        infoBottom: 14,
        rowPadLeftAdd: 0
      };
    }

    return { clipCss, borderRadius, outerD, innerD, cornersD, railsD, safe, cut: c };
  }

  function resolveStrokeColor(card, rank, res, design, shape) {
    if (shape === 'comic' && !(res?.cardBorderColor && res.cardBorderColor.trim())) {
      return '#090b10';
    }
    const customCol = String(res?.cardBorderColor || '').trim();
    if (customCol) return customCol;
    const isSpot = card.dataset.spotlight === '1';
    if (isSpot || rank === 1) return (res?.goldColor && res.goldColor.trim()) ? res.goldColor : (design?.gold || '#facc15');
    if (rank === 2) return design?.silver || '#e2e8f0';
    if (rank === 3) return design?.bronze || '#f97316';
    return design?.cardBorder || 'rgba(255,255,255,0.28)';
  }

  function buildFrameSvgHtml(uid, W, H, geom, opts) {
    const {
      borderStyle,
      borderWidth,
      strokeColor,
      accentColor,
      borderFx,
      rank,
      isSpotlight,
      shape
    } = opts;

    if (borderStyle === 'none' || borderWidth <= 0) return '';

    const isChamp = isSpotlight || rank === 1;
    const sw = borderWidth;
    const gradId = `rcg-${uid}`;
    const glowId = `rcf-${uid}`;

    const useGlow = borderFx === 'soft-glow' || borderFx === 'neon-pulse' || borderStyle === 'neon';
    const useTrace = borderFx === 'marching-trace' || (borderFx === 'champ-trace' && isChamp);
    const useShimmer = borderFx === 'shimmer';

    const defs = [];
    if (borderStyle === 'gradient' || useShimmer) {
      defs.push(`
        <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
          <stop offset="28%" stop-color="${strokeColor}"/>
          <stop offset="68%" stop-color="${isChamp ? strokeColor : accentColor}"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.9"/>
        </linearGradient>`);
    }
    if (useGlow) {
      defs.push(`
        <filter id="${glowId}" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="${borderStyle === 'neon' ? '3.4' : '2.4'}" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>`);
    }

    const baseStroke = (borderStyle === 'gradient' || useShimmer) ? `url(#${gradId})` : strokeColor;
    const filterAttr = useGlow ? ` filter="url(#${glowId})"` : '';
    const pulseCls = borderFx === 'neon-pulse' ? ' rc-fx-pulse' : '';
    const layers = [];

    if (borderStyle === 'double') {
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="${baseStroke}" stroke-width="${fmt(sw)}" stroke-linejoin="miter" vector-effect="non-scaling-stroke"${filterAttr} class="${pulseCls}"/>`);
      layers.push(`<path d="${geom.innerD}" fill="none" stroke="${strokeColor}" stroke-opacity="0.62" stroke-width="${fmt(Math.max(1, sw * 0.48))}" stroke-linejoin="miter"/>`);
    } else if (borderStyle === 'corners') {
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="${strokeColor}" stroke-opacity="0.34" stroke-width="${fmt(Math.max(1, sw * 0.55))}" stroke-linejoin="miter"/>`);
      layers.push(`<path d="${geom.cornersD}" fill="none" stroke="${baseStroke}" stroke-width="${fmt(sw + 1.5)}" stroke-linecap="square" stroke-linejoin="miter"${filterAttr} class="${pulseCls}"/>`);
    } else if (borderStyle === 'dashed') {
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="${baseStroke}" stroke-width="${fmt(sw)}" stroke-dasharray="14 8" stroke-linecap="square" stroke-linejoin="miter"${filterAttr} class="${pulseCls}"/>`);
    } else if (borderStyle === 'neon') {
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="${strokeColor}" stroke-opacity="0.72" stroke-width="${fmt(sw + 3.2)}" stroke-linejoin="round" filter="url(#${glowId})" class="${pulseCls}"/>`);
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="#ffffff" stroke-opacity="0.92" stroke-width="${fmt(Math.max(1.2, sw * 0.55))}" stroke-linejoin="round"/>`);
    } else if (borderStyle === 'rails') {
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="${strokeColor}" stroke-opacity="0.28" stroke-width="${fmt(Math.max(1, sw * 0.5))}" stroke-linejoin="miter"/>`);
      layers.push(`<path d="${geom.railsD}" fill="none" stroke="${baseStroke}" stroke-width="${fmt(sw + 2.2)}" stroke-linecap="square"${filterAttr} class="${pulseCls}"/>`);
    } else {
      // 'solid' or 'gradient'
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="${baseStroke}" stroke-width="${fmt(sw)}" stroke-linejoin="${shape === 'comic' ? 'miter' : 'round'}"${filterAttr} class="${pulseCls}"/>`);
      // Extra crisp inner specular hairline on glass/minimal or champion cards
      if (shape === 'glass') {
        layers.push(`<path d="${geom.innerD}" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1"/>`);
      }
    }

    // Animated marching energy beam tracing exact polygon perimeter!
    if (useTrace) {
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="#ffffff" stroke-opacity="0.95" stroke-width="${fmt(Math.max(2, sw + 0.8))}" stroke-linecap="round" pathLength="100" stroke-dasharray="16 84" class="rc-fx-trace"/>`);
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="${strokeColor}" stroke-opacity="0.85" stroke-width="${fmt(sw + 2.5)}" stroke-linecap="round" pathLength="100" stroke-dasharray="22 78" class="rc-fx-trace rc-fx-trace-glow"/>`);
    }
    if (useShimmer) {
      layers.push(`<path d="${geom.outerD}" fill="none" stroke="#ffffff" stroke-opacity="0.75" stroke-width="${fmt(Math.max(1.6, sw * 0.7))}" pathLength="100" stroke-dasharray="10 40" class="rc-fx-shimmer"/>`);
    }

    return `<svg class="rc-frame-svg" viewBox="0 0 ${fmt(W)} ${fmt(H)}" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">${defs.length ? `<defs>${defs.join('')}</defs>` : ''}${layers.join('')}</svg>`;
  }

  /** Apply exact vector shape, continuous SVG frame, and safe inner spacing to all cards on stage */
  function decorateCards(stageEl, res, design, effLayout) {
    if (!stageEl) return;
    const placements = Array.isArray(res?.placements) ? res.placements : [];
    const globalBorderStyle = VALID_BORDERS.has(res?.cardBorderStyle) ? res.cardBorderStyle : 'solid';
    const globalBorderFx = VALID_FX.has(res?.cardBorderFx) ? res.cardBorderFx : 'none';
    const customW = Number(res?.cardBorderWidth ?? 0);
    const customCut = Number(res?.cardCutSize ?? 0);
    const accentColor = (res?.accentColor && res.accentColor.trim()) ? res.accentColor : (design?.accent || '#facc15');
    const isRowLayout = effLayout === 'tower-ladder' || effLayout === 'poster-rows';

    const cards = stageEl.querySelectorAll('#res-body .res-card, #res-body .res-champ-spotlight');
    cards.forEach((card, n) => {
      const idx = Number(card.dataset.idx ?? n);
      const isSpotlight = card.dataset.spotlight === '1';
      const rank = Number(card.dataset.rank || (idx + 1));
      const pl = placements[idx] || {};

      const shape = resolveCardShape(pl, idx, res, design, effLayout);
      card.dataset.cardShape = shape;

      const W = card.offsetWidth;
      const H = card.offsetHeight;
      if (W < 24 || H < 24) return;

      const isRowCard = isRowLayout || (effLayout === 'editorial-rows' && idx > 0);
      const baseW = customW > 0
        ? clamp(customW, 1, 7)
        : (shape === 'comic' ? 4 : shape === 'minimal' ? 1.6 : (isSpotlight || rank === 1 ? 3.2 : 2.2));
      const isChampCard = idx === 0 || isSpotlight;
      const hasTrace = globalBorderFx === 'marching-trace' || (globalBorderFx === 'champ-trace' && isChampCard);
      const extraPad = globalBorderStyle === 'neon'
        ? 2.2
        : (globalBorderStyle === 'rails' || globalBorderStyle === 'corners')
          ? 1.4
          : (hasTrace ? 1.5 : 0);
      const padInset = (baseW / 2) + 0.8 + extraPad;
      const geom = computeShapeGeometry(shape, W, H, customCut, padInset, isRowCard);

      // Apply exact silhouette clipping (ZERO broken CSS borders!)
      card.style.clipPath = geom.clipCss;
      card.style.borderRadius = geom.borderRadius;

      // Apply mathematical shape-aware safe insets so badges, crowns & player text NEVER clip!
      const infoBoost = isChampCard && !isRowCard ? 6 : 0;
      card.style.setProperty('--rc-badge-t', `${geom.safe.badgeTop}px`);
      card.style.setProperty('--rc-badge-l', `${geom.safe.badgeLeft}px`);
      card.style.setProperty('--rc-crown-t', `${geom.safe.crownTop}px`);
      card.style.setProperty('--rc-crown-r', `${geom.safe.crownRight}px`);
      card.style.setProperty('--rc-info-l', `${geom.safe.infoLeft + infoBoost}px`);
      card.style.setProperty('--rc-info-r', `${geom.safe.infoRight + infoBoost}px`);
      card.style.setProperty('--rc-info-b', `${geom.safe.infoBottom + infoBoost}px`);
      card.style.setProperty('--rc-row-pad-l', `${geom.safe.rowPadLeftAdd}px`);

      const strokeColor = resolveStrokeColor(card, rank, res, design, shape);
      const svgHtml = buildFrameSvgHtml(`${isSpotlight ? 'sp' : idx}-${n}`, W, H, geom, {
        borderStyle: globalBorderStyle,
        borderWidth: baseW,
        strokeColor,
        accentColor,
        borderFx: globalBorderFx,
        rank,
        isSpotlight,
        shape
      });

      let frameHost = card.querySelector(':scope > .rc-frame-host');
      if (!frameHost) {
        frameHost = document.createElement('div');
        frameHost.className = 'rc-frame-host';
        frameHost.setAttribute('aria-hidden', 'true');
        card.appendChild(frameHost);
      }
      if (frameHost.dataset.sig !== `${W}x${H}:${shape}:${globalBorderStyle}:${baseW}:${strokeColor}:${accentColor}:${globalBorderFx}:${customCut}`) {
        frameHost.dataset.sig = `${W}x${H}:${shape}:${globalBorderStyle}:${baseW}:${strokeColor}:${accentColor}:${globalBorderFx}:${customCut}`;
        frameHost.innerHTML = svgHtml;
      }
    });
  }

  global.FGC_RES_CARDS = {
    CARD_SHAPES,
    BORDER_STYLES,
    BORDER_FX,
    resolveCardShape,
    computeShapeGeometry,
    decorateCards
  };
})(typeof window !== 'undefined' ? window : globalThis);
