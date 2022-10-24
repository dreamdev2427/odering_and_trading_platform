import { Response } from 'express';
import logger from '../../../../logger';
import DividendsModule from '../../../../services/investors/dividends/api/DividendsModule';
import IDividendsModule from '../../../../services/investors/dividends/api/IDividendsModule';

const validateRequest = (req: any, res: Response): boolean => {
    if (!req.session.stoid) {
        res.sendStatus(403);
        return false;
    }
    if (!req.body.id || Number.isNaN(+(req.body.id))) {
        res.status(400).send({ "message": "Missing attribute 'id'" });
        return false;
    }
    return true;
}
export default async (req: any, res: Response) => {
    try {
        if (validateRequest(req, res)) {
            const svc: IDividendsModule = new DividendsModule();
            const success = await svc.updateIsActive(+(req.body.id), (req.body.isActive !== undefined));
            if (success) {
                res.sendStatus(200);
            } else {
                res.status(400).send({ "message": "Template ID not found" });
            }
        }
    } catch (err) {
        const error = new Error(`${err}`);
        logger.error(`${error.stack}`);
        res.sendStatus(500);
    }
}
