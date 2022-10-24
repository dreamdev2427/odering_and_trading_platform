import { Request, Response } from "express";
import common from "../../../modules/common";
import { extractQueryProperties } from "../../../services/investorClient/investor/dto/SearchAndOrderQueryLists";
import IRegisterService from "../../../services/investorClient/registration/data/IRegisterService";
import RegisterSqlService from "../../../services/investorClient/registration/data/RegisterSqlService";

export default async (req: Request, res: Response) => {
  const registerService: IRegisterService = new RegisterSqlService();
  try {
    const recordsPage = req.query.recordsPage ?? 1;
    const queryProperties = extractQueryProperties(req);
    const unfinishedRegistersCount = await registerService.countUnfinishedRegisters(
      queryProperties.searchQueryProperties
    );
    const unfinishedRegisters = await registerService.getUnfinishedRegisters(
      +recordsPage,
      queryProperties.searchQueryProperties,
      queryProperties.orderQueryProperties
    );
    const globalObj = global as any;

    res.render("platform/registerlist", {
      RecordCount: unfinishedRegistersCount,
      RecordsPerPaging: globalObj.config.RecordsPerPaging,
      DataRows: unfinishedRegisters,
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    common.handleError(
      req,
      res,
      `${
        (error as Error).message
      } - Error occurred in getAllIncompleteKycInvestors`
    );
  }
};
