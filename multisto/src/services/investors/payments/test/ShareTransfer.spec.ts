import { before, describe, it } from "mocha";
import { assert } from "chai";
import ShareTransferSqlService from "../data/ShareTransferSqlService";
import Seeder from "./helpers/seed";

describe("DIG-106 Share Transfer", async () => {
  const newTransfer: ShareTransferSqlService = new ShareTransferSqlService();
  const seeder = new Seeder();
  let investorId: number;
  let stoId: number;
  let shareTypeId: number;
  const tokensToTransfer: Array<number> = [500, 10000000];
  const adminID: number = 70;

  before(`Injecting test data to DB`, async () => {
    await seeder.injectToShares();
    await seeder.injectToShareTypes();
    await seeder.injectToSharesWallet();
    setTimeout(() => false, 50000);
  });
  after(`Cleaning tables`, async () => {
    await seeder.clearTables(
      "logs",
      "shares",
      "shareshistory",
      "sharetypes",
      "shareswallet"
    );
  });

  it("This will fetch values from db to use in next tests", async () => {
    await newTransfer.runSql("SELECT * FROM sharetypes").then((result) => {
      shareTypeId = result[1].ID;
      stoId = result[1].stoid;
    });
    await newTransfer.runSql(`SELECT * FROM shares`).then((result) => {
      investorId = result[1].investorID;
    });
  });

  it(`This transfer will successfully pass`, async () => {
    await newTransfer
      .transferShares(
        investorId,
        stoId,
        shareTypeId,
        tokensToTransfer[0],
        adminID,
        false
      )
      .then(() => {
        newTransfer.runSql("SELECT * FROM logs").then((result) => {
          assert.equal(result[0].UserID, 70);
        });
      });
  });

  it(`These transfer will fail due to amount of tokentransfer`, async () => {
    try {
      await newTransfer.transferShares(
        investorId,
        stoId,
        shareTypeId,
        tokensToTransfer[1],
        adminID,
        false
      );
      assert.fail(`Should not have proceeded`);
    } catch (e) {
      assert(true);
    }
  });
});
