<?php
    require_once "../conexion.php";
    header('Content-Type: application/json');

    // ---------- 1. Mascotas ----------
    // Consulta principal para mascotas
    $mascotasQuery = "
    SELECT 
        m.idMascota, 
        m.nombre, 
        m.fechaIngreso, 
        m.estadoAdopcion,
        m.adoptadoPor AS idSolicitudAdopcion,  
        s.idAdoptante,       
        a.nombre AS nombreAdoptante,
        e.nombre AS estacion,
        e.linea AS linea,
        dm.edad, 
        dm.sexo, 
        dm.tamaño, 
        dm.caractFisica, 
        dm.estadoSalud, 
        dm.descripcion,
        rza.nombre AS raza,
        esp.nombre AS especie,
        GROUP_CONCAT(DISTINCT s2.idSolicitud) AS todasSolicitudes,
        GROUP_CONCAT(DISTINCT r.idReporte) AS reportes
    FROM mascota m
    LEFT JOIN detallesmascota dm ON m.idMascota = dm.idMascota
    LEFT JOIN estaciones e ON m.idEstacionEncontrado = e.idEstacion
    LEFT JOIN raza rza ON dm.idRaza = rza.idRaza
    LEFT JOIN especie esp ON rza.idEspecie = esp.idEspecie
    LEFT JOIN reporteMascota rm ON m.idMascota = rm.idMascota
    LEFT JOIN reporte r ON rm.idReporte = r.idReporte
    LEFT JOIN solicitud s ON m.adoptadoPor = s.idSolicitud
    LEFT JOIN adoptante a ON s.idAdoptante = a.idAdoptante
    LEFT JOIN solicitud s2 ON m.idMascota = s2.idMascota
    GROUP BY m.idMascota
    ORDER BY m.idMascota
    ";

    $mascotas = $conn->query($mascotasQuery)->fetch_all(MYSQLI_ASSOC);

    // Agregar las imágenes reales desde la carpeta para cada mascota
    foreach ($mascotas as &$mascota) {
    $id = $mascota['idMascota'];
    // Ruta absoluta al directorio de imágenes de la mascota
    $rutaDirectorio = realpath(__DIR__ . '/../../../') . "/mascotas/$id";

    $imagenes = [];
    if (is_dir($rutaDirectorio)) {
        // Obtenemos solo archivos válidos (imágenes y videos)
        $archivos = scandir($rutaDirectorio);
        foreach ($archivos as $archivo) {
            $extension = strtolower(pathinfo($archivo, PATHINFO_EXTENSION));
            if (in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'webm'])) {
                // Construimos ruta relativa accesible desde el navegador
                $imagenes[] = "/ProyectoADS_CTCDigital/mascotas/$id/$archivo";
            }
        }
    }

    $mascota['imagenes'] = $imagenes;

    // Convertir cadenas CSV a arrays
    $mascota['todasSolicitudes'] = $mascota['todasSolicitudes'] ? explode(',', $mascota['todasSolicitudes']) : [];
    $mascota['reportes'] = $mascota['reportes'] ? explode(',', $mascota['reportes']) : [];
    }
    unset($mascota);

    // ---------- 2. Solicitudes ----------
    $solicitudesQuery = "
    SELECT 
        s.idSolicitud, s.fechaSolicitud, s.estadoAdopcion, s.comentarios,
        a.idAdoptante, a.nombre AS nombreAdoptante, a.telefono, a.correo,
        m.idMascota, m.nombre AS nombreMascota,
        v.direccion, v.ubicacion, v.estadoVisita, v.fechaVisita, v.notas
    FROM solicitud s
    LEFT JOIN adoptante a ON s.idAdoptante = a.idAdoptante
    LEFT JOIN mascota m ON s.idMascota = m.idMascota
    LEFT JOIN visitadom v ON s.idSolicitud = v.idSolicitud
    ORDER BY s.idSolicitud
    ";

    $solicitudes = $conn->query($solicitudesQuery)->fetch_all(MYSQLI_ASSOC);

    foreach ($solicitudes as &$solicitud) {
        $id = $solicitud['idSolicitud'];
        $rutaDirectorio = realpath(__DIR__ . '/../../../') . "/solicitudes/$id";

        // Documentos
        $documentos = [];
        if (is_dir($rutaDirectorio)) {
            $archivos = scandir($rutaDirectorio);
            foreach ($archivos as $archivo) {
                if (in_array(strtolower(pathinfo($archivo, PATHINFO_EXTENSION)), ['pdf'])) {
                    $documentos[] = "/ProyectoADS_CTCDigital/solicitudes/$id/$archivo";
                }
            }
        }
        $solicitud['documentos'] = $documentos;

        // Datos de visita
        if ($solicitud['direccion']) {
            $solicitud['visita'] = [
                'direccion' => $solicitud['direccion'],
                'ubicacion' => $solicitud['ubicacion'],
                'estadoVisita' => $solicitud['estadoVisita'],
                'fechaVisita' => $solicitud['fechaVisita'],
                'notas' => $solicitud['notas']
            ];
        }
        // Eliminar campos duplicados
        unset($solicitud['direccion'], $solicitud['ubicacion'], $solicitud['estadoVisita'], $solicitud['fechaVisita'], $solicitud['notas']);
    }

    // ---------- 3. Reportes ----------
    $reportesQuery = "
    SELECT 
        r.idReporte, r.estadoReporte, r.fechaReporte, r.descripcion,
        rep.idReportante, rep.nombre AS nombreReportante, rep.correo,
        GROUP_CONCAT(DISTINCT m.idMascota) AS mascotas,
        e.nombre AS estacion,
        e.linea AS linea
    FROM reporte r
    LEFT JOIN reportante rep ON r.idReportante = rep.idReportante
    LEFT JOIN reporteMascota rm ON r.idReporte = rm.idReporte
    LEFT JOIN mascota m ON rm.idMascota = m.idMascota
    LEFT JOIN estaciones e ON r.idEstacionRep = e.idEstacion
    GROUP BY r.idReporte
    ORDER BY r.idReporte
    ";
    $reportes = $conn->query($reportesQuery)->fetch_all(MYSQLI_ASSOC);

    foreach ($reportes as &$reporte) {
        $reporte['mascotas'] = $reporte['mascotas'] ? explode(',', $reporte['mascotas']) : [];
    }
    unset($reporte);  
    
    // agregar las imagenes
    foreach ($reportes as &$reporte) {
        $id = $reporte['idReporte'];
        $rutaDirectorio = realpath(__DIR__ . '/../../../') . "/reportes/$id";
    
        $imagenes = [];
        if (is_dir($rutaDirectorio)) {
            $archivos = scandir($rutaDirectorio);
            foreach ($archivos as $archivo) {
                if (in_array(strtolower(pathinfo($archivo, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4'])) {
                    $imagenes[] = "/ProyectoADS_CTCDigital/reportes/$id/$archivo";
                }
            }
        }
    
        $reporte['imagenes'] = $imagenes;
    }

    // ---------- 4. Donaciones ----------
    $donacionesQuery = "
        SELECT 
            d.idDonacion, d.estadoDonacion, d.tipo, d.fechaDonacion, d.fechaPrevistaDon,
            d.monto, d.descripcion,
            dn.idDonante, dn.nombreDonante, dn.correo,
            CASE 
                WHEN dv.idUser IS NOT NULL THEN 1
                ELSE 0
            END AS estadoVisible,
            dv.usuario, dv.img, dv.color
        FROM donacion d
        LEFT JOIN donante dn ON d.idDonacion = dn.idDonante
        LEFT JOIN donacionvisual dv ON d.idDonacion = dv.idUser
        ORDER BY d.idDonacion
        ";
    $donaciones = $conn->query($donacionesQuery)->fetch_all(MYSQLI_ASSOC);

    // ---------- 5. Administradores ----------
    $adminQuery = "
    SELECT 
        id, usuario, contraseña, ultimaConn
    FROM admin 
    ORDER BY id
    ";
    $administradores = $conn->query($adminQuery)->fetch_all(MYSQLI_ASSOC);

    // ---------- Salida JSON ----------
    echo json_encode([
        'mascotas' => $mascotas,
        'solicitudes' => $solicitudes,
        'reportes' => $reportes,
        'donaciones' => $donaciones,
        'administradores' => $administradores
    ]);

    $conn->close();
?>
