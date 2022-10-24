export default interface SellOffersService {
    fetchRegisteredShares(stoId: string, investorId:string): Promise<any>;
    fetchNormalShares(stoId: string): Promise<any>;
}
