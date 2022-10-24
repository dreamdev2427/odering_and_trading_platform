/* Replace with your SQL commands */

insert into params(param,isglobal,datatype,stringValue,intValue) values ('Ravencoin_ServerURL',1,1,'',0);
insert into params(param,isglobal,datatype,stringValue,intValue) values ('Ravencoin_Username',1,1,'',0);
insert into params(param,isglobal,datatype,stringValue,intValue) values ('Ravencoin_Password',1,1,'',0);

ALTER TABLE sharetypes ADD COLUMN `AssetName` varchar(255) DEFAULT NULL;
ALTER TABLE sharetypes ADD COLUMN `AssetTag` varchar(255) DEFAULT NULL;



