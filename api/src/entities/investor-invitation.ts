import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
class InvestorInvitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'int',
    name: 'stoid',
  })
  stoID: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    name: 'FirstName',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    name: 'LastName',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  email: string;

  @Column({
    type: 'mediumtext',
    name: 'emailtext',
  })
  emailText: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  country: string;

  @Column({
    type: 'tinyint',
    width: 4,
    default: 0,
    name: 'currentStatus',
  })
  status: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  investorID: number;
}

export default InvestorInvitation;
