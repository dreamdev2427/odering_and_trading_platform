/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS `ConversionRateLocks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `stoId` INT NOT NULL,
    `investorId` INT NOT NULL,
    `currencyFrom` INT NOT NULL,
    `currencyTo` INT NOT NULL,
    `rate` DECIMAL(27,18) NOT NULL,
    `lockedAt` DATETIME NOT NULL,
    `status` ENUM('temporary','pending','historical') NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`stoId`) REFERENCES `stos`(`ID`) ON DELETE CASCADE,
    FOREIGN KEY (`investorId`) REFERENCES `investor`(`ID`) ON DELETE CASCADE,
    FOREIGN KEY (`currencyFrom`) REFERENCES `currency`(`ID`) ON DELETE CASCADE,
    FOREIGN KEY (`currencyTo`) REFERENCES `currency`(`ID`) ON DELETE CASCADE
);
ALTER TABLE `InvestorDepositReceivedAlert`
    ADD COLUMN conversionRateLock INT NULL,
    ADD CONSTRAINT `fk_idra_conversionRateLock` FOREIGN KEY (`conversionRateLock`) REFERENCES `ConversionRateLocks`(`id`) ON DELETE SET NULL;
ALTER TABLE `InvestorBuyPropertyAlert`
    ADD COLUMN conversionRateLock INT NULL,
    ADD CONSTRAINT `fk_ibpa_conversionRateLock` FOREIGN KEY (`conversionRateLock`) REFERENCES `ConversionRateLocks`(`id`) ON DELETE SET NULL;