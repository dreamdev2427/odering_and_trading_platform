import { findOne } from 'core/mysql';
import { ChangePassword } from 'models';

const query = 'SELECT * FROM changepassword';

const fetchChangePasswordByLink: (link: string) => Promise<ChangePassword> = async (link) => {
  const row = await findOne(`${query} WHERE securelink = ?`, [link]);
  return row && new ChangePassword(row);
};

const fetchChangePasswordById: (_id: ID) => Promise<ChangePassword> = async (_id) => {
  const row = await findOne(`${query} WHERE id = ?`, [_id]);
  return row && new ChangePassword(row);
};

export { fetchChangePasswordByLink, fetchChangePasswordById };
