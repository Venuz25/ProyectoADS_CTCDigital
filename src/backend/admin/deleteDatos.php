<?php
    header('Content-Type: application/json');
    include '../conexion.php';

    $id = $_POST['id'] ?? null;
    $tipo = $_POST['tipo'] ?? null;

    if (!$id || !$tipo) {
        echo json_encode(["success" => false, "message" => "Faltan datos"]);
        exit;
    }

    // Función auxiliar para eliminar carpetas recursivamente
    function eliminarCarpeta($ruta) {
        if (!file_exists($ruta)) {
            error_log("No existe: $ruta");
            return false;
        }
    
        if (!is_dir($ruta)) {
            error_log("No es carpeta: $ruta");
            return false;
        }
    
        $archivos = scandir($ruta);
        foreach ($archivos as $archivo) {
            if ($archivo === '.' || $archivo === '..') continue;
            $rutaCompleta = $ruta . DIRECTORY_SEPARATOR . $archivo;
    
            if (is_dir($rutaCompleta)) {
                eliminarCarpeta($rutaCompleta);
            } else {
                if (!unlink($rutaCompleta)) {
                    error_log("No se pudo eliminar archivo: $rutaCompleta");
                }
            }
        }
    
        if (!rmdir($ruta)) {
            error_log("No se pudo eliminar la carpeta: $ruta");
        }
    }    

    try {
        switch ($tipo) {
            case 'mascota':
                // Poner en NULL el idMascota en reportemascota
                $stmt = $conn->prepare("UPDATE reportemascota SET idMascota = NULL WHERE idMascota = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->close();

                // Obtener idAdoptantes relacionados a esa mascota
                $stmt = $conn->prepare("SELECT idAdoptante FROM solicitud WHERE idMascota = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $result = $stmt->get_result();
                $adoptantes = [];
                while ($row = $result->fetch_assoc()) {
                    $adoptantes[] = $row['idAdoptante'];
                }
                $stmt->close();

                // Eliminar solicitudes
                $stmt = $conn->prepare("DELETE FROM solicitud WHERE idMascota = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->close();

                // Eliminar adoptantes relacionados
                foreach ($adoptantes as $idAdoptante) {
                    $stmt = $conn->prepare("DELETE FROM adoptante WHERE idAdoptante = ?");
                    $stmt->bind_param("i", $idAdoptante);
                    $stmt->execute();
                    $stmt->close();
                }

                // Eliminar carpeta de imágenes
                $rutaMascota = __DIR__ . '/../../mascotas/' . $id;
                eliminarCarpeta($rutaMascota);

                // Eliminar mascota
                $stmt = $conn->prepare("DELETE FROM mascota WHERE idMascota = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->close();

                echo json_encode(["success" => true, "message" => "Mascota eliminada correctamente"]);
                break;

            case 'solicitud':
                // Obtener idAdoptante
                $stmt = $conn->prepare("SELECT idAdoptante FROM solicitud WHERE idSolicitud = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->bind_result($idAdoptante);
                $stmt->fetch();
                $stmt->close();

                // Eliminar PDF asociado
                $rutaPDF = __DIR__ . '/../../solicitudes/' . $id . '.pdf';
                if (file_exists($rutaPDF)) {
                    unlink($rutaPDF);
                }

                // Eliminar solicitud
                $stmt = $conn->prepare("DELETE FROM solicitud WHERE idSolicitud = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->close();

                // Eliminar adoptante
                $stmt = $conn->prepare("DELETE FROM adoptante WHERE idAdoptante = ?");
                $stmt->bind_param("i", $idAdoptante);
                $stmt->execute();
                $stmt->close();

                echo json_encode(["success" => true, "message" => "Solicitud eliminada correctamente"]);
                break;

            case 'reporte':
                // Obtener idReportante
                $stmt = $conn->prepare("SELECT idReportante FROM reporte WHERE idReporte = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->bind_result($idReportante);
                $stmt->fetch();
                $stmt->close();

                // Eliminar carpeta de evidencia si existe
                $rutaReporte = __DIR__ . '/../../reportes/' . $id;
                eliminarCarpeta($rutaReporte);

                // Eliminar reporte
                $stmt = $conn->prepare("DELETE FROM reporte WHERE idReporte = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->close();

                // Eliminar reportante
                $stmt = $conn->prepare("DELETE FROM reportante WHERE idReportante = ?");
                $stmt->bind_param("i", $idReportante);
                $stmt->execute();
                $stmt->close();

                echo json_encode(["success" => true, "message" => "Reporte eliminado correctamente"]);
                break;

            case 'donacion':
                // Obtener idDonante
                $stmt = $conn->prepare("SELECT idDonante FROM donacion WHERE idDonacion = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->bind_result($idDonante);
                $stmt->fetch();
                $stmt->close();

                // Eliminar donacion
                $stmt = $conn->prepare("DELETE FROM donacion WHERE idDonacion = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->close();

                // Eliminar donante
                $stmt = $conn->prepare("DELETE FROM donante WHERE idDonante = ?");
                $stmt->bind_param("i", $idDonante);
                $stmt->execute();
                $stmt->close();

                echo json_encode(["success" => true, "message" => "Donación eliminada correctamente"]);
                break;

            case 'admin':
                $stmt = $conn->prepare("DELETE FROM admin WHERE id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $stmt->close();

                echo json_encode(["success" => true, "message" => "Administrador eliminado correctamente"]);
                break;

            default:
                echo json_encode(["success" => false, "message" => "Tipo no válido"]);
                break;
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error al eliminar: " . $e->getMessage()]);
    }
?>
