<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();
require_once "conexion.php";

// Obtener y decodificar los datos del POST
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos
if (empty($data['usuario']) || empty($data['contraseña'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Usuario y contraseña son requeridos'
    ]);
    exit;
}

$usuario = $data['usuario'];
$contraseña = $data['contraseña'];

try {
    // Buscar al administrador
    $stmt = $conn->prepare("SELECT id, usuario, contraseña FROM admin WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Usuario no encontrado'
        ]);
        exit;
    }

    $admin = $result->fetch_assoc();

    // Verificar contraseña (sin hash en este caso, se recomienda usar password_hash en producción)
    if ($contraseña === $admin['contraseña']) {
        // Actualizar última conexión
        $fechaActual = date("Y-m-d H:i:s");
        $updateStmt = $conn->prepare("UPDATE admin SET ultimaConn = ? WHERE id = ?");
        $updateStmt->bind_param("si", $fechaActual, $admin['id']);
        $updateStmt->execute();

        // Iniciar sesión
        $_SESSION['admin_logged'] = true;
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_user'] = $admin['usuario'];
        $_SESSION['last_activity'] = time();
        session_regenerate_id(true);

        // Cookie segura (opcional según tu contexto)
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
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Contraseña incorrecta'
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error en el servidor: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
