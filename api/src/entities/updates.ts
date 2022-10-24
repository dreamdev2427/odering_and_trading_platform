import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

@Entity()
@ObjectType('Update')
class Updates extends BaseEntity {
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
    type: 'varchar',
    length: 256,
    name: 'TITLE',
  })
  @Field()
  title: string;

  @Column({
    type: 'mediumtext',
  })
  @Field()
  details: string;

  @Column({
    type: 'varchar',
  })
  @Field()
  coverphoto: string;

  @Column({
    type: 'date',
    nullable: true,
    name: 'UpdateDate',
  })
  @Field()
  date: string;
}

export default Updates;
