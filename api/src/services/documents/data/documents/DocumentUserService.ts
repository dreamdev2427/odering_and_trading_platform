import { CloudFiles, Documents, Documentuser } from 'DBSchema';
import SqlQuery, { QueryFactory } from '../../../../core/SqlQuery';

export type wDocumentuserID = { documentuserID: number; documentuserContents: string };
export default class DocumentUserSqlService {
  queryfactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryfactory = queryFactory;
  }
  findAll = (
    investorID: number,
    minStatus: number,
  ): SqlQuery<wDocumentuserID & Documentuser & Documents & CloudFiles> => {
    const sql = `select *, documentuser.ID as documentuserID, documentuser.contents as documentuserContents from documentuser 
      LEFT JOIN documents ON documents.ID=documentuser.documentid  
      LEFT JOIN cloudFiles ON documentuser.signatureFileID = cloudFiles.ID
      where documentuser.investorID=? and DocumentStatus >= ?`;
    return this.queryfactory<wDocumentuserID & Documentuser & Documents & CloudFiles>(sql, [
      investorID,
      minStatus,
    ]);
  };

  find = (
    investorID: number,
    submittedDocumentID: number,
  ): SqlQuery<wDocumentuserID & Documentuser & Documents & CloudFiles> => {
    const sql = `select *, documentuser.ID as documentuserID, documentuser.contents as documentuserContents  from documentuser 
      LEFT JOIN documents ON documents.ID=documentuser.documentid
      LEFT JOIN cloudFiles ON documentuser.signatureFileID = cloudFiles.ID
      where documentuser.investorID=?  and documentuser.ID=?`;
    return this.queryfactory<wDocumentuserID & Documentuser & Documents & CloudFiles>(sql, [
      investorID,
      submittedDocumentID,
    ]);
  };
  findDocumentUser = (
    investorID: number,
    documentID: number,
  ): SqlQuery<wDocumentuserID & Documentuser & Documents & CloudFiles> => {
    const sql = `select *, documentuser.ID as documentuserID, documentuser.contents as documentuserContents  from documentuser 
      LEFT JOIN documents ON documents.ID=documentuser.documentid
      LEFT JOIN cloudFiles ON documentuser.signatureFileID = cloudFiles.ID
      where documentuser.investorID=?  and documents.ID=?`;
    return this.queryfactory<wDocumentuserID & Documentuser & Documents & CloudFiles>(sql, [
      investorID,
      documentID,
    ]);
  };

  // const getDocumentUserID = (
  //     investorID: number,
  //     stoID: number,
  //     docID: number,
  //     offerID: number
  // ): Promise<number | undefined> => {
  //     const sql = `select ID from documentuser where investorID=? and stoid=? and documentid=? and documentofferinvestorid=?`;
  //     return mysql
  //         .executeSQLStatement(sql, [investorID, stoID, docID, offerID])
  //         .then((result: any) => result[0] && result[0].ID);
  // };
  update = (
    fieldValuesJson: Documentuser['fieldValuesJson'],
    contents: Documentuser['contents'],
    investorID: number,
    stoID: number,
    docID: number,
    offerID: number,
  ): SqlQuery<any> => {
    const sql =
      'update documentuser set fieldValuesJson=?, contents=? where investorID=? and stoid=? and documentid=? and documentofferinvestorid=?';
    return this.queryfactory<any>(sql, [
      fieldValuesJson,
      contents,
      investorID,
      stoID,
      docID,
      offerID,
    ]);
  };
  insert = (
    fieldValuesJson: Documentuser['fieldValuesJson'],
    contents: Documentuser['contents'],
    investorID: number,
    stoID: number,
    docID: number,
    offerID: number,
    dirID: number,
  ): PromiseLike<number> => {
    const sql =
      'insert into documentuser(investorID, stoid, directoryid, documentid, DocumentStatus, fieldValuesJson, documentofferinvestorid, contents) values(?, ?, ?, ?, ?, ?, ?, ?)';
    return this.queryfactory(sql, [
      investorID,
      stoID,
      dirID,
      docID,
      1,
      fieldValuesJson,
      offerID,
      contents,
    ]).then((result: any) => result.insertId);
    //
  };

  // upsert = (
  //   stoID: number,
  //   docID: number,
  //   offerID: number,
  //   dirID: number,
  //   fieldValuesJson: Documentuser['fieldValuesJson'],
  //   contents: Documentuser['contents'],
  //   investorID: number,
  // ): PromiseLike<number> =>
  //   this.find(stoID, investorID, docID)
  //     .then(unsafeHead)
  //     .then((documentUser) => documentUser?.ID)
  //     .then(async (ID) => {
  //       if (ID) {
  //         await this.update(fieldValuesJson, contents, investorID, stoID, docID, offerID);
  //         return ID;
  //       }
  //       return this.insert(fieldValuesJson, contents, investorID, stoID, docID, offerID, dirID);
  //     });
  //
  // fetch = (documentUserID: number, investorID: number, stoID: number): SqlQuery<Documentuser> => {
  //   const sql = `select signaturefilepath from documentuser where id=? and investorid=? and stoid=?`;
  //   return this.queryfactory<Documentuser>(sql, [documentUserID, investorID, stoID]);
  // };

  updateSignature = (documentUserID: number, cloudFileID: number): SqlQuery<any> => {
    const sql = `update documentuser set signatureFileID=?, signaturedate=now() where id = ?`;
    return this.queryfactory(sql, [cloudFileID, documentUserID]);
  };

  updateStatus = async (documentUserID: number, status: number): Promise<any> => {
    const sql = `update documentuser set DocumentStatus=?, signaturedate=now() where id = ?`;
    return await this.queryfactory(sql, [status, documentUserID]);
  };
}
