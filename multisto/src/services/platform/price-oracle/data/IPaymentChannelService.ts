import { Paymentchannels } from "../../../../Schema";

export default interface IPaymentChannelService {
  fetchPaymentChannel(id: number): Promise<Paymentchannels>;
  fetchPaymentChannelsWithConversionEnabled(): Promise<Paymentchannels[]>;
  fetchPaymentChannelsWithConversion(
    from: string[],
    to: string[]
  ): Promise<Paymentchannels[]>;
  updateAllConversionRatesFor(
    currencyFrom: number,
    currencyTo: number,
    rate: string
  ): Promise<void>;
  upsert(paymentChannel: Paymentchannels): Promise<void>;
}
