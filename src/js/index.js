// =======================
// Carrusel de imágenes
// =======================

// Elementos del carrusel
const items = document.querySelectorAll('.carrusel-item');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let current = 0;

// Función para mostrar el slide activo
function showSlide(index) {
  items.forEach(item => item.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  items[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

// Eventos para las flechas del carrusel
leftArrow.addEventListener('click', () => {
  const newIndex = (current - 1 + items.length) % items.length;
  showSlide(newIndex);
});

rightArrow.addEventListener('click', () => {
  const newIndex = (current + 1) % items.length;
  showSlide(newIndex);
});

// Evento para los indicadores (puntos)
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});


// =======================
// Carga de estadísticas (adopciones y rescates)
// =======================

// Esta función obtiene datos desde una API en C#
function cargarEstadisticas() {
  fetch('http://localhost:3306/api/mascotas/estadisticas')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo obtener los datos');
      }
      return response.json();
    })
    .then(data => {
      // Mostrar en los elementos HTML correspondientes
      const adopcionesSpan = document.getElementById('numAdopciones');
      const rescatesSpan = document.getElementById('numRescates');

      if (adopcionesSpan) adopcionesSpan.textContent = data.adoptados;
      if (rescatesSpan) rescatesSpan.textContent = data.total;
    })
    .catch(error => {
      console.error('Error al cargar las estadísticas:', error);
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarEstadisticas();
  showSlide(0); // Muestra el primer slide al inicio
});
