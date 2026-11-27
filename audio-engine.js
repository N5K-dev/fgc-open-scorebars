/**
 * FGC Open Scorebars — OBS-Safe Zero-Dependency Broadcast Audio & SFX Engine (Phase 5)
 * Shared by index.html (Scorebar), vs.html (VS Splash), results.html (Top 8 Results),
 * brackets.html (Brackets), audio.html (Dedicated Audio Hub), and panel.html (Control Panel).
 *
 * OBS-Safety Guarantees:
 *  1. Strict deduplication by monotonic server event ID (`seenIds` + 2.6s staleness cutoff)
 *     -> ZERO ghost sounds when reloading OBS Browser Sources or reconnecting SSE!
 *  2. Multi-source domain routing (`per-overlay` | `scorebar-hub` | `dedicated-hub`)
 *     -> ZERO double-echo even with 4 Browser Sources active simultaneously in OBS!
 *  3. Preview / Export iframe auto-mute (`?preview=`, `?export=1`, iframe detection)
 *     -> Panel Live Preview iframes never trigger duplicate audio!
 *  4. Resilient autoplay unlock + non-throwing Web Audio / HTMLAudio playback
 *     -> Rejected autoplay promises never affect visual rendering!
 */
(function (global) {
  'use strict';

  const STALENESS_MS = 2600;

  const BUILTIN_SFX = [
    { id: 'fgc-hit-punch',     name: 'FGC Impact Hit',         cat: 'score',   icon: '🥊', desc: 'Crisp layered fighting-game punch impact' },
    { id: 'arcade-coin',       name: 'Arcade Coin Chime',      cat: 'score',   icon: '🪙', desc: 'Classic retro 2-tone arcade point chime' },
    { id: 'tekken-electric',   name: 'Electric Spark (EWGF)',  cat: 'game',    icon: '⚡', desc: 'High-voltage electric burst & crackle' },
    { id: 'sf-drive-impact',   name: 'Drive Burst Impact',     cat: 'game',    icon: '💥', desc: 'Punchy resonant street-brawl impact snap' },
    { id: 'smash-ko-blast',    name: 'KO Star Blast',          cat: 'game',    icon: '🌟', desc: 'Upward arcade star-KO burst' },
    { id: 'score-tick-clean',  name: 'Broadcast Clean Tick',   cat: 'score',   icon: '🎯', desc: 'Subtle modern esports UI point click' },
    { id: 'score-minus-soft',  name: 'Soft Undo / Reset Drop', cat: 'score',   icon: '↩️', desc: 'Gentle downward pluck for -1 or reset' },
    { id: 'match-point-alarm', name: 'Match Point Sting',      cat: 'tension', icon: '🔥', desc: 'Urgent dual-pulse broadcast tension sting' },
    { id: 'match-start-gong',  name: 'Fight Start Gong',       cat: 'match',   icon: '🔔', desc: 'Resonant tournament gong + low boom' },
    { id: 'round-whoosh',      name: 'Round Change Whoosh',    cat: 'match',   icon: '💨', desc: 'Clean broadcast air transition + chime' },
    { id: 'vs-clash-sting',    name: 'VS Splash Steel Clash',  cat: 'splash',  icon: '⚔️', desc: 'Dramatic sub-drop + metallic blade clash' },
    { id: 'victory-fanfare',   name: 'Victory Fanfare',        cat: 'victory', icon: '🏆', desc: 'Triumphant 4-note major winner fanfare' },
    { id: 'champion-anthem',   name: 'Grand Champion Horn',    cat: 'victory', icon: '👑', desc: 'Rich harmonic brass swell for finals' },
    { id: 'swap-whoosh',       name: 'Side Swap Swoosh',       cat: 'match',   icon: '⇄', desc: 'Quick stereo sweep' },
    { id: 'top8-reveal-swell', name: 'Top 8 / Bracket Reveal', cat: 'splash',  icon: '✨', desc: 'Cinematic sub-riser + crystalline chord' },
    { id: 'airhorn-hype',      name: 'FGC Hype Horn',          cat: 'hype',    icon: '📣', desc: 'Stylized tournament hype brass blast' }
  ];

  const BUILTIN_PACKS = {
    'fgc-default': {
      name: 'FGC Broadcast Default',
      events: {
        point_scored: 'builtin:fgc-hit-punch',
        score_update: 'builtin:score-minus-soft',
        match_point: 'builtin:match-point-alarm',
        match_start: 'builtin:match-start-gong',
        victory: 'builtin:victory-fanfare',
        round_change: 'builtin:round-whoosh',
        vs_splash: 'builtin:vs-clash-sting',
        results_reveal: 'builtin:top8-reveal-swell'
      }
    },
    'tekken8': {
      name: 'Tekken 8 Electric',
      events: {
        point_scored: 'builtin:tekken-electric',
        score_update: 'builtin:score-minus-soft',
        match_point: 'builtin:match-point-alarm',
        match_start: 'builtin:vs-clash-sting',
        victory: 'builtin:champion-anthem',
        round_change: 'builtin:round-whoosh',
        vs_splash: 'builtin:tekken-electric',
        results_reveal: 'builtin:top8-reveal-swell'
      }
    },
    'sf6': {
      name: 'SF6 Drive Clash',
      events: {
        point_scored: 'builtin:sf-drive-impact',
        score_update: 'builtin:score-minus-soft',
        match_point: 'builtin:match-point-alarm',
        match_start: 'builtin:match-start-gong',
        victory: 'builtin:victory-fanfare',
        round_change: 'builtin:round-whoosh',
        vs_splash: 'builtin:sf-drive-impact',
        results_reveal: 'builtin:top8-reveal-swell'
      }
    },
    'ssbu': {
      name: 'Smash Arcade KO',
      events: {
        point_scored: 'builtin:smash-ko-blast',
        score_update: 'builtin:score-minus-soft',
        match_point: 'builtin:arcade-coin',
        match_start: 'builtin:match-start-gong',
        victory: 'builtin:victory-fanfare',
        round_change: 'builtin:swap-whoosh',
        vs_splash: 'builtin:vs-clash-sting',
        results_reveal: 'builtin:champion-anthem'
      }
    },
    'esports-clean': {
      name: 'Clean Major Broadcast',
      events: {
        point_scored: 'builtin:score-tick-clean',
        score_update: 'builtin:score-minus-soft',
        match_point: 'builtin:match-point-alarm',
        match_start: 'builtin:round-whoosh',
        victory: 'builtin:victory-fanfare',
        round_change: 'builtin:round-whoosh',
        vs_splash: 'builtin:top8-reveal-swell',
        results_reveal: 'builtin:top8-reveal-swell'
      }
    }
  };

  let role = 'scorebar';
  let isPreviewEnv = false;
  let audioCtx = null;
  let masterComp = null;
  let noiseBuffer = null;
  let currentAudioConfig = null;
  let currentThemeId = '';
  let customSfxList = [];
  const customSfxById = new Map();
  const decodedBuffers = new Map();
  const seenEventIds = new Set();
  const seenOrder = [];
  const lastEventTsByType = new Map();
  let lastPlayedInfo = null;
  const listeners = new Set();

  function detectPreviewEnv() {
    try {
      const qs = new URLSearchParams(global.location?.search || '');
      if (qs.has('preview') || qs.get('export') === '1' || qs.get('mute') === '1') return true;
      if (global.self !== global.top && role !== 'panel') return true;
    } catch {}
    return false;
  }

  function ensureContext() {
    if (audioCtx) return audioCtx;
    const Ctx = global.AudioContext || global.webkitAudioContext;
    if (!Ctx) return null;
    try {
      audioCtx = new Ctx();
      masterComp = audioCtx.createDynamicsCompressor();
      masterComp.threshold.value = -8;
      masterComp.knee.value = 12;
      masterComp.ratio.value = 6;
      masterComp.attack.value = 0.003;
      masterComp.release.value = 0.14;
      masterComp.connect(audioCtx.destination);
    } catch {
      audioCtx = null;
    }
    return audioCtx;
  }

  function getNoiseBuffer(ctx) {
    if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) return noiseBuffer;
    const len = Math.floor(ctx.sampleRate * 1.2);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    noiseBuffer = buf;
    return buf;
  }

  function notifyListeners() {
    const info = {
      status: getStatus(),
      role,
      isPreviewEnv,
      lastPlayed: lastPlayedInfo,
      customCount: customSfxList.length
    };
    for (const fn of listeners) {
      try { fn(info); } catch {}
    }
  }

  function getStatus() {
    if (!audioCtx) return (global.AudioContext || global.webkitAudioContext) ? 'idle' : 'unsupported';
    return audioCtx.state || 'idle';
  }

  async function unlock() {
    const ctx = ensureContext();
    if (!ctx) return 'unsupported';
    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      // Play 1-sample silent buffer to guarantee iOS/Chromium audio gate opens
      const silent = ctx.createBuffer(1, 1, ctx.sampleRate);
      const src = ctx.createBufferSource();
      src.buffer = silent;
      src.connect(masterComp || ctx.destination);
      src.start(0);
    } catch {}
    notifyListeners();
    return getStatus();
  }

  function attachAutoUnlock() {
    const tryUnlock = () => {
      unlock().then(st => {
        if (st === 'running') {
          global.removeEventListener('pointerdown', tryUnlock, true);
          global.removeEventListener('keydown', tryUnlock, true);
        }
      }).catch(() => {});
    };
    global.addEventListener('pointerdown', tryUnlock, { capture: true, passive: true });
    global.addEventListener('keydown', tryUnlock, { capture: true, passive: true });
    // OBS CEF allows autoplay immediately when "Control audio via OBS" is enabled
    if (global.obsstudio || role !== 'panel') {
      setTimeout(() => { unlock().catch(() => {}); }, 80);
    }
  }

  /* =========================================================================
     STUDIO-GRADE ZERO-DEPENDENCY WEB AUDIO FGC SYNTHESIZER (16 SFX)
     ========================================================================= */
  function synthBuiltin(soundId, gainLevel) {
    const ctx = ensureContext();
    if (!ctx) return false;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime + 0.005;
    const out = ctx.createGain();
    out.gain.setValueAtTime(Math.max(0, Math.min(1.5, gainLevel)), now);
    out.connect(masterComp || ctx.destination);

    const tone = (type, f0, f1, start, dur, amp = 0.4, pan = 0) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(Math.max(20, f0), now + start);
      if (f1 && f1 !== f0) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, f1), now + start + dur);
      }
      g.gain.setValueAtTime(0.0001, now + start);
      g.gain.linearRampToValueAtTime(amp, now + start + Math.min(0.012, dur * 0.25));
      g.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
      osc.connect(g);
      if (pan && ctx.createStereoPanner) {
        const p = ctx.createStereoPanner();
        p.pan.setValueAtTime(pan, now + start);
        g.connect(p);
        p.connect(out);
      } else {
        g.connect(out);
      }
      osc.start(now + start);
      osc.stop(now + start + dur + 0.02);
    };

    const noise = (start, dur, filterType, freq0, freq1, q = 1, amp = 0.3) => {
      const src = ctx.createBufferSource();
      src.buffer = getNoiseBuffer(ctx);
      const flt = ctx.createBiquadFilter();
      flt.type = filterType;
      flt.Q.value = q;
      flt.frequency.setValueAtTime(freq0, now + start);
      if (freq1 && freq1 !== freq0) {
        flt.frequency.exponentialRampToValueAtTime(Math.max(40, freq1), now + start + dur);
      }
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now + start);
      g.gain.linearRampToValueAtTime(amp, now + start + Math.min(0.01, dur * 0.2));
      g.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
      src.connect(flt);
      flt.connect(g);
      g.connect(out);
      src.start(now + start);
      src.stop(now + start + dur + 0.02);
    };

    switch (soundId) {
      case 'fgc-hit-punch':
        tone('sine', 195, 42, 0, 0.22, 0.72);
        tone('triangle', 520, 110, 0, 0.09, 0.38);
        noise(0, 0.14, 'bandpass', 1900, 520, 1.4, 0.42);
        break;
      case 'arcade-coin':
        tone('square', 987.77, 987.77, 0, 0.08, 0.24);
        tone('square', 1318.51, 1318.51, 0.075, 0.28, 0.28);
        tone('triangle', 2637.02, 2637.02, 0.075, 0.22, 0.14);
        break;
      case 'tekken-electric':
        tone('sawtooth', 1400, 190, 0, 0.24, 0.26);
        tone('sawtooth', 2100, 420, 0.02, 0.20, 0.20);
        tone('sine', 160, 45, 0, 0.26, 0.62);
        noise(0, 0.28, 'highpass', 3200, 1200, 2.2, 0.35);
        break;
      case 'sf-drive-impact':
        tone('sine', 130, 38, 0, 0.30, 0.78);
        tone('sawtooth', 320, 920, 0, 0.11, 0.25);
        tone('triangle', 880, 220, 0.04, 0.22, 0.30);
        noise(0, 0.22, 'bandpass', 1400, 2800, 1.8, 0.36);
        break;
      case 'smash-ko-blast':
        tone('triangle', 280, 1380, 0, 0.19, 0.36);
        tone('sine', 180, 52, 0.06, 0.28, 0.62);
        noise(0.05, 0.32, 'bandpass', 2400, 480, 1.2, 0.38);
        tone('sine', 1046.5, 1567.98, 0.16, 0.24, 0.22);
        break;
      case 'score-tick-clean':
        tone('sine', 880, 1320, 0, 0.075, 0.32);
        tone('triangle', 1760, 1760, 0.02, 0.08, 0.16);
        break;
      case 'score-minus-soft':
        tone('sine', 420, 210, 0, 0.14, 0.34);
        tone('triangle', 290, 160, 0.02, 0.12, 0.16);
        break;
      case 'match-point-alarm':
        tone('sawtooth', 587.33, 587.33, 0, 0.12, 0.24);
        tone('sawtooth', 880, 880, 0.14, 0.22, 0.28);
        tone('sine', 146.83, 73.42, 0, 0.42, 0.52);
        noise(0.14, 0.22, 'highpass', 2400, 900, 1.6, 0.18);
        break;
      case 'match-start-gong':
        tone('sine', 110, 52, 0, 0.72, 0.68);
        tone('triangle', 220, 214, 0, 0.85, 0.34);
        tone('sine', 330, 326, 0, 0.75, 0.24);
        tone('sine', 528, 520, 0, 0.62, 0.18);
        tone('sawtooth', 784, 760, 0, 0.38, 0.10);
        noise(0, 0.12, 'bandpass', 1800, 900, 1.2, 0.26);
        break;
      case 'round-whoosh':
        noise(0, 0.30, 'bandpass', 360, 2600, 2.0, 0.28);
        tone('sine', 523.25, 783.99, 0.06, 0.20, 0.22);
        break;
      case 'vs-clash-sting':
        tone('sine', 135, 36, 0, 0.56, 0.78);
        tone('sawtooth', 260, 520, 0, 0.16, 0.22);
        tone('triangle', 1240, 880, 0.04, 0.32, 0.24);
        tone('sine', 2480, 1980, 0.04, 0.26, 0.16);
        noise(0.02, 0.38, 'bandpass', 3400, 720, 1.5, 0.42);
        break;
      case 'victory-fanfare':
        tone('triangle', 523.25, 523.25, 0.00, 0.16, 0.34);
        tone('triangle', 659.25, 659.25, 0.11, 0.16, 0.34);
        tone('triangle', 783.99, 783.99, 0.22, 0.18, 0.36);
        tone('triangle', 1046.5, 1046.5, 0.34, 0.52, 0.42);
        tone('sine', 523.25, 523.25, 0.34, 0.52, 0.26);
        tone('sine', 261.63, 261.63, 0.34, 0.56, 0.32);
        break;
      case 'champion-anthem':
        tone('sawtooth', 261.63, 261.63, 0.00, 0.72, 0.16);
        tone('sawtooth', 392.00, 392.00, 0.06, 0.68, 0.16);
        tone('triangle', 523.25, 523.25, 0.14, 0.68, 0.28);
        tone('triangle', 659.25, 659.25, 0.22, 0.64, 0.26);
        tone('sine', 1046.50, 1046.50, 0.30, 0.62, 0.24);
        tone('sine', 130.81, 130.81, 0.00, 0.80, 0.46);
        break;
      case 'swap-whoosh':
        noise(0, 0.20, 'bandpass', 500, 2200, 2.2, 0.24);
        tone('sine', 420, 680, 0, 0.15, 0.22, -0.5);
        tone('sine', 680, 420, 0.06, 0.15, 0.22, 0.5);
        break;
      case 'top8-reveal-swell':
        tone('sine', 95, 42, 0, 0.55, 0.66);
        noise(0, 0.44, 'bandpass', 420, 2200, 1.8, 0.22);
        tone('sine', 587.33, 587.33, 0.14, 0.48, 0.22);
        tone('sine', 880.00, 880.00, 0.20, 0.46, 0.22);
        tone('triangle', 1174.66, 1174.66, 0.26, 0.50, 0.20);
        break;
      case 'airhorn-hype':
        for (const t0 of [0, 0.15, 0.30]) {
          const d = t0 === 0.30 ? 0.36 : 0.11;
          tone('sawtooth', 466.16, 472, t0, d, 0.17);
          tone('sawtooth', 587.33, 592, t0, d, 0.16);
          tone('sawtooth', 739.99, 745, t0, d, 0.13);
        }
        break;
      default:
        tone('sine', 660, 880, 0, 0.12, 0.28);
        break;
    }
    return true;
  }

  async function playCustomFile(id, gainLevel) {
    const entry = customSfxById.get(id);
    if (!entry || !entry.url) return false;

    const ctx = ensureContext();
    if (ctx) {
      try {
        if (ctx.state === 'suspended') {
          await ctx.resume().catch(() => {});
        }
        let buf = decodedBuffers.get(id);
        if (!buf) {
          const res = await fetch(entry.url, { cache: 'force-cache' });
          if (!res.ok) throw new Error('HTTP ' + res.status);
          const arr = await res.arrayBuffer();
          buf = await ctx.decodeAudioData(arr.slice(0));
          decodedBuffers.set(id, buf);
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const g = ctx.createGain();
        g.gain.value = Math.max(0, Math.min(1.5, gainLevel));
        src.connect(g);
        g.connect(masterComp || ctx.destination);
        src.start(0);
        return true;
      } catch {
        // Fallback cleanly to HTMLAudioElement if Web Audio decode isn't supported for codec
      }
    }

    try {
      const el = new Audio(entry.url);
      el.volume = Math.max(0, Math.min(1, gainLevel));
      el.crossOrigin = 'anonymous';
      await el.play();
      return true;
    } catch {
      return false;
    }
  }

  async function playSoundRef(soundRef, gainLevel) {
    const ref = String(soundRef || '').trim();
    if (!ref || ref === 'none' || gainLevel <= 0.001) return false;
    if (ref.startsWith('builtin:')) {
      return synthBuiltin(ref.slice('builtin:'.length), gainLevel);
    }
    if (ref.startsWith('custom:')) {
      return playCustomFile(ref.slice('custom:'.length), gainLevel);
    }
    return false;
  }

  function resolveSoundForEvent(ev) {
    const cfg = currentAudioConfig || {};
    const eventType = ev.eventType || 'point_scored';
    const evCfg = cfg.events?.[eventType] || { enabled: true, sound: '', volume: 90 };

    // Explicit manual override (e.g. Soundboard pad / Test button)
    if (ev.soundOverride) {
      const v = ev.volumeOverride !== null && ev.volumeOverride !== undefined ? ev.volumeOverride : 95;
      return { enabled: true, sound: ev.soundOverride, volume: v };
    }

    if (!ev.manual && evCfg.enabled === false) {
      return { enabled: false, sound: '', volume: 0 };
    }

    let chosenSound = evCfg.sound || '';

    // Priority 2: Per-Preset override (active Scorebar theme)
    const tid = ev.presetId || currentThemeId || '';
    const presetOv = tid ? cfg.perPreset?.[tid]?.[eventType] : '';
    if (presetOv) chosenSound = presetOv;

    // Priority 1: Per-Player override (by Player Name first, then by P1/P2 slot)
    if (eventType === 'point_scored' || eventType === 'match_point' || eventType === 'victory') {
      const pNameKey = String(ev.playerName || '').trim().toLowerCase();
      const nameOv = pNameKey ? cfg.perPlayer?.byName?.[pNameKey]?.[eventType] : '';
      const slotOv = (ev.side === 'p1' || ev.side === 'p2') ? cfg.perPlayer?.[ev.side]?.[eventType] : '';
      if (nameOv) chosenSound = nameOv;
      else if (slotOv) chosenSound = slotOv;
    }

    if (!chosenSound || chosenSound === 'none') {
      return { enabled: false, sound: '', volume: 0 };
    }
    return {
      enabled: true,
      sound: chosenSound,
      volume: Number(evCfg.volume ?? 90)
    };
  }

  function shouldRouteHere(ev) {
    if (role === 'panel') return false; // Panel never auto-plays live SSE events (avoids double audio with OBS!)
    const cfg = currentAudioConfig || {};
    if (isPreviewEnv && cfg.muteInPreview !== false) return false;

    const mode = cfg.routingMode || 'per-overlay';
    const target = ev.target || 'scorebar';

    if (mode === 'dedicated-hub') {
      return role === 'audio-hub';
    }
    if (mode === 'scorebar-hub') {
      return role === 'scorebar';
    }
    // Default: 'per-overlay' — each Browser Source plays ONLY its own domain!
    if (target === 'all') return role === 'scorebar';
    return role === target;
  }

  function markSeen(id) {
    if (!id) return false;
    if (seenEventIds.has(id)) return false;
    seenEventIds.add(id);
    seenOrder.push(id);
    if (seenOrder.length > 240) {
      const old = seenOrder.shift();
      seenEventIds.delete(old);
    }
    return true;
  }

  async function handleAudioEvent(ev) {
    if (!ev || typeof ev !== 'object') return false;
    if (!markSeen(ev.id)) return false;

    // Reject stale events (e.g. delayed reconnect / cached buffer replay)
    if (ev.ts && Math.abs(Date.now() - Number(ev.ts)) > STALENESS_MS) return false;

    const cfg = currentAudioConfig || {};
    if (!ev.manual && (cfg.enabled === false || cfg.muted === true)) return false;
    if (!shouldRouteHere(ev)) return false;

    // Cooldown anti-spam guard for rapid automated triggers
    const cd = Math.max(0, Number(cfg.cooldownMs ?? 120));
    if (!ev.manual && cd > 0) {
      const prevTs = lastEventTsByType.get(ev.eventType) || 0;
      if (Date.now() - prevTs < cd) return false;
      lastEventTsByType.set(ev.eventType, Date.now());
    }

    const resolved = resolveSoundForEvent(ev);
    if (!resolved.enabled || !resolved.sound) return false;

    const masterVol = Math.max(0, Math.min(100, Number(cfg.masterVolume ?? 80))) / 100;
    const evVol = Math.max(0, Math.min(150, Number(resolved.volume ?? 90))) / 100;
    const finalGain = masterVol * evVol;

    const ok = await playSoundRef(resolved.sound, finalGain);
    lastPlayedInfo = {
      id: ev.id,
      eventType: ev.eventType,
      sound: resolved.sound,
      ts: Date.now(),
      ok
    };
    notifyListeners();
    return ok;
  }

  /** Local audition preview inside Control Panel (always audible regardless of role/preview) */
  async function previewSound(soundRef, eventVolume = 90) {
    await unlock();
    const cfg = currentAudioConfig || {};
    const masterVol = Math.max(0, Math.min(100, Number(cfg.masterVolume ?? 80))) / 100;
    const evVol = Math.max(0, Math.min(150, Number(eventVolume ?? 90))) / 100;
    const ok = await playSoundRef(soundRef, Math.max(0.08, masterVol * evVol));
    lastPlayedInfo = { id: 'preview', eventType: 'preview', sound: soundRef, ts: Date.now(), ok };
    notifyListeners();
    return ok;
  }

  function syncState(state) {
    if (!state || typeof state !== 'object') return;
    if (state.audio && typeof state.audio === 'object') {
      currentAudioConfig = state.audio;
    }
    if (state.theme) {
      currentThemeId = String(state.theme);
    }
  }

  function setCustomSfx(list) {
    customSfxList = Array.isArray(list) ? list : [];
    customSfxById.clear();
    const validIds = new Set();
    for (const item of customSfxList) {
      if (!item || !item.id) continue;
      validIds.add(item.id);
      customSfxById.set(item.id, {
        ...item,
        ref: item.ref || `custom:${item.id}`,
        url: item.url || `/media/sfx/${encodeURIComponent(item.file || '')}`
      });
    }
    for (const k of decodedBuffers.keys()) {
      if (!validIds.has(k)) decodedBuffers.delete(k);
    }
    notifyListeners();
  }

  async function fetchSfxLibrary() {
    try {
      const res = await fetch('/api/sfx', { cache: 'no-store' });
      if (!res.ok) return customSfxList;
      const data = await res.json();
      setCustomSfx(Array.isArray(data?.custom) ? data.custom : (Array.isArray(data) ? data : []));
      return customSfxList;
    } catch {
      return customSfxList;
    }
  }

  function init(opts = {}) {
    if (opts.role) role = String(opts.role);
    isPreviewEnv = opts.isPreview !== undefined ? Boolean(opts.isPreview) : detectPreviewEnv();
    attachAutoUnlock();
    if (global.location?.protocol === 'http:' || global.location?.protocol === 'https:') {
      fetchSfxLibrary().catch(() => {});
    }
    return api;
  }

  const api = {
    BUILTIN_SFX,
    BUILTIN_PACKS,
    init,
    unlock,
    getStatus,
    syncState,
    setCustomSfx,
    getCustomSfx: () => customSfxList,
    fetchSfxLibrary,
    handleAudioEvent,
    previewSound,
    getLastPlayed: () => lastPlayedInfo,
    isPreviewEnv: () => isPreviewEnv,
    getRole: () => role,
    onChange: (fn) => {
      if (typeof fn === 'function') listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };

  global.FGC_AUDIO = api;
})(typeof window !== 'undefined' ? window : globalThis);
