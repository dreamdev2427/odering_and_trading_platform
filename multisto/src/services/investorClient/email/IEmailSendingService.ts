import { Investor, Paymentchannels } from "../../../Schema";

export default interface IEmailSendingService {
    sendEnableDisableEmail(investor: Investor, isActive: boolean,  stoId?: number): Promise<boolean>;
    sendInstructionalDepositEmail(paymentChannelID: number, investorID: number, stoID: number, amount: number, isWithdrawRequest: number, additionalText?: string): Promise<boolean>;
}