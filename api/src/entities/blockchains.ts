import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity()
@ObjectType()
class blockchains extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'title',
  })
  @Field()
  title: string;
}

export default blockchains;
