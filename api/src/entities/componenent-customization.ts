import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('component_customization')
@ObjectType()
class ComponentCustomization extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  @Field(() => String)
  component: string;

  @Column({
    type: 'text',
  })
  @Field(() => String)
  body: string;
}

export default ComponentCustomization;
