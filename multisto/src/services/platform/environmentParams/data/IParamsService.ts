import { Params } from "../../../../Schema";

export default interface IParamsService {
  /**
   * Get all Params
   */
  getParams(): Promise<Params[]>;
  /**
   * Set all Params
   */
  setParams(params: Params): Promise<any>;
  /**
   * Update or insert param
   */
  upsertParams(params: Partial<Params>): Promise<any>;
  /**
   * Find Param By Name
   */
  findParamByName(paramName: string): Promise<Params>;
  /**
   * Find Param By Name or return null
   */
  findParamByNameOrUndefined(paramName: string): Promise<Params | undefined>;
}
