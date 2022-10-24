/* Replace with your SQL commands */
CREATE TABLE `blockchainSharesTransferTransactions` (
    `ID` int(11) AUTO_INCREMENT NOT NULL,
    `hostname` varchar(400) DEFAULT NULL,        
    `toAddress` varchar(400) DEFAULT NULL,        	
    `stoid` int(11),
    `adminid` int(11),    
	`investorID` int(11),
	`shareTypeID` int(11),
    `amountToSend` decimal(14,3) default 0,
    `investmentDetails` varchar(400) DEFAULT NULL,        	
    `investmentAmount` decimal(14,3) default 0,
	`reduceInvestorBalance` int(11),	
	`status` int(11),
	`recordDate` datetime,
    `transactionID` varchar(400) DEFAULT NULL,
    `errorMessage` varchar(4000) DEFAULT NULL,        		
    PRIMARY KEY (`ID`)
);