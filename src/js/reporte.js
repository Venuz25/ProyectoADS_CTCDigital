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

    // Delimita fecha y hora
    const fechaInput = document.getElementById('fechaHora');
    
    // Obtener la fecha actual en formato compatible con input datetime-local
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const maxDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    fechaInput.max = maxDateTime;
});

// Enviar el formulario de reportes
function validateReportForm() {
  const reporterForm = document.getElementById('reporter-form');
  const reportForm = document.getElementById('report-form');

  if (reporterForm.checkValidity() && reportForm.checkValidity()) {
      const formData = new FormData();

      // Agregar datos del reportante
      formData.append('nombreReportante', document.getElementById('nombreReportante').value);
      formData.append('correo', document.getElementById('correo').value);

      // Agregar datos del reporte
      formData.append('linea', document.getElementById('linea').value);
      formData.append('estacion', document.getElementById('estacion').value);
      formData.append('fechaHora', document.getElementById('fechaHora').value);
      formData.append('detalles', document.getElementById('detalles').value);

      // Agregar archivos (evidencias)
      const evidenciasInput = document.getElementById('evidencias');
      for (let i = 0; i < evidenciasInput.files.length; i++) {
          formData.append('evidencias[]', evidenciasInput.files[i]);
      }

      // Ahora enviamos
      fetch('/ProyectoADS_CTCDigital/src/backend/reporte.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.text()) 
      .then(text => {
          console.log("Respuesta cruda del servidor:", text); 
          try {
              const data = JSON.parse(text); 
              if (data.status === 'success') {
                  showSection(4);
              } else {
                  alert('Error: ' + data.message);
              }
          } catch (e) {
              console.error('Error al convertir JSON:', e);
              alert('Respuesta inesperada del servidor: ' + text);
          }
      });

  } else {
      if (!reporterForm.checkValidity()) {
          reporterForm.classList.add('was-validated');
      }
      if (!reportForm.checkValidity()) {
          reportForm.classList.add('was-validated');
      }
  }
}

