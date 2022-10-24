import { findOne } from 'core/mysql';
import { Register } from 'entities';
import { Investor } from '../../DBSchema';

const fetchInvestorByEmail: (email: string) => Promise<Investor> = async (email) => {
  const row = await findOne('SELECT * FROM investor WHERE email = ?', [email]);
  return row;
};

const fetchRegisterBySecret: (secret: string) => Promise<Register> = async (secret) => {
  const row = await findOne('SELECT * FROM register WHERE secret = ?', [secret]);
  return row;
};

const fetchInvestorById: (investorID: number) => Promise<Investor> = async (investorID) => {
  const row = await findOne('SELECT * FROM investor WHERE ID = ?', [investorID]);
  return row;
};

export { fetchInvestorByEmail, fetchRegisterBySecret, fetchInvestorById };
