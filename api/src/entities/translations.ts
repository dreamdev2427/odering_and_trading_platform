import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType('Translation')
class Translations extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  key: string;

  @Column({
    type: 'varchar',
    length: 3,
  })
  @Field()
  locale: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  translation: string;
}

export default Translations;
