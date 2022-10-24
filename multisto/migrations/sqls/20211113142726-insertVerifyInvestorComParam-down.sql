DELETE FROM params WHERE param ="VerifyInvestorComApiToken" OR param ="AccreditationEnabled";

ALTER TABLE stos
DROP COLUMN VerifyInvestorComHostToken;

ALTER TABLE investorsto
DROP COLUMN KycExpiryDate;