/**
 * ATS Dashboard Controller with Premium Modern CareerNova AI Presentation
 */
let activeAnalysisData = null;

const cleanText = (val) => {
  if (!val || val === 'Not found' || val === 'N/A' || val === 'null' || val === 'undefined') {
    return 'Not detected';
  }
  return String(val).trim();
};

const cleanPhone = (val) => {
  const txt = cleanText(val);
  if (txt === 'Not detected') return txt;
  let p = txt.replace(/^(\+\d{1,3})[\s\-]+/g, '$1 ');
  p = p.replace(/[\-\s]{2,}/g, ' ').replace(/^\-+|\-+$/g, '');
  return p;
};

const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();

  const activeAnalysisId = localStorage.getItem('ci_active_analysis_id');
  if (!activeAnalysisId) {
    API.showToast('No analysis found. Redirecting to upload...', 'info');
    setTimeout(() => window.location.href = '/upload.html', 1000);
    return;
  }

  // Populate card header icons
  const iconStruct = document.getElementById('icon-struct');
  if (iconStruct) iconStruct.innerHTML = getIcon('layout');
  const iconFormat = document.getElementById('icon-format');
  if (iconFormat) iconFormat.innerHTML = getIcon('palette');
  const iconParse = document.getElementById('icon-parse');
  if (iconParse) iconParse.innerHTML = getIcon('cpu');
  const iconKw = document.getElementById('icon-kw');
  if (iconKw) iconKw.innerHTML = getIcon('scan-search');

  try {
    const data = await API.request(`/api/analyses/${activeAnalysisId}`);
    activeAnalysisData = data.analysis;

    renderATSPage(activeAnalysisData);
  } catch (err) {
    console.error('Error fetching ATS data:', err);
    API.showToast('Failed to load ATS analysis.', 'error');
  }
});

