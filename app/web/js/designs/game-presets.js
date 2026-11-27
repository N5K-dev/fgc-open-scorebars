/**
 * FGC Open Scorebars — Scalable Multi-Game Preset Registry (0 dependencies)
 * Separates game identity, HUD safe-zones, dynamic competitive fields, visual presets,
 * and asset mappings so Tekken 8, Street Fighter 6, 2XKO, Fatal Fury: CotW,
 * Super Smash Bros. Ultimate, and future titles coexist cleanly without duplication.
 */
(function (global) {
  'use strict';

  /* =========================================================================
     1. GAME PROFILES (Identity, HUD Geometry, Asset Mapping & Competitive Fields)
     ========================================================================= */
  const GAME_PROFILES = {
    tekken8: {
      id: 'tekken8',
      assetGameId: 'tekken8',
      name: 'Tekken 8',
      shortName: 'T8',
      previewBg: 't8',
      defaultFormat: 'FT3',
      hudType: 'top-wings',
      supportsPartner: false,
      supportsSecondaryChar: false,
      supportsStockIcon: false,
      supportsVariant: false,
      supportsStage: false,
      variantLabel: '',
      variantOptions: []
    },
    sf6: {
      id: 'sf6',
      assetGameId: 'sf6',
      name: 'Street Fighter 6',
      shortName: 'SF6',
      previewBg: 'sf6',
      defaultFormat: 'FT3',
      hudType: 'top-wings',
      supportsPartner: false,
      supportsSecondaryChar: false,
      supportsStockIcon: false,
      supportsVariant: false,
      supportsStage: false,
      variantLabel: '',
      variantOptions: []
    },
    '2xko': {
      id: '2xko',
      assetGameId: 'riotpl',
      name: '2XKO',
      shortName: '2XKO',
      previewBg: '2xko',
      defaultFormat: 'FT3',
      hudType: '2xko-tag',
      supportsPartner: true,
      supportsSecondaryChar: true,
      supportsStockIcon: false,
      supportsVariant: true,
      supportsStage: false,
      variantLabel: 'Fuse',
      variantOptions: ['2X Assist', 'Double Down', 'Freestyle', 'Juggernaut', 'Sidekick', 'Teamfight'],
      fallbackChars: [
        'Ahri', 'Braum', 'Caitlyn', 'Darius', 'Ekko', 'Illaoi', 'Jinx', 'Teemo', 'Vi', 'Warwick', 'Yasuo'
      ]
    },
    ffcotw: {
      id: 'ffcotw',
      assetGameId: 'ffcotw',
      name: 'Fatal Fury: City of the Wolves',
      shortName: 'CotW',
      previewBg: 'ffcotw',
      defaultFormat: 'FT3',
      hudType: 'ffcotw-hud',
      supportsPartner: false,
      supportsSecondaryChar: false,
      supportsStockIcon: false,
      supportsVariant: true,
      supportsStage: false,
      variantLabel: 'Control Style',
      variantOptions: ['Arcade Style', 'Smart Style'],
      fallbackChars: [
        'Andy Bogard', 'B. Jenet', 'Billy Kane', 'Blue Mary', 'Chun-Li', 'Cristiano Ronaldo',
        'Duck King', 'Gato', 'Hokutomaru', 'Hotaru Futaba', 'Joe Higashi', 'Kain R. Heinlein',
        'Ken Masters', 'Kevin Rian', 'Kim Dong Hwan', 'Kim Jae Hoon', 'Mai Shiranui',
        'Marco Rodrigues', 'Mr. Big', 'Nightmare Geese', 'Preecha', 'Rock Howard',
        'Salvatore Ganacci', 'Terry Bogard', 'Tizoc', 'Vox Reaper', 'Wolfgang Krauser'
      ]
    },
    ssbu: {
      id: 'ssbu',
      assetGameId: 'ssbu',
      name: 'Super Smash Bros. Ultimate',
      shortName: 'SSBU',
      previewBg: 'ssbu',
      defaultFormat: 'BO5',
      hudType: 'ssbu-native',
      supportsPartner: true,
      supportsSecondaryChar: false,
      supportsStockIcon: true,
      supportsVariant: true,
      supportsStage: true,
      variantLabel: 'Port Color',
      variantOptions: ['P1 Red', 'P2 Blue', 'P3 Yellow', 'P4 Green', 'P5 Orange', 'P6 Cyan', 'P7 Pink', 'P8 Purple'],
      portColors: {
        'P1 Red': '#ff3837',
        'P2 Blue': '#308aff',
        'P3 Yellow': '#ffbc16',
        'P4 Green': '#29b548',
        'P5 Orange': '#fa8737',
        'P6 Cyan': '#2ed2eb',
        'P7 Pink': '#ff6b9d',
        'P8 Purple': '#9471ff'
      },
      fallbackStages: [
        'Battlefield', 'Small Battlefield', 'Final Destination', 'Pokemon Stadium 2',
        'Smashville', 'Town and City', 'Kalos Pokemon League', 'Hollow Bastion', 'Yoshi\'s Story'
      ],
      fallbackChars: [
        'Banjo & Kazooie', 'Bayonetta', 'Bowser', 'Byleth', 'Captain Falcon', 'Chrom', 'Cloud',
        'Corrin', 'Diddy Kong', 'Donkey Kong', 'Falco', 'Fox', 'Ganondorf', 'Greninja', 'Hero',
        'Incineroar', 'Inkling', 'Jigglypuff', 'Joker', 'Kazuya', 'Ken', 'King K. Rool', 'Kirby',
        'Link', 'Lucina', 'Luigi', 'Mario', 'Marth', 'Mega Man', 'Meta Knight', 'Mewtwo',
        'Min Min', 'Mr. Game & Watch', 'Mythra', 'Ness', 'Pac-Man', 'Palutena', 'Peach', 'Pikachu',
        'Pokemon Trainer', 'Pyra', 'R.O.B.', 'Richter', 'Ridley', 'Roy', 'Ryu', 'Samus', 'Sephiroth',
        'Sheik', 'Shulk', 'Snake', 'Sonic', 'Sora', 'Steve', 'Terry', 'Toon Link', 'Villager',
        'Wario', 'Wolf', 'Yoshi', 'Young Link', 'Zelda', 'Zero Suit Samus'
      ]
    },
    avatar: {
      id: 'avatar',
      assetGameId: 'altfg',
      name: 'Avatar Legends: The Fighting Game',
      shortName: 'AVATAR',
      previewBg: 'avatar',
      defaultFormat: 'FT3',
      hudType: 'avatar-hud',
      supportsPartner: false,
      supportsSecondaryChar: false,
      supportsStockIcon: false,
      supportsVariant: true,
      supportsStage: false,
      variantLabel: 'Support',
      variantOptions: [
        'Appa', 'Badgermole', 'Dark Spirit', 'Ghazan', 'Guru Pathik', 'Gyatso', 'Hakoda',
        'Imperial Firebender', 'Joo Dee', 'June', 'Kanna', 'Katara', 'Kelsang', 'Li & Lo',
        'Mai', 'Master Pakku', 'Ming-Hua', 'Momo', 'Naga', 'P\'Li', 'Piandao', 'Raava',
        'Ran & Shaw', 'Rangi', 'Roku', 'Sozin', 'Suki', 'The Big Bad Hippo', 'The Boulder',
        'Tonraq', 'Unalaq', 'Ursa', 'Vaatu', 'Yue', 'Yun', 'Zhao'
      ],
      fallbackChars: [
        'Aang', 'Avatar State Aang', 'Azula', 'Bolin', 'Iroh', 'Katara', 'Korra', 'Kyoshi',
        'Lin', 'Nightmare Korra', 'Ozai', 'Sokka', 'Tagah', 'Toph', 'Ty Lee', 'Zaheer', 'Zuko'
      ]
    },
    mk1: {
      id: 'mk1',
      assetGameId: 'mk1',
      name: 'Mortal Kombat 1',
      shortName: 'MK1',
      previewBg: 'mk1',
      defaultFormat: 'FT3',
      hudType: 'mk1-hud',
      supportsPartner: false,
      supportsSecondaryChar: false,
      supportsStockIcon: false,
      supportsVariant: true,
      supportsStage: false,
      variantLabel: 'Kameo',
      variantOptions: [
        'Cyrax', 'Darrius', 'Ferra', 'Frost', 'Goro', 'Jackson "Jax" Briggs', 'Janet Cage',
        'Kano', 'Khameleon', 'Kung Lao', 'Madam Bo', 'Mavado', 'Motaro', 'Sareena',
        'Scorpion', 'Sektor', 'Shujinko', 'Sonya Blade', 'Stryker', 'Sub-Zero', 'Tremor'
      ],
      fallbackChars: [
        'Ashrah', 'Baraka', 'Conan the Barbarian', 'Cyrax', 'Ermac', 'General Shao', 'Geras',
        'Ghostface', 'Havik', 'Homelander', 'Johnny Cage', 'Kenshi Takahashi', 'Kitana',
        'Kung Lao', 'Li Mei', 'Liu Kang', 'Mileena', 'Nitara', 'Noob Saibot', 'Omni-Man',
        'Peacemaker', 'Quan Chi', 'Raiden', 'Rain', 'Reiko', 'Reptile', 'Scorpion', 'Sektor',
        'Shang Tsung', 'Sindel', 'Smoke', 'Sub-Zero', 'T-1000', 'Takeda Takahashi', 'Tanya'
      ]
    }
  };

  /* =========================================================================
     2. BESPOKE GAME SCOREBAR PRESETS (2XKO, FATAL FURY: COTW, AVATAR, MK1, SSBU, T8 META)
     ========================================================================= */
  const GAME_THEMES = [
    /* --- 2XKO (Riot Tag Fighter — 7 Bespoke Presets calibrated to 35px top HUD safe strip!) --- */
    {
      id: '2xko-tag-pro',
      name: '★ 2XKO Tag Duo Pro HUD',
      cat: '2xko',
      gameProfile: '2xko',
      gameTag: '2XKO',
      is2v2: false,
      layout: '2XKO Tag',
      colors: ['#ccff00', '#0b0e14', '#00f5a0'],
      cfg: {
        gameProfile: '2xko',
        layout: '2xko-tag',
        scorePos: 'inner',
        flagStyle: 'blade-twt',
        centerStyle: 'hex',
        outerBlade: 'on',
        slant: 14,
        font: 'Chakra Petch',
        italic: true
      },
      pv: {
        lay: 'blade', sh: 'blade', fs: 'blade', cs: 'hex', edge: true,
        bg1: 'linear-gradient(90deg, #0b0e14 0%, #111927 100%)',
        bg2: 'linear-gradient(270deg, #0b0e14 0%, #111927 100%)',
        p1: '#ccff00', p2: '#00e5ff',
        sc1: 'linear-gradient(135deg, #ccff00, #84cc16)',
        sc2: 'linear-gradient(135deg, #00e5ff, #0284c7)',
        sct: '#090c10', sct2: '#061018',
        cbg: 'linear-gradient(180deg, #121822, #090c11)',
        cborder: '#ccff00', ct: '#ccff00', tx: '#ffffff',
        sp1: '#ccff00', sp2: '#38bdf8',
        glow1: 'rgba(204,255,0,0.32)', glow2: 'rgba(0,229,255,0.32)',
        hudKind: '2xko'
      },
      desc: 'Calibrated to 2XKO HUD: slim top bars clearing dual portraits, stacked health & BREAK gauges, open center crest, dual champions & Fuse badge.'
    },
    {
      id: '2xko-pulse-neon',
      name: '★ 2XKO Runeterra Pulse',
      cat: '2xko',
      gameProfile: '2xko',
      gameTag: '2XKO',
      is2v2: false,
      layout: '2XKO Neon',
      colors: ['#ff2e63', '#120c24', '#00f0ff'],
      cfg: {
        gameProfile: '2xko',
        layout: '2xko-tag',
        scorePos: 'inner',
        flagStyle: 'fade-blend',
        centerStyle: 'trapezoid',
        outerBlade: 'on',
        slant: 14,
        font: 'Orbitron',
        italic: true
      },
      pv: {
        lay: 'blade', sh: 'blade', fs: 'fade', cs: 'trap', edge: true,
        bg1: 'linear-gradient(90deg, #1b0a1e 0%, #101324 100%)',
        bg2: 'linear-gradient(270deg, #091a2a 0%, #101324 100%)',
        p1: '#ff2e63', p2: '#00f0ff',
        sc1: 'linear-gradient(135deg, #ff2e63, #be123c)',
        sc2: 'linear-gradient(135deg, #00f0ff, #2563eb)',
        sct: '#ffffff', sct2: '#06111e',
        cbg: 'linear-gradient(180deg, #19132c, #0a0814)',
        cborder: '#facc15', ct: '#fde047', tx: '#ffffff',
        sp1: '#ff6b8b', sp2: '#67e8f9',
        glow1: 'rgba(255,46,99,0.34)', glow2: 'rgba(0,240,255,0.34)',
        hudKind: '2xko'
      },
      desc: 'High-voltage crimson vs. cyber-cyan 2XKO scorebar with point+assist champion tags, smooth fade flags, and official Fuse icon support.'
    },
    {
      id: '2xko-zaun-chemtech',
      name: '★ 2XKO Zaun Chemtech',
      cat: '2xko',
      gameProfile: '2xko',
      gameTag: '2XKO',
      is2v2: false,
      layout: '2XKO Zaun',
      colors: ['#10b981', '#071412', '#ec4899'],
      cfg: {
        gameProfile: '2xko',
        layout: '2xko-tag',
        scorePos: 'inner',
        flagStyle: 'blade-twt',
        centerStyle: 'hex',
        outerBlade: 'on',
        slant: 16,
        font: 'Chakra Petch',
        italic: true
      },
      pv: {
        lay: 'blade', sh: 'blade', fs: 'blade', cs: 'hex', edge: true,
        bg1: 'linear-gradient(90deg, #061b16 0%, #0d161b 100%)',
        bg2: 'linear-gradient(270deg, #21091c 0%, #10121b 100%)',
        p1: '#10b981', p2: '#ec4899',
        sc1: 'linear-gradient(135deg, #34d399, #059669)',
        sc2: 'linear-gradient(135deg, #f472b6, #db2777)',
        sct: '#051510', sct2: '#ffffff',
        cbg: 'linear-gradient(180deg, #0d1f1b, #060d0c)',
        cborder: '#34d399', ct: '#6ee7b7', tx: '#f8fafc',
        sp1: '#34d399', sp2: '#f472b6',
        glow1: 'rgba(16,185,129,0.38)', glow2: 'rgba(236,72,153,0.38)',
        hudKind: '2xko'
      },
      desc: 'Zaun Undercity chemtech-emerald vs. Jinx shimmer-magenta angled blades calibrated to 2XKO top HUD with radioactive hex center crest.'
    },
    {
      id: '2xko-piltover-gold',
      name: '★ 2XKO Piltover Hextech',
      cat: '2xko',
      gameProfile: '2xko',
      gameTag: '2XKO',
      is2v2: false,
      layout: '2XKO Hex',
      colors: ['#eab308', '#0f172a', '#38bdf8'],
      cfg: {
        gameProfile: '2xko',
        layout: '2xko-tag',
        scorePos: 'inner',
        flagStyle: 'bezel',
        centerStyle: 'hex',
        outerBlade: 'on',
        slant: 12,
        font: 'Exo 2',
        italic: false
      },
      pv: {
        lay: 'blade', sh: 'diag', fs: 'bezel', cs: 'hex', edge: true,
        bg1: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
        bg2: 'linear-gradient(270deg, #0f172a 0%, #1e293b 100%)',
        p1: '#eab308', p2: '#38bdf8',
        sc1: 'linear-gradient(135deg, #fde047, #ca8a04)',
        sc2: 'linear-gradient(135deg, #38bdf8, #0284c7)',
        sct: '#0b0e14', sct2: '#05121e',
        cbg: 'linear-gradient(180deg, #172554, #0b1224)',
        cborder: '#eab308', ct: '#fde047', tx: '#ffffff',
        sp1: '#fde047', sp2: '#7dd3fc',
        glow1: 'rgba(234,179,8,0.34)', glow2: 'rgba(56,189,248,0.34)',
        hudKind: '2xko'
      },
      desc: 'Piltover gilded brass & arcane hextech-blue plates with forged gold borders, bezel-framed flags, and jewel-navy center crest.'
    },
    {
      id: '2xko-noxus-crimson',
      name: '★ 2XKO Noxus Ironblood',
      cat: '2xko',
      gameProfile: '2xko',
      gameTag: '2XKO',
      is2v2: false,
      layout: '2XKO Noxus',
      colors: ['#dc2626', '#14090c', '#f59e0b'],
      cfg: {
        gameProfile: '2xko',
        layout: '2xko-tag',
        scorePos: 'inner',
        flagStyle: 'blade-twt',
        centerStyle: 'trapezoid',
        outerBlade: 'on',
        slant: 16,
        font: 'Russo One',
        italic: true
      },
      pv: {
        lay: 'blade', sh: 'blade', fs: 'blade', cs: 'trap', edge: true,
        bg1: 'linear-gradient(90deg, #210a0d 0%, #110c0f 100%)',
        bg2: 'linear-gradient(270deg, #1f1407 0%, #110c0f 100%)',
        p1: '#dc2626', p2: '#f59e0b',
        sc1: 'linear-gradient(135deg, #ef4444, #991b1b)',
        sc2: 'linear-gradient(135deg, #fbbf24, #b45309)',
        sct: '#ffffff', sct2: '#140c04',
        cbg: 'linear-gradient(180deg, #1f0c10, #0c0608)',
        cborder: '#ef4444', ct: '#fca5a5', tx: '#ffffff',
        sp1: '#f87171', sp2: '#fcd34d',
        glow1: 'rgba(220,38,38,0.40)', glow2: 'rgba(245,158,11,0.36)',
        hudKind: '2xko'
      },
      desc: 'Brutalist Darius & Noxian war-iron blades: heavy dark steel, blood-crimson vs. forged amber score wedges, and razor trapezoid crest.'
    },
    {
      id: '2xko-ionia-spirit',
      name: '★ 2XKO Ionia Spirit Blossom',
      cat: '2xko',
      gameProfile: '2xko',
      gameTag: '2XKO',
      is2v2: false,
      layout: '2XKO Spirit',
      colors: ['#fb7185', '#171026', '#2dd4bf'],
      cfg: {
        gameProfile: '2xko',
        layout: '2xko-tag',
        scorePos: 'inner',
        flagStyle: 'fade-blend',
        centerStyle: 'pill',
        outerBlade: 'off',
        slant: 10,
        font: 'Rajdhani',
        italic: false
      },
      pv: {
        lay: 'blade', sh: 'round', fs: 'fade', cs: 'pill', edge: false,
        bg1: 'linear-gradient(90deg, rgba(42,16,44,0.92), rgba(20,16,38,0.92))',
        bg2: 'linear-gradient(270deg, rgba(11,38,44,0.92), rgba(20,16,38,0.92))',
        p1: '#fb7185', p2: '#2dd4bf',
        sc1: 'linear-gradient(135deg, #fb7185, #be185d)',
        sc2: 'linear-gradient(135deg, #2dd4bf, #0d9488)',
        sct: '#ffffff', sct2: '#041d1a',
        cbg: 'linear-gradient(180deg, #23163b, #120c21)',
        cborder: '#c084fc', ct: '#f5d0fe', tx: '#ffffff',
        sp1: '#fda4af', sp2: '#5eead4',
        glow1: 'rgba(251,113,133,0.34)', glow2: 'rgba(45,212,191,0.34)',
        hudKind: '2xko'
      },
      desc: 'Ethereal Yasuo & Ahri Spirit Blossom aesthetic: midnight-plum translucent plates, sakura pink vs. spirit turquoise fade flags & luminous crest.'
    },
    {
      id: '2xko-riot-clean-white',
      name: '★ 2XKO Riot LAN Light',
      cat: '2xko',
      gameProfile: '2xko',
      gameTag: '2XKO',
      is2v2: false,
      layout: '2XKO Light',
      colors: ['#84cc16', '#f8fafc', '#2563eb'],
      cfg: {
        gameProfile: '2xko',
        layout: '2xko-tag',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'trapezoid',
        outerBlade: 'on',
        slant: 14,
        font: 'Montserrat',
        italic: true
      },
      pv: {
        lay: 'blade', sh: 'blade', fs: 'classic', cs: 'trap', edge: true, isLight: true,
        bg1: 'linear-gradient(180deg, #ffffff 0%, #e5ecf4 100%)',
        bg2: 'linear-gradient(180deg, #ffffff 0%, #e5ecf4 100%)',
        p1: '#84cc16', p2: '#2563eb',
        sc1: 'linear-gradient(135deg, #a3e635, #65a30d)',
        sc2: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        sct: '#090d06', sct2: '#ffffff',
        cbg: 'linear-gradient(180deg, #0f172a, #090d16)',
        cborder: '#a3e635', ct: '#bef264', tx: '#0f172a',
        sp1: '#4d7c0f', sp2: '#1d4ed8',
        glow1: 'rgba(132,204,22,0.28)', glow2: 'rgba(37,99,235,0.28)',
        hudKind: '2xko'
      },
      desc: 'Crisp Riot Esports daylight broadcast overlay: pure alabaster wings, jet-black typography, signature volt-lime vs. cobalt score wedges.'
    },

    /* --- AVATAR LEGENDS: THE FIGHTING GAME (5 Architecturally Unique Game-Integrated Presets!) --- */
    {
      id: 'avatar-four-nations',
      name: '★ Avatar: Native Filigree Scroll',
      cat: 'avatar',
      gameProfile: 'avatar',
      gameTag: 'AVATAR',
      is2v2: false,
      layout: 'Native Fretwork',
      colors: ['#eab308', '#141210', '#2563eb'],
      cfg: {
        gameProfile: 'avatar',
        avatarStyle: 'filigree',
        layout: 'avatar-hud',
        scorePos: 'inner',
        flagStyle: 'bezel',
        centerStyle: 'theme',
        outerBlade: 'off',
        slant: 0,
        font: 'Cinzel',
        italic: false
      },
      pv: {
        lay: 'blade', sh: 'oct', fs: 'bezel', cs: 'pagoda', edge: false, avStyle: 'filigree',
        bg1: 'linear-gradient(180deg, #1d1813 0%, #0d0b08 100%)',
        bg2: 'linear-gradient(180deg, #1d1813 0%, #0d0b08 100%)',
        p1: '#dc2626', p2: '#2563eb',
        sc1: 'linear-gradient(180deg, #dc2626, #991b1b)',
        sc2: 'linear-gradient(180deg, #3b82f6, #1e40af)',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: 'linear-gradient(180deg, #1a1510, #0b0907)',
        cborder: '#eab308', ct: '#fde047', tx: '#faf5eb',
        sp1: '#fbbf24', sp2: '#93c5fd',
        glow1: 'rgba(234,179,8,0.34)', glow2: 'rgba(59,130,246,0.34)',
        hudKind: 'avatar'
      },
      desc: 'Painted to match Avatar Legends\' native cel-shaded black & gold HUD with Chinese corner fretwork (回), octagonal score plaques & zero overlap on WINS/41 timer.'
    },
    {
      id: 'avatar-fire-vs-water',
      name: '★ Avatar: Agni Kai (Fire vs Water)',
      cat: 'avatar',
      gameProfile: 'avatar',
      gameTag: 'AVATAR',
      is2v2: false,
      layout: 'Elemental Clash',
      colors: ['#f97316', '#180c0a', '#0ea5e9'],
      cfg: {
        gameProfile: 'avatar',
        avatarStyle: 'agnikai',
        layout: 'avatar-hud',
        scorePos: 'inner',
        flagStyle: 'blade-twt',
        centerStyle: 'pill',
        outerBlade: 'on',
        slant: 16,
        font: 'Chakra Petch',
        italic: true
      },
      pv: {
        lay: 'blade', sh: 'blade', fs: 'blade', cs: 'pill', edge: true, avStyle: 'agnikai',
        bg1: 'linear-gradient(90deg, #330b06 0%, #160a0a 100%)',
        bg2: 'linear-gradient(270deg, #06213d 0%, #0b1424 100%)',
        p1: '#f97316', p2: '#38bdf8',
        sc1: 'linear-gradient(135deg, #fb923c, #dc2626)',
        sc2: 'linear-gradient(135deg, #38bdf8, #0369a1)',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: 'linear-gradient(90deg, #7c2d12, #111827 50%, #0c4a6e)',
        cborder: '#fb923c', ct: '#fff7ed', tx: '#ffffff',
        sp1: '#fdba74', sp2: '#7dd3fc',
        glow1: 'rgba(249,115,22,0.44)', glow2: 'rgba(56,189,248,0.44)',
        hudKind: 'avatar'
      },
      desc: 'Asymmetric elemental clash: jagged Fire Nation flame-ridge P1 blade vs. curved Water Tribe wave-crest P2 wing with crescent moon orb score & living elemental trails.'
    },
    {
      id: 'avatar-avatar-state',
      name: '★ Avatar: Raava Spirit Portal',
      cat: 'avatar',
      gameProfile: 'avatar',
      gameTag: 'AVATAR',
      is2v2: false,
      layout: 'Spirit Glass',
      colors: ['#38bdf8', '#091124', '#fbbf24'],
      cfg: {
        gameProfile: 'avatar',
        avatarStyle: 'spirit',
        layout: 'avatar-hud',
        scorePos: 'inner',
        flagStyle: 'fade-blend',
        centerStyle: 'pill',
        outerBlade: 'off',
        slant: 0,
        font: 'Exo 2',
        italic: false
      },
      pv: {
        lay: 'blade', sh: 'round', fs: 'fade', cs: 'pill', edge: false, avStyle: 'spirit',
        bg1: 'linear-gradient(90deg, rgba(8,28,54,0.84), rgba(14,22,44,0.76))',
        bg2: 'linear-gradient(270deg, rgba(44,28,8,0.84), rgba(14,22,44,0.76))',
        p1: '#38bdf8', p2: '#fbbf24',
        sc1: 'radial-gradient(circle, #7dd3fc, #0284c7)',
        sc2: 'radial-gradient(circle, #fde047, #d97706)',
        sct: '#04121f', sct2: '#1a1004',
        cbg: 'rgba(11,24,48,0.84)',
        cborder: '#7dd3fc', ct: '#e0f2fe', tx: '#ffffff',
        sp1: '#7dd3fc', sp2: '#fde047',
        glow1: 'rgba(56,189,248,0.48)', glow2: 'rgba(251,191,36,0.44)',
        hudKind: 'avatar'
      },
      desc: 'Floating Spirit World glass wings with luminous Raava energy ribbons, glowing circular spirit-orb score discs, soft fade flags & radiant Avatar State halo.'
    },
    {
      id: 'avatar-earth-kingdom',
      name: '★ Avatar: Ba Sing Se Jade Coin',
      cat: 'avatar',
      gameProfile: 'avatar',
      gameTag: 'AVATAR',
      is2v2: false,
      layout: 'Jade Monolith',
      colors: ['#10b981', '#0c1712', '#d97706'],
      cfg: {
        gameProfile: 'avatar',
        avatarStyle: 'jade',
        layout: 'avatar-hud',
        scorePos: 'inner',
        flagStyle: 'bezel',
        centerStyle: 'flat',
        outerBlade: 'off',
        slant: 0,
        font: 'Oswald',
        italic: false
      },
      pv: {
        lay: 'blade', sh: 'oct', fs: 'bezel', cs: 'flat', edge: false, avStyle: 'jade',
        bg1: 'linear-gradient(180deg, #0f291e 0%, #08140f 100%)',
        bg2: 'linear-gradient(180deg, #291e0b 0%, #141008 100%)',
        p1: '#10b981', p2: '#f59e0b',
        sc1: 'radial-gradient(circle, #34d399, #047857)',
        sc2: 'radial-gradient(circle, #fbbf24, #b45309)',
        sct: '#041a10', sct2: '#1a1004',
        cbg: 'linear-gradient(180deg, #10291e, #07140e)',
        cborder: '#34d399', ct: '#a7f3d0', tx: '#f8fafc',
        sp1: '#6ee7b7', sp2: '#fcd34d',
        glow1: 'rgba(16,185,129,0.36)', glow2: 'rgba(245,158,11,0.36)',
        hudKind: 'avatar'
      },
      desc: 'Carved Ba Sing Se basalt monolith with stepped stone bevels, iconic circular Earth Kingdom Jade Coin score discs, and imperial bronze accents.'
    },
    {
      id: 'avatar-air-temple-light',
      name: '★ Avatar: Air Nomad Scroll',
      cat: 'avatar',
      gameProfile: 'avatar',
      gameTag: 'AVATAR',
      is2v2: false,
      layout: 'Wood Scroll',
      colors: ['#ea580c', '#faf3e0', '#0284c7'],
      cfg: {
        gameProfile: 'avatar',
        avatarStyle: 'scroll',
        layout: 'avatar-hud',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'flat',
        outerBlade: 'off',
        slant: 0,
        font: 'Barlow Condensed',
        italic: false
      },
      pv: {
        lay: 'blade', sh: 'scroll', fs: 'classic', cs: 'flat', edge: false, isLight: true, avStyle: 'scroll',
        bg1: 'linear-gradient(180deg, #fdf8ec 0%, #e7d7b5 100%)',
        bg2: 'linear-gradient(180deg, #fdf8ec 0%, #e7d7b5 100%)',
        p1: '#ea580c', p2: '#0284c7',
        sc1: 'radial-gradient(circle, #f97316, #b91c1c)',
        sc2: 'radial-gradient(circle, #0ea5e9, #1e40af)',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: 'linear-gradient(180deg, #3b2314, #1c0f07)',
        cborder: '#eab308', ct: '#fef08a', tx: '#1c140e',
        sp1: '#c2410c', sp2: '#0369a1',
        glow1: 'rgba(234,88,12,0.28)', glow2: 'rgba(2,132,199,0.28)',
        hudKind: 'avatar'
      },
      desc: 'Unrolled ancient Air Temple parchment scroll with 3D lacquered wooden roller cylinders, vermilion/cobalt wax-seal score stamps & swirling air-cloud filigree.'
    },

    /* --- MORTAL KOMBAT 1 (5 Architecturally Unique Presets — ZERO Overlap on ALL 4 Round Orbs, 89 Enso Timer & HP!) --- */
    {
      id: 'mk1-dragon-socket',
      name: '★ MK1 Dragon Orb Sockets',
      cat: 'mk1',
      gameProfile: 'mk1',
      gameTag: 'MK1',
      is2v2: false,
      layout: 'Orb Cutouts',
      colors: ['#eab308', '#140e09', '#38bdf8'],
      cfg: {
        gameProfile: 'mk1',
        mk1Style: 'sockets',
        layout: 'mk1-hud',
        scorePos: 'inner',
        flagStyle: 'bezel',
        centerStyle: 'trapezoid',
        outerBlade: 'off',
        slant: 0,
        font: 'Cinzel',
        italic: false
      },
      pv: {
        lay: 'blade', sh: 'oct', fs: 'bezel', cs: 'under', edge: false, mkStyle: 'sockets',
        bg1: 'linear-gradient(180deg, #1d150c 0%, #0b0805 100%)',
        bg2: 'linear-gradient(180deg, #101826 0%, #070a10 100%)',
        p1: '#f59e0b', p2: '#38bdf8',
        sc1: 'linear-gradient(180deg, #fde047, #b45309)',
        sc2: 'linear-gradient(180deg, #38bdf8, #1d4ed8)',
        sct: '#0d0904', sct2: '#ffffff',
        cbg: 'linear-gradient(180deg, #24190c, #0d0905)',
        cborder: '#eab308', ct: '#fde047', tx: '#faf5eb',
        sp1: '#fde047', sp2: '#7dd3fc',
        glow1: 'rgba(234,179,8,0.40)', glow2: 'rgba(56,189,248,0.36)',
        hudKind: 'mk1'
      },
      desc: 'Kazuya-Fists inspired MK1 centerpiece: carved dragon-scale filigree plates with 4 precision circular cutouts mounting MK1\'s in-game round orbs + lower Enso cradle!'
    },
    {
      id: 'mk1-enso-ink',
      name: '★ MK1 Enso Ink Scroll',
      cat: 'mk1',
      gameProfile: 'mk1',
      gameTag: 'MK1',
      is2v2: false,
      layout: 'Sumi-e Ink',
      colors: ['#dc2626', '#f2e4c9', '#1c110a'],
      cfg: {
        gameProfile: 'mk1',
        mk1Style: 'enso',
        layout: 'mk1-hud',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'flat',
        outerBlade: 'off',
        slant: 0,
        font: 'Cinzel',
        italic: false
      },
      pv: {
        lay: 'crown', sh: 'ink', fs: 'classic', cs: 'under', edge: false, isLight: true, mkStyle: 'enso',
        bg1: 'linear-gradient(180deg, #f5e8cc 0%, #dcc59b 100%)',
        bg2: 'linear-gradient(180deg, #f5e8cc 0%, #dcc59b 100%)',
        p1: '#b91c1c', p2: '#1e3a8a',
        sc1: 'radial-gradient(circle, #dc2626, #7f1d1d)',
        sc2: 'radial-gradient(circle, #1d4ed8, #172554)',
        sct: '#fff7ed', sct2: '#eff6ff',
        cbg: 'linear-gradient(180deg, #24150c, #120905)',
        cborder: '#d97706', ct: '#fde68a', tx: '#1c110a',
        sp1: '#991b1b', sp2: '#1e3a8a',
        glow1: 'rgba(185,28,28,0.30)', glow2: 'rgba(30,58,138,0.30)',
        hudKind: 'mk1'
      },
      desc: 'Matches MK1\'s native parchment health bars & Enso brushstroke timer 1:1 — aged scroll wings, circular crimson/cobalt wax-seal scores, ink halo & 100% clear round orbs.'
    },
    {
      id: 'mk1-shirai-lin-kuei',
      name: '★ MK1 Kunai vs Ice Spear',
      cat: 'mk1',
      gameProfile: 'mk1',
      gameTag: 'MK1',
      is2v2: false,
      layout: 'Clan Weapons',
      colors: ['#f59e0b', '#0d1119', '#38bdf8'],
      cfg: {
        gameProfile: 'mk1',
        mk1Style: 'clans',
        layout: 'mk1-hud',
        scorePos: 'inner',
        flagStyle: 'fade-blend',
        centerStyle: 'trapezoid',
        outerBlade: 'on',
        slant: 14,
        font: 'Chakra Petch',
        italic: true
      },
      pv: {
        lay: 'blade', sh: 'blade', fs: 'fade', cs: 'under', edge: true, mkStyle: 'clans',
        bg1: 'linear-gradient(90deg, #291605 0%, #101218 100%)',
        bg2: 'linear-gradient(270deg, #062038 0%, #101218 100%)',
        p1: '#f59e0b', p2: '#38bdf8',
        sc1: 'linear-gradient(135deg, #fbbf24, #d97706)',
        sc2: 'linear-gradient(135deg, #38bdf8, #0284c7)',
        sct: '#0d0904', sct2: '#04121f',
        cbg: 'linear-gradient(90deg, #3d2106, #0d1119 50%, #072844)',
        cborder: '#f59e0b', ct: '#fef3c7', tx: '#ffffff',
        sp1: '#fbbf24', sp2: '#7dd3fc',
        glow1: 'rgba(245,158,11,0.44)', glow2: 'rgba(56,189,248,0.44)',
        hudKind: 'mk1'
      },
      desc: 'Asymmetric Scorpion vs. Sub-Zero weaponry: forged Shirai Ryu Kunai & chain links on P1 vs. faceted Lin Kuei ice-crystal blade on P2, framing all 4 orbs untouched.'
    },
    {
      id: 'mk1-hourglass-glass',
      name: '★ MK1 Hourglass Astrolabe',
      cat: 'mk1',
      gameProfile: 'mk1',
      gameTag: 'MK1',
      is2v2: false,
      layout: 'Glass Relics',
      colors: ['#fde047', '#0c101c', '#38bdf8'],
      cfg: {
        gameProfile: 'mk1',
        mk1Style: 'hourglass',
        layout: 'mk1-hud',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'pill',
        outerBlade: 'off',
        slant: 0,
        font: 'Rajdhani',
        italic: false
      },
      pv: {
        lay: 'crown', sh: 'round', fs: 'classic', cs: 'under', edge: false, mkStyle: 'hourglass',
        bg1: 'linear-gradient(180deg, rgba(16,20,34,0.82), rgba(8,10,18,0.88))',
        bg2: 'linear-gradient(180deg, rgba(16,20,34,0.82), rgba(8,10,18,0.88))',
        p1: '#fde047', p2: '#38bdf8',
        sc1: 'linear-gradient(135deg, rgba(253,224,71,0.92), rgba(202,138,4,0.92))',
        sc2: 'linear-gradient(135deg, rgba(56,189,248,0.92), rgba(29,78,216,0.92))',
        sct: '#0b0c12', sct2: '#ffffff',
        cbg: 'rgba(14,18,30,0.86)',
        cborder: '#fde047', ct: '#fef08a', tx: '#ffffff',
        sp1: '#fde047', sp2: '#7dd3fc',
        glow1: 'rgba(253,224,71,0.34)', glow2: 'rgba(56,189,248,0.34)',
        hudKind: 'mk1'
      },
      desc: 'Liu Kang Sands of Time astrolabe: frosted cosmic glass panels, brass clockwork orb sockets framing all 4 round orbs & concentric golden ring hugging the 89 timer.'
    },
    {
      id: 'mk1-evo-broadcast',
      name: '★ MK1 EVO Pro Broadcast',
      cat: 'mk1',
      gameProfile: 'mk1',
      gameTag: 'MK1',
      is2v2: false,
      layout: 'MK1 EVO',
      colors: ['#2563eb', '#0b0d14', '#ffffff'],
      cfg: {
        gameProfile: 'mk1',
        mk1Style: 'evo',
        layout: 'mk1-hud',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'flat',
        outerBlade: 'off',
        slant: 0,
        font: 'Barlow Condensed',
        italic: false
      },
      pv: {
        lay: 'crown', sh: 'flat', fs: 'classic', cs: 'under', edge: false, mkStyle: 'evo',
        bg1: 'linear-gradient(180deg, #10141f 0%, #07090f 100%)',
        bg2: 'linear-gradient(180deg, #10141f 0%, #07090f 100%)',
        p1: '#2563eb', p2: '#2563eb',
        sc1: '#ffffff', sc2: '#ffffff',
        sct: '#090b12', sct2: '#090b12',
        cbg: 'linear-gradient(90deg, #1d4ed8, #2563eb, #1d4ed8)',
        cborder: '#60a5fa', ct: '#ffffff', tx: '#ffffff',
        sp1: '#93c5fd', sp2: '#93c5fd',
        glow1: 'rgba(37,99,235,0.34)', glow2: 'rgba(37,99,235,0.34)',
        hudKind: 'mk1'
      },
      desc: 'Crisp EVO Major MK1 TV layout: ultra-clean dark carbon wings stopping cleanly before the 4 round orbs, pure white score blocks, live Kameo icons & lower timer plaque.'
    },

    /* --- FATAL FURY: CITY OF THE WOLVES (SNK — Clears Golden Circular Timer & Round Diamonds) --- */
    {
      id: 'ffcotw-southtown',
      name: '★ Fatal Fury: South Town',
      cat: 'ffcotw',
      gameProfile: 'ffcotw',
      gameTag: 'COTW',
      layout: 'CotW HUD',
      colors: ['#facc15', '#0b0b0e', '#ff4500'],
      cfg: {
        gameProfile: 'ffcotw',
        layout: 'ffcotw-hud',
        scorePos: 'inner',
        flagStyle: 'blade-twt',
        centerStyle: 'trapezoid',
        outerBlade: 'on',
        slant: 16,
        font: 'Russo One',
        italic: true
      },
      pv: {
        lay: 'blade', sh: 'diag', fs: 'blade', cs: 'trap', edge: true,
        bg1: 'linear-gradient(180deg, #181610 0%, #0a0907 100%)',
        bg2: 'linear-gradient(180deg, #181610 0%, #0a0907 100%)',
        p1: '#facc15', p2: '#facc15',
        sc1: 'linear-gradient(135deg, #fde047, #eab308)',
        sc2: 'linear-gradient(135deg, #fde047, #eab308)',
        sct: '#0a0907', sct2: '#0a0907',
        cbg: '#0d0c09', cborder: '#facc15', ct: '#fde047', tx: '#ffffff',
        sp1: '#facc15', sp2: '#facc15',
        glow1: 'rgba(250,204,21,0.35)', glow2: 'rgba(250,204,21,0.35)',
        hudKind: 'ffcotw'
      },
      desc: 'Built for Fatal Fury: City of the Wolves — sits over PLAYER 1/2 plates while keeping outer portraits, round diamonds, golden timer, S.P.G. & REV bars clear.'
    },
    {
      id: 'ffcotw-rev-overdrive',
      name: '★ Fatal Fury: REV Overdrive',
      cat: 'ffcotw',
      gameProfile: 'ffcotw',
      gameTag: 'COTW',
      layout: 'CotW REV',
      colors: ['#ff3b1f', '#12131a', '#2563eb'],
      cfg: {
        gameProfile: 'ffcotw',
        layout: 'ffcotw-hud',
        scorePos: 'inner',
        flagStyle: 'fade-blend',
        centerStyle: 'trapezoid',
        outerBlade: 'on',
        slant: 16,
        font: 'Anton',
        italic: true
      },
      pv: {
        lay: 'blade', sh: 'diag', fs: 'fade', cs: 'trap', edge: true,
        bg1: 'linear-gradient(90deg, #240c0a 0%, #11131a 100%)',
        bg2: 'linear-gradient(270deg, #0b1630 0%, #11131a 100%)',
        p1: '#ff4500', p2: '#3b82f6',
        sc1: 'linear-gradient(135deg, #ff5e1a, #dc2626)',
        sc2: 'linear-gradient(135deg, #38bdf8, #1d4ed8)',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: 'linear-gradient(180deg, #1b1d28, #0c0d14)',
        cborder: '#ff5e1a', ct: '#ffffff', tx: '#ffffff',
        sp1: '#fb923c', sp2: '#60a5fa',
        glow1: 'rgba(255,69,0,0.38)', glow2: 'rgba(59,130,246,0.38)',
        hudKind: 'ffcotw'
      },
      desc: 'SNK World Championship broadcast palette in REV Fire Red vs. South Town Blue with Arcade/Smart control style badges and zero timer overlap.'
    },

    /* --- SUPER SMASH BROS. ULTIMATE (10 Native Presets: 5 Distinct Broadcast Styles × 1v1 + 2v2!) --- */
    /* 1. Pro Major Dark (1v1 & 2v2) */
    {
      id: 'ssbu-major-singles',
      name: '★ Smash Ultimate Pro Singles',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: false,
      layout: 'SSBU 1v1',
      colors: ['#ef4444', '#111520', '#2563eb'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'major',
        smashVariant: 'major-singles',
        is2v2: false,
        layout: 'ssbu-native',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 0,
        font: 'Barlow Condensed',
        italic: false
      },
      pv: {
        lay: 'ssbu', sh: 'flat', fs: 'classic', cs: 'flat', edge: false, smStyle: 'major',
        bg1: 'linear-gradient(180deg, #1c202c, #0f121a)',
        bg2: 'linear-gradient(180deg, #1c202c, #0f121a)',
        p1: '#ef4444', p2: '#2563eb',
        sc1: 'linear-gradient(180deg, #ef4444, #b91c1c)',
        sc2: 'linear-gradient(180deg, #3b82f6, #1d4ed8)',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: '#141824', cborder: '#facc15', ct: '#ffffff', tx: '#ffffff',
        sp1: '#fca5a5', sp2: '#93c5fd',
        hudKind: 'ssbu'
      },
      desc: 'Authentic SSBU 1v1 Major overlay: leaves Switch top-right timer & bottom %/stocks 100% clear. Stock icons, center logo, Seed, flags, pronouns & stage.'
    },
    {
      id: 'ssbu-doubles-2v2',
      name: '★ Smash Ultimate Pro Doubles 2v2',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: true,
      layout: 'SSBU 2v2',
      colors: ['#f43f5e', '#10141f', '#38bdf8'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'major',
        smashVariant: 'doubles-2v2',
        is2v2: true,
        layout: 'ssbu-native',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 0,
        font: 'Oswald',
        italic: false
      },
      pv: {
        lay: 'ssbu', sh: 'flat', fs: 'classic', cs: 'flat', edge: false, smStyle: 'major',
        bg1: 'linear-gradient(180deg, #1b1f2e, #0e111a)',
        bg2: 'linear-gradient(180deg, #1b1f2e, #0e111a)',
        p1: '#f43f5e', p2: '#38bdf8',
        sc1: 'linear-gradient(180deg, #f43f5e, #be123c)',
        sc2: 'linear-gradient(180deg, #38bdf8, #0284c7)',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: '#131722', cborder: '#38bdf8', ct: '#ffffff', tx: '#ffffff',
        sp1: '#fda4af', sp2: '#7dd3fc',
        hudKind: 'ssbu2v2'
      },
      desc: 'Pro Major SSBU Doubles (2v2): stacked teammate plates with aligned stock icons beside every player, shared score, timer & 4-player bottom HUD clear.'
    },

    /* 2. Rounded Pill (Webcams — 1v1 & 2v2) */
    {
      id: 'ssbu-pill-compact',
      name: '★ Smash Ultimate Pill 1v1',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: false,
      layout: 'SSBU Pill',
      colors: ['#e11d48', '#14161f', '#3b82f6'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'pill',
        smashVariant: 'pill-compact',
        is2v2: false,
        layout: 'ssbu-native',
        scorePos: 'outer',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 0,
        font: 'Montserrat',
        italic: false
      },
      pv: {
        lay: 'ssbu', sh: 'round', fs: 'classic', cs: 'pill', edge: false, smStyle: 'pill',
        bg1: 'linear-gradient(90deg, #9f1239, #e11d48)',
        bg2: 'linear-gradient(270deg, #1e3a8a, #2563eb)',
        p1: '#fb7185', p2: '#60a5fa',
        sc1: '#0f121a', sc2: '#0f121a',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: '#0f121a', cborder: '#fb7185', ct: '#ffffff', tx: '#ffffff',
        sp1: '#fde047', sp2: '#fde047',
        hudKind: 'ssbu'
      },
      desc: 'Vibrant rounded pill 1v1 Smash scorebar with circular score orbs and logo medallion, ideal for webcam streams.'
    },
    {
      id: 'ssbu-pill-2v2',
      name: '★ Smash Ultimate Pill Doubles 2v2',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: true,
      layout: 'Pill 2v2',
      colors: ['#e11d48', '#14161f', '#3b82f6'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'pill',
        smashVariant: 'pill-2v2',
        is2v2: true,
        layout: 'ssbu-native',
        scorePos: 'outer',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 0,
        font: 'Montserrat',
        italic: false
      },
      pv: {
        lay: 'ssbu', sh: 'round', fs: 'classic', cs: 'pill', edge: false, smStyle: 'pill',
        bg1: 'linear-gradient(90deg, #9f1239, #e11d48)',
        bg2: 'linear-gradient(270deg, #1e3a8a, #2563eb)',
        p1: '#fb7185', p2: '#60a5fa',
        sc1: '#0f121a', sc2: '#0f121a',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: '#0f121a', cborder: '#fb7185', ct: '#ffffff', tx: '#ffffff',
        sp1: '#fde047', sp2: '#fde047',
        hudKind: 'ssbu2v2'
      },
      desc: 'Doubles (2v2) edition of Smash Ultimate Pill: sleek capsule team bars with 4 aligned stock icons, circular score badges & circular tournament crest.'
    },

    /* 3. Apex Slant (Angled Esports Blades — 1v1 & 2v2) */
    {
      id: 'ssbu-slant-1v1',
      name: '★ Smash Ultimate Apex Slant 1v1',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: false,
      layout: 'Slant 1v1',
      colors: ['#ff5a1f', '#0d111d', '#06b6d4'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'slant',
        smashVariant: 'slant-1v1',
        is2v2: false,
        layout: 'ssbu-native',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 14,
        font: 'Chakra Petch',
        italic: true
      },
      pv: {
        lay: 'ssbu', sh: 'diag', fs: 'classic', cs: 'hex', edge: true, smStyle: 'slant',
        bg1: 'linear-gradient(135deg, #1b1116, #0d111c)',
        bg2: 'linear-gradient(225deg, #0b1a26, #0d111c)',
        p1: '#ff5a1f', p2: '#06b6d4',
        sc1: 'linear-gradient(135deg, #ff7b1c, #dc2626)',
        sc2: 'linear-gradient(135deg, #22d3ee, #0284c7)',
        sct: '#ffffff', sct2: '#06121c',
        cbg: '#0c101b', cborder: '#facc15', ct: '#fde047', tx: '#ffffff',
        sp1: '#fb923c', sp2: '#67e8f9',
        hudKind: 'ssbu'
      },
      desc: 'Aggressive Genesis/Apex-style angled esports blades for Smash 1v1: chamfered parallelogram plates, fire-orange vs. cyber-cyan trims & hexagonal crest.'
    },
    {
      id: 'ssbu-slant-2v2',
      name: '★ Smash Ultimate Apex Slant 2v2',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: true,
      layout: 'Slant 2v2',
      colors: ['#ff5a1f', '#0d111d', '#06b6d4'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'slant',
        smashVariant: 'slant-2v2',
        is2v2: true,
        layout: 'ssbu-native',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 14,
        font: 'Chakra Petch',
        italic: true
      },
      pv: {
        lay: 'ssbu', sh: 'diag', fs: 'classic', cs: 'hex', edge: true, smStyle: 'slant',
        bg1: 'linear-gradient(135deg, #1b1116, #0d111c)',
        bg2: 'linear-gradient(225deg, #0b1a26, #0d111c)',
        p1: '#ff5a1f', p2: '#06b6d4',
        sc1: 'linear-gradient(135deg, #ff7b1c, #dc2626)',
        sc2: 'linear-gradient(135deg, #22d3ee, #0284c7)',
        sct: '#ffffff', sct2: '#06121c',
        cbg: '#0c101b', cborder: '#facc15', ct: '#fde047', tx: '#ffffff',
        sp1: '#fb923c', sp2: '#67e8f9',
        hudKind: 'ssbu2v2'
      },
      desc: 'Doubles (2v2) Apex Slant blades: bold angled team plates with aligned stock icons beside every teammate and razor neon port slashes.'
    },

    /* 4. Kagaribi Light (Japanese Daylight Minimal Broadcast — 1v1 & 2v2) */
    {
      id: 'ssbu-kagaribi-1v1',
      name: '★ Smash Ultimate Kagaribi Light 1v1',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: false,
      layout: 'Light 1v1',
      colors: ['#dc2626', '#f8fafc', '#2563eb'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'kagaribi',
        smashVariant: 'kagaribi-1v1',
        is2v2: false,
        layout: 'ssbu-native',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 0,
        font: 'Exo 2',
        italic: false
      },
      pv: {
        lay: 'ssbu', sh: 'flat', fs: 'classic', cs: 'flat', edge: false, smStyle: 'kagaribi', isLight: true,
        bg1: 'linear-gradient(180deg, #ffffff, #e8eef6)',
        bg2: 'linear-gradient(180deg, #ffffff, #e8eef6)',
        p1: '#dc2626', p2: '#2563eb',
        sc1: '#dc2626', sc2: '#2563eb',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: '#ffffff', cborder: '#dc2626', ct: '#0f172a', tx: '#0f172a',
        sp1: '#dc2626', sp2: '#2563eb',
        hudKind: 'ssbu'
      },
      desc: 'Japanese Supermajor clean daylight aesthetic: razor-sharp alabaster white plates, jet-black typography, crimson vs. cobalt caps and zero clutter.'
    },
    {
      id: 'ssbu-kagaribi-2v2',
      name: '★ Smash Ultimate Kagaribi Light 2v2',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: true,
      layout: 'Light 2v2',
      colors: ['#dc2626', '#f8fafc', '#2563eb'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'kagaribi',
        smashVariant: 'kagaribi-2v2',
        is2v2: true,
        layout: 'ssbu-native',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 0,
        font: 'Exo 2',
        italic: false
      },
      pv: {
        lay: 'ssbu', sh: 'flat', fs: 'classic', cs: 'flat', edge: false, smStyle: 'kagaribi', isLight: true,
        bg1: 'linear-gradient(180deg, #ffffff, #e8eef6)',
        bg2: 'linear-gradient(180deg, #ffffff, #e8eef6)',
        p1: '#dc2626', p2: '#2563eb',
        sc1: '#dc2626', sc2: '#2563eb',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: '#ffffff', cborder: '#dc2626', ct: '#0f172a', tx: '#0f172a',
        sp1: '#dc2626', sp2: '#2563eb',
        hudKind: 'ssbu2v2'
      },
      desc: 'Doubles (2v2) Kagaribi Light broadcast: ultra-legible white TV team plates with stacked teammate rows, aligned stock icons & crisp high-contrast badges.'
    },

    /* 5. Aurora Frosted Glass (Liquid Glassmorphism — 1v1 & 2v2) */
    {
      id: 'ssbu-glass-1v1',
      name: '★ Smash Ultimate Aurora Glass 1v1',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: false,
      layout: 'Glass 1v1',
      colors: ['#f472b6', '#0f172a', '#38bdf8'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'glass',
        smashVariant: 'glass-1v1',
        is2v2: false,
        layout: 'ssbu-native',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 0,
        font: 'Rajdhani',
        italic: false
      },
      pv: {
        lay: 'ssbu', sh: 'round', fs: 'classic', cs: 'pill', edge: false, smStyle: 'glass',
        bg1: 'linear-gradient(135deg, rgba(244,114,182,0.22), rgba(15,23,42,0.72))',
        bg2: 'linear-gradient(225deg, rgba(56,189,248,0.22), rgba(15,23,42,0.72))',
        p1: '#f472b6', p2: '#38bdf8',
        sc1: 'linear-gradient(135deg, rgba(244,114,182,0.88), rgba(190,24,93,0.92))',
        sc2: 'linear-gradient(135deg, rgba(56,189,248,0.88), rgba(3,105,161,0.92))',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: 'rgba(15,23,42,0.76)', cborder: '#a78bfa', ct: '#f8fafc', tx: '#ffffff',
        sp1: '#fbcfe8', sp2: '#bae6fd',
        hudKind: 'ssbu'
      },
      desc: 'Liquid frosted glassmorphism 1v1 Smash scorebar with top neon sakura vs. glacier cyan rim glow — floats effortlessly over bright stages.'
    },
    {
      id: 'ssbu-glass-2v2',
      name: '★ Smash Ultimate Aurora Glass 2v2',
      cat: 'ssbu',
      gameProfile: 'ssbu',
      gameTag: 'SMASH',
      is2v2: true,
      layout: 'Glass 2v2',
      colors: ['#f472b6', '#0f172a', '#38bdf8'],
      cfg: {
        gameProfile: 'ssbu',
        smashStyle: 'glass',
        smashVariant: 'glass-2v2',
        is2v2: true,
        layout: 'ssbu-native',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'logo',
        outerBlade: 'off',
        slant: 0,
        font: 'Rajdhani',
        italic: false
      },
      pv: {
        lay: 'ssbu', sh: 'round', fs: 'classic', cs: 'pill', edge: false, smStyle: 'glass',
        bg1: 'linear-gradient(135deg, rgba(244,114,182,0.22), rgba(15,23,42,0.72))',
        bg2: 'linear-gradient(225deg, rgba(56,189,248,0.22), rgba(15,23,42,0.72))',
        p1: '#f472b6', p2: '#38bdf8',
        sc1: 'linear-gradient(135deg, rgba(244,114,182,0.88), rgba(190,24,93,0.92))',
        sc2: 'linear-gradient(135deg, rgba(56,189,248,0.88), rgba(3,105,161,0.92))',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: 'rgba(15,23,42,0.76)', cborder: '#a78bfa', ct: '#f8fafc', tx: '#ffffff',
        sp1: '#fbcfe8', sp2: '#bae6fd',
        hudKind: 'ssbu2v2'
      },
      desc: 'Doubles (2v2) Aurora Glass: frosted translucent team cards with glowing port edges, 4 aligned stock icons & glassmorphic center logo.'
    },

    /* --- TEKKEN 8 ENHANCEMENT (From Scorebar Tekken Referencia 1.png) --- */
    {
      id: 't8-pro-meta-strip',
      name: '★ T8 Pro Meta + Event Bar',
      cat: 'tekken',
      gameProfile: 'tekken8',
      gameTag: 'TK8',
      layout: 'T8 Meta Pro',
      colors: ['#e11d48', '#0e1119', '#2563eb'],
      cfg: {
        gameProfile: 'tekken8',
        layout: 'blade',
        scorePos: 'inner',
        flagStyle: 'classic',
        centerStyle: 'trapezoid',
        outerBlade: 'off',
        slant: 18,
        forceMetaStrip: true,
        forceBottomBar: true
      },
      pv: {
        lay: 'blade', sh: 'diag', fs: 'classic', cs: 'trap', edge: false,
        bg1: 'linear-gradient(180deg, #191d28, #0d1018)',
        bg2: 'linear-gradient(180deg, #191d28, #0d1018)',
        p1: '#e11d48', p2: '#2563eb',
        sc1: 'linear-gradient(135deg, #f43f5e, #be123c)',
        sc2: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        sct: '#ffffff', sct2: '#ffffff',
        cbg: '#0f131c', cborder: '#e11d48', ct: '#ffffff', tx: '#ffffff',
        sp1: '#fda4af', sp2: '#93c5fd',
        hudKind: 't8'
      },
      desc: 'Major European Tekken 8 tournament broadcast style: slim top metadata strip (Country + Region + @Handle + Seed) and bottom tournament/round bar.'
    }
  ];

  function resolveGameProfileForTheme(themeId) {
    const id = String(themeId || '');
    const match = GAME_THEMES.find(t => t.id === id);
    if (match && GAME_PROFILES[match.gameProfile]) return GAME_PROFILES[match.gameProfile];
    if (id.startsWith('sf6-') || id === 'fgc-metro-clash') return GAME_PROFILES.sf6;
    if (id.startsWith('2xko-') || id === 'fgc-hex-arcane') return GAME_PROFILES['2xko'];
    if (id.startsWith('ffcotw-')) return GAME_PROFILES.ffcotw;
    if (id.startsWith('ssbu-')) return GAME_PROFILES.ssbu;
    if (id.startsWith('avatar-')) return GAME_PROFILES.avatar;
    if (id.startsWith('mk1-')) return GAME_PROFILES.mk1;
    return GAME_PROFILES.tekken8;
  }

  global.FGC_GAME_PROFILES = GAME_PROFILES;
  global.FGC_GAME_THEMES = GAME_THEMES;
  global.FGC_GAME_THEME_MAP = Object.fromEntries(GAME_THEMES.map(t => [t.id, t]));
  global.FGC_RESOLVE_GAME_PROFILE = resolveGameProfileForTheme;
})(typeof window !== 'undefined' ? window : globalThis);
