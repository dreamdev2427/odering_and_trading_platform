import { Resolver, Query, Arg, Int, Authorized, Ctx } from 'type-graphql';
import { FindConditions, Not } from 'typeorm';

import { Context, JWT_ROLE } from 'core/context';
import { SharesWallet } from 'entities';

@Resolver()
class SharesWalletResolvers {
  @Authorized(JWT_ROLE.investor, JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Query(() => [SharesWallet], {
    description: 'Get investors shares wallet',
  })
  getSharesWallets(
    @Ctx() { user }: Context,
    @Arg('shareTypeID', () => Int, { nullable: true }) shareTypeID?: number,
    @Arg('stoID', () => Int, { nullable: true }) stoID?: number,
    @Arg('platform', () => Boolean, { nullable: true }) platform: boolean = false,
  ): Promise<SharesWallet[]> {
    const relations: string[] = [];
    const where: FindConditions<SharesWallet> = {
      investorID: user.ID,
      publicKey: platform ? 'platform' : Not('platform'),
    };
    if (shareTypeID) {
      where.shareTypeID = shareTypeID;
    }

    if (stoID) {
      where.shareType = { stoID };
      relations.push('shareType');
    }

    return SharesWallet.find({ where, relations });
  }
}

export default SharesWalletResolvers;
