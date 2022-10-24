SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `activitytype`;
CREATE TABLE `activitytype` (
  `ID` int(11) NOT NULL,
  `Activity` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Activity` (`Activity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `activitytype` (`ID`, `Activity`) VALUES
(1,	'System User Created'),
(2,	'System User Login Authorization'),
(4,	'System User Modified'),
(5,	'Shares Transferred'),
(6,	'Investor Authorization'),
(7,	'Company Shares Created'),
(8,	'Investor Approved'),
(9,	'Investor KYC Document Update'),
(10,	'Company Shares Removed'),
(11,	'Investor Shares Tokenover'),
(12,	'Investor New Address Approved'),
(14,	'Investor New Address Denied'),
(13,	'Investor New Address Whitelisted'),
(15,	'News Item Created'),
(16,	'Bulk Email Send'),
(17,	'Award Affiliate Income (automatic)'),
(18,	'Funds Deposited In Wallet'),
(19,	'Investor Log In'),
(20,	'Project Administrator Log In'),
(21,	'Request For Share Purchasing Received'),
(22,	'Request For Share Purchasing Approved (Blockchain)'),
(23,	'Request For Share Purchasing Approved (Non-Blockchain)'),
(24,	'Investor Log Out'),
(25,	'Project Administrator Log Out'),
(26,	'Admin Receiving a Payment Request'),
(27,	'Admin Declining a Payment Request'),
(28,	'Admin Accepting a Payment Request'),
(29,	'Trading of Shares Within The Platform (Sell)'),
(30,	'Trading of Shares Within The Platform (Buy)'),
(31,	'Contract Signing'),
(32,	'Admin Transferring Shares From an Investor Back to The Company'),
(33,	'SSO Investor Log In');

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `affiliateincomes`;
CREATE TABLE `affiliateincomes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `investorId` int(11) NOT NULL,
  `amount` decimal(18,8) NOT NULL,
  `tokens` decimal(27,18) NOT NULL,
  `remark` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stoId` int(11) NOT NULL DEFAULT 0,
  `awarded` tinyint(4) NOT NULL DEFAULT 0,
  `dateEarned` date DEFAULT NULL,
  `dateAwarded` date DEFAULT NULL,
  `affiliateId` int(11) DEFAULT NULL,
  `investmentId` int(11) DEFAULT NULL,
  `purchaseAmount` decimal(14,3) DEFAULT NULL,
  `purchaseTokens` decimal(14,3) DEFAULT NULL,
  `affiliateLevel` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `affiliateId` (`affiliateId`),
  KEY `investmentId` (`investmentId`),
  CONSTRAINT `affiliateincomes_ibfk_1` FOREIGN KEY (`affiliateId`) REFERENCES `investor` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `affiliateincomes_ibfk_2` FOREIGN KEY (`investmentId`) REFERENCES `investments` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `affiliateplans`;
CREATE TABLE `affiliateplans` (
  `id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `AffiliateReportView`;
CREATE TABLE `AffiliateReportView` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `rootInvestorId` int(11) DEFAULT NULL,
  `lineInvestorId` int(11) DEFAULT NULL,
  `lineName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `armVolume` decimal(18,8) DEFAULT 0.00000000,
  `rootInvestorTotalPersonalInvestmentVolume` decimal(18,8) DEFAULT 0.00000000,
  `tokenVolume` decimal(18,8) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `stoid` (`stoid`),
  KEY `rootInvestorId` (`rootInvestorId`),
  KEY `lineInvestorId` (`lineInvestorId`),
  CONSTRAINT `AffiliateReportView_ibfk_1` FOREIGN KEY (`stoid`) REFERENCES `stos` (`ID`),
  CONSTRAINT `AffiliateReportView_ibfk_2` FOREIGN KEY (`rootInvestorId`) REFERENCES `investor` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `AffiliateReportView_ibfk_3` FOREIGN KEY (`lineInvestorId`) REFERENCES `investor` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `api_migration_table`;
CREATE TABLE `api_migration_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `api_migration_table` (`id`, `timestamp`, `name`) VALUES
(1,	1630888746399,	'I18nCustomize1630888746399'),
(2,	1630893652249,	'KycCustom1630893652249'),
(3,	1634500601872,	'defaultKyc1634500601872'),
(4,	1634867369046,	'kycTranslations1634867369046'),
(5,	1637326125807,	'investingEntity1637326125807'),
(6,	1638737913493,	'marketspaceParam1638737913493'),
(7,	1639960616498,	'msEntityInBuyAlert1639960616498'),
(8,	1642711728730,	'stoMetaTypes1642711728730'),
(9,	1643329521455,	'stoMetaKeysOrder1643329521455'),
(10,	1643797715650,	'addBrokerIDToUsers1643797715650'),
(11,	1643798810272,	'investorBrokers1643798810272'),
(12,	1644230495170,	'addBrokerIDToRegister1644230495170'),
(13,	1644501475511,	'custodianShares1644501475511'),
(14,	1644926575582,	'helloSignIntegration1644926575582'),
(15,	1644247642125,	'displayColumnMetaKeys1644247642125'),
(16,	1644978581492,	'investor2faCode1644978581492'),
(17,	1644941209387,	'stoSmtpFromName1644941209387'),
(18,	1644943643558,	'emailTextOverrides1644943643558'),
(19,	1645432352921,	'fee1645432352921'),
(20,	1645660104566,	'ssoActivityType1645660104566');

DROP TABLE IF EXISTS `app_parameters`;
CREATE TABLE `app_parameters` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `Param` varchar(255) NOT NULL,
  `ValueString` varchar(255) NOT NULL,
  `ValueInt` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `blockchainSharesTransferTransactions`;
CREATE TABLE `blockchainSharesTransferTransactions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `hostname` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `toAddress` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stoid` int(11) DEFAULT NULL,
  `adminid` int(11) DEFAULT NULL,
  `investorID` int(11) DEFAULT NULL,
  `shareTypeID` int(11) DEFAULT NULL,
  `amountToSend` decimal(14,3) DEFAULT 0.000,
  `investmentDetails` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `investmentAmount` decimal(14,3) DEFAULT 0.000,
  `reduceInvestorBalance` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `recordDate` datetime DEFAULT NULL,
  `transactionID` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `errorMessage` varchar(4000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `brokerrights`;
CREATE TABLE `brokerrights` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `brokerID` int(1) DEFAULT 0,
  `stoid` int(1) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `brokers`;
CREATE TABLE `brokers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `twofactorenable` tinyint(1) DEFAULT 0,
  `email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `bulkemails`;
CREATE TABLE `bulkemails` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `hostname` varchar(2000) DEFAULT NULL,
  `title` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `typeOfQuery` int(11) DEFAULT NULL,
  `InvestorsSelectionSQL` varchar(2000) DEFAULT NULL,
  `BulkEmailsCommaSeperated` mediumtext DEFAULT NULL,
  `emailText` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fromEmail` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `changeaddresserequest`;
CREATE TABLE `changeaddresserequest` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `InvestorID` int(11) NOT NULL,
  `PublicKey` varchar(256) DEFAULT NULL,
  `Tokens` int(11) NOT NULL,
  `isActivated` tinyint(1) NOT NULL DEFAULT 0,
  `ActivatedDate` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_changeaddresserequest_investor` (`InvestorID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `changepassword`;
CREATE TABLE `changepassword` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `date` date NOT NULL,
  `securelink` varchar(1000) NOT NULL,
  `securecode` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `closedaccounts`;
CREATE TABLE `closedaccounts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `InvestorID` int(11) NOT NULL,
  `DateClosed` date DEFAULT NULL,
  `CaseTitle` varchar(400) DEFAULT NULL,
  `CaseDetails` varchar(4000) DEFAULT NULL,
  `CaseNotes` varchar(4000) DEFAULT NULL,
  `CaseFilePath` varchar(200) DEFAULT NULL,
  `tokens` int(11) NOT NULL,
  `isPartial` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `fk_closedaccounts_investor` (`InvestorID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `cloudFiles`;
CREATE TABLE `cloudFiles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `contracts`;
CREATE TABLE `contracts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `InvestorID` int(11) NOT NULL,
  `DateOffered` date DEFAULT NULL,
  `ContractTitle` varchar(400) DEFAULT NULL,
  `ContractDetails` varchar(4000) DEFAULT NULL,
  `DateSigned` date DEFAULT NULL,
  `UserID` int(11) NOT NULL,
  `CurrentStatus` int(11) NOT NULL,
  `ContractFilePath` varchar(200) DEFAULT NULL,
  `SignedFilePath` varchar(200) DEFAULT NULL,
  `contractid` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `ConversionRateLocks`;
CREATE TABLE `ConversionRateLocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stoId` int(11) NOT NULL,
  `investorId` int(11) NOT NULL,
  `currencyFrom` int(11) NOT NULL,
  `currencyTo` int(11) NOT NULL,
  `rate` decimal(27,18) NOT NULL,
  `lockedAt` datetime NOT NULL,
  `status` enum('temporary','pending','historical') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stoId` (`stoId`),
  KEY `investorId` (`investorId`),
  KEY `currencyFrom` (`currencyFrom`),
  KEY `currencyTo` (`currencyTo`),
  CONSTRAINT `ConversionRateLocks_ibfk_1` FOREIGN KEY (`stoId`) REFERENCES `stos` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `ConversionRateLocks_ibfk_2` FOREIGN KEY (`investorId`) REFERENCES `investor` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `ConversionRateLocks_ibfk_3` FOREIGN KEY (`currencyFrom`) REFERENCES `currency` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `ConversionRateLocks_ibfk_4` FOREIGN KEY (`currencyTo`) REFERENCES `currency` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `currency`;
CREATE TABLE `currency` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Country` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Currency` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Abbreviation` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Symbol` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isBlockchainBased` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `currency` (`ID`, `Country`, `Currency`, `Abbreviation`, `Symbol`, `isBlockchainBased`) VALUES
(1,	'USA',	'Dollar',	'USD',	'$',	0),
(2,	'Europe',	'Euro',	'EUR',	'€',	0);

DROP TABLE IF EXISTS `dividend`;
CREATE TABLE `dividend` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(400) DEFAULT NULL,
  `stoid` int(11) DEFAULT NULL,
  `adminid` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `Details` varchar(2000) DEFAULT NULL,
  `DateReport` datetime DEFAULT NULL,
  `totalamount` decimal(14,3) DEFAULT 0.000,
  `investorTotalShares` decimal(14,3) DEFAULT 0.000,
  `companyTotalShares` decimal(14,3) DEFAULT 0.000,
  `totalInvestors` int(11) DEFAULT 0,
  `currencyid` int(11) DEFAULT NULL,
  `payouttype` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `DividendInvestorPayouts`;
CREATE TABLE `DividendInvestorPayouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `investorId` int(11) NOT NULL,
  `payoutId` int(11) NOT NULL,
  `amount` decimal(30,18) NOT NULL,
  `investorShares` decimal(30,18) NOT NULL,
  `lastUpdatedAt` datetime DEFAULT NULL,
  `status` enum('future','pending','completed','rejected','reverting','reverted','exception') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `investorId` (`investorId`),
  KEY `payoutId` (`payoutId`),
  CONSTRAINT `DividendInvestorPayouts_ibfk_1` FOREIGN KEY (`investorId`) REFERENCES `investor` (`ID`),
  CONSTRAINT `DividendInvestorPayouts_ibfk_2` FOREIGN KEY (`payoutId`) REFERENCES `DividendPayouts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP VIEW IF EXISTS `DividendInvestorPayoutsView`;
CREATE TABLE `DividendInvestorPayoutsView` (`id` int(11), `templateId` int(11), `investorId` int(11), `payoutId` int(11), `amount` decimal(30,18), `investorShares` decimal(30,18), `lastUpdatedAt` datetime, `status` enum('future','pending','completed','rejected','reverting','reverted','exception'), `dateTimeFrom` datetime, `dateTimeDue` datetime, `totalLastUpdatedAt` datetime, `totalStatus` enum('future','pending','completed','rejected','reverting','reverted','exception'), `totalAmount` decimal(30,18), `companyShares` decimal(30,18), `totalInvestorShares` decimal(30,18), `investors` int(11), `stoId` int(11), `shareTypeId` int(11), `currencyId` int(11), `channelId` int(11), `isActive` int(11), `periodUnit` enum('days','months'), `period` smallint(6), `awardValue` decimal(30,18), `title` varchar(256), `awardStrategy` enum('formula','feePerShare','percentPremiumValuePerShare','dividendAmountDistributed'), `templateStatus` enum('unused','used','historical'));


DROP TABLE IF EXISTS `DividendPayouts`;
CREATE TABLE `DividendPayouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `templateId` int(11) NOT NULL,
  `dateTimeFrom` datetime NOT NULL,
  `dateTimeDue` datetime NOT NULL,
  `lastUpdatedAt` datetime DEFAULT NULL,
  `status` enum('future','pending','completed','rejected','reverting','reverted','exception') COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalAmount` decimal(30,18) NOT NULL,
  `companyShares` decimal(30,18) NOT NULL,
  `totalInvestorShares` decimal(30,18) NOT NULL,
  `investors` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `templateId` (`templateId`),
  CONSTRAINT `DividendPayouts_ibfk_1` FOREIGN KEY (`templateId`) REFERENCES `DividendTemplates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP VIEW IF EXISTS `DividendPayoutsView`;
CREATE TABLE `DividendPayoutsView` (`id` int(11), `templateId` int(11), `dateTimeFrom` datetime, `dateTimeDue` datetime, `lastUpdatedAt` datetime, `status` enum('future','pending','completed','rejected','reverting','reverted','exception'), `totalAmount` decimal(30,18), `companyShares` decimal(30,18), `totalInvestorShares` decimal(30,18), `investors` int(11), `stoId` int(11), `shareTypeId` int(11), `currencyId` int(11), `channelId` int(11), `isActive` int(11), `periodUnit` enum('days','months'), `period` smallint(6), `awardValue` decimal(30,18), `title` varchar(256), `awardStrategy` enum('formula','feePerShare','percentPremiumValuePerShare','dividendAmountDistributed'), `templateStatus` enum('unused','used','historical'));


DROP TABLE IF EXISTS `dividendreceivers`;
CREATE TABLE `dividendreceivers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `dividendid` int(11) DEFAULT NULL,
  `investorid` int(11) DEFAULT NULL,
  `shares` decimal(14,3) DEFAULT 0.000,
  `amounttopaid` decimal(14,3) DEFAULT 0.000,
  `status` int(11) DEFAULT NULL,
  `Details` varchar(2000) DEFAULT NULL,
  `BankPaidDetails` varchar(2000) DEFAULT NULL,
  `CryptoPaidDetails` varchar(2000) DEFAULT NULL,
  `DatePaid` datetime DEFAULT NULL,
  `AffiliateAmount` decimal(14,3) DEFAULT 0.000,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `DividendTemplates`;
CREATE TABLE `DividendTemplates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `historyId` int(11) DEFAULT NULL,
  `stoId` int(11) NOT NULL,
  `shareTypeId` int(11) DEFAULT NULL,
  `currencyId` int(11) DEFAULT NULL,
  `channelId` int(11) DEFAULT NULL,
  `isActive` int(11) NOT NULL,
  `periodUnit` enum('days','months') COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` smallint(6) NOT NULL,
  `awardValue` decimal(30,18) NOT NULL,
  `title` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `awardStrategy` enum('formula','feePerShare','percentPremiumValuePerShare','dividendAmountDistributed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `awardFormula` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('unused','used','historical') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unused',
  PRIMARY KEY (`id`),
  KEY `stoId` (`stoId`),
  KEY `shareTypeId` (`shareTypeId`),
  KEY `currencyId` (`currencyId`),
  KEY `channelId` (`channelId`),
  CONSTRAINT `DividendTemplates_ibfk_1` FOREIGN KEY (`stoId`) REFERENCES `stos` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `DividendTemplates_ibfk_2` FOREIGN KEY (`shareTypeId`) REFERENCES `sharetypes` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `DividendTemplates_ibfk_3` FOREIGN KEY (`currencyId`) REFERENCES `currency` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `DividendTemplates_ibfk_4` FOREIGN KEY (`channelId`) REFERENCES `paymentchannels` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `doclinks`;
CREATE TABLE `doclinks` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `isEnabled` tinyint(11) DEFAULT NULL,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secret` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `doclinksdocuments`;
CREATE TABLE `doclinksdocuments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DocLinksID` int(11) NOT NULL,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateuploaded` date DEFAULT NULL,
  `details` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `files` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isNew` tinyint(11) DEFAULT 1,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `documentcomments`;
CREATE TABLE `documentcomments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `documentid` int(11) DEFAULT NULL,
  `comment` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `investorid` int(11) DEFAULT NULL,
  `datecomment` datetime DEFAULT NULL,
  `reply` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `replybyid` int(11) DEFAULT -1,
  `datereplycomment` date DEFAULT NULL,
  `isaccepted` tinyint(1) DEFAULT 0,
  `isnew` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `documentdirectories`;
CREATE TABLE `documentdirectories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stoid` int(11) DEFAULT NULL,
  `parentid` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `documentfields`;
CREATE TABLE `documentfields` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fieldtype` int(11) DEFAULT NULL,
  `stoid` int(11) DEFAULT NULL,
  `documentid` int(11) DEFAULT NULL,
  `fieldid` varchar(80) DEFAULT NULL,
  `fieldhelpertext` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `externalFileDataLabel` varchar(100) DEFAULT 'NULL',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `documentfieldvalues`;
CREATE TABLE `documentfieldvalues` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `fieldid` int(11) DEFAULT NULL,
  `documentid` int(11) DEFAULT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `documentofferinvestor`;
CREATE TABLE `documentofferinvestor` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `documentid` int(11) DEFAULT NULL,
  `DateFrom` datetime DEFAULT NULL,
  `DataTo` datetime DEFAULT NULL,
  `contents` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `documentOffetType` int(11) DEFAULT NULL,
  `investorStatusID` int(11) DEFAULT NULL,
  `InvestorsName` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `documents`;
CREATE TABLE `documents` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contents` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stoid` int(11) DEFAULT NULL,
  `directoryid` int(11) DEFAULT NULL,
  `isactiveforinvestors` tinyint(1) NOT NULL DEFAULT 0,
  `filetype` tinyint(1) DEFAULT 0,
  `offerID` int(11) NOT NULL DEFAULT 0,
  `isactiveforinvestorsType` int(11) DEFAULT NULL,
  `isactiveforinvestorsNames` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countriesWhitelist` varchar(10000) DEFAULT '["ALL"]',
  `docusignDocumentID` varchar(50) DEFAULT NULL,
  `investorTypesWhitelist` varchar(10000) DEFAULT '["ALL"]',
  `helloSignDocumentID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `documentuser`;
CREATE TABLE `documentuser` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `contents` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `investorID` int(11) DEFAULT NULL,
  `stoid` int(11) DEFAULT NULL,
  `directoryid` int(11) DEFAULT NULL,
  `documentid` int(11) NOT NULL,
  `DocumentStatus` int(11) NOT NULL,
  `fieldValuesJson` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `documentofferinvestorid` int(11) NOT NULL,
  `signaturefilepath` varchar(300) DEFAULT NULL,
  `signaturedate` datetime DEFAULT NULL,
  `signatureFileID` int(11) DEFAULT NULL,
  `sharePurchaseID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `docu_sign_sto_contracts`;
CREATE TABLE `docu_sign_sto_contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `investor_id` int(11) DEFAULT 0,
  `docusign_contract_signed_id` varchar(256) DEFAULT NULL,
  `is_docusign_contract_signed` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `EmailTextOverrides`;
CREATE TABLE `EmailTextOverrides` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoID` int(11) NOT NULL DEFAULT 0,
  `locale` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `emailKey` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email_key` (`stoID`,`locale`,`emailKey`,`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `exchangeoffers`;
CREATE TABLE `exchangeoffers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `exchangeOrderID` int(11) NOT NULL,
  `investorID` int(11) DEFAULT NULL,
  `sharesPartial` decimal(14,3) DEFAULT 0.000,
  `rateFrom` decimal(14,3) DEFAULT 0.000,
  `rateTo` decimal(14,3) DEFAULT 0.000,
  `offerDescription` varchar(2000) DEFAULT NULL,
  `atomicSwapAccepted` tinyint(1) DEFAULT NULL,
  `atomicSwapSecret` varchar(256) DEFAULT NULL,
  `atomicBuyerPublicKey` varchar(256) DEFAULT NULL,
  `atomicSwapExpireData` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `exchangeorders`;
CREATE TABLE `exchangeorders` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) DEFAULT 0,
  `investorID` int(11) DEFAULT NULL,
  `dateFrom` date DEFAULT NULL,
  `dateTo` date DEFAULT NULL,
  `sharesTypeID` int(11) DEFAULT NULL,
  `shares` decimal(14,3) DEFAULT 0.000,
  `rateFrom` decimal(14,3) DEFAULT 0.000,
  `rateTo` decimal(14,3) DEFAULT 0.000,
  `description` varchar(4000) DEFAULT NULL,
  `atomicSwapCurrentStatus` int(11) DEFAULT NULL,
  `atomicSwapExchangeOffersID` int(11) DEFAULT NULL,
  `atomicSwapAcceptable` tinyint(1) DEFAULT 0,
  `atomicSwapTokenAddressAcceptable` varchar(256) DEFAULT NULL,
  `atomicSwapSharesWalletID` int(11) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `fees`;
CREATE TABLE `fees` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoID` int(11) NOT NULL,
  `beneficiary` enum('broker','platform') COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('registration','deposit','buyShares','exchange') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(14,3) NOT NULL DEFAULT 0.000,
  `status` enum('flat','percentage') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'flat',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `helloSignSignatures`;
CREATE TABLE `helloSignSignatures` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `signatureID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `investorBuyPropertyAlertID` int(11) NOT NULL,
  `investorID` int(11) NOT NULL,
  `documentID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `inbox`;
CREATE TABLE `inbox` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `InvestorID` int(11) NOT NULL,
  `Title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Details` varchar(7000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateEmail` date DEFAULT NULL,
  `isResponded` tinyint(1) NOT NULL DEFAULT 0,
  `Response` varchar(7000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResponseDate` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_inbox_investor` (`InvestorID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `investing_entity`;
CREATE TABLE `investing_entity` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `investorID` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxId` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accredited` tinyint(1) NOT NULL,
  `paymentMethod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postalCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ach` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wire` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FC_investing_entity_investor` (`investorID`),
  CONSTRAINT `FC_investing_entity_investor` FOREIGN KEY (`investorID`) REFERENCES `investor` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `investing_entity_member`;
CREATE TABLE `investing_entity_member` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `investorID` int(11) NOT NULL,
  `entityID` int(11) NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signatory` tinyint(1) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FC_investing_entity` (`entityID`),
  KEY `FC_investing_entity_member_investor` (`investorID`),
  CONSTRAINT `FC_investing_entity` FOREIGN KEY (`entityID`) REFERENCES `investing_entity` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FC_investing_entity_member_investor` FOREIGN KEY (`investorID`) REFERENCES `investor` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `investments`;
CREATE TABLE `investments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `UserID` int(11) NOT NULL,
  `InvestorID` int(11) NOT NULL,
  `TokensTransferred` decimal(14,3) DEFAULT 0.000,
  `AmountInvested` decimal(20,10) DEFAULT NULL,
  `CurrencyID` int(11) NOT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sharetypeid` int(11) NOT NULL,
  `DateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `fk_investmentsusers` (`UserID`),
  KEY `fk_investmentinvestor` (`InvestorID`),
  KEY `fk_investmentcurrency` (`CurrencyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `investor`;
CREATE TABLE `investor` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `cell` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `zip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `town` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `Password` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PassportNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `NationalID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `receiveEmails` tinyint(1) DEFAULT 0,
  `kinname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `kinphone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `kinemail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `investorType` int(11) NOT NULL DEFAULT 0,
  `CompanyName` varchar(800) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TitleWithinCompany` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `PowerToBindCompany` tinyint(1) DEFAULT 0,
  `DOB` date DEFAULT NULL,
  `twofactorenable` tinyint(1) DEFAULT 0,
  `investorBulkUploadStatus` tinyint(1) DEFAULT 0,
  `language` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'en',
  `MiddleName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SocialSecurity` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MailingAddress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FaxNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MaritalStatus` int(1) DEFAULT 0,
  `Occupation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmployerName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmployerAddress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RetirementAccount` int(1) DEFAULT 0,
  `TrustOrBusinessEntity` int(1) DEFAULT 0,
  `DateIncorporation` date DEFAULT NULL,
  `TaxIDNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GovtIDNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GovtIDNoIsTaxNo` int(1) DEFAULT 0,
  `PrincipalCountryOfBusiness` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NamePrimaryContact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhonePrimaryContact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmailPrimaryContact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NameSecondaryContact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhoneSecondaryContact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmailSecondaryContact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryOfCitizenship` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referByInvestorID` int(11) DEFAULT 0,
  `kyc` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dividendPeriod` int(11) DEFAULT 1,
  `DOBCountry` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxResidencyCountry` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `affiliateStatus` tinyint(4) NOT NULL DEFAULT 0,
  `PoliticallyExposedPerson` tinyint(1) NOT NULL DEFAULT 0,
  `PoliticallyExposedPersonPost` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mercuryID` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploadDate` datetime DEFAULT NULL,
  `twoFactorCode` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `mercuryID_UNIQUE` (`mercuryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `InvestorBalancesInCompanyAccounts`;
CREATE TABLE `InvestorBalancesInCompanyAccounts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `investorID` int(11) DEFAULT NULL,
  `currencyID` int(11) DEFAULT NULL,
  `Amount` decimal(20,10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `InvestorBanks`;
CREATE TABLE `InvestorBanks` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `investorid` int(11) DEFAULT NULL,
  `accountTitle` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountNo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `routingNumber` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iban` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountHolderName` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountHolderCity` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountHolderCountry` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountHolderAddress` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountPostalCode` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankName` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankCity` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankCountry` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankAddress` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `InvestorBanksDividend`;
CREATE TABLE `InvestorBanksDividend` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `InvestorBanksID` int(11) DEFAULT NULL,
  `stoid` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `InvestorBuyPropertyAlert`;
CREATE TABLE `InvestorBuyPropertyAlert` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `investorID` int(11) DEFAULT NULL,
  `Shares` decimal(14,3) DEFAULT 0.000,
  `ShareTypeID` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `Details` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateReceived` datetime DEFAULT NULL,
  `isSubScriptionFormSigned` int(1) DEFAULT NULL,
  `SubScriptionFormPath` varchar(256) DEFAULT NULL,
  `SubScriptionFormContents` mediumtext DEFAULT NULL,
  `publickey` varchar(100) DEFAULT NULL,
  `isblockchain` tinyint(1) DEFAULT NULL,
  `isBuySharesFormSigned` tinyint(1) DEFAULT 0,
  `BuySharesFormPath` varchar(255) DEFAULT NULL,
  `purchasePriceOffered` decimal(20,10) DEFAULT NULL,
  `conversionRateLock` int(11) DEFAULT NULL,
  `fromCurrencyID` int(11) DEFAULT NULL,
  `entityID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ibpa_conversionRateLock` (`conversionRateLock`),
  CONSTRAINT `fk_ibpa_conversionRateLock` FOREIGN KEY (`conversionRateLock`) REFERENCES `ConversionRateLocks` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `InvestorDepositReceivedAlert`;
CREATE TABLE `InvestorDepositReceivedAlert` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `investorID` int(11) DEFAULT NULL,
  `isApproved` int(11) DEFAULT NULL,
  `storid` int(11) DEFAULT NULL,
  `DateReceived` datetime DEFAULT NULL,
  `ChannelID` int(11) DEFAULT NULL,
  `Amount` decimal(27,18) DEFAULT NULL,
  `Details` varchar(2000) DEFAULT NULL,
  `DateApproved` datetime DEFAULT NULL,
  `ApprovedByUserID` int(11) DEFAULT NULL,
  `currencyID` int(11) DEFAULT NULL,
  `runningBalance` decimal(14,3) DEFAULT 0.000,
  `transactionID` varchar(400) DEFAULT NULL,
  `idempotencyKey` varchar(45) DEFAULT NULL,
  `isWithdrawFundsRequest` tinyint(4) DEFAULT 0,
  `conversionRateLock` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `idempotencyKey_UNIQUE` (`idempotencyKey`),
  KEY `fk_idra_conversionRateLock` (`conversionRateLock`),
  CONSTRAINT `fk_idra_conversionRateLock` FOREIGN KEY (`conversionRateLock`) REFERENCES `ConversionRateLocks` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `investordocuments`;
CREATE TABLE `investordocuments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `InvestorID` varchar(255) DEFAULT NULL,
  `DocumentTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UploadDate` date DEFAULT NULL,
  `Link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_investordocumentsinvestor` (`InvestorID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `investorsto`;
CREATE TABLE `investorsto` (
  `investorid` int(11) NOT NULL DEFAULT 0,
  `isAccountClosed` tinyint(4) DEFAULT 0,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) NOT NULL,
  `expectedShares` int(11) NOT NULL DEFAULT 0,
  `expectedInvestment` int(11) NOT NULL DEFAULT 0,
  `isKYC` tinyint(1) NOT NULL DEFAULT 0,
  `KYCApplied` tinyint(1) NOT NULL DEFAULT 0,
  `KYCUpdateDate` date DEFAULT NULL,
  `KYCCurrentStatus` int(11) NOT NULL DEFAULT 0,
  `inviteFriendEmailText` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `isUsufructuary` tinyint(1) NOT NULL DEFAULT 0,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dividendbank` varchar(4000) DEFAULT NULL,
  `dividendcrypto` varchar(200) DEFAULT NULL,
  `KycExpiryDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `investor_brokers`;
CREATE TABLE `investor_brokers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `investorID` int(11) NOT NULL,
  `brokerID` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `kyc`;
CREATE TABLE `kyc` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `InvestorID` int(11) NOT NULL,
  `appliedFor` int(11) DEFAULT NULL,
  `kyc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_kycinvestor` (`InvestorID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `kyc_fields`;
CREATE TABLE `kyc_fields` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `pageID` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `placeholder` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `error` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `required` tinyint(1) NOT NULL DEFAULT 0,
  `type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FC_page_fields` (`pageID`),
  CONSTRAINT `FC_page_fields` FOREIGN KEY (`pageID`) REFERENCES `kyc_pages` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `kyc_fields` (`ID`, `pageID`, `name`, `label`, `placeholder`, `description`, `error`, `required`, `type`) VALUES
(1,	1,	'personal-info',	NULL,	NULL,	NULL,	NULL,	0,	'personalInfo'),
(2,	3,	'investment-details-text',	NULL,	NULL,	NULL,	NULL,	0,	'html'),
(3,	3,	'currency',	'kyc-investment-details-select-currency-label',	NULL,	NULL,	NULL,	1,	'select'),
(4,	3,	'amount',	'kyc-investment-details-enter-amount-label',	'kyc-investment-details-enter-amount-placeholder',	NULL,	NULL,	1,	'number'),
(5,	3,	'investor-type-label',	NULL,	NULL,	NULL,	NULL,	0,	'h4'),
(6,	3,	'type-investor',	NULL,	NULL,	NULL,	NULL,	1,	'radio'),
(7,	5,	'upload-submit-identity-text',	NULL,	NULL,	NULL,	NULL,	0,	'html'),
(8,	5,	'identity',	NULL,	NULL,	NULL,	NULL,	1,	'upload'),
(9,	6,	'upload-submit-address-text',	NULL,	NULL,	NULL,	NULL,	0,	'html'),
(10,	6,	'address',	NULL,	NULL,	NULL,	NULL,	1,	'upload'),
(11,	7,	'upload-submit-apply-text',	NULL,	NULL,	NULL,	NULL,	0,	'html'),
(12,	7,	'upload-submit-apply-consent',	NULL,	NULL,	NULL,	NULL,	0,	'h4'),
(13,	7,	'consent',	NULL,	NULL,	NULL,	NULL,	1,	'radio');

DROP TABLE IF EXISTS `kyc_field_values`;
CREATE TABLE `kyc_field_values` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `fieldID` int(11) NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FC_field_values` (`fieldID`),
  CONSTRAINT `FC_field_values` FOREIGN KEY (`fieldID`) REFERENCES `kyc_fields` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `kyc_field_values` (`ID`, `fieldID`, `value`, `label`) VALUES
(1,	2,	'kyc-investment-details-text-one',	NULL),
(2,	3,	'USD',	'USD'),
(3,	3,	'EUR',	'EUR'),
(4,	5,	'kyc-investment-details-investor-type-label',	NULL),
(5,	6,	'retail',	'kyc-investment-details-investor-type-retail'),
(6,	6,	'angel',	'kyc-investment-details-investor-type-angel'),
(7,	7,	'kyc-upload-submit-identity-text-one',	NULL),
(8,	9,	'kyc-upload-submit-address-text-one',	NULL),
(9,	11,	'kyc-upload-submit-apply-text-one',	NULL),
(10,	12,	'kyc-upload-submit-apply-consent-label',	NULL),
(11,	13,	'yes',	'kyc-upload-submit-apply-consent-yes'),
(12,	13,	'no',	'kyc-upload-submit-apply-consent-no');

DROP TABLE IF EXISTS `kyc_pages`;
CREATE TABLE `kyc_pages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pageID` int(11) DEFAULT NULL,
  `icon` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FC_page_cards` (`pageID`),
  CONSTRAINT `FC_page_cards` FOREIGN KEY (`pageID`) REFERENCES `kyc_pages` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `kyc_pages` (`ID`, `name`, `title`, `pageID`, `icon`) VALUES
(1,	'investor-info',	'kyc-investor-info',	NULL,	'ti-user'),
(2,	'investment',	'kyc-investment',	NULL,	'ti-money'),
(3,	'investment-details',	'kyc-investment-details',	2,	NULL),
(4,	'upload-submit',	'kyc-upload-submit',	NULL,	'ti-upload'),
(5,	'upload-submit-identity',	'kyc-prove-identity',	4,	NULL),
(6,	'upload-submit-address',	'kyc-prove-address',	4,	NULL),
(7,	'upload-submit-apply',	'kyc-submit-profile',	4,	NULL);

DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `LogDate` datetime DEFAULT NULL,
  `Description` text CHARACTER SET utf16 DEFAULT NULL,
  `InvestorID` int(11) DEFAULT NULL,
  `ActivityType` int(11) NOT NULL,
  `recid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `fk_logsinvestor` (`InvestorID`),
  KEY `fk_logsusers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `params`;
CREATE TABLE `params` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `param` varchar(100) DEFAULT NULL,
  `isglobal` tinyint(11) DEFAULT NULL,
  `datatype` tinyint(11) DEFAULT NULL,
  `stringValue` varchar(10000) DEFAULT NULL,
  `intValue` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `params` (`ID`, `param`, `isglobal`, `datatype`, `stringValue`, `intValue`) VALUES
(1,	'SingleSignInEnabled',	1,	2,	'',	1),
(2,	'RecordsPerPaging',	1,	2,	'',	70),
(3,	'SingleSignInLoginURL',	1,	1,	'',	0),
(4,	'stoTypes',	0,	1,	'[{\"id\": 0,\"value\": \"Tokenzied / Non Tokenzied Shares\"}, {\"id\": 1,\"value\": \"Tokenzied Shares\"}, {\"id\": 2,\"value\": \"Non Tokenzied Shares\"}]',	0),
(5,	'stoinvestortypes',	0,	1,	'[1,2,3,7]',	0),
(6,	'stoinvestortypesnotonshareregister',	0,	1,	'[7]',	0),
(7,	'steps',	0,	1,	'{ \"completePage\": \"completestepgeneral\", \"errorPage\": \"errorstep\", \"steps\": [{ \"liID\": \"investorInfo\", \"SideTitle\": \"1 - KYC Profile\", \"icon\": \"ti-layout-grid2\", \"pageTemplate\": \"step0_bahgs\", \"stepLink\": \"wizard?step=0\", \"isDocumentUploading\": 0 }] }',	0),
(8,	'settings',	0,	1,	'{ \"InvestorCategory\":  { \"0\": \"Private Client\", \"1\":\"Institutional Client\" }, \"DefaultSTOCurreny\": 2, \"EnablePaymentModule\": 1, \"isInternalExchangeEnabled\": 1}',	0),
(9,	'languages',	1,	3,	'[{\"en\": \"English\"}]',	0),
(11,	'KYCInvestorPersonalInfoStep',	1,	2,	'',	0),
(12,	'CustomPlatformCSSStyles',	1,	1,	'',	0),
(13,	'InvestorCombinePropertiesMode',	1,	2,	'',	1),
(14,	'KYCPersonalInfoScreen',	1,	2,	'',	1),
(15,	'SSOModeEnabled',	1,	2,	'',	0),
(16,	'SSORedirectFrontEnd',	1,	1,	'',	0),
(17,	'CognitoUserPoolId',	1,	1,	'us-east-1_2VC29QKTR',	0),
(18,	'CognitoClientId',	1,	1,	'2qgpc5faacjm6cmnmhrq09a3gg',	0),
(19,	'CognitoPool_region',	1,	1,	'us-east-1',	0),
(20,	'InvestorLayoutThemes',	1,	1,	'default',	0),
(21,	'CurrentClientID',	1,	2,	'',	14),
(22,	'ExternalAPILink',	1,	1,	'',	0),
(23,	'ExternalAPILinkUser',	1,	1,	'',	0),
(24,	'ExternalAPILinkPassword',	1,	1,	'',	0),
(25,	'web3Address',	1,	1,	'https://kovan.infura.io/v3/fe41724da6f24b76a782f376b2698ee8',	0),
(26,	'BlockchainBalanceInFractions',	1,	2,	'',	7),
(27,	'NumberSeparatorCharacter',	1,	1,	',',	0),
(28,	'DocuSignEmail',	1,	1,	'',	0),
(29,	'DocuSignPassword',	1,	1,	'',	0),
(30,	'DocuSignIntegrationKey',	1,	1,	'',	0),
(31,	'DocuSignlinkToLoginServer',	1,	1,	'https://demo.docusign.net/restapi/v2/login_information',	0),
(32,	'DocuSignSTOContractID',	1,	1,	'',	0),
(33,	'DocuSignSharesPurchaseContractID',	1,	1,	'',	0),
(34,	'DefaultInvstorKYCStatusWhenActivatedInProject',	1,	2,	'',	1),
(35,	'EthereumTransactionRetriesMillseconds',	1,	2,	'',	5000),
(36,	'EthereumTransactionRetries',	1,	2,	'',	5),
(37,	'LocalHttpsStart',	1,	2,	'',	0),
(38,	'sharePurchaseDocumentsMode',	1,	1,	'internal',	0),
(114,	'debug',	1,	2,	'',	0),
(115,	'KycProvider',	1,	2,	'',	0),
(116,	'BlockPassApiJson',	1,	3,	'{\n	\"ClientId\": \"\",\n	\"ApiKey\": \"\",\n	\"BlockPassWebhookToken\": \"testtoken\"\n}',	1),
(117,	'tangany-client-id',	1,	1,	'',	0),
(118,	'tangany-client-secret',	1,	1,	'',	0),
(119,	'tangany-vault-url',	1,	1,	'https://cw-keyv-demo-xin-fin.vault.azure.net',	0),
(120,	'tangany-subscription',	1,	1,	'',	0),
(121,	'tangany-api-base-url',	1,	1,	'https://api.tangany.com/v1',	0),
(122,	'tangany-network',	1,	1,	'ropsten',	0),
(123,	'investorInternalWalletProjectSpecific',	1,	2,	'',	1),
(124,	'mercuryConfig',	1,	3,	'{\n	\"enabled\": true,\n        \"APIKey\": \"\",\n        \"accountID\": \"6b32caae-3cf0-11ec-86ed-2fe1f3738b09\",\n        \"lastProcessedTransaction\": 0\n}',	0),
(125,	'bimountEnabled',	1,	2,	'',	0),
(126,	'Ravencoin_ServerURL',	1,	1,	'http://35.195.62.196:18766',	0),
(127,	'Ravencoin_Username',	1,	1,	'',	0),
(128,	'Ravencoin_Password',	1,	1,	'',	0),
(129,	'areSTOHostnamesEnabled',	1,	2,	'',	0),
(130,	'investorDashboardTheme',	1,	1,	'{}',	0),
(131,	'VotingPowerInFractions',	1,	2,	'',	2),
(132,	'ShareCountInFractions',	1,	2,	'',	0),
(133,	'SumSubApiJson',	1,	3,	'{\n	\"AppToken\": \"\",\n	\"ApiSecretKey\": \"\",\n	\"WebhookSecretKey\": \"\",\n	\"LevelName\": \"\"\n}',	0),
(134,	'lcwAccessToken',	1,	1,	'19ece0a4-81d5-4668-a332-cb38c65c7f7b',	1),
(135,	'priceOracles',	1,	3,	'[\n	{\n		\"from\": [\n			\"BTC\",\n			\"ETH\"\n		],\n		\"to\": \"USD\",\n		\"interval\": 30000\n	},\n	{\n		\"from\": [\n			\"BTC\",\n			\"ETH\"\n		],\n		\"to\": \"EUR\",\n		\"interval\": 30000\n	},\n	{\n		\"from\": \"EUR\",\n		\"to\": \"USD\",\n		\"interval\": 30000,\n		\"vendor\": \"fixer\"\n	}\n]',	0),
(136,	'VerifyInvestorComApiToken',	1,	1,	'',	0),
(137,	'AccreditationEnabled',	1,	2,	'',	1),
(138,	'instructionalEmailsForPaymentChannelDeposits',	1,	2,	'null',	1),
(139,	'verifyInvestorComUrl',	1,	3,	'{\n	\"backendURL\": \"https://verifyinvestor-staging.herokuapp.com/api/v1/verification_requests/\",\n	\"frontendURL\": \"https://verifyinvestor-staging.herokuapp.com/verify-investor-embedded-api.min.js\"\n}',	0),
(140,	'isMarketSpace',	1,	2,	'',	0),
(141,	'Ravencoin_UserWalletPassword',	1,	1,	'',	0),
(142,	'platformInvestorDashboardLink',	1,	1,	'Update investor dashboard link',	0),
(143,	'polygonWeb3Address',	1,	1,	'',	0),
(144,	'binanceWeb3Address',	1,	1,	'',	0),
(145,	'SMTP_SSL3',	1,	2,	'',	0),
(146,	'IsMarketSpace',	1,	2,	NULL,	0),
(147,	'docusignViewSignedDocumentsUrl',	1,	1,	'',	0),
(148,	'testMode',	1,	2,	'',	0),
(149,	'helloSignApiKey',	1,	1,	'',	NULL),
(150,	'helloSignTestMode',	1,	2,	NULL,	0);

DROP TABLE IF EXISTS `paymentchannels`;
CREATE TABLE `paymentchannels` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `paymentType` tinyint(11) DEFAULT NULL,
  `title` varchar(400) DEFAULT NULL,
  `paymentDetails` varchar(4000) DEFAULT NULL,
  `currencyID` int(11) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `conversionEnabled` tinyint(1) DEFAULT 0,
  `currencyToConvert` int(11) DEFAULT 0,
  `conversionRate` decimal(33,16) DEFAULT 0.0000000000000000,
  `canWithdrawFunds` tinyint(4) DEFAULT 0,
  `sendInstructionalDepositEmail` tinyint(4) DEFAULT 0,
  `depositInstructionText` varchar(10000) DEFAULT NULL,
  `depositInstructionEmailHeader` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `paymentinvestors`;
CREATE TABLE `paymentinvestors` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `Investorid` int(11) DEFAULT NULL,
  `paymentChannelID` int(11) DEFAULT NULL,
  `paymentChannelDetails` varchar(4000) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `Details` varchar(4000) DEFAULT NULL,
  `currencyIDRequested` int(11) DEFAULT NULL,
  `paymentRequested` int(11) DEFAULT NULL,
  `currencyIDReceived` int(11) DEFAULT NULL,
  `paymentReceived` int(11) DEFAULT NULL,
  `PaymentSendDate` datetime DEFAULT NULL,
  `PaymentReceiveDate` datetime DEFAULT NULL,
  `isSettled` tinyint(11) DEFAULT NULL,
  `SettlementNotes` varchar(4000) DEFAULT NULL,
  `InternalNotes` varchar(4000) DEFAULT NULL,
  `InvestorComments` varchar(4000) DEFAULT NULL,
  `sharesOffered` int(11) DEFAULT 0,
  `sharesTypeOffered` int(11) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `PropertyFiles`;
CREATE TABLE `PropertyFiles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `Type` int(11) DEFAULT NULL,
  `Details` varchar(2000) DEFAULT NULL,
  `Title` varchar(400) DEFAULT NULL,
  `Link` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `publicpollsdata`;
CREATE TABLE `publicpollsdata` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `votingid` int(11) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `optionid` int(11) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `RavenAssetDeployment`;
CREATE TABLE `RavenAssetDeployment` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `premimum` decimal(33,16) DEFAULT 0.0000000000000000,
  `nominal` decimal(33,16) DEFAULT 0.0000000000000000,
  `title` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mainAsset` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PublicKey` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mainAssetTransactionID` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qualifierName` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qualifierNameTransactionID` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isQualifierNameTrnasactionDone` smallint(6) DEFAULT NULL,
  `qualifierAssignTransactionID` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qualifierAssignTransactionIDDone` smallint(6) DEFAULT NULL,
  `createRestrictedAssetTransactionID` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAssetDeployed` smallint(6) DEFAULT NULL,
  `isMainAssetTransactionSend` smallint(6) DEFAULT NULL,
  `isMainAssetTransactionDone` smallint(6) DEFAULT NULL,
  `isQualifierNameTrnasactionSend` smallint(6) DEFAULT NULL,
  `qualifierAssignTransactionIDSend` smallint(6) DEFAULT NULL,
  `createRestrictedAssetTransactionIDSend` smallint(6) DEFAULT NULL,
  `unitDecimals` int(11) DEFAULT NULL,
  `ipfsDocumentHash` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `ravencoinPublicAddresses`;
CREATE TABLE `ravencoinPublicAddresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publicKey` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `register`;
CREATE TABLE `register` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `FirstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `secret` varchar(30) DEFAULT NULL,
  `investorType` int(11) DEFAULT 0,
  `CompanyName` varchar(70) DEFAULT '',
  `dateregister` datetime DEFAULT NULL,
  `referByInvestorID` int(11) DEFAULT 0,
  `brokerID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `rights`;
CREATE TABLE `rights` (
  `ID` int(11) NOT NULL,
  `RightName` varchar(255) DEFAULT NULL,
  `typeadminorsto` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rights` (`ID`, `RightName`, `typeadminorsto`) VALUES
(1,	'Investor View',	1),
(2,	'Investor Add/Edit',	1),
(3,	'Company Share Transfer',	1),
(4,	'Investor Authorize',	1),
(5,	'Investor Contracts Management',	1),
(6,	'System Users Management',	0),
(7,	'View Activity Logs',	1),
(8,	'Manage Shares',	1),
(9,	'KYC / Manage Documents',	1),
(10,	'Share Register View',	1),
(11,	'Manage Company News / Updates',	1),
(12,	'Inbox',	1),
(13,	'All STO Admin',	0),
(14,	'Meetings Management',	1),
(15,	'View Documents Module and Directories',	1),
(16,	'View / Download Shared Files',	1),
(17,	'Offer Contracts as Documents',	1),
(18,	'Approve Shares Creation',	1),
(19,	'Investor Share Transfer',	1),
(20,	'Create / Burn Shares',	1),
(21,	'Create New CLass',	1),
(22,	'Summary Register View',	1),
(23,	'History Register View',	1),
(24,	'Send Bulk Email to all Investors',	1),
(25,	'Send Bulk Email to all Registered Investors',	1),
(26,	'Send Bulk Email to all Prospective / Un-Registered Investors',	1),
(27,	'Internal Polls Management',	1),
(28,	'Public Polls Management',	1),
(29,	'View Shared Files (Documents)',	1),
(30,	'View Draft Contracts (Documents)',	1),
(31,	'View Public Files (Documents)',	1),
(32,	'Create / Edit Directories (Documents)',	1),
(33,	'Create / Edit Draft Contracts (Documents)',	1),
(35,	'Upload Shared Files (Documents)',	1),
(36,	'Upload Public Files',	1),
(37,	'Sign and Approve Investor Signed Contracts',	1),
(38,	'Send Messages to Investors',	1),
(39,	'Investor Document Management',	1),
(40,	'Increase / Decrease Investor Balance',	1),
(41,	'Process Payment from Investors',	1);

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `ID` int(11) NOT NULL,
  `Role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `roles` (`ID`, `Role`) VALUES
(1,	'Super Admin');

DROP TABLE IF EXISTS `rolesrights`;
CREATE TABLE `rolesrights` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleID` int(11) NOT NULL,
  `RightID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_rolesrightsrights` (`RightID`),
  KEY `fk_rolesrightsroles` (`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rolesrights` (`ID`, `RoleID`, `RightID`) VALUES
(1,	1,	6);

DROP TABLE IF EXISTS `rolesrightssto`;
CREATE TABLE `rolesrightssto` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleID` int(11) NOT NULL,
  `RightID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rolesrightssto` (`ID`, `RoleID`, `RightID`) VALUES
(1,1,1),
(2,1,2),
(3,1,3),
(4,1,4),
(5,1,7),
(6,1,8),
(7,1,9),
(8,1,10),
(9,1,11),
(10,1,12),
(11,1,14),
(12,1,15),
(13,1,16),
(14,1,17),
(15,1,18),
(16,1,19),
(17,1,20),
(18,1,22),
(19,1,23),
(20,1,24),
(21,1,27),
(22,1,28),
(23,1,30),
(24,1,31),
(25,1,32),
(26,1,33),
(27,1,35),
(28,1,36),
(29,1,37),
(30,1,38),
(31,1,39),
(32,1,40),
(33,1,41),
(34,1,42);

DROP TABLE IF EXISTS `rolessto`;
CREATE TABLE `rolessto` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT 0,
  `Role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rolessto` (`ID`, `stoid`, `Role`) VALUES
(1,0,'Super Admin');

DROP TABLE IF EXISTS `sharePurchaseDocuments`;
CREATE TABLE `sharePurchaseDocuments` (
  `ID` int(11) NOT NULL,
  `requireOnce` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `shares`;
CREATE TABLE `shares` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT 0,
  `shareTypeid` int(11) NOT NULL,
  `PublicKey` varchar(10000) DEFAULT NULL,
  `isBlockchainFrozen` tinyint(1) NOT NULL DEFAULT 0,
  `isBlockchainAuthorized` tinyint(1) NOT NULL DEFAULT 0,
  `shares` decimal(14,3) DEFAULT 0.000,
  `investorID` int(11) NOT NULL,
  `sharesHistoryID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `shareshistory`;
CREATE TABLE `shareshistory` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sharesid` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `investorID` int(11) NOT NULL,
  `shares` decimal(14,3) DEFAULT 0.000,
  `shareTypeid` int(11) NOT NULL,
  `CertificateSerials` varchar(800) DEFAULT NULL,
  `ShareSerials` varchar(800) DEFAULT NULL,
  `purchaserID` int(11) NOT NULL,
  `datePurchase` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `shareswallet`;
CREATE TABLE `shareswallet` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `investorID` int(11) DEFAULT 0,
  `sharesID` int(11) DEFAULT 0,
  `shares` decimal(14,3) DEFAULT 0.000,
  `publicKey` varchar(100) DEFAULT '',
  `isBlocked` tinyint(11) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `sharetypes`;
CREATE TABLE `sharetypes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `stoid` int(11) NOT NULL,
  `totalShares` decimal(14,3) DEFAULT 0.000,
  `companyShares` decimal(14,3) DEFAULT 0.000,
  `nominalValue` decimal(33,16) DEFAULT 0.0000000000000000,
  `isNominalValueApplicable` tinyint(1) NOT NULL DEFAULT 0,
  `isVotingRightsApplicable` tinyint(1) NOT NULL DEFAULT 0,
  `isDividendRightsApplicable` tinyint(1) NOT NULL DEFAULT 0,
  `isblockchain` tinyint(1) NOT NULL DEFAULT 0,
  `ethereumContractAddress` varchar(200) NOT NULL,
  `ethereumWhitelistAddress` varchar(200) NOT NULL,
  `premimum` decimal(33,16) DEFAULT 0.0000000000000000,
  `currencyid` int(11) NOT NULL,
  `needauthorization` tinyint(1) NOT NULL DEFAULT 1,
  `whitelist_abi` mediumtext DEFAULT NULL,
  `token_abi` mediumtext DEFAULT NULL,
  `ethereumBlockchainPublicAddress` varchar(255) DEFAULT NULL,
  `subscriptionform` varchar(256) DEFAULT 'default',
  `minimumSharesToBuyByInvestor` decimal(33,4) DEFAULT 0.0000,
  `blockchainProtocol` int(11) DEFAULT 0,
  `blockchainBuyOrdersAllowed` tinyint(1) DEFAULT 0,
  `reduceSharesForPurchase` decimal(14,3) DEFAULT 0.000,
  `isEnabled` tinyint(1) DEFAULT 1,
  `walletCustodayType` int(11) DEFAULT 0,
  `tanganyWalletID` varchar(200) DEFAULT NULL,
  `investorCanPurchaseDirectly` tinyint(1) DEFAULT 0,
  `AssetName` varchar(255) DEFAULT NULL,
  `AssetTag` varchar(255) DEFAULT NULL,
  `votingPower` decimal(8,2) NOT NULL DEFAULT 1.00,
  `isMeetingRightsApplicable` tinyint(4) DEFAULT 1,
  `isInvestorTradable` tinyint(4) DEFAULT 1,
  `blockchainDecimals` int(11) DEFAULT 18,
  `ipfsDocumentHash` varchar(200) DEFAULT NULL,
  `custodianShares` decimal(14,3) NOT NULL DEFAULT 0.000,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `sharetypesdocuments`;
CREATE TABLE `sharetypesdocuments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sharetypesid` int(11) NOT NULL,
  `documentid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `stocontracts`;
CREATE TABLE `stocontracts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `contents` mediumtext NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `stoinvestortype`;
CREATE TABLE `stoinvestortype` (
  `id` int(11) NOT NULL,
  `type` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `stoinvestortype` (`id`, `type`) VALUES
(1,	'Normal'),
(2,	'Experienced'),
(3,	'Accredited'),
(4,	'Private Client'),
(5,	'Professional Client'),
(6,	'Institutional Client'),
(7,	'Un-Registered'),
(8,	'Reg D'),
(9,	'Reg S');

DROP TABLE IF EXISTS `stopublic`;
CREATE TABLE `stopublic` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `contents` mediumtext DEFAULT NULL,
  `type` int(11) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `stos`;
CREATE TABLE `stos` (
  `ID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL,
  `isActive` tinyint(4) DEFAULT 1,
  `logo` varchar(2000) NOT NULL,
  `ethereumContractAddress` varchar(200) NOT NULL,
  `ethereumWhitelistAddress` varchar(200) NOT NULL,
  `disclamer` mediumtext DEFAULT NULL,
  `stolink` varchar(2000) DEFAULT NULL,
  `stolinkfull` varchar(2000) DEFAULT NULL,
  `stoType` int(11) DEFAULT 0,
  `stoinvestortypes` varchar(2000) DEFAULT NULL,
  `emailFooter` mediumtext DEFAULT NULL,
  `steps` mediumtext DEFAULT NULL,
  `registrationtext` mediumtext DEFAULT NULL,
  `SMTP_Host` varchar(200) DEFAULT NULL,
  `SMTP_Port` varchar(20) DEFAULT NULL,
  `SMTP_User` varchar(200) DEFAULT NULL,
  `SMTP_Password` varchar(200) DEFAULT NULL,
  `SMTP_FromAddress` varchar(200) DEFAULT NULL,
  `website` varchar(2000) DEFAULT NULL,
  `stoinvestortypesnotonshareregister` varchar(100) DEFAULT NULL,
  `companytype` int(11) NOT NULL DEFAULT 0,
  `settings` mediumtext DEFAULT NULL,
  `registrationsuccesstext` mediumtext DEFAULT NULL,
  `tellafriendtext` mediumtext DEFAULT NULL,
  `inviteFriendEmailText` mediumtext DEFAULT NULL,
  `isActiveForInvestorDashboard` tinyint(1) DEFAULT NULL,
  `PropertyFullDetails` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exchangeOpenDate` date DEFAULT '2030-01-01',
  `propertypicture` varchar(200) DEFAULT NULL,
  `docusign_sto_contract` varchar(255) DEFAULT NULL,
  `docusign_sto_purchase` varchar(255) DEFAULT NULL,
  `externalSystemID` int(11) DEFAULT 0,
  `projectAddress` varchar(1000) DEFAULT NULL,
  `LegalDetails` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `affiliatePlanId` int(11) DEFAULT NULL,
  `affiliateShareTypeId` int(11) DEFAULT NULL,
  `isICOShareTypeCompany` int(11) DEFAULT 0,
  `EmailTxtInvestorBulkUpload` mediumtext DEFAULT NULL,
  `isBuyButtonEnabled` tinyint(1) DEFAULT 1,
  `isBimountEnabled` tinyint(4) DEFAULT NULL,
  `projectCost` int(11) DEFAULT 0,
  `VerifyInvestorComHostToken` varchar(255) DEFAULT '',
  `helloSignClientID` varchar(50) DEFAULT NULL,
  `SMTP_FromName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `affiliatePlanId` (`affiliatePlanId`),
  KEY `affiliateShareTypeId` (`affiliateShareTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `stos` (`ID`, `title`, `details`, `isActive`, `logo`, `ethereumContractAddress`, `ethereumWhitelistAddress`, `disclamer`, `stolink`, `stolinkfull`, `stoType`, `stoinvestortypes`, `emailFooter`, `steps`, `registrationtext`, `SMTP_Host`, `SMTP_Port`, `SMTP_User`, `SMTP_Password`, `SMTP_FromAddress`, `website`, `stoinvestortypesnotonshareregister`, `companytype`, `settings`, `registrationsuccesstext`, `tellafriendtext`, `inviteFriendEmailText`, `isActiveForInvestorDashboard`, `PropertyFullDetails`, `exchangeOpenDate`, `propertypicture`, `docusign_sto_contract`, `docusign_sto_purchase`, `externalSystemID`, `projectAddress`, `LegalDetails`, `affiliatePlanId`, `affiliateShareTypeId`, `isICOShareTypeCompany`, `EmailTxtInvestorBulkUpload`, `isBuyButtonEnabled`, `isBimountEnabled`, `projectCost`, `VerifyInvestorComHostToken`, `helloSignClientID`, `SMTP_FromName`) VALUES
    (0, 'e', ' e', 1, ' ', '0x0', '0x0', 'Disclamer', 'testing2.digshares.cloud', 'http://testing2.digishares.cloud', 0, '[1,3,7]', 'email footer', '{\"completePage\":\"completestep\",\"errorPage\":\"errorstep\",\"steps\":[{\"liID\":\"investorInfo\",\"SideTitle\":\"1 - Personal Info\",\"icon\":\"ti-layout-grid2\",\"pageTemplate\":\"step0\",\"stepLink\":\"wizard?step=0\",\"isDocumentUploading\":0},{\"liID\":\"kycamount\",\"SideTitle\":\"2 - Investment\",\"icon\":\"ti-money\",\"pageTemplate\":\"step1\",\"stepLink\":\"wizard?step=1\",\"isDocumentUploading\":0,\"Variables\":[{\"name\":\"TotalAmount\",\"type\":\"string\",\"length\":\"10\",\"mandatory\":0},{\"name\":\"Currency\",\"type\":\"string\",\"length\":\"10\",\"mandatory\":1},{\"name\":\"investorType\",\"type\":\"string\",\"length\":\"10\",\"mandatory\":1}]},{\"liID\":\"IDDoc\",\"SideTitle\":\"3 - Upload/Submit\",\"icon\":\"ti-upload\",\"pageTemplate\":\"step2\",\"stepLink\":\"wizard?step=2\",\"isDocumentUploading\":1,\"Variables\":[{\"name\":\"fileID\",\"type\":\"file\",\"length\":\"-\"},{\"name\":\"fileAddress\",\"type\":\"file\",\"length\":\"-\"}]}]}', 'registration text', 'smtp.gmail.com', '465', 'noreply@digishares.io', '75a48063f97f4adc7c7b8a55717d6762', 'noreply@digishares.io', '', '[7]', 0, '{ \"InvestorCategory\": { \"0\": \"Private Client\", \"1\":\"Business Entity\" },  \"EnablePaymentModule\": 1,  \"DefaultSTOCurreny\": 1, \"isInternalExchangeEnabled\": 1}', ' ', NULL, NULL, NULL, '<p>e</p>', '2030-01-01', ' ', NULL, NULL, 0, 'e', '<p>e</p>', NULL, NULL, 0, NULL, 1, 0, NULL, 'test_only_GpppM9HGZIvWZSVOLg_vuw', NULL, NULL);


DROP TABLE IF EXISTS `stosMetaKeys`;
CREATE TABLE `stosMetaKeys` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint(4) NOT NULL DEFAULT 0,
  `display` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `stosMetaValues`;
CREATE TABLE `stosMetaValues` (
  `stoID` int(11) NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`stoID`,`key`),
  KEY `metakeyfk_idx` (`key`),
  CONSTRAINT `metakeyfk` FOREIGN KEY (`key`) REFERENCES `stosMetaKeys` (`key`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `stofk` FOREIGN KEY (`stoID`) REFERENCES `stos` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `submittedSharePurchaseDocuments`;
CREATE TABLE `submittedSharePurchaseDocuments` (
  `sharePurchaseRequestID` int(11) NOT NULL,
  `submittedDocumentID` int(11) NOT NULL,
  PRIMARY KEY (`sharePurchaseRequestID`,`submittedDocumentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `swaptokens`;
CREATE TABLE `swaptokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(256) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `symbol` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `timezone`;
CREATE TABLE `timezone` (
  `ID` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `timezone` varchar(200) DEFAULT NULL,
  `timepadding` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `tokencreationrequests`;
CREATE TABLE `tokencreationrequests` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `tokens` int(11) DEFAULT NULL,
  `sharetypeid` int(11) DEFAULT NULL,
  `createdbyuserid` int(11) DEFAULT NULL,
  `dattime` datetime DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `translations`;
CREATE TABLE `translations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `locale` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `translation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `updates`;
CREATE TABLE `updates` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT NULL,
  `TITLE` varchar(256) DEFAULT NULL,
  `details` mediumtext DEFAULT NULL,
  `UpdateDate` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `userroles`;
CREATE TABLE `userroles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_userrolesroles` (`RoleID`),
  KEY `fk_userrolesusers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `userroles` (`ID`, `RoleID`, `UserID`) VALUES
(1,1,1);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) DEFAULT 0,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `twofactorenable` tinyint(1) DEFAULT 0,
  `email` varchar(200) DEFAULT NULL,
  `isPlatformAdminLogin` int(11) DEFAULT 0,
  `brokerID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`ID`, `stoid`, `FirstName`, `LastName`, `isActive`, `Username`, `Password`, `twofactorenable`, `email`, `isPlatformAdminLogin`, `brokerID`) VALUES
(1,	0,	'Platform',	'Admin',	1,	'admin',	'8dd0529658e1fda1f3c0d31ff4e847c3f04d32148789f6cf496c1a0c4d119801',	0,	'admin@sharklasers.com',	1,	NULL);

DROP TABLE IF EXISTS `userssto`;
CREATE TABLE `userssto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `stoid` int(11) NOT NULL,
  `roleid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `userssto` (`id`, `userid`, `stoid`, `roleid`) VALUES
(1,1,0,1);

DROP TABLE IF EXISTS `voting`;
CREATE TABLE `voting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stoid` int(11) NOT NULL,
  `title` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contents` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int(11) NOT NULL,
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
  `votetype` int(11) NOT NULL DEFAULT 0,
  `isMeetingFinalResultsCalculated` int(11) NOT NULL DEFAULT 0,
  `timezoneid` int(11) NOT NULL DEFAULT 0,
  `timepadding` int(11) NOT NULL DEFAULT 0,
  `totalInvestors` int(11) NOT NULL DEFAULT 0,
  `totalShares` int(11) NOT NULL DEFAULT 0,
  `totalNominalShares` int(11) NOT NULL DEFAULT 0,
  `isVotingOpenForProxy` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `votingdocuments`;
CREATE TABLE `votingdocuments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `votingid` int(11) DEFAULT NULL,
  `votingoptionid` int(11) DEFAULT NULL,
  `documentlink` varchar(800) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `votingoptions`;
CREATE TABLE `votingoptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `votingid` int(11) NOT NULL,
  `optiontxt` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CompanyComments` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isActiveByAdmin` tinyint(4) NOT NULL DEFAULT 0,
  `isItemCurrentlyDiscussing` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `votinguser`;
CREATE TABLE `votinguser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `votingid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `votingoptionsid` int(11) NOT NULL,
  `votingoptionsvalue` int(11) NOT NULL,
  `votesContributed` int(11) NOT NULL,
  `isCastedByInvestor` int(11) NOT NULL DEFAULT 0,
  `investmentContributed` int(11) NOT NULL,
  `nominalInvestmentContributed` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `votinguserdata`;
CREATE TABLE `votinguserdata` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `investorID` int(11) NOT NULL,
  `votingid` int(11) DEFAULT NULL,
  `attendMeeting` int(11) DEFAULT NULL,
  `unannounceDecision` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- MANUALLY reviewed and added the following missing tables
CREATE TABLE `investorpublickeys` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `investorID` int DEFAULT '0',
  `title` varchar(100) DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--  Do not include migrations table if it is added by db-migrate

CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;

INSERT INTO `migrations` (`id`, `name`, `run_on`) VALUES
(1,'/20210303203819-register-verify','2021-03-26 16:43:21'),
(2,'/20210303224726-set-investor-defaults','2021-03-30 17:08:01'),
(3,'/20210304122811-add-investor-kyc','2021-03-30 17:08:01'),
(4,'/20210303000000-change-collation','2021-04-11 15:32:28'),
(5,'/20210408073322-dividend','2021-04-11 15:32:29'),
(10,'/20210419200121-sharePurchaseDocuments','2021-05-16 17:47:25'),
(11,'/20210503085018-affiliateplan','2021-05-16 17:47:25'),
(12,'/20210518091734-debugFlag','2021-05-18 11:32:19'),
(14,'/20210517025021-affiliate-incomes','2021-07-14 15:04:57'),
(15,'/20210524181254-gcsFiles','2021-07-14 15:05:14'),
(16,'/20210601051228-investorbankaccounts','2021-07-14 15:05:14'),
(17,'/20210601075826-submittedSharePurchaseDocumentsFix','2021-07-14 15:05:14'),
(18,'/20210601092026-insert-blockpass-kyc-params','2021-07-14 15:05:14'),
(19,'/20210602200710-affiliate-incomes-stoid','2021-07-14 15:05:14'),
(20,'/20210621053204-icomodule','2021-07-14 15:05:14'),
(21,'/20210623122531-add-custom-bulk-investors-email-text-to-stos','2021-07-14 15:05:14'),
(22,'/20210625084202-sharepurchaseprivedb','2021-07-14 15:05:14'),
(23,'/20210629091611-amountAndPaymentsDataType','2021-07-14 15:05:14'),
(24,'/20210701103200-blockchainCurrencyFields','2021-07-14 15:05:14'),
(25,'/20210704094731-enableDisableShareTypesField','2021-07-14 15:05:14'),
(26,'/20210708045309-dividendAffiliateCalculatedField','2021-07-14 15:05:15'),
(27,'/20210708051707-changeDividendAffiliateCalculatedField','2021-07-14 15:05:15'),
(28,'/20210712184517-tanganyAPIParamsSetup','2021-07-14 15:05:15'),
(29,'/20210716151258-readjustSharePriceNominalPrice','2021-07-20 12:54:06'),
(30,'/20210720103133-DIG-112-PaymentReports-Changes','2021-07-20 12:54:07'),
(31,'/20210722154432-paymentChannelAutoConvertions','2021-08-12 14:12:24'),
(32,'/20210729114747-monimumSharesToPurchaseTypeChange','2021-08-12 14:12:24'),
(33,'/20210802103839-changeinvestordocumentsfieldtyes','2021-08-12 14:12:25'),
(34,'/20210803183523-increaseresponsefolderspaces','2021-08-12 14:12:25'),
(35,'/20210805113100-switchToInnoDB','2021-08-12 14:12:31'),
(36,'/20210805162041-stoTableFieldsAndManagementOfOtherFields','2021-08-12 14:12:31'),
(37,'/20210812092427-affiliateincomes-details','2021-08-12 14:12:31'),
(38,'/20210813170640-CreateAffiliateReportViewTable','2021-08-25 21:26:30'),
(39,'/20210823110328-addingTokenVolumeToAffilateReportView','2021-08-25 21:26:30'),
(42,'/20210825192452-affiliateReportViewForeignKeyFix','2021-08-25 21:27:19'),
(43,'/20210826121513-addAutoIncrementToCurrency','2021-08-26 14:15:46'),
(44,'/20210830124301-setupGlobalWalletAndAutoSign','2021-09-15 11:06:28'),
(45,'/20210901160425-createBackgroundBlockchainTable','2021-09-15 11:06:28'),
(46,'/20210902152528-addingTokenVolumeToAffiliateReportView','2021-09-15 11:08:45'),
(47,'/20210907114643-investorDepositReceiveAlertTransactionID','2021-09-15 11:08:45'),
(48,'/20210914134925-mercury','2021-09-15 11:08:45'),
(49,'/20210915073439-bimountConfig','2021-09-24 17:33:25'),
(50,'/20210920080602-ravencoinDBChanges','2021-09-24 17:33:25'),
(51,'/20210923131116-voting-power','2021-10-11 11:03:40'),
(52,'/20210929084106-stoBiomuntFlag','2021-10-11 11:03:40'),
(53,'/20211005175107-projectCost','2021-10-11 11:03:40'),
(55,'/20211008175137-areSTOHostnamesEnabled','2021-10-11 15:13:16'),
(57,'/20211011131201-ShareCountInFractions','2021-10-11 15:13:27'),
(58,'/20211011103057-VotingPowerInFractions','2021-10-18 13:05:46'),
(59,'/20211013100014-themeParameter','2021-10-18 13:05:46'),
(63,'/20211021093645-insertSumSubKycParam','2021-10-21 17:26:21'),
(66,'/20211024135817-insertIsMeetingRightsInShareTypes','2021-10-24 16:00:56'),
(67,'/20211028114054-insertIsInvestorTradableInShareTypes','2021-10-28 13:41:45'),
(68,'/20211028160500-addWithdrawFunctionality','2021-10-28 18:06:13'),
(69,'/20211105093030-priceOracles','2021-11-09 18:04:30'),
(74,'/20211109074051-sharetypesdocuments','2021-11-16 17:13:37'),
(77,'/20211113142726-insertVerifyInvestorComParam','2021-11-16 18:30:09'),
(78,'/20211110194219-uploadDateForBulkUploads','2021-11-28 21:07:53'),
(79,'/20211116101517-ConversionRateLock','2021-11-28 21:07:54'),
(80,'/20211122144834-logDateTime','2021-11-28 21:07:54'),
(81,'/20211122172139-depositAmountPrecision','2021-11-28 21:07:54'),
(90,'/20211128200705-regionalDocuments','2021-11-29 19:43:49'),
(91,'/20211130084833-stoMeta','2021-11-30 15:28:52'),
(92,'/20211205192822-docusignWorkflowRefactor','2021-12-05 20:31:49'),
(93,'/20211205185818-ravencoinDeployment','2021-12-08 14:08:15'),
(96,'/20211208145245-instructionalEmailsForPaymentChannels','2021-12-08 18:49:37'),
(97,'/20211210095012-dividendsV2','2021-12-16 14:43:38'),
(100,'/20211216141856-documentDiscriminationByInvestorType','2021-12-16 15:47:04'),
(103,'/20211220134851-verifyInvestorUrl','2021-12-20 15:21:16'),
(104,'/20211222143625-fixVerifyInvestorUrl','2022-01-07 10:57:36'),
(105,'/20220103174013-updateRavencoinDeploymentColumn','2022-01-14 04:31:16'),
(106,'/20220110131637-ravencoinPassword','2022-01-14 04:31:16'),
(107,'/20220113082309-ravenFieldsForAmounts','2022-01-14 04:31:24'),
(108,'/20220115113606-platformInvestorDashboardLink','2022-01-16 12:56:43'),
(110,'/20220116030123-currencyConversionOnSharePurchase','2022-01-16 16:10:45'),
(111,'/20220116163153-polygonWeb3Address','2022-01-24 17:39:52'),
(114,'/20220119150327-newActivityTypes','2022-02-11 13:59:25'),
(112,'/20220124115909-binanceWeb3Address','2022-01-24 17:39:52'),
(113,'/20220125174840-ssl3Param','2022-01-28 10:12:10'),
(115,'/20220202160144-ravencoinAddressTable','2022-02-11 13:59:38'),
(116,'/20220204134918-ravencoinAmountFieldAdded','2022-02-11 14:00:02'),
(117,'/20220206141657-addingDocusignViewSignedDocumentUrlAndTestModeParams','2022-02-11 14:00:02');
-- (118,'/20220221164650-cryptoPaymentsAutomation','2022-03-28 12:15:55'),
-- (119,'/20220417064317-cryptoAddressTypeAddition','2022-04-18 13:46:49'),
-- (120,'/20220421084116-automaticPaymentWithKeyStoreFile','2022-04-27 16:32:46');

-- Manually reviewed and added missing migrations Jun 10 2022.
-- Migrations which need to run on SaaS are commented out
