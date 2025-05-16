let mascotasOriginal = [];
let solicitudesOriginal = [];
let reportesOriginal = [];
let donacionesOriginal = [];
let administradoresOriginal = [];

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
    }
});

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

    // Autocerrar
    if (autoCerrar) {
        setTimeout(() => modal.hide(), 6000);
    }
}

//==================================================================================================
// SECCIÓN DE EDITAR DATOS
//==================================================================================================

let datosGlobales = {};

// Carga inicial de los modales y datos
document.addEventListener('DOMContentLoaded', async () => {  
    const res = await fetch("componentes/modalInfo.html");
    const html = await res.text();
    document.getElementById("modalesInfo").innerHTML = html;

    const response = await fetch("backend/admin/getDatos.php"); 
    datosGlobales = await response.json(); 
});

// Escucha el evento de clic en los botones de vista
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
        } else if (type === "admin") {
            const admin = datosGlobales.administradores.find(a => a.id == id);
            mostrarModalAdmin(admin);
        }
    }
});
  

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
    
        // Prellenar campos básicos
        document.getElementById("nombre").value = mascota.nombre || "";
        document.getElementById("idMascota").value = mascota.idMascota || "";

        document.getElementById("Ingreso").value = mascota.fechaIngreso || "";
        document.querySelector("select[name='estadoObtenido']").value = mascota.estadoAdopcion || "No Disponible";
        document.getElementById("adoptadoPor").value = `[${mascota.idAdoptante}] ${mascota.nombreAdoptante}`;

        document.getElementById("lineaMetro").value = mascota.linea || "";
        document.getElementById("estacionMetro").value = mascota.estacion || "";

        document.querySelector("select[name='sexoObtenido']").value = mascota.sexo || "";
        document.querySelector("input[name='edadObtenido']").value = mascota.edad || "";

        document.querySelector("select[name='tamanoObtenido']").value = mascota.tamaño || "";
        document.getElementById("raza").value = mascota.raza || "";

        document.querySelector("textarea[name='caractFisicaObtenido']").value = mascota.caractFisica || "";
        document.querySelector("textarea[name='estadoSaludObtenido']").value = mascota.estadoSalud || "";
        document.querySelector("textarea[name='descripcionObtenido']").value = mascota.descripcion || "";
    
        // ---- Solicitudes
        const solicitudContenedor = document.getElementById("selectSolicitud");
        solicitudContenedor.innerHTML = "";
        if (Array.isArray(mascota.todasSolicitudes) && mascota.todasSolicitudes.length > 0) {
        mascota.todasSolicitudes.forEach(id => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item list-group-item-action my-2";
            listItem.textContent = `Solicitud #${id}`;
            solicitudContenedor.appendChild(listItem);
        });
        } else {
        solicitudContenedor.textContent = "Sin solicitudes";
        }
    
        // ---- Reportes
        const reporteContenedor = document.getElementById("selectReporte");
        reporteContenedor.innerHTML = "";
        if (Array.isArray(mascota.reportes) && mascota.reportes.length > 0) {
        mascota.reportes.forEach(id => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item list-group-item-action my-2";
            listItem.textContent = `Reporte #${id}`;
            reporteContenedor.appendChild(listItem);
        });
        } else {
        reporteContenedor.textContent = "Sin reportes";
        }
    
        if (mascota.estadoAdopcion === "Adoptado") {
            adoptadoPorContainer.style.display = 'block';
            estadoObtenidoContainer.style.display = 'none';
        } else {
            adoptadoPorContainer.style.display = 'none';
            estadoObtenidoContainer.style.display = 'block';
        }
        
        // Mostrar galería
        mostrarGaleria(mascota);

        // Mostrar modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }         

    // Guardar cambios
    function guardarCambiosMascota(event) {
        if (event) event.preventDefault(); 
    
        const formData = new FormData();
    
        formData.append("tipo", "mascota");
        formData.append("idMascota", document.getElementById("idMascota").value);
        formData.append("estadoObtenido", document.querySelector("select[name='estadoObtenido']").value);
        formData.append("sexoObtenido", document.querySelector("select[name='sexoObtenido']").value);
        formData.append("edadObtenido", document.querySelector("input[name='edadObtenido']").value);
        formData.append("tamanoObtenido", document.querySelector("select[name='tamanoObtenido']").value);
        formData.append("caractFisicaObtenido", document.querySelector("textarea[name='caractFisicaObtenido']").value);
        formData.append("estadoSaludObtenido", document.querySelector("textarea[name='estadoSaludObtenido']").value);
        formData.append("descripcionObtenido", document.querySelector("textarea[name='descripcionObtenido']").value);
    
        // Archivos a eliminar
        formData.append("imagenesAEliminar", JSON.stringify(imagenesAEliminar));
    
        // Archivos nuevos
        const inputArchivos = document.getElementById("inputFotosMascota");
        if (inputArchivos && inputArchivos.files.length > 0) {
            for (let i = 0; i < inputArchivos.files.length; i++) {
                formData.append("fotosMascota[]", inputArchivos.files[i]);
            }
        }
           
        fetch("/ProyectoADS_CTCDigital/src/backend/admin/guardarCambios.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (data.status === "success") {
                    bootstrap.Modal.getInstance(document.getElementById("modalMascotaDetalle")).hide();
    
                    mostrarNotificacion(
                        'exito',
                        '¡Actualización exitosa!',
                        'La información de la mascota fue guardada correctamente.',
                        '',
                        true
                    );
    
                    // Recargar datos
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

                            const idMascotaActual = document.getElementById("idMascota").value;
                            const mascotaActualizada = mascotasOriginal.find(m => m.idMascota == idMascotaActual);
                            if (mascotaActualizada) {
                                mostrarModalMascota(mascotaActualizada);
                            }
                        })
                    .catch(err => {
                        console.error('Error al recargar datos:', err);
                        mostrarNotificacion(
                            'error',
                            'Error al recargar',
                            'Los datos se guardaron, pero no se pudieron recargar automáticamente.',
                            err.message
                        );
                    });
    
                } else {
                    mostrarNotificacion(
                        'error',
                        'Error al guardar',
                        'Hubo un problema al actualizar la información de la mascota.',
                        data.mensaje
                    );
                }
            } catch (e) {
                console.error("No se pudo parsear como JSON:", e);
                console.warn("Respuesta completa del servidor:\n", text);
                mostrarNotificacion(
                    'error',
                    'Error inesperado',
                    'La respuesta del servidor no fue válida.',
                    e.message
                );
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            mostrarNotificacion(
                'error',
                'Fallo de conexión',
                'No se pudo contactar con el servidor.',
                error.message
            );
        });
    }   

    // Mostrar galería de imágenes y videos
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
                // Detectar tipo de archivo
                const ext = ruta.split('.').pop().toLowerCase();
                const isVideo = ['mp4', 'webm', 'ogg'].includes(ext);
                const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
                const mediaSrc = ruta.startsWith('http') ? ruta 
                    : `${window.location.origin}/ProyectoADS_CTCDigital/${ruta.replace('ProyectoADS_CTCDigital/', '')}`;

                const galleryItem = document.createElement("div");
                galleryItem.className = "gallery-item position-relative me-2";
                galleryItem.style.flex = "0 0 auto";
                galleryItem.style.width = "auto";
                galleryItem.style.height = "150px";
                galleryItem.style.overflow = "hidden";
                galleryItem.style.position = "relative";

                if (isImage) {
                    const img = document.createElement("img");
                    img.src = mediaSrc;
                    img.className = "h-100 w-auto";
                    img.style.objectFit = "cover";
                    galleryItem.appendChild(img);
                } else if (isVideo) {
                    const video = document.createElement("video");
                    video.src = mediaSrc;
                    video.className = "h-100 w-auto";
                    video.style.objectFit = "cover";
                    video.controls = true;
                    video.muted = true;
                    video.loop = true;
                    galleryItem.appendChild(video);
                }

                const deleteBtn = document.createElement("button");
                deleteBtn.className = "btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-0 deleteBoton";
                deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                deleteBtn.onclick = () => {
                    const isNueva = galleryItem.querySelector('.badge.bg-success') !== null;
                    if (!isNueva) {
                        imagenesAEliminar.push(ruta);
                    }
                    galleryItem.remove();
                };

                galleryItem.appendChild(deleteBtn);
                galeria.appendChild(galleryItem);
            });
        } else {
            galeria.innerHTML = `
            <div class="text-center py-4 w-100">
                <i class="fas fa-image fa-2x mb-2 text-muted"></i>
                <p class="text-muted">No hay archivos multimedia disponibles</p>
            </div>
            `;
        }
    }

    // Función para agregar nuevos archivos (imágenes o videos)
    function procesarNuevasImagenes(input) {
        const galeria = document.getElementById("galeriaMascotaModal");
        if (!input.files || !galeria) return;

        const emptyMsg = galeria.querySelector(".text-center");
        if (emptyMsg) emptyMsg.remove();

        Array.from(input.files).forEach(file => {
            const fileType = file.type;
            const isImage = fileType.startsWith('image/');
            const isVideo = fileType.startsWith('video/');

            if (!isImage && !isVideo) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                const galleryItem = document.createElement("div");
                galleryItem.className = "gallery-item position-relative me-2";
                galleryItem.style.flex = "0 0 auto";
                galleryItem.style.width = "auto";
                galleryItem.style.height = "150px";
                galleryItem.style.overflow = "hidden";
                galleryItem.style.position = "relative";

                if (isImage) {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.className = "h-100 w-auto";
                    img.style.objectFit = "cover";
                    galleryItem.appendChild(img);
                } else if (isVideo) {
                    const video = document.createElement("video");
                    video.src = e.target.result;
                    video.className = "h-100 w-auto";
                    video.style.objectFit = "cover";
                    video.controls = true;
                    video.muted = true;
                    video.loop = true;
                    galleryItem.appendChild(video);
                }

                const badge = document.createElement("span");
                badge.className = "badge bg-success position-absolute top-0 start-0";
                badge.textContent = "Nuevo";

                const deleteBtn = document.createElement("button");
                deleteBtn.className = "btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-0 deleteBoton";
                deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                deleteBtn.onclick = () => {
                    const isNueva = galleryItem.querySelector('.badge.bg-success') !== null;
                    if (!isNueva) {
                        imagenesAEliminar.push(ruta);
                    }
                    galleryItem.remove();
                };
                

                galleryItem.appendChild(badge);
                galleryItem.appendChild(deleteBtn);
                galeria.appendChild(galleryItem);
            };

            reader.readAsDataURL(file);
        });
    }    
    
    // Eliminar imagen nueva y videos
    function removerImagenNueva(button) {
        const imgContainer = button.closest('.gallery-item');
        const index = nuevasImagenes.findIndex(img => img.element === imgContainer);
        
        if (index !== -1) {
            nuevasImagenes.splice(index, 1);
            imgContainer.remove();
        }
    }
    
    // Obtener imágenes y videos procesados
    function obtenerImagenesProcesadas() {
        return {
            paraEliminar: [...imagenesAEliminar],  
            nuevas: nuevasImagenes.map(img => img.file) 
        };
    }

}

