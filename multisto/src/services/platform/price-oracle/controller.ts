import { Request, Response } from 'express';
import logger from '../../../logger';
import { ConversionRateLocks } from '../../../Schema';
import ConversionLockSqlService from './data/ConversionLockSqlService';
import IConversionRateLockService from './data/IConversionRateLockService';
import { getRate } from './job';

export const getConversionRate = (req: Request, res: Response) => {
    if (!req.params.from || !req.params.to) {
        res.sendStatus(400);
    }
    const from = req.params.from.toUpperCase();
    const to = req.params.to.toUpperCase();

    const rate = getRate(from, to);
    if(rate === undefined) {
        res.sendStatus(404);
    } else {
        res.send({ from, to, rate });
    }
}

export default getConversionRate;

/** Locks the chosen conversion rate to what it factually is set right now in our platform. */
export const lockConversionRate = (req: Request, res: Response) => {
    if (!req.params.from || !req.params.to) {
        res.sendStatus(400);
    }
    // const from = req.params.from.toUpperCase();
    // const to = req.params.to.toUpperCase();

    // const rate = getRate(from, to);
    throw new Error(`Not implemented yet!`); // TODO: Implement lock rate controller (if still relevant)
}

const lockSvc: IConversionRateLockService = new ConversionLockSqlService();

export const lockConversionRatesTemp = async (stoId: number, investorId: number): Promise<void> =>
    lockSvc.lockRatesTemporarily(stoId, investorId);

export const lockConversionRatesForPurchase = async (stoId: number, investorId: number, channelId: number): Promise<ConversionRateLocks | undefined> =>
    lockSvc.lockRateForPurchase(stoId, investorId, channelId);

/** After payment approval */
export const releaseConversionRateLocks = async (stoId: number, investorId: number, channelId: number): Promise<void> =>
    lockSvc.releasePendingLocks(stoId, investorId, channelId);

export const refreshConversionRates = async (stoId: number, investorId: number): Promise<void> =>
    lockSvc.refreshTemporaryLocks(stoId, investorId);
export const postRefreshConversionRates = async (req: Request, res: Response): Promise<void> => {
    // TODO: Optional refresh of conversion rates
    const session: any = (req as any).session;
    try {
        await lockSvc.refreshTemporaryLocks(session.stoId, session.user.ID);
    } catch (e) {
        const error = new Error(`${e}`);
        logger.error(`${error.stack}`);
    }
}
