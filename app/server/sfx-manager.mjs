/**
 * FGC Open Scorebars — Zero-Dependency SFX Library & OBS-Safe Audio Event Manager (Phase 5)
 * - Persistent custom audio uploads (.mp3, .wav, .ogg, .m4a, .webm) in data/sfx/
 * - Magic-byte + extension + size validation (zero path traversal, max 6 MB per clip)
 * - Byte-range HTTP streaming (206 Partial Content) for crisp OBS Chromium <audio> playback
 * - Monotonic, deduplicated server-side audio event detection from live scoreboard transitions
 */
import fs from 'node:fs';
import path from 'node:path';

export const AUDIO_EVENT_TYPES = [
  'point_scored',
  'score_update',
  'match_point',
  'match_start',
  'victory',
  'round_change',
  'vs_splash',
  'results_reveal'
];

export const DEFAULT_AUDIO_STATE = {
  enabled: true,
  muted: false,
  masterVolume: 80,
  muteInPreview: true,
  routingMode: 'per-overlay', // 'per-overlay' | 'scorebar-hub' | 'dedicated-hub'
  cooldownMs: 120,
  events: {
    point_scored:   { enabled: true,  sound: 'builtin:fgc-hit-punch',     volume: 90 },
    score_update:   { enabled: true,  sound: 'builtin:score-minus-soft',  volume: 65 },
    match_point:    { enabled: true,  sound: 'builtin:match-point-alarm', volume: 95 },
    match_start:    { enabled: true,  sound: 'builtin:match-start-gong',  volume: 85 },
    victory:        { enabled: true,  sound: 'builtin:victory-fanfare',   volume: 100 },
    round_change:   { enabled: true,  sound: 'builtin:round-whoosh',      volume: 75 },
    vs_splash:      { enabled: true,  sound: 'builtin:vs-clash-sting',    volume: 90 },
    results_reveal: { enabled: true,  sound: 'builtin:top8-reveal-swell', volume: 90 }
  },
  perPlayer: {
    p1: { point_scored: '', match_point: '', victory: '' },
    p2: { point_scored: '', match_point: '', victory: '' },
    byName: {}
  },
  perPreset: {}
};

const ALLOWED_AUDIO_EXTS = {
  '.mp3':  'audio/mpeg',
  '.wav':  'audio/wav',
  '.ogg':  'audio/ogg',
  '.m4a':  'audio/mp4',
  '.webm': 'audio/webm'
};

const MAX_SFX_BYTES = 6 * 1024 * 1024; // 6 MB per custom audio clip

function clampNum(v, min, max, fallback) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function cleanSoundRef(val) {
  const s = String(val || '').trim();
  if (!s) return '';
  if (s === 'none') return 'none';
  if (/^(builtin|custom):[a-z0-9._-]+$/i.test(s)) return s;
  return '';
}

function cleanPlayerOverrides(raw) {
  const src = (raw && typeof raw === 'object') ? raw : {};
  return {
    point_scored: cleanSoundRef(src.point_scored),
    match_point: cleanSoundRef(src.match_point),
    victory: cleanSoundRef(src.victory)
  };
}

