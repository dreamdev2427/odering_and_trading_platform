import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
class InvestingEntityTypes extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'varchar',
    default: 255,
  })
  @Field()
  title: string;

  @Column({
    type: 'simple-json',
    default: '["ALL"]',
  })
  @Field(() => [String])
  countries: string[];
}

export default InvestingEntityTypes;
