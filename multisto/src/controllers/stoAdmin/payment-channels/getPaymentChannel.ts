import { Response } from "express";
import path from "path";
import logger from "../../../logger";
import common from "../../../modules/common";
import PaymentChannelSqlService from "../../../services/platform/price-oracle/data/PaymentChannelSqlService";
import ICurrencyService from "../../../services/platform/currency/data/ICurrencyService";
import CurrencySqlService from "../../../services/platform/currency/data/CurrencySqlService";
import BlockchainSqlService from "../../../services/platform/blockchain/BlockchainSqlService";
import getFilteredCurrency from "../../../services/platform/currency/getFilteredCurrenc";

const mainFilename = require("require-main-filename")();

export default async (req: any, res: Response) => {
  try {
    const paymentChannelID = parseInt(req.query.id, 10);
    const isAddRequest = paymentChannelID > 0;
    const currencyService: ICurrencyService = new CurrencySqlService();
    const currencies = await currencyService.getCurrencies();

    let channel;
    let blockchain;
    if (isAddRequest) {
      const channelSvc = new PaymentChannelSqlService();
      channel = await channelSvc.fetchPaymentChannel(paymentChannelID);
      const blockchainService = new BlockchainSqlService();
      blockchain = await blockchainService.findByCurrencyId(
        channel.currencyID ?? 0
      );
    }

    const appDir = path.dirname(mainFilename);
    const partialPath = {
      PaymentChannelMode: `${appDir}/../views/admin/paymentChannel/paymentChannelModeSettings`,
    };
    const paymentChannelType = channel?.paymentType;

    res.render("admin/public/paymentchannelsadd", {
      op: isAddRequest ? 1 : 0,
      blockchainName: blockchain?.title ?? "",
      Record: isAddRequest ? channel : [],
      paymentChannelType,
      currencies: getFilteredCurrency(currencies),
      instructionalEmailsForPaymentChannelDeposits: (global as any).config
        .instructionalEmailsForPaymentChannelDeposits,
      Data: common.getCommonPageProperties(req),
      partials: common.getPartials(partialPath),
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    logger.error(`${error} - Error occurred in postChangeSumSubSettings`);
  }
};
