import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

@Entity('investorpublickeys')
@ObjectType('PublicKey')
class InvestorPublicKeys extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    default: 0,
  })
  investorID: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  blockchainID: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Field()
  title: string;
}

export default InvestorPublicKeys;
