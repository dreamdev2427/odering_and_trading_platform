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

    if (req.query.project) {
        const stoExists =
            !Number.isNaN(+req.query.project) &&
            await stoSvc.getStoExists(+req.query.project);

        if (stoExists) {
            const id = +(req.query.project);
            return id;
        }
    }
    return 0; // Default - display all stos
}

export default getStoId;
