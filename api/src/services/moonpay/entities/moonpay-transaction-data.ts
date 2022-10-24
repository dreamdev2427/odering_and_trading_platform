import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { GraphQLJSON } from 'graphql-scalars';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bson from 'bson';
import { MoonpayTransaction } from '../moonpay.types';
import { Hash } from '../helpers/hash';

/**
 * Local status.
 * Not to be confused with Moonpay's (remote) internal status.
 */
export enum MOONPAY_TRANSACTION {
  /** 0 Awaiting user to begin transaction. Least important status.
   * Technically, the transaction could be ongoing even in this status as we don't immediately know that! */
  ReservedID = 'reserved',
  /** 1 Awaiting Moonpay */
  Pending = 'pending',
  /** 2 Finished by Moonpay, success or error, but still have to fetch and store object. */
  HadResult = 'hadResult',
  /** 3 Exit state
   *
   * Completely done with failure */
  Failed = 'failed',
  /** 3 Must transfer shares */
  ToBeProcessed = 'toBeProcessed',
  /** 4 Transfering shares */
  Processing = 'processing',
  /** 5 Exit state
   *
   * Completely done */
  Processed = 'processed',
  /**
   * Exit state requiring review
   *
   * ID does not exist locally but asked to be created via API.
   * Can possibly recover from this state if we fetch it from remote
   */
  UnknownTransactionID = 'UnknownTransactionID',
  /**
   * Exit state requiring review
   *
   * ID does not exist locally but exists in Moonpay somehow.
   * Only set if remote status is not successful, to indicate that something needs to be done:
   * It can't be processed because of missing shareTypeID.
   * Can sometimes recover from this state if:
   * 1. if we fetch it from remote and it's been completed or failed
   *
   * and
   *
   * 2. if we manually find which shareTypeID was to be purchased
   */
  NotFoundLocally = 'NotFoundLocally',
  /**
   * Exit state requiring review
   *
   * Can not recover from this state but we want to know someone tried paying.
   * Somehow ID exists on our end.
   * Can also be fraudulent.
   */
  NotFoundOnRemote = 'NotFoundOnRemote',
  /**
   * Exit state requiring review
   *
   * ID does not exist anywhere. Could be fraudulent,
   * but keep track in case something is wrong.
   */
  DoesNotExist = 'DoesNotExist',
}

/**
 * Should not proceede remote interaction if status is one of these
 */
export const MOONPAY_REMOTE_EXIT_STATUSES: MOONPAY_TRANSACTION[] = [
  MOONPAY_TRANSACTION.DoesNotExist,
  MOONPAY_TRANSACTION.Failed,
  MOONPAY_TRANSACTION.HadResult,
  MOONPAY_TRANSACTION.Processed,
  MOONPAY_TRANSACTION.Processing,
  MOONPAY_TRANSACTION.ToBeProcessed,
];

@ObjectType()
@Entity('MoonpayTransactionData')
export default class MoonpayTransactionData extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  ID: number;

  // Not in GQL
  @Column({
    type: 'blob',
  })
  rawData: Buffer;

  // Not in GQL
  @Column({
    type: 'varbinary',
    length: '32',
  })
  salt: Buffer;

  // Not in DB, also could support more than one type later
  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'Data as we got it from MoonPay.',
  })
  object?: Partial<MoonpayTransaction>;

  @Field()
  @Column({
    type: 'varchar',
    length: '64',
  })
  objectType: string;

  @Column({
    type: 'datetime',
  })
  dateCreated: Date;

  @Field()
  @Column({
    type: 'datetime',
  })
  dateUpdated: Date;

  /**
   * The local status of a MoonPay transaction.
   * We create one on our end first. Then it may or may not link up to a remote one, depending on user action.
   * Then after remote is done, we process locally.
   * */
  @Field()
  @Column({
    type: 'enum',
    enum: MOONPAY_TRANSACTION,
    default: '0',
  })
  localStatus: MOONPAY_TRANSACTION;

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
    nullable: true,
  })
  referenceID?: number;

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
    nullable: true,
  })
  investorID?: number;

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
    nullable: true,
  })
  shareTypeID?: number;

  /** Do not use outside of unit tests */
  _generateSalt(): void {
    this.salt = randomBytes(32);
  }

  _generateKey(log?: boolean): Buffer {
    if (log)
      console.log(
        `KEYGEN\nsalt:${this.salt.toString('hex')}\nobjectType:${this.objectType}\ndateCreated:${
          this.dateCreated
        }\ndateUpdated:${this.dateUpdated}`,
      );
    return new Hash(`Transaction`)
      .hash(this.salt.toString('hex'))
      .hash(this.objectType)
      .hash(this.dateCreated.toISOString())
      .hash(this.dateUpdated.toISOString()).binResult;
  }

  _generateIv(): Buffer {
    return new Hash(`TransactionIV`)
      .hash(this.salt.toString('hex'))
      .hash(this.dateCreated.toUTCString()).binResult;
  }

  @BeforeUpdate()
  encrypt(): MoonpayTransactionData {
    if (!this.object) throw new Error(`Can't store transaction without object field.`);

    this.dateUpdated = new Date();

    this.salt = randomBytes(32);
    const key = this._generateKey();
    const iv = this._generateIv();
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    this.rawData = cipher.update(bson.serialize(this.object));

    if (this.rawData.length === 0) throw new Error(`Transaction rawData is created empty.`);

    return this;
  }

  @BeforeInsert()
  _insert(): MoonpayTransactionData {
    this.dateCreated = new Date();
    this.encrypt();
    return this;
  }

  @AfterLoad()
  decrypt(): MoonpayTransactionData {
    if (!this.rawData) throw new Error(`Transaction has no data.`);

    const key = this._generateKey();
    const iv = this._generateIv();
    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    const serialized = decipher.update(this.rawData);
    this.object = bson.deserialize(serialized);

    return this;
  }
}
