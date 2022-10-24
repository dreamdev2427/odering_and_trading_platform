import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import {
  Document,
  DocumentComment,
  DocumentField,
  DocumentOfferInvestor as OfferedDocument,
  DocumentUser as SubmittedDocument,
  DocumentUserFieldValue,
  SharePurchaseDocument,
} from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import { CommentsService } from 'services/documents/CommentsService';
import { SignatureService } from 'services/documents/SignatureService';
import { SharePurchaseSignatureService } from 'services/sharePurchaseDocuments/SharePurchaseSignatureService';
import SharePurchaseService from 'services/sharePurchaseDocuments/SharePurchaseService';
import DocumentService from 'services/documents/DocumentsService';
import DocumentOfferService from 'services/documents/DocumentOfferService';
import DocusignService from 'services/documents/docusign/DocusignService';
import HelloSignService from 'services/documents/helloSign/HelloSignService';
import externalDocumentsPrefill from 'services/documents/docusign/helpers/externalDocumentsPrefill';
import { ForbiddenError } from 'apollo-server-core';
import { DocumentFieldValueDTO } from './documents/document-types';

@Resolver()
class DocumentsResolver {
  @Authorized(JWT_ROLE.investor)
  @Query(() => [Document], {
    description: 'Get documents that are active for investors',
  })
  commentableDocuments(): Promise<Document[]> {
    return Document.find({
      isActiveForInvestors: 1,
    });
  }

