ALTER TABLE `investor`
DROP COLUMN `mercuryID`,
DROP INDEX `mercuryID_UNIQUE` ;

ALTER TABLE `InvestorDepositReceivedAlert`
DROP COLUMN `idempotencyKey`,
DROP INDEX `idempotencyKey_UNIQUE` ;

DELETE FROM params WHERE param = "mercuryConfig";

