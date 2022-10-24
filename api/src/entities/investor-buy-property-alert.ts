import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  AfterRemove,
  AfterInsert,
  AfterUpdate,
  BeforeInsert,
  In,
} from 'typeorm';
import { ObjectType, Field, Int, Float, registerEnumType } from 'type-graphql';

import ShareTypes from 'entities/share-types';

import * as math from 'mathjs';

export enum PURCHASE_STATUS_TYPE {
  Unused = 0,
  Pending = 1,
  Accepted = 2,
  Declined = 3,
  /** Failure with payment processor */
  PaymentFailure = 4,
  /** Awaiting payment processor */
  PaymentOngoing = 5,
  /** Awaiting payment processor interaction */
  PaymentAwaiting = 6,
  /** Awaiting the customer to pass KYC requirements
   *  status used only when: KYC_REQUIREMENT_STEP.PrePayment is active
   */
  KycRequired = 7,
  /** Awaiting the customer to pass the Accreditation checks
   * status used only when: ACCREDITATION_REQUIREMENT_STEP_ENUM.PrePayment is active
   */
  AccreditationRequired = 8,
  PendingDocuments = 9,
}

registerEnumType(PURCHASE_STATUS_TYPE, {
  name: 'BuyAlertStatus',
  description: 'Status of a BuyAlert',
});

@Entity('InvestorBuyPropertyAlert')
@ObjectType('InvestorBuyAlert')
class InvestorBuyPropertyAlert extends BaseEntity {
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
  investorID: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  entityID: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
    name: 'Shares',
  })
  @Field(() => Float)
  shares: number;

  @Column({
    type: 'int',
    name: 'ShareTypeID',
  })
  @Field(() => Int)
  shareTypeID: number;

  @ManyToOne(() => ShareTypes)
  @JoinColumn({ name: 'ShareTypeID' })
  @Field(() => ShareTypes)
  shareType: Promise<ShareTypes>;

  @Column({
    type: 'int',
  })
  @Field(() => PURCHASE_STATUS_TYPE)
  status: PURCHASE_STATUS_TYPE;

  @Column({
    type: 'varchar',
    length: 4000,
    name: 'Details',
  })
  details: string;

  @Column({
    type: 'datetime',
    name: 'DateReceived',
  })
  @Field()
  date: string;

  @Column({
    type: 'int',
    default: 0,
    name: 'isSubScriptionFormSigned',
  })
  isSubscriptionSigned: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'SubScriptionFormPath',
  })
  subscriptionPath: string;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'SubScriptionFormContents',
  })
  subscriptionContent: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'publickey',
  })
  publicKey: string;

  @Column({
    type: 'tinyint',
    name: 'isblockchain',
  })
  isBlockchain: boolean;

  @Column({
    type: 'tinyint',
    default: 0,
    name: 'isBuySharesFormSigned',
  })
  @Field(() => Int)
  isBuySharesSigned: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'BuySharesFormPath',
  })
  buySharesPath: string;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float, { nullable: true })
  purchasePriceOffered: number;

  @Column({
    type: 'int',
    name: 'fromCurrencyID',
  })
  @Field(() => Int, { nullable: true })
  fromCurrencyID?: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  @Field(() => Boolean)
  isSellRequest: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  @Field(() => Boolean)
  isHiddenForInvestor: boolean;

  async hide(): Promise<void> {
    this.isHiddenForInvestor = true;
    await this.save();
  }

  @AfterInsert()
  @AfterUpdate()
  @AfterRemove()
  async updateShareType(): Promise<void> {
    const shareType = await ShareTypes.findOne(this.shareTypeID);
    if (shareType == undefined) return;

    // Without this, it will set the currency ID to 0 on the next save(); and then to null next time ¯\_(ツ)_/¯
    await shareType.currency;

    const activeAlerts = await InvestorBuyPropertyAlert.find({
      where: {
        status: In([
          PURCHASE_STATUS_TYPE.Pending,
          PURCHASE_STATUS_TYPE.PaymentAwaiting,
          PURCHASE_STATUS_TYPE.PaymentOngoing,
        ]),
        shareTypeID: this.shareTypeID,
      },
    });

    shareType.reduceSharesForPurchase = activeAlerts.reduce(
      (shares, alert) => math.add(math.number(shares), math.number(alert.shares)) as number,
      0,
    );
    this.shareType = Promise.resolve(await shareType.save());
  }

  @BeforeInsert()
  /** It will save as null if not awaited! */
  async awaitAll(): Promise<void> {
    await this.shareType;
  }

  /**
   * Re-calculates the available shares on the sharetypes of these alerts. Does not repeat sharetypes.
   * @param alerts
   */
  static async updateShareTypes(alerts: InvestorBuyPropertyAlert[]): Promise<void> {
    const shareTypes: number[] = [];
    await Promise.all(
      alerts.map(async (a) => {
        if (!shareTypes.includes(a.shareTypeID)) {
          await a.updateShareType();
          shareTypes.push(a.shareTypeID);
        }
      }),
    );
  }
}

export default InvestorBuyPropertyAlert;
