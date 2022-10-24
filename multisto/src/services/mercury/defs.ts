// import { findOne } from '../../modules/db';
import { MercuryParam } from "./types";
import { Params } from "../../Schema";
import { findMany } from "./multistoHelpers";


export const mercuryEndpoint = "https://api.mercury.com/api/v1";
export const getMercuryParam = (): Promise<MercuryParam> =>
  findMany<Params>("SELECT * FROM params where param=\"mercuryConfig\" and datatype =3",[])
    .then((params) => {
      const [param] = params
      if (!param) throw new Error("Config not found");
      return param.stringValue ?? "";
    })
    .then(JSON.parse);
