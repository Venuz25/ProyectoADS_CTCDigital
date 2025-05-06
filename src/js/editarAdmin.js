let datosGlobales = {};

document.addEventListener('DOMContentLoaded', async () => {  
    const res = await fetch("src/componentes/modalInfo.html");
    const html = await res.text();
    document.getElementById("modalesInfo").innerHTML = html;

    const response = await fetch("backend/admin/getDatos.php"); 
    datosGlobales = await response.json(); 
});


document.addEventListener("click", async function(e) {
    if (e.target.closest(".view-btn")) {
        const btn = e.target.closest(".view-btn");
        const id = btn.dataset.id;
        const type = btn.dataset.type;
    
        if (!document.getElementById("modalMascotaDetalle")) {
            const res = await fetch("componentes/modalInfo.html");
            const html = await res.text();
            document.getElementById("modalesInfo").innerHTML = html;
        }

        // Muestra el modal adecuado y carga su información
        if (type === "mascota") {
            const mascota = datosGlobales.mascotas.find(m => m.idMascota == id);
            mostrarModalMascota(mascota);
        } else if (type === "solicitud") {
            const solicitud = datosGlobales.solicitudes.find(s => s.idSolicitud == id);
            mostrarModalSolicitud(solicitud);
        } else if (type === "reporte") {
            const reporte = datosGlobales.reportes.find(r => r.idReporte == id);
            mostrarModalReporte(reporte);
        } else if (type === "donacion") {
            const donacion = datosGlobales.donaciones.find(d => d.idDonacion == id);
            mostrarModalDonacion(donacion);
        }
    }
});