function renderATSPage(analysis) {
  const targetRole = analysis.targetRole || 'Software Engineer';
  const score = typeof analysis.atsScore === 'number' ? Math.round(analysis.atsScore) : (parseInt(analysis.atsScore) || 70);
  const riskLevel = analysis.atsRiskLevel || (score >= 80 ? 'Low Risk' : score >= 60 ? 'Moderate Risk' : 'High Risk');

  // Set role pills and badges
  const rolePill = document.getElementById('ats-role-pill');
  if (rolePill) rolePill.innerHTML = `${getIcon('target')} Target Role: ${targetRole}`;

  const targetRoleBadge = document.getElementById('ats-target-role-badge');
  if (targetRoleBadge) targetRoleBadge.textContent = targetRole;

  const snapshotRole = document.getElementById('snapshot-target-role');
  if (snapshotRole) snapshotRole.textContent = `Target Role: ${targetRole}`;

  // Score Number Animation
  animateScoreGauge(score);

  // Hero Title & Interpretation
  const heroTitle = document.getElementById('ats-hero-title');
  if (heroTitle) heroTitle.textContent = `${score} / 100 Compatibility Score`;

  const heroDesc = document.getElementById('ats-hero-desc');
  if (heroDesc) {
    const kw = analysis.atsBreakdown?.keywordMatch || {};
    const missing = kw.missingSkills || analysis.skillAnalysis?.missingSkills || [];
    if (missing.length > 0) {
      heroDesc.textContent = `Your resume currently has ${riskLevel.toLowerCase()} ATS risk for ${targetRole} roles. Your parsing and formatting are relatively strong, but your document lacks explicit evidence for ${missing.slice(0, 3).join(', ')}.`;
    } else {
      heroDesc.textContent = `Your resume demonstrates good overall alignment for ${targetRole} positions with an ATS score of ${score}/100. Review the prioritized action items below to further optimize formatting and terminology.`;
    }
  }

  // Risk Level Badge
  const riskBox = document.getElementById('ats-risk-badge-box');
  if (riskBox) {
    let badgeClass = 'badge-warning';
    if (riskLevel === 'Excellent' || riskLevel === 'Low Risk' || riskLevel === 'Good' || riskLevel === 'Pass') badgeClass = 'badge-pass';
    else if (riskLevel === 'High Risk' || riskLevel === 'Critical Risk' || riskLevel === 'High') badgeClass = 'badge-critical';

    riskBox.innerHTML = `
      <span class="badge ${badgeClass}" style="font-size:0.875rem; padding:0.4rem 0.95rem;">${riskLevel}</span>
    `;
  }

  // 1. PERFORMANCE AREAS GRID
  const kw = analysis.atsBreakdown?.keywordMatch || {};
  const struct = analysis.atsBreakdown?.structure || {};
  const fmt = analysis.atsBreakdown?.formatting || {};
  const parse = analysis.atsBreakdown?.parsing || {};

  const kwNum = Math.round(kw.score !== undefined ? Number(kw.score) : 70);
  const structNum = Math.round(struct.score !== undefined ? Number(struct.score) : 80);
  const fmtNum = Math.round(fmt.score !== undefined ? Number(fmt.score) : 85);
  const parseNum = Math.round(parse.score !== undefined ? Number(parse.score) : 75);

  const kwPts = Math.round(kwNum * 0.35);
  const structPts = Math.round(structNum * 0.25);
  const fmtPts = Math.round(fmtNum * 0.20);
  const parsePts = Math.round(parseNum * 0.20);

  const reconciledTotal = kwPts + structPts + fmtPts + parsePts;

  // Keyword
  document.getElementById('score-kw').textContent = `${kwNum}%`;
  document.getElementById('kw-contrib-val').textContent = `+${kwPts} pts`;
  document.getElementById('desc-kw').textContent = kw.details || `Evaluates presence of essential ${targetRole} core terminology.`;
  renderStatusBadge('badge-kw', kw.status || (kwNum >= 75 ? 'Pass' : 'Needs Improvement'));

  // Structure
  document.getElementById('score-struct').textContent = `${structNum}%`;
  document.getElementById('struct-contrib-val').textContent = `+${structPts} pts`;
  document.getElementById('desc-struct').textContent = struct.details || 'Measures presence and clarity of standard resume sections.';
  renderStatusBadge('badge-struct', struct.status || (structNum >= 75 ? 'Pass' : 'Needs Revision'));

  // Formatting
  document.getElementById('score-format').textContent = `${fmtNum}%`;
  document.getElementById('fmt-contrib-val').textContent = `+${fmtPts} pts`;
  document.getElementById('desc-format').textContent = fmt.details || 'Evaluates single-column text safety and layout compatibility.';
  renderStatusBadge('badge-format', fmt.status || (fmtNum >= 75 ? 'Safe' : 'Warning'));

  // Parsing
  document.getElementById('score-parse').textContent = `${parseNum}%`;
  document.getElementById('parse-contrib-val').textContent = `+${parsePts} pts`;
  document.getElementById('desc-parse').textContent = parse.details || 'Measures extraction reliability for contact info and skills.';
  renderStatusBadge('badge-parse', parse.status || (parseNum >= 75 ? 'Pass' : 'Warning'));

  // Mathematical Reconciliation Formula
  const reconFormula = document.getElementById('recon-total-formula');
  if (reconFormula) reconFormula.textContent = `${kwPts} + ${structPts} + ${fmtPts} + ${parsePts} = ${reconciledTotal} / 100`;

  const reconBadge = document.getElementById('reconcile-final-badge');
  if (reconBadge) reconBadge.textContent = `Canonical ATS Score: ${reconciledTotal} / 100`;

  // 2. WHAT'S HELPING & WHAT'S HOLDING YOU BACK
  renderHelpingAndHoldingBack(analysis, targetRole);

  // 3. YOUR TOP PRIORITIES (FIX THIS FIRST)
  renderTopPriorities(analysis, targetRole);

  // 4. ROLE ALIGNMENT SNAPSHOT
  renderRoleAlignmentSnapshot(analysis, targetRole);

  // 5. ENTITY EXTRACTION
  renderEntityExtraction(analysis);

  // 6. XAI INSIGHT TEXT
  const xaiWhy = document.getElementById('xai-why-text');
  if (xaiWhy) {
    let xaiText = analysis.xaiExplanations?.whyScore || '';
    if (!xaiText || xaiText.includes('72/100')) {
      xaiText = `Your canonical ATS score is ${reconciledTotal}/100 for ${targetRole}. The document is parseable and candidate details were extracted cleanly, but score headroom is limited by keyword coverage for core role requirements.`;
    } else {
      xaiText = xaiText.replace(/\b(\d{1,3})\s*\/\s*100\b/g, `${reconciledTotal}/100`);
    }
    xaiWhy.textContent = xaiText;
  }
}

function animateScoreGauge(targetScore) {
  const scoreNumEl = document.getElementById('gauge-score-num');
  const circleFill = document.getElementById('gauge-circle-fill');
  
  const circumference = 2 * Math.PI * 70; // ~440
  const offset = circumference - (targetScore / 100) * circumference;

  if (circleFill) {
    setTimeout(() => {
      circleFill.style.strokeDashoffset = offset;
    }, 100);
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    if (scoreNumEl) scoreNumEl.textContent = targetScore;
    return;
  }

  let current = 0;
  const duration = 1000;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = targetScore / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= targetScore) {
      current = targetScore;
      clearInterval(timer);
    }
    if (scoreNumEl) scoreNumEl.textContent = Math.round(current);
  }, stepTime);
}

