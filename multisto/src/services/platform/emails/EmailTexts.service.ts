import mysql from "../../../modules/mysql";
import { EmailTextOverrides, Stos } from "../../../Schema";
import importTexts from "../../../data/text.json";
import logger from "../../../logger";
import EmailTextOverrideSqlService from "./data/EmailTextOverrideSqlService";

export type EmailMeta = {
  tags?: string[];
  fields?: string[];
};

/** Represents the possible fields in one email object */
export type EmailTexts = {
  /** From multisto */
  Subject?: string | undefined | "";
  /** From API */
  subject?: string | undefined | "";
  /** From multisto */
  Line1?: string | undefined | "";
  /** From multisto */
  Line2?: string | undefined | "";
  /** From multisto */
  Line3?: string | undefined | "";
  /** This defines email lines in API */
  text?: string[] | undefined | "";
  /** Template tags */
  meta?: EmailMeta;
};

/** Represents all email keys and their respective email objects for an sto, taken from the hardcoded file */
export type StoEmailTexts = {
  [key in keyof typeof importTexts]: EmailTexts;
};

/** Defines the default email keys for an STO as taken from the file */
export const emailTexts = importTexts as StoEmailTexts;

/** Defines the type of the email texts in the global config */
export type GlobalEmailTextsConfig = {
  config: {
    emailTexts: StoEmailTexts | undefined;
    stoEmailTexts: StoEmailTexts[] | [] | undefined;
  };
};

export class EmailTextsService {
  protected emailTextOverrides = new EmailTextOverrideSqlService();
  /**
   * This function gets its default key-values first from sto 0 from the DB, and if null then from the file
   */
  protected getEmailKeyValue = (
    emailTitle: keyof typeof emailTexts,
    emailKey: string,
    keys: EmailTextOverrides[],
    stoID?: number
  ): string | string[] | EmailMeta | undefined => {
    const defaultFields = emailTexts[emailTitle];
    // Find the key among all keys, with sto matching the requirement
    const value =
      keys.find(
        (k) =>
          k.emailKey === emailTitle && k.key === emailKey && k.stoID === stoID
      )?.value ??
      keys.find(
        (k) => k.emailKey === emailTitle && k.key === emailKey && k.stoID === 0
      )?.value ??
      // Find the key in the hardcoded file
      defaultFields[emailKey as keyof EmailTexts];
    return value;
  };

  /**
   * Find and compile one email object out of a bunch of keyts
   */
  protected emailFromKeys = (
    emailTitle: keyof typeof emailTexts,
    keys: EmailTextOverrides[],
    stoID?: number
  ): EmailTexts => {
    const { getEmailKeyValue } = this;
    let keysUsed = keys;
    if (stoID !== undefined) {
      keysUsed = keys.filter((k) => k.stoID === stoID || k.stoID === 0);
    }
    const email: EmailTexts = {
      Subject: getEmailKeyValue(emailTitle, "Subject", keysUsed, stoID) as
        | string
        | undefined,
      subject: getEmailKeyValue(emailTitle, "subject", keysUsed, stoID) as
        | string
        | undefined,
      Line1: getEmailKeyValue(emailTitle, "Line1", keysUsed, stoID) as
        | string
        | undefined,
      Line2: getEmailKeyValue(emailTitle, "Line2", keysUsed, stoID) as
        | string
        | undefined,
      Line3: getEmailKeyValue(emailTitle, "Line3", keysUsed, stoID) as
        | string
        | undefined,
      // This one is always string[] and I'm parsing it with JSON.parse when getting it from the DB
      text:
        (getEmailKeyValue(emailTitle, "text", keysUsed, stoID) as string[]) ??
        undefined,
    };
    return email;
  };

