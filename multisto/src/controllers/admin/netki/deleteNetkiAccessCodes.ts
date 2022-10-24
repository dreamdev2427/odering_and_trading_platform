import { Response } from "express";
import logger from "../../../logger";
import NetkiSQLService from "../../../services/platform/netki/NetkiSQLService";

export default async (req: any, res: Response) => {
  try {
    const netkiSqlService = new NetkiSQLService();
    await netkiSqlService.deleteAccessCodes();
    res.redirect("/platform/kycProviderModeSettings");
  } catch (error) {
    logger.error(`${error} - Error occurred in deleteNetkiAccessCodes`);
  }
};
