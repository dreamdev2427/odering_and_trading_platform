import { InvestorBuyPropertyAlert, MoonpayTransactionData } from 'entities';
import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

/**
 * Relation between InvestorBuyPropertyAlert and MoonpayTransactionData on transactions which relate to buying shares.
 */
@ObjectType()
@Entity('MoonpayBuyAlerts')
// @Index(['transactionID', 'alertID'], { unique: true })
export default class MoonpayBuyAlert extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
  })
  transactionID: number;

  @PrimaryColumn({
    type: 'int',
  })
  @Field(() => Int)
  alertID: number;

  @Field(() => MoonpayTransactionData)
  @OneToOne(() => MoonpayTransactionData, (transaction) => transaction.ID)
  transaction: MoonpayTransactionData;

  @Field(() => InvestorBuyPropertyAlert)
  @OneToOne(() => InvestorBuyPropertyAlert, (alert) => alert.ID)
  @JoinColumn({ name: 'alertID' })
  alert: Promise<InvestorBuyPropertyAlert>;
}
