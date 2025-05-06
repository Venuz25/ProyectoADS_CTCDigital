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
    document.getElementById("estacion").value = mascota.estacion || "";

    document.querySelector("select[name='sexo']").value = mascota.sexo || "";
    document.querySelector("input[name='edad']").value = mascota.edad || "";

    document.querySelector("select[name='tamano']").value = mascota.tamaño || "";
    document.getElementById("selectRaza").value = mascota.raza || "";

    document.querySelector("textarea[name='caractFisica']").value = mascota.caractFisica || "";
    document.querySelector("textarea[name='estadoSalud']").value = mascota.estadoSalud || "";
    document.querySelector("textarea[name='descripcion']").value = mascota.descripcion || "";

    // Limpiar galería anterior (si la estás usando dinámicamente)
    document.getElementById("galeriaMascota").innerHTML = "";

    // Mostrar el modal (Bootstrap 5)
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}


  
