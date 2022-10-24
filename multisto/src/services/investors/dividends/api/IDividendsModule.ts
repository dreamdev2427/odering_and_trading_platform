import { DividendPayouts, DividendTemplates } from "../../../../Schema";
import IDividendInvestorPayoutsService from "../data/IDividendInvestorPayoutsService";
import IDividendPayoutsService from "../data/IDividendPayoutsService";
import IDividendTemplatesService from "../data/IDividendTemplatesService";
import DividendInvestorPayoutDto from "../dto/DividendInvestorPayoutDto";
import DividendPayoutDto from "../dto/DividendPayoutDto";
import DividendTemplateInputDto from "../dto/DividendTemplateInputDto";

let dividendPayoutPrototype: DividendPayouts; // For type purposes

export default interface IDividendsModule {
  /** Template-related record service. Template = dividends metadata without payment calculations */
  readonly Templates: IDividendTemplatesService;
  /** Payout history record service. Includes future payouts.
   * A payout with a future date can be referred to as "currently active dividend".
   */
  readonly Payouts: IDividendPayoutsService;
  /** Investor Payout history record service */
  readonly InvestorPayouts: IDividendInvestorPayoutsService;
  /**
   * List currently relevant (not historical) dividends with template details.
   * Realistically, this lists all future dividend payments (if active) joined with their template.
   * The future payments are re-calculated on each update
   */
  listFutureDividends(stoId: number): Promise<DividendPayoutDto[]>;
  /** List all dividend payouts (totals) in the project */
  listAllDividendPayouts(stoId: number): Promise<DividendPayoutDto[]>;
  /**
   * List template details (+1 payout) of templates that have been used at least once for payments, but won't renew (have been turned OFF).
   */
  listStoppedDividends(stoId: number): Promise<DividendPayoutDto[]>;
  /** List all dividend payouts (totals) for a template ID */
  listDividendPayouts(
    stoId: number,
    templateId: number
  ): Promise<DividendPayoutDto[]>;
  /**
   * Get the future payout of a template
   * Also manage the existence of a future payout for the template
   * @param stoId
   * @param templateId
   * @returns `undefined` when template is not active
   */
  // getFuturePayout(stoId: number, templateId: number): Promise<DividendInvestorPayoutDto>;
  /** List all individual payouts (investor) in a dividend payout */
  listInvestorPayouts(
    stoId: number,
    payoutId: number
  ): Promise<DividendInvestorPayoutDto[]>;
  /**
   * Create the individual investor transactions needed to pay a dividend and DO NOT execute them.
   *
   * - Will get the necessary future payout from the templateID.
   * - Will create a future payout if all payouts in the template are "historical".
   * - Will fail if a pending payout is ongoing (prevents duplicates).
   * - Will delete or update previous investor transactions to fit the new distribution.
   * @returns false if the template doesn't exist
   * @throws error if something else is wrong
   */
  distributeDividend(
    stoId: number,
    templateId: number,
    adminId: number
  ): Promise<boolean>;
  /**
   * Initiate the payout process of a dividend template.
   * Takes a future payout and swithces it to "pending" state
   * @returns false if the template doesn't exist
   * @throws error if something else is wrong
   */
  payDividend(
    stoId: number,
    templateId: number,
    adminId: number
  ): Promise<boolean>;
  /** Manage payouts that need to happen. Should be called periodically. */
  updateDividends(stoId: number): Promise<void>;
  /**
   * Summarize total dividend amount for a share type from all dividends that use it.
   * Works from data in the the payouts list, which is regenerated periodically,
   * therefore requires that to happen in order to have accurate data.
   */
  sumDividendTotalAmount(
    stoId: number,
    shareTypeId: number,
    options?: {
      dateTimeFrom?: Date;
      dateTimeTo?: Date;
      status?: typeof dividendPayoutPrototype.status;
    }
  ): Promise<number>;
  /** Create a template for future dividends. */
  createDividend(template: Omit<DividendTemplateInputDto, "id">): Promise<void>;
  /** Modify a template. If this applies to a past payout, it automatically creates a new template ID */
  modifyDividend(template: DividendTemplates): Promise<void>;
  /** Deletes or inactivates a template. Historical templates will not be deleted. */
  deleteDividend(templateId: number): Promise<void>;
  /** Deletes all data related to a template. */
  purgeDividend(templateId: number): Promise<void>;
  /** Update the state of a dividend. Return true if successful */
  updateIsActive(templateId: number, isActive: boolean): Promise<boolean>;
  /** Update the award value of a dividend template (find the payout ID) */
  updateAwardValue(templateId: number, awardValue: number): Promise<void>;
}
