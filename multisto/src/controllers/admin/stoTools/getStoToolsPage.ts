import { Request, Response } from "express";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";
import common from "../../../modules/common";
import UsersSqlService from "../../../services/platform/Users/UsersSqlService";
import IUsersService from "../../../services/platform/Users/IUsersService";

export default async (req: Request, res: Response) => {
  const stoService: IStoService = new StoSqlService();
  const userService: IUsersService = new UsersSqlService();
  try {
    const stos = await stoService.getStos();
    const users = await userService.getUsers();
    res.render("platform/stotools", {
      csrfToken: req.csrfToken(),
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      stoList: encodeURIComponent(JSON.stringify(stos)),
      usersList: encodeURIComponent(JSON.stringify(users)),
    });
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} - Error occurred in copyStoSettings`
    );
  }
};