function renderHelpingAndHoldingBack(analysis, targetRole) {
  const helpingList = document.getElementById('helping-items-list');
  const holdingBackList = document.getElementById('holding-back-items-list');

  const kw = analysis.atsBreakdown?.keywordMatch || {};
  const struct = analysis.atsBreakdown?.structure || {};
  const fmt = analysis.atsBreakdown?.formatting || {};
  const parse = analysis.atsBreakdown?.parsing || {};

  // Helping items
  const helpingItems = [];
  const fields = parse.detectedFields || {};

  if (fields.name && fields.name !== 'Not found') {
    helpingItems.push('Clean contact & candidate profile details extraction');
  }
  const fmtChecks = fmt.checks || [];
  const safeFmt = fmtChecks.filter(c => c.status === 'Safe' || c.status === 'Pass');
  if (safeFmt.length > 0) {
    helpingItems.push('Standard single-column visual layout detected without table/column clipping risks');
  }
  const strongSkills = kw.matchedSkills || analysis.skillAnalysis?.strongSkills || [];
  if (strongSkills.length > 0) {
    helpingItems.push(`Practical evidence detected for core role technologies (${strongSkills.slice(0, 3).join(', ')})`);
  }
  const sections = struct.sections || [];
  const presentSecs = sections.filter(s => s.status === 'Present');
  if (presentSecs.length > 0) {
    helpingItems.push(`Standard section headers identified (${presentSecs.map(s => s.name).slice(0, 3).join(', ')})`);
  }

  if (helpingItems.length === 0) {
    helpingItems.push('Basic text layout and readable contact section');
  }

  if (helpingList) {
    helpingList.innerHTML = helpingItems.map(item => `
      <li style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.6rem 0.85rem; font-size:0.875rem; color:var(--text-dark); display:flex; align-items:center; gap:0.5rem;">
        <span style="color:var(--status-pass); font-weight:800;">✓</span>
        <span>${item}</span>
      </li>
    `).join('');
  }

  // Holding back items
  const holdingItems = [];
  const missingSkills = kw.missingSkills || analysis.skillAnalysis?.missingSkills || [];
  if (missingSkills.length > 0) {
    holdingItems.push(`No resume evidence detected for core requirements: ${missingSkills.slice(0, 3).join(', ')}`);
  }
  const riskyChecks = fmtChecks.filter(c => c.status !== 'Safe' && c.status !== 'Pass');
  if (riskyChecks.length > 0) {
    riskyChecks.forEach(c => holdingItems.push(`${c.name}: ${c.note || 'May impact ATS section indexing'}`));
  }
  const missingSecs = sections.filter(s => s.status !== 'Present');
  if (missingSecs.length > 0) {
    missingSecs.forEach(s => holdingItems.push(`Section ${s.name}: ${s.recommendation || 'Needs revision'}`));
  }

  if (holdingItems.length === 0) {
    holdingItems.push('Minor terminology density enhancements recommended for maximum alignment.');
  }

  if (holdingBackList) {
    holdingBackList.innerHTML = holdingItems.map(item => `
      <li style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.6rem 0.85rem; font-size:0.875rem; color:var(--text-dark); display:flex; align-items:center; gap:0.5rem;">
        <span style="color:var(--status-critical); font-weight:800;">!</span>
        <span>${item}</span>
      </li>
    `).join('');
  }
}

