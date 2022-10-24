/* Replace with your SQL commands */
ALTER TABLE paymentchannels ADD COLUMN `conversionEnabled` tinyint(1) default 0;
ALTER TABLE paymentchannels ADD COLUMN `currencyToConvert` int(11) default 0;
ALTER TABLE paymentchannels ADD COLUMN `conversionRate` decimal(33,16) default 0;
