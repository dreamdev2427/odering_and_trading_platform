import {
  BlockchainSharesTransferTransactions,
  InvestorBuyPropertyAlert,
  Stos,
} from '../../entities';
import ShareTransferService from '../shares/ShareTransferService';

const automaticPurchaseAfterAllDocumentsSigned = async (
  alert: InvestorBuyPropertyAlert,
): Promise<void> => {
  if (alert.publicKey === '-') {
    const data = {
      ID: alert.ID,
      stoID: alert.stoID,
      investorID: alert.investorID,
      shareTypeID: alert.shareTypeID,
      tokensToTransfer: alert.shares,
    };
    const service = new ShareTransferService({ adminID: alert.investorID, ...data });
    try {
      await service.transferSharesBetween('company', 'investor');
    } catch (e) {
      console.error(e);
      throw e;
    }
  } else {
    const sto = await Stos.findOneOrFail(alert.stoID);
    const service = BlockchainSharesTransferTransactions.create();

    service.hostname = sto.stolink;
    service.toAddress = alert.publicKey;
    service.stoID = sto.ID;
    service.adminID = -1;
    service.investorID = alert.investorID;
    service.shareTypeID = alert.shareTypeID;
    service.amountToSend = alert.shares;
    service.investmentAmount = alert.purchasePriceOffered;
    service.recordDate = new Date();
    service.reduceInvestorBalance = 0;
    service.status = 0;
    alert.status = 2;
    await alert.shareType;
    await alert.save();
    await service.save();
  }
};

export { automaticPurchaseAfterAllDocumentsSigned };
