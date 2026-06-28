const API_BASE = '/api/gov';
const socket = io();
let currentUser = null;
let currentIssueId = null;

// Check authentication and setup
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
        window.location.href = '/';
        return;
    }
    
    currentUser = JSON.parse(user);
    
    if (currentUser.role !== 'government') {
        window.location.href = '/';
        return;
    }
    
    document.getElementById('user-name').textContent = currentUser.name;
    
    // Setup Socket.IO
    socket.emit('join-officials');
    
    socket.on('new-issue', (data) => {
        showNotification(`New issue reported: ${data.title} in ${data.village}`);
        loadGovIssues();
        loadStats();
    });
    
    // Load initial data
    loadStats();
    loadGovIssues();
    loadLocations();
});

// Section switching
function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
    
    if (section === 'dashboard') {
        document.getElementById('dashboard-section').classList.add('active');
        document.querySelectorAll('.sidebar-nav li')[0].classList.add('active');
        document.getElementById('section-title').textContent = 'Government Dashboard';
        loadStats();
    } else if (section === 'issues') {
        document.getElementById('issues-section').classList.add('active');
        document.querySelectorAll('.sidebar-nav li')[1].classList.add('active');
        document.getElementById('section-title').textContent = 'All Issues';
        loadGovIssues();
    }
}

// Safely extract reporter details when the reportedBy reference may be missing
function getReporterInfo(issue) {
    const name = issue.reportedBy?.name || 'Unknown reporter';
    const village = issue.reportedBy?.village || 'Unknown village';
    return { name, village };
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('stat-total').textContent = data.totalIssues;
            document.getElementById('stat-reported').textContent = data.reported;
            document.getElementById('stat-progress').textContent = data.inProgress;
            document.getElementById('stat-resolved').textContent = data.resolved;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load government issues
async function loadGovIssues() {
    try {
        const sort = document.getElementById('filter-sort').value;
        const location = document.getElementById('filter-location').value;
        const category = document.getElementById('filter-category').value;
        const status = document.getElementById('filter-status').value;
        
        const params = new URLSearchParams();
        if (sort) params.append('sort', sort);
        if (location) params.append('location', location);
        if (category) params.append('category', category);
        if (status) params.append('status', status);
        
        const response = await fetch(`${API_BASE}/issues?${params}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayGovIssues(data.issues || []);
        } else {
            showAlert('Failed to load issues', 'error');
        }
    } catch (error) {
        console.error('Error loading issues:', error);
        showAlert('Network error. Please try again.', 'error');
    }
}

// Display government issues
function displayGovIssues(issues) {
    const container = document.getElementById('issues-container');
    
    if (issues.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>📭</h2>
                <p>No issues found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = issues.map(issue => `
        <div class="issue-card-gov">
            <div class="issue-top">
                <div>
                    <h3 class="issue-title-gov">${escapeHtml(issue.title)}</h3>
                    <span class="issue-category">${issue.category}</span>
                    <span class="likes-badge">❤️ ${issue.likes} Likes</span>
                </div>
                <span class="status-badge-gov status-${issue.status.toLowerCase().replace(' ', '-')}-gov">
                    ${issue.status}
                </span>
            </div>
            <div class="issue-meta-gov">
                <span>📍 ${issue.village}</span>
                <span>📅 ${formatDate(issue.createdAt)}</span>
                ${issue.assignedTo ? `<span>👮 Assigned to: ${escapeHtml(issue.assignedTo)}</span>` : ''}
            </div>
            <p class="issue-description-gov">${escapeHtml(issue.description)}</p>
            <div class="reporter-info">
                <strong>📝 Reported by:</strong> ${escapeHtml(getReporterInfo(issue).name)} (${escapeHtml(getReporterInfo(issue).village)})
            </div>
            ${issue.remarks ? `<div class="reporter-info"><strong>💬 Remarks:</strong> ${escapeHtml(issue.remarks)}</div>` : ''}
            ${issue.mediaUrl ? `<img src="${issue.mediaUrl}" style="width: 100%; border-radius: 8px; margin-bottom: 15px;" alt="Issue media">` : ''}
            <div class="issue-actions-gov">
                <button class="btn-gov btn-progress" onclick="openStatusModal('${issue._id}', '${issue.status}')">
                    📝 Update Status
                </button>
                <button class="btn-gov btn-assign" onclick="openAssignModal('${issue._id}')">
                    👮 Assign Officer
                </button>
            </div>
        </div>
    `).join('');
}

// Load locations for filter
async function loadLocations() {
    try {
        const response = await fetch(`${API_BASE}/issues`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            const locations = [...new Set(data.issues.map(i => i.village))].sort();
            const select = document.getElementById('filter-location');
            
            locations.forEach(location => {
                const option = document.createElement('option');
                option.value = location;
                option.textContent = location;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading locations:', error);
    }
}

// Status modal functions
function openStatusModal(issueId, currentStatus) {
    currentIssueId = issueId;
    document.getElementById('status-select').value = currentStatus;
    document.getElementById('status-modal').classList.add('active');
}

function closeStatusModal() {
    document.getElementById('status-modal').classList.remove('active');
    currentIssueId = null;
}

// Assign modal functions
function openAssignModal(issueId) {
    currentIssueId = issueId;
    document.getElementById('assign-modal').classList.add('active');
}

function closeAssignModal() {
    document.getElementById('assign-modal').classList.remove('active');
    currentIssueId = null;
}

// Submit status update
document.getElementById('status-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const status = document.getElementById('status-select').value;
    
    try {
        const response = await fetch(`${API_BASE}/issues/${currentIssueId}/status`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            closeStatusModal();
            loadGovIssues();
            loadStats();
        } else {
            alert('Failed to update status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Network error. Please try again.');
    }
});

// Submit assignment
document.getElementById('assign-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const assignedTo = document.getElementById('assign-name').value;
    const remarks = document.getElementById('assign-remarks').value;
    
    try {
        const response = await fetch(`${API_BASE}/issues/${currentIssueId}/assign`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ assignedTo, remarks })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            closeAssignModal();
            loadGovIssues();
            document.getElementById('assign-form').reset();
        } else {
            alert('Failed to assign officer');
        }
    } catch (error) {
        console.error('Error assigning officer:', error);
        alert('Network error. Please try again.');
    }
});

// Notification system
function showNotification(message) {
    const badge = document.getElementById('notification-badge');
    badge.textContent = message;
    badge.classList.add('show');
    
    setTimeout(() => {
        badge.classList.remove('show');
    }, 5000);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}

