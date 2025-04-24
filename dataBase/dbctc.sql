-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-04-2025 a las 02:27:40
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
  `documentos` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesmascota`
--

CREATE TABLE `detallesmascota` (
  `idDetalle` int(11) NOT NULL,
  `idMascota` int(11) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `sexo` enum('Macho','Hembra') DEFAULT NULL,
  `raza` varchar(100) DEFAULT NULL,
  `tamaño` enum('Pequeño','Mediano','Grande') DEFAULT NULL,
  `caractFisica` varchar(255) DEFAULT NULL,
  `estadoSalud` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fotos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donacion`
--

CREATE TABLE `donacion` (
  `idDonacion` int(11) NOT NULL,
  `nombreDonante` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `estadoDonacion` enum('Pendiente','Finalizada') NOT NULL,
  `tipo` enum('Monetaria','En especie','Voluntariado') NOT NULL,
  `fecha` date NOT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `fechaReporte` date NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indices de la tabla `adoptante`
--
ALTER TABLE `adoptante`
  ADD PRIMARY KEY (`idAdoptante`);

--
-- Indices de la tabla `detallesmascota`
--
ALTER TABLE `detallesmascota`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `idMascota` (`idMascota`);

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
  MODIFY `idAdoptante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `detallesmascota`
--
ALTER TABLE `detallesmascota`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `donacion`
--
ALTER TABLE `donacion`
  MODIFY `idDonacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `idMascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
