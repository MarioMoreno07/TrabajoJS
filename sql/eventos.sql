-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 28-11-2023 a las 15:35:16
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eventos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Eventos`
--

CREATE TABLE `Eventos` (
  `id` int NOT NULL,
  `nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fecha` date NOT NULL,
  `ubicacion` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Eventos`
--

INSERT INTO `Eventos` (`id`, `nombre`, `fecha`, `ubicacion`, `descripcion`) VALUES
(3, 'otro evento', '2022-10-11', 'otra situacion', 'otra descripcion'),
(4, 'Kings leaguee', '2023-12-12', 'sevillaaAAA', 'partido de la kings league'),
(5, 'smite', '2023-11-12', 'los Angeles', 'Spl de smite'),
(6, 'valoranttt', '2023-11-22', 'mi casa', 'partida timidilla mañana'),
(7, 'series', '2023-12-02', 'madrid', 'charla sobre series antiguas'),
(8, 'BBDD', '2024-02-10', 'Madrid', 'charla sobre base de datos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Participantes`
--

CREATE TABLE `Participantes` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `id_evento` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Participantes`
--

INSERT INTO `Participantes` (`id`, `name`, `email`, `descripcion`, `id_evento`) VALUES
(6, 'pepa', 'papa@gmail.com', 'pepa', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Eventos`
--
ALTER TABLE `Eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Participantes`
--
ALTER TABLE `Participantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Evento` (`id_evento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Eventos`
--
ALTER TABLE `Eventos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `Participantes`
--
ALTER TABLE `Participantes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Participantes`
--
ALTER TABLE `Participantes`
  ADD CONSTRAINT `FK_Evento` FOREIGN KEY (`id_evento`) REFERENCES `Eventos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
