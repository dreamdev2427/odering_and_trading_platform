/* eslint-disable class-methods-use-this */
import { findOne, findMany, update, insert } from "../../../../modules/db";
import { Params } from "../../../../Schema";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import IParamsService from "./IParamsService";

export default class ParamsSqlService
  extends AbstractSqlService
  implements IParamsService {
  async getParams(): Promise<Params[]> {
    return findMany<Params>(`SELECT * FROM params ORDER BY ID`);
  }
  async setParams(params: Params): Promise<any> {
    const stmt = "UPDATE params SET stringValue = ?, intValue = ? WHERE id = ?";
    return update(stmt, [params.stringValue, params.intValue, params.ID]);
  }
  async upsertParams(params: Partial<Params>): Promise<any> {
    const param = await this.findParamByNameOrUndefined(params.param ?? "NULL");
    if (param) {
      const stmt =
        "UPDATE params SET stringValue = ?, intValue = ? WHERE param = ?";
      return update(stmt, [params.stringValue, params.intValue, params.param]);
    }
    const stmt =
      "INSERT INTO params(param, isglobal, datatype, stringValue, intValue) VALUES (?,?,?,?,?)";
    return insert(stmt, [
      params.param,
      params.isglobal,
      params.datatype,
      params.stringValue,
      params.intValue,
    ]);
  }
  async findParamByName(paramName: string): Promise<Params> {
    const stmt = "SELECT * FROM params WHERE param = ?";
    const param = await findOne<Params>(stmt, [paramName]);
    if (!param) {
      throw new Error("Param not found");
    }

    return param;
  }

  async findParamByNameOrUndefined(
    paramName: string
  ): Promise<Params | undefined> {
    const stmt = "SELECT * FROM params WHERE param = ?";
    const param = await findOne<Params>(stmt, [paramName]);
    if (!param) {
      return undefined;
    }

    return param;
  }
}
