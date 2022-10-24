import { Request, Response } from "express";
// import { Pool } from '../../../modules/db';
import logger from "../../../logger";
import { ApiMigrationTable, Migrations, Params, Stos } from "../../../Schema";
import AbstractSqlService from "../../../services/generic/AbstractSqlService";

class SqlSvc extends AbstractSqlService {}

export default async (req: Request, res: Response) => {
  try {
    const svc = new SqlSvc();
    const legacyM: Migrations[] = await svc.findAll(`migrations`);
    const apiM: ApiMigrationTable[] = await svc.findAll(`api_migration_table`);
    const allParams: Params[] = await svc.findAll(`params`);
    /** Words denoting sensitive information that should be hidden. We don't want to send secrets. */
    const blockedWords = [
      "password",
      "phrase",
      "key",
      "token",
      "access",
      "wallet",
      "address",
      "secret",
      "hidden",
    ];
    /** Add params to this list if something is hidden when it shouldn't be (e.g. has password in the name but is not a password value) */
    const unblockedParams: string[] = [];
    /** Add params to this list if they should always be filtered out */
    const filterParams: string[] = [];

    const params = allParams
      .filter((param) => !filterParams.includes(param.param ?? ""))
      .map((param) => {
        if (unblockedParams.includes(param.param ?? "")) {
          return param;
        }
        if (+(param.datatype ?? 0) === 1) {
          // if (blockedWords.includes(param.param ?? "")) {
          if (
            blockedWords.find((word) =>
              (param.param ?? "").toLowerCase().includes(word.toLowerCase())
            )
          ) {
            return {
              ...param,
              stringValue: "<hidden>",
            };
          }
        }
        if (param.stringValue?.length) {
          /*
          Hide sensitive json values only, case-insensitive

          Regex Explanation:
          Look at the replace value below: $1$2$3"<hidden>"$5
          These numbers are regex match groups defined in () in the regex
            Group $1: filter word
            Group $2: possible extra symbols until json value, stop at " :
            Group $3: end of key and beginning of a json value, literally ": or only : just in case it isn't proper json
            Group $4: value, usually in quotes
            Group $5: ending, can be next element (",), end of object ("}), end of line ($), or any break symbol (\r or \n), ignores \"
        */
          const reJsonFilter = new RegExp(
            `(${blockedWords.join(
              "|"
            )})([^":]*?)(":|:)(.+?[,"]?)((?<="),|(?<!\\\\)"|(?<=")}|$|\r|\n)`,
            "gim"
          );
          const stringValue = param.stringValue?.replace(
            reJsonFilter,
            `$1$2$3"<hidden>"$5`
          );
          return {
            ...param,
            stringValue,
          };
        }
        return param;
      });

    const stos: Stos[] = await svc.findAll(`stos`);

    type StoSettings = {
      sto_id: number;
      is_active: number;
      SMTP_Host: string;
      SMTP_Port: string;
      SMTP_User: string;
      SMTP_FromAddress: string;
      SMTP_FromName: string;
      stolinkfull: string;
      settings: string;
    };
    const settings: StoSettings[] = stos.map((sto) => ({
      sto_id: sto.ID,
      is_active: sto.isActive as number,
      SMTP_Host: sto.SMTP_Host ?? "null",
      SMTP_Port: sto.SMTP_Port ?? "null",
      SMTP_User: sto.SMTP_User ?? "null",
      SMTP_FromAddress: sto.SMTP_FromAddress ?? "null",
      SMTP_FromName: sto.SMTP_FromName ?? "null",
      stolinkfull: sto.stolinkfull ?? "null",
      settings: sto.settings ?? "null",
    }));

    res.send({
      legacy_migrations: legacyM,
      api_migrations: apiM,
      public_params: params,
      sto_settings: settings.filter((sto) => sto.is_active === 1),
      inactive_sto_settings: settings.filter((sto) => sto.is_active === 0),
      revision: (global as any).revision,
    });
    logger.info(`Debug API: Logged public config.`);
  } catch (e: any) {
    res.sendStatus(404);
    logger.error(`${e.stack}`);
  }
};
