import { Documentfields, Documentofferinvestor, Documents, Documentuser } from 'DBSchema';
import SqlQuery, { QueryFactory } from '../../../../core/SqlQuery';

export default class DocumentSqlService {
  queryFactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryFactory = queryFactory;
  }

  getDocumentOfferInvestors = (
    stoID: number,
    documentOfferInvestorID: number,
  ): SqlQuery<Documentofferinvestor> => {
    const sql = `select * from documentofferinvestor where id = ? and stoid = ?`;
    return this.queryFactory<Documentofferinvestor>(sql, [documentOfferInvestorID, stoID]);
  };

  // findDocumentofferinvestors = (documentID: number): SqlQuery<Documentofferinvestor> => {
  //   const sql = `select * from documentofferinvestor where documentid = ?`;
  //   return this.queryfactory<Documentofferinvestor>(sql, [documentID]);
  // };
  getDocuments = (stoID: number): SqlQuery<Documents> => {
    const sql = `select * from documents where stoid = ?`;
    return this.queryFactory<Documents>(sql, [stoID]);
  };

  getCommentableDocuments = (): SqlQuery<Documents> => {
    const sql = `select * from documents where isactiveforinvestors = 1`;
    return this.queryFactory<Documents>(sql, []);
  };

  getOfferedDocuments = (): SqlQuery<Documents> => {
    const sql = `SELECT documents.* FROM documents 
LEFT JOIN documentofferinvestor ON documents.ID = documentofferinvestor.documentid 
LEFT JOIN documentuser ON documents.ID = documentuser.documentid
where (documentuser.ID IS NULL OR documentuser.DocumentStatus<2)  AND NOW() BETWEEN documentofferinvestor.DateFrom AND documentofferinvestor.DataTo;`;
    return this.queryFactory<Documents>(sql, []);
  };

  getDocumentOffers = (): SqlQuery<Documentofferinvestor> => {
    const sql = `SELECT * FROM documentofferinvestor where NOW() BETWEEN DateFrom AND DataTo`;
    return this.queryFactory<Documentofferinvestor>(sql, []);
  };

  getDocumentOffer = (documentID: number): SqlQuery<Documentofferinvestor> => {
    const sql = `select * from documentofferinvestor where documentid = ?;`;
    return this.queryFactory<Documentofferinvestor>(sql, [documentID]);
  };

  findDocuments = (documentID: number): SqlQuery<Documents> => {
    const sql = `select * from documents where id = ?`;
    return this.queryFactory<Documents>(sql, [documentID]);
  };

  getDocumentFields = (documentID: number): SqlQuery<Documentfields> => {
    const sql = `select * from documentfields where documentid = ?  order by ID ASC`;
    return this.queryFactory<Documentfields>(sql, [documentID]);
  };

  getDocumentUsers = (
    stoID: number,
    investorID: number,
    documentID: number,
    documentofferinvestorID: number,
  ): SqlQuery<Documentuser> => {
    const sql = `select *, DATE_FORMAT(signaturedate,'%M %d %Y') as signaturedate2 from documentuser
            where investorID=? and stoid=? and documentid=? and documentofferinvestorid=?`;
    return this.queryFactory<Documentuser & { signaturedate2: string }>(sql, [
      investorID,
      stoID,
      documentID,
      documentofferinvestorID,
    ]);
  };
}
