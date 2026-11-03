/**
 * Astra AI Interactive Product Tour Manager
 */
(function() {
  const TOUR_STORAGE_KEY = 'cn_astra_tour_completed';

  const astraLogoSvg = `
    <img src="/images/astra-logo.jpg" alt="Astra AI Copilot" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />
  `;

  // Tour step definitions matching prompt instructions
  const steps = [
    {
      id: 'sidebar',
      selector: '.sidebar, #sidebar-container',
      title: '1. Navigation Panel',
      desc: 'This is your navigation panel. You can access every CareerNova feature from here.',
      position: 'right'
    },
    {
      id: 'upload',
      selector: 'a[href="/upload.html"], #header-cta-container, .onboarding-card',
      title: '2. Resume Upload & Analysis',
      desc: 'Upload your resume here. Once uploaded, I\'ll analyze it and generate personalized career insights.',
      position: 'bottom'
    },
    {
      id: 'overview',
      selector: '.dash-header, #pre-analysis-view, .kpi-grid, .page-title',
      title: '3. Resume Intelligence Overview',
      desc: 'This dashboard summarizes your resume\'s overall quality, ATS compatibility, skills, and other key metrics.',
      position: 'bottom'
    },
    {
      id: 'ats',
      selector: 'a[href="/ats.html"]',
      title: '4. ATS Diagnostics',
      desc: 'Here you\'ll see how Applicant Tracking Systems interpret your resume and what improvements you can make.',
      position: 'top'
    },
    {
      id: 'skills',
      selector: 'a[href="/skills.html"]',
      title: '5. Skill Gap Intelligence',
      desc: 'I\'ll compare your resume against your selected target role and identify verified, partial, and missing skills.',
      position: 'top'
    },
    {
      id: 'projects',
      selector: 'a[href="/projects.html"]',
      title: '6. Project Intelligence',
      desc: 'This section evaluates your projects, their technical depth, and how effectively they support your career goals.',
      position: 'top'
    },
    {
      id: 'simulator',
      selector: 'a[href="/simulator.html"]',
      title: '7. Tech Stack Simulator',
      desc: 'Curious how adding a technology could improve your resume? This simulator predicts its impact before you update your resume.',
      position: 'top'
    },
    {
      id: 'editor',
      selector: 'a[href="/resume-editor.html"]',
      title: '8. Resume Studio',
      desc: 'Here you can improve individual resume sections using AI-powered suggestions while keeping full control over your content.',
      position: 'top'
    },
    {
      id: 'chatbot',
      selector: '#chat-trigger-btn',
      title: '9. Astra AI Assistant',
      desc: 'Whenever you need help, explanations, or recommendations, I\'m always here. Just click my icon and ask me anything.',
      position: 'left'
    }
  ];

  let currentStepIndex = 0;
  let overlayEl = null;
  let highlightBoxEl = null;
  let popoverEl = null;
  let welcomeModalEl = null;

  function init() {
    // Expose global methods
    window.AstraTour = {
      start: showWelcomeModal,
      startDirect: startTour,
      next: nextStep,
      prev: prevStep,
      end: endTour,
      reset: resetAndStart
    };

    if (window.Astra) {
      window.Astra.startTour = showWelcomeModal;
    }

    // Auto trigger for first-time visitors on authenticated pages
    const isAuthPage = window.location.pathname.includes('/login.html') || window.location.pathname.includes('/signup.html');
    if (!isAuthPage) {
      const hasCompleted = localStorage.getItem(TOUR_STORAGE_KEY);
      if (!hasCompleted) {
        // Delay slightly for DOM render
        setTimeout(() => {
          showWelcomeModal();
        }, 700);
      }
    }
  }

  function showWelcomeModal() {
    if (welcomeModalEl) return;

    welcomeModalEl = document.createElement('div');
    welcomeModalEl.className = 'astra-welcome-backdrop';
    welcomeModalEl.innerHTML = `
      <div class="astra-welcome-modal">
        <div style="width:72px; height:72px; border-radius:50%; overflow:hidden; margin:0 auto 1.25rem auto; box-shadow:0 8px 24px rgba(124, 58, 237, 0.35); border: 2px solid #FFFFFF;">
          <img src="/images/astra-logo.jpg" alt="Astra AI Copilot" style="width:100%; height:100%; object-fit:cover;" />
        </div>
        <h2 style="font-size:1.45rem; font-weight:800; color:var(--text-dark); margin-bottom:0.6rem; letter-spacing:-0.02em;">
          👋 Hi! I'm Astra, your AI career assistant.
        </h2>
        <p style="font-size:0.925rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.75rem;">
          I'll help you understand CareerNova and show you where everything is. This will only take about a minute.
        </p>
        <div style="display:flex; gap:0.75rem; justify-content:center;">
          <button id="astra-tour-skip-btn" class="btn btn-outline" style="padding:0.75rem 1.25rem;">
            Skip for now
          </button>
          <button id="astra-tour-start-btn" class="btn btn-primary" style="padding:0.75rem 1.75rem; font-weight:700;">
            🚀 Start Product Tour
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(welcomeModalEl);

    document.getElementById('astra-tour-start-btn').addEventListener('click', () => {
      closeWelcomeModal();
      startTour();
    });

    document.getElementById('astra-tour-skip-btn').addEventListener('click', () => {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
      closeWelcomeModal();
    });
  }

  function closeWelcomeModal() {
    if (welcomeModalEl) {
      welcomeModalEl.remove();
      welcomeModalEl = null;
    }
  }

  function startTour() {
    currentStepIndex = 0;
    createTourElements();
    renderStep(currentStepIndex);

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
  }

  function createTourElements() {
    if (overlayEl) return;

    // Overlay SVG for dark dimming cutout
    overlayEl = document.createElement('div');
    overlayEl.className = 'astra-tour-overlay';
    overlayEl.innerHTML = `
      <svg width="100%" height="100%" style="position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:auto;">
        <defs>
          <mask id="astra-spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect id="astra-mask-cutout" x="0" y="0" width="0" height="0" rx="12" fill="black" />
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="rgba(15, 23, 42, 0.72)" mask="url(#astra-spotlight-mask)" />
      </svg>
    `;
    document.body.appendChild(overlayEl);

    // Glowing highlight box
    highlightBoxEl = document.createElement('div');
    highlightBoxEl.className = 'astra-tour-highlight-box';
    document.body.appendChild(highlightBoxEl);

    // Popover box
    popoverEl = document.createElement('div');
    popoverEl.className = 'astra-tour-popover';
    document.body.appendChild(popoverEl);
  }

  function getTargetElement(step) {
    const selectors = step.selector.split(',').map(s => s.trim());
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.offsetParent !== null && window.getComputedStyle(el).display !== 'none') {
        return el;
      }
    }
    // Fallback to first matching selector in document even if hidden
    return document.querySelector(selectors[0]) || document.body;
  }

  function renderStep(index) {
    const step = steps[index];
    if (!step) {
      finishTour();
      return;
    }

    const targetEl = getTargetElement(step);

    // Scroll into view smoothly
    if (targetEl && targetEl !== document.body) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Position cutout and popover after brief scroll frame
    setTimeout(() => {
      positionCutoutAndPopover(targetEl, step, index);
    }, 150);
  }

  function positionCutoutAndPopover(targetEl, step, index) {
    if (!popoverEl || !overlayEl) return;

    const rect = targetEl ? targetEl.getBoundingClientRect() : { top: 100, left: 100, width: 300, height: 100 };
    const padding = 8;

    const cutoutX = Math.max(0, rect.left - padding);
    const cutoutY = Math.max(0, rect.top - padding);
    const cutoutWidth = rect.width + padding * 2;
    const cutoutHeight = rect.height + padding * 2;

    // Update SVG mask cutout
    const maskCutout = document.getElementById('astra-mask-cutout');
    if (maskCutout) {
      maskCutout.setAttribute('x', cutoutX);
      maskCutout.setAttribute('y', cutoutY);
      maskCutout.setAttribute('width', cutoutWidth);
      maskCutout.setAttribute('height', cutoutHeight);
    }

    // Update highlight box
    if (highlightBoxEl) {
      highlightBoxEl.style.left = `${cutoutX}px`;
      highlightBoxEl.style.top = `${cutoutY}px`;
      highlightBoxEl.style.width = `${cutoutWidth}px`;
      highlightBoxEl.style.height = `${cutoutHeight}px`;
    }

    // Render popover content
    const isFirst = index === 0;
    const isLast = index === steps.length - 1;

    popoverEl.innerHTML = `
      <div class="astra-popover-header">
        <div class="astra-popover-brand">
          <div class="astra-popover-avatar">
            ${astraLogoSvg}
          </div>
          <div class="astra-popover-title">Astra AI Guide</div>
        </div>
        <div class="astra-popover-progress">Step ${index + 1} of ${steps.length}</div>
      </div>

      <div class="astra-popover-body">
        <div class="astra-popover-step-title">${step.title}</div>
        <div class="astra-popover-step-desc">${step.desc}</div>
      </div>

      <div class="astra-popover-footer">
        <button id="astra-popover-skip" class="btn btn-outline btn-sm" style="font-size:0.8rem; border:none; color:var(--text-muted);">
          Skip Tour
        </button>
        <div class="astra-popover-btn-group">
          ${!isFirst ? `<button id="astra-popover-prev" class="btn btn-outline btn-sm">&larr; Back</button>` : ''}
          <button id="astra-popover-next" class="btn btn-primary btn-sm" style="font-weight:700;">
            ${isLast ? 'Finish 🎉' : 'Next &rarr;'}
          </button>
        </div>
      </div>
    `;

    // Position Popover intelligently near target element
    positionPopoverBox(cutoutX, cutoutY, cutoutWidth, cutoutHeight, step.position);

    // Event handlers
    document.getElementById('astra-popover-skip').addEventListener('click', endTour);
    if (!isFirst) {
      document.getElementById('astra-popover-prev').addEventListener('click', prevStep);
    }
    document.getElementById('astra-popover-next').addEventListener('click', isLast ? finishTour : nextStep);
  }

  function positionPopoverBox(x, y, w, h, preferredPos) {
    const popWidth = 390;
    const popHeight = popoverEl.offsetHeight || 220;
    const margin = 16;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    let popX = x;
    let popY = y + h + margin;

    if (preferredPos === 'right' && x + w + margin + popWidth < viewportW) {
      popX = x + w + margin;
      popY = Math.min(y, viewportH - popHeight - margin);
    } else if (preferredPos === 'left' && x - margin - popWidth > 0) {
      popX = x - margin - popWidth;
      popY = Math.min(y, viewportH - popHeight - margin);
    } else if (preferredPos === 'top' && y - margin - popHeight > 0) {
      popY = y - margin - popHeight;
      popX = Math.min(x, viewportW - popWidth - margin);
    } else {
      // Default bottom or fallback
      popY = y + h + margin;
      if (popY + popHeight > viewportH) {
        popY = Math.max(margin, y - popHeight - margin);
      }
      popX = Math.min(Math.max(margin, x), viewportW - popWidth - margin);
    }

    // Keep bounded in viewport
    popX = Math.max(margin, Math.min(popX, viewportW - popWidth - margin));
    popY = Math.max(margin, Math.min(popY, viewportH - popHeight - margin));

    popoverEl.style.left = `${popX}px`;
    popoverEl.style.top = `${popY}px`;
  }

  function handleReposition() {
    if (overlayEl && popoverEl && steps[currentStepIndex]) {
      const step = steps[currentStepIndex];
      const targetEl = getTargetElement(step);
      positionCutoutAndPopover(targetEl, step, currentStepIndex);
    }
  }

  function nextStep() {
    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      renderStep(currentStepIndex);
    } else {
      finishTour();
    }
  }

  function prevStep() {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderStep(currentStepIndex);
    }
  }

  function finishTour() {
    endTour();
    showCompletionModal();
  }

  function endTour() {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');

    if (overlayEl) { overlayEl.remove(); overlayEl = null; }
    if (highlightBoxEl) { highlightBoxEl.remove(); highlightBoxEl = null; }
    if (popoverEl) { popoverEl.remove(); popoverEl = null; }

    window.removeEventListener('resize', handleReposition);
    window.removeEventListener('scroll', handleReposition, true);
  }

  function showCompletionModal() {
    const modal = document.createElement('div');
    modal.className = 'astra-welcome-backdrop';
    modal.innerHTML = `
      <div class="astra-welcome-modal">
        <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, #10B981, #059669); color:#FFFFFF; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem auto; box-shadow:0 8px 24px rgba(16, 185, 129, 0.4); font-size:1.8rem;">
          🎉
        </div>
        <h2 style="font-size:1.45rem; font-weight:800; color:var(--text-dark); margin-bottom:0.6rem; letter-spacing:-0.02em;">
          You're all set!
        </h2>
        <p style="font-size:0.925rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.75rem;">
          You've explored all key areas of CareerNova. Whenever you need guidance, analysis explanations, or recommendations, just click my Astra icon in the bottom right corner.
        </p>
        <div style="display:flex; gap:0.75rem; justify-content:center;">
          <button id="astra-tour-restart-btn" class="btn btn-outline" style="padding:0.75rem 1.25rem;">
            🔄 Restart Tour
          </button>
          <button id="astra-tour-finish-btn" class="btn btn-primary" style="padding:0.75rem 1.75rem; font-weight:700;">
            🚀 Start Exploring
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('astra-tour-finish-btn').addEventListener('click', () => {
      modal.remove();
    });

    document.getElementById('astra-tour-restart-btn').addEventListener('click', () => {
      modal.remove();
      resetAndStart();
    });
  }

  function resetAndStart() {
    localStorage.removeItem(TOUR_STORAGE_KEY);
    startTour();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
