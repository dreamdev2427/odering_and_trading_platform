import { describe, it, after } from 'mocha';
import { assert } from 'chai';
import { Investor } from 'entities';

describe('Investor entity', async () => {
  let investor: Investor;
  const email = 'test@test.com';
  const pass = '*';

  it('DIG-429 should export tax id from kyc', async () => {
    const taxID = 'test';
    investor = Investor.create({
      email: email,
      password: pass,
      kyc: {
        taxId: taxID,
      },
    });
    await investor.save();
    const found = await Investor.findOneOrFail({ email });
    assert.deepEqual(found.taxID, taxID);
  });
  after(async () => {
    await investor.remove();
  });
});
