/**
 * CareerNova — Skill Gap Intelligence Controller
 * Balanced Information Density + Interactive Detail Modals with Background Blur
 */

let globalAnalysisData = null;
let matrixSkillFilter = 'all';
let matrixSearchQuery = '';

// The 10 canonical benchmark competencies for Frontend Developer
const BENCHMARK_SKILLS = [
  {
    skillName: 'JavaScript',
    priority: 'High',
    priorityGroup: 'HIGH PRIORITY',
    simpleStatus: 'VERIFIED',
    statusText: 'Verified',
    evidenceType: 'Practical Evidence',
    related: ['Node.js ✓'],
    shortGap: 'Practical implementation demonstrated in resume through web application projects.',
    whatWeFound: 'Demonstrated practical implementation of core ES6+ JavaScript, asynchronous workflows, and DOM-related logic across client-facing application projects and backend services.',
    whyThisIsAGap: 'No gap detected. JavaScript meets the core requirement for Frontend Developer benchmark competencies.',
    recommendedAction: 'Maintain verified status and add measurable metrics (load speed reductions, execution time, state optimization) to project descriptions.',
    resumeImprovement: 'Quantify impact in bullet points (e.g., "Engineered client-side state handling reducing UI re-render latency by 28% across 12 views").'
  },
  {
    skillName: 'HTML & CSS',
    priority: 'High',
    priorityGroup: 'HIGH PRIORITY',
    simpleStatus: 'PARTIAL',
    statusText: 'Partial',
    evidenceType: 'Learning Evidence',
    related: [],
    shortGap: 'Practical CSS styling and modern layout implementation are not currently demonstrated in project evidence.',
    whatWeFound: 'HTML is referenced in coursework and foundational skill listings. Practical CSS styling, responsive grid systems, and component layout architectures are not yet evidenced in projects.',
    whyThisIsAGap: 'Frontend Developer benchmarks require practical proof of building responsive, polished user interfaces with modern CSS (Flexbox, Grid, custom properties) beyond basic markup syntax.',
    recommendedAction: 'Build a complete styled web interface or reusable UI component library using CSS Flexbox and Grid, demonstrating responsive layouts across mobile and desktop breakpoints.',
    resumeImprovement: 'Add a dedicated project bullet: "Developed responsive, accessible UI layouts using modern CSS Flexbox and Grid, ensuring WCAG 2.1 AA compliance across 5 viewport breakpoints."'
  },
  {
    skillName: 'TypeScript',
    priority: 'High',
    priorityGroup: 'HIGH PRIORITY',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    related: ['JavaScript ✓'],
    shortGap: 'Static typing and TypeScript implementation are not currently evidenced.',
    whatWeFound: 'No mention of TypeScript, custom type interfaces, generics, or compiler configuration in any resume sections, despite strong existing JavaScript foundation.',
    whyThisIsAGap: 'Modern frontend enterprise roles heavily standardize on TypeScript for scalable codebases, type-safe API contracts, and team maintainability.',
    recommendedAction: 'Migrate an existing JavaScript project to TypeScript or initialize a new project with strict TypeScript compilation, custom data models, and typed component props.',
    resumeImprovement: 'Highlight TypeScript adoption on your resume: "Architected fully typed React application with custom interfaces and strict compiler settings, eliminating runtime type errors."'
  },
  {
    skillName: 'React.js',
    priority: 'High',
    priorityGroup: 'HIGH PRIORITY',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    related: ['JavaScript ✓', 'Node.js ✓'],
    shortGap: 'Frontend framework architecture and component state management are not currently evidenced.',
    whatWeFound: 'Resume demonstrates core JavaScript and Node.js fundamentals, but lacks evidence of modern component-based SPA frameworks like React.js.',
    whyThisIsAGap: 'React is the primary UI framework required for this target role to build reusable component hierarchies, manage complex state, and handle side effects.',
    recommendedAction: 'Build a multi-view Single Page Application using React 18+ functional components, custom hooks (useEffect, useMemo), and state management solutions.',
    resumeImprovement: 'Feature React clearly in your technical summary and project experience: "Developed interactive multi-page React application utilizing custom hooks and centralized state management."'
  },
  {
    skillName: 'REST APIs',
    priority: 'High',
    priorityGroup: 'HIGH PRIORITY',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    related: ['JavaScript ✓', 'Node.js ✓'],
    shortGap: 'Client-side asynchronous data fetching and API error handling are not currently evidenced.',
    whatWeFound: 'Backend Node.js experience is detected, but client-side asynchronous HTTP fetching, caching, loading skeletons, and response error boundaries are not documented.',
    whyThisIsAGap: 'Frontend developers must reliably connect UI components to remote RESTful endpoints, parse JSON payloads, manage pagination, and handle edge-case network errors.',
    recommendedAction: 'Integrate public or custom REST APIs using Fetch/Axios with comprehensive async/await error handling, search debouncing, and pagination.',
    resumeImprovement: 'Add specific API integration bullets: "Integrated RESTful microservices with asynchronous client fetching, optimistic UI updates, and robust error-fallback states."'
  },
  {
    skillName: 'Responsive Design',
    priority: 'Medium',
    priorityGroup: 'MEDIUM PRIORITY',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    related: ['HTML & CSS ⚠'],
    shortGap: 'Mobile-first layout and responsive breakpoint implementation are not currently evidenced.',
    whatWeFound: 'No direct resume evidence demonstrating mobile-first CSS architecture, fluid typography, breakpoint strategies, or cross-browser responsive testing.',
    whyThisIsAGap: 'Production web applications demand seamless responsiveness across mobile, tablet, and widescreen viewports with accessible touch targets and adaptive UI.',
    recommendedAction: 'Adopt a mobile-first design system utilizing media queries, container queries, and responsive CSS Grid/Flexbox across standard device viewports.',
    resumeImprovement: 'Document responsive capabilities: "Engineered mobile-first responsive interfaces supporting viewports from 320px to 4K displays with zero layout shift (CLS < 0.05)."'
  },
  {
    skillName: 'Git / Version Control',
    priority: 'Medium',
    priorityGroup: 'MEDIUM PRIORITY',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    related: [],
    shortGap: 'Version control workflows, branching, and pull request collaboration are not currently evidenced.',
    whatWeFound: 'Git, GitHub, commit discipline, or collaborative branching workflows are not explicitly documented in the resume experience or skills section.',
    whyThisIsAGap: 'Collaborative software engineering requires daily proficiency in Git branching strategies (feature branches, rebasing, merge conflicts), commit hygiene, and code reviews.',
    recommendedAction: 'Publish project code to an active GitHub profile with clear commit histories, conventional commit messages, feature branches, and comprehensive README documentation.',
    resumeImprovement: 'Include Git in your technical toolkit and link your GitHub profile with documented repository contributions and clean PR workflows.'
  },
  {
    skillName: 'Build Tools',
    priority: 'Supporting',
    priorityGroup: 'SUPPORTING',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    related: [],
    shortGap: 'Modern bundling, asset optimization, and npm toolchain configuration are not currently evidenced.',
    whatWeFound: 'No mention of modern frontend bundlers (Vite, Webpack, Rollup, Turbopack) or build optimization pipelines.',
    whyThisIsAGap: 'Production frontend development requires configuring bundlers for hot module replacement, code splitting, tree shaking, and static asset optimization.',
    recommendedAction: 'Set up a custom build pipeline using Vite with optimized production bundling, environment variables, and minification.',
    resumeImprovement: 'Add toolchain experience to resume: "Configured Vite build toolchain with code-splitting and asset minification, reducing initial bundle size by 35%."'
  },
  {
    skillName: 'Testing & QA',
    priority: 'Supporting',
    priorityGroup: 'SUPPORTING',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    related: [],
    shortGap: 'Unit, integration, or end-to-end frontend testing suites are not currently evidenced.',
    whatWeFound: 'No mention of automated frontend testing libraries (Vitest, Jest, React Testing Library, Playwright, Cypress) in resume projects.',
    whyThisIsAGap: 'Industry-standard engineering practices emphasize test coverage for critical UI component logic, state transitions, and asynchronous API interactions.',
    recommendedAction: 'Write automated unit and component integration tests using Vitest and React Testing Library, testing user interactions and error states.',
    resumeImprovement: 'Detail testing coverage on resume: "Authored unit and component tests with Vitest and Testing Library, achieving 80%+ code coverage on core user flows."'
  },
  {
    skillName: 'CI/CD',
    priority: 'Supporting',
    priorityGroup: 'SUPPORTING',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    related: [],
    shortGap: 'Automated build, test, and deployment workflows are not currently evidenced.',
    whatWeFound: 'No resume evidence of automated deployment pipelines, GitHub Actions workflows, or cloud hosting platform integrations.',
    whyThisIsAGap: 'Modern engineering teams rely on continuous integration pipelines to lint, test, and deploy applications automatically on every pull request.',
    recommendedAction: 'Create a GitHub Actions workflow that automatically runs linting, test execution, and deployment to platforms like Vercel, Netlify, or Cloud Run.',
    resumeImprovement: 'Add CI/CD automation to project descriptions: "Implemented automated CI/CD pipeline using GitHub Actions to validate tests and trigger zero-downtime production deployments."'
  }
];

