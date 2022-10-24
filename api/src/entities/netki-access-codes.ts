import { Entity, Column, BaseEntity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Investor } from './index';

@Entity('netki_access_codes')
export class NetkiAccessCode extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, name: 'access_code' })
  accessCode: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  investorID?: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  childAccessCode?: string;

  @ManyToOne(() => Investor)
  @JoinColumn({ name: 'investorID' })
  investor?: Promise<Investor>;
}

export default NetkiAccessCode;
