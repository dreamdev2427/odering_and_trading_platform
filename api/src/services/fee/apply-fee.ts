import { ValidationError } from 'apollo-server-core';

import { FeeCommission, Broker, Investor, Fee, InvestorBrokers } from 'entities';
import { FEE_BENEFICIARY, COMMISSION_TYPE, FEE_TYPE } from 'entities/fees';
import { BROKER_TYPE } from 'entities/fee-commissions';
import { FeeCommissionInput } from 'api/fee-commission/fee-commission.types';

/**
 * This function accepts a Fee Type and based on that Type, apply the fee.
 * This happens after any related transaction that might need applying Fee.
 */
const applyFee = async (
  feeType: FEE_TYPE,
  investorID: number,
  stoID: number,
  transactionAmount: number,
  transactionID: number,
): Promise<any> => {
  try {
    /*
      First step is fetching all the fees defined by Platform Admin
      related to input stoID and feeType
    */
    const fees = await Fee.find({ stoID, type: feeType });

    /*
      Check to see whether there is a broker related to this investor or not
    */
    const brokerRecord = await InvestorBrokers.findOne({ investorID });
    let broker: Broker | Investor | undefined;
    if (brokerRecord) {
      broker = await Broker.findOne({ brokerID: brokerRecord.brokerID });
      if (!broker) {
        broker = await Investor.findOne({ brokerID: brokerRecord.brokerID });
      }
    }

    /*
      For each fee found, there should be a check for its Beneficiary and then
      applying the fee meaning inserting it into `fee_commissions` table
    */
    const promises = fees.map(async (fee) => {
      let amount;
      switch (fee.status) {
        case COMMISSION_TYPE.Flat: {
          amount = fee.amount;
          break;
        }
        case COMMISSION_TYPE.Percentage: {
          amount = (fee.amount * transactionAmount) / 100;
          break;
        }
        default: {
          amount = 0;
        }
      }
      switch (fee.beneficiary) {
        case FEE_BENEFICIARY.Broker: {
          // All actions related to Broker Fee
          if (broker) {
            let beneficiaryType: BROKER_TYPE;
            if (broker instanceof Broker) {
              beneficiaryType = BROKER_TYPE.Broker;
            } else {
              beneficiaryType = BROKER_TYPE.Investor;
            }
            const data: FeeCommissionInput = {
              feeID: fee.ID,
              amount,
              transactionID,
              beneficiaryID: broker.ID,
              beneficiaryType,
            };
            const feeCommission = FeeCommission.create(data);
            return feeCommission.save();
          }
          break;
        }
        case FEE_BENEFICIARY.Platform: {
          // All actions related to Platform Fee
          const data: FeeCommissionInput = {
            feeID: fee.ID,
            amount,
            transactionID,
            beneficiaryID: 0,
          };
          const feeCommission = FeeCommission.create(data);
          return feeCommission.save();
        }
        default: {
          return Promise.reject();
        }
      }
    });
    await Promise.all(promises);
  } catch (error) {
    throw new ValidationError(`${error} - Error occurred in apply-fee`);
  }
};

export { applyFee };
