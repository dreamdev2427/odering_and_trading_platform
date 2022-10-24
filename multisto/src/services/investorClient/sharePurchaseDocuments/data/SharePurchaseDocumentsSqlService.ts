import {SharePurchaseDocuments} from "../../../../Schema";
import { QueryFactory } from "../../documents/data/SqlQuery";

export default class SharePurchaseDocumentsSqlService {
    queryfactory: QueryFactory;

    constructor(queryFactory: QueryFactory) {
        this.queryfactory = queryFactory;
    }
    find = (documentID: number) => {
        const sql = `select * from sharePurchaseDocuments where ID=?`;
        return this.queryfactory<SharePurchaseDocuments>(sql, [documentID]);
    };
    findAll = () => {
        const sql = `select * from sharePurchaseDocuments`;
        return this.queryfactory<SharePurchaseDocuments>(sql, []);
    };
    findAllWithDocuments = (stoID: number, investorID: number, sharePurchaseRequestID: number,
                            investorCountry: string, investorType: string,
                            docuSignParam: string, helloSignParam: string) => {
        const sql = `SELECT d.ID, spd.requireOnce, d.title, (
                        SELECT max(du.DocumentStatus) FROM submittedSharePurchaseDocuments sspd
                          INNER JOIN documentuser du ON du.ID = sspd.submittedDocumentID
                            WHERE du.investorID = ?
                                AND ((sspd.sharePurchaseRequestID = ? AND du.documentid = d.ID)
                                OR (spd.requireOnce = 1 AND du.documentid = d.ID AND du.DocumentStatus = 3))
                        ) as status
                        FROM sharePurchaseDocuments spd
                        INNER JOIN documents d ON d.ID = spd.ID
                        WHERE (
                            d.countriesWhitelist = '["ALL"]'
                        OR d.countriesWhitelist LIKE '%"${investorCountry}"%'
                        )
                        AND d.docusignDocumentID IS ${docuSignParam}
                        AND d.helloSignDocumentID IS ${helloSignParam}
                        AND (
                            d.investorTypesWhitelist = '["ALL"]'
                        OR d.investorTypesWhitelist LIKE '%"${investorType}"%'
                        )
                        AND d.stoid = ?;`;
        return this.queryfactory<{ID: number, title: string, requireOnce: number,status: string }>
        (sql, [investorID, sharePurchaseRequestID, stoID]);
    }
}
