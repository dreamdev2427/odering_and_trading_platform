import { Request, Response } from "express";
import common from "../../../../modules/common";
import mysql from "../../../../modules/mysql";

export default async (req: Request, res: Response) => {
  common.checkUserAuthorizationForModuleSTO(req, res, 30);
  const globalObj = global as any;
  let docuSignParam = "NULL";
  let helloSignParam = "NULL";
  let externalPlatformName = "";
  const sharePurchaseMode = globalObj.config.sharePurchaseDocumentsMode;

  if (sharePurchaseMode === "docuSign") {
    docuSignParam = "NOT NULL";
    helloSignParam = "NULL";
    externalPlatformName = "DocuSign";
  } else if (sharePurchaseMode === "helloSign") {
    docuSignParam = "NULL";
    helloSignParam = "NOT NULL";
    externalPlatformName = "HelloSign";
  }

  const sql = `SELECT * FROM documents 
                    WHERE id = ? 
                    AND stoid = ${req.session.stoid}
                    AND docusignDocumentID IS ${docuSignParam}
                    AND helloSignDocumentID IS ${helloSignParam};
                    
                SELECT * FROM sharePurchaseDocuments 
                    WHERE ID= ?;
                    
                SELECT * FROM documentfields
                WHERE documentid = ? 
                    AND stoid = ${req.session.stoid}
                ORDER BY ID ASC
                `;
  mysql
    .executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id])
    .then((result: any) => {
      const enabled = result[1][0] ?? false;
      const requireOnce = result[1][0]?.requireOnce === 1;
      res.render("admin/documents/externalDoc", {
        Record: result[0][0],
        fieldRecords: result[2],
        id: req.query.id,
        dirid: req.query.dirid,
        csrfToken: req.csrfToken(),
        Data: common.getCommonPageProperties(req),
        partials: common.getPartials(),
        // sharePurchaseData
        enabled,
        requireOnce,
        countryList: common.getCountries(),
        investorTypes: common.getDocumentInvestorTypes(),
        externalPlatformName,
      });
    })
    .catch((e) => {
      common.handleError(req, res, `${e} - error occurred in getExternalDoc`);
    });
};
