<?php
    $conexion = new mysqli("localhost", "root", "", "ctc");

    if ($conexion->connect_error) {
        http_response_code(500);
        echo json_encode(["error" => "Error de conexión a la base de datos"]);
        exit();
    }
?>
