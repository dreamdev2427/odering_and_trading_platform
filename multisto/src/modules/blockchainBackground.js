'use strict';

const common = require('./common');
const mysql = require('../modules/mysql');
const logger = require('../logger');
const async = require('async');
const crypto = require('crypto');
const blockchainApi = require('./blockchain');
const ethereumApi = require('./ethereum');


var serverStarted = 0; 
var jobStarted = 0;
var investorInternalWalletProjectSpecific = 1;
var web3Address = "";

var currentlyExecutingRecordID = [];

process.on('message', (msg) => {
	if(msg.op == 1)	{
		investorInternalWalletProjectSpecific = msg.investorInternalWalletProjectSpecific;

		web3Address = msg.web3Address;
		serverStarted = 1;
	}
});

setInterval(() => {
	if( serverStarted == 1  ) {
			  var params = {};
			  function checkForNewJob(callback) {
					const sql = 'select * from blockchainSharesTransferTransactions where status = 0 order by id asc limit 1';
					mysql.executeSQLStatement(sql, []).then((result) => {
						if(result.length > 0) {
							
							const index = currentlyExecutingRecordID.findIndex(c => c === result[0].ID);
							if( index < 0) {							
									params.record = result[0];							
									params.runjob = 1;
									currentlyExecutingRecordID.push(  params.record.ID  );
							} else
								params.runjob = 0;

							callback(null);

						} else {
							params.runjob = 0;
							callback(null);
						}
					}).catch((error) => {
						logger.error(`${error.toString()} - Error in bulk email Server checkForNewJob`);
					});
			  }
			  function getSTOInfo(callback) {
				  if(params.runjob == 1) {

						const sql = 'update blockchainSharesTransferTransactions set status = 1 where id = ?';
						mysql.executeSQLStatement(sql, [params.record.ID]).then((result) => { 
							callback(null);
						}).catch((error) => {
							logger.error(`${error.toString()} - Error in bulk email Server getSTOInfo`);
						}); 

				  } else
					  callback(null);
			  }
			  function retrivePrivateKey(callback) {

 					if(params.runjob == 1) {

						const sql = 'select walletCustodayType, keyStoreFileAutoPayments, keyStoreFileAutoPaymentsPassword from sharetypes where id = ?'; 
						mysql.executeSQLStatement(sql, [params.record.shareTypeID]).then((result) => { 
							
							var mykey = crypto.createDecipher('aes-128-cbc', process.env.PASSWORD_SALT);
							var decryptedPassword = mykey.update(result[0].keyStoreFileAutoPaymentsPassword, 'hex', 'utf8')
							decryptedPassword += mykey.final('utf8');

							params.privateKey = "";
							if( result[0].walletCustodayType == 0 ) {
								if( result[0].keyStoreFileAutoPayments != null || result[0].keyStoreFileAutoPayments != "" ) {
									var keys = ethereumApi.decryptKey(JSON.parse(result[0].keyStoreFileAutoPayments), decryptedPassword);								
									if (keys === 'error') {
										logger.error(`Automatic shares transfer background service. Share: could not decrypt private key most likely issues with password   Record ID ${params.record.ID}`);
										return;
									} else {
										params.privateKey = keys.private;
										callback(null);
									}
								}
							} else if ( result[0].walletCustodayType == 1 ) {
								// This is Tangany custodian wallet
								callback(null);
							}

						}).catch((error) => {
							logger.error(`${error.toString()} - Error in bulk email Server getSTOInfo`);
						}); 				  

					} else
						callback(null);

			  }
			  function executejob(callback) {
				  if(params.runjob == 1) {

						blockchainApi.sendTokens( 1, params.privateKey, params.record.toAddress, params.record.amountToSend, params.record.stoid, params.record.investorID, -1, params.record.shareTypeID, params.record.investmentAmount, params.record.investmentDetails, 0, 0, "off", params.record.ID, "0", "" ).then((result) => {

							const index = currentlyExecutingRecordID.findIndex(c => c === params.record.ID);
							currentlyExecutingRecordID = currentlyExecutingRecordID.splice(index , 0);
							callback(null);

						}, (err)=> {
							  
						})
					  
				  } else
					  callback(null);
			  }
			  async.waterfall([
				 checkForNewJob,
				 getSTOInfo,
				 retrivePrivateKey,
				 executejob,
			  ], function (err) {
				   params = null;
			  });
	}
}, 10000);
