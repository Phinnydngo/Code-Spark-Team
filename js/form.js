const container = document.getElementById("authContainer");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

const socialLinks = document.querySelectorAll(".social-link");
const socialModal = document.getElementById("socialModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");
const cancelSocial = document.getElementById("cancelSocial");
const continueSocial = document.getElementById("continueSocial");

let selectedProvider = "";

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

socialLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    selectedProvider = link.dataset.provider;

    modalTitle.textContent = `Continue with ${selectedProvider}`;
    modalText.textContent =
      `This is a dummy ${selectedProvider} sign-in prompt. In a real system, this action would redirect the user to ${selectedProvider} for authentication.`;

    socialModal.classList.add("show");
  });
});

function hideModal() {
  socialModal.classList.remove("show");
}

closeModal.addEventListener("click", hideModal);
cancelSocial.addEventListener("click", hideModal);

continueSocial.addEventListener("click", () => {
  alert(`Demo only: redirecting to ${selectedProvider} login...`);
  hideModal();
});

socialModal.addEventListener("click", (e) => {
  if (e.target === socialModal) {
    hideModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideModal();
  }
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Dummy login submitted.");
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Dummy registration submitted.");
});