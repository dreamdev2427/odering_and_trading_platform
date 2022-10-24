import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int, GraphQLTimestamp } from 'type-graphql';

interface LogData {
  stoID?: number;
  userID?: number;
  description?: string;
  investorID?: number;
  activityType: number;
  recID?: number;
  printLog?: boolean;
}

export enum LOG_ACTION {
  AdminDepositApproved = 18,
  InvestorLogin = 19,
  ProjectAdminLogin = 20,
  SharePurchaseRequestReceived = 21,
  AdminSharePurchaseRequestReceived = 26,
  InvestorLoginSSO = 33,
  PlatformAdminApiAction = 34,
  SellBackAlertReceived = 37,
  DividendAward = 40,
  DividendErase = 41,
  SharePurchaseStatusUpdateApi = 45,
}

const generateDescription = (data: LogData) => {
  if (data.description) {
    return data.description;
  }

  switch (data.activityType) {
    case 18:
      return `Deposit payment received for investor ID: ${data.investorID}, alert: ${data.recID}`;
    case 19:
      return 'Investor Log In';
    case 20:
      return 'Project Administrator Log In';
    case 21:
      return `Request For Share Purchasing Received. InvestorBuyPropertyAlert.ID = ${data.recID}`;
    case 26:
      return `Admin Receiving a Payment Request. InvestorDepositReceivedAlert.ID = ${data.recID}`;
    case 33:
      return 'SSO Investor Log In';
    case 34:
      return `Platform Admin API Action: ${data.description}`;
    case 37:
      return `Request For Share Sell Back Received. InvestorBuyPropertyAlert.ID = ${data.recID}`;
    case 45:
      return `BuyAlert status updated by API. InvestorBuyPropertyAlert.ID = ${data.recID}`;
  }
};

@Entity('logs')
@ObjectType('Log')
class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'Userid',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  userID?: number;

  @Column({
    type: 'int',
    name: 'stoid',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  stoID?: number;

  @Column({
    type: 'datetime',
    name: 'LogDate',
    nullable: true,
  })
  @Field(() => GraphQLTimestamp, { nullable: true })
  logDate?: Date;

  @Column({
    type: 'text',
    name: 'Description',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column({
    type: 'int',
    name: 'InvestorID',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  investorID?: number;

  @Column({
    type: 'int',
    name: 'ActivityType',
  })
  @Field(() => Int)
  activityType: number;
  // TODO: Define activity types as enum

  @Column({
    type: 'int',
    name: 'recid',
    default: 0,
  })
  recID: number;

  static async createLog(data: LogData): Promise<void> {
    const log = this.create({
      description: generateDescription(data),
      logDate: new Date(),
      ...data,
    });

    await log.save();

    if (data.printLog === true) this.consoleLog(log);
  }

  static consoleLog(data: Log): void {
    console.log(
      `Log Date: ${(data.logDate || new Date()).toISOString()} 
       Description: ${data.description || '-'}
       STO ID: ${data.stoID || '-'}
       User ID: ${data.userID || '-'}
       Investor ID: ${data.investorID || '-'}
       Activity Type: ${data.activityType}
       Rec ID: ${data.recID || '-'}`,
    );
  }
}

export default Log;
