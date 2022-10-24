import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity('documentfieldvalues')
@ObjectType()
export default class DocumentFieldValue extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'userid',
    nullable: true,
  })
  @Field({ nullable: true })
  userID?: number;

  @Column({
    type: 'int',
    name: 'fieldid',
    nullable: true,
  })
  @Field({ nullable: true })
  fieldID?: number;

  @Column({
    type: 'int',
    name: 'documentID',
    nullable: true,
  })
  @Field(() => Int)
  documentID?: number;

  @Column({
    type: 'mediumtext',
    name: 'value',
    nullable: true,
  })
  @Field()
  value?: string;
}
