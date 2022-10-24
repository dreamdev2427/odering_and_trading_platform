import {
    Documentuser,
    SubmittedSharePurchaseDocuments
} from "../../../../Schema";
import { unsafeHead } from "../../../../utils";
import SqlQuery, { QueryFactory } from "../../documents/data/SqlQuery";

export default class SubmittedSharePurchaseDocumentsSqlService {
    queryfactory: QueryFactory;

    constructor(queryFactory: QueryFactory) {
        this.queryfactory = queryFactory;
    }
    find = (sharePurchaseRequestID: number, documentID: number) => {
        const sql = `SELECT * FROM submittedSharePurchaseDocuments left JOIN documentuser on documentuser.ID = submittedSharePurchaseDocuments.submittedDocumentID where submittedSharePurchaseDocuments.sharePurchaseRequestID=? and documentuser.documentid=?`;
        return this.queryfactory<
            SubmittedSharePurchaseDocuments & Documentuser
        >(sql, [sharePurchaseRequestID, documentID]);
    };
    update = (
        fieldValuesJson: Documentuser["fieldValuesJson"],
        contents: Documentuser["contents"],
        investorID: number,
        documentUserID: number,
        stoID: number
    ): SqlQuery<any> => {
        const sql =
            "update documentuser set fieldValuesJson=?, contents=?, stoid=? where investorID=? and ID=?";
        return this.queryfactory<any>(sql, [
            fieldValuesJson,
            contents,
            stoID,
            investorID,
            documentUserID,
        ]);
    };
    insert = (
        sharePurchaseRequestID: number,
        fieldValuesJson: Documentuser["fieldValuesJson"],
        contents: Documentuser["contents"],
        investorID: number,
        docID: number,
        dirID: number,
        stoID: number
    ): PromiseLike<number> => {
        const sql =
            "insert into documentuser(investorID, stoid, directoryid, documentid, DocumentStatus, fieldValuesJson, documentofferinvestorid, contents) values(?, ?, ?, ?, ?, ?, ?, ?)";
        return this.queryfactory(sql, [
            investorID,
            stoID,
            dirID,
            docID,
            1,
            fieldValuesJson,
            0,
            contents,
        ])
            .then((result: any): number => result.insertId)
            .then(async (submittedDocumentID) => {
                const submittedSharePurchaseDocumentsSql = `insert into submittedSharePurchaseDocuments(sharePurchaseRequestID, submittedDocumentID ) values(?,?);`;
                await this.queryfactory(submittedSharePurchaseDocumentsSql, [
                    sharePurchaseRequestID,
                    submittedDocumentID,
                ]);
                return submittedDocumentID;
            });
        //
    };

    upsert = (
        sharePurchaseRequestID: number,
        docID: number,
        dirID: number,
        fieldValuesJson: Documentuser["fieldValuesJson"],
        contents: Documentuser["contents"],
        investorID: number,
        stoID: number
    ): PromiseLike<number> =>
        this.find(sharePurchaseRequestID, docID)
            .then(unsafeHead)
            .then(async (documentUser) => {
                if (documentUser) {
                    await this.update(
                        fieldValuesJson,
                        contents,
                        investorID,
                        documentUser.ID,
                        stoID
                    );
                    return documentUser.ID;
                }
                return this.insert(
                    sharePurchaseRequestID,
                    fieldValuesJson,
                    contents,
                    investorID,
                    docID,
                    dirID,
                    stoID
                );
            });
}
