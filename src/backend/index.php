<?php
    header("Content-Type: application/json");
    require_once "conexion.php";

    $adopciones = 0;
    $rescates = 0;
    $donadores = [];

    // Adopciones
    $sqlAdoptados = "SELECT COUNT(*) as totalAdoptados FROM mascota WHERE estadoAdopcion = 'Adoptado'";
    $resultAdoptados = $conn->query($sqlAdoptados);
    if ($resultAdoptados) {
        $fila = $resultAdoptados->fetch_assoc();
        $adopciones = $fila['totalAdoptados'];
    }

    // Rescates
    $sqlTotal = "SELECT COUNT(*) as totalMascotas FROM mascota";
    $resultTotal = $conn->query($sqlTotal);
    if ($resultTotal) {
        $fila = $resultTotal->fetch_assoc();
        $rescates = $fila['totalMascotas'];
    }

    // Donadores con usuario
    $sqlDonadores = "
    SELECT 
        dv.usuario, 
        d.tipo, 
        d.descripcion, 
        dv.img, 
        dv.color
    FROM 
        donacion d
    INNER JOIN 
        donacionVisual dv ON d.idDonacion = dv.idUser
    WHERE 
        d.estadoDonacion = 'Finalizada'
    ";
    $resultDonadores = $conn->query($sqlDonadores);
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

    $conn->close();
?>
