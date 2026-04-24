(() => {
  // ─── Config ───────────────────────────────────────────────
  const script        = document.currentScript;
  const CLIENT_ID     = script.dataset.client;
  const WEBHOOK_URL   = '/api/chat';
  const GREETING      = script.dataset.greeting || "Hi! How can I help you today?";
  const AGENT_NAME    = script.dataset.name || "Alex";
  const SUBTITLE      = script.dataset.subtitle     || 'AI Assistant';
  const COLOR_PRIMARY = script.dataset.colorPrimary || '#1D6FFF';
  const COLOR_DARK    = script.dataset.colorDark    || '#1558D6';
  const COLOR_HEADER    = script.dataset.colorHeader  || '#060F22';
  const AUTO_OPEN_DELAY = script.dataset.autoOpen ? parseInt(script.dataset.autoOpen, 10) : null;
  const SESSION_ID      = crypto.randomUUID();

  // ─── Inject Fonts ─────────────────────────────────────────
  const fontLink = document.createElement('link');
  fontLink.rel  = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap';
  document.head.appendChild(fontLink);

  // ─── Inject Styles ────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --wg-navy:       ${COLOR_HEADER};
      --wg-blue:       ${COLOR_PRIMARY};
      --wg-blue-dark:  ${COLOR_DARK};
      --wg-blue-mid:   #4B8BF5;
      --wg-teal:       #00C9B1;
      --wg-green:      #22C55E;
      --wg-off-white:  #F6F9FF;
      --wg-white:      #FFFFFF;
      --wg-text:       #0D1B33;
      --wg-muted:      #637799;
      --wg-border:     #DDE6F5;
    }
    #wg-trigger {
      position: fixed;
      bottom: 28px; right: 28px;
      width: 56px; height: 56px;
      border-radius: 50%;
      background: var(--wg-blue);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 16px rgba(29,111,255,0.35);
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      z-index: 9999;
      outline: none;
    }
    #wg-trigger:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(29,111,255,0.48);
      background: var(--wg-blue-dark);
    }
    #wg-trigger:active { transform: translateY(0); }
    #wg-trigger svg {
      width: 24px; height: 24px; fill: white;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    #wg-trigger .wg-icon-chat,
    #wg-trigger .wg-icon-close { position: absolute; }
    #wg-trigger .wg-icon-close { opacity: 0; transform: rotate(-90deg) scale(0.7); }
    #wg-trigger.wg-open .wg-icon-chat { opacity: 0; transform: rotate(90deg) scale(0.7); }
    #wg-trigger.wg-open .wg-icon-close { opacity: 1; transform: rotate(0deg) scale(1); }
    #wg-badge {
      position: absolute; top: -3px; right: -3px;
      width: 18px; height: 18px;
      background: #EF4444; border-radius: 50%;
      border: 2px solid var(--wg-off-white);
      font-family: 'Manrope', sans-serif; font-size: 10px; font-weight: 700; color: white;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: scale(0);
      transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
    }
    #wg-badge.wg-show { opacity: 1; transform: scale(1); }
    #wg-panel {
      position: fixed;
      bottom: 96px; right: 28px;
      width: 380px; height: 520px;
      background: var(--wg-white);
      border-radius: 16px;
      box-shadow: 0 16px 56px rgba(6,15,34,0.22);
      display: flex; flex-direction: column; overflow: hidden;
      z-index: 9998;
      opacity: 0; transform: translateY(16px) scale(0.97);
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.2,0.64,1);
      transform-origin: bottom right;
    }
    #wg-panel.wg-open { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }
    .wg-header {
      background: var(--wg-navy);
      padding: 16px 20px;
      display: flex; align-items: center; gap: 12px;
      flex-shrink: 0; position: relative;
    }
    .wg-header::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--wg-blue) 0%, var(--wg-teal) 100%);
    }
    .wg-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, var(--wg-blue) 0%, var(--wg-teal) 100%);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; position: relative;
      font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 16px; color: white;
    }
    .wg-online-dot {
      position: absolute; bottom: 1px; right: 1px;
      width: 10px; height: 10px;
      background: var(--wg-green); border-radius: 50%;
      border: 2px solid var(--wg-navy);
    }
    .wg-header-info { flex: 1; min-width: 0; }
    .wg-header-name {
      font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 15px;
      color: white; letter-spacing: -0.01em; line-height: 1.2;
    }
    .wg-header-sub {
      font-family: 'DM Sans', sans-serif; font-size: 12px;
      color: rgba(255,255,255,0.5); margin-top: 2px;
    }
    .wg-close-btn {
      background: rgba(255,255,255,0.08); border: none; border-radius: 8px;
      width: 32px; height: 32px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s ease; flex-shrink: 0;
    }
    .wg-close-btn:hover { background: rgba(255,255,255,0.16); }
    .wg-close-btn svg { width: 16px; height: 16px; stroke: rgba(255,255,255,0.7); fill: none; }
    .wg-messages {
      flex: 1; overflow-y: auto;
      padding: 20px 16px;
      background: var(--wg-off-white);
      display: flex; flex-direction: column; gap: 10px;
      scroll-behavior: smooth;
    }
    .wg-messages::-webkit-scrollbar { width: 4px; }
    .wg-messages::-webkit-scrollbar-track { background: transparent; }
    .wg-messages::-webkit-scrollbar-thumb { background: var(--wg-border); border-radius: 4px; }
    .wg-msg-row { display: flex; animation: wgMsgIn 0.25s cubic-bezier(0.34,1.4,0.64,1) both; }
    @keyframes wgMsgIn {
      from { opacity: 0; transform: translateY(8px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .wg-msg-row.wg-agent { justify-content: flex-start; }
    .wg-msg-row.wg-user  { justify-content: flex-end; }
    .wg-bubble {
      max-width: 80%; padding: 11px 14px;
      font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.55;
      word-break: break-word;
    }
    .wg-msg-row.wg-agent .wg-bubble {
      background: var(--wg-white); color: var(--wg-text);
      border: 1px solid var(--wg-border);
      border-radius: 16px 16px 16px 4px;
      box-shadow: 0 2px 8px rgba(6,15,34,0.06);
    }
    .wg-msg-row.wg-user .wg-bubble {
      background: var(--wg-blue); color: white;
      border-radius: 16px 16px 4px 16px;
      box-shadow: 0 4px 14px rgba(29,111,255,0.28);
    }
    .wg-msg-row.wg-error .wg-bubble {
      background: #FEF2F2; color: #EF4444;
      border: 1px solid #FECACA;
      border-radius: 16px 16px 16px 4px; font-size: 13px;
    }
    .wg-typing {
      background: var(--wg-white); border: 1px solid var(--wg-border);
      border-radius: 16px 16px 16px 4px;
      padding: 13px 16px; display: flex; gap: 5px; align-items: center;
      box-shadow: 0 2px 8px rgba(6,15,34,0.06);
    }
    .wg-dot {
      width: 7px; height: 7px;
      background: var(--wg-muted); border-radius: 50%;
      animation: wgBounce 1.2s ease-in-out infinite;
    }
    .wg-dot:nth-child(2) { animation-delay: 0.15s; }
    .wg-dot:nth-child(3) { animation-delay: 0.30s; }
    @keyframes wgBounce {
      0%,60%,100% { transform: translateY(0); opacity: 0.4; }
      30%          { transform: translateY(-5px); opacity: 1; }
    }
    .wg-input-area {
      background: var(--wg-white); border-top: 1px solid var(--wg-border);
      padding: 12px 14px; display: flex; align-items: flex-end; gap: 10px; flex-shrink: 0;
    }
    .wg-input {
      flex: 1; font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.5;
      color: var(--wg-text); background: var(--wg-off-white);
      border: 1px solid var(--wg-border); border-radius: 10px;
      padding: 10px 14px; resize: none; outline: none;
      max-height: 100px; min-height: 40px;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .wg-input::placeholder { color: var(--wg-muted); }
    .wg-input:focus {
      border-color: var(--wg-blue-mid);
      box-shadow: 0 0 0 3px rgba(29,111,255,0.1);
    }
    .wg-send {
      width: 40px; height: 40px; background: var(--wg-blue);
      border: none; border-radius: 10px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
      box-shadow: 0 2px 8px rgba(29,111,255,0.3);
    }
    .wg-send:hover:not(:disabled) {
      transform: translateY(-1px); background: var(--wg-blue-dark);
      box-shadow: 0 4px 14px rgba(29,111,255,0.4);
    }
    .wg-send:active:not(:disabled) { transform: translateY(0); }
    .wg-send:disabled { background: var(--wg-border); cursor: not-allowed; box-shadow: none; }
    .wg-send svg { width: 18px; height: 18px; fill: white; }
    .wg-send:disabled svg { fill: var(--wg-muted); }
    @media (max-width: 480px) {
      #wg-panel { bottom: 0; right: 0; left: 0; width: 100%; height: 100dvh; border-radius: 0; }
      #wg-trigger { bottom: 20px; right: 20px; }
      #wg-trigger.wg-open { display: none; }
    }
  `;
  document.head.appendChild(style);

  // ─── Inject HTML ──────────────────────────────────────────
  document.body.insertAdjacentHTML('beforeend', `
    <button id="wg-trigger" aria-label="Open chat" aria-expanded="false">
      <svg class="wg-icon-chat" viewBox="0 0 24 24"><path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"/></svg>
      <svg class="wg-icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
      <span id="wg-badge" role="status" aria-live="polite"></span>
    </button>
    <div id="wg-panel" role="dialog" aria-label="Chat with Alex" aria-hidden="true">
      <div class="wg-header">
        <div class="wg-avatar">A<span class="wg-online-dot"></span></div>
        <div class="wg-header-info">
          <div class="wg-header-name">${AGENT_NAME}</div>
          <div class="wg-header-sub">${SUBTITLE}</div>
        </div>
        <button class="wg-close-btn" id="wg-close" aria-label="Close chat">
          <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="wg-messages" id="wg-messages" role="log" aria-live="polite"></div>
      <div class="wg-input-area">
        <textarea id="wg-input" class="wg-input" placeholder="Type a message…" rows="1" aria-label="Message input"></textarea>
        <button class="wg-send" id="wg-send" aria-label="Send message" disabled>
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `);

  // ─── Logic ────────────────────────────────────────────────
  const trigger  = document.getElementById('wg-trigger');
  const panel    = document.getElementById('wg-panel');
  const closeBtn = document.getElementById('wg-close');
  const messages = document.getElementById('wg-messages');
  const input    = document.getElementById('wg-input');
  const sendBtn  = document.getElementById('wg-send');
  const badge    = document.getElementById('wg-badge');

  let isOpen = false, isLoading = false, hasGreeted = false, unreadCount = 0, typingEl = null;

  function openPanel() {
    isOpen = true;
    panel.classList.add('wg-open');
    panel.setAttribute('aria-hidden', 'false');
    trigger.classList.add('wg-open');
    trigger.setAttribute('aria-expanded', 'true');
    clearBadge();
    if (!hasGreeted) { hasGreeted = true; setTimeout(() => addMessage('wg-agent', GREETING), 300); }
    setTimeout(() => input.focus(), 350);
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('wg-open');
    panel.setAttribute('aria-hidden', 'true');
    trigger.classList.remove('wg-open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', () => isOpen ? closePanel() : openPanel());
  closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen) closePanel(); });

  function showBadge(n) { badge.textContent = n > 9 ? '9+' : n; badge.classList.add('wg-show'); }
  function clearBadge() { unreadCount = 0; badge.classList.remove('wg-show'); }

  function scrollBottom() { requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; }); }

  function addMessage(role, text) {
    const row = document.createElement('div');
    row.className = `wg-msg-row ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'wg-bubble';
    text.split('\n').forEach((line, i) => {
      if (i > 0) bubble.appendChild(document.createElement('br'));
      bubble.appendChild(document.createTextNode(line));
    });
    row.appendChild(bubble);
    messages.appendChild(row);
    scrollBottom();
    if (role === 'wg-agent' && !isOpen) { unreadCount++; showBadge(unreadCount); }
  }

  function showTyping() {
    if (typingEl) return;
    const row = document.createElement('div');
    row.className = 'wg-msg-row wg-agent';
    const bubble = document.createElement('div');
    bubble.className = 'wg-typing';
    bubble.innerHTML = '<span class="wg-dot"></span><span class="wg-dot"></span><span class="wg-dot"></span>';
    row.appendChild(bubble);
    messages.appendChild(row);
    typingEl = row;
    scrollBottom();
  }

  function hideTyping() { if (typingEl) { typingEl.remove(); typingEl = null; } }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isLoading) return;
    isLoading = true;
    sendBtn.disabled = true;
    input.value = '';
    input.style.height = 'auto';
    addMessage('wg-user', text);
    showTyping();
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: text, sessionId: SESSION_ID, clientId: CLIENT_ID }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      hideTyping();
      addMessage('wg-agent', data.reply || data.output || data.message || 'Message received!');
    } catch (err) {
      hideTyping();
      const row = document.createElement('div');
      row.className = 'wg-msg-row wg-error';
      const bubble = document.createElement('div');
      bubble.className = 'wg-bubble';
      bubble.textContent = 'Sorry, something went wrong. Please try again.';
      row.appendChild(bubble);
      messages.appendChild(row);
      scrollBottom();
    } finally {
      isLoading = false;
      sendBtn.disabled = !input.value.trim();
    }
  }

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    sendBtn.disabled = !input.value.trim() || isLoading;
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  sendBtn.addEventListener('click', sendMessage);

  if (AUTO_OPEN_DELAY !== null && window.innerWidth > 768) {
    setTimeout(openPanel, AUTO_OPEN_DELAY);
  }
})();
