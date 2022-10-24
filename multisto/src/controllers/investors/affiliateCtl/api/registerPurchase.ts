import { Request, Response } from "express";
import logger from "../../../../logger";
import AffiliatePurchaseDto, {
  validatePurchaseDto,
} from "../../../../services/investorClient/affiliate/dto/AffiliatePurchseDto";
import IAffiliateModule from "../../../../services/investorClient/affiliate/api/IAffiliateModule";
import RemoteAffiliateService from "../../../../services/investorClient/affiliate/api/RemoteAffiliateService";
import { loadConfig } from "../../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig";

export default async (req: Request, res: Response) => {
  try {
    const config = loadConfig();
    if (config?.enabled) {
      const svc: IAffiliateModule = new RemoteAffiliateService(config);
      const purchaseDto: AffiliatePurchaseDto = req.body;
      validatePurchaseDto(purchaseDto);

      await svc.registerPurchase(purchaseDto);
      res.status(200).json({
        status: "true",
        message: `Purchase registered for user:${purchaseDto.user_id} in project:'${purchaseDto.project_id}'`,
      });
    } else {
      res.status(404).send();
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
