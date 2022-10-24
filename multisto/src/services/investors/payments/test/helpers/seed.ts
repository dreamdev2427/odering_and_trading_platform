import AbstractSqlService from "../../../../generic/AbstractSqlService";

export default class Seeder extends AbstractSqlService {
  async injectToShares() {
    const sql = `INSERT INTO shares (stoid,shareTypeid,PublicKey,isBlockchainFrozen,isBlockchainAuthorized,shares,investorID,sharesHistoryID,investedAmount) VALUES
	 (2,56,'[]',0,1,100.000,199,0),
     (2,57,'[]',0,0,2200.000,264,584),
	 (2,57,'[]',0,0,1094.000,263,616),
	 (2,57,'[]',0,0,100.000,246,571),
	 (2,56,'[]',0,0,1100.000,191,0),
	 (2,57,'[]',0,0,1400.000,215,582),
	 (2,56,'[]',0,0,500.000,499,0),
	 (2,57,'[]',0,0,500.000,191,576),
	 (5,61,'[]',0,0,100.000,191,577),
	 (6,62,'[]',0,0,1750.000,191,0),
	 (6,62,'[]',0,0,600.000,215,0),
     (2,56,'[]',0,1,0.000,172,0),
	 (2,56,'[]',0,1,0.000,231,0),
	 (2,56,'[]',0,1,0.000,147,0),
	 (2,57,'[]',0,0,2567.000,266,615),
	 (2,56,'[]',0,0,2.000,263,0);`;
    await this.runSql(sql);
  }

  async injectToShareTypes() {
    const sql = `INSERT INTO sharetypes (id, title,stoid,totalShares,companyShares,nominalValue,isNominalValueApplicable,isVotingRightsApplicable,isDividendRightsApplicable,isblockchain,ethereumContractAddress,ethereumWhitelistAddress,premimum,currencyid,needauthorization,token_abi,whitelist_abi,ethereumBlockchainPublicAddress,subscriptionform,minimumSharesToBuyByInvestor,blockchainProtocol,blockchainBuyOrdersAllowed,reduceSharesForPurchase,isEnabled,walletCustodayType,tanganyWalletID,investorCanPurchaseDirectly,AssetName,AssetTag,votingPower,isMeetingRightsApplicable,isInvestorTradable,blockchainDecimals,ipfsDocumentHash) VALUES
	 (56, 'Registered Shares (Class A Blockchain)',2,0.000,-3001.000,12.0000000000000000,0,0,0,1,'0x7Cf01fbAd42d2FEa2b0D697aa7Ee022801cD2154','0x72e58e6a3f3d77095c607647214de41269c0407b',1.0000000000000000,1,1,NULL,NULL,'0xeA1466402fC4b0a0b4959E4cd040e79a7309B3c9','default',0.0000,1,0,0.000,1,0,'',1,'','',2.00,0,1,18,NULL),
	 (57, 'Share Class B',2,92000.000,84139.000,1.0000000000000000,0,0,0,0,'','',2.0000000000000000,1,1,NULL,NULL,'','default',0.0000,0,0,0.000,1,0,'',0,'','',1.00,0,1,18,NULL),
	 (58, 'Registered Shares (Class A Blockchain)',5,10000.000,9899.000,1.0000000000000000,0,1,0,0,'','',0.0000000000000000,4,1,NULL,NULL,'','default',0.0000,0,0,0.000,1,0,NULL,0,NULL,NULL,1.00,1,1,18,NULL),
	 (59, 'Registered Shares (Class A Blockchain)',6,120622200.000,120619850.000,1.0000000000000000,0,1,0,1,'0xd8272d26a012c319c8eaa9683e857b205ea4d500','0xea1466402fc4b0a0b4959e4cd040e79a7309b3c9',0.0000000000000000,1,1,NULL,NULL,'0xea1466402fc4b0a0b4959e4cd040e79a7309b3c9','default',0.0000,2,0,0.000,1,0,NULL,0,NULL,NULL,1.00,1,1,18,NULL),
	 (60, 'qwer',2,0.000,0.000,0.0000000000000000,0,0,0,0,'','',0.0000000000000000,2,0,NULL,NULL,'','default',0.0000,0,0,0.000,1,0,'',0,'','',1.00,0,0,18,NULL),
	 (61, 'tokenized test1',2,1234.000,1234.000,0.3340000000000000,0,1,0,1,'0x7Cf01fbAd42d2FEa2b0D697aa7Ee022801cD2154','0x72e58e6a3f3d77095c607647214de41269c0407b',0.0170000000000000,2,1,NULL,NULL,'0xeA1466402fC4b0a0b4959E4cd040e79a7309B3c9','default',0.0000,2,0,0.000,1,0,'',1,'','',1.00,1,1,18,NULL),
	 (62, 'non token test1',2,4321.000,4321.000,1.0000000000000000,0,0,0,0,'','',2.0000000000000000,2,1,NULL,NULL,'','default',0.5000,0,0,0.000,1,0,'',1,'','',14.00,0,1,18,NULL);`;
    await this.runSql(sql);
  }

  async injectToSharesWallet() {
    const sql = `INSERT INTO shareswallet (investorID,sharesID,shares,publicKey,isBlocked) VALUES
	 (264,56,1200.000,'platform',0),
	 (266,56,99.000,'platform',0),
	 (199,56,100.000,'platform',0),
	 (191,56,1100.000,'platform',0),
	 (265,56,0.000,'platform',0),
	 (449,58,0.000,'platform',0),
	 (449,58,100.000,'0xDB0d238BAeF0bDE591841a66eC886f3dC7A8De48',0),
	 (191,58,1000.000,'platform',0),
	 (449,58,750.000,'0x5b31fC93a7a120D467651BF2aD15b0940E0Fcbd5',0),
	 (215,58,100.000,'platform',0);
INSERT INTO shareswallet (investorID,sharesID,shares,publicKey,isBlocked) VALUES
	 (499,56,500.000,'platform',0),
	 (191,60,1000.000,'platform',0),
	 (215,60,1000.000,'platform',0),
	 (191,62,1000.000,'platform',0),
	 (191,62,750.000,'0x5b31fc93a7a120d467651bf2ad15b0940e0fcbd5',0),
	 (215,62,500.000,'platform',0),
	 (267,62,100.000,'0xdb0d238baef0bde591841a66ec886f3dc7a8de48',0),
	 (264,56,2259.000,'0xcd063145fcd75aca7c2c3cad2675b4328dbd8f83',0),
	 (264,56,100.000,'0x3cb6df9845af79ab7c2af9530da0b046bacb6cf9',0),
	 (267,56,491.000,'0xdb0d238baef0bde591841a66ec886f3dc7a8de48',0);
INSERT INTO shareswallet (investorID,sharesID,shares,publicKey,isBlocked) VALUES
	 (263,56,2.000,'platform',0),
	 (266,57,2245.000,'platform',0),
	 (263,57,9.000,'platform',0);`;
    await this.runSql(sql);
  }
}
