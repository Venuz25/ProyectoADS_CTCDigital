<?php
session_start();

// Eliminar variables de sesión
$_SESSION = [];

// Eliminar la cookie de sesión si existe
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, 
        $params["path"], 
        $params["domain"], 
        $params["secure"], 
        $params["httponly"]
    );
}

// Destruir la sesión
session_destroy();

// Detectar si viene de fetch o Beacon
$isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) || ($_SERVER['CONTENT_TYPE'] ?? '') === 'text/plain';

if ($isAjax) {
    // Para llamadas JS
    echo json_encode(["success" => true, "message" => "Sesión cerrada"]);
} else {
    // Para botón o acceso directo
    header("Location: /ProyectoADS_CTCDigital/src/login.html");
    exit;
}
?>
