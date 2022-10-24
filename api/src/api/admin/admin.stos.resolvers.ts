import { Arg, Authorized, Int, Mutation, Resolver } from 'type-graphql';

import { Stos } from 'entities';
import { StosMetaKeys, StosMetaValues } from 'entities/stos';
import { JWT_ROLE } from 'core/context';
import { UpdateMetadataValueInput } from 'api/admin/admin.stos.types';
import { ValidationError } from 'apollo-server-core';
import { FindConditions } from 'typeorm/find-options/FindConditions';

@Resolver()
class StosResolvers {
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

  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean)
  async addMetadataKey(@Arg('key', () => String) key: string): Promise<boolean> {
    await StosMetaKeys.insert({ key });
    return true;
  }

  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean)
  async removeMetadataKey(@Arg('key', () => String) key: string): Promise<boolean> {
    await StosMetaKeys.delete({ key });
    return true;
  }

  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation updates the meta value or creates if the meta value does not exist',
  })
  async updateMetadataValue(@Arg('data') data: UpdateMetadataValueInput): Promise<boolean> {
    const criteria: FindConditions<StosMetaValues> = { stoID: data.stoID, key: data.key };
    const metakey = await StosMetaKeys.findOne({ key: data.key });
    if (!metakey) {
      throw new ValidationError('meta-key-does-not-exist');
    }
    const metavalue = await StosMetaValues.findOne(criteria);
    if (metavalue) {
      await StosMetaValues.update(criteria, { value: data.value });
      return true;
    }

    await StosMetaValues.insert({ key: data.key, stoID: data.stoID, value: data.value });
    return true;
  }
}

export default StosResolvers;
