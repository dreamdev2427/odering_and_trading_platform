import { Stos } from "../../../../Schema";

export default interface IStoService {
  /**
   * Get IDs of all STOs
   */
  getStoIds(): Promise<number[]>;

  /**
   * Get all STOs
   */
  getStos(): Promise<Stos[]>;

  /**
   * Get list of STOs which are suitable for investment, i.e. exclude platform admin.
   */
  getInvestableStos(): Promise<Stos[]>;

  /**
   * Get the id of the share type used for affiliate purposes
   * @param stoId
   */
  getAffiliateShareTypeId(stoId: number): Promise<number | undefined>;

  /**
   * Check if STO exists
   * @param stoId
   */
  getStoExists(stoId: number): Promise<boolean>;

  /**
   * Fetch STO by ID
   * @param stoId
   */
  getSto(stoId: number): Promise<Stos | null>;

  /**
   * Copies specified parameters between the 2 stos
   * @param copySettingsStoId sto FROM which the parameters are copied
   * @param pasteSettingsStoId sto TO which the parameters are copied
   */
  copyStoParameters(
    copySettingsStoId: number,
    pasteSettingsStoId: number,
    fieldsToBeCopied: string[]
  ): Promise<void>;

  /**
   * Updates the logo link for the specified stoId
   * @param stoId sto Id
   * @param logoLink sto TO which the parameters are copied
   */
  updateLogoLink(stoId: number, logoLink: string): Promise<void>;

  /**
   * Update specified column with given value
   * @param stoId
   * @param column
   * @param value
   */
  updateParameter(stoId: number, column: string, value: string): Promise<void>;

  /**
   * Update all metadata values
   * @param stoId
   * @param metadata
   */
  updateMetadata(
    stoId: number,
    metadata: { [id: string]: string }
  ): Promise<void>;
}
