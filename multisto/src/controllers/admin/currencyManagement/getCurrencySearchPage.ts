import { Request, Response } from "express";
import common from "../../../modules/common";
import { extractQueryProperties } from "../../../services/investorClient/investor/dto/SearchAndOrderQueryLists";
import ICurrencyService from "../../../services/platform/currency/data/ICurrencyService";
import CurrencySqlService from "../../../services/platform/currency/data/CurrencySqlService";
import mysql from "../../../modules/mysql";
import getFilteredCurrency from "../../../services/platform/currency/getFilteredCurrenc";

export default async (req: Request, res: Response) => {
  try {
    const currencyService: ICurrencyService = new CurrencySqlService();
    const recordsPage = req.query.recordsPage ?? 1;
    const queryProperties = extractQueryProperties(req);
    const currencyCount = await currencyService.countCurrencies(
      queryProperties.searchQueryProperties
    );
    const currencies = await currencyService.getCurrencies(
      +recordsPage,
      queryProperties.searchQueryProperties,
      queryProperties.orderQueryProperties
    );
    const globalObj = global as any;
    const blockChain = await mysql.executeSQLStatement(
      "select * from blockchains"
    );
    res.render("platform/sto/currencymanagement", {
      RecordCount: currencyCount,
      countryList: common.getCountries(),
      RecordsPerPaging: globalObj.config.RecordsPerPaging,
      defaultCurrencyMode: globalObj.config.defaultCurrencyType,
      DataRows: getFilteredCurrency(currencies),
      partials: common.getPlatformPartials(),
      blockChain,
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} - Error occurred in getCurrencySearchPage`
    );
  }
};
