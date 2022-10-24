import { ShareCapTable } from "../sharecap-table.types";
import { ShareCapCache, ShareCapCacheService } from "./sharecap-cache.types";

/**
 * The variable cache simply stores records in a variable instead of a DB.
 * The disadvantage is that this value isn't kept on server restart and can't be flushed externally.
 */
export class ShareCapVariableCacheService implements ShareCapCacheService {
  protected static instance: ShareCapVariableCacheService;

  protected caches: ShareCapCache[] = [];

  protected constructor() {
    ShareCapVariableCacheService.instance = this;
  }

  static getInstance(): ShareCapVariableCacheService {
    if (!ShareCapVariableCacheService.instance)
      return new ShareCapVariableCacheService();
    return ShareCapVariableCacheService.instance;
  }

  async get(stoID?: number): Promise<ShareCapCache | undefined> {
    return Promise.resolve(
      this.caches.find(
        (c) =>
          (c.expiresAt ? c.expiresAt.valueOf() > new Date().valueOf() : true) &&
          c.stoID === (stoID ?? 0)
      )
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async update(record: ShareCapTable): Promise<void> {
    const stoID = record.stoID ?? 0;

    // Remove old element / stoID duplicates
    this.caches = this.caches.filter((c) => c.stoID !== stoID);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // tomorrow.setHours(0, 0, 0, 0);
    this.caches.push({
      stoID: record.stoID ?? 0,
      lastUpdatedAt: record.updatedAt,
      cache: record,
      expiresAt: tomorrow,
    });
    return Promise.resolve();
  }

  async flush(): Promise<void> {
    this.caches = [];
    Promise.resolve();
  }
}

const cache: ShareCapCacheService = ShareCapVariableCacheService.getInstance();
export default cache;
