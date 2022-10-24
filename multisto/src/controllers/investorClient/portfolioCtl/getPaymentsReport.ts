import { Request } from 'express';
import { InvestorBanks, Stos } from '../../../Schema';
import StoSqlService from '../../../services/investorClient/affiliate/data/StoSqlService';

/**
 * ViewModel representing a payment report row for an STO
 */
export type ReportRowVM = {
    stoName:         string | null | undefined,
    tokensPurchased: string | null | undefined,
    tokensAffiliate: string | null | undefined,
    fiatDividends:   string | null | undefined,
    fiatAffiliate:   string | null | undefined,
    bankName:        string | null | undefined,
    iban:            string | null | undefined,
    swift:           string | null | undefined,
    accountName:     string | null | undefined,
    // no wallet implementation yet
}
// Need to link banks with STOs
export interface InvestorBanksSto extends InvestorBanks {
    stoId: number;
}
/**
 * temporary function, delete later
 */
const banksStub = (investorId: number): Promise<InvestorBanksSto[]> => Promise.resolve([{
    ID: 0,
    investorid: investorId,
    accountTitle: "acc. title",
    accountNo: "1234567890",
    routingNumber: "1234567890",
    iban: "12415",
    bankName: "bank name",
    swift: "we don't have this field yet?",
    stoId: 2,
}]);
/**
 * temporary function, delete later
 */
const paymentsStub = (investorId: number): Promise<any[]> => Promise.resolve([investorId]);
const mapStosPaymentsBanks = (
    stos: Stos[],
    stoPayments: any[],
    stoBanks: InvestorBanksSto[],
): ReportRowVM[] => stos.map((sto: Stos) => {
        const payments = stoPayments.find((payment) => payment.stoId === sto.ID);
        const bank = stoBanks.find((stoBank) => stoBank.stoId === sto.ID);
        return {
            stoName: sto.title,

            tokensPurchased: payments?.tokensPurchased,
            tokensAffiliate: payments?.tokensAffiliate,
            fiatDividends: payments?.fiatDividends,
            fiatAffiliate: payments?.fiatAffiliate,

            // Check that those are null to display "Add your bank details"
            bankName: bank?.bankName,
            iban: bank?.iban,
            swift: null, // bank?.swift, but we don't seem to have a field for it yet
            accountName: bank?.accountTitle,
        }
});
export const getPaymentsReport = async(req: Request): Promise<ReportRowVM[]> => {
    const investorId: number = (req as any).session.user.ID;

    const stos: Stos[] = await (new StoSqlService().getStos());
    // Will implement this later --------------
    const stoPayments: any[] = await paymentsStub(investorId);
    // ----------------------------------------
    const stoBanks: InvestorBanksSto[] = await banksStub(investorId);

    const reportRows: ReportRowVM[] = mapStosPaymentsBanks(stos, stoPayments, stoBanks);
    return reportRows;
}

export default getPaymentsReport;
