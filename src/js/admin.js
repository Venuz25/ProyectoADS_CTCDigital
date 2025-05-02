document.addEventListener('DOMContentLoaded', function() {
    // ========== FUNCIONALIDAD DE SOLAPAS ==========
    const tabs = document.querySelectorAll('.folder-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover clase active de todas las pestañas y contenidos
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Agregar clase active a la pestaña y contenido seleccionados
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Asegurar que la solapa activa sea visible (para móviles)
            this.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        });
    });
    
    // ========== FUNCIONALIDAD DE FILTROS ==========
    const aplicarFiltrosBtn = document.getElementById('aplicarFiltros');
    
    if(aplicarFiltrosBtn) {
        aplicarFiltrosBtn.addEventListener('click', function() {
            const estado = document.getElementById('filtroEstado').value;
            const fecha = document.getElementById('filtroFecha').value;
            
            console.log(`Filtrando por estado: ${estado}, orden: ${fecha}`);
            // Aquí iría la lógica real de filtrado
        });
    }
    
    // ========== FUNCIONALIDAD DE ELIMINACIÓN ==========
    document.addEventListener('click', function(e) {
        if(e.target.closest('.delete-btn')) {
            const btn = e.target.closest('.delete-btn');
            const id = btn.getAttribute('data-id');
            const nombre = btn.closest('tr').querySelector('td:nth-child(2)').textContent;
            
            document.getElementById('mascotaAEliminar').textContent = `Mascota: ${nombre} (ID: ${id})`;
            
            const deleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            deleteModal.show();
            
            document.getElementById('confirmDeleteBtn').setAttribute('data-id', id);
        }
        
        if(e.target.id === 'confirmDeleteBtn') {
            const id = e.target.getAttribute('data-id');
            console.log(`Eliminando mascota con ID: ${id}`);
            
            // Aquí iría la llamada AJAX para eliminar
            // Simulación de eliminación:
            const row = document.querySelector(`.delete-btn[data-id="${id}"]`).closest('tr');
            row.style.opacity = '0';
            setTimeout(() => row.remove(), 300);
            
            const deleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
            deleteModal.hide();
            
            // Mostrar notificación
            alert('Mascota eliminada correctamente');
        }
    });

    // ========== CARGA DE MASCOTAS DINÁMICAMENTE ==========
    cargarMascotas();

    function cargarMascotas() {
        fetch('/ProyectoADS_CTCDigital/src/backend/admin/getDatos.php')
            .then(response => response.json())
            .then(data => {
                const tabla = document.getElementById('tablaMascotas');
                tabla.innerHTML = ''; 

                if (data.length === 0) {
                    tabla.innerHTML = `<tr><td colspan="6" class="text-center py-4">No hay mascotas registradas.</td></tr>`;
                    return;
                }

                data.forEach(m => {
                    tabla.innerHTML += `
                        <tr>
                            <td>${m.idMascota}</td>
                            <td>${m.nombre}</td>
                            <td>${m.estadoAdopcion}</td>
                            <td>${m.fechaIngreso}</td>
                            <td>${m.estacion || 'No registrada'}</td>
                            <td>
                                <button class="btn btn-info btn-sm me-2 view-btn" data-id="${m.idMascota}">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${m.idMascota}">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });
            })
            .catch(error => {
                console.error('Error al cargar mascotas:', error);
            });
    }
    
    // ========== CARGA DE DATOS EN MODAL ==========
    const detailModal = document.getElementById('detailModal');
    if(detailModal) {
        detailModal.addEventListener('show.bs.modal', function() {
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="row">
                    <div class="col-md-4 text-center">
                        <img src="https://via.placeholder.com/200" class="img-fluid rounded mb-3" alt="Foto mascota">
                    </div>
                    <div class="col-md-8">
                        <h4>Detalles completos</h4>
                        <p><strong>ID:</strong> M001</p>
                        <p><strong>Nombre:</strong> Firulais</p>
                        <p><strong>Tipo:</strong> Perro</p>
                        <p><strong>Estado:</strong> <span class="status-badge status-available">Disponible</span></p>
                        <p><strong>Fecha ingreso:</strong> 15/06/2023</p>
                        <p><strong>Descripción:</strong> Información detallada de la mascota...</p>
                    </div>
                </div>
            `;
        });
    }
    
});