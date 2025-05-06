//========== ESTILO LINEAS METRO==========
{
    //colores de las líneas del metro
    const coloresLineas = {
        "L1": "#F7226F",  // Rosa
        "L2": "#0054A6",  // Azul
        "L3": "#6DBA45",  // Verde olivo
        "L4": "#00A9E0",  // Cian
        "L5": "#FFD100",  // Amarillo
        "L6": "#E5451F",  // Rojo
        "L7": "#F7921E",  // Naranja
        "L8": "#00A261",  // Verde
        "L9": "#A67C52",  // Café
        "LA": "#8F4B9B",  // Morado
        "LB": "#7E878D",  // Verde y Gris
        "L12": "#D5A021"  // Oro
    };

    // Mapeo de líneas a estaciones
    const estacionesPorLinea = {
        "L1": ["Observatorio", "Tacubaya", "Juanacatlán", "Chapultepec", "Sevilla", "Insurgentes", "Cuauhtémoc", 
            "Balderas", "Salto del Agua", "Isabel la Católica", "Pino Suárez", "Merced", "Candelaria", 
            "San Lázaro", "Moctezuma", "Balbuena", "Boulevard Puerto Aéreo", "Gómez Farías", "Zaragoza", "Pantitlán"],
        "L2": ["Cuatro Caminos", "Panteones", "Tacuba", "Cuitláhuac", "Popotla", "Colegio Militar", "Normal", 
            "San Cosme", "Revolución", "Hidalgo", "Bellas Artes", "Allende", "Zócalo", "Pino Suárez", 
            "San Antonio Abad", "Chabacano", "Viaducto", "Xola", "Villa de Cortés", "Nativitas", 
            "Portales", "Ermita", "General Anaya", "Tasqueña"],
        "L3": ["Indios Verdes", "Deportivo 18 de Marzo", "Potrero", "La Raza", "Tlatelolco", "Guerrero", 
            "Hidalgo", "Juárez", "Balderas", "Niños Héroes", "Hospital General", "Centro Médico", 
            "Etiopía", "Eugenia", "División del Norte", "Zapata", "Coyoacán", "Viveros", "Miguel Ángel de Quevedo", 
            "Copilco", "Universidad"],
        "L4": ["Martín Carrera", "Talismán", "Bondojito", "Consulado", "Canal del Norte", "Morelos", 
            "Candelaria", "Fray Servando", "Jamaica", "Santa Anita"],
        "L5": ["Politécnico", "Instituto del Petróleo", "Autobuses del Norte", "La Raza", "Misterios", 
            "Valle Gómez", "Consulado", "Eduardo Molina", "Aragón", "Oceanía", "Terminal Aérea", "Hangares", 
            "Pantitlán"],
        "L6": ["El Rosario", "Tezozómoc", "UAM Azcapotzalco", "Ferrería", "Norte 45", "Vallejo", 
            "Instituto del Petróleo", "Lindavista", "Deportivo 18 de Marzo", "La Villa-Basílica", "Martín Carrera"],
        "L7": ["El Rosario", "Aquiles Serdán", "Camarones", "Refinería", "Tacuba", "San Joaquín", 
            "Polanco", "Auditorio", "Constituyentes", "Tacubaya", "San Pedro de los Pinos", "San Antonio", 
            "Mixcoac", "Barranca del Muerto"],
        "L8": ["Garibaldi", "Bellas Artes", "San Juan de Letrán", "Salto del Agua", "Doctores", "Obrera", 
            "Chabacano", "La Viga", "Santa Anita", "Coyuya", "Iztacalco", "Apatlaco", "Aculco", 
            "Escuadrón 201", "Atlalilco", "Iztapalapa", "Cerro de la Estrella", "UAM-I", "Constitución de 1917"],
        "L9": ["Tacubaya", "Patriotismo", "Chilpancingo", "Centro Médico", "Lázaro Cárdenas", "Chabacano", 
            "Jamaica", "Mixiuhca", "Velódromo", "Ciudad Deportiva", "Puebla", "Pantitlán"],
        "LA": ["Pantitlán", "Agrícola Oriental", "Canal de San Juan", "Tepalcates", "Guelatao", "Peñón Viejo", 
            "Acatitla", "Santa Marta", "Los Reyes", "La Paz"],
        "LB": ["Buenavista", "Guerrero", "Garibaldi", "Lagunilla", "Tepito", "Morelos", "San Lázaro", 
            "Flores Magón", "Romero Rubio", "Oceanía", "Deportivo Oceanía", "Bosque de Aragón", "Villa de Aragón", 
            "Nezahualcóyotl", "Impulsora", "Río de los Remedios", "Muzquiz", "Ecatepec", "Olímpica", "Plaza Aragón", 
            "Ciudad Azteca"],
        "L12": ["Mixcoac", "Insurgentes Sur", "Hospital 20 de Noviembre", "Zapata", "Parque de los Venados", 
            "Eje Central", "Ermita", "Mexicaltzingo", "Atlalilco", "Culhuacán", "San Andrés Tomatlán", 
            "Lomas Estrella", "Calle 11", "Periférico Oriente", "Tezonco", "Olivos", "Nopalera", "Zapotitlán", 
            "Tlaltenco", "Tláhuac"],
    };
    
    // Manejar el cambio de línea para actualizar estaciones
    document.getElementById('linea').addEventListener('change', function() {
        const lineaSeleccionada = this.value;
        const estacionSelect = document.getElementById('estacion');
        
        if (lineaSeleccionada) {
            document.querySelector('.select-header').style.setProperty('--line-color', coloresLineas[lineaSeleccionada]);
            
            estacionSelect.innerHTML = '<option value="" selected disabled>Selecciona una estación</option>';
            estacionesPorLinea[lineaSeleccionada].forEach(estacion => {
            const option = document.createElement('option');
            option.value = estacion;
            option.textContent = estacion;
            estacionSelect.appendChild(option);
            });
            estacionSelect.disabled = false;
        } else {
            estacionSelect.innerHTML = '<option value="" selected disabled>Primero selecciona una línea</option>';
            estacionSelect.disabled = true;
        }
    });

    // Dibujar el select personalizado
    document.addEventListener('DOMContentLoaded', function() {
        const lineaSelect = document.getElementById('linea');
        
        const customSelect = document.createElement('div');
        customSelect.className = 'custom-select';
        customSelect.innerHTML = `
        <div class="select-header">
            <span class="selected-value"><i class="fas fa-subway me-2 py-1"></i>Línea</span>
            <span class="arrow">▼</span>
        </div>
        <div class="select-options"></div>
        `;
        
        lineaSelect.parentNode.insertBefore(customSelect, lineaSelect.nextSibling);
        
        const optionsContainer = customSelect.querySelector('.select-options');
        Array.from(lineaSelect.options).forEach(option => {
        if (option.value) {
            const div = document.createElement('div');
            div.className = 'custom-option';
            div.textContent = option.text;
            div.dataset.value = option.value;
            div.style.setProperty('--line-color', coloresLineas[option.value]);
            optionsContainer.appendChild(div);
        }
        });
    
        customSelect.querySelector('.select-header').addEventListener('click', function() {
        optionsContainer.classList.toggle('visible');
        });
    
        optionsContainer.querySelectorAll('.custom-option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.dataset.value;
            lineaSelect.value = value;
            customSelect.querySelector('.selected-value').textContent = this.textContent;
            optionsContainer.classList.remove('visible');
            
            document.getElementById('linea').dispatchEvent(new Event('change'));
        });
        });
    
        document.addEventListener('click', function(e) {
        if (!customSelect.contains(e.target)) {
            optionsContainer.classList.remove('visible');
        }
        });
    });
}

