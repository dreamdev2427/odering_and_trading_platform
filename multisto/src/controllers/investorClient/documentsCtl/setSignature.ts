import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import ContractView2Service from "../../../services/investorClient/documents/ContractView2Service";
import { SQLConnection } from "../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    const { id, offerid, signatureData } = req.body;
    const { hostname } = req;
    const investorID = req.session.user.ID;
    const stoID = (global as any).config.stos[req.hostname].stoid;
    const base64Signature = signatureData.replace(
      "data:image/octet-stream;base64,",
      ""
    );

    const contractView2 = new ContractView2Service(
      mysql.executeSQLStatement as SQLConnection
    );
    await contractView2.updateSignature(
      id,
      investorID,
      stoID,
      hostname,
      base64Signature
    );

    res.redirect(`/contractview2?id=${offerid}`);
  } catch (err) {
    common.handleError(req, res, `${err} - Error occured in setSingature`);
  }
};
