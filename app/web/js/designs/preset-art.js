/**
 * FGC Open Scorebars — Bespoke Game-Integrated SVG Architectural Art Engine (0 dependencies)
 * Handcrafted 1920x1080 precision overlays with hardware-accelerated transparent orb cutouts,
 * Enso/Hourglass timer frames, clan weaponry (Kunai vs. Ice Spear), Four Nations Chinese fretwork,
 * elemental silhouettes (Fire/Water/Spirit/Jade/Scroll) that respond live to Style Studio colors.
 */
(function (global) {
  'use strict';

  /**
   * Returns { stageSvg, p1Svg, p2Svg, centerSvg } for themes that feature custom architectural art.
   * Coordinates in stageSvg are 1:1 on the 1920x140 top band of the 1920x1080 broadcast stage:
   *   - MK1 Round Orbs: P1 (858, 22) & (884, 22) | P2 (1036, 22) & (1062, 22)  [in-game r = 8px]
   *   - MK1 Enso Timer: (960, 54) [in-game r = 44px, top edge y = 10px, bottom y = 98px]
   *   - Avatar Diamond Timer: center (960, 102), top vertex y = 26px, x = 884..1036
   *   - Avatar WINS text: P1 (784..876, y=28..48) | P2 (1044..1136, y=28..48)
   */
  const PRESET_ART = {
    /* =========================================================================
       MK1 #1: DRAGON ORB SOCKETS (Kazuya-Fists Style Precision Round-Orb Cutouts!)
       Carved metallic dragon-scale filigree bridges with TRUE circular cutouts
       framing all 4 in-game MK1 round win orbs like mounted temple gems +
       gilded dragon-horn lower cradle framing the 89 Enso timer!
       ========================================================================= */
    'mk1-dragon-socket': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mkds-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="45%" stop-color="#d97706"/>
              <stop offset="100%" stop-color="#78350f"/>
            </linearGradient>
            <linearGradient id="mkds-p1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="var(--art-p1, #f59e0b)"/>
              <stop offset="100%" stop-color="#451a03"/>
            </linearGradient>
            <linearGradient id="mkds-p2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--art-p2, #38bdf8)"/>
              <stop offset="100%" stop-color="#0c2a4a"/>
            </linearGradient>
            <!-- TRUE TRANSPARENT CUTOUTS AT EXACT MK1 ROUND ORB CENTERS (858,22), (884,22), (1036,22), (1062,22) -->
            <mask id="mkds-orb-cut-p1">
              <rect x="820" y="0" width="100" height="44" fill="#fff"/>
              <circle cx="858" cy="22" r="10.2" fill="#000"/>
              <circle cx="884" cy="22" r="10.2" fill="#000"/>
            </mask>
            <mask id="mkds-orb-cut-p2">
              <rect x="1000" y="0" width="100" height="44" fill="#fff"/>
              <circle cx="1036" cy="22" r="10.2" fill="#000"/>
              <circle cx="1062" cy="22" r="10.2" fill="#000"/>
            </mask>
            <filter id="mkds-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity="0.82"/>
            </filter>
          </defs>
          <!-- P1 Carved Dragon-Scale Socket Plate with 2 Circular Cutouts -->
          <g filter="url(#mkds-glow)">
            <path d="M 832 4 L 898 4 L 907 14 L 901 34 L 838 34 L 829 22 Z"
                  fill="url(#mkds-p1)" stroke="url(#mkds-gold)" stroke-width="1.8" mask="url(#mkds-orb-cut-p1)"/>
            <!-- Etched Dragon Scale Chevrons & Precision Bezel Rings around P1 Orbs -->
            <circle cx="858" cy="22" r="10.8" fill="none" stroke="url(#mkds-gold)" stroke-width="2"/>
            <circle cx="884" cy="22" r="10.8" fill="none" stroke="url(#mkds-gold)" stroke-width="2"/>
            <path d="M 838 8 L 895 8" stroke="#fef08a" stroke-opacity="0.45" stroke-width="1"/>
            <polygon points="871,12 874,17 871,22 868,17" fill="#fef08a" opacity="0.8"/>
          </g>
          <!-- P2 Mirror Carved Dragon-Scale Socket Plate with 2 Circular Cutouts -->
          <g filter="url(#mkds-glow)">
            <path d="M 1088 4 L 1022 4 L 1013 14 L 1019 34 L 1082 34 L 1091 22 Z"
                  fill="url(#mkds-p2)" stroke="url(#mkds-gold)" stroke-width="1.8" mask="url(#mkds-orb-cut-p2)"/>
            <circle cx="1036" cy="22" r="10.8" fill="none" stroke="url(#mkds-gold)" stroke-width="2"/>
            <circle cx="1062" cy="22" r="10.8" fill="none" stroke="url(#mkds-gold)" stroke-width="2"/>
            <path d="M 1025 8 L 1082 8" stroke="#fef08a" stroke-opacity="0.45" stroke-width="1"/>
            <polygon points="1049,12 1052,17 1049,22 1046,17" fill="#fef08a" opacity="0.8"/>
          </g>
          <!-- Sculpted Lower Dragon Cradle Arc Hugging Beneath the 89 Enso Timer (ZERO Overlap!) -->
          <g filter="url(#mkds-glow)">
            <path d="M 907 58 A 53 45 0 0 0 1013 58" fill="none" stroke="url(#mkds-gold)" stroke-width="2.4" stroke-linecap="round"/>
            <path d="M 899 53 L 910 60 M 1021 53 L 1010 60" stroke="#fef08a" stroke-width="2" stroke-linecap="round"/>
            <polygon points="960,99 965,103 960,106 955,103" fill="url(#mkds-gold)"/>
          </g>
        </svg>`,
      p1Svg: `
        <svg viewBox="0 0 600 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 12 2 L 598 2 L 592 36 L 4 36 L 14 19 Z" fill="none" stroke="var(--art-accent, #eab308)" stroke-opacity="0.65" stroke-width="1.5"/>
          <polygon points="2,19 11,10 15,19 11,28" fill="var(--art-p1, #f59e0b)"/>
        </svg>`,
      p2Svg: `
        <svg viewBox="0 0 600 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 588 2 L 2 2 L 8 36 L 596 36 L 586 19 Z" fill="none" stroke="var(--art-accent, #eab308)" stroke-opacity="0.65" stroke-width="1.5"/>
          <polygon points="598,19 589,10 585,19 589,28" fill="var(--art-p2, #38bdf8)"/>
        </svg>`,
      centerSvg: ''
    }),

    /* =========================================================================
       MK1 #2: ENSO INK SCROLL (Authentic MK1 Sumi-e Brushstroke & Torn Parchment!)
       Mirrors the exact hand-painted dark ink Enso ring of MK1's timer!
       ========================================================================= */
    'mk1-enso-ink': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mkei-ink" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#1c110a" stop-opacity="0"/>
              <stop offset="20%" stop-color="#1c110a" stop-opacity="0.92"/>
              <stop offset="80%" stop-color="#1c110a" stop-opacity="0.92"/>
              <stop offset="100%" stop-color="#1c110a" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <!-- Delicate Sumi-e Ink Halo framing OUTSIDE the 89 circle (r=49, 100% open center!) -->
          <path d="M 914 42 A 49 49 0 1 0 1006 42" fill="none" stroke="#c2410c" stroke-width="2.5" stroke-opacity="0.72" stroke-dasharray="140 16 24 8"/>
          <path d="M 911 58 A 51 51 0 0 0 1009 58" fill="none" stroke="#fde68a" stroke-width="1.2" stroke-opacity="0.65"/>
          <!-- Tiny Subtle Ink-Brush Brackets framing P1 & P2 Round Orbs without touching them! -->
          <path d="M 845 31 Q 871 35 897 31" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
          <path d="M 1023 31 Q 1049 35 1075 31" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
          <circle cx="858" cy="22" r="10.5" fill="none" stroke="#f5e6c8" stroke-width="1" stroke-dasharray="3 3" opacity="0.55"/>
          <circle cx="884" cy="22" r="10.5" fill="none" stroke="#f5e6c8" stroke-width="1" stroke-dasharray="3 3" opacity="0.55"/>
          <circle cx="1036" cy="22" r="10.5" fill="none" stroke="#f5e6c8" stroke-width="1" stroke-dasharray="3 3" opacity="0.55"/>
          <circle cx="1062" cy="22" r="10.5" fill="none" stroke="#f5e6c8" stroke-width="1" stroke-dasharray="3 3" opacity="0.55"/>
        </svg>`,
      p1Svg: `
        <svg viewBox="0 0 600 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Torn parchment & ink splatter tail on outer left -->
          <path d="M 0 16 L 18 4 L 34 7 L 52 2 L 600 3 L 594 35 L 28 36 L 12 31 Z" fill="none" stroke="#d97706" stroke-width="1.6" stroke-opacity="0.7"/>
          <circle cx="10" cy="7" r="2.2" fill="#dc2626" opacity="0.75"/>
          <circle cx="22" cy="36" r="1.8" fill="#1c110a" opacity="0.8"/>
        </svg>`,
      p2Svg: `
        <svg viewBox="0 0 600 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 600 16 L 582 4 L 566 7 L 548 2 L 0 3 L 6 35 L 572 36 L 588 31 Z" fill="none" stroke="#d97706" stroke-width="1.6" stroke-opacity="0.7"/>
          <circle cx="590" cy="7" r="2.2" fill="#dc2626" opacity="0.75"/>
          <circle cx="578" cy="36" r="1.8" fill="#1c110a" opacity="0.8"/>
        </svg>`,
      centerSvg: ''
    }),

    /* =========================================================================
       MK1 #3: SHIRAI RYU KUNAI vs. LIN KUEI ICE SPEAR (Asymmetric Clan Weapons!)
       P1: Scorpion forged kunai spearpoint + chain links pointing at P1 orbs!
       P2: Sub-Zero faceted glacial ice crystal shard pointing at P2 orbs!
       ========================================================================= */
    'mk1-shirai-lin-kuei': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mksk-fire" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#f59e0b"/>
              <stop offset="60%" stop-color="#fbbf24"/>
              <stop offset="100%" stop-color="#fef08a"/>
            </linearGradient>
            <linearGradient id="mksk-ice" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stop-color="#0284c7"/>
              <stop offset="55%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#e0f2fe"/>
            </linearGradient>
            <filter id="mksk-sh" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity="0.85"/>
            </filter>
          </defs>
          <!-- P1 Scorpion Kunai Tip & Chain Ring tucked right before P1 Orb 1 (x=834..849) -->
          <g filter="url(#mksk-sh)">
            <polygon points="831,7 848,18 831,29 836,18" fill="url(#mksk-fire)" stroke="#fff7ed" stroke-width="0.9"/>
            <line x1="836" y1="18" x2="846" y2="18" stroke="#78350f" stroke-width="1.2"/>
            <!-- Subtle amber claw frame under P1 orbs -->
            <path d="M 848 33 L 896 33 L 902 27" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
          </g>
          <!-- P2 Sub-Zero Faceted Ice Spear Tip tucked right before P2 Orb 2 (x=1071..1089) -->
          <g filter="url(#mksk-sh)">
            <polygon points="1089,6 1072,18 1089,30 1083,18" fill="url(#mksk-ice)" stroke="#f0f9ff" stroke-width="0.9"/>
            <polygon points="1089,6 1079,18 1084,18" fill="#ffffff" opacity="0.55"/>
            <!-- Subtle frost crystal rail under P2 orbs -->
            <path d="M 1072 33 L 1024 33 L 1018 27" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
          </g>
          <!-- Dual Fire/Ice Clash Chevron below 89 Timer -->
          <g filter="url(#mksk-sh)">
            <path d="M 915 72 A 48 48 0 0 0 960 102" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M 1005 72 A 48 48 0 0 1 960 102" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
          </g>
        </svg>`,
      p1Svg: `
        <svg viewBox="0 0 600 38" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Forged chain links on outer P1 edge -->
          <ellipse cx="14" cy="18" rx="7" ry="4" fill="none" stroke="#fbbf24" stroke-width="1.8" opacity="0.85"/>
          <ellipse cx="24" cy="18" rx="6" ry="3.2" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.7"/>
          <line x1="30" y1="3" x2="594" y2="3" stroke="#fbbf24" stroke-opacity="0.45" stroke-width="1.2"/>
        </svg>`,
      p2Svg: `
        <svg viewBox="0 0 600 38" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Faceted frost crystal shards on outer P2 edge -->
          <polygon points="598,18 584,5 578,18 584,31" fill="#38bdf8" fill-opacity="0.45" stroke="#bae6fd" stroke-width="1"/>
          <polygon points="582,18 572,10 568,18 572,26" fill="#7dd3fc" fill-opacity="0.35"/>
          <line x1="6" y1="3" x2="570" y2="3" stroke="#7dd3fc" stroke-opacity="0.55" stroke-width="1.2"/>
        </svg>`,
      centerSvg: ''
    }),

    /* =========================================================================
       MK1 #4: LIU KANG HOURGLASS ASTROLABE (Celestial Brass Rings + Glass!)
       Precision golden clockwork rings framing all 4 orbs + Sands of Time arc!
       ========================================================================= */
    'mk1-hourglass-glass': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mkhg-brass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fef9c3"/>
              <stop offset="50%" stop-color="#eab308"/>
              <stop offset="100%" stop-color="#a16207"/>
            </linearGradient>
            <mask id="mkhg-cut-p1">
              <rect x="832" y="0" width="76" height="40" fill="#fff"/>
              <circle cx="858" cy="22" r="10.2" fill="#000"/>
              <circle cx="884" cy="22" r="10.2" fill="#000"/>
            </mask>
            <mask id="mkhg-cut-p2">
              <rect x="1012" y="0" width="76" height="40" fill="#fff"/>
              <circle cx="1036" cy="22" r="10.2" fill="#000"/>
              <circle cx="1062" cy="22" r="10.2" fill="#000"/>
            </mask>
          </defs>
          <!-- Celestial Brass Astrolabe Halo Concentric with 89 Timer (100% open center!) -->
          <circle cx="960" cy="54" r="50" fill="none" stroke="url(#mkhg-brass)" stroke-width="1.4" stroke-dasharray="10 6 2 6" opacity="0.88"/>
          <path d="M 906 54 L 912 54 M 1008 54 L 1014 54 M 960 100 L 960 104" stroke="#fef08a" stroke-width="2" stroke-linecap="round"/>
          <!-- Smoked Glass + Brass Socket Bridge around P1 & P2 Orbs -->
          <rect x="838" y="8" width="62" height="28" rx="14" fill="rgba(12,15,26,0.72)" stroke="url(#mkhg-brass)" stroke-width="1.3" mask="url(#mkhg-cut-p1)"/>
          <circle cx="858" cy="22" r="10.6" fill="none" stroke="url(#mkhg-brass)" stroke-width="1.6"/>
          <circle cx="884" cy="22" r="10.6" fill="none" stroke="url(#mkhg-brass)" stroke-width="1.6"/>
          <rect x="1020" y="8" width="62" height="28" rx="14" fill="rgba(12,15,26,0.72)" stroke="url(#mkhg-brass)" stroke-width="1.3" mask="url(#mkhg-cut-p2)"/>
          <circle cx="1036" cy="22" r="10.6" fill="none" stroke="url(#mkhg-brass)" stroke-width="1.6"/>
          <circle cx="1062" cy="22" r="10.6" fill="none" stroke="url(#mkhg-brass)" stroke-width="1.6"/>
        </svg>`,
      p1Svg: `
        <svg viewBox="0 0 600 36" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 2 L 594 2 M 10 34 L 594 34" stroke="#fde047" stroke-opacity="0.55" stroke-width="1"/>
          <polygon points="4,18 10,12 16,18 10,24" fill="none" stroke="#fde047" stroke-width="1.4"/>
        </svg>`,
      p2Svg: `
        <svg viewBox="0 0 600 36" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 6 2 L 590 2 M 6 34 L 590 34" stroke="#fde047" stroke-opacity="0.55" stroke-width="1"/>
          <polygon points="596,18 590,12 584,18 590,24" fill="none" stroke="#fde047" stroke-width="1.4"/>
        </svg>`,
      centerSvg: ''
    }),

    /* =========================================================================
       MK1 #5: EVO BROADCAST PRO (Clean Recessed Orb Rail — Zero Overlap!)
       ========================================================================= */
    'mk1-evo-broadcast': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <!-- Ultra-clean recessed LED underline below P1 & P2 Round Orbs -->
          <rect x="844" y="33" width="54" height="2.2" rx="1" fill="var(--art-p1, #2563eb)" opacity="0.9"/>
          <rect x="1022" y="33" width="54" height="2.2" rx="1" fill="var(--art-p2, #2563eb)" opacity="0.9"/>
        </svg>`,
      p1Svg: '',
      p2Svg: '',
      centerSvg: ''
    }),

    /* =========================================================================
       AVATAR #1: FOUR NATIONS NATIVE FILIGREE (1:1 Cel-Shaded Game Engine Match!)
       Replicates Avatar Legends' EXACT black ink + gold double bevel + Chinese
       key-pattern corner fretwork (回) & clears WINS 3 + Diamond Timer 41!
       Stage bridge sits cleanly BEHIND .sb-center (z-index 3 vs 10) with zero
       overlap on round text regardless of label length.
       ========================================================================= */
    'avatar-four-nations': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="avfn-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fef9c3"/>
              <stop offset="50%" stop-color="#eab308"/>
              <stop offset="100%" stop-color="#a16207"/>
            </linearGradient>
          </defs>
          <!-- Continuous cel-shaded black+gold bridge rail at y=12 docking seamlessly BEHIND .sb-center (z-index: 3 vs 10) -->
          <line x1="764" y1="12" x2="1156" y2="12" stroke="#0b0907" stroke-width="5.6" stroke-linecap="butt"/>
          <line x1="764" y1="12" x2="1156" y2="12" stroke="url(#avfn-gold)" stroke-width="2.4" stroke-linecap="butt"/>
          <line x1="764" y1="11.1" x2="1156" y2="11.1" stroke="#fef9c3" stroke-width="0.7" stroke-opacity="0.75"/>
          <!-- Ornamental diamond junctions anchored cleanly against the P1 & P2 score plaques -->
          <polygon points="764,12 769,8 774,12 769,16" fill="url(#avfn-gold)" stroke="#0b0907" stroke-width="1.3"/>
          <polygon points="1156,12 1151,8 1146,12 1151,16" fill="url(#avfn-gold)" stroke="#0b0907" stroke-width="1.3"/>
          <!-- Chinese Key-Pattern Scrolls (回) positioned in guaranteed-clear outer bridge shoulders (x=778..792 & 1128..1142) -->
          <path d="M 779 12 L 779 5 L 791 5 L 791 9 L 785 9 L 785 7" fill="none" stroke="#0b0907" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="miter"/>
          <path d="M 779 12 L 779 5 L 791 5 L 791 9 L 785 9 L 785 7" fill="none" stroke="#fef08a" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>
          <path d="M 1141 12 L 1141 5 L 1129 5 L 1129 9 L 1135 9 L 1135 7" fill="none" stroke="#0b0907" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="miter"/>
          <path d="M 1141 12 L 1141 5 L 1129 5 L 1129 9 L 1135 9 L 1135 7" fill="none" stroke="#fef08a" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>
        </svg>`,
      p1Svg: `
        <svg viewBox="0 0 560 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Double Cel-Shaded Black+Gold Frame & Chinese Fretwork Corner -->
          <path d="M 14 2 L 548 2 L 558 12 L 558 38 L 12 38 L 2 28 L 2 14 Z" fill="none" stroke="#fde047" stroke-width="1.6" stroke-opacity="0.85"/>
          <path d="M 8 8 L 20 8 L 20 14 L 14 14 L 14 11" fill="none" stroke="#fef08a" stroke-width="1.5"/>
          <path d="M 8 32 L 20 32 L 20 26 L 14 26 L 14 29" fill="none" stroke="#fef08a" stroke-width="1.5"/>
        </svg>`,
      p2Svg: `
        <svg viewBox="0 0 560 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 546 2 L 12 2 L 2 12 L 2 38 L 548 38 L 558 28 L 558 14 Z" fill="none" stroke="#fde047" stroke-width="1.6" stroke-opacity="0.85"/>
          <path d="M 552 8 L 540 8 L 540 14 L 546 14 L 546 11" fill="none" stroke="#fef08a" stroke-width="1.5"/>
          <path d="M 552 32 L 540 32 L 540 26 L 546 26 L 546 29" fill="none" stroke="#fef08a" stroke-width="1.5"/>
        </svg>`,
      centerSvg: ''
    }),

    /* =========================================================================
       AVATAR #2: AGNI KAI (Asymmetric Fire Nation Flame Crest vs. Water Tribe Wave!)
       ========================================================================= */
    'avatar-fire-vs-water': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="avak-fire" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#dc2626"/>
              <stop offset="55%" stop-color="#f97316"/>
              <stop offset="100%" stop-color="#fef08a"/>
            </linearGradient>
            <linearGradient id="avak-water" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stop-color="#1d4ed8"/>
              <stop offset="55%" stop-color="#0ea5e9"/>
              <stop offset="100%" stop-color="#a5f3fc"/>
            </linearGradient>
          </defs>
          <!-- P1 Flickering Flame Tongue & P2 Flowing Ocean Wave docking cleanly BEHIND .sb-center (strictly y=6..20) -->
          <path d="M 764 11 Q 798 5 836 10 L 960 11 L 960 16 L 836 16 Q 798 15 764 20 Z" fill="url(#avak-fire)" opacity="0.92"/>
          <path d="M 1156 11 Q 1122 5 1084 10 L 960 11 L 960 16 L 1084 16 Q 1122 15 1156 20 Z" fill="url(#avak-water)" opacity="0.92"/>
          <circle cx="792" cy="7" r="2.1" fill="#fef08a" opacity="0.88"/>
          <circle cx="1128" cy="7" r="2.1" fill="#e0f2fe" opacity="0.88"/>
        </svg>`,
      p1Svg: `
        <svg viewBox="0 0 560 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Fire Nation Jagged Crown Ridge -->
          <path d="M 2 34 L 18 4 L 38 12 L 54 2 L 558 3" fill="none" stroke="#fb923c" stroke-width="2" stroke-opacity="0.9"/>
          <polygon points="10,20 22,8 28,20 22,32" fill="#f97316" opacity="0.65"/>
        </svg>`,
      p2Svg: `
        <svg viewBox="0 0 560 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Water Tribe Flowing Wave Crest -->
          <path d="M 558 34 Q 546 6 520 8 Q 500 10 486 4 L 2 4" fill="none" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.9"/>
          <path d="M 544 20 A 10 10 0 1 1 530 12 A 7 7 0 1 0 544 20 Z" fill="#bae6fd" opacity="0.75"/>
        </svg>`,
      centerSvg: ''
    }),

    /* =========================================================================
       AVATAR #3: RAAVA SPIRIT STATE (Floating Luminous Lotus & Spirit Ribbons!)
       ========================================================================= */
    'avatar-avatar-state': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="avsp-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#e0f2fe" stop-opacity="0.45"/>
            </linearGradient>
            <linearGradient id="avsp-r" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#fef9c3" stop-opacity="0.45"/>
            </linearGradient>
          </defs>
          <!-- Flowing Luminous Raava Spirit Trails arching cleanly at y=8..19 BEHIND .sb-center -->
          <path d="M 764 16 C 804 7, 846 11, 960 12" fill="none" stroke="url(#avsp-l)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M 764 21 C 802 14, 844 16, 960 16" fill="none" stroke="#7dd3fc" stroke-width="1" stroke-opacity="0.62"/>
          <path d="M 1156 16 C 1116 7, 1074 11, 960 12" fill="none" stroke="url(#avsp-r)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M 1156 21 C 1118 14, 1076 16, 960 16" fill="none" stroke="#fde68a" stroke-width="1" stroke-opacity="0.62"/>
          <circle cx="790" cy="9" r="2.2" fill="#e0f2fe" opacity="0.88"/>
          <circle cx="1130" cy="9" r="2.2" fill="#fef9c3" opacity="0.88"/>
        </svg>`,
      p1Svg: `
        <svg viewBox="0 0 560 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 18 3 C 6 12, 6 28, 18 37 L 546 37 C 556 28, 556 12, 546 3 Z" fill="none" stroke="#7dd3fc" stroke-width="1.5" stroke-opacity="0.8"/>
          <circle cx="14" cy="20" r="3" fill="#e0f2fe"/>
        </svg>`,
      p2Svg: `
        <svg viewBox="0 0 560 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 14 3 C 4 12, 4 28, 14 37 L 542 37 C 554 28, 554 12, 542 3 Z" fill="none" stroke="#fde047" stroke-width="1.5" stroke-opacity="0.8"/>
          <circle cx="546" cy="20" r="3" fill="#fef9c3"/>
        </svg>`,
      centerSvg: ''
    }),

    /* =========================================================================
       AVATAR #4: BA SING SE CARVED JADE (Stone Slab + Earth Kingdom Coin Motif!)
       ========================================================================= */
    'avatar-earth-kingdom': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <!-- Carved Imperial Jade Stone Beams docking seamlessly BEHIND .sb-center (y=8..17) -->
          <polygon points="764,9 960,9 960,17 764,17" fill="#0b2117" stroke="#10b981" stroke-width="1.5"/>
          <polygon points="1156,9 960,9 960,17 1156,17" fill="#211709" stroke="#f59e0b" stroke-width="1.5"/>
          <rect x="780" y="11" width="10" height="4" fill="#34d399"/>
          <rect x="1130" y="11" width="10" height="4" fill="#fbbf24"/>
        </svg>`,
      p1Svg: `
        <svg viewBox="0 0 560 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Stepped Stone Monolith Corners & Rivets -->
          <path d="M 10 2 L 552 2 L 558 8 L 558 32 L 552 38 L 10 38 L 2 30 L 2 10 Z" fill="none" stroke="#34d399" stroke-width="1.8" stroke-opacity="0.82"/>
          <rect x="7" y="16" width="6" height="8" fill="#10b981" stroke="#a7f3d0" stroke-width="0.8"/>
        </svg>`,
      p2Svg: `
        <svg viewBox="0 0 560 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 8 2 L 550 2 L 558 10 L 558 30 L 550 38 L 8 38 L 2 32 L 2 8 Z" fill="none" stroke="#fbbf24" stroke-width="1.8" stroke-opacity="0.82"/>
          <rect x="547" y="16" width="6" height="8" fill="#f59e0b" stroke="#fde68a" stroke-width="0.8"/>
        </svg>`,
      centerSvg: ''
    }),

    /* =========================================================================
       AVATAR #5: AIR NOMAD BAMBOO SCROLL (Unrolled Ancient Scroll + Glued 3D Wood Rollers!)
       ========================================================================= */
    'avatar-air-temple-light': () => ({
      stageSvg: `
        <svg viewBox="0 0 1920 140" width="1920" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <!-- Air Nomad Swirl Cloud Filigree bridging cleanly BEHIND .sb-center with signature curls in clear outer shoulders -->
          <line x1="764" y1="13" x2="960" y2="13" stroke="#ea580c" stroke-width="2" stroke-linecap="round"/>
          <line x1="960" y1="13" x2="1156" y2="13" stroke="#0284c7" stroke-width="2" stroke-linecap="round"/>
          <path d="M 776 13 Q 782 5 790 6 Q 796 7 795 12 Q 794 15 789 14 Q 786 13 788 10" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M 1144 13 Q 1138 5 1130 6 Q 1124 7 1125 12 Q 1126 15 1131 14 Q 1134 13 1132 10" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`,
      p1Svg: `
        <svg viewBox="0 0 544 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
          <defs>
            <linearGradient id="avas-w1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#451a03"/>
              <stop offset="45%" stop-color="#92400e"/>
              <stop offset="75%" stop-color="#b45309"/>
              <stop offset="100%" stop-color="#290f02"/>
            </linearGradient>
          </defs>
          <!-- 3D Lacquered Wooden Scroll Roller GLUED directly to outer left edge of P1 parchment! -->
          <rect x="-10" y="-3" width="13" height="46" rx="5" fill="url(#avas-w1)" stroke="#fef08a" stroke-width="1.2"/>
          <rect x="-8" y="-6" width="9" height="5" rx="2" fill="#eab308"/>
          <rect x="-8" y="41" width="9" height="5" rx="2" fill="#eab308"/>
          <line x1="6" y1="4" x2="538" y2="4" stroke="#b45309" stroke-opacity="0.45" stroke-width="1"/>
          <line x1="6" y1="36" x2="538" y2="36" stroke="#b45309" stroke-opacity="0.45" stroke-width="1"/>
        </svg>`,
      p2Svg: `
        <svg viewBox="0 0 544 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
          <defs>
            <linearGradient id="avas-w2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#290f02"/>
              <stop offset="30%" stop-color="#b45309"/>
              <stop offset="65%" stop-color="#92400e"/>
              <stop offset="100%" stop-color="#451a03"/>
            </linearGradient>
          </defs>
          <!-- 3D Lacquered Wooden Scroll Roller GLUED directly to outer right edge of P2 parchment! -->
          <rect x="541" y="-3" width="13" height="46" rx="5" fill="url(#avas-w2)" stroke="#fef08a" stroke-width="1.2"/>
          <rect x="543" y="-6" width="9" height="5" rx="2" fill="#eab308"/>
          <rect x="543" y="41" width="9" height="5" rx="2" fill="#eab308"/>
          <line x1="6" y1="4" x2="538" y2="4" stroke="#0369a1" stroke-opacity="0.45" stroke-width="1"/>
          <line x1="6" y1="36" x2="538" y2="36" stroke="#0369a1" stroke-opacity="0.45" stroke-width="1"/>
        </svg>`,
      centerSvg: ''
    })
  };

  function getPresetArt(themeId) {
    const fn = PRESET_ART[String(themeId || '')];
    return fn ? fn() : null;
  }

  global.FGC_PRESET_ART = PRESET_ART;
  global.FGC_GET_PRESET_ART = getPresetArt;
})(typeof window !== 'undefined' ? window : globalThis);
