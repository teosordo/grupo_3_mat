-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-08-2021 a las 02:19:04
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `matech_db`
--

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Generic Brand 1'),
(2, 'Generic Brand 2'),
(3, 'Generic Brand 3'),
(4, 'Generic Brand 4');

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `detail`) VALUES
(1, 'Motherboards', 'a'),
(2, 'CPUs', 'b'),
(3, 'Placas de Video', 'c'),
(4, 'Almacenamiento', 'c'),
(5, 'Gabinetes', 'd'),
(6, 'Fuentes', 'e'),
(7, 'Coolers', 'f'),
(8, 'Memorias RAM', 'f');

--
-- Volcado de datos para la tabla `colors`
--

INSERT INTO `colors` (`id`, `name`) VALUES
(4, 'azul'),
(2, 'blanco'),
(7, 'naranja'),
(1, 'negro'),
(3, 'rojo'),
(5, 'verde'),
(6, 'violeta');

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `name`, `product_id`) VALUES
(1, 'componentCASE.jpg', 1),
(2, 'componentGC.jpg', 2),
(3, 'motherboard-png_8735396.png', 3),
(4, 'image-1625333121814.png', 4),
(5, 'image-1625334008921.png', 5),
(6, 'image-1625335247184.png', 6),
(7, 'image-1625335522010.png', 7),
(8, 'image-1625336088103.jpg', 8);

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `brand_id`, `category_id`, `originalPrice`, `discount`, `price`, `stock`, `warranty`, `video`, `characteristics`, `specs`) VALUES
(1, 'Ordenador', 1, 5, '5000', 50, '2500', 20, '2 años', 'https://youtube.com/embed/HSseaknEv9Q', 'Incluye fuente de alimentación: No //\r\nTipo de estructura: Mid tower //\r\nPuertos: USB 3.0,USB 2.0,Audio HD //\r\nBahías: 3.5 in,2.5 in //\r\nAltura x Ancho x Largo: 480 mm x 210 mm x 440 mm //\r\nPlacas madre compatibles: ATX,Micro-ATX,Mini-ITX,E-ATX //', 'Línea: Carbide \r\nModelo: SPEC-05 // CC-9011138-WW'),
(2, 'Tarjeta gráfica', 4, 4, '25000', 20, '20000', 19, '6 meses', 'https://www.youtube.com/embed/uTwPn3JWfV4', 'Descripción del producto GTS XXX ED RX 580 8GB OC + 1386M D5 BP 3xDP HDMI DVI', 'Tipo de bus PCI-E\r\nReloj de GPU verdadero: 1366MHz, Boost OC +: 1386MHz\r\nProcesadores de flujo 2304\r\nBus de memoria de 256 bits\r\nReloj de memoria verdadero: 8.0GHz, Boost OC +: 8.1GHz\r\nTamaño de memoria 8 GB\r\nTipo de memoria DDR5\r\nPerfil de tarjeta dual\r\nDisipador de ventilador DD de solución térmica\r\nSalidas\r\nSoporte de enlace dual Y\r\nResolución máxima admitida (DIGITAL) 4096 x 2160\r\nSalida: puerto de pantalla 3\r\nSalida - HDMI 1\r\nSalida - DL-DVI-D 1\r\nCaracterísticas\r\nPuerto de pantalla listo 1.4\r\nListo para HDMI 2.0b\r\nRequisitos\r\nAlimentación externa: 8 pines 1\r\nRequisito mínimo de fuente de alimentación 500 vatios\r\nFuente de alimentación recomendada por XFX XFX 550W PSU'),
(3, 'Motherboard 22003', 1, 1, '2000', 10, '1800', 20, '6 meses', 'https://youtube.com/embed/rx71hDO-fqQ', 'Plataforma: AMD mm\r\nSocket: AM4 A-Series, AM4 APU 2da generación, AM4 APU 1ra generación, AM4 Ryzen 1ra generación, AM4 Ryzen2da generación, AM4 Ryzen 3er generación mm\r\nChipsets principal: AMD A320.', 'Conectividad: Slot Pci-e 16X (1), puertos Sata (4), salidas HDMI, salidas DVI, placa de red: gigabit LAN 10/100/1000 Mb/s, puertos USB 2.0 (2), puertos USB 3.0 (4) mm\r\nDimensiones: factor M-ATX mm\r\nEnergía: consumo de 35 w mm\r\nMemoria: slot Ddr4 (2) mm\r\nPlaca de sonido: 7.1 Realtek ALC 887.'),
(4, 'Memoria Ram ', 3, 8, '5600', NULL, '5600', 20, '4 meses', 'https://www.youtube.com/watch?v=yRNwl24l39E', 'esto es una caracteristica', 'esto es una especificacion'),
(5, 'CPU X47329', 4, 2, '7600', NULL, '6080', 20, '5 meses', 'https://www.youtube.com/embed/8NynfgRvQxQ ', 'esto es una caracteristica ', 'esto es una especificacion'),
(6, 'SSD S3300U 1TB ', 4, 4, '11000', 32, '7480', 20, '1 año', 'https://www.youtube.com/embed/EK29Weiz6_Q', 'esto es una característica ', 'Ancho: 100.5 mm\r\nAltura: 69.85 mm\r\nPeso: 32.2 g\r\nMemoria Cache: 128 mb\r\nVelocidad De Rotación: 0 RPM\r\nTasa De Transferencia: 6.0 gb/s\r\nVelocidad Lectura Secuencial 500 mb/s\r\nVelocidad Escritura Secuencial: 320 mb/s'),
(7, 'Fuente A02 600w 80 Plus Gold', 1, 6, '7500', NULL, '7500', 20, '9 meses', 'https://www.youtube.com/embed/bUh2EZzJZRU', 'esto es una característica ', 'Potencia: 600W\r\n20 + 4 Pines\r\n2 Conectores SATA\r\n2 Conectores HDD\r\n1 Conector P4\r\n1 Ventilador de 12 cm\r\nCable de 40 cm\r\n\r\n'),
(8, 'Cooler CPU x9393 ', 1, 7, '3222', NULL, '3222', 20, '2 años', 'https://www.youtube.com/embed/fACBaqxnb9k', 'Esto es una características ', 'Tamaño del Ventilador: 90mm\r\nModelo: BEK-93900 Black/White\r\nDimensiones del producto: 73 × 97 × 135 mm\r\nVelocidad: 800-1800 RPM (PWM) ± 10%\r\nConector: 4 pines (PWM)');

