// Galería - Detectar imagen central
document.addEventListener("DOMContentLoaded", function () {
    const galeria = document.querySelector('.galeria-movimiento');
    const imagenes = document.querySelectorAll('.galeria-track img');
  
    function detectarImagenCentral() {
      const centroGaleria = galeria.getBoundingClientRect().left + galeria.clientWidth / 2;
      let imagenMasCentrada = null;
      let distanciaMinima = Infinity;
  
      imagenes.forEach(img => {
        const rect = img.getBoundingClientRect();
        const centroImagen = rect.left + rect.width / 2;
        const distancia = Math.abs(centroGaleria - centroImagen);
  
        if (distancia < distanciaMinima) {
          distanciaMinima = distancia;
          imagenMasCentrada = img;
        }
      });
  
      imagenes.forEach(img => img.classList.remove('en-centro'));
      if (imagenMasCentrada) {
        imagenMasCentrada.classList.add('en-centro');
      }
    }
  
    setInterval(detectarImagenCentral, 100);
  });
  
  // Timeline
  (function () {
    "use strict";
  
    const items = document.querySelectorAll(".timeline li");
  
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function callbackFunc() {
      for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }
  
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  })();
  