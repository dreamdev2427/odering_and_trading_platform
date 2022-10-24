import { Resolver, Mutation, Arg, Int, Authorized, Ctx } from 'type-graphql';

import { Context, JWT_ROLE } from 'core/context';
import startAtomicSwap from 'services/exchange/start-atomic-swap';
import AtomicSwap from 'services/exchange/accept-atomic-swap';
import BlockchainAtomicSwap from 'services/exchange/accept-blockchain-atomic-swap';

@Resolver()
class AtomicSwapResolvers {
  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for starting atomic swap',
  })
  startSwap(@Arg('offerID', () => Int) offerID: number): Promise<boolean> {
    return startAtomicSwap(offerID);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for accept atomic swap',
  })
  acceptInternalSwap(@Arg('offerID', () => Int) offerID: number): Promise<boolean> {
    const swap = new AtomicSwap(offerID);
    return swap.accept();
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for Accepting Atomic Swap through Blockchain',
  })
  async acceptBlockchainSwap(
    @Ctx() { user }: Context,
    @Arg('walletAddress', () => String) walletAddress: string,
    @Arg('orderID', () => Int) orderID: number,
  ): Promise<boolean> {
    const swap = new BlockchainAtomicSwap(user.ID, walletAddress, orderID);
    return swap.accept();
  }
}

export default AtomicSwapResolvers;