// Mostrar modal de mascota
function mostrarModalMascota(mascota) {
    const modal = document.getElementById("modalMascotaDetalle");
    if (!modal) {
        console.error("No se encontró el modal.");
        return;
    }

    // Prellenar campos del formulario
    document.getElementById("nombre").value = mascota.nombre || "";
    document.getElementById("Ingreso").value = mascota.fechaIngreso || "";
    document.getElementById("estadoAdopcion").value = mascota.estadoAdopcion || "No disponible";
    document.getElementById("selectSolicitud").value = mascota.solicitudes || "Sin solicitud";
    
    document.getElementById("lineaMetro").value = mascota.linea || "";
    document.getElementById("estacionMetro").value = mascota.estacion || "";

    document.querySelector("select[name='sexoObtenido']").value = mascota.sexo || "";
    document.querySelector("input[name='edadObtenido']").value = mascota.edad || "";

    document.querySelector("select[name='tamanoObtenido']").value = mascota.tamaño || "";
    document.getElementById("raza").value = mascota.raza || "";

    document.querySelector("textarea[name='caractFisicaObtenido']").value = mascota.caractFisica || "";
    document.querySelector("textarea[name='estadoSaludObtenido']").value = mascota.estadoSalud || "";
    document.querySelector("textarea[name='descripcionObtenido']").value = mascota.descripcion || "";

    mostrarGaleria(mascota);

    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

// ========================== MODAL DE MASCOTA ==========================
{
    let imagenesAEliminar = []; 
    let nuevasImagenes = [];

    // Mostrar modal de mascota
    function mostrarModalMascota(mascota) {
        const modal = document.getElementById("modalMascotaDetalle");
        if (!modal) {
            console.error("No se encontró el modal.");
            return;
        }

        // Guardar el ID de la mascota
        currentMascotaId = mascota.id;

        // Prellenar campos del formulario
        document.getElementById("nombre").value = mascota.nombre || "";
        document.getElementById("Ingreso").value = mascota.fechaIngreso || "";

        document.querySelector("select[name='estadoObtenido']").value =  mascota.estadoAdopcion || "no disponible";
        document.getElementById("selectSolicitud").value = mascota.solicitudes || "Sin solicitud";
        
        document.getElementById("lineaMetro").value = mascota.linea || "";
        document.getElementById("estacionMetro").value = mascota.estacion || "";

        document.querySelector("select[name='sexoObtenido']").value = mascota.sexo || "";
        document.querySelector("input[name='edadObtenido']").value = mascota.edad || "";

        document.querySelector("select[name='tamanoObtenido']").value = mascota.tamaño || "";
        document.getElementById("raza").value = mascota.raza || "";

        document.querySelector("textarea[name='caractFisicaObtenido']").value = mascota.caractFisica || "";
        document.querySelector("textarea[name='estadoSaludObtenido']").value = mascota.estadoSalud || "";
        document.querySelector("textarea[name='descripcionObtenido']").value = mascota.descripcion || "";

        // Mostrar galería
        mostrarGaleria(mascota);

        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }

    // Guardar cambios
    async function guardarCambios() {
        const formData = new FormData();
        
        // Datos básicos
        formData.append('idMascota', mascotaId);
        formData.append('datosMascota', JSON.stringify({
            estadoAdopcion: document.getElementById('estado').value
        }));
        
        formData.append('datosDetalles', JSON.stringify({
            edad: document.querySelector('input[name="edadObtenido"]').value,
            sexo: document.querySelector('select[name="sexoObtenido"]').value,
            tamaño: document.querySelector('select[name="tamanoObtenido"]').value,
            caractFisica: document.querySelector('textarea[name="caractFisicaObtenido"]').value,
            estadoSalud: document.querySelector('textarea[name="estadoSaludObtenido"]').value,
            descripcion: document.querySelector('textarea[name="descripcionObtenido"]').value
        }));
        
        // Imágenes a eliminar
        formData.append('imagenesAEliminar', JSON.stringify(imagenesAEliminar));
        
        // Nuevas imágenes
        const inputFiles = document.getElementById('inputFotosMascota').files;
        for (let i = 0; i < inputFiles.length; i++) {
            formData.append('nuevasImagenes[]', inputFiles[i]);
        }
    
        try {
            const response = await fetch('guardarCambios.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.message);
            }
            
            alert('Cambios guardados exitosamente');
            location.reload();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar cambios: ' + error.message);
        }
    }

    // Mostrar galería de imágenes
    function mostrarGaleria(mascota) {
        const galeria = document.getElementById("galeriaMascotaModal");
        if (!galeria) {
            console.error("No se encontró el elemento galeriaMascotaModal");
            return;
        }
        
        galeria.innerHTML = "";
        imagenesAEliminar = [];
    
        if (mascota.imagenes && mascota.imagenes.length > 0) {
            mascota.imagenes.forEach((ruta, index) => {
                const galleryItem = document.createElement("div");
                galleryItem.className = "gallery-item position-relative me-2";
                galleryItem.style.flex = "0 0 auto";
                galleryItem.style.width = "auto";
                
                const img = document.createElement("img");
                img.src = ruta.startsWith('http') ? ruta : `http://localhost/ProyectoADS_CTCDigital/${ruta.replace('ProyectoADS_CTCDigital/', '')}`;
                img.alt = `Imagen ${index + 1} de ${mascota.nombre || 'mascota'}`;
                img.className = "img-fluid rounded h-100 w-100";
                img.style.objectFit = "cover";
                img.style.maxHeight = "150px";
            
                // Botón para eliminar
                const deleteBtn = document.createElement("button");
                deleteBtn.className = "btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-0 deleteBoton";
                deleteBtn.style.width = "24px";
                deleteBtn.style.height = "24px";
                deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                deleteBtn.title = "Eliminar imagen";
                
                // Evento para marcar la imagen para eliminación
                deleteBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Marcar visualmente
                    galleryItem.style.opacity = "0.5";
                    galleryItem.style.border = "2px dashed #dc3545";
                    deleteBtn.disabled = true;
                    
                    // Agregar al array de eliminación
                    if (!imagenesAEliminar.includes(ruta)) {
                    imagenesAEliminar.push(ruta);
                    console.log('Imágenes marcadas para eliminar:', imagenesAEliminar);
                    }
                });
                
                galleryItem.appendChild(img);
                galleryItem.appendChild(deleteBtn);
                galeria.appendChild(galleryItem);
            });
        } else {
            // Mostrar mensaje cuando no hay imágenes
            const emptyMsg = document.createElement("div");
            emptyMsg.className = "text-center py-4 w-100";
            emptyMsg.innerHTML = `
            <i class="fas fa-image fa-2x mb-2 text-muted"></i>
            <p class="text-muted">No hay imágenes disponibles</p>
            `;
            galeria.appendChild(emptyMsg);
        }
    }
    
    // Añadir imágenes
    function procesarNuevasImagenes(input) {
        const galeria = document.getElementById("galeriaMascotaModal");
        if (!input.files || !galeria) return;
    
        const emptyMsg = galeria.querySelector(".text-center");
        if (emptyMsg) emptyMsg.remove();
    
        // Procesar cada archivo seleccionado
        Array.from(input.files).forEach(file => {
            if (!file.type.startsWith('image/')) return;
    
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgContainer = document.createElement("div");
                imgContainer.className = "gallery-item position-relative me-2";
                imgContainer.style.width = "150px";
                
                imgContainer.innerHTML = `
                    <img src="${e.target.result}" class="img-fluid rounded" style="height:150px; object-fit:cover">
                    <span class="badge bg-success position-absolute top-0 start-0">Nueva</span>
                    <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-0 deleteBoton" onclick="removerImagenNueva(this)">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                galeria.appendChild(imgContainer);
                nuevasImagenes.push({
                    file,
                    element: imgContainer
                });
            };
            reader.readAsDataURL(file);
        });
    }
    
    // Eliminar imagen nueva
    function removerImagenNueva(button) {
        const imgContainer = button.closest('.gallery-item');
        const index = nuevasImagenes.findIndex(img => img.element === imgContainer);
        
        if (index !== -1) {
            nuevasImagenes.splice(index, 1);
            imgContainer.remove();
        }
    }
    
    // Obtener imágenes procesadas
    function obtenerImagenesProcesadas() {
        return {
            paraEliminar: [...imagenesAEliminar],  // Rutas de imágenes existentes a eliminar
            nuevas: nuevasImagenes.map(img => img.file)  // Archivos de imágenes nuevas
        };
    }

}
  
