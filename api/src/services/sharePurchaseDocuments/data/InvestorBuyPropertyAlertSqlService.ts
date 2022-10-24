import SqlQuery, { QueryFactory } from '../../../core/SqlQuery';
import { InvestorBuyPropertyAlert } from '../../../DBSchema';

export default class InvestorBuyPropertyAlertSqlService {
  queryFactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryFactory = queryFactory;
  }

  find = (
    sharePurchaseRequestID: number,
    investorID: number,
  ): SqlQuery<InvestorBuyPropertyAlert> => {
    const sql = `select * from InvestorBuyPropertyAlert where ID=? and investorID=?`;
    return this.queryFactory<InvestorBuyPropertyAlert>(sql, [sharePurchaseRequestID, investorID]);
  };

  updateDocumentsSigned = (
    isComplete: boolean,
    sharePurchaseRequestID: number,
    investorID: number,
  ): SqlQuery<InvestorBuyPropertyAlert> => {
    const sql =
      'update InvestorBuyPropertyAlert set isBuySharesFormSigned=? where  ID=? and investorID=?';
    return this.queryFactory<InvestorBuyPropertyAlert>(sql, [
      isComplete ? 1 : 0,
      sharePurchaseRequestID,
      investorID,
    ]);
  };

  deleteSharePurchaseRequest = (
    sharePurchaseRequestID: number,
  ): SqlQuery<InvestorBuyPropertyAlert> => {
    const sql = `delete from InvestorBuyPropertyAlert where ID = ?`;
    return this.queryFactory<InvestorBuyPropertyAlert>(sql, [sharePurchaseRequestID]);
  };
}
