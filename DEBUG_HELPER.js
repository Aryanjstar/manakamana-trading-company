// 🔍 DEBUG HELPER - Use this in browser console if needed

// Check current Redux state
function checkReduxState() {
    const state = window.__REDUX_DEVTOOLS_EXTENSION__ ? 
        window.store?.getState() : 
        'Redux DevTools not available';
    console.log('Redux State:', state);
    return state;
}

// Check localStorage
function checkLocalStorage() {
    console.log('LocalStorage Contents:');
    console.log('- user:', localStorage.getItem('user'));
    console.log('- darkMode:', localStorage.getItem('darkMode'));
    
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('Parsed user:', user);
        return user;
    } catch (e) {
        console.error('Error parsing user:', e);
        return null;
    }
}

// Clear everything and reload
function resetApp() {
    console.log('🔄 Clearing all data and reloading...');
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
}

// Check if backend is accessible
async function checkBackend() {
    try {
        const response = await fetch('http://localhost:5000/getProducts');
        console.log('✅ Backend is accessible');
        console.log('Status:', response.status);
        const data = await response.json();
        console.log('Products count:', data.length);
        return data;
    } catch (error) {
        console.error('❌ Backend not accessible:', error);
        return null;
    }
}

// Run all checks
function runAllChecks() {
    console.log('═══════════════════════════════════════');
    console.log('🔍 RUNNING ALL DIAGNOSTIC CHECKS');
    console.log('═══════════════════════════════════════');
    
    console.log('\n1️⃣ Checking LocalStorage...');
    checkLocalStorage();
    
    console.log('\n2️⃣ Checking Backend Connection...');
    checkBackend();
    
    console.log('\n3️⃣ Current URL:', window.location.href);
    console.log('4️⃣ React Version:', React.version);
    
    console.log('\n═══════════════════════════════════════');
    console.log('✅ Diagnostic checks complete!');
    console.log('═══════════════════════════════════════\n');
}

// Export functions to window for easy access
window.debugApp = {
    checkReduxState,
    checkLocalStorage,
    resetApp,
    checkBackend,
    runAllChecks,
};

console.log('🔧 Debug helpers loaded! Use:');
console.log('  window.debugApp.runAllChecks() - Run all diagnostic checks');
console.log('  window.debugApp.checkBackend() - Test backend connection');
console.log('  window.debugApp.checkLocalStorage() - Check stored data');
console.log('  window.debugApp.resetApp() - Clear all data and reload');
