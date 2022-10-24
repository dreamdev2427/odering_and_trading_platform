import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { VotingOptions } from '.';

@ObjectType('VotingDocuments')
@Entity('votingdocuments')
class VotingDocuments extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'votingid',
  })
  @Field(() => Int)
  votingID: number;

  @Column({
    type: 'int',
    name: 'votingoptionid',
    nullable: true,
  })
  @Field(() => Int)
  votingOptionID: number;

  @ManyToOne(() => VotingOptions, (option) => option.documents)
  @Field(() => VotingOptions)
  votingOption: VotingOptions;

  @Column({
    type: 'varchar',
    length: 800,
    name: 'documentlink',
    nullable: true,
  })
  @Field()
  documentLink: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  @Field()
  title: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  @Field({ nullable: true })
  description: string;
}

export default VotingDocuments;
