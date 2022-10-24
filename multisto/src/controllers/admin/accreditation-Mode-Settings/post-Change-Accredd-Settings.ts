import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import { Params } from "../../../Schema";

const updateParam = async (
  params: Params[],
  newValue: string,
  paramName: string,
  paramsSqlService: IParamsService
) => {
  const param = params.find((p) => p.param === paramName);
  if (param && param.stringValue !== newValue) {
    param.stringValue = newValue;
    await paramsSqlService.setParams(param);
  }
};

export default async (req: any, res: Response) => {
  try {
    const { accreddRedirectLink } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();

    await updateParam(
      params,
      accreddRedirectLink,
      "AccreddRedirectLink",
      paramsSqlService
    );

    await mysql.initializeGlobals();

    res.redirect("/platform/accreditationMode");
  } catch (error) {
    logger.error(`${error} - Error occurred in post-Change-Accredd-Settings`);
  }
};
