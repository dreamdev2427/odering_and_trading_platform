import { describe, it, before, after } from 'mocha';
import { assert } from 'chai';
import { Investor, InvestorBuyPropertyAlert, ShareTypes, Currency } from 'entities';
import BuyAlertResolvers from 'api/buy-alert/buy-alert.resolvers';
import * as FeatureFlags from 'core/feature-flags-checkers';

// import * as math from 'mathjs';
import sinon from 'sinon';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';

const SHARES = 135.125;
const COMPANY_SHARES_1xSUBTRACTED = 9864.875;
const COMPANY_SHARES_2xSUBTRACTED = 9729.75;
const COMPANY_SHARES = 10000;

const createTestShareType = async (): Promise<ShareTypes> => {
  const currency = Currency.create({
    currency: 'USD',
    abbreviation: 'USD',
    country: 'Denmark',
    isBlockchainBased: false,
    symbol: 'USD',
  });
  await currency.save();
  const shareType = ShareTypes.create({
    title: 'test',
    stoID: 1,
    currencyID: currency.ID,
    ethereumBlockchainPublicAddress: '',
    ethereumContractAddress: '',
    ethereumWhitelistAddress: '',
    companyShares: COMPANY_SHARES,
  });
  return shareType.save();
};

const createTestInvestor = async (): Promise<Investor> => {
  const investor = Investor.create({
    email: 'test@email.com',
    password: '**********',
  });
  return investor.save();
};

describe(`DIG-564 buy alert availableShares`, async () => {
  let shareType: ShareTypes;
  let investor: Investor;
  const resolver = new BuyAlertResolvers();
  const kycStub = sinon.stub(FeatureFlags, 'kycRequirementStep');

  before(async () => {
    shareType = await createTestShareType();
    investor = await createTestInvestor();

    kycStub.resolves({
      isIgnored: () => true,
      isOnPurchase: () => false,
      isOnRegister: () => false,
      isPrePayment: () => false,
    });
  });

  const createAlert = async (): Promise<number> => {
    return resolver.investorBuyAlertAdmin(
      {
        details: 'test',
        investorID: investor.ID,
        shareTypeID: shareType.ID,
        shares: SHARES,
        stoID: 1,
        isSellBackRequest: false,
      },
      {
        ignoreAllPreviousRequests: true,
        ignoreEntity: true,
        ignoreSignatures: true,
        ignoreWalletBalance: true,
      },
    );
  };

  it(`should be equal to companyShares minus current pending value`, async () => {
    const alertID = await createAlert();
    const alert = (await resolver.investorBuyAlertsAdmin(undefined, undefined, alertID))[0];

    assert.strictEqual((await alert.shareType).availableShare(), COMPANY_SHARES_1xSUBTRACTED);
  });

  it(`should sum multiple alerts correctly`, async () => {
    const alertID = await createAlert();
    const alert = (await resolver.investorBuyAlertsAdmin(undefined, undefined, alertID))[0];

    assert.strictEqual((await alert.shareType).availableShare(), COMPANY_SHARES_2xSUBTRACTED);
  });

  it(`should not calculate declined alerts`, async () => {
    // Decline our first alert
    let alert = await InvestorBuyPropertyAlert.findOneOrFail({
      where: { shareTypeID: shareType.ID },
    });
    alert.status = PURCHASE_STATUS_TYPE.Declined;
    alert = await alert.save();
    const alertFound = await resolver.investorBuyAlertsAdmin(undefined, undefined, alert.ID);
    const shareTypeFound = await alertFound[0].shareType;
    // const updatedShareType = await ShareTypes.findOneOrFail(alert.shareTypeID);

    // Should have 1×shares again
    assert.strictEqual(shareTypeFound.availableShare(), COMPANY_SHARES_1xSUBTRACTED);
  });

  after(async () => {
    await shareType.remove();
    await investor.remove();
    kycStub.restore();
  });
});
