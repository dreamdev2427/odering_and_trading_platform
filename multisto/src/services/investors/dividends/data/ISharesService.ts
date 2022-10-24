import { Shares, Sharetypes } from '../../../../Schema';
import SharesHistoryDto from '../dto/SharesHistoryDto';
import TotalSharesDto from '../dto/TotalSharesDto';

export default interface ISharesService {
    getTotalDistributedSharesAndCost(shareTypes: Sharetypes[]): Promise<TotalSharesDto>;
    getSharesOfType(shareTypes: Sharetypes[]): Promise<Shares[]>;
    getSharesOfTypeId(shareTypeIds: number[]): Promise<Shares[]>;
    joinSharesHistory(shares: Shares[]): Promise<SharesHistoryDto[]>;
}
