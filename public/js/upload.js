/**
 * Upload Page Controller
 */
const getIcon = (name, extra = '') => window.Icons ? Icons.get(name, extra) : '';

document.addEventListener('DOMContentLoaded', () => {
  Auth.requireAuth();

  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const previewBox = document.getElementById('file-preview-box');
  const filenameEl = document.getElementById('preview-filename');
  const filesizeEl = document.getElementById('preview-filesize');
  const removeBtn = document.getElementById('remove-file-btn');
  const pasteInput = document.getElementById('paste-text-input');
  const roleSelect = document.getElementById('target-role-select');
  const customRoleInput = document.getElementById('custom-role-input');
  const startBtn = document.getElementById('start-analysis-btn');
  const processingModal = document.getElementById('processing-modal');

  const dropIcon = document.getElementById('drop-icon'); if (dropIcon) dropIcon.innerHTML = getIcon('upload', 'w-12 h-12 text-purple-600');
  const prevIcon = document.getElementById('preview-file-icon'); if (prevIcon) prevIcon.innerHTML = getIcon('file-text', 'w-6 h-6 text-purple-600');
  const btnIcon = document.getElementById('start-btn-icon'); if (btnIcon) btnIcon.innerHTML = getIcon('sparkles', 'w-5 h-5');

  let selectedFile = null;

  // Custom role toggle
  roleSelect.addEventListener('change', () => {
    if (roleSelect.value === 'CUSTOM') {
      customRoleInput.style.display = 'block';
      customRoleInput.focus();
    } else {
      customRoleInput.style.display = 'none';
    }
  });

  // Click dropzone to trigger file input
  if (dropzone) {
    dropzone.addEventListener('click', (e) => {
      const targetTag = (e.target.tagName || '').toUpperCase();
      if (targetTag !== 'BUTTON' && targetTag !== 'INPUT' && !e.target.closest('button')) {
        fileInput.click();
      }
    });
  }

  // Drag over handlers
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelection(files[0]);
  });

  fileInput.addEventListener('change', (e) => {
    if (fileInput.files.length > 0) handleFileSelection(fileInput.files[0]);
  });

  function handleFileSelection(file) {
    selectedFile = file;
    filenameEl.textContent = file.name;
    filesizeEl.textContent = `${(file.size / (1024 * 1024) >= 1) ? (file.size / (1024 * 1024)).toFixed(2) + ' MB' : (file.size / 1024).toFixed(1) + ' KB'}`;
    previewBox.style.display = 'block';
    dropzone.style.display = 'none';
    pasteInput.value = '';
  }

  removeBtn.addEventListener('click', () => {
    selectedFile = null;
    fileInput.value = '';
    previewBox.style.display = 'none';
    dropzone.style.display = 'block';
  });

  // Start Analysis Handler
  startBtn.addEventListener('click', async () => {
    let targetRole = roleSelect.value;
    if (targetRole === 'CUSTOM') {
      targetRole = customRoleInput.value.trim();
    }

    if (!targetRole) {
      API.showToast('Please specify a target role for this analysis.', 'error');
      return;
    }

    const pastedText = pasteInput.value.trim();
    if (!selectedFile && !pastedText) {
      API.showToast('Please upload a resume file or paste resume text.', 'error');
      return;
    }

    // Open Processing Modal
    processingModal.classList.add('active');
    const stepController = animateProcessingSteps();

    try {
      let uploadedResumeId = null;

      // Upload resume file if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append('resumeFile', selectedFile);
        const resData = await API.request('/api/resumes/upload', {
          method: 'POST',
          body: formData
        });
        if (resData && resData.resume) {
          uploadedResumeId = resData.resume.id || resData.resume._id;
        }
      }

      // Generate Analysis
      const analysisPayload = {
        targetRole,
        ...(uploadedResumeId ? { resumeId: uploadedResumeId } : { resumeText: pastedText })
      };

      const analysisRes = await API.request('/api/analyses', {
        method: 'POST',
        body: JSON.stringify(analysisPayload)
      });

      const analysis = analysisRes.analysis;
      localStorage.setItem('ci_active_analysis_id', analysis._id || analysis.id);

      // Ensure all processing steps (including step 6) are marked done with checkmarks
      stepController.completeAll();

      API.showToast('Analysis completed successfully!', 'success');

      setTimeout(() => {
        window.location.href = '/ats.html';
      }, 1000);

    } catch (err) {
      stepController.cancel();
      processingModal.classList.remove('active');
      API.showToast(err.message || 'Analysis failed. Please try again.', 'error');
    }
  });

  function animateProcessingSteps() {
    const timeouts = [];
    const steps = [
      { id: 'step-1', delay: 300 },
      { id: 'step-2', delay: 1100 },
      { id: 'step-3', delay: 2000 },
      { id: 'step-4', delay: 2900 },
      { id: 'step-5', delay: 3800 },
      { id: 'step-6', delay: 4700 }
    ];

    steps.forEach((stepObj, idx) => {
      const t = setTimeout(() => {
        const el = document.getElementById(stepObj.id);
        if (el) {
          el.className = 'processing-step active';
          const cleanText = el.innerText.replace(/[✓●○]/g, '').trim();
          el.innerHTML = `${getIcon('zap', 'w-4 h-4 text-purple-600')} <span>${cleanText}</span>`;
          if (idx > 0) {
            const prevEl = document.getElementById(steps[idx - 1].id);
            if (prevEl) {
              prevEl.className = 'processing-step done';
              const prevText = prevEl.innerText.replace(/[✓●○]/g, '').trim();
              prevEl.innerHTML = `${getIcon('check-circle', 'w-4 h-4 text-emerald-600')} <span>${prevText}</span>`;
            }
          }
        }
      }, stepObj.delay);
      timeouts.push(t);
    });

    // Mark step-6 done as well after 5600ms if analysis is still running
    const finalT = setTimeout(() => {
      const lastEl = document.getElementById('step-6');
      if (lastEl) {
        lastEl.className = 'processing-step done';
        const cleanText = lastEl.innerText.replace(/[✓●○]/g, '').trim();
        lastEl.innerHTML = `${getIcon('check-circle', 'w-4 h-4 text-emerald-600')} <span>${cleanText}</span>`;
      }
    }, 5600);
    timeouts.push(finalT);

    return {
      cancel: () => {
        timeouts.forEach(t => clearTimeout(t));
      },
      completeAll: () => {
        timeouts.forEach(t => clearTimeout(t));
        steps.forEach(s => {
          const el = document.getElementById(s.id);
          if (el) {
            el.className = 'processing-step done';
            const cleanText = el.innerText.replace(/[✓●○]/g, '').trim();
            el.innerHTML = `${getIcon('check-circle', 'w-4 h-4 text-emerald-600')} <span>${cleanText}</span>`;
          }
        });
      }
    };
  }
});
