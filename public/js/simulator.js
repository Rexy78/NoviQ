/**
 * Tech Stack Simulator Controller
 */
const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

let activeAnalysisData = null;
let baseDepthScore = 65;
let baseRelevanceScore = 70;

document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();

  const activeAnalysisId = localStorage.getItem('ci_active_analysis_id');
  if (!activeAnalysisId) {
    API.showToast('No active analysis found. Redirecting to upload...', 'info');
    setTimeout(() => window.location.href = '/upload.html', 1000);
    return;
  }

  try {
    const data = await API.request(`/api/analyses/${activeAnalysisId}`);
    activeAnalysisData = data.analysis;
    renderSimulatorPage(activeAnalysisData);
  } catch (err) {
    console.error('Error loading simulator data:', err);
    API.showToast('Failed to load project analysis data.', 'error');
  }
});

function renderSimulatorPage(analysis) {
  const targetRole = analysis.targetRole || 'Software Engineer';
  const rolePill = document.getElementById('sim-role-pill');
  if (rolePill) rolePill.innerHTML = `${getIcon('target')} Target Role: ${targetRole}`;

  const projAn = analysis.projectAnalysis || {};
  baseDepthScore = projAn.overallDepthScore || 65;
  baseRelevanceScore = projAn.overallRelevanceScore || 70;

  // Populate Project Dropdown
  const selectEl = document.getElementById('sim-proj-select');
  const projectList = projAn.projectList || [];

  if (selectEl) {
    if (projectList.length === 0) {
      selectEl.innerHTML = `<option value="default">Full Stack Web Project (Extracted)</option>`;
    } else {
      selectEl.innerHTML = projectList.map((p, idx) => `
        <option value="${idx}">${p.name || `Project ${idx + 1}`}</option>
      `).join('');
    }
  }

  onSimulatorProjectChange();
}

function onSimulatorProjectChange() {
  if (!activeAnalysisData) return;

  const projAn = activeAnalysisData.projectAnalysis || {};
  const projectList = projAn.projectList || [];
  const selectEl = document.getElementById('sim-proj-select');
  const selectedIdx = selectEl ? parseInt(selectEl.value) || 0 : 0;

  const currentProject = projectList[selectedIdx] || {
    name: 'Full Stack Web Platform',
    techStack: ['JavaScript', 'HTML/CSS', 'Node.js']
  };

  // Render current stack pills
  const stackContainer = document.getElementById('sim-current-stack-pills');
  if (stackContainer) {
    const stack = currentProject.techStack || ['JavaScript', 'React'];
    stackContainer.innerHTML = stack.map(t => `<span class="badge badge-purple">${t}</span>`).join('');
  }

  recalculateSimulation();
}

function recalculateSimulation() {
  const checkboxes = document.querySelectorAll('.sim-checkbox:checked');
  const selectedTechs = Array.from(checkboxes).map(cb => cb.value);

  const selectedCntEl = document.getElementById('sim-selected-cnt');
  if (selectedCntEl) selectedCntEl.textContent = `${selectedTechs.length} Enhancement${selectedTechs.length === 1 ? '' : 's'}`;

  // Calculate score boost
  let depthBoost = 0;
  let relevanceBoost = 0;

  selectedTechs.forEach(tech => {
    if (tech.includes('PostgreSQL') || tech.includes('Database')) {
      depthBoost += 8; relevanceBoost += 7;
    } else if (tech.includes('Docker') || tech.includes('Containerization')) {
      depthBoost += 10; relevanceBoost += 8;
    } else if (tech.includes('CI/CD')) {
      depthBoost += 7; relevanceBoost += 6;
    } else if (tech.includes('Testing') || tech.includes('Jest')) {
      depthBoost += 6; relevanceBoost += 5;
    } else if (tech.includes('Redis')) {
      depthBoost += 9; relevanceBoost += 7;
    } else if (tech.includes('GraphQL')) {
      depthBoost += 8; relevanceBoost += 6;
    } else if (tech.includes('Microservices')) {
      depthBoost += 12; relevanceBoost += 10;
    } else {
      depthBoost += 5; relevanceBoost += 4;
    }
  });

  const simulatedDepth = Math.min(100, baseDepthScore + depthBoost);
  const simulatedRelevance = Math.min(100, baseRelevanceScore + relevanceBoost);

  const depthValEl = document.getElementById('sim-depth-val');
  if (depthValEl) depthValEl.textContent = `${simulatedDepth} / 100`;

  const depthDiffEl = document.getElementById('sim-depth-diff');
  if (depthDiffEl) depthDiffEl.textContent = `+${depthBoost} pts potential boost`;

  const relValEl = document.getElementById('sim-relevance-val');
  if (relValEl) relValEl.textContent = `${simulatedRelevance} / 100`;

  const relDiffEl = document.getElementById('sim-relevance-diff');
  if (relDiffEl) relDiffEl.textContent = `+${relevanceBoost} pts potential boost`;

  // Render addressed requirements
  const reqContainer = document.getElementById('sim-addressed-requirements');
  if (reqContainer) {
    if (selectedTechs.length === 0) {
      reqContainer.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">Toggle enhancements above to simulate role requirement coverage...</span>`;
    } else {
      reqContainer.innerHTML = selectedTechs.map(t => `
        <span class="badge badge-pass" style="font-size:0.775rem;">✓ ${t.split('&')[0].trim()}</span>
      `).join('');
    }
  }
}
