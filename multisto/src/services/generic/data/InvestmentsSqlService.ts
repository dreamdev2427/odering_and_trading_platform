import { Investments } from '../../../Schema';
import AbstractSqlService from '../AbstractSqlService';
import IInvestmentsService from './IInvestmentsService';

export default class InvestmentsSqlService extends AbstractSqlService implements IInvestmentsService {
    async getForInvestorIds(investorIds: number[]): Promise<Investments[]> {
        const ids = investorIds.filter(id => typeof id === "number" && !Number.isNaN(id));
        if (!ids.length) {
            throw new Error(`No valid IDs provided`);
        }
        return this.runSql(`SELECT * FROM investments WHERE investorID IN (${ids.join(',')})`);
    }
}
