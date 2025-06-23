<?php
    require_once 'conexion.php';
    require_once __DIR__ .  '/utils/correo.php';

    header('Content-Type: application/json');

    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = $data['nombre'] ?? '';
    $correo = $data['correo'] ?? '';
    $idMascota = $data['idMascota'] ?? '';
    $nombreMascota = $data['nombreMascota'] ?? '';
    $testimonio = $data['testimonio'] ?? '';

    if ($conn->connect_error) {
        echo json_encode(["ok" => false, "mensaje" => "Error de conexión"]);
        exit;
    }

    // Verificar adoptante
    $stmt = $conn->prepare("SELECT idAdoptante FROM adoptante WHERE nombre = ? AND correo = ?");
    $stmt->bind_param("ss", $nombre, $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["ok" => false, "mensaje" => "Los datos del adoptante no coinciden"]);
        exit;
    }
    $idAdoptante = $result->fetch_assoc()['idAdoptante'];

    // Verificar solicitud aprobada
    $stmt = $conn->prepare("SELECT * FROM solicitud WHERE idAdoptante = ? AND idMascota = ? AND estadoAdopcion = 'Aprobada'");
    $stmt->bind_param("ii", $idAdoptante, $idMascota);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["ok" => false, "mensaje" => "Únicamente personas que hayan adoptado pueden realizar testimonios"]);
        exit;
    }

    // Enviar correo
    $asunto = "Testimonio de adopción";
    $mensajePlano = "Testimonio de $nombre:\n$testimonio";
    $mensajeHTML = "
    <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; background-color: #f9f9f9;'>
        <h2 style='color: #AF1B3F;'>Testimonio de adopción</h2>
        <p><strong>Nombre:</strong> $nombre</p>
        <p><strong>Correo:</strong> $correo</p>
        <p><strong>Mascota adoptada:</strong> {ID: $idMascota} $nombreMascota</p>
        <hr>
        <p style='font-style: italic;'>“$testimonio</p>
    </div>
    ";

    if (enviarCorreoAdopcion("digitalctcmx@gmail.com", $asunto, $mensajePlano, $mensajeHTML)) {
        echo json_encode(["ok" => true, "mensaje" => "¡Gracias! Tu testimonio ha sido enviado."]);
    } else {
        echo json_encode(["ok" => false, "mensaje" => "Error al enviar el testimonio por correo."]);
    }
?>
