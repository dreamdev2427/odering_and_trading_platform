CREATE TABLE IF NOT EXISTS `AffiliateReportView` (
	`ID` int AUTO_INCREMENT NOT NULL,
	`stoid` int DEFAULT NULL,
	`rootInvestorId` int DEFAULT NULL,
    `lineInvestorId` int DEFAULT NULL,
    `lineName` varchar(100) DEFAULT NULL,
    `armVolume` decimal(18,8) DEFAULT 0,
    `rootInvestorTotalPersonalInvestmentVolume` decimal(18,8) DEFAULT 0,
	PRIMARY KEY (`ID`),
    FOREIGN KEY(`stoid`) REFERENCES stos(`ID`),
    FOREIGN KEY(`rootInvestorId`) REFERENCES investor(`ID`),
    FOREIGN KEY(`lineInvestorId`) REFERENCES investor(`ID`)
)