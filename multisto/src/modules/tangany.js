'use strict';

const async = require('async');
const mysql = require('./mysql');
const common = require('./common');
const logger = require('../logger');
const axios = require('axios');


module.exports = {
		
	sendTokens( contractAddress, toAddress, tokens, tanganyWallet ) {

        return new Promise((resolve, reject) => {
			
			module.exports.getHeaderInformatiion ().then((header) => {
						
					const data =  {
						"function": "transfer(address,uint256)",
						"inputs": [
								toAddress,
								tokens
						]
					}			

					logger.info(`sendTokens - Sending Tangany transaction`);
					axios.post( header["tangany-api-base-url"] + "/eth/contract/" + contractAddress + "/" + tanganyWallet + "/send-async",  data, { headers: header }).then((responseTransaction) => {
							
							async.retry(
								{ times: 100, interval: 20000 },
								(callbackRetry) => {
									
											axios.get( header["tangany-api-base-url"] +  responseTransaction.data.statusUri, {
													headers: module.exports.getHeaderInformatiion()
											}).then((response) => {

													if(response.data.process == "Completed")
														  callbackRetry(null, "Completed");
													else
														  callbackRetry("Not Completed");													

											}).catch((error) => {
													callbackRetry("Not Completed");
											})

								}, (err2, result) => {
										if (result != "Completed") {
											logger.info(`sendTokens - Some error occured and Tangany execution cannot be confirmed`);
											reject(`sendTokens - Some error occured and execution cannot be confirmed`)
										} else {
											resolve("Done")
										}

								},
							);
						
					  }).catch((error) => {
							reject(error);
					  })

					resolve("done")
			});

		});

	},	
	
	getHeaderInformatiion() {
		  return new Promise((resolve, reject) => {
				var headers = {};		
				const stmt = "select * from params where param in (  'tangany-network', 'tangany-client-id', 'tangany-client-secret', 'tangany-vault-url', 'tangany-subscription', 'tangany-api-base-url'  )";
				mysql.executeSQLStatement(stmt, []).then((result) => {
						result.forEach(function(obj) { 
							if(obj.param == "tangany-network")
								headers["tangany-ethereum-network"] =  obj.stringValue;
							if(obj.param == "tangany-client-id")
								headers["tangany-client-id"] =  obj.stringValue;
							if(obj.param == "tangany-client-secret")
								headers["tangany-client-secret"] =  obj.stringValue;
							if(obj.param == "tangany-vault-url")
								headers["tangany-vault-url"] =  obj.stringValue;
							if(obj.param == "tangany-subscription")
								headers["tangany-subscription"] =  obj.stringValue;
							if(obj.param == "tangany-api-base-url")
								headers["tangany-api-base-url"] =  obj.stringValue;					
						})

						resolve( headers );

				}).catch((error) => {
						reject(`Tangany sendTokens - Some error occured in Tagany module get params records   ${error.toString()}`)
				});		
		
		});					
					
	
		/*headers["tangany-ethereum-network"] =  global.config["tangany-network"];
		headers["tangany-client-id"] = global.config["tangany-client-id"];
		headers["tangany-client-secret"] =    global.config["tangany-client-secret"];
		headers["tangany-vault-url"] =    global.config["tangany-vault-url"];
		headers["tangany-subscription"] =     global.config["tangany-subscription"];*/

	}
	
}



