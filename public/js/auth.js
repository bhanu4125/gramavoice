const API_BASE = 'http://localhost:5000/api/auth';

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        
        // Update buttons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tab}-tab`).classList.add('active');
    });
});

// Form toggle for Citizen
document.getElementById('show-citizen-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('citizen-login-form').style.display = 'none';
    document.getElementById('citizen-register-form').style.display = 'block';
});

document.getElementById('show-citizen-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('citizen-register-form').style.display = 'none';
    document.getElementById('citizen-login-form').style.display = 'block';
});

// Form toggle for Government
document.getElementById('show-gov-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('government-login-form').style.display = 'none';
    document.getElementById('government-register-form').style.display = 'block';
});

document.getElementById('show-gov-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('government-register-form').style.display = 'none';
    document.getElementById('government-login-form').style.display = 'block';
});

// Citizen Login
document.getElementById('citizen-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('citizen-email').value;
    const password = document.getElementById('citizen-password').value;
    
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/citizen-dashboard';
        } else {
            showAlert(data.error || 'Login failed', 'error');
        }
    } catch (error) {
        showAlert('Network error. Please try again.', 'error');
    }
});

// Citizen Register
document.getElementById('citizen-register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('citizen-name').value;
    const email = document.getElementById('citizen-register-email').value;
    const password = document.getElementById('citizen-register-password').value;
    const village = document.getElementById('citizen-village').value;
    
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, village, role: 'citizen' })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/citizen-dashboard';
        } else {
            showAlert(data.error || 'Registration failed', 'error');
        }
    } catch (error) {
        showAlert('Network error. Please try again.', 'error');
    }
});

// Government Login
document.getElementById('government-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('gov-email').value;
    const password = document.getElementById('gov-password').value;
    
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            if (data.user.role === 'government') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/gov-dashboard';
            } else {
                showAlert('Access denied. Government officials only.', 'error');
            }
        } else {
            showAlert(data.error || 'Login failed', 'error');
        }
    } catch (error) {
        showAlert('Network error. Please try again.', 'error');
    }
});

// Government Register
document.getElementById('government-register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('gov-name').value;
    const email = document.getElementById('gov-register-email').value;
    const password = document.getElementById('gov-register-password').value;
    const village = document.getElementById('gov-village').value;
    
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, village, role: 'government' })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/gov-dashboard';
        } else {
            showAlert(data.error || 'Registration failed', 'error');
        }
    } catch (error) {
        showAlert('Network error. Please try again.', 'error');
    }
});

function showAlert(message, type) {
    const alert = document.getElementById('alert-message');
    alert.textContent = message;
    alert.className = `alert ${type} show`;
    
    setTimeout(() => {
        alert.classList.remove('show');
    }, 3000);
}