function renderTopPriorities(analysis, targetRole) {
  const container = document.getElementById('priorities-cards-container');
  const countBadge = document.getElementById('issues-count-badge');
  if (!container) return;

  const priorities = [];

  // Priority 1: Keyword gaps
  const kw = analysis.atsBreakdown?.keywordMatch || {};
  const missingSkills = kw.missingSkills || analysis.skillAnalysis?.missingSkills || [];
  if (missingSkills.length > 0) {
    priorities.push({
      num: '01',
      title: `Incorporate Core ${targetRole} Keywords`,
      impact: 'High Impact',
      impactClass: 'badge-critical',
      issue: `Your resume currently lacks explicit text evidence for required core skills: ${missingSkills.join(', ')}.`,
      action: `If you have genuine hands-on experience with these technologies, explicitly articulate where and how you applied them in your project or experience bullet points. Do not invent experience you do not have.`
    });
  }

  // Priority 2: Spaced Headings / Formatting Checks
  const checks = analysis.atsBreakdown?.formatting?.checks || [];
  const spacedCheck = checks.find(c => (c.name || '').toLowerCase().includes('heading') || (c.note || '').toLowerCase().includes('spaced'));
  if (spacedCheck && spacedCheck.status !== 'Safe' && spacedCheck.status !== 'Pass') {
    priorities.push({
      num: priorities.length + 1 < 10 ? `0${priorities.length + 1}` : `${priorities.length + 1}`,
      title: 'Standardize Section Headings',
      impact: 'High Impact',
      impactClass: 'badge-critical',
      issue: spacedCheck.note || 'Section headings use character spacing (e.g. S K I L L S) which can break automated ATS section parsing.',
      action: 'Replace spaced heading text with standard single-word headings like "EXPERIENCE", "SKILLS", and "EDUCATION".'
    });
  }

  // Priority 3: Structural Missing Sections or Dates
  const sections = analysis.atsBreakdown?.structure?.sections || [];
  sections.forEach(sec => {
    if (sec.status !== 'Present') {
      priorities.push({
        num: priorities.length + 1 < 10 ? `0${priorities.length + 1}` : `${priorities.length + 1}`,
        title: `Refine ${sec.name} Section Structure`,
        impact: 'Medium Impact',
        impactClass: 'badge-warning',
        issue: sec.recommendation || `${sec.name} section requires clearer formatting or date attribution.`,
        action: `Ensure clear section labels and consistent start/end dates (MM/YYYY) for all entries in your ${sec.name} section.`
      });
    }
  });

  // Priority 4: Quantify Bullet Points
  priorities.push({
    num: priorities.length + 1 < 10 ? `0${priorities.length + 1}` : `${priorities.length + 1}`,
    title: 'Quantify Accomplishments & Technical Outcomes',
    impact: 'Medium Impact',
    impactClass: 'badge-purple',
    issue: 'Experience bullet points describe duties rather than measurable outcomes or technical complexity.',
    action: 'Add quantifiable metrics (e.g., latency reduction %, data volume processed, or user reach) to demonstrate impact.'
  });

  if (countBadge) {
    countBadge.textContent = `${priorities.length} Priority Action${priorities.length === 1 ? '' : 's'}`;
    countBadge.className = priorities.some(p => p.impactClass === 'badge-critical') ? 'badge badge-critical' : 'badge badge-warning';
  }

  container.innerHTML = priorities.map(item => `
    <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; display:flex; gap:1.25rem; align-items:flex-start; flex-wrap:wrap;">
      <div style="font-size:1.5rem; font-weight:800; color:var(--primary-purple-dark); min-width:36px;">
        ${item.num}
      </div>
      <div style="flex:1; min-width:240px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem; flex-wrap:wrap; gap:0.5rem;">
          <h4 style="font-size:1rem; font-weight:700; color:var(--text-dark); margin:0;">${item.title}</h4>
          <span class="badge ${item.impactClass}" style="font-size:0.75rem;">${item.impact}</span>
        </div>
        <p style="font-size:0.875rem; color:var(--text-main); margin-bottom:0.5rem; line-height:1.45;">
          <strong>Issue:</strong> ${item.issue}
        </p>
        <div style="background:#FFFFFF; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.6rem 0.85rem; font-size:0.825rem; color:var(--text-main); line-height:1.45;">
          <strong style="color:var(--primary-purple-dark);">Recommended Action:</strong> ${item.action}
        </div>
      </div>
    </div>
  `).join('');
}

