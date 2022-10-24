import { InvestorBuyPropertyAlert, InvestorInvoices } from 'entities';
import { INVOICE_STATUS_TYPE } from 'entities/investor-invoices';

const createInvoiceFromPurchase: (
  purchase: InvestorBuyPropertyAlert,
  purchaseID: number,
  investorID: number,
) => Promise<InvestorInvoices> = async (purchase, purchaseID, investorID) => {
  const invoice = InvestorInvoices.create({
    investorID,
    shareTypeID: purchase.shareTypeID,
    stoID: purchase.stoID,
    buyAlertID: purchaseID,
    paymentChannelID: (await purchase.shareType).channelIDForAutoPayments,
    shares: purchase.shares,
    status: INVOICE_STATUS_TYPE.Unpaid,
    amountToPay: purchase.purchasePriceOffered,
    isBlockchain: purchase.isBlockchain,
    dateCreated: new Date(),
    invoiceDescription: ' ',
    investorWallet: purchase.publicKey,
  });
  await invoice.save();
  return invoice;
};

export { createInvoiceFromPurchase };
