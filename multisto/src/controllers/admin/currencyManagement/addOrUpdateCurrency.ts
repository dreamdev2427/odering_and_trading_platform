import { Request, Response } from "express";
import common from "../../../modules/common";
import ICurrencyService from "../../../services/platform/currency/data/ICurrencyService";
import CurrencySqlService from "../../../services/platform/currency/data/CurrencySqlService";
import { Currency } from "../../../Schema";

function getCurrencyObject(req: Request): Currency {
  const currency: Currency = {
    ID: 0,
    Currency: req.body.Currency,
    isBlockchainBased: 0,
    Symbol: req.body.Symbol,
    Abbreviation: req.body.Abbreviation,
    Country: req.body.Country,
    blockchainID: 1,
    Address: "",
    cryptoReceivingAddress: "",
    isNative: 0,
  };
  try {
    const id = JSON.parse(req.body.ID);
    if (!Number.isNaN(id)) {
      currency.ID = id;
    }
  } catch {
    currency.ID = 0;
  }
  try {
    const isBlockchainBased = JSON.parse(req.body.IsBlockchainBased);
    if (!Number.isNaN(isBlockchainBased)) {
      currency.isBlockchainBased = isBlockchainBased;
    }
  } catch {
    currency.isBlockchainBased = 0;
  }
  return currency;
}

export default async (req: Request, res: Response) => {
  try {
    const currencyService: ICurrencyService = new CurrencySqlService();
    if (req.body && Object.keys(req.body).length !== 0) {
      const currency = getCurrencyObject(req);
      await currencyService.addOrUpdateCurrency(currency);
    }
    res.redirect("/platform/getCurrencySearchPage");
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} - Error occurred in getCurrencySearchPage`
    );
    res.redirect("/platform/getCurrencySearchPage");
  }
};