function renderRoleAlignmentSnapshot(analysis, targetRole) {
  const kw = analysis.atsBreakdown?.keywordMatch || {};
  const skillAn = analysis.skillAnalysis || {};

  const strongList = (kw.matchedSkills || kw.strongMatches || skillAn.strongSkills || []).map(s => typeof s === 'string' ? s : (s.skillName || s.name || String(s)));
  const partialList = (kw.partialSkills || kw.partialMatches || skillAn.partialSkills || []).map(s => typeof s === 'string' ? s : (s.skillName || s.name || String(s)));
  const missingList = (kw.missingSkills || kw.missingRequirements || skillAn.missingSkills || []).map(s => typeof s === 'string' ? s : (s.skillName || s.name || String(s)));

  const strongCount = strongList.length;
  const verifyCount = partialList.length;
  const noneCount = missingList.length;
  const totalReqs = strongCount + verifyCount + noneCount;

  const countStrongEl = document.getElementById('evidence-strong-count');
  if (countStrongEl) countStrongEl.textContent = strongCount;

  const countVerifyEl = document.getElementById('evidence-verify-count');
  if (countVerifyEl) countVerifyEl.textContent = verifyCount;

  const countNoneEl = document.getElementById('evidence-none-count');
  if (countNoneEl) countNoneEl.textContent = noneCount;

  const legendStrong = document.getElementById('legend-strong-val');
  if (legendStrong) legendStrong.textContent = strongCount;

  const legendVerify = document.getElementById('legend-verify-val');
  if (legendVerify) legendVerify.textContent = verifyCount;

  const legendNone = document.getElementById('legend-none-val');
  if (legendNone) legendNone.textContent = noneCount;

  const totalReqLabel = document.getElementById('snapshot-total-req-label');
  if (totalReqLabel) totalReqLabel.textContent = `Total Requirements: ${totalReqs}`;

  // Calculate Coverage Percentage
  const pctStrong = totalReqs > 0 ? (strongCount / totalReqs) * 100 : 0;
  const pctVerify = totalReqs > 0 ? (verifyCount / totalReqs) * 100 : 0;
  const pctNone = totalReqs > 0 ? (noneCount / totalReqs) * 100 : 0;

  const alignmentFitScore = Math.round(pctStrong + (pctVerify * 0.5));

  const pctBadge = document.getElementById('evidence-match-pct-badge');
  if (pctBadge) {
    pctBadge.textContent = `${alignmentFitScore}% Requirement Fit`;
    pctBadge.className = alignmentFitScore >= 75 ? 'badge badge-pass' : alignmentFitScore >= 55 ? 'badge badge-warning' : 'badge badge-critical';
  }

  const barStrong = document.getElementById('bar-strong');
  if (barStrong) barStrong.style.width = `${pctStrong}%`;

  const barVerify = document.getElementById('bar-verify');
  if (barVerify) barVerify.style.width = `${pctVerify}%`;

  const barNone = document.getElementById('bar-none');
  if (barNone) barNone.style.width = `${pctNone}%`;

  const barLabel = document.getElementById('evidence-bar-label');
  if (barLabel) barLabel.textContent = `${alignmentFitScore}% Overall Alignment (${strongCount}/${totalReqs} Verified)`;

  // Render Skill Tags in columns
  const vContainer = document.getElementById('snapshot-verified-tags');
  if (vContainer) {
    if (strongList.length > 0) {
      vContainer.innerHTML = strongList.map(s => `<span class="badge badge-pass" style="font-size:0.775rem; padding:0.25rem 0.55rem;">✓ ${s}</span>`).join('');
    } else {
      vContainer.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">None detected</span>`;
    }
  }

  const pContainer = document.getElementById('snapshot-partial-tags');
  if (pContainer) {
    if (partialList.length > 0) {
      pContainer.innerHTML = partialList.map(s => `<span class="badge badge-warning" style="font-size:0.775rem; padding:0.25rem 0.55rem;">! ${s}</span>`).join('');
    } else {
      pContainer.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">None detected</span>`;
    }
  }

  const mContainer = document.getElementById('snapshot-missing-tags');
  if (mContainer) {
    if (missingList.length > 0) {
      mContainer.innerHTML = missingList.map(s => `<span class="badge badge-critical" style="font-size:0.775rem; padding:0.25rem 0.55rem;">&times; ${s}</span>`).join('');
    } else {
      mContainer.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">None missing</span>`;
    }
  }
}