// All 10 Canonical Benchmark Competencies mapped to Real Resume Evidence for the Evidence Map
const SKILL_EVIDENCE_MAP_DATA = [
  {
    skillName: 'JavaScript',
    simpleStatus: 'VERIFIED',
    statusText: 'Verified',
    evidenceType: 'Practical Evidence',
    resumeSource: 'Web Application Project',
    resumeDetail: 'ES6+ JavaScript, async workflows, routing, MongoDB & Node.js integration',
    detectedBadge: '✓ Practical Evidence',
    detectedBadgeClass: 'badge-verified',
    borderClass: 'border-ver',
    benchmarkLabel: 'Frontend Developer: JavaScript',
    benchmarkBadge: '✓ Verified',
    benchmarkBadgeClass: 'badge-verified',
    tooltip: 'JavaScript • ✓ Verified • Practical Project Evidence'
  },
  {
    skillName: 'HTML & CSS',
    simpleStatus: 'PARTIAL',
    statusText: 'Partial',
    evidenceType: 'Learning Evidence',
    resumeSource: 'Technical Coursework & Certifications',
    resumeDetail: 'HTML coursework listed; missing practical CSS Grid/Flexbox styling',
    detectedBadge: '◐ Learning Evidence',
    detectedBadgeClass: 'badge-partial',
    borderClass: 'border-par',
    benchmarkLabel: 'Frontend Developer: HTML & CSS',
    benchmarkBadge: '⚠ Partial',
    benchmarkBadgeClass: 'badge-partial',
    tooltip: 'HTML & CSS • ⚠ Partial • Learning / Coursework Evidence'
  },
  {
    skillName: 'TypeScript',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    resumeSource: 'No matching resume evidence',
    resumeDetail: 'No static typing or TypeScript interfaces found in projects or coursework',
    detectedBadge: '✕ No Resume Evidence',
    detectedBadgeClass: 'badge-missing',
    borderClass: 'border-mis',
    benchmarkLabel: 'Frontend Developer: TypeScript',
    benchmarkBadge: '✕ No Evidence',
    benchmarkBadgeClass: 'badge-missing',
    tooltip: 'TypeScript • ✕ No Resume Evidence • No matching evidence detected'
  },
  {
    skillName: 'React.js',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    resumeSource: 'No matching resume evidence',
    resumeDetail: 'No component-based UI framework or React state hooks found in resume',
    detectedBadge: '✕ No Resume Evidence',
    detectedBadgeClass: 'badge-missing',
    borderClass: 'border-mis',
    benchmarkLabel: 'Frontend Developer: React.js',
    benchmarkBadge: '✕ No Evidence',
    benchmarkBadgeClass: 'badge-missing',
    tooltip: 'React.js • ✕ No Resume Evidence • No matching evidence detected'
  },
  {
    skillName: 'REST APIs',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    resumeSource: 'No matching resume evidence',
    resumeDetail: 'Client-side async HTTP fetch & error handling not documented',
    detectedBadge: '✕ No Resume Evidence',
    detectedBadgeClass: 'badge-missing',
    borderClass: 'border-mis',
    benchmarkLabel: 'Frontend Developer: REST APIs',
    benchmarkBadge: '✕ No Evidence',
    benchmarkBadgeClass: 'badge-missing',
    tooltip: 'REST APIs • ✕ No Resume Evidence • No matching evidence detected'
  },
  {
    skillName: 'Responsive Design',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    resumeSource: 'No matching resume evidence',
    resumeDetail: 'Mobile-first layouts and breakpoint media queries not documented',
    detectedBadge: '✕ No Resume Evidence',
    detectedBadgeClass: 'badge-missing',
    borderClass: 'border-mis',
    benchmarkLabel: 'Frontend Developer: Responsive Design',
    benchmarkBadge: '✕ No Evidence',
    benchmarkBadgeClass: 'badge-missing',
    tooltip: 'Responsive Design • ✕ No Resume Evidence • No matching evidence detected'
  },
  {
    skillName: 'Git / Version Control',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    resumeSource: 'No matching resume evidence',
    resumeDetail: 'Git repositories, branching, and pull requests not explicitly documented',
    detectedBadge: '✕ No Resume Evidence',
    detectedBadgeClass: 'badge-missing',
    borderClass: 'border-mis',
    benchmarkLabel: 'Frontend Developer: Git / Version Control',
    benchmarkBadge: '✕ No Evidence',
    benchmarkBadgeClass: 'badge-missing',
    tooltip: 'Git / Version Control • ✕ No Resume Evidence • No matching evidence detected'
  },
  {
    skillName: 'Build Tools',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    resumeSource: 'No matching resume evidence',
    resumeDetail: 'Frontend bundlers (Vite/Webpack) & npm toolchain not documented',
    detectedBadge: '✕ No Resume Evidence',
    detectedBadgeClass: 'badge-missing',
    borderClass: 'border-mis',
    benchmarkLabel: 'Frontend Developer: Build Tools',
    benchmarkBadge: '✕ No Evidence',
    benchmarkBadgeClass: 'badge-missing',
    tooltip: 'Build Tools • ✕ No Resume Evidence • No matching evidence detected'
  },
  {
    skillName: 'Testing & QA',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    resumeSource: 'No matching resume evidence',
    resumeDetail: 'Automated test suites (Vitest/Jest/Testing Library) not documented',
    detectedBadge: '✕ No Resume Evidence',
    detectedBadgeClass: 'badge-missing',
    borderClass: 'border-mis',
    benchmarkLabel: 'Frontend Developer: Testing & QA',
    benchmarkBadge: '✕ No Evidence',
    benchmarkBadgeClass: 'badge-missing',
    tooltip: 'Testing & QA • ✕ No Resume Evidence • No matching evidence detected'
  },
  {
    skillName: 'CI/CD',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    resumeSource: 'No matching resume evidence',
    resumeDetail: 'Automated CI/CD build & deployment pipelines not documented',
    detectedBadge: '✕ No Resume Evidence',
    detectedBadgeClass: 'badge-missing',
    borderClass: 'border-mis',
    benchmarkLabel: 'Frontend Developer: CI/CD',
    benchmarkBadge: '✕ No Evidence',
    benchmarkBadgeClass: 'badge-missing',
    tooltip: 'CI/CD • ✕ No Resume Evidence • No matching evidence detected'
  }
];

