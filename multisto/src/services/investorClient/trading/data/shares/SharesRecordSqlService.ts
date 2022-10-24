import AbstractSqlService from '../AbstractSqlService';
import ISharesRecordService from './ISharesRecordService';

/**
 * Manages shares in trading module
 */
class SharesRecordSqlService extends AbstractSqlService implements ISharesRecordService {
    findQuery = `
        SELECT
            t.id, t.title, s.shares, t.nominalValue, t.premimum, t.currencyid
        FROM
            shares s, sharetypes t
        WHERE
            s.shareTypeid = t.ID
        AND s.investorID = ?
        AND t.stoid = ?;
        AND t.isInvestorTradable = 1`;

    /**
     * Get record of shares by type and investor
     * @returns Promise of SharesDTO shares
     * @throws SQL error
     * @returns void if chaining
     */
    async fetchByStoInvestor(stoId: string, investorId: string): Promise<any> {
        return this.executeSql(this.findQuery, [investorId, stoId]);
    }

    // TODO: save() { ... }
}

export default SharesRecordSqlService;
