<?php
    header('Content-Type: application/json');
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    require_once "../conexion.php";

    $tipo = $_POST['tipo'] ?? '';

    switch ($tipo) {
        case 'mascota':
            $idMascota = $_POST["idMascota"];
            $estadoAdopcion = $_POST["estadoObtenido"];
            $sexo = $_POST["sexoObtenido"];
            $edad = $_POST["edadObtenido"];
            $tamaño = $_POST["tamanoObtenido"];
            $caractFisica = $_POST["caractFisicaObtenido"];
            $estadoSalud = $_POST["estadoSaludObtenido"];
            $descripcion = $_POST["descripcionObtenido"];
            $imagenesEliminar = json_decode($_POST["imagenesAEliminar"] ?? "[]");
        
            // Actualizar tabla mascota
            $sqlMascota = "UPDATE mascota SET estadoAdopcion = ? WHERE idMascota = ?";
            $stmtMascota = $conn->prepare($sqlMascota);
            $stmtMascota->bind_param("si", $estadoAdopcion, $idMascota);
            $stmtMascota->execute();
        
            // Actualizar detallesmascota
            $sqlDetalles = "UPDATE detallesmascota SET sexo = ?, edad = ?, tamaño = ?, caractFisica = ?, estadoSalud = ?, descripcion = ? WHERE idMascota = ?";
            $stmtDetalles = $conn->prepare($sqlDetalles);
            $stmtDetalles->bind_param("sissssi", $sexo, $edad, $tamaño, $caractFisica, $estadoSalud, $descripcion, $idMascota);
            $stmtDetalles->execute();
        
            // Eliminar imágenes/videos
            foreach ($imagenesEliminar as $ruta) {
                $rutaCompleta = $_SERVER['DOCUMENT_ROOT'] . $ruta;
                if (file_exists($rutaCompleta)) {
                    unlink($rutaCompleta);
                }
            }
        
            $nuevasRutas = [];

            if (!empty($_FILES["fotosMascota"]["name"][0])) {
                $rutaBase = realpath(__DIR__ . '/../../../') . "/mascotas/$idMascota/";
                if (!is_dir($rutaBase)) {
                    mkdir($rutaBase, 0777, true);
                }

                foreach ($_FILES["fotosMascota"]["tmp_name"] as $index => $tmpName) {
                    $nombreArchivo = basename($_FILES["fotosMascota"]["name"][$index]);
                    $destino = $rutaBase . $nombreArchivo;

                    move_uploaded_file($tmpName, $destino);

                    // Guardar ruta relativa para devolver al frontend
                    $rutaRelativa = "/ProyectoADS_CTCDigital/mascotas/$idMascota/$nombreArchivo";
                    $nuevasRutas[] = $rutaRelativa;
                }
            }
        
            echo json_encode([
                "status" => "success",
                "mensaje" => "Datos de la mascota actualizados correctamente.",
                "archivosAgregados" => $nuevasRutas
            ]);
            
            exit;
            break;        

        case 'solicitud':
            $idSolicitud = $_POST["solicitudId"] ?? null;
            $estadoAdopcion = $_POST["estadoSolicitud"] ?? null;
            $comentarios = $_POST["comentariosSolicitud"] ?? null;
            $estadoVisita = $_POST["estadoVisita"] ?? null;
            $fechaVisita = $_POST["fechaVisita"] ?? null;
            $notasVisita = $_POST["notasVisita"] ?? null;
            $idMascota = $_POST["idMascotaSolicitud"] ?? null;
        
            // Validar que venga todo
            if (!$idSolicitud || !$idMascota) {
                echo json_encode(["status" => "error", "mensaje" => "Faltan datos obligatorios."]);
                exit;
            }
        
            // 1. Actualizar solicitud principal
            $sqlSolicitud = "UPDATE solicitud SET estadoAdopcion = ?, comentarios = ? WHERE idSolicitud = ?";
            $stmtSolicitud = $conn->prepare($sqlSolicitud);
            $stmtSolicitud->bind_param("ssi", $estadoAdopcion, $comentarios, $idSolicitud);
            $stmtSolicitud->execute();
        
            // 2. Actualizar visita domiciliaria
            $sqlVisita = "UPDATE visitadom SET estadoVisita = ?, fechaVisita = ?, notas = ? WHERE idSolicitud = ?";
            $stmtVisita = $conn->prepare($sqlVisita);
            $stmtVisita->bind_param("sssi", $estadoVisita, $fechaVisita, $notasVisita, $idSolicitud);
            $stmtVisita->execute();
        
            // 3. Lógica adicional si la solicitud fue Aprobada o se cambia a otro estado
            if ($estadoAdopcion === "Aprobada") {
                // Rechazar otras solicitudes para la misma mascota
                $rechazarOtras = "
                    UPDATE solicitud 
                    SET estadoAdopcion = 'Rechazada', comentarios = 'Rechazado debido a que la mascota ya ha sido adoptada'
                    WHERE idMascota = ? AND idSolicitud != ?";
                $stmtRechazo = $conn->prepare($rechazarOtras);
                $stmtRechazo->bind_param("ii", $idMascota, $idSolicitud);
                $stmtRechazo->execute();
        
                // Marcar la mascota como adoptada
                $sqlMascota = "UPDATE mascota SET estadoAdopcion = 'Adoptado', adoptadoPor = ? WHERE idMascota = ?";
                $stmtMascota = $conn->prepare($sqlMascota);
                $stmtMascota->bind_param("ii", $idSolicitud, $idMascota);
                $stmtMascota->execute();
            } else {
                // Restaurar otras solicitudes a pendientes
                $pendientesOtras = "
                    UPDATE solicitud 
                    SET estadoAdopcion = 'Pendiente', comentarios = NULL
                    WHERE idMascota = ? AND idSolicitud != ?";
                $stmtPendientes = $conn->prepare($pendientesOtras);
                $stmtPendientes->bind_param("ii", $idMascota, $idSolicitud);
                $stmtPendientes->execute();
        
                // Restaurar la mascota a disponible
                $sqlMascota = "UPDATE mascota SET estadoAdopcion = 'Disponible', adoptadoPor = NULL WHERE idMascota = ?";
                $stmtMascota = $conn->prepare($sqlMascota);
                $stmtMascota->bind_param("i", $idMascota);
                $stmtMascota->execute();
            }
        
            echo json_encode([
                "status" => "success",
                "mensaje" => "Solicitud actualizada correctamente con lógica de adopción aplicada."
            ]);
            exit;                       
            break;

        case 'reporte':
            $idReporte = $_POST["idReporte"] ?? null;
            $estado = $_POST["estadoReporte"] ?? null;
            $descripcion = $_POST["descripcionReporte"] ?? null;
            $mascotasSeleccionadas = $_POST["mascotasAsociadas"] ?? [];

            // Validar ID
            if (!$idReporte) {
                echo json_encode(["status" => "error", "mensaje" => "ID del reporte no proporcionado."]);
                exit;
            }

            // 1. Actualizar estado y descripción del reporte
            $sqlUpdate = "UPDATE reporte SET estadoReporte = ?, descripcion = ? WHERE idReporte = ?";
            $stmt = $conn->prepare($sqlUpdate);
            $stmt->bind_param("ssi", $estado, $descripcion, $idReporte);
            $stmt->execute();

            // 2. Obtener mascotas actualmente asociadas
            $mascotasActuales = [];
            $sqlActuales = "SELECT idMascota FROM reportemascota WHERE idReporte = ?";
            $stmtActuales = $conn->prepare($sqlActuales);
            $stmtActuales->bind_param("i", $idReporte);
            $stmtActuales->execute();
            $res = $stmtActuales->get_result();

            while ($row = $res->fetch_assoc()) {
                $mascotasActuales[] = $row['idMascota'];
            }

            // 3. Comparar y actualizar relaciones
            $mascotasSeleccionadas = array_map('intval', $mascotasSeleccionadas);

            // Agregar nuevas relaciones
            $aInsertar = array_diff($mascotasSeleccionadas, $mascotasActuales);
            foreach ($aInsertar as $idMascota) {
                $sqlInsert = "INSERT INTO reportemascota (idReporte, idMascota) VALUES (?, ?)";
                $stmtInsert = $conn->prepare($sqlInsert);
                $stmtInsert->bind_param("ii", $idReporte, $idMascota);
                $stmtInsert->execute();
            }

            // Eliminar relaciones deseleccionadas
            $aEliminar = array_diff($mascotasActuales, $mascotasSeleccionadas);
            foreach ($aEliminar as $idMascota) {
                $sqlDelete = "DELETE FROM reportemascota WHERE idReporte = ? AND idMascota = ?";
                $stmtDelete = $conn->prepare($sqlDelete);
                $stmtDelete->bind_param("ii", $idReporte, $idMascota);
                $stmtDelete->execute();
            }

            echo json_encode([
                "status" => "success",
                "mensaje" => "Reporte actualizado correctamente."
            ]);

            exit;
            break;

        case 'donacion':
            $idDonacion = $_POST["idDonacion"] ?? null;
            $estado = $_POST["estadoDonacion"] ?? null;
            $fechaPrevistaDon = $_POST["fechaPrevistaDon"] ?? null;
            $descripcion = $_POST["descripcion"] ?? null;
        
            if (!$idDonacion) {
                echo json_encode(["status" => "error", "mensaje" => "ID de donación no proporcionado."]);
                exit;
            }
        
            $sql = "UPDATE donacion SET estadoDonacion = ?, fechaPrevistaDon = ?, descripcion = ? WHERE idDonacion = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssi", $estado, $fechaPrevistaDon, $descripcion, $idDonacion);
            $stmt->execute();
        
            echo json_encode([
                "status" => "success",
                "mensaje" => "Donación actualizada correctamente."
            ]);
            exit;            
            break;

        case 'admin':
            $idAdmin = $_POST["idAdmin"] ?? null;
            $usuario = $_POST["usuario"] ?? null;
            $password = $_POST["password"] ?? null;

            if (!$idAdmin || !$usuario || !$password) {
                echo json_encode(["status" => "error", "mensaje" => "Faltan datos para actualizar el administrador."]);
                exit;
            }

            $sql = "UPDATE admin SET usuario = ?, contraseña = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssi", $usuario, $password, $idAdmin);
            $stmt->execute();

            echo json_encode([
                "status" => "success",
                "mensaje" => "Administrador actualizado correctamente."
            ]);
            exit;
            break;

        default:
            echo json_encode(["status" => "success", "mensaje" => "Tipo no válido."]);
            break;
    }

    $conn->close();
?>
