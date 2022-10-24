import logger from "../../../../logger";
import {
  globalEmailTexts,
  globalStoEmailTexts,
  emailTextsService as svc,
  StoEmailTexts,
  EmailTexts,
} from "../EmailTexts.service";
import {
  EmailTextsInputVM,
  StoEmailTextsVM,
  validateEmailTextsInputVM,
} from "./EmailTexts.viewmodels";

/**
 * ATTENTION
 *
 * Please update this list as you implement more emails
 * This list has been added so as to not confuse users about
 * which emails are really editable
 */
const IMPLEMENTED_EMAILS: (keyof StoEmailTexts)[] | [] = [
  "RegistrationEmailText",
  "MessageToInvestor",
  "BulkInvestorRegistrationPasswordResetEmailText",
  "InvestorMessageNormalConfirm",
  "InvestorRegistration",
  "PasswordChanged",
  "enableAccountEmail",
  "disableAccountEmail",
  "sharesTransferredBlockchain",
  "sharesTransferredNonBlockchain",
  "contractReceivedFromAdmin",
  "forgotPassword",
  "twoFactorAuthentication",
  "newInvestorEmailReceived",
  "sendInvitationToInvestor",
  "TellAFriend",
  "MeetingNotificationToProxy",
  "paymentAlert",
  "depositApproved",
  "depositDeclined",
  "NewCompanyNews",
];

export const getEmailTexts = async (
  stoID?: number
): Promise<StoEmailTextsVM> => {
  await svc.updateEmailTexts(stoID ?? 0); // Set the texts to current STO or 0 (fallback is 0 anyway)
  const emails = globalEmailTexts(); // Get the texts from global.config
  if (!emails) {
    return {};
  }
  const titles = (Object.keys(emails ?? {}) as (keyof StoEmailTexts)[])
    // NOTE: We return ONLY emails specified as implemented by a dev, otherwise it's confusing to the user
    .filter((title) => IMPLEMENTED_EMAILS.includes(title));
  const titleSubjects = titles.map((title) => ({
    title,
    subject: emails[title].Subject ?? emails[title].subject ?? "",
  }));
  titles.forEach((title) => {
    const fields = Object.keys(emails[title]);
    emails[title].meta = { ...emails[title].meta, fields };
  });
  return {
    emails,
    titles,
    titleSubjects,
  };
};

/** Web controller for posting email texts */
export const postEmailTextsWeb = async (req: any, res: any): Promise<void> => {
  const input = req.body as EmailTextsInputVM;
  try {
    input.emailFields = {
      Line1: input.Line1,
      Line2: input.Line2,
      Line3: input.Line3,
      Subject: input.Subject,
      subject: input.subject,
      text: input.text === "" ? undefined : JSON.parse(input.text ?? "[]"),
    };
    (Object.keys(input.emailFields) as (keyof EmailTexts)[]).forEach((k) => {
      if (
        input.emailFields[k] === "" ||
        input.emailFields[k] === "<br>" || // Empty RTF field contains <br>
        input.emailFields[k] === [] ||
        input.emailFields[k] === [] ||
        input.emailFields[k] === null ||
        input.emailFields[k] === undefined
      )
        delete input.emailFields[k];
    });

    validateEmailTextsInputVM(input);
    const stoID = input.isGlobal && input.isGlobal !== "" ? 0 : +input.stoid;
    svc.overrideEmailTexts(
      input.emailTitle,
      input.emailFields,
      stoID,
      input.locale
    );
  } catch (e) {
    logger.error(`Error occurred in postEmailTextsWeb\n${(e as Error).stack}`);
    req.flash(
      `Sorry, we couldn't save those email changes due to an internal error.`
    );
  }
  res.redirect(`settings?id=${input.stoid}`);
};

/** Prepends \ to special symbols for regex */
const escapeRegExp = (string: string): string =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Fills in an email with tag replacement
 * @param str Your email text containing placeholder tags
 *
 * Example: "Dear {firstname} {lastname}"
 * @param tags An object with tag values
 *
 * Example:
 * { firstname: "John", lastname: "Doe" }
 */
export const format = (
  string: string,
  tags: { [key: string]: string }
): string => {
  let str = string;
  Object.keys(tags).forEach((key) => {
    str = str.replace(new RegExp(escapeRegExp(`{${key}}`), "g"), tags[key]);
  });
  return str;
};

export default {
  getEmailTexts,
  globalEmailTexts,
  globalStoEmailTexts,
  postEmailTexts: postEmailTextsWeb,
  format,
};
