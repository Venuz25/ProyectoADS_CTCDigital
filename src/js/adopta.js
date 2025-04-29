window.addEventListener('DOMContentLoaded', () => {
  fetch('/ProyectoADS_CTCDigital/src/backend/adoptame.php')
      .then(async response => {
          console.log('Status:', response.status);
          const text = await response.text();
          console.log('Raw response:', text);
          return JSON.parse(text);
      })
    .then(data => {
      const contenedor = document.getElementById('contenedorAdopciones');
      data.forEach(mascota => {
        const imagen = `/ProyectoADS_CTCDigital/mascotas/${mascota.idMascota}/principal.jpeg`;
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('col');

        //Contenido de la tarjeta
        tarjeta.innerHTML = `
          <div class="card shadow-sm border-0 rounded-4">
              <img src="${imagen}" class="card-img-top rounded-top-4" style="height: 225px; object-fit: cover;">
              <div class="card-body">
                  <h5 class="card-title fw-bold mb-2">${mascota.nombre}</h5>
                  <ul class="list-unstyled text-muted mb-3 small">
                  <li><strong>Estación:</strong> ${mascota.estacionMetro}</li>
                  <li><strong>Sexo:</strong> ${mascota.sexo}</li>
                  <li><strong>Edad:</strong> ${mascota.edad}</li>
                  <li><strong>Tamaño:</strong> ${mascota.tamaño}</li>
                  </ul>
                  <div class="d-grid">
                      <button type="button" class="btn btn-outline-primary btn-sm rounded-pill" onclick='mostrarModal(${JSON.stringify(mascota)})'>
                          Ver más información
                      </button>
                  </div>
              </div>
          </div>
        `;
        contenedor.appendChild(tarjeta);
      });
    })
  .catch(error => console.error('Error al cargar los datos:', error));
});

function mostrarModal(mascota) {
  const contenedor = document.getElementById('contenidoModalMascota');
  const basePath = `/ProyectoADS_CTCDigital/mascotas/${mascota.idMascota}/`;
  const archivos = mascota.archivos || ["principal.jpg"];

  let carouselItems = "";
  archivos.forEach((archivo, index) => {
    const ruta = basePath + archivo;
    const isVideo = archivo.toLowerCase().endsWith(".mp4");

    carouselItems += `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        ${isVideo
          ? `<video class="d-block w-100 rounded-4" controls style="height: 400px; object-fit: cover;">
              <source src="${ruta}" type="video/mp4">
            </video>`
          : `<img src="${ruta}" class="d-block w-100 rounded-4" style="height: 400px; object-fit: cover;">`}
      </div>`;
  });

  contenedor.innerHTML = `
    <div id="carousel${mascota.idMascota}" class="carousel slide mb-4" data-bs-ride="carousel">
      <div class="carousel-inner shadow rounded-4 overflow-hidden">
        ${carouselItems}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel${mascota.idMascota}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bg-dark rounded-circle p-2"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel${mascota.idMascota}" data-bs-slide="next">
        <span class="carousel-control-next-icon bg-dark rounded-circle p-2"></span>
      </button>
    </div>

    <div class="text-end text-muted mb-3 me-3" style="font-size: 0.9rem;">
      <strong>Fecha de ingreso:</strong> ${mascota.fechaIngreso}
    </div>

    <div class="px-3">
      <h2 class="fw-bold text-info mb-1">${mascota.nombre}</h2>
      <h5 class="text-secondary mb-3">${mascota.especie}</h5>
      <hr class="my-3">

      <ul class="list-group list-group-flush mb-3">
        <li class="list-group-item"><strong>Estación:</strong> ${mascota.estacionMetro}</li>
        <li class="list-group-item"><strong>Edad:</strong> ${mascota.edad} años</li>
        <li class="list-group-item"><strong>Sexo:</strong> ${mascota.sexo}</li>
        <li class="list-group-item"><strong>Raza:</strong> ${mascota.raza}</li>
        <li class="list-group-item"><strong>Tamaño:</strong> ${mascota.tamaño}</li>
        <li class="list-group-item"><strong>Estado de salud:</strong> ${mascota.estadoSalud}</li>
        <li class="list-group-item"><strong>Características físicas:</strong> ${mascota.caractFisica}</li>
        <li class="list-group-item"><strong>Descripción:</strong> ${mascota.descripcion}</li>
      </ul>
    </div>
  `;

  
  document.getElementById('btnAdoptar').href = "/ProyectoADS_CTCDigital/src/formsAdoptame.html";
  new bootstrap.Modal(document.getElementById('modalInfoMascota')).show();
}


