import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('investor_brokers')
class InvestorBrokers extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'int',
  })
  investorID: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  brokerID: string;
}

export default InvestorBrokers;
