import { Resolver, Query, Arg, Int, Mutation, Authorized, Ctx } from 'type-graphql';

import { InvestorPublicKeys } from 'entities';
import { Context, JWT_ROLE } from 'core/context';

@Resolver()
class PublicKeyResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => [InvestorPublicKeys], {
    description: 'Get investors public keys',
    nullable: true,
  })
  investorPublicKeys(@Ctx() { user }: Context): Promise<InvestorPublicKeys[] | []> {
    return InvestorPublicKeys.find({ investorID: user.ID });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => Boolean, {
    description: `Check investor's public key to see it is whitelisted`,
  })
  async isInvestorWhiteListed(
    @Ctx() { user }: Context,
    @Arg('walletAddress') walletAddress: string,
  ): Promise<boolean> {
    const investorPublicKey = await InvestorPublicKeys.findOne({
      investorID: user.ID,
      title: walletAddress,
    });
    return !!investorPublicKey;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for add public key',
  })
  async investorPublicKeyAdd(
    @Ctx() { user }: Context,
    @Arg('title') title: string,
    @Arg('blockchainID', () => Int) blockchainID: number,
  ): Promise<boolean> {
    const key = InvestorPublicKeys.create({
      title,
      blockchainID,
      investorID: user.ID,
    });
    await key.save();
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for delete public key',
  })
  async investorPublicKeyDelete(
    @Ctx() { user }: Context,
    @Arg('keyID', () => Int) keyID: number,
  ): Promise<boolean> {
    const key = await InvestorPublicKeys.findOne({
      ID: keyID,
      investorID: user.ID,
    });
    await key?.remove();
    return true;
  }
}

export default PublicKeyResolvers;
