CREATE TABLE IF NOT EXISTS blockchains (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(256) NULL DEFAULT NULL,
    PRIMARY KEY (id)    
);

insert into blockchains(id, title) values (1, 'Ethereum');
insert into blockchains(id, title) values (2, 'Binance');
insert into blockchains(id, title) values (3, 'Polygon');
insert into blockchains(id, title) values (4, 'Bitcoin');
insert into blockchains(id, title) values (5, 'Ravencoin');


CREATE TABLE IF NOT EXISTS autoCryptoPaymentReceiptProcessing (
    id INT NOT NULL AUTO_INCREMENT,
    investorId INT NULL DEFAULT NULL,
    Details VARCHAR(2000) NULL DEFAULT NULL,
    AmountReceived DECIMAL(30,18) NOT NULL,
    CryptoCoinID INT NULL DEFAULT NULL,
    stoId INT NOT NULL,
    TransactionHash VARCHAR(400) NULL DEFAULT NULL,
    isProcessedSuccessfully INT NOT NULL,
    failureReason VARCHAR(2000) NULL DEFAULT NULL,
    DateReceived datetime,
    PRIMARY KEY (id),
    FOREIGN KEY (stoId) REFERENCES stos(ID) ON DELETE CASCADE,
    FOREIGN KEY (investorId) REFERENCES investor(ID) ON DELETE SET NULL
);


