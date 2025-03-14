const forgotPasswordForm = document.getElementById("forgot-password-form");

forgotPasswordForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    
    alert(`A password reset link has been sent to ${email}`);
    
    // Redirect to login page after submitting the form
    window.location.href = "index.html";
});
