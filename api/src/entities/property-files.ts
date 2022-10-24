import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

import { PARAM } from '../core/envs';
import { Params, Stos } from '.';

export enum FileType {
  IMAGE = 1,
  DOCUMENT = 2,
}

@Entity('PropertyFiles')
@ObjectType('PropertyFile')
class PropertyFiles extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    enum: FileType,
    name: 'stoid',
  })
  stoID: number;

  @ManyToOne(() => Stos)
  sto: Promise<Stos>;

  @Column({
    type: 'int',
    name: 'Type',
  })
  type: FileType;

  @Column({
    type: 'varchar',
    length: 2000,
    name: 'Details',
  })
  details: string;

  @Column({
    type: 'varchar',
    length: 400,
    name: 'Title',
  })
  @Field()
  title: string;

  @Column({
    type: 'varchar',
    length: 200,
    name: 'Link',
  })
  link: string;

  @Field(() => String)
  async url(): Promise<string> {
    // if image uploaded on gcs
    if (this.link?.includes('http')) {
      return this.link;
    }
    const areHostNamesEnabled = (
      await Params.findOneOrFail({ param: PARAM.ARE_HOST_NAMES_ENABLED })
    ).intValue;
    const sto = await this.sto;
      // if singleDomain enabled, remove unique ID in front of domain
      const stoLink =
        sto.ID > 0 && areHostNamesEnabled === 0
          ? `https://${sto.stolinkfull.substring(sto.stolinkfull.indexOf('.') + 1)}`
          : sto.stolinkfull;

    const path = '/img/stobanners/';
    return `${stoLink}${path}${this.link}`;
  }
}

export default PropertyFiles;
