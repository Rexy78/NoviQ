/**
 * Projects & Simulator Dashboard Controller
 */
const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

let globalAnalysis = null;
let selectedProjIndex = 0;

document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();

  const activeAnalysisId = localStorage.getItem('ci_active_analysis_id');
  if (!activeAnalysisId) {
    API.showToast('No active analysis found. Redirecting to upload...', 'info');
    setTimeout(() => window.location.href = '/upload.html', 1000);
    return;
  }

  // Set card icons
  const i1 = document.getElementById('proj-icon-1'); if (i1) i1.innerHTML = getIcon('cpu');
  const i2 = document.getElementById('proj-icon-2'); if (i2) i2.innerHTML = getIcon('folder');
  const i3 = document.getElementById('proj-icon-3'); if (i3) i3.innerHTML = getIcon('list');

  try {
    const data = await API.request(`/api/analyses/${activeAnalysisId}`);
    globalAnalysis = data.analysis;
    renderProjectsPage(globalAnalysis);
  } catch (err) {
    console.error('Error fetching projects:', err);
    API.showToast('Failed to load project intelligence.', 'error');
  }
});

function switchProjTab(tabName) {
  const diagView = document.getElementById('view-diagnostic');
  const simView = document.getElementById('view-simulator');

  const btnDiag = document.getElementById('tab-btn-diagnostic');
  const btnSim = document.getElementById('tab-btn-simulator');

  if (tabName === 'diagnostic') {
    if (diagView) diagView.style.display = 'block';
    if (simView) simView.style.display = 'none';

    if (btnDiag) btnDiag.className = 'btn btn-primary';
    if (btnSim) btnSim.className = 'btn btn-outline';
  } else {
    if (diagView) diagView.style.display = 'none';
    if (simView) simView.style.display = 'block';

    if (btnDiag) btnDiag.className = 'btn btn-outline';
    if (btnSim) btnSim.className = 'btn btn-primary';

    // Initialize Simulator UI if loaded
    if (globalAnalysis) {
      initSimulator(globalAnalysis);
    }
  }
}

