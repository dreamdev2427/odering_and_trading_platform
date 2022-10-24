import { Resolver, Query, Authorized, Arg, Int } from 'type-graphql';

import { PaymentChannels } from 'entities';
import { internalWalletMode } from 'core/feature-flags-checkers';

@Resolver()
class PaymentChannelsResolvers {
  @Authorized()
  @Query(() => [PaymentChannels], {
    description: 'Get all stos payment channels',
  })
  async investorPaymentChannels(
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<PaymentChannels[]> {
    const walletMode = await internalWalletMode();
    const stoId = walletMode.isGlobal() ? 0 : stoID;
    return PaymentChannels.find({ stoID: stoId });
  }
}

export default PaymentChannelsResolvers;
