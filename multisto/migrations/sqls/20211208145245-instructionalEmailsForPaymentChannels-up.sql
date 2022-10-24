ALTER TABLE paymentchannels
ADD sendInstructionalDepositEmail TINYINT DEFAULT 0;
ALTER TABLE paymentchannels
ADD depositInstructionText varchar(10000) DEFAULT null;
ALTER TABLE paymentchannels
ADD depositInstructionEmailHeader varchar(10000) DEFAULT null;
INSERT INTO params(param, isglobal, datatype, intValue) VALUES ('instructionalEmailsForPaymentChannelDeposits', 1, 2, 0);