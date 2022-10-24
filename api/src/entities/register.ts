import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
@ObjectType()
class Register extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Field(() => Int)
  @Column({
    type: 'int',
    name: 'stoid',
  })
  stoID: number;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'FirstName',
  })
  firstName: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'LastName',
  })
  lastName: string;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 255,
    name: 'Email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'Password',
  })
  password: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 30,
  })
  secret: string;

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0,
  })
  investorType: number;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 70,
    name: 'CompanyName',
  })
  companyName: string;

  @Field(() => Date, { nullable: true })
  @Column({
    type: 'datetime',
    nullable: true,
    name: 'dateregister',
  })
  date: Date;

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0,
  })
  referByInvestorID: number;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  brokerID?: string;
}

export default Register;
