import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import Investor from './investor';

@Entity('investorsto')
@ObjectType()
class InvestorSto extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'tinyint',
    width: 4,
    default: 0,
  })
  @Field(() => Int)
  isAccountClosed: number;

  @Column({
    type: 'int',
    name: 'investorid',
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'int',
    name: 'stoid',
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  expectedShares: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  expectedInvestment: number;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  @Field(() => Int)
  isKYC: number;

  @Column({
    type: 'tinyint',
    default: false,
    name: 'KYCApplied',
  })
  @Field(() => Boolean)
  applied: boolean;

  @Column({
    type: 'date',
    name: 'KYCUpdateDate',
  })
  @Field({ nullable: true })
  updateDate: string;

  @Column({
    type: 'int',
    default: 0,
    name: 'KYCCurrentStatus',
  })
  @Field(() => Int)
  status: number;

  @Column({
    type: 'mediumtext',
    nullable: true,
  })
  @Field({ nullable: true })
  inviteFriendEmailText: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'UsufructuariesFirstName',
  })
  @Field({ nullable: true })
  usufructuaryFirstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'UsufructuariesLastName',
  })
  @Field({ nullable: true })
  usufructuaryLastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'UsufructuariesAddress',
  })
  @Field({ nullable: true })
  usufructuaryAddress: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'UsufructuariesCity',
  })
  @Field({ nullable: true })
  usufructuaryCity: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'UsufructuariesCountry',
  })
  @Field({ nullable: true })
  usufructuaryCountry: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'UsufructuariesEmail',
  })
  @Field({ nullable: true })
  usufructuaryEmail: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'BeneificalFirstName',
  })
  @Field({ nullable: true })
  beneficialFirstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'BeneificalLastName',
  })
  @Field({ nullable: true })
  beneficialLastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'BeneificalAddress',
  })
  @Field({ nullable: true })
  beneficialAddress: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'BeneificalCity',
  })
  @Field({ nullable: true })
  beneficialCity: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'BeneificalCountry',
  })
  @Field({ nullable: true })
  beneficialCountry: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'BeneificalEmail',
  })
  @Field({ nullable: true })
  beneficialEmail: string;

  @Column({
    type: 'date',
    nullable: true,
    name: 'BeneificalDOB',
  })
  @Field({ nullable: true })
  beneficialBirth: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'BeneificalNationality',
  })
  @Field({ nullable: true })
  beneficialNationality: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  @Field(() => Int)
  isUsufructuary: number;

  @Column({
    type: 'tinyint',
    width: 4,
    default: 1,
  })
  @Field(() => Int)
  isActive: number;

  @Column({
    type: 'text',
    default: '',
  })
  @Field({ nullable: true })
  notes: string;

  @Column({
    type: 'varchar',
    length: 4000,
    nullable: true,
    name: 'dividendbank',
  })
  dividendBank: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    name: 'dividendcrypto',
  })
  dividendCrypto: string;

  @Column({
    type: 'date',
    nullable: true,
    name: 'KycExpiryDate',
  })
  @Field({ nullable: true })
  KycExpiryDate: string;

  @ManyToOne(() => Investor, (investor) => investor.ID, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'investorid' })
  investor: Promise<Investor>;
}

export default InvestorSto;
