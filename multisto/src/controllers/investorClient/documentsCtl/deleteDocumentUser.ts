import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import ContractView2Service from "../../../services/investorClient/documents/ContractView2Service";
import { SQLConnection } from "../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    const globalObj = global as any;
    const testMode = globalObj.config.testMode === 1;
    if (testMode) {
      const { id } = req.query;
      const contractView2 = new ContractView2Service(
        mysql.executeSQLStatement as SQLConnection
      );
      await contractView2.deleteDocumentUser(id);
    }
    res.redirect(`/admin/directorylist`);
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} Error occurred in deleteDocumentUser`
    );
  }
};
