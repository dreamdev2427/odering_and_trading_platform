import { Params } from "../../../Schema";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";

export const getParamsList = async (): Promise<Params[]> => {
  const paramsSqlService: IParamsService = new ParamsSqlService();
  const params: Params[] = await paramsSqlService.getParams();
  return params;
};

export default getParamsList;
