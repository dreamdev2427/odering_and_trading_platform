/**
 * Data service for managing investor internal wallet
 */

 import { InvestorBalancesInCompanyAccounts } from '../../../../Schema';


export default interface IWalletService {
  reduceInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    amount: number,
    adminID: number,
    approvalStatusID: number,
    details: string,
	CreateInvestorDepositReceivedAlert: number, 
    walletProjectSpecific: number
  ): Promise<number>;


  increaseInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    amount: number,
    adminID: number,
    approvalStatusID: number,
    channelID: number,
    details: string,
	CreateInvestorDepositReceivedAlert: number, 
    walletProjectSpecific: number
  ): Promise<number>;


  getInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    walletProjectSpecific: number
  ): Promise<number>;


  getInvestorSTOBalances(
    investorId: number,
    stoId: number,
    walletProjectSpecific: number
  ): Promise<InvestorBalancesInCompanyAccounts[]>;




}
