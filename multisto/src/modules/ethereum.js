
const Web3 = require('web3');
const ethereumjs = require('ethereumjs-tx');
const async = require('async');
const common = require('../modules/common');
const abi = require('../data/contract_abi.json');
const whitelistAbi = require('../data/contract_whitelist_abi.json');
const mysql = require('../modules/mysql');
const logger = require('../logger');
const emailTexts = require('../data/text.json');
const { now } = require('moment');
//const { i } = require('mathjs');


module.exports = {

	encryptKey(key, password) {
        const web3 = new Web3(new Web3.providers.HttpProvider(global.config.web3Address));
		return web3.eth.accounts.encrypt(key, password);
	},

	decryptKey(key, password, web3Address) {
        const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));
		try {
            const obj = web3.eth.accounts.decrypt(key, password);
            return {"private": obj.privateKey.substring(2, obj.privateKey.length), "public": obj.address};
        } catch (err) {
            return 'error';
        }
	},
    
    sendTokens(distributionKey, toAddress, amountToSend, ethereumPrivateKey, contractAddress, blockchainProtocol, web3Address ) {

		return new Promise(((resolve, reject) => {
			try {
				const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));

                web3.eth.net.isListening().then(() => {
                    const privateKey = Buffer.from(ethereumPrivateKey, 'hex');
                    const contract = new web3.eth.Contract(common.getEthereumProtocolContractABI(blockchainProtocol), contractAddress);
                    web3.eth.defaultAccount = distributionKey;

                    var amount = 0;
                    //if(blockchainProtocol == 1) 
                    //    amount = web3.utils.toHex(amountToSend);					
                    //else
                    amount = web3.utils.toHex(amountToSend);
					

                    const estimateGasPromise = web3.eth.estimateGas({
                        to: contractAddress,
                        data: contract.methods.transfer(toAddress, amount).encodeABI(),
                    });
                    const nouncePromise = web3.eth.getTransactionCount(distributionKey, 'pending');
					const blockInfo = web3.eth.getBlock("latest");
					const gasPrice = web3.eth.getGasPrice();
					const chainId = web3.eth.getChainId();  					

                    const allPromises = Promise.all([estimateGasPromise, nouncePromise, blockInfo, gasPrice, chainId]);

                    allPromises.then((results) => {
						//console.log(results)
                        // creating raw tranaction
                        const rawTransaction = {
							chainId: results[4],
                            from: distributionKey,
							gasPrice: web3.utils.toHex(results[3]),
							gasLimit: results[2].gasLimit,							
                            to: contractAddress,
                            value: '0x0',
                            data: contract.methods.transfer(toAddress, amount).encodeABI(),
                            nonce: web3.utils.toHex(results[1]),
                        };

                        // creating tranaction via ethereumjs-tx
                        const transaction = new ethereumjs(rawTransaction);

                        // signing transaction with private key
                        transaction.sign(privateKey);

                        // sending transacton via web3 module
                        const serializedTx = transaction.serialize();

                        logger.info('sendToken transaction has been sent');
                        web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`, (err, txId) => {
                            if (err) {
                                logger.error(`sendToken transaction returned with error - ${err.message}`);
                                return;
                            }
                            logger.info(`sendToken transaction returned with txId-${txId} do doing local processing ..`);

                                async.retry(
                                    { times: 800, interval: 30000 },
                                    (callbackRetry) => {
                                        web3.eth.getTransactionReceipt(txId).then((data) => {
                                            if (data == null) {
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
                                            resolve(txId)
                                        }
                                    },
                                );							

                        });

                    }).catch((err) => {
                        reject({ code: '0', message: `${err.message}. Error in one of the Promises in allPromises in sendTokens` });
                    });
                }).catch((err) => {
                    reject({ code: '0', message: `${err.message}. Ethereum network connection error in sendTokens` });
                });

			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in sendTokens` });
			}
		}));
	},

	whitelisAddress(protocol, distributionPublciKey, publicKeyUser, authoeize, ethereumPrivateKey, ethereumWhitelistAddress, web3Address) {
		// authorize = true   add user to whitelist
		// authorize = false  remove user from whitelist

		return new Promise(((resolve, reject) => {
			try {
				const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));

				web3.eth.net.isListening().then(() => {

					const contract = new web3.eth.Contract(common.getEthereumProtocolWhiteListABI(protocol), ethereumWhitelistAddress);
					const privateKey = Buffer.from(ethereumPrivateKey, 'hex');

					const contractAddress = ethereumWhitelistAddress;

					web3.eth.defaultAccount = distributionPublciKey;
					let estimateGasPromise = '';

					/*if (authoeize === 'true') {
						estimateGasPromise = web3.eth.estimateGas({
							to: contractAddress,
							data: contract.methods.addWhitelistAddress(publicKeyUser).encodeABI(),
						});
					} else {
						estimateGasPromise = web3.eth.estimateGas({
							to: contractAddress,
							data: contract.methods.removeWhitelistAddress(publicKeyUser).encodeABI(),
						});
					}*/

					var tempData = "";	
					if (authoeize === 'true') {
                        if(protocol == 1)    
                            tempData = contract.methods.addWhitelistAddress(publicKeyUser).encodeABI();                        
                        else if(protocol == 2)    
                            tempData = contract.methods.modifyKYCData(publicKeyUser, 0, 0, 1893463200).encodeABI();
						else if(protocol == 4 || protocol == 5 || protocol == 6)    
                            tempData = contract.methods.modifyKYCData(publicKeyUser, 1, 1).encodeABI();
						
						estimateGasPromise = web3.eth.estimateGas({
							to: contractAddress,
							data: tempData
						});
					} else {
                        if(protocol == 1)    
                            tempData = contract.methods.removeWhitelistAddress(publicKeyUser).encodeABI();                        
                        else if(protocol == 2)    
                            tempData = contract.methods.modifyKYCData(publicKeyUser, 1893463200, 1893463200, 1893463200).encodeABI();
						else if(protocol == 4 || protocol == 5 || protocol == 6)    
                            tempData = contract.methods.modifyKYCData(publicKeyUser, 1893463200, 1893463200).encodeABI();

						estimateGasPromise = web3.eth.estimateGas({
							to: contractAddress,
							data: tempData
						});
					}

					const nouncePromise = web3.eth.getTransactionCount(distributionPublciKey, 'pending');
					const blockInfo = web3.eth.getBlock("latest");
					const gasPrice = web3.eth.getGasPrice();
					const chainId = web3.eth.getChainId();

					const allPromises = Promise.all([estimateGasPromise, nouncePromise, blockInfo, gasPrice, chainId]);

					allPromises.then((results) => {
						// creating raw tranaction
						const rawTransaction = {
							chainId: results[4],
							from: distributionPublciKey,
							gasPrice: web3.utils.toHex(results[3]),
							gasLimit: parseFloat( results[0] ) + 30000,							
							to: contractAddress,
							value: '0x0',
							nonce: web3.utils.toHex(results[1]),
						};
						rawTransaction.data = tempData;
						/*if (authoeize === 'true') { 
                            var tempData2 = "";
                            if(protocol == 1)    
                                tempData2 = contract.methods.addWhitelistAddress(publicKeyUser).encodeABI();                      
                            else if(protocol == 2)    
                                tempData2 = contract.methods.modifyKYCData(publicKeyUser, 0, 0, 1893463200).encodeABI();

                            rawTransaction.data = tempData2; 
                        } else { 
                            if(protocol == 1)    
                                tempData2 = contract.methods.removeWhitelistAddress(publicKeyUser).encodeABI();
                            else if(protocol == 2)    
                                tempData2 = contract.methods.modifyKYCData(publicKeyUser, 1893463200, 1893463200, 1893463200).encodeABI();

                            rawTransaction.data = tempData2;                             
                        }*/

						// creating tranaction via ethereumjs-tx
						const transaction = new ethereumjs(rawTransaction);
						// signing transaction with private key
						transaction.sign(privateKey);

						// sending transacton via web3 module
						const serializedTx = transaction.serialize();

						logger.info(`whitelisAddress transaction  address-${publicKeyUser}  authorize-${authoeize} Sending transaction`);
						web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`, (err, txId) => {
							if (err) {
								reject({ code: '0', message: `${err.message}. Error calling sendSignedTransaction in whitelisAddress` });
							} else {
								console.log(  txId  )
								async.retry(
									//{ times: global.config.EthereumTransactionRetries, interval: global.config.EthereumTransactionRetriesMillseconds },
									{ times: 800, interval: 30000 },
									(callbackRetry) => {
										web3.eth.getTransactionReceipt(txId).then((data) => {
											console.log( data );

											if (data == null) {
												callbackRetry('error', 0);
											} else {
												callbackRetry(null, 1);
											}
										});
									}, (err2, result) => {
										if (err2 != null) {
                                        	logger.info(`whitelisAddress - Some error occured and execution cannot be confirmed ${err2.toString()} ${result}`);
                                            reject({ code: '0', message: `${err2.toString()}.  in whitelisAddress` });
										}
										logger.info(`whitelisAddress transaction completed with txId-${txId}`);
										resolve('ok');
									},
								);
							}
						});
                        
					}).catch((err) => {
				        reject({ code: '0', message: `${err.message}. Error in one of the Promises in allPromises in whitelisAddress` });
					});
				})
				.catch((err) => {
				    reject({ code: '0', message: `${err.message}.    Ethereum network connection error in whitelisAddress` });
				});
			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in whitelisAddress` });
			}
		}));
	},

	// removed parameters  ,  stoid, ShareTypeID, tokenCreationRequestID, userId
	tokenCreateBurn: function(operation, protocolType, myAddress, amountToSend, ethereumPrivateKey, web3Address, ethereumContractAddress, blockchainDecimals) {

       return new Promise(((resolve, reject) => {
		   console.log(web3Address);

			try {
				const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));

				web3.eth.net.isListening().then(() => {

					const contractAddress = ethereumContractAddress;                    
                    const contract = new web3.eth.Contract(common.getEthereumProtocolContractABI(protocolType), contractAddress);
					const privateKey = Buffer.from(ethereumPrivateKey, 'hex');                    
					web3.eth.defaultAccount = myAddress;
                    const amount = "";

                    var tempData = "";
                    if(protocolType == 1 || protocolType == 4 || protocolType == 5 || protocolType == 6) {
							if(blockchainDecimals == 18)
                            	amount = web3.utils.toHex(amountToSend + "000000000000000000");      

                            if(operation == 1)                        
                                tempData = contract.methods.mint(myAddress, amount).encodeABI();
                            else if(operation == 2) { 
								if(protocolType == 1)
                                	tempData = contract.methods.burn(amount).encodeABI();        
								else if(protocolType == 4 || protocolType == 5|| protocolType == 6)  {                             
									tempData = contract.methods.burn(myAddress, amount).encodeABI();
								}
							}
                    } else if (protocolType == 2) {
                            //PolyMath
							if(blockchainDecimals == 18)
                            	amount = web3.utils.toHex(amountToSend + "000000000000000000");                            

                            if(operation == 1)
                                tempData = contract.methods.issue( myAddress, amount, Buffer.from([0]) ).encodeABI();
                            else if(operation == 2)                           
                                tempData = contract.methods.redeemFrom( myAddress, amount, Buffer.from([0]) ).encodeABI();
                    }

                    let estimateGasPromise = web3.eth.estimateGas({
                        to: contractAddress,
                        data: tempData
                    });

                    const nouncePromise = web3.eth.getTransactionCount(myAddress, 'pending');
					const blockInfo = web3.eth.getBlock("latest");
					const gasPrice = web3.eth.getGasPrice();
					const chainId = web3.eth.getChainId();

					const allPromises = Promise.all([estimateGasPromise, nouncePromise, blockInfo, gasPrice, chainId]);

					allPromises.then((results) => {
                            // creating raw tranaction               
                            const rawTransaction = {
								chainId: results[4],
								from: myAddress,
								gasPrice: web3.utils.toHex(results[3]),
								gasLimit: parseFloat( results[0] ) + 30000,
								to: contractAddress,
								value: 0x0,
								nonce: web3.utils.toHex(results[1]),
								data: tempData
                            };

                            // creating tranaction via ethereumjs-tx
                            const transaction = new ethereumjs(rawTransaction);

                            // signing transaction with private key
                            transaction.sign(privateKey);

                            // sending transacton via web3 module
                            const serializedTx = transaction.serialize();

                            logger.info( `Sending transaction to mint tokens`);

                            web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`, (err, txId) => {
                                if (err) {
                                    reject({ code: '0', message: `${err.message}. Error calling sendSignedTransaction in mint tokens` });
                                } else {
									
									async.retry(
										{ times: 800, interval: 30000 },
										(callbackRetry) => {
											web3.eth.getTransactionReceipt(txId).then((data) => {
												if (data == null) {
													callbackRetry('error', 0);
												} else {
													callbackRetry(null, 1);
												}
											});
										}, (err2, result) => {
											if (err2 != null) {
												logger.info(`mint tokens - Some error occured and execution cannot be confirmed ${err2.toString()} ${result}`);
												reject(err2);
											} else {
												logger.info(`mint tokens transaction completed with txId-${txId}`);
												resolve("done")
											}
										},
									);									
									
                                }
                            });

					}).catch((err) => {
				        reject({ code: '0', message: `${err.message}. Error in one of the Promises in allPromises in tokenCreateBurn` });
					});

				}).catch((err) => {
				    reject({ code: '0', message: `${err.message}.  Ethereum network connection error in tokenCreateBurn` });
				});

			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in tokenCreateBurn` });
			}
           
		}));
	
	},

	getTotalSupplyOfTokens: function(protocol, blockchainDecimals, contractAddress, web3Address) {
                
		return new Promise(((resolve, reject) => {
			try {
				const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));

				web3.eth.net.isListening().then(() => {
                    const contract = new web3.eth.Contract(common.getEthereumProtocolContractABI(protocol), contractAddress);
                    
					contract.methods.totalSupply().call().then((balance) => {

                            var val = 0;
							if(blockchainDecimals == 0)
								val = parseInt( balance.toString() );
							else
                                val = parseInt( web3.utils.fromWei(balance.toString(), 'ether') , 10 );


                            resolve(val);
					}).catch((err) => {
						reject({ code: '0', message: `${err.message}. Error calling getTotalSupplyOfTokens` });
					});

				}).catch(() => {
					reject({ code: '0', message: 'Ethereum network connection error in getTotalSupplyOfTokens' });
				});
			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in getTotalSupplyOfTokens` });
			}
		}));
        
    },    

	getAccountBalance(protocol, blockchainDecimals, address, ethereumContractAddress, web3Address) {
		return new Promise(((resolve, reject) => {
			try {
				const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));

				web3.eth.net.isListening().then(() => {
					const contract = new web3.eth.Contract(common.getEthereumProtocolContractABI(protocol), ethereumContractAddress);

						contract.methods.balanceOf(address).call().then((balance) => {	
							var val = 0;
							if(blockchainDecimals == 0)
								val = parseInt( balance.toString() );
							else
								val = parseFloat(   web3.utils.fromWei(balance.toString(), 'ether') , 10  );

							resolve(  val  );
						}).catch((err) => {
							reject({ code: '0', message: `${err.message}. Error calling balanceOf method in getAccountBalance` });
						});

				}).catch((err) => {
					reject({ code: '0', message: `${err} - Ethereum network connection error in getAccountBalance` });
				});
			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in getAccountBalance` });
			}
		}));
	},

	isInvestorWhiteListed(protocol, address, ethereumWhitelistAddress, web3Address) {

		return new Promise(((resolve, reject) => {
			try {
				const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));

				web3.eth.net.isListening().then(() => {

					const contract = new web3.eth.Contract(common.getEthereumProtocolWhiteListABI(protocol), ethereumWhitelistAddress);

					if(protocol == 1) {
						contract.methods.isInvestorWhiteListed(address).call().then((value) => {
							resolve(value);
						}).catch((err) => {
							reject({ code: '0', message: `${err.message}. Error calling isInvestorWhiteListed method in isInvestorWhiteListed` });
						});
					} else if (protocol == 2) {
						contract.methods.getKYCData([address]).call().then((data) => {
							if(data[0][0] < (Date.now()/1000))
								resolve(true);
							else
								resolve(false);
						}).catch((err) => {
							console.log(err)
							reject({ code: '0', message: `${err.message}. Error calling balanceOf method in getAccountBalance` });
						});
					} else if (protocol == 4 || protocol == 5 || protocol == 6) {
						contract.methods.getKYCData(address).call().then((data) => {
							if(data['0'] == 0)
								resolve(false);    // in our ERC1404 0 means not yet KYCed
							if( parseInt( data['0'] ) < (Date.now()/1000))
								resolve(true);
							else
								resolve(false);
						}).catch((err) => {
							console.log(err)
							reject({ code: '0', message: `${err.message}. Error calling balanceOf method in getAccountBalance` });
						});
					}

				}).catch((error) => {
				    reject({ code: '0', message: `${error.message} Ethereum network connection error in isInvestorWhiteListed` });
				});
				
			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in isInvestorWhiteListed` });
			}
		}));
	},
    
    getAccountAllowance: function(protocol, blockchainDecimals, fromaddress, toaddress, contractAddress, web3Address) {
        
		return new Promise(((resolve, reject) => {
			try {
                const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));

				web3.eth.net.isListening().then(() => {
                    
                        const contract = new web3.eth.Contract(common.getEthereumProtocolContractABI(protocol), contractAddress);

                        contract.methods.allowance(fromaddress, toaddress).call().then((balance) => {
                            
                                var val = 0; 
                                if(blockchainDecimals == 0)
                                    val = parseInt( balance.toString() );
                                else 
                                    val = parseFloat(   web3.utils.fromWei(balance.toString(), 'ether') , 10   );

                                resolve(  val  );
                            
                        }).catch((err) => {
                                reject({ code: '0', message: `${err.message}. Error calling ethereum balanceOf method in getAccountAllowance` });
                        });

				}).catch(() => {
					reject({ code: '0', message: 'Ethereum network connection error in ethereum getAccountAllowance' });
				});
			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in ethereum getAccountAllowance` });
			}
		}));
        
    },

    getDecimals: function(protocol, contractAddress, web3Address) {
		return new Promise(((resolve, reject) => {
			try {
                const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));

				web3.eth.net.isListening().then(() => {
                    
                        const contract = new web3.eth.Contract(common.getEthereumProtocolContractABI(protocol), contractAddress);

                        contract.methods.decimals().call().then((decimals) => {

                            resolve(  decimals  );

                        }).catch((err) => {
                            reject({ code: '0', message: `${err.message}. Error calling ethereum getDecimals` });
                        });

				}).catch(() => {
					reject({ code: '0', message: 'Ethereum network connection error in ethereum getDecimals' });
				});
			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in ethereum getDecimals` });
			}
		}));
        
    },	

	//Use this to get whitelist address of ERC1400 PolyMath token
	getPolyMathERC1400WhitelistAddress( contractAddress, protocol, web3Address) {

		return new Promise(((resolve, reject) => {
			try {
				const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));

				web3.eth.net.isListening().then(() => {

					const contract = new web3.eth.Contract(common.getPolyMathERC1400InfoContractABI(), contractAddress);

						//bytes32("GeneralTransferManager")					
						contract.methods.getModulesByName(  web3.utils.asciiToHex("GeneralTransferManager")   ).call().then((address) => {
							resolve(address);
						}).catch((err) => {
							reject({ code: '0', message: `${err.message}. Error calling balanceOf method in getAccountBalance` });
						});

				}).catch(() => {
					reject({ code: '0', message: 'Ethereum network connection error in getAccountBalance11' });
				});
			} catch (err) {
				reject({ code: '0', message: `${err.message}. Error occured in getAccountBalance` });
			}
		}));
	},

	waitEthereumTransactionCompletion(transactionID, web3Address) {
		return new Promise((resolve, reject) => {
			const web3 = new Web3(new Web3.providers.HttpProvider(web3Address));
			async.retry({ times: 1000, interval: 50000 },
				(callbackRetry) => {
					web3.eth.getTransactionReceipt(transactionID).then((data) => {
						if (data == null) 
							callbackRetry('error', 0);
						else 
							callbackRetry(null, 1);						
					});
				}, (err2, result) => {
					if (err2 != null) {						
						reject({ code: '0', message: err2.toString() });
					} else 						
						resolve("done");					
				}
			);

		});
	}

};

