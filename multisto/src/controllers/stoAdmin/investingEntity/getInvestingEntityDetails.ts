import logger from "../../../logger";
import { InvestingEntity, InvestingEntityMember } from "../../../Schema";
import IInvestingEntityService from "../../../services/platform/investingEntity/IInvestingEntityService";
import InvestingEntitySQLService from "../../../services/platform/investingEntity/InvestingEntitySQLService";

export interface InvestingEntityViewModel extends InvestingEntity {
  members: InvestingEntityMember[];
  membersCount: number;
}

/**
 * Get investing entity details, including entity members
 */
const getInvestingEntityDetails = async (
  investorID: number
): Promise<InvestingEntityViewModel[]> => {
  try {
    const entityService: IInvestingEntityService =
      new InvestingEntitySQLService();
    const entities = await entityService.getInvestingEntitiesForInvestor(
      investorID
    );
    return await Promise.all(
      entities.map(async (e: InvestingEntity) => {
        const members: InvestingEntityMember[] =
          await entityService.getInvestingEntitiesMembers(e.ID);
        return {
          ...e,
          members,
          membersCount: members.length,
        };
      })
    );
  } catch (error) {
    logger.error(`${error} - Error occurred in getInvestingEntityDetails`);
  }
  return Promise.resolve([]);
};

export default getInvestingEntityDetails;
