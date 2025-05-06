  
document.addEventListener('DOMContentLoaded', () => {  
    fetch("src/componentes/modalInfo.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("modalesInfo").innerHTML = html;
    }); 
}); 

document.addEventListener("click", async function(e) {
    if (e.target.closest(".view-btn")) {
        const btn = e.target.closest(".view-btn");
        const id = btn.dataset.id;
        const type = btn.dataset.type;
    
        if (!document.getElementById("modalMascotaDetalle")) {
        await fetch("componentes/modalInfo.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("modalesInfo").innerHTML = html;
                console.log("Modal cargado:", document.getElementById("modalMascotaDetalle")); 
        });
        }
    
        // Muestra el modal adecuado y carga su información
        if (type === "mascota") {
        mostrarModalMascota(id);
        } else if (type === "solicitud") {
        mostrarModalSolicitud(id);
        } else if (type === "reporte") {
        mostrarModalReporte(id);
        } else if (type === "donacion") {
        mostrarModalDonacion(id);
        }
    }
});

// ===================== MODAL MASCOTA =====================
async function mostrarModalMascota(id) {
    try {
        const response = await fetch("backend/admin/getDatos.php");              ;
        const data = await response.json();
        const mascota = data.mascotas.find(m => m.idMascota === id);
    
        if (!mascota) return alert("Mascota no encontrada");
        
        // Mostrar modal con Bootstrap
        const modal = new bootstrap.Modal(document.getElementById("modalMascotaDetalle"));
        modal.show();
    } catch (error) {
        console.error("Error al mostrar la mascota:", error);
    }
}  
