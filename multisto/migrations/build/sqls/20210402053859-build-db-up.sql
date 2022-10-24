-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: testdb
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `InvestorBalancesInCompanyAccounts`
--

ALTER DATABASE CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `InvestorBalancesInCompanyAccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InvestorBalancesInCompanyAccounts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `investorID` int DEFAULT NULL,
  `currencyID` int DEFAULT NULL,
  `Amount` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InvestorBalancesInCompanyAccounts`
--

LOCK TABLES `InvestorBalancesInCompanyAccounts` WRITE;
/*!40000 ALTER TABLE `InvestorBalancesInCompanyAccounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `InvestorBalancesInCompanyAccounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InvestorBuyPropertyAlert`
--

DROP TABLE IF EXISTS `InvestorBuyPropertyAlert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InvestorBuyPropertyAlert` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `investorID` int DEFAULT NULL,
  `Shares` int DEFAULT NULL,
  `ShareTypeID` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `Details` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateReceived` datetime DEFAULT NULL,
  `isSubScriptionFormSigned` int DEFAULT '0',
  `SubScriptionFormPath` varchar(256) DEFAULT NULL,
  `SubScriptionFormContents` mediumtext,
  `publickey` varchar(100) DEFAULT NULL,
  `isblockchain` tinyint(1) DEFAULT NULL,
  `isBuySharesFormSigned` tinyint(1) DEFAULT '0',
  `BuySharesFormPath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InvestorBuyPropertyAlert`
--

LOCK TABLES `InvestorBuyPropertyAlert` WRITE;
/*!40000 ALTER TABLE `InvestorBuyPropertyAlert` DISABLE KEYS */;
/*!40000 ALTER TABLE `InvestorBuyPropertyAlert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InvestorDepositReceivedAlert`
--

DROP TABLE IF EXISTS `InvestorDepositReceivedAlert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InvestorDepositReceivedAlert` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `investorID` int DEFAULT NULL,
  `isApproved` int DEFAULT NULL,
  `storid` int DEFAULT NULL,
  `DateReceived` datetime DEFAULT NULL,
  `ChannelID` int DEFAULT NULL,
  `Amount` int DEFAULT NULL,
  `Details` varchar(2000) DEFAULT NULL,
  `DateApproved` datetime DEFAULT NULL,
  `ApprovedByUserID` int DEFAULT NULL,
  `runningBalance` int DEFAULT '0',
  `currencyID` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InvestorDepositReceivedAlert`
--

LOCK TABLES `InvestorDepositReceivedAlert` WRITE;
/*!40000 ALTER TABLE `InvestorDepositReceivedAlert` DISABLE KEYS */;
/*!40000 ALTER TABLE `InvestorDepositReceivedAlert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PropertyFiles`
--

DROP TABLE IF EXISTS `PropertyFiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PropertyFiles` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Details` varchar(2000) DEFAULT NULL,
  `Title` varchar(400) DEFAULT NULL,
  `Link` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PropertyFiles`
--

LOCK TABLES `PropertyFiles` WRITE;
/*!40000 ALTER TABLE `PropertyFiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `PropertyFiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activitytype`
--

DROP TABLE IF EXISTS `activitytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activitytype` (
  `ID` int NOT NULL,
  `Activity` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activitytype`
--

LOCK TABLES `activitytype` WRITE;
/*!40000 ALTER TABLE `activitytype` DISABLE KEYS */;
INSERT INTO `activitytype` VALUES (1,'System User Created'),(2,'System User Login Authorization'),(4,'System User Modified'),(5,'Shares Transferred'),(6,'Investor Authorization'),(7,'Company Shares Created'),(8,'Investor Approved'),(9,'Investor KYC Document Update'),(10,'Company Shares Removed'),(11,'Investor Shares Tokenover'),(12,'Investor New Address Approved'),(13,'Investor New Address Whitelisted'),(14,'Investor New Address Denied'),(16,'Bulk Email Send'),(15,'News Item Created');
/*!40000 ALTER TABLE `activitytype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_parameters`
--

DROP TABLE IF EXISTS `app_parameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_parameters` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `Param` varchar(255) NOT NULL,
  `ValueString` varchar(255) NOT NULL,
  `ValueInt` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_parameters`
--

LOCK TABLES `app_parameters` WRITE;
/*!40000 ALTER TABLE `app_parameters` DISABLE KEYS */;
INSERT INTO `app_parameters` VALUES (66,1,'Total Token','',100000),(67,1,'Distribution','0xcF1Ee43b7A7E3D9a4C948acF894F26c118278d94',94600),(68,1,'Token','DigiShares',0),(69,1,'NonBlockchainSharesTotal','',10100),(71,1,'NonBlockchainDistribution','',6090),(79,2,'Token','Medtronics',0),(78,2,'Distribution','0xcF1Ee43b7A7E3D9a4C948acF894F26c118278d94',100000),(77,2,'Total Token','',100000),(80,2,'NonBlockchainSharesTotal','',1000),(81,2,'NonBlockchainDistribution','',600),(93,3,'NonBlockchainDistribution','',9810),(92,3,'NonBlockchainSharesTotal','',10000),(91,3,'Token','Youandx',0),(90,3,'Distribution','',0),(89,3,'Total Token','',0);
/*!40000 ALTER TABLE `app_parameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brokerrights`
--

DROP TABLE IF EXISTS `brokerrights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brokerrights` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `brokerID` int DEFAULT '0',
  `stoid` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brokerrights`
--

LOCK TABLES `brokerrights` WRITE;
/*!40000 ALTER TABLE `brokerrights` DISABLE KEYS */;
/*!40000 ALTER TABLE `brokerrights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brokers`
--

DROP TABLE IF EXISTS `brokers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brokers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `twofactorenable` tinyint(1) DEFAULT '0',
  `email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brokers`
--

LOCK TABLES `brokers` WRITE;
/*!40000 ALTER TABLE `brokers` DISABLE KEYS */;
/*!40000 ALTER TABLE `brokers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bulkemails`
--

DROP TABLE IF EXISTS `bulkemails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bulkemails` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `hostname` varchar(2000) DEFAULT NULL,
  `title` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `typeOfQuery` int DEFAULT NULL,
  `InvestorsSelectionSQL` varchar(2000) DEFAULT NULL,
  `BulkEmailsCommaSeperated` mediumtext,
  `emailText` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fromEmail` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bulkemails`
--

LOCK TABLES `bulkemails` WRITE;
/*!40000 ALTER TABLE `bulkemails` DISABLE KEYS */;
/*!40000 ALTER TABLE `bulkemails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `changeaddresserequest`
--

DROP TABLE IF EXISTS `changeaddresserequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changeaddresserequest` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `InvestorID` int NOT NULL,
  `PublicKey` varchar(256) DEFAULT NULL,
  `Tokens` int NOT NULL,
  `isActivated` tinyint(1) NOT NULL DEFAULT '0',
  `ActivatedDate` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_changeaddresserequest_investor` (`InvestorID`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changeaddresserequest`
--

LOCK TABLES `changeaddresserequest` WRITE;
/*!40000 ALTER TABLE `changeaddresserequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `changeaddresserequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `changepassword`
--

DROP TABLE IF EXISTS `changepassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changepassword` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `date` date NOT NULL,
  `securelink` varchar(1000) NOT NULL,
  `securecode` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changepassword`
--

LOCK TABLES `changepassword` WRITE;
/*!40000 ALTER TABLE `changepassword` DISABLE KEYS */;
INSERT INTO `changepassword` VALUES (45,215,'2020-12-19','xy8QLkCzBsASNczviFZKPdkF9LwJemaK2vfwWq908fLeTQu6rV','98843');
/*!40000 ALTER TABLE `changepassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `closedaccounts`
--

DROP TABLE IF EXISTS `closedaccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `closedaccounts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `InvestorID` int NOT NULL,
  `DateClosed` date DEFAULT NULL,
  `CaseTitle` varchar(400) DEFAULT NULL,
  `CaseDetails` varchar(4000) DEFAULT NULL,
  `CaseNotes` varchar(4000) DEFAULT NULL,
  `CaseFilePath` varchar(200) DEFAULT NULL,
  `tokens` int NOT NULL,
  `isPartial` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `fk_closedaccounts_investor` (`InvestorID`)
) ENGINE=MyISAM AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `closedaccounts`
--

LOCK TABLES `closedaccounts` WRITE;
/*!40000 ALTER TABLE `closedaccounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `closedaccounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `InvestorID` int NOT NULL,
  `DateOffered` date DEFAULT NULL,
  `ContractTitle` varchar(400) DEFAULT NULL,
  `ContractDetails` varchar(4000) DEFAULT NULL,
  `DateSigned` date DEFAULT NULL,
  `UserID` int NOT NULL,
  `CurrentStatus` int NOT NULL,
  `ContractFilePath` varchar(200) DEFAULT NULL,
  `SignedFilePath` varchar(200) DEFAULT NULL,
  `contractid` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=293 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency` (
  `ID` int NOT NULL,
  `Country` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Currency` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Abbreviation` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Symbol` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (2,'Europe','Euro','EUR','€'),(3,'Great Britain','Pound','GBP','£'),(1,'USA','Dollar','USD','$'),(4,'Swizerland','CHF','CHF','CHF'),(5,'Pakistan','Rupee','Rs','Rs'),(6,'South African','South African Rand','ZAR','R');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dividend`
--

DROP TABLE IF EXISTS `dividend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dividend` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(400) DEFAULT NULL,
  `stoid` int DEFAULT NULL,
  `adminid` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `Details` varchar(2000) DEFAULT NULL,
  `DateReport` datetime DEFAULT NULL,
  `totalamount` decimal(14,3) DEFAULT '0.000',
  `investorTotalShares` decimal(14,3) DEFAULT '0.000',
  `companyTotalShares` decimal(14,3) DEFAULT '0.000',
  `totalInvestors` int DEFAULT '0',
  `currencyid` int DEFAULT NULL,
  `payouttype` smallint DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dividend`
--

LOCK TABLES `dividend` WRITE;
/*!40000 ALTER TABLE `dividend` DISABLE KEYS */;
/*!40000 ALTER TABLE `dividend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dividendreceivers`
--

DROP TABLE IF EXISTS `dividendreceivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dividendreceivers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `dividendid` int DEFAULT NULL,
  `investorid` int DEFAULT NULL,
  `shares` decimal(14,3) DEFAULT '0.000',
  `amounttopaid` decimal(14,3) DEFAULT '0.000',
  `status` int DEFAULT NULL,
  `Details` varchar(2000) DEFAULT NULL,
  `BankPaidDetails` varchar(2000) DEFAULT NULL,
  `CryptoPaidDetails` varchar(2000) DEFAULT NULL,
  `DatePaid` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dividendreceivers`
--

LOCK TABLES `dividendreceivers` WRITE;
/*!40000 ALTER TABLE `dividendreceivers` DISABLE KEYS */;
/*!40000 ALTER TABLE `dividendreceivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doclinks`
--

DROP TABLE IF EXISTS `doclinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doclinks` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `isEnabled` tinyint DEFAULT NULL,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `secret` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doclinks`
--

LOCK TABLES `doclinks` WRITE;
/*!40000 ALTER TABLE `doclinks` DISABLE KEYS */;
/*!40000 ALTER TABLE `doclinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doclinksdocuments`
--

DROP TABLE IF EXISTS `doclinksdocuments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doclinksdocuments` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DocLinksID` int NOT NULL,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `dateuploaded` date DEFAULT NULL,
  `details` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `files` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isNew` tinyint DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doclinksdocuments`
--

LOCK TABLES `doclinksdocuments` WRITE;
/*!40000 ALTER TABLE `doclinksdocuments` DISABLE KEYS */;
/*!40000 ALTER TABLE `doclinksdocuments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docu_sign_sto_contracts`
--

DROP TABLE IF EXISTS `docu_sign_sto_contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docu_sign_sto_contracts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `investor_id` int DEFAULT '0',
  `docusign_contract_signed_id` varchar(256) DEFAULT NULL,
  `is_docusign_contract_signed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docu_sign_sto_contracts`
--

LOCK TABLES `docu_sign_sto_contracts` WRITE;
/*!40000 ALTER TABLE `docu_sign_sto_contracts` DISABLE KEYS */;
/*!40000 ALTER TABLE `docu_sign_sto_contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentcomments`
--

DROP TABLE IF EXISTS `documentcomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentcomments` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `documentid` int DEFAULT NULL,
  `comment` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `investorid` int DEFAULT NULL,
  `datecomment` datetime DEFAULT NULL,
  `reply` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `replybyid` int DEFAULT '-1',
  `datereplycomment` date DEFAULT NULL,
  `isaccepted` tinyint(1) DEFAULT '0',
  `isnew` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentcomments`
--

LOCK TABLES `documentcomments` WRITE;
/*!40000 ALTER TABLE `documentcomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentcomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentdirectories`
--

DROP TABLE IF EXISTS `documentdirectories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentdirectories` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `stoid` int DEFAULT NULL,
  `parentid` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentdirectories`
--

LOCK TABLES `documentdirectories` WRITE;
/*!40000 ALTER TABLE `documentdirectories` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentdirectories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentfields`
--

DROP TABLE IF EXISTS `documentfields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentfields` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fieldtype` int DEFAULT NULL,
  `stoid` int DEFAULT NULL,
  `documentid` int DEFAULT NULL,
  `fieldid` varchar(80) DEFAULT NULL,
  `fieldhelpertext` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentfields`
--

LOCK TABLES `documentfields` WRITE;
/*!40000 ALTER TABLE `documentfields` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentfields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentfieldvalues`
--

DROP TABLE IF EXISTS `documentfieldvalues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentfieldvalues` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `fieldid` int DEFAULT NULL,
  `documentid` int DEFAULT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentfieldvalues`
--

LOCK TABLES `documentfieldvalues` WRITE;
/*!40000 ALTER TABLE `documentfieldvalues` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentfieldvalues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentofferinvestor`
--

DROP TABLE IF EXISTS `documentofferinvestor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentofferinvestor` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `documentid` int DEFAULT NULL,
  `DateFrom` datetime DEFAULT NULL,
  `DataTo` datetime DEFAULT NULL,
  `contents` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `documentOffetType` int DEFAULT NULL,
  `investorStatusID` int DEFAULT NULL,
  `InvestorsName` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentofferinvestor`
--

LOCK TABLES `documentofferinvestor` WRITE;
/*!40000 ALTER TABLE `documentofferinvestor` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentofferinvestor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `contents` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `stoid` int DEFAULT NULL,
  `directoryid` int DEFAULT NULL,
  `isactiveforinvestors` tinyint(1) NOT NULL DEFAULT '0',
  `filetype` tinyint(1) DEFAULT '0',
  `offerID` int NOT NULL DEFAULT '0',
  `isactiveforinvestorsType` int DEFAULT NULL,
  `isactiveforinvestorsNames` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentuser`
--

DROP TABLE IF EXISTS `documentuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentuser` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `contents` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `investorID` int DEFAULT NULL,
  `stoid` int DEFAULT NULL,
  `directoryid` int DEFAULT NULL,
  `documentid` int NOT NULL,
  `DocumentStatus` int NOT NULL,
  `fieldValuesJson` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `documentofferinvestorid` int NOT NULL,
  `signaturefilepath` varchar(300) DEFAULT NULL,
  `signaturedate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentuser`
--

LOCK TABLES `documentuser` WRITE;
/*!40000 ALTER TABLE `documentuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchangeoffers`
--

DROP TABLE IF EXISTS `exchangeoffers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exchangeoffers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `exchangeOrderID` int NOT NULL,
  `investorID` int DEFAULT NULL,
  `sharesPartial` decimal(14,3) DEFAULT '0.000',
  `rateFrom` decimal(14,3) DEFAULT '0.000',
  `rateTo` decimal(14,3) DEFAULT '0.000',
  `offerDescription` varchar(2000) DEFAULT NULL,
  `atomicSwapAccepted` tinyint(1) DEFAULT NULL,
  `atomicSwapSecret` varchar(256) DEFAULT NULL,
  `atomicBuyerPublicKey` varchar(256) DEFAULT NULL,
  `atomicSwapExpireData` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchangeoffers`
--

LOCK TABLES `exchangeoffers` WRITE;
/*!40000 ALTER TABLE `exchangeoffers` DISABLE KEYS */;
/*!40000 ALTER TABLE `exchangeoffers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchangeorders`
--

DROP TABLE IF EXISTS `exchangeorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exchangeorders` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `type` tinyint DEFAULT '0',
  `investorID` int DEFAULT NULL,
  `dateFrom` date DEFAULT NULL,
  `dateTo` date DEFAULT NULL,
  `sharesTypeID` int DEFAULT NULL,
  `shares` decimal(14,3) DEFAULT '0.000',
  `rateFrom` decimal(14,3) DEFAULT '0.000',
  `rateTo` decimal(14,3) DEFAULT '0.000',
  `description` varchar(4000) DEFAULT NULL,
  `atomicSwapCurrentStatus` int DEFAULT NULL,
  `atomicSwapExchangeOffersID` int DEFAULT NULL,
  `atomicSwapAcceptable` tinyint(1) DEFAULT '0',
  `atomicSwapTokenAddressAcceptable` varchar(256) DEFAULT NULL,
  `atomicSwapSharesWalletID` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchangeorders`
--

LOCK TABLES `exchangeorders` WRITE;
/*!40000 ALTER TABLE `exchangeorders` DISABLE KEYS */;
/*!40000 ALTER TABLE `exchangeorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inbox`
--

DROP TABLE IF EXISTS `inbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inbox` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `InvestorID` int NOT NULL,
  `Title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Details` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateEmail` date DEFAULT NULL,
  `isResponded` tinyint(1) NOT NULL DEFAULT '0',
  `Response` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResponseDate` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_inbox_investor` (`InvestorID`)
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inbox`
--

LOCK TABLES `inbox` WRITE;
/*!40000 ALTER TABLE `inbox` DISABLE KEYS */;
/*!40000 ALTER TABLE `inbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investments`
--

DROP TABLE IF EXISTS `investments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investments` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `UserID` int NOT NULL,
  `InvestorID` int NOT NULL,
  `TokensTransferred` decimal(14,3) DEFAULT '0.000',
  `AmountInvested` int NOT NULL,
  `CurrencyID` int NOT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sharetypeid` int NOT NULL,
  `DateTime` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_investmentsusers` (`UserID`),
  KEY `fk_investmentinvestor` (`InvestorID`),
  KEY `fk_investmentcurrency` (`CurrencyID`)
) ENGINE=MyISAM AUTO_INCREMENT=954 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investments`
--

LOCK TABLES `investments` WRITE;
/*!40000 ALTER TABLE `investments` DISABLE KEYS */;
/*!40000 ALTER TABLE `investments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investor`
--

DROP TABLE IF EXISTS `investor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investor` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cell` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `town` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Password` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `PassportNumber` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NationalID` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiveEmails` tinyint(1) DEFAULT '0',
  `kinname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kinphone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kinemail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `investorType` int NOT NULL DEFAULT '0',
  `CompanyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TitleWithinCompany` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `PowerToBindCompany` tinyint(1) DEFAULT '0',
  `DOB` date DEFAULT NULL,
  `twofactorenable` tinyint(1) DEFAULT '0',
  `investorBulkUploadStatus` tinyint(1) DEFAULT '0',
  `language` varchar(20) DEFAULT 'en',
  `MiddleName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SocialSecurity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MailingAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FaxNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MaritalStatus` int DEFAULT '0',
  `Occupation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmployerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmployerAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RetirementAccount` int DEFAULT '0',
  `TrustOrBusinessEntity` int DEFAULT '0',
  `DateIncorporation` date DEFAULT NULL,
  `TaxIDNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GovtIDNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GovtIDNoIsTaxNo` int DEFAULT '0',
  `NameSecondaryContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhoneSecondaryContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmailSecondaryContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NamePrimaryContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhonePrimaryContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmailPrimaryContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PrincipalCountryOfBusiness` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryOfCitizenship` varchar(256) DEFAULT NULL,
  `referByInvestorID` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=493 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investor`
--

LOCK TABLES `investor` WRITE;
/*!40000 ALTER TABLE `investor` DISABLE KEYS */;
INSERT INTO `investor` VALUES (492,'Shahzad','AslamYou','94 Hall Garden, Jamesfort, SG541','United Kingdom','30030303','','43434','Lahore','Punjab','fa5bce0d8d814125b75f90763465a53c971d06cf6044fd4203f3663525db50ac','shahzad73@hotmail.com','BB1223','NA1111',1,'Shahzad AslamYou','','',0,'','',0,'2021-01-21',0,0,'en',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `investor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investordocuments`
--

DROP TABLE IF EXISTS `investordocuments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investordocuments` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `InvestorID` varchar(255) DEFAULT NULL,
  `DocumentTitle` varchar(255) NOT NULL,
  `UploadDate` date DEFAULT NULL,
  `Link` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_investordocumentsinvestor` (`InvestorID`)
) ENGINE=MyISAM AUTO_INCREMENT=412 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investordocuments`
--

LOCK TABLES `investordocuments` WRITE;
/*!40000 ALTER TABLE `investordocuments` DISABLE KEYS */;
INSERT INTO `investordocuments` VALUES (411,0,'492','Proof of Address 0','2021-01-19','verifiedkycdocs/6075256b140b3-efa5-4a68-8232-8915a72df345.GIF'),(410,0,'492','Proof of Identity 0','2021-01-19','verifiedkycdocs/6297405578bdb-f540-4562-9372-7a3e8bd1b06a.jpg');
/*!40000 ALTER TABLE `investordocuments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investorinvitation`
--

DROP TABLE IF EXISTS `investorinvitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investorinvitation` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `FirstName` varchar(200) DEFAULT NULL,
  `LastName` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `emailtext` mediumtext NOT NULL,
  `city` varchar(200) DEFAULT NULL,
  `country` varchar(200) DEFAULT NULL,
  `currentStatus` tinyint DEFAULT '0',
  `investorID` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investorinvitation`
--

LOCK TABLES `investorinvitation` WRITE;
/*!40000 ALTER TABLE `investorinvitation` DISABLE KEYS */;
/*!40000 ALTER TABLE `investorinvitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investorpublickeys`
--

DROP TABLE IF EXISTS `investorpublickeys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investorpublickeys` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `investorID` int DEFAULT '0',
  `title` varchar(100) DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investorpublickeys`
--

LOCK TABLES `investorpublickeys` WRITE;
/*!40000 ALTER TABLE `investorpublickeys` DISABLE KEYS */;
/*!40000 ALTER TABLE `investorpublickeys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investorsto`
--

DROP TABLE IF EXISTS `investorsto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investorsto` (
  `investorid` int NOT NULL DEFAULT '0',
  `isAccountClosed` tinyint DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `stoid` int NOT NULL,
  `expectedShares` int NOT NULL DEFAULT '0',
  `expectedInvestment` int NOT NULL DEFAULT '0',
  `isKYC` tinyint(1) NOT NULL DEFAULT '0',
  `KYCApplied` tinyint(1) NOT NULL DEFAULT '0',
  `KYCUpdateDate` date DEFAULT NULL,
  `KYCCurrentStatus` int NOT NULL DEFAULT '0',
  `inviteFriendEmailText` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `UsufructuariesFirstName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `UsufructuariesLastName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `UsufructuariesAddress` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `UsufructuariesCity` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `UsufructuariesCountry` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `UsufructuariesEmail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `BeneificalFirstName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `BeneificalLastName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `BeneificalAddress` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `BeneificalCity` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `BeneificalCountry` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `BeneificalEmail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `BeneificalDOB` date DEFAULT NULL,
  `BeneificalNationality` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isUsufructuary` tinyint(1) NOT NULL DEFAULT '0',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `dividendbank` varchar(4000) DEFAULT NULL,
  `dividendcrypto` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=380 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investorsto`
--

LOCK TABLES `investorsto` WRITE;
/*!40000 ALTER TABLE `investorsto` DISABLE KEYS */;
INSERT INTO `investorsto` VALUES (492,0,379,0,0,0,1,0,'2021-01-19',1,NULL,'','','','','','','','','','','','',NULL,'',0,1,'',NULL,NULL),(491,0,378,1,0,0,0,0,'2021-01-19',0,NULL,'','','','','','','','','','','','',NULL,'',0,1,NULL,NULL,NULL),(490,0,377,1,0,0,0,0,'2021-01-19',0,NULL,'','','','','','','','','','','','',NULL,'',0,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `investorsto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kyc`
--

DROP TABLE IF EXISTS `kyc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kyc` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `InvestorID` int NOT NULL,
  `appliedFor` int DEFAULT NULL,
  `kyc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`),
  KEY `fk_kycinvestor` (`InvestorID`)
) ENGINE=MyISAM AUTO_INCREMENT=255 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kyc`
--

LOCK TABLES `kyc` WRITE;
/*!40000 ALTER TABLE `kyc` DISABLE KEYS */;
INSERT INTO `kyc` VALUES (254,492,NULL,'{\"IDDoc\":{\"fileID\":[\"05578bdb-f540-4562-9372-7a3e8bd1b06a.jpg\"],\"fileAddress\":[\"56b140b3-efa5-4a68-8232-8915a72df345.GIF\"]}}'),(253,491,NULL,'{}'),(252,490,NULL,'{}');
/*!40000 ALTER TABLE `kyc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `LogDate` date DEFAULT NULL,
  `Description` text,
  `InvestorID` int DEFAULT NULL,
  `ActivityType` int NOT NULL,
  `recid` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `fk_logsinvestor` (`InvestorID`),
  KEY `fk_logsusers` (`UserID`)
) ENGINE=MyISAM AUTO_INCREMENT=2595 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (2594,0,61,'2021-01-19','Investor Authorized as Normal',492,8,0),(2593,-1,61,'2021-01-19','System User ID 61 (admin 12) Record Modified',-1,4,0),(2591,-1,61,'2021-01-19','New System User Created',-1,1,0),(2592,-1,61,'2021-01-19','System User id 84 Activated',-1,2,0);
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `params`
--

