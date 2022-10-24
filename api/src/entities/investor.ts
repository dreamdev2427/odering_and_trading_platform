import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import DocumentComment from './document-comments';

export enum INVESTOR_TYPE {
  Individual,
  Company,
  Custodial,
}

@Entity()
@ObjectType()
export class Investor extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'FirstName',
  })
  @Field()
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'LastName',
  })
  @Field()
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'Address',
  })
  @Field({ nullable: true })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  country: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  cell: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  zip: string;

  @OneToMany(() => DocumentComment, (comment) => comment.investor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commentID' })
  comment: DocumentComment[];

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  town: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  state: string;

  @Column({
    type: 'varchar',
    length: 256,
    name: 'Password',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 256,
  })
  @Field()
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'PassportNumber',
  })
  @Field({ nullable: true })
  passportNumber: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'NationalID',
  })
  @Field({ nullable: true })
  nationalID: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  receiveEmails: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  kinname: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  @Field({ nullable: true })
  kinphone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  kinemail: string;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  investorType: INVESTOR_TYPE;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'CompanyName',
  })
  @Field({ nullable: true })
  companyName: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: true,
    name: 'TitleWithinCompany',
  })
  @Field({ nullable: true })
  titleWithinCompany: string;

  @Column({
    type: 'tinyint',
    default: 0,
    name: 'PowerToBindCompany',
  })
  @Field(() => Int)
  powerToBindCompany: number;

  @Column({
    type: 'date',
    nullable: true,
    name: 'DOB',
  })
  @Field({ nullable: true })
  birthDate: string;

  @Column({
    type: 'tinyint',
    default: 0,
    name: 'twofactorenable',
  })
  @Field(() => Boolean)
  isTwoFactorEnabled: boolean;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  investorBulkUploadStatus: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    default: 'en',
  })
  @Field()
  language: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'MiddleName',
  })
  @Field({ nullable: true })
  middleName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'SocialSecurity',
  })
  @Field({ nullable: true })
  socialSecurity: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'MailingAddress',
  })
  @Field({ nullable: true })
  mailingAddress: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'FaxNumber',
  })
  @Field({ nullable: true })
  faxNumber: string;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  maritalStatus: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'Occupation',
  })
  @Field({ nullable: true })
  occupation: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'EmployerName',
  })
  @Field({ nullable: true })
  employerName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'EmployerAddress',
  })
  @Field({ nullable: true })
  employerAddress: string;

  @Column({
    type: 'int',
    default: 0,
    name: 'RetirementAccount',
  })
  @Field(() => Int)
  retirementAccount: number;

  @Column({
    type: 'int',
    default: 0,
    name: 'TrustOrBusinessEntity',
  })
  @Field(() => Int)
  trustOrBusinessEntity: number;

  @Column({
    type: 'date',
    nullable: true,
    name: 'DateIncorporation',
  })
  @Field({ nullable: true })
  dateIncorporation: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'TaxIDNo',
  })
  @Field({ nullable: true })
  taxID: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'GovtIDNo',
  })
  @Field({ nullable: true })
  govtID: string;

  @Column({
    type: 'int',
    default: 0,
    name: 'GovtIDNoIsTaxNo',
  })
  @Field(() => Int)
  isTax: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'NameSecondaryContact',
  })
  @Field({ nullable: true })
  secondaryContactName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'PhoneSecondaryContact',
  })
  @Field({ nullable: true })
  secondaryContactPhone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'EmailSecondaryContact',
  })
  @Field({ nullable: true })
  secondaryContactEmail: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'NamePrimaryContact',
  })
  @Field({ nullable: true })
  primaryContactName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'PhonePrimaryContact',
  })
  @Field({ nullable: true })
  primaryContactPhone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'EmailPrimaryContact',
  })
  @Field({ nullable: true })
  primaryContactEmail: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'PrincipalCountryOfBusiness',
  })
  @Field({ nullable: true })
  countryBusiness: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'countryOfCitizenship',
  })
  @Field({ nullable: true })
  countryCitizenship: string;

  @Column({
    type: 'int',
    default: 0,
  })
  referByInvestorID: number;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  kyc: Record<string, string>;

  @Column({
    type: 'int',
    default: 1,
  })
  dividendPeriod: number;

  @Column({
    type: 'varchar',
    length: 400,
    nullable: true,
    name: 'DOBCountry',
  })
  birthCountry: string;

  @Column({
    type: 'varchar',
    length: 400,
    nullable: true,
    name: 'taxResidencyCountry',
  })
  @Field({ nullable: true })
  taxCountry: string;

  @Column({
    type: 'tinyint',
    width: 4,
    default: 0,
  })
  affiliateStatus: number;

  @Column({
    type: 'tinyint',
    default: 0,
    name: 'PoliticallyExposedPerson',
  })
  politicallyExposedPerson: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'twoFactorCode',
  })
  twoFactorCode?: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'PoliticallyExposedPersonPost',
  })
  politicallyExposedPersonPost: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  brokerID?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  driversLicenseID?: string;

  @Column({
    type: 'date',
  })
  @Field()
  investmentLimitUpdateDate: string;

  @Column({
    type: 'int',
  })
  @Field()
  allowedTotalInvestment: number;

  @Column({
    type: 'int',
  })
  @Field()
  yearlyTotalInvestment: number;

  @Field()
  userName(): string {
    if (this.firstName.length < 20) {
      return this.firstName;
    }
    return `${this.firstName.substring(0, 20)}...`;
  }

  fullNameLowerCase(): string {
    return `${this.firstName} ${this.lastName}`.toLowerCase();
  }

  /**
   * This is for extracting some of the kyc fields into the fields of the investor object
   */
  @BeforeInsert()
  @BeforeUpdate()
  exportKyc = (): void => {
    const kyc: Record<string, string> = this.kyc || {};
    Object.keys(kyc).forEach((key) => {
      let keyMod = key.toLowerCase();

      // Trim stuff like taxid-no
      if (keyMod.endsWith('no')) keyMod = keyMod.substring(0, keyMod.length - 2);
      if (keyMod.endsWith('-no')) keyMod = keyMod.substring(0, keyMod.length - 3);

      // Remove - between words
      keyMod = keyMod.replace(`-`, ``);

      if ([`tax`, `taxid`, `taxnumber`].includes(key.toLowerCase()) && kyc[key].length) {
        this.taxID = kyc[key];
      }
      if ([`ssn`, `govtid`, `govid`].includes(key.toLowerCase()) && kyc[key].length) {
        this.govtID = kyc[key];
      }
      if (
        [`passportnumber`, `passportnr`, `passport`].includes(key.toLowerCase()) &&
        kyc[key].length
      ) {
        this.passportNumber = kyc[key];
      }
    });
  };
}

export default Investor;
