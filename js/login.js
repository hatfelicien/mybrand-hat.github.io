function validateLogin() {
    // Validation datas
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;

    //  validation
    if (loginEmail.trim() === '' || loginPassword.trim() === '') {
        alert("All fields are required");
        return;
    }

    // Validate email using a regular expression
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
        alert("Invalid email format");
        return;
    }

    // Validate password length
    if (loginPassword.length < 6) {
        alert("Password should be at least 6 characters");
        return;
    }

    // Retrieve users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the provided credentials match any user
    let loggedInUser = users.find(user => user.email === loginEmail && user.password === loginPassword);

    if (loggedInUser) {
        alert("Login successful!");
        
        // Redirect to the dashboard after successful login
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password");
    }
}

