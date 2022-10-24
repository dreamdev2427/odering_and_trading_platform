import { Documentfields, Documentofferinvestor } from 'DBSchema';
import SqlQuery, { QueryFactory } from '../../../../core/SqlQuery';

export default class DocumentSqlService {
  queryFactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryFactory = queryFactory;
  }

  findOne = (documentID: number): SqlQuery<Documentfields> => {
    const sql = `select * from documentfields where documentid = ?`;
    return this.queryFactory<Documentofferinvestor>(sql, [documentID]);
  };

  findMany = (documentIDs: number[]): SqlQuery<Documentfields> => {
    const sql = `select * from documentfields where documentid in (${documentIDs
      .map(() => '?')
      .join()})`;
    return this.queryFactory<Documentofferinvestor>(sql, [...documentIDs]);
  };
}
