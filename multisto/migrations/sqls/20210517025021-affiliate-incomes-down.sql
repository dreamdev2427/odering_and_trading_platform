DROP TABLE `affiliateincomes`;
ALTER TABLE `activitytype` DROP INDEX `Activity`; /* drops unique constraint */
DELETE FROM `activitytype` WHERE `Activity` = "Award Affiliate Income (automatic)";
ALTER TABLE `stos` DROP `affiliateShareTypeId`;
