import { InvestingEntity, InvestingEntityMember } from "../../../Schema";

export default interface IInvestingEntityService {
    getInvestingEntitiesForInvestor(investorId: number): Promise<InvestingEntity[]>;
    getInvestingEntitiesMembers(entityID: number): Promise<InvestingEntityMember[]>;
}
