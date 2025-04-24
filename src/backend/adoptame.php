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

$mascota = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $mascota[] = $row;
    }
    echo json_encode($mascota);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error en la consulta"]);
}
?>
