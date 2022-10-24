'use strict';

const async = require('async');
const common = require('./common');
const logger = require('../logger');
const axios = require('axios');

const transactionRetries = 1000;
const transactonSeconds = 30000;


module.exports = {

	getTotalSupplyOfTokens: function(assetname, assetTag, userName, password, serverLink) {

		return new Promise(((resolve, reject) => {
			module.exports.rpc("getassetdata", ["$" + assetname], userName, password, serverLink)
            .then(function (data) {
                resolve(data.amount);
          	}).catch(function (e) {
				logger.info("....................Raven.............................")
				logger.info("Ravencoin error - getTotalSupplyOfTokens")
				logger.info(e.toString());	
                reject(e);
          	});

		}));
		
		/*
		{
		name: '$SHACOIN',
		amount: 100000,
		units: 0,
		reissuable: 1,
		has_ipfs: 0,
		verifier_string: 'SHATAG'
		}
		*/
    },

	getAccountBalance: function(address, assetname, assetTag, userName, password, serverLink) {
		return new Promise(((resolve, reject) => {
			module.exports.rpc("listassetbalancesbyaddress", [address], userName, password, serverLink ).then(function (data) {
				if(typeof data["$" + assetname] == "undefined")
					resolve(0);
				else
					resolve(data["$" + assetname]);
			})
			.catch(function (e) {
				logger.info("....................Raven.............................")
				logger.info("Ravencoin error - getAccountBalance")
				logger.info(e.toString());				
				reject(e);
			});
		}));
        
    },    

	whitelisAddress: function(address, authorize, assetTag, userName, password, serverLink, walletPassword) {

		return new Promise(((resolve, reject) => {		

			module.exports.rpc("walletpassphrase", [walletPassword, 60], userName, password, serverLink)			
			.then(function () {

				if(authorize === 'true') {

					module.exports.rpc("addtagtoaddress", ["#" + assetTag, address], userName, password, serverLink )
						.then(function (data) {

							logger.info(`Ravencoin whitelisAddress ${address} - Transaction return Data`);
							logger.info(data);

							async.retry(
								{ times: transactionRetries, interval: transactonSeconds },
								(callbackRetry) => {
									module.exports.rpc("gettransaction", [data[0]], userName, password, serverLink)			
									.then(function (statusData) {
										if (statusData.confirmations == 0) {
											callbackRetry('error', 0);
										} else {
											callbackRetry(null, 1);     //passing null as first parameter indicates success
										}
									});
	
								}, (err2, result) => {
									if (err2 != null) {
										logger.info(`${err2} - ${result} - sendTokens - Some error occured and execution cannot be confirmed`);
										reject(  `${err2} - ${result} - sendTokens - Some error occured and execution cannot be confirmed`  )
									} else {
										resolve(data[0]);
									}
								},
							);

					})
					.catch(function (e) {
						reject(e);
					});

				} else {

					module.exports.rpc("removetagfromaddress",  ["#" + assetTag, address], userName, password, serverLink)
					.then(function (data) {

						async.retry(
							{ times: transactionRetries, interval: transactonSeconds },
							(callbackRetry) => {
								module.exports.rpc("gettransaction", [data[0]], userName, password, serverLink)			
								.then(function (statusData) {

									if (statusData.confirmations == 0) {
										callbackRetry('error', 0);
									} else {
										callbackRetry(null, 1);     //passing null as first parameter indicates success
									}
								});

							}, (err2, result) => {
								if (err2 != null) {
									logger.info(`${err2} - ${result} - sendTokens - Some error occured and execution cannot be confirmed`);
									reject(  `${err2} - ${result} - sendTokens - Some error occured and execution cannot be confirmed`  )
								} else {
									resolve(data[0]);
								}
							},
						);
						
					})
					.catch(function (e) {
						logger.info("....................Raven.............................")
						logger.info("Ravencoin error - whitelisAddress")
						logger.info(e.toString());						
							reject(e);
					});
				}

			}).catch(function (e) {
				logger.info("....................Raven.............................")
				logger.info("Ravencoin error - whitelisAddress")
				logger.info(e.toString());				
				reject(e);
			});	

		}));	

	},

	checkAddressHasAssetTag: function(address, assetTag, userName, password, serverLink) {
		return new Promise(((resolve, reject) => {		
			module.exports.rpc("checkaddresstag", [ address, "#" + assetTag ], userName, password, serverLink)
				.then(function (data) {
					resolve(data);
			})
			.catch(function (e) {
				logger.info("....................Raven.............................")
				logger.info("Ravencoin error - checkAddressHasAssetTag")
				logger.info(e.toString());					
				reject(e);
			});	
		}));						
	},

	transferShares(assetName, fromAddress, amount, toAddress, userName, password, serverLink, walletPassword) {
		return new Promise(((resolve, reject) => {		
			module.exports.rpc("walletpassphrase", [walletPassword, 60], userName, password, serverLink)			
			.then(function () {

				module.exports.rpc("transferfromaddress", ["$" + assetName, fromAddress, amount, toAddress], userName, password, serverLink)			
				.then(function (data) {
					if(data.length > 0) {

						logger.info(`Ravencoin transferShares to address ${toAddress} - Transaction return Data`);
						logger.info(data);

						async.retry(
							{ times: transactionRetries, interval: transactonSeconds },
							(callbackRetry) => {

								module.exports.rpc("gettransaction", [data[0]], userName, password, serverLink)			
								.then(function (statusData) {
									if (statusData.confirmations == 0) {
										callbackRetry('error', 0);
									} else {
										callbackRetry(null, 1);     //passing null as first parameter indicates success
									}
								});

							}, (err2, result) => {
								if (err2 != null) {
									logger.info(`${err2} - ${result} - sendTokens - Some error occured and execution cannot be confirmed`);
									reject(  `${err2} - ${result} - sendTokens - Some error occured and execution cannot be confirmed`  )
								} else {
									resolve(data[0]);
								}
							},
						);

					} else
						resolve("No-Transaction-ID");

				}).catch(function (e) {
					reject(e);
				});

			}).catch(function (e) {
				logger.info("....................Raven.............................")
				logger.info("Ravencoin error - transferShares")
				logger.info(e.toString());					
				reject(e);
			});
		}));
	},

	tokenCreateBurn(operation, assetName, address, amount, userName, password, serverLink, walletPassword) {
		//console.log( operation + " " + assetName + " " +  toAddress + " " +  amount + " " +  userName + " " +  password, serverLink  )
		//issue "asset_name" qty "( to_address )" "( change_address )" ( units ) ( reissuable ) ( has_ipfs ) "( ipfs_hash )"
		console.log(  walletPassword   )
		return new Promise(((resolve, reject) => {		
			if(operation == 1) {   //mint new tokens
				module.exports.rpc("walletpassphrase", [walletPassword, 60], userName, password, serverLink)			
				.then(function () {
						module.exports.rpc("reissuerestrictedasset", [assetName, amount, address], userName, password, serverLink)
						.then(function (data) {
							logger.info(`Ravencoin tokenCreateBurn reissuerestrictedasset ${assetName}, ${amount}, ${address} - Transaction Data ${data}`);
							resolve("done");
						}).catch(function (e) {
							logger.info("....................Raven.............................")
							logger.info("Ravencoin error - tokenCreateBurn")
							logger.info(e.toString());						
							reject(e);
						});
				}).catch(function (e) {
					logger.info("....................Raven.............................")
					logger.info("Ravencoin error - transferShares")
					logger.info(e.toString());					
					reject(e);
				});						
				
			} else if (operation == 2) {
				/*module.exports.rpc("transferfromaddress", ["$" + assetName, address, amount, "RXBurnXXXXXXXXXXXXXXXXXXXXXXWUo9FV"], userName, password, serverLink)
				.then(function (data) {
					resolve("done");
				}).catch(function (e) {
					reject(e);
				});*/
				//resolve("done");
			}
		}));
	},




	issueMainAssetToken(companyAddress, assetName, unitDecimals, ipfsDocumentHash, userName, password, serverLink, walletPassword) {

		return new Promise(((resolve, reject) => {				
			module.exports.rpc("walletpassphrase", [walletPassword, 60], userName, password, serverLink)			
			.then(function () {
				logger.info(`Wallet unlocked. senidng ravcncoin issueMainAssetToken RPC call for ${companyAddress}, ${assetName}`)
				// "asset_name"   qty    "( to_address )" "( change_address )" ( units ) ( reissuable ) ( has_ipfs ) "( ipfs_hash )"
				// "ASSET_NAME"   1000   "myaddress"      "changeaddress"      8         false          true          QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E

				const data = [assetName, 1, companyAddress, companyAddress, unitDecimals, true];
				if(ipfsDocumentHash != "") {
					data.push(true);
					data.push(ipfsDocumentHash)
				}

				console.log("Ready for first Ravencoin issue assets transaction . . . . .");

				module.exports.rpc("issue", data, userName, password, serverLink).then(function (data) {

					logger.info(`Ravencoin main asset issue RPC call send with transaction data - issueMainAssetToken  for ${companyAddress}, ${assetName}`);
					logger.info(`Transaction - ${data}`);

					if(data.length > 0) {
						logger.info(`Wiating for the completion of the ravencoin transaction - issueMainAssetToken  for ${companyAddress}  ${assetName}  ${data[0]}`);
						resolve (data[0])
					} else {
						logger.info(`issueMainAssetToken transaction error. Operation suspected  ${companyAddress}, ${assetName} `)
						reject(`issueMainAssetToken transaction error  ${companyAddress}, ${assetName} `);
					}

				}).catch(function (e) {
					reject(e);
				});


			}).catch(function (e) {
				logger.info("....................Raven.............................")
				logger.info("Ravencoin error - issueMainAssetToken")
				logger.info(e.toString());				
				reject(e);
			});		
		}));
	},

	issueQualifierAsset(companyAddress, qualifierName, ipfsDocumentHash, userName, password, serverLink, walletPassword) {

		return new Promise(((resolve, reject) => {			

			module.exports.rpc("walletpassphrase", [walletPassword, 60], userName, password, serverLink)			
			.then(function () {
				logger.info(`Wallet unlocked. senidng ravcncoin issueQualifierAsset RPC call for ${companyAddress}, ${qualifierName}`)

				//issuequalifierasset "asset_name" qty "( to_address )" "( change_address )" ( has_ipfs ) "( ipfs_hash )"
				const data = ["#" + qualifierName, 10, companyAddress, ""];
				if(ipfsDocumentHash != "") {
					data.push(true);
					data.push(ipfsDocumentHash)
				}

				module.exports.rpc("issuequalifierasset", data, userName, password, serverLink )			
				.then(function (data) {

					logger.info(`Ravencoin issueQualifierAsset RPC call send with transaction data - issueQualifierAsset for ${companyAddress}, ${qualifierName}`);
					logger.info(data);

					if(data.length > 0) {
						logger.info(`Wiating for the completion of the ravencoin transaction - issueQualifierAsset for ${companyAddress}, ${qualifierName} `);
						
						async.retry(
							{ times: transactionRetries, interval: transactonSeconds },
							(callbackRetry) => {
								module.exports.rpc("gettransaction", [data[0]], userName, password, serverLink)			
								.then(function (statusData) {
									if (statusData.confirmations == 0) {
										callbackRetry('error', 0);
									} else {
										callbackRetry(null, 1);     //passing null as first parameter indicates success
									}
								});

							}, (err2, result) => {
								if (err2 != null) {
									logger.info(`ravencoin transaction for issueQualifierAsset has some error for ${companyAddress}, ${qualifierName}  transaction ${data[0]}`);							
									logger.info(err2);
									reject(err2);
								} else {
									logger.info(`ravencoin transaction for issueQualifierAsset is complete for ${companyAddress}, ${qualifierName}  transaction ${data[0]}`);
									resolve(data[0]);
								}
							},
						);

					} else {
						logger.info(`issueQualifierAsset transaction error. Operation suspected transaction ${companyAddress}, ${qualifierName} `)
						reject(`issueQualifierAsset transaction error  ${companyAddress}, ${qualifierName}  }`);
					}

				}).catch(function (e) {
					logger.info("....................Raven.............................")
					logger.info("Ravencoin error - issueQualifierAsset")
					logger.info(e.toString());					
					reject(e)
				});

			}).catch(function (e) {
				logger.info("....................Raven.............................")
				logger.info("Ravencoin error - issueQualifierAsset")
				logger.info(e.toString());				
				reject(e);
			});		

		}));					

	},

	issueRestrictedAsset(assetName, companyAddress, qualifierName, amount, unitDecimals, ipfsDocumentHash, userName, password, serverLink, walletPassword) {

		return new Promise(((resolve, reject) => {			

			module.exports.rpc("walletpassphrase", [walletPassword, 60], userName, password, serverLink)			
			.then(function () {
				logger.info(`Wallet unlocked. senidng ravcncoin issueRestrictedAsset RPC call for conpany address : ${companyAddress}, asset name : ${assetName},  qualifier name: ${qualifierName}`)

				// "asset_name" qty "verifier" "to_address" "( change_address )" (units) ( reissuable ) ( has_ipfs ) "( ipfs_hash )"

				const data = [assetName, amount, "#" + qualifierName,  companyAddress, "", unitDecimals, true];
				if(ipfsDocumentHash != "") {
					data.push(true);
					data.push(ipfsDocumentHash)
				}

				module.exports.rpc("issuerestrictedasset", data, userName, password, serverLink)		
				.then(function (data) {

					logger.info(`Ravencoin issueRestrictedAsset RPC call send with transaction data - issueQualifierAsset for conpany address : ${companyAddress}, asset name : ${assetName},  qualifier name: ${qualifierName}`);
					logger.info(data);

					if(data.length > 0) {
						logger.info(`Wiating for the completion of the ravencoin transaction - issueRestrictedAsset for conpany address : ${companyAddress}, asset name : ${assetName},  qualifier name: ${qualifierName} `);
						
						resolve(data[0]);
					} else {
						logger.info(`issueRestrictedAsset transaction error. Operation suspected transaction conpany address : ${companyAddress}, asset name : ${assetName},  qualifier name: ${qualifierName} `)
						reject(`issueRestrictedAsset transaction error conpany address : ${companyAddress}, asset name : ${assetName},  qualifier name: ${qualifierName}`);
					}

				}).catch(function (e) {
					logger.info("....................Raven.............................")
					logger.info("Ravencoin error - issueRestrictedAsset")
					logger.info(e.toString());					
					reject(e)
				});

			}).catch(function (e) {
				logger.info("....................Raven.............................")
				logger.info("Ravencoin error - issueRestrictedAsset")
				logger.info(e.toString());				
				reject(e);
			});		

		}));					

	},




	getResourceInfomation(assetName, userName, password, serverLink) {

		return new Promise(((resolve, reject) => {			

				module.exports.rpc("getassetdata", [assetName], userName, password, serverLink)		
				.then(function (data) {
					resolve(data);
				}).catch(function (e) {
					logger.info("....................Raven.............................")
					logger.info("Ravencoin error - getResourceInfomation")
					logger.info(e.toString());					
					reject(e)
				});	

		}));					

	},	
	
	getCurrentRVNBalance(userName, password, serverLink, walletPassword) {

		return new Promise(((resolve, reject) => {			
			module.exports.rpc("walletpassphrase", [walletPassword, 60], userName, password, serverLink)			
			.then(function () {

				module.exports.rpc("getbalance", [], userName, password, serverLink)		
				.then(function (data) {
					resolve(data);
				}).catch(function (e) {	
					reject(e)
				});

			}).catch(function (e) {
				logger.info("....................Raven.2............................")
				logger.info("Ravencoin error - getCurrentRVNBalance")
				logger.info(e.toString());
				reject(e);
			});		

		}));					

	},	


	listreceivedbyaddress(userName, password, serverLink) {
		return new Promise(((resolve, reject) => {			

			module.exports.rpc("listreceivedbyaddress", [0, true], userName, password, serverLink)		
			.then(function (data) {
				resolve(data);
			}).catch(function (e) {
				reject(e)
			});

		}));	
	},

	getnewaddress(userName, password, serverLink, walletPassword) {
		return new Promise(((resolve, reject) => {			
			module.exports.rpc("walletpassphrase", [walletPassword, 60], userName, password, serverLink)			
			.then(function () {

				module.exports.rpc("getnewaddress", [], userName, password, serverLink)		
				.then(function (data) {
					resolve(data);
				}).catch(function (e) {
					reject(e)
				});

			}).catch(function (e) {
				logger.info("....................Raven.2............................")
				logger.info("Ravencoin error - getCurrentRVNBalance")
				logger.info(e.toString());
				reject(e);
			});		

		}));	
	},	

	waitForTransaction(transactionID, userName, password, serverLink)	 {

		return new Promise(((resolve, reject) => {					
			async.retry(
				{ times: transactionRetries, interval: transactonSeconds },
				(callbackRetry) => {
					module.exports.rpc("gettransaction", [transactionID], userName, password, serverLink)			
					.then(function (statusData) {
						//console.log(statusData)
						if (statusData.confirmations == 0) {
							callbackRetry('error', 0);
						} else {
							callbackRetry(null, 1);     //passing null as first parameter indicates success
						}
					});

				}, (err2, result) => {
					if (err2 != null) {
						reject(err2);
					} else {
						resolve("done");
					}
				}
			);
		}));

	},

	rpc: function(method, params, userName, password, serverLink) {

		console.log("Ravencoin RPC call for " + method + " " +  params)

		const promise = new Promise((resolutionFunc, rejectionFunc) => {

			const options = {
				auth: {
					username: userName,
					password: password,
				},
			};
			const data = {
				jsonrpc: "1.0",
				method,
				params,
			};

			try {
				const rpcResponse = axios.post(serverLink, data, options);

				rpcResponse.then((re) => {
					const result = re.data.result;
					resolutionFunc(result);
				});
				rpcResponse.catch((e) => {
					logger.info("....................RPC Error Raven...........................")
					logger.info("Ravencoin error - in ravencoin rpc call")
					logger.info(e.toString());				
					rejectionFunc(e);
				});
			} catch (e) {
				logger.info("....................RPC Error Raven...........................")
				logger.info("Ravencoin error - in ravencoin rpc call")
				logger.info(e.toString());				
				rejectionFunc(e);
			}

		});

		return promise;
	}

}
