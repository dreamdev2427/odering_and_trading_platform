import { assert } from 'chai';
import { describe, before, it } from 'mocha';
import { MoonpayTransactionData } from '../entities';
import { moonpayExampleTransaction } from './helpers/data';

describe(`DIG-422 Moonpay Transaction Data entities`, async () => {
  let transaction: MoonpayTransactionData;
  before(() => {
    try {
      transaction = MoonpayTransactionData.create({
        objectType: 'Partial<MoonpayTransaction>',
      });
      transaction.object = moonpayExampleTransaction;
    } catch (e) {
      console.error((e as Error).stack);
    }
  });

  it(`Should generate crypto keys successfully`, async () => {
    const dummy = new MoonpayTransactionData();
    dummy.dateCreated = new Date();
    dummy.dateUpdated = new Date();
    dummy._generateSalt();
    const key = dummy._generateKey();
    // AES-256 requires 32-byte key
    assert.strictEqual(key.length, 32);
  });

  it(`Should get encrypted automatically before saving`, async () => {
    await transaction.save();
    assert.isAbove(transaction.rawData.length, 0, `Data buffer is empty`);
  });

  it(`Should generate the same key after fetching a record`, async () => {
    const found = await MoonpayTransactionData.findOneOrFail(transaction.ID);
    const messages: string[] = [];
    if (transaction.salt.compare(found.salt) !== 0)
      messages.push(
        `Object salts do not match. "${transaction.salt.toString(
          'hex',
        )}" !== "${found.salt.toString('hex')}"`,
      );
    if (transaction.objectType !== found.objectType)
      messages.push(
        `Object types do not match. "${transaction.objectType}" !== "${found.objectType}"`,
      );
    if (transaction.dateCreated.toISOString() !== found.dateCreated.toISOString())
      messages.push(
        `dateCreated does not match. "${transaction.dateCreated.toISOString()}" !== "${found.dateCreated.toISOString()}"`,
      );
    if (transaction.dateUpdated.toISOString() !== found.dateUpdated.toISOString())
      messages.push(
        `dateUpdated does not match. "${transaction.dateUpdated.toISOString()}" !== "${found.dateUpdated.toISOString()}"`,
      );
    if (messages.length)
      throw new Error(`Saved and found entities are not the same:\n${messages.join(`\n`)}`);

    assert.strictEqual(
      Buffer.compare(transaction._generateKey(), found._generateKey()),
      0,
      `Key mismatch`,
    );
  });

  it(`Should generate the same IV after fetching a record`, async () => {
    const found = await MoonpayTransactionData.findOneOrFail(transaction.ID);
    assert.strictEqual(
      Buffer.compare(transaction._generateIv(), found._generateIv()),
      0,
      `IV mismatch`,
    );
  });

  it(`Should get decrypted automatically after loading`, async () => {
    const found = await MoonpayTransactionData.findOneOrFail(transaction.ID);

    if (Buffer.compare(found.rawData, transaction.rawData) !== 0)
      throw new Error(
        `TypeORM parsing problem in entity MoonpayTransactionData: Binary mismatch between saved rawData and found rawData.`,
      );

    assert.deepEqual(found.object?.id, moonpayExampleTransaction.id);
  });
});
