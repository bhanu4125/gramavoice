const API_BASE = 'http://localhost:5000/api';
let currentUser = null;
let currentView = 'all';
let allIssues = [];

// Check authentication
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
        window.location.href = '/';
        return;
    }
    
    currentUser = JSON.parse(user);
    document.getElementById('user-name').textContent = currentUser.name;
    
    // Load initial data
    loadIssues();
    loadLocations();
    setupViewSwitching();
});

// Navigation buttons
function setupViewSwitching() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.view) {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentView = btn.dataset.view;
                loadIssues();
            });
        }
    });
}

// Load issues
async function loadIssues() {
    try {
        let url = '';
        
        if (currentView === 'my-reports') {
            url = `${API_BASE}/my-issues/${currentUser.id}`;
        } else {
            const location = document.getElementById('filter-location').value;
            const sort = document.getElementById('filter-sort').value;
            url = `${API_BASE}/issues?${location ? `location=${location}&` : ''}sort=${sort}`;
        }
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            allIssues = data.issues || [];
            displayIssues(allIssues);
        } else {
            showAlert('Failed to load issues', 'error');
        }
    } catch (error) {
        console.error('Error loading issues:', error);
        showAlert('Network error. Please try again.', 'error');
    }
}

// Display issues
function displayIssues(issues) {
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
        <div class="issue-card">
            <div class="issue-header">
                <div>
                    <h3 class="issue-title">${escapeHtml(issue.title)}</h3>
                    <span class="issue-category">${issue.category}</span>
                </div>
                <span class="status-badge status-${issue.status.toLowerCase().replace(' ', '-')}">
                    ${issue.status}
                </span>
            </div>
            <p class="issue-description">${escapeHtml(issue.description)}</p>
            <div class="issue-meta">
                <span>📍 ${issue.village}</span>
                <span>👤 ${issue.reportedBy.name}</span>
                <span>📅 ${formatDate(issue.createdAt)}</span>
            </div>
            ${issue.mediaUrl ? `<div class="issue-media-container"><img src="${issue.mediaUrl}" class="issue-media" alt="Issue media"></div>` : ''}
            <div class="issue-actions">
                <button class="btn btn-like ${issue.likedBy.some(u => u._id === currentUser.id) ? 'liked' : ''}" 
                        onclick="toggleLike('${issue._id}')">
                    ❤️ ${issue.likes} Likes
                </button>
                <button class="btn btn-comment" onclick="toggleComments('${issue._id}')">
                    💬 ${issue.comments.length} Comments
                </button>
            </div>
            <div id="comments-${issue._id}" class="comment-section" style="display: none;">
                ${issue.comments.map(comment => `
                    <div class="comment">
                        <div class="comment-author">${escapeHtml(comment.user.name)}</div>
                        <div class="comment-text">${escapeHtml(comment.text)}</div>
                    </div>
                `).join('')}
                <form onsubmit="addComment(event, '${issue._id}')">
                    <input type="text" placeholder="Add a comment..." style="width: calc(100% - 20px); padding: 8px; border: 2px solid #e0e0e0; border-radius: 5px;">
                </form>
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

// Search issues
function searchIssues() {
    const query = document.getElementById('search-issues').value.toLowerCase();
    const filtered = allIssues.filter(issue => 
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query) ||
        issue.village.toLowerCase().includes(query)
    );
    displayIssues(filtered);
}

// Toggle like
async function toggleLike(issueId) {
    try {
        const response = await fetch(`${API_BASE}/issues/${issueId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            loadIssues(); // Reload to update UI
        } else {
            showAlert('Failed to like issue', 'error');
        }
    } catch (error) {
        console.error('Error liking issue:', error);
    }
}

// Toggle comments
function toggleComments(issueId) {
    const commentsDiv = document.getElementById(`comments-${issueId}`);
    commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
}

// Add comment
async function addComment(event, issueId) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const text = input.value.trim();
    
    if (!text) return;
    
    try {
        const response = await fetch(`${API_BASE}/issues/${issueId}/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            input.value = '';
            loadIssues(); // Reload to show new comment
        } else {
            showAlert('Failed to add comment', 'error');
        }
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

// Report modal functions
function openReportModal() {
    document.getElementById('report-modal').classList.add('active');
    document.getElementById('report-village').value = currentUser.village || '';
    
    // Set up file upload area click
    document.getElementById('file-upload-area').addEventListener('click', () => {
        document.getElementById('report-media').click();
    });
}

function closeReportModal() {
    document.getElementById('report-modal').classList.remove('active');
    document.getElementById('report-form').reset();
    document.getElementById('file-preview').innerHTML = '';
    document.getElementById('file-preview').classList.remove('show');
}

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
        showAlert('File size too large. Maximum size is 50MB.', 'error', 'alert-container');
        return;
    }
    
    // Show preview
    const preview = document.getElementById('file-preview');
    preview.innerHTML = '';
    
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `
                <div class="preview-item">
                    <img src="${e.target.result}" class="preview-image" alt="Preview">
                    <button type="button" class="remove-file" onclick="removeFile()">×</button>
                </div>
            `;
            preview.classList.add('show');
        };
        reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `
                <div class="preview-item">
                    <video src="${e.target.result}" class="preview-video" controls></video>
                    <button type="button" class="remove-file" onclick="removeFile()">×</button>
                </div>
            `;
            preview.classList.add('show');
        };
        reader.readAsDataURL(file);
    }
}

function removeFile() {
    document.getElementById('report-media').value = '';
    document.getElementById('file-preview').innerHTML = '';
    document.getElementById('file-preview').classList.remove('show');
}

// Submit report
document.getElementById('report-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('report-title').value);
    formData.append('description', document.getElementById('report-description').value);
    formData.append('category', document.getElementById('report-category').value);
    formData.append('village', document.getElementById('report-village').value);
    
    // Add file if selected
    const fileInput = document.getElementById('report-media');
    if (fileInput.files.length > 0) {
        formData.append('media', fileInput.files[0]);
    }
    
    try {
        const response = await fetch(`${API_BASE}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showAlert('Issue reported successfully!', 'success', 'alert-container');
            closeReportModal();
            loadIssues(); // Reload issues
        } else {
            showAlert(data.error || 'Failed to report issue', 'error', 'alert-container');
        }
    } catch (error) {
        console.error('Error reporting issue:', error);
        showAlert('Network error. Please try again.', 'error', 'alert-container');
    }
});

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

function showAlert(message, type, containerId = 'alert-container') {
    const container = document.getElementById(containerId);
    container.innerHTML = `<div class="alert ${type}">${message}</div>`;
    setTimeout(() => {
        container.innerHTML = '';
    }, 3000);
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}