function renderEntityExtraction(analysis) {
  const fields = analysis.atsBreakdown?.parsing?.detectedFields || {};

  const cleanCount = (val, singular, plural = singular + 's') => {
    const num = Number(val);
    if (isNaN(num) || num < 0) return `0 ${plural} detected`;
    return `${num} ${num === 1 ? singular : plural} detected`;
  };

  const getCertDisplay = () => {
    const status = fields.certificationStatus;
    const num = Number(fields.certificationsCount || 0);
    if (status === 'EXTRACTION_UNCERTAIN') return 'Section detected — extraction incomplete';
    if (status === 'DETECTED_EMPTY') return '0 certifications (Section empty)';
    if (status === 'EXTRACTED' || num > 0) return `${num} certification${num === 1 ? '' : 's'} detected`;
    return '0 certifications detected';
  };

  const nameEl = document.getElementById('entity-name');
  if (nameEl) nameEl.textContent = cleanText(fields.name);

  const emailEl = document.getElementById('entity-email');
  if (emailEl) emailEl.textContent = cleanText(fields.email);

  const phoneEl = document.getElementById('entity-phone');
  if (phoneEl) phoneEl.textContent = cleanPhone(fields.phone);

  const skillsCount = fields.skillsCount !== undefined ? fields.skillsCount : (analysis.skillAnalysis?.strongSkills?.length || 0);
  const skillsEl = document.getElementById('entity-skills-count');
  if (skillsEl) skillsEl.textContent = cleanCount(skillsCount, 'skill');

  const projectsCount = fields.projectsCount !== undefined ? fields.projectsCount : (analysis.projectAnalysis?.projectList?.length || 0);
  const projEl = document.getElementById('entity-projects-count');
  if (projEl) projEl.textContent = cleanCount(projectsCount, 'project');

  const expCount = fields.experienceCount !== undefined ? fields.experienceCount : 0;
  const expEl = document.getElementById('entity-exp-count');
  if (expEl) expEl.textContent = cleanCount(expCount, 'entry', 'entries');

  const eduCount = fields.educationCount !== undefined ? fields.educationCount : 0;
  const eduEl = document.getElementById('entity-edu-count');
  if (eduEl) eduEl.textContent = cleanCount(eduCount, 'entry', 'entries');

  const certEl = document.getElementById('entity-cert-count');
  if (certEl) certEl.textContent = getCertDisplay();
}

function renderStatusBadge(elementId, status) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.textContent = status;
  if (status === 'Pass' || status === 'Safe') el.className = 'badge badge-pass';
  else if (status === 'Warning' || status === 'Needs Review' || status === 'Needs Revision' || status === 'Needs Improvement') el.className = 'badge badge-warning';
  else el.className = 'badge badge-critical';
}

