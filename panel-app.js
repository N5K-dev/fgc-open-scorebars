(() => {
  /* =========================================================================
     CATALOGS: 33 T8/FGC + 24 SF6 DESIGNS, 12+ CUSTOM PC FONTS, 114 FLAGS
     ========================================================================= */
  const THEMES = [
    { id: 't8-native-hud',        name: '★ Tekken 8 Native HUD',     cat: 'blade',   layout: 'Native HUD',   colors: ['#ffae19','#18121a','#ef4444'],
      pv: { lay:'blade', sh:'blade', fs:'blade', cs:'trap',  edge:true,  bg:'linear-gradient(180deg,rgba(22,19,28,0.92),rgba(12,10,16,0.96))', p1:'#ff9d1c', p2:'#ff9d1c', sc1:'linear-gradient(145deg,#fff8c7,#ffbe26 32%,#e84800)', sc2:'linear-gradient(215deg,#fff8c7,#ffbe26 32%,#e84800)', sct:'#160602', cbg:'#161018', ct:'#fff', tx:'#fff', sp1:'#ffc845', sp2:'#ffc845' },
      desc: 'Matches Tekken 8 in-game healthbar aesthetics 1:1: chrome-silver bevels, molten gold-orange energy, smoked glass, and UE5 italic typography.' },
    { id: 't8-pbrd-kazuya-fists', name: '🥊 PBRD Kazuya Fists',       cat: 'blade',   layout: 'Kazuya Orbs',  colors: ['#e51942','#18181f','#e51942'],
      pv: { lay:'blade', sh:'flat',  fs:'classic', cs:'trap', edge:false, bg:'linear-gradient(90deg,rgba(12,12,16,0.2),rgba(18,18,24,0.96))', p1:'#e51942', p2:'#e51942', sc1:'linear-gradient(180deg,#b91c3a,#7a0c24)', sc2:'linear-gradient(180deg,#b91c3a,#7a0c24)', sct:'#fff', cbg:'linear-gradient(180deg,#eb1648,#9a0c2e)', ct:'#fff', tx:'#fff', sp1:'#fda4af', sp2:'#fda4af' },
      desc: 'Pibardos (PBRD) signature Tekken 8 overlay: Kazuya Mishima crimson studded gloves framing all 3 in-game round orbs with smoked fade nameplates.' },
    { id: 't8-twt-2026-official', name: '★ TWT 2026 Official Blade', cat: 'blade',   layout: 'Blade T8',     colors: ['#f41f64','#181822','#f41f64'],
      pv: { lay:'blade', sh:'blade', fs:'blade', cs:'float', edge:true,  bg:'rgba(20,20,30,0.9)',  p1:'#f41f64', p2:'#f41f64', sc1:'linear-gradient(135deg,#f41f64,#a50f46)', sc2:'linear-gradient(135deg,#f41f64,#a50f46)', sct:'#fff', cbg:'transparent', ct:'#fff', tx:'#fff', sp1:'#f43f5e', sp2:'#f43f5e' },
      desc: 'Modern TWT broadcast blade: smoked dark glass, crimson-magenta portrait edge, slanted score trapezoid, and integrated flags.' },
    { id: 't8-twt-finals-pro',    name: '★ TWT 2019 Grand Finals',   cat: 'blade',   layout: 'Crown TWT',    colors: ['#e53927','#161c28','#2474f5'],
      pv: { lay:'crown', sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'linear-gradient(180deg,#1b2230,#0d1118)', p1:'#e53927', p2:'#2474f5', sc1:'#e53927', sc2:'#2474f5', sct:'#fff', cbg:'#111622', ct:'#fff', tx:'#fff', sp1:'#f44336', sp2:'#3b82f6' },
      desc: 'Classic TWT Finals silhouette: full-height slanted flags with sharp red vs. blue broadcast plates.' },
    { id: 't8-blade-cyber-gold',  name: '★ Blade Liquid Gold',       cat: 'blade',   layout: 'Blade T8',     colors: ['#f3c652','#141210','#d49e2d'],
      pv: { lay:'blade', sh:'blade', fs:'fade',  cs:'trap',  edge:true,  bg:'linear-gradient(180deg,#181512,#090806)', p1:'#f3c652', p2:'#f3c652', sc1:'linear-gradient(135deg,#fff0a6,#b7821e)', sc2:'linear-gradient(135deg,#fff0a6,#b7821e)', sct:'#110c04', cbg:'#15120d', ct:'#f6cf65', tx:'#fff', sp1:'#f6cf65', sp2:'#f6cf65' },
      desc: 'Blade geometry in obsidian and liquid gold with smooth fade-blended flags.' },
    { id: 't8-blade-heat-neon',   name: '★ Blade T8 Heat Dual',      cat: 'blade',   layout: 'Blade T8',     colors: ['#ff5e1a','#ffae2b','#7b4dff'],
      pv: { lay:'blade', sh:'blade', fs:'blade', cs:'float', edge:true,  bg:'rgba(14,14,24,0.92)', p1:'#ff5e1a', p2:'#7b4dff', sc1:'linear-gradient(135deg,#ff7b1c,#cc1f00)', sc2:'linear-gradient(135deg,#6340ff,#a333ff)', sct:'#fff', cbg:'transparent', ct:'#ffbe4f', tx:'#fff', sp1:'#ff9d3b', sp2:'#b794ff' },
      desc: 'Flush blade above the healthbars: Heat fire (P1) vs. electric violet (P2) with parallel slanted flags.' },
    { id: 't8-heat-ignited',      name: 'T8 Heat Ignited',           cat: 'tekken',  layout: 'Split-Wing',   colors: ['#ff6b1a','#ffae2b','#7a5cff'],
      pv: { lay:'split', sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'rgba(14,15,24,0.94)', p1:'#ff6b1a', p2:'#7a5cff', sc1:'linear-gradient(135deg,#ff7b1c,#cc2200)', sc2:'linear-gradient(135deg,#5c3cff,#9f38ff)', sct:'#fff', cbg:'#171422', ct:'#fff', tx:'#fff', sp1:'#ffbd4a', sp2:'#ffbd4a' },
      desc: 'Heat fire (P1) vs. electric violet energy (P2) cleanly framed between portraits and round orbs.' },
    { id: 't8-twt-official',      name: 'Tekken World Tour',         cat: 'tekken',  layout: 'Crown 36px',   colors: ['#e61e3c','#e61e3c','#e61e3c'],
      pv: { lay:'crown', sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'#12141c', p1:'#e61e3c', p2:'#e61e3c', sc1:'#f1f5f9', sc2:'#f1f5f9', sct:'#0b0c12', cbg:'#d41634', ct:'#fff', tx:'#fff', sp1:'#ff4764', sp2:'#ff4764' },
      desc: 'Broadcast tournament styling: matte carbon plates, crimson accents, and crisp white score blocks.' },
    { id: 't8-iron-fist-gold',    name: 'King of Iron Fist Gold',    cat: 'tekken',  layout: 'Crown 36px',   colors: ['#e8c25a','#f3d273','#e8c25a'],
      pv: { lay:'crown', sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'#12100f', p1:'#e8c25a', p2:'#e8c25a', sc1:'linear-gradient(135deg,#fff1a8,#c9942a)', sc2:'linear-gradient(135deg,#fff1a8,#c9942a)', sct:'#110d05', cbg:'#151210', ct:'#fff', tx:'#fff', sp1:'#f3c852', sp2:'#f3c852' },
      desc: 'Metallic beveled gold championship tribute with deep charcoal contrast.' },
    { id: 't8-ewc-riyadh',        name: 'Esports World Cup',         cat: 'tekken',  layout: 'Crown 36px',   colors: ['#e5c158','#0b0a07','#10b981'],
      pv: { lay:'crown', sh:'flat',  fs:'fade',  cs:'trap',  edge:false, bg:'#11110f', p1:'#e5c158', p2:'#10b981', sc1:'linear-gradient(135deg,#f8e294,#b78926)', sc2:'linear-gradient(135deg,#34d399,#059669)', sct:'#0a0906', cbg:'#1b170f', ct:'#f3d273', tx:'#fff', sp1:'#f3d273', sp2:'#34d399' },
      desc: 'Luxury obsidian paired with liquid gold (P1) and championship emerald (P2).' },
    { id: 't8-mishima-electric',  name: 'Mishima Electric EWGF',     cat: 'tekken',  layout: 'Split-Wing',   colors: ['#00d4ff','#00e5ff','#388bff'],
      pv: { lay:'split', sh:'hex',   fs:'fade',  cs:'hex',   edge:false, bg:'#071024', p1:'#00d4ff', p2:'#388bff', sc1:'linear-gradient(135deg,#00e1ff,#0066ff)', sc2:'linear-gradient(135deg,#0077ff,#00d4ff)', sct:'#fff', cbg:'#091834', ct:'#67e8f9', tx:'#fff', sp1:'#4fe6ff', sp2:'#4fe6ff' },
      desc: 'Midnight blue steel accented with electric cyan lightning borders and sharp katana cuts.' },
    { id: 't8-devil-gene',        name: 'Devil Gene Crimson',        cat: 'tekken',  layout: 'Split-Wing',   colors: ['#ff1744','#ff1744','#d500f9'],
      pv: { lay:'split', sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'#150409', p1:'#ff1744', p2:'#d500f9', sc1:'#d5002f', sc2:'#a60054', sct:'#fff', cbg:'#21030b', ct:'#ff6b8b', tx:'#fff', sp1:'#ff4f73', sp2:'#e879f9' },
      desc: 'Infernal obsidian and crimson-violet wings with aggressive angles and Match Point aura.' },
    { id: 't8-g-corp-tactical',   name: 'G-Corp Armored Arch',       cat: 'tekken',  layout: 'Stepped Arch', colors: ['#dc2626','#ef4444','#dc2626'],
      pv: { lay:'arch',  sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'#1d2028', p1:'#dc2626', p2:'#dc2626', sc1:'#dc2626', sc2:'#dc2626', sct:'#fff', cbg:'#171a20', ct:'#fff', tx:'#fff', sp1:'#f87171', sp2:'#f87171', bridge:'linear-gradient(90deg,#dc2626,#333945 20%,#333945 80%,#dc2626)' },
      desc: 'Tactical stepped visor joined by an armored top rail bridging above the round orbs.' },
    { id: 't8-evo-grand-finals',  name: 'EVO Grand Finals',          cat: 'tekken',  layout: 'Stepped Arch', colors: ['#00b4ff','#ffd75e','#ff2e55'],
      pv: { lay:'arch',  sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'#111420', p1:'#00b4ff', p2:'#ff2e55', sc1:'#0088ee', sc2:'#e11d48', sct:'#fff', cbg:'#181c2c', ct:'#ffd75e', tx:'#fff', sp1:'#ffd75e', sp2:'#ffd75e', bridge:'linear-gradient(90deg,#00b4ff,#ffd75e,#ff2e55)' },
      desc: 'Major finals prestige: blue vs. crimson crowned with a platinum-gold arch bridge.' },
    { id: 't8-jin-flame',         name: 'Jin Kazama Flame',          cat: 'char',    layout: 'Split-Wing',   colors: ['#ff2e1f','#ffffff','#ff8c1a'],
      pv: { lay:'split', sh:'diag',  fs:'fade',  cs:'trap',  edge:false, bg:'#120d10', p1:'#ff2e1f', p2:'#ff8c1a', sc1:'linear-gradient(135deg,#ff1e1e,#ff8800)', sc2:'linear-gradient(135deg,#ff7b00,#c81414)', sct:'#fff', cbg:'#20080a', ct:'#fff', tx:'#fff', sp1:'#ff6b4a', sp2:'#ff9f43' },
      desc: 'Scarlet flame accents and clean white edges inspired by Jin Kazama.' },
    { id: 't8-kazuya-crimson',    name: 'Kazuya Blood & Void',       cat: 'char',    layout: 'Split-Wing',   colors: ['#be123c','#f43f5e','#7e22ce'],
      pv: { lay:'split', sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'#120816', p1:'#be123c', p2:'#7e22ce', sc1:'#be123c', sc2:'#7e22ce', sct:'#fff', cbg:'#1b0720', ct:'#fb7185', tx:'#fff', sp1:'#fb7185', sp2:'#c084fc' },
      desc: 'Blood crimson and dark void purple inspired by Kazuya Mishima.' },
    { id: 't8-kazama-sanctuary',  name: 'Kazama Sanctuary',          cat: 'char',    layout: 'Split-Wing',   colors: ['#0ea5e9','#ffffff','#6366f1'],
      pv: { lay:'split', sh:'round', fs:'bezel', cs:'pill',  edge:false, bg:'linear-gradient(180deg,#f8fbff,#dbeafe)', p1:'#0ea5e9', p2:'#6366f1', sc1:'#0284c7', sc2:'#4f46e5', sct:'#fff', cbg:'#f0f7ff', ct:'#0f172a', tx:'#0f172a', sp1:'#0284c7', sp2:'#4f46e5' },
      desc: 'Pearl alabaster and celestial blue inspired by Jun Kazama.' },
    { id: 't8-reina-thunder',     name: 'Reina Purple Voltage',      cat: 'char',    layout: 'Split-Wing',   colors: ['#c026d3','#e879f9','#a855f7'],
      pv: { lay:'split', sh:'skew',  fs:'fade',  cs:'trap',  edge:false, bg:'#14091e', p1:'#c026d3', p2:'#a855f7', sc1:'#c026d3', sc2:'#9333ea', sct:'#fff', cbg:'#210a33', ct:'#f0abfc', tx:'#fff', sp1:'#f0abfc', sp2:'#d8b4fe' },
      desc: 'Aggressive skewed carbon wings charged with violet lightning.' },
    { id: 't8-king-lucha',        name: 'King Jaguar Gold',          cat: 'char',    layout: 'Crown 36px',   colors: ['#facc15','#b91c1c','#16a34a'],
      pv: { lay:'crown', sh:'flat',  fs:'blade', cs:'flat',  edge:false, bg:'#17120a', p1:'#facc15', p2:'#16a34a', sc1:'#facc15', sc2:'#22c55e', sct:'#111', cbg:'#a61616', ct:'#fde047', tx:'#fff', sp1:'#fde047', sp2:'#4ade80' },
      desc: 'Championship belt styling in gold, emerald, and lucha crimson.' },
    { id: 't8-victor-paris',      name: 'Victor Cyber Noir',         cat: 'char',    layout: 'Stepped Arch', colors: ['#22d3ee','#94a3b8','#f43f5e'],
      pv: { lay:'arch',  sh:'flat',  fs:'fade',  cs:'trap',  edge:false, bg:'#141820', p1:'#22d3ee', p2:'#f43f5e', sc1:'#06b6d4', sc2:'#f43f5e', sct:'#fff', cbg:'#11151e', ct:'#67e8f9', tx:'#fff', sp1:'#67e8f9', sp2:'#fb7185', bridge:'linear-gradient(90deg,#22d3ee,#94a3b8,#f43f5e)' },
      desc: 'Sleek Parisian carbon accented with cyan and crimson laser katana highlights.' },
    { id: 't8-yakushima-jade',    name: 'Yakushima Ancient Jade',    cat: 'char',    layout: 'Split-Wing',   colors: ['#10b981','#d4af37','#14b8a6'],
      pv: { lay:'split', sh:'hex',   fs:'bezel', cs:'trap',  edge:false, bg:'#071b17', p1:'#10b981', p2:'#14b8a6', sc1:'#059669', sc2:'#0d9488', sct:'#fff', cbg:'#09201b', ct:'#eab308', tx:'#fff', sp1:'#eab308', sp2:'#eab308' },
      desc: 'Deep forest jade plates lined with weathered bronze trim.' },
    { id: 't8-urban-square-neon', name: 'Urban Square Cyberpunk',    cat: 'char',    layout: 'Crown 36px',   colors: ['#ff007f','#ffe600','#00f5d4'],
      pv: { lay:'crown', sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'#120722', p1:'#ff007f', p2:'#00f5d4', sc1:'#ff007f', sc2:'#00f5d4', sct:'#080412', cbg:'#190a2e', ct:'#ffe600', tx:'#fff', sp1:'#ffe600', sp2:'#ffe600' },
      desc: 'Neon magenta and cyan cyberpunk glow over deep midnight purple.' },
    { id: 't8-arena-cage',        name: 'Arena Underground Cage',    cat: 'char',    layout: 'Stepped Arch', colors: ['#f59e0b','#fbbf24','#f97316'],
      pv: { lay:'arch',  sh:'flat',  fs:'bezel', cs:'trap',  edge:false, bg:'#222226', p1:'#f59e0b', p2:'#f97316', sc1:'#f59e0b', sc2:'#f97316', sct:'#111', cbg:'#1a1a1e', ct:'#fbbf24', tx:'#fff', sp1:'#fbbf24', sp2:'#fbbf24', bridge:'linear-gradient(90deg,#f59e0b,#52525b,#f97316)' },
      desc: 'Industrial titanium mesh finish paired with tactical amber accents.' },
    { id: 't8-zaibatsu-obsidian', name: 'Zaibatsu Luxury Carbon',    cat: 'char',    layout: 'Crown 36px',   colors: ['#d6b67c','#18181d','#d6b67c'],
      pv: { lay:'crown', sh:'flat',  fs:'fade',  cs:'flat',  edge:false, bg:'#0f0f13', p1:'#d6b67c', p2:'#d6b67c', sc1:'rgba(214,182,124,0.22)', sc2:'rgba(214,182,124,0.22)', sct:'#f6e1b8', cbg:'#15151a', ct:'#e5ca94', tx:'#fff', sp1:'#e5ca94', sp2:'#e5ca94' },
      desc: 'Minimalist matte carbon black accented with champagne filigree.' },
    { id: 't8-prism-holo',        name: 'Prism Holo Animated',       cat: 'char',    layout: 'Split-Wing',   colors: ['#ff0080','#40e0d0','#7928ca'],
      pv: { lay:'split', sh:'round', fs:'bezel', cs:'pill',  edge:false, prism:true, bg:'#0b0d18', p1:'#ec4899', p2:'#06b6d4', sc1:'linear-gradient(135deg,#ff0080,#7928ca)', sc2:'linear-gradient(135deg,#00dfd8,#007cf0)', sct:'#fff', cbg:'#101222', ct:'#fff', tx:'#fff', sp1:'#67e8f9', sp2:'#f472b6' },
      desc: 'Continuously looping holographic rainbow border over smoked dark glass.' },
    { id: 't8-sakura-dojo',       name: 'Sakura Dojo Kyoto',         cat: 'char',    layout: 'Split-Wing',   colors: ['#f472b6','#f9a8d4','#818cf8'],
      pv: { lay:'split', sh:'round', fs:'fade',  cs:'pill',  edge:false, bg:'#150f1a', p1:'#f472b6', p2:'#818cf8', sc1:'#db2777', sc2:'#4f46e5', sct:'#fff', cbg:'#1b1222', ct:'#f9a8d4', tx:'#fff', sp1:'#f9a8d4', sp2:'#a5b4fc' },
      desc: 'Sumi-e dark ink canvas with soft sakura pink and indigo silk gradients.' },
    { id: 'fgc-hex-arcane',       name: 'Hex Forge (2XKO)',          cat: 'fgc',     layout: 'Crown Outer',  colors: ['#d6b164','#3b82f6','#d6b164'],
      pv: { lay:'crown', sh:'flat',  fs:'bezel', cs:'hex',   edge:false, outer:true, bg:'linear-gradient(180deg,#272c3a,#141722)', p1:'#d6b164', p2:'#d6b164', sc1:'#141722', sc2:'#141722', sct:'#fff', cbg:'linear-gradient(180deg,#3b82f6,#1d4ed8)', ct:'#fff', tx:'#fff', sp1:'#e7c97f', sp2:'#e7c97f' },
      desc: 'Metallic slate plates with gold chevron trim and a central blue hex emblem.' },
    { id: 'fgc-strive-bolt',      name: 'Heavy Rock (GGST)',         cat: 'fgc',     layout: 'Split-Wing',   colors: ['#f5b31a','#f5b31a','#f5b31a'],
      pv: { lay:'split', sh:'strive',fs:'bezel', cs:'trap',  edge:false, bg:'#140404', p1:'#f5b31a', p2:'#f5b31a', sc1:'#f5b31a', sc2:'#f5b31a', sct:'#140404', cbg:'#f5b31a', ct:'#140404', tx:'#fff', sp1:'#f5b31a', sp2:'#f5b31a', fullBorder:true },
      desc: 'High-impact crimson-black metal framing bold yellow arcade score blocks.' },
    { id: 'fgc-metro-clash',      name: 'Metro Clash (SF6)',         cat: 'fgc',     layout: 'Split-Wing',   colors: ['#e11d48','#9333ea','#2563eb'],
      pv: { lay:'split', sh:'hex',   fs:'blade', cs:'trap',  edge:false, bg1:'linear-gradient(90deg,#6e0a23,#b9163e)', bg2:'linear-gradient(270deg,#103080,#2563eb)', p1:'#fb7185', p2:'#60a5fa', sc1:'#881337', sc2:'#1e3a8a', sct:'#fff', cbg:'#7e22ce', ct:'#fff', tx:'#fff', sp1:'#fde047', sp2:'#fde047' },
      desc: 'Vibrant street red vs. electric blue hexagonal shields with purple center accent.' },
    { id: 'fgc-clean-major',      name: 'Clean Major (EVO)',         cat: 'fgc',     layout: 'Crown Outer',  colors: ['#b91c2e','#ffffff','#b91c2e'],
      pv: { lay:'crown', sh:'flat',  fs:'classic',cs:'flat', edge:false, outer:true, bg:'#f8fafc', p1:'#b91c2e', p2:'#b91c2e', sc1:'#b91c2e', sc2:'#b91c2e', sct:'#fff', cbg:'#b91c2e', ct:'#fff', tx:'#0f172a', sp1:'#b91c2e', sp2:'#b91c2e' },
      desc: 'Ultra-clean white and crimson television broadcast layout for maximum legibility.' },
    { id: 'fgc-hyper-flame',      name: 'Hyper Flame (MvC)',         cat: 'fgc',     layout: 'Crown 36px',   colors: ['#ff5500','#ffffff','#ff5500'],
      pv: { lay:'crown', sh:'diag',  fs:'blade', cs:'trap',  edge:false, bg:'#0f0d0d', p1:'#ff5500', p2:'#ff5500', sc1:'#f8fafc', sc2:'#f8fafc', sct:'#09090b', cbg:'#141111', ct:'#ff6a00', tx:'#fff', sp1:'#ff6a00', sp2:'#ff6a00' },
      desc: 'Black angled wings with fiery orange trim and crisp white score wedges.' },
    { id: 't8-glass-minimal',     name: 'Liquid Frosted Glass',      cat: 'minimal', layout: 'Split-Wing',   colors: ['#38bdf8','#e2e8f0','#fb7185'],
      pv: { lay:'split', sh:'round', fs:'bezel', cs:'pill',  edge:false, bg:'rgba(14,18,28,0.72)', p1:'#38bdf8', p2:'#fb7185', sc1:'rgba(56,189,248,0.3)', sc2:'rgba(251,113,133,0.3)', sct:'#fff', cbg:'rgba(14,18,28,0.8)', ct:'#fff', tx:'#fff', sp1:'#94a3b8', sp2:'#94a3b8' },
      desc: 'Modern translucent frosted glass with subtle backdrop blur and slim color accents.' },
    { id: 't8-arcade-1997',       name: 'Tekken 3 Arcade 1997',      cat: 'minimal', layout: 'Crown 36px',   colors: ['#1d4ed8','#fde047','#b91c1c'],
      pv: { lay:'crown', sh:'flat',  fs:'classic',cs:'flat', edge:false, bg:'linear-gradient(180deg,#1d4ed8,#0f172a)', p1:'#fbbf24', p2:'#fbbf24', sc1:'#fde047', sc2:'#fde047', sct:'#111', cbg:'#991b1b', ct:'#fde047', tx:'#fff', sp1:'#fde047', sp2:'#fde047', fullBorder:true },
      desc: 'Retro 1997 Namco arcade homage in metallic royal blue and gold bevels.' },
    ...(window.FGC_SF6_THEMES || []),
    ...(window.FGC_GAME_THEMES || [])
  ];

  const FONT_OPTIONS = [
    ['theme', '— Active Theme Font —'],
    ['Barlow Condensed', 'Barlow Condensed (Broadcast Pro)'],
    ['Chakra Petch', 'Chakra Petch (Cyber Tekken)'],
    ['Orbitron', 'Orbitron (Futuristic Sci-Fi)'],
    ['Teko', 'Teko (Aggressive Fighting)'],
    ['Rajdhani', 'Rajdhani (Tactical HUD)'],
    ['Russo One', 'Russo One (Heavy Block)'],
    ['Oswald', 'Oswald (TV Esports)'],
    ['Bebas Neue', 'Bebas Neue (Tall Bold)'],
    ['Anton', 'Anton (Heavy Street)'],
    ['Exo 2', 'Exo 2 (Modern Dynamic)'],
    ['Black Ops One', 'Black Ops One (Military Stencil)'],
    ['Montserrat', 'Montserrat (Clean Minimal)']
  ];

  const PALETTES_BY_MODE = {
    gradient: {
      label: '🌈 Quick Gradient Palettes (1-click)',
      items: [
        { name: 'TWT Red / Blue', bg1: '#1a202e', bg2: '#090c12', ang: 180, a: 94, p1a: '#f0442c', p1b: '#991b1b', p2a: '#2d7ff9', p2b: '#1e3a8a', c1: '#161c28', c2: '#090c12', cacc: '#ffffff', text: '#ffffff', sp: '#f87171' },
        { name: 'Heat Fire / Violet', bg1: '#1b1428', bg2: '#080610', ang: 135, a: 95, p1a: '#ff7b00', p1b: '#d90429', p2a: '#7c3aed', p2b: '#2563eb', c1: '#231932', c2: '#0c0814', cacc: '#ffae2b', text: '#ffffff', sp: '#ffbe4f' },
        { name: 'Gold / Obsidian', bg1: '#211b10', bg2: '#080705', ang: 180, a: 96, p1a: '#fde047', p1b: '#b45309', p2a: '#f59e0b', p2b: '#92400e', c1: '#211c12', c2: '#0b0906', cacc: '#facc15', text: '#ffffff', sp: '#fde047' },
        { name: 'Cyber Pink / Cyan', bg1: '#1d0a33', bg2: '#060312', ang: 135, a: 94, p1a: '#ff007f', p1b: '#9333ea', p2a: '#00f5d4', p2b: '#0284c7', c1: '#230e3d', c2: '#0b0418', cacc: '#ffe600', text: '#ffffff', sp: '#ffe600' },
        { name: 'Emerald / Gold', bg1: '#0b261f', bg2: '#040e0b', ang: 180, a: 95, p1a: '#10b981', p1b: '#047857', p2a: '#eab308', p2b: '#a16207', c1: '#0f2b24', c2: '#05120f', cacc: '#facc15', text: '#ffffff', sp: '#34d399' },
        { name: 'Ice / Crimson', bg1: '#0f1b30', bg2: '#050912', ang: 135, a: 94, p1a: '#38bdf8', p1b: '#0369a1', p2a: '#f43f5e', p2b: '#9f1239', c1: '#162033', c2: '#080d17', cacc: '#38bdf8', text: '#ffffff', sp: '#7dd3fc' },
        { name: 'EVO Sunset', bg1: '#24101c', bg2: '#0a0714', ang: 90, a: 94, p1a: '#fb923c', p1b: '#e11d48', p2a: '#c084fc', p2b: '#4f46e5', c1: '#231226', c2: '#0b0816', cacc: '#fbbf24', text: '#ffffff', sp: '#fdba74' },
        { name: 'Mishima Storm', bg1: '#0a1836', bg2: '#040712', ang: 180, a: 95, p1a: '#00e5ff', p1b: '#0055ff', p2a: '#60a5fa', p2b: '#1d4ed8', c1: '#0c2044', c2: '#040a18', cacc: '#38bdf8', text: '#ffffff', sp: '#67e8f9' }
      ]
    },
    solid: {
      label: '⬛ Quick Matte Solid Palettes (1-click)',
      items: [
        { name: 'TWT Matte Carbon', bg1: '#12151e', a: 96, p1a: '#e11d48', p2a: '#2563eb', c1: '#1a1f2c', cacc: '#e11d48', text: '#ffffff', sp: '#fb7185' },
        { name: 'Pure Broadcast White', bg1: '#f1f5f9', a: 98, p1a: '#dc2626', p2a: '#1d4ed8', c1: '#b91c1c', cacc: '#ffffff', text: '#0f172a', sp: '#dc2626' },
        { name: 'Obsidian & Gold', bg1: '#0c0b0a', a: 98, p1a: '#eab308', p2a: '#eab308', c1: '#17140e', cacc: '#facc15', text: '#ffffff', sp: '#facc15' },
        { name: 'EVO Navy Blue', bg1: '#0d192b', a: 97, p1a: '#0ea5e9', p2a: '#f43f5e', c1: '#132540', cacc: '#38bdf8', text: '#ffffff', sp: '#7dd3fc' },
        { name: 'Crimson Pro', bg1: '#1c0a10', a: 96, p1a: '#ff1f5a', p2a: '#ff6b1a', c1: '#2a0d16', cacc: '#ff3b6b', text: '#ffffff', sp: '#fda4af' },
        { name: 'Emerald Graphite', bg1: '#111816', a: 97, p1a: '#10b981', p2a: '#f59e0b', c1: '#162420', cacc: '#34d399', text: '#ffffff', sp: '#6ee7b7' },
        { name: 'Reina Purple', bg1: '#140e21', a: 97, p1a: '#a855f7', p2a: '#ec4899', c1: '#201336', cacc: '#c084fc', text: '#ffffff', sp: '#d8b4fe' },
        { name: 'Pure OLED Black', bg1: '#050507', a: 100, p1a: '#ffffff', p2a: '#ffffff', c1: '#0b0c10', cacc: '#ffffff', text: '#ffffff', sp: '#94a3b8' }
      ]
    },
    glass: {
      label: '🧊 Quick Frosted Glass / Blur Palettes (1-click)',
      items: [
        { name: 'Dark Ice Glass', bg1: '#0f172a', a: 62, blur: 16, border: 26, p1a: '#38bdf8', p1b: '#2563eb', p2a: '#fb7185', p2b: '#e11d48', c1: '#0f172a', cacc: '#38bdf8', text: '#ffffff', sp: '#bae6fd' },
        { name: 'White Frost TV', bg1: '#ffffff', a: 72, blur: 18, border: 45, p1a: '#dc2626', p1b: '#991b1b', p2a: '#2563eb', p2b: '#1e3a8a', c1: '#e2e8f0', cacc: '#dc2626', text: '#0f172a', sp: '#dc2626' },
        { name: 'Smoked Crimson', bg1: '#1f0812', a: 64, blur: 14, border: 24, p1a: '#f43f5e', p1b: '#be123c', p2a: '#fb923c', p2b: '#c2410c', c1: '#280b18', cacc: '#fb7185', text: '#ffffff', sp: '#fda4af' },
        { name: 'Midnight Sapphire', bg1: '#0a1630', a: 60, blur: 18, border: 28, p1a: '#00d4ff', p1b: '#0284c7', p2a: '#818cf8', p2b: '#4338ca', c1: '#0d1e42', cacc: '#38bdf8', text: '#ffffff', sp: '#7dd3fc' },
        { name: 'Frosted Amber', bg1: '#1c1508', a: 64, blur: 14, border: 24, p1a: '#facc15', p1b: '#ca8a04', p2a: '#fb923c', p2b: '#ea580c', c1: '#241b0a', cacc: '#fde047', text: '#ffffff', sp: '#fde047' },
        { name: 'Neon Amethyst', bg1: '#180a29', a: 58, blur: 20, border: 30, p1a: '#e879f9', p1b: '#a21caf', p2a: '#22d3ee', p2b: '#0891b2', c1: '#210d38', cacc: '#e879f9', text: '#ffffff', sp: '#f0abfc' },
        { name: 'Translucent Jade', bg1: '#061f1a', a: 62, blur: 16, border: 26, p1a: '#34d399', p1b: '#059669', p2a: '#fbbf24', p2b: '#b45309', c1: '#092922', cacc: '#34d399', text: '#ffffff', sp: '#6ee7b7' },
        { name: 'Carbon Smoke', bg1: '#111318', a: 54, blur: 14, border: 22, p1a: '#ff5e1a', p1b: '#dc2626', p2a: '#7c3aed', p2b: '#4f46e5', c1: '#151821', cacc: '#ffffff', text: '#ffffff', sp: '#e2e8f0' }
      ]
    },
    metallic: {
      label: '⚙️ Quick Anodized Metallic Palettes (1-click)',
      items: [
        { name: 'Brushed Titanium', bg1: '#1b202b', bg2: '#394356', ang: 165, a: 96, p1a: '#f43f5e', p1b: '#9f1239', p2a: '#38bdf8', p2b: '#0369a1', c1: '#232938', c2: '#424e63', cacc: '#e2e8f0', text: '#ffffff', sp: '#cbd5e1' },
        { name: 'Tekken Liquid Gold', bg1: '#1c170d', bg2: '#47391c', ang: 165, a: 97, p1a: '#fde047', p1b: '#a16207', p2a: '#fde047', p2b: '#a16207', c1: '#241d10', c2: '#544320', cacc: '#fde047', text: '#ffffff', sp: '#fde047' },
        { name: 'Mishima Blue Steel', bg1: '#0d1a33', bg2: '#234073', ang: 150, a: 96, p1a: '#38bdf8', p1b: '#0284c7', p2a: '#60a5fa', p2b: '#1d4ed8', c1: '#112242', c2: '#2c4f8c', cacc: '#7dd3fc', text: '#ffffff', sp: '#7dd3fc' },
        { name: 'Ancient Bronze', bg1: '#1f1510', bg2: '#4d3326', ang: 165, a: 97, p1a: '#fb923c', p1b: '#9a3412', p2a: '#fbbf24', p2b: '#92400e', c1: '#291c15', c2: '#593c2d', cacc: '#fdba74', text: '#ffffff', sp: '#fdba74' },
        { name: 'Anodized Crimson', bg1: '#240b14', bg2: '#591a30', ang: 165, a: 96, p1a: '#fb7185', p1b: '#be123c', p2a: '#f43f5e', p2b: '#881337', c1: '#2e0e19', c2: '#6b1f39', cacc: '#fda4af', text: '#ffffff', sp: '#fda4af' },
        { name: 'Platinum Chrome', bg1: '#cbd5e1', bg2: '#f8fafc', ang: 165, a: 98, p1a: '#dc2626', p1b: '#7f1d1d', p2a: '#2563eb', p2b: '#1e3a8a', c1: '#94a3b8', c2: '#e2e8f0', cacc: '#0f172a', text: '#0f172a', sp: '#b91c1c' }
      ]
    },
    theme: {
      label: '🎨 Quick Accent Palettes Over Active Theme (1-click)',
      items: [
        { name: 'Fire / Violet', p1a: '#ff6b1a', p1b: '#d90429', p2a: '#7c3aed', p2b: '#2563eb', cacc: '#ffae2b', text: '#ffffff', sp: '#ffbe4f' },
        { name: 'TWT Red / Blue', p1a: '#ef4444', p1b: '#b91c1c', p2a: '#3b82f6', p2b: '#1d4ed8', cacc: '#ffffff', text: '#ffffff', sp: '#f87171' },
        { name: 'Gold / Emerald', p1a: '#facc15', p1b: '#b45309', p2a: '#10b981', p2b: '#047857', cacc: '#facc15', text: '#ffffff', sp: '#fde047' },
        { name: 'Neon Cyan / Pink', p1a: '#00f5d4', p1b: '#0284c7', p2a: '#ff007f', p2b: '#9333ea', cacc: '#00f5d4', text: '#ffffff', sp: '#67e8f9' },
        { name: 'White / Crimson', p1a: '#ffffff', p1b: '#cbd5e1', p2a: '#f41f64', p2b: '#991b1b', cacc: '#f41f64', text: '#ffffff', sp: '#fda4af' },
        { name: 'Strive Yellow', p1a: '#facc15', p1b: '#ca8a04', p2a: '#facc15', p2b: '#ca8a04', cacc: '#facc15', text: '#ffffff', sp: '#fde047' },
        { name: 'Ice / Crimson', p1a: '#38bdf8', p1b: '#0369a1', p2a: '#e11d48', p2b: '#881337', cacc: '#7dd3fc', text: '#ffffff', sp: '#7dd3fc' },
        { name: 'Pure Platinum', p1a: '#e2e8f0', p1b: '#94a3b8', p2a: '#e2e8f0', p2b: '#94a3b8', cacc: '#ffffff', text: '#ffffff', sp: '#cbd5e1' }
      ]
    }
  };

  const DEFAULT_STYLE = {
    fontName: 'theme', fontScore: 'theme', fontScale: 100, letterSpacing: 4, italic: 'theme', scoreSlant: 'mirror', uppercase: true,
    layoutOverride: 'theme', scorePosOverride: 'theme', shape: 'theme', flagStyle: 'theme', borderStyle: 'theme',
    centerStyle: 'theme', outerBlade: 'theme', bladeSlant: 22, barHeight: 0, flagWidth: 62, flagOpacity: 100,
    flagFadeMode: 'fade-out', flagFadeCurve: 'smooth', flagFadeIn: 0, flagFadeStart: 34, flagFadeEnd: 98,
    flagFadeAngle: 0, flagFit: 'fit', flagZoom: 100, flagShiftX: 0, flagShiftY: 0, flagSaturation: 100, flagBrightness: 96,
    showIsoCode: 'theme',
    customColors: false, fillMode: 'gradient', bgColor1: '#121520', bgColor2: '#07080d', bgAngle: 180, bgAlpha: 94, glassBlur: 14, glassBorder: 22,
    p1Color1: '#ff512f', p1Color2: '#dd2476', p2Color1: '#2563eb', p2Color2: '#7c3aed',
    centerColor1: '#1b1f2e', centerColor2: '#0c0e16', centerAccent: '#ffd24d', textColor: '#ffffff', sponsorColor: '#ffbe4f',
    glow: 'subtle', sheen: 'off', animBorder: 'off', texture: 'none', textShadow: 'broadcast',
    entryAnim: 'split-wings', scoreAnim: 'pop', animSpeed: 'normal', animDuration: 450, scoreAnimDuration: 450,
    sceneAutoIntro: true, sceneDelay: 250, introStagger: true, introFlash: true, introOnSetChange: false,
    mpStyle: 'side-peek', mpColor: 'fire', mpText: 'MATCH POINT',
    smashFlagPos: 'below', smashLogoMode: 'auto', smashInfoPos: 'left'
  };

  const FLAG_FADE_PRESETS = {
    'smooth-melt': { name: 'Smooth TV Melt',     flagFadeMode: 'fade-out', flagFadeCurve: 'smooth', flagFadeIn: 0,  flagFadeStart: 34, flagFadeEnd: 98,  flagFadeAngle: 0,  flagWidth: 66,  flagOpacity: 96, flagZoom: 108, flagShiftX: 0, flagSaturation: 100, flagBrightness: 96 },
    'dual-fade':   { name: 'Fade In + Fade Out', flagFadeMode: 'both',     flagFadeCurve: 'smooth', flagFadeIn: 20, flagFadeStart: 52, flagFadeEnd: 98,  flagFadeAngle: 0,  flagWidth: 82,  flagOpacity: 96, flagZoom: 112, flagShiftX: 0, flagSaturation: 100, flagBrightness: 96 },
    'diag-blade':  { name: 'Diagonal Blade Melt',flagFadeMode: 'diagonal', flagFadeCurve: 'smooth', flagFadeIn: 6,  flagFadeStart: 38, flagFadeEnd: 96,  flagFadeAngle: 22, flagWidth: 74,  flagOpacity: 96, flagZoom: 110, flagShiftX: 0, flagSaturation: 105, flagBrightness: 98 },
    'watermark':   { name: 'Ghost Watermark',    flagFadeMode: 'both',     flagFadeCurve: 'soft',   flagFadeIn: 24, flagFadeStart: 42, flagFadeEnd: 100, flagFadeAngle: 12, flagWidth: 112, flagOpacity: 58, flagZoom: 124, flagShiftX: 0, flagSaturation: 70,  flagBrightness: 88 },
    'vignette':    { name: 'Vignette Spotlight', flagFadeMode: 'vignette', flagFadeCurve: 'smooth', flagFadeIn: 16, flagFadeStart: 48, flagFadeEnd: 96,  flagFadeAngle: 0,  flagWidth: 80,  flagOpacity: 94, flagZoom: 112, flagShiftX: 0, flagSaturation: 105, flagBrightness: 96 }
  };

  const THEME_SLANTS = {
    't8-native-hud': 26, 't8-twt-2026-official': 26, 't8-twt-finals-pro': 14, 't8-blade-cyber-gold': 26,
    't8-blade-heat-neon': 24, 't8-heat-ignited': 14, 't8-twt-official': 14, 't8-iron-fist-gold': 16,
    't8-ewc-riyadh': 14, 't8-mishima-electric': 16, 't8-devil-gene': 18, 't8-g-corp-tactical': 14,
    't8-evo-grand-finals': 16, 't8-jin-flame': 18, 't8-kazuya-crimson': 14, 't8-kazama-sanctuary': 12,
    't8-reina-thunder': 16, 't8-king-lucha': 12, 't8-victor-paris': 14, 't8-yakushima-jade': 12,
    't8-urban-square-neon': 12, 't8-arena-cage': 14, 't8-zaibatsu-obsidian': 12, 't8-prism-holo': 12,
    't8-sakura-dojo': 14, 'fgc-hex-arcane': 12, 'fgc-strive-bolt': 12, 'fgc-metro-clash': 16,
    'fgc-clean-major': 10, 'fgc-hyper-flame': 16, 't8-glass-minimal': 12, 't8-arcade-1997': 10
  };
  for (const sf6 of (window.FGC_SF6_THEMES || [])) {
    THEME_SLANTS[sf6.id] = sf6.cfg?.slant ?? 14;
  }
  for (const gt of (window.FGC_GAME_THEMES || [])) {
    THEME_SLANTS[gt.id] = gt.cfg?.slant ?? 16;
  }
  const GAME_PROFILES = window.FGC_GAME_PROFILES || {};
  const resolveGameProfile = window.FGC_RESOLVE_GAME_PROFILE || (() => ({ id: 'tekken8', assetGameId: 'tekken8', name: 'Tekken 8', previewBg: 't8' }));

  const DEFAULT_VS = {
    visible: true,
    viewMode: '1v1',
    matchupBoardPreset: 'opening',
    matchupCustomSlots: ['wsf1', 'wsf2', 'lr1_1', 'lr1_2'],
    matchupShowScore: true,
    matchupShowSeeds: true,
    matchupShowHandles: true,
    matchupGlobalY: 0,
    matchupGlobalX: 0,
    matchupGlobalScale: 100,
    matchupArtPos: {},
    matchupCardBg: '',
    matchupCardBorder: '',
    matchupWinColor: '',
    matchupLosColor: '',
    matchupVsBadgeBg: '',
    matchupCardRadius: -1,
    matchupShellOpacity: 72,
    source: 'current',
    design: 'arcade-pop',
    game: 'tekken8',
    pack: 'full',
    avatarMode: 'hero-fallback',
    bgMode: 'theme',
    bgColor1: '#f5b800',
    bgColor2: '#10131e',
    p1Color: '#ff512f',
    p2Color: '#2563eb',
    accentColor: '',
    pattern: 'theme',
    patternSpeed: 40,
    patternDir: 'diag-dr',
    patternOpacity: -1,
    patternScale: 100,
    splitOverride: 'theme',
    frameStyle: 'theme',
    frameColor: '',
    frameAccent: '',
    frameThickness: 0,
    frameInset: -1,
    frameOpacity: 100,
    frameGlow: 'theme',
    bandTop: false,
    bandBottom: false,
    bandLeft: false,
    bandRight: false,
    bandStyle: 'solid-trim',
    bandColor: '',
    bandAccent: '',
    bandDualSideColor: true,
    bandThickness: 28,
    bandOpacity: 95,
    bandGlow: 'subtle',
    bandAnim: 'none',
    headerStyle: 'theme',
    headerScale: 100,
    headerOffsetY: 0,
    headerOffsetX: 0,
    headerAlign: 'center',
    headerWidth: 0,
    headerOpacity: 100,
    headerSurface: 'theme',
    headerBgColor: '',
    headerBgColor2: '',
    headerTextColor: '',
    headerEyebrowColor: '',
    headerBorderColor: '',
    headerBorderWidth: -1,
    headerRadius: -1,
    headerFontSize: 100,
    headerFormatBg: '',
    headerFormatText: '',
    headerGlow: 'none',
    headerOrder: 'eyebrow-top',
    headerFormatPos: 'right',
    showEyebrow: true,
    dividerStyle: 'theme',
    dividerAnim: 'theme',
    dividerSpeed: 45,
    dividerWidth: 0,
    dividerTilt: null,
    dividerColor: '',
    dividerColor2: '',
    dividerGlow: 'theme',
    dividerOpacity: 100,
    dividerOffsetX: 0,
    emblemStyle: 'theme',
    emblemText: 'VS',
    emblemScale: 100,
    emblemOffsetX: 0,
    emblemOffsetY: 0,
    emblemRotate: 0,
    emblemAnim: 'theme',
    emblemBgColor: '',
    emblemTextColor: '',
    emblemStrokeColor: '',
    emblemGlow: 'theme',
    plateStyle: 'theme',
    plateBottom: -1,
    plateEdgeX: -1,
    plateWidth: 790,
    plateMinHeight: 0,
    plateScale: 100,
    plateOpacity: 96,
    plateSkew: null,
    plateSurface: 'theme',
    plateBgColor: '',
    plateBgColor2: '',
    plateTextColor: '',
    plateSponsorColor: '',
    plateBorderColor: '',
    plateBorderWidth: -1,
    plateRadius: -1,
    plateGlow: 'none',
    plateShadow: 65,
    plateScoreBg: '',
    plateScoreText: '',
    plateAlign: 'auto',
    plateScorePos: 'inner',
    plateAvatarPos: 'outer',
    plateInfoOrder: 'meta-name-char',
    plateMetaOrder: 'flags-sponsor-bracket',
    plateFlagPos: 'meta',
    plateFlagBg: 'off',
    plateFlagBgSource: 'country',
    plateFlagBgOpacity: 45,
    plateFlagBgFadeStart: 20,
    plateFlagBgFadeEnd: 92,
    plateFlagBgAngle: 0,
    plateFlagBgZoom: 115,
    plateFlagBgBlur: 0,
    plateFlagBgBlend: 'normal',
    plateFlagBgAnim: 'none',
    fontDisplay: 'theme',
    nameScale: 100,
    sponsorScale: 100,
    charNameScale: 100,
    scoreScale: 100,
    flagMode: 'both',
    flagSize: 100,
    flagWatermarkOpacity: -1,
    eyebrow: 'UP NEXT',
    subtitle: '',
    showFlags: true,
    showH2H: true,
    showSponsor: true,
    showBracket: true,
    showSeed: true,
    showCharName: true,
    showLogo: true,
    autoEventLogo: true,
    showScore: false,
    logoUrl: '',
    logoSource: '',
    logoTournamentSlug: '',
    logoScale: 100,
    logoPos: 'bottom-left',
    h2hOffsetY: 84,
    p1Flip: false,
    p2Flip: true,
    p1Zoom: 100,
    p2Zoom: 100,
    p1OffsetX: 0,
    p2OffsetX: 0,
    p1OffsetY: 0,
    p2OffsetY: 0,
    charShadow: 60,
    charIdleAnim: 'none',
    entryAnim: 'slam-split',
    entrySpeed: 100,
    ambientAnim: 'theme',
    introNonce: 0,
    customMatch: {
      round: 'GRAND FINALS',
      format: 'FT3',
      p1: { name: 'PLAYER 1', sponsor: '', flag: '', region: '', bracket: '', character: '', avatar: '', score: 0 },
      p2: { name: 'PLAYER 2', sponsor: '', flag: '', region: '', bracket: '', character: '', avatar: '', score: 0 }
    },
    nextMatch: null
  };

  const VS_DESIGNS = window.FGC_VS_DESIGNS || [];
  let vsDesignCat = 'all';
  let vsDesignSearch = '';
  let vsInteractiveEdit = true;
  let vsDragEnabled = true;
  let vsSelectedEl = '';

  const DEFAULT_RESULTS = {
    visible: true,
    viewMode: 'normal',
    aspect: '16:9',
    showTop12: false,
    qualifyBadge: '',
    design: 'res-evo-gold',
    layoutOverride: 'theme',
    cardStyle: 'theme',
    cardBorderStyle: 'solid',
    cardBorderWidth: 0,
    cardCutSize: 0,
    cardBorderColor: '',
    cardBorderFx: 'none',
    game: 'tekken8',
    pack: 'full',
    title: 'TOP 8 RESULTS',
    subtitle: 'TOURNAMENT FINALS',
    entrantsCount: '',
    footerText: '',
    logoUrl: '',
    showLogo: true,
    showCrown: true,
    showFlags: true,
    flagMode: 'both',
    avatarMode: 'badge',
    showSponsor: true,
    showCharName: true,
    showHandles: true,
    showSeed: true,
    showEntrants: true,
    bgMode: 'theme',
    bgColor1: '#1d356b',
    bgColor2: '#060912',
    accentColor: '',
    goldColor: '',
    fontDisplay: 'theme',
    pattern: 'theme',
    patternSpeed: 38,
    patternDir: 'diag-dr',
    patternOpacity: -1,
    patternScale: 100,
    entryAnim: 'theme',
    entrySpeed: 100,
    staggerMs: 85,
    ambientAnim: 'theme',
    cardIdleAnim: 'theme',
    charZoom: 100,
    charOffsetX: 0,
    charOffsetY: 0,
    charFlip: false,
    infoAlign: 'theme',
    infoVPos: 'theme',
    infoOffsetX: 0,
    infoOffsetY: 0,
    nameScale: 100,
    metaScale: 100,
    infoScrim: 'theme',
    rankPos: 'theme',
    rankOffsetX: 0,
    rankOffsetY: 0,
    rankScale: 100,
    artFit: 'theme',
    artFocusY: -1,
    artStripWidth: 0,
    artEdgeFade: 'theme',
    headerScale: 100,
    cardGap: -1,
    introNonce: 0,
    autoSyncTournament: true,
    linkedProvider: '',
    linkedTournament: '',
    tournamentStatus: '',
    lastSyncAt: 0,
    placements: [
      { place: 1, name: 'PLAYER 1', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 2, name: 'PLAYER 2', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 3, name: 'PLAYER 3', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 4, name: 'PLAYER 4', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 5, name: 'PLAYER 5', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 5, name: 'PLAYER 6', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 7, name: 'PLAYER 7', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 7, name: 'PLAYER 8', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 9, name: 'PLAYER 9', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 9, name: 'PLAYER 10', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 9, name: 'PLAYER 11', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
      { place: 9, name: 'PLAYER 12', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' }
    ]
  };
  const DEFAULT_TOP8 = {
    bracketTheme: 'bracket-cpt-pro',
    matchupTheme: 'matchup-editorial-light',
    activeMatchSlot: 'wf',
    boardPreset: 'opening',
    showGfReset: 'auto',
    showSeeds: true,
    showFlags: true,
    showSponsor: true,
    bracketShowIso: true,
    showBracketTicker: true,
    bracketTickerText: '',
    sourceSlots: {},
    manualOverrides: {},
    lastBracketSyncAt: 0
  };
  const DEFAULT_BRACKETS = {
    visible: true,
    mode: 'top8-de',
    design: 'bk-cpt-combo-breaker',
    title: '',
    subtitle: '',
    badgeText: '',
    logoUrl: '',
    showLogo: true,
    showFlags: true,
    showIso: true,
    showSeeds: true,
    showSponsors: true,
    showGfReset: 'auto',
    showTicker: true,
    tickerText: '',
    fontDisplay: 'theme',
    fontBody: 'theme',
    fontScale: 100,
    bgMode: 'theme',
    bgColor1: '#0a2878',
    bgColor2: '#040814',
    headerStyle: 'theme',
    cellStyle: 'theme',
    connectorStyle: 'theme',
    connectorThickness: 2.5,
    cellRadius: -1,
    pattern: 'theme',
    patternDir: 'diag-dr',
    patternSpeed: 36,
    patternOpacity: -1,
    patternScale: 100,
    entryAnim: 'columns',
    introNonce: 0,
    customColors: {
      enabled: false,
      frameColor: '#e9ff1a',
      accentColor: '#00d2ff',
      accentColor2: '#e9ff1a',
      textColor: '#ffffff',
      headBg: '#091638',
      headText: '#ffffff',
      cellBg: '#f8fafc',
      cellText: '#0a0e1a',
      isoBg: '#e9ff1a',
      isoText: '#0a0e1a',
      scoreBg: '#0a0e1a',
      scoreText: '#ffffff',
      winAccent: '#22c55e',
      wireColor: '#93c5fd'
    },
    poolsPerPage: 4,
    poolsPage: 0,
    pools: [],
    poolTreeTitle: 'POOL A1 — ROAD TO TOP 8',
    poolTreeSlots: {},
    top16Rows: []
  };
  let t8EditingSlotId = 'wf';
  const RESULTS_DESIGNS = window.FGC_RESULTS_DESIGNS || [];
  let resDesignCat = 'all';
  let resDesignSearch = '';
  let resRoster = { game: 'tekken8', pack: 'full', characters: [] };
  let resRosterLoadingKey = '';
  const failedResRosterKeys = new Set();
  let resAvatarUploadIdx = 0;
  let resSelectedIdx = -1;

  const FLAG_CATALOG = window.FGC_FLAG_CATALOG || [];
  const FLAGS_MAP = window.FGC_FLAGS || {};

  const T8_CHARS = [
    '', 'Alisa', 'Anna', 'Armor King', 'Asuka', 'Azucena', 'Bryan Fury', 'Claudio', 'Clive',
    'Devil Jin', 'Dragunov', 'Eddy', 'Fahkumram', 'Feng', 'Heihachi', 'Hwoarang', 'Jack-8',
    'Jin Kazama', 'Jun Kazama', 'Kazuya Mishima', 'King', 'Kuma', 'Lars', 'Lee Chaolan',
    'Leo', 'Leroy', 'Lidia', 'Lili', 'Marshall Law', 'Nina Williams', 'Panda', 'Paul Phoenix',
    'Raven', 'Reina', 'Shaheen', 'Steve', 'Victor', 'Xiaoyu', 'Yoshimitsu', 'Zafina'
  ];

  /* =========================================================================
     STATE & SYNC ENGINE (HTTP/SSE + BroadcastChannel Fallback)
     ========================================================================= */
  const STORAGE_KEY = 'fgc_open_scorebar_state_v1';
  const CLIENT_ID = `pnl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  let localSeq = 0;
  const isHttp = location.protocol === 'http:' || location.protocol === 'https:';
  let bc = null;
  try { bc = new BroadcastChannel('fgc_open_scorebar'); } catch {}

  const DEFAULT_EVENT_BAR = {
    style: 'auto', position: 'bottom-center', title: '', subtitle: '', showSubtitle: true, tickerText: '',
    showLogo: true, logoPos: 'top-badge', logoScale: 100, logoUrl: '', syncLogo: true,
    scale: 100, offsetX: 0, offsetY: 0, opacity: 100, width: 0,
    customColors: false, bgColor1: '#10141f', bgColor2: '#07090f', accentColor: '#ffd24d', textColor: '#ffffff', subColor: '#cbd5e1',
    borderWidth: 2, anim: 'slide-up'
  };
  const DEFAULT_COMMENTATORS = {
    c1Name: 'CASTER 1', c1Handle: '@caster1', c1Role: '',
    c2Name: 'CASTER 2', c2Handle: '@caster2', c2Role: '',
    c3Name: '', c3Handle: '', c3Role: '',
    style: 'auto', layout: 'single-bar', position: 'bottom-center', antiOverlap: 'auto-stack',
    iconStyle: 'mic', sepStyle: 'line', showLogo: false,
    scale: 100, offsetX: 0, offsetY: 0, opacity: 100, width: 0,
    customColors: false, bgColor1: '#10141f', bgColor2: '#07090f', accentColor: '#ffd24d', textColor: '#ffffff', handleColor: '#ffd24d',
    anim: 'slide-up'
  };

  const DEFAULT_TWEAKS = {
    offsetY: 0, scale: 100, wingSpread: 0, opacity: 100,
    customColors: false, p1Color: '#ff6a1a', p2Color: '#7b5cff', centerColor: '#ffd24d'
  };

  const EB_VISUAL_KEYS = [
    'style', 'position', 'logoPos', 'logoScale', 'scale', 'offsetX', 'offsetY', 'opacity', 'width',
    'customColors', 'bgColor1', 'bgColor2', 'accentColor', 'textColor', 'subColor', 'borderWidth', 'anim'
  ];
  const CM_VISUAL_KEYS = [
    'style', 'layout', 'position', 'antiOverlap', 'iconStyle', 'sepStyle',
    'scale', 'offsetX', 'offsetY', 'opacity', 'width',
    'customColors', 'bgColor1', 'bgColor2', 'accentColor', 'textColor', 'handleColor', 'anim'
  ];
  function pickVisualSlice(src, keys, fallback) {
    const out = {};
    for (const k of keys) {
      out[k] = (src && src[k] !== undefined) ? src[k] : fallback[k];
    }
    return out;
  }

  const DEFAULT_LAYOUT_POS = {
    p1WingX: 0, p1WingY: 0,
    p2WingX: 0, p2WingY: 0,
    centerX: 0, centerY: 0,
    p1MpX: 0, p1MpY: 0,
    p2MpX: 0, p2MpY: 0,
    p1MetaX: 0, p1MetaY: 0,
    p2MetaX: 0, p2MetaY: 0,
    smInfoX: 0, smInfoY: 0,
    smP1X: 0, smP1Y: 0,
    smP2X: 0, smP2Y: 0,
    smLogoX: 0, smLogoY: 0,
    smP1SubX: 0, smP1SubY: 0,
    smP2SubX: 0, smP2SubY: 0,
    centerW: 0,
    smInfoW: 0,
    smLogoSize: 0,
    mpScale: 100,
    metaW: 0,
    smSubScale: 100
  };

  function hasCustomLayoutPos(lp) {
    if (!lp) return false;
    return Object.keys(DEFAULT_LAYOUT_POS).some(k => Math.abs(Number(lp[k] ?? DEFAULT_LAYOUT_POS[k]) - DEFAULT_LAYOUT_POS[k]) >= 1);
  }

  function buildBuiltInThemeResetPatch(t) {
    const pv = t?.pv || {};
    const pickHex = (v, fb) => {
      const m = String(v || '').match(/#[0-9a-fA-F]{6}/);
      if (m) return m[0];
      const m3 = String(v || '').match(/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/);
      return m3 ? `#${m3[1]}${m3[1]}${m3[2]}${m3[2]}${m3[3]}${m3[3]}` : fb;
    };
    return {
      theme: t ? t.id : state.theme,
      tweaks: { ...DEFAULT_TWEAKS },
      layoutPos: { ...DEFAULT_LAYOUT_POS },
      eventBar: pickVisualSlice(DEFAULT_EVENT_BAR, EB_VISUAL_KEYS, DEFAULT_EVENT_BAR),
      commentators: pickVisualSlice(DEFAULT_COMMENTATORS, CM_VISUAL_KEYS, DEFAULT_COMMENTATORS),
      style: {
        ...DEFAULT_STYLE,
        customColors: false,
        bladeSlant: THEME_SLANTS[t?.id] ?? t?.cfg?.slant ?? 16,
        bgColor1: pickHex(pv.bg1 || pv.bg, '#121520'),
        bgColor2: pickHex(pv.bg2 || pv.bg, '#07080d'),
        p1Color1: pickHex(pv.p1, '#ff512f'),
        p1Color2: pickHex(pv.sc1, pickHex(pv.p1, '#dd2476')),
        p2Color1: pickHex(pv.p2, '#2563eb'),
        p2Color2: pickHex(pv.sc2, pickHex(pv.p2, '#7c3aed')),
        centerColor1: pickHex(pv.cbg, '#1b1f2e'),
        centerColor2: pickHex(pv.cbg, '#0c0e16'),
        centerAccent: pickHex(pv.p1, '#ffd24d'),
        textColor: pickHex(pv.tx, '#ffffff'),
        sponsorColor: pickHex(pv.sp1, '#ffbe4f')
      }
    };
  }
  let sbInteractiveEdit = true;
  let sbDragEnabled = true;
  let sbMirrorDrag = true;
  let sbSelectedEl = '';

  let state = {
    visible: true,
    theme: 't8-native-hud',
    round: 'ROUND 1',
    format: 'FT3',
    showFormat: true,
    showFlags: true,
    flagMode: 'both',
    showCharacters: false,
    showMatchPoint: true,
    showCommentators: false,
    showSeed: false,
    showPronouns: true,
    showStockIcon: true,
    showVariant: true,
    showStage: false,
    showMetaStrip: false,
    showBottomBar: false,
    seedMode: 'initial',
    stageName: '',
    tournament: '',
    p1: { name: 'PLAYER 1', sponsor: '', score: 0, flag: '', region: '', bracket: '', character: '', secondaryChar: '', avatar: '', seed: '', pronouns: '', handle: '', variant: '', partnerName: '', partnerSponsor: '', partnerChar: '', partnerPronouns: '', partnerFlag: '', partnerRegion: '' },
    p2: { name: 'PLAYER 2', sponsor: '', score: 0, flag: '', region: '', bracket: '', character: '', secondaryChar: '', avatar: '', seed: '', pronouns: '', handle: '', variant: '', partnerName: '', partnerSponsor: '', partnerChar: '', partnerPronouns: '', partnerFlag: '', partnerRegion: '' },
    commentators: { ...DEFAULT_COMMENTATORS },
    eventBar: { ...DEFAULT_EVENT_BAR },
    tweaks: { offsetY: 0, scale: 100, wingSpread: 0, opacity: 100, customColors: false, p1Color: '#ff6a1a', p2Color: '#7b5cff', centerColor: '#ffd24d' },
    layoutPos: { ...DEFAULT_LAYOUT_POS },
    style: { ...DEFAULT_STYLE },
    vs: structuredClone(DEFAULT_VS),
    results: structuredClone(DEFAULT_RESULTS),
    top8: structuredClone(DEFAULT_TOP8),
    brackets: structuredClone(DEFAULT_BRACKETS)
  };
  let gamesCatalog = { featured: [], all: [], loadedAll: false };
  let activeRoster = { game: 'tekken8', gameName: 'Tekken 8', pack: 'full', characters: [], cachedCount: 0, total: 0 };
  let rosterLoadingKey = '';
  const failedRosterKeys = new Set();
  let rosterSearch = '';
  let lastRosterSig = '';
  let rosterRefreshTimer = null;
  let dlPollTimer = null;
  let playersDb = [];
  let presetsDb = [];
  let historyDb = [];
  let trnState = {
    provider: 'startgg',
    activeLiveProvider: null,
    snapshots: { startgg: null, challonge: null, demo: null },
    config: null,
    snapshot: null,
    requestSeq: 0,
    filter: 'stream',
    search: '',
    autoSyncTimer: null
  };
  let previewBg = 't8';
  let previewGuides = false;
  let currentGameFilter = 'all';
  let currentCat = 'all';
  let themeSearch = '';
  let previewPinned = localStorage.getItem('fgc_preview_pinned') !== '0';
  let vsPreviewPinned = localStorage.getItem('fgc_vs_preview_pinned') !== '0';
  let resPreviewPinned = localStorage.getItem('fgc_res_preview_pinned') !== '0';
  let bkPreviewPinned = localStorage.getItem('fgc_bk_preview_pinned') !== '0';
  let sidebarCollapsed = localStorage.getItem('fgc_sidebar_collapsed') === '1';
  let activeWorkspace = localStorage.getItem('fgc_active_workspace') || 'scorebars';
  if (!['scorebars', 'vs', 'brackets', 'results', 'tournaments'].includes(activeWorkspace)) activeWorkspace = 'scorebars';
  let pickerState = { open: false, side: 'p1', slot: 'flag', scope: 'countries', cont: 'all', country: 'ES', query: '', showAll: false };

  const $ = (id) => document.getElementById(id);
  const previewFrame = $('preview-frame');
  const vsPreviewFrame = $('vs-preview-frame');
  const bracketsPreviewFrame = $('brackets-preview-frame');
  const resultsPreviewFrame = $('results-preview-frame');

  const tr = (msg) => (window.FGC_I18N ? window.FGC_I18N.t(msg) : msg);

  function toast(msg) {
    const t = $('toast');
    t.textContent = tr(msg);
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2100);
  }

  function updateSbResetPosBtn() {
    const btn = $('btn-sb-reset-pos');
    if (!btn) return;
    const hasLp = hasCustomLayoutPos(state.layoutPos);
    const hasWingW = Math.abs(Number(state.tweaks?.wingSpread || 0)) >= 1;
    const hasEb = Math.abs(Number(state.eventBar?.offsetX || 0)) >= 1 || Math.abs(Number(state.eventBar?.offsetY || 0)) >= 1 || Number(state.eventBar?.width || 0) >= 160;
    const hasCm = Math.abs(Number(state.commentators?.offsetX || 0)) >= 1 || Math.abs(Number(state.commentators?.offsetY || 0)) >= 1 || Number(state.commentators?.width || 0) >= 180;
    btn.classList.toggle('has-offsets', hasLp || hasWingW || hasEb || hasCm);
  }

  function pushPreviewConfig() {
    const fontsPayload = window.FGC_CUSTOM_FONTS?.getFonts() || [];
    if (previewFrame.contentWindow) {
      previewFrame.contentWindow.postMessage({ type: 'preview-config', bg: previewBg, guides: previewGuides }, '*');
      previewFrame.contentWindow.postMessage({ type: 'fonts-update', fonts: fontsPayload }, '*');
      previewFrame.contentWindow.postMessage({ type: 'state-update', state }, '*');
      previewFrame.contentWindow.postMessage({ type: 'sb-interactive-config', interactive: sbInteractiveEdit, drag: sbDragEnabled, mirror: sbMirrorDrag }, '*');
      if (sbSelectedEl) previewFrame.contentWindow.postMessage({ type: 'sb-highlight-element', element: sbSelectedEl }, '*');
    }
    updateSbResetPosBtn();
    if (vsPreviewFrame?.contentWindow) {
      vsPreviewFrame.contentWindow.postMessage({ type: 'fonts-update', fonts: fontsPayload }, '*');
      vsPreviewFrame.contentWindow.postMessage({ type: 'state-update', state }, '*');
      vsPreviewFrame.contentWindow.postMessage({ type: 'history-update', history: historyDb }, '*');
      vsPreviewFrame.contentWindow.postMessage({ type: 'vs-interactive-config', interactive: vsInteractiveEdit, drag: vsDragEnabled }, '*');
      if (vsSelectedEl) vsPreviewFrame.contentWindow.postMessage({ type: 'vs-highlight-element', element: vsSelectedEl }, '*');
    }
    if (bracketsPreviewFrame?.contentWindow) {
      bracketsPreviewFrame.contentWindow.postMessage({ type: 'fonts-update', fonts: fontsPayload }, '*');
      bracketsPreviewFrame.contentWindow.postMessage({ type: 'state-update', state }, '*');
    }
    if (resultsPreviewFrame?.contentWindow) {
      resultsPreviewFrame.contentWindow.postMessage({ type: 'fonts-update', fonts: fontsPayload }, '*');
      resultsPreviewFrame.contentWindow.postMessage({ type: 'state-update', state }, '*');
    }
  }
  previewFrame.addEventListener('load', pushPreviewConfig);
  vsPreviewFrame?.addEventListener('load', pushPreviewConfig);
  bracketsPreviewFrame?.addEventListener('load', pushPreviewConfig);
  resultsPreviewFrame?.addEventListener('load', pushPreviewConfig);

  let pushTimer = null;
  function commitState(patch, immediate = false) {
    let nextVs = { ...DEFAULT_VS, ...(state.vs || {}) };
    if (patch.vs) {
      let nextMatchVal = nextVs.nextMatch;
      if (patch.vs.nextMatch === null) {
        nextMatchVal = null;
      } else if (patch.vs.nextMatch) {
        const incoming = patch.vs.nextMatch;
        if (incoming.setId !== undefined || (incoming.p1 && incoming.p2)) {
          nextMatchVal = incoming;
        } else if (nextVs.nextMatch) {
          nextMatchVal = {
            ...nextVs.nextMatch,
            ...incoming,
            p1: incoming.p1 ? { ...(nextVs.nextMatch.p1 || {}), ...incoming.p1 } : nextVs.nextMatch.p1,
            p2: incoming.p2 ? { ...(nextVs.nextMatch.p2 || {}), ...incoming.p2 } : nextVs.nextMatch.p2
          };
        } else {
          nextMatchVal = incoming;
        }
      }
      let nextMuArtPos = (nextVs.matchupArtPos && typeof nextVs.matchupArtPos === 'object') ? { ...nextVs.matchupArtPos } : {};
      if (patch.vs.matchupArtPos === null) {
        nextMuArtPos = {};
      } else if (patch.vs.matchupArtPos && typeof patch.vs.matchupArtPos === 'object') {
        if (patch.vs.matchupArtPos.__replace) {
          const clean = { ...patch.vs.matchupArtPos };
          delete clean.__replace;
          nextMuArtPos = clean;
        } else {
          for (const [k, v] of Object.entries(patch.vs.matchupArtPos)) {
            if (v === null) delete nextMuArtPos[k];
            else if (v && typeof v === 'object') nextMuArtPos[k] = { ...(nextMuArtPos[k] || {}), ...v };
          }
        }
      }
      const nextViewMode = patch.vs.viewMode !== undefined
        ? (patch.vs.viewMode === 'matchup-2x2' ? 'matchup-2x2' : '1v1')
        : (nextVs.viewMode === 'matchup-2x2' ? 'matchup-2x2' : '1v1');
      nextVs = {
        ...nextVs,
        ...patch.vs,
        viewMode: nextViewMode,
        matchupArtPos: nextMuArtPos,
        nextMatch: nextMatchVal,
        customMatch: patch.vs.customMatch
          ? {
              ...(nextVs.customMatch || DEFAULT_VS.customMatch),
              ...patch.vs.customMatch,
              p1: patch.vs.customMatch.p1 ? { ...(nextVs.customMatch?.p1 || DEFAULT_VS.customMatch.p1), ...patch.vs.customMatch.p1 } : (nextVs.customMatch?.p1 || DEFAULT_VS.customMatch.p1),
              p2: patch.vs.customMatch.p2 ? { ...(nextVs.customMatch?.p2 || DEFAULT_VS.customMatch.p2), ...patch.vs.customMatch.p2 } : (nextVs.customMatch?.p2 || DEFAULT_VS.customMatch.p2)
            }
          : nextVs.customMatch
      };
    }
    const baseRes = { ...DEFAULT_RESULTS, ...(state.results || {}) };
    const nextRes = patch.results
      ? {
          ...baseRes,
          ...patch.results,
          placements: Array.isArray(patch.results.placements)
            ? patch.results.placements
            : (Array.isArray(baseRes.placements) && baseRes.placements.length ? baseRes.placements : structuredClone(DEFAULT_RESULTS.placements))
        }
      : {
          ...baseRes,
          placements: Array.isArray(baseRes.placements) && baseRes.placements.length ? baseRes.placements : structuredClone(DEFAULT_RESULTS.placements)
        };
    const baseTop8 = { ...DEFAULT_TOP8, ...(state.top8 || {}) };
    const nextTop8 = patch.top8
      ? {
          ...baseTop8,
          ...patch.top8,
          sourceSlots: patch.top8.sourceSlots !== undefined ? patch.top8.sourceSlots : (baseTop8.sourceSlots || {}),
          manualOverrides: patch.top8.manualOverrides !== undefined ? patch.top8.manualOverrides : (baseTop8.manualOverrides || {}),
          boardSlots: Array.isArray(patch.top8.boardSlots) ? patch.top8.boardSlots : (Array.isArray(baseTop8.boardSlots) ? baseTop8.boardSlots : DEFAULT_TOP8.boardSlots)
        }
      : {
          ...baseTop8,
          sourceSlots: baseTop8.sourceSlots || {},
          manualOverrides: baseTop8.manualOverrides || {},
          boardSlots: Array.isArray(baseTop8.boardSlots) ? baseTop8.boardSlots : DEFAULT_TOP8.boardSlots
        };
    const isSilentAudio = patch._silentAudio === true;
    const cleanPatch = { ...patch };
    delete cleanPatch._silentAudio;
    let nextAudio = state.audio ? structuredClone(state.audio) : undefined;
    if (cleanPatch.audio && typeof cleanPatch.audio === 'object') {
      const pa = cleanPatch.audio;
      if (pa.__replace === true) {
        const copy = structuredClone(pa);
        delete copy.__replace;
        nextAudio = copy;
      } else {
        const baseA = nextAudio || { enabled: true, muted: false, masterVolume: 80, muteInPreview: true, routingMode: 'per-overlay', cooldownMs: 120, events: {}, perPlayer: { p1: {}, p2: {}, byName: {} }, perPreset: {} };
        const mergedA = { ...baseA, ...pa };
        mergedA.events = { ...(baseA.events || {}) };
        if (pa.events && typeof pa.events === 'object') {
          for (const [ek, ev] of Object.entries(pa.events)) {
            mergedA.events[ek] = { ...(mergedA.events[ek] || {}), ...(ev || {}) };
          }
        }
        mergedA.perPlayer = {
          p1: { ...(baseA.perPlayer?.p1 || {}), ...(pa.perPlayer?.p1 || {}) },
          p2: { ...(baseA.perPlayer?.p2 || {}), ...(pa.perPlayer?.p2 || {}) },
          byName: { ...(baseA.perPlayer?.byName || {}) }
        };
        if (pa.perPlayer?.byName && typeof pa.perPlayer.byName === 'object') {
          if (pa.perPlayer.byName.__replace === true) mergedA.perPlayer.byName = {};
          for (const [bk, bv] of Object.entries(pa.perPlayer.byName)) {
            if (bk === '__replace') continue;
            if (bv === null) delete mergedA.perPlayer.byName[bk];
            else mergedA.perPlayer.byName[bk] = { ...(mergedA.perPlayer.byName[bk] || {}), ...bv };
          }
        }
        mergedA.perPreset = { ...(baseA.perPreset || {}) };
        if (pa.perPreset && typeof pa.perPreset === 'object') {
          if (pa.perPreset.__replace === true) mergedA.perPreset = {};
          for (const [pk, pv] of Object.entries(pa.perPreset)) {
            if (pk === '__replace') continue;
            if (pv === null || pv?.__clear === true) {
              delete mergedA.perPreset[pk];
            } else if (pv && typeof pv === 'object') {
              const cur = pv.__replace ? {} : { ...(mergedA.perPreset[pk] || {}) };
              for (const [ek, ref] of Object.entries(pv)) {
                if (ek === '__replace' || ek === '__clear') continue;
                if (ref) cur[ek] = ref;
                else delete cur[ek];
              }
              if (Object.keys(cur).length) mergedA.perPreset[pk] = cur;
              else delete mergedA.perPreset[pk];
            }
          }
        }
        nextAudio = mergedA;
      }
    }

    const seq = ++localSeq;
    state = {
      ...state,
      ...cleanPatch,
      p1: cleanPatch.p1 ? { ...state.p1, ...cleanPatch.p1 } : state.p1,
      p2: cleanPatch.p2 ? { ...state.p2, ...cleanPatch.p2 } : state.p2,
      commentators: cleanPatch.commentators ? { ...DEFAULT_COMMENTATORS, ...(state.commentators || {}), ...cleanPatch.commentators } : { ...DEFAULT_COMMENTATORS, ...(state.commentators || {}) },
      eventBar: cleanPatch.eventBar ? { ...DEFAULT_EVENT_BAR, ...(state.eventBar || {}), ...cleanPatch.eventBar } : { ...DEFAULT_EVENT_BAR, ...(state.eventBar || {}) },
      tweaks: cleanPatch.tweaks ? { ...state.tweaks, ...cleanPatch.tweaks } : state.tweaks,
      layoutPos: cleanPatch.layoutPos ? { ...DEFAULT_LAYOUT_POS, ...(state.layoutPos || {}), ...cleanPatch.layoutPos } : { ...DEFAULT_LAYOUT_POS, ...(state.layoutPos || {}) },
      style: cleanPatch.style ? { ...DEFAULT_STYLE, ...(state.style || {}), ...cleanPatch.style } : { ...DEFAULT_STYLE, ...(state.style || {}) },
      vs: nextVs,
      results: nextRes,
      top8: nextTop8,
      brackets: cleanPatch.brackets
        ? {
            ...DEFAULT_BRACKETS,
            ...(state.brackets || {}),
            ...cleanPatch.brackets,
            customColors: {
              ...DEFAULT_BRACKETS.customColors,
              ...(state.brackets?.customColors || {}),
              ...(cleanPatch.brackets.customColors || {})
            },
            pools: Array.isArray(cleanPatch.brackets.pools) ? cleanPatch.brackets.pools : (state.brackets?.pools || []),
            poolTreeSlots: cleanPatch.brackets.poolTreeSlots !== undefined ? cleanPatch.brackets.poolTreeSlots : (state.brackets?.poolTreeSlots || {}),
            top16Rows: Array.isArray(cleanPatch.brackets.top16Rows) ? cleanPatch.brackets.top16Rows : (state.brackets?.top16Rows || [])
          }
        : {
            ...DEFAULT_BRACKETS,
            ...(state.brackets || {}),
            customColors: { ...DEFAULT_BRACKETS.customColors, ...(state.brackets?.customColors || {}) }
          },
      ...(nextAudio ? { audio: nextAudio } : {}),
      _cid: CLIENT_ID,
      _seq: seq
    };
    renderUI();
    window.__FGC_AUDIO_UI__?.refresh();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    if (bc) bc.postMessage({ type: 'state', payload: state });
    pushPreviewConfig();

    if (isHttp) {
      const send = () => {
        const payload = {
          ...state,
          ...(isSilentAudio ? { _silentAudio: true } : {}),
          ...(state.audio ? { audio: { __replace: true, ...state.audio } } : {}),
          vs: {
            ...(state.vs || {}),
            matchupArtPos: { __replace: true, ...(state.vs?.matchupArtPos || {}) }
          }
        };
        return fetch('/api/state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      };
      clearTimeout(pushTimer);
      if (immediate) send();
      else pushTimer = setTimeout(send, 90);
    }
  }

  /* =========================================================================
     POPULATE DROPDOWNS, THEME GALLERY & VISUAL FLAG PICKER
     ========================================================================= */
  function hexRgba(hex, alpha01) {
    const h = String(hex || '#121520').replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h.padEnd(6, '0');
    const r = parseInt(full.slice(0, 2), 16) || 0;
    const g = parseInt(full.slice(2, 4), 16) || 0;
    const b = parseInt(full.slice(4, 6), 16) || 0;
    return `rgba(${r},${g},${b},${alpha01.toFixed(2)})`;
  }

  let lastRenderedPaletteMode = '';
  function renderAdaptiveColorStudio(st) {
    const mode = PALETTES_BY_MODE[st.fillMode] ? st.fillMode : 'gradient';
    const meta = PALETTES_BY_MODE[mode];

    // 1. Rebuild context-specific Quick Palettes only when surface mode changes
    if (lastRenderedPaletteMode !== mode) {
      lastRenderedPaletteMode = mode;
      $('palette-strip-label').textContent = meta.label;
      $('palette-strip').innerHTML = meta.items.map((p, i) => {
        let s1, sc, s2;
        if (mode === 'solid') {
          s1 = p.p1a;
          sc = p.bg1;
          s2 = p.p2a;
        } else if (mode === 'glass') {
          s1 = `linear-gradient(90deg,${hexRgba(p.p1a, 0.85)},${hexRgba(p.p1b || p.p1a, 0.72)})`;
          sc = hexRgba(p.bg1, (p.a || 62) / 100);
          s2 = `linear-gradient(90deg,${hexRgba(p.p2a, 0.85)},${hexRgba(p.p2b || p.p2a, 0.72)})`;
        } else if (mode === 'metallic') {
          s1 = `linear-gradient(135deg,${p.p1b} 0%,${p.p1a} 50%,${p.p1b} 100%)`;
          sc = `linear-gradient(165deg,${p.bg1} 0%,${p.bg2} 50%,${p.bg1} 100%)`;
          s2 = `linear-gradient(135deg,${p.p2b} 0%,${p.p2a} 50%,${p.p2b} 100%)`;
        } else {
          s1 = `linear-gradient(90deg,${p.p1a},${p.p1b || p.p1a})`;
          sc = p.cacc;
          s2 = `linear-gradient(90deg,${p.p2a},${p.p2b || p.p2a})`;
        }
        return `
          <button type="button" class="palette-chip" data-pal-mode="${mode}" data-pal-idx="${i}">
            <div class="palette-bar ${mode === 'glass' ? 'is-glass' : ''}">
              <span style="background:${s1}"></span>
              <span style="background:${sc};${mode === 'solid' ? `border:1px solid ${p.cacc}` : ''}"></span>
              <span style="background:${s2}"></span>
            </div>
            <small>${p.name}</small>
          </button>`;
      }).join('');
    }

    // 2. Morph Card 1 (Plate Surface), Card 2 (P1/P2), Card 3 (Center) cleanly for current mode!
    const isSolid = mode === 'solid';
    const isGlass = mode === 'glass';
    const isMetal = mode === 'metallic';
    const isTheme = mode === 'theme';
    const isGrad = mode === 'gradient';

    const card1Titles = {
      gradient: 'Plate Surface · Gradient',
      solid: 'Plate Surface · Solid Color',
      glass: 'Plate Surface · Frosted Glass',
      metallic: 'Plate Surface · Metallic Finish',
      theme: 'Active Theme Background'
    };
    $('lbl-surface-card').textContent = card1Titles[mode];
    $('btn-flip-bg').style.display = (isGrad || isMetal) ? 'inline-flex' : 'none';
    $('surface-controls-active').style.display = isTheme ? 'none' : 'block';
    $('surface-theme-notice').style.display = isTheme ? 'block' : 'none';
    $('wrap-bg2').style.display = (isGrad || isMetal) ? 'flex' : 'none';
    $('wrap-bgAngle').style.display = (isGrad || isMetal) ? 'block' : 'none';
    $('wrap-glassControls').style.display = isGlass ? 'block' : 'none';
    $('wrap-bgAlpha').style.display = isTheme ? 'none' : 'block';

    $('lbl-bg1').textContent = isSolid ? 'Surface Color' : isGlass ? 'Glass Tint' : isMetal ? 'Metal Base' : 'Color A';
    $('lbl-bg2').textContent = isMetal ? 'Sheen' : 'Color B';
    $('lbl-bgAngle').textContent = isMetal ? 'Sheen Angle' : 'Gradient Angle';
    $('lbl-bgAlpha').textContent = isGlass ? 'Glass Opacity' : 'Background Opacity';

    // Update Live Surface Preview Swatch
    const sw = $('surface-preview-swatch');
    const ly = $('surface-preview-layer');
    sw.classList.toggle('is-checker', isGlass || Number(st.bgAlpha ?? 94) < 92);
    const a01 = Math.max(0.22, Math.min(1, Number(st.bgAlpha ?? 94) / 100));
    const c1 = hexRgba(st.bgColor1, a01);
    const c2 = hexRgba(st.bgColor2, a01);
    if (isTheme) {
      ly.style.background = 'repeating-linear-gradient(135deg, #161b2a 0 8px, #111521 8px 16px)';
      ly.style.backdropFilter = 'none';
      ly.style.boxShadow = 'none';
      $('surface-preview-tag').textContent = 'NATIVE THEME SURFACE';
      $('surface-preview-tag').style.color = '#93c5fd';
      $('surface-preview-badge').textContent = 'ACCENTS ONLY';
    } else if (isSolid) {
      ly.style.background = c1;
      ly.style.backdropFilter = 'none';
      ly.style.boxShadow = `inset 0 -3px 0 ${st.p1Color1}`;
      $('surface-preview-tag').textContent = 'MATTE SOLID';
      $('surface-preview-tag').style.color = st.textColor || '#fff';
      $('surface-preview-badge').textContent = `${st.bgAlpha ?? 94}%`;
    } else if (isGlass) {
      const ga = Math.min(0.84, Math.max(0.22, a01));
      const gBlur = Number(st.glassBlur ?? 14);
      const gBor = (Number(st.glassBorder ?? 22) / 100).toFixed(2);
      ly.style.background = hexRgba(st.bgColor1, ga);
      ly.style.backdropFilter = `blur(${Math.round(gBlur * 0.5)}px) saturate(140%)`;
      ly.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,${gBor}), inset 0 -2px 0 ${st.p1Color1}`;
      $('surface-preview-tag').textContent = 'FROSTED GLASS';
      $('surface-preview-tag').style.color = st.textColor || '#fff';
      $('surface-preview-badge').textContent = `${gBlur}px · ${st.bgAlpha ?? 62}%`;
    } else if (isMetal) {
      ly.style.background = `linear-gradient(${st.bgAngle ?? 165}deg, ${c1} 0%, ${c2} 24%, ${c1} 48%, ${c2} 74%, ${c1} 100%)`;
      ly.style.backdropFilter = 'none';
      ly.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -2px 0 ${st.p1Color1}`;
      $('surface-preview-tag').textContent = 'METALLIC';
      $('surface-preview-tag').style.color = st.textColor || '#fff';
      $('surface-preview-badge').textContent = `${st.bgAngle ?? 165}°`;
    } else {
      ly.style.background = `linear-gradient(${st.bgAngle ?? 180}deg, ${c1}, ${c2})`;
      ly.style.backdropFilter = 'none';
      ly.style.boxShadow = `inset 0 -2px 0 ${st.p1Color1}`;
      $('surface-preview-tag').textContent = 'GRADIENT';
      $('surface-preview-tag').style.color = st.textColor || '#fff';
      $('surface-preview-badge').textContent = `${st.bgAngle ?? 180}° · ${st.bgAlpha ?? 94}%`;
    }

    // Card 2 (P1 / P2)
    $('lbl-p1-group').textContent = isSolid ? 'Player 1 Solid Accent' : isMetal ? 'Player 1 Metallic' : isGlass ? 'Player 1 Glass Accent' : isTheme ? 'Player 1 Accent' : 'Player 1 Gradient';
    $('lbl-p2-group').textContent = isSolid ? 'Player 2 Solid Accent' : isMetal ? 'Player 2 Metallic' : isGlass ? 'Player 2 Glass Accent' : isTheme ? 'Player 2 Accent' : 'Player 2 Gradient';
    $('lbl-p1-1').textContent = isSolid ? 'Color' : isMetal ? 'Highlight' : 'Start';
    $('lbl-p2-1').textContent = isSolid ? 'Color' : isMetal ? 'Highlight' : 'Start';
    $('lbl-p1-2').textContent = isMetal ? 'Base' : 'End';
    $('lbl-p2-2').textContent = isMetal ? 'Base' : 'End';
    $('wrap-p1-2').style.display = isSolid ? 'none' : 'flex';
    $('wrap-p2-2').style.display = isSolid ? 'none' : 'flex';

    // Card 3 (Center)
    $('lbl-center-group').textContent = isSolid ? 'Center / Round (Solid)' : isGlass ? 'Center / Round (Glass)' : isMetal ? 'Center / Round (Metallic)' : isTheme ? 'Center / Round Accent' : 'Center / Round (Gradient)';
    $('wrap-c1').style.display = isTheme ? 'none' : 'flex';
    $('wrap-c2').style.display = (isGrad || isMetal) ? 'flex' : 'none';
    $('lbl-c1').textContent = isSolid ? 'BG' : isGlass ? 'Tint' : 'BG A';
  }

  function buildPanelFlagFadeMask(side, st) {
    const mode = st.flagFadeMode || 'fade-out';
    const curve = st.flagFadeCurve || 'smooth';
    const rawIn = Math.max(0, Math.min(45, Number(st.flagFadeIn ?? 0)));
    const fadeIn = (mode === 'both' || mode === 'fade-in') ? Math.max(rawIn, 4) : rawIn;
    const fadeEnd = Math.max(30, Math.min(100, Number(st.flagFadeEnd ?? 98)));
    const fadeStart = Math.max(fadeIn + 2, Math.min(fadeEnd - 4, Number(st.flagFadeStart ?? 34)));
    const rawAngle = Math.max(-35, Math.min(35, Number(st.flagFadeAngle ?? 0)));
    const effTilt = mode === 'diagonal' ? (rawAngle || 18) : rawAngle;

    const ease = (t) => {
      const c = Math.max(0, Math.min(1, t));
      if (curve === 'linear') return c;
      if (curve === 'soft') return Math.pow(c, 1.85);
      if (curve === 'sharp') return c < 0.5 ? 2 * c * c : 1 - Math.pow(-2 * c + 2, 2) / 2;
      return c * c * (3 - 2 * c);
    };

    if (mode === 'vignette') {
      const cx = side === 'p1' ? 42 : 58;
      const innerR = Math.max(18, Math.min(68, fadeStart * 0.85));
      const outerR = Math.max(innerR + 12, Math.min(100, fadeEnd));
      const stops = [`rgba(0,0,0,1) 0%`, `rgba(0,0,0,1) ${innerR.toFixed(1)}%`];
      for (let i = 1; i <= 6; i++) {
        const u = i / 6;
        stops.push(`rgba(0,0,0,${ease(1 - u).toFixed(3)}) ${(innerR + (outerR - innerR) * u).toFixed(1)}%`);
      }
      if (outerR < 100) stops.push(`rgba(0,0,0,0) 100%`);
      return `radial-gradient(ellipse 88% 125% at ${cx}% 50%, ${stops.join(', ')})`;
    }

    const deg = side === 'p1' ? (90 - effTilt) : (270 + effTilt);
    const stops = [];
    if (fadeIn > 0) {
      for (let i = 0; i <= 5; i++) {
        const u = i / 5;
        stops.push(`rgba(0,0,0,${ease(u).toFixed(3)}) ${(fadeIn * u).toFixed(1)}%`);
      }
    } else {
      stops.push(`rgba(0,0,0,1) 0%`);
    }
    if (mode === 'fade-in') {
      stops.push(`rgba(0,0,0,1) 100%`);
    } else {
      stops.push(`rgba(0,0,0,1) ${fadeStart.toFixed(1)}%`);
      for (let i = 1; i <= 7; i++) {
        const u = i / 7;
        stops.push(`rgba(0,0,0,${ease(1 - u).toFixed(3)}) ${(fadeStart + (fadeEnd - fadeStart) * u).toFixed(1)}%`);
      }
      if (fadeEnd < 100) stops.push(`rgba(0,0,0,0) 100%`);
    }
    return `linear-gradient(${deg}deg, ${stops.join(', ')})`;
  }

  function isFadeBlendEffective(st) {
    if (st.flagStyle && st.flagStyle !== 'theme') return st.flagStyle === 'fade-blend';
    const activeT = THEMES.find(t => t.id === state.theme);
    return activeT?.pv?.fs === 'fade';
  }

  function renderFlagFadeEditor(st) {
    const activeFade = isFadeBlendEffective(st);
    const activeT = THEMES.find(t => t.id === state.theme);
    const pill = $('ff-status-pill');
    const enableBtn = $('btn-ff-enable');
    if (activeFade) {
      pill.textContent = '● Fade Blend Active on Overlay';
      pill.classList.remove('inactive');
      enableBtn.style.display = 'none';
    } else {
      const modeName = (st.flagStyle && st.flagStyle !== 'theme') ? st.flagStyle : (activeT?.pv?.fs || 'blade');
      pill.textContent = `● Current Flag Mode: ${modeName} (not Fade Blend)`;
      pill.classList.add('inactive');
      enableBtn.style.display = 'inline-flex';
    }

    const mode = st.flagFadeMode || 'fade-out';
    const rawIn = Math.max(0, Math.min(45, Number(st.flagFadeIn ?? 0)));
    const effIn = (mode === 'both' || mode === 'fade-in') ? Math.max(rawIn, 4) : rawIn;
    const fadeEnd = Math.max(30, Math.min(100, Number(st.flagFadeEnd ?? 98)));
    const fadeStart = Math.max(effIn + 2, Math.min(fadeEnd - 4, Number(st.flagFadeStart ?? 34)));
    const angle = Number(st.flagFadeAngle ?? 0);
    const width = Number(st.flagWidth ?? 62);
    const opacity = Number(st.flagOpacity ?? 100);
    const zoom = Number(st.flagZoom ?? 100);
    const shiftX = Number(st.flagShiftX ?? 0);
    const sat = Number(st.flagSaturation ?? 100);
    const bright = Number(st.flagBrightness ?? 96);

    $('rng-flagFadeIn').value = rawIn;
    $('val-flagFadeIn').textContent = `${rawIn}%`;
    $('rng-flagFadeStart').value = Number(st.flagFadeStart ?? 34);
    $('val-flagFadeStart').textContent = `${Number(st.flagFadeStart ?? 34)}%`;
    $('rng-flagFadeEnd').value = fadeEnd;
    $('val-flagFadeEnd').textContent = `${fadeEnd}%`;
    $('rng-flagFadeAngle').value = angle;
    $('val-flagFadeAngle').textContent = `${angle}°`;
    $('rng-ff-flagWidth').value = width;
    $('val-ff-flagWidth').textContent = `${width} px`;
    $('rng-ff-flagOpacity').value = opacity;
    $('val-ff-flagOpacity').textContent = `${opacity}%`;
    $('rng-flagZoom').value = zoom;
    $('val-flagZoom').textContent = `${zoom}%`;
    $('rng-flagShiftX').value = shiftX;
    $('val-flagShiftX').textContent = `${shiftX > 0 ? '+' : ''}${shiftX}%`;
    $('rng-flagSaturation').value = sat;
    $('val-flagSaturation').textContent = `${sat}%`;
    $('rng-flagBrightness').value = bright;
    $('val-flagBrightness').textContent = `${bright}%`;

    // Envelope bar visualizer
    const inW = mode === 'vignette' ? Math.max(10, Math.round((100 - fadeStart) * 0.35)) : effIn;
    const solidW = mode === 'fade-in' ? Math.max(0, 100 - inW) : Math.max(0, fadeStart - inW);
    const outW = mode === 'fade-in' ? 0 : Math.max(0, fadeEnd - fadeStart);
    $('ff-env-in').style.width = `${inW}%`;
    $('ff-env-solid').style.width = `${solidW}%`;
    $('ff-env-out').style.width = `${outW}%`;
    $('ff-env-caption').innerHTML = mode === 'fade-in'
      ? `<span>Fade-In: 0% → ${effIn}%</span><span>Solid: ${effIn}% → 100%</span><span>No Fade-Out</span>`
      : mode === 'vignette'
        ? `<span>Soft Vignette Spotlight</span><span>Core: ${Math.round(fadeStart * 0.85)}%</span><span>Outer Falloff: ${fadeEnd}%</span>`
        : `<span>Fade-In: 0% → ${effIn}%</span><span>Solid: ${effIn}% → ${fadeStart}%</span><span>Fade-Out: ${fadeStart}% → ${fadeEnd}%</span>`;

    // Live interactive P1 / P2 mini monitor
    const fMode = state.flagMode || 'both';
    const resolveSideFlags = (p, fallbackCode) => {
      const f1 = (fMode !== 'region' && p?.flag && FLAGS_MAP[p.flag]) ? FLAGS_MAP[p.flag].svg : '';
      const f2 = (fMode !== 'country' && p?.region && FLAGS_MAP[p.region] && p.region !== p.flag) ? FLAGS_MAP[p.region].svg : '';
      const list = [f1, f2].filter(Boolean);
      if (list.length) return { list, sample: false };
      return { list: [FLAGS_MAP[fallbackCode]?.svg || ''].filter(Boolean), sample: true };
    };
    const r1 = resolveSideFlags(state.p1, 'KR');
    const r2 = resolveSideFlags(state.p2, 'ES');
    $('ff-sample-note').textContent = (r1.sample || r2.sample)
      ? 'Showing sample flags (pick player flags above to preview yours)'
      : 'Synced live with your current match flags';
    $('ff-live-p1-name').textContent = state.p1?.name || 'PLAYER 1';
    $('ff-live-p2-name').textContent = state.p2?.name || 'PLAYER 2';

    const renderDemoSide = (el, side, flags) => {
      const mask = buildPanelFlagFadeMask(side, st);
      const isDual = flags.length > 1;
      const itemW = isDual ? Math.round(width * 0.65 + 16) : Math.round(width * 0.85 + 30);
      el.style.opacity = (opacity / 100).toFixed(2);
      el.style.webkitMaskImage = mask;
      el.style.maskImage = mask;
      el.style.webkitMaskRepeat = 'no-repeat';
      el.style.maskRepeat = 'no-repeat';
      el.style.webkitMaskSize = '100% 100%';
      el.style.maskSize = '100% 100%';
      const sx = side === 'p1' ? shiftX : -shiftX;
      const svgStyle = `transform:scale(${(zoom / 100).toFixed(2)}) translateX(${sx}%);filter:saturate(${(sat / 100).toFixed(2)}) brightness(${(bright / 100).toFixed(2)});`;
      el.innerHTML = flags.map((svg, idx) => {
        let extra = `width:${itemW}px;`;
        if (isDual && idx === 1) {
          const dir = side === 'p1' ? '90deg' : '270deg';
          extra += side === 'p1' ? 'margin-left:-12px;' : 'margin-right:-12px;';
          extra += `-webkit-mask-image:linear-gradient(${dir},transparent 0%,rgba(0,0,0,0.45) 14%,#000 30%,#000 100%);mask-image:linear-gradient(${dir},transparent 0%,rgba(0,0,0,0.45) 14%,#000 30%,#000 100%);`;
        }
        return `<span class="ff-flag-item" style="${extra}">${svg.replace('<svg ', `<svg style="${svgStyle}" `)}</span>`;
      }).join('');
    };
    renderDemoSide($('ff-live-p1-flags'), 'p1', r1.list);
    renderDemoSide($('ff-live-p2-flags'), 'p2', r2.list);
  }

  const gameMetaCache = new Map();
  let lastSyncedGameProfileId = '';

  function populateSelectOptions(el, values, emptyLabel = '— None —') {
    if (!el) return;
    const cur = el.value;
    const list = ['', ...values.filter(Boolean)];
    el.innerHTML = list.map(v => `<option value="${String(v).replace(/"/g, '&quot;')}">${v || emptyLabel}</option>`).join('');
    if (cur && !list.includes(cur)) {
      const opt = document.createElement('option');
      opt.value = cur;
      opt.textContent = cur;
      el.appendChild(opt);
    }
    el.value = cur || '';
  }

  function populateCharSelects(charsList, gameLabel) {
    const names = (charsList && charsList.length)
      ? ['', ...charsList.map(c => typeof c === 'string' ? c : c.name)]
      : T8_CHARS;
    const html = names.map(ch => `<option value="${ch.replace(/"/g, '&quot;')}">${ch || '— None —'}</option>`).join('');
    for (const id of ['p1-char', 'p2-char', 'p1-char2', 'p2-char2', 'p1-partner-char', 'p2-partner-char', 'vs-c-p1-char', 'vs-c-p2-char', 'sel-vs-mu-char']) {
      const el = $(id);
      if (!el) continue;
      const cur = el.value;
      el.innerHTML = html;
      if (cur && !names.includes(cur)) {
        const opt = document.createElement('option');
        opt.value = cur;
        opt.textContent = cur;
        el.appendChild(opt);
      }
      el.value = cur || '';
    }
  }

  async function ensureScorebarGameRoster(profile) {
    if (!profile) return;
    const assetGame = profile.assetGameId || 'tekken8';
    // Immediately populate fallback lists so selects are never empty even offline
    if (profile.fallbackChars?.length) {
      populateCharSelects(profile.fallbackChars, profile.name);
    }
    if (profile.variantOptions?.length) {
      populateSelectOptions($('p1-variant'), profile.variantOptions, `— ${profile.variantLabel || 'Auto'} —`);
      populateSelectOptions($('p2-variant'), profile.variantOptions, `— ${profile.variantLabel || 'Auto'} —`);
    }
    if (profile.fallbackStages?.length) {
      populateSelectOptions($('smash-stage-select'), profile.fallbackStages, '— No Stage —');
    }
    if (!isHttp) return;
    if (gameMetaCache.has(assetGame)) {
      const m = gameMetaCache.get(assetGame);
      if (m.characters?.length) populateCharSelects(m.characters, profile.name);
      if (m.variants?.length && profile.supportsVariant && profile.id === 'mk1') {
        const vNames = m.variants.map(v => v.name).sort((a, b) => a.localeCompare(b));
        populateSelectOptions($('p1-variant'), vNames, `— ${profile.variantLabel || 'Kameo'} —`);
        populateSelectOptions($('p2-variant'), vNames, `— ${profile.variantLabel || 'Kameo'} —`);
      }
      if (m.stages?.length && profile.supportsStage) {
        populateSelectOptions($('smash-stage-select'), m.stages.map(s => s.name), '— No Stage —');
      }
      return;
    }
    try {
      const res = await fetch(`/api/assets/meta?game=${encodeURIComponent(assetGame)}`);
      if (!res.ok) return;
      const meta = await res.json();
      gameMetaCache.set(assetGame, meta);
      const curProf = resolveGameProfile(state.theme);
      if (curProf.assetGameId === assetGame) {
        if (meta.characters?.length) populateCharSelects(meta.characters, profile.name);
        if (meta.variants?.length && profile.supportsVariant && profile.id === 'mk1') {
          const vNames = meta.variants.map(v => v.name).sort((a, b) => a.localeCompare(b));
          populateSelectOptions($('p1-variant'), vNames, `— ${profile.variantLabel || 'Kameo'} —`);
          populateSelectOptions($('p2-variant'), vNames, `— ${profile.variantLabel || 'Kameo'} —`);
          if ($('p1-variant')) $('p1-variant').value = state.p1?.variant || '';
          if ($('p2-variant')) $('p2-variant').value = state.p2?.variant || '';
        }
        if (meta.stages?.length && profile.supportsStage) {
          populateSelectOptions($('smash-stage-select'), meta.stages.map(s => s.name), '— No Stage —');
        }
        // Re-sync selected values after async options populate
        $('p1-char').value = state.p1?.character || '';
        $('p2-char').value = state.p2?.character || '';
        if ($('p1-char2')) $('p1-char2').value = state.p1?.secondaryChar || '';
        if ($('p2-char2')) $('p2-char2').value = state.p2?.secondaryChar || '';
        if ($('p1-partner-char')) $('p1-partner-char').value = state.p1?.partnerChar || '';
        if ($('p2-partner-char')) $('p2-partner-char').value = state.p2?.partnerChar || '';
        if ($('smash-stage-select')) $('smash-stage-select').value = state.stageName || '';
      }
    } catch {}
  }

  function syncGameExtraUI() {
    const profile = resolveGameProfile(state.theme);
    const activeThemeObj = THEMES.find(x => x.id === state.theme);
    const isSmash = profile.id === 'ssbu';
    const isSmashDoubles = isSmash && Boolean(activeThemeObj?.is2v2 || activeThemeObj?.cfg?.is2v2 || String(state.theme || '').includes('2v2') || String(state.theme || '').includes('doubles'));
    const is2xko = profile.id === '2xko';
    const isCotw = profile.id === 'ffcotw';
    const isAvatar = profile.id === 'avatar';
    const isMk1 = profile.id === 'mk1';
    const showMetaExtras = Boolean(state.showMetaStrip || state.theme === 't8-pro-meta-strip');

    // Game context badge inside Round Control header
    const pill = $('game-profile-pill');
    if (pill) {
      pill.textContent = isSmashDoubles ? 'SSBU 2v2' : (profile.shortName || profile.name);
      pill.title = profile.name;
    }

    // Adapt Player / Team card titles & primary character label cleanly per game
    if ($('p1-card-title')) $('p1-card-title').textContent = isSmashDoubles ? 'Team 1 (Left)' : 'Player 1 (Left)';
    if ($('p2-card-title')) $('p2-card-title').textContent = isSmashDoubles ? 'Team 2 (Right)' : 'Player 2 (Right)';
    const charLabelText = is2xko
      ? 'Point Champion'
      : isSmashDoubles
        ? 'Fighter 1'
        : isSmash
          ? 'SSBU Fighter'
          : isCotw
            ? 'Fatal Fury Fighter'
            : isAvatar
              ? 'Avatar Fighter'
              : isMk1
                ? 'MK1 Fighter'
                : `${profile.name} Character`;
    if ($('p1-char-label')) $('p1-char-label').textContent = charLabelText;
    if ($('p2-char-label')) $('p2-char-label').textContent = charLabelText;

    // Adapt Round Control checkboxes: ONLY show toggles relevant to the active game!
    if ($('wrap-chk-chars')) $('wrap-chk-chars').style.display = isSmash ? 'none' : '';
    if ($('wrap-chk-meta-strip')) $('wrap-chk-meta-strip').style.display = isSmash ? 'none' : '';
    if ($('wrap-chk-stock')) $('wrap-chk-stock').style.display = isSmash ? '' : 'none';
    if ($('wrap-chk-stage')) $('wrap-chk-stage').style.display = isSmash ? '' : 'none';
    if ($('wrap-chk-variant')) $('wrap-chk-variant').style.display = (is2xko || isCotw || isAvatar || isMk1) ? '' : 'none';
    if ($('lbl-chk-variant')) $('lbl-chk-variant').textContent = profile.variantLabel || 'Style';
    if ($('wrap-chk-pronouns')) $('wrap-chk-pronouns').style.display = (isSmash || showMetaExtras) ? '' : 'none';

    // Contextual Stage / Event Bar inputs inside Round Control
    const showStageInput = isSmash;
    const showEventBarInput = Boolean(state.showBottomBar || state.theme === 't8-pro-meta-strip');
    if ($('wrap-smash-stage')) $('wrap-smash-stage').style.display = showStageInput ? 'block' : 'none';
    if ($('wrap-event-bar-label')) $('wrap-event-bar-label').style.display = showEventBarInput ? 'block' : 'none';
    if ($('game-stage-row')) $('game-stage-row').classList.toggle('is-open', showStageInput || showEventBarInput);

    // Adapt Player 1 & Player 2 fields cleanly per game (ZERO duplicate fields!)
    for (const side of ['p1', 'p2']) {
      const gameRow = $(`${side}-game-fields`);
      const compRow = $(`${side}-comp-meta`);
      const doublesBox = $(`${side}-partner-fields`);
      const wrapChar2 = $(`wrap-${side}-char2`);
      const wrapVar = $(`wrap-${side}-variant`);
      const wrapCoop = $(`wrap-${side}-coop`);
      const lblVar = $(`lbl-${side}-variant`);
      const wrapPronouns = $(`wrap-${side}-pronouns`);
      const wrapHandle = $(`wrap-${side}-handle`);

      if (lblVar) lblVar.textContent = profile.variantLabel || 'Variant';

      if (gameRow) {
        gameRow.classList.remove('cols-2xko', 'cols-cotw', 'cols-ssbu');
        if (is2xko) {
          gameRow.classList.add('cols-2xko');
          if (wrapChar2) wrapChar2.style.display = 'block';
          if (wrapVar) wrapVar.style.display = 'block';
          if (wrapCoop) wrapCoop.style.display = 'block';
        } else if (isCotw || isSmash || isAvatar || isMk1) {
          gameRow.style.display = 'grid';
          gameRow.style.gridTemplateColumns = '1fr';
          if (wrapChar2) wrapChar2.style.display = 'none';
          if (wrapVar) wrapVar.style.display = 'block';
          if (wrapCoop) wrapCoop.style.display = 'none';
        } else {
          gameRow.style.display = '';
          if (wrapChar2) wrapChar2.style.display = 'none';
          if (wrapVar) wrapVar.style.display = 'none';
          if (wrapCoop) wrapCoop.style.display = 'none';
        }
        if (is2xko) {
          gameRow.style.display = '';
          gameRow.style.gridTemplateColumns = '';
        } else if (!isCotw && !isSmash && !isAvatar && !isMk1) {
          gameRow.style.gridTemplateColumns = '';
        }
      }

      // Compact competitive meta row:
      // - Smash: Seed + Pronouns (2 cols, @Handle hidden because Smash HUD has no @Handle)
      // - Non-Smash: Seed + Pronouns + @Handle (3 cols)
      if (compRow) {
        if (isSmash) {
          compRow.style.gridTemplateColumns = '66px 1fr';
          if (wrapPronouns) wrapPronouns.style.display = 'block';
          if (wrapHandle) wrapHandle.style.display = 'none';
        } else {
          compRow.style.gridTemplateColumns = '60px 88px 1fr';
          if (wrapPronouns) wrapPronouns.style.display = 'block';
          if (wrapHandle) wrapHandle.style.display = 'block';
        }
      }

      // SSBU Doubles 2v2 Teammate Block (ONLY visible in Smash Doubles 2v2!)
      if (doublesBox) doublesBox.classList.toggle('is-open', isSmashDoubles);
    }

    if (lastSyncedGameProfileId !== profile.id) {
      lastSyncedGameProfileId = profile.id;
      ensureScorebarGameRoster(profile);
    }
  }

  function renderVsDesignCards() {
    if (vsDesignCat === 'my-presets') {
      const cnt = presetsDb.filter(p => (p.scope || 'scorebar') === 'vs').length;
      if ($('vs-design-count')) $('vs-design-count').textContent = cnt;
      if (window.FGC_PRESETS_UI) window.FGC_PRESETS_UI.renderSidebarMyPresets('vs', $('vs-design-grid'));
      return;
    }
    const q = normText(vsDesignSearch.trim());
    const list = VS_DESIGNS.filter(d => {
      if (q) return normText(`${d.name} ${d.desc} ${d.cat} ${d.tier} ${d.divider} ${d.plate} ${d.emblem}`).includes(q);
      return vsDesignCat === 'all' || d.cat === vsDesignCat;
    });
    if ($('vs-design-count')) $('vs-design-count').textContent = list.length;
    const curId = state.vs?.design || 'arcade-pop';
    $('vs-design-grid').innerHTML = list.map(d => `
      <button type="button" class="vs-design-card ${curId === d.id ? 'active' : ''}" data-vs-design="${d.id}">
        <div class="vs-design-swatch" style="background:${d.swatch || d.bgLeft}">${d.emblem === 'none' ? '' : 'VS'}</div>
        <div class="vs-design-head">
          <strong>${d.name}</strong>
          <span class="vs-tier-badge ${d.tier || 'PRO'}">${d.tier || 'PRO'}</span>
        </div>
        <small>${d.desc}</small>
      </button>
    `).join('') || '<div style="padding:16px;text-align:center;color:var(--muted);font-size:11px;">No VS designs matched that search.</div>';
  }

  function renderAvatarBox(side, url) {
    const thumb = $(`${side}-avatar-thumb`);
    const status = $(`${side}-avatar-status`);
    const clr = $(`btn-${side}-avatar-clear`);
    if (url) {
      const src = /^https?:\/\//i.test(url) && isHttp ? `/api/avatar-proxy?url=${encodeURIComponent(url)}` : url;
      thumb.innerHTML = `<img src="${src}" alt="" />`;
      status.textContent = url.startsWith('/media/') ? 'Local photo uploaded' : 'Synced from tournament';
      clr.style.display = 'inline-flex';
    } else {
      thumb.textContent = '👤';
      status.textContent = 'No photo (auto Start.gg or upload)';
      clr.style.display = 'none';
    }
  }

  let customFontsDb = window.FGC_CUSTOM_FONTS?.getFonts() || [];
  let cachedLocalPcFonts = [];

  const VS_FONT_OPTIONS = [
    ['theme', '— Active Design —'],
    ['Russo One', 'Russo One (Heavy Arcade)'],
    ['Barlow Condensed', 'Barlow Condensed (Broadcast)'],
    ['Chakra Petch', 'Chakra Petch (Cyber T8)'],
    ['Orbitron', 'Orbitron (Sci-Fi HUD)'],
    ['Teko', 'Teko (Tall Fighter)'],
    ['Anton', 'Anton (Manga Impact)'],
    ['Bebas Neue', 'Bebas Neue (Arena Poster)'],
    ['Oswald', 'Oswald (Clean TV)'],
    ['Exo 2', 'Exo 2 (Modern Sport)'],
    ['Black Ops One', 'Black Ops One (Cage)'],
    ['Montserrat', 'Montserrat (Minimalist)']
  ];

  function refreshAllFontSelects() {
    const build = (opts) => window.FGC_CUSTOM_FONTS
      ? window.FGC_CUSTOM_FONTS.buildSelectOptionsHtml(opts, customFontsDb)
      : opts.map(([v, l]) => `<option value="${v}">${l}</option>`).join('');
    const sbHtml = build(FONT_OPTIONS);
    const vsHtml = build(VS_FONT_OPTIONS);
    const syncSel = (id, html, val) => {
      const el = $(id);
      if (!el) return;
      el.innerHTML = html;
      el.value = val || 'theme';
      if (el.value !== (val || 'theme')) el.value = 'theme';
    };
    syncSel('st-font-name', sbHtml, state.style?.fontName);
    syncSel('st-font-score', sbHtml, state.style?.fontScore);
    syncSel('vs-fontDisplay', vsHtml, state.vs?.fontDisplay);
    syncSel('bk-fontDisplay', vsHtml, state.brackets?.fontDisplay);
    syncSel('bk-fontBody', sbHtml, state.brackets?.fontBody);
    syncSel('res-fontDisplay', sbHtml, state.results?.fontDisplay);
  }

  function renderCustomFontsUI() {
    const host = $('custom-fonts-list');
    if (!host) return;
    if (!customFontsDb.length) {
      host.innerHTML = '<div style="grid-column:1/-1;color:var(--muted);font-size:11px;padding:4px 2px;">No custom PC fonts added yet. Upload a <b>.ttf / .otf / .woff2</b> file or add an installed system font to unlock it across Scorebars, VS Splash &amp; Top 8 Results.</div>';
      return;
    }
    host.innerHTML = customFontsDb.map((f) => {
      const key = window.FGC_CUSTOM_FONTS ? window.FGC_CUSTOM_FONTS.getFontKey(f) : `custom:${f.id}`;
      const stack = window.FGC_CUSTOM_FONTS ? window.FGC_CUSTOM_FONTS.resolveFontStack(key) : 'inherit';
      const badge = f.kind === 'system' ? '🖥️ PC System' : `📁 ${String(f.file || '').split('.').pop().toUpperCase() || 'FONT'}`;
      const safeName = String(f.name || f.family || f.id).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const safeKey = String(key).replace(/"/g, '&quot;');
      const safeId = String(f.id).replace(/"/g, '&quot;');
      return `
        <div class="preset-item" style="flex-direction:column;align-items:stretch;gap:6px;padding:8px 10px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
            <strong style="font-size:12px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safeName}</strong>
            <span style="font-size:9.5px;padding:2px 6px;border-radius:4px;background:rgba(56,189,248,0.16);color:#7dd3fc;font-weight:700;flex-shrink:0;">${badge}</span>
          </div>
          <div style="font-family:${stack};font-size:18px;letter-spacing:0.04em;color:#f8fafc;background:rgba(0,0,0,0.34);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:5px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            PLAYER 1 · 3 - 2 · GRAND FINALS
          </div>
          <div style="display:flex;gap:5px;justify-content:flex-end;">
            <button type="button" data-apply-global-font="${safeKey}" class="primary" style="padding:3px 9px;font-size:10.5px;" title="Apply this font to Scorebars, VS Splash &amp; Top 8 Results at once">🌐 Apply Globally</button>
            <button type="button" data-del-custom-font="${safeId}" style="padding:3px 7px;font-size:10.5px;" title="Remove custom font">✕</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function applyFontsListUpdate(list) {
    customFontsDb = Array.isArray(list) ? list : [];
    window.FGC_CUSTOM_FONTS?.setFonts(customFontsDb);
    refreshAllFontSelects();
    renderCustomFontsUI();
    pushPreviewConfig();
  }

  function initSelects() {
    populateCharSelects([], 'Tekken 8');
    refreshAllFontSelects();
    renderCustomFontsUI();
    renderAdaptiveColorStudio(DEFAULT_STYLE);
    renderVsDesignCards();
    renderResultsDesignCards();
    buildResultsPlayersRows();
  }

  function renderPresetsList() {
    const sbEntries = presetsDb.map((p, idx) => ({ p, idx })).filter(({ p }) => (p.scope || 'scorebar') === 'scorebar');
    $('presets-list').innerHTML = sbEntries.map(({ p, idx }) => {
      const hasPos = hasCustomLayoutPos(p.layoutPos) || Math.abs(Number(p.tweaks?.wingSpread || 0)) >= 1 || Math.abs(Number(p.tweaks?.offsetY || 0)) >= 1 || Number(p.tweaks?.scale ?? 100) !== 100 || Math.abs(Number(p.eventBarLayout?.offsetX || 0)) >= 1 || Math.abs(Number(p.eventBarLayout?.offsetY || 0)) >= 1 || Number(p.eventBarLayout?.width || 0) >= 160 || Math.abs(Number(p.commentatorsLayout?.offsetX || 0)) >= 1 || Math.abs(Number(p.commentatorsLayout?.offsetY || 0)) >= 1 || Number(p.commentatorsLayout?.width || 0) >= 180;
      const thumbHtml = window.FGC_PRESETS_UI?.buildScorebarPresetThumb ? window.FGC_PRESETS_UI.buildScorebarPresetThumb(p) : '';
      return `
      <div class="my-preset-card" style="width:100%;">
        ${thumbHtml}
        <div class="preset-item" style="border:0;padding:2px 0 0;background:transparent;">
          <div>
            <strong>${p.name}</strong>
            <span>Base theme: ${p.theme}${hasPos ? ' · 📍 Custom Layout' : ''}</span>
          </div>
          <div style="display:flex;gap:5px;">
            <button type="button" data-apply-preset="${idx}" class="primary" style="padding:4px 9px;font-size:11px;">Apply</button>
            <button type="button" data-del-preset="${idx}" style="padding:4px 7px;font-size:11px;">✕</button>
          </div>
        </div>
      </div>
    `;
    }).join('') || '<div style="color:var(--muted);font-size:11px;">No custom presets saved yet. Customize colors, fonts, positions, or sizes and click "Save Current Style".</div>';
    window.FGC_PRESETS_UI?.refreshAllPresetViews();
  }

  function normText(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function renderFlagTrigger(side, slot, code) {
    const ico = $(`ico-${side}-${slot}`);
    const lbl = $(`lbl-${side}-${slot}`);
    const item = code ? FLAGS_MAP[String(code).toUpperCase()] : null;
    if (item) {
      ico.innerHTML = item.svg;
      ico.classList.add('has-flag');
      lbl.textContent = item.name;
      lbl.classList.remove('empty');
    } else {
      ico.textContent = '+';
      ico.classList.remove('has-flag');
      lbl.textContent = slot === 'flag' ? 'No country' : 'No region';
      lbl.classList.add('empty');
    }
  }

  function getFlagTarget(side) {
    if (side === 'p1-partner' || side === 'p2-partner') {
      const base = state[side.slice(0, 2)] || {};
      return {
        name: base.partnerName || (side === 'p1-partner' ? 'Teammate 1' : 'Teammate 2'),
        flag: base.partnerFlag || '',
        region: base.partnerRegion || ''
      };
    }
    if (side === 't8-p1' || side === 't8-p2') {
      const slotData = getResolvedTop8Slot(t8EditingSlotId);
      return slotData?.[side === 't8-p1' ? 'p1' : 'p2'] || {};
    }
    if (String(side || '').startsWith('bk-pool-')) {
      const [, , pi, ri] = String(side).split('-');
      return getBracketsState().pools?.[Number(pi)]?.players?.[Number(ri)] || {};
    }
    if (side === 'bk-pt-p1' || side === 'bk-pt-p2') {
      const pKey = side === 'bk-pt-p1' ? 'p1' : 'p2';
      return getBracketsState().poolTreeSlots?.[bkActivePtSlot]?.[pKey] || {};
    }
    if (String(side || '').startsWith('bk-t16-')) {
      return getBracketsState().top16Rows?.[Number(side.slice(7))] || {};
    }
    if (String(side || '').startsWith('res-')) {
      const idx = Number(side.slice(4));
      const list = getResPlacementsClone();
      return list[idx] || {};
    }
    return state[side] || {};
  }

  function commitFlagTarget(side, slot, code) {
    if (side === 't8-p1' || side === 't8-p2') {
      const pKey = side === 't8-p1' ? 'p1' : 'p2';
      patchTop8SlotOverride(t8EditingSlotId, { [pKey]: { [slot]: code } }, true);
      return;
    }
    if (String(side || '').startsWith('bk-pool-')) {
      const [, , pi, ri] = String(side).split('-');
      const pools = structuredClone(getBracketsState().pools || []);
      if (pools[Number(pi)]?.players?.[Number(ri)]) {
        pools[Number(pi)].players[Number(ri)].flag = code;
        commitState({ brackets: { pools } }, true);
      }
      return;
    }
    if (side === 'bk-pt-p1' || side === 'bk-pt-p2') {
      const pKey = side === 'bk-pt-p1' ? 'p1' : 'p2';
      const slots = structuredClone(getBracketsState().poolTreeSlots || {});
      const cur = slots[bkActivePtSlot] || { id: bkActivePtSlot, p1: {}, p2: {} };
      cur[pKey] = { ...(cur[pKey] || {}), flag: code };
      slots[bkActivePtSlot] = cur;
      commitState({ brackets: { poolTreeSlots: slots } }, true);
      return;
    }
    if (String(side || '').startsWith('bk-t16-')) {
      const idx = Number(side.slice(7));
      const rows = structuredClone(getBracketsState().top16Rows || []);
      if (rows[idx]) {
        rows[idx].flag = code;
        commitState({ brackets: { top16Rows: rows } }, true);
      }
      return;
    }
    if (side === 'p1-partner' || side === 'p2-partner') {
      const baseKey = side.slice(0, 2);
      const field = slot === 'region' ? 'partnerRegion' : 'partnerFlag';
      commitState({ [baseKey]: { [field]: code } }, true);
      return;
    }
    if (String(side || '').startsWith('res-')) {
      const idx = Number(side.slice(4));
      const cur = getResPlacementsClone();
      if (cur[idx]) {
        cur[idx][slot] = code;
        commitState({ results: { placements: cur } }, true);
      }
      return;
    }
    commitState({ [side]: { [slot]: code } }, true);
  }

  let flagDlPollTimer = null;

  function buildFullFlagEntries() {
    const wc = window.FGC_FLAG_API?.getWorldCatalog?.();
    const builtinByCode = new Map(FLAG_CATALOG.map(f => [f.code, f]));
    const entries = [];
    const seen = new Set();

    if (wc && Array.isArray(wc.countries) && wc.countries.length) {
      for (const c of wc.countries) {
        const b = builtinByCode.get(c.c);
        const entry = {
          code: c.c,
          name: b?.name || c.n,
          native: c.nat || '',
          continent: c.ct || b?.continent || 'OTHER',
          country: c.c,
          countryName: b?.name || c.n,
          isRegion: false,
          builtin: Boolean(b),
          cached: Boolean(b) || Boolean(c.cached),
          aliases: b?.aliases || '',
          regionCount: Array.isArray(c.r) ? c.r.length : 0,
          rcCached: Number(c.rcCached || 0),
          svg: b ? b.svg : (FLAGS_MAP[c.c]?.svg || window.FGC_FLAG_API.makeDynamicFlagImg(c.c))
        };
        entries.push(entry);
        seen.add(c.c);

        const regCachedSet = new Set(c.cachedRegCodes || []);
        for (const r of (c.r || [])) {
          const br = builtinByCode.get(r.c);
          entries.push({
            code: r.c,
            name: br?.name || r.n,
            native: r.nat || '',
            continent: c.ct || br?.continent || 'OTHER',
            country: c.c,
            countryName: b?.name || c.n,
            isRegion: true,
            builtin: Boolean(br),
            cached: Boolean(br) || regCachedSet.has(r.c),
            aliases: br?.aliases || '',
            svg: br ? br.svg : (FLAGS_MAP[r.c]?.svg || window.FGC_FLAG_API.makeDynamicFlagImg(r.c))
          });
          seen.add(r.c);
        }
      }
    }
    // Always ensure any built-in SVG flags not in world catalog are present too
    for (const f of FLAG_CATALOG) {
      if (seen.has(f.code)) continue;
      const cc = f.code.includes('-') ? f.code.split('-')[0] : f.code;
      entries.push({
        code: f.code,
        name: f.name,
        native: f.native || '',
        continent: f.continent || 'OTHER',
        country: cc,
        countryName: FLAGS_MAP[cc]?.name || cc,
        isRegion: f.code.includes('-'),
        builtin: true,
        cached: true,
        aliases: f.aliases || '',
        svg: f.svg
      });
    }
    return entries;
  }

  function getCountriesWithRegions(continentFilter) {
    const wc = window.FGC_FLAG_API?.getWorldCatalog?.();
    if (wc && Array.isArray(wc.countries)) {
      return wc.countries
        .filter(c => Array.isArray(c.r) && c.r.length > 0 && (!continentFilter || continentFilter === 'all' || continentFilter === 'cached' || c.ct === continentFilter))
        .map(c => ({ code: c.c, name: c.n, count: c.r.length, cached: Number(c.rcCached || 0), continent: c.ct }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
    const map = new Map();
    for (const f of FLAG_CATALOG) {
      if (!f.code.includes('-')) continue;
      const cc = f.code.split('-')[0];
      if (continentFilter && continentFilter !== 'all' && continentFilter !== 'cached' && f.continent !== continentFilter) continue;
      if (!map.has(cc)) map.set(cc, { code: cc, name: FLAGS_MAP[cc]?.name || cc, count: 0, cached: 0, continent: f.continent });
      const row = map.get(cc);
      row.count++;
      row.cached++;
    }
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  function openFlagPicker(side, slot) {
    const tgt = getFlagTarget(side);
    const curFlag = (tgt.flag || '').toUpperCase();
    const curReg = (tgt.region || '').toUpperCase();
    const isRegSlot = slot === 'region';
    const regCountry = (curReg.includes('-') ? curReg.split('-')[0] : '') || (curFlag && !curFlag.includes('-') ? curFlag : 'ES');

    pickerState = {
      open: true,
      side,
      slot,
      scope: isRegSlot ? 'regions' : 'countries',
      cont: 'all',
      country: regCountry || 'ES',
      query: '',
      showAll: false
    };
    if ($('flag-pack-scope')) {
      $('flag-pack-scope').value = isRegSlot ? 'country-regions' : 'countries';
    }
    $('flag-search-input').value = '';
    $('flag-modal').classList.add('open');
    renderFlagPickerModal();
    if (window.FGC_FLAG_API?.loadWorldCatalog) {
      window.FGC_FLAG_API.loadWorldCatalog(false).then(() => {
        if (pickerState.open) renderFlagPickerModal();
      });
    }
    setTimeout(() => $('flag-search-input').focus(), 20);
  }

  function closeFlagPicker() {
    pickerState.open = false;
    $('flag-modal').classList.remove('open');
  }

  function renderFlagPickerModal() {
    const { side, slot, scope, cont, query, showAll } = pickerState;
    const tgt = getFlagTarget(side);
    const badge = $('flag-modal-player-badge');
    if (side === 't8-p1' || side === 't8-p2') {
      badge.textContent = `BRACKET · ${t8EditingSlotId.toUpperCase()} ${side === 't8-p1' ? 'P1' : 'P2'}`;
      badge.style.background = side === 't8-p1' ? 'var(--p1)' : 'var(--p2)';
      badge.style.color = '#fff';
    } else if (String(side).startsWith('bk-')) {
      badge.textContent = 'BRACKETS / POOLS';
      badge.style.background = '#2563eb';
      badge.style.color = '#fff';
    } else if (String(side).startsWith('res-')) {
      const idx = Number(side.slice(4));
      badge.textContent = `TOP 8 · #${tgt.place || (idx + 1)}`;
      badge.style.background = 'var(--gold)';
      badge.style.color = '#090a0e';
    } else if (side === 'p1-partner' || side === 'p2-partner') {
      const isP1 = side === 'p1-partner';
      badge.textContent = isP1 ? 'TEAMMATE 1' : 'TEAMMATE 2';
      badge.style.background = isP1 ? 'var(--p1)' : 'var(--p2)';
      badge.style.color = '#fff';
    } else {
      badge.textContent = side === 'p1' ? 'PLAYER 1' : 'PLAYER 2';
      badge.style.background = side === 'p1' ? 'var(--p1)' : 'var(--p2)';
      badge.style.color = '#fff';
    }
    $('flag-modal-heading').textContent = `${tgt.name || side.toUpperCase()} — Pick Flag`;

    $('flag-slot-switch').querySelectorAll('button').forEach(b => {
      b.classList.toggle('active-chip', b.dataset.slot === slot);
    });
    $('flag-scope-tabs')?.querySelectorAll('button').forEach(b => {
      b.classList.toggle('active-chip', b.dataset.fscope === scope);
    });
    $('flag-cont-tabs')?.querySelectorAll('button').forEach(b => {
      b.classList.toggle('active-chip', b.dataset.fcont === cont);
    });

    // Update World Flag Stats Banner
    const wc = window.FGC_FLAG_API?.getWorldCatalog?.();
    const statsEl = $('flag-cache-stats');
    if (statsEl) {
      if (wc) {
        statsEl.textContent = `🌍 ${wc.totalCountries} Countries · 🗺️ ${wc.totalRegions.toLocaleString()} Regions · 💾 ${wc.cachedCountries + wc.cachedRegions} downloaded (+${FLAG_CATALOG.length} built-in offline)`;
      } else {
        statsEl.textContent = `⭐ ${FLAG_CATALOG.length} built-in offline flags ready`;
      }
    }

    // Populate Country Selector for Regional Flags (narrowed by Continent!)
    const regBar = $('flag-region-bar');
    const regSel = $('flag-country-select');
    const showRegBar = scope === 'regions';
    if (regBar) regBar.style.display = showRegBar ? 'block' : 'none';

    const regCountries = getCountriesWithRegions(cont);
    if (regSel && showRegBar) {
      let activeCountry = pickerState.country || 'ALL';
      if (activeCountry !== 'ALL' && !regCountries.some(rc => rc.code === activeCountry)) {
        activeCountry = regCountries.length ? regCountries[0].code : 'ALL';
        pickerState.country = activeCountry;
      }
      regSel.innerHTML = `<option value="ALL">🌍 All Countries (${regCountries.length} countries with regional flags)</option>` +
        regCountries.map(rc => `<option value="${rc.code}">${rc.name} (${rc.code}) — ${rc.count} regions${rc.cached ? ` · ${rc.cached} cached` : ''}</option>`).join('');
      regSel.value = activeCountry;
      $('flag-quick-countries')?.querySelectorAll('button[data-qcc]').forEach(b => {
        b.classList.toggle('active-chip', b.dataset.qcc === activeCountry);
      });
    }

    const allEntries = buildFullFlagEntries();
    const q = normText(query.trim());
    const curVal = (tgt[slot] || '').toUpperCase();

    const matchesFilter = (f, ignoreScopeForSearch = false) => {
      if (!ignoreScopeForSearch) {
        if (scope === 'countries' && f.isRegion) return false;
        if (scope === 'regions') {
          if (!f.isRegion) return false;
          if (!q && pickerState.country && pickerState.country !== 'ALL' && f.country !== pickerState.country) return false;
        }
        if (scope === 'builtin' && !f.builtin) return false;
      }
      if (cont === 'cached') {
        if (!f.cached) return false;
      } else if (cont && cont !== 'all') {
        if (f.continent !== cont) return false;
      }
      if (q) {
        const hay = normText(`${f.name} ${f.native || ''} ${f.code} ${f.countryName || ''} ${f.aliases || ''}`);
        return hay.includes(q);
      }
      return true;
    };

    let filtered = allEntries.filter(f => matchesFilter(f, false));
    // Smart fallback: if typing a region name (e.g. "Tokyo" or "Andalusia") while on Countries tab, auto-include regions!
    let autoBroadened = false;
    if (q && filtered.length === 0) {
      filtered = allEntries.filter(f => matchesFilter(f, true));
      autoBroadened = filtered.length > 0;
    }

    const gridEl = $('flag-picker-grid');
    if (gridEl) {
      // Cancel in-flight image requests from previous filter tab so Chrome's 6 HTTP/1.1 sockets serve the new view immediately!
      gridEl.querySelectorAll('img.fgc-flag-img').forEach(im => {
        if (!im.complete) im.removeAttribute('src');
      });
    }

    const defaultCap = (cont === 'all' && !q && (scope === 'countries' || scope === 'all' || pickerState.country === 'ALL')) ? 72 : 180;
    const LIMIT = showAll ? filtered.length : defaultCap;
    const shown = filtered.slice(0, LIMIT);
    const escAttr = s => String(s || '').replace(/"/g, '&quot;');

    gridEl.innerHTML = shown.map(f => `
      <button type="button" class="flag-tile ${curVal === f.code ? 'selected' : ''}" data-pick-code="${escAttr(f.code)}" title="${escAttr(f.name + (f.native ? ' (' + f.native + ')' : '') + ' · ' + f.code + (f.cached ? ' · Offline Ready' : ' · On-Demand'))}">
        <span class="flag-tile-svg">${f.svg}</span>
        <span class="flag-tile-info">
          <span class="flag-tile-name">${f.name}</span>
          <span class="flag-tile-code"><span class="flag-tile-dot ${f.cached ? '' : 'is-remote'}"></span>${f.code}${f.isRegion && f.countryName && (q || pickerState.country === 'ALL') ? ` · ${f.country}` : ''}</span>
        </span>
      </button>
    `).join('') || '<div style="color:var(--muted);padding:12px;">No flags matched your search.</div>';

    if ($('flag-results-summary')) {
      $('flag-results-summary').textContent = `Showing ${shown.length} of ${filtered.length} matching flags${autoBroadened ? ' (expanded to include regions)' : ''} · 🟢 Offline ready · 🔵 On-demand auto-cache`;
    }
    const showAllBtn = $('btn-flag-show-all');
    if (showAllBtn) {
      const hasMore = filtered.length > shown.length;
      showAllBtn.style.display = hasMore ? 'inline-flex' : 'none';
      if (hasMore) showAllBtn.textContent = `Show All ${filtered.length} Flags`;
    }
  }

  function getThemeGameMeta(t) {
    const id = String(t?.id || '');
    const cat = String(t?.cat || '');
    if (cat === 'ssbu' || id.startsWith('ssbu-')) {
      return {
        gameKey: 'ssbu',
        gameTag: 'SMASH',
        is2v2: Boolean(t?.is2v2 || t?.cfg?.is2v2 || id.includes('2v2') || id.includes('doubles'))
      };
    }
    if (cat === '2xko' || id.startsWith('2xko-') || id === 'fgc-hex-arcane') {
      return { gameKey: '2xko', gameTag: '2XKO', is2v2: false };
    }
    if (cat === 'ffcotw' || id.startsWith('ffcotw-')) {
      return { gameKey: 'ffcotw', gameTag: 'COTW', is2v2: false };
    }
    if (cat === 'avatar' || id.startsWith('avatar-')) {
      return { gameKey: 'avatar', gameTag: 'AVATAR', is2v2: false };
    }
    if (cat === 'mk1' || id.startsWith('mk1-')) {
      return { gameKey: 'mk1', gameTag: 'MK1', is2v2: false };
    }
    if (cat === 'sf6' || id.startsWith('sf6-') || id === 'fgc-metro-clash') {
      return { gameKey: 'sf6', gameTag: 'SF6', is2v2: false };
    }
    if (id.startsWith('t8-') || cat === 'tekken' || cat === 'blade' || cat === 'char') {
      return { gameKey: 'tekken8', gameTag: 'TK8', is2v2: false };
    }
    return { gameKey: 'fgc', gameTag: 'FGC', is2v2: false };
  }

  let lastThumbSig = '';
  function buildThemeMiniPreview(t) {
    const pv = t.pv;
    const fMode = state.flagMode || 'both';
    const getFlagsHtml = (p, accent) => {
      if (fMode === 'none') return '';
      const f1 = (fMode === 'both' || fMode === 'country') && p.flag && FLAGS_MAP[p.flag] ? FLAGS_MAP[p.flag].svg : '';
      const f2 = (fMode === 'both' || fMode === 'region') && p.region && FLAGS_MAP[p.region] && p.region !== p.flag ? FLAGS_MAP[p.region].svg : '';
      const list = [f1, f2].filter(Boolean);
      if (!list.length) return '';
      const flags = list.map(svg => `<span class="mt-flag">${svg}</span>`).join('');
      const slash = pv.fs === 'blade' ? `<span class="mt-slash" style="background:${accent}"></span>` : '';
      return `<div class="mt-flags fs-${pv.fs}">${flags}${slash}</div>`;
    };

    const p1Bg = pv.bg1 || pv.bg;
    const p2Bg = pv.bg2 || pv.bg;
    const borderP1 = pv.fullBorder ? `border:1.5px solid ${pv.p1}` : `border-bottom:1.8px solid ${pv.p1}`;
    const borderP2 = pv.fullBorder ? `border:1.5px solid ${pv.p2}` : `border-bottom:1.8px solid ${pv.p2}`;
    const prismCls = pv.prism ? 'mt-prism' : '';
    const n1 = (state.p1?.name || 'PLAYER 1').slice(0, 10);
    const n2 = (state.p2?.name || 'PLAYER 2').slice(0, 10);
    const sp1 = state.p1?.sponsor ? `<i style="color:${pv.sp1}">${state.p1.sponsor.slice(0, 7)}</i>` : '';
    const sp2 = state.p2?.sponsor ? `<i style="color:${pv.sp2}">${state.p2.sponsor.slice(0, 7)}</i>` : '';
    const rd = (state.round || 'ROUND 1').slice(0, 12);

    const gm = getThemeGameMeta(t);
    const isSf6 = gm.gameKey === 'sf6';
    const is2xko = gm.gameKey === '2xko';
    const isCotw = gm.gameKey === 'ffcotw';
    const isSmashThumb = gm.gameKey === 'ssbu';
    const isAvatar = gm.gameKey === 'avatar';
    const isMk1 = gm.gameKey === 'mk1';

    // Dedicated 1:1 faithful miniature renderer for ALL 5 Super Smash Bros. Ultimate styles (1v1 & 2v2!)
    if (isSmashThumb) {
      const smStyle = t.cfg?.smashStyle || pv.smStyle || (String(t.id).includes('pill') ? 'pill' : 'major');
      const isPill = smStyle === 'pill';
      const isSlant = smStyle === 'slant';
      const isKagaribi = smStyle === 'kagaribi';
      const isGlass = smStyle === 'glass';
      const isDoubles = Boolean(t.is2v2 || t.cfg?.is2v2 || String(t.id).includes('2v2') || String(t.id).includes('doubles'));
      const styleCls = `${isPill ? 'is-pill' : ''} ${isSlant ? 'is-slant' : ''} ${isKagaribi ? 'is-kagaribi' : ''} ${isGlass ? 'is-glass' : ''} ${isDoubles ? 'is-doubles' : ''}`;
      const f1 = state.p1?.flag && FLAGS_MAP[state.p1.flag] ? `<span class="mt-sm-f">${FLAGS_MAP[state.p1.flag].svg}</span>` : '';
      const f2 = state.p2?.flag && FLAGS_MAP[state.p2.flag] ? `<span class="mt-sm-f">${FLAGS_MAP[state.p2.flag].svg}</span>` : '';
      const bar1Style = isPill
        ? `background:linear-gradient(90deg,#9f1239,${pv.p1});`
        : isGlass
          ? `background:${p1Bg};border-top:2px solid ${pv.p1};`
          : `background:${p1Bg};border-bottom:2px solid ${pv.p1};`;
      const bar2Style = isPill
        ? `background:linear-gradient(270deg,#1e3a8a,${pv.p2});`
        : isGlass
          ? `background:${p2Bg};border-top:2px solid ${pv.p2};`
          : `background:${p2Bg};border-bottom:2px solid ${pv.p2};`;
      const infoExtraStyle = isKagaribi ? 'background:#fff;color:#0f172a;border-left-color:#dc2626;' : '';
      const logoExtraStyle = isKagaribi ? 'background:#fff;color:#0f172a;' : '';
      const logoHtml = state.vs?.logoUrl
        ? `<img src="${state.vs.logoUrl}" style="width:100%;height:100%;object-fit:contain;" alt="" />`
        : 'SSBU';
      return `
        <div class="theme-thumb is-ssbu">
          <div class="mt-ssbu-hud" aria-hidden="true">
            <span class="mt-sm-timer">6:38</span>
            <div class="mt-sm-bottom-hud">
              <span class="mt-sm-pct">47%</span>
              <span class="mt-sm-pct" style="border-color:#3b82f6;">79%</span>
            </div>
          </div>
          <div class="mt-sm-stage">
            <div class="mt-sm-info ${isPill ? 'is-pill' : ''}" style="${infoExtraStyle}">${rd}</div>
            <div class="mt-sm-cluster">
              <div class="mt-sm-side p1">
                <div class="mt-sm-bar ${styleCls}" style="${bar1Style}">
                  <div class="mt-sm-body">
                    <span>${sp1}${n1}</span>
                    ${isDoubles ? `<span class="mt-sm-p2row">${(state.p1?.partnerName || 'TEAMMATE 1').slice(0, 10)}</span>` : ''}
                  </div>
                  <div class="mt-sm-score" style="background:${pv.sc1};color:${pv.sct || '#fff'}">${state.p1?.score ?? 0}</div>
                </div>
                <div class="mt-sm-sub"><i>S1</i>${f1}</div>
              </div>
              <div class="mt-sm-logo ${isPill ? 'is-pill' : ''}" style="border-color:${pv.cborder};${logoExtraStyle}">${logoHtml}</div>
              <div class="mt-sm-side p2">
                <div class="mt-sm-bar ${styleCls}" style="${bar2Style}">
                  <div class="mt-sm-body">
                    <span>${n2}${sp2}</span>
                    ${isDoubles ? `<span class="mt-sm-p2row">${(state.p2?.partnerName || 'TEAMMATE 2').slice(0, 10)}</span>` : ''}
                  </div>
                  <div class="mt-sm-score" style="background:${pv.sc2};color:${pv.sct2 || pv.sct || '#fff'}">${state.p2?.score ?? 0}</div>
                </div>
                <div class="mt-sm-sub">${f2}<i>S2</i></div>
              </div>
            </div>
          </div>
        </div>`;
    }

    const thumbCls = isSf6 ? 'is-sf6' : is2xko ? 'is-2xko' : isCotw ? 'is-ffcotw' : isAvatar ? 'is-avatar' : isMk1 ? 'is-mk1' : '';
    const avSub = pv.avStyle ? `av-${pv.avStyle}` : '';
    const mkSub = pv.mkStyle ? `mk-${pv.mkStyle}` : '';
    const stageExtraCls = is2xko ? 'mt-2xko-stage' : isCotw ? 'mt-cotw-stage' : isAvatar ? `mt-avatar-stage ${avSub}` : isMk1 ? `mt-mk1-stage ${mkSub}` : '';
    const hudBackdropHtml = isSf6
      ? `<div class="mt-sf6-hud" aria-hidden="true">
           <span class="mt-sf6-ctrl l">M</span>
           <div class="mt-sf6-wins l"><i class="off"></i><i></i></div>
           <div class="mt-sf6-bar l"></div>
           <div class="mt-sf6-drive l"></div>
           <div class="mt-sf6-timer">99</div>
           <div class="mt-sf6-wins r"><i></i><i class="off"></i></div>
           <div class="mt-sf6-bar r"></div>
           <div class="mt-sf6-drive r"></div>
           <span class="mt-sf6-ctrl r">C</span>
         </div>`
      : is2xko
      ? `<div class="mt-2xko-hud" aria-hidden="true">
           <div class="mt-2xko-bar l"><i></i><i></i></div>
           <div class="mt-2xko-brk l"></div>
           <div class="mt-2xko-bar r"><i></i><i></i></div>
           <div class="mt-2xko-brk r"></div>
         </div>`
      : isCotw
      ? `<div class="mt-cotw-hud" aria-hidden="true">
           <div class="mt-cotw-bar l"></div>
           <div class="mt-cotw-rev l"></div>
           <div class="mt-cotw-timer">57</div>
           <div class="mt-cotw-bar r"></div>
           <div class="mt-cotw-rev r"></div>
         </div>`
      : isAvatar
      ? `<div class="mt-avatar-hud" aria-hidden="true">
           <div class="mt-avatar-bar l"></div>
           <div class="mt-avatar-spirit l"></div>
           <div class="mt-avatar-timer"><b>41</b></div>
           <div class="mt-avatar-bar r"></div>
           <div class="mt-avatar-spirit r"></div>
         </div>`
      : isMk1
      ? `<div class="mt-mk1-hud" aria-hidden="true">
           <div class="mt-mk1-orbs l ${['sockets','hourglass'].includes(pv.mkStyle) ? 'is-socket' : ''}"><i></i><i></i></div>
           <div class="mt-mk1-bar l"></div>
           <div class="mt-mk1-timer">89</div>
           <div class="mt-mk1-orbs r ${['sockets','hourglass'].includes(pv.mkStyle) ? 'is-socket' : ''}"><i></i><i></i></div>
           <div class="mt-mk1-bar r"></div>
         </div>`
      : `<div class="mt-t8-hud" aria-hidden="true">
           <div class="mt-t8-orbs l"><i></i><i></i><i class="on"></i></div>
           <div class="mt-t8-bar l"></div>
           <div class="mt-t8-timer">58</div>
           <div class="mt-t8-orbs r"><i class="on"></i><i></i><i></i></div>
           <div class="mt-t8-bar r"></div>
         </div>`;
    const cBorderCol = pv.cborder || pv.p1;
    const t8MetaHtml = t.id === 't8-pro-meta-strip'
      ? `<div class="mt-meta-mini p1">SEED 1 · @P1</div><div class="mt-meta-mini p2">@P2 · SEED 2</div><div class="mt-bottom-mini">TOURNAMENT LIVE</div>`
      : '';

    return `
      <div class="theme-thumb ${thumbCls}">
        ${hudBackdropHtml}
        ${t8MetaHtml}
        <div class="mt-stage lay-${pv.lay} ${stageExtraCls} ${pv.outer ? 'outer-score' : ''}">
          ${pv.bridge ? `<div class="mt-bridge" style="background:${pv.bridge}"></div>` : ''}
          <div class="mt-wing p1 sh-${pv.sh} ${prismCls}" style="background:${p1Bg};${borderP1};color:${pv.tx}">
            ${pv.edge ? `<span class="mt-edge" style="background:${pv.p1}"></span>` : ''}
            ${getFlagsHtml(state.p1 || {}, pv.p1)}
            <span class="mt-name" style="color:${pv.tx}">${sp1}${n1}</span>
            <span class="mt-score" style="background:${pv.sc1};color:${pv.sct}">${state.p1?.score ?? 0}</span>
          </div>
          <div class="mt-center cs-${pv.cs} ${prismCls}" style="background:${pv.cbg};color:${pv.ct};border-bottom:${pv.cs === 'float' ? 'none' : `1.5px solid ${cBorderCol}`}">
            ${rd}
          </div>
          <div class="mt-wing p2 sh-${pv.sh} ${prismCls}" style="background:${p2Bg};${borderP2};color:${pv.tx}">
            ${pv.edge ? `<span class="mt-edge" style="background:${pv.p2}"></span>` : ''}
            ${getFlagsHtml(state.p2 || {}, pv.p2)}
            <span class="mt-name" style="color:${pv.tx}">${n2}${sp2}</span>
            <span class="mt-score" style="background:${pv.sc2};color:${pv.sct2 || pv.sct}">${state.p2?.score ?? 0}</span>
          </div>
        </div>
      </div>`;
  }

  function renderThemeGallery() {
    if (currentCat === 'my-presets') {
      const cnt = presetsDb.filter(p => (p.scope || 'scorebar') === 'scorebar').length;
      if ($('theme-count')) $('theme-count').textContent = cnt;
      lastThumbSig = `my-presets|${cnt}`;
      if (window.FGC_PRESETS_UI) window.FGC_PRESETS_UI.renderSidebarMyPresets('scorebar', $('theme-grid'));
      return;
    }
    const q = normText(themeSearch.trim());
    const list = THEMES.filter(t => {
      const gm = getThemeGameMeta(t);
      if (q) {
        return normText(`${t.name} ${t.layout} ${t.desc} ${t.cat} ${gm.gameTag} ${gm.is2v2 ? '2v2 doubles duo' : '1v1 singles'}`).includes(q);
      }
      if (currentGameFilter !== 'all' && gm.gameKey !== currentGameFilter) return false;
      if (currentCat === '2v2') return gm.is2v2;
      if (currentCat === '1v1') return !gm.is2v2;
      if (currentCat === 'all') return true;
      return t.cat === currentCat;
    });
    $('theme-count').textContent = list.length;
    lastThumbSig = `${currentGameFilter}|${currentCat}|${q}|${state.flagMode}|${state.p1?.flag}|${state.p1?.region}|${state.p2?.flag}|${state.p2?.region}|${state.p1?.name}|${state.p2?.name}|${state.p1?.score}|${state.p2?.score}|${state.round}`;
    $('theme-grid').innerHTML = list.map(t => {
      const gm = getThemeGameMeta(t);
      const tagCls = `tag-${gm.gameTag.toLowerCase()}`;
      return `
      <button type="button" class="theme-card ${state.theme === t.id ? 'active' : ''}" data-theme-id="${t.id}">
        ${buildThemeMiniPreview(t)}
        <div class="theme-name">
          <span>${t.name}</span>
          <span class="theme-badges-row">
            <span class="game-cal-tag ${tagCls}" data-no-i18n>${gm.gameTag}</span>
            ${gm.is2v2 ? '<span class="game-cal-tag tag-2v2" data-no-i18n>2v2</span>' : ''}
            <span class="theme-badge">${t.layout}</span>
          </span>
        </div>
        <div class="theme-desc">${t.desc}</div>
      </button>`;
    }).join('') || '<div style="padding:18px;text-align:center;color:var(--muted);font-size:11px;">No designs matched that filter.</div>';
  }

  function setActiveWorkspace(ws) {
    if (!['scorebars', 'vs', 'brackets', 'results', 'tournaments'].includes(ws)) ws = 'scorebars';
    activeWorkspace = ws;
    try { localStorage.setItem('fgc_active_workspace', ws); } catch {}
    $('top-workspace-nav')?.querySelectorAll('button[data-ws]').forEach(b => {
      b.classList.toggle('active-ws', b.dataset.ws === ws);
    });
    document.querySelectorAll('.workspace-view').forEach(v => {
      v.classList.toggle('active', v.id === `ws-${ws}`);
    });
    const isVs = ws === 'vs';
    const isBk = ws === 'brackets';
    const isRes = ws === 'results';
    $('hdr-group-scorebars')?.classList.toggle('hidden', isVs || isBk || isRes);
    $('hdr-group-vs')?.classList.toggle('hidden', !isVs);
    $('hdr-group-brackets')?.classList.toggle('hidden', !isBk);
    $('hdr-group-results')?.classList.toggle('hidden', !isRes);
    if ($('btn-am-go-scorebar')) $('btn-am-go-scorebar').style.display = ws === 'scorebars' ? 'none' : 'inline-flex';
    syncWorkspaceLayout();
    if (isVs || isBk || isRes) pushPreviewConfig();
  }

  function syncWorkspaceLayout() {
    const isNarrow = window.innerWidth <= 1320;
    const useSidebar = !isNarrow && !sidebarCollapsed;
    const shell = $('workspace-shell');
    const body = $('designs-panel-body');
    const sidebar = $('designs-sidebar');
    const tabHost = $('tab-designs');
    const tabBtn = $('tab-btn-designs');

    shell.classList.toggle('sidebar-collapsed', !useSidebar);
    $('btn-toggle-sidebar').classList.toggle('active-chip', useSidebar);
    $('btn-toggle-sidebar').style.display = (activeWorkspace === 'scorebars' && !isNarrow) ? 'inline-flex' : 'none';
    tabBtn.style.display = useSidebar ? 'none' : 'inline-flex';

    if (useSidebar) {
      if (body.parentElement !== sidebar) sidebar.appendChild(body);
      // If Designs tab was active before expanding back to sidebar, switch tab back to Style Studio
      if (tabHost.classList.contains('active')) {
        $('bottom-tabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.tab === 'tweaks'));
        document.querySelectorAll('#ws-scorebars .tab-pane').forEach(p => p.classList.toggle('active', p.id === 'tab-tweaks'));
      }
    } else {
      if (body.parentElement !== tabHost) tabHost.appendChild(body);
    }

    $('preview-card').classList.toggle('is-pinned', previewPinned);
    $('btn-pin-preview').classList.toggle('active-chip', previewPinned);
    $('vs-preview-card')?.classList.toggle('is-pinned', vsPreviewPinned);
    $('btn-pin-vs')?.classList.toggle('active-chip', vsPreviewPinned);
    $('bk-preview-card')?.classList.toggle('is-pinned', bkPreviewPinned);
    $('btn-pin-bk')?.classList.toggle('active-chip', bkPreviewPinned);
    $('res-preview-card')?.classList.toggle('is-pinned', resPreviewPinned);
    $('btn-pin-res')?.classList.toggle('active-chip', resPreviewPinned);
  }

  function renderPlayersDb() {
    $('players-list').innerHTML = playersDb.map((p, idx) => {
      const f1 = p.flag && FLAGS_MAP[p.flag] ? `<span>${FLAGS_MAP[p.flag].svg}</span>` : '';
      const f2 = p.region && FLAGS_MAP[p.region] ? `<span>${FLAGS_MAP[p.region].svg}</span>` : '';
      const flagsHtml = (f1 || f2) ? `<span class="mini-db-flags">${f1}${f2}</span>` : '';
      const label = [p.flag, p.region].filter(Boolean).join(' + ') || 'No flag';
      return `
      <div class="player-row">
        <div class="player-row-meta">
          <strong>${p.seed ? `<span class="trn-seed-chip" style="margin-right:4px;">#${p.seed}</span>` : ''}${flagsHtml}${p.sponsor ? `<span style="color:var(--gold)">${p.sponsor}</span> ` : ''}${p.name}</strong>
          <span>${label}${p.character ? ` · ${p.character}` : ''}</span>
        </div>
        <div class="player-row-btns">
          <button data-load-p1="${idx}" style="border-color:var(--p1);">P1</button>
          <button data-load-t1="${idx}" style="border-color:rgba(255,114,53,0.55);font-size:10px;padding:3px 6px;" title="Load as Teammate 1">T1</button>
          <button data-load-p2="${idx}" style="border-color:var(--p2);">P2</button>
          <button data-load-t2="${idx}" style="border-color:rgba(139,92,246,0.55);font-size:10px;padding:3px 6px;" title="Load as Teammate 2">T2</button>
          <button data-del-player="${idx}" title="Delete">✕</button>
        </div>
      </div>`;
    }).join('') || '<div style="color:var(--muted)">No saved players yet.</div>';
    if (comboOpenSide) renderPlayerPopover(comboOpenSide);
  }

  /* Compact Visual Player Popover Controller */
  let comboOpenSide = null;
  let comboHighlight = 0;
  let comboQuery = '';

  function getFilteredPlayers(query) {
    const q = normText((query || '').trim());
    if (!q) return playersDb;
    return playersDb.filter(p => {
      const hay = normText(`${p.name} ${p.sponsor || ''} ${p.flag || ''} ${p.region || ''} ${p.character || ''}`);
      return hay.includes(q);
    });
  }

  function openPlayerPopover(side, filterText = '') {
    closePlayerPopover();
    comboOpenSide = side;
    comboHighlight = 0;
    comboQuery = filterText;
    renderPlayerPopover(side, filterText);
    $(`${side}-popover`).classList.add('open');
  }

  function closePlayerPopover() {
    if (!comboOpenSide) return;
    $(`${comboOpenSide}-popover`)?.classList.remove('open');
    comboOpenSide = null;
  }

  function lookupPlayerProfile(name) {
    const key = normText(name).trim();
    if (!key) return null;
    const saved = playersDb.find(x => normText(x.name).trim() === key);
    let avatar = saved?.avatar || '';
    const snap = trnState.snapshot;
    if (!avatar && snap) {
      const part = (snap.participants || []).find(x => normText(x.name).trim() === key && x.avatar);
      if (part?.avatar) avatar = part.avatar;
      if (!avatar) {
        const allSets = [...(snap.streamQueue || []), ...(snap.sets || [])];
        for (const s of allSets) {
          if (normText(s.p1?.name).trim() === key && s.p1?.avatar) { avatar = s.p1.avatar; break; }
          if (normText(s.p2?.name).trim() === key && s.p2?.avatar) { avatar = s.p2.avatar; break; }
        }
      }
    }
    if (!saved && !avatar) return null;
    return { ...(saved || {}), avatar };
  }

  function hasSelectOption(selectEl, val) {
    if (!selectEl || !val) return false;
    return Array.from(selectEl.options || []).some(o => o.value === val);
  }

  function getPartnerDraft(baseSide) {
    const p = state[baseSide] || {};
    return {
      name: p.partnerName || '',
      sponsor: p.partnerSponsor || '',
      flag: p.partnerFlag || '',
      region: p.partnerRegion || '',
      character: p.partnerChar || '',
      pronouns: p.partnerPronouns || '',
      avatar: ''
    };
  }

  function applyPlayerToSide(slotKey, p) {
    const idx = playersDb.findIndex(x => x.name.toLowerCase() === p.name.toLowerCase());
    if (idx > 0) {
      const [moved] = playersDb.splice(idx, 1);
      playersDb.unshift(moved);
      renderPlayersDb();
    }
    if (slotKey === 'p1-partner' || slotKey === 'p2-partner' || slotKey === 'p1-coop' || slotKey === 'p2-coop') {
      const baseSide = slotKey.startsWith('p1') ? 'p1' : 'p2';
      const isPartner = slotKey.endsWith('-partner');
      const patch = {
        partnerName: p.name,
        partnerSponsor: p.sponsor || ''
      };
      if (isPartner) {
        patch.partnerFlag = p.flag || '';
        patch.partnerRegion = p.region || '';
        if (p.character && hasSelectOption($(`${baseSide}-partner-char`), p.character)) {
          patch.partnerChar = p.character;
        }
        if (p.pronouns) patch.partnerPronouns = p.pronouns;
      }
      commitState({ [baseSide]: patch }, true);
      if ($(`${slotKey}-name`)) $(`${slotKey}-name`).value = p.name;
      if ($(`${baseSide}-partner-name`)) $(`${baseSide}-partner-name`).value = p.name;
      if ($(`${baseSide}-coop-name`)) $(`${baseSide}-coop-name`).value = p.name;
      closePlayerPopover();
      const lbl = baseSide === 'p1' ? 'TEAMMATE 1' : 'TEAMMATE 2';
      toast(`${lbl} → ${p.sponsor ? `[${p.sponsor}] ` : ''}${p.name}`);
      return;
    }
    const prof = lookupPlayerProfile(p.name);
    const nextAvatar = p.avatar || prof?.avatar || '';
    const nextChar = (p.character && hasSelectOption($(`${slotKey}-char`), p.character))
      ? p.character
      : (p.character || state[slotKey].character);
    const patch = {
      name: p.name,
      sponsor: p.sponsor || '',
      flag: p.flag || '',
      region: p.region || '',
      character: nextChar,
      avatar: nextAvatar
    };
    if (p.pronouns) patch.pronouns = p.pronouns;
    if (p.handle) patch.handle = p.handle;
    if (p.seed) patch.seed = String(p.seed);
    commitState({ [slotKey]: patch }, true);
    $(`${slotKey}-name`).value = p.name;
    closePlayerPopover();
    toast(`${slotKey.toUpperCase()} → ${p.sponsor ? `[${p.sponsor}] ` : ''}${p.name}`);
  }

  function renderPlayerPopover(side, forcedFilter) {
    const pop = $(`${side}-popover`);
    if (!pop) return;
    if (forcedFilter !== undefined) comboQuery = forcedFilter;
    const typed = comboQuery;
    const rawVal = $(`${side}-name`)?.value || '';
    const list = getFilteredPlayers(typed);
    if (comboHighlight >= list.length) comboHighlight = Math.max(0, list.length - 1);

    const rowsHtml = list.slice(0, 40).map((p, i) => {
      const f1 = p.flag && FLAGS_MAP[p.flag] ? `<span>${FLAGS_MAP[p.flag].svg}</span>` : '';
      const f2 = p.region && FLAGS_MAP[p.region] ? `<span>${FLAGS_MAP[p.region].svg}</span>` : '';
      const flags = (f1 || f2) ? `<span class="pop-flags">${f1}${f2}</span>` : '';
      const sp = p.sponsor ? `<span class="pop-sp">${p.sponsor}</span>` : '';
      const ch = p.character ? `<span class="pop-ch">${p.character}</span>` : '';
      const rawAv = p.avatar || lookupPlayerProfile(p.name)?.avatar || '';
      const avSrc = rawAv ? (/^https?:\/\//i.test(rawAv) && isHttp ? `/api/avatar-proxy?url=${encodeURIComponent(rawAv)}` : rawAv) : '';
      const avHtml = avSrc ? `<img class="pop-av" src="${avSrc}" alt="" />` : '';
      return `
        <button type="button" class="pop-item ${i === comboHighlight ? 'hl' : ''}" data-pop-name="${p.name.replace(/"/g, '&quot;')}">
          <span class="pop-item-left">${avHtml}${flags}${sp}<span class="pop-nm">${p.name}</span></span>
          ${ch}
        </button>`;
    }).join('');

    const exactExists = rawVal.trim() && playersDb.some(p => p.name.toLowerCase() === rawVal.trim().toLowerCase());
    const saveFooter = (rawVal.trim() && !exactExists)
      ? `<button type="button" class="pop-save-btn" data-pop-save="1">💾 Save "${rawVal.trim()}" to roster</button>`
      : '';

    pop.innerHTML = `
      <div class="pop-head">
        <span>⚡ Players (${list.length})</span>
        ${typed.trim() ? `<button type="button" data-pop-clear="1" style="padding:1px 6px;font-size:10px;border-radius:4px;">Show all</button>` : '<span>↑↓ Enter · Esc</span>'}
      </div>
      <div class="pop-list">${rowsHtml || '<div style="padding:10px;text-align:center;color:var(--muted);font-size:11px;">No matches found</div>'}</div>
      ${saveFooter}`;
  }

  function setIfNotFocused(el, val) {
    if (!el) return;
    if (document.activeElement !== el) el.value = val ?? '';
  }

  function renderUI() {
    $('ui-p1-score').textContent = state.p1.score;
    $('ui-p2-score').textContent = state.p2.score;
    $('ui-format-badge').textContent = state.format || 'FREE';

    setIfNotFocused($('p1-name'), state.p1.name);
    setIfNotFocused($('p1-sponsor'), state.p1.sponsor);
    renderFlagTrigger('p1', 'flag', state.p1.flag);
    renderFlagTrigger('p1', 'region', state.p1.region);
    if ($('ico-p1-partner-flag')) renderFlagTrigger('p1-partner', 'flag', state.p1.partnerFlag);
    if ($('ico-p1-partner-region')) renderFlagTrigger('p1-partner', 'region', state.p1.partnerRegion);
    $('p1-bracket').value = state.p1.bracket || '';
    $('p1-char').value = state.p1.character || '';
    renderAvatarBox('p1', state.p1.avatar || '');

    setIfNotFocused($('p2-name'), state.p2.name);
    setIfNotFocused($('p2-sponsor'), state.p2.sponsor);
    renderFlagTrigger('p2', 'flag', state.p2.flag);
    renderFlagTrigger('p2', 'region', state.p2.region);
    if ($('ico-p2-partner-flag')) renderFlagTrigger('p2-partner', 'flag', state.p2.partnerFlag);
    if ($('ico-p2-partner-region')) renderFlagTrigger('p2-partner', 'region', state.p2.partnerRegion);
    $('p2-bracket').value = state.p2.bracket || '';
    $('p2-char').value = state.p2.character || '';
    renderAvatarBox('p2', state.p2.avatar || '');

    setIfNotFocused($('round-input'), state.round);
    $('format-select').value = state.format || '';

    const fMode = state.flagMode || (state.showFlags === false ? 'none' : 'both');
    $('flag-mode-bar').querySelectorAll('button').forEach(b => {
      b.classList.toggle('active-chip', b.dataset.flagMode === fMode);
    });
    $('chk-format').checked = state.showFormat !== false;
    $('chk-mp').checked = state.showMatchPoint !== false;
    $('chk-chars').checked = Boolean(state.showCharacters);
    $('chk-casters').checked = Boolean(state.showCommentators);
    if ($('chk-meta-strip')) $('chk-meta-strip').checked = Boolean(state.showMetaStrip);
    if ($('chk-bottom-bar')) $('chk-bottom-bar').checked = Boolean(state.showBottomBar);
    if ($('chk-seed')) $('chk-seed').checked = Boolean(state.showSeed);
    if ($('chk-seed-sync-sb')) $('chk-seed-sync-sb').checked = Boolean(state.showSeed);
    if ($('chk-pronouns')) $('chk-pronouns').checked = state.showPronouns !== false;
    if ($('chk-variant')) $('chk-variant').checked = state.showVariant !== false;
    if ($('chk-stock')) $('chk-stock').checked = state.showStockIcon !== false;
    if ($('chk-stage')) $('chk-stage').checked = Boolean(state.showStage);

    syncGameExtraUI();
    for (const side of ['p1', 'p2']) {
      const p = state[side] || {};
      if ($(`${side}-seed`)) setIfNotFocused($(`${side}-seed`), p.seed || '');
      if ($(`${side}-pronouns`)) setIfNotFocused($(`${side}-pronouns`), p.pronouns || '');
      if ($(`${side}-handle`)) setIfNotFocused($(`${side}-handle`), p.handle || '');
      if ($(`${side}-variant`)) $(`${side}-variant`).value = p.variant || '';
      if ($(`${side}-char2`)) $(`${side}-char2`).value = p.secondaryChar || '';
      if ($(`${side}-coop-name`)) setIfNotFocused($(`${side}-coop-name`), p.partnerName || '');
      if ($(`${side}-partner-name`)) setIfNotFocused($(`${side}-partner-name`), p.partnerName || '');
      if ($(`${side}-partner-char`)) $(`${side}-partner-char`).value = p.partnerChar || '';
      if ($(`${side}-partner-pronouns`)) setIfNotFocused($(`${side}-partner-pronouns`), p.partnerPronouns || '');
    }
    if ($('smash-stage-select')) $('smash-stage-select').value = state.stageName || '';
    if ($('tournament-name-inline')) setIfNotFocused($('tournament-name-inline'), state.tournament || '');

    if (pickerState.open) renderFlagPickerModal();

    const visBtn = $('btn-toggle-vis');
    const isVis = state.visible !== false;
    visBtn.textContent = isVis ? '👁 Overlay ON' : '🚫 Overlay HIDDEN';
    visBtn.classList.toggle('is-hidden', !isVis);

    const activeT = THEMES.find(t => t.id === state.theme);
    $('active-theme-label').textContent = activeT ? `${activeT.name} (${activeT.layout})` : state.theme;
    const thumbSig = `${currentGameFilter}|${currentCat}|${normText(themeSearch.trim())}|${state.flagMode}|${state.p1?.flag}|${state.p1?.region}|${state.p2?.flag}|${state.p2?.region}|${state.p1?.name}|${state.p2?.name}|${state.p1?.score}|${state.p2?.score}|${state.round}`;
    if (thumbSig !== lastThumbSig) {
      renderThemeGallery();
    } else {
      document.querySelectorAll('.theme-card').forEach(c => {
        c.classList.toggle('active', c.dataset.themeId === state.theme);
      });
    }

    const tw = state.tweaks || {};
    const st = { ...DEFAULT_STYLE, ...(state.style || {}) };
    $('rng-offsetY').value = tw.offsetY || 0;
    $('val-offsetY').textContent = `${tw.offsetY || 0} px`;
    $('rng-scale').value = tw.scale || 100;
    $('val-scale').textContent = `${tw.scale || 100}%`;
    $('rng-wingSpread').value = tw.wingSpread || 0;
    $('val-wingSpread').textContent = `${tw.wingSpread || 0} px`;
    $('rng-opacity').value = tw.opacity ?? 100;
    $('val-opacity').textContent = `${tw.opacity ?? 100}%`;

    // Sync Style Studio UI
    $('chk-custom-colors').checked = Boolean(st.customColors || tw.customColors);
    $('st-bg1').value = st.bgColor1;
    $('st-bg2').value = st.bgColor2;
    $('rng-bgAngle').value = st.bgAngle;
    $('val-bgAngle').textContent = `${st.bgAngle}°`;
    $('bg-angle-chips')?.querySelectorAll('button[data-ang]').forEach(b => {
      b.classList.toggle('active-chip', Number(b.dataset.ang) === Number(st.bgAngle));
    });
    $('rng-bgAlpha').value = st.bgAlpha;
    $('val-bgAlpha').textContent = `${st.bgAlpha}%`;
    $('rng-glassBlur').value = st.glassBlur ?? 14;
    $('val-glassBlur').textContent = `${st.glassBlur ?? 14} px`;
    $('rng-glassBorder').value = st.glassBorder ?? 22;
    $('val-glassBorder').textContent = `${st.glassBorder ?? 22}%`;
    $('st-p1-1').value = st.p1Color1;
    $('st-p1-2').value = st.p1Color2;
    $('st-p2-1').value = st.p2Color1;
    $('st-p2-2').value = st.p2Color2;
    $('st-c1').value = st.centerColor1;
    $('st-c2').value = st.centerColor2;
    $('st-cacc').value = st.centerAccent;
    $('st-text').value = st.textColor;
    $('st-sponsor').value = st.sponsorColor;
    renderAdaptiveColorStudio(st);

    $('st-font-name').value = st.fontName;
    $('st-font-score').value = st.fontScore;
    $('rng-fontScale').value = st.fontScale;
    $('val-fontScale').textContent = `${st.fontScale}%`;
    $('rng-letterSpacing').value = st.letterSpacing;
    $('val-letterSpacing').textContent = `${st.letterSpacing}`;
    $('chk-uppercase').checked = st.uppercase !== false;

    $('st-layout').value = st.layoutOverride;
    $('st-shape').value = st.shape;
    $('st-centerStyle').value = st.centerStyle || 'theme';
    $('st-outerBlade').value = st.outerBlade || 'theme';
    $('st-scorePos').value = st.scorePosOverride;
    $('st-borderStyle').value = st.borderStyle;
    $('st-isoCode').value = st.showIsoCode || 'theme';
    $('st-entryAnim').value = st.entryAnim;
    $('st-scoreAnim').value = st.scoreAnim;
    const animDurVal = Number(st.animDuration || (st.animSpeed === 'fast' ? 240 : st.animSpeed === 'cinematic' ? 780 : 450));
    $('rng-animDuration').value = animDurVal;
    $('val-animDuration').textContent = `${(animDurVal / 1000).toFixed(2)} s`;
    $('anim-dur-chips')?.querySelectorAll('button[data-dur]').forEach(b => {
      b.classList.toggle('active-chip', Number(b.dataset.dur) === animDurVal);
    });
    const scoreDurVal = Number(st.scoreAnimDuration || 450);
    $('rng-scoreAnimDuration').value = scoreDurVal;
    $('val-scoreAnimDuration').textContent = `${(scoreDurVal / 1000).toFixed(2)} s`;
    $('rng-sceneDelay').value = st.sceneDelay ?? 250;
    $('val-sceneDelay').textContent = `${st.sceneDelay ?? 250} ms`;
    $('scene-delay-chips')?.querySelectorAll('button[data-delay]').forEach(b => {
      b.classList.toggle('active-chip', Number(b.dataset.delay) === Number(st.sceneDelay ?? 250));
    });
    $('chk-scene-auto').checked = st.sceneAutoIntro !== false;
    $('chk-intro-stagger').checked = st.introStagger !== false;
    $('chk-intro-flash').checked = st.introFlash !== false;
    $('chk-intro-set').checked = Boolean(st.introOnSetChange);

    $('rng-bladeSlant').value = st.bladeSlant ?? 22;
    $('val-bladeSlant').textContent = `${st.bladeSlant ?? 22} px`;
    $('rng-flagWidth').value = st.flagWidth ?? 62;
    $('val-flagWidth').textContent = `${st.flagWidth ?? 62} px`;
    $('rng-flagOpacity').value = st.flagOpacity ?? 100;
    $('val-flagOpacity').textContent = `${st.flagOpacity ?? 100}%`;
    $('rng-barHeight').value = st.barHeight ?? 0;
    $('val-barHeight').textContent = (st.barHeight && st.barHeight >= 30) ? `${st.barHeight} px` : 'Auto';

    const syncSeg = (containerId, val) => {
      $(containerId)?.querySelectorAll('button[data-val]').forEach(b => {
        b.classList.toggle('active-chip', b.dataset.val === val);
      });
    };
    syncSeg('seg-fill-mode', st.fillMode);
    syncSeg('seg-flagStyle', st.flagStyle === 'twt-slant' ? 'blade-twt' : (st.flagStyle || 'theme'));
    syncSeg('seg-flagFit', st.flagFit || 'fit');
    const fz = Number(st.flagZoom ?? 100);
    const fx = Number(st.flagShiftX ?? 0);
    const fy = Number(st.flagShiftY ?? 0);
    if ($('rng-sh-flagZoom')) { $('rng-sh-flagZoom').value = fz; $('val-sh-flagZoom').textContent = `${fz}%`; }
    if ($('rng-sh-flagShiftX')) { $('rng-sh-flagShiftX').value = fx; $('val-sh-flagShiftX').textContent = `${fx > 0 ? '+' : ''}${fx}%`; }
    if ($('rng-sh-flagShiftY')) { $('rng-sh-flagShiftY').value = fy; $('val-sh-flagShiftY').textContent = `${fy > 0 ? '+' : ''}${fy}%`; }
    syncSeg('seg-flagFadeMode', st.flagFadeMode || 'fade-out');
    syncSeg('seg-flagFadeCurve', st.flagFadeCurve || 'smooth');
    syncSeg('seg-italic', st.italic);
    syncSeg('seg-scoreSlant', st.scoreSlant || 'mirror');
    syncSeg('seg-textShadow', st.textShadow);
    syncSeg('seg-glow', st.glow);
    syncSeg('seg-sheen', st.sheen);
    syncSeg('seg-animBorder', st.animBorder);
    syncSeg('seg-texture', st.texture);
    syncSeg('seg-mpStyle', st.mpStyle || 'side-peek');
    syncSeg('seg-mpColor', st.mpColor || 'fire');
    setIfNotFocused($('st-mpText'), st.mpText || 'MATCH POINT');
    const isSmashStyleActive = String(state.theme || '').startsWith('ssbu-');
    if ($('smash-studio-box')) $('smash-studio-box').style.display = isSmashStyleActive ? '' : 'none';
    if ($('eb-smash-logo-row')) $('eb-smash-logo-row').style.display = isSmashStyleActive ? '' : 'none';
    syncSeg('seg-smashFlagPos', st.smashFlagPos || 'below');
    syncSeg('seg-smashLogoMode', st.smashLogoMode || 'auto');
    syncSeg('seg-smashLogoMode-eb', st.smashLogoMode || 'auto');
    syncSeg('seg-smashInfoPos', st.smashInfoPos || 'left');
    renderFlagFadeEditor(st);

    // Sync Event Bar & Commentators Studio UI
    if ($('chk-eb-vis-mirror')) $('chk-eb-vis-mirror').checked = Boolean(state.showBottomBar);
    if ($('chk-cm-vis-mirror')) $('chk-cm-vis-mirror').checked = Boolean(state.showCommentators);

    const eb = { ...DEFAULT_EVENT_BAR, ...(state.eventBar || {}) };
    if ($('eb-title')) setIfNotFocused($('eb-title'), eb.title || '');
    if ($('eb-subtitle')) setIfNotFocused($('eb-subtitle'), eb.subtitle || '');
    if ($('eb-ticker')) setIfNotFocused($('eb-ticker'), eb.tickerText || '');
    if ($('chk-eb-sub')) $('chk-eb-sub').checked = eb.showSubtitle !== false;
    if ($('chk-eb-logo')) $('chk-eb-logo').checked = eb.showLogo !== false;
    if ($('chk-eb-sync-logo')) $('chk-eb-sync-logo').checked = eb.syncLogo !== false;
    if ($('eb-logo-pos')) $('eb-logo-pos').value = eb.logoPos || 'top-badge';
    if ($('rng-eb-logoScale')) $('rng-eb-logoScale').value = eb.logoScale ?? 100;
    if ($('val-eb-logoScale')) $('val-eb-logoScale').textContent = `${eb.logoScale ?? 100}%`;
    if ($('eb-style')) $('eb-style').value = eb.style || 'auto';
    if ($('eb-pos')) $('eb-pos').value = eb.position || 'bottom-center';
    if ($('eb-anim')) $('eb-anim').value = eb.anim || 'slide-up';
    if ($('rng-eb-scale')) $('rng-eb-scale').value = eb.scale ?? 100;
    if ($('val-eb-scale')) $('val-eb-scale').textContent = `${eb.scale ?? 100}%`;
    if ($('rng-eb-width')) $('rng-eb-width').value = eb.width ?? 0;
    if ($('val-eb-width')) $('val-eb-width').textContent = Number(eb.width || 0) >= 160 ? `${eb.width} px` : 'Auto';
    if ($('rng-eb-offX')) $('rng-eb-offX').value = eb.offsetX ?? 0;
    if ($('val-eb-offX')) $('val-eb-offX').textContent = `${eb.offsetX ?? 0} px`;
    if ($('rng-eb-offY')) $('rng-eb-offY').value = eb.offsetY ?? 0;
    if ($('val-eb-offY')) $('val-eb-offY').textContent = `${eb.offsetY ?? 0} px`;
    if ($('rng-eb-opacity')) $('rng-eb-opacity').value = eb.opacity ?? 100;
    if ($('val-eb-opacity')) $('val-eb-opacity').textContent = `${eb.opacity ?? 100}%`;
    if ($('rng-eb-borderW')) $('rng-eb-borderW').value = eb.borderWidth ?? 2;
    if ($('val-eb-borderW')) $('val-eb-borderW').textContent = `${eb.borderWidth ?? 2} px`;
    if ($('chk-eb-custom')) $('chk-eb-custom').checked = Boolean(eb.customColors);
    if ($('eb-bg1')) $('eb-bg1').value = eb.bgColor1 || '#10141f';
    if ($('eb-bg2')) $('eb-bg2').value = eb.bgColor2 || '#07090f';
    if ($('eb-accent')) $('eb-accent').value = eb.accentColor || '#ffd24d';
    if ($('eb-text')) $('eb-text').value = eb.textColor || '#ffffff';
    if ($('eb-sub')) $('eb-sub').value = eb.subColor || '#cbd5e1';
    if ($('eb-color-row')) $('eb-color-row').style.opacity = eb.customColors ? '1' : '0.48';

    // Sync Event Bar logo preview thumbnail
    const effLogo = eb.syncLogo !== false ? (state.vs?.logoUrl || eb.logoUrl || '') : (eb.logoUrl || '');
    if ($('eb-logo-thumb')) {
      $('eb-logo-thumb').innerHTML = effLogo ? `<img src="${effLogo}" alt="" />` : '🏷️';
    }
    if ($('eb-logo-status')) {
      $('eb-logo-status').textContent = effLogo
        ? (eb.syncLogo !== false && state.vs?.logoUrl ? 'Synced with Tournament Logo (Start.gg / Challonge)' : 'Custom uploaded Event Bar logo')
        : 'No logo yet — sync Start.gg or upload PNG/SVG';
    }
    if ($('btn-eb-clear-logo')) $('btn-eb-clear-logo').style.display = eb.logoUrl ? 'inline-flex' : 'none';

    const cm = { ...DEFAULT_COMMENTATORS, ...(state.commentators || {}) };
    setIfNotFocused($('c1-name'), cm.c1Name);
    setIfNotFocused($('c1-handle'), cm.c1Handle);
    if ($('c1-role')) setIfNotFocused($('c1-role'), cm.c1Role || '');
    setIfNotFocused($('c2-name'), cm.c2Name);
    setIfNotFocused($('c2-handle'), cm.c2Handle);
    if ($('c2-role')) setIfNotFocused($('c2-role'), cm.c2Role || '');
    if ($('c3-name')) setIfNotFocused($('c3-name'), cm.c3Name || '');
    if ($('c3-handle')) setIfNotFocused($('c3-handle'), cm.c3Handle || '');
    if ($('c3-role')) setIfNotFocused($('c3-role'), cm.c3Role || '');
    syncSeg('seg-cm-antiOverlap', cm.antiOverlap || 'auto-stack');
    if ($('cm-icon')) $('cm-icon').value = cm.iconStyle || 'mic';
    if ($('cm-sep')) $('cm-sep').value = cm.sepStyle || 'line';
    if ($('cm-style')) $('cm-style').value = cm.style || 'auto';
    if ($('cm-layout')) $('cm-layout').value = cm.layout || 'single-bar';
    if ($('cm-pos')) $('cm-pos').value = cm.position || 'bottom-center';
    if ($('cm-anim')) $('cm-anim').value = cm.anim || 'slide-up';
    if ($('rng-cm-scale')) $('rng-cm-scale').value = cm.scale ?? 100;
    if ($('val-cm-scale')) $('val-cm-scale').textContent = `${cm.scale ?? 100}%`;
    if ($('rng-cm-opacity')) $('rng-cm-opacity').value = cm.opacity ?? 100;
    if ($('val-cm-opacity')) $('val-cm-opacity').textContent = `${cm.opacity ?? 100}%`;
    if ($('rng-cm-offX')) $('rng-cm-offX').value = cm.offsetX ?? 0;
    if ($('val-cm-offX')) $('val-cm-offX').textContent = `${cm.offsetX ?? 0} px`;
    if ($('rng-cm-offY')) $('rng-cm-offY').value = cm.offsetY ?? 0;
    if ($('val-cm-offY')) $('val-cm-offY').textContent = `${cm.offsetY ?? 0} px`;
    if ($('chk-cm-custom')) $('chk-cm-custom').checked = Boolean(cm.customColors);
    if ($('chk-cm-logo')) $('chk-cm-logo').checked = Boolean(cm.showLogo);
    if ($('cm-bg1')) $('cm-bg1').value = cm.bgColor1 || '#10141f';
    if ($('cm-bg2')) $('cm-bg2').value = cm.bgColor2 || '#07090f';
    if ($('cm-accent')) $('cm-accent').value = cm.accentColor || '#ffd24d';
    if ($('cm-text')) $('cm-text').value = cm.textColor || '#ffffff';
    if ($('cm-handle')) $('cm-handle').value = cm.handleColor || '#ffd24d';
    if ($('cm-color-row')) $('cm-color-row').style.opacity = cm.customColors ? '1' : '0.48';

    renderActiveMatchBar();
    renderH2H();
    renderVsUI();
    renderBracketsUI();
    renderResultsUI();
  }

  /* =========================================================================
     EVENT BINDINGS
     ========================================================================= */
  function bindEvents() {
    // Player 1 & 2 text inputs + Custom Compact Player Popover
    const bindPlayer = (side) => {
      const inp = $(`${side}-name`);
      const pop = $(`${side}-popover`);
      const caret = $(`${side}-combo-btn`);

      inp.addEventListener('focus', () => openPlayerPopover(side, ''));
      inp.addEventListener('input', (e) => {
        const val = e.target.value;
        const matched = lookupPlayerProfile(val);
        const patch = { name: val };
        if (matched?.avatar) {
          patch.avatar = matched.avatar;
        } else if (state[side]?.avatar && !state[side].avatar.startsWith('/media/')) {
          // Clear stale remote tournament avatar when switching to a different player without a match
          patch.avatar = '';
        }
        commitState({ [side]: patch });
        if (comboOpenSide !== side) openPlayerPopover(side, val);
        else { comboHighlight = 0; renderPlayerPopover(side, val); }
      });
      inp.addEventListener('keydown', (e) => {
        if (comboOpenSide !== side) return;
        const list = getFilteredPlayers(comboQuery);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          comboHighlight = Math.min(list.length - 1, comboHighlight + 1);
          renderPlayerPopover(side, comboQuery);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          comboHighlight = Math.max(0, comboHighlight - 1);
          renderPlayerPopover(side, comboQuery);
        } else if (e.key === 'Enter' && list[comboHighlight]) {
          e.preventDefault();
          applyPlayerToSide(side, list[comboHighlight]);
        } else if (e.key === 'Escape') {
          closePlayerPopover();
        }
      });

      caret.addEventListener('click', (e) => {
        e.stopPropagation();
        if (comboOpenSide === side) closePlayerPopover();
        else { openPlayerPopover(side, ''); inp.focus(); }
      });

      pop.addEventListener('mousedown', (e) => {
        // Prevent input blur before click registers
        e.preventDefault();
        const item = e.target.closest('[data-pop-name]');
        const clr = e.target.closest('[data-pop-clear]');
        const sav = e.target.closest('[data-pop-save]');
        if (item) {
          const nm = item.dataset.popName;
          const found = playersDb.find(p => p.name === nm);
          if (found) applyPlayerToSide(side, found);
        } else if (clr) {
          comboHighlight = 0;
          renderPlayerPopover(side, '');
        } else if (sav) {
          savePlayer(state[side]);
          closePlayerPopover();
        }
      });

      $(`${side}-sponsor`).addEventListener('input', (e) => commitState({ [side]: { sponsor: e.target.value } }));
      $(`btn-${side}-flag`).addEventListener('click', () => openFlagPicker(side, 'flag'));
      $(`btn-${side}-region`).addEventListener('click', () => openFlagPicker(side, 'region'));
      $(`btn-${side}-partner-flag`)?.addEventListener('click', () => openFlagPicker(`${side}-partner`, 'flag'));
      $(`btn-${side}-partner-region`)?.addEventListener('click', () => openFlagPicker(`${side}-partner`, 'region'));
      $(`${side}-bracket`).addEventListener('change', (e) => commitState({ [side]: { bracket: e.target.value } }, true));
      $(`${side}-char`).addEventListener('change', (e) => commitState({ [side]: { character: e.target.value } }, true));
      $(`${side}-plus`).addEventListener('click', () => commitState({ [side]: { score: Math.min(99, Number(state[side].score) + 1) } }, true));
      $(`${side}-minus`).addEventListener('click', () => commitState({ [side]: { score: Math.max(0, Number(state[side].score) - 1) } }, true));
      $(`save-${side}`).addEventListener('click', () => savePlayer(state[side]));
    };
    const bindPartnerCombo = (slotKey) => {
      const baseSide = slotKey.startsWith('p1') ? 'p1' : 'p2';
      const inp = $(`${slotKey}-name`);
      const caret = $(`${slotKey}-combo-btn`);
      const pop = $(`${slotKey}-popover`);
      if (!inp || !caret || !pop) return;

      inp.addEventListener('focus', () => openPlayerPopover(slotKey, ''));
      inp.addEventListener('input', (e) => {
        const val = e.target.value;
        commitState({ [baseSide]: { partnerName: val, partnerSponsor: '' } });
        if (comboOpenSide !== slotKey) openPlayerPopover(slotKey, val);
        else { comboHighlight = 0; renderPlayerPopover(slotKey, val); }
      });
      inp.addEventListener('keydown', (e) => {
        if (comboOpenSide !== slotKey) return;
        const list = getFilteredPlayers(comboQuery);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          comboHighlight = Math.min(list.length - 1, comboHighlight + 1);
          renderPlayerPopover(slotKey, comboQuery);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          comboHighlight = Math.max(0, comboHighlight - 1);
          renderPlayerPopover(slotKey, comboQuery);
        } else if (e.key === 'Enter' && list[comboHighlight]) {
          e.preventDefault();
          applyPlayerToSide(slotKey, list[comboHighlight]);
        } else if (e.key === 'Escape') {
          closePlayerPopover();
        }
      });
      caret.addEventListener('click', (e) => {
        e.stopPropagation();
        if (comboOpenSide === slotKey) closePlayerPopover();
        else { openPlayerPopover(slotKey, ''); inp.focus(); }
      });
      pop.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const item = e.target.closest('[data-pop-name]');
        const clr = e.target.closest('[data-pop-clear]');
        const sav = e.target.closest('[data-pop-save]');
        if (item) {
          const nm = item.dataset.popName;
          const found = playersDb.find(p => p.name === nm);
          if (found) applyPlayerToSide(slotKey, found);
        } else if (clr) {
          comboHighlight = 0;
          renderPlayerPopover(slotKey, '');
        } else if (sav) {
          savePlayer(getPartnerDraft(baseSide));
          closePlayerPopover();
        }
      });
    };

    bindPlayer('p1');
    bindPlayer('p2');
    bindPartnerCombo('p1-partner');
    bindPartnerCombo('p2-partner');
    bindPartnerCombo('p1-coop');
    bindPartnerCombo('p2-coop');
    $('save-p1-partner')?.addEventListener('click', () => savePlayer(getPartnerDraft('p1')));
    $('save-p2-partner')?.addEventListener('click', () => savePlayer(getPartnerDraft('p2')));
    document.addEventListener('mousedown', (e) => {
      if (comboOpenSide && !e.target.closest(`#${comboOpenSide}-combo`)) closePlayerPopover();
    });

    // Center controls
    $('round-input').addEventListener('input', (e) => commitState({ round: e.target.value }));
    $('format-select').addEventListener('change', (e) => commitState({ format: e.target.value }, true));
    $('round-presets').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-round]');
      if (!btn) return;
      commitState({ round: btn.dataset.round }, true);
    });

    $('btn-swap').addEventListener('click', () => {
      const nextActive = state.activeMatch
        ? { ...state.activeMatch, swapped: !state.activeMatch.swapped }
        : null;
      commitState({ p1: { ...state.p2 }, p2: { ...state.p1 }, activeMatch: nextActive }, true);
      toast(nextActive ? '⇄ Sides swapped (bracket reporting auto-adjusted)' : '⇄ Players swapped');
    });
    $('btn-reset-scores').addEventListener('click', () => {
      commitState({ p1: { score: 0 }, p2: { score: 0 } }, true);
      toast('↺ Score reset to 0 - 0');
    });

    $('flag-mode-bar').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-flag-mode]');
      if (!btn) return;
      const mode = btn.dataset.flagMode;
      commitState({ flagMode: mode, showFlags: mode !== 'none' }, true);
    });
    $('chk-format').addEventListener('change', (e) => commitState({ showFormat: e.target.checked }, true));
    $('chk-mp').addEventListener('change', (e) => commitState({ showMatchPoint: e.target.checked }, true));
    $('chk-chars').addEventListener('change', (e) => commitState({ showCharacters: e.target.checked }, true));
    $('chk-casters').addEventListener('change', (e) => commitState({ showCommentators: e.target.checked }, true));
    $('chk-meta-strip')?.addEventListener('change', (e) => commitState({ showMetaStrip: e.target.checked }, true));
    $('chk-bottom-bar')?.addEventListener('change', (e) => commitState({ showBottomBar: e.target.checked }, true));
    $('chk-seed')?.addEventListener('change', (e) => commitState({ showSeed: e.target.checked }, true));
    $('chk-pronouns')?.addEventListener('change', (e) => commitState({ showPronouns: e.target.checked }, true));
    $('chk-variant')?.addEventListener('change', (e) => commitState({ showVariant: e.target.checked }, true));
    $('chk-stock')?.addEventListener('change', (e) => commitState({ showStockIcon: e.target.checked }, true));
    $('chk-stage')?.addEventListener('change', (e) => commitState({ showStage: e.target.checked }, true));
    $('smash-stage-select')?.addEventListener('change', (e) => commitState({ stageName: e.target.value, showStage: Boolean(e.target.value) }, true));
    $('tournament-name-inline')?.addEventListener('input', (e) => commitState({ tournament: e.target.value }));
    for (const side of ['p1', 'p2']) {
      $(`${side}-seed`)?.addEventListener('input', (e) => commitState({ [side]: { seed: e.target.value } }));
      $(`${side}-pronouns`)?.addEventListener('input', (e) => commitState({ [side]: { pronouns: e.target.value } }));
      $(`${side}-handle`)?.addEventListener('input', (e) => commitState({ [side]: { handle: e.target.value } }));
      $(`${side}-variant`)?.addEventListener('change', (e) => commitState({ [side]: { variant: e.target.value } }, true));
      $(`${side}-char2`)?.addEventListener('change', (e) => commitState({ [side]: { secondaryChar: e.target.value } }, true));
      // partner-name & coop-name input listeners are bound via bindPartnerCombo() with Saved Players popover
      $(`${side}-partner-char`)?.addEventListener('change', (e) => commitState({ [side]: { partnerChar: e.target.value } }, true));
      $(`${side}-partner-pronouns`)?.addEventListener('input', (e) => commitState({ [side]: { partnerPronouns: e.target.value } }));
    }
    $('btn-toggle-vis').addEventListener('click', () => commitState({ visible: state.visible === false }, true));

    // Visual Flag & Region Picker Modal events (3,400+ flags · Continent / Country / Region Filters + Offline Packs)
    const pollFlagDownloadStatus = async () => {
      if (!isHttp) return;
      clearTimeout(flagDlPollTimer);
      try {
        const res = await fetch('/api/flags/download-status', { cache: 'no-store' });
        if (!res.ok) return;
        const st = await res.json();
        const progEl = $('flag-dl-progress');
        const fillEl = $('flag-dl-fill');
        const lblEl = $('flag-dl-label');
        const dlBtn = $('btn-flag-dl-pack');
        const stopBtn = $('btn-flag-dl-stop');
        const pct = st.total > 0 ? Math.min(100, Math.round((st.done / st.total) * 100)) : 0;

        if (st.running) {
          if (progEl) progEl.style.display = 'flex';
          if (fillEl) fillEl.style.width = `${pct}%`;
          if (lblEl) lblEl.textContent = `⬇ ${st.label}: ${st.done} / ${st.total} (${pct}%) · ${st.current || ''}`;
          if (dlBtn) dlBtn.disabled = true;
          if (stopBtn) stopBtn.style.display = 'inline-flex';
          flagDlPollTimer = setTimeout(pollFlagDownloadStatus, 350);
        } else {
          if (dlBtn) dlBtn.disabled = false;
          if (stopBtn) stopBtn.style.display = 'none';
          if (st.total > 0 && st.done > 0) {
            if (progEl) progEl.style.display = 'flex';
            if (fillEl) fillEl.style.width = `${pct}%`;
            if (lblEl) lblEl.textContent = `✅ ${st.label}: ${st.cached} cached offline${st.failed ? ` (${st.failed} unavailable)` : ''}`;
            await window.FGC_FLAG_API?.loadWorldCatalog?.(true);
            if (pickerState.open) renderFlagPickerModal();
            setTimeout(() => { if ($('flag-dl-progress')) $('flag-dl-progress').style.display = 'none'; }, 3500);
          } else if (progEl) {
            progEl.style.display = 'none';
          }
        }
      } catch {}
    };

    $('btn-close-flag-modal').addEventListener('click', closeFlagPicker);
    $('flag-modal').addEventListener('click', (e) => { if (e.target === $('flag-modal')) closeFlagPicker(); });
    $('flag-slot-switch').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-slot]');
      if (!btn) return;
      pickerState.slot = btn.dataset.slot;
      pickerState.showAll = false;
      const tgt = getFlagTarget(pickerState.side);
      if (pickerState.slot === 'region') {
        pickerState.scope = 'regions';
        const curFlag = (tgt.flag || '').toUpperCase();
        if (curFlag && !curFlag.includes('-')) pickerState.country = curFlag;
        if ($('flag-pack-scope')) $('flag-pack-scope').value = 'country-regions';
      } else {
        pickerState.scope = 'countries';
        if ($('flag-pack-scope')) $('flag-pack-scope').value = 'countries';
      }
      renderFlagPickerModal();
    });
    $('flag-scope-tabs')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-fscope]');
      if (!btn) return;
      pickerState.scope = btn.dataset.fscope;
      pickerState.showAll = false;
      if ($('flag-pack-scope')) {
        if (pickerState.scope === 'regions') $('flag-pack-scope').value = 'country-regions';
        else if (pickerState.scope === 'countries') $('flag-pack-scope').value = 'countries';
      }
      renderFlagPickerModal();
    });
    $('flag-cont-tabs')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-fcont]');
      if (!btn) return;
      pickerState.cont = btn.dataset.fcont;
      pickerState.showAll = false;
      renderFlagPickerModal();
    });
    $('flag-country-select')?.addEventListener('change', (e) => {
      pickerState.country = e.target.value || 'ALL';
      pickerState.showAll = false;
      if (pickerState.country !== 'ALL' && $('flag-pack-scope')) {
        $('flag-pack-scope').value = 'country-regions';
      }
      renderFlagPickerModal();
    });
    $('flag-quick-countries')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-qcc]');
      if (!btn) return;
      const cc = btn.dataset.qcc;
      pickerState.scope = 'regions';
      pickerState.country = cc;
      pickerState.showAll = false;
      // Ensure continent filter doesn't hide the clicked quick-jump country!
      const cEntry = FLAGS_MAP[cc];
      if (pickerState.cont !== 'all' && pickerState.cont !== 'cached' && cEntry?.continent && cEntry.continent !== pickerState.cont) {
        pickerState.cont = 'all';
      }
      pickerState.query = '';
      if ($('flag-search-input')) $('flag-search-input').value = '';
      if ($('flag-pack-scope')) $('flag-pack-scope').value = 'country-regions';
      renderFlagPickerModal();
    });
    $('flag-search-input').addEventListener('input', (e) => {
      pickerState.query = e.target.value;
      pickerState.showAll = false;
      renderFlagPickerModal();
    });
    $('btn-flag-show-all')?.addEventListener('click', () => {
      pickerState.showAll = true;
      renderFlagPickerModal();
    });
    $('btn-flag-dl-pack')?.addEventListener('click', async () => {
      if (!isHttp) return toast('Start the local server first (Start_Scorebar.bat)');
      const scope = $('flag-pack-scope')?.value || 'countries';
      const continent = (pickerState.cont && pickerState.cont !== 'all' && pickerState.cont !== 'cached') ? pickerState.cont : 'EU';
      let country = pickerState.country && pickerState.country !== 'ALL' ? pickerState.country : 'ES';
      if (scope === 'full-world') {
        if (!window.confirm(tr('Download all 3,400+ world & regional flags for 100% offline use? (You can press Stop at any time)'))) return;
      }
      try {
        const res = await fetch('/api/flags/download-pack', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scope, continent, country })
        });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || 'Flag pack download failed');
        toast(`⬇ Downloading ${data.label || 'flag pack'} (${data.total} flags)...`);
        pollFlagDownloadStatus();
      } catch (err) {
        toast(`⚠️ ${err.message}`);
      }
    });
    $('btn-flag-dl-stop')?.addEventListener('click', async () => {
      if (!isHttp) return;
      await fetch('/api/flags/download-stop', { method: 'POST' }).catch(() => {});
      toast('⏹ Flag pack download stopped');
      pollFlagDownloadStatus();
    });
    $('btn-flag-clear-cache')?.addEventListener('click', async () => {
      if (!isHttp) return;
      if (!window.confirm(tr('Clear downloaded offline flag images from data/flags/? (Built-in offline SVGs stay intact)'))) return;
      await fetch('/api/flags/clear-cache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scope: 'all' })
      }).catch(() => {});
      await window.FGC_FLAG_API?.loadWorldCatalog?.(true);
      renderFlagPickerModal();
      toast('🗑 Downloaded flag cache cleared');
    });
    $('btn-clear-flag-slot').addEventListener('click', () => {
      commitFlagTarget(pickerState.side, pickerState.slot, '');
      renderFlagPickerModal();
      toast('Flag cleared');
    });
    $('flag-picker-grid').addEventListener('click', (e) => {
      const tile = e.target.closest('button[data-pick-code]');
      if (!tile) return;
      const code = tile.dataset.pickCode;
      const item = FLAGS_MAP[code];
      commitFlagTarget(pickerState.side, pickerState.slot, code);
      // Warm on-demand cache immediately in background if not built-in SVG
      if (isHttp && item && !item.builtin) {
        fetch(`/api/flags/img?code=${encodeURIComponent(code)}`).then(() => {
          window.FGC_FLAG_API?.loadWorldCatalog?.(true);
        }).catch(() => {});
      }
      const labelPrefix = String(pickerState.side).startsWith('res-')
        ? `Top 8 #${Number(pickerState.side.slice(4)) + 1}`
        : pickerState.side.toUpperCase();
      toast(`${labelPrefix} · ${item ? `${item.name} (${code})` : code}`);
      closeFlagPicker();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (pickerState.open) closeFlagPicker();
        $('share-modal')?.classList.remove('open');
        $('guide-modal')?.classList.remove('open');
        $('qr-modal')?.classList.remove('open');
        if (typeof updateBusy === 'undefined' || !updateBusy) {
          $('update-modal')?.classList.remove('open');
        }
      }
    });

    // Interactive Broadcast Guide Modal (Chapters, Search, 1-Click Jumps, Copy & Persisted Checklist)
    const GUIDE_CHECK_KEY = 'fgc_guide_checklist_v1';
    const syncGuideChecklist = () => {
      let saved = {};
      try { saved = JSON.parse(localStorage.getItem(GUIDE_CHECK_KEY) || '{}'); } catch {}
      const boxes = $('guide-modal')?.querySelectorAll('input[data-guide-check]') || [];
      let done = 0;
      boxes.forEach(cb => {
        cb.checked = Boolean(saved[cb.dataset.guideCheck]);
        cb.closest('.guide-check-item')?.classList.toggle('checked', cb.checked);
        if (cb.checked) done++;
      });
      if ($('guide-check-progress')) $('guide-check-progress').textContent = `${done} / ${boxes.length} Ready`;
    };
    const switchGuideChapter = (chapId) => {
      $('guide-nav')?.querySelectorAll('.guide-nav-btn').forEach(b => b.classList.toggle('active', b.dataset.gchap === chapId));
      $('guide-content')?.querySelectorAll('.guide-pane').forEach(p => p.classList.toggle('active', p.id === `gchap-${chapId}`));
      if ($('guide-content')) $('guide-content').scrollTop = 0;
    };
    const openGuideModal = () => {
      if ($('g-url-obs')) $('g-url-obs').textContent = $('obs-url-text')?.textContent || 'http://localhost:8787/';
      if ($('g-url-vs')) $('g-url-vs').textContent = $('vs-url-text')?.textContent || 'http://localhost:8787/vs.html';
      if ($('g-url-res')) $('g-url-res').textContent = $('results-url-text')?.textContent || 'http://localhost:8787/results.html';
      syncGuideChecklist();
      $('guide-modal')?.classList.add('open');
    };
    const closeGuideModal = () => $('guide-modal')?.classList.remove('open');
    $('btn-open-guide')?.addEventListener('click', openGuideModal);
    $('btn-footer-guide')?.addEventListener('click', openGuideModal);
    $('btn-close-guide-modal')?.addEventListener('click', closeGuideModal);
    $('guide-modal')?.addEventListener('click', (e) => { if (e.target === $('guide-modal')) closeGuideModal(); });
    $('guide-nav')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-gchap]');
      if (!btn) return;
      $('guide-search-input').value = '';
      switchGuideChapter(btn.dataset.gchap);
    });
    $('guide-search-input')?.addEventListener('input', (e) => {
      const q = normText(e.target.value.trim());
      const panes = [...($('guide-content')?.querySelectorAll('.guide-pane') || [])];
      if (!q) {
        const activeBtn = $('guide-nav')?.querySelector('.guide-nav-btn.active');
        switchGuideChapter(activeBtn?.dataset.gchap || 'obs');
        return;
      }
      let firstMatch = '';
      panes.forEach(p => {
        const hay = normText(`${p.dataset.gkeywords || ''} ${p.textContent || ''}`);
        const match = hay.includes(q);
        p.classList.toggle('active', match);
        if (match && !firstMatch) firstMatch = p.id.replace('gchap-', '');
      });
      $('guide-nav')?.querySelectorAll('.guide-nav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.gchap === firstMatch);
      });
    });
    $('guide-content')?.addEventListener('click', (e) => {
      const copyUrlBtn = e.target.closest('[data-guide-copy]');
      if (copyUrlBtn) {
        const k = copyUrlBtn.dataset.guideCopy;
        const map = { obs: 'obs-url-text', vs: 'vs-url-text', results: 'results-url-text' };
        const val = $(map[k])?.textContent || '';
        navigator.clipboard?.writeText(val).then(() => toast(`📋 Copied ${val}`)).catch(() => toast(val));
        return;
      }
      const copyTxtBtn = e.target.closest('[data-guide-copy-text]');
      if (copyTxtBtn) {
        const txt = copyTxtBtn.dataset.guideCopyText;
        navigator.clipboard?.writeText(txt).then(() => toast('📋 JSON payload copied')).catch(() => toast(txt));
        return;
      }
      const jumpBtn = e.target.closest('[data-guide-jump]');
      if (jumpBtn) {
        const [ws, sub] = String(jumpBtn.dataset.guideJump || '').split(':');
        closeGuideModal();
        setActiveWorkspace(ws);
        if (ws === 'scorebars') {
          if (sub === 'obs') {
            $('bottom-tabs')?.querySelector('button[data-tab="obs"]')?.click();
          } else if (sub === 'flagfade' || sub === 'fx' || sub === 'tweaks') {
            $('bottom-tabs')?.querySelector('button[data-tab="tweaks"]')?.click();
            if (sub === 'flagfade' || sub === 'fx') {
              $('studio-subtabs')?.querySelector(`button[data-spane="${sub}"]`)?.click();
            }
          }
        } else if (ws === 'vs' && sub) {
          $('vs-insp-tabs')?.querySelector(`button[data-vspane="${sub}"]`)?.click();
        } else if (ws === 'results' && sub) {
          $('res-insp-tabs')?.querySelector(`button[data-respane="${sub}"]`)?.click();
        } else if (ws === 'tournaments' && sub) {
          $('trn-subtabs')?.querySelector(`button[data-trnpane="${sub}"]`)?.click();
        }
      }
    });
    $('guide-content')?.addEventListener('change', (e) => {
      const cb = e.target.closest('input[data-guide-check]');
      if (!cb) return;
      let saved = {};
      try { saved = JSON.parse(localStorage.getItem(GUIDE_CHECK_KEY) || '{}'); } catch {}
      saved[cb.dataset.guideCheck] = cb.checked;
      try { localStorage.setItem(GUIDE_CHECK_KEY, JSON.stringify(saved)); } catch {}
      syncGuideChecklist();
    });
    $('btn-guide-reset-checks')?.addEventListener('click', () => {
      try { localStorage.removeItem(GUIDE_CHECK_KEY); } catch {}
      syncGuideChecklist();
      toast('↺ Pre-event checklist reset');
    });

    // Share, Creator Socials & Optional Ko-fi Support Modal
    const openShareModal = () => $('share-modal')?.classList.add('open');
    const closeShareModal = () => $('share-modal')?.classList.remove('open');
    $('btn-open-share')?.addEventListener('click', openShareModal);
    $('btn-footer-share')?.addEventListener('click', openShareModal);
    $('btn-close-share-modal')?.addEventListener('click', closeShareModal);
    $('share-modal')?.addEventListener('click', (e) => { if (e.target === $('share-modal')) closeShareModal(); });
    $('btn-share-copy-repo')?.addEventListener('click', () => {
      const repoUrl = 'https://github.com/N5K-dev/fgc-open-scorebars';
      navigator.clipboard?.writeText(repoUrl).then(() => toast('📋 GitHub link copied')).catch(() => toast(repoUrl));
    });
    $('btn-share-copy-post')?.addEventListener('click', () => {
      const msg = 'FGC Open Scorebars v2.8.0 — 100% free & open-source OBS broadcast suite for fighting game tournaments (87 Scorebars, 48 VS Splashes, 17 Brackets, 32 Top 8 Results, Live SFX & Start.gg/Challonge sync) by @Nordi5ke: https://github.com/N5K-dev/fgc-open-scorebars';
      navigator.clipboard?.writeText(msg).then(() => toast('📢 Share text copied to clipboard')).catch(() => toast(msg));
    });

    // Preview toolbar (unified Backdrop dropdown + recessed segmented Edit & View trays)
    const setPreviewBackdrop = (mode) => {
      previewBg = mode;
      const sel = $('preview-bg-select');
      if (sel && sel.value !== mode) sel.value = mode;
      document.querySelectorAll('[data-bg]').forEach(b => b.classList.toggle('active-chip', b.dataset.bg === mode));
      pushPreviewConfig();
    };
    $('preview-bg-select')?.addEventListener('change', (e) => setPreviewBackdrop(e.target.value));
    document.querySelectorAll('[data-bg]').forEach(btn => {
      btn.addEventListener('click', () => setPreviewBackdrop(btn.dataset.bg));
    });
    $('btn-guides').addEventListener('click', (e) => {
      previewGuides = !previewGuides;
      e.currentTarget.classList.toggle('active-chip', previewGuides);
      pushPreviewConfig();
    });
    $('btn-crop-hud').addEventListener('click', (e) => {
      const cropped = $('preview-wrap').classList.toggle('cropped');
      e.currentTarget.classList.toggle('active-chip', cropped);
    });
    $('btn-pin-preview').addEventListener('click', () => {
      previewPinned = !previewPinned;
      try { localStorage.setItem('fgc_preview_pinned', previewPinned ? '1' : '0'); } catch {}
      syncWorkspaceLayout();
      toast(previewPinned ? '📌 Live Preview pinned to top' : 'Live Preview unpinned');
    });
    const toggleSidebar = () => {
      sidebarCollapsed = !sidebarCollapsed;
      try { localStorage.setItem('fgc_sidebar_collapsed', sidebarCollapsed ? '1' : '0'); } catch {}
      syncWorkspaceLayout();
    };
    $('btn-toggle-sidebar').addEventListener('click', toggleSidebar);
    $('btn-close-sidebar').addEventListener('click', toggleSidebar);
    window.addEventListener('resize', syncWorkspaceLayout);

    // Designs search, game dropdown, mode/style filters & cards
    $('theme-search').addEventListener('input', (e) => {
      themeSearch = e.target.value;
      renderThemeGallery();
    });
    $('theme-game-filter')?.addEventListener('change', (e) => {
      currentGameFilter = e.target.value || 'all';
      themeSearch = '';
      $('theme-search').value = '';
      // Reset incompatible style sub-chips when changing games (keep 1v1/2v2/all)
      if (!['all', '1v1', '2v2'].includes(currentCat) && currentGameFilter !== 'all' && currentGameFilter !== 'tekken8') {
        currentCat = 'all';
        $('theme-filters').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.cat === 'all'));
      }
      const gameBgMap = { tekken8: 't8', sf6: 'sf6', '2xko': '2xko', ffcotw: 'ffcotw', ssbu: 'ssbu', avatar: 'avatar', mk1: 'mk1' };
      if (gameBgMap[currentGameFilter] && !['checker', 'green'].includes(previewBg)) {
        setPreviewBackdrop(gameBgMap[currentGameFilter]);
      }
      renderThemeGallery();
    });
    $('theme-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-cat]');
      if (!btn) return;
      currentCat = btn.dataset.cat;
      themeSearch = '';
      $('theme-search').value = '';
      $('theme-filters').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      renderThemeGallery();
    });
    $('theme-grid').addEventListener('click', (e) => {
      const card = e.target.closest('.theme-card');
      if (!card) return;
      const t = THEMES.find(x => x.id === card.dataset.themeId);
      if (!t) return;
      const wasSameTheme = state.theme === t.id;
      if (!['checker', 'green'].includes(previewBg)) {
        const gm = getThemeGameMeta(t);
        const gameBgMap = { tekken8: 't8', sf6: 'sf6', '2xko': '2xko', ffcotw: 'ffcotw', ssbu: 'ssbu', avatar: 'avatar', mk1: 'mk1' };
        setPreviewBackdrop(gameBgMap[gm.gameKey] || 't8');
      }
      // Always restore pristine factory layout, positions, sizes, tweaks & style for built-in presets!
      commitState(buildBuiltInThemeResetPatch(t), true);
      toast(wasSameTheme
        ? `↺ Reset to factory defaults: ${t.name}`
        : `🎨 Design loaded (factory defaults): ${t.name}`);
    });

    // Top-level Workspace Navigation (Scorebars | VS Splash | Tournaments)
    $('top-workspace-nav').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-ws]');
      if (!btn) return;
      setActiveWorkspace(btn.dataset.ws);
    });
    $('btn-am-go-scorebar').addEventListener('click', () => setActiveWorkspace('scorebars'));
    $('btn-pin-vs').addEventListener('click', () => {
      vsPreviewPinned = !vsPreviewPinned;
      try { localStorage.setItem('fgc_vs_preview_pinned', vsPreviewPinned ? '1' : '0'); } catch {}
      syncWorkspaceLayout();
      toast(vsPreviewPinned ? '📌 VS Preview pinned to top' : 'VS Preview unpinned');
    });

    // Tournaments Workspace sub-tabs (Bracket & Queue | Match History & H2H)
    $('trn-subtabs').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-trnpane]');
      if (!btn) return;
      $('trn-subtabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      document.querySelectorAll('.trn-sub-pane').forEach(p => p.classList.toggle('active', p.id === `trnpane-${btn.dataset.trnpane}`));
    });

    // Scorebars Bottom tabs
    $('bottom-tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-tab]');
      if (!btn) return;
      $('bottom-tabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      document.querySelectorAll('#ws-scorebars .tab-pane').forEach(p => p.classList.toggle('active', p.id === `tab-${btn.dataset.tab}`));
    });

    // Style Studio Sub-tabs
    $('studio-subtabs').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-spane]');
      if (!btn) return;
      $('studio-subtabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      document.querySelectorAll('.studio-pane').forEach(p => p.classList.toggle('active', p.id === `spane-${btn.dataset.spane}`));
    });

    // Helper for segmented Studio controls
    const bindSeg = (id, styleKey) => {
      $(id).addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-val]');
        if (!btn) return;
        const val = btn.dataset.val;
        const patch = { [styleKey]: val };
        if (styleKey === 'fillMode') {
          patch.customColors = true;
          // Auto-tune opacity when entering/leaving Glassmorphism so blur is immediately visible!
          const curA = Number(state.style?.bgAlpha ?? 94);
          if (val === 'glass' && curA > 80) patch.bgAlpha = 62;
          else if ((val === 'solid' || val === 'gradient' || val === 'metallic') && curA < 75) patch.bgAlpha = 95;
          commitState({ tweaks: { customColors: true }, style: patch }, true);
          return;
        }
        commitState({ style: patch }, true);
      });
    };
    bindSeg('seg-fill-mode', 'fillMode');
    bindSeg('seg-flagStyle', 'flagStyle');
    bindSeg('seg-flagFit', 'flagFit');
    bindSeg('seg-italic', 'italic');
    bindSeg('seg-scoreSlant', 'scoreSlant');
    bindSeg('seg-textShadow', 'textShadow');
    bindSeg('seg-glow', 'glow');
    bindSeg('seg-sheen', 'sheen');
    bindSeg('seg-animBorder', 'animBorder');
    bindSeg('seg-texture', 'texture');
    bindSeg('seg-mpStyle', 'mpStyle');
    bindSeg('seg-mpColor', 'mpColor');
    bindSeg('seg-smashFlagPos', 'smashFlagPos');
    bindSeg('seg-smashLogoMode', 'smashLogoMode');
    bindSeg('seg-smashLogoMode-eb', 'smashLogoMode');
    bindSeg('seg-smashInfoPos', 'smashInfoPos');
    $('st-mpText').addEventListener('input', (e) => commitState({ style: { mpText: e.target.value } }));

    // Adaptive Surface Quick Palettes (Filtered per Surface Mode!)
    $('palette-strip').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-pal-idx]');
      if (!btn) return;
      const mode = btn.dataset.palMode || state.style?.fillMode || 'gradient';
      const p = PALETTES_BY_MODE[mode]?.items?.[Number(btn.dataset.palIdx)];
      if (!p) return;
      const stylePatch = {
        customColors: true,
        fillMode: mode,
        p1Color1: p.p1a,
        p1Color2: p.p1b || p.p1a,
        p2Color1: p.p2a,
        p2Color2: p.p2b || p.p2a,
        centerAccent: p.cacc,
        textColor: p.text,
        sponsorColor: p.sp
      };
      if (p.bg1) stylePatch.bgColor1 = p.bg1;
      if (p.bg2 || mode === 'solid') stylePatch.bgColor2 = p.bg2 || p.bg1;
      if (p.c1) stylePatch.centerColor1 = p.c1;
      if (p.c2 || mode === 'solid' || mode === 'glass') stylePatch.centerColor2 = p.c2 || p.c1 || state.style?.centerColor2;
      if (p.ang !== undefined) stylePatch.bgAngle = p.ang;
      if (p.a !== undefined) stylePatch.bgAlpha = p.a;
      if (p.blur !== undefined) stylePatch.glassBlur = p.blur;
      if (p.border !== undefined) stylePatch.glassBorder = p.border;
      commitState({ tweaks: { customColors: true }, style: stylePatch }, true);
      toast(`🎨 Palette (${mode}): ${p.name}`);
    });

    // Surface Quick Utilities (Flip A/B, Quick Angle, Swap P1/P2 Colors, Theme Notice Jump Buttons)
    $('btn-flip-bg').addEventListener('click', () => {
      const st = { ...DEFAULT_STYLE, ...(state.style || {}) };
      commitState({ tweaks: { customColors: true }, style: { customColors: true, bgColor1: st.bgColor2, bgColor2: st.bgColor1 } }, true);
    });
    $('bg-angle-chips').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-ang]');
      if (!btn) return;
      commitState({ tweaks: { customColors: true }, style: { customColors: true, bgAngle: Number(btn.dataset.ang) } }, true);
    });
    $('btn-swap-colors').addEventListener('click', () => {
      const st = { ...DEFAULT_STYLE, ...(state.style || {}) };
      commitState({
        tweaks: { customColors: true },
        style: { customColors: true, p1Color1: st.p2Color1, p1Color2: st.p2Color2, p2Color1: st.p1Color1, p2Color2: st.p1Color2 }
      }, true);
      toast('⇄ P1 ⇄ P2 colors swapped');
    });
    $('surface-theme-notice').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-jump-fill]');
      if (!btn) return;
      const val = btn.dataset.jumpFill;
      const patch = { customColors: true, fillMode: val };
      if (val === 'glass') patch.bgAlpha = 62;
      else patch.bgAlpha = 95;
      commitState({ tweaks: { customColors: true }, style: patch }, true);
    });

    // Color Pickers & Gradient Sliders
    $('chk-custom-colors').addEventListener('change', (e) => {
      commitState({ tweaks: { customColors: e.target.checked }, style: { customColors: e.target.checked } }, true);
    });
    const bindColor = (id, key) => {
      $(id).addEventListener('input', (e) => commitState({ tweaks: { customColors: true }, style: { customColors: true, [key]: e.target.value } }));
    };
    bindColor('st-bg1', 'bgColor1');
    bindColor('st-bg2', 'bgColor2');
    bindColor('st-p1-1', 'p1Color1');
    bindColor('st-p1-2', 'p1Color2');
    bindColor('st-p2-1', 'p2Color1');
    bindColor('st-p2-2', 'p2Color2');
    bindColor('st-c1', 'centerColor1');
    bindColor('st-c2', 'centerColor2');
    bindColor('st-cacc', 'centerAccent');
    bindColor('st-text', 'textColor');
    bindColor('st-sponsor', 'sponsorColor');

    const bindStyleRange = (id, key) => {
      const el = $(id);
      if (el) el.addEventListener('input', (e) => commitState({ style: { [key]: Number(e.target.value) } }));
    };
    bindStyleRange('rng-bgAngle', 'bgAngle');
    bindStyleRange('rng-bgAlpha', 'bgAlpha');
    bindStyleRange('rng-glassBlur', 'glassBlur');
    bindStyleRange('rng-glassBorder', 'glassBorder');
    bindStyleRange('rng-fontScale', 'fontScale');
    bindStyleRange('rng-letterSpacing', 'letterSpacing');
    bindStyleRange('rng-bladeSlant', 'bladeSlant');
    bindStyleRange('rng-flagWidth', 'flagWidth');
    bindStyleRange('rng-flagOpacity', 'flagOpacity');
    bindStyleRange('rng-sh-flagZoom', 'flagZoom');
    bindStyleRange('rng-sh-flagShiftX', 'flagShiftX');
    bindStyleRange('rng-sh-flagShiftY', 'flagShiftY');
    $('rng-barHeight').addEventListener('input', (e) => {
      const v = Number(e.target.value);
      commitState({ style: { barHeight: v < 30 ? 0 : v } });
    });

    // Dedicated Flag Fade-In / Fade-Out Studio Editor Bindings
    const openStudioSubpane = (paneId) => {
      $('studio-subtabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.spane === paneId));
      document.querySelectorAll('.studio-pane').forEach(p => p.classList.toggle('active', p.id === `spane-${paneId}`));
    };
    $('btn-open-flagfade').addEventListener('click', () => openStudioSubpane('flagfade'));

    const commitFlagFade = (patch, immediate = false) => {
      const st = { ...DEFAULT_STYLE, ...(state.style || {}) };
      const next = { ...patch };
      if (!isFadeBlendEffective(st)) next.flagStyle = 'fade-blend';
      commitState({ style: next }, immediate);
    };
    $('btn-ff-enable').addEventListener('click', () => {
      commitState({ style: { flagStyle: 'fade-blend' } }, true);
      toast('🌊 Fade Blend activated on overlay');
    });
    $('btn-ff-reset').addEventListener('click', () => {
      commitState({
        style: {
          flagFadeMode: DEFAULT_STYLE.flagFadeMode,
          flagFadeCurve: DEFAULT_STYLE.flagFadeCurve,
          flagFadeIn: DEFAULT_STYLE.flagFadeIn,
          flagFadeStart: DEFAULT_STYLE.flagFadeStart,
          flagFadeEnd: DEFAULT_STYLE.flagFadeEnd,
          flagFadeAngle: DEFAULT_STYLE.flagFadeAngle,
          flagWidth: DEFAULT_STYLE.flagWidth,
          flagOpacity: DEFAULT_STYLE.flagOpacity,
          flagZoom: DEFAULT_STYLE.flagZoom,
          flagShiftX: DEFAULT_STYLE.flagShiftX,
          flagSaturation: DEFAULT_STYLE.flagSaturation,
          flagBrightness: DEFAULT_STYLE.flagBrightness
        }
      }, true);
      toast('↺ Flag Fade settings reset to defaults');
    });
    $('ff-presets').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-ff-preset]');
      if (!btn) return;
      const p = FLAG_FADE_PRESETS[btn.dataset.ffPreset];
      if (!p) return;
      const { name, ...fields } = p;
      commitFlagFade(fields, true);
      toast(`🌊 Flag Fade preset: ${name}`);
    });
    $('seg-flagFadeMode').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-val]');
      if (!btn) return;
      const val = btn.dataset.val;
      const st = { ...DEFAULT_STYLE, ...(state.style || {}) };
      const patch = { flagFadeMode: val };
      if ((val === 'both' || val === 'fade-in') && Number(st.flagFadeIn ?? 0) < 6) patch.flagFadeIn = 18;
      if (val === 'diagonal' && Number(st.flagFadeAngle ?? 0) === 0) patch.flagFadeAngle = 20;
      if (val === 'fade-out' && Number(st.flagFadeIn ?? 0) > 0 && st.flagFadeMode === 'both') patch.flagFadeIn = 0;
      commitFlagFade(patch, true);
    });
    $('seg-flagFadeCurve').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-val]');
      if (!btn) return;
      commitFlagFade({ flagFadeCurve: btn.dataset.val }, true);
    });
    const bindFadeRange = (id, key) => {
      $(id).addEventListener('input', (e) => {
        const val = Number(e.target.value);
        const st = { ...DEFAULT_STYLE, ...(state.style || {}) };
        const patch = { [key]: val };
        // Keep Fade-In < Solid Hold < Fade-Out Reach automatically and keep mode chip synced!
        if (key === 'flagFadeIn') {
          if (val > 0 && (st.flagFadeMode || 'fade-out') === 'fade-out') patch.flagFadeMode = 'both';
          else if (val === 0 && st.flagFadeMode === 'both') patch.flagFadeMode = 'fade-out';
          if (val >= Number(st.flagFadeStart ?? 34) - 4) {
            patch.flagFadeStart = Math.min(85, val + 10);
            if (patch.flagFadeStart >= Number(st.flagFadeEnd ?? 98) - 4) patch.flagFadeEnd = Math.min(100, patch.flagFadeStart + 10);
          }
        }
        if (key === 'flagFadeStart' && val >= Number(st.flagFadeEnd ?? 98) - 4) {
          patch.flagFadeEnd = Math.min(100, val + 8);
        }
        if (key === 'flagFadeEnd' && val <= Number(st.flagFadeStart ?? 34) + 4) {
          patch.flagFadeStart = Math.max(10, val - 8);
        }
        commitFlagFade(patch);
      });
    };
    bindFadeRange('rng-flagFadeIn', 'flagFadeIn');
    bindFadeRange('rng-flagFadeStart', 'flagFadeStart');
    bindFadeRange('rng-flagFadeEnd', 'flagFadeEnd');
    bindFadeRange('rng-flagFadeAngle', 'flagFadeAngle');
    bindFadeRange('rng-ff-flagWidth', 'flagWidth');
    bindFadeRange('rng-ff-flagOpacity', 'flagOpacity');
    bindFadeRange('rng-flagZoom', 'flagZoom');
    bindFadeRange('rng-flagShiftX', 'flagShiftX');
    bindFadeRange('rng-flagSaturation', 'flagSaturation');
    bindFadeRange('rng-flagBrightness', 'flagBrightness');

    const bindStyleSelect = (id, key) => {
      $(id).addEventListener('change', (e) => commitState({ style: { [key]: e.target.value } }, true));
    };
    bindStyleSelect('st-font-name', 'fontName');
    bindStyleSelect('st-font-score', 'fontScore');
    bindStyleSelect('st-layout', 'layoutOverride');
    bindStyleSelect('st-shape', 'shape');
    bindStyleSelect('st-centerStyle', 'centerStyle');
    bindStyleSelect('st-outerBlade', 'outerBlade');
    bindStyleSelect('st-scorePos', 'scorePosOverride');
    bindStyleSelect('st-borderStyle', 'borderStyle');
    bindStyleSelect('st-isoCode', 'showIsoCode');
    bindStyleSelect('st-entryAnim', 'entryAnim');
    bindStyleSelect('st-scoreAnim', 'scoreAnim');
    $('chk-uppercase').addEventListener('change', (e) => commitState({ style: { uppercase: e.target.checked } }, true));

    // Animation Preview Test & Live OBS Scene Intro Replay
    const replayLiveIntro = () => {
      commitState({ visible: true, introNonce: Date.now() }, true);
      toast('🎬 Live entry transition triggered in OBS');
    };
    $('btn-replay-obs').addEventListener('click', replayLiveIntro);
    $('btn-replay-obs-2').addEventListener('click', replayLiveIntro);
    $('btn-test-entry').addEventListener('click', () => {
      previewFrame.contentWindow?.postMessage({ type: 'test-entry-anim', useSceneDelay: true }, '*');
      toast(`▶ Previewing scene entry (delay ${state.style?.sceneDelay ?? 250} ms)`);
    });
    $('btn-test-score').addEventListener('click', () => {
      previewFrame.contentWindow?.postMessage({ type: 'test-score-anim' }, '*');
      toast('▶ Testing score animation');
    });
    bindStyleRange('rng-sceneDelay', 'sceneDelay');
    bindStyleRange('rng-animDuration', 'animDuration');
    bindStyleRange('rng-scoreAnimDuration', 'scoreAnimDuration');
    $('anim-dur-chips').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-dur]');
      if (!btn) return;
      commitState({ style: { animDuration: Number(btn.dataset.dur) } }, true);
    });
    $('scene-delay-chips').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-delay]');
      if (!btn) return;
      commitState({ style: { sceneDelay: Number(btn.dataset.delay) } }, true);
    });
    $('chk-scene-auto').addEventListener('change', (e) => commitState({ style: { sceneAutoIntro: e.target.checked } }, true));
    $('chk-intro-stagger').addEventListener('change', (e) => commitState({ style: { introStagger: e.target.checked } }, true));
    $('chk-intro-flash').addEventListener('change', (e) => commitState({ style: { introFlash: e.target.checked } }, true));
    $('chk-intro-set').addEventListener('change', (e) => commitState({ style: { introOnSetChange: e.target.checked } }, true));

    // HUD Tweaks Sliders
    const bindRange = (id, key) => {
      $(id).addEventListener('input', (e) => commitState({ tweaks: { [key]: Number(e.target.value) } }));
    };
    bindRange('rng-offsetY', 'offsetY');
    bindRange('rng-scale', 'scale');
    bindRange('rng-wingSpread', 'wingSpread');
    bindRange('rng-opacity', 'opacity');

    $('btn-reset-tweaks').addEventListener('click', () => {
      const curTheme = THEMES.find(x => x.id === state.theme);
      commitState(buildBuiltInThemeResetPatch(curTheme), true);
      toast('↺ Style Studio, sizes & positions reset to active theme defaults');
    });

    // Global Custom PC Fonts Manager (Upload .ttf/.otf/.woff/.woff2, Pick System Font, Apply Globally, Delete)
    $('btn-upload-pc-font')?.addEventListener('click', () => $('file-custom-font')?.click());
    $('file-custom-font')?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (!file) return;
      if (file.size > 11 * 1024 * 1024) return toast('⚠️ Font file exceeds 11 MB limit');
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = String(reader.result || '');
        const cleanName = file.name.replace(/\.(ttf|otf|woff2?)$/i, '').replace(/[_-]+/g, ' ').trim();
        if (isHttp) {
          try {
            const res = await fetch('/api/fonts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'upload', name: cleanName, filename: file.name, dataUrl })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload failed');
            applyFontsListUpdate(data.fonts);
            if (bc) bc.postMessage({ type: 'fonts', payload: data.fonts });
            toast(`💻 PC Font added globally: ${data.font?.name || cleanName}`);
          } catch (err) {
            toast(`⚠️ ${err.message}`);
          }
        } else {
          const ext = (file.name.match(/\.(ttf|otf|woff2?)$/i) || ['', 'ttf'])[1].toLowerCase();
          const fmtMap = { ttf: 'truetype', otf: 'opentype', woff: 'woff', woff2: 'woff2' };
          const id = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || `font-${Date.now()}`;
          const next = [{ id, name: cleanName, kind: 'file', file: file.name, url: dataUrl, format: fmtMap[ext] || 'truetype' }, ...customFontsDb.filter(x => x.id !== id)];
          applyFontsListUpdate(next);
          toast(`💻 PC Font loaded locally: ${cleanName}`);
        }
      };
      reader.readAsDataURL(file);
    });

    const addSystemPcFont = async (rawFamily) => {
      const fam = String(rawFamily || '').trim();
      if (!fam) return toast('Enter an installed PC font name first');
      if (isHttp) {
        try {
          const res = await fetch('/api/fonts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add-system', name: fam, family: fam })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to add font');
          applyFontsListUpdate(data.fonts);
          if (bc) bc.postMessage({ type: 'fonts', payload: data.fonts });
          if ($('sys-font-input')) $('sys-font-input').value = '';
          toast(`🖥️ System font added: ${fam}`);
        } catch (err) {
          toast(`⚠️ ${err.message}`);
        }
      } else {
        const id = 'sys-' + fam.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 38);
        const next = [{ id, name: fam, kind: 'system', family: fam }, ...customFontsDb.filter(x => x.id !== id)];
        applyFontsListUpdate(next);
        if ($('sys-font-input')) $('sys-font-input').value = '';
        toast(`🖥️ System font added: ${fam}`);
      }
    };

    $('btn-add-sys-font')?.addEventListener('click', () => addSystemPcFont($('sys-font-input')?.value));
    $('sys-font-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addSystemPcFont(e.target.value); } });

    const renderLocalFontChips = (query = '') => {
      const chips = $('local-font-chips');
      if (!chips) return;
      const q = normText(query.trim());
      const list = cachedLocalPcFonts.filter(f => !q || normText(f).includes(q)).slice(0, 120);
      chips.innerHTML = list.map(f => {
        const esc = f.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        return `<button type="button" data-pick-sys-font="${esc}" style="padding:3px 8px;font-size:11px;font-family:'${esc}',sans-serif;">${esc}</button>`;
      }).join('') || '<span style="color:var(--muted);font-size:11px;">No matching system fonts.</span>';
    };

    $('btn-pick-local-font')?.addEventListener('click', async () => {
      if (typeof window.queryLocalFonts !== 'function') {
        return toast('Use "Upload PC Font" (.ttf/.otf) or type your installed font name below');
      }
      try {
        const list = await window.queryLocalFonts();
        const uniq = [...new Set(list.map(f => f.family).filter(Boolean))].sort((a, b) => a.localeCompare(b));
        cachedLocalPcFonts = uniq;
        $('local-font-picker-wrap').style.display = 'block';
        renderLocalFontChips($('local-font-filter')?.value || '');
        toast(`🔍 Loaded ${uniq.length} PC system fonts`);
      } catch {
        toast('Permission declined — upload a .ttf/.otf file or type the font name below');
      }
    });
    $('local-font-filter')?.addEventListener('input', (e) => renderLocalFontChips(e.target.value));
    $('btn-close-local-picker')?.addEventListener('click', () => { $('local-font-picker-wrap').style.display = 'none'; });
    $('local-font-chips')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-pick-sys-font]');
      if (!btn) return;
      addSystemPcFont(btn.dataset.pickSysFont);
      $('local-font-picker-wrap').style.display = 'none';
    });

    $('custom-fonts-list')?.addEventListener('click', async (e) => {
      const ap = e.target.closest('[data-apply-global-font]');
      const dl = e.target.closest('[data-del-custom-font]');
      if (ap) {
        const key = ap.dataset.applyGlobalFont;
        commitState({
          style: { fontName: key, fontScore: key },
          vs: { fontDisplay: key },
          brackets: { fontDisplay: key, fontBody: key },
          results: { fontDisplay: key }
        }, true);
        toast('🌐 Custom font applied globally (Scorebars · VS · Brackets · Top 8)');
      } else if (dl) {
        const id = dl.dataset.delCustomFont;
        if (isHttp) {
          const res = await fetch('/api/fonts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete', id })
          });
          if (res.ok) {
            const data = await res.json();
            applyFontsListUpdate(data.fonts);
            if (bc) bc.postMessage({ type: 'fonts', payload: data.fonts });
            toast('🗑️ Custom font removed');
          }
        } else {
          applyFontsListUpdate(customFontsDb.filter(f => f.id !== id));
          toast('🗑️ Custom font removed');
        }
      }
    });

    document.querySelectorAll('.btn-jump-pc-fonts').forEach(btn => {
      btn.addEventListener('click', () => {
        setActiveWorkspace('scorebars');
        $('bottom-tabs')?.querySelector('button[data-tab="tweaks"]')?.click();
        $('studio-subtabs')?.querySelector('button[data-spane="fonts"]')?.click();
        $('custom-fonts-list')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    // Custom Presets Save / Apply / Delete / Export / Import (Full visual snapshot: theme + style + tweaks + positions + sizes!)
    const buildSavedPresetSnapshot = (name) => ({
      scope: 'scorebar',
      name,
      theme: state.theme,
      tweaks: { ...DEFAULT_TWEAKS, ...(state.tweaks || {}) },
      style: { ...DEFAULT_STYLE, ...(state.style || {}) },
      layoutPos: { ...DEFAULT_LAYOUT_POS, ...(state.layoutPos || {}) },
      eventBarLayout: pickVisualSlice(state.eventBar, EB_VISUAL_KEYS, DEFAULT_EVENT_BAR),
      commentatorsLayout: pickVisualSlice(state.commentators, CM_VISUAL_KEYS, DEFAULT_COMMENTATORS)
    });

    const applySavedPresetSnapshot = (p) => {
      const nextTheme = p.theme || state.theme;
      if (!['checker', 'green'].includes(previewBg)) {
        const t = THEMES.find(x => x.id === nextTheme);
        if (t) {
          const gm = getThemeGameMeta(t);
          const gameBgMap = { tekken8: 't8', sf6: 'sf6', '2xko': '2xko', ffcotw: 'ffcotw', ssbu: 'ssbu', avatar: 'avatar', mk1: 'mk1' };
          setPreviewBackdrop(gameBgMap[gm.gameKey] || 't8');
        }
      }
      commitState({
        theme: nextTheme,
        tweaks: { ...DEFAULT_TWEAKS, ...(p.tweaks || {}) },
        style: { ...DEFAULT_STYLE, ...(p.style || {}) },
        layoutPos: { ...DEFAULT_LAYOUT_POS, ...(p.layoutPos || {}) },
        eventBar: p.eventBarLayout
          ? pickVisualSlice(p.eventBarLayout, EB_VISUAL_KEYS, DEFAULT_EVENT_BAR)
          : pickVisualSlice(DEFAULT_EVENT_BAR, EB_VISUAL_KEYS, DEFAULT_EVENT_BAR),
        commentators: p.commentatorsLayout
          ? pickVisualSlice(p.commentatorsLayout, CM_VISUAL_KEYS, DEFAULT_COMMENTATORS)
          : pickVisualSlice(DEFAULT_COMMENTATORS, CM_VISUAL_KEYS, DEFAULT_COMMENTATORS)
      }, true);
    };
    window.__sbPresetHelpers = { buildSavedPresetSnapshot, applySavedPresetSnapshot };

    $('btn-save-preset').addEventListener('click', async () => {
      const name = $('preset-name-input').value.trim();
      if (!name) return toast('Enter a preset name first');
      const payload = buildSavedPresetSnapshot(name);
      if (isHttp) {
        const res = await fetch('/api/presets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) presetsDb = await res.json();
      } else {
        const idx = presetsDb.findIndex(x => x.name.toLowerCase() === name.toLowerCase());
        const entry = { id: idx >= 0 ? presetsDb[idx].id : `preset-${Date.now()}`, ...payload, savedAt: Date.now() };
        if (idx >= 0) presetsDb[idx] = entry;
        else presetsDb.unshift(entry);
      }
      $('preset-name-input').value = '';
      renderPresetsList();
      toast(`💾 Preset saved (style + layout): ${name}`);
    });
    $('presets-list').addEventListener('click', async (e) => {
      const ap = e.target.closest('[data-apply-preset]');
      const dl = e.target.closest('[data-del-preset]');
      if (ap) {
        const p = presetsDb[Number(ap.dataset.applyPreset)];
        if (p) {
          applySavedPresetSnapshot(p);
          toast(`✨ Preset applied: ${p.name}`);
        }
      } else if (dl) {
        const p = presetsDb[Number(dl.dataset.delPreset)];
        if (!p) return;
        if (isHttp) {
          const res = await fetch('/api/presets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', id: p.id }) });
          if (res.ok) presetsDb = await res.json();
        } else {
          presetsDb = presetsDb.filter(x => x.id !== p.id);
        }
        renderPresetsList();
        toast(`Deleted: ${p.name}`);
      }
    });
    $('btn-export-preset').addEventListener('click', () => {
      const name = $('preset-name-input').value.trim() || state.theme;
      const data = {
        format: 'fgc-open-scorebar-preset-v2',
        ...buildSavedPresetSnapshot(name)
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${data.name.toLowerCase().replace(/[^a-z0-9-_]+/g, '-')}.fgcstyle.json`;
      a.click();
      URL.revokeObjectURL(a.href);
      toast('⬇ Preset exported as JSON');
    });
    $('btn-import-preset').addEventListener('click', () => $('file-import-preset').click());
    $('file-import-preset').addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const parsed = JSON.parse(await file.text());
        if (!parsed.style && !parsed.theme) throw new Error('Invalid file');
        applySavedPresetSnapshot(parsed);
        toast(`⬆ Preset imported: ${parsed.name || file.name}`);
      } catch {
        toast('Error: invalid JSON preset file');
      }
      e.target.value = '';
    });

    // Event Bar & Commentators Studio Bindings
    $('eb-subtabs')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-epane]');
      if (!btn) return;
      $('eb-subtabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      document.querySelectorAll('.eb-studio-pane').forEach(p => p.classList.toggle('active', p.id === `epane-${btn.dataset.epane}`));
    });
    $('chk-eb-vis-mirror')?.addEventListener('change', (e) => commitState({ showBottomBar: e.target.checked }, true));
    $('chk-cm-vis-mirror')?.addEventListener('change', (e) => commitState({ showCommentators: e.target.checked }, true));
    $('btn-test-both-lower')?.addEventListener('click', () => {
      commitState({ showBottomBar: true, showCommentators: true }, true);
      toast('🛡️ Event Bar + Commentators active (Zero-Overlap)');
    });

    // Event Bar fields
    $('eb-title')?.addEventListener('input', (e) => commitState({ eventBar: { title: e.target.value } }));
    $('eb-subtitle')?.addEventListener('input', (e) => commitState({ eventBar: { subtitle: e.target.value } }));
    $('eb-ticker')?.addEventListener('input', (e) => commitState({ eventBar: { tickerText: e.target.value } }));
    $('chk-eb-sub')?.addEventListener('change', (e) => commitState({ eventBar: { showSubtitle: e.target.checked } }, true));
    $('chk-eb-logo')?.addEventListener('change', (e) => commitState({ eventBar: { showLogo: e.target.checked } }, true));
    $('chk-eb-sync-logo')?.addEventListener('change', (e) => {
      const en = e.target.checked;
      commitState({ eventBar: { syncLogo: en } }, true);
      if (en && !state.vs?.logoUrl) syncEventLogoFromTournament(true);
    });
    $('btn-eb-pull-logo')?.addEventListener('click', () => {
      commitState({ eventBar: { syncLogo: true, showLogo: true } }, true);
      syncEventLogoFromTournament(false);
    });
    $('btn-eb-upload-logo')?.addEventListener('click', () => $('file-eb-logo')?.click());
    $('file-eb-logo')?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        commitState({ eventBar: { logoUrl: String(reader.result || ''), syncLogo: false, showLogo: true } }, true);
        toast('🏷️ Custom Event Bar logo uploaded');
      };
      reader.readAsDataURL(file);
    });
    $('btn-eb-clear-logo')?.addEventListener('click', () => {
      commitState({ eventBar: { logoUrl: '', syncLogo: true } }, true);
      toast('Event Bar custom logo cleared');
    });
    $('eb-logo-pos')?.addEventListener('change', (e) => commitState({ eventBar: { logoPos: e.target.value } }, true));
    $('eb-style')?.addEventListener('change', (e) => commitState({ eventBar: { style: e.target.value } }, true));
    $('eb-pos')?.addEventListener('change', (e) => commitState({ eventBar: { position: e.target.value } }, true));
    $('eb-anim')?.addEventListener('change', (e) => commitState({ eventBar: { anim: e.target.value } }, true));
    $('chk-eb-custom')?.addEventListener('change', (e) => commitState({ eventBar: { customColors: e.target.checked } }, true));
    const bindEbRange = (id, key) => $(id)?.addEventListener('input', (e) => commitState({ eventBar: { [key]: Number(e.target.value) } }));
    bindEbRange('rng-eb-logoScale', 'logoScale');
    bindEbRange('rng-eb-scale', 'scale');
    bindEbRange('rng-eb-width', 'width');
    bindEbRange('rng-eb-offX', 'offsetX');
    bindEbRange('rng-eb-offY', 'offsetY');
    bindEbRange('rng-eb-opacity', 'opacity');
    bindEbRange('rng-eb-borderW', 'borderWidth');
    const bindEbColor = (id, key) => $(id)?.addEventListener('input', (e) => commitState({ eventBar: { customColors: true, [key]: e.target.value } }));
    bindEbColor('eb-bg1', 'bgColor1');
    bindEbColor('eb-bg2', 'bgColor2');
    bindEbColor('eb-accent', 'accentColor');
    bindEbColor('eb-text', 'textColor');
    bindEbColor('eb-sub', 'subColor');
    $('btn-reset-eb')?.addEventListener('click', () => {
      commitState({ eventBar: { ...DEFAULT_EVENT_BAR } }, true);
      toast('↺ Event Bar reset to Auto Preset');
    });

    // Commentators Studio fields
    for (const [id, key] of [
      ['c1-name', 'c1Name'], ['c1-handle', 'c1Handle'], ['c1-role', 'c1Role'],
      ['c2-name', 'c2Name'], ['c2-handle', 'c2Handle'], ['c2-role', 'c2Role'],
      ['c3-name', 'c3Name'], ['c3-handle', 'c3Handle'], ['c3-role', 'c3Role']
    ]) {
      $(id)?.addEventListener('input', (e) => commitState({ commentators: { [key]: e.target.value } }));
    }
    $('btn-swap-casters')?.addEventListener('click', () => {
      const c = state.commentators || {};
      commitState({
        commentators: {
          c1Name: c.c2Name || '', c1Handle: c.c2Handle || '', c1Role: c.c2Role || '',
          c2Name: c.c1Name || '', c2Handle: c.c1Handle || '', c2Role: c.c1Role || ''
        }
      }, true);
    });
    $('seg-cm-antiOverlap')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-val]');
      if (!btn) return;
      commitState({ commentators: { antiOverlap: btn.dataset.val } }, true);
    });
    $('cm-icon')?.addEventListener('change', (e) => commitState({ commentators: { iconStyle: e.target.value } }, true));
    $('cm-sep')?.addEventListener('change', (e) => commitState({ commentators: { sepStyle: e.target.value } }, true));
    $('cm-style')?.addEventListener('change', (e) => commitState({ commentators: { style: e.target.value } }, true));
    $('cm-layout')?.addEventListener('change', (e) => commitState({ commentators: { layout: e.target.value } }, true));
    $('cm-pos')?.addEventListener('change', (e) => commitState({ commentators: { position: e.target.value } }, true));
    $('cm-anim')?.addEventListener('change', (e) => commitState({ commentators: { anim: e.target.value } }, true));
    $('chk-cm-custom')?.addEventListener('change', (e) => commitState({ commentators: { customColors: e.target.checked } }, true));
    $('chk-cm-logo')?.addEventListener('change', (e) => commitState({ commentators: { showLogo: e.target.checked } }, true));
    const bindCmRange = (id, key) => $(id)?.addEventListener('input', (e) => commitState({ commentators: { [key]: Number(e.target.value) } }));
    bindCmRange('rng-cm-scale', 'scale');
    bindCmRange('rng-cm-opacity', 'opacity');
    bindCmRange('rng-cm-offX', 'offsetX');
    bindCmRange('rng-cm-offY', 'offsetY');
    const bindCmColor = (id, key) => $(id)?.addEventListener('input', (e) => commitState({ commentators: { customColors: true, [key]: e.target.value } }));
    bindCmColor('cm-bg1', 'bgColor1');
    bindCmColor('cm-bg2', 'bgColor2');
    bindCmColor('cm-accent', 'accentColor');
    bindCmColor('cm-text', 'textColor');
    bindCmColor('cm-handle', 'handleColor');
    $('btn-reset-cm')?.addEventListener('click', () => {
      const c = state.commentators || {};
      commitState({
        commentators: {
          ...DEFAULT_COMMENTATORS,
          c1Name: c.c1Name ?? 'CASTER 1', c1Handle: c.c1Handle ?? '@caster1', c1Role: c.c1Role ?? '',
          c2Name: c.c2Name ?? 'CASTER 2', c2Handle: c.c2Handle ?? '@caster2', c2Role: c.c2Role ?? '',
          c3Name: c.c3Name ?? '', c3Handle: c.c3Handle ?? '', c3Role: c.c3Role ?? ''
        }
      }, true);
      toast('↺ Commentators style reset to Auto Preset');
    });

    // Saved players click actions
    $('players-list').addEventListener('click', (e) => {
      const b1 = e.target.closest('[data-load-p1]');
      const b2 = e.target.closest('[data-load-p2]');
      const t1 = e.target.closest('[data-load-t1]');
      const t2 = e.target.closest('[data-load-t2]');
      const del = e.target.closest('[data-del-player]');
      if (b1) {
        const p = playersDb[Number(b1.dataset.loadP1)];
        if (p) applyPlayerToSide('p1', p);
      } else if (b2) {
        const p = playersDb[Number(b2.dataset.loadP2)];
        if (p) applyPlayerToSide('p2', p);
      } else if (t1) {
        const p = playersDb[Number(t1.dataset.loadT1)];
        if (p) applyPlayerToSide('p1-partner', p);
      } else if (t2) {
        const p = playersDb[Number(t2.dataset.loadT2)];
        if (p) applyPlayerToSide('p2-partner', p);
      } else if (del) {
        const p = playersDb[Number(del.dataset.delPlayer)];
        if (p) deletePlayer(p.name);
      }
    });

    // Copy URLs & Open overlay
    const copyText = (txt, label) => {
      navigator.clipboard?.writeText(txt).then(() => toast(`📋 ${label} copied`)).catch(() => toast(txt));
    };
    $('btn-copy-obs').addEventListener('click', () => copyText($('obs-url-text').textContent, 'OBS URL'));
    $('copy-obs-2').addEventListener('click', () => copyText($('obs-url-text').textContent, 'OBS URL'));
    $('btn-copy-vs').addEventListener('click', () => copyText($('vs-url-text').textContent, 'VS Splash OBS URL'));
    $('copy-vs-2').addEventListener('click', () => copyText($('vs-url-text').textContent, 'VS Splash OBS URL'));
    $('btn-copy-results').addEventListener('click', () => copyText($('results-url-text').textContent, 'Tournament Results OBS URL'));
    $('copy-results-2').addEventListener('click', () => copyText($('results-url-text').textContent, 'Tournament Results OBS URL'));
    $('copy-dock').addEventListener('click', () => copyText($('dock-url-text').textContent, 'Dock URL'));
    let lastRenderedQrUrl = '';
    const renderLanQr = (url) => {
      const clean = String(url || '').trim();
      if (!clean || clean === lastRenderedQrUrl || !window.FGC_QR) return;
      lastRenderedQrUrl = clean;
      try {
        const svg = window.FGC_QR.renderSvg(clean, { quiet: 3 });
        if ($('lan-qr-box')) $('lan-qr-box').innerHTML = svg;
        if ($('qr-zoom-svg')) $('qr-zoom-svg').innerHTML = svg;
        if ($('qr-zoom-url')) $('qr-zoom-url').textContent = clean;
      } catch {}
    };
    const openQrModal = () => {
      const cur = $('lan-url-text')?.textContent || '';
      if (cur.startsWith('http')) renderLanQr(cur);
      $('qr-modal')?.classList.add('open');
    };
    const closeQrModal = () => $('qr-modal')?.classList.remove('open');
    $('lan-qr-box')?.addEventListener('click', openQrModal);
    $('btn-lan-qr-zoom')?.addEventListener('click', openQrModal);
    $('btn-close-qr-modal')?.addEventListener('click', closeQrModal);
    $('qr-modal')?.addEventListener('click', (e) => { if (e.target === $('qr-modal')) closeQrModal(); });
    $('btn-qr-zoom-copy')?.addEventListener('click', () => copyText($('qr-zoom-url')?.textContent || '', 'LAN Mobile URL'));
    $('btn-lan-copy-fw')?.addEventListener('click', () => {
      const port = (location.port || '8787');
      const cmd = `New-NetFirewallRule -DisplayName "FGC Open Scorebars (LAN ${port})" -Direction Inbound -Protocol TCP -LocalPort ${port} -Profile Private -Action Allow`;
      copyText(cmd, 'Windows Firewall PowerShell command');
    });

    $('copy-lan').addEventListener('click', () => copyText($('lan-url-text').textContent, 'LAN Mobile URL'));
    $('lan-alt-list')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-copy-alt-lan]');
      if (!btn) return;
      const altUrl = btn.dataset.copyAltLan;
      renderLanQr(altUrl);
      copyText(altUrl, 'Alternate Network URL (QR updated)');
    });
    $('btn-open-overlay').addEventListener('click', () => window.open('index.html', '_blank'));
    $('btn-open-vs').addEventListener('click', () => window.open('vs.html', '_blank'));
    $('btn-open-results').addEventListener('click', () => window.open('results.html', '_blank'));

    // Global Keyboard Hotkeys
    window.addEventListener('keydown', (e) => {
      if (!e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === '1' || e.code === 'Digit1') {
        e.preventDefault();
        const delta = e.shiftKey ? -1 : 1;
        commitState({ p1: { score: Math.max(0, Math.min(99, Number(state.p1.score) + delta)) } }, true);
      } else if (k === '2' || e.code === 'Digit2') {
        e.preventDefault();
        const delta = e.shiftKey ? -1 : 1;
        commitState({ p2: { score: Math.max(0, Math.min(99, Number(state.p2.score) + delta)) } }, true);
      } else if (k === 's') {
        e.preventDefault();
        $('btn-swap').click();
      } else if (k === 'r') {
        e.preventDefault();
        $('btn-reset-scores').click();
      } else if (k === 'h') {
        e.preventDefault();
        $('btn-toggle-vis').click();
      } else if (k === 'e') {
        e.preventDefault();
        $('btn-replay-obs').click();
      }
    });
  }

  async function savePlayer(p) {
    if (!p.name || !p.name.trim()) return toast('Enter a player name first');
    const entry = { name: p.name.trim(), sponsor: p.sponsor || '', flag: p.flag || '', region: p.region || '', character: p.character || '', pronouns: p.pronouns || '', handle: p.handle || '', seed: String(p.seed || '').replace(/^seed\s*/i, '').replace(/^#/, '').trim(), avatar: p.avatar || '' };
    if (isHttp) {
      const res = await fetch('/api/players', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry)
      });
      if (res.ok) playersDb = await res.json();
    } else {
      const idx = playersDb.findIndex(x => x.name.toLowerCase() === entry.name.toLowerCase());
      if (idx >= 0) playersDb[idx] = entry; else playersDb.unshift(entry);
    }
    renderPlayersDb();
    toast(`💾 Saved: ${entry.name}`);
  }

  async function deletePlayer(name) {
    if (isHttp) {
      const res = await fetch('/api/players', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', name })
      });
      if (res.ok) playersDb = await res.json();
    } else {
      playersDb = playersDb.filter(p => p.name.toLowerCase() !== name.toLowerCase());
    }
    renderPlayersDb();
    toast(`Deleted: ${name}`);
  }

  /* =========================================================================
     TOURNAMENTS (START.GG & CHALLONGE) + MATCH HISTORY & H2H ENGINE
     ========================================================================= */
  function computeH2H(nameA, nameB) {
    const a = normText(nameA);
    const b = normText(nameB);
    if (!a || !b || a === b) return { winsA: 0, winsB: 0, total: 0 };
    let winsA = 0, winsB = 0;
    for (const h of historyDb) {
      const p1 = normText(h.p1?.name);
      const p2 = normText(h.p2?.name);
      if (p1 === a && p2 === b) {
        if (h.winnerSide === 'p1') winsA++; else winsB++;
      } else if (p1 === b && p2 === a) {
        if (h.winnerSide === 'p1') winsB++; else winsA++;
      }
    }
    return { winsA, winsB, total: winsA + winsB };
  }

  function renderH2H() {
    const n1 = state.p1?.name || 'P1';
    const n2 = state.p2?.name || 'P2';
    const h2h = computeH2H(n1, n2);
    $('h2h-title').textContent = `⚔️ Head-to-Head: ${n1} vs ${n2}`;
    $('h2h-detail').textContent = h2h.total > 0
      ? `Local match record: ${n1} ${h2h.winsA} - ${h2h.winsB} ${n2} (${h2h.total} recorded sets)`
      : 'No previous matches recorded between these two players.';
    $('am-h2h').textContent = h2h.total > 0 ? `· H2H ${h2h.winsA}-${h2h.winsB}` : '';
  }

  function renderActiveMatchBar() {
    const am = state.activeMatch;
    const bar = $('active-match-bar');
    if (!am) {
      bar.classList.remove('visible');
      return;
    }
    bar.classList.add('visible');
    const pill = $('am-provider-pill');
    pill.textContent = am.provider === 'startgg' ? 'START.GG' : am.provider === 'challonge' ? 'CHALLONGE' : 'DEMO';
    pill.className = `am-pill ${am.provider}`;
    $('am-swapped-pill').style.display = am.swapped ? 'inline-block' : 'none';
    $('am-summary').textContent = `${am.roundText || state.round} · ${state.p1.name} ${state.p1.score} - ${state.p2.score} ${state.p2.name}`;
    $('btn-am-sync-live').style.display = am.provider === 'challonge' ? 'inline-flex' : 'none';
  }

  function renderHistoryList() {
    $('hist-count').textContent = historyDb.length;
    renderH2H();
    $('history-list').innerHTML = historyDb.map(h => {
      const dt = new Date(h.ts).toLocaleString([], { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
      const p1Win = h.winnerSide === 'p1';
      const f1 = h.p1?.flag && FLAGS_MAP[h.p1.flag] ? `<span style="display:inline-block;width:16px;height:11px;vertical-align:middle;margin-right:4px;">${FLAGS_MAP[h.p1.flag].svg}</span>` : '';
      const f2 = h.p2?.flag && FLAGS_MAP[h.p2.flag] ? `<span style="display:inline-block;width:16px;height:11px;vertical-align:middle;margin-left:4px;">${FLAGS_MAP[h.p2.flag].svg}</span>` : '';
      return `
        <div class="history-row">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span class="am-pill ${h.provider === 'challonge' ? 'challonge' : h.provider === 'demo' ? 'demo' : ''}" style="font-size:9px;">${h.provider || 'local'}</span>
            <span style="color:var(--muted);font-size:11px;">${dt} · ${h.round || 'Set'}</span>
            <span>${f1}<b style="color:${p1Win ? '#4ade80' : '#fff'}">${h.p1?.sponsor ? `[${h.p1.sponsor}] ` : ''}${h.p1?.name}</b></span>
            <span class="history-score">${h.p1?.score ?? 0} - ${h.p2?.score ?? 0}</span>
            <span><b style="color:${!p1Win ? '#4ade80' : '#fff'}">${h.p2?.sponsor ? `[${h.p2.sponsor}] ` : ''}${h.p2?.name}</b>${f2}</span>
          </div>
          <button type="button" data-del-hist="${h.id}" style="padding:3px 7px;font-size:10px;" title="Remove from history">✕</button>
        </div>`;
    }).join('') || '<div style="padding:16px;text-align:center;color:var(--muted);font-size:11px;">No sets recorded yet. Click "💾 Save Current Set" or report a tournament match.</div>';
  }

  function getSelectedDemoGame() {
    const selVal = $('trn-demo-game')?.value;
    if (selVal) return selVal;
    return state.vs?.game || state.results?.game || 'tekken8';
  }

  function updateProviderFormUI() {
    const prov = trnState.provider;
    $('trn-provider-tabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.prov === prov));
    const urlInp = $('trn-url-input');
    const demoWrap = $('trn-demo-game-wrap');
    const demoSel = $('trn-demo-game');
    const tokInp = $('trn-token-input');
    const link = $('trn-token-link');
    const clrBtn = $('btn-trn-clear-token');
    const remChk = $('chk-trn-remember-token');
    const cfg = trnState.config || {};
    if (remChk) remChk.checked = Boolean(cfg.persistTokens);

    if (prov === 'demo') {
      $('trn-url-label').textContent = tr('🎮 Demo Game Configuration (64 Entrants)');
      urlInp.style.display = 'none';
      if (demoWrap) demoWrap.style.display = 'block';
      if (demoSel) {
        const preferred = trnState.snapshot?.provider === 'demo' && trnState.snapshot?.gameId
          ? trnState.snapshot.gameId
          : (state.vs?.game || state.results?.game || demoSel.value || 'tekken8');
        if ([...demoSel.options].some(o => o.value === preferred)) demoSel.value = preferred;
      }
      urlInp.value = 'demo-tournament';
      urlInp.disabled = true;
      tokInp.value = '';
      tokInp.disabled = true;
      tokInp.placeholder = tr('Offline Demo · 64 Entrants (Full Pools, Top 16 & Top 8)');
      $('trn-token-hint').textContent = '100% offline 64-entrant test bracket · switch any game!';
      if (clrBtn) clrBtn.style.display = 'none';
    } else if (prov === 'startgg') {
      urlInp.style.display = '';
      if (demoWrap) demoWrap.style.display = 'none';
      urlInp.disabled = false;
      tokInp.disabled = false;
      $('trn-url-label').textContent = 'Tournament URL or Slug (start.gg)';
      urlInp.placeholder = 'https://www.start.gg/tournament/your-tournament/event/tekken-8';
      urlInp.value = cfg.startggUrl || '';
      link.href = 'https://start.gg/admin/profile/developer';
      tokInp.value = '';
      tokInp.placeholder = cfg.hasStartggToken ? '🔒 Token loaded (hidden) — leave blank to reuse' : 'Paste your personal start.gg token (hidden)';
      $('trn-token-hint').textContent = cfg.hasStartggToken
        ? (cfg.persistTokens ? '🔒 Token saved locally on this PC (never uploaded)' : '🔒 Token active in RAM only (cleared on restart)')
        : 'Session-only by default · never uploaded';
      if (clrBtn) clrBtn.style.display = cfg.hasStartggToken ? 'inline-flex' : 'none';
    } else {
      urlInp.style.display = '';
      if (demoWrap) demoWrap.style.display = 'none';
      urlInp.disabled = false;
      tokInp.disabled = false;
      $('trn-url-label').textContent = 'Tournament URL or Slug (challonge.com)';
      urlInp.placeholder = 'https://challonge.com/your_tournament (supports org.challonge.com subdomains)';
      urlInp.value = cfg.challongeUrl || '';
      link.href = 'https://challonge.com/settings/developer';
      tokInp.value = '';
      tokInp.placeholder = cfg.hasChallongeKey ? '🔒 API key loaded (hidden) — leave blank to reuse' : 'Paste your personal Challonge API Key (hidden)';
      $('trn-token-hint').textContent = cfg.hasChallongeKey
        ? (cfg.persistTokens ? '🔒 API key saved locally on this PC (never uploaded)' : '🔒 API key active in RAM only (cleared on restart)')
        : 'Session-only by default · never uploaded';
      if (clrBtn) clrBtn.style.display = cfg.hasChallongeKey ? 'inline-flex' : 'none';
    }
    updateProviderTabsStatus();
  }

  function updateProviderTabsStatus() {
    const labels = {
      startgg: '🟣 Start.gg (GraphQL)',
      challonge: '🟠 Challonge (API v1)',
      demo: '⚡ Demo Tournament (No Token)'
    };
    $('trn-provider-tabs')?.querySelectorAll('button[data-prov]').forEach(b => {
      const p = b.dataset.prov;
      const hasSnap = Boolean(trnState.snapshots?.[p]);
      const isLive = trnState.activeLiveProvider === p && hasSnap;
      b.classList.toggle('active-chip', p === trnState.provider);
      const badge = isLive ? ' · 🔒 LIVE' : (hasSnap ? ' · ●' : '');
      b.textContent = `${labels[p] || p}${badge}`;
    });

    const curSnap = trnState.snapshots?.[trnState.provider] || null;
    const anyLoaded = Boolean(trnState.snapshots?.startgg || trnState.snapshots?.challonge || trnState.snapshots?.demo);
    const hasUrl = (trnState.provider === 'startgg' && Boolean(trnState.config?.startggUrl))
      || (trnState.provider === 'challonge' && Boolean(trnState.config?.challongeUrl));
    if ($('btn-trn-clear')) {
      $('btn-trn-clear').style.display = (curSnap || anyLoaded || hasUrl) ? 'inline-flex' : 'none';
    }

    // Safety Shield Banner: visible whenever ANOTHER provider holds the Live Source lock!
    const shield = $('trn-safety-shield');
    const liveProv = trnState.activeLiveProvider;
    const liveSnap = liveProv ? trnState.snapshots?.[liveProv] : null;
    const isOtherLive = Boolean(liveProv && liveSnap && liveProv !== trnState.provider);
    if (shield) {
      if (isOtherLive) {
        shield.style.display = 'flex';
        const liveName = liveSnap.tournament?.name || liveProv.toUpperCase();
        const curName = curSnap?.tournament?.name || trnState.provider.toUpperCase();
        if ($('trn-shield-title')) {
          $('trn-shield-title').textContent = curSnap
            ? `${tr('Safety Shield Active — Isolated Mode')} (${trnState.provider.toUpperCase()})`
            : `${tr('Safety Shield Active — Isolated Mode')} (${liveProv.toUpperCase()} 🔒 LIVE)`;
        }
        if ($('trn-shield-desc')) {
          $('trn-shield-desc').textContent = curSnap
            ? `Live overlays, logo & Top 8 are locked to ${liveProv.toUpperCase()} ("${liveName}"). Viewing ${trnState.provider.toUpperCase()} ("${curName}") in isolated standby — nothing will be overwritten.`
            : `Live overlays, logo & Top 8 are currently locked to ${liveProv.toUpperCase()} ("${liveName}"). Connecting ${trnState.provider.toUpperCase()} here will load in isolated standby mode without overwriting your live stream.`;
        }
        if ($('btn-trn-make-live')) $('btn-trn-make-live').style.display = curSnap ? 'inline-flex' : 'none';
      } else {
        shield.style.display = 'none';
      }
    }
  }

  function renderTournamentSets() {
    trnState.snapshot = trnState.snapshots?.[trnState.provider] || null;
    updateProviderTabsStatus();
    const snap = trnState.snapshot;
    if (!snap) {
      $('trn-banner')?.classList.remove('visible');
      if ($('trn-filter-bar')) $('trn-filter-bar').style.display = 'none';
      if ($('seed-count')) $('seed-count').textContent = '0';
      if ($('trn-sets-grid')) {
        const provLabel = trnState.provider === 'startgg' ? 'start.gg' : (trnState.provider === 'challonge' ? 'Challonge' : 'Demo Tournament');
        $('trn-sets-grid').innerHTML = `<div style="grid-column:1/-1;padding:18px;text-align:center;color:var(--muted);background:#0d1018;border:1px dashed var(--border);border-radius:8px;">No <b>${provLabel}</b> tournament loaded right now. Paste a URL &amp; click <b>🔌 Connect</b> above${trnState.activeLiveProvider && trnState.activeLiveProvider !== trnState.provider ? ` (your active <b>${trnState.activeLiveProvider.toUpperCase()}</b> stream stays protected in isolated mode)` : ''}.</div>`;
      }
      renderTournamentSeeding();
      const liveSnap = trnState.activeLiveProvider ? trnState.snapshots?.[trnState.activeLiveProvider] : null;
      if ($('trn-ws-badge')) {
        const liveQ = liveSnap ? (liveSnap.streamQueue || []).length : 0;
        const liveOpen = liveSnap ? (liveSnap.sets || []).filter(s => s.state !== 'complete').length : 0;
        $('trn-ws-badge').textContent = liveSnap ? (liveQ ? `${liveQ} Queue` : `${liveOpen} Open`) : 'Start.gg / Challonge';
      }
      return;
    }

    $('trn-banner').classList.add('visible');
    $('trn-filter-bar').style.display = 'flex';
    $('trn-name-display').textContent = `${snap.tournament.name}`;
    $('trn-meta-display').textContent = `${snap.provider.toUpperCase()} · ${snap.tournament.location || snap.tournament.slug} · ${snap.sets.length} sets loaded`;
    const lockPill = $('trn-live-lock-pill');
    if (lockPill) {
      const isLive = trnState.activeLiveProvider === snap.provider;
      lockPill.style.display = 'inline-flex';
      lockPill.textContent = isLive ? tr('🔒 LIVE SOURCE') : tr('🛡️ ISOLATED (STANDBY)');
      lockPill.style.background = isLive ? 'rgba(34,197,94,.18)' : 'rgba(245,158,11,.18)';
      lockPill.style.color = isLive ? '#86efac' : '#fde68a';
      lockPill.style.border = isLive ? '1px solid rgba(34,197,94,.45)' : '1px solid rgba(245,158,11,.45)';
    }
    const trnLogo = snap.tournament.cachedLogoUrl || snap.tournament.logoUrl || '';
    const trnThumb = $('trn-logo-thumb');
    if (trnLogo) {
      trnThumb.src = trnLogo;
      trnThumb.style.display = 'block';
      $('btn-trn-use-logo').style.display = 'inline-flex';
    } else {
      trnThumb.style.display = 'none';
      $('btn-trn-use-logo').style.display = 'none';
    }

    $('trn-event-select').innerHTML = (snap.events || []).map(ev =>
      `<option value="${ev.id}" ${ev.id === snap.selectedEventId ? 'selected' : ''}>${ev.name}${ev.numEntrants ? ` (${ev.numEntrants})` : ''}</option>`
    ).join('');

    const streamList = snap.streamQueue || [];
    const openList = (snap.sets || []).filter(s => s.state !== 'complete');
    const doneList = (snap.sets || []).filter(s => s.state === 'complete');
    $('cnt-stream').textContent = streamList.length;
    $('cnt-open').textContent = openList.length;
    $('cnt-done').textContent = doneList.length;
    $('cnt-all').textContent = (snap.sets || []).length;
    if ($('trn-ws-badge')) {
      $('trn-ws-badge').textContent = streamList.length ? `${streamList.length} Queue` : `${openList.length} Open`;
    }

    let baseList = snap.sets || [];
    if (trnState.filter === 'stream') baseList = streamList;
    else if (trnState.filter === 'open') baseList = openList;
    else if (trnState.filter === 'complete') baseList = doneList;

    const q = normText(trnState.search);
    const filtered = q
      ? baseList.filter(s => normText(`${s.roundText} ${s.p1.name} ${s.p1.sponsor} ${s.p2.name} ${s.p2.sponsor} ${s.streamName}`).includes(q))
      : baseList;

    const fmtFlags = (p) => {
      const f1 = p.flag && FLAGS_MAP[p.flag] ? `<span>${FLAGS_MAP[p.flag].svg}</span>` : '';
      const f2 = p.region && FLAGS_MAP[p.region] ? `<span>${FLAGS_MAP[p.region].svg}</span>` : '';
      return (f1 || f2) ? `<span class="pop-flags">${f1}${f2}</span>` : '';
    };
    const stLabel = { active: 'LIVE', called: 'CALLED', open: 'READY', pending: 'UPCOMING', complete: 'FINAL' };

    $('trn-sets-grid').innerHTML = filtered.map(s => {
      const isLinked = state.activeMatch?.setId === s.id;
      const p1Win = s.winnerId && String(s.winnerId) === String(s.p1.entrantId);
      const p2Win = s.winnerId && String(s.winnerId) === String(s.p2.entrantId);
      const sd1 = resolveSlotSeed(s.p1);
      const sd2 = resolveSlotSeed(s.p2);
      const up = s.upset?.isUpset ? s.upset : null;
      return `
        <div class="trn-set-card ${isLinked ? 'is-linked' : ''}">
          <div class="trn-set-head">
            <span>${s.roundText} ${s.streamName ? `<span class="trn-stream-pill">📺 ${s.streamName}</span>` : ''} ${up ? `<span class="trn-upset-pill" title="Seed #${up.winnerSeed} defeated Seed #${up.loserSeed}">🔥 UPSET${up.upsetFactor > 0 ? ` · UF +${up.upsetFactor}` : ''}</span>` : ''}</span>
            <span class="trn-status ${s.state}">${stLabel[s.state] || s.state}</span>
          </div>
          <div class="trn-player-line ${p1Win ? 'winner' : ''}">
            <span class="trn-player-left">
              ${sd1 ? `<span class="trn-seed-chip" title="Seed #${sd1}">#${sd1}</span>` : ''}
              ${fmtFlags(s.p1)}
              ${s.p1.sponsor ? `<span class="pop-sp">${s.p1.sponsor}</span>` : ''}
              <b>${s.p1.name}</b>
              ${s.p1.bracket ? `<span style="font-size:9px;color:var(--gold)">[${s.p1.bracket}]</span>` : ''}
            </span>
            <span>${s.p1.score}</span>
          </div>
          <div class="trn-player-line ${p2Win ? 'winner' : ''}">
            <span class="trn-player-left">
              ${sd2 ? `<span class="trn-seed-chip" title="Seed #${sd2}">#${sd2}</span>` : ''}
              ${fmtFlags(s.p2)}
              ${s.p2.sponsor ? `<span class="pop-sp">${s.p2.sponsor}</span>` : ''}
              <b>${s.p2.name}</b>
              ${s.p2.bracket ? `<span style="font-size:9px;color:var(--gold)">[${s.p2.bracket}]</span>` : ''}
            </span>
            <span>${s.p2.score}</span>
          </div>
          <div class="trn-set-foot">
            <span style="font-size:10px;color:var(--muted);">${isLinked ? '🔗 Live on Scorebar' : `ID #${s.id}`}</span>
            <button type="button" class="primary" data-load-set="${s.id}">▶ Load to Scorebar</button>
          </div>
        </div>`;
    }).join('') || '<div style="grid-column:1/-1;padding:16px;text-align:center;color:var(--muted);font-size:11px;">No sets match this filter. Try "Active / Open" or "All".</div>';

    renderTournamentSeeding();
  }

  function cleanValidSeed(v) {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(String(v).replace(/^seed\s*/i, '').replace(/^#/, '').trim());
    return Number.isInteger(n) && n >= 1 ? n : null;
  }

  function findSeedEntryForPlayer(slot) {
    const seeds = trnState.snapshot?.seeds || [];
    if (!seeds.length || !slot) return null;
    if (slot.entrantId) {
      const byId = seeds.find(x => x.entrantId && String(x.entrantId) === String(slot.entrantId));
      if (byId) return byId;
    }
    const key = normText(slot.name || '').trim();
    if (!key) return null;
    return seeds.find(x => normText(x.name || '').trim() === key) || null;
  }

  function resolveSlotSeed(slot) {
    if (!slot) return null;
    const ref = findSeedEntryForPlayer(slot);
    const initS = cleanValidSeed(slot.initialSeed ?? ref?.initialSeed ?? slot.seed ?? ref?.seed);
    const phaseS = cleanValidSeed(slot.phaseSeed ?? ref?.phaseSeed);
    if (state.seedMode === 'phase') return phaseS ?? initS;
    return initS ?? phaseS;
  }

  let trnSeedSearch = '';
  function renderTournamentSeeding() {
    const snap = trnState.snapshot;
    const seeds = snap?.seeds || [];
    const phases = snap?.phases || [];
    if ($('seed-count')) $('seed-count').textContent = seeds.length;

    // Sync global seed visibility checkboxes & seedMode chips
    if ($('chk-seed-sync-sb')) $('chk-seed-sync-sb').checked = Boolean(state.showSeed);
    if ($('chk-seed-sync-vs')) $('chk-seed-sync-vs').checked = state.vs?.showSeed !== false;
    if ($('chk-seed-sync-res')) $('chk-seed-sync-res').checked = state.results?.showSeed !== false;
    $('seg-trn-seed-mode')?.querySelectorAll('button[data-val]').forEach(b => {
      b.classList.toggle('active-chip', b.dataset.val === (state.seedMode || 'initial'));
    });

    const phSel = $('trn-phase-select');
    if (phSel) {
      if (phases.length) {
        phSel.innerHTML = phases.map(ph =>
          `<option value="${ph.id}" ${String(ph.id) === String(snap?.selectedPhaseId) ? 'selected' : ''}>${ph.name}${ph.numSeeds ? ` (${ph.numSeeds} seeds)` : ''}</option>`
        ).join('');
      } else {
        phSel.innerHTML = '<option value="">— No phases available —</option>';
      }
    }

    const notice = $('trn-seed-notice');
    if (notice) {
      if (snap && !snap.seedingAvailable) {
        notice.style.display = 'block';
        notice.textContent = '⚠️ This tournament / phase has not published seeding yet (seeds are null). Seed badges automatically stay hidden on overlays — you can still enter seeds manually in P1/P2.';
      } else {
        notice.style.display = 'none';
      }
    }

    const host = $('trn-seeds-list');
    if (!host) return;
    if (!snap) return;

    const q = normText(trnSeedSearch.trim());
    const list = seeds.filter(r => {
      if (!q) return true;
      const hay = normText(`#${r.initialSeed || ''} #${r.phaseSeed || ''} ${r.name} ${r.sponsor || ''} ${r.handle || ''} ${r.flag || ''} ${r.region || ''}`);
      return hay.includes(q);
    });

    const fmtFlags = (p) => {
      const f1 = p.flag && FLAGS_MAP[p.flag] ? `<span>${FLAGS_MAP[p.flag].svg}</span>` : '';
      const f2 = p.region && FLAGS_MAP[p.region] ? `<span>${FLAGS_MAP[p.region].svg}</span>` : '';
      return (f1 || f2) ? `<span class="pop-flags">${f1}${f2}</span>` : '';
    };

    host.innerHTML = list.map((r, idx) => {
      const dispSeed = state.seedMode === 'phase' ? (r.phaseSeed ?? r.initialSeed) : (r.initialSeed ?? r.phaseSeed);
      const altSeed = state.seedMode === 'phase'
        ? (r.initialSeed && r.initialSeed !== dispSeed ? `Initial #${r.initialSeed}` : '')
        : (r.phaseSeed && r.phaseSeed !== dispSeed ? `Phase #${r.phaseSeed}` : '');
      const subBits = [altSeed, r.pronouns, r.handle, r.character].filter(Boolean).join(' · ');
      return `
        <div class="trn-seed-row">
          <span class="trn-seed-rank ${dispSeed && dispSeed <= 4 ? 'top4' : ''}">${dispSeed ? `#${dispSeed}` : '—'}</span>
          <div class="trn-seed-meta">
            <strong>${fmtFlags(r)}${r.sponsor ? `<span class="pop-sp">${r.sponsor}</span>` : ''}${r.name}</strong>
            <span>${subBits || 'Ready to load'}</span>
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0;">
            <button type="button" data-seed-p1="${idx}" style="padding:3px 7px;font-size:10.5px;border-color:var(--p1);" title="Load into Player 1 with seed">→ P1</button>
            <button type="button" data-seed-p2="${idx}" style="padding:3px 7px;font-size:10.5px;border-color:var(--p2);" title="Load into Player 2 with seed">→ P2</button>
          </div>
        </div>`;
    }).join('') || '<div style="grid-column:1/-1;padding:16px;text-align:center;color:var(--muted);font-size:11px;">No seeded entrants match this search.</div>';
    host._renderedList = list;
  }

  async function fetchTournamentSeeding(phaseId, forceRefresh = false) {
    if (!isHttp || !trnState.snapshot) return;
    try {
      const res = await fetch('/api/tournament/seeding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: trnState.snapshot.provider || trnState.provider,
          eventId: trnState.snapshot.selectedEventId,
          phaseId: phaseId || null,
          forceRefresh
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load seeding');
      trnState.snapshot.phases = data.phases || [];
      trnState.snapshot.selectedPhaseId = data.selectedPhaseId;
      trnState.snapshot.seedingAvailable = Boolean(data.seedingAvailable);
      trnState.snapshot.seeds = data.seeds || [];
      renderTournamentSets();
      toast(`🎯 Seeding loaded: ${trnState.snapshot.seeds.length} entrants`);
    } catch (err) {
      toast(`⚠️ ${err.message}`);
    }
  }

  function findSetById(setId) {
    const snap = trnState.snapshot;
    if (!snap) return null;
    return (snap.streamQueue || []).find(s => s.id === setId) || (snap.sets || []).find(s => s.id === setId) || null;
  }

  function loadSetToScorebar(s) {
    if (!s) return;
    // Safety Guard: prevent accidentally overwriting an active live match from a DIFFERENT provider (e.g. Start.gg vs Challonge)!
    if (state.activeMatch?.provider && s.provider && state.activeMatch.provider !== s.provider) {
      const activeProv = state.activeMatch.provider.toUpperCase();
      const newProv = s.provider.toUpperCase();
      const curScore = `${state.p1?.name || 'P1'} ${state.p1?.score || 0}-${state.p2?.score || 0} ${state.p2?.name || 'P2'}`;
      if (!window.confirm(tr(`⚠️ Active match on Scorebar is linked to ${activeProv} (${curScore}). Switch the live Scorebar to ${newProv} (${s.p1.name} vs ${s.p2.name})?`))) {
        return;
      }
    }
    const findSaved = (name) => playersDb.find(p => p.name.toLowerCase() === String(name || '').toLowerCase());
    const db1 = findSaved(s.p1.name);
    const db2 = findSaved(s.p2.name);
    const ref1 = findSeedEntryForPlayer(s.p1);
    const ref2 = findSeedEntryForPlayer(s.p2);
    const sd1 = resolveSlotSeed(s.p1) ?? cleanValidSeed(db1?.seed);
    const sd2 = resolveSlotSeed(s.p2) ?? cleanValidSeed(db2?.seed);

    const p1Obj = {
      name: s.p1.name,
      sponsor: s.p1.sponsor || ref1?.sponsor || db1?.sponsor || '',
      flag: s.p1.flag || ref1?.flag || db1?.flag || '',
      region: s.p1.region || ref1?.region || db1?.region || '',
      bracket: s.p1.bracket || '',
      seed: sd1 ? String(sd1) : '',
      pronouns: s.p1.pronouns || ref1?.pronouns || db1?.pronouns || state.p1.pronouns || '',
      handle: s.p1.handle || ref1?.handle || db1?.handle || '',
      character: s.p1.character || ref1?.character || db1?.character || state.p1.character,
      avatar: s.p1.avatar || ref1?.avatar || db1?.avatar || '',
      score: s.state === 'complete' ? s.p1.score : (s.p1.score || 0)
    };
    if (s.p1.partnerName) {
      p1Obj.partnerName = s.p1.partnerName;
      p1Obj.partnerSponsor = s.p1.partnerSponsor || '';
      if (s.p1.partnerFlag) p1Obj.partnerFlag = s.p1.partnerFlag;
      if (s.p1.partnerRegion) p1Obj.partnerRegion = s.p1.partnerRegion;
      if (s.p1.partnerPronouns) p1Obj.partnerPronouns = s.p1.partnerPronouns;
    }
    const p2Obj = {
      name: s.p2.name,
      sponsor: s.p2.sponsor || ref2?.sponsor || db2?.sponsor || '',
      flag: s.p2.flag || ref2?.flag || db2?.flag || '',
      region: s.p2.region || ref2?.region || db2?.region || '',
      bracket: s.p2.bracket || '',
      seed: sd2 ? String(sd2) : '',
      pronouns: s.p2.pronouns || ref2?.pronouns || db2?.pronouns || state.p2.pronouns || '',
      handle: s.p2.handle || ref2?.handle || db2?.handle || '',
      character: s.p2.character || ref2?.character || db2?.character || state.p2.character,
      avatar: s.p2.avatar || ref2?.avatar || db2?.avatar || '',
      score: s.state === 'complete' ? s.p2.score : (s.p2.score || 0)
    };
    if (s.p2.partnerName) {
      p2Obj.partnerName = s.p2.partnerName;
      p2Obj.partnerSponsor = s.p2.partnerSponsor || '';
      if (s.p2.partnerFlag) p2Obj.partnerFlag = s.p2.partnerFlag;
      if (s.p2.partnerRegion) p2Obj.partnerRegion = s.p2.partnerRegion;
      if (s.p2.partnerPronouns) p2Obj.partnerPronouns = s.p2.partnerPronouns;
    }

    const snap = trnState.snapshots?.[s.provider] || trnState.snapshot;
    const nextCandidate = findNextQueueCandidate(s.id);
    const setPatch = {
      tournament: snap?.tournament?.name || state.tournament,
      round: s.roundText,
      p1: p1Obj,
      p2: p2Obj,
      activeMatch: {
        provider: s.provider,
        tournamentSlug: snap?.tournament?.slug || '',
        setId: s.id,
        roundText: s.roundText,
        slot1EntrantId: s.p1.entrantId,
        slot2EntrantId: s.p2.entrantId,
        swapped: false
      }
    };
    if (nextCandidate) setPatch.vs = { nextMatch: enrichSetForVs(nextCandidate) };
    if (state.style?.introOnSetChange) setPatch.introNonce = Date.now();
    commitState(setPatch, true);
    renderTournamentSets();
    toast(`▶ Set loaded: ${p1Obj.name} vs ${p2Obj.name} (${s.roundText})`);
  }

  function applyTournamentToLiveOverlays(data, silent = false) {
    if (!data) return false;
    const demoGamePatch = (data.provider === 'demo' && data.gameId) ? data.gameId : '';
    if (demoGamePatch) {
      const chosenPack = syncPackSelectForGame(demoGamePatch, 'full');
      const chosenResPack = syncResPackSelect(demoGamePatch, 'full');
      failedRosterKeys.delete(`${demoGamePatch}/${chosenPack}`);
      failedResRosterKeys.delete(`${demoGamePatch}/${chosenResPack}`);
      commitState({
        vs: { game: demoGamePatch, pack: chosenPack },
        results: { game: demoGamePatch, pack: chosenResPack },
        top8: { manualOverrides: {} }
      }, true);
      loadActiveRoster(demoGamePatch, chosenPack);
      loadResultsRoster(demoGamePatch, chosenResPack);
    }

    const autoLogoUrl = data.tournament?.cachedLogoUrl || data.tournament?.logoUrl || '';
    let logoApplied = false;
    if (autoLogoUrl && state.vs?.autoEventLogo !== false) {
      const isDifferentTourney = (data.tournament?.slug || '') !== (state.vs?.logoTournamentSlug || '');
      const shouldApply = !silent || isDifferentTourney || state.vs?.logoSource !== 'manual';
      if (shouldApply) {
        commitState({
          tournament: data.tournament?.name || state.tournament,
          vs: {
            logoUrl: autoLogoUrl,
            showLogo: true,
            logoSource: 'auto',
            logoTournamentSlug: data.tournament?.slug || ''
          }
        }, true);
        logoApplied = true;
      }
    } else if (data.tournament?.name && !silent) {
      commitState({ tournament: data.tournament.name }, true);
    }

    if (state.results?.autoSyncTournament !== false || data.provider === 'demo') {
      pullTournamentStandings(data.provider, true, demoGamePatch || undefined);
    } else {
      renderResultsUI();
    }
    return logoApplied;
  }

  async function promoteProviderToLive(prov) {
    const snap = trnState.snapshots?.[prov];
    if (!snap) return;
    try {
      await fetch('/api/tournament/set-active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: prov })
      });
    } catch {}
    trnState.activeLiveProvider = prov;
    applyTournamentToLiveOverlays(snap, false);
    renderTournamentSets();
    toast(`⚡ Live broadcast source switched to ${prov.toUpperCase()} (${snap.tournament?.name || prov})`);
  }

  function openClearTournamentModal() {
    const modal = $('trn-clear-modal');
    if (!modal) return;
    const prov = trnState.provider;
    const curSnap = trnState.snapshots?.[prov];
    const loadedList = ['startgg', 'challonge', 'demo'].filter(p => Boolean(trnState.snapshots?.[p]));
    const provTitle = prov === 'startgg' ? 'Start.gg' : (prov === 'challonge' ? 'Challonge' : 'Demo');
    if ($('trn-clear-title')) $('trn-clear-title').textContent = `🧹 Clean / Disconnect — ${provTitle}`;
    if ($('trn-clear-summary')) {
      const curDesc = curSnap
        ? `Currently viewing <b>${provTitle}</b>: "${curSnap.tournament?.name || provTitle}" (${trnState.activeLiveProvider === prov ? '🔒 LIVE SOURCE' : '🛡️ Isolated Standby'}).`
        : `No active <b>${provTitle}</b> bracket is loaded right now.`;
      const otherLoaded = loadedList.filter(p => p !== prov).map(p => p.toUpperCase());
      $('trn-clear-summary').innerHTML = `${curDesc}${otherLoaded.length ? `<br/><span style="color:#fde68a;">Also loaded in isolated memory: <b>${otherLoaded.join(', ')}</b> (protected unless you choose Clear ALL).</span>` : ''}`;
    }
    modal.classList.add('open');
  }

  function closeClearTournamentModal() {
    $('trn-clear-modal')?.classList.remove('open');
  }

  async function clearTournamentSession(scope = 'current', resetLiveData = false) {
    const targetProv = scope === 'all' ? 'all' : trnState.provider;
    const clearUrl = Boolean($('chk-trn-clear-url')?.checked);
    const targets = targetProv === 'all' ? ['startgg', 'challonge', 'demo'] : [targetProv];
    const clearedSlugs = new Set(targets.map(p => trnState.snapshots?.[p]?.tournament?.slug).filter(Boolean));

    // Invalidate any in-flight connect/auto-sync requests so they cannot resurrect cleared state!
    trnState.requestSeq++;

    if (isHttp) {
      try {
        await fetch('/api/tournament/clear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: targetProv, clearUrl })
        });
        const cfg = await fetch('/api/integrations').then(r => r.json());
        trnState.config = cfg;
      } catch {}
    }

    for (const p of targets) {
      trnState.snapshots[p] = null;
    }
    if (!trnState.activeLiveProvider || targets.includes(trnState.activeLiveProvider)) {
      trnState.activeLiveProvider = ['startgg', 'challonge', 'demo'].find(p => Boolean(trnState.snapshots[p])) || null;
    }
    if (!trnState.activeLiveProvider) {
      clearInterval(trnState.autoSyncTimer);
      trnState.autoSyncTimer = null;
      if ($('chk-trn-autosync')) $('chk-trn-autosync').checked = false;
    }

    trnState.snapshot = trnState.snapshots[trnState.provider] || null;
    const statePatch = {};
    const amBelongs = state.activeMatch?.provider && targets.includes(state.activeMatch.provider);
    if (amBelongs || resetLiveData) {
      statePatch.activeMatch = null;
      statePatch.vs = { ...(statePatch.vs || {}), nextMatch: null };
    }
    if (state.vs?.logoSource === 'auto' && (resetLiveData || clearedSlugs.has(state.vs?.logoTournamentSlug || ''))) {
      statePatch.vs = { ...(statePatch.vs || {}), logoUrl: '', logoTournamentSlug: '' };
    }
    if (resetLiveData) {
      statePatch.tournament = 'FGC OPEN CHAMPIONSHIP';
      statePatch.p1 = { score: 0, seed: '', bracket: '' };
      statePatch.p2 = { score: 0, seed: '', bracket: '' };
      statePatch.results = {
        linkedProvider: '',
        linkedTournament: '',
        entrantsCount: '',
        placements: structuredClone(DEFAULT_RESULTS.placements)
      };
      const emptySlots = {};
      for (const def of (window.FGC_TOP8_ENGINE?.TOP8_SLOT_DEFS || [])) {
        emptySlots[def.id] = {
          id: def.id,
          roundText: def.label.toUpperCase(),
          state: 'open',
          winnerSide: null,
          p1: { name: 'TBD', sponsor: '', flag: '', region: '', seed: '', character: '', avatar: '', handle: '', score: 0 },
          p2: { name: 'TBD', sponsor: '', flag: '', region: '', seed: '', character: '', avatar: '', handle: '', score: 0 }
        };
      }
      statePatch.top8 = { sourceSlots: emptySlots, manualOverrides: {} };
    }
    if (Object.keys(statePatch).length) {
      commitState(statePatch, true);
    }

    closeClearTournamentModal();
    updateProviderFormUI();
    renderTournamentSets();
    renderResultsUI();
    toast(targetProv === 'all'
      ? '🧹 All loaded tournaments cleared cleanly'
      : `🧹 ${targetProv.toUpperCase()} tournament cleared${resetLiveData ? ' (+ live match & Top 8 reset)' : ''}`);
  }

  async function connectTournament(silent = false, targetProvOverride = null) {
    if (!isHttp) return toast('Start the local server first (Start_Scorebar.bat)');
    const reqProvider = targetProvOverride || trnState.provider;
    const reqSeq = ++trnState.requestSeq;
    const btn = $('btn-trn-connect');
    const isViewingTarget = reqProvider === trnState.provider;
    if (!silent && isViewingTarget) { btn.disabled = true; btn.textContent = '⏳ Connecting...'; }
    try {
      const otherLiveProv = (trnState.activeLiveProvider && trnState.activeLiveProvider !== reqProvider && trnState.snapshots?.[trnState.activeLiveProvider])
        ? trnState.activeLiveProvider
        : null;
      const isolated = Boolean(otherLiveProv);
      const rawTok = isViewingTarget ? $('trn-token-input').value.trim() : '';
      const demoGame = reqProvider === 'demo' ? getSelectedDemoGame() : undefined;
      const res = await fetch('/api/tournament/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: reqProvider,
          isolated,
          demoGame,
          url: isViewingTarget ? $('trn-url-input').value.trim() : undefined,
          token: rawTok ? rawTok : '__KEEP__',
          rememberToken: Boolean($('chk-trn-remember-token')?.checked)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Connection error');
      // Drop stale response if user cleared or fired a newer request while this one was in flight!
      if (reqSeq !== trnState.requestSeq && silent) return;

      trnState.snapshots[reqProvider] = data;
      if (!isolated || !trnState.activeLiveProvider) {
        trnState.activeLiveProvider = reqProvider;
      }
      trnState.snapshot = trnState.snapshots[trnState.provider] || null;

      // Refresh masked token config hint
      fetch('/api/integrations').then(r => r.json()).then(c => { trnState.config = c; updateProviderFormUI(); }).catch(() => {});
      if (reqProvider === trnState.provider) {
        const hasStream = Boolean(data.streamQueue?.length);
        const hasOpen = (data.sets || []).some(s => s.state !== 'complete');
        const hasDone = (data.sets || []).some(s => s.state === 'complete');
        if (trnState.filter === 'stream' && !hasStream) {
          trnState.filter = hasOpen ? 'open' : (hasDone ? 'complete' : 'all');
        } else if (trnState.filter === 'open' && !hasOpen && hasDone) {
          trnState.filter = 'complete';
        }
        $('trn-set-filters').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.sflt === trnState.filter));
      }
      renderTournamentSets();

      if (isolated) {
        if (!silent) {
          toast(`🛡️ Connected ${reqProvider.toUpperCase()} in isolated mode — ${otherLiveProv.toUpperCase()} stays 🔒 LIVE (no data overwritten!)`);
        }
        return;
      }

      const logoApplied = applyTournamentToLiveOverlays(data, silent);
      if (!silent) toast(`🏆 Connected: ${data.tournament.name}${data.provider === 'demo' ? ' (64 entrants)' : ''}${logoApplied ? ' · Logo & Top 8 synced' : ''}`);
    } catch (err) {
      if (!silent) toast(`⚠️ ${err.message}`);
    } finally {
      if (!silent && isViewingTarget) { btn.disabled = false; btn.textContent = '🔌 Connect'; }
    }
  }

  async function syncEventLogoFromTournament(silent = false) {
    if (!isHttp) return !silent && toast('Start the local server first');
    const syncBtn = $('btn-vs-sync-logo');
    if (!silent && syncBtn) { syncBtn.disabled = true; syncBtn.textContent = '⏳ Pulling...'; }
    try {
      const snapLogo = trnState.snapshot?.tournament?.cachedLogoUrl || trnState.snapshot?.tournament?.logoUrl || '';
      if (snapLogo) {
        commitState({
          tournament: trnState.snapshot.tournament.name || state.tournament,
          vs: {
            logoUrl: snapLogo,
            showLogo: true,
            logoSource: 'auto',
            logoTournamentSlug: trnState.snapshot.tournament.slug || ''
          }
        }, true);
        if (!silent) toast(`🏷️ Event logo loaded (${trnState.snapshot.tournament.name})`);
        return true;
      }
      const res = await fetch('/api/tournament/logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: trnState.provider || trnState.config?.provider || 'startgg',
          url: $('trn-url-input')?.value?.trim() || '',
          token: $('trn-token-input')?.value?.trim() || '__KEEP__'
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not fetch event logo');
      commitState({
        tournament: data.tournamentName || state.tournament,
        vs: {
          logoUrl: data.logoUrl,
          showLogo: true,
          logoSource: 'auto',
          logoTournamentSlug: data.tournamentSlug || ''
        }
      }, true);
      if (!silent) toast(`🏷️ Event logo loaded (${data.tournamentName || data.provider.toUpperCase()})`);
      return true;
    } catch (err) {
      if (!silent) toast(`⚠️ ${err.message}`);
      return false;
    } finally {
      if (!silent && syncBtn) { syncBtn.disabled = false; syncBtn.textContent = '🔄 Pull Event Logo'; }
    }
  }

  async function recordCurrentMatchToHistory(providerOverride) {
    const entry = {
      provider: providerOverride || state.activeMatch?.provider || 'local',
      tournament: state.tournament || 'Local',
      round: state.round,
      format: state.format,
      p1: { ...state.p1 },
      p2: { ...state.p2 },
      winnerSide: Number(state.p1.score) >= Number(state.p2.score) ? 'p1' : 'p2'
    };
    if (isHttp) {
      const res = await fetch('/api/history', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry)
      });
      if (res.ok) historyDb = await res.json();
    } else {
      historyDb.unshift({ id: `match-${Date.now()}`, ts: Date.now(), ...entry });
    }
    renderHistoryList();
    toast(`💾 Set saved to history (${state.p1.name} ${state.p1.score}-${state.p2.score} ${state.p2.name})`);
  }

  async function reportActiveMatch(liveOnly = false) {
    const am = state.activeMatch;
    if (!am) return toast('No tournament set is currently linked');
    const s1 = Number(state.p1.score || 0);
    const s2 = Number(state.p2.score || 0);
    if (!liveOnly && s1 === s2) {
      return toast('⚠️ Score is tied — add the winning point before reporting');
    }
    const p1Wins = s1 > s2;
    const winnerName = p1Wins ? state.p1.name : state.p2.name;
    // Account for side swap so original Start.gg/Challonge bracket slot IDs & scores stay 100% accurate!
    const origP1Score = am.swapped ? s2 : s1;
    const origP2Score = am.swapped ? s1 : s2;
    const winnerEntrantId = p1Wins
      ? (am.swapped ? am.slot2EntrantId : am.slot1EntrantId)
      : (am.swapped ? am.slot1EntrantId : am.slot2EntrantId);

    if (!liveOnly) {
      const ok = window.confirm(tr(
        `Report match result to ${am.provider.toUpperCase()}?\n\n` +
        `Round: ${am.roundText}\n` +
        `Score: ${state.p1.name} ${s1} - ${s2} ${state.p2.name}\n` +
        `Winner: ${winnerName}`
      ));
      if (!ok) return;
    }

    try {
      const res = await fetch('/api/tournament/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: am.provider,
          tournamentSlug: am.tournamentSlug,
          setId: am.setId,
          winnerEntrantId,
          p1EntrantId: am.slot1EntrantId,
          p2EntrantId: am.slot2EntrantId,
          p1Score: origP1Score,
          p2Score: origP2Score,
          liveOnly
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to report result');
      if (liveOnly) {
        toast(`📡 Live score synced (${origP1Score}-${origP2Score})`);
      } else {
        await recordCurrentMatchToHistory(am.provider);
        toast(`✅ Result reported to ${am.provider.toUpperCase()}: ${winnerName} wins`);
        if (trnState.provider === am.provider) await connectTournament(true);
      }
    } catch (err) {
      toast(`⚠️ ${err.message}`);
    }
  }

  function loadNextQueuedSet() {
    const snap = trnState.snapshot;
    if (!snap) return toast('Connect a tournament first');
    const pool = (snap.streamQueue?.length ? snap.streamQueue : snap.sets || []).filter(s => s.state !== 'complete');
    if (!pool.length) return toast('No remaining open sets in queue');
    const curIdx = pool.findIndex(s => s.id === state.activeMatch?.setId);
    const next = pool[(curIdx + 1) % pool.length];
    loadSetToScorebar(next);
  }

  function bindTournamentEvents() {
    $('trn-provider-tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-prov]');
      if (!btn) return;
      trnState.provider = btn.dataset.prov;
      trnState.snapshot = trnState.snapshots?.[trnState.provider] || null;
      updateProviderFormUI();
      renderTournamentSets();
    });
    $('trn-demo-game')?.addEventListener('change', () => {
      if (trnState.provider === 'demo' && trnState.snapshots?.demo) {
        connectTournament(false);
      }
    });
    $('btn-trn-connect').addEventListener('click', () => connectTournament(false));
    $('btn-trn-refresh').addEventListener('click', () => connectTournament(false));
    $('btn-trn-clear')?.addEventListener('click', openClearTournamentModal);
    $('btn-trn-banner-clear')?.addEventListener('click', openClearTournamentModal);
    $('btn-close-trn-clear')?.addEventListener('click', closeClearTournamentModal);
    $('trn-clear-modal')?.addEventListener('click', (e) => { if (e.target === $('trn-clear-modal')) closeClearTournamentModal(); });
    $('btn-trn-clear-only')?.addEventListener('click', () => clearTournamentSession('current', false));
    $('btn-trn-clear-full')?.addEventListener('click', () => clearTournamentSession('current', true));
    $('btn-trn-clear-all')?.addEventListener('click', () => clearTournamentSession('all', true));
    $('btn-trn-make-live')?.addEventListener('click', () => promoteProviderToLive(trnState.provider));
    $('btn-trn-jump-live')?.addEventListener('click', () => {
      if (!trnState.activeLiveProvider) return;
      trnState.provider = trnState.activeLiveProvider;
      trnState.snapshot = trnState.snapshots?.[trnState.provider] || null;
      updateProviderFormUI();
      renderTournamentSets();
    });
    $('btn-trn-clear-token').addEventListener('click', async () => {
      if (!isHttp) return;
      try {
        const res = await fetch('/api/integrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'clear', provider: trnState.provider })
        });
        if (res.ok) {
          const cfg = await fetch('/api/integrations').then(r => r.json());
          trnState.config = cfg;
          $('trn-token-input').value = '';
          updateProviderFormUI();
          toast('🔒 API token erased from memory and disk');
        }
      } catch {}
    });
    $('chk-trn-remember-token').addEventListener('change', async (e) => {
      if (!isHttp) return;
      const persist = e.target.checked;
      try {
        await fetch('/api/integrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ persistTokens: persist })
        });
        const cfg = await fetch('/api/integrations').then(r => r.json());
        trnState.config = cfg;
        updateProviderFormUI();
        toast(persist ? 'Token will be stored locally in gitignored data/ only' : '🔒 Disk token cleared (RAM session only)');
      } catch {}
    });
    $('btn-trn-to-results').addEventListener('click', async () => {
      await pullTournamentStandings(trnState.snapshot?.provider || trnState.provider, false);
      setActiveWorkspace('results');
    });
    $('trn-event-select').addEventListener('change', async (e) => {
      try {
        const res = await fetch('/api/tournament/sets', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: trnState.provider, eventId: e.target.value })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        if (trnState.snapshot) {
          trnState.snapshot.selectedEventId = e.target.value;
          trnState.snapshot.sets = data.sets || [];
          if (data.phases) trnState.snapshot.phases = data.phases;
          if (data.selectedPhaseId !== undefined) trnState.snapshot.selectedPhaseId = data.selectedPhaseId;
          if (data.seedingAvailable !== undefined) trnState.snapshot.seedingAvailable = data.seedingAvailable;
          if (data.seeds) trnState.snapshot.seeds = data.seeds;
          renderTournamentSets();
        }
        if (state.results?.autoSyncTournament !== false) {
          pullTournamentStandings(trnState.provider, true);
        }
        toast('Event updated');
      } catch (err) {
        toast(`⚠️ ${err.message}`);
      }
    });
    $('btn-trn-import').addEventListener('click', async () => {
      try {
        const res = await fetch('/api/tournament/import-players', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: trnState.provider, eventId: trnState.snapshot?.selectedEventId })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        playersDb = data.players || playersDb;
        renderPlayersDb();
        toast(`👥 Imported ${data.added} new players (Total: ${data.total})`);
      } catch (err) {
        toast(`⚠️ ${err.message}`);
      }
    });
    $('btn-trn-use-logo').addEventListener('click', () => syncEventLogoFromTournament(false));
    $('chk-trn-auto-logo').addEventListener('change', (e) => {
      const enabled = e.target.checked;
      commitState({ vs: { autoEventLogo: enabled } }, true);
      if (enabled) syncEventLogoFromTournament(true);
      toast(enabled ? '🏷️ Auto-load Event Logo enabled' : 'Auto-load Event Logo paused');
    });
    $('btn-trn-load-next').addEventListener('click', loadNextQueuedSet);
    $('trn-set-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-sflt]');
      if (!btn) return;
      trnState.filter = btn.dataset.sflt;
      $('trn-set-filters').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      renderTournamentSets();
    });
    $('trn-set-search').addEventListener('input', (e) => {
      trnState.search = e.target.value;
      renderTournamentSets();
    });
    $('trn-sets-grid').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-load-set]');
      if (!btn) return;
      loadSetToScorebar(findSetById(btn.dataset.loadSet));
    });

    // Phase 3 Seeding Tab bindings
    $('trn-phase-select')?.addEventListener('change', (e) => {
      if (e.target.value) fetchTournamentSeeding(e.target.value, false);
    });
    $('btn-trn-refresh-seeds')?.addEventListener('click', () => {
      fetchTournamentSeeding($('trn-phase-select')?.value || null, true);
    });
    $('seg-trn-seed-mode')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-val]');
      if (!btn) return;
      commitState({ seedMode: btn.dataset.val }, true);
      renderTournamentSets();
      toast(btn.dataset.val === 'phase' ? '🎯 Seed mode: Phase Seed' : '🎯 Seed mode: Initial Event Seed');
    });
    $('trn-seed-search')?.addEventListener('input', (e) => {
      trnSeedSearch = e.target.value;
      renderTournamentSeeding();
    });
    $('chk-seed-sync-sb')?.addEventListener('change', (e) => commitState({ showSeed: e.target.checked }, true));
    $('chk-seed-sync-vs')?.addEventListener('change', (e) => commitState({ vs: { showSeed: e.target.checked } }, true));
    $('chk-seed-sync-res')?.addEventListener('change', (e) => commitState({ results: { showSeed: e.target.checked } }, true));
    $('btn-trn-sync-live-seeds')?.addEventListener('click', () => {
      if (!trnState.snapshot?.seeds?.length) return toast('Connect a tournament with seeding first');
      const s1 = resolveSlotSeed({ name: state.p1?.name });
      const s2 = resolveSlotSeed({ name: state.p2?.name });
      commitState({
        showSeed: true,
        p1: { seed: s1 ? String(s1) : '' },
        p2: { seed: s2 ? String(s2) : '' }
      }, true);
      toast(`🎯 Synced live seeds: P1 ${s1 ? `#${s1}` : '—'} · P2 ${s2 ? `#${s2}` : '—'}`);
    });
    $('trn-seeds-list')?.addEventListener('click', (e) => {
      const b1 = e.target.closest('[data-seed-p1]');
      const b2 = e.target.closest('[data-seed-p2]');
      const host = $('trn-seeds-list');
      const list = host?._renderedList || [];
      const row = b1 ? list[Number(b1.dataset.seedP1)] : (b2 ? list[Number(b2.dataset.seedP2)] : null);
      if (!row) return;
      const side = b1 ? 'p1' : 'p2';
      const sNum = resolveSlotSeed(row);
      applyPlayerToSide(side, { ...row, seed: sNum ? String(sNum) : '' });
    });
    $('chk-trn-autosync').addEventListener('change', (e) => {
      clearInterval(trnState.autoSyncTimer);
      if (e.target.checked) {
        trnState.autoSyncTimer = setInterval(() => {
          const liveProv = trnState.activeLiveProvider;
          if (liveProv && trnState.snapshots?.[liveProv]) connectTournament(true, liveProv);
        }, 15000);
        toast('🔄 Auto-Sync enabled (locked to active live provider · every 15s)');
      } else {
        toast('Auto-Sync paused');
      }
    });

    // Active Match Bar actions
    $('btn-am-report').addEventListener('click', () => reportActiveMatch(false));
    $('btn-am-sync-live').addEventListener('click', () => reportActiveMatch(true));
    $('btn-am-next').addEventListener('click', loadNextQueuedSet);
    $('btn-am-save-hist').addEventListener('click', () => recordCurrentMatchToHistory());
    $('btn-am-unlink').addEventListener('click', () => {
      commitState({ activeMatch: null }, true);
      renderTournamentSets();
      toast('🔓 Tournament set unlinked');
    });

    // History tab actions
    $('btn-hist-record').addEventListener('click', () => recordCurrentMatchToHistory());
    $('btn-hist-json').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(historyDb, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `fgc-match-history-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
    $('btn-hist-csv').addEventListener('click', () => {
      const header = 'Date,Provider,Tournament,Round,Format,P1_Sponsor,P1_Name,P1_Country,P1_Score,P2_Score,P2_Sponsor,P2_Name,P2_Country,Winner';
      const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      const rows = historyDb.map(h => [
        new Date(h.ts).toISOString(), h.provider, h.tournament, h.round, h.format,
        h.p1?.sponsor, h.p1?.name, h.p1?.flag, h.p1?.score,
        h.p2?.score, h.p2?.sponsor, h.p2?.name, h.p2?.flag,
        h.winnerSide === 'p1' ? h.p1?.name : h.p2?.name
      ].map(esc).join(','));
      const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `fgc-match-history-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
    $('btn-hist-clear').addEventListener('click', async () => {
      if (!historyDb.length || !window.confirm(tr('Clear all local match history?'))) return;
      if (isHttp) {
        const res = await fetch('/api/history', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'clear' }) });
        if (res.ok) historyDb = await res.json();
      } else {
        historyDb = [];
      }
      renderHistoryList();
    });
    $('history-list').addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-del-hist]');
      if (!btn) return;
      const id = btn.dataset.delHist;
      if (isHttp) {
        const res = await fetch('/api/history', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', id }) });
        if (res.ok) historyDb = await res.json();
      } else {
        historyDb = historyDb.filter(h => h.id !== id);
      }
      renderHistoryList();
    });
  }

  /* =========================================================================
     VS SPLASH STUDIO, AVATAR UPLOADS & MULTI-GAME ASSET MANAGER
     ========================================================================= */
  function enrichSetForVs(s) {
    if (!s) return null;
    const findSaved = (name) => playersDb.find(p => p.name.toLowerCase() === String(name || '').toLowerCase());
    const db1 = findSaved(s.p1?.name);
    const db2 = findSaved(s.p2?.name);
    return {
      setId: s.id,
      roundText: s.roundText,
      p1: {
        name: s.p1?.name || 'PLAYER 1',
        sponsor: s.p1?.sponsor || db1?.sponsor || '',
        flag: s.p1?.flag || db1?.flag || '',
        region: s.p1?.region || db1?.region || '',
        bracket: s.p1?.bracket || '',
        seed: resolveSlotSeed(s.p1) ? String(resolveSlotSeed(s.p1)) : (db1?.seed || ''),
        character: s.p1?.character || db1?.character || '',
        avatar: s.p1?.avatar || db1?.avatar || '',
        score: s.p1?.score || 0
      },
      p2: {
        name: s.p2?.name || 'PLAYER 2',
        sponsor: s.p2?.sponsor || db2?.sponsor || '',
        flag: s.p2?.flag || db2?.flag || '',
        region: s.p2?.region || db2?.region || '',
        bracket: s.p2?.bracket || '',
        seed: resolveSlotSeed(s.p2) ? String(resolveSlotSeed(s.p2)) : (db2?.seed || ''),
        character: s.p2?.character || db2?.character || '',
        avatar: s.p2?.avatar || db2?.avatar || '',
        score: s.p2?.score || 0
      }
    };
  }

  function findNextQueueCandidate(excludeSetId) {
    const snap = trnState.snapshot;
    if (!snap) return null;
    const pool = (snap.streamQueue?.length ? snap.streamQueue : snap.sets || []).filter(s => s.state !== 'complete');
    if (!pool.length) return null;
    const refId = excludeSetId ?? state.activeMatch?.setId;
    const curIdx = pool.findIndex(s => s.id === refId);
    if (curIdx >= 0 && pool.length > 1) return pool[(curIdx + 1) % pool.length];
    return pool[0];
  }

  function openVsInspectorForElement(elKey, customLabel) {
    const MAP = {
      'backdrop': { pane: 'backdrop', card: 'vs-card-backdrop', label: '🖼️ Backdrop & Pattern' },
      'frame':    { pane: 'frame',    card: 'vs-card-frame',    label: '✨ Frame & Edge Bands' },
      'divider':  { pane: 'divider',  card: 'vs-card-divider',  label: '⚡ Center Divider' },
      'emblem':   { pane: 'divider',  card: 'vs-card-emblem',   label: '⚔️ VS Emblem' },
      'header':   { pane: 'header',   card: 'vs-card-header',   label: '🏆 Top Header' },
      'p1-char':  { pane: 'chars',    card: 'vs-card-p1char',   label: '🧑 P1 Character' },
      'p2-char':  { pane: 'chars',    card: 'vs-card-p2char',   label: '🧑 P2 Character' },
      'p1-plate': { pane: 'plates',   card: 'vs-card-plates',   label: '🏷️ Player Nameplates' },
      'p2-plate': { pane: 'plates',   card: 'vs-card-plates',   label: '🏷️ Player Nameplates' },
      'flags':    { pane: 'plates',   card: 'vs-card-flags',    label: '🏳️ Plates Order & Flags' },
      'h2h':      { pane: 'header',   card: 'vs-card-brand',    label: '📊 Head-to-Head Pill' },
      'logo':     { pane: 'header',   card: 'vs-card-brand',    label: '🏷️ Event Logo' },
      'subtitle': { pane: 'header',   card: 'vs-card-header',   label: '📝 Event Footer Text' }
    };
    const info = MAP[elKey];
    if (!info) return;
    vsSelectedEl = elKey;
    // Switch VS Inspector Tab cleanly
    $('vs-insp-tabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.vspane === info.pane));
    document.querySelectorAll('.vs-insp-pane').forEach(p => p.classList.toggle('active', p.id === `vspane-${info.pane}`));
    // Update breadcrumb & jump chip highlights
    $('vs-sel-label').textContent = `🎯 Editing: ${customLabel ? customLabel.replace(/\s*\([^)]*\)/g, '') : info.label}`;
    $('btn-vs-clear-sel').style.display = 'inline-flex';
    $('vs-sel-jumps')?.querySelectorAll('button[data-vs-jump]').forEach(b => {
      const k = b.dataset.vsJump;
      b.classList.toggle('active-chip', k === elKey || (k === 'p1-plate' && elKey === 'p2-plate'));
    });
    // Flash highlight the exact target control card & bring it cleanly into view
    const card = $(info.card);
    if (card) {
      card.classList.remove('vs-flash');
      void card.offsetWidth;
      card.classList.add('vs-flash');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    vsPreviewFrame?.contentWindow?.postMessage({ type: 'vs-highlight-element', element: elKey }, '*');
  }

  let selectedMuCharKey = 'wsf1_p1';

  function getActiveMatchupBoardSlots(vs) {
    const bpMap = window.FGC_TOP8_ENGINE?.BOARD_PRESETS || {
      opening: { win: ['wsf1', 'wsf2'], los: ['lr1_1', 'lr1_2'] },
      quarters: { win: ['wsf1', 'wsf2'], los: ['lqf1', 'lqf2'] },
      finals: { win: ['wf', 'gf'], los: ['lsf', 'lf'] }
    };
    if (vs.matchupBoardPreset === 'custom' && Array.isArray(vs.matchupCustomSlots) && vs.matchupCustomSlots.length === 4) {
      return vs.matchupCustomSlots;
    }
    const bp = bpMap[vs.matchupBoardPreset || 'opening'] || bpMap.opening;
    return [...bp.win, ...bp.los];
  }

  function renderMatchupFramingUI(vs) {
    const pillsHost = $('vs-mu-char-pills');
    if (!pillsHost) return;
    const slotIds = getActiveMatchupBoardSlots(vs);
    const defs = window.FGC_TOP8_ENGINE?.TOP8_SLOT_DEFS || [];
    const resolved = window.FGC_TOP8_ENGINE?.resolveAllBracketSlots ? window.FGC_TOP8_ENGINE.resolveAllBracketSlots(state.top8 || {}) : {};
    const artPosMap = (vs.matchupArtPos && typeof vs.matchupArtPos === 'object') ? vs.matchupArtPos : {};
    const entries = [];
    for (const sid of slotIds) {
      const def = defs.find(d => d.id === sid);
      const short = def ? def.short : sid.toUpperCase();
      const slot = resolved[sid] || { p1: { name: 'TBD' }, p2: { name: 'TBD' } };
      for (const side of ['p1', 'p2']) {
        const pl = slot[side] || {};
        entries.push({
          key: `${sid}_${side}`,
          sid,
          side,
          short,
          name: pl.name || 'TBD',
          char: pl.character || '',
          score: Number(pl.score || 0)
        });
      }
    }
    if (!entries.some(e => e.key === selectedMuCharKey) && entries.length) {
      selectedMuCharKey = entries[0].key;
    }
    pillsHost.innerHTML = entries.map(ent => {
      const pos = artPosMap[ent.key] || {};
      const adj = (Number(pos.y || 0) !== 0 || Number(pos.x || 0) !== 0 || Number(pos.scale ?? 100) !== 100);
      const adjTxt = adj ? `Y${Number(pos.y || 0) >= 0 ? '+' : ''}${Number(pos.y || 0)} ${Number(pos.scale ?? 100)}%` : '';
      return `
        <button type="button" class="mu-char-pill ${ent.side === 'p2' ? 'is-p2' : ''} ${selectedMuCharKey === ent.key ? 'active-chip' : ''}" data-mu-pick="${ent.key}">
          <span class="mu-side-tag">${ent.short} ${ent.side.toUpperCase()}</span>
          <span class="mu-pill-nm">${ent.name}${ent.char ? ' · ' + ent.char : ''}</span>
          ${adjTxt ? `<span class="mu-pill-adj">${adjTxt}</span>` : ''}
        </button>`;
    }).join('');

    const curEnt = entries.find(e => e.key === selectedMuCharKey) || entries[0];
    if (!curEnt) return;
    const pos = artPosMap[curEnt.key] || {};
    const x = Number(pos.x || 0);
    const y = Number(pos.y || 0);
    const sc = Number(pos.scale ?? 100);
    if ($('vs-mu-sel-title')) $('vs-mu-sel-title').textContent = `${curEnt.short} · ${curEnt.side.toUpperCase()} — ${curEnt.name}${curEnt.char ? ' (' + curEnt.char + ')' : ''}`;
    const muCharSel = $('sel-vs-mu-char');
    if (muCharSel) {
      if (curEnt.char && ![...muCharSel.options].some(o => o.value === curEnt.char)) {
        const opt = document.createElement('option');
        opt.value = curEnt.char;
        opt.textContent = curEnt.char;
        muCharSel.appendChild(opt);
      }
      muCharSel.value = curEnt.char || '';
    }
    if ($('inp-vs-mu-name') && document.activeElement !== $('inp-vs-mu-name')) {
      $('inp-vs-mu-name').value = curEnt.name === 'TBD' ? '' : curEnt.name;
    }
    if ($('inp-vs-mu-score') && document.activeElement !== $('inp-vs-mu-score')) {
      $('inp-vs-mu-score').value = String(curEnt.score ?? 0);
    }
    if ($('rng-vs-mu-charY')) { $('rng-vs-mu-charY').value = y; $('val-vs-mu-charY').textContent = `${y >= 0 ? '+' : ''}${y} px`; }
    if ($('rng-vs-mu-charX')) { $('rng-vs-mu-charX').value = x; $('val-vs-mu-charX').textContent = `${x >= 0 ? '+' : ''}${x} px`; }
    if ($('rng-vs-mu-charScale')) { $('rng-vs-mu-charScale').value = sc; $('val-vs-mu-charScale').textContent = `${sc}%`; }
    const gY = Number(vs.matchupGlobalY || 0);
    const gX = Number(vs.matchupGlobalX || 0);
    const gSc = Number(vs.matchupGlobalScale ?? 100);
    if ($('rng-vs-mu-allY')) { $('rng-vs-mu-allY').value = gY; $('val-vs-mu-allY').textContent = `${gY >= 0 ? '+' : ''}${gY} px`; }
    if ($('rng-vs-mu-allX')) { $('rng-vs-mu-allX').value = gX; $('val-vs-mu-allX').textContent = `${gX >= 0 ? '+' : ''}${gX} px`; }
    if ($('rng-vs-mu-allScale')) { $('rng-vs-mu-allScale').value = gSc; $('val-vs-mu-allScale').textContent = `${gSc}%`; }
  }

  function renderVsUI() {
    const vs = { ...DEFAULT_VS, ...(state.vs || {}) };
    const syncSeg = (id, val) => {
      $(id)?.querySelectorAll('button[data-val]').forEach(b => b.classList.toggle('active-chip', b.dataset.val === val));
    };
    const isMu2x2 = vs.viewMode === 'matchup-2x2';
    syncSeg('seg-vs-viewMode', isMu2x2 ? 'matchup-2x2' : '1v1');
    const resetBtn = $('btn-vs-reset-all');
    if (resetBtn) {
      resetBtn.textContent = isMu2x2 ? tr('↺ Reset Matchup') : tr('↺ Reset VS');
      resetBtn.title = isMu2x2
        ? 'Reset all Matchups 2×2 settings, colors, characters & framing'
        : 'Reset all VS customizations to active design defaults';
    }
    if ($('vs-mu-game')?.options.length && vs.game) $('vs-mu-game').value = vs.game;
    if ($('vs-matchupBoardPreset')) $('vs-matchupBoardPreset').value = vs.matchupBoardPreset || 'opening';
    if ($('vs-mu-custom-row')) $('vs-mu-custom-row').style.display = (vs.matchupBoardPreset === 'custom') ? 'grid' : 'none';
    const cSlots = Array.isArray(vs.matchupCustomSlots) && vs.matchupCustomSlots.length === 4 ? vs.matchupCustomSlots : ['wsf1', 'wsf2', 'lr1_1', 'lr1_2'];
    for (let si = 0; si < 4; si++) {
      const sel = $(`vs-mu-slot-${si}`);
      if (sel && sel.options.length) sel.value = cSlots[si] || 'wsf1';
    }
    if ($('vs-mu-cardBg') && vs.matchupCardBg) $('vs-mu-cardBg').value = vs.matchupCardBg;
    if ($('vs-mu-cardBorder') && vs.matchupCardBorder) $('vs-mu-cardBorder').value = vs.matchupCardBorder;
    if ($('vs-mu-winCol') && vs.matchupWinColor) $('vs-mu-winCol').value = vs.matchupWinColor;
    if ($('vs-mu-losCol') && vs.matchupLosColor) $('vs-mu-losCol').value = vs.matchupLosColor;
    if ($('vs-mu-vsBg') && vs.matchupVsBadgeBg) $('vs-mu-vsBg').value = vs.matchupVsBadgeBg;
    const muRad = Number(vs.matchupCardRadius ?? -1);
    if ($('rng-vs-mu-radius')) { $('rng-vs-mu-radius').value = muRad; $('val-vs-mu-rad').textContent = muRad < 0 ? 'Auto' : `${muRad} px`; }
    const muShellOp = Number(vs.matchupShellOpacity ?? 72);
    if ($('rng-vs-mu-shellOp')) { $('rng-vs-mu-shellOp').value = muShellOp; $('val-vs-mu-shellOp').textContent = `${muShellOp}%`; }
    if ($('chk-vs-mu-score')) $('chk-vs-mu-score').checked = vs.matchupShowScore !== false;
    if ($('chk-vs-mu-seeds')) $('chk-vs-mu-seeds').checked = vs.matchupShowSeeds !== false;
    if ($('chk-vs-mu-handles')) $('chk-vs-mu-handles').checked = vs.matchupShowHandles !== false;
    renderMatchupFramingUI(vs);
    syncSeg('seg-vs-source', vs.source);
    syncSeg('seg-vs-avatar', vs.avatarMode);
    syncSeg('seg-vs-bg', vs.bgMode);
    syncSeg('seg-vs-pat', vs.pattern || 'theme');
    syncSeg('seg-vs-patDir', vs.patternDir || 'diag-dr');
    syncSeg('seg-vs-frameGlow', vs.frameGlow || 'theme');
    syncSeg('seg-vs-bandGlow', vs.bandGlow || 'subtle');
    syncSeg('seg-vs-bandAnim', vs.bandAnim || 'none');
    syncSeg('seg-vs-divAnim', vs.dividerAnim || 'theme');
    syncSeg('seg-vs-divGlow', vs.dividerGlow || 'theme');
    syncSeg('seg-vs-embAnim', vs.emblemAnim || 'theme');
    syncSeg('seg-vs-embGlow', vs.emblemGlow || 'theme');
    syncSeg('seg-vs-plateSurface', vs.plateSurface || 'theme');
    syncSeg('seg-vs-plateGlow', vs.plateGlow || 'none');
    syncSeg('seg-vs-plateAlign', vs.plateAlign || 'auto');
    syncSeg('seg-vs-plateScorePos', vs.plateScorePos || 'inner');
    syncSeg('seg-vs-plateAvPos', vs.plateAvatarPos || 'outer');
    syncSeg('seg-vs-plateFlagPos', vs.plateFlagPos || 'meta');
    syncSeg('seg-vs-plateFlagBg', vs.plateFlagBg || 'off');
    syncSeg('seg-vs-pfbSrc', vs.plateFlagBgSource || 'country');
    syncSeg('seg-vs-pfbAnim', vs.plateFlagBgAnim || 'none');
    syncSeg('seg-vs-hdrSurface', vs.headerSurface || 'theme');
    syncSeg('seg-vs-hdrGlow', vs.headerGlow || 'none');
    syncSeg('seg-vs-hdrAlign', vs.headerAlign || 'center');
    syncSeg('seg-vs-hdrOrder', vs.headerOrder || 'eyebrow-top');
    syncSeg('seg-vs-hdrFmtPos', vs.headerFormatPos || 'right');
    syncSeg('seg-vs-flagMode', vs.flagMode || (vs.showFlags === false ? 'none' : 'both'));
    syncSeg('seg-vs-charIdle', vs.charIdleAnim || 'none');

    const visBtn = $('btn-vs-vis');
    const isVis = vs.visible !== false;
    visBtn.textContent = isVis ? '👁 VS ON' : '🚫 VS HIDDEN';
    visBtn.classList.toggle('is-hidden', !isVis);

    $('vs-design-grid')?.querySelectorAll('[data-vs-design]').forEach(c => {
      c.classList.toggle('active', c.dataset.vsDesign === vs.design);
    });

    $('vs-next-bar').classList.toggle('visible', vs.source === 'next');
    $('vs-custom-bar').classList.toggle('visible', vs.source === 'custom');

    if (vs.nextMatch?.p1?.name) {
      $('vs-next-summary').textContent = `${vs.nextMatch.roundText || 'UP NEXT'} · ${vs.nextMatch.p1.name} vs ${vs.nextMatch.p2.name}`;
    } else {
      $('vs-next-summary').textContent = 'Connect a Start.gg / Challonge / Demo tournament and click Pull Next Set from Queue.';
    }

    const cm = vs.customMatch || DEFAULT_VS.customMatch;
    setIfNotFocused($('vs-c-round'), cm.round);
    setIfNotFocused($('vs-c-p1-name'), cm.p1?.name);
    setIfNotFocused($('vs-c-p2-name'), cm.p2?.name);
    if ($('vs-c-p1-char')) $('vs-c-p1-char').value = cm.p1?.character || '';
    if ($('vs-c-p2-char')) $('vs-c-p2-char').value = cm.p2?.character || '';

    // Backdrop & Pattern
    $('vs-bg1').value = vs.bgColor1 || '#f5b800';
    $('vs-bg2').value = vs.bgColor2 || '#10131e';
    $('vs-p1col').value = vs.p1Color || '#ff512f';
    $('vs-p2col').value = vs.p2Color || '#2563eb';
    $('vs-accentcol').value = vs.accentColor || '#facc15';
    $('vs-splitOverride').value = vs.splitOverride || 'theme';
    $('rng-vs-patSpeed').value = vs.patternSpeed ?? 40;
    $('val-vs-patSpeed').textContent = Number(vs.patternSpeed ?? 40) === 0 ? 'Static' : `${vs.patternSpeed ?? 40}%`;
    const patOp = Number(vs.patternOpacity ?? -1);
    $('rng-vs-patOp').value = patOp;
    $('val-vs-patOp').textContent = patOp < 0 ? 'Auto' : `${patOp}%`;
    $('rng-vs-patScale').value = vs.patternScale ?? 100;
    $('val-vs-patScale').textContent = `${vs.patternScale ?? 100}%`;

    // Frame, Neon Borders & 4-Side Edge Bands
    $('vs-frameStyle').value = vs.frameStyle || 'theme';
    $('vs-frameColor').value = vs.frameColor || '#0a0b10';
    $('vs-frameAccent').value = vs.frameAccent || '#facc15';
    const frTh = Number(vs.frameThickness ?? 0);
    $('rng-vs-frameThick').value = frTh;
    $('val-vs-frameThick').textContent = frTh === 0 ? 'Auto' : `${frTh} px`;
    const frIn = Number(vs.frameInset ?? -1);
    $('rng-vs-frameInset').value = frIn;
    $('val-vs-frameInset').textContent = frIn < 0 ? 'Auto' : `${frIn} px`;
    $('rng-vs-frameOp').value = vs.frameOpacity ?? 100;
    $('val-vs-frameOp').textContent = `${vs.frameOpacity ?? 100}%`;
    $('btn-vs-band-top').classList.toggle('active-chip', Boolean(vs.bandTop));
    $('btn-vs-band-bottom').classList.toggle('active-chip', Boolean(vs.bandBottom));
    $('btn-vs-band-left').classList.toggle('active-chip', Boolean(vs.bandLeft));
    $('btn-vs-band-right').classList.toggle('active-chip', Boolean(vs.bandRight));
    $('vs-bandStyle').value = vs.bandStyle || 'solid-trim';
    $('vs-bandColor').value = vs.bandColor || '#0a0c13';
    $('vs-bandAccent').value = vs.bandAccent || '#facc15';
    $('chk-vs-bandDual').checked = vs.bandDualSideColor !== false;
    $('rng-vs-bandThick').value = vs.bandThickness ?? 28;
    $('val-vs-bandThick').textContent = `${vs.bandThickness ?? 28} px`;
    $('rng-vs-bandOp').value = vs.bandOpacity ?? 95;
    $('val-vs-bandOp').textContent = `${vs.bandOpacity ?? 95}%`;

    // Divider & VS Emblem
    $('vs-dividerStyle').value = vs.dividerStyle || 'theme';
    $('rng-vs-divSpeed').value = vs.dividerSpeed ?? 45;
    $('val-vs-divSpeed').textContent = Number(vs.dividerSpeed ?? 45) === 0 ? 'Paused' : `${vs.dividerSpeed ?? 45}%`;
    const divW = Number(vs.dividerWidth ?? 0);
    $('rng-vs-divW').value = divW;
    $('val-vs-divW').textContent = divW === 0 ? 'Auto' : `${divW} px`;
    const hasTilt = vs.dividerTilt !== null && vs.dividerTilt !== undefined && vs.dividerTilt !== '';
    $('rng-vs-divTilt').value = hasTilt ? Number(vs.dividerTilt) : 0;
    $('val-vs-divTilt').textContent = hasTilt ? `${Number(vs.dividerTilt)}°` : 'Auto';
    $('vs-divColor').value = vs.dividerColor || '#ffffff';
    $('vs-divColor2').value = vs.dividerColor2 || '#0a0b10';
    $('rng-vs-divOp').value = vs.dividerOpacity ?? 100;
    $('val-vs-divOp').textContent = `${vs.dividerOpacity ?? 100}%`;
    $('rng-vs-divX').value = vs.dividerOffsetX ?? 0;
    $('val-vs-divX').textContent = `${vs.dividerOffsetX ?? 0} px`;

    $('vs-emblemStyle').value = vs.emblemStyle || 'theme';
    setIfNotFocused($('vs-emblemText'), vs.emblemText ?? 'VS');
    $('vs-embBg').value = vs.emblemBgColor || '#121726';
    $('vs-embText').value = vs.emblemTextColor || '#ffffff';
    $('vs-embStroke').value = vs.emblemStrokeColor || '#0a0c12';
    $('rng-vs-embScale').value = vs.emblemScale ?? 100;
    $('val-vs-embScale').textContent = `${vs.emblemScale ?? 100}%`;
    $('rng-vs-embRot').value = vs.emblemRotate ?? 0;
    $('val-vs-embRot').textContent = `${vs.emblemRotate ?? 0}°`;
    $('rng-vs-embX').value = vs.emblemOffsetX ?? 0;
    $('val-vs-embX').textContent = `${vs.emblemOffsetX ?? 0} px`;
    $('rng-vs-embY').value = vs.emblemOffsetY ?? 0;
    $('val-vs-embY').textContent = `${vs.emblemOffsetY ?? 0} px`;

    // Plates, Colors, Internal Order, Typography & Flag-BG Fade Studio
    $('vs-plateStyle').value = vs.plateStyle || 'theme';
    $('vs-fontDisplay').value = vs.fontDisplay || 'theme';
    $('vs-plateBg').value = vs.plateBgColor || '#080a10';
    $('vs-plateBg2').value = vs.plateBgColor2 || '#161d31';
    $('vs-plateText').value = vs.plateTextColor || '#ffffff';
    $('vs-plateSponsor').value = vs.plateSponsorColor || '#facc15';
    $('vs-plateBorder').value = vs.plateBorderColor || '#334155';
    $('vs-plateScoreBg').value = vs.plateScoreBg || '#ff512f';
    $('vs-plateScoreText').value = vs.plateScoreText || '#ffffff';
    const pBot = Number(vs.plateBottom ?? -1);
    $('rng-vs-plateBot').value = pBot;
    $('val-vs-plateBot').textContent = pBot < 0 ? 'Auto' : `${pBot} px`;
    const pEdgeX = Number(vs.plateEdgeX ?? -1);
    $('rng-vs-plateEdgeX').value = pEdgeX;
    $('val-vs-plateEdgeX').textContent = pEdgeX < 0 ? 'Auto' : `${pEdgeX} px`;
    $('rng-vs-plateW').value = vs.plateWidth ?? 790;
    $('val-vs-plateW').textContent = `${vs.plateWidth ?? 790} px`;
    const pMinH = Number(vs.plateMinHeight ?? 0);
    $('rng-vs-plateMinH').value = pMinH;
    $('val-vs-plateMinH').textContent = pMinH === 0 ? 'Auto' : `${pMinH} px`;
    $('rng-vs-plateScale').value = vs.plateScale ?? 100;
    $('val-vs-plateScale').textContent = `${vs.plateScale ?? 100}%`;
    $('rng-vs-plateOp').value = vs.plateOpacity ?? 96;
    $('val-vs-plateOp').textContent = `${vs.plateOpacity ?? 96}%`;
    const pBw = Number(vs.plateBorderWidth ?? -1);
    $('rng-vs-plateBw').value = pBw;
    $('val-vs-plateBw').textContent = pBw < 0 ? 'Auto' : `${pBw} px`;
    const pRad = Number(vs.plateRadius ?? -1);
    $('rng-vs-plateRad').value = pRad;
    $('val-vs-plateRad').textContent = pRad < 0 ? 'Auto' : `${pRad} px`;
    const hasSkew = vs.plateSkew !== null && vs.plateSkew !== undefined && vs.plateSkew !== '';
    $('rng-vs-plateSkew').value = hasSkew ? Number(vs.plateSkew) : 0;
    $('val-vs-plateSkew').textContent = hasSkew ? `${Number(vs.plateSkew)}°` : 'Auto';
    $('rng-vs-plateShadow').value = vs.plateShadow ?? 65;
    $('val-vs-plateShadow').textContent = `${vs.plateShadow ?? 65}%`;
    $('rng-vs-nameScale').value = vs.nameScale ?? 100;
    $('val-vs-nameScale').textContent = `${vs.nameScale ?? 100}%`;
    $('rng-vs-sponsorScale').value = vs.sponsorScale ?? 100;
    $('val-vs-sponsorScale').textContent = `${vs.sponsorScale ?? 100}%`;
    $('rng-vs-charNameScale').value = vs.charNameScale ?? 100;
    $('val-vs-charNameScale').textContent = `${vs.charNameScale ?? 100}%`;
    $('rng-vs-scoreScale').value = vs.scoreScale ?? 100;
    $('val-vs-scoreScale').textContent = `${vs.scoreScale ?? 100}%`;
    $('vs-plateInfoOrder').value = vs.plateInfoOrder || 'meta-name-char';
    $('vs-plateMetaOrder').value = vs.plateMetaOrder || 'flags-sponsor-bracket';
    $('vs-pfbBlend').value = vs.plateFlagBgBlend || 'normal';
    $('rng-vs-pfbOp').value = vs.plateFlagBgOpacity ?? 45;
    $('val-vs-pfbOp').textContent = `${vs.plateFlagBgOpacity ?? 45}%`;
    $('rng-vs-pfbZoom').value = vs.plateFlagBgZoom ?? 115;
    $('val-vs-pfbZoom').textContent = `${vs.plateFlagBgZoom ?? 115}%`;
    $('rng-vs-pfbStart').value = vs.plateFlagBgFadeStart ?? 20;
    $('val-vs-pfbStart').textContent = `${vs.plateFlagBgFadeStart ?? 20}%`;
    $('rng-vs-pfbEnd').value = vs.plateFlagBgFadeEnd ?? 92;
    $('val-vs-pfbEnd').textContent = `${vs.plateFlagBgFadeEnd ?? 92}%`;
    $('rng-vs-pfbAngle').value = vs.plateFlagBgAngle ?? 0;
    $('val-vs-pfbAngle').textContent = `${vs.plateFlagBgAngle ?? 0}°`;
    $('rng-vs-pfbBlur').value = vs.plateFlagBgBlur ?? 0;
    $('val-vs-pfbBlur').textContent = `${vs.plateFlagBgBlur ?? 0} px`;
    $('rng-vs-flagSize').value = vs.flagSize ?? 100;
    $('val-vs-flagSize').textContent = `${vs.flagSize ?? 100}%`;
    const wmOp = Number(vs.flagWatermarkOpacity ?? -1);
    $('rng-vs-wmOp').value = wmOp;
    $('val-vs-wmOp').textContent = wmOp < 0 ? 'Auto' : `${wmOp}%`;
    $('chk-vs-h2h').checked = vs.showH2H !== false;
    $('chk-vs-sponsor').checked = vs.showSponsor !== false;
    $('chk-vs-bracket').checked = vs.showBracket !== false;
    if ($('chk-vs-seed')) $('chk-vs-seed').checked = vs.showSeed !== false;
    if ($('chk-seed-sync-vs')) $('chk-seed-sync-vs').checked = vs.showSeed !== false;
    $('chk-vs-charname').checked = vs.showCharName !== false;
    $('chk-vs-score').checked = Boolean(vs.showScore);
    $('chk-vs-logo').checked = vs.showLogo !== false;

    // Header Full Studio, Branding & FX
    $('vs-headerStyle').value = vs.headerStyle || 'theme';
    $('vs-hdrBg').value = vs.headerBgColor || '#0a0c13';
    $('vs-hdrBg2').value = vs.headerBgColor2 || '#1a2138';
    $('vs-hdrText').value = vs.headerTextColor || '#ffffff';
    $('vs-hdrEyebrow').value = vs.headerEyebrowColor || '#facc15';
    $('vs-hdrBorder').value = vs.headerBorderColor || '#facc15';
    $('vs-hdrFmtBg').value = vs.headerFormatBg || '#facc15';
    $('vs-hdrFmtTxt').value = vs.headerFormatText || '#090b10';
    $('chk-vs-eyebrow').checked = vs.showEyebrow !== false;
    setIfNotFocused($('vs-eyebrow'), vs.eyebrow);
    setIfNotFocused($('vs-subtitle'), vs.subtitle);
    $('rng-vs-hdrScale').value = vs.headerScale ?? 100;
    $('val-vs-hdrScale').textContent = `${vs.headerScale ?? 100}%`;
    $('rng-vs-hdrFont').value = vs.headerFontSize ?? 100;
    $('val-vs-hdrFont').textContent = `${vs.headerFontSize ?? 100}%`;
    const hdrW = Number(vs.headerWidth ?? 0);
    $('rng-vs-hdrW').value = hdrW;
    $('val-vs-hdrW').textContent = hdrW === 0 ? 'Auto' : `${hdrW} px`;
    $('rng-vs-hdrOp').value = vs.headerOpacity ?? 100;
    $('val-vs-hdrOp').textContent = `${vs.headerOpacity ?? 100}%`;
    $('rng-vs-hdrY').value = vs.headerOffsetY ?? 0;
    $('val-vs-hdrY').textContent = `${vs.headerOffsetY ?? 0} px`;
    $('rng-vs-hdrX').value = vs.headerOffsetX ?? 0;
    $('val-vs-hdrX').textContent = `${vs.headerOffsetX ?? 0} px`;
    const hdrBw = Number(vs.headerBorderWidth ?? -1);
    $('rng-vs-hdrBw').value = hdrBw;
    $('val-vs-hdrBw').textContent = hdrBw < 0 ? 'Auto' : `${hdrBw} px`;
    const hdrRad = Number(vs.headerRadius ?? -1);
    $('rng-vs-hdrRad').value = hdrRad;
    $('val-vs-hdrRad').textContent = hdrRad < 0 ? 'Auto' : `${hdrRad} px`;
    $('vs-entryAnim').value = vs.entryAnim || 'slam-split';
    $('rng-vs-entrySpeed').value = vs.entrySpeed ?? 100;
    $('val-vs-entrySpeed').textContent = `${vs.entrySpeed ?? 100}%`;
    $('vs-ambientAnim').value = vs.ambientAnim || 'theme';
    $('vs-logoPos').value = vs.logoPos || 'bottom-left';
    const autoLogoOn = vs.autoEventLogo !== false;
    $('chk-vs-auto-logo').checked = autoLogoOn;
    $('chk-trn-auto-logo').checked = autoLogoOn;
    const logoThumb = $('vs-logo-thumb');
    if (vs.logoUrl) {
      if (logoThumb.getAttribute('src') !== vs.logoUrl) logoThumb.src = vs.logoUrl;
      logoThumb.style.display = 'block';
      $('vs-logo-status').textContent = vs.logoSource === 'auto' ? '✅ Auto Event Logo' : '✅ Custom Logo';
    } else {
      logoThumb.style.display = 'none';
      $('vs-logo-status').textContent = autoLogoOn ? 'Auto (connect tournament)' : 'No event logo';
    }
    $('btn-vs-logo-clear').style.display = vs.logoUrl ? 'inline-flex' : 'none';
    $('rng-vs-logoScale').value = vs.logoScale ?? 100;
    $('val-vs-logoScale').textContent = `${vs.logoScale ?? 100}%`;
    $('rng-vs-h2hY').value = vs.h2hOffsetY ?? 84;
    $('val-vs-h2hY').textContent = `${vs.h2hOffsetY ?? 84} px`;

    // Character Framing
    $('btn-vs-p1-flip').classList.toggle('active-chip', Boolean(vs.p1Flip));
    $('btn-vs-p2-flip').classList.toggle('active-chip', vs.p2Flip !== false);
    $('rng-vs-charShadow').value = vs.charShadow ?? 60;
    $('val-vs-charShadow').textContent = `${vs.charShadow ?? 60}%`;
    $('rng-vs-p1Zoom').value = vs.p1Zoom ?? 100;
    $('val-vs-p1Zoom').textContent = `${vs.p1Zoom ?? 100}%`;
    $('rng-vs-p2Zoom').value = vs.p2Zoom ?? 100;
    $('val-vs-p2Zoom').textContent = `${vs.p2Zoom ?? 100}%`;
    $('rng-vs-p1X').value = vs.p1OffsetX ?? 0;
    $('val-vs-p1X').textContent = `${vs.p1OffsetX ?? 0} px`;
    $('rng-vs-p2X').value = vs.p2OffsetX ?? 0;
    $('val-vs-p2X').textContent = `${vs.p2OffsetX ?? 0} px`;
    $('rng-vs-p1Y').value = vs.p1OffsetY ?? 0;
    $('val-vs-p1Y').textContent = `${vs.p1OffsetY ?? 0} px`;
    $('rng-vs-p2Y').value = vs.p2OffsetY ?? 0;
    $('val-vs-p2Y').textContent = `${vs.p2OffsetY ?? 0} px`;

    if ($('vs-game-select')?.options.length && vs.game) {
      $('vs-game-select').value = vs.game;
      const wantPack = vs.pack || 'full';
      const wantKey = `${vs.game}/${wantPack}`;
      if ((activeRoster.game !== vs.game || activeRoster.pack !== wantPack) && rosterLoadingKey !== wantKey && !failedRosterKeys.has(wantKey)) {
        syncPackSelectForGame(vs.game, wantPack);
        loadActiveRoster(vs.game, wantPack);
      }
    }
    if (activeRoster.characters?.length) renderRosterStrip();
  }

  function syncPackSelectForGame(gameId, preferredPack) {
    const list = gamesCatalog.all?.length ? gamesCatalog.all : gamesCatalog.featured;
    const g = list.find(x => x.id === gameId);
    const packs = g?.packs?.length ? g.packs : [{ id: 'full', name: 'Full Renders', cachedCount: 0 }];
    const sel = $('vs-pack-select');
    sel.innerHTML = packs.map(p => `<option value="${p.id}">${p.name}${p.cachedCount ? ` (${p.cachedCount} cached)` : ''}</option>`).join('');
    const chosen = packs.some(p => p.id === preferredPack) ? preferredPack : (g?.defaultPack || packs[0].id);
    sel.value = chosen;
    return chosen;
  }

  async function loadGamesCatalog(includeAll = false) {
    if (!isHttp) return;
    try {
      const res = await fetch(`/api/assets/games${includeAll ? '?all=1' : ''}`);
      if (!res.ok) return;
      const data = await res.json();
      gamesCatalog = { ...data, loadedAll: includeAll };
      const list = includeAll ? data.all : data.featured;
      const gameOptsHtml = list.map(g => `<option value="${g.id}">${g.featured ? '★ ' : ''}${g.name}</option>`).join('');
      const sel = $('vs-game-select');
      sel.innerHTML = gameOptsHtml;
      const activeGame = state.vs?.game || 'tekken8';
      if (list.some(g => g.id === activeGame)) sel.value = activeGame;
      const muGameSel = $('vs-mu-game');
      if (muGameSel) {
        muGameSel.innerHTML = gameOptsHtml;
        if (list.some(g => g.id === activeGame)) muGameSel.value = activeGame;
      }
      const chosenPack = syncPackSelectForGame(sel.value, state.vs?.pack || 'full');
      if (includeAll) {
        $('btn-load-all-games').textContent = `${data.totalCatalogGames} Games Loaded`;
        $('btn-load-all-games').disabled = true;
      }
      // Also populate Tournament Results game/pack selectors
      const resSel = $('res-game-select');
      if (resSel) {
        resSel.innerHTML = gameOptsHtml;
        const activeResGame = state.results?.game || state.vs?.game || 'tekken8';
        if (list.some(g => g.id === activeResGame)) resSel.value = activeResGame;
        const chosenResPack = syncResPackSelect(resSel.value, state.results?.pack || 'full');
        loadResultsRoster(resSel.value, chosenResPack);
      }
      await loadActiveRoster(sel.value, chosenPack);
    } catch {}
  }

  async function loadActiveRoster(gameId, packId) {
    if (!isHttp) return;
    const g = gameId || 'tekken8';
    const p = packId || 'full';
    const key = `${g}/${p}`;
    rosterLoadingKey = key;
    try {
      const res = await fetch(`/api/assets/roster?game=${encodeURIComponent(g)}&pack=${encodeURIComponent(p)}`);
      if (!res.ok) {
        failedRosterKeys.add(key);
        return;
      }
      failedRosterKeys.delete(key);
      activeRoster = await res.json();
      populateCharSelects(activeRoster.characters, activeRoster.gameName);
      $('p1-char').value = state.p1?.character || '';
      $('p2-char').value = state.p2?.character || '';
      if ($('vs-c-p1-char')) $('vs-c-p1-char').value = state.vs?.customMatch?.p1?.character || '';
      if ($('vs-c-p2-char')) $('vs-c-p2-char').value = state.vs?.customMatch?.p2?.character || '';
      renderMatchupFramingUI({ ...DEFAULT_VS, ...(state.vs || {}) });
      $('vs-cache-status').textContent = `${activeRoster.cachedCount} / ${activeRoster.total} cached offline`;
      renderRosterStrip(true);
    } catch {
      failedRosterKeys.add(key);
    } finally {
      if (rosterLoadingKey === key) rosterLoadingKey = '';
    }
  }

  function getActiveVsChars() {
    const src = state.vs?.source || 'current';
    if (src === 'custom') {
      return { p1: state.vs?.customMatch?.p1?.character || '', p2: state.vs?.customMatch?.p2?.character || '' };
    }
    if (src === 'next' && state.vs?.nextMatch?.p1) {
      return { p1: state.vs.nextMatch.p1.character || '', p2: state.vs.nextMatch.p2?.character || '' };
    }
    return { p1: state.p1?.character || '', p2: state.p2?.character || '' };
  }

  function renderRosterStrip(force = false) {
    const q = normText(rosterSearch.trim());
    const cur = getActiveVsChars();
    const curP1 = normText(cur.p1);
    const curP2 = normText(cur.p2);
    const sig = `${activeRoster.game}|${activeRoster.pack}|${activeRoster.cachedCount}|${activeRoster.total}|${q}|${curP1}|${curP2}`;
    if (!force && sig === lastRosterSig) return;
    lastRosterSig = sig;
    const chars = (activeRoster.characters || []).filter(c => !q || normText(`${c.name} ${c.shortName} ${c.codename}`).includes(q));
    $('vs-roster-strip').innerHTML = chars.map(c => {
      const cn = normText(c.name);
      const isP1 = Boolean(curP1 && cn === curP1);
      const isP2 = Boolean(curP2 && cn === curP2);
      const p1Style = isP1
        ? 'border-color:var(--p1);background:var(--p1);color:#0b0d14;font-weight:900;'
        : 'border-color:var(--p1);';
      const p2Style = isP2
        ? 'border-color:var(--p2);background:var(--p2);color:#fff;font-weight:900;'
        : 'border-color:var(--p2);';
      return `
      <div class="roster-chip ${c.cached ? 'cached' : ''}">
        <span class="roster-chip-name" title="${c.name}${c.cached ? ' (Cached Offline)' : ' (Auto-downloads on select)'}">
          ${c.cached ? '✅ ' : ''}${c.name}
        </span>
        <span class="roster-chip-btns">
          <button type="button" data-char-p1="${c.name.replace(/"/g, '&quot;')}" style="${p1Style}">P1</button>
          <button type="button" data-char-p2="${c.name.replace(/"/g, '&quot;')}" style="${p2Style}">P2</button>
        </span>
      </div>`;
    }).join('') || '<div style="grid-column:1/-1;color:var(--muted);font-size:11px;padding:8px;">No characters matched.</div>';
  }

  function pollDownloadStatus() {
    clearInterval(dlPollTimer);
    dlPollTimer = setInterval(async () => {
      try {
        const res = await fetch('/api/assets/download-status');
        if (!res.ok) return;
        const st = await res.json();
        const pct = st.total ? Math.round((st.done / st.total) * 100) : 0;
        $('vs-dl-progress').classList.add('active');
        $('vs-dl-fill').style.width = `${pct}%`;
        $('vs-dl-pct').textContent = `${pct}%`;
        $('vs-dl-text').textContent = st.running
          ? `Downloading ${st.game}/${st.pack}: ${st.currentChar} (${st.done}/${st.total})`
          : `✅ Pack cached offline (${st.done - st.failed}/${st.total} renders ready)`;
        if (!st.running) {
          clearInterval(dlPollTimer);
          $('btn-dl-pack').disabled = false;
          await loadActiveRoster(state.vs?.game || 'tekken8', state.vs?.pack || 'full');
          pushPreviewConfig();
          toast(`📦 Pack ready offline (${st.game}/${st.pack})`);
        }
      } catch {
        clearInterval(dlPollTimer);
      }
    }, 550);
  }

  async function uploadLocalImage(file, kind, name, game) {
    if (!isHttp) return toast('Start the local server first (Start_Scorebar.bat)');
    const dataUrl = await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, name, dataUrl, game })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  }

  function bindVsAndAssetEvents() {
    // Player 1 & Player 2 Profile Avatar upload / clear
    for (const side of ['p1', 'p2']) {
      $(`btn-${side}-avatar-upload`).addEventListener('click', () => $(`file-${side}-avatar`).click());
      $(`btn-${side}-avatar-clear`).addEventListener('click', () => {
        commitState({ [side]: { avatar: '' } }, true);
        toast(`${side.toUpperCase()} profile photo cleared`);
      });
      $(`file-${side}-avatar`).addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
          const url = await uploadLocalImage(file, 'avatar', state[side]?.name || side);
          commitState({ [side]: { avatar: url } }, true);
          toast(`📷 ${side.toUpperCase()} profile photo updated`);
        } catch (err) {
          toast(`⚠️ ${err.message}`);
        }
        e.target.value = '';
      });
    }

    // Interactive Click-to-Select & Direct Drag Listener from vs.html & index.html Preview Iframes!
    function switchScorebarTab(tabId, subPaneId, subType = 'studio') {
      if (tabId) {
        $('bottom-tabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.tab === tabId));
        document.querySelectorAll('#ws-scorebars .tab-pane').forEach(p => p.classList.toggle('active', p.id === `tab-${tabId}`));
      }
      if (subPaneId && subType === 'studio') {
        $('studio-subtabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.spane === subPaneId));
        document.querySelectorAll('.studio-pane').forEach(p => p.classList.toggle('active', p.id === `spane-${subPaneId}`));
      } else if (subPaneId && subType === 'eb') {
        $('eb-subtabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.epane === subPaneId));
        document.querySelectorAll('.eb-studio-pane').forEach(p => p.classList.toggle('active', p.id === `epane-${subPaneId}`));
      }
    }

    function flashScorebarTarget(elOrId, shouldFocus = false) {
      const el = typeof elOrId === 'string' ? $(elOrId) : elOrId;
      if (!el) return;
      el.classList.remove('sb-field-flash');
      void el.offsetWidth;
      el.classList.add('sb-field-flash');
      // Smart sticky-aware scroll: keeps the target cleanly visible BELOW the pinned Live Preview!
      const pv = $('preview-card');
      const stickyBottom = (pv && pv.classList.contains('is-pinned')) ? Math.ceil(pv.getBoundingClientRect().bottom + 14) : 74;
      const rect = el.getBoundingClientRect();
      if (rect.top < stickyBottom || rect.bottom > window.innerHeight - 16) {
        const targetY = Math.max(0, window.scrollY + rect.top - stickyBottom - 16);
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
      if (shouldFocus && typeof el.focus === 'function') {
        setTimeout(() => {
          try {
            el.focus({ preventScroll: true });
            if (el.tagName === 'INPUT' && el.type === 'text' && typeof el.select === 'function') el.select();
          } catch {}
        }, 120);
      }
    }

    function openScorebarInspectorForElement(elKey, customLabel, opts = {}) {
      // Close any open saved-player dropdowns so they never linger when jumping to another element
      document.querySelectorAll('.player-popover.open').forEach(p => p.classList.remove('open'));
      const isSmashNow = String(state.theme || '').startsWith('ssbu-');
      const partnerId = (side) => isSmashNow ? `${side}-partner-name` : `${side}-coop-name`;
      const MAP = {
        // Player 1 & 2 Exact Cockpit Controls
        'p1-name':    { label: '👤 P1 Name', focus: 'p1-name', input: true, jump: 'p1-name', actions: [
          { label: '🔤 Name Font', fn: () => { switchScorebarTab('tweaks', 'fonts'); flashScorebarTarget('st-font-name', true); } },
          { label: '🎨 Name Color', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('card-center-text'); } }
        ] },
        'p2-name':    { label: '👤 P2 Name', focus: 'p2-name', input: true, jump: 'p2-name', actions: [
          { label: '🔤 Name Font', fn: () => { switchScorebarTab('tweaks', 'fonts'); flashScorebarTarget('st-font-name', true); } },
          { label: '🎨 Name Color', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('card-center-text'); } }
        ] },
        'p1-sponsor': { label: '🏷️ P1 Sponsor / Tag', focus: 'p1-sponsor', input: true, jump: 'p1-name', actions: [
          { label: '🎨 Sponsor Color', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('st-sponsor'); } }
        ] },
        'p2-sponsor': { label: '🏷️ P2 Sponsor / Tag', focus: 'p2-sponsor', input: true, jump: 'p2-name', actions: [
          { label: '🎨 Sponsor Color', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('st-sponsor'); } }
        ] },
        'p1-flag':    { label: '🏳️ P1 Country Flag', focus: 'btn-p1-flag', jump: 'p1-flags', actions: [
          { label: '🏳️ Pick Flag', fn: () => openFlagPicker('p1', 'flag') },
          ...(isSmashNow ? [{ label: '📍 Move Flags Inside/Below', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-smashFlagPos'); } }] : []),
          { label: '📐 Flag Style', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-flagStyle'); } },
          { label: '🌊 Flag Fade', fn: () => { switchScorebarTab('tweaks', 'flagfade'); flashScorebarTarget('seg-flagFadeMode'); } }
        ] },
        'p2-flag':    { label: '🏳️ P2 Country Flag', focus: 'btn-p2-flag', jump: 'p1-flags', actions: [
          { label: '🏳️ Pick Flag', fn: () => openFlagPicker('p2', 'flag') },
          ...(isSmashNow ? [{ label: '📍 Move Flags Inside/Below', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-smashFlagPos'); } }] : []),
          { label: '📐 Flag Style', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-flagStyle'); } },
          { label: '🌊 Flag Fade', fn: () => { switchScorebarTab('tweaks', 'flagfade'); flashScorebarTarget('seg-flagFadeMode'); } }
        ] },
        'p1-region':  { label: '🗺️ P1 Region / State Flag', focus: 'btn-p1-region', jump: 'p1-flags', actions: [
          { label: '🗺️ Pick Region', fn: () => openFlagPicker('p1', 'region') },
          ...(isSmashNow ? [{ label: '📍 Move Flags Inside/Below', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-smashFlagPos'); } }] : []),
          { label: '📐 Flag Style', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-flagStyle'); } },
          { label: '🌊 Flag Fade', fn: () => { switchScorebarTab('tweaks', 'flagfade'); flashScorebarTarget('seg-flagFadeMode'); } }
        ] },
        'p2-region':  { label: '🗺️ P2 Region / State Flag', focus: 'btn-p2-region', jump: 'p1-flags', actions: [
          { label: '🗺️ Pick Region', fn: () => openFlagPicker('p2', 'region') },
          ...(isSmashNow ? [{ label: '📍 Move Flags Inside/Below', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-smashFlagPos'); } }] : []),
          { label: '📐 Flag Style', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-flagStyle'); } },
          { label: '🌊 Flag Fade', fn: () => { switchScorebarTab('tweaks', 'flagfade'); flashScorebarTarget('seg-flagFadeMode'); } }
        ] },
        'p1-flags':   { label: '🏳️ Flags Style & Display', tab: 'tweaks', sub: 'shape', focus: isSmashNow ? 'seg-smashFlagPos' : 'seg-flagStyle', jump: 'p1-flags', actions: [
          { label: '🏳️ P1 Flag', fn: () => openFlagPicker('p1', 'flag') },
          { label: '🏳️ Mode (Both/Country/Region)', fn: () => flashScorebarTarget('flag-mode-bar') },
          { label: '🌊 Flag Fade', fn: () => { switchScorebarTab('tweaks', 'flagfade'); flashScorebarTarget('seg-flagFadeMode'); } }
        ] },
        'p2-flags':   { label: '🏳️ Flags Style & Display', tab: 'tweaks', sub: 'shape', focus: isSmashNow ? 'seg-smashFlagPos' : 'seg-flagStyle', jump: 'p1-flags', actions: [
          { label: '🏳️ P2 Flag', fn: () => openFlagPicker('p2', 'flag') },
          { label: '🏳️ Mode (Both/Country/Region)', fn: () => flashScorebarTarget('flag-mode-bar') },
          { label: '🌊 Flag Fade', fn: () => { switchScorebarTab('tweaks', 'flagfade'); flashScorebarTarget('seg-flagFadeMode'); } }
        ] },
        'p1-iso':     { label: '🏷️ Country ISO Tag', tab: 'tweaks', sub: 'shape', focus: 'st-isoCode', input: true, jump: 'p1-flags' },
        'p2-iso':     { label: '🏷️ Country ISO Tag', tab: 'tweaks', sub: 'shape', focus: 'st-isoCode', input: true, jump: 'p1-flags' },
        'p1-score':   { label: '🔢 P1 Score', focus: 'p1-plus', jump: 'p1-name', actions: [
          { label: '+1 P1', fn: () => $('p1-plus')?.click() },
          { label: '-1', fn: () => $('p1-minus')?.click() },
          { label: '🎨 P1 Color', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('card-players-colors'); } },
          { label: '🔤 Score Font', fn: () => { switchScorebarTab('tweaks', 'fonts'); flashScorebarTarget('st-font-score', true); } },
          { label: '💥 Score FX', fn: () => { switchScorebarTab('tweaks', 'fx'); flashScorebarTarget('st-scoreAnim', true); } }
        ] },
        'p2-score':   { label: '🔢 P2 Score', focus: 'p2-plus', jump: 'p2-name', actions: [
          { label: '+1 P2', fn: () => $('p2-plus')?.click() },
          { label: '-1', fn: () => $('p2-minus')?.click() },
          { label: '🎨 P2 Color', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('card-players-colors'); } },
          { label: '🔤 Score Font', fn: () => { switchScorebarTab('tweaks', 'fonts'); flashScorebarTarget('st-font-score', true); } },
          { label: '💥 Score FX', fn: () => { switchScorebarTab('tweaks', 'fx'); flashScorebarTarget('st-scoreAnim', true); } }
        ] },
        'p1-bracket': { label: '🏆 P1 Bracket [W]/[L]', focus: 'p1-bracket', input: true, jump: 'p1-name' },
        'p2-bracket': { label: '🏆 P2 Bracket [W]/[L]', focus: 'p2-bracket', input: true, jump: 'p2-name' },
        'p1-char':    { label: '🥊 P1 Fighter / Character', focus: 'p1-char', input: true, jump: 'p1-name' },
        'p2-char':    { label: '🥊 P2 Fighter / Character', focus: 'p2-char', input: true, jump: 'p2-name' },
        'p1-variant': { label: '⚡ P1 Fuse / Control Style', focus: 'p1-variant', input: true, jump: 'p1-name' },
        'p2-variant': { label: '⚡ P2 Fuse / Control Style', focus: 'p2-variant', input: true, jump: 'p2-name' },
        'p1-partner': { label: '🤝 P1 Teammate / Partner', focus: partnerId('p1'), input: true, jump: 'p1-name' },
        'p2-partner': { label: '🤝 P2 Teammate / Partner', focus: partnerId('p2'), input: true, jump: 'p2-name' },
        'p1-partner-char': { label: '🌟 Team 1 Teammate Fighter', focus: 'p1-partner-char', input: true, jump: 'p1-name' },
        'p2-partner-char': { label: '🌟 Team 2 Teammate Fighter', focus: 'p2-partner-char', input: true, jump: 'p2-name' },
        'p1-partner-pronouns': { label: '💬 Team 1 Teammate Pronouns', focus: 'p1-partner-pronouns', input: true, jump: 'p1-name' },
        'p2-partner-pronouns': { label: '💬 Team 2 Teammate Pronouns', focus: 'p2-partner-pronouns', input: true, jump: 'p2-name' },
        'p1-partner-flag': { label: '🏳️ Teammate 1 Country Flag', focus: 'btn-p1-partner-flag', jump: 'p1-flags', actions: [
          { label: '🏳️ Pick Flag', fn: () => openFlagPicker('p1-partner', 'flag') },
          { label: '📍 Move Flags Inside/Below', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-smashFlagPos'); } }
        ] },
        'p2-partner-flag': { label: '🏳️ Teammate 2 Country Flag', focus: 'btn-p2-partner-flag', jump: 'p1-flags', actions: [
          { label: '🏳️ Pick Flag', fn: () => openFlagPicker('p2-partner', 'flag') },
          { label: '📍 Move Flags Inside/Below', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-smashFlagPos'); } }
        ] },
        'p1-partner-region': { label: '🗺️ Teammate 1 Region Flag', focus: 'btn-p1-partner-region', jump: 'p1-flags', actions: [
          { label: '🗺️ Pick Region', fn: () => openFlagPicker('p1-partner', 'region') },
          { label: '📍 Move Flags Inside/Below', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-smashFlagPos'); } }
        ] },
        'p2-partner-region': { label: '🗺️ Teammate 2 Region Flag', focus: 'btn-p2-partner-region', jump: 'p1-flags', actions: [
          { label: '🗺️ Pick Region', fn: () => openFlagPicker('p2-partner', 'region') },
          { label: '📍 Move Flags Inside/Below', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-smashFlagPos'); } }
        ] },
        'p1-seed':     { label: '🔢 P1 Seed', focus: 'p1-seed', input: true, jump: 'p1-name' },
        'p2-seed':     { label: '🔢 P2 Seed', focus: 'p2-seed', input: true, jump: 'p2-name' },
        'p1-pronouns': { label: '💬 P1 Pronouns', focus: 'p1-pronouns', input: true, jump: 'p1-name' },
        'p2-pronouns': { label: '💬 P2 Pronouns', focus: 'p2-pronouns', input: true, jump: 'p2-name' },
        'p1-handle':   { label: '📱 P1 @Handle', focus: 'p1-handle', input: true, jump: 'p1-name' },
        'p2-handle':   { label: '📱 P2 @Handle', focus: 'p2-handle', input: true, jump: 'p2-name' },
        'p1-meta':     { label: '🏷️ P1 Meta Strip', focus: 'p1-comp-meta', jump: 'p1-name' },
        'p2-meta':     { label: '🏷️ P2 Meta Strip', focus: 'p2-comp-meta', jump: 'p2-name' },
        'p1-mp':       { label: '🔥 Match Point Indicator', tab: 'tweaks', sub: 'shape', focus: 'seg-mpStyle', jump: 'p1-mp', actions: [
          { label: '✏️ Badge Text', fn: () => flashScorebarTarget('st-mpText', true) },
          { label: '🎨 MP Color', fn: () => flashScorebarTarget('seg-mpColor') }
        ] },
        'p2-mp':       { label: '🔥 Match Point Indicator', tab: 'tweaks', sub: 'shape', focus: 'seg-mpStyle', jump: 'p1-mp', actions: [
          { label: '✏️ Badge Text', fn: () => flashScorebarTarget('st-mpText', true) },
          { label: '🎨 MP Color', fn: () => flashScorebarTarget('seg-mpColor') }
        ] },
        'p1-wing':     { label: '🎨 P1 Wing / Plate Style', tab: 'tweaks', sub: 'colors', focus: 'card-players-colors', jump: 'p1-wing', actions: [
          { label: '⬛ Surface BG', fn: () => flashScorebarTarget('card-surface-bg') },
          { label: '📐 Shape & HUD', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('st-shape', true); } },
          { label: '✨ FX & Glow', fn: () => { switchScorebarTab('tweaks', 'fx'); flashScorebarTarget('seg-glow'); } }
        ] },
        'p2-wing':     { label: '🎨 P2 Wing / Plate Style', tab: 'tweaks', sub: 'colors', focus: 'card-players-colors', jump: 'p1-wing', actions: [
          { label: '⬛ Surface BG', fn: () => flashScorebarTarget('card-surface-bg') },
          { label: '📐 Shape & HUD', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('st-shape', true); } },
          { label: '✨ FX & Glow', fn: () => { switchScorebarTab('tweaks', 'fx'); flashScorebarTarget('seg-glow'); } }
        ] },
        // Center Round, Format, Smash Stage & Logo
        'round':       { label: '🏆 Phase / Round', focus: 'round-input', input: true, jump: 'round', actions: [
          { label: '📐 Box Shape & Position', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget(isSmashNow ? 'seg-smashInfoPos' : 'st-centerStyle'); } },
          { label: '🎨 Box Colors & Surface', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('card-center-text'); } }
        ] },
        'format':      { label: '📋 Match Format', focus: 'format-select', input: true, jump: 'round', actions: [
          { label: '📐 Box Shape & Position', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget(isSmashNow ? 'seg-smashInfoPos' : 'st-centerStyle'); } },
          { label: '🎨 Box Colors & Surface', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('card-center-text'); } }
        ] },
        'center':      { label: isSmashNow ? '🏆 Round / Stage Box' : '🏆 Center Banner Style', tab: 'tweaks', sub: 'shape', focus: isSmashNow ? 'seg-smashInfoPos' : 'st-centerStyle', input: !isSmashNow, jump: 'round', actions: [
          { label: '✏️ Round Text', fn: () => flashScorebarTarget('round-input', true) },
          ...(isSmashNow ? [{ label: '🗺️ Stage', fn: () => flashScorebarTarget('smash-stage-select', true) }] : []),
          { label: '📐 Center Style', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('st-centerStyle', true); } },
          { label: '🎨 Box Colors & Surface', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('card-center-text'); } },
          { label: '🔤 Fonts', fn: () => { switchScorebarTab('tweaks', 'fonts'); flashScorebarTarget('st-font-name', true); } }
        ] },
        'smash-stage': { label: '🗺️ Smash Stage', focus: 'smash-stage-select', input: true, jump: 'round', actions: [
          { label: '📐 Box Shape & Position', fn: () => { switchScorebarTab('tweaks', 'shape'); flashScorebarTarget('seg-smashInfoPos'); } },
          { label: '🎨 Box Colors & Surface', fn: () => { switchScorebarTab('tweaks', 'colors'); flashScorebarTarget('card-center-text'); } }
        ] },
        'smash-logo':  { label: '🏷️ Center Medallion Logo', tab: 'tweaks', sub: 'shape', focus: 'seg-smashLogoMode', jump: 'eb-bar', actions: [
          { label: '🔴 Smash Emblem', fn: () => commitState({ style: { smashLogoMode: 'smash-ball' } }, true) },
          { label: '🚫 Hide Box', fn: () => commitState({ style: { smashLogoMode: 'hidden' } }, true) },
          { label: '🔄 Sync Start.gg', fn: () => { switchScorebarTab('casters', 'eventbar', 'eb'); $('btn-eb-pull-logo')?.click(); } },
          { label: '⬆ Upload Logo', fn: () => { switchScorebarTab('casters', 'eventbar', 'eb'); flashScorebarTarget('eb-logo-thumb'); $('btn-eb-upload-logo')?.click(); } }
        ] },
        'fonts':       { label: '🔤 Typography (Fonts)', tab: 'tweaks', sub: 'fonts', focus: 'st-font-name', input: true, jump: 'fonts' },
        // Event Bar Pinpoint Controls
        'eb-bar':      { label: '🏷️ Event Bar Style & Position', tab: 'casters', sub: 'eventbar', subType: 'eb', focus: 'eb-style', input: true, jump: 'eb-bar', uncrop: true, actions: [
          { label: '📝 Title', fn: () => flashScorebarTarget('eb-title', true) },
          { label: '🏷️ Logo', fn: () => flashScorebarTarget('eb-logo-thumb') },
          { label: '🎨 Colors', fn: () => flashScorebarTarget('eb-color-row') }
        ] },
        'eb-logo':     { label: '🏷️ Event Bar Logo', tab: 'casters', sub: 'eventbar', subType: 'eb', focus: 'eb-logo-thumb', jump: 'eb-bar', actions: [
          { label: '🔄 Sync Start.gg', fn: () => $('btn-eb-pull-logo')?.click() },
          { label: '⬆ Upload', fn: () => $('btn-eb-upload-logo')?.click() },
          { label: '📍 Placement', fn: () => flashScorebarTarget('eb-logo-pos', true) }
        ] },
        'eb-title':    { label: '📝 Event Bar Title', tab: 'casters', sub: 'eventbar', subType: 'eb', focus: 'eb-title', input: true, jump: 'eb-bar' },
        'eb-sub':      { label: '📝 Event Bar Subtitle', tab: 'casters', sub: 'eventbar', subType: 'eb', focus: 'eb-subtitle', input: true, jump: 'eb-bar' },
        'eb-ticker':   { label: '📡 Event Bar Ticker', tab: 'casters', sub: 'eventbar', subType: 'eb', focus: 'eb-ticker', input: true, jump: 'eb-bar' },
        // Commentators Bar Pinpoint Controls
        'cm-bar':      { label: '🎙 Commentators Style & Layout', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'cm-style', input: true, jump: 'cm-bar', uncrop: true, actions: [
          { label: '🛡️ Anti-Overlap', fn: () => flashScorebarTarget('seg-cm-antiOverlap') },
          { label: '🎙 Caster 1', fn: () => flashScorebarTarget('c1-name', true) },
          { label: '🎨 Colors', fn: () => flashScorebarTarget('cm-color-row') }
        ] },
        'cm-logo':     { label: '🏷️ Commentators Event Logo', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'chk-cm-logo', jump: 'cm-bar' },
        'c1':          { label: '🎙 Commentator 1', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'c1-name', input: true, jump: 'cm-bar' },
        'c1-handle':   { label: '📱 Commentator 1 @Handle', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'c1-handle', input: true, jump: 'cm-bar' },
        'c1-role':     { label: '🎭 Commentator 1 Role', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'c1-role', input: true, jump: 'cm-bar' },
        'c2':          { label: '🎙 Commentator 2', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'c2-name', input: true, jump: 'cm-bar' },
        'c2-handle':   { label: '📱 Commentator 2 @Handle', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'c2-handle', input: true, jump: 'cm-bar' },
        'c2-role':     { label: '🎭 Commentator 2 Role', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'c2-role', input: true, jump: 'cm-bar' },
        'c3':          { label: '🎙 Commentator 3', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'c3-name', input: true, jump: 'cm-bar' },
        'c3-handle':   { label: '📱 Commentator 3 @Handle', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'c3-handle', input: true, jump: 'cm-bar' },
        'c3-role':     { label: '🎭 Commentator 3 Role', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'c3-role', input: true, jump: 'cm-bar' },
        'cm-icon':     { label: '🎙 Caster Icon Badge', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'cm-icon', input: true, jump: 'cm-bar' },
        'cm-sep':      { label: '⚡ Caster Divider Style', tab: 'casters', sub: 'casters', subType: 'eb', focus: 'cm-sep', input: true, jump: 'cm-bar' }
      };

      const info = MAP[elKey];
      if (!info) return;
      sbSelectedEl = elKey;

      // If jumping to bottom Event Bar / Commentators while HUD Strip crop hides the bottom half, show full 16:9!
      if (info.uncrop && opts.fromJump && $('preview-wrap')?.classList.contains('cropped')) {
        $('preview-wrap').classList.remove('cropped');
        $('btn-crop-hud')?.classList.remove('active-chip');
      }

      if (info.tab) switchScorebarTab(info.tab, info.sub, info.subType || 'studio');

      const cleanLbl = customLabel ? customLabel.replace(/\s*\([^)]*\)/g, '').trim() : info.label;
      $('sb-sel-label').textContent = `🎯 Editing: ${cleanLbl}`;
      $('btn-sb-clear-sel').style.display = 'inline-flex';
      $('sb-sel-jumps')?.querySelectorAll('button[data-sb-jump]').forEach(b => {
        b.classList.toggle('active-chip', b.dataset.sbJump === (info.jump || elKey));
      });

      // Render contextual pinpoint quick-action chips for this exact element
      const actHost = $('sb-sel-actions');
      if (actHost) {
        actHost.innerHTML = '';
        (info.actions || []).forEach(act => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = tr(act.label);
          btn.addEventListener('click', act.fn);
          actHost.appendChild(btn);
        });
      }

      // Highlight & focus the exact specific control (skip scrolling/focusing if user was purely dragging!)
      if (!opts.moved && info.focus) {
        flashScorebarTarget(info.focus, Boolean(info.input));
      } else if (opts.moved) {
        updateSbResetPosBtn();
      }
      previewFrame?.contentWindow?.postMessage({ type: 'sb-highlight-element', element: elKey }, '*');
    }

    $('btn-sb-interactive')?.addEventListener('click', (e) => {
      sbInteractiveEdit = !sbInteractiveEdit;
      e.currentTarget.classList.toggle('active-chip', sbInteractiveEdit);
      $('preview-wrap')?.classList.toggle('is-interactive', sbInteractiveEdit);
      if (!sbInteractiveEdit) {
        sbSelectedEl = '';
        $('sb-sel-label').textContent = 'Click-to-Edit paused (click 🎯 to re-enable)';
        $('sb-sel-actions').innerHTML = '';
        $('btn-sb-clear-sel').style.display = 'none';
      } else {
        $('sb-sel-label').textContent = '🎯 Click or drag any element above to edit & position';
      }
      previewFrame?.contentWindow?.postMessage({ type: 'sb-interactive-config', interactive: sbInteractiveEdit, drag: sbDragEnabled, mirror: sbMirrorDrag }, '*');
    });
    $('btn-sb-drag')?.addEventListener('click', (e) => {
      sbDragEnabled = !sbDragEnabled;
      e.currentTarget.classList.toggle('active-chip', sbDragEnabled);
      previewFrame?.contentWindow?.postMessage({ type: 'sb-interactive-config', interactive: sbInteractiveEdit, drag: sbDragEnabled, mirror: sbMirrorDrag }, '*');
      toast(sbDragEnabled ? '✋ Direct scorebar drag enabled' : 'Direct scorebar drag locked');
    });
    $('btn-sb-mirror')?.addEventListener('click', (e) => {
      sbMirrorDrag = !sbMirrorDrag;
      e.currentTarget.classList.toggle('active-chip', sbMirrorDrag);
      previewFrame?.contentWindow?.postMessage({ type: 'sb-interactive-config', interactive: sbInteractiveEdit, drag: sbDragEnabled, mirror: sbMirrorDrag }, '*');
      toast(sbMirrorDrag ? '🪞 Mirror drag ON (P1 ⇄ P2 symmetrical)' : 'Mirror drag OFF (independent P1 / P2)');
    });
    $('btn-sb-reset-pos')?.addEventListener('click', () => {
      commitState({
        layoutPos: { ...DEFAULT_LAYOUT_POS },
        tweaks: { wingSpread: 0 },
        eventBar: { offsetX: 0, offsetY: 0, width: 0 },
        commentators: { offsetX: 0, offsetY: 0, width: 0 }
      }, true);
      updateSbResetPosBtn();
      toast('↺ All Scorebar positions & custom element widths reset');
    });
    $('btn-sb-clear-sel')?.addEventListener('click', () => {
      sbSelectedEl = '';
      $('sb-sel-label').textContent = '🎯 Click or drag any element above to edit & position';
      $('sb-sel-actions').innerHTML = '';
      $('btn-sb-clear-sel').style.display = 'none';
      $('sb-sel-jumps')?.querySelectorAll('button').forEach(b => b.classList.remove('active-chip'));
      previewFrame?.contentWindow?.postMessage({ type: 'sb-highlight-element', element: '' }, '*');
    });
    $('sb-sel-jumps')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-sb-jump]');
      if (!btn) return;
      openScorebarInspectorForElement(btn.dataset.sbJump, '', { fromJump: true });
    });

    window.addEventListener('message', (ev) => {
      const msg = ev.data;
      if (!msg || typeof msg !== 'object') return;
      if (msg.type === 'vs-select-element' && msg.element) {
        openVsInspectorForElement(msg.element, msg.label);
      } else if (msg.type === 'vs-drag-patch' && msg.patch) {
        commitState({ vs: msg.patch }, Boolean(msg.commit));
      } else if (msg.type === 'vs-mu-art-patch' && msg.key && msg.pos) {
        selectedMuCharKey = msg.key;
        if ($('vs-sel-label') && msg.label) {
          $('vs-sel-label').textContent = `🎯 Framing ${msg.label} — Y:${msg.pos.y >= 0 ? '+' : ''}${msg.pos.y}px · X:${msg.pos.x >= 0 ? '+' : ''}${msg.pos.x}px · ${msg.pos.scale}%`;
        }
        commitState({ vs: { matchupArtPos: { [msg.key]: msg.pos } } }, Boolean(msg.commit));
      } else if (msg.type === 'vs-mu-select' && msg.key) {
        selectedMuCharKey = msg.key;
        $('vs-insp-tabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.vspane === 'matchups'));
        document.querySelectorAll('.vs-insp-pane').forEach(p => p.classList.toggle('active', p.id === 'vspane-matchups'));
        if ($('vs-sel-label') && msg.label) $('vs-sel-label').textContent = `🎯 Matchups 2×2 — ${msg.label}`;
        renderMatchupFramingUI({ ...DEFAULT_VS, ...(state.vs || {}) });
      } else if (msg.type === 'sb-select-element' && msg.element) {
        openScorebarInspectorForElement(msg.element, msg.label, { moved: Boolean(msg.moved) });
      } else if (msg.type === 'sb-drag-patch' && msg.target && msg.patch) {
        if (msg.target === 'layoutPos') commitState({ layoutPos: msg.patch }, Boolean(msg.commit));
        else if (msg.target === 'tweaks') commitState({ tweaks: msg.patch }, Boolean(msg.commit));
        else if (msg.target === 'eventBar') commitState({ eventBar: msg.patch }, Boolean(msg.commit));
        else if (msg.target === 'commentators') commitState({ commentators: msg.patch }, Boolean(msg.commit));
      }
    });

    $('btn-vs-interactive').addEventListener('click', (e) => {
      vsInteractiveEdit = !vsInteractiveEdit;
      e.currentTarget.classList.toggle('active-chip', vsInteractiveEdit);
      if (!vsInteractiveEdit) {
        vsSelectedEl = '';
        $('vs-sel-label').textContent = 'Click-to-Edit paused (click 🎯 to re-enable)';
        $('btn-vs-clear-sel').style.display = 'none';
      } else {
        $('vs-sel-label').textContent = '🎯 Click any element above to inspect & edit';
      }
      vsPreviewFrame?.contentWindow?.postMessage({ type: 'vs-interactive-config', interactive: vsInteractiveEdit, drag: vsDragEnabled }, '*');
    });
    $('btn-vs-drag').addEventListener('click', (e) => {
      vsDragEnabled = !vsDragEnabled;
      e.currentTarget.classList.toggle('active-chip', vsDragEnabled);
      vsPreviewFrame?.contentWindow?.postMessage({ type: 'vs-interactive-config', interactive: vsInteractiveEdit, drag: vsDragEnabled }, '*');
      toast(vsDragEnabled ? '✋ Direct canvas drag enabled' : 'Direct canvas drag locked');
    });
    $('btn-vs-clear-sel').addEventListener('click', () => {
      vsSelectedEl = '';
      $('vs-sel-label').textContent = '🎯 Click any element above to inspect & edit';
      $('btn-vs-clear-sel').style.display = 'none';
      $('vs-sel-jumps')?.querySelectorAll('button').forEach(b => b.classList.remove('active-chip'));
      vsPreviewFrame?.contentWindow?.postMessage({ type: 'vs-highlight-element', element: '' }, '*');
    });
    $('vs-sel-jumps').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-vs-jump]');
      if (!btn) return;
      openVsInspectorForElement(btn.dataset.vsJump);
    });
    $('vs-insp-tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-vspane]');
      if (!btn) return;
      $('vs-insp-tabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      document.querySelectorAll('.vs-insp-pane').forEach(p => p.classList.toggle('active', p.id === `vspane-${btn.dataset.vspane}`));
    });
    $('btn-vs-reset-all').addEventListener('click', () => {
      if (state.vs?.viewMode === 'matchup-2x2') {
        commitState({
          vs: {
            viewMode: 'matchup-2x2',
            matchupBoardPreset: 'opening',
            matchupCustomSlots: ['wsf1', 'wsf2', 'lr1_1', 'lr1_2'],
            matchupCardBg: '',
            matchupCardBorder: '',
            matchupWinColor: '',
            matchupLosColor: '',
            matchupVsBadgeBg: '',
            matchupCardRadius: -1,
            matchupShellOpacity: 72,
            matchupShowScore: true,
            matchupShowSeeds: true,
            matchupShowHandles: true,
            matchupGlobalY: 0,
            matchupGlobalX: 0,
            matchupGlobalScale: 100,
            matchupArtPos: null
          },
          top8: { manualOverrides: {} }
        }, true);
        toast('↺ Matchups 2×2 reset to defaults');
        return;
      }
      const curDesign = state.vs?.design || 'arcade-pop';
      const curGame = state.vs?.game || 'tekken8';
      const curPack = state.vs?.pack || 'full';
      const curLogo = state.vs?.logoUrl || '';
      commitState({ vs: { ...structuredClone(DEFAULT_VS), design: curDesign, game: curGame, pack: curPack, logoUrl: curLogo } }, true);
      toast('↺ VS Splash reset to active design defaults');
    });

    // VS Segmented controls
    const bindVsSeg = (id, key) => {
      $(id).addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-val]');
        if (!btn) return;
        const val = btn.dataset.val;
        const patch = { [key]: val };
        if (key === 'source' && val === 'next' && !state.vs?.nextMatch) {
          const cand = findNextQueueCandidate();
          if (cand) patch.nextMatch = enrichSetForVs(cand);
        }
        if (key === 'flagMode') patch.showFlags = val !== 'none';
        commitState({ vs: patch }, true);
      });
    };
    // Populate custom 4-slot selects for Matchups 2x2
    const muSlotOpts = (window.FGC_TOP8_ENGINE?.TOP8_SLOT_DEFS || []).map(d => `<option value="${d.id}">${d.label} (${d.short})</option>`).join('');
    for (let si = 0; si < 4; si++) {
      const sel = $(`vs-mu-slot-${si}`);
      if (sel) {
        sel.innerHTML = muSlotOpts;
        sel.addEventListener('change', () => {
          const next = [0, 1, 2, 3].map(k => $(`vs-mu-slot-${k}`)?.value || 'wsf1');
          commitState({ vs: { matchupCustomSlots: next, matchupBoardPreset: 'custom' } }, true);
        });
      }
    }
    bindVsSeg('seg-vs-viewMode', 'viewMode');
    $('seg-vs-viewMode')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-val]');
      if (!btn) return;
      if (btn.dataset.val === 'matchup-2x2') {
        $('vs-insp-tabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.vspane === 'matchups'));
        document.querySelectorAll('.vs-insp-pane').forEach(p => p.classList.toggle('active', p.id === 'vspane-matchups'));
      }
    });
    $('btn-copy-vs-mode')?.addEventListener('click', () => {
      const base = ($('vs-url-text')?.textContent || 'http://localhost:8787/vs.html').replace(/\/vs\.html$/, '/vs');
      const vm = state.vs?.viewMode === 'matchup-2x2' ? 'matchup-2x2' : '1v1';
      const url = `${base}?mode=${vm}`;
      navigator.clipboard?.writeText(url).then(() => toast(`📋 Copied ${url}`)).catch(() => toast(url));
    });
    $('vs-matchupBoardPreset')?.addEventListener('change', (e) => commitState({ vs: { matchupBoardPreset: e.target.value } }, true));
    $('vs-mu-cardBg')?.addEventListener('input', (e) => commitState({ vs: { matchupCardBg: e.target.value } }));
    $('vs-mu-cardBorder')?.addEventListener('input', (e) => commitState({ vs: { matchupCardBorder: e.target.value } }));
    $('vs-mu-winCol')?.addEventListener('input', (e) => commitState({ vs: { matchupWinColor: e.target.value } }));
    $('vs-mu-losCol')?.addEventListener('input', (e) => commitState({ vs: { matchupLosColor: e.target.value } }));
    $('vs-mu-vsBg')?.addEventListener('input', (e) => commitState({ vs: { matchupVsBadgeBg: e.target.value } }));
    $('btn-vs-mu-auto-colors')?.addEventListener('click', () => {
      commitState({ vs: { matchupCardBg: '', matchupCardBorder: '', matchupWinColor: '', matchupLosColor: '', matchupVsBadgeBg: '', matchupCardRadius: -1, matchupShellOpacity: 72 } }, true);
      toast('↺ Matchups 2×2 synced to active VS Splash Design colors');
    });
    $('rng-vs-mu-radius')?.addEventListener('input', (e) => commitState({ vs: { matchupCardRadius: Number(e.target.value) } }));
    $('rng-vs-mu-shellOp')?.addEventListener('input', (e) => commitState({ vs: { matchupShellOpacity: Number(e.target.value) } }));
    $('rng-vs-mu-allY')?.addEventListener('input', (e) => commitState({ vs: { matchupGlobalY: Number(e.target.value) } }));
    $('rng-vs-mu-allX')?.addEventListener('input', (e) => commitState({ vs: { matchupGlobalX: Number(e.target.value) } }));
    $('rng-vs-mu-allScale')?.addEventListener('input', (e) => commitState({ vs: { matchupGlobalScale: Number(e.target.value) } }));
    $('btn-vs-mu-reset-global')?.addEventListener('click', () => {
      commitState({ vs: { matchupGlobalY: 0, matchupGlobalX: 0, matchupGlobalScale: 100 } }, true);
      toast('↺ Global Matchups 2×2 framing reset');
    });
    const getActiveRosterNames = () => {
      if (Array.isArray(activeRoster?.characters) && activeRoster.characters.length) {
        const valid = activeRoster.characters.filter(c => typeof c === 'string' || c.cached || c.hasAsset !== false);
        const src = valid.length ? valid : activeRoster.characters;
        return src.map(c => (typeof c === 'string' ? c : c.name)).filter(Boolean);
      }
      const sel = $('sel-vs-mu-char');
      if (sel) return [...sel.options].map(o => o.value).filter(Boolean);
      return [];
    };
    const parseMuKey = (key) => {
      const k = key || selectedMuCharKey || 'wsf1_p1';
      const side = k.endsWith('_p2') ? 'p2' : 'p1';
      const sid = k.slice(0, -3) || 'wsf1';
      return { sid, side, key: `${sid}_${side}` };
    };
    const patchSelectedMuPlayer = (fieldPatch, immediate = true) => {
      const { sid, side } = parseMuKey(selectedMuCharKey);
      const nextOv = structuredClone(state.top8?.manualOverrides || {});
      if (!nextOv[sid] || typeof nextOv[sid] !== 'object') nextOv[sid] = {};
      if (!nextOv[sid][side] || typeof nextOv[sid][side] !== 'object') nextOv[sid][side] = {};
      Object.assign(nextOv[sid][side], fieldPatch);
      commitState({ top8: { manualOverrides: nextOv } }, immediate);
    };
    const randomizeMatchupChars = ({ onlyMissingOrInvalid = false, silent = false } = {}) => {
      const names = getActiveRosterNames();
      if (!names.length) return 0;
      const normKey = (s) => normText(s).replace(/[^a-z0-9]+/g, ' ').trim();
      const validSet = new Set(names.map(normKey));
      const isValid = (ch) => {
        const q = normKey(ch);
        if (!q) return false;
        if (validSet.has(q)) return true;
        for (const vn of validSet) {
          if (vn.includes(q) || q.includes(vn)) return true;
        }
        return false;
      };
      const slotIds = getActiveMatchupBoardSlots({ ...DEFAULT_VS, ...(state.vs || {}) });
      const resolved = window.FGC_TOP8_ENGINE?.resolveAllBracketSlots ? window.FGC_TOP8_ENGINE.resolveAllBracketSlots(state.top8 || {}) : {};
      const nextOv = structuredClone(state.top8?.manualOverrides || {});
      const used = new Set();
      const pool = [...names];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      if (onlyMissingOrInvalid) {
        for (const sid of slotIds) {
          const sl = resolved[sid] || {};
          for (const side of ['p1', 'p2']) {
            const ch = sl[side]?.character || '';
            if (ch && isValid(ch)) used.add(normKey(ch));
          }
        }
      }
      let cursor = 0;
      const pickNext = () => {
        for (let t = 0; t < pool.length; t++) {
          const cand = pool[(cursor++) % pool.length];
          if (!used.has(normKey(cand))) {
            used.add(normKey(cand));
            return cand;
          }
        }
        return pool[(cursor++) % pool.length];
      };
      let changed = 0;
      for (const sid of slotIds) {
        const sl = resolved[sid] || {};
        for (const side of ['p1', 'p2']) {
          const curChar = sl[side]?.character || '';
          if (onlyMissingOrInvalid && curChar && isValid(curChar)) continue;
          if (!nextOv[sid] || typeof nextOv[sid] !== 'object') nextOv[sid] = {};
          if (!nextOv[sid][side] || typeof nextOv[sid][side] !== 'object') nextOv[sid][side] = {};
          nextOv[sid][side].character = pickNext();
          changed++;
        }
      }
      if (changed > 0) {
        commitState({ top8: { manualOverrides: nextOv } }, true);
        if (!silent) toast(`🎲 Assigned ${changed} random ${activeRoster?.gameName || ''} characters!`);
      }
      return changed;
    };
    $('vs-mu-game')?.addEventListener('change', async (e) => {
      const g = e.target.value;
      if ($('vs-game-select')) $('vs-game-select').value = g;
      const p = syncPackSelectForGame(g, 'full');
      failedRosterKeys.delete(`${g}/${p}`);
      commitState({ vs: { game: g, pack: p } }, true);
      await loadActiveRoster(g, p);
      randomizeMatchupChars({ onlyMissingOrInvalid: true, silent: false });
    });
    $('btn-vs-mu-rand-all')?.addEventListener('click', () => randomizeMatchupChars({ onlyMissingOrInvalid: false }));
    $('sel-vs-mu-char')?.addEventListener('change', (e) => patchSelectedMuPlayer({ character: e.target.value }, true));
    $('btn-vs-mu-rand-one')?.addEventListener('click', () => {
      const names = getActiveRosterNames();
      if (!names.length) return;
      const curVal = $('sel-vs-mu-char')?.value || '';
      const pool = names.length > 1 ? names.filter(n => n !== curVal) : names;
      const picked = pool[Math.floor(Math.random() * pool.length)];
      patchSelectedMuPlayer({ character: picked }, true);
    });
    $('inp-vs-mu-name')?.addEventListener('input', (e) => patchSelectedMuPlayer({ name: e.target.value || 'TBD' }, false));
    $('inp-vs-mu-score')?.addEventListener('input', (e) => patchSelectedMuPlayer({ score: Math.max(0, Number(e.target.value || 0)) }, false));
    $('vs-mu-char-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-mu-pick]');
      if (!btn) return;
      selectedMuCharKey = btn.dataset.muPick;
      renderMatchupFramingUI({ ...DEFAULT_VS, ...(state.vs || {}) });
      vsPreviewFrame?.contentWindow?.postMessage({ type: 'vs-mu-highlight', key: selectedMuCharKey }, '*');
    });
    const patchSelectedMuPos = (delta, immediate = false) => {
      const key = selectedMuCharKey || 'wsf1_p1';
      const side = key.endsWith('_p2') ? 'p2' : 'p1';
      const cur = (state.vs?.matchupArtPos && state.vs.matchupArtPos[key]) || {};
      const nextPos = {
        x: Number(cur.x || 0),
        y: Number(cur.y || 0),
        scale: Number(cur.scale ?? 100),
        flip: (cur.flip !== undefined && cur.flip !== null) ? Boolean(cur.flip) : (side === 'p2'),
        ...delta
      };
      commitState({ vs: { matchupArtPos: { [key]: nextPos } } }, immediate);
    };
    $('rng-vs-mu-charY')?.addEventListener('input', (e) => patchSelectedMuPos({ y: Number(e.target.value) }, false));
    $('rng-vs-mu-charX')?.addEventListener('input', (e) => patchSelectedMuPos({ x: Number(e.target.value) }, false));
    $('rng-vs-mu-charScale')?.addEventListener('input', (e) => patchSelectedMuPos({ scale: Number(e.target.value) }, false));
    $('btn-vs-mu-flip')?.addEventListener('click', () => {
      const key = selectedMuCharKey || 'wsf1_p1';
      const side = key.endsWith('_p2') ? 'p2' : 'p1';
      const cur = (state.vs?.matchupArtPos && state.vs.matchupArtPos[key]) || {};
      const curFlip = (cur.flip !== undefined && cur.flip !== null) ? Boolean(cur.flip) : (side === 'p2');
      patchSelectedMuPos({ flip: !curFlip }, true);
    });
    $('btn-vs-mu-reset-one')?.addEventListener('click', () => {
      const key = selectedMuCharKey || 'wsf1_p1';
      const side = key.endsWith('_p2') ? 'p2' : 'p1';
      commitState({ vs: { matchupArtPos: { [key]: { x: 0, y: 0, scale: 100, flip: side === 'p2' } } } }, true);
      toast('↺ Character framing reset');
    });
    $('btn-vs-mu-reset-all')?.addEventListener('click', () => {
      commitState({ vs: { matchupGlobalY: 0, matchupGlobalX: 0, matchupGlobalScale: 100, matchupArtPos: null } }, true);
      toast('↺ All 8 Matchups 2×2 character positions reset');
    });
    $('chk-vs-mu-score')?.addEventListener('change', (e) => commitState({ vs: { matchupShowScore: e.target.checked } }, true));
    $('chk-vs-mu-seeds')?.addEventListener('change', (e) => commitState({ vs: { matchupShowSeeds: e.target.checked } }, true));
    $('chk-vs-mu-handles')?.addEventListener('change', (e) => commitState({ vs: { matchupShowHandles: e.target.checked } }, true));
    $('btn-vs-mu-pull')?.addEventListener('click', () => pullTournamentBracket(undefined, false));
    $('btn-vs-mu-demo')?.addEventListener('click', () => pullTournamentBracket('demo', false));
    $('btn-vs-mu-edit-slots')?.addEventListener('click', () => setActiveWorkspace('brackets'));
    bindVsSeg('seg-vs-source', 'source');
    bindVsSeg('seg-vs-avatar', 'avatarMode');
    bindVsSeg('seg-vs-bg', 'bgMode');
    bindVsSeg('seg-vs-pat', 'pattern');
    bindVsSeg('seg-vs-patDir', 'patternDir');
    bindVsSeg('seg-vs-frameGlow', 'frameGlow');
    bindVsSeg('seg-vs-bandGlow', 'bandGlow');
    bindVsSeg('seg-vs-bandAnim', 'bandAnim');
    bindVsSeg('seg-vs-divAnim', 'dividerAnim');
    bindVsSeg('seg-vs-divGlow', 'dividerGlow');
    bindVsSeg('seg-vs-embAnim', 'emblemAnim');
    bindVsSeg('seg-vs-embGlow', 'emblemGlow');
    bindVsSeg('seg-vs-plateSurface', 'plateSurface');
    bindVsSeg('seg-vs-plateGlow', 'plateGlow');
    bindVsSeg('seg-vs-plateAlign', 'plateAlign');
    bindVsSeg('seg-vs-plateScorePos', 'plateScorePos');
    bindVsSeg('seg-vs-plateAvPos', 'plateAvatarPos');
    bindVsSeg('seg-vs-plateFlagPos', 'plateFlagPos');
    bindVsSeg('seg-vs-plateFlagBg', 'plateFlagBg');
    bindVsSeg('seg-vs-pfbSrc', 'plateFlagBgSource');
    bindVsSeg('seg-vs-pfbAnim', 'plateFlagBgAnim');
    bindVsSeg('seg-vs-hdrSurface', 'headerSurface');
    bindVsSeg('seg-vs-hdrGlow', 'headerGlow');
    bindVsSeg('seg-vs-hdrAlign', 'headerAlign');
    bindVsSeg('seg-vs-hdrOrder', 'headerOrder');
    bindVsSeg('seg-vs-hdrFmtPos', 'headerFormatPos');
    bindVsSeg('seg-vs-flagMode', 'flagMode');
    bindVsSeg('seg-vs-charIdle', 'charIdleAnim');

    // 42 VS Designs search, category filters & cards
    $('vs-design-search').addEventListener('input', (e) => {
      vsDesignSearch = e.target.value;
      renderVsDesignCards();
    });
    $('vs-design-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-vcat]');
      if (!btn) return;
      vsDesignCat = btn.dataset.vcat;
      vsDesignSearch = '';
      $('vs-design-search').value = '';
      $('vs-design-filters').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      renderVsDesignCards();
    });
    function buildBuiltInVsResetPatch(designId) {
      const cur = state.vs || {};
      const fresh = structuredClone(DEFAULT_VS);
      return {
        _silentAudio: true,
        vs: {
          ...fresh,
          design: designId,
          visible: cur.visible !== false,
          viewMode: cur.viewMode === 'matchup-2x2' ? 'matchup-2x2' : '1v1',
          source: cur.source || fresh.source,
          game: cur.game || fresh.game,
          pack: cur.pack || fresh.pack,
          matchupBoardPreset: cur.matchupBoardPreset || fresh.matchupBoardPreset,
          matchupCustomSlots: Array.isArray(cur.matchupCustomSlots) ? cur.matchupCustomSlots : fresh.matchupCustomSlots,
          matchupArtPos: null,
          eyebrow: cur.eyebrow !== undefined ? cur.eyebrow : fresh.eyebrow,
          subtitle: cur.subtitle !== undefined ? cur.subtitle : fresh.subtitle,
          logoUrl: cur.logoUrl || '',
          logoSource: cur.logoSource || '',
          logoTournamentSlug: cur.logoTournamentSlug || '',
          autoEventLogo: cur.autoEventLogo !== false,
          customMatch: cur.customMatch ? structuredClone(cur.customMatch) : fresh.customMatch,
          nextMatch: cur.nextMatch !== undefined ? structuredClone(cur.nextMatch) : null,
          introNonce: cur.introNonce || 0
        }
      };
    }

    $('vs-design-grid').addEventListener('click', (e) => {
      const card = e.target.closest('[data-vs-design]');
      if (!card) return;
      const id = card.dataset.vsDesign;
      const d = VS_DESIGNS.find(x => x.id === id);
      const wasSame = state.vs?.design === id;
      // Always restore pristine factory defaults for the selected built-in VS design (never carry over tweaks from previous preset!)
      commitState(buildBuiltInVsResetPatch(id), true);
      toast(wasSame
        ? `↺ Reset to factory defaults: ${d?.name || id}`
        : `⚔️ VS Design loaded (factory defaults): ${d?.name || id}`);
    });

    $('btn-vs-vis').addEventListener('click', () => commitState({ vs: { visible: state.vs?.visible === false } }, true));
    const triggerVsIntro = () => {
      commitState({ vs: { visible: true, introNonce: Date.now() } }, true);
      vsPreviewFrame.contentWindow?.postMessage({ type: 'test-vs-entry' }, '*');
      toast('🎬 VS Splash intro replayed');
    };
    $('btn-vs-replay').addEventListener('click', triggerVsIntro);
    $('btn-vs-test-entry').addEventListener('click', () => {
      vsPreviewFrame.contentWindow?.postMessage({ type: 'test-vs-entry' }, '*');
      toast(`▶ Testing VS entry: ${state.vs?.entryAnim || 'slam-split'}`);
    });
    window._fgcDownloadPng = async function downloadPixelPerfectPng(target, mode, triggerBtn, fallbackFrame, fallbackMsgType) {
      const origTxt = triggerBtn?.textContent || '';
      if (triggerBtn) { triggerBtn.disabled = true; triggerBtn.textContent = '⏳ PNG...'; }
      try {
        if (!isHttp) throw new Error('LOCAL_FILE_MODE');
        toast('📸 Capturing exact 1:1 PNG (matches preview)...');
        // Flush latest unsaved slider state right inside request body!
        const resp = await fetch('/api/export/png', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, mode, state })
        });
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${resp.status}`);
        }
        const blob = await resp.blob();
        const disp = resp.headers.get('Content-Disposition') || '';
        const fnMatch = disp.match(/filename="([^"]+)"/i);
        const filename = fnMatch ? fnMatch[1] : `${target}-export.png`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        toast(`✅ Downloaded 1:1 PNG: ${filename}`);
      } catch (err) {
        if (fallbackFrame?.contentWindow && fallbackMsgType) {
          fallbackFrame.contentWindow.postMessage({ type: fallbackMsgType }, '*');
          toast('⬇ Exporting PNG via browser canvas fallback...');
        } else {
          toast(`⚠️ PNG Export failed: ${err.message}`);
        }
      } finally {
        if (triggerBtn) { triggerBtn.disabled = false; triggerBtn.textContent = origTxt; }
      }
    };
    $('btn-vs-export-png').addEventListener('click', () => {
      window._fgcDownloadPng('vs', state.vs?.viewMode || '1v1', $('btn-vs-export-png'), vsPreviewFrame, 'export-vs-png');
    });

    $('btn-vs-sync-next').addEventListener('click', () => {
      const cand = findNextQueueCandidate();
      if (!cand) return toast('Connect a Start.gg / Challonge / Demo tournament first');
      commitState({ vs: { source: 'next', nextMatch: enrichSetForVs(cand) } }, true);
      toast(`⏭ Up Next synced: ${cand.p1.name} vs ${cand.p2.name}`);
    });
    $('btn-vs-promote-next').addEventListener('click', () => {
      const nm = state.vs?.nextMatch;
      if (!nm?.p1?.name) return toast('No Up Next match queued yet');
      const setObj = nm.setId ? findSetById(nm.setId) : null;
      if (setObj) loadSetToScorebar(setObj);
      else commitState({ round: nm.roundText || state.round, p1: { ...nm.p1, score: 0 }, p2: { ...nm.p2, score: 0 } }, true);
    });

    // Custom VS match inputs
    $('vs-c-round').addEventListener('input', (e) => commitState({ vs: { customMatch: { round: e.target.value } } }));
    $('vs-c-p1-name').addEventListener('input', (e) => commitState({ vs: { customMatch: { p1: { name: e.target.value } } } }));
    $('vs-c-p2-name').addEventListener('input', (e) => commitState({ vs: { customMatch: { p2: { name: e.target.value } } } }));
    $('vs-c-p1-char').addEventListener('change', (e) => commitState({ vs: { customMatch: { p1: { character: e.target.value } } } }, true));
    $('vs-c-p2-char').addEventListener('change', (e) => commitState({ vs: { customMatch: { p2: { character: e.target.value } } } }, true));

    // Branding, text & toggles
    $('vs-eyebrow').addEventListener('input', (e) => commitState({ vs: { eyebrow: e.target.value } }));
    $('vs-subtitle').addEventListener('input', (e) => commitState({ vs: { subtitle: e.target.value } }));
    $('vs-emblemText').addEventListener('input', (e) => commitState({ vs: { emblemText: e.target.value } }));
    $('chk-vs-h2h').addEventListener('change', (e) => commitState({ vs: { showH2H: e.target.checked } }, true));
    $('chk-vs-sponsor').addEventListener('change', (e) => commitState({ vs: { showSponsor: e.target.checked } }, true));
    $('chk-vs-bracket').addEventListener('change', (e) => commitState({ vs: { showBracket: e.target.checked } }, true));
    $('chk-vs-seed')?.addEventListener('change', (e) => commitState({ vs: { showSeed: e.target.checked } }, true));
    $('chk-vs-charname').addEventListener('change', (e) => commitState({ vs: { showCharName: e.target.checked } }, true));
    $('chk-vs-score').addEventListener('change', (e) => commitState({ vs: { showScore: e.target.checked } }, true));
    $('chk-vs-logo').addEventListener('change', (e) => commitState({ vs: { showLogo: e.target.checked } }, true));
    $('chk-vs-eyebrow').addEventListener('change', (e) => commitState({ vs: { showEyebrow: e.target.checked } }, true));
    $('chk-vs-bandDual').addEventListener('change', (e) => commitState({ vs: { bandDualSideColor: e.target.checked } }, true));

    // 4-Side Stylized Edge Band Toggles & Presets
    $('btn-vs-band-top').addEventListener('click', () => commitState({ vs: { bandTop: !state.vs?.bandTop } }, true));
    $('btn-vs-band-bottom').addEventListener('click', () => commitState({ vs: { bandBottom: !state.vs?.bandBottom } }, true));
    $('btn-vs-band-left').addEventListener('click', () => commitState({ vs: { bandLeft: !state.vs?.bandLeft } }, true));
    $('btn-vs-band-right').addEventListener('click', () => commitState({ vs: { bandRight: !state.vs?.bandRight } }, true));
    $('btn-vs-bands-tb').addEventListener('click', () => commitState({ vs: { bandTop: true, bandBottom: true, bandLeft: false, bandRight: false } }, true));
    $('btn-vs-bands-lr').addEventListener('click', () => commitState({ vs: { bandTop: false, bandBottom: false, bandLeft: true, bandRight: true } }, true));
    $('btn-vs-bands-all').addEventListener('click', () => commitState({ vs: { bandTop: true, bandBottom: true, bandLeft: true, bandRight: true } }, true));
    $('btn-vs-bands-off').addEventListener('click', () => commitState({ vs: { bandTop: false, bandBottom: false, bandLeft: false, bandRight: false } }, true));

    $('chk-vs-auto-logo').addEventListener('change', (e) => {
      const enabled = e.target.checked;
      commitState({ vs: { autoEventLogo: enabled } }, true);
      if (enabled) syncEventLogoFromTournament(true);
      toast(enabled ? '🏷️ Auto-load Event Logo enabled' : 'Auto-load Event Logo paused');
    });
    $('btn-vs-sync-logo').addEventListener('click', () => syncEventLogoFromTournament(false));
    $('btn-vs-logo-upload').addEventListener('click', () => $('file-vs-logo').click());
    $('btn-vs-logo-clear').addEventListener('click', () => {
      commitState({ vs: { logoUrl: '', logoSource: 'manual' } }, true);
      toast('Event logo removed');
    });
    $('file-vs-logo').addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const url = await uploadLocalImage(file, 'logo', 'tournament');
        commitState({ vs: { logoUrl: url, showLogo: true, logoSource: 'manual' } }, true);
        toast('🏷️ Custom tournament logo uploaded');
      } catch (err) {
        toast(`⚠️ ${err.message}`);
      }
      e.target.value = '';
    });

    // Colors, Selects & Millimeter Sliders
    $('vs-bg1').addEventListener('input', (e) => commitState({ vs: { bgMode: 'custom', bgColor1: e.target.value } }));
    $('vs-bg2').addEventListener('input', (e) => commitState({ vs: { bgMode: 'custom', bgColor2: e.target.value } }));
    $('vs-p1col').addEventListener('input', (e) => commitState({ vs: { bgMode: 'custom', p1Color: e.target.value } }));
    $('vs-p2col').addEventListener('input', (e) => commitState({ vs: { bgMode: 'custom', p2Color: e.target.value } }));
    $('vs-accentcol').addEventListener('input', (e) => commitState({ vs: { accentColor: e.target.value } }));
    $('btn-vs-accent-auto').addEventListener('click', () => commitState({ vs: { accentColor: '' } }, true));

    // Frame & Edge Band Colors + Reset
    $('vs-frameColor').addEventListener('input', (e) => commitState({ vs: { frameColor: e.target.value } }));
    $('vs-frameAccent').addEventListener('input', (e) => commitState({ vs: { frameAccent: e.target.value } }));
    $('btn-vs-frameCol-auto').addEventListener('click', () => commitState({ vs: { frameColor: '', frameAccent: '' } }, true));
    $('btn-vs-frame-reset').addEventListener('click', () => commitState({ vs: { frameStyle: 'theme', frameColor: '', frameAccent: '', frameThickness: 0, frameInset: -1, frameOpacity: 100, frameGlow: 'theme' } }, true));
    $('vs-bandColor').addEventListener('input', (e) => commitState({ vs: { bandColor: e.target.value } }));
    $('vs-bandAccent').addEventListener('input', (e) => commitState({ vs: { bandAccent: e.target.value } }));
    $('btn-vs-bandCol-auto').addEventListener('click', () => commitState({ vs: { bandColor: '', bandAccent: '' } }, true));

    // Divider & Emblem Colors + Reset
    $('vs-divColor').addEventListener('input', (e) => commitState({ vs: { dividerColor: e.target.value } }));
    $('vs-divColor2').addEventListener('input', (e) => commitState({ vs: { dividerColor2: e.target.value } }));
    $('btn-vs-divColor-auto').addEventListener('click', () => commitState({ vs: { dividerColor: '', dividerColor2: '' } }, true));
    $('btn-vs-divTilt-auto').addEventListener('click', () => commitState({ vs: { dividerTilt: null } }, true));
    $('vs-embBg').addEventListener('input', (e) => commitState({ vs: { emblemBgColor: e.target.value } }));
    $('vs-embText').addEventListener('input', (e) => commitState({ vs: { emblemTextColor: e.target.value } }));
    $('vs-embStroke').addEventListener('input', (e) => commitState({ vs: { emblemStrokeColor: e.target.value } }));
    $('btn-vs-embCol-auto').addEventListener('click', () => commitState({ vs: { emblemBgColor: '', emblemTextColor: '', emblemStrokeColor: '', emblemGlow: 'theme' } }, true));

    // Plate Colors + Skew Reset
    $('vs-plateBg').addEventListener('input', (e) => commitState({ vs: { plateBgColor: e.target.value } }));
    $('vs-plateBg2').addEventListener('input', (e) => commitState({ vs: { plateBgColor2: e.target.value, plateSurface: state.vs?.plateSurface === 'theme' ? 'gradient' : state.vs?.plateSurface } }));
    $('vs-plateText').addEventListener('input', (e) => commitState({ vs: { plateTextColor: e.target.value } }));
    $('vs-plateSponsor').addEventListener('input', (e) => commitState({ vs: { plateSponsorColor: e.target.value } }));
    $('vs-plateBorder').addEventListener('input', (e) => commitState({ vs: { plateBorderColor: e.target.value } }));
    $('vs-plateScoreBg').addEventListener('input', (e) => commitState({ vs: { plateScoreBg: e.target.value } }));
    $('vs-plateScoreText').addEventListener('input', (e) => commitState({ vs: { plateScoreText: e.target.value } }));
    $('btn-vs-plateCol-auto').addEventListener('click', () => commitState({ vs: { plateSurface: 'theme', plateBgColor: '', plateBgColor2: '', plateTextColor: '', plateSponsorColor: '', plateBorderColor: '', plateBorderWidth: -1, plateRadius: -1, plateScoreBg: '', plateScoreText: '', plateGlow: 'none' } }, true));
    $('btn-vs-plateSkew-auto').addEventListener('click', () => commitState({ vs: { plateSkew: null } }, true));

    // Header Colors + Reset
    $('vs-hdrBg').addEventListener('input', (e) => commitState({ vs: { headerBgColor: e.target.value } }));
    $('vs-hdrBg2').addEventListener('input', (e) => commitState({ vs: { headerBgColor2: e.target.value, headerSurface: state.vs?.headerSurface === 'theme' ? 'gradient' : state.vs?.headerSurface } }));
    $('vs-hdrText').addEventListener('input', (e) => commitState({ vs: { headerTextColor: e.target.value } }));
    $('vs-hdrEyebrow').addEventListener('input', (e) => commitState({ vs: { headerEyebrowColor: e.target.value } }));
    $('vs-hdrBorder').addEventListener('input', (e) => commitState({ vs: { headerBorderColor: e.target.value } }));
    $('vs-hdrFmtBg').addEventListener('input', (e) => commitState({ vs: { headerFormatBg: e.target.value } }));
    $('vs-hdrFmtTxt').addEventListener('input', (e) => commitState({ vs: { headerFormatText: e.target.value } }));
    $('btn-vs-hdrCol-auto').addEventListener('click', () => commitState({ vs: { headerSurface: 'theme', headerBgColor: '', headerBgColor2: '', headerTextColor: '', headerEyebrowColor: '', headerBorderColor: '', headerBorderWidth: -1, headerRadius: -1, headerFormatBg: '', headerFormatText: '', headerGlow: 'none' } }, true));

    const bindVsSelect = (id, key) => {
      $(id).addEventListener('change', (e) => commitState({ vs: { [key]: e.target.value } }, true));
    };
    bindVsSelect('vs-splitOverride', 'splitOverride');
    bindVsSelect('vs-frameStyle', 'frameStyle');
    bindVsSelect('vs-bandStyle', 'bandStyle');
    bindVsSelect('vs-dividerStyle', 'dividerStyle');
    bindVsSelect('vs-emblemStyle', 'emblemStyle');
    bindVsSelect('vs-plateStyle', 'plateStyle');
    bindVsSelect('vs-plateInfoOrder', 'plateInfoOrder');
    bindVsSelect('vs-plateMetaOrder', 'plateMetaOrder');
    bindVsSelect('vs-pfbBlend', 'plateFlagBgBlend');
    bindVsSelect('vs-fontDisplay', 'fontDisplay');
    bindVsSelect('vs-headerStyle', 'headerStyle');
    bindVsSelect('vs-entryAnim', 'entryAnim');
    bindVsSelect('vs-ambientAnim', 'ambientAnim');
    bindVsSelect('vs-logoPos', 'logoPos');

    const bindVsRange = (id, key) => {
      $(id).addEventListener('input', (e) => commitState({ vs: { [key]: Number(e.target.value) } }));
    };
    bindVsRange('rng-vs-patSpeed', 'patternSpeed');
    bindVsRange('rng-vs-patOp', 'patternOpacity');
    bindVsRange('rng-vs-patScale', 'patternScale');
    bindVsRange('rng-vs-frameThick', 'frameThickness');
    bindVsRange('rng-vs-frameInset', 'frameInset');
    bindVsRange('rng-vs-frameOp', 'frameOpacity');
    bindVsRange('rng-vs-bandThick', 'bandThickness');
    bindVsRange('rng-vs-bandOp', 'bandOpacity');
    bindVsRange('rng-vs-divSpeed', 'dividerSpeed');
    bindVsRange('rng-vs-divW', 'dividerWidth');
    bindVsRange('rng-vs-divTilt', 'dividerTilt');
    bindVsRange('rng-vs-divOp', 'dividerOpacity');
    bindVsRange('rng-vs-divX', 'dividerOffsetX');
    bindVsRange('rng-vs-embScale', 'emblemScale');
    bindVsRange('rng-vs-embRot', 'emblemRotate');
    bindVsRange('rng-vs-embX', 'emblemOffsetX');
    bindVsRange('rng-vs-embY', 'emblemOffsetY');
    bindVsRange('rng-vs-plateBot', 'plateBottom');
    bindVsRange('rng-vs-plateEdgeX', 'plateEdgeX');
    bindVsRange('rng-vs-plateW', 'plateWidth');
    bindVsRange('rng-vs-plateMinH', 'plateMinHeight');
    bindVsRange('rng-vs-plateScale', 'plateScale');
    bindVsRange('rng-vs-plateOp', 'plateOpacity');
    bindVsRange('rng-vs-plateBw', 'plateBorderWidth');
    bindVsRange('rng-vs-plateRad', 'plateRadius');
    bindVsRange('rng-vs-plateSkew', 'plateSkew');
    bindVsRange('rng-vs-plateShadow', 'plateShadow');
    bindVsRange('rng-vs-nameScale', 'nameScale');
    bindVsRange('rng-vs-sponsorScale', 'sponsorScale');
    bindVsRange('rng-vs-charNameScale', 'charNameScale');
    bindVsRange('rng-vs-scoreScale', 'scoreScale');
    bindVsRange('rng-vs-pfbOp', 'plateFlagBgOpacity');
    bindVsRange('rng-vs-pfbZoom', 'plateFlagBgZoom');
    bindVsRange('rng-vs-pfbStart', 'plateFlagBgFadeStart');
    bindVsRange('rng-vs-pfbEnd', 'plateFlagBgFadeEnd');
    bindVsRange('rng-vs-pfbAngle', 'plateFlagBgAngle');
    bindVsRange('rng-vs-pfbBlur', 'plateFlagBgBlur');
    bindVsRange('rng-vs-flagSize', 'flagSize');
    bindVsRange('rng-vs-wmOp', 'flagWatermarkOpacity');
    bindVsRange('rng-vs-hdrScale', 'headerScale');
    bindVsRange('rng-vs-hdrFont', 'headerFontSize');
    bindVsRange('rng-vs-hdrW', 'headerWidth');
    bindVsRange('rng-vs-hdrOp', 'headerOpacity');
    bindVsRange('rng-vs-hdrY', 'headerOffsetY');
    bindVsRange('rng-vs-hdrX', 'headerOffsetX');
    bindVsRange('rng-vs-hdrBw', 'headerBorderWidth');
    bindVsRange('rng-vs-hdrRad', 'headerRadius');
    bindVsRange('rng-vs-entrySpeed', 'entrySpeed');
    bindVsRange('rng-vs-logoScale', 'logoScale');
    bindVsRange('rng-vs-h2hY', 'h2hOffsetY');
    bindVsRange('rng-vs-charShadow', 'charShadow');
    bindVsRange('rng-vs-p1Zoom', 'p1Zoom');
    bindVsRange('rng-vs-p2Zoom', 'p2Zoom');
    bindVsRange('rng-vs-p1X', 'p1OffsetX');
    bindVsRange('rng-vs-p2X', 'p2OffsetX');
    bindVsRange('rng-vs-p1Y', 'p1OffsetY');
    bindVsRange('rng-vs-p2Y', 'p2OffsetY');

    $('btn-vs-p1-flip').addEventListener('click', () => commitState({ vs: { p1Flip: !state.vs?.p1Flip } }, true));
    $('btn-vs-p2-flip').addEventListener('click', () => commitState({ vs: { p2Flip: state.vs?.p2Flip === false } }, true));
    $('btn-vs-reset-frame').addEventListener('click', () => {
      commitState({ vs: { p1Flip: false, p2Flip: true, p1Zoom: 100, p2Zoom: 100, p1OffsetX: 0, p2OffsetX: 0, p1OffsetY: 0, p2OffsetY: 0, charShadow: 60, charIdleAnim: 'none' } }, true);
      toast('↺ Character framing reset');
    });

    // Multi-Game Asset Manager controls
    $('btn-load-all-games').addEventListener('click', () => loadGamesCatalog(true));
    $('vs-game-select').addEventListener('change', async (e) => {
      const g = e.target.value;
      if ($('vs-mu-game')) $('vs-mu-game').value = g;
      const p = syncPackSelectForGame(g, 'full');
      failedRosterKeys.delete(`${g}/${p}`);
      commitState({ vs: { game: g, pack: p } }, true);
      await loadActiveRoster(g, p);
      if (state.vs?.viewMode === 'matchup-2x2') {
        randomizeMatchupChars({ onlyMissingOrInvalid: true, silent: false });
      }
    });
    $('vs-pack-select').addEventListener('change', async (e) => {
      const g = $('vs-game-select').value || state.vs?.game || 'tekken8';
      const p = e.target.value;
      failedRosterKeys.delete(`${g}/${p}`);
      commitState({ vs: { game: g, pack: p } }, true);
      await loadActiveRoster(g, p);
    });
    $('btn-dl-pack').addEventListener('click', async () => {
      if (!isHttp) return toast('Start the local server first');
      const game = $('vs-game-select').value || 'tekken8';
      const pack = $('vs-pack-select').value || 'full';
      $('btn-dl-pack').disabled = true;
      try {
        const res = await fetch('/api/assets/download-pack', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ game, pack })
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Download error');
        toast(`⬇ Downloading ${game}/${pack} pack for offline use...`);
        pollDownloadStatus();
      } catch (err) {
        $('btn-dl-pack').disabled = false;
        toast(`⚠️ ${err.message}`);
      }
    });
    $('btn-clear-pack').addEventListener('click', async () => {
      const game = $('vs-game-select').value || 'tekken8';
      const pack = $('vs-pack-select').value || 'full';
      if (!window.confirm(tr(`Clear local cached renders for ${game}/${pack}?`))) return;
      await fetch('/api/assets/clear-pack', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game, pack })
      });
      await loadActiveRoster(game, pack);
      toast(`🗑 Cleared cache for ${game}/${pack}`);
    });
    $('btn-upload-custom-char').addEventListener('click', () => $('file-custom-char').click());
    $('file-custom-char').addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const game = $('vs-game-select').value || 'tekken8';
      const charName = window.prompt(tr('Character name for this custom PNG:'), state.p1?.character || '');
      if (!charName || !charName.trim()) { e.target.value = ''; return; }
      try {
        await uploadLocalImage(file, 'character', charName.trim(), game);
        await loadActiveRoster(game, $('vs-pack-select').value || 'full');
        pushPreviewConfig();
        toast(`⬆ Custom render saved for ${charName.trim()}`);
      } catch (err) {
        toast(`⚠️ ${err.message}`);
      }
      e.target.value = '';
    });
    $('vs-roster-search').addEventListener('input', (e) => {
      rosterSearch = e.target.value;
      renderRosterStrip();
    });
    $('vs-roster-strip').addEventListener('click', (e) => {
      const b1 = e.target.closest('[data-char-p1]');
      const b2 = e.target.closest('[data-char-p2]');
      const side = b1 ? 'p1' : (b2 ? 'p2' : '');
      if (!side) return;
      const ch = b1 ? b1.dataset.charP1 : b2.dataset.charP2;
      const src = state.vs?.source || 'current';
      if (src === 'custom') {
        commitState({ vs: { customMatch: { [side]: { character: ch } } } }, true);
      } else if (src === 'next' && state.vs?.nextMatch?.p1) {
        commitState({ vs: { nextMatch: { [side]: { character: ch } } } }, true);
      } else {
        commitState({ [side]: { character: ch } }, true);
      }
      toast(`${side.toUpperCase()} Character → ${ch}`);
      // If render wasn't cached yet, refresh cached badge count once auto-download completes
      const entry = (activeRoster.characters || []).find(c => c.name === ch);
      if (isHttp && entry && !entry.cached) {
        clearTimeout(rosterRefreshTimer);
        rosterRefreshTimer = setTimeout(() => {
          loadActiveRoster(state.vs?.game || 'tekken8', state.vs?.pack || 'full');
        }, 2400);
      }
    });
  }

  /* =========================================================================
     WORKSPACE 4: TOURNAMENT FINAL RESULTS (TOP 8 / TOP 4 / PODIUM) CONTROLLER
     ========================================================================= */
  const RES_LAYOUT_LABELS = {
    'champ-left': 'TOP 8 HERO',
    'podium-top': 'PODIUM + 5',
    'esports-grid': '4x2 GRID',
    'tower-ladder': 'LADDER',
    'top4-quad': 'TOP 4',
    'podium-3': 'TOP 3',
    'editorial-rows': 'EDITORIAL',
    'skew-neon': 'SKEW NEON',
    'crown-graffiti': 'CROWN TIERS',
    'vertical-podium': '4:5 VERTICAL',
    'poster-rows': 'POSTER 4:5',
    'comic-panels': 'COMIC PANELS'
  };

  function getResPlacementsClone() {
    const src = Array.isArray(state.results?.placements) && state.results.placements.length
      ? state.results.placements
      : DEFAULT_RESULTS.placements;
    const out = [];
    const defaultRanks = [1, 2, 3, 4, 5, 5, 7, 7, 9, 9, 9, 9];
    for (let i = 0; i < 12; i++) {
      const p = src[i] || {};
      out.push({
        place: Number(p.place || defaultRanks[i]),
        name: p.name ?? `PLAYER ${i + 1}`,
        sponsor: p.sponsor || '',
        flag: p.flag || '',
        region: p.region || '',
        seed: p.seed !== undefined && p.seed !== null ? String(p.seed) : '',
        character: p.character || '',
        secondaryChars: Array.isArray(p.secondaryChars) ? p.secondaryChars.filter(Boolean) : [],
        avatar: p.avatar || '',
        handle: p.handle || '',
        charZoom: Number(p.charZoom ?? 100),
        charX: Number(p.charX ?? 0),
        charY: Number(p.charY ?? 0),
        charFlip: Boolean(p.charFlip),
        cardShape: p.cardShape || 'global'
      });
    }
    return out;
  }

  function getResolvedTop8Slot(slotId) {
    const top8 = { ...DEFAULT_TOP8, ...(state.top8 || {}) };
    if (window.FGC_TOP8_ENGINE) {
      return window.FGC_TOP8_ENGINE.resolveBracketSlot(slotId, top8);
    }
    return {
      id: slotId,
      roundText: slotId.toUpperCase(),
      state: 'open',
      winnerSide: null,
      locked: false,
      p1: { name: 'TBD', sponsor: '', flag: '', region: '', seed: '', character: '', avatar: '', handle: '', score: 0 },
      p2: { name: 'TBD', sponsor: '', flag: '', region: '', seed: '', character: '', avatar: '', handle: '', score: 0 }
    };
  }

  function patchTop8SlotOverride(slotId, patch, immediate = false) {
    const top8 = { ...DEFAULT_TOP8, ...(state.top8 || {}) };
    const overrides = structuredClone(top8.manualOverrides || {});
    const prev = overrides[slotId] || {};
    const merged = {
      ...prev,
      ...patch,
      locked: patch.locked !== undefined ? Boolean(patch.locked) : (prev.locked !== undefined ? Boolean(prev.locked) : true),
      p1: patch.p1 ? { ...(prev.p1 || {}), ...patch.p1 } : prev.p1,
      p2: patch.p2 ? { ...(prev.p2 || {}), ...patch.p2 } : prev.p2
    };
    overrides[slotId] = merged;
    commitState({ top8: { manualOverrides: overrides } }, immediate);
  }

  function renderResultsDesignCards() {
    const grid = $('res-design-grid');
    if (!grid) return;
    if (resDesignCat === 'my-presets') {
      const cnt = presetsDb.filter(p => (p.scope || 'scorebar') === 'results').length;
      if ($('res-design-count')) $('res-design-count').textContent = cnt;
      if (window.FGC_PRESETS_UI) window.FGC_PRESETS_UI.renderSidebarMyPresets('results', grid);
      return;
    }
    const q = normText(resDesignSearch.trim());
    const list = RESULTS_DESIGNS.filter(d => {
      if (q) return normText(`${d.name} ${d.desc} ${d.cat} ${d.tier} ${d.layout} ${d.cardStyle} ${d.ambient} ${d.defaultAspect || ''}`).includes(q);
      if (resDesignCat === 'vertical') return d.defaultAspect === '4:5';
      return resDesignCat === 'all' || d.cat === resDesignCat;
    });
    if ($('res-design-count')) $('res-design-count').textContent = list.length;
    const curId = state.results?.design || 'res-evo-gold';
    grid.innerHTML = list.map(d => `
      <button type="button" class="vs-design-card ${curId === d.id ? 'active' : ''}" data-res-design="${d.id}">
        <div class="vs-design-swatch" style="background:${d.swatch || d.bg}">${RES_LAYOUT_LABELS[d.layout] || 'TOP 8'}${d.defaultAspect === '4:5' ? ' · 4:5' : ''}</div>
        <div class="vs-design-head">
          <strong>${d.name}</strong>
          <span style="display:flex;gap:4px;align-items:center;flex-shrink:0;">
            <span class="res-layout-badge">${RES_LAYOUT_LABELS[d.layout] || d.layout}</span>
            <span class="vs-tier-badge ${d.tier || 'PRO'}">${d.tier || 'PRO'}</span>
          </span>
        </div>
        <small>${d.desc}</small>
      </button>
    `).join('') || '<div style="padding:16px;text-align:center;color:var(--muted);font-size:11px;">No results designs matched that search.</div>';
  }

  function getResCharOptionsHtml(extraChar) {
    const names = (resRoster.characters && resRoster.characters.length)
      ? ['', ...resRoster.characters.map(c => c.name)]
      : T8_CHARS;
    const list = (extraChar && !names.includes(extraChar)) ? [...names, extraChar] : names;
    return list.map(ch => `<option value="${ch.replace(/"/g, '&quot;')}">${ch || '— None —'}</option>`).join('');
  }

  function buildResultsPlayersRows() {
    const host = $('res-players-editor');
    if (!host) return;
    const rankOpts = [1, 2, 3, 4, 5, 7, 9].map(r => `<option value="${r}">${r === 1 ? '1st' : r === 2 ? '2nd' : r === 3 ? '3rd' : `${r}th`}</option>`).join('');
    const charOpts = getResCharOptionsHtml('');
    const cardShapes = window.FGC_RES_CARDS?.CARD_SHAPES || [];
    const shapeOpts = `<option value="global">— Follow Global Shape —</option>` + cardShapes.map(s => `<option value="${s.id}">${s.label}</option>`).join('');
    const defaultRanks = [1, 2, 3, 4, 5, 5, 7, 7, 9, 9, 9, 9];
    host.innerHTML = Array.from({ length: 12 }, (_, i) => `
      <div class="res-player-wrap ${i >= 8 ? 'is-top12-extra' : ''}">
        <div class="res-player-row" id="res-row-${i}" data-row-idx="${i}" data-rank="${defaultRanks[i]}">
          <select class="res-rank-sel" id="res-p-place-${i}" data-res-field="place" data-idx="${i}" title="Placement Rank">${rankOpts}</select>
          <input type="text" id="res-p-sponsor-${i}" data-res-field="sponsor" data-idx="${i}" placeholder="TAG" maxlength="14" />
          <input type="text" id="res-p-name-${i}" data-res-field="name" data-idx="${i}" placeholder="Player ${i + 1}" maxlength="32" />
          <div class="res-flag-btns">
            <button type="button" class="res-mini-flag-btn" id="res-p-flag-${i}" data-res-flag="${i}" data-slot="flag" title="Pick Country Flag">🌍</button>
            <button type="button" class="res-mini-flag-btn" id="res-p-region-${i}" data-res-flag="${i}" data-slot="region" title="Pick Region / State Flag">🏳</button>
          </div>
          <select id="res-p-char-${i}" data-res-field="character" data-idx="${i}" title="Character Render">${charOpts}</select>
          <input type="text" id="res-p-handle-${i}" data-res-field="handle" data-idx="${i}" placeholder="@handle" maxlength="24" />
          <div class="res-row-actions">
            <button type="button" class="res-frame-btn" id="res-p-framebtn-${i}" data-res-frame-toggle="${i}" title="Framing, Seed, Secondary Chars &amp; Individual Card Shape">🎯</button>
            <button type="button" class="res-av-btn" id="res-p-av-${i}" data-res-av-up="${i}" title="Upload Player Photo / Avatar">📷</button>
            <button type="button" id="res-p-avclr-${i}" data-res-av-clr="${i}" title="Clear Avatar" style="display:none;">✕</button>
            <button type="button" data-res-move="${i}" data-dir="-1" title="Move Up" ${i === 0 ? 'disabled' : ''}>↑</button>
            <button type="button" data-res-move="${i}" data-dir="1" title="Move Down" ${i === 11 ? 'disabled' : ''}>↓</button>
          </div>
        </div>
        <div class="res-frame-drawer" id="res-frame-drawer-${i}">
          <div class="slider-row">
            <div class="slider-head"><span>↕ Vertical Y</span><b id="val-res-py-${i}">0 px</b></div>
            <input type="range" id="res-p-y-${i}" data-res-frame="charY" data-idx="${i}" min="-400" max="400" step="2" value="0" />
          </div>
          <div class="slider-row">
            <div class="slider-head"><span>↔ Horizontal X</span><b id="val-res-px-${i}">0 px</b></div>
            <input type="range" id="res-p-x-${i}" data-res-frame="charX" data-idx="${i}" min="-400" max="400" step="2" value="0" />
          </div>
          <div class="slider-row">
            <div class="slider-head"><span>🔍 Zoom</span><b id="val-res-pz-${i}">100%</b></div>
            <input type="range" id="res-p-zoom-${i}" data-res-frame="charZoom" data-idx="${i}" min="40" max="360" step="2" value="100" />
          </div>
          <div style="display:flex;gap:4px;align-items:center;">
            <button type="button" id="res-p-flip-${i}" data-res-flip="${i}" style="padding:4px 8px;font-size:11px;" title="Mirror character horizontally">⇄ Flip</button>
            <button type="button" data-res-frame-reset="${i}" style="padding:4px 8px;font-size:11px;" title="Reset framing to 0, 0, 100%">↺</button>
          </div>
          <div style="grid-column:1 / -1;display:grid;grid-template-columns:76px 1fr 185px;gap:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.08);">
            <div>
              <label for="res-p-seed-${i}" style="font-size:9.5px;">Seed #</label>
              <input type="text" id="res-p-seed-${i}" data-res-field="seed" data-idx="${i}" placeholder="e.g. 1" maxlength="5" style="height:26px;font-size:11px;padding:2px 6px;" />
            </div>
            <div>
              <label for="res-p-secchars-${i}" style="font-size:9.5px;">Secondary Chars (comma-separated, e.g. Reina, Kazuya)</label>
              <input type="text" id="res-p-secchars-${i}" data-res-secchars="${i}" placeholder="Optional pocket / secondary characters..." maxlength="64" style="height:26px;font-size:11px;padding:2px 6px;" />
            </div>
            <div>
              <label for="res-p-shape-${i}" style="font-size:9.5px;">Card Shape (This Player)</label>
              <select id="res-p-shape-${i}" data-res-field="cardShape" data-idx="${i}" style="height:26px;font-size:11px;padding:2px 6px;">${shapeOpts}</select>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function selectResultsPlayerForFraming(idx, scrollIntoView = false) {
    resSelectedIdx = (idx >= 0 && idx < 12) ? idx : -1;
    for (let i = 0; i < 12; i++) {
      $(`res-frame-drawer-${i}`)?.classList.toggle('open', i === resSelectedIdx);
      $(`res-p-framebtn-${i}`)?.classList.toggle('active-chip', i === resSelectedIdx);
    }
    $('res-frame-jumps')?.querySelectorAll('button[data-res-jump]').forEach(b => {
      b.classList.toggle('active-chip', Number(b.dataset.resJump) === resSelectedIdx);
    });
    const list = getResPlacementsClone();
    const pl = resSelectedIdx >= 0 ? list[resSelectedIdx] : null;
    if ($('res-frame-hint')) {
      $('res-frame-hint').textContent = pl
        ? `🎯 Framing #${pl.place} ${pl.name} · Drag portrait or use sliders (Y:${pl.charY}px · X:${pl.charX}px · ${pl.charZoom}%)`
        : '✋ Drag any character portrait above to move · Wheel to zoom · Click to open sliders';
    }
    resultsPreviewFrame?.contentWindow?.postMessage({ type: 'res-highlight-player', idx: resSelectedIdx }, '*');
    if (scrollIntoView && resSelectedIdx >= 0) {
      $('res-insp-tabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.respane === 'players'));
      document.querySelectorAll('.res-insp-pane').forEach(p => p.classList.toggle('active', p.id === 'respane-players'));
      $(`res-row-${resSelectedIdx}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function populateResCharDropdowns() {
    const placements = getResPlacementsClone();
    for (let i = 0; i < 12; i++) {
      const sel = $(`res-p-char-${i}`);
      if (!sel) continue;
      const cur = placements[i]?.character || '';
      sel.innerHTML = getResCharOptionsHtml(cur);
      sel.value = cur;
    }
    const slotData = getResolvedTop8Slot(t8EditingSlotId);
    for (const side of ['p1', 'p2']) {
      const sel = $(`t8-${side}-char`);
      if (!sel) continue;
      const cur = slotData?.[side]?.character || '';
      sel.innerHTML = getResCharOptionsHtml(cur);
      sel.value = cur;
    }
  }

  function renderTop8BracketEditorUI() {
    const top8 = { ...DEFAULT_TOP8, ...(state.top8 || {}) };
    const slotDefs = window.FGC_TOP8_ENGINE?.TOP8_SLOT_DEFS || [];
    const pillsHost = $('t8-slot-pills');
    if (pillsHost && slotDefs.length) {
      pillsHost.innerHTML = slotDefs.map(def => {
        const ov = top8.manualOverrides?.[def.id];
        const resSlot = getResolvedTop8Slot(def.id);
        const locked = Boolean(ov && ov.locked !== false);
        const isLive = resSlot.state === 'active' || resSlot.state === 'called';
        return `<button type="button" class="t8-slot-pill ${t8EditingSlotId === def.id ? 'active-chip' : ''} ${locked ? 'is-locked' : ''} ${isLive ? 'is-live' : ''}" data-t8-slot="${def.id}">${locked ? '🔒 ' : ''}${def.short}</button>`;
      }).join('');
    }
    if ($('t8-bracketTheme')) $('t8-bracketTheme').value = top8.bracketTheme || 'bracket-cpt-pro';
    if ($('t8-showReset')) $('t8-showReset').value = top8.showGfReset || 'auto';
    if ($('chk-t8-seeds')) $('chk-t8-seeds').checked = top8.showSeeds !== false;
    if ($('chk-t8-flags')) $('chk-t8-flags').checked = top8.showFlags !== false;
    if ($('chk-t8-iso')) $('chk-t8-iso').checked = top8.bracketShowIso !== false;
    if ($('chk-t8-sponsor')) $('chk-t8-sponsor').checked = top8.showSponsor !== false;
    if ($('chk-t8-ticker')) $('chk-t8-ticker').checked = top8.showBracketTicker !== false;
    setIfNotFocused($('t8-tickerText'), top8.bracketTickerText || '');
    if ($('t8-matchupTheme')) $('t8-matchupTheme').value = top8.matchupTheme || 'matchup-editorial-light';
    if ($('t8-matchupSlot')) $('t8-matchupSlot').value = top8.activeMatchSlot || 'wf';
    if ($('t8-boardPreset')) $('t8-boardPreset').value = top8.boardPreset || 'opening';

    const slot = getResolvedTop8Slot(t8EditingSlotId);
    const ov = top8.manualOverrides?.[t8EditingSlotId] || {};
    if ($('t8-edit-slot-badge')) $('t8-edit-slot-badge').textContent = slot.roundText || t8EditingSlotId.toUpperCase();
    if ($('chk-t8-slot-lock')) $('chk-t8-slot-lock').checked = ov.locked !== false;
    if ($('t8-slot-state')) $('t8-slot-state').value = slot.state || 'open';
    if ($('t8-slot-winner')) $('t8-slot-winner').value = ov.winnerSide === null ? 'none' : (ov.winnerSide || '');
    setIfNotFocused($('t8-slot-roundText'), ov.roundText || '');

    for (const side of ['p1', 'p2']) {
      const p = slot[side] || {};
      setIfNotFocused($(`t8-${side}-sponsor`), p.sponsor || '');
      setIfNotFocused($(`t8-${side}-name`), p.name && p.name !== 'TBD' ? p.name : '');
      setIfNotFocused($(`t8-${side}-seed`), p.seed || '');
      setIfNotFocused($(`t8-${side}-score`), String(p.score ?? 0));
      setIfNotFocused($(`t8-${side}-handle`), p.handle || '');
      const cSel = $(`t8-${side}-char`);
      if (cSel && document.activeElement !== cSel) {
        if (!cSel.options.length) cSel.innerHTML = getResCharOptionsHtml(p.character || '');
        if (p.character && !Array.from(cSel.options).some(o => o.value === p.character)) {
          const opt = document.createElement('option');
          opt.value = p.character; opt.textContent = p.character;
          cSel.appendChild(opt);
        }
        cSel.value = p.character || '';
      }
      const fItem = p.flag ? FLAGS_MAP[String(p.flag).toUpperCase()] : null;
      const rItem = p.region ? FLAGS_MAP[String(p.region).toUpperCase()] : null;
      if ($(`btn-t8-${side}-flag`)) $(`btn-t8-${side}-flag`).innerHTML = fItem ? fItem.svg : '🌍';
      if ($(`btn-t8-${side}-region`)) $(`btn-t8-${side}-region`).innerHTML = rItem ? rItem.svg : '🏳';
    }
  }

  async function pullTournamentBracket(forceProvider, silent = false, demoGameOverride = null) {
    if (!isHttp) return !silent && toast('Start the local server first (Start_Scorebar.bat)');
    const provider = forceProvider || trnState.snapshot?.provider || trnState.provider || 'startgg';
    const btn = $('btn-t8-sync-bracket') || $('btn-t8-pull-bracket');
    const origText = btn?.textContent || '';
    if (!silent && btn) { btn.disabled = true; btn.textContent = '⏳ Syncing...'; }
    try {
      const targetGame = demoGameOverride || state.vs?.game || state.results?.game || 'tekken8';
      const resp = await fetch('/api/tournament/bracket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          game: targetGame,
          demoGame: provider === 'demo' ? (demoGameOverride || state.vs?.game || getSelectedDemoGame()) : undefined,
          autoFillChars: true,
          eventId: trnState.snapshot?.selectedEventId || undefined
        })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Could not load Top 8 bracket');
      const top8Patch = {
        sourceSlots: data.slots || {},
        lastBracketSyncAt: Date.now()
      };
      if (provider === 'demo') top8Patch.manualOverrides = {};
      commitState({
        top8: top8Patch,
        results: {
          title: data.tournamentName ? `${data.tournamentName.toUpperCase()} — TOP 8` : (state.results?.title || 'TOP 8 RESULTS'),
          subtitle: data.eventName ? data.eventName.toUpperCase() : (state.results?.subtitle || 'TOURNAMENT FINALS'),
          linkedProvider: data.provider || provider,
          linkedTournament: data.tournamentName || state.results?.linkedTournament || ''
        }
      }, true);
      if (!silent) {
        const autoTag = data.autoAssignedChars > 0 ? ` · 🎲 ${data.autoAssignedChars} random chars` : '';
        toast(`🏆 Synced Top 8 Bracket (${(data.provider || provider).toUpperCase()} · ${data.matchedSets || 0} sets${autoTag})`);
      }
    } catch (err) {
      if (!silent) toast(`⚠️ ${err.message}`);
    } finally {
      if (!silent && btn) { btn.disabled = false; btn.textContent = origText; }
    }
  }

  function syncResPackSelect(gameId, preferredPack) {
    const list = gamesCatalog.all?.length ? gamesCatalog.all : gamesCatalog.featured;
    const g = list.find(x => x.id === gameId);
    const packs = g?.packs?.length ? g.packs : [{ id: 'full', name: 'Full Renders', cachedCount: 0 }];
    const sel = $('res-pack-select');
    if (!sel) return preferredPack || 'full';
    sel.innerHTML = packs.map(p => `<option value="${p.id}">${p.name}${p.cachedCount ? ` (${p.cachedCount} cached)` : ''}</option>`).join('');
    const chosen = packs.some(p => p.id === preferredPack) ? preferredPack : (g?.defaultPack || packs[0].id);
    sel.value = chosen;
    return chosen;
  }

  async function loadResultsRoster(gameId, packId) {
    if (!isHttp) return;
    const g = gameId || 'tekken8';
    const p = packId || 'full';
    const key = `${g}/${p}`;
    resRosterLoadingKey = key;
    try {
      const res = await fetch(`/api/assets/roster?game=${encodeURIComponent(g)}&pack=${encodeURIComponent(p)}`);
      if (!res.ok) {
        failedResRosterKeys.add(key);
        return;
      }
      failedResRosterKeys.delete(key);
      resRoster = await res.json();
      populateResCharDropdowns();
      if ($('res-roster-status')) {
        $('res-roster-status').textContent = `${resRoster.gameName || g} · ${resRoster.total || 0} characters (${resRoster.cachedCount || 0} cached)`;
      }
    } catch {
      failedResRosterKeys.add(key);
    } finally {
      if (resRosterLoadingKey === key) resRosterLoadingKey = '';
    }
  }

  function renderResultsUI() {
    if (!$('res-players-editor')) return;
    const res = { ...DEFAULT_RESULTS, ...(state.results || {}) };
    const syncSeg = (id, val) => {
      $(id)?.querySelectorAll('button[data-val]').forEach(b => b.classList.toggle('active-chip', b.dataset.val === val));
    };

    const viewMode = res.viewMode || 'normal';
    const aspect = (res.aspect === '4:5' && viewMode === 'normal') ? '4:5' : '16:9';
    syncSeg('seg-top8-viewMode', viewMode);
    syncSeg('seg-res-aspect', res.aspect === '4:5' ? '4:5' : '16:9');
    if ($('seg-res-aspect')) $('seg-res-aspect').style.opacity = viewMode === 'normal' ? '1' : '0.42';
    $('res-preview-stage')?.classList.toggle('is-vertical-4-5', aspect === '4:5');
    if ($('res-frame-bar')) $('res-frame-bar').style.display = viewMode === 'normal' ? 'flex' : 'none';
    if ($('chk-res-top12')) $('chk-res-top12').checked = Boolean(res.showTop12);
    $('res-players-editor')?.classList.toggle('show-top12', Boolean(res.showTop12));
    setIfNotFocused($('res-qualifyBadge'), res.qualifyBadge || '');

    const visBtn = $('btn-res-vis');
    const isVis = res.visible !== false;
    visBtn.textContent = isVis ? '👁 Results ON' : '🚫 Results HIDDEN';
    visBtn.classList.toggle('is-hidden', !isVis);

    $('res-design-grid')?.querySelectorAll('[data-res-design]').forEach(c => {
      c.classList.toggle('active', c.dataset.resDesign === res.design);
    });

    // Update up to 12 player rows in-place (zero focus loss while typing!)
    const placements = getResPlacementsClone();
    for (let i = 0; i < 12; i++) {
      const pl = placements[i];
      const row = $(`res-row-${i}`);
      if (!row) continue;
      row.dataset.rank = String(pl.place || (i + 1));
      const pSel = $(`res-p-place-${i}`);
      if (pSel && document.activeElement !== pSel) pSel.value = String(pl.place || (i + 1));
      setIfNotFocused($(`res-p-sponsor-${i}`), pl.sponsor || '');
      setIfNotFocused($(`res-p-name-${i}`), pl.name || '');
      setIfNotFocused($(`res-p-handle-${i}`), pl.handle || '');
      setIfNotFocused($(`res-p-seed-${i}`), pl.seed || '');
      setIfNotFocused($(`res-p-secchars-${i}`), Array.isArray(pl.secondaryChars) ? pl.secondaryChars.join(', ') : '');
      const shSel = $(`res-p-shape-${i}`);
      if (shSel && document.activeElement !== shSel) shSel.value = pl.cardShape || 'global';
      const cSel = $(`res-p-char-${i}`);
      if (cSel && document.activeElement !== cSel) {
        if (pl.character && !Array.from(cSel.options).some(o => o.value === pl.character)) {
          const opt = document.createElement('option');
          opt.value = pl.character;
          opt.textContent = pl.character;
          cSel.appendChild(opt);
        }
        cSel.value = pl.character || '';
      }
      const fBtn = $(`res-p-flag-${i}`);
      const rBtn = $(`res-p-region-${i}`);
      const fItem = pl.flag ? FLAGS_MAP[String(pl.flag).toUpperCase()] : null;
      const rItem = pl.region ? FLAGS_MAP[String(pl.region).toUpperCase()] : null;
      if (fBtn) {
        fBtn.innerHTML = fItem ? fItem.svg : '🌍';
        fBtn.title = fItem ? `Country: ${fItem.name}` : 'Pick Country Flag';
      }
      if (rBtn) {
        rBtn.innerHTML = rItem ? rItem.svg : '🏳';
        rBtn.title = rItem ? `Region: ${rItem.name}` : 'Pick Region / State Flag';
      }
      const avBtn = $(`res-p-av-${i}`);
      const avClr = $(`res-p-avclr-${i}`);
      if (avBtn) avBtn.classList.toggle('has-av', Boolean(pl.avatar));
      if (avClr) avClr.style.display = pl.avatar ? 'inline-flex' : 'none';
      // Per-player framing sliders
      if ($(`res-p-y-${i}`)) {
        $(`res-p-y-${i}`).value = pl.charY ?? 0;
        $(`val-res-py-${i}`).textContent = `${pl.charY ?? 0} px`;
        $(`res-p-x-${i}`).value = pl.charX ?? 0;
        $(`val-res-px-${i}`).textContent = `${pl.charX ?? 0} px`;
        $(`res-p-zoom-${i}`).value = pl.charZoom ?? 100;
        $(`val-res-pz-${i}`).textContent = `${pl.charZoom ?? 100}%`;
        $(`res-p-flip-${i}`)?.classList.toggle('active-chip', Boolean(pl.charFlip));
        $(`res-frame-drawer-${i}`)?.classList.toggle('open', i === resSelectedIdx);
        $(`res-p-framebtn-${i}`)?.classList.toggle('active-chip', i === resSelectedIdx);
      }
    }
    if (resSelectedIdx >= 0 && placements[resSelectedIdx] && $('res-frame-hint')) {
      const sp = placements[resSelectedIdx];
      $('res-frame-hint').textContent = `🎯 Framing #${sp.place} ${sp.name} · Drag portrait or use sliders (Y:${sp.charY}px · X:${sp.charX}px · ${sp.charZoom}%)`;
    }

    // Live Tournament Link Banner in Results workspace
    const bar = $('res-trn-bar');
    if (bar) {
      const snap = trnState.snapshot;
      const prov = snap?.provider || res.linkedProvider || '';
      const tName = snap?.tournament?.name || res.linkedTournament || '';
      const status = res.tournamentStatus || (snap ? 'live' : '');
      const statusEl = $('res-trn-status');
      bar.classList.toggle('is-completed', status === 'completed');
      bar.classList.toggle('is-live', status === 'live');
      if (prov && tName) {
        const provLabel = prov === 'startgg' ? '🟣 START.GG' : prov === 'challonge' ? '🟠 CHALLONGE' : '⚡ DEMO';
        statusEl.className = `res-trn-status ${status === 'completed' ? 'completed' : 'live'}`;
        statusEl.textContent = status === 'completed'
          ? `${provLabel} · ✅ FINAL RESULTS`
          : status === 'live'
            ? `${provLabel} · 🔴 LIVE STANDINGS`
            : `${provLabel} · ⏳ UPCOMING`;
        $('res-trn-name').textContent = tName;
        const tsStr = res.lastSyncAt ? `Last synced ${new Date(res.lastSyncAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}` : 'Ready to sync';
        $('res-trn-meta').textContent = `${res.entrantsCount ? `${res.entrantsCount} entrants · ` : ''}${tsStr}`;
      } else {
        statusEl.className = 'res-trn-status';
        statusEl.textContent = '🔌 NOT LINKED';
        $('res-trn-name').textContent = 'Connect a Start.gg or Challonge tournament to auto-populate live & final Top 8 results';
        $('res-trn-meta').textContent = '';
      }
      if ($('chk-res-autosync')) $('chk-res-autosync').checked = res.autoSyncTournament !== false;
    }

    // Style & Colors
    $('res-layoutOverride').value = res.layoutOverride || 'theme';
    $('res-cardStyle').value = res.cardStyle || 'theme';
    if ($('res-cardBorderStyle')) $('res-cardBorderStyle').value = res.cardBorderStyle || 'solid';
    if ($('res-cardBorderFx')) $('res-cardBorderFx').value = res.cardBorderFx || 'none';
    if ($('rng-res-cardBorderWidth')) {
      const bw = Number(res.cardBorderWidth ?? 0);
      $('rng-res-cardBorderWidth').value = bw;
      $('val-res-cardBorderWidth').textContent = bw <= 0 ? 'Auto' : `${bw} px`;
    }
    if ($('rng-res-cardCutSize')) {
      const cs = Number(res.cardCutSize ?? 0);
      $('rng-res-cardCutSize').value = cs;
      $('val-res-cardCutSize').textContent = cs <= 0 ? 'Auto' : `${cs} px`;
    }
    if ($('res-cardBorderColor')) $('res-cardBorderColor').value = res.cardBorderColor || '#facc15';
    if ($('res-fontDisplay').options.length) $('res-fontDisplay').value = res.fontDisplay || 'theme';
    syncSeg('seg-res-flagMode', res.flagMode || (res.showFlags === false ? 'none' : 'both'));
    syncSeg('seg-res-avatarMode', res.avatarMode || 'badge');
    syncSeg('seg-res-bgMode', res.bgMode || 'theme');
    $('res-bg1').value = res.bgColor1 || '#1d356b';
    $('res-bg2').value = res.bgColor2 || '#060912';
    $('res-accent').value = res.accentColor || '#facc15';
    $('res-gold').value = res.goldColor || '#facc15';
    $('rng-res-charZoom').value = res.charZoom ?? 100;
    $('val-res-charZoom').textContent = `${res.charZoom ?? 100}%`;
    $('rng-res-charY').value = res.charOffsetY ?? 0;
    $('val-res-charY').textContent = `${res.charOffsetY ?? 0} px`;
    // Sync prominent Global All-Players Framing Bar in Top 8 Players tab
    if ($('rng-res-all-y')) {
      $('rng-res-all-y').value = res.charOffsetY ?? 0;
      $('val-res-all-y').textContent = `${res.charOffsetY ?? 0} px`;
      $('rng-res-all-x').value = res.charOffsetX ?? 0;
      $('val-res-all-x').textContent = `${res.charOffsetX ?? 0} px`;
      $('rng-res-all-zoom').value = res.charZoom ?? 100;
      $('val-res-all-zoom').textContent = `${res.charZoom ?? 100}%`;
      $('btn-res-all-flip')?.classList.toggle('active-chip', Boolean(res.charFlip));
    }
    $('chk-res-crown').checked = res.showCrown !== false;
    $('chk-res-sponsor').checked = res.showSponsor !== false;
    $('chk-res-charname').checked = res.showCharName !== false;
    $('chk-res-handles').checked = res.showHandles !== false;
    if ($('chk-res-seed')) $('chk-res-seed').checked = res.showSeed !== false;
    if ($('chk-seed-sync-res')) $('chk-seed-sync-res').checked = res.showSeed !== false;
    $('chk-res-entrants').checked = res.showEntrants !== false;
    $('chk-res-logo').checked = res.showLogo !== false;

    // Element Layout & Framing Studio UI Sync
    syncSeg('seg-res-infoAlign', res.infoAlign || 'theme');
    syncSeg('seg-res-infoVPos', res.infoVPos || 'theme');
    syncSeg('seg-res-infoScrim', res.infoScrim || 'theme');
    if ($('rng-res-infoX')) {
      $('rng-res-infoX').value = res.infoOffsetX ?? 0;
      $('val-res-infoX').textContent = `${res.infoOffsetX ?? 0} px`;
      $('rng-res-infoY').value = res.infoOffsetY ?? 0;
      $('val-res-infoY').textContent = `${res.infoOffsetY ?? 0} px`;
      $('rng-res-nameScale').value = res.nameScale ?? 100;
      $('val-res-nameScale').textContent = `${res.nameScale ?? 100}%`;
      $('rng-res-metaScale').value = res.metaScale ?? 100;
      $('val-res-metaScale').textContent = `${res.metaScale ?? 100}%`;
      $('res-rankPos').value = res.rankPos || 'theme';
      $('rng-res-rankX').value = res.rankOffsetX ?? 0;
      $('val-res-rankX').textContent = `${res.rankOffsetX ?? 0} px`;
      $('rng-res-rankY').value = res.rankOffsetY ?? 0;
      $('val-res-rankY').textContent = `${res.rankOffsetY ?? 0} px`;
      $('rng-res-rankScale').value = res.rankScale ?? 100;
      $('val-res-rankScale').textContent = `${res.rankScale ?? 100}%`;
      $('rng-res-hdrScale').value = res.headerScale ?? 100;
      $('val-res-hdrScale').textContent = `${res.headerScale ?? 100}%`;
      const cg = Number(res.cardGap ?? -1);
      $('rng-res-cardGap').value = cg;
      $('val-res-cardGap').textContent = cg < 0 ? 'Auto' : `${cg} px`;
      syncSeg('seg-res-artFit', res.artFit || 'theme');
      const fy = Number(res.artFocusY ?? -1);
      $('rng-res-artFocusY').value = fy;
      $('val-res-artFocusY').textContent = fy < 0 ? 'Auto' : `${fy}%`;
      const sw = Number(res.artStripWidth ?? 0);
      $('rng-res-artStripW').value = sw;
      $('val-res-artStripW').textContent = sw < 30 ? 'Auto' : `${sw}%`;
      syncSeg('seg-res-artFade', res.artEdgeFade || 'theme');
    }

    // Animations & Pattern
    $('res-entryAnim').value = res.entryAnim || 'theme';
    $('rng-res-entrySpeed').value = res.entrySpeed ?? 100;
    $('val-res-entrySpeed').textContent = `${res.entrySpeed ?? 100}%`;
    $('rng-res-staggerMs').value = res.staggerMs ?? 85;
    $('val-res-staggerMs').textContent = `${res.staggerMs ?? 85} ms`;
    $('res-ambientAnim').value = res.ambientAnim || 'theme';
    syncSeg('seg-res-cardIdle', res.cardIdleAnim || 'theme');
    syncSeg('seg-res-pat', res.pattern || 'theme');
    syncSeg('seg-res-patDir', res.patternDir || 'diag-dr');
    $('rng-res-patSpeed').value = res.patternSpeed ?? 38;
    $('val-res-patSpeed').textContent = Number(res.patternSpeed ?? 38) === 0 ? 'Static' : `${res.patternSpeed ?? 38}%`;
    const rPatOp = Number(res.patternOpacity ?? -1);
    $('rng-res-patOp').value = rPatOp;
    $('val-res-patOp').textContent = rPatOp < 0 ? 'Auto' : `${rPatOp}%`;
    $('rng-res-patScale').value = res.patternScale ?? 100;
    $('val-res-patScale').textContent = `${res.patternScale ?? 100}%`;

    // Header & Branding
    setIfNotFocused($('res-title'), res.title || '');
    setIfNotFocused($('res-subtitle'), res.subtitle || '');
    setIfNotFocused($('res-entrantsCount'), res.entrantsCount || '');
    setIfNotFocused($('res-footerText'), res.footerText || '');
    const effLogo = res.logoUrl || state.vs?.logoUrl || '';
    const rLogoThumb = $('res-logo-thumb');
    if (effLogo) {
      if (rLogoThumb.getAttribute('src') !== effLogo) rLogoThumb.src = effLogo;
      rLogoThumb.style.display = 'block';
      $('res-logo-status').textContent = res.logoUrl ? '✅ Custom / Standings Event Logo' : '🔗 Inherited from Connected Tournament / VS';
    } else {
      rLogoThumb.style.display = 'none';
      $('res-logo-status').textContent = 'Auto-inherits connected tournament / VS logo';
    }
    $('btn-res-logo-clear').style.display = res.logoUrl ? 'inline-flex' : 'none';

    if ($('res-game-select')?.options.length && res.game) {
      $('res-game-select').value = res.game;
      const wantPack = res.pack || 'full';
      const wantKey = `${res.game}/${wantPack}`;
      if ((resRoster.game !== res.game || resRoster.pack !== wantPack) && resRosterLoadingKey !== wantKey && !failedResRosterKeys.has(wantKey)) {
        syncResPackSelect(res.game, wantPack);
        loadResultsRoster(res.game, wantPack);
      }
    }
    renderTop8BracketEditorUI();
  }

  async function pullTournamentStandings(forceProvider, silent = false, demoGameOverride = null) {
    if (!isHttp) return !silent && toast('Start the local server first (Start_Scorebar.bat)');
    const provider = forceProvider || trnState.snapshot?.provider || trnState.provider || 'startgg';
    const btn = forceProvider === 'demo' ? $('btn-res-demo') : $('btn-res-pull');
    const origText = btn?.textContent || '';
    if (!silent && btn) { btn.disabled = true; btn.textContent = '⏳ Loading...'; }
    try {
      const targetGame = demoGameOverride || state.results?.game || state.vs?.game || 'tekken8';
      const resp = await fetch('/api/tournament/standings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          game: targetGame,
          demoGame: provider === 'demo' ? (demoGameOverride || getSelectedDemoGame()) : undefined,
          autoFillChars: true,
          eventId: trnState.snapshot?.selectedEventId || undefined
        })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Could not load standings');
      const incoming = Array.isArray(data.placements) ? data.placements : [];
      const existing = getResPlacementsClone();
      const defaultRanks = [1, 2, 3, 4, 5, 5, 7, 7, 9, 9, 9, 9];
      const placements = Array.from({ length: 12 }, (_, i) => {
        const pl = incoming[i] || {};
        const prevMatch = pl.name ? existing.find(e => normText(e.name).trim() === normText(pl.name).trim()) : null;
        return {
          place: Number(pl.place || defaultRanks[i]),
          name: pl.name || `PLAYER ${i + 1}`,
          sponsor: pl.sponsor || '',
          flag: pl.flag || '',
          region: pl.region || '',
          seed: cleanValidSeed(pl.seed ?? pl.initialSeed ?? prevMatch?.seed) ? String(cleanValidSeed(pl.seed ?? pl.initialSeed ?? prevMatch?.seed)) : '',
          character: pl.character || prevMatch?.character || '',
          secondaryChars: Array.isArray(pl.secondaryChars) ? pl.secondaryChars : (prevMatch?.secondaryChars || []),
          avatar: pl.avatar || prevMatch?.avatar || '',
          handle: pl.handle || prevMatch?.handle || '',
          charZoom: prevMatch ? Number(prevMatch.charZoom ?? 100) : 100,
          charX: prevMatch ? Number(prevMatch.charX ?? 0) : 0,
          charY: prevMatch ? Number(prevMatch.charY ?? 0) : 0,
          charFlip: prevMatch ? Boolean(prevMatch.charFlip) : false,
          cardShape: existing[i]?.cardShape || prevMatch?.cardShape || 'global'
        };
      });
      const patch = {
        placements,
        title: data.tournamentName ? `${data.tournamentName.toUpperCase()} — TOP 8` : 'TOP 8 RESULTS',
        subtitle: data.eventName ? data.eventName.toUpperCase() : 'TOURNAMENT FINALS',
        entrantsCount: data.entrantsCount ? String(data.entrantsCount) : (state.results?.entrantsCount || ''),
        linkedProvider: data.provider || provider,
        linkedTournament: data.tournamentName || '',
        tournamentStatus: data.status || (data.isCompleted ? 'completed' : 'live'),
        lastSyncAt: Date.now(),
        introNonce: silent ? (state.results?.introNonce || 0) : Date.now()
      };
      if (data.cachedLogoUrl || data.logoUrl) {
        patch.logoUrl = data.cachedLogoUrl || data.logoUrl;
      }
      commitState({ results: patch }, true);
      pullTournamentBracket(provider, true, demoGameOverride || (data.provider === 'demo' ? data.gameId : null));
      if (!silent) {
        const stTag = patch.tournamentStatus === 'completed' ? 'Final Results' : 'Live Standings';
        toast(`🏅 Synced Top ${Math.min(12, incoming.length || 8)} ${stTag} + Bracket (${provider.toUpperCase()})`);
      }
    } catch (err) {
      if (!silent) toast(`⚠️ ${err.message}`);
    } finally {
      if (!silent && btn) { btn.disabled = false; btn.textContent = origText; }
    }
  }

  function bindResultsEvents() {
    // Inspector Tabs
    $('res-insp-tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-respane]');
      if (!btn) return;
      $('res-insp-tabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      document.querySelectorAll('.res-insp-pane').forEach(p => p.classList.toggle('active', p.id === `respane-${btn.dataset.respane}`));
    });

    // Header & Preview Toolbar buttons
    $('btn-res-vis').addEventListener('click', () => commitState({ results: { visible: state.results?.visible === false } }, true));
    const replayResultsIntro = () => {
      commitState({ results: { introNonce: Date.now() } }, true);
      resultsPreviewFrame?.contentWindow?.postMessage({ type: 'test-results-entry' }, '*');
      toast('🎬 Replaying Tournament Results intro');
    };
    $('btn-res-replay').addEventListener('click', replayResultsIntro);
    $('btn-res-test-anim').addEventListener('click', replayResultsIntro);
    $('btn-res-test-entry2').addEventListener('click', replayResultsIntro);

    $('btn-res-pull').addEventListener('click', () => pullTournamentStandings(undefined, false));
    $('btn-res-sync-now').addEventListener('click', () => pullTournamentStandings(undefined, false));
    $('btn-res-go-trn').addEventListener('click', () => setActiveWorkspace('tournaments'));
    $('chk-res-autosync').addEventListener('change', (e) => {
      const on = e.target.checked;
      commitState({ results: { autoSyncTournament: on } }, true);
      toast(on ? '🔄 Auto-Sync Results from Tournament enabled' : 'Auto-Sync Results paused');
      if (on && trnState.snapshot) pullTournamentStandings(trnState.snapshot.provider, true);
    });
    $('btn-res-demo').addEventListener('click', () => pullTournamentStandings('demo', false));
    $('res-frame-jumps').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-res-jump]');
      if (!btn) return;
      const idx = Number(btn.dataset.resJump);
      selectResultsPlayerForFraming(resSelectedIdx === idx ? -1 : idx, true);
    });

    // Receive live drag / wheel zoom / click-to-select from results.html preview iframe!
    window.addEventListener('message', (ev) => {
      const msg = ev.data;
      if (!msg || typeof msg !== 'object') return;
      if (msg.type === 'res-select-player') {
        selectResultsPlayerForFraming(Number(msg.idx), false);
      } else if (msg.type === 'top8-select-slot' && msg.slotId) {
        t8EditingSlotId = String(msg.slotId);
        $('res-insp-tabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.respane === 'bracket'));
        document.querySelectorAll('.res-insp-pane').forEach(p => p.classList.toggle('active', p.id === 'respane-bracket'));
        renderTop8BracketEditorUI();
        toast(`🎯 Editing Bracket Slot: ${t8EditingSlotId.toUpperCase()}`);
      } else if (msg.type === 'res-frame-patch' && msg.patch) {
        const idx = Number(msg.idx);
        const list = getResPlacementsClone();
        if (!list[idx]) return;
        list[idx] = { ...list[idx], ...msg.patch };
        commitState({ results: { placements: list } }, Boolean(msg.commit));
      }
    });
    $('btn-res-export-png').addEventListener('click', () => {
      window._fgcDownloadPng('results', state.results?.viewMode || 'normal', $('btn-res-export-png'), resultsPreviewFrame, 'export-results-png');
    });
    $('btn-pin-res').addEventListener('click', () => {
      resPreviewPinned = !resPreviewPinned;
      try { localStorage.setItem('fgc_res_preview_pinned', resPreviewPinned ? '1' : '0'); } catch {}
      syncWorkspaceLayout();
      toast(resPreviewPinned ? '📌 Results Preview pinned' : 'Results Preview unpinned');
    });
    $('btn-res-reset').addEventListener('click', () => {
      const cleanPlacements = getResPlacementsClone().map(p => ({ ...p, charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' }));
      commitState({
        results: {
          layoutOverride: 'theme', cardStyle: 'theme',
          cardBorderStyle: 'solid', cardBorderWidth: 0, cardCutSize: 0, cardBorderColor: '', cardBorderFx: 'none',
          bgMode: 'theme',
          accentColor: '', goldColor: '', fontDisplay: 'theme',
          pattern: 'theme', patternSpeed: 38, patternDir: 'diag-dr', patternOpacity: -1, patternScale: 100,
          entryAnim: 'theme', entrySpeed: 100, staggerMs: 85, ambientAnim: 'theme', cardIdleAnim: 'theme',
          charZoom: 100, charOffsetX: 0, charOffsetY: 0, charFlip: false,
          infoAlign: 'theme', infoVPos: 'theme', infoOffsetX: 0, infoOffsetY: 0,
          nameScale: 100, metaScale: 100, infoScrim: 'theme',
          rankPos: 'theme', rankOffsetX: 0, rankOffsetY: 0, rankScale: 100,
          artFit: 'theme', artFocusY: -1, artStripWidth: 0, artEdgeFade: 'theme',
          headerScale: 100, cardGap: -1,
          placements: cleanPlacements
        }
      }, true);
      toast('↺ Results style & framing reset to active design');
    });

    // Global All-Players Framing Bar bindings (moves/zooms/flips all 8 portraits together!)
    $('rng-res-all-y').addEventListener('input', (e) => commitState({ results: { charOffsetY: Number(e.target.value) } }));
    $('rng-res-all-x').addEventListener('input', (e) => commitState({ results: { charOffsetX: Number(e.target.value) } }));
    $('rng-res-all-zoom').addEventListener('input', (e) => commitState({ results: { charZoom: Number(e.target.value) } }));
    $('btn-res-all-flip').addEventListener('click', () => {
      commitState({ results: { charFlip: !state.results?.charFlip } }, true);
    });
    $('btn-res-all-reset').addEventListener('click', () => {
      const list = getResPlacementsClone().map(p => ({ ...p, charZoom: 100, charX: 0, charY: 0, charFlip: false }));
      commitState({ results: { charZoom: 100, charOffsetX: 0, charOffsetY: 0, charFlip: false, placements: list } }, true);
      toast('↺ Reset global & individual image framing for all 8 players');
    });

    // Quick fill 1st/2nd from active scorebar match
    $('btn-res-from-match').addEventListener('click', () => {
      const p1Score = Number(state.p1?.score || 0);
      const p2Score = Number(state.p2?.score || 0);
      const winner = p1Score >= p2Score ? state.p1 : state.p2;
      const runnerUp = p1Score >= p2Score ? state.p2 : state.p1;
      const list = getResPlacementsClone();
      list[0] = { ...list[0], place: 1, name: winner?.name || 'PLAYER 1', sponsor: winner?.sponsor || '', flag: winner?.flag || '', region: winner?.region || '', character: winner?.character || '', avatar: winner?.avatar || '' };
      list[1] = { ...list[1], place: 2, name: runnerUp?.name || 'PLAYER 2', sponsor: runnerUp?.sponsor || '', flag: runnerUp?.flag || '', region: runnerUp?.region || '', character: runnerUp?.character || '', avatar: runnerUp?.avatar || '' };
      commitState({ results: { placements: list } }, true);
      toast(`🏆 1st: ${list[0].name} · 2nd: ${list[1].name}`);
    });
    $('btn-res-clear-players').addEventListener('click', () => {
      commitState({ results: { placements: structuredClone(DEFAULT_RESULTS.placements) } }, true);
      toast('🗑 Reset Top 8 placements to placeholders');
    });

    // Top 8 Players Editor delegated events
    const editor = $('res-players-editor');
    editor.addEventListener('input', (e) => {
      const frm = e.target.closest('input[data-res-frame]');
      if (frm) {
        const idx = Number(frm.dataset.idx);
        const key = frm.dataset.resFrame;
        const list = getResPlacementsClone();
        if (!list[idx]) return;
        list[idx][key] = Number(frm.value);
        commitState({ results: { placements: list } });
        return;
      }
      const secEl = e.target.closest('[data-res-secchars]');
      if (secEl) {
        const idx = Number(secEl.dataset.resSecchars);
        const list = getResPlacementsClone();
        if (!list[idx]) return;
        list[idx].secondaryChars = String(secEl.value || '').split(',').map(s => s.trim()).filter(Boolean).slice(0, 4);
        commitState({ results: { placements: list } });
        return;
      }
      const el = e.target.closest('[data-res-field]');
      if (!el || el.tagName === 'SELECT') return;
      const idx = Number(el.dataset.idx);
      const field = el.dataset.resField;
      const list = getResPlacementsClone();
      if (!list[idx]) return;
      list[idx][field] = el.value;
      if (field === 'name') {
        const prof = lookupPlayerProfile(el.value);
        if (prof) {
          if (prof.avatar) list[idx].avatar = prof.avatar;
          if (!list[idx].sponsor && prof.sponsor) list[idx].sponsor = prof.sponsor;
          if (!list[idx].flag && prof.flag) list[idx].flag = prof.flag;
          if (!list[idx].region && prof.region) list[idx].region = prof.region;
          if (!list[idx].character && prof.character) list[idx].character = prof.character;
        }
      }
      commitState({ results: { placements: list } });
    });
    editor.addEventListener('change', (e) => {
      const el = e.target.closest('select[data-res-field]');
      if (!el) return;
      const idx = Number(el.dataset.idx);
      const field = el.dataset.resField;
      const list = getResPlacementsClone();
      if (!list[idx]) return;
      list[idx][field] = field === 'place' ? Number(el.value) : el.value;
      commitState({ results: { placements: list } }, true);
    });
    editor.addEventListener('click', (e) => {
      const fTog = e.target.closest('[data-res-frame-toggle]');
      if (fTog) {
        const idx = Number(fTog.dataset.resFrameToggle);
        selectResultsPlayerForFraming(resSelectedIdx === idx ? -1 : idx, false);
        return;
      }
      const fFlip = e.target.closest('[data-res-flip]');
      if (fFlip) {
        const idx = Number(fFlip.dataset.resFlip);
        const list = getResPlacementsClone();
        if (list[idx]) {
          list[idx].charFlip = !list[idx].charFlip;
          commitState({ results: { placements: list } }, true);
        }
        return;
      }
      const fReset = e.target.closest('[data-res-frame-reset]');
      if (fReset) {
        const idx = Number(fReset.dataset.resFrameReset);
        const list = getResPlacementsClone();
        if (list[idx]) {
          list[idx].charZoom = 100;
          list[idx].charX = 0;
          list[idx].charY = 0;
          list[idx].charFlip = false;
          commitState({ results: { placements: list } }, true);
          toast(`↺ Reset framing for #${list[idx].place} ${list[idx].name}`);
        }
        return;
      }
      const flagBtn = e.target.closest('[data-res-flag]');
      if (flagBtn) {
        openFlagPicker(`res-${flagBtn.dataset.resFlag}`, flagBtn.dataset.slot);
        return;
      }
      const avUp = e.target.closest('[data-res-av-up]');
      if (avUp) {
        resAvatarUploadIdx = Number(avUp.dataset.resAvUp);
        $('file-res-avatar').click();
        return;
      }
      const avClr = e.target.closest('[data-res-av-clr]');
      if (avClr) {
        const idx = Number(avClr.dataset.resAvClr);
        const list = getResPlacementsClone();
        if (list[idx]) { list[idx].avatar = ''; commitState({ results: { placements: list } }, true); toast(`Cleared avatar #${idx + 1}`); }
        return;
      }
      const mv = e.target.closest('[data-res-move]');
      if (mv) {
        const idx = Number(mv.dataset.resMove);
        const target = idx + Number(mv.dataset.dir);
        if (target < 0 || target > 11) return;
        const list = getResPlacementsClone();
        const aRank = list[idx].place;
        const bRank = list[target].place;
        const tmp = list[idx];
        list[idx] = { ...list[target], place: aRank };
        list[target] = { ...tmp, place: bRank };
        commitState({ results: { placements: list } }, true);
      }
    });
    $('file-res-avatar').addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const list = getResPlacementsClone();
        const pl = list[resAvatarUploadIdx];
        if (!pl) return;
        const url = await uploadLocalImage(file, 'avatar', pl.name || `top8-${resAvatarUploadIdx + 1}`);
        pl.avatar = url;
        commitState({ results: { placements: list } }, true);
        toast(`📷 Updated photo for ${pl.name || `Player ${resAvatarUploadIdx + 1}`}`);
      } catch (err) {
        toast(`⚠️ ${err.message}`);
      }
      e.target.value = '';
    });

    // Helper for seg-bar, select, color, slider, checkbox bindings
    $('btn-res-go-brackets')?.addEventListener('click', () => setActiveWorkspace('brackets'));
    const bindResSeg = (id, key, extraFn) => {
      $(id)?.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-val]');
        if (!btn) return;
        const patch = { [key]: btn.dataset.val };
        if (extraFn) Object.assign(patch, extraFn(btn.dataset.val));
        commitState({ results: patch }, true);
      });
    };
    const bindResSel = (id, key) => $(id).addEventListener('change', (e) => commitState({ results: { [key]: e.target.value } }, true));
    const bindResCol = (id, key) => $(id).addEventListener('input', (e) => commitState({ results: { [key]: e.target.value } }));
    const bindResRng = (id, key) => $(id).addEventListener('input', (e) => commitState({ results: { [key]: Number(e.target.value) } }));
    const bindResChk = (id, key) => $(id).addEventListener('change', (e) => commitState({ results: { [key]: e.target.checked } }, true));
    const bindResTxt = (id, key) => $(id).addEventListener('input', (e) => commitState({ results: { [key]: e.target.value } }));

    bindResSel('res-layoutOverride', 'layoutOverride');
    bindResSel('res-cardStyle', 'cardStyle');
    if ($('res-cardBorderStyle')) bindResSel('res-cardBorderStyle', 'cardBorderStyle');
    if ($('res-cardBorderFx')) bindResSel('res-cardBorderFx', 'cardBorderFx');
    if ($('rng-res-cardBorderWidth')) bindResRng('rng-res-cardBorderWidth', 'cardBorderWidth');
    if ($('rng-res-cardCutSize')) bindResRng('rng-res-cardCutSize', 'cardCutSize');
    if ($('res-cardBorderColor')) bindResCol('res-cardBorderColor', 'cardBorderColor');
    $('btn-res-bcol-auto')?.addEventListener('click', () => { commitState({ results: { cardBorderColor: '' } }, true); toast('Border Color → Design Auto'); });
    bindResSel('res-fontDisplay', 'fontDisplay');
    bindResSeg('seg-res-flagMode', 'flagMode', (v) => ({ showFlags: v !== 'none' }));
    bindResSeg('seg-res-avatarMode', 'avatarMode');
    bindResSeg('seg-res-bgMode', 'bgMode');
    bindResCol('res-bg1', 'bgColor1');
    bindResCol('res-bg2', 'bgColor2');
    bindResCol('res-accent', 'accentColor');
    bindResCol('res-gold', 'goldColor');
    $('btn-res-accent-auto').addEventListener('click', () => { commitState({ results: { accentColor: '' } }, true); toast('Accent → Design Auto'); });
    $('btn-res-gold-auto').addEventListener('click', () => { commitState({ results: { goldColor: '' } }, true); toast('1st Gold → Design Auto'); });
    bindResRng('rng-res-charZoom', 'charZoom');
    bindResRng('rng-res-charY', 'charOffsetY');
    bindResChk('chk-res-crown', 'showCrown');
    bindResChk('chk-res-sponsor', 'showSponsor');
    bindResChk('chk-res-charname', 'showCharName');
    bindResChk('chk-res-handles', 'showHandles');
    bindResChk('chk-res-seed', 'showSeed');
    bindResChk('chk-res-entrants', 'showEntrants');
    bindResChk('chk-res-logo', 'showLogo');

    bindResSel('res-entryAnim', 'entryAnim');
    bindResRng('rng-res-entrySpeed', 'entrySpeed');
    bindResRng('rng-res-staggerMs', 'staggerMs');
    bindResSel('res-ambientAnim', 'ambientAnim');
    bindResSeg('seg-res-cardIdle', 'cardIdleAnim');
    bindResSeg('seg-res-pat', 'pattern');
    bindResSeg('seg-res-patDir', 'patternDir');
    bindResRng('rng-res-patSpeed', 'patternSpeed');
    bindResRng('rng-res-patOp', 'patternOpacity');
    bindResRng('rng-res-patScale', 'patternScale');

    bindResTxt('res-title', 'title');
    bindResTxt('res-subtitle', 'subtitle');
    bindResTxt('res-entrantsCount', 'entrantsCount');
    bindResTxt('res-footerText', 'footerText');
    bindResTxt('res-qualifyBadge', 'qualifyBadge');
    bindResChk('chk-res-top12', 'showTop12');
    bindResSeg('seg-top8-viewMode', 'viewMode');
    bindResSeg('seg-res-aspect', 'aspect');

    // Top 8 Element Layout & Framing Studio bindings
    bindResSeg('seg-res-infoAlign', 'infoAlign');
    bindResSeg('seg-res-infoVPos', 'infoVPos');
    bindResSeg('seg-res-infoScrim', 'infoScrim');
    bindResRng('rng-res-infoX', 'infoOffsetX');
    bindResRng('rng-res-infoY', 'infoOffsetY');
    bindResRng('rng-res-nameScale', 'nameScale');
    bindResRng('rng-res-metaScale', 'metaScale');
    bindResSel('res-rankPos', 'rankPos');
    bindResRng('rng-res-rankX', 'rankOffsetX');
    bindResRng('rng-res-rankY', 'rankOffsetY');
    bindResRng('rng-res-rankScale', 'rankScale');
    bindResRng('rng-res-hdrScale', 'headerScale');
    bindResRng('rng-res-cardGap', 'cardGap');
    bindResSeg('seg-res-artFit', 'artFit');
    bindResRng('rng-res-artFocusY', 'artFocusY');
    $('rng-res-artStripW')?.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      commitState({ results: { artStripWidth: v < 30 ? 0 : v } });
    });
    bindResSeg('seg-res-artFade', 'artEdgeFade');
    $('btn-res-el-reset-info')?.addEventListener('click', () => {
      commitState({ results: { infoAlign: 'theme', infoVPos: 'theme', infoScrim: 'theme', infoOffsetX: 0, infoOffsetY: 0, nameScale: 100, metaScale: 100 } }, true);
      toast('↺ Player Info layout reset');
    });
    $('btn-res-el-reset-all')?.addEventListener('click', () => {
      commitState({
        results: {
          infoAlign: 'theme', infoVPos: 'theme', infoScrim: 'theme', infoOffsetX: 0, infoOffsetY: 0,
          nameScale: 100, metaScale: 100, rankPos: 'theme', rankOffsetX: 0, rankOffsetY: 0, rankScale: 100,
          artFit: 'theme', artFocusY: -1, artStripWidth: 0, artEdgeFade: 'theme', headerScale: 100, cardGap: -1
        }
      }, true);
      toast('↺ All Top 8 element positions reset');
    });
    $('btn-res-art-closeup')?.addEventListener('click', () => {
      commitState({ results: { artFit: 'cover', artFocusY: 44, charZoom: 120, charOffsetY: 0 } }, true);
      toast('🎯 Face Close-Up framing applied');
    });
    $('btn-res-art-fullbody')?.addEventListener('click', () => {
      commitState({ results: { artFit: 'contain', artFocusY: 16, charZoom: 100, charOffsetX: 0, charOffsetY: 0 } }, true);
      toast('🧍 Full Body Fit applied');
    });
    $('btn-res-art-wideleft')?.addEventListener('click', () => {
      commitState({ results: { infoAlign: 'left', infoOffsetX: -12, artFit: 'cover', artFocusY: 44, artStripWidth: 56, artEdgeFade: 'wide', charZoom: 115, charOffsetY: 0 } }, true);
      toast('📰 Left Names + Wide Art applied');
    });

    $('btn-copy-top8-mode')?.addEventListener('click', () => {
      const base = ($('results-url-text')?.textContent || 'http://localhost:8787/top8').replace(/\/results\.html$/, '/top8');
      const vm = state.results?.viewMode || 'normal';
      const url = `${base}?mode=${vm}`;
      navigator.clipboard?.writeText(url).then(() => toast(`📋 Copied ${url}`)).catch(() => toast(url));
    });
    $('btn-t8-pull-bracket')?.addEventListener('click', () => pullTournamentBracket(undefined, false));
    $('btn-t8-sync-bracket')?.addEventListener('click', () => pullTournamentBracket(undefined, false));
    $('btn-t8-demo-bracket')?.addEventListener('click', () => pullTournamentBracket('demo', false));
    $('btn-t8-clear-overrides')?.addEventListener('click', () => {
      commitState({ top8: { manualOverrides: {} } }, true);
      toast('↺ Cleared all manual bracket overrides');
    });
    $('btn-t8-jump-bracket')?.addEventListener('click', () => commitState({ results: { viewMode: 'bracket' } }, true));
    $('btn-t8-jump-1v1')?.addEventListener('click', () => commitState({ results: { viewMode: 'matchup-1v1' } }, true));
    $('btn-t8-jump-2x2')?.addEventListener('click', () => commitState({ results: { viewMode: 'matchup-2x2' } }, true));

    // Bracket & Matchup global settings bindings
    const bindT8Sel = (id, key) => $(id)?.addEventListener('change', (e) => commitState({ top8: { [key]: e.target.value } }, true));
    const bindT8Chk = (id, key) => $(id)?.addEventListener('change', (e) => commitState({ top8: { [key]: e.target.checked } }, true));
    bindT8Sel('t8-bracketTheme', 'bracketTheme');
    bindT8Sel('t8-showReset', 'showGfReset');
    bindT8Sel('t8-matchupTheme', 'matchupTheme');
    bindT8Sel('t8-matchupSlot', 'activeMatchSlot');
    bindT8Chk('chk-t8-seeds', 'showSeeds');
    bindT8Chk('chk-t8-flags', 'showFlags');
    bindT8Chk('chk-t8-iso', 'bracketShowIso');
    bindT8Chk('chk-t8-sponsor', 'showSponsor');
    bindT8Chk('chk-t8-ticker', 'showBracketTicker');
    $('t8-tickerText')?.addEventListener('input', (e) => commitState({ top8: { bracketTickerText: e.target.value } }));
    bindT8Sel('t8-boardPreset', 'boardPreset');

    // Interactive 11-slot selector & per-slot override controls
    $('t8-slot-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-t8-slot]');
      if (!btn) return;
      t8EditingSlotId = btn.dataset.t8Slot;
      renderTop8BracketEditorUI();
    });
    $('chk-t8-slot-lock')?.addEventListener('change', (e) => {
      patchTop8SlotOverride(t8EditingSlotId, { locked: e.target.checked }, true);
    });
    $('t8-slot-state')?.addEventListener('change', (e) => {
      patchTop8SlotOverride(t8EditingSlotId, { state: e.target.value }, true);
    });
    $('t8-slot-winner')?.addEventListener('change', (e) => {
      const v = e.target.value;
      patchTop8SlotOverride(t8EditingSlotId, { winnerSide: v === 'none' ? null : (v || undefined) }, true);
    });
    $('t8-slot-roundText')?.addEventListener('input', (e) => {
      patchTop8SlotOverride(t8EditingSlotId, { roundText: e.target.value }, false);
    });
    for (const side of ['p1', 'p2']) {
      $(`t8-${side}-sponsor`)?.addEventListener('input', (e) => patchTop8SlotOverride(t8EditingSlotId, { [side]: { sponsor: e.target.value } }));
      $(`t8-${side}-name`)?.addEventListener('input', (e) => patchTop8SlotOverride(t8EditingSlotId, { [side]: { name: e.target.value || 'TBD' } }));
      $(`t8-${side}-seed`)?.addEventListener('input', (e) => patchTop8SlotOverride(t8EditingSlotId, { [side]: { seed: e.target.value } }));
      $(`t8-${side}-score`)?.addEventListener('input', (e) => patchTop8SlotOverride(t8EditingSlotId, { [side]: { score: Math.max(0, Number(e.target.value || 0)) } }));
      $(`t8-${side}-handle`)?.addEventListener('input', (e) => patchTop8SlotOverride(t8EditingSlotId, { [side]: { handle: e.target.value } }));
      $(`t8-${side}-char`)?.addEventListener('change', (e) => patchTop8SlotOverride(t8EditingSlotId, { [side]: { character: e.target.value } }, true));
      $(`btn-t8-${side}-flag`)?.addEventListener('click', () => openFlagPicker(`t8-${side}`, 'flag'));
      $(`btn-t8-${side}-region`)?.addEventListener('click', () => openFlagPicker(`t8-${side}`, 'region'));
    }
    $('btn-t8-slot-spotlight')?.addEventListener('click', () => {
      const slot = getResolvedTop8Slot(t8EditingSlotId);
      commitState({
        top8: { activeMatchSlot: t8EditingSlotId },
        vs: {
          viewMode: '1v1',
          source: 'custom',
          customMatch: {
            round: slot.roundText || 'TOP 8',
            format: state.format || 'FT3',
            p1: { ...(slot.p1 || {}), name: slot.p1?.name || 'PLAYER 1', score: Number(slot.p1?.score || 0) },
            p2: { ...(slot.p2 || {}), name: slot.p2?.name || 'PLAYER 2', score: Number(slot.p2?.score || 0) }
          },
          introNonce: Date.now()
        }
      }, true);
      setActiveWorkspace('vs');
      toast(`⚔️ Opened ${slot.roundText || t8EditingSlotId.toUpperCase()} in 1v1 VS Splash!`);
    });
    $('btn-t8-slot-push-sb')?.addEventListener('click', () => {
      const slot = getResolvedTop8Slot(t8EditingSlotId);
      commitState({
        round: slot.roundText || 'TOP 8',
        p1: {
          name: slot.p1?.name || 'PLAYER 1',
          sponsor: slot.p1?.sponsor || '',
          flag: slot.p1?.flag || '',
          region: slot.p1?.region || '',
          seed: slot.p1?.seed || '',
          character: slot.p1?.character || '',
          score: Number(slot.p1?.score || 0)
        },
        p2: {
          name: slot.p2?.name || 'PLAYER 2',
          sponsor: slot.p2?.sponsor || '',
          flag: slot.p2?.flag || '',
          region: slot.p2?.region || '',
          seed: slot.p2?.seed || '',
          character: slot.p2?.character || '',
          score: Number(slot.p2?.score || 0)
        }
      }, true);
      toast(`▶ Pushed ${slot.roundText} to Live Scorebar!`);
    });
    $('btn-t8-slot-reset')?.addEventListener('click', () => {
      const overrides = structuredClone(state.top8?.manualOverrides || {});
      delete overrides[t8EditingSlotId];
      commitState({ top8: { manualOverrides: overrides } }, true);
      toast(`↺ Reset ${t8EditingSlotId.toUpperCase()} back to synced bracket`);
    });

    // Event Logo upload / clear
    $('btn-res-logo-upload').addEventListener('click', () => $('file-res-logo').click());
    $('btn-res-logo-clear').addEventListener('click', () => {
      commitState({ results: { logoUrl: '' } }, true);
      toast('Results logo override cleared');
    });
    $('file-res-logo').addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const url = await uploadLocalImage(file, 'branding', 'results-event-logo');
        commitState({ results: { logoUrl: url, showLogo: true } }, true);
        toast('🏷️ Results event logo uploaded');
      } catch (err) {
        toast(`⚠️ ${err.message}`);
      }
      e.target.value = '';
    });

    // Game & Art Pack selector
    $('res-game-select').addEventListener('change', async (e) => {
      const gameId = e.target.value;
      const packId = syncResPackSelect(gameId, 'full');
      commitState({ results: { game: gameId, pack: packId } }, true);
      await loadResultsRoster(gameId, packId);
      toast(`🎮 Results game → ${e.target.selectedOptions[0]?.textContent || gameId}`);
    });
    $('res-pack-select').addEventListener('change', async (e) => {
      const gameId = $('res-game-select').value || state.results?.game || 'tekken8';
      const packId = e.target.value;
      commitState({ results: { game: gameId, pack: packId } }, true);
      await loadResultsRoster(gameId, packId);
    });
    $('btn-res-sync-game').addEventListener('click', async () => {
      const g = state.vs?.game || 'tekken8';
      const p = state.vs?.pack || 'full';
      syncResPackSelect(g, p);
      commitState({ results: { game: g, pack: p } }, true);
      await loadResultsRoster(g, p);
      toast(`🔄 Synced Results game with VS Splash (${g})`);
    });

    // 24 Results Designs Sidebar (Search + Filters + Card Selection)
    $('res-design-search').addEventListener('input', (e) => {
      resDesignSearch = e.target.value;
      renderResultsDesignCards();
    });
    $('res-design-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-rcat]');
      if (!btn) return;
      resDesignCat = btn.dataset.rcat;
      $('res-design-filters').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      renderResultsDesignCards();
    });
    function buildBuiltInResultsResetPatch(designId) {
      const cur = state.results || {};
      const fresh = structuredClone(DEFAULT_RESULTS);
      const d = RESULTS_DESIGNS.find(x => x.id === designId);
      const cleanPlacements = getResPlacementsClone().map(p => ({ ...p, charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' }));
      return {
        _silentAudio: true,
        results: {
          ...fresh,
          design: designId,
          visible: cur.visible !== false,
          viewMode: 'normal',
          aspect: d?.defaultAspect === '4:5' ? '4:5' : '16:9',
          showTop12: Boolean(d?.defaultTop12),
          game: cur.game || fresh.game,
          pack: cur.pack || fresh.pack,
          title: cur.title !== undefined ? cur.title : fresh.title,
          subtitle: cur.subtitle !== undefined ? cur.subtitle : fresh.subtitle,
          entrantsCount: cur.entrantsCount !== undefined ? cur.entrantsCount : fresh.entrantsCount,
          footerText: cur.footerText !== undefined ? cur.footerText : fresh.footerText,
          logoUrl: cur.logoUrl || '',
          qualifyBadge: cur.qualifyBadge || '',
          autoSyncTournament: cur.autoSyncTournament !== false,
          linkedProvider: cur.linkedProvider || '',
          linkedTournament: cur.linkedTournament || '',
          tournamentStatus: cur.tournamentStatus || '',
          lastSyncAt: cur.lastSyncAt || 0,
          placements: cleanPlacements,
          introNonce: Date.now()
        }
      };
    }

    $('res-design-grid').addEventListener('click', (e) => {
      const card = e.target.closest('[data-res-design]');
      if (!card) return;
      const id = card.dataset.resDesign;
      const d = RESULTS_DESIGNS.find(x => x.id === id);
      const wasSame = state.results?.design === id;
      commitState(buildBuiltInResultsResetPatch(id), true);
      toast(wasSame
        ? `↺ Reset to factory defaults: ${d ? d.name : id}`
        : `🏅 Results Design loaded (factory defaults): ${d ? d.name : id}`);
    });
  }


  /* =========================================================================
     WORKSPACE 3: DEDICATED BRACKETS & POOLS BROADCAST CONTROLLER (12 PRESETS)
     ========================================================================= */
  const BRACKETS_DESIGNS = window.FGC_BRACKET_DESIGNS || [];
  let bkDesignCat = 'all';
  let bkDesignSearch = '';
  let bkActivePoolIdx = 0;
  let bkActivePtSlot = 'pqf1';

  const BK_PT_DEFS = [
    { id: 'pqf1', short: 'PQF 1', label: 'Pool QF 1' },
    { id: 'pqf2', short: 'PQF 2', label: 'Pool QF 2' },
    { id: 'pqf3', short: 'PQF 3', label: 'Pool QF 3' },
    { id: 'pqf4', short: 'PQF 4', label: 'Pool QF 4' },
    { id: 'psf1', short: 'PSF 1', label: 'Pool SF 1' },
    { id: 'psf2', short: 'PSF 2', label: 'Pool SF 2' },
    { id: 'pwf',  short: 'P-WF',  label: 'Pool Winners Final' },
    { id: 'plqf1', short: 'PLR1 A', label: 'Pool Losers R1 A' },
    { id: 'plqf2', short: 'PLR1 B', label: 'Pool Losers R1 B' },
    { id: 'plsf', short: 'PLSF',  label: 'Pool Losers Semi' },
    { id: 'plf',  short: 'P-LF',  label: 'Pool Losers Final' }
  ];

  function getBracketsState() {
    return {
      ...DEFAULT_BRACKETS,
      ...(state.brackets || {}),
      customColors: { ...DEFAULT_BRACKETS.customColors, ...(state.brackets?.customColors || {}) },
      pools: Array.isArray(state.brackets?.pools) && state.brackets.pools.length
        ? state.brackets.pools
        : structuredClone(DEFAULT_BRACKETS.pools),
      poolTreeSlots: (state.brackets?.poolTreeSlots && Object.keys(state.brackets.poolTreeSlots).length)
        ? state.brackets.poolTreeSlots
        : structuredClone(DEFAULT_BRACKETS.poolTreeSlots),
      top16Rows: Array.isArray(state.brackets?.top16Rows) && state.brackets.top16Rows.length
        ? state.brackets.top16Rows
        : structuredClone(DEFAULT_BRACKETS.top16Rows)
    };
  }

  function renderBracketsDesignCards() {
    const grid = $('bk-design-grid');
    if (!grid) return;
    if (bkDesignCat === 'my-presets') {
      const cnt = presetsDb.filter(p => (p.scope || 'scorebar') === 'brackets').length;
      if ($('bk-design-count')) $('bk-design-count').textContent = cnt;
      if (window.FGC_PRESETS_UI) window.FGC_PRESETS_UI.renderSidebarMyPresets('brackets', grid);
      return;
    }
    const q = normText(bkDesignSearch.trim());
    const list = BRACKETS_DESIGNS.filter(d => {
      if (q) return normText(`${d.name} ${d.desc} ${d.cat} ${d.tier} ${d.cellStyle} ${d.connectorStyle}`).includes(q);
      return bkDesignCat === 'all' || d.cat === bkDesignCat;
    });
    if ($('bk-design-count')) $('bk-design-count').textContent = list.length;
    const curId = state.brackets?.design || 'bk-cpt-combo-breaker';
    grid.innerHTML = list.map(d => `
      <button type="button" class="vs-design-card ${curId === d.id ? 'active' : ''}" data-bk-design="${d.id}">
        <div class="vs-design-swatch" style="background:${d.swatch || d.bg}">${(d.cellStyle || 'PRO').toUpperCase()}</div>
        <div class="vs-design-head">
          <strong>${d.name}</strong>
          <span class="vs-tier-badge ${d.tier || 'PRO'}">${d.tier || 'PRO'}</span>
        </div>
        <small>${d.desc}</small>
      </button>
    `).join('') || '<div style="padding:16px;text-align:center;color:var(--muted);font-size:11px;">No bracket designs matched that search.</div>';
  }

  function renderBracketsPoolsEditor(bk) {
    const pools = bk.pools || [];
    if (bkActivePoolIdx >= pools.length) bkActivePoolIdx = Math.max(0, pools.length - 1);
    const pills = $('bk-pool-pills');
    if (pills) {
      pills.innerHTML = pools.map((p, i) => `
        <button type="button" class="bk-pool-pill ${i === bkActivePoolIdx ? 'active-chip' : ''}" data-bk-pool-idx="${i}">${p.name || `POOL ${i + 1}`} (${(p.players || []).length})</button>
      `).join('');
    }
    const perPage = Math.max(1, Number(bk.poolsPerPage || 4));
    const totalPages = Math.max(1, Math.ceil(pools.length / perPage));
    const page = Math.min(totalPages - 1, Math.max(0, Number(bk.poolsPage || 0)));
    if ($('bk-poolsPerPage')) $('bk-poolsPerPage').value = String(perPage);
    if ($('bk-pool-page-label')) $('bk-pool-page-label').textContent = `Page ${page + 1}/${totalPages}`;

    const pool = pools[bkActivePoolIdx];
    if (!pool) return;
    setIfNotFocused($('bk-pool-name'), pool.name || '');
    setIfNotFocused($('bk-pool-sub'), pool.subtitle || '');
    if ($('bk-pool-status')) $('bk-pool-status').value = pool.status || 'live';

    const listHost = $('bk-pool-players-list');
    if (!listHost) return;
    const rows = pool.players || [];
    const sig = `${bkActivePoolIdx}:${rows.length}:${rows.map(r => r.flag || '').join(',')}`;
    if (listHost.dataset.sig !== sig) {
      listHost.dataset.sig = sig;
      listHost.innerHTML = rows.map((pl, ri) => {
        const fItem = pl.flag ? FLAGS_MAP[String(pl.flag).toUpperCase()] : null;
        return `
        <div class="bk-pool-player-row" data-pool-row="${ri}">
          <input type="text" data-pf="sponsor" data-ri="${ri}" placeholder="TAG" maxlength="12" value="${(pl.sponsor || '').replace(/"/g, '&quot;')}" />
          <input type="text" data-pf="name" data-ri="${ri}" placeholder="Player" maxlength="28" value="${(pl.name || '').replace(/"/g, '&quot;')}" />
          <button type="button" class="res-mini-flag-btn" data-pool-flag="${ri}" title="Pick Country Flag">${fItem ? fItem.svg : '🌍'}</button>
          <input type="text" data-pf="seed" data-ri="${ri}" placeholder="#" maxlength="4" value="${String(pl.seed ?? '').replace(/"/g, '&quot;')}" />
          <input type="number" data-pf="wins" data-ri="${ri}" min="0" max="99" value="${Number(pl.wins || 0)}" />
          <input type="number" data-pf="losses" data-ri="${ri}" min="0" max="99" value="${Number(pl.losses || 0)}" />
          <select data-pf="status" data-ri="${ri}">
            <option value="winners" ${pl.status === 'winners' ? 'selected' : ''}>🟢 Winners Q</option>
            <option value="losers" ${pl.status === 'losers' ? 'selected' : ''}>🟡 Losers Q</option>
            <option value="alive" ${(!pl.status || pl.status === 'alive') ? 'selected' : ''}>🔵 Active</option>
            <option value="out" ${pl.status === 'out' ? 'selected' : ''}>⚪ Eliminated</option>
          </select>
          <button type="button" data-pool-del-row="${ri}" title="Remove player" style="padding:2px 5px;font-size:10px;">✕</button>
        </div>`;
      }).join('');
    }
  }

  function renderBracketsPoolTreeAndTop16(bk) {
    setIfNotFocused($('bk-poolTreeTitle'), bk.poolTreeTitle || '');
    const ptPills = $('bk-pt-pills');
    if (ptPills) {
      ptPills.innerHTML = BK_PT_DEFS.map(d => `
        <button type="button" class="bk-pool-pill ${bkActivePtSlot === d.id ? 'active-chip' : ''}" data-pt-slot="${d.id}">${d.short}</button>
      `).join('');
    }
    const slot = bk.poolTreeSlots?.[bkActivePtSlot] || { state: 'open', winnerSide: null, p1: {}, p2: {} };
    if ($('bk-pt-state')) $('bk-pt-state').value = slot.state || 'open';
    if ($('bk-pt-winner')) $('bk-pt-winner').value = slot.winnerSide || '';
    for (const s of ['p1', 'p2']) {
      const p = slot[s] || {};
      setIfNotFocused($(`bk-pt-${s}-sponsor`), p.sponsor || '');
      setIfNotFocused($(`bk-pt-${s}-name`), p.name && p.name !== 'TBD' ? p.name : '');
      setIfNotFocused($(`bk-pt-${s}-seed`), p.seed || '');
      setIfNotFocused($(`bk-pt-${s}-score`), String(p.score ?? 0));
      const fItem = p.flag ? FLAGS_MAP[String(p.flag).toUpperCase()] : null;
      if ($(`btn-bk-pt-${s}-flag`)) $(`btn-bk-pt-${s}-flag`).innerHTML = fItem ? fItem.svg : '🌍';
    }

    const t16Host = $('bk-top16-list');
    if (t16Host) {
      const rows = bk.top16Rows || [];
      const sig = `${rows.length}:${rows.map(r => r.flag || '').join(',')}`;
      if (t16Host.dataset.sig !== sig) {
        t16Host.dataset.sig = sig;
        t16Host.innerHTML = rows.map((r, i) => {
          const fItem = r.flag ? FLAGS_MAP[String(r.flag).toUpperCase()] : null;
          return `
          <div class="bk-top16-row" data-t16-row="${i}">
            <input type="text" data-t16f="place" data-ri="${i}" value="${String(r.place ?? (i + 1))}" maxlength="4" />
            <input type="text" data-t16f="sponsor" data-ri="${i}" value="${(r.sponsor || '').replace(/"/g, '&quot;')}" placeholder="TAG" maxlength="12" />
            <input type="text" data-t16f="name" data-ri="${i}" value="${(r.name || '').replace(/"/g, '&quot;')}" placeholder="Player ${i + 1}" maxlength="28" />
            <button type="button" class="res-mini-flag-btn" data-t16-flag="${i}" title="Pick Country Flag">${fItem ? fItem.svg : '🌍'}</button>
            <input type="text" data-t16f="seed" data-ri="${i}" value="${String(r.seed ?? '').replace(/"/g, '&quot;')}" placeholder="#" maxlength="4" />
            <input type="text" data-t16f="record" data-ri="${i}" value="${(r.record || '').replace(/"/g, '&quot;')}" placeholder="4-1" maxlength="8" />
            <select data-t16f="status" data-ri="${i}">
              <option value="winners" ${r.status === 'winners' ? 'selected' : ''}>🟢 Winners</option>
              <option value="losers" ${r.status === 'losers' ? 'selected' : ''}>🟡 Losers</option>
              <option value="in" ${(!r.status || r.status === 'in') ? 'selected' : ''}>🔵 Active</option>
              <option value="out" ${r.status === 'out' ? 'selected' : ''}>⚪ Out</option>
            </select>
            <input type="text" data-t16f="character" data-ri="${i}" value="${(r.character || '').replace(/"/g, '&quot;')}" placeholder="Char" maxlength="20" />
          </div>`;
        }).join('');
      }
    }
  }

  function renderBracketsUI() {
    if (!$('bk-design-grid')) return;
    const bk = getBracketsState();
    const syncSeg = (id, val) => {
      $(id)?.querySelectorAll('button[data-val]').forEach(b => b.classList.toggle('active-chip', b.dataset.val === val));
    };
    syncSeg('seg-bk-mode', bk.mode || 'top8-de');
    syncSeg('seg-bk-bgMode', bk.bgMode || 'theme');
    syncSeg('seg-bk-pat', bk.pattern || 'theme');
    syncSeg('seg-bk-patDir', bk.patternDir || 'diag-dr');

    const visBtn = $('btn-bk-vis');
    if (visBtn) {
      const isVis = bk.visible !== false;
      visBtn.textContent = isVis ? '👁 Brackets ON' : '🚫 Brackets HIDDEN';
      visBtn.classList.toggle('is-hidden', !isVis);
    }

    $('bk-design-grid')?.querySelectorAll('[data-bk-design]').forEach(c => {
      c.classList.toggle('active', c.dataset.bkDesign === bk.design);
    });

    if ($('bk-fontDisplay')?.options.length) $('bk-fontDisplay').value = bk.fontDisplay || 'theme';
    if ($('bk-fontBody')?.options.length) $('bk-fontBody').value = bk.fontBody || 'theme';
    if ($('rng-bk-fontScale')) {
      $('rng-bk-fontScale').value = bk.fontScale ?? 100;
      $('val-bk-fontScale').textContent = `${bk.fontScale ?? 100}%`;
    }
    if ($('bk-headerStyle')) $('bk-headerStyle').value = bk.headerStyle || 'theme';
    if ($('bk-cellStyle')) $('bk-cellStyle').value = bk.cellStyle || 'theme';
    if ($('bk-connectorStyle')) $('bk-connectorStyle').value = bk.connectorStyle || 'theme';
    if ($('rng-bk-wireW')) {
      $('rng-bk-wireW').value = bk.connectorThickness ?? 2.5;
      $('val-bk-wireW').textContent = `${bk.connectorThickness ?? 2.5} px`;
    }
    if ($('rng-bk-radius')) {
      const rad = Number(bk.cellRadius ?? -1);
      $('rng-bk-radius').value = rad;
      $('val-bk-radius').textContent = rad < 0 ? 'Auto' : `${rad} px`;
    }

    if ($('bk-bg1')) $('bk-bg1').value = bk.bgColor1 || '#0a2878';
    if ($('bk-bg2')) $('bk-bg2').value = bk.bgColor2 || '#040814';
    const cc = bk.customColors || {};
    if ($('chk-bk-customColors')) $('chk-bk-customColors').checked = Boolean(cc.enabled);
    if ($('bk-custom-colors-grid')) $('bk-custom-colors-grid').style.opacity = cc.enabled ? '1' : '0.48';
    const colMap = [
      ['bk-c-frame', 'frameColor', '#e9ff1a'],
      ['bk-c-accent', 'accentColor', '#00d2ff'],
      ['bk-c-accent2', 'accentColor2', '#e9ff1a'],
      ['bk-c-text', 'textColor', '#ffffff'],
      ['bk-c-headBg', 'headBg', '#091638'],
      ['bk-c-headText', 'headText', '#ffffff'],
      ['bk-c-cellBg', 'cellBg', '#f8fafc'],
      ['bk-c-cellText', 'cellText', '#0a0e1a'],
      ['bk-c-isoBg', 'isoBg', '#e9ff1a'],
      ['bk-c-scoreBg', 'scoreBg', '#0a0e1a'],
      ['bk-c-winAccent', 'winAccent', '#22c55e'],
      ['bk-c-wireColor', 'wireColor', '#93c5fd']
    ];
    for (const [id, key, fb] of colMap) {
      if ($(id)) $(id).value = cc[key] || fb;
    }

    if ($('rng-bk-patSpeed')) {
      $('rng-bk-patSpeed').value = bk.patternSpeed ?? 36;
      $('val-bk-patSpeed').textContent = Number(bk.patternSpeed ?? 36) === 0 ? 'Static' : `${bk.patternSpeed ?? 36}%`;
    }
    if ($('rng-bk-patOp')) {
      const op = Number(bk.patternOpacity ?? -1);
      $('rng-bk-patOp').value = op;
      $('val-bk-patOp').textContent = op < 0 ? 'Auto' : `${op}%`;
    }
    if ($('rng-bk-patScale')) {
      $('rng-bk-patScale').value = bk.patternScale ?? 100;
      $('val-bk-patScale').textContent = `${bk.patternScale ?? 100}%`;
    }
    if ($('bk-entryAnim')) $('bk-entryAnim').value = bk.entryAnim || 'columns';

    setIfNotFocused($('bk-title'), bk.title || '');
    setIfNotFocused($('bk-subtitle'), bk.subtitle || '');
    setIfNotFocused($('bk-badgeText'), bk.badgeText || '');
    if ($('bk-showGfReset')) $('bk-showGfReset').value = bk.showGfReset || 'auto';
    if ($('chk-bk-flags')) $('chk-bk-flags').checked = bk.showFlags !== false;
    if ($('chk-bk-iso')) $('chk-bk-iso').checked = bk.showIso !== false;
    if ($('chk-bk-seeds')) $('chk-bk-seeds').checked = bk.showSeeds !== false;
    if ($('chk-bk-sponsors')) $('chk-bk-sponsors').checked = bk.showSponsors !== false;
    if ($('chk-bk-logo')) $('chk-bk-logo').checked = bk.showLogo !== false;
    if ($('chk-bk-ticker')) $('chk-bk-ticker').checked = bk.showTicker !== false;
    setIfNotFocused($('bk-tickerText'), bk.tickerText || '');

    const effLogo = bk.logoUrl || state.results?.logoUrl || state.vs?.logoUrl || '';
    const thumb = $('bk-logo-thumb');
    if (thumb) {
      if (effLogo) {
        if (thumb.getAttribute('src') !== effLogo) thumb.src = effLogo;
        thumb.style.display = 'block';
        if ($('bk-logo-status')) $('bk-logo-status').textContent = bk.logoUrl ? '✅ Custom Brackets Event Logo' : '🔗 Inherited from Connected Tournament / VS';
      } else {
        thumb.style.display = 'none';
        if ($('bk-logo-status')) $('bk-logo-status').textContent = 'Auto-inherits connected tournament / VS logo';
      }
    }
    if ($('btn-bk-logo-clr')) $('btn-bk-logo-clr').style.display = bk.logoUrl ? 'inline-flex' : 'none';

    renderTop8BracketEditorUI();
    renderBracketsPoolsEditor(bk);
    renderBracketsPoolTreeAndTop16(bk);
  }

  async function pullTournamentPools(forceProvider, silent = false) {
    if (!isHttp) return !silent && toast('Start the local server first (Start_Scorebar.bat)');
    const provider = forceProvider || trnState.snapshot?.provider || 'demo';
    const btn = $('btn-bk-pull-pools');
    const orig = btn?.textContent || '';
    if (!silent && btn) { btn.disabled = true; btn.textContent = '⏳ Loading...'; }
    try {
      const resp = await fetch('/api/tournament/pools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, eventId: trnState.snapshot?.selectedEventId || undefined })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Could not load pools');
      const bkPatch = { poolsPage: 0, introNonce: Date.now() };
      if (Array.isArray(data.pools) && data.pools.length) bkPatch.pools = data.pools;
      if (data.poolTreeSlots) bkPatch.poolTreeSlots = data.poolTreeSlots;
      if (Array.isArray(data.top16Rows) && data.top16Rows.length) bkPatch.top16Rows = data.top16Rows;
      if (data.tournamentName) bkPatch.title = `${data.tournamentName.toUpperCase()} — POOLS`;
      if (data.eventName) bkPatch.subtitle = data.eventName.toUpperCase();
      commitState({ brackets: bkPatch }, true);
      if (!silent) toast(`📊 Loaded ${(data.pools || []).length} Pools (${provider.toUpperCase()})`);
    } catch (err) {
      if (!silent) toast(`⚠️ ${err.message}`);
    } finally {
      if (!silent && btn) { btn.disabled = false; btn.textContent = orig; }
    }
  }

  function bindBracketsEvents() {
    if (!$('bk-insp-tabs')) return;
    $('bk-insp-tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-bkpane]');
      if (!btn) return;
      $('bk-insp-tabs').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      document.querySelectorAll('.bk-insp-pane').forEach(p => p.classList.toggle('active', p.id === `bkpane-${btn.dataset.bkpane}`));
    });

    // Header & Toolbar buttons
    const replayBk = () => {
      commitState({ brackets: { introNonce: Date.now() } }, true);
      bracketsPreviewFrame?.contentWindow?.postMessage({ type: 'test-brackets-entry' }, '*');
      toast('🎬 Replaying Brackets intro');
    };
    $('btn-bk-vis')?.addEventListener('click', () => commitState({ brackets: { visible: state.brackets?.visible === false } }, true));
    $('btn-bk-replay')?.addEventListener('click', replayBk);
    $('btn-bk-test-anim')?.addEventListener('click', replayBk);
    $('btn-bk-replay2')?.addEventListener('click', replayBk);
    $('btn-copy-brackets')?.addEventListener('click', () => {
      const url = $('brackets-url-text')?.textContent || 'http://localhost:8787/brackets';
      navigator.clipboard?.writeText(url).then(() => toast('📋 Brackets OBS URL copied')).catch(() => toast(url));
    });
    $('copy-brackets-2')?.addEventListener('click', () => $('btn-copy-brackets')?.click());
    $('btn-open-brackets')?.addEventListener('click', () => window.open('brackets.html', '_blank'));
    $('btn-copy-bk-mode')?.addEventListener('click', () => {
      const base = $('brackets-url-text')?.textContent || 'http://localhost:8787/brackets';
      const mode = state.brackets?.mode || 'top8-de';
      const url = `${base}?mode=${mode}`;
      navigator.clipboard?.writeText(url).then(() => toast(`📋 Copied ${url}`)).catch(() => toast(url));
    });
    $('btn-pin-bk')?.addEventListener('click', () => {
      bkPreviewPinned = !bkPreviewPinned;
      try { localStorage.setItem('fgc_bk_preview_pinned', bkPreviewPinned ? '1' : '0'); } catch {}
      syncWorkspaceLayout();
      toast(bkPreviewPinned ? '📌 Brackets Preview pinned' : 'Brackets Preview unpinned');
    });
    $('btn-bk-pull-bracket')?.addEventListener('click', () => pullTournamentBracket(undefined, false));
    $('btn-bk-pull-pools')?.addEventListener('click', () => pullTournamentPools(undefined, false));
    $('btn-bk-demo-all')?.addEventListener('click', async () => {
      await pullTournamentBracket('demo', true);
      await pullTournamentPools('demo', false);
      toast('⚡ Demo Top 8 Bracket, Pools A1-B2, Pool Tree & Top 16 loaded!');
    });
    $('btn-bk-export-png')?.addEventListener('click', () => {
      window._fgcDownloadPng('brackets', state.brackets?.mode || 'top8-de', $('btn-bk-export-png'), null, '');
    });
    $('btn-bk-reset')?.addEventListener('click', () => {
      commitState({
        brackets: {
          bgMode: 'theme',
          headerStyle: 'theme',
          cellStyle: 'theme',
          connectorStyle: 'theme',
          connectorThickness: 2.5,
          cellRadius: -1,
          fontDisplay: 'theme',
          fontBody: 'theme',
          fontScale: 100,
          pattern: 'theme',
          patternOpacity: -1,
          patternScale: 100,
          customColors: { ...DEFAULT_BRACKETS.customColors, enabled: false }
        }
      }, true);
      toast('↺ Brackets style overrides reset to preset defaults');
    });

    // Mode, Backdrop, Pattern segmented bars
    const bindBkSeg = (id, key) => {
      $(id)?.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-val]');
        if (!btn) return;
        commitState({ brackets: { [key]: btn.dataset.val, introNonce: key === 'mode' ? Date.now() : (state.brackets?.introNonce || 0) } }, true);
      });
    };
    bindBkSeg('seg-bk-mode', 'mode');
    bindBkSeg('seg-bk-bgMode', 'bgMode');
    bindBkSeg('seg-bk-pat', 'pattern');
    bindBkSeg('seg-bk-patDir', 'patternDir');

    // Style, Fonts, Connectors & Branding inputs
    const bindBkSel = (id, key) => $(id)?.addEventListener('change', (e) => commitState({ brackets: { [key]: e.target.value } }, true));
    const bindBkRng = (id, key) => $(id)?.addEventListener('input', (e) => commitState({ brackets: { [key]: Number(e.target.value) } }));
    const bindBkChk = (id, key) => $(id)?.addEventListener('change', (e) => commitState({ brackets: { [key]: e.target.checked } }, true));
    const bindBkTxt = (id, key) => $(id)?.addEventListener('input', (e) => commitState({ brackets: { [key]: e.target.value } }));

    bindBkSel('bk-fontDisplay', 'fontDisplay');
    bindBkSel('bk-fontBody', 'fontBody');
    bindBkRng('rng-bk-fontScale', 'fontScale');
    bindBkSel('bk-headerStyle', 'headerStyle');
    bindBkSel('bk-cellStyle', 'cellStyle');
    bindBkSel('bk-connectorStyle', 'connectorStyle');
    bindBkRng('rng-bk-wireW', 'connectorThickness');
    bindBkRng('rng-bk-radius', 'cellRadius');
    $('bk-bg1')?.addEventListener('input', (e) => commitState({ brackets: { bgMode: 'custom', bgColor1: e.target.value } }));
    $('bk-bg2')?.addEventListener('input', (e) => commitState({ brackets: { bgMode: 'custom', bgColor2: e.target.value } }));
    $('chk-bk-customColors')?.addEventListener('change', (e) => {
      const cc = { ...getBracketsState().customColors, enabled: e.target.checked };
      commitState({ brackets: { customColors: cc } }, true);
    });
    const ccPairs = [
      ['bk-c-frame', 'frameColor'], ['bk-c-accent', 'accentColor'], ['bk-c-accent2', 'accentColor2'],
      ['bk-c-text', 'textColor'], ['bk-c-headBg', 'headBg'], ['bk-c-headText', 'headText'],
      ['bk-c-cellBg', 'cellBg'], ['bk-c-cellText', 'cellText'], ['bk-c-isoBg', 'isoBg'],
      ['bk-c-scoreBg', 'scoreBg'], ['bk-c-winAccent', 'winAccent'], ['bk-c-wireColor', 'wireColor']
    ];
    for (const [id, key] of ccPairs) {
      $(id)?.addEventListener('input', (e) => {
        const cc = { ...getBracketsState().customColors, enabled: true, [key]: e.target.value };
        commitState({ brackets: { customColors: cc } });
      });
    }

    bindBkRng('rng-bk-patSpeed', 'patternSpeed');
    bindBkRng('rng-bk-patOp', 'patternOpacity');
    bindBkRng('rng-bk-patScale', 'patternScale');
    bindBkSel('bk-entryAnim', 'entryAnim');
    bindBkTxt('bk-title', 'title');
    bindBkTxt('bk-subtitle', 'subtitle');
    bindBkTxt('bk-badgeText', 'badgeText');
    bindBkSel('bk-showGfReset', 'showGfReset');
    bindBkChk('chk-bk-flags', 'showFlags');
    bindBkChk('chk-bk-iso', 'showIso');
    bindBkChk('chk-bk-seeds', 'showSeeds');
    bindBkChk('chk-bk-sponsors', 'showSponsors');
    bindBkChk('chk-bk-logo', 'showLogo');
    bindBkChk('chk-bk-ticker', 'showTicker');
    bindBkTxt('bk-tickerText', 'tickerText');

    // Brackets Logo Upload / Clear
    $('btn-bk-logo-up')?.addEventListener('click', () => $('file-bk-logo')?.click());
    $('btn-bk-logo-clr')?.addEventListener('click', () => {
      commitState({ brackets: { logoUrl: '' } }, true);
      toast('Brackets logo override cleared');
    });
    $('file-bk-logo')?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const url = await uploadLocalImage(file, 'branding', 'brackets-event-logo');
        commitState({ brackets: { logoUrl: url, showLogo: true } }, true);
        toast('🏷️ Brackets event logo uploaded');
      } catch (err) {
        toast(`⚠️ ${err.message}`);
      }
      e.target.value = '';
    });

    // Pools / Groups Editor Bindings
    $('bk-pool-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-bk-pool-idx]');
      if (!btn) return;
      bkActivePoolIdx = Number(btn.dataset.bkPoolIdx);
      renderBracketsPoolsEditor(getBracketsState());
    });
    $('bk-poolsPerPage')?.addEventListener('change', (e) => {
      commitState({ brackets: { poolsPerPage: Number(e.target.value), poolsPage: 0 } }, true);
    });
    $('btn-bk-pool-prev')?.addEventListener('click', () => {
      const bk = getBracketsState();
      const total = Math.max(1, Math.ceil((bk.pools || []).length / Math.max(1, Number(bk.poolsPerPage || 4))));
      const next = ((Number(bk.poolsPage || 0) - 1) + total) % total;
      commitState({ brackets: { poolsPage: next } }, true);
    });
    $('btn-bk-pool-next')?.addEventListener('click', () => {
      const bk = getBracketsState();
      const total = Math.max(1, Math.ceil((bk.pools || []).length / Math.max(1, Number(bk.poolsPerPage || 4))));
      const next = (Number(bk.poolsPage || 0) + 1) % total;
      commitState({ brackets: { poolsPage: next } }, true);
    });
    $('btn-bk-add-pool')?.addEventListener('click', () => {
      const pools = structuredClone(getBracketsState().pools || []);
      const idx = pools.length + 1;
      pools.push({
        id: `pool-${Date.now()}`,
        name: `POOL ${String.fromCharCode(64 + Math.min(26, idx))}1`,
        subtitle: 'WAVE A · TOP 2 ADVANCE',
        status: 'upcoming',
        advanceWinners: 1,
        advanceLosers: 1,
        players: [
          { sponsor: '', name: 'PLAYER 1', flag: 'JP', seed: idx * 4 - 3, wins: 0, losses: 0, status: 'alive' },
          { sponsor: '', name: 'PLAYER 2', flag: 'US', seed: idx * 4 - 2, wins: 0, losses: 0, status: 'alive' },
          { sponsor: '', name: 'PLAYER 3', flag: 'ES', seed: idx * 4 - 1, wins: 0, losses: 0, status: 'alive' },
          { sponsor: '', name: 'PLAYER 4', flag: 'FR', seed: idx * 4, wins: 0, losses: 0, status: 'alive' }
        ]
      });
      bkActivePoolIdx = pools.length - 1;
      commitState({ brackets: { pools, mode: 'pools-groups' } }, true);
      toast(`+ Added ${pools[bkActivePoolIdx].name}`);
    });
    $('btn-bk-del-pool')?.addEventListener('click', () => {
      const pools = structuredClone(getBracketsState().pools || []);
      if (pools.length <= 1) return toast('Keep at least 1 pool');
      const removed = pools.splice(bkActivePoolIdx, 1)[0];
      bkActivePoolIdx = Math.max(0, bkActivePoolIdx - 1);
      commitState({ brackets: { pools, poolsPage: 0 } }, true);
      toast(`Removed ${removed?.name || 'Pool'}`);
    });
    const patchActivePool = (mutator, immediate = false) => {
      const pools = structuredClone(getBracketsState().pools || []);
      if (!pools[bkActivePoolIdx]) return;
      mutator(pools[bkActivePoolIdx]);
      commitState({ brackets: { pools } }, immediate);
    };
    $('bk-pool-name')?.addEventListener('input', (e) => patchActivePool(p => { p.name = e.target.value; }));
    $('bk-pool-sub')?.addEventListener('input', (e) => patchActivePool(p => { p.subtitle = e.target.value; }));
    $('bk-pool-status')?.addEventListener('change', (e) => patchActivePool(p => { p.status = e.target.value; }, true));
    $('btn-bk-add-pool-player')?.addEventListener('click', () => {
      patchActivePool(p => {
        p.players = p.players || [];
        p.players.push({ sponsor: '', name: `PLAYER ${p.players.length + 1}`, flag: '', seed: '', wins: 0, losses: 0, status: 'alive' });
      }, true);
    });
    $('btn-bk-show-pools-view')?.addEventListener('click', () => commitState({ brackets: { mode: 'pools-groups', introNonce: Date.now() } }, true));
    $('bk-pool-players-list')?.addEventListener('input', (e) => {
      const el = e.target.closest('[data-pf]');
      if (!el || el.tagName === 'SELECT') return;
      const ri = Number(el.dataset.ri);
      const f = el.dataset.pf;
      patchActivePool(p => {
        if (!p.players?.[ri]) return;
        p.players[ri][f] = (f === 'wins' || f === 'losses') ? Math.max(0, Number(el.value || 0)) : el.value;
      });
    });
    $('bk-pool-players-list')?.addEventListener('change', (e) => {
      const el = e.target.closest('select[data-pf]');
      if (!el) return;
      const ri = Number(el.dataset.ri);
      patchActivePool(p => { if (p.players?.[ri]) p.players[ri][el.dataset.pf] = el.value; }, true);
    });
    $('bk-pool-players-list')?.addEventListener('click', (e) => {
      const fb = e.target.closest('[data-pool-flag]');
      if (fb) return openFlagPicker(`bk-pool-${bkActivePoolIdx}-${fb.dataset.poolFlag}`, 'flag');
      const dl = e.target.closest('[data-pool-del-row]');
      if (dl) {
        const ri = Number(dl.dataset.poolDelRow);
        patchActivePool(p => { if (p.players && p.players.length > 1) p.players.splice(ri, 1); }, true);
      }
    });

    // Pool Tree & Top 16 Bindings
    $('btn-bk-show-pt-view')?.addEventListener('click', () => commitState({ brackets: { mode: 'pool-tree', introNonce: Date.now() } }, true));
    $('btn-bk-show-t16-view')?.addEventListener('click', () => commitState({ brackets: { mode: 'top16-table', introNonce: Date.now() } }, true));
    $('bk-poolTreeTitle')?.addEventListener('input', (e) => commitState({ brackets: { poolTreeTitle: e.target.value } }));
    $('bk-pt-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-pt-slot]');
      if (!btn) return;
      bkActivePtSlot = btn.dataset.ptSlot;
      renderBracketsPoolTreeAndTop16(getBracketsState());
    });
    const patchPtSlot = (mutator, immediate = false) => {
      const slots = structuredClone(getBracketsState().poolTreeSlots || {});
      const cur = slots[bkActivePtSlot] || { id: bkActivePtSlot, state: 'open', winnerSide: null, p1: { name: 'TBD', score: 0 }, p2: { name: 'TBD', score: 0 } };
      cur.p1 = cur.p1 || {};
      cur.p2 = cur.p2 || {};
      mutator(cur);
      slots[bkActivePtSlot] = cur;
      commitState({ brackets: { poolTreeSlots: slots } }, immediate);
    };
    $('bk-pt-state')?.addEventListener('change', (e) => patchPtSlot(s => { s.state = e.target.value; }, true));
    $('bk-pt-winner')?.addEventListener('change', (e) => patchPtSlot(s => { s.winnerSide = e.target.value || null; }, true));
    for (const side of ['p1', 'p2']) {
      $(`bk-pt-${side}-sponsor`)?.addEventListener('input', (e) => patchPtSlot(s => { s[side].sponsor = e.target.value; }));
      $(`bk-pt-${side}-name`)?.addEventListener('input', (e) => patchPtSlot(s => { s[side].name = e.target.value || 'TBD'; }));
      $(`bk-pt-${side}-seed`)?.addEventListener('input', (e) => patchPtSlot(s => { s[side].seed = e.target.value; }));
      $(`bk-pt-${side}-score`)?.addEventListener('input', (e) => patchPtSlot(s => { s[side].score = Math.max(0, Number(e.target.value || 0)); }));
      $(`btn-bk-pt-${side}-flag`)?.addEventListener('click', () => openFlagPicker(`bk-pt-${side}`, 'flag'));
    }

    $('btn-bk-sync-top16')?.addEventListener('click', () => {
      const placements = getResPlacementsClone();
      const existing = structuredClone(getBracketsState().top16Rows || []);
      const merged = Array.from({ length: 16 }, (_, i) => {
        const pl = placements[i];
        const prev = existing[i] || { place: i + 1, sponsor: '', name: `PLAYER ${i + 1}`, flag: '', seed: i + 1, record: '', status: i < 4 ? 'winners' : i < 8 ? 'losers' : 'out', character: '' };
        if (!pl) return prev;
        return {
          ...prev,
          place: pl.place || (i + 1),
          sponsor: pl.sponsor || prev.sponsor || '',
          name: pl.name || prev.name,
          flag: pl.flag || prev.flag || '',
          seed: pl.seed || prev.seed || '',
          character: pl.character || prev.character || ''
        };
      });
      commitState({ brackets: { top16Rows: merged, mode: 'top16-table' } }, true);
      toast('📋 Copied Top 12 Standings into Top 16 Leaderboard');
    });
    const patchT16Row = (ri, field, val, immediate = false) => {
      const rows = structuredClone(getBracketsState().top16Rows || []);
      if (!rows[ri]) return;
      rows[ri][field] = val;
      commitState({ brackets: { top16Rows: rows } }, immediate);
    };
    $('bk-top16-list')?.addEventListener('input', (e) => {
      const el = e.target.closest('[data-t16f]');
      if (!el || el.tagName === 'SELECT') return;
      patchT16Row(Number(el.dataset.ri), el.dataset.t16f, el.value, false);
    });
    $('bk-top16-list')?.addEventListener('change', (e) => {
      const el = e.target.closest('select[data-t16f]');
      if (!el) return;
      patchT16Row(Number(el.dataset.ri), el.dataset.t16f, el.value, true);
    });
    $('bk-top16-list')?.addEventListener('click', (e) => {
      const fb = e.target.closest('[data-t16-flag]');
      if (fb) openFlagPicker(`bk-t16-${fb.dataset.t16Flag}`, 'flag');
    });

    // Click-to-edit message bridge from brackets.html preview iframe!
    window.addEventListener('message', (ev) => {
      const msg = ev.data;
      if (!msg || typeof msg !== 'object') return;
      if (msg.type === 'brackets-select-slot' && msg.slotId) {
        const sid = String(msg.slotId);
        if (BK_PT_DEFS.some(d => d.id === sid)) {
          bkActivePtSlot = sid;
          $('bk-insp-tabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.bkpane === 'extra'));
          document.querySelectorAll('.bk-insp-pane').forEach(p => p.classList.toggle('active', p.id === 'bkpane-extra'));
          renderBracketsPoolTreeAndTop16(getBracketsState());
          toast(`🌿 Editing Pool Tree Slot: ${sid.toUpperCase()}`);
        } else {
          t8EditingSlotId = sid;
          $('bk-insp-tabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.bkpane === 'top8'));
          document.querySelectorAll('.bk-insp-pane').forEach(p => p.classList.toggle('active', p.id === 'bkpane-top8'));
          renderTop8BracketEditorUI();
          toast(`🎯 Editing Bracket Slot: ${sid.toUpperCase()}`);
        }
      } else if (msg.type === 'brackets-select-pool' && msg.poolId) {
        const pools = getBracketsState().pools || [];
        const idx = pools.findIndex(p => String(p.id) === String(msg.poolId));
        if (idx >= 0) {
          bkActivePoolIdx = idx;
          $('bk-insp-tabs')?.querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b.dataset.bkpane === 'pools'));
          document.querySelectorAll('.bk-insp-pane').forEach(p => p.classList.toggle('active', p.id === 'bkpane-pools'));
          renderBracketsPoolsEditor(getBracketsState());
          toast(`📊 Editing ${pools[idx].name}`);
        }
      }
    });

    // 12 Brackets Designs Sidebar
    $('bk-design-search')?.addEventListener('input', (e) => {
      bkDesignSearch = e.target.value;
      renderBracketsDesignCards();
    });
    $('bk-design-filters')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-bcat]');
      if (!btn) return;
      bkDesignCat = btn.dataset.bcat;
      $('bk-design-filters').querySelectorAll('button').forEach(b => b.classList.toggle('active-chip', b === btn));
      renderBracketsDesignCards();
    });
    function buildBuiltInBracketsResetPatch(designId) {
      const cur = state.brackets || {};
      const fresh = structuredClone(DEFAULT_BRACKETS);
      return {
        _silentAudio: true,
        brackets: {
          ...fresh,
          design: designId,
          visible: cur.visible !== false,
          mode: cur.mode || fresh.mode,
          title: cur.title !== undefined ? cur.title : fresh.title,
          subtitle: cur.subtitle !== undefined ? cur.subtitle : fresh.subtitle,
          badgeText: cur.badgeText !== undefined ? cur.badgeText : fresh.badgeText,
          logoUrl: cur.logoUrl || '',
          tickerText: cur.tickerText !== undefined ? cur.tickerText : fresh.tickerText,
          poolsPerPage: cur.poolsPerPage || fresh.poolsPerPage,
          poolsPage: Number(cur.poolsPage || 0),
          pools: Array.isArray(cur.pools) ? structuredClone(cur.pools) : fresh.pools,
          poolTreeTitle: cur.poolTreeTitle !== undefined ? cur.poolTreeTitle : fresh.poolTreeTitle,
          poolTreeSlots: cur.poolTreeSlots ? structuredClone(cur.poolTreeSlots) : fresh.poolTreeSlots,
          top16Rows: Array.isArray(cur.top16Rows) ? structuredClone(cur.top16Rows) : fresh.top16Rows,
          customColors: structuredClone(DEFAULT_BRACKETS.customColors),
          introNonce: Date.now()
        }
      };
    }

    $('bk-design-grid')?.addEventListener('click', (e) => {
      const card = e.target.closest('[data-bk-design]');
      if (!card) return;
      const id = card.dataset.bkDesign;
      const d = BRACKETS_DESIGNS.find(x => x.id === id);
      const wasSame = state.brackets?.design === id;
      commitState(buildBuiltInBracketsResetPatch(id), true);
      toast(wasSame
        ? `↺ Reset to factory defaults: ${d ? d.name : id}`
        : `🌿 Brackets Design loaded (factory defaults): ${d ? d.name : id}`);
    });
  }

  /* =========================================================================
     BOOTSTRAP & SERVER CONNECTION
     ========================================================================= */
  initSelects();
  renderThemeGallery();
  renderBracketsDesignCards();
  setActiveWorkspace(activeWorkspace);
  bindEvents();
  bindTournamentEvents();
  bindVsAndAssetEvents();
  bindBracketsEvents();
  bindResultsEvents();

  if (isHttp) {
    const stateReady = fetch('/api/state').then(r => r.json()).then(s => {
      state = s;
      const initProf = resolveGameProfile(state.theme);
      if (initProf?.previewBg && initProf.previewBg !== 't8' && previewBg === 't8') {
        previewBg = initProf.previewBg;
        if ($('preview-bg-select')) $('preview-bg-select').value = previewBg;
        document.querySelectorAll('[data-bg]').forEach(b => b.classList.toggle('active-chip', b.dataset.bg === previewBg));
      }
      renderUI();
      pushPreviewConfig();
      loadGamesCatalog(false);
    }).catch(() => {});
    fetch('/api/players').then(r => r.json()).then(list => { playersDb = list; renderPlayersDb(); }).catch(() => {});
    fetch('/api/presets').then(r => r.json()).then(list => { presetsDb = list; renderPresetsList(); }).catch(() => {});
    fetch('/api/fonts').then(r => r.json()).then(list => { applyFontsListUpdate(list); }).catch(() => {});
    fetch('/api/history').then(r => r.json()).then(list => { historyDb = list; renderHistoryList(); pushPreviewConfig(); }).catch(() => {});
    const cfgReady = fetch('/api/integrations').then(r => r.json()).then(cfg => {
      trnState.config = cfg;
      trnState.provider = cfg.provider || 'startgg';
      updateProviderFormUI();
      return cfg;
    }).catch(() => null);
    Promise.all([stateReady, cfgReady]).then(([, cfg]) => {
      if (!cfg) return;
      const hasSavedTournament =
        (cfg.provider === 'startgg' && cfg.startggUrl && cfg.hasStartggToken) ||
        (cfg.provider === 'challonge' && cfg.challongeUrl && cfg.hasChallongeKey);
      if (hasSavedTournament && state.vs?.autoEventLogo !== false && !state.vs?.logoUrl && state.vs?.logoSource !== 'manual') {
        syncEventLogoFromTournament(true);
      }
    }).catch(() => {});

    const refreshInfo = () => {
      fetch('/api/info').then(r => r.json()).then(info => {
        $('obs-url-text').textContent = info.overlayUrl;
        if (info.vsOverlayUrl) $('vs-url-text').textContent = info.vsOverlayUrl;
        if (info.bracketsOverlayUrl && $('brackets-url-text')) $('brackets-url-text').textContent = info.bracketsOverlayUrl;
        if ((info.top8OverlayUrl || info.resultsOverlayUrl) && $('results-url-text')) $('results-url-text').textContent = info.top8OverlayUrl || info.resultsOverlayUrl;
        $('dock-url-text').textContent = info.panelUrl;
        const ifaces = Array.isArray(info.networkInterfaces) ? info.networkInterfaces : [];
        const primaryLan = ifaces.find(n => n.kind === 'lan') || ifaces[0];
        const finalLanUrl = primaryLan?.url || info.lanPanelUrls?.[0] || info.panelUrl;
        $('lan-url-text').textContent = finalLanUrl;
        if (window.FGC_QR && finalLanUrl && !$('lan-qr-box')?.innerHTML) {
          try {
            const svg = window.FGC_QR.renderSvg(finalLanUrl, { quiet: 3 });
            if ($('lan-qr-box')) $('lan-qr-box').innerHTML = svg;
            if ($('qr-zoom-svg')) $('qr-zoom-svg').innerHTML = svg;
            if ($('qr-zoom-url')) $('qr-zoom-url').textContent = finalLanUrl;
          } catch {}
        }
        if ($('lan-iface-badge')) {
          $('lan-iface-badge').textContent = primaryLan ? `(${primaryLan.name})` : '';
        }
        if ($('lan-alt-list')) {
          const extras = ifaces.filter(n => n.url !== $('lan-url-text').textContent);
          $('lan-alt-list').innerHTML = extras.map(n => {
            const tag = n.kind === 'vpn' ? 'VPN' : n.kind === 'virtual' ? 'Virtual' : 'LAN';
            return `<button type="button" data-copy-alt-lan="${n.url}" style="padding:2px 7px;font-size:10px;opacity:${n.kind === 'lan' ? '1' : '0.68'};" title="Click to copy ${n.url}">[${tag}] ${n.name}: ${n.ip}</button>`;
          }).join('');
        }
        $('conn-pill').classList.remove('offline');
        $('conn-pill').classList.add('online');
        const cap = Number(info.maxClients || 64);
        const active = Number(info.connectedClients || 0);
        $('conn-pill').classList.toggle('is-warn', cap > 0 && active / cap >= 0.75);
        $('conn-text').textContent = `Local Server OK · ${active} overlay(s)`;
      }).catch(() => {
        $('conn-pill').classList.remove('online', 'is-warn');
        $('conn-pill').classList.add('offline');
        $('conn-text').textContent = 'Server offline';
      });
    };
    refreshInfo();
    setInterval(refreshInfo, 4000);

    // Receive live updates from sibling tabs or the shared SSE leader tab (zero extra sockets!)
    if (bc) {
      bc.onmessage = (ev) => {
        if (ev.data?.type === 'state' && ev.data.payload) {
          const incoming = ev.data.payload;
          if (incoming._cid === CLIENT_ID && Number(incoming._seq || 0) <= localSeq) return;
          state = incoming;
          renderUI();
          pushPreviewConfig();
        } else if (ev.data?.type === 'fonts' && Array.isArray(ev.data.payload)) {
          applyFontsListUpdate(ev.data.payload);
        }
      };
    }

    // Single-SSE Leader Election per browser origin (prevents Chrome 6-socket HTTP/1.1 exhaustion!)
    let activeEs = null;
    let sseReconnectTimer = null;
    let pageUnloading = false;
    const closePanelSSE = () => {
      pageUnloading = true;
      clearTimeout(sseReconnectTimer);
      if (activeEs) { try { activeEs.close(); } catch {} activeEs = null; }
    };
    window.addEventListener('pagehide', closePanelSSE);
    window.addEventListener('beforeunload', closePanelSSE);

    const connectPanelSSE = () => {
      if (pageUnloading) return;
      if (activeEs) { try { activeEs.close(); } catch {} }
      const es = new EventSource('/api/events?client=panel' + (window.obsstudio ? '&obs=1' : ''));
      activeEs = es;
      es.addEventListener('sessions', (ev) => {
        try {
          const snap = JSON.parse(ev.data);
          window.__FGC_SESSIONS_UI__?.onSessionsPush(snap);
          if (bc) bc.postMessage({ type: 'sessions', payload: snap, fromSse: true });
        } catch {}
      });
      es.addEventListener('state', (ev) => {
        try {
          const data = JSON.parse(ev.data);
          // Skip our own in-flight / already-rendered echoes so rapid clicks & sliders never jitter
          if (data._cid === CLIENT_ID && Number(data._seq || 0) <= localSeq) return;
          state = data;
          renderUI();
          window.__FGC_AUDIO_UI__?.refresh();
          pushPreviewConfig();
          if (bc) bc.postMessage({ type: 'state', payload: data, fromSse: true });
        } catch {}
      });
      es.addEventListener('fonts', (ev) => {
        try {
          const list = JSON.parse(ev.data);
          applyFontsListUpdate(list);
          if (bc) bc.postMessage({ type: 'fonts', payload: list, fromSse: true });
        } catch {}
      });
      es.addEventListener('sfx', (ev) => {
        try {
          const list = JSON.parse(ev.data);
          window.__FGC_AUDIO_UI__?.syncSfxList(list);
          if (bc) bc.postMessage({ type: 'sfx', payload: list, fromSse: true });
        } catch {}
      });
      es.addEventListener('audio', (ev) => {
        try {
          const payload = JSON.parse(ev.data);
          if (bc) bc.postMessage({ type: 'audio', payload, fromSse: true });
        } catch {}
      });
      es.onerror = () => {
        if (activeEs === es) activeEs = null;
        try { es.close(); } catch {}
        clearTimeout(sseReconnectTimer);
        if (!pageUnloading) sseReconnectTimer = setTimeout(connectPanelSSE, 2000);
      };
    };

    if (navigator.locks && typeof navigator.locks.request === 'function' && bc) {
      navigator.locks.request('fgc_open_scorebar_sse_leader', () => new Promise((resolve) => {
        if (pageUnloading) return resolve();
        connectPanelSSE();
        window.addEventListener('pagehide', resolve, { once: true });
        window.addEventListener('beforeunload', resolve, { once: true });
      })).catch(() => connectPanelSSE());
    } else {
      connectPanelSSE();
    }
  } else {
    $('conn-pill').classList.add('online');
    $('conn-text').textContent = 'Local File Mode (BroadcastChannel)';
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) state = JSON.parse(cached);
    } catch {}
    renderUI();
    renderPlayersDb();
  }

  // Bilingual EN / ES Language Switcher (persists in localStorage)
  $('seg-lang')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-lang]');
    if (!btn || !window.FGC_I18N) return;
    const next = btn.dataset.lang;
    window.FGC_I18N.setLang(next);
    toast(next === 'es' ? '🌐 Idioma: Español' : '🌐 Language: English');
    if (lastUpdateInfo) renderUpdateUI(lastUpdateInfo);
  });
  window.FGC_I18N?.init();

  /* =========================================================================
     VERSION CHECKER & 1-CLICK DATA-SAFE AUTO-UPDATER UI
     ========================================================================= */
  const DISMISSED_VER_KEY = 'fgc_dismissed_update_ver_v1';
  let lastUpdateInfo = null;
  let updateBusy = false;

  const isEs = () => (window.FGC_I18N?.getLang?.() === 'es');

  function renderUpdateUI(info) {
    lastUpdateInfo = info;
    const pill = $('btn-update-pill');
    const banner = $('update-banner-wrap');
    const bannerTxt = $('update-banner-text');
    const curEl = $('upd-cur-ver');
    const latEl = $('upd-lat-ver');
    const callout = $('upd-status-callout');
    const notesWrap = $('upd-notes-wrap');
    const notesBox = $('upd-notes-box');
    const applyBtn = $('btn-upd-apply');
    const ghLnk = $('lnk-upd-github');

    const curV = info?.currentVersion ? `v${info.currentVersion}` : 'v2.8.0';
    const latV = info?.latestVersion ? `v${info.latestVersion}` : (isEs() ? 'Sin conexión' : 'Offline');
    if (curEl) curEl.textContent = curV;
    if (latEl) latEl.textContent = latV;
    if (ghLnk && info?.releaseUrl) ghLnk.href = info.releaseUrl;
    const safeNotice = $('upd-safe-notice');
    if (safeNotice) {
      safeNotice.innerHTML = isEs()
        ? '🛡️ <b>Actualización 100% segura para tus datos:</b> Solo se actualizan los archivos de la app — tu carpeta <code>data/</code> (jugadores guardados, tokens de Start.gg/Challonge, presets, fuentes propias del PC y renders en caché) nunca se toca.'
        : '🛡️ <b>100% Data-Safe Update:</b> Updating only refreshes the app files — your <code>data/</code> folder (saved players, Start.gg/Challonge tokens, presets, custom PC fonts, and cached renders) is never touched.';
    }

    pill?.classList.remove('is-latest', 'has-update');
    if (info?.status === 'update-available') {
      if (pill) {
        pill.classList.add('has-update');
        pill.textContent = isEs() ? `⬇ Actualizar ${latV}` : `⬇ Update ${latV}`;
        pill.title = isEs() ? `Nueva versión ${latV} disponible (tienes ${curV})` : `New version ${latV} available (installed ${curV})`;
      }
      if (latEl) latEl.style.color = '#fef08a';
      if (callout) {
        callout.className = 'guide-callout';
        callout.innerHTML = isEs()
          ? `🚀 <b>Nueva versión disponible: ${latV}</b> (${info.releaseTitle || latV}). Puedes autodescargarla e instalarla en 1 clic o mantener tu versión actual (${curV}).`
          : `🚀 <b>New version available: ${latV}</b> (${info.releaseTitle || latV}). Auto-download and install in 1 click, or stay on your current version (${curV}).`;
      }
      if (bannerTxt) {
        bannerTxt.textContent = isEs()
          ? `Nueva versión disponible: ${latV} (tienes ${curV}). Puedes actualizar en 1 clic o quedarte en la actual.`
          : `New version available: ${latV} (installed ${curV}). Auto-update in 1 click or stay on your current version.`;
      }
      if (applyBtn) applyBtn.style.display = 'inline-flex';
      if (notesWrap && notesBox) {
        notesWrap.style.display = info.notes ? 'block' : 'none';
        notesBox.textContent = info.notes || '';
      }
      let dismissed = '';
      try { dismissed = localStorage.getItem(DISMISSED_VER_KEY) || ''; } catch {}
      if (banner) banner.classList.toggle('show', dismissed !== info.latestVersion);
    } else if (info?.status === 'up-to-date' || info?.status === 'ahead') {
      if (pill) {
        pill.classList.add('is-latest');
        pill.textContent = `✓ ${curV}`;
        pill.title = isEs() ? 'Tienes la versión más reciente — clic para comprobar' : 'Up to date — click to check for updates';
      }
      if (latEl) latEl.style.color = '#86efac';
      if (callout) {
        callout.className = 'guide-callout safe';
        callout.innerHTML = info.status === 'ahead'
          ? (isEs() ? `✅ <b>Versión local más reciente (${curV})</b> — Estás por delante de la última release publicada (${latV}).`
                    : `✅ <b>Local build ahead (${curV})</b> — Newer than the latest published GitHub release (${latV}).`)
          : (isEs() ? `✅ <b>¡Estás al día!</b> Tienes instalada la última versión disponible (${curV}).`
                    : `✅ <b>You're up to date!</b> You already have the latest version (${curV}).`);
      }
      if (applyBtn) applyBtn.style.display = 'none';
      if (notesWrap) notesWrap.style.display = 'none';
      if (banner) banner.classList.remove('show');
    } else {
      if (pill) {
        pill.textContent = `${curV}`;
        pill.title = isEs() ? 'Sin conexión para comprobar actualizaciones' : 'Offline — could not check GitHub for updates';
      }
      if (latEl) latEl.style.color = '#94a3b8';
      if (callout) {
        callout.className = 'guide-callout';
        callout.innerHTML = isEs()
          ? `📡 <b>Modo sin conexión:</b> No se pudo conectar con GitHub Releases. Todo funciona 100% en local con tu versión actual (${curV}).`
          : `📡 <b>Offline mode:</b> Could not reach GitHub Releases. Everything continues working 100% locally on ${curV}.`;
      }
      if (applyBtn) applyBtn.style.display = 'none';
      if (notesWrap) notesWrap.style.display = 'none';
      if (banner) banner.classList.remove('show');
    }
  }

  async function checkForUpdates(force = false) {
    if (!isHttp) {
      renderUpdateUI({ status: 'offline', currentVersion: '2.8.0' });
      return;
    }
    try {
      const r = await fetch(`/api/update/check${force ? '?force=1' : ''}`, { cache: 'no-store' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const info = await r.json();
      renderUpdateUI(info);
      if (force) {
        if (info.status === 'update-available') toast(isEs() ? `⬇ Nueva versión v${info.latestVersion} disponible` : `⬇ Update v${info.latestVersion} available`);
        else if (info.status === 'offline') toast(isEs() ? '📡 Sin conexión con GitHub' : '📡 Offline — cannot reach GitHub');
        else toast(isEs() ? `✅ Estás al día (v${info.currentVersion})` : `✅ Up to date (v${info.currentVersion})`);
      }
    } catch {
      renderUpdateUI({ status: 'offline', currentVersion: lastUpdateInfo?.currentVersion || '2.8.0' });
    }
  }

  async function runAutoUpdateNow() {
    if (updateBusy || !isHttp) return;
    updateBusy = true;
    const prog = $('upd-progress-msg');
    const applyBtn = $('btn-upd-apply');
    const keepBtn = $('btn-upd-keep');
    const recheckBtn = $('btn-upd-recheck');
    $('update-modal')?.classList.add('open');
    if (applyBtn) applyBtn.disabled = true;
    if (keepBtn) keepBtn.disabled = true;
    if (recheckBtn) recheckBtn.disabled = true;
    if (prog) {
      prog.style.display = 'block';
      prog.textContent = isEs()
        ? '⏳ Descargando e instalando la última versión desde GitHub (tus datos en data/ están a salvo)...'
        : '⏳ Downloading & installing latest release from GitHub (your data/ folder stays safe)...';
    }
    try {
      const res = await fetch('/api/update/apply', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Update failed');
      if (data.alreadyUpToDate) {
        if (prog) {
          prog.style.color = '#86efac';
          prog.textContent = isEs()
            ? `✅ Ya tienes la versión más reciente (v${data.updatedTo}).`
            : `✅ You already have the latest version (v${data.updatedTo}).`;
        }
        if (applyBtn) applyBtn.disabled = false;
        if (keepBtn) keepBtn.disabled = false;
        if (recheckBtn) recheckBtn.disabled = false;
        updateBusy = false;
        return;
      }
      try { localStorage.removeItem(DISMISSED_VER_KEY); } catch {}
      if (prog) {
        prog.style.color = '#86efac';
        prog.textContent = isEs()
          ? `✅ ¡Actualizado a v${data.updatedTo} (${data.filesUpdated} archivos)! Reiniciando servidor y recargando panel...`
          : `✅ Updated to v${data.updatedTo} (${data.filesUpdated} files)! Restarting server & reloading panel...`;
      }
      await fetch('/api/update/restart', { method: 'POST' }).catch(() => {});
      // Poll /api/info until freshly restarted server responds, then reload!
      let tries = 0;
      const pollRestart = setInterval(async () => {
        tries++;
        try {
          const ping = await fetch('/api/info', { cache: 'no-store' });
          if (ping.ok) {
            clearInterval(pollRestart);
            location.reload();
          }
        } catch {}
        if (tries >= 25) {
          clearInterval(pollRestart);
          if (prog) {
            prog.textContent = isEs()
              ? '✅ Archivos actualizados. Reinicia Start_Scorebar.bat y pulsa Ctrl+F5 para recargar.'
              : '✅ Files updated! Restart Start_Scorebar.bat and press Ctrl+F5 to reload.';
          }
          updateBusy = false;
        }
      }, 650);
    } catch (err) {
      if (prog) {
        prog.style.color = '#fca5a5';
        prog.textContent = `⚠️ ${err.message}`;
      }
      if (applyBtn) applyBtn.disabled = false;
      if (keepBtn) keepBtn.disabled = false;
      if (recheckBtn) recheckBtn.disabled = false;
      updateBusy = false;
    }
  }

  const dismissCurrentUpdate = () => {
    if (lastUpdateInfo?.latestVersion) {
      try { localStorage.setItem(DISMISSED_VER_KEY, lastUpdateInfo.latestVersion); } catch {}
    }
    $('update-banner-wrap')?.classList.remove('show');
    $('update-modal')?.classList.remove('open');
    toast(isEs() ? '✓ Manteniendo tu versión actual' : '✓ Keeping your current version');
  };

  $('btn-update-pill')?.addEventListener('click', () => {
    $('update-modal')?.classList.add('open');
    if (!lastUpdateInfo) checkForUpdates(false);
  });
  $('btn-close-update-modal')?.addEventListener('click', () => { if (!updateBusy) $('update-modal')?.classList.remove('open'); });
  $('update-modal')?.addEventListener('click', (e) => { if (e.target === $('update-modal') && !updateBusy) $('update-modal').classList.remove('open'); });
  $('btn-upd-recheck')?.addEventListener('click', () => checkForUpdates(true));
  $('btn-upd-keep')?.addEventListener('click', dismissCurrentUpdate);
  $('btn-banner-keep')?.addEventListener('click', dismissCurrentUpdate);
  $('btn-banner-details')?.addEventListener('click', () => $('update-modal')?.classList.add('open'));
  $('btn-banner-update-now')?.addEventListener('click', runAutoUpdateNow);
  $('btn-upd-apply')?.addEventListener('click', runAutoUpdateNow);

  window.__FGC_PANEL__ = {
    getState: () => state,
    commitState,
    isHttp,
    toast,
    getPlayersDb: () => playersDb,
    getPresetsDb: () => presetsDb,
    setPresetsDb: (list) => { presetsDb = Array.isArray(list) ? list : []; renderPresetsList(); },
    renderThemeGallery,
    renderVsDesignCards,
    renderBracketsDesignCards,
    renderResultsDesignCards,
    buildThemeMiniPreview,
    getThemeGameMeta,
    THEMES,
    VS_DESIGNS,
    BRACKETS_DESIGNS,
    RESULTS_DESIGNS,
    DEFAULT_STATE_REF: {
      DEFAULT_TWEAKS,
      DEFAULT_STYLE,
      DEFAULT_LAYOUT_POS,
      DEFAULT_EVENT_BAR,
      DEFAULT_COMMENTATORS,
      DEFAULT_VS,
      DEFAULT_BRACKETS,
      DEFAULT_RESULTS
    },
    buildScorebarSnapshot: (name) => window.__sbPresetHelpers?.buildSavedPresetSnapshot(name) || { scope: 'scorebar', name, theme: state.theme },
    applyScorebarSnapshot: (p) => window.__sbPresetHelpers?.applySavedPresetSnapshot(p),
    setActiveWorkspace,
    getCurrentCats: () => ({ sb: currentCat, vs: vsDesignCat, bk: bkDesignCat, res: resDesignCat })
  };

  setTimeout(() => checkForUpdates(false), 900);
})();
