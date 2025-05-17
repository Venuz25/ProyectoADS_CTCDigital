<?php
    require_once('tcpdf/tcpdf.php');

    // Recibir los datos JSON
    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);

    if (!$datos) {
        echo json_encode(['status' => 'error', 'message' => 'Datos no válidos']);
        exit;
    }

    $idSolicitud = $datos['idSolicitud'] ?? '';

    // Crear nuevo PDF
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // Configuración del documento
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('CTC Digital');
    $pdf->SetTitle('Solicitud de Adopción ' . $idSolicitud);
    $pdf->SetSubject('Formulario de Adopción');
    $pdf->SetKeywords('Adopción, Mascotas, Formulario');

    // Establecer márgenes
    $pdf->SetMargins(15, 25, 15);
    $pdf->SetHeaderMargin(10);
    $pdf->SetFooterMargin(10);

    // Saltos de página automáticos
    $pdf->SetAutoPageBreak(TRUE, 25);

    // Agregar página
    $pdf->AddPage();

    // Logo (opcional)
    $logo = '/ProyectoADS_CTCDigital/recursos/Icono.jpg';
    if (file_exists($logo)) {
        $pdf->Image($logo, 15, 10, 30, '', 'PNG', '', 'T', false, 300, '', false, false, 0, false, false, false);
    }

    // Encabezado
    $pdf->SetFont('helvetica', 'B', 16);
    $pdf->Cell(0, 10, 'Solicitud de Adopción No. ' . $idSolicitud, 0, 1, 'C');
    $pdf->Ln(10);

    // Contenido del formulario
    $pdf->SetFont('helvetica', '', 10);

    // Función para agregar sección
    function agregarSeccion($pdf, $titulo, $contenido) {
        $pdf->SetFont('helvetica', 'B', 12);
        $pdf->Cell(0, 10, $titulo, 0, 1, 'L', 0, '', 0, false, 'T', 'B');
        $pdf->SetFont('helvetica', '', 10);
        $pdf->MultiCell(0, 0, $contenido, 0, 'L');
        $pdf->Ln(8);
    }

    // 1. Datos del Adoptante
    $contenidoSeccion1 = "Nombre completo: " . ($datos['nombreCompleto'] ?? '') . "\n";
    $contenidoSeccion1 .= "Edad: " . ($datos['edad'] ?? '') . "\n";
    $contenidoSeccion1 .= "Teléfono: " . ($datos['telefono'] ?? '') . "\n";
    $contenidoSeccion1 .= "Correo electrónico: " . ($datos['correo'] ?? '') . "\n";
    $contenidoSeccion1 .= "Ocupación: " . ($datos['ocupacion'] ?? '') . "\n";
    $contenidoSeccion1 .= "Escolaridad: " . ($datos['escolaridad'] ?? '') . "\n";
    $contenidoSeccion1 .= "Dirección: " . ($datos['direccion'] ?? '') . "\n";
    $contenidoSeccion1 .= "Fecha de visita: " . ($datos['fechaVisita'] ?? '') . "\n";
    $contenidoSeccion1 .= "Mascota a adoptar: " . ($datos['mascotaAdoptar'] ?? '');

    agregarSeccion($pdf, '1. Datos del Adoptante', $contenidoSeccion1);

    // 2. Motivación y Experiencia
    $contenidoSeccion2 = "Razón de adopción: " . ($datos['razonAdopcion'] ?? '') . "\n";
    $contenidoSeccion2 .= "¿Tiene otros animales?: " . ($datos['otrosAnimales'] ?? '') . "\n";
    $contenidoSeccion2 .= "Mascotas previas: " . ($datos['mascotasPrevias'] ?? '') . "\n";
    $contenidoSeccion2 .= "Mascotas con accidentes: " . ($datos['mascotasAccidentes'] ?? '') . "\n";
    $contenidoSeccion2 .= "¿Ha adoptado antes?: " . ($datos['adopcionPrevia'] ?? '') . "\n";
    $contenidoSeccion2 .= "Medio de conocimiento: " . ($datos['medioConocimiento'] ?? '') . "\n";
    $contenidoSeccion2 .= "Razón especial para adoptar: " . ($datos['razonEspecial'] ?? '');

    agregarSeccion($pdf, '2. Motivación y Experiencia', $contenidoSeccion2);

    // 3. Situación Familiar y Hogar
    $contenidoSeccion3 = "¿Acepta visitas?: " . ($datos['visitas'] ?? '') . "\n";
    $contenidoSeccion3 .= "Opinión sobre visitas: " . ($datos['opinionVisitas'] ?? '') . "\n";
    $contenidoSeccion3 .= "¿Todos en casa están de acuerdo?: " . ($datos['acuerdoFamilia'] ?? '') . "\n";
    $contenidoSeccion3 .= "¿Alergias en casa?: " . ($datos['alergias'] ?? '') . "\n";
    $contenidoSeccion3 .= "¿Niños en casa?: " . ($datos['niniosCasa'] ?? '');
    if (($datos['niniosCasa'] ?? '') == 'si') {
        $contenidoSeccion3 .= " (Edades: " . ($datos['edades'] ?? '') . ")\n";
    } else {
        $contenidoSeccion3 .= "\n";
    }
    $contenidoSeccion3 .= "Permiso arrendador: " . ($datos['permisoArrendador'] ?? '') . "\n";
    $contenidoSeccion3 .= "Plan por cambio de domicilio: " . ($datos['cambioDomicilio'] ?? '') . "\n";
    $contenidoSeccion3 .= "Visión a futuro: " . ($datos['visionFuturo'] ?? '');

    agregarSeccion($pdf, '3. Situación Familiar y Hogar', $contenidoSeccion3);

    // 4. Cuidados y Condiciones
    $contenidoSeccion4 = "¿Espacio al aire libre?: " . ($datos['espacioExterior'] ?? '');
    if (($datos['espacioExterior'] ?? '') == 'si') {
        $contenidoSeccion4 .= " (" . ($datos['descripcionEspacio'] ?? '') . ")\n";
    } else {
        $contenidoSeccion4 .= "\n";
    }
    $contenidoSeccion4 .= "Tiempo solo: " . ($datos['tiempoSolo'] ?? '') . "\n";
    $contenidoSeccion4 .= "Lugar para dormir: " . ($datos['lugarDormir'] ?? '') . "\n";
    $contenidoSeccion4 .= "Acceso a áreas: " . ($datos['accesoAreas'] ?? '') . "\n";
    $contenidoSeccion4 .= "Cuidado en viajes: " . ($datos['cuidadoViajes'] ?? '') . "\n";
    $contenidoSeccion4 .= "¿Consciente del periodo de adaptación?: " . ($datos['paciencia'] ?? '') . "\n";
    $contenidoSeccion4 .= "Gasto mensual estimado: " . ($datos['gastoMensual'] ?? '') . "\n";
    $contenidoSeccion4 .= "Responsable de gastos: " . ($datos['responsableGastos'] ?? '');

    agregarSeccion($pdf, '4. Cuidados y Condiciones', $contenidoSeccion4);

    // 5. Compromisos de Cuidado
    $contenidoSeccion5 = "¿Dispuesto a dar cuidados?: " . ($datos['dispuestoCuidados'] ?? '') . "\n";
    $contenidoSeccion5 .= "¿Tiene veterinario?: " . ($datos['veterinario'] ?? '') . "\n";
    $contenidoSeccion5 .= "¿Recursos para gastos veterinarios?: " . ($datos['recursosVeterinarios'] ?? '') . "\n";
    $contenidoSeccion5 .= "Opinión sobre mascotas en azotea: " . ($datos['opinionAzotea'] ?? '') . "\n";
    $contenidoSeccion5 .= "Concepto de mascota: " . ($datos['conceptoMascota'] ?? '') . "\n";
    $contenidoSeccion5 .= "¿Compromiso a no modificar apariencia?: " . ($datos['modificacionFisica'] ?? '') . "\n";
    $contenidoSeccion5 .= "Plan de contingencia: " . ($datos['planContingencia'] ?? '');

    agregarSeccion($pdf, '5. Compromisos de Cuidado', $contenidoSeccion5);

    // Fecha y firma
    $pdf->Ln(15);
    $pdf->SetFont('helvetica', 'I', 10);
    $pdf->Cell(0, 10, 'Fecha: ' . date('d/m/Y'), 0, 1);

    $directorio = __DIR__ . '/../../solicitudes/' . $idSolicitud . '/';

    if (!file_exists($directorio)) {
        mkdir($directorio, 0777, true);
    }

    $nombreArchivo = $directorio . 'solicitud.pdf';
    $pdf->Output($nombreArchivo, 'F');

    if (file_exists($nombreArchivo)) {
        echo json_encode([
            'status' => 'success', 
            'message' => 'PDF generado con éxito',
            'file' => $nombreArchivo
        ]);
    } else {
        echo json_encode([
            'status' => 'error', 
            'message' => 'Error al guardar el PDF'
        ]);
    }
?>