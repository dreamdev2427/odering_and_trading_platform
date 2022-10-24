DROP TABLE IF EXISTS `sharetypesdocuments`;
CREATE TABLE `sharetypesdocuments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `sharetypesid` INT NOT NULL,
    `documentid` INT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;