// ========================== MODAL DE SOLICITUD ==========================
{
    // Mostrar modal de solicitud
    function mostrarModalSolicitud(solicitud) {
        try {
            const modal = new bootstrap.Modal(document.getElementById('modalSolicitudDetalle'));
            document.getElementById("estadoVisita").addEventListener("change", verificarEstadoVisitaParaAprobacion);

            if (!solicitud || typeof solicitud !== 'object') {
                throw new Error('Datos de solicitud no válidos');
            }

            // Función auxiliar para establecer valores
            const setValue = (id, value) => {
                const element = document.getElementById(id);
                if (element) element.value = value || '';
            };

            // Llenar datos básicos de solicitud
            setValue('solicitudId', solicitud.idSolicitud);
            setValue('fechaSolicitud', solicitud.fechaSolicitud);
            setValue('estadoSolicitud', solicitud.estadoAdopcion);
            setValue('nombreAdoptante', solicitud.nombreAdoptante);
            setValue('telefonoAdoptante', solicitud.telefono);
            setValue('correoAdoptante', solicitud.correo);
            setValue('mascotaId', solicitud.idMascota);
            setValue('nombreMasc', solicitud.nombreMascota);
            setValue('comentariosSolicitud', solicitud.comentarios);

            // Cargar documentos
            cargarDocumentosSolicitud(solicitud);

            // Cargar datos de visita domiciliaria (si existen)
            if (solicitud.visita) {
                setValue('estadoVisita', solicitud.visita.estadoVisita);
                setValue('fechaVisita', formatDateTimeForInput(solicitud.visita.fechaVisita));
                setValue('direccionVisita', solicitud.visita.direccion);
                setValue('notasVisita', solicitud.visita.notas);
                
                // Inicializar mapa si hay coordenadas
                if (solicitud.visita.ubicacion) {
                    // Esperar a que el modal se muestre completamente antes de inicializar el mapa
                    const modalEl = document.getElementById('modalSolicitudDetalle');
                    modalEl.addEventListener('shown.bs.modal', function onShown() {
                        initMap(solicitud.visita.ubicacion);
                        modalEl.removeEventListener('shown.bs.modal', onShown); // quitar el listener después
                    });
                }
            } else {
                // Resetear campos si no hay visita
                setValue('estadoVisita', 'Pendiente');
                setValue('fechaVisita', '');
                setValue('direccionVisita', '');
                setValue('notasVisita', '');
            }

            verificarEstadoVisitaParaAprobacion();
            modal.show();            
        } catch (error) {
            console.error('Error al mostrar modal de solicitud:', error);
            alert('Error al cargar los datos de la solicitud');
        }
    }

    // Función para guardar cambios en la solicitud
    function guardarCambiosSolicitud(event) {
        if (event) event.preventDefault();
    
        const formData = new FormData();
        formData.append("tipo", "solicitud");
        formData.append("solicitudId", document.getElementById("solicitudId").value);
        formData.append("idMascotaSolicitud", document.getElementById("mascotaId").value);
        formData.append("estadoSolicitud", document.getElementById("estadoSolicitud").value);
        formData.append("comentariosSolicitud", document.getElementById("comentariosSolicitud").value);
        formData.append("estadoVisita", document.getElementById("estadoVisita").value);
        formData.append("fechaVisita", document.getElementById("fechaVisita").value);
        formData.append("notasVisita", document.getElementById("notasVisita").value);
    
        fetch("/ProyectoADS_CTCDigital/src/backend/admin/guardarCambios.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (data.status === "success") {
                    mostrarNotificacion(
                        "exito",
                        "Solicitud actualizada",
                        "Los cambios se guardaron correctamente."
                    );
    
                    bootstrap.Modal.getInstance(document.getElementById("modalSolicitudDetalle")).hide();
    
                    // Recargar datos
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
                            
                            const idSolicitudActual = document.getElementById("solicitudId").value;
                            const solicitudActualizada = solicitudesOriginal.find(s => s.idSolicitud == idSolicitudActual);
                            if (solicitudActualizada) {
                                mostrarModalSolicitud(solicitudActualizada);
                            }
                        })
                        .catch(err => {
                            console.error('Error al recargar datos:', err);
                            mostrarNotificacion(
                                'error',
                                'Error al recargar',
                                'Los datos se guardaron, pero no se pudieron recargar automáticamente.',
                                err.message
                            );
                        });
    
                } else {
                    mostrarNotificacion(
                        "error",
                        "Error al guardar",
                        "Hubo un problema al actualizar la solicitud.",
                        data.mensaje
                    );
                }
            } catch (e) {
                console.error("No se pudo parsear como JSON:", e);
                console.warn("Respuesta completa del servidor:\n", text);
                mostrarNotificacion(
                    "error",
                    "Respuesta inválida del servidor",
                    "No se pudo interpretar la respuesta del servidor.",
                    e.message
                );
            }
        })
        .catch(err => {
            console.error("Error en la solicitud:", err);
            mostrarNotificacion(
                "error",
                "Fallo de conexión",
                "No se pudo contactar con el servidor.",
                err.message
            );
        });
    }

    // Función para formatear fecha para input datetime-local
    function formatDateTimeForInput(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    }

    // Función para inicializar el mapa
    let mapaVisitaInstance = null;
    function initMap(coordenadas) {
        if (!coordenadas) return;
    
        // Reemplazar símbolos de grado y letras, convertir a float
        const cleanedCoords = coordenadas
            .replace(/°/g, '') 
            .replace(/N|E/g, '')  // Norte y Este = positivo
            .replace(/S/g, '-')   // Sur = negativo
            .replace(/W/g, '-')   // Oeste = negativo
            .split(',')
            .map(coord => parseFloat(coord.trim()));
    
        const [lat, lng] = cleanedCoords;
    
        // Eliminar instancia previa si existe
        if (mapaVisitaInstance) {
            mapaVisitaInstance.remove();
            mapaVisitaInstance = null;
        }

        // Crear nuevo mapa
        mapaVisitaInstance = new L.Map('mapaVisita').setView([lat, lng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapaVisitaInstance);

        L.marker([lat, lng]).addTo(mapaVisitaInstance)
            .bindPopup('Ubicación de la visita domiciliaria')
            .openPopup();
    }
    
    // Cargar documentos de la solicitud
    function cargarDocumentosSolicitud(solicitud) {
        const contenedor = document.getElementById('listaDocumentos');
    
        if (!contenedor) {
            console.error('Contenedor de documentos no encontrado');
            return;
        }
    
        contenedor.innerHTML = ''; // Limpiar contenido previo
    
        if (!Array.isArray(solicitud.documentos) || solicitud.documentos.length === 0) {
            contenedor.innerHTML = '<p class="text-muted">No se encontraron documentos adjuntos.</p>';
            return;
        }
    
        solicitud.documentos.forEach((ruta, index) => {
            const nombreArchivo = ruta.split('/').pop();
    
            const item = document.createElement('div');
            item.className = 'mb-2';
    
            item.innerHTML = `
                <a href="${ruta}" target="_blank" class="btn btn-outline-primary btn-sm">
                    📄 ${nombreArchivo}
                </a>
            `;
    
            contenedor.appendChild(item);
        });
    }

    // Cambiar estado de visita para aprobación
    function verificarEstadoVisitaParaAprobacion() {
        const estadoVisita = document.getElementById("estadoVisita").value;
        const estadoSolicitud = document.getElementById("estadoSolicitud");
    
        const opcionAprobada = Array.from(estadoSolicitud.options).find(opt => opt.value === "Aprobada");
    
        if (!opcionAprobada) return;
    
        if (estadoVisita === "Realizada") {
            opcionAprobada.disabled = false;
        } else {
            if (estadoSolicitud.value === "Aprobada") {
                estadoSolicitud.value = "Pendiente";
            }
            opcionAprobada.disabled = true;
        }
    }
}

