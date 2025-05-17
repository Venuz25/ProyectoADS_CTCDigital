// FUNCIONALIDAD FORMULARIO ADOPCIÓN 
{
    let currentSection = 1;

    // Función para retroceder a la sección anterior
    function prevSection() {
        document.getElementById(`section-${currentSection}`).classList.remove('active');
        currentSection--;
        document.getElementById(`section-${currentSection}`).classList.add('active');
        updateProgressBar();
    }

    // Función para avanzar a la siguiente sección
    function validateForm(sectionId) {
        const section = document.getElementById(sectionId);
        // Incluir checkboxes en la selección
        const inputs = section.querySelectorAll('input[required], select[required], textarea[required], input[type="checkbox"][required]');
        let isValid = true;

        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
            
            // Validación especial para checkboxes
            if (input.type === 'checkbox') {
                if (!input.checked) {
                    input.classList.add('is-invalid');
                    isValid = false;
                    // Mostrar feedback específico para términos
                    if (input.id === 'aceptoTerminos') {
                        document.getElementById('terminosFeedback').style.display = 'block';
                    }
                    return;
                } else {
                    input.classList.add('is-valid');
                    // Ocultar feedback si está marcado
                    if (input.id === 'aceptoTerminos') {
                        document.getElementById('terminosFeedback').style.display = 'none';
                    }
                    return;
                }
            }

            // Validar campos requeridos normales
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
                return;
            }

            // Validar patrones (si existen)
            if (input.pattern) {
                const regex = new RegExp(input.pattern);
                if (!regex.test(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                    return;
                }
            }

            // Validar tipos específicos
            if (input.type === 'email' && !validateEmail(input.value)) {
                input.classList.add('is-invalid');
                isValid = false;
                return;
            }

            // Validación especial para edad
            if (input.id === 'edad') {
                const edad = parseInt(input.value);
                if (edad < 18) {
                    input.classList.add('is-invalid');
                    input.nextElementSibling.style.display = 'block';
                    input.setCustomValidity('Debes ser mayor de 18 años');
                    isValid = false;
                    return;
                }
            }

            input.classList.add('is-valid');
        });

        return isValid;
    }

    // Evento para chequear el checkbox de términos
    document.getElementById('aceptoTerminos').addEventListener('change', function() {
        if (this.checked) {
            this.classList.remove('is-invalid');
            document.getElementById('terminosFeedback').style.display = 'none';
        } else {
            this.classList.add('is-invalid');
            document.getElementById('terminosFeedback').style.display = 'block';
        }
    });

    // Función auxiliar para validar emails
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Función para avanzar entre secciones con validación
    function nextSection(current) {
        if (!validateForm(`section-${current}`)) {
            const invalidField = document.querySelector(`#section-${current} .is-invalid`);
            if (invalidField) {
                invalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                invalidField.focus();
            }
            return false;
        }

        document.getElementById(`section-${current}`).classList.remove('active');
        currentSection = current + 1;
        document.getElementById(`section-${currentSection}`).classList.add('active');

        if (currentSection === 8) {
            mostrarDetallesMascota();
        }

        updateProgressBar();
        return true;
    }

    // Función para actualizar la barra de progreso
    function updateProgressBar() {
        const totalSections = 8;
        const progressPercentage = (currentSection / totalSections) * 100;
        
        document.getElementById('form-progress').style.width = `${progressPercentage}%`;
    }

    // Inicializar el formulario
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('section-1').classList.add('active');
        updateProgressBar();
    });

    // Función para cargar y mostrar los detalles de la mascota seleccionada
    async function mostrarDetallesMascota() {
        try {
            const mascotaSelect = document.getElementById('mascotaAdoptar');
            const mascotaId = mascotaSelect.value;
            
            if (!mascotaId) return;
            
            const response = await fetch('/ProyectoADS_CTCDigital/src/backend/adoptame.php');
            const mascotas = await response.json();        
            const mascotaSeleccionada = mascotas.find(m => m.idMascota == mascotaId);
            
            if (mascotaSeleccionada) {
                document.getElementById('mascotaNombre').textContent = mascotaSeleccionada.nombre;
                document.getElementById('mascotaEspecie').textContent = mascotaSeleccionada.especie;
                document.getElementById('mascotaEdad').textContent = `${mascotaSeleccionada.edad} años`;
                document.getElementById('mascotaSexo').textContent = mascotaSeleccionada.sexo;
                
                // Mostrar la imagen principal 
                const imgContainer = document.getElementById('mascotaImagen');
                if (mascotaSeleccionada.archivos && mascotaSeleccionada.archivos.length > 0) {
                    const principal = mascotaSeleccionada.archivos.find(a => a.includes('principal')) || 
                                    mascotaSeleccionada.archivos[0];
                    imgContainer.src = `/ProyectoADS_CTCDigital/mascotas/${mascotaId}/${principal}`;
                    imgContainer.alt = `Foto de ${mascotaSeleccionada.nombre}`;
                }
            }
        } catch (error) {
            console.error('Error al cargar detalles de la mascota:', error);
            document.getElementById('mascotaNombre').textContent = 'Mascota seleccionada';
        }
    }

    // Funcion fechaVisita
    function setMinFechaVisita() {
        const now = new Date();
        now.setSeconds(0, 0); // Quita los segundos y milisegundos
        const localISOTime = now.toISOString().slice(0,16);
        document.getElementById("fechaVisita").min = localISOTime;
    }
}

