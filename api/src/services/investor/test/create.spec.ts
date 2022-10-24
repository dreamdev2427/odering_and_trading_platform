import { describe, it, before, after, afterEach } from 'mocha';
import { assert } from 'chai';
import { Investor, InvestorSto, Stos } from 'entities';
import { InvestorMarketSpaceInput } from 'api/market-space/market-space.types';
import create from '../create';

describe(`DIG-359 createInvestorMarketSpace API`, async () => {
  let sto0: Stos | undefined;

  describe(`DIG-549, DIG-556 InvestorSTO`, async () => {
    before(async () => {
      sto0 = Stos.create({
        ID: 0,
        title: '',
        isActive: true,
        logo: '',
        ethereumContractAddress: '',
        ethereumWhitelistAddress: '',
        settings: {
          InvestorCategory: {
            0: 'Natural Person',
            1: 'Legal Entity',
          },
        },
        details: '',
      });
      await sto0.save();
    });

    afterEach(async () => {
      const investorStos = await InvestorSto.find();
      await InvestorSto.remove(investorStos);
      const investors = await Investor.find();
      await Investor.remove(investors);
    });

    const input: InvestorMarketSpaceInput = {
      address: '',
      city: '',
      country: '',
      email: 'test@email.com',
      firstName: '',
      investorType: 1,
      lastName: '',
      password: '',
      phone: '',
      secret: '',
      state: '',
      stoID: 0,
      zip: '',
      kyc: {},
    };

    it(`Creates investorsto with correct ID`, async () => {
      const investorID = await create(input);
      const investorSto = await InvestorSto.findOne({ investorID });
      assert.isDefined(investorSto, `No investorsto for investor ID ${investorID}`);
    });

    it(`Does not duplicate records`, async () => {
      await create(input);
      try {
        await create(input);
        assert.fail(`created a duplicate`);
      } catch (e) {
        assert.isTrue(true);
      }
    });

    it(`Is created with unapproved, unapplied KYC under normal circumstances (empty KYC)`, async () => {
      const investorID = await create(input);
      const investorSto = await InvestorSto.findOne({ investorID });
      assert.isDefined(investorSto, `InvestorSto record not created for ID:${investorID}`);
    });

    it(`Is created with applied, unapproved KYC when KYC is provided`, async () => {
      const investorID = await create({
        ...input,
        kyc: { 'custom-field': 'custom-value' },
      });
      const investorSto = await InvestorSto.findOne({ investorID });
      assert.strictEqual(investorSto?.applied, true, `KYC not applied`);
      assert.strictEqual(investorSto?.status, 7, `KYC status must be 7 (new investor)`);
      assert.strictEqual(investorSto?.isKYC, 0, `isKYC must be 0`);
    });

    it(`Is created with auto-approved KYC if said option is provided`, async () => {
      const investorID = await create({
        ...input,
        kyc: { 'custom-field': 'custom-value' },
        options: {
          autoAcceptKyc: true,
        },
      });
      const investorSto = await InvestorSto.findOne({ investorID });
      assert.strictEqual(investorSto?.applied, true, `KYC not applied`);
      assert.strictEqual(investorSto?.status, 1, `KYC status must be 1 (approved)`);
      assert.strictEqual(investorSto?.isKYC, 1, `isKYC must be 1`);
    });

    after(async () => {
      await sto0?.remove();
    });
  });
});
