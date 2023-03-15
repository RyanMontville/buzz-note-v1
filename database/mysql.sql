-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 15, 2023 at 02:35 PM
-- Server version: 10.5.15-MariaDB-0+deb11u1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bees`
--

-- --------------------------------------------------------

--
-- Table structure for table `average`
--

CREATE TABLE IF NOT EXISTS `average` (
  `avg_id` int(11) NOT NULL AUTO_INCREMENT,
  `inspection_id` int(11) NOT NULL,
  `box_number` int(11) NOT NULL,
  `honey` varchar(50) NOT NULL,
  `nectar` varchar(50) NOT NULL,
  `brood` varchar(50) NOT NULL,
  `cells` varchar(50) NOT NULL,
  `comb_pattern` varchar(50) NOT NULL,
  `queen_spotted` varchar(50) NOT NULL,
  PRIMARY KEY (`avg_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `frame`
--

CREATE TABLE IF NOT EXISTS `frame` (
  `frame_id` int(11) NOT NULL AUTO_INCREMENT,
  `inspection_id` int(11) NOT NULL,
  `box_number` int(11) NOT NULL,
  `frame_name` varchar(5) NOT NULL,
  `comb_pattern` varchar(20) NOT NULL,
  `honey` varchar(20) NOT NULL,
  `nectar` varchar(20) NOT NULL,
  `brood` varchar(50) NOT NULL,
  `queen_spotted` tinyint(1) NOT NULL,
  `cells` varchar(50) NOT NULL,
  PRIMARY KEY (`frame_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `inspection`
--

CREATE TABLE `inspection` (
  `inspection_id` int(11) NOT NULL,
  `inspection_date` varchar(20) NOT NULL,
  `start_time` varchar(20) NOT NULL,
  `weather_temp` int(11) NOT NULL,
  `weather_condition` varchar(20) DEFAULT NULL,
  `bee_temperament` varchar(20) DEFAULT NULL,
  `bee_population` varchar(20) DEFAULT NULL,
  `drone_population` varchar(20) DEFAULT NULL,
  `laying_pattern` varchar(20) DEFAULT NULL,
  `hive_beetles` varchar(20) DEFAULT NULL,
  `other_pests` varchar(20) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `box_three` varchar(50) DEFAULT NULL,
  `box_two` varchar(50) DEFAULT NULL,
  `box_one` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `average`
--
ALTER TABLE `average`
  ADD PRIMARY KEY (`avg_id`),
  ADD KEY `avg-inspection_Id` (`inspection_id`);

--
-- Indexes for table `frame`
--
ALTER TABLE `frame`
  ADD PRIMARY KEY (`frame_id`),
  ADD KEY `frame-inspection_Id` (`inspection_id`);

--
-- Indexes for table `inspection`
--
ALTER TABLE `inspection`
  ADD PRIMARY KEY (`inspection_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `average`
--
ALTER TABLE `average`
  ADD CONSTRAINT `avg-inspection_Id` FOREIGN KEY (`inspection_id`) REFERENCES `inspection` (`inspection_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `frame`
--
ALTER TABLE `frame`
  ADD CONSTRAINT `frame-inspection_Id` FOREIGN KEY (`inspection_id`) REFERENCES `inspection` (`inspection_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
