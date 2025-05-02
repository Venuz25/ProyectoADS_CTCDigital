-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2025 a las 06:44:17
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
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `usuario`, `contraseña`) VALUES
(1, 'admin', 'admin1234'),
(2, 'admin2', 'admin5678');

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
  `tamaño` enum('Pequeño','Mediano','Grande') DEFAULT NULL,
  `caractFisica` varchar(255) DEFAULT NULL,
  `estadoSalud` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `idRaza` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallesmascota`
--

INSERT INTO `detallesmascota` (`idMascota`, `edad`, `sexo`, `tamaño`, `caractFisica`, `estadoSalud`, `descripcion`, `idRaza`) VALUES
(1, 2, 'Macho', 'Mediano', 'Mancha blanca en el pecho', 'Saludable', 'Juguetón y bueno con niños', 1),
(2, 3, 'Hembra', 'Pequeño', 'Ojos azules intensos', 'Alergia al polen', 'Gata tranquila y cariñosa', 19),
(3, 1, 'Macho', 'Pequeño', 'Pelaje atigrado', 'Vacunado completo', 'Energético y curioso', 18),
(4, 4, 'Hembra', 'Pequeño', 'Pelaje blanco y largo', 'Artritis leve', 'Adora pasear y nadar', 2),
(5, 2, 'Macho', 'Grande', 'Orejas erguidas', 'Saludable', 'Excelente guardián', 3),
(6, 5, 'Hembra', 'Pequeño', 'Cabeza en forma de manzana', 'Problemas dentales', 'Le encanta estar en brazos', 4),
(7, 4, 'Macho', 'Mediano', 'Mandíbula cuadrada', 'Saludable', 'Amigable con otros perros', 5),
(8, 2, 'Hembra', 'Pequeño', 'Pelaje blanco largo', 'Ojos sensibles', 'Dócil y tranquila', 6),
(9, 1, 'Macho', 'Pequeño', 'Cara arrugada', 'Ronca al dormir', 'Compañero ideal para departamentos', 7),
(10, 3, 'Hembra', 'Mediano', 'Orejas largas y sedosas', 'Otitis crónica', 'Adora jugar con pelotas', 8),
(11, 4, 'Hembra', 'Grande', 'Manchas negras', 'Problemas de piel', 'Necesita ejercicio diario', 9),
(12, 2, 'Hembra', 'Grande', 'Ojos heterocromos', 'Resistente al frío', 'Aullador profesional', 10),
(13, 5, 'Macho', 'Mediano', 'Cola siempre en movimiento', 'Sobrepeso leve', 'Expert en seguir olores', 11),
(14, 6, 'Macho', 'Mediano', 'Patas cortas y orejas largas', 'Artritis', 'Tranquilo y dormilón', 1),
(15, 1, 'Hembra', 'Grande', 'Pelaje sedoso', 'Saludable', 'Apta para terapia emocional', 12),
(16, 3, 'Macho', 'Pequeño', 'Orejas de murciélago', 'Ronquidos fuertes', 'Personalidad cómica', 13),
(17, 4, 'Hembra', 'Mediano', 'Barba característica', 'Problemas oculares', 'Inteligente y alerta', 14),
(18, 2, 'Macho', 'Grande', 'Cuerpo atlético', 'Saludable', 'Necesita entrenamiento constante', 15),
(19, 7, 'Hembra', 'Pequeño', 'Pelaje rizado', 'Alergia a picaduras', 'Ideal para dueños primerizos', 16),
(20, 1, 'Macho', 'Mediano', 'Piel desnuda', 'Protección solar necesaria', 'Típico perro mexicano', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donacion`
--

