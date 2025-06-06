
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
        const toggleBtn = document.getElementById("searchToggle");
        const searchInput = document.querySelector(".search-input");
        const micIcon = document.querySelector(".right-icon");

        toggleBtn.addEventListener("click", () => {
            searchInput.classList.toggle("expanded");
             toggleBtn.classList.toggle("no-border");

            if (searchInput.classList.contains("expanded")) {
                micIcon.style.display = "block" // Show mic icon
            } else {
                micIcon.style.display = "none";   // Hide mic icon
            }
        });
    });






