SET @exist_Check := (
    select count(*) from information_schema.columns
    where TABLE_NAME='RavenAssetDeployment'
    and COLUMN_NAME='isMainAssetTransactionSend'
    and TABLE_SCHEMA=database()
) ;
SET @sqlstmt := IF(@exist_Check=1,'	alter table RavenAssetDeployment drop column isMainAssetTransactionSend;', 'select ''''');
prepare stmt from @sqlstmt ;
execute stmt ;
alter table  RavenAssetDeployment add column isMainAssetTransactionSend smallint;

SET @exist_Check := (
    select count(*) from information_schema.columns
    where TABLE_NAME='RavenAssetDeployment'
    and COLUMN_NAME='isMainAssetTransactionDone'
    and TABLE_SCHEMA=database()
) ;
SET @sqlstmt := IF(@exist_Check=1,'alter table  RavenAssetDeployment drop column isMainAssetTransactionDone;', 'select ''''');
prepare stmt from @sqlstmt ;
execute stmt ;
alter table  RavenAssetDeployment add column isMainAssetTransactionDone smallint;
alter table  RavenAssetDeployment add column isQualifierNameTrnasactionSend smallint;
alter table  RavenAssetDeployment add column qualifierAssignTransactionIDSend smallint;
alter table  RavenAssetDeployment add column createRestrictedAssetTransactionIDSend smallint;

