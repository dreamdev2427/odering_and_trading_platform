import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { Field, Float, GraphQLTimestamp, Int, ObjectType } from 'type-graphql';

import { PropertyFiles, Shares } from 'entities';
import { FileType } from 'entities/property-files';

@ObjectType()
class InvestorCategory {
  @Field(() => Int)
  value: number;

  @Field()
  label: string;
}

@ObjectType()
export class Settings {
  @Field(() => [InvestorCategory])
  investorCategories: InvestorCategory[];

  DefaultSTOCurreny: number;

  @Field(() => Int)
  isInternalExchangeEnabled: number;

  @Field(() => String, { nullable: true })
  favicon: string;

  @Field(() => String, { nullable: true })
  tabTitle: string;
}

class RawSettings {
  InvestorCategory: Record<string, string>;

  DefaultSTOCurreny: number;

  isInternalExchangeEnabled: number;

  favicon: string;

  tabTitle: string;
}

@ObjectType()
export class ActiveProperty {
  @Field(() => Int)
  ID: number;

  @Field()
  title: string;

  @Field()
  details: string;

  @Field()
  picture: string;

  @Field()
  projectCost: number;

  @Field()
  createdAt: Date;

  @Field(() => Int)
  popularity: number;

  @Field()
  isBuyButtonEnabled?: boolean;
}

@ObjectType()
export class DetailProperty extends ActiveProperty {
  @Field()
  fullDetails: string;

  @Field(() => [PropertyFiles], { nullable: true })
  images: PropertyFiles[];

  @Field(() => [PropertyFiles], { nullable: true })
  documents: PropertyFiles[];
}

@Entity('stosMetaKeys')
@ObjectType('StosMetaKeys')
export class StosMetaKeys extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  @Field()
  key: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  type?: string;

  @Column({
    type: 'tinyint',
    width: 4,
    default: 0,
  })
  @Field(() => Int)
  order: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  @Field(() => Int)
  display: number;
}

@Entity('stosMetaValues')
@ObjectType('StoMetaValue')
export class StosMetaValues extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  stoID: number;

  @PrimaryColumn({ type: 'varchar', length: 255 })
  @Field()
  key: string;

  @Column({ type: 'longtext' })
  @Field()
  value: string;

  @Field()
  order: number;

  @Field()
  display: boolean;
}

