<?php
    header('Content-Type: application/json');
    require '../conexion.php';

    $tipo = $_POST['tipo'] ?? null;

    switch ($tipo) {
        case 'admin':
            $usuario = $_POST['usuario'];
            $contrasena = $_POST['contraseña'];

            $query = "INSERT INTO admin (usuario, contraseña, ultimaConn) VALUES (?, ?, NULL)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ss", $usuario, $contrasena);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Administrador registrado"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al registrar admin: " . $stmt->error]);
            }

            $stmt->close();
            break;

        case 'mascota':
            //PARA TABLA MASCOTA
            $nombre = $_POST['nombre'];
            $estadoAdopcion = $_POST['estadoAdopcion'];
            $fechaIngreso = $_POST['fechaIngreso'];
            $linea = $_POST['linea'];
            $estacion = $_POST['estacion'];

            // Buscar ID de la estación
            $queryEstacion = "SELECT idEstacion FROM estaciones WHERE nombre = ? AND linea = ?";
            $stmtEstacion = $conn->prepare($queryEstacion);
            $stmtEstacion->bind_param("ss", $estacion, $linea);
            $stmtEstacion->execute();
            $result = $stmtEstacion->get_result();

            if ($result->num_rows === 0) {
                echo json_encode(['success' => false, 'message' => 'Estación no encontrada en la línea especificada']);
                exit;
            }

            $row = $result->fetch_assoc();
            $idEstacion = $row['idEstacion'];
            $stmtEstacion->close();

            // Insertar raza nueva si aplica
            if ($_POST['raza'] === "nuevaRaza" && !empty($_POST['razaNueva'])) {
                $razaNueva = trim($_POST['razaNueva']);
                $especie = $_POST['especie'];

                if ($razaNueva === "") {
                    echo json_encode(["success" => false, "message" => "Debe especificar el nombre de la nueva raza"]);
                    exit;
                }
                if ($especie === "") {
                    echo json_encode(["success" => false, "message" => "Debe especificar la especie"]);
                    exit;
                }

                $queryRaza = "INSERT INTO raza (nombre, idEspecie) VALUES (?, ?)";
                $stmtRaza = $conn->prepare($queryRaza);
                $stmtRaza->bind_param("si", $razaNueva, $especie);

                if (!$stmtRaza->execute()) {
                    echo json_encode(["success" => false, "message" => "Error al insertar nueva raza: " . $stmtRaza->error]);
                    exit;
                }

                $idRaza = $stmtRaza->insert_id;
                $stmtRaza->close();
            } else {
                $idRaza = $_POST['raza'];
            }

            // Insertar en detallesMascota
            $edad = $_POST['edad'];
            $sexo = $_POST['sexo'];
            $tamano = $_POST['tamano'];
            $caractFisica = $_POST['caractFisica'];
            $estadoSalud = $_POST['estadoSalud'];
            $descripcion = $_POST['descripcion'];

            if (!is_numeric($idRaza)) {
                echo json_encode(["success" => false, "message" => "ID de raza inválido."]);
                exit;
            } 

            // Insertar en tabla mascota
            $queryMascota = "INSERT INTO mascota (nombre, fechaIngreso, estadoAdopcion, idEstacionEncontrado) VALUES (?, ?, ?, ?)";
            $stmtMascota = $conn->prepare($queryMascota);
            $stmtMascota->bind_param("sssi", $nombre, $fechaIngreso, $estadoAdopcion, $idEstacion);

            if (!$stmtMascota->execute()) {
                echo json_encode(['success' => false, 'message' => 'Error al insertar mascota: ' . $stmtMascota->error]);
                exit;
            }

            $idMascota = $stmtMascota->insert_id;
            $stmtMascota->close();           

            $queryDetalle = "INSERT INTO detallesmascota (idMascota, edad, sexo, tamaño, caractFisica, estadoSalud, descripcion, idRaza) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmtDetalle = $conn->prepare($queryDetalle);
            $stmtDetalle->bind_param("iisssssi", $idMascota, $edad, $sexo, $tamano, $caractFisica, $estadoSalud, $descripcion, $idRaza);

            if ($stmtDetalle->execute()) {
                echo json_encode(["success" => true, "message" => "Mascota registrada con éxito"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al insertar detalles de mascota: " . $stmtDetalle->error]);
            }

            $targetDir = __DIR__ . "/../../mascotas/$idMascota";
            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0777, true);
            }

            $imagenes = $_FILES['imagenes'];
            $total = count($imagenes['name']);

            for ($i = 0; $i < $total; $i++) {
                $tmpName = $imagenes['tmp_name'][$i];
                $fileName = basename($imagenes['name'][$i]);
                $targetFilePath = $targetDir . "/" . $fileName;

                if (!move_uploaded_file($tmpName, $targetFilePath)) {
                    echo json_encode(["success" => false, "message" => "Error al subir imagen: $fileName"]);
                    exit;
                }
            }

            $stmtDetalle->close();
            break;

        default:
            echo json_encode(["success" => false, "message" => "Tipo de inserción no válido"]);
    }
?>
