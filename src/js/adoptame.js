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
          const imagen = `/ProyectoADS_CTCDigital/mascotas/${mascota.idMascota}/principal.jpg`;
          const tarjeta = document.createElement('div');
          tarjeta.classList.add('col');

          //Contenido de la tarjeta
          tarjeta.innerHTML = `
            <div class="card shadow-sm border-0 rounded-4">
                <img src="${imagen}" class="card-img-top rounded-top-4" style="height: 225px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title fw-bold text-primary mb-2">${mascota.nombre}</h5>
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
    contenedor.innerHTML = `
      <div id="carousel${mascota.idMascota}" class="carousel slide mb-3" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/ProyectoADS_CTCDigital/recursos/perritos.gif" class="d-block w-100" style="height: 400px; object-fit: cover;">
          </div>
          <!-- Agrega otras imágenes/videos si las tienes -->
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${mascota.idMascota}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel${mascota.idMascota}" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
      <p><strong>🐶 Nombre:</strong> ${mascota.nombre}</p>
      <p><strong>🚇 Estación:</strong> ${mascota.estacionMetro}</p>
      <p><strong>📅 Fecha de ingreso:</strong> ${mascota.fechaIngreso}</p>
      <p><strong>🎂 Edad:</strong> ${mascota.edad}</p>
      <p><strong>🧬 Sexo:</strong> ${mascota.sexo}</p>
      <p><strong>🐕 Raza:</strong> ${mascota.raza}</p>
      <p><strong>📏 Tamaño:</strong> ${mascota.tamaño}</p>
      <p><strong>🩺 Salud:</strong> ${mascota.estadoSalud}</p>
      <p><strong>🎨 Características físicas:</strong> ${mascota.caractFisica}</p>
      <p><strong>📝 Descripción:</strong> ${mascota.descripcion}</p>
    `;
    document.getElementById('btnAdoptar').href = "/ProyectoADS_CTCDigital/src/formsAdoptame.html";
    new bootstrap.Modal(document.getElementById('modalInfoMascota')).show();
  }
  
  