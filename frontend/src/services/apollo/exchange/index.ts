import {
  GetExchangeOrderDetailQuery,
  GetExchangeOfferDetailQuery,
  GetExchangeOrdersQuery,
  GetInvestorExchangeOrdersQuery,
  GetMyOffersQuery,
} from '../graphql';

export type InvestorExchangeOrder = GetInvestorExchangeOrdersQuery['getInvestorExchangeOrders'][0];
export type ExchangeOrderItem = GetExchangeOrdersQuery['getExchangeOrders'][0];

export type InvestorExchangeOffer = GetMyOffersQuery['getExchangeOffers'][0];

export type ExchangeOrderDetail = GetExchangeOrderDetailQuery['getExchangeOrder'];
export type ExchangeOrderDetailOffer = GetExchangeOrderDetailQuery['getExchangeOrderOffers'][0];

export type ExchangeOfferDetailOrder = GetExchangeOfferDetailQuery['getExchangeOrder'];
export type ExchangeOfferDetailOffer = GetExchangeOfferDetailQuery['getExchangeOffer'];
export type ExchangeOfferDetail = NonNullable<GetExchangeOfferDetailQuery['getExchangeOffer']>;
