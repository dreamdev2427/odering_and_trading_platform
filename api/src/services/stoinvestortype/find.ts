import { findMany } from 'core/mysql';
import { StoInvestorType } from 'models';

const query = 'SELECT * FROM stoinvestortype';

const fetchStoInvestorType = async () => {
  const rows = await findMany(query);
  return rows.map((row) => new StoInvestorType(row));
};

const fetchStoInvestorTypeByArrayId = async (_id: ID[]) => {
  const values = _id.map(() => '?').join(',');
  const rows = await findMany(`${query} id IN (${values})`, _id);
  return rows.map((row) => new StoInvestorType(row));
};

export { fetchStoInvestorType, fetchStoInvestorTypeByArrayId };
