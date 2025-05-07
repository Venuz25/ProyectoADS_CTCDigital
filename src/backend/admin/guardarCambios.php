<?php
    header('Content-Type: application/json');
    require_once '../conexion.php'; 
    $response = ['success' => false, 'message' => ''];

    try {
        // Verificar método y recibir datos
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            throw new Exception('Método no permitido');
        }

        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) {
            throw new Exception('Datos JSON inválidos');
        }

        // Validar datos básicos
        if (empty($data['tabla']) || empty($data['accion'])) {
            throw new Exception('Tabla o acción no especificada');
        }

        // Iniciar transacción
        $conn->autocommit(false);
        $errorOccurred = false;

        switch ($data['tabla']) {
            case 'mascota':
                // Validar ID de mascota
                if (empty($data['idMascota'])) {
                    throw new Exception('ID de mascota no especificado');
                }

                $idMascota = filter_var($data['idMascota'], FILTER_VALIDATE_INT);
                if (!$idMascota) {
                    throw new Exception('ID de mascota inválido');
                }

                // 1. Actualizar datos principales de la mascota
                if (!empty($data['datosMascota'])) {
                    $stmt = $conn->prepare("UPDATE mascota SET estadoAdopcion = ? WHERE idMascota = ?");
                    $stmt->bind_param('si', $data['datosMascota']['estadoAdopcion'], $idMascota);
                    
                    if (!$stmt->execute()) {
                        $errorOccurred = true;
                        throw new Exception('Error al actualizar mascota: ' . $stmt->error);
                    }
                    $stmt->close();
                }

                // 2. Actualizar detalles de la mascota
                if (!empty($data['datosDetalles']) && !$errorOccurred) {
                    $stmt = $conn->prepare("
                        UPDATE detallesmascota 
                        SET edad = ?, sexo = ?, tamaño = ?, caractFisica = ?, estadoSalud = ?, descripcion = ?
                        WHERE idMascota = ?
                    ");
                    
                    $stmt->bind_param('isssssi', 
                        $data['datosDetalles']['edad'],
                        $data['datosDetalles']['sexo'],
                        $data['datosDetalles']['tamaño'],
                        $data['datosDetalles']['caractFisica'],
                        $data['datosDetalles']['estadoSalud'],
                        $data['datosDetalles']['descripcion'],
                        $idMascota
                    );
                    
                    if (!$stmt->execute()) {
                        $errorOccurred = true;
                        throw new Exception('Error al actualizar detalles: ' . $stmt->error);
                    }
                    $stmt->close();
                }

                // 3. Eliminar imágenes si se especificaron
                if (!empty($data['imagenesAEliminar']) && !$errorOccurred) {
                    $directorio = $_SERVER['DOCUMENT_ROOT'] . '/ProyectoADS_CTCDigital/mascotas/' . $idMascota . '/';
                    
                    foreach ($data['imagenesAEliminar'] as $imagen) {
                        $rutaImagen = $directorio . basename($imagen);
                        
                        if (file_exists($rutaImagen)) {
                            if (!unlink($rutaImagen)) {
                                $errorOccurred = true;
                                throw new Exception("Error al eliminar imagen: $imagen");
                            }
                        }
                    }
                }

                // 4. Manejar nuevas imágenes
                if (!empty($_FILES['nuevasImagenes']) && !$errorOccurred) {
                    $directorio = $_SERVER['DOCUMENT_ROOT'] . '/ProyectoADS_CTCDigital/mascotas/' . $idMascota . '/';
                    
                    if (!file_exists($directorio)) {
                        if (!mkdir($directorio, 0777, true)) {
                            $errorOccurred = true;
                            throw new Exception("Error al crear directorio para imágenes");
                        }
                    }

                    foreach ($_FILES['nuevasImagenes']['tmp_name'] as $key => $tmp_name) {
                        $nombreArchivo = uniqid() . '_' . basename($_FILES['nuevasImagenes']['name'][$key]);
                        $rutaDestino = $directorio . $nombreArchivo;
                        
                        if (!move_uploaded_file($tmp_name, $rutaDestino)) {
                            $errorOccurred = true;
                            throw new Exception("Error al subir imagen: " . $_FILES['nuevasImagenes']['name'][$key]);
                        }
                    }
                }

                if (!$errorOccurred) {
                    $response['success'] = true;
                    $response['message'] = 'Cambios en mascota guardados exitosamente';
                }
                break;

            case 'solicitud':
                // Estructura base para implementación futura
                if ($data['accion'] === 'actualizar') {
                    // Aquí iría la lógica para actualizar solicitudes
                    // $response['message'] = 'Actualización de solicitud no implementada aún';
                }
                break;

            case 'reporte':
                // Estructura base para implementación futura
                if ($data['accion'] === 'actualizar') {
                    // Aquí iría la lógica para actualizar reportes
                    // $response['message'] = 'Actualización de reporte no implementada aún';
                }
                break;

            case 'donacion':
                // Estructura base para implementación futura
                if ($data['accion'] === 'actualizar') {
                    // Aquí iría la lógica para actualizar donaciones
                    // $response['message'] = 'Actualización de donación no implementada aún';
                }
                break;

            case 'admin':
                // Estructura base para implementación futura
                if ($data['accion'] === 'actualizar') {
                    // Aquí iría la lógica para actualizar administradores
                    // $response['message'] = 'Actualización de admin no implementada aún';
                }
                break;

            default:
                throw new Exception('Tabla no válida');
        }

        // Confirmar o revertir transacción
        if ($errorOccurred) {
            $conn->rollback();
        } else {
            $conn->commit();
            if (empty($response['message'])) {
                $response['success'] = true;
                $response['message'] = 'Operación realizada con éxito';
            }
        }

    } catch (Exception $e) {
        if (isset($conn) && !$conn->connect_error) {
            $conn->rollback();
        }
        
        $response['message'] = 'Error: ' . $e->getMessage();
        http_response_code(500);
    } finally {
        // Restaurar autocommit
        if (isset($conn) && !$conn->connect_error) {
            $conn->autocommit(true);
        }
    }

    echo json_encode($response);
?>