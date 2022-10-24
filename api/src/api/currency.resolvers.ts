import { Resolver, Query, Arg, Authorized, Int } from 'type-graphql';

import { Currency } from '../entities';

@Resolver()
class CurrencyResolvers {
  @Authorized()
  @Query(() => Currency, {
    description: 'Get specific currency',
    nullable: true,
  })
  findCurrency(
    @Arg('currencyID', () => Int) currencyID: number,
  ): Promise<Currency | undefined> {
    return Currency.findOne({ ID: currencyID });
  }

  @Authorized()
  @Query(() => [Currency], {
    description: 'Get all currencies available',
    nullable: true,
  })
  findAllCurrencies(): Promise<Currency[]> {
    return Currency.find();
  }

}

export default CurrencyResolvers;
