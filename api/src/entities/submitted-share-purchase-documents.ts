import { Entity, BaseEntity, JoinColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Document, DocumentUser, SharePurchaseDocument } from 'entities';

@Entity('submittedSharePurchaseDocuments')
@ObjectType()
export default class SubmittedSharePurchaseDocument extends BaseEntity {
  @PrimaryColumn({
    type: 'int',
  })
  @Field(() => Int)
  sharePurchaseRequestID: number;

  @PrimaryColumn({
    type: 'int',
    name: 'submittedDocumentID',
  })
  @Field(() => Int)
  submittedDocumentID: number;

  @ManyToOne(() => DocumentUser)
  @JoinColumn({
    name: 'submittedDocumentID',
    referencedColumnName: 'documentID',
  })
  @Field(() => DocumentUser)
  submittedDocument: Promise<DocumentUser>;

  @ManyToOne(() => SharePurchaseDocument)
  @JoinColumn({
    name: 'submittedDocumentID',
  })
  @Field(() => SharePurchaseDocument, { nullable: true })
  sharePurchaseDocument?: Promise<SharePurchaseDocument>;

  // @ManyToOne(() => Document)
  // @JoinColumn({
  //   name: 'submittedDocumentID',
  // })
  @Field(() => Document, { nullable: true })
  document?: Promise<Document>;
}
