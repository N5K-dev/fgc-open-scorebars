/**
 * FGC Open Scorebars — Broadcast Audio & Custom SFX Studio Controller (Phase 5)
 * Modular zero-dependency UI controller attached to Control Panel via window.__FGC_PANEL__.
 * Keeps panel-app.js lean while delivering full control over:
 *   - OBS-safe routing (Per-Overlay / Scorebar Hub / Dedicated /audio.html Hub)
 *   - 8 live broadcast event triggers with independent sound & volume controls
 *   - Persistent custom .mp3/.wav/.ogg/.m4a/.webm SFX uploads (data/sfx/)
 *   - Per-Player (P1/P2 + Player Name signature) & Per-Preset SFX overrides
 *   - Instant Live Soundboard Pad + 1-Click Game Sound Packs
 */
(() => {
  'use strict';

  const P = window.__FGC_PANEL__;
  const A = window.FGC_AUDIO;
  if (!P || !A) return;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  const EVENT_META = [
    { key: 'point_scored',   icon: '🥊', label: 'Point Scored (+1)',          hint: 'When P1 or P2 scores a point (not yet match point or victory)' },
    { key: 'match_point',    icon: '🔥', label: 'Match Point Reached',        hint: 'When a player reaches 1 point away from winning the FT/BO set' },
    { key: 'victory',        icon: '🏆', label: 'Match Victory / Set Win',    hint: 'When a player reaches the winning target score (e.g. 3 in FT3)' },
    { key: 'score_update',   icon: '↩️', label: 'Score Undo / Reset (-1/0-0)',hint: 'When a score is decreased or reset back to 0-0' },
    { key: 'match_start',    icon: '🔔', label: 'Match Start / OBS Intro',    hint: 'When a new set loads at 0-0 or OBS Intro replays' },
    { key: 'round_change',   icon: '💨', label: 'Round / Phase Changed',      hint: 'When the round text changes (e.g. Pools -> Winners Finals)' },
    { key: 'vs_splash',      icon: '⚔️', label: 'VS Splash / Up Next Reveal', hint: 'When the VS Splash screen reveals or replays its intro' },
    { key: 'results_reveal', icon: '✨', label: 'Top 8 Results / Bracket Reveal', hint: 'When Top 8 Results or Brackets plays its reveal intro' }
  ];

  const PRESET_EVENTS = ['point_scored', 'match_point', 'victory', 'match_start', 'round_change', 'vs_splash'];
  const PLAYER_EVENTS = [
    { key: 'point_scored', label: 'Point Scored' },
    { key: 'match_point',  label: 'Match Point' },
    { key: 'victory',      label: 'Victory' }
  ];

  const SOUNDBOARD_BUILTINS = [
    { ref: 'builtin:match-start-gong',  icon: '🔔', label: 'Fight Gong',     eventType: 'match_start' },
    { ref: 'builtin:fgc-hit-punch',     icon: '🥊', label: 'Impact Hit',     eventType: 'point_scored' },
    { ref: 'builtin:tekken-electric',   icon: '⚡', label: 'EWGF Spark',     eventType: 'point_scored' },
    { ref: 'builtin:sf-drive-impact',   icon: '💥', label: 'Drive Burst',    eventType: 'point_scored' },
    { ref: 'builtin:match-point-alarm', icon: '🔥', label: 'Match Point',    eventType: 'match_point' },
    { ref: 'builtin:vs-clash-sting',    icon: '⚔️', label: 'VS Clash',       eventType: 'vs_splash' },
    { ref: 'builtin:victory-fanfare',   icon: '🏆', label: 'Victory Fanfare',eventType: 'victory' },
    { ref: 'builtin:airhorn-hype',      icon: '📣', label: 'FGC Hype Horn',  eventType: 'victory' }
  ];

  const DEFAULT_AUDIO = {
    enabled: true,
    muted: false,
    masterVolume: 80,
    muteInPreview: true,
    routingMode: 'per-overlay',
    cooldownMs: 120,
    events: {
      point_scored:   { enabled: true, sound: 'builtin:fgc-hit-punch',     volume: 90 },
      score_update:   { enabled: true, sound: 'builtin:score-minus-soft',  volume: 65 },
      match_point:    { enabled: true, sound: 'builtin:match-point-alarm', volume: 95 },
      match_start:    { enabled: true, sound: 'builtin:match-start-gong',  volume: 85 },
      victory:        { enabled: true, sound: 'builtin:victory-fanfare',   volume: 100 },
      round_change:   { enabled: true, sound: 'builtin:round-whoosh',      volume: 75 },
      vs_splash:      { enabled: true, sound: 'builtin:vs-clash-sting',    volume: 90 },
      results_reveal: { enabled: true, sound: 'builtin:top8-reveal-swell', volume: 90 }
    },
    perPlayer: {
      p1: { point_scored: '', match_point: '', victory: '' },
      p2: { point_scored: '', match_point: '', victory: '' },
      byName: {}
    },
    perPreset: {}
  };

  function getAudioCfg() {
    const st = P.getState() || {};
    const a = st.audio || {};
    return {
      ...DEFAULT_AUDIO,
      ...a,
      events: {
        ...DEFAULT_AUDIO.events,
        ...(a.events || {})
      },
      perPlayer: {
        p1: { ...DEFAULT_AUDIO.perPlayer.p1, ...(a.perPlayer?.p1 || {}) },
        p2: { ...DEFAULT_AUDIO.perPlayer.p2, ...(a.perPlayer?.p2 || {}) },
        byName: { ...(a.perPlayer?.byName || {}) }
      },
      perPreset: { ...(a.perPreset || {}) }
    };
  }

  function patchAudio(audioPatch) {
    P.commitState({ audio: audioPatch, _silentAudio: true });
    renderAll();
  }

  function formatBytes(n) {
    const v = Number(n || 0);
    if (v >= 1024 * 1024) return `${(v / (1024 * 1024)).toFixed(2)} MB`;
    if (v >= 1024) return `${Math.round(v / 1024)} KB`;
    return `${v} B`;
  }

  function buildSoundOptionsHtml(selectedVal, includeInheritLabel) {
    const custom = A.getCustomSfx() || [];
    let html = '';
    if (includeInheritLabel) {
      html += `<option value=""${!selectedVal ? ' selected' : ''}>${esc(includeInheritLabel)}</option>`;
    }
    html += `<option value="none"${selectedVal === 'none' ? ' selected' : ''}>🔇 Silent (Disabled)</option>`;
    if (custom.length) {
      html += `<optgroup label="Custom Uploaded SFX (${custom.length})">`;
      for (const item of custom) {
        const ref = item.ref || `custom:${item.id}`;
        html += `<option value="${esc(ref)}"${selectedVal === ref ? ' selected' : ''}>🎵 ${esc(item.name)} (${esc((item.ext || '').toUpperCase().replace('.', ''))})</option>`;
      }
      html += '</optgroup>';
    }
    html += '<optgroup label="Built-in FGC SFX (Offline Web Audio)">';
    for (const s of A.BUILTIN_SFX) {
      const ref = `builtin:${s.id}`;
      html += `<option value="${esc(ref)}"${selectedVal === ref ? ' selected' : ''}>${s.icon} ${esc(s.name)}</option>`;
    }
    html += '</optgroup>';
    return html;
  }

  async function triggerLiveSfx({ eventType = 'point_scored', sound = '', volume = null, side = '', playerName = '', target = '' }) {
    const st = P.getState() || {};
    if (!P.isHttp) {
      await A.previewSound(sound || getAudioCfg().events[eventType]?.sound || 'builtin:fgc-hit-punch', volume ?? 90);
      P.toast('🔊 Played locally (offline file mode)');
      return;
    }
    try {
      const res = await fetch('/api/audio/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          sound,
          volume,
          side,
          playerName,
          target,
          presetId: st.theme || ''
        })
      });
      if (!res.ok) throw new Error('Trigger failed');
      P.toast('📡 SFX triggered live in OBS');
    } catch (err) {
      P.toast(`⚠ ${err.message || 'Audio trigger error'}`);
    }
  }

  function updateHeaderPill() {
    const cfg = getAudioCfg();
    const isActive = cfg.enabled !== false && !cfg.muted;
    const hdrBtn = $('btn-hdr-audio');
    const muteBtn = $('btn-hdr-audio-mute');
    if (hdrBtn) {
      hdrBtn.classList.toggle('is-muted', !isActive);
      const lbl = hdrBtn.querySelector('.aud-hdr-txt');
      if (lbl) lbl.textContent = isActive ? `SFX ${cfg.masterVolume}%` : 'SFX OFF';
    }
    if (muteBtn) {
      muteBtn.textContent = isActive ? '🔊' : '🔇';
      muteBtn.title = isActive ? 'Quick Mute All Live SFX' : 'Quick Unmute Live SFX';
    }
  }

  function updateAudioStatusBadge() {
    const badge = $('aud-ctx-badge');
    if (!badge) return;
    const st = A.getStatus();
    if (st === 'running') {
      badge.textContent = '🟢 Local Audio Unlocked';
      badge.className = 'aud-status-pill is-ok';
    } else if (st === 'unsupported') {
      badge.textContent = '🔴 Web Audio Unsupported';
      badge.className = 'aud-status-pill is-warn';
    } else {
      badge.textContent = '🟡 Click Test / Unlock';
      badge.className = 'aud-status-pill is-warn';
    }
  }

  function renderMasterControls() {
    const cfg = getAudioCfg();
    const en = $('aud-enabled');
    const mu = $('aud-muted');
    const mv = $('aud-master-vol');
    const mvl = $('aud-master-vol-val');
    const mp = $('aud-mute-preview');
    const rt = $('aud-routing-mode');
    const cd = $('aud-cooldown');
    const hubUrl = $('aud-hub-url');

    if (en) en.checked = cfg.enabled !== false;
    if (mu) {
      mu.classList.toggle('is-muted', Boolean(cfg.muted));
      mu.textContent = cfg.muted ? '🔇 Unmute All' : '🔊 Live Active';
    }
    if (mv) mv.value = String(cfg.masterVolume ?? 80);
    if (mvl) mvl.textContent = `${cfg.masterVolume ?? 80}%`;
    if (mp) mp.checked = cfg.muteInPreview !== false;
    if (rt) rt.value = cfg.routingMode || 'per-overlay';
    if (cd) cd.value = String(cfg.cooldownMs ?? 120);
    if (hubUrl) {
      const origin = (location.protocol === 'http:' || location.protocol === 'https:') ? location.origin : 'http://localhost:8787';
      hubUrl.textContent = `${origin}/audio.html`;
    }
    const obsAudioUrl = $('obs-audio-url-text');
    if (obsAudioUrl) {
      const origin = (location.protocol === 'http:' || location.protocol === 'https:') ? location.origin : 'http://localhost:8787';
      obsAudioUrl.textContent = `${origin}/audio.html`;
    }
    updateHeaderPill();
    updateAudioStatusBadge();
  }

  function renderSoundboard() {
    const host = $('aud-soundboard');
    if (!host) return;
    const custom = (A.getCustomSfx() || []).slice(0, 6);
    let html = '';
    for (const pad of SOUNDBOARD_BUILTINS) {
      html += `<button type="button" class="aud-pad-btn" data-pad-ref="${esc(pad.ref)}" data-pad-ev="${esc(pad.eventType)}" title="Click to trigger live in OBS · Shift+Click to audition locally only">
        <span class="aud-pad-ic">${pad.icon}</span>
        <span class="aud-pad-lbl">${esc(pad.label)}</span>
      </button>`;
    }
    for (const c of custom) {
      const ref = c.ref || `custom:${c.id}`;
      html += `<button type="button" class="aud-pad-btn is-custom" data-pad-ref="${esc(ref)}" data-pad-ev="point_scored" title="Custom SFX · Click to trigger live in OBS · Shift+Click to preview locally">
        <span class="aud-pad-ic">🎵</span>
        <span class="aud-pad-lbl">${esc(c.name)}</span>
      </button>`;
    }
    host.innerHTML = html;
  }

  function renderEventsMatrix() {
    const host = $('aud-events-list');
    if (!host) return;
    const cfg = getAudioCfg();
    host.innerHTML = EVENT_META.map(meta => {
      const ev = cfg.events[meta.key] || DEFAULT_AUDIO.events[meta.key];
      return `<div class="aud-ev-row ${ev.enabled === false ? 'is-off' : ''}" data-ev-key="${meta.key}">
        <label class="aud-ev-toggle" title="${esc(meta.hint)}">
          <input type="checkbox" class="aud-ev-chk" data-ev="${meta.key}" ${ev.enabled !== false ? 'checked' : ''} />
          <span class="aud-ev-name"><span>${meta.icon}</span> <strong>${esc(meta.label)}</strong></span>
          <small class="aud-ev-hint">${esc(meta.hint)}</small>
        </label>
        <select class="aud-ev-sound" data-ev="${meta.key}">
          ${buildSoundOptionsHtml(ev.sound || 'none', '')}
        </select>
        <div class="aud-ev-vol-wrap">
          <input type="range" class="aud-ev-vol" data-ev="${meta.key}" min="0" max="150" step="5" value="${Number(ev.volume ?? 90)}" />
          <span class="aud-ev-vol-val">${Number(ev.volume ?? 90)}%</span>
        </div>
        <div class="aud-ev-btns">
          <button type="button" class="aud-mini-btn" data-aud-local="${meta.key}" title="Audition locally in browser">▶</button>
          <button type="button" class="aud-mini-btn is-live" data-aud-live="${meta.key}" title="Trigger live in OBS overlays">📡</button>
        </div>
      </div>`;
    }).join('');
  }

  function renderCustomLibrary() {
    const host = $('aud-custom-list');
    const countEl = $('aud-custom-count');
    if (!host) return;
    const list = A.getCustomSfx() || [];
    if (countEl) countEl.textContent = String(list.length);
    if (!list.length) {
      host.innerHTML = `<div class="aud-empty">No custom SFX uploaded yet. Upload <b>.mp3</b>, <b>.wav</b>, <b>.ogg</b>, <b>.m4a</b>, or <b>.webm</b> clips above — they persist locally in <code>data/sfx/</code> and work 100% offline in OBS.</div>`;
      return;
    }
    host.innerHTML = list.map(item => {
      const ref = item.ref || `custom:${item.id}`;
      const ext = (item.ext || '').toUpperCase().replace('.', '') || 'AUDIO';
      return `<div class="aud-clip-row" data-clip-id="${esc(item.id)}">
        <div class="aud-clip-info">
          <span class="aud-clip-badge">${esc(ext)}</span>
          <strong class="aud-clip-name">${esc(item.name)}</strong>
          <span class="aud-clip-size">${formatBytes(item.size)}</span>
        </div>
        <div class="aud-clip-actions">
          <button type="button" class="aud-mini-btn" data-clip-play="${esc(ref)}" title="Play locally">▶</button>
          <button type="button" class="aud-mini-btn is-live" data-clip-live="${esc(ref)}" title="Trigger live in OBS">📡</button>
          <button type="button" class="aud-mini-btn" data-clip-rename="${esc(item.id)}" title="Rename clip">✏️</button>
          <button type="button" class="aud-mini-btn is-del" data-clip-del="${esc(item.id)}" title="Delete clip permanently">🗑</button>
        </div>
      </div>`;
    }).join('');
  }

  function renderPlayerOverrides() {
    const cfg = getAudioCfg();
    const st = P.getState() || {};
    const p1Name = st.p1?.name || 'PLAYER 1';
    const p2Name = st.p2?.name || 'PLAYER 2';
    const p1Lbl = $('aud-p1-slot-lbl');
    const p2Lbl = $('aud-p2-slot-lbl');
    if (p1Lbl) p1Lbl.textContent = `P1 Slot (${p1Name})`;
    if (p2Lbl) p2Lbl.textContent = `P2 Slot (${p2Name})`;

    for (const side of ['p1', 'p2']) {
      const box = $(`aud-player-${side}-grid`);
      if (!box) continue;
      const ov = cfg.perPlayer?.[side] || {};
      box.innerHTML = PLAYER_EVENTS.map(pe => `
        <div class="aud-sub-field">
          <label>${esc(pe.label)}</label>
          <select class="aud-slot-sel" data-side="${side}" data-ev="${pe.key}">
            ${buildSoundOptionsHtml(ov[pe.key] || '', '↳ Inherit Preset / Global')}
          </select>
        </div>
      `).join('');
    }

    // Populate saved player autocomplete datalist & name rule sound selects
    const dl = $('aud-player-datalist');
    if (dl) {
      const names = new Set([p1Name, p2Name].filter(Boolean));
      const saved = P.getPlayersDb ? (P.getPlayersDb() || []) : [];
      for (const pl of saved) { if (pl?.name) names.add(pl.name); }
      dl.innerHTML = [...names].slice(0, 120).map(n => `<option value="${esc(n)}"></option>`).join('');
    }
    const selPt = $('aud-byname-point');
    const selMp = $('aud-byname-mp');
    const selVic = $('aud-byname-vic');
    if (selPt && !selPt.dataset.boundOpts) {
      selPt.innerHTML = buildSoundOptionsHtml('', '— Point Scored (optional) —');
      selMp.innerHTML = buildSoundOptionsHtml('', '— Match Point (optional) —');
      selVic.innerHTML = buildSoundOptionsHtml('', '— Victory (optional) —');
      selPt.dataset.boundOpts = '1';
    } else if (selPt) {
      const v1 = selPt.value, v2 = selMp.value, v3 = selVic.value;
      selPt.innerHTML = buildSoundOptionsHtml(v1, '— Point Scored (optional) —');
      selMp.innerHTML = buildSoundOptionsHtml(v2, '— Match Point (optional) —');
      selVic.innerHTML = buildSoundOptionsHtml(v3, '— Victory (optional) —');
    }

    const rulesHost = $('aud-byname-list');
    if (rulesHost) {
      const entries = Object.entries(cfg.perPlayer?.byName || {});
      if (!entries.length) {
        rulesHost.innerHTML = `<div class="aud-empty-mini">No player-name signature SFX rules yet. Add a player above so their signature sound follows them whether they play P1 or P2.</div>`;
      } else {
        rulesHost.innerHTML = entries.map(([key, ov]) => {
          const tags = PLAYER_EVENTS
            .filter(pe => ov[pe.key])
            .map(pe => `<span class="aud-rule-tag">${esc(pe.label)}: <b>${esc(ov[pe.key].replace(/^(builtin|custom):/, ''))}</b></span>`)
            .join('');
          return `<div class="aud-rule-row">
            <div><strong style="text-transform:uppercase;">${esc(key)}</strong> <div class="aud-rule-tags">${tags}</div></div>
            <button type="button" class="aud-mini-btn is-del" data-del-byname="${esc(key)}" title="Remove player signature rule">✕</button>
          </div>`;
        }).join('');
      }
    }
  }

  function renderPresetOverrides() {
    const st = P.getState() || {};
    const themeId = st.theme || 't8-native-hud';
    const themeObj = (P.THEMES || []).find(t => t.id === themeId);
    const lbl = $('aud-active-preset-name');
    if (lbl) lbl.textContent = themeObj ? themeObj.name : themeId;

    const cfg = getAudioCfg();
    const curMap = cfg.perPreset?.[themeId] || {};
    const countBadge = $('aud-preset-ov-count');
    const ovKeys = Object.keys(curMap);
    if (countBadge) {
      countBadge.textContent = ovKeys.length ? `${ovKeys.length} active override(s)` : 'Using Global Defaults';
      countBadge.className = 'aud-status-pill ' + (ovKeys.length ? 'is-ok' : '');
    }

    const grid = $('aud-preset-grid');
    if (!grid) return;
    grid.innerHTML = PRESET_EVENTS.map(evKey => {
      const meta = EVENT_META.find(m => m.key === evKey) || { icon: '🔊', label: evKey };
      return `<div class="aud-sub-field">
        <label><span>${meta.icon}</span> <span>${esc(meta.label)}</span></label>
        <select class="aud-preset-sel" data-ev="${evKey}">
          ${buildSoundOptionsHtml(curMap[evKey] || '', '↳ Inherit Global')}
        </select>
      </div>`;
    }).join('');
  }

  function renderAll() {
    A.syncState(P.getState());
    renderMasterControls();
    renderSoundboard();
    renderEventsMatrix();
    renderCustomLibrary();
    renderPlayerOverrides();
    renderPresetOverrides();
  }

  async function uploadAudioFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    if (!P.isHttp) {
      P.toast('⚠ Start server.mjs to upload persistent SFX files');
      return;
    }
    const customNameInput = $('aud-upload-name');
    const singleLabel = files.length === 1 && customNameInput ? customNameInput.value.trim() : '';
    let uploaded = 0;
    for (const file of files) {
      try {
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ''));
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
        const res = await fetch('/api/sfx', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'upload',
            filename: file.name,
            name: singleLabel || '',
            dataUrl
          })
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Upload failed');
        if (Array.isArray(json.custom)) A.setCustomSfx(json.custom);
        uploaded++;
      } catch (err) {
        P.toast(`⚠ ${file.name}: ${err.message}`);
      }
    }
    if (customNameInput) customNameInput.value = '';
    if (uploaded > 0) {
      P.toast(`🎵 Uploaded ${uploaded} custom SFX clip${uploaded > 1 ? 's' : ''} to data/sfx/`);
      renderAll();
    }
  }

  function wireEvents() {
    // Header Quick Audio Jump & Quick Mute
    $('btn-hdr-audio')?.addEventListener('click', (e) => {
      if (e.target.closest('#btn-hdr-audio-mute')) return;
      P.setActiveWorkspace?.('scorebars');
      $('bottom-tabs')?.querySelector('button[data-tab="audio"]')?.click();
      $('tab-audio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    $('btn-hdr-audio-mute')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const cfg = getAudioCfg();
      patchAudio({ muted: !cfg.muted });
      P.toast(!cfg.muted ? '🔇 All Live SFX Muted' : '🔊 Live SFX Active');
    });

    // Master Controls
    $('aud-enabled')?.addEventListener('change', (e) => patchAudio({ enabled: e.target.checked }));
    $('aud-muted')?.addEventListener('click', () => {
      const cfg = getAudioCfg();
      patchAudio({ muted: !cfg.muted });
    });
    $('aud-master-vol')?.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      if ($('aud-master-vol-val')) $('aud-master-vol-val').textContent = `${v}%`;
      patchAudio({ masterVolume: v });
    });
    $('aud-mute-preview')?.addEventListener('change', (e) => patchAudio({ muteInPreview: e.target.checked }));
    $('aud-routing-mode')?.addEventListener('change', (e) => patchAudio({ routingMode: e.target.value }));
    $('aud-cooldown')?.addEventListener('change', (e) => patchAudio({ cooldownMs: Number(e.target.value || 120) }));

    $('btn-aud-unlock')?.addEventListener('click', async () => {
      await A.previewSound('builtin:arcade-coin', 85);
      updateAudioStatusBadge();
      P.toast('🔊 Audio unlocked & tested locally');
    });

    $('btn-aud-copy-hub')?.addEventListener('click', () => {
      const url = $('aud-hub-url')?.textContent || 'http://localhost:8787/audio.html';
      navigator.clipboard?.writeText(url).then(() => P.toast('📋 Copied Dedicated OBS Audio Hub URL')).catch(() => P.toast(url));
    });
    $('copy-obs-audio')?.addEventListener('click', () => {
      const url = $('obs-audio-url-text')?.textContent || 'http://localhost:8787/audio.html';
      navigator.clipboard?.writeText(url).then(() => P.toast('📋 Copied Dedicated OBS Audio Hub URL')).catch(() => P.toast(url));
    });
    $('btn-aud-open-hub')?.addEventListener('click', () => {
      window.open('/audio.html', '_blank', 'noopener');
    });

    // Quick Live Soundboard Pads
    $('aud-soundboard')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-pad-ref]');
      if (!btn) return;
      const ref = btn.dataset.padRef;
      const evType = btn.dataset.padEv || 'point_scored';
      if (e.shiftKey) {
        A.previewSound(ref, 95);
        P.toast('▶ Previewed SFX locally');
      } else {
        A.previewSound(ref, 70);
        triggerLiveSfx({ eventType: evType, sound: ref, volume: 95 });
      }
    });

    // Events Matrix (delegated)
    $('aud-events-list')?.addEventListener('change', (e) => {
      const chk = e.target.closest('.aud-ev-chk');
      if (chk) {
        patchAudio({ events: { [chk.dataset.ev]: { enabled: chk.checked } } });
        return;
      }
      const sel = e.target.closest('.aud-ev-sound');
      if (sel) {
        patchAudio({ events: { [sel.dataset.ev]: { sound: sel.value } } });
        if (sel.value && sel.value !== 'none') A.previewSound(sel.value, getAudioCfg().events[sel.dataset.ev]?.volume ?? 90);
      }
    });
    $('aud-events-list')?.addEventListener('input', (e) => {
      const rng = e.target.closest('.aud-ev-vol');
      if (!rng) return;
      const val = Number(rng.value);
      const span = rng.parentElement?.querySelector('.aud-ev-vol-val');
      if (span) span.textContent = `${val}%`;
      patchAudio({ events: { [rng.dataset.ev]: { volume: val } } });
    });
    $('aud-events-list')?.addEventListener('click', (e) => {
      const loc = e.target.closest('[data-aud-local]');
      if (loc) {
        const key = loc.dataset.audLocal;
        const ev = getAudioCfg().events[key];
        if (!ev?.sound || ev.sound === 'none') return P.toast('🔇 This event is currently Silent');
        A.previewSound(ev.sound, ev.volume ?? 90);
        return;
      }
      const live = e.target.closest('[data-aud-live]');
      if (live) {
        const key = live.dataset.audLive;
        const st = P.getState() || {};
        triggerLiveSfx({ eventType: key, side: 'p1', playerName: st.p1?.name || '' });
      }
    });

    // Custom SFX Upload + Drag & Drop
    const fileInput = $('aud-file-input');
    const dropZone = $('aud-dropzone');
    $('btn-aud-upload')?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => {
      uploadAudioFiles(e.target.files);
      fileInput.value = '';
    });
    if (dropZone) {
      dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('is-drag'); });
      dropZone.addEventListener('dragleave', () => dropZone.classList.remove('is-drag'));
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('is-drag');
        if (e.dataTransfer?.files?.length) uploadAudioFiles(e.dataTransfer.files);
      });
    }

    // Custom SFX Library Actions
    $('aud-custom-list')?.addEventListener('click', async (e) => {
      const playBtn = e.target.closest('[data-clip-play]');
      if (playBtn) { A.previewSound(playBtn.dataset.clipPlay, 95); return; }
      const liveBtn = e.target.closest('[data-clip-live]');
      if (liveBtn) { triggerLiveSfx({ eventType: 'point_scored', sound: liveBtn.dataset.clipLive, volume: 95 }); return; }
      const renBtn = e.target.closest('[data-clip-rename]');
      if (renBtn) {
        const id = renBtn.dataset.clipRename;
        const cur = (A.getCustomSfx() || []).find(x => x.id === id);
        const nextName = prompt('Rename custom SFX clip:', cur?.name || '');
        if (!nextName || !nextName.trim()) return;
        try {
          const res = await fetch('/api/sfx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'rename', id, name: nextName.trim() })
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || 'Rename failed');
          if (Array.isArray(json.custom)) A.setCustomSfx(json.custom);
          P.toast('✏️ SFX renamed');
          renderAll();
        } catch (err) { P.toast(`⚠ ${err.message}`); }
        return;
      }
      const delBtn = e.target.closest('[data-clip-del]');
      if (delBtn) {
        const id = delBtn.dataset.clipDel;
        const cur = (A.getCustomSfx() || []).find(x => x.id === id);
        if (!confirm(`Delete custom SFX "${cur?.name || id}" permanently?`)) return;
        try {
          const res = await fetch('/api/sfx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete', id })
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || 'Delete failed');
          if (Array.isArray(json.custom)) A.setCustomSfx(json.custom);
          P.toast('🗑 Custom SFX deleted');
          renderAll();
        } catch (err) { P.toast(`⚠ ${err.message}`); }
      }
    });

    // Per-Player Slot Overrides (P1 / P2)
    $('tab-audio')?.addEventListener('change', (e) => {
      const slotSel = e.target.closest('.aud-slot-sel');
      if (slotSel) {
        const side = slotSel.dataset.side;
        const evKey = slotSel.dataset.ev;
        patchAudio({ perPlayer: { [side]: { [evKey]: slotSel.value } } });
        if (slotSel.value && slotSel.value !== 'none') A.previewSound(slotSel.value, 90);
        return;
      }
      const prSel = e.target.closest('.aud-preset-sel');
      if (prSel) {
        const themeId = P.getState()?.theme || 't8-native-hud';
        const evKey = prSel.dataset.ev;
        patchAudio({ perPreset: { [themeId]: { [evKey]: prSel.value } } });
        if (prSel.value && prSel.value !== 'none') A.previewSound(prSel.value, 90);
      }
    });

    // Per-Player Name Signature Rule Save & Delete
    $('btn-aud-save-byname')?.addEventListener('click', () => {
      const name = String($('aud-byname-input')?.value || '').trim();
      if (!name) return P.toast('⚠ Enter or select a player name first');
      const pt = $('aud-byname-point')?.value || '';
      const mp = $('aud-byname-mp')?.value || '';
      const vic = $('aud-byname-vic')?.value || '';
      if (!pt && !mp && !vic) return P.toast('⚠ Pick at least one SFX for this player');
      patchAudio({ perPlayer: { byName: { [name.toLowerCase()]: { point_scored: pt, match_point: mp, victory: vic } } } });
      if ($('aud-byname-input')) $('aud-byname-input').value = '';
      P.toast(`🎵 Saved signature SFX for ${name}`);
    });
    $('aud-byname-list')?.addEventListener('click', (e) => {
      const del = e.target.closest('[data-del-byname]');
      if (!del) return;
      patchAudio({ perPlayer: { byName: { [del.dataset.delByname]: null } } });
      P.toast('🗑 Removed player signature SFX');
    });

    // 1-Click Game Sound Packs (Apply to Active Preset OR Global)
    $('aud-pack-bar')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-aud-pack]');
      if (!btn) return;
      const packId = btn.dataset.audPack;
      const pack = A.BUILTIN_PACKS[packId];
      if (!pack) return;
      const scope = $('aud-pack-scope')?.value || 'preset';
      if (scope === 'global') {
        const eventsPatch = {};
        for (const [k, ref] of Object.entries(pack.events)) {
          eventsPatch[k] = { sound: ref };
        }
        patchAudio({ events: eventsPatch });
        P.toast(`✨ Applied "${pack.name}" pack globally`);
      } else {
        const themeId = P.getState()?.theme || 't8-native-hud';
        patchAudio({ perPreset: { [themeId]: { __replace: true, ...pack.events } } });
        P.toast(`✨ Bound "${pack.name}" pack to current preset`);
      }
      A.previewSound(pack.events.point_scored, 85);
    });

    $('btn-aud-clear-preset')?.addEventListener('click', () => {
      const themeId = P.getState()?.theme || 't8-native-hud';
      patchAudio({ perPreset: { [themeId]: { __clear: true } } });
      P.toast('↺ Cleared preset SFX overrides (inheriting Global)');
    });

    $('btn-aud-reset-all')?.addEventListener('click', () => {
      if (!confirm('Reset all Audio & SFX settings to defaults? (Your uploaded files in data/sfx/ will be kept.)')) return;
      patchAudio({ __replace: true, ...structuredClone(DEFAULT_AUDIO) });
      P.toast('↺ Audio settings reset to defaults');
    });
  }

  // Initialize Audio Engine in 'panel' role (never auto-plays live SSE events -> zero double audio with OBS!)
  A.init({ role: 'panel', isPreview: false });
  A.onChange(() => {
    updateAudioStatusBadge();
    renderCustomLibrary();
    renderSoundboard();
  });

  // Expose refresh hook so panel-app.js can trigger re-sync when SSE state / theme / players update
  window.__FGC_AUDIO_UI__ = {
    refresh: renderAll,
    syncSfxList: (list) => { A.setCustomSfx(list); renderAll(); }
  };

  wireEvents();
  A.fetchSfxLibrary().then(() => renderAll());
})();
