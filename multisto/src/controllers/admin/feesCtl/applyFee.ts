/* eslint-disable */
import logger from "../../../logger";
import { Brokers, Investor } from "../../../Schema";
import IFeeService, {
  Beneficiary,
  Status,
  Type,
} from "../../../services/platform/fees/IFeeService";
import FeeSqlService from "../../../services/platform/fees/FeeSqlService";
import IFeeCommissionService, {
  BROKER_TYPE,
} from "../../../services/platform/fees/IFeeCommissionService";
import FeeCommissionSqlService from "../../../services/platform/fees/FeeCommissionSqlService";
import IBrokerFeeService from "../../../services/platform/fees/IBrokerFeeService";
import BrokerFeeSqlService from "../../../services/platform/fees/BrokerFeeSqlService";

/**
 * This function accepts a Fee Type and based on that Type, apply the fee.
 * This happens after any related transaction that might need applying Fee.
 */
export default async (
  feeType: Type,
  investorID: number,
  stoID: number,
  transactionAmount: number,
  transactionID: number
) => {
  try {
    /*
      First step is fetching all the fees defined by Platform Admin
      related to input stoID and feeType
    */
    const feeService: IFeeService = new FeeSqlService();
    const feeCommissionService: IFeeCommissionService = new FeeCommissionSqlService();
    const fees = await feeService.getByStoAndType(stoID, feeType);

    /*
      Check to see whether there is a broker related to this investor or not
    */
    const brokerFeeService: IBrokerFeeService = new BrokerFeeSqlService();
    const brokerRecord = await brokerFeeService.getByInvestorID(investorID);
    let broker: Brokers | Investor | undefined;
    if (brokerRecord) {
      broker = await brokerFeeService.getBrokerByBrokerID(
        brokerRecord.brokerID
      );
      if (!broker) {
        broker = await brokerFeeService.getInvestorByBrokerID(
          brokerRecord.brokerID
        );
      }
    }

    /*
      For each fee found, there should be a check for its Beneficiary and then
      applying the fee meaning inserting it into `fee_commissions` table
    */
    const promises = fees.map(async (fee) => {
      let amount;
      switch (fee.status) {
        case Status.Flat: {
          amount = fee.amount;
          break;
        }
        case Status.Percentage: {
          amount = (fee.amount * transactionAmount) / 100;
          break;
        }
        default: {
          amount = 0;
        }
      }
      switch (fee.beneficiary) {
        case Beneficiary.Broker: {
          // All actions related to Broker Fee
          if (broker) {
            let beneficiaryType: BROKER_TYPE;
            if (broker.hasOwnProperty("Username")) {
              beneficiaryType = BROKER_TYPE.Broker;
            } else {
              beneficiaryType = BROKER_TYPE.Investor;
            }
            return feeCommissionService.insertOne(
              fee.ID,
              amount,
              transactionID,
              broker.ID,
              undefined,
              undefined,
              beneficiaryType
            );
          }
          break;
        }
        case Beneficiary.Platform: {
          // All actions related to Platform Fee
          return feeCommissionService.insertOne(
            fee.ID,
            amount,
            transactionID,
            0
          );
        }
        default: {
          logger.error(
            `The Beneficiary Type is not recognised. fee.ID = ${fee.ID}`
          );
          return Promise.reject();
        }
      }
    });
    await Promise.all(promises);
  } catch (error) {
    logger.error(
      `feesCtl >> applyFee: Applying fee for transactionID: ${transactionID} failed.\n${error}`
    );
  }
};
