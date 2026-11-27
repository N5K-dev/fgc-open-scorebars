<p align="center">
  <img src="assets/brand/fgc-open-scorebars-banner.svg" alt="FGC Open Scorebars — Broadcast-Grade Overlays Built Open for the FGC" width="100%" />
</p>

# FGC Open Scorebars — Broadcast Suite for the FGC

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B%20Zero%20Dependencies-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![OBS Ready](https://img.shields.io/badge/OBS%20Studio-1920x1080%20Browser%20Source-302E31?logo=obsstudio&logoColor=white)](https://obsproject.com/)
[![Start.gg & Challonge](https://img.shields.io/badge/Tournaments-Start.gg%20%2B%20Challonge-7C3AED)](#tournament-integration-startgg--challonge)
[![Bilingual EN / ES](https://img.shields.io/badge/UI-English%20%7C%20Espa%C3%B1ol-0EA5E9)](#key-highlights)
[![Ko-fi Support](https://img.shields.io/badge/Ko--fi-Optional%20Tip-FF5E5B?logo=ko-fi&logoColor=white)](https://ko-fi.com/nordi5ke)

A **100% free, open-source, zero-dependency** local OBS broadcast suite crafted for the Fighting Game Community (FGC) — supporting **Tekken 8**, **Street Fighter 6**, **Super Smash Bros. Ultimate** (Singles & Doubles 2v2), **2XKO**, **Fatal Fury: City of the Wolves**, **Avatar Legends**, **Mortal Kombat 1**, and **240+ fighting game character packs**.

Built on pure HTML/CSS/JS and a lightweight native Node.js HTTP/SSE server (~15–45 MB RAM, `<5 ms` latency) — **no cloud accounts, no paywalls, no subscriptions, no Electron bloat, and no `npm install` required**.

<p align="center">
  <img src="docs/media/showcase-hero.gif" alt="FGC Open Scorebars — Live Scorebars, VS Splash, Brackets & Top 8 Results Showcase" width="100%" />
</p>

---

## Visual Showcase & Live Demos

### 1. Live Broadcast Scorebars (HUD-Calibrated Across 6+ FGC Games)

<p align="center">
  <img src="docs/media/demo-scorebars.gif" alt="Live Broadcast Scorebars Demo" width="88%" />
</p>

| Tekken 8 Native HUD (0 px Overlap) | TWT 2026 Blade · Flag Fade Studio |
| :---: | :---: |
| ![Tekken 8 Native HUD](docs/media/scorebar-tekken8-native.jpg) | ![TWT 2026 Blade Flag Fade](docs/media/scorebar-tekken8-twt.jpg) |
| **SF6 Native Drive HUD** | **SF6 Broadcast White Studio** |
| ![SF6 Native Drive HUD](docs/media/scorebar-sf6-drive.jpg) | ![SF6 Broadcast White Studio](docs/media/scorebar-sf6-white.jpg) |

### 2. Interactive Full-Screen VS Splash & Matchups 2×2 Board (48+ Designs · 240+ Game Packs)

<p align="center">
  <img src="docs/media/demo-vs-splash.gif" alt="Interactive VS Match Splash Demo" width="88%" />
</p>

| Mishima EWGF (Animated Vertical Divider) | Tekken 8 Clash | Arcade Pop |
| :---: | :---: | :---: |
| ![VS Splash Mishima EWGF](docs/media/vs-splash-mishima.jpg) | ![VS Splash T8 Clash](docs/media/vs-splash-clash.jpg) | ![VS Splash Arcade Pop](docs/media/vs-splash-arcade.jpg) |

### 3. Tournament Top 8 / Top 12 Results, Vector Card Shapes & Live Brackets (`16:9` & `4:5` PNG Export)

<p align="center">
  <img src="docs/media/demo-top8-results.gif" alt="Top 8 Results & Podiums Demo" width="88%" />
</p>

| Champion Left Top 8 (`EVO Gold`) | Grand Top 3 Podium | Champion Spotlight + 8-Row Ladder |
| :---: | :---: | :---: |
| ![Top 8 Results EVO Gold](docs/media/top8-evo-gold.jpg) | ![Top 3 Podium](docs/media/top3-podium.jpg) | ![Top 8 Ladder](docs/media/top8-ladder.jpg) |

---

## Key Highlights

- **Multi-Game HUD-Calibrated Scorebars (`index.html`, `sf6-themes.js`, `game-presets.js`):**
  - **87 built-in designs across 7 games:** **Tekken 8** (33 designs, including **🥊 PBRD Kazuya Fists** framing all 3 in-game round orbs), **Street Fighter 6** (24 designs with verified clearance around Drive Gauges, Control Type badges & Round Diamonds), **Super Smash Bros. Ultimate** (10 designs — Major, Pill Compact, Apex Slant, Kagaribi Light & Aurora Glass in Singles 1v1 and Doubles 2v2, Stock Icons, Stage icon, Seed & Pronouns), **2XKO** (7 designs — 1v1/2v2 Duo + 2 Champions + Fuse icons), **Avatar Legends** (5 designs — Native Filigree Scroll & elemental styles), **Mortal Kombat 1** (5 designs — Native HUD, Klassic Arcade, Chaosrealm, Lin Kuei & Shirai Ryu), and **Fatal Fury: City of the Wolves** (2 designs — safe clock/diamond clearance + Arcade/Smart control style).
- **VS Match Splash & Matchups 2×2 Board (`vs.html` & `vs-designs.js`):**
  - Full-screen **1v1 VS / "Up Next"** studio + **Top 8 Matchups 2×2** board (Winners + Losers synced straight from your bracket or manually customized per player, global & individual X/Y/Zoom drag framing, auto random fighter fill, **240+ fighting game character packs** via `StreamHelperAssets`, and **1920×1080 PNG export**).
- **Unified Top 8 / Top 12 Results + Vector Card Shapes & Border FX (`results.html`, `results-designs.js`, `res-card-engine.js`):**
  - **32 broadcast designs** across **12 layouts** (`16:9` horizontal & `4:5` vertical `1080×1350`, Top 8 & Top 12 / 9th, secondary/pocket characters, seeds, direct portrait drag/wheel framing, and pixel-perfect **1:1 WYSIWYG PNG export**).
  - **Precision SVG Vector Card Engine (`res-card-engine.js`):** 12 broadcast card shapes (**Global** AND **Individual Per-Player** 1st–12th), 8 continuous contour border styles (Solid, Double Frame, HUD Corner Brackets, Dashed, Metallic Gradient, Neon Core, Heavy Rails, Borderless), 6 border FX (Halo, Neon Pulse, Shimmer, Animated Energy Trace), adjustable border width, bevel cut size, custom color, and mathematical safe insets so badges and names never clip.
- **Dedicated Live Brackets & Pools Overlay (`brackets.html`, `brackets-designs.js`, `brackets-engine.js`, `top8-engine.js`):**
  - **Top 8 Double Elimination** (with automatic/manual **Grand Final Reset**), **Pools / Groups Progress**, **Single Pool Bracket Tree**, and **Top 16 Standings Table** — live-synced with Start.gg & Challonge plus non-destructive manual slot overrides.
- **OBS-Safe Broadcast Audio & Custom SFX System (`audio-engine.js`, `sfx-manager.mjs`, `audio.html`, `panel-audio.js`):**
  - **16 built-in offline Web Audio FGC SFX**, persistent custom **`.mp3` / `.wav` / `.ogg` / `.m4a` / `.webm`** uploads (magic-byte validated, HTTP `206` byte-range streamed), 8 auto-detected live broadcast events (Point Scored, Match Point, Victory, Round Change, VS Splash, Top 8 Reveal, etc.), Per-Preset packs, Per-Player signature sounds, Soundboard, preview auto-mute, strict monotonic deduplication, and 3 OBS audio routing modes (`per-overlay`, `scorebar-hub`, or single-mixer **`/audio.html` Dedicated Audio Hub**).
- **World & Regional Flag System On-Demand (`flags-manager.mjs`, `flags.js`, `flags-world-index.json`):**
  - **252 World Countries + 3,148 Regional / State / Province / Prefecture flags** across all 7 continents — filterable by continent, country, or region, downloaded on-demand or in 1-click offline packs cached locally in `data/flags/` (zero CORS taint in OBS & PNG export).
- **Native Start.gg (GraphQL v4) & Challonge (API v1) Integration + Seeding (`tournaments.mjs`):**
  - Strictly isolated multi-provider state (connecting Start.gg, Challonge, and Demo never overwrites another provider's data), 1-click **Clear Tournament**, full **Seeding & Phases** (`initialSeedNum` & phase seeds), Stream Queue, entrant/avatar import, side-swap-aware result reporting, **Match History & H2H**, and a **64-entrant multi-game Offline Demo Tournament**.
- **Universal "My Presets & Tournament Packs" (`panel-presets.js`) + Factory-Default Preset Switching:**
  - Save individual presets or full multi-module Tournament Broadcast Packs (Scorebar + VS Splash + Brackets + Results), and switch between built-in designs with clean factory-default resets (zero leftover overrides from previous presets, preserving all live match/player data).
- **Global Custom PC Fonts (`custom-fonts.js`) & Clickable Local Server / Live Sessions Monitor (`panel-sessions.js`):**
  - Upload `.ttf`/`.otf`/`.woff`/`.woff2` or use installed PC fonts globally across all overlays.
  - Click **`● Local Server OK · X overlay(s)`** in the header anytime to inspect live server health, active OBS/browser/LAN SSE sessions, disconnect stale sessions, and see session limits (`64` server cap + explanation of browser HTTP/1.1 6-tab leader sharing vs OBS CEF).
- **Security-First & Data-Safe Architecture:**
  - Atomic `state.json` persistence with automatic `.bak` crash recovery & non-destructive schema migration (`v1 → v2`), strict path-traversal & `.mjs`/dotfile static blocks, SSRF redirect validation, magic-byte validation on image/font/audio uploads, SVG script sanitization + CSP sandbox headers, RAM-only API tokens by default, and a **1-Click Data-Safe GitHub Auto-Updater**.

---

## Quick Start

> **Clean fresh install out of the box:** this repository contains **no preloaded API tokens, no personal players, and no match history**. On first launch, `server.mjs` automatically creates a fresh local `data/` directory on your machine (gitignored).

### Requirements
- **Node.js 18+** (recommended Node.js 20 / 22 / 24 LTS). **Zero npm packages required.**

### Windows (1-Click Launch)
1. Double-click **`Start_Scorebar.bat`**.
   - If Node.js is not installed on the PC, the launcher automatically offers to run **`Install_NodeJS.bat`** (uses `winget` with an automatic direct MSI fallback from `nodejs.org`).
2. Your browser opens the Control Panel at `http://localhost:8787/panel.html`.
3. Keep the terminal window open during your broadcast.

### macOS / Linux / Terminal
```bash
node server.mjs
```
- **Scorebar Overlay (OBS Browser Source):** `http://localhost:8787/`
- **VS Match Splash / Matchups 2×2 (OBS Browser Source):** `http://localhost:8787/vs.html`
- **Brackets & Pools Overlay (OBS Browser Source):** `http://localhost:8787/brackets`
- **Top 8 / Top 12 Results Overlay (OBS Browser Source):** `http://localhost:8787/results.html`
- **Dedicated Audio & SFX Hub (Optional Single OBS Mixer Channel):** `http://localhost:8787/audio.html`
- **Control Panel & OBS Custom Dock:** `http://localhost:8787/panel.html`

> Customize the port with `PORT=9090 node server.mjs`.

---

## OBS Studio Setup

### 1. Add Overlays (`Browser Source`)
1. In OBS Studio, add a **Browser** source for each overlay you need (`/`, `/vs.html`, `/brackets`, `/results.html`, and optionally `/audio.html`).
2. Set **Width** to `1920` and **Height** to `1080` (or `1080 × 1350` for `4:5` vertical Results).
3. Leave **Custom CSS** empty.
4. **Recommended for zero-flicker scene transitions & audio:**
   - Uncheck *"Refresh browser when scene becomes active"*.
   - Set **Page permissions** to *"Read access to OBS status information"*.
   - Check *"Control audio via OBS"* if using live SFX in that source (or route all SFX cleanly through a single `/audio.html` Browser Source).

### 2. Optional: Dock the Control Panel Inside OBS
1. In OBS Studio, go to **Docks → Custom Browser Docks…**
2. Name it `FGC Scorebar` and set the URL to `http://localhost:8787/panel.html`.
3. The panel automatically adapts to narrow dock widths (`<= 1320px`).

---

## Tournament Integration (Start.gg & Challonge)

All API tokens stay **strictly local** (RAM-only by default, with optional local persistence in gitignored `data/integrations.json`) and are never displayed back in the UI so they cannot leak on stream. Start.gg, Challonge, and Demo snapshots stay strictly isolated so loading two providers never clobbers each other.

### Start.gg
1. Generate a free Personal Access Token at [start.gg/admin/profile/developer](https://start.gg/admin/profile/developer).
2. Open the **Tournaments** tab, paste your tournament or event URL/slug and token, and click **Connect**.
3. Load sets from **Stream Queue** or **Active / Open**, browse **Seeding & Phases**, sync **Top 8 Bracket / Pools / Final Results**, import entrants + flags, and report final scores back to the bracket (side-swap-aware).

### Challonge
1. Copy your free API key from [challonge.com/settings/developer](https://challonge.com/settings/developer).
2. Paste your tournament URL (`challonge.com/slug` or `subdomain.challonge.com/slug`) and API key, then click **Connect**.
3. Supports **Live Score Sync**, **Report Result**, **Top 8 Bracket**, and **Final Standings**.

### Offline 64-Entrant Multi-Game Demo Mode
Select **Demo Tournament (No Token)**, pick any fighting game configuration (Tekken 8, SSBU, SF6, 2XKO, Fatal Fury CotW, GGST, Avatar Legends, etc.), and click **Connect** to test Stream Queue, Seeding, Brackets, Matchups 2×2, Top 8 Results, and H2H completely offline.

---

## Keyboard Shortcuts

Available whenever the Control Panel window or OBS Dock has focus:

| Shortcut | Action |
| :--- | :--- |
| `Alt + 1` / `Alt + Shift + 1` | `+1` / `-1` Point for Player 1 |
| `Alt + 2` / `Alt + Shift + 2` | `+1` / `-1` Point for Player 2 |
| `Alt + S` | Swap Sides (`P1 ⇄ P2`, auto-adjusts active bracket reporting) |
| `Alt + R` | Reset Score to `0 - 0` |
| `Alt + H` | Smoothly Show / Hide Overlay |
| `Alt + E` | Replay Live Scene Entry Transition in OBS |

---

## Project Structure

| File | Purpose |
| :--- | :--- |
| [`index.html`](index.html) / [`game-scorebars.css`](game-scorebars.css) / [`preset-art.js`](preset-art.js) | `1920×1080` OBS Scorebar overlay across Tekken 8, SF6, 2XKO, Fatal Fury CotW, SSBU (Singles & Doubles 2v2), and Avatar Legends. |
| [`vs.html`](vs.html) / [`vs-designs.js`](vs-designs.js) | `1920×1080` VS Match Splash & Matchups 2×2 Board overlay (48+ designs, character renders, avatars, H2H, 1080p PNG export). |
| [`brackets.html`](brackets.html) / [`brackets-designs.js`](brackets-designs.js) / [`brackets-engine.js`](brackets-engine.js) / [`top8-engine.js`](top8-engine.js) | Dedicated `1920×1080` Top 8 Double Elimination Bracket, Pools/Groups, Pool Tree & Top 16 Table overlay with Start.gg/Challonge sync & manual overrides. |
| [`results.html`](results.html) / [`results-designs.js`](results-designs.js) / [`res-card-engine.js`](res-card-engine.js) / [`top8-unified.css`](top8-unified.css) | `16:9` & `4:5` Top 8 / Top 12 Final Results overlay with precision SVG vector card shapes, continuous borders, contour FX, and 1:1 PNG export. |
| [`audio.html`](audio.html) / [`audio-engine.js`](audio-engine.js) / [`sfx-manager.mjs`](sfx-manager.mjs) / [`panel-audio.js`](panel-audio.js) | OBS-safe Broadcast Audio & Custom SFX system (16 Web Audio SFX, persistent `.mp3/.wav/.ogg/.m4a/.webm` uploads, HTTP 206 streaming, single-channel Audio Hub). |
| [`panel.html`](panel.html) / [`panel.css`](panel.css) / [`panel-app.js`](panel-app.js) / [`panel-presets.js`](panel-presets.js) / [`panel-sessions.js`](panel-sessions.js) | Broadcast Control Panel, Universal Presets & Packs manager, and clickable Local Server & Live Sessions diagnostic monitor. |
| [`server.mjs`](server.mjs) / [`export-png.mjs`](export-png.mjs) | Zero-dependency Node.js HTTP/SSE server with atomic JSON persistence + `.bak` recovery, schema migration, hardened upload/static security, and CDP 1:1 PNG capture. |
| [`assets.mjs`](assets.mjs) / [`flags-manager.mjs`](flags-manager.mjs) / [`flags.js`](flags.js) / [`flags-world-index.json`](flags-world-index.json) | On-demand character render cache (`StreamHelperAssets`, 240+ games) + 252 country & 3,148 regional flag downloader/cache. |
| [`tournaments.mjs`](tournaments.mjs) | Native Start.gg GraphQL v4 client, Challonge REST API v1 client, Seeding & Pools fetcher, flag resolver, and 64-entrant multi-game Demo generator. |
| [`sf6-themes.js`](sf6-themes.js) / [`game-presets.js`](game-presets.js) / [`i18n.js`](i18n.js) / [`qr.js`](qr.js) / [`custom-fonts.js`](custom-fonts.js) | Game preset catalogs, bilingual EN/ES engine, offline QR LAN remote generator, and global PC font loader. |
| [`Start_Scorebar.bat`](Start_Scorebar.bat) / [`Install_NodeJS.bat`](Install_NodeJS.bat) | 1-click Windows launcher (with auto-restart loop on exit code `42`) and standalone Node.js LTS installer. |

> Runtime state (`state.json` + automatic `state.json.bak`), saved players, custom presets, SFX clips, custom fonts, cached renders/flags, match history, and optional tokens live exclusively inside `data/` (created automatically at runtime and ignored by Git).

---

## Local HTTP / SSE API

All controls run over clean local JSON/SSE endpoints — ready for Stream Deck, Bitfocus Companion, or custom tournament automation:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/state` | `GET` / `POST` | Read or patch live overlay state (atomic `.bak` save + instant SSE broadcast + audio event detection). |
| `/api/events` | `GET` (SSE) | Real-time `state`, `fonts`, `sfx`, `audio`, and `sessions` stream (`?client=scorebar\|vs\|results\|brackets\|audio\|panel`, capped at `64` sessions). |
| `/api/sessions` | `GET` | Live diagnostics: active SSE sessions, source breakdown (OBS / Browser / LAN), server uptime, RAM, and capacity (`X / 64`). |
| `/api/sessions/disconnect` | `POST` | Disconnect a specific SSE session by `{ id }` or prune dead sockets (`{ action: 'prune' }`). |
| `/api/info` | `GET` | App & schema version, port, overlay URLs, LAN IPs, and session breakdown. |
| `/api/export/png` | `POST` | Pixel-perfect 1:1 WYSIWYG PNG export for `results` (`16:9` / `4:5`), `vs` (`1v1` / `2×2`), or `brackets`. |
| `/api/sfx` / `/api/audio/trigger` | `GET` / `POST` | List/upload/rename/delete custom SFX clips (`.mp3/.wav/.ogg/.m4a/.webm`) and trigger live Soundboard SFX. |
| `/api/flags/catalog` / `/api/flags/img` | `GET` | Full world & regional flag catalog + on-demand local flag image cache (`data/flags/`). |
| `/api/flags/download-pack` / `download-status` | `POST` / `GET` | Bulk download country, continent, or regional flag packs for 100% offline use. |
| `/api/assets/games` / `roster` / `render` | `GET` | List 240+ fighting games, character rosters/eyesights, and on-demand cached renders (`stock`, `variant`, `stage` icons included). |
| `/api/assets/download-pack` / `download-status` | `POST` / `GET` | Pre-download an entire game/pack character render set for offline events. |
| `/api/tournament/connect` / `status` / `clear` / `set-active` | `GET` / `POST` | Isolated multi-provider tournament connection, active provider switching, and 1-click tournament clearing. |
| `/api/tournament/sets` / `seeding` / `bracket` / `pools` / `standings` / `report` | `POST` | Fetch sets, phase seeding, 11-slot Top 8 Double-Elimination bracket, pools, final standings, and report match results. |
| `/api/players` / `/api/presets` / `/api/fonts` / `/api/history` / `/api/integrations` | `GET` / `POST` | Local player DB, universal presets & packs, custom PC fonts, match history/H2H, and masked integration config. |
| `/api/upload` | `POST` | Upload local Player Avatar, Tournament Logo, or Custom Character PNG/JPG/WebP/SVG (magic-byte verified & SVG-sanitized). |
| `/api/update/check` / `apply` / `restart` | `GET` / `POST` | GitHub Release version check, data-safe 1-click updater (never touches `data/`), and clean restart. |

---

## Creator, Community & Optional Support

Created with love for the Fighting Game Community by **Nordi5ke** ([N5K-dev](https://github.com/N5K-dev)).

**FGC Open Scorebars is and will always remain 100% free & open-source** — zero paywalls, zero subscriptions, and zero locked features. If this tool helped power your local, weekly, major, or stream and you would like to leave an optional tip to support future updates, feel free to buy a coffee on Ko-fi!

[![X / Twitter](https://img.shields.io/badge/X-@Nordi5ke-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Nordi5ke)
[![YouTube](https://img.shields.io/badge/YouTube-@nordi5ke-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@nordi5ke)
[![Twitch](https://img.shields.io/badge/Twitch-Nordi5ke-9146FF?style=for-the-badge&logo=twitch&logoColor=white)](https://www.twitch.tv/nordi5ke)
[![GitHub](https://img.shields.io/badge/GitHub-N5K--dev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/N5K-dev)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support%20(Optional)-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/nordi5ke)

---

## License

Released under the [MIT License](LICENSE). Free for personal streams, local weeklies, community majors, and custom forks.
