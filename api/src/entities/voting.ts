import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import moment from 'moment';

import { Timezone } from './index';

@Entity()
@ObjectType('Meeting')
class Voting extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
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
    length: 1000,
  })
  @Field()
  title: string;

  @Column({
    type: 'text',
    name: 'contents',
  })
  content: string;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  type: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  nameResponsiblePerson?: string | null;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  phoneResponsiblePerson?: string | null;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  emailResponsiblePerson?: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  nameProxyPerson?: string | null;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  phoneProxyPerson?: string | null;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  emailProxyPerson?: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  place?: string | null;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'opendate'
  })
  @Field(() => Date, { nullable: true })
  openDate?: Date | null;

  @Field( { nullable: true })
  opendate(): string {
    if (!this.openDate) {
      return '';
    }

    return moment(this.openDate).format('MMMM D YYYY')
  }

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'closedate'
  })
  @Field(() => Date, { nullable: true })
  closeDate?: Date | null;

  @Field({ nullable: true })
  closedate(): string {
    if (!this.closeDate) {
      return '';
    }

    return moment(this.closeDate).format('MMMM D YYYY')
  }

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
    name: 'secretaccesscode',
  })
  secretAccessCode?: string | null;

  @Column({
    type: 'int',
    default: 0,
    name: 'votetype',
  })
  @Field(() => Int)
  voteType: number;

  @Column({
    type: 'int',
    default: 0,
  })
  isMeetingFinalResultsCalculated: number;

  @Column({
    type: 'int',
    default: 0,
    name: 'timezoneid',
  })
  timeZoneID: number;

  @ManyToOne(() => Timezone)
  timeZone: Promise<Timezone>;

  @Field(() => String)
  async timezone(): Promise<string> {
    return (await this.timeZone).timezone;
  }

  @Column({
    type: 'int',
    default: 0,
    name: 'timepadding'
  })
  @Field(() => Int)
  timePadding: number;

  @Column({
    type: 'int',
    default: 0,
  })
  totalInvestors: number;

  @Column({
    type: 'int',
    default: 0,
  })
  totalShares: number;

  @Column({
    type: 'int',
    default: 0,
  })
  totalNominalShares: number;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  isVotingOpenForProxy?: number | null;

  starttime: string;

  closetime: string;
}

export default Voting;
