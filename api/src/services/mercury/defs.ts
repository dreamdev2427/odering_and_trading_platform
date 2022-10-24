import { findOne } from 'core/mysql';
import { MercuryParam } from 'services/mercury/types';
import { Params } from 'DBSchema';

export const mercuryEndpoint = 'https://backend.mercury.com/api/v1';
export const getMercuryParam = (): Promise<MercuryParam> =>
  findOne<Params>('SELECT * FROM params where param="mercuryConfig" and datatype =3')
    .then((param) => {
      if (!param) throw new Error('Config not found');
      return param.stringValue ?? '';
    })
    .then(JSON.parse);
