-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 06, 2022 at 03:43 PM
-- Server version: 10.2.41-MariaDB-cll-lve
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `centroal_nutricalc`
--

-- --------------------------------------------------------

--
-- Table structure for table `ingrediente`
--

CREATE TABLE `ingrediente` (
  `ID_Ingrediente` int(11) NOT NULL,
  `Nombre` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `Marca` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `Categoria` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `Alergeno` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `ingrediente`
--

INSERT INTO `ingrediente` (`ID_Ingrediente`, `Nombre`, `Marca`, `Categoria`, `Alergeno`) VALUES
(1, 'Azúcar', 'IANSA', 'Despensa', 0),
(2, 'Sal Fina', 'Lobos', 'Despensa', 0),
(3, 'Queso Mozzarella', 'Colún', 'Lácteos', 3),
(4, 'Carne', 'Genérica', 'Carnes', 0),
(5, 'Coliflor', 'Genérica', 'Vegetales', 0),
(6, 'Mani', 'Genérico', 'Legumbres', 2),
(7, 'Huevo', 'Genérico', 'Huevos', 5),
(8, 'Harina', 'Selecta', 'Harinas', 4),
(9, 'Mantequilla', 'Colún', 'Lácteos', 0),
(10, 'Burritos y Wraps XL', 'Pancho Villa', 'Tortillas', 4),
(11, 'Aceite de Maravilla', 'Chef', 'Despensa', 0),
(12, 'Crema de Leche', 'Nestlé', 'Despensa', 3),
(13, 'Trutro entero', 'Super Pollo', 'Carnes', 0),
(14, 'Manjar', 'Colun', 'Dulces', 3),
(15, 'Levadura Seca', 'Lefersa', 'Despensa', 0),
(16, 'Arroz Grado 1', 'Miraflores', 'Despensa', 0),
(17, 'Leche Condensada', 'Nestlé', '	\r\nLácteos', 3),
(18, 'Yoghurt Damasco', 'Colun', '	\r\nLácteos', 3),
(19, 'Mayonesa', 'Kraft', 'Despensa', 5),
(20, 'Leche Semidescremada', 'Colun', '	\r\nLácteos', 3);

-- --------------------------------------------------------

--
-- Table structure for table `ingrediente_receta`
--

CREATE TABLE `ingrediente_receta` (
  `ID_Ingrediente` int(11) NOT NULL,
  `ID_Receta` int(11) NOT NULL,
  `Cantidad` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `ingrediente_receta`
--

INSERT INTO `ingrediente_receta` (`ID_Ingrediente`, `ID_Receta`, `Cantidad`) VALUES
(1, 9, 180),
(7, 9, 160),
(8, 9, 150),
(9, 9, 120);

-- --------------------------------------------------------

--
-- Table structure for table `nutriente`
--

CREATE TABLE `nutriente` (
  `ID_Nutriente` int(11) NOT NULL,
  `Nombre` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `ID_Padre` int(11) NOT NULL,
  `Tipo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `nutriente`
--

INSERT INTO `nutriente` (`ID_Nutriente`, `Nombre`, `ID_Padre`, `Tipo`) VALUES
(0, 'Proteinas', -1, 0),
(1, 'Carbohidratos', -1, 0),
(2, 'Azucares', 1, 0),
(3, 'Fibra Soluble', 1, 0),
(4, 'Fibra Insoluble', 1, 0),
(5, 'Grasas', -1, 0),
(6, 'Grasas Saturadas', 5, 0),
(7, 'Grasas Monoinsaturadas', 5, 0),
(8, 'Grasas Poliinsaturadas', 5, 0),
(9, 'DHA', 5, 0),
(10, 'EPA', 5, 0),
(11, 'Sodio', -1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `nutriente_ingrediente`
--

CREATE TABLE `nutriente_ingrediente` (
  `ID_Nutriente` int(11) NOT NULL,
  `ID_Ingrediente` int(11) NOT NULL,
  `Cantidad` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `nutriente_ingrediente`
--

INSERT INTO `nutriente_ingrediente` (`ID_Nutriente`, `ID_Ingrediente`, `Cantidad`) VALUES
(0, 1, 0),
(0, 2, 0),
(0, 3, 24),
(0, 4, 26.4),
(0, 5, 2),
(0, 6, 25.8),
(0, 7, 12.6),
(0, 8, 11),
(0, 9, 1.4),
(0, 10, 8.4),
(0, 11, 0),
(0, 12, 2.9),
(0, 13, 15.1),
(0, 14, 8.5),
(0, 15, 48),
(0, 16, 6.7),
(0, 17, 7.5),
(0, 18, 3.7),
(0, 19, 0.6),
(0, 20, 3.2),
(1, 1, 100),
(1, 2, 0),
(1, 3, 2.3),
(1, 4, 0),
(1, 5, 5.3),
(1, 6, 16.1),
(1, 7, 0.77),
(1, 8, 75),
(1, 9, 0.2),
(1, 10, 46.2),
(1, 11, 0),
(1, 12, 4.6),
(1, 13, 0.7),
(1, 14, 53.8),
(1, 15, 38),
(1, 16, 74),
(1, 17, 59),
(1, 18, 12.4),
(1, 19, 2),
(1, 20, 4.6),
(2, 12, 4.6),
(2, 13, 0.4),
(2, 14, 41.3),
(2, 16, 0.4),
(2, 17, 59),
(2, 18, 9.9),
(2, 19, 2),
(2, 20, 4.6),
(5, 1, 0),
(5, 2, 0),
(5, 3, 17),
(5, 4, 19.3),
(5, 5, 0.1),
(5, 6, 49),
(5, 7, 10),
(5, 8, 1.8),
(5, 9, 83.2),
(5, 10, 6.2),
(5, 11, 92),
(5, 12, 34.6),
(5, 13, 15),
(5, 14, 4.7),
(5, 15, 6),
(5, 16, 1.3),
(5, 17, 4.1),
(5, 18, 2.2),
(5, 19, 76),
(5, 20, 1.5),
(6, 11, 10),
(6, 12, 21.5),
(6, 13, 3.9),
(6, 14, 3.25),
(6, 15, 1),
(6, 18, 1.41),
(6, 19, 12),
(6, 20, 0.96),
(7, 11, 28),
(7, 12, 8),
(7, 13, 5.3),
(7, 14, 1.1),
(7, 18, 0.64),
(7, 19, 17),
(7, 20, 0.44),
(8, 11, 54),
(8, 12, 0.82),
(8, 13, 5),
(8, 14, 0.11),
(8, 18, 0.06),
(8, 19, 43),
(8, 20, 0.04),
(11, 2, 100),
(11, 3, 476),
(11, 4, 384),
(11, 5, 30),
(11, 6, 18),
(11, 7, 140),
(11, 8, 442),
(11, 9, 398),
(11, 10, 392),
(11, 12, 38),
(11, 13, 101),
(11, 14, 142),
(11, 15, 5),
(11, 16, 2),
(11, 17, 117),
(11, 18, 45),
(11, 19, 549),
(11, 20, 33);

-- --------------------------------------------------------

--
-- Table structure for table `receta`
--

CREATE TABLE `receta` (
  `ID_Receta` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `Nombre` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `Deshidratado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `receta`
--

INSERT INTO `receta` (`ID_Receta`, `ID_Usuario`, `Nombre`, `Deshidratado`) VALUES
(9, 1, 'Queque', 500);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `ID_Usuario` int(11) NOT NULL,
  `Nombre` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `Correo` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `TKN` varchar(255) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`ID_Usuario`, `Nombre`, `Password`, `Correo`, `TKN`) VALUES
(1, 'Gonzalo Escobar', '$2y$10$tMPRe/4vSpsw9/cDlOOQ3OHnUqz4P.1M9oo9tXsiKZnf4L0CnBr7S', 'g.leonesteban@gmail.com', 'a713cdc308ef400fb16c67f959f0eb6c62cfa9f4b9a18f297b536a8903a2ca5e'),
(2, 'Javier thegame', '$2y$10$eGZNIkaOH.L5MMUXE.GeWegYk6XcAqpK.HIH1jFkL1MJeQrYPJ1fW', 'Javiersouza4@gmail.com', '7ba0f2d7e489b367a0b27bd874173b226d30e9ef757e1fdde77350be16e90821'),
(3, 'Francisca Jerez', '$2y$10$rMm3SJLgkS4if9YoHWewbOOobIwzGH5N3g7e43QKi7JInqF4jQ4Cm', 'francisca', ''),
(5, 'felipe', '$2y$10$sMMaY5KTTd8zWLYVH3k8m.94T96lcWv84WCYWGMLZ/Hsd/6QZjawu', 'felipe@hotmail.com', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ingrediente`
--
ALTER TABLE `ingrediente`
  ADD PRIMARY KEY (`ID_Ingrediente`);

--
-- Indexes for table `ingrediente_receta`
--
ALTER TABLE `ingrediente_receta`
  ADD PRIMARY KEY (`ID_Ingrediente`,`ID_Receta`),
  ADD KEY `ID_Receta` (`ID_Receta`);

--
-- Indexes for table `nutriente`
--
ALTER TABLE `nutriente`
  ADD PRIMARY KEY (`ID_Nutriente`);

--
-- Indexes for table `nutriente_ingrediente`
--
ALTER TABLE `nutriente_ingrediente`
  ADD PRIMARY KEY (`ID_Nutriente`,`ID_Ingrediente`),
  ADD KEY `ID_Ingrediente` (`ID_Ingrediente`);

--
-- Indexes for table `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`ID_Receta`),
  ADD KEY `ID_Usuario` (`ID_Usuario`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_Usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingrediente`
--
ALTER TABLE `ingrediente`
  MODIFY `ID_Ingrediente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `nutriente`
--
ALTER TABLE `nutriente`
  MODIFY `ID_Nutriente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `receta`
--
ALTER TABLE `receta`
  MODIFY `ID_Receta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ingrediente_receta`
--
ALTER TABLE `ingrediente_receta`
  ADD CONSTRAINT `ingrediente_receta_ibfk_2` FOREIGN KEY (`ID_Receta`) REFERENCES `receta` (`ID_Receta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ingrediente_receta_ibfk_3` FOREIGN KEY (`ID_Ingrediente`) REFERENCES `ingrediente` (`ID_Ingrediente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nutriente_ingrediente`
--
ALTER TABLE `nutriente_ingrediente`
  ADD CONSTRAINT `nutriente_ingrediente_ibfk_1` FOREIGN KEY (`ID_Ingrediente`) REFERENCES `ingrediente` (`ID_Ingrediente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nutriente_ingrediente_ibfk_2` FOREIGN KEY (`ID_Nutriente`) REFERENCES `nutriente` (`ID_Nutriente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receta`
--
ALTER TABLE `receta`
  ADD CONSTRAINT `receta_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
