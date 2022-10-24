import AbstractSqlService from '../../../generic/AbstractSqlService';
import DividendsOverviewDto from '../dto/DividendsOverviewDto';
import IDividendInvestorService from './IDividendsOverviewService';

export default class DividendInvestorSqlService extends AbstractSqlService implements IDividendInvestorService {
    async getInvestorDividendPeriods(): Promise<{ID: number, dividendPeriod: number}[]> {
        return this.runSql(`SELECT ID, dividendPeriod FROM investor;`);
    }
    async getInvestorDividendPeriodsArray(): Promise<number[]> {
        const rows: {ID: number, period: number}[] = await this.runSql(`SELECT ID, dividendPeriod FROM investor;`);
        const dict: number[] = [];
        rows.forEach((row) => {
            dict[row.ID] = row.period
        });
        return dict;
    }
    async getInvestorsDividendsOverview(ids: number[], stoId: number): Promise<DividendsOverviewDto[]> {
        if (ids.length === 0) {
            return [];
        }
        const idArgs = this.arrayAsSqlArguments(ids);
        const sql = `
            SELECT
                investor.ID AS id,
                CONCAT(investor.firstName, " ", investor.lastName) AS name,
                dividendreceivers.amounttopaid AS dividends,
                investor.dividendPeriod,
                COALESCE(investments.amountInvested, 0) as amountInvested,
                COALESCE(investments.purchasedTokens, 0) as purchasedTokens,
                investorsto.stoid
            FROM investor
            LEFT JOIN investorsto
                    ON investor.ID = investorsto.investorid
            LEFT JOIN (
                SELECT
                    investorid,
                    amounttopaid,
                    dividend.stoid
                FROM dividendreceivers
                INNER JOIN dividend
                    ON dividend.id = dividendreceivers.ID
                    ) dividendreceivers
                ON investor.ID = dividendreceivers.investorid
                AND investorsto.stoid = dividendreceivers.stoid
            LEFT JOIN (
                SELECT
                    InvestorID,
                    stoid,
                    SUM(AmountInvested) as amountInvested,
                    SUM(TokensTransferred) as purchasedTokens
                FROM investments
                WHERE InvestorID IN (${idArgs})
                GROUP BY InvestorID, stoid
            )investments ON investments.InvestorID = investor.ID
            WHERE investor.ID IN (${idArgs})
            AND investorsto.stoid = ?
        `;
        const args: number[] = ids.concat(ids);
        args.push(stoId);
        // TODO: FIX amountInvested and purchasedTokens are always 0
        return this.runSql(sql, args);
    }
}
