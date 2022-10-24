import { Request, Response } from "express";
import { mutation$ } from "../../graphql/fetchers";
import { TransferShareInput } from "../../graphql/inputs";

import common from "../../modules/common";
import getInvestorBuyPropertyAlerts from "../../services/generic/data/InvestorBuyPropertyAlertGQLService";
import { getShareType } from "../../services/investors/dividends/data/SharesGQLService";
import transactionBlockchainTransferShares from "./transaction-blockchain-transfer-shares";

const TRANSFER_SHARES_BETWEEN = mutation$.transferSharesBetween();

const transactionTransferShares = async (req: Request, res: Response) => {
  common.checkUserAuthorizationForModuleSTO(req, res, 3);

  const stoID = Number(req.session.stoid);
  const investorID = Number(req.body.id);
  const shareTypeID = Number(req.body.sid);
  const tokensToTransfer = Number(req.body.tokens);
  const transferSharesOnChain = Number(req.body.transferSharesOnChain) === 1;
  const isSellRequest = req.body.isSellRequest === "true";
  const checkSendEmail = req.body.chkSendEmail ?? "off";
  const sendEmailToInvestor = checkSendEmail === "on" ? 1 : 0;
  const investment = Number(req.body.investment);
  const investmentDescription = req.body.description;

  const alerts = await getInvestorBuyPropertyAlerts(
    req,
    investorID,
    isSellRequest
  );
  const alert = alerts?.find(
    (al) => al.shareTypeID === shareTypeID && al.status === "Pending"
  )?.ID;
  const shareType = await getShareType(req, stoID, shareTypeID);

  const data: TransferShareInput = {
    stoID,
    investorID,
    shareTypeID,
    tokensToTransfer,
    investment,
    investmentDescription,
  };
  if (!shareType?.isBlockchain && !transferSharesOnChain) {
    req.gqlExecute(TRANSFER_SHARES_BETWEEN, {
      variables: {
        from: isSellRequest ? "Investor" : "Company",
        to: isSellRequest ? "Company" : "Investor",
        data,
        alert,
      },
    });
  }

  if (shareType?.isBlockchain) {
    transactionBlockchainTransferShares(
      req,
      res,
      shareType,
      sendEmailToInvestor
    );
  }
  res.redirect(`investorsViewSto?id=${investorID}`);
};
export default transactionTransferShares;
