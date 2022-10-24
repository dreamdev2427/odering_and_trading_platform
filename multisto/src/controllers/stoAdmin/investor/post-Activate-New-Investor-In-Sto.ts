import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import { Investorsto } from "../../../Schema";

export default async (req: any, res: Response) => {
  try {
    const { rid, id } = req.query;

    const fetchKycStatusSql = `
SELECT KYCCurrentStatus
    FROM investorsto
WHERE stoid = 0 
 AND investorid = ? 
    `;
    const insertStmt = `
INSERT INTO investorsto(
    investorid, isAccountClosed, stoid, expectedShares, 
    expectedInvestment, isKYC, KYCApplied, KYCCurrentStatus, isActive) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
    const kycStatus = ((await mysql.executeSQLStatement(fetchKycStatusSql, [
      id,
    ])) as Investorsto[])[0];
    await mysql.executeSQLStatement(insertStmt, [
      id,
      0,
      req.session.stoid,
      0,
      0,
      1,
      0,
      kycStatus.KYCCurrentStatus,
      1,
    ]);

    res.redirect(`/admin/purchasePropertiesRequestFromInvestor?id=${rid}`);
  } catch (error) {
    logger.error(
      `${error} - Error occurred in post-Activate-New-Investor-In-Sto`
    );
  }
};
