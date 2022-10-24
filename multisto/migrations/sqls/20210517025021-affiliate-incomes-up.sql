CREATE TABLE `affiliateincomes` (
    `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `investorId` INT(11) NOT NULL,
    /* NO FOREIGN KEY AT THE MOMENT, CAN'T CREATE DUE TO ERROR */
    `amount` DECIMAL(18,8) NOT NULL, /* Equivalent to 8-Byte Double, except precise */
    `tokens` DECIMAL(27,18) NOT NULL, /* 12-Byte Triple precision useful for crypto currencies */
    `remark` VARCHAR(512) NOT NULL /* TEMPORARY IMPLEMENTATION */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `activitytype`
    CHANGE `Activity` `Activity` VARCHAR(250);

ALTER TABLE `activitytype`
    ADD UNIQUE (`Activity`);

INSERT INTO `activitytype`(`ID`, `Activity`) VALUES(17, "Award Affiliate Income (automatic)");

/* Default share type for affiliate incomes */
ALTER TABLE `stos`
    ADD `affiliateShareTypeId` INT NULL DEFAULT NULL,
    ADD FOREIGN KEY (`affiliateShareTypeId`) REFERENCES `sharetypes`(`ID`) ON DELETE SET NULL;
