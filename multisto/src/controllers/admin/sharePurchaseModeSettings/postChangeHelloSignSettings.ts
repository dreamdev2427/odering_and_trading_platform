import { Response } from 'express';
import logger from '../../../logger';
import common from '../../../modules/common';
import mysql from '../../../modules/mysql';
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";


export default async (req: any, res: Response) => {
    try {
        const { helloSignTestMode, helloSignClientID, helloSignApiKey } = req.body;
        const paramsSqlService: IParamsService = new ParamsSqlService();
        const testMode = await paramsSqlService.findParamByName('helloSignTestMode');
        if (helloSignTestMode !== undefined && testMode.intValue !== 1){
            testMode.intValue = 1;
            await paramsSqlService.setParams(testMode);
        } else if(helloSignTestMode === undefined && testMode.intValue !== 0) {
            testMode.intValue = 0;
            await paramsSqlService.setParams(testMode);
        }
        const apiKey = await paramsSqlService.findParamByName('helloSignApiKey');
        if (apiKey !== helloSignApiKey) {
            apiKey.stringValue = helloSignApiKey;
            await paramsSqlService.setParams(apiKey);
        }
        const stoService: IStoService  = new StoSqlService();
        const sto0 = (await stoService.getSto(0));
        if (sto0 && helloSignClientID !== sto0?.helloSignClientID){
            sto0.helloSignClientID = helloSignClientID;
            await stoService.updateParameter(0, 'helloSignClientID', helloSignClientID);
        }

        await mysql.initializeGlobals()
        res.redirect("/platform/sharePurchaseModeSettings");
    } catch(error) {
        logger.error(`${error}`);
        common.handleError(req, res, "Error in getSharePurchaseModeMainPageInfo.")
    }
}
