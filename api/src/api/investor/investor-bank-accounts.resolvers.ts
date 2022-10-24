import { Context, JWT_ROLE } from 'core/context';
import { InvestorBanks } from 'entities';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { InvestorBankAccountInput } from './investor-bank-accounts.types';

@Resolver()
class InvestorBanksResolvers {
  @Authorized(JWT_ROLE.investor)
  @Mutation(() => String, {
    description: 'Mutation for adding new investor bank details',
  })
  async addNewInvestorBankAccount(
    @Ctx() { user }: Context,
    @Arg('data', () => InvestorBankAccountInput) data: InvestorBankAccountInput,
  ): Promise<boolean> {
    const account = InvestorBanks.create(data);
    account.investorID = user.ID;
    await account.save();
    return true;
  }
}

export default InvestorBanksResolvers;
