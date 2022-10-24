CREATE TABLE `affiliateplans` (
    `id` INT DEFAULT 0 PRIMARY KEY,
    `name` VARCHAR(256) UNIQUE NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `stos`
    ADD `affiliatePlanId` INT NULL DEFAULT NULL,
    ADD FOREIGN KEY (`affiliatePlanId`) REFERENCES `Affiliateplans`(`pk_id`) ON DELETE SET NULL;

ALTER TABLE `investor` ADD `affiliateStatus` TINYINT NOT NULL DEFAULT '0';
