import { Shares, Shareshistory } from '../../../../Schema';

export default interface SharesHistoryDto extends Shares {
    sharesHistory?: Shareshistory;
}
