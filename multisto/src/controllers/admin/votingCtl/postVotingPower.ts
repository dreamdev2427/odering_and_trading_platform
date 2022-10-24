import { Request, Response } from 'express';
import logger from '../../../logger';
import mysql from '../../../modules/mysql';

interface ShareType {
    id: string,
    votingPower: number,
}
export default async (req: Request, res: Response) => {

    try {
        const values: ShareType[] = Object.keys(req.body)
        .filter((key) =>
            !Number.isNaN(key) &&
            req.body[key] >= 0 && req.body[key] <= 1000000
        )
        .map((key) => ({
            id: key,
            votingPower: req.body[key],
        }));

        const promises = values.map(value =>
            mysql.executeSQLStatement(`UPDATE sharetypes SET votingPower = ? WHERE id = ?`,[value.votingPower,value.id]));

        await Promise.all(promises);
    } catch(error) {
        logger.error(`${error}`);
    }

    res.redirect('/admin/voting');
}
