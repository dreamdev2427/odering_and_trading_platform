import { tapLog, unsafeHead } from 'utils';
import SqlQuery, { QueryFactory } from '../../../core/SqlQuery';
import {
  CloudFiles,
  Documents,
  Documentuser,
  SubmittedSharePurchaseDocuments,
} from '../../../DBSchema';
import { wDocumentuserID } from '../../documents/data/documents/DocumentUserService';

export default class SubmittedSharePurchaseDocumentsSqlService {
  queryFactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryFactory = queryFactory;
  }

  // select * from documentuser
  // LEFT JOIN documents ON documents.ID=documentuser.documentid
  // LEFT JOIN cloudFiles ON documentuser.signatureFileID = cloudFiles.ID
  // where documentuser.investorID=?  and documentuser.documentid=?
  find = (sharePurchaseRequestID: number, documentID: number) => {
    const sql = `SELECT *, documentuser.ID as documentuserID  FROM submittedSharePurchaseDocuments 
        left JOIN documentuser on documentuser.ID = submittedSharePurchaseDocuments.submittedDocumentID 
        LEFT JOIN documents ON documents.ID=documentuser.documentid
        LEFT JOIN cloudFiles ON documentuser.signatureFileID = cloudFiles.ID
        where submittedSharePurchaseDocuments.sharePurchaseRequestID=? and documentuser.documentid=?`;
    return this.queryFactory<
      wDocumentuserID & SubmittedSharePurchaseDocuments & Documentuser & Documents & CloudFiles
    >(sql, [sharePurchaseRequestID, documentID]);
  };

  findAll = (sharePurchaseRequestID: number) => {
    const sql = `SELECT * FROM submittedSharePurchaseDocuments left JOIN documentuser on documentuser.ID = submittedSharePurchaseDocuments.submittedDocumentID where submittedSharePurchaseDocuments.sharePurchaseRequestID = ?`;
    return this.queryFactory<SubmittedSharePurchaseDocuments & Documentuser>(sql, [
      sharePurchaseRequestID,
    ]);
  };

  update = (
    fieldValuesJson: Documentuser['fieldValuesJson'],
    contents: Documentuser['contents'],
    investorID: number,
    documentUserID: number,
  ): SqlQuery<any> => {
    const sql = 'update documentuser set fieldValuesJson=?, contents=? where investorID=? and ID=?';
    return this.queryFactory<any>(sql, [fieldValuesJson, contents, investorID, documentUserID]);
  };

  insert = (
    sharePurchaseRequestID: number,
    fieldValuesJson: Documentuser['fieldValuesJson'],
    contents: Documentuser['contents'],
    investorID: number,
    docID: number,
    dirID: number,
    stoID: number,
  ): PromiseLike<number> => {
    const sql =
      'insert into documentuser(investorID, stoid, directoryid, documentid, DocumentStatus, fieldValuesJson, documentofferinvestorid, contents) values(?, ?, ?, ?, ?, ?, ?, ?)';
    return this.queryFactory(sql, [
      investorID,
      stoID,
      dirID,
      docID,
      1,
      fieldValuesJson,
      0,
      contents,
    ])
      .then((result: any): number => result.insertId)
      .then(async (submittedDocumentID) => {
        const submittedSharePurchaseDocumentsSql = `insert into submittedSharePurchaseDocuments(sharePurchaseRequestID, submittedDocumentID ) values(?,?);`;
        await this.queryFactory(submittedSharePurchaseDocumentsSql, [
          sharePurchaseRequestID,
          submittedDocumentID,
        ]);
        return submittedDocumentID;
      });
    //
  };

  upsert = (
    sharePurchaseRequestID: number,
    docID: number,
    dirID: number,
    fieldValuesJson: Documentuser['fieldValuesJson'],
    contents: Documentuser['contents'],
    investorID: number,
    stoID: number,
  ): PromiseLike<number> =>
    this.find(sharePurchaseRequestID, docID)
      .then(unsafeHead)
      .then(async (documentUser) => {
        if (documentUser) {
          await this.update(fieldValuesJson, contents, investorID, documentUser.ID);
          return documentUser.ID;
        }
        return this.insert(
          sharePurchaseRequestID,
          fieldValuesJson,
          contents,
          investorID,
          docID,
          dirID,
          stoID,
        );
      });
}
