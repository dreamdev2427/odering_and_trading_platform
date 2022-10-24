import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { FindConditions, In, IsNull, Not, Raw } from 'typeorm';

import { ExchangeOrder } from 'entities';
import { ATOMIC_SWAP_STATUS, EXCHANGE_TYPE } from 'entities/exchange';
import { Context, JWT_ROLE } from 'core/context';
import createExchangeOrder from 'services/exchange/create-exchange-order';
import updateExchangeOrderStatus from 'services/exchange/update-exchange-order';
import {
  ExchangeBuyOrderInput,
  ExchangeSellOrderInput,
  ExchangeUpdateOrderInput,
} from './exchange-order.types';

@Resolver()
class ExchangeOrderResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => [ExchangeOrder], {
    description: 'Get all exchange orders',
  })
  exchangeOrders(): Promise<ExchangeOrder[]> {
    return ExchangeOrder.find();
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [ExchangeOrder], {
    description: 'Get investors exchange orders',
  })
  getInvestorExchangeOrders(
    @Ctx() { user }: Context,
    @Arg('type', () => EXCHANGE_TYPE) type: EXCHANGE_TYPE,
    @Arg('stoID', () => Int, { nullable: true }) stoID?: number,
  ): Promise<ExchangeOrder[]> {
    const where: FindConditions<ExchangeOrder> = { investorID: user.ID, type };
    if (stoID && stoID >= 0) {
      where.stoID = stoID;
    }

    return ExchangeOrder.find(where);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [ExchangeOrder], {
    description: 'Get all stos exchange orders',
  })
  getExchangeOrders(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<ExchangeOrder[]> {
    return ExchangeOrder.find({
      stoID: stoID < 0 ? Not(IsNull()) : stoID,
      investorID: Not(user.ID),
      atomicSwapCurrentStatus: Not(
        In([
          ATOMIC_SWAP_STATUS.BUYER_COMPLETED,
          ATOMIC_SWAP_STATUS.UNSUCCESSFUL,
          ATOMIC_SWAP_STATUS.PROCESSED,
        ]),
      ),
      dateFrom: Raw((alias) => `${alias} <= CURDATE()`),
      dateTo: Raw((alias) => `${alias} >= CURDATE()`),
    });
  }

  // TODO@Q: how secure it should be?
  @Authorized(JWT_ROLE.investor)
  @Query(() => ExchangeOrder, {
    description: 'Get exchange order by ID',
  })
  getExchangeOrder(@Arg('orderID', () => Int) orderID: number): Promise<ExchangeOrder> {
    return ExchangeOrder.findOneOrFail(orderID);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Create an exchange sell order',
  })
  async createSellOrder(
    @Ctx() { user }: Context,
    @Arg('order', () => ExchangeSellOrderInput) order: ExchangeSellOrderInput,
  ): Promise<boolean> {
    return createExchangeOrder(order, user.ID, EXCHANGE_TYPE.SELL);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Update an exchange sell order',
  })
  async updateSellOrder(
    @Ctx() { user }: Context,
    @Arg('orderID', () => Int) orderID: number,
    @Arg('data', () => ExchangeUpdateOrderInput) data: ExchangeUpdateOrderInput,
  ): Promise<boolean> {
    const order = await ExchangeOrder.findOneOrFail({ ID: orderID, investorID: user.ID });
    const merged = ExchangeOrder.merge(order, data);
    await merged.save();
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Create an exchange buy order',
  })
  async createBuyOrder(
    @Ctx() { user }: Context,
    @Arg('order', () => ExchangeBuyOrderInput) order: ExchangeBuyOrderInput,
  ): Promise<boolean> {
    return createExchangeOrder(order, user.ID, EXCHANGE_TYPE.BUY);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Remove an exchange order',
  })
  async deleteOrder(
    @Ctx() { user }: Context,
    @Arg('orderID', () => Int) orderID: number,
  ): Promise<boolean> {
    const order = await ExchangeOrder.findOneOrFail({ investorID: user.ID, ID: orderID });
    await order.remove();
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, { description: 'update exchange order status' })
  async updateOrderStatus(
    @Ctx() { user }: Context,
    @Arg('orderID', () => Int) orderID: number,
    @Arg('atomicSwapCurrentStatus', () => ATOMIC_SWAP_STATUS)
    atomicSwapCurrentStatus: ATOMIC_SWAP_STATUS,
  ): Promise<boolean> {
    return updateExchangeOrderStatus(atomicSwapCurrentStatus, user.ID, orderID);
  }
}
export default ExchangeOrderResolvers;
