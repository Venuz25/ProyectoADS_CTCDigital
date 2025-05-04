<?php
    $conn = new mysqli("localhost", "root", "", "ctc");

    if (!$conn) {
        echo json_encode(["success" => false, "message" => "Error de conexión"]);
        exit;
    }    
?>
