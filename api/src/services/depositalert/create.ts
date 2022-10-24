import { ValidationError } from 'apollo-server-core';
import { doAutomaticPurchase, internalWalletMode } from 'core/feature-flags-checkers';
import {
  PaymentChannels,
  InvestorDepositReceivedAlert as DepositAlert,
  Stos,
  Investor,
  Log,
} from 'entities';
import { InvestorDepositWithdrawAlertInput } from 'api/deposit-alert/deposit-alert.types';
import { automaticDepositService } from 'services/automaticDeposit/automatic-deposit-service';
import { INTERNAL_WALLET_MODE } from 'core/envs';
import { PAYMENT_CHANNEL_TYPE } from 'entities/payment-channels';
import Email from '../email';

const generateDetails = async (
  isBlockchain: boolean,
  data: InvestorDepositWithdrawAlertInput,
): Promise<string> => {
  const { channelType, currency } = await PaymentChannels.findOneOrFail({ ID: data.channelID });

  if (!isBlockchain) {
    const { details, swiftCode, bankAccount, bankName, amount } = data;
    const swift = swiftCode ? `\r Swift Code: ${swiftCode}` : '';
    const account = bankAccount ? `\r Bank Account Number: ${bankAccount}` : '';
    const amountTxt = amount ? `\r  Amount : ${amount}` : '';
    const detailsTxt = details ? `Details: ${details}` : '';
    return `Bank Name: ${bankName}${swift}${account}${amountTxt}\r${detailsTxt}`;
  } else if (channelType === PAYMENT_CHANNEL_TYPE.Metamask) {
    const { amount } = data;
    return `Metamask payment of ${amount} ${(await currency).abbreviation} received`;
  } else {
    const { details, transactionID } = data;
    return `Blockchain Details\r Investor's Blockchain Public Wallet Address : ${transactionID}\r${details}`;
  }
};

const createInvestorDepositAlert = async (
  investorID: number,
  data: InvestorDepositWithdrawAlertInput,
): Promise<boolean> => {
  const { channelID, stoID, amount } = data;
  const channel = await PaymentChannels.findOne({
    where: { ID: data.channelID, stoID },
    relations: ['currency'],
  });

  if (!channel) {
    throw new ValidationError('Wrong channel ID');
  }
  const isBlockchain = (await channel.currency).isBlockchainBased;
  const date = new Date().toISOString();
  const now = `${date.substring(0, 10)} ${date.substring(11, 19)}`;

  const alert = new DepositAlert();
  alert.isApproved = 0;
  alert.dateReceived = now;
  alert.dateApproved = now;
  alert.approvedUserID = -1;
  alert.investorID = investorID;
  alert.stoID = stoID;
  alert.channelID = channelID;
  alert.amount = amount;
  alert.currencyID = channel.currencyID;
  alert.isWithdrawFundsRequest = data.isWithdrawRequest;
  alert.details = await generateDetails(isBlockchain, data);
  alert.buyAlertID = data.buyAlertID;

  await alert.save();

  const sto = await Stos.findOneOrFail(stoID);
  const investor = await Investor.findOneOrFail(investorID);
  const mail = new Email(sto);
  const details = mail.prepareDetails(alert.details);
  try {
    const emailPromises: any = [];
    if (channel.sendInstructionalDepositEmail)
      emailPromises.push(mail.instructionalEmail(investor, channel, details));
    emailPromises.push(mail.adminInstructionalEmail(investor, channel, data));
    await Promise.all(emailPromises);
  } catch (error) {
    // tapLog(error.message);
    return false;
  }

  await Log.createLog({
    stoID,
    investorID,
    activityType: 26,
    recID: alert.ID,
  });

  if (await doAutomaticPurchase()) {
    if (await (await internalWalletMode()).isStoSpecific) {
      automaticDepositService(
        investorID,
        stoID,
        await channel.currencyID,
        amount,
        1,
        alert.ID,
        INTERNAL_WALLET_MODE.StoSpecific,
      );
    }
  }

  return true;
};

export default createInvestorDepositAlert;
