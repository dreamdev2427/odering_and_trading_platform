import { Documentcomments, Documentuser, Investor } from 'DBSchema';
import SqlQuery, { QueryFactory } from '../../../../core/SqlQuery';

export default class CloudFileSqlService {
  queryFactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryFactory = queryFactory;
  }

  insert = (filename: string, url?: string): PromiseLike<number> => {
    const sql = `insert into cloudFiles(filename, url) value(?, ?)`;
    return this.queryFactory(sql, [filename, url ?? null]).then((result: any) => result.insertId);
  };

  //   find = (fileID: number): SqlQuery<Documentcomments & Investor> => {
  //     const sql = `select * from investor RIGHT JOIN documentcomments on investor.ID=documentcomments.investorid where documentcomments.stoid = ? and documentcomments.documentid = ?`;
  //     return this.queryfactory<Documentcomments & Investor>(sql, [stoID, documentID]);
  //   };
}
