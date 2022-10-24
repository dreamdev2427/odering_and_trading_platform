import { Request, Response } from "express";
import IStosMetaKeysService from "../../../services/platform/stos-meta-keys/IStosMetaKeysService";
import StosMetaKeysSqlService from "../../../services/platform/stos-meta-keys/StosMetaKeysSqlService";
import common from "../../../modules/common";

export default async (req: Request, res: Response) => {
  const stoMetaKeysService: IStosMetaKeysService = new StosMetaKeysSqlService();
  try {
    const keys = await stoMetaKeysService.getStosMetaKeys();
    res.render("platform/stos-meta-keys", {
      csrfToken: req.csrfToken(),
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      keysList: keys,
    });
  } catch (error) {
    if (error instanceof Error) {
      common.handleError(
        req,
        res,
        `${error?.message} - Error occurred in getStosMetaKeysPage`
      );
    }
  }
};
