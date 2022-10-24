import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import DocumentFieldValue from './document-field-value';
import Document from './documents';

@Entity('user')
@ObjectType()
export default class SubmittedDocument extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'submittedDocumentID',
  })
  @Field(() => Int)
  documentId: number;

  @OneToMany(() => DocumentFieldValue, (fieldValues) => fieldValues.ID)
  fieldValues: DocumentFieldValue[];

  // @Field({ nullable: true })
  // signature: DocumentSignature;

  @OneToOne(() => Document, (document) => document.submittedDocument)
  document: Document;
}
