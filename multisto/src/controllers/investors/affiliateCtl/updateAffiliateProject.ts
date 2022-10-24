import logger from "../../../logger";
import RemoteAffiliateService from "../../../services/investorClient/affiliate/api/RemoteAffiliateService";
import { loadConfig } from "../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig";

export default async (
  stoId: number,
  title: string,
  affiliatePlanId: number
) => {
  try {
    const config = loadConfig();
    if (config?.enabled) {
      const svc = new RemoteAffiliateService(config);
      const sto = {
        ID: stoId,
        title,
        affiliatePlanId,
        // Not required here
        details: "",
        logo: "",
        ethereumContractAddress: "",
        ethereumWhitelistAddress: "",
        companytype: 0,
        createdAt: new Date(),
      };
      await svc.upsertProject(sto);
      logger.info(
        `affiliateCtl - Successfully updated/inserted sto id:${stoId} in affiliate programme.`
      );
    }
  } catch (error) {
    logger.error(
      `Error when remotely updating new affiliate project with id:${stoId} (updated locally, not updated on remote!):\n${error}`
    );
  }
};
