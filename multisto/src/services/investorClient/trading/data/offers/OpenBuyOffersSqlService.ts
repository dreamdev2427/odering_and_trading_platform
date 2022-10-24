import AbstractSqlService from '../AbstractSqlService';
import IOpenBuyOffersService from './IOpenBuyOffersService';

export default class OpenBuyOffersSqlService extends AbstractSqlService implements IOpenBuyOffersService {
    fetchOpenBuysQuery = `
        select
            e.ID, DATE_FORMAT(dateFrom,'%M %d %Y') as dateFrom,
            DATE_FORMAT(dateTo,'%M %d %Y') as dateTo,
            t.title, e.rateFrom, e.rateTo, t.currencyid, e.type, e.shares from exchangeorders e, sharetypes t
        where
            e.sharesTypeID = t.id and
            e.investorID = ? and e.type = 2 and
            t.stoid = ?
            AND t.isInvestorTradable = 1
        order by
            dateFrom desc
        ;`;

    fetchOpenBuysOffersQuery = `
        select
            e.ID, o.ID as offerID, t.title, t.currencyid,
            DATE_FORMAT(dateFrom,'%M %d %Y') as dateFrom,  DATE_FORMAT(dateTo,'%M %d %Y') as dateTo,
            e.rateFrom as AskingRate, o.rateFrom as offeredRate from exchangeoffers o, exchangeorders e, sharetypes t
        where
            o.exchangeOrderID = e.ID and
            t.id = e.sharesTypeID and
            o.investorID = ? and
            e.type = 2 and
            t.stoid = ?
            AND t.isInvestorTradable = 1`;

    async fetchOpenBuys(stoId: string, investorId: string) {
        return this.executeSql(this.fetchOpenBuysQuery, [investorId, stoId]);
    }

    async fetchOpenBuysOffers(stoId: string, investorId: string) {
        return this.executeSql(this.fetchOpenBuysOffersQuery, [investorId, stoId]);
    }
}
