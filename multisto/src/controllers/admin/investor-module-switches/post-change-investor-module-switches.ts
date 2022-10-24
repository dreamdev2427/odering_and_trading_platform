import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import { updateParam } from "../kycProviderModeSettings/postChangeKycProviderMode";

export default async (req: any, res: Response) => {
  try {
    const { paramName, isParamEnabled } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();

    await updateParam(params, isParamEnabled, paramName, paramsSqlService);

    await mysql.initializeGlobals();

    res.redirect("/platform/investorModulesSwitches");
  } catch (error) {
    logger.error(
      `${error} - Error occurred in post-Change-investor-module-switches`
    );
  }
};
