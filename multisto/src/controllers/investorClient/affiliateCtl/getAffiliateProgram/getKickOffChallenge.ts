import logger from '../../../../logger';
import RemoteAffiliateServiceConfig from '../../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';
import AffiliateInvestorSqlService from '../../../../services/investorClient/affiliate/data/AffiliateInvestorSqlService';
import IAffiliateInvestorService from '../../../../services/investorClient/affiliate/data/IAffiliateInvestorService';
import InvestmentsSqlService from '../../../../services/investorClient/affiliate/data/InvestmentsSqlService';
import AffiliateInvestmentVolumeDto from '../../../../services/investorClient/affiliate/dto/AffiliateInvestmentVolumeDto';
import InvestorTreeNodeDto from '../../../../services/investorClient/affiliate/dto/InvestorTreeNodeDto';

export interface KickOffChallengeVM {
    enabled?: boolean;
    lines: { lineNumber: number, lineId: number, lineName: string, volume: string, tokenVolume: string, lineEligible: boolean } [];
    linesEligible: number;
    challengeEligible: boolean;
    minLines: number;
    minVolume: string;
    dateFrom: Date;
    dateTo: Date;
    personalVolume: string;
    personalTokenVolume: string;
    teamVolume: string;
    teamTokenVolume: string;
}

export default async(
    investorId: number,
    stoId: number,
    network: InvestorTreeNodeDto[],
    config: RemoteAffiliateServiceConfig
): Promise<KickOffChallengeVM | undefined> => {
    try {
        const svc: IAffiliateInvestorService = new AffiliateInvestorSqlService();
        const enabled = config.kickOffChallenge?.enabled;
        const dateFrom: Date = new Date(config.kickOffChallenge?.dateFrom as string);
        const dateTo: Date = new Date(config.kickOffChallenge?.dateTo as string);
        const lines: AffiliateInvestmentVolumeDto[] = await svc.getAllInvestorNetworkVolumes(investorId, network, {
            stoId,
            dateFrom,
            dateTo,
        });

        const investmentSvc = new InvestmentsSqlService();
        // Remove date filter below if not needed
        const personalInv = await investmentSvc.getAllVolumeInvestedIn([investorId], {stoId, dateFrom, dateTo});
        const teamInv = await (investmentSvc.getAllVolumeInvestedIn(
            network.map(node => node.ID).filter(id => id !== investorId),
            {stoId, dateFrom, dateTo}
        ));
        const personalVolume = personalInv.amount;
        const personalTokenVolume = personalInv.tokens;
        const teamVolume = teamInv.amount;
        const teamTokenVolume = teamInv.tokens;
        const linesVm = lines.map((volumeDto, index) => ({
            lineNumber: index+1,
            lineId: volumeDto.lineId,
            lineName: volumeDto.lineName,
            volume: volumeDto.volume,
            tokenVolume: volumeDto.tokenVolume,
            lineEligible: +(volumeDto.volume) >= +(config.kickOffChallenge?.minVolume || 0),
        }));
        const linesEligible = linesVm.filter(volume => volume.lineEligible).length;
        const minLines = config.kickOffChallenge?.minLines || 0;
        const minVolume = config.kickOffChallenge?.minVolume || "0";
        return {
            enabled,
            lines: linesVm,
            linesEligible,
            minLines,
            minVolume,
            challengeEligible: linesEligible >= minLines,
            dateFrom,
            dateTo,
            personalVolume,
            personalTokenVolume,
            teamVolume,
            teamTokenVolume,
        };
    } catch (error) {
        logger.error(`Error in affiliateCtl getAffiliateProgram getKickOffChallenge`);
        logger.error(`${error}`);
        return undefined;
    }
}
