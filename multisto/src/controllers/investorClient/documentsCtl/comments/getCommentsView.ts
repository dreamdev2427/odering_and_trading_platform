import common from "../../../../modules/common";
import mysql from "../../../../modules/mysql";
import CommentsService from "../../../../services/investorClient/documents/CommentsService";
import { SQLConnection } from "../../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  const { id: documentID } = req.query;
  const stoID = (global as any).config.stos[req.hostname].stoid;

  try {
    const investorPageDataP = common.getCommonInvestorDashboardPageProperties(
      req,
      res
    );
    const commentsService = new CommentsService(
      mysql.executeSQLStatement as SQLConnection
    );
    const { document, comments } = await commentsService.index(
      stoID,
      documentID
    );
    res.render("investors/documentcomments", {
      recordID: documentID,
      loginUserID: req.session.user.ID,
      record: document,
      comments,
      partials: common.getInvestorDashboardPartials(),
      Data: await investorPageDataP,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} Error occured in getcommentsView`
    );
  }
};
