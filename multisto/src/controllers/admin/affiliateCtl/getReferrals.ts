import { Request, Response } from "express";
import common from "../../../modules/common";
import RemoteAffiliateService from "../../../services/investorClient/affiliate/api/RemoteAffiliateService";
import { loadConfig } from "../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig";
import InvestorReferralOverviewDto from "../../../services/investorClient/affiliate/dto/InvestorReferralOverviewDto";

export interface InvestorReferralVm {
  id: number;
  firstName: string;
  lastName: string;
  referrer: string;
  email: string;
  phone: string;
  eligibleForChange: boolean;
}

export default async (req: Request, res: Response) => {
  const config = loadConfig();

  if (config?.enabled) {
    const csrfToken = req.csrfToken();
    const svc = new RemoteAffiliateService(config);
    const investorsDto = await svc.getAllInvestorsWithActivity();
    const referralNetwork: InvestorReferralVm[] = investorsDto.map(
      (dto: InvestorReferralOverviewDto) => ({
        id: dto.ID,
        firstName: dto.FirstName || "?",
        lastName: dto.LastName || "?",
        referrer: dto.referrerName,
        email: dto.email || "?",
        phone: dto.phone || "?",
        eligibleForChange: !dto.isActive && !dto.directs,
        errorMessage: req.flash("errorMessage"),
        successMessage: req.flash("successMessage"),
      })
    );

    res.render("platform/referralnetwork", {
      csrfToken,
      referralNetwork,
      Data: common.getPlatformCommonPageProperties(req),
      partials: common.getPartials(),
    });
  } else {
    common.handleError(
      req,
      null,
      `Affiliate service not enabled - Error occured in platform admin getReferrals`
    );
  }
};
