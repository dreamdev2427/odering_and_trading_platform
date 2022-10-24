// TODO: currently unused file. Leaving just in case someone complains about the multisto investor side not working. NOTE: sto.steps is also no longer used for KYC screens

import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import { updateParam } from "../kycProviderModeSettings/postChangeKycProviderMode";

export default async (req: any, res: Response) => {
  try {
    const { accreditationProvider, enableAccreditation } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();

    await updateParam(
      params,
      enableAccreditation,
      "AccreditationEnabled",
      paramsSqlService
    );
    await updateParam(
      params,
      accreditationProvider,
      "AccreditationProvider",
      paramsSqlService
    );

    await mysql.initializeGlobals();

    res.redirect("/platform/accreditationMode");
  } catch (error) {
    logger.error(
      `${error} - Error occurred in post-Change-Accreditation-Settings`
    );
  }
};