  // Typo in Original Table in database "DateTo" is set as "DataTo"
  @Authorized(JWT_ROLE.investor)
  @Query(() => [OfferedDocument], {
    description: 'Get investors Offered Documents valid currently',
  })
  async offeredDocuments(@Ctx() { user }: Context): Promise<OfferedDocument[]> {
    return DocumentOfferService.offeredDocuments(user.ID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => OfferedDocument, {
    description: 'Get an investors Offered Document by the documentId',
  })
  async offeredDocument(
    @Ctx() { user }: Context,
    @Arg('documentID', () => Int) documentID: number,
  ): Promise<OfferedDocument | undefined> {
    return DocumentOfferService.offeredDocument(user.ID, documentID);
  }

  @Authorized(JWT_ROLE.investor, JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => Document, {
    nullable: true,
    description: 'Get single document',
  })
  async document(@Arg('documentID', () => Int) documentID: number): Promise<Document | undefined> {
    return Document.findOne({ ID: documentID });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [SubmittedDocument], {
    description: 'Get investors Submitted Documents',
  })
  async submittedDocuments(
    @Ctx() { user }: Context,
    @Arg('minStatus', () => Int) minStatus: number,
  ): Promise<SubmittedDocument[]> {
    return DocumentService.submittedDocuments(user.ID, minStatus);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => SubmittedDocument, {
    nullable: true,
    description: 'Get investors Submitted Document by Id',
  })
  async submittedDocument(
    @Ctx() { user }: Context,
    @Arg('submittedDocumentID', () => Int) submittedDocumentID: number,
  ): Promise<SubmittedDocument | undefined> {
    return DocumentService.submittedDocument(user.ID, submittedDocumentID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => SubmittedDocument, {
    nullable: true,
    description: 'Get investors Unfinished Documents',
  })
  async unfinishedDocument(
    @Ctx() { user }: Context,
    @Arg('documentID', () => Int) documentID: number,
  ): Promise<SubmittedDocument | undefined> {
    return DocumentService.unfinishedDocument(user.ID, documentID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [DocumentField], {
    description: 'Get all Document Fields of a Document',
  })
  async documentFields(@Arg('documentID', () => Int) documentID: number): Promise<DocumentField[]> {
    return DocumentField.find({ documentID: documentID });
  }

  @Authorized(JWT_ROLE.investor, JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => [SharePurchaseDocument], {
    description: 'Get documents required for purchasing shares',
  })
  async sharePurchaseDocuments(
    @Ctx() { user }: Context,
    @Arg('sharePurchaseID', () => Int) sharePurchaseID: number,
    @Arg('investorID', () => Int, { nullable: true, description: 'Include if using admin role' })
    investorID?: number,
  ): Promise<
    {
      requireOnce: boolean;
      document: Document;
      status?: number;
    }[]
  > {
    if (
      (user.role === JWT_ROLE.platformAdmin || user.role === JWT_ROLE.api) &&
      investorID &&
      !Number.isNaN(investorID) &&
      investorID <= 0
    )
      throw new ForbiddenError(
        `must provide investorID on admin/API role; must not provide it on investor role`,
      );
    return SharePurchaseService.index(sharePurchaseID, investorID ?? user.ID);
  }

  @Authorized(JWT_ROLE.investor, JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => SubmittedDocument, {
    nullable: true,
    description: 'Get Submitted Document corresponding to Share Purchase ID',
  })
  async sharePurchaseDocument(
    @Ctx() { user }: Context,
    @Arg('sharePurchaseID', () => Int) sharePurchaseID: number,
    @Arg('documentID', () => Int) documentID: number,
    @Arg('investorID', () => Int, { nullable: true, description: 'Include if using admin role' })
    investorID?: number,
  ): Promise<SubmittedDocument | undefined> {
    if (
      (user.role === JWT_ROLE.platformAdmin || user.role === JWT_ROLE.api) &&
      investorID &&
      !Number.isNaN(investorID) &&
      investorID <= 0
    )
      throw new ForbiddenError(
        `must provide investorID on admin/API role; must not provide it on investor role`,
      );
    return SharePurchaseService.findOne(sharePurchaseID, documentID, investorID ?? user.ID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [DocumentUserFieldValue], {
    description: 'Get Submitted Document corresponding to Share Purchase ID',
  })
  async getPrefilledDocumentValues(
    @Ctx() { user }: Context,
    @Arg('sharePurchaseID', () => Int) sharePurchaseID: number,
    @Arg('documentID', () => Int) documentID: number,
  ): Promise<DocumentUserFieldValue[]> {
    const { prefilledFields } = await externalDocumentsPrefill(
      sharePurchaseID,
      user.ID,
      documentID,
    );
    return prefilledFields.map((p) => {
      return {
        ID: p.tabLabel,
        value: p.value,
      };
    });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => String, {
    description: 'Get DocuSign URL for signing redirect',
  })
  async getDocuSignUrl(
    @Ctx() { user }: Context,
    @Arg('sharePurchaseID', () => Int) sharePurchaseID: number,
    @Arg('documentID', () => Int) documentID: number,
    @Arg('preferredReturnURL', () => String, {
      description: `This is where the user will be redirected after signing the document. 
      The following ending parameters will be added to it: sharepurchaseid:number documentid:number envelopeid:string
      If no URL is provided, the following link will be used: {sto0?.stolinkfull}/share-purchase-docu-sign-return?sharepurchaseid=number&documentid=number&envelopeid=string`,
    })
    preferredReturnURL?: string,
  ): Promise<string | undefined> {
    return new DocusignService().getDocusignRedirect(
      sharePurchaseID,
      user.ID,
      documentID,
      preferredReturnURL,
    );
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description:
      'Set DocuSign signature for document. Similar to setSharePurchaseDocumentSignature.',
  })
  async setDocuSignSignature(
    @Ctx() { user }: Context,
    @Arg('sharePurchaseID', () => Int) sharePurchaseID: number,
    @Arg('documentID', () => Int) documentID: number,
    @Arg('docusignEnvelopeID', () => String) docusignEnvelopeID: string,
  ): Promise<boolean> {
    try {
      await new DocusignService().completeSigning(
        sharePurchaseID,
        user.ID,
        documentID,
        docusignEnvelopeID,
      );
      console.log(`${user.ID} SIGNED ${sharePurchaseID}/${documentID}`);
      return true;
    } catch (e) {
      console.log(`${(e as Error).stack}`);
      throw new Error(`Could not complete DocuSign signature.`);
    }
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => String, {
    description: 'Send a HelloSign contract signing request to the investor',
  })
  async sendHelloSignTemplateSignRequest(
    @Ctx() { user }: Context,
    @Arg('sharePurchaseID', () => Int) sharePurchaseID: number,
    @Arg('documentID', () => Int) documentID: number,
  ): Promise<string | undefined> {
    try {
      return await new HelloSignService().sendHelloSignTemplateSignRequest(
        sharePurchaseID,
        user.ID,
        documentID,
      );
    } catch (e) {
      console.error(`${(e as Error).stack}`);
    }
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [DocumentComment], {
    description: 'Get investors Comments',
  })
  async comments(@Arg('documentID', () => Int) documentID: number): Promise<DocumentComment[]> {
    return CommentsService.find(documentID);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Int, {
    description: 'Mutation for document comment creation',
  })
  async createComment(
    @Ctx() { user }: Context,
    @Arg('documentID', () => Int) documentID: number,
    @Arg('text') text: string,
  ): Promise<number> {
    const result = await CommentsService.create(0, user.ID, documentID, text);
    return result.ID;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for document comment updation',
  })
  async updateComment(
    @Ctx() { user }: Context,
    @Arg('commentID', () => Int) commentID: number,
    @Arg('text') text: string,
  ): Promise<boolean> {
    return CommentsService.update(0, user.ID, commentID, text);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for document comment deletion',
  })
  async deleteComment(
    @Ctx() { user }: Context,
    @Arg('commentID', () => Int) commentID: number,
  ): Promise<boolean> {
    return CommentsService.deleteUtil(0, user.ID, commentID);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => String, {
    description: 'Mutation for document setSignature',
  })
  async setSignature(
    @Ctx() { user }: Context,
    @Arg('documentID', () => Int) documentID: number,
    @Arg('base64') base64: string,
  ): Promise<string> {
    return SignatureService.setSignature(user.ID, documentID, base64);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for document sendContract',
  })
  async sendContract(
    @Ctx() { user }: Context,
    @Arg('documentID', () => Int) documentID: number,
  ): Promise<boolean> {
    return SignatureService.sendDocument(user.ID, documentID);
  }

