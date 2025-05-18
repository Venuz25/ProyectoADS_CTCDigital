let currentSection = 1;
let showCustomization = false;
const publicarCheckbox = document.getElementById('publicarDonacion');
const btnDonacionSubmit = document.getElementById('btnDonacionSubmit');

// Generar avatares
const avatarGrid = document.getElementById('avatar-grid');
for (let i = 1; i <= 20; i++) {
    const img = document.createElement('img');
    img.src = `/ProyectoADS_CTCDigital/recursos/Index/donadores/${i}.png`;
    img.className = 'avatar-img';
    img.onclick = () => selectAvatar(img);
    avatarGrid.appendChild(img);
}

function selectAvatar(img) {
    document.querySelectorAll('.avatar-img').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
    document.getElementById('avatarSelected').value = img.src;
}

// Manejar tipo de donación
document.getElementById('tipoDonacion').addEventListener('change', function() {
    const type = this.value;
    const detailsDiv = document.getElementById('donation-details');
    let html = '';

    if (type === 'monetaria') {
        html = `
        <div class="mb-3">
            <label class="form-label">Monto</label>
            <input type="number" class="form-control" id="monto" required>
        </div>`;
    }

    // Obtener fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    html += `
        <div class="mb-3">
        <label class="form-label">Fecha</label>
        <input type="date" class="form-control" id="fechaDonacion" min="${today}" required>
        <div class="invalid-feedback">Selecciona una fecha futura</div>
        </div>
        <div class="mb-3">
        <label class="form-label">${type === 'voluntariado' ? 'Actividades planeadas' : 'Motivo'}</label>
        <textarea class="form-control" id="descripcion" rows="3" required></textarea>
        <div class="invalid-feedback">Este campo es requerido</div>
        </div>`;

    detailsDiv.innerHTML = html;
});

// Navegación
function showSection(sectionNumber) {
    currentSection = sectionNumber;
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`section-${sectionNumber}`).classList.add('active');
    document.getElementById('donation-progress').style.width = `${(sectionNumber/5)*100}%`;
}

function nextSection() {
    if (currentSection === 3 && !document.getElementById('publicarDonacion').checked) {
        showSection(5);
    } else {
        showSection(currentSection + 1);
    }
}

function prevSection() {
    showSection(currentSection - 1);
}

// Función para actualizar el texto del botón
function updateButtonText() {
    if (publicarCheckbox.checked) {
      btnDonacionSubmit.innerHTML = 'Siguiente <i class="fas fa-arrow-right ms-2"></i>';
    } else {
      btnDonacionSubmit.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Finalizar';
    }
}

// Event listener para el checkbox
publicarCheckbox.addEventListener('change', updateButtonText);
btnDonacionSubmit.addEventListener('click', validateDonationForm);

// Llama a updateButtonText al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  updateButtonText();
});

// Validaciones
let selectedAvatar = null;

function validateDonorForm() {
    if (document.getElementById('donor-form').checkValidity()) {
        nextSection();
    } else {
        document.getElementById('donor-form').classList.add('was-validated');
    }
}

// Función modificada para validar el formulario de donación
function validateDonationForm() {
    const form = document.getElementById('donation-form');
    
    if (form.checkValidity()) {
      if (document.getElementById('publicarDonacion').checked) {
        // Si quiere publicar, ir a sección 4 (personalización)
        showSection(4);
      } else {
        // Si NO quiere publicar, validar y enviar directamente
        if (validateDonationData()) {
          submitDonation();
        }
      }
    } else {
      form.classList.add('was-validated');
      Array.from(form.elements).forEach(element => {
        if (!element.checkValidity()) {
          const feedback = element.nextElementSibling;
          if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.style.display = 'block';
          }
        }
      });
    }
}
  
// Llamar a updateButtonText al cargar la página para establecer el texto inicial
document.addEventListener('DOMContentLoaded', function() {
    updateButtonText();
});

// Función para seleccionar avatar
function selectAvatar(img) {
    document.querySelectorAll('.avatar-img').forEach(i => {
      i.classList.remove('selected');
    });
    
    img.classList.add('selected');
    selectedAvatar = img.src;
    
    document.getElementById('avatar-error').classList.add('d-none');
}
  
// Validación de personalización
function validateCustomization() {
    let isValid = true;
    const form = document.getElementById('customization-form');
    
    // Validar nombre público
    if (!form.usuario.value.trim()) {
      form.usuario.classList.add('is-invalid');
      isValid = false;
    } else {
      form.usuario.classList.remove('is-invalid');
    }
    
    // Validar avatar
    if (!selectedAvatar) {
      document.getElementById('avatar-error').classList.remove('d-none');
      isValid = false;
      alert('Debes seleccionar un avatar.');
    } else {
      document.getElementById('avatar-error').classList.add('d-none');
    }
    
    // Si todo es válido, enviar
    if (isValid) {
      submitDonation();
    } else {
      form.classList.add('was-validated');
    }
}
  
//validar los datos específicos de donación
function validateDonationData() {
    let isValid = true;
    
    // Validar fecha no pasada
    const fechaInput = document.getElementById('fechaDonacion');
    if (fechaInput) {
      const fechaSeleccionada = new Date(fechaInput.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (fechaSeleccionada < hoy) {
        fechaInput.classList.add('is-invalid');
        fechaInput.nextElementSibling.style.display = 'block';
        isValid = false;
      }
    }
    
    // Validar descripción
    const descripcion = document.getElementById('descripcion');
    if (descripcion && !descripcion.value.trim()) {
      descripcion.classList.add('is-invalid');
      descripcion.nextElementSibling.style.display = 'block';
      isValid = false;
    }
    
    return isValid;
}

// Validación de fecha
document.addEventListener('change', function(e) {
    if (e.target.id === 'fechaDonacion') {
        const fechaInput = e.target;
        const fechaSeleccionada = new Date(fechaInput.value);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        if (fechaSeleccionada < hoy) {
            fechaInput.classList.add('is-invalid');
        } else {
            fechaInput.classList.remove('is-invalid');
        }
    }
});

// Función para enviar donación
async function submitDonation() {
    const getElement = (id) => document.getElementById(id) || { value: null };
    
    // Recopilar todos los datos del formulario de manera segura
    const donationData = {
      nombreDonante: getElement('nombreDonante').value,
      correo: getElement('correo').value,
      tipo: getElement('tipoDonacion').value,
      monto: null,
      fechaDonacion: getElement('fechaDonacion').value,
      descripcion: getElement('descripcion').value,
      publicar: getElement('publicarDonacion').checked,
      usuario: null,
      img: null,
      color: null
    };
  
    // Si eligió publicar, obtener los datos adicionales
    if (donationData.publicar) {
      donationData.usuario = getElement('usuario').value;
      
      const selectedAvatar = document.querySelector('.avatar-img.selected');
      if (selectedAvatar) {
        donationData.img = selectedAvatar.src.split('/').pop();
      }
      
      donationData.color = getElement('colorFondo').value;
    }
  
    // Si es donación monetaria, agregar el monto
    if (donationData.tipo === 'monetaria') {
      donationData.monto = getElement('monto').value;
    }
  
    // Validar datos mínimos requeridos
    if (!donationData.nombreDonante || !donationData.correo || !donationData.tipo || 
        !donationData.fechaDonacion || !donationData.descripcion) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
  
    try {
      // Mostrar carga mientras se envía
      const submitBtn = document.getElementById('btnDonacionSubmit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
  
      // Enviar datos al servidor
      const response = await fetch('/ProyectoADS_CTCDigital/src/backend/donaciones.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData)
      });
  
      const result = await response.json();
  
      if (result.success) {
        // Mostrar sección de agradecimiento
        showSection(5);
      } else {
        alert('Error al guardar la donación: ' + (result.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Por favor intente nuevamente.');
    } finally {
      // Restaurar el botón a su estado original
      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    }
}