import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";

export default async (req: any, res: Response) => {
  try {
    const {
      isInternalWalletStoSpecificEnabledToggle,
      isInternalWalletGlobalEnabledToggle,
    } = req.body;
    let walletMode = 0;
    if (isInternalWalletStoSpecificEnabledToggle) {
      walletMode = 1;
    }
    if (isInternalWalletGlobalEnabledToggle) {
      walletMode = 2;
    }
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();
    const dbWalletMode = params.find(
      (p) => p.param === "investorInternalWalletProjectSpecific"
    );
    if (dbWalletMode && dbWalletMode.intValue !== walletMode) {
      dbWalletMode.intValue = walletMode;
      await paramsSqlService.setParams(dbWalletMode);
      await mysql.initializeGlobals();
    }
    res.redirect("/platform/internalWalletModeSettings");
  } catch (error) {
    logger.error(
      `${error} - Error occurred in postChangeInternalWalletSettings`
    );
  }
};
