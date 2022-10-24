import { Response } from 'express';
import logger from '../../../logger';
import IAffiliateModule from '../../../services/investorClient/affiliate/api/IAffiliateModule';
import RemoteAffiliateService from '../../../services/investorClient/affiliate/api/RemoteAffiliateService';
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';
import { getCommissionsMode } from './getAffiliatePayouts/getCommissionsMode';
import { getStoId } from './postAwardAffiliateIncomes/getStoId';

export default async (req: any, res: Response) => {
    const config = loadConfig();
    if (config?.enabled) {
        // Verify selected STO
        const stoId = await getStoId(req);
        const commissionsMode = getCommissionsMode(req);
        let errorFlag = false; // It crashes without this

        if (stoId < 1) {
            logger.error(`admin affiliateCtl postAwardAffiliateIncomes - bad sto id:${stoId}`);
            req.flash('errorMessage', 'Error: Can not award tokens in selected project. You have either selected all projects or an error has occured.');
            res.redirect(`affiliatepayouts`);
            errorFlag = true;
        }
        if (commissionsMode) {
            logger.error(`admin affiliateCtl postAwardAffiliateIncomes - commissionsMode is not supported`);
            req.flash('errorMessage', 'Error: Individual awards can not be paid. Feature not yet supported.');
            res.redirect(`affiliatepayouts/?project=${stoId}`);
            errorFlag = true;
        }
        if (!errorFlag) {
            const affSvc: IAffiliateModule = new RemoteAffiliateService(config);
            try {
                logger.info(`Received request to award all incomes in sto id:${stoId}`);
                await affSvc.distributeUnpaidIncomes(req.session.user?.ID || 0, stoId);
                req.flash('successMessage', `All previously-unawarded incomes in the selected project (${stoId}) are now distributed.`);
                res.redirect(`affiliatepayouts/?project=${stoId}`);
            } catch (error) {
                logger.error(`Error in admin affiliateCtl putAffiliateAwards:\n${error}`);
                req.flash('errorMessage', 'Error: Some awards may not have been distributed successfully. Let someone check the logs.');
                res.redirect(`affiliatepayouts/?project=${stoId}`);
            }
        }
    } else {
        res.sendStatus(404);
    }
}
