import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity('documentfields')
@ObjectType()
export class DocumentField extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  @Field(() => Int)
  documentID: number;

  @Column({
    type: 'int',
    name: 'stoid',
    nullable: true,
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    type: 'mediumtext',
    nullable: true,
  })
  @Field(() => String)
  title: string;

  @Column({
    type: 'int',
    name: 'fieldtype',
    nullable: true,
  })
  @Field(() => Int)
  type: number;

  @Column({
    type: 'mediumtext',
    name: 'fieldhelpertext',
    nullable: true,
  })
  @Field(() => String)
  helperText: string;

  @Column({
    type: 'varchar',
    length: 80,
    name: 'fieldid',
    nullable: true,
  })
  @Field(() => String)
  fieldID: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'externalFileDataLabel',
    nullable: true,
  })
  @Field(() => String)
  externalFileDataLabel: string;
}
export default DocumentField;
