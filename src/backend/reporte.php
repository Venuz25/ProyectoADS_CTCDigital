<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once "conexion.php";

// Verificar si se recibieron los datos
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $nombre = $conn->real_escape_string($data['nombreReportante'] ?? '');
    $correo = $conn->real_escape_string($data['correo'] ?? '');
    $estacion = $conn->real_escape_string($data['estacion'] ?? '');
    $descripcion = $conn->real_escape_string($data['detalles'] ?? '');

    $estacionesPermitidas = [
        'Acatitla','Aculco','Agrícola Oriental','Allende','Apatlaco','Aquiles Serdán','Aragón','Atlalilco','Auditorio','Autobuses del Norte','Azcapotzalco','Balbuena','Balderas','Barranca del Muerto','Bellas Artes','Bondojito','Bosque de Aragón','Boulevard Puerto Aéreo','Buenavista','Calle 11','Camarones','Canal del Norte','Canal de San Juan','Candelaria','Centro Médico','Cerro de la Estrella','Chabacano','Chapultepec','Chilpancingo','Ciudad Azteca','Ciudad Deportiva','Constitución de 1917','Constituyentes','Copilco','Coyuya','Cuatro Caminos','Culhuacán','Cuauhtémoc','Cuitláhuac','Deportivo 18 de Marzo','Deportivo Oceanía','División del Norte','Doctores','Eduardo Molina','El Rosario','Ermita','Escuadrón 201','Etiopía/Plaza de la Transparencia','Eugenia','Ferrería','Fray Servando','Garibaldi','General Anaya','Gómez Farías','Gran Canal','Guerrero','Guelatao','Hangares','Hidalgo','Hospital 20 de Noviembre','Hospital General','Impulsora','Indios Verdes','Insurgentes','Instituto del Petróleo','Iztacalco','Iztapalapa','Isabel la Católica','Jamaica','Juárez','Juanacatlán','La Raza','La Viga','Lagunilla','Lindavista','Lomas Estrella','Los Reyes','Martín Carrera','Merced','Mexicaltzingo','Miguel Ángel de Quevedo','Mixcoac','Mixiuhca','Moctezuma','Morelos','Museo','Nativitas','Nezahualcóyotl','Niños Héroes','Nopalera','Normal','Norte 45','Observatorio','Oceanía','Olímpica','Panteones','Pantitlán','Patriotismo','Peñón Viejo','Periférico Oriente','Pino Suárez','Plaza Aragón','Polanco','Politécnico','Popotla','Portales','Potrero','Refinería','Revolución','Ricardo Flores Magón','Río de los Remedios','Romero Rubio','Salto del Agua','San Andrés Tomatlán','San Antonio','San Antonio Abad','San Cosme','San Joaquín','San Juan de Letrán','San Lázaro','San Pedro de los Pinos','Santa Anita','Santa Marta','Sevilla','Shakespeare','Tacuba','Tacubaya','Talisman','Tasqueña','Tezonco','Tezozómoc','Tláhuac','Tlatelolco','Tlaltenco','Tlatilco','Tlazintla','Universidad','UAM-I','UAM-Azcapotzalco','Valle Gómez','Vallejo','Velódromo','Villa de Aragón','Villa de Cortés','Viaducto','Viveros','Xola','Zapata','Zaragoza','Zócalo'
    ];

    // Validar campos obligatorios
    if (empty($nombre) || empty($correo) || empty($estacion)) {
        die(json_encode(['status' => 'error', 'message' => 'Todos los campos obligatorios deben ser llenados']));
    }

    // Validación de email
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        die(json_encode(['status' => 'error', 'message' => 'Correo electrónico no válido']));
    }

    // Limitar longitud de campos
    if (strlen($nombre) > 100 || strlen($correo) > 100) {
        die(json_encode(['status' => 'error', 'message' => 'Los campos exceden la longitud permitida']));
    }

    // Validar estación
    if (!in_array($estacion, $estacionesPermitidas)) {
        die(json_encode(['status' => 'error', 'message' => 'Estación no válida']));
    }

    // Preparar la consulta SQL
    $sql = "INSERT INTO reporte (
            nombreReportante, 
            correo, 
            estacion, 
            descripcion, 
            fechaReporte
        ) VALUES (?, ?, ?, ?, NOW())";

    // Crear statement preparado
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        die(json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta']));
    }

    // Vincular parámetros
    $stmt->bind_param("ssss", $nombre, $correo, $estacion, $descripcion);

    // Ejecutar la consulta
    if ($stmt->execute()) {
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