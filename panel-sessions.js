/**
 * FGC Open Scorebars — Local Server & Live Sessions Inspector (Phase 7)
 * Makes the top-bar "Local Server OK · X overlay(s)" pill clickable and opens a clear,
 * bilingual diagnostic modal explaining what the local server is, every active OBS/browser/LAN
 * session currently open, the 64-session server cap, and the browser 6-tab HTTP/1.1 limit.
 */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const tr = (s) => (window.FGC_I18N?.t ? window.FGC_I18N.t(s) : s);

  const CLIENT_ICONS = {
    scorebar: '🎛',
    vs: '⚔️',
    results: '🏅',
    brackets: '🌿',
    audio: '🔊',
    panel: '🧭',
    other: '📺'
  };

  let lastSnap = null;
  let pollTimer = null;
  let isOpen = false;

  function fmtUptime(sec) {
    const s = Math.max(0, Math.floor(Number(sec) || 0));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const rem = s % 60;
    if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
    if (m > 0) return `${m}m ${String(rem).padStart(2, '0')}s`;
    return `${rem}s`;
  }

  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatSourceBadge(s) {
    if (s.source === 'obs-source') return { cls: 'is-obs', label: tr('OBS Browser Source') };
    if (s.source === 'obs-dock') return { cls: 'is-obs', label: tr('OBS Custom Dock') };
    if (s.source === 'lan-device') return { cls: 'is-lan', label: tr('LAN Device') };
    return { cls: 'is-local', label: tr('Local Browser') };
  }

  function updateHeaderPill(snap, online = true) {
    const pill = $('conn-pill');
    const txt = $('conn-text');
    if (!pill || !txt) return;
    if (!online) {
      pill.classList.remove('online', 'is-warn');
      pill.classList.add('offline');
      txt.textContent = tr('Server offline');
      return;
    }
    pill.classList.remove('offline');
    pill.classList.add('online');
    const active = Number(snap?.activeClients ?? snap?.connectedClients ?? 0);
    const max = Number(snap?.maxClients ?? 64);
    const ratio = max > 0 ? active / max : 0;
    pill.classList.toggle('is-warn', ratio >= 0.75);
    txt.textContent = tr(`Local Server OK · ${active} overlay(s)`);
  }

  function renderModal(snap, online = true) {
    const statusBadge = $('sess-status-badge');
    const meterFill = $('sess-meter-fill');
    const meterText = $('sess-meter-text');
    const listHost = $('sess-list-host');
    const offlineBox = $('sess-offline-box');
    const warnBox = $('sess-limit-warn');
    if (!statusBadge || !listHost) return;

    if (!online || !snap) {
      statusBadge.className = 'sess-badge is-offline';
      statusBadge.textContent = `● ${tr('SERVER OFFLINE')}`;
      if ($('sess-kpi-active')) $('sess-kpi-active').textContent = '0 / 64';
      if ($('sess-kpi-obs')) $('sess-kpi-obs').textContent = '0';
      if ($('sess-kpi-web')) $('sess-kpi-web').textContent = '0';
      if ($('sess-kpi-health')) $('sess-kpi-health').textContent = '—';
      if (meterFill) { meterFill.style.width = '0%'; meterFill.className = 'sess-meter-fill'; }
      if (meterText) meterText.textContent = tr('No connection to local server');
      if (offlineBox) offlineBox.style.display = 'block';
      if (warnBox) warnBox.style.display = 'none';
      listHost.innerHTML = `<div class="sess-empty">${esc(tr('Could not reach the local server. Make sure Start_Scorebar.bat (or node server.mjs) is running.'))}</div>`;
      return;
    }

    if (offlineBox) offlineBox.style.display = 'none';
    const active = Number(snap.activeClients || 0);
    const max = Number(snap.maxClients || 64);
    const pct = Math.min(100, Math.round((active / Math.max(1, max)) * 100));
    const brk = snap.breakdown || {};
    const webCount = Number(brk.localBrowser || 0) + Number(brk.lan || 0);

    statusBadge.className = 'sess-badge is-online';
    statusBadge.textContent = `● ${tr('ONLINE')} · :${snap.port || 8787}`;
    if ($('sess-kpi-active')) $('sess-kpi-active').textContent = `${active} / ${max}`;
    if ($('sess-kpi-obs')) $('sess-kpi-obs').textContent = String(brk.obs || 0);
    if ($('sess-kpi-web')) $('sess-kpi-web').textContent = String(webCount);
    if ($('sess-kpi-health')) $('sess-kpi-health').textContent = `v${snap.version || '2.8.0'} · ${fmtUptime(snap.uptimeSec)} · ${snap.memoryMb || 0} MB`;

    if (meterFill) {
      meterFill.style.width = `${Math.max(active > 0 ? 4 : 0, pct)}%`;
      meterFill.className = `sess-meter-fill ${pct >= 85 ? 'is-crit' : pct >= 60 ? 'is-warn' : ''}`;
    }
    if (meterText) {
      meterText.textContent = `${active} / ${max} ${tr('active sessions')} (${pct}%)`;
    }
    if (warnBox) {
      const nearCap = active >= Math.floor(max * 0.75);
      warnBox.style.display = nearCap ? 'block' : 'none';
    }

    const sessions = Array.isArray(snap.sessions) ? snap.sessions : [];
    if (!sessions.length) {
      listHost.innerHTML = `<div class="sess-empty">${esc(tr('No active SSE overlay sessions right now. Open your Scorebar, VS Splash, Brackets, or Results in OBS or a browser tab.'))}</div>`;
      return;
    }

    listHost.innerHTML = sessions.map((s) => {
      const icon = CLIENT_ICONS[s.client] || '📺';
      const srcBadge = formatSourceBadge(s);
      const ipLabel = s.isLocal ? tr('Local PC (127.0.0.1)') : s.ip;
      const clientLabel = tr(s.label || 'Overlay / Client');
      return `
        <div class="sess-row">
          <div class="sess-row-main">
            <span class="sess-ic">${icon}</span>
            <div class="sess-row-info">
              <div class="sess-row-title">
                <strong>${esc(clientLabel)}</strong>
                <span class="sess-src-tag ${srcBadge.cls}">${esc(srcBadge.label)}</span>
              </div>
              <div class="sess-row-meta">
                <span>${esc(s.browser || 'Browser')}</span>
                <span>·</span>
                <span>${esc(ipLabel)}</span>
                <span>·</span>
                <span>⏱ ${esc(fmtUptime(s.uptimeSec))}</span>
                <span>·</span>
                <code>#${esc(s.id)}</code>
              </div>
            </div>
          </div>
          <button type="button" class="sess-kick-btn" data-sess-kick="${esc(s.id)}" title="${esc(tr('Disconnect this SSE session (OBS/browser will reconnect automatically if still open)'))}">✕ ${esc(tr('Close'))}</button>
        </div>
      `;
    }).join('');
  }

  async function fetchSessions() {
    if (location.protocol !== 'http:' && location.protocol !== 'https:') {
      renderModal(null, false);
      return;
    }
    try {
      const r = await fetch('/api/sessions', { cache: 'no-store' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const snap = await r.json();
      lastSnap = snap;
      updateHeaderPill(snap, true);
      if (isOpen) renderModal(snap, true);
    } catch {
      updateHeaderPill(null, false);
      if (isOpen) renderModal(null, false);
    }
  }

  function openModal() {
    const modal = $('sessions-modal');
    if (!modal) return;
    isOpen = true;
    modal.classList.add('open');
    if (lastSnap) renderModal(lastSnap, true);
    fetchSessions();
    clearInterval(pollTimer);
    pollTimer = setInterval(() => {
      if (isOpen) fetchSessions();
    }, 2500);
  }

  function closeModal() {
    const modal = $('sessions-modal');
    if (!modal) return;
    isOpen = false;
    modal.classList.remove('open');
    clearInterval(pollTimer);
    pollTimer = null;
  }

  function init() {
    const pill = $('conn-pill');
    const modal = $('sessions-modal');
    if (!pill || !modal) return;

    pill.addEventListener('click', openModal);
    $('btn-close-sessions')?.addEventListener('click', closeModal);
    $('btn-refresh-sessions')?.addEventListener('click', () => {
      fetchSessions();
      window.__FGC_PANEL__?.toast?.(tr('↻ Session list refreshed'));
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeModal();
    });

    $('sess-list-host')?.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-sess-kick]');
      if (!btn) return;
      const id = btn.dataset.sessKick;
      btn.disabled = true;
      try {
        const r = await fetch('/api/sessions/disconnect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        const data = await r.json();
        if (data?.snapshot) {
          lastSnap = data.snapshot;
          updateHeaderPill(data.snapshot, true);
          renderModal(data.snapshot, true);
        } else {
          fetchSessions();
        }
        window.__FGC_PANEL__?.toast?.(tr('🔌 Session disconnected'));
      } catch {
        btn.disabled = false;
      }
    });

    // Listen to BroadcastChannel session updates if another tab is SSE leader
    try {
      const bc = new BroadcastChannel('fgc_open_scorebar_v1');
      bc.addEventListener('message', (ev) => {
        if (ev.data?.type === 'sessions' && ev.data.payload) {
          lastSnap = ev.data.payload;
          updateHeaderPill(lastSnap, true);
          if (isOpen) renderModal(lastSnap, true);
        }
      });
    } catch {}
  }

  window.__FGC_SESSIONS_UI__ = {
    open: openModal,
    close: closeModal,
    refresh: fetchSessions,
    onSessionsPush(snap) {
      if (!snap || typeof snap !== 'object') return;
      lastSnap = snap;
      updateHeaderPill(snap, true);
      if (isOpen) renderModal(snap, true);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
