import getAffiliateNetwork from "./getAffiliateNetwork";
import getInvestmentsForIds from "./getInvestmentsForIds";
import patchCommissionStatusForIds from "./patchCommissionStatusForIds";
import getConfig from "./getConfig";
import debugAuth from "./common/debugAuth";
import getResource from "./getResource";
import patchInvestorSto from "./patchInvestorSto";

export default {
  getAffiliateNetwork,
  getInvestmentsForIds,
  patchCommissionStatusForIds,
  getConfig,
  auth: debugAuth,
  getResource,
  patchInvestorSto,
};
