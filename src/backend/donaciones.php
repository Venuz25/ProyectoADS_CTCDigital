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

    // 1. Insertar donante (o buscar si ya existe)
    $sqlDonante = "INSERT INTO donante (nombreDonante, correo) VALUES (?, ?)";
    $stmtDonante = $conn->prepare($sqlDonante);
    $stmtDonante->bind_param("ss", $data['nombreDonante'], $data['correo']);

    if (!$stmtDonante->execute()) {
        echo json_encode(['success' => false, 'message' => 'Error al guardar donante: ' . $stmtDonante->error]);
        exit;
    }

    $idDonante = $stmtDonante->insert_id;
    $stmtDonante->close();

    // 2. Insertar donación
    $sqlDonacion = "INSERT INTO donacion (idDonante, estadoDonacion, tipo, fechaDonacion, descripcion, monto)
                    VALUES (?, ?, ?, ?, ?, ?)";

    $stmtDonacion = $conn->prepare($sqlDonacion);

    $monto = ($data['tipo'] === 'Monetaria') ? $data['monto'] : NULL;
    $estado = 'Pendiente';

    $stmtDonacion->bind_param("issssd",
        $idDonante,
        $estado,
        $data['tipo'],
        $data['fechaDonacion'],
        $data['descripcion'],
        $monto
    );

    if (!$stmtDonacion->execute()) {
        echo json_encode(['success' => false, 'message' => 'Error al guardar donación: ' . $stmtDonacion->error]);
        exit;
    }

    $idDonacion = $stmtDonacion->insert_id;
    $stmtDonacion->close();

    // 3. Insertar visualización si se publica
    if (!empty($data['publicar']) && !empty($data['usuario']) && !empty($data['img']) && !empty($data['color'])) {
        $sqlVisual = "INSERT INTO donacionvisual (idUser, usuario, img, color)
                    VALUES (?, ?, ?, ?)";

        $stmtVisual = $conn->prepare($sqlVisual);
        $stmtVisual->bind_param("isss", $idDonacion, $data['usuario'], $data['img'], $data['color']);

        if (!$stmtVisual->execute()) {
            echo json_encode(['success' => false, 'message' => 'Error al guardar datos públicos: ' . $stmtVisual->error]);
            exit;
        }
        $stmtVisual->close();
    }

    echo json_encode(['success' => true, 'message' => 'Donación registrada exitosamente']);
    $conn->close();
?>
