<?php
    require_once "../conexion.php";
    header('Content-Type: application/json');

    // ---------- 1. Mascotas ----------
    $mascotasQuery = "
    SELECT 
        m.idMascota, m.nombre, m.fechaIngreso, m.estadoAdopcion,
        e.nombre AS estacion,
        dm.edad, dm.sexo, dm.tamaño, dm.caractFisica, dm.estadoSalud, dm.descripcion,
        GROUP_CONCAT(DISTINCT s.idSolicitud) AS solicitudes,
        GROUP_CONCAT(DISTINCT r.idReporte) AS reportes
    FROM mascota m
    LEFT JOIN detallesmascota dm ON m.idMascota = dm.idMascota
    LEFT JOIN estaciones e ON m.idEstacionEncontrado = e.idEstacion
    LEFT JOIN solicitud s ON m.idMascota = s.idMascota
    LEFT JOIN reporteMascota rm ON m.idMascota = rm.idMascota
    LEFT JOIN reporte r ON rm.idReporte = r.idReporte
    GROUP BY m.idMascota
    ORDER BY m.idMascota
    ";
    $mascotas = $conn->query($mascotasQuery)->fetch_all(MYSQLI_ASSOC);

    // ---------- 2. Solicitudes ----------
    $solicitudesQuery = "
    SELECT 
        s.idSolicitud, s.fechaSolicitud, s.estadoAdopcion, s.comentarios,
        a.idAdoptante, a.nombre AS nombreAdoptante, a.telefono, a.correo,
        m.idMascota, m.nombre AS nombreMascota
    FROM solicitud s
    LEFT JOIN adoptante a ON s.idAdoptante = a.idAdoptante
    LEFT JOIN mascota m ON s.idMascota = m.idMascota
    ORDER BY s.idSolicitud
    ";
    $solicitudes = $conn->query($solicitudesQuery)->fetch_all(MYSQLI_ASSOC);

    // ---------- 3. Reportes ----------
    $reportesQuery = "
    SELECT 
        r.idReporte, r.estadoReporte, r.fechaReporte, r.descripcion,
        rep.idReportante, rep.nombre AS nombreReportante, rep.correo,
        GROUP_CONCAT(DISTINCT m.idMascota) AS mascotas,
        GROUP_CONCAT(DISTINCT m.nombre) AS nombresMascotas,
        e.nombre AS estacion
    FROM reporte r
    LEFT JOIN reportante rep ON r.idReportante = rep.idReportante
    LEFT JOIN reporteMascota rm ON r.idReporte = rm.idReporte
    LEFT JOIN mascota m ON rm.idMascota = m.idMascota
    LEFT JOIN estaciones e ON r.idEstacionRep = e.idEstacion
    GROUP BY r.idReporte
    ORDER BY r.idReporte
    ";
    $reportes = $conn->query($reportesQuery)->fetch_all(MYSQLI_ASSOC);

    // ---------- 4. Donaciones ----------
    $donacionesQuery = "
    SELECT 
        d.idDonacion, d.estadoDonacion, d.tipo, d.fechaDonacion, d.fechaPrevistaDon,
        d.monto, d.descripcion,
        dn.idDonante, dn.nombreDonante, dn.correo
    FROM donacion d
    LEFT JOIN donante dn ON d.idDonante = dn.idDonante
    ORDER BY d.idDonacion
    ";
    $donaciones = $conn->query($donacionesQuery)->fetch_all(MYSQLI_ASSOC);

    // ---------- 5. Administradores ----------
    $adminQuery = "
    SELECT 
        id, usuario, contraseña 
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
