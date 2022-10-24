import logger from '../../../../logger';
import AffiliateInvestorSqlService from './AffiliateInvestorSqlService';
import IAffiliateInvestorService from "./IAffiliateInvestorService";
import AffiliateInvestmentVolumeDto from "../dto/AffiliateInvestmentVolumeDto";
import AffiliateReportViewSqlService from "./AffiliateReportViewSqlService";
import IAffiliateReportViewService from "./IAffiliateReportViewService";
import ISharesService from "./ISharesService";
import SharesSqlService from "./SharesSqlService";

export default async (investorId: number, fromDate: string, toDate: string): Promise<void> => {
	try {
		const stoId = 2;
		const depth = 224;
		const dateFrom: Date = new Date(fromDate);
		const dateTo: Date = new Date(toDate);

		const svc: IAffiliateInvestorService = new AffiliateInvestorSqlService();
		const network = await svc.getAffiliateNetworkAsList(investorId, depth, stoId);
		const lines: AffiliateInvestmentVolumeDto[] = await svc.getAllInvestorNetworkVolumes(investorId, network, {
			stoId,
			dateFrom,
			dateTo,
		});

		// calculate investorId volume or total investment in STO 2
		const shareService: ISharesService = new SharesSqlService();
		let investorTotalPersonalShareValue = await shareService.getTotalInvestorShareValue(investorId);
		if (!investorTotalPersonalShareValue) {
			investorTotalPersonalShareValue = 0;
		}

		// insert the investor into the database
		const affiliateReportViewService: IAffiliateReportViewService = new AffiliateReportViewSqlService();
		await affiliateReportViewService.insertAffiliateReports(investorId, stoId, lines, investorTotalPersonalShareValue);
	} catch (error) {
		logger.error(`${error} - Error occurred in AffiliateReportDataService`);
	}
}