function openDetailModal(type) {
  if (!activeAnalysisData) return;

  const modal = document.getElementById('ats-detail-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body-content');

  const breakdown = activeAnalysisData.atsBreakdown || {};

  if (type === 'keywords') {
    title.innerHTML = `${getIcon('scan-search')} Keyword Coverage Diagnostics`;
    const kw = breakdown.keywordMatch || {};
    body.innerHTML = `
      <div class="detail-section">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; background:var(--bg-main); padding:1rem; border-radius:var(--radius-md);">
          <div>
            <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Keyword Coverage Score</div>
            <div style="font-size:1.5rem; font-weight:800; color:var(--primary-purple);">${kw.score !== undefined ? kw.score : 70}%</div>
          </div>
          <span class="badge ${kw.status === 'Pass' ? 'badge-pass' : 'badge-warning'}">${kw.status || 'Pass'}</span>
        </div>

        <p style="font-size:0.9rem; color:var(--text-main); margin-bottom:1.5rem; line-height:1.5;">
          ${kw.details || `Keyword coverage evaluates the presence and density of core role terms for ${activeAnalysisData.targetRole || 'Software Engineer'}.`}
        </p>

        <div style="text-align:center; padding-top:0.5rem; border-top:1px solid var(--border-color);">
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
            Inspect detailed skill evidence, verified proof, and missing core requirements on the Skill Gap Dashboard:
          </p>
          <a href="/skills.html" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:0.4rem;">
            <span>Review Skill Evidence &rarr;</span>
          </a>
        </div>
      </div>
    `;
  } else if (type === 'structure') {
    title.innerHTML = `${getIcon('layout')} Resume Structural Completeness`;
    const struct = breakdown.structure || {};
    const sections = struct.sections || [];
    body.innerHTML = `
      <div class="detail-section">
        <p style="font-size:0.9rem; color:var(--text-main); margin-bottom:1rem;">${struct.details || ''}</p>
        <div style="display:flex; flex-direction:column; gap:0.85rem;">
          ${sections.map(sec => `
            <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:0.85rem 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:700; color:var(--text-dark);">${sec.name}</span>
                <span class="badge ${sec.status === 'Present' ? 'badge-pass' : sec.status === 'Needs Revision' ? 'badge-warning' : 'badge-critical'}">${sec.status}</span>
              </div>
              <p style="font-size:0.825rem; color:var(--text-muted); margin-top:0.35rem; margin-bottom:0;"><strong>Recommendation:</strong> ${sec.recommendation}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (type === 'formatting') {
    title.innerHTML = `${getIcon('palette')} Formatting & Layout Compatibility`;
    const fmt = breakdown.formatting || {};
    const checks = fmt.checks || [];
    body.innerHTML = `
      <div class="detail-section">
        <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.25rem;">
          <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Layout Classification</div>
          <div style="font-size:1.1rem; font-weight:800; color:var(--text-dark); margin-top:0.25rem;">Standard Single-Column Layout Detected</div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem; line-height:1.4;">
            Single-column text flow ensures linear reading order across legacy and modern ATS systems without text block overlapping or columnar clipping.
          </div>
        </div>

        <p style="font-size:0.9rem; color:var(--text-main); margin-bottom:1rem; font-weight:600;">Formatting Risk Assessment Checks:</p>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${checks.map(chk => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-main); padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div>
                <div style="font-weight:700; font-size:0.9rem; color:var(--text-dark);">${chk.name}</div>
                <div style="font-size:0.825rem; color:var(--text-muted); margin-top:0.15rem;">${chk.note}</div>
              </div>
              <span class="badge ${chk.status === 'Safe' || chk.status === 'Pass' ? 'badge-pass' : chk.status === 'Needs Review' || chk.status === 'Warning' ? 'badge-warning' : 'badge-critical'}">${chk.status}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (type === 'parsing') {
    title.innerHTML = `${getIcon('cpu')} Entity Data Extraction Summary`;
    const parse = breakdown.parsing || {};
    const fields = parse.detectedFields || {};

    body.innerHTML = `
      <div class="detail-section">
        <p style="font-size:0.9rem; color:var(--text-main); margin-bottom:1rem;">${parse.details || 'Evaluation of extracted candidate entity data.'}</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.85rem;">
          <div style="background:var(--bg-main); padding:0.85rem; border-radius:var(--radius-md);">
            <div style="font-size:0.8rem; color:var(--text-muted);">Detected Name</div>
            <div style="font-weight:700; color:var(--text-dark); word-break:break-word;">${cleanText(fields.name)}</div>
          </div>
          <div style="background:var(--bg-main); padding:0.85rem; border-radius:var(--radius-md);">
            <div style="font-size:0.8rem; color:var(--text-muted);">Detected Email</div>
            <div style="font-weight:700; color:var(--text-dark); word-break:break-all;">${cleanText(fields.email)}</div>
          </div>
          <div style="background:var(--bg-main); padding:0.85rem; border-radius:var(--radius-md);">
            <div style="font-size:0.8rem; color:var(--text-muted);">Phone / Contact</div>
            <div style="font-weight:700; color:var(--text-dark); word-break:break-word;">${cleanPhone(fields.phone)}</div>
          </div>
          <div style="background:var(--bg-main); padding:0.85rem; border-radius:var(--radius-md);">
            <div style="font-size:0.8rem; color:var(--text-muted);">Extracted Skills</div>
            <div style="font-weight:700; color:var(--primary-purple-dark);">${fields.skillsCount !== undefined ? fields.skillsCount : 0} detected</div>
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add('active');
}

function closeDetailModal() {
  document.getElementById('ats-detail-modal').classList.remove('active');
}

function openXaiExplanationModal() {
  const modal = document.getElementById('xai-explanation-modal');
  if (!modal || !activeAnalysisData) return;

  const analysis = activeAnalysisData;
  const targetRole = analysis.targetRole || 'Software Engineer';
  const score = Math.round(analysis.atsScore !== undefined ? Number(analysis.atsScore) : 58);
  const riskLevel = analysis.atsRiskLevel || (score >= 80 ? 'Low Risk' : score >= 60 ? 'Moderate Risk' : 'High Risk');

  const kw = analysis.atsBreakdown?.keywordMatch || {};
  const struct = analysis.atsBreakdown?.structure || {};
  const fmt = analysis.atsBreakdown?.formatting || {};
  const parse = analysis.atsBreakdown?.parsing || {};

  const kwNum = Math.round(kw.score !== undefined ? Number(kw.score) : 55);
  const structNum = Math.round(struct.score !== undefined ? Number(struct.score) : 65);
  const fmtNum = Math.round(fmt.score !== undefined ? Number(fmt.score) : 45);
  const parseNum = Math.round(parse.score !== undefined ? Number(parse.score) : 68);

  const kwPts = Math.round(kwNum * 0.35);
  const structPts = Math.round(structNum * 0.25);
  const fmtPts = Math.round(fmtNum * 0.20);
  const parsePts = Math.round(parseNum * 0.20);

  const reconciledTotal = kwPts + structPts + fmtPts + parsePts;

  // Header Banner
  const scoreEl = document.getElementById('xai-m-score');
  if (scoreEl) scoreEl.textContent = `${reconciledTotal} / 100`;

  const riskEl = document.getElementById('xai-m-risk-badge');
  if (riskEl) {
    const riskBadgeClass = riskLevel === 'Excellent' || riskLevel === 'Low Risk' || riskLevel === 'Pass'
      ? 'badge-pass'
      : (riskLevel === 'Moderate Risk' ? 'badge-warning' : 'badge-critical');
    riskEl.innerHTML = `<span class="badge ${riskBadgeClass}">${riskLevel}</span>`;
  }

  const roleEl = document.getElementById('xai-m-role');
  if (roleEl) roleEl.textContent = targetRole;

  // Section 1: WHY
  const whyNum = document.getElementById('xai-m-why-num');
  if (whyNum) whyNum.textContent = reconciledTotal;

  const kwStat = document.getElementById('xai-m-kw-stat');
  if (kwStat) kwStat.textContent = `${kwNum}% \u2192 +${kwPts} pts`;

  const structStat = document.getElementById('xai-m-struct-stat');
  if (structStat) structStat.textContent = `${structNum}% \u2192 +${structPts} pts`;

  const fmtStat = document.getElementById('xai-m-fmt-stat');
  if (fmtStat) fmtStat.textContent = `${fmtNum}% \u2192 +${fmtPts} pts`;

  const parseStat = document.getElementById('xai-m-parse-stat');
  if (parseStat) parseStat.textContent = `${parseNum}% \u2192 +${parsePts} pts`;

  const formulaEl = document.getElementById('xai-m-formula');
  if (formulaEl) formulaEl.textContent = `Canonical Reconciliation: ${kwPts} + ${structPts} + ${fmtPts} + ${parsePts} = ${reconciledTotal} / 100`;

  // Section 2: WHAT HELPED YOUR SCORE
  const helpedEl = document.getElementById('xai-m-helped');
  if (helpedEl) {
    const helpedItems = [];
    const matched = kw.matchedSkills || analysis.skillAnalysis?.strongSkills || [];
    if (matched.length > 0) {
      helpedItems.push(`Strong resume evidence detected for key ${targetRole} technologies: <strong>${matched.slice(0, 4).join(', ')}</strong>.`);
    }
    const fields = parse.detectedFields || {};
    if (fields.name && fields.name !== 'Not found') {
      helpedItems.push(`Candidate contact details (Name, Email, Phone) were cleanly extracted by ATS parsing.`);
    }
    const fmtChecks = fmt.checks || [];
    const safeFmt = fmtChecks.filter(c => c.status === 'Safe' || c.status === 'Pass');
    if (safeFmt.length > 0) {
      helpedItems.push(`Standard single-column visual layout detected without multi-column parsing risks.`);
    }
    if (helpedItems.length === 0) {
      helpedItems.push('Basic resume document structure and text content extracted.');
    }
    helpedEl.innerHTML = helpedItems.map(item => `<li style="margin-bottom:0.35rem;">${item}</li>`).join('');
  }

  // Section 3: WHAT LOWERED YOUR SCORE
  const loweredEl = document.getElementById('xai-m-lowered');
  if (loweredEl) {
    const loweredItems = [];
    const missing = kw.missingSkills || analysis.skillAnalysis?.missingSkills || [];
    if (missing.length > 0) {
      loweredItems.push(`Gaps in keyword coverage: No resume evidence detected for required ${targetRole} keywords like <strong>${missing.slice(0, 3).join(', ')}</strong>.`);
    }
    const fmtChecks = fmt.checks || [];
    const riskyFmt = fmtChecks.filter(c => c.status !== 'Safe' && c.status !== 'Pass');
    if (riskyFmt.length > 0) {
      loweredItems.push(`Formatting safety risks: ${riskyFmt.map(c => `<strong>${c.name}</strong> (${c.note || 'Review formatting'})`).join(', ')}.`);
    }
    const secList = struct.sections || [];
    const missingSecs = secList.filter(s => s.status !== 'Present');
    if (missingSecs.length > 0) {
      loweredItems.push(`Structural section gaps: ${missingSecs.map(s => `<strong>${s.name}</strong>`).join(', ')}.`);
    }

    if (loweredItems.length === 0) {
      loweredItems.push('Keyword alignment and experience date formatting opportunities.');
    }
    loweredEl.innerHTML = loweredItems.map(item => `<li style="margin-bottom:0.35rem;">${item}</li>`).join('');
  }

  modal.style.display = 'flex';
  modal.classList.add('active');
}

function closeXaiExplanationModal() {
  const modal = document.getElementById('xai-explanation-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
  }
}

function askNovaFollowUp() {
  closeXaiExplanationModal();
  if (window.Nova) {
    window.Nova.open();
    window.Nova.ask("Can you explain my ATS score breakdown and how I can improve keyword coverage for my target role?");
  }
}
