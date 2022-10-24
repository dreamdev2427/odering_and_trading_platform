import { Paymentchannels } from "../../../../Schema";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import IPaymentChannelService from "./IPaymentChannelService";

export default class PaymentChannelSqlService
  extends AbstractSqlService
  implements IPaymentChannelService {
  async fetchPaymentChannel(id: number): Promise<Paymentchannels> {
    const [result] = await this.runSql(
      `SELECT * FROM paymentchannels WHERE id = ?`,
      id
    );
    return result;
  }
  async fetchPaymentChannelsWithConversionEnabled(): Promise<
    Paymentchannels[]
  > {
    return this.runSql(
      `SELECT * FROM paymentchannels WHERE conversionEnabled = 1`
    );
  }
  async fetchPaymentChannelsWithConversion(
    from: string[],
    to: string[]
  ): Promise<Paymentchannels[]> {
    const qFrom = this.arrayAsSqlArguments(from);
    const qTo = this.arrayAsSqlArguments(to);
    const sql = `SELECT * FROM paymentchannels pc
            INNER JOIN currency fromCurrency
                ON  pc.currencyID = fromCurrency.ID
            INNER JOIN currency toCurrency
                ON pc.currencyToConvert = toCurrency.ID
            WHERE fromCurrency.Abbreviation IN (${qFrom})
                AND toCurrency.Abbreviation IN (${qTo})`;

    const args = from.concat(to);
    return this.runSql(sql, args);
  }
  async updateAllConversionRatesFor(
    currencyFrom: number,
    currencyTo: number,
    rate: string
  ): Promise<void> {
    const sql = `
            UPDATE paymentchannels
                SET conversionRate = ?
            WHERE currencyId = ?
                AND currencyToConvert = ?
        `;
    return this.runSql(sql, [rate, currencyFrom, currencyTo]);
  }
  async upsert(channel: Paymentchannels): Promise<void> {
    const sql = `INSERT INTO paymentchannels(ID, stoid, paymentType, title, paymentDetails, currencyID, conversionEnabled, 
                currencyToConvert, conversionRate, canWithdrawFunds, sendInstructionalDepositEmail, 
                depositInstructionText, depositInstructionEmailHeader, sendAdminEmail, adminEmailHeader, adminEmailBody) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE  
                stoid = VALUES(stoid), 
                paymentType = VALUES(paymentType),
                title = VALUES(title), 
                paymentDetails = VALUES(paymentDetails),
                conversionEnabled = VALUES(conversionEnabled),
                currencyToConvert = VALUES(currencyToConvert),
                conversionRate = VALUES(conversionRate),
                canWithdrawFunds = VALUES(canWithdrawFunds),
                sendInstructionalDepositEmail = VALUES(sendInstructionalDepositEmail),
                depositInstructionText = VALUES(depositInstructionText),
                depositInstructionEmailHeader = VALUES(depositInstructionEmailHeader),
                sendAdminEmail = VALUES(sendAdminEmail),
                adminEmailHeader = VALUES(adminEmailHeader),
                adminEmailBody = VALUES(adminEmailBody);`;
    return this.runSql(sql, [
      channel.ID,
      channel.stoid,
      channel.paymentType,
      channel.title,
      channel.paymentDetails,
      channel.currencyID,
      channel.conversionEnabled,
      channel.currencyToConvert,
      channel.conversionRate,
      channel.canWithdrawFunds,
      channel.sendInstructionalDepositEmail,
      channel.depositInstructionText,
      channel.depositInstructionEmailHeader,
      channel.sendAdminEmail,
      channel.adminEmailHeader,
      channel.adminEmailBody,
    ]);
  }
}