DROP TABLE IF EXISTS `params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `params` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `param` varchar(100) DEFAULT NULL,
  `isglobal` tinyint DEFAULT NULL,
  `datatype` tinyint DEFAULT NULL,
  `stringValue` varchar(10000) DEFAULT NULL,
  `intValue` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `params`
--

LOCK TABLES `params` WRITE;
/*!40000 ALTER TABLE `params` DISABLE KEYS */;
INSERT INTO `params` VALUES (1,'SingleSignInEnabled',1,2,'',1),(2,'RecordsPerPaging',1,2,'',70),(3,'SingleSignInLoginURL',1,1,'http://testingserver.com:3001/platform/login',0),(5,'stoTypes',0,1,'[{\"id\": 0,\"value\": \"Company with Tokenized / Non-Tokenized Share Classes\"}, {\"id\": 1,\"value\": \"Company with Tokenized Share Classes\"}, {\"id\": 2,\"value\": \"Company with Non-Tokenized Share Classes\"}]',0),(6,'stoinvestortypes',0,1,'[1,3,7]',0),(7,'stoinvestortypesnotonshareregister',0,1,'[7]',0),(8,'steps',0,1,'{\"completePage\":\"completestep\",\"errorPage\":\"errorstep\",\"steps\":[{\"liID\":\"investorInfo\",\"SideTitle\":\"1 - Personal Info\",\"icon\":\"ti-layout-grid2\",\"pageTemplate\":\"paciostep0\",\"stepLink\":\"wizard?step=0\",\"isDocumentUploading\":0},{\"liID\":\"kycamount\",\"SideTitle\":\"2 - Investment\",\"icon\":\"ti-money\",\"pageTemplate\":\"paciostep1\",\"stepLink\":\"wizard?step=1\",\"isDocumentUploading\":0,\"Variables\":[{\"name\":\"TotalAmount\",\"type\":\"string\",\"length\":\"10\",\"mandatory\":0},{\"name\":\"Currency\",\"type\":\"string\",\"length\":\"10\",\"mandatory\":1},{\"name\":\"investorType\",\"type\":\"string\",\"length\":\"10\",\"mandatory\":1}]},{\"liID\":\"IDDoc\",\"SideTitle\":\"3 - Upload/Submit\",\"icon\":\"ti-upload\",\"pageTemplate\":\"step2\",\"stepLink\":\"wizard?step=2\",\"isDocumentUploading\":1,\"Variables\":[{\"name\":\"fileID\",\"type\":\"file\",\"length\":\"-\"},{\"name\":\"fileAddress\",\"type\":\"file\",\"length\":\"-\"}]}]}',0),(45,'LocalHttpsStart',1,2,'',0),(9,'settings',0,1,'{ \"InvestorCategory\": { \"0\": \"Natural Person\", \"1\":\"Legal Entity\" }, \"isInternalExchangeEnabled\": 1, \"favicon\": \"p.ong\" ',0),(13,'languages',1,3,'[{\"en\": \"English\"}]',0),(14,'KYCInvestorPersonalInfoStep',1,2,'',0),(15,'CustomPlatformCSSStyles',1,1,'',0),(16,'InvestorCombinePropertiesMode',1,2,'',1),(17,'KYCPersonalInfoScreen',1,2,'',1),(23,'SSOModeEnabled',1,2,'',0),(24,'SSORedirectFrontEnd',1,1,'https://digishares.io',0),(25,'CognitoUserPoolId',1,1,'us-east-1_PpnyIyThu',0),(26,'CognitoClientId',1,1,'iq3cbbgogpkbhkpptgqhnd4bf',0),(27,'CognitoPool_region',1,1,'us-east-1',0),(29,'CurrentClientID',1,2,'',4),(30,'ExternalAPILink',1,1,'',0),(31,'ExternalAPILinkUser',1,1,'',0),(32,'ExternalAPILinkPassword',1,1,'',0),(33,'web3Address',1,1,'https://kovan.infura.io/v3/fe41724da6f24b76a782f376b2698ee8',0),(28,'InvestorLayoutThemes',1,1,'default',0),(34,'BlockchainBalanceInFractions',1,2,'',2),(35,'NumberSeparatorCharacter',1,1,',',0),(36,'DocuSignEmail',1,1,'',0),(37,'DocuSignPassword',1,1,'',0),(38,'DocuSignIntegrationKey',1,1,'',0),(39,'DocuSignSTOContractID',1,1,'',0),(40,'DocuSignlinkToLoginServer',1,1,'',0),(41,'DocuSignSharesPurchaseContractID',1,1,'',0),(42,'DefaultInvstorKYCStatusWhenActivatedInProject',1,2,'',9),(43,'EthereumTransactionRetriesMillseconds',1,2,'',5000),(44,'EthereumTransactionRetries',1,2,'',5);
/*!40000 ALTER TABLE `params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentchannels`
--

DROP TABLE IF EXISTS `paymentchannels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentchannels` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `paymentType` tinyint DEFAULT NULL,
  `title` varchar(400) DEFAULT NULL,
  `paymentDetails` varchar(4000) DEFAULT NULL,
  `currencyID` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentchannels`
