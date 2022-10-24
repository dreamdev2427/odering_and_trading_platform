import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";

export default async (req: any, res: Response) => {
  try {
    const { signatureMode, drawSignaturePrefillFonts } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const param = await paramsSqlService.findParamByName(
      "internalSignatureMode"
    );
    switch (signatureMode) {
      case "draw":
        param.stringValue = signatureMode;
        break;
      case "checkmark":
        param.stringValue = signatureMode;
        break;
      default:
        break;
    }
    await paramsSqlService.setParams(param);

    if (drawSignaturePrefillFonts) {
      const prefillFontsParam = await paramsSqlService.findParamByName(
        "drawSignaturePrefillFonts"
      );
      const validJsonString = JSON.stringify(
        drawSignaturePrefillFonts.split(",")
      );
      if (prefillFontsParam.stringValue !== validJsonString) {
        prefillFontsParam.stringValue = validJsonString;
        await paramsSqlService.setParams(prefillFontsParam);
      }
    }

    await mysql.initializeGlobals();
    res.redirect("/platform/sharePurchaseModeSettings");
  } catch (error) {
    logger.error(`${error} - Error in postChangeInternalSignSettings.`);
  }
};
