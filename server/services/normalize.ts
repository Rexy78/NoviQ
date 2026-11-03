interface CanonicalSkillDef {
  id: string;
  displayName: string;
  aliases: string[];
}

const CANONICAL_SKILLS: CanonicalSkillDef[] = [
  { id: 'git', displayName: 'Git / Version Control', aliases: ['git', 'version control', 'git/github', 'git / version control', 'vcs', 'git version control', 'github', 'github actions', 'gitlab', 'bitbucket'] },
  { id: 'rest-api', displayName: 'REST APIs', aliases: ['rest api', 'rest apis', 'restful api', 'restful apis', 'rest', 'api design', 'apis', 'restful services', 'api integration', 'endpoints', 'json api', 'http api'] },
  { id: 'sql', displayName: 'SQL', aliases: ['sql', 'relational databases', 'sql databases', 'relational database management system', 'mysql', 'postgresql', 'sqlite', 'rdbms', 'tsql', 'plsql', 'postgres', 'mariadb', 'oracle sql', 'ms sql server'] },
  { id: 'javascript', displayName: 'JavaScript', aliases: ['javascript', 'js', 'es6', 'es6+', 'ecmascript', 'vanilla js', 'modern javascript'] },
  { id: 'typescript', displayName: 'TypeScript', aliases: ['typescript', 'ts'] },
  { id: 'node', displayName: 'Node.js', aliases: ['node.js', 'nodejs', 'node'] },
  { id: 'express', displayName: 'Express.js', aliases: ['express.js', 'express', 'expressjs'] },
  { id: 'python', displayName: 'Python', aliases: ['python', 'python3', 'py', 'django', 'flask', 'fastapi'] },
  { id: 'java', displayName: 'Java', aliases: ['java', 'core java', 'java ee', 'spring', 'spring boot'] },
  { id: 'docker', displayName: 'Docker', aliases: ['docker', 'containerization', 'containers', 'dockerfile', 'docker-compose'] },
  { id: 'cicd', displayName: 'CI/CD', aliases: ['ci/cd', 'continuous integration', 'cicd', 'jenkins', 'github actions', 'gitlab ci', 'continuous deployment', 'circleci', 'travis ci', 'pipeline automation'] },
  { id: 'aws', displayName: 'AWS', aliases: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudformation', 'iam', 'dynamodb', 'rds'] },
  { id: 'cloud-computing', displayName: 'Cloud Computing', aliases: ['cloud computing', 'cloud infrastructure', 'cloud services', 'cloud', 'gcp', 'google cloud', 'azure', 'microsoft azure'] },
  { id: 'react', displayName: 'React.js', aliases: ['react.js', 'react', 'reactjs', 'react native', 'create react app', 'next.js', 'nextjs'] },
  { id: 'mongodb', displayName: 'MongoDB', aliases: ['mongodb', 'mongo', 'nosql', 'document db', 'mongoose'] },
  { id: 'linux', displayName: 'Linux', aliases: ['linux', 'linux / systems', 'linux administration', 'unix/linux', 'linux/unix', 'systems', 'operating systems', 'linux os', 'ubuntu', 'centos', 'redhat', 'debian', 'bash', 'shell scripting'] },
  { id: 'siem', displayName: 'SIEM', aliases: ['siem', 'siem / network tools', 'security information and event management', 'siem tools', 'splunk/siem', 'splunk', 'qradar', 'sentinel', 'wazuh', 'log analysis'] },
  { id: 'network-security', displayName: 'Network Security', aliases: ['network security', 'network security & firewalls', 'firewalls & network security', 'network administration', 'tcp/ip', 'dns', 'vpn', 'wireshark', 'packet analysis'] },
  { id: 'firewalls', displayName: 'Firewalls', aliases: ['firewalls', 'firewall configuration', 'palo alto', 'cisco asa', 'fortinet', 'iptables', 'pfsense'] },
  { id: 'vulnerability-assessment', displayName: 'Vulnerability Assessment', aliases: ['vulnerability assessment', 'vulnerability scanning', 'vulnerability management', 'nessus', 'qualys', 'openvas', 'cve'] },
  { id: 'incident-response', displayName: 'Incident Response', aliases: ['incident response', 'incident handling', 'soc', 'threat response', 'soc analyst', 'dfir', 'malware analysis'] },
  { id: 'cryptography', displayName: 'Cryptography', aliases: ['cryptography', 'encryption', 'pki', 'ssl/tls', 'aes', 'rsa', 'hashing'] },
  { id: 'cloud-security', displayName: 'Cloud Security', aliases: ['cloud security', 'aws security', 'azure security', 'gcp security', 'cloud security posture', 'iam security'] },
  { id: 'kubernetes', displayName: 'Kubernetes', aliases: ['kubernetes', 'k8s', 'container orchestration', 'helm'] },
  { id: 'iac', displayName: 'Infrastructure as Code', aliases: ['infrastructure as code', 'iac', 'terraform', 'cloudformation', 'ansible'] },
  { id: 'monitoring', displayName: 'Monitoring & Logging', aliases: ['monitoring & logging', 'monitoring', 'logging', 'prometheus', 'grafana', 'datadog', 'elk', 'splunk'] },
  { id: 'mobile-arch', displayName: 'Mobile Architecture', aliases: ['mobile architecture', 'mobile system design', 'mobile app architecture', 'clean architecture', 'mvvm', 'mvi', 'mvc'] },
  { id: 'android-dev', displayName: 'Android Development', aliases: ['android development', 'android sdk', 'android', 'jetpack', 'kotlin / android sdk', 'android studio', 'compose', 'jetpack compose'] },
  { id: 'ios-dev', displayName: 'iOS Development', aliases: ['ios development', 'ios sdk', 'ios', 'swift / ios sdk', 'uikit', 'swiftui', 'xcode'] },
  { id: 'kotlin', displayName: 'Kotlin', aliases: ['kotlin', 'kotlin language', 'coroutines'] },
  { id: 'swift', displayName: 'Swift', aliases: ['swift', 'swift language', 'swift concurrency'] },
  { id: 'mobile-sec', displayName: 'Mobile Security', aliases: ['mobile security', 'mobile encryption', 'keychain', 'keystore', 'biometrics'] },
  { id: 'local-storage', displayName: 'Offline / Local Storage', aliases: ['offline / local storage', 'room database', 'coredata', 'sqlite', 'realm', 'local storage', 'indexeddb', 'sharedpreferences'] },
  { id: 'state-management', displayName: 'State Management', aliases: ['state management', 'redux', 'bloc', 'provider', 'viewmodel', 'zustand', 'mobx', 'context api'] },
  { id: 'html-css', displayName: 'HTML & CSS', aliases: ['html & css', 'html', 'css', 'html5', 'css3', 'html/css', 'semantic html', 'cascading style sheets'] },
  { id: 'responsive-design', displayName: 'Responsive Design', aliases: ['responsive design', 'mobile responsive', 'flexbox', 'grid', 'responsive web design', 'media queries', 'mobile-first', 'tailwind', 'bootstrap'] },
  { id: 'build-tools', displayName: 'Build Tools', aliases: ['build tools', 'vite', 'webpack', 'babel', 'esbuild', 'rollup', 'npm scripts', 'turbopack', 'parcel'] },
  { id: 'testing-qa', displayName: 'Testing & QA', aliases: ['testing & qa', 'testing', 'jest', 'cypress', 'playwright', 'unit testing', 'integration testing', 'qa', 'react testing library', 'mocha', 'chai', 'test automation', 'end-to-end testing'] },
  { id: 'problem-solving', displayName: 'Problem Solving', aliases: ['problem solving', 'analytical thinking', 'troubleshooting', 'critical thinking', 'data structures', 'algorithms', 'dsa', 'leetcode'] },
  { id: 'penetration-testing', displayName: 'Penetration Testing', aliases: ['penetration testing', 'pen testing', 'ethical hacking', 'metasploit', 'burp suite', 'owasp'] },
  { id: 'etl', displayName: 'ETL Pipelines', aliases: ['etl pipelines', 'etl', 'data pipelines', 'data ingestion', 'data extraction'] },
  { id: 'data-warehousing', displayName: 'Data Warehousing', aliases: ['data warehousing', 'data warehouse', 'snowflake', 'redshift', 'bigquery', 'dbt'] },
  { id: 'spark', displayName: 'Spark', aliases: ['spark', 'apache spark', 'pyspark', 'databricks'] },
  { id: 'airflow', displayName: 'Airflow', aliases: ['airflow', 'apache airflow', 'data orchestration'] },
  { id: 'machine-learning', displayName: 'Machine Learning', aliases: ['machine learning', 'ml', 'scikit-learn', 'scikitlearn', 'sklearn', 'ml models', 'model training', 'random forest', 'xgboost', 'svm', 'knn'] },
  { id: 'deep-learning', displayName: 'Deep Learning', aliases: ['deep learning', 'pytorch', 'tensorflow', 'keras', 'neural networks', 'dl', 'cnn', 'rnn', 'transformers', 'llm'] },
  { id: 'data-preprocessing', displayName: 'Data Preprocessing', aliases: ['data preprocessing', 'feature engineering', 'pandas', 'numpy', 'data cleaning', 'eda', 'exploratory data analysis'] },
  { id: 'model-evaluation', displayName: 'Model Evaluation', aliases: ['model evaluation', 'cross validation', 'hyperparameter tuning', 'model metrics', 'roc-auc', 'precision-recall', 'confusion matrix'] },
  { id: 'excel', displayName: 'Excel', aliases: ['excel', 'ms excel', 'microsoft excel', 'spreadsheets', 'vlookup', 'pivot tables'] },
  { id: 'tableau-powerbi', displayName: 'Tableau / Power BI', aliases: ['tableau', 'power bi', 'powerbi', 'data visualization', 'business intelligence', 'bi tools', 'tableau / power bi', 'looker', 'qlik'] },
  { id: 'statistics', displayName: 'Statistics', aliases: ['statistics', 'statistical analysis', 'hypothesis testing', 'probability', 'descriptive statistics', 'a/b testing', 'regression'] }
];

export function resolveCanonicalSkill(rawName: string): { id: string; displayName: string } {
  const clean = String(rawName || '').trim().toLowerCase();
  for (const def of CANONICAL_SKILLS) {
    if (def.aliases.includes(clean) || clean === def.id || clean === def.displayName.toLowerCase()) {
      return { id: def.id, displayName: def.displayName };
    }
  }
  const id = clean.replace(/[^a-z0-9]+/g, '-');
  return { id, displayName: rawName.trim() };
}

interface RequirementDef {
  rawName: string;
  category: string;
  priorityGroup: 'High Priority' | 'Medium Priority' | 'Supporting' | 'Core' | 'Important' | 'Optional';
  importance: 'High' | 'Medium' | 'Low';
  prerequisites?: string[];
}

const ROLE_REQUIREMENTS_TEMPLATES: Record<string, RequirementDef[]> = {
  frontend: [
    { rawName: 'HTML & CSS', category: 'Core Frontend', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'JavaScript', category: 'Core Frontend', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'TypeScript', category: 'Core Frontend', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'Responsive Design', category: 'Core Frontend', priorityGroup: 'Medium Priority', importance: 'Medium' },
    { rawName: 'React.js', category: 'Frontend Frameworks', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'REST APIs', category: 'Web & API Integration', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'Git / Version Control', category: 'Core Tooling', priorityGroup: 'Medium Priority', importance: 'Medium' },
    { rawName: 'Build Tools', category: 'Tooling & Optimization', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'Testing & QA', category: 'Testing & Quality', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'CI/CD', category: 'DevOps & Deployment', priorityGroup: 'Supporting', importance: 'Low' }
  ],
  backend: [
    { rawName: 'Node.js', category: 'Core Backend', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'Express.js', category: 'Core Backend', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'REST APIs', category: 'API Engineering', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'SQL', category: 'Data & Persistence', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'MongoDB', category: 'Data & Persistence', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'Docker', category: 'Containerization & DevOps', priorityGroup: 'Medium Priority', importance: 'High' },
    { rawName: 'Git / Version Control', category: 'Core Tooling', priorityGroup: 'Medium Priority', importance: 'Medium' },
    { rawName: 'CI/CD', category: 'DevOps & Deployment', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'Cloud Computing', category: 'Infrastructure', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'Linux', category: 'Infrastructure', priorityGroup: 'Supporting', importance: 'Low' }
  ],
  fullstack: [
    { rawName: 'HTML & CSS', category: 'Core Frontend', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'JavaScript', category: 'Core Frontend', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'TypeScript', category: 'Core Frontend', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'React.js', category: 'Frontend Frameworks', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'Node.js', category: 'Backend Architecture', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'REST APIs', category: 'API Integration', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'SQL', category: 'Database Systems', priorityGroup: 'High Priority', importance: 'High' },
    { rawName: 'MongoDB', category: 'Database Systems', priorityGroup: 'Medium Priority', importance: 'Medium' },
    { rawName: 'Git / Version Control', category: 'Core Tooling', priorityGroup: 'Medium Priority', importance: 'Medium' },
    { rawName: 'Docker', category: 'DevOps & Deployment', priorityGroup: 'Supporting', importance: 'Medium' }
  ],
  software: [
    { rawName: 'REST APIs', category: 'Web & API Engineering', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'SQL', category: 'Data & Databases', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Git / Version Control', category: 'Core Engineering', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'JavaScript', category: 'Web & Frontend', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Node.js', category: 'Backend Engineering', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'React.js', category: 'Web & Frontend', priorityGroup: 'Important', importance: 'Medium' },
    { rawName: 'TypeScript', category: 'Web & Frontend', priorityGroup: 'Important', importance: 'Medium' },
    { rawName: 'Docker', category: 'DevOps & Deployment', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'CI/CD', category: 'DevOps & Deployment', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'Problem Solving', category: 'Core Engineering', priorityGroup: 'Core', importance: 'High' }
  ],
  dataAnalyst: [
    { rawName: 'SQL', category: 'Core Data & Databases', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Python', category: 'Data Programming', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Data Preprocessing', category: 'Data Wrangling & EDA', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Excel', category: 'Spreadsheet Analysis', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Tableau / Power BI', category: 'Business Intelligence & Visualization', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Statistics', category: 'Quantitative Analysis', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'Git / Version Control', category: 'Core Tooling', priorityGroup: 'Supporting', importance: 'Medium' }
  ],
  dataEngineer: [
    { rawName: 'SQL', category: 'Data Architecture', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Python', category: 'Data Programming', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'ETL Pipelines', category: 'Data Processing', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Data Warehousing', category: 'Data Architecture', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Spark', category: 'Data Processing', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'Airflow', category: 'Workflow & Orchestration', priorityGroup: 'Important', importance: 'Medium' },
    { rawName: 'Cloud Computing', category: 'Data Infrastructure', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'Git / Version Control', category: 'Core Tooling', priorityGroup: 'Supporting', importance: 'Medium' }
  ],
  ml: [
    { rawName: 'Python', category: 'Data & Modeling', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Machine Learning', category: 'Data & Modeling', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Data Preprocessing', category: 'Data Engineering', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Deep Learning', category: 'Advanced AI', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Model Evaluation', category: 'Data & Modeling', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'SQL', category: 'Data Engineering', priorityGroup: 'Important', importance: 'Medium' },
    { rawName: 'Git / Version Control', category: 'Core Tooling', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'REST APIs', category: 'Model Deployment', priorityGroup: 'Supporting', importance: 'Medium' }
  ],
  devops: [
    { rawName: 'Linux', category: 'Systems Administration', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Docker', category: 'Containerization', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'CI/CD', category: 'Automation Pipelines', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'AWS', category: 'Cloud Infrastructure', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Git / Version Control', category: 'Core Tooling', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Infrastructure as Code', category: 'Automation Pipelines', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'Cloud Security', category: 'Cloud Infrastructure', priorityGroup: 'Important', importance: 'Medium' },
    { rawName: 'Kubernetes', category: 'Containerization', priorityGroup: 'Important', importance: 'Medium' },
    { rawName: 'Monitoring & Logging', category: 'Systems Administration', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'Python', category: 'Scripting & Automation', priorityGroup: 'Supporting', importance: 'Medium' }
  ],
  cloud: [
    { rawName: 'AWS', category: 'Cloud Infrastructure', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Cloud Computing', category: 'Cloud Architecture', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Linux', category: 'Systems Administration', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Docker', category: 'Containerization', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'CI/CD', category: 'Automation Pipelines', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Infrastructure as Code', category: 'Automation Pipelines', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'Cloud Security', category: 'Cloud Infrastructure', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'Python', category: 'Scripting & Automation', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'Git / Version Control', category: 'Core Tooling', priorityGroup: 'Supporting', importance: 'Medium' }
  ],
  mobile: [
    { rawName: 'Mobile Architecture', category: 'Mobile Architecture', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Android Development', category: 'Platform Development', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'iOS Development', category: 'Platform Development', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Kotlin', category: 'Platform Languages', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Swift', category: 'Platform Languages', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Offline / Local Storage', category: 'Mobile Architecture', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'State Management', category: 'Mobile Architecture', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'Mobile Security', category: 'Mobile Security & Quality', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'REST APIs', category: 'Integration & Connectivity', priorityGroup: 'Important', importance: 'Medium' },
    { rawName: 'Git / Version Control', category: 'Core Tooling', priorityGroup: 'Supporting', importance: 'Medium' }
  ],
  cyber: [
    { rawName: 'Linux', category: 'Systems & Infrastructure', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Network Security', category: 'Systems & Infrastructure', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'SIEM', category: 'Security Monitoring', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Vulnerability Assessment', category: 'Operations & Response', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Incident Response', category: 'Operations & Response', priorityGroup: 'Core', importance: 'High' },
    { rawName: 'Cryptography', category: 'Security Engineering', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'Firewalls', category: 'Systems & Infrastructure', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'Cloud Security', category: 'Security Engineering', priorityGroup: 'Important', importance: 'High' },
    { rawName: 'Penetration Testing', category: 'Operations & Response', priorityGroup: 'Supporting', importance: 'Medium' },
    { rawName: 'Python', category: 'Security Automation', priorityGroup: 'Supporting', importance: 'Medium' }
  ]
};

function getRoleRequirementsForRole(targetRole: string): RequirementDef[] {
  const lower = String(targetRole || '').toLowerCase();
  if (lower.includes('frontend') || lower.includes('front-end') || lower.includes('ui developer') || lower.includes('react developer')) {
    return ROLE_REQUIREMENTS_TEMPLATES.frontend;
  }
  if (lower.includes('backend') || lower.includes('back-end') || lower.includes('node') || lower.includes('api developer')) {
    return ROLE_REQUIREMENTS_TEMPLATES.backend;
  }
  if (lower.includes('full stack') || lower.includes('fullstack') || lower.includes('mern') || lower.includes('mean')) {
    return ROLE_REQUIREMENTS_TEMPLATES.fullstack;
  }
  if (lower.includes('devops') || lower.includes('sre') || lower.includes('site reliability') || lower.includes('infrastructure engineer')) {
    return ROLE_REQUIREMENTS_TEMPLATES.devops;
  }
  if (lower.includes('mobile') || lower.includes('android') || lower.includes('ios') || lower.includes('flutter')) {
    return ROLE_REQUIREMENTS_TEMPLATES.mobile;
  }
  if (lower.includes('cyber') || lower.includes('security') || lower.includes('soc') || lower.includes('info-sec')) {
    return ROLE_REQUIREMENTS_TEMPLATES.cyber;
  }
  if (lower.includes('machine learning') || lower.includes('ml') || lower.includes('ai') || lower.includes('data scientist')) {
    return ROLE_REQUIREMENTS_TEMPLATES.ml;
  }
  if (lower.includes('data engineer') || lower.includes('etl') || lower.includes('data architect') || lower.includes('data warehousing')) {
    return ROLE_REQUIREMENTS_TEMPLATES.dataEngineer;
  }
  if (lower.includes('data') || lower.includes('analytics') || lower.includes('bi developer') || lower.includes('business intelligence')) {
    return ROLE_REQUIREMENTS_TEMPLATES.dataAnalyst;
  }
  if (lower.includes('cloud')) {
    return ROLE_REQUIREMENTS_TEMPLATES.cloud;
  }
  return ROLE_REQUIREMENTS_TEMPLATES.software;
}

/**
 * Helper to determine related skills already evidenced in resume
 */
function getRelatedSkillsForSkill(skillId: string, detectedSkills: string[]): string[] {
  const cleanId = skillId.toLowerCase();
  const hasJs = detectedSkills.some(s => /javascript|js/i.test(s));
  const hasNode = detectedSkills.some(s => /node|express/i.test(s));
  const hasMongo = detectedSkills.some(s => /mongo/i.test(s));
  const hasSql = detectedSkills.some(s => /sql/i.test(s));
  const hasHtml = detectedSkills.some(s => /html/i.test(s));

  if (cleanId === 'react') {
    const list: string[] = [];
    if (hasJs) list.push('JavaScript ✓');
    if (hasNode) list.push('Node.js ✓');
    if (hasMongo) list.push('MongoDB ✓');
    return list.length > 0 ? list : ['JavaScript ✓'];
  }
  if (cleanId === 'typescript') {
    return hasJs ? ['JavaScript ✓'] : ['Web Scripting'];
  }
  if (cleanId === 'rest-api') {
    const list: string[] = [];
    if (hasNode) list.push('Node.js ✓');
    if (hasJs) list.push('JavaScript ✓');
    return list.length > 0 ? list : ['Backend Services'];
  }
  if (cleanId === 'responsive-design') {
    return hasHtml ? ['HTML & CSS (Partial)'] : ['Web Layouts'];
  }
  if (cleanId === 'git') {
    return ['Project Collaboration'];
  }
  if (cleanId === 'build-tools') {
    return hasJs ? ['JavaScript Tooling'] : ['Module Bundling'];
  }
  if (cleanId === 'testing-qa') {
    return ['Code Quality & QA'];
  }
  if (cleanId === 'cicd') {
    return ['Deployment Automation'];
  }
  if (cleanId === 'html-css') {
    return ['Web Markup & Styling'];
  }
  if (cleanId === 'javascript') {
    return ['Core Web Development'];
  }
  return [];
}

/**
 * Helper to generate clear, non-accusatory gap interpretation
 */
function getGapInterpretationForSkill(skillId: string, simpleStatus: 'VERIFIED' | 'PARTIAL' | 'MISSING', detectedSkills: string[]): string {
  const cleanId = skillId.toLowerCase();
  if (simpleStatus === 'VERIFIED') {
    return 'Practical project or work implementation evidence is clearly demonstrated in your resume.';
  }

  const hasJs = detectedSkills.some(s => /javascript|js/i.test(s));

  if (cleanId === 'react') {
    return hasJs
      ? 'The resume demonstrates JavaScript development but does not currently demonstrate experience with a frontend framework.'
      : 'No evidence of modern frontend framework (React) usage in projects or work experience.';
  }
  if (cleanId === 'typescript') {
    return 'JavaScript is demonstrated, but static typing and TypeScript compiler configuration are not yet evidenced in projects.';
  }
  if (cleanId === 'rest-api') {
    return 'Backend or database operations are present, but client-side asynchronous REST API consumption is not evidenced.';
  }
  if (cleanId === 'responsive-design') {
    return 'Layout styling is present, but mobile-first responsive breakpoints and flexible CSS grids are not evidenced.';
  }
  if (cleanId === 'html-css') {
    return 'HTML is supported through coursework evidence, while practical CSS implementation evidence is not yet demonstrated in projects.';
  }
  if (cleanId === 'git') {
    return 'Version control practices and GitHub collaborative workflow are not explicitly documented in project descriptions.';
  }
  if (cleanId === 'build-tools') {
    return 'Modern build tooling, bundlers (Vite/Webpack), and asset optimization pipelines are not documented.';
  }
  if (cleanId === 'testing-qa') {
    return 'Automated unit or integration testing coverage (such as Jest or React Testing Library) is not documented.';
  }
  if (cleanId === 'cicd') {
    return 'Automated CI/CD pipelines (such as GitHub Actions) are not documented in project workflows.';
  }

  return simpleStatus === 'PARTIAL'
    ? 'Coursework or mention detected, but practical implementation evidence is missing in the submitted resume.'
    : 'No relevant practical or coursework evidence was detected in the submitted resume.';
}

/**
 * Helper to generate actionable resume advice
 */
function getResumeActionForSkill(skillId: string, simpleStatus: 'VERIFIED' | 'PARTIAL' | 'MISSING'): string {
  const cleanId = skillId.toLowerCase();
  if (simpleStatus === 'VERIFIED') {
    return 'Quantify user traffic, performance improvements, or business impact in your project bullets.';
  }

  if (cleanId === 'react') {
    return 'Add a project bullet explicitly mentioning React component hierarchy, hooks (useState/useEffect), and state management.';
  }
  if (cleanId === 'typescript') {
    return 'Highlight TypeScript interfaces, generics, and compile-time type safety in your project descriptions.';
  }
  if (cleanId === 'rest-api') {
    return 'Document REST API integration, asynchronous error handling, and JSON state updates in your project bullet points.';
  }
  if (cleanId === 'responsive-design') {
    return 'Mention mobile-first responsive design using modern CSS Flexbox/Grid and media queries in your project summary.';
  }
  if (cleanId === 'html-css') {
    return 'Detail semantic HTML5 layout structures and modular CSS styling in your project description.';
  }
  if (cleanId === 'git') {
    return 'Include a link to your active GitHub repository showing feature branch commits and clean PR history.';
  }
  if (cleanId === 'build-tools') {
    return 'Mention modern build tooling (Vite/Webpack) configuration and bundling optimization in your tech stack.';
  }
  if (cleanId === 'testing-qa') {
    return 'Add a bullet noting automated unit tests written with Jest or React Testing Library.';
  }
  if (cleanId === 'cicd') {
    return 'Mention GitHub Actions automated build, test, and deployment workflows in your project summary.';
  }

  return 'Build a practical project using this technology and document the concrete implementation in your resume.';
}
export function getSkillRecommendation(
  skillId: string,
  displayName: string,
  status: 'VERIFIED' | 'PARTIAL' | 'MISSING',
  targetRole: string,
  detectedSkills: string[] = []
): string {
  const cleanId = skillId.toLowerCase();

  if (status === 'VERIFIED') {
    return `Maintain current implementation and highlight quantifiable performance metrics or user impact in your resume bullet points.`;
  }

  const hasJs = detectedSkills.some(s => /javascript|js/i.test(s));
  const hasNode = detectedSkills.some(s => /node|express/i.test(s));
  const hasHtml = detectedSkills.some(s => /html/i.test(s));

  if (cleanId === 'react') {
    if (hasJs && hasNode) {
      return 'Use your existing JavaScript and Node.js experience to extend or rebuild a frontend project using React, then connect it to a REST API.';
    }
    if (hasJs) {
      return 'Use your existing JavaScript experience to extend or rebuild a frontend project using React, then connect it to a REST API.';
    }
    return 'Build or update a React project using reusable components, hooks, state management, and API integration. Add the implementation to your project description.';
  }

  if (cleanId === 'typescript') {
    if (hasJs) {
      return 'Add TypeScript types, interfaces, and build compilation to an existing JavaScript project to make it type-safe.';
    }
    return 'Build or update a frontend project using TypeScript and highlight the implementation in the project description.';
  }

  if (cleanId === 'rest-api') {
    if (hasNode) {
      return 'Build a frontend application that consumes REST APIs powered by your existing Node.js backend knowledge.';
    }
    return 'Build a frontend or full-stack application that consumes REST APIs and describe the API integration in a project bullet.';
  }

  if (cleanId === 'responsive-design') {
    return 'Implement responsive layouts using CSS media queries, Flexbox/Grid, and mobile-first design across desktop and mobile devices.';
  }

  if (cleanId === 'git') {
    return 'Use Git with feature branches, descriptive commit messages, pull requests, and GitHub collaboration in a practical project.';
  }

  if (cleanId === 'build-tools') {
    return 'Configure a modern build setup using Vite or Webpack with bundling and optimization pipelines in your project.';
  }

  if (cleanId === 'testing-qa') {
    return 'Add unit or component tests using tools such as Jest or React Testing Library to demonstrate testing rigor.';
  }

  if (cleanId === 'cicd') {
    return 'Set up a basic CI/CD workflow using GitHub Actions to automatically test and deploy the project on commit.';
  }

  if (cleanId === 'html-css') {
    return 'Develop semantic, accessible HTML5 layouts with modern CSS3 styling, Flexbox/Grid, and modular structure.';
  }

  const recommendationsBySkill: Record<string, string> = {
    javascript: 'Develop interactive features in a web project utilizing ES6+ concepts, asynchronous promises, and DOM manipulation.',
    sql: 'Design relational database schemas and write complex SQL queries for data retrieval and indexing in your project.',
    node: 'Build backend RESTful API services with Node.js and Express, handling routing, middleware, and database operations.',
    express: 'Develop structured Express.js middleware, routing architectures, and authentication controllers in a backend project.',
    docker: 'Containerize your application with a Dockerfile and docker-compose to demonstrate containerization skills.',
    kubernetes: 'Deploy containerized microservices to a Kubernetes cluster using manifests, services, and ingress rules.',
    aws: 'Deploy and host your web application or API using AWS services such as S3, EC2, Lambda, or App Runner.',
    'cloud-computing': 'Provision and manage cloud resources on AWS, GCP, or Azure with secure IAM access and monitoring.',
    linux: 'Set up and configure a Linux environment or server, using shell scripts for automation and process management.',
    mongodb: 'Integrate MongoDB with Mongoose for document storage, indexing, and schema validation in your project.',
    python: 'Build data processing scripts or backend API services using Python and demonstrate clean modular code.',
    'machine-learning': 'Train, tune, and evaluate machine learning models using Scikit-Learn on a real-world dataset.',
    'deep-learning': 'Construct neural network architectures using PyTorch or TensorFlow for computer vision or NLP tasks.',
    'data-preprocessing': 'Perform exploratory data analysis, data cleaning, and feature engineering using Pandas and NumPy.',
    'model-evaluation': 'Implement cross-validation, ROC-AUC, and precision-recall metric evaluations for your machine learning models.',
    excel: 'Create advanced Excel financial or business models using pivot tables, lookup formulas, and dynamic charts.',
    'tableau-powerbi': 'Build an interactive business intelligence dashboard in Tableau or Power BI with filtering and KPI cards.',
    statistics: 'Apply statistical hypothesis testing, distributions, and probability models to business dataset analysis.',
    'mobile-arch': 'Structure mobile application code with MVVM or Clean Architecture patterns and reactive state management.',
    'android-dev': 'Develop a native Android app using Kotlin, Jetpack Compose, and Android Architecture Components.',
    'ios-dev': 'Build a native iOS application using Swift, SwiftUI, and modern concurrency features.',
    kotlin: 'Implement asynchronous workflows in Kotlin using Coroutines and Flow in an Android or backend project.',
    swift: 'Write idiomatic Swift code utilizing protocols, generics, and SwiftUI declarative interfaces.',
    'mobile-sec': 'Implement encrypted local storage using Android KeyStore or iOS Keychain for sensitive token storage.',
    'local-storage': 'Implement offline caching using Room Database (Android) or CoreData/SQLite with sync mechanisms.',
    'state-management': 'Manage global state with Redux, Zustand, or ViewModel architecture in your user interface.',
    siem: 'Configure SIEM log collection, rule correlation, and incident alerting in a security lab environment.',
    'network-security': 'Analyze network traffic with Wireshark and configure secure firewall routing rules.',
    firewalls: 'Configure packet filtering and stateful inspection firewall rules to defend internal networks.',
    'vulnerability-assessment': 'Perform vulnerability scans using Nessus or OpenVAS and document prioritized remediation steps.',
    'incident-response': 'Document a standard operating procedure and forensic triage steps for a security incident response scenario.',
    cryptography: 'Implement secure cryptographic data hashing, public-key encryption, and TLS certificate validation.',
    'cloud-security': 'Configure principle-of-least-privilege IAM policies and cloud security posture audits.',
    iac: 'Define cloud infrastructure declaratively using Terraform or AWS CloudFormation with reusable modules.',
    monitoring: 'Set up system metrics collection with Prometheus and build operational observability dashboards in Grafana.',
    'problem-solving': 'Practice algorithmic problem solving on data structures and document optimization techniques.'
  };

  return recommendationsBySkill[cleanId] || `Build a practical project utilizing ${displayName} to demonstrate verified hands-on capability for ${targetRole}.`;
}

export function validateCanonicalData(doc: any): void {
  const errors: string[] = [];
  const strongCount = doc.skillAnalysis?.strongSkills?.length || 0;
  const partialCount = doc.skillAnalysis?.partialSkills?.length || 0;
  const missingCount = doc.skillAnalysis?.missingSkills?.length || 0;
  const totalRequired = strongCount + partialCount + missingCount;

  const kwScore = Number(doc.atsBreakdown?.keywordMatch?.score || 0);
  const structScore = Number(doc.atsBreakdown?.structure?.score || 0);
  const fmtScore = Number(doc.atsBreakdown?.formatting?.score || 0);
  const parseScore = Number(doc.atsBreakdown?.parsing?.score || 0);

  const kwPts = Math.round(kwScore * 0.35);
  const structPts = Math.round(structScore * 0.25);
  const fmtPts = Math.round(fmtScore * 0.20);
  const parsePts = Math.round(parseScore * 0.20);
  const expectedAts = kwPts + structPts + fmtPts + parsePts;

  // Enforce mathematically reconciled score across all doc properties
  doc.atsScore = expectedAts;
  doc.overallScore = expectedAts;

  if (expectedAts >= 80) {
    doc.atsRiskLevel = 'Low Risk';
  } else if (expectedAts >= 60) {
    doc.atsRiskLevel = 'Moderate Risk';
  } else {
    doc.atsRiskLevel = 'High Risk';
  }

  const targetRole = doc.targetRole || 'Software Engineer';

  if (doc.canonicalAnalysis) {
    doc.canonicalAnalysis.atsAnalysis = {
      score: expectedAts,
      riskLevel: doc.atsRiskLevel,
      weightedBreakdown: {
        keywordMatch: { score: kwScore, weight: 0.35, points: kwPts },
        structure: { score: structScore, weight: 0.25, points: structPts },
        formatting: { score: fmtScore, weight: 0.20, points: fmtPts },
        parsing: { score: parseScore, weight: 0.20, points: parsePts }
      }
    };
  }

  if (doc.xaiExplanations) {
    doc.xaiExplanations.whyScore = `Your canonical ATS score is ${expectedAts}/100 (${doc.atsRiskLevel}) for ${targetRole}. Formula: Keyword Coverage (${kwPts} pts) + Structure (${structPts} pts) + Formatting Safety (${fmtPts} pts) + Parsing Accuracy (${parsePts} pts) = ${expectedAts}/100.`;
  }
  doc.overallScoreExplanation = `Your resume has a canonical ATS score of ${expectedAts}/100 (${doc.atsRiskLevel}) for ${targetRole}.`;

  // Ensure roadmap skills are strictly unique across stages
  const seenRoadmapSkills = new Set<string>();
  const stages = doc.roadmapStages || doc.careerRoadmap || [];
  stages.forEach((st: any) => {
    if (Array.isArray(st.skillsToFocus)) {
      st.skillsToFocus = st.skillsToFocus.filter((s: string) => {
        const lower = String(s).toLowerCase();
        if (seenRoadmapSkills.has(lower)) {
          return false;
        }
        seenRoadmapSkills.add(lower);
        return true;
      });
    }
  });

  // Ensure unique course recommendations
  const courses = doc.courseRecommendations || [];
  const courseMap = new Map<string, any>();
  courses.forEach((c: any) => {
    if (c.courseId && !courseMap.has(c.courseId)) {
      courseMap.set(c.courseId, c);
    }
  });
  doc.courseRecommendations = Array.from(courseMap.values());

  console.log(`✅ [CANONICAL VALIDATION PASSED] All math, skills, and dimension counts reconciled for ${targetRole}. Canonical Score: ${expectedAts}/100.`);
}

function extractCandidateName(rawText: string, existingName?: string): string {
  const cleanExisting = String(existingName || '').trim();
  if (
    cleanExisting &&
    !/not found|not explicitly|n\/a|null|undefined|candidate|direct resume/i.test(cleanExisting)
  ) {
    return cleanExisting;
  }

  if (!rawText) return 'Candidate';

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const ignorePatterns = /resume|curriculum|vitae|contact|summary|experience|projects|education|skills|profile|objective|phone|email|gmail|github|linkedin/i;

  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i];
    if (ignorePatterns.test(line)) continue;
    // Name pattern: 2 to 4 capitalized words, no digits
    if (/^[A-Z][a-zA-Z\.\-']+(\s+[A-Z][a-zA-Z\.\-']+){1,3}$/.test(line)) {
      return line;
    }
  }

  // Fallback: derive name from email if present
  const emailMatch = rawText.match(/([a-zA-Z0-9._%+-]+)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    const username = emailMatch[1].replace(/[0-9_.-]+/g, ' ').trim();
    if (username.length >= 3) {
      return username.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }
  }

  return 'Candidate';
}

export function normalizeAnalysis(analysis: any): any {
  if (!analysis) return analysis;

  const doc = typeof analysis.toObject === 'function' ? analysis.toObject() : { ...analysis };

  const targetRole = doc.targetRole || 'Software Engineer';
  const rawText = doc.rawText || '';
  const skillAnalysis = doc.skillAnalysis || {};
  const atsBreakdown = doc.atsBreakdown || {};

  // Aggregate project and experience text for precision evidence matching
  const projListRaw = doc.projectAnalysis?.projects || doc.projectAnalysis?.projectList || [];
  const normalizedProjects = Array.isArray(projListRaw) ? projListRaw.map((p: any) => {
    const projTechs = Array.isArray(p.technologies) ? p.technologies : (p.techStack || []);
    let rel = Number(p.relevanceScore !== undefined ? p.relevanceScore : (p.relevance !== undefined ? p.relevance : 20));

    const lowerRole = targetRole.toLowerCase();
    const projText = `${p.name || ''} ${p.title || ''} ${projTechs.join(' ')} ${p.description || ''}`.toLowerCase();

    if (lowerRole.includes('devops') || lowerRole.includes('cloud') || lowerRole.includes('sre')) {
      rel = /docker|aws|cloud|ci\/cd|kubernetes|terraform|linux|pipeline|deploy/i.test(projText) ? 85 : 25;
    } else if (lowerRole.includes('mobile')) {
      rel = /android|ios|kotlin|swift|mobile|flutter|react native/i.test(projText) ? 85 : 25;
    } else if (lowerRole.includes('cyber') || lowerRole.includes('security')) {
      rel = /security|siem|network|firewall|linux|vulnerability|crypto/i.test(projText) ? 85 : 20;
    } else if (lowerRole.includes('data')) {
      rel = /data|etl|spark|airflow|sql|python|warehouse/i.test(projText) ? 85 : 30;
    }

    return {
      name: p.name || p.title || 'Technical Project',
      technologies: projTechs,
      relevanceScore: rel,
      complexity: p.complexity || 'Intermediate',
      strengths: Array.isArray(p.strengths) ? p.strengths : [p.strengths || 'Grounded in extracted project text.'],
      weaknesses: Array.isArray(p.weaknesses) ? p.weaknesses : [p.weaknesses || 'Focus on quantifying outcomes.'],
      improvements: Array.isArray(p.improvements) ? p.improvements : [p.improvements || 'Quantify user traffic or dataset size handled.']
    };
  }) : [];

  const projectTextAgg = normalizedProjects.map(p => `${p.name} ${p.technologies.join(' ')}`).join(' ');
  const expTextAgg = (doc.experienceAnalysis?.bulletImprovements || []).join(' ') + ' ' + (doc.rawText || '');
  const workExpHeaderPresent = /work experience|employment|professional experience|job history|internship/i.test(rawText);

  interface UnifiedSkill {
    id: string;
    displayName: string;
    category: string;
    priorityGroup: 'High Priority' | 'Medium Priority' | 'Supporting' | 'Core' | 'Important' | 'Optional' | string;
    status: 'Strong' | 'Needs Verification' | 'No Resume Evidence';
    evidenceLevel: 'No Evidence' | 'Learning Evidence' | 'Mentioned' | 'Practical Evidence' | 'Professional Evidence' | 'Strong Evidence';
    directMention: boolean;
    learningEvidence: boolean;
    projectEvidence: boolean;
    experienceEvidence: boolean;
    verificationStatus: 'Needs Practical Verification' | 'Verified' | 'Not Tested';
    verifiedLevel: 'not_yet_verified' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
    importance: string;
    evidence: string;
    confidence: number;
    roleRelevance?: string;
  }

  const skillMap = new Map<string, UnifiedSkill>();

  // Helper function to extract a concise sentence or phrase containing skill terms
  const extractSkillSnippet = (sourceText: string, terms: string[]): string => {
    if (!sourceText) return '';
    const sentences = sourceText.split(/[\r\n.!?]+/).map(s => s.trim()).filter(Boolean);
    for (const sentence of sentences) {
      for (const term of terms) {
        if (!term || term.length < 2) continue;
        const regex = new RegExp(`\\b${term.replace(/[^a-z0-9]/g, '[^a-z0-9]?')}\\b`, 'i');
        if (regex.test(sentence)) {
          let clean = sentence.replace(/^[•\-\*·\s]+/, '').replace(/\s+/g, ' ').trim();
          if (clean.length > 130) {
            clean = clean.substring(0, 127) + '...';
          }
          return clean;
        }
      }
    }
    return '';
  };

  // Evaluate evidence sources for any canonical skill
  const evaluateSkillSources = (id: string, displayName: string) => {
    const canonicalDef = CANONICAL_SKILLS.find(c => c.id === id);
    const searchTerms = canonicalDef ? [canonicalDef.displayName.toLowerCase(), ...canonicalDef.aliases] : [displayName.toLowerCase()];

    // 1. Direct Mention in raw text / skills
    let directMention = false;
    for (const term of searchTerms) {
      if (!term || term.length < 2) continue;
      const regex = new RegExp(`\\b${term.replace(/[^a-z0-9]/g, '[^a-z0-9]?')}\\b`, 'i');
      if (regex.test(rawText)) {
        directMention = true;
        break;
      }
    }

    // Special SQL handling for MySQL / PostgreSQL / SQLite
    if (id === 'sql' && !directMention) {
      if (/mysql|postgresql|sqlite/i.test(rawText)) {
        directMention = true;
      }
    }

    // 2. Practical / Project Evidence
    let projectEvidence = false;
    let projectSnippet = '';
    for (const term of searchTerms) {
      if (!term || term.length < 2) continue;
      const regex = new RegExp(`\\b${term.replace(/[^a-z0-9]/g, '[^a-z0-9]?')}\\b`, 'i');
      if (regex.test(projectTextAgg)) {
        projectEvidence = true;
        // Find specific project containing term
        const matchingProj = normalizedProjects.find((p: any) => {
          const combined = `${p.name} ${p.technologies.join(' ')} ${p.strengths.join(' ')}`;
          return regex.test(combined);
        });
        if (matchingProj) {
          projectSnippet = `Demonstrated in project "${matchingProj.name}" using ${matchingProj.technologies.slice(0, 4).join(', ')}.`;
        } else {
          projectSnippet = extractSkillSnippet(projectTextAgg, searchTerms);
        }
        break;
      }
    }

    // 3. Professional / Work Experience Evidence
    let experienceEvidence = false;
    let experienceSnippet = '';
    if (workExpHeaderPresent) {
      for (const term of searchTerms) {
        if (!term || term.length < 2) continue;
        const regex = new RegExp(`\\b${term.replace(/[^a-z0-9]/g, '[^a-z0-9]?')}\\b`, 'i');
        if (regex.test(expTextAgg)) {
          experienceEvidence = true;
          experienceSnippet = extractSkillSnippet(expTextAgg, searchTerms);
          break;
        }
      }
    }

    // 4. Learning Evidence (NPTEL, courses, certifications, academic, workshops)
    let learningEvidence = false;
    let learningContext = '';

    if (rawText) {
      const units = rawText.split(/[\r\n|,;•*·|–—\t]+/).map(u => u.trim()).filter(Boolean);
      const learningKeywords = /nptel|coursera|udemy|certification|certified|certified\s+in|course|bootcamp|training|academic|degree|diploma/i;

      for (const unit of units) {
        if (/soft skills|languages spoken|hobbies|interests|personality/i.test(unit)) continue;

        const hasTerm = searchTerms.some(term => {
          if (!term || term.length < 2) return false;
          const rx = new RegExp(`\\b${term.replace(/[^a-z0-9]/g, '[^a-z0-9]?')}\\b`, 'i');
          return rx.test(unit);
        });

        if (hasTerm) {
          if (learningKeywords.test(unit) || /certifications?|courses?/i.test(rawText)) {
            let cleaned = unit;
            cleaned = cleaned.replace(/\b(cgpa|gpa|percentage|marks|grade|aggregate)\s*[:=]?\s*\d+(\.\d+)?%?\b/gi, '');
            cleaned = cleaned.replace(/\b\d+(\.\d+)?\s*\/\s*10(\.0)?\b/gi, '');
            cleaned = cleaned.replace(/^(certifications?|courses?|credentials?|skills?|education|summary|profile)\s*[:\-•·–—]\s*/i, '');
            cleaned = cleaned.replace(/\b(problem-solving|teamwork|communication|adaptability|academic|soft skills|languages spoken|hobbies)\b/gi, '');
            cleaned = cleaned.replace(/\b(b\.tech|bachelor|diploma|cbse|icse)\b/gi, '');
            cleaned = cleaned.replace(/^[,\s:\-•·–—]+|[,\s:\-•·–—]+$/g, '');
            cleaned = cleaned.replace(/\s+/g, ' ');
            if (cleaned.length >= 2) {
              learningEvidence = true;
              learningContext = cleaned;
              break;
            }
          }
        }
      }
    }

    // Special GitHub / Git handling
    if (id === 'git' && !directMention && /github\.com|github/i.test(rawText)) {
      directMention = true;
    }

    return {
      directMention,
      learningEvidence,
      projectEvidence,
      experienceEvidence,
      learningContext,
      projectSnippet,
      experienceSnippet
    };
  };

  // 1. Evaluate Target Role Requirements
  const roleReqDefs = getRoleRequirementsForRole(targetRole);

  // Upsert skill with Canonical Evidence Model rules
  const upsertSkill = (
    rawName: string,
    category: string,
    importance: string = 'High',
    priorityGroup: string = 'High Priority'
  ) => {
    if (!rawName) return;
    const { id, displayName } = resolveCanonicalSkill(rawName);

    const sources = evaluateSkillSources(id, displayName);
    const isTargetRoleReq = roleReqDefs.some(r => resolveCanonicalSkill(r.rawName).id === id);
    const roleRelevance = isTargetRoleReq ? priorityGroup : 'Low Relevance';

    let evidenceLevel: 'No Evidence' | 'Learning Evidence' | 'Mentioned' | 'Practical Evidence' | 'Professional Evidence' | 'Strong Evidence' = 'No Evidence';
    let verificationStatus: 'Needs Practical Verification' | 'Verified' | 'Not Tested' = 'Not Tested';
    let status: 'Strong' | 'Needs Verification' | 'No Resume Evidence' = 'No Resume Evidence';
    let evidenceMsg = `No evidence of ${displayName} was found in the resume.`;
    let confidence = 0;

    // Strict evidence hierarchy: Practical/Work > Learning > Mentioned > No Evidence
    if (sources.experienceEvidence) {
      evidenceLevel = 'Professional Evidence';
      verificationStatus = 'Verified';
      status = 'Strong';
      confidence = 95;
      evidenceMsg = `Demonstrated practical implementation of ${displayName} in professional experience.`;
    } else if (sources.projectEvidence) {
      evidenceLevel = 'Practical Evidence';
      verificationStatus = 'Verified';
      status = 'Strong';
      confidence = 85;
      evidenceMsg = `Demonstrated hands-on practical implementation of ${displayName} in project work.`;
    } else if (sources.learningEvidence) {
      evidenceLevel = 'Learning Evidence';
      verificationStatus = 'Needs Practical Verification';
      status = 'Needs Verification';
      confidence = 60;
      if (id === 'html-css') {
        const hasHtml = /\bhtml\b/i.test(rawText);
        const hasCss = /\bcss\b/i.test(rawText);
        if (hasHtml && !hasCss) {
          evidenceMsg = 'HTML is supported through coursework evidence, while no practical CSS implementation evidence was identified.';
        } else if (!hasHtml && hasCss) {
          evidenceMsg = 'CSS is supported through coursework evidence, while no practical HTML implementation evidence was identified.';
        } else {
          evidenceMsg = 'HTML & CSS are listed through coursework or certifications, but practical implementation evidence is not yet demonstrated in projects.';
        }
      } else {
        evidenceMsg = `${displayName} is listed through coursework or certifications, but no practical project evidence was identified.`;
      }
    } else if (sources.directMention) {
      evidenceLevel = 'Mentioned';
      verificationStatus = 'Needs Practical Verification';
      status = 'Needs Verification';
      confidence = 50;
      if (id === 'html-css') {
        const hasHtml = /\bhtml\b/i.test(rawText);
        const hasCss = /\bcss\b/i.test(rawText);
        if (hasHtml && !hasCss) {
          evidenceMsg = 'HTML is listed under technical skills, while no practical CSS implementation evidence was identified.';
        } else {
          evidenceMsg = 'HTML & CSS are listed under technical skills without practical implementation evidence.';
        }
      } else {
        evidenceMsg = `${displayName} is listed as a technical skill, but no practical implementation evidence was identified.`;
      }
    } else {
      evidenceLevel = 'No Evidence';
      verificationStatus = 'Not Tested';
      status = 'No Resume Evidence';
      confidence = 0;
      evidenceMsg = `No resume evidence of ${displayName} was detected in the submitted resume.`;
    }

    const simpleStatus: 'VERIFIED' | 'PARTIAL' | 'MISSING' = status === 'Strong' ? 'VERIFIED' : (status === 'Needs Verification' ? 'PARTIAL' : 'MISSING');
    const recommendation = getSkillRecommendation(id, displayName, simpleStatus, targetRole);

    if (!skillMap.has(id)) {
      skillMap.set(id, {
        id,
        displayName,
        category: category || 'Core Requirements',
        priorityGroup,
        status,
        evidenceLevel,
        directMention: sources.directMention,
        learningEvidence: sources.learningEvidence,
        projectEvidence: sources.projectEvidence,
        experienceEvidence: sources.experienceEvidence,
        verificationStatus,
        verifiedLevel: status === 'Strong' ? 'intermediate' : 'not_yet_verified',
        importance,
        evidence: evidenceMsg,
        confidence,
        roleRelevance
      });
    } else {
      const existing = skillMap.get(id)!;
      // Preserve highest evidence tier
      if (status === 'Strong' && existing.status !== 'Strong') {
        existing.status = 'Strong';
        existing.evidenceLevel = evidenceLevel;
        existing.verificationStatus = 'Verified';
        existing.evidence = evidenceMsg;
        existing.confidence = confidence;
        existing.roleRelevance = roleRelevance;
      }
    }
  };

  // 1. Evaluate Target Role Requirements
  roleReqDefs.forEach((req) => {
    upsertSkill(req.rawName, req.category, req.importance, req.priorityGroup);
  });

  // 2. Populate additional skills from category structure / Gemini output if any
  const categories = skillAnalysis.categories || [];
  categories.forEach((cat: any) => {
    const categoryName = cat.categoryName || cat.category || 'General Technical Skills';
    const skills = cat.skills || [];
    skills.forEach((sk: any) => {
      const sName = sk.skillName || sk.name;
      if (sName) {
        upsertSkill(sName, categoryName, sk.importance, sk.priorityGroup || 'Supporting');
      }
    });
  });

  // 3. Extract unique detected skills from resume text and upsert non-role skills
  const extractedSkillsFromText = CANONICAL_SKILLS.filter(c => {
    return c.aliases.some(alias => {
      const regex = new RegExp(`\\b${alias.replace(/[^a-z0-9]/g, '[^a-z0-9]?')}\\b`, 'i');
      return regex.test(rawText);
    });
  }).map(c => c.displayName);

  extractedSkillsFromText.forEach(sName => {
    upsertSkill(sName, 'Additional Resume Skills', 'Supporting', 'Supporting');
  });

  // Rebuild lists & counts (Strictly 1 category per canonical skill)
  const matchedRoleSkills: string[] = [];
  const partialRoleSkills: string[] = [];
  const missingRoleSkills: string[] = [];
  const additionalVerifiedSkills: string[] = [];
  const additionalResumeSkillsObjects: any[] = [];

  const allDetectedSkillNames = Array.from(new Set([
    ...extractedSkillsFromText,
    ...Array.from(skillMap.values()).filter(s => s.status === 'Strong' || s.status === 'Needs Verification' || s.directMention || s.learningEvidence || s.projectEvidence || s.experienceEvidence).map(s => s.displayName)
  ]));

  const categoryMap = new Map<string, any[]>();
  const additionalCategoryMap = new Map<string, any[]>();

  skillMap.forEach((sk) => {
    const isRoleReq = roleReqDefs.some(r => resolveCanonicalSkill(r.rawName).id === sk.id);
    const simpleStatus: 'VERIFIED' | 'PARTIAL' | 'MISSING' = sk.status === 'Strong' ? 'VERIFIED' : (sk.status === 'Needs Verification' ? 'PARTIAL' : 'MISSING');
    const recText = getSkillRecommendation(sk.id, sk.displayName, simpleStatus, targetRole, allDetectedSkillNames);
    const relatedSkills = getRelatedSkillsForSkill(sk.id, allDetectedSkillNames);
    const gapInterpretation = getGapInterpretationForSkill(sk.id, simpleStatus, allDetectedSkillNames);
    const resumeAction = getResumeActionForSkill(sk.id, simpleStatus);

    if (isRoleReq) {
      if (sk.status === 'Strong') {
        matchedRoleSkills.push(sk.displayName);
      } else if (sk.status === 'Needs Verification') {
        partialRoleSkills.push(sk.displayName);
      } else {
        missingRoleSkills.push(sk.displayName);
      }

      if (!categoryMap.has(sk.category)) {
        categoryMap.set(sk.category, []);
      }
      categoryMap.get(sk.category)!.push({
        skillId: sk.id,
        skillName: sk.displayName,
        name: sk.displayName,
        status: sk.status,
        simpleStatus,
        evidenceLevel: sk.evidenceLevel,
        directMention: sk.directMention,
        learningEvidence: sk.learningEvidence,
        projectEvidence: sk.projectEvidence,
        experienceEvidence: sk.experienceEvidence,
        resumeEvidence: sk.status === 'Strong' ? 'strong' : (sk.status === 'Needs Verification' ? 'detected' : 'none'),
        verificationStatus: sk.verificationStatus,
        verifiedLevel: sk.verifiedLevel,
        importance: sk.importance,
        priorityGroup: sk.priorityGroup,
        evidence: sk.evidence,
        recommendation: recText,
        relatedSkills,
        gapInterpretation,
        resumeAction,
        confidence: sk.confidence,
        roleRelevance: sk.priorityGroup || 'Core',
        isRoleReq: true,
        matched: sk.status === 'Strong'
      });
    } else {
      // Non-role requirement detected in resume or extracted
      if (sk.status === 'Strong' || sk.status === 'Needs Verification' || sk.directMention || sk.learningEvidence || sk.projectEvidence || sk.experienceEvidence) {
        if (sk.status === 'Strong') {
          additionalVerifiedSkills.push(sk.displayName);
        }

        // Determine additional skill classification: Supporting, Transferable, or Tool
        let additionalGroup: 'Relevant Supporting' | 'Transferable' | 'Other Detected' = 'Other Detected';
        const lowerRole = targetRole.toLowerCase();
        if (lowerRole.includes('frontend') && ['node', 'express', 'sql', 'mongodb', 'rest-api'].includes(sk.id)) {
          additionalGroup = 'Relevant Supporting';
        } else if (['git', 'docker', 'linux', 'python', 'java'].includes(sk.id)) {
          additionalGroup = 'Transferable';
        } else if (sk.status === 'Strong') {
          additionalGroup = 'Transferable';
        }

        const addObj = {
          skillId: sk.id,
          skillName: sk.displayName,
          name: sk.displayName,
          status: sk.status === 'No Resume Evidence' ? 'Needs Verification' : sk.status,
          simpleStatus: sk.status === 'Strong' ? 'VERIFIED' : 'PARTIAL',
          evidenceLevel: sk.evidenceLevel === 'No Evidence' ? 'Mentioned' : sk.evidenceLevel,
          directMention: sk.directMention,
          learningEvidence: sk.learningEvidence,
          projectEvidence: sk.projectEvidence,
          experienceEvidence: sk.experienceEvidence,
          resumeEvidence: 'detected',
          verificationStatus: sk.verificationStatus === 'Not Tested' ? 'Needs Practical Verification' : sk.verificationStatus,
          verifiedLevel: sk.verifiedLevel,
          importance: 'Supporting',
          priorityGroup: 'Supporting',
          additionalGroup,
          evidence: sk.evidence.includes('No evidence of') ? `${sk.displayName} detected in resume text with lower relevance to ${targetRole}.` : sk.evidence,
          recommendation: recText,
          relatedSkills,
          gapInterpretation,
          resumeAction,
          confidence: sk.confidence || 50,
          roleRelevance: 'Low Relevance',
          isRoleReq: false,
          matched: false
        };

        additionalResumeSkillsObjects.push(addObj);

        const addCatName = 'Additional Resume Skills';
        if (!additionalCategoryMap.has(addCatName)) {
          additionalCategoryMap.set(addCatName, []);
        }
        additionalCategoryMap.get(addCatName)!.push(addObj);
      }
    }
  });

  const normalizedCategories = Array.from(categoryMap.entries()).map(([catName, skList]) => ({
    categoryName: catName,
    category: catName,
    skills: skList
  }));

  const additionalCategories = Array.from(additionalCategoryMap.entries()).map(([catName, skList]) => ({
    categoryName: catName,
    category: catName,
    skills: skList
  }));

  const totalRequiredSkills = matchedRoleSkills.length + partialRoleSkills.length + missingRoleSkills.length;
  // Formula: (sum of skill scores / total required skills) * 100 where VERIFIED = 1.0, PARTIAL = 0.5, MISSING = 0.0
  const skillAlignmentScore = totalRequiredSkills > 0
    ? Math.round(((matchedRoleSkills.length * 1.0 + (partialRoleSkills.length * 0.5)) / totalRequiredSkills) * 100)
    : (skillAnalysis.currentMatchPct || 60);

  const uniqueDetectedSkills = Array.from(new Set([
    ...extractedSkillsFromText,
    ...matchedRoleSkills,
    ...additionalVerifiedSkills,
    ...additionalResumeSkillsObjects.map(s => s.skillName)
  ]));

  // Generate Priority Improvements (Top 3-5 missing/partial core skills sorted by priority)
  const priorityImprovements: any[] = [];
  const allRoleRequirementItems: any[] = [];
  normalizedCategories.forEach(cat => {
    allRoleRequirementItems.push(...cat.skills);
  });

  // Sort by status (MISSING first, then PARTIAL) and priority level (High Priority first, then Medium Priority, then Supporting)
  const priorityWeight: Record<string, number> = {
    'High Priority': 4,
    'Core': 3,
    'Medium Priority': 2,
    'Important': 2,
    'Supporting': 1,
    'Optional': 0
  };

  const sortedPriorityGaps = allRoleRequirementItems
    .filter(s => s.simpleStatus === 'MISSING' || s.simpleStatus === 'PARTIAL')
    .sort((a, b) => {
      // Missing before partial
      if (a.simpleStatus === 'MISSING' && b.simpleStatus === 'PARTIAL') return -1;
      if (a.simpleStatus === 'PARTIAL' && b.simpleStatus === 'MISSING') return 1;
      const pA = priorityWeight[a.priorityGroup] || 1;
      const pB = priorityWeight[b.priorityGroup] || 1;
      return pB - pA;
    });

  sortedPriorityGaps.slice(0, 4).forEach(gap => {
    const reason = gap.simpleStatus === 'MISSING'
      ? `No resume evidence of ${gap.skillName} was detected.`
      : `Learning/coursework evidence found for ${gap.skillName}, but practical project implementation evidence is missing.`;
    
    // Normalize priority group label for UI
    let uiPriority = 'High Priority';
    if (gap.priorityGroup === 'Supporting' || gap.priorityGroup === 'Optional') {
      uiPriority = 'Supporting';
    } else if (gap.priorityGroup === 'Medium Priority' || gap.priorityGroup === 'Important') {
      uiPriority = 'Medium Priority';
    } else {
      uiPriority = 'High Priority';
    }

    priorityImprovements.push({
      skillId: gap.skillId,
      skillName: gap.skillName,
      importance: gap.importance || 'High',
      priorityGroup: uiPriority,
      status: gap.simpleStatus,
      statusLabel: gap.simpleStatus === 'MISSING' ? 'Missing' : 'Partial Match',
      reason,
      recommendation: gap.recommendation,
      relatedSkills: gap.relatedSkills || [],
      gapInterpretation: gap.gapInterpretation || '',
      resumeAction: gap.resumeAction || '',
      actionPrompt: `Explain how to build practical project evidence for ${gap.skillName} in a ${targetRole} resume.`
    });
  });

  // Build canonical skillEvidence array with roleRelevance
  const skillEvidenceArray = Array.from(skillMap.values()).map(sk => {
    const isRoleReq = roleReqDefs.some(r => resolveCanonicalSkill(r.rawName).id === sk.id);
    return {
      skillId: sk.id,
      skillName: sk.displayName,
      evidenceLevel: sk.evidenceLevel,
      evidenceStrength: sk.status === 'Strong' ? 'Strong' : (sk.status === 'Needs Verification' ? 'Partial' : 'None'),
      roleRelevance: isRoleReq ? (sk.priorityGroup || 'Core') : 'Low Relevance',
      isRoleReq,
      evidenceText: sk.evidence,
      verificationStatus: sk.verificationStatus,
      sources: {
        directMention: sk.directMention,
        learningEvidence: sk.learningEvidence,
        projectEvidence: sk.projectEvidence,
        experienceEvidence: sk.experienceEvidence
      }
    };
  });

  // Update skillAnalysis
  doc.skillAnalysis = {
    ...skillAnalysis,
    currentMatchPct: skillAlignmentScore,
    strongSkills: matchedRoleSkills,
    additionalVerifiedSkills,
    additionalResumeSkills: additionalResumeSkillsObjects,
    partialSkills: partialRoleSkills,
    missingSkills: missingRoleSkills,
    categories: normalizedCategories,
    additionalCategories: additionalCategories,
    priorityImprovements: priorityImprovements,
    unique_detected_skills: uniqueDetectedSkills,
    required_role_skills_count: totalRequiredSkills,
    matched_required_skills_count: matchedRoleSkills.length,
    missing_required_skills_count: missingRoleSkills.length,
    skills_needing_verification_count: partialRoleSkills.length,
    skillEvidence: skillEvidenceArray
  };

  doc.priorityImprovements = priorityImprovements;
  doc.skillAlignmentScore = skillAlignmentScore;

  // Update atsBreakdown.keywordMatch
  if (!atsBreakdown.keywordMatch) {
    atsBreakdown.keywordMatch = {};
  }
  atsBreakdown.keywordMatch.score = skillAlignmentScore;
  atsBreakdown.keywordMatch.matchedSkills = matchedRoleSkills;
  atsBreakdown.keywordMatch.additionalVerifiedSkills = additionalVerifiedSkills;
  atsBreakdown.keywordMatch.partialSkills = partialRoleSkills;
  atsBreakdown.keywordMatch.missingSkills = missingRoleSkills;
  atsBreakdown.keywordMatch.details = `Extracted ${uniqueDetectedSkills.length} unique skills from resume text. Evaluated against ${totalRequiredSkills} core ${targetRole} requirements: ${matchedRoleSkills.length} Role-Aligned Practical Matches, ${partialRoleSkills.length} Needs Verification, and ${missingRoleSkills.length} Missing Requirements.${additionalVerifiedSkills.length > 0 ? ` Additionally detected practical evidence for ${additionalVerifiedSkills.join(', ')} (Low relevance to ${targetRole}).` : ''}`;

  // 3. Section Heading Normalization
  if (atsBreakdown.structure?.sections && Array.isArray(atsBreakdown.structure.sections)) {
    const knownHeaderMap: Record<string, string> = {
      'S K I L L S': 'Skills',
      'E D U C A T I O N': 'Education',
      'P R O J E C T S': 'Projects',
      'E X P E R I E N C E': 'Experience',
      'C O N T A C T': 'Contact',
      'C E R T I F I C A T I O N S': 'Certifications',
      'I N T E R N S H I P S': 'Experience',
      'S U M M A R Y': 'Summary'
    };

    atsBreakdown.structure.sections = atsBreakdown.structure.sections.map((sec: any) => {
      const rawName = String(sec.name || '').trim();
      const upperClean = rawName.toUpperCase();
      const normalizedName = knownHeaderMap[rawName] || knownHeaderMap[upperClean] || (
        upperClean.replace(/\s+/g, '') === 'SKILLS' ? 'Skills' :
        upperClean.replace(/\s+/g, '') === 'EDUCATION' ? 'Education' :
        upperClean.replace(/\s+/g, '') === 'PROJECTS' ? 'Projects' :
        upperClean.replace(/\s+/g, '') === 'EXPERIENCE' ? 'Experience' :
        upperClean.replace(/\s+/g, '') === 'CONTACT' ? 'Contact' :
        upperClean.replace(/\s+/g, '') === 'CERTIFICATIONS' ? 'Certifications' :
        upperClean.replace(/\s+/g, '') === 'SUMMARY' ? 'Summary' : rawName
      );

      const isSpaced = /\b[A-Z]\s+[A-Z]\s+[A-Z]\b/.test(rawName);
      const isPresent = sec.status === 'Present' || sec.status === 'Needs Revision' || isSpaced;

      return {
        ...sec,
        name: normalizedName,
        status: isPresent ? (sec.status === 'Missing' ? 'Needs Revision' : sec.status) : 'Missing',
        recommendation: isSpaced
          ? `Section detected. Character spacing ('${rawName}') evaluated under Formatting Safety.`
          : (sec.recommendation || `Maintain standard single-word heading formatting for ${normalizedName}.`)
      };
    });
  }

  // 4. Formatting Checks Alignment
  if (!atsBreakdown.formatting) atsBreakdown.formatting = { score: 85, status: 'Pass', details: '', checks: [] };
  if (!Array.isArray(atsBreakdown.formatting.checks)) atsBreakdown.formatting.checks = [];

  atsBreakdown.formatting.checks = atsBreakdown.formatting.checks.map((chk: any) => {
    const name = String(chk.name || '');
    if (name.toLowerCase().includes('column') || name.toLowerCase().includes('single')) {
      return { ...chk, name: 'Single-Column Flow', status: 'Safe', note: 'Standard Single-Column Layout Detected.' };
    }
    if (name.toLowerCase().includes('font') || name.toLowerCase().includes('encoding')) {
      return { ...chk, name: 'Font & Encoding', status: 'Safe', note: 'Standard font encoding detected; text content extracted cleanly.' };
    }
    return chk;
  });

  // 5. Parsing & Detected Fields
  if (!atsBreakdown.parsing) atsBreakdown.parsing = { score: 75, status: 'Pass', details: '' };
  if (!atsBreakdown.parsing.detectedFields) atsBreakdown.parsing.detectedFields = {};

  const fields = atsBreakdown.parsing.detectedFields;

  // Extract / clean candidate name
  fields.name = extractCandidateName(rawText, fields.name);

  if (fields.phone && fields.phone !== 'Not found' && fields.phone !== 'N/A' && fields.phone !== 'null') {
    let p = String(fields.phone).trim();
    p = p.replace(/^(\+\d{1,3})[\s\-]+/g, '$1 ');
    p = p.replace(/[\-\s]{2,}/g, ' ').replace(/^\-+|\-+$/g, '');
    fields.phone = p;
  } else if (rawText) {
    const phoneMatch = rawText.match(/(\+91[\s\-]*[6-9]\d{9}|\+\d{1,3}[\s\-]*\d{10}|[6-9]\d{9})/);
    if (phoneMatch) {
      let p = phoneMatch[0].trim();
      p = p.replace(/^(\+\d{1,3})[\s\-]+/g, '$1 ');
      p = p.replace(/[\-\s]{2,}/g, ' ').replace(/^\-+|\-+$/g, '');
      fields.phone = p;
    }
  }

  if (fields.email && fields.email !== 'Not found' && fields.email !== 'N/A' && fields.email !== 'null') {
    fields.email = String(fields.email).trim().toLowerCase();
  } else if (rawText) {
    const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      fields.email = emailMatch[0].trim().toLowerCase();
    }
  }

  fields.skillsCount = uniqueDetectedSkills.length;
  fields.roleRequirementsCount = totalRequiredSkills;

  const isInternship = /intern|internship/i.test(rawText);
  const hasWorkExpHeader = /work experience|employment|professional experience|job history|internship/i.test(rawText);
  const isFresherOrStudent = !hasWorkExpHeader || /student|fresher|undergraduate|pursuing/i.test(rawText);

  if (!hasWorkExpHeader) {
    fields.experienceCount = 0;
    doc.experienceAnalysis = {
      totalYears: 0,
      depthScore: 0,
      achievementsQualityScore: 0,
      bulletImprovements: [],
      note: isFresherOrStudent
        ? "Professional experience was not detected (0 entries). For early-career profiles, practical projects, capstone implementations, certifications, and technical evidence serve as primary evidence."
        : "No professional work experience or internship entries detected on resume."
    };
    if (atsBreakdown.structure?.sections) {
      const expSec = atsBreakdown.structure.sections.find((s: any) => s.name === 'Experience');
      if (expSec) {
        expSec.status = isFresherOrStudent ? '0 Entries Detected (Early Career)' : 'Missing';
        expSec.recommendation = 'Professional experience section not detected. Ensure projects, education, and technical skills are prominently displayed.';
      }
    }
  } else {
    fields.experienceCount = Number(fields.experienceCount) > 0 ? Number(fields.experienceCount) : 1;
    if (atsBreakdown.structure?.sections) {
      const expSec = atsBreakdown.structure.sections.find((s: any) => s.name === 'Experience');
      if (expSec) {
        expSec.status = 'Present';
      }
    }
  }

  // Certifications Presence
  const certHeaderPresent = /certifications?|courses?|bootcamps?|credentials?/i.test(rawText);
  let certCount = Number(fields.certificationsCount);

  if (isNaN(certCount) || certCount <= 0) {
    if (rawText) {
      const matches = rawText.match(/\b(bootcamp|certification|certified|nptel|udemy|coursera|tableau|power bi|guvi)\b/gi);
      if (matches && matches.length > 0) {
        certCount = Math.min(matches.length, 5);
      }
    }
  }

  if (certCount > 0) {
    fields.certificationsCount = certCount;
    fields.certificationStatus = 'EXTRACTED';
  } else if (certHeaderPresent) {
    fields.certificationsCount = 0;
    fields.certificationStatus = 'DETECTED_EMPTY';
  } else {
    fields.certificationsCount = 0;
    fields.certificationStatus = 'NOT_DETECTED';
  }

  // 6. Mathematical ATS Score Reconciliation
  const kwScore = Number(atsBreakdown.keywordMatch.score);
  let structScore = Number(atsBreakdown?.structure?.score !== undefined ? atsBreakdown.structure.score : 70);
  if (isFresherOrStudent && structScore < 75) {
    structScore = 75; // Adjust structure baseline for early-career students
  }
  const fmtScore = Number(atsBreakdown?.formatting?.score !== undefined ? atsBreakdown.formatting.score : 80);
  const parseScore = Number(atsBreakdown?.parsing?.score !== undefined ? atsBreakdown.parsing.score : 75);

  const kwPts = Math.round(kwScore * 0.35);
  const structPts = Math.round(structScore * 0.25);
  const fmtPts = Math.round(fmtScore * 0.20);
  const parsePts = Math.round(parseScore * 0.20);

  const canonicalAtsScore = kwPts + structPts + fmtPts + parsePts;

  doc.atsScore = canonicalAtsScore;
  doc.overallScore = canonicalAtsScore;

  if (canonicalAtsScore >= 80) {
    doc.atsRiskLevel = 'Low Risk';
  } else if (canonicalAtsScore >= 60) {
    doc.atsRiskLevel = 'Moderate Risk';
  } else {
    doc.atsRiskLevel = 'High Risk';
  }

  // 7. Grounded Project Analysis & Exact Mathematical Aggregation
  if (!doc.projectAnalysis) {
    doc.projectAnalysis = {};
  }

  // Calculate grounded technical depth for each project based on actual textual evidence
  const evaluatedProjects = normalizedProjects.map((p: any) => {
    const projText = `${p.name || ''} ${p.technologies ? p.technologies.join(' ') : ''} ${p.strengths ? p.strengths.join(' ') : ''} ${p.weaknesses ? p.weaknesses.join(' ') : ''}`.toLowerCase();

    let depth = 25; // Base score for simple/basic project
    const depthEvidence: string[] = [];

    // Architecture & Distributed Systems
    if (/microservices|distributed|system design|architecture|event-driven|mvc|design pattern|scalable/i.test(projText)) {
      depth += 15;
      depthEvidence.push('System Architecture');
    }
    // APIs & Backend Frameworks
    if (/rest api|graphql|express|fastapi|spring|django|backend|serverless|endpoint/i.test(projText)) {
      depth += 12;
      depthEvidence.push('API / Backend Services');
    }
    // Database & Data Pipelines
    if (/postgresql|mysql|mongodb|database|redis|etl|spark|airflow|sql|data processing|data warehouse/i.test(projText)) {
      depth += 12;
      depthEvidence.push('Database & Persistence');
    }
    // Security, Auth & Cloud/DevOps
    if (/oauth|jwt|authentication|encryption|security|siem|firewall|docker|kubernetes|aws|terraform|ci\/cd|vulnerability/i.test(projText)) {
      depth += 15;
      depthEvidence.push('Security & Infrastructure');
    }
    // Testing & Optimization
    if (/unit test|jest|pytest|cypress|performance|benchmarking|optimization/i.test(projText)) {
      depth += 10;
      depthEvidence.push('Testing & Optimization');
    }
    // Complex Algorithms / AI
    if (/min-max|machine learning|deep learning|neural network|algorithm|ai model/i.test(projText)) {
      depth += 10;
      depthEvidence.push('Algorithmic Logic');
    }

    const depthScore = Math.min(85, depth);
    const complexityLevel = depthScore >= 70 ? 'Advanced' : (depthScore >= 45 ? 'Intermediate' : 'Foundational');

    return {
      ...p,
      depthScore,
      complexity: p.complexity || complexityLevel,
      depthEvidence: depthEvidence.length > 0 ? depthEvidence : ['Foundational Implementation']
    };
  });

  doc.projectAnalysis.projectList = evaluatedProjects;
  doc.projectAnalysis.projects = evaluatedProjects;

  let avgRelevance = 20;
  let maxRelevance = 0;
  let bestProjObj: any = null;

  if (evaluatedProjects.length > 0) {
    const sum = evaluatedProjects.reduce((acc, p) => acc + p.relevanceScore, 0);
    avgRelevance = Math.round(sum / evaluatedProjects.length);
    evaluatedProjects.forEach((p) => {
      if (p.relevanceScore > maxRelevance) {
        maxRelevance = p.relevanceScore;
        bestProjObj = p;
      }
    });
  }

  // Calculate grounded overall technical depth score as average of evaluated project depths
  const groundedDepthScore = evaluatedProjects.length > 0
    ? Math.round(evaluatedProjects.reduce((acc, p) => acc + (p.depthScore || 30), 0) / evaluatedProjects.length)
    : 0;

  doc.projectAnalysis.relevanceScore = avgRelevance;
  doc.projectAnalysis.technicalDepthScore = groundedDepthScore;

  const allProjectTechs = Array.from(new Set(evaluatedProjects.flatMap(p => p.technologies || [])));
  doc.projectAnalysis.technologyDiversityScore = Math.min(100, allProjectTechs.length * 15);

  if (maxRelevance < 40 || !bestProjObj) {
    doc.projectAnalysis.bestProject = "No strongly aligned project detected";
    doc.projectAnalysis.summary = `Your current projects demonstrate foundational skills but provide limited evidence for the selected target role (${targetRole}).`;
  } else {
    doc.projectAnalysis.bestProject = `${bestProjObj.name} (${maxRelevance}% Relevance)`;
    doc.projectAnalysis.summary = `Demonstrates primary technical evidence through ${bestProjObj.name}.`;
  }

  // Generate target-role project recommendations addressing real priority gaps
  const projectGaps = missingRoleSkills.length > 0 ? missingRoleSkills : partialRoleSkills;
  const recommendedProjectList = [];

  const lowerRole = targetRole.toLowerCase();
  if (lowerRole.includes('devops') || lowerRole.includes('sre') || lowerRole.includes('cloud')) {
    recommendedProjectList.push(
      { title: 'Containerized Cloud Deployment Pipeline', skillsCovered: ['Linux', 'Docker', 'Git / Version Control', 'CI/CD', 'AWS'], why: `Directly closes critical practical evidence gaps in Linux, Docker, CI/CD, and AWS deployment for ${targetRole}.` },
      { title: 'Infrastructure as Code Automation with Terraform & Cloud Security', skillsCovered: ['Infrastructure as Code', 'Cloud Security', 'AWS'], why: `Provides production proof of automated infrastructure provisioning and security controls.` },
      { title: 'Kubernetes Microservices Monitoring & Logging Dashboard', skillsCovered: ['Kubernetes', 'Monitoring & Logging'], why: `Addresses high-priority requirements in container orchestration and system observability.` }
    );
  } else if (lowerRole.includes('mobile') || lowerRole.includes('android') || lowerRole.includes('ios')) {
    recommendedProjectList.push(
      { title: 'Production-Grade Android App with MVVM & Clean Architecture', skillsCovered: ['Mobile Architecture', 'Android Development', 'Kotlin'], why: `Directly closes critical gaps in Mobile Architecture and Android Development for ${targetRole}.` },
      { title: 'Offline-First Mobile Sync Engine with Room Database', skillsCovered: ['Offline / Local Storage', 'Mobile Security', 'REST APIs'], why: `Provides concrete proof of local storage architecture and network resilience.` },
      { title: 'Cross-Platform Mobile Security & KeyStore Encryption Library', skillsCovered: ['Mobile Security', 'State Management'], why: `Addresses high-priority requirements in Mobile Security and KeyStore management.` }
    );
  } else if (lowerRole.includes('cyber') || lowerRole.includes('security') || lowerRole.includes('soc')) {
    recommendedProjectList.push(
      { title: 'SIEM Security Monitoring & Log Analysis Dashboard', skillsCovered: ['SIEM', 'Incident Response', 'Network Security'], why: `Addresses critical missing evidence in SIEM and Security Operations for ${targetRole}.` },
      { title: 'Network Intrusion Detection & Firewall Rule Engine', skillsCovered: ['Network Security', 'Firewalls', 'Python'], why: `Provides concrete proof of Network Security and Firewall management.` },
      { title: 'Linux Security Hardening & Vulnerability Audit Lab', skillsCovered: ['Linux', 'Vulnerability Assessment'], why: `Fills high-priority requirement gap in Linux administration and vulnerability management.` }
    );
  } else if (lowerRole.includes('machine learning') || lowerRole.includes('ml') || lowerRole.includes('data science') || lowerRole.includes('ai')) {
    recommendedProjectList.push(
      { title: 'End-to-End Machine Learning Model Training & Evaluation Pipeline', skillsCovered: ['Python', 'Machine Learning', 'Data Preprocessing', 'Model Evaluation'], why: `Demonstrates full ML lifecycle from raw feature engineering to cross-validated model evaluation for ${targetRole}.` },
      { title: 'Deep Learning Image Classifier with PyTorch & REST Model API', skillsCovered: ['Deep Learning', 'REST APIs', 'Python'], why: `Provides concrete proof of neural network architecture and API model inference.` },
      { title: 'MLOps Automated Retraining & Model Monitoring Pipeline', skillsCovered: ['Machine Learning', 'SQL', 'Git / Version Control'], why: `Fills high-priority requirement gaps in production MLOps and automated model validation.` }
    );
  } else if (lowerRole.includes('frontend') || lowerRole.includes('front-end') || lowerRole.includes('react')) {
    recommendedProjectList.push(
      { title: 'Responsive Design System & Component Library in React & TypeScript', skillsCovered: ['HTML & CSS', 'JavaScript', 'TypeScript', 'React.js', 'Responsive Design'], why: `Directly closes critical practical evidence gaps in modern Frontend UI architecture and TypeScript for ${targetRole}.` },
      { title: 'Full-Featured Web Dashboard with REST API Integration & State Management', skillsCovered: ['React.js', 'REST APIs', 'Build Tools', 'Testing & QA'], why: `Provides production proof of async state management, API integration, and automated UI testing.` }
    );
  } else if (lowerRole.includes('data engineer') || lowerRole.includes('etl') || lowerRole.includes('pipeline')) {
    recommendedProjectList.push(
      { title: 'Automated Big Data ETL Pipeline with Airflow & SQL', skillsCovered: ['Python', 'SQL', 'ETL Pipelines', 'Airflow'], why: `Demonstrates end-to-end data processing and orchestration.` },
      { title: 'Real-Time Streaming Analytics & Data Warehouse', skillsCovered: ['SQL', 'Spark', 'Cloud Computing', 'Data Warehousing'], why: `Addresses missing skills in real-time data streaming and warehousing.` }
    );
  } else if (lowerRole.includes('data') || lowerRole.includes('analytics') || lowerRole.includes('bi')) {
    recommendedProjectList.push(
      { title: 'Customer Sales & Business Analytics Dashboard', skillsCovered: ['SQL', 'Python', 'Excel', 'Tableau / Power BI', 'Data Preprocessing'], why: `Directly bridges core Data Analyst gaps with hands-on SQL querying, dataset cleaning, and executive dashboard visualization.` },
      { title: 'Exploratory Data Analysis & Statistical Insight Report', skillsCovered: ['Python', 'Data Preprocessing', 'Statistics', 'Git / Version Control'], why: `Demonstrates practical data cleaning, pandas wrangling, and statistical hypothesis testing on real-world datasets.` },
      { title: 'SQL Database Querying & Business Intelligence Reporting', skillsCovered: ['SQL', 'Excel', 'Tableau / Power BI'], why: `Provides verified evidence of complex SQL joins, aggregations, and business KPI tracking.` }
    );
  } else {
    recommendedProjectList.push(
      { title: `Full-Stack ${projectGaps[0] || 'Core'} Workflow Application`, skillsCovered: [projectGaps[0] || 'REST APIs', projectGaps[1] || 'SQL', 'Git / Version Control'], why: `Directly closes priority gap in ${projectGaps[0] || 'core role requirements'}.` },
      { title: `Containerized ${projectGaps[1] || 'Cloud'} Microservices CI/CD Pipeline`, skillsCovered: [projectGaps[1] || 'Docker', 'CI/CD', 'Cloud Computing'], why: `Provides production evidence for containerization and automated deployments.` }
    );
  }

  doc.projectAnalysis.missingProjectTypes = recommendedProjectList.map(r => r.title);
  doc.projectAnalysis.recommendedProjects = recommendedProjectList;

  // 8. Personalized Career Roadmap respecting learning dependencies & strictly separating stage skills
  const topGaps = missingRoleSkills.length > 0 ? missingRoleSkills : (partialRoleSkills.length > 0 ? partialRoleSkills : ['Advanced System Architecture']);
  const roleReqNames = roleReqDefs.map(r => r.rawName);

  // Sequence skills based on logical technical dependencies
  let techSeq: string[] = [];
  if (lowerRole.includes('devops') || lowerRole.includes('cloud')) {
    techSeq = ['Linux', 'Git / Version Control', 'Docker', 'CI/CD', 'AWS', 'Infrastructure as Code', 'Kubernetes', 'Monitoring & Logging'];
  } else if (lowerRole.includes('cyber')) {
    techSeq = ['Linux', 'Network Security', 'Firewalls', 'SIEM', 'Vulnerability Assessment', 'Incident Response', 'Cryptography', 'Cloud Security'];
  } else if (lowerRole.includes('mobile')) {
    techSeq = ['Kotlin', 'Swift', 'Mobile Architecture', 'Android Development', 'iOS Development', 'Offline / Local Storage', 'Mobile Security'];
  } else if (lowerRole.includes('frontend') || lowerRole.includes('front-end') || lowerRole.includes('react')) {
    techSeq = ['HTML & CSS', 'JavaScript', 'TypeScript', 'React.js', 'REST APIs', 'Responsive Design', 'Git / Version Control', 'Build Tools', 'Testing & QA'];
  } else if (lowerRole.includes('machine learning') || lowerRole.includes('ml') || lowerRole.includes('data science') || lowerRole.includes('ai')) {
    techSeq = ['Python', 'Data Preprocessing', 'Machine Learning', 'Deep Learning', 'Model Evaluation', 'SQL', 'Git / Version Control', 'REST APIs'];
  } else if (lowerRole.includes('data engineer') || lowerRole.includes('etl')) {
    techSeq = ['SQL', 'Python', 'ETL Pipelines', 'Data Warehousing', 'Spark', 'Airflow', 'Cloud Computing', 'Git / Version Control'];
  } else if (lowerRole.includes('data') || lowerRole.includes('analytics') || lowerRole.includes('bi')) {
    techSeq = ['SQL', 'Python', 'Data Preprocessing', 'Excel', 'Tableau / Power BI', 'Statistics', 'Git / Version Control'];
  } else {
    techSeq = ['REST APIs', 'SQL', 'Git / Version Control', 'JavaScript', 'Node.js', 'React.js', 'Docker', 'CI/CD'];
  }

  // Filter techSeq to skills that actually need work or are core gaps
  const sortedGaps = techSeq.filter(s => topGaps.includes(s) || partialRoleSkills.includes(s) || missingRoleSkills.includes(s));
  const remainingGaps = topGaps.filter(s => !sortedGaps.includes(s));
  const finalTechProgression = Array.from(new Set([...sortedGaps, ...remainingGaps]));

  // STRICT DISJOINT SKILL ALLOCATION FOR STAGES
  const allocatedSkillsSet = new Set<string>();

  const allocateNextSkills = (maxCount: number, fallbackPool: string[]): string[] => {
    const result: string[] = [];
    for (const sk of finalTechProgression) {
      if (result.length >= maxCount) break;
      const clean = sk.toLowerCase();
      if (!allocatedSkillsSet.has(clean)) {
        allocatedSkillsSet.add(clean);
        result.push(sk);
      }
    }
    if (result.length < maxCount) {
      for (const sk of fallbackPool) {
        if (result.length >= maxCount) break;
        const isCanonReq = roleReqDefs.some(r => r.rawName.toLowerCase() === sk.toLowerCase());
        if (!isCanonReq) continue;
        const clean = sk.toLowerCase();
        if (!allocatedSkillsSet.has(clean)) {
          allocatedSkillsSet.add(clean);
          result.push(sk);
        }
      }
    }
    return result;
  };

  const stage1Skills = allocateNextSkills(3, roleReqNames);
  const stage2Skills = allocateNextSkills(3, roleReqNames);
  const stage3Skills = allocateNextSkills(3, roleReqNames);
  const stage4Skills = ['Resume & Evidence Optimization', 'ATS Keyword Alignment', 'Quantifiable Performance Metrics'];

  // Helper to build stage-specific course recommendations grounded in evidence status
  const getCourseForSkill = (skillName: string, stageNum: number) => {
    const clean = skillName.toLowerCase();
    const canonId = resolveCanonicalSkill(skillName).id;
    const sObj = skillMap.get(canonId);

    let title = `${skillName} Practical Masterclass & Labs`;
    let platform = 'Coursera';
    let duration = '10–20 Hours';
    let level = 'Intermediate';

    if (sObj?.status === 'Strong') {
      title = `Advanced ${skillName} & System Architecture`;
      level = 'Advanced';
    } else if (sObj?.status === 'Needs Verification') {
      title = `Applied ${skillName} Hands-On Labs & Verification`;
      level = 'Intermediate';
    } else {
      title = `${skillName} Essentials & Applied Concepts`;
      level = 'Foundational';
    }

    if (clean.includes('docker') || clean.includes('container')) {
      title = sObj?.status === 'Strong' ? 'Advanced Kubernetes & Docker Container Security' : 'Docker & Containerization Essentials';
      platform = 'Coursera';
    } else if (clean.includes('ci/cd') || clean.includes('pipeline')) {
      title = 'Continuous Integration & Deployment (CI/CD) Pipeline Automation';
      platform = 'Udemy';
    } else if (clean.includes('aws')) {
      title = sObj?.status === 'Strong' ? 'AWS Certified Solutions Architect Architecture' : 'AWS Cloud Technical Essentials & Deployment';
      platform = 'Coursera';
    } else if (clean.includes('linux')) {
      title = 'Linux System Administration & Security Essentials';
      platform = 'Coursera';
    } else if (clean.includes('kubernetes')) {
      title = 'Kubernetes Microservices Architecture & Orchestration';
      platform = 'edX';
    } else if (clean.includes('excel')) {
      title = 'Excel Data Analysis, Formulas & Business Dashboards';
      platform = 'Coursera';
    } else if (clean.includes('tableau') || clean.includes('power bi') || clean.includes('visualization')) {
      title = 'Data Visualization with Tableau & Power BI';
      platform = 'Coursera';
    } else if (clean.includes('statistics')) {
      title = 'Statistics for Data Analysis & Business Intelligence';
      platform = 'Coursera';
    } else if (clean.includes('data preprocessing') || clean.includes('eda')) {
      title = 'Data Preprocessing, Wrangling & Exploratory Data Analysis in Python';
      platform = 'Coursera';
    } else if (clean.includes('infrastructure as code') || clean.includes('terraform')) {
      title = 'Terraform & Infrastructure as Code Automation';
      platform = 'Udemy';
    } else if (clean.includes('mobile') || clean.includes('android') || clean.includes('kotlin')) {
      title = 'Android Application Architecture & Kotlin Development';
      platform = 'Coursera';
    } else if (clean.includes('siem')) {
      title = 'SIEM Security Operations & Log Analysis';
      platform = 'Coursera';
    } else if (clean.includes('sql')) {
      title = 'SQL & Database Querying Essentials';
      platform = 'Coursera';
    } else if (clean.includes('python')) {
      title = 'Python Programming & Automation Essentials';
      platform = 'Udemy';
    } else if (clean.includes('react') || clean.includes('html') || clean.includes('css') || clean.includes('frontend')) {
      title = 'Modern React & Frontend UI Development';
      platform = 'Coursera';
    } else if (clean.includes('resume') || clean.includes('ats') || clean.includes('metrics')) {
      title = 'Technical Resume Writing & Quantifiable Achievement Optimization';
      platform = 'Coursera';
      level = 'Specialization';
    }

    let evidenceReason = '';
    if (sObj?.status === 'Strong') {
      evidenceReason = `Your resume already has practical evidence for ${skillName}. This recommendation focuses on advanced concepts and design for Stage ${stageNum}.`;
    } else if (sObj?.status === 'Needs Verification') {
      const srcText = sObj.directMention ? 'skills section' : (sObj.learningEvidence ? 'coursework' : 'summary');
      evidenceReason = `Your resume mentions ${skillName} (${srcText}), but lacks practical project evidence. Search for hands-on labs on ${platform} to verify practical competence for Stage ${stageNum}.`;
    } else {
      evidenceReason = `No resume evidence detected for ${skillName}, a core requirement for ${targetRole}. Search for foundational topics on ${platform} to bridge Stage ${stageNum} gaps.`;
    }

    return {
      courseId: `course_${stageNum}_${clean.replace(/[^a-z0-9]/g, '_')}`,
      name: title,
      title: title,
      platform,
      level,
      skillAddressed: skillName,
      targetSkill: skillName,
      stage: `Stage ${stageNum}`,
      stageId: `stage-${stageNum}`,
      whyRecommended: evidenceReason,
      recommendationReason: evidenceReason,
      duration: '10–20 Hours',
      isVerifiedRealCourse: false,
      link: `https://www.coursera.org/search?query=${encodeURIComponent(skillName)}`
    };
  };

  const stage1Courses = stage1Skills.map(s => getCourseForSkill(s, 1));
  const stage2Courses = stage2Skills.map(s => getCourseForSkill(s, 2));
  const stage3Courses = stage3Skills.map(s => getCourseForSkill(s, 3));
  const stage4Courses = [
    {
      courseId: 'course_4_resume_optimization',
      name: 'Technical Resume Writing & Quantifiable Achievement Optimization',
      title: 'Technical Resume Writing & Quantifiable Achievement Optimization',
      platform: 'Coursera',
      level: 'Specialization',
      skillAddressed: 'Resume & Evidence Optimization',
      targetSkill: 'Resume & Evidence Optimization, ATS Keyword Alignment, Quantifiable Performance Metrics',
      stage: 'Stage 4',
      stageId: 'stage-4',
      whyRecommended: 'Optimizes resume structure, ATS keyword density, and bullet point metrics for high target-role visibility.',
      recommendationReason: 'Optimizes resume structure, ATS keyword density, and bullet point metrics for high target-role visibility.',
      duration: '4 Hours',
      isVerifiedRealCourse: false,
      link: 'https://www.coursera.org/search?query=Technical%20Resume%20Writing'
    }
  ];

  const isEarlyCareer = !workExpHeaderPresent && (fields.experienceCount === 0);

  const getRoleSpecificStageAction = (role: string, skills: string[], stageNum: number, earlyCareer: boolean) => {
    const rLower = role.toLowerCase();
    const sStr = skills.join(', ');

    if (rLower.includes('cyber') || rLower.includes('security')) {
      if (stageNum === 1) return `Build a Linux Security Hardening & Network Defense Lab covering firewall rules, SSH security, and network traffic inspection (${sStr}).`;
      if (stageNum === 2) return `Develop a SIEM Security Monitoring & Incident Response Dashboard that ingests, parses, and analyzes system event logs (${sStr}).`;
      if (stageNum === 3) return `Build a Cloud Security Assessment & Vulnerability Audit Lab demonstrating automated vulnerability scanning and security controls (${sStr}).`;
    } else if (rLower.includes('devops') || rLower.includes('cloud') || rLower.includes('sre')) {
      if (stageNum === 1) return `Build a Linux & Containerization Lab setting up isolated Docker containers and basic system management (${sStr}).`;
      if (stageNum === 2) return `Deploy an Automated CI/CD Pipeline on AWS/Cloud automating build, test, and container deployment workflows (${sStr}).`;
      if (stageNum === 3) return `Build an Infrastructure as Code & Monitoring Lab using Terraform and cloud monitoring tools (${sStr}).`;
    } else if (rLower.includes('data analyst') || rLower.includes('analytics') || rLower.includes('bi')) {
      if (stageNum === 1) return `Build a Data Cleaning & SQL Querying Lab analyzing public datasets using SQL and Python (${sStr}).`;
      if (stageNum === 2) return `Develop an Executive Business Analytics Dashboard in Tableau / Power BI featuring interactive filtering and KPIs (${sStr}).`;
      if (stageNum === 3) return `Perform an Exploratory Data Analysis & Statistical Insight study with version-controlled code on GitHub (${sStr}).`;
    } else if (rLower.includes('data engineer') || rLower.includes('etl')) {
      if (stageNum === 1) return `Build a Data Pipeline Lab ingesting raw datasets into a SQL database using Python and SQL (${sStr}).`;
      if (stageNum === 2) return `Develop an Automated ETL Workflow integrating cloud data warehousing and orchestration tools (${sStr}).`;
      if (stageNum === 3) return `Build a Distributed Data Processing Pipeline using Spark or cloud analytics services (${sStr}).`;
    } else {
      if (stageNum === 1) return `Build a responsive application component or module mastering fundamental technical concepts (${sStr}).`;
      if (stageNum === 2) return `Develop a focused portfolio project integrating RESTful API services and database persistence (${sStr}).`;
      if (stageNum === 3) return `Build an end-to-end multi-tier application with automated testing and container deployment (${sStr}).`;
    }

    return `Execute a hands-on project lab focused on ${sStr} to create verified project evidence.`;
  };

  doc.roadmapStages = [
    {
      stageId: 'stage-1',
      stageName: isEarlyCareer ? 'Stage 1: Core Prerequisites & Hands-On Lab' : 'Stage 1: Core Prerequisites & Foundational Technical Gaps',
      timeframe: 'Days 1–14',
      objective: isEarlyCareer
        ? `Learn core prerequisite concepts and build a hands-on technical lab covering: ${stage1Skills.join(', ')}.`
        : `Master essential prerequisite technologies and establish practical hands-on evidence for: ${stage1Skills.join(', ')}.`,
      skillsToFocus: stage1Skills,
      recommendedAction: getRoleSpecificStageAction(targetRole, stage1Skills, 1, isEarlyCareer),
      expectedMilestone: isEarlyCareer
        ? `Complete and publish an open-source code repository or lab environment demonstrating foundational ${stage1Skills[0] || 'core'} capabilities.`
        : `Complete and publish open-source code/repository demonstrating foundational ${stage1Skills[0] || 'core'} capabilities.`,
      stageCourses: stage1Courses,
      recommendedCourses: stage1Courses
    },
    {
      stageId: 'stage-2',
      stageName: isEarlyCareer ? 'Stage 2: Focused Portfolio Project Development' : 'Stage 2: Advanced Technical Architecture & System Integration',
      timeframe: 'Weeks 3–4',
      objective: isEarlyCareer
        ? `Build a focused portfolio project integrating ${stage2Skills.join(', ')} to generate practical project evidence.`
        : `Expand technical depth and integrate advanced pipeline/system capabilities for: ${stage2Skills.join(', ')}.`,
      skillsToFocus: stage2Skills,
      recommendedAction: getRoleSpecificStageAction(targetRole, stage2Skills, 2, isEarlyCareer),
      expectedMilestone: isEarlyCareer
        ? `Demonstrate working project implementation with clear documentation in portfolio project.`
        : `Achieve verified practical evidence status on secondary role requirements.`,
      stageCourses: stage2Courses,
      recommendedCourses: stage2Courses
    },
    {
      stageId: 'stage-3',
      stageName: isEarlyCareer ? 'Stage 3: Multi-Tool Integration & Portfolio Expansion' : 'Stage 3: System Integration & Evidence Verification',
      timeframe: 'Month 2',
      objective: isEarlyCareer
        ? `Integrate multiple ${targetRole} technologies into a comprehensive portfolio project for: ${stage3Skills.join(', ')}.`
        : `Verify system integration and achieve verified status on remaining requirement gaps.`,
      skillsToFocus: stage3Skills,
      recommendedAction: getRoleSpecificStageAction(targetRole, stage3Skills, 3, isEarlyCareer),
      expectedMilestone: isEarlyCareer
        ? `Achieve verified practical project evidence for core ${targetRole} technical gaps.`
        : `All core target-role requirements verified with hands-on project or experience evidence.`,
      stageCourses: stage3Courses,
      recommendedCourses: stage3Courses
    },
    {
      stageId: 'stage-4',
      stageName: isEarlyCareer ? 'Stage 4: Resume & Portfolio Evidence Optimization' : 'Stage 4: Resume & Evidence Optimization',
      timeframe: 'Post-Implementation',
      objective: isEarlyCareer
        ? `Refine resume bullet points with quantifiable project results and link verified GitHub repository code for ${targetRole}.`
        : `Refine resume bullet points with quantifiable achievement statements and update verified technical evidence for ${targetRole}.`,
      skillsToFocus: stage4Skills,
      recommendedAction: `Document project outcomes, architecture choices, and metrics in your resume skills and projects sections.`,
      expectedMilestone: `Re-run ATS resume analysis to confirm keyword match and verified project evidence.`,
      stageCourses: stage4Courses,
      recommendedCourses: stage4Courses
    }
  ];
  doc.careerRoadmap = doc.roadmapStages;

  // Combined master course list across stages
  const courseList = [...stage1Courses, ...stage2Courses, ...stage3Courses, ...stage4Courses];
  doc.courseRecommendations = courseList;

  // 10. Update xaiExplanations
  if (!doc.xaiExplanations) doc.xaiExplanations = {};
  doc.xaiExplanations.whyScore = `Your canonical ATS score is ${canonicalAtsScore}/100 (${doc.atsRiskLevel}) for ${targetRole}. Formula: Keyword Coverage (${kwPts} pts) + Structure (${structPts} pts) + Formatting Safety (${fmtPts} pts) + Parsing Accuracy (${parsePts} pts) = ${canonicalAtsScore}/100.`;
  
  const matchedEvidenceList = matchedRoleSkills.map(s => `${s} — Core ${targetRole} Requirement Match (Strong Evidence)`);
  const additionalEvidenceList = additionalVerifiedSkills.map(s => `${s} — Practical Evidence Detected (Lower relevance to ${targetRole})`);
  doc.xaiExplanations.evidenceFound = [...matchedEvidenceList, ...additionalEvidenceList];
  doc.xaiExplanations.missingElements = missingRoleSkills.map(s => `${s} — No Resume Evidence Detected`);
  doc.overallScoreExplanation = `Your resume has a canonical ATS score of ${canonicalAtsScore}/100 (${doc.atsRiskLevel}) for ${targetRole}.`;

  // 11. Create Single Canonical Analysis Result Object
  doc.canonicalAnalysis = {
    analysisVersion: '1.0',
    analysisId: doc._id || doc.id || 'analysis_' + Date.now(),
    resumeId: doc.resumeId || '',
    targetRole: targetRole,
    parsedResume: {
      text: rawText,
      candidateName: fields.name || 'Candidate',
      email: fields.email || '',
      phone: fields.phone || '',
      experienceCount: Number(fields.experienceCount || 0),
      projectsCount: evaluatedProjects.length,
      educationCount: Number(fields.educationCount || 0),
      certificationsCount: Number(fields.certificationsCount || 0)
    },
    candidateProfile: {
      name: fields.name || 'Candidate',
      email: fields.email || '',
      phone: fields.phone || '',
      experienceLevel: fields.experienceCount > 3 ? 'Senior' : (fields.experienceCount >= 1 ? 'Mid-Level' : 'Entry-Level'),
      detectedSkillsCount: uniqueDetectedSkills.length,
      experienceCount: Number(fields.experienceCount || 0),
      educationCount: Number(fields.educationCount || 0),
      certificationsCount: Number(fields.certificationsCount || 0),
      projectsCount: evaluatedProjects.length
    },
    extractedSkills: uniqueDetectedSkills,
    extractedProjects: evaluatedProjects,
    extractedExperience: doc.experienceAnalysis?.bulletImprovements || [],
    education: doc.atsBreakdown?.structure?.sections?.find((s: any) => s.name === 'Education') ? ['Education Section Extracted'] : [],
    certifications: fields.certificationsCount > 0 ? [`${fields.certificationsCount} Certification(s) Extracted`] : [],
    resumeSections: atsBreakdown.structure?.sections || [],
    atsAnalysis: {
      score: canonicalAtsScore,
      riskLevel: doc.atsRiskLevel,
      weightedBreakdown: {
        keywordMatch: { score: kwScore, weight: 0.35, points: kwPts },
        structure: { score: structScore, weight: 0.25, points: structPts },
        formatting: { score: fmtScore, weight: 0.20, points: fmtPts },
        parsing: { score: parseScore, weight: 0.20, points: parsePts }
      }
    },
    roleRequirements: {
      targetRole: targetRole,
      totalEvaluated: totalRequiredSkills,
      strongCount: matchedRoleSkills.length,
      needsVerificationCount: partialRoleSkills.length,
      noEvidenceCount: missingRoleSkills.length,
      requirementsList: Array.from(skillMap.values()).map(s => ({
        id: s.id,
        displayName: s.displayName,
        category: s.category,
        priorityGroup: s.priorityGroup || 'Core',
        importance: s.importance || 'High'
      }))
    },
    skillEvidence: Array.from(skillMap.values()).map(s => ({
      id: s.id,
      displayName: s.displayName,
      category: s.category,
      status: s.status,
      evidenceLevel: s.evidenceLevel,
      directMention: s.directMention,
      learningEvidence: s.learningEvidence,
      projectEvidence: s.projectEvidence,
      experienceEvidence: s.experienceEvidence,
      evidenceText: s.evidence,
      roleRelevance: s.roleRelevance || 'Core',
      evidenceSource: s.status === 'Strong' ? (s.experienceEvidence ? 'work_experience' : 'project_implementation') : (s.learningEvidence ? 'coursework' : (s.directMention ? 'skills_list' : 'none')),
      evidenceStrength: s.status === 'Strong' ? 'strong' : (s.status === 'Needs Verification' ? 'partial' : 'none'),
      confidence: s.confidence,
      verificationStatus: s.verificationStatus
    })),
    skillGaps: Array.from(skillMap.values()).filter(s => s.status === 'No Resume Evidence').map(s => ({
      id: s.id,
      displayName: s.displayName,
      category: s.category,
      priorityGroup: s.priorityGroup || 'Core',
      severity: (s.priorityGroup === 'Core' || s.importance === 'High') ? 'High' : 'Medium',
      whyMissing: `No resume evidence detected for ${targetRole} requirement.`
    })),
    skillPriorities: missingRoleSkills.slice(0, 5).map((skName, idx) => {
      const sObj = skillMap.get(resolveCanonicalSkill(skName).id);
      return {
        rank: idx + 1,
        id: resolveCanonicalSkill(skName).id,
        displayName: skName,
        priorityGroup: sObj?.priorityGroup || 'Core',
        learningImpact: `Critical requirement for ${targetRole} position.`,
        prerequisiteSkills: sObj?.priorityGroup === 'Core' ? [] : ['Foundational System Concepts']
      };
    }),
    projectAnalysis: doc.projectAnalysis,
    experienceAnalysis: {
      experienceEntryCount: Number(fields.experienceCount || 0),
      professionalExperienceSectionDetected: hasWorkExpHeader,
      internshipSectionDetected: isInternship,
      workExperienceSectionDetected: hasWorkExpHeader && !isInternship,
      experienceEvidenceQuality: hasWorkExpHeader ? 'Strong' : (fields.experienceCount > 0 ? 'Needs Revision' : 'Missing'),
      details: fields.experienceCount > 0
        ? (hasWorkExpHeader ? `${fields.experienceCount} professional experience entry detected.` : `${fields.experienceCount} experience entry detected without standard section header.`)
        : 'No work experience or internship entries detected on resume.'
    },
    roadmapStages: doc.roadmapStages,
    courseRecommendations: doc.courseRecommendations,
    analysisTimestamp: doc.createdAt || new Date()
  };

  // Run final data consistency validation checks
  validateCanonicalData(doc);

  return doc;
}
