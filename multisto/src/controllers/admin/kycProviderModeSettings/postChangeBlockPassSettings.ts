import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";

export default async (req: any, res: Response) => {
  try {
    const {
      blockPassClientID,
      blockPassApiKey,
      blockPassBlockPassWebhookToken,
    } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();
    const blockPassApiJson = params.find((p) => p.param === "BlockPassApiJson");
    if (blockPassApiJson?.stringValue) {
      const object = JSON.parse(blockPassApiJson.stringValue);
      if (object.ClientId !== blockPassClientID) {
        object.ClientId = blockPassClientID;
      }
      if (object.ApiKey !== blockPassApiKey) {
        object.ApiKey = blockPassApiKey;
      }
      if (object.BlockPassWebhookToken !== blockPassBlockPassWebhookToken) {
        object.BlockPassWebhookToken = blockPassBlockPassWebhookToken;
      }
      blockPassApiJson.stringValue = JSON.stringify(object);
      await paramsSqlService.setParams(blockPassApiJson);
      await mysql.initializeGlobals();
    }
    res.redirect("/platform/kycProviderModeSettings");
  } catch (error) {
    logger.error(`${error} - Error occurred in postChangeBlockPassSettings`);
  }
};
