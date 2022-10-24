ALTER TABLE `investor` DROP `affiliateStatus`;
DROP TABLE `affiliateplans`;
ALTER TABLE `stos`
    DROP FOREIGN KEY `affiliatePlanId`,
    DROP `affiliatePlanId`;
