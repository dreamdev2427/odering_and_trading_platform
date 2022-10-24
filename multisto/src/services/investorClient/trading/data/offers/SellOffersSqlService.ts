import AbstractSqlService from '../AbstractSqlService';
import ISellOffersService from './ISellOffersService';

export default class SellOffersSqlService extends AbstractSqlService implements ISellOffersService {
    fetchRegisteredSharesQuery = `
        select
            e.ID, DATE_FORMAT(dateFrom,'%M %d %Y') as dateFrom,
            DATE_FORMAT(dateTo,'%M %d %Y') as dateTo,
            t.title, e.rateFrom, e.rateTo, t.currencyid, e.type, e.shares from exchangeorders e, sharetypes t
        where
            t.stoid = ? and
            e.sharesTypeID = t.id and
            e.investorID = ? and
            e.type = 1
            AND t.isInvestorTradable = 1
        order by
            dateFrom desc
        ;`;

    fetchNormalSharesQuery = `
        select
            e.ID, DATE_FORMAT(dateFrom,'%M %d %Y')
            as dateFrom, t.title, e.rateFrom, e.rateTo, t.currencyid, e.shares, e.type from exchangeorders e, sharetypes t
        where
            DATE(NOW()) >= e.dateFrom and
            t.stoid = ? and
            e.sharesTypeID = t.id
            AND t.isInvestorTradable = 1
        order by
            dateFrom desc
        ;`;

    async fetchRegisteredShares(stoId: string, investorId:string): Promise<any> {
        return this.executeSql(this.fetchRegisteredSharesQuery, [stoId, investorId]);
    }

    async fetchNormalShares(stoId: string): Promise<any> {
        return this.executeSql(this.fetchNormalSharesQuery, [stoId]);
    }
}
