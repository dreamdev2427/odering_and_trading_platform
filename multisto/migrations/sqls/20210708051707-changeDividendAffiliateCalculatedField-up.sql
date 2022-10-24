/* Replace with your SQL commands */
ALTER TABLE dividendreceivers drop COLUMN `AffiliateAmount`;
ALTER TABLE dividendreceivers ADD COLUMN `AffiliateAmount` decimal(14,3) default 0;