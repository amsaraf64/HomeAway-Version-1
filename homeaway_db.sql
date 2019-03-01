-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2018 at 10:04 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homeaway_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `homeaway_propertytable`
--

CREATE TABLE `homeaway_propertytable` (
  `pid` int(10) NOT NULL,
  `emailid` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `headline` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `bedroom` float NOT NULL,
  `accomodates` int(10) NOT NULL,
  `bathroom` float NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `baserate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `homeaway_propertytable`
--

INSERT INTO `homeaway_propertytable` (`pid`, `emailid`, `address`, `headline`, `type`, `description`, `bedroom`, `accomodates`, `bathroom`, `startdate`, `enddate`, `baserate`) VALUES
(1, '', 'home', '', '', '', 0, 0, 0, '0000-00-00', '0000-00-00', 0),
(11, 'c', 'a', 'h', 'p', 'd', 0, 0, 0, '2018-01-01', '2018-02-01', 100);

-- --------------------------------------------------------

--
-- Table structure for table `homeaway_usertable`
--

CREATE TABLE `homeaway_usertable` (
  `userid` int(20) NOT NULL,
  `emailid` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `aboutme` varchar(50) DEFAULT NULL,
  `citycountry` varchar(50) DEFAULT NULL,
  `company` varchar(50) DEFAULT NULL,
  `hometown` varchar(50) DEFAULT NULL,
  `languages` varchar(50) DEFAULT NULL,
  `school` varchar(50) NOT NULL,
  `gender` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `homeaway_usertable`
--

INSERT INTO `homeaway_usertable` (`userid`, `emailid`, `password`, `firstname`, `lastname`, `aboutme`, `citycountry`, `company`, `hometown`, `languages`, `school`, `gender`) VALUES
(1, 'admin', 'admin', 'amruta', 'saraf', 'Something else about me', 'B', 'C', 'E', 'F', 'D', NULL),
(5, 'sanj@gmail.com', 'sanj', 'Sanjna', 'Dhamejani', NULL, NULL, NULL, NULL, NULL, '', NULL),
(6, 'c', 'd', 'a', 'b', 'I am awesome', 'Nashik, India', NULL, NULL, NULL, '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `homeaway_propertytable`
--
ALTER TABLE `homeaway_propertytable`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `homeaway_usertable`
--
ALTER TABLE `homeaway_usertable`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `homeaway_propertytable`
--
ALTER TABLE `homeaway_propertytable`
  MODIFY `pid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `homeaway_usertable`
--
ALTER TABLE `homeaway_usertable`
  MODIFY `userid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
