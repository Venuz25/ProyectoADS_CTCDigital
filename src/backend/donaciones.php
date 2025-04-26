<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once "conexion.php";

// Obtener datos del POST
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos requeridos
if (empty($data['nombreDonante']) || empty($data['correo']) || empty($data['tipo']) || 
    empty($data['fechaDonacion']) || empty($data['descripcion'])) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos requeridos']);
    exit;
}

// Insertar en tabla donacion
$sql = "INSERT INTO donacion (nombreDonante, correo, tipo, fechaDonacion, descripcion, monto) 
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

// Si es monetaria, incluir el monto, de lo contrario NULL
$monto = ($data['tipo'] === 'Monetaria') ? $data['monto'] : NULL;

$stmt->bind_param("sssssd", 
    $data['nombreDonante'],
    $data['correo'],
    $data['tipo'],
    $data['fechaDonacion'],
    $data['descripcion'],
    $monto
);

// Ejecutar la inserción
if ($stmt->execute()) {
    $idDonacion = $stmt->insert_id;
    
    // Si eligió publicar, insertar en userdonador
    if ($data['publicar'] && !empty($data['usuario']) && !empty($data['img']) && !empty($data['color'])) {
        $sqlUser = "INSERT INTO userdonador (idDonador, usuario, img, color) 
                   VALUES (?, ?, ?, ?)";
        
        $stmtUser = $conn->prepare($sqlUser);
        $stmtUser->bind_param("isss", $idDonacion, $data['usuario'], $data['img'], $data['color']);
        
        if (!$stmtUser->execute()) {
            echo json_encode(['success' => false, 'message' => 'Error al guardar datos públicos: ' . $stmtUser->error]);
            exit;
        }
        $stmtUser->close();
    }
    
    echo json_encode(['success' => true, 'message' => 'Donación registrada exitosamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar donación: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>