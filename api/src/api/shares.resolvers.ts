import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { In, FindConditions } from 'typeorm';

import { Shares } from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import ShareTransferService from 'services/shares/ShareTransferService';
import { TransferShareInput, TRANSFER_ENTITY } from './shares.types';

@Resolver()
class SharesResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => Shares, {
    description: 'Get an investors share',
    nullable: true,
  })
  investorShare(
    @Ctx() { user }: Context,
    @Arg('ID', () => Int, { nullable: true }) ID?: number,
    @Arg('shareTypeID', () => Int, { nullable: true }) shareTypeID?: number,
  ): Promise<Shares | undefined> {
    const where: FindConditions<Shares> = { investorID: user.ID };
    if (ID) {
      where.ID = ID;
    }
    if (shareTypeID) {
      where.shareTypeID = shareTypeID;
    }
    return Shares.findOne(where);
  }

  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Query(() => [Shares], {
    description: "Get an investor's share balance(s) in a share type(s)",
  })
  async investorShareBalance(
    @Arg('investorID', () => Int) investorID: number,
    @Arg('shareTypeIDs', () => [Int], { nullable: true }) shareTypeIDs?: number[],
  ): Promise<Shares[]> {
    return shareTypeIDs
      ? Shares.find({ investorID: investorID, shareTypeID: In(shareTypeIDs) })
      : Shares.find({ investorID: investorID });
  }

  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Mutation(() => Boolean, {
    description:
      "Increase an investor's share balance and decrease the company's available shares in that type.",
  })
  async investorTransferShares(
    @Ctx() { user }: Context,
    @Arg('data', () => TransferShareInput) data: TransferShareInput,
  ): Promise<boolean> {
    const transfer = new ShareTransferService({ adminID: user.ID, ...data });
    try {
      await transfer.transferSharesBetween('company', 'investor');
    } catch (e) {
      console.error(e);
      throw e;
    }
    return true;
  }

  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin, JWT_ROLE.admin, JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description:
      "Decrease an investor's available share balance and increase the company's shares in that type.",
  })
  async companyTransferShares(
    @Ctx() { user }: Context,
    @Arg('data', () => TransferShareInput) data: TransferShareInput,
  ): Promise<boolean> {
    const transfer = new ShareTransferService({ adminID: user.ID, ...data });
    try {
      await transfer.transferSharesBetween('investor', 'company');
    } catch (e) {
      console.error(e);
      throw e;
    }
    return true;
  }

  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Mutation(() => Boolean, {
    description: 'Transfer shares between two entities.',
  })
  async transferSharesBetween(
    @Ctx() { user }: Context,
    @Arg('from', () => TRANSFER_ENTITY) from: string,
    @Arg('to', () => TRANSFER_ENTITY) to: string,
    @Arg('data', () => TransferShareInput) data: TransferShareInput,
    @Arg('alert', () => Int) ID?: number,
  ): Promise<boolean> {
    const transfer = new ShareTransferService({ adminID: user.ID, ...data }, ID);
    try {
      await transfer.transferSharesBetweenString(from, to);
    } catch (e) {
      console.error(e);
      throw e;
    }
    return true;
  }

  @Authorized(JWT_ROLE.investor, JWT_ROLE.api, JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Query(() => [Shares], {
    description: 'Get share balances for share type',
  })
  async shareTypeShares(
    @Ctx() { user }: Context,
    @Arg('shareTypeID', () => Int) shareTypeID: number,
  ): Promise<Shares[]> {
    try {
      // Limit shares listed to investorID if using investor role
      const investorID = user.role === JWT_ROLE.investor && user.ID;
      // Limit shares listed to stoID if using STO admin role
      const stoID = user.role === JWT_ROLE.admin && user.stoID;
      return await Shares.find({
        where: {
          shareTypeID,
          ...(stoID && { stoID }),
          ...(investorID && { investorID }),
        },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @Authorized()
  @Query(() => [Shares], { description: 'Get all investors shares' })
  async investorShares(
    @Ctx() { user }: Context,
    @Arg('investorID', () => Int, { nullable: true }) investorID: number,
    @Arg('stoID', () => Int, { nullable: true }) stoID: number,
  ): Promise<Shares[] | []> {
    const query: FindConditions<Shares> = {
      investorID: investorID && user.role === JWT_ROLE.api ? investorID : user.ID,
    };
    if (stoID && stoID >= 0) {
      query.stoID = stoID;
    }

    return Shares.find(query);
  }
}

export default SharesResolvers;
