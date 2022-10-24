/* Replace with your SQL commands */
insert into params(param,isglobal,datatype,stringValue,intValue) values ('tangany-client-id',1,1,'464ac44d-9d4d-4146-8882-398e8f1d3281',0);
insert into params(param,isglobal,datatype,stringValue,intValue) values ('tangany-client-secret',1,1,'UBnL.TfwXY1EN7llf3acm6dQ-0-l8-3Q55',0);
insert into params(param,isglobal,datatype,stringValue,intValue) values ('tangany-vault-url',1,1,'https://cw-keyv-demo-xin-fin.vault.azure.net',0);
insert into params(param,isglobal,datatype,stringValue,intValue) values ('tangany-subscription',1,1,'74350b79022c42d8b1da7f5f771091cc',0);
insert into params(param,isglobal,datatype,stringValue,intValue) values ('tangany-api-base-url',1,1,'https://api.tangany.com/v1',0);
insert into params(param,isglobal,datatype,stringValue,intValue) values ('tangany-network',1,1,'ropsten',0);
ALTER TABLE sharetypes ADD COLUMN `walletCustodayType` int(11) default 0;
ALTER TABLE sharetypes ADD COLUMN `tanganyWalletID` varchar(200) DEFAULT NULL;