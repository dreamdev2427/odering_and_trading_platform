import { Request, Response } from "express";
import logger from "../../../logger";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";

export default async (req: Request, res: Response) => {
    const stoService: IStoService  = new StoSqlService();
    try{
        await stoService.updateParameter(req.body.stoId, 'VerifyInvestorComHostToken', req.body.txtVerifyInvestorHostToken);
        res.redirect(`settings?id=${req.body.stoId}`);
    } catch (error) {
        logger.error(`${error} - Error occurred in postStoVerifyInvestorComHostToken`);
        res.status(400).send('Bad Request');
    }
}