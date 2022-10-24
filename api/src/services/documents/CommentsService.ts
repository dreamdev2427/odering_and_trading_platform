import { DocumentComment } from 'entities';

class CommentsServiceClass {
  find = async (documentID: number): Promise<DocumentComment[]> => {
    const result = await DocumentComment.find({
      where: { documentID },
    });
    return result.map(
      (singleComment: DocumentComment): DocumentComment => this.ormCommentAdapter(singleComment),
    );
  };

  create = async (
    stoID: number,
    investorID: number,
    documentID: number,
    text: string,
  ): Promise<DocumentComment> => {
    const comment = DocumentComment.create({
      stoID,
      text,
      investorID,
      documentID,
    });
    return comment.save();
  };

  update = async (
    stoID: number,
    investorID: number,
    commentID: number,
    text: string,
  ): Promise<boolean> => {
    const comment = await DocumentComment.findOne({
      where: {
        stoID,
        investorID,
        ID: commentID,
      },
    });
    if (!comment) {
      return false;
    }
    comment.text = text;
    await comment.save();
    return true;
  };

  deleteUtil = async (stoID: number, investorID: number, commentID: number): Promise<boolean> => {
    const comment = await DocumentComment.findOne({
      where: {
        stoID,
        investorID,
        ID: commentID,
      },
    });
    if (!comment) {
      return false;
    }
    await comment.remove();
    return true;
  };

  ormCommentAdapter = (comment: DocumentComment): DocumentComment => {
    comment.reply = {
      investorID: comment.replyByID ?? 0,
      modified: comment.dateReplyComment ?? new Date(),
      text: comment.replyText ?? '',
    };
    return comment;
  };
}

export const CommentsService = new CommentsServiceClass();
