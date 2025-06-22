<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require __DIR__ . '/../PHPMailer/src/SMTP.php';
require __DIR__ . '/../PHPMailer/src/Exception.php';

function enviarCorreoAdopcion($para, $asunto, $mensajePlano, $mensajeHTML) {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';

    try {
        // Configuración SMTP para Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;

        $mail->Username = 'digitalctcmx@gmail.com';
        $mail->Password = 'jhgamujsgwxkyvls'; 

        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Remitente
        $mail->setFrom('digitalctcmx@gmail.com', 'CTC Digital');
        $mail->addAddress($para);

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = $mensajeHTML;
        $mail->AltBody = $mensajePlano;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Error al enviar correo: {$mail->ErrorInfo}");
        return false;
    }
}
