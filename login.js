const defaultCredentials = {
    username: "customer",
    password: "password123"
};

// Track login attempts
let loginAttempts = 0;
const maxAttempts = 3;

// Get DOM elements
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("login-error");

// Handle form submission
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get form values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    
    // Validate password length
    if (password.length < 8) {
        showError("Password must be at least 8 characters long");
        return;
    }
    
    // Get stored credentials from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Check credentials
    if ((username === defaultCredentials.username && password === defaultCredentials.password) ||
        (username === storedUsername && password === storedPassword)) {
        // Successful login - redirect to products page
        window.location.href = "products.html";
    } else {
        // Failed login
        loginAttempts++;
        
        if (loginAttempts >= maxAttempts) {
            // Redirect to error page after max attempts
            window.location.href = "error.html";
        } else {
            // Show error message
            showError(`Invalid username or password. ${maxAttempts - loginAttempts} attempts remaining.`);
        }
    }
});

// Function to display error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 3000);
}