--

LOCK TABLES `paymentchannels` WRITE;
/*!40000 ALTER TABLE `paymentchannels` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentchannels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentinvestors`
--

DROP TABLE IF EXISTS `paymentinvestors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentinvestors` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `Investorid` int DEFAULT NULL,
  `paymentChannelID` int DEFAULT NULL,
  `paymentChannelDetails` varchar(3000) DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `Details` varchar(3000) DEFAULT NULL,
  `currencyIDRequested` int DEFAULT NULL,
  `paymentRequested` int DEFAULT NULL,
  `currencyIDReceived` int DEFAULT NULL,
  `paymentReceived` int DEFAULT NULL,
  `PaymentSendDate` datetime DEFAULT NULL,
  `PaymentReceiveDate` datetime DEFAULT NULL,
  `isSettled` tinyint DEFAULT NULL,
  `SettlementNotes` varchar(3000) DEFAULT NULL,
  `InternalNotes` varchar(3000) DEFAULT NULL,
  `InvestorComments` varchar(3000) DEFAULT NULL,
  `sharesOffered` int DEFAULT '0',
  `sharesTypeOffered` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentinvestors`
--

LOCK TABLES `paymentinvestors` WRITE;
/*!40000 ALTER TABLE `paymentinvestors` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentinvestors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicpollsdata`
--

DROP TABLE IF EXISTS `publicpollsdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicpollsdata` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `votingid` int DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `optionid` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicpollsdata`
--

LOCK TABLES `publicpollsdata` WRITE;
/*!40000 ALTER TABLE `publicpollsdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `publicpollsdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `FirstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `secret` int NOT NULL,
  `investorType` int DEFAULT '0',
  `CompanyName` varchar(70) DEFAULT '',
  `dateregister` datetime DEFAULT NULL,
  `referByInvestorID` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rights`
--

DROP TABLE IF EXISTS `rights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rights` (
  `ID` int NOT NULL,
  `RightName` varchar(255) DEFAULT NULL,
  `typeadminorsto` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rights`
--

LOCK TABLES `rights` WRITE;
/*!40000 ALTER TABLE `rights` DISABLE KEYS */;
INSERT INTO `rights` VALUES (1,'Investor View',1),(2,'Investor Add/Edit',1),(3,'Company Share Transfer',1),(4,'Investor Authorize',1),(5,'Investor Contracts Management',1),(6,'System Users Management',0),(7,'View Activity Logs',1),(8,'Manage Shares',1),(9,'KYC / Manage Documents',1),(10,'Share Register View',1),(11,'Manage Company News / Updates',1),(12,'Inbox',1),(13,'All STO Admin',0),(14,'Meetings Management',1),(15,'View Documents Module and Directories',1),(16,'View / Download Shared Files',1),(17,'Offer Contracts as Documents',1),(18,'Approve Shares Creation',1),(38,'Send Messages to Investors',1),(39,'Investor Document Management',1),(19,'Investor Share Transfer',1),(20,'Create / Burn Shares',1),(21,'Create New CLass',1),(22,'Summary Register View',1),(23,'History Register View',1),(24,'Send Bulk Email to all Investors',1),(25,'Send Bulk Email to all Registered Investors',1),(26,'Send Bulk Email to all Prospective / Un-Registered Investors',1),(27,'Internal Polls Management',1),(28,'Public Polls Management',1),(29,'View Shared Files (Documents)',1),(30,'View Draft Contracts (Documents)',1),(31,'View Public Files (Documents)',1),(32,'Create / Edit Directories (Documents)',1),(33,'Create / Edit Draft Contracts (Documents)',1),(35,'Upload Shared Files (Documents)',1),(36,'Upload Public Files',1),(37,'Sign and Approve Investor Signed Contracts',1),(40,'Increase / Decrease Investor Balance',1),(41,'Process Payment from Investors',1);
/*!40000 ALTER TABLE `rights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `ID` int NOT NULL,
  `Role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Super Admin'),(2,'Admin'),(3,'Investor Manager');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesrights`
--

DROP TABLE IF EXISTS `rolesrights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolesrights` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `RoleID` int NOT NULL,
  `RightID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_rolesrightsrights` (`RightID`),
  KEY `fk_rolesrightsroles` (`RoleID`)
) ENGINE=MyISAM AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesrights`
--

LOCK TABLES `rolesrights` WRITE;
/*!40000 ALTER TABLE `rolesrights` DISABLE KEYS */;
INSERT INTO `rolesrights` VALUES (62,1,6),(72,2,6),(77,1,13);
/*!40000 ALTER TABLE `rolesrights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesrightssto`
--

DROP TABLE IF EXISTS `rolesrightssto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolesrightssto` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `RoleID` int NOT NULL,
  `RightID` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=1501 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesrightssto`
--

LOCK TABLES `rolesrightssto` WRITE;
/*!40000 ALTER TABLE `rolesrightssto` DISABLE KEYS */;
INSERT INTO `rolesrightssto` VALUES (1500,25,41),(1499,25,40),(1498,25,39),(1497,25,38),(1496,25,37),(1495,25,36),(1494,25,35),(1493,25,33),(1492,25,32),(1491,25,31),(1490,25,30),(1489,25,28),(1488,25,27),(1487,25,24),(1486,25,23),(1485,25,22),(1484,25,20),(1483,25,19),(1482,25,18),(1481,25,17),(1480,25,16),(1479,25,15),(1478,25,14),(1477,25,12),(1476,25,11),(1475,25,10),(1474,25,9),(1473,25,8),(1472,25,7),(1471,25,4),(1470,25,3),(1469,25,2),(1468,25,1),(1467,24,41),(1466,24,40),(1465,24,39),(1464,24,38),(1463,24,37),(1462,24,36),(1461,24,35),(1460,24,33),(1459,24,32),(1458,24,31),(1457,24,30),(1456,24,28),(1455,24,27),(1454,24,24),(1453,24,23),(1452,24,22),(1451,24,20),(1450,24,19),(1449,24,18),(1448,24,17),(1447,24,16),(1446,24,15),(1445,24,14),(1444,24,12),(1443,24,11),(1442,24,10),(1441,24,9),(1440,24,8),(1439,24,7),(1438,24,4),(1437,24,3),(1436,24,2),(1435,24,1);
/*!40000 ALTER TABLE `rolesrightssto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolessto`
--

DROP TABLE IF EXISTS `rolessto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolessto` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT '0',
  `Role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolessto`
--

LOCK TABLES `rolessto` WRITE;
/*!40000 ALTER TABLE `rolessto` DISABLE KEYS */;
INSERT INTO `rolessto` VALUES (25,0,'role 1'),(24,1,'Role 1');
/*!40000 ALTER TABLE `rolessto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shares`
--

DROP TABLE IF EXISTS `shares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shares` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT '0',
  `shareTypeid` int NOT NULL,
  `PublicKey` varchar(10000) DEFAULT '[]',
  `isBlockchainFrozen` tinyint(1) NOT NULL DEFAULT '0',
  `isBlockchainAuthorized` tinyint(1) NOT NULL DEFAULT '0',
  `shares` decimal(14,3) DEFAULT '0.000',
  `investorID` int NOT NULL,
  `sharesHistoryID` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=1019 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shares`
--

LOCK TABLES `shares` WRITE;
/*!40000 ALTER TABLE `shares` DISABLE KEYS */;
/*!40000 ALTER TABLE `shares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shareshistory`
--

DROP TABLE IF EXISTS `shareshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shareshistory` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `sharesid` int NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `investorID` int NOT NULL,
  `shares` int NOT NULL,
  `shareTypeid` int NOT NULL,
  `CertificateSerials` varchar(800) DEFAULT NULL,
  `ShareSerials` varchar(800) DEFAULT NULL,
  `purchaserID` int NOT NULL,
  `datePurchase` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=576 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shareshistory`
--

LOCK TABLES `shareshistory` WRITE;
/*!40000 ALTER TABLE `shareshistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `shareshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shareswallet`
--

DROP TABLE IF EXISTS `shareswallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shareswallet` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `investorID` int DEFAULT '0',
  `sharesID` int DEFAULT '0',
  `shares` decimal(14,3) DEFAULT '0.000',
  `publicKey` varchar(100) DEFAULT '',
  `isBlocked` tinyint DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=295 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shareswallet`
--

LOCK TABLES `shareswallet` WRITE;
/*!40000 ALTER TABLE `shareswallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `shareswallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sharetypes`
--

DROP TABLE IF EXISTS `sharetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sharetypes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `stoid` int NOT NULL,
  `totalShares` decimal(14,3) DEFAULT '0.000',
  `companyShares` decimal(14,3) DEFAULT '0.000',
  `nominalValue` float(8,2) NOT NULL,
  `isNominalValueApplicable` tinyint(1) NOT NULL DEFAULT '0',
  `isVotingRightsApplicable` tinyint(1) NOT NULL DEFAULT '0',
  `isDividendRightsApplicable` tinyint(1) NOT NULL DEFAULT '0',
  `isblockchain` tinyint(1) NOT NULL DEFAULT '0',
  `ethereumContractAddress` varchar(200) NOT NULL,
  `ethereumWhitelistAddress` varchar(200) NOT NULL,
  `premimum` float(8,2) DEFAULT '0.00',
  `currencyid` int NOT NULL,
  `needauthorization` tinyint(1) NOT NULL DEFAULT '1',
  `token_abi` mediumtext,
  `whitelist_abi` mediumtext,
  `ethereumBlockchainPublicAddress` varchar(255) DEFAULT NULL,
  `subscriptionform` varchar(256) DEFAULT 'default',
  `minimumSharesToBuyByInvestor` int DEFAULT '1',
  `blockchainProtocol` int DEFAULT '0',
  `blockchainBuyOrdersAllowed` tinyint(1) DEFAULT '0',
  `reduceSharesForPurchase` decimal(14,3) DEFAULT '0.000',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sharetypes`
--

LOCK TABLES `sharetypes` WRITE;
/*!40000 ALTER TABLE `sharetypes` DISABLE KEYS */;
/*!40000 ALTER TABLE `sharetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocontracts`
--

DROP TABLE IF EXISTS `stocontracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocontracts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int NOT NULL,
  `title` varchar(1000) NOT NULL,
  `contents` mediumtext NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocontracts`
--

LOCK TABLES `stocontracts` WRITE;
/*!40000 ALTER TABLE `stocontracts` DISABLE KEYS */;
/*!40000 ALTER TABLE `stocontracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stoinvestortype`
--

DROP TABLE IF EXISTS `stoinvestortype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stoinvestortype` (
  `id` int NOT NULL,
  `type` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stoinvestortype`
--

LOCK TABLES `stoinvestortype` WRITE;
/*!40000 ALTER TABLE `stoinvestortype` DISABLE KEYS */;
INSERT INTO `stoinvestortype` VALUES (1,'Normal'),(2,'Experienced'),(3,'Accredited'),(4,'Private Client'),(5,'Accredited Client'),(6,'Institutional Client'),(7,'Un-Registered'),(8,'Reg D'),(9,'Reg S');
/*!40000 ALTER TABLE `stoinvestortype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stopublic`
--

DROP TABLE IF EXISTS `stopublic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stopublic` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int NOT NULL,
  `title` varchar(1000) NOT NULL,
  `contents` mediumtext,
  `type` int NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `isActive` tinyint DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stopublic`
--

LOCK TABLES `stopublic` WRITE;
/*!40000 ALTER TABLE `stopublic` DISABLE KEYS */;
/*!40000 ALTER TABLE `stopublic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stos`
--

DROP TABLE IF EXISTS `stos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stos` (
  `ID` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL,
  `isActive` tinyint DEFAULT '1',
  `logo` varchar(2000) NOT NULL,
  `ethereumContractAddress` varchar(200) NOT NULL,
  `ethereumWhitelistAddress` varchar(200) NOT NULL,
  `disclamer` mediumtext,
  `stolink` varchar(2000) DEFAULT NULL,
  `stolinkfull` varchar(2000) DEFAULT NULL,
  `stoType` int DEFAULT '0',
  `stoinvestortypes` varchar(2000) DEFAULT NULL,
  `emailFooter` mediumtext,
  `steps` mediumtext,
  `registrationtext` mediumtext,
  `SMTP_Host` varchar(200) DEFAULT NULL,
  `SMTP_Port` varchar(20) DEFAULT NULL,
  `SMTP_User` varchar(200) DEFAULT NULL,
  `SMTP_Password` varchar(200) DEFAULT NULL,
  `SMTP_FromAddress` varchar(200) DEFAULT NULL,
  `website` varchar(2000) DEFAULT NULL,
  `stoinvestortypesnotonshareregister` varchar(100) DEFAULT NULL,
  `companytype` int NOT NULL DEFAULT '0',
  `settings` mediumtext,
  `registrationsuccesstext` mediumtext,
  `tellafriendtext` mediumtext,
  `inviteFriendEmailText` mediumtext,
  `PropertyFullDetails` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `exchangeOpenDate` date DEFAULT '2030-01-01',
  `propertypicture` varchar(200) DEFAULT NULL,
  `docusign_sto_contract` varchar(255) DEFAULT NULL,
  `docusign_sto_purchase` varchar(255) DEFAULT NULL,
  `externalSystemID` int DEFAULT '0',
  `projectAddress` varchar(1000) DEFAULT NULL,
  `LegalDetails` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stos`
--

LOCK TABLES `stos` WRITE;
/*!40000 ALTER TABLE `stos` DISABLE KEYS */;
INSERT INTO `stos` VALUES (0,'WDCSafetySchool','WDCSafetySchool',1,'wdafetyschool.jpg','','','Disclaimer Text','wdcsafetyschool.com','https://wdcsafetyschool.com',1,'[1,3,7]',NULL,'{	\"completePage\": \"completestepgeneral\",	\"errorPage\": \"errorstep\",	\"steps\": [{		\"liID\": \"investorInfo\",		\"SideTitle\": \"1 - Information\",		\"icon\": \"ti-layout-grid2\",		\"pageTemplate\": \"step0\",		\"stepLink\": \"wizard?step=0\",		\"isDocumentUploading\": 0	}, {		\"liID\": \"IDDoc\",		\"SideTitle\": \"2 - KYC Docs\",		\"icon\": \"ti-layout-width-default-alt\",		\"pageTemplate\": \"redswan/upload\",		\"stepLink\": \"wizard?step=1\",		\"isDocumentUploading\": 1,		\"Variables\": [{			\"name\": \"fileID\",			\"type\": \"file\",			\"length\": \"-\"		}, {			\"name\": \"fileAddress\",			\"type\": \"file\",			\"length\": \"-\"		}]	}, {		\"liID\": \"SubmitPage\",		\"SideTitle\": \"4 - Submit\",		\"icon\": \"ti-upload\",		\"pageTemplate\": \"redswan/submit\",		\"stepLink\": \"wizard?step=2\",		\"isDocumentUploading\": 1	}]}',NULL,'','','','81b670c98b29813a48ed0bcc69c82d9f','shahzad73@hotmail.com',NULL,'[7]',1,'{ \"disclaimer\": 0, \"Registration\": 0, \"ListCountry\": \"Switzerland\", \"RegistrationBanner\":0, \"InvestorCategory\": { \"0\": \"Natural Person\", \"1\":\"Legal Entity\" }, \"DefaultSTOCurreny\": 4, \"EnablePaymentModule\": 1, \"isInternalExchangeEnabled\": 1,  \"favicon\": \"p.png\" }','<h4 style=\"color: rgb(0, 0, 0);\">Thank you for your pledge</h4>Your profile has been submitted. Our staff is notified and they will get back to you in a few working days.&nbsp;<br><br>You will receive an email from our staff to inform whether your profile is approved or not. In case of not approved, our staff will describe in detail what additional information can be provided.&nbsp;&nbsp;<br><br>You can re-login with your email and password and update your information. If your profile is approved then you can login to your investor dashboard using the same email and password.&nbsp;<br><br>You may now logout. You can also click any of the previous steps on the left side menu to review your submitted information, make changes and resubmit.&nbsp;<br><br>&nbsp;',NULL,NULL,'','2030-01-01',NULL,NULL,NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `stos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `swaptokens`
--

DROP TABLE IF EXISTS `swaptokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `swaptokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(256) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `symbol` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `swaptokens`
--

LOCK TABLES `swaptokens` WRITE;
/*!40000 ALTER TABLE `swaptokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `swaptokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timezone`
--

DROP TABLE IF EXISTS `timezone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timezone` (
  `ID` int NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `timezone` varchar(200) DEFAULT NULL,
  `timepadding` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timezone`
--

LOCK TABLES `timezone` WRITE;
/*!40000 ALTER TABLE `timezone` DISABLE KEYS */;
INSERT INTO `timezone` VALUES (1,'Coordinated Universal Time Zone','UTC',0),(2,'Central European Time Zone','CET',-60),(3,'Eastern European Time Zone','EET',-120),(0,'0 Time is needed to link records','',0);
/*!40000 ALTER TABLE `timezone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokencreationrequests`
--

DROP TABLE IF EXISTS `tokencreationrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokencreationrequests` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `tokens` int DEFAULT NULL,
  `sharetypeid` int DEFAULT NULL,
  `createdbyuserid` int DEFAULT NULL,
  `dattime` datetime DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokencreationrequests`
--

LOCK TABLES `tokencreationrequests` WRITE;
/*!40000 ALTER TABLE `tokencreationrequests` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokencreationrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `updates`
--

DROP TABLE IF EXISTS `updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `updates` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT NULL,
  `TITLE` varchar(256) DEFAULT NULL,
  `details` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `UpdateDate` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `updates`
--

LOCK TABLES `updates` WRITE;
/*!40000 ALTER TABLE `updates` DISABLE KEYS */;
/*!40000 ALTER TABLE `updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userroles`
--

DROP TABLE IF EXISTS `userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userroles` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `RoleID` int NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_userrolesroles` (`RoleID`),
  KEY `fk_userrolesusers` (`UserID`)
) ENGINE=MyISAM AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` VALUES (152,1,61),(147,2,62),(150,1,63),(151,1,64),(153,1,68),(154,15,81);
/*!40000 ALTER TABLE `userroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `stoid` int DEFAULT '0',
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `twofactorenable` tinyint(1) DEFAULT '0',
  `email` varchar(200) DEFAULT NULL,
  `isPlatformAdminLogin` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (61,0,'admin','12',1,'admin','8dd0529658e1fda1f3c0d31ff4e847c3f04d32148789f6cf496c1a0c4d119801',0,'shahzad73@hotmail.com',1),(84,1,'AslamYou1','AslamYou',1,'admin','8dd0529658e1fda1f3c0d31ff4e847c3f04d32148789f6cf496c1a0c4d119801',0,'shahzad73@hotmail.com',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userssto`
--

DROP TABLE IF EXISTS `userssto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userssto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `stoid` int NOT NULL,
  `roleid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userssto`
--

LOCK TABLES `userssto` WRITE;
/*!40000 ALTER TABLE `userssto` DISABLE KEYS */;
INSERT INTO `userssto` VALUES (108,61,0,25),(107,84,1,24);
/*!40000 ALTER TABLE `userssto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voting`
--

DROP TABLE IF EXISTS `voting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stoid` int NOT NULL,
  `title` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contents` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int NOT NULL,
  `nameResponsiblePerson` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneResponsiblePerson` varchar(30) DEFAULT NULL,
  `emailResponsiblePerson` varchar(80) DEFAULT NULL,
  `nameProxyPerson` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneProxyPerson` varchar(30) DEFAULT NULL,
  `emailProxyPerson` varchar(80) DEFAULT NULL,
  `place` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `opendate` datetime DEFAULT NULL,
  `closedate` datetime DEFAULT NULL,
  `secretaccesscode` varchar(80) DEFAULT NULL,
  `votetype` int NOT NULL DEFAULT '0',
  `isMeetingFinalResultsCalculated` int NOT NULL DEFAULT '0',
  `timezoneid` int NOT NULL DEFAULT '0',
  `timepadding` int NOT NULL DEFAULT '0',
  `totalInvestors` int NOT NULL DEFAULT '0',
  `totalShares` int NOT NULL DEFAULT '0',
  `totalNominalShares` int NOT NULL DEFAULT '0',
  `isVotingOpenForProxy` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voting`
--

LOCK TABLES `voting` WRITE;
/*!40000 ALTER TABLE `voting` DISABLE KEYS */;
/*!40000 ALTER TABLE `voting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votingdocuments`
--

DROP TABLE IF EXISTS `votingdocuments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votingdocuments` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `votingid` int DEFAULT NULL,
  `votingoptionid` int DEFAULT NULL,
  `documentlink` varchar(800) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votingdocuments`
--

LOCK TABLES `votingdocuments` WRITE;
/*!40000 ALTER TABLE `votingdocuments` DISABLE KEYS */;
/*!40000 ALTER TABLE `votingdocuments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votingoptions`
--

DROP TABLE IF EXISTS `votingoptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votingoptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `votingid` int NOT NULL,
  `optiontxt` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CompanyComments` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isActiveByAdmin` tinyint NOT NULL DEFAULT '0',
  `isItemCurrentlyDiscussing` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=375 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votingoptions`
--

LOCK TABLES `votingoptions` WRITE;
/*!40000 ALTER TABLE `votingoptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `votingoptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votinguser`
--

DROP TABLE IF EXISTS `votinguser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votinguser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `votingid` int NOT NULL,
  `userid` int NOT NULL,
  `votingoptionsid` int NOT NULL,
  `votingoptionsvalue` int NOT NULL,
  `votesContributed` int NOT NULL,
  `isCastedByInvestor` int NOT NULL DEFAULT '0',
  `investmentContributed` int NOT NULL,
  `nominalInvestmentContributed` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1095 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votinguser`
--

LOCK TABLES `votinguser` WRITE;
/*!40000 ALTER TABLE `votinguser` DISABLE KEYS */;
/*!40000 ALTER TABLE `votinguser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votinguserdata`
--

DROP TABLE IF EXISTS `votinguserdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votinguserdata` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `investorID` int NOT NULL,
  `votingid` int DEFAULT NULL,
  `attendMeeting` int DEFAULT NULL,
  `unannounceDecision` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votinguserdata`
--

LOCK TABLES `votinguserdata` WRITE;
/*!40000 ALTER TABLE `votinguserdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `votinguserdata` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-30 18:09:39