// FUNCIONALIDAD MAPA
{
    let map;
    let marker;
    let coordenadas = null;

    function initMap() {
        document.getElementById('buscarDireccion').addEventListener('click', function() {
            const mapaContainer = document.getElementById('mapaDireccion');
            const direccionInput = document.getElementById('direccion');
            
            // Mostrar el contenedor del mapa
            mapaContainer.style.display = 'block';
            mapaContainer.style.height = '300px';
            mapaContainer.style.marginBottom = '15px';
            
            // Inicializar el mapa si es la primera vez
            if (!map) {
                map = L.map('mapaDireccion').setView([19.4326, -99.1332], 12); // Centro en CDMX
                
                // Añadir capa de tiles (OpenStreetMap)
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                
                // Añadir marcador inicial
                marker = L.marker([19.4326, -99.1332], {
                    draggable: true
                }).addTo(map);
                
                // Evento para actualizar coordenadas al mover el marcador
                marker.on('dragend', function(e) {
                    updateCoordenadas(marker.getLatLng());
                });
                
                // Evento para colocar marcador al hacer click en el mapa
                map.on('click', function(e) {
                    if (marker) {
                        marker.setLatLng(e.latlng);
                    } else {
                        marker = L.marker(e.latlng, {draggable: true}).addTo(map);
                    }
                    updateCoordenadas(e.latlng);
                });
            }
            
            // Si hay dirección escrita, geocodificar
            if (direccionInput.value.trim() !== '') {
                geocodeAddress(direccionInput.value.trim());
            }
        });
    }

    // Función para geocodificar una dirección
    function geocodeAddress(address) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    
                    // Centrar mapa en la ubicación encontrada
                    map.setView([lat, lon], 16);
                    
                    // Mover marcador
                    if (marker) {
                        marker.setLatLng([lat, lon]);
                    } else {
                        marker = L.marker([lat, lon], {draggable: true}).addTo(map);
                    }
                    
                    updateCoordenadas({lat: lat, lng: lon});
                } else {
                    alert('No se encontró la dirección. Por favor selecciona manualmente en el mapa.');
                }
            })
            .catch(error => {
                console.error('Error en geocodificación:', error);
                alert('Error al buscar la dirección. Por favor selecciona manualmente en el mapa.');
            });
    }

    // Función para actualizar las coordenadas en el formulario
    function updateCoordenadas(latlng) {
        coordenadas = {
            lat: latlng.lat.toFixed(6),
            lng: latlng.lng.toFixed(6)
        };
        document.getElementById('coordenadas').value = `${coordenadas.lat},${coordenadas.lng}`;
        
        // Opcional: Actualizar el campo de dirección con la dirección aproximada
        reverseGeocode(latlng.lat, latlng.lng);
    }

    // Función para obtener dirección aproximada desde coordenadas (geocodificación inversa)
    function reverseGeocode(lat, lng) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
                if (data.display_name) {
                    document.getElementById('direccion').value = data.display_name;
                }
            })
            .catch(error => console.error('Error en geocodificación inversa:', error));
    }
}

