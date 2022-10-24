import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";

export default async (req: any, res: Response) => {
  try {
    const {
      docSigningMode,
      testModeInput,
      skipDocumentSignScreenInput,
    } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const param = await paramsSqlService.findParamByName(
      "sharePurchaseDocumentsMode"
    );
    switch (docSigningMode) {
      case "internal":
        param.stringValue = docSigningMode;
        break;
      case "docuSign":
        param.stringValue = docSigningMode;
        break;
      case "helloSign":
        param.stringValue = docSigningMode;
        break;
      default:
        break;
    }
    await paramsSqlService.setParams(param);

    const tm = await paramsSqlService.findParamByName("testMode");
    if (testModeInput !== tm.intValue) {
      tm.intValue = testModeInput;
      await paramsSqlService.setParams(tm);
    }
    const skipDocument = await paramsSqlService.findParamByName(
      "skipDocumentSignScreen"
    );
    if (skipDocumentSignScreenInput !== skipDocument.intValue) {
      skipDocument.intValue = skipDocumentSignScreenInput;
      await paramsSqlService.setParams(skipDocument);
    }
    await mysql.initializeGlobals();
    res.redirect("/platform/sharePurchaseModeSettings");
  } catch (error) {
    logger.error(`${error} - Error in postChangeSharePurchaseDocumentsMode.`);
  }
};
