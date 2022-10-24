import { Documentuser } from "../../../../../Schema";
import { unsafeHead } from "../../../../../utils";
import SqlQuery, { QueryFactory } from "../SqlQuery";

export default class DocumentUserSqlService {
  queryfactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryfactory = queryFactory;
  }
  findById = (documentUserID: number): SqlQuery<Documentuser> => {
    const sql = `select * from documentuser where ID=?`;
    return this.queryfactory<Documentuser>(sql, [documentUserID]);
  };
  find = (
    stoID: number,
    investorID: number,
    documentID: number,
    documentofferinvestorID: number
  ): SqlQuery<Documentuser> => {
    const sql = `select * from documentuser where investorID=? and stoid=? and documentid=? and documentofferinvestorid=?`;
    return this.queryfactory<Documentuser>(sql, [
      investorID,
      stoID,
      documentID,
      documentofferinvestorID,
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
    fieldValuesJson: Documentuser["fieldValuesJson"],
    contents: Documentuser["contents"],
    investorID: number,
    stoID: number,
    docID: number,
    offerID: number
  ): SqlQuery<any> => {
    const sql =
      "update documentuser set fieldValuesJson=?, contents=? where investorID=? and stoid=? and documentid=? and documentofferinvestorid=?";
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
    fieldValuesJson: Documentuser["fieldValuesJson"],
    contents: Documentuser["contents"],
    investorID: number,
    stoID: number,
    docID: number,
    offerID: number,
    dirID: number
  ): PromiseLike<number> => {
    const sql =
      "insert into documentuser(investorID, stoid, directoryid, documentid, DocumentStatus, fieldValuesJson, documentofferinvestorid, contents) values(?, ?, ?, ?, ?, ?, ?, ?)";
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

  upsert = (
    stoID: number,
    docID: number,
    offerID: number,
    dirID: number,
    fieldValuesJson: Documentuser["fieldValuesJson"],
    contents: Documentuser["contents"],
    investorID: number
  ): PromiseLike<number> =>
    this.find(stoID, investorID, docID, offerID)
      .then(unsafeHead)
      .then((documentUser) => documentUser?.ID)
      .then(async (ID) => {
        if (ID) {
          await this.update(
            fieldValuesJson,
            contents,
            investorID,
            stoID,
            docID,
            offerID
          );
          return ID;
        }
        return this.insert(
          fieldValuesJson,
          contents,
          investorID,
          stoID,
          docID,
          offerID,
          dirID
        );
      });

  fetch = (
    documentUserID: number,
    investorID: number,
    stoID: number
  ): SqlQuery<Documentuser> => {
    const sql = `select signaturefilepath from documentuser where id=? and investorid=? and stoid=?`;
    return this.queryfactory<Documentuser>(sql, [
      documentUserID,
      investorID,
      stoID,
    ]);
  };

  updateSignaturePath = (
    signaturefilepath: string,
    id: number,
    settle: boolean = false
  ): SqlQuery<any> => {
    const sql = `update documentuser set signaturefilepath=?, signaturedate=now(), DocumentStatus=? where id = ?`;
    return this.queryfactory(sql, [signaturefilepath, settle ? 3 : 2, id]);
  };

  deleteSignaturePath = (id: number): SqlQuery<any> => {
    const sql = `update documentuser set signaturefilepath='', DocumentStatus=1 where id = ?`;
    return this.queryfactory(sql, [id]);
  };

  deleteDocumentUser = (id: number): SqlQuery<any> => {
    const sql = `delete from documentuser where ID = ?`;
    return this.queryfactory(sql, [id]);
  };
}
