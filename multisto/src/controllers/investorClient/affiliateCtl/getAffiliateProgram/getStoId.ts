import { Request } from 'express';
import IStoService from '../../../../services/investorClient/affiliate/data/IStoService';
import StoSqlService from '../../../../services/investorClient/affiliate/data/StoSqlService';

/**
 * Get the second sto id if it exists, because that should be the default project selected.
 * STO 0 is not to be selected but will be selected if there is no next one.
 */
const getSecondStoId = async (): Promise<number> => {
    const stoSvc: IStoService = new StoSqlService();
    const ids: number[] = await stoSvc.getStoIds();
    ids.sort();
    if (ids[1] > 0) {
        return ids[1];
    }
    return 0;
}
export const getStoId = async (req: Request): Promise<number> => {
    const stoSvc: IStoService = new StoSqlService();

    if (req.query.project) {
        const stoExists = await stoSvc.getStoExists(+req.query.project);
        if (stoExists) {
            const id = +(req.query.project);
            if (id > 0) {
                return id;
            }
            return getSecondStoId();
        }
    }
    const id = +((req as any).session.stoid);
    if (id > 0 ) {
        return id;
    }
    return getSecondStoId();
}

export default getStoId;