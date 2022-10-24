import { Resolver, Query, Mutation, Arg, Int, Authorized, Ctx } from 'type-graphql';

import { ExchangeOffer } from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import { ExchangeOrder, EXCHANGE_TYPE } from 'entities/exchange';
import createExchangeOffer from 'services/exchange/create-exchange-offer';
import { IsNull, Not } from 'typeorm';
import { ExchangeOfferInput } from './exchange-offer.types';

@Resolver()
class ExchangeOfferResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => [ExchangeOffer], {
    description: 'Get investors exchange offers',
  })
  getExchangeOffers(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int) stoID: number,
    @Arg('type', () => EXCHANGE_TYPE) type: EXCHANGE_TYPE,
  ): Promise<ExchangeOffer[]> {
    return ExchangeOffer.find({
      relations: ['exchangeOrder'],
      where: {
        investorID: user.ID,
        stoID: stoID < 0 ? Not(IsNull()) : stoID,
        exchangeOrder: {
          type,
        },
      },
    });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [ExchangeOffer], {
    description: 'Get exchange orders offers',
  })
  async getExchangeOrderOffers(
    @Ctx() { user }: Context,
    @Arg('orderID', () => Int) orderID: number,
  ): Promise<ExchangeOffer[]> {
    return ExchangeOffer.find({
      relations: ['exchangeOrder'],
      where: {
        exchangeOrderID: orderID,
        exchangeOrder: {
          investorID: user.ID,
        },
      },
    });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => ExchangeOffer, {
    description: 'Get investors accepted exchange offer',
    nullable: true,
  })
  async getAcceptedExchangeOffer(
    @Ctx() { user }: Context,
    @Arg('orderID', () => Int) orderID: number,
  ): Promise<ExchangeOffer | undefined> {
    const { atomicSwapExchangeOffersID } = await ExchangeOrder.findOneOrFail({
      investorID: user.ID,
      ID: orderID,
    });
    return ExchangeOffer.findOne({ ID: atomicSwapExchangeOffersID });
  }

  /**
   * Query can returns null because exchange offer may not exist
   * And we need to handle that situation
   */
  @Authorized(JWT_ROLE.investor)
  @Query(() => ExchangeOffer, {
    description: 'Get investors exchange offer',
    nullable: true,
  })
  getExchangeOffer(
    @Ctx() { user }: Context,
    @Arg('orderID', () => Int) orderID: number,
  ): Promise<ExchangeOffer | undefined> {
    return ExchangeOffer.findOne({ investorID: user.ID, exchangeOrderID: orderID });
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Create an exchange offer',
  })
  async createOffer(
    @Ctx() { user }: Context,
    @Arg('offer', () => ExchangeOfferInput) offer: ExchangeOfferInput,
  ): Promise<boolean> {
    return createExchangeOffer(offer, user.ID);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Remove an exchange offer',
  })
  async deleteOffer(
    @Ctx() { user }: Context,
    @Arg('orderID', () => Int) orderID: number,
  ): Promise<boolean> {
    const offer = await ExchangeOffer.findOneOrFail({
      investorID: user.ID,
      exchangeOrderID: orderID,
    });
    await offer.remove();
    return true;
  }
}

export default ExchangeOfferResolvers;
