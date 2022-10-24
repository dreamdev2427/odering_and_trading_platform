import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Field, Int, ObjectType, GraphQLTimestamp, registerEnumType } from 'type-graphql';
import { ShareTypes, PaymentChannels } from 'entities';
import InvestorBuyPropertyAlert from './investor-buy-property-alert';

export enum INVOICE_STATUS_TYPE {
  Unpaid = 0,
  PendingVerification = 1,
  Paid = 2,
  Declined = 3,
  /** Failure with payment processor */
  PaymentFailure = 4,
  /** Awaiting payment processor */
  PaymentOngoing = 5,
  /** Awaiting payment processor interaction */
  PaymentAwaiting = 6,
}

registerEnumType(INVOICE_STATUS_TYPE, {
  name: 'INVOICE_STATUS_TYPE',
  description: 'InvoiceStatusType',
});

@Entity('InvestorInvoices')
@ObjectType('InvestorInvoices')
class InvestorInvoices extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column()
  @Field(() => Int)
  stoID: number;

  @Column()
  @Field(() => Int)
  buyAlertID: number;

  @Column()
  @Field(() => Int)
  investorID: number;

  @Column()
  @Field(() => Int)
  shareTypeID: number;

  @ManyToOne(() => ShareTypes)
  @JoinColumn({ name: 'shareTypeID' })
  @Field(() => ShareTypes)
  shareType: Promise<ShareTypes>;

  @Column()
  @Field(() => Int)
  paymentChannelID: number;

  @ManyToOne(() => PaymentChannels)
  @JoinColumn({ name: 'paymentChannelID' })
  @Field(() => PaymentChannels, { nullable: true })
  paymentChannel: Promise<PaymentChannels>;

  @OneToOne(() => InvestorBuyPropertyAlert, (buyAlert) => buyAlert.ID)
  @JoinColumn({ name: 'buyAlertID' })
  @Field(() => InvestorBuyPropertyAlert)
  buyAlert: Promise<InvestorBuyPropertyAlert>;

  @Column()
  @Field()
  shares: number;

  @Column()
  @Field()
  amountToPay: number;

  @Column({
    type: 'int',
  })
  @Field(() => INVOICE_STATUS_TYPE)
  status: INVOICE_STATUS_TYPE;

  @Column()
  @Field(() => Boolean)
  isBlockchain: boolean;

  @Column()
  @Field(() => GraphQLTimestamp)
  dateCreated: Date;

  @Column({ nullable: true })
  @Field(() => GraphQLTimestamp, { nullable: true })
  dateUpdated: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  invoiceDescription: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  investorWallet: string;
}

export default InvestorInvoices;
