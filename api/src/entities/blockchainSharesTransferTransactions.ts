import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType, GraphQLTimestamp, Float } from 'type-graphql';

@Entity('blockchainSharesTransferTransactions')
@ObjectType('BlockchainSharesTransferTransactions')
class BlockchainSharesTransferTransactions extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column()
  @Field()
  hostname: string;

  @Column()
  @Field()
  toAddress: string;

  @Column({
    name: 'stoid',
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    name: 'adminid',
  })
  @Field(() => Int)
  adminID: number;

  @Column()
  @Field()
  investorID: number;

  @Column()
  @Field(() => Int)
  shareTypeID: number;

  @Column()
  @Field(() => Float)
  amountToSend: number;

  @Column({ nullable: true })
  @Field()
  investmentDetails: string;

  @Column()
  @Field(() => Float)
  investmentAmount: number;

  @Column()
  @Field()
  reduceInvestorBalance: number;

  @Column()
  @Field(() => Int)
  status: number;

  @Column()
  @Field(() => GraphQLTimestamp)
  recordDate: Date;

  @Column({ nullable: true })
  @Field()
  transactionID: string;

  @Column({ nullable: true })
  @Field()
  errorMessage: string;
}

export default BlockchainSharesTransferTransactions;
