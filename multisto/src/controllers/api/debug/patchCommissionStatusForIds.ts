import { Request, Response } from 'express';
import logger from '../../../logger';
import AffiliateIncomesSqlService from '../../../services/investorClient/affiliate/data/AffiliateIncomesSqlService';
import debugWrapper from './common/debugWrapper';

export default async (req: Request, res: Response) => {
    debugWrapper(req, res, async () => {
        const incomeSvc = new AffiliateIncomesSqlService();

        try {
            const stoId = +(req.params.stoId) ?? -1;
            const status = +(req.params.status) ?? -1;
            if (Number.isNaN(status) || status < 0 && status > 2) {
                throw new Error(`Unsupported affiliate commission status:${status}`);
            }
            if (Number.isNaN(stoId) || stoId < 0) {
                throw new Error(`Unsupported stoId:${stoId}`);
            }

            const ids = (req.body) as number[];
            if (!ids.length) throw new Error(`Empty array in request body`);
            await incomeSvc.setStatusForInvestors(ids, status);
            logger.info(`Debug API: Updated all commissions to status ${status} for ids:[${ids}] in sto:${stoId}`);
            res.sendStatus(200);
        } catch(e: any) {
            res.sendStatus(404);
            logger.error(`${e.stack}`);
        }
    });
}
