import { Request, Response } from "express";
import logger from "../../../../../../logger";
import svc from "../../../sharecap-table.service";
import {
  ShareCapInvestor,
  ShareCapShares,
  ShareCapTable,
} from "../../../sharecap-table.types";

/** Give the fields a human-readable translation so they can be auto-exported in a CSV header */

type ShareCapTableHeading = Omit<
  Omit<Omit<ShareCapTable, "global">, "investors">,
  "stoID"
>;
type CsvHeadingTitles = {
  [Property in keyof ShareCapTableHeading]: string;
};

/** Human-readable fields for the ShareCap Heading section */
const csvHeadingTitles: CsvHeadingTitles = {
  sharesAvailable: `Available Shares`,
  sharesAvailablePercent: `(as %)`,
  sharesCompany: `Shares held by the Company`,
  sharesCompanyPercent: `(as %)`,
  sharesCustodian: `Shares held by Custodian`,
  sharesCustodianPercent: `(as %)`,
  sharesDistributed: `Shares Distributed`,
  sharesDistributedPercent: `(as %)`,
  sharesTotal: `Total Shares`,
  totalInvestorInvestment: `Total Invested Amount`,
  totalVotingPower: `Total Voting Power`,
  totalInvestorVotingPower: `Total Investor Voting Power`,
  totalInvestorVotingPowerPercent: `(as %)`,
  // totalInvestorDividends: `Total Investor Dividends`,
  updatedAt: `Date and Time of Report`,
};

type ShareCapInvestorHeading = ShareCapInvestor; // Omit<ShareCapInvestor, "shareTypes">;
type CsvInvestorTitles = {
  [Property in keyof ShareCapInvestorHeading]: string;
};

/** Human-readable fields for the ShareCap Investors section */
const csvInvestorTitles: CsvInvestorTitles = {
  name: `Investor`,
  ID: `ID`,
  shareTypes: `Share Class Name`,
  totalInvestment: `Total Investment`,
  totalQuantity: `Total Quantity`,
  totalVotingPower: `Total Voting Power`,
  totalVotingPowerPercent: `(as %)`,
  totalDividends: `Total Dividend Amount`,
  totalDividendPercent: `(as %),`,
};

type CsvShareCapShares = {
  [Property in keyof Partial<ShareCapShares>]: string;
};
const csvShareTitles: CsvShareCapShares = {
  nominalValue: `Nominal Value`,
  premiumValue: `Market Value`,
  currencyID: `Currency`,
  quantity: `Quantity`,
  investment: `Invested Amount`,
  votingPower: `Voting Power`,
  votingPowerPercent: `(as %)`,
  dividend: `Dividend`,
  dividendPercent: `(as %)`,
};

export default async (req: Request, res: Response) => {
  let isUserError = false;
  try {
    // const stoID = req.query.stoid ?? req.query.stoID;
    const stoID = req.session.stoid;
    if (stoID === undefined || Number.isNaN(+stoID)) {
      isUserError = true;
      throw new Error(`STO ID not specified`);
    }
    const table = await svc.getShareCapTable(+stoID);

    const headingTitles = Object.entries(csvHeadingTitles).map(
      ([, value]) => value
    );
    const headingValues = Object.entries(csvHeadingTitles).map(
      ([key]) => table[key as keyof ShareCapTable]
    );
    // const csvHeading = `Share Register\n${headingTitles.join(
    //   `;`
    // )}\n${headingValues.join(`;`)}`;
    const csvHeading = `Share Register;\n${headingTitles
      .map((title, i) => `${title},${headingValues[i]};`)
      .join("\n")}`;

    const investorColumns = [
      csvInvestorTitles.name,
      csvInvestorTitles.ID,
      csvInvestorTitles.shareTypes,
      csvShareTitles.nominalValue,
      csvShareTitles.premiumValue,
      csvShareTitles.quantity,
      csvShareTitles.investment,
      csvShareTitles.currencyID,
      csvShareTitles.votingPower,
      csvShareTitles.votingPowerPercent,
      // You can add more column names here
    ];

    /* ONLY ONE CURRENCY PER SHARECAP, HARD REQUIREMENT FOR NOW */
    const CURRENCY = table.investors
      .find((i) => i.ID)
      ?.shareTypes.find((st) => st.currencyMetadata)?.currencyMetadata;

    const investorAllValues: string[] = table.investors.map((investor) => {
      const rows = investor.shareTypes.map((st) =>
        [
          investor.name,
          investor.ID,
          st.title,
          st.nominalValue,
          st.premiumValue,
          st.quantity,
          st.investment,
          st.currencyMetadata?.Abbreviation ?? "N/A",
          st.isVotingRightsApplicalbe ? st.votingPower : "N/A",
          st.isVotingRightsApplicalbe ? st.votingPowerPercent : "N/A",
          // You can add more column values here
        ].join()
      );
      rows.push(
        `${[
          investor.name,
          investor.ID,
          "Total",
          "",
          "",
          investor.totalQuantity,
          investor.totalInvestment,
          CURRENCY?.Abbreviation ?? "N/A",
          investor.totalVotingPower,
          investor.totalVotingPowerPercent,
        ].join()}`
      );
      return `${rows.join("\n")}`;
    });

    const csvInvestors = `${investorColumns.join()}\n${investorAllValues.join(
      "\n"
    )}`;

    res.header("Content-Type", "text/csv");
    res.send(`${csvHeading}\n\n${csvInvestors}`);
  } catch (e) {
    if (isUserError) {
      res.sendStatus(400).send(e);
    } else {
      logger.error(
        `ShareCap table API error at api-get:\n${(e as Error).stack}`
      );
      res.sendStatus(500);
    }
  }
};
