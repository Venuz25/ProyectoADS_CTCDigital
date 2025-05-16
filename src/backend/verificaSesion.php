<?php
session_start();

$inactividadMax = 900; // n * 60

if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $inactividadMax) {
    session_unset();
    session_destroy();
    echo json_encode(['logged' => false, 'expired' => true]);
    exit;
}

$_SESSION['last_activity'] = time();

// Verificar si hay sesión activa
if (isset($_SESSION['admin_logged']) && $_SESSION['admin_logged'] === true) {
    echo json_encode(['logged' => true, 'usuario' => $_SESSION['admin_user']]);
} else {
    echo json_encode(['logged' => false]);
}
?>