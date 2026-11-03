/**
 * Auth Module
 */
const Auth = {
  isLoggedIn() {
    return !!API.getToken();
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/login.html';
    }
  },

  async login(email, password) {
    try {
      const data = await API.request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      API.setToken(data.token);
      API.setUser(data.user);
      localStorage.setItem('ci_is_login', 'true');
      API.showToast('Login successful! Redirecting...', 'success');
      
      setTimeout(() => {
        window.location.href = '/career-hub.html';
      }, 500);

      return data;
    } catch (err) {
      API.showToast(err.message || 'Login failed', 'error');
      throw err;
    }
  },

  async register(name, email, password, profileRole) {
    try {
      const data = await API.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, profileRole })
      });

      API.setToken(data.token);
      API.setUser(data.user);
      localStorage.setItem('ci_is_login', 'false');
      API.showToast('Account created successfully!', 'success');

      setTimeout(() => {
        window.location.href = '/career-hub.html';
      }, 500);

      return data;
    } catch (err) {
      API.showToast(err.message || 'Registration failed', 'error');
      throw err;
    }
  },

  logout() {
    API.setToken(null);
    API.setUser(null);
    localStorage.clear();
    API.showToast('Logged out');
    setTimeout(() => {
      window.location.href = '/login.html';
    }, 300);
  },

  async purgeAll() {
    try {
      await API.request('/api/auth/purge-all', { method: 'POST' });
    } catch (e) {
      console.warn('Backend purge warning:', e);
    }
    API.setToken(null);
    API.setUser(null);
    localStorage.clear();
    sessionStorage.clear();
    API.showToast('All accounts and local storage data removed', 'info');
    setTimeout(() => {
      window.location.href = '/login.html';
    }, 500);
  }
};
