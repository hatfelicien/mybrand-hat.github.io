async function validateForm() {
  // Reset error messages
  document.getElementById("errormsg").textContent = "";
  document.getElementById("errorName").textContent = "";
  document.getElementById("errorEmail").textContent = "";
  document.getElementById("errorPassword").textContent = "";
  document.getElementById("errorConfirmPassword").textContent = "";

  // Get form inputs
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var confirmPassword = document.getElementById("confirmPassword").value.trim();

  // Validate form inputs (you can add more validation if needed)

  if (!name || !email || !password || !confirmPassword) {
    document.getElementById("errormsg").textContent =
      "Please fill in all fields";
    return;
  }

  if (password !== confirmPassword) {
    document.getElementById("errorConfirmPassword").textContent =
      "Passwords do not match";
    return;
  }

  // Form data
  var formData = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const response = await fetch(
      "https://mybrand-backend-s7by.onrender.com/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Registration successful
      document.getElementById("errormsg").textContent =
        "Registration successful";
    } else {
      throw new Error(data.Message || "Failed to register");
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle error, e.g., display error message to the user
    document.getElementById("errormsg").textContent =
      error.message || "Failed to register";
  }
}
