import { Resolver, Query, Arg, Authorized, Int, Mutation, Ctx } from 'type-graphql';
import { ValidationError } from 'apollo-server-core';

import { Context, JWT_ROLE } from 'core/context';
import { InvestingEntity, InvestingEntityMember, EntityTypes, Stos } from 'entities';
import Email from 'services/email';
import { ACCREDITATION_STATUS } from 'entities/investing-entity';
import { InvestingEntityInput, InvestingEntityMemberInput } from './investing-entity.types';

@Resolver()
class InvestingEntityResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => [InvestingEntity], {
    description: 'Get all investors Investing Entities',
  })
  investorInvestingEntities(@Ctx() { user }: Context): Promise<InvestingEntity[]> {
    return InvestingEntity.find({
      where: { investorID: user.ID },
    });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => InvestingEntity, {
    description: 'Get investors Investing Entity',
  })
  investorInvestingEntity(
    @Ctx() { user }: Context,
    @Arg('entityID', () => Int) entityID: number,
  ): Promise<InvestingEntity | undefined> {
    return InvestingEntity.findOne({ investorID: user.ID, ID: entityID });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [EntityTypes], {
    description: 'Get All Investing Entity Types',
  })
  investorInvestingEntityTypes(): Promise<EntityTypes[]> {
    return EntityTypes.find();
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for creating Investing Entities',
  })
  async investorInvestingEntityCreate(
    @Ctx() { user }: Context,
    @Arg('data', () => InvestingEntityInput) data: InvestingEntityInput,
  ): Promise<boolean> {
    const entity = InvestingEntity.create(data);
    entity.investorID = user.ID;
    if (data.accredited) {
      const sto = await Stos.findOneOrFail(user.stoID);
      entity.isApprovedByAdmin = ACCREDITATION_STATUS.PENDING;
      const mailer = new Email(sto);
      await mailer.newAccreditionEmailForAdmin(user.ID);
      await entity.save();
      return true;
    }
    entity.isApprovedByAdmin = ACCREDITATION_STATUS.APPROVED;

    await entity.save();
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for updating Investing Entities',
  })
  async investorInvestingEntityUpdate(
    @Ctx() { user }: Context,
    @Arg('entityID', () => Int) entityID: number,
    @Arg('data', () => InvestingEntityInput) data: InvestingEntityInput,
  ): Promise<boolean> {
    const entity = await InvestingEntity.findOne({ investorID: user.ID, ID: entityID });
    await entity?.type;
    if (!entity) {
      throw new ValidationError('Investing Entity not found');
    }

    InvestingEntity.merge(entity, data);
    await entity.save();
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for remove Investing Entities',
  })
  async investorInvestingEntityRemove(
    @Ctx() { user }: Context,
    @Arg('entityID', () => Int) entityID: number,
  ): Promise<boolean> {
    const entity = await InvestingEntity.findOne({ investorID: user.ID, ID: entityID });
    if (!entity) {
      throw new ValidationError('Investing Entity not found');
    }
    await entity.remove();
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for creating Investing Entity member',
  })
  async investorInvestingEntityMemberCreate(
    @Ctx() { user }: Context,
    @Arg('data', () => InvestingEntityMemberInput) data: InvestingEntityMemberInput,
  ): Promise<boolean> {
    const entity = await InvestingEntity.findOne({ ID: data.entityID, investorID: user.ID });
    if (!entity) {
      throw new ValidationError('bad-entity');
    }

    const member = InvestingEntityMember.create(data);
    member.investorID = user.ID;

    await member.save();
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for updating Investing Entity members',
  })
  async investorInvestingEntityMemberUpdate(
    @Ctx() { user }: Context,
    @Arg('memberID', () => Int) memberID: number,
    @Arg('data', () => InvestingEntityMemberInput) data: InvestingEntityMemberInput,
  ): Promise<boolean> {
    const member = await InvestingEntityMember.findOne({ investorID: user.ID, ID: memberID });
    if (!member) {
      throw new ValidationError('Investing Entity Member not found');
    }

    InvestingEntityMember.merge(member, data);
    await member.save();
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for remove Investing Entity members',
  })
  async investorInvestingEntityMemberRemove(
    @Ctx() { user }: Context,
    @Arg('memberID', () => Int) memberID: number,
  ): Promise<boolean> {
    const member = await InvestingEntityMember.findOne({ investorID: user.ID, ID: memberID });
    if (!member) {
      throw new ValidationError('Investing Entity Member not found');
    }

    await member.remove();
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Query(() => [InvestingEntity], {
    description: 'Query for fetching all entities with waiting status',
  })
  async getAllUnConfirmedEntitiesforStoAdmin(): Promise<InvestingEntity[]> {
    const entities = await InvestingEntity.find({
      where: { isApprovedByAdmin: ACCREDITATION_STATUS.PENDING },
    });

    return entities;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Mutation(() => [InvestingEntity], {
    description: 'Mutation for setting status of Accreditation entity on sto admin',
  })
  async setStatusOfAccreditationOnStoAdmin(
    @Arg('entityID', () => Int) entityID: number,
    @Arg('status', () => ACCREDITATION_STATUS)
    status: ACCREDITATION_STATUS.APPROVED | ACCREDITATION_STATUS.DECLINED,
  ): Promise<[]> {
    if (status === ACCREDITATION_STATUS.DECLINED) {
      await InvestingEntity.update(
        { ID: entityID },
        { isApprovedByAdmin: status, accredited: false },
      );
      const sto = await Stos.findOneOrFail(0);
      const entity = await InvestingEntity.findOneOrFail({ ID: entityID });
      const mailer = new Email(sto);
      await mailer.sendAccreditionStatusInfotoInvestor(entity.investorID);
      return [];
    }
    await InvestingEntity.update({ ID: entityID }, { isApprovedByAdmin: status });
    const sto = await Stos.findOneOrFail(0);
    const entity = await InvestingEntity.findOneOrFail({ ID: entityID });
    const mailer = new Email(sto);
    await mailer.sendAccreditionStatusInfotoInvestor(entity.investorID);
    return [];
  }
}

export default InvestingEntityResolvers;
