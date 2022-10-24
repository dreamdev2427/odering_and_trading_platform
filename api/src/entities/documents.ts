import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import DocumentOfferInvestor from './document-offer-investor';
import SubmittedDocument from './document-user';
import SharePurchaseDocument from './share-purchase-documents';

@Entity('documents')
@ObjectType()
export default class Document extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'mediumtext',
    name: 'title',
  })
  @Field()
  title: string;

  @Column({
    type: 'mediumtext',
    name: 'contents',
    default: '',
  })
  @Field({ nullable: true })
  contents?: string;

  @Column({
    type: 'int',
    name: 'stoid',
    nullable: true,
  })
  stoID?: number;

  @Column({
    type: 'int',
    name: 'directoryid',
    default: -1,
  })
  @Field()
  directoryID: number;

  @Column({
    type: 'tinyint',
    name: 'isactiveforinvestors',
    default: 0,
  })
  isActiveForInvestors?: number;

  @Column({
    type: 'int',
    name: 'filetype',
    default: 0,
  })
  @Field()
  filetype: number;

  @Column({
    type: 'int',
    name: 'offerid',
    default: 0,
  })
  offerId: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  isactiveforinvestorsType?: number;

  @Column({
    type: 'mediumtext',
    nullable: true,
  })
  isactiveforinvestorsNames?: string;

  @Column({
    type: 'simple-json',
    default: ['ALL'],
  })
  countriesWhitelist?: string[];

  @Column({
    type: 'varchar',
    length: '50',
    name: 'docusignDocumentID',
    nullable: true,
  })
  @Field({ nullable: true })
  docusignDocumentID?: string;

  @Column({
    type: 'varchar',
    length: '10000',
    name: 'investorTypesWhitelist',
    default: '["ALL"]',
  })
  investorTypesWhitelist: string;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'helloSignDocumentID',
    nullable: true,
  })
  @Field({ nullable: true })
  helloSignDocumentID?: string;

  @OneToOne(() => DocumentOfferInvestor, (offer) => offer.document)
  @Field(() => DocumentOfferInvestor, { nullable: true })
  offer: DocumentOfferInvestor;

  @OneToOne(() => SubmittedDocument, (submittedDocument) => submittedDocument.document)
  @Field(() => SubmittedDocument, { nullable: true })
  submittedDocument: SubmittedDocument;

  @OneToOne(() => SharePurchaseDocument, (sharePurchaseDocument) => sharePurchaseDocument.document)
  @Field(() => SharePurchaseDocument, { nullable: true })
  sharePurchaseDocument: SharePurchaseDocument;
}
