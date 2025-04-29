<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require_once "conexion.php";

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Obtiene datos del formulario con FormData
        $nombre = $conn->real_escape_string($_POST['nombreReportante'] ?? '');
        $correo = $conn->real_escape_string($_POST['correo'] ?? '');
        $linea = $conn->real_escape_string($_POST['linea'] ?? '');
        $estacion = $conn->real_escape_string($_POST['estacion'] ?? '');
        $descripcion = $conn->real_escape_string($_POST['detalles'] ?? '');

        // Validaciones básicas
        if (empty($nombre) || empty($correo) || empty($linea) || empty($estacion)) {
            die(json_encode(['status' => 'error', 'message' => 'Todos los campos obligatorios deben ser llenados']));
        }

        if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
            die(json_encode(['status' => 'error', 'message' => 'Correo electrónico no válido']));
        }

        if (strlen($nombre) > 100 || strlen($correo) > 100) {
            die(json_encode(['status' => 'error', 'message' => 'Los campos exceden la longitud permitida']));
        }

        // Obtener ID de la estación
        $queryEstacion = "SELECT idEstacion FROM estaciones WHERE nombre = ? AND linea = ?";
        $stmtEstacion = $conn->prepare($queryEstacion);
        $stmtEstacion->bind_param("ss", $estacion, $linea);
        $stmtEstacion->execute();
        $result = $stmtEstacion->get_result();

        if ($result->num_rows === 0) {
            die(json_encode(['status' => 'error', 'message' => 'Estación no encontrada en la línea especificada']));
        }

        $row = $result->fetch_assoc();
        $idEstacionRep = $row['idEstacion'];
        $stmtEstacion->close();

        // Insertar el reporte
        $sql = "INSERT INTO reporte (
            idEstacionRep,
            nombreReportante, 
            correo, 
            descripcion, 
            fechaReporte,
            estadoReporte
        ) VALUES (?, ?, ?, ?, NOW(), 'En proceso')";

        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            die(json_encode(['status' => 'error', 'message' => 'Error en la preparación del INSERT']));
        }

        $stmt->bind_param("isss", $idEstacionRep, $nombre, $correo, $descripcion);

        if ($stmt->execute()) {
            $idReporte = $stmt->insert_id;

            // Guardar archivos (si hay)
            if (!empty($_FILES['evidencias']['name'][0])) {
                $uploadDir = __DIR__ . "/../../reportes/$idReporte";
                if (!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                foreach ($_FILES['evidencias']['tmp_name'] as $key => $tmpName) {
                    $fileName = basename($_FILES['evidencias']['name'][$key]);
                    $targetPath = "$uploadDir/$fileName";
                    move_uploaded_file($tmpName, $targetPath);
                }
            }

            echo json_encode(['status' => 'success', 'message' => 'Reporte guardado exitosamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar el reporte: ' . $stmt->error]);
        }

        $stmt->close();
        $conn->close();
    } else {
        die(json_encode(['status' => 'error', 'message' => 'Método no permitido']));
    }
?>
