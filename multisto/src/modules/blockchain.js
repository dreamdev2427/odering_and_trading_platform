'use strict';

import * as emailTextsController from '../services/platform/emails/controllers/EmailTexts.controller';
import getSTOFromConfig from '../services/getSTOFromConfig';

const async = require('async');
const mysql = require('./mysql');
const common = require('./common');
const logger = require('../logger');
const ethereum = require('./ethereum');
const tangany = require('./tangany');
const ravencoin = require('./ravencoin');
import wallet from '../controllers/investors/paymentsCtl/wallet';
const emailTexts = require('../data/text.json');
const emailTextsController = require('../services/platform/emails/controllers/EmailTexts.controller');
const getSTOFromConfig = require('../services/getSTOFromConfig');
import { registerTicker,
	registerTicker,
	getTotalSupplyOfTokens,
	getAccountBalance,
	isTokenDivisible,
	createPolymeshTokens,
	whitelistInvestorCDDAddress,
	setTokenRestrictions,
	setAtestationProvider,
	deleteAtestationProvider,
	isPolymeshAccountWhitelisted,
	tansferTokensToAccountPolymesh,
	getPolymeshPortfolioBalances,
	createPolymeshPortfolio,
	transferTokenToPolymeshPortfolio	
} from "./polymesh";
import { ClaimType, CountryCode } from '@polymathnetwork/polymesh-sdk/types';


