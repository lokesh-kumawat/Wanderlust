
// js for bootstrap validation
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();


// script for search bar in navbar.ejs
document.addEventListener("DOMContentLoaded", () => {
    // -------------------- MOBILE SEARCH --------------------
    const mobileToggleBtn = document.getElementById("mobileSearchToggle");
    const mobileSearchInput = document.querySelector("#mobileSearchForm .search-input");
    const mobileMicIcon = document.querySelector("#mobileSearchForm .right-icon");

    if (mobileToggleBtn && mobileSearchInput && mobileMicIcon) {
        mobileToggleBtn.addEventListener("click", () => {
            mobileSearchInput.classList.toggle("expanded");
            mobileToggleBtn.classList.toggle("no-border");

            if (mobileSearchInput.classList.contains("expanded")) {
                mobileMicIcon.style.display = "block"; // Show mic icon
            } else {
                mobileMicIcon.style.display = "none";  // Hide mic icon
            }
        });
    }

    // -------------------- DESKTOP SEARCH --------------------
    const desktopToggleBtn = document.getElementById("desktopSearchToggle");
    const desktopSearchInput = document.querySelector("#desktopSearchForm .search-input");
    const desktopMicIcon = document.querySelector("#desktopSearchForm .right-icon");

    if (desktopToggleBtn && desktopSearchInput && desktopMicIcon) {
        desktopToggleBtn.addEventListener("click", () => {
            desktopSearchInput.classList.toggle("expanded");
            desktopToggleBtn.classList.toggle("no-border");

            if (desktopSearchInput.classList.contains("expanded")) {
                desktopMicIcon.style.display = "block"; // Show mic icon
            } else {
                desktopMicIcon.style.display = "none";  // Hide mic icon
            }
        });
    }
});







