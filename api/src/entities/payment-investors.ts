import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
class PaymentInvestors extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'int',
    name: 'stoid',
  })
  stoID: number;

  @Column({
    type: 'tinyint',
    width: 4,
  })
  paymentType: number;

  @Column({
    type: 'varchar',
    length: 400,
    nullable: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 400,
    nullable: true,
    name: 'paymentDetails',
  })
  details: string;

  @Column({
    type: 'int',
  })
  currencyID: number;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  isActive: number;

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
}

export default PaymentInvestors;
