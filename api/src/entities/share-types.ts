import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int, Float } from 'type-graphql';
import * as math from 'mathjs';

import { convertToNumber } from 'core/helpers';
import Currency from './currency';

@Entity('sharetypes')
@ObjectType('ShareType')
class ShareTypes extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  title: string;

  @Column({
    type: 'int',
    name: 'stoid',
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  totalShares: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  companyShares: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  custodianShares: number;

  @Column({
    type: 'decimal',
    precision: 33,
    scale: 16,
    default: '0.0000000000000000',
  })
  @Field(() => Float)
  nominalValue: number;

  @Column({
    type: 'tinyint',
    default: '0',
  })
  isNominalValueApplicable: number;

  @Column({
    type: 'tinyint',
    default: '0',
  })
  isVotingRightsApplicable: number;

  @Column({
    type: 'tinyint',
    default: '0',
  })
  isDividendRightsApplicable: number;

  @Column({
    type: 'tinyint',
    default: '0',
    name: 'isblockchain',
  })
  @Field(() => Boolean)
  isBlockchain: boolean;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field(() => String, { nullable: true })
  ethereumContractAddress: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  ethereumWhitelistAddress: string;

  @Column({
    type: 'decimal',
    precision: 33,
    scale: 16,
    default: '0.0000000000000000',
    name: 'premimum',
  })
  @Field(() => Float)
  premiumValue: number;

  @Column({
    type: 'int',
    name: 'currencyid',
  })
  @Field(() => Int)
  currencyID: number;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: 'currencyid' })
  @Field(() => Currency)
  currency: Promise<Currency>;

  @Column({
    type: 'tinyint',
    default: 1,
    name: 'needauthorization',
  })
  needAuthorization: number;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'token_abi',
  })
  tokenAbi: string;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'whitelist_abi',
  })
  whitelistAbi: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  ethereumBlockchainPublicAddress: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    default: 'default',
    name: 'subscriptionform',
  })
  subscriptionForm: string;

  @Column({
    type: 'decimal',
    precision: 33,
    scale: 4,
    default: '0.0000',
  })
  @Field(() => Float)
  minimumSharesToBuyByInvestor: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  blockchainProtocol: number;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  blockchainBuyOrdersAllowed: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
    nullable: true,
  })
  @Field(() => Float)
  reduceSharesForPurchase?: number;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  isEnabled: number;

  @Column({
    type: 'int',
    default: 0,
    name: 'walletCustodayType',
  })
  @Field(() => Int)
  walletCustodyType: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  tanganyWalletID: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  investorCanPurchaseDirectly: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'AssetName',
  })
  assetName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'AssetTag',
  })
  assetTag: string;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    default: '1.00',
  })
  votingPower: number;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  isMeetingRightsApplicable: number;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  isInvestorTradable: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
  })
  @Field(() => Boolean)
  sellToCompany: boolean;

  @Column({
    type: 'decimal',
    precision: 33,
    scale: 16,
    default: '0.0000000000000000',
  })
  @Field(() => Float)
  sellValue: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  @Field(() => Boolean)
  isShareNosApplicable: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  @Field(() => Boolean)
  isCertificateNosApplicable: boolean;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  channelIDForAutoPayments: number;

  @Field(() => Float)
  availableShare(): number {
    const result = math.round(
      math.subtract(
        math.number(this.companyShares),
        math.number(this.reduceSharesForPurchase ?? 0),
      ) as number,
      3,
    );
    return +result;
  }

  @Field()
  totalPrice(): number {
    return convertToNumber(this.premiumValue, 3);
  }

  @Column({
    type: 'int',
    default: 18,
  })
  @Field(() => Int)
  blockchaindecimals: number;
}

export default ShareTypes;
