ALTER TABLE `investor`
ADD COLUMN `mercuryID` VARCHAR(45) NULL AFTER `PoliticallyExposedPersonPost`,
ADD UNIQUE INDEX `mercuryID_UNIQUE` (`mercuryID` ASC);

ALTER TABLE `InvestorDepositReceivedAlert`
ADD COLUMN `idempotencyKey` VARCHAR(45) NULL AFTER `transactionID`,
ADD UNIQUE INDEX `idempotencyKey_UNIQUE` (`idempotencyKey` ASC);

insert into params(param,isglobal,datatype,stringValue,intValue) values ('mercuryConfig',1,3,'{"enabled":false}',0);