// ========================== MODAL DE REPORTE ==========================
{
    // Mostrar modal de reporte
    function mostrarModalReporte(reporte, mascotasAsociadas = []) {
        const modal = new bootstrap.Modal(document.getElementById('modalReporteDetalle'));
    
        // Llenar campos básicos
        document.getElementById('idReporte').value = reporte.idReporte || '';
        document.getElementById('nombreReportante').value = reporte.nombreReportante || '';
        document.getElementById('correo').value = reporte.correo || '';
        
        const fechaReporte = reporte.fechaReporte ? new Date(reporte.fechaReporte) : new Date();
        document.getElementById('fechaReporte').value = fechaReporte.toISOString().slice(0, 16);
    
        document.getElementById('estadoReporte').value = reporte.estadoReporte || 'Pendiente';
        document.getElementById('lineaRepo').value = reporte.linea || '';
        document.getElementById('estacionRep').value = reporte.estacion || '';
        document.getElementById('descripcionReporte').value = reporte.descripcion || '';
    
        // Cargar select de mascotas
        const selectMascotas = document.getElementById('mascotasAsociadas');
        const contador = document.getElementById('contadorMascotas');
        const btnDeseleccionar = document.getElementById('btnDeseleccionar');
        
        // Limpiar select
        selectMascotas.innerHTML = '';
        
        // Generar opciones
        mascotasOriginal.forEach(mascota => {
            const option = document.createElement('option');
            option.value = mascota.idMascota;
            option.textContent = ` [${mascota.idMascota}] ${mascota.nombre}`;
            
            if (Array.isArray(reporte.mascotas) && reporte.mascotas.includes(String(mascota.idMascota))) {
            option.selected = true;
            }
            
            selectMascotas.appendChild(option);
        });
        
        // Actualizar contador
        function actualizarContador() {
            const seleccionadas = Array.from(selectMascotas.selectedOptions).length;
            contador.textContent = seleccionadas;
            contador.className = seleccionadas > 0 ? 'text-primary fw-bold' : 'text-muted';
        }
        
        // Eventos
        selectMascotas.addEventListener('change', actualizarContador);
        btnDeseleccionar.addEventListener('click', () => {
            Array.from(selectMascotas.options).forEach(opt => opt.selected = false);
            actualizarContador();
        });
  
        // Inicializar contador
        actualizarContador();
    
        cargarImagenesReporte(reporte);
        modal.show();
    }    

    // Función para guardar cambios en el reporte
    function guardarCambiosReporte(event) {
        if (event) event.preventDefault();
    
        const formData = new FormData();
        formData.append("tipo", "reporte");
        formData.append("idReporte", document.getElementById("idReporte").value);
        formData.append("estadoReporte", document.getElementById("estadoReporte").value);
        formData.append("descripcionReporte", document.getElementById("descripcionReporte").value);
    
        const selectMascotas = document.getElementById("mascotasAsociadas");
        const mascotasSeleccionadas = Array.from(selectMascotas.selectedOptions).map(opt => opt.value);
        mascotasSeleccionadas.forEach(id => formData.append("mascotasAsociadas[]", id));
    
        fetch("/ProyectoADS_CTCDigital/src/backend/admin/guardarCambios.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
    
                if (data.status === "success") {
                    mostrarNotificacion(
                        "exito",
                        "Reporte actualizado",
                        "Los cambios se guardaron correctamente."
                    );
    
                    // Cerrar modal
                    bootstrap.Modal.getInstance(document.getElementById("modalReporteDetalle")).hide();
    
                    // Recargar datos
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
    
                            // Volver a abrir el modal actualizado
                            const idReporteActual = document.getElementById("idReporte").value;
                            const reporteActualizado = reportesOriginal.find(r => r.idReporte == idReporteActual);
                            if (reporteActualizado) {
                                mostrarModalReporte(reporteActualizado);
                            }
                        })
                        .catch(err => {
                            console.error('Error al recargar datos:', err);
                            mostrarNotificacion(
                                'error',
                                'Error al recargar',
                                'Los datos se guardaron, pero no se pudieron recargar automáticamente.',
                                err.message
                            );
                        });
                } else {
                    mostrarNotificacion(
                        "error",
                        "Error al guardar",
                        "Hubo un problema al actualizar el reporte.",
                        data.mensaje
                    );
                }
            } catch (e) {
                console.error("No se pudo parsear como JSON:", e);
                console.warn("Respuesta completa del servidor:\n", text);
                mostrarNotificacion(
                    "error",
                    "Respuesta inválida del servidor",
                    "No se pudo interpretar la respuesta del servidor.",
                    e.message
                );
            }
        })
        .catch(err => {
            console.error("Error en la solicitud:", err);
            mostrarNotificacion(
                "error",
                "Fallo de conexión",
                "No se pudo contactar con el servidor.",
                err.message
            );
        });
    }        
      
    // Función para ampliar imágenes/videos al hacer clic
    function setupGalleryClickEvents() {
        const galeria = document.getElementById("galeriaReporteModal");
        if (!galeria) return;

        galeria.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function(e) {
                // Evitar que se active el clic si se hizo en los controles del video
                if (e.target.tagName === 'VIDEO' || e.target.closest('video')) {
                    return;
                }

                const mediaElement = this.querySelector('img, video');
                if (!mediaElement) return;

                // Crear modal de visualización
                const modalHTML = `
                <div class="modal fade" id="mediaViewerModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content bg-transparent border-0">
                            <div class="modal-header border-0">
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body d-flex justify-content-center align-items-center p-0">
                                ${mediaElement.tagName === 'IMG' ? 
                                    `<img src="${mediaElement.src}" class="img-fluid" style="max-height: 80vh;">` :
                                    `<video controls autoplay class="w-100" style="max-height: 80vh;">
                                        <source src="${mediaElement.src}" type="video/${mediaElement.src.split('.').pop()}">
                                    </video>`
                                }
                            </div>
                        </div>
                    </div>
                </div>
                `;

                // Insertar el modal en el DOM
                const modalContainer = document.createElement('div');
                modalContainer.innerHTML = modalHTML;
                document.body.appendChild(modalContainer);

                // Mostrar el modal
                const mediaModal = new bootstrap.Modal(modalContainer.querySelector('#mediaViewerModal'));
                mediaModal.show();

                // Eliminar el modal cuando se cierre
                modalContainer.querySelector('#mediaViewerModal').addEventListener('hidden.bs.modal', () => {
                    document.body.removeChild(modalContainer);
                });
            });
        });
    }

    // Función modificada para incluir los eventos de clic
    function cargarImagenesReporte(reporte) {
        const galeria = document.getElementById("galeriaReporteModal");
        if (!galeria) {
            console.error("No se encontró el elemento galeriaReporteModal");
            return;
        }

        galeria.innerHTML = "";

        if (reporte.imagenes && reporte.imagenes.length > 0) {
            reporte.imagenes.forEach((ruta, index) => {
                // Detectar tipo de archivo
                const ext = ruta.split('.').pop().toLowerCase();
                const isVideo = ['mp4', 'webm', 'ogg'].includes(ext);
                const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
                const mediaSrc = ruta.startsWith('http') ? ruta 
                    : `${window.location.origin}/ProyectoADS_CTCDigital/${ruta.replace('ProyectoADS_CTCDigital/', '')}`;

                const galleryItem = document.createElement("div");
                galleryItem.className = "gallery-item position-relative me-2 cursor-pointer";
                galleryItem.style.flex = "0 0 auto";
                galleryItem.style.width = "auto";
                galleryItem.style.height = "150px";
                galleryItem.style.overflow = "hidden";
                galleryItem.style.position = "relative";

                if (isImage) {
                    const img = document.createElement("img");
                    img.src = mediaSrc;
                    img.className = "h-100 w-auto";
                    img.style.objectFit = "cover";
                    galleryItem.appendChild(img);
                } else if (isVideo) {
                    const video = document.createElement("video");
                    video.src = mediaSrc;
                    video.className = "h-100 w-auto";
                    video.style.objectFit = "cover";
                    video.controls = false; 
                    video.muted = true;
                    video.loop = true;
                    
                    // Añadir icono de play para videos
                    const playIcon = document.createElement("div");
                    playIcon.className = "position-absolute top-50 start-50 translate-middle";
                    playIcon.innerHTML = '<i class="fas fa-play-circle text-white fa-3x opacity-75"></i>';
                    galleryItem.appendChild(video);
                    galleryItem.appendChild(playIcon);
                }
                
                galeria.appendChild(galleryItem);
            });

            // Configurar eventos de clic después de cargar los elementos
            setTimeout(setupGalleryClickEvents, 100);
        } else {
            galeria.innerHTML = `
            <div class="text-center py-4 w-100">
                <i class="fas fa-image fa-2x mb-2 text-muted"></i>
                <p class="text-muted">No hay archivos multimedia disponibles</p>
            </div>
            `;
        }
    }
}

