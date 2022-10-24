import { describe, it, before, after } from 'mocha';
import { assert } from 'chai';

import { Shares, SharesWallet, ShareTypes } from 'entities';
import ShareTransferService from '../ShareTransferService';

describe('Transfer shares #smoke', async () => {
  const COMPANY_SHARES = 1000;
  const SHARE_AMOUNT = 3.142;
  const PURCHASE_AMOUNT = 1.618;
  const CUSTODIAN_SHARES = 1000;

  const INCREASED_SHARES = 4.76;
  const REDUCED_SHARES = 1.524;

  const REDUCED_COMPANY_SHARES = 998.382;
  const INCREASED_COMPANY_SHARES = 1001.618;
  const REDUCED_CUSTODIAN_SHARES = 998.382;
  const INCREASED_CUSTODIAN_SHARES = 1001.618;

  let shareType: ShareTypes;
  let shares: Shares;

  before(async () => {
    shareType = ShareTypes.create({
      title: 'TestShares',
      stoID: 0,
      companyShares: COMPANY_SHARES,
      custodianShares: CUSTODIAN_SHARES,
      currencyID: 1,
      ethereumContractAddress: '',
      ethereumWhitelistAddress: '',
    });
    await shareType.save();

    shares = Shares.create({
      stoID: 0,
      shareTypeID: shareType.ID,
      publicKey: 'test',
      isBlockchainAuthorized: 0,
      isBlockchainFrozen: 0,
      shares: SHARE_AMOUNT,
      investorID: 0,
      sharesHistoryID: 0,
    });
    await shares.save();
    const sharesWallet = await SharesWallet.findOne({
      investorID: 0,
      shareTypeID: shareType.ID,
      publicKey: 'platform',
    });
    await sharesWallet?.remove();
  });

  it("should create share wallet if it doesn't exist", async () => {
    const transfer = new ShareTransferService({
      investorID: 0,
      stoID: 0,
      shareTypeID: shareType.ID,
      adminID: 0,
      tokensToTransfer: 0,
    });
    await transfer.transferSharesBetween('company', 'investor');
    // Repeat due to async inconcistency
    await transfer.transferSharesBetween('company', 'investor');

    const sharesWallet = await SharesWallet.findOneOrFail({
      investorID: 0,
      shareTypeID: shareType.ID,
      publicKey: 'platform',
    });
    assert.equal(sharesWallet.shares, SHARE_AMOUNT); // Somehow actual is string
  });

  after(async () => {
    const sharesWallet = await SharesWallet.findOne({
      investorID: 0,
      shareTypeID: shareType.ID,
      publicKey: 'platform',
    });
    await sharesWallet?.remove();
  });

  it(`should create shares wallet if it doesn't exist on decrease`, async () => {
    const transfer = new ShareTransferService({
      investorID: 0,
      stoID: 0,
      shareTypeID: shareType.ID,
      adminID: 0,
      tokensToTransfer: 0,
    });
    await transfer.transferSharesBetween('investor', 'company');
    // Repeat due to async inconcistency
    await transfer.transferSharesBetween('company', 'investor');

    const sharesWallet = await SharesWallet.findOneOrFail({
      investorID: 0,
      shareTypeID: shareType.ID,
      publicKey: 'platform',
    });
    assert.equal(sharesWallet.shares, SHARE_AMOUNT); // Somehow actual is string
  });

  it('should transfer shares from company to investor', async () => {
    const transfer = new ShareTransferService({
      investorID: 0,
      stoID: 0,
      shareTypeID: shareType.ID,
      adminID: 0,
      tokensToTransfer: PURCHASE_AMOUNT,
    });
    await transfer.transferSharesBetween('company', 'investor');

    const resultShareTypes = await ShareTypes.findOneOrFail({ ID: shareType.ID });
    const resultShares = await Shares.findOneOrFail({ ID: shares.ID });

    assert.strictEqual(
      Number(resultShareTypes.companyShares),
      REDUCED_COMPANY_SHARES,
      'company shares are wrong',
    );
    assert.strictEqual(Number(resultShares.shares), INCREASED_SHARES, 'investor shares are wrong');
  });

  it('should transfer shares from investor to company', async () => {
    const transfer = new ShareTransferService({
      investorID: 0,
      stoID: 0,
      shareTypeID: shareType.ID,
      adminID: 0,
      tokensToTransfer: PURCHASE_AMOUNT,
    });
    await transfer.transferSharesBetween('investor', 'company');

    const resultShareTypes = await ShareTypes.findOneOrFail({ ID: shareType.ID });
    const resultShares = await Shares.findOneOrFail({ ID: shares.ID });

    assert.strictEqual(
      Number(resultShareTypes.companyShares),
      COMPANY_SHARES,
      'company shares are wrong',
    );
    assert.strictEqual(Number(resultShares.shares), SHARE_AMOUNT, 'investor shares are wrong');
  });

  before(async () => {
    const newWallet = SharesWallet.create({
      investorID: 0,
      shareTypeID: shareType.ID,
      shares: SHARE_AMOUNT,
      publicKey: 'platform',
      isBlocked: false,
    });
    await newWallet.save(); // Create wallet so it doesn't fail next test
  });

  it('should transfer shares from investor to custodian', async () => {
    const transfer = new ShareTransferService({
      investorID: 0,
      stoID: 0,
      shareTypeID: shareType.ID,
      adminID: 0,
      tokensToTransfer: PURCHASE_AMOUNT,
    });
    await transfer.transferSharesBetween('investor', 'custodian');

    const resultShareTypes = await ShareTypes.findOneOrFail({ ID: shareType.ID });
    const resultShares = await Shares.findOneOrFail({ ID: shares.ID });

    assert.strictEqual(
      Number(resultShareTypes.custodianShares),
      INCREASED_CUSTODIAN_SHARES,
      'custodian shares are wrong',
    );
    assert.strictEqual(Number(resultShares.shares), REDUCED_SHARES, 'investor shares are wrong');
  });

  it('should transfer shares from custodian to investor', async () => {
    const transfer = new ShareTransferService({
      investorID: 0,
      stoID: 0,
      shareTypeID: shareType.ID,
      adminID: 0,
      tokensToTransfer: PURCHASE_AMOUNT,
    });
    await transfer.transferSharesBetween('custodian', 'investor');

    const resultShareTypes = await ShareTypes.findOneOrFail({ ID: shareType.ID });
    const resultShares = await Shares.findOneOrFail({ ID: shares.ID });

    assert.strictEqual(
      Number(resultShareTypes.custodianShares),
      CUSTODIAN_SHARES,
      'custodian shares are wrong',
    );
    assert.strictEqual(Number(resultShares.shares), SHARE_AMOUNT, 'investor shares are wrong');
  });

  it('should transfer shares from custodian to company', async () => {
    const transfer = new ShareTransferService({
      investorID: 0,
      stoID: 0,
      shareTypeID: shareType.ID,
      adminID: 0,
      tokensToTransfer: PURCHASE_AMOUNT,
    });
    await transfer.transferSharesBetween('custodian', 'company');

    const resultShareTypes = await ShareTypes.findOneOrFail({ ID: shareType.ID });

    assert.strictEqual(
      Number(resultShareTypes.custodianShares),
      REDUCED_CUSTODIAN_SHARES,
      'custodian shares are wrong',
    );
    assert.strictEqual(
      Number(resultShareTypes.companyShares),
      INCREASED_COMPANY_SHARES,
      'company shares are wrong',
    );
  });

  it('should transfer shares from company to custodian', async () => {
    const transfer = new ShareTransferService({
      investorID: 0,
      stoID: 0,
      shareTypeID: shareType.ID,
      adminID: 0,
      tokensToTransfer: PURCHASE_AMOUNT,
    });
    await transfer.transferSharesBetween('company', 'custodian');

    const resultShareTypes = await ShareTypes.findOneOrFail({ ID: shareType.ID });

    assert.strictEqual(
      Number(resultShareTypes.custodianShares),
      CUSTODIAN_SHARES,
      'custodian shares are wrong',
    );
    assert.strictEqual(
      Number(resultShareTypes.companyShares),
      COMPANY_SHARES,
      'company shares are wrong',
    );
  });

  after(async () => {
    await shareType.remove();
    await shares.remove();
    const sharesWallet = await SharesWallet.findOne({
      investorID: 0,
      shareTypeID: shareType.ID,
      publicKey: 'platform',
    });
    await sharesWallet?.remove();
  });
});
