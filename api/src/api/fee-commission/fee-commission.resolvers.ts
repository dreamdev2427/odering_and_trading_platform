import { Resolver, Query, Arg, Int, Authorized, Mutation, Ctx } from 'type-graphql';
import { FindConditions } from 'typeorm';

import { Context, JWT_ROLE } from 'core/context';
import { FeeCommission } from 'entities';
import { BROKER_TYPE, PAYMENT_STATUS } from 'entities/fee-commissions';
import { getSum } from 'services/commission/sum';
import { FeeCommissionInput } from './fee-commission.types';

@Resolver()
class FeeCommissionResolvers {
  @Authorized(JWT_ROLE.platformAdmin)
  @Query(() => FeeCommission, {
    description: 'Get Fee Commission by ID',
  })
  fetchFeeCommissionsByID(
    @Arg('feeCommissionID', () => Int) feeCommissionID: number,
  ): Promise<FeeCommission | undefined> {
    return FeeCommission.findOne({ ID: feeCommissionID });
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Query(() => [FeeCommission], {
    description: 'Get all Fee Commissions',
  })
  fetchFeeCommissions(
    @Arg('feeID', () => Int, { nullable: true }) feeID: number,
    @Arg('transactionID', () => Int, { nullable: true }) transactionID: number,
    @Arg('beneficiaryID', () => Int, { nullable: true }) beneficiaryID: number,
    @Arg('beneficiaryType', () => BROKER_TYPE, { nullable: true }) beneficiaryType: BROKER_TYPE,
    @Arg('status', () => PAYMENT_STATUS, { nullable: true }) status: PAYMENT_STATUS,
  ): Promise<FeeCommission[]> {
    const findConditions: FindConditions<FeeCommission> = {};
    if (feeID) {
      findConditions.feeID = feeID;
    }
    if (transactionID) {
      findConditions.transactionID = transactionID;
    }
    if (beneficiaryID) {
      findConditions.beneficiaryID = beneficiaryID;
    }
    if (beneficiaryType) {
      findConditions.beneficiaryType = beneficiaryType;
    }
    if (status) {
      findConditions.status = status;
    }
    return FeeCommission.find(findConditions);
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Query(() => Number, {
    description: 'Get Sum of Fee Commissions by Beneficiary ID and Beneficiary Type',
  })
  async getCommissionsSum(
    @Arg('beneficiaryID', () => Int) beneficiaryID: number,
    @Arg('beneficiaryType', () => BROKER_TYPE, { nullable: true })
    beneficiaryType: BROKER_TYPE,
    @Arg('status', () => PAYMENT_STATUS, { nullable: true })
    status: PAYMENT_STATUS = PAYMENT_STATUS.Completed,
  ): Promise<number> {
    const commissionSum = await getSum(beneficiaryID, beneficiaryType, status);
    return commissionSum;
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => Number, {
    description: `Query for Getting the Sum of Investor's Collected Commissions`,
  })
  async getInvestorCommissionsSum(
    @Ctx() { user }: Context,
    @Arg('status', () => PAYMENT_STATUS, { nullable: true })
    status: PAYMENT_STATUS = PAYMENT_STATUS.Pending,
  ): Promise<number> {
    const commissionSum = await getSum(user.ID, BROKER_TYPE.Investor, status);
    return commissionSum;
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for updating a Fee Commission',
  })
  async feeCommissionUpdate(
    @Arg('feeCommissionID', () => Int) feeCommissionID: number,
    @Arg('data', () => FeeCommissionInput) data: FeeCommissionInput,
  ): Promise<boolean> {
    const feeCommission = await FeeCommission.findOneOrFail({ ID: feeCommissionID });
    FeeCommission.merge(feeCommission, data);
    await feeCommission.save();
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing a Fee Commission',
  })
  async feeCommissionDelete(
    @Arg('feeCommissionID', () => Int) feeCommissionID: number,
  ): Promise<boolean> {
    const feeCommission = await FeeCommission.findOneOrFail({ ID: feeCommissionID });
    await feeCommission.remove();
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing all Fee Commissions',
  })
  async feeCommissionDeleteAll(): Promise<boolean> {
    await FeeCommission.delete({});
    return true;
  }
}

export default FeeCommissionResolvers;
