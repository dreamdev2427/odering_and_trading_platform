import { findMany, findOne } from 'core/mysql';
import { Stos } from 'models';

const query = 'SELECT * FROM stos';

const fetchStosById: (_id: ID) => Promise<Stos> = async (_id) => {
  const row = await findOne(`${query} WHERE ID = ?`, [_id]);
  return row && new Stos(row);
};

const fetchStos: () => Promise<Stos[]> = async () => {
  const rows = await findMany(query);
  return rows.map((row) => new Stos(row));
};

const fetchActiveStos: () => Promise<Stos[]> = async () => {
  const rows = await findMany(`${query} WHERE isActive = 1 AND ID > 0`);
  return rows.map((row) => new Stos(row));
};

const fetchStosByArrayId: (_id: ID[]) => Promise<Stos[]> = async (_id) => {
  const values = _id.map(() => '?').join(',');
  const rows = await findMany(`${query} WHERE ID IN (${values})`, _id);
  return rows.map((row) => new Stos(row));
};

export { fetchStosById, fetchStos, fetchActiveStos, fetchStosByArrayId };
