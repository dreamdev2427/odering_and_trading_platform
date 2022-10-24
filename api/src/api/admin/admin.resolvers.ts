import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { In } from 'typeorm';

import Auth from 'services/admin/authentication';
import { fetchUserByID, fetchUsersByEmail } from 'services/admin/fetchUser';
import { Context, JWT_ROLE } from 'core/context';
import { Investor, Log, Stos } from 'entities';
import { ValidationError } from 'apollo-server-core';
import { updateKycStatus } from 'services/investorsto/update';
import { updateParam, updatePlatformConfiguration } from 'services/params/update';
import { getNonKycInvestors } from 'services/admin/getNonKycInvestors';
import InvestorInvitations from 'entities/investor-invitaions';
import { EntityAccreditationService } from 'services/investor/entity-accreditation-service';
import deleteInvestorStos from 'services/investorsto/delete';
import copyInvestorStos from 'services/investorsto/insert';
import { Admin, AdminUser, InvestorKycInput, NonKycInvestor } from './admin.types';

@Resolver()
class AdminResolvers {
  @Mutation(() => String, {
    nullable: true,
    description: 'Mutation for Admin authorization',
  })
  async adminSignIn(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('STO', () => Int, { nullable: true }) STO: number = 0,
    @Arg('platform', { nullable: true }) platform: boolean = false,
  ): Promise<string | null> {
    const auth = new Auth(username, password, platform, STO);

    await auth.getUser();

    auth.validateUser();

    const token = auth.generateJWT();
    if (token) {
      await Log.createLog({
        stoID: STO,
        userID: auth.user.ID,
        activityType: 20,
      });
      return token;
    }

    return null;
  }

  @Query(() => Admin, {
    nullable: true,
    description: 'Mutation for Investor authorization',
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  async adminMe(@Ctx() { user }: Context): Promise<Admin> {
    const adminUser = (await fetchUserByID(user.ID)) as AdminUser;
    const STO = await Stos.findOne(user.stoID);
    if (!adminUser || !STO) throw new Error('User not found');
    return {
      user: adminUser,
      STO,
    };
  }

  @Mutation(() => String, {
    description: 'Mutation for Investor authorization',
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  generateAPIToken(): string {
    return Auth.getToken(0, 0, JWT_ROLE.api);
  }

  @Query(() => Investor, {
    nullable: true,
    description:
      'Mutation for finding Investor accounts by *one* criterion among: ID, email, taxID, govtID.',
  })
  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  async findInvestor(
    @Arg('investorID', () => Int, { nullable: true }) investorID?: number,
    @Arg('email', () => String, { nullable: true }) email?: string,
    @Arg('taxID', () => String, { nullable: true }) taxID?: string,
    @Arg('govtID', () => String, { nullable: true }) govtID?: string,
    @Arg('passportNumber', () => String, { nullable: true }) passportNumber?: string,
  ): Promise<Investor | undefined> {
    if (investorID) return Investor.findOne(investorID);
    if (email) return Investor.findOne({ email });
    if (taxID) return Investor.findOne({ taxID });
    if (govtID) return Investor.findOne({ govtID });
    if (passportNumber) return Investor.findOne({ passportNumber });

    throw new ValidationError(`No search criteria specified.`);
  }

  @Query(() => [Investor], {
    nullable: true,
    description: 'Mutation for finding multiple Investor accounts by Email array',
  })
  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin)
  async findInvestors(@Arg('emails', () => [String]) emails: string[]): Promise<Investor[] | []> {
    return Investor.find({
      where: { email: In(emails) },
    });
  }

  @Query(() => [Investor], {
    nullable: true,
    description: 'Mutation for listing all Investor accounts',
  })
  @Authorized(JWT_ROLE.api)
  async findAllInvestors(): Promise<Investor[] | undefined> {
    return Investor.find();
  }

  @Query(() => [AdminUser], {
    description: 'Mutation for Investor authorization',
  })
  @Authorized(JWT_ROLE.api)
  async findAdmins(@Arg('email', { nullable: true }) email: string): Promise<AdminUser[]> {
    return (await fetchUsersByEmail(email)) as AdminUser[];
  }

  @Mutation(() => Int, {
    description: 'Change Platform Params',
  })
  @Authorized(JWT_ROLE.platformAdmin)
  async setPlatformParam(
    @Arg('param') param: string,
    @Arg('stringValue', () => String, { nullable: true }) stringValue: string,
    @Arg('intValue', () => Int, { nullable: true }) intValue: number,
  ): Promise<number> {
    if (param === 'platformConfiguration') {
      await updatePlatformConfiguration(intValue);
    }
    return updateParam(param, stringValue, intValue);
  }

  @Mutation(() => Boolean, {
    description: 'Mutation for updating Investing Entities Accreditation status',
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  async setEntityAccreditation(
    @Arg('entityID', () => Int) entityID: number,
    @Arg('isAccredited', () => Boolean) isAccredited: boolean,
  ): Promise<boolean> {
    const entitySvc = new EntityAccreditationService();
    await entitySvc.setEntityAccreditation(entityID, isAccredited);
    return true;
  }

  @Mutation(() => Boolean, {
    description: `Mutation for updating Investor's KYC data`,
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  async updateInvestorKyc(
    @Arg('kycData', () => InvestorKycInput) kycData: InvestorKycInput,
  ): Promise<boolean> {
    await updateKycStatus(kycData);
    return true;
  }

  @Query(() => [NonKycInvestor], {
    description: `Gets all the investors that have not finished the KYC process`,
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  async getNonKycInvestors(
    @Arg('stoID', () => Int) stoID: number,
    @Arg('name', () => String, { nullable: true }) name?: string,
  ): Promise<NonKycInvestor[]> {
    return getNonKycInvestors(stoID, name);
  }

  @Query(() => [InvestorInvitations], {
    description: `Gets all the investors invitations`,
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  async getInvestorInvitations(
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<InvestorInvitations[]> {
    return InvestorInvitations.find({ stoID });
  }

  @Mutation(() => Boolean, {
    description: `Mutation for deleting a link between an investor and the project. If the Project ID = 0, the investor will be completly delete from the platform.`,
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  async deleteInvestorSto(
    @Arg('investorID', () => Int) investorID: number,
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<boolean> {
    await deleteInvestorStos(investorID, stoID);
    return true;
  }

  @Mutation(() => Boolean, {
    description: `Mutation that for copying investors from one project to another (this will only copy the investor data and not their investments)`,
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  async copyInvestorsToOtherProjects(
    @Arg('copyStoID', () => Int) copyStoID: number,
    @Arg('pasteStoID', () => Int) pasteStoID: number,
    @Arg('investorIDs', () => [Int]) investorIDs: number[],
  ): Promise<boolean> {
    await copyInvestorStos(investorIDs, copyStoID, pasteStoID);
    return true;
  }
}

export default AdminResolvers;
