#!/usr/bin/env node
/**
 * FGC Open Scorebars — Ultra-Lightweight Zero-Dependency Local Server
 * Uses only Node.js built-in modules (~15MB RAM, <5ms SSE latency).
 *
 * Serves:
 *   GET  /             -> index.html (OBS Browser Source 1920x1080)
 *   GET  /panel        -> panel.html (Local Control Panel + OBS Custom Dock + Mobile LAN)
 *   GET  /api/state    -> Current scoreboard JSON state
 *   POST /api/state    -> Update state (merges or replaces) & broadcasts to all overlays via SSE
 *   GET  /api/events   -> Server-Sent Events (SSE) real-time stream
 *   GET  /api/players  -> Saved local player database (autocomplete/history)
 *   POST /api/players  -> Save/update/delete player entry
 *   GET  /api/info     -> Local LAN IPs and URLs for OBS & mobile remote control
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFile, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { captureOverlayPng, findChromiumExecutable } from './export-png.mjs';
import {
  connectStartGG,
  fetchStartGGEventSets,
  fetchStartGGEventSeeds,
  fetchStartGGEntrants,
  fetchStartGGTournamentLogo,
  fetchStartGGStandings,
  reportStartGGSet,
  connectChallonge,
  fetchChallongeTournamentLogo,
  fetchChallongeStandings,
  reportChallongeMatch,
  getDemoTournament,
  getDemoSeeding,
  getDemoStandings,
  buildTop8BracketFromSets,
  getDemoTop8Bracket,
  getDemoPools,
  getDemoPoolTree,
  getDemoTop16,
  DEMO_GAME_CONFIGS,
  resolveDemoGameId,
  fetchStartGGPools,
  reportDemoSet,
  cleanSeedNum
} from './tournaments.mjs';
import { createAssetManager } from './assets.mjs';
import { createFlagManager } from './flags-manager.mjs';
import { createSfxManager, DEFAULT_AUDIO_STATE, normalizeAudioState, mergeAudioState } from './sfx-manager.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const WEB_DIR = path.join(ROOT_DIR, 'app', 'web');
const ASSETS_STATIC_DIR = path.join(ROOT_DIR, 'assets');

export const APP_VERSION = '2.8.1';
const GITHUB_REPO = 'N5K-dev/fgc-open-scorebars';
const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '0.0.0.0';
const DATA_DIR = path.join(ROOT_DIR, 'data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');
const PLAYERS_FILE = path.join(DATA_DIR, 'players.json');
const PRESETS_FILE = path.join(DATA_DIR, 'presets.json');
const INTEGRATIONS_FILE = path.join(DATA_DIR, 'integrations.json');
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');
const FONTS_DIR = path.join(DATA_DIR, 'fonts');
const FONTS_FILE = path.join(FONTS_DIR, 'fonts.json');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(FONTS_DIR, { recursive: true });
const assets = createAssetManager(DATA_DIR);
const flagMgr = createFlagManager(__dirname, DATA_DIR);
const sfxMgr = createSfxManager(DATA_DIR);

export const DEFAULT_VS = {
  visible: true,
  viewMode: '1v1',             // '1v1' | 'matchup-2x2'
  matchupTheme: 'sync-vs',     // 'sync-vs' (follows active VS Splash Design + Custom Colors!) | 'matchup-battle-coliseum' | 'matchup-editorial-light' | 'matchup-obsidian-pro' | 'matchup-evo-blue' | 'matchup-neon-clash'
  matchupBoardPreset: 'opening', // 'opening' | 'quarters' | 'finals' | 'custom'
  matchupCustomSlots: ['wsf1', 'wsf2', 'lr1_1', 'lr1_2'],
  matchupShowScore: true,
  matchupShowSeeds: true,
  matchupShowHandles: true,
  matchupGlobalY: 0,           // -550..+350 px global vertical shift for all 8 Matchups 2x2 renders
  matchupGlobalX: 0,           // -350..+350 px global horizontal shift for all 8 Matchups 2x2 renders
  matchupGlobalScale: 100,     // 40..350 % global zoom for all 8 Matchups 2x2 renders
  matchupArtPos: {},           // keyed by `${slotId}_p1` | `${slotId}_p2` -> { x, y, scale, flip }
  matchupCardBg: '',           // '' = follow active VS Design / theme
  matchupCardBorder: '',       // '' = follow active VS Design / theme
  matchupWinColor: '',         // '' = follow P1 / theme
  matchupLosColor: '',         // '' = follow P2 / theme
  matchupVsBadgeBg: '',        // '' = follow P1->P2 / emblem
  matchupCardRadius: -1,       // -1 = auto (12px), else 0..28px
  matchupShellOpacity: 72,     // 0..100% shell panel backdrop opacity over VS Design stage
  source: 'current',           // 'current' | 'next' | 'custom'
  design: 'arcade-pop',        // 42 built-in broadcast designs from vs-designs.js
  game: 'tekken8',
  pack: 'full',
  avatarMode: 'hero-fallback', // 'badge' | 'hero-fallback' | 'portrait-hero' | 'off'
  bgMode: 'theme',             // 'theme' | 'custom' | 'transparent'
  bgColor1: '#f5b800',
  bgColor2: '#10131e',
  p1Color: '#ff512f',
  p2Color: '#2563eb',
  accentColor: '',             // '' = design theme default
  // Animated Pattern Studio
  pattern: 'theme',            // 'theme' | 'symbols' | 'grid' | 'halftone' | 'diagonal' | 'hex' | 'chevrons' | 'rings' | 'stars' | 'none'
  patternSpeed: 40,            // 0 (static) .. 100 (fast)
  patternDir: 'diag-dr',       // 'diag-dr' | 'up' | 'down' | 'left' | 'right' | 'diag-ul'
  patternOpacity: -1,          // -1 = theme default, else 0..80 %
  patternScale: 100,           // 50..200 %
  // Architectural Frame, Neon Borders & 4-Side Stylized Edge Bands
  splitOverride: 'theme',      // 'theme' | 'vertical' | 'diag-left' | 'diag-right' | 'chevron' | 'horizon' | 'framed-cards' | 'radial-clash' | 'triple-stripe' | 'minimal-clean'
  frameStyle: 'theme',         // 'theme' | 'arcade-teeth' | 'cyber-corners' | 'cinematic-bars' | 'double-gold' | 'hazard-tape' | 'manga-ink' | 'neon-tube' | 'dual-neon' | 'tech-bezel' | 'minimal-line' | 'none'
  frameColor: '',              // '' = design theme default
  frameAccent: '',             // '' = design theme default
  frameThickness: 0,           // 0 = theme default, else 2..36 px
  frameInset: -1,              // -1 = theme default, else 0..48 px
  frameOpacity: 100,           // 10..100 %
  frameGlow: 'theme',          // 'theme' | 'none' | 'subtle' | 'neon' | 'dual-neon' | 'pulse'
  bandTop: false,
  bandBottom: false,
  bandLeft: false,
  bandRight: false,
  bandStyle: 'solid-trim',     // 'solid-trim' | 'arcade-notch' | 'neon-rail' | 'hazard' | 'cyber-tech' | 'gradient-glow' | 'glass-bar'
  bandColor: '',               // '' = dark auto / theme
  bandAccent: '',              // '' = accent / P1-P2 split
  bandDualSideColor: true,     // Left=P1, Right=P2, Top/Bottom=P1->P2 gradient accent
  bandThickness: 28,           // 6..96 px
  bandOpacity: 95,             // 15..100 %
  bandGlow: 'subtle',          // 'none' | 'subtle' | 'neon' | 'pulse'
  bandAnim: 'none',            // 'none' | 'scroll' | 'pulse' | 'shimmer'
  // Header Studio (Full Colors, Shape, Size, Position, Internal Order)
  headerStyle: 'theme',        // 'theme' | 'trapezoid' | 'floating-pill' | 'full-ribbon' | 'hex-crest' | 'minimal-text' | 'skew-tag' | 'notched-bar' | 'cyber-bar' | 'none'
  headerScale: 100,            // 60..160 %
  headerOffsetY: 0,            // 0..320 px
  headerOffsetX: 0,            // -600..600 px
  headerAlign: 'center',       // 'center' | 'left' | 'right'
  headerWidth: 0,              // 0 = auto, else 320..1920 px
  headerOpacity: 100,          // 15..100 %
  headerSurface: 'theme',      // 'theme' | 'solid' | 'gradient' | 'glass' | 'metallic'
  headerBgColor: '',           // '' = theme default
  headerBgColor2: '',          // '' = theme/solid default
  headerTextColor: '',         // '' = theme default
  headerEyebrowColor: '',      // '' = accent default
  headerBorderColor: '',       // '' = accent default
  headerBorderWidth: -1,       // -1 = theme default, else 0..12 px
  headerRadius: -1,            // -1 = theme default, else 0..40 px
  headerFontSize: 100,         // 65..150 %
  headerFormatBg: '',          // '' = accent default
  headerFormatText: '',        // '' = #090b10
  headerGlow: 'none',          // 'none' | 'subtle' | 'neon' | 'pulse'
  headerOrder: 'eyebrow-top',  // 'eyebrow-top' | 'eyebrow-bottom' | 'inline'
  headerFormatPos: 'right',    // 'right' | 'left' | 'hidden'
  showEyebrow: true,
  // Center Divider Studio (with animated scrolling contents!)
  dividerStyle: 'theme',       // 'theme' | 'x-tape' | 'chevron-stream' | 'hazard-scroll' | 'energy-beam' | 'lightning-crack' | 'scan-rail' | 'ticker-vs' | 'solid-glow' | 'hairline' | 'none'
  dividerAnim: 'theme',        // 'theme' | 'scroll-down' | 'scroll-up' | 'pulse' | 'shimmer' | 'static'
  dividerSpeed: 45,            // 0 (static) .. 100 (fast)
  dividerWidth: 0,             // 0 = theme default, else 2..64 px
  dividerTilt: null,           // null = theme default, else -20..20 deg
  dividerColor: '',            // '' = theme default
  dividerColor2: '',           // '' = theme secondary/border color
  dividerGlow: 'theme',        // 'theme' | 'none' | 'subtle' | 'neon' | 'intense'
  dividerOpacity: 100,         // 10..100 %
  dividerOffsetX: 0,           // -200..200 px
  // Center VS Emblem Studio
  emblemStyle: 'theme',        // 'theme' | 'winged' | 'diamond-shield' | 'circle-ring' | 'hex-core' | 'comic-burst' | 'pill-tag' | 'monolith' | 'slash-bolt' | 'minimal-text' | 'none'
  emblemText: 'VS',
  emblemScale: 100,            // 50..180 %
  emblemOffsetX: 0,            // -300..300 px
  emblemOffsetY: 0,            // -300..300 px
  emblemRotate: 0,             // -35..35 deg
  emblemAnim: 'theme',         // 'theme' | 'none' | 'float' | 'pulse' | 'glitch' | 'spin-ring'
  emblemBgColor: '',           // '' = theme default
  emblemTextColor: '',         // '' = theme default
  emblemStrokeColor: '',       // '' = theme default
  emblemGlow: 'theme',         // 'theme' | 'none' | 'subtle' | 'neon' | 'intense'
  // Nameplates, Internal Layout/Order, Flag-BG Fade Studio & Typography
  plateStyle: 'theme',         // 'theme' | 'arcade-box' | 't8-blade' | 'glass-pill' | 'floating-clean' | 'corner-ribbon' | 'hex-plate' | 'comic-skew' | 'stacked-banner' | 'luxury-thin' | 'none'
  plateBottom: -1,             // -1 = theme default, else 0..450 px
  plateEdgeX: -1,              // -1 = theme default (62px), else 0..240 px
  plateWidth: 790,             // 420..920 px
  plateMinHeight: 0,           // 0 = auto, else 80..220 px
  plateScale: 100,             // 65..140 %
  plateOpacity: 96,            // 15..100 %
  plateSkew: null,             // null = theme default, else -18..18 deg
  plateSurface: 'theme',       // 'theme' | 'solid' | 'gradient' | 'glass' | 'metallic'
  plateBgColor: '',            // '' = theme default
  plateBgColor2: '',           // '' = theme/solid default
  plateTextColor: '',          // '' = theme default
  plateSponsorColor: '',       // '' = accent default
  plateBorderColor: '',        // '' = theme default
  plateBorderWidth: -1,        // -1 = theme default, else 0..14 px
  plateRadius: -1,             // -1 = theme default, else 0..40 px
  plateGlow: 'none',           // 'none' | 'subtle' | 'neon' | 'pulse'
  plateShadow: 65,             // 0..100 %
  plateScoreBg: '',            // '' = P1/P2 color default
  plateScoreText: '',          // '' = #ffffff
  plateAlign: 'auto',          // 'auto' | 'left' | 'center' | 'right' | 'inner'
  plateScorePos: 'inner',      // 'inner' | 'outer' | 'floating-top' | 'inline'
  plateAvatarPos: 'outer',     // 'outer' | 'inner'
  plateInfoOrder: 'meta-name-char',       // 'meta-name-char' | 'name-meta-char' | 'char-name-meta' | 'name-char-meta'
  plateMetaOrder: 'flags-sponsor-bracket', // 'flags-sponsor-bracket' | 'sponsor-flags-bracket' | 'bracket-sponsor-flags' | 'flags-bracket-sponsor'
  plateFlagPos: 'meta',        // 'meta' | 'outer-strip' | 'inner-strip' | 'bg-only'
  plateFlagBg: 'off',          // 'off' | 'fade-out' | 'fade-in' | 'full-blend' | 'diagonal-fade' | 'dual-split'
  plateFlagBgSource: 'country', // 'country' | 'region' | 'both'
  plateFlagBgOpacity: 45,      // 10..100 %
  plateFlagBgFadeStart: 20,    // 0..80 %
  plateFlagBgFadeEnd: 92,      // 25..100 %
  plateFlagBgAngle: 0,         // -45..45 deg
  plateFlagBgZoom: 115,        // 100..220 %
  plateFlagBgBlur: 0,          // 0..16 px
  plateFlagBgBlend: 'normal',  // 'normal' | 'soft-light' | 'overlay' | 'screen' | 'luminosity'
  plateFlagBgAnim: 'none',     // 'none' | 'fade-in' | 'wave-drift' | 'shimmer'
  fontDisplay: 'theme',        // 'theme' | Google font name | Custom PC Font
  nameScale: 100,              // 65..150 %
  sponsorScale: 100,           // 60..160 %
  charNameScale: 100,          // 60..160 %
  scoreScale: 100,             // 65..150 %
  flagMode: 'both',            // 'both' | 'country' | 'region' | 'none' (supports Region-Only!)
  flagSize: 100,               // 70..150 %
  flagWatermarkOpacity: -1,    // -1 = theme default, else 0..60 %
  // Branding & Info Toggles
  eyebrow: 'UP NEXT',
  subtitle: '',
  showFlags: true,
  showH2H: true,
  showSponsor: true,
  showBracket: true,
  showSeed: true,
  showCharName: true,
  showLogo: true,
  autoEventLogo: true,         // Auto-load tournament logo from Start.gg / Challonge / Demo
  showScore: false,
  logoUrl: '',
  logoSource: '',              // '' | 'auto' | 'manual'
  logoTournamentSlug: '',
  logoScale: 100,              // 50..180 %
  logoPos: 'bottom-left',      // 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right'
  h2hOffsetY: 84,              // 20..240 px from bottom
  // Millimeter Character Framing
  p1Flip: false,
  p2Flip: true,
  p1Zoom: 100,
  p2Zoom: 100,
  p1OffsetX: 0,                // -300..300 px
  p2OffsetX: 0,                // -300..300 px
  p1OffsetY: 0,                // -260..260 px
  p2OffsetY: 0,                // -260..260 px
  charShadow: 60,              // 0..100 %
  charIdleAnim: 'none',        // 'none' | 'breathe' | 'float'
  // OBS Scene Entry & Ambient FX
  entryAnim: 'slam-split',     // 10 choreography styles
  entrySpeed: 100,             // 40..200 %
  ambientAnim: 'theme',        // 'theme' | 'none' | 'pulse-glow' | 'shimmer-sweep' | 'energy-sparks' | 'spotlight-sway' | 'scanline-crt'
  introNonce: 0,
  customMatch: {
    round: 'GRAND FINALS',
    format: 'FT3',
    p1: { name: 'PLAYER 1', sponsor: '', flag: '', region: '', bracket: '', seed: '', character: '', avatar: '', score: 0 },
    p2: { name: 'PLAYER 2', sponsor: '', flag: '', region: '', bracket: '', seed: '', character: '', avatar: '', score: 0 }
  },
  nextMatch: null
};

export const DEFAULT_STYLE = {
  // Typography
  fontName: 'theme',
  fontScore: 'theme',
  fontScale: 100,
  letterSpacing: 4,
  italic: 'theme',       // 'theme' | 'on' | 'off'
  scoreSlant: 'mirror',  // 'mirror' (\ / symmetric to blade) | 'upright' | 'italic'
  uppercase: true,
  // Layout & Shape overrides
  layoutOverride: 'theme',   // 'theme' | 'blade' | 'crown' | 'split' | 'arch'
  scorePosOverride: 'theme', // 'theme' | 'inner' | 'outer'
  shape: 'theme',            // 'theme' | 'blade-slant' | 'diagonal' | 'bevel' | 'hex' | 'skew' | 'flat' | 'rounded'
  flagStyle: 'theme',        // 'theme' | 'blade-twt' | 'fade-blend' | 'twt-code' | 'split-dual' | 'bezel' | 'classic'
  borderStyle: 'theme',      // 'theme' | 'thin' | 'bold' | 'neon' | 'none'
  centerStyle: 'theme',      // 'theme' | 'floating' | 'trapezoid' | 'hex' | 'pill' | 'flat' | 'chamfer' | 'ribbon'
  centerScale: 100,          // 50..260 % free center plate scale across ALL presets
  centerFontSize: 100,       // 60..220 % independent round & format text scale
  centerWidth: 0,            // 0 = theme auto, else 140..760 px
  centerHeight: 0,           // 0 = theme auto, else 20..110 px
  centerPadX: -1,            // -1 = theme auto, else 4..64 px
  centerOffsetX: 0,          // -500..500 px horizontal shift
  centerOffsetY: 0,          // -40..220 px vertical shift
  centerLayout: 'theme',     // 'theme' | 'row' | 'row-rev' | 'stack' | 'stack-rev'
  centerRadius: -1,          // -1 = theme auto, else 0..40 px
  centerBorderW: -1,         // -1 = theme auto, else 0..8 px
  centerOpacity: 100,        // 15..100 % center plate opacity
  centerGlow: 'theme',       // 'theme' | 'none' | 'subtle' | 'neon' | 'pulse'
  centerCustomColors: false, // Independent center-plate color override
  centerBgAlpha: 94,         // 0..100 % center plate background alpha
  centerTextColor: '#ffffff',
  centerBorderColor: '#ffd24d',
  centerFormatBg: '#ffd24d',
  centerFormatText: '#0b0d14',
  outerBlade: 'theme',       // 'theme' | 'on' | 'off'
  bladeSlant: 22,            // 0..38 px diagonal blade angle
  barHeight: 0,              // 0 = theme default, else 32..64 px
  flagWidth: 62,             // 40..140 px integrated flag width
  flagOpacity: 100,          // 25..100 % flag intensity
  // Flag Fade-In / Fade-Out Studio
  flagFadeMode: 'fade-out',  // 'fade-out' | 'both' | 'fade-in' | 'diagonal' | 'vignette'
  flagFadeCurve: 'smooth',   // 'smooth' | 'soft' | 'sharp' | 'linear'
  flagFadeIn: 0,             // 0..45 % outer edge fade-in distance
  flagFadeStart: 34,         // 10..85 % where solid plateau ends and fade-out begins
  flagFadeEnd: 98,           // 40..100 % where fade-out reaches 0% alpha
  flagFadeAngle: 0,          // -35..35 deg tilt angle on the fade gradient
  flagFit: 'fit',            // 'fit' (full flag, no crop) | 'contain' (exact 3:2) | 'cover' (zoom crop)
  flagZoom: 100,             // 50..200 % vector zoom inside flag frame
  flagShiftX: 0,             // -40..40 % horizontal shift inside flag frame
  flagShiftY: 0,             // -40..40 % vertical shift inside flag frame
  flagSaturation: 100,       // 30..160 % flag color vibrancy
  flagBrightness: 96,        // 50..135 % flag brightness match
  showIsoCode: 'theme',      // 'theme' | 'on' | 'off' (PHL/ESP/MAD tag)
  // Colors, Surfaces & Gradients
  customColors: false,
  fillMode: 'gradient',      // 'gradient' | 'solid' | 'glass' | 'metallic' | 'theme'
  bgColor1: '#121520',
  bgColor2: '#07080d',
  bgAngle: 180,
  bgAlpha: 94,
  glassBlur: 14,             // px (4..28) for Glassmorphism surface
  glassBorder: 22,           // % (0..60) frosted hairline border brightness
  p1Color1: '#ff512f',
  p1Color2: '#dd2476',
  p2Color1: '#2563eb',
  p2Color2: '#7c3aed',
  centerColor1: '#1b1f2e',
  centerColor2: '#0c0e16',
  centerAccent: '#ffd24d',
  textColor: '#ffffff',
  sponsorColor: '#ffbe4f',
  // Visual FX
  glow: 'subtle',            // 'none' | 'subtle' | 'intense' | 'pulse'
  sheen: 'off',              // 'off' | 'slow' | 'fast'
  animBorder: 'off',         // 'off' | 'flow' | 'breathe'
  texture: 'none',           // 'none' | 'carbon' | 'scanlines' | 'hex' | 'stripes'
  textShadow: 'broadcast',   // 'broadcast' | 'hard' | 'neon' | 'none'
  // Transitions & OBS Scene Intro
  entryAnim: 'split-wings',  // 'slide-top' | 'split-wings' | 'cascade' | 't8-slash' | 'slam' | 'wipe' | 'glitch' | 'fade'
  scoreAnim: 'pop',          // 'pop' | 'flip' | 'roll' | 'shockwave' | 'none'
  animSpeed: 'normal',       // Legacy preset label ('fast' | 'normal' | 'cinematic')
  animDuration: 450,         // Exact entry/exit transition duration in ms (150..2500)
  scoreAnimDuration: 450,    // Exact +1 score pop/flip/roll/shockwave duration in ms (200..1500)
  sceneAutoIntro: true,      // Replay entry transition whenever OBS loads/activates the scene
  sceneDelay: 250,           // ms delay to sync after OBS Stinger/Fade transition (0..2000)
  introStagger: true,        // Center enters first, then P1/P2 wings unfold
  introFlash: true,          // Metallic sheen flash across plates on landing
  introOnSetChange: false,   // Also replay clean out->in transition when loading a new tournament set
  // Match Point Badge Customization
  mpStyle: 'side-peek',      // 'side-peek' | 'inside-ribbon' | 'under-wing' | 'outer-peek' | 'score-glow'
  mpColor: 'fire',           // 'fire' | 'theme' | 'gold' | 'crimson' | 'cyan'
  mpText: 'MATCH POINT',
  // Super Smash Bros. Ultimate Dedicated Layout & Branding Controls
  smashFlagPos: 'below',     // 'below' | 'inside-outer' | 'inside-score' | 'fade-bg'
  smashLogoMode: 'auto',     // 'auto' | 'smash-ball' | 'hidden'
  smashInfoPos: 'left'       // 'left' | 'center-top' | 'hidden'
};

export const DEFAULT_RESULTS = {
  visible: true,
  viewMode: 'normal',        // 'normal' | 'bracket' | 'matchup-1v1' | 'matchup-2x2'
  aspect: '16:9',            // '16:9' (1920x1080 OBS) | '4:5' (1080x1350 Vertical Social)
  showTop12: false,          // Optional 9th-place 4-player strip
  qualifyBadge: '',          // Optional 1st-place pill (e.g. QUALIFIES FOR FINALS)
  design: 'res-evo-gold',
  layoutOverride: 'theme',   // 'theme' | 'champ-left' | 'podium-top' | 'esports-grid' | 'tower-ladder' | 'top4-quad' | 'podium-3' | 'editorial-rows' | 'skew-neon' | 'crown-graffiti' | 'vertical-podium' | 'poster-rows' | 'comic-panels'
  cardStyle: 'theme',        // 'theme' | 'angled' | 'chamfer' | 'sharp' | 'glass' | 'comic' | 'minimal'
  game: 'tekken8',
  pack: 'full',
  // Event Header & Branding
  title: 'TOP 8 RESULTS',
  subtitle: 'TOURNAMENT FINALS',
  entrantsCount: '',
  footerText: '',
  logoUrl: '',               // '' = auto-inherit state.vs.logoUrl when showLogo is true
  showLogo: true,
  showCrown: true,
  showFlags: true,
  flagMode: 'both',          // 'both' | 'country' | 'region' | 'none'
  avatarMode: 'badge',       // 'badge' | 'fallback' | 'avatar-only' | 'char-only'
  showSponsor: true,
  showCharName: true,
  showHandles: true,
  showSeed: true,
  showEntrants: true,
  // Colors, Typography & Pattern Studio
  bgMode: 'theme',           // 'theme' | 'custom' | 'transparent'
  bgColor1: '#1d356b',
  bgColor2: '#060912',
  accentColor: '',
  goldColor: '',
  fontDisplay: 'theme',
  pattern: 'theme',          // 'theme' | 'symbols' | 'grid' | 'halftone' | 'diagonal' | 'hex' | 'chevrons' | 'rings' | 'stars' | 'none'
  patternSpeed: 38,
  patternDir: 'diag-dr',
  patternOpacity: -1,
  patternScale: 100,
  // Animations & Ambient FX
  entryAnim: 'theme',        // 'theme' | 'cascade-slam' | 'podium-rise' | 'diag-wipe' | 'zoom-punch' | 'slide-ladder' | 'curtain-rise' | 'pop-bounce' | 'cyber-glitch' | 'shatter-drop' | 'clean-fade'
  entrySpeed: 100,
  staggerMs: 85,
  ambientAnim: 'theme',      // 'theme' | 'none' | 'confetti-gold' | 'energy-sparks' | 'spotlight-sweep' | 'petals-drift' | 'shimmer-wave' | 'aurora-glow' | 'scanline-crt'
  cardIdleAnim: 'theme',     // 'theme' | 'none' | 'champ-glow' | 'float-wave' | 'sheen-loop'
  charZoom: 100,
  charOffsetX: 0,
  charOffsetY: 0,
  charFlip: false,
  // Granular Top 8 Element Layout & Framing Studio
  infoAlign: 'theme',          // 'theme' | 'left' | 'center' | 'right'
  infoVPos: 'theme',           // 'theme' | 'bottom' | 'middle' | 'top'
  infoOffsetX: 0,              // -300..+300 px
  infoOffsetY: 0,              // -200..+200 px
  nameScale: 100,              // 65..150 %
  metaScale: 100,              // 65..150 %
  infoScrim: 'theme',          // 'theme' | 'dark' | 'pill' | 'none'
  rankPos: 'theme',            // 'theme' | 'top-left' | 'top-right' | 'center-left' | 'bottom-right' | 'hidden'
  rankOffsetX: 0,              // -200..+200 px
  rankOffsetY: 0,              // -200..+200 px
  rankScale: 100,              // 65..150 %
  artFit: 'theme',             // 'theme' | 'contain' | 'cover'
  artFocusY: -1,               // -1 auto | 0..100 %
  artStripWidth: 0,            // 0 auto | 30..100 %
  artEdgeFade: 'theme',        // 'theme' | 'soft' | 'wide' | 'none'
  headerScale: 100,            // 70..135 %
  cardGap: -1,                 // -1 auto | 4..36 px
  cardBorderStyle: 'solid',    // 'solid' | 'double' | 'corners' | 'dashed' | 'gradient' | 'neon' | 'rails' | 'none'
  cardBorderWidth: 0,          // 0 auto | 1..6 px
  cardCutSize: 0,              // 0 auto | 8..44 px
  cardBorderColor: '',         // '' auto (rank/theme) | custom hex
  cardBorderFx: 'none',        // 'none' | 'soft-glow' | 'neon-pulse' | 'shimmer' | 'marching-trace' | 'champ-trace'
  introNonce: 0,
  // Live Tournament Auto-Sync Link
  autoSyncTournament: true,
  linkedProvider: '',
  linkedTournament: '',
  tournamentStatus: '',      // '' | 'live' | 'completed' | 'upcoming'
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
    { place: 9, name: 'PLAYER 9',  sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
    { place: 9, name: 'PLAYER 10', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
    { place: 9, name: 'PLAYER 11', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' },
    { place: 9, name: 'PLAYER 12', sponsor: '', flag: '', region: '', seed: '', character: '', secondaryChars: [], avatar: '', handle: '', charZoom: 100, charX: 0, charY: 0, charFlip: false, cardShape: 'global' }
  ]
};

export const DEFAULT_TOP8 = {
  bracketTheme: 'bracket-cpt-pro',      // 'bracket-cpt-pro' | 'bracket-evo-broadcast' | 'bracket-dark-clean' | 'bracket-editorial-light'
  showGfReset: 'auto',                  // 'auto' | 'show' | 'hide'
  showBracketTicker: true,
  bracketTickerText: '#FGCOPEN · TOP 8 DOUBLE ELIMINATION FINALS',
  bracketShowIso: true,
  matchupTheme: 'matchup-editorial-light', // 'matchup-editorial-light' | 'matchup-obsidian-pro' | 'matchup-evo-blue'
  activeMatchSlot: 'wf',                // 'wsf1'..'lf' | 'gf' | 'gfr' | 'current'
  boardPreset: 'opening',               // 'opening' | 'quarters' | 'finals'
  sourceSlots: getDemoTop8Bracket().slots,
  manualOverrides: {}
};

export const DEFAULT_BRACKETS = {
  visible: true,
  mode: 'top8-de',                  // 'top8-de' | 'pools-groups' | 'pool-tree' | 'top16-table'
  design: 'bk-cpt-combo-breaker',
  title: 'FGC OPEN CHAMPIONSHIP — TOP 8',
  subtitle: 'DOUBLE ELIMINATION FINALS',
  badgeText: '',
  logoUrl: '',
  showLogo: true,
  showFlags: true,
  showIso: true,
  showSeeds: true,
  showSponsor: true,
  showGfReset: 'auto',              // 'auto' | 'show' | 'hide'
  showTicker: true,
  tickerText: '#FGCOPEN · TOP 8 DOUBLE ELIMINATION FINALS',
  bgMode: 'theme',                  // 'theme' | 'custom' | 'transparent'
  bgColor1: '#1d3fd1',
  bgColor2: '#040714',
  customColors: false,
  frameColor: '#facc15',
  accentColor: '#facc15',
  accentColor2: '#38bdf8',
  textColor: '#ffffff',
  headBg: '#090b12',
  headText: '#facc15',
  cellBg: '#f1f5f9',
  cellText: '#0b0f19',
  isoBg: '#facc15',
  isoText: '#090b10',
  scoreBg: '#090b10',
  scoreText: '#ffffff',
  winAccent: '#16a34a',
  wireColor: '#ffffff',
  headerStyle: 'theme',             // 'theme' | 'cpt-banner' | 'evo-underline' | 'bar' | 'minimal'
  cellStyle: 'theme',               // 'theme' | 'sharp' | 'chamfer' | 'angled' | 'glass' | 'rounded'
  connectorStyle: 'theme',          // 'theme' | 'orthogonal' | 'rounded' | 'curved' | 'step-glow'
  wireWidth: 2.5,
  cellRadius: 6,
  fontDisplay: 'theme',
  fontBody: 'theme',
  fontScale: 100,
  pattern: 'theme',
  patternDir: 'diag-dr',
  patternSpeed: 35,
  patternOpacity: -1,
  patternScale: 100,
  entryAnim: 'theme',
  introNonce: 0,
  poolsPerPage: 4,
  poolsPage: 0,
  activePoolName: 'POOL A1 — DOUBLE ELIMINATION',
  pools: getDemoPools().pools,
  poolTreeSlots: getDemoPoolTree(),
  top16Rows: getDemoTop16()
};

export const DEFAULT_STATE = {
  version: 1,
  updatedAt: Date.now(),
  visible: true,
  introNonce: 0,
  theme: 't8-native-hud',
  round: 'ROUND 1',
  format: 'FT3',
  tournament: '',
  showFormat: true,
  showFlags: true,
  flagMode: 'both', // 'both' | 'country' | 'region' | 'none'
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
  seedMode: 'initial',         // 'initial' (event-wide seed) | 'phase' (current phase seed)
  stageName: '',
  p1: {
    name: 'PLAYER 1',
    sponsor: '',
    score: 0,
    flag: '',
    region: '',
    bracket: '', // '', 'W', 'L'
    character: '',
    secondaryChar: '',
    avatar: '',
    seed: '',
    pronouns: '',
    handle: '',
    variant: '',
    partnerName: '',
    partnerSponsor: '',
    partnerChar: '',
    partnerPronouns: '',
    partnerFlag: '',
    partnerRegion: ''
  },
  p2: {
    name: 'PLAYER 2',
    sponsor: '',
    score: 0,
    flag: '',
    region: '',
    bracket: '',
    character: '',
    secondaryChar: '',
    avatar: '',
    seed: '',
    pronouns: '',
    handle: '',
    variant: '',
    partnerName: '',
    partnerSponsor: '',
    partnerChar: '',
    partnerPronouns: '',
    partnerFlag: '',
    partnerRegion: ''
  },
  commentators: {
    c1Name: 'CASTER 1',
    c1Handle: '@caster1',
    c1Role: '',
    c2Name: 'CASTER 2',
    c2Handle: '@caster2',
    c2Role: '',
    c3Name: '',
    c3Handle: '',
    c3Role: '',
    style: 'auto',
    layout: 'single-bar',
    position: 'bottom-center',
    antiOverlap: 'auto-stack',
    iconStyle: 'mic',
    sepStyle: 'line',
    showLogo: false,
    scale: 100,
    offsetX: 0,
    offsetY: 0,
    opacity: 100,
    width: 0,
    customColors: false,
    bgColor1: '#10141f',
    bgColor2: '#07090f',
    accentColor: '#ffd24d',
    textColor: '#ffffff',
    handleColor: '#ffd24d',
    anim: 'slide-up'
  },
  eventBar: {
    style: 'auto',
    position: 'bottom-center',
    title: '',
    subtitle: '',
    showSubtitle: true,
    tickerText: '',
    showLogo: true,
    logoPos: 'top-badge',
    logoScale: 100,
    logoUrl: '',
    syncLogo: true,
    scale: 100,
    offsetX: 0,
    offsetY: 0,
    opacity: 100,
    width: 0,
    customColors: false,
    bgColor1: '#10141f',
    bgColor2: '#07090f',
    accentColor: '#ffd24d',
    textColor: '#ffffff',
    subColor: '#cbd5e1',
    borderWidth: 2,
    anim: 'slide-up'
  },
  tweaks: {
    offsetY: 0,
    scale: 100,
    wingSpread: 0,
    opacity: 100,
    customColors: false,
    p1Color: '#ff6a1a',
    p2Color: '#7b5cff',
    centerColor: '#ffd24d'
  },
  layoutPos: {
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
  },
  style: structuredClone(DEFAULT_STYLE),
  vs: structuredClone(DEFAULT_VS),
  results: structuredClone(DEFAULT_RESULTS),
  top8: structuredClone(DEFAULT_TOP8),
  brackets: structuredClone(DEFAULT_BRACKETS),
  audio: structuredClone(DEFAULT_AUDIO_STATE),
  activeMatch: null,
  lastEvent: {
    type: 'init',
    side: null,
    ts: Date.now()
  }
};

const DEFAULT_PLAYERS = [];

export const STATE_SCHEMA_VERSION = 2;
export const MAX_SSE_CLIENTS = 64;
const BROWSER_HTTP1_LIMIT = 6;
const SERVER_STARTED_AT = Date.now();

function readJsonSafe(filePath, fallback) {
  const tryParse = (p) => {
    if (!fs.existsSync(p)) return { ok: false };
    const raw = fs.readFileSync(p, 'utf8');
    if (!raw || !raw.trim()) return { ok: false };
    return { ok: true, data: JSON.parse(raw) };
  };
  try {
    const primary = tryParse(filePath);
    if (primary.ok && primary.data !== null && typeof primary.data === 'object') {
      return primary.data;
    }
  } catch (err) {
    console.warn(`[WARN] Failed reading ${filePath} (${err.message}) — checking .bak recovery...`);
    try {
      const backup = tryParse(`${filePath}.bak`);
      if (backup.ok && backup.data !== null && typeof backup.data === 'object') {
        console.warn(`[RECOVERY] Restored ${path.basename(filePath)} cleanly from ${path.basename(filePath)}.bak`);
        try { writeJsonAtomic(filePath, backup.data, { keepBackup: false }); } catch {}
        return backup.data;
      }
    } catch (bakErr) {
      console.warn(`[WARN] Backup recovery failed for ${filePath}.bak:`, bakErr.message);
    }
  }
  return structuredClone(fallback);
}

function writeJsonAtomic(filePath, data, { keepBackup = false } = {}) {
  const payload = JSON.stringify(data, null, 2);
  if (keepBackup && fs.existsSync(filePath)) {
    try {
      const prev = fs.readFileSync(filePath, 'utf8');
      if (prev && prev.trim().startsWith('{')) {
        fs.writeFileSync(`${filePath}.bak`, prev, 'utf8');
      }
    } catch {}
  }
  const tmp = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, payload, 'utf8');
  try {
    fs.renameSync(tmp, filePath);
  } catch {
    // Windows antivirus / transient lock fallback
    fs.writeFileSync(filePath, payload, 'utf8');
    try { fs.unlinkSync(tmp); } catch {}
  }
}

/**
 * Non-destructive, idempotent state schema migrator (v1 -> v2).
 * Upgrades legacy or partial state.json files cleanly without ever losing player data,
 * scores, themes, custom colors, framing, brackets, or audio settings.
 */
