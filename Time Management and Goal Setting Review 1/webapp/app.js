document.addEventListener('DOMContentLoaded', () => {
    const App = {
        user: null,
        charts: {},
        timer: { interval: null, seconds: 1500, running: false },

        init() {
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
                this.user = JSON.parse(storedUser);
            }
            this.initEventListeners();
            this.updateUIForAuthState();
            this.handleHashChange();
        },

        initEventListeners() {
            window.addEventListener('hashchange', this.handleHashChange.bind(this));
            document.getElementById('login-btn').addEventListener('click', () => this.showAuthModal());
            document.querySelector('.close-modal').addEventListener('click', () => this.hideAuthModal());
            document.getElementById('logout-btn').addEventListener('click', this.logout.bind(this));

            const authTabs = document.querySelector('.auth-tabs');
            authTabs.addEventListener('click', (e) => {
                if (e.target.matches('.auth-tab-btn')) {
                    this.switchAuthTab(e.target.id === 'signup-tab' ? 'signup' : 'login');
                }
            });
            authTabs.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    const currentTab = document.activeElement;
                    const isLoginTab = currentTab.id === 'login-tab';
                    const nextTab = isLoginTab ? document.getElementById('signup-tab') : document.getElementById('login-tab');
                    nextTab.focus();
                    this.switchAuthTab(nextTab.id === 'signup-tab' ? 'signup' : 'login');
                }
            });

            document.getElementById('login-form').addEventListener('submit', this.handleLogin.bind(this));
            document.getElementById('signup-form').addEventListener('submit', this.handleSignup.bind(this));
        },

        handleHashChange() {
            let hash = window.location.hash || '#timetracking';
            if (hash === '#adminpanel' && (!this.user || this.user.role !== 'ADMIN')) {
                hash = '#timetracking';
                window.location.hash = hash;
            }
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
                section.setAttribute('aria-hidden', 'true');
            });
            const activeSection = document.querySelector(hash) || document.getElementById('timetracking');
            activeSection.classList.add('active');
            activeSection.removeAttribute('aria-hidden');

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });

            const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
            document.getElementById('main-title').textContent = activeLink ? activeLink.textContent : 'Time Tracking';
            this.drawCharts(hash.substring(1));
        },

        showAuthModal() {
            const modal = document.getElementById('auth-modal');
            modal.style.display = 'flex';
            modal.removeAttribute('aria-hidden');
            this.switchAuthTab('login');
            this.trapFocus(modal);
        },

        hideAuthModal() {
            const modal = document.getElementById('auth-modal');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            this.releaseFocus();
        },

        switchAuthTab(tab) {
            const isLogin = tab === 'login';
            document.getElementById('login-tab').classList.toggle('active', isLogin);
            document.getElementById('login-tab').setAttribute('aria-selected', isLogin);
            document.getElementById('signup-tab').classList.toggle('active', !isLogin);
            document.getElementById('signup-tab').setAttribute('aria-selected', !isLogin);
            document.getElementById('login-view').hidden = !isLogin;
            document.getElementById('signup-view').hidden = isLogin;
            document.getElementById('auth-error').textContent = '';
        },

        async handleLogin(e) {
            e.preventDefault();
            const email = e.target.elements[0].value;
            const password = e.target.elements[1].value;
            const authError = document.getElementById('auth-error');
            authError.textContent = '';

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }

                this.user = data.user;
                sessionStorage.setItem('user', JSON.stringify(data.user));
                // sessionStorage.setItem('token', data.token); // Optional: store JWT token

                this.updateUIForAuthState();
                this.hideAuthModal();
                window.location.hash = '#dashboard';
            } catch (error) {
                authError.textContent = error.message;
            }
        },

        async handleSignup(e) {
            e.preventDefault();
            const name = e.target.elements[0].value;
            const email = e.target.elements[1].value;
            const password = e.target.elements[2].value;
            const authError = document.getElementById('auth-error');
            authError.textContent = '';

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Signup failed');
                }

                // Show success message and switch to login tab
                alert('Signup successful! Please login.');
                this.switchAuthTab('login');

            } catch (error) {
                authError.textContent = error.message;
            }
        },

        logout() {
            this.user = null;
            sessionStorage.clear(); // Clear all session data
            this.updateUIForAuthState();
            window.location.hash = '#timetracking';
        },

        updateUIForAuthState() {
            const isLoggedIn = !!this.user;
            document.getElementById('login-btn').hidden = isLoggedIn;
            document.getElementById('user-profile').hidden = !isLoggedIn;
            const isAdmin = isLoggedIn && this.user.role === 'ADMIN';
            document.getElementById('admin-link').hidden = !isAdmin;

            if (isLoggedIn) {
                document.getElementById('profile-avatar').textContent = this.user.name.charAt(0).toUpperCase();
            }
            if (!isAdmin && window.location.hash === '#adminpanel') {
                this.handleHashChange();
            }
        },

        trapFocus(modal) {
            this.focusableElements = Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
            this.firstFocusable = this.focusableElements[0];
            this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
            this.firstFocusable.focus();

            this.focusTrapHandler = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === this.firstFocusable) {
                        e.preventDefault();
                        this.lastFocusable.focus();
                    } else if (!e.shiftKey && document.activeElement === this.lastFocusable) {
                        e.preventDefault();
                        this.firstFocusable.focus();
                    }
                }
            };
            modal.addEventListener('keydown', this.focusTrapHandler);
        },

        releaseFocus() {
            if (this.focusTrapHandler) {
                document.getElementById('auth-modal').removeEventListener('keydown', this.focusTrapHandler);
                document.getElementById('login-btn').focus();
            }
        },

        drawCharts(page) {
            if (page === 'analytics' && !this.charts.analytics) {
                const ctx = document.getElementById('analytics-activity-chart')?.getContext('2d');
                if (ctx) {
                    this.charts.analytics = new Chart(ctx, { type: 'line', data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ label: 'User Activity', data: [120, 150, 180, 160, 200, 190, 220], borderColor: 'var(--primary-color)', tension: 0.3 }] } });
                }
            }
        },
    };

    App.init();
});
