/**
 * Unified Sidebar Navigation Injector
 */
document.addEventListener('DOMContentLoaded', () => {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (!sidebarContainer) return;

  const user = API.getUser() || { name: 'Career Intelligence User', profileRole: 'Target Career' };
  const currentPath = window.location.pathname;

  const activeClass = (path) => currentPath.endsWith(path) ? 'active' : '';
  const icon = (name) => (window.Icons ? Icons.get(name) : '');

  sidebarContainer.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-top-section">
        <div class="brand-header-row">
          <a href="/career-hub.html" class="brand-logo" style="padding:0; margin-bottom:0; display:block; width:100%;">
            <img src="/images/app-logo.jpg" alt="Application Logo" style="height: 52px; width: 100%; max-width: 210px; border-radius: 10px; object-fit: contain; object-position: left center; display: block;" />
          </a>
        </div>

        <ul class="nav-menu">
          <li class="nav-item ${activeClass('career-hub.html')}">
            <a href="/career-hub.html">
              ${icon('layout')}
              <span>Career Hub</span>
            </a>
          </li>
          <li class="nav-item ${activeClass('upload.html')}">
            <a href="/upload.html">
              ${icon('upload')}
              <span>Analyze Resume</span>
            </a>
          </li>
          <li class="nav-item ${activeClass('ats.html')}">
            <a href="/ats.html">
              ${icon('scan-search')}
              <span>ATS Score</span>
            </a>
          </li>
          <li class="nav-item ${activeClass('skills.html')}">
            <a href="/skills.html">
              ${icon('brain')}
              <span>Skill Gaps</span>
            </a>
          </li>
          <li class="nav-item ${activeClass('projects.html')}">
            <a href="/projects.html">
              ${icon('folder')}
              <span>Projects</span>
            </a>
          </li>
          <li class="nav-item ${activeClass('simulator.html')}">
            <a href="/simulator.html">
              ${icon('zap')}
              <span>Tech Simulator</span>
            </a>
          </li>
          <li class="nav-item ${activeClass('resume-editor.html')}">
            <a href="/resume-editor.html">
              ${icon('sparkles')}
              <span>Resume Studio</span>
            </a>
          </li>
          <li class="nav-item ${activeClass('roadmap.html')}">
            <a href="/roadmap.html">
              ${icon('route')}
              <span>Career Roadmap</span>
            </a>
          </li>
          <li class="nav-item ${activeClass('courses.html')}">
            <a href="/courses.html">
              ${icon('book-open')}
              <span>Courses</span>
            </a>
          </li>
          <li class="nav-item ${activeClass('history.html')}">
            <a href="/history.html">
              ${icon('history')}
              <span>Analysis History</span>
            </a>
          </li>
          <li class="nav-item" style="margin-top: 0.5rem; border-top: 1px solid var(--border-color); padding-top: 0.5rem;">
            <a href="javascript:void(0)" onclick="window.AstraTour ? window.AstraTour.start() : (window.Astra && window.Astra.startTour ? window.Astra.startTour() : null)" style="color: var(--primary-purple); font-weight: 600;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 12 8"/></svg>
              <span>Take Product Tour</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="user-profile-badge">
        <div class="avatar-circle">${(user.name || 'U').charAt(0).toUpperCase()}</div>
        <div class="user-info">
          <div class="user-name" title="${user.name || 'User'}">${user.name || 'User'}</div>
          <div class="user-role-label" title="${user.profileRole || 'Career Profile'}">${user.profileRole || 'Career Profile'}</div>
        </div>
        <button onclick="Auth.logout()" class="logout-icon-btn" title="Sign Out">
          ${icon('log-out')}
          <span>Logout</span>
        </button>
      </div>
    </aside>
  `;

  // Auto-inject tour.js if not already present
  if (!document.querySelector('script[src*="tour.js"]')) {
    const tourScript = document.createElement('script');
    tourScript.src = '/js/tour.js';
    document.head.appendChild(tourScript);
  }
});
