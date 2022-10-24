import { assert } from 'chai';
import { describe, it, before, after, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { JWT_ROLE } from 'core/context';
import { Currency, ShareTypes } from 'entities';
import * as api from '../helpers/api-integration';
import MoonpayResolvers from '../gql/moonpay.resolvers';
import { REMOTE_STATUS } from '../moonpay.types';
import { MoonpayTransactionData } from '../entities';
import { MOONPAY_TRANSACTION } from '../entities/moonpay-transaction-data';
import * as moonpayCfg from '../moonpay.config';
import svc from './helpers/test-api-config';
import { moonpayExampleTransaction } from './helpers/data';
import testCfg, { MP_USDC } from './helpers/test-config';

/* Tests related to the API integrator and how Moonpay service handles them */

describe('DIG-522 Moonpay', async () => {
  const resolver = new MoonpayResolvers();

  const stub = {
    loadConfigOrFail: sinon.stub(moonpayCfg, 'loadConfigOrFail'),
    loadConfig: sinon.stub(moonpayCfg, 'loadConfig'),
    apiAction: sinon.stub(api, 'apiAction'),
  };

  let usdc: Currency;
  let shareType: ShareTypes;

  beforeEach(() => {
    stub.loadConfig.resolves(testCfg);
    stub.loadConfigOrFail.resolves(testCfg);
  });

  afterEach(() => {
    // sinon.restore();
  });

  before(async () => {
    usdc = Currency.create({
      ID: MP_USDC,
      currency: 'USDC',
      abbreviation: 'USDC',
      isBlockchainBased: true,
      country: 'USA',
      cryptoReceivingAddress: 'WRONG',
    });

    shareType = ShareTypes.create({
      ID: 1,
      title: 'MPShares',
      stoID: 1,
      ethereumContractAddress: ``,
      ethereumWhitelistAddress: ``,
      premiumValue: 1.33,
      currencyID: MP_USDC,
      needAuthorization: 0,
    });
    await shareType.save();

    await usdc.save();
  });

  it(`applies url params and auth`, async () => {
    // sinon.stub(api, 'apiAction').resolves(moonpayExampleTransaction);
    stub.apiAction.resolves(moonpayExampleTransaction);
    const data = await svc.fetchRemoteTransaction(`doesn't matter`);
    assert.strictEqual(data?.id, moonpayExampleTransaction.id);
  });

  describe(`The Moonpay GraphQL API`, async () => {
    beforeEach(() => {
      stub.loadConfig.resolves(testCfg);
      stub.loadConfigOrFail.resolves(testCfg);
      stub.apiAction.resolves(moonpayExampleTransaction);
      //   sinon.stub(moonpayCfg, 'loadConfig').resolves(testCfg);
      //   sinon.stub(moonpayCfg, 'loadConfigOrFail').resolves(testCfg);
      //   sinon.stub(api, 'apiAction').resolves(moonpayExampleTransaction);
    });

    afterEach(async () => {
      //   sinon.restore();
      await MoonpayTransactionData.clear();
    });

    it(`should generate widget url with options and reserve a transaction`, async () => {
      const url = await resolver.moonpayWidgetUrl(
        { user: { ID: 123, stoID: 0, role: JWT_ROLE.investor } },
        shareType.ID,
        33, // Cost 43.89 at 1.33 per
      );
      const found = await MoonpayTransactionData.findOne({
        localStatus: MOONPAY_TRANSACTION.ReservedID,
      });
      assert.isDefined(found, `Did not reserve transaction in DB`);
      assert.isTrue(url.includes(`externalCustomerId=123`));
    });

    before(async () => {
      // Reserves transaction for next test, if previous test is good
      await resolver.moonpayWidgetUrl(
        { user: { ID: 123, stoID: 0, role: JWT_ROLE.investor } },
        1,
        33,
      );
      const transaction = await MoonpayTransactionData.findOneOrFail({ investorID: 123 });
      stub.apiAction.resolves({
        ...moonpayExampleTransaction,
        externalTransactionID: transaction.ID,
      });
      console.log(`EXT TRANSACTION ID SHOULD RESOLVE TO ${transaction.ID}`);
    });

    it(`should receive transactions normally`, async () => {
      await resolver.moonpayAddTransactionDefault(
        moonpayExampleTransaction.id,
        REMOTE_STATUS.pending,
      );

      const data = await MoonpayTransactionData.findOne({
        ID: +moonpayExampleTransaction.externalTransactionId,
      });
      const transactions = await MoonpayTransactionData.find();

      assert.isNotEmpty(transactions, `Tested function did not create any transactions`);
      assert.isDefined(
        data,
        `Transaction has wrong ID. Current IDs: [${transactions.map(
          (t) => t.object?.externalTransactionId,
        )}]`,
      );
      assert.strictEqual(data?.localStatus, MOONPAY_TRANSACTION.Pending);
    });

    it(`should exit with NotFoundLocally status if not reserved`, async () => {
      await resolver.moonpayAddTransactionDefault(
        moonpayExampleTransaction.id,
        REMOTE_STATUS.pending,
      );

      const data = await MoonpayTransactionData.findOne({
        where: {
          localStatus: MOONPAY_TRANSACTION.NotFoundLocally,
        },
      });
      const transactions = await MoonpayTransactionData.find();

      assert.isNotEmpty(transactions, `Tested function did not create any transactions`);
      assert.isDefined(data, `Did not store local transaction data`);
      assert.isDefined(data?.object, `Did not store moonpay transaction object`);
      assert.strictEqual(
        data?.object?.id,
        moonpayExampleTransaction.id,
        `Did not match correct transaction`,
      );
      assert.strictEqual(data?.localStatus, MOONPAY_TRANSACTION.UnknownTransactionID);
    });
  });

  after(async () => {
    sinon.restore();
    await usdc.remove();
    await shareType.remove();
  });
});
