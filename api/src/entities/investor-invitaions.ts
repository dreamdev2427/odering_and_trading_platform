import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

@Entity('investorinvitation')
@ObjectType()
export class InvestorInvitation extends BaseEntity {
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
    nullable: true,
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    name: 'FirstName',
  })
  @Field({ nullable: true })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    name: 'LastName',
  })
  @Field({ nullable: true })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  @Field({ nullable: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 16777215,
    name: 'emailtext',
    nullable: true,
  })
  @Field({ nullable: true })
  emailText: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  @Field({ nullable: true })
  city: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  @Field({ nullable: true })
  country: string;

  @Column({
    type: 'int',
    default: 0,
    name: 'currentStatus',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  status: number;
}

export default InvestorInvitation;
