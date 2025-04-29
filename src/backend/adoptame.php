<?php
    header("Content-Type: application/json");
    include("conexion.php");

    $conn = new mysqli("localhost", "root", "", "ctc");
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["error" => "Error en la conexión"]);
        exit();
    }

    $query = "SELECT 
                m.idMascota,
                m.nombre,
                m.fechaIngreso,
                m.estadoAdopcion,
                e.nombre AS estacionMetro,
                
                d.edad,
                d.sexo,
                d.tamaño,
                d.caractFisica,
                d.estadoSalud,
                d.descripcion,
                
                r.nombre AS raza,
                es.nombre AS especie

              FROM mascota m
              JOIN detallesmascota d ON m.idMascota = d.idMascota
              JOIN raza r ON d.idRaza = r.idRaza
              JOIN especie es ON r.idEspecie = es.idEspecie
              LEFT JOIN estaciones e ON m.idEstacionEncontrado = e.idEstacion
              WHERE m.estadoAdopcion = 'Disponible'";

    $result = mysqli_query($conn, $query);

    $mascotas = [];

    function obtenerArchivosMultimedia($idMascota) {
        $basePath = realpath(__DIR__ . '/../../');
        $ruta = $basePath . "/mascotas/" . $idMascota . "/";

        $archivos = [];
        if (is_dir($ruta)) {
            $extensionesPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'mp4'];
            if ($handle = opendir($ruta)) {
                while (false !== ($entry = readdir($handle))) {
                    $extension = strtolower(pathinfo($entry, PATHINFO_EXTENSION));
                    if (!in_array($entry, ['.', '..']) && in_array($extension, $extensionesPermitidas)) {
                        $archivos[] = $entry;
                    }
                }
                closedir($handle);
            }
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