// ========================== MODAL DE DONACION ==========================
{
    function mostrarModalDonacion(donacion) {
        try {
            const modal = new bootstrap.Modal(document.getElementById('modalDonacionDetalle'));
    
            // Función para asignar valor seguro a campos
            const setValue = (id, value) => {
                const el = document.getElementById(id);
                if (el) el.value = value ?? '';
            };
    
            // Asignar valores a los campos del formulario
            setValue('idDonacion', donacion.idDonacion);
            setValue('tipoDonacion', donacion.tipo);
            setValue('estadoDonacion', donacion.estadoDonacion);
            setValue('fechaDonacion', donacion.fechaDonacion);
            setValue('fechaPrevistaDon', donacion.fechaPrevistaDon);
            setValue('monto', donacion.monto);
            setValue('descripcion', donacion.descripcion);
            setValue('nombreDonante', donacion.nombreDonante);
            setValue('correoDonante', donacion.correo);
    
            // Mostrar u ocultar campo de monto según tipo de donación
            const montoContainer = document.getElementById('montoContainer');
            if (donacion.tipo === 'Monetaria') {
                montoContainer.style.display = 'block';
            } else {
                montoContainer.style.display = 'none';
            }
    
            // Mostrar sección visual si estadoVisible es 1
            const visualContainer = document.getElementById('donanteVisualContainer');
            if (donacion.estadoVisible == '1') {
                document.getElementById('donanteImg').src = `/ProyectoADS_CTCDigital/recursos/index/donadores/${donacion.img}`;
                document.getElementById('donanteImg').style.backgroundColor = donacion.color;
                document.getElementById('donanteUsuario').textContent = donacion.usuario;
                visualContainer.style.display = 'block';
            } else {
                visualContainer.style.display = 'none';
            }
    
            modal.show();
    
        } catch (error) {
            console.error('Error al mostrar el modal de donación:', error);
            alert('Hubo un problema al cargar los datos de la donación.');
        }
    }

    // Función para guardar cambios en la donación
    function guardarCambiosDonacion(event) {
        if (event) event.preventDefault();
    
        const formData = new FormData();
        formData.append("tipo", "donacion");
        formData.append("idDonacion", document.getElementById("idDonacion").value);
        formData.append("estadoDonacion", document.getElementById("estadoDonacion").value);
        formData.append("fechaPrevistaDon", document.getElementById("fechaPrevistaDon").value);
        formData.append("descripcion", document.getElementById("descripcion").value);
    
        fetch("/ProyectoADS_CTCDigital/src/backend/admin/guardarCambios.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (data.status === "success") {
                    mostrarNotificacion(
                        "exito",
                        "Donación actualizada",
                        "Los cambios se guardaron correctamente."
                    );
    
                    bootstrap.Modal.getInstance(document.getElementById("modalDonacionDetalle")).hide();
    
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
    
                            const idDonacionActual = document.getElementById("idDonacion").value;
                            const donacionActualizada = donacionesOriginal.find(d => d.idDonacion == idDonacionActual);
                            if (donacionActualizada) {
                                mostrarModalDonacion(donacionActualizada);
                            }
                        })
                        .catch(err => {
                            console.error('Error al recargar datos:', err);
                            mostrarNotificacion(
                                'error',
                                'Error al recargar',
                                'Los datos se guardaron, pero no se pudieron recargar automáticamente.',
                                err.message
                            );
                        });
                } else {
                    mostrarNotificacion(
                        "error",
                        "Error al guardar",
                        "Hubo un problema al actualizar la donación.",
                        data.mensaje
                    );
                }
            } catch (e) {
                console.error("No se pudo parsear como JSON:", e);
                console.warn("Respuesta completa del servidor:\n", text);
                mostrarNotificacion(
                    "error",
                    "Respuesta inválida del servidor",
                    "No se pudo interpretar la respuesta del servidor.",
                    e.message
                );
            }
        })
        .catch(err => {
            console.error("Error en la solicitud:", err);
            mostrarNotificacion(
                "error",
                "Fallo de conexión",
                "No se pudo contactar con el servidor.",
                err.message
            );
        });
    }     
}

