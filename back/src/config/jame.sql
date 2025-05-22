-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2025 a las 14:00:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jame`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_compras`
--

CREATE TABLE `carrito_compras` (
  `ID_CarritoCompras` int(100) NOT NULL,
  `id_producto` int(100) NOT NULL,
  `cantidad` int(100) NOT NULL,
  `id_usuario` int(255) NOT NULL,
  `carrito_estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_cate` int(11) NOT NULL,
  `nombre_Categoria` varchar(100) NOT NULL,
  `Descripción_Categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_cate`, `nombre_Categoria`, `Descripción_Categoria`) VALUES
(2, 'Medicina', 'Medicina para tu mascota'),
(3, 'Comida gatos', 'comida gatosa para gatos gatunos'),
(4, 'Humedo', 'Productos humedos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `ID_Citas` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `Fecha_Cita` datetime DEFAULT NULL,
  `Motivo_Cita` varchar(50) NOT NULL,
  `Estado_Cita` varchar(50) NOT NULL,
  `ID_Mascota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`ID_Citas`, `ID_Usuario`, `Fecha_Cita`, `Motivo_Cita`, `Estado_Cita`, `ID_Mascota`) VALUES
(1, 10, '2025-04-27 04:13:17', 'Corte', 'pendiente', 12),
(2, 10, '2025-03-29 04:13:00', 'Corte', 'pendiente', 12),
(3, 10, '2025-04-27 04:14:13', 'Corte', 'pendiente', 12),
(4, 10, '2025-04-27 04:14:32', 'Corte', 'pendiente', 12),
(5, 10, '2025-04-29 23:17:00', 'Corte', 'pendiente', 12),
(6, 10, '2025-04-29 23:17:00', 'Corte', 'pendiente', 12),
(7, 10, '2025-04-26 23:18:00', 'Baño', 'pendiente', 12),
(8, 10, '2025-04-30 23:18:00', 'Baño', 'pendiente', 12),
(9, 10, '2025-04-30 14:18:00', 'Baño', 'pendiente', 12),
(10, 10, '2025-04-26 23:18:00', 'Vacunacion', 'pendiente', 12),
(11, 10, '2025-04-26 23:18:00', 'Vacunacion', 'pendiente', 12),
(12, 10, '2025-04-26 23:18:00', 'Esterilizacion', 'pendiente', 12),
(13, 10, '2025-04-30 14:18:00', 'Vacunacion', 'pendiente', 12),
(14, 14, '2025-05-14 09:30:00', 'MedicinaGeneral', 'rechazada', 13),
(15, 14, '2025-05-14 09:30:00', 'MedicinaGeneral', 'rechazada', 13),
(16, 14, '2025-05-14 09:30:00', 'MedicinaGeneral', 'pendiente', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `fecha_aprobacion` datetime NOT NULL,
  `metodo_pago` varchar(100) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_user` int(11) NOT NULL,
  `codigo_verificacion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedidos`
--

CREATE TABLE `detalle_pedidos` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `producto` varchar(200) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota`
--

CREATE TABLE `mascota` (
  `ID_Mascota` int(11) NOT NULL,
  `Nombre_Mascota` varchar(50) NOT NULL,
  `Edad_Mascota` int(15) NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  `Raza_Mascota` varchar(50) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `Observaciones_Mascota` varchar(255) NOT NULL DEFAULT 'No hay observaciones',
  `ID_Usuario` int(11) NOT NULL DEFAULT 2,
  `Estado_Mascota` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`ID_Mascota`, `Nombre_Mascota`, `Edad_Mascota`, `Fecha_nacimiento`, `Raza_Mascota`, `imagen`, `Observaciones_Mascota`, `ID_Usuario`, `Estado_Mascota`) VALUES
(12, 'Gema', 4, '2021-05-23', 'Gato', '', 'Ninguna', 10, 1),
(13, 'Alekey', 4, '2020-09-30', 'Golder Retriever', '', 'Mascota de pelo largo, color dorado brillante, 45.0 kg peso ', 14, 1),
(14, 'Prueba minima para actualizar', 1, '2024-05-13', 'Golder Retriever', '', 'Mascota de prueba para realizar manual', 14, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `MetodoPago_Pedido` tinyint(1) NOT NULL,
  `Descripcion_Pedido` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `stock` int(11) NOT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  `id_cate` int(11) NOT NULL,
  `estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre_producto`, `descripcion`, `precio`, `stock`, `imagen`, `id_cate`, `estado`) VALUES
(1, 'auto ', 'Nissan gtr', 10000, 3, 'producto_1745716742012-453187649.jpg', 2, 0),
(2, 'Muñoz', '1 muñoz', 100, 10, 'producto_1745719417105-707138866.png', 2, 0),
(3, 'Comida para mascotas', 'Alimento Para Perro Agility Gold Pequeños Adultos Piel - 1,5 kg', 45000, 10, 'producto_1747233992217-179861543.webp', 4, 1),
(4, 'hola', 'Alimento Para Perro Agility Gold Pequeños Adultos Piel - 1,5 kg', 150000, 15, 'producto_1747234064340-64179021.webp', 2, 1),
(5, 'Comida ', 'Alimento Para Perro Agility Gold Pequeños Adultos Piel - 1,5 kg', 45000, 14, 'producto_1747234140845-621565089.webp', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_completo` varchar(50) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` decimal(10,0) DEFAULT NULL,
  `imagen` varchar(30) NOT NULL DEFAULT 'USUARIOS_FOTOS/nf.jpg',
  `codigo` varchar(10) DEFAULT NULL,
  `codigo_expirate_date` datetime DEFAULT NULL,
  `fecha_registro` datetime NOT NULL,
  `id_rol` int(11) NOT NULL DEFAULT 2,
  `estado` int(3) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_completo`, `correo_electronico`, `usuario`, `contraseña`, `direccion`, `telefono`, `imagen`, `codigo`, `codigo_expirate_date`, `fecha_registro`, `id_rol`, `estado`) VALUES