export function migrateState(raw) {
  const src = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
  const next = {
    ...structuredClone(DEFAULT_STATE),
    ...src,
    version: STATE_SCHEMA_VERSION
  };
  next.p1 = { ...DEFAULT_STATE.p1, ...(src.p1 && typeof src.p1 === 'object' ? src.p1 : {}) };
  next.p2 = { ...DEFAULT_STATE.p2, ...(src.p2 && typeof src.p2 === 'object' ? src.p2 : {}) };
  next.commentators = { ...DEFAULT_STATE.commentators, ...(src.commentators && typeof src.commentators === 'object' ? src.commentators : {}) };
  next.eventBar = { ...DEFAULT_STATE.eventBar, ...(src.eventBar && typeof src.eventBar === 'object' ? src.eventBar : {}) };
  next.tweaks = { ...DEFAULT_STATE.tweaks, ...(src.tweaks && typeof src.tweaks === 'object' ? src.tweaks : {}) };
  next.layoutPos = { ...DEFAULT_STATE.layoutPos, ...(src.layoutPos && typeof src.layoutPos === 'object' ? src.layoutPos : {}) };
  next.style = { ...DEFAULT_STYLE, ...(src.style && typeof src.style === 'object' ? src.style : {}) };
  next.audio = normalizeAudioState(src.audio);
  const srcVs = (src.vs && typeof src.vs === 'object') ? src.vs : {};
  next.vs = {
    ...structuredClone(DEFAULT_VS),
    ...srcVs,
    viewMode: srcVs.viewMode === 'matchup-2x2' ? 'matchup-2x2' : '1v1',
    matchupArtPos: (srcVs.matchupArtPos && typeof srcVs.matchupArtPos === 'object' && !Array.isArray(srcVs.matchupArtPos)) ? srcVs.matchupArtPos : {},
    customMatch: {
      ...structuredClone(DEFAULT_VS.customMatch),
      ...(srcVs.customMatch && typeof srcVs.customMatch === 'object' ? srcVs.customMatch : {}),
      p1: { ...DEFAULT_VS.customMatch.p1, ...(srcVs.customMatch?.p1 && typeof srcVs.customMatch.p1 === 'object' ? srcVs.customMatch.p1 : {}) },
      p2: { ...DEFAULT_VS.customMatch.p2, ...(srcVs.customMatch?.p2 && typeof srcVs.customMatch.p2 === 'object' ? srcVs.customMatch.p2 : {}) }
    }
  };
  const srcRes = (src.results && typeof src.results === 'object') ? src.results : {};
  const savedPls = Array.isArray(srcRes.placements) ? srcRes.placements : [];
  next.results = {
    ...structuredClone(DEFAULT_RESULTS),
    ...srcRes,
    placements: Array.from({ length: 12 }, (_, i) => {
      const item = (savedPls[i] && typeof savedPls[i] === 'object') ? savedPls[i] : {};
      return {
        ...DEFAULT_RESULTS.placements[i],
        ...item,
        secondaryChars: Array.isArray(item.secondaryChars) ? item.secondaryChars.filter(Boolean) : [],
        cardShape: item.cardShape || 'global'
      };
    })
  };
  const srcTop8 = (src.top8 && typeof src.top8 === 'object') ? src.top8 : {};
  next.top8 = {
    ...structuredClone(DEFAULT_TOP8),
    ...srcTop8,
    sourceSlots: { ...structuredClone(DEFAULT_TOP8.sourceSlots), ...(srcTop8.sourceSlots && typeof srcTop8.sourceSlots === 'object' ? srcTop8.sourceSlots : {}) },
    manualOverrides: (srcTop8.manualOverrides && typeof srcTop8.manualOverrides === 'object' && !Array.isArray(srcTop8.manualOverrides)) ? srcTop8.manualOverrides : {}
  };
  const srcBk = (src.brackets && typeof src.brackets === 'object') ? src.brackets : {};
  next.brackets = {
    ...structuredClone(DEFAULT_BRACKETS),
    ...srcBk,
    pools: Array.isArray(srcBk.pools) && srcBk.pools.length ? srcBk.pools : structuredClone(DEFAULT_BRACKETS.pools),
    poolTreeSlots: (srcBk.poolTreeSlots && typeof srcBk.poolTreeSlots === 'object' && Object.keys(srcBk.poolTreeSlots).length) ? srcBk.poolTreeSlots : structuredClone(DEFAULT_BRACKETS.poolTreeSlots),
    top16Rows: Array.isArray(srcBk.top16Rows) && srcBk.top16Rows.length ? srcBk.top16Rows : structuredClone(DEFAULT_BRACKETS.top16Rows)
  };
  if (!next.lastEvent || typeof next.lastEvent !== 'object') {
    next.lastEvent = { type: 'init', side: null, ts: Date.now() };
  }
  return next;
}

