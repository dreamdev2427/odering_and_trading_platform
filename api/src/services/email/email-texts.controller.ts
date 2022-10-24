import { EmailTexts, EmailTextsService, StoEmailTexts } from './email-texts.service';
import {
  EmailTextsInputVM,
  StoEmailTextsVM,
  validateEmailTextsInputVM,
} from './email-texts.viewmodels';

/**
 * ATTENTION
 *
 * Please update this list as you implement more emails
 * This list has been added so as to not confuse users about
 * which emails are really editable
 */
const IMPLEMENTED_EMAILS: (keyof StoEmailTexts)[] | [] = [
  'RegistrationEmailText',
  'MessageToInvestor',
  'BulkInvestorRegistrationPasswordResetEmailText',
  'InvestorMessageNormalConfirm',
  'InvestorRegistration',
  'PasswordChanged',
  'enableAccountEmail',
  'disableAccountEmail',
  'sharesTransferredBlockchain',
  'sharesTransferredNonBlockchain',
  'contractReceivedFromAdmin',
  'forgotPassword',
  'twoFactorAuthentication',
  'newInvestorEmailReceived',
  'sendInvitationToInvestor',
  'TellAFriend',
  'MeetingNotificationToProxy',
  'paymentAlert',
  'depositApproved',
  'depositDeclined',
  'NewCompanyNews',
];

let svc = new EmailTextsService();

export const _setTestingSvc = (newSvc: EmailTextsService): void => {
  if (process.env.NODE_ENV === 'testing') {
    svc = newSvc;
  } else {
    throw new Error(`Requires test environment!`);
  }
};

export const getEmailTextsAdmin = async (stoID?: number): Promise<StoEmailTextsVM> => {
  await svc.updateEmailTexts(stoID ?? 0); // Set the texts to current STO or 0 (fallback is 0 anyway)
  const emails = EmailTextsService.globalEmailTexts(); // Get the texts from global cache
  if (!emails) {
    return {};
  }
  const titles = (Object.keys(emails ?? {}) as (keyof StoEmailTexts)[])
    // NOTE: We return ONLY emails specified as implemented by a dev, otherwise it's confusing to the user
    .filter((title) => IMPLEMENTED_EMAILS.includes(title));
  const titleSubjects = titles.map((title) => ({
    title,
    subject: emails[title].Subject ?? emails[title].subject ?? '',
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

/** Web controller for posting email texts.
 * Mostly useless until GQL endpoint is implemented for setting email texts
 * ### TODO: Turn into or use as part of GraphQL admin resolver
 */
export const setEmailTextsAdmin = async (input: EmailTextsInputVM): Promise<void> => {
  try {
    input.emailFields = {
      Line1: input.Line1,
      Line2: input.Line2,
      Line3: input.Line3,
      Subject: input.Subject,
      subject: input.subject,
      text: input.text === '' ? undefined : JSON.parse(input.text ?? '[]'),
    };
    (Object.keys(input.emailFields) as (keyof EmailTexts)[]).forEach((k) => {
      if (
        input.emailFields[k] === '' ||
        input.emailFields[k] === '<br>' || // Empty RTF field contains <br>
        (Array.isArray(input.emailFields[k]) && (input.emailFields[k] as []).length === 0) ||
        input.emailFields[k] === null ||
        input.emailFields[k] === undefined
      )
        delete input.emailFields[k];
    });

    validateEmailTextsInputVM(input);
    const stoID = input.isGlobal && input.isGlobal !== '' ? 0 : +input.stoid;
    svc.overrideEmailTexts(input.emailTitle, input.emailFields, stoID, input.locale);
  } catch (e) {
    console.error(`Error occurred in email-texts.controller setEmailTexts\n${(e as Error).stack}`);
    throw new Error(`api-internal-server-error`);
  }
};

export const refreshEmailTexts = async (stoID?: number): Promise<void> => {
  await svc.updateEmailTexts(stoID ?? 0);
};

/** Prepends \ to special symbols for regex */
const _escapeRegExp = (string: string): string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Fills in an email with tag replacement
 * @param string Your email text containing placeholder tags
 *
 * Example: "Dear {firstname} {lastname}"
 * @param tags An object with tag values
 *
 * Example:
 * { firstname: "John", lastname: "Doe" }
 */
export const format = (string: string, tags: { [key: string]: string }): string => {
  let str = string;
  Object.keys(tags).forEach((key) => {
    str = str.replace(new RegExp(_escapeRegExp(`{${key}}`), 'g'), tags[key]);
  });
  return str;
};

export default {
  getEmailTextsAdmin,
  setEmailTextsAdmin,
  refreshEmailTexts,
  format,
};
