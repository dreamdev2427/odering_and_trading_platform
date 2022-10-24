export default class TradingIndexDto {
    sharesRec: any;
    sells: any;
    exchange: any;
    buys: any;
    exchangeOpenDate: any;
    myOpenBuys: any;
    myOpenBuysOffers: any;
    exchangeIsClose: number = 1;

    constructor(
        sharesRec: any,
        sells: any,
        exchange: any,
        buys: any,
        exchangeOpenDate: any,
        myOpenBuys: any,
        myOpenBuysOffers: any,
    ) {
        this.sharesRec = sharesRec;
        this.sells = sells;
        this.exchange = exchange;
        this.buys = buys;
        this.exchangeOpenDate = exchangeOpenDate;
        this.myOpenBuys = myOpenBuys;
        this.myOpenBuysOffers = myOpenBuysOffers;

        const today = new Date();
        if (exchangeOpenDate > today) {
            // TODO: Rename to exchangeIsClosed everywhere, incl. view
            this.exchangeIsClose = 1;
        } else {
            this.exchangeIsClose = 0;
        }
    }
}
