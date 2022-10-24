import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

@Entity('users')
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    name: 'stoid',
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    name: 'FirstName',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field()
  firstName: string;

  @Column({
    name: 'LastName',
    type: 'varchar',
    length: 255,
  })
  @Field()
  lastName: string;

  @Column({
    type: 'tinyint',
    default: 0,
    width: 1,
  })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({
    name: 'Username',
    type: 'varchar',
    length: 255,
  })
  @Field()
  username: string;

  @Column({
    name: 'Password',
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    name: 'twofactorenable',
    type: 'tinyint',
    default: 0,
    width: 1,
  })
  @Field(() => Boolean)
  isTwoFactorEnabled: boolean;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  @Field({ nullable: true })
  email: string;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
  })
  @Field(() => Boolean, { nullable: true })
  isPlatformAdminLogin: boolean;
}

export default User;
