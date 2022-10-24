export default interface ISharesRecordService {
    fetchByStoInvestor(stoId: string, investorId: string): Promise<any>;
}
