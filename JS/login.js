document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const usernamePattern = /^[A-Za-z]+$/;

    if (!username) {
        alert('Username is required!');
        return;
    }
    
    if (!usernamePattern.test(username)) {
        alert('Username should contain only letters (A-Z or a-z)!');
        return;
    }

    if (!password) {
        alert('Password is required!');
        return;
    }

    if (password !== '123456') {
        alert('Incorrect password!');
        return;
    }
    if (usernamePattern.test(username)&& password === '123456') {
        
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('nav-section').classList.remove('hidden');        
            document.getElementById('lessons').classList.remove('hidden');      
            document.getElementById('faq').classList.remove('hidden');
        }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    document.getElementById('nav-section').classList.add('hidden');        
    document.getElementById('lessons').classList.add('hidden');      
    document.getElementById('faq').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
});