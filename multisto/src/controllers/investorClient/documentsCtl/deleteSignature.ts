import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import ContractView2Service from "../../../services/investorClient/documents/ContractView2Service";
import { SQLConnection } from "../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    const { docid, offerid } = req.query;
    const investorID = req.session.user.ID;
    const stoID = (global as any).config.stos[req.hostname].stoid;

    const contractView2 = new ContractView2Service(
      mysql.executeSQLStatement as SQLConnection
    );
    await contractView2.deleteSignature(stoID, investorID, docid, offerid);
    res.redirect(`/contractview2?id=${offerid}`);
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} Error occured in deletesignature`
    );
  }
};
