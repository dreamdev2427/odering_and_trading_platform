import { Response } from "express";
import logger from "../../../logger";
import common from "../../../modules/common";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";

export default async (req: any, res: Response) => {
  try {
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const is2FAEnabledByDefaultParam = await paramsSqlService.findParamByName(
      "is2FAEnabledByDefault"
    );
    const is2FAForcedForAllParam = await paramsSqlService.findParamByName(
      "is2FAForcedForAll"
    );
    res.render(
      "platform/twoFactorAuthenticationSettings/twoFactorAuthenticationSettings",
      {
        partials: common.getPlatformPartials(),
        Data: common.getPlatformCommonPageProperties(req),
        csrfToken: req.csrfToken(),
        is2FAEnabledByDefault: encodeURIComponent(
          JSON.stringify(is2FAEnabledByDefaultParam)
        ),
        is2FAForcedForAll: encodeURIComponent(
          JSON.stringify(is2FAForcedForAllParam)
        ),
      }
    );
  } catch (error: any) {
    logger.error(`${error} - Error occurred in getTwoFactorPage`);
  }
};
