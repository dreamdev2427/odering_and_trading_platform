import { Request, Response } from "express";
import { findMany } from "../../../modules/db";
import { Documentuser } from "../../../Schema";
import common from "../../../modules/common";

export default async (req: Request, res: Response) => {
  const id = req.query.id ?? -1;

  const sql = `
        select du.ID as duID, du.signaturefilepath, firstname, lastname, d.*, 
            DATE_FORMAT(du.signaturedate,'%d %M %Y | %H:%i:%ss') as signatureDate
        from documentuser du
        inner join investor i on i.ID = du.investorID
        inner join documents d on d.ID = du.documentid
        where du.stoid = ?
        and DocumentStatus = 3 
        and du.directoryid = ?
        order by du.signaturedate desc;
        `;
  const result = await findMany<Documentuser>(sql, [req.session.stoid, id]);
  const signedContracts: any[] = [];
  result.forEach((c: any) => {
    let signaturefilepath = "";
    signaturefilepath = c.signaturefilepath?.replace(
      "docusignViewSignedDocumentsUrl/",
      ""
    );
    signaturefilepath = c.signaturefilepath?.replace(
      "helloSignViewSignedDocumentsUrl/",
      ""
    );
    signedContracts.push({ ...c, signaturefilepath });
  });

  const globalObj = global as any;
  const testMode = globalObj.config.testMode === 1;
  res.render("admin/documents/investorSignedContracts", {
    signedContracts,
    docusignBaseUrl: globalObj.config.docusignViewSignedDocumentsUrl ?? "",
    testMode,
    Data: common.getCommonPageProperties(req),
    csrfToken: req.csrfToken(),
    partials: common.getPartials(),
  });
};
