import { Dividend, Dividendreceivers } from '../../../../Schema';
import DividendInvestorSqlService from '../data/DividendsOverviewSqlService';
import DividendsSqlService from '../data/DividendsSqlService';
import IDividendInvestorService from '../data/IDividendsOverviewService';
import IDividendsService from '../data/IDividendsService';
import DividendsOverviewDto from '../dto/DividendsOverviewDto';
import IDividendsModule from './IDividendsModule';

/**
 * Facade to the dividends module's services.
 */
export default class DividendsModule implements IDividendsModule {
    dividendSvc: IDividendsService = new DividendsSqlService();
    investorSvc: IDividendInvestorService = new DividendInvestorSqlService();

    async getInvestorsDividends(): Promise<Dividendreceivers[]> {
        return this.dividendSvc.getInvestorsDividends();
    }
    async getPayoutsReports(): Promise<Dividend[]> {
        return this.dividendSvc.getDividendPayouts();
    }
    async getInvestorDividendPeriods(): Promise<number[]> {
        return this.investorSvc.getInvestorDividendPeriodsArray();
    }
    async getInvestorDividendsOverviews(ids: number[], stoid: number): Promise<DividendsOverviewDto[]> {
        return this.investorSvc.getInvestorsDividendsOverview(ids, stoid);
    }
    async getInvestorUnpaidDividendsFor(investorId: number, stoId: number): Promise<string> {
        const dividendsDto = await this.dividendSvc.getInvestorDividendsFor(investorId, stoId, [0]);
        return dividendsDto.dividends;
    }
    async getInvestorAllDividendsFor(investorId: number, stoId: number): Promise<string> {
        const dividendsDto = await this.dividendSvc.getInvestorDividendsFor(investorId, stoId);
        return dividendsDto.dividends;
    }
    async getInvestorPaidAffiliateDividendsFor(investorId: number, stoId: number): Promise<string> {
        const dividendsDto = await this.dividendSvc.getInvestorTotalAffiliateDividendsFor(investorId, stoId, [1]);
        return dividendsDto.dividends;
    }
    async getInvestorUnpaidAffiliateDividendsFor(investorId: number, stoId: number): Promise<string> {
        const dividendsDto = await this.dividendSvc.getInvestorTotalAffiliateDividendsFor(investorId, stoId, [0]);
        return dividendsDto.dividends;
    }
    async getInvestorTotalAffiliateDividendsFor(investorId: number, stoId: number): Promise<string> {
        const dividendsDto = await this.dividendSvc.getInvestorTotalAffiliateDividendsFor(investorId, stoId);
        return dividendsDto.dividends;
    }
    async getProjectUnpaidDividends(stoId: number): Promise<string> {
        return this.dividendSvc.getProjectDividends(stoId, [0]);
    }
    async getProjectAllDividends(stoId: number): Promise<string> {
        return this.dividendSvc.getProjectDividends(stoId);
    }
}
