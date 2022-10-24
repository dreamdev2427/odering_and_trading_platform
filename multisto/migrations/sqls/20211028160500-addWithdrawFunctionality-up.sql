ALTER TABLE paymentchannels
ADD canWithdrawFunds TINYINT DEFAULT 0;

ALTER TABLE InvestorDepositReceivedAlert
ADD isWithdrawFundsRequest TINYINT DEFAULT 0;