import {
  DividendPayouts,
  DividendPayoutsView,
  DividendTemplates,
} from "../../../../Schema";
import DividendPayoutDto from "../dto/DividendPayoutDto";
import DividendTemplateInputDto from "../dto/DividendTemplateInputDto";

let prototype: DividendPayouts;

export default interface IDividendPayoutsService {
  list(stoId: number, templateId?: number): Promise<DividendPayoutDto[]>;
  /** Fill-in futures if they are missing for active templates */
  createFuturesForReactivatedTemplates(stoId: number): Promise<void>;
  listFutures(stoId: number, templateId?: number): Promise<DividendPayoutDto[]>;
  /** More optimized version of listFutures */
  listFutureIDs(stoId: number, templateId?: number): Promise<number[]>;
  create(payout: Omit<DividendPayouts, "id">): Promise<number>;
  createFuture(template: DividendTemplateInputDto): Promise<number>;
  deleteFuture(template: DividendTemplates): Promise<number>;
  fetchPayoutWithTemplate(payoutId: number): Promise<DividendPayoutsView>;
  changeStatus(
    payoutId: number,
    status: typeof prototype.status
  ): Promise<void>;
  updateFutureAwardValue(templateId: number, awardValue: number): Promise<void>;
  /**
   * (Re)calculates payout and its distribution
   * @param options.skipDistribution Ignore investor distribution calculation for optimization
   */
  calculatePayout(
    payoutId: number,
    options?: { skipDistribution?: boolean }
  ): Promise<void>;
  distributePayout(payoutId: number): Promise<void>;
  setStatus(payoutId: number, status: DividendPayouts["status"]): Promise<void>;
  /** Add more metadata to DividendPayoutView records */
  _constructDTOs(
    payouts: DividendPayoutsView[],
    stoId: number
  ): Promise<DividendPayoutDto[]>;
}
