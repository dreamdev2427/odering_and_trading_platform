import BuyAlertResolvers from 'api/buy-alert/buy-alert.resolvers';
import { JWT_ROLE } from 'core/context';
import {
  Currency,
  Investor,
  InvestorBalancesInCompanyAccounts,
  InvestorBuyPropertyAlert,
  Params,
  Shares,
  ShareTypes,
  Stos,
} from 'entities';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import { describe, it, beforeEach, afterEach, before } from 'mocha';
import { assert } from 'chai';
import { INTERNAL_WALLET_MODE, PARAM } from 'core/envs';

/**
 * These tests are useless garbage because of insane database problems and I'm not fixing those
 * But they have given me enough proof that the feature works
 */

describe(`DIG-827 Approval of investor share transfer #smoke`, async () => {
  const Resolver = new BuyAlertResolvers();
  const ctx = {
    user: {
      ID: 1,
      role: JWT_ROLE.api,
      stoID: 1,
    },
  };

  const SHARES_BEFORE = 123.12;
  const SHARES_AMOUNT = 876.88;
  const SHARES_EXPECT = 1000.0;
  const LOADS_OF_MONEY = 1000000;

  let sto0: Stos;
  let sto1: Stos;
  let investor: Investor;
  let shareType: ShareTypes;
  let currency: Currency;
  let sharesBalance: Shares;
  let buyAlert: InvestorBuyPropertyAlert;

  let internalWallet: InvestorBalancesInCompanyAccounts;

  before(async () => {
    const walletParam = Params.findOne({ param: PARAM.INTERNAL_WALLET_MODE });
    if (!walletParam) {
      Params.create({
        param: PARAM.INTERNAL_WALLET_MODE,
        intValue: INTERNAL_WALLET_MODE.StoSpecific,
      }).save();
    }
  });

  beforeEach(async () => {
    sto0 = Stos.create({
      ID: 0,
      title: `test base`,
      settings: {
        DefaultSTOCurreny: 1,
      },
      isActive: true,
      logo: '',
      ethereumContractAddress: '',
      ethereumWhitelistAddress: '',
    });

    sto1 = Stos.create({
      ID: 1,
      title: `test`,
      settings: {
        DefaultSTOCurreny: 1,
      },
      isActive: true,
      logo: '',
      ethereumContractAddress: '',
      ethereumWhitelistAddress: '',
    });

    investor = Investor.create({
      ID: 1,
      email: 'harry@enfield',
    });

    shareType = ShareTypes.create({
      ID: 1,
      stoID: 1,
      currencyID: 1,
      premiumValue: 1,
      nominalValue: 1,
      companyShares: LOADS_OF_MONEY,
    });

    currency = Currency.create({
      abbreviation: 'TST',
      currency: 'Test',
      symbol: 't',
    });

    sharesBalance = Shares.create({
      ID: 1,
      stoID: 1,
      investorID: 1,
      shareTypeID: 1,
      shares: SHARES_BEFORE,
      sharesHistoryID: 0,
    });

    buyAlert = InvestorBuyPropertyAlert.create({
      ID: 1,
      stoID: 1,
      investorID: 1,
      shareTypeID: 1,
      status: PURCHASE_STATUS_TYPE.Pending,
      shares: SHARES_AMOUNT,
      isSellRequest: false,
      isBlockchain: false,
      isBuySharesSigned: 1,
      purchasePriceOffered: SHARES_AMOUNT,
    });

    await Params.update(
      {
        param: PARAM.INTERNAL_WALLET_MODE,
      },
      {
        param: PARAM.INTERNAL_WALLET_MODE,
        intValue: INTERNAL_WALLET_MODE.Disabled,
      },
    );

    sto0 = await sto0.save();
    sto1 = await sto1.save();
    investor = await investor.save();
    shareType = await shareType.save();
    currency = await currency.save();

    sharesBalance = await sharesBalance.save();
    buyAlert = await buyAlert.save();
  });

  afterEach(async () => {
    sto0 = await Stos.remove(sto0);
    sto1 = await Stos.remove(sto1);
    investor = await Investor.remove(investor);
    shareType = await ShareTypes.remove(shareType);
    currency = await Currency.remove(currency);

    (await Shares.findOne({ investorID: 1, shareTypeID: 1 }))?.remove();
    buyAlert = await InvestorBuyPropertyAlert.remove(buyAlert);
  });

  it(`should transfer shares to investor with share balance`, async () => {
    await Resolver.investorBuyAlertApprove(ctx, 1);
    const balance = await Shares.findOneOrFail(1);

    assert.equal(balance.shares, SHARES_EXPECT);
  });

  it(`should transfer shares to investor without share balance`, async () => {
    (await Shares.findOne({ investorID: 1, shareTypeID: 1 }))?.remove();

    await Resolver.investorBuyAlertApprove(ctx, 1);
    const balance = await Shares.findOneOrFail({ where: { shareTypeID: 1 } });

    assert.equal(balance.shares, SHARES_AMOUNT);
  });

  it(`should modify sto-specific internal wallet when configured`, async () => {
    internalWallet = InvestorBalancesInCompanyAccounts.create({
      amount: LOADS_OF_MONEY,
      currencyID: 1,
      stoID: 1,
      investorID: 1,
    });
    await internalWallet.save();
    await Params.upsert(
      {
        param: PARAM.INTERNAL_WALLET_MODE,
        intValue: INTERNAL_WALLET_MODE.StoSpecific,
      },
      ['param'],
    );

    await Resolver.investorBuyAlertApprove(ctx, 1);
    const balance = await InvestorBalancesInCompanyAccounts.findOneOrFail({
      where: {
        investorID: 1,
        currencyID: 1,
        stoID: 1,
      },
    });

    // 1 share = 1 currency
    assert.deepEqual(balance.amount, LOADS_OF_MONEY - SHARES_AMOUNT);

    await internalWallet.remove();
  });

  it(`should ignore internal wallets when disabled`, async () => {
    internalWallet = InvestorBalancesInCompanyAccounts.create({
      amount: LOADS_OF_MONEY,
      currencyID: 1,
      stoID: 1,
      investorID: 1,
    });
    await internalWallet.save();
    await Params.upsert(
      {
        param: PARAM.INTERNAL_WALLET_MODE,
        intValue: INTERNAL_WALLET_MODE.Disabled,
      },
      ['param'],
    );

    await Resolver.investorBuyAlertApprove(ctx, 1);
    const balance = await InvestorBalancesInCompanyAccounts.findOneOrFail({
      where: {
        investorID: 1,
        currencyID: 1,
        stoID: 1,
      },
    });

    assert.deepEqual(balance.amount, LOADS_OF_MONEY);

    await internalWallet.remove();
  });
});