  @Authorized(JWT_ROLE.investor, JWT_ROLE.platformAdmin)
  @Mutation(() => String, {
    description: 'Mutation for document setSharePurchaseDocumentSignature',
  })
  async setSharePurchaseDocumentSignature(
    @Ctx() { user }: Context,
    @Arg('documentID', () => Int) documentID: number,
    @Arg('base64') base64: string,
    @Arg('sharePurchaseID', () => Int) sharePurchaseID: number,
    @Arg('investorID', () => Int, { nullable: true, description: 'Include if using admin role' })
    investorID?: number,
  ): Promise<string> {
    if (
      (user.role === JWT_ROLE.platformAdmin || user.role === JWT_ROLE.api) &&
      investorID &&
      !Number.isNaN(investorID) &&
      investorID <= 0
    )
      throw new ForbiddenError(
        `must provide investorID on admin/API role; must not provide it on investor role`,
      );
    return SharePurchaseSignatureService.setSharePurchaseDocumentSignature(
      user.ID,
      documentID,
      base64,
      sharePurchaseID,
    );
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for document sendSharePurchaseContract',
  })
  async sendSharePurchaseContract(
    @Ctx() { user }: Context,
    @Arg('documentID', () => Int) documentID: number,
    @Arg('sharePurchaseID', () => Int) sharePurchaseID: number,
  ): Promise<boolean> {
    return SharePurchaseSignatureService.sendSharePurchaseContract(
      user.ID,
      documentID,
      sharePurchaseID,
    );
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for document deleteSharePurchaseRequest',
  })
  async deleteSharePurchaseRequest(
    @Arg('documentID', () => Int) documentID: number,
  ): Promise<boolean> {
    try {
      return await SharePurchaseService.deleteSharePurchaseRequest(documentID);
    } catch (e) {
      return false;
    }
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for document setSubmittedDocument',
  })
  async setSubmittedDocument(
    @Ctx() { user }: Context,
    @Arg('documentID', () => Int) documentID: number,
    @Arg('fieldValues', () => [DocumentFieldValueDTO]) fieldValues: DocumentFieldValueDTO[],
  ): Promise<boolean> {
    await SignatureService.setSubmittedDocument(user.ID, documentID, fieldValues);
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for document setSubmittedSharePurchaseDocument',
  })
  async setSubmittedSharePurchaseDocument(
    @Ctx() { user }: Context,
    @Arg('documentID', () => Int) documentID: number,
    @Arg('sharePurchaseID', () => Int) sharePurchaseID: number,
    @Arg('fieldValues', () => [DocumentFieldValueDTO]) fieldValues: DocumentFieldValueDTO[],
  ): Promise<boolean> {
    await SharePurchaseSignatureService.setSubmittedDocument(
      user.ID,
      documentID,
      sharePurchaseID,
      fieldValues,
    );
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => String, {
    description: 'Get Url of Signed HelloSign Document',
  })
  async downloadSignedHelloSign(@Arg('fileID') fileID: string): Promise<string> {
    return new HelloSignService().downloadSignedDocument(fileID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => String, {
    description: 'Get Signed DocuSign Document base64',
  })
  async downloadSignedDocuSign(@Arg('envelopeID') envelopeID: string): Promise<string> {
    return new DocusignService().downloadSignedDocument(envelopeID);
  }
}

export default DocumentsResolver;
