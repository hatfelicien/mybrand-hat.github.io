const name = document.getElementById("name");
const password = document.getElementById("password");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

form.addEventListener("submit", (e) => {
  let message = [];
  let pwdmsg = [];

  if (name.value === "" || password.value == null) {
    message.push("Name is required");
  }

  if (password.value.length <= 6) {
    pwdmsg.push("Your password is too small (must be at least 7 characters)");
  }

  // Additional password criteria
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password.value)) {
    pwdmsg.push(
      "Password must contain at least one lowercase letter, one uppercase letter, and one digit"
    );
  }

  // Add more conditions as needed

  if (message.length > 0 || pwdmsg.length > 0) {
    e.preventDefault();

    // Join both sets of error messages and display them
    errorElement.innerText = [...message, ...pwdmsg].join(", ");
  }
});

function validateForm1() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  validateField(name, "errorName", "Username is required");
  validateField(email, "errorEmail", "Email is required", isValidEmail);
  validateField(password, "errorPassword", "Password is required");
  validateField(
    confirmPassword,
    "errorConfirmPassword",
    "Passwords do not match",
    () => password === confirmPassword
  );

  // If no errors, perform sign-in logic here (e.g., send data to server)
}

function validateField(
  value,
  errorElementId,
  errorMessage,
  validationFunction = null
) {
  const errorElement = document.getElementById(errorElementId);
  errorElement.innerText = ""; // Reset previous error message

  if (value.trim() === "") {
    errorElement.innerText = errorMessage;
    return false;
  }

  if (validationFunction && !validationFunction(value)) {
    errorElement.innerText = errorMessage;
    return false;
  }

  return true;
}

function isValidEmail(email) {
  // Simple email validation using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm() {
  const title = document.getElementById("title").value;
  const tag = document.getElementById("tag").value;
  const img = document.getElementById("img");
  const content = document.getElementById("content").value;

  const errorTitle = document.getElementById("errorTitle");
  const errorTag = document.getElementById("errorTag");
  const errorImg = document.getElementById("errorImg");
  const errorContent = document.getElementById("errorContent");

  let isValid = true;

  // Reset previous error messages
  errorTitle.innerText = "";
  errorTag.innerText = "";
  errorImg.innerText = "";
  errorContent.innerText = "";

  if (title.trim() === "") {
    errorTitle.innerText = "Title is required";
    isValid = false;
  }

  if (tag.trim() === "") {
    errorTag.innerText = "Tags are required";
    isValid = false;
  }

  if (!img.files.length) {
    errorImg.innerText = "Image is required";
    isValid = false;
  }

  if (content.trim() === "") {
    errorContent.innerText = "Content is required";
    isValid = false;
  }

  if (isValid) {
    // Read the file as a data URL
    const file = img.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageData = e.target.result;

      // Save data to local storage, including the image data
      saveDataToLocalStorage(
        title,
        tag,
        imageData,
        content,
        document.getElementById("references").value
      );
    };

    reader.readAsDataURL(file);
  }

  return isValid;
}

function updateCharCount() {
  const content = document.getElementById("content").value;
  const charCount = content.length;
  document.getElementById("charCount").innerText =
    "Character Count: " + charCount;
}

function saveDataToLocalStorage(title, tag, img, content, references) {
  const newData = {
    title,
    tag,
    img,
    content,
    references,
  };

  // Retrieve existing data from local storage
  const existingData = JSON.parse(localStorage.getItem("postData")) || [];

  // Add new data to existing data
  existingData.push(newData);

  // Save updated data back to local storage
  localStorage.setItem("postData", JSON.stringify(existingData));
}

function validateLogin() {
  // Validation datas
  let loginEmail = document.getElementById("loginEmail").value;
  let loginPassword = document.getElementById("loginPassword").value;

  //  validation
  if (loginEmail.trim() === "" || loginPassword.trim() === "") {
    document.getElementById("errormsg").innerHTML = "All fields are required";
    return;
  }

  // Validate email using a regular expression
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(loginEmail)) {
    document.getElementById("errorLoginEmail").innerHTML =
      "Invalid email format";
    return;
  }

  // Validate password length
  if (loginPassword.length < 6) {
    document.getElementById("errorLoginPassword").innerHTML =
      "Password should be at least 6 characters";
    return;
  }

  // Retrieve users from local storage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the provided credentials match any user
  let loggedInUser = users.find(
    (user) => user.email === loginEmail && user.password === loginPassword
  );

  if (loggedInUser) {
    // Redirect to the dashboard after successful login
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("errormsg").innerHTML = "Invalid email or password";
  }
}
