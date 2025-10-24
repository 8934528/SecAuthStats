// SECURITY CONFIGURATION 
const SECURITY_LAYERS = {
    ENCRYPTION_KEY: "1234567890abcdef"
};

//SECURITY CHECK
document.addEventListener('DOMContentLoaded', async function() {
    // Ceck for a valid sessio
    const sessionData = localStorage.getItem('statsSession');
    
    if (!sessionData) {
        redirectToAuth();
        return;
    }
    
    try {
        const session = JSON.parse(sessionData);
        
        // Ceck if session has expired
        if (Date.now() > session.expires) {
            showToast("Session expired. Please log in again.");
            setTimeout(redirectToAuth, 3000);
            return;
        }
        
        // Verift session token
        const expectedToken = await sha256(session.expires + SECURITY_LAYERS.ENCRYPTION_KEY);
        if (session.token !== expectedToken) {
            showToast("Invalid session. Please log in again.");
            setTimeout(redirectToAuth, 3000);
            return;
        }
        
        initializeDashboard();
    } catch (e) {
        console.error("Session validation error:", e);
        redirectToAuth();
    }
});

// UTILITY FUNCTIONS 
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function redirectToAuth() {
    localStorage.removeItem('statsSession');
    window.location.href = '../Auth/Auth.html';
}

function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

//ASHBOARD FUNCTIONS 
function initializeDashboard() {
    renderCharts();
    populateTables();
   
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('statsSession');
        redirectToAuth();
    });
    
    document.getElementById('refreshBtn').addEventListener('click', function() {
        showToast("Data refreshed");
        updateStats();
    });
    
    document.getElementById('timePeriod').addEventListener('change', function() {
        showToast(`Time period changed to: ${this.options[this.selectedIndex].text}`);
        renderCharts();
    });
}

function updateStats() {
    // updating stats with new values
    const stats = [
        { id: "totalVisitors", value: getRandomNumber(24000, 26000).toLocaleString() },
        { id: "uniqueVisitors", value: getRandomNumber(18000, 20000).toLocaleString() },
        { id: "avgSession", value: `${getRandomNumber(4, 5)}m ${getRandomNumber(0, 59)}s` },
        { id: "bounceRate", value: `${getRandomNumber(30, 40)}%` }
    ];
    
    stats.forEach(stat => {
        document.getElementById(stat.id).textContent = stat.value;
    });
    
    document.querySelectorAll('.stat-trend').forEach(el => {
        const isUp = Math.random() > 0.5;
        const percentage = (Math.random() * 10).toFixed(1);
        
        el.innerHTML = isUp ? 
            `<i class="fas fa-arrow-up"></i> ${percentage}%` :
            `<i class="fas fa-arrow-down"></i> ${percentage}%`;
            
        el.className = `stat-trend ${isUp ? 'up' : 'down'}`;
    });
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderCharts() {
    // drop existing charts if they exist
    if (window.trafficChart) window.trafficChart.destroy();
    if (window.sourcesChart) window.sourcesChart.destroy();
    if (window.countriesChart) window.countriesChart.destroy();

    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    window.trafficChart = new Chart(trafficCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Visitors',
                    data: [1200, 1900, 1500, 1800, 2200, 1700, 2000],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Pageviews',
                    data: [2500, 3000, 2800, 3200, 3500, 3000, 3300],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
    
    // Sources Chart
    const sourcesCtx = document.getElementById('sourcesChart').getContext('2d');
    window.sourcesChart = new Chart(sourcesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Direct', 'Social', 'Search', 'Referral', 'Email'],
            datasets: [{
                data: [35, 20, 25, 12, 8],
                backgroundColor: [
                    '#e74c3c',
                    '#3498db',
                    '#2ecc71',
                    '#f39c12',
                    '#9b59b6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'right',
                    labels: { color: '#ecf0f1' }
                }
            }
        }
    });
    
    // Countries Chart
    const countriesCtx = document.getElementById('countriesChart').getContext('2d');
    window.countriesChart = new Chart(countriesCtx, {
        type: 'bar',
        data: {
            labels: ['United States', 'India', 'Germany', 'UK', 'Canada', 'Australia'],
            datasets: [{
                label: 'Visitors',
                data: [8500, 4200, 3800, 3200, 1800, 1500],
                backgroundColor: '#3498db'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

function populateTables() {
    const topPages = [
        { page: '/', visitors: '8,245', bounce: '32%', time: '5m 12s' },
        { page: '/projects', visitors: '5,672', bounce: '28%', time: '6m 45s' },
        { page: '/about', visitors: '4,321', bounce: '35%', time: '4m 18s' },
        { page: '/contact', visitors: '3,987', bounce: '40%', time: '3m 52s' },
        { page: '/blog', visitors: '2,456', bounce: '38%', time: '7m 23s' }
    ];
    
    const topPagesBody = document.getElementById('topPagesBody');
    topPagesBody.innerHTML = '';
    
    topPages.forEach(page => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${page.page}</td>
            <td>${page.visitors}</td>
            <td>${page.bounce}</td>
            <td>${page.time}</td>
        `;
        topPagesBody.appendChild(row);
    });
    
    const devices = [
        { device: 'Chrome', sessions: '12,456', users: '9,874' },
        { device: 'Safari', sessions: '4,321', users: '3,987' },
        { device: 'Firefox', sessions: '3,210', users: '2,845' },
        { device: 'Edge', sessions: '2,543', users: '2,123' },
        { device: 'Mobile', sessions: '9,876', users: '8,456' },
        { device: 'Tablet', sessions: '2,345', users: '2,001' }
    ];
    
    const devicesBody = document.getElementById('devicesBody');
    devicesBody.innerHTML = '';
    
    devices.forEach(device => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${device.device}</td>
            <td>${device.sessions}</td>
            <td>${device.users}</td>
        `;
        devicesBody.appendChild(row);
    });
}

// SECURITY  
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
        showToast("Security restriction enabled");
    }
});
