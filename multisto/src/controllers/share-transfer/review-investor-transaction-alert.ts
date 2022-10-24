import { Request, Response } from "express";
import * as math from "mathjs";
import common from "../../modules/common";
import getInvestorBuyPropertyAlerts from "../../services/generic/data/InvestorBuyPropertyAlertGQLService";
import {
  getInvestor,
  getInvestorSto,
} from "../../services/investorClient/investor/data/InvestorGQLService";
import { getShareType } from "../../services/investors/dividends/data/SharesGQLService";
import { findSharesWallets } from "../../services/investors/dividends/data/SharesWalletGQLService";
import WalletService from "../../services/investors/payments/wallet/WalletService";

const refreshBlockchain = require("../../modules/refreshBlockchain");

const reviewInvestorTransactionAlert = async (req: Request, res: Response) => {
  common.checkUserAuthorizationForModuleSTO(req, res, 3);
  const globalObj = global as any;

  const adminID = Number(req.session.user?.ID);
  const investorID = Number(req.query.id);
  const stoID = Number(req.session.stoid);
  const shareID = Number(req.query.sid);
  const isSellRequest = Number(req.query.sellReq) === 1;
  const buyAlertID = Number(req.query.tid);

  const walletService = new WalletService();

  const investorRecord = await getInvestor(req, investorID);
  const investorSto = await getInvestorSto(req, stoID, investorID);
  const shareType = await getShareType(req, stoID, shareID);
  const buyAlert = await getInvestorBuyPropertyAlerts(
    req,
    investorID,
    isSellRequest
  );

  const buyPropertyAlert = {
    ...buyAlert?.find(
      (alert) => alert.shareTypeID === shareID && alert.status === "Pending"
    ),
  };
  const modifyShareType = { ...shareType };
  const date = new Date();

  let companyWalletBalance = 0;
  let investorWallet;
  let buyPropertyAlertShow = 0;
  let investorWalletBalance = 0;

  if (
    investorRecord?.ID !== investorSto?.investorID ||
    !investorRecord ||
    !investorSto ||
    !shareType
  ) {
    common.handleError(
      req,
      res,
      `Admin ${adminID} is trying to send tokens to investor ${investorID} which does not belong to this STO.
      Error in send-token-to-investor, check if investor records and sto exists`
    );
  }

  modifyShareType.premiumValue = shareType?.premiumValue ?? 0;
  const currencyID = buyPropertyAlert?.fromCurrencyID ?? shareType?.currencyID;

  buyPropertyAlert.purchasePriceOffered =
    buyPropertyAlert?.purchasePriceOffered ??
    math.round(
      math.multiply(
        modifyShareType.premiumValue,
        buyPropertyAlert?.shares ?? 0
      ),
      globalObj.config.BlockchainBalanceInFractions
    );

  if (buyAlertID) {
    buyPropertyAlertShow = 1;
    investorWalletBalance = await walletService.getInvestorBalance(
      investorID,
      stoID,
      currencyID ?? 1,
      globalObj.config.investorInternalWalletProjectSpecific
    );
  }

  if (shareType?.isBlockchain) {
    investorWallet = findSharesWallets(req, shareID, stoID, false);
    await refreshBlockchain
      .updateBlockchainCompanyTotalBalances(
        shareType.blockchainProtocol,
        shareType.ethereumBlockchainPublicAddress,
        shareType.ethereumContractAddress,
        shareID,
        stoID
      )
      .then(
        (data: { companyBalanceInBlockchain: any; companyBalance: any }) => {
          companyWalletBalance = data.companyBalance;
        }
      );
  } else {
    investorWallet = [];
  }

  // Deduct number of shares admin has setup not available for selling
  if ((shareType?.reduceSharesForPurchase ?? 0) > 0) {
    companyWalletBalance = Number(
      math.subtract(
        companyWalletBalance,
        shareType?.reduceSharesForPurchase ?? 0
      )
    );
    modifyShareType.companyShares = Number(
      math.subtract(
        shareType?.companyShares ?? 0,
        shareType?.reduceSharesForPurchase ?? 0
      )
    );
  }

  res.render("admin/reviewInvestorTransaction", {
    Data: common.getCommonPageProperties(req),
    sid: shareID,
    defaultDate: `${common.getMonthName(
      date.getMonth()
    )} ${date.getDate()} ${date.getFullYear()}`,
    id: investorID,
    smartContractAddress: shareType?.ethereumContractAddress,
    buyPropertyAlert,
    buyPropertyAlertShow,
    investorCurrencyBalance: { amount: investorWalletBalance, currencyID },
    isSellRequest,
    partials: common.getPartials(),
    investorRec: investorRecord,
    csrfToken: req.csrfToken(),
    shareType: modifyShareType,
    investorWallet,
    companyWalletBalance,
  });
};

export default reviewInvestorTransactionAlert;
