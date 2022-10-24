ALTER TABLE stos ADD COLUMN `isICOShareTypeCompany` int(11) DEFAULT 0;
ALTER TABLE investor ADD COLUMN `PoliticallyExposedPerson` tinyint(1) NOT NULL DEFAULT 0;
ALTER TABLE investor ADD COLUMN `PoliticallyExposedPersonPost` varchar(255) DEFAULT NULL;
