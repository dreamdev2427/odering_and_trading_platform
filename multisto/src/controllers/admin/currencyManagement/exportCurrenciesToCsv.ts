import { Request, Response } from "express";
import ExportObjectToCsv from "../../../services/generic/ExportObjectToCsv";
import IExportObjectToCsv from "../../../services/generic/IExportObjectToCsv";
import { extractQueryProperties } from "../../../services/investorClient/investor/dto/SearchAndOrderQueryLists";
import ICurrencyService from "../../../services/platform/currency/data/ICurrencyService";
import CurrencySqlService from "../../../services/platform/currency/data/CurrencySqlService";


export default async (req: Request, res: Response) => {
    // get the investors based on filter

    const queryProperties = extractQueryProperties(req);
    const currencyService: ICurrencyService = new CurrencySqlService();
    const incompleteKycResults = await currencyService.getCurrencies(undefined,
        queryProperties.searchQueryProperties, queryProperties.orderQueryProperties);

    const exportObjectToCsv:IExportObjectToCsv = new ExportObjectToCsv()
    const csv = exportObjectToCsv.objectsToCSV(incompleteKycResults);
    res.header('Content-Type', 'text/csv;charset=utf-8,%EF%BB%BF');
    res.attachment(`${new Date()}-currencies-export.csv`);
    return res.send(csv);
}