export function normalizeAudioState(raw) {
  const base = structuredClone(DEFAULT_AUDIO_STATE);
  if (!raw || typeof raw !== 'object') return base;

  base.enabled = raw.enabled !== undefined ? Boolean(raw.enabled) : base.enabled;
  base.muted = raw.muted !== undefined ? Boolean(raw.muted) : base.muted;
  base.masterVolume = Math.round(clampNum(raw.masterVolume, 0, 100, base.masterVolume));
  base.muteInPreview = raw.muteInPreview !== undefined ? Boolean(raw.muteInPreview) : true;
  base.routingMode = ['per-overlay', 'scorebar-hub', 'dedicated-hub'].includes(raw.routingMode)
    ? raw.routingMode
    : 'per-overlay';
  base.cooldownMs = Math.round(clampNum(raw.cooldownMs, 0, 3000, base.cooldownMs));

  if (raw.events && typeof raw.events === 'object') {
    for (const key of AUDIO_EVENT_TYPES) {
      const ev = raw.events[key];
      if (ev && typeof ev === 'object') {
        base.events[key] = {
          enabled: ev.enabled !== undefined ? Boolean(ev.enabled) : base.events[key].enabled,
          sound: cleanSoundRef(ev.sound) || (ev.sound === '' ? '' : base.events[key].sound),
          volume: Math.round(clampNum(ev.volume, 0, 150, base.events[key].volume))
        };
      }
    }
  }

  if (raw.perPlayer && typeof raw.perPlayer === 'object') {
    base.perPlayer.p1 = cleanPlayerOverrides(raw.perPlayer.p1);
    base.perPlayer.p2 = cleanPlayerOverrides(raw.perPlayer.p2);
    const byName = {};
    if (raw.perPlayer.byName && typeof raw.perPlayer.byName === 'object') {
      for (const [k, v] of Object.entries(raw.perPlayer.byName).slice(0, 120)) {
        const cleanKey = String(k || '').trim().toLowerCase().slice(0, 64);
        if (!cleanKey) continue;
        const ov = cleanPlayerOverrides(v);
        if (ov.point_scored || ov.match_point || ov.victory) {
          byName[cleanKey] = ov;
        }
      }
    }
    base.perPlayer.byName = byName;
  }

  if (raw.perPreset && typeof raw.perPreset === 'object') {
    const cleanPresets = {};
    for (const [themeId, map] of Object.entries(raw.perPreset).slice(0, 120)) {
      const tid = String(themeId || '').trim().slice(0, 64);
      if (!tid || !map || typeof map !== 'object') continue;
      const evMap = {};
      for (const key of AUDIO_EVENT_TYPES) {
        const ref = cleanSoundRef(map[key]);
        if (ref) evMap[key] = ref;
      }
      if (Object.keys(evMap).length) cleanPresets[tid] = evMap;
    }
    base.perPreset = cleanPresets;
  }

  return base;
}

export function mergeAudioState(prevRaw, patchRaw) {
  const prev = normalizeAudioState(prevRaw);
  if (!patchRaw || typeof patchRaw !== 'object') return prev;
  if (patchRaw.__replace === true) return normalizeAudioState(patchRaw);

  const merged = structuredClone(prev);
  if (patchRaw.enabled !== undefined) merged.enabled = Boolean(patchRaw.enabled);
  if (patchRaw.muted !== undefined) merged.muted = Boolean(patchRaw.muted);
  if (patchRaw.masterVolume !== undefined) merged.masterVolume = Math.round(clampNum(patchRaw.masterVolume, 0, 100, merged.masterVolume));
  if (patchRaw.muteInPreview !== undefined) merged.muteInPreview = Boolean(patchRaw.muteInPreview);
  if (patchRaw.routingMode !== undefined && ['per-overlay', 'scorebar-hub', 'dedicated-hub'].includes(patchRaw.routingMode)) {
    merged.routingMode = patchRaw.routingMode;
  }
  if (patchRaw.cooldownMs !== undefined) merged.cooldownMs = Math.round(clampNum(patchRaw.cooldownMs, 0, 3000, merged.cooldownMs));

  if (patchRaw.events && typeof patchRaw.events === 'object') {
    for (const key of AUDIO_EVENT_TYPES) {
      const ev = patchRaw.events[key];
      if (ev && typeof ev === 'object') {
        merged.events[key] = {
          enabled: ev.enabled !== undefined ? Boolean(ev.enabled) : merged.events[key].enabled,
          sound: ev.sound !== undefined ? (cleanSoundRef(ev.sound) || '') : merged.events[key].sound,
          volume: ev.volume !== undefined ? Math.round(clampNum(ev.volume, 0, 150, merged.events[key].volume)) : merged.events[key].volume
        };
      }
    }
  }

  if (patchRaw.perPlayer && typeof patchRaw.perPlayer === 'object') {
    if (patchRaw.perPlayer.p1) merged.perPlayer.p1 = { ...merged.perPlayer.p1, ...cleanPlayerOverrides(patchRaw.perPlayer.p1) };
    if (patchRaw.perPlayer.p2) merged.perPlayer.p2 = { ...merged.perPlayer.p2, ...cleanPlayerOverrides(patchRaw.perPlayer.p2) };
    if (patchRaw.perPlayer.byName && typeof patchRaw.perPlayer.byName === 'object') {
      if (patchRaw.perPlayer.byName.__replace === true) {
        merged.perPlayer.byName = {};
      }
      for (const [k, v] of Object.entries(patchRaw.perPlayer.byName)) {
        if (k === '__replace') continue;
        const cleanKey = String(k || '').trim().toLowerCase().slice(0, 64);
        if (!cleanKey) continue;
        if (v === null) {
          delete merged.perPlayer.byName[cleanKey];
        } else {
          const ov = cleanPlayerOverrides(v);
          if (ov.point_scored || ov.match_point || ov.victory) merged.perPlayer.byName[cleanKey] = ov;
          else delete merged.perPlayer.byName[cleanKey];
        }
      }
    }
  }

  if (patchRaw.perPreset && typeof patchRaw.perPreset === 'object') {
    if (patchRaw.perPreset.__replace === true) {
      merged.perPreset = {};
    }
    for (const [themeId, map] of Object.entries(patchRaw.perPreset)) {
      if (themeId === '__replace') continue;
      const tid = String(themeId || '').trim().slice(0, 64);
      if (!tid) continue;
      if (map === null || (typeof map === 'object' && map.__clear === true)) {
        delete merged.perPreset[tid];
      } else if (map && typeof map === 'object') {
        const cur = map.__replace ? {} : { ...(merged.perPreset[tid] || {}) };
        for (const key of AUDIO_EVENT_TYPES) {
          if (map[key] !== undefined) {
            const ref = cleanSoundRef(map[key]);
            if (ref) cur[key] = ref;
            else delete cur[key];
          }
        }
        if (Object.keys(cur).length) merged.perPreset[tid] = cur;
        else delete merged.perPreset[tid];
      }
    }
  }

  return normalizeAudioState(merged);
}

