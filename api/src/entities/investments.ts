import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
class Investments extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'int',
    name: 'stoid',
  })
  stoID: number;

  @Column({
    type: 'int',
    name: 'UserID',
  })
  userID: number;

  @Column({
    type: 'int',
    name: 'InvestorID',
  })
  investorID: number;

  @Column({
    type: 'decimal',
    default: 0,
    name: 'TokensTransferred',
  })
  tokens: number;

  @Column({
    type: 'decimal',
    default: 0,
    name: 'AmountInvested',
  })
  amount: number;

  @Column({
    type: 'int',
    name: 'CurrencyID',
  })
  currencyID: number;

  @Column({
    type: 'text',
    nullable: true,
    name: 'Description',
  })
  description: string;

  @Column({
    type: 'int',
  })
  sharetypeid: number;

  @Column({
    type: 'date',
    nullable: true,
    name: 'DateTime',
  })
  date: Date;
}

export default Investments;
