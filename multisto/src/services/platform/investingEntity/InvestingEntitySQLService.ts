import { InvestingEntity, InvestingEntityMember } from "../../../Schema";
import IInvestingEntityService from "./IInvestingEntityService";
import { findMany } from "../../../modules/db";

export default class InvestingEntitySQLService
  implements IInvestingEntityService {
  async getInvestingEntitiesForInvestor(
    investorID: number
  ): Promise<InvestingEntity[]> {
    const sql = `select * from investing_entity where investorID = ?`;
    return findMany<InvestingEntity>(sql, [investorID]);
  }

  async getInvestingEntitiesMembers(
    entityID: number
  ): Promise<InvestingEntityMember[]> {
    const sql = `select * from investing_entity_member where entityID = ?`;
    return findMany<InvestingEntityMember>(sql, [entityID]);
  }
}
