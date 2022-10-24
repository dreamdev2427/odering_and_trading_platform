import { Request, Response } from 'express';
import checkDebugToken from './checkDebugToken';

export default (req: Request, res: Response, callback: () => void) => {
    try {
        if (checkDebugToken(req)) {
            callback();
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(404);
    }
}