/** Parse target win count from format string (FT3 -> 3, BO5 -> 3, FREE -> Infinity) */
export function parseFormatTargetWins(formatStr) {
  const f = String(formatStr || '').trim().toUpperCase();
  if (!f || f === 'FREE' || f === 'OFF' || f === 'NONE') return Infinity;
  const ft = f.match(/^FT\s*(\d+)$/);
  if (ft) {
    const n = Number(ft[1]);
    return n > 0 ? n : Infinity;
  }
  const bo = f.match(/^BO\s*(\d+)$/);
  if (bo) {
    const n = Number(bo[1]);
    return n > 0 ? Math.floor(n / 2) + 1 : Infinity;
  }
  return Infinity;
}

/** Inspect magic bytes of uploaded audio file so only genuine audio formats are accepted */
function verifyAudioMagic(buf, ext) {
  if (!Buffer.isBuffer(buf) || buf.length < 12) return false;
  const b0 = buf[0], b1 = buf[1], b2 = buf[2], b3 = buf[3];
  const ascii4 = buf.subarray(0, 4).toString('ascii');
  if (ext === '.wav') {
    return ascii4 === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WAVE';
  }
  if (ext === '.ogg') {
    return ascii4 === 'OggS';
  }
  if (ext === '.mp3') {
    // ID3 tag OR MPEG audio frame sync (0xFF 0xE0..0xFF)
    if (buf.subarray(0, 3).toString('ascii') === 'ID3') return true;
    if (b0 === 0xff && (b1 & 0xe0) === 0xe0) return true;
    // Allow small leading zero padding up to 256 bytes before frame sync
    const scanLen = Math.min(buf.length - 2, 256);
    for (let i = 0; i < scanLen; i++) {
      if (buf[i] === 0xff && (buf[i + 1] & 0xe0) === 0xe0) return true;
    }
    return false;
  }
  if (ext === '.m4a') {
    return buf.subarray(4, 8).toString('ascii') === 'ftyp';
  }
  if (ext === '.webm') {
    return b0 === 0x1a && b1 === 0x45 && b2 === 0xdf && b3 === 0xa3;
  }
  return false;
}

function writeJsonAtomic(filePath, data) {
  const tmp = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, filePath);
}

