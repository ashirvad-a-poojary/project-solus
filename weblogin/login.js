function login() {
    // Placeholder function for login logic
    alert("Login clicked! Implement your login logic here.");
    animateLoginButton(); // Call the animation function
}

function animateLoginButton() {
    const loginButton = document.querySelector('button');
    loginButton.style.transition = 'transform 0.3s';
    loginButton.style.transform = 'scale(1.2)'; // Add a scale effect during the animation

    // Reset the scale after a short delay
    setTimeout(() => {
        loginButton.style.transition = 'transform 0.3s';
        loginButton.style.transform = 'scale(1)';
    }, 300);
}

function showRegisterForm() {
    // Placeholder function to show the register form
    alert("Show register form! Implement your register form logic here.");
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggle.innerHTML = '<img src="https://media.geeksforgeeks.org/wp-content/uploads
