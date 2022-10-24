import { Request, Response } from "express";
import ExportObjectToCsv from "../../../services/generic/ExportObjectToCsv";
import IExportObjectToCsv from "../../../services/generic/IExportObjectToCsv";
import { extractQueryProperties } from "../../../services/investorClient/investor/dto/SearchAndOrderQueryLists";
import IRegisterService from "../../../services/investorClient/registration/data/IRegisterService";
import RegisterSqlService from "../../../services/investorClient/registration/data/RegisterSqlService";


export default async (req: Request, res: Response) => {
    // get the investors based on filter

    const queryProperties = extractQueryProperties(req);
    const registerService: IRegisterService = new RegisterSqlService();
    const incompleteKycResults = await registerService.getUnfinishedRegisters(undefined,
        queryProperties.searchQueryProperties, queryProperties.orderQueryProperties);

    const exportObjectToCsv:IExportObjectToCsv = new ExportObjectToCsv()
    const csv = exportObjectToCsv.objectsToCSV(incompleteKycResults);
    res.header('Content-Type', 'text/csv');
    res.attachment(`${new Date()}-unfinishedRegisters-export.csv`);
    return res.send(csv);
}