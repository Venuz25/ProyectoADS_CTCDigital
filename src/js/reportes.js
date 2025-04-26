//colores de las líneas del metro
const coloresLineas = {
    "1": "#F7226F",  // Rosa
    "2": "#0054A6",  // Azul
    "3": "#6DBA45",  // Verde olivo
    "4": "#00A9E0",  // Cian
    "5": "#FFD100",  // Amarillo
    "6": "#E5451F",  // Rojo
    "7": "#F7921E",  // Naranja
    "8": "#00A261",  // Verde
    "9": "#A67C52",  // Café
    "A": "#8F4B9B",  // Morado
    "B": "#7E878D",  // Verde y Gris
    "12": "#D5A021"  // Oro
  };

// Mapeo de líneas a estaciones
const estacionesPorLinea = {
    "1": ["Observatorio", "Tacubaya", "Juanacatlán", "Chapultepec", "Sevilla", "Insurgentes", "Cuauhtémoc", 
          "Balderas", "Salto del Agua", "Isabel la Católica", "Pino Suárez", "Merced", "Candelaria", 
          "San Lázaro", "Moctezuma", "Balbuena", "Boulevard Puerto Aéreo", "Gómez Farías", "Zaragoza", "Pantitlán"],
    "2": ["Cuatro Caminos", "Panteones", "Tacuba", "Cuitláhuac", "Popotla", "Colegio Militar", "Normal", 
          "San Cosme", "Revolución", "Hidalgo", "Bellas Artes", "Allende", "Zócalo", "Pino Suárez", 
          "San Antonio Abad", "Chabacano", "Viaducto", "Xola", "Villa de Cortés", "Nativitas", 
          "Portales", "Ermita", "General Anaya", "Tasqueña"],
    "3": ["Indios Verdes", "Deportivo 18 de Marzo", "Potrero", "La Raza", "Tlatelolco", "Guerrero", 
          "Hidalgo", "Juárez", "Balderas", "Niños Héroes", "Hospital General", "Centro Médico", 
          "Etiopía", "Eugenia", "División del Norte", "Zapata", "Coyoacán", "Viveros", "Miguel Ángel de Quevedo", 
          "Copilco", "Universidad"],
    "4": ["Martín Carrera", "Talismán", "Bondojito", "Consulado", "Canal del Norte", "Morelos", 
          "Candelaria", "Fray Servando", "Jamaica", "Santa Anita"],
    "5": ["Politécnico", "Instituto del Petróleo", "Autobuses del Norte", "La Raza", "Misterios", 
          "Valle Gómez", "Consulado", "Eduardo Molina", "Aragón", "Oceanía", "Terminal Aérea", "Hangares", 
          "Pantitlán"],
    "6": ["El Rosario", "Tezozómoc", "UAM Azcapotzalco", "Ferrería", "Norte 45", "Vallejo", 
          "Instituto del Petróleo", "Lindavista", "Deportivo 18 de Marzo", "La Villa-Basílica", "Martín Carrera"],
    "7": ["El Rosario", "Aquiles Serdán", "Camarones", "Refinería", "Tacuba", "San Joaquín", 
          "Polanco", "Auditorio", "Constituyentes", "Tacubaya", "San Pedro de los Pinos", "San Antonio", 
          "Mixcoac", "Barranca del Muerto"],
    "8": ["Garibaldi", "Bellas Artes", "San Juan de Letrán", "Salto del Agua", "Doctores", "Obrera", 
          "Chabacano", "La Viga", "Santa Anita", "Coyuya", "Iztacalco", "Apatlaco", "Aculco", 
          "Escuadrón 201", "Atlalilco", "Iztapalapa", "Cerro de la Estrella", "UAM-I", "Constitución de 1917"],
    "9": ["Tacubaya", "Patriotismo", "Chilpancingo", "Centro Médico", "Lázaro Cárdenas", "Chabacano", 
          "Jamaica", "Mixiuhca", "Velódromo", "Ciudad Deportiva", "Puebla", "Pantitlán"],
    "A": ["Pantitlán", "Agrícola Oriental", "Canal de San Juan", "Tepalcates", "Guelatao", "Peñón Viejo", 
          "Acatitla", "Santa Marta", "Los Reyes", "La Paz"],
    "B": ["Buenavista", "Guerrero", "Garibaldi", "Lagunilla", "Tepito", "Morelos", "San Lázaro", 
          "Flores Magón", "Romero Rubio", "Oceanía", "Deportivo Oceanía", "Bosque de Aragón", "Villa de Aragón", 
          "Nezahualcóyotl", "Impulsora", "Río de los Remedios", "Muzquiz", "Ecatepec", "Olímpica", "Plaza Aragón", 
          "Ciudad Azteca"],
    "12": ["Mixcoac", "Insurgentes Sur", "Hospital 20 de Noviembre", "Zapata", "Parque de los Venados", 
           "Eje Central", "Ermita", "Mexicaltzingo", "Atlalilco", "Culhuacán", "San Andrés Tomatlán", 
           "Lomas Estrella", "Calle 11", "Periférico Oriente", "Tezonco", "Olivos", "Nopalera", "Zapotitlán", 
           "Tlaltenco", "Tláhuac"]
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

// Navegación entre secciones
function showSection(sectionNumber) {
    // Ocultar todas las secciones
    document.querySelectorAll('.form-section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Mostrar la sección solicitada
    document.getElementById(`section-${sectionNumber}`).classList.add('active');
    
    // Actualizar la barra de progreso
    const progressPercentage = (sectionNumber / 4) * 100;
    document.getElementById('form-progress').style.width = `${progressPercentage}%`;
}

// Siguiente seccion
function nextSection(currentSection) {
    showSection(currentSection + 1);
}

// Sección anterior
function prevSection(currentSection) {
    showSection(currentSection - 1);
}

// Enviar el formulario de reportes
function validateReportForm() {
    const form = document.getElementById('report-form');
    if (form.checkValidity()) {
        // Recolectar datos
        const formData = {
            nombreReportante: document.getElementById('nombreReportante').value,
            correo: document.getElementById('correo').value,
            estacion: document.getElementById('estacion').value,
            detalles: document.getElementById('detalles').value
        };

        fetch('/ProyectoADS_CTCDigital/src/backend/reporte.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showSection(4);
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Ocurrió un error al enviar el reporte');
        });
        
    } else {
        form.classList.add('was-validated');
    }
}

// Validación de formularios
function validateReporterForm() {
    const form = document.getElementById('reporter-form');
    if (form.checkValidity()) {
      nextSection(2);
    } else {
      form.classList.add('was-validated');
    }
}

// Dibujar el select personalizado
document.addEventListener('DOMContentLoaded', function() {
    const lineaSelect = document.getElementById('linea');
    
    const customSelect = document.createElement('div');
    customSelect.className = 'custom-select';
    customSelect.innerHTML = `
      <div class="select-header">
        <span class="selected-value">Selecciona una línea</span>
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
