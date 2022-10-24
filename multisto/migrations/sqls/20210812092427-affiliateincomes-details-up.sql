ALTER TABLE affiliateincomes
ADD affiliateId INT NULL,
ADD FOREIGN KEY (affiliateId) REFERENCES investor(ID) ON DELETE SET NULL,
ADD investmentId INT NULL,
ADD FOREIGN KEY (investmentId) REFERENCES investments(ID) ON DELETE SET NULL,
ADD purchaseAmount DECIMAL(14,3) NULL,
ADD purchaseTokens DECIMAL(14,3) NULL,
ADD affiliateLevel SMALLINT NULL;