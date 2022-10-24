/* Replace with your SQL commands */
ALTER TABLE currency ADD COLUMN `isBlockchainBased` tinyint(1) default 0;
insert into currency(ID, Country, Currency, Abbreviation, Symbol, isBlockchainBased) values(7, 'Blockchain', 'USDT', 'USDT', '₮', 1);