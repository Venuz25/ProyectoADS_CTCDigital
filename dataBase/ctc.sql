-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2025 a las 08:52:10
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
(1, 'admin', '12345678', '2025-06-03 07:04:30'),
(2, 'DLeon', '13462', NULL),
(3, 'venuz', 'aagb2574', '2025-06-02 18:47:48'),
(4, 'Jossi', 'A12345', NULL);

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

--
-- Volcado de datos para la tabla `adoptante`
--

INSERT INTO `adoptante` (`idAdoptante`, `nombre`, `telefono`, `correo`) VALUES
(1, 'Alejandro Ramirez Martinez ', '5571094004', 'alejandrorammartinez@gmail.com'),
(2, 'Areli Guevara', '5538762357', 'areli_ale25@outlook.com');

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

--
-- Volcado de datos para la tabla `detallesmascota`
--

INSERT INTO `detallesmascota` (`idMascota`, `edad`, `sexo`, `idRaza`, `tamaño`, `caractFisica`, `estadoSalud`, `descripcion`) VALUES
(1, 1, 'Macho', 3, 'Grande', 'Pastor alemán adulto de aproximadamente 3 años, tiene un pelaje corto de color beige con una distintiva máscara negra en el rostro, orejas erguidas, ojos ámbar expresivos y un cuerpo fuerte de tamaño mediano a grande. ', 'Salud óptima, ha pasado todos sus chequeos veterinarios recientes. Está vacunado, desparasitado y esterilizado. Cuenta con un peso ideal para su edad y raza, sin antecedentes de enfermedades o lesiones. Perfecto para una familia activa que pueda brindarle', 'Es un perro leal, cariñoso y protector con su familia. Muy inteligente y fácil de entrenar, disfruta de actividades al aire libre y el ejercicio regular. Aunque es sociable, puede ser reservado con extraños, por lo que necesita un hogar con paciencia para'),
(2, 9, 'Hembra', 1, 'Pequeño', 'Perrita de talla mediana, con pelaje corto color miel claro. Sus ojos son dulces y expresivos, y su cuerpo muestra una constitución fuerte pero tranquila. Tiene una mirada serena que transmite confianza y ternura.', 'Se encuentra en buen estado de salud para su edad. Ya fue revisada por el veterinario: está vacunada, desparasitada y esterilizada. No presenta enfermedades crónicas ni problemas de movilidad. Requiere chequeos regulares, como cualquier perrita senior, pe', 'Es una perrita tranquila, cariñosa y muy noble. Le encanta la compañía humana, disfruta de los paseos suaves y de las siestas al sol. Se lleva bien con otros perros y tiene un carácter muy paciente. Ideal para un hogar que busque una compañera leal y sere'),
(3, 3, 'Macho', 10, 'Grande', 'Husky de 3 años, de tamaño mediano, atlético y con un pelaje espeso en tonos blanco, gris obscuro y negros. Tiene ojos azules penetrantes y una expresión vivaz. Su cola es esponjosa y se enrosca ligeramente sobre su lomo, y sus orejas erguidas reflejan su', 'En excelente estado de salud tras su revisión médica. Está vacunado, desparasitado y esterilizado. Tiene un peso saludable y buena condición física, sin signos de enfermedades o problemas articulares. Listo para integrarse a un entorno activo y responsabl', 'Es un perro enérgico, juguetón y muy inteligente. Tiene un espíritu independiente, pero también disfruta de la compañía humana y las actividades en grupo. Requiere ejercicio diario y estimulación mental, por lo que es ideal para personas activas o con exp'),
(4, 2, 'Macho', 23, 'Mediano', 'Gato cariñoso, no es muy juguetón, pero convive con perros y otros gatos sin ningún problema. ', 'Se encuentra esterilizado y con todas sus vacunas, No cuenta con ninguna enfermedad grave, solo seria regularizar su comida ya que cuenta con un poco de sobre peso. ', 'Es un gato muy amigable y le gusta convivir incluso con niños, no es agresivo.'),
(5, 5, 'Hembra', 10, 'Mediano', 'Husky de 5 años, de tamaño mediano, atlético y juguetón, color de pelaje blanco y negros. Tiene ojos café. las orejas las tiene erguidas. ', 'EN excelente estado de salud cuenta con todas sus vacunas, al llegar al CTC fue revisado y se le realizar diversos estudios y no cuenta con ninguna enfermedad. ', 'Es un perro bastante cariñoso, le encanta convivir con otros perros, es bastante juguetón, pero no es desastroso. '),
(6, 9, 'Hembra', 14, 'Pequeño', 'Perrita schnauzer de tamaño pequeño, con pelaje gris y blanco ya entrecano, propio de su edad. Conserva el característico corte de cejas y barba de la raza, lo que le da una expresión sabia y encantadora. Sus movimientos son más lentos, pero camina con di', 'A pesar de su avanzada edad, se encuentra estable y bajo control veterinario. Está vacunada, desparasitada y esterilizada. Requiere cuidados especiales propios de una perrita senior, como alimentación blanda, paseos cortos y revisiones periódicas. Actualm', 'Es una perrita extremadamente dulce, tranquila y afectuosa. Disfruta de la calma, las caricias y la compañía humana. Ideal para un hogar sereno donde pueda pasar sus años dorados rodeada de cariño. Su presencia inspira ternura y agradecimiento, y es una c'),
(7, 5, 'Hembra', 27, 'Mediano', 'Gatita tabby de 5 años con un hermoso pelaje gris atigrado y ojos verdes grandes y expresivos. Tiene una contextura robusta —¡con un encanto redondito!— que la hace aún más abrazable. Su andar es elegante y pausado, y su mirada transmite seguridad y curio', 'Se encuentra en buen estado general tras su revisión veterinaria. Está esterilizada, vacunada y desparasitada. Aunque tiene un poco de sobrepeso, no presenta problemas graves de salud. Actualmente se encuentra en un plan de alimentación balanceada y requi', 'Es una gata tranquila, observadora y muy consentida. Disfruta de las siestas en lugares soleados, las caricias en la cabeza y mirar el mundo desde la ventana. Tiene una personalidad independiente, pero se encariña rápidamente con quienes respetan su espac'),
(8, 3, 'Macho', 27, 'Mediano', 'Gato tabby de 3 años con un elegante pelaje café atigrado combinado con blanco en el pecho, patas y rostro. Tiene ojos color miel que brillan con curiosidad y un cuerpo ágil y bien proporcionado. Su apariencia es tan encantadora como su carácter: una mezc', 'Goza de excelente salud. Ya fue vacunado, desparasitado y esterilizado. Tiene un peso ideal y una condición física activa. No presenta enfermedades ni necesidades médicas especiales. ', 'Gato malvado e independiente, le gusta estar con otros gatos pero no es muy a fin a la compañía humana, sin embargo se lleva muy bien con otros animales, sobre todo perros.'),
(9, 1, 'Macho', 27, 'Pequeño', 'Joven gato tabby de pelaje café atigrado con manchas blancas en el pecho, patas y hocico. Sus ojos color miel son grandes y expresivos, reflejando toda su energía juvenil. De cuerpo delgado y ágil, está en pleno crecimiento y desarrollo. Tiene un aspecto ', 'Se encuentra en excelente estado de salud. Ya está vacunado, desparasitado y esterilizado. Su peso es adecuado para su edad y está lleno de vitalidad. No presenta ningún problema médico y está listo para encontrar un hogar donde pueda seguir creciendo fel', 'Es un gatito muy activo, juguetón y curioso. Le encanta explorar, corretear y entretenerse con cualquier cosa que se mueva. A pesar de su energía, también es cariñoso y busca atención cuando quiere descansar. Ideal para familias dinámicas o personas que d'),
(10, 3, 'Hembra', 28, 'Mediano', 'Gata calicó de 3 años con un llamativo pelaje tricolor: manchas en tonos blanco, negro y naranja distribuidas de forma única. De complexión mediana y bien definida, con mirada intensa y ojos color ámbar que reflejan carácter y determinación. Su postura si', 'Se encuentra en excelente estado de salud. Ya está esterilizada, vacunada y desparasitada. Tiene buen apetito, energía y no presenta condiciones médicas actuales. Lista para encontrar un hogar que respete su fuerte personalidad.', 'Es una gata con carácter: independiente, territorial y un poco peleonera con las personas, pero no con otros animales. Le gusta marcar su espacio y no tolera invasiones a su reino. Ideal para alguien con experiencia felina que busque una compañera con act'),
(11, 4, 'Macho', 27, 'Mediano', 'Gato tabby de 4 años con un suave pelaje café claro y finas líneas atigradas. Sus ojos, entre verdes y color miel, tienen una mirada tranquila y soñadora. De cuerpo mediano y aspecto relajado, suele estar estirado en su rincón favorito como todo un expert', 'Se encuentra en buen estado de salud tras su revisión médica. Está vacunado, desparasitado y esterilizado. Su peso es adecuado para su estilo de vida relajado, y no presenta problemas de salud. Solo necesita una rutina tranquila y un lugar cómodo donde de', 'Es un gato calmado, flojo y encantador. Prefiere dormir largas siestas, observar el mundo desde una ventana y recibir caricias sin moverse mucho. Ideal para hogares tranquilos, donde se aprecie la compañía de un gato sereno que adora el descanso y la buen'),
(12, 6, 'Hembra', 1, 'Mediano', 'Perro mestizo de talla mediana, con un pelaje negro espeso y brillante, y una carita encantadora con algunas canas que le dan un aire sabio y tierno. Sus orejas son semierguidas y su mirada transmite una mezcla de serenidad y curiosidad. Tiene una estruct', 'Tras su revisión médica, se encuentra estable y en buenas condiciones generales. Ya fue desparasitado, vacunado y esterilizado. Su pelaje requiere cepillado regular, pero no presenta condiciones especiales de cuidado.', 'Tiene un carácter equilibrado, ideal para hogares que buscan un compañero sereno y cariñoso. Se muestra atento y respetuoso con las personas, y parece llevarse bien con otros perros. Es un lomito con historia, que ahora busca escribir un nuevo capítulo ll'),
(13, 7, 'Macho', 1, 'Mediano', 'Perro mestizo de complexión delgada y orejas grandes y expresivas. Tiene un pelaje corto de color oscuro con manchas blancas en el pecho y la pancita. Sus patas largas y figura atlética contrastan con su pose relajada: le encanta estar panza arriba disfru', 'Ya fue revisado por el equipo veterinario: se encuentra en buen estado general, sin signos de enfermedad. Ha sido vacunado, desparasitado y esterilizado. Su piel muestra algunas zonas despobladas, posiblemente por exposición previa, pero está en proceso d', 'Relajado, juguetón y muy confiado. Disfruta tirarse al sol, convivir con personas y dejarse consentir. Es ideal para familias o personas que buscan un compañero noble, divertido y con una vibra muy chill. Sabe adaptarse a distintos entornos y transmite un'),
(14, 4, 'Macho', 1, 'Mediano', 'Perro mestizo de tamaño mediano, con pelaje tricolor: blanco, negro y café. Su cara es particularmente única, con un patrón simétrico en tonos blanco y canela. Tiene una oreja erguida y otra semicaída, lo que le da un aire curioso y amigable. Sus ojos gra', 'Revisado por el equipo veterinario. Se encuentra estable y sin signos de enfermedades graves. Tiene algunas marcas en el lomo por exposición o antiguos roces, pero está bajo tratamiento dermatológico preventivo. Vacunado, desparasitado y esterilizado.', 'Observador, tranquilo y muy receptivo con las personas. Suele mantener la calma incluso en entornos ruidosos como calles concurridas. Se muestra atento, pero sin ansiedad. Es el tipo de perro que te acompaña a todos lados y siempre está pendiente de ti. P'),
(15, 7, 'Hembra', 29, 'Grande', 'Esta perrita es de complexión atlética y fuerte, típica del cruce entre un Bóxer y un Labrador. Tiene un pelaje corto y brillante de color negro intenso, con posibles manchas blancas en el pecho o las patas. Sus orejas caen suavemente a los lados y sus oj', 'Actualmente se encuentra en buen estado de salud para su edad. A sus 7 años ya es una perrita adulta mayor, por lo que es importante monitorear su dieta, articulaciones y niveles de energía. Se recomienda realizar chequeos veterinarios regulares para prev', 'Es una perrita leal, tranquila y muy cariñosa. Disfruta de la compañía humana y suele formar lazos muy fuertes con su familia. Es obediente, inteligente y responde bien al entrenamiento. Aunque ya no es tan inquieta como un cachorro, aún disfruta de camin'),
(16, 3, 'Macho', 30, 'Grande', 'Pitbull tiene un cuerpo musculoso y bien definido, con una complexión fuerte pero armónica. Su pelaje es corto, brillante y de un tono café oscuro profundo, resaltado por encantadoras manchas blancas que pueden encontrarse en su pecho, hocico o patitas. ', 'No presenta condiciones médicas conocidas, aunque como todo Pitbull, es recomendable mantener una dieta balanceada y monitorear su piel, ya que esta raza puede ser propensa a alergias dérmicas.', 'Tiene un gran corazón y adora estar cerca de las personas. Le encanta salir a caminar, correr y jugar con pelotas o cuerdas. Es sociable, aunque con otros animales puede requerir una introducción adecuada y supervisada. '),
(17, 7, 'Macho', 31, 'Mediano', 'Acato es un perro de tamaño mediano, bien proporcionado, con una apariencia rústica y resistente. Su pelaje es abundante, típico del Pastor Vasco, con una textura que puede variar entre ondulada o lisa.', ' A sus 7 años entra en la etapa adulta mayor, por lo que se recomienda mantener una dieta equilibrada, ejercicio regular y chequeos veterinarios periódicos. No presenta enfermedades conocidas y su condición física es buena para su edad. Se recomienda pres', 'Acato es un perro leal, inteligente y tranquilo. Tiene un fuerte instinto de trabajo y protección, propio de su raza, pero también disfruta de momentos de calma y compañía. Es obediente, receptivo y se adapta bien a la vida familiar, siempre y cuando reci'),
(18, 5, 'Macho', 30, 'Grande', 'Bos es un imponente y hermoso Pitbull de color negro intenso, con un pelaje corto, brillante y bien cuidado. Su complexión es musculosa y fuerte, pero armoniosa, con una postura segura que transmite poder y elegancia. ', 'Bos goza de buena salud general. Con 5 años se encuentra en la plenitud de su adultez: activo, fuerte y lleno de energía. Está vacunado, desparasitado y en condición física estable. No presenta enfermedades conocidas, aunque como todo perro musculoso y ac', 'Bos es un perro leal, valiente y extremadamente afectuoso con quienes se ganan su confianza. Aunque su apariencia puede intimidar, es un verdadero tierno por dentro: busca cariño, atención y tiempo de calidad con las personas. Es enérgico y juguetón, le e'),
(19, 4, 'Macho', 32, 'Mediano', 'Cano es un perro de tamaño mediano, compacto y muy musculoso, con una postura alerta y segura. Tiene un pelaje corto, denso y resistente al clima, con un patrón moteado rojo, salpicado con manchas más oscuras y a veces blancas.', 'Cano se encuentra en excelente estado de salud. Con 4 años está en su mejor etapa adulta, activo y con gran energía. Está vacunado, desparasitado y no presenta condiciones médicas conocidas. Como raza trabajadora, es importante que tenga actividad física ', 'Cano es un perro increíblemente inteligente, leal y trabajador. Tiene un espíritu incansable y disfruta de los retos, ya sea juegos de agilidad, entrenamiento o acompañar a humanos activos. Es muy obediente si se le da estructura, y aprende comandos rápid'),
(20, 5, 'Hembra', 33, 'Mediano', 'Cati es una perrita de tamaño mediano, con un cuerpo ágil y atlético, ideal para el movimiento constante. Su pelaje es de color café, espeso y de longitud media, con una textura suave y ligeramente ondulada. ', 'Cati está en buen estado de salud. Está desparasitada, vacunada y goza de una condición física excelente. Como es propio de su raza, necesita actividad regular para mantenerse equilibrada, tanto física como mentalmente. Se recomienda cepillarla con frecue', 'Cati es una perrita extremadamente inteligente, cariñosa y leal. Tiene un fuerte instinto de pastoreo, por lo que le gusta “organizar” a quienes la rodean y mantenerse siempre atenta a lo que ocurre. Es activa, muy energética y adora aprender trucos, juga'),
(21, 4, 'Macho', 30, 'Grande', 'Chabote es un impresionante Pitbull de tamaño mediano, con un cuerpo fuerte, bien definido y musculoso. Su pelaje es corto, suave y de color café brillante, contrastado por una mancha blanca que cubre parte de su rostro y hocico, dándole una expresión úni', 'Se encuentra en excelente estado de salud. A sus 4 años está lleno de energía, en la plenitud de su vida adulta. Está vacunado, desparasitado y tiene buen apetito y condición física. Como todo Pitbull, requiere ejercicio regular para mantenerse equilibrad', 'Noble, sociable y muy cariñoso. Tiene un carácter equilibrado: es juguetón y activo, pero también sabe disfrutar de momentos tranquilos en compañía de quienes quiere. Le encanta recibir caricias, seguir a sus humanos y salir a caminar. Es obediente y apre'),
(22, 4, 'Macho', 34, 'Grande', 'Este hermoso Labrador tiene un cuerpo fuerte, atlético y proporcionado. Su pelaje es corto, denso y de color negro brillante, con canas notables en el hocico que le dan un aire sabio y entrañable. Tiene ojos grandes y cálidos, de color marrón, que refleja', 'Se encuentra en buen estado de salud general. A sus 4 años, es un perro adulto joven, con mucha energía pero ya con un carácter más maduro. Las canas en su hocico no son señal de vejez, sino una particularidad natural en algunos labradores. Está vacunado,', 'Es un perro alegre, sociable y muy amoroso. Tiene el típico carácter del Labrador: siempre dispuesto a jugar, aprender y compartir tiempo con las personas. Es obediente, fácil de entrenar y le encanta agradar. Se lleva muy bien con niños, adultos y otros '),
(23, 9, 'Macho', 34, 'Grande', 'Este noble Labrador dorado tiene un porte majestuoso y sereno. Su cuerpo es robusto y fuerte, con un pelaje espeso y brillante de color dorado claro que aún conserva su suavidad a pesar de la edad. Su hocico muestra algunas canas, lo que le da un aire sab', 'A sus 9 años, este Labrador se encuentra en buen estado de salud general para un perro senior. Está vacunado, desparasitado y bajo chequeo veterinario regular. Puede presentar un ritmo más pausado y ligeros signos de desgaste articular, comunes en la raza', 'Este Labrador dorado es un compañero ideal: tranquilo, afectuoso y muy sabio. Tiene un temperamento equilibrado, tolerante y paciente, lo que lo hace perfecto para convivir con niños, adultos mayores u otros animales. Le encanta descansar cerca de sus hum'),
(24, 3, 'Macho', 35, 'Mediano', 'Este Black Mouth Cur tiene una apariencia atlética y poderosa. Su cuerpo es musculoso, de tamaño mediano a grande, ideal para actividades al aire libre. Su pelaje es corto, denso y de color marrón claro, con su característica marca negra alrededor del hoc', 'Con 3 años, este ejemplar se encuentra en la plenitud de su vida adulta. Está sano, vacunado, desparasitado y en excelente condición física. Es un perro fuerte, resistente y con alta tolerancia al ejercicio. Como cualquier perro activo, necesita chequeos ', 'Tiene un fuerte instinto protector y es muy apegado a su familia humana. Es ideal para personas con experiencia en perros activos o familias que disfruten de actividades al aire libre como caminatas, senderismo o juegos interactivos. '),
(25, 5, 'Macho', 36, 'Grande', 'Es un perro pequeño pero robusto, con un cuerpo compacto y musculoso. Su pelaje es corto, denso y ligeramente áspero y negro. Tiene orejas pequeñas y erguidas que le dan una expresión alerta y vivaz. Sus ojos son oscuros y expresivos, mostrando inteligenc', 'Con 5 años, está en su etapa adulta y mantiene una salud sólida. Está vacunado, desparasitado y cuenta con buena condición física. Es un perro activo que requiere ejercicio diario para mantenerse en forma y feliz. Se recomienda una alimentación balanceada', ' Tiene un instinto fuerte para la caza y la exploración, por lo que es curioso y siempre está alerta a su entorno. Es muy leal a su familia y puede ser protector, aunque también es juguetón y afectuoso con quienes conoce. Requiere un dueño que le proporci'),
(26, 5, 'Macho', 1, 'Grande', '', '', ''),
(27, 3, 'Macho', 37, 'Grande', 'Perro de talla grande y constitución atlética, con un pelaje corto, liso y brillante de tonalidades que van del trigo claro al rojizo. Destaca por una cresta dorsal única formada por una franja de pelo que crece en sentido contrario al resto del cuerpo, l', 'Se encuentra con una excelente salud y condición, esta vacunado y castrado, con buen pelaje así mismo es amigable y no muestra algún miedo por las personas.', 'Es un perrito tranquilo, leal y muy seguro de sí mismo. Aunque al principio puede parecer reservado, pronto muestra su lado cariñoso y protector con quienes confía. Disfruta mucho de los paseos al aire libre, donde puede explorar con calma, y también de l'),
(28, 2, 'Hembra', 38, 'Mediano', 'Perro de talla mediana a grande, con un cuerpo atlético, bien proporcionado y de porte ágil. Su pelaje es generalmente de longitud media, suave y denso, con una combinación de colores que puede incluir negro, blanco, marrón o crema, a menudo con patrones ', 'Esta en una excelente condición, tiene un pelaje brillante, es muy energética, esterilizada y muy cariñosa hacia las personas.', 'Es una perrita muy activa, juguetona y extremadamente inteligente. Siempre está atenta a todo lo que sucede a su alrededor y le encanta aprender cosas nuevas, especialmente si hay juegos o premios de por medio. Tiene un carácter cariñoso y sociable, se ll'),
(29, 5, 'Macho', 5, 'Grande', 'Perro de talla mediana a grande, de constitución fuerte, compacta y musculosa, con una presencia imponente pero armoniosa. Su pelaje es corto, brillante y bien pegado al cuerpo, comúnmente de color atigrado o leonado, con o sin manchas blancas. Su rostro ', 'Goza de una buena salud, esterilizado, se mantiene con gran energía, es obediente y tiene un buen pelaje', 'Es un perrito noble, enérgico y muy leal. A sus cinco años ha alcanzado un equilibrio perfecto entre vitalidad y madurez: disfruta del juego y de los paseos activos, pero también sabe relajarse y compartir momentos tranquilos en casa. Es muy cariñoso con '),
(30, 2, 'Macho', 1, 'Grande', 'Perro mestizo de talla mediana, con cuerpo proporcionado y musculoso. Su pelaje es corto, denso y brillante, de color negro con marcas fuego bien definidas en el rostro, pecho, patas y cejas, lo que le da una apariencia expresiva y llamativa. Tiene una ca', 'Tiene una muy buena salud, un poco tímido hacia las personas, tiene buen pelaje, esterilizado y esta en buenas condiciones para crecer muy saludable.', 'Es un perrito joven, curioso y muy amigable. A sus dos años está lleno de energía y ganas de jugar, pero también sabe comportarse con dulzura y atención cuando está en compañía. Le encanta estar cerca de las personas, recibir caricias y seguir a su humano'),
(31, 9, 'Macho', 34, 'Grande', 'Perro de talla mediana a grande, de constitución robusta, atlética y bien proporcionada. Su pelaje es corto, denso y resistente al agua, con una textura suave al tacto. Los colores más comunes son amarillo, negro o chocolate, uniformes y brillantes. Tiene', 'Tiene buena salud, es algo lento por la edad, esta esterilizado, tiene un buen pelaje asi como su vision sigue siendo buena', 'Es un perro adulto de 9 años, tranquilo y cariñoso. A esta edad, su energía es más moderada, disfrutando de momentos de descanso pero sin perder ese espíritu amigable que lo caracteriza. Es muy leal y afectuoso con su familia, mostrando paciencia y sabidu'),
(32, 3, 'Macho', 39, 'Mediano', 'Perro de talla pequeña a mediana, de constitución compacta y musculosa. Su pelaje es corto, liso y brillante, generalmente de color negro, marrón o una mezcla de ambos tonos. Tiene una cabeza proporcionada con un hocico firme y ojos expresivos, de tamaño ', 'Tiene una excelente salud, muy energético, esterilizado, tiene a olfatear y lamer demasiado.', 'Es un perro joven de 3 años, lleno de vitalidad y curiosidad. Muy activo y juguetón, le encanta explorar su entorno y mantenerse en movimiento. A pesar de su energía, es muy afectuoso y leal con su familia, mostrando una gran disposición para aprender y s'),
(33, 3, 'Hembra', 40, 'Mediano', 'Perro de talla mediana, de constitución ágil, musculosa y bien proporcionada. Su pelaje es de longitud media, denso y ligeramente ondulado, con una textura suave pero resistente. Los colores más comunes incluyen combinaciones de negro, blanco, rojo y merl', 'Cuenta con una gran salud, muy energética, esterilizada, de pelaje áspero, llega a ser brusca al jugar. ', 'Es una hembra de 3 años llena de energía y dedicación. Muy inteligente y trabajadora, destaca por su gran capacidad para concentrarse y aprender rápidamente. Es cariñosa y leal con su familia, aunque siempre alerta y atenta a su entorno. Disfruta tanto de'),
(34, 7, 'Hembra', 29, 'Grande', 'Perro de talla grande, de constitución musculosa, fuerte y compacta. Su pelaje es corto, liso y brillante, generalmente de color leonado, atigrado o con marcas blancas en pecho, patas y cara. Tiene una cabeza cuadrada y poderosa, con un hocico ancho y man', 'Cuenta con una excelente salud, a pesar de su edad se mantiene energética, cariñosa y esterilizada, sin problemas de vista.', 'Es una hembra de 7 años con un carácter equilibrado y afectuoso. Aunque ya no tiene la energía desenfrenada de su juventud, sigue siendo activa y juguetona, disfrutando de paseos y momentos de compañía. Es leal, protectora y muy cariñosa con su familia, m'),
(35, 9, 'Hembra', 35, 'Grande', 'Perro de talla mediana a grande, de constitución atlética, fuerte y bien equilibrada. Su pelaje es corto, denso y resistente, generalmente de color amarillo pálido, trigo o marrón claro, con la característica “máscara” negra en el hocico que le da su nomb', 'Cuenta con buena salud, es una perra de edad media algo tímida, esterilizada sin alguna condición en particular.', 'Es una hembra de 7 años, madura y equilibrada, con una naturaleza protectora y leal. A pesar de su edad, mantiene buena vitalidad y un gran instinto para el trabajo, siempre atenta a su entorno. Es afectuosa con su familia y demuestra una personalidad tra'),
(36, 3, 'Hembra', 1, 'Mediano', 'Pelaje corto de color negro con manchas beige en el rostro, pecho y patas. Su cuerpo es de tamaño mediano y estructura robusta. Presenta orejas erguidas, ojos ámbar de forma almendrada y hocico recto de longitud media. Su cola es de tamaño medio y está bi', 'Cuenta con un buen estado general de salud. Presenta peso adecuado para su tamaño, pelaje limpio y sin lesiones visibles en piel. Tiene buena dentadura, encías rosadas y ojos sin secreciones anormales. Su nivel de actividad es normal y responde bien a est', ''),
(37, 3, 'Macho', 1, 'Grande', 'Pelaje corto color canela, con una mancha blanca visible en el pecho. Su cuerpo es delgado, de extremidades cortas y musculatura marcada. Tiene orejas caídas, hocico ancho y trufa negra. Sus ojos son oscuros y redondeados, con expresión atenta. La cola es', 'Mantiene un peso estable y acorde a su complexión. Su pelaje es uniforme y limpio, sin señales de dermatitis o parásitos. Los ojos y oídos se observan libres de secreciones, y su movilidad es normal. No muestra signos visibles de enfermedad o dolor.\r\n', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donacion`
--

CREATE TABLE `donacion` (
  `idDonacion` int(11) NOT NULL,
  `idDonante` int(11) NOT NULL,
  `estadoDonacion` enum('Pendiente','Finalizada','Cancelado','En proceso') NOT NULL DEFAULT 'Pendiente',
  `tipo` enum('Monetaria','En especie','Voluntariado') NOT NULL,
  `fechaDonacion` date NOT NULL DEFAULT current_timestamp(),
  `fechaPrevistaDon` date NOT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `donacion`
--

INSERT INTO `donacion` (`idDonacion`, `idDonante`, `estadoDonacion`, `tipo`, `fechaDonacion`, `fechaPrevistaDon`, `monto`, `descripcion`) VALUES
(1, 1, 'Finalizada', 'Monetaria', '2025-05-17', '2025-05-25', 1500.00, 'Apoyo para alimentación y atención médica de perros rescatados'),
(2, 2, 'Pendiente', 'Monetaria', '2025-05-17', '2025-05-30', 1000.00, 'Comprar insumos para los animales del centro'),
(3, 3, 'Finalizada', 'Monetaria', '2025-05-17', '2025-06-22', 2000.00, 'Financiar la esterilización de perros rescatados.'),
(4, 4, 'Finalizada', 'Monetaria', '2025-05-17', '2025-06-05', 10000.00, 'Apoyo general al albergue: alimentación, medicamentos y mejoras en instalaciones'),
(5, 5, 'Finalizada', 'En especie', '2025-05-17', '2025-05-18', NULL, 'Para que los animales tengan alguna cama donde puedan dormir calientitos'),
(6, 6, 'Pendiente', 'Monetaria', '2025-05-17', '2025-05-21', 6000.00, 'Para que puedan mejorar las instalaciones o comprar algunos víveres que les haga falta.'),
(7, 7, 'Finalizada', 'Monetaria', '2025-05-17', '2025-05-21', 6000.00, 'Para que puedan comprar más víveres o mejorar las instalaciones.'),
(8, 8, 'Finalizada', 'Voluntariado', '2025-05-17', '2025-07-10', NULL, 'Bañar a los animalitos y jugar con ellos'),
(9, 9, 'Pendiente', 'Monetaria', '2025-05-17', '2025-06-07', 1500.00, 'Me gusta apoyar los centros de adopción'),
(10, 10, 'Finalizada', 'En especie', '2025-05-17', '2025-08-12', NULL, 'Para que tengan mas juguetes');

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
(1, 'MariaL', '10.png', '#924587'),
(3, 'LaJiTo', '2.png', '#f6efef'),
(4, 'Huellitas Felices A.C.', '15.png', '#884ea6'),
(5, 'Ana YG', '10.png', '#b80000'),
(7, 'Dmon', '5.png', '#5f9ef2'),
(8, 'Luigi', '19.png', '#0feb13'),
(9, 'Arturito', '7.png', '#64ed5a'),
(10, 'paty', '2.png', '#dcae4c');

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
(1, 'Mariana López García', 'mariana.lopez@example.com'),
(2, 'Carlos Méndez Ruiz', 'cmendezruiz@gmail.com'),
(3, 'Laura Jimena Torres Rivera', 'laura.torres.r@example.com'),
(4, 'Fundación Huellitas Felices A.C.', 'contacto@huellitasfelices.org'),
(5, 'Ana Cecilia Yllescas Gonzáles', 'yllescas87@hotmail.com'),
(6, 'Angel Carrillo', 'dmon.langel.c@gmail.com'),
(7, 'Luis Yllescas', 'dmon.langel.c@gmail.com'),
(8, 'Luis Angel Carrillo Yllescas', 'carrilloyllescasluisangel21@gmail.com'),
(9, 'Luis Arturo Illescas de Jesus', 'arturo.illescas@gmail.com'),
(10, 'Martha Patricia Ortega Carrillo', 'martha82@gmai.com');

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

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`idMascota`, `nombre`, `fechaIngreso`, `estadoAdopcion`, `adoptadoPor`, `idEstacionEncontrado`) VALUES
(1, 'Dino', '2025-04-30', 'Disponible', NULL, 1418),
(2, 'Candy', '2025-05-07', 'Disponible', NULL, 112),
(3, 'Balto', '2025-05-13', 'Disponible', NULL, 1308),
(4, 'Cheto', '2025-04-16', 'Disponible', NULL, 318),
(5, 'Kira', '2025-04-20', 'Disponible', NULL, 814),
(6, 'Keisy', '2025-05-04', 'Adoptado', 2, 211),
(7, 'Kira', '2025-04-29', 'Disponible', NULL, 104),
(8, 'Kichi', '2025-02-24', 'Disponible', NULL, 1417),
(9, 'Abogato', '2025-04-27', 'Disponible', NULL, 111),
(10, 'Frida', '2025-03-05', 'Disponible', NULL, 317),
(11, 'Rayas', '2025-02-02', 'Disponible', NULL, 814),
(12, 'Romi', '2025-02-09', 'Disponible', NULL, 1409),
(13, 'Tezoc', '2025-01-12', 'Disponible', NULL, 602),
(14, 'Chaba', '2025-02-09', 'Disponible', NULL, 216),
(15, 'Anita', '2025-05-17', 'Disponible', NULL, 410),
(16, 'Azteco', '2025-01-20', 'Disponible', NULL, 1421),
(17, 'Acato', '2025-02-09', 'Disponible', NULL, 1307),
(18, 'Bos', '2024-12-17', 'Disponible', NULL, 1412),
(19, 'Cano', '2024-10-08', 'Disponible', NULL, 1303),
(20, 'Cati', '2024-10-09', 'Disponible', NULL, 1307),
(21, 'Chabote', '2025-02-19', 'Disponible', NULL, 906),
(22, 'Chabo', '2025-02-16', 'Disponible', NULL, 807),
(23, 'Dorado', '2024-11-04', 'Disponible', NULL, 1220),
(24, 'Indi', '2025-03-08', 'Disponible', NULL, 301),
(25, 'Gori', '2024-11-04', 'Disponible', NULL, 512),
(26, 'Limpi', '2025-04-09', 'Disponible', NULL, 1419),
(27, 'Aros', '2024-07-21', 'Disponible', NULL, 1415),
(28, 'Guni', '2024-08-06', 'Disponible', NULL, 1404),
(29, 'Lalo', '2025-02-08', 'Disponible', NULL, 508),
(30, 'Pantaleón', '2025-03-20', 'Disponible', NULL, 202),
(31, 'Pazu', '2025-01-25', 'Disponible', NULL, 1310),
(32, 'Pec', '2025-03-20', 'Disponible', NULL, 1418),
(33, 'Plata', '2025-01-10', 'Disponible', NULL, 816),
(34, 'Potra', '2024-11-21', 'Disponible', NULL, 303),
(35, 'Remi', '2024-09-15', 'Disponible', NULL, 1417),
(36, 'Ogri', '2025-05-15', 'Disponible', NULL, 1302),
(37, 'Titán', '2025-05-16', 'Disponible', NULL, 1218);

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
(26, 'Labrador', 1),
(27, 'Tabby', 2),
(28, 'Calicó', 2),
(29, 'Boxador', 1),
(30, 'Pitbull', 1),
(31, 'Pastor Vasco', 1),
(32, 'Pastor ganadero australiano', 1),
(33, 'Pastor ovejero australiano', 1),
(34, 'Labrador retriever', 1),
(35, 'Black Mouth Cur', 1),
(36, 'Patterdale terrier', 1),
(37, 'Crestado rodesiano', 1),
(38, 'Borador', 1),
(39, 'Combai', 1),
(40, 'Pastor ganadero australiano', 1);

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
(1, 'Andrea Amador Martinez', 'andy.amador6@gmail.com'),
(2, 'Jesús Martínez Bartolo', 'Jesu.Bartolo13@gmail.com');

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

--
-- Volcado de datos para la tabla `reporte`
--

INSERT INTO `reporte` (`idReporte`, `idReportante`, `idEstacionRep`, `estadoReporte`, `fechaReporte`, `descripcion`) VALUES
(1, 1, 319, 'En proceso', '2025-05-17 14:40:09', 'Perro de raza mixta mediano, es amigable, lo dejaron encadenado en los barandales del metro. pero no cuenta con placa. '),
(2, 2, 318, 'En proceso', '2025-05-17 14:44:54', 'Fue visto un perrito pequeño, afuera del metro viveros de Coyoacán, del lado del parque, ya lleva varias días seguidos que se queda en los puestos del lado del parque de viveros, trae collar pero no placa.');

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

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`idSolicitud`, `idMascota`, `idAdoptante`, `fechaSolicitud`, `estadoAdopcion`, `comentarios`) VALUES
(1, 4, 1, '2025-05-19', 'Pendiente', NULL),
(2, 6, 2, '2025-05-19', 'Aprobada', 'Familia grane y responsable, experiencia con mascotas (2 gatos)');

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
(1, 'Prolongación 12 De Octubre, La Asunción, Santa María Tonanitla, Tonanitla, Estado de México, 55785, México', '19.688538,-99.059815', 'Pendiente', '2025-05-20 16:00:00', NULL),
(2, 'Calle Mandarinas, Ojo de Agua, Tecámac, Estado de México, 55770, México', '19.676378,-99.031132', 'Realizada', '2025-05-20 16:00:00', 'Casa grande y agradable para la mascota.');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `adoptante`
--
ALTER TABLE `adoptante`
  MODIFY `idAdoptante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `donacion`
--
ALTER TABLE `donacion`
  MODIFY `idDonacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `donante`
--
ALTER TABLE `donante`
  MODIFY `idDonante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `idMascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `raza`
--
ALTER TABLE `raza`
  MODIFY `idRaza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `reportante`
--
ALTER TABLE `reportante`
  MODIFY `idReportante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
