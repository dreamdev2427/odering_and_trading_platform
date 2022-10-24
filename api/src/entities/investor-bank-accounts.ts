import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity('investorbanks')
@ObjectType('InvestorBanks')
class InvestorBanks extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'int',
    name: 'investorid',
  })
  investorID: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  accountTitle: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Field()
  accountNo: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Field()
  routingNumber: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Field()
  iban: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  accountHolderName: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  accountHolderCity: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  accountHolderCountry: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  accountHolderAddress: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  accountPostalCode: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  bankName: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  bankCity: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  bankCountry: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  bankAddress: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Field()
  swift: string;
}

export default InvestorBanks;
