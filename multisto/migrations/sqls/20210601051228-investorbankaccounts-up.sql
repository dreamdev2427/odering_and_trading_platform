CREATE TABLE `InvestorBanks` (
    `ID` int(11) AUTO_INCREMENT NOT NULL,
    `investorid` int(11),  
    `accountTitle` varchar(200) DEFAULT NULL, 
    `accountNo` varchar(100) DEFAULT NULL,     
    `routingNumber` varchar(100) DEFAULT NULL,         
    `iban` varchar(100) DEFAULT NULL,             
    `accountHolderName` varchar(200) DEFAULT NULL,             
    `accountHolderCity` varchar(200) DEFAULT NULL,                 
    `accountHolderCountry` varchar(200) DEFAULT NULL,                 
    `accountHolderAddress` varchar(200) DEFAULT NULL,                 
    `accountPostalCode` varchar(200) DEFAULT NULL,                     
    `bankName` varchar(200) DEFAULT NULL,             
    `bankCity` varchar(200) DEFAULT NULL,                 
    `bankCountry` varchar(200) DEFAULT NULL,                 
    `bankAddress` varchar(200) DEFAULT NULL, 
    PRIMARY KEY (`ID`)
);


CREATE TABLE `InvestorBanksDividend` (
    `ID` int(11) AUTO_INCREMENT NOT NULL,
    `InvestorBanksID` int(11),  
    `stoid` int(11),
    PRIMARY KEY (`ID`)
);


