import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
class Inbox extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'stoid',
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'Title',
  })
  @Field()
  title: string;

  @Column({
    type: 'varchar',
    length: 7000,
    nullable: true,
    name: 'Details',
  })
  @Field()
  details: string;

  @Column({
    type: 'date',
    name: 'DateEmail',
    nullable: true,
  })
  @Field()
  date: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  @Field(() => Int)
  isResponded: number;

  @Column({
    type: 'varchar',
    length: 7000,
    nullable: true,
    name: 'Response',
  })
  @Field({
    nullable: true,
  })
  response: string;

  @Column({
    type: 'date',
    name: 'ResponseDate',
    nullable: true,
  })
  @Field({
    nullable: true,
  })
  responseDate: string;
}

export default Inbox;
