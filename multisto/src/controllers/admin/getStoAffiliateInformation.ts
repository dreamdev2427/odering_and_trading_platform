import logger from "../../logger";
import SharesSqlService from "../../services/investorClient/affiliate/data/SharesSqlService";
import AffiliatePlanDto from "../../services/investorClient/affiliate/dto/AffiliatePlanDto";
import IAffiliateModule from "../../services/investorClient/affiliate/api/IAffiliateModule";
import RemoteAffiliateService from "../../services/investorClient/affiliate/api/RemoteAffiliateService";
import { loadConfig } from "../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig";

export interface AffiliatePlanViewModel extends AffiliatePlanDto {
  selected?: boolean;
}

export interface ShareTypeViewModel {
  id: number;
  name: string;
  stoId: number;
  selected?: boolean;
}

export interface StoAffiliateViewModel {
  affiliateEnabled: boolean;
  affiliatePlans: AffiliatePlanViewModel[];
  shareTypes: ShareTypeViewModel[];
}

const getPlans = async (
  affSvc: IAffiliateModule,
  affiliatePlanId?: number
): Promise<AffiliatePlanViewModel[]> => {
  let affiliatePlans: AffiliatePlanViewModel[] = [];
  affiliatePlans = await affSvc.fetchPlans();

  if (typeof affiliatePlanId !== "undefined") {
    const selectedPlan = affiliatePlans.find(
      (p) => p.affiliate_plan_id === affiliatePlanId
    );
    if (selectedPlan) {
      selectedPlan.selected = true;
    }
  }
  return affiliatePlans;
};

const getShares = async (
  stoId?: number,
  affiliateShareTypeId?: number
): Promise<ShareTypeViewModel[]> => {
  let shareTypes: ShareTypeViewModel[] = [];

  if (typeof stoId !== "undefined") {
    const shareSvc = new SharesSqlService();
    const shareTypesRaw = await shareSvc.getShareTypesForSto(stoId);
    shareTypes = shareTypesRaw.map(
      (row): ShareTypeViewModel => ({
        id: row.ID,
        name: row.title,
        stoId: row.stoid,
      })
    );

    if (typeof affiliateShareTypeId !== "undefined") {
      const selectedType = shareTypes.find(
        (s) => s.id === affiliateShareTypeId
      );
      if (selectedType) {
        selectedType.selected = true;
      }
    }
  }
  return shareTypes;
};

/**
 * Returns the relevant affiliate plan and sharetype data so that they can be selected for a project.
 */
export default async (
  stoId?: number,
  affiliatePlanId?: number,
  affiliateShareTypeId?: number
): Promise<StoAffiliateViewModel> => {
  const vm: StoAffiliateViewModel = {
    affiliatePlans: [],
    shareTypes: [],
    affiliateEnabled: false,
  };

  try {
    const affiliateConfig = loadConfig();
    if (affiliateConfig?.enabled) {
      vm.affiliateEnabled = true;
      const affSvc: IAffiliateModule = new RemoteAffiliateService(
        affiliateConfig
      );
      vm.affiliatePlans = await getPlans(affSvc, affiliatePlanId);
      vm.shareTypes = await getShares(stoId, affiliateShareTypeId);
    }
  } catch (error) {
    logger.error(error as Error);
  }

  return vm;
};
