import { findOne } from "../../../modules/db";
import { Blockchains } from "../../../Schema";

export default class BlockchainSqlService {
  findByCurrencyId = async (
    currencyID: number
  ): Promise<Blockchains | null> => {
    const sql = `SELECT * FROM blockchains b INNER JOIN currency c ON b.ID = c.blockchainID WHERE c.ID = ?`;
    return findOne<Blockchains>(sql, [currencyID]);
  };
}
