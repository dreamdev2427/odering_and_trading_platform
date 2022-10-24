/* This migration is to be executed by existing clients */
/* Change default collation to unicode. Moved to js module. */
/* ALTER DATABASE `multisto` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci; */

/* These columns are problematic */
/*
ALTER TABLE `paymentinvestors` MODIFY `paymentChannelDetails` VARCHAR(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `paymentinvestors` MODIFY `Details` VARCHAR(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `paymentinvestors` MODIFY `SettlementNotes` VARCHAR(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `paymentinvestors` MODIFY `InternalNotes` VARCHAR(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `paymentinvestors` MODIFY `InvestorComments` VARCHAR(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
*/

/* Convert all collated columns to unicode */
SELECT CONCAT
        (
            'ALTER TABLE ', 
                t1.TABLE_SCHEMA, 
                '.', 
                t1.table_name, 
                ' MODIFY ', 
                t1.column_name, 
                ' ', 
                t1.data_type, 
                '(' , 
                    CHARACTER_MAXIMUM_LENGTH, 
                ')', 
                ' CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;'
        )
from 
    information_schema.columns t1
where 
    t1.TABLE_SCHEMA like ? AND
    t1.COLLATION_NAME IS NOT NULL AND
    t1.COLLATION_NAME NOT IN ('utf8mb4_unicode_ci') AND 
    t1.table_name NOT IN ('paymentinvestors'); -- Do not change columns in this table specifically. Exceeds row byte limit.

/* Convert all tables to unicode */
SELECT CONCAT
        (
            'ALTER TABLE ',
                tbl.TABLE_SCHEMA,
                '.',
                tbl.TABLE_NAME,
                ' CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;'
        )
FROM
    information_schema.TABLES tbl
WHERE tbl.TABLE_SCHEMA = ?;
