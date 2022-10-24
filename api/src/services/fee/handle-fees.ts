import { Fee, InvestorBuyPropertyAlert, ShareTypes } from 'entities';
import { FEE_BENEFICIARY, COMMISSION_TYPE, FEE_TYPE } from 'entities/fees';
import * as math from 'mathjs';
import { applyFee } from './apply-fee';

const handleFees = async (
  alert: InvestorBuyPropertyAlert,
  shareType: ShareTypes,
  isSellBackRequest: boolean,
): Promise<any> => {
  const type = isSellBackRequest ? FEE_TYPE.SellBack : FEE_TYPE.BuyShares;
  const fee = await Fee.find({
    stoID: shareType.stoID,
    beneficiary: FEE_BENEFICIARY.Platform,
    type,
  });

  const price = isSellBackRequest ? shareType.sellValue : shareType.premiumValue;
  let totalPrice = math.multiply(
    math.number(price.toString()),
    math.number(alert.shares.toString()),
  );
  /*
    let totalPrice = math.multiply(
      math.number(shareType.sellValue.toString()),
      math.number(alert.shares.toString()),
  );  
  */
  if (fee.length > 0) {
    let fees = 0;
    fee.forEach((f) => {
      if (f.status === COMMISSION_TYPE.Flat) {
        fees = Number(math.add(f.amount, fees));
      } else {
        const subTotal = math.multiply(
          math.number(shareType.sellValue.toString()),
          math.number(alert.shares.toString()),
        );
        const fractionalFeePrice = math.divide(
          math.multiply(math.number(f.amount.toString()), subTotal),
          100,
        );
        fees = Number(math.add(fractionalFeePrice, fees));
      }
    });

    // if it's a sell back, the fees should be reduced from the amount awarded to the investor, otherwise it's added on top of the price
    totalPrice =
      type === FEE_TYPE.SellBack
        ? Number(math.subtract(totalPrice, fees))
        : Number(math.add(totalPrice, fees));

    const transactionAmount =
      type === FEE_TYPE.SellBack
        ? math.multiply(shareType.sellValue, alert.shares)
        : math.multiply(shareType.premiumValue, alert.shares);

    await applyFee(type, alert.investorID, shareType.stoID, transactionAmount, alert.ID);
  }
  await InvestorBuyPropertyAlert.update(alert.ID, { purchasePriceOffered: Number(totalPrice) });
};
export { handleFees };
