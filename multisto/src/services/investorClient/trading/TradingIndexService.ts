import MySqlChain from '../../../modules/MySqlChain';
import SharesRecordSqlService from './data/shares/SharesRecordSqlService';
import SellOffersService from './data/offers/SellOffersSqlService';
import BuyOffersService from './data/offers/BuyOffersSqlService';
import OpenBuyOffersService from './data/offers/OpenBuyOffersSqlService';
import TradingIndexDto from './TradingIndexDto';

export default class TradingIndexService {
    sharesService: SharesRecordSqlService;
    sellOffersService: SellOffersService;
    buyOffersService: BuyOffersService;
    openBuyOffersService: OpenBuyOffersService;

    constructor() {
        this.sharesService = new SharesRecordSqlService(true);
        this.sellOffersService = new SellOffersService(true);
        this.buyOffersService = new BuyOffersService(true);
        this.openBuyOffersService = new OpenBuyOffersService(true);
    }

    /** Fetches the trading module index information
     * @returns Promise of TradingDTO
     */
    index(stoId: string, investorId: string): Promise<TradingIndexDto> {
        MySqlChain.begin(); // Cache sql statements because they are multiple
        this.sharesService.fetchByStoInvestor(stoId, investorId);
        this.sellOffersService.fetchRegisteredShares(stoId, investorId);
        this.sellOffersService.fetchNormalShares(stoId);
        this.buyOffersService.fetchByInvestorSto(stoId, investorId);
        this.openBuyOffersService.fetchOpenBuys(stoId, investorId);
        this.openBuyOffersService.fetchOpenBuysOffers(stoId, investorId);

        return new Promise((resolve, reject) => {
            MySqlChain.execute() // Execute all sql statements
            .then((data: any) => {
                resolve(TradingIndexService.buildDto(data));
            })
            .catch((error: any) => {
                reject(error);
            });
        });
    }

    /**
     * Passes request results from the domain specific services into a DTO
     */
    static buildDto(data: any): TradingIndexDto {
        return new TradingIndexDto(
            data[0],
            data[1],
            data[2],
            data[3],
            data[4],
            data[5],
            data[6],
        );
    }
}