export function createSfxManager(dataDir) {
  const sfxDir = path.join(dataDir, 'sfx');
  const indexFile = path.join(sfxDir, 'sfx-library.json');
  fs.mkdirSync(sfxDir, { recursive: true });

  let library = [];
  try {
    if (fs.existsSync(indexFile)) {
      const parsed = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
      if (Array.isArray(parsed)) {
        library = parsed.filter(item => item && item.id && item.file && fs.existsSync(path.join(sfxDir, path.basename(item.file))));
      }
    }
  } catch {
    library = [];
  }
  if (!fs.existsSync(indexFile)) {
    writeJsonAtomic(indexFile, library);
  }

  // Strictly monotonic event sequence ID across live session
  let seqCounter = 0;
  const sessionToken = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  function nextEventId() {
    seqCounter += 1;
    return `${sessionToken}:${seqCounter}`;
  }

  function listCustomSfx() {
    // Re-verify files still exist on disk
    const valid = library.filter(item => item && item.file && fs.existsSync(path.join(sfxDir, path.basename(item.file))));
    if (valid.length !== library.length) {
      library = valid;
      try { writeJsonAtomic(indexFile, library); } catch {}
    }
    return library.map(item => ({
      ...item,
      ref: `custom:${item.id}`,
      url: `/media/sfx/${encodeURIComponent(item.file)}`
    }));
  }

  function saveUploadedSfx({ filename, name, dataUrl, base64, category = 'custom' }) {
    const rawName = String(filename || name || 'sound.mp3').trim();
    const ext = path.extname(rawName).toLowerCase();
    const mime = ALLOWED_AUDIO_EXTS[ext];
    if (!mime) {
      throw new Error('Unsupported audio format. Please upload .mp3, .wav, .ogg, .m4a, or .webm.');
    }

    let rawB64 = String(base64 || '').trim();
    if (!rawB64 && dataUrl) {
      const m = String(dataUrl).match(/^data:([^;]+);base64,(.+)$/i);
      if (!m) throw new Error('Invalid base64 audio payload.');
      rawB64 = m[2];
    }
    if (!rawB64) throw new Error('Empty audio payload.');

    const buf = Buffer.from(rawB64, 'base64');
    if (buf.length < 12) throw new Error('Audio file is empty or corrupted.');
    if (buf.length > MAX_SFX_BYTES) {
      throw new Error(`Audio file exceeds max size (${Math.round(MAX_SFX_BYTES / (1024 * 1024))} MB limit).`);
    }
    if (!verifyAudioMagic(buf, ext)) {
      throw new Error(`File signature does not match a valid ${ext.toUpperCase()} audio file.`);
    }

    const baseLabel = String(name || path.basename(rawName, ext))
      .replace(/[^\w\s().\-+]/g, '')
      .trim()
      .slice(0, 60) || 'Custom SFX';
    const slug = baseLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32) || 'sfx';
    const id = `${slug}-${Date.now().toString(36).slice(-5)}`;
    const safeFile = `${id}${ext}`;
    const dest = path.join(sfxDir, safeFile);
    fs.writeFileSync(dest, buf);

    const entry = {
      id,
      name: baseLabel,
      file: safeFile,
      ext,
      mime,
      size: buf.length,
      category: String(category || 'custom').trim().slice(0, 24) || 'custom',
      uploadedAt: Date.now()
    };
    library.unshift(entry);
    library = library.slice(0, 150);
    writeJsonAtomic(indexFile, library);
    return {
      ...entry,
      ref: `custom:${entry.id}`,
      url: `/media/sfx/${encodeURIComponent(entry.file)}`
    };
  }

  function renameCustomSfx(id, newName) {
    const cleanId = String(id || '').trim();
    const entry = library.find(item => item.id === cleanId);
    if (!entry) throw new Error('SFX clip not found.');
    const label = String(newName || '').replace(/[^\w\s().\-+]/g, '').trim().slice(0, 60);
    if (!label) throw new Error('Name cannot be empty.');
    entry.name = label;
    writeJsonAtomic(indexFile, library);
    return {
      ...entry,
      ref: `custom:${entry.id}`,
      url: `/media/sfx/${encodeURIComponent(entry.file)}`
    };
  }

  function deleteCustomSfx(id) {
    const cleanId = String(id || '').trim();
    const idx = library.findIndex(item => item.id === cleanId);
    if (idx < 0) return false;
    const [removed] = library.splice(idx, 1);
    const fp = path.join(sfxDir, path.basename(removed.file));
    try { if (fs.existsSync(fp)) fs.unlinkSync(fp); } catch {}
    writeJsonAtomic(indexFile, library);
    return true;
  }

  function resolveSfxFile(rawFile) {
    let decoded = '';
    try { decoded = decodeURIComponent(String(rawFile || '')); } catch { return null; }
    const safe = path.basename(decoded);
    if (!safe || safe !== decoded || safe.includes('..')) return null;
    const ext = path.extname(safe).toLowerCase();
    if (!ALLOWED_AUDIO_EXTS[ext]) return null;
    const fp = path.join(sfxDir, safe);
    if (!fp.startsWith(sfxDir + path.sep) || !fs.existsSync(fp)) return null;
    return { fp, ext, mime: ALLOWED_AUDIO_EXTS[ext] };
  }

  function serveSfxMedia(req, res, rawFile) {
    const resolved = resolveSfxFile(rawFile);
    if (!resolved) {
      res.writeHead(404);
      return res.end('SFX not found');
    }
    const stat = fs.statSync(resolved.fp);
    const total = stat.size;
    const rangeHeader = req.headers.range;
    const baseHeaders = {
      'Content-Type': resolved.mime,
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400'
    };

    if (rangeHeader) {
      const m = String(rangeHeader).match(/bytes=(\d*)-(\d*)/);
      if (m) {
        const start = m[1] ? Number(m[1]) : 0;
        const end = m[2] ? Math.min(total - 1, Number(m[2])) : total - 1;
        if (start >= 0 && start <= end && end < total) {
          res.writeHead(206, {
            ...baseHeaders,
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Content-Length': (end - start) + 1
          });
          return fs.createReadStream(resolved.fp, { start, end }).pipe(res);
        }
      }
    }

    res.writeHead(200, {
      ...baseHeaders,
      'Content-Length': total
    });
    return fs.createReadStream(resolved.fp).pipe(res);
  }

  /**
   * Detect live broadcast audio events from a state transition.
   * Returns an array of monotonic, domain-targeted event payloads (0, 1, or rarely 2).
   */
  function detectAudioEvents(prev, next, patch) {
    if (!prev || !next || !patch || patch._silentAudio === true) return [];
    const audioCfg = normalizeAudioState(next.audio);
    if (!audioCfg.enabled || audioCfg.muted) return [];

    const out = [];
    const now = Date.now();
    const presetId = String(next.theme || '');
    const pushEv = (eventType, target, extra = {}) => {
      out.push({
        id: nextEventId(),
        seq: seqCounter,
        eventType,
        target,
        presetId,
        ts: now,
        manual: false,
        ...extra
      });
    };

    // 1. Score delta detection (point_scored / match_point / victory / score_update)
    const p1Prev = Number(prev.p1?.score ?? 0);
    const p1Next = Number(next.p1?.score ?? 0);
    const p2Prev = Number(prev.p2?.score ?? 0);
    const p2Next = Number(next.p2?.score ?? 0);
    const p1Changed = patch.p1 && patch.p1.score !== undefined && p1Next !== p1Prev;
    const p2Changed = patch.p2 && patch.p2.score !== undefined && p2Next !== p2Prev;

    const p1NameChanged = patch.p1 && patch.p1.name !== undefined && String(next.p1?.name || '') !== String(prev.p1?.name || '');
    const p2NameChanged = patch.p2 && patch.p2.name !== undefined && String(next.p2?.name || '') !== String(prev.p2?.name || '');
    const isSwap = p1NameChanged && p2NameChanged
      && String(next.p1?.name || '') === String(prev.p2?.name || '')
      && String(next.p2?.name || '') === String(prev.p1?.name || '')
      && p1Next === p2Prev && p2Next === p1Prev;

    // 2. Match start (explicit intro replay OR fresh new match loaded at 0-0)
    const introReplayed = patch.introNonce !== undefined && patch.introNonce !== prev.introNonce;
    const freshMatchLoaded = !isSwap && (p1NameChanged || p2NameChanged) && p1Next === 0 && p2Next === 0
      && (p1Prev > 0 || p2Prev > 0 || Boolean(patch.activeMatch));

    if (introReplayed || freshMatchLoaded) {
      pushEv('match_start', 'scorebar');
    } else if (!isSwap && (p1Changed || p2Changed)) {
      const targetWins = parseFormatTargetWins(next.format);
      const handleSide = (side, prevVal, nextVal, playerName) => {
        if (nextVal > prevVal) {
          if (Number.isFinite(targetWins) && nextVal >= targetWins && prevVal < targetWins) {
            pushEv('victory', 'scorebar', { side, playerName, score: nextVal });
          } else if (Number.isFinite(targetWins) && nextVal === targetWins - 1 && prevVal < targetWins - 1) {
            pushEv('match_point', 'scorebar', { side, playerName, score: nextVal });
          } else {
            pushEv('point_scored', 'scorebar', { side, playerName, score: nextVal });
          }
        } else if (nextVal < prevVal) {
          pushEv('score_update', 'scorebar', { side, playerName, score: nextVal, direction: 'down' });
        }
      };

      if (p1Changed && p2Changed && p1Next === 0 && p2Next === 0) {
        // Simultaneous 0-0 score reset -> single clean score_update sound
        pushEv('score_update', 'scorebar', { side: '', direction: 'reset' });
      } else {
        if (p1Changed) handleSide('p1', p1Prev, p1Next, String(next.p1?.name || ''));
        if (p2Changed) handleSide('p2', p2Prev, p2Next, String(next.p2?.name || ''));
      }
    }

    // 3. Round / phase change (skip if match_start already fired in same patch)
    if (!introReplayed && !freshMatchLoaded && patch.round !== undefined) {
      const prevRound = String(prev.round || '').trim();
      const nextRound = String(next.round || '').trim();
      if (nextRound && nextRound !== prevRound) {
        pushEv('round_change', 'scorebar', { round: nextRound });
      }
    }

    // 4. VS Splash reveal / replay
    if (patch.vs && typeof patch.vs === 'object') {
      const vsIntro = patch.vs.introNonce !== undefined && patch.vs.introNonce !== prev.vs?.introNonce;
      const vsShown = patch.vs.visible === true && prev.vs?.visible === false;
      if (vsIntro || vsShown) {
        pushEv('vs_splash', 'vs');
      }
    }

    // 5. Results / Brackets reveal / replay
    if (patch.results && typeof patch.results === 'object') {
      const resIntro = patch.results.introNonce !== undefined && patch.results.introNonce !== prev.results?.introNonce;
      const resShown = patch.results.visible === true && prev.results?.visible === false;
      if (resIntro || resShown) {
        pushEv('results_reveal', 'results');
      }
    }
    if (patch.brackets && typeof patch.brackets === 'object') {
      const bkIntro = patch.brackets.introNonce !== undefined && patch.brackets.introNonce !== prev.brackets?.introNonce;
      const bkShown = patch.brackets.visible === true && prev.brackets?.visible === false;
      if (bkIntro || bkShown) {
        pushEv('results_reveal', 'brackets');
      }
    }

    return out;
  }

  function createManualTrigger({ eventType = 'point_scored', side = '', playerName = '', target = '', sound = '', volume = null, presetId = '' }) {
    const cleanType = AUDIO_EVENT_TYPES.includes(eventType) ? eventType : 'point_scored';
    const defaultTarget = cleanType === 'vs_splash' ? 'vs' : (cleanType === 'results_reveal' ? 'results' : 'scorebar');
    return {
      id: nextEventId(),
      seq: seqCounter,
      eventType: cleanType,
      side: side === 'p1' || side === 'p2' ? side : '',
      playerName: String(playerName || '').trim(),
      target: ['scorebar', 'vs', 'results', 'brackets', 'audio-hub', 'all'].includes(target) ? target : defaultTarget,
      presetId: String(presetId || ''),
      soundOverride: cleanSoundRef(sound),
      volumeOverride: volume !== null && volume !== undefined ? Math.round(clampNum(volume, 0, 150, 90)) : null,
      ts: Date.now(),
      manual: true
    };
  }

  return {
    sfxDir,
    listCustomSfx,
    saveUploadedSfx,
    renameCustomSfx,
    deleteCustomSfx,
    resolveSfxFile,
    serveSfxMedia,
    detectAudioEvents,
    createManualTrigger
  };
}