module.exports = {
	// Protocols
	// 1 = R-Token
	// 2 = PolyMath
	// 3 = Ravencoin
	// 4 = ERC1404 Ethereum
	// 5 = ERC1404 Polygon
	// 6 = ERC1404 Binance
	// 7 = Polymesh token

	sendTokens(isOnChainTransfer, ethereumPrivateKey, toAddress, amountToSend, stoid, investorID, adminID, shareTypeID, Investment, InvestmentDescription, buyPropertyAlertID, reduceInvestorBalance, sendEmailToInvestor, backgroundShareTransferRecordID, metaMaskTransaction, blockchainTransactionID ) {

		//console.log( isOnChainTransfer + " " + ethereumPrivateKey + " " +  toAddress + " " +  amountToSend + " " +  stoid + " " +  investorID + " " +  adminID + " " +  shareTypeID + " " +  Investment + " " +  InvestmentDescription + " " +  buyPropertyAlertID + " " +  reduceInvestorBalance + " " +  sendEmailToInvestor + " " +  backgroundShareTransferRecordID )

		var params = {};

		return new Promise(((resolve, reject) => {

			// isOnChainTransfer = 0     investor already has shares and physical movement is required from virtual to private wallet
			// isOnChainTransfer = 1     direct movement of shares form company to private wallet

			logger.info(`1-Starting blockchain shares transfer for investor ID ${investorID}`)
			logger.info(`Starting sendToken processing .... To-${toAddress} amount-${amountToSend}`);
			if(isOnChainTransfer == 0)
				logger.info(`Shares are being transferred from OffChain to OnChain`)


			try {
					function getParams(callback) {
						const stmt = "select * from params where param in ('web3Address', 'binanceWeb3Address', 'polygonWeb3Address', 'investorInternalWalletProjectSpecific', 'Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword'); select stolink from stos where id = ?";
						mysql.executeSQLStatement(stmt, [stoid]).then((result) => {
								result[0].forEach(obj=>{
									if(obj.param == "web3Address")
										params.web3Address = obj.stringValue;
									if(obj.param == "polygonWeb3Address")
										params.polygonWeb3Address = obj.stringValue;
									if(obj.param == "binanceWeb3Address")
										params.binanceWeb3Address = obj.stringValue;
									if(obj.param == "investorInternalWalletProjectSpecific")
										params.investorInternalWalletProjectSpecific = obj.intValue;
									if(obj.param == "Ravencoin_ServerURL")
										params.Ravencoin_ServerURL = obj.stringValue;
									if(obj.param == "Ravencoin_Username")
										params.Ravencoin_Username = obj.stringValue;
									if(obj.param == "Ravencoin_Password")
										params.Ravencoin_Password = obj.stringValue;
									if(obj.param == "Ravencoin_UserWalletPassword")
										params.Ravencoin_UserWalletPassword = obj.stringValue;
								});

								params.hostname = result[1][0].stolink;
								common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
									params.Ravencoin_UserWalletPassword = pass;
									callback(null);
								}).catch((error)=>{
									params.Ravencoin_UserWalletPassword = "";
									callback(null);
								})
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in sendTokens`);
						});
					}
					function getShareTypeRecord(callback) {

						const stmt = 'select * from sharetypes where id=? and stoid=?';
						mysql.executeSQLStatement(stmt, [shareTypeID, stoid]).then((result) => {
								params.ethereumContractAddress = result[0].ethereumContractAddress;
								params.ethereumBlockchainPublicAddress = result[0].ethereumBlockchainPublicAddress,
								params.blockchainProtocol = result[0].blockchainProtocol;
								params.walletCustodayType = result[0].walletCustodayType;
								params.tanganyWalletID	= result[0].tanganyWalletID;
								params.investorBalanceToReduceCurrency = result[0].currencyid,
								params.shareTypeTitle = result[0].title;
								params.AssetName = result[0].AssetName;
								params.AssetTag = result[0].AssetTag;
								params.blockchainDecimals = result[0].blockchainDecimals;
								params.polymeshAccountID = result[0].polymeshAccountID;
								params.polyMeshDistributionVenueID = result[0].polyMeshDistributionVenueID;
								callback(null);
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in sendTokens`);
						});
					}
					function getInvestorRecord(callback) {
						const stmt = 'select * from investor where id=?';
						mysql.executeSQLStatement(stmt, [investorID]).then((result) => {
							params.investorName = `${result[0].FirstName} ${result[0].LastName}`;
							params.FirstName = result[0].FirstName;
							params.LastName = result[0].LastName;
							params.email = result[0].email;

							callback(null);
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in sendTokens`);
						});
					}
					function getInvestorCurrentStatus(callback) {
						module.exports.isInvestorWhiteListed(toAddress, shareTypeID).then((status) => {
							if(status == true)
								callback(null);
							else {
								logger.error(`Error sending tokens to investor because his address is blocked - ${toAddress}. blocking address in DB`);
								const stmt = `update shareswallet set isBlocked = 1 where investorID = ? and sharesID = ? and publicKey = ?`;

								mysql.executeSQLStatement(stmt, [investorID, shareTypeID, toAddress]).then(() => {
									reject({ code: '0', message: `Error sending tokens to investor because his address is blocked` });
								}).catch((error) => {
									reject({ code: '0', message: `${error.message} - Error occurred while sending tokens` });
								});
							}
						}).catch((error) => {
							reject({ code: '0', message: `Transaction could not be send because investor address is blocked` });
						});
					}
					function updateInvestorOffChainRecordsIfOffChainToOnChain(callback) {
						if(isOnChainTransfer == 0) {
								const stmt = `update shareswallet set shares = shares - ? where investorid = ? and sharesid = ? and publicKey = 'platform'`;

								mysql.executeSQLStatement(stmt, [amountToSend, investorID, shareTypeID]).then(() => {
									logger.info(`OffChain to OnChain transfer,  investor offchain balance is reduced by ${amountToSend}`);
									callback(null);
								}).catch((error) => {
									logger.error(`${error.message} - Error in ethereum sendToken updateDistrinbutionAccount`);
								});
						} else
							callback(null);
					}
					function getOffChainTransfersBalances(callback) {
						const stmt = `select COALESCE( sum(shares), 0) as sum from shareswallet where investorID = ? and sharesID = ? and publickey = 'platform' \
																	;\
																	select COALESCE( sum(shares), 0) as sum from shareswallet where sharesID = ? and publickey = 'platform' \
																;\ 
																select COALESCE( sum(shares), 0) as sum from shareswallet where investorID = ? and sharesID = ? and publickey != 'platform' and publickey != ?`;
						mysql.executeSQLStatement(stmt, [investorID, shareTypeID, shareTypeID, investorID, shareTypeID, toAddress]).then((result) => {
							//logger.info(`sendToken - Investor Offchain balance Amount (${result[0][0].sum}`);
							//logger.info(`sendToken - Company Offchain balance Amount (${result[1][0].sum}`);
							params.investorOffChainBalance = parseFloat( result[0][0].sum );
							params.companyOffChainBalance = parseFloat( result[1][0].sum );
							params.investorOtherKeyBalancesOfSameShareType = parseFloat ( result[2][0].sum );
							callback(null);
						}).catch((error) => {
							logger.error(`${error.message} - Error in ethereum sendToken getOffChainTransfersBalances`);
						});
					}
					function createInvestmentHistroy(callback) {
							if(isOnChainTransfer == 1) {
								const stmt = 'Insert into investments(UserID, InvestorID, DateTime, TokensTransferred, AmountInvested, CurrencyID, Description, stoid, sharetypeid) values(?, ?, Now(), ?, ?, ?, ?, ?, ?)';

								const values = [adminID, investorID, amountToSend, Investment, params.investorBalanceToReduceCurrency, InvestmentDescription, stoid, shareTypeID];

								mysql.executeSQLStatement(stmt, values).then(() => {
									callback(null);
								}).catch((error) => {
									logger.error(`${error.message} - Error in ethereum sentToken createInvestmentHistroy`);
								});
							} else
								callback(null);
					}
					function getCurrentInvestorBalance(callback) {
						if(buyPropertyAlertID != 0) {
								const sql = 'select Amount from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?'; 
								mysql.executeSQLStatement(sql, [investorID, params.investorBalanceToReduceCurrency, stoid]).then((result) => { 
									params.InvestorCurrentAmount = result[0].Amount;
									params.newInvestorAmount = params.InvestorCurrentAmount - Investment;

									callback(null);
								}).catch((error) => { 
									logger.error(`${error.toString()} - sendtokenstoinvestorblockchaincall getCurrentInvestorBalance  Error occured `); 
								});
						} else
							callback(null);
					}
					function reduceInvestorBalanceInWallet(callback) {
						if(reduceInvestorBalance == 1) {
							wallet.reduceInvestorBalance(investorID, stoid, params.investorBalanceToReduceCurrency, Investment, adminID, 5, `${amountToSend} ${params.shareTypeTitle} Shares Transfer`, 1, params.investorInternalWalletProjectSpecific).then(() => {
									callback(null);
							})
						} else
								callback(null);
					}

					function updateBuyPropertyAlert(callback) {
						let logDescription;
						if(buyPropertyAlertID != 0) {
								logDescription = `Request For Share Purchasing Approved (Blockchain). InvestorBuyPropertyAlert.ID: ${buyPropertyAlertID}`;
								const sql = `
                            update InvestorBuyPropertyAlert set status = 2 where id = ?;
                            INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);
                        `;
								mysql.executeSQLStatement(sql, [
									buyPropertyAlertID, stoid, adminID, logDescription, investorID, 22, buyPropertyAlertID
								]).then((result) => {
								logger.info(`Request For Share Purchasing Approved (Blockchain). InvestorBuyPropertyAlert.ID: ${buyPropertyAlertID} STO ID: ${stoid} User ID: ${adminID} Investor ID: ${investorID} Activity Type ID: 22 Rec ID: ${buyPropertyAlertID}`);
								const st = `update InvestorInvoices set status = 2 where buyAlertID = ?`;
								mysql.executeSQLStatement(st,buyPropertyAlertID).catch((error) => {
									common.handleError(req, res, `${error.message} Error update invoice status`);
								});
								callback(null);
								}).catch((error) => {
									logger.error(`${error.message}Error in sendtokenstoinvestorblockchaincall reduceInvestorBalance`);
								});
						} else
								callback(null);
					}

					function sendTransaction(callback) {

						var tmpBlockchainAmount = "";
						if(params.blockchainDecimals == 0)
							tmpBlockchainAmount = amountToSend.toString();
						else {
							var tmp1 =  (amountToSend + "").split(".")
							if(tmp1.length > 1) {
									for( var z =0; z < 18 - tmp1[1].toString().length; z++)
										tmpBlockchainAmount = tmpBlockchainAmount + "0";
									tmpBlockchainAmount = tmp1[0].toString() + tmp1[1].toString() + tmpBlockchainAmount;
							} else
								tmpBlockchainAmount = tmp1[0].toString() + "000000000000000000";
						}

						// console.log( params.blockchainDecimals + "....." + amountToSend + "....." + tmpBlockchainAmount );

						if(params.walletCustodayType == 0) {

							if( params.blockchainProtocol == 1 || params.blockchainProtocol == 2 || params.blockchainProtocol == 4 || params.blockchainProtocol == 5 || params.blockchainProtocol == 6) {
								var webAddress = "";
								if(params.blockchainProtocol == 5)
									webAddress = params.polygonWeb3Address;
								else if(params.blockchainProtocol == 6)
									webAddress = params.binanceWeb3Address;
								else
									webAddress = params.web3Address;

								if(metaMaskTransaction == "0") {
									ethereum.sendTokens( params.ethereumBlockchainPublicAddress, toAddress, tmpBlockchainAmount, ethereumPrivateKey, params.ethereumContractAddress, params.blockchainProtocol, webAddress ).then((transactionID)=>{
										params.transactionID = transactionID;
										callback(null);
									}).catch((err) => {
										reject({ code: '0', message: `${err.message} Error in Ethereum sendTokens` });
									});
								} else {
									params.transactionID = blockchainTransactionID;
									logger.info('Ethereum sending tokens transaction came back. processing local info through MetaMask blockchain transaction - ' + blockchainTransactionID);
									ethereum.waitEthereumTransactionCompletion(blockchainTransactionID, webAddress).then(() => {
										logger.info('Sending tokens to investors transaction complete for transaction id ' + blockchainTransactionID + ' processing local info');
										callback(null);
									}).catch((error) => {
										reject({ code: '0', message: `${error.message} Error in error occured in ethereum ethereumWhitelistAddress` });
									});
								}

							} else if( params.blockchainProtocol == 6) {
								ravencoin.transferShares(params.AssetName, params.ethereumBlockchainPublicAddress, amountToSend, toAddress, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword).then((transactionID) => {
									params.transactionID = transactionID;
									callback(null);
								}).catch(() => {
									reject({ code: '0', message: `${err.message} Error in Ravencoin sendTokens` });
								});
							} else if( params.blockchainProtocol == 7) {
								const stmt = "select mnemonic from polymeshAccounts where id = ?";
								mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
									common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {

										tansferTokensToAccountPolymesh(toAddress, amountToSend, mnemonic, params.AssetTag, params.polyMeshDistributionVenueID).then((transactionID)=> {
											params.transactionID = transactionID;
											console.log( "...." + params.transactionID )
											callback(null);
										})

									})
								}).catch((error) => {
									logger.error(`${error.message} DB error occured in sendTokens`);
								});
							}

						} else if (params.walletCustodayType == 1) {
							if( params.blockchainProtocol == 1 || params.blockchainProtocol == 2 || params.blockchainProtocol == 4 ) {
								tangany.sendTokens( params.ethereumContractAddress, toAddress, tmpBlockchainAmount, params.tanganyWalletID ).then(() => {
									params.transactionID = "-";
									callback(null);
								}).catch((err) => {
									reject({ code: '0', message: 'Tangany connection error in sendTokens sendTransaction' });
								});
							}
						}
					}
					function getInvestorAccountInfoFromBlockchain(callback) {
						if( params.blockchainProtocol == 1 || params.blockchainProtocol == 2 || params.blockchainProtocol == 4 || params.blockchainProtocol == 5 || params.blockchainProtocol == 6) {
							var webAddress = "";
							if(params.blockchainProtocol == 5)
								webAddress = params.polygonWeb3Address;
							else if(params.blockchainProtocol == 6)
								webAddress = params.binanceWeb3Address;
							else
								webAddress = params.web3Address;

							ethereum.getAccountBalance(params.blockchainProtocol, params.blockchainDecimals, toAddress, params.ethereumContractAddress, webAddress).then((data) => {
								params.investorBalance = data;

								logger.info(`sendToken - New Investor balance is (${params.investorBalance})`);
								callback(null);
							}, (err2) => {
								reject({ code: '0', message: 'Error in ethereum sendToken getInvestorAccountInfoFromBlockchain' });
							});
						} else if(params.blockchainProtocol == 3) {
							ravencoin.getAccountBalance(toAddress, params.AssetName, params.AssetTag, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((data) => {
								params.investorBalance = data;

								logger.info(`sendToken - New Investor balance is (${params.investorBalance})`);
								callback(null);
							}, (err2) => {
								reject({ code: '0', message: 'Error in ethereum sendToken getInvestorAccountInfoFromBlockchain' });
							});
						} else if(params.blockchainProtocol == 7) 
							callback(null);
					}
					function updateInvestorRecord(callback) {
						if(params.blockchainProtocol == 7) 
							callback(null);
						else {
							const stmt = `update shares set shares = ? where shareTypeid = ? and investorID = ?; update shareswallet set shares = ? where publicKey = ? and sharesID = ? and investorID = ? `;
							mysql.executeSQLStatement(stmt, [params.investorBalance + params.investorOtherKeyBalancesOfSameShareType + params.investorOffChainBalance, shareTypeID, investorID, params.investorBalance, toAddress, shareTypeID, investorID]).then(() => {
								logger.info(`sendToken - Investor balance updated Amount ( ${params.investorBalance} )`);
								callback(null);
							}).catch((error) => {
								logger.error(`${error.message} - Error in ethereum sendtoken updateInvestorRecord`);
							});
						} 

					}
					function getDistributionAccountInfoFromBlockchain(callback) {
						if( params.blockchainProtocol == 1 || params.blockchainProtocol == 2 || params.blockchainProtocol == 4 || params.blockchainProtocol == 5 || params.blockchainProtocol == 6) {
							var webAddress = "";
							if(params.blockchainProtocol == 5)
								webAddress = params.polygonWeb3Address;
							else if(params.blockchainProtocol == 6)
								webAddress = params.binanceWeb3Address;
							else
								webAddress = params.web3Address;

							ethereum.getAccountBalance(params.blockchainProtocol, params.blockchainDecimals, params.ethereumBlockchainPublicAddress, params.ethereumContractAddress, webAddress).then((data) => {
								params.distributionBalance = data;
								logger.info(`sendToken - New Distribution balance is (${params.ethereumBlockchainPublicAddress})${params.distributionBalance}`);
								callback(null);
							}, (err2) => {
								reject({ code: '0', message: `${err2.message} Error in ethereum sentToken getDistributionAccountInfoFromBlockchain` });
							});
						} else if (params.blockchainProtocol == 3) {
							ravencoin.getAccountBalance(params.ethereumBlockchainPublicAddress, params.AssetName, params.AssetTag, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((data) => {
								params.distributionBalance = data;
								logger.info(`sendToken - New Distribution balance is (${params.ethereumBlockchainPublicAddress})${params.distributionBalance}`);
								callback(null);
							}, (err2) => {
								reject({ code: '0', message: `${err2.message} Error in ethereum sentToken getDistributionAccountInfoFromBlockchain` });
							});
						} else if(params.blockchainProtocol == 7) 
							callback(null);
					}
					function updateDistrinbutionAccount(callback) {
						if(params.blockchainProtocol == 7) 
							callback(null);
						else {
								const stmt = `update sharetypes set companyShares = ? where id = ?`;
								mysql.executeSQLStatement(stmt, [params.distributionBalance - params.companyOffChainBalance, shareTypeID]).then(() => {
									logger.info(`sendToken - Distribution balance updated Amount (${params.distributionBalance - params.companyOffChainBalance}`);
									callback(null);
								}).catch((error) => {
									logger.error(`${error.message} - Error in ethereum sendToken updateDistrinbutionAccount`);
								});
						}
					}
					function updateBackgroundShareTransferRecordID(callback) {
						const stmt = `update blockchainSharesTransferTransactions set status = 2, transactionID = ? where id = ?`;
						mysql.executeSQLStatement(stmt, [params.transactionID, backgroundShareTransferRecordID]).then(() => {
							callback(null);
						}).catch((error) => {
							logger.error(`${error.message} - Error in ethereum sendToken updateDistrinbutionAccount`);
						});
					}
					async.waterfall([
						getParams,
						getShareTypeRecord,
						getInvestorRecord,
						getInvestorCurrentStatus,
						updateInvestorOffChainRecordsIfOffChainToOnChain,
						getOffChainTransfersBalances,
						createInvestmentHistroy,
						getCurrentInvestorBalance,
						reduceInvestorBalanceInWallet,
						updateBuyPropertyAlert,

						sendTransaction,
						getInvestorAccountInfoFromBlockchain,
						updateInvestorRecord,
						getDistributionAccountInfoFromBlockchain,
						updateDistrinbutionAccount,
						updateBackgroundShareTransferRecordID
					], (err2) => {
						if (!err2) {
								const LogDescription = `${amountToSend} company shares transferred to investor id ${investorID} . Public Key ${toAddress}`;

								const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid) values (?,NOW(),?,?,?,?)';
								const sqlparams = [adminID, LogDescription, investorID, 5, stoid];

								mysql.executeSQLStatement(stmt, sqlparams)
									.then(() => {
											if (sendEmailToInvestor == 1) {
												const stoEmailTexts = emailTextsController.default.globalEmailTexts(stoid);
												if (!stoEmailTexts) throw new Error(`Email texts not found for sharesTransferredBlockchain`);

												let txtEmail = emailTextsController.format(stoEmailTexts.sharesTransferredBlockchain.Line1, {
													firstname: params.FirstName,
													lastname: params.LastName,
													key: toAddress,
													amount: amountToSend,
												});
												txtEmail += '<br /><br />';
												txtEmail += getSTOFromConfig(stoid).emailFooter;

													// let txtEmail = '';

													// txtEmail = `Dear ${params.FirstName} ${params.LastName}`;
													// txtEmail += '<br /><br />';

													// txtEmail += emailTexts.sharesTransferredBlockchain.Line1;
													// txtEmail += '<br /><br />';
													// txtEmail += `<b>Your Public Key</b> : ${toAddress}`;
													// txtEmail += '<br /><br />';
													// txtEmail += `<b>Shares Transferred</b> : ${amountToSend}`;
													// txtEmail += '<br /><br />';
													//txtEmail += global.config.stos[hostname].emailFooter
													common.sendEmail(params.hostname, params.email, `Shares are transferred`, txtEmail)
													.then(() => {
														logger.info(`1111sendToken Execution Complete from-${params.ethereumBlockchainPublicAddress} To-${toAddress} amount-${amountToSend}`);
													}, (err2) => {
														logger.info(`${err2.message} Error occured in sendTokens send email. Overall blockchain and DB operation complete but email could not be send`);
													});

											} else { logger.info(`sendToken Execution Complete from-${params.ethereumBlockchainPublicAddress} To-${toAddress} amount-${amountToSend}`); }
									})
									.catch((error) => {
										logger.error(`${error.message} - Error occured in ethereum sendToken`);
								});
						}
					});

			} catch (err) {
				logger.error(`${err.message}. Error occured in sendTokens` );
			}

			resolve("processing")
		}));

	},

	whitelistInvestorNewAddress( publicKeyUser, authoeize, ethereumPrivateKey, shareID, investorID, stoid, isCurrentWallet, recID, metaMaskTransaction, blockchainTransactionID) {
		logger.info(`whitelistInvestorNewAddress transaction starting address-${publicKeyUser}  authorize-${authoeize} Sending transaction`);
        var params = {};

 		return new Promise(((resolve, reject) => {

			const params = {};
			async.waterfall ([
				function function0 (callback) {
					const stmt = "select * from params where param in ('web3Address', 'polygonWeb3Address', 'binanceWeb3Address', 'investorInternalWalletProjectSpecific', 'Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword'); select stolink from stos where id = ?";
					mysql.executeSQLStatement(stmt, [stoid]).then((result) => {
							result[0].forEach(obj=>{
								if(obj.param == "web3Address")
									params.web3Address = obj.stringValue;
								if(obj.param == "polygonWeb3Address")
									params.polygonWeb3Address = obj.stringValue;
								if(obj.param == "binanceWeb3Address")
									params.binanceWeb3Address = obj.stringValue;
								if(obj.param == "investorInternalWalletProjectSpecific")
									params.investorInternalWalletProjectSpecific = obj.intValue;
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
								if(obj.param == "Ravencoin_UserWalletPassword")
									params.Ravencoin_UserWalletPassword = obj.stringValue;
							});

							params.hostname = result[1][0].stolink;
							common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
								params.Ravencoin_UserWalletPassword = pass;
								callback(null);
							}).catch((error)=>{
								params.Ravencoin_UserWalletPassword = "";
								callback(null);
							})

					}).catch((error) => {
						logger.error(`${error.message} DB error occured in whitelist investor new address`);
					});
				},
				function function1(callback) {
					const stmt = "select * from sharetypes where id = ?";
					mysql.executeSQLStatement(stmt, [shareID]).then((result) => {
						params.distributionPublciKey = result[0].ethereumBlockchainPublicAddress;
						params.protocol = result[0].blockchainProtocol;
						params.ethereumWhitelistAddress = result[0].ethereumWhitelistAddress;
						params.ethereumContractAddress = result[0].ethereumContractAddress;
						params.AssetName = result[0].AssetName;
						params.AssetTag = result[0].AssetTag;
						params.blockchainDecimals = result[0].blockchainDecimals;
						params.polymeshAccountID = result[0].polymeshAccountID;
						callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in ethereumWhitelistAddress`);
					});
				},
				function function2(callback) {
					if(params.protocol == 3) {
						ravencoin.checkAddressHasAssetTag(publicKeyUser, params.AssetTag, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((status) => {
							params.currentStatus = status;
							callback(null);
						}).catch((error) => {
							reject({ code: '0', message: `${error.message} Error in error occured in ravencoin ethereumWhitelistAddress` });
						});
					} else
						callback(null);
				},
				function function3 (callback) {
					if(params.protocol == 1 || params.protocol == 2 || params.protocol == 4 || params.protocol == 5 || params.protocol == 6) {
						var webAddress = "";
						if(params.protocol == 5)
							webAddress = params.polygonWeb3Address;
						else if(params.protocol == 6)
							webAddress = params.binanceWeb3Address;
						else
							webAddress = params.web3Address;

						if(metaMaskTransaction == "0") {
							ethereum.whitelisAddress(params.protocol, params.distributionPublciKey, publicKeyUser, authoeize, ethereumPrivateKey, params.ethereumWhitelistAddress, webAddress).then(() => {
								logger.info('Ethereum whitelistInvestorNewAddress transaction came back. processing local info');
								callback(null);
							}).catch((error) => {
								reject({ code: '0', message: `${error.message} Error in error occured in ethereum ethereumWhitelistAddress` });
							});
						} else {
							logger.info('Ethereum whitelistInvestorNewAddress transaction came back. processing local info through MetaMask blockchain transaction - ' + blockchainTransactionID);
							ethereum.waitEthereumTransactionCompletion(blockchainTransactionID, webAddress).then(() => {
								logger.info('Whitelist transaction complete for transaction id ' + blockchainTransactionID + ' processing local info');
								callback(null);
							}).catch((error) => {
								reject({ code: '0', message: `${error.message} Error in error occured in ethereum ethereumWhitelistAddress` });
							});
						}
					} else if(params.protocol == 3) {
						var tmpBook = (authoeize === 'true');
						if( params.currentStatus != tmpBook ) {
							ravencoin.whitelisAddress(publicKeyUser, authoeize, params.AssetTag, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword).then(() => {
								logger.info('Ravencoin whitelistInvestorNewAddress transaction came back. processing local info');
								callback(null);
							}).catch((error) => {
								reject({ code: '0', message: `${error.message} Error in error occured in ravencoin ethereumWhitelistAddress` });
							});
						} else {
							logger.info(`Ravencoin whitelistInvestorNewAddress transaction was not send because user ${publicKeyUser} already has status ${authoeize}`);
							callback(null);
						}

					} else if(params.protocol == 7) {
						const stmt = "select * from polymeshKYCRequirements where sharetypeid = ?";
						mysql.executeSQLStatement(stmt, [shareID]).then((result) => {
							const nextYear = new Date();
							nextYear.setFullYear(nextYear.getFullYear() + 1);

							var claimsJSON = {"claims": []};
							result.forEach(rec=> {
								if(rec.keydata == "Jurisdiction") {
									claimsJSON.claims.push(
									{
										"claim": {
											"type": ClaimType.Jurisdiction,
											"code": CountryCode[rec.keyvalue],
											"scope": {
												"type": "Ticker",
												"value": params.AssetTag
											}
										},
										"expiry": nextYear,
										"target": publicKeyUser
									});
								}
								if(rec.keydata == "KnowYourCustomer") {
									claimsJSON.claims.push(
									{
											"claim": {
												"type": ClaimType.KnowYourCustomer,
												"scope": {
													"type": "Ticker",
													"value": params.AssetTag
												}
											},
											"expiry": nextYear,
											"target": publicKeyUser
									})
								}
							})


							const stmt = "select mnemonic from polymeshAccounts where id = ?";
							mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
								common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {

									whitelistInvestorCDDAddress(claimsJSON, authoeize, mnemonic).then(()=> {
										callback(null);
									})		

								})
							}).catch((error) => {
								logger.error(`${error.message} DB error occured in whitelistInvestorNewAddress`);
							});
		
							
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in ethereumWhitelistAddress`);
						});
					}
				},
				function function4 (callback) {
					if (authoeize === 'true') {

						//isCurrentWallet == false    new investor address from investorpublickeys with recID
						//isCurrentWallet == true     existing investor wallet address from shareswallet with recID
						if(isCurrentWallet == 'false') {
							function checkInvestorSharesRecordExists(callback) {
								const stmt = 'select * from shares where investorID = ? and sharetypeid = ?';
								mysql.executeSQLStatement(stmt, [investorID, shareID]).then((results) => {
									if(results.length == 0)
										params.shareRecordFound = 0;
									else
										params.shareRecordFound = 1;

									callback(null);
								}).catch((error) => {
									logger.error(`${error.message} - Error occured in  ethereum ethereumWhitelistAddress  - ${publicKeyUser}`);
								});
							}
							function createInvestorSharesRecord(callback) {

								if(params.shareRecordFound == 0) {
										const stmt = 'insert into shares(stoid, shareTypeid, PublicKey, isBlockchainFrozen, isBlockchainAuthorized, shares, investorID, sharesHistoryID) value (?, ?, ?, ?, ?, ?, ?, ?)';
										mysql.executeSQLStatement(stmt, [stoid, shareID, "", 0, 1, 0, investorID, 0]).then((results) => {
											callback(null);
										}).catch((error) => {
											logger.error(`${error.message} - Error occured in  ethereum ethereumWhitelistAddress  - ${publicKeyUser}`);
										});
								} else
									callback(null);
							}
							function insertPublicAddress(callback) {
								const stmt = 'insert into shareswallet(investorID, sharesID, shares, publicKey, isBlocked) values (?, ?, ?, ?, ?)';
								mysql.executeSQLStatement(stmt, [investorID, shareID, 0, publicKeyUser, 0]).then(() => {
									logger.info("Investor address is whitelisted");
								}).catch((error) => {
									logger.error(`${error.message} - Error occured in  ethereum ethereumWhitelistAddress  - ${publicKeyUser}`);
								});
							}
							async.waterfall([
								checkInvestorSharesRecordExists,
								createInvestorSharesRecord,
								insertPublicAddress
							], (err) => {

							});
						} else {

							const stmt = 'update shareswallet set isBlocked = 0 where investorID = ? and sharesid = ? and id = ?';
							mysql.executeSQLStatement(stmt, [investorID, shareID, recID]).then((results) => {
								logger.info("Investor address is activated");
							}).catch((error) => {
								logger.error(`${error.message} - Error occured in  ethereum ethereumWhitelistAddress  - ${publicKeyUser}`);
							});
						}

					} else {

						var investorBalanceFromBlockchain = 0;
						async.waterfall ([
							function getSTORecord (callback) {

								if(params.protocol == 1 || params.protocol == 2 || params.protocol == 4 || params.protocol == 5 || params.protocol == 6) {
									// The wallet address is in shareswallet   check in the blockchain if it's balance is also 0 then remove it from the list altogather
									var webAddress = "";
									if(params.protocol == 5)
										webAddress = params.polygonWeb3Address;
									else if(params.protocol == 6)
										webAddress = params.binanceWeb3Address;
									else
										webAddress = params.web3Address;

									ethereum.getAccountBalance(params.protocol, params.blockchainDecimals, publicKeyUser, params.ethereumContractAddress, webAddress).then((data) => {
										investorBalanceFromBlockchain = parseInt(data, 10);
										callback(null);
									}, (err2) => {
										reject({ code: '0', message: `${err2.message} Error in error occured in ethereum getAccountBalance ethereumWhitelistAddress` });
									});
								} else if(params.protocol == 3 ) {
									ravencoin.getAccountBalance(publicKeyUser, params.AssetName, params.AssetTag, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((balance) => {
										investorBalanceFromBlockchain = balance;
										callback(null);
									}).catch(() => {
										reject({ code: '0', message: 'ravencoin getAccountBalance network connection error in ethereumWhitelistAddress' });
									});
								} else if(params.protocol == 7) {
									// TODO check balance from polymesh blockchain
									investorBalanceFromBlockchain = 0;
									callback(null);
								}
							},
							function function2 (callback) {
								var stmt = "";
								// check if investor has some balance in this address, if yes then disable record
								// or delete the reocrd if balance is 0. The main record in shares do not need to be
								// changed as that is already set
								if(investorBalanceFromBlockchain > 0 )
									stmt = 'update shareswallet set isBlocked = 1 where investorID = ? and sharesid = ? and id = ?';
								else
									stmt = 'delete from shareswallet where investorID = ? and sharesid = ? and id = ?';

								mysql.executeSQLStatement(stmt, [investorID, shareID, recID]).then((results) => {
									logger.info("Investor address is blocked");
								}).catch((error) => {
									logger.error(`${error.message} - Error occured in  ethereum ethereumWhitelistAddress  - ${publicKeyUser}`);
								});
							}
						])

					}

				}
			])

			resolve('processing');
		}));
	},

	tokenCreateBurn: function(operation,  amountToSend, ethereumPrivateKey, stoid, ShareTypeID, tokenCreationRequestID, userId, metaMaskTransaction, blockchainTransactionID, reason) {

		return new Promise(((resolve, reject) => {
			try {
				const params = {};
				async.waterfall ([
					function function1 (callback) {
						const stmt = "select * from params where param in ('web3Address', 'polygonWeb3Address', 'binanceWeb3Address', 'Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword'); select stolink from stos where id = ?";
						mysql.executeSQLStatement(stmt, [stoid]).then((result) => {
							result[0].forEach(obj=>{
								if(obj.param == "web3Address")
									params.web3Address = obj.stringValue;
								if(obj.param == "polygonWeb3Address")
									params.polygonWeb3Address = obj.stringValue;
								if(obj.param == "binanceWeb3Address")
									params.binanceWeb3Address = obj.stringValue;
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
								if(obj.param == "Ravencoin_UserWalletPassword")
									params.Ravencoin_UserWalletPassword = obj.stringValue;
							});

							params.hostname = result[1][0].stolink;
							params.hostname = result[1][0].stolink;
							common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
								params.Ravencoin_UserWalletPassword = pass;
								callback(null);
							}).catch((error)=>{
								params.Ravencoin_UserWalletPassword = "";
								callback(null);
							})
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in TokenCreateBurn`);
						});
					},
					function function2(callback) {
						const stmt = "select * from sharetypes where id = ?";
						mysql.executeSQLStatement(stmt, [ShareTypeID]).then((result) => {
							params.distributionPublciKey = result[0].ethereumBlockchainPublicAddress;
							params.protocol = result[0].blockchainProtocol;
							params.ethereumWhitelistAddress = result[0].ethereumWhitelistAddress;
							params.ethereumContractAddress = result[0].ethereumContractAddress;
							params.AssetName = result[0].AssetName;
							params.AssetTag = result[0].AssetTag;
							params.blockchainDecimals = result[0].blockchainDecimals;
							params.polymeshAccountID = result[0].polymeshAccountID;
							callback(null);
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in TokenCreateBurn`);
						});
					},
					function function3 (callback) {
						if(params.protocol == 1 || params.protocol == 2 || params.protocol == 4 || params.protocol == 5 || params.protocol == 6) {
							var webAddress = "";
							if(params.protocol == 5)
								webAddress = params.polygonWeb3Address;
							else if(params.protocol == 6)
								webAddress = params.binanceWeb3Address;
							else
								webAddress = params.web3Address;

							if(metaMaskTransaction == "0") {
								ethereum.tokenCreateBurn(operation, params.protocol, params.distributionPublciKey, amountToSend, ethereumPrivateKey, webAddress, params.ethereumContractAddress, params.blockchainDecimals).then(() => {
									callback(null);
								}, (err) => {
									reject({ code: '0', message: `${err.message} - Error occured in ethereum tokenCreateBurn  ` });
								});
							} else {
								logger.info('Ethereum Create / Burn tokens transaction came back. processing local info through MetaMask blockchain transaction - ' + blockchainTransactionID);
								ethereum.waitEthereumTransactionCompletion(blockchainTransactionID, webAddress).then(() => {
									logger.info('Create / Burn tokens transaction complete for transaction id ' + blockchainTransactionID + ' processing local info');
									callback(null);
								}).catch((error) => {
									reject({ code: '0', message: `${error.message} Error in error occured in ethereum ethereumWhitelistAddress` });
								});
							}

						} else if (params.protocol == 3) {
							ravencoin.tokenCreateBurn(operation, params.AssetName, params.distributionPublciKey, amountToSend, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword).then(() => {
								callback(null);
							}, (err) => {
								reject({ code: '0', message: `${err.message} - Error occured in ravencoin tokenCreateBurn ` });
							});
						} else if (params.protocol == 7) {

							const stmt = "select mnemonic from polymeshAccounts where id = ?";
							mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
								common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {
									createPolymeshTokens(operation, params.AssetTag, amountToSend, mnemonic).then(() => {
										callback(null);
									})
								})
							}).catch((error) => {
								logger.error(`${error.message} DB error occured in tokenCreateBurn`);
							});

						}
					},
					function function4 (callback) {

						function deleteCreationRequest(callback) {
							const stmt2 = `delete from tokencreationrequests where id = ?`;
							mysql.executeSQLStatement(stmt2, [tokenCreationRequestID]).then(() => {
								callback(null);
							}).catch((error) => {
								logger.error(`${error.message}Error occured in  createNewToken sendSignedTransaction`);
							});
						}
						function logInfo(callback) {
							var activityTypeID =0 ;
							var LogDescription = "";
							if(operation == 1) {
								activityTypeID = 7;
								LogDescription = `${amountToSend} new company share(s) created. ${reason} `;
							} else  if(operation == 2) {
								activityTypeID = 10;
								LogDescription = `${amountToSend}  company share(s) deleted from blockchain. ${reason} `;
							}

							const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid, recid) values (?,NOW(),?,?,?,?,?)';
							const sqlparams = [userId, LogDescription, -1, activityTypeID, stoid, ShareTypeID];
							mysql.executeSQLStatement(stmt, sqlparams)
								.then(() => {
									callback(null);
								})
								.catch((error) => {
									logger.error(`${error.message} - Error occured in ethereum sendToken`);
								});
						}
						async.waterfall([
							deleteCreationRequest,
							logInfo,
						], (err2) => {
							logger.info(`New Shares Created in blockchain`);
						});
					}

				])
			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in whitelisAddress` });
			}

			//just go back and refresh later
			resolve("done");
		}));

	},

	getTotalSupplyOfTokens: function(shareID) {

		return new Promise(((resolve, reject) => {

			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param in ('web3Address', 'polygonWeb3Address', 'binanceWeb3Address', 'Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password'); select blockchainProtocol, ethereumContractAddress, AssetName, AssetTag, blockchainDecimals, polymeshAccountID from sharetypes where id = ?;";
					mysql.executeSQLStatement(stmt, [shareID]).then((result) => {
							result[0].forEach(obj=>{
								if(obj.param == "web3Address")
									params.web3Address = obj.stringValue;
								if(obj.param == "polygonWeb3Address")
									params.polygonWeb3Address = obj.stringValue;
								if(obj.param == "binanceWeb3Address")
									params.binanceWeb3Address = obj.stringValue;
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
							});

							params.protocol = result[1][0].blockchainProtocol;
							params.contractAddress = result[1][0].ethereumContractAddress;
							params.blockchainDecimals = result[1][0].blockchainDecimals;
							params.AssetName = result[1][0].AssetName;
							params.AssetTag = result[1][0].AssetTag;
							params.polymeshAccountID = result[1][0].polymeshAccountID;

							callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in getTotalSupplyOfTokens`);
					});
				},
				function function2 (callback) {

					if(params.protocol == 1 || params.protocol == 2 || params.protocol == 4 || params.protocol == 5 || params.protocol == 6) {
						try {
								var webAddress = "";
								if(params.protocol == 5)
									webAddress = params.polygonWeb3Address;
								else if(params.protocol == 6)
									webAddress = params.binanceWeb3Address;
								else
									webAddress = params.web3Address;

								ethereum.getTotalSupplyOfTokens(params.protocol, params.blockchainDecimals, params.contractAddress, webAddress).then((balance) => {
									resolve(balance)
								}).catch(() => {
									reject({ code: '0', message: 'Ethereum network connection error in getTotalSupplyOfTokens' });
								});
						} catch (err) {
							reject({ code: '0', message: `${err.message}. Error occured in ethereum getTotalSupplyOfTokens` });
						}
					} else if (params.protocol == 3 ) {
						try {
							ravencoin.getTotalSupplyOfTokens(params.AssetName, params.AssetTag, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((balance) => {
								resolve(balance)
							}).catch(() => {
								reject({ code: '0', message: 'Ethereum network connection error in getTotalSupplyOfTokens' });
							});
						} catch (err) {
							reject({ code: '0', message: `${err.message}. Error occured in ravencoin getTotalSupplyOfTokens` });
						}
					} else if (params.protocol == 7 ) {
						const stmt = "select mnemonic from polymeshAccounts where id = ?";
						mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
							common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {
								
								getTotalSupplyOfTokens(params.AssetTag, mnemonic).then((balance) => {
									resolve(balance);
								})

							})
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in getTotalSupplyOfTokens`);
						});

					}
				}
			])
		}));

    },

	getAccountBalance(shareID, address) {
		return new Promise(((resolve, reject) => {
			const params = {};

			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param in ('web3Address', 'polygonWeb3Address', 'binanceWeb3Address', 'Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password'); select blockchainProtocol, ethereumContractAddress, AssetName, AssetTag, blockchainDecimals, ethereumBlockchainPublicAddress, polymeshAccountID from sharetypes where id = ?;";
					mysql.executeSQLStatement(stmt, [shareID]).then((result) => {
							result[0].forEach(obj=>{
								if(obj.param == "web3Address")
									params.web3Address = obj.stringValue;
								if(obj.param == "polygonWeb3Address")
									params.polygonWeb3Address = obj.stringValue;
								if(obj.param == "binanceWeb3Address")
									params.binanceWeb3Address = obj.stringValue;
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
							});

							params.protocol = result[1][0].blockchainProtocol;
							params.contractAddress = result[1][0].ethereumContractAddress;
							params.AssetName = result[1][0].AssetName;
							params.AssetTag = result[1][0].AssetTag;
							params.blockchainDecimals = result[1][0].blockchainDecimals;
							params.ethereumBlockchainPublicAddress = result[1][0].ethereumBlockchainPublicAddress;
							params.polymeshAccountID = result[1][0].polymeshAccountID;

							callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in getAccountBalance`);
					});
				},
				function function2 (callback) {

					if(params.protocol == 1 || params.protocol == 2 || params.protocol == 4 || params.protocol == 5 || params.protocol == 6) {
						var webAddress = "";
						if(params.protocol == 5)
							webAddress = params.polygonWeb3Address;
						else if(params.protocol == 6)
							webAddress = params.binanceWeb3Address;
						else
							webAddress = params.web3Address;

						ethereum.getAccountBalance(params.protocol, params.blockchainDecimals, address, params.contractAddress, webAddress).then((balance) => {
							resolve(balance)
						}).catch(() => {
							reject({ code: '0', message: 'Ethereum network connection error in getAccountBalance' });
						});
					} else if (params.protocol == 3 ) {
						ravencoin.getAccountBalance(address, params.AssetName, params.AssetTag, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((balance) => {
							resolve(balance)
						}).catch(() => {
							reject({ code: '0', message: 'Error occured in ravencoin getAccountBalance' });
						});
					} else if (params.protocol == 7 ) {

						const stmt = "select mnemonic from polymeshAccounts where id = ?";
						mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
							common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {
								
								getAccountBalance(params.AssetTag, address, mnemonic).then((balance) => {
									resolve(balance);
								})
							})
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in getAccountBalance`);
						});

					}
				}
			])

		}));
	},

	isInvestorWhiteListed(address, shareID) {
		return new Promise(((resolve, reject) => {

			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param in ('web3Address', 'polygonWeb3Address', 'binanceWeb3Address', 'Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password'); select blockchainProtocol, ethereumWhitelistAddress, AssetName, AssetTag, polymeshAccountID from sharetypes where id = ?;";
					mysql.executeSQLStatement(stmt, [shareID]).then((result) => {
							result[0].forEach(obj=>{
								if(obj.param == "web3Address")
									params.web3Address = obj.stringValue;
								if(obj.param == "polygonWeb3Address")
									params.polygonWeb3Address = obj.stringValue;
								if(obj.param == "binanceWeb3Address")
									params.binanceWeb3Address = obj.stringValue;
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
							});

							params.protocol = result[1][0].blockchainProtocol;
							params.ethereumWhitelistAddress = result[1][0].ethereumWhitelistAddress;
							params.AssetName = result[1][0].AssetName;
							params.AssetTag = result[1][0].AssetTag;
							params.polymeshAccountID = result[1][0].polymeshAccountID;

							callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in isInvestorWhiteListed`);
					});
				},

				function function3(callback) {
					if(params.protocol == 1 || params.protocol == 2 || params.protocol == 4 || params.protocol == 5 || params.protocol == 6) {
						var webAddress = "";
						if(params.protocol == 5)
							webAddress = params.polygonWeb3Address;
						else if(params.protocol == 6)
							webAddress = params.binanceWeb3Address;
						else
							webAddress = params.web3Address;

						ethereum.isInvestorWhiteListed(params.protocol, address, params.ethereumWhitelistAddress, webAddress).then((status) => {
							resolve(status)
						}).catch(() => {
							reject({ code: '0', message: 'Ethereum network connection error in isInvestorWhiteListed' });
						});
					} else if (params.protocol == 3 ) {
						ravencoin.checkAddressHasAssetTag(address, params.AssetTag, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((status) => {
							resolve(status)
						}).catch(() => {
							reject({ code: '0', message: 'ravencoin network connection error in isInvestorWhiteListed' });
						});
					} else if (params.protocol == 7 ) {

						const stmt = "select mnemonic from polymeshAccounts where id = ?";
						mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
							common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {
								
								isPolymeshAccountWhitelisted(mnemonic, params.AssetTag, address).then((status)=> {
									
									resolve(status)
								})								

							})
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in isInvestorWhiteListed`);
						});
	
					}

				}
			]);

		}));
	},

	isInvestorWhiteListedRavencoinDirect(address, tag) {
		return new Promise(((resolve, reject) => {

			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param in ('Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password')";
					mysql.executeSQLStatement(stmt, []).then((result) => {
							result.forEach(obj=>{
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
							});
							callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in isInvestorWhiteListedRavencoinDirect`);
					});
				},

				function function3(callback) {
					ravencoin.checkAddressHasAssetTag(address, tag, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((status) => {
						resolve(status)
					}).catch(() => {
						reject({ code: '0', message: 'ravencoin network connection error in isInvestorWhiteListed' });
					});
				}
			]);

		}));
	},

  	getAccountAllowance: function(shareID, fromaddress, toaddress) {
		return new Promise((resolve, reject) => {
			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = `select * from params where param = 'web3Address'; 
					select blockchainProtocol, ethereumContractAddress, blockchainDecimals from sharetypes where id = ?; 
					select * from params where param = 'polygonWeb3Address';
					select * from params where param = 'binanceWeb3Address';`;
					mysql.executeSQLStatement(stmt, [shareID]).then((result) => {
						params.web3Address = result[0][0].stringValue;
						params.polygonWeb3Address = result[2][0].stringValue;
						params.binanceWeb3Address = result[3][0].stringValue;
						params.protocol = result[1][0].blockchainProtocol;
						params.contractAddress = result[1][0].ethereumContractAddress;
						params.blockchainDecimals = result[1][0].blockchainDecimals;
						callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in getAccountAllowance`);
					});
				},
				function function2 (callback) {
					try {
						var webAddress = "";
						if(params.protocol == 5)
							webAddress = params.polygonWeb3Address;
						else if(params.protocol == 6)
							webAddress = params.binanceWeb3Address;
						else
							webAddress = params.web3Address;

						ethereum.getAccountAllowance(params.protocol, params.blockchainDecimals, fromaddress, toaddress, params.contractAddress, webAddress).then((balance) => {
							resolve(balance)
						}).catch((err) => {
							reject({ code: '0', message: `${err.message}. Ethereum network connection error in getAccountAllowance` });
						});
					} catch (err) {
							reject({ code: '0', message: `${err.message}. Error occured in getAccountAllowance` });
					}
				}
			])
		});
	},

	getDecimals: function(shareID) {
		return new Promise((resolve, reject) => {
			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = `select * from params where param = 'web3Address'; 
					select blockchainProtocol, ethereumContractAddress, AssetTag, polymeshAccountID from sharetypes where id = ?;
					select * from params where param = 'polygonWeb3Address';
					select * from params where param = 'binanceWeb3Address'`;
					mysql.executeSQLStatement(stmt, [shareID]).then((result) => {
						params.web3Address = result[0][0].stringValue;
						params.polygonWeb3Address = result[2][0].stringValue;
						params.binanceWeb3Address = result[3][0].stringValue;
						params.protocol = result[1][0].blockchainProtocol;
						params.contractAddress = result[1][0].ethereumContractAddress;
						params.AssetTag = result[1][0].AssetTag;
						params.polymeshAccountID = result[1][0].polymeshAccountID;

						callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in getDecimals`);
					});
				},
				function function2 (callback) {
					try {
						if(params.protocol == 1 || params.protocol == 2 || params.protocol == 4 || params.protocol == 5 || params.protocol == 6) {

								var webAddress = "";
								if(params.protocol == 5)
									webAddress = params.polygonWeb3Address;
								else if(params.protocol == 6)
									webAddress = params.binanceWeb3Address;
								else    // others are Etheruem based protocols like R, Polymath and ERc1404
									webAddress = params.web3Address;

								ethereum.getDecimals(params.protocol, params.contractAddress, webAddress).then((decimals) => {
									resolve(decimals)
								}).catch((err) => {
									reject({ code: '0', message: `${err.message}. Ethereum network connection error in getDecimals` });
								});

						} else if (params.protocol == 3 ) {
							resolve(8);    //TODO get decimals form ravencoin
						} else if (params.protocol == 7 ) {
							const stmt = "select mnemonic from polymeshAccounts where id = ?";
							mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
								common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {
									isTokenDivisible(params.AssetTag, mnemonic).then((divisible) => {
										resolve(divisible);
									})
								})
							}).catch((error) => {
								logger.error(`${error.message} DB error occured in getDecimals`);
							});
						}

					} catch (err) {
							reject({ code: '0', message: `${err.message}. Error occured in getDecimals` });
					}
				}
			])
		});
	},

	getPolyMathERC1400WhitelistAddress: function(id) {

		return new Promise((resolve, reject) => {
			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param = 'web3Address'; select blockchainProtocol, ethereumContractAddress from sharetypes where id = ?";
					mysql.executeSQLStatement(stmt, [id]).then((result) => {
						params.web3Address = result[0][0].stringValue;
						params.protocol = result[1][0].blockchainProtocol;
						params.contractAddress = result[1][0].ethereumContractAddress;
						callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in getPolyMathERC1400WhitelistAddress`);
					});
				},
				function function2 (callback) {
					try {
						ethereum.getPolyMathERC1400WhitelistAddress( params.contractAddress, params.protocol, params.web3Address).then((address) => {
							resolve(address)
						}).catch((err) => {
							reject({ code: '0', message: `${err.message}. Ethereum network connection error in getPolyMathERC1400WhitelistAddress` });
						});
					} catch (err) {
							reject({ code: '0', message: `${err.message}. Error occured in getPolyMathERC1400WhitelistAddress` });
					}
				}
			]);
		});
	},

	waitForTransactionCompletion: function(transactionID, shareID) {
		return new Promise(((resolve, reject) => {

			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param in ('web3Address', 'polygonWeb3Address', 'binanceWeb3Address', 'Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password'); select blockchainProtocol, ethereumContractAddress, AssetName, AssetTag, blockchainDecimals from sharetypes where id = ?;";
					mysql.executeSQLStatement(stmt, [shareID]).then((result) => {
							result[0].forEach(obj=>{
								if(obj.param == "web3Address")
									params.web3Address = obj.stringValue;
								if(obj.param == "polygonWeb3Address")
									params.polygonWeb3Address = obj.stringValue;
								if(obj.param == "binanceWeb3Address")
									params.binanceWeb3Address = obj.stringValue;
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
							});

							params.protocol = result[1][0].blockchainProtocol;
							params.contractAddress = result[1][0].ethereumContractAddress;
							params.blockchainDecimals = result[1][0].blockchainDecimals;
							params.AssetName = result[1][0].AssetName;
							params.AssetTag = result[1][0].AssetTag;

							callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in waitForTransactionCompletion`);
					});
				},
				function function2 (callback) {

					if(params.protocol == 1 || params.protocol == 2 || params.protocol == 4 || params.protocol == 5 || params.protocol == 6) {
						try {
								var webAddress = "";
								if(params.protocol == 5)
									webAddress = params.polygonWeb3Address;
								else if(params.protocol == 6)
									webAddress = params.binanceWeb3Address;
								else
									webAddress = params.web3Address;

								ethereum.waitEthereumTransactionCompletion(transactionID, webAddress).then((balance) => {
									resolve("done")
								}).catch(() => {
									reject({ code: '0', message: 'Ethereum network connection error in waitForTransactionCompletion' });
								});
						} catch (err) {
							reject({ code: '0', message: `${err.message}. Error occured in ethereum getTotalSupplyOfTokens` });
						}
					} else if (params.protocol == 3 ) {
						try {
							ravencoin.waitForTransaction(transactionID, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((balance) => {
								resolve("done")
							}).catch(() => {
								reject({ code: '0', message: 'Ethereum network connection error in getTotalSupplyOfTokens' });
							});
						} catch (err) {
							reject({ code: '0', message: `${err.message}. Error occured in ravencoin waitForTransactionCompletion` });
						}
					}

				}
			])

		}));
	},

	getnewaddress: function() {

		return new Promise(((resolve, reject) => {
			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param in ('Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword')";
					mysql.executeSQLStatement(stmt, []).then((result) => {
							result.forEach(obj=>{
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
								if(obj.param == "Ravencoin_UserWalletPassword")
									params.Ravencoin_UserWalletPassword = obj.stringValue;
							});

							common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
								params.Ravencoin_UserWalletPassword = pass;
								callback(null);
							}).catch((error)=>{
								params.Ravencoin_UserWalletPassword = "";
								callback(null);
							})
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in getnewaddress`);
					});
				},
				function function2 (callback) {
					try {
						ravencoin.getnewaddress(params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword).then((address) => {
							resolve(address);
						}).catch((error) => {
							logger.error("getnewaddress - " + error.message)
							reject({ code: '0', message: 'Ethereum network connection error in getnewaddress' });
						});
					} catch (err) {
						reject({ code: '0', message: `${err.message}. Error occured in ravencoin getnewaddress` });
					}
				}
			])
		}));

    },

	listreceivedbyaddress: function() {

		return new Promise(((resolve, reject) => {
			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param in ('Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword')";
					mysql.executeSQLStatement(stmt, []).then((result) => {
							result.forEach(obj=>{
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
								if(obj.param == "Ravencoin_UserWalletPassword")
									params.Ravencoin_UserWalletPassword = obj.stringValue;
							});

							common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
								params.Ravencoin_UserWalletPassword = pass;
								callback(null);
							}).catch((error)=>{
								params.Ravencoin_UserWalletPassword = "";
								callback(null);
							})
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in listreceivedbyaddress`);
					});
				},
				function function2 (callback) {
					try {
						ravencoin.listreceivedbyaddress(params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((addresses) => {
							resolve(addresses);
						}).catch((error) => {
							logger.error("listaddressgroupings - " + error.message)
							reject({ code: '0', message: 'Ethereum network connection error in listaddressgroupings' });
						});
					} catch (err) {
						reject({ code: '0', message: `${err.message}. Error occured in ravencoin getRavenRVNBalance` });
					}
				}
			])
		}));

    },

	getRavenRVNBalance: function() {

		return new Promise(((resolve, reject) => {
			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param in ('Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword')";
					mysql.executeSQLStatement(stmt, []).then((result) => {
							result.forEach(obj=>{
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
								if(obj.param == "Ravencoin_UserWalletPassword")
									params.Ravencoin_UserWalletPassword = obj.stringValue;
							});

							common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
								params.Ravencoin_UserWalletPassword = pass;
								callback(null);
							}).catch((error)=>{
								params.Ravencoin_UserWalletPassword = "";
								callback(null);
							})
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in getRavenRVNBalance`);
					});
				},
				function function2 (callback) {
					try {
						ravencoin.getCurrentRVNBalance(params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword).then((balance) => {
							resolve(balance);
						}).catch((error) => {
							logger.error("getRavenRVNBalance - " + error.message)
							reject({ code: '0', message: 'ravencoin network connection error in getRavenRVNBalance' });
						});
					} catch (err) {
						reject({ code: '0', message: `${err.message}. Error occured in ravencoin getRavenRVNBalance` });
					}
				}
			])
		}));

    },

	getRavenResourceData: function(asset) {

		return new Promise(((resolve, reject) => {

			const params = {};
			async.waterfall ([
				function function1 (callback) {
					const stmt = "select * from params where param in ('Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password')";
					mysql.executeSQLStatement(stmt, []).then((result) => {
							result.forEach(obj=>{
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
							});

							callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in getRavenResourceData`);
					});
				},
				function function2 (callback) {
					try {
						ravencoin.getResourceInfomation(asset, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((data) => {
							resolve(data)
						}).catch(() => {
							reject({ code: '0', message: 'Ethereum network connection error in getRavenResourceData' });
						});
					} catch (err) {
						reject({ code: '0', message: `${err.message}. Error occured in ravencoin getRavenResourceData` });
					}

				}
			])
		}));

    },

	issueRavencoinMainAsset(companyAddress, mainAssetName, recordID, unitDecimals, ipfsDocumentHash) {
		
		return new Promise((resolve, reject) => {
			const params = {};

			async.waterfall ([
				function function1 (callback) {

					const stmt = "select * from params where param in ('web3Address', 'Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword')";
					mysql.executeSQLStatement(stmt, []).then((result) => {
							result.forEach(obj=>{
								if(obj.param == "web3Address")
									params.web3Address = obj.stringValue;
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
								if(obj.param == "Ravencoin_UserWalletPassword")
									params.Ravencoin_UserWalletPassword = obj.stringValue;
							});

							common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
								params.Ravencoin_UserWalletPassword = pass;
								callback(null);
							}).catch((error)=>{
								params.Ravencoin_UserWalletPassword = "";
								callback(null);
							})
					}).catch((error) => {
						reject(`${error.message} DB error occured in issueRavencoinMainAsset`);
					});
				},
				function function2 (callback) {

					logger.info("Sending Ravecoin main asset deployment transaction");
					ravencoin.issueMainAssetToken(companyAddress, mainAssetName, unitDecimals, ipfsDocumentHash, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword)
					.then((transactionID) => {
						logger.info("ravencoin asset in issueRavencoinMainAsset is deployed with transaction id " + transactionID);

						const sql = `update RavenAssetDeployment set isMainAssetTransactionDone = 1, mainAssetTransactionID = ?  where id = ?`;
						mysql.executeSQLStatement(sql, [transactionID, recordID]).then((result) => {
							logger.info("ravencoin issueQualifierAsset is deployed with transaction id " + transactionID);
							resolve("done")
						}).catch((error) => {
						  reject( `${error.message} Error occured in ravencoinstudio` );
						});
					}).catch((e) => {
						reject("error in issueRavencoinMainAsset " + e.toString())
					});

				}
			]);

			//resolve("done")
		});
	},

	issueQualifierAsset(companyAddress, qualifierName, ipfsDocumentHash, recordID) {

		return new Promise((resolve, reject) => {
			const params = {};

			async.waterfall ([
				function function1 (callback) {

					const stmt = "select * from params where param in ('Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword')";
					mysql.executeSQLStatement(stmt, []).then((result) => {
							result.forEach(obj=>{
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
								if(obj.param == "Ravencoin_UserWalletPassword")
									params.Ravencoin_UserWalletPassword = obj.stringValue;
							});

							common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
								params.Ravencoin_UserWalletPassword = pass;
								callback(null);
							}).catch((error)=>{
								params.Ravencoin_UserWalletPassword = "";
								callback(null);
							})
					}).catch((error) => {
						reject(`${error.message} DB error occured in issueQualifierAsset`);
					});
				},
				function function2 (callback) {

					logger.info("Sending Ravecoin issueQualifierAsset deployment transaction for record id " + recordID);
					ravencoin.issueQualifierAsset(companyAddress, qualifierName, ipfsDocumentHash, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword)
					.then((transactionID) => {

						const sql = `update RavenAssetDeployment set isQualifierNameTrnasactionDone = 1, qualifierNameTransactionID=?  where id = ?`;
						mysql.executeSQLStatement(sql, [transactionID, recordID]).then((result) => {
							logger.info("ravencoin issueQualifierAsset is deployed with transaction id " + transactionID + " for record id " + recordID);
							resolve("done");
						}).catch((error) => {
						  reject( `${error.message} Error occured in ravencoinstudio` );
						});

					}).catch((e) => {
						reject("error in issueQualifierAsset " + e.toString())
					});
				}
			]);

			//resolve("done");
		});
	},

	assignQualifierAsset(companyAddress, qualifierName, recordID) {
		return new Promise((resolve, reject) => {
			const params = {};

			async.waterfall ([
				function function1 (callback) {

					const stmt = "select * from params where param in ('Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword')";
					mysql.executeSQLStatement(stmt, []).then((result) => {
							result.forEach(obj=>{
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
								if(obj.param == "Ravencoin_UserWalletPassword")
									params.Ravencoin_UserWalletPassword = obj.stringValue;
							});

							common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
								params.Ravencoin_UserWalletPassword = pass;
								callback(null);
							}).catch((error)=>{
								params.Ravencoin_UserWalletPassword = "";
								callback(null);
							})
					}).catch((error) => {
						reject(`${error.message} DB error occured in assignQualifierAsset`);
					});
				},
				function function2 (callback) {

					logger.info("Sending Ravecoin assignQualifierAsset deployment transaction for record id " + recordID);
					ravencoin.whitelisAddress(companyAddress, "true", qualifierName, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword, params.Ravencoin_UserWalletPassword)
					.then((transactionID) => {

							const sql = `update RavenAssetDeployment set qualifierAssignTransactionIDDone = 1, qualifierAssignTransactionID=?  where id = ?`;
							mysql.executeSQLStatement(sql, [transactionID, recordID]).then((result) => {
								logger.info("ravencoin assignQualifierAsset is deployed with transaction id " + transactionID + " for record id " + recordID);
								resolve("done");
							}).catch((error) => {
								reject(`${error.message} Error occured in ravencoinstudio` );
							});

					}).catch((e) => {
						reject("error in assignQualifierAsset " + e.toString())
					});

				}
			]);

			//resolve("done");
		});
	},

	issueRestrictedAsset(companyAddress, qualifierName, assetname, amount, record, currencyID) {

		return new Promise((resolve, reject) => {
			const params = {};

			async.waterfall ([
				function function1 (callback) {

					const stmt = "select * from params where param in ('Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword')";
					mysql.executeSQLStatement(stmt, []).then((result) => {
							result.forEach(obj=>{
								if(obj.param == "Ravencoin_ServerURL")
									params.Ravencoin_ServerURL = obj.stringValue;
								if(obj.param == "Ravencoin_Username")
									params.Ravencoin_Username = obj.stringValue;
								if(obj.param == "Ravencoin_Password")
									params.Ravencoin_Password = obj.stringValue;
								if(obj.param == "Ravencoin_UserWalletPassword")
									params.Ravencoin_UserWalletPassword = obj.stringValue;
							});

							common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
								params.Ravencoin_UserWalletPassword = pass;
								callback(null);
							}).catch((error)=>{
								params.Ravencoin_UserWalletPassword = "";
								callback(null);
							})
					}).catch((error) => {
						reject(`${error.message} DB error occured in issueRestrictedAsset`);
					});
				},
				function function2 (callback) {
					try {
						logger.info("Sending Ravecoin issueRestrictedAsset deployment transaction for record id ...  " + record.ID + " decimals-" + record.unitDecimals + " ipfs-"+ record.ipfsDocumentHash );
						ravencoin.issueRestrictedAsset(assetname, companyAddress, qualifierName, amount, record.unitDecimals, record.ipfsDocumentHash, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword)
						.then((transactionID) => {
							logger.info("ravencoin issueRestrictedAsset for record id " + record.ID + " is deployed with transaction id " + transactionID);
							logger.info("setting up the platform with this new token information");

							const sql = `insert into sharetypes (title, minimumSharesToBuyByInvestor, stoid, totalShares, companyShares, 
								nominalValue, premimum, isVotingRightsApplicable, isblockchain, currencyid, needauthorization, 
								reduceSharesForPurchase, investorCanPurchaseDirectly, blockchainProtocol, ethereumContractAddress, 
								ethereumWhitelistAddress, ethereumBlockchainPublicAddress, walletCustodayType, tanganyWalletID, 
								AssetName, AssetTag, votingPower, isMeetingRightsApplicable, isInvestorTradable, blockchainDecimals, ipfsDocumentHash) 
								values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
								;\
								update RavenAssetDeployment set isAssetDeployed = 1, createRestrictedAssetTransactionID=?  where id = ?`;


							const data = [
								record.title,
								0,
								record.stoid,
								parseInt(amount, 10),  //total shares
								parseInt(amount, 10),  //company shares
								record.nominal,
								record.premimum,
								1,  //votingRIghts,
								1,  //req.body.shareType,
								currencyID,  //req.body.currencyid,
								0,  //needapproval,
								0,  //req.body.reduceSharesForPurchase,
								1,   //investorCanPurchaseDirectly,
								3,  //req.body.blockchainprotocoltype,
								"",  //req.body.tokenaddress,
								"",  //req.body.whitelistaddress,
								record.PublicKey,  //req.body.ethereumPublicKey,
								0,  //req.body.walletCustodayType,
								"",  //req.body.tanganyWalletID,
								record.mainAsset,  //req.body.AssetName,
								record.qualifierName,  //req.body.AssetTag,
								1,  //votingPower
								0,  //meetingRights
								0,   //isInvestorTradable
								record.unitDecimals,	//Divisible
								record.ipfsDocumentHash,
								transactionID,
								record.ID
							];

							mysql.executeSQLStatement(sql, data).then((res) => {
								logger.info("----------------------------------------------------");
								logger.info(`Ravencoin token deployment success for sto ${record.stoid} record ${record.ID} main asset ${record.mainAsset} qualifier ${record.qualifierName}`);
								logger.info("----------------------------------------------------");
								resolve("done");
							}).catch((error) => {
								reject(`Error occured in ravencoin deployment restricted asset setting DB - ${error.toString()}`);
							});


						}).catch((e) => {
							logger.info("Error occured in ravencoin deployment restricted asset setting DB " + e.toString())
						});
					} catch (error) {
						logger.info("Error occured in ravencoin deployment restricted asset setting DB " + error)
					}

				}
			]);

		});
	},

	ravencoinDeployment(record) {

		return new Promise((resolve, reject) => {
			const params = {qualifierName: "Q" + record.mainAsset.toUpperCase()};

			try {
				async.waterfall ([
					function start (callback) {

						const stmt = "select * from params where param in ('web3Address', 'Ravencoin_ServerURL', 'Ravencoin_Username', 'Ravencoin_Password', 'Ravencoin_UserWalletPassword')";
						mysql.executeSQLStatement(stmt, []).then((result) => {
								result.forEach(obj=>{
									if(obj.param == "web3Address")
										params.web3Address = obj.stringValue;
									if(obj.param == "Ravencoin_ServerURL")
										params.Ravencoin_ServerURL = obj.stringValue;
									if(obj.param == "Ravencoin_Username")
										params.Ravencoin_Username = obj.stringValue;
									if(obj.param == "Ravencoin_Password")
										params.Ravencoin_Password = obj.stringValue;
									if(obj.param == "Ravencoin_UserWalletPassword")
										params.Ravencoin_UserWalletPassword = obj.stringValue;
								});

								common.decryptAsync( params.Ravencoin_UserWalletPassword ).then((pass) => {
									params.Ravencoin_UserWalletPassword = pass;
									callback(null);
								}).catch((error)=>{
									params.Ravencoin_UserWalletPassword = "";
									callback(null);
								})
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in ravencoinDeployment`);
						});
					},
					function mainasset1 (callback) {
						if(record.isMainAssetTransactionSend != 1) {
							logger.info("Sending Ravecoin main asset deployment transaction");
							ravencoin.issueMainAssetToken(record.PublicKey, record.mainAsset, record.unitDecimals, record.ipfsDocumentHash, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword)
							.then((transactionID) => {
								logger.info("ravencoin asset in issueRavencoinMainAsset is deployed with transaction id " + transactionID);

								const sql = `update RavenAssetDeployment set isMainAssetTransactionSend = 1, mainAssetTransactionID = ?  where id = ?`;
								mysql.executeSQLStatement(sql, [transactionID, record.ID]).then((result) => {
									params.mainAssetTransactionID = transactionID;
									callback(null);
								}).catch((error) => {
									logger.error( `${error.message} Error occured in ravencoinstudio` );
								});

							}).catch((e) => {
								logger.error("error in issueRavencoinMainAsset " + e.toString())
							});
						} else {
							params.mainAssetTransactionID = record.mainAssetTransactionID;
							
							callback(null);
						}
					},
					function mainasset2(callback) {
						if(record.isMainAssetTransactionDone != 1) {
							ravencoin.waitForTransaction(params.mainAssetTransactionID, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((result) => {
								callback(null);
							}).catch((error) => {
								logger.error( `${error.message} Error occured in ravencoinstudio` );
							});
						} else {
							
							callback(null);
						}
					},
					function mainasset3(callback) {

						const sql = `update RavenAssetDeployment set isMainAssetTransactionDone = 1  where id = ?`;
						mysql.executeSQLStatement(sql, [record.ID]).then((result) => {
							logger.info("ravencoin issueMainAssetToken is deployed");
							callback(null);
						}).catch((error) => {
							logger.error( `${error.message} Error occured in ravencoinstudio` );
						});
					},
					function qualifier1 (callback) {
						if(record.isQualifierNameTrnasactionSend != 1) {
							logger.info("Sending Ravecoin issueQualifierAsset deployment transaction for record id " + record.ID);
							ravencoin.issueQualifierAsset(record.PublicKey, params.qualifierName, record.ipfsDocumentHash, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword)
							.then((transactionID) => {

								const sql = `update RavenAssetDeployment set isQualifierNameTrnasactionSend  = 1, qualifierName=?, qualifierNameTransactionID=?  where id = ?`;
								mysql.executeSQLStatement(sql, [params.qualifierName, transactionID, record.ID]).then((result) => {
									logger.info("ravencoin issueQualifierAsset is deployed with transaction id " + transactionID + " for record id " + record.ID);
									params.qualifierTransactonID = transactionID;
									callback(null);
								}).catch((error) => {
									logger.error( `${error.message} Error occured in ravencoinstudio` );
								});

							}).catch((e) => {
								logger.error("error in issueQualifierAsset " + e.toString())
							});
						} else {
							params.qualifierTransactonID = record.qualifierNameTransactionID;
							
							callback(null);
						}
					},
					function qualifier2(callback) {
						if(record.isQualifierNameTrnasactionDone != 1) {
							ravencoin.waitForTransaction(params.qualifierTransactonID, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((result) => {
								callback(null);
							}).catch((error) => {
								logger.error( `${error.message} Error occured in ravencoinstudio` );
							});
						} else {
							
							callback(null);
						}
					},
					function qualifier3(callback) {
						const sql = `update RavenAssetDeployment set isQualifierNameTrnasactionDone = 1 where id = ?`;
						mysql.executeSQLStatement(sql, [record.ID]).then((result) => {
							callback(null);
						}).catch((error) => {
							logger.error(`${error.message} Error occured in ravencoinstudio post 2 for record id ${record.ID}` );
						});
					},
					function assignQualifier (callback) {
						async.waterfall ( [
							function func0 (callback2) {
								module.exports.isInvestorWhiteListedRavencoinDirect(record.PublicKey, params.qualifierName).then((status) => {
									params.status = status;
									callback2(null);
								}).catch((error) => {
									logger.error(`${error.message} Error occured in ravencoinstudio post 3 for record id ${record.ID}` );
								});
							},
							function func1 (callback2) {
								if(params.status == false) {

									logger.info("Sending Ravecoin assignQualifierAsset deployment transaction for record id " + record.ID);
									ravencoin.whitelisAddress(record.PublicKey, "true", params.qualifierName, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword, params.Ravencoin_UserWalletPassword)
									.then((transactionID) => {

											const sql = `update RavenAssetDeployment set qualifierAssignTransactionIDSend = 1, qualifierAssignTransactionID=?  where id = ?`;
											mysql.executeSQLStatement(sql, [transactionID, record.ID]).then((result) => {
												logger.info("ravencoin assignQualifierAsset is deployed with transaction id " + transactionID + " for record id " + record.ID);
												params.qualifierAssignTransactionID = transactionID;
												callback2(null);
											}).catch((error) => {
												logger.error(`${error.message} Error occured in ravencoinstudio` );
											});

									}).catch((e) => {
										logger.error("error in assignQualifierAsset " + e.toString())
									});

								} else
									callback2(null);
							},
							function func2 (callback2) {
								if(params.status == false) {
									ravencoin.waitForTransaction(params.qualifierAssignTransactionID, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((result) => {
										callback2(null);
									}).catch((error) => {
										logger.error( `${error.message} Error occured in ravencoinstudio` );
									});
								} else
									callback2(null);
							},
							function func3 (callback2) {
								if(params.status == false) {
									const sql = `update RavenAssetDeployment set qualifierAssignTransactionIDDone = 1 where id = ?`;
									mysql.executeSQLStatement(sql, [record.ID]).then((result) => {
										callback(null);
									}).catch((error) => {
										logger.error( `${error.message} Error occured in ravencoinstudio post 3 for record id ${record.ID}` );
									});
								} else {
									const sql = `update RavenAssetDeployment set qualifierAssignTransactionIDSend = 1, qualifierAssignTransactionIDDone = 1 where id = ?`;
									mysql.executeSQLStatement(sql, [record.ID]).then((result) => {
										callback(null);
									}).catch((error) => {
										logger.error(`${error.message} Error occured in ravencoinstudio post 3 for record id ${record.ID}` );
									});
								}
							}
						])
					},
					function deplpyassetblockchain (callback) {

						async.waterfall ( [
							function func2 (callback2) {
								const sql = "select settings from stos where id = ?";
								mysql.executeSQLStatement(sql, [record.stoid, record.ID]).then((result) => {
									const settings = JSON.parse(result[0].settings);
									params.DefaultSTOCurreny = settings.DefaultSTOCurreny;
									callback2(null);
								}).catch((error) => {
									logger.error(`${error.message} Error occured in ravencoinstudio post 4 with record id ` + record.ID );
								});
							},
							function func3 (callback2) {

								if(record.createRestrictedAssetTransactionIDSend != 1) {
									logger.info("Sending Ravecoin issueRestrictedAsset deployment transaction for record id ...  " + record.ID + " decimals-" + record.unitDecimals + " ipfs-"+ record.ipfsDocumentHash );
									ravencoin.issueRestrictedAsset(record.mainAsset, record.PublicKey, params.qualifierName, record.amount, record.unitDecimals, record.ipfsDocumentHash, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL, params.Ravencoin_UserWalletPassword)
									.then((transactionID) => {
										logger.info("ravencoin issueRestrictedAsset for record id " + record.ID + " is deployed with transaction id " + transactionID);

										const sql = `update RavenAssetDeployment set createRestrictedAssetTransactionIDSend = 1, createRestrictedAssetTransactionID =?, isAssetDeployed = 0  where id = ?`;
										mysql.executeSQLStatement(sql, [transactionID, record.ID]).then((result) => {
											logger.info("Ravencoin restricted asset is being deployed. The ravencoin deployment record ID is " + record.ID);
											params.createRestrictedAssetTransactionID = transactionID;
											callback2(null);
										}).catch((error) => {
											logger.error(`${error.message} Error occured in ravencoinstudio post 4 for record id ${record.ID}` );
										});

									}).catch((e) => {
										logger.info("Error occured in ravencoin deployment restricted asset setting DB " + e.toString())
									});
								}
								else {
									params.createRestrictedAssetTransactionID = record.createRestrictedAssetTransactionID
									callback2(null);
								}
								/*module.exports.issueRestrictedAsset(record.PublicKey, params.qualifierName, record.mainAsset.toUpperCase(), tokenAmount, params.record, params.DefaultSTOCurreny).then((data) => {
									logger.info("Ravewncoin transaction executing waiting for completion for record id " + record.ID);

									const sql = `update RavenAssetDeployment set createRestrictedAssetTransactionIDSend = 1, isAssetDeployed = 0  where id = ?`;
									mysql.executeSQLStatement(sql, [record.ID]).then((result) => {
										logger.info("Ravencoin has been deployed. The ID is " + record.ID);
									}).catch((error) => {
										logger.error(`${error.message} Error occured in ravencoinstudio post 4 for record id ${record.ID}` );
									});

								}).catch((error) => {
									logger.error(`${error.message} Error occured in ravencoinstudio post 4 with record id ` + record.ID );
								});*/
							},
							function fun4 (callback2) {
								
								ravencoin.waitForTransaction(params.createRestrictedAssetTransactionID, params.Ravencoin_Username, params.Ravencoin_Password, params.Ravencoin_ServerURL).then((result) => {
									callback2(null);
								}).catch((error) => {
									reject( `${error.message} Error occured in ravencoinstudio` );
								});
							},
							function fun5 (callback2) {
								logger.info("setting up the platform with this new Ravencoin token information");

								const sql = `insert into sharetypes (title, minimumSharesToBuyByInvestor, stoid, totalShares, companyShares, 
									nominalValue, premimum, isVotingRightsApplicable, isblockchain, currencyid, needauthorization, 
									reduceSharesForPurchase, investorCanPurchaseDirectly, blockchainProtocol, ethereumContractAddress, 
									ethereumWhitelistAddress, ethereumBlockchainPublicAddress, walletCustodayType, tanganyWalletID, 
									AssetName, AssetTag, votingPower, isMeetingRightsApplicable, isInvestorTradable, blockchainDecimals, ipfsDocumentHash) 
									values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
									;\
									update RavenAssetDeployment set isAssetDeployed = 1 where id = ?`;


								const data = [
									record.title,
									0,
									record.stoid,
									parseInt(record.amount, 10),  //total shares
									parseInt(record.amount, 10),  //company shares
									record.nominal,
									record.premimum,
									1,  //votingRIghts,
									1,  //req.body.shareType,
									params.DefaultSTOCurreny,  //req.body.currencyid,
									0,  //needapproval,
									0,  //req.body.reduceSharesForPurchase,
									1,   //investorCanPurchaseDirectly,
									3,  //req.body.blockchainprotocoltype,
									"",  //req.body.tokenaddress,
									"",  //req.body.whitelistaddress,
									record.PublicKey,  //req.body.ethereumPublicKey,
									0,  //req.body.walletCustodayType,
									"",  //req.body.tanganyWalletID,
									record.mainAsset,  //req.body.AssetName,
									params.qualifierName,  //req.body.AssetTag,
									1,  //votingPower
									0,  //meetingRights
									0,   //isInvestorTradable
									record.unitDecimals,	//Divisible
									record.ipfsDocumentHash,
									record.ID
								];

								mysql.executeSQLStatement(sql, data).then((res) => {
									logger.info("----------------------------------------------------");
									logger.info(`Ravencoin token deployment done for sto ${record.stoid} record ${record.ID} main asset ${record.mainAsset} qualifier ${record.qualifierName}`);
									logger.info("----------------------------------------------------");
									resolve("done");
								}).catch((error) => {
									reject(`Error occured in ravencoin deployment restricted asset setting DB - ${error.toString()}`);
								});
							}
						]);

					}
				]);
			} catch (error) {
				logger.error (error.toString())
			}

			resolve("done")
		});
	},

	deployPolymeshToken(tickerName, amount, title, stoid, nominal, premimum, unitDecimals, mnemonic, polymeshAccountsID, assetTypeSelect) {
		const params = {};

		return new Promise((resolve, reject) => {
			async.waterfall ([
				function getSTOData(callback) {

					const stmt = "select * from stos where id = ?";
					mysql.executeSQLStatement(stmt, [stoid]).then((result) => {
						const settings = JSON.parse(result[0].settings);
						params.DefaultSTOCurreny = settings.DefaultSTOCurreny;

						callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in deployPolymeshToken`);
					});
				},
				function deployToken(callback) {
					registerTicker(tickerName, amount, unitDecimals, assetTypeSelect, mnemonic).then((data)=>{
						params.publicDiDAddress = data.did;
						params.venueID = data.venueID;
						callback(null);
					})
				},
				function setupDB (callback) {
					logger.info("setting up the platform with this new Ravencoin token information");

					const sql = `insert into sharetypes (title, minimumSharesToBuyByInvestor, stoid, totalShares, companyShares, 
						nominalValue, premimum, isVotingRightsApplicable, isblockchain, currencyid, needauthorization, 
						reduceSharesForPurchase, investorCanPurchaseDirectly, blockchainProtocol, ethereumContractAddress, 
						ethereumWhitelistAddress, ethereumBlockchainPublicAddress, walletCustodayType, tanganyWalletID, 
						AssetName, AssetTag, votingPower, isMeetingRightsApplicable, isInvestorTradable, blockchainDecimals, ipfsDocumentHash, polyMeshDistributionVenueID, polymeshAccountID) 
						values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

					const data = [
						title,
						0,
						stoid,
						parseInt(amount, 10),  //total shares
						parseInt(amount, 10),  //company shares
						nominal,
						premimum,
						1,  //votingRIghts,
						1,  //req.body.shareType,
						params.DefaultSTOCurreny,  //req.body.currencyid,
						0,  //needapproval,
						0,  //req.body.reduceSharesForPurchase,
						1,   //investorCanPurchaseDirectly,
						7,  //req.body.blockchainprotocoltype,
						"",  //req.body.tokenaddress,
						"",  //req.body.whitelistaddress,
						params.publicDiDAddress,  //req.body.ethereumBlockchainPublicAddress,
						0,  //req.body.walletCustodayType,
						"",  //req.body.tanganyWalletID,
						"",  //req.body.AssetName,
						tickerName,  //req.body.AssetTag,
						1,  	//votingPower
						0,  	//meetingRights
						0,   	//isInvestorTradable
						unitDecimals,	//Divisible
						"",    	//ipfsDocumentHahs
						params.venueID,
						polymeshAccountsID   //polymeshAccountID
					];

					
					mysql.executeSQLStatement(sql, data).then((res) => {
						logger.info("----------------------------------------------------");
						logger.info(`Polymeth token deployment done for sto ${stoid}  ticker ${tickerName}`);
						logger.info("----------------------------------------------------");
						resolve("done");
					}).catch((error) => {
						reject(`Error occured in polymesh deployment restricted asset setting DB - ${error.toString()}`);
					});
				}
			]);

			resolve("done")
		});
	},
	
	setupPolymeshTokenRestrictions(newSettings) {

		const params = {};

		return new Promise((resolve, reject) => {

				var Accredited = 0;
				if(newSettings.Accredited != null) {
					Accredited = 1;
					params.Accredited = 1;
				} else
					params.Accredited = 0;

				var Affiliate = 0;
				if(newSettings.Affiliate != null) {
					Affiliate = 1;
					params.Affiliate = 1;
				} else
					params.Affiliate = 0;

				var BuyLockup = 0;
				if(newSettings.BuyLockup != null) {
					BuyLockup = 1;
					params.BuyLockup = 1;
				} else
					params.BuyLockup = 0;

				var SellLockup = 0;
				if(newSettings.SellLockup != null) {
					SellLockup = 1;
					params.SellLockup = 1;
				} else
					params.SellLockup = 0;

				var KnowYourCustomer = 0;
				if(newSettings.KnowYourCustomer != null){
					KnowYourCustomer = 1;
					params.KnowYourCustomer = 1;
				} else
					params.KnowYourCustomer = 0;

				var Jurisdiction = 0;
				if(newSettings.Jurisdiction != null) {
					Jurisdiction = 1;
					params.Jurisdiction = 1;
					params.JurisdictionPlace = newSettings.JurisdictionPlace;
				} else
					params.Jurisdiction = 0;

				var Exempted = 0;
				if(newSettings.Exempted != null) {
					Exempted = 1;
					params.Exempted = 1;
				} else
					params.Exempted = 0;

				var Blocked = 0;
				if(newSettings.Blocked != null) {
					Blocked = 1;
					params.Blocked = 1;
				} else
					params.Blocked = 0;


				async.waterfall([
					function fun0(callback){
						const stmt = "select AssetTag, polymeshAccountID from sharetypes where id = ?";
						mysql.executeSQLStatement(stmt, [newSettings.id]).then((result) => {
							params.AssetTag = result[0].AssetTag;
							params.polymeshAccountID = result[0].polymeshAccountID;
							callback(null); 
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in setupPolymeshTokenRestrictions`);
						});
					},
					function fun1(callback) {
						const stmt = "select mnemonic from polymeshAccounts where id = ?";
						mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
							common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {
								setTokenRestrictions(params, mnemonic).then(()=> {
									callback(null);
								})
							})
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in setupPolymeshTokenRestrictions`);
						});
					},
					function fun2(callback) {
						const sql = `delete from polymeshTokenRestrictionsSettings where sharetypeid = ?`;
						mysql.executeSQLStatement(sql, [newSettings.id])
						.then((result) => {
							callback(null);
						}).catch((error) => {
							common.handleError(req, res, `${error.message} Error occured in polymeshConfigurations` );
						});
					},
					function fun3(callback) {
						const sql = `insert into polymeshTokenRestrictionsSettings
							(sharetypeid, title, Accredited, Affiliate, BuyLockup, SellLockup, KnowYourCustomer, Jurisdiction, Exempted, Blocked, JurisdictionPlace) 
							values(?,?,?,?,?,?,?,?,?,?,?)`;
						mysql.executeSQLStatement(sql, [newSettings.id, "", Accredited, Affiliate, BuyLockup, SellLockup, KnowYourCustomer, Jurisdiction, Exempted, Blocked, newSettings.JurisdictionPlace])
						.then((result) => {
							callback(null);
						}).catch((error) => {
							common.handleError(req, res, `${error.message} Error occured in polymeshConfigurations` );
						});
					},
					function fun4(callback) {
						console.log("Restrictions are set for token " + params.AssetTag)
					}
				]);

			resolve("done");
		})

	},

	setupPolymeshAtestationProvider(newSettings) {

		const params = {};

		return new Promise((resolve, reject) => {

			var Accredited = 0;
			if(newSettings.Accredited != null) {
				Accredited = 1;
				params.Accredited = 1;
			} else
				params.Accredited = 0;

			var Affiliate = 0;
			if(newSettings.Affiliate != null) {
				Affiliate = 1;
				params.Affiliate = 1;
			} else
				params.Affiliate = 0;

			var BuyLockup = 0;
			if(newSettings.BuyLockup != null) {
				BuyLockup = 1;
				params.BuyLockup = 1;
			} else
				params.BuyLockup = 0;

			var SellLockup = 0;
			if(newSettings.SellLockup != null) {
				SellLockup = 1;
				params.SellLockup = 1;
			} else
				params.SellLockup = 0;

			var KnowYourCustomer = 0;
			if(newSettings.KnowYourCustomer != null){
				KnowYourCustomer = 1;
				params.KnowYourCustomer = 1;
			} else
				params.KnowYourCustomer = 0;

			var Jurisdiction = 0;
			if(newSettings.Jurisdiction != null) {
				Jurisdiction = 1;
				params.Jurisdiction = 1;
			} else
				params.Jurisdiction = 0;

			var Exempted = 0;
			if(newSettings.Exempted != null) {
				Exempted = 1;
				params.Exempted = 1;
			} else
				params.Exempted = 0;

			var Blocked = 0;
			if(newSettings.Blocked != null) {
				Blocked = 1;
				params.Blocked = 1;
			} else
				params.Blocked = 0;


			async.waterfall([
				function fun0(callback){
					const stmt = "select AssetTag, polymeshAccountID from sharetypes where id = ?";
					mysql.executeSQLStatement(stmt, [newSettings.id]).then((result) => {
						params.AssetTag = result[0].AssetTag;
						params.polymeshAccountID = result[0].polymeshAccountID;						
						params.did = newSettings.did;
						callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in setupPolymeshAtestationProvider`);
					});
				},
				function fun1(callback) {
					const stmt = "select mnemonic from polymeshAccounts where id = ?";
					mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
						common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {
							setAtestationProvider(params, mnemonic).then(()=> {
								callback(null);
							})
						})
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in setupPolymeshAtestationProvider`);
					});
				},
				function fun2(callback) {
					const sql = `insert into polymeshAttestationProviders
						(sharetypeid, title, did, details, Accredited, Affiliate, BuyLockup, SellLockup, KnowYourCustomer, Jurisdiction, Exempted, Blocked) 
						values(?,?,?,?,?,?,?,?,?,?,?,?)`;
					mysql.executeSQLStatement(sql, [newSettings.id, newSettings.title, newSettings.did, newSettings.details,  Accredited, Affiliate, BuyLockup, SellLockup, KnowYourCustomer, Jurisdiction, Exempted, Blocked])
					.then((result) => {
						callback(null);
					})
					.catch((error) => {
						common.handleError(req, res, `${error.message} Error occured in polymeshConfigurations` );
					});
				},
				function fun3(callback) {
					console.log("Atestation provider is set");
				}
			]);


			resolve("done");
		});

	},

	deleteAtestationProvider(recordid) {
		const params = {};

		return new Promise((resolve, reject) => {

			async.waterfall([
				function fun00(callback){
					const stmt = "select did, sharetypeid from polymeshAttestationProviders where id = ?";
					mysql.executeSQLStatement(stmt, [recordid]).then((result) => {
						params.did = result[0].did;
						params.sharetypeid = result[0].sharetypeid;
						callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in deleteAtestationProvider`);
					});
				},
				function fun00(callback){
					const stmt = "select polymeshAccountID from sharetypes where id = ?";
					mysql.executeSQLStatement(stmt, [params.sharetypeid]).then((result) => {
						params.polymeshAccountID = result[0].polymeshAccountID;
						callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in deleteAtestationProvider`);
					});
				},
				function fun1(callback){
					const stmt = "select mnemonic from polymeshAccounts where id = ?";
					mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
						common.decryptAsync(result[0].mnemonic).then((data)=> {
							params.mnemonic = data;
							callback(null);
						})
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in deleteAtestationProvider`);
					});
				},
				function fun2(callback){
					const stmt = "select AssetTag from sharetypes where id = ?";
					mysql.executeSQLStatement(stmt, [params.sharetypeid]).then((result) => {
						params.AssetTag = result[0].AssetTag;
						callback(null);
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in deleteAtestationProvider`);
					});
				},
				function fun3(callback) {
					deleteAtestationProvider(params.did, params.AssetTag, params.mnemonic).then(()=> {
						callback(null);
					})
				},
				function fun4(callback) {
					const sql = `delete from polymeshAttestationProviders where id = ?`;
					mysql.executeSQLStatement(sql, [recordid])
					.then((result) => {
						console.log("Atestation provider is deleted");
					})
					.catch((error) => {
						reject("Error occurred removing atestation provider")
					});
				}
			])

			resolve("done");
		});
	},

	setupPolymeshPortfoliosInformation(recordid) {
		const params = {};
		
		return new Promise((resolve, reject) => {

			async.waterfall([
				function fun1(callback){
					const stmt = "select AssetTag, polymeshAccountID from sharetypes where id = ?";
					mysql.executeSQLStatement(stmt, [recordid]).then((result) => {
						params.AssetTag = result[0].AssetTag;
						params.polymeshAccountID = result[0].polymeshAccountID;
						callback(null);
					}).catch((error) => {
						reject(`${error.message} DB error occured in setupPolymeshPortfoliosInformation`);
					});
				},
				function decodeCode(callback) {
					const stmt = "select mnemonic from polymeshAccounts where id = ?";
					mysql.executeSQLStatement(stmt, [params.polymeshAccountID]).then((result) => {
						common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {
							params.mnemonic = mnemonic;
							callback(null);
						})
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in setupPolymeshPortfoliosInformation`);
					});
				},
				function fun2(callback) {
					const stmt = `select * from polymeshPortfolios where polymeshAccoundID = ? and polymeshBlockchainID != 0; 
						select id from polymeshPortfolios where polymeshAccoundID = ? and polymeshBlockchainID = 0`;
					mysql.executeSQLStatement(stmt, [params.polymeshAccountID, params.polymeshAccountID]).then((result) => {
						params.portfolios = result[0];
						params.defaultPortfolioID = result[1][0].id;
						callback(null);
					}).catch((error) => {
						reject(`${error.message} DB error occured in setupPolymeshPortfoliosInformation`);
					});
				},
				function fun4(callback) {

					var count = 0;
					async.whilst(
						function() {
							return count < params.portfolios.length;
						},
						function (callbackInner) {
							getPolymeshPortfolioBalances(params.portfolios[count].polymeshBlockchainID ,params.mnemonic, params.AssetTag).then((balances)=> {


								const stmt = `delete from polymeshPortfoliosBalances where polymeshPortfoliosID = ?; 
											  delete from polymeshPortfoliosBalances where polymeshPortfoliosID = ? and ticker = ?`;
								mysql.executeSQLStatement(stmt, [params.portfolios[count].ID, params.defaultPortfolioID, params.AssetTag]).then(() => {

											var countInternalDB = 0;
											async.whilst(
												function() {
													return countInternalDB < balances.portfolioBalances.length
												},
												function (callInternalDB) {
														
														const stmt = `insert into polymeshPortfoliosBalances(polymeshPortfoliosID, ticker, balance) values(?,?,?)
														`;
														mysql.executeSQLStatement(stmt, [params.portfolios[count].ID, balances.portfolioBalances[countInternalDB].ticker, balances.portfolioBalances[countInternalDB].balance ]).then(() => {
															countInternalDB++;
															callInternalDB(null, countInternalDB);
														}).catch((error) => {
															reject(`${error.message} DB error occured in setupPolymeshPortfoliosInformation`);
														});

												},
												function(err, n) {
													if (!err) {

														const stmt = `insert into polymeshPortfoliosBalances(polymeshPortfoliosID, ticker, balance) values(?,?,?)`;
														mysql.executeSQLStatement(stmt, [params.defaultPortfolioID, params.AssetTag, balances.defaultBalance]).then(() => {
															count++;
															callbackInner(null, count);
														}).catch((error) => {
															reject(`${error.message} DB error occured in setupPolymeshPortfoliosInformation`);
														});														

													} else {
														logger.info(`${err}`);
													}
												}
											)



								}).catch((error) => {
									reject(`${error.message} DB error occured in setupPolymeshPortfoliosInformation`);
								});


							})
						},
						function(err, n) {
							if (!err) {
								callback(null);
							} else {
								logger.info(`${err}`);
							}
						}
					)

				},
				function fun4(callback) {
					resolve("done")
				}
			]);

		})
		   
	},

	createPolymeshPortfolioAPI(polymeshAccountID, portfolioName) {
		
		return new Promise((resolve, reject) => {

			async.waterfall([
				function fun2(callback) {

					const stmt = "select mnemonic from polymeshAccounts where id = ?";
					mysql.executeSQLStatement(stmt, [polymeshAccountID]).then((result) => {
						common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {

							createPolymeshPortfolio(portfolioName, mnemonic).then((newid)=> {
								const stmt = "insert into polymeshPortfolios(polymeshAccoundID, polymeshBlockchainID, title) value (?, ?, ?)";
								mysql.executeSQLStatement(stmt, [polymeshAccountID, newid, portfolioName]).then((result) => {
									logger.debug("New portfolio is created");
								}).catch((error) => {
									reject(`${error.message} DB error occured in createPolymeshPortfolioAPI`);
								});
							})

						})
					}).catch((error) => {
						logger.error(`${error.message} DB error occured in createPolymeshPortfolioAPI`);
					});

				}
			]);

			resolve("done");			
		})

	},

	transferTokenToPolymeshPortfolioAPI(toPortfolioID, assetTag, amountString, polymeshAccountID) {
		
		return new Promise((resolve, reject) => {

			async.waterfall([
				function fun1(callback){

						const stmt = "select mnemonic from polymeshAccounts where id = ?";
						mysql.executeSQLStatement(stmt, [polymeshAccountID]).then((result) => {
							common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {
								transferTokenToPolymeshPortfolio(toPortfolioID, mnemonic, assetTag, amountString).then(()=>{
									logger.debug("Tokens are transferred");
								})

							})
						}).catch((error) => {
							logger.error(`${error.message} DB error occured in transferTokenToPolymeshPortfolioAPI`);
						});

				}
			]);

			resolve("done");
		})
	}	


	
}