@Entity()
@ObjectType('Sto')
class Stos extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  details: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  @Field(() => Int)
  isActive: boolean;

  @Column({
    type: 'varchar',
    length: 2000,
  })
  @Field()
  logo: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  ethereumContractAddress: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Field()
  ethereumWhitelistAddress: string;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'disclamer',
  })
  @Field()
  disclaimer: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  @Field()
  stolink: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  @Field()
  stolinkfull: string;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  stoType: number;

  @Field(() => [Int])
  @Column({
    type: 'simple-json',
    name: 'stoinvestortypes',
  })
  stoInvestorTypes: number[];

  @Column({
    type: 'mediumtext',
    nullable: true,
  })
  @Field()
  emailFooter: string;

  @Column({
    type: 'mediumtext',
    nullable: true,
  })
  steps: string;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'registrationtext',
  })
  @Field(() => String, { nullable: true })
  registrationText?: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  SMTP_Host: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  SMTP_Port: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  SMTP_User: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  SMTP_Password: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  SMTP_FromAddress: string;

  @Column({
    length: 255,
    nullable: true,
    name: 'SMTP_FromName',
  })
  SMTP_FromName: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  @Field()
  website: string;

  @Column({
    type: 'simple-json',
    name: 'stoinvestortypesnotonshareregister',
  })
  @Field(() => [Int])
  stoInvestorTypesNotOnShareRegister: number[];

  @Column({
    type: 'int',
    default: 0,
    name: 'companytype',
  })
  @Field(() => Int)
  companyType: number;

  @Column('simple-json')
  settings: RawSettings;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'registrationsuccesstext',
  })
  @Field()
  registrationSuccessText: string;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'tellafriendtext',
  })
  @Field()
  tellAFriendText: string;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'inviteFriendEmailText',
  })
  @Field()
  inviteFriendEmailText: string;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'PropertyFullDetails',
  })
  @Field()
  fullDetails: string;

  @Column({
    type: 'date',
    default: '2030-01-01',
    nullable: true,
  })
  @Field()
  exchangeOpenDate: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    name: 'propertypicture',
  })
  @Field()
  propertyPicture: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field()
  docusign_sto_contract: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field()
  docusign_sto_purchase: string;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  externalSystemID: number;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  @Field()
  projectAddress: string;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'LegalDetails',
  })
  @Field()
  legalDetails: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  affiliatePlanId: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  affiliateShareTypeId: number;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  isICOShareTypeCompany: number;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'EmailTxtInvestorBulkUpload',
  })
  emailTxtInvestorBulkUpload: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 1,
  })
  @Field(() => Boolean)
  isBuyButtonEnabled: boolean;

  @Column({
    type: 'tinyint',
    nullable: true,
    width: 4,
  })
  @Field(() => Int, { nullable: true })
  isBimountEnabled: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int, { nullable: true })
  projectCost: number;

  @Column({
    type: 'datetime',
  })
  @Field(() => GraphQLTimestamp)
  createdAt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'VerifyInvestorComHostToken',
  })
  @Field({ nullable: true })
  verifyInvestorComHostToken: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    name: 'helloSignClientID',
  })
  @Field({ nullable: true })
  helloSignClientID: string;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.00',
  })
  @Field(() => Float, { nullable: false })
  investmentReturn: number;

  @Field(() => String)
  picture(areHostNamesEnabled: boolean): string {
    // if image uploaded on gcs
    if (this.propertyPicture?.includes('http')) {
      return this.propertyPicture;
    }
    // if singleDomain enabled, remove unique ID in front of domain
    const stoLink =
      this.ID > 0 && !areHostNamesEnabled
        ? `https://${this.stolinkfull.substring(this.stolinkfull.indexOf('.') + 1)}`
        : this.stolinkfull;
    const path = '/img/stobanners/';
    return `${stoLink}${path}${this.propertyPicture}`;
  }

  @Field(() => String)
  logoUrl(): string {
    // if image uploaded on gcs
    if (this.logo?.includes('http')) {
      return this.logo;
    }
    const path = '/img/stologo/';
    return `${this.stolinkfull}${path}${this.logo}`;
  }

  @Field(() => Settings)
  parsedSettings(): Settings {
    const { InvestorCategory: rawCategories, ...settings } = this.settings;

    const categories = Object.keys(rawCategories).map((key) => ({
      value: Number(key),
      label: rawCategories[key],
    }));
    return {
      investorCategories: categories,
      ...settings,
    };
  }

  @Field(() => [PropertyFiles])
  async images(): Promise<PropertyFiles[]> {
    return PropertyFiles.find({ stoID: this.ID, type: FileType.IMAGE });
  }

  @Field(() => [PropertyFiles])
  async documents(): Promise<PropertyFiles[]> {
    return PropertyFiles.find({ stoID: this.ID, type: FileType.DOCUMENT });
  }

  @Field(() => Int)
  baseCurrencyID(): number {
    return this.settings.DefaultSTOCurreny;
  }

  @Field(() => [StosMetaValues])
  async meta(): Promise<Partial<StosMetaValues>[]> {
    const metaKeys = await StosMetaKeys.find();
    const metaValues = await StosMetaValues.find({ stoID: this.ID });
    return metaKeys.map((meta) => {
      const value = metaValues.find((v) => v.key === meta.key) ?? {
        stoID: this.ID,
        key: meta.key,
        value: '',
      };
      return {
        ...value,
        order: meta.order || 0,
        display: !!meta.display,
      };
    });
  }

  @Field(() => Int)
  async popularity(): Promise<number> {
    return Shares.count({ stoID: this.ID });
  }
}

export default Stos;
