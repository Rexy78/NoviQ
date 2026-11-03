/**
 * Courses Page Controller with Stage Grouping
 */
const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

let allRecommendedCourses = [];
let selectedStageFilter = 'All';
let activeAnalysisData = null;

document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();

  const activeAnalysisId = localStorage.getItem('ci_active_analysis_id');
  if (!activeAnalysisId) {
    API.showToast('No active analysis found.', 'info');
    setTimeout(() => window.location.href = '/upload.html', 1000);
    return;
  }

  // Parse stage from URL if present (e.g. ?stage=Stage%201)
  const urlParams = new URLSearchParams(window.location.search);
  const stageParam = urlParams.get('stage');
  if (stageParam) {
    selectedStageFilter = stageParam.trim();
  }

  try {
    const data = await API.request(`/api/analyses/${activeAnalysisId}`);
    renderCoursesPage(data.analysis);
  } catch (err) {
    console.error('Error fetching courses:', err);
    API.showToast('Failed to load courses.', 'error');
  }
});

function renderCoursesPage(analysis) {
  activeAnalysisData = analysis;
  const targetRole = analysis.targetRole || 'Software Engineer';
  document.getElementById('course-role-pill').innerHTML = `${getIcon('target')} Target Role: ${targetRole}`;

  allRecommendedCourses = analysis.courseRecommendations || [];
  renderStageFilterButtons();
  renderCourseGrid(targetRole);
}

function renderStageFilterButtons() {
  const filterBar = document.getElementById('courses-filter-bar');
  if (!filterBar) return;

  const stages = ['All', 'Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];

  filterBar.innerHTML = stages.map(st => {
    const isActive = selectedStageFilter.toLowerCase() === st.toLowerCase();
    const btnClass = isActive ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
    return `<button type="button" class="${btnClass}" onclick="setStageFilter('${st}')">${st === 'All' ? 'All Stages' : st}</button>`;
  }).join('');
}

function setStageFilter(stage) {
  selectedStageFilter = stage;
  renderStageFilterButtons();
  renderCourseGrid(activeAnalysisData?.targetRole || 'Software Engineer');
}

function renderCourseCardHtml(course, targetRole) {
  const platformName = course.platform || 'Online Course';
  const cTitle = course.name || course.title || 'Technical Skill Course';
  const targetSkill = course.skillAddressed || course.targetSkill || course.skillCovered || 'Core Skill';
  const reqStatus = course.status || 'No Resume Evidence';
  const whyText = course.evidenceReason || course.whyRecommended || course.recommendationReason || `Recommended because no resume evidence was detected for ${targetSkill} in your ${targetRole} evaluation.`;

  let buttonText = `Search ${platformName}`;
  if (course.link && !course.link.includes('search')) {
    buttonText = 'Explore Course Resource';
  } else if (platformName.toLowerCase().includes('coursera')) {
    buttonText = 'Search Coursera';
  } else if (platformName.toLowerCase().includes('udemy')) {
    buttonText = 'Search Udemy';
  } else if (platformName.toLowerCase().includes('edx')) {
    buttonText = 'Search edX';
  }

  return `
    <div class="card card-interactive animate-fade-in" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <span class="badge badge-purple">${platformName}</span>
          <div style="display:flex; gap:0.35rem;">
            ${course.stage ? `<span class="badge badge-purple" style="background:var(--bg-purple-light); color:var(--primary-purple-dark);">${course.stage}</span>` : ''}
            <span class="badge badge-gray">${course.level || course.difficulty || 'Intermediate'}</span>
          </div>
        </div>

        <h3 style="font-size:1.05rem; color:var(--text-dark); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem; margin-top:0;">
          ${getIcon('book-open')} <span>${cTitle}</span>
        </h3>

        <div style="font-size:0.8rem; font-weight:700; color:var(--primary-purple-dark); margin-bottom:0.5rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.35rem;">
          <span style="display:inline-flex; align-items:center; gap:0.3rem;">
            ${getIcon('zap', 'w-3.5 h-3.5')} Targeted Requirement: ${targetSkill}
          </span>
          <span class="badge ${reqStatus === 'Needs Verification' ? 'badge-warning' : 'badge-critical'}" style="font-size:0.725rem;">
            ${reqStatus}
          </span>
        </div>

        <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.65rem 0.75rem; margin-bottom:1rem; font-size:0.825rem; color:var(--text-main); line-height:1.45;">
          <strong style="color:var(--primary-purple-dark); display:flex; align-items:center; gap:0.25rem; margin-bottom:0.25rem;">
            ${getIcon('sparkles', 'w-3.5 h-3.5')} Why Recommended:
          </strong>
          ${whyText}
        </div>
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:var(--text-muted); padding-top:0.75rem; border-top:1px solid var(--border-color); margin-bottom:1rem;">
          <span>⏱ Duration: ${course.duration || '10-20 Hours'}</span>
          <span>Curated Resource</span>
        </div>

        <a href="${course.link || 'https://www.coursera.org'}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="width:100%; display:inline-flex; align-items:center; justify-content:center; gap:0.4rem;">
          <span>${buttonText}</span> ${getIcon('chevron-right')}
        </a>
      </div>
    </div>
  `;
}

function renderCourseGrid(targetRole) {
  const container = document.getElementById('courses-grid-container');
  if (!container) return;

  if (allRecommendedCourses.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); padding:2rem; grid-column:1/-1;">No course recommendations found for this analysis.</p>`;
    return;
  }

  if (selectedStageFilter && selectedStageFilter !== 'All') {
    const filtered = allRecommendedCourses.filter(c => (c.stage || '').toLowerCase().includes(selectedStageFilter.toLowerCase()));

    if (filtered.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted); padding:2rem; grid-column:1/-1;">No course recommendations found for ${selectedStageFilter}.</p>`;
      return;
    }

    container.innerHTML = `
      <div style="grid-column:1/-1; display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:1.5rem;">
        ${filtered.map(c => renderCourseCardHtml(c, targetRole)).join('')}
      </div>
    `;
    return;
  }

  // When 'All' is selected: Group by Stage
  const stagesList = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
  const stageNames = {
    'Stage 1': 'Stage 1: Foundations (Days 1–14)',
    'Stage 2': 'Stage 2: Portfolio Development (Weeks 3–4)',
    'Stage 3': 'Stage 3: Integration & Expansion (Month 2)',
    'Stage 4': 'Stage 4: Evidence Optimization (Post-Implementation)'
  };

  container.innerHTML = stagesList.map(st => {
    const stageCourses = allRecommendedCourses.filter(c => (c.stage || 'Stage 1').toLowerCase().includes(st.toLowerCase()));
    if (stageCourses.length === 0) return '';

    return `
      <div style="grid-column:1/-1; margin-bottom:2rem;">
        <div style="margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:2px solid var(--border-purple); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="font-size:1.2rem; color:var(--primary-purple-dark); margin:0;">${stageNames[st] || st}</h3>
          <span class="badge badge-purple">${stageCourses.length} Recommended Course${stageCourses.length === 1 ? '' : 's'}</span>
        </div>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:1.5rem;">
          ${stageCourses.map(c => renderCourseCardHtml(c, targetRole)).join('')}
        </div>
      </div>
    `;
  }).join('');
}
