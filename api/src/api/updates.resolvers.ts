import { Resolver, Query, Arg, Int, Authorized } from 'type-graphql';

import { Updates } from 'entities';
import { IsNull, Not } from 'typeorm';

@Resolver()
class UpdatesResolvers {
  @Authorized()
  @Query(() => Updates, {
    description: 'Get a one update',
    nullable: true,
  })
  investorUpdate(@Arg('ID', () => Int) ID: number): Promise<Updates | undefined> {
    return Updates.findOne(ID);
  }

  @Authorized()
  @Query(() => [Updates], {
    description: 'Get all updates from sto',
    nullable: true,
  })
  investorUpdates(
    @Arg('stoID', () => Int, {description: "passing a negative value will fetch all records for all stos"}) stoID: number,
    @Arg('offset', () => Int, { nullable: true }) offset = 0,
    @Arg('limit', () => Int, { nullable: true }) limit = 5,
  ): Promise<Updates[] | []> {
    return Updates.find({
      where: { stoID: stoID < 0 ? Not(IsNull()) : stoID },
      skip: offset,
      take: limit,
      order: {
        ID: 'DESC',
      },
    });
  }
}

export default UpdatesResolvers;
