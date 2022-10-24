import { findMany, findOne } from 'core/mysql';
import { Users } from 'DBSchema';

export const fetchUserByID = async (ID: number): Promise<Users | null> => {
  return findOne<Users>('SELECT * FROM users WHERE ID = ?', [ID]);
};
export const fetchUsersByEmail = async (email: string): Promise<Users[]> => {
  return findMany<Users>('SELECT * FROM users WHERE email = ?', [email]);
};
export const fetchUserByStoID = async (stoID: number): Promise<Users[]> => {
  return findMany<Users>('SELECT * FROM users WHERE stoid = ? and isActive=1', [stoID]);
};
