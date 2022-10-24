/* Replace with your SQL commands */
ALTER TABLE InvestorBalancesInCompanyAccounts MODIFY Amount decimal(14,3) default 0;
ALTER TABLE InvestorDepositReceivedAlert MODIFY Amount decimal(14,3) default 0;
ALTER TABLE InvestorDepositReceivedAlert MODIFY runningBalance decimal(14,3) default 0;
ALTER TABLE InvestorBuyPropertyAlert MODIFY Shares decimal(14,3) default 0;
ALTER TABLE shareshistory MODIFY shares decimal(14,3) default 0;
ALTER TABLE investments MODIFY AmountInvested decimal(14,3) default 0;
