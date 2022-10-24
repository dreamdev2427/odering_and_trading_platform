import got from "got";
import moment from "moment";
import { InvestorDepositReceivedAlert, Params } from "../Schema";

const mysql = require("../modules/db");

type InvestorDeposit = {
  ID: number;
  investorID: number;
  stoid: number;
  DateReceived: string;
  ChannelID: number;
  Amount: number;
  Details: string;
  isApproved: number;
  DateApproved: string;
  ApprovedByUserID: number;
  runningBalance: number;
  currencyID: number;
};
const bimountDateFormat = (date: Date) => moment(date).format("YYYY-MM-DD");

export default async (depositID: number) => {
  const param: Params[][] = await mysql.execute(
    'SELECT * FROM params WHERE param = "bimountEnabled";'
  );
  // console.log(param[0][0?.intValue)
  // console.log(param)
  if (param[0][0]?.intValue) {
    const deposit: InvestorDepositReceivedAlert = (
      await mysql.execute(
        "SELECT * FROM InvestorDepositReceivedAlert WHERE ID=?",
        [depositID]
      )
    )[0][0];
    const formattedDeposit: InvestorDeposit = {
      ID: deposit.ID,
      investorID: deposit.investorID ?? 0,
      stoid: deposit.storid ?? 0,
      DateReceived: bimountDateFormat(deposit.DateReceived ?? new Date()),
      ChannelID: deposit.ChannelID ?? 0,
      Amount: deposit.Amount ?? 0,
      Details: deposit.Details ?? "",
      isApproved: deposit.isApproved ?? 0,
      DateApproved: bimountDateFormat(deposit.DateApproved ?? new Date()),
      ApprovedByUserID: deposit.ApprovedByUserID ?? 0,
      runningBalance: deposit.runningBalance ?? 0,
      currencyID: deposit.currencyID ?? 0,
    };
    return got(`http://bimount-qa.kelltontech.net/api/v1/investor-deposite`, {
      method: "POST",
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedDeposit),
    });
  }
  return false;
};