const rawBootState = readJsonSafe(STATE_FILE, DEFAULT_STATE);
const needsSchemaUpgrade = fs.existsSync(STATE_FILE) && Number(rawBootState?.version || 0) < STATE_SCHEMA_VERSION;
let currentState = migrateState(rawBootState);
if (needsSchemaUpgrade) {
  try { writeJsonAtomic(STATE_FILE, currentState, { keepBackup: true }); } catch {}
}

let playersDb = readJsonSafe(PLAYERS_FILE, DEFAULT_PLAYERS);
let presetsDb = readJsonSafe(PRESETS_FILE, []);
let integrationsCfg = {
  provider: 'startgg',
  startggToken: '',
  startggUrl: '',
  challongeKey: '',
  challongeUrl: '',
  persistTokens: false,
  ...readJsonSafe(INTEGRATIONS_FILE, {})
};
// Keep active API tokens in RAM by default; only persist to local gitignored data/integrations.json if user opts in
const sessionTokens = {
  startgg: integrationsCfg.startggToken || '',
  challonge: integrationsCfg.challongeKey || ''
};
function getAuthToken(provider, bodyToken) {
  if (bodyToken && bodyToken !== '__KEEP__') return String(bodyToken).trim();
  if (provider === 'startgg') return sessionTokens.startgg || integrationsCfg.startggToken || '';
  if (provider === 'challonge') return sessionTokens.challonge || integrationsCfg.challongeKey || '';
  return '';
}
function saveIntegrationsSafe() {
  const onDisk = {
    provider: integrationsCfg.provider || 'startgg',
    startggUrl: integrationsCfg.startggUrl || '',
    challongeUrl: integrationsCfg.challongeUrl || '',
    persistTokens: Boolean(integrationsCfg.persistTokens),
    startggToken: integrationsCfg.persistTokens ? (sessionTokens.startgg || '') : '',
    challongeKey: integrationsCfg.persistTokens ? (sessionTokens.challonge || '') : ''
  };
  integrationsCfg = onDisk;
  writeJsonAtomic(INTEGRATIONS_FILE, onDisk);
}
let historyDb = readJsonSafe(HISTORY_FILE, []);
let fontsDb = readJsonSafe(FONTS_FILE, []).filter(f => {
  if (!f || !f.id) return false;
  if (f.kind === 'file') return Boolean(f.file && fs.existsSync(path.join(FONTS_DIR, path.basename(f.file))));
  return f.kind === 'system' && Boolean(f.family);
});
// Strictly isolated tournament snapshots per provider so Start.gg, Challonge & Demo NEVER overwrite each other!
const tournamentSnapshots = { startgg: null, challonge: null, demo: null };
let activeTournamentProvider = null;

function getProviderSnap(prov) {
  return (prov && Object.prototype.hasOwnProperty.call(tournamentSnapshots, prov)) ? tournamentSnapshots[prov] : null;
}

function getActiveTournamentSnap() {
  return getProviderSnap(activeTournamentProvider)
    || tournamentSnapshots.startgg
    || tournamentSnapshots.challonge
    || tournamentSnapshots.demo
    || null;
}

function summarizeTournamentStatus() {
  const providers = {};
  for (const key of ['startgg', 'challonge', 'demo']) {
    const s = tournamentSnapshots[key];
    providers[key] = s ? {
      connected: true,
      name: s.tournament?.name || key.toUpperCase(),
      slug: s.tournament?.slug || '',
      gameId: s.gameId || '',
      setsCount: Array.isArray(s.sets) ? s.sets.length : 0,
      seedsCount: Array.isArray(s.seeds) ? s.seeds.length : 0
    } : { connected: false };
  }
  return { activeProvider: activeTournamentProvider, providers };
}

if (!fs.existsSync(STATE_FILE)) writeJsonAtomic(STATE_FILE, currentState);
if (!fs.existsSync(PLAYERS_FILE)) writeJsonAtomic(PLAYERS_FILE, playersDb);
if (!fs.existsSync(PRESETS_FILE)) writeJsonAtomic(PRESETS_FILE, presetsDb);
if (!fs.existsSync(INTEGRATIONS_FILE)) writeJsonAtomic(INTEGRATIONS_FILE, integrationsCfg);
if (!fs.existsSync(HISTORY_FILE)) writeJsonAtomic(HISTORY_FILE, historyDb);
if (!fs.existsSync(FONTS_FILE)) writeJsonAtomic(FONTS_FILE, fontsDb);

function mergeImportedPlayers(list) {
  let added = 0;
  for (const item of (list || [])) {
    if (!item?.name || !String(item.name).trim()) continue;
    const sNum = cleanSeedNum(item.seed ?? item.initialSeed);
    const clean = {
      name: String(item.name).trim(),
      sponsor: String(item.sponsor || '').trim(),
      flag: String(item.flag || '').trim().toUpperCase(),
      region: String(item.region || '').trim().toUpperCase(),
      character: String(item.character || '').trim(),
      pronouns: String(item.pronouns || '').trim(),
      handle: String(item.handle || '').trim(),
      seed: sNum ? String(sNum) : '',
      avatar: String(item.avatar || '').trim()
    };
    const idx = playersDb.findIndex(p => p.name.toLowerCase() === clean.name.toLowerCase());
    if (idx >= 0) {
      // Preserve existing character/region/avatar if incoming doesn't specify one
      playersDb[idx] = {
        ...playersDb[idx],
        sponsor: clean.sponsor || playersDb[idx].sponsor,
        flag: clean.flag || playersDb[idx].flag,
        region: clean.region || playersDb[idx].region,
        character: clean.character || playersDb[idx].character,
        pronouns: clean.pronouns || playersDb[idx].pronouns || '',
        handle: clean.handle || playersDb[idx].handle || '',
        seed: clean.seed || playersDb[idx].seed || '',
        avatar: clean.avatar || playersDb[idx].avatar || ''
      };
    } else {
      playersDb.unshift(clean);
      added++;
    }
  }
  playersDb = playersDb.slice(0, 400);
  writeJsonAtomic(PLAYERS_FILE, playersDb);
  return { added, total: playersDb.length };
}

/** Connected SSE clients with live session metadata (Phase 7) */
const sseSessions = new Map(); // res -> session record
let sseSeqId = 0;
let sessionsBroadcastTimer = null;

const CLIENT_LABELS = {
  scorebar: 'Scorebar Overlay',
  vs: 'VS Splash Overlay',
  results: 'Top 8 / Results Overlay',
  brackets: 'Brackets & Pools Overlay',
  audio: 'Dedicated Audio Hub',
  panel: 'Control Panel',
  other: 'Overlay / Client'
};

