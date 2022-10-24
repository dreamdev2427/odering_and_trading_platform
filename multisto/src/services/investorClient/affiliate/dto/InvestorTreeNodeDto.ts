export default interface InvestorTreeNodeDto {
    ID: number,
    name: string,
    referByInvestorID: number | null,
    eligible: number,
    isKYC: number,
    KYCCurrentStatus: number,
    stoid: number | null,
    level: number | null,
    directs: InvestorTreeNodeDto[] | null;
}
