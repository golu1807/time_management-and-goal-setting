const DBStub = {
    async get(endpoint) { return []; },
    async post(endpoint, data) { return data; }
};

const Api = {
    async get(endpoint) { return fetch(`http://localhost:8080/api${endpoint}`).then(res => res.json()); },
    async post(endpoint, data) { return fetch(`http://localhost:8080/api${endpoint}`, { method: 'POST', body: JSON.stringify(data) }).then(res => res.json()); }
};

const App = {
    // Main app logic will go here
    async init() {
        console.log('App initialized');
    }
};

App.init();
