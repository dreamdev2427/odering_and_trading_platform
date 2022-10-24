import { Request, Response } from "express";
import common from "../../modules/common";
import logger from "../../logger";
import { mutation$ } from "../../graphql/fetchers";
import { BlockchainSharesTransferTransactionsInput } from "../../graphql/inputs";

const blockchainAPI = require("../../modules/blockchain");
const ethereumAPI = require("../../modules/ethereum");

const CREATE_BLOCKCHAIN_TRANS = mutation$.createBlockchainTransactionTransfer();

const transactionTransferShares = async (
  req: Request,
  res: Response,
  shareType: any,
  sendEmailToInvestor: number
) => {
  const keys = { public: "", private: "" };
  const stoID = Number(req.session.stoid);
  const investorID = Number(req.body.id);
  const adminID = Number(req.session.user?.ID);
  const metaMaskTransaction = Number(req.body.metaMaskTransaction);
  const shareTypeID = Number(req.body.sid);
  const amountToSend = Number(req.body.tokens);
  const investmentAmount = Number(req.body.investment);
  const investmentDetails = req.body.description;
  const buyPropertyAlertID = req.body.buyPropertyAlertID ?? 0;
  const reduceBalance = buyPropertyAlertID !== 0 ? 1 : 0;
  const toAddress = req.body.publicAddress;

  if (
    shareType?.walletCustodayType === 0 &&
    common.isEthereumBasedProtocolID(shareType.blockchainProtocol)
  ) {
    if (metaMaskTransaction === 0) {
      const decryptKeys = ethereumAPI.decryptKey(
        JSON.parse(req.body.filecontents),
        req.body.password
      );
      if (decryptKeys === "error") {
        req.flash(
          "errorMessage",
          "Private key cannot be authenticated. No shares transferred"
        );
        res.redirect(`investorsViewSto?id=${investorID}`);
        return;
      }
      keys.private = decryptKeys.private;
      keys.public = decryptKeys.public;
    }
  }

  const data: BlockchainSharesTransferTransactionsInput = {
    toAddress,
    stoID,
    adminID,
    investorID,
    shareTypeID,
    amountToSend,
    investmentDetails,
    investmentAmount,
    reduceInvestorBalance: 0,
    status: 1,
    recordDate: new Date().toISOString().substring(0, 10),
  };

  const blockchainTransactionID = await req.gqlExecute(
    CREATE_BLOCKCHAIN_TRANS,
    {
      variables: {
        data,
      },
    }
  );
  try {
    blockchainAPI
      .sendTokens(
        1,
        keys.private,
        req.body.publicAddress,
        amountToSend,
        stoID,
        investorID,
        adminID,
        shareTypeID,
        investmentAmount,
        investmentDetails,
        buyPropertyAlertID,
        reduceBalance,
        sendEmailToInvestor,
        blockchainTransactionID,
        metaMaskTransaction,
        req.body.blockchainTransactionID
      )
      .catch((error: any) => {
        req.flash("errorMessage", "Error Occured Sending Shares in blockchain");
        logger.error(
          `Error Occured Sending Shares in blockchain - ${error.message}`
        );
        res.redirect(`investorsViewSto?id=${investorID}`);
      });
  } catch (error: any) {
    common.handleError(
      req,
      res,
      `${error.message}Error in sendtokenstoinvestorblockchaincall`
    );
  }
};

export default transactionTransferShares;
