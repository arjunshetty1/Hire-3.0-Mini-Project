CREATE TABLE `company` (
  `idCompany` int NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(255) NOT NULL,
  `Requirements` mediumtext NOT NULL,
  `Website` varchar(255) NOT NULL,
  `CEmail` varchar(45) NOT NULL,
  `Phone` bigint NOT NULL,
  `CSkills` text NOT NULL,
  `Package` varchar(45) NOT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`idCompany`),
  UNIQUE KEY `CEmail_UNIQUE` (`CEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `developers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Dname` varchar(45) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` bigint NOT NULL,
  `LinkedIn` varchar(255) NOT NULL,
  `Github` varchar(255) NOT NULL,
  `Education` mediumtext NOT NULL,
  `Skills` varchar(255) NOT NULL,
  `Experience` int NOT NULL,
  `Availability` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL DEFAULT 'abcd',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `test` (
  `TestID` int NOT NULL AUTO_INCREMENT,
  `Score` int DEFAULT NULL,
  `DevID` int NOT NULL,
  PRIMARY KEY (`TestID`),
  KEY `DevID_idx` (`DevID`),
  CONSTRAINT `DevID` FOREIGN KEY (`DevID`) REFERENCES `developers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `admin` (
  `AdminID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`AdminID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `shortlisted` (
  `CEmail` varchar(45) NOT NULL,
  `DEmail` varchar(45) NOT NULL,
  KEY `CEmail_idx` (`CEmail`),
  KEY `DEmail_idx` (`DEmail`),
  CONSTRAINT `CEmail` FOREIGN KEY (`CEmail`) REFERENCES `company` (`CEmail`),
  CONSTRAINT `DEmail` FOREIGN KEY (`DEmail`) REFERENCES `developers` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
