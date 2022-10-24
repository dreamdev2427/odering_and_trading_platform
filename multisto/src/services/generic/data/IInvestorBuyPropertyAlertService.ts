import { InvestorBuyPropertyAlert } from '../../../Schema';

export default interface IInvestorBuyPropertyAlertService {
    findById(ID: string): Promise<InvestorBuyPropertyAlert>;
    getForInvestorIds(investorIds: number[]): Promise<InvestorBuyPropertyAlert[]>;
}
