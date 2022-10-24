import common from "../../../../modules/common";
import mysql from "../../../../modules/mysql";
import CommentsService from "../../../../services/investorClient/documents/CommentsService";
import { stringLengthPredicate } from "../../../../utils";
import { SQLConnection } from "../../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  const { recid: documentID, id: commentID, comment: text } = req.body;
  const investorID = req.session.user.ID;
  const stoID = (global as any).config.stos[req.hostname].stoid;

  try {
    if (!stringLengthPredicate(1000)(text))
      throw new Error(`txtsuggestion must be less than 1000 charatcters long`);
    const commentsService = new CommentsService(
      mysql.executeSQLStatement as SQLConnection
    );

    await commentsService.update(commentID, investorID, stoID, text);
    res.redirect(`documentviewforcomments?id=${documentID}`);
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} Error occured in changecommenttext`
    );
  }
};