CREATE TABLE `donacion` (
  `idDonacion` int(11) NOT NULL,
  `idDonante` int(11) NOT NULL,
  `estadoDonacion` enum('Pendiente','Finalizada','Cancelado','En proceso') NOT NULL DEFAULT 'Pendiente',
  `tipo` enum('Monetaria','En especie','Voluntariado') NOT NULL,
  `fechaDonacion` date NOT NULL,
  `fechaPrevistaDon` date NOT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `donacion`
--

INSERT INTO `donacion` (`idDonacion`, `idDonante`, `estadoDonacion`, `tipo`, `fechaDonacion`, `fechaPrevistaDon`, `monto`, `descripcion`) VALUES
(1, 1, 'Finalizada', 'Monetaria', '2024-01-15', '2025-04-25', 5000.00, 'Donación para vacunación masiva'),
(2, 2, 'Finalizada', 'Monetaria', '2024-02-02', '2024-04-02', 1500.50, 'Apoyo para esterilizaciones'),
(3, 3, 'Finalizada', 'Monetaria', '2024-04-10', '2024-04-11', 200.00, 'Donación recurrente mensual'),
(4, 4, 'Finalizada', 'Monetaria', '2024-03-18', '2024-03-25', 750.00, 'En memoria de su mascota'),
(5, 5, 'Finalizada', 'En especie', '2024-01-25', '2024-02-29', NULL, '100 kg de croquetas premium'),
(6, 6, 'Finalizada', 'En especie', '2024-02-14', '2024-04-30', NULL, 'Servicios médicos por 3 meses'),
(7, 7, 'Finalizada', 'En especie', '2024-04-22', '2024-04-30', NULL, '30 camas térmicas'),
(8, 8, 'Cancelado', 'Voluntariado', '2024-03-05', '2024-04-05', NULL, '20 horas de limpieza de jaulas'),
(9, 9, 'Finalizada', 'Voluntariado', '2024-04-01', '2025-04-01', NULL, 'Equipo de 10 estudiantes'),
(10, 10, 'Finalizada', 'Voluntariado', '2024-05-01', '2025-04-25', NULL, 'Transporte de mascotas'),
(11, 11, 'Finalizada', 'En especie', '2024-03-30', '2025-04-25', NULL, 'Juguetes y collares'),
(12, 12, 'Cancelado', 'Monetaria', '2024-02-28', '2025-04-25', 3000.00, 'Fondo de emergencias'),
(13, 13, 'Finalizada', 'Voluntariado', '2024-04-05', '2025-04-25', NULL, 'Actividades educativas'),
(14, 14, 'Finalizada', 'Monetaria', '2024-04-25', '2025-04-25', 800.00, 'Donación por transmisión en vivo'),
(15, 15, 'Cancelado', 'Monetaria', '2024-01-10', '2025-04-25', 100.00, 'Donación express'),
(16, 16, 'Pendiente', 'Monetaria', '2025-04-26', '2025-04-27', NULL, 'Donación para alimentar a los animalitos del centro.'),
(17, 17, 'Pendiente', 'En especie', '2025-04-26', '2025-04-27', NULL, 'Donación de muchos juguetes para que el respeto al derecho ajeno de los perritos sea la paz.'),
(18, 18, 'Pendiente', 'Voluntariado', '2025-04-26', '2025-04-28', NULL, 'Ir a entretener a los perritos por que es un nye.'),
(19, 19, 'Pendiente', 'En especie', '2025-04-26', '2025-04-30', NULL, '90000kg de croquetas para que mis plebes no pasen hambre'),
(20, 20, 'Pendiente', 'Monetaria', '2025-05-01', '0000-00-00', NULL, 'Donación para comprarles todos los accesorios que requieren los animalitos.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donacionvisual`
--

CREATE TABLE `donacionvisual` (
  `idUser` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `img` text NOT NULL,
  `color` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `donacionvisual`
--

INSERT INTO `donacionvisual` (`idUser`, `usuario`, `img`, `color`) VALUES
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
(19, 'Mariposa de Barrio', '19.png', '#003975'),
(20, 'Gaga', '19.png', '#9d2020');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donante`
--

CREATE TABLE `donante` (
  `idDonante` int(11) NOT NULL,
  `nombreDonante` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `donante`
--

INSERT INTO `donante` (`idDonante`, `nombreDonante`, `correo`) VALUES
(1, 'Fundación Patitas Felices', 'contacto@patitasfelices.org'),
(2, 'Ricardo Fernández', 'ricardo.fdz@correo.com'),
(3, 'Antonio', 'anonimo@gmail.com'),
(4, 'Mariana Sánchez', 'mariana.s@mail.com'),
(5, 'Alimentos HappyDog', 'ventas@happydog.mx'),
(6, 'Clínica Veterinaria Central', 'clinica@vetcentral.com'),
(7, 'PetLovers CDMX', 'donaciones@petlovers.mx'),
(8, 'Ana López García', 'ana.lopez@mail.com'),
(9, 'Universidad Canina', 'voluntarios@uc.edu.mx'),
(10, 'Carlos Martínez', 'carlos.mtz@correo.com'),
(11, 'Tienda Mascotín', 'tienda@mascotin.com'),
(12, 'Dr. Alejandro Pérez', 'dr.perez@vet.com'),
(13, 'Escuela Primaria Sol', 'contacto@escuelasol.edu'),
(14, 'Influencer PetFriend', 'petfriend@influencer.com'),
(15, 'Antonia', 'antonia@gmail.com'),
(16, 'Areli Guevara', 'arealeguevadillo@gmail.com'),
(17, 'Benito Juarez', 'el.viento.a.juarez@gmail.com'),
(18, 'Cepillin', 'nye@gmail.com'),
(19, 'Jenny Rivera', 'mariposa.barrio@gmail.com'),
(20, 'Lady Gaga', 'little.monster@yahoo.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especie`
--

CREATE TABLE `especie` (
  `idEspecie` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especie`
--

INSERT INTO `especie` (`idEspecie`, `nombre`) VALUES
(2, 'Gato'),
(1, 'Perro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estaciones`
--

CREATE TABLE `estaciones` (
  `idEstacion` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `linea` varchar(10) NOT NULL,
  `colorLinea` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estaciones`
--

INSERT INTO `estaciones` (`idEstacion`, `nombre`, `linea`, `colorLinea`) VALUES
(101, 'Observatorio', 'L1', 'Rosa'),
(102, 'Tacubaya', 'L1', 'Rosa'),
(103, 'Juanacatlán', 'L1', 'Rosa'),
(104, 'Chapultepec', 'L1', 'Rosa'),
(105, 'Sevilla', 'L1', 'Rosa'),
(106, 'Insurgentes', 'L1', 'Rosa'),
(107, 'Cuauhtémoc', 'L1', 'Rosa'),
(108, 'Balderas', 'L1', 'Rosa'),
(109, 'Salto del Agua', 'L1', 'Rosa'),
(110, 'Isabel la Católica', 'L1', 'Rosa'),
(111, 'Pino Suárez', 'L1', 'Rosa'),
(112, 'Merced', 'L1', 'Rosa'),
(113, 'Candelaria', 'L1', 'Rosa'),
(114, 'San Lázaro', 'L1', 'Rosa'),
(115, 'Moctezuma', 'L1', 'Rosa'),
(116, 'Balbuena', 'L1', 'Rosa'),
(117, 'Boulevard Puerto Aéreo', 'L1', 'Rosa'),
(118, 'Gómez Farías', 'L1', 'Rosa'),
(119, 'Zaragoza', 'L1', 'Rosa'),
(120, 'Pantitlán', 'L1', 'Rosa'),
(201, 'Cuatro Caminos', 'L2', 'Azul'),
(202, 'Panteones', 'L2', 'Azul'),
(203, 'Tacuba', 'L2', 'Azul'),
(204, 'Cuitláhuac', 'L2', 'Azul'),
(205, 'Popotla', 'L2', 'Azul'),
(206, 'Colegio Militar', 'L2', 'Azul'),
(207, 'Normal', 'L2', 'Azul'),
(208, 'San Cosme', 'L2', 'Azul'),
(209, 'Revolución', 'L2', 'Azul'),
(210, 'Hidalgo', 'L2', 'Azul'),
(211, 'Bellas Artes', 'L2', 'Azul'),
(212, 'Allende', 'L2', 'Azul'),
(213, 'Zócalo', 'L2', 'Azul'),
(214, 'Pino Suárez', 'L2', 'Azul'),
(215, 'San Antonio Abad', 'L2', 'Azul'),
(216, 'Chabacano', 'L2', 'Azul'),
(217, 'Viaducto', 'L2', 'Azul'),
(218, 'Xola', 'L2', 'Azul'),
(219, 'Villa de Cortés', 'L2', 'Azul'),
(220, 'Tasqueña', 'L2', 'Azul'),
(301, 'Indios Verdes', 'L3', 'Verde Olivo'),
(302, 'Deportivo 18 de Marzo', 'L3', 'Verde Olivo'),
(303, 'Potrero', 'L3', 'Verde Olivo'),
(304, 'La Raza', 'L3', 'Verde Olivo'),
(305, 'Tlatelolco', 'L3', 'Verde Olivo'),
(306, 'Guerrero', 'L3', 'Verde Olivo'),
(307, 'Hidalgo', 'L3', 'Verde Olivo'),
(308, 'Juárez', 'L3', 'Verde Olivo'),
(309, 'Balderas', 'L3', 'Verde Olivo'),
(310, 'Niños Héroes', 'L3', 'Verde Olivo'),
(311, 'Hospital General', 'L3', 'Verde Olivo'),
(312, 'Centro Médico', 'L3', 'Verde Olivo'),
(313, 'Etiopía', 'L3', 'Verde Olivo'),
(314, 'Eugenia', 'L3', 'Verde Olivo'),
(315, 'División del Norte', 'L3', 'Verde Olivo'),
(316, 'Zapata', 'L3', 'Verde Olivo'),
(317, 'Coyoacán', 'L3', 'Verde Olivo'),
(318, 'Viveros', 'L3', 'Verde Olivo'),
(319, 'Miguel Ángel de Quevedo', 'L3', 'Verde Olivo'),
(320, 'Copilco', 'L3', 'Verde Olivo'),
(321, 'Universidad', 'L3', 'Verde Olivo'),
(401, 'Martín Carrera', 'L4', 'Cian'),
(402, 'Talismán', 'L4', 'Cian'),
(403, 'Bondojito', 'L4', 'Cian'),
(404, 'Consulado', 'L4', 'Cian'),
(405, 'Canal del Norte', 'L4', 'Cian'),
(406, 'Morelos', 'L4', 'Cian'),
(407, 'Candelaria', 'L4', 'Cian'),
(408, 'Fray Servando', 'L4', 'Cian'),
(409, 'Jamaica', 'L4', 'Cian'),
(410, 'Santa Anita', 'L4', 'Cian'),
(501, 'Politécnico', 'L5', 'Amarillo'),
(502, 'Instituto del Petróleo', 'L5', 'Amarillo'),
(503, 'Autobuses del Norte', 'L5', 'Amarillo'),
(504, 'La Raza', 'L5', 'Amarillo'),
(505, 'Misterios', 'L5', 'Amarillo'),
(506, 'Valle Gómez', 'L5', 'Amarillo'),
(507, 'Consulado', 'L5', 'Amarillo'),
(508, 'Eduardo Molina', 'L5', 'Amarillo'),
(509, 'Aragón', 'L5', 'Amarillo'),
(510, 'Oceanía', 'L5', 'Amarillo'),
(511, 'Terminal Aérea', 'L5', 'Amarillo'),
(512, 'Hangares', 'L5', 'Amarillo'),
(513, 'Pantitlán', 'L5', 'Amarillo'),
(601, 'El Rosario', 'L6', 'Rojo'),
(602, 'Tezozómoc', 'L6', 'Rojo'),
(603, 'UAM Azcapotzalco', 'L6', 'Rojo'),
(604, 'Ferrería', 'L6', 'Rojo'),
(605, 'Norte 45', 'L6', 'Rojo'),
(606, 'Vallejo', 'L6', 'Rojo'),
(607, 'Instituto del Petróleo', 'L6', 'Rojo'),
(608, 'Lindavista', 'L6', 'Rojo'),
(609, 'Deportivo 18 de Marzo', 'L6', 'Rojo'),
(610, 'La Villa-Basílica', 'L6', 'Rojo'),
(611, 'Martín Carrera', 'L6', 'Rojo'),
(701, 'El Rosario', 'L7', 'Naranja'),
(702, 'Aquiles Serdán', 'L7', 'Naranja'),
(703, 'Camarones', 'L7', 'Naranja'),
(704, 'Refinería', 'L7', 'Naranja'),
(705, 'Tacuba', 'L7', 'Naranja'),
(706, 'San Joaquín', 'L7', 'Naranja'),
(707, 'Polanco', 'L7', 'Naranja'),
(708, 'Auditorio', 'L7', 'Naranja'),
(709, 'Constituyentes', 'L7', 'Naranja'),
(710, 'Tacubaya', 'L7', 'Naranja'),
(711, 'San Pedro de los Pinos', 'L7', 'Naranja'),
(712, 'San Antonio', 'L7', 'Naranja'),
(713, 'Mixcoac', 'L7', 'Naranja'),
(714, 'Barranca del Muerto', 'L7', 'Naranja'),
(801, 'Garibaldi', 'L8', 'Verde'),
(802, 'Bellas Artes', 'L8', 'Verde'),
(803, 'San Juan de Letrán', 'L8', 'Verde'),
(804, 'Salto del Agua', 'L8', 'Verde'),
(805, 'Doctores', 'L8', 'Verde'),
(806, 'Obrera', 'L8', 'Verde'),
(807, 'Chabacano', 'L8', 'Verde'),
(808, 'La Viga', 'L8', 'Verde'),
(809, 'Santa Anita', 'L8', 'Verde'),
(810, 'Coyuya', 'L8', 'Verde'),
(811, 'Iztacalco', 'L8', 'Verde'),
(812, 'Apatlaco', 'L8', 'Verde'),
(813, 'Aculco', 'L8', 'Verde'),
(814, 'Escuadrón 201', 'L8', 'Verde'),
(815, 'Atlalilco', 'L8', 'Verde'),
(816, 'Iztapalapa', 'L8', 'Verde'),
(817, 'Cerro de la Estrella', 'L8', 'Verde'),
(818, 'UAM-I', 'L8', 'Verde'),
(819, 'Constitución de 1917', 'L8', 'Verde'),
(901, 'Tacubaya', 'L9', 'Café'),
(902, 'Patriotismo', 'L9', 'Café'),
(903, 'Chilpancingo', 'L9', 'Café'),
(904, 'Centro Médico', 'L9', 'Café'),
(905, 'Lázaro Cárdenas', 'L9', 'Café'),
(906, 'Chabacano', 'L9', 'Café'),
(907, 'Jamaica', 'L9', 'Café'),
(908, 'Mixiuhca', 'L9', 'Café'),
(909, 'Velódromo', 'L9', 'Café'),
(910, 'Ciudad Deportiva', 'L9', 'Café'),
(911, 'Puebla', 'L9', 'Café'),
(912, 'Pantitlán', 'L9', 'Café'),
(1201, 'Mixcoac', 'L12', 'Oro'),
(1202, 'Insurgentes Sur', 'L12', 'Oro'),
(1203, 'Hospital 20 de Noviembre', 'L12', 'Oro'),
(1204, 'Zapata', 'L12', 'Oro'),
(1205, 'Parque de los Venados', 'L12', 'Oro'),
(1206, 'Eje Central', 'L12', 'Oro'),
(1207, 'Ermita', 'L12', 'Oro'),
(1208, 'Mexicaltzingo', 'L12', 'Oro'),
(1209, 'Atlalilco', 'L12', 'Oro'),
(1210, 'Culhuacán', 'L12', 'Oro'),
(1211, 'San Andrés Tomatlán', 'L12', 'Oro'),
(1212, 'Lomas Estrella', 'L12', 'Oro'),
(1213, 'Calle 11', 'L12', 'Oro'),
(1214, 'Periférico Oriente', 'L12', 'Oro'),
(1215, 'Tezonco', 'L12', 'Oro'),
(1216, 'Olivos', 'L12', 'Oro'),
(1217, 'Nopalera', 'L12', 'Oro'),
(1218, 'Zapotitlán', 'L12', 'Oro'),
(1219, 'Tlaltenco', 'L12', 'Oro'),
(1220, 'Tláhuac', 'L12', 'Oro'),
(1301, 'Pantitlán', 'LA', 'Morado'),
(1302, 'Agrícola Oriental', 'LA', 'Morado'),
(1303, 'Canal de San Juan', 'LA', 'Morado'),
(1304, 'Tepalcates', 'LA', 'Morado'),
(1305, 'Guelatao', 'LA', 'Morado'),
(1306, 'Peñón Viejo', 'LA', 'Morado'),
(1307, 'Acatitla', 'LA', 'Morado'),
(1308, 'Santa Marta', 'LA', 'Morado'),
(1309, 'Los Reyes', 'LA', 'Morado'),
(1310, 'La Paz', 'LA', 'Morado'),
(1401, 'Buenavista', 'LB', 'Verde y Gris'),
(1402, 'Guerrero', 'LB', 'Verde y Gris'),
(1403, 'Garibaldi', 'LB', 'Verde y Gris'),
(1404, 'Lagunilla', 'LB', 'Verde y Gris'),
(1405, 'Tepito', 'LB', 'Verde y Gris'),
(1406, 'Morelos', 'LB', 'Verde y Gris'),
(1407, 'San Lázaro', 'LB', 'Verde y Gris'),
(1408, 'Ricardo Flores Magón', 'LB', 'Verde y Gris'),
(1409, 'Romero Rubio', 'LB', 'Verde y Gris'),
(1410, 'Oceanía', 'LB', 'Verde y Gris'),
(1411, 'Deportivo Oceanía', 'LB', 'Verde y Gris'),
(1412, 'Bosque de Aragón', 'LB', 'Verde y Gris'),
(1413, 'Villa de Aragón', 'LB', 'Verde y Gris'),
(1414, 'Nezahualcóyotl', 'LB', 'Verde y Gris'),
(1415, 'Impulsora', 'LB', 'Verde y Gris'),
(1416, 'Río de los Remedios', 'LB', 'Verde y Gris'),
(1417, 'Múzquiz', 'LB', 'Verde y Gris'),
(1418, 'Ecatepec', 'LB', 'Verde y Gris'),
(1419, 'Olímpica', 'LB', 'Verde y Gris'),
(1420, 'Plaza Aragón', 'LB', 'Verde y Gris'),
(1421, 'Ciudad Azteca', 'LB', 'Verde y Gris');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota`
--

CREATE TABLE `mascota` (
  `idMascota` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fechaIngreso` date NOT NULL,
  `estadoAdopcion` enum('Disponible','Adoptado','En proceso','No Disponible') NOT NULL,
  `idEstacionEncontrado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`idMascota`, `nombre`, `fechaIngreso`, `estadoAdopcion`, `idEstacionEncontrado`) VALUES
(1, 'Panchito', '2025-04-23', 'Disponible', 1301),
(2, 'Tacubaya', '2025-04-23', 'Disponible', 710),
(3, 'Mixco', '2025-04-23', 'Adoptado', 1201),
(4, 'Chapulín', '2025-04-23', 'Disponible', 104),
(5, 'Aragón', '2025-04-23', 'Disponible', 509),
(6, 'Candy', '2025-04-23', 'Adoptado', 407),
(7, 'Balderas', '2025-04-23', 'Disponible', 108),
(8, 'Tasquita', '2025-04-23', 'No Disponible', 220),
(9, 'Zarago', '2025-04-23', 'Disponible', 119),
(10, 'Rosita', '2025-04-23', 'Disponible', 701),
(11, 'Vicky', '2025-04-23', 'No Disponible', 808),
(12, 'Luna', '2025-04-23', 'Disponible', 608),
(13, 'Chabacano', '2025-04-23', 'Disponible', 216),
(14, 'Morel', '2025-04-23', 'Disponible', 1406),
(15, 'Güera', '2025-04-23', 'En proceso', 1305),
(16, 'Pino', '2025-04-23', 'Disponible', 214),
(17, 'Ocean', '2025-04-23', 'Adoptado', 510),
(18, 'Hidalgo', '2025-04-23', 'Disponible', 210),
(19, 'Tlatel', '2025-04-23', 'Disponible', 305),
(20, 'Xolito', '2025-04-23', 'Disponible', 218);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `raza`
--

CREATE TABLE `raza` (
  `idRaza` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `idEspecie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `raza`
--

INSERT INTO `raza` (`idRaza`, `nombre`, `idEspecie`) VALUES
(1, 'Mestizo', 1),
(2, 'West Highland', 1),
(3, 'Pastor Alemán', 1),
(4, 'Chihuahua', 1),
(5, 'Boxer', 1),
(6, 'Maltés', 1),
(7, 'Pug', 1),
(8, 'Cocker Spaniel', 1),
(9, 'Dálmata', 1),
(10, 'Husky', 1),
(11, 'Beagle', 1),
(12, 'Golden Retriever', 1),
(13, 'Bulldog Francés', 1),
(14, 'Schnauzer', 1),
(15, 'Doberman', 1),
(16, 'Caniche', 1),
(17, 'Xoloitzcuintle', 1),
(18, 'Criollo', 2),
(19, 'Siamés', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportante`
--

CREATE TABLE `reportante` (
  `idReportante` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reportante`
--

INSERT INTO `reportante` (`idReportante`, `nombre`, `correo`) VALUES
(1, 'Roberto Jiménez', 'roberto.j@correo.com'),
(2, 'Lucía Mendoza', 'lucia.m@mail.com'),
(3, 'Gerardo Ruiz', 'gerardo@gmail.com'),
(4, 'Estación Pantitlán', 'atencion@metro.cdmx'),
(5, 'María del Carmen', 'maricarm@correo.com'),
(6, 'Luis Miguel', 'sol_de_Mexico@gmail.com'),
(7, 'Frida Khalo', 'frida.khalo@gmail.com'),
(8, 'Vox', 'veez@hellmail.com'),
(9, 'Angel', 'angel@gmail.com'),
(10, 'hola', 'hola@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `idReporte` int(11) NOT NULL,
  `idReportante` int(11) DEFAULT NULL,
  `idMascota` int(11) DEFAULT NULL,
  `idEstacionRep` int(11) DEFAULT NULL,
  `estadoReporte` enum('Pendiente','En proceso','Localizada','Descartado') NOT NULL DEFAULT 'Pendiente',
  `fechaReporte` datetime NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reporte`
--

INSERT INTO `reporte` (`idReporte`, `idReportante`, `idMascota`, `idEstacionRep`, `estadoReporte`, `fechaReporte`, `descripcion`) VALUES
(1, 1, 2, 710, 'Localizada', '2024-03-10 00:00:00', 'Gata siamesa con collar azul, asustada cerca de torniquetes'),
(2, 2, NULL, 214, 'En proceso', '2024-04-15 00:00:00', 'Perro mestizo café con manchas blancas, buscando comida en andén'),
(3, 3, 4, 104, 'Localizada', '2024-02-28 00:00:00', 'Perro atrapado en vias'),
(4, 4, NULL, 120, 'En proceso', '2024-04-20 00:00:00', '3 cachorros mestizos en zona de taquillas'),
(5, 5, 6, 407, 'Localizada', '2024-01-05 00:00:00', 'Chihuahua con pata lastimada, resguardado en oficinas'),
(6, 6, 14, 1406, 'Descartado', '2024-12-09 00:00:00', 'Confundió una estatua con perro dorado - falso positivo'),
(7, 7, NULL, 504, 'En proceso', '2025-04-25 23:45:03', 'Una gata con sus crías merodeando por la parte superior de los andenes.'),
(8, 8, NULL, 513, 'En proceso', '2025-04-28 23:03:21', 'Perrito en vías'),
(9, 9, NULL, 120, 'En proceso', '2025-04-28 23:05:40', 'Perrito en vías'),
(10, 10, NULL, 1410, 'En proceso', '2025-04-28 23:24:26', 'Gato atrapado en una cañería');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `idSolicitud` int(11) NOT NULL,
  `idMascota` int(11) DEFAULT NULL,
  `idAdoptante` int(11) DEFAULT NULL,
  `fechaSolicitud` date NOT NULL,
  `estadoAdopcion` enum('En proceso','Pendiente','Aprobada','Rechazada') DEFAULT 'Pendiente',
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
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `adoptante`
--
ALTER TABLE `adoptante`
  ADD PRIMARY KEY (`idAdoptante`);

--
-- Indices de la tabla `detallesmascota`
--
ALTER TABLE `detallesmascota`
  ADD PRIMARY KEY (`idMascota`),
  ADD KEY `detallesmascota_ibfk_2` (`idRaza`);

--
-- Indices de la tabla `donacion`
--
ALTER TABLE `donacion`
  ADD PRIMARY KEY (`idDonacion`),
  ADD KEY `donacion_ibfk_1` (`idDonante`);

--
-- Indices de la tabla `donacionvisual`
--
ALTER TABLE `donacionvisual`
  ADD KEY `donacionvisual_ibfk_1` (`idUser`);

--
-- Indices de la tabla `donante`
--
ALTER TABLE `donante`
  ADD PRIMARY KEY (`idDonante`);

--
-- Indices de la tabla `especie`
--
ALTER TABLE `especie`
  ADD PRIMARY KEY (`idEspecie`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `estaciones`
--
ALTER TABLE `estaciones`
  ADD PRIMARY KEY (`idEstacion`),
  ADD UNIQUE KEY `nombre` (`nombre`,`linea`);

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`idMascota`),
  ADD KEY `fk_mascota_estacion` (`idEstacionEncontrado`);

--
-- Indices de la tabla `raza`
--
ALTER TABLE `raza`
  ADD PRIMARY KEY (`idRaza`),
  ADD KEY `raza_ibfk_1` (`idEspecie`);

--
-- Indices de la tabla `reportante`
--
ALTER TABLE `reportante`
  ADD PRIMARY KEY (`idReportante`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`idReporte`),
  ADD KEY `fk_mascota_reporte` (`idMascota`),
  ADD KEY `fk_reporte_estacion` (`idEstacionRep`),
  ADD KEY `fk_reportante` (`idReportante`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`idSolicitud`),
  ADD KEY `idMascota` (`idMascota`),
  ADD KEY `idAdoptante` (`idAdoptante`);

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
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- AUTO_INCREMENT de la tabla `donante`
--
ALTER TABLE `donante`
  MODIFY `idDonante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `especie`
--
ALTER TABLE `especie`
  MODIFY `idEspecie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estaciones`
--
ALTER TABLE `estaciones`
  MODIFY `idEstacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1422;

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `idMascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `raza`
--
ALTER TABLE `raza`
  MODIFY `idRaza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `reportante`
--
ALTER TABLE `reportante`
  MODIFY `idReportante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  ADD CONSTRAINT `detallesmascota_ibfk_1` FOREIGN KEY (`idMascota`) REFERENCES `mascota` (`idMascota`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detallesmascota_ibfk_2` FOREIGN KEY (`idRaza`) REFERENCES `raza` (`idRaza`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `donacion`
--
ALTER TABLE `donacion`
  ADD CONSTRAINT `donacion_ibfk_1` FOREIGN KEY (`idDonante`) REFERENCES `donante` (`idDonante`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `donacionvisual`
--
ALTER TABLE `donacionvisual`
  ADD CONSTRAINT `donacionvisual_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `donacion` (`idDonacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD CONSTRAINT `fk_mascota_estacion` FOREIGN KEY (`idEstacionEncontrado`) REFERENCES `estaciones` (`idEstacion`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `raza`
--
ALTER TABLE `raza`
  ADD CONSTRAINT `raza_ibfk_1` FOREIGN KEY (`idEspecie`) REFERENCES `especie` (`idEspecie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `fk_mascota_reporte` FOREIGN KEY (`idMascota`) REFERENCES `mascota` (`idMascota`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reportante` FOREIGN KEY (`idReportante`) REFERENCES `reportante` (`idReportante`),
  ADD CONSTRAINT `fk_reporte_estacion` FOREIGN KEY (`idEstacionRep`) REFERENCES `estaciones` (`idEstacion`) ON DELETE SET NULL;

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `solicitud_ibfk_1` FOREIGN KEY (`idMascota`) REFERENCES `mascota` (`idMascota`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_ibfk_2` FOREIGN KEY (`idAdoptante`) REFERENCES `adoptante` (`idAdoptante`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visitadom`
--
ALTER TABLE `visitadom`
  ADD CONSTRAINT `visitadom_ibfk_1` FOREIGN KEY (`idSolicitud`) REFERENCES `solicitud` (`idSolicitud`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `actualizar_estado_donacion` ON SCHEDULE EVERY 1 DAY STARTS '2025-04-28 19:57:25' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE donacion
  SET estadoDonacion = 'Cancelado'
  WHERE fechaDonacion <= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    AND estadoDonacion = 'Pendiente'$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
