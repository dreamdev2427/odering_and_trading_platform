import { Investor, InvestorSto } from 'entities';
import { getCountryName } from 'core/helpers';
import { SumSubResponse } from './sum-sub-declarations';

const getAddress = (data: SumSubResponse): Partial<Investor> => {
  const [address] = data.info.addresses || data.fixedInfo.addresses;
  const {
    street = '',
    buildingNumber = '',
    flatNumber = '',
    town,
    postCode: zip,
    country,
  } = address;

  return {
    address: `${street} ${buildingNumber} ${flatNumber}`,
    town,
    zip,
    country: getCountryName(data.info.country || country || ''),
  };
};

const getMetaData = (data: SumSubResponse, key: string): string => {
  const meta = data.metadata.find((item) => item.key === key);
  return meta?.value || '';
};

const getIdDoc = (data: SumSubResponse, key: string): string => {
  const doc = data.info.idDocs.find((item) => item.idDocType === key);
  return doc?.number || '';
};

export const getInvestorData = (data: SumSubResponse): Partial<Investor> => {
  return {
    firstName: data.info.firstName || getMetaData(data, 'firstName'),
    lastName: data.info.lastName || getMetaData(data, 'lastName'),
    middleName: data.info.middleName || getMetaData(data, 'middleName'),
    birthDate: data.info.dob,
    phone: data.info.phone,
    email: data.email,
    countryCitizenship: getCountryName(data.info.nationality || data.info.country || ''),
    nationalID: getIdDoc(data, 'ID_CARD') || '',
    passportNumber: getIdDoc(data, 'PASSPORT') || '',
    socialSecurity: getMetaData(data, 'SocialSecurity'),
    driversLicenseID: getMetaData(data, 'DRIVERSLICENSE') || '',
    taxID: getMetaData(data, 'TaxIDNo'),
    ...getAddress(data),
  };
};

export const getInvestorStoData = (data: SumSubResponse): Partial<InvestorSto> => {
  const defaultSto: Partial<InvestorSto> = {
    isKYC: 0,
    status: 7,
    applied: true,
    updateDate: new Date().toISOString().substring(0, 10),
    isActive: 1,
  };
  if (!data.review || !data.review.reviewResult) {
    return defaultSto;
  }
  const {
    reviewStatus,
    reviewResult: { reviewAnswer, reviewRejectType },
  } = data.review;

  // if investor is approved in sumSub
  if (reviewStatus === 'completed' && reviewAnswer === 'GREEN') {
    return {
      isKYC: 1,
      status: 1,
      applied: false,
      updateDate: new Date().toISOString().substring(0, 10),
      isActive: 1,
    };
  }
  // RED means it's reject, FINAL means that the account is illegal
  if (reviewStatus === 'completed' && reviewAnswer === 'RED' && reviewRejectType === 'FINAL') {
    return {
      isKYC: 0,
      status: -1,
      applied: true,
      updateDate: new Date().toISOString().substring(0, 10),
      isActive: 0,
    };
  }

  return defaultSto;
};
