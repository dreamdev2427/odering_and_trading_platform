import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { KycFields } from '.';

@Entity()
@ObjectType('KycPage')
class KycPages extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @OneToMany(() => KycFields, (field) => field.page)
  @Field(() => [KycFields])
  fields: Promise<KycFields[]>;

  @OneToMany(() => KycPages, (field) => field.page)
  @Field(() => [KycPages])
  pages: Promise<KycPages[]>;

  @ManyToOne(() => KycPages, (page) => page.pages)
  page: KycPages;

  @Column({
    type: 'int',
    nullable: true,
  })
  pageID?: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  title: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  @Field({ nullable: true })
  icon?: string;
}

export default KycPages;
