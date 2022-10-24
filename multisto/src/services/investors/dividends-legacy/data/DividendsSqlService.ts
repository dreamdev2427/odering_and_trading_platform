import { Dividend, Dividendreceivers } from '../../../../Schema';
import AbstractSqlService from '../../../generic/AbstractSqlService';
import DividendsDto from '../dto/DividendsDto';
import IDividendsService from './IDividendsService';

export default class DividendsSqlService extends AbstractSqlService implements IDividendsService {
    getInvestorsDividends(): Promise<Dividendreceivers[]> {
        const sql = `
            SELECT * FROM dividendreceivers;
        `;
        return this.runSql(sql);
    }
    getDividendPayouts(): Promise<Dividend[]> {
        const sql = `
            SELECT * FROM dividend;
        `;
        return this.runSql(sql);
    }
    async getInvestorDividendsFor(investorId: number, stoId: number, status?: number[]): Promise<DividendsDto> {
        const sqlStatus = status ? `AND dividendreceivers.status IN (${status.join(',')})` : '';
        const sql = `
            SELECT
                SUM(amounttopaid) as dividends,
                ? as stoId,
                ? as investorId
            FROM dividendreceivers

            LEFT JOIN dividend
            ON        dividendreceivers.dividendid = dividend.ID

            WHERE dividend.stoid = ?
            AND   dividendreceivers.investorid = ?
            ${sqlStatus}
        `;
        const row = await this.runSql(sql, [stoId, investorId, stoId, investorId]);
        return row[0];
    }
    async getInvestorTotalAffiliateDividendsFor(investorId: number, stoId: number, status?: number[]): Promise<DividendsDto> {
        const sqlStatus = status ? `AND dividendreceivers.status IN (${status.join(',')})` : '';
        const sql = `
            SELECT
                SUM(AffiliateAmount) as dividends,
                ? as stoId,
                ? as investorId
            FROM dividendreceivers

            LEFT JOIN dividend
            ON        dividendreceivers.dividendid = dividend.ID

            WHERE dividend.stoid = ?
            AND   dividendreceivers.investorid = ?
            ${sqlStatus}
        `;
        const row = await this.runSql(sql, [stoId, investorId, stoId, investorId]);
        return row[0];
    }
    async getProjectDividends(stoId: number, status?: number[]): Promise<string> {
        // TODO: Refactor: Dividend status should be an enum
        // TODO: Make a check for monthly dividends (within current month)
        const sqlStatus = status ? `AND dividendreceivers.status IN (${status.join(',')})` : '';
        const sql = `
            SELECT COALESCE(SUM(totalamount), 0) AS sum FROM dividend WHERE stoid = ?
            ${sqlStatus}
        `;
        const row = await this.runSql(sql, stoId);
        return row.sum || '0';
    }
}