function parseClientBrowser(ua = '', isObsFlag = false) {
  const s = String(ua || '');
  if (isObsFlag || /\bOBS\b/i.test(s)) return 'OBS Studio';
  if (/Edg\//i.test(s)) return 'Microsoft Edge';
  if (/OPR\/|Opera/i.test(s)) return 'Opera';
  if (/Firefox\//i.test(s)) return 'Firefox';
  if (/Chrome\//i.test(s)) return /Mobile|Android/i.test(s) ? 'Chrome Mobile' : 'Chrome / Chromium';
  if (/Safari\//i.test(s) && !/Chrome/i.test(s)) return /iPhone|iPad/i.test(s) ? 'Safari iOS' : 'Safari';
  if (/CEF/i.test(s)) return 'OBS / CEF';
  return 'Browser Client';
}

function normalizeClientIp(req) {
  const raw = String(req.socket?.remoteAddress || '').trim();
  if (raw === '::1' || raw === '::ffff:127.0.0.1' || raw === '127.0.0.1') return '127.0.0.1';
  return raw.replace(/^::ffff:/, '') || 'local';
}

function pruneDeadSessions() {
  for (const [res] of sseSessions) {
    if (res.destroyed || res.writableEnded) {
      sseSessions.delete(res);
    }
  }
}

function getSessionsSnapshot() {
  pruneDeadSessions();
  const now = Date.now();
  const list = [];
  let obsCount = 0;
  let localBrowserCount = 0;
  let lanCount = 0;
  let panelCount = 0;
  let overlayCount = 0;

  for (const [, meta] of sseSessions) {
    if (meta.isObs) obsCount++;
    else if (meta.isLocal) localBrowserCount++;
    else lanCount++;
    if (meta.client === 'panel') panelCount++;
    else overlayCount++;

    list.push({
      id: meta.id,
      client: meta.client,
      label: meta.label,
      source: meta.source,
      isObs: meta.isObs,
      isLocal: meta.isLocal,
      ip: meta.ip,
      browser: meta.browser,
      connectedAt: meta.connectedAt,
      uptimeSec: Math.max(0, Math.floor((now - meta.connectedAt) / 1000))
    });
  }
  list.sort((a, b) => a.connectedAt - b.connectedAt);

  return {
    ok: true,
    version: APP_VERSION,
    port: PORT,
    startedAt: SERVER_STARTED_AT,
    uptimeSec: Math.max(0, Math.floor((now - SERVER_STARTED_AT) / 1000)),
    memoryMb: Math.round((process.memoryUsage().rss / (1024 * 1024)) * 10) / 10,
    activeClients: list.length,
    maxClients: MAX_SSE_CLIENTS,
    browserHttp1Limit: BROWSER_HTTP1_LIMIT,
    breakdown: {
      obs: obsCount,
      localBrowser: localBrowserCount,
      lan: lanCount,
      panel: panelCount,
      overlays: overlayCount
    },
    sessions: list
  };
}

function sseWriteAll(payload) {
  let dropped = false;
  for (const [res] of sseSessions) {
    if (res.destroyed || res.writableEnded) {
      sseSessions.delete(res);
      dropped = true;
      continue;
    }
    try {
      res.write(payload);
    } catch {
      sseSessions.delete(res);
      dropped = true;
    }
  }
  if (dropped) scheduleSessionsBroadcast();
}

function scheduleSessionsBroadcast() {
  if (sessionsBroadcastTimer) return;
  sessionsBroadcastTimer = setTimeout(() => {
    sessionsBroadcastTimer = null;
    const snap = getSessionsSnapshot();
    const payload = `event: sessions\ndata: ${JSON.stringify(snap)}\n\n`;
    for (const [res] of sseSessions) {
      try { res.write(payload); } catch { sseSessions.delete(res); }
    }
  }, 120);
  sessionsBroadcastTimer.unref?.();
}

function broadcastState() {
  sseWriteAll(`event: state\ndata: ${JSON.stringify(currentState)}\n\n`);
}

function broadcastFonts() {
  sseWriteAll(`event: fonts\ndata: ${JSON.stringify(fontsDb)}\n\n`);
}

function broadcastSfx() {
  sseWriteAll(`event: sfx\ndata: ${JSON.stringify(sfxMgr.listCustomSfx())}\n\n`);
}

function broadcastAudio(audioEv) {
  if (!audioEv) return;
  sseWriteAll(`event: audio\ndata: ${JSON.stringify(audioEv)}\n\n`);
}

// Keep-alive heartbeat so OBS CEF never drops the SSE socket
setInterval(() => {
  sseWriteAll(': ping\n\n');
}, 20000).unref();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.webm': 'audio/webm'
};

const VIRTUAL_IFACE_RE = /radmin|hamachi|tailscale|zerotier|wireguard|nordlynx|openvpn|proton|mullvad|wintun|vpn|vethernet|wsl|hyper-v|virtualbox|vmware|vbox|docker|loopback|bluetooth|npcap|tap-?windows|\btap\b|\btun\b/i;

function classifyIpv4(name, ip) {
  const parts = String(ip || '').split('.').map(Number);
  const [a, b, c] = parts;
  const isLinkLocal = a === 169 && b === 254;
  const isRadminOrHamachi = a === 26 || a === 25;
  const isCgnat = a === 100 && b >= 64 && b <= 127;
  const isVboxHostOnly = a === 192 && b === 168 && c === 56;
  const isRfc1918 = (a === 192 && b === 168) || a === 10 || (a === 172 && b >= 16 && b <= 31);
  const isVirtualName = VIRTUAL_IFACE_RE.test(name || '');

  let kind = 'lan';
  let score = 0;

  if (isLinkLocal) {
    kind = 'virtual';
    score = -200;
  } else if (isRadminOrHamachi || isCgnat || isVboxHostOnly || isVirtualName) {
    kind = (isRadminOrHamachi || isCgnat || /radmin|hamachi|tailscale|zerotier|wireguard|vpn/i.test(name || '')) ? 'vpn' : 'virtual';
    score = -100;
  } else {
    if (a === 192 && b === 168) score += 60;
    else if (a === 10) score += 50;
    else if (a === 172 && b >= 16 && b <= 31) score += 45;
    else score += 10;
    if (/wi-?fi|wlan|wireless/i.test(name || '')) score += 30;
    else if (/ethernet|eth\d|en\d|local area/i.test(name || '')) score += 25;
    if (!isRfc1918) score -= 20;
  }

  return { name, ip, kind, score };
}

function getRankedNetworkInterfaces() {
  const nets = os.networkInterfaces();
  const list = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        list.push(classifyIpv4(name, net.address));
      }
    }
  }
  return list.sort((x, y) => y.score - x.score);
}

function getLanIps() {
  const ranked = getRankedNetworkInterfaces();
  const physical = ranked.filter(x => x.kind === 'lan');
  if (physical.length) return physical.map(x => x.ip);
  return ranked.filter(x => x.score > -150).map(x => x.ip);
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
}

function sendBodyError(res, err) {
  const code = Number(err?.status) === 413 ? 413 : 400;
  return sendJson(res, code, { error: err?.message || 'Invalid request payload' });
}

function readBody(req, maxBytes = 512 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;
    let settled = false;
    req.on('data', chunk => {
      if (settled) return;
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      totalBytes += buf.length;
      if (totalBytes > maxBytes) {
        settled = true;
        const err = new Error(`Payload too large (max ${Math.round(maxBytes / 1024)} KB)`);
        err.status = 413;
        req.pause();
        reject(err);
        return;
      }
      chunks.push(buf);
    });
    req.on('end', () => {
      if (settled) return;
      settled = true;
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', (err) => {
      if (settled) return;
      settled = true;
      reject(err);
    });
  });
}

function deepMergeState(prev, patch) {
  let nextVs = prev.vs || structuredClone(DEFAULT_VS);
  if (patch.vs) {
    let nextMatchVal = nextVs.nextMatch;
    if (patch.vs.nextMatch === null) {
      nextMatchVal = null;
    } else if (patch.vs.nextMatch) {
      const incoming = patch.vs.nextMatch;
      // Full replacement when a new queue set is loaded; partial merge when editing p1/p2 character
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
      if (patch.vs.matchupArtPos.__replace || patch._cid || Object.keys(patch.vs.matchupArtPos).length === 0) {
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
    const mergedViewMode = patch.vs.viewMode !== undefined
      ? (patch.vs.viewMode === 'matchup-2x2' ? 'matchup-2x2' : '1v1')
      : (nextVs.viewMode === 'matchup-2x2' ? 'matchup-2x2' : '1v1');
    nextVs = {
      ...nextVs,
      ...patch.vs,
      viewMode: mergedViewMode,
      matchupArtPos: nextMuArtPos,
      nextMatch: nextMatchVal,
      customMatch: patch.vs.customMatch
        ? {
          ...(nextVs.customMatch || DEFAULT_VS.customMatch),
          ...patch.vs.customMatch,
          p1: patch.vs.customMatch.p1
            ? { ...(nextVs.customMatch?.p1 || DEFAULT_VS.customMatch.p1), ...patch.vs.customMatch.p1 }
            : (nextVs.customMatch?.p1 || DEFAULT_VS.customMatch.p1),
          p2: patch.vs.customMatch.p2
            ? { ...(nextVs.customMatch?.p2 || DEFAULT_VS.customMatch.p2), ...patch.vs.customMatch.p2 }
            : (nextVs.customMatch?.p2 || DEFAULT_VS.customMatch.p2)
        }
        : nextVs.customMatch
    };
  }
  const nextResults = patch.results
    ? {
      ...(prev.results || structuredClone(DEFAULT_RESULTS)),
      ...patch.results,
      placements: Array.isArray(patch.results.placements)
        ? Array.from({ length: Math.max(12, patch.results.placements.length) }, (_, i) => ({
          ...(DEFAULT_RESULTS.placements[i] || { place: 9, secondaryChars: [] }),
          ...(prev.results?.placements?.[i] || {}),
          ...(patch.results.placements[i] || {})
        })).slice(0, 12)
        : (prev.results?.placements || structuredClone(DEFAULT_RESULTS.placements))
    }
    : (prev.results || structuredClone(DEFAULT_RESULTS));
  const baseTop8 = prev.top8 || structuredClone(DEFAULT_TOP8);
  const nextTop8 = patch.top8
    ? {
      ...baseTop8,
      ...patch.top8,
      sourceSlots: patch.top8.sourceSlots
        ? { ...(baseTop8.sourceSlots || {}), ...patch.top8.sourceSlots }
        : (baseTop8.sourceSlots || structuredClone(DEFAULT_TOP8.sourceSlots)),
      manualOverrides: patch.top8.manualOverrides !== undefined
        ? patch.top8.manualOverrides
        : (baseTop8.manualOverrides || {})
    }
    : baseTop8;
  const baseBrackets = prev.brackets || structuredClone(DEFAULT_BRACKETS);
  const nextBrackets = patch.brackets
    ? {
      ...baseBrackets,
      ...patch.brackets,
      pools: Array.isArray(patch.brackets.pools) ? patch.brackets.pools : (baseBrackets.pools || structuredClone(DEFAULT_BRACKETS.pools)),
      poolTreeSlots: patch.brackets.poolTreeSlots !== undefined ? patch.brackets.poolTreeSlots : (baseBrackets.poolTreeSlots || structuredClone(DEFAULT_BRACKETS.poolTreeSlots)),
      top16Rows: Array.isArray(patch.brackets.top16Rows) ? patch.brackets.top16Rows : (baseBrackets.top16Rows || structuredClone(DEFAULT_BRACKETS.top16Rows))
    }
    : baseBrackets;
  const next = {
    ...prev,
    ...patch,
    p1: patch.p1 ? { ...prev.p1, ...patch.p1 } : prev.p1,
    p2: patch.p2 ? { ...prev.p2, ...patch.p2 } : prev.p2,
    commentators: patch.commentators
      ? { ...DEFAULT_STATE.commentators, ...(prev.commentators || {}), ...patch.commentators }
      : { ...DEFAULT_STATE.commentators, ...(prev.commentators || {}) },
    eventBar: patch.eventBar
      ? { ...DEFAULT_STATE.eventBar, ...(prev.eventBar || {}), ...patch.eventBar }
      : { ...DEFAULT_STATE.eventBar, ...(prev.eventBar || {}) },
    tweaks: patch.tweaks ? { ...prev.tweaks, ...patch.tweaks } : prev.tweaks,
    layoutPos: patch.layoutPos
      ? { ...DEFAULT_STATE.layoutPos, ...(prev.layoutPos || {}), ...patch.layoutPos }
      : { ...DEFAULT_STATE.layoutPos, ...(prev.layoutPos || {}) },
    style: patch.style ? { ...prev.style, ...patch.style } : prev.style,
    vs: nextVs,
    results: nextResults,
    top8: nextTop8,
    brackets: nextBrackets,
    audio: patch.audio ? mergeAudioState(prev.audio, patch.audio) : normalizeAudioState(prev.audio),
    updatedAt: Date.now()
  };
  delete next._silentAudio;
  return next;
}

/* ============================================================================
   GITHUB RELEASES VERSION CHECKER & DATA-SAFE 1-CLICK SELF-UPDATER (0 DEPS)
   ============================================================================ */
let updateCache = null;

function parseSemver(raw) {
  const m = String(raw || '').trim().replace(/^v/i, '').match(/^(\d+)\.(\d+)\.(\d+)/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [0, 0, 0];
}

export function compareSemver(a, b) {
  const pa = parseSemver(a), pb = parseSemver(b);
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i];
  }
  return 0;
}

export function isAllowedUpdateHost(urlStr) {
  try {
    const u = new URL(urlStr);
    if (u.protocol !== 'https:') return false;
    const allowed = [
      'github.com',
      'api.github.com',
      'objects.githubusercontent.com',
      'codeload.github.com',
      'release-assets.githubusercontent.com'
    ];
    return allowed.some(h => u.hostname === h || u.hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

async function checkGithubUpdate(force = false) {
  const now = Date.now();
  if (!force && updateCache && (now - updateCache.checkedAt) < 10 * 60 * 1000) {
    return updateCache;
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: {
        'User-Agent': `FGC-Open-Scorebars/${APP_VERSION}`,
        'Accept': 'application/vnd.github+json'
      },
      signal: AbortSignal.timeout(6500)
    });
    if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
    const rel = await res.json();
    const latestTag = String(rel.tag_name || '').trim();
    const latestVersion = latestTag.replace(/^v/i, '') || APP_VERSION;
    const cmp = compareSemver(latestVersion, APP_VERSION);
    const status = cmp > 0 ? 'update-available' : (cmp < 0 ? 'ahead' : 'up-to-date');
    const zipAsset = (Array.isArray(rel.assets) ? rel.assets : []).find(a =>
      /\.zip$/i.test(String(a?.name || '')) && a?.browser_download_url
    );
    const downloadUrl = zipAsset?.browser_download_url || rel.zipball_url || '';
    const notesRaw = String(rel.body || '').replace(/\r\n/g, '\n').trim();
    const result = {
      status,
      currentVersion: APP_VERSION,
      latestVersion,
      latestTag: latestTag || `v${latestVersion}`,
      releaseTitle: String(rel.name || latestTag || `v${latestVersion}`).trim(),
      releaseUrl: String(rel.html_url || `https://github.com/${GITHUB_REPO}/releases`),
      publishedAt: rel.published_at || '',
      downloadUrl,
      assetName: zipAsset?.name || `FGC-Open-Scorebars-${latestTag}.zip`,
      assetSize: Number(zipAsset?.size || 0),
      notes: notesRaw.slice(0, 1400),
      checkedAt: now
    };
    updateCache = result;
    return result;
  } catch (err) {
    return {
      status: 'offline',
      currentVersion: APP_VERSION,
      latestVersion: '',
      releaseUrl: `https://github.com/${GITHUB_REPO}/releases`,
      error: err.message,
      checkedAt: now
    };
  }
}

function runExecFile(cmd, args, timeoutMs = 45000) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { timeout: timeoutMs, windowsHide: true }, (err, stdout, stderr) => {
      if (err) reject(new Error(stderr?.trim() || err.message));
      else resolve({ stdout, stderr });
    });
  });
}

async function extractZipNative(zipFile, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  if (process.platform === 'win32') {
    const psCmd = `Expand-Archive -LiteralPath '${zipFile.replace(/'/g, "''")}' -DestinationPath '${destDir.replace(/'/g, "''")}' -Force`;
    await runExecFile('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', psCmd]);
    return;
  }
  try {
    await runExecFile('unzip', ['-oq', zipFile, '-d', destDir]);
  } catch {
    await runExecFile('python3', ['-m', 'zipfile', '-e', zipFile, destDir]);
  }
}

function hasServerEntry(dir) {
  return (
    fs.existsSync(path.join(dir, 'app', 'server', 'server.mjs')) ||
    fs.existsSync(path.join(dir, 'server.mjs'))
  );
}

function findExtractedAppRoot(dir) {
  if (hasServerEntry(dir)) return dir;
  const entries = fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());
  for (const d of entries) {
    const sub = path.join(dir, d.name);
    if (hasServerEntry(sub)) return sub;
  }
  return null;
}

const LEGACY_FLAT_FILES = [
  'server.mjs', 'tournaments.mjs', 'assets.mjs', 'flags-manager.mjs', 'sfx-manager.mjs',
  'export-png.mjs', 'flags-world-index.json',
  'index.html', 'panel.html', 'vs.html', 'brackets.html', 'results.html', 'audio.html',
  'panel.css', 'game-scorebars.css', 'top8-unified.css',
  'flags.js', 'custom-fonts.js', 'audio-engine.js', 'top8-engine.js', 'brackets-engine.js', 'res-card-engine.js',
  'panel-app.js', 'panel-presets.js', 'panel-audio.js', 'panel-sessions.js', 'i18n.js', 'qr.js',
  'game-presets.js', 'preset-art.js', 'sf6-themes.js', 'vs-designs.js', 'brackets-designs.js', 'results-designs.js',
  'assets/2xko-gameplay-ref.jpg', 'assets/avatar-gameplay-ref.jpg', 'assets/ffcotw-gameplay-ref.jpg',
  'assets/mk1-gameplay-ref.jpg', 'assets/sf6-gameplay-ref.jpg', 'assets/ssbu-gameplay-ref.png', 'assets/t8-gameplay-ref.jpg',
  'assets/pbrd-kazuya-glove-p1-mask.png', 'assets/pbrd-kazuya-glove-p1-shade.png',
  'assets/pbrd-kazuya-glove-p2-mask.png', 'assets/pbrd-kazuya-glove-p2-shade.png',
  'assets/pbrd-kazuya-studs-p1.png', 'assets/pbrd-kazuya-studs-p2.png'
];

