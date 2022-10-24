import { Resolver, Query, Arg, Int, Authorized, Mutation } from 'type-graphql';
import { FindConditions } from 'typeorm';

import { JWT_ROLE } from 'core/context';
import { Fee } from 'entities';
import { FEE_BENEFICIARY, COMMISSION_TYPE, FEE_TYPE } from 'entities/fees';
import { FeeInput } from './fee.types';

@Resolver()
class FeeResolvers {
  @Authorized()
  @Query(() => [Fee], {
    description: 'Get all Fees related to a specific STO',
  })
  fetchFees(
    @Arg('stoID', () => Int) stoID: number,
    @Arg('beneficiary', () => FEE_BENEFICIARY, { nullable: true }) beneficiary: FEE_BENEFICIARY,
    @Arg('status', () => COMMISSION_TYPE, { nullable: true }) status: COMMISSION_TYPE,
    @Arg('type', () => FEE_TYPE, { nullable: true }) type: FEE_TYPE,
  ): Promise<Fee[]> {
    const findConditions: FindConditions<Fee> = { stoID };
    if (beneficiary) {
      findConditions.beneficiary = beneficiary;
    }
    if (status) {
      findConditions.status = status;
    }
    if (type) {
      findConditions.type = type;
    }
    return Fee.find(findConditions);
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for creating a Fee',
  })
  async feeCreate(@Arg('data', () => FeeInput) data: FeeInput): Promise<boolean> {
    const fee = Fee.create(data);
    await fee.save();
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for updating a Fee',
  })
  async feeUpdate(
    @Arg('feeID', () => Int) feeID: number,
    @Arg('data', () => FeeInput) data: FeeInput,
  ): Promise<boolean> {
    const fee = await Fee.findOneOrFail({ ID: feeID });
    Fee.merge(fee, data);
    await fee.save();
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing a Fee',
  })
  async feeDelete(@Arg('feeID', () => Int) feeID: number): Promise<boolean> {
    const fee = await Fee.findOneOrFail({ ID: feeID });
    await fee.remove();
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing all Fees',
  })
  async feeDeleteAll(): Promise<boolean> {
    await Fee.delete({});
    return true;
  }
}

export default FeeResolvers;
