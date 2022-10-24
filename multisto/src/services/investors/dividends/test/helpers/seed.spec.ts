import { Seed } from "./seeder.spec";

export enum UserID {
  ONE = 1001,
  TWO,
  THREE,
}
export enum CurrencyID {
  FIAT = 1,
  CRYPTO = 2,
}
export enum ShareTypeID {
  CLASS_A_FIAT = 50,
}

const seed: Seed = {
  metadata: {
    title: "Dividends Module",
    createdAt: new Date(),
  },
  stos: [
    {
      ID: 0,
      details: "",
      ethereumContractAddress: "",
      ethereumWhitelistAddress: "",
      logo: "",
      title: "Test STO",
      companytype: 0,
      settings: `{ "DefaultSTOCurreny": ${CurrencyID.FIAT} }`,
      createdAt: new Date(),
    },
  ],
  investors: [
    {
      ID: UserID.ONE,
      Password: "",
      PoliticallyExposedPerson: 0,
      affiliateStatus: 0,
      email: "inv1",
      investorType: 0,
      allowedTotalInvestment: 0,
      investmentLimitUpdateDate: new Date(),
      yearlyTotalInvestment: 0,
    },
  ],
  shareTypes: [
    {
      title: "Class A Fiat",
      ID: ShareTypeID.CLASS_A_FIAT,
      currencyid: CurrencyID.FIAT,
      premimum: 123.33,
      companyShares: 10000,
      totalShares: 100000,
      custodianShares: 0,
      stoid: 0,
      isblockchain: 0,
      isNominalValueApplicable: 0,

      isEnabled: 1,
      ethereumContractAddress: "",
      ethereumWhitelistAddress: "",
      isDividendRightsApplicable: 0,
      isVotingRightsApplicable: 1,
      needauthorization: 0,
      votingPower: 1,
      isCertificateNosApplicable: 0,
      isShareNosApplicable: 0,
      sellToCompany: 0,
      sellValue: 0,
    },
  ],
  currency: [
    {
      ID: CurrencyID.FIAT,
      Abbreviation: "TF",
      Country: "TestLand",
      Currency: "TestFiat",
      Symbol: "Ŧ",
      isBlockchainBased: 0,
      Address: "",
      blockchainID: 0,
      cryptoReceivingAddress: "",
      isNative: 0,
    },
    {
      ID: CurrencyID.CRYPTO,
      Abbreviation: "TC",
      Country: "TestLand",
      Currency: "TestCrypto",
      Symbol: "₡",
      isBlockchainBased: 1,
      Address: "",
      blockchainID: 0,
      cryptoReceivingAddress: "",
      isNative: 0,
    },
  ],
  shares: [
    {
      ID: 1,
      investorID: UserID.ONE,
      shares: 100,
      stoid: 0,
      shareTypeid: ShareTypeID.CLASS_A_FIAT,
      isBlockchainAuthorized: 0,
      isBlockchainFrozen: 0,
      sharesHistoryID: 0,
    },
    {
      ID: 2,
      investorID: UserID.ONE,
      shares: 200,
      stoid: 0,
      shareTypeid: ShareTypeID.CLASS_A_FIAT,
      isBlockchainAuthorized: 0,
      isBlockchainFrozen: 0,
      sharesHistoryID: 0,
    },
  ],
};

export default seed;
