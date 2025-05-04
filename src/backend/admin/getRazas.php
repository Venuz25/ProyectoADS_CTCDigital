<?php
    require_once "../conexion.php";
    header('Content-Type: application/json');

    // Obtener razas con su especie
    $sqlRazas = "SELECT raza.idRaza, raza.nombre AS raza, especie.nombre AS especie
                FROM raza
                INNER JOIN especie ON raza.idEspecie = especie.idEspecie
                ORDER BY especie.nombre, raza.nombre";

    $resultadoRazas = $conn->query($sqlRazas);
    $razas = [];

    if ($resultadoRazas->num_rows > 0) {
        while ($fila = $resultadoRazas->fetch_assoc()) {
            $razas[] = $fila;
        }
    }

    // Obtener especies
    $sqlEspecies = "SELECT idEspecie, nombre FROM especie ORDER BY nombre";
    $resultadoEspecies = $conn->query($sqlEspecies);
    $especies = [];

    if ($resultadoEspecies->num_rows > 0) {
        while ($fila = $resultadoEspecies->fetch_assoc()) {
            $especies[] = $fila;
        }
    }

    // Enviar ambas en un solo JSON
    echo json_encode([
        'razas' => $razas,
        'especies' => $especies
    ]);

    $conn->close();
?>
