import { INTERNAL_WALLET_MODE } from 'core/envs';
import { InvestorBalancesInCompanyAccounts, InvestorDepositReceivedAlert, Log } from 'entities';
import InvestorInvoices, { INVOICE_STATUS_TYPE } from 'entities/investor-invoices';

const automaticDepositService = async (
  investorId: number,
  stoId: number,
  currencyID: number,
  amount: number,
  approvalStatusID: number,
  depositAlertID: number,
  walletProjectSpecific: INTERNAL_WALLET_MODE,
): Promise<void> => {
  const specificStoID = walletProjectSpecific === INTERNAL_WALLET_MODE.Global ? 0 : stoId;
  const balance = await InvestorBalancesInCompanyAccounts.findOne({
    investorID: investorId,
    stoID: specificStoID,
    currencyID,
  });

  if (balance) {
    balance.amount = +balance.amount + +amount;
    await balance.currency;
    await balance.save();
  } else {
    const newBalance = InvestorBalancesInCompanyAccounts.create({
      investorID: investorId,
      stoID: specificStoID,
      currencyID,
      amount,
    });
    await newBalance.save();
  }

  const depositAlert = await InvestorDepositReceivedAlert.findOneOrFail({ ID: depositAlertID });
  const invoice = await InvestorInvoices.findOneOrFail({ buyAlertID: depositAlert.buyAlertID });
  depositAlert.isApproved = approvalStatusID;
  depositAlert.dateApproved = new Date().toISOString();
  invoice.status = INVOICE_STATUS_TYPE.Paid;
  invoice.dateUpdated = new Date();
  await invoice.shareType;
  await invoice.paymentChannel;
  await invoice.buyAlert;
  await depositAlert.currency;
  await invoice.save();
  await depositAlert.save();

  await Log.createLog({
    stoID: specificStoID,
    investorID: investorId,
    activityType: 18,
    recID: depositAlertID,
  });
};

export { automaticDepositService };
