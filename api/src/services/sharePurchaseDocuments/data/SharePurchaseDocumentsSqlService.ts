import { QueryFactory } from '../../../core/SqlQuery';
import { SharePurchaseDocuments, Documents } from '../../../DBSchema';

export default class SharePurchaseDocumentsSqlService {
  queryFactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryFactory = queryFactory;
  }
  find = (documentID: number) => {
    const sql = `select * from sharePurchaseDocuments Left Join documents on documents.ID = sharePurchaseDocuments.ID where sharePurchaseDocuments.ID=?`;
    return this.queryFactory<SharePurchaseDocuments & Documents>(sql, [documentID]);
  };
  findAll = () => {
    const sql = `SELECT * FROM sharePurchaseDocuments Left Join documents on documents.ID = sharePurchaseDocuments.ID;`;
    return this.queryFactory<SharePurchaseDocuments & Documents>(sql, []);
  };
}
