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
  
    setInterval(detectarImagenCentral, 1000);
  });