//========== CARGAR RAZAS ==========
{
    fetch("/ProyectoADS_CTCDigital/src/backend/admin/getRazas.php")
    .then(res => res.json())
    .then(data => {
        const selectRaza = document.querySelector("#selectRaza");
        const selectEspecieNueva = document.querySelector("#selectEspecieNueva");

        // Cargar razas
        data.razas.forEach(r => {
            const option = document.createElement("option");
            option.value = r.idRaza;
            option.textContent = `${r.especie === "Gato" ? "🐱" : r.especie === "Perro" ? "🐶" : ""} ${r.raza}`;
            selectRaza.appendChild(option);
        });

        // Cargar especies
        data.especies.forEach(e => {
            const option = document.createElement("option");
            option.value = e.idEspecie;
            option.textContent = e.nombre;
            selectEspecieNueva.appendChild(option);
        });
    });

    // Manejo de la visibilidad del input para nueva raza
    document.addEventListener("DOMContentLoaded", () => {
        const selectRaza = document.getElementById("selectRaza");
        const inputRazaNueva = document.getElementById("inputRazaNueva");

        // Escuchar cambios en el select
        selectRaza.addEventListener("change", () => {
            if (selectRaza.value === "nuevaRaza") {
                // Mostrar el input si se selecciona "Nueva raza"
                razaContainer.style.display = 'block';
            } else {
                // Ocultar el input si se selecciona cualquier otra opción
                razaContainer.style.display = 'none';
                inputRazaNueva.value = "";
            }
        });
    });

    document.querySelector("#btnCrearMascota").addEventListener("click", () => {
        const selectRaza = document.querySelector("#selectRaza");
        let razaFinal;

        if (selectRaza.value === "nuevaRaza") {
            razaFinal = document.querySelector("#inputRazaNueva").value.trim();
        } else {
            razaFinal = selectRaza.value;
        }

        if (razaFinal === "") {
            alert("Por favor, ingresa una raza válida.");
            return;
        }
    });
}

