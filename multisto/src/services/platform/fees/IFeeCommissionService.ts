/* eslint-disable */
import { FeeCommissions } from "../../../Schema";

export enum BROKER_TYPE {
  Broker = "BROKER",
  Investor = "INVESTOR",
}

export enum Status {
  Pending = "PENDING",
  Completed = "COMPLETED",
  Rejected = "REJECTED",
}

export default interface IFeeCommissionService {
  /**
   * Get All Records ( Fees & Commissions )
   */
  getAll(): Promise<FeeCommissions[]>;

  /**
   * Get All Commissions Records
   */
  getAllCommissions(): Promise<FeeCommissions[]>;

  /**
   * Get Broker Commissions Records
   * @param beneficiaryID - number
   */
  getBrokerCommissions(beneficiaryID: number): Promise<FeeCommissions[]>;

  /**
   * Get Fee Commissions By ID
   * @param ID - number
   */
  getByID(ID: number): Promise<FeeCommissions>;

  /**
   * Get Fee Commissions By feeID
   * @param feeID - number
   */
  getByFeeID(feeID: number): Promise<FeeCommissions[]>;

  /**
   * Get Fee Commissions By transactionID
   * @param transactionID - number
   */
  getByTransactionID(transactionID: number): Promise<FeeCommissions[]>;

  /**
   * Get Fee Commissions By beneficiaryID And beneficiaryType
   * @param beneficiaryID - number
   * @param beneficiaryType - BROKER_TYPE
   */
  getByBeneficiaryID(
    beneficiaryID: number,
    beneficiaryType?: BROKER_TYPE
  ): Promise<FeeCommissions[]>;

  /**
   * Get Fee Commissions By status
   * @param status - Status
   */
  getByStatus(status: Status): Promise<FeeCommissions[]>;

  /**
   * Get Fee Commissions Sum By beneficiaryID And status
   * @param beneficiaryID - number
   * @param beneficiaryType - BROKER_TYPE
   * @param status - Status
   */
  getSumByBeneficiaryID(
    beneficiaryID: number,
    beneficiaryType?: BROKER_TYPE,
    status?: Status
  ): Promise<number>;

  /**
   * Insert Into FeeCommissions Table
   * @param feeID - number
   * @param amount - number
   * @param transactionID - number
   * @param beneficiaryID - number
   * @param dateEarned - Date
   * @param status - Status
   * @param beneficiaryType - BROKER_TYPE
   */
  insertOne(
    feeID: number,
    amount: number,
    transactionID: number,
    beneficiaryID: number,
    dateEarned?: Date,
    status?: Status,
    beneficiaryType?: BROKER_TYPE
  ): Promise<void>;

  /**
   * Update FeeCommissions By ID
   * @param ID - number
   * @param feeID - number
   * @param amount - number
   * @param transactionID - number
   * @param beneficiaryID - number
   * @param dateEarned - Date
   * @param status - Status
   * @param beneficiaryType - BROKER_TYPE
   */
  update(
    ID: number,
    feeID: number,
    amount: number,
    transactionID: number,
    beneficiaryID: number,
    dateEarned: Date,
    status: Status,
    beneficiaryType: BROKER_TYPE
  ): Promise<void>;

  /**
   * Update Commission's Status By ID
   * @param ID - number
   * @param status - Status
   */
  updateStatus(ID: number, status: Status): Promise<void>;

  /**
   * Delete From FeeCommissions By ID
   * @param ID - number
   */
  deleteOne(ID: number): Promise<void>;

  /**
   * Delete All FeeCommissions
   */
  deleteAll(): Promise<void>;
}
