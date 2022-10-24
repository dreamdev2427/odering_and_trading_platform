import { Request, Response } from "express";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";

export default async (req: Request, res: Response) => {
    const stoService: IStoService  = new StoSqlService();
    try{
        const json = JSON.parse(req.body.txtStoSettings);
        await stoService.updateParameter(req.body.stoId, 'Settings', JSON.stringify(json));
        res.redirect(`settings?id=${req.body.stoId}`);
    } catch (error) {
        res.status(400).send('Invalid JSON in STO Settings');
    }
}