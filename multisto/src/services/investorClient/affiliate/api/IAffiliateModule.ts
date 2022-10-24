import { Affiliateincomes, Investor, Stos } from "../../../../Schema";
import AffiliateInvestorDto from "../dto/AffiliateInvestorDto";
import AffiliatePlanDto from "../dto/AffiliatePlanDto";
import AffiliatePurchaseDto from "../dto/AffiliatePurchseDto";
import InvestorTreeNodeDto from "../dto/InvestorTreeNodeDto";
import InvestorReferralOverviewDto from "../dto/InvestorReferralOverviewDto";
import { AffiliateIncomesOverviewDto } from "../dto/AffiliateIncomesOverviewDto";
import NamedAffiliateIncome from "../dto/NamedAffiliateIncome";

export default interface IAffiliateModule {
  /**
   * Registers/creates a new investor in the affiliate system.
   * @param investor
   */
  registerInvestor(
    investor: AffiliateInvestorDto,
    checkDuplicate?: boolean
  ): Promise<void>;
  /**
   * Sets an investor's kyc status as approved in affiliate service (requirement for eligibility)
   * @param investorId
   */
  approveInvestorKyc(investor: Investor): Promise<void>;
  /**
   * Register all existing investors for the affiliate system (synchronize).
   */
  registerInvestorsBulk(syncUploaded: boolean): Promise<void>;
  /**
   * Obtain a list of investor IDs that have not yet been sucesssfully registered for the affiliate programme.
   */
  getUnregisteredInvestorIds(): Promise<number[]>;
  /**
   * Obtain a list of investors that have not yet been sucesssfully registered for the affiliate programme.
   */
  getUnregisteredInvestors(): Promise<Investor[]>;
  /**
   * Check if a specific investor has been successfully noted as registered for the affiliate programme.
   * @param investorId
   */
  getIsInvestorRegistered(investorId: string): Promise<Boolean>;
  /**
   * Determine if an investor is eligible for the programme.
   * @param investorId
   */
  getIsInvestorEligible(investorId: number): Promise<Boolean>;
  /**
   * Register project for affiliate service
   */
  registerProject(sto: Stos): Promise<void>;
  /**
   * Update project in affiliate service
   */
  updateProject(sto: Stos): Promise<void>;
  /**
   * Try to update or else register project in affiliate service
   */
  upsertProject(sto: Stos): Promise<void>;
  /**
   * Delete project from affiliate service.
   * Probably not good to forever delete any of this data in general.
   */
  deleteProject(id: number): Promise<void>;
  /**
   * Register plan for affiliate service
   */
  registerPlan(plan: AffiliatePlanDto): Promise<void>;
  /**
   * Update plan in affiliate service
   */
  updatePlan(plan: AffiliatePlanDto): Promise<void>;
  /**
   * Fetch all affiliate plans
   */
  fetchPlans(): Promise<AffiliatePlanDto[]>;
  /**
   * Fetch affiliate plan
   */
  fetchPlan(id: number): Promise<AffiliatePlanDto>;
  /**
   * Delete plan from affiliate service
   */
  deletePlan(id: number): Promise<void>;
  /**
   * Register a purchase in the affiliate service.
   */
  registerPurchase(purchase: AffiliatePurchaseDto): Promise<void>;
  /**
   * Fetch unpaid affiliate incomes and distribute to investors
   */
  distributeUnpaidIncomes(adminId: number, stoId: number): Promise<void[]>;
  /**
   * Distribute affiliate incomes to investors
   */
  distributeIncomes(
    incomes: Affiliateincomes[],
    adminId: number
  ): Promise<void[]>;
  /**
   * Withdraw a purchase in the affiliate service.
   */
  withdrawPurchase(): Promise<void>;
  /**
   * Determine which share type to use in order to award incomes.
   * @param stoId
   * @throws Error if no share classes are registered for sto.
   */
  determineShareTypeId(stoId: number): Promise<number>;
  /**
   * Return a list of referrals along with their affiliate-relevant details
   */
  getAffiliateNetworkAsList(
    investorId: number,
    stoId: number | undefined
  ): Promise<InvestorTreeNodeDto[]>;
  /**
   * Return a list of investors, and denote which are active.
   */
  getAllInvestorsWithActivity(): Promise<InvestorReferralOverviewDto[]>;
  /**
   * Combines all token incomes for an investor and multiplies them by their respective token price.
   * @param investorId
   * @param stoId
   * @deprecated
   */
  getGlobalRentalIncomesFor(investorId: number): Promise<string>;
  /**
   * Calculates the rental income for an investor in an STO
   * Formula: unpaid sto dividends / all sto tokens × affiliate tokens
   */
  getTotalRentalIncomeFor(investorId: number, stoId: number): Promise<string>;
  /**
   * Get all affiliate incomes overview together with investor data
   * @param stoId 0 = all STOs
   */
  getIncomesOverview(
    stoId?: number,
    awarded?: number
  ): Promise<AffiliateIncomesOverviewDto[]>;
  /**
   * Get the total token incomes for an investor in a project
   */
  getInvestorTokenIncome(investorId: number, stoId: number): Promise<string>;
  /**
   * Checks business conditions to see if investor referrer can be changed
   */
  getIsEligibleForReferralChange(investorId: number): Promise<boolean>;
  /**
   * Changes the referrer of an investor by email. Both investors need to exist in the affiliate system first.
   */
  setReferrerByEmail(investorId: number, referrerEmail: string): Promise<void>;
  /**
   * Changes the referrer of an investor by ID. Both investors need to exist in the affiliate system first.
   */
  setReferrerById(investorId: number, referrerId: number): Promise<void>;
  /**
   * Get all the affiliate incomes of an investor
   */
  getAllInvestorIncomes(
    investorId: number,
    stoId?: number
  ): Promise<NamedAffiliateIncome[]>;
}
