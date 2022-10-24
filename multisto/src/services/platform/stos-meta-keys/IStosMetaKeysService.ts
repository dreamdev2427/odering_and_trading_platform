import { StosMetaKeys } from "../../../Schema";

export default interface IStosMetaKeysService {
  /**
   * Get all StosMetaKeys records
   */
  getStosMetaKeys(): Promise<StosMetaKeys[]>;

  /**
   * Update meta key
   * @param key - string
   * @param type - string
   * @param order - number
   * @param display - number
   */
  update(
    key: string,
    type: string,
    order: number,
    display: number
  ): Promise<void>;

  /**
   * Remove meta key
   * @param key - string
   */
  remove(key: string): Promise<void>;
}
