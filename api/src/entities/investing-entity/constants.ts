import { registerEnumType } from 'type-graphql';

export enum ENTITY_TYPES {
  INDIVIDUAL_ACCOUNT = 'Individual Account',
  JOINT_ACCOUNT = 'Joint Account',
  LIMITED_LIABILITY_COMPANY = 'Limited Liability Company',
  CORPORATION = 'Corporation',
  PARTNERSHIP = 'Partnership',
  RETIREMENT_PLAN_401K = 'Retirement Plan 401k',
  SINGLE_MEMBER_LLC = 'Single Member LLC',
  SOLE_PROPRIETOR = 'Sole Proprietor',
  TRUST = 'Trust',
}

registerEnumType(ENTITY_TYPES, {
  name: 'InvestingEntityType',
  description: 'Types of the Investing entity',
});

export enum PAYMENT_METHODS {
  MAIL = 'Mail',
  ACH = 'ACH',
  WIRE = 'Wire',
  BLOCKCHAIN = 'Blockchain',
}

export enum ACCREDITATION_STATUS {
  APPROVED = 1,
  PENDING,
  DECLINED,
}

registerEnumType(ACCREDITATION_STATUS, {
  name: 'accreditionStatus',
  description: 'Enum for Status of Accredition',
});

registerEnumType(PAYMENT_METHODS, {
  name: 'InvestingEntityPaymentMethods',
  description: 'Payment methods of the Investing entity',
});

export enum INVESTING_MEMBER_ROLES {
  INVESTOR = 'Investor',
  ACCOUNTANT = 'Accountant',
  ADVISOR = 'Advisor',
}

registerEnumType(INVESTING_MEMBER_ROLES, {
  name: 'InvestingEntityMemberRoles',
  description: 'Roles of the Investing entity member',
});
