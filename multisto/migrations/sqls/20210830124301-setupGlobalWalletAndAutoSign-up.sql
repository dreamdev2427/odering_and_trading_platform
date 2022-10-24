/* Replace with your SQL commands */
ALTER TABLE sharetypes ADD COLUMN `investorCanPurchaseDirectly` tinyint(1) DEFAULT 0;  
insert into params(param,isglobal,datatype,stringValue,intValue) values ('investorInternalWalletProjectSpecific',1,2,'',1);