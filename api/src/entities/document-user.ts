import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Investor, InvestorBuyPropertyAlert } from 'entities';
import Document from './documents';
import CloudFiles from './cloud-files';

@ObjectType()
export class DocumentUserFieldValue {
  @Field({ nullable: true })
  ID?: string;

  @Field({ nullable: true })
  value?: string;
}

@Entity('documentuser')
@ObjectType()
export default class DocumentUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'mediumtext',
    name: 'contents',
    nullable: true,
  })
  @Field()
  contents?: string;

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
    nullable: true,
  })
  investorID?: number;

  @Column({
    type: 'int',
    name: 'stoid',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  stoID?: number;

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
    name: 'documentid',
    nullable: true,
  })
  documentID?: number;

  @Column({
    type: 'int',
    name: 'directoryid',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  directoryID?: number;

  @Column({
    type: 'int',
    name: 'documentstatus',
  })
  @Field(() => Int)
  status: number;

  @Column({
    type: 'mediumtext',
  })
  @Field()
  fieldValuesJson: string;

  @Column({
    type: 'int',
    name: 'documentofferinvestorid',
  })
  @Field(() => Int)
  documentOfferInvestorID: number;

  @Column({
    type: 'varchar',
    length: '300',
    name: 'signaturefilepath',
    nullable: true,
  })
  @Field({ nullable: true })
  signatureFilePath: string;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  @Field({ nullable: true })
  signatureDate?: Date;

  @Column({
    type: 'number',
    nullable: true,
  })
  @Field({ nullable: true })
  signatureFileID?: number;

  @Field(() => [DocumentUserFieldValue], { nullable: true })
  fieldValues?: DocumentUserFieldValue[];

  @Column({
    type: 'int',
    nullable: true,
  })
  @Field({ nullable: true })
  sharePurchaseID?: number;

  @ManyToOne(() => InvestorBuyPropertyAlert, (buyAlert) => buyAlert.ID, { nullable: true })
  @JoinColumn({ name: 'sharePurchaseID' })
  @Field(() => InvestorBuyPropertyAlert, { nullable: true })
  buyAlert: InvestorBuyPropertyAlert;

  @OneToOne(() => CloudFiles, (signature) => signature.ID)
  @JoinColumn({ name: 'signatureFileID' })
  @Field({ nullable: true })
  signature?: CloudFiles;

  @OneToOne(() => Document, (document) => document.submittedDocument)
  @JoinColumn({ name: 'documentid' })
  @Field(() => Document)
  document: Document;

  @OneToOne(() => Investor)
  @JoinColumn({ name: 'investorID' })
  investor: Investor;
}
