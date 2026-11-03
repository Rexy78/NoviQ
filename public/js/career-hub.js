/**
 * Career Hub Controller
 */
const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();

  const user = API.getUser();
  const activeTargetPill = document.getElementById('active-target-pill');
  const lastAnalysisSub = document.getElementById('last-analysis-sub');
  const headerCtaContainer = document.getElementById('header-cta-container');
  const preAnalysisView = document.getElementById('pre-analysis-view');
  const postAnalysisView = document.getElementById('post-analysis-view');

  try {
    const data = await API.request('/api/analyses');
    const analyses = data.analyses || [];

    if (analyses.length === 0) {
      // PRE-ANALYSIS STATE
      if (preAnalysisView) preAnalysisView.style.display = 'block';
      if (postAnalysisView) postAnalysisView.style.display = 'none';

      if (activeTargetPill) activeTargetPill.innerHTML = `${getIcon('target')} Target Role: ${user?.profileRole || 'Software Engineer'}`;
      if (lastAnalysisSub) lastAnalysisSub.textContent = 'Upload a resume and select a target role to perform your AI analysis.';

      if (headerCtaContainer) {
        headerCtaContainer.innerHTML = '';
      }
      return;
    }

    // POST-ANALYSIS STATE
    if (preAnalysisView) preAnalysisView.style.display = 'none';
    if (postAnalysisView) postAnalysisView.style.display = 'block';

    const latest = analyses[0];
    localStorage.setItem('ci_active_analysis_id', latest._id || latest.id);

    const targetRole = latest.targetRole || user?.profileRole || 'Software Engineer';
    if (activeTargetPill) activeTargetPill.innerHTML = `${getIcon('target')} Target Role: ${targetRole}`;

    const dateStr = new Date(latest.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (lastAnalysisSub) lastAnalysisSub.textContent = `Latest Analysis Date: ${dateStr}`;

    if (headerCtaContainer) {
      headerCtaContainer.innerHTML = `
        <a href="/upload.html" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 0.9rem;">
          <span>🔄 Re-analyze Resume</span>
        </a>
      `;
    }

    // Exact Scores from backend object
    const overallScore = latest.overallScore || 0;
    const atsScore = latest.atsScore || 0;
    const skillMatch = latest.skillAnalysis?.currentMatchPct || Math.round((overallScore + atsScore) / 2);
    const qualityScore = latest.atsBreakdown?.structure?.score || Math.round((atsScore + overallScore) / 2);

    // Helpers for status badges
    const getBadgeClass = (score) => score >= 75 ? 'badge-pass' : (score >= 50 ? 'badge-warning' : 'badge-critical');
    const getBadgeLabel = (score) => score >= 75 ? 'Strong' : (score >= 50 ? 'Needs Attention' : 'Critical Fix');

    // 1. Overall Score
    const elOverallScore = document.getElementById('kpi-overall-score');
    if (elOverallScore) elOverallScore.textContent = `${overallScore}/100`;
    const elOverallBadge = document.getElementById('kpi-overall-badge');
    if (elOverallBadge) elOverallBadge.innerHTML = `<span class="badge ${getBadgeClass(overallScore)}">${getBadgeLabel(overallScore)}</span>`;
    const elOverallDesc = document.getElementById('kpi-overall-desc');
    if (elOverallDesc) elOverallDesc.textContent = overallScore >= 75 ? 'High structural alignment' : 'Opportunity to strengthen role fit';

    // 2. ATS Score
    const elAtsScore = document.getElementById('kpi-ats-score');
    if (elAtsScore) elAtsScore.textContent = `${atsScore}/100`;
    const elAtsBadge = document.getElementById('kpi-ats-badge');
    if (elAtsBadge) elAtsBadge.innerHTML = `<span class="badge ${getBadgeClass(atsScore)}">${latest.atsRiskLevel || getBadgeLabel(atsScore)}</span>`;
    const elAtsDesc = document.getElementById('kpi-ats-desc');
    if (elAtsDesc) elAtsDesc.textContent = `Keyword match: ${latest.atsBreakdown?.keywordMatch?.score || 35}%`;

    // 3. Skills Match
    const elSkillMatch = document.getElementById('kpi-skill-match');
    if (elSkillMatch) elSkillMatch.textContent = `${skillMatch}%`;
    const elSkillBadge = document.getElementById('kpi-skill-badge');
    if (elSkillBadge) elSkillBadge.innerHTML = `<span class="badge ${getBadgeClass(skillMatch)}">${getBadgeLabel(skillMatch)}</span>`;
    const elSkillDesc = document.getElementById('kpi-skill-desc');
    if (elSkillDesc) elSkillDesc.textContent = `${latest.skillAnalysis?.missingSkills?.length || 0} missing role requirements`;

    // 4. Resume Quality
    const elQualityScore = document.getElementById('kpi-quality-score');
    if (elQualityScore) elQualityScore.textContent = `${qualityScore}/100`;
    const elQualityBadge = document.getElementById('kpi-quality-badge');
    if (elQualityBadge) elQualityBadge.innerHTML = `<span class="badge ${getBadgeClass(qualityScore)}">${getBadgeLabel(qualityScore)}</span>`;

    // Render "What Needs Attention" section (Top 3-5 priority issues)
    renderWhatNeedsAttention(latest, targetRole);

    // Render Active Analysis Summary Card
    const recentContent = document.getElementById('recent-analysis-content');
    if (recentContent) {
      recentContent.innerHTML = `
        <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; flex-wrap:wrap; gap:0.5rem;">
            <div>
              <strong style="font-size:0.95rem; color:var(--text-dark);">${latest.resumeFileName || 'Uploaded Resume Document'}</strong>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.1rem;">Active analysis for <strong>${targetRole}</strong></div>
            </div>
            <span class="badge ${getBadgeClass(atsScore)}">${latest.atsRiskLevel || 'Moderate Risk'}</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-main); line-height:1.5; margin:0;">
            ${latest.overallScoreExplanation || `Resume evaluated for ${targetRole}. Key areas to fix include keyword alignment and technical project evidence.`}
          </p>
        </div>
      `;
    }

  } catch (err) {
    console.error('Error loading career hub overview:', err);
  }
});

