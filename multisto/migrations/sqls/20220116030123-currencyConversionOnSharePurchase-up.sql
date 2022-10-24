ALTER TABLE InvestorBuyPropertyAlert MODIFY purchasePriceOffered DECIMAL(20,10);
SET @exist_Check := (
    select count(*) from information_schema.columns 
    where TABLE_NAME='InvestorBuyPropertyAlert' 
    and COLUMN_NAME='fromCurrencyID' 
    and TABLE_SCHEMA=database()
) ;
SET @sqlstmt := IF(@exist_Check=0,'ALTER TABLE InvestorBuyPropertyAlert ADD COLUMN fromCurrencyID INT NULL', 'select ''''');
prepare stmt from @sqlstmt ;
execute stmt ;

ALTER TABLE investments MODIFY AmountInvested DECIMAL(20, 10);
ALTER TABLE InvestorBalancesInCompanyAccounts MODIFY Amount DECIMAL(20, 10);
ALTER TABLE investments CHANGE DateTime DateTime TIMESTAMP;
ALTER TABLE logs MODIFY Description TEXT CHARACTER SET utf16;
