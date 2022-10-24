import { Request, Response } from "express";
import path from "path";
import logger from "../../../logger";
import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import getSTOFromConfig from "../../../services/getSTOFromConfig";

const mainFilename = require("require-main-filename")();

const getFilesRec = async (
  stoID: any,
  directoryID: any,
  docusignParam = "NULL",
  helloSignParam = "NULL"
): Promise<any> => {
  const sql = `
        select ID, title, directoryid, isactiveforinvestors, offerID, docusignDocumentID, helloSignDocumentID,
            (select count(*) 
                from documentuser 
                where documentid = documents.id 
                and documentuser.DocumentStatus = 2) as newContracts, 
            (select count(*) 
                from documentuser 
                where documentid = documents.id 
                and documentuser.DocumentStatus = 3) as signedContracts,
            (select count(*)
                from sharePurchaseDocuments
                where ID = documents.id
                limit 1) as enabled
        from documents 
        where stoid = ? 
        and directoryid = ? 
        and filetype = 0
        and docusignDocumentID IS ${docusignParam}
        and helloSignDocumentID IS ${helloSignParam};`;
  return mysql
    .executeSQLStatement(sql, [stoID, directoryID])
    .then((result: any) => result)
    .catch((error: any) => {
      logger.error(
        `${error} - error occurred in getDirectoryList getExternalFilesRec`
      );
    });
};

export default async (req: Request, res: Response) => {
  const id = req.query.id ?? -1;

  const sql = `
        select ID, parentid, title 
        from documentdirectories 
        where stoid = ${req.session.stoid} 
        and parentid = ?;

        select title 
        from documentdirectories 
        where stoid = ${req.session.stoid} 
        and id = ?;
        
        select count(*) as count
        from documentuser du
        inner join investor i on i.ID = du.investorID
        inner join documents d on d.ID = du.documentid
        where du.stoid = ?
        and DocumentStatus = 3 
        and du.directoryid = ?
        order by du.signaturedate desc;
        
        select ID, title, directoryid, isactiveforinvestors 
        from documents 
        where stoid = ${req.session.stoid} 
        and directoryid = ?
        and filetype = 2;
        
        select ID, title, directoryid, isactiveforinvestors, contents 
        from documents 
        where stoid = ${req.session.stoid} 
        and directoryid = ? 
        and filetype = 3`;

  await mysql
    .executeSQLStatement(sql, [id, id, req.session.stoid, id, id, id])
    .then(async (result: any) => {
      const dirRec = result[0];
      const dir = result[1].length > 0 ? result[1][0].title : "";
      const signedContractsCount = result[2][0].count;
      const nonEditableFilesRec = result[3];
      const publicFiles = result[4];

      const partials = common.getPartials();
      const globalObj = global as any;
      let docuSignParam = "NULL";
      let helloSignParam = "NULL";
      let documentDraftsPartial = "";
      let externalPlatformName = "";
      const appDir = path.dirname(mainFilename);
      const sharePurchaseMode: string =
        globalObj.config.sharePurchaseDocumentsMode ?? "";

      // Validate param value
      const validModes = ["internal", "docusign", "hellosign"];
      if (!validModes.includes(sharePurchaseMode.toLowerCase())) {
        throw new Error(
          `Parameter sharePurchaseDocumentsMode expected to be one of ["${validModes.join(
            '", "'
          )}"] but is === "${sharePurchaseMode}"`
        );
      }

      if (sharePurchaseMode === "internal") {
        docuSignParam = "NULL";
        helloSignParam = "NULL";
        documentDraftsPartial = `${appDir}/../views/admin/documents/partials/InternalDocumentDraftsPartial`;
      } else if (sharePurchaseMode.toLowerCase() === "docusign") {
        docuSignParam = "NOT NULL";
        helloSignParam = "NULL";
        externalPlatformName = "DocuSign";
        documentDraftsPartial = `${appDir}/../views/admin/documents/partials/ExternalDocumentDraftsPartial`;
      } else if (sharePurchaseMode.toLowerCase() === "hellosign") {
        docuSignParam = "NULL";
        helloSignParam = "NOT NULL";
        externalPlatformName = "HelloSign";
        documentDraftsPartial = `${appDir}/../views/admin/documents/partials/ExternalDocumentDraftsPartial`;
      }
      const filesRec = await getFilesRec(
        req.session.stoid,
        id,
        docuSignParam,
        helloSignParam
      );
      (partials as any).DocumentDraftsPartial = documentDraftsPartial;
      const testMode = globalObj.config.testMode === 1;
      res.render("admin/documents/list", {
        id,
        dir,
        dirRec,
        filesRec,
        nonEditableFilesRec,
        publicFiles,
        signedContractsCount,
        Data: common.getCommonPageProperties(req),
        csrfToken: req.csrfToken(),
        partials,
        fullPublicPath: getSTOFromConfig(req.session.stoid as number)
          .stolinkfull,
        docMessage: req.flash("docmessage"),
        docusignBaseUrl: globalObj.config.docusignViewSignedDocumentsUrl ?? "",
        testMode,
        externalPlatformName,
      });
    })
    .catch((error: any) => {
      common.handleError(req, res, `${error} - Error occured in directorylist`);
    });
};
