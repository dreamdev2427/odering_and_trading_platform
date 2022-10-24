INSERT INTO params (param, isglobal, datatype, stringValue, intValue)
    VALUES ('VerifyInvestorComApiToken', '1', '1', '', '0'), ('AccreditationEnabled', '1', '2', '', '0');


ALTER TABLE stos
ADD VerifyInvestorComHostToken varchar(255) DEFAULT '';

ALTER TABLE investorsto
ADD KycExpiryDate DATE DEFAULT null;