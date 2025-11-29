document.addEventListener('DOMContentLoaded', function() {
    const App = {
        user: null,
        charts: {},
        timer: { interval: null, seconds: 1500 },

        DBStub: {
            users: [
                { id: 1, name: 'Admin', email: 'admin@test.com', password: 'password', role: 'ADMIN' },
                { id: 2, name: 'User', email: 'user@test.com', password: 'password', role: 'USER' },
            ]
        },

        init() {
            const userData = sessionStorage.getItem('user');
            if (userData) this.user = JSON.parse(userData);

            this.initEventListeners();
            this.updateUIForAuthState();
            this.renderPage(); 
        },
        
        initEventListeners() {
            window.addEventListener('hashchange', () => this.renderPage());
            document.getElementById('login-btn').addEventListener('click', () => this.showAuthModal());
            document.querySelector('.close-modal').addEventListener('click', () => this.hideAuthModal());
            document.getElementById('logout-btn').addEventListener('click', () => this.logout());

            document.getElementById('login-form').addEventListener('submit', e => {
                e.preventDefault();
                this.login(e.target.elements[0].value, e.target.elements[1].value);
            });
            
            // Timer controls
            const timerControls = document.querySelector('.timer-controls');
            if(timerControls){
                timerControls.addEventListener('click', e => {
                    if(e.target.classList.contains('start')) this.startTimer();
                    if(e.target.classList.contains('pause')) this.pauseTimer();
                    if(e.target.classList.contains('stop')) this.stopTimer();
                });
            }
        },

        renderPage() {
            const hash = location.hash || '#dashboard';
            if (hash === '#adminpanel' && (!this.user || this.user.role !== 'ADMIN')) {
                alert('Access Denied.');
                location.hash = '#dashboard';
                return;
            }

            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            const activeSection = document.querySelector(hash);
            if (activeSection) activeSection.classList.add('active');

            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
            if(activeLink) activeLink.classList.add('active');
            
            document.getElementById('main-title').textContent = activeLink ? activeLink.textContent : 'Dashboard';
            this.drawCharts(hash);
        },

        startTimer() {
            if (this.timer.interval) return;
            this.timer.interval = setInterval(() => {
                this.timer.seconds--;
                this.updateTimerDisplay();
            }, 1000);
        },
        pauseTimer() { clearInterval(this.timer.interval); this.timer.interval = null; },
        stopTimer() { this.pauseTimer(); this.timer.seconds = 1500; this.updateTimerDisplay(); },
        updateTimerDisplay(){
            const display = document.querySelector('.timer-display');
            if(!display) return;
            const mins = Math.floor(this.timer.seconds / 60);
            const secs = this.timer.seconds % 60;
            display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },

        login(email, password) {
            const foundUser = this.DBStub.users.find(u => u.email === email && u.password === password);
            if (foundUser) {
                this.user = foundUser;
                sessionStorage.setItem('user', JSON.stringify(this.user));
                this.updateUIForAuthState();
                this.hideAuthModal();
                location.hash = '#dashboard';
            } else {
                document.getElementById('auth-error').textContent = 'Invalid credentials.';
            }
        },
        logout() {
            this.user = null;
            sessionStorage.removeItem('user');
            this.updateUIForAuthState();
            location.hash = '#dashboard';
        },
        updateUIForAuthState() {
            const isLoggedIn = !!this.user;
            document.getElementById('login-btn').hidden = isLoggedIn;
            document.getElementById('user-profile').hidden = !isLoggedIn;
            if (isLoggedIn) {
                document.getElementById('profile-avatar').textContent = this.user.name.charAt(0);
            }
            document.getElementById('admin-link').hidden = !isLoggedIn || this.user.role !== 'ADMIN';
        },
        showAuthModal() { document.getElementById('auth-modal').classList.add('active'); document.getElementById('auth-error').textContent = ''; },
        hideAuthModal() { document.getElementById('auth-modal').classList.remove('active'); },

        drawCharts(page) {
            // Chart drawing logic remains the same
        }
    };

    App.init();
});
