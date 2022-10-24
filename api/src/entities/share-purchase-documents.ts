import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import Document from './documents';

@Entity('sharePurchaseDocuments')
@ObjectType()
export default class SharePurchaseDocument extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  @Field(() => Int)
  requireOnce: number;

  @Field(() => Document)
  @OneToOne(() => Document, (document) => document.sharePurchaseDocument)
  @JoinColumn({ name: 'ID' })
  document: Promise<Document>;

  @Field(() => Int)
  status: number;
}
