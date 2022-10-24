import { assert } from "chai";
import { EmailTextOverrides } from "../../../../Schema";
import {
  EmailTexts,
  EmailTextsService,
  StoEmailTexts,
  emailTexts,
} from "../EmailTexts.service";
import * as ctl from "../controllers/EmailTexts.controller";
import importTexts from "../../../../data/text.json";

/**
 * Extend the service so we can access its protected methods
 */
class EmailTextsUnitService extends EmailTextsService {
  getEmailKeyValue: (
    emailTitle: keyof typeof emailTexts,
    emailKey: string,
    keys: EmailTextOverrides[],
    stoID?: number
  ) => string | undefined = this.getEmailKeyValue;

  emailFromKeys: (
    emailTitle: keyof StoEmailTexts,
    keys: EmailTextOverrides[],
    stoID?: number | undefined
  ) => EmailTexts = this.emailFromKeys;

  addStoEmailTexts: (
    repository: StoEmailTexts[],
    keys: EmailTextOverrides[],
    emailTitles: (keyof typeof importTexts)[],
    stoID: number
  ) => StoEmailTexts[] = this.addStoEmailTexts;
}
/** Get the unit test version of the service */
const svc = new EmailTextsUnitService();
/** Shorthand for random ID because they don't matter */
const id = () => Math.floor(Math.random() * 10000);

describe(`DIG-434 Email texts service unit`, () => {
  const emails = Object.keys(importTexts) as (keyof typeof importTexts)[];
  const randomApiEmailTitle: keyof typeof importTexts = "verifyEmail";
  /** No fields are set for this STO */
  const UNSET_STO = 123;

  const keys: EmailTextOverrides[] = [
    {
      ID: id(),
      emailKey: emails[0],
      key: "Subject",
      value: "sto0-subj",
      stoID: 0,
      locale: "en",
    },
    {
      ID: id(),
      emailKey: emails[0],
      key: "Line1",
      value: "sto0-line1",
      stoID: 0,
      locale: "en",
    },

    {
      ID: id(),
      emailKey: emails[1],
      key: "Subject",
      value: "sto0-subj",
      stoID: 0,
      locale: "en",
    },
    {
      ID: id(),
      emailKey: emails[1],
      key: "Line1",
      value: "sto0-line1",
      stoID: 0,
      locale: "en",
    },
    // API keys
    {
      ID: id(),
      emailKey: randomApiEmailTitle,
      key: "subject",
      value: "sto0-subj",
      stoID: 0,
      locale: "en",
    },
    {
      ID: id(),
      emailKey: randomApiEmailTitle,
      key: "text",
      value: '["sto1-text0"]',
      stoID: 0,
      locale: "en",
    },

    {
      ID: id(),
      emailKey: emails[2],
      key: "Subject",
      value: "sto0-subj",
      stoID: 0,
      locale: "en",
    },
    {
      ID: id(),
      emailKey: emails[2],
      key: "Line1",
      value: "sto0-line1",
      stoID: 0,
      locale: "en",
    },
    {
      ID: id(),
      emailKey: emails[2],
      key: "Subject",
      value: "sto2-subj",
      stoID: 2,
      locale: "en",
    },
    {
      ID: id(),
      emailKey: emails[2],
      key: "Line1",
      value: "sto2-line1",
      stoID: 2,
      locale: "en",
    },
    {
      ID: id(),
      emailKey: emails[2],
      key: "Line1",
      value: "sto3-line1",
      stoID: 3,
      locale: "en",
    },
  ];
  describe(`When getting individual key values`, () => {
    it(`Should find the correct email field value`, () => {
      const subject = svc.getEmailKeyValue(emails[1], "Subject", keys, 0);
      assert.deepEqual(subject, "sto0-subj");
    });

    it(`Should find the correct dynamic fallback email field value`, () => {
      const subject = svc.getEmailKeyValue(
        emails[1],
        "Subject",
        keys,
        UNSET_STO
      );
      assert.deepEqual(subject, "sto0-subj");
    });

    it(`Should find the correct hardcoded fallback email field value`, () => {
      const subject = svc.getEmailKeyValue(
        emails[8],
        "Subject",
        keys,
        UNSET_STO
      );
      assert.deepEqual(subject, (importTexts[emails[8]] as EmailTexts).Subject);
    });
  });

  describe(`When compiling whole emails`, () => {
    it(`Should compile an email object with custom dynamic fields`, () => {
      const emailObject = svc.emailFromKeys(emails[2], keys, 2);
      assert.deepEqual(emailObject.Subject, "sto2-subj");
      assert.deepEqual(emailObject.Line1, "sto2-line1");
    });

    it(`Should compile an email with both custom and sto 0 fallback fields`, () => {
      const emailObject = svc.emailFromKeys(emails[2], keys, 3);
      assert.deepEqual(emailObject.Subject, "sto0-subj");
      assert.deepEqual(emailObject.Line1, "sto3-line1");
    });

    it(`Should compile an email object with sto 0 fallback fields`, () => {
      const emailObject = svc.emailFromKeys(emails[2], keys, UNSET_STO);
      assert.deepEqual(emailObject.Subject, "sto0-subj");
      assert.deepEqual(emailObject.Line1, "sto0-line1");
    });

    it(`Should compile an email object with hardcoded fallback fields`, () => {
      const emailObject = svc.emailFromKeys(emails[25], keys, UNSET_STO);
      assert.deepEqual(
        emailObject.Subject,
        (importTexts[emails[25]] as EmailTexts).Subject
      );
    });

    it(`Should format an email correctly`, () => {
      const txt = ctl.format("This {test} is {passing} failing.", {
        test: "test",
        passing: "passing and not",
      });
      assert.deepEqual(txt, `This test is passing and not failing.`);
    });
  });

  // describe(`When compiling all emails for STOs`, () => {
  //   it(``, () => {

  //   });
  // });
});
