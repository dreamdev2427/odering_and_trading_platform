import { QueryFactory } from "../../documents/data/SqlQuery";
import {Currency, InvestorBuyPropertyAlert, Sharetypes} from "../../../../Schema";

export default class InvestorBuyPropertyAlertSqlService {
    queryfactory: QueryFactory;

    constructor(queryFactory: QueryFactory) {
        this.queryfactory = queryFactory;
    }
    find = (sharePurchaseRequestID: number, investorID: number) => {
        const sql = `SELECT * FROM InvestorBuyPropertyAlert LEFT JOIN sharetypes ON InvestorBuyPropertyAlert.ShareTypeID = sharetypes.ID LEFT JOIN currency ON sharetypes.currencyid = currency.ID where InvestorBuyPropertyAlert.ID=? and InvestorBuyPropertyAlert.investorID=?`;
        return this.queryfactory<InvestorBuyPropertyAlert & Sharetypes & Currency>(sql, [
            sharePurchaseRequestID,
            investorID,
        ]);
    };
    updateDocumentsSigned = (
        isComplete: boolean,
        sharePurchaseRequestID: number,
        investorID: number
    ) => {
        const sql =
            "update InvestorBuyPropertyAlert set isBuySharesFormSigned=? where  ID=? and investorID=?";
        return this.queryfactory<InvestorBuyPropertyAlert>(sql, [
            isComplete ? 1 : 0,
            sharePurchaseRequestID,
            investorID,
        ]);
    };
}
