import { Resolver, Query, Mutation, Arg, Int, Authorized, Ctx } from 'type-graphql';

import createInbox from 'services/inbox/create';
import { Inbox } from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import { InboxInput } from './inbox.types';
import { IsNull, Not } from 'typeorm';

@Resolver()
class InboxResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => Inbox, {
    description: 'Get an investors inbox',
    nullable: true,
  })
  investorInbox(
    @Ctx() { user }: Context,
    @Arg('ID', () => Int) ID: number,
  ): Promise<Inbox | undefined> {
    return Inbox.findOne({ ID, investorID: user.ID });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [Inbox], {
    description: 'Get all investors inboxes',
    nullable: true,
  })
  investorInboxes(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int, {description: "passing a negative value will fetch all records for all stos"}) stoID: number,
    @Arg('offset', () => Int, { nullable: true }) offset = 0,
    @Arg('limit', () => Int, { nullable: true }) limit = 70,
  ): Promise<Inbox[] | []> {
    return Inbox.find({
      where: {
        stoID: stoID < 0 ? Not(IsNull()) : stoID,
        investorID: user.ID
      },
      skip: offset,
      take: limit,
      order: {
        date: 'DESC',
      },
    });
  }

  @Mutation(() => Int, {
    description: 'Mutation for create inbox',
  })
  investorInboxCreate(
    @Ctx() { user }: Context,
    @Arg('data', () => InboxInput) data: InboxInput,
  ): Promise<number> {
    return createInbox(user.ID, data);
  }
}

export default InboxResolvers;
