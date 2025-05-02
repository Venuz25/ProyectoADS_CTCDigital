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

        // Insertar el reportante en la tabla reportante
        $sqlReportante = "INSERT INTO reportante (nombre, correo) VALUES (?, ?)";
        $stmtReportante = $conn->prepare($sqlReportante);
        if ($stmtReportante === false) {
            die(json_encode(['status' => 'error', 'message' => 'Error en la preparación del INSERT para el reportante']));
        }

        $stmtReportante->bind_param("ss", $nombre, $correo);
        if ($stmtReportante->execute()) {
            // Obtener el ID del reportante insertado
            $idReportante = $stmtReportante->insert_id;
            $stmtReportante->close();

            // Insertar el reporte con el ID del reportante
            $sqlReporte = "INSERT INTO reporte (
                idEstacionRep,
                idReportante, 
                descripcion, 
                fechaReporte,
                estadoReporte
            ) VALUES (?, ?, ?, NOW(), 'En proceso')";

            $stmtReporte = $conn->prepare($sqlReporte);
            if ($stmtReporte === false) {
                die(json_encode(['status' => 'error', 'message' => 'Error en la preparación del INSERT para el reporte']));
            }

            $stmtReporte->bind_param("iis", $idEstacionRep, $idReportante, $descripcion);

            if ($stmtReporte->execute()) {
                $idReporte = $stmtReporte->insert_id;

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
                echo json_encode(['status' => 'error', 'message' => 'Error al guardar el reporte: ' . $stmtReporte->error]);
            }

            $stmtReporte->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar el reportante: ' . $stmtReportante->error]);
        }

        $conn->close();
    } else {
        die(json_encode(['status' => 'error', 'message' => 'Método no permitido']));
    }
?>
