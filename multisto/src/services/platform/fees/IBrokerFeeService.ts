/* eslint-disable */
import { InvestorBrokers, Brokers, Investor } from "../../../Schema";

export default interface IBrokerFeeService {
  /**
   * Get By Investor ID
   * @param investorID - number
   */
  getByInvestorID(investorID: number): Promise<InvestorBrokers>;

  /**
   * Get Broker By Broker ID
   * @param brokerID - string
   */
  getBrokerByBrokerID(brokerID: string): Promise<Brokers>;

  /**
   * Get Investor By Broker ID
   * @param brokerID - string
   */
  getInvestorByBrokerID(brokerID: string): Promise<Investor>;

  /**
   * Get Invited Investors By Broker's ID
   * @param ID - number
   */
  getInvitedInvestors(ID: number): Promise<Investor[]>;
}
