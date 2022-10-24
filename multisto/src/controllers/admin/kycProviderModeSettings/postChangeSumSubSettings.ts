import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";

export default async (req: any, res: Response) => {
  try {
    const { appToken, apiSecretKey, webhookSecretKey, levelName } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();
    const sumSubApiJson = params.find((p) => p.param === "SumSubApiJson");
    if (sumSubApiJson?.stringValue) {
      const object = JSON.parse(sumSubApiJson.stringValue);
      if (object.AppToken !== appToken) {
        object.AppToken = appToken;
      }
      if (object.ApiSecretKey !== apiSecretKey) {
        object.ApiSecretKey = apiSecretKey;
      }
      if (object.WebhookSecretKey !== webhookSecretKey) {
        object.WebhookSecretKey = webhookSecretKey;
      }
      if (object.LevelName !== levelName) {
        object.LevelName = levelName;
      }
      sumSubApiJson.stringValue = JSON.stringify(object);
      await paramsSqlService.setParams(sumSubApiJson);
      await mysql.initializeGlobals();
    }
    res.redirect("/platform/kycProviderModeSettings");
  } catch (error) {
    logger.error(`${error} - Error occurred in postChangeSumSubSettings`);
  }
};
