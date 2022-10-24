import logger from '../../../../logger';
import mysql from '../../../../modules/mysql';

const CronJob = require('cron').CronJob;

const checkAndUpdateAccreditationExpiry = async (): Promise<void> => {
    const stmt = `UPDATE investorsto
                    SET KYCCurrentStatus = CASE
                       WHEN KycExpiryDate < DATE(NOW()) THEN 1
                       ELSE KYCCurrentStatus
                    END
                    WHERE id > 0;`;
    await mysql.executeSQLStatement(stmt, []).catch((e) => {
        const error = new Error(`${e}`);
        logger.error(`Daily Investor Accreditation Expiration Worker $------------------------\n${error.stack}\n------------------------`);
    });
}

const dailyAccreditationExpiryCheckCronJob = new CronJob('00 00 00 * * *', (async () => {
    logger.info(`Running daily Accreditation Expiry Check job at 00:00 CET`);
    await checkAndUpdateAccreditationExpiry();
    logger.info(`DONE - Daily Accreditation Expiry Check job at 00:00 CET`);
}));

export default dailyAccreditationExpiryCheckCronJob;
