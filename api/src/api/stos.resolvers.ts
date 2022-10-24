import { Resolver, Query, Arg, Int, Ctx, Authorized, Mutation } from 'type-graphql';
import { MoreThan } from 'typeorm';

import { Params, Stos } from 'entities';
import { ActiveProperty, DetailProperty, StosMetaKeys } from 'entities/stos';
import { Context, JWT_ROLE } from 'core/context';
import findRelatedStos from 'services/sto/find-related';
import { PARAM } from 'core/envs';
import { PublicSto } from './stos.types';

@Resolver()
class StosResolvers {
  @Authorized()
  @Query(() => Stos, {
    description: 'Get sto data',
    nullable: true,
  })
  findSto(@Arg('ID', () => Int) ID: Int): Promise<Stos | undefined> {
    return Stos.findOne(ID);
  }

  @Query(() => PublicSto, {
    description: 'Get public sto data',
    nullable: true,
  })
  async publicSto(@Arg('stoID', () => Int) stoID: Int): Promise<PublicSto | undefined> {
    const sto = await Stos.findOne(stoID);
    if (!sto) {
      return;
    }
    return {
      ...sto,
      logo: sto.logoUrl(),
      settings: sto.parsedSettings(),
    };
  }

  @Authorized()
  @Query(() => [Stos], {
    description: 'Get all stos',
  })
  findAllSto(): Promise<Stos[] | []> {
    return Stos.find();
  }

  @Query(() => [ActiveProperty], {
    description: 'Get active properties',
  })
  async investorActiveProperties(): Promise<ActiveProperty[]> {
    const areHostNamesEnabled = (
      await Params.findOneOrFail({ param: PARAM.ARE_HOST_NAMES_ENABLED })
    ).intValue;
    const stos = await Stos.find({ isActive: true, ID: MoreThan(0) });

    return Promise.all(
      stos.map(async (sto) => {
        const popularity = await sto.popularity();
        return {
          ID: sto.ID,
          title: sto.title,
          details: sto.details,
          picture: sto.picture(!!areHostNamesEnabled),
          projectCost: sto.projectCost || 0,
          createdAt: sto.createdAt,
          popularity,
          isBuyButtonEnabled: sto.isBuyButtonEnabled,
        };
      }),
    );
  }

  @Authorized()
  @Query(() => DetailProperty, {
    description: 'Get property details',
  })
  async investorDetailProperty(
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<DetailProperty | undefined> {
    const sto = await Stos.findOne({ isActive: true, ID: stoID });
    if (!sto) {
      return;
    }
    const areHostNamesEnabled = (
      await Params.findOneOrFail({ param: PARAM.ARE_HOST_NAMES_ENABLED })
    ).intValue;

    const popularity = await sto.popularity();

    return {
      ID: sto.ID,
      title: sto.title,
      details: sto.details,
      picture: sto.picture(!!areHostNamesEnabled),
      fullDetails: sto.fullDetails,
      images: await sto.images(),
      documents: await sto.documents(),
      projectCost: sto.projectCost || 0,
      createdAt: sto.createdAt,
      popularity,
    };
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [ActiveProperty], {
    description: 'Get investor active STOs',
  })
  investorRelatedSto(@Ctx() { user }: Context): Promise<Stos[] | []> {
    return findRelatedStos(user.ID);
  }

  @Authorized(JWT_ROLE.api)
  @Mutation(() => Boolean, {
    description: 'Enable or disable an STO',
  })
  async setSTOStatus(
    @Arg('stoID', () => Int) stoID: number,
    @Arg('isActive', () => Boolean) isActive: boolean,
  ): Promise<boolean> {
    await Stos.update(stoID, { isActive });
    return true;
  }

  @Authorized(JWT_ROLE.api)
  @Mutation(() => Boolean)
  async addMetadataKey(@Arg('key', () => String) key: string): Promise<boolean> {
    await StosMetaKeys.insert({ key });
    return true;
  }

  @Authorized(JWT_ROLE.api)
  @Mutation(() => Boolean)
  async removeMetadataKey(@Arg('key', () => String) key: string): Promise<boolean> {
    await StosMetaKeys.delete({ key });
    return true;
  }
}

export default StosResolvers;
