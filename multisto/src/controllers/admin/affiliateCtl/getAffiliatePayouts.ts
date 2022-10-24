import { Response } from "express";
import logger from "../../../logger";
import common from "../../../modules/common";
import IAffiliateModule from "../../../services/investorClient/affiliate/api/IAffiliateModule";
import RemoteAffiliateService from "../../../services/investorClient/affiliate/api/RemoteAffiliateService";
import { loadConfig } from "../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";
import { AffiliateIncomesOverviewDto } from "../../../services/investorClient/affiliate/dto/AffiliateIncomesOverviewDto";
import { StoViewModel } from "../../investorClient/affiliateCtl/getAffiliateProgram";
import { getCommissionsMode } from "./getAffiliatePayouts/getCommissionsMode";
import { getStoId } from "./getAffiliatePayouts/getStoId";

export default async (req: any, res: Response) => {
  try {
    const config = loadConfig();
    if (config?.enabled) {
      // Service init
      const affSvc: IAffiliateModule = new RemoteAffiliateService(config);
      const stoSvc: IStoService = new StoSqlService();

      // Verify selected STO
      const stoId = await getStoId(req);
      // Verify view mode
      const commissionsMode = getCommissionsMode(req);

      // Logic and data for display
      const stosPromise = stoSvc.getStos(); // List of STOs for dropdown
      const unawardedPromise: Promise<
        AffiliateIncomesOverviewDto[]
      > = affSvc.getIncomesOverview(stoId, 0);
      const awardedPromise: Promise<
        AffiliateIncomesOverviewDto[]
      > = affSvc.getIncomesOverview(stoId, 1);
      const pendingPromise: Promise<
        AffiliateIncomesOverviewDto[]
      > = affSvc.getIncomesOverview(stoId, 2);

      // Await first async round
      const [
        stos,
        incomes,
        awardedIncomes,
        pendingIncomes,
      ] = await Promise.all([
        stosPromise,
        unawardedPromise,
        awardedPromise,
        pendingPromise,
      ]);

      // Format the list of STOs for a simple dropdown display
      const projects: StoViewModel[] = stos.map((sto) => ({
        ID: sto.ID,
        name: sto.title,
        selected: sto.ID === stoId,
      }));
      // STO 0 will equal all projects in this context, so we rename the option
      const sto0 = projects.find((sto) => sto.ID === 0);
      if (sto0) sto0.name = "All Projects";
      const selectedProject = projects.find((sto) => sto.ID === stoId);

      res.render("platform/affiliatepayouts", {
        projects,
        selectedProject,
        incomes,
        awardedIncomes,
        pendingIncomes,
        affiliateCurrencyName: "EUR",
        commissionsMode,
        csrfToken: req.csrfToken(),
        Data: common.getPlatformCommonPageProperties(req),
        partials: common.getPartials(),
        successMessage: req.flash("successMessage"),
        errorMessage: req.flash("errorMessage"),
      });
    } else {
      logger.error(
        `Affiliate income payouts page accessed, but affiliate program not enabled.`
      );
      res.sendStatus(404);
    }
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in affiliate payouts page.");
  }
};
