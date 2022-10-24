import { findMany, findOne } from 'core/mysql';
import { InvestorSto } from 'models';

const fetchInvestorStoByInvestorId: (_id: ID, stoid: ID) => Promise<InvestorSto> = async (
  _id,
  stoid,
) => {
  const row = await findOne('SELECT * FROM investorsto WHERE investorid = ? AND stoid = ?', [
    _id,
    stoid,
  ]);
  return row && new InvestorSto(row);
};

const fetchInvestorActiveSto: (_id: ID) => Promise<InvestorSto[]> = async (_id) => {
  const rows = await findMany('SELECT * FROM investorsto WHERE investorid = ? AND stoid > 0', [
    _id,
  ]);
  return rows.map((row) => new InvestorSto(row));
};

const fetchInvestorStoAnyByInvestorId: (_id: ID) => Promise<InvestorSto> = async (_id) => {
  const row = await findOne('SELECT * FROM investorsto WHERE investorid = ? AND stoid > 0', [_id]);
  return row && new InvestorSto(row);
};

export { fetchInvestorStoByInvestorId, fetchInvestorActiveSto, fetchInvestorStoAnyByInvestorId };