--
-- Volcado de datos para la tabla `products_colors`
--

INSERT INTO `products_colors` (`id`, `product_id`, `color_id`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 2, 3),
(4, 2, 4),
(5, 3, 1),
(6, 4, 5),
(7, 4, 7),
(8, 5, 2),
(9, 5, 4),
(10, 6, 1),
(11, 6, 2),
(12, 7, 5),
(13, 8, 3);

--
-- Volcado de datos para la tabla `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20210806230052-brands.js'),
('20210806230412-categories.js'),
('20210806230834-colors.js'),
('20210807000256-products.js'),
('20210807000420-products_colors.js'),
('20210807001259-images.js'),
('20210808201052-users.js'),
('20210809141523-carts.js'),
('20210809142828-carts_products.js');

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `email`, `password`, `avatar`) VALUES
(3, 'Matias', 'Celentano', 'mcelentano', 'matiascelentano562@gmail.com', '$2a$10$5ajrKiw1hXsAkGq9XlmhvOrQVrkmiHJofdpM7K.h5LBTd3HFIXNSa', 'avatar-1626195062880.png'),
(4, 'Teo', 'Sordó', 'teusa28', 'teosordo98@gmail.com', '$2a$10$ZA6vt.k9C8KhRQU4GUC0HOkQowkVqkVKVELv/B91y99WI6tpIb5I.', 'default-user.jpg'),
(5, 'Angelica', 'Dutra', 'angie', 'angiedutra@hotmail.com', '$2a$10$OPFdhK2j/ewfKcg2EiRJaO4PJUtdhM4Z.LKv4Jz1/wpBKPRedKp9O', 'avatar-1626406488521.jpg'),
(6, 'Belen', 'Ortiz', 'Belen', 'angiedutraa@gmail.com', '$2a$10$1OhdtKVYPkVKPuPbBs2c4uX.qMCq9ee6jNc48.4wBli36DDQYsMT6', 'default-user.jpg'),
(7, 'Matias', 'Celentano', 'mcelentano123', 'matiascelentano@matech.com', '$2a$10$TaIpRQHfJwZfQu0Wviug7OJipEh3FuVrfL8ohfzUJ04qKjqW2CLvG', 'default-user.jpg'),
(8, 'Teo', 'Sordó', 'TeoGoteo', 'teosordo@matech.com', '$2a$10$e7K62S1Cxk6d75L2DX6I4.Gy4ppzn6NZQtzm3sa1Hmx6lJA/cz3Fu', 'avatar-1627338682788.png'),
(9, 'juancho', 'pancho', 'juapan', 'juancho@mail.com', '$2a$10$FcDzXuoop2AE410javtBi.du.KAEFUy/vj7.w1IhIVSiVzRmS5OZO', 'default-user.jpg'),
(10, 'Angelica Belen', 'Dutra Ortiz', 'angiee', 'angie@matech.com', '$2a$10$vPPK3yJbWaQs1OCSsk173eg4biH1wMgfWQ8gvwFpe6MI17obCk4Fq', 'default-user.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
