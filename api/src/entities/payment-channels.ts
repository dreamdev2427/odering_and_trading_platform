import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Int, Field, registerEnumType } from 'type-graphql';

import Currency from 'entities/currency';

export enum PAYMENT_CHANNEL_TYPE {
  Mercury,
  Internal,
  Metamask,
}
registerEnumType(PAYMENT_CHANNEL_TYPE, {
  name: 'PAYMENT_CHANNEL_TYPE',
  description: 'All Kinds of Payment Channel Types',
});

@ObjectType('PaymentChannel')
@Entity('paymentchannels')
class PaymentChannels extends BaseEntity {
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
    type: 'tinyint',
    width: 4,
    name: 'paymentType',
  })
  @Field(() => PAYMENT_CHANNEL_TYPE)
  channelType: PAYMENT_CHANNEL_TYPE;

  @Column({
    type: 'varchar',
    length: 400,
    nullable: true,
  })
  @Field()
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'paymentDetails',
  })
  @Field()
  details: string;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  currencyID: number;

  @ManyToOne(() => Currency)
  @Field(() => Currency)
  currency: Promise<Currency>;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  conversionEnabled: number;

  @Column({
    type: 'int',
    default: 0,
  })
  currencyToConvert: number;

  @Column({
    type: 'decimal',
    precision: 33,
    scale: 16,
    default: '0.0000000000000000',
  })
  conversionRate: string;

  @Column({
    type: 'tinyint',
    width: 1,
  })
  @Field(() => Boolean)
  canWithdrawFunds: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'depositInstructionText',
  })
  @Field()
  depositInstructionText: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'depositInstructionEmailHeader',
  })
  @Field()
  depositInstructionEmailHeader: string;

  @Column({
    type: 'tinyint',
    width: 1,
  })
  @Field(() => Boolean)
  sendInstructionalDepositEmail: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field()
  adminEmailHeader?: string;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: true,
  })
  @Field()
  adminEmailBody?: string;

  @Column({
    type: 'tinyint',
  })
  @Field(() => Boolean)
  sendAdminEmail?: boolean;
}

export default PaymentChannels;
