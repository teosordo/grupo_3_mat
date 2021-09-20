-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2021 a las 00:56:11
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Generic Brand 1'),
(2, 'Generic Brand 2'),
(3, 'Generic Brand 3'),
(4, 'Generic Brand 4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_products` int(11) DEFAULT NULL,
  `final_price` decimal(10,0) DEFAULT NULL,
  `purchase_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `total_products`, `final_price`, `purchase_date`) VALUES
(1, 7, 0, '0', NULL),
(2, 11, NULL, NULL, NULL),
(3, 12, NULL, NULL, NULL),
(4, 13, NULL, NULL, NULL),
(5, 14, NULL, NULL, NULL),
(6, 15, NULL, NULL, NULL),
(7, 16, NULL, NULL, NULL),
(8, 17, NULL, NULL, NULL),
(9, 18, NULL, NULL, NULL),
(10, 19, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_products`
--

CREATE TABLE `cart_products` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `products_price` decimal(10,0) NOT NULL,
  `products_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `detail` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(8, 'image-1625336088103.jpg', 8),
(9, 'image-1631983287595kisspng-graphics-cards-video-adapters-intel-central-proc-5adca794050ae3.9205718015244102600207.png.png', 9),
(10, 'image-1631983459414kisspng-graphics-cards-video-adapters-intel-central-proc-5adca794050ae3.9205718015244102600207.png.png', 10),
(11, 'image-1631983738545kisspng-graphics-cards-video-adapters-intel-central-proc-5adca794050ae3.9205718015244102600207.png.png', 11),
(12, 'image-16319838526791088385b-9965-4bd0-9e92-fda6ae6c6c36_rw_1920.jpg.jpg', 12),
(13, 'image-1631984227659dell-yp696-motherboard-mainboard-fuer-dell-optiplex-740.jpg.jpg', 13),
(14, 'image-1631984360159product_10_20181129143301_5bff881d2a2d4.png.png', 14),
(15, 'image-1631984424639dell-yp696-motherboard-mainboard-fuer-dell-optiplex-740.jpg.jpg', 15),
(16, 'image-16319845533560002371_imba-h610-industrial-atx-motherboard_500.jpeg.jpeg', 16),
(17, 'image-1631984932338G35-全仓.225-400x500.jpg.jpg', 17),
(18, 'image-1631985045601High-Quality-ATX-Gaming-Computer-Case-PC-Case-with-Open-Window.jpg.jpg', 18),
(19, 'image-1631985147959G35-全仓.225-400x500.jpg.jpg', 19),
(20, 'image-1631985244737High-Quality-ATX-Gaming-Computer-Case-PC-Case-with-Open-Window.jpg.jpg', 20),
(21, 'image-1631985624614pngegg (1).png.png', 21),
(22, 'image-1631985698344pngegg (1).png.png', 22),
(23, 'image-1631985801116pngegg (2).png.png', 23),
(24, 'image-1631985964680pngegg (2).png.png', 24),
(25, 'image-1631986226314pngegg (3).png.png', 25),
(26, 'image-1631986382372pngegg (4).png.png', 26),
(27, 'image-1631986429270pngegg (4).png.png', 27),
(28, 'image-1631986481953pngegg (3).png.png', 28),
(29, 'image-1631986923285pngegg (6).png.png', 31),
(30, 'image-1631987046247pngegg (5).png.png', 32),
(31, 'image-1631987170353pngegg (5).png.png', 33),
(32, 'image-1631987250238pngegg (6).png.png', 34),
(33, 'image-1631987687079pngegg (7).png.png', 35),
(34, 'image-1631987826227pngegg (8).png.png', 36),
(35, 'image-1631987940027pngegg (8).png.png', 37),
(36, 'image-1631988000036pngegg (9).png.png', 38),
(37, 'image-1631989100143pngegg (10).png.png', 39),
(38, 'image-1631989146935pngegg (10).png.png', 40),
(39, 'image-1631989196198pngegg (11).png.png', 41),
(40, 'image-1631989240325pngegg (11).png.png', 42);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `originalPrice` decimal(10,0) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `warranty` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `characteristics` varchar(1500) NOT NULL,
  `specs` varchar(1500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `brand_id`, `category_id`, `originalPrice`, `discount`, `price`, `stock`, `warranty`, `video`, `characteristics`, `specs`) VALUES
(1, 'Ordenador', 1, 5, '5000', 50, '2500', 20, '2 años', 'https://youtube.com/embed/HSseaknEv9Q', 'Incluye fuente de alimentación: No //\r\nTipo de estructura: Mid tower //\r\nPuertos: USB 3.0,USB 2.0,Audio HD //\r\nBahías: 3.5 in,2.5 in //\r\nAltura x Ancho x Largo: 480 mm x 210 mm x 440 mm //\r\nPlacas madre compatibles: ATX,Micro-ATX,Mini-ITX,E-ATX //', 'Línea: Carbide \r\nModelo: SPEC-05 // CC-9011138-WW'),
(2, 'Tarjeta gráfica', 4, 3, '25000', 20, '20000', 19, '6 meses', 'https://www.youtube.com/embed/uTwPn3JWfV4', 'Descripción del producto GTS XXX ED RX 580 8GB OC + 1386M D5 BP 3xDP HDMI DVI', 'Tipo de bus PCI-E\r\nReloj de GPU verdadero: 1366MHz, Boost OC +: 1386MHz\r\nProcesadores de flujo 2304\r\nBus de memoria de 256 bits\r\nReloj de memoria verdadero: 8.0GHz, Boost OC +: 8.1GHz\r\nTamaño de memoria 8 GB\r\nTipo de memoria DDR5\r\nPerfil de tarjeta dual\r\nDisipador de ventilador DD de solución térmica\r\nSalidas\r\nSoporte de enlace dual Y\r\nResolución máxima admitida (DIGITAL) 4096 x 2160\r\nSalida: puerto de pantalla 3\r\nSalida - HDMI 1\r\nSalida - DL-DVI-D 1\r\nCaracterísticas\r\nPuerto de pantalla listo 1.4\r\nListo para HDMI 2.0b\r\nRequisitos\r\nAlimentación externa: 8 pines 1\r\nRequisito mínimo de fuente de alimentación 500 vatios\r\nFuente de alimentación recomendada por XFX XFX 550W PSU'),
(3, 'Motherboard 22003', 1, 1, '2000', 10, '1800', 20, '6 meses', 'https://youtube.com/embed/rx71hDO-fqQ', 'Plataforma: AMD mm\r\nSocket: AM4 A-Series, AM4 APU 2da generación, AM4 APU 1ra generación, AM4 Ryzen 1ra generación, AM4 Ryzen2da generación, AM4 Ryzen 3er generación mm\r\nChipsets principal: AMD A320.', 'Conectividad: Slot Pci-e 16X (1), puertos Sata (4), salidas HDMI, salidas DVI, placa de red: gigabit LAN 10/100/1000 Mb/s, puertos USB 2.0 (2), puertos USB 3.0 (4) mm\r\nDimensiones: factor M-ATX mm\r\nEnergía: consumo de 35 w mm\r\nMemoria: slot Ddr4 (2) mm\r\nPlaca de sonido: 7.1 Realtek ALC 887.'),
(4, 'Memoria Ram ', 3, 8, '5600', NULL, '5600', 20, '4 meses', 'https://www.youtube.com/watch?v=yRNwl24l39E', 'esto es una caracteristica', 'esto es una especificacion'),
(5, 'CPU X47329', 4, 2, '7600', NULL, '6080', 20, '5 meses', 'https://www.youtube.com/embed/8NynfgRvQxQ ', 'esto es una caracteristica ', 'esto es una especificacion'),
(6, 'SSD S3300U 1TB ', 4, 4, '11000', 32, '7480', 20, '1 año', 'https://www.youtube.com/embed/EK29Weiz6_Q', 'esto es una característica ', 'Ancho: 100.5 mm\r\nAltura: 69.85 mm\r\nPeso: 32.2 g\r\nMemoria Cache: 128 mb\r\nVelocidad De Rotación: 0 RPM\r\nTasa De Transferencia: 6.0 gb/s\r\nVelocidad Lectura Secuencial 500 mb/s\r\nVelocidad Escritura Secuencial: 320 mb/s'),
(7, 'Fuente A02 600w 80 Plus Gold', 1, 6, '7500', NULL, '7500', 20, '9 meses', 'https://www.youtube.com/embed/bUh2EZzJZRU', 'esto es una característica ', 'Potencia: 600W\r\n20 + 4 Pines\r\n2 Conectores SATA\r\n2 Conectores HDD\r\n1 Conector P4\r\n1 Ventilador de 12 cm\r\nCable de 40 cm\r\n\r\n'),
(8, 'Cooler CPU x9393 ', 1, 7, '3222', NULL, '3222', 20, '2 años', 'https://www.youtube.com/embed/fACBaqxnb9k', 'Esto es una características ', 'Tamaño del Ventilador: 90mm\r\nModelo: BEK-93900 Black/White\r\nDimensiones del producto: 73 × 97 × 135 mm\r\nVelocidad: 800-1800 RPM (PWM) ± 10%\r\nConector: 4 pines (PWM)'),
(9, 'Placa de Video RGTXF 6504 6GBVram ', 1, 3, '25000', 20, '20000', 50, '2 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(10, 'Placa de Video ULTRA RGTXF 6600 12GB VRAM ', 3, 3, '80000', 0, '80000', 20, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(11, 'Placa de Video STR5020 2GB VRAM ', 3, 3, '15000', 0, '15000', 50, '6 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(12, 'Placa de Video STR7065 8GB VRAM ', 3, 3, '40000', 0, '40000', 40, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(13, 'Motherboard Z203 LGX Socket i664', 4, 1, '13000', 0, '13000', 40, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(14, 'Motherboard D155 LGY Socket i664', 3, 1, '8000', 0, '8000', 40, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(15, 'Motherboard Z300 LGX Socket i665', 3, 1, '20000', 0, '20000', 25, '2 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(16, 'Motherboard G60 STR Socket N7', 2, 1, '16000', 0, '16000', 25, '3 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(17, 'Gabinete Sirta 343H', 4, 5, '10000', 0, '10000', 50, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(18, 'Gabinete Spectre M45G', 3, 5, '12000', 0, '12000', 20, '6 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(19, 'Gabinete GGST M47', 3, 5, '8999', 0, '8999', 15, '5 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(20, 'Gabinete FF EW14 ', 3, 5, '9680', 0, '9680', 20, '4 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(21, 'CPU STR L20+ i665', 4, 2, '20000', 0, '20000', 35, '2 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(22, 'CPU STR L15 i664', 4, 2, '14000', 0, '14000', 20, '6 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(23, 'CPU DS 360KL', 4, 2, '12430', 0, '12430', 50, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(24, 'CPU DS 120KL N7', 2, 2, '11200', 0, '11200', 70, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(25, 'SSD NNS 1TB ', 4, 4, '7500', 0, '7500', 50, '9 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nibh sit amet nibh molestie, eget posuere arcu vulputate. Aliquam erat volutpat. Morbi mattis placerat dapibus. Sed ultrices mauris ut ipsum sodales ornare. Maecenas aliquam volutpat risus, in ultrices lacus auctor et. Donec ornare justo quam. Phasellus euismod lorem id tristique tempor. Mauris porta eleifend nibh eget tincidunt.'),
(26, 'SSD NVMe 2.0 JSTC 500GB ', 3, 4, '9999', 0, '9999', 26, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(27, 'SSD NVMe 2.0 JSTC 1TB', 3, 4, '12670', 0, '12670', 34, '6 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(28, 'SSD NNS 500GB ', 3, 4, '5000', 0, '5000', 40, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(31, 'Fuente A02 550w 80 Plus Gold', 2, 6, '15000', 0, '15000', 50, '2 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(32, 'Fuente CRBR GX345 750w 80+ Gold', 4, 6, '13205', 0, '13205', 26, '3 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(33, 'Fuente CRBR GX345 1200w 80+ Platinum', 1, 6, '16000', 0, '16000', 20, '4 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(34, 'Fuente PWR 450w 80 Plus Silver', 4, 6, '8600', 0, '8600', 40, '2 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(35, 'Cooler CPU D2520', 3, 7, '6000', 0, '6000', 50, '2 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(36, 'Liquid Cooler CPU KO320z 120mm', 4, 7, '18700', 0, '18700', 45, '2 años', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(37, 'Liquid Cooler CPU LGN 120mm ', 4, 7, '17999', 0, '17999', 20, '1 año', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(38, 'Cooler CPU TLI100 ', 4, 7, '6900', 0, '6900', 80, '6 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(39, 'Memoria Ram K99 8GB ', 4, 8, '6000', 0, '6000', 20, '8 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(40, 'Memoria Ram K99 16GB ', 4, 8, '11000', 0, '11000', 50, '4 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(41, 'Memoria Ram GRR 8GB', 1, 8, '6599', 0, '6599', 50, '6 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.'),
(42, 'Memoria Ram GRR 16GB', 1, 8, '12359', 0, '12359', 40, '6 meses', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia condimentum mi quis molestie. Morbi aliquet libero tellus, nec blandit purus consequat et. Nullam rhoncus fringilla congue. Donec placerat turpis turpis, a mattis quam viverra ut. Fusce pulvinar at libero at laoreet. Praesent et orci viverra, lacinia nisi in, semper odio. Aliquam at interdum mi. Etiam non ante sodales, facilisis dolor et, lacinia arcu. Phasellus mollis lacus turpis, a accumsan metus pulvinar sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a nulla eget felis mattis condimentum id in urna. Maecenas ac finibus sem.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_colors`
--

CREATE TABLE `products_colors` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products_colors`
--

INSERT INTO `products_colors` (`id`, `product_id`, `color_id`) VALUES
(1, 1, 1),
(2, 1, 3),
(5, 3, 1),
(6, 4, 5),
(7, 4, 7),
(8, 5, 2),
(9, 5, 4),
(10, 6, 1),
(11, 6, 2),
(12, 7, 5),
(13, 8, 3),
(17, 9, 1),
(18, 10, 2),
(19, 10, 1),
(20, 11, 1),
(21, 11, 3),
(22, 12, 2),
(23, 12, 1),
(24, 12, 3),
(25, 13, 1),
(26, 13, 3),
(27, 14, 2),
(28, 15, 2),
(29, 15, 1),
(30, 15, 3),
(31, 16, 2),
(32, 16, 1),
(33, 16, 3),
(34, 17, 1),
(35, 18, 2),
(36, 18, 1),
(37, 19, 1),
(38, 20, 4),
(39, 20, 2),
(40, 20, 1),
(41, 20, 3),
(42, 21, 2),
(43, 22, 1),
(44, 23, 5),
(45, 24, 2),
(46, 24, 1),
(47, 25, 1),
(48, 26, 4),
(49, 26, 1),
(50, 27, 1),
(51, 28, 1),
(53, 31, 1),
(54, 32, 1),
(55, 33, 1),
(56, 34, 1),
(57, 35, 2),
(58, 35, 1),
(59, 36, 2),
(60, 36, 1),
(61, 37, 1),
(62, 38, 4),
(63, 38, 2),
(64, 38, 1),
(65, 38, 3),
(66, 39, 4),
(67, 39, 2),
(68, 39, 1),
(69, 40, 4),
(70, 40, 2),
(71, 40, 1),
(72, 41, 2),
(73, 41, 1),
(74, 41, 3),
(75, 41, 5),
(76, 42, 2),
(77, 42, 1),
(78, 42, 3),
(79, 42, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210806230052-brands.js'),
('20210806230412-categories.js'),
('20210806230834-colors.js'),
('20210807000256-products.js'),
('20210807000420-products_colors.js'),
('20210807001259-images.js'),
('20210808201052-users.js'),
('20210809141523-carts.js'),
('20210809142828-carts_products.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(14) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(10, 'Angelica Belen', 'Dutra Ortiz', 'angiee', 'angie@matech.com', '$2a$10$vPPK3yJbWaQs1OCSsk173eg4biH1wMgfWQ8gvwFpe6MI17obCk4Fq', 'default-user.jpg'),
(11, 'Tomas', 'Test', 'tomastest', 'tomastest@gmail.com', '$2a$10$NAxzUwhvPLAQQ/fEupuRI.cGS8eMipffO0J4Tn2y7GwEDjh2E0vn2', 'default-user.jpg'),
(12, 'Juan ', 'Test', 'Juantest', 'juantest@gmail.com', '$2a$10$KpTpazeMoNwdR2iqnATXzeP9BrODsS8yQK3473x1p2QBWZGYi.3vG', 'avatar-16319930571243x.png.png'),
(13, 'Matias', 'Test', 'matiastest', 'matiastest@gmail.com', '$2a$10$vGz.gtPnS2BLMHnWvl9jaeINGisJmqFY4qRXLXB4uKvW/g4BjaBEa', 'avatar-16319931313586bf.png.png'),
(14, 'Johnny', 'Test', 'johnnytest', 'johnnytest@gmail.com', '$2a$10$f2gb2jBPxaGT5tylYWlXjuCAJhqPPWQhjewnfAf1piSopIrEn0gqC', 'avatar-163199327297071+22OLKURL.png.png'),
(15, 'Mad', 'Small', 'madsmall', 'madsmall@gmail.com', '$2a$10$Nt75e8LCUPTjDM7rDINQeOaWxnJq.8RrOIEmdw2F20xUD6eiXn9a2', 'avatar-16319933944596769e9b5f78feb862c03da1eac6ebd3887fbbc18_400_400.jpg.jpg'),
(16, 'Happy', 'Dog', 'happydog', 'happydog@gmail.com', '$2a$10$k.poWuDklbpTOwv9Tl00AeNYns6IgCaUpFNIGJR3w9kcYpmvMRmES', 'avatar-1631993460948450_1000.jpeg.jpeg'),
(17, 'Hat', 'Kid', 'hatkid', 'hatkid@gmail.com', '$2a$10$wLdMpzFf.VLyVgLbt03lfOe0if95rrBG01AspPgg93d5SenYMR7nu', 'avatar-1631993645171042a5f1cab2d1ccf90e879dc5592576a.jpg.jpg'),
(18, 'Digi', 'Test', 'digitest', 'digitest@gmail.com', '$2a$10$NplU6VbAA0Ap0OAP28CByOBbxRHSGlGo6oquFotur/Qvlze3VCmeC', 'avatar-1631994851553Agumon.jpg.jpg'),
(19, 'Otro', 'Test', 'otrotest', 'otrotest@gmail.com', '$2a$10$32cCnJkFw.3JGqj.0QIsjObxeXE5OkOHU8YuYRLXYDowaGRl6csYC', 'avatar-1631994927745MV5BMTMyNzQxMjc3OF5BMl5BanBnXkFtZTcwNjQ4MTI2NQ@@._V1_.jpg.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `cart_products`
--
ALTER TABLE `cart_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `products_colors`
--
ALTER TABLE `products_colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `color_id` (`color_id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cart_products`
--
ALTER TABLE `cart_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `products_colors`
--
ALTER TABLE `products_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `cart_products`
--
ALTER TABLE `cart_products`
  ADD CONSTRAINT `cart_products_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `products_colors`
--
ALTER TABLE `products_colors`
  ADD CONSTRAINT `products_colors_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `products_colors_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
