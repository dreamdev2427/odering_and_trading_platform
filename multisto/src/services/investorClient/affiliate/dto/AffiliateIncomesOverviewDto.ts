export type IncomeAffiliateDetailsDto = {
    totalTokens: string;
    totalFiat: string;
}
export type IncomeInvestorDetailsDto = {
    investorId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    eligibility: string;
    stoId: number;
    stoTitle: number;
    awarded: number;
}
export type IncomeBankDetailsDto = {
    accountName: string;
    routingNumber: string;
    iban: string;
    tokensWallet: string;
}
export type AffiliateIncomesOverviewDto =
    IncomeAffiliateDetailsDto &
    IncomeInvestorDetailsDto &
    IncomeBankDetailsDto;

export default AffiliateIncomesOverviewDto;
