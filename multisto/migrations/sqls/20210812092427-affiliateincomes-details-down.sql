ALTER TABLE affiliateincomes
DROP FOREIGN KEY (affiliateId),
DROP FOREIGN KEY (investmentId),
DROP COLUMN affiliateId,
DROP COLUMN investmentId,
DROP COLUMN purchaseAmount,
DROP COLUMN purchaseTokens,
DROP COLUMN affiliateLevel;