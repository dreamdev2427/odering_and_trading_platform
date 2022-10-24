import { Documentuser } from "../../../../../Schema";
import SqlQuery, { QueryFactory } from "../SqlQuery";

export default class CommentsSqlService {
    queryfactory: QueryFactory;

    constructor(queryFactory: QueryFactory) {
        this.queryfactory = queryFactory;
    }

    delete = (
        commentID: number,
        investorID: number,
        stoID: number
    ): SqlQuery<any> => {
        const sql = `delete from documentcomments where id = ? and investorid = ? and stoid = ?`;
        return this.queryfactory(sql, [commentID, investorID, stoID]);
    };

    insert = (
        documentID: number,
        stoID: number,
        investorID: string,
        text: string
    ): PromiseLike<number> => {
        const sql = `insert into documentcomments(stoid, documentid, comment, reply, isaccepted, isnew, investorid, datecomment, replybyid) value(?, ?, ?, ?, ?, ?, ?, now(), ?)`;
        return this.queryfactory(sql, [
            stoID,
            documentID,
            text,
            "",
            0,
            1,
            investorID,
            -1,
        ]).then((result: any) => result.insertId);
    };

    update = (
        commentID: number,
        investorID: number,
        stoID: number,
        text: string
    ): SqlQuery<unknown> => {
        const sql = `update documentcomments set comment = ? where id = ? and investorid = ? and stoid = ?`;
        return this.queryfactory<any>(sql, [
            text,
            commentID,
            investorID,
            stoID,
        ]);
    };

    fetch = (stoID: number, documentID: number): SqlQuery<unknown> => {
        const sql = `select *, d.id as commentID, d.investorid, DATE_FORMAT(d.datecomment,'%M %d %Y %h:%i %p') as datecomment, i.FirstName, i.LastName from documentcomments d, investor i where d.stoid=? and d.documentid=? and d.investorid = i.id`;
        return this.queryfactory<Documentuser>(sql, [stoID, documentID]);
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