  /**
   * Takes a repostiroy array of sto emails, returns a new one with added/modified index at given sto ID with given emails
   */
  protected addStoEmailTexts = (
    repository: StoEmailTexts[],
    keys: EmailTextOverrides[],
    emailTitles: (keyof typeof importTexts)[],
    stoID: number
  ): StoEmailTexts[] => {
    const stoEmailTexts = repository;
    stoEmailTexts[stoID] = stoEmailTexts[0]
      ? { ...stoEmailTexts[0] }
      : importTexts; // Copy-Coalesce whole email objects
    emailTitles.forEach((emailTitle) => {
      const email = this.emailFromKeys(emailTitle, keys, stoID);
      stoEmailTexts[stoID][emailTitle] = email;
    });
    // Fill defaults from sto 0
    return repository;
  };

  /** Get STO IDs except 0 */
  protected getStoIDs = async (): Promise<number[]> =>
    ((await mysql.executeSQLStatement(`SELECT ID FROM stos;`)) as Stos[])
      .map((sto) => sto.ID)
      .filter((id) => id !== 0);

  /**
   * Updates the globally accessible email texts with their latest version
   * @param request Not needed ???
   * @param setStoID Not mandatory, but the default email texts object (global.config.emailTexts) will be reconfigured for this STO.
   * @param locale Optionally choose language if available in the overrides, default 'en'.
   */
  public updateEmailTexts = async (
    setStoID: number = 0,
    locale: string = "en"
  ): Promise<void> => {
    const { addStoEmailTexts, getStoIDs, emailTextOverrides } = this;
    // Load all texts for all stos
    // eslint-disable-next-line no-warning-comments
    // TODO: Implement fallback locale 'en' to fill in missing field values

    /** All raw email field-value records */
    const allKeys = await emailTextOverrides.getKeys(locale);
    /** Present sto IDs except 0 */
    const stoIDs = await getStoIDs();

    /**
     * This array will contain all the necessary email texts for each sto (indexed by sto ID)
     */
    let stoEmailTexts: StoEmailTexts[] = [];
    /**
     * Determines possible email titles from the imported file
     * This means we can not add more email types from the DB!
     */
    const emailTitles = Object.keys(emailTexts) as (keyof typeof importTexts)[];

    // Determine default email field values for each email title in the imported texts
    stoEmailTexts[0] = importTexts;
    // Determine dynamic defaults from the DB
    stoEmailTexts = addStoEmailTexts(stoEmailTexts, allKeys, emailTitles, 0);

    // Determine other sto email field values
    stoIDs.forEach((stoID) => {
      stoEmailTexts = addStoEmailTexts(
        stoEmailTexts,
        allKeys,
        emailTitles,
        stoID
      );
    });

    // Set global vars

    (global as unknown as GlobalEmailTextsConfig).config.emailTexts =
      stoEmailTexts[setStoID ?? 0];
    (global as unknown as GlobalEmailTextsConfig).config.stoEmailTexts =
      stoEmailTexts;
  };

  public overrideEmailTexts = async (
    emailTitle: keyof StoEmailTexts,
    emailFields: EmailTexts,
    stoID: number = 0,
    locale: string = "en"
  ): Promise<void> => {
    const keys = Object.keys(emailFields);
    const valueRecords = keys.map(
      (key): Omit<EmailTextOverrides, "ID"> => ({
        emailKey: emailTitle,
        key,
        value: emailFields[key as keyof EmailTexts] as string,
        stoID,
        locale,
      })
    );
    const svc = new EmailTextOverrideSqlService();
    try {
      await svc.upsertMany<Omit<EmailTextOverrides, "ID">>(valueRecords);
    } catch (e) {
      logger.error(
        `Error in EmailTextsService.overrideEmailTexts\n${(e as Error).stack}`
      );
    }
  };
}

export const globalEmailTexts = () =>
  (global as unknown as GlobalEmailTextsConfig).config?.emailTexts;
export const globalStoEmailTexts = () =>
  (global as unknown as GlobalEmailTextsConfig).config.stoEmailTexts;

export const emailTextsService = new EmailTextsService();
const svc = emailTextsService;

export default {
  svc,
  globalEmailTexts,
  globalStoEmailTexts,
};
