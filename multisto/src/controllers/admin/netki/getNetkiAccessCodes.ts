import { Response } from "express";
import logger from "../../../logger";
import NetkiApiService from "../../../services/platform/netki/NetkiApiService";
import NetkiSQLService from "../../../services/platform/netki/NetkiSQLService";

const assignParentsInvestorIdToTheChild = (
  childAccessCodes: string[],
  accessCodes: (string | null)[][]
) => {
  childAccessCodes.forEach((cac) => {
    const parent = accessCodes.find((ac) => ac[2] === cac);
    const child = accessCodes.find((ac) => ac[0] === cac);
    if (parent && child) {
      child[1] = parent[1];
    }
  });
};

export default async (req: any, res: Response) => {
  try {
    const netkiApiService = await NetkiApiService.build();
    const accessCodesResponse = await netkiApiService.getAccessCodes();
    const childAccessCodes: string[] = [];
    const accessCodes: (string | null)[][] = accessCodesResponse.results.map(
      (a) => {
        const childAccessCode = a.child_codes?.find((n) => n.is_active)?.code;
        if (childAccessCode) {
          childAccessCodes.push(childAccessCode);
        }
        if (!a.is_active) {
          return [a.code, "-1", childAccessCode ?? null];
        }
        return [a.code, null, childAccessCode ?? null];
      }
    );
    assignParentsInvestorIdToTheChild(childAccessCodes, accessCodes);
    const netkiSqlService = new NetkiSQLService();
    await netkiSqlService.setAccessCodes(accessCodes);
    res.redirect("/platform/kycProviderModeSettings");
  } catch (error) {
    logger.error(`${error} - Error occurred in getNetkiAccessCodes`);
  }
};
