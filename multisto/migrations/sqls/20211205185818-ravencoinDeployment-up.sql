/* Replace with your SQL commands */

CREATE TABLE `RavenAssetDeployment` (
    `ID` int(11) AUTO_INCREMENT NOT NULL,
    `stoid` int(11),
    `premimum` decimal(33,16) default 0,    
    `nominal` decimal(33,16) default 0,    
    `title` varchar(2000) DEFAULT NULL,    
    `mainAsset` varchar(2000) DEFAULT NULL,    
    `PublicKey` varchar(2000) DEFAULT NULL,    
    `mainAssetTransactionID` varchar(2000) DEFAULT NULL,    
    `isMainAssetTransactionDone` bit,                    
    `qualifierName` varchar(2000) DEFAULT NULL,    
    `qualifierNameTransactionID` varchar(2000) DEFAULT NULL,    
    `isQualifierNameTrnasactionDone` smallint,    
    `qualifierAssignTransactionID` varchar(2000) DEFAULT NULL,    
    `qualifierAssignTransactionIDDone` smallint,    
    `createRestrictedAssetTransactionID` varchar(2000) DEFAULT NULL,    
    `isAssetDeployed` smallint,
     PRIMARY KEY (`ID`)
);

ALTER TABLE sharetypes ADD blockchainDecimals int DEFAULT 18;
