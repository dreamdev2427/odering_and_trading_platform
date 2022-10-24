import { findMany, findOne } from 'core/mysql';
import { Currency } from 'models';

const query = 'SELECT * FROM currency';

const fetchCurrencyById: (_id: ID) => Promise<Currency> = async (_id) => {
  const row = await findOne(`${query} WHERE ID = ?`, [_id]);
  return row && new Currency(row);
};

const fetchCurrencies: (stoid: ID) => Promise<Currency[]> = async (stoid) => {
  const rows = await findMany(query, [stoid]);

  return rows.map((row) => new Currency(row));
};

const fetchCurrenciesByArrayId: (_id: ID[]) => Promise<Currency[]> = async (_id) => {
  const values = _id.map(() => '?').join(',');
  const rows = await findMany(`${query} WHERE ID IN (${values})`, _id);
  return rows.map((row) => new Currency(row));
};

export { fetchCurrencyById, fetchCurrencies, fetchCurrenciesByArrayId };
