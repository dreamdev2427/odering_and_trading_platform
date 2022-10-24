import { describe, it, before, after } from 'mocha';
import { assert } from 'chai';
import { Investor, Register, Stos } from 'entities';
import Pool from 'core/mysql';
import RegisterService from '../register';

const reset = async (): Promise<void> => {
  const allInvestors = await Investor.find();
  await Investor.remove(allInvestors);
  const allRegisters = await Register.find();
  await Register.remove(allRegisters);

  // Remove if it's not supported by the DB anymore
  await Pool.execute(`ALTER TABLE investor auto_increment=1`);
  await Pool.execute(`ALTER TABLE register auto_increment=1`);
};

const createSto = async (): Promise<void> => {
  const sto0 = Stos.create({
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
    emailFooter: '',
    details: '',
  });
  await sto0.save();
};

class RegisterServiceTest extends RegisterService {
  ignoreEmail = true;
}

describe(`DIG-562 register`, async () => {
  let randomInvestor: Investor;
  let randomRegister: Register;
  let reservedID: number = -1;
  const svc = new RegisterServiceTest();
  let secret = 'wrong';
  const password = `${Math.random() * 1000000}`;
  const email = `${Math.random() * 1000000}@email.com`;

  before(async () => {
    await createSto();
    await reset();

    randomRegister = Register.create({
      email: 'test0',
      password: 'wrong0',
      secret: 'wrong',
    });
    await randomRegister.save();

    // Next register ID will equal this ID
    randomInvestor = Investor.create({
      ID: randomRegister.ID + 1,
      email: 'test1',
      password: 'wrong1',
    });
    await randomInvestor.save();
  });

  it(`Should create a 'register' with unique ID`, async () => {
    reservedID = await svc.insertRegister({
      email,
      firstName: '',
      investorType: 0,
      lastName: '',
      password,
      secret,
      stoID: 0,
    });
    const found = await Register.findOne({ email });
    secret = found?.secret ?? 'wrong again';
    const registers = (await Register.find()).map((r) => ({
      ID: r.ID,
      secret: r.secret,
      email: r.email,
    }));
    assert.isDefined(
      found,
      `Register not saved correctly. Registers found: ${JSON.stringify(registers)}`,
    );
    assert.notStrictEqual(reservedID, randomInvestor?.ID);
  });

  it(`Should create an investor at reserved ID`, async () => {
    let investor = await Investor.findOne({ ID: reservedID });
    if (investor) throw new Error(`Investor at reserved ID:${reservedID} shouldn't exist`);

    try {
      await svc.verify(secret);
    } catch (e) {
      assert.fail(`Fails because of previous test failure`);
    }

    investor = await Investor.findOne({ ID: reservedID });
    assert.isDefined(investor, `Investor not created at reserved ID`);
    assert.strictEqual(investor?.email, email, `Investor somehow not the same one at reserved ID`);
  });

  after(async () => {
    await reset();
  });
});
