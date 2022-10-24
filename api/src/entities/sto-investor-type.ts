import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity('stoinvestortype')
@ObjectType('StoInvestorType')
class StoInvestorType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  ID: number;

  @Field()
  @Column({
    type: 'varchar',
    length: 250,
  })
  type: string;
}

export default StoInvestorType;
