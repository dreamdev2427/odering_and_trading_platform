import AffiliateInvestorSqlService from '../../../../services/investorClient/affiliate/data/AffiliateInvestorSqlService';
import IAffiliateInvestorService from '../../../../services/investorClient/affiliate/data/IAffiliateInvestorService';
import InvestorTreeNodeDto from '../../../../services/investorClient/affiliate/dto/InvestorTreeNodeDto';

/**
 * Details about an investor's affiliate network
 */
export interface NetworkDataVM {
    /** Detailed network up to 7th level of affiliation */
    network: InvestorTreeNodeDto[],
    /** Full network up to 128th* level of affiliation (128 is just a temporary limitation) */
    fullNetwork: InvestorTreeNodeDto[],
    /** Count of investors in the full network (up to 128th level) */
    networkInvestors: number,
    /** Count of investors who have invested above the minimum amount in current STO/ICO */
    stoInvestors: number,
    /** The 'short' network as a nested object */
    networkTree: InvestorTreeNodeDto
}
/**
 * Fetch details of the affiliate network of an investor
 * @returns NetworkData
 * - network Detailed network up to 7th level of affiliation
 * - fullNetwork Full network up to 128th* level of affiliation (128 is just a temporary limitation)
 * - networkInvestors Count of investors in the full network (up to 128th level)
 * - stoInvestors Count of investors who have invested above the minimum amount in current STO/ICO
 * - networkTree The 'short' network as a nested object
 */
export default async (investorId: number, stoId: number): Promise<NetworkDataVM> => {
    const investorSvc: IAffiliateInvestorService = new AffiliateInvestorSqlService();

    const network = await investorSvc.getAffiliateNetworkAsList(investorId, 6, 0);
    const fullNetwork = await investorSvc.getAffiliateNetworkAsList(investorId, 224, 0);
    const networkInvestors = fullNetwork.length;
    const stoInvestors = await investorSvc.getActiveInvestorsInNetworkCount(fullNetwork, stoId);
    const networkTree = await investorSvc.getListAsNestedStructure(investorId, stoId, network);
    return {
        network,
        fullNetwork,
        networkInvestors,
        stoInvestors,
        networkTree
    };
}
