import IAffiliateModule from '../../../../services/investorClient/affiliate/api/IAffiliateModule';
import RemoteAffiliateService from '../../../../services/investorClient/affiliate/api/RemoteAffiliateService';
import RemoteAffiliateServiceConfig, { loadConfig } from '../../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';
import AffiliateIncomesSqlService from '../../../../services/investorClient/affiliate/data/AffiliateIncomesSqlService';
import IAffiliateIncomesService from '../../../../services/investorClient/affiliate/data/IAffiliateIncomesService';
import StoSqlService from '../../../../services/investorClient/affiliate/data/StoSqlService';
import AffiliateEarningsDto from '../../../../services/investorClient/affiliate/dto/AffiliateEarningsDto';

/**
 * Get an investor's project commissions from affiliate incomes and total (paid) monthly dividends based on affiliate-earned tokens
 */
export default async(investorId: number, stoId: number): Promise<AffiliateEarningsDto> => {
    const incomeSvc: IAffiliateIncomesService = new AffiliateIncomesSqlService();
    const affiliateSvc: IAffiliateModule = new RemoteAffiliateService(loadConfig() as RemoteAffiliateServiceConfig);
    const stoSvc = new StoSqlService();
    const sto = await stoSvc.getSto(stoId);

    let totalIncomes: AffiliateEarningsDto;
    if (sto && sto.isICOShareTypeCompany === 1) {
        // Exception for ICO projects: Display total UNAWARDED token income and total UNAWARDED/PENDING fiat income
        totalIncomes = {
            investorId,
            tokenEarnings: await incomeSvc.getProjectTotalTokenEarnings(investorId, stoId, 0),
            currencyEarnings: await incomeSvc.getProjectTotalFiatEarnings(investorId, stoId, true),
            projectId: stoId,
            rentalIncome: '',
        };
    } else {
        // This gets total incomes regardless of their status, only for STOS (they are awarded when the project is sold out fully)
        // Reason being, the investor would see his total earnings for the STO even after awarding them
        totalIncomes = await incomeSvc.getProjectTotalEarnings(investorId, stoId);
    }
    totalIncomes.rentalIncome = await affiliateSvc.getTotalRentalIncomeFor(investorId, stoId);
    return totalIncomes;
}
