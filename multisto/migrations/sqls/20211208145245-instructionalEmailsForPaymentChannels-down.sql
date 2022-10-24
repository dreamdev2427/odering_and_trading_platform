ALTER TABLE paymentchannels
DROP COLUMN sendInstructionalDepositEmail;
ALTER TABLE paymentchannels
DROP COLUMN depositInstructionText;
ALTER TABLE paymentchannels
DROP COLUMN depositInstructionEmailHeader;
DELETE FROM params WHERE param = 'instructionalEmailsForPaymentChannelDeposits' AND id > 0;