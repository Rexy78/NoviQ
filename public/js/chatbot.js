/**
 * Persistent Astra AI Assistant Drawer & Application Navigation Handler
 */
document.addEventListener('DOMContentLoaded', () => {
  // Skip on unauthenticated/auth pages
  if (window.location.pathname === '/' || window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('signup.html')) {
    return;
  }

  const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

  // Astra Logo Image Template
  const astraLogoSvg = `
    <img src="/images/astra-logo.jpg" alt="Astra Logo" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />
  `;

  const widget = document.createElement('div');
  widget.id = 'career-ai-widget';
  widget.innerHTML = `
    <style>
      #chat-trigger-btn {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7C3AED, #4F46E5);
        color: #FFFFFF;
        border: 2px solid #FFFFFF;
        cursor: pointer;
        box-shadow: 0 8px 24px -4px rgba(124, 58, 237, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 990;
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
      }
      #chat-trigger-btn:hover {
        transform: scale(1.08);
        box-shadow: 0 12px 28px -2px rgba(124, 58, 237, 0.5);
      }
      .chat-trigger-badge {
        position: absolute;
        top: -3px;
        right: -3px;
        width: 14px;
        height: 14px;
        background: #10B981;
        border: 2px solid #FFFFFF;
        border-radius: 50%;
      }
      #chat-drawer {
        position: fixed;
        bottom: 5.5rem;
        right: 1.5rem;
        width: 420px;
        height: 580px;
        max-width: calc(100vw - 2rem);
        background: #FFFFFF;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        box-shadow: 0 16px 40px -8px rgba(0,0,0,0.15);
        display: flex;
        flex-direction: column;
        z-index: 991;
        opacity: 0;
        visibility: hidden;
        transform: translateY(16px) scale(0.96);
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #chat-drawer.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }
      .chat-header {
        background: linear-gradient(135deg, #FAF5FF, #EDE9FE);
        padding: 0.9rem 1.25rem;
        border-bottom: 1px solid var(--border-purple);
        border-top-left-radius: var(--radius-xl);
        border-top-right-radius: var(--radius-xl);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .chat-header-brand {
        display: flex;
        align-items: center;
        gap: 0.65rem;
      }
      .astra-logo-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7C3AED, #A855F7);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
        flex-shrink: 0;
      }
      .chat-title-text {
        font-weight: 800;
        color: var(--primary-purple-dark);
        font-size: 0.95rem;
        line-height: 1.2;
      }
      .chat-sub-text {
        font-size: 0.725rem;
        color: var(--text-muted);
      }
      .chat-body {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        background: #FAFAFD;
      }
      .chat-msg-row {
        display: flex;
        gap: 0.6rem;
        align-items: flex-start;
      }
      .chat-msg-row.user-row {
        justify-content: flex-end;
      }
      .chat-msg {
        max-width: 88%;
        padding: 0.85rem 1.05rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        line-height: 1.5;
      }
      .chat-msg-user {
        background: var(--primary-purple);
        color: #FFFFFF;
        border-bottom-right-radius: 2px;
      }
      .chat-msg-assistant {
        background: #FFFFFF;
        color: var(--text-dark);
        border: 1px solid var(--border-color);
        border-bottom-left-radius: 2px;
        box-shadow: var(--shadow-sm);
      }
      .chat-nav-btn {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        width: 100%;
        padding: 0.55rem 0.85rem;
        margin-top: 0.4rem;
        background: var(--bg-purple-light);
        border: 1px solid var(--border-purple);
        border-radius: var(--radius-sm);
        color: var(--primary-purple-dark);
        font-weight: 600;
        font-size: 0.825rem;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      .chat-nav-btn:hover {
        background: var(--primary-purple);
        color: #FFFFFF;
        border-color: var(--primary-purple);
      }
      .chat-chip-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 0.6rem;
      }
      .chat-chip {
        background: #FFFFFF;
        border: 1px solid var(--border-purple);
        border-radius: 20px;
        padding: 0.35rem 0.75rem;
        font-size: 0.775rem;
        color: var(--primary-purple-dark);
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease;
      }
      .chat-chip:hover {
        background: var(--primary-purple);
        color: #FFFFFF;
      }
      .chat-footer {
        padding: 0.75rem;
        border-top: 1px solid var(--border-color);
        background: #FFFFFF;
        display: flex;
        gap: 0.5rem;
        border-bottom-left-radius: var(--radius-xl);
        border-bottom-right-radius: var(--radius-xl);
      }
      .chat-input {
        flex: 1;
        padding: 0.6rem 0.85rem;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        outline: none;
      }
      .chat-input:focus {
        border-color: var(--primary-purple);
      }
    </style>

    <button id="chat-trigger-btn" title="Astra AI Application Guide & Advisor">
      <div class="chat-trigger-badge"></div>
      ${astraLogoSvg}
    </button>

    <div id="chat-drawer">
      <div class="chat-header">
        <div class="chat-header-brand">
          <div class="astra-logo-avatar">
            ${astraLogoSvg}
          </div>
          <div>
            <div class="chat-title-text">Astra AI Assistant</div>
            <div class="chat-sub-text">Interactive Application Guide</div>
          </div>
        </div>
        <button id="chat-close-btn" style="background:none;border:none;cursor:pointer;color:var(--text-muted);display:flex;align-items:center;padding:0.2rem;">
          ${getIcon('x')}
        </button>
      </div>

      <div class="chat-body" id="chat-msg-list">
        <div class="chat-msg-row">
          <div class="astra-logo-avatar" style="width:26px; height:26px;">
            ${astraLogoSvg}
          </div>
          <div class="chat-msg chat-msg-assistant">
            <strong>Hello! I'm Astra, your AI Guide to Career Nova.</strong> 👋<br>
            I am here to navigate you step-by-step through our application features. Where would you like to go first?

            <div style="margin-top:0.6rem; display:flex; flex-direction:column; gap:0.35rem;">
              <button class="chat-nav-btn" data-nav="/upload.html">
                <span>📤 1. Upload & Analyze Resume</span>
                <span>&rarr;</span>
              </button>
              <button class="chat-nav-btn" data-nav="/ats.html">
                <span>📊 2. Check ATS Compatibility Score</span>
                <span>&rarr;</span>
              </button>
              <button class="chat-nav-btn" data-nav="/skills.html">
                <span>🧠 3. Skill Gap Diagnostics</span>
                <span>&rarr;</span>
              </button>
              <button class="chat-nav-btn" data-nav="/simulator.html">
                <span>⚡ 4. Tech Stack Impact Simulator</span>
                <span>&rarr;</span>
              </button>
              <button class="chat-nav-btn" data-nav="/resume-editor.html">
                <span>📝 5. Resume Improvement Studio</span>
                <span>&rarr;</span>
              </button>
              <button class="chat-nav-btn" data-nav="/roadmap.html">
                <span>🗺️ 6. Career Roadmap & Milestones</span>
                <span>&rarr;</span>
              </button>
            </div>

            <div style="font-size:0.775rem; color:var(--text-muted); margin-top:0.75rem; font-weight:600;">
              Or click a question to get guided:
            </div>
            <div class="chat-chip-list">
              <span class="chat-chip" data-tour="true" style="background:var(--bg-purple-light); border-color:var(--border-purple);">🧭 Start Product Tour</span>
              <span class="chat-chip" data-ask="Where do I upload my resume?">📤 Upload Resume</span>
              <span class="chat-chip" data-ask="How does ATS scoring work?">🎯 ATS Keyword Match</span>
              <span class="chat-chip" data-ask="How do I simulate tech upgrades?">⚡ Tech Simulator</span>
            </div>
          </div>
        </div>
      </div>

      <form class="chat-footer" id="chat-form">
        <input type="text" id="chat-input-field" class="chat-input" placeholder="Ask Astra to guide or navigate you..." required autocomplete="off" />
        <button type="submit" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; justify-content:center; padding:0.5rem 0.85rem;">
          ${getIcon('send')}
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(widget);

  const triggerBtn = document.getElementById('chat-trigger-btn');
  const drawer = document.getElementById('chat-drawer');
  const closeBtn = document.getElementById('chat-close-btn');
  const chatForm = document.getElementById('chat-form');
  const inputField = document.getElementById('chat-input-field');
  const msgList = document.getElementById('chat-msg-list');

  const toggleDrawer = () => {
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open')) inputField.focus();
  };

  triggerBtn.addEventListener('click', toggleDrawer);
  closeBtn.addEventListener('click', () => drawer.classList.remove('open'));

  // Event delegation for navigation buttons and quick chips
  msgList.addEventListener('click', (e) => {
    const tourChip = e.target.closest('[data-tour="true"]');
    if (tourChip) {
      drawer.classList.remove('open');
      if (window.AstraTour) window.AstraTour.start();
      return;
    }

    const navBtn = e.target.closest('.chat-nav-btn');
    if (navBtn) {
      const targetUrl = navBtn.getAttribute('data-nav');
      if (targetUrl) {
        window.location.href = targetUrl;
        return;
      }
    }

    const chip = e.target.closest('.chat-chip');
    if (chip) {
      const query = chip.getAttribute('data-ask');
      if (query) {
        sendQueryToAstra(query);
      }
    }
  });

  // Client-side quick response generator for application navigation queries
  function getAppNavigationGuide(messageText) {
    const lower = messageText.toLowerCase();

    if (lower.includes('tour') || lower.includes('step-by-step') || lower.includes('show me around')) {
      setTimeout(() => {
        drawer.classList.remove('open');
        if (window.AstraTour) window.AstraTour.start();
      }, 300);
      return `<strong>Launching interactive Astra Product Tour...</strong> 🚀`;
    }

    if (lower.includes('full app tour') || lower.includes('step-by-step') || lower.includes('how do i use') || lower.includes('how to use') || lower.includes('guide me')) {
      return `
        <strong>Here is your step-by-step guide to using Career Nova:</strong><br><br>
        <strong>Step 1: Upload Resume</strong> — Submit your PDF or text resume alongside your target job role.<br>
        <button class="chat-nav-btn" data-nav="/upload.html"><span>📤 Go to Resume Upload</span><span>&rarr;</span></button>
        <br>
        <strong>Step 2: Review ATS Keyword Compatibility</strong> — See matched, partial, and missing keywords.<br>
        <button class="chat-nav-btn" data-nav="/ats.html"><span>📊 Go to ATS Score Breakdown</span><span>&rarr;</span></button>
        <br>
        <strong>Step 3: Analyze Skill Gaps</strong> — Inspect critical missing role requirements.<br>
        <button class="chat-nav-btn" data-nav="/skills.html"><span>🧠 Go to Skill Gap Diagnostics</span><span>&rarr;</span></button>
        <br>
        <strong>Step 4: Tech Stack Simulator</strong> — Test adding new frameworks to measure ATS score boosts.<br>
        <button class="chat-nav-btn" data-nav="/simulator.html"><span>⚡ Go to Tech Simulator</span><span>&rarr;</span></button>
        <br>
        <strong>Step 5: Resume Studio</strong> — Edit and polish impact bullet points.<br>
        <button class="chat-nav-btn" data-nav="/resume-editor.html"><span>📝 Go to Resume Studio</span><span>&rarr;</span></button>
      `;
    }

    if (lower.includes('upload') || lower.includes('analyze') || lower.includes('where do i upload')) {
      return `
        <strong>Resume Upload & Role Targeting:</strong><br>
        Navigate to the Analyze page to upload your resume (PDF/DOCX/TXT) and select your target job role (e.g. Senior Frontend Engineer).
        <button class="chat-nav-btn" data-nav="/upload.html"><span>📤 Open Resume Upload Page</span><span>&rarr;</span></button>
      `;
    }

    if (lower.includes('ats') || lower.includes('keyword') || lower.includes('compatibility')) {
      return `
        <strong>ATS Compatibility Breakdown:</strong><br>
        View detailed keyword frequency match, section parsing safety, and formatting risk levels.
        <button class="chat-nav-btn" data-nav="/ats.html"><span>📊 Open ATS Breakdown Page</span><span>&rarr;</span></button>
      `;
    }

    if (lower.includes('simulator') || lower.includes('upgrade') || lower.includes('tech stack')) {
      return `
        <strong>Tech Stack Simulator:</strong><br>
        Simulate adding architectural upgrades (e.g., GraphQL, Docker, Redis) to your project portfolio and preview your updated ATS fit score.
        <button class="chat-nav-btn" data-nav="/simulator.html"><span>⚡ Open Tech Simulator</span><span>&rarr;</span></button>
      `;
    }

    if (lower.includes('editor') || lower.includes('bullet') || lower.includes('studio') || lower.includes('edit resume')) {
      return `
        <strong>Resume Improvement Studio:</strong><br>
        Refine experience bullets with quantifiable metrics (%, $, scale) and export your structured resume.
        <button class="chat-nav-btn" data-nav="/resume-editor.html"><span>📝 Open Resume Studio</span><span>&rarr;</span></button>
      `;
    }

    return null; // Fallback to AI server endpoint
  }

  async function sendQueryToAstra(messageText) {
    if (!messageText) return;

    if (!drawer.classList.contains('open')) {
      drawer.classList.add('open');
    }

    // Append User Message Row
    const userRow = document.createElement('div');
    userRow.className = 'chat-msg-row user-row';
    userRow.innerHTML = `
      <div class="chat-msg chat-msg-user">
        ${escapeHtml(messageText)}
      </div>
    `;
    msgList.appendChild(userRow);
    msgList.scrollTop = msgList.scrollHeight;

    // Check for instant local application navigation guidance
    const localNavGuide = getAppNavigationGuide(messageText);

    // Append Assistant Loading Row
    const loadingRow = document.createElement('div');
    loadingRow.className = 'chat-msg-row';
    loadingRow.innerHTML = `
      <div class="astra-logo-avatar" style="width:26px; height:26px;">
        ${astraLogoSvg}
      </div>
      <div class="chat-msg chat-msg-assistant">
        <span class="spinner spinner-purple"></span> Astra is thinking...
      </div>
    `;
    msgList.appendChild(loadingRow);
    msgList.scrollTop = msgList.scrollHeight;

    if (localNavGuide) {
      setTimeout(() => {
        loadingRow.querySelector('.chat-msg').innerHTML = localNavGuide;
        msgList.scrollTop = msgList.scrollHeight;
      }, 300);
      return;
    }

    // Fallback to AI Chat Server Endpoint
    const activeAnalysisId = localStorage.getItem('ci_active_analysis_id');

    try {
      const data = await API.request('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: messageText,
          analysisId: activeAnalysisId
        })
      });

      const assistantContent = data.answer || "I've reviewed your request! Use the buttons below to navigate to key sections.";
      loadingRow.querySelector('.chat-msg').innerHTML = formatAstraResponse(assistantContent);
    } catch (err) {
      loadingRow.querySelector('.chat-msg').innerHTML = `
        I had trouble connecting to the intelligence server. You can navigate directly using these quick links:
        <button class="chat-nav-btn" data-nav="/career-hub.html"><span>🏠 Career Hub Dashboard</span><span>&rarr;</span></button>
        <button class="chat-nav-btn" data-nav="/upload.html"><span>📤 Upload Resume</span><span>&rarr;</span></button>
      `;
    }

    msgList.scrollTop = msgList.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatAstraResponse(rawText) {
    if (!rawText) return '';

    // If text is already HTML (e.g. local navigation guide template), return as is
    if (rawText.includes('<button') || rawText.includes('<div') || rawText.includes('<strong')) {
      return rawText;
    }

    const lines = rawText.split('\n');
    let html = '';
    let inList = false;
    let isOrdered = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (!line) {
        if (inList) {
          html += isOrdered ? '</ol>' : '</ul>';
          inList = false;
        }
        html += '<div style="height:0.35rem;"></div>';
        continue;
      }

      // Format inline bolding, italics, and code snippets
      const formatInline = (str) => {
        return escapeHtml(str)
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`([^`]+)`/g, '<code style="background:#f1f5f9; padding:2px 4px; border-radius:4px; font-family:monospace; font-size:0.8rem;">$1</code>');
      };

      // Convert Markdown headings (#, ##, ###, ####)
      if (line.startsWith('#')) {
        if (inList) { html += isOrdered ? '</ol>' : '</ul>'; inList = false; }
        const cleanHead = line.replace(/^#+\s*/, '');
        html += `<div style="font-weight:700; font-size:0.9rem; color:var(--primary-purple-dark); margin-top:0.5rem; margin-bottom:0.25rem;">${formatInline(cleanHead)}</div>`;
        continue;
      }

      // Convert unordered bullet points (* item, - item, + item, • item)
      if (/^[\*\-\+•]\s+/.test(line)) {
        if (!inList || isOrdered) {
          if (inList) html += isOrdered ? '</ol>' : '</ul>';
          html += '<ul style="margin:0.25rem 0; padding-left:1.1rem; list-style-type:disc; font-size:0.85rem; line-height:1.45;">';
          inList = true;
          isOrdered = false;
        }
        const itemContent = line.replace(/^[\*\-\+•]\s+/, '');
        html += `<li style="margin-bottom:0.2rem;">${formatInline(itemContent)}</li>`;
        continue;
      }

      // Convert ordered bullet points (1. item, 2. item)
      if (/^\d+\.\s+/.test(line)) {
        if (!inList || !isOrdered) {
          if (inList) html += isOrdered ? '</ol>' : '</ul>';
          html += '<ol style="margin:0.25rem 0; padding-left:1.1rem; font-size:0.85rem; line-height:1.45;">';
          inList = true;
          isOrdered = true;
        }
        const itemContent = line.replace(/^\d+\.\s+/, '');
        html += `<li style="margin-bottom:0.2rem;">${formatInline(itemContent)}</li>`;
        continue;
      }

      if (inList) {
        html += isOrdered ? '</ol>' : '</ul>';
        inList = false;
      }

      // Standard text line
      html += `<div style="margin-bottom:0.35rem; line-height:1.45;">${formatInline(line)}</div>`;
    }

    if (inList) {
      html += isOrdered ? '</ol>' : '</ul>';
    }

    // Automatically append quick navigation buttons if specific tool keywords are mentioned in text
    let extraNavs = '';
    if (rawText.includes('ATS') && !rawText.includes('chat-nav-btn')) {
      extraNavs += `<button class="chat-nav-btn" data-nav="/ats.html"><span>📊 View ATS Compatibility</span><span>&rarr;</span></button>`;
    }
    if ((rawText.includes('skill') || rawText.includes('Skill')) && !rawText.includes('chat-nav-btn')) {
      extraNavs += `<button class="chat-nav-btn" data-nav="/skills.html"><span>🧠 View Skill Gap Intelligence</span><span>&rarr;</span></button>`;
    }
    if ((rawText.includes('simulator') || rawText.includes('Simulator')) && !rawText.includes('chat-nav-btn')) {
      extraNavs += `<button class="chat-nav-btn" data-nav="/simulator.html"><span>⚡ Open Tech Stack Simulator</span><span>&rarr;</span></button>`;
    }

    return html + (extraNavs ? `<div style="margin-top:0.5rem;">${extraNavs}</div>` : '');
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = inputField.value.trim();
    if (!query) return;
    inputField.value = '';
    sendQueryToAstra(query);
  });

  // Global Astra API
  const AstraAPI = {
    open() {
      if (!drawer.classList.contains('open')) drawer.classList.add('open');
      inputField.focus();
    },
    ask(promptText) {
      sendQueryToAstra(promptText);
    }
  };

  window.Astra = AstraAPI;
  window.Nova = AstraAPI; // Backward compatibility
});


