import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity('autoCryptoPaymentReceiptProcessing')
@ObjectType()
class AutoCryptoPaymentReceiptProcessing extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    default: 0,
    name: 'investorId',
  })
  @Field()
  investorID: number;

  @Column({
    type: 'varchar',
    length: 2000,
    name: 'Details',
  })
  @Field({ nullable: true })
  details: string;

  @Column({
    type: 'int',
    default: 0,
    name: 'AmountReceived',
  })
  @Field()
  amountReceived: number;

  @Column({
    type: 'int',
    default: 0,
    name: 'CryptoCoinID',
  })
  @Field()
  cryptoCoinID: number;

  @Column({
    type: 'int',
    default: 0,
    name: 'stoid',
  })
  @Field()
  stoID: number;

  @Column({
    type: 'varchar',
    length: 400,
    name: 'TransactionHash',
  })
  @Field({ nullable: true })
  transactionHash: string;

  @Column({
    type: 'int',
    default: 0,
    name: 'isProcessedSuccessfully',
  })
  @Field()
  isProcessedSuccessfully: number;

  @Column({
    type: 'varchar',
    length: 2000,
    name: 'failureReason',
  })
  @Field({ nullable: true })
  failureReason: string;

  @Column({
    type: 'date',
    nullable: true,
    name: 'DateReceived',
  })
  @Field({ nullable: true })
  dateReceived: string;
}

export default AutoCryptoPaymentReceiptProcessing;
