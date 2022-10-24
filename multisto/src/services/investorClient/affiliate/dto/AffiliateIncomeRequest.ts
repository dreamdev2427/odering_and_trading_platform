import { Affiliateincomes } from '../../../../Schema';
import RemoteAffiliateResponse from '../api/RemoteAffiliateResponse';
import AffiliateIncomeDto, { mapToAffiliateincomes } from './AffiliateIncomeDto';

/** Response from remote service */
export default interface AffiliateIncomeResponse extends RemoteAffiliateResponse {
    incomes: AffiliateIncomeDto[];
}

export const mapToAffiliateincomesArray = (request: AffiliateIncomeResponse): Affiliateincomes[] =>
    request.incomes.map((income: AffiliateIncomeDto) =>
        mapToAffiliateincomes(income));
