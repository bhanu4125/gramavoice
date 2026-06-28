// Language configuration
const translations = {
    en: {
        // Login Page
        'app-title': 'GramaVoice',
        'app-subtitle': 'Citizen Complaint Management System',
        'citizen-login': 'Citizen Login',
        'government-login': 'Government Login',
        'login': 'Login',
        'signup': 'Sign Up',
        'register': 'Register',
        'name': 'Name',
        'email': 'Email',
        'password': 'Password',
        'village': 'Village/Area',
        'department': 'Department/Area',
        'already-have-account': 'Already have an account?',
        'no-account': "Don't have an account?",
        'need-account': 'Need an account?',
        
        // Citizen Dashboard
        'dashboard': 'Dashboard',
        'all-issues': 'All Issues',
        'my-reports': 'My Reports',
        'logout': 'Logout',
        'all-locations': 'All Locations',
        'sort-newest': 'Sort by: Newest',
        'sort-likes': 'Sort by: Most Liked',
        'search': 'Search issues...',
        'no-issues': 'No issues found',
        'category': 'Category',
        'status': 'Status',
        'reported-by': 'Reported by',
        'likes': 'Likes',
        'comments': 'Comments',
        'report-issue': 'Report New Issue',
        'title': 'Title',
        'description': 'Description',
        'select-category': 'Select category',
        'upload-media': 'Upload Photo/Video',
        'drag-drop': 'Drag & drop files here or click to browse',
        'submit-report': 'Submit Report',
        'add-comment': 'Add a comment...',
        
        // Government Dashboard
        'government-portal': 'Government Portal',
        'total-issues': 'Total Issues',
        'reported': 'Reported',
        'in-progress': 'In Progress',
        'resolved': 'Resolved',
        'sort-priority': 'Sort by: Most Liked (Priority)',
        'sort-location': 'Sort by: Location',
        'refresh': 'Refresh',
        'update-status': 'Update Status',
        'assign-officer': 'Assign Officer',
        'officer-name': 'Officer Name',
        'remarks': 'Remarks',
        'mark-progress': 'Mark as In Progress',
        'mark-resolved': 'Mark as Resolved',
        
        // Categories
        'road': 'Road',
        'water': 'Water',
        'electricity': 'Electricity',
        'sanitation': 'Sanitation',
        'education': 'Education',
        'healthcare': 'Healthcare',
        'other': 'Other',
        
        // Status
        'under-review': 'Under Review',
        'in-progress-status': 'In Progress',
        'resolved-status': 'Resolved'
    },
    te: {
        // Login Page
        'app-title': 'గ్రామవాయిస్',
        'app-subtitle': 'పౌర ఫిర్యాదు నిర్వహణ వ్యవస్థ',
        'citizen-login': 'పౌర లాగిన్',
        'government-login': 'ప్రభుత్వ లాగిన్',
        'login': 'లాగిన్',
        'signup': 'సైన్ అప్',
        'register': 'నమోదు',
        'name': 'పేరు',
        'email': 'ఇమెయిల్',
        'password': 'పాస్వర్డ్',
        'village': 'గ్రామం/ప్రాంతం',
        'department': 'శాఖ/ప్రాంతం',
        'already-have-account': 'ఖాతా ఉన్నదా?',
        'no-account': 'ఖాతా లేదా?',
        'need-account': 'ఖాతా కావాలా?',
        
        // Citizen Dashboard
        'dashboard': 'డాష్బోర్డ్',
        'all-issues': 'అన్ని సమస్యలు',
        'my-reports': 'నా నివేదికలు',
        'logout': 'లాగ్అవుట్',
        'all-locations': 'అన్ని ప్రాంతాలు',
        'sort-newest': 'క్రమబద్ధీకరణ: తాజాది',
        'sort-likes': 'క్రమబద్ధీకరణ: ఎక్కువ లైక్స్',
        'search': 'సమస్యల వెతకండి...',
        'no-issues': 'సమస్యలు కనుగొనబడలేదు',
        'category': 'వర్గం',
        'status': 'స్థితి',
        'reported-by': 'విన్నవించినది',
        'likes': 'లైక్స్',
        'comments': 'వ్యాఖ్యలు',
        'report-issue': 'కొత్త సమస్య నివేదించండి',
        'title': 'శీర్షిక',
        'description': 'వివరణ',
        'select-category': 'వర్గాన్ని ఎంచుకోండి',
        'upload-media': 'ఫోటో/వీడియో అప్‌లోడ్',
        'drag-drop': 'ఫైళ్లను ఇక్కడ లాగండి లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి',
        'submit-report': 'నివేదికను సమర్పించండి',
        'add-comment': 'వ్యాఖ్య జోడించండి...',
        
        // Government Dashboard
        'government-portal': 'ప్రభుత్వ పోర్టల్',
        'total-issues': 'మొత్తం సమస్యలు',
        'reported': 'నివేదించబడింది',
        'in-progress': 'పురోగతిలో',
        'resolved': 'పరిష్కరించబడింది',
        'sort-priority': 'క్రమబద్ధీకరణ: ఎక్కువ లైక్స్ (ప్రాధాన్యత)',
        'sort-location': 'క్రమబద్ధీకరణ: స్థానం',
        'refresh': 'రిఫ్రెష్',
        'update-status': 'స్థితిని నవీకరించండి',
        'assign-officer': 'అధికారిని కేటాయించండి',
        'officer-name': 'అధికారి పేరు',
        'remarks': 'వ్యాఖ్యలు',
        'mark-progress': 'పురోగతిలో గుర్తించండి',
        'mark-resolved': 'పరిష్కరించబడినదిగా గుర్తించండి',
        
        // Categories
        'road': 'రహదారి',
        'water': 'నీరు',
        'electricity': 'విద్యుత్',
        'sanitation': 'స్వచ్ఛత',
        'education': 'విద్య',
        'healthcare': 'ఆరోగ్య సంరక్షణ',
        'other': 'ఇతర',
        
        // Status
        'under-review': 'సమీక్షలో',
        'in-progress-status': 'పురోగతిలో',
        'resolved-status': 'పరిష్కరించబడింది'
    }
};

// Current language
let currentLanguage = localStorage.getItem('language') || 'en';

// Language switching function
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageLanguage();
    
    // Update language button
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(lang === 'en' ? 'English' : 'తెలుగు')) {
            btn.classList.add('active');
        }
    });
}

// Update all text elements on the page
function updatePageLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    // Update titles
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        if (translations[currentLanguage][key]) {
            element.title = translations[currentLanguage][key];
        }
    });
}

// Initialize language on page load
function initLanguage() {
    currentLanguage = localStorage.getItem('language') || 'en';
    updatePageLanguage();
}

