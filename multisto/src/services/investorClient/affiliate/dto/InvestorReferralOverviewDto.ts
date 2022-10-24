import { Investor } from '../../../../Schema';

export default interface InvestorReferralOverviewDto extends Investor {
    isActive: number;
    referrerName: string;
    directs: number;
}
