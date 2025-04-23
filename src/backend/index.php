<?php
    header("Content-Type: application/json");
    require_once "conexion.php";

    $adopciones = 0;
    $rescates = 0;
    $donadores = [];

    // Adopciones
    $sqlAdoptados = "SELECT COUNT(*) as totalAdoptados FROM mascota WHERE estadoAdopcion = 'Adoptado'";
    $resultAdoptados = $conexion->query($sqlAdoptados);
    if ($resultAdoptados) {
        $fila = $resultAdoptados->fetch_assoc();
        $adopciones = $fila['totalAdoptados'];
    }

    // Rescates
    $sqlTotal = "SELECT COUNT(*) as totalMascotas FROM mascota";
    $resultTotal = $conexion->query($sqlTotal);
    if ($resultTotal) {
        $fila = $resultTotal->fetch_assoc();
        $rescates = $fila['totalMascotas'];
    }

    // Donadores con usuario
    $sqlDonadores = "SELECT usuario, tipo, descripcion, img, color FROM donacion WHERE usuario IS NOT NULL";
    $resultDonadores = $conexion->query($sqlDonadores);
    if ($resultDonadores && $resultDonadores->num_rows > 0) {
        while ($fila = $resultDonadores->fetch_assoc()) {
            $donadores[] = $fila;
        }
    }

    echo json_encode([
        "adoptados" => $adopciones,
        "total" => $rescates,
        "donadores" => $donadores
    ]);

    $conexion->close();
?>
