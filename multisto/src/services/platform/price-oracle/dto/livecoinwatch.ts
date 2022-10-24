export enum Fiat {
    USD = "USD",
    EUR = "EUR",
}
export enum Crypto {
    BTC = "BTC",
    ETH = "ETH",
}
export interface LcwRequest {
    currency: Fiat | string;
    code: Crypto | string;
    meta: false;
}
export interface LcwRequestCoinList {
    currency: Fiat | string;
    meta: false;
    sort: "rank" | string;
    order: "ascending" | string;
}
export interface LcwResponse {
    rate: string;
    volume: string;
    cap: string;
}
/** Remember the LCW coin list API endpoint returns LcwResponseCoin[] (as array) */
export interface LcwResponseCoin extends LcwResponse {
    code: string;
}
