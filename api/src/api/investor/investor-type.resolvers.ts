import { Resolver, Query } from 'type-graphql';

import StoInvestorType from 'entities/sto-investor-type';

@Resolver()
class InvestorTypeResolver {
  @Query(() => [StoInvestorType], {
    description: 'Get all investor types',
  })
  async getInvestorTypes(): Promise<StoInvestorType[]> {
    return StoInvestorType.find();
  }
}

export default InvestorTypeResolver;
