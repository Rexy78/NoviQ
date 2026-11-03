/**
 * History Controller
 */
const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();

  const cTitle = document.getElementById('comp-title');
  if (cTitle) cTitle.innerHTML = `${getIcon('trending-up')} <span>Resume Optimization Gain Progress</span>`;

  try {
    const data = await API.request('/api/analyses');
    const analyses = data.analyses || [];

    renderHistoryPage(analyses);
  } catch (err) {
    console.error('Error loading history:', err);
    API.showToast('Failed to load analysis history.', 'error');
  }
});

function renderHistoryPage(analyses) {
  const container = document.getElementById('history-list-container');
  const compCard = document.getElementById('comparison-card');

  if (analyses.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); padding:1rem;">No past resume analyses recorded.</p>';
    return;
  }

  // Before/After comparison logic
  if (analyses.length >= 2) {
    compCard.style.display = 'block';
    const latest = analyses[0];
    const prevSameRole = analyses.slice(1).find(a => (a.targetRole || '').trim().toLowerCase() === (latest.targetRole || '').trim().toLowerCase());
    const prevImmediate = analyses[1];

    if (prevSameRole) {
      const overallDiff = latest.overallScore - prevSameRole.overallScore;
      const atsDiff = latest.atsScore - prevSameRole.atsScore;

      document.getElementById('gain-overall').textContent = `${overallDiff >= 0 ? '+' : ''}${overallDiff} pts`;
      document.getElementById('gain-overall-sub').textContent = `${prevSameRole.overallScore} ➔ ${latest.overallScore} (${latest.targetRole})`;

      document.getElementById('gain-ats').textContent = `${atsDiff >= 0 ? '+' : ''}${atsDiff} pts`;
      document.getElementById('gain-ats-sub').textContent = `${prevSameRole.atsScore} ➔ ${latest.atsScore} (${latest.targetRole})`;
    } else {
      document.getElementById('gain-overall').textContent = 'Role Changed';
      document.getElementById('gain-overall').style.fontSize = '1.25rem';
      document.getElementById('gain-overall-sub').textContent = `Target role changed (${prevImmediate.targetRole} ➔ ${latest.targetRole}). Scores evaluate distinct target role requirements and are not directly comparable.`;

      document.getElementById('gain-ats').textContent = 'Role Changed';
      document.getElementById('gain-ats').style.fontSize = '1.25rem';
      document.getElementById('gain-ats-sub').textContent = `Scores evaluate distinct target role standards.`;
    }

    document.getElementById('gain-count').textContent = analyses.length;
  }

  container.innerHTML = analyses.map(item => {
    const dateStr = new Date(item.createdAt).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const isCurrentActive = (localStorage.getItem('ci_active_analysis_id') === (item._id || item.id));

    return `
      <div class="card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; ${isCurrentActive ? 'border-color:var(--primary-purple); background:var(--bg-purple-light);' : ''}">
        <div>
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.25rem;">
            <h4 style="font-size:1.1rem; color:var(--text-dark); display:flex; align-items:center; gap:0.4rem;">
              ${getIcon('file-text')} <span>${item.resumeFileName || 'Resume Upload'}</span>
            </h4>
            ${isCurrentActive ? '<span class="badge badge-purple">Active</span>' : ''}
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted);">
            Target: <strong>${item.targetRole}</strong> • Date: ${dateStr}
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:1.5rem;">
          <div style="text-align:center;">
            <div style="font-size:1.25rem; font-weight:800; color:var(--text-dark);">${item.overallScore}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">Overall</div>
          </div>

          <div style="text-align:center;">
            <div style="font-size:1.25rem; font-weight:800; color:var(--primary-purple);">${item.atsScore}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">ATS</div>
          </div>

          <button type="button" class="btn btn-secondary btn-sm" onclick="setActiveAnalysis('${item._id || item.id}')" style="display:inline-flex; align-items:center; gap:0.3rem;">
            <span>View Intelligence</span> ${getIcon('chevron-right')}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setActiveAnalysis(id) {
  localStorage.setItem('ci_active_analysis_id', id);
  API.showToast('Selected analysis activated!', 'success');
  setTimeout(() => window.location.href = '/ats.html', 500);
}