//========== OCULTAR CONTRASEÑA ADMINISTRADOR ==========
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('adminPassword');
    const icon = this.querySelector('i');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
});

//========== INICIALIZAR POPOVER ==========
document.addEventListener('DOMContentLoaded', function() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl, {
            container: 'body',
            html: true,
            trigger: 'hover focus',
            sanitize: false
        });
    });
});

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
                            <button class="btn btn-info btn-sm me-2 view-btn" data-id="${m.idMascota}" data-type="mascota">
                                <i class="fas fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${m.idMascota}" data-type="mascota">
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
                            <button class="btn btn-info btn-sm me-2 view-btn" data-id="${r.idReporte}" data-type="reporte">
                                <i class="fas fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${r.idReporte}" data-type="reporte">
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
                            <button class="btn btn-info btn-sm me-2 view-btn" data-id="${d.idDonacion}" data-type="donacion">
                                <i class="fas fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${d.idDonacion}" data-type="donacion">
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
                            <button class="btn btn-info btn-sm me-2 view-btn" data-id="${s.idSolicitud}" data-type="solicitud">
                                <i class="fas fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${s.idSolicitud}" data-type="solicitud">
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
                            <button class="btn btn-info btn-sm me-2 view-btn" data-id="${a.id}" data-type="admin">
                                <i class="fas fa-pencil"></i>
                            </button>
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
        //crear administrador
        document.getElementById("btnCrearAdmin").addEventListener("click", () => {
            const form = document.getElementById("formAdmin");
            if (!form.checkValidity()) return form.reportValidity();
        
            const formData = new FormData(form);
            formData.append("tipo", "admin");
        
            fetch("/ProyectoADS_CTCDigital/src/backend/admin/createDatos.php", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    form.reset();
                    bootstrap.Modal.getInstance(document.getElementById("modalAdmin")).hide();
                    
                    mostrarNotificacion(
                        'exito', 
                        '¡Administrador registrado!', 
                        'Registro exitoso', 
                        'El administrador se ha añadido al sistema correctamente.'
                    );
                    
                    fetch('/ProyectoADS_CTCDigital/src/backend/admin/getDatos.php')
                        .then(res => res.json())
                        .then(data => {
                            administradoresOriginal = data.administradores;
                            cargarAdmin(administradoresOriginal);
                        })
                        .catch(err => {
                            console.error('Error al actualizar datos:', err);
                            mostrarNotificacion(
                                'error',
                                'Error de actualización',
                                'No se pudo actualizar la lista',
                                'El administrador se registró pero no se pudo actualizar la vista.'
                            );
                        });
                } else {
                    const mensajeError = data.error === 'duplicate_user' 
                        ? 'El nombre de usuario ya está en uso' 
                        : data.message || 'Error al registrar administrador';
                    
                    mostrarNotificacion(
                        'error',
                        'Error al registrar',
                        'No se pudo registrar el administrador',
                        mensajeError
                    );
                }
            });            
        });        
        
        //crear mascota
        document.getElementById("btnCrearMascota").addEventListener("click", () => {
            const form = document.getElementById("formMascota");
            if (!form.checkValidity()) return form.reportValidity();
            
            const formData = new FormData(form);
            formData.append("tipo", "mascota");
            
            formData.append('linea', document.getElementById('linea').value);

            // Mostrar todos los campos en consola para depuración
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
        
            if (document.getElementById("selectRaza").value === "nuevaRaza") {
                formData.append("raza", "nuevaRaza");
                formData.append("razaNueva", document.getElementById("inputRazaNueva").value.trim());
            }
        
            fetch("/ProyectoADS_CTCDigital/src/backend/admin/createDatos.php", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    form.reset();
                    bootstrap.Modal.getInstance(document.getElementById("modalMascota")).hide();
                    
                    mostrarNotificacion(
                        'exito', 
                        '¡Mascota registrada!', 
                        'Registro exitoso', 
                        'La mascota se ha añadido al sistema correctamente.'
                    );
                    
                    fetch('/ProyectoADS_CTCDigital/src/backend/admin/getDatos.php')
                        .then(res => res.json())
                        .then(data => {
                            mascotasOriginal = data.mascotas;
                            cargarMascotas(mascotasOriginal);
                        })
                        .catch(err => {
                            console.error('Error al actualizar datos:', err);
                            mostrarNotificacion(
                                'error',
                                'Error de actualización',
                                'No se pudo actualizar la lista',
                                'La mascota se registró pero no se pudo actualizar la vista.'
                            );
                        });
                    
                        // Actualizar lista de razas
                        fetch("/ProyectoADS_CTCDigital/src/backend/admin/getRazas.php")
                        .then(res => res.json())
                        .then(data => {
                            const selectRaza = document.querySelector("#selectRaza");
                            
                            // Guardar la selección actual si existe
                            const selectedValue = selectRaza.value;
                            
                            // Limpiar y reconstruir solo el select de razas
                            selectRaza.innerHTML = '<option value="" selected disabled>Selecciona una raza</option>' +
                                                '<option value="nuevaRaza">Nueva raza</option>';
                            
                            // Cargar solo las razas actualizadas
                            data.razas.forEach(r => {
                                const option = document.createElement("option");
                                option.value = r.idRaza;
                                option.textContent = `${r.especie === "Gato" ? "🐱" : r.especie === "Perro" ? "🐶" : ""} ${r.raza}`;
                                selectRaza.appendChild(option);
                            });
                            
                            // Restaurar la selección anterior si sigue existiendo
                            if (selectedValue && Array.from(selectRaza.options).some(opt => opt.value === selectedValue)) {
                                selectRaza.value = selectedValue;
                            }
                        })
                        .catch(err => console.error('Error al actualizar razas:', err));
                } else {
                    mostrarNotificacion(
                        'error',
                        'Error al registrar',
                        'No se pudo registrar la mascota',
                        data.message || 'Por favor verifica los datos e intenta nuevamente.'
                    );
                }
            });            
        });
        
        //modal de notificacion
        function mostrarNotificacion(tipo, titulo, mensaje, detalle = '', autoCerrar = true) {
            const modal = new bootstrap.Modal(document.getElementById('modalNotificacion'));
            const header = document.getElementById('modalNotificacionHeader');
            const icono = document.getElementById('modalNotificacionIcon');
            const iconoGrande = document.getElementById('modalNotificacionIconoGrande');
            const tituloEl = document.getElementById('modalNotificacionTitulo');
            const mensajeEl = document.getElementById('modalNotificacionMensaje');
            const detalleEl = document.getElementById('modalNotificacionDetalle');
            const boton = document.getElementById('modalNotificacionBoton');
            const botonIcono = document.getElementById('modalNotificacionBotonIcono');
            const botonTexto = document.getElementById('modalNotificacionBotonTexto');
        
            // Configurar según el tipo
            switch(tipo) {
                case 'exito':
                    header.className = 'modal-header bg-success text-white border-0 rounded-top-3';
                    icono.className = 'fas fa-check-circle fs-4 me-2';
                    iconoGrande.className = 'fas fa-check-circle text-success mb-3';
                    boton.className = 'btn btn-success px-4 rounded-pill shadow-sm';
                    botonIcono.className = 'fas fa-thumbs-up me-2';
                    botonTexto.textContent = 'Aceptar';
                    break;
                case 'error':
                    header.className = 'modal-header bg-danger text-white border-0 rounded-top-3';
                    icono.className = 'fas fa-exclamation-circle fs-4 me-2';
                    iconoGrande.className = 'fas fa-exclamation-circle text-danger mb-3';
                    boton.className = 'btn btn-danger px-4 rounded-pill shadow-sm';
                    botonIcono.className = 'fas fa-redo me-2';
                    botonTexto.textContent = 'Reintentar';
                    break;
                case 'info':
                    header.className = 'modal-header bg-info text-white border-0 rounded-top-3';
                    icono.className = 'fas fa-info-circle fs-4 me-2';
                    iconoGrande.className = 'fas fa-info-circle text-info mb-3';
                    boton.className = 'btn btn-info px-4 rounded-pill shadow-sm';
                    botonIcono.className = 'fas fa-check me-2';
                    botonTexto.textContent = 'Entendido';
                    break;
            }
        
            // Asignar contenido
            tituloEl.textContent = titulo;
            mensajeEl.textContent = mensaje;
            detalleEl.textContent = detalle;
        
            // Mostrar modal
            modal.show();
        
            // Autocerrar si es éxito y está habilitado
            if (tipo === 'exito' && autoCerrar) {
                setTimeout(() => modal.hide(), 3000);
            }
        }
    }
});


