import mysql from '../../../modules/mysql';
import { InvestorBuyPropertyAlert } from '../../../Schema';
import AbstractSqlService from '../AbstractSqlService';
import IInvestorBuyPropertyAlertService from './IInvestorBuyPropertyAlertService';

export default class InvestorBuyPropertyAlertSqlService extends AbstractSqlService implements IInvestorBuyPropertyAlertService {
    async findById(ID: string): Promise<any> {
        mysql.executeSQLStatement(`SELECT * FROM InvestorBuyPropertyAlert WHERE id = ?`, [ID])
            .then((result) => {
                return result;
            });
    }
    async getForInvestorIds(investorIds: number[]): Promise<InvestorBuyPropertyAlert[]> {
        const ids = investorIds.filter(id => !Number.isNaN(id));
        if (!ids.length) {
            throw new Error(`No valid IDs provided`);
        }
        return this.runSql(`SELECT * FROM InvestorBuyPropertyAlert WHERE investorID IN (${ids.join(',')})`);
    }
}
