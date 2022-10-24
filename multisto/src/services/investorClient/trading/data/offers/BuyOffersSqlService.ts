import AbstractSqlService from '../AbstractSqlService';
import IBuyOffersService from './IBuyOffersService';

export default class BuyOffersSqlService extends AbstractSqlService implements IBuyOffersService {
    fetchQuery = `
        select
            e.ID, o.ID as offerID, t.title, t.currencyid,  DATE_FORMAT(dateFrom,'%M %d %Y') as dateFrom, DATE_FORMAT(dateTo,'%M %d %Y') as dateTo,
            e.rateFrom as AskingRate, o.rateFrom as offeredRate from exchangeoffers o, exchangeorders e, sharetypes t
        where
            o.exchangeOrderID = e.ID and
            t.id = e.sharesTypeID and
            o.investorID = ? and e.type = 1 and
            t.stoid = ?
            AND t.isInvestorTradable = 1
        ;`;

    async fetchByInvestorSto(stoId: string, investorId: string): Promise<any> {
        return this.executeSql(this.fetchQuery, [investorId, stoId]);
    }
}
