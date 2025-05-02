window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});

window.addEventListener('load', function () {
    // Limpiar los campos de login al cargar la página
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    // Restablecer el estado del botón de inicio de sesión
    const submitBtn = document.querySelector('.btn-login');
    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i> INICIAR SESIÓN';
    submitBtn.disabled = false;
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validación básica
    if(!username || !password) {
        showAlert('Por favor complete todos los campos', 'warning');
        return;
    }

    // Mostrar spinner de carga
    const submitBtn = document.querySelector('.btn-login');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Validando...';
    submitBtn.disabled = true;

    // Enviar datos al servidor
    fetch('/ProyectoADS_CTCDigital/src/backend/loginAdmin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario: username,
            contraseña: password
        })
    })
    .then(response => {
        if (!response.ok) {
            // Si el servidor responde con un error HTTP (no 200)
            return response.json().then(errData => {
                throw new Error(errData.message || 'Error en la respuesta del servidor');
            });
        }
        return response.json(); // Si la respuesta es OK, continuamos
    })
    .then(data => {
        if (data.success) {
            window.location.href = '/ProyectoADS_CTCDigital/src/admin.html';
        } else {
            throw new Error(data.message || 'Credenciales incorrectas');
        }
    })
    .catch(error => {
        showAlert(error.message, 'danger');
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i> INICIAR SESIÓN';
        submitBtn.disabled = false;
    });
});

function showAlert(message, type = 'danger') {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} custom-alert mt-3 animate__animated animate__fadeIn`;
    alert.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;

    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(alert, form.nextSibling);

    // Eliminar alerta después de 4 segundos
    setTimeout(() => alert.remove(), 4000);
}
