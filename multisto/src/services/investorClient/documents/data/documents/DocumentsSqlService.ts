import {
  Documentfields,
  Documentofferinvestor,
  Documents,
  Documentuser,
} from "../../../../../Schema";
import SqlQuery, { QueryFactory } from "../SqlQuery";

export default class DocumentSqlService {
  queryfactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryfactory = queryFactory;
  }
  getDocumentofferinvestors = (
    stoID: number,
    documentofferinvestorID: number
  ): SqlQuery<Documentofferinvestor> => {
    const sql = `select * from documentofferinvestor where id = ? and stoid = ?`;
    return this.queryfactory<Documentofferinvestor>(sql, [
      documentofferinvestorID,
      stoID,
    ]);
  };
  getDocuments = (documentID: number, stoID?: number): SqlQuery<Documents> => {
    if (stoID == null) {
      const sql = `select * from documents where id = ?`;
      return this.queryfactory<Documents>(sql, [documentID]);
    }
    const sql = `select * from documents where id = ? and stoid = ?`;
    return this.queryfactory<Documents>(sql, [documentID, stoID]);
  };

  getDocumentFields = (
    documentID: number,
    stoID?: number
  ): SqlQuery<Documentfields> => {
    if (stoID == null) {
      const sql = `select * from documentfields where documentid = ? order by ID ASC`;
      return this.queryfactory<Documentfields>(sql, [documentID]);
    }
    const sql = `select * from documentfields where documentid = ? and stoid = ? order by ID ASC`;
    return this.queryfactory<Documentfields>(sql, [documentID, stoID]);
  };

  getDocumentUsers = (
    stoID: number,
    investorID: number,
    documentID: number,
    documentofferinvestorID: number
  ): SqlQuery<Documentuser> => {
    const sql = `select *, DATE_FORMAT(signaturedate,'%M %d %Y') as signaturedate2 from documentuser
            where investorID=? and stoid=? and documentid=? and documentofferinvestorid=?`;
    return this.queryfactory<Documentuser & { signaturedate2: string }>(sql, [
      investorID,
      stoID,
      documentID,
      documentofferinvestorID,
    ]);
  };
}
