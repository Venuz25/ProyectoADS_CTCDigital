window.addEventListener('DOMContentLoaded', () => {
    fetch('/ProyectoADS_CTCDigital/src/backend/adoptados.php')
        .then(async response => {
            console.log('Status:', response.status);
            const text = await response.text();
            console.log('Raw response:', text);
            return JSON.parse(text);
        })
      .then(data => {
        const contenedor = document.getElementById('contenedorAdoptados');
        data.forEach(mascota => {
          const extensiones = ['jpeg', 'jpg', 'png', 'webp'];
          const id = mascota.idMascota;
          let imagenCargada = false;
          const tarjeta = document.createElement('div');
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
            <div class="card shadow-sm border-0 rounded-4 overflow-hidden h-100">
                <!-- Encabezado con imagen -->
                <div id="img-container-${id}" class="position-relative">
                    <div class="position-absolute bottom-0 start-0 w-100 p-3" style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
                        <h3 class="text-white mb-0">${mascota.nombre}</h3>
                        <span class="badge bg-success rounded-pill">
                            <i class="fas fa-heart me-1"></i> Adoptado
                        </span>
                    </div>
                </div>
                
                <!-- Cuerpo de la tarjeta -->
                <div class="card-body d-flex flex-column">
                    <!-- Detalle de adopción -->
                    <div class="alert bg-success bg-opacity-10 border border-success border-opacity-25 text-success py-2 px-3 mb-3 rounded-3">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-home-heart fs-4 me-3"></i>
                            <div>
                                <p class="mb-0 fw-semibold text-black">¡${mascota.nombre} encontró su hogar!</p>
                                <small class="d-block">Ahora disfruta de una nueva vida con su familia</small>
                            </div>
                        </div>
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