/**
 * FGC Open Scorebars — 42 Distinct Broadcast VS Match Splash Designs
 * Shared single source of truth between vs.html (OBS 1920x1080) and panel.html (Control Panel).
 * Zero dependencies, 100% offline.
 */
(function (global) {
  'use strict';

  const VS_CATEGORIES = [
    { id: 'all',     label: 'All (48)' },
    { id: 'arcade',  label: '🕹 Arcade' },
    { id: 'tekken',  label: '🥊 Tekken & Majors' },
    { id: 'esports', label: '📺 Esports Pro' },
    { id: 'anime',   label: '⚡ Anime & Cyber' },
    { id: 'minimal', label: '✨ Minimal & Glass' }
  ];

  /**
   * Each design defines a completely distinct architectural combination:
   *  - split:   vertical | diag-left | diag-right | chevron | horizon | framed-cards | radial-clash | triple-stripe | minimal-clean
   *  - frame:   arcade-teeth | cyber-corners | cinematic-bars | double-gold | hazard-tape | manga-ink | neon-tube | minimal-line | none
   *  - divider: x-tape | chevron-stream | hazard-scroll | energy-beam | lightning-crack | scan-rail | ticker-vs | solid-glow | hairline | none
   *  - divAnim: scroll-down | scroll-up | pulse | shimmer | static
   *  - emblem:  winged | diamond-shield | circle-ring | hex-core | comic-burst | pill-tag | monolith | slash-bolt | minimal-text
   *  - embAnim: none | float | pulse | glitch | spin-ring
   *  - plate:   arcade-box | t8-blade | glass-pill | floating-clean | corner-ribbon | hex-plate | comic-skew | stacked-banner | luxury-thin
   *  - header:  trapezoid | floating-pill | full-ribbon | hex-crest | minimal-text | skew-tag
   *  - pat:     symbols | grid | halftone | diagonal | hex | chevrons | rings | stars | none
   *  - ambient: none | pulse-glow | shimmer-sweep | energy-sparks | spotlight-sway | scanline-crt
   *  - tier:    SIMPLE | PRO | EPIC
   */
  const VS_DESIGNS = [
    // =========================================================================
    // 1. ARCADE & POP (8 DESIGNS)
    // =========================================================================
    {
      id: 'arcade-pop', name: '★ Arcade Pop Split', cat: 'arcade', tier: 'EPIC',
      desc: 'Bold arcade yellow/black split with button icons, notched frame, and scrolling X tape.',
      split: 'vertical', frame: 'arcade-teeth', divider: 'x-tape', divAnim: 'scroll-down', divW: 28, divTilt: 0,
      emblem: 'winged', embAnim: 'pulse', plate: 'arcade-box', plateBottom: 176, header: 'trapezoid',
      pat: 'symbols', patOp: 22, wmOp: 0, ambient: 'none', font: 'Russo One', lightBg: true,
      bgLeft: 'radial-gradient(circle at 50% 42%, #ffe03a 0%, #f5b800 68%, #d49200 100%)',
      bgRight: 'radial-gradient(circle at 50% 42%, #ffe03a 0%, #f5b800 68%, #d49200 100%)',
      p1: '#ff3b1f', p2: '#1d4ed8', accent: '#ffd400', divColor: '#ffffff',
      plateBg: 'linear-gradient(180deg, rgba(16,15,14,0.96), rgba(6,6,8,0.98))', plateText: '#ffffff',
      headerBg: '#0a0b10', headerText: '#ffffff', frameColor: '#0a0b10', frameAccent: '#ffffff',
      swatch: 'linear-gradient(90deg, #f5b800 47%, #fff 47%, #fff 53%, #f5b800 53%)'
    },
    {
      id: 'retro-1997', name: 'Tekken 3 Arcade \'97', cat: 'arcade', tier: 'PRO',
      desc: '1997 Namco cabinet tribute: royal blue CRT scanlines, gold borders, and diamond VS crest.',
      split: 'vertical', frame: 'double-gold', divider: 'solid-glow', divAnim: 'shimmer', divW: 8, divTilt: 0,
      emblem: 'diamond-shield', embAnim: 'pulse', plate: 'arcade-box', plateBottom: 158, header: 'full-ribbon',
      pat: 'grid', patOp: 16, wmOp: 10, ambient: 'scanline-crt', font: 'Orbitron', lightBg: false,
      bgLeft: 'radial-gradient(circle at 42% 45%, #2563eb 0%, #172554 62%, #070d24 100%)',
      bgRight: 'radial-gradient(circle at 58% 45%, #dc2626 0%, #7f1d1d 62%, #1d0606 100%)',
      p1: '#facc15', p2: '#facc15', accent: '#fde047', divColor: '#facc15',
      plateBg: 'linear-gradient(180deg, rgba(16,32,84,0.95), rgba(7,12,32,0.98))', plateText: '#ffffff',
      headerBg: '#991b1b', headerText: '#fde047', frameColor: '#facc15', frameAccent: '#ffffff',
      swatch: 'linear-gradient(90deg, #1d4ed8 0%, #facc15 50%, #b91c1c 100%)'
    },
    {
      id: 'comic-bam', name: 'Manga Impact Pop', cat: 'arcade', tier: 'EPIC',
      desc: 'Comic-book ink frame, halftone dots, angled clash, starburst VS, and skewed panels.',
      split: 'diag-left', frame: 'manga-ink', divider: 'hazard-scroll', divAnim: 'scroll-up', divW: 22, divTilt: -7,
      emblem: 'comic-burst', embAnim: 'pulse', plate: 'comic-skew', plateBottom: 170, header: 'skew-tag',
      pat: 'halftone', patOp: 26, wmOp: 0, ambient: 'energy-sparks', font: 'Anton', lightBg: true,
      bgLeft: 'linear-gradient(135deg, #ff2a55 0%, #ff6b00 100%)',
      bgRight: 'linear-gradient(225deg, #00d4ff 0%, #2563eb 100%)',
      p1: '#ffe600', p2: '#ffe600', accent: '#ffe600', divColor: '#0a0a0f',
      plateBg: '#0b0b12', plateText: '#ffffff',
      headerBg: '#ffe600', headerText: '#0a0a0f', frameColor: '#09090d', frameAccent: '#ffffff',
      swatch: 'linear-gradient(120deg, #ff2a55 46%, #ffe600 46%, #ffe600 54%, #00d4ff 54%)'
    },
    {
      id: 'street-graffiti', name: 'Metro Street Paint', cat: 'arcade', tier: 'EPIC',
      desc: 'High-energy hot pink vs. acid lime diagonal clash with scrolling chevron divider.',
      split: 'diag-right', frame: 'hazard-tape', divider: 'chevron-stream', divAnim: 'scroll-down', divW: 26, divTilt: 7,
      emblem: 'slash-bolt', embAnim: 'float', plate: 'comic-skew', plateBottom: 164, header: 'skew-tag',
      pat: 'diagonal', patOp: 18, wmOp: 8, ambient: 'pulse-glow', font: 'Teko', lightBg: false,
      bgLeft: 'radial-gradient(circle at 34% 40%, #ff007f 0%, #6b0038 66%, #14030e 100%)',
      bgRight: 'radial-gradient(circle at 66% 40%, #84cc16 0%, #1e4d12 66%, #071408 100%)',
      p1: '#ff2e93', p2: '#a3e635', accent: '#fde047', divColor: '#a3e635',
      plateBg: 'rgba(11, 10, 18, 0.95)', plateText: '#ffffff',
      headerBg: '#120d1c', headerText: '#a3e635', frameColor: '#111118', frameAccent: '#a3e635',
      swatch: 'linear-gradient(125deg, #ff007f 0%, #14030e 48%, #84cc16 100%)'
    },
    {
      id: 'gold-coin', name: 'Insert Coin Gold', cat: 'arcade', tier: 'PRO',
      desc: 'Jet obsidian arcade cabinet trimmed in coin gold with vertical scrolling VS ticker.',
      split: 'vertical', frame: 'arcade-teeth', divider: 'ticker-vs', divAnim: 'scroll-up', divW: 34, divTilt: 0,
      emblem: 'hex-core', embAnim: 'pulse', plate: 'arcade-box', plateBottom: 170, header: 'trapezoid',
      pat: 'stars', patOp: 18, wmOp: 10, ambient: 'shimmer-sweep', font: 'Russo One', lightBg: false,
      bgLeft: 'radial-gradient(circle at 38% 45%, #4a3710 0%, #151109 68%, #070604 100%)',
      bgRight: 'radial-gradient(circle at 62% 45%, #4a3710 0%, #151109 68%, #070604 100%)',
      p1: '#fbbf24', p2: '#f59e0b', accent: '#fde047', divColor: '#fbbf24',
      plateBg: 'linear-gradient(180deg, #19150c, #090805)', plateText: '#fffbeb',
      headerBg: '#171309', headerText: '#fde047', frameColor: '#080705', frameAccent: '#fbbf24',
      swatch: 'linear-gradient(90deg, #18130a 0%, #fbbf24 50%, #18130a 100%)'
    },
    {
      id: 'neogeo-clash', name: 'Neo Classic \'94', cat: 'arcade', tier: 'SIMPLE',
      desc: 'Clean retro fighting layout: crisp red vs. royal blue halves with zero visual clutter.',
      split: 'vertical', frame: 'minimal-line', divider: 'hairline', divAnim: 'static', divW: 4, divTilt: 0,
      emblem: 'pill-tag', embAnim: 'none', plate: 'floating-clean', plateBottom: 140, header: 'full-ribbon',
      pat: 'none', patOp: 0, wmOp: 0, ambient: 'none', font: 'Oswald', lightBg: false,
      bgLeft: 'linear-gradient(180deg, #b91c1c 0%, #450a0a 100%)',
      bgRight: 'linear-gradient(180deg, #1d4ed8 0%, #172554 100%)',
      p1: '#ef4444', p2: '#3b82f6', accent: '#ffffff', divColor: '#ffffff',
      plateBg: 'rgba(8, 10, 16, 0.92)', plateText: '#ffffff',
      headerBg: '#090b10', headerText: '#ffffff', frameColor: '#ffffff', frameAccent: '#ffffff',
      swatch: 'linear-gradient(90deg, #b91c1c 50%, #1d4ed8 50%)'
    },
    {
      id: 'pixel-grid', name: 'Synthwave Laser 80s', cat: 'arcade', tier: 'EPIC',
      desc: 'Outrun magenta sunset vs. laser cyan with glowing grid, neon border, and scan rail.',
      split: 'horizon', frame: 'neon-tube', divider: 'scan-rail', divAnim: 'scroll-down', divW: 12, divTilt: 0,
      emblem: 'circle-ring', embAnim: 'spin-ring', plate: 'glass-pill', plateBottom: 154, header: 'floating-pill',
      pat: 'grid', patOp: 24, wmOp: 0, ambient: 'scanline-crt', font: 'Orbitron', lightBg: false,
      bgLeft: 'linear-gradient(160deg, #2d0647 0%, #9d174d 58%, #f43f5e 100%)',
      bgRight: 'linear-gradient(200deg, #061c3d 0%, #0284c7 58%, #22d3ee 100%)',
      p1: '#f472b6', p2: '#22d3ee', accent: '#f0abfc', divColor: '#22d3ee',
      plateBg: 'rgba(13, 8, 28, 0.84)', plateText: '#ffffff',
      headerBg: 'rgba(18, 8, 36, 0.92)', headerText: '#f0abfc', frameColor: '#f472b6', frameAccent: '#22d3ee',
      swatch: 'linear-gradient(135deg, #f43f5e 0%, #2d0647 50%, #22d3ee 100%)'
    },
    {
      id: 'candy-pop', name: 'Hyper Pop Citrus', cat: 'arcade', tier: 'PRO',
      desc: 'Bright tangerine vs. electric mint split with crisp white stripes and bouncing energy.',
      split: 'vertical', frame: 'arcade-teeth', divider: 'chevron-stream', divAnim: 'scroll-up', divW: 26, divTilt: 0,
      emblem: 'winged', embAnim: 'float', plate: 'arcade-box', plateBottom: 172, header: 'floating-pill',
      pat: 'rings', patOp: 22, wmOp: 0, ambient: 'none', font: 'Bebas Neue', lightBg: true,
      bgLeft: 'radial-gradient(circle at 46% 42%, #ff9a1f 0%, #f97316 70%, #c2410c 100%)',
      bgRight: 'radial-gradient(circle at 54% 42%, #2dd4bf 0%, #0d9488 70%, #115e59 100%)',
      p1: '#ff6b00', p2: '#14b8a6', accent: '#ffffff', divColor: '#ffffff',
      plateBg: 'rgba(12, 14, 20, 0.96)', plateText: '#ffffff',
      headerBg: '#0c0e14', headerText: '#ffffff', frameColor: '#0c0e14', frameAccent: '#ffffff',
      swatch: 'linear-gradient(90deg, #f97316 48%, #fff 48%, #fff 52%, #14b8a6 52%)'
    },

    // =========================================================================
    // 2. TEKKEN & FGC MAJORS (10 DESIGNS)
    // =========================================================================
    {
      id: 't8-clash', name: '★ Tekken 8 Heat Clash', cat: 'tekken', tier: 'EPIC',
      desc: 'Molten Heat orange vs. electric violet diagonal rift with pulsing plasma divider and T8 blades.',
      split: 'diag-left', frame: 'cinematic-bars', divider: 'energy-beam', divAnim: 'scroll-down', divW: 14, divTilt: -8,
      emblem: 'slash-bolt', embAnim: 'pulse', plate: 't8-blade', plateBottom: 168, header: 'trapezoid',
      pat: 'diagonal', patOp: 14, wmOp: 14, ambient: 'energy-sparks', font: 'Barlow Condensed', lightBg: false,
      bgLeft: 'radial-gradient(circle at 36% 42%, rgba(255,115,20,0.75) 0%, rgba(145,22,8,0.78) 44%, #09070d 88%)',
      bgRight: 'radial-gradient(circle at 64% 42%, rgba(124,58,237,0.78) 0%, rgba(28,36,125,0.78) 44%, #080914 88%)',
      p1: '#ff7b1c', p2: '#8b5cf6', accent: '#ffbe26', divColor: '#ff9d1c',
      plateBg: 'linear-gradient(180deg, rgba(24,20,32,0.95), rgba(10,8,15,0.98))', plateText: '#ffffff',
      headerBg: 'linear-gradient(180deg, #1b1420, #0a080f)', headerText: '#ffffff', frameColor: '#07060a', frameAccent: '#ffae19',
      swatch: 'linear-gradient(120deg, #ff5e1a 0%, #140b18 48%, #7c3aed 100%)'
    },
    {
      id: 'twt-clean', name: '★ TWT Broadcast Pro', cat: 'tekken', tier: 'PRO',
      desc: 'Official championship carbon matte layout with giant flag watermarks and crisp red/blue plates.',
      split: 'vertical', frame: 'minimal-line', divider: 'solid-glow', divAnim: 'shimmer', divW: 4, divTilt: 0,
      emblem: 'pill-tag', embAnim: 'none', plate: 'arcade-box', plateBottom: 148, header: 'trapezoid',
      pat: 'diagonal', patOp: 8, wmOp: 26, ambient: 'shimmer-sweep', font: 'Barlow Condensed', lightBg: false,
      bgLeft: 'linear-gradient(135deg, #2a0d17 0%, #10131c 56%, #080a10 100%)',
      bgRight: 'linear-gradient(225deg, #0d1c36 0%, #10131c 56%, #080a10 100%)',
      p1: '#f41f64', p2: '#2474f5', accent: '#f41f64', divColor: '#ffffff',
      plateBg: 'rgba(13, 16, 25, 0.95)', plateText: '#ffffff',
      headerBg: '#d41634', headerText: '#ffffff', frameColor: '#f41f64', frameAccent: '#ffffff',
      swatch: 'linear-gradient(90deg, #4b0d20 0%, #10141f 50%, #0c234b 100%)'
    },
    {
      id: 'mishima-ewgf', name: 'Mishima Electric EWGF', cat: 'tekken', tier: 'EPIC',
      desc: 'Midnight lightning storm, animated electric crack divider, hex combat plates, and glowing hex VS.',
      split: 'chevron', frame: 'cyber-corners', divider: 'lightning-crack', divAnim: 'scroll-down', divW: 24, divTilt: 0,
      emblem: 'hex-core', embAnim: 'glitch', plate: 'hex-plate', plateBottom: 162, header: 'hex-crest',
      pat: 'hex', patOp: 18, wmOp: 12, ambient: 'pulse-glow', font: 'Chakra Petch', lightBg: false,
      bgLeft: 'radial-gradient(circle at 38% 45%, #0284c7 0%, #091a3d 56%, #040814 100%)',
      bgRight: 'radial-gradient(circle at 62% 45%, #2563eb 0%, #0d183b 56%, #040814 100%)',
      p1: '#00e5ff', p2: '#388bff', accent: '#00e5ff', divColor: '#00e5ff',
      plateBg: 'linear-gradient(180deg, rgba(8,18,40,0.95), rgba(4,8,20,0.98))', plateText: '#ffffff',
      headerBg: '#081734', headerText: '#67e8f9', frameColor: '#00d4ff', frameAccent: '#388bff',
      swatch: 'linear-gradient(90deg, #061b3a 0%, #00e5ff 50%, #0c2459 100%)'
    },
    {
      id: 'devil-gene', name: 'Devil Gene Inferno', cat: 'tekken', tier: 'EPIC',
      desc: 'Void obsidian split by crimson hellfire vs. dark amethyst with glowing plasma rift.',
      split: 'diag-right', frame: 'cinematic-bars', divider: 'energy-beam', divAnim: 'scroll-up', divW: 16, divTilt: 8,
      emblem: 'slash-bolt', embAnim: 'pulse', plate: 't8-blade', plateBottom: 166, header: 'trapezoid',
      pat: 'chevrons', patOp: 16, wmOp: 12, ambient: 'energy-sparks', font: 'Teko', lightBg: false,
      bgLeft: 'radial-gradient(circle at 36% 44%, #be123c 0%, #3b0414 55%, #070204 95%)',
      bgRight: 'radial-gradient(circle at 64% 44%, #9333ea 0%, #2b0642 55%, #07020a 95%)',
      p1: '#ff1744', p2: '#d500f9', accent: '#ff1744', divColor: '#ff1744',
      plateBg: 'linear-gradient(180deg, rgba(22,6,12,0.96), rgba(8,2,5,0.98))', plateText: '#ffffff',
      headerBg: '#25040d', headerText: '#ff6b8b', frameColor: '#060103', frameAccent: '#ff1744',
      swatch: 'linear-gradient(125deg, #be123c 0%, #090206 50%, #9333ea 100%)'
    },
    {
      id: 'iron-fist-gold', name: 'King of Iron Fist Gold', cat: 'tekken', tier: 'PRO',
      desc: 'Championship obsidian & brushed gold filigree with luxury double frame and metallic sheen.',
      split: 'vertical', frame: 'double-gold', divider: 'solid-glow', divAnim: 'shimmer', divW: 6, divTilt: 0,
      emblem: 'diamond-shield', embAnim: 'pulse', plate: 't8-blade', plateBottom: 160, header: 'hex-crest',
      pat: 'hex', patOp: 12, wmOp: 18, ambient: 'shimmer-sweep', font: 'Barlow Condensed', lightBg: false,
      bgLeft: 'radial-gradient(circle at 35% 42%, #594112 0%, #18130a 60%, #080705 100%)',
      bgRight: 'radial-gradient(circle at 65% 42%, #594112 0%, #18130a 60%, #080705 100%)',
      p1: '#f3c652', p2: '#e8c25a', accent: '#fde047', divColor: '#f3c652',
      plateBg: 'linear-gradient(180deg, rgba(24,20,14,0.96), rgba(10,8,6,0.98))', plateText: '#ffffff',
      headerBg: '#1b160d', headerText: '#fde047', frameColor: '#e8c25a', frameAccent: '#fff1a8',
      swatch: 'linear-gradient(90deg, #1b160d 0%, #f3c652 50%, #1b160d 100%)'
    },
    {
      id: 'evo-championship', name: 'EVO Finals Arena', cat: 'tekken', tier: 'EPIC',
      desc: 'Major finals stadium atmosphere with sweeping stage spotlights, royal blue vs. crimson, gold crown.',
      split: 'radial-clash', frame: 'cinematic-bars', divider: 'scan-rail', divAnim: 'scroll-down', divW: 10, divTilt: 0,
      emblem: 'winged', embAnim: 'pulse', plate: 'corner-ribbon', plateBottom: 146, header: 'trapezoid',
      pat: 'diagonal', patOp: 10, wmOp: 20, ambient: 'spotlight-sway', font: 'Barlow Condensed', lightBg: false,
      bgLeft: 'radial-gradient(circle at 32% 35%, #0284c7 0%, #0e1a36 58%, #070a14 100%)',
      bgRight: 'radial-gradient(circle at 68% 35%, #e11d48 0%, #2a0d1c 58%, #070a14 100%)',
      p1: '#00b4ff', p2: '#ff2e55', accent: '#ffd75e', divColor: '#ffd75e',
      plateBg: 'rgba(13, 17, 29, 0.94)', plateText: '#ffffff',
      headerBg: '#13192b', headerText: '#ffd75e', frameColor: '#070910', frameAccent: '#ffd75e',
      swatch: 'linear-gradient(90deg, #0284c7 0%, #ffd75e 50%, #e11d48 100%)'
    },
    {
      id: 'ewc-riyadh', name: 'Esports World Cup', cat: 'tekken', tier: 'PRO',
      desc: 'Luxury matte obsidian contrasting liquid gold (P1) vs. championship emerald (P2).',
      split: 'vertical', frame: 'double-gold', divider: 'hairline', divAnim: 'shimmer', divW: 4, divTilt: 0,
      emblem: 'diamond-shield', embAnim: 'none', plate: 'luxury-thin', plateBottom: 150, header: 'trapezoid',
      pat: 'hex', patOp: 10, wmOp: 22, ambient: 'shimmer-sweep', font: 'Montserrat', lightBg: false,
      bgLeft: 'radial-gradient(circle at 35% 44%, rgba(229,193,88,0.38) 0%, #12110d 62%, #070706 100%)',
      bgRight: 'radial-gradient(circle at 65% 44%, rgba(16,185,129,0.38) 0%, #0b1713 62%, #060908 100%)',
      p1: '#e5c158', p2: '#10b981', accent: '#f3d273', divColor: '#e5c158',
      plateBg: 'rgba(12, 12, 11, 0.94)', plateText: '#ffffff',
      headerBg: '#18150d', headerText: '#f3d273', frameColor: '#e5c158', frameAccent: '#10b981',
      swatch: 'linear-gradient(90deg, #e5c158 0%, #0d0d0b 50%, #10b981 100%)'
    },
    {
      id: 'kazama-sanctuary', name: 'Kazama Sanctuary Light', cat: 'tekken', tier: 'PRO',
      desc: 'Bright alabaster pearl & celestial azure light aesthetic with soft frosted glass cards.',
      split: 'vertical', frame: 'minimal-line', divider: 'solid-glow', divAnim: 'pulse', divW: 4, divTilt: 0,
      emblem: 'circle-ring', embAnim: 'float', plate: 'glass-pill', plateBottom: 152, header: 'floating-pill',
      pat: 'rings', patOp: 14, wmOp: 12, ambient: 'pulse-glow', font: 'Exo 2', lightBg: true,
      bgLeft: 'radial-gradient(circle at 36% 40%, #ffffff 0%, #dbeafe 58%, #93c5fd 100%)',
      bgRight: 'radial-gradient(circle at 64% 40%, #ffffff 0%, #e0e7ff 58%, #a5b4fc 100%)',
      p1: '#0284c7', p2: '#4f46e5', accent: '#0284c7', divColor: '#38bdf8',
      plateBg: 'rgba(255, 255, 255, 0.88)', plateText: '#0f172a',
      headerBg: 'rgba(255, 255, 255, 0.94)', headerText: '#0f172a', frameColor: '#0284c7', frameAccent: '#6366f1',
      swatch: 'linear-gradient(90deg, #bae6fd 0%, #ffffff 50%, #c7d2fe 100%)'
    },
    {
      id: 'yakushima-jade', name: 'Yakushima Ancient Jade', cat: 'tekken', tier: 'PRO',
      desc: 'Mystical emerald forest jade & antique gold hex plates with serene ambient glow.',
      split: 'chevron', frame: 'double-gold', divider: 'solid-glow', divAnim: 'shimmer', divW: 6, divTilt: 0,
      emblem: 'hex-core', embAnim: 'float', plate: 'hex-plate', plateBottom: 158, header: 'hex-crest',
      pat: 'hex', patOp: 16, wmOp: 16, ambient: 'pulse-glow', font: 'Barlow Condensed', lightBg: false,
      bgLeft: 'radial-gradient(circle at 38% 44%, #059669 0%, #072920 60%, #03110d 100%)',
      bgRight: 'radial-gradient(circle at 62% 44%, #0d9488 0%, #072826 60%, #03110f 100%)',
      p1: '#10b981', p2: '#14b8a6', accent: '#eab308', divColor: '#d4af37',
      plateBg: 'rgba(6, 24, 20, 0.95)', plateText: '#ecfdf5',
      headerBg: '#09241e', headerText: '#eab308', frameColor: '#d4af37', frameAccent: '#10b981',
      swatch: 'linear-gradient(90deg, #059669 0%, #d4af37 50%, #0f766e 100%)'
    },
    {
      id: 'reina-voltage', name: 'Reina Purple Voltage', cat: 'tekken', tier: 'EPIC',
      desc: 'Aggressive electric violet & magenta reverse slash with flickering lightning rift.',
      split: 'diag-right', frame: 'neon-tube', divider: 'lightning-crack', divAnim: 'scroll-up', divW: 22, divTilt: 7,
      emblem: 'slash-bolt', embAnim: 'glitch', plate: 'comic-skew', plateBottom: 164, header: 'skew-tag',
      pat: 'chevrons', patOp: 16, wmOp: 10, ambient: 'energy-sparks', font: 'Chakra Petch', lightBg: false,
      bgLeft: 'radial-gradient(circle at 36% 44%, #c026d3 0%, #3b0764 58%, #0b0314 100%)',
      bgRight: 'radial-gradient(circle at 64% 44%, #7c3aed 0%, #2e1065 58%, #090314 100%)',
      p1: '#e879f9', p2: '#a855f7', accent: '#f0abfc', divColor: '#f0abfc',
      plateBg: 'rgba(18, 6, 30, 0.96)', plateText: '#ffffff',
      headerBg: '#24083a', headerText: '#f0abfc', frameColor: '#d946ef', frameAccent: '#a855f7',
      swatch: 'linear-gradient(125deg, #c026d3 0%, #140522 50%, #7c3aed 100%)'
    },

    // =========================================================================
    // 3. ESPORTS BROADCAST PRO (8 DESIGNS)
    // =========================================================================
    {
      id: 'portrait-cards', name: '★ Player Spotlight Cards', cat: 'esports', tier: 'PRO',
      desc: 'Player profile photos take center stage inside framed studio cards with soft lighting.',
      split: 'framed-cards', frame: 'minimal-line', divider: 'hairline', divAnim: 'static', divW: 3, divTilt: 0,
      emblem: 'pill-tag', embAnim: 'none', plate: 'glass-pill', plateBottom: 146, header: 'floating-pill',
      pat: 'grid', patOp: 8, wmOp: 18, ambient: 'none', font: 'Barlow Condensed', lightBg: false,
      bgLeft: 'radial-gradient(circle at 35% 40%, rgba(255,92,40,0.36), #0c0f18 72%)',
      bgRight: 'radial-gradient(circle at 65% 40%, rgba(59,130,246,0.38), #0c0f18 72%)',
      p1: '#ff5c28', p2: '#3b82f6', accent: '#fbbf24', divColor: 'rgba(255,255,255,0.35)',
      plateBg: 'rgba(13, 17, 28, 0.92)', plateText: '#ffffff',
      headerBg: 'rgba(13, 17, 28, 0.95)', headerText: '#ffffff', frameColor: 'rgba(255,255,255,0.22)', frameAccent: '#3b82f6',
      swatch: 'linear-gradient(135deg, #2b1a1c 0%, #0f1320 50%, #16233d 100%)'
    },
    {
      id: 'tv-prime-white', name: 'Prime Broadcast White', cat: 'esports', tier: 'SIMPLE',
      desc: 'Daylight sports-network crisp white & crimson broadcast layout — clean and legible.',
      split: 'vertical', frame: 'minimal-line', divider: 'hairline', divAnim: 'static', divW: 4, divTilt: 0,
      emblem: 'pill-tag', embAnim: 'none', plate: 'floating-clean', plateBottom: 142, header: 'full-ribbon',
      pat: 'none', patOp: 0, wmOp: 8, ambient: 'none', font: 'Oswald', lightBg: true,
      bgLeft: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
      bgRight: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
      p1: '#dc2626', p2: '#1d4ed8', accent: '#dc2626', divColor: '#cbd5e1',
      plateBg: '#ffffff', plateText: '#0f172a',
      headerBg: '#b91c1c', headerText: '#ffffff', frameColor: '#dc2626', frameAccent: '#0f172a',
      swatch: 'linear-gradient(90deg, #f8fafc 0%, #dc2626 50%, #e2e8f0 100%)'
    },
    {
      id: 'esports-navy', name: 'Major Finals Navy', cat: 'esports', tier: 'PRO',
      desc: 'Classic slate-navy broadcast production with orange vs. cyan accents and clean data rail.',
      split: 'vertical', frame: 'cyber-corners', divider: 'scan-rail', divAnim: 'scroll-down', divW: 10, divTilt: 0,
      emblem: 'diamond-shield', embAnim: 'none', plate: 'corner-ribbon', plateBottom: 152, header: 'full-ribbon',
      pat: 'grid', patOp: 10, wmOp: 16, ambient: 'shimmer-sweep', font: 'Barlow Condensed', lightBg: false,
      bgLeft: 'radial-gradient(circle at 36% 42%, #1e3a5f 0%, #0f172a 66%, #070b14 100%)',
      bgRight: 'radial-gradient(circle at 64% 42%, #1e3a5f 0%, #0f172a 66%, #070b14 100%)',
      p1: '#f97316', p2: '#06b6d4', accent: '#38bdf8', divColor: '#38bdf8',
      plateBg: 'rgba(15, 23, 42, 0.95)', plateText: '#ffffff',
      headerBg: '#0f172a', headerText: '#ffffff', frameColor: '#38bdf8', frameAccent: '#f97316',
      swatch: 'linear-gradient(90deg, #1e3a5f 0%, #f97316 49%, #06b6d4 51%, #0f172a 100%)'
    },
    {
      id: 'carbon-stealth', name: 'Stealth Carbon Matte', cat: 'esports', tier: 'SIMPLE',
      desc: 'Triple-black matte carbon surface with razor-thin crimson edge and zero distractions.',
      split: 'minimal-clean', frame: 'none', divider: 'hairline', divAnim: 'static', divW: 2, divTilt: 0,
      emblem: 'minimal-text', embAnim: 'none', plate: 'luxury-thin', plateBottom: 138, header: 'minimal-text',
      pat: 'diagonal', patOp: 6, wmOp: 14, ambient: 'none', font: 'Chakra Petch', lightBg: false,
      bgLeft: 'linear-gradient(180deg, #16181f 0%, #090a0e 100%)',
      bgRight: 'linear-gradient(180deg, #16181f 0%, #090a0e 100%)',
      p1: '#ef4444', p2: '#ef4444', accent: '#ef4444', divColor: 'rgba(255,255,255,0.22)',
      plateBg: 'rgba(12, 13, 18, 0.94)', plateText: '#f8fafc',
      headerBg: 'transparent', headerText: '#ffffff', frameColor: 'transparent', frameAccent: '#ef4444',
      swatch: 'linear-gradient(90deg, #14161d 0%, #ef4444 50%, #0a0b0f 100%)'
    },
    {
      id: 'champion-ring', name: 'Championship Octagon', cat: 'esports', tier: 'EPIC',
      desc: 'Steel cage industrial aesthetic with spinning segmented HUD ring VS and amber trim.',
      split: 'chevron', frame: 'hazard-tape', divider: 'hazard-scroll', divAnim: 'scroll-down', divW: 22, divTilt: 0,
      emblem: 'circle-ring', embAnim: 'spin-ring', plate: 'hex-plate', plateBottom: 162, header: 'trapezoid',
      pat: 'hex', patOp: 16, wmOp: 10, ambient: 'spotlight-sway', font: 'Black Ops One', lightBg: false,
      bgLeft: 'radial-gradient(circle at 38% 42%, #44403c 0%, #1c1917 62%, #0c0a09 100%)',
      bgRight: 'radial-gradient(circle at 62% 42%, #3f3f46 0%, #18181b 62%, #09090b 100%)',
      p1: '#f59e0b', p2: '#f97316', accent: '#fbbf24', divColor: '#f59e0b',
      plateBg: 'rgba(24, 24, 27, 0.96)', plateText: '#ffffff',
      headerBg: '#1c1917', headerText: '#fbbf24', frameColor: '#27272a', frameAccent: '#f59e0b',
      swatch: 'linear-gradient(90deg, #3f3f46 0%, #f59e0b 50%, #18181b 100%)'
    },
    {
      id: 'motorsport-f1', name: 'Grand Prix Telemetry', cat: 'esports', tier: 'PRO',
      desc: 'High-speed racing livery with tri-stripe backdrop, scrolling VS ticker, and skew telemetry tags.',
      split: 'triple-stripe', frame: 'cinematic-bars', divider: 'ticker-vs', divAnim: 'scroll-down', divW: 32, divTilt: -6,
      emblem: 'pill-tag', embAnim: 'none', plate: 't8-blade', plateBottom: 158, header: 'skew-tag',
      pat: 'diagonal', patOp: 12, wmOp: 14, ambient: 'shimmer-sweep', font: 'Exo 2', lightBg: false,
      bgLeft: 'linear-gradient(125deg, #111827 0%, #1f2937 52%, #991b1b 100%)',
      bgRight: 'linear-gradient(235deg, #111827 0%, #1f2937 52%, #0369a1 100%)',
      p1: '#ef4444', p2: '#0ea5e9', accent: '#ffffff', divColor: '#ef4444',
      plateBg: 'rgba(10, 14, 22, 0.96)', plateText: '#ffffff',
      headerBg: '#dc2626', headerText: '#ffffff', frameColor: '#090c12', frameAccent: '#ffffff',
      swatch: 'linear-gradient(115deg, #991b1b 0%, #111827 50%, #0369a1 100%)'
    },
    {
      id: 'arena-spotlight', name: 'Live Stage Spotlights', cat: 'esports', tier: 'EPIC',
      desc: 'Dark grand-finals stage lit by twin sweeping spotlights and towering monolith VS.',
      split: 'horizon', frame: 'cinematic-bars', divider: 'none', divAnim: 'static', divW: 0, divTilt: 0,
      emblem: 'monolith', embAnim: 'pulse', plate: 'stacked-banner', plateBottom: 140, header: 'minimal-text',
      pat: 'none', patOp: 0, wmOp: 18, ambient: 'spotlight-sway', font: 'Bebas Neue', lightBg: false,
      bgLeft: 'radial-gradient(ellipse at 30% 15%, rgba(56,189,248,0.45) 0%, #0a0e18 65%, #04060a 100%)',
      bgRight: 'radial-gradient(ellipse at 70% 15%, rgba(244,63,94,0.45) 0%, #0a0e18 65%, #04060a 100%)',
      p1: '#38bdf8', p2: '#f43f5e', accent: '#ffffff', divColor: 'transparent',
      plateBg: 'rgba(8, 10, 18, 0.9)', plateText: '#ffffff',
      headerBg: 'transparent', headerText: '#ffffff', frameColor: '#05060a', frameAccent: '#38bdf8',
      swatch: 'radial-gradient(circle at 25% 25%, #38bdf8, #080b14 60%), linear-gradient(90deg, #0b1628, #280b16)'
    },
    {
      id: 'duel-monolith', name: 'Editorial Monolith', cat: 'esports', tier: 'SIMPLE',
      desc: 'High-fashion esports poster: oversized clean VS typography, slate gradient, hairline plates.',
      split: 'minimal-clean', frame: 'minimal-line', divider: 'none', divAnim: 'static', divW: 0, divTilt: 0,
      emblem: 'monolith', embAnim: 'none', plate: 'luxury-thin', plateBottom: 132, header: 'minimal-text',
      pat: 'none', patOp: 0, wmOp: 10, ambient: 'none', font: 'Montserrat', lightBg: false,
      bgLeft: 'linear-gradient(180deg, #181a24 0%, #0b0c12 100%)',
      bgRight: 'linear-gradient(180deg, #1b1822 0%, #0b0c12 100%)',
      p1: '#e2e8f0', p2: '#e2e8f0', accent: '#cbd5e1', divColor: 'transparent',
      plateBg: 'rgba(11, 12, 18, 0.85)', plateText: '#ffffff',
      headerBg: 'transparent', headerText: '#e2e8f0', frameColor: 'rgba(255,255,255,0.2)', frameAccent: '#ffffff',
      swatch: 'linear-gradient(135deg, #272a38 0%, #0c0d13 100%)'
    },

    // =========================================================================
    // 4. ANIME, CYBER & SCI-FI (8 DESIGNS)
    // =========================================================================
    {
      id: 'cyber-neon', name: '★ Cyber Manga Neon', cat: 'anime', tier: 'EPIC',
      desc: 'Vibrant magenta vs. cyan anime diagonal split, glowing yellow divider, and skewed cyber plates.',
      split: 'diag-left', frame: 'neon-tube', divider: 'energy-beam', divAnim: 'scroll-down', divW: 16, divTilt: -7,
      emblem: 'winged', embAnim: 'glitch', plate: 'comic-skew', plateBottom: 170, header: 'trapezoid',
      pat: 'halftone', patOp: 22, wmOp: 0, ambient: 'energy-sparks', font: 'Russo One', lightBg: false,
      bgLeft: 'linear-gradient(135deg, #ff006e 0%, #9b0047 68%, #28041c 100%)',
      bgRight: 'linear-gradient(225deg, #00d4ff 0%, #0058b8 68%, #07122e 100%)',
      p1: '#ff006e', p2: '#00d4ff', accent: '#ffe600', divColor: '#ffe600',
      plateBg: 'rgba(8, 6, 18, 0.95)', plateText: '#ffffff',
      headerBg: '#0d071c', headerText: '#ffe600', frameColor: '#ffe600', frameAccent: '#00d4ff',
      swatch: 'linear-gradient(125deg, #ff006e 0%, #ffe600 50%, #00d4ff 100%)'
    },
    {
      id: 'mecha-hud', name: 'Mecha Tactical HUD', cat: 'anime', tier: 'EPIC',
      desc: 'Sci-fi cockpit HUD with corner brackets, scrolling telemetry rail, spinning ring VS, and hex grid.',
      split: 'vertical', frame: 'cyber-corners', divider: 'scan-rail', divAnim: 'scroll-up', divW: 16, divTilt: 0,
      emblem: 'circle-ring', embAnim: 'spin-ring', plate: 'hex-plate', plateBottom: 156, header: 'hex-crest',
      pat: 'hex', patOp: 20, wmOp: 8, ambient: 'scanline-crt', font: 'Orbitron', lightBg: false,
      bgLeft: 'radial-gradient(circle at 34% 44%, #0f4c5c 0%, #081c24 62%, #030b10 100%)',
      bgRight: 'radial-gradient(circle at 66% 44%, #5c2b0f 0%, #241208 62%, #100703 100%)',
      p1: '#22d3ee', p2: '#fb923c', accent: '#22d3ee', divColor: '#22d3ee',
      plateBg: 'rgba(6, 18, 26, 0.94)', plateText: '#ecfeff',
      headerBg: '#071b24', headerText: '#22d3ee', frameColor: '#22d3ee', frameAccent: '#fb923c',
      swatch: 'linear-gradient(90deg, #0f4c5c 0%, #22d3ee 50%, #7c2d12 100%)'
    },
    {
      id: 'sakura-dojo', name: 'Sakura Dojo Kyoto', cat: 'anime', tier: 'PRO',
      desc: 'Sumi-e midnight ink canvas with sakura pink vs. indigo gradients and soft floating glass.',
      split: 'vertical', frame: 'double-gold', divider: 'solid-glow', divAnim: 'shimmer', divW: 4, divTilt: 0,
      emblem: 'circle-ring', embAnim: 'float', plate: 'glass-pill', plateBottom: 152, header: 'floating-pill',
      pat: 'stars', patOp: 16, wmOp: 12, ambient: 'pulse-glow', font: 'Exo 2', lightBg: false,
      bgLeft: 'radial-gradient(circle at 36% 40%, #9d174d 0%, #271122 58%, #0f0710 100%)',
      bgRight: 'radial-gradient(circle at 64% 40%, #3730a3 0%, #161333 58%, #090814 100%)',
      p1: '#f472b6', p2: '#818cf8', accent: '#f9a8d4', divColor: '#f9a8d4',
      plateBg: 'rgba(22, 13, 28, 0.86)', plateText: '#fff1f2',
      headerBg: 'rgba(26, 15, 34, 0.92)', headerText: '#f9a8d4', frameColor: '#f472b6', frameAccent: '#818cf8',
      swatch: 'linear-gradient(90deg, #db2777 0%, #1a0f22 50%, #4f46e5 100%)'
    },
    {
      id: 'matrix-terminal', name: 'Hacker Terminal CRT', cat: 'anime', tier: 'PRO',
      desc: 'OLED pitch black with neon phosphor emerald grid, CRT scanlines, and scrolling data divider.',
      split: 'vertical', frame: 'cyber-corners', divider: 'scan-rail', divAnim: 'scroll-down', divW: 12, divTilt: 0,
      emblem: 'hex-core', embAnim: 'glitch', plate: 'arcade-box', plateBottom: 150, header: 'full-ribbon',
      pat: 'grid', patOp: 22, wmOp: 0, ambient: 'scanline-crt', font: 'Orbitron', lightBg: false,
      bgLeft: 'radial-gradient(circle at 38% 46%, rgba(16,185,129,0.28) 0%, #04120c 60%, #020705 100%)',
      bgRight: 'radial-gradient(circle at 62% 46%, rgba(16,185,129,0.28) 0%, #04120c 60%, #020705 100%)',
      p1: '#22c55e', p2: '#10b981', accent: '#4ade80', divColor: '#22c55e',
      plateBg: 'rgba(3, 14, 9, 0.95)', plateText: '#dcfce7',
      headerBg: '#04140d', headerText: '#4ade80', frameColor: '#22c55e', frameAccent: '#86efac',
      swatch: 'linear-gradient(90deg, #04140d 0%, #22c55e 50%, #04140d 100%)'
    },
    {
      id: 'blood-moon', name: 'Crimson Blood Moon', cat: 'anime', tier: 'EPIC',
      desc: 'Dramatic scarlet eclipse backdrop sliced by a white-hot katana slash and bold ink plates.',
      split: 'diag-left', frame: 'manga-ink', divider: 'energy-beam', divAnim: 'pulse', divW: 12, divTilt: -9,
      emblem: 'slash-bolt', embAnim: 'pulse', plate: 't8-blade', plateBottom: 164, header: 'trapezoid',
      pat: 'rings', patOp: 14, wmOp: 14, ambient: 'energy-sparks', font: 'Anton', lightBg: false,
      bgLeft: 'radial-gradient(circle at 46% 42%, #dc2626 0%, #450a0a 56%, #090202 100%)',
      bgRight: 'radial-gradient(circle at 54% 42%, #991b1b 0%, #1c0507 56%, #050202 100%)',
      p1: '#ef4444', p2: '#ffffff', accent: '#f87171', divColor: '#ffffff',
      plateBg: 'rgba(10, 4, 5, 0.96)', plateText: '#ffffff',
      headerBg: '#120406', headerText: '#ffffff', frameColor: '#000000', frameAccent: '#ef4444',
      swatch: 'linear-gradient(120deg, #dc2626 48%, #ffffff 50%, #1c0507 52%)'
    },
    {
      id: 'prism-holo', name: 'Prism Holographic', cat: 'anime', tier: 'EPIC',
      desc: 'Iridescent rainbow holographic neon rail, shimmering glass plates, and luminous prism VS.',
      split: 'radial-clash', frame: 'neon-tube', divider: 'energy-beam', divAnim: 'shimmer', divW: 10, divTilt: 0,
      emblem: 'diamond-shield', embAnim: 'float', plate: 'glass-pill', plateBottom: 158, header: 'floating-pill',
      pat: 'stars', patOp: 20, wmOp: 10, ambient: 'shimmer-sweep', font: 'Exo 2', lightBg: false,
      bgLeft: 'linear-gradient(135deg, #3b0764 0%, #be185d 45%, #0e7490 100%)',
      bgRight: 'linear-gradient(225deg, #0e7490 0%, #4f46e5 45%, #be185d 100%)',
      p1: '#ec4899', p2: '#06b6d4', accent: '#67e8f9', divColor: '#f472b6',
      plateBg: 'rgba(11, 13, 28, 0.78)', plateText: '#ffffff',
      headerBg: 'rgba(14, 16, 34, 0.88)', headerText: '#ffffff', frameColor: '#ec4899', frameAccent: '#06b6d4',
      swatch: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #7928ca)'
    },
    {
      id: 'strive-heavy', name: 'Heavy Rock Gear', cat: 'anime', tier: 'EPIC',
      desc: 'Heavy metal crimson-black arena with caution hazard divider and screaming yellow blocks.',
      split: 'vertical', frame: 'hazard-tape', divider: 'hazard-scroll', divAnim: 'scroll-down', divW: 26, divTilt: 0,
      emblem: 'comic-burst', embAnim: 'pulse', plate: 'arcade-box', plateBottom: 168, header: 'skew-tag',
      pat: 'chevrons', patOp: 18, wmOp: 0, ambient: 'energy-sparks', font: 'Black Ops One', lightBg: false,
      bgLeft: 'radial-gradient(circle at 38% 42%, #7f1d1d 0%, #1c0505 64%, #090202 100%)',
      bgRight: 'radial-gradient(circle at 62% 42%, #7f1d1d 0%, #1c0505 64%, #090202 100%)',
      p1: '#f5b31a', p2: '#f5b31a', accent: '#f5b31a', divColor: '#f5b31a',
      plateBg: 'rgba(18, 4, 4, 0.96)', plateText: '#ffffff',
      headerBg: '#f5b31a', headerText: '#140404', frameColor: '#140404', frameAccent: '#f5b31a',
      swatch: 'linear-gradient(90deg, #7f1d1d 0%, #f5b31a 50%, #140404 100%)'
    },
    {
      id: 'arcane-hex', name: 'Arcane Hex Forge', cat: 'anime', tier: 'PRO',
      desc: 'Brushed gunmetal & antique gold filigree centered on a glowing sapphire hexagonal VS core.',
      split: 'chevron', frame: 'double-gold', divider: 'solid-glow', divAnim: 'pulse', divW: 8, divTilt: 0,
      emblem: 'hex-core', embAnim: 'pulse', plate: 'hex-plate', plateBottom: 158, header: 'hex-crest',
      pat: 'hex', patOp: 16, wmOp: 12, ambient: 'shimmer-sweep', font: 'Chakra Petch', lightBg: false,
      bgLeft: 'radial-gradient(circle at 36% 42%, #1d4ed8 0%, #172038 58%, #0a0e18 100%)',
      bgRight: 'radial-gradient(circle at 64% 42%, #2563eb 0%, #172038 58%, #0a0e18 100%)',
      p1: '#d6b164', p2: '#3b82f6', accent: '#e7c97f', divColor: '#3b82f6',
      plateBg: 'linear-gradient(180deg, rgba(31,37,51,0.95), rgba(14,17,26,0.98))', plateText: '#ffffff',
      headerBg: 'linear-gradient(180deg, #3b82f6, #1d4ed8)', headerText: '#ffffff', frameColor: '#d6b164', frameAccent: '#3b82f6',
      swatch: 'linear-gradient(90deg, #1e2433 0%, #d6b164 46%, #3b82f6 54%, #1e2433 100%)'
    },

    // =========================================================================
    // 5. CLEAN, GLASS & MINIMALIST (8 DESIGNS)
    // =========================================================================
    {
      id: 'glass-pro', name: '★ Liquid Frosted Glass', cat: 'minimal', tier: 'PRO',
      desc: 'Translucent blur cards over soft pastel aurora bloom — super sleek over streams.',
      split: 'vertical', frame: 'minimal-line', divider: 'hairline', divAnim: 'static', divW: 2, divTilt: 0,
      emblem: 'pill-tag', embAnim: 'float', plate: 'glass-pill', plateBottom: 154, header: 'floating-pill',
      pat: 'none', patOp: 0, wmOp: 12, ambient: 'pulse-glow', font: 'Montserrat', lightBg: false,
      bgLeft: 'radial-gradient(circle at 28% 35%, rgba(56,189,248,0.34), rgba(10,14,24,0.9) 70%)',
      bgRight: 'radial-gradient(circle at 72% 35%, rgba(251,113,133,0.34), rgba(10,14,24,0.9) 70%)',
      p1: '#38bdf8', p2: '#fb7185', accent: '#e2e8f0', divColor: 'rgba(255,255,255,0.32)',
      plateBg: 'rgba(15, 22, 38, 0.66)', plateText: '#ffffff',
      headerBg: 'rgba(15, 22, 38, 0.78)', headerText: '#ffffff', frameColor: 'rgba(255,255,255,0.2)', frameAccent: '#38bdf8',
      swatch: 'linear-gradient(135deg, #0f2a3f 0%, #151b2b 50%, #3b1224 100%)'
    },
    {
      id: 'minimal-obsidian', name: 'Ultra-Minimal Obsidian', cat: 'minimal', tier: 'SIMPLE',
      desc: 'Zero clutter, pure dark canvas, clean hairline divider, and ultra-legible bottom plates.',
      split: 'minimal-clean', frame: 'none', divider: 'hairline', divAnim: 'static', divW: 2, divTilt: 0,
      emblem: 'minimal-text', embAnim: 'none', plate: 'floating-clean', plateBottom: 130, header: 'minimal-text',
      pat: 'none', patOp: 0, wmOp: 0, ambient: 'none', font: 'Montserrat', lightBg: false,
      bgLeft: 'linear-gradient(180deg, #11131a 0%, #07080c 100%)',
      bgRight: 'linear-gradient(180deg, #11131a 0%, #07080c 100%)',
      p1: '#ffffff', p2: '#ffffff', accent: '#94a3b8', divColor: 'rgba(255,255,255,0.16)',
      plateBg: 'rgba(14, 16, 22, 0.92)', plateText: '#ffffff',
      headerBg: 'transparent', headerText: '#ffffff', frameColor: 'transparent', frameAccent: '#ffffff',
      swatch: 'linear-gradient(180deg, #161922 0%, #08090d 100%)'
    },
    {
      id: 'minimal-ivory', name: 'Ultra-Minimal Ivory', cat: 'minimal', tier: 'SIMPLE',
      desc: 'Clean warm editorial off-white studio canvas with razor-sharp charcoal typography.',
      split: 'minimal-clean', frame: 'minimal-line', divider: 'hairline', divAnim: 'static', divW: 2, divTilt: 0,
      emblem: 'minimal-text', embAnim: 'none', plate: 'luxury-thin', plateBottom: 136, header: 'minimal-text',
      pat: 'none', patOp: 0, wmOp: 0, ambient: 'none', font: 'Montserrat', lightBg: true,
      bgLeft: 'linear-gradient(180deg, #faf8f5 0%, #ebe6de 100%)',
      bgRight: 'linear-gradient(180deg, #faf8f5 0%, #ebe6de 100%)',
      p1: '#18181b', p2: '#18181b', accent: '#b45309', divColor: 'rgba(24,24,27,0.2)',
      plateBg: 'rgba(255, 255, 255, 0.92)', plateText: '#18181b',
      headerBg: 'transparent', headerText: '#18181b', frameColor: 'rgba(24,24,27,0.18)', frameAccent: '#b45309',
      swatch: 'linear-gradient(180deg, #faf8f5 0%, #e5dfd5 100%)'
    },
    {
      id: 'camera-clean', name: 'Live Cam Lower-Third', cat: 'minimal', tier: 'SIMPLE',
      desc: 'Designed for transparent OBS scenes over live player cams — crisp lower cards & top tag.',
      split: 'minimal-clean', frame: 'none', divider: 'none', divAnim: 'static', divW: 0, divTilt: 0,
      emblem: 'pill-tag', embAnim: 'none', plate: 'stacked-banner', plateBottom: 96, header: 'floating-pill',
      pat: 'none', patOp: 0, wmOp: 0, ambient: 'none', font: 'Barlow Condensed', lightBg: false,
      bgLeft: 'linear-gradient(180deg, rgba(10,12,18,0.42) 0%, rgba(10,12,18,0.18) 55%, rgba(10,12,18,0.82) 100%)',
      bgRight: 'linear-gradient(180deg, rgba(10,12,18,0.42) 0%, rgba(10,12,18,0.18) 55%, rgba(10,12,18,0.82) 100%)',
      p1: '#3b82f6', p2: '#f43f5e', accent: '#facc15', divColor: 'transparent',
      plateBg: 'rgba(9, 12, 20, 0.92)', plateText: '#ffffff',
      headerBg: 'rgba(9, 12, 20, 0.92)', headerText: '#ffffff', frameColor: 'transparent', frameAccent: '#facc15',
      swatch: 'linear-gradient(180deg, #1b2234 0%, #0b0e16 70%, #3b82f6 100%)'
    },
    {
      id: 'nordic-frost', name: 'Nordic Ice Frost', cat: 'minimal', tier: 'PRO',
      desc: 'Glacier blue frosted glass with crisp ice-white trim and calm diamond VS badge.',
      split: 'vertical', frame: 'minimal-line', divider: 'solid-glow', divAnim: 'shimmer', divW: 4, divTilt: 0,
      emblem: 'diamond-shield', embAnim: 'float', plate: 'glass-pill', plateBottom: 150, header: 'floating-pill',
      pat: 'stars', patOp: 14, wmOp: 12, ambient: 'pulse-glow', font: 'Exo 2', lightBg: false,
      bgLeft: 'radial-gradient(circle at 36% 38%, #0284c7 0%, #0c2640 60%, #061322 100%)',
      bgRight: 'radial-gradient(circle at 64% 38%, #38bdf8 0%, #0c2c4a 60%, #061322 100%)',
      p1: '#7dd3fc', p2: '#bae6fd', accent: '#e0f2fe', divColor: '#bae6fd',
      plateBg: 'rgba(8, 28, 48, 0.72)', plateText: '#f0f9ff',
      headerBg: 'rgba(8, 28, 48, 0.84)', headerText: '#e0f2fe', frameColor: '#7dd3fc', frameAccent: '#ffffff',
      swatch: 'linear-gradient(135deg, #0284c7 0%, #0c2640 50%, #7dd3fc 100%)'
    },
    {
      id: 'sunset-lofi', name: 'Lofi Sunset Dusk', cat: 'minimal', tier: 'PRO',
      desc: 'Warm coral peach fading into twilight plum with rounded glass plates and gentle drift.',
      split: 'horizon', frame: 'none', divider: 'hairline', divAnim: 'shimmer', divW: 3, divTilt: 0,
      emblem: 'circle-ring', embAnim: 'float', plate: 'glass-pill', plateBottom: 146, header: 'floating-pill',
      pat: 'rings', patOp: 12, wmOp: 0, ambient: 'pulse-glow', font: 'Montserrat', lightBg: false,
      bgLeft: 'linear-gradient(160deg, #fb923c 0%, #be185d 56%, #2e1065 100%)',
      bgRight: 'linear-gradient(200deg, #f472b6 0%, #6d28d9 56%, #1e1b4b 100%)',
      p1: '#fdba74', p2: '#c4b5fd', accent: '#fde68a', divColor: 'rgba(255,255,255,0.45)',
      plateBg: 'rgba(24, 14, 40, 0.76)', plateText: '#ffffff',
      headerBg: 'rgba(24, 14, 40, 0.85)', headerText: '#fde68a', frameColor: 'transparent', frameAccent: '#fdba74',
      swatch: 'linear-gradient(135deg, #fb923c 0%, #be185d 50%, #4c1d95 100%)'
    },
    {
      id: 'emerald-studio', name: 'Mint Studio Clean', cat: 'minimal', tier: 'SIMPLE',
      desc: 'Deep pine forest studio with crisp emerald mint accents and clean floating cards.',
      split: 'vertical', frame: 'minimal-line', divider: 'hairline', divAnim: 'static', divW: 3, divTilt: 0,
      emblem: 'minimal-text', embAnim: 'none', plate: 'floating-clean', plateBottom: 142, header: 'floating-pill',
      pat: 'none', patOp: 0, wmOp: 10, ambient: 'none', font: 'Exo 2', lightBg: false,
      bgLeft: 'radial-gradient(circle at 38% 42%, #065f46 0%, #05261e 64%, #02110e 100%)',
      bgRight: 'radial-gradient(circle at 62% 42%, #047857 0%, #05261e 64%, #02110e 100%)',
      p1: '#34d399', p2: '#6ee7b7', accent: '#34d399', divColor: 'rgba(52,211,153,0.4)',
      plateBg: 'rgba(4, 24, 19, 0.92)', plateText: '#ecfdf5',
      headerBg: '#062c22', headerText: '#6ee7b7', frameColor: '#10b981', frameAccent: '#6ee7b7',
      swatch: 'linear-gradient(90deg, #065f46 0%, #34d399 50%, #02110e 100%)'
    },
    {
      id: 'monochrome-noir', name: 'Sin City Noir B&W', cat: 'minimal', tier: 'PRO',
      desc: 'High-contrast silver and pitch-black noir cinema with a single sharp scarlet strike.',
      split: 'diag-left', frame: 'cinematic-bars', divider: 'solid-glow', divAnim: 'pulse', divW: 8, divTilt: -7,
      emblem: 'monolith', embAnim: 'none', plate: 'arcade-box', plateBottom: 158, header: 'full-ribbon',
      pat: 'halftone', patOp: 16, wmOp: 12, ambient: 'none', font: 'Bebas Neue', lightBg: false,
      bgLeft: 'radial-gradient(circle at 38% 42%, #3f3f46 0%, #141417 62%, #050507 100%)',
      bgRight: 'radial-gradient(circle at 62% 42%, #27272a 0%, #0d0d10 62%, #040406 100%)',
      p1: '#ffffff', p2: '#dc2626', accent: '#dc2626', divColor: '#dc2626',
      plateBg: 'rgba(8, 8, 10, 0.96)', plateText: '#ffffff',
      headerBg: '#09090b', headerText: '#ffffff', frameColor: '#000000', frameAccent: '#dc2626',
      swatch: 'linear-gradient(120deg, #52525b 48%, #dc2626 50%, #09090b 52%)'
    },
    {
      id: 'gg-molten-gear', name: '★ Guilty Gear Molten Forge', cat: 'anime', tier: 'EPIC',
      desc: 'Inspired by GG Xrd Rev 2: ornate iron gear crest spine, torn red vs. blue painterly brush banners, ember sparks, and molten magma VS.',
      split: 'radial-clash', frame: 'tech-bezel', divider: 'iron-crest', divAnim: 'pulse', divW: 72, divTilt: 0,
      emblem: 'molten-vs', embAnim: 'pulse', plate: 'brush-top', plateBottom: 88, header: 'skew-tag',
      pat: 'diagonal', patOp: 18, wmOp: 10, ambient: 'energy-sparks', font: 'Black Ops One', lightBg: false,
      bgLeft: 'radial-gradient(circle at 32% 48%, #471c12 0%, #1b1312 52%, #09080a 100%)',
      bgRight: 'radial-gradient(circle at 68% 48%, #102a4a 0%, #111520 52%, #08090d 100%)',
      p1: '#ef4444', p2: '#2563eb', accent: '#ff7b00', divColor: '#c49a6c',
      plateBg: 'rgba(12, 10, 12, 0.92)', plateText: '#0b0a0c',
      headerBg: '#120e0d', headerText: '#fbbf24', frameColor: '#3f3428', frameAccent: '#ff7b00',
      swatch: 'linear-gradient(115deg, #dc2626 0%, #1c1614 42%, #ff6a00 50%, #111827 58%, #2563eb 100%)'
    },
    {
      id: 'uni-crimson-wedge', name: '★ Under Night Crimson V-Wedge', cat: 'anime', tier: 'EPIC',
      desc: 'Inspired by UNI II: dramatic crimson inverted V-wedge skyline chasm, top black crest notch, ghostly double-outline VS, and angled white slash plates.',
      split: 'v-wedge', frame: 'cinematic-bars', divider: 'none', divAnim: 'static', divW: 0, divTilt: 0,
      emblem: 'ghost-vs', embAnim: 'none', plate: 'diag-slash', plateBottom: 112, header: 'trapezoid',
      pat: 'none', patOp: 0, wmOp: 6, ambient: 'spotlight-sway', font: 'Montserrat', lightBg: false,
      bgLeft: 'linear-gradient(155deg, #2d323e 0%, #141820 62%, #080a0f 100%)',
      bgRight: 'linear-gradient(205deg, #2d323e 0%, #141820 62%, #080a0f 100%)',
      p1: '#dc2626', p2: '#dc2626', accent: '#dc2626', divColor: '#dc2626',
      plateBg: 'rgba(10, 11, 16, 0.78)', plateText: '#ffffff',
      headerBg: '#06070a', headerText: '#ffffff', frameColor: '#06070a', frameAccent: '#dc2626',
      swatch: 'linear-gradient(135deg, #1f2430 34%, #b91c1c 50%, #1f2430 66%)'
    },
    {
      id: 'uni-midnight-hollow', name: '★ Midnight Hollow V-Wedge', cat: 'anime', tier: 'EPIC',
      desc: 'Moonlit sapphire-indigo inverted V-wedge cinema with ethereal silver ghost VS emblem and crisp convergent white slash plates.',
      split: 'v-wedge', frame: 'cinematic-bars', divider: 'none', divAnim: 'static', divW: 0, divTilt: 0,
      emblem: 'ghost-vs', embAnim: 'float', plate: 'diag-slash', plateBottom: 114, header: 'trapezoid',
      pat: 'stars', patOp: 12, wmOp: 8, ambient: 'pulse-glow', font: 'Montserrat', lightBg: false,
      bgLeft: 'linear-gradient(155deg, #1d263b 0%, #0d1221 64%, #060912 100%)',
      bgRight: 'linear-gradient(205deg, #281b3b 0%, #120c22 64%, #060912 100%)',
      p1: '#38bdf8', p2: '#a855f7', accent: '#2563eb', divColor: '#38bdf8',
      plateBg: 'rgba(8, 12, 24, 0.8)', plateText: '#ffffff',
      headerBg: '#060912', headerText: '#7dd3fc', frameColor: '#060912', frameAccent: '#38bdf8',
      swatch: 'linear-gradient(135deg, #0d1221 34%, #2563eb 50%, #120c22 66%)'
    },
    {
      id: 'gg-strive-metal', name: '★ Strive Heavy Brush & Steel', cat: 'anime', tier: 'EPIC',
      desc: 'Blazing scarlet vs. gold-steel top torn brush banners, jagged industrial iron center spine, and scorching molten VS impact.',
      split: 'diag-left', frame: 'hazard-tape', divider: 'iron-crest', divAnim: 'pulse', divW: 64, divTilt: -6,
      emblem: 'molten-vs', embAnim: 'pulse', plate: 'brush-top', plateBottom: 88, header: 'skew-tag',
      pat: 'chevrons', patOp: 16, wmOp: 10, ambient: 'energy-sparks', font: 'Anton', lightBg: false,
      bgLeft: 'radial-gradient(circle at 30% 45%, #5c0c18 0%, #1a090d 55%, #090406 100%)',
      bgRight: 'radial-gradient(circle at 70% 45%, #4a3008 0%, #1a1408 55%, #090704 100%)',
      p1: '#e11d48', p2: '#f59e0b', accent: '#fbbf24', divColor: '#d97706',
      plateBg: 'rgba(14, 10, 10, 0.92)', plateText: '#090708',
      headerBg: '#12080a', headerText: '#fde047', frameColor: '#120a08', frameAccent: '#f59e0b',
      swatch: 'linear-gradient(120deg, #e11d48 0%, #1a090d 45%, #f59e0b 100%)'
    },
    {
      id: 'battle-coliseum-pro', name: '★ Battle Coliseum Studio', cat: 'esports', tier: 'EPIC',
      desc: 'Inspired by Battle Coliseum: clean sage-slate studio canvas, bold ocean-blue tilted VS shield, and ultra-crisp white broadcast plates.',
      split: 'vertical', frame: 'minimal-line', divider: 'hairline', divAnim: 'static', divW: 3, divTilt: 0,
      emblem: 'diamond-shield', embAnim: 'none', plate: 'floating-clean', plateBottom: 136, header: 'floating-pill',
      pat: 'diagonal', patOp: 8, wmOp: 0, ambient: 'none', font: 'Montserrat', lightBg: true,
      bgLeft: 'radial-gradient(circle at 38% 42%, #dce8e9 0%, #c1d5d7 68%, #acc5c8 100%)',
      bgRight: 'radial-gradient(circle at 62% 42%, #dce8e9 0%, #c1d5d7 68%, #acc5c8 100%)',
      p1: '#0284c7', p2: '#0f766e', accent: '#0284c7', divColor: 'rgba(15,28,36,0.22)',
      plateBg: 'rgba(255, 255, 255, 0.96)', plateText: '#0f1c24',
      headerBg: '#0f1c24', headerText: '#ffffff', frameColor: 'rgba(15,28,36,0.24)', frameAccent: '#0284c7',
      swatch: 'linear-gradient(90deg, #c1d5d7 0%, #0284c7 48%, #ffffff 52%, #0f766e 100%)'
    },
    {
      id: 'evo-mainstage-clash', name: '★ EVO Main Stage Royal', cat: 'tekken', tier: 'EPIC',
      desc: 'Electric EVO royal cobalt vs. championship crimson arena, acid-yellow perimeter trim, and scrolling chevron broadcast divider.',
      split: 'vertical', frame: 'double-gold', divider: 'chevron-stream', divAnim: 'scroll-down', divW: 24, divTilt: 0,
      emblem: 'winged', embAnim: 'pulse', plate: 'arcade-box', plateBottom: 162, header: 'full-ribbon',
      pat: 'halftone', patOp: 18, wmOp: 12, ambient: 'spotlight-sway', font: 'Chakra Petch', lightBg: false,
      bgLeft: 'radial-gradient(circle at 38% 42%, #0055ff 0%, #0228a8 56%, #001259 100%)',
      bgRight: 'radial-gradient(circle at 62% 42%, #dc2626 0%, #7f1d1d 56%, #240606 100%)',
      p1: '#38bdf8', p2: '#f87171', accent: '#ffe600', divColor: '#ffe600',
      plateBg: 'rgba(6, 9, 18, 0.96)', plateText: '#ffffff',
      headerBg: '#022ec2', headerText: '#ffe600', frameColor: '#ffe600', frameAccent: '#ffffff',
      swatch: 'linear-gradient(90deg, #022ec2 0%, #ffe600 50%, #dc2626 100%)'
    }
  ];

  global.FGC_VS_CATEGORIES = VS_CATEGORIES;
  global.FGC_VS_DESIGNS = VS_DESIGNS;
  global.FGC_VS_DESIGN_MAP = Object.fromEntries(VS_DESIGNS.map(d => [d.id, d]));
})(typeof window !== 'undefined' ? window : globalThis);
