import { Response } from "express";
import path from "path";
import common from "../../../modules/common";
import getSTOFromConfig from "../../../services/getSTOFromConfig";
import SharesSqlService from "../../../services/investorClient/affiliate/data/SharesSqlService";
import DividendsModule from "../../../services/investors/dividends/api/DividendsModule";
import IDividendsModule from "../../../services/investors/dividends/api/IDividendsModule";
import DividendPayoutDto from "../../../services/investors/dividends/dto/DividendPayoutDto";
import { ShareTypeVM, strategies } from "./helpers/types";
import prettifiers from "./helpers/prettifiers";

const mainFilename = require("require-main-filename")();

export default async (req: any, res: Response) => {
  try {
    const stoId = req.session.stoid;
    if (stoId === undefined) throw new Error(`Undefined STO in session`);

    const Dividends: IDividendsModule = new DividendsModule();
    const shareSvc = new SharesSqlService();

    const dividendRecordsWithFuture: DividendPayoutDto[] = await Dividends.listFutureDividends(
      stoId
    );
    // Stopped dividends won't have a "Next Payout" until turned on again (and page is refreshed)
    const dividendRecordsPast: DividendPayoutDto[] = await Dividends.listStoppedDividends(
      stoId
    );
    const dividendRecords = [
      ...dividendRecordsWithFuture,
      ...dividendRecordsPast,
    ];
    const dividends = prettifiers.dividendView(dividendRecords);

    const shareTypes: ShareTypeVM[] = prettifiers.shareTypesSimpleView(
      await shareSvc.getShareTypesForSto(stoId)
    );

    const appDir = path.dirname(mainFilename);
    const partials = common.getPartials({
      newDividendModal: `${appDir}/../views/admin/dividends/v2/newDividendModal`,
      dividendPayoutsModal: `${appDir}/../views/admin/dividends/v2/dividendPayoutsModal`,
      dividend: `${appDir}/../views/admin/dividends/v2/dividend`,
    });
    res.render("admin/dividends/v2/dividendsIndex", {
      // Defaults
      currencyID:
        (getSTOFromConfig(req.session.stoid)?.settings as any)
          .DefaultSTOCurreny ?? "",
      partials,
      Data: common.getCommonPageProperties(req),
      csrfToken: req.csrfToken(),
      // Validation
      ErrorMessages: req.flash("ErrorMessages"),
      ValidationErrors: req.flash("ValidationErrors"),
      LastModel: req.flash("LastModel"),
      // Data
      shareTypes,
      dividends,
      strategies,
    });
  } catch (err) {
    common.handleError(req, res, `${(err as Error).stack}`);
  }
};
