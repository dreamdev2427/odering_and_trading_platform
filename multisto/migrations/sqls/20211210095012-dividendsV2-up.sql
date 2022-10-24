CREATE TABLE IF NOT EXISTS DividendTemplates (
    id INT NOT NULL AUTO_INCREMENT,
    historyId INT NULL DEFAULT NULL,
    stoId INT NOT NULL,
    shareTypeId INT NULL DEFAULT NULL,
    currencyId INT NULL DEFAULT NULL,
    channelId INT NULL DEFAULT NULL,
    isActive INT NOT NULL,
    periodUnit ENUM('days','months') NOT NULL,
    period SMALLINT NOT NULL,
    awardValue DECIMAL(30,18) NOT NULL,
    title VARCHAR(256) NULL DEFAULT NULL,
    awardStrategy ENUM('formula', 'feePerShare', 'percentPremiumValuePerShare', 'dividendAmountDistributed') NOT NULL,
    awardFormula VARCHAR(256) NULL DEFAULT NULL,
    status ENUM('unused', 'used', 'historical') NOT NULL DEFAULT 'unused',
    PRIMARY KEY (id),
    FOREIGN KEY (stoId) REFERENCES stos(ID) ON DELETE CASCADE,
    FOREIGN KEY (shareTypeId) REFERENCES sharetypes(ID) ON DELETE SET NULL,
    FOREIGN KEY (currencyId) REFERENCES currency(ID) ON DELETE SET NULL,
    FOREIGN KEY (channelId) REFERENCES paymentchannels(ID) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS DividendPayouts (
    id INT NOT NULL AUTO_INCREMENT,
    templateId INT NOT NULL,
    dateTimeFrom DATETIME NOT NULL,
    dateTimeDue DATETIME NOT NULL,
    lastUpdatedAt DATETIME NULL DEFAULT NULL,
    status ENUM('future', 'pending', 'completed', 'rejected', 'reverting', 'reverted', 'exception') NOT NULL,
    totalAmount DECIMAL(30,18) NOT NULL,
    companyShares DECIMAL(30,18) NOT NULL,
    totalInvestorShares DECIMAL(30,18) NOT NULL,
    investors INT,
    PRIMARY KEY (id),
    FOREIGN KEY (templateId) REFERENCES DividendTemplates(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS DividendInvestorPayouts (
    id INT NOT NULL AUTO_INCREMENT,
    investorId INT NOT NULL,
    payoutId INT NOT NULL,
    amount DECIMAL(30,18) NOT NULL,
    investorShares DECIMAL(30,18) NOT NULL,
    lastUpdatedAt DATETIME NULL DEFAULT NULL,
    status ENUM('future', 'pending', 'completed', 'rejected', 'reverting', 'reverted', 'exception') NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (investorId) REFERENCES investor(ID),
    FOREIGN KEY (payoutId) REFERENCES DividendPayouts(id) ON DELETE CASCADE
);
CREATE OR REPLACE VIEW DividendPayoutsView
AS SELECT
    p.id, templateId, dateTimeFrom, dateTimeDue, lastUpdatedAt, p.status as status, totalAmount, companyShares, totalInvestorShares, investors,
    stoId, shareTypeId, currencyId, channelId, isActive, periodUnit, period, awardValue, title, awardStrategy, template.status as templateStatus
FROM DividendPayouts p
INNER JOIN
    DividendTemplates template
    ON templateId = template.id;
CREATE OR REPLACE VIEW DividendInvestorPayoutsView
AS SELECT
    i.id, templateId, investorId, payoutId, amount, investorShares, i.lastUpdatedAt, i.status as status,
    dateTimeFrom, dateTimeDue, total.lastUpdatedAt as totalLastUpdatedAt, total.status as totalStatus, totalAmount, companyShares, totalInvestorShares, investors,
    stoId, shareTypeId, currencyId, channelId, isActive, periodUnit, period, awardValue, title, awardStrategy, template.status as templateStatus
FROM DividendInvestorPayouts i
INNER JOIN
    DividendPayouts total
    ON i.payoutId = total.id
INNER JOIN
    DividendTemplates template
    ON total.templateId = template.id;