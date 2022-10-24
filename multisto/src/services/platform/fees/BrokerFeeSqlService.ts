/* eslint-disable */
import { InvestorBrokers, Brokers, Investor } from "../../../Schema";
import AbstractSqlService from "../../generic/AbstractSqlService";
import IBrokerFeeService from "./IBrokerFeeService";

export default class BrokerFeeSqlService
  extends AbstractSqlService
  implements IBrokerFeeService {
  async getByInvestorID(investorID: number): Promise<InvestorBrokers> {
    const [result] = await this.runSql(
      `SELECT * FROM investor_brokers WHERE investorID = ?`,
      investorID
    );
    return result;
  }

  async getBrokerByBrokerID(brokerID: string): Promise<Brokers> {
    const [result] = await this.runSql(
      `SELECT * FROM brokers WHERE brokerID = ?`,
      brokerID
    );
    return result;
  }

  async getInvestorByBrokerID(brokerID: string): Promise<Investor> {
    const [result] = await this.runSql(
      `SELECT * FROM investor WHERE brokerID = ?`,
      brokerID
    );
    return result;
  }

  async getInvitedInvestors(ID: number): Promise<Investor[]> {
    const sql = `
      SELECT ID, FirstName, LastName, country, email FROM investor 
      WHERE ID IN (SELECT investorID FROM investor_brokers 
      WHERE brokerID = (SELECT brokerID FROM brokers WHERE ID = ?))`;
    const result = await this.runSql(sql, [ID]);
    return result;
  }
}
