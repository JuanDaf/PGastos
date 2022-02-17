-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-12-2021 a las 15:03:34
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemaonly`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `id_gastos` bigint(20) NOT NULL,
  `Tipo` varchar(30) NOT NULL,
  `Monto` bigint(20) NOT NULL,
  `Detalle` varchar(100) NOT NULL,
  `Fecha` varchar(10) NOT NULL,
  `Id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `gastos`
--

INSERT INTO `gastos` (`id_gastos`, `Tipo`, `Monto`, `Detalle`, `Fecha`, `Id_usuario`) VALUES
(4, 'Carro', 540000, 'Matenimiento', '2021-11-04', 123456789),
(5, 'Telefono', 1200000, 'Pago de la factura del mes de octubre siiiii jejejee', '2021-11-04', 123456789),
(6, 'Necesidades', 1200000, 'Gastos Generales', '2021-01-30', 123456789),
(7, 'Necesidades', 1200000, 'Gastos Generales', '2021-02-28', 123456789),
(8, 'Necesidades', 1200000, 'Gastos Generales', '2021-03-31', 123456789),
(9, 'Necesidades', 1200000, 'Gastos Generales', '2021-04-30', 123456789),
(10, 'Necesidades', 1500000, 'Gastos Generales', '2021-05-31', 123456789),
(11, 'Necesidades', 1200000, 'Gastos Generales', '2021-06-30', 123456789),
(12, 'Necesidades', 1500000, 'Gastos Generales', '2021-07-30', 123456789),
(13, 'Necesidades', 1500000, 'Gastos Generales', '2021-08-31', 123456789),
(14, 'Necesidades', 1340000, 'Gastos Generales', '2021-09-30', 123456789),
(15, 'Carro', 540000, 'asdfsadas', '2021-10-30', 123456789);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos`
--

CREATE TABLE `ingresos` (
  `id_ingreso` bigint(20) NOT NULL,
  `Tipo` varchar(30) DEFAULT NULL,
  `Monto` bigint(20) DEFAULT NULL,
  `Detalle` varchar(150) DEFAULT NULL,
  `id_usuario` varchar(15) DEFAULT NULL,
  `Fecha` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ingresos`
--

INSERT INTO `ingresos` (`id_ingreso`, `Tipo`, `Monto`, `Detalle`, `id_usuario`, `Fecha`) VALUES
(83, 'Carro', 540000, 'Recaudo uber del mes de Octubre', '123456789', '2021-10-28'),
(86, 'Renta', 1200000, 'Recaudo de la renta del mes presente Ok ok ', '123456789', '2021-10-25'),
(87, 'Tamales', 540000, 'Venta de los tamales y los carnicos', '123456789', '2021-10-04'),
(93, 'Tamales', 540000, 'Recaudo tamales venta en fuquene ', '123456789', '2021-10-28'),
(94, 'Tamales', 1340000, 'Tamales del mes de agosto', '123456789', '2021-08-25'),
(96, 'Pago trabajo', 1200000, 'Editando este campo para ser evaluado', '123456789', '2021-11-02'),
(99, 'Nomina', 1500000, 'Mesada  del trabajo', '123456789', '2021-01-30'),
(100, 'Nomina', 1500000, 'Mesada  del trabajo', '123456789', '2021-02-27'),
(101, 'Nomina', 1500000, 'Mesada  del trabajo', '123456789', '2021-03-30'),
(102, 'Nomina', 1500000, 'Mesada  del trabajo', '123456789', '2021-04-30'),
(103, 'Nomina', 1500000, 'Mesada  del trabajo', '123456789', '2021-05-31'),
(104, 'Nomina', 1500000, 'Mesada  del trabajo', '123456789', '2021-06-30'),
(105, 'Nomina', 1500000, 'Mesada  del trabajo', '123456789', '2021-07-31'),
(106, 'Nomina', 1500000, 'Mesada  del trabajo', '123456789', '2021-08-30'),
(107, 'Nomina', 1500000, 'Mesada  del trabajo', '123456789', '2021-09-30'),
(108, 'Tamales', 540000, 'baasasdas', '123456789', '2021-11-08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('7YQ4al4qN81U-eDgrLVuNw-IwcoFBQod', 1637631553, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('GjCKRz9H3fXUZ6HeJKIf0QViTTWRWTjl', 1637631553, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('VBdNaZULEFMPpLQ2Qj61fHPxJDX-H0iR', 1637631754, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('WeyLtzXunMnACX-GhshhMCJrGhs3ZEXv', 1636591130, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('XIe_NN5WbHwTBgZPqNQfNc9qnZoCfKAT', 1636579290, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":\"123456789\"}}'),
('YJEQ1ghJOdP_kjR7lAsXKXMO90SVuX3I', 1636579195, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Zh7PRAjgL72P_R--CeFIp4J71ks5tG0z', 1639601638, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('cxJHMyAe-vA8pRh2YT6e4iMEx_Niy3Ij', 1636579196, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('gBb_5WSqngWoVtpyMQlbk-AZUgknZYuz', 1636579153, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('o0OWYgbQFuDMKks05jUvcY83LylCvO1A', 1636579153, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('rOwr5H0_gtPaANsvOM5L6zTalilqPdU4', 1636579141, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('vFS-YeUsMyf4QAqBNez9fEy8IjAvjlmu', 1637631553, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('wd0jaHIiNxFOvO1PjoBgAMGm_iMzIrXi', 1636647532, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('wpekcEMgpK4CVy_kPYly6NYIdXWjsmSr', 1637631554, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` varchar(15) NOT NULL,
  `Nombre` varchar(60) NOT NULL,
  `Apellido` varchar(60) NOT NULL,
  `Telefono` varchar(20) NOT NULL,
  `Direccion` varchar(80) NOT NULL,
  `Usuario` varchar(25) NOT NULL,
  `Contrasena` varchar(60) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Nombre`, `Apellido`, `Telefono`, `Direccion`, `Usuario`, `Contrasena`, `Email`) VALUES
('123456789', 'Juan David', 'Forero ', '3115293986', 'Cra 3 #2-86', 'JuanDafff', '$2a$10$rHZ5eIH0ViWedXaPWJ0GpOqfyK9xDMzMRwU.2huYaKanI7uNspd/e', 'iotled@yopmail.com'),
('34664433', 'Carlos Andres', 'Forero Forero', '1234543', 'colombia', 'Carlitos', '$2a$10$y/ZeQ9zj5ILy4TGV412i5OfxV/3pMIwLW9JHUzgoF4fMhY0aG/1XW', 'iotled@yopmail.com'),
('987654321', 'Andres Felipe', 'Forero', '3214564', 'Cra 3 #2-86', 'Adreww', '$2a$10$19hb42juRg7OYhRnhacRNeLscIzXT45SBIK1QkPsN4lZqyayrFZdi', 'iotled@yopmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id_gastos`);

--
-- Indices de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD PRIMARY KEY (`id_ingreso`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Cedula` (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id_gastos` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  MODIFY `id_ingreso` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
