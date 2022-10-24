import Pool from 'core/mysql';
import { CommentsService } from 'services/documents/CommentsService';
import { SignatureService } from 'services/documents/SignatureService';
import { SharePurchaseSignatureService } from '../../services/sharePurchaseDocuments/SharePurchaseSignatureService';
import { tapLog } from '../../utils';
import SharePurchaseService from '../../services/sharePurchaseDocuments/SharePurchaseService';

const execute = (query, params) => Pool.execute(query, params).then((a) => a[0]);

export default {
  'createComment(documentID: Int!, text: String!): Int!': async (
    _,
    { documentID, text },
    { STO, investor },
  ) => {
    const commentsService = new CommentsService(execute);
    const result = await commentsService.create(STO.ID, investor.ID, documentID, text);

    return result;
  },
  'updateComment(commentID: Int!, text: String!): Boolean!': async (
    _,
    { commentID, text },
    { STO, investor },
  ) => {
    const commentsService = new CommentsService(execute);
    const result = await commentsService.update(STO.ID, investor.ID, commentID, text);

    return true;
  },
  'deleteComment(commentID: Int!,): Boolean!': async (_, { commentID }, { STO, investor }) => {
    const commentsService = new CommentsService(execute);
    const result = await commentsService.delete(STO.ID, investor.ID, commentID);
    return true;
  },
  'setSignature(documentID: Int!, base64: String!): String!': async (
    _,
    { documentID, base64 },
    { STO, investor },
  ) => {
    // const execute: SQLConnection = (query, params) => Pool.execute(query, params).then((a) => a[0]);
    // const commentsService = new CommentsService(execute);
    // const result = await commentsService.delete(STO.ID, investor.ID, commentID);

    const signatureService = new SignatureService(execute);

    const url = await signatureService.setSignature(investor, documentID, base64);

    return url;
  },
  'sendContract(documentID: Int!): Boolean!': async (_, { documentID }, { STO, investor }) => {
    // const execute: SQLConnection = (query, params) => Pool.execute(query, params).then((a) => a[0]);
    // const commentsService = new CommentsService(execute);
    // const result = await commentsService.delete(STO.ID, investor.ID, commentID);

    const signatureService = new SignatureService(execute);

    const success = await signatureService.sendDocument(investor.ID, documentID);

    return success;
  },
  'deleteSignature(documentID: Int!): Boolean!': async (_, { documentID }) => {
    // const execute: SQLConnection = (query, params) => Pool.execute(query, params).then((a) => a[0]);
    // const commentsService = new CommentsService(execute);
    // const result = await commentsService.delete(STO.ID, investor.ID, commentID);
    return true;
  },
  'setSubmittedDocument(documentID: Int!, fieldValues: [DocumentFieldValueDTO!]!): Boolean!':
    async (_, { documentID, fieldValues }, { STO, investor }) => {
      const signatureService = new SignatureService(execute);
      await signatureService.setSubmittedDocument(investor, documentID, fieldValues);
      return true;
    },
  'setSubmittedSharePurchaseDocument(documentID: Int!,sharePurchaseID: Int!, fieldValues: [DocumentFieldValueDTO!]!): Boolean!':
    async (_, { documentID, sharePurchaseID, fieldValues }, { STO, investor }) => {
      const signatureService = new SharePurchaseSignatureService(execute);
      await signatureService.setSubmittedDocument(
        investor,
        documentID,
        sharePurchaseID,
        fieldValues,
      );
      return true;
    },
  'setSharePurchaseDocumentSignature(documentID: Int!, sharePurchaseID: Int!, base64: String!): String!':
    async (_, { documentID, sharePurchaseID, base64 }, { STO, investor }) => {
      // const execute: SQLConnection = (query, params) => Pool.execute(query, params).then((a) => a[0]);
      // const commentsService = new CommentsService(execute);
      // const result = await commentsService.delete(STO.ID, investor.ID, commentID);

      const signatureService = new SharePurchaseSignatureService(execute);

      try {
        const url = await signatureService.setSignature(
          investor.ID,
          documentID,
          base64,
          sharePurchaseID,
        );
        return url;
      } catch (e) {
        tapLog('cloudfileserror')(e);
        return '';
      }
    },
  'sendSharePurchaseContract(documentID: Int!, sharePurchaseID: Int!): Boolean!': async (
    _,
    { documentID, sharePurchaseID },
    { STO, investor },
  ) => {
    // const execute: SQLConnection = (query, params) => Pool.execute(query, params).then((a) => a[0]);
    // const commentsService = new CommentsService(execute);
    // const result = await commentsService.delete(STO.ID, investor.ID, commentID);

    const signatureService = new SharePurchaseSignatureService(execute);

    try {
      const success = await signatureService.sendDocument(investor.ID, documentID, sharePurchaseID);
      return success;
    } catch (e) {
      return false;
    }
  },
  'deleteSharePurchaseRequest(documentID: Int!): Boolean!': async (_, { documentID }) => {
    const sharePurchaseService = new SharePurchaseService(execute);

    try {
      const success = await sharePurchaseService.deleteSharePurchaseRequest(documentID);
      return success;
    } catch (e) {
      return false;
    }
  },
};
