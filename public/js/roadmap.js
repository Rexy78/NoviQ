/**
 * Roadmap Page Controller
 */
const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();

  const activeAnalysisId = localStorage.getItem('ci_active_analysis_id');
  if (!activeAnalysisId) {
    API.showToast('No active analysis found.', 'info');
    setTimeout(() => window.location.href = '/upload.html', 1000);
    return;
  }

  try {
    const data = await API.request(`/api/analyses/${activeAnalysisId}`);
    renderRoadmapPage(data.analysis);
  } catch (err) {
    console.error('Error fetching roadmap:', err);
    API.showToast('Failed to load roadmap timeline.', 'error');
  }
});

function toggleRoadmapStage(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById(`stage-toggle-icon-${id}`);
  if (!el) return;

  if (el.style.display === 'none' || !el.style.display) {
    el.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    el.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

function renderRoadmapPage(analysis) {
  const targetRole = analysis.targetRole || 'Software Engineer';
  document.getElementById('road-role-pill').innerHTML = `${getIcon('target')} Target Role: ${targetRole}`;

  const stages = analysis.roadmapStages || analysis.careerRoadmap || [];
  const container = document.getElementById('roadmap-timeline-container');

  if (!container) return;

  if (stages.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); padding:1rem;">No career roadmap generated for this analysis.</p>';
    return;
  }

  const stageTimeframes = ['Days 1–14', 'Weeks 3–4', 'Month 2', 'Post-Implementation'];

  container.innerHTML = stages.map((stage, idx) => {
    const detailId = `stage-detail-${idx}`;
    const defaultTimeframe = stageTimeframes[idx] || stage.timeframe || `Stage ${idx + 1}`;
    const stageTitle = stage.stageName || stage.title || `Stage ${idx + 1}: Strategic Progression`;

    return `
      <div class="roadmap-stage animate-fade-in">
        <div class="roadmap-stage-dot">${idx + 1}</div>

        <div class="roadmap-card">
          <div class="roadmap-card-header" style="cursor:pointer;" onclick="toggleRoadmapStage('${detailId}')">
            <div>
              <div class="roadmap-title" style="display:flex; align-items:center; gap:0.4rem;">
                ${getIcon('route')} <span>${stageTitle}</span>
              </div>
              <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.25rem; margin-bottom:0;">
                ${stage.objective || stage.expectedOutcome || 'Strategic focus phase to build target role evidence.'}
              </p>
            </div>
            <div style="display:flex; align-items:center; gap:0.65rem; flex-shrink:0;">
              <span class="roadmap-timeframe">${defaultTimeframe}</span>
              <span id="stage-toggle-icon-${detailId}" style="transition:transform 0.2s ease; display:inline-block; font-size:0.85rem; color:var(--text-muted);">&#9660;</span>
            </div>
          </div>

          <!-- Skills Chips Preview -->
          <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-top:0.75rem; align-items:center;">
            <span style="font-size:0.775rem; font-weight:700; color:var(--text-muted); margin-right:0.25rem;">Skills Focus:</span>
            ${(stage.skillsToFocus || stage.skills || []).map(s => `<span class="badge badge-purple" style="font-size:0.75rem;">${s}</span>`).join('')}
          </div>

          <!-- Expandable Detail Section -->
          <div id="${detailId}" style="display:block; margin-top:1rem; padding-top:1rem; border-top:1px solid var(--border-color);">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-bottom:1rem;">
              <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem;">
                <h4 style="font-size:0.825rem; font-weight:700; color:var(--primary-purple-dark); margin-bottom:0.35rem; display:flex; align-items:center; gap:0.3rem; margin-top:0;">
                  ${getIcon('folder')} <span>Recommended Action / Project</span>
                </h4>
                <div style="font-size:0.85rem; color:var(--text-dark); line-height:1.45;">
                  ${Array.isArray(stage.projects) ? stage.projects.join(', ') : (stage.recommendedAction || 'Build targeted proof-of-concept project demonstrating core role architecture.')}
                </div>
              </div>

              <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem;">
                <h4 style="font-size:0.825rem; font-weight:700; color:var(--text-dark); margin-bottom:0.35rem; display:flex; align-items:center; gap:0.3rem; margin-top:0;">
                  ${getIcon('target')} <span>Expected Phase Milestone</span>
                </h4>
                <div style="font-size:0.85rem; color:var(--text-dark); line-height:1.45;">
                  ${Array.isArray(stage.milestones) ? stage.milestones.join('; ') : (stage.expectedMilestone || 'Completion of phase project and resume evidence integration.')}
                </div>
              </div>
            </div>

            ${(stage.stageCourses || stage.recommendedCourses || []).length > 0 ? `
              <div style="margin-bottom:1rem; background:var(--bg-purple-light); border:1px solid var(--border-purple); border-radius:var(--radius-md); padding:0.85rem 1rem;">
                <h4 style="font-size:0.825rem; font-weight:700; color:var(--primary-purple-dark); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.35rem; margin-top:0;">
                  ${getIcon('book-open', 'w-4 h-4')} <span>Stage ${idx + 1} Dedicated Course Recommendations</span>
                </h4>
                <div style="display:flex; flex-direction:column; gap:0.4rem;">
                  ${(stage.stageCourses || stage.recommendedCourses || []).map(c => `
                    <div style="background:#FFFFFF; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.55rem 0.75rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                      <div>
                        <span style="font-weight:700; font-size:0.85rem; color:var(--text-dark);">${c.name || c.title}</span>
                        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.1rem;">
                          Targets: <strong style="color:var(--primary-purple-dark);">${c.skillAddressed || c.targetSkill}</strong> • ${c.platform || 'Online Course'} • ${c.duration || '10-20 Hours'}
                        </div>
                      </div>
                      <span class="badge badge-purple" style="font-size:0.725rem;">${c.level || 'Intermediate'}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div style="display:flex; justify-content:flex-end; align-items:center;">
              <a href="/courses.html?stage=${encodeURIComponent('Stage ' + (idx + 1))}" class="btn btn-secondary btn-sm" style="display:inline-flex; align-items:center; gap:0.3rem;">
                <span>View Stage ${idx + 1} Courses &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