function renderWhatNeedsAttention(analysis, targetRole) {
  const container = document.getElementById('attention-items-list');
  const countPill = document.getElementById('attention-count-pill');
  if (!container) return;

  const issues = [];

  // Issue 1: Missing Skills
  const missingSkills = analysis.skillAnalysis?.missingSkills || [];
  if (missingSkills.length > 0) {
    const top3 = missingSkills.slice(0, 3).map(s => s.skillName || s.name || s).join(', ');
    issues.push({
      priority: 'Critical',
      title: 'Missing Core Role Keywords',
      explanation: `Resume lacks evidence for key ${targetRole} requirements: ${top3}.`,
      actionUrl: '/skills.html',
      actionText: 'View Skill Gaps'
    });
  }

  // Issue 2: ATS Keyword Coverage Score
  const kwScore = analysis.atsBreakdown?.keywordMatch?.score || 35;
  if (kwScore < 60) {
    issues.push({
      priority: 'Critical',
      title: 'Low ATS Keyword Compatibility Score',
      explanation: `Keyword coverage score is currently ${kwScore}/100. Target role terms are not adequately represented.`,
      actionUrl: '/ats.html',
      actionText: 'View ATS Details'
    });
  }

  // Issue 3: Project Depth
  const projDepth = analysis.projectAnalysis?.technicalDepthScore || 50;
  if (projDepth < 65) {
    issues.push({
      priority: 'Warning',
      title: 'Strengthen Technical Project Depth',
      explanation: `Project depth score is ${projDepth}/100. Adding technical architecture details will boost scores.`,
      actionUrl: '/projects.html',
      actionText: 'Explore Projects'
    });
  }

  // Issue 4: Bullet Point Impact
  const expBullets = analysis.experienceAnalysis?.extractedBullets || [];
  if (expBullets.length > 0) {
    issues.push({
      priority: 'Warning',
      title: 'Quantify Experience Bullet Achievements',
      explanation: 'Several experience points lack measurable impact metrics (%, $, uptime).',
      actionUrl: '/experience.html',
      actionText: 'Rewrite Bullets'
    });
  }

  // Fallback default issue if none found
  if (issues.length === 0) {
    issues.push({
      priority: 'Info',
      title: 'Refine Technical Resume Content',
      explanation: 'Your resume shows strong alignment. Consider fine-tuning project descriptions in Resume Studio.',
      actionUrl: '/resume-editor.html',
      actionText: 'Open Resume Studio'
    });
  }

  const topIssues = issues.slice(0, 4);
  if (countPill) countPill.textContent = `${topIssues.length} Priority Action${topIssues.length === 1 ? '' : 's'}`;

  container.innerHTML = topIssues.map(item => {
    let badgeClass = 'badge-critical';
    if (item.priority === 'Warning') badgeClass = 'badge-warning';
    if (item.priority === 'Info') badgeClass = 'badge-purple';

    return `
      <div style="background:#FFFFFF; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:0.85rem 1.1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
        <div style="flex:1; min-width:240px;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
            <span class="badge ${badgeClass}" style="font-size:0.725rem;">${item.priority}</span>
            <strong style="font-size:0.95rem; color:var(--text-dark);">${item.title}</strong>
          </div>
          <div style="font-size:0.825rem; color:var(--text-main); line-height:1.4;">${item.explanation}</div>
        </div>

        <div>
          <a href="${item.actionUrl}" class="btn btn-outline btn-sm" style="font-size:0.8rem; white-space:nowrap; display:inline-flex; align-items:center; gap:0.3rem;">
            <span>${item.actionText}</span> &rarr;
          </a>
        </div>
      </div>
    `;
  }).join('');
}
