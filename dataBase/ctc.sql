-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2025 a las 08:04:52
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
  `contraseña` varchar(100) NOT NULL,
  `ultimaConn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `usuario`, `contraseña`, `ultimaConn`) VALUES
(1, 'admin', '12345678', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adoptante`
--

CREATE TABLE `adoptante` (
  `idAdoptante` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesmascota`
--

CREATE TABLE `detallesmascota` (
  `idMascota` int(11) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `sexo` enum('Macho','Hembra') DEFAULT NULL,
  `idRaza` int(11) DEFAULT NULL,
  `tamaño` enum('Pequeño','Mediano','Grande') DEFAULT NULL,
  `caractFisica` varchar(255) DEFAULT NULL,
  `estadoSalud` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donante`
--

CREATE TABLE `donante` (
  `idDonante` int(11) NOT NULL,
  `nombreDonante` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `estadoAdopcion` enum('Disponible','Adoptado','No Disponible') NOT NULL,
  `adoptadoPor` int(11) DEFAULT NULL,
  `idEstacionEncontrado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(19, 'Siamés', 2),
(20, 'Bombay', 2),
(21, 'Beauceron', 1),
(22, 'Abisinio', 2),
(23, 'Pelo corto americano', 2),
(24, 'Toyger', 2),
(25, 'Dachshund', 1),
(26, 'Labrador', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportante`
--

CREATE TABLE `reportante` (
  `idReportante` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `idReporte` int(11) NOT NULL,
  `idReportante` int(11) DEFAULT NULL,
  `idEstacionRep` int(11) DEFAULT NULL,
  `estadoReporte` enum('Pendiente','En proceso','Localizada','Descartado') NOT NULL DEFAULT 'Pendiente',
  `fechaReporte` datetime NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportemascota`
--

CREATE TABLE `reportemascota` (
  `idReporte` int(11) NOT NULL,
  `idMascota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `idSolicitud` int(11) NOT NULL,
  `idMascota` int(11) NOT NULL,
  `idAdoptante` int(11) NOT NULL,
  `fechaSolicitud` date NOT NULL DEFAULT current_timestamp(),
  `estadoAdopcion` enum('En proceso','Pendiente','Aprobada','Rechazada') NOT NULL DEFAULT 'Pendiente',
  `comentarios` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD KEY `fk_mascota_estacion` (`idEstacionEncontrado`),
  ADD KEY `adoptadoPor` (`adoptadoPor`);

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
  ADD KEY `fk_reporte_estacion` (`idEstacionRep`),
  ADD KEY `fk_reportante` (`idReportante`);

--
-- Indices de la tabla `reportemascota`
--
ALTER TABLE `reportemascota`
  ADD PRIMARY KEY (`idReporte`,`idMascota`),
  ADD KEY `idMascota` (`idMascota`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `adoptante`
--
ALTER TABLE `adoptante`
  MODIFY `idAdoptante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `donacion`
--
ALTER TABLE `donacion`
  MODIFY `idDonacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `donante`
--
ALTER TABLE `donante`
  MODIFY `idDonante` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `idMascota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `raza`
--
ALTER TABLE `raza`
  MODIFY `idRaza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `reportante`
--
ALTER TABLE `reportante`
  MODIFY `idReportante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `fk_mascota_estacion` FOREIGN KEY (`idEstacionEncontrado`) REFERENCES `estaciones` (`idEstacion`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `mascota_ibfk_1` FOREIGN KEY (`adoptadoPor`) REFERENCES `solicitud` (`idSolicitud`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `raza`
--
ALTER TABLE `raza`
  ADD CONSTRAINT `raza_ibfk_1` FOREIGN KEY (`idEspecie`) REFERENCES `especie` (`idEspecie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `fk_reportante` FOREIGN KEY (`idReportante`) REFERENCES `reportante` (`idReportante`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reporte_estacion` FOREIGN KEY (`idEstacionRep`) REFERENCES `estaciones` (`idEstacion`) ON DELETE SET NULL;

--
-- Filtros para la tabla `reportemascota`
--
ALTER TABLE `reportemascota`
  ADD CONSTRAINT `reportemascota_ibfk_1` FOREIGN KEY (`idReporte`) REFERENCES `reporte` (`idReporte`) ON DELETE CASCADE,
  ADD CONSTRAINT `reportemascota_ibfk_2` FOREIGN KEY (`idMascota`) REFERENCES `mascota` (`idMascota`);

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
