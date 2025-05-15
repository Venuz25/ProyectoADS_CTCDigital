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
            // Lógica para actualizar una solicitud
            break;

        case 'reporte':
            // Lógica para actualizar un reporte
            break;

        case 'donacion':
            // Lógica para actualizar una donación
            break;

        case 'admin':
            // Lógica para actualizar información del administrador
            break;

        default:
            echo json_encode(["status" => "success", "mensaje" => "Tipo no válido."]);
            break;
    }

    $conn->close();
?>
