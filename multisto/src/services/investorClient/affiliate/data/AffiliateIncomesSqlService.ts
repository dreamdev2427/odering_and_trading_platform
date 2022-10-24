/* eslint-disable class-methods-use-this */
import { Affiliateincomes } from '../../../../Schema';
import AbstractSqlService from '../../../generic/AbstractSqlService';
import AffiliateEarningsDto from '../dto/AffiliateEarningsDto';
import NamedAffiliateIncome from '../dto/NamedAffiliateIncome';
import IAffiliateIncomesService from './IAffiliateIncomesService';

export default class AffiliateIncomesSqlService extends AbstractSqlService implements IAffiliateIncomesService {
    async logIncomes(incomes: Affiliateincomes[]): Promise<void[]> {
        const promises: Promise<void>[] = []; // needed to await the forEach
        incomes.forEach((income) => {
            promises.push(this.logIncome(income))
        });
        return Promise.all(promises);
    }
    async logIncome(income: Affiliateincomes): Promise<void> {
        return this.runSql(`insert into affiliateincomes (
                investorId,
                amount,
                tokens,
                remark,
                stoId,
                awarded,
                dateEarned,
                dateAwarded,
                affiliateId,

                purchaseAmount,
                purchaseTokens,
                affiliateLevel
            ) VALUES (?,?,?,?,?,?,CURDATE(),?,?,   ?,?,?)`,
            [
                income.investorId,
                income.amount,
                income.tokens,
                income.remark,
                income.stoId,
                income.awarded,
                // (notFromToday) ? 'REMOVE' : income.dateEarned?.toISOString().split('T')[0],
                income.dateAwarded?.toISOString().split('T')[0] ?? null,
                income.affiliateId ?? null,
                // income.investmentId ?? null,
                income.purchaseAmount ?? null,
                income.purchaseTokens ?? null,
                income.affiliateLevel ?? null,
            ].filter(argument => argument !== 'REMOVE')
        );
    }
    async getIncomes(): Promise<Affiliateincomes[]> {
        return this.runSql(`SELECT * FROM affiliateincomes WHERE awarded = 0;`);
    }
    async getIncomesById(ids: number[]): Promise<Affiliateincomes[]> {
        return this.runSql(`SELECT * FROM affiliateincomes WHERE id IN (${ids.join(',')});`);
    }
    async getProjectTotalTokenEarnings(investorId: number, stoId: number, awarded?: number): Promise<string> {
        const awardedSql = (awarded !== undefined) ? `AND awarded = ${awarded}` : ``;
        const sql = `SELECT COALESCE(SUM(tokens), 0) as totalTokens FROM affiliateincomes WHERE investorId = ? AND stoId = ? ${awardedSql}`;
        const result: {
            totalTokens: string,
        } [] = await this.runSql(sql, [investorId, stoId]);
        return result[0].totalTokens;
    }
    async getProjectTotalFiatEarnings(investorId: number, stoId: number, newOrPending?: boolean): Promise<string> {
        const awardedSql = (newOrPending) ? `AND (awarded = 0 OR awarded = 2)` : ``;
        const sql = `SELECT COALESCE(SUM(amount), 0) as totalAmount FROM affiliateincomes WHERE investorId = ? AND stoId = ? ${awardedSql}`;
        const result: {
            totalAmount: string,
        } [] = await this.runSql(sql, [investorId, stoId]);
        return result[0].totalAmount;
    }
    async getProjectTotalEarnings(investorId: number, stoId: number): Promise<AffiliateEarningsDto> {
        const sql = `SELECT COALESCE(SUM(amount), 0) as totalAmount, COALESCE(SUM(tokens), 0) as totalTokens FROM affiliateincomes WHERE investorId = ? AND stoid = ?`;
        const result: {
            totalAmount: string,
            totalTokens: string,
        } [] = await this.runSql(sql, [investorId, stoId]);
        return {
            investorId,
            tokenEarnings: result[0].totalTokens,
            currencyEarnings: result[0].totalAmount,
            projectId: stoId,
            rentalIncome: '', // Rental is calculated elsewhere
        };
    }
    async getStoIdsFor(investorId: number): Promise<number[]> {
        const sql = `SELECT stoid FROM affiliateincomes WHERE investorID = ? GROUP BY stoid`;
        const rows: { stoid: number }[] = await this.runSql(sql, investorId);
        return rows.map(row => row.stoid);
    }
    async markAsAwarded(income: Affiliateincomes): Promise<void> {
        const sql = `UPDATE affiliateincomes SET awarded = 1, dateAwarded = NOW() WHERE id = ?`;
        return this.runSql(sql, income.id);
    }
    async getUnpaidIncomes(stoId?: number): Promise<Affiliateincomes[]> {
        const stoSql = (stoId !== undefined) ? `AND stoId = ${stoId}` : ``;
        const sql = `SELECT * FROM affiliateincomes WHERE awarded = 0 ${stoSql}`;
        return this.runSql(sql);
    }
    async getAllInvestorIncomes(investorId: number, stoId?: number): Promise<NamedAffiliateIncome[]> {
        const stoSql = stoId ? `AND stoId = ${stoId}` : ``;
        const sql = `
            SELECT
                affiliateincomes.*,
                CONCAT(investor.firstName, ' ', investor.lastName) as affiliateName
            FROM affiliateincomes
            LEFT JOIN investor
            ON        investor.ID = affiliateincomes.affiliateId
            WHERE investorId = ?
            ${stoSql}
            ORDER BY dateEarned DESC
        `;
        return this.runSql(sql, investorId);
    }
    async getAllInvestorIncomesFrom(investorId: number, affiliateId: number, stoId?: number): Promise<{ amount: string, tokens: string, name: string }[]> {
        const stoSql = stoId ? `AND stoId = ${stoId}` : ``;
        const sql = `
            SELECT
                COALESCE(SUM(affiliateincomes.amount),0) as amount,
                COALESCE(SUM(affiliateincomes.tokens),0) as tokens,
                CONCAT(investor.firstName, ' ', investor.lastName) as affiliateName
            FROM affiliateincomes
            LEFT JOIN investor
            ON        investor.ID = affiliateincomes.affiliateId
            WHERE investorId = ?
            ${stoSql}
            ORDER BY dateEarned DESC
        `;
        return this.runSql(sql, investorId);
    }
    async setStatusForInvestors(investorIds: number[], status: number): Promise<void> {
        const ids = investorIds.filter(id => typeof id === "number" && !Number.isNaN(id));
        if (!ids.length) {
            throw new Error(`No valid IDs provided`);
        }
        this.runSql(`UPDATE affiliateincomes SET awarded = ? WHERE investorId IN (${ids.join(',')})`, status);
    }
}
