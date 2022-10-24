import { Request, Response } from 'express';
import mysql from '../../modules/mysql';

export default async (req: Request, res: Response) => {
    const sql = 'select id, title, isActive from stos where id > 0';
    mysql.executeSQLStatement(sql, []).then((result: any) => {
        res.json(result);
    }).catch((error: any) => {
        res.json({"status": "error"})
    });
}