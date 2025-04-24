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
          const imagen = `/ProyectoADS_CTCDigital/mascotas/${mascota.idMascota}/principal.jpeg`;
          const tarjeta = document.createElement('div');
          tarjeta.classList.add('col');
  
          //Contenido de la tarjeta
          tarjeta.innerHTML = `
            <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
            <img src="${imagen}" class="card-img-top rounded-top-4" style="height: 225px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title fw-bold mb-1">${mascota.nombre}</h5>              
                <div class="alert alert-success py-2 px-3 mb-0 rounded-3" role="alert" style="font-size: 0.95rem;">
                ❤️ ¡${mascota.nombre} ya está disfrutando de una nueva vida con su familia adoptiva!
                </div>
            </div>
            </div>
          `;
          contenedor.appendChild(tarjeta);
        });
      })
    .catch(error => console.error('Error al cargar los datos:', error));
  });