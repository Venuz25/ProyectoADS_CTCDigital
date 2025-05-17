<?php
require_once 'conexion.php';

$conn->begin_transaction();

try {
    if (!isset($_POST['datos'])) {
        throw new Exception("No se recibieron datos");
    }

    $datos = json_decode($_POST['datos'], true);
    if (!$datos) {
        throw new Exception("Error al decodificar datos JSON");
    }

    // Extraer datos desde el objeto
    $nombre = $datos['adoptante']['nombre'] ?? null;
    $telefono = $datos['adoptante']['telefono'] ?? null;
    $correo = $datos['adoptante']['correo'] ?? null;
    $idMascota = $datos['idMascota'] ?? null;
    $direccion = $datos['visita']['direccion'] ?? null;
    $lat = $datos['visita']['coordenadas']['lat'] ?? null;
    $lng = $datos['visita']['coordenadas']['lng'] ?? null;
    $fechaVisita = $datos['visita']['fechaVisita'] ?? null;

    $ubicacion = "$lat,$lng";
    $fechaSolicitud = date('Y-m-d');
    $estadoAdopcion = "Pendiente";
    $comentarios = null;
    $estadoVisita = "Pendiente";
    $notas = null;

    // Validar archivos
    if (!isset($_FILES['identificacion']) || !isset($_FILES['comprobante'])) {
        throw new Exception("Faltan archivos requeridos");
    }

    // Insertar adoptante
    $stmt = $conn->prepare("INSERT INTO adoptante (nombre, telefono, correo) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $telefono, $correo);
    $stmt->execute();
    $idAdoptante = $stmt->insert_id;
    $stmt->close();

    // Insertar solicitud
    $stmt = $conn->prepare("INSERT INTO solicitud (idMascota, idAdoptante, fechaSolicitud, estadoAdopcion, comentarios) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("iisss", $idMascota, $idAdoptante, $fechaSolicitud, $estadoAdopcion, $comentarios);
    $stmt->execute();
    $idSolicitud = $stmt->insert_id;
    $stmt->close();

    // Insertar visita domiciliaria
    $stmt = $conn->prepare("INSERT INTO visitadom (idSolicitud, direccion, ubicacion, estadoVisita, fechaVisita, notas) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssss", $idSolicitud, $direccion, $ubicacion, $estadoVisita, $fechaVisita, $notas);
    $stmt->execute();
    $stmt->close();

    // Guardar archivos
    $ruta = __DIR__ . "/../../solicitudes/$idSolicitud/";
    if (!file_exists($ruta)) {
        mkdir($ruta, 0777, true);
    }

    $archivo1 = $ruta . "credencial.pdf";
    if (!move_uploaded_file($_FILES['identificacion']['tmp_name'], $archivo1)) {
        throw new Exception("No se pudo guardar credencial.pdf");
    }

    $archivo2 = $ruta . "comprobanteDomicilio.pdf";
    if (!move_uploaded_file($_FILES['comprobante']['tmp_name'], $archivo2)) {
        throw new Exception("No se pudo guardar comprobanteDomicilio.pdf");
    }

    $conn->commit();
    echo json_encode([
        "success" => true, 
        "message" => "Solicitud registrada con éxito",
        "idSolicitud" => $idSolicitud
    ]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
