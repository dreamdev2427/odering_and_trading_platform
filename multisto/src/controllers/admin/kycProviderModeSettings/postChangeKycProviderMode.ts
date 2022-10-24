// TODO: currently unused file. Leaving just in case someone complains about the multisto investor side not working. NOTE: sto.steps is also no longer used for KYC screens

import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import { Params } from "../../../Schema";

export const updateParam = async (
  params: Params[],
  reqValue: string,
  paramName: string,
  paramsSqlService: IParamsService
) => {
  const param = params.find((p) => p.param === paramName);
  const newValue = parseInt(reqValue, 10);
  if (!Number.isNaN(newValue) && param && param.intValue !== newValue) {
    param.intValue = newValue;
    await paramsSqlService.setParams(param);
  }
};

export default async (req: any, res: Response) => {
  try {
    const { kycProvider, kycRequirementStep } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();
    // change kyc Provider variable (affects both multisto and v2)
    await updateParam(params, kycProvider, "KycProvider", paramsSqlService);

    // change kyc requirement steps variable (affects only v2)
    await updateParam(
      params,
      kycRequirementStep,
      "KycRequirementStep",
      paramsSqlService
    );

    // change kyc steps (affects only multisto)
    const steps = await paramsSqlService.findParamByName("steps");
    let kycProviderSteps = "";
    switch (kycProvider) {
      // internal
      case 0:
        kycProviderSteps = steps?.stringValue ?? "";
        break;
      // block pass
      case 1:
        kycProviderSteps = `{ "completePage": "completestepgeneral", "errorPage": "errorstep", "steps": [{ "liID": "investorInfo", "SideTitle": "1 - KYC Profile", "icon": "ti-layout-grid2", "pageTemplate": "step0_bahgs", "stepLink": "wizard?step=0", "isDocumentUploading": 0 }] }`;
        break;
      // sum sub
      case 2:
        kycProviderSteps =
          '{ "completePage": "completestepgeneral", "errorPage": "errorstep", "steps": [{ "liID": "investorInfo", "SideTitle": "1 - KYC Profile", "icon": "ti-layout-grid2", "pageTemplate": "step0_sumsub", "stepLink": "wizard?step=0", "isDocumentUploading": 0 }] }';
        break;
      // netki
      case 3: // do nothing as multisto implementation was never meant to be
        break;
      // internal
      default:
        kycProviderSteps = steps?.stringValue ?? "";
        break;
    }
    const stoService: IStoService = new StoSqlService();
    const stos = await stoService.getStos();
    stos.map(async (sto) => {
      await stoService.updateParameter(sto.ID, "steps", kycProviderSteps);
    });
    await mysql.initializeGlobals();
    res.redirect("/platform/kycProviderModeSettings");
  } catch (error) {
    logger.error(`${error} - Error in postChangeKycProviderMode.`);
  }
};
