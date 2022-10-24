import { Fees } from "../../../Schema";

export enum Beneficiary {
  Broker = "BROKER",
  Platform = "PLATFORM",
}

export enum Type {
  Registration = "REGISTRATION",
  Deposit = "DEPOSIT",
  BuyShares = "BUY SHARES",
  BuyExchange = "BUY EXCHANGE",
  SellExchange = "SELL EXCHANGE",
  SellBack = "SELL BACK",
}

export enum Status {
  Flat = "FLAT",
  Percentage = "PERCENTAGE",
}

export default interface IFeeService {
  /**
   * Get All Fees Records
   */
  getAll(): Promise<Fees[]>;

  /**
   * Get Fees By ID
   * @param ID - number
   */
  getByID(ID: number): Promise<Fees>;

  /**
   * Get Fees By STO ID & Fee Type
   * @param stoID - number
   * @param type - Type
   */
  getByStoAndType(stoID: number, type: Type): Promise<Fees[]>;

  /**
   * Insert Into Fees Table
   * @param stoID - number
   * @param beneficiary - Beneficiary
   * @param type - Type
   * @param amount - number
   * @param status - Status
   */
  insertOne(
    stoID: number,
    beneficiary: Beneficiary,
    type: Type,
    amount: number,
    status: Status
  ): Promise<void>;

  /**
   * Update Fees By ID
   * @param ID - number
   * @param stoID - number
   * @param beneficiary - Beneficiary
   * @param type - Type
   * @param amount - number
   * @param status - Status
   */
  update(
    ID: number,
    stoID: number,
    beneficiary: Beneficiary,
    type: Type,
    amount: number,
    status: Status
  ): Promise<void>;

  /**
   * Delete From Fees By ID
   * @param ID - number
   */
  deleteOne(ID: number): Promise<void>;

  /**
   * Delete All Fees
   */
  deleteAll(): Promise<void>;
}