// FUNCIONAL LISTA DE MASCOTAS
{
    // Función para cargar las mascotas disponibles
    async function cargarMascotasDisponibles(mascotaIdPreSeleccionada = null) {
        try {
            const response = await fetch('/ProyectoADS_CTCDigital/src/backend/adoptame.php');
            const mascotas = await response.json();
            
            const select = document.getElementById('mascotaAdoptar');
            select.innerHTML = '<option value="" selected disabled>Selecciona una mascota</option>';
            
            mascotas.forEach(mascota => {
                if (mascota.estadoAdopcion === 'Disponible') {
                    const option = document.createElement('option');
                    option.value = mascota.idMascota;
                    
                    const icono = mascota.especie === 'Perro' ? '🐶' : '😺';
                    option.innerHTML = `${icono} ${mascota.nombre} (${mascota.edad} años)`;
                    
                    if (mascotaIdPreSeleccionada && mascota.idMascota == mascotaIdPreSeleccionada) {
                        option.selected = true;
                    }
                    
                    select.appendChild(option);
                }
            });
            
            if (mascotaIdPreSeleccionada && !select.value) {
                console.warn(`La mascota con ID ${mascotaIdPreSeleccionada} no está disponible`);
            }
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        }
    }

    // Función para obtener parámetros de la URL
    function obtenerParametroURL(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    }

    // Al cargar la página
    document.addEventListener('DOMContentLoaded', function() {
        const mascotaId = obtenerParametroURL('idMascota');       
        cargarMascotasDisponibles(mascotaId);
    });
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    setMinFechaVisita();
    
    // Mostrar/ocultar campos condicionales
    document.querySelector('input[name="otrosAnimales"]').addEventListener('change', function() {
        document.getElementById('mascotasInfo').style.display = this.value === 'si' ? 'block' : 'none';
    });
    
    document.querySelector('input[name="niniosCasa"]').addEventListener('change', function() {
        document.getElementById('edadesNinios').style.display = this.value === 'si' ? 'block' : 'none';
    });
    
    document.querySelector('input[name="espacioExterior"]').addEventListener('change', function() {
        document.getElementById('tipoEspacio').style.display = this.value === 'si' ? 'block' : 'none';
    });
});

function finalizarSolicitud(current){
    if (!validateForm(`section-${current}`)) {
        const invalidField = document.querySelector(`#section-${current} .is-invalid`);
        if (invalidField) {
            invalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            invalidField.focus();
        }
    } else {
        enviarSolicitud();
    }
}

// Función para enviar el formulario
async function enviarSolicitud() {
    const datos = {
        idMascota: document.getElementById('mascotaAdoptar').value,
        adoptante: {
            nombre: document.getElementById('nombreCompleto').value,
            telefono: document.getElementById('telefono').value,
            correo: document.getElementById('correo').value
        },
        visita: {
            direccion: document.getElementById('direccion').value,
            coordenadas: {
                lat: document.getElementById('coordenadas').value.split(',')[0],
                lng: document.getElementById('coordenadas').value.split(',')[1]
            },
            fechaVisita: document.getElementById('fechaVisita').value
        }
    };

    // Crear FormData
    const formData = new FormData();
    formData.append('datos', JSON.stringify(datos));
    formData.append('identificacion', document.getElementById('identificacion').files[0]);
    formData.append('comprobante', document.getElementById('comprobanteDomicilio').files[0]);

    try {
        const response = await fetch('/ProyectoADS_CTCDigital/src/backend/guardarSolicitud.php', {
            method: 'POST',
            body: formData
        });

        const resultado = await response.json();
        console.log(resultado.idSolicitud);
        
        if (resultado.success) {
            generarPDF(resultado.idSolicitud);
            nextSection(7);
        } else {
            alert('Error: ' + (resultado.error || 'Desconocido'));
        }
    } catch (error) {
        console.log('Error de conexión: ' + error.message);
    }
}

