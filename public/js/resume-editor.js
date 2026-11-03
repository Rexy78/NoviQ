/**
 * Resume Improvement Studio Controller
 */
const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

let activeAnalysis = null;

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
    activeAnalysis = data.analysis;

    const targetRole = activeAnalysis.targetRole || 'Software Engineer';
    const rolePill = document.getElementById('studio-role-pill');
    if (rolePill) rolePill.innerHTML = `${getIcon('target')} Target Role: ${targetRole}`;

    // Populate AI Suggestions
    renderAiSuggestions(activeAnalysis, targetRole);

    // Prefill Editor Fields from Analysis
    prefillEditorFields(activeAnalysis);

    // Initial Live Preview Render
    updateLivePreview();

  } catch (err) {
    console.error('Error loading resume studio:', err);
    API.showToast('Failed to load resume analysis data.', 'error');
  }
});

function switchSectionTab(tabName) {
  ['summary', 'skills', 'experience', 'projects', 'education'].forEach(t => {
    const btn = document.getElementById(`stab-${t}`);
    const view = document.getElementById(`sec-view-${t}`);

    if (btn) {
      if (t === tabName) {
        btn.className = 'btn btn-primary btn-sm';
      } else {
        btn.className = 'btn btn-outline btn-sm';
      }
    }

    if (view) {
      if (t === tabName) {
        view.style.display = 'block';
      } else {
        view.style.display = 'none';
      }
    }
  });
}

function renderAiSuggestions(analysis, targetRole) {
  const container = document.getElementById('ai-studio-suggestions');
  if (!container) return;

  const missingSkills = analysis.skillAnalysis?.missingSkills || [];
  const topGaps = missingSkills.slice(0, 3).map(s => s.skillName || s.name || s).join(', ');

  const suggestions = [];

  if (topGaps) {
    suggestions.push(`<strong>Incorporate Target Keywords:</strong> Add evidence for missing core skills (${topGaps}) into your skills list or project bullets.`);
  }

  const kwScore = analysis.atsBreakdown?.keywordMatch?.score || 35;
  if (kwScore < 60) {
    suggestions.push(`<strong>Boost Keyword Match (${kwScore}/100):</strong> Ensure explicit role-specific terms for ${targetRole} appear in your Experience and Skills sections.`);
  }

  suggestions.push(`<strong>Quantify Bullet Accomplishments:</strong> Include measurable outcomes (e.g. reduction %, latency ms, users served) in your bullet points.`);

  container.innerHTML = suggestions.map(s => `
    <div style="background:#FFFFFF; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.6rem 0.85rem; margin-bottom:0.5rem; line-height:1.4;">
      ${s}
    </div>
  `).join('');
}

function prefillEditorFields(analysis) {
  const fields = analysis.atsBreakdown?.parsing?.detectedFields || {};

  const nameInput = document.getElementById('edit-candidate-name');
  if (nameInput) nameInput.value = fields.name && fields.name !== 'Not found' ? fields.name : 'ALEX MORGAN';

  const contactInput = document.getElementById('edit-candidate-contact');
  if (contactInput) {
    const parts = [];
    if (fields.email && fields.email !== 'Not found') parts.push(fields.email);
    if (fields.phone && fields.phone !== 'Not found') parts.push(fields.phone);
    contactInput.value = parts.length > 0 ? parts.join(' | ') : 'alex@example.com | (555) 019-2831 | San Francisco, CA';
  }

  const skillsInput = document.getElementById('edit-skills-text');
  if (skillsInput) {
    const strongSkills = analysis.skillAnalysis?.strongSkills || [];
    const partialSkills = analysis.skillAnalysis?.partialSkills || [];
    const allDetected = [...strongSkills.map(s => s.skillName || s.name || s), ...partialSkills.map(s => s.skillName || s.name || s)];

    if (allDetected.length > 0) {
      skillsInput.value = allDetected.join(', ');
    }
  }

  const expInput = document.getElementById('edit-experience-text');
  if (expInput) {
    const extractedBullets = analysis.experienceAnalysis?.extractedBullets || [];
    if (extractedBullets.length > 0) {
      expInput.value = extractedBullets.map(b => `• ${b.bulletText || b}`).join('\n');
    }
  }

  const projInput = document.getElementById('edit-projects-text');
  if (projInput) {
    const projectList = analysis.projectAnalysis?.projectList || [];
    if (projectList.length > 0) {
      projInput.value = projectList.map(p => {
        const stack = (p.techStack || []).join(', ');
        return `• ${p.name || 'Project'}: ${p.description || 'Developed technical application.'} (${stack})`;
      }).join('\n');
    }
  }
}

function updateLivePreview() {
  const nameVal = document.getElementById('edit-candidate-name')?.value || 'ALEX MORGAN';
  const contactVal = document.getElementById('edit-candidate-contact')?.value || 'San Francisco, CA | alex@example.com';
  const summaryVal = document.getElementById('edit-summary-text')?.value || 'Results-driven Software Engineer with hands-on experience in full-stack web architectures...';
  const skillsVal = document.getElementById('edit-skills-text')?.value || 'JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, REST APIs';
  const expVal = document.getElementById('edit-experience-text')?.value || '• Developed scalable backend API services.';
  const projVal = document.getElementById('edit-projects-text')?.value || '• Web Platform: Built with React and Node.js.';
  const eduVal = document.getElementById('edit-education-text')?.value || 'B.S. in Computer Science | State University (2024)';

  const prevName = document.getElementById('prev-name'); if (prevName) prevName.textContent = nameVal.toUpperCase();
  const prevContact = document.getElementById('prev-contact'); if (prevContact) prevContact.textContent = contactVal;
  const prevSummary = document.getElementById('prev-summary'); if (prevSummary) prevSummary.textContent = summaryVal;
  const prevSkills = document.getElementById('prev-skills'); if (prevSkills) prevSkills.textContent = skillsVal;

  const prevExp = document.getElementById('prev-experience');
  if (prevExp) {
    const bullets = expVal.split('\n').filter(line => line.trim().length > 0);
    prevExp.innerHTML = bullets.map(b => `<li>${b.replace(/^[•\-\*]\s*/, '')}</li>`).join('');
  }

  const prevProj = document.getElementById('prev-projects');
  if (prevProj) {
    const bullets = projVal.split('\n').filter(line => line.trim().length > 0);
    prevProj.innerHTML = bullets.map(b => `<li>${b.replace(/^[•\-\*]\s*/, '')}</li>`).join('');
  }

  const prevEdu = document.getElementById('prev-education'); if (prevEdu) prevEdu.textContent = eduVal;
}

function exportResumeText() {
  const paper = document.getElementById('resume-paper-preview');
  if (!paper) return;

  const textContent = paper.innerText;
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ATS_Optimized_Resume.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  API.showToast('Exported clean ATS plain text resume file.', 'success');
}
