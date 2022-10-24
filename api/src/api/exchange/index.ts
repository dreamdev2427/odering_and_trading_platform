import ExchangeOfferResolvers from './exchange-offer.resolvers';
import ExchangeOrderResolvers from './exchange-order.resolvers';
import AtomicSwapResolvers from './atomic-swap.resolvers';

const resolvers = [
  ExchangeOfferResolvers,
  ExchangeOrderResolvers,
  AtomicSwapResolvers,
] as const;

export default resolvers;