// ========================== MODAL DE ADMINISTRADOR ==========================
{
    // Mostrar modal de administrador
    function mostrarModalAdmin(admin) {
        try {
            const modal = new bootstrap.Modal(document.getElementById('modalAdminDetalle'));
    
            // Asignar valores
            document.getElementById('idAdmin').value = admin.id || '';
            document.getElementById('adminEditUsuario').value = admin.usuario || '';
            document.getElementById('adminEditPassword').value = admin.contraseña || '';
            document.getElementById('adminEditUltimaConn').value = admin.ultimaConn || 'Sin registros';
    
            modal.show();
        } catch (error) {
            console.error('Error al mostrar modal de administrador:', error);
            alert('Hubo un error al cargar los datos del administrador.');
        }
    }

    // Guardar cambios en el administrador
    function guardarCambiosAdmin(event) {
        if (event) event.preventDefault();
    
        const formData = new FormData();
        formData.append("tipo", "admin");
        formData.append("idAdmin", document.getElementById("idAdmin").value);
        formData.append("usuario", document.getElementById("adminEditUsuario").value);
        formData.append("password", document.getElementById("adminEditPassword").value);
    
        fetch("/ProyectoADS_CTCDigital/src/backend/admin/guardarCambios.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
    
                if (data.status === "success") {
                    mostrarNotificacion(
                        "exito",
                        "Administrador actualizado",
                        "Los cambios se guardaron correctamente."
                    );
    
                    bootstrap.Modal.getInstance(document.getElementById("modalAdminDetalle")).hide();
    
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
    
                            const idActual = document.getElementById("idAdmin").value;
                            const adminActualizado = administradoresOriginal.find(a => a.id == idActual);
                            if (adminActualizado) {
                                mostrarModalAdmin(adminActualizado);
                            }
                        })
                        .catch(err => {
                            console.error('Error al recargar datos:', err);
                            mostrarNotificacion(
                                'error',
                                'Error al recargar',
                                'Los datos se guardaron, pero no se pudieron recargar automáticamente.',
                                err.message
                            );
                        });
    
                } else {
                    mostrarNotificacion(
                        "error",
                        "Error al guardar",
                        "Hubo un problema al actualizar el administrador.",
                        data.mensaje
                    );
                }
    
            } catch (e) {
                console.error("No se pudo parsear como JSON:", e);
                console.warn("Respuesta completa del servidor:\n", text);
                mostrarNotificacion(
                    "error",
                    "Respuesta inválida del servidor",
                    "No se pudo interpretar la respuesta del servidor.",
                    e.message
                );
            }
        })
        .catch(err => {
            console.error("Error en la solicitud:", err);
            mostrarNotificacion(
                "error",
                "Fallo de conexión",
                "No se pudo contactar con el servidor.",
                err.message
            );
        });
    }    

    function togglePasswordVisibility() {
        const input = document.getElementById('adminEditPassword');
        const icon = document.getElementById('passwordToggleIcon');
    
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    

    
    


    
}

