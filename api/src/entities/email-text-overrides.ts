import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, Unique, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity('emailtextoverrides')
@Unique(['stoID', 'locale', 'emailKey', 'key'])
@ObjectType('EmailTextOverride')
class EmailTextOverride extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @PrimaryColumn({
    type: 'int',
    default: '0',
  })
  @Field(() => Int)
  stoID: number;

  @PrimaryColumn({
    type: 'varchar',
    length: 14,
    default: 'en',
  })
  @Field()
  locale: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 128,
  })
  @Field()
  emailKey: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 128,
  })
  @Field()
  key: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field({ nullable: true })
  value?: string;
}

export default EmailTextOverride;
