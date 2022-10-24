import { Response } from 'express';
import logger from '../../../logger';
import IAffiliateModule from '../../../services/investorClient/affiliate/api/IAffiliateModule';
import RemoteAffiliateService from '../../../services/investorClient/affiliate/api/RemoteAffiliateService';
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';

export default async (req: any, res: Response) => {
    const config = loadConfig();
    if (config?.enabled) {
        const affSvc: IAffiliateModule = new RemoteAffiliateService(config);
        try {
            logger.info(`affiliateCtl postReferrer - received request to set affiliate referrer for investor id:${req.body.investorId} to email:${req.body.referrerEmail}`);
            // if (Number.isNaN(req.body.referrerEmail)) {
                await affSvc.setReferrerByEmail(+(req.body.investorId), req.body.referrerEmail);
            // } else {
                // await affSvc.setReferrerById(+(req.body.investorId), req.body.referrerEmail);
            // }
            req.flash('successMessage', `Referrer changed successfully for id:${req.body.investorId} to investor with email ${req.body.referrerEmail}.`);
            res.redirect('referralnetwork');
        } catch (error) {
            logger.error(`Error in admin affiliateCtl postReferrer:\n${error}`);
            req.flash('errorMessage', 'Error: Referrer could not be changed.');
            res.redirect('referralnetwork');
        }
    } else {
        res.sendStatus(404);
    }
}
