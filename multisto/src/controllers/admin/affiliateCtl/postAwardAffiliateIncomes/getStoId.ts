import { Request } from 'express';
import IStoService from '../../../../services/investorClient/affiliate/data/IStoService';
import StoSqlService from '../../../../services/investorClient/affiliate/data/StoSqlService';

/**
 * Returns the stoId from the request query params.
 * Works similar to the controller in investorClient, but does allow sto 0 (= all stos)
 * @param req
 * @returns
 */
export const getStoId = async (req: Request): Promise<number> => {
    const stoSvc: IStoService = new StoSqlService();

    if (req.body.stoid) {
        const stoExists =
            !Number.isNaN(+req.body.stoid) &&
            await stoSvc.getStoExists(+req.body.stoid);

        if (stoExists) {
            const id = +(req.body.stoid);
            return id;
        }
    }
    return -1; // Default -1 as to not accidentally execute an action for all stos
}

export default getStoId;
