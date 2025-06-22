<?php
    header('Content-Type: application/json');
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    require_once "../conexion.php";
    require_once __DIR__ . '/../utils/correo.php';

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

            // Enviar correo si estado es Aprobada o Rechazada
            if ($estadoAdopcion === "Aprobada" || $estadoAdopcion === "Rechazada") {
                // Obtener datos del adoptante y mascota para el correo
                $stmtDatos = $conn->prepare("
                    SELECT a.nombre AS nombreAdoptante, a.correo, m.nombre AS nombreMascota
                    FROM solicitud s
                    INNER JOIN adoptante a ON s.idAdoptante = a.idAdoptante
                    INNER JOIN mascota m ON s.idMascota = m.idMascota
                    WHERE s.idSolicitud = ?
                ");
                $stmtDatos->bind_param("i", $idSolicitud);
                $stmtDatos->execute();
                $resultadoDatos = $stmtDatos->get_result();
                $datos = $resultadoDatos->fetch_assoc();
                $stmtDatos->close();

                if ($datos) {
                    $nombreAdoptante = $datos['nombreAdoptante'];
                    $correoAdoptante = $datos['correo'];
                    $nombreMascota = $datos['nombreMascota'];

                    $asunto = "Estado de su solicitud de adopción: $estadoAdopcion";

                    // HTML con estilo para el correo
                    $mensajeHTML = "
                    <html lang='es'>
                    <head>
                        <meta charset='UTF-8'>
                        <style>
                            body {
                                font-family: 'Segoe UI', sans-serif;
                                background-color: #f8f9fa;
                                padding: 20px;
                            }
                            .container {
                                background-color: #ffffff;
                                border-radius: 10px;
                                padding: 30px;
                                max-width: 600px;
                                margin: auto;
                                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                            }
                            .header img {
                                display: block;
                                margin: 0 auto 20px;
                                width: 150px;
                            }
                            .title {
                                font-size: 22px;
                                color: " . ($estadoAdopcion === "Aprobada" ? "#28a745" : "#dc3545") . ";
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            .content {
                                font-size: 16px;
                                color: #333333;
                                line-height: 1.6;
                            }
                            .footer {
                                margin-top: 30px;
                                font-size: 0.9em;
                                color: #666666;
                                text-align: center;
                            }
                            .comentarios {
                                background-color: #f1f1f1;
                                padding: 10px 15px;
                                border-left: 4px solid #6c757d;
                                font-style: italic;
                                margin: 15px 0;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <div class='header'>
                                <img src='https://pbs.twimg.com/profile_images/1548912063476531200/1IwRRpxP_400x400.jpg' alt='Logo' width='150'>
                            </div>
                            <div class='title'>Solicitud de Adopción $estadoAdopcion</div>
                            <div class='content'>
                                <p>Estimado(a) <strong>$nombreAdoptante</strong>,</p>";

                    if ($estadoAdopcion === "Aprobada") {
                        $mensajeHTML .= "
                                <p>Nos complace informarle que su solicitud para adoptar a <strong>$nombreMascota</strong> ha sido <strong>aprobada</strong> tras un cuidadoso proceso de evaluación.</p>
                                <p>Estamos convencidos de que brindará un hogar lleno de amor y cuidado a esta mascota tan especial.</p>
                                <p><strong>Le solicitamos que pase a recoger a $nombreMascota durante la próxima semana</strong>. Por favor, responda a este correo indicando la <strong>fecha y hora</strong> en que planea asistir, con el fin de coordinar su entrega adecuadamente.</p>
                                <p class='comentarios'>Comentarios del personal: <br>" . nl2br(htmlspecialchars($comentarios)) . "</p>
                                <p>Quedamos atentos a su respuesta y agradecemos su compromiso con el bienestar animal.</p>";
                    } else {
                        $mensajeHTML .= "
                                <p>Lamentamos informarle que su solicitud para adoptar a <strong>$nombreMascota</strong> <strong>no ha sido aprobada</strong> en esta ocasión.</p>
                                <p>Sabemos que esta noticia puede resultar desalentadora, sin embargo, el proceso de selección es riguroso y busca asegurar la mejor compatibilidad posible para nuestras mascotas.</p>
                                <p class='comentarios'>Comentarios del personal: <br>" . nl2br(htmlspecialchars($comentarios)) . "</p>
                                <p>Le invitamos a seguir participando en futuras convocatorias de adopción. Su interés y cariño hacia nuestros animales es altamente valorado.</p>";
                    }

                    $mensajeHTML .= "
                                <p>Con aprecio,</p>
                                <p><strong>CTC Digital</strong><br>Centro de Transferencia Canina del Metro de la CDMX</p>
                            </div>
                            <div class='footer'>
                                Cualquier duda o consulta, no dude en contactarnos a través de este correo electrónico.
                            </div>
                        </div>
                    </body>
                    </html>";

                    // Mensaje en texto plano (respaldo)
                    $mensajePlano = "Estimado(a) $nombreAdoptante,\n\n";
                    if ($estadoAdopcion === "Aprobada") {
                        $mensajePlano .= "Su solicitud para adoptar a $nombreMascota ha sido APROBADA.\n\n";
                        $mensajePlano .= "Le pedimos pasar por la mascota durante la próxima semana y responder este correo con la fecha y hora que planea asistir.\n\n";
                    } else {
                        $mensajePlano .= "Su solicitud para adoptar a $nombreMascota ha sido RECHAZADA.\n\n";
                    }
                    $mensajePlano .= "Comentarios del personal: \n$comentarios\n\nGracias por su interés.\nCTC Digital";

                    // Enviar correo
                    enviarCorreoAdopcion($correoAdoptante, $asunto, $mensajePlano, $mensajeHTML);
                }
            }
        
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
