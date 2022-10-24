import { Investor, InvestorSto } from 'entities';
import { getCountryName } from 'core/helpers';
import {
  BlockPassKycDataResponse,
  BlockPassResponseAddress,
  BlockPassResponsePhone,
} from './block-pass-declarations';

const getCountryAndDocuments = (response: BlockPassKycDataResponse): Partial<Investor> => {
  const { data } = response;
  const investor = {
    countryCitizenship: '',
    nationalID: '',
    passportNumber: '',
    driversLicenseID: '',
  };
  if (
    data.identities.national_id_issuing_country?.value &&
    data.identities.national_id_issuing_country?.value !== ''
  ) {
    investor.countryCitizenship = getCountryName(
      data.identities.national_id_issuing_country.value || '',
    );
    investor.nationalID = data.identities.national_id_number.value;
  } else if (
    data.identities.passport_issuing_country?.value &&
    data.identities.passport_issuing_country?.value !== ''
  ) {
    investor.countryCitizenship = getCountryName(
      data.identities.passport_issuing_country.value || '',
    );
    investor.passportNumber = data.identities.passport_number.value;
  } else if (
    data.identities.driving_license_issuing_country?.value &&
    data.identities.driving_license_issuing_country.value !== ''
  ) {
    investor.countryCitizenship = getCountryName(
      data.identities.driving_license_issuing_country.value || '',
    );
    investor.driversLicenseID = data.identities.driving_license_number.value;
  }
  return investor;
};

const getPhoneNumber = (phone: string): string => {
  if (phone) {
    const phoneNumber: BlockPassResponsePhone = JSON.parse(phone).phoneNumber;
    return phoneNumber.phoneNumber;
  }
  return '';
};

const getAddress = (data: BlockPassKycDataResponse): Partial<Investor> => {
  if (data.data.identities.address?.value) {
    const address: BlockPassResponseAddress = JSON.parse(data.data.identities.address.value);
    return {
      address: address.address,
      town: address.city,
      zip: address.postalCode,
      country: getCountryName(address.country || ''),
    };
  }
  return {};
};

export const getInvestorData = (response: BlockPassKycDataResponse): Partial<Investor> => {
  const { data } = response;
  return {
    firstName: data.identities.given_name.value.split(' ')[0],
    lastName: data.identities.family_name.value,
    middleName: data.identities.given_name.value.split(' ')[1],
    birthDate: new Date(data.identities.dob.value).toISOString().split('T')[0],
    phone: getPhoneNumber(data.identities.phone?.value),
    email: data.identities.email.value,
    socialSecurity: '', // not collected by block pass
    taxID: '', // not collected by blockpass
    ...getCountryAndDocuments(response),
    ...getAddress(response),
  };
};

export const getInvestorStoData = (response: BlockPassKycDataResponse): Partial<InvestorSto> => {
  const { data } = response;
  const defaultSto: Partial<InvestorSto> = {
    isKYC: 0,
    status: 7,
    applied: true,
    updateDate: new Date().toISOString().substring(0, 10),
    isActive: 1,
  };
  if (!data.status) {
    return defaultSto;
  }
  // if investor is approved in block pass
  if (data.status === 'approved') {
    return {
      isKYC: 1,
      status: 1,
      applied: false,
      updateDate: new Date().toISOString().substring(0, 10),
      isActive: 1,
    };
  }
  return defaultSto;
};
