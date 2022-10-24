import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import { updateParam } from "../sharePurchaseModeSettings/postChangeDocuSignSettings";

export default async (req: any, res: Response) => {
  try {
    const { frontendURL, backendURL, verifyInvestorComApiToken } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();
    const verifyInvestorComUrl = { frontendURL, backendURL };

    await updateParam(
      params,
      JSON.stringify(verifyInvestorComUrl),
      "verifyInvestorComUrl",
      paramsSqlService
    );
    await updateParam(
      params,
      verifyInvestorComApiToken,
      "VerifyInvestorComApiToken",
      paramsSqlService
    );

    await mysql.initializeGlobals();

    res.redirect("/platform/accreditationMode");
  } catch (error) {
    logger.error(
      `${error} - Error occurred in post-Change-VerifyInvestor-Settings`
    );
  }
};
