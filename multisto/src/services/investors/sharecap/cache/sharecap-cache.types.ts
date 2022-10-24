import { ShareCapTable } from "../sharecap-table.types";

export interface ShareCapCache {
  cache?: ShareCapTable;
  stoID: number;
  lastUpdatedAt?: Date;
  expiresAt?: Date;
}

export interface ShareCapCacheService {
  get(stoID?: number): Promise<ShareCapCache | undefined>;
  update(record: ShareCapTable): Promise<void>;
  flush(): Promise<void>;
}
