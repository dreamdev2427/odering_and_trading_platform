import { Request, Response } from "express";
import logger from "../../../../logger";
import AffiliatePlanDto from "../../../../services/investorClient/affiliate/dto/AffiliatePlanDto";
import IAffiliateModule from "../../../../services/investorClient/affiliate/api/IAffiliateModule";
import RemoteAffiliateService from "../../../../services/investorClient/affiliate/api/RemoteAffiliateService";
import { loadConfig } from "../../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig";

/**
 * For testing purposes
 */
export default async (req: Request, res: Response) => {
  try {
    const config = loadConfig();
    if (config?.enabled) {
      const svc: IAffiliateModule = new RemoteAffiliateService(config);
      const plan: AffiliatePlanDto = req.body; // TODO: Do type validation
      await svc.registerPlan(plan);
      res.status(200).json({
        status: "true",
        message: `Plan created [${plan.affiliate_plan_id}]:'${plan.affiliate_plan_name}'`,
      });
    } else {
      res.status(404).send();
      logger.error(
        `IP:${req.ip} has requested to use the affiliate module via API, while it is disabled.\nRequest denied for registerAffiliatePlan: ${req.body}`
      );
    }
  } catch (error) {
    logger.error(error as Error);
    // On generic error:
    res.status(500).json({
      status: "false",
      message: "Internal error",
    });
  }
};
