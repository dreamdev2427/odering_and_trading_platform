import { Investments } from '../../../Schema';

export default interface IInvestmentsService {
    getForInvestorIds(investorIds: number[]): Promise<Investments[]>;
}
