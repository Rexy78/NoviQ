/**
 * Experience Page Controller
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

  // Populate Header Icons
  const ei1 = document.getElementById('exp-icon-1'); if (ei1) ei1.innerHTML = getIcon('history');
  const ei2 = document.getElementById('exp-icon-2'); if (ei2) ei2.innerHTML = getIcon('target');
  const ei3 = document.getElementById('exp-icon-3'); if (ei3) ei3.innerHTML = getIcon('trending-up');

  const bTitle = document.getElementById('bullet-rewriter-title');
  if (bTitle) bTitle.innerHTML = `${getIcon('sparkles')} <span>Interactive AI Bullet Point Enhancer</span>`;

  const resTitle = document.getElementById('res-title');
  if (resTitle) resTitle.innerHTML = `${getIcon('sparkles')} <span>High-Impact Accomplishment Statement</span>`;

  try {
    const data = await API.request(`/api/analyses/${activeAnalysisId}`);
    renderExperiencePage(data.analysis);
  } catch (err) {
    console.error('Error fetching experience data:', err);
    API.showToast('Failed to load experience analysis.', 'error');
  }
});

function renderExperiencePage(analysis) {
  const targetRole = analysis.targetRole || 'Target Role';
  document.getElementById('exp-role-pill').innerHTML = `${getIcon('target')} Target Role: ${targetRole}`;

  const exp = analysis.experienceAnalysis || {};

  document.getElementById('exp-kpi-years').textContent = `${exp.totalYears || exp.totalYearsExtracted || 2} yrs`;
  document.getElementById('exp-kpi-relevance').textContent = `${exp.depthScore || 75}/100`;
  document.getElementById('exp-kpi-depth').textContent = `${exp.achievementsQualityScore || 70}/100`;

  const container = document.getElementById('extracted-bullets-container');
  const bulletsArr = exp.bulletImprovements || [];
  const highlights = bulletsArr.length > 0 ? bulletsArr.map(b => b.original) : [
    'Developed scalable web services and database schemas.',
    'Collaborated with cross-functional teams to deploy features.'
  ];

  container.innerHTML = highlights.map((bullet) => `
    <div class="card" style="display:flex; justify-content:space-between; align-items:center; gap:1rem;">
      <p style="font-size:0.925rem; color:var(--text-dark); flex:1;">• ${bullet}</p>
      <button type="button" class="btn btn-secondary btn-sm" onclick="selectForEnhancement('${encodeURIComponent(bullet)}')">
        Enhance
      </button>
    </div>
  `).join('');

  // Setup Bullet Enhancer Form
  const enhanceBtn = document.getElementById('enhance-bullet-btn');
  const bulletInput = document.getElementById('bullet-input');
  const resultBox = document.getElementById('enhanced-result-box');
  const textOutput = document.getElementById('enhanced-text-output');
  const whyOutput = document.getElementById('enhanced-why-output');
  const copyBtn = document.getElementById('copy-bullet-btn');

  enhanceBtn.addEventListener('click', async () => {
    const text = bulletInput.value.trim();
    if (!text) {
      API.showToast('Please enter a bullet point to enhance.', 'error');
      return;
    }

    enhanceBtn.disabled = true;
    enhanceBtn.innerHTML = '<span class="spinner"></span> Enhancing with AI...';

    try {
      const res = await API.request('/api/improve', {
        method: 'POST',
        body: JSON.stringify({
          originalText: text,
          targetRole: analysis.targetRole,
          sectionType: 'work experience bullet'
        })
      });

      textOutput.textContent = res.improvedText;
      whyOutput.textContent = `Why improved: ${res.explanation}`;
      resultBox.style.display = 'block';
    } catch (err) {
      API.showToast('Failed to enhance bullet point.', 'error');
    } finally {
      enhanceBtn.disabled = false;
      enhanceBtn.innerHTML = `${getIcon('sparkles')} Enhance Bullet Point with AI`;
    }
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(textOutput.textContent);
    API.showToast('Copied statement to clipboard!', 'success');
  });
}

function selectForEnhancement(encodedBullet) {
  const bullet = decodeURIComponent(encodedBullet);
  const input = document.getElementById('bullet-input');
  input.value = bullet;
  input.focus();
  window.scrollTo({ top: input.offsetTop - 100, behavior: 'smooth' });
}
