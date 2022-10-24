/* Replace with your SQL commands */
alter table  RavenAssetDeployment add column unitDecimals int;
alter table  RavenAssetDeployment modify column createRestrictedAssetTransactionID varchar(200) DEFAULT NULL;
alter table  RavenAssetDeployment modify column mainAsset varchar(200) DEFAULT NULL;
alter table  RavenAssetDeployment modify column PublicKey varchar(200) DEFAULT NULL;
alter table  RavenAssetDeployment modify column mainAssetTransactionID varchar(200) DEFAULT NULL;
alter table  RavenAssetDeployment modify column qualifierName varchar(200) DEFAULT NULL;
alter table  RavenAssetDeployment modify column qualifierNameTransactionID varchar(200) DEFAULT NULL;
alter table  RavenAssetDeployment modify column qualifierAssignTransactionID varchar(200) DEFAULT NULL;
alter table  RavenAssetDeployment add column ipfsDocumentHash varchar(200) DEFAULT NULL;
alter table  sharetypes add column ipfsDocumentHash varchar(200) DEFAULT NULL;



