/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from "express";
import logger from "../../logger";
import mysql from "../../modules/mysql";
import IApiAuthService from "./IApiAuthService";

export default class ApiAuthService implements IApiAuthService {
  readonly HEADER: string = "x-api-key";
  readonly globalObj: any = global as any; // Fetch global object

  getToken(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  getClientName(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  _getToken(req: Request): string {
    const token = req.headers[this.HEADER];
    if (!token) {
      throw new Error(`ApiAuthService: No auth token provided, IP:'${req.ip}'`);
    }
    return token as string;
  }

  async registerClient(name: string, token?: string): Promise<any> {
    const sql = `INSERT INTO api_clients (name, token) VALUES (?, ?)`;
    return mysql.executeSQLStatement(sql, [name, token]);
  }

  // eslint-disable-next-line consistent-return
  authenticateApiRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let token = "";
    try {
      token = this._getToken(req);
    } catch (error) {
      logger.error(error as Error);
      res.sendStatus(403);
    }
    // TODO: Implement key cache!!!!!
    // TODO: Implement key cache!!!!!
    // TODO: Implement key cache!!!!!
    // TODO: This token is for GMLM
    if (
      [
        "DigiSharesTest-b54829606d3e26357e1aae493bffc7cc", // Our test token,
        "b29a58ba447f0afb2851fde602761529a40c91bc8a0c6f62ce4f2aba5b6a8750", // GMLM
        "dc81e158f140775025f45c217cb3d4f7895224cef031cb4e132627576ef435c2", // Biomount
      ].includes(token)
    ) {
      // TODO: Log client name isntead.
      logger.info(`API Client with token ${token} authenticated.`);
      return next();
    }
    res.sendStatus(403);
  }
}
