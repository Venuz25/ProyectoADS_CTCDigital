document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.folder-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    let mascotasOriginal = [];
    let solicitudesOriginal = [];
    let reportesOriginal = [];
    let donacionesOriginal = [];
    let administradoresOriginal = [];

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // ========== CARGA DE DATOS ==========
    fetch('/ProyectoADS_CTCDigital/src/backend/admin/getDatos.php')
        .then(res => res.json())
        .then(data => {
            mascotasOriginal = data.mascotas;
            solicitudesOriginal = data.solicitudes;
            reportesOriginal = data.reportes;
            donacionesOriginal = data.donaciones;
            administradoresOriginal = data.administradores;

            cargarMascotas(mascotasOriginal);
            cargarAdmin(administradoresOriginal);
            cargarReportes(reportesOriginal);
            cargarDonaciones(donacionesOriginal);
            cargarSolicitudes(solicitudesOriginal);
        })
        .catch(err => console.error('Error al cargar datos:', err));

    // ========== CARGA DE LAS TABLAS ==========
    {
        //muestra la tabla de mascotas 
        function cargarMascotas(mascotas) {
            const tabla = document.getElementById('tablaMascotas');
            tabla.innerHTML = '';
            if (mascotas.length === 0) {
                tabla.innerHTML = `<tr><td colspan="6" class="text-center py-4">No hay mascotas registradas.</td></tr>`;
                return;
            }
            mascotas.forEach(m => {
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
        }

        //muestra la tabla de reportes 
        function cargarReportes(reportes) {
            const tabla = document.getElementById('tablaReportes');
            if (!tabla) return;
            tabla.innerHTML = '';
            reportes.forEach(r => {
                tabla.innerHTML += `
                    <tr>
                        <td>${r.idReporte}</td>
                        <td>${r.nombreReportante}</td>
                        <td>${r.estacion}</td>
                        <td>${r.estadoReporte}</td>
                        <td>${r.fechaReporte}</td>
                        <td>
                            <button class="btn btn-info btn-sm me-2 view-btn" data-id="${r.idReporte}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${r.idReporte}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        }

        //muestra la tabla de donaciones 
        function cargarDonaciones(donaciones) {
            const tabla = document.getElementById('tablaDonaciones');
            if (!tabla) return;
            tabla.innerHTML = '';
            donaciones.forEach(d => {
                tabla.innerHTML += `
                    <tr>
                        <td>${d.idDonacion}</td>
                        <td>${d.nombreDonante}</td>
                        <td>${d.tipo}</td>
                        <td>${d.estadoDonacion}</td>
                        <td>${d.fechaDonacion}</td>
                        <td>${d.fechaPrevistaDon}</td>
                        <td>
                            <button class="btn btn-info btn-sm me-2 view-btn" data-id="${d.idDonacion}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${d.idDonacion}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        }

        //muestra la tabla de solicitudes 
        function cargarSolicitudes(solicitudes) {
            const tabla = document.getElementById('tablaSolicitudes');
            if (!tabla) return;
            tabla.innerHTML = '';
            solicitudes.forEach(s => {
                tabla.innerHTML += `
                    <tr>
                        <td>${s.idSolicitud}</td>
                        <td>${s.nombreAdoptante}</td>
                        <td>${s.nombreMascota}</td>
                        <td>${s.estadoAdopcion}</td>
                        <td>${s.fechaSolicitud}</td>
                        <td>
                            <button class="btn btn-info btn-sm me-2 view-btn" data-id="${s.idSolicitud}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${s.idSolicitud}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        }

        //muestra la tabla de administradores 
        function cargarAdmin(administradores) {
            const tabla = document.getElementById('tablaAdmin');
            if (!tabla) return;
            tabla.innerHTML = '';
            administradores.forEach(a => {
                tabla.innerHTML += `
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.usuario}</td>
                        <td>${a.contraseña}</td>
                        <td>${a.ultimaConn}</td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${a.id}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        }
    }

    // ========== FILTROS ==========
    {
        //filtros de mascotas
        document.getElementById("aplicarFiltros").addEventListener("click", function () {
            const estado = document.getElementById("filtroEstado").value;
            const orden = document.getElementById("filtroFecha").value;

            let filtradas = [...mascotasOriginal];

            if (estado !== "all") {
                filtradas = filtradas.filter(m => m.estadoAdopcion.toLowerCase() === estado);
            }

            if (orden !== "sf") {
                if (orden === "asc") {
                    filtradas.sort((a, b) => new Date(a.fechaIngreso) - new Date(b.fechaIngreso));
                } else if (orden === "desc") {
                    filtradas.sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso));
                }
            }
            
            cargarMascotas(filtradas);
        });

        //filtros de solicitudes
        document.getElementById("aplicarFiltrosSolicitud").addEventListener("click", function () {
            const estado = document.getElementById("filtroEstadoSolicitud").value;
            const orden = document.getElementById("filtroFechaSolicitud").value;
        
            let filtradas = [...solicitudesOriginal];
        
            if (estado !== "all") {
                filtradas = filtradas.filter(s => s.estadoAdopcion.toLowerCase() === estado);
            }
        
            if (orden !== "sf") {
                if (orden === "asc") {
                    filtradas.sort((a, b) => new Date(a.fechaSolicitud) - new Date(b.fechaSolicitud));
                } else if (orden === "desc") {
                    filtradas.sort((a, b) => new Date(b.fechaSolicitud) - new Date(a.fechaSolicitud));
                }
            }
        
            cargarSolicitudes(filtradas);
        });

        //filtros de reportes
        document.getElementById("aplicarFiltrosReporte").addEventListener("click", function () {
            const estado = document.getElementById("filtroEstadoReporte").value;
            const orden = document.getElementById("filtroFechaReporte").value;
        
            let filtradas = [...reportesOriginal];
        
            if (estado !== "all") {
                filtradas = filtradas.filter(r => r.estadoReporte.toLowerCase() === estado);
            }
        
            if (orden === "asc") {
                filtradas.sort((a, b) => new Date(a.fechaReporte) - new Date(b.fechaReporte));
            } else if (orden === "desc") {
                filtradas.sort((a, b) => new Date(b.fechaReporte) - new Date(a.fechaReporte));
            }
        
            cargarReportes(filtradas);
        });

        //filtros de donaciones
        document.getElementById("aplicarFiltrosDonacion").addEventListener("click", function () {
            const estado = document.getElementById("filtroEstadoDonacion").value;
            const tipo = document.getElementById("filtroTipoDonacion").value;
            const orden = document.getElementById("filtroFechaDonacion").value;
            const fecha = document.getElementById("filtroFechaPrevista").value;
        
            let filtradas = [...donacionesOriginal];
        
            if (estado !== "all") {
                filtradas = filtradas.filter(d => d.estadoDonacion.toLowerCase() === estado);
            }

            if (tipo !== "all") {
                filtradas = filtradas.filter(d => d.tipo.toLowerCase() === tipo);
            }
            
            if (orden !== "sf") {
                if (orden === "asc") {
                    filtradas.sort((a, b) => new Date(a.fechaDonacion) - new Date(b.fechaDonacion));
                } else if (orden === "desc") {
                    filtradas.sort((a, b) => new Date(b.fechaDonacion) - new Date(a.fechaDonacion));
                }
            }

            if (fecha !== "sf") {
                if (fecha === "asc") {
                    filtradas.sort((a, b) => new Date(a.fechaPrevistaDon) - new Date(b.fechaPrevistaDon));
                } else if (fecha === "desc") {
                    filtradas.sort((a, b) => new Date(b.fechaPrevistaDon) - new Date(a.fechaPrevistaDon));
                }
            }
        
            cargarDonaciones(filtradas);
        });
        
        //filtros de administradores
        document.getElementById("aplicarFiltrosAdmin").addEventListener("click", function () {
            const orden = document.getElementById("filtroConexion").value;
        
            let filtradas = [...administradoresOriginal];
        
            if (orden !== "sf") {
                if (orden === "asc") {
                    filtradas.sort((a, b) => new Date(a.ultimaConn) - new Date(b.ultimaConn));
                } else if (orden === "desc") {
                    filtradas.sort((a, b) => new Date(b.ultimaConn) - new Date(a.ultimaConn));
                }
            }
            cargarAdmin(filtradas);
        });
    }
    
    // ========== ELIMINAR ELEMENTOS ==========
    {
        let idEliminar = null;
        let tipoEliminar = null;

        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.delete-btn');
            if (btn) {
                idEliminar = btn.getAttribute('data-id');
                
                // Detecta a qué tabla pertenece
                const fila = btn.closest('tr');
                if (fila.closest('#tablaMascotas')) tipoEliminar = 'mascota';
                else if (fila.closest('#tablaSolicitudes')) tipoEliminar = 'solicitud';
                else if (fila.closest('#tablaReportes')) tipoEliminar = 'reporte';
                else if (fila.closest('#tablaDonaciones')) tipoEliminar = 'donacion';
                else if (fila.closest('#tablaAdmin')) tipoEliminar = 'admin';

                // Muestra el modal
                const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
                modal.show();
            }
        });

        document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
            if (!idEliminar || !tipoEliminar) return;

            fetch('/ProyectoADS_CTCDigital/src/backend/admin/deleteDatos.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${encodeURIComponent(idEliminar)}&tipo=${encodeURIComponent(tipoEliminar)}`
            })        
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Filtra del arreglo local
                    if (tipoEliminar === 'mascota') {
                        mascotasOriginal = mascotasOriginal.filter(m => m.idMascota !== idEliminar);
                        cargarMascotas(mascotasOriginal);
                    } else if (tipoEliminar === 'solicitud') {
                        solicitudesOriginal = solicitudesOriginal.filter(s => s.idSolicitud !== idEliminar);
                        cargarSolicitudes(solicitudesOriginal);
                    } else if (tipoEliminar === 'reporte') {
                        reportesOriginal = reportesOriginal.filter(r => r.idReporte !== idEliminar);
                        cargarReportes(reportesOriginal);
                    } else if (tipoEliminar === 'donacion') {
                        donacionesOriginal = donacionesOriginal.filter(d => d.idDonacion !== idEliminar);
                        cargarDonaciones(donacionesOriginal);
                    } else if (tipoEliminar === 'admin') {
                        administradoresOriginal = administradoresOriginal.filter(a => a.id !== idEliminar);
                        cargarAdmin(administradoresOriginal);
                    }

                    bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')).hide();
                } else {
                    alert('Error al eliminar: ' + data.message);
                }
            })
            .catch(err => {
                console.error('Error al eliminar:', err);
                alert('Ocurrió un error al intentar eliminar el registro.');
            });
        });
    }

    // ========== AGREGAR ELEMENTOS ==========
    {






    }
    












});
