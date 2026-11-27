/**
 * FGC Open Scorebars — 24 Dedicated Street Fighter 6 Broadcast Scorebar Designs
 * Shared single source of truth between index.html (OBS 1920x1080) and panel.html (Control Panel).
 *
 * Calibrated to exact Street Fighter 6 1920x1080 HUD Safe Zones (ZERO overlap with Round Wins!):
 *   • Left Portrait:  x = 0..202px,    y = 24..102px
 *   • Right Portrait: x = 1718..1920px, y = 24..102px
 *   • [M] / [C] Tags: x = 208..238px & 1682..1712px, y = 24..56px
 *   • Round Wins:     x = 754..832px & 1088..1166px, y = 33..50px (2 slanted diamonds per side!)
 *   • Health Bars:    x = 180..872px & 1048..1740px, y = 62..96px
 *   • Timer ("99"):   x = 912..1008px, y = 52..122px
 *   • Drive Gauge:    x = 564..887px & 1033..1356px, y = 112..132px
 *   • Safe Wing P1:   x = 244..750px,  y = 0..54px  (or y = 0..31px ultra-slim above Round Wins)
 *   • Safe Wing P2:   x = 1170..1676px, y = 0..54px (or y = 0..31px ultra-slim above Round Wins)
 *   • Safe Center:    x = 834..1086px, y = 0..42px  (cleanly between Round Wins & above "99" timer)
 */
(function (global) {
  'use strict';

  const SF6_THEMES = [
    /* =========================================================================
       A. OFFICIAL SF6 BROADCAST & DRIVE SYSTEM (6 DESIGNS)
       ========================================================================= */
    {
      id: 'sf6-native-drive',
      name: '★ SF6 Native Drive HUD',
      cat: 'sf6',
      layout: 'SF6 Drive',
      cfg: { layout: 'sf6-drive', scorePos: 'inner', flagStyle: 'blade-twt', centerStyle: 'trapezoid', outerBlade: 'on', slant: 20, shape: 'blade-slant', font: 'Barlow Condensed', italic: true },
      colors: ['#c90f4b', '#a3e635', '#0a67c9'],
      pv: {
        lay: 'sf6-drive', sh: 'blade', fs: 'blade', cs: 'trap', edge: true,
        bg1: 'linear-gradient(180deg,rgba(26,12,24,0.94),rgba(11,10,18,0.97))',
        bg2: 'linear-gradient(180deg,rgba(10,20,38,0.94),rgba(9,11,20,0.97))',
        p1: '#e11d48', p2: '#0ea5e9',
        sc1: 'linear-gradient(145deg,#ff3b73,#be0b42)',
        sc2: 'linear-gradient(215deg,#22b8ff,#0757ad)',
        sct: '#ffffff', cbg: 'linear-gradient(180deg,#181928,#0b0c14)', cborder: '#a3e635', ct: '#ffffff',
        tx: '#ffffff', sp1: '#c8ff3d', sp2: '#c8ff3d'
      },
      desc: 'Matches Street Fighter 6 HUD 1:1: crimson P1 vs. cobalt P2 angled parallel to the healthbars with lime Drive Impact highlights.'
    },
    {
      id: 'sf6-cpt-official',
      name: '★ Capcom Pro Tour 2026',
      cat: 'sf6',
      layout: 'SF6 CPT',
      cfg: { layout: 'sf6-cpt', scorePos: 'inner', flagStyle: 'blade-twt', centerStyle: 'trapezoid', outerBlade: 'off', slant: 14, shape: 'diagonal', font: 'Chakra Petch', italic: false },
      colors: ['#facc15', '#111827', '#2563eb'],
      pv: {
        lay: 'sf6-cpt', sh: 'diag', fs: 'blade', cs: 'trap', edge: false,
        bg: 'linear-gradient(180deg,#161b28,#0a0d14)',
        p1: '#facc15', p2: '#2563eb',
        sc1: 'linear-gradient(135deg,#fde047,#eab308)',
        sc2: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
        sct: '#090b10', sct2: '#ffffff',
        cbg: 'linear-gradient(180deg,#1e2638,#0d111a)', cborder: '#facc15', ct: '#fde047',
        tx: '#ffffff', sp1: '#facc15', sp2: '#60a5fa'
      },
      desc: 'Official Capcom Pro Tour flush top bar: obsidian plates, signature Capcom gold vs. royal cobalt, zero overlap with [M]/[C] or 99 timer.'
    },
    {
      id: 'sf6-capcom-cup',
      name: '★ Capcom Cup Championship',
      cat: 'sf6',
      layout: 'SF6 CPT',
      cfg: { layout: 'sf6-cpt', scorePos: 'inner', flagStyle: 'fade-blend', centerStyle: 'hex', outerBlade: 'off', slant: 14, shape: 'bevel', font: 'Oswald', italic: false },
      colors: ['#f5c542', '#0b1020', '#eab308'],
      pv: {
        lay: 'sf6-cpt', sh: 'bevel', fs: 'fade', cs: 'hex', edge: false,
        bg: 'linear-gradient(180deg,#12182b,#070a14)',
        p1: '#f5c542', p2: '#f5c542',
        sc1: 'linear-gradient(135deg,#fff0a6,#c7921e)',
        sc2: 'linear-gradient(135deg,#fff0a6,#c7921e)',
        sct: '#120d03',
        cbg: 'linear-gradient(180deg,#1d253d,#0c101d)', cborder: '#f5c542', ct: '#fde68a',
        tx: '#ffffff', sp1: '#f5c542', sp2: '#f5c542'
      },
      desc: 'Capcom Cup Finals prestige: midnight navy steel, beveled championship gold plaques, hexagonal center crest, and fade-blended flags.'
    },
    {
      id: 'sf6-sfl-pro',
      name: '★ Street Fighter League',
      cat: 'sf6',
      layout: 'SF6 SFL',
      cfg: { layout: 'sf6-sfl', scorePos: 'outer', flagStyle: 'bezel', centerStyle: 'flat', outerBlade: 'off', slant: 10, shape: 'flat', font: 'Barlow Condensed', italic: false },
      colors: ['#e11d48', '#ffffff', '#0284c7'],
      pv: {
        lay: 'sf6-sfl', sh: 'flat', fs: 'bezel', cs: 'flat', edge: false, outer: true,
        bg: 'linear-gradient(180deg,#171a24,#0d0f16)',
        p1: '#e11d48', p2: '#0284c7',
        sc1: 'linear-gradient(180deg,#f43f5e,#be123c)',
        sc2: 'linear-gradient(180deg,#0ea5e9,#0369a1)',
        sct: '#ffffff',
        cbg: '#f8fafc', cborder: '#e11d48', ct: '#0f172a',
        tx: '#ffffff', sp1: '#fda4af', sp2: '#7dd3fc'
      },
      desc: 'Street Fighter League ultra-slim 38px TV top strip with crisp outer score blocks and high-contrast white center round plaque.'
    },
    {
      id: 'sf6-drive-impact',
      name: '★ Drive Impact Splatter',
      cat: 'sf6',
      layout: 'SF6 Drive',
      cfg: { layout: 'sf6-drive', scorePos: 'inner', flagStyle: 'blade-twt', centerStyle: 'floating', outerBlade: 'on', slant: 22, shape: 'skew', font: 'Anton', italic: false },
      colors: ['#ff1f8e', '#c8ff00', '#00e5ff'],
      pv: {
        lay: 'sf6-drive', sh: 'skew', fs: 'blade', cs: 'float', edge: true,
        bg1: 'linear-gradient(120deg,#23081c,#110914)',
        bg2: 'linear-gradient(240deg,#061f29,#0a0f18)',
        p1: '#ff1f8e', p2: '#00e5ff',
        sc1: 'linear-gradient(135deg,#ff1f8e,#ff7b00)',
        sc2: 'linear-gradient(135deg,#00e5ff,#2563eb)',
        sct: '#ffffff',
        cbg: 'transparent', cborder: '#c8ff00', ct: '#c8ff00',
        tx: '#ffffff', sp1: '#c8ff00', sp2: '#c8ff00',
        glow1: 'rgba(255,31,142,0.55)', glow2: 'rgba(0,229,255,0.55)'
      },
      desc: 'Explosive SF6 Drive Impact street paint: neon magenta vs. electric cyan with skewed street plates and chartreuse accents.'
    },
    {
      id: 'sf6-burnout-overdrive',
      name: 'SF6 Overdrive & Burnout',
      cat: 'sf6',
      layout: 'SF6 Drive',
      cfg: { layout: 'sf6-drive', scorePos: 'inner', flagStyle: 'bezel', centerStyle: 'trapezoid', outerBlade: 'off', slant: 14, shape: 'bevel', font: 'Orbitron', italic: false },
      colors: ['#84cc16', '#181c22', '#ef4444'],
      pv: {
        lay: 'sf6-drive', sh: 'bevel', fs: 'bezel', cs: 'trap', edge: false,
        bg: 'linear-gradient(180deg,#1a1f26,#0c0f13)',
        p1: '#a3e635', p2: '#ef4444',
        sc1: 'linear-gradient(135deg,#bef264,#65a30d)',
        sc2: 'linear-gradient(135deg,#f87171,#b91c1c)',
        sct: '#0b1004', sct2: '#ffffff',
        cbg: '#13171d', cborder: '#a3e635', ct: '#d9f99d',
        tx: '#ffffff', sp1: '#a3e635', sp2: '#fca5a5'
      },
      desc: 'Inspired by the SF6 Drive Gauge: Overdrive lime-chartreuse (P1) vs. Burnout critical crimson (P2) inside beveled steel housing.'
    },

    /* =========================================================================
       B. SF6 ARENAS, WORLD TOUR & MAJORS (6 DESIGNS)
       ========================================================================= */
    {
      id: 'sf6-metro-city',
      name: 'Metro City Graffiti',
      cat: 'sf6',
      layout: 'SF6 Metro',
      cfg: { layout: 'sf6-metro', scorePos: 'inner', flagStyle: 'blade-twt', centerStyle: 'trapezoid', outerBlade: 'on', slant: 18, shape: 'diagonal', font: 'Russo One', italic: false },
      colors: ['#ec4899', '#f59e0b', '#06b6d4'],
      pv: {
        lay: 'sf6-metro', sh: 'diag', fs: 'blade', cs: 'trap', edge: true,
        bg: 'linear-gradient(160deg,#1b1326,#0c0b12)',
        p1: '#ec4899', p2: '#06b6d4',
        sc1: 'linear-gradient(135deg,#f472b6,#db2777)',
        sc2: 'linear-gradient(135deg,#22d3ee,#0284c7)',
        sct: '#ffffff',
        cbg: '#181022', cborder: '#f59e0b', ct: '#fde047',
        tx: '#ffffff', sp1: '#fbbf24', sp2: '#fbbf24',
        bridge: 'linear-gradient(90deg,#ec4899,#f59e0b,#06b6d4)'
      },
      desc: 'World Tour Metro City energy: vibrant spray-paint pink, urban amber bridge rail, and electric cyan wings.'
    },
    {
      id: 'sf6-battle-hub',
      name: 'Battle Hub Arcade Neon',
      cat: 'sf6',
      layout: 'SF6 Metro',
      cfg: { layout: 'sf6-metro', scorePos: 'inner', flagStyle: 'bezel', centerStyle: 'pill', outerBlade: 'off', slant: 12, shape: 'rounded', font: 'Exo 2', italic: false },
      colors: ['#22d3ee', '#7c3aed', '#fb7185'],
      pv: {
        lay: 'sf6-metro', sh: 'round', fs: 'bezel', cs: 'pill', edge: false,
        bg: 'linear-gradient(180deg,rgba(22,16,46,0.92),rgba(11,8,26,0.95))',
        p1: '#fb7185', p2: '#22d3ee',
        sc1: 'linear-gradient(135deg,#fb7185,#be123c)',
        sc2: 'linear-gradient(135deg,#22d3ee,#0284c7)',
        sct: '#ffffff',
        cbg: 'rgba(26,18,54,0.94)', cborder: '#a855f7', ct: '#e9d5ff',
        tx: '#ffffff', sp1: '#fda4af', sp2: '#67e8f9',
        bridge: 'linear-gradient(90deg,#fb7185,#7c3aed,#22d3ee)'
      },
      desc: 'SF6 Battle Hub neon cabinet aesthetic: glowing violet bridge, rounded smoked-indigo plates, and coral vs. cyan badges.'
    },
    {
      id: 'sf6-evo-sf6',
      name: 'EVO SF6 Main Stage',
      cat: 'sf6',
      layout: 'SF6 CPT',
      cfg: { layout: 'sf6-cpt', scorePos: 'inner', flagStyle: 'fade-blend', centerStyle: 'trapezoid', outerBlade: 'off', slant: 16, shape: 'diagonal', font: 'Barlow Condensed', italic: true },
      colors: ['#00b4ff', '#ffd75e', '#ff2e55'],
      pv: {
        lay: 'sf6-cpt', sh: 'diag', fs: 'fade', cs: 'trap', edge: false,
        bg: 'linear-gradient(180deg,#0f1830,#080d1a)',
        p1: '#ff2e55', p2: '#00b4ff',
        sc1: 'linear-gradient(135deg,#ff3d63,#be123c)',
        sc2: 'linear-gradient(135deg,#00c2ff,#0369a1)',
        sct: '#ffffff',
        cbg: 'linear-gradient(180deg,#162344,#0b1122)', cborder: '#ffd75e', ct: '#ffd75e',
        tx: '#ffffff', sp1: '#ffd75e', sp2: '#ffd75e'
      },
      desc: 'EVO Sunday Top 6 broadcast bar adapted to SF6 safe zones: deep royal navy, crimson vs. sky blue, and smooth fade flags.'
    },
    {
      id: 'sf6-ewc-sf6',
      name: 'EWC SF6 Riyadh',
      cat: 'sf6',
      layout: 'SF6 SFL',
      cfg: { layout: 'sf6-sfl', scorePos: 'inner', flagStyle: 'fade-blend', centerStyle: 'trapezoid', outerBlade: 'off', slant: 12, shape: 'flat', font: 'Rajdhani', italic: false },
      colors: ['#e5c158', '#0d0c09', '#10b981'],
      pv: {
        lay: 'sf6-sfl', sh: 'flat', fs: 'fade', cs: 'trap', edge: false,
        bg: 'linear-gradient(180deg,#161511,#0a0907)',
        p1: '#e5c158', p2: '#10b981',
        sc1: 'linear-gradient(135deg,#f8e294,#b78926)',
        sc2: 'linear-gradient(135deg,#34d399,#059669)',
        sct: '#0a0906',
        cbg: '#1c180f', cborder: '#e5c158', ct: '#f3d273',
        tx: '#ffffff', sp1: '#f3d273', sp2: '#34d399'
      },
      desc: 'Esports World Cup SF6 luxury slim strip: matte obsidian with liquid gold (P1), championship emerald (P2), and fade flags.'
    },
    {
      id: 'sf6-suvalhal-arena',
      name: 'Suval’hal Royal Arena',
      cat: 'sf6',
      layout: 'SF6 Metro',
      cfg: { layout: 'sf6-metro', scorePos: 'inner', flagStyle: 'bezel', centerStyle: 'hex', outerBlade: 'off', slant: 14, shape: 'bevel', font: 'Teko', italic: false },
      colors: ['#f59e0b', '#14b8a6', '#78350f'],
      pv: {
        lay: 'sf6-metro', sh: 'bevel', fs: 'bezel', cs: 'hex', edge: false,
        bg: 'linear-gradient(180deg,#20170f,#0f0b07)',
        p1: '#f59e0b', p2: '#14b8a6',
        sc1: 'linear-gradient(135deg,#fbbf24,#b45309)',
        sc2: 'linear-gradient(135deg,#2dd4bf,#0f766e)',
        sct: '#0e0a04',
        cbg: '#1a120a', cborder: '#fbbf24', ct: '#fde68a',
        tx: '#ffffff', sp1: '#fbbf24', sp2: '#5eead4',
        bridge: 'linear-gradient(90deg,#f59e0b,#78350f,#14b8a6)'
      },
      desc: 'Inspired by SF6’s grand stadium stage: carved sandstone bronze, royal turquoise, and hexagonal gold arena crest.'
    },
    {
      id: 'sf6-genbu-temple',
      name: 'Genbu Temple Twilight',
      cat: 'sf6',
      layout: 'SF6 Drive',
      cfg: { layout: 'sf6-drive', scorePos: 'inner', flagStyle: 'fade-blend', centerStyle: 'hex', outerBlade: 'off', slant: 16, shape: 'hex', font: 'Oswald', italic: false },
      colors: ['#dc2626', '#fef3c7', '#b45309'],
      pv: {
        lay: 'sf6-drive', sh: 'hex', fs: 'fade', cs: 'hex', edge: false,
        bg: 'linear-gradient(180deg,#1c0e0e,#0c0707)',
        p1: '#dc2626', p2: '#d97706',
        sc1: 'linear-gradient(135deg,#ef4444,#991b1b)',
        sc2: 'linear-gradient(135deg,#f59e0b,#92400e)',
        sct: '#ffffff',
        cbg: '#231010', cborder: '#fef3c7', ct: '#fef3c7',
        tx: '#fff7ed', sp1: '#fca5a5', sp2: '#fcd34d'
      },
      desc: 'Sumi-e charcoal lacquer trimmed in temple vermilion and parchment ivory with hexagonal woodblock bevels.'
    },

    /* =========================================================================
       C. ICONIC STREET FIGHTER 6 CHARACTER EDITIONS (8 DESIGNS)
       ========================================================================= */
    {
      id: 'sf6-ryu-hadoken',
      name: 'Ryu Denjin Hadoken',
      cat: 'sf6',
      layout: 'SF6 Drive',
      cfg: { layout: 'sf6-drive', scorePos: 'inner', flagStyle: 'blade-twt', centerStyle: 'trapezoid', outerBlade: 'on', slant: 18, shape: 'blade-slant', font: 'Russo One', italic: false },
      colors: ['#dc2626', '#f8fafc', '#38bdf8'],
      pv: {
        lay: 'sf6-drive', sh: 'blade', fs: 'blade', cs: 'trap', edge: true,
        bg: 'linear-gradient(180deg,#181f2e,#0b0f18)',
        p1: '#dc2626', p2: '#38bdf8',
        sc1: 'linear-gradient(135deg,#ef4444,#991b1b)',
        sc2: 'linear-gradient(135deg,#38bdf8,#0284c7)',
        sct: '#ffffff',
        cbg: '#f8fafc', cborder: '#dc2626', ct: '#0f172a',
        tx: '#ffffff', sp1: '#f87171', sp2: '#7dd3fc'
      },
      desc: 'Ryu’s iconic headband crimson, white gi center plaque, and crackling Denjin azure lightning edge.'
    },
    {
      id: 'sf6-ken-shoryuken',
      name: 'Ken Flame Shoryuken',
      cat: 'sf6',
      layout: 'SF6 Drive',
      cfg: { layout: 'sf6-drive', scorePos: 'inner', flagStyle: 'blade-twt', centerStyle: 'trapezoid', outerBlade: 'on', slant: 22, shape: 'blade-slant', font: 'Barlow Condensed', italic: true },
      colors: ['#ff3b00', '#ffae19', '#b91c1c'],
      pv: {
        lay: 'sf6-drive', sh: 'blade', fs: 'blade', cs: 'trap', edge: true,
        bg: 'linear-gradient(180deg,#1e0d0a,#0c0605)',
        p1: '#ff4500', p2: '#ffae19',
        sc1: 'linear-gradient(135deg,#ff6a00,#cc1100)',
        sc2: 'linear-gradient(135deg,#ffbe26,#d95300)',
        sct: '#ffffff', sct2: '#1a0702',
        cbg: '#240c08', cborder: '#ff6a00', ct: '#ffd166',
        tx: '#ffffff', sp1: '#ffae19', sp2: '#ff7b4a'
      },
      desc: 'Blazing Shoryuken ember plates with aggressive 22px katana slants and molten orange-gold score cores.'
    },
    {
      id: 'sf6-chunli-kikosho',
      name: 'Chun-Li Jade & Azure',
      cat: 'sf6',
      layout: 'SF6 Metro',
      cfg: { layout: 'sf6-metro', scorePos: 'inner', flagStyle: 'fade-blend', centerStyle: 'pill', outerBlade: 'off', slant: 12, shape: 'rounded', font: 'Exo 2', italic: false },
      colors: ['#2563eb', '#facc15', '#22d3ee'],
      pv: {
        lay: 'sf6-metro', sh: 'round', fs: 'fade', cs: 'pill', edge: false,
        bg: 'linear-gradient(180deg,#0f1d3d,#070e20)',
        p1: '#2563eb', p2: '#22d3ee',
        sc1: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
        sc2: 'linear-gradient(135deg,#22d3ee,#0e7490)',
        sct: '#ffffff',
        cbg: '#132652', cborder: '#facc15', ct: '#fde047',
        tx: '#ffffff', sp1: '#fde047', sp2: '#fde047',
        bridge: 'linear-gradient(90deg,#2563eb,#facc15,#22d3ee)'
      },
      desc: 'Imperial silk sapphire trimmed in gold filigree and radiant Kikosho cyan with soft pill geometry.'
    },
    {
      id: 'sf6-luke-popeye',
      name: 'Luke Sand Blast',
      cat: 'sf6',
      layout: 'SF6 CPT',
      cfg: { layout: 'sf6-cpt', scorePos: 'inner', flagStyle: 'blade-twt', centerStyle: 'trapezoid', outerBlade: 'on', slant: 16, shape: 'diagonal', font: 'Russo One', italic: false },
      colors: ['#ff6b1a', '#fde047', '#2563eb'],
      pv: {
        lay: 'sf6-cpt', sh: 'diag', fs: 'blade', cs: 'trap', edge: true,
        bg: 'linear-gradient(180deg,#131e36,#090e1c)',
        p1: '#ff6b1a', p2: '#3b82f6',
        sc1: 'linear-gradient(135deg,#ff7e29,#ea580c)',
        sc2: 'linear-gradient(135deg,#60a5fa,#1d4ed8)',
        sct: '#ffffff',
        cbg: '#19294a', cborder: '#fde047', ct: '#fde047',
        tx: '#ffffff', sp1: '#fde047', sp2: '#93c5fd'
      },
      desc: 'SF6 cover-star styling: tactical navy blue, explosive orange vs. cobalt blocks, and bright yellow star highlights.'
    },
    {
      id: 'sf6-juri-fengshui',
      name: 'Juri Feng Shui Engine',
      cat: 'sf6',
      layout: 'SF6 Drive',
      cfg: { layout: 'sf6-drive', scorePos: 'inner', flagStyle: 'fade-blend', centerStyle: 'floating', outerBlade: 'on', slant: 20, shape: 'skew', font: 'Chakra Petch', italic: true },
      colors: ['#d946ef', '#0e0614', '#ec4899'],
      pv: {
        lay: 'sf6-drive', sh: 'skew', fs: 'fade', cs: 'float', edge: true,
        bg: 'linear-gradient(180deg,#1b0926,#09040e)',
        p1: '#e879f9', p2: '#f43f5e',
        sc1: 'linear-gradient(135deg,#e879f9,#a21caf)',
        sc2: 'linear-gradient(135deg,#fb7185,#be123c)',
        sct: '#ffffff',
        cbg: 'transparent', cborder: '#e879f9', ct: '#f5d0fe',
        tx: '#ffffff', sp1: '#f0abfc', sp2: '#fda4af',
        glow1: 'rgba(217,70,239,0.55)', glow2: 'rgba(244,63,94,0.5)'
      },
      desc: 'Venomous Feng Shui magenta-violet neon over spider-web obsidian with razor-skewed plates and floating center title.'
    },
    {
      id: 'sf6-akuma-satsui',
      name: 'Akuma Satsui no Hado',
      cat: 'sf6',
      layout: 'SF6 Metro',
      cfg: { layout: 'sf6-metro', scorePos: 'inner', flagStyle: 'fade-blend', centerStyle: 'hex', outerBlade: 'off', slant: 16, shape: 'hex', font: 'Black Ops One', italic: false },
      colors: ['#ef4444', '#120508', '#9333ea'],
      pv: {
        lay: 'sf6-metro', sh: 'hex', fs: 'fade', cs: 'hex', edge: false,
        bg: 'linear-gradient(180deg,#1a0710,#090306)',
        p1: '#ef4444', p2: '#9333ea',
        sc1: 'linear-gradient(135deg,#dc2626,#7f1d1d)',
        sc2: 'linear-gradient(135deg,#a855f7,#581c87)',
        sct: '#ffffff',
        cbg: '#1c0612', cborder: '#ef4444', ct: '#fca5a5',
        tx: '#ffffff', sp1: '#f87171', sp2: '#d8b4fe',
        bridge: 'linear-gradient(90deg,#ef4444,#240615,#9333ea)'
      },
      desc: 'Raging Demon darkness: ominous ember-crimson vs. Satsui violet with hexagonal steel shields and glowing arch rail.'
    },
    {
      id: 'sf6-cammy-delta',
      name: 'Cammy Delta Red Tactical',
      cat: 'sf6',
      layout: 'SF6 SFL',
      cfg: { layout: 'sf6-sfl', scorePos: 'inner', flagStyle: 'twt-code', centerStyle: 'trapezoid', outerBlade: 'off', slant: 14, shape: 'bevel', font: 'Chakra Petch', italic: false },
      colors: ['#e11d48', '#111c18', '#22c55e'],
      pv: {
        lay: 'sf6-sfl', sh: 'bevel', fs: 'bezel', cs: 'trap', edge: false,
        bg: 'linear-gradient(180deg,#14221d,#09100e)',
        p1: '#e11d48', p2: '#22c55e',
        sc1: '#e11d48', sc2: '#16a34a',
        sct: '#ffffff',
        cbg: '#121f1a', cborder: '#22c55e', ct: '#86efac',
        tx: '#f8fafc', sp1: '#fb7185', sp2: '#4ade80'
      },
      desc: 'Delta Red British commando HUD: tactical dark olive steel, signal crimson vs. radar emerald, and 3-letter broadcast ISO tags.'
    },
    {
      id: 'sf6-jp-psycho',
      name: 'JP Psycho Power Gold',
      cat: 'sf6',
      layout: 'SF6 CPT',
      cfg: { layout: 'sf6-cpt', scorePos: 'inner', flagStyle: 'fade-blend', centerStyle: 'hex', outerBlade: 'off', slant: 14, shape: 'bevel', font: 'Oswald', italic: false },
      colors: ['#8b5cf6', '#e5c158', '#6d28d9'],
      pv: {
        lay: 'sf6-cpt', sh: 'bevel', fs: 'fade', cs: 'hex', edge: false,
        bg: 'linear-gradient(180deg,#150e24,#080510)',
        p1: '#a78bfa', p2: '#e5c158',
        sc1: 'linear-gradient(135deg,#8b5cf6,#4c1d95)',
        sc2: 'linear-gradient(135deg,#f3d273,#a16207)',
        sct: '#ffffff', sct2: '#0f0a02',
        cbg: '#180f2b', cborder: '#e5c158', ct: '#f3d273',
        tx: '#ffffff', sp1: '#c4b5fd', sp2: '#f3d273'
      },
      desc: 'Aristocratic Nayshall velvet: royal Psycho violet paired with champagne gold filigree and beveled plaques.'
    },

    /* =========================================================================
       D. BROADCAST CLEAN, GLASS, RETRO ARCADE & MINIMAL SF6 (4 DESIGNS)
       ========================================================================= */
    {
      id: 'sf6-white-broadcast',
      name: 'SF6 Clean TV White',
      cat: 'sf6',
      layout: 'SF6 SFL',
      cfg: { layout: 'sf6-sfl', scorePos: 'outer', flagStyle: 'classic', centerStyle: 'flat', outerBlade: 'off', slant: 10, shape: 'flat', font: 'Montserrat', italic: false },
      colors: ['#f8fafc', '#dc2626', '#1d4ed8'],
      pv: {
        lay: 'sf6-sfl', sh: 'flat', fs: 'classic', cs: 'flat', edge: false, outer: true,
        bg: 'linear-gradient(180deg,#ffffff,#e2e8f0)',
        p1: '#dc2626', p2: '#1d4ed8',
        sc1: '#dc2626', sc2: '#1d4ed8',
        sct: '#ffffff',
        cbg: '#0f172a', cborder: '#dc2626', ct: '#ffffff',
        tx: '#0f172a', sp1: '#dc2626', sp2: '#1d4ed8'
      },
      desc: 'Ultra-crisp television studio white bar with outer red/blue score plaques for peak contrast on colorful SF6 stages.'
    },
    {
      id: 'sf6-glass-frost',
      name: 'SF6 Liquid Frost Glass',
      cat: 'sf6',
      layout: 'SF6 Metro',
      cfg: { layout: 'sf6-metro', scorePos: 'inner', flagStyle: 'bezel', centerStyle: 'pill', outerBlade: 'off', slant: 12, shape: 'rounded', font: 'Exo 2', italic: false },
      colors: ['#38bdf8', '#e2e8f0', '#fb7185'],
      pv: {
        lay: 'sf6-metro', sh: 'round', fs: 'bezel', cs: 'pill', edge: false, glass: true,
        bg: 'rgba(13,18,30,0.68)',
        p1: '#fb7185', p2: '#38bdf8',
        sc1: 'rgba(244,63,94,0.78)', sc2: 'rgba(14,165,233,0.78)',
        sct: '#ffffff',
        cbg: 'rgba(13,18,30,0.76)', cborder: 'rgba(255,255,255,0.35)', ct: '#ffffff',
        tx: '#ffffff', sp1: '#fda4af', sp2: '#7dd3fc'
      },
      desc: 'Airy translucent frosted glass with backdrop blur and soft rose vs. sky accents that let the arena shine through.'
    },
    {
      id: 'sf6-third-strike',
      name: 'SF III: 3rd Strike Arcade',
      cat: 'sf6',
      layout: 'SF6 SFL',
      cfg: { layout: 'sf6-sfl', scorePos: 'inner', flagStyle: 'classic', centerStyle: 'flat', outerBlade: 'off', slant: 10, shape: 'flat', font: 'Russo One', italic: false },
      colors: ['#1d4ed8', '#fde047', '#22c55e'],
      pv: {
        lay: 'sf6-sfl', sh: 'flat', fs: 'classic', cs: 'flat', edge: false, fullBorder: true,
        bg: 'linear-gradient(180deg,#1e3a8a,#0b1739)',
        p1: '#fde047', p2: '#22c55e',
        sc1: '#fde047', sc2: '#fde047',
        sct: '#0b1020',
        cbg: 'linear-gradient(180deg,#0f172a,#070b14)', cborder: '#fde047', ct: '#fde047',
        tx: '#ffffff', sp1: '#fde047', sp2: '#86efac'
      },
      desc: 'Classic CPS-3 3rd Strike arcade tribute in royal metallic blue, arcade gold score blocks, and Super Art emerald trim.'
    },
    {
      id: 'sf6-minimal-oled',
      name: 'SF6 Ultra-Minimal Carbon',
      cat: 'sf6',
      layout: 'SF6 SFL',
      cfg: { layout: 'sf6-sfl', scorePos: 'inner', flagStyle: 'fade-blend', centerStyle: 'floating', outerBlade: 'off', slant: 12, shape: 'flat', font: 'Montserrat', italic: false },
      colors: ['#0a0b10', '#f43f5e', '#38bdf8'],
      pv: {
        lay: 'sf6-sfl', sh: 'flat', fs: 'fade', cs: 'float', edge: false,
        bg: 'rgba(8,9,14,0.92)',
        p1: '#f43f5e', p2: '#38bdf8',
        sc1: 'rgba(244,63,94,0.22)', sc2: 'rgba(56,189,248,0.22)',
        sct: '#ffffff',
        cbg: 'transparent', cborder: 'rgba(255,255,255,0.25)', ct: '#e2e8f0',
        tx: '#ffffff', sp1: '#94a3b8', sp2: '#94a3b8'
      },
      desc: 'Zero-clutter OLED matte carbon top strip with razor hairline accents and floating center round text for pure SF6 gameplay focus.'
    }
  ];

  const SF6_THEME_MAP = Object.create(null);
  for (const t of SF6_THEMES) SF6_THEME_MAP[t.id] = t;

  global.FGC_SF6_THEMES = SF6_THEMES;
  global.FGC_SF6_THEME_MAP = SF6_THEME_MAP;
})(typeof window !== 'undefined' ? window : globalThis);
