ALTER TABLE `InvestorDepositReceivedAlert` DROP FOREIGN KEY `fk_idra_conversionRateLock`, DROP COLUMN `conversionRate`;
ALTER TABLE `InvestorBuyPropertyAlert` DROP FOREIGN KEY `fk_ibpa_conversionRateLock`, DROP COLUMN `conversionRate`;
DROP TABLE IF EXISTS `ConversionRateLocks`;