(1, 'Juan José Uparela Sosa', 'uparelajuan2@gmail.com', 'juanjo', '1111', '94 B 130a-67', 3138332309, 'USUARIOS_FOTOS/1.jpg', NULL, NULL, '2024-10-08 19:33:21', 1, 1),
(2, 'Diego esteban sanchez', 'diego@gmail.com', 'Diego', '1111', 'kenedy', 3209207777, 'USUARIOS_FOTOS/2.jpg', '', NULL, '2024-09-07 20:59:42', 2, 1),
(3, 'Alisson', 'alison@gmail.com', 'Alisson', '1111', 'Dirección', 3109999999, 'USUARIOS_FOTOS/3.jpg', '', NULL, '2024-10-03 19:33:21', 1, 1),
(7, 'JuanJo', 'uparelajuan2@gmail.com', 'jj', '$2b$10$Mgg58VT6B.pWprsg14xJ9Oswc7xS.Y2jo6KL/81vSLO9SMQvno36G', NULL, NULL, 'USUARIOS_FOTOS/nf.jpg', '', NULL, '0000-00-00 00:00:00', 2, 1),
(9, 'Admin', 'admin@gmail.com', 'Admin', '$2b$10$zbgPu3YYZ8I53Hm61s6KaepYek81lI6hdVsFQvjPZ7yWqerMxs6va', 'san cristobal', NULL, 'USUARIOS_FOTOS/nf.jpg', '', NULL, '0000-00-00 00:00:00', 1, 1),
(10, 'Diego Esteban', 'egoessanrero@gmail.com', 'Diego', '$2b$10$qx0a82T.tJKarF9GcOcIruX/j9emEQk.g3juqmLRmcO8Je25we1kC', NULL, NULL, 'USUARIOS_FOTOS/nf.jpg', NULL, NULL, '0000-00-00 00:00:00', 2, 1),
(12, 'Martin Lee', 'misterlee272006@gmail.com', 'Moya Llano', '$2b$10$iXQ2yxTIaFFgLhOyyFvIqecWjLUdKElVxtsBwp.DxTyVgVISlT4OK', NULL, NULL, 'USUARIOS_FOTOS/nf.jpg', NULL, NULL, '0000-00-00 00:00:00', 2, 1),
(14, 'Prueba Manual Actualizado', 'manualprueba@gmail.com', 'PruebaManual', '$2b$10$tOXPGFD4CChUhPcWvFgFeOm5RNBmsC7nU6VVwrnU1V8tS/mFNBG8a', 'SENA CEET', 3115929738, '1747138701316-834290549.png', NULL, NULL, '0000-00-00 00:00:00', 2, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  ADD PRIMARY KEY (`ID_CarritoCompras`),
  ADD KEY `id usuario` (`id_usuario`),
  ADD KEY `producto` (`id_producto`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_cate`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`ID_Citas`),
  ADD KEY `mascota` (`ID_Mascota`),
  ADD KEY `id_usuario_citas` (`ID_Usuario`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payment_id_2` (`payment_id`),
  ADD KEY `id_usuario` (`id_user`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Indices de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `fk_id_pedido` (`id_pedido`);

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`ID_Mascota`),
  ADD KEY `id usuario` (`ID_Usuario`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `fk_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `categoria_producto` (`id_cate`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  MODIFY `ID_CarritoCompras` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_cate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `ID_Citas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `ID_Mascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  ADD CONSTRAINT `producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `id_usuario_citas` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mascota` FOREIGN KEY (`ID_Mascota`) REFERENCES `mascota` (`ID_Mascota`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `id_usuario` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD CONSTRAINT `fk_id_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD CONSTRAINT `id usuario` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `categoria_producto` FOREIGN KEY (`id_cate`) REFERENCES `categorias` (`id_cate`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
