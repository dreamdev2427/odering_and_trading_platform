import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { KycFields } from '.';

@Entity()
@ObjectType('KycFiledValue')
class KycFieldValues extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'int',
  })
  fieldID: number;

  @ManyToOne(() => KycFields, (field) => field.values)
  field: KycFields;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  value: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  label?: string;
}

export default KycFieldValues;