export async function applySafeUpdateFromZip(zipFile, targetDir = ROOT_DIR) {
  const resolvedTarget = path.resolve(targetDir);
  const workDir = path.join(os.tmpdir(), `fgc-scorebars-extract-${Date.now()}`);
  try {
    await extractZipNative(zipFile, workDir);
    const appRoot = findExtractedAppRoot(workDir);
    if (!appRoot) {
      throw new Error('Downloaded archive is missing app/server/server.mjs — update aborted safely');
    }
    const ALLOWED_ROOT_FILE = /^([a-zA-Z0-9._-]+\.(html|js|mjs|bat|css|md|json)|LICENSE)$/i;
    const BLOCKED_ROOT_FILE = /^(\.env|package-lock\.json)/i;
    const ALLOWED_APP_FILE = /^[a-zA-Z0-9._-]+\.(html|js|mjs|css|json|png|jpe?g|webp|svg)$/i;
    const ALLOWED_ASSET_FILE = /^[a-zA-Z0-9._-]+\.(png|jpe?g|webp|svg)$/i;

    let filesUpdated = 0;
    const safeWriteFile = (srcPath, destRel) => {
      const normalized = path.normalize(destRel).replace(/^(\.\.[/\\])+/, '');
      if (/^[/\\]?(data|\.git|docs|Referencias)([/\\]|$)/i.test(normalized)) return;
      const dstPath = path.join(resolvedTarget, normalized);
      if (!dstPath.startsWith(resolvedTarget + path.sep)) return;
      fs.mkdirSync(path.dirname(dstPath), { recursive: true });
      const tmp = `${dstPath}.upd.tmp`;
      fs.copyFileSync(srcPath, tmp);
      try {
        fs.renameSync(tmp, dstPath);
      } catch {
        // Windows fallback if file lock momentarily resists rename
        fs.copyFileSync(srcPath, dstPath);
        try { fs.unlinkSync(tmp); } catch { }
      }
      filesUpdated++;
    };

    for (const ent of fs.readdirSync(appRoot, { withFileTypes: true })) {
      if (ent.isFile() && ALLOWED_ROOT_FILE.test(ent.name) && !BLOCKED_ROOT_FILE.test(ent.name)) {
        safeWriteFile(path.join(appRoot, ent.name), ent.name);
      }
    }
    const copyTreeRecursive = (srcDir, relBase, fileRegex) => {
      for (const ent of fs.readdirSync(srcDir, { withFileTypes: true })) {
        const srcChild = path.join(srcDir, ent.name);
        const relChild = path.join(relBase, ent.name);
        if (ent.isDirectory() && /^[a-zA-Z0-9._-]+$/.test(ent.name)) {
          copyTreeRecursive(srcChild, relChild, fileRegex);
        } else if (ent.isFile() && fileRegex.test(ent.name)) {
          safeWriteFile(srcChild, relChild);
        }
      }
    };
    const appSrc = path.join(appRoot, 'app');
    const usesStructuredApp = fs.existsSync(path.join(appRoot, 'app', 'server', 'server.mjs'));
    if (fs.existsSync(appSrc) && fs.statSync(appSrc).isDirectory()) {
      copyTreeRecursive(appSrc, 'app', ALLOWED_APP_FILE);
    }
    const assetsSrc = path.join(appRoot, 'assets');
    if (fs.existsSync(assetsSrc) && fs.statSync(assetsSrc).isDirectory()) {
      copyTreeRecursive(assetsSrc, 'assets', ALLOWED_ASSET_FILE);
    }
    if (filesUpdated === 0) {
      throw new Error('No valid app files found in release archive');
    }
    // If migrating from legacy flat layout to structured app/, clean up obsolete root duplicates safely
    if (usesStructuredApp) {
      for (const relOld of LEGACY_FLAT_FILES) {
        if (fs.existsSync(path.join(appRoot, relOld))) continue;
        const oldPath = path.resolve(resolvedTarget, relOld);
        if (oldPath.startsWith(resolvedTarget + path.sep) && fs.existsSync(oldPath)) {
          try { fs.unlinkSync(oldPath); } catch { }
        }
      }
    }
    return { filesUpdated };
  } finally {
    try { fs.rmSync(workDir, { recursive: true, force: true }); } catch { }
  }
}

