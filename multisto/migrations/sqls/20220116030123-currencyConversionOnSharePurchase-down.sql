ALTER TABLE InvestorBuyPropertyAlert MODIFY purchasePriceOffered DECIMAL(20,5);
ALTER TABLE InvestorBuyPropertyAlert
    DROP COLUMN fromCurrencyID;
ALTER TABLE investments MODIFY AmountInvested DECIMAL(20, 5);
ALTER TABLE InvestorBalancesInCompanyAccounts MODIFY Amount DECIMAL(20, 5);
ALTER TABLE investments CHANGE DateTime DateTime DATE;
ALTER TABLE logs MODIFY Description TEXT CHARACTER SET utf8mb4;