// Map Interactive States
let evidenceMapFilter = 'all';
let evidenceMapSearch = '';
let highlightedMapSkill = null;

// Supporting Skills detected outside benchmark with complete evidence metadata
const SUPPORTING_SKILLS_DATA = [
  {
    skillName: 'Node.js',
    categoryTag: 'Relevant Supporting',
    tagClass: 'supp-tag-relevant',
    evidenceType: 'Practical Evidence',
    evidenceLevel: '✓ Practical Evidence',
    evidenceClass: 'pill-practical',
    usedIn: 'Web Application Project',
    whyItMatters: 'Provides backend/API experience that directly supports frontend integration.',
    whyDetected: 'Node.js was identified in the "Web Application Project" alongside JavaScript routing and database integration.',
    evidenceFull: 'Practical project evidence demonstrated in backend API implementation and service integration.',
    relevanceDetail: 'Node.js provides useful backend knowledge and can support frontend developers working with APIs, full-stack applications, and server-side rendering.',
    howToStrengthen: 'Document API development, integration, authentication, and deployment experience in future projects.'
  },
  {
    skillName: 'SQL',
    categoryTag: 'Relevant Supporting',
    tagClass: 'supp-tag-relevant',
    evidenceType: 'Learning Evidence',
    evidenceLevel: '◐ Learning Evidence',
    evidenceClass: 'pill-learning',
    usedIn: 'Database Coursework / Certifications',
    whyItMatters: 'Useful for understanding data schemas, payload contracts, and database queries.',
    whyDetected: 'SQL / relational databases were identified through coursework modules and technical skill listings.',
    evidenceFull: 'Coursework and academic projects covering relational database modeling, queries, and schema joins.',
    relevanceDetail: 'Understanding relational data models enables frontend engineers to better comprehend backend API contracts and complex state structures.',
    howToStrengthen: 'Connect a frontend application to a database-backed API showcasing data querying, mutations, and pagination.'
  },
  {
    skillName: 'Python',
    categoryTag: 'Transferable',
    tagClass: 'supp-tag-transferable',
    evidenceType: 'Learning Evidence',
    evidenceLevel: '◐ Learning Evidence',
    evidenceClass: 'pill-learning',
    usedIn: 'Academic Coursework & Technical Skills',
    whyItMatters: 'Transferable programming experience demonstrating broader problem-solving versatility.',
    whyDetected: 'Python was documented in technical coursework, scripting exercises, and programming fundamentals.',
    evidenceFull: 'Learning evidence demonstrated in foundational computer science coursework and algorithmic exercises.',
    relevanceDetail: 'Strong multi-language fluency accelerates mastering frontend abstractions, data structures, and automation scripting.',
    howToStrengthen: 'Build lightweight automation tools, web scrapers, or mock backend endpoints in Python to support frontend testing.'
  },
  {
    skillName: 'Java',
    categoryTag: 'Transferable',
    tagClass: 'supp-tag-transferable',
    evidenceType: 'Learning Evidence',
    evidenceLevel: '◐ Learning Evidence',
    evidenceClass: 'pill-learning',
    usedIn: 'Object-Oriented Programming Coursework',
    whyItMatters: 'Shows strong object-oriented design and typed programming fundamentals.',
    whyDetected: 'Java was identified in object-oriented programming coursework and academic software engineering modules.',
    evidenceFull: 'Coursework evidence covering OOP principles, class design, patterns, and data structures.',
    relevanceDetail: 'Familiarity with strictly-typed object-oriented paradigms strongly accelerates mastering TypeScript and modular component architecture.',
    howToStrengthen: 'Leverage strong typing principles from Java to architect robust TypeScript interfaces and design patterns in frontend projects.'
  },
  {
    skillName: 'Cloud Computing',
    categoryTag: 'Other Detected',
    tagClass: 'supp-tag-other',
    evidenceType: 'Learning Evidence',
    evidenceLevel: '◐ Learning Evidence',
    evidenceClass: 'pill-learning',
    usedIn: 'Cloud Fundamentals & Infrastructure Courses',
    whyItMatters: 'Provides foundational exposure to cloud hosting and deployment environments.',
    whyDetected: 'Cloud computing concepts identified in academic training modules and technical overview listings.',
    evidenceFull: 'Learning evidence from cloud overview certifications and introductory hosting labs.',
    relevanceDetail: 'Understanding cloud hosting (serverless, CDNs, object storage) is essential for deploying and optimizing modern frontend web apps.',
    howToStrengthen: 'Deploy a live single-page application to cloud infrastructure (Cloud Run, Vercel, AWS S3/CloudFront) with custom domains and SSL.'
  },
  {
    skillName: 'Problem Solving',
    categoryTag: 'Other Detected',
    tagClass: 'supp-tag-other',
    evidenceType: 'Mentioned',
    evidenceLevel: '• Mentioned',
    evidenceClass: 'pill-mentioned',
    usedIn: 'Resume Skills Summary',
    whyItMatters: 'Supports general engineering capability but lacks direct practical evidence.',
    whyDetected: 'Listed as a core engineering capability in the technical competencies and soft skills section.',
    evidenceFull: 'Mentioned in resume summary without dedicated practical project artifacts.',
    relevanceDetail: 'Demonstrates analytical mindset and foundational engineering problem breakdown capability.',
    howToStrengthen: 'Translate problem-solving claims into concrete project impact metrics demonstrating performance optimizations and bug resolutions.'
  }
];

document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();

  // Global ESC key listener for modal closing
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSkillDetailModal();
      closeAllReqModal();
      closeSupportingModal();
    }
  });

  const activeAnalysisId = localStorage.getItem('ci_active_analysis_id');
  if (!activeAnalysisId) {
    API.showToast('No active analysis found. Redirecting to upload...', 'info');
    setTimeout(() => window.location.href = '/upload.html', 1000);
    return;
  }

  try {
    const data = await API.request(`/api/analyses/${activeAnalysisId}`);
    globalAnalysisData = data.analysis;
    renderSkillsPage(globalAnalysisData);
  } catch (err) {
    console.error('Error fetching skills:', err);
    API.showToast('Failed to load skill gap data.', 'error');
  }
});

