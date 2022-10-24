import { Request, Response } from "express";
import common from "../../../modules/common";
import { VerifyInvestorAppliedInvestors } from "../../../services/investorClient/externalKyc/verifyInvestorCom/dto/VerifyInvestorComTypes";

const request = require("request");

async function getInvestorsFromVerifyInvestor(): Promise<
  VerifyInvestorAppliedInvestors[]
> {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://verifyinvestor-staging.herokuapp.com/api/v1/verification_requests?type=all`,
        headers: {
          Authorization: `Token ${
            (global as any).config.VerifyInvestorComApiToken
          }`,
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
      },
      (err: any, httpResponse: any, body: any) => {
        if (!err && httpResponse.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject(body);
        }
      }
    );
  });
}

export default async (req: Request, res: Response) => {
  try {
    const globalObj = global as any;
    const verifyInvestorEnabled =
      globalObj.config.AccreditationEnabled &&
      globalObj.config.VerifyInvestorComApiToken &&
      globalObj.config.verifyInvestorComUrl?.frontendURL.includes("staging") &&
      globalObj.config.verifyInvestorComUrl?.backendURL.includes("staging");
    if (verifyInvestorEnabled) {
      const rawInvestors = await getInvestorsFromVerifyInvestor().catch((e) => {
        throw e;
      });
      const verifyInvestors = [{}];
      rawInvestors.forEach((element) => {
        const verifyInvestor = {
          verifyID: element.id,
          investorID: element.identifier.substr(
            0,
            element.identifier.indexOf("-")
          ),
          stoID: element.identifier.substring(
            element.identifier.indexOf("-") + 1
          ),
        };
        verifyInvestors.push(verifyInvestor);
      });
      res.render("platform/sto/verifyInvestorComTestSuit", {
        verifyInvestorsListError: (req as any).flash(
          "verifyInvestorsListError"
        ),
        partials: common.getPlatformPartials(),
        Data: common.getPlatformCommonPageProperties(req),
        csrfToken: req.csrfToken(),
        verifyInvestors,
      });
    } else {
      res.redirect("/platform/dashboard");
    }
  } catch (error) {
    common.handleError(
      req,
      res,
      `${error} - Error occurred in getVerifyInvestorTestSuitPage`
    );
  }
};
