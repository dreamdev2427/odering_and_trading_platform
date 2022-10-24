import { describe, it } from "mocha";
import { assert } from "chai";
import { EmailTextsService, globalEmailTexts } from "../EmailTexts.service";

/** Extend class for testing purpose */
class EmailTextsServiceIntegration extends EmailTextsService {
  /** Debug SQL in generic service */
  public doLogSql = (enabled: boolean) => {
    this.emailTextOverrides.logSql = enabled;
  };

  public getDataSvc = () => this.emailTextOverrides;

  public getStoIDs: () => Promise<number[]> = this.getStoIDs;
}

describe(`DIG-434 Email texts service`, async () => {
  // Config is missing in test envrionment
  const config = global as any;
  (global as any).config = config || {};

  // const DEFAULT_MSG_INVESTOR = importTexts.MessageToInvestor.Line1;
  const NEW_DEFAULT_MSG_INVESTOR = `Default MSG`;
  const NEW_DYNAMIC_MSG_INVESTOR = `Dynamic MSG`;
  const NEW_DEFAULT_MSG_INVESTOR_SUB = `Default SUB`;
  const NEW_DYNAMIC_MSG_INVESTOR_SUB = `Dynamic SUB`;

  const svc = new EmailTextsServiceIntegration();
  svc.getStoIDs = () => Promise.resolve([1, 3, 9]);
  const dataSvc = svc.getDataSvc();

  beforeEach(async () => {
    await dataSvc.clearTable();
    await svc.updateEmailTexts();
  });

  it(`Should have static default email fields`, async () => {
    const email = globalEmailTexts()?.MessageToInvestor;
    const subject = email?.Subject;
    assert.isDefined(
      email,
      "Missing email definition in text.json: MessageToInvestor"
    );
    assert.isDefined(
      subject,
      "Missing email subject in text.json: MessageToInvestor.Subject"
    );
  });

  it(`Should have dynamic default email fields`, async () => {
    await svc.overrideEmailTexts("MessageToInvestor", {
      Line1: NEW_DEFAULT_MSG_INVESTOR,
    });
    await svc.updateEmailTexts();
    assert.deepEqual(
      globalEmailTexts()?.MessageToInvestor.Line1,
      NEW_DEFAULT_MSG_INVESTOR
    );
  });

  it(`Should have all fallback fields for an email`, async () => {
    await svc.overrideEmailTexts("MessageToInvestor", {
      Line1: NEW_DEFAULT_MSG_INVESTOR,
    });
    await svc.updateEmailTexts(3);
    assert.deepEqual(
      globalEmailTexts()?.MessageToInvestor.Line1,
      NEW_DEFAULT_MSG_INVESTOR
    );
  });

  it(`Should have mixed fallback email fields`, async () => {
    const stoID = 9;
    await svc.overrideEmailTexts("MessageToInvestor", {
      Line1: NEW_DEFAULT_MSG_INVESTOR,
    });
    await svc.updateEmailTexts();
    await svc.overrideEmailTexts("MessageToInvestor", {
      Subject: NEW_DYNAMIC_MSG_INVESTOR_SUB,
    });
    await svc.updateEmailTexts(stoID);
    assert.deepEqual(
      globalEmailTexts()?.MessageToInvestor.Line1,
      NEW_DEFAULT_MSG_INVESTOR,
      `Default message doesn't match`
    );
    assert.deepEqual(
      globalEmailTexts()?.MessageToInvestor.Subject,
      NEW_DYNAMIC_MSG_INVESTOR_SUB,
      `Dynamic subject doesn't match`
    );
  });

  it(`Should have dynamic email fields`, async () => {
    const stoID = 3;
    await svc.overrideEmailTexts("MessageToInvestor", {
      Line1: NEW_DEFAULT_MSG_INVESTOR,
      Subject: NEW_DEFAULT_MSG_INVESTOR_SUB,
    });
    await svc.overrideEmailTexts(
      "MessageToInvestor",
      {
        Line1: NEW_DYNAMIC_MSG_INVESTOR,
        Subject: NEW_DYNAMIC_MSG_INVESTOR_SUB,
      },
      stoID
    );
    await svc.updateEmailTexts(stoID);
    assert.deepEqual(
      globalEmailTexts()?.MessageToInvestor.Line1,
      NEW_DYNAMIC_MSG_INVESTOR,
      `Message does not match`
    );
    assert.deepEqual(
      globalEmailTexts()?.MessageToInvestor.Subject,
      NEW_DYNAMIC_MSG_INVESTOR_SUB,
      `Subject does not match`
    );
  });

  it(`Should overwrite dynamic email fields`, async () => {
    const stoID = 3;
    await svc.overrideEmailTexts(
      "MessageToInvestor",
      {
        Line1: NEW_DEFAULT_MSG_INVESTOR,
        Subject: NEW_DEFAULT_MSG_INVESTOR_SUB,
      },
      stoID
    );
    await svc.overrideEmailTexts(
      "MessageToInvestor",
      {
        Line1: NEW_DYNAMIC_MSG_INVESTOR,
        Subject: NEW_DYNAMIC_MSG_INVESTOR_SUB,
      },
      stoID
    );
    await svc.updateEmailTexts(stoID);
    assert.deepEqual(
      globalEmailTexts()?.MessageToInvestor.Line1,
      NEW_DYNAMIC_MSG_INVESTOR,
      `Message does not match`
    );
    assert.deepEqual(
      globalEmailTexts()?.MessageToInvestor.Subject,
      NEW_DYNAMIC_MSG_INVESTOR_SUB,
      `Subject does not match`
    );
  });
});
