<?php
header("Content-Type: application/json");
include("conexion.php");

$conn = new mysqli("localhost", "root", "", "ctc");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la conexión"]);
    exit();
}

$query = "SELECT m.*, d.* 
          FROM Mascota m 
          JOIN detallesMascota d ON m.idMascota = d.idMascota 
          WHERE m.estadoAdopcion = 'disponible'";

$result = mysqli_query($conn, $query);

$mascotas = [];

function obtenerArchivosMultimedia($idMascota) {
    // Sube 2 niveles desde /src/backend/ para llegar a /ProyectoADS_CTCDigital/
    $basePath = realpath(__DIR__ . '/../../');
    $ruta = $basePath . "/mascotas/" . $idMascota . "/";
    
    $archivos = [];
    
    if (is_dir($ruta)) {
        $extensionesPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'JPG', 'JPEG', 'PNG', 'GIF', 'MP4']; // Incluye mayúsculas
        
        // Abre el directorio
        if ($handle = opendir($ruta)) {
            while (false !== ($entry = readdir($handle))) {
                $extension = strtolower(pathinfo($entry, PATHINFO_EXTENSION));
                if (!in_array($entry, ['.', '..']) && in_array($extension, array_map('strtolower', $extensionesPermitidas))) {
                    $archivos[] = $entry;
                }
            }
            closedir($handle);
        } else {
            error_log("No se pudo abrir el directorio: " . $ruta);
        }
    } else {
        error_log("Directorio no encontrado: " . $ruta);
    }
    
    return $archivos;
}

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $id = $row['idMascota'];
        $row['archivos'] = obtenerArchivosMultimedia($id);
        $mascotas[] = $row;
    }
    echo json_encode($mascotas, JSON_UNESCAPED_SLASHES);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error en la consulta"]);
}
?>