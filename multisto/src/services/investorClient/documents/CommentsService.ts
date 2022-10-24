import { Documents } from "../../../Schema";
import { head } from "../../../utils";
import CommentsSqlService from "./data/documents/CommentsSqlService";
import DocumentSqlService from "./data/documents/DocumentsSqlService";
import SqlQuery, { getQueryfactory, SQLConnection } from "./data/SqlQuery";

export default class CommentsService {
    connection: SQLConnection;
    constructor(connection: SQLConnection) {
        this.connection = connection;
    }

    async index(
        stoID: number,
        documentID: number
    ): Promise<{
        document: Documents;
        comments: unknown[];
    }> {
        const documentSqlService = new DocumentSqlService(
            getQueryfactory(this.connection)
        );
        const commentsSqlService = new CommentsSqlService(
            getQueryfactory(this.connection)
        );

        const documentQuery = documentSqlService.getDocuments(
            documentID,
            stoID,
        );
        const commentsQuery = commentsSqlService.fetch(stoID, documentID);

        const [documents, comments] = await SqlQuery.all(
            documentQuery,
            commentsQuery
        );
        return {
            comments,
            document: head(documents),
        };
    }
    async create(
        documentID: number,
        stoID: number,
        investorID: string,
        text: string
    ): Promise<void> {
        const commentsSqlService = new CommentsSqlService(
            getQueryfactory(this.connection)
        );
        await commentsSqlService.insert(documentID, stoID, investorID, text);
    }

    async update(
        commentID: number,
        investorID: number,
        stoID: number,
        text: string
    ): Promise<void> {
        const commentsSqlService = new CommentsSqlService(
            getQueryfactory(this.connection)
        );
        await commentsSqlService.update(commentID, investorID, stoID, text);
    }

    async delete(
        commentID: number,
        investorID: number,
        stoID: number
    ): Promise<void> {
        const commentsSqlService = new CommentsSqlService(
            getQueryfactory(this.connection)
        );
        await commentsSqlService.delete(commentID, investorID, stoID);
    }
}
