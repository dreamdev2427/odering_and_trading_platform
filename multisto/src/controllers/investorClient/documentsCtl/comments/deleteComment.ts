import common from "../../../../modules/common";
import mysql from "../../../../modules/mysql";
import CommentsService from "../../../../services/investorClient/documents/CommentsService";
import { SQLConnection } from "../../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    const { recid: documentID, id: commentID } = req.query;
    const investorID = req.session.user.ID;
    const stoID = (global as any).config.stos[req.hostname].stoid;

    const commentsService = new CommentsService(
      mysql.executeSQLStatement as SQLConnection
    );

    await commentsService.delete(commentID, investorID, stoID);
    res.redirect(`documentviewforcomments?id=${documentID}`);
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} Error occured in documentsuggestion`
    );
  }
};
