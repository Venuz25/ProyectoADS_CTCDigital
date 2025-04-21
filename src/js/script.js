document.addEventListener("DOMContentLoaded", function () {
  // Carga dinámica del header y slider
  fetch("/src/componentes/header.html")
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('afterbegin', data);

    setTimeout(() => {
      const navLinks = document.querySelectorAll('.nav-link');
      const slider = document.querySelector('.slider');
      const path = window.location.pathname;

      let activeIndex = 0;
      let activeColor = "#e74c3c";

      navLinks.forEach((link, index) => {
        const href = new URL(link.href).pathname;

        if (path === href || path.endsWith(href)) {
          link.classList.add('active');
          activeIndex = index;
          activeColor = link.dataset.color || "#e74c3c";
        }

        // Hover
        link.addEventListener('mouseenter', () => {
          if (slider) {
            slider.style.left = `${index * 16.666}%`;
            slider.style.backgroundColor = link.dataset.color || "#e74c3c";
          }
        });

        // Salida de hover
        link.addEventListener('mouseleave', () => {
          if (slider) {
            slider.style.left = `${activeIndex * 16.666}%`;
            slider.style.backgroundColor = activeColor;
          }
        });
      });

      if (slider) {
        slider.style.left = `${activeIndex * 16.666}%`;
        slider.style.backgroundColor = activeColor;
      }
    }, 100);
  });

  // carga dinámica del footer
  fetch("/src/componentes/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
    });
});
