// CARRUSEL -------------------------------------------------
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


// ADOPCIONES Y RESCATADOS --------------------------------------
function cargarEstadisticas() {
  fetch('/ProyectoADS_CTCDigital/src/backend/index.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo obtener los datos');
      }
      return response.json();
    })
    .then(data => {
      const adopcionesSpan = document.getElementById('numAdopciones');
      const rescatesSpan = document.getElementById('numRescates');

      if (adopcionesSpan) adopcionesSpan.textContent = data.adoptados;
      if (rescatesSpan) rescatesSpan.textContent = data.total;
      if (data.donadores && data.donadores.length > 0) {
        mostrarDonadores(data.donadores);
      }
    })
    .catch(error => {
      console.error('Error al cargar las estadísticas:', error);
    });
}

// DONADORES ----------------------------------------------------
function mostrarDonadores(donadores) {
  const lista = document.querySelector('.list-unstyled');
  let indice = 0;

  function actualizarDonadores() {
    lista.innerHTML = '';

    const maxAMostrar = 3;
    for (let i = 0; i < maxAMostrar; i++) {
      const donador = donadores[(indice + i) % donadores.length];

      const li = document.createElement('li');
      li.classList.add('donador');

      const div = document.createElement('div');
      div.className = 'd-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 border-top';

      const img = document.createElement('img');
      img.src = '/ProyectoADS_CTCDigital/recursos/Index/donadores/' + donador.img;
      img.alt = `Donador ${i + 1}`;
      img.style.backgroundColor = donador.color || '#3371ac';
      img.style.borderRadius = '50%';
      img.style.width = '80px';
      img.style.height = '80px';
      img.style.objectFit = 'cover';
      img.style.padding = '5px';

      const info = document.createElement('div');
      info.className = 'col-lg-8';
      info.innerHTML = `
        <h6 class="mb-0">${donador.usuario}</h6>
        <small class="text-body-secondary">${donador.tipo}</small><br>
        ${donador.descripcion ? `<small class="text-body-secondary">${donador.descripcion}</small>` : ''}
      `;

      div.appendChild(img);
      div.appendChild(info);
      li.appendChild(div);
      lista.appendChild(li);
    }

    indice = (indice + maxAMostrar) % donadores.length;
  }

  actualizarDonadores();
  setInterval(actualizarDonadores, 15000); // cada 15 segundos
}

// NOTICIAS - Cargar modales desde archivo externo ------------------------------
function cargarModalesNoticias() {
  fetch('/ProyectoADS_CTCDigital/src/componentes/noticias.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudieron cargar los modales');
      }
      return response.text();
    })
    .then(html => {
      const contenedorModales = document.getElementById('modalesNoticias');
      if (contenedorModales) {
        contenedorModales.innerHTML = html;
      } else {
        console.warn('No se encontró el contenedor para los modales de noticias.');
      }
    })
    .catch(error => {
      console.error('Error al cargar los modales de noticias:', error);
    });
}


// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
  cargarEstadisticas();
  cargarModalesNoticias(); 
});
