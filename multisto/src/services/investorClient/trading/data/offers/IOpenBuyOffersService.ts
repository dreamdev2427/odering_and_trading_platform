export default interface IOpenBuyOffersService {
    fetchOpenBuys(stoId: string, investorId: string): Promise<any>;
    fetchOpenBuysOffers(stoId: string, investorId: string): Promise<any>;
}
