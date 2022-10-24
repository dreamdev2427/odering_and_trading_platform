import { Investor, InvestorSto } from 'entities';
import { getCountryName } from 'core/helpers';
import { TransactionDetails } from './netki-declarations';

const getAddress = (details: TransactionDetails): Partial<Investor> => {
  const data = details.results[0];
  const validAddress = data.transaction_identity.identity_addresses.find((a) => a.is_active);
  if (!validAddress)
    return {
      address: '',
      town: '',
      zip: '',
      country: '',
    };
  return {
    address: `${validAddress?.address} ${validAddress.unit}`,
    town: validAddress.city || '',
    zip: validAddress.postalcode || '',
    country: getCountryName(data.transaction_identity.country_code || ''),
  };
};

export const getInvestorData = (details: TransactionDetails): Partial<Investor> => {
  const data = details.results[0];
  return {
    firstName: data.transaction_identity.first_name,
    lastName: data.transaction_identity.last_name,
    middleName: data.transaction_identity.middle_name,
    birthDate: data.transaction_identity.birth_date,
    phone: data.transaction_identity.identity_phone_numbers.find((p) => p.is_active)?.phone_number,
    email: data.transaction_identity.identity_emails.find((e) => e.is_active)?.email,
    countryCitizenship: getCountryName(data.transaction_identity.country_code || ''),
    nationalID: '', // not collected by netki
    passportNumber: data.transaction_identity.passport_number || '',
    socialSecurity: data.transaction_identity.ssn,
    taxID: '', // not collected by netki
    ...getAddress(details),
  };
};

export const getInvestorStoData = (details: TransactionDetails): Partial<InvestorSto> => {
  const defaultSto: Partial<InvestorSto> = {
    isKYC: 0,
    status: 7,
    applied: false,
    updateDate: new Date().toISOString().substring(0, 10),
    isActive: 1,
  };
  const data = details.results[0];
  if (!data.state) {
    return defaultSto;
  }
  const { state } = data;

  if (state === 'completed') {
    return {
      isKYC: 1,
      status: 1,
      applied: false,
      updateDate: new Date().toISOString().substring(0, 10),
      isActive: 1,
    };
  }

  if (state === 'failed') {
    return {
      isKYC: 0,
      status: 10,
      applied: true,
      updateDate: new Date().toISOString().substring(0, 10),
      isActive: 1,
    };
  }

  if (state === 'restarted') {
    return {
      isKYC: 0,
      status: 11,
      applied: true,
      updateDate: new Date().toISOString().substring(0, 10),
      isActive: 1,
    };
  }

  return defaultSto;
};
