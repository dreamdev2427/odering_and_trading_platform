import { Request, Response } from 'express';
import { Hmac } from "crypto";
import logger from '../../../logger';
import { queryBlockPassForInvestorData } from "../../../services/investorClient/externalKyc/blockPass/BlockPassService";

const crypto = require('crypto');

export default async (req: Request, res: Response) => {
    const globalObj:any = global as any; // Fetch global object
    // creating hmac object
    const hmac: Hmac = crypto.createHmac('sha256', globalObj.config.BlockPassApiJson.BlockPassWebhookToken);
    // passing the data to be hashed
    const data: Hmac = hmac.update(JSON.stringify(req.body));
    // Creating the hmac in the required format
    const genHmac: string = data.digest('hex');

    const webhookHeader = req.get('x-hub-signature');
    if (webhookHeader !== genHmac){
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logger.info(`Unauthorized request to BlockPass webhook from ip: ${ip}. Please check token header.`);
        res.status(401);
    }

    const investorId: string = req.body.refId.substr(0,  req.body.refId.indexOf('-'));
    const stoId: string = req.body.refId.substring(req.body.refId.indexOf('-') + 1);

    await queryBlockPassForInvestorData(investorId, stoId);
    res.sendStatus(200);
}