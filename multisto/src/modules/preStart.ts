/* eslint-disable no-console */
import * as priceOracle from "../services/platform/price-oracle/job";
import startAffiliate from "../controllers/server/startAffiliate";
import logger from "../logger";
import * as emailTextsController from "../services/platform/emails/controllers/EmailTexts.controller";
/*
import dailyAccreditationExpiryCheckCronJob
    from "../services/investorClient/externalKyc/verifyInvestorCom/dailyAccreditationExpiryCheckCronJob";
*/

/** A hook executed before server start */
export default async () => {
  const glb = global as any;
  try {
    console.log("-> Pre-start hook invoked");
    logger.info("-> Pre-start hook invoked");
    await startAffiliate();
    console.log("✔ affiliate");
    await priceOracle.startPriceOracles(glb.config.priceOracles ?? []);
    console.log("✔ price oracles");
    // dailyAccreditationExpiryCheckCronJob.start();
    await emailTextsController.getEmailTexts(0);
    console.log("✔ email texts");
    console.log("<- Pre-start hook complete");
    logger.info("<- Pre-start hook complete");
  } catch (error) {
    logger.error(`Error in postStart hook:\n${error}`);
    console.log(`Error in postStart hook:\n${error}`);
  }
};
