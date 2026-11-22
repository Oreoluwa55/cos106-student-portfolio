const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const messageError = document.getElementById("message-error");
const formFeedback = document.getElementById("form-feedback");

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  messageError.textContent = "";
  formFeedback.className = "form-feedback";
  formFeedback.textContent = "";
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const phoneVal = phoneInput.value.trim();
  const messageVal = messageInput.value.trim();

  let isValid = true;

  // 1. Check that no field is empty
  if (nameVal === "") {
    nameError.textContent = "Full name is required.";
    isValid = false;
  }

  // 2. Check empty + valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailVal === "") {
    emailError.textContent = "Email address is required.";
    isValid = false;
  } else if (!emailRegex.test(emailVal)) {
    emailError.textContent = "Please enter a valid email address (e.g., name@domain.com).";
    isValid = false;
  }

  // 3. Check empty + phone contains digits only
  const digitsOnlyRegex = /^\d+$/;
  if (phoneVal === "") {
    phoneError.textContent = "Phone number is required.";
    isValid = false;
  } else if (!digitsOnlyRegex.test(phoneVal)) {
    phoneError.textContent = "Phone number must contain digits only (no spaces, '+' signs, or dashes).";
    isValid = false;
  }

  if (messageVal === "") {
    messageError.textContent = "Please enter your message.";
    isValid = false;
  }

  if (!isValid) {
    formFeedback.classList.add("error");
    formFeedback.textContent = "Please fix the highlighted errors before submitting.";
    return;
  }

  formFeedback.classList.add("success");
  formFeedback.textContent = `Thank you, ${nameVal}! Your message has been validated and sent.`;
  contactForm.reset();
});