async function applySafeUpdate(downloadUrl) {
  if (!isAllowedUpdateHost(downloadUrl)) {
    throw new Error('Refused update download from untrusted host');
  }
  const tmpDir = path.join(os.tmpdir(), `fgc-scorebars-dl-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });
  const zipPath = path.join(tmpDir, 'release.zip');
  try {
    const res = await fetch(downloadUrl, {
      headers: { 'User-Agent': `FGC-Open-Scorebars/${APP_VERSION}` },
      redirect: 'follow',
      signal: AbortSignal.timeout(45000)
    });
    if (!res.ok) throw new Error(`Download failed (HTTP ${res.status})`);
    if (res.url && !isAllowedUpdateHost(res.url)) {
      throw new Error('Redirected to untrusted host — update aborted');
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1024 || buf.length > 50 * 1024 * 1024) {
      throw new Error('Unexpected archive size — update aborted');
    }
    fs.writeFileSync(zipPath, buf);
    return await applySafeUpdateFromZip(zipPath);
  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch { }
  }
}

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // --- SSE real-time stream (with live session metadata & 64-client cap!) ---
  if (pathname === '/api/events' && req.method === 'GET') {
    pruneDeadSessions();
    if (sseSessions.size >= MAX_SSE_CLIENTS) {
      return sendJson(res, 503, {
        error: 'SESSION_LIMIT_REACHED',
        message: `Local server reached the ${MAX_SSE_CLIENTS} simultaneous SSE session limit. Close unused tabs or remote sessions.`,
        activeClients: sseSessions.size,
        maxClients: MAX_SSE_CLIENTS
      });
    }
    req.socket?.setTimeout(0);
    req.socket?.setNoDelay(true);
    const rawClient = String(urlObj.searchParams.get('client') || '').trim().toLowerCase();
    const client = Object.prototype.hasOwnProperty.call(CLIENT_LABELS, rawClient) ? rawClient : 'other';
    const ua = String(req.headers['user-agent'] || '');
    const isObs = urlObj.searchParams.get('obs') === '1' || /\bOBS\b/i.test(ua);
    const ip = normalizeClientIp(req);
    const isLocal = ip === '127.0.0.1' || ip === 'local';
    const source = isObs
      ? (client === 'panel' ? 'obs-dock' : 'obs-source')
      : (isLocal ? 'local-browser' : 'lan-device');
    const sessionMeta = {
      id: `s${++sseSeqId}`,
      client,
      label: CLIENT_LABELS[client],
      source,
      isObs,
      isLocal,
      ip,
      browser: parseClientBrowser(ua, isObs),
      connectedAt: Date.now()
    };

    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'X-Accel-Buffering': 'no'
    });
    sseSessions.set(res, sessionMeta);
    res.write(`event: state\ndata: ${JSON.stringify(currentState)}\n\n`);
    res.write(`event: fonts\ndata: ${JSON.stringify(fontsDb)}\n\n`);
    res.write(`event: sfx\ndata: ${JSON.stringify(sfxMgr.listCustomSfx())}\n\n`);
    res.write(`event: sessions\ndata: ${JSON.stringify(getSessionsSnapshot())}\n\n`);
    scheduleSessionsBroadcast();
    const cleanup = () => {
      if (sseSessions.delete(res)) scheduleSessionsBroadcast();
    };
    req.on('close', cleanup);
    res.on('close', cleanup);
    res.on('error', cleanup);
    return;
  }

  // --- API: Live SSE Sessions Diagnostics & Remote Session Disconnect (Phase 7) ---
  if (pathname === '/api/sessions' && req.method === 'GET') {
    return sendJson(res, 200, getSessionsSnapshot());
  }

  if (pathname === '/api/sessions/disconnect' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      const targetId = String(body.id || '').trim();
      let closed = 0;
      if (body.action === 'prune') {
        pruneDeadSessions();
      } else if (targetId) {
        for (const [clientRes, meta] of sseSessions) {
          if (meta.id === targetId) {
            sseSessions.delete(clientRes);
            try { clientRes.end(); } catch {}
            closed++;
            break;
          }
        }
      }
      if (closed > 0) scheduleSessionsBroadcast();
      return sendJson(res, 200, { ok: true, closed, snapshot: getSessionsSnapshot() });
    } catch (err) {
      return sendBodyError(res, err);
    }
  }

  // --- API: State ---
  if (pathname === '/api/state') {
    if (req.method === 'GET') {
      return sendJson(res, 200, currentState);
    }
    if (req.method === 'POST') {
      try {
        const patch = await readBody(req);
        const prevState = currentState;
        currentState = deepMergeState(currentState, patch);
        writeJsonAtomic(STATE_FILE, currentState, { keepBackup: true });
        broadcastState();
        const audioEvents = sfxMgr.detectAudioEvents(prevState, currentState, patch);
        for (const aev of audioEvents) broadcastAudio(aev);
        return sendJson(res, 200, currentState);
      } catch (err) {
        return sendBodyError(res, err);
      }
    }
  }

  // --- API: Reset to defaults ---
  if (pathname === '/api/reset' && req.method === 'POST') {
    currentState = migrateState({ ...structuredClone(DEFAULT_STATE), updatedAt: Date.now() });
    writeJsonAtomic(STATE_FILE, currentState, { keepBackup: true });
    broadcastState();
    return sendJson(res, 200, currentState);
  }

  // --- API: Players DB ---
  if (pathname === '/api/players') {
    if (req.method === 'GET') {
      return sendJson(res, 200, playersDb);
    }
    if (req.method === 'POST') {
      try {
        const body = await readBody(req);
        if (body.action === 'delete' && body.name) {
          playersDb = playersDb.filter(
            p => p.name.toLowerCase() !== String(body.name).toLowerCase()
          );
        } else if (body.name && String(body.name).trim()) {
          const entry = {
            name: String(body.name).trim(),
            sponsor: String(body.sponsor || '').trim(),
            flag: String(body.flag || '').trim().toUpperCase(),
            region: String(body.region || '').trim().toUpperCase(),
            character: String(body.character || '').trim(),
            pronouns: String(body.pronouns || '').trim(),
            handle: String(body.handle || '').trim(),
            seed: cleanSeedNum(body.seed) ? String(cleanSeedNum(body.seed)) : '',
            avatar: String(body.avatar || '').trim()
          };
          const idx = playersDb.findIndex(
            p => p.name.toLowerCase() === entry.name.toLowerCase()
          );
          if (idx >= 0) playersDb[idx] = entry;
          else playersDb.unshift(entry);
          playersDb = playersDb.slice(0, 300);
        }
        writeJsonAtomic(PLAYERS_FILE, playersDb);
        return sendJson(res, 200, playersDb);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
  }

  // --- API: Custom Style Presets (Universal: Scorebar | VS Splash | Brackets | Results | Tournament Bundle Packs) ---
  if (pathname === '/api/presets') {
    if (req.method === 'GET') {
      return sendJson(res, 200, presetsDb);
    }
    if (req.method === 'POST') {
      try {
        const body = await readBody(req);
        const VALID_SCOPES = new Set(['scorebar', 'vs', 'brackets', 'results', 'bundle']);
        const normalizePreset = (item) => {
          const scope = VALID_SCOPES.has(item.scope) ? item.scope : 'scorebar';
          const name = String(item.name || '').trim().slice(0, 48);
          if (!name) return null;
          const base = {
            id: item.id || `preset-${scope}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            scope,
            name,
            savedAt: Date.now()
          };
          if (scope === 'scorebar') {
            return {
              ...base,
              theme: item.theme || currentState.theme,
              tweaks: { ...DEFAULT_STATE.tweaks, ...(item.tweaks || {}) },
              style: { ...DEFAULT_STYLE, ...(item.style || {}) },
              layoutPos: { ...DEFAULT_STATE.layoutPos, ...(item.layoutPos || {}) },
              eventBarLayout: (item.eventBarLayout && typeof item.eventBarLayout === 'object') ? item.eventBarLayout : null,
              commentatorsLayout: (item.commentatorsLayout && typeof item.commentatorsLayout === 'object') ? item.commentatorsLayout : null
            };
          }
          if (scope === 'vs') {
            return {
              ...base,
              viewMode: item.viewMode === 'matchup-2x2' ? 'matchup-2x2' : '1v1',
              vs: (item.vs && typeof item.vs === 'object') ? item.vs : {}
            };
          }
          if (scope === 'brackets') {
            return {
              ...base,
              mode: item.mode || item.brackets?.mode || 'top8-de',
              brackets: (item.brackets && typeof item.brackets === 'object') ? item.brackets : {}
            };
          }
          if (scope === 'results') {
            return {
              ...base,
              aspect: item.aspect || item.results?.aspect || '16:9',
              results: (item.results && typeof item.results === 'object') ? item.results : {}
            };
          }
          // scope === 'bundle' (Combined Tournament Broadcast Pack)
          return {
            ...base,
            notes: String(item.notes || '').trim().slice(0, 120),
            modules: (item.modules && typeof item.modules === 'object') ? item.modules : {}
          };
        };

        if (body.action === 'delete' && body.id) {
          presetsDb = presetsDb.filter(p => p.id !== body.id);
        } else if (body.action === 'import') {
          const items = Array.isArray(body.presets) ? body.presets : (body.preset ? [body.preset] : []);
          for (const raw of items) {
            const entry = normalizePreset(raw);
            if (!entry) continue;
            const idx = presetsDb.findIndex(p => p.id === entry.id || ((p.scope || 'scorebar') === entry.scope && p.name.toLowerCase() === entry.name.toLowerCase()));
            if (idx >= 0) presetsDb[idx] = entry;
            else presetsDb.unshift(entry);
          }
          presetsDb = presetsDb.slice(0, 200);
        } else if (body.name && String(body.name).trim()) {
          const entry = normalizePreset(body);
          if (entry) {
            const idx = presetsDb.findIndex(p => p.id === entry.id || ((p.scope || 'scorebar') === entry.scope && p.name.toLowerCase() === entry.name.toLowerCase()));
            if (idx >= 0) presetsDb[idx] = entry;
            else presetsDb.unshift(entry);
            presetsDb = presetsDb.slice(0, 200);
          }
        }
        writeJsonAtomic(PRESETS_FILE, presetsDb);
        return sendJson(res, 200, presetsDb);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
  }

  // --- API: Tournament Integrations Config (NEVER sends any token characters or hints to the browser!) ---
  if (pathname === '/api/integrations') {
    if (req.method === 'GET') {
      return sendJson(res, 200, {
        provider: integrationsCfg.provider || 'startgg',
        startggUrl: integrationsCfg.startggUrl || '',
        hasStartggToken: Boolean(getAuthToken('startgg')),
        challongeUrl: integrationsCfg.challongeUrl || '',
        hasChallongeKey: Boolean(getAuthToken('challonge')),
        persistTokens: Boolean(integrationsCfg.persistTokens)
      });
    }
    if (req.method === 'POST') {
      try {
        const body = await readBody(req);
        if (body.action === 'clear') {
          const target = body.provider || 'all';
          if (target === 'all' || target === 'startgg') {
            sessionTokens.startgg = '';
            integrationsCfg.startggToken = '';
          }
          if (target === 'all' || target === 'challonge') {
            sessionTokens.challonge = '';
            integrationsCfg.challongeKey = '';
          }
          saveIntegrationsSafe();
          return sendJson(res, 200, {
            ok: true,
            hasStartggToken: Boolean(getAuthToken('startgg')),
            hasChallongeKey: Boolean(getAuthToken('challonge')),
            persistTokens: Boolean(integrationsCfg.persistTokens)
          });
        }
        if (body.provider) integrationsCfg.provider = body.provider;
        if (body.persistTokens !== undefined) integrationsCfg.persistTokens = Boolean(body.persistTokens);
        if (body.startggUrl !== undefined) integrationsCfg.startggUrl = String(body.startggUrl).trim();
        if (body.startggToken !== undefined && body.startggToken !== '__KEEP__') {
          sessionTokens.startgg = String(body.startggToken).trim();
        }
        if (body.challongeUrl !== undefined) integrationsCfg.challongeUrl = String(body.challongeUrl).trim();
        if (body.challongeKey !== undefined && body.challongeKey !== '__KEEP__') {
          sessionTokens.challonge = String(body.challongeKey).trim();
        }
        saveIntegrationsSafe();
        return sendJson(res, 200, {
          ok: true,
          hasStartggToken: Boolean(getAuthToken('startgg')),
          hasChallongeKey: Boolean(getAuthToken('challonge')),
          persistTokens: Boolean(integrationsCfg.persistTokens)
        });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
  }

  // Helper: cache a tournament's remote logo locally into data/branding/ (zero CORS, works offline!)
  async function attachCachedTournamentLogo(snapshot) {
    const rawLogo = snapshot?.tournament?.logoUrl;
    if (!rawLogo) return snapshot;
    try {
      const cached = await assets.cacheRemoteBrandingLogo(rawLogo, snapshot.tournament.slug || snapshot.tournament.name);
      if (cached?.url) snapshot.tournament.cachedLogoUrl = cached.url;
    } catch { }
    return snapshot;
  }

  // Helper: fill missing (or mismatched) characters with distinct random fighters from the active game roster
  async function autoFillMissingChars(playerObjs = [], gameId = 'tekken8', { replaceInvalid = false } = {}) {
    const g = String(gameId || currentState.vs?.game || currentState.results?.game || 'tekken8').trim() || 'tekken8';
    let rosterNames = [];
    try {
      const r = await assets.getRoster(g, 'full');
      if (Array.isArray(r?.characters) && r.characters.length) {
        const verified = r.characters.filter(c => c.cached || c.hasAsset !== false).map(c => c.name).filter(Boolean);
        rosterNames = verified.length ? verified : r.characters.map(c => c.name).filter(Boolean);
      }
    } catch {}
    if (!rosterNames.length) {
      rosterNames = DEMO_GAME_CONFIGS[resolveDemoGameId(g)]?.chars || DEMO_GAME_CONFIGS.tekken8.chars;
    }
    if (!rosterNames.length) return 0;

    const normName = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const validSet = new Set(rosterNames.map(normName));
    const isValid = (ch) => {
      const q = normName(ch);
      if (!q) return false;
      if (validSet.has(q)) return true;
      for (const vn of validSet) {
        if (vn.includes(q) || q.includes(vn)) return true;
      }
      return false;
    };

    // Keep track of already-used characters and consistent player->character mapping across rounds
    const playerCharMap = new Map();
    const usedChars = new Set();
    for (const pl of playerObjs) {
      if (!pl || !pl.name || pl.name === 'TBD') continue;
      const pk = pl.name.toLowerCase();
      if (pl.character && (!replaceInvalid || isValid(pl.character))) {
        if (!playerCharMap.has(pk)) playerCharMap.set(pk, pl.character);
        usedChars.add(normName(pl.character));
      }
    }

    // Fisher-Yates shuffle of available fighters so every sync feels fresh & distinct
    const pool = [...rosterNames];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    let cursor = 0;
    const nextChar = () => {
      for (let tries = 0; tries < pool.length; tries++) {
        const cand = pool[(cursor++) % pool.length];
        if (!usedChars.has(normName(cand))) {
          usedChars.add(normName(cand));
          return cand;
        }
      }
      return pool[(cursor++) % pool.length];
    };

    let assigned = 0;
    for (const pl of playerObjs) {
      if (!pl || !pl.name || pl.name === 'TBD') continue;
      const needs = !pl.character || (replaceInvalid && !isValid(pl.character));
      if (!needs) continue;
      const pk = pl.name.toLowerCase();
      let chosen = playerCharMap.get(pk);
      if (!chosen) {
        chosen = nextChar();
        playerCharMap.set(pk, chosen);
      }
      pl.character = chosen;
      pl.autoAssignedChar = true;
      assigned++;
    }
    return assigned;
  }

  // --- API: Tournament Multi-Provider Status, Active Lock & Clean Disconnect ---
  if (pathname === '/api/tournament/status' && req.method === 'GET') {
    return sendJson(res, 200, { ok: true, ...summarizeTournamentStatus() });
  }

  if (pathname === '/api/tournament/set-active' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      const prov = String(body.provider || '').trim().toLowerCase();
      if (!['startgg', 'challonge', 'demo'].includes(prov)) {
        return sendJson(res, 400, { error: 'Invalid provider' });
      }
      if (!tournamentSnapshots[prov]) {
        return sendJson(res, 404, { error: `No ${prov.toUpperCase()} tournament is currently loaded.` });
      }
      activeTournamentProvider = prov;
      integrationsCfg.provider = prov;
      return sendJson(res, 200, { ok: true, snapshot: tournamentSnapshots[prov], ...summarizeTournamentStatus() });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (pathname === '/api/tournament/clear' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      const prov = String(body.provider || activeTournamentProvider || 'all').trim().toLowerCase();
      const clearUrl = body.clearUrl !== false;
      const targets = prov === 'all' ? ['startgg', 'challonge', 'demo'] : ([prov].filter(p => ['startgg', 'challonge', 'demo'].includes(p)));
      if (!targets.length) return sendJson(res, 400, { error: `Invalid provider: ${prov}` });

      for (const p of targets) {
        tournamentSnapshots[p] = null;
        if (clearUrl) {
          if (p === 'startgg') integrationsCfg.startggUrl = '';
          if (p === 'challonge') integrationsCfg.challongeUrl = '';
        }
      }
      if (clearUrl) saveIntegrationsSafe();

      if (!activeTournamentProvider || targets.includes(activeTournamentProvider)) {
        activeTournamentProvider = ['startgg', 'challonge', 'demo'].find(p => Boolean(tournamentSnapshots[p])) || null;
      }
      return sendJson(res, 200, { ok: true, cleared: prov, ...summarizeTournamentStatus() });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Connect / Refresh Tournament (Start.gg | Challonge | Demo — Strictly Isolated per Provider!) ---
  if (pathname === '/api/tournament/connect' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const provider = body.provider || integrationsCfg.provider || 'startgg';
      const isolated = Boolean(body.isolated);
      if (!isolated || !activeTournamentProvider) {
        integrationsCfg.provider = provider;
        activeTournamentProvider = provider;
      }

      if (provider === 'demo') {
        const demoGame = resolveDemoGameId(body.demoGame || body.game || currentState.vs?.game || 'tekken8');
        const snap = await attachCachedTournamentLogo(getDemoTournament(demoGame));
        tournamentSnapshots.demo = snap;
        return sendJson(res, 200, { ...snap, _status: summarizeTournamentStatus() });
      }

      if (provider === 'startgg') {
        const url = String(body.url ?? integrationsCfg.startggUrl ?? '').trim();
        const token = getAuthToken('startgg', body.token);
        if (url) integrationsCfg.startggUrl = url;
        if (body.rememberToken !== undefined) integrationsCfg.persistTokens = Boolean(body.rememberToken);
        if (body.token && body.token !== '__KEEP__') sessionTokens.startgg = token;
        saveIntegrationsSafe();

        const data = await attachCachedTournamentLogo(await connectStartGG(url, token));
        tournamentSnapshots.startgg = data;
        return sendJson(res, 200, { ...data, _status: summarizeTournamentStatus() });
      }

      if (provider === 'challonge') {
        const url = String(body.url ?? integrationsCfg.challongeUrl ?? '').trim();
        const key = getAuthToken('challonge', body.token);
        if (url) integrationsCfg.challongeUrl = url;
        if (body.rememberToken !== undefined) integrationsCfg.persistTokens = Boolean(body.rememberToken);
        if (body.token && body.token !== '__KEEP__') sessionTokens.challonge = key;
        saveIntegrationsSafe();

        const data = await attachCachedTournamentLogo(await connectChallonge(url, key));
        tournamentSnapshots.challonge = data;
        return sendJson(res, 200, { ...data, _status: summarizeTournamentStatus() });
      }

      return sendJson(res, 400, { error: `Unknown provider: ${provider}` });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Pull & Cache Official Tournament / Event Logo (Start.gg | Challonge | Demo) ---
  if (pathname === '/api/tournament/logo' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      const provider = body.provider || activeTournamentProvider || integrationsCfg.provider || 'startgg';
      const provSnap = getProviderSnap(provider);
      let tName = '';
      let tSlug = '';
      let rawLogo = '';

      if (provSnap?.tournament?.cachedLogoUrl) {
        return sendJson(res, 200, {
          ok: true,
          provider: provSnap.provider,
          tournamentName: provSnap.tournament.name,
          tournamentSlug: provSnap.tournament.slug,
          logoUrl: provSnap.tournament.cachedLogoUrl
        });
      }

      if (provider === 'demo') {
        const demo = getDemoTournament(body.demoGame || body.game || provSnap?.gameId);
        tName = demo.tournament.name;
        tSlug = demo.tournament.slug;
        rawLogo = demo.tournament.logoUrl;
      } else if (provider === 'startgg') {
        const url = String(body.url || integrationsCfg.startggUrl || '').trim();
        const token = getAuthToken('startgg', body.token);
        if (!url || !token) {
          return sendJson(res, 400, { error: 'Connect a start.gg tournament first in the Tournaments tab.' });
        }
        const meta = await fetchStartGGTournamentLogo(url, token);
        tName = meta.name;
        tSlug = meta.slug;
        rawLogo = meta.logoUrl;
      } else if (provider === 'challonge') {
        const url = String(body.url || integrationsCfg.challongeUrl || '').trim();
        const key = getAuthToken('challonge', body.token);
        if (!url || !key) {
          return sendJson(res, 400, { error: 'Connect a Challonge tournament first in the Tournaments tab.' });
        }
        const meta = await fetchChallongeTournamentLogo(url, key);
        tName = meta.name;
        tSlug = meta.slug;
        rawLogo = meta.logoUrl;
      }

      if (!rawLogo) {
        return sendJson(res, 404, { error: `No official event logo was found on ${provider.toUpperCase()} for "${tName || 'this tournament'}". You can still upload a custom PNG.` });
      }
      const cached = await assets.cacheRemoteBrandingLogo(rawLogo, tSlug || tName || 'event');
      const finalUrl = cached?.url || rawLogo;
      if (provSnap?.tournament && provSnap.tournament.slug === tSlug) {
        provSnap.tournament.logoUrl = rawLogo;
        provSnap.tournament.cachedLogoUrl = finalUrl;
      }
      return sendJson(res, 200, {
        ok: true,
        provider,
        tournamentName: tName,
        tournamentSlug: tSlug,
        logoUrl: finalUrl
      });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Switch Start.gg Event Sets ---
  if (pathname === '/api/tournament/sets' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const provider = body.provider || activeTournamentProvider || 'startgg';
      const provSnap = getProviderSnap(provider);
      if (provider === 'demo') {
        const demo = getDemoTournament(body.demoGame || body.game || provSnap?.gameId);
        return sendJson(res, 200, { sets: demo.sets, streamQueue: demo.streamQueue, gameId: demo.gameId });
      }
      if (provider === 'startgg') {
        const token = getAuthToken('startgg');
        const sets = await fetchStartGGEventSets(body.eventId, token);
        let seeding = { phases: [], selectedPhaseId: null, seedingAvailable: false, seeds: [] };
        try {
          const evMeta = provSnap?.events?.find(e => String(e.id) === String(body.eventId));
          seeding = await fetchStartGGEventSeeds(body.eventId, token, null, evMeta?.phases || null);
        } catch { }
        if (provSnap) {
          provSnap.selectedEventId = String(body.eventId);
          provSnap.sets = sets;
          provSnap.phases = seeding.phases;
          provSnap.selectedPhaseId = seeding.selectedPhaseId;
          provSnap.seedingAvailable = seeding.seedingAvailable;
          provSnap.seeds = seeding.seeds;
        }
        return sendJson(res, 200, { sets, ...seeding });
      }
      if (provider === 'challonge') {
        const data = await connectChallonge(integrationsCfg.challongeUrl, getAuthToken('challonge'));
        tournamentSnapshots.challonge = data;
        return sendJson(res, 200, {
          sets: data.sets,
          streamQueue: data.streamQueue,
          phases: data.phases,
          selectedPhaseId: data.selectedPhaseId,
          seedingAvailable: data.seedingAvailable,
          seeds: data.seeds
        });
      }
      return sendJson(res, 400, { error: 'Unsupported provider' });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Fetch / Refresh Phase Seeding Table (Start.gg GraphQL | Challonge | Demo) ---
  if (pathname === '/api/tournament/seeding' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      const provider = body.provider || activeTournamentProvider || integrationsCfg.provider || 'startgg';
      const provSnap = getProviderSnap(provider);
      const phaseId = body.phaseId || null;
      const forceRefresh = Boolean(body.forceRefresh);
      let seeding = null;

      if (provider === 'demo') {
        seeding = getDemoSeeding(phaseId || 'demo-ph-pools', body.demoGame || body.game || provSnap?.gameId);
      } else if (provider === 'startgg') {
        const eventId = body.eventId || provSnap?.selectedEventId;
        const token = getAuthToken('startgg', body.token);
        if (!eventId) throw new Error('Connect a start.gg event first in the Tournaments tab.');
        const evMeta = provSnap?.events?.find(e => String(e.id) === String(eventId));
        seeding = await fetchStartGGEventSeeds(eventId, token, phaseId, forceRefresh ? null : (evMeta?.phases || null), forceRefresh);
      } else if (provider === 'challonge') {
        if (!forceRefresh && provSnap && Array.isArray(provSnap.seeds)) {
          seeding = {
            phases: provSnap.phases || [{ id: 'main', name: 'Main Bracket', numSeeds: provSnap.seeds.length, phaseOrder: 1 }],
            selectedPhaseId: 'main',
            seedingAvailable: Boolean(provSnap.seedingAvailable),
            seeds: provSnap.seeds
          };
        } else {
          const snap = await connectChallonge(integrationsCfg.challongeUrl, getAuthToken('challonge', body.token));
          tournamentSnapshots.challonge = snap;
          seeding = {
            phases: snap.phases,
            selectedPhaseId: snap.selectedPhaseId,
            seedingAvailable: snap.seedingAvailable,
            seeds: snap.seeds
          };
        }
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }

      const targetSnap = getProviderSnap(provider);
      if (targetSnap && seeding) {
        targetSnap.phases = seeding.phases;
        targetSnap.selectedPhaseId = seeding.selectedPhaseId;
        targetSnap.seedingAvailable = seeding.seedingAvailable;
        targetSnap.seeds = seeding.seeds;
      }
      return sendJson(res, 200, { ok: true, provider, ...seeding });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Pull Canonical 11-Slot Top 8 Double-Elimination Bracket (Start.gg / Challonge / Demo) ---
  if (pathname === '/api/tournament/bracket' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      const provider = body.provider || activeTournamentProvider || integrationsCfg.provider || 'startgg';
      const targetGame = body.demoGame || body.game || currentState.vs?.game || currentState.results?.game || 'tekken8';
      let out = null;

      if (provider === 'demo') {
        out = getDemoTop8Bracket(resolveDemoGameId(targetGame));
      } else if (provider === 'startgg') {
        let snap = getProviderSnap('startgg');
        const token = getAuthToken('startgg', body.token);
        const url = String(body.url || integrationsCfg.startggUrl || '').trim();
        if (!snap && url && token) {
          snap = await attachCachedTournamentLogo(await connectStartGG(url, token));
          tournamentSnapshots.startgg = snap;
        }
        const eventId = body.eventId || snap?.selectedEventId;
        if (!eventId) throw new Error('Connect a start.gg event first in the Tournaments tab.');
        const sets = await fetchStartGGEventSets(eventId, token);
        const built = buildTop8BracketFromSets(sets, snap?.seeds || []);
        const ev = snap?.events?.find(e => String(e.id) === String(eventId));
        out = {
          provider: 'startgg',
          tournamentName: snap?.tournament?.name || 'TOP 8 BRACKET',
          eventName: ev?.name || '',
          entrantsCount: ev?.numEntrants || 0,
          logoUrl: snap?.tournament?.cachedLogoUrl || snap?.tournament?.logoUrl || '',
          hasReset: built.hasReset,
          slots: built.slots
        };
      } else if (provider === 'challonge') {
        const url = String(body.url || integrationsCfg.challongeUrl || '').trim();
        const key = getAuthToken('challonge', body.token);
        if (!url || !key) throw new Error('Connect a Challonge tournament first in the Tournaments tab.');
        const snap = await attachCachedTournamentLogo(await connectChallonge(url, key));
        tournamentSnapshots.challonge = snap;
        const built = buildTop8BracketFromSets(snap.sets || [], snap.seeds || []);
        out = {
          provider: 'challonge',
          tournamentName: snap.tournament?.name || 'TOP 8 BRACKET',
          eventName: snap.events?.[0]?.name || '',
          entrantsCount: snap.participants?.length || 0,
          logoUrl: snap.tournament?.cachedLogoUrl || snap.tournament?.logoUrl || '',
          hasReset: built.hasReset,
          slots: built.slots
        };
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }

      // Enrich bracket slot players with characters/flags/avatars/handles from local playersDb
      const allSlotPlayers = [];
      for (const slot of Object.values(out.slots || {})) {
        for (const side of ['p1', 'p2']) {
          const pl = slot[side];
          if (!pl || !pl.name || pl.name === 'TBD') continue;
          const saved = playersDb.find(p => p.name.toLowerCase() === pl.name.toLowerCase());
          if (saved) {
            if (!pl.character && saved.character) pl.character = saved.character;
            if (!pl.sponsor && saved.sponsor) pl.sponsor = saved.sponsor;
            if (!pl.flag && saved.flag) pl.flag = saved.flag;
            if (!pl.region && saved.region) pl.region = saved.region;
            if (!pl.avatar && saved.avatar) pl.avatar = saved.avatar;
            if (!pl.handle && saved.handle) pl.handle = saved.handle;
          }
          allSlotPlayers.push(pl);
        }
      }
      // Auto-assign distinct random fighters from the active game's roster for any player without a valid character!
      if (body.autoFillChars !== false) {
        out.autoAssignedChars = await autoFillMissingChars(allSlotPlayers, targetGame, { replaceInvalid: true });
      }
      out.matchedSets = Object.values(out.slots || {}).filter(s => s.p1?.name !== 'TBD' || s.p2?.name !== 'TBD').length;
      return sendJson(res, 200, { ok: true, ...out });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Pull Tournament Pools / Groups Progress (Start.gg / Demo) ---
  if (pathname === '/api/tournament/pools' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      const provider = body.provider || activeTournamentProvider || 'demo';
      const provSnap = getProviderSnap(provider);
      const demoGame = resolveDemoGameId(body.demoGame || body.game || provSnap?.gameId || currentState.vs?.game || 'tekken8');
      let result;
      if (provider === 'demo') {
        result = { ...getDemoPools(demoGame), poolTreeSlots: getDemoPoolTree(demoGame), top16Rows: getDemoTop16(demoGame) };
      } else if (provider === 'startgg') {
        const eventId = body.eventId || provSnap?.selectedEventId;
        if (!eventId) throw new Error('Connect a start.gg event first.');
        result = await fetchStartGGPools(eventId, getAuthToken('startgg'));
      } else {
        result = { ...getDemoPools(demoGame), poolTreeSlots: getDemoPoolTree(demoGame), top16Rows: getDemoTop16(demoGame) };
      }
      return sendJson(res, 200, { ok: true, ...result });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Pull Final Tournament Standings (Top 8) from Start.gg / Challonge / Demo ---
  if (pathname === '/api/tournament/standings' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      const provider = body.provider || activeTournamentProvider || integrationsCfg.provider || 'startgg';
      const targetGame = body.demoGame || body.game || currentState.results?.game || currentState.vs?.game || 'tekken8';
      let result = null;
      if (provider === 'demo') {
        result = getDemoStandings(resolveDemoGameId(targetGame));
      } else if (provider === 'startgg') {
        let sggSnap = getProviderSnap('startgg');
        let eventId = body.eventId || sggSnap?.selectedEventId;
        const token = getAuthToken('startgg', body.token);
        const url = String(body.url || integrationsCfg.startggUrl || '').trim();
        if (!eventId && url && token) {
          sggSnap = await attachCachedTournamentLogo(await connectStartGG(url, token));
          tournamentSnapshots.startgg = sggSnap;
          eventId = sggSnap.selectedEventId;
        }
        if (!eventId) throw new Error('Connect a start.gg event first in the Tournaments tab.');
        result = await fetchStartGGStandings(eventId, token);
      } else if (provider === 'challonge') {
        const url = String(body.url || integrationsCfg.challongeUrl || '').trim();
        const key = getAuthToken('challonge', body.token);
        if (!url || !key) throw new Error('Connect a Challonge tournament first in the Tournaments tab.');
        result = await fetchChallongeStandings(url, key);
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }
      if (result?.logoUrl) {
        try {
          const cached = await assets.cacheRemoteBrandingLogo(result.logoUrl, result.tournamentSlug || result.tournamentName);
          if (cached?.url) result.cachedLogoUrl = cached.url;
        } catch { }
      }
      // Enrich characters/flags/avatars/seeds strictly from the MATCHING provider snapshot seeds + local playersDb
      const provSnap = getProviderSnap(provider);
      const snapSeeds = Array.isArray(provSnap?.seeds) ? provSnap.seeds : [];
      for (const pl of (result.placements || [])) {
        if (!pl.seed && snapSeeds.length) {
          const sHit = snapSeeds.find(x => String(x.name || '').toLowerCase() === String(pl.name || '').toLowerCase());
          const resolved = cleanSeedNum(sHit?.initialSeed ?? sHit?.seed ?? sHit?.phaseSeed);
          if (resolved) pl.seed = resolved;
        }
        const saved = playersDb.find(p => p.name.toLowerCase() === String(pl.name || '').toLowerCase());
        if (saved) {
          if (!pl.character && saved.character) pl.character = saved.character;
          if (!pl.sponsor && saved.sponsor) pl.sponsor = saved.sponsor;
          if (!pl.flag && saved.flag) pl.flag = saved.flag;
          if (!pl.region && saved.region) pl.region = saved.region;
          if (!pl.avatar && saved.avatar) pl.avatar = saved.avatar;
          if (!pl.seed && saved.seed) pl.seed = cleanSeedNum(saved.seed);
          if (!pl.handle && saved.handle) pl.handle = saved.handle;
        }
      }
      if (body.autoFillChars !== false && Array.isArray(result.placements)) {
        result.autoAssignedChars = await autoFillMissingChars(result.placements, targetGame, { replaceInvalid: true });
      }
      return sendJson(res, 200, { ok: true, ...result });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Import Tournament Participants into local players.json ---
  if (pathname === '/api/tournament/import-players' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const provider = body.provider || activeTournamentProvider || 'startgg';
      const provSnap = getProviderSnap(provider);
      let imported = [];
      if (provider === 'demo') {
        imported = getDemoTournament(body.demoGame || body.game || provSnap?.gameId).participants;
      } else if (provider === 'startgg') {
        const eventId = body.eventId || provSnap?.selectedEventId;
        if (!eventId) throw new Error('Connect a start.gg event first.');
        imported = await fetchStartGGEntrants(eventId, getAuthToken('startgg'));
      } else if (provider === 'challonge') {
        const snap = provSnap || await connectChallonge(integrationsCfg.challongeUrl, getAuthToken('challonge'));
        imported = snap.participants || [];
      }
      const stats = mergeImportedPlayers(imported);
      return sendJson(res, 200, { ...stats, players: playersDb });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Report Set Result to Start.gg / Challonge / Demo (+ Auto-log History!) ---
  if (pathname === '/api/tournament/report' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const { provider, tournamentSlug, setId, winnerEntrantId, p1EntrantId, p2EntrantId, p1Score, p2Score, liveOnly } = body;
      let result = null;
      if (provider === 'demo') {
        result = reportDemoSet({ setId, winnerEntrantId, p1Score, p2Score });
      } else if (provider === 'startgg') {
        result = await reportStartGGSet({
          setId, winnerEntrantId, p1EntrantId, p2EntrantId, p1Score, p2Score,
          token: getAuthToken('startgg')
        });
      } else if (provider === 'challonge') {
        const chSnap = getProviderSnap('challonge');
        result = await reportChallongeMatch({
          tournamentSlug: tournamentSlug || chSnap?.tournament?.slug,
          matchId: setId,
          winnerEntrantId,
          p1Score,
          p2Score,
          apiKey: getAuthToken('challonge'),
          liveOnly: Boolean(liveOnly)
        });
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }
      return sendJson(res, 200, { ok: true, result });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Local Match History & H2H ---
  if (pathname === '/api/history') {
    if (req.method === 'GET') {
      return sendJson(res, 200, historyDb);
    }
    if (req.method === 'POST') {
      try {
        const body = await readBody(req);
        if (body.action === 'delete' && body.id) {
          historyDb = historyDb.filter(h => h.id !== body.id);
        } else if (body.action === 'clear') {
          historyDb = [];
        } else {
          const entry = {
            id: `match-${Date.now()}`,
            ts: Date.now(),
            provider: body.provider || 'local',
            tournament: String(body.tournament || currentState.tournament || 'Local').trim(),
            round: String(body.round || currentState.round || '').trim(),
            format: String(body.format || currentState.format || '').trim(),
            p1: body.p1 || currentState.p1,
            p2: body.p2 || currentState.p2,
            winnerSide: body.winnerSide || (Number(body.p1?.score ?? 0) >= Number(body.p2?.score ?? 0) ? 'p1' : 'p2')
          };
          historyDb.unshift(entry);
          historyDb = historyDb.slice(0, 500);
        }
        writeJsonAtomic(HISTORY_FILE, historyDb);
        return sendJson(res, 200, historyDb);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
  }

  // --- API: Multi-Game Character Assets & Local Cache (StreamHelperAssets) ---
  if (pathname === '/api/assets/games' && req.method === 'GET') {
    try {
      const includeAll = urlObj.searchParams.get('all') === '1';
      return sendJson(res, 200, await assets.listGames(includeAll));
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  if (pathname === '/api/assets/roster' && req.method === 'GET') {
    try {
      const game = urlObj.searchParams.get('game') || currentState.vs?.game || 'tekken8';
      const pack = urlObj.searchParams.get('pack') || currentState.vs?.pack || 'full';
      return sendJson(res, 200, await assets.getRoster(game, pack));
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (pathname === '/api/assets/meta' && req.method === 'GET') {
    try {
      const game = urlObj.searchParams.get('game') || 'tekken8';
      return sendJson(res, 200, await assets.getGameMeta(game));
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if ((pathname === '/api/assets/stock' || pathname === '/api/assets/variant' || pathname === '/api/assets/stage') && req.method === 'GET') {
    try {
      const kind = pathname.split('/').pop();
      const game = urlObj.searchParams.get('game') || (kind === 'stock' || kind === 'stage' ? 'ssbu' : 'riotpl');
      const name = urlObj.searchParams.get('name') || urlObj.searchParams.get('char') || '';
      const skin = Math.max(0, Number(urlObj.searchParams.get('skin') || 0) || 0);
      if (!name.trim()) {
        res.writeHead(404);
        return res.end('Missing asset name');
      }
      const resolved = await assets.ensureSubAssetIcon(kind, game, name, skin);
      if (!resolved?.filePath || !fs.existsSync(resolved.filePath)) {
        res.writeHead(404);
        return res.end('Asset icon not found');
      }
      const ext = path.extname(resolved.filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'image/png',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400'
      });
      return fs.createReadStream(resolved.filePath).pipe(res);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(err.message);
    }
  }

  if (pathname === '/api/assets/render' && req.method === 'GET') {
    try {
      const game = urlObj.searchParams.get('game') || 'tekken8';
      const pack = urlObj.searchParams.get('pack') || 'full';
      const charName = urlObj.searchParams.get('char') || '';
      const skin = Math.max(0, Number(urlObj.searchParams.get('skin') || 0) || 0);
      if (!charName.trim()) {
        res.writeHead(404);
        return res.end('No character specified');
      }
      const resolved = await assets.ensureCharacterRender(game, pack, charName, skin);
      if (!resolved?.filePath || !fs.existsSync(resolved.filePath)) {
        res.writeHead(404);
        return res.end('Character render not found');
      }
      const ext = path.extname(resolved.filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'image/png',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400'
      });
      return fs.createReadStream(resolved.filePath).pipe(res);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(err.message);
    }
  }

  if (pathname === '/api/assets/download-pack' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const status = await assets.startPackDownload(body.game || 'tekken8', body.pack || 'full');
      return sendJson(res, 200, status);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (pathname === '/api/assets/download-status' && req.method === 'GET') {
    return sendJson(res, 200, assets.getDownloadStatus());
  }

  // --- API: World & Regional Flag Catalog, On-Demand Image Cache & Bulk Pack Downloader ---
  if (pathname === '/api/flags/catalog' && req.method === 'GET') {
    return sendJson(res, 200, flagMgr.getCatalog());
  }

  if (pathname === '/api/flags/img' && req.method === 'GET') {
    try {
      const code = urlObj.searchParams.get('code') || '';
      const resolved = await flagMgr.ensureFlagImage(code);
      if (!resolved?.filePath || !fs.existsSync(resolved.filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Flag image not found');
      }
      const flagHdrs = {
        'Content-Type': resolved.mime || 'image/png',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=604800',
        'X-Content-Type-Options': 'nosniff'
      };
      if ((resolved.mime || '').includes('svg')) {
        flagHdrs['Content-Security-Policy'] = "sandbox; default-src 'none'; style-src 'unsafe-inline'";
      }
      res.writeHead(200, flagHdrs);
      return fs.createReadStream(resolved.filePath).pipe(res);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(err.message);
    }
  }

  if (pathname === '/api/flags/download-pack' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      const status = flagMgr.startPackDownload({
        scope: body.scope || 'countries',
        continent: body.continent || '',
        country: body.country || ''
      });
      return sendJson(res, 200, status);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (pathname === '/api/flags/download-stop' && req.method === 'POST') {
    return sendJson(res, 200, flagMgr.stopPackDownload());
  }

  if (pathname === '/api/flags/download-status' && req.method === 'GET') {
    return sendJson(res, 200, flagMgr.getDownloadStatus());
  }

  if (pathname === '/api/flags/clear-cache' && req.method === 'POST') {
    try {
      const body = await readBody(req).catch(() => ({}));
      return sendJson(res, 200, flagMgr.clearCache({ scope: body.scope || 'all', country: body.country || '' }));
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (pathname === '/api/assets/clear-pack' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      return sendJson(res, 200, assets.clearPackCache(body.game, body.pack));
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Upload Local Player Avatar, Tournament Logo, or Custom Character PNG ---
  if (pathname === '/api/upload' && req.method === 'POST') {
    try {
      const body = await readBody(req, 9 * 1024 * 1024);
      const saved = assets.saveUploadedImage({
        kind: body.kind,
        name: body.name,
        dataUrl: body.dataUrl,
        game: body.game
      });
      return sendJson(res, 200, { ok: true, url: saved.url });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- API: Same-origin Avatar Proxy for Start.gg / Challonge external profile photos (zero CORS canvas taint) ---
  if (pathname === '/api/avatar-proxy' && req.method === 'GET') {
    try {
      const rawUrl = urlObj.searchParams.get('url') || '';
      const allowedHosts = ['images.start.gg', 'www.start.gg', 'start.gg', 'images.smash.gg', 'challonge.com', 'assets.challonge.com', 'secure.gravatar.com', 's3.amazonaws.com'];
      const isAllowedProxyUrl = (uStr) => {
        try {
          const u = new URL(uStr);
          return u.protocol === 'https:' && allowedHosts.some(h => u.hostname === h || u.hostname.endsWith(`.${h}`));
        } catch {
          return false;
        }
      };
      if (!isAllowedProxyUrl(rawUrl)) {
        res.writeHead(403, { 'X-Content-Type-Options': 'nosniff' });
        return res.end('Host not allowed');
      }
      const upstream = await fetch(rawUrl, {
        headers: { 'User-Agent': `FGC-Open-Scorebars/${APP_VERSION}` },
        redirect: 'follow',
        signal: AbortSignal.timeout(8000)
      });
      if (!upstream.ok) {
        res.writeHead(404);
        return res.end('Avatar unavailable');
      }
      if (upstream.url && !isAllowedProxyUrl(upstream.url)) {
        res.writeHead(403, { 'X-Content-Type-Options': 'nosniff' });
        return res.end('Redirect host not allowed');
      }
      const ct = (upstream.headers.get('content-type') || 'image/jpeg').toLowerCase();
      if (!ct.startsWith('image/')) {
        res.writeHead(415);
        return res.end('Not an image');
      }
      const buf = Buffer.from(await upstream.arrayBuffer());
      if (buf.length < 12 || buf.length > 6 * 1024 * 1024) {
        res.writeHead(413);
        return res.end('Avatar size out of bounds');
      }
      const hdrs = {
        'Content-Type': ct,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff'
      };
      if (ct.includes('svg')) {
        hdrs['Content-Security-Policy'] = "sandbox; default-src 'none'; style-src 'unsafe-inline'";
      }
      res.writeHead(200, hdrs);
      return res.end(buf);
    } catch {
      res.writeHead(404);
      return res.end('Avatar error');
    }
  }

  // --- API: Global Custom PC Fonts (Upload .ttf/.otf/.woff/.woff2 OR Register System Font) ---
  if (pathname === '/api/fonts') {
    if (req.method === 'GET') {
      return sendJson(res, 200, fontsDb);
    }
    if (req.method === 'POST') {
      try {
        const body = await readBody(req, 16 * 1024 * 1024);
        const action = String(body.action || 'upload').toLowerCase();
        if (action === 'delete' && body.id) {
          const id = String(body.id);
          const target = fontsDb.find(f => f.id === id);
          if (target && target.kind === 'file' && target.file) {
            const fp = path.join(FONTS_DIR, path.basename(target.file));
            if (fs.existsSync(fp)) { try { fs.unlinkSync(fp); } catch { } }
          }
          fontsDb = fontsDb.filter(f => f.id !== id);
          writeJsonAtomic(FONTS_FILE, fontsDb);
          broadcastFonts();
          return sendJson(res, 200, { ok: true, fonts: fontsDb });
        }
        if (action === 'add-system') {
          const family = String(body.family || body.name || '').trim().slice(0, 80);
          if (!family) throw new Error('Font family name is required');
          const name = String(body.name || family).trim().slice(0, 60);
          const slug = 'sys-' + family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
          const id = slug || `sys-${Date.now()}`;
          const entry = { id, name, kind: 'system', family, addedAt: Date.now() };
          const idx = fontsDb.findIndex(f => f.id === id || (f.kind === 'system' && f.family.toLowerCase() === family.toLowerCase()));
          if (idx >= 0) fontsDb[idx] = entry;
          else fontsDb.unshift(entry);
          fontsDb = fontsDb.slice(0, 80);
          writeJsonAtomic(FONTS_FILE, fontsDb);
          broadcastFonts();
          return sendJson(res, 200, { ok: true, font: entry, fonts: fontsDb });
        }
        // Default: upload font file (.ttf, .otf, .woff, .woff2) with magic-byte validation!
        const rawFilename = String(body.filename || 'custom-font.ttf').trim();
        const ext = path.extname(rawFilename).toLowerCase();
        const fmtMap = { '.ttf': 'truetype', '.otf': 'opentype', '.woff': 'woff', '.woff2': 'woff2' };
        if (!fmtMap[ext]) throw new Error('Supported font formats: .ttf, .otf, .woff, .woff2');
        const rawData = String(body.dataUrl || body.base64 || '');
        const commaIdx = rawData.indexOf(',');
        const b64 = commaIdx >= 0 ? rawData.slice(commaIdx + 1) : rawData;
        if (!b64) throw new Error('Missing font file data');
        const buf = Buffer.from(b64, 'base64');
        if (buf.length < 32 || buf.length > 11 * 1024 * 1024) {
          throw new Error('Font file must be between 32 bytes and 11 MB');
        }
        const sig4 = buf.subarray(0, 4).toString('ascii');
        const isValidFontSig =
          (ext === '.woff' && sig4 === 'wOFF') ||
          (ext === '.woff2' && sig4 === 'wOF2') ||
          ((ext === '.ttf' || ext === '.otf') && (
            (buf[0] === 0x00 && buf[1] === 0x01 && buf[2] === 0x00 && buf[3] === 0x00) ||
            sig4 === 'OTTO' || sig4 === 'true' || sig4 === 'ttcf'
          ));
        if (!isValidFontSig) {
          throw new Error(`File signature does not match a valid ${ext.toUpperCase()} font.`);
        }
        const baseClean = path.basename(rawFilename, ext).replace(/[_-]+/g, ' ').trim();
        const displayName = String(body.name || baseClean || 'Custom Font').trim().slice(0, 60);
        const slug = displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 42) || `font-${Date.now()}`;
        const fileName = `${slug}${ext}`;
        fs.mkdirSync(FONTS_DIR, { recursive: true });
        fs.writeFileSync(path.join(FONTS_DIR, fileName), buf);
        const entry = {
          id: slug,
          name: displayName,
          kind: 'file',
          file: fileName,
          url: `/media/fonts/${encodeURIComponent(fileName)}`,
          format: fmtMap[ext],
          sizeBytes: buf.length,
          addedAt: Date.now()
        };
        const idx = fontsDb.findIndex(f => f.id === slug);
        if (idx >= 0) fontsDb[idx] = entry;
        else fontsDb.unshift(entry);
        fontsDb = fontsDb.slice(0, 80);
        writeJsonAtomic(FONTS_FILE, fontsDb);
        broadcastFonts();
        return sendJson(res, 200, { ok: true, font: entry, fonts: fontsDb });
      } catch (err) {
        return sendBodyError(res, err);
      }
    }
  }

  // --- Local Uploaded Font Serving (/media/fonts/filename) ---
  const fontMediaMatch = pathname.match(/^\/media\/fonts\/(.+)$/);
  if (fontMediaMatch && req.method === 'GET') {
    let decoded = '';
    try { decoded = decodeURIComponent(fontMediaMatch[1]); } catch { res.writeHead(400); return res.end('Bad URL'); }
    const safeName = path.basename(decoded);
    const resolvedFontsDir = path.resolve(FONTS_DIR);
    const fp = path.resolve(resolvedFontsDir, safeName);
    const ext = path.extname(fp).toLowerCase();
    if (!safeName || safeName !== decoded || !fp.startsWith(resolvedFontsDir + path.sep) || !['.ttf', '.otf', '.woff', '.woff2'].includes(ext) || !fs.existsSync(fp)) {
      res.writeHead(404);
      return res.end('Font not found');
    }
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff'
    });
    return fs.createReadStream(fp).pipe(res);
  }

  // --- API: Broadcast Audio & Custom SFX Library (Phase 5 — OBS-Safe) ---
  if (pathname === '/api/sfx') {
    if (req.method === 'GET') {
      return sendJson(res, 200, {
        custom: sfxMgr.listCustomSfx(),
        audio: currentState.audio
      });
    }
    if (req.method === 'POST') {
      try {
        const body = await readBody(req, 10 * 1024 * 1024);
        const action = String(body.action || 'upload').toLowerCase();
        if (action === 'delete' && body.id) {
          const ok = sfxMgr.deleteCustomSfx(body.id);
          broadcastSfx();
          return sendJson(res, 200, { ok, custom: sfxMgr.listCustomSfx() });
        }
        if (action === 'rename' && body.id) {
          const item = sfxMgr.renameCustomSfx(body.id, body.name);
          broadcastSfx();
          return sendJson(res, 200, { ok: true, item, custom: sfxMgr.listCustomSfx() });
        }
        const item = sfxMgr.saveUploadedSfx({
          filename: body.filename,
          name: body.name,
          dataUrl: body.dataUrl,
          base64: body.base64,
          category: body.category
        });
        broadcastSfx();
        return sendJson(res, 200, { ok: true, item, custom: sfxMgr.listCustomSfx() });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
  }

  if (pathname === '/api/audio/trigger' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const ev = sfxMgr.createManualTrigger({
        eventType: body.eventType,
        side: body.side,
        playerName: body.playerName,
        target: body.target,
        sound: body.sound,
        volume: body.volume,
        presetId: body.presetId || currentState.theme
      });
      broadcastAudio(ev);
      return sendJson(res, 200, { ok: true, event: ev });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // --- Local Uploaded SFX Audio Streaming (/media/sfx/filename with HTTP 206 Byte-Range support!) ---
  const sfxMediaMatch = pathname.match(/^\/media\/sfx\/(.+)$/);
  if (sfxMediaMatch && req.method === 'GET') {
    return sfxMgr.serveSfxMedia(req, res, sfxMediaMatch[1]);
  }

  // --- Local Uploaded Media Serving (/media/avatars|branding|custom/filename) ---
  const mediaMatch = pathname.match(/^\/media\/(avatars|branding|custom)\/(.+)$/);
  if (mediaMatch && req.method === 'GET') {
    const fp = assets.resolveMediaFile(mediaMatch[1], mediaMatch[2]);
    if (!fp) {
      res.writeHead(404);
      return res.end('Media not found');
    }
    const ext = path.extname(fp).toLowerCase();
    const hdrs = {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff'
    };
    if (ext === '.svg') {
      hdrs['Content-Security-Policy'] = "sandbox; default-src 'none'; style-src 'unsafe-inline'";
    }
    res.writeHead(200, hdrs);
    return fs.createReadStream(fp).pipe(res);
  }

  // --- API: Version Check & 1-Click Data-Safe Auto-Updater (GitHub Releases) ---
  if (pathname === '/api/update/check' && req.method === 'GET') {
    const force = urlObj.searchParams.get('force') === '1';
    const info = await checkGithubUpdate(force);
    return sendJson(res, 200, info);
  }

  if (pathname === '/api/update/apply' && req.method === 'POST') {
    try {
      const info = await checkGithubUpdate(true);
      if (info.status === 'offline') {
        throw new Error('No internet connection to reach GitHub Releases');
      }
      if (info.status !== 'update-available') {
        return sendJson(res, 200, {
          ok: true,
          alreadyUpToDate: true,
          previousVersion: APP_VERSION,
          updatedTo: APP_VERSION,
          filesUpdated: 0,
          canAutoRestart: true
        });
      }
      if (!info.downloadUrl) {
        throw new Error('No downloadable release package found on GitHub');
      }
      const result = await applySafeUpdate(info.downloadUrl);
      updateCache = null;
      return sendJson(res, 200, {
        ok: true,
        previousVersion: APP_VERSION,
        updatedTo: info.latestVersion,
        filesUpdated: result.filesUpdated,
        canAutoRestart: true
      });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  if (pathname === '/api/update/restart' && req.method === 'POST') {
    sendJson(res, 200, { ok: true, restarting: true, launcher: process.env.FGC_LAUNCHER === '1' });
    setTimeout(() => {
      for (const [clientRes] of sseSessions) {
        try { clientRes.end(); } catch { }
      }
      sseSessions.clear();
      const finishRestart = () => {
        if (process.env.FGC_LAUNCHER === '1') {
          process.exit(42);
        } else {
          try {
            const childEnv = { ...process.env, FGC_BOOT_DELAY_MS: '650' };
            const child = spawn(process.execPath, [__filename], {
              cwd: ROOT_DIR,
              detached: true,
              stdio: 'ignore',
              env: childEnv
            });
            child.unref();
          } catch { }
          process.exit(0);
        }
      };
      try {
        server.close(finishRestart);
        server.closeAllConnections?.();
      } catch {
        finishRestart();
      }
      setTimeout(finishRestart, 450).unref?.();
    }, 220);
    return;
  }

  // --- API: Pixel-Perfect 1:1 WYSIWYG PNG Export (Scorebar / Results / VS Splash / Brackets) ---
  if (pathname === '/api/export/png' && req.method === 'POST') {
    try {
      if (!findChromiumExecutable()) {
        return sendJson(res, 503, { error: 'NO_BROWSER', message: 'No local Edge/Chrome browser detected for 1:1 PNG capture.' });
      }
      const body = await readBody(req).catch(() => ({}));
      const target = ['results', 'vs', 'brackets', 'scorebar'].includes(body.target) ? body.target : 'results';
      if (body.state && typeof body.state === 'object') {
        currentState = deepMergeState(currentState, body.state);
        writeJsonAtomic(STATE_FILE, currentState, { keepBackup: true });
      }
      const mode = String(body.mode || '').trim().toLowerCase();
      let file = 'results.html';
      let stageSelector = '#res-stage';
      let width = 1920;
      let height = 1080;
      let transparent = false;
      let slug = 'fgc-export';
      const qs = new URLSearchParams({ export: '1' });

      if (target === 'scorebar') {
        file = 'index.html';
        stageSelector = '#stage';
        width = 1920;
        height = 1080;
        const rawBg = String(body.bg || mode || 't8').trim().toLowerCase();
        const allowedBgs = ['t8', 'sf6', '2xko', 'ffcotw', 'ssbu', 'avatar', 'mk1', 'green'];
        if (allowedBgs.includes(rawBg)) {
          qs.set('preview', rawBg);
          transparent = false;
        } else {
          // 'checker' / 'transparent' -> real 1080p RGBA alpha PNG without checkerboard squares
          transparent = true;
        }
        if (body.guides) qs.set('guides', '1');
        const themeSlug = String(currentState.theme || 'scorebar').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') || 'scorebar';
        const p1Slug = String(currentState.p1?.name || 'p1').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const p2Slug = String(currentState.p2?.name || 'p2').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        slug = `scorebar-${themeSlug}${p1Slug && p2Slug ? `-${p1Slug}-vs-${p2Slug}` : ''}`.slice(0, 72);
      } else if (target === 'results') {
        file = 'results.html';
        stageSelector = '#res-stage';
        const r = currentState.results || {};
        const effMode = mode || r.viewMode || 'normal';
        const isVert = effMode === 'normal' && r.aspect === '4:5';
        width = isVert ? 1080 : 1920;
        height = isVert ? 1350 : 1080;
        transparent = r.bgMode === 'transparent';
        slug = String(r.title || 'top8-results').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') || 'top8-results';
      } else if (target === 'vs') {
        file = 'vs.html';
        stageSelector = '#vs-stage';
        const v = currentState.vs || {};
        const effMode = mode || v.viewMode || '1v1';
        transparent = effMode === '1v1' && v.bgMode === 'transparent';
        slug = effMode === '1v1'
          ? `vs-${(currentState.p1?.name || 'p1')}-vs-${(currentState.p2?.name || 'p2')}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-')
          : `vs-${effMode}`;
      } else if (target === 'brackets') {
        file = 'brackets.html';
        stageSelector = '#bks-stage';
        const b = currentState.brackets || {};
        const effMode = mode || b.mode || 'top8-de';
        transparent = b.bgMode === 'transparent';
        slug = `brackets-${effMode}`;
      }

      if (mode && target !== 'scorebar') qs.set('mode', mode);
      const url = `http://127.0.0.1:${PORT}/${file}?${qs.toString()}`;
      const pngBuf = await captureOverlayPng({ url, width, height, transparent, stageSelector });
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': pngBuf.length,
        'Content-Disposition': `attachment; filename="${slug}.png"`,
        'Cache-Control': 'no-store'
      });
      return res.end(pngBuf);
    } catch (err) {
      const code = err?.code === 'NO_BROWSER' ? 503 : 500;
      return sendJson(res, code, { error: err?.code || 'EXPORT_FAILED', message: err?.message || 'PNG export failed' });
    }
  }

  // --- API: Server Info (URLs, LAN IPs, live session counts & capacity, app version) ---
  if (pathname === '/api/info' && req.method === 'GET') {
    const ranked = getRankedNetworkInterfaces();
    const lanIps = getLanIps();
    const sessSnap = getSessionsSnapshot();
    return sendJson(res, 200, {
      version: APP_VERSION,
      schemaVersion: STATE_SCHEMA_VERSION,
      repo: GITHUB_REPO,
      canAutoRestart: true,
      port: PORT,
      uptimeSec: sessSnap.uptimeSec,
      overlayUrl: `http://localhost:${PORT}/`,
      vsOverlayUrl: `http://localhost:${PORT}/vs.html`,
      bracketsOverlayUrl: `http://localhost:${PORT}/brackets`,
      resultsOverlayUrl: `http://localhost:${PORT}/results.html`,
      top8OverlayUrl: `http://localhost:${PORT}/top8`,
      audioHubUrl: `http://localhost:${PORT}/audio.html`,
      panelUrl: `http://localhost:${PORT}/panel.html`,
      lanPanelUrls: lanIps.map(ip => `http://${ip}:${PORT}/panel.html`),
      networkInterfaces: ranked.map(n => ({
        name: n.name,
        ip: n.ip,
        kind: n.kind,
        url: `http://${n.ip}:${PORT}/panel.html`
      })),
      connectedClients: sessSnap.activeClients,
      maxClients: MAX_SSE_CLIENTS,
      sessionsBreakdown: sessSnap.breakdown
    });
  }

  // --- Static file serving (serves ONLY app/web/ and assets/; blocks /data/, /server/, dotfiles, /.git/, *.mjs & escapes!) ---
  let relPath =
    pathname === '/' ? '/index.html' :
      pathname === '/panel' ? '/panel.html' :
        pathname === '/vs' ? '/vs.html' :
          pathname === '/brackets' ? '/brackets.html' :
            pathname === '/audio' ? '/audio.html' :
              (pathname === '/results' || pathname === '/top8') ? '/results.html' : pathname;
  try {
    relPath = decodeURIComponent(relPath);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Bad URL');
  }
  if (relPath.includes('\0') || relPath.includes('..')) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }
  const safePath = path.normalize(relPath).replace(/^[/\\]+/, '');
  const segs = safePath.split(/[/\\]+/).filter(Boolean);
  const firstSeg = (segs[0] || '').toLowerCase();
  if (
    !safePath ||
    firstSeg === 'data' ||
    firstSeg === 'server' ||
    firstSeg === '.git' ||
    firstSeg === 'node_modules' ||
    segs.some(s => s.startsWith('.')) ||
    /\.mjs$/i.test(safePath)
  ) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }
  let resolvedBase;
  let fullPath;
  if (firstSeg === 'assets') {
    const assetRel = segs.slice(1).join(path.sep);
    if (!assetRel) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Forbidden');
    }
    resolvedBase = path.resolve(ASSETS_STATIC_DIR);
    fullPath = path.resolve(resolvedBase, assetRel);
  } else {
    resolvedBase = path.resolve(WEB_DIR);
    fullPath = path.resolve(resolvedBase, safePath);
  }

  if (!fullPath.startsWith(resolvedBase + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' || ext === '.js' || ext === '.css' ? 'no-cache' : 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer'
    });
    fs.createReadStream(fullPath).pipe(res);
  });
});

function startListening() {
  server.listen(PORT, HOST, () => {
    const ranked = getRankedNetworkInterfaces();
    const primaryLan = ranked.find(n => n.kind === 'lan') || ranked[0];
    console.log('\n=======================================================');
    console.log(`  FGC OPEN SCOREBARS v${APP_VERSION} — LOCAL SERVER RUNNING (0 deps)`);
    console.log('=======================================================');
    console.log(`  Scorebar Overlay (OBS):   http://localhost:${PORT}/`);
    console.log(`  VS Splash Overlay (OBS):  http://localhost:${PORT}/vs.html`);
    console.log(`  Results Overlay (OBS):    http://localhost:${PORT}/results.html`);
    console.log(`  Local Control Panel:      http://localhost:${PORT}/panel.html`);
    if (primaryLan) {
      console.log(`  Mobile / Tablet LAN UI:   http://${primaryLan.ip}:${PORT}/panel.html (${primaryLan.name})`);
    }
    console.log('=======================================================\n');
  });
}

if (process.env.FGC_NO_LISTEN !== '1') {
  const bootDelay = Math.max(0, Math.min(5000, Number(process.env.FGC_BOOT_DELAY_MS || 0) || 0));
  if (bootDelay > 0) setTimeout(startListening, bootDelay);
  else startListening();
}
