import { Request, Response } from "express";
import logger from "../../../logger";
import common from "../../../modules/common";
import { findOne } from "../../../modules/db";
import IAffiliateModule from "../../../services/investorClient/affiliate/api/IAffiliateModule";
import RemoteAffiliateService from "../../../services/investorClient/affiliate/api/RemoteAffiliateService";
import { loadConfig } from "../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig";
import AffiliateInvestorSqlService from "../../../services/investorClient/affiliate/data/AffiliateInvestorSqlService";
import IAffiliateInvestorService from "../../../services/investorClient/affiliate/data/IAffiliateInvestorService";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";
import getIncomes from "./getAffiliateProgram/getIncomes";
import getNetworkData from "./getAffiliateProgram/getNetworkData";
import { getStoId } from "./getAffiliateProgram/getStoId";
import getKickOffChallenge from "./getAffiliateProgram/getKickOffChallenge";
import { Stos } from "../../../Schema";

export interface StoViewModel {
  ID: number;
  name: string;
  selected: boolean;
}
/**
 * Renders the affiliate page
 */
export default async (req: Request, res: Response) => {
  try {
    const config = loadConfig();
    if (config?.dashboard?.isDisabled) {
      res.render("investors/affiliate/disabled", {
        partials: common.getInvestorDashboardPartials(),
        Data: await common.getCommonInvestorDashboardPageProperties(req, res),
        message: config?.dashboard?.disabledMessage,
      });
    } else if (config?.enabled) {
      // Session data and logic
      const investorId = req.session?.user?.ID as number;
      const stoId = await getStoId(req);

      // Services initialization
      const stoSvc: IStoService = new StoSqlService();
      const investorSvc: IAffiliateInvestorService = new AffiliateInvestorSqlService();
      const affiliateSvc: IAffiliateModule = new RemoteAffiliateService(config);

      // Logic and data for display
      const networkDataPromise = getNetworkData(investorId, stoId);
      const totalIncomesPromise = getIncomes(investorId, stoId);
      const referrerNamePromise = investorSvc.getReferrerName(investorId);
      const isEligiblePromise = investorSvc.getKycCurrentStatus(investorId);
      const linkPromise = (
        await findOne<Stos>(`select stolinkfull from stos where id = 0`)
      )?.stolinkfull;
      const stosPromise = stoSvc.getStos();
      const commissionsHistoryPromise = affiliateSvc.getAllInvestorIncomes(
        investorId,
        stoId
      );
      // Await first async round
      const [
        networkData,
        totalIncomes,
        referrerName,
        isEligible,
        link,
        stos,
        commissionsHistory,
      ] = await Promise.all([
        // Note all are independent
        networkDataPromise,
        totalIncomesPromise,
        referrerNamePromise,
        isEligiblePromise,
        linkPromise,
        stosPromise,
        commissionsHistoryPromise,
      ]);

      // Await second async round
      const kickOffPromise = config.kickOffChallenge?.enabled
        ? getKickOffChallenge(
            investorId,
            stoId,
            networkData.fullNetwork,
            config
          )
        : undefined;

      const [kickOffData] = await Promise.all([kickOffPromise]);
      // console.log(JSON.stringify(kickOffData));

      const projects: StoViewModel[] = stos.map((sto) => ({
        ID: sto.ID,
        name: sto.title,
        selected: sto.ID === stoId,
      }));

      res.render("investors/affiliate/index", {
        partials: common.getInvestorDashboardPartials(),
        Data: await common.getCommonInvestorDashboardPageProperties(req, res),
        link,
        referrerName,
        projects,
        isEligible,
        network: networkData.network,
        networkTree: JSON.stringify(networkData.networkTree),
        networkInvestors: networkData.networkInvestors,
        stoInvestors: networkData.stoInvestors,
        currencyEarnings: +totalIncomes.currencyEarnings.toString(),
        tokenEarnings: +totalIncomes.tokenEarnings.toString(),
        rentalIncome: totalIncomes.rentalIncome,
        affiliateCurrencyName: "EUR", // TODO: Fix hardcoded currency name
        commissionsHistory,
        kickOffData,
      });
    } else {
      logger.error(
        "affiliateCtl: Trying to GET affiliate program, but it's not enabled."
      );
      res.render("error", {
        message: req.flash("message"),
        partials: common.getPartials(),
      });
    }
  } catch (error) {
    logger.error(`${error}`);
    res.render("error", {
      message: req.flash("message"),
      partials: common.getPartials(),
    });
  }
};
