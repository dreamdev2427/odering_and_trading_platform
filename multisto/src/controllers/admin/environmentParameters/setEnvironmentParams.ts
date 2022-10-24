import { Request, Response } from "express";
import common from "../../../modules/common";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import { Params } from "../../../Schema";

function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

async function writeParamsToDatabase(
  req: Request,
  res: Response,
  params: Params
): Promise<boolean> {
  try {
    const paramsSqlService: IParamsService = new ParamsSqlService();
    await paramsSqlService.setParams(params);
    return true;
  } catch (e: any) {
    common.handleError(
      req,
      res,
      `${(e as Error).message} Error occurred in settings setParamsTable`
    );
    return false;
  }
}

export default async (req: Request, res: Response) => {
  try {
    const paramDataType = parseInt(req.body.datatype, 10);
    if (paramDataType === 3 && !isJsonString(req.body.stringValue)) {
      res.status(400).send("Invalid JSON in stringValue");
    } else {
      const params = req.body as Params;
      if (params !== null) {
        const written = await writeParamsToDatabase(req, res, params);
        if (written) {
          res.redirect("/platform/platformsettings");
        } else {
          common.handleError(
            req,
            res,
            `Error occurred in settings setEnvironmentParams (!writtern)`
          );
        }
      } else {
        common.handleError(
          req,
          res,
          `Error occurred in settings setEnvironmentParams (params === null)`
        );
      }
    }
  } catch (e) {
    common.handleError(
      req,
      res,
      `${
        (e as Error).message
      } - Error occurred in settings setEnvironmentParams`
    );
  }
};
