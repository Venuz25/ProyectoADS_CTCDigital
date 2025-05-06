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
        const extensiones = ['jpeg', 'jpg', 'png', 'webp'];
        const id = mascota.idMascota;
        let imagenCargada = false;
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('col');
      
        const imagen = document.createElement('img');
        imagen.className = "card-img-top rounded-top-4";
        imagen.style = "height: 225px; object-fit: cover;";
      
        extensiones.forEach(ext => {
          if (imagenCargada) return;
          const url = `/ProyectoADS_CTCDigital/mascotas/${id}/principal.${ext}`;
          const pruebaImg = new Image();
          pruebaImg.src = url;
      
          pruebaImg.onload = () => {
            if (!imagenCargada) {
              imagen.src = url;
              imagenCargada = true;
            }
          };
        });
      
        tarjeta.innerHTML = `
            <div class="card shadow-sm border-0 rounded-4 h-100 transition-all hover-shadow">
                <!-- Contenedor de imagen con overlay -->
                <div id="img-container-${id}" class="card-img-top position-relative overflow-hidden" style="height: 200px;">
                    <div class="position-absolute bottom-0 start-0 w-100 p-3" style="background: linear-gradient(transparent, rgba(0,0,0,0.5));">
                        <h5 class="text-white mb-0">${mascota.nombre}</h5>
                        <span class="badge ${mascota.sexo === 'Macho' ? 'bg-primary' : 'bg-danger-subtle text-black'} bg-opacity-75 rounded-pill">
                            <i class="fas ${mascota.sexo === 'Macho' ? 'fa-mars' : 'fa-venus'} me-1"></i> 
                            ${mascota.sexo}
                        </span>
                    </div>
                </div>
                
                <!-- Cuerpo de la tarjeta -->
                <div class="card-body d-flex flex-column pt-3 px-4">
                    <!-- Lista de características -->
                    <ul class="list-unstyled mb-3">
                        <li class="d-flex align-items-center mb-2">
                            <i class="fas fa-subway text-dark-subtle me-2" style="width: 20px;"></i>
                            <span>${mascota.estacionMetro || 'No especificada'}</span>
                        </li>
                        <li class="d-flex align-items-center mb-2">
                            ${mascota.especie === 'Perro' ? '<i class="fas fa-dog text-dark-subtle me-2" style="width: 20px;"></i>' 
                              : '<i class="fas fa-cat text-dark-subtle me-2" style="width: 20px;"></i>'}
                            <span class="text-capitalize">${mascota.raza || 'Sin raza específica'}</span>
                        </li>
                        <li class="d-flex align-items-center mb-2">
                            <i class="fas fa-birthday-cake text-dark-subtle me-2" style="width: 20px;"></i>
                            <span>${mascota.edad} años</span>
                        </li>
                        <li class="d-flex align-items-center mb-2">
                            <i class="fas fa-ruler-combined text-dark-subtle me-2" style="width: 20px;"></i>
                            <span class="text-capitalize">${mascota.tamaño}</span>
                        </li>
                    </ul>
                    
                    <!-- Botón de acción -->
                    <div class="mt-auto pt-2 align-self-end">
                        <button type="button" 
                                class="btn bg-info-subtle btn-sm rounded-pill w-80 py-2 d-flex align-items-center justify-content-center"
                                onclick='mostrarModal(${JSON.stringify(mascota)})'>
                            <i class="fas fa-info-circle me-2"></i>
                            Más información
                        </button>
                    </div>
                </div>
            </div>
        `;
      
        contenedor.appendChild(tarjeta);
        tarjeta.querySelector(`#img-container-${id}`).appendChild(imagen);
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


