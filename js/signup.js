function validateForm() {
    // Validation logic here
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation (you can enhance this as needed)
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        alert("All fields are required");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Store user data in local storage
    let user = {
        name: name,
        email: email,
        password: password
    };

    // Retrieve existing users or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Add the new user
    users.push(user);

    // Save the updated users array to local storage
    localStorage.setItem('users', JSON.stringify(users));

    alert("User registered successfully!");
    window.location.href = "login.html";
}
