<?php
header("Content-Type: application/json");
include("conexion.php");

$conn = new mysqli("localhost", "root", "", "ctc");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la conexión"]);
    exit();
}

$query = "SELECT idMascota, nombre 
          FROM Mascota 
          WHERE estadoAdopcion = 'adoptado'";

$result = mysqli_query($conn, $query);

$mascotas = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $id = $row['idMascota'];
        $mascotas[] = $row;
    }
    echo json_encode($mascotas, JSON_UNESCAPED_SLASHES);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error en la consulta"]);
}
?>