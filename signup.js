
const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const newUsername = document.getElementById("new-username").value.trim();
    const newPassword = document.getElementById("new-password").value;
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    
    if (newPassword.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }
    
    // Store the new credentials in localStorage
    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPassword);

    // Store the customer information in localStorage
const customer = {
    name: name,
    address: address,
    email: email,
    phone: phone
};
localStorage.setItem("customer", JSON.stringify(customer));
console.log("Customer details saved:", customer); // Add this line to verify


    
    alert(`User ${newUsername} signed up successfully!`);
    
    // Redirect to login page after successful sign-up
    window.location.href = "index.html";
});

