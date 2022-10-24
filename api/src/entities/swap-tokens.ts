import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

@Entity('swaptokens')
@ObjectType()
class SwapToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  @Field({ nullable: true })
  address?: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  @Field({ nullable: true })
  name?: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  @Field({ nullable: true })
  symbol?: string;
}

export default SwapToken;
