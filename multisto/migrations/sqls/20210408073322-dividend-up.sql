
SET @dbname = DATABASE();
SET @tablename = "investor";
SET @col1 = "dividendPeriod";
SET @col2 = "DOBCountry";
SET @col3 = "taxResidencyCountry";
SET @preparedStatement = (SELECT IF(
    (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
        (table_name = @tablename)
        AND (table_schema = @dbname)
        AND (column_name IN (@col1, @col2, @col3))
    ) > 0,
    "SELECT 1",
    CONCAT(
        "ALTER TABLE ", @tablename,
        " ADD COLUMN `", @col1, "` INT(11) DEFAULT 1,",
        " ADD COLUMN `", @col2, "` VARCHAR(400) DEFAULT NULL,"
        " ADD COLUMN `", @col3, "` VARCHAR(400) DEFAULT NULL;"
    )
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;
