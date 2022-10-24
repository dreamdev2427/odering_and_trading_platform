import { Resolver, Query, Arg, Int, Authorized, Directive } from 'type-graphql';
import { ShareTypes, ShareHistoricalDatas } from 'entities';

@Resolver()
class ShareTypesResolvers {
  @Authorized()
  @Query(() => [ShareTypes], {
    description: 'Get share types',
  })
  findShareTypes(
    @Arg('stoID', () => Int, { nullable: true }) stoID?: number,
  ): Promise<ShareTypes[]> {
    if (stoID) {
      return ShareTypes.find({ stoID });
    }
    return ShareTypes.find();
  }

  @Authorized()
  @Directive('@deprecated(reason: "Use findShareTypes without stoID argument")')
  @Query(() => [ShareTypes], {
    description: 'Get share types',
  })
  findAllShareTypes(): Promise<ShareTypes[]> {
    return ShareTypes.find();
  }

  @Authorized()
  @Query(() => [ShareHistoricalDatas], {
    description: 'Get share historical values',
  })
  findShareHistoricalValues(
    @Arg('shareTypeID', () => Int) shareTypeID: number,
  ): Promise<ShareHistoricalDatas[]> {
    return ShareHistoricalDatas.find({ shareTypeID });
  }
}

export default ShareTypesResolvers;
