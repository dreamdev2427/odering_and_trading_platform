import { Resolver, Query, Authorized } from 'type-graphql';

import { SwapToken } from 'entities';

@Resolver()
class SwapTokenResolvers {

  @Authorized()
  @Query(() => [SwapToken], {
    description: 'Get swap tokens',
  })
  getSwapTokens(): Promise<SwapToken[]> {
    return SwapToken.find();
  }

}

export default SwapTokenResolvers;