function renderSkillsPage(analysis) {
  if (!analysis) return;

  const targetRole = analysis.targetRole || 'Frontend Developer';
  const roleText = document.getElementById('skills-role-text');
  if (roleText) roleText.textContent = targetRole;

  const covRoleText = document.getElementById('cov-role-name');
  if (covRoleText) covRoleText.textContent = targetRole;

  // Calculate Benchmark Counts
  const verifiedCount = BENCHMARK_SKILLS.filter(s => s.simpleStatus === 'VERIFIED').length;
  const partialCount = BENCHMARK_SKILLS.filter(s => s.simpleStatus === 'PARTIAL').length;
  const missingCount = BENCHMARK_SKILLS.filter(s => s.simpleStatus === 'MISSING').length;
  const totalRequired = BENCHMARK_SKILLS.length; // 10

  // Formula: ((Verified × 1.0 + Partial × 0.5) / 10) × 100 = 15%
  const calculatedScore = Math.round(((verifiedCount * 1.0 + partialCount * 0.5) / totalRequired) * 100);

  // 1. HERO LEFT SIDE: Dominant Score & Evidence Formula
  const valEl = document.getElementById('skill-match-banner-val');
  if (valEl) valEl.textContent = `${calculatedScore}%`;

  const levelBadge = document.getElementById('match-level-badge');
  if (levelBadge) {
    if (calculatedScore >= 75) {
      levelBadge.textContent = 'High Alignment';
      levelBadge.className = 'status-badge-hero badge-success';
    } else if (calculatedScore >= 40) {
      levelBadge.textContent = 'Moderate Alignment';
      levelBadge.className = 'status-badge-hero badge-moderate';
    } else {
      levelBadge.textContent = 'Needs Improvement';
      levelBadge.className = 'status-badge-hero badge-warning';
    }
  }

  const distText = document.getElementById('hero-distribution-text');
  if (distText) {
    distText.textContent = `${verifiedCount} Verified · ${partialCount} Partial · ${missingCount} No Resume Evidence`;
  }

  const formulaSummary = document.getElementById('score-formula-summary');
  if (formulaSummary) {
    formulaSummary.textContent = `(${verifiedCount} × 1.0 + ${partialCount} × 0.5) ÷ ${totalRequired} = ${calculatedScore}%`;
  }

  // 2. HERO RIGHT SIDE: Compact Benchmark Coverage Summary
  const pillVer = document.getElementById('cov-pill-ver'); if (pillVer) pillVer.textContent = `✓ ${verifiedCount} Verified`;
  const pillPar = document.getElementById('cov-pill-par'); if (pillPar) pillPar.textContent = `⚠ ${partialCount} Partial`;
  const pillMis = document.getElementById('cov-pill-mis'); if (pillMis) pillMis.textContent = `✕ ${missingCount} No Evidence`;

  // Render ALL 10 Clickable Benchmark Chips in Coverage Section
  renderBenchmarkCoverageChips();

  // 3. INTERACTIVE SKILL EVIDENCE MAP (3-Level Transparent Flow)
  renderSkillEvidenceMap(targetRole);

  // 4. PRIORITY IMPROVEMENTS (2x2 Equal Card Grid)
  renderPriorityImprovements();

  // 5. SUPPORTING SKILLS SECTION (6 EQUAL CARDS + DYNAMIC SUMMARY)
  renderSupportingSkillsSection(targetRole);
}

/**
 * 2b. INTERACTIVE SKILL EVIDENCE MAP
 * Renders the primary visualization:
 * - 2 Clear Evidence Paths (JavaScript & HTML/CSS)
 * - Compact Missing Skills Grid (8 requirements with no resume evidence)
 * - Dynamic interactive filters (All, Verified, Partial, No Evidence)
 */
