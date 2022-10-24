import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';

export enum DEFAULT_CURRENCY {
  FIAT_ONLY = 1,
  CRYPTO_ONLY,
  COMBINED,
}

registerEnumType(DEFAULT_CURRENCY, {
  name: 'DEFAULT_CURRENCY',
  description: 'default currency selection for platform admin / manage currencies page',
});

@Entity()
@ObjectType()
class Currency extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'Country',
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    name: 'Currency',
  })
  @Field()
  currency: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    name: 'Abbreviation',
  })
  @Field()
  abbreviation: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    name: 'Symbol',
  })
  @Field()
  symbol: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  @Field(() => Boolean)
  isBlockchainBased: boolean;

  @Column({
    type: 'int',
    default: 0,
    name: 'blockchainID',
  })
  @Field(() => Int)
  blockchainID: number;

  @Column({
    type: 'int',
    default: 0,
    name: 'isNative',
  })
  @Field()
  isNative: number;

  @Column({
    type: 'varchar',
    length: 200,
    name: 'cryptoReceivingAddress',
  })
  @Field({ nullable: true })
  cryptoReceivingAddress: string;

  @Column({
    type: 'varchar',
    length: 300,
    name: 'Address',
  })
  @Field({ nullable: true })
  Address: string;
}

export default Currency;
