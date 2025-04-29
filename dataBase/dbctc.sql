-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2025 a las 03:02:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ctc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adoptante`
--

CREATE TABLE `adoptante` (
  `idAdoptante` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `documentos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `adoptante`
--

INSERT INTO `adoptante` (`idAdoptante`, `nombre`, `telefono`, `correo`, `documentos`) VALUES
(1, 'Ana López García', '5551234567', 'ana.lopez@mail.com', ''),
(2, 'Carlos Martínez Ruiz', '5559876543', 'carlos.mtz@correo.com', ''),
(3, 'María Hernández Sánchez', '5553344556', 'maria.hdz@outlook.com', ''),
(4, 'Jorge Ramírez Pérez', '5556677889', 'jorge.ramirez@empresa.com', ''),
(5, 'Laura González Díaz', '5551122334', 'laura.gonzalez@mail.com', ''),
(6, 'Fernando Torres Méndez', '5555544332', 'fernando.tm@correo.com', ''),
(7, 'Sofía Castro Reyes', '5557766558', 'sofia.castro@outlook.com', ''),
(8, 'Miguel Ángel Ortega', '5558899001', 'miguel.ortega@mail.com', ''),
(9, 'Valeria Silva Cruz', '5554433221', 'valeria.sc@correo.com', ''),
(10, 'Diego Navarro Ríos', '5550099887', 'diego.navarro@mail.com', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesmascota`
--

CREATE TABLE `detallesmascota` (
  `idMascota` int(11) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `sexo` enum('Macho','Hembra') DEFAULT NULL,
  `raza` varchar(100) DEFAULT NULL,
  `tamaño` enum('Pequeño','Mediano','Grande') DEFAULT NULL,
  `caractFisica` varchar(255) DEFAULT NULL,
  `estadoSalud` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallesmascota`
--

INSERT INTO `detallesmascota` (`idMascota`, `edad`, `sexo`, `raza`, `tamaño`, `caractFisica`, `estadoSalud`, `descripcion`) VALUES
(1, 2, 'Macho', 'Mestizo', 'Mediano', 'Mancha blanca en el pecho', 'Saludable', 'Juguetón y bueno con niños'),
(2, 3, 'Hembra', 'Siamés', 'Pequeño', 'Ojos azules intensos', 'Alergia al polen', 'Gata tranquila y cariñosa'),
(3, 1, 'Macho', 'Criollo', 'Pequeño', 'Pelaje atigrado', 'Vacunado completo', 'Energético y curioso'),
(4, 4, 'Hembra', 'West Highland', 'Pequeño', 'Pelaje blanco y largo', 'Artritis leve', 'Adora pasear y nadar'),
(5, 2, 'Macho', 'Pastor Alemán', 'Grande', 'Orejas erguidas', 'Saludable', 'Excelente guardián'),
(6, 5, 'Hembra', 'Chihuahua', 'Pequeño', 'Cabeza en forma de manzana', 'Problemas dentales', 'Le encanta estar en brazos'),
(7, 4, 'Macho', 'Boxer', 'Mediano', 'Mandíbula cuadrada', 'Saludable', 'Amigable con otros perros'),
(8, 2, 'Hembra', 'Maltés', 'Pequeño', 'Pelaje blanco largo', 'Ojos sensibles', 'Dócil y tranquila'),
(9, 1, 'Macho', 'Pug', 'Pequeño', 'Cara arrugada', 'Ronca al dormir', 'Compañero ideal para departamentos'),
(10, 3, 'Hembra', 'Cocker Spaniel', 'Mediano', 'Orejas largas y sedosas', 'Otitis crónica', 'Adora jugar con pelotas'),
(11, 4, 'Hembra', 'Dálmata', 'Grande', 'Manchas negras', 'Problemas de piel', 'Necesita ejercicio diario'),
(12, 2, 'Hembra', 'Husky', 'Grande', 'Ojos heterocromos', 'Resistente al frío', 'Aullador profesional'),
(13, 5, 'Macho', 'Beagle', 'Mediano', 'Cola siempre en movimiento', 'Sobrepeso leve', 'Expert en seguir olores'),
(14, 6, 'Macho', 'Mestizo', 'Mediano', 'Patas cortas y orejas largas', 'Artritis', 'Tranquilo y dormilón'),
(15, 1, 'Hembra', 'Golden Retriever', 'Grande', 'Pelaje sedoso', 'Saludable', 'Apta para terapia emocional'),
(16, 3, 'Macho', 'Bulldog Francés', 'Pequeño', 'Orejas de murciélago', 'Ronquidos fuertes', 'Personalidad cómica'),
(17, 4, 'Hembra', 'Schnauzer', 'Mediano', 'Barba característica', 'Problemas oculares', 'Inteligente y alerta'),
(18, 2, 'Macho', 'Doberman', 'Grande', 'Cuerpo atlético', 'Saludable', 'Necesita entrenamiento constante'),
(19, 7, 'Hembra', 'Caniche', 'Pequeño', 'Pelaje rizado', 'Alergia a picaduras', 'Ideal para dueños primerizos'),
(20, 1, 'Macho', 'Xoloitzcuintle', 'Mediano', 'Piel desnuda', 'Protección solar necesaria', 'Típico perro mexicano');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donacion`
--

CREATE TABLE `donacion` (
  `idDonacion` int(11) NOT NULL,
  `nombreDonante` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `estadoDonacion` enum('Pendiente','Finalizada') NOT NULL DEFAULT 'Pendiente',
  `tipo` enum('Monetaria','En especie','Voluntariado') NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `fechaDonacion` date NOT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `donacion`
--

INSERT INTO `donacion` (`idDonacion`, `nombreDonante`, `correo`, `estadoDonacion`, `tipo`, `fecha`, `fechaDonacion`, `monto`, `descripcion`) VALUES
(1, 'Fundación Patitas Felices', 'contacto@patitasfelices.org', 'Finalizada', 'Monetaria', '2024-01-15', '2025-04-25', 5000.00, 'Donación para vacunación masiva'),
(2, 'Ricardo Fernández', 'ricardo.fdz@correo.com', 'Finalizada', 'Monetaria', '2024-02-02', '2025-04-25', 1500.50, 'Apoyo para esterilizaciones'),
(3, 'Antonio', 'anonimo@gmail.com', 'Pendiente', 'Monetaria', '2024-04-10', '2025-04-25', 200.00, 'Donación recurrente mensual'),
(4, 'Mariana Sánchez', 'mariana.s@mail.com', 'Finalizada', 'Monetaria', '2024-03-18', '2025-04-25', 750.00, 'En memoria de su mascota'),
(5, 'Alimentos HappyDog', 'ventas@happydog.mx', 'Finalizada', 'En especie', '2024-01-25', '2025-04-25', NULL, '100 kg de croquetas premium'),
(6, 'Clínica Veterinaria Central', 'clinica@vetcentral.com', 'Finalizada', 'En especie', '2024-02-14', '2025-04-25', NULL, 'Servicios médicos por 3 meses'),
(7, 'PetLovers CDMX', 'donaciones@petlovers.mx', 'Pendiente', 'En especie', '2024-04-22', '2025-04-25', NULL, '30 camas térmicas'),
(8, 'Ana López García', 'ana.lopez@mail.com', 'Finalizada', 'Voluntariado', '2024-03-05', '2025-04-25', NULL, '20 horas de limpieza de jaulas'),
(9, 'Universidad Canina', 'voluntarios@uc.edu.mx', 'Finalizada', 'Voluntariado', '2024-04-01', '2025-04-25', NULL, 'Equipo de 10 estudiantes'),
(10, 'Carlos Martínez', 'carlos.mtz@correo.com', 'Pendiente', 'Voluntariado', '2024-05-01', '2025-04-25', NULL, 'Transporte de mascotas'),
(11, 'Tienda Mascotín', 'tienda@mascotin.com', 'Finalizada', 'En especie', '2024-03-30', '2025-04-25', NULL, 'Juguetes y collares'),
(12, 'Dr. Alejandro Pérez', 'dr.perez@vet.com', 'Finalizada', 'Monetaria', '2024-02-28', '2025-04-25', 3000.00, 'Fondo de emergencias'),
(13, 'Escuela Primaria Sol', 'contacto@escuelasol.edu', 'Finalizada', 'Voluntariado', '2024-04-05', '2025-04-25', NULL, 'Actividades educativas'),
(14, 'Influencer PetFriend', 'petfriend@influencer.com', 'Pendiente', 'Monetaria', '2024-04-25', '2025-04-25', 800.00, 'Donación por transmisión en vivo'),
(15, 'Antonia', 'antonia@gmail.com', 'Finalizada', 'Monetaria', '2024-01-10', '2025-04-25', 100.00, 'Donación express'),
(16, 'Areli Guevara', 'arealeguevadillo@gmail.com', 'Pendiente', 'Monetaria', '2025-04-26', '2025-04-27', NULL, 'Donación para alimentar a los animalitos del centro.'),
(17, 'Benito Juarez', 'el.viento.a.juarez@gmail.com', 'Pendiente', 'En especie', '2025-04-26', '2025-04-27', NULL, 'Donación de muchos juguetes para que el respeto al derecho ajeno de los perritos sea la paz.'),
(18, 'Cepillin', 'nye@gmail.com', 'Pendiente', 'Voluntariado', '2025-04-26', '2025-04-28', NULL, 'Ir a entretener a los perritos por que es un nye.'),
(19, 'Jenny Rivera', 'mariposa.barrio@gmail.com', 'Pendiente', 'En especie', '2025-04-26', '2025-04-30', NULL, '90000kg de croquetas para que mis plebes no pasen hambre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota`
--

CREATE TABLE `mascota` (
  `idMascota` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estacionMetro` enum('Acatitla','Aculco','Agrícola Oriental','Allende','Apatlaco','Aquiles Serdán','Aragón','Atlalilco','Auditorio','Autobuses del Norte','Azcapotzalco','Balbuena','Balderas','Barranca del Muerto','Bellas Artes','Bondojito','Bosque de Aragón','Boulevard Puerto Aéreo','Buenavista','Calle 11','Camarones','Canal del Norte','Canal de San Juan','Candelaria','Centro Médico','Cerro de la Estrella','Chabacano','Chapultepec','Chilpancingo','Ciudad Azteca','Ciudad Deportiva','Constitución de 1917','Constituyentes','Copilco','Coyuya','Cuatro Caminos','Culhuacán','Cuauhtémoc','Cuitláhuac','Deportivo 18 de Marzo','Deportivo Oceanía','División del Norte','Doctores','Eduardo Molina','El Rosario','Ermita','Escuadrón 201','Etiopía/Plaza de la Transparencia','Eugenia','Ferrería','Fray Servando','Garibaldi','General Anaya','Gómez Farías','Gran Canal','Guerrero','Guelatao','Hangares','Hidalgo','Hospital 20 de Noviembre','Hospital General','Impulsora','Indios Verdes','Insurgentes','Instituto del Petróleo','Iztacalco','Iztapalapa','Isabel la Católica','Jamaica','Juárez','Juanacatlán','La Raza','La Viga','Lagunilla','Lindavista','Lomas Estrella','Los Reyes','Martín Carrera','Merced','Mexicaltzingo','Miguel Ángel de Quevedo','Mixcoac','Mixiuhca','Moctezuma','Morelos','Museo','Nativitas','Nezahualcóyotl','Niños Héroes','Nopalera','Normal','Norte 45','Observatorio','Oceanía','Olímpica','Panteones','Pantitlán','Patriotismo','Peñón Viejo','Periférico Oriente','Pino Suárez','Plaza Aragón','Polanco','Politécnico','Popotla','Portales','Potrero','Refinería','Revolución','Ricardo Flores Magón','Río de los Remedios','Romero Rubio','Salto del Agua','San Andrés Tomatlán','San Antonio','San Antonio Abad','San Cosme','San Joaquín','San Juan de Letrán','San Lázaro','San Pedro de los Pinos','Santa Anita','Santa Marta','Sevilla','Shakespeare','Tacuba','Tacubaya','Talisman','Tasqueña','Tezonco','Tezozómoc','Tláhuac','Tlatelolco','Tlaltenco','Tlatilco','Tlazintla','Universidad','UAM-I','UAM-Azcapotzalco','Valle Gómez','Vallejo','Velódromo','Villa de Aragón','Villa de Cortés','Viaducto','Viveros','Xola','Zapata','Zaragoza','Zócalo') DEFAULT NULL,
  `fechaIngreso` date NOT NULL,
  `estadoAdopcion` enum('Disponible','Adoptado','En proceso','No Disponible') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`idMascota`, `nombre`, `estacionMetro`, `fechaIngreso`, `estadoAdopcion`) VALUES
(1, 'Panchito', 'Pantitlán', '2025-04-23', 'Disponible'),
(2, 'Tacubaya', 'Tacubaya', '2025-04-23', 'Disponible'),
(3, 'Mixco', 'Mixcoac', '2025-04-23', 'Adoptado'),
(4, 'Chapulín', 'Chapultepec', '2025-04-23', 'Disponible'),
(5, 'Aragón', 'Aragón', '2025-04-23', 'Disponible'),
(6, 'Candy', 'Candelaria', '2025-04-23', 'Adoptado'),
(7, 'Balderas', 'Balderas', '2025-04-23', 'Disponible'),
(8, 'Tasquita', 'Tasqueña', '2025-04-23', 'No Disponible'),
(9, 'Zarago', 'Zaragoza', '2025-04-23', 'Disponible'),
(10, 'Rosita', 'El Rosario', '2025-04-23', 'Disponible'),
(11, 'Vicky', 'Viaducto', '2025-04-23', 'No Disponible'),
(12, 'Luna', 'Lindavista', '2025-04-23', 'Disponible'),
(13, 'Chabacano', 'Chabacano', '2025-04-23', 'Disponible'),
(14, 'Morel', 'Morelos', '2025-04-23', 'Disponible'),
(15, 'Güera', 'Guerrero', '2025-04-23', 'En proceso'),
(16, 'Pino', 'Pino Suárez', '2025-04-23', 'Disponible'),
(17, 'Ocean', 'Oceanía', '2025-04-23', 'Adoptado'),
(18, 'Hidalgo', 'Hidalgo', '2025-04-23', 'Disponible'),
(19, 'Tlatel', 'Tlatelolco', '2025-04-23', 'Disponible'),
(20, 'Xolito', 'Xola', '2025-04-23', 'Disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `idReporte` int(11) NOT NULL,
  `idMascota` int(11) DEFAULT NULL,
  `nombreReportante` varchar(100) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `estacion` enum('Acatitla','Aculco','Agrícola Oriental','Allende','Apatlaco','Aquiles Serdán','Aragón','Atlalilco','Auditorio','Autobuses del Norte','Azcapotzalco','Balbuena','Balderas','Barranca del Muerto','Bellas Artes','Bondojito','Bosque de Aragón','Boulevard Puerto Aéreo','Buenavista','Calle 11','Camarones','Canal del Norte','Canal de San Juan','Candelaria','Centro Médico','Cerro de la Estrella','Chabacano','Chapultepec','Chilpancingo','Ciudad Azteca','Ciudad Deportiva','Constitución de 1917','Constituyentes','Copilco','Coyuya','Cuatro Caminos','Culhuacán','Cuauhtémoc','Cuitláhuac','Deportivo 18 de Marzo','Deportivo Oceanía','División del Norte','Doctores','Eduardo Molina','El Rosario','Ermita','Escuadrón 201','Etiopía/Plaza de la Transparencia','Eugenia','Ferrería','Fray Servando','Garibaldi','General Anaya','Gómez Farías','Gran Canal','Guerrero','Guelatao','Hangares','Hidalgo','Hospital 20 de Noviembre','Hospital General','Impulsora','Indios Verdes','Insurgentes','Instituto del Petróleo','Iztacalco','Iztapalapa','Isabel la Católica','Jamaica','Juárez','Juanacatlán','La Raza','La Viga','Lagunilla','Lindavista','Lomas Estrella','Los Reyes','Martín Carrera','Merced','Mexicaltzingo','Miguel Ángel de Quevedo','Mixcoac','Mixiuhca','Moctezuma','Morelos','Museo','Nativitas','Nezahualcóyotl','Niños Héroes','Nopalera','Normal','Norte 45','Observatorio','Oceanía','Olímpica','Panteones','Pantitlán','Patriotismo','Peñón Viejo','Periférico Oriente','Pino Suárez','Plaza Aragón','Polanco','Politécnico','Popotla','Portales','Potrero','Refinería','Revolución','Ricardo Flores Magón','Río de los Remedios','Romero Rubio','Salto del Agua','San Andrés Tomatlán','San Antonio','San Antonio Abad','San Cosme','San Joaquín','San Juan de Letrán','San Lázaro','San Pedro de los Pinos','Santa Anita','Santa Marta','Sevilla','Shakespeare','Tacuba','Tacubaya','Talisman','Tasqueña','Tezonco','Tezozómoc','Tláhuac','Tlatelolco','Tlaltenco','Tlatilco','Tlazintla','Universidad','UAM-I','UAM-Azcapotzalco','Valle Gómez','Vallejo','Velódromo','Villa de Aragón','Villa de Cortés','Viaducto','Viveros','Xola','Zapata','Zaragoza','Zócalo') NOT NULL,
  `estadoReporte` enum('En proceso','Localizada','Descartado') NOT NULL,
  `fechaReporte` datetime NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reporte`
--

INSERT INTO `reporte` (`idReporte`, `idMascota`, `nombreReportante`, `correo`, `estacion`, `estadoReporte`, `fechaReporte`, `descripcion`) VALUES
(1, 2, 'Roberto Jiménez', 'roberto.j@correo.com', 'Tacubaya', 'Localizada', '2024-03-10 00:00:00', 'Gata siamesa con collar azul, asustada cerca de torniquetes'),
(2, NULL, 'Lucía Mendoza', 'lucia.m@mail.com', 'Pino Suárez', 'En proceso', '2024-04-15 00:00:00', 'Perro mestizo café con manchas blancas, buscando comida en andén'),
(3, 4, 'Gerardo Ruiz', NULL, 'Chapultepec', 'Localizada', '2024-02-28 00:00:00', 'Perro atrapado en vias'),
(4, NULL, 'Estación Pantitlán', 'atencion@metro.cdmx', 'Pantitlán', 'En proceso', '2024-04-20 00:00:00', '3 cachorros mestizos en zona de taquillas'),
(5, 6, 'María del Carmen', 'maricarm@correo.com', 'Candelaria', 'Localizada', '2024-01-05 00:00:00', 'Chihuahua con pata lastimada, resguardado en oficinas'),
(6, 14, 'Luis Miguel', 'sol_de_Mexico@gmail.com', 'Autobuses del Norte', 'Descartado', '2024-12-09 00:00:00', 'Confundió una estatua con perro dorado - falso positivo'),
(7, NULL, 'Frida Khalo', 'frida.khalo@gmail.com', 'La Raza', 'En proceso', '2025-04-25 23:45:03', 'Una gata con sus crías merodeando por la parte superior de los andenes.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `idSolicitud` int(11) NOT NULL,
  `idMascota` int(11) DEFAULT NULL,
  `idAdoptante` int(11) DEFAULT NULL,
  `fechaSolicitud` date NOT NULL,
  `estadoAdopcion` enum('Pendiente','Aprobada','Rechazada') DEFAULT 'Pendiente',
  `comentarios` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`idSolicitud`, `idMascota`, `idAdoptante`, `fechaSolicitud`, `estadoAdopcion`, `comentarios`) VALUES
(1, 1, 1, '2024-03-15', 'Aprobada', 'Hogar con patio grande y experiencia previa'),
(2, 7, 3, '2024-04-01', 'Aprobada', 'Familia comprometida con entrenamiento'),
(3, 15, 2, '2024-02-20', 'Aprobada', 'Adopción para terapia asistida'),
(4, 5, 4, '2024-01-25', 'Rechazada', 'Espacio insuficiente para perro grande'),
(5, 9, 5, '2024-03-10', 'Rechazada', 'Alergias a perros de pelo corto'),
(6, 18, 6, '2024-04-05', 'Rechazada', 'Horarios incompatibles para cuidados'),
(7, 12, 7, '2024-04-18', 'Pendiente', 'En revisión de documentación'),
(8, 20, 8, '2024-04-20', 'Pendiente', 'Visita domiciliaria programada'),
(9, 3, 9, '2024-04-22', 'Pendiente', 'Esperando respuesta del adoptante'),
(10, 16, 10, '2024-04-23', 'Pendiente', 'Proceso de entrevista en curso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userdonador`
--

CREATE TABLE `userdonador` (
  `idDonador` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `img` text NOT NULL,
  `color` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `userdonador`
--

INSERT INTO `userdonador` (`idDonador`, `usuario`, `img`, `color`) VALUES
(1, 'fundacion.patitas', '1.png', '#FF5733'),
(2, 'ricardo.fdz', '1.png', '#33FF57'),
(4, 'mariana.s', '5.png', '#3357FF'),
(5, 'happydog.mx', '11.png', '#F9A602'),
(8, 'ana.lopez', '6.png', '#FFC300'),
(9, 'uni.canina', '8.png', '#00C853'),
(12, 'dr.alejandro', '10.png', '#9C27B0'),
(13, 'escuela.sol', '4.png', '#FF0000'),
(14, 'petfriend', '6.png', '#00BCD4'),
(15, 'anon.donor', '5.png', '#607D8B'),
(16, 'Venuz', '18.png', '#b094ff'),
(19, 'Mariposa de Barrio', '19.png', '#003975');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitadom`
--

CREATE TABLE `visitadom` (
  `idSolicitud` int(11) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `ubicacion` text NOT NULL,
  `estadoVisita` enum('Pendiente','Realizada','Cancelada','Reprogramada') NOT NULL,
  `fechaVisita` datetime NOT NULL,
  `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `visitadom`
--

INSERT INTO `visitadom` (`idSolicitud`, `direccion`, `ubicacion`, `estadoVisita`, `fechaVisita`, `notas`) VALUES
(1, 'Calle Fuego 123, Col. Pantitlán', '19.4135° N, 99.0331° W', 'Realizada', '2024-03-20 11:00:00', 'Hogar adecuado con patio cercado'),
(2, 'Calle Luna 78, Lindavista', '19.4912° N, 99.1355° W', 'Realizada', '2024-04-10 10:00:00', 'Departamento amplio y seguro'),
(3, 'Av. Hidalgo 45, Centro Histórico', '19.4326° N, 99.1332° W', 'Realizada', '2024-02-25 16:30:00', 'Familia con experiencia en terapia asistida'),
(4, 'Calle Jardín 89, Coyoacán', '19.3467° N, 99.1612° W', 'Realizada', '2024-04-05 17:00:00', 'Casa con área verde ideal'),
(5, 'Av. Universidad 999, Copilco', '19.3278° N, 99.1802° W', 'Pendiente', '2024-05-02 11:30:00', 'Primera visita programada'),
(6, 'Calle Pino 67, Del Valle', '19.3725° N, 99.1753° W', 'Cancelada', '2024-03-18 09:00:00', 'Adoptante desistió'),
(7, 'Calle Sol 22, Aragón', '19.4714° N, 99.0754° W', 'Reprogramada', '2024-05-05 12:00:00', 'Se pospuso por lluvia'),
(8, 'Av. Cuitláhuac 334, Azcapotzalco', '19.4876° N, 99.1865° W', 'Cancelada', '2024-04-12 13:30:00', 'Problemas de agenda'),
(9, 'Av. Reforma 1500, Juárez', '19.4285° N, 99.1608° W', 'Pendiente', '2024-04-30 15:00:00', 'Esperando confirmación'),
(10, 'Calle Xochimilco 55, Tláhuac', '19.2563° N, 99.0057° W', 'Reprogramada', '2024-05-10 10:00:00', 'Cambio por emergencia médica');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adoptante`
--
ALTER TABLE `adoptante`
  ADD PRIMARY KEY (`idAdoptante`);

--
-- Indices de la tabla `detallesmascota`
--
ALTER TABLE `detallesmascota`
  ADD PRIMARY KEY (`idMascota`);

--
-- Indices de la tabla `donacion`
--
ALTER TABLE `donacion`
  ADD PRIMARY KEY (`idDonacion`);

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`idMascota`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`idReporte`),
  ADD KEY `fk_mascota_reporte` (`idMascota`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`idSolicitud`),
  ADD KEY `idMascota` (`idMascota`),
  ADD KEY `idAdoptante` (`idAdoptante`);

--
-- Indices de la tabla `userdonador`
--
ALTER TABLE `userdonador`
  ADD KEY `idDonador` (`idDonador`);

--
-- Indices de la tabla `visitadom`
--
ALTER TABLE `visitadom`
  ADD PRIMARY KEY (`idSolicitud`),
  ADD KEY `idSolicitud` (`idSolicitud`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adoptante`
--
ALTER TABLE `adoptante`
  MODIFY `idAdoptante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `donacion`
--
ALTER TABLE `donacion`
  MODIFY `idDonacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `idMascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallesmascota`
--
ALTER TABLE `detallesmascota`
  ADD CONSTRAINT `detallesmascota_ibfk_1` FOREIGN KEY (`idMascota`) REFERENCES `mascota` (`idMascota`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `fk_mascota_reporte` FOREIGN KEY (`idMascota`) REFERENCES `mascota` (`idMascota`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `solicitud_ibfk_1` FOREIGN KEY (`idMascota`) REFERENCES `mascota` (`idMascota`),
  ADD CONSTRAINT `solicitud_ibfk_2` FOREIGN KEY (`idAdoptante`) REFERENCES `adoptante` (`idAdoptante`);

--
-- Filtros para la tabla `userdonador`
--
ALTER TABLE `userdonador`
  ADD CONSTRAINT `userdonador_ibfk_1` FOREIGN KEY (`idDonador`) REFERENCES `donacion` (`idDonacion`);

--
-- Filtros para la tabla `visitadom`
--
ALTER TABLE `visitadom`
  ADD CONSTRAINT `visitadom_ibfk_1` FOREIGN KEY (`idSolicitud`) REFERENCES `solicitud` (`idSolicitud`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
