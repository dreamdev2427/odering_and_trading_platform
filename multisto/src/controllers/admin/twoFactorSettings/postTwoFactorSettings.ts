import { Response } from "express";
import mysql from "../../../modules/mysql";
import logger from "../../../logger";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import IInvestorService from "../../../services/investorClient/investor/data/IInvestorService";
import InvestorSqlService from "../../../services/investorClient/investor/data/InvestorSQLService";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../services/investorClient/documents/data/SqlQuery";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";

export default async (req: any, res: Response) => {
  try {
    const { is2FAEnabledByDefaultToggle, is2FAForcedForAllToggle } = req.body;
    const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
    const investorService: IInvestorService = new InvestorSqlService(query);

    let default2FA = 0;
    let force2FA = 0;

    if (is2FAEnabledByDefaultToggle) {
      default2FA = 1;
    }
    if (is2FAForcedForAllToggle) {
      force2FA = 1;
      default2FA = 1;
    }

    const paramsSqlService: IParamsService = new ParamsSqlService();
    const is2FAEnabledByDefault = await paramsSqlService.findParamByName(
      "is2FAEnabledByDefault"
    );
    const is2FAForcedForAll = await paramsSqlService.findParamByName(
      "is2FAForcedForAll"
    );

    if (
      is2FAEnabledByDefault &&
      is2FAEnabledByDefault.intValue !== default2FA
    ) {
      is2FAEnabledByDefault.intValue = default2FA;
      await paramsSqlService.setParams(is2FAEnabledByDefault);
    }
    if (is2FAForcedForAll && is2FAForcedForAll.intValue !== force2FA) {
      is2FAForcedForAll.intValue = force2FA;
      await paramsSqlService.setParams(is2FAForcedForAll);

      if (force2FA) await investorService.enable2FAForAll();
    }
    res.redirect("/platform/twoFactorAuthenticationSettings");
  } catch (error) {
    logger.error(
      `${error} - Error occurred in twoFactorAuthenticationSettings`
    );
  }
};
