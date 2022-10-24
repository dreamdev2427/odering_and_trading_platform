import { StoEmailTexts, emailTexts, EmailTexts } from "../EmailTexts.service";

/**
 * Defines the email texts plus metadata for a single STO
 * so that they can be used in a view
 */
export interface StoEmailTextsVM {
  /**
   * Object with titled Email objects with fields.
   * Each email will also contain an extra field fields: string[]
   */
  emails?: StoEmailTexts;
  /** All the email titles */
  titles?: string[];
  /** All the titles paired with subjects */
  titleSubjects?: { title: keyof StoEmailTexts; subject: string }[];
}

/** Determines input coming from a view */
export type EmailTextsInputVM = {
  stoid: string;
  emailTitle: keyof StoEmailTexts;
  emailFields: EmailTexts;
  isGlobal?: string;
  locale?: string;
} & {
  [key: string]: string | undefined | "";
};

export const validateEmailTextsInputVM = (o: EmailTextsInputVM) => {
  const { stoid, emailTitle } = o;
  if (stoid === null || stoid === undefined)
    throw new Error(`Validation: Invalid stoid:${stoid}`);
  if (!emailTitle) throw new Error(`Validation: No emailTitle given`);
  if (Object.keys(emailTexts).indexOf(emailTitle) < 0)
    throw new Error(
      `Validation: Invalid emailTitle:${emailTitle}, not present in possible static email titles`
    );
};
