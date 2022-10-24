import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { KycFieldValues, KycPages } from '.';

@Entity()
@ObjectType('KycField')
class KycFields extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @OneToMany(() => KycFieldValues, (values) => values.field)
  @Field(() => [KycFieldValues], { nullable: true })
  values: Promise<KycFieldValues[]>;

  @Column({
    type: 'int',
  })
  pageID: number;

  @ManyToOne(() => KycPages, (page) => page.fields)
  page: KycPages;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  label?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  placeholder?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  description?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  error?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  @Field()
  required: boolean;

  @Column({
    type: 'varchar',
    length: 30,
  })
  @Field()
  type: string;
}

export default KycFields;
