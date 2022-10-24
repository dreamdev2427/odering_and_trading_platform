CREATE TABLE `cloudFiles` (
  `ID` INT NOT NULL,
  `filename` VARCHAR(1000) NOT NULL,
  `url` VARCHAR(1000),
  PRIMARY KEY (`ID`));
ALTER TABLE `cloudFiles` 
CHANGE COLUMN `ID` `ID` INT(11) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `documentuser` 
ADD COLUMN `signatureFileID` INT NULL AFTER `signaturedate`;