function renderSkillEvidenceMap(targetRole = 'Frontend Developer') {
  const container = document.getElementById('evidence-map-rows');
  if (!container) return;

  const evidencedSkills = SKILL_EVIDENCE_MAP_DATA.filter(item => item.simpleStatus !== 'MISSING');
  const missingSkills = SKILL_EVIDENCE_MAP_DATA.filter(item => item.simpleStatus === 'MISSING');

  let showEvidenced = true;
  let showMissing = true;

  if (evidenceMapFilter === 'VERIFIED') {
    showMissing = false;
  } else if (evidenceMapFilter === 'PARTIAL') {
    showMissing = false;
  } else if (evidenceMapFilter === 'MISSING') {
    showEvidenced = false;
  }

  // Filter paths by search and status
  let filteredEvidenced = evidencedSkills.filter(item => {
    if (evidenceMapFilter === 'VERIFIED' && item.simpleStatus !== 'VERIFIED') return false;
    if (evidenceMapFilter === 'PARTIAL' && item.simpleStatus !== 'PARTIAL') return false;
    if (evidenceMapSearch) {
      const q = evidenceMapSearch.toLowerCase();
      return item.skillName.toLowerCase().includes(q) ||
             item.resumeSource.toLowerCase().includes(q) ||
             item.resumeDetail.toLowerCase().includes(q);
    }
    return true;
  });

  let filteredMissing = missingSkills.filter(item => {
    if (evidenceMapSearch) {
      const q = evidenceMapSearch.toLowerCase();
      return item.skillName.toLowerCase().includes(q);
    }
    return true;
  });

  if ((!showEvidenced || filteredEvidenced.length === 0) && (!showMissing || filteredMissing.length === 0)) {
    container.innerHTML = `
      <div style="padding: 2rem 1rem; text-align: center; color: #64748b; font-size: 0.85rem;">
        <p>No benchmark skills matched your search query "<strong>${escapeHtml(evidenceMapSearch)}</strong>".</p>
        <button class="btn-row-modal-trigger" style="margin-top: 0.5rem;" onclick="setEvidenceMapFilter('all'); document.getElementById('map-search-input').value=''; handleMapSearch('');">
          Reset Filter & Search
        </button>
      </div>
    `;
    return;
  }

  let html = '';

  // 1. RENDER EVIDENCED PATHS
  if (showEvidenced && filteredEvidenced.length > 0) {
    html += `
      <div class="evidence-paths-wrapper">
        <div class="evidence-map-col-headers">
          <div class="map-col-head">
            <span class="col-step-num">1</span>
            <span class="col-step-label">Resume Evidence</span>
          </div>
          <div class="map-col-arrow">↓</div>
          <div class="map-col-head">
            <span class="col-step-num">2</span>
            <span class="col-step-label">Detected Skill</span>
          </div>
          <div class="map-col-arrow">↓</div>
          <div class="map-col-head">
            <span class="col-step-num">3</span>
            <span class="col-step-label">Benchmark Requirement</span>
          </div>
        </div>

        <div class="evidence-paths-list">
          ${filteredEvidenced.map(item => {
            const isVerified = item.simpleStatus === 'VERIFIED';
            return `
              <div class="evidence-flow-card ${isVerified ? 'flow-verified' : 'flow-partial'}" 
                   onclick="openSkillDetailModal('${escapeJs(item.skillName)}')"
                   title="${escapeHtml(item.tooltip)}"
                   role="button"
                   tabindex="0"
                   onkeydown="if(event.key==='Enter'||event.key===' '){openSkillDetailModal('${escapeJs(item.skillName)}');}">
                
                <!-- NODE 1: RESUME EVIDENCE -->
                <div class="flow-node flow-node-evidence">
                  <span class="node-badge-label">RESUME EVIDENCE</span>
                  <strong class="node-main-title">${escapeHtml(item.resumeSource)}</strong>
                  <span class="node-sub-detail">${escapeHtml(item.resumeDetail)}</span>
                </div>

                <div class="flow-connector-arrow">→</div>

                <!-- NODE 2: DETECTED SKILL -->
                <div class="flow-node flow-node-skill">
                  <span class="node-badge-label">DETECTED SKILL</span>
                  <strong class="node-main-title">${escapeHtml(item.skillName)}</strong>
                  <span class="node-status-pill ${item.detectedBadgeClass}">${escapeHtml(item.detectedBadge)}</span>
                </div>

                <div class="flow-connector-arrow">→</div>

                <!-- NODE 3: BENCHMARK REQUIREMENT -->
                <div class="flow-node flow-node-benchmark">
                  <span class="node-badge-label">BENCHMARK REQUIREMENT</span>
                  <strong class="node-main-title">${escapeHtml(targetRole)}</strong>
                  <span class="node-bench-sub">${escapeHtml(item.skillName)} Requirement</span>
                  <span class="node-action-prompt">View Analysis →</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 2. RENDER COMPACT MISSING SKILLS BLOCK
  if (showMissing && filteredMissing.length > 0) {
    html += `
      <div class="missing-evidence-compact-block">
        <div class="missing-block-header">
          <span class="missing-block-title">${filteredMissing.length} requirements have no resume evidence</span>
          <span class="missing-block-hint">Click any skill to view why it's a gap and how to bridge it</span>
        </div>
        <div class="missing-chips-compact-grid">
          ${filteredMissing.map(item => `
            <button class="missing-skill-chip-btn" onclick="openSkillDetailModal('${escapeJs(item.skillName)}')" title="${escapeHtml(item.tooltip)}">
              <span class="chip-dot">✕</span>
              <span class="chip-name">${escapeHtml(item.skillName)}</span>
              <span class="chip-hover-arrow">→</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

function setEvidenceMapFilter(filter) {
  evidenceMapFilter = filter;
  const filterBtns = document.querySelectorAll('#map-filter-pills .map-filter-btn');
  filterBtns.forEach(btn => {
    btn.classList.toggle('is-active', btn.getAttribute('data-filter') === filter);
  });
  renderSkillEvidenceMap(globalAnalysisData?.targetRole || 'Frontend Developer');
}

function handleMapSearch(query) {
  evidenceMapSearch = (query || '').trim().toLowerCase();
  renderSkillEvidenceMap(globalAnalysisData?.targetRole || 'Frontend Developer');
}

function handleEvidenceMapRowClick(skillName, event) {
  // If clicked directly on the "View Details" button, open modal
  if (event && event.target && event.target.closest('.btn-row-modal-trigger')) {
    openSkillDetailModal(skillName);
    return;
  }
  
  // Highlight complete path
  if (highlightedMapSkill && highlightedMapSkill.toLowerCase() === skillName.toLowerCase()) {
    highlightedMapSkill = null;
  } else {
    highlightedMapSkill = skillName;
  }
  renderSkillEvidenceMap(globalAnalysisData?.targetRole || 'Frontend Developer');
}

/**
 * 4. SUPPORTING SKILLS SECTION RENDERING
 * Dynamically computes distribution metrics and renders 6 equal-sized cards
 */
function renderSupportingSkillsSection(targetRole = 'Frontend Developer') {
  const roleNameEl = document.getElementById('supp-role-name');
  if (roleNameEl) roleNameEl.textContent = targetRole;

  // Dynamic distribution calculations
  const totalCount = SUPPORTING_SKILLS_DATA.length;
  const practicalCount = SUPPORTING_SKILLS_DATA.filter(s => s.evidenceType === 'Practical Evidence').length;
  const learningCount = SUPPORTING_SKILLS_DATA.filter(s => s.evidenceType === 'Learning Evidence').length;
  const mentionedCount = SUPPORTING_SKILLS_DATA.filter(s => s.evidenceType === 'Mentioned').length;

  const totalCountBadge = document.getElementById('supp-total-count-badge');
  if (totalCountBadge) totalCountBadge.textContent = `${totalCount} Skills Detected`;

  const pillPrac = document.getElementById('supp-pill-prac');
  if (pillPrac) pillPrac.textContent = `✓ ${practicalCount} Practical Evidence`;

  const pillLearn = document.getElementById('supp-pill-learn');
  if (pillLearn) pillLearn.textContent = `◐ ${learningCount} Learning Evidence`;

  const pillMent = document.getElementById('supp-pill-ment');
  if (pillMent) pillMent.textContent = `• ${mentionedCount} Mentioned`;

  const container = document.getElementById('supporting-cards-grid');
  if (!container) return;

  container.innerHTML = SUPPORTING_SKILLS_DATA.map(skill => {
    return `
      <div class="supporting-card-compact">
        <div class="supp-card-header">
          <h3 class="supp-card-title">${escapeHtml(skill.skillName)}</h3>
          <span class="supp-card-tag ${skill.tagClass}">${escapeHtml(skill.categoryTag)}</span>
        </div>

        <div class="supp-card-body">
          <div class="supp-ev-badge-row">
            <span class="supp-ev-badge ${skill.evidenceClass}">${escapeHtml(skill.evidenceLevel)}</span>
          </div>
          
          <div class="supp-used-in-line">
            <span>Used in:</span> <strong>${escapeHtml(skill.usedIn)}</strong>
          </div>

          <div class="supp-why-matters-box">
            ${escapeHtml(skill.whyItMatters)}
          </div>
        </div>

        <div class="supp-card-footer">
          <button class="btn-view-supp-details" onclick="openSupportingSkillDetailModal('${escapeJs(skill.skillName)}')" title="View detailed analysis for ${escapeHtml(skill.skillName)}">
            <span>View Details</span> <span>→</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 2. BENCHMARK COVERAGE CHIPS (ALL 10 INTERACTIVE CHIPS)
 * Render all 10 canonical benchmark competencies as compact, clickable status chips
 */
function renderBenchmarkCoverageChips() {
  const container = document.getElementById('coverage-all-chips-grid');
  if (!container) return;

  container.innerHTML = BENCHMARK_SKILLS.map(skill => {
    let statusClass = 'chip-status-missing';
    let icon = '✕';
    if (skill.simpleStatus === 'VERIFIED') {
      statusClass = 'chip-status-verified';
      icon = '✓';
    } else if (skill.simpleStatus === 'PARTIAL') {
      statusClass = 'chip-status-partial';
      icon = '⚠';
    }

    return `
      <button class="benchmark-coverage-chip ${statusClass}" onclick="openSkillDetailModal('${escapeJs(skill.skillName)}')" title="Click to view detailed analysis for ${escapeHtml(skill.skillName)}">
        <span class="chip-status-symbol">${icon}</span>
        <span class="chip-skill-title">${escapeHtml(skill.skillName)}</span>
      </button>
    `;
  }).join('');
}

/**
 * 3. PRIORITY IMPROVEMENTS (EQUAL-SIZED CARDS)
 * Render exactly 4 cards with identical dimensions and bottom-aligned action triggers.
 */
function renderPriorityImprovements() {
  const container = document.getElementById('priority-cards-grid');
  if (!container) return;

  const topFourGaps = [
    {
      skillName: 'TypeScript',
      status: 'MISSING',
      priorityGroup: 'HIGH PRIORITY',
      relatedEvidence: ['JavaScript ✓'],
      gap: 'Static typing and TypeScript implementation are not currently evidenced.'
    },
    {
      skillName: 'React.js',
      status: 'MISSING',
      priorityGroup: 'HIGH PRIORITY',
      relatedEvidence: ['JavaScript ✓', 'Node.js ✓'],
      gap: 'Frontend framework architecture and component state management are not currently evidenced.'
    },
    {
      skillName: 'REST APIs',
      status: 'MISSING',
      priorityGroup: 'HIGH PRIORITY',
      relatedEvidence: ['JavaScript ✓', 'Node.js ✓'],
      gap: 'Client-side asynchronous data fetching and API error handling are not currently evidenced.'
    },
    {
      skillName: 'Responsive Design',
      status: 'MISSING',
      priorityGroup: 'MEDIUM PRIORITY',
      relatedEvidence: ['HTML & CSS ⚠'],
      gap: 'Mobile-first layout and responsive breakpoint implementation are not currently evidenced.'
    }
  ];

  container.innerHTML = topFourGaps.map(item => {
    const isMissing = item.status === 'MISSING';
    const isHigh = item.priorityGroup.includes('HIGH');

    return `
      <div class="priority-card-compact ${isMissing ? 'card-type-missing' : 'card-type-partial'}">
        <div class="priority-card-header">
          <h3 class="p-skill-title">${escapeHtml(item.skillName)}</h3>
          <div class="p-badges-wrap">
            <span class="badge-status-chip ${isMissing ? 'badge-status-missing' : 'badge-status-partial'}">
              ${isMissing ? '✕ No Resume Evidence' : '⚠ Partial'}
            </span>
            <span class="badge-p-tier ${isHigh ? 'p-tier-high' : 'p-tier-medium'}">
              ${escapeHtml(item.priorityGroup)}
            </span>
          </div>
        </div>

        <div class="priority-card-body">
          <div class="p-field-row">
            <span class="p-field-label">Related Evidence</span>
            <div class="p-related-chips">
              ${item.relatedEvidence && item.relatedEvidence.length > 0 
                ? item.relatedEvidence.map(r => `<span class="related-evidence-pill">${escapeHtml(r)}</span>`).join('') 
                : '<span class="related-none-pill">None detected</span>'}
            </div>
          </div>

          <div class="p-field-row">
            <span class="p-field-label">Short Gap Summary</span>
            <div class="p-gap-box">${escapeHtml(item.gap)}</div>
          </div>
        </div>

        <div class="priority-card-footer">
          <button class="btn-view-analysis" onclick="openSkillDetailModal('${escapeJs(item.skillName)}')">
            <span>View Analysis</span> <span>→</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 6. FOCUSED DETAIL MODAL WITH BACKGROUND BLUR
 */
function openSkillDetailModal(skillName) {
  const skill = BENCHMARK_SKILLS.find(s => s.skillName.toLowerCase() === skillName.toLowerCase()) || {
    skillName: skillName,
    priority: 'High',
    priorityGroup: 'HIGH PRIORITY',
    simpleStatus: 'MISSING',
    statusText: 'No Resume Evidence',
    evidenceType: 'No Resume Evidence',
    related: [],
    shortGap: `${skillName} implementation is not currently evidenced.`,
    whatWeFound: `No relevant resume evidence detected for ${skillName} in the submitted resume.`,
    whyThisIsAGap: `Demonstrating practical proficiency in ${skillName} is a core requirement for target role alignment.`,
    recommendedAction: `Implement practical project evidence for ${skillName} and document it clearly on your resume.`,
    resumeImprovement: `Add a dedicated technical accomplishment highlighting ${skillName} with measurable results.`
  };

  const targetRole = globalAnalysisData?.targetRole || 'Frontend Developer';
  const overlay = document.getElementById('skill-detail-modal-overlay');
  const dialog = document.getElementById('skill-detail-modal-dialog');
  if (!overlay || !dialog) return;

  const isMissing = skill.simpleStatus === 'MISSING';
  const isVerified = skill.simpleStatus === 'VERIFIED';
  const isHigh = skill.priority === 'High';

  dialog.innerHTML = `
    <div class="modal-header-section">
      <div class="modal-title-group">
        <h2 class="modal-skill-name" id="modal-skill-title">${escapeHtml(skill.skillName.toUpperCase())}</h2>
        <div class="modal-badges-row">
          <span class="badge-status-chip ${isVerified ? 'badge-ver' : (isMissing ? 'badge-status-missing' : 'badge-status-partial')}">
            ${isVerified ? '✓ Verified' : (isMissing ? '✕ No Resume Evidence' : '⚠ Partial')}
          </span>
          <span class="badge-p-tier ${isHigh ? 'p-tier-high' : (skill.priority === 'Medium' ? 'p-tier-medium' : 'p-tier-supporting')}">
            ${escapeHtml(skill.priorityGroup)}
          </span>
        </div>
      </div>
      <button class="btn-modal-close" onclick="closeSkillDetailModal()" title="Close (ESC)">✕</button>
    </div>

    <div class="modal-body-section">
      <div class="modal-field-block">
        <span class="modal-field-label">Related Resume Evidence</span>
        <div class="modal-evidence-pills-row">
          ${skill.related && skill.related.length > 0 
            ? skill.related.map(r => `<span class="related-evidence-pill">${escapeHtml(r)}</span>`).join('') 
            : '<span class="related-none-pill" style="font-size:0.8rem; color:var(--text-muted-custom);">No direct related evidence detected</span>'}
        </div>
      </div>

      <div class="modal-field-block">
        <span class="modal-field-label">Evidence Type</span>
        <div class="modal-evidence-type-row">
          <span class="badge-status-chip ${isVerified ? 'badge-ver' : (isMissing ? 'badge-status-missing' : 'badge-status-partial')}">
            ${escapeHtml(skill.evidenceType)}
          </span>
        </div>
      </div>

      <div class="modal-field-block">
        <span class="modal-field-label">What We Found</span>
        <div class="modal-desc-box">${escapeHtml(skill.whatWeFound)}</div>
      </div>

      <div class="modal-field-block">
        <span class="modal-field-label">Why This Is A Gap</span>
        <div class="modal-desc-box modal-gap-box">${escapeHtml(skill.whyThisIsAGap)}</div>
      </div>

      <div class="modal-field-block">
        <span class="modal-field-label">Recommended Next Action</span>
        <div class="modal-desc-box highlight-action">${escapeHtml(skill.recommendedAction)}</div>
      </div>

      <div class="modal-field-block">
        <span class="modal-field-label">Resume Improvement</span>
        <div class="modal-desc-box modal-resume-box">${escapeHtml(skill.resumeImprovement)}</div>
      </div>
    </div>

    <div class="modal-footer-section">
      <button class="btn-modal-nova" onclick="explainSkillWithNova('${escapeJs(skill.skillName)}', '${skill.simpleStatus}', '${escapeJs(targetRole)}')">
        <span>✦</span> Explain with Nova
      </button>
      <button class="btn-modal-dismiss" onclick="closeSkillDetailModal()">
        Close
      </button>
    </div>
  `;

  overlay.classList.add('is-active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeSkillDetailModal() {
  const overlay = document.getElementById('skill-detail-modal-overlay');
  if (overlay) {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
  }
  // If matrix modal or supporting modal is not open, restore scroll
  const matrixOverlay = document.getElementById('all-req-modal-overlay');
  const suppOverlay = document.getElementById('supporting-modal-overlay');
  if ((!matrixOverlay || !matrixOverlay.classList.contains('is-active')) &&
      (!suppOverlay || !suppOverlay.classList.contains('is-active'))) {
    document.body.style.overflow = '';
  }
}

function handleModalOverlayClick(event) {
  if (event.target === document.getElementById('skill-detail-modal-overlay')) {
    closeSkillDetailModal();
  }
}

/**
 * 7. ALL REQUIREMENTS FULL MATRIX MODAL
 */
function openAllRequirementsModal() {
  const overlay = document.getElementById('all-req-modal-overlay');
  const dialog = document.getElementById('all-req-modal-dialog');
  if (!overlay || !dialog) return;

  matrixSkillFilter = 'all';
  matrixSearchQuery = '';

  renderMatrixModalContent();

  overlay.classList.add('is-active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function renderMatrixModalContent() {
  const dialog = document.getElementById('all-req-modal-dialog');
  if (!dialog) return;

  const verifiedCount = BENCHMARK_SKILLS.filter(s => s.simpleStatus === 'VERIFIED').length;
  const partialCount = BENCHMARK_SKILLS.filter(s => s.simpleStatus === 'PARTIAL').length;
  const missingCount = BENCHMARK_SKILLS.filter(s => s.simpleStatus === 'MISSING').length;

  let filtered = BENCHMARK_SKILLS;
  if (matrixSkillFilter === 'verified') filtered = filtered.filter(s => s.simpleStatus === 'VERIFIED');
  else if (matrixSkillFilter === 'partial') filtered = filtered.filter(s => s.simpleStatus === 'PARTIAL');
  else if (matrixSkillFilter === 'missing') filtered = filtered.filter(s => s.simpleStatus === 'MISSING');

  if (matrixSearchQuery) {
    filtered = filtered.filter(s =>
      s.skillName.toLowerCase().includes(matrixSearchQuery) ||
      s.whatWeFound.toLowerCase().includes(matrixSearchQuery) ||
      s.shortGap.toLowerCase().includes(matrixSearchQuery) ||
      s.whyThisIsAGap.toLowerCase().includes(matrixSearchQuery)
    );
  }

  dialog.innerHTML = `
    <div class="modal-header-section">
      <div class="modal-title-group">
        <h2 class="modal-skill-name" id="all-req-modal-title">All 10 Benchmark Requirements</h2>
        <div class="modal-badges-row">
          <span class="cov-stat stat-ver">✓ ${verifiedCount} Verified</span>
          <span class="cov-stat stat-par" id="matrix-stat-par">⚠ ${partialCount} Partial</span>
          <span class="cov-stat stat-mis">✕ ${missingCount} No Resume Evidence</span>
        </div>
      </div>
      <button class="btn-modal-close" onclick="closeAllReqModal()" title="Close (ESC)">✕</button>
    </div>

    <div class="matrix-toolbar">
      <div class="matrix-filters-row">
        <button class="matrix-filter-btn ${matrixSkillFilter === 'all' ? 'active' : ''}" onclick="setMatrixSkillFilter('all')">
          All (10)
        </button>
        <button class="matrix-filter-btn ${matrixSkillFilter === 'verified' ? 'active' : ''}" onclick="setMatrixSkillFilter('verified')">
          ✓ Verified (${verifiedCount})
        </button>
        <button class="matrix-filter-btn ${matrixSkillFilter === 'partial' ? 'active' : ''}" onclick="setMatrixSkillFilter('partial')">
          ⚠ Partial (${partialCount})
        </button>
        <button class="matrix-filter-btn ${matrixSkillFilter === 'missing' ? 'active' : ''}" onclick="setMatrixSkillFilter('missing')">
          ✕ No Evidence (${missingCount})
        </button>
        ${matrixSkillFilter !== 'all' ? `
          <button class="matrix-filter-clear-btn" onclick="setMatrixSkillFilter('all')">Clear Filter</button>
        ` : ''}
      </div>

      <input type="text" class="matrix-search-input" placeholder="Search required skills..." value="${escapeHtml(matrixSearchQuery)}" oninput="handleMatrixSkillSearch(this.value)">
    </div>

    <div class="req-table-header">
      <div class="th-skill">Skill</div>
      <div class="th-priority">Priority</div>
      <div class="th-status">Status</div>
      <div class="th-evidence">Evidence</div>
      <div class="th-action">Action</div>
    </div>

    <div class="modal-body-section" style="padding: 0; max-height: 52vh; overflow-y: auto;">
      ${filtered.length === 0 ? `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-muted-custom); font-size: 0.875rem;">
          No benchmark competencies match your active filter or search query.
        </div>
      ` : filtered.map(item => `
        <div class="req-row-item" onclick="openSkillDetailModal('${escapeJs(item.skillName)}')">
          <div class="td-skill"><span class="cell-skill-title">${escapeHtml(item.skillName)}</span></div>
          <div class="td-priority"><span class="cell-priority-pill ${item.priority === 'High' ? 'pill-p-high' : (item.priority === 'Medium' ? 'pill-p-medium' : 'pill-p-supporting')}">${escapeHtml(item.priority)}</span></div>
          <div class="td-status"><span class="cell-status-badge ${item.simpleStatus === 'VERIFIED' ? 'badge-ver' : (item.simpleStatus === 'PARTIAL' ? 'badge-par' : 'badge-mis')}">${item.simpleStatus === 'VERIFIED' ? '✓ Verified' : (item.simpleStatus === 'PARTIAL' ? '⚠ Partial' : '✕ No Evidence')}</span></div>
          <div class="td-evidence"><span class="cell-ev-summary">${escapeHtml(item.evidenceType)}</span></div>
          <div class="td-action">
            <button class="btn-open-skill-modal" onclick="event.stopPropagation(); openSkillDetailModal('${escapeJs(item.skillName)}')">
              <span>Inspect</span> <span>→</span>
            </button>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="modal-footer-section">
      <span style="font-size:0.8rem; color:var(--text-muted-custom);">Click any benchmark skill to open its focused gap intelligence modal</span>
      <button class="btn-modal-dismiss" onclick="closeAllReqModal()">
        Done
      </button>
    </div>
  `;
}

function setMatrixSkillFilter(filter) {
  matrixSkillFilter = filter;
  renderMatrixModalContent();
}

function handleMatrixSkillSearch(query) {
  matrixSearchQuery = (query || '').trim().toLowerCase();
  renderMatrixModalContent();
}

function closeAllReqModal() {
  const overlay = document.getElementById('all-req-modal-overlay');
  if (overlay) {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
  }
  const detailOverlay = document.getElementById('skill-detail-modal-overlay');
  if (!detailOverlay || !detailOverlay.classList.contains('is-active')) {
    document.body.style.overflow = '';
  }
}

function handleAllReqOverlayClick(event) {
  if (event.target === document.getElementById('all-req-modal-overlay')) {
    closeAllReqModal();
  }
}

/**
 * 8. SUPPORTING SKILL FOCUSED DETAIL MODAL
 * Opens a focused deep-dive modal for an individual supporting skill
 */
function openSupportingSkillDetailModal(skillName) {
  const targetRole = globalAnalysisData?.targetRole || 'Frontend Developer';
  const overlay = document.getElementById('supporting-modal-overlay');
  const dialog = document.getElementById('supporting-modal-dialog');
  if (!overlay || !dialog) return;

  const skill = SUPPORTING_SKILLS_DATA.find(s => s.skillName.toLowerCase() === (skillName || '').toLowerCase());
  if (!skill) return;

  dialog.innerHTML = `
    <div class="modal-header-section">
      <div class="modal-title-group">
        <h2 class="modal-skill-name" id="supp-modal-title">${escapeHtml(skill.skillName.toUpperCase())}</h2>
        <div class="modal-badges-row">
          <span class="supp-card-tag ${skill.tagClass}">${escapeHtml(skill.categoryTag)}</span>
          <span class="supp-ev-badge ${skill.evidenceClass}">${escapeHtml(skill.evidenceLevel)}</span>
        </div>
      </div>
      <button class="btn-modal-close" onclick="closeSupportingModal()" title="Close (ESC)">✕</button>
    </div>

    <div class="modal-body-section" style="max-height: 65vh; overflow-y: auto; padding: 1.25rem 1.5rem;">
      <div class="modal-field-block">
        <span class="modal-field-label">Why It Was Detected</span>
        <div class="modal-desc-box">${escapeHtml(skill.whyDetected)}</div>
      </div>

      <div class="modal-field-block">
        <span class="modal-field-label">Resume Evidence</span>
        <div class="modal-desc-box">${escapeHtml(skill.evidenceFull)}</div>
      </div>

      <div class="modal-field-block">
        <span class="modal-field-label">Why It Matters for ${escapeHtml(targetRole)}</span>
        <div class="modal-desc-box modal-gap-box">${escapeHtml(skill.relevanceDetail)}</div>
      </div>

      <div class="modal-field-block">
        <span class="modal-field-label">How to Strengthen It</span>
        <div class="modal-desc-box highlight-action">${escapeHtml(skill.howToStrengthen)}</div>
      </div>
    </div>

    <div class="modal-footer-section">
      <button class="btn-modal-nova" onclick="askNovaAboutSupportingSkill('${escapeJs(skill.skillName)}', '${escapeJs(targetRole)}')">
        <span>✦</span> Ask Nova
      </button>
      <button class="btn-modal-dismiss" onclick="closeSupportingModal()">
        Close
      </button>
    </div>
  `;

  overlay.classList.add('is-active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openSupportingSkillsModal() {
  if (SUPPORTING_SKILLS_DATA.length > 0) {
    openSupportingSkillDetailModal(SUPPORTING_SKILLS_DATA[0].skillName);
  }
}

function closeSupportingModal() {
  const overlay = document.getElementById('supporting-modal-overlay');
  if (overlay) {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
  }
  const detailOverlay = document.getElementById('skill-detail-modal-overlay');
  const matrixOverlay = document.getElementById('all-req-modal-overlay');
  if ((!detailOverlay || !detailOverlay.classList.contains('is-active')) &&
      (!matrixOverlay || !matrixOverlay.classList.contains('is-active'))) {
    document.body.style.overflow = '';
  }
}

function handleSupportingOverlayClick(event) {
  if (event.target === document.getElementById('supporting-modal-overlay')) {
    closeSupportingModal();
  }
}

/**
 * 10. ASK NOVA ABOUT SUPPORTING SKILL
 */
function askNovaAboutSupportingSkill(skillName, targetRole) {
  const skill = SUPPORTING_SKILLS_DATA.find(s => s.skillName.toLowerCase() === (skillName || '').toLowerCase());
  const category = skill?.categoryTag || 'Supporting Skill';
  const prompt = `How can my ${skillName} experience (${category}) help me become a stronger ${targetRole}? Explain how to position my evidence effectively on my resume and in technical interviews.`;
  
  if (window.Nova && typeof window.Nova.ask === 'function') {
    window.Nova.ask(prompt);
  } else if (window.Astra && typeof window.Astra.ask === 'function') {
    window.Astra.ask(prompt);
  } else {
    API.showToast(`Nova prompt: ${prompt}`, 'info');
  }
}

/**
 * 11. EXPLAIN SKILL WITH NOVA
 */
function explainSkillWithNova(skillName, status, targetRole) {
  const skill = BENCHMARK_SKILLS.find(s => s.skillName.toLowerCase() === skillName.toLowerCase());
  const evidence = skill?.whatWeFound || 'No resume evidence detected';
  const gap = skill?.whyThisIsAGap || 'Benchmark gap detected';
  const action = skill?.recommendedAction || 'Build practical project evidence';

  let prompt = '';
  if (status === 'MISSING') {
    prompt = `As an expert technical career advisor, explain the '${skillName}' skill gap for a candidate targeting '${targetRole}'.

Candidate Context:
- Target Role: ${targetRole}
- Detected Evidence: ${evidence}
- Gap Reason: ${gap}
- Recommended Project Step: ${action}

Provide actionable, practical advice on:
1. Why hiring managers specifically look for '${skillName}' in ${targetRole} candidates.
2. Step-by-step guidance to implement practical project evidence connecting with their existing JavaScript background.
3. 2 high-impact resume bullet points demonstrating '${skillName}' with quantifiable outcomes.`;
  } else if (status === 'PARTIAL') {
    prompt = `As an expert technical career advisor, explain how to upgrade the candidate's partial evidence in '${skillName}' into verified practical evidence for '${targetRole}'.

Candidate Context:
- Target Role: ${targetRole}
- Detected Evidence: ${evidence}
- Gap Reason: ${gap}

Provide actionable advice on:
1. Transitioning coursework knowledge of '${skillName}' into production-grade project evidence.
2. Best practices for modern CSS layouts (Flexbox, Grid) and responsive styling.
3. 2 strong resume bullet points highlighting practical ${skillName} implementation.`;
  } else {
    prompt = `As an expert technical career advisor, explain how to best showcase the candidate's verified practical experience in '${skillName}' for '${targetRole}' roles to maximize recruiter impact with metrics and architectural depth.`;
  }

  if (window.Nova && typeof window.Nova.ask === 'function') {
    window.Nova.ask(prompt);
  } else if (window.Astra && typeof window.Astra.ask === 'function') {
    window.Astra.ask(prompt);
  } else {
    API.showToast(`Nova prompt: ${prompt}`, 'info');
  }
}

/**
 * 12. GENERATE PROJECT BLUEPRINT WITH NOVA
 */
function generateProjectBlueprintWithNova() {
  const targetRole = globalAnalysisData?.targetRole || 'Frontend Developer';
  const prompt = `Design an end-to-end practical project blueprint for a ${targetRole} candidate that bridges their top benchmark skill gaps: React.js, TypeScript, REST APIs, Mobile-first Responsive Design, Git version control, and CI/CD, building upon their existing verified JavaScript and Node.js foundation.

Please provide:
1. **Project Concept & Architecture**: A realistic, modern frontend application idea that naturally requires all 6 target competencies.
2. **Component & State Hierarchy**: Recommended React architecture, custom hooks, and state management strategy.
3. **TypeScript Data Models**: Key interfaces for REST API payloads, component props, and async states.
4. **Step-by-Step Implementation Roadmap**: 5 sequential development milestones from initial Git repository setup to automated CI/CD deployment.
5. **3 High-Impact Resume Bullet Points**: Ready-to-use resume bullet points with quantifiable engineering metrics.`;

  if (window.Nova && typeof window.Nova.ask === 'function') {
    window.Nova.ask(prompt);
  } else if (window.Astra && typeof window.Astra.ask === 'function') {
    window.Astra.ask(prompt);
  } else {
    API.showToast(`Nova prompt: ${prompt}`, 'info');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJs(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"');
}