function generarPDF(idSolicitud) {
    const formData = {
        idSolicitud: idSolicitud,
        // Datos del adoptante
        nombreCompleto: document.getElementById('nombreCompleto').value,
        edad: document.getElementById('edad').value,
        fechaVisita: document.getElementById('fechaVisita').value,
        direccion: document.getElementById('direccion').value,
        ocupacion: document.getElementById('ocupacion').value,
        escolaridad: document.getElementById('escolaridad').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        mascotaAdoptar: document.getElementById('mascotaAdoptar').value,
        
        // Motivación y experiencia
        razonAdopcion: document.getElementById('razonAdopcion').value,
        otrosAnimales: document.querySelector('input[name="otrosAnimales"]:checked')?.value || '',
        mascotasPrevias: document.getElementById('mascotasPrevias').value,
        mascotasAccidentes: document.getElementById('mascotasAccidentes').value,
        adopcionPrevia: document.querySelector('input[name="adopcionPrevia"]:checked')?.value || '',
        medioConocimiento: document.getElementById('medioConocimiento').value,
        razonEspecial: document.getElementById('razonEspecial').value,
        
        // Situación familiar y hogar
        visitas: document.querySelector('input[name="visitas"]:checked')?.value || '',
        opinionVisitas: document.getElementById('opinionVisitas').value,
        acuerdoFamilia: document.querySelector('input[name="acuerdoFamilia"]:checked')?.value || '',
        alergias: document.querySelector('input[name="alergias"]:checked')?.value || '',
        niniosCasa: document.querySelector('input[name="niniosCasa"]:checked')?.value || '',
        edades: document.getElementById('edades')?.value || '',
        permisoArrendador: document.querySelector('input[name="permisoArrendador"]:checked')?.value || '',
        cambioDomicilio: document.getElementById('cambioDomicilio').value,
        visionFuturo: document.getElementById('visionFuturo').value,
        
        // Cuidados y condiciones
        espacioExterior: document.querySelector('input[name="espacioExterior"]:checked')?.value || '',
        descripcionEspacio: document.getElementById('descripcionEspacio')?.value || '',
        tiempoSolo: document.getElementById('tiempoSolo').value,
        lugarDormir: document.getElementById('lugarDormir').value,
        accesoAreas: document.getElementById('accesoAreas').value,
        cuidadoViajes: document.getElementById('cuidadoViajes').value,
        paciencia: document.querySelector('input[name="paciencia"]:checked')?.value || '',
        gastoMensual: document.getElementById('gastoMensual').value,
        responsableGastos: document.getElementById('responsableGastos').value,
        
        // Compromisos de cuidado
        dispuestoCuidados: document.querySelector('input[name="dispuestoCuidados"]:checked')?.value || '',
        veterinario: document.querySelector('input[name="veterinario"]:checked')?.value || '',
        recursosVeterinarios: document.querySelector('input[name="recursosVeterinarios"]:checked')?.value || '',
        opinionAzotea: document.getElementById('opinionAzotea').value,
        conceptoMascota: document.getElementById('conceptoMascota').value,
        modificacionFisica: document.querySelector('input[name="modificacionFisica"]:checked')?.value || '',
        planContingencia: document.getElementById('planContingencia').value
    };

    // Enviar datos al servidor para generar PDF
    return fetch('/ProyectoADS_CTCDigital/src/backend/generarPDF.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            return data;
        } else {
            throw new Error(data.message || 'Error al generar PDF');
        }
    });
}