function toggleProjDetail(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById(`toggle-icon-${id}`);
  if (!el) return;

  if (el.style.display === 'none' || !el.style.display) {
    el.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    el.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

function renderProjectsPage(analysis) {
  const targetRole = analysis.targetRole || 'Software Engineer';
  const rolePill = document.getElementById('proj-role-pill');
  if (rolePill) rolePill.innerHTML = `${getIcon('target')} Target Role: ${targetRole}`;

  const projAnalysis = analysis.projectAnalysis || {};
  const depthScore = projAnalysis.technicalDepthScore || 65;
  const relevanceScore = projAnalysis.relevanceScore || 70;
  const projectList = projAnalysis.projectList || projAnalysis.projects || [];

  document.getElementById('kpi-depth-score').textContent = `${depthScore}/100`;
  document.getElementById('kpi-relevance-score').textContent = `${relevanceScore}/100`;
  document.getElementById('kpi-evaluated-cnt').textContent = projectList.length;

  // Standout project focus
  const standout = projAnalysis.standoutProject || projectList[0] || {
    name: 'Full-Stack Application',
    description: 'Extracted project from resume text.',
    techStack: ['Node.js', 'React', 'MongoDB']
  };

  const sTitle = document.getElementById('standout-proj-title'); if (sTitle) sTitle.textContent = standout.name || standout.title || 'Primary Resume Project';
  const sDesc = document.getElementById('standout-proj-desc'); if (sDesc) sDesc.textContent = standout.description || standout.details || 'Demonstrates technical execution and software development principles.';

  const sTech = document.getElementById('standout-proj-tech');
  if (sTech) {
    const stack = standout.techStack || standout.technologies || ['JavaScript', 'HTML/CSS'];
    sTech.innerHTML = stack.map(t => `<span class="badge badge-purple" style="font-size:0.75rem;">${t}</span>`).join('');
  }

  // Evaluated projects list
  const listContainer = document.getElementById('projects-list-container');
  if (listContainer) {
    if (projectList.length === 0) {
      listContainer.innerHTML = `<p style="color:var(--text-muted); padding:2rem;">No explicit project sections extracted from resume text.</p>`;
    } else {
      listContainer.innerHTML = projectList.map((proj, idx) => {
        const detailId = `proj-detail-${idx}`;
        const pName = proj.name || proj.title || `Project ${idx + 1}`;
        const pTech = proj.techStack || proj.technologies || [];
        const pRel = proj.relevance || 'High Relevance';
        const pDepth = proj.depthScore || Math.round(depthScore);

        const strengths = proj.strengths || ['Demonstrates core software construction', 'Clear technical scope'];
        const improvements = proj.improvementOpportunities || proj.improvements || ['Add measurable impact metrics', 'Detail API architectural patterns'];
        const missing = proj.missingEvidence || ['Automated unit tests', 'Production deployment URL'];

        return `
          <div style="background:#FFFFFF; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer; flex-wrap:wrap; gap:0.5rem;" onclick="toggleProjDetail('${detailId}')">
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span id="toggle-icon-${detailId}" style="transition:transform 0.2s ease; display:inline-block; font-size:0.75rem; color:var(--text-muted);">&#9660;</span>
                  <strong style="font-size:1.05rem; color:var(--text-dark);">${pName}</strong>
                </div>
                <div style="display:flex; gap:0.35rem; margin-top:0.35rem; flex-wrap:wrap;">
                  ${pTech.map(t => `<span class="badge badge-gray" style="font-size:0.7rem;">${t}</span>`).join('')}
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
                <div style="text-align:right;">
                  <div style="font-size:0.75rem; color:var(--text-muted);">Technical Depth</div>
                  <strong style="color:var(--primary-purple-dark); font-size:0.95rem;">${pDepth}/100</strong>
                </div>
                <span class="badge badge-pass" style="font-size:0.75rem;">${pRel}</span>
              </div>
            </div>

            <!-- Expandable Diagnostic Details -->
            <div id="${detailId}" style="display:none; margin-top:1rem; padding-top:1rem; border-top:1px solid var(--border-color); font-size:0.85rem;">
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-bottom:0.85rem;">
                <!-- Strengths -->
                <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.75rem;">
                  <strong style="color:var(--status-pass); font-size:0.8rem; display:block; margin-bottom:0.35rem;">✓ Identified Strengths</strong>
                  <ul style="margin:0; padding-left:1.1rem; color:var(--text-main); font-size:0.825rem;">
                    ${strengths.map(s => `<li style="margin-bottom:0.2rem;">${s}</li>`).join('')}
                  </ul>
                </div>

                <!-- Improvements -->
                <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.75rem;">
                  <strong style="color:var(--status-warning); font-size:0.8rem; display:block; margin-bottom:0.35rem;">⚠ Improvement Opportunities</strong>
                  <ul style="margin:0; padding-left:1.1rem; color:var(--text-main); font-size:0.825rem;">
                    ${improvements.map(i => `<li style="margin-bottom:0.2rem;">${i}</li>`).join('')}
                  </ul>
                </div>

                <!-- Missing Evidence -->
                <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.75rem;">
                  <strong style="color:var(--status-critical); font-size:0.8rem; display:block; margin-bottom:0.35rem;">✕ Missing Key Evidence</strong>
                  <ul style="margin:0; padding-left:1.1rem; color:var(--text-main); font-size:0.825rem;">
                    ${missing.map(m => `<li style="margin-bottom:0.2rem;">${m}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div style="text-align:right;">
                <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); Nova.ask('How can I optimize my project description for ${pName}?')" style="font-size:0.75rem;">
                  <span>Ask Nova About ${pName}</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

function initSimulator(analysis) {
  const projectList = analysis.projectAnalysis?.projectList || analysis.projectAnalysis?.projects || [];
  const selectEl = document.getElementById('sim-proj-select');
  if (!selectEl) return;

  if (projectList.length === 0) {
    selectEl.innerHTML = `<option value="0">Default Portfolio Project</option>`;
  } else {
    selectEl.innerHTML = projectList.map((p, idx) => `
      <option value="${idx}">${p.name || p.title || `Project ${idx + 1}`}</option>
    `).join('');
  }

  onSimulatorProjectChange();
}

function onSimulatorProjectChange() {
  const selectEl = document.getElementById('sim-proj-select');
  if (!selectEl) return;

  selectedProjIndex = parseInt(selectEl.value, 10) || 0;
  const projectList = globalAnalysis?.projectAnalysis?.projectList || globalAnalysis?.projectAnalysis?.projects || [];
  const proj = projectList[selectedProjIndex] || { techStack: ['JavaScript', 'HTML/CSS'] };

  const stackPills = document.getElementById('sim-current-stack-pills');
  if (stackPills) {
    const stack = proj.techStack || proj.technologies || ['JavaScript', 'HTML/CSS'];
    stackPills.innerHTML = stack.map(t => `<span class="badge badge-purple">${t}</span>`).join('');
  }

  recalculateSimulation();
}

function recalculateSimulation() {
  const checkboxes = document.querySelectorAll('.sim-checkbox:checked');
  const selectedTech = Array.from(checkboxes).map(c => c.value);

  const cntPill = document.getElementById('sim-selected-cnt');
  if (cntPill) cntPill.textContent = `${selectedTech.length} Enhancement${selectedTech.length === 1 ? '' : 's'}`;

  const baseDepth = globalAnalysis?.projectAnalysis?.technicalDepthScore || 65;
  const baseRel = globalAnalysis?.projectAnalysis?.relevanceScore || 70;

  const addedDepth = selectedTech.length * 5;
  const addedRel = selectedTech.length * 4;

  const simDepth = Math.min(100, baseDepth + addedDepth);
  const simRel = Math.min(100, baseRel + addedRel);

  const depthVal = document.getElementById('sim-depth-val'); if (depthVal) depthVal.textContent = `${simDepth}/100`;
  const depthDiff = document.getElementById('sim-depth-diff'); if (depthDiff) depthDiff.textContent = `+${addedDepth} pts potential`;

  const relVal = document.getElementById('sim-relevance-val'); if (relVal) relVal.textContent = `${simRel}/100`;
  const relDiff = document.getElementById('sim-relevance-diff'); if (relDiff) relDiff.textContent = `+${addedRel} pts potential`;

  const reqsBox = document.getElementById('sim-addressed-requirements');
  if (reqsBox) {
    if (selectedTech.length === 0) {
      reqsBox.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">Select enhancements to simulate role coverage...</span>`;
    } else {
      reqsBox.innerHTML = selectedTech.map(t => `<span class="badge badge-pass" style="font-size:0.725rem;">✓ ${t} Evidence</span>`).join('');
    }
  }
}
