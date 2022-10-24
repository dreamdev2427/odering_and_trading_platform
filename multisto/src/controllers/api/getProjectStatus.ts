import { Request, Response } from "express";
import logger from "../../logger";
import mysql from "../../modules/mysql";
import {
  Shareswallet,
  ShareswalletWithDefaults,
  Sharetypes,
  Stos,
} from "../../Schema";

type Wallet = {
  ID: number;
  shares: number;
};
type ShareType = {
  ID: number;
  title: string;
  totalShares: number;
  companyShares: number;
  investors: Wallet[];
};
type Status = {
  ID: number;
  title: string;
  details: string;
  fullDetails: string;
  isActive: boolean;
  shares: ShareType[];
};

const formatWallet = (wallet: ShareswalletWithDefaults): Wallet => ({
  ID: wallet.investorID ?? 0,
  shares: wallet.shares ?? 0,
});

const sharesIDFilter = (sharesID: number) => (val: {
  sharesID?: number | null;
}): boolean => sharesID === val.sharesID;

const formatShareType = (wallets: Shareswallet[]) => (
  sharetype: Sharetypes
): ShareType => ({
  ID: sharetype.ID,
  title: sharetype.title,
  totalShares: sharetype.totalShares ?? 0,
  companyShares: sharetype.companyShares ?? 0,
  investors: wallets.filter(sharesIDFilter(sharetype.ID)).map(formatWallet),
});

const stoidFilter = (stoid: number) => (val: { stoid: number }): boolean =>
  stoid === val.stoid;

const formatSto = (sharetypes: Sharetypes[], wallets: Shareswallet[]) => (
  sto: Stos
): Status => ({
  ID: sto.ID,
  title: sto.title,
  details: sto.details,
  fullDetails: sto.PropertyFullDetails ?? "",
  isActive: sto.isActive === 1,
  shares: sharetypes.filter(stoidFilter(sto.ID)).map(formatShareType(wallets)),
});

export default async (req: Request, res: Response) => {
  const stoid = req.query.stoid;
  const sql = `select ID, title, details, PropertyFullDetails, isActive from stos where id > 0;
                 select ID, title, stoid, totalShares, companyShares from sharetypes;
                 select investorID, sharesID, shares from shareswallet;`;
  mysql
    .executeSQLStatement(sql, [])
    .then((result: any) => {
      const [stos, sharetypes, shareswallet]: [
        Stos[],
        Sharetypes[],
        Shareswallet[]
      ] = result;
      const status: Status[] = stos.map(formatSto(sharetypes, shareswallet));
      res.json(status);
    })
    .catch((error) => {
      logger.error(
        "----------------------------------------------------------------------------------------"
      );
      logger.error("error occurred in api getProjectStatus");
      logger.error(error);
      logger.error(
        "----------------------------------------------------------------------------------------"
      );
      res.status(500).json({ status: "error" });
    });
};
