// SECURITY CONFIGURATION 
const SECURITY_LAYERS = {
    DYNAMIC_CODE: "1234567890abcdef",
    ENCRYPTION_KEY: "1234567890abcdef",
    ACCESS_HASH: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
};

// UTILITY FUNCTIONS 
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// AUTHENTICATION LOGIC
async function authenticate() {
    const accessKey = document.getElementById('accessKey').value;
    const securityCode = document.getElementById('securityCode').value;
    
    document.getElementById('accessKey').value = '';
    document.getElementById('securityCode').value = '';
    
    if(!accessKey || !securityCode) {
        showToast("Both fields are required!");
        return;
    }
    
    if(securityCode.toUpperCase() !== SECURITY_LAYERS.DYNAMIC_CODE.toUpperCase()) {
        showToast("Invalid security code!");
        return;
    }
    
    if(accessKey !== SECURITY_LAYERS.ENCRYPTION_KEY) {
        showToast("Invalid encryption key!");
        return;
    }
    
    // session token
    const sessionToken = {
        token: await sha256(Date.now() + SECURITY_LAYERS.ENCRYPTION_KEY),
        expires: Date.now() + 600000 // 
    };
    
    // Store session
    localStorage.setItem('statsSession', JSON.stringify(sessionToken));
    window.location.href = '../stats/stats.html';
}

// UI FUNCTION
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
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

document.getElementById('authBtn').addEventListener('click', authenticate);
document.getElementById('hint').textContent = `Dynamic code format: ${SECURITY_LAYERS.DYNAMIC_CODE.length} characters`;

// paste in inputs
document.getElementById('accessKey').addEventListener('paste', e => e.preventDefault());
document.getElementById('securityCode').addEventListener('paste', e => e.preventDefault());

// Session timer
let sessionTime = 600;
const sessionTimer = setInterval(() => {
    sessionTime--;
    const minutes = Math.floor(sessionTime / 60);
    const seconds = sessionTime % 60;
    document.getElementById('sessionTimer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if(sessionTime <= 0) {
        clearInterval(sessionTimer);
        showToast("Session timed out");
    }
}, 1000);
