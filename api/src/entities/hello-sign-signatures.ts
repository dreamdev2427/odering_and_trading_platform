import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity('helloSignSignatures')
@ObjectType()
export default class HelloSignSignatures extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'mediumtext',
    name: 'signatureID',
  })
  @Field()
  signatureID: string;

  @Column({
    type: 'int',
  })
  investorBuyPropertyAlertID: number;

  @Column({
    type: 'int',
  })
  investorID: number;

  @Column({
    type: 'int',
  })
  documentID: number;

}
