// Suppress benign Vite WebSocket HMR errors in iframe preview
window.addEventListener('unhandledrejection', (event) => {
  const reasonStr = String(event.reason?.message || event.reason || '');
  if (reasonStr.includes('WebSocket') || reasonStr.includes('vite')) {
    event.preventDefault();
  }
});

/**
 * API Fetch Helper Module
 */
const API = {
  getToken() {
    return localStorage.getItem('ci_token');
  },

  setToken(token) {
    if (token) localStorage.setItem('ci_token', token);
    else localStorage.removeItem('ci_token');
  },

  getUser() {
    const raw = localStorage.getItem('ci_user');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  setUser(user) {
    if (user) localStorage.setItem('ci_user', JSON.stringify(user));
    else localStorage.removeItem('ci_user');
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      ...(options.headers || {})
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(endpoint, config);
      const contentType = response.headers.get('content-type') || '';
      let data = {};

      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (e) {
          data = { error: 'Invalid JSON response from server' };
        }
      } else {
        const text = await response.text();
        if (!response.ok) {
          data = { error: text || `HTTP ${response.status} error` };
        } else {
          data = { text };
        }
      }

      if (!response.ok) {
        if (response.status === 401 && !endpoint.includes('/login')) {
          this.setToken(null);
          this.setUser(null);
          if (!window.location.pathname.endsWith('login.html') && !window.location.pathname.endsWith('signup.html') && window.location.pathname !== '/') {
            window.location.href = '/login.html';
          }
        }
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (err) {
      console.warn(`API response status on [${endpoint}]:`, err.message || err);
      throw err;
    }
  },

  showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};
