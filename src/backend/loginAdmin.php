<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();
require_once "conexion.php";

// Obtener datos del POST
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validar datos recibidos
if (empty($data['usuario']) || empty($data['contraseña'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Usuario y contraseña son requeridos'
    ]);
    exit;
}

$usuario = $conn->real_escape_string($data['usuario']);
$contraseña = $data['contraseña'];

try {
    // Consulta preparada para evitar inyección SQL
    $stmt = $conn->prepare("SELECT id, usuario, contraseña FROM admin WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        // Si no se encuentra el usuario
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Usuario no encontrado'
        ]);
        exit;
    }

    $admin = $result->fetch_assoc();

    // Verificar contraseña
    if ($contraseña === $admin['contraseña']) {
        // Si las credenciales coinciden, iniciar sesión
        $_SESSION['admin_logged'] = true;
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_user'] = $admin['usuario'];
        $_SESSION['last_activity'] = time();
        
        // Regenerar ID de sesión
        session_regenerate_id(true);
        
        // Configurar cookie de sesión segura
        setcookie(session_name(), session_id(), [
            'expires' => 0,
            'path' => '/',
            'secure' => true, 
            'httponly' => true, 
            'samesite' => 'Strict'
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Inicio de sesión exitoso'
        ]);
    } else {
        // Contraseña incorrecta
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Contraseña incorrecta'
        ]);
    }
} catch (Exception $e) {
    // Error del servidor
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error en el servidor: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
