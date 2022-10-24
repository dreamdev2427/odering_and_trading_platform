import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity('cloudFiles')
@ObjectType()
export default class CloudFiles extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'varchar',
    length: 1000,
    name: 'filename',
  })
  @Field()
  fileName: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
    name: 'url',
  })
  @Field({ nullable: true })
  url?: string;

  @Field()
  modified: Date;
}
