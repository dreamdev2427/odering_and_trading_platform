export default interface BuyOffersService {
    fetchByInvestorSto(stoId: string, investorId: string): Promise<any>;
}