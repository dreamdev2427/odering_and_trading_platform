import { Documentcomments, Investor } from 'DBSchema';
import SqlQuery, { QueryFactory } from '../../../../core/SqlQuery';

export default class CommentsSqlService {
  queryFactory: QueryFactory;

  constructor(queryFactory: QueryFactory) {
    this.queryFactory = queryFactory;
  }

  delete = (commentID: number, stoID: number, investorID: number): SqlQuery<any> => {
    const sql = `delete from documentcomments where id = ? and investorid = ? and stoid = ?`;
    return this.queryFactory(sql, [commentID, investorID, stoID]);
  };

  insert = (
    documentID: number,
    stoID: number,
    investorID: number,
    text: string,
  ): PromiseLike<number> => {
    const sql = `insert into documentcomments(stoid, documentid, comment, reply, isaccepted, isnew, investorid, datecomment, replybyid) value(?, ?, ?, ?, ?, ?, ?, now(), ?)`;
    return this.queryFactory(sql, [stoID, documentID, text, '', 0, 1, investorID, -1]).then(
      (result: any) => result.insertId,
    );
  };

  update = (
    commentID: number,
    stoID: number,
    investorID: number,
    text: string,
  ): SqlQuery<unknown> => {
    const sql = `update documentcomments set comment = ? where id = ? and investorid = ? and stoid = ?`;
    return this.queryFactory<any>(sql, [text, commentID, investorID, stoID]);
  };

  find = (documentID: number): SqlQuery<Documentcomments & Investor> => {
    const sql = `select * from investor RIGHT JOIN documentcomments on investor.ID=documentcomments.investorid where documentcomments.documentid = ?`;
    return this.queryFactory<Documentcomments & Investor>(sql, [documentID]);
  };

  // const getDocumentUserID = (
  //     investorID: number,
  //     stoID: number,
  //     docID: number,
  //     offerID: number
  // ): Promise<number | undefined> => {
  //     const sql = `select ID from documentuser where investorID=? and stoid=? and documentid=? and documentofferinvestorid=?`;
  //     return mysql
  //         .executeSQLStatement(sql, [investorID, stoID, docID, offerID])
  //         .then((result: any) => result[0] && result[0].ID);
  // };
}
