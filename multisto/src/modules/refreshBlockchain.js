'use strict';

const async = require('async');
const mysql = require('./mysql');
const common = require('./common');
const logger = require('../logger');
const ethereumApi = require('./ethereum');
const blockchainApi = require('./blockchain');
const math = require('mathjs');

import { setGlobalPolymeshConnection, closeGlobalPolymeshConnection } from "./polymesh";

module.exports = {

	refreshTokensFromBlockahin(stoid) {

		return new Promise((resolve, reject) => {
                const params = [];
                logger.debug("Staring Blockchah Refresh for stoid" + stoid);  

                if(! global.config.blockchainRefreshingstos.includes(stoid) ) {
                        global.config.blockchainRefreshingstos.push(stoid);    

                        async.waterfall ( [
                            function getSTORecord (callback) {
                                const sql = 'select id, stoid, blockchainProtocol, ethereumBlockchainPublicAddress, ethereumContractAddress, token_abi  from sharetypes where stoid = ? and isblockchain = 1'; 

                                mysql.executeSQLStatement(sql, [stoid]).then((result) => { 
                                    var count = 0;

                                        async.whilst(
                                                function() {
                                                    return count < result.length
                                                },
                                                function (callbackInner) {

                                                    async.waterfall ( [
                                                            function loadInvestoData(callback) {
                                                                    module.exports.processAllInvestorsFromBlockchain( result[count] ).then(() => {
                                                                         callback(null);
                                                                    }).catch((error) => {                                                                    
                                                                            module.exports.removeSTOFromList(stoid).then(()=> {
                                                                                 logger.info(`${error.message}`);
                                                                                 reject(`${error.message} - Error in refreshBlockchainBalances` ); 
                                                                            })  
                                                                    });
                                                            },
                                                            function setSTOStatistics(callback) {

                                                                module.exports.updateBlockchainCompanyTotalBalances( result[count].blockchainProtocol, result[count].ethereumBlockchainPublicAddress, result[count].ethereumContractAddress, result[count].id, stoid).then(() => {


                                                                        count++;
                                                                        callbackInner(null, count);                                                                
                                                                
                                                                }, (error) => {
                                                                        module.exports.removeSTOFromList(stoid).then(()=>{
                                                                             logger.info(`${error.message}`);
                                                                             reject(`${error.message} - Error in refreshBlockchainBalances` ); 
                                                                        })  
                                                                 });
                                                                    
                                                            }
                                                     ] );

                                                },
                                                function(err, n) {
                                                    if (!err) {
                                                        callback(null);
                                                    } else {
                                                        logger.info(`${err}`);
                                                    }
                                                }
                                        );

                                }).catch((error) => { 
                                        module.exports.removeSTOFromList(stoid).then(()=>{
                                             logger.info(`${error.message}`);
                                             reject(`${error.message} - Error occured` ); 
                                        })                                            
                                }); 
                            }, 
                            function function2 (callback) {    
                                module.exports.removeSTOFromList(stoid).then(()=>{
                                        resolve("done");
                                })
                            }
                        ]);            
                } else {
                    logger.info("Blockchain refresh for " + stoid + " already running")
                    resolve("done");
                }
        
        });
	}, 

    processAllInvestorsFromBlockchain(sharetype) {
        return new Promise((resolve, reject) => {
                const params = {};
                logger.info("Going to process investors for share type id " +  sharetype.id )

                async.waterfall([
                    function fun0(callback) {
                        if( sharetype.blockchainProtocol == 7 ) {

                            mysql.executeSQLStatement("select polymeshAccountID from sharetypes where id = ?", [sharetype.id]) .then((result) => {  
                                mysql.executeSQLStatement("select mnemonic from polymeshAccounts where id = ?", [result[0].polymeshAccountID]) .then((result2) => {                                    
                                    common.decryptAsync(result2[0].mnemonic).then((mnemonic)=> {

                                        params.mnemonic = mnemonic;
                                        setGlobalPolymeshConnection (mnemonic).then(() => {
                                            callback();
                                        })
                                    })
                                }).catch((error) => {
                                    logger.info(`${error.message}`);
                                    reject(`${error.message} Error occured in   common processAllInvestorsFromBlockchain`);
                                });
                            }).catch((error) => {
                                logger.info(`${error.message}`);
                                reject(`${error.message} Error occured in   common processAllInvestorsFromBlockchain`);
                            });

                        } else
                            callback();
                    },
                    function fun1(callback) {
                            const stmt = `select count(*) as count from investor i, investorsto s where i.id = s.investorid and s.stoid = ${sharetype.stoid}`;
                            mysql.executeSQLStatement(stmt, []) .then((result) => {                                    
                                logger.info("total investor found " + result[0].count );
                                params.RecordCount = result[0].count;
                                callback(null);
                            }).catch((error) => {
                                logger.info(`${error.message}`);
                                reject(`${error.message} Error occured in   common refreshTokensFromBlockahin`);
                            });
                    },   
                    function fun2(callback) {
                        let count = 0;

                        async.whilst(
                            function () { 
                                return count < params.RecordCount;
                            },
                            function (callbackInner) {

                                    const stmt = `select i.id from investor i, investorsto s where i.id = s.investorid and s.stoid=? LIMIT ?,1`;
                                    mysql.executeSQLStatement(stmt, [sharetype.stoid, count]).then((InvestorRec) => {

                                        module.exports.loadInvestorBlockchainBalances( InvestorRec[0].id, sharetype.ethereumContractAddress, sharetype.id, sharetype.blockchainProtocol, sharetype.stoid ).then(() => {
                                            count++;
                                            callbackInner(null, count);
                                        }).catch((error) => {
                                            logger.info(`${error.message}`);
                                            reject(`Error in processAllInvestorsFromBlockchain - ${error.message}`);
                                        });

                                    })
                                    .catch((error) => {
                                        logger.info(`${error.message}`);
                                        reject(`${error.message} Error occured in    processAllInvestorsFromBlockchain`);
                                    });                                    
                                
                            },
                            function (err,n) {
                                if (!err) {
                                        callback(null);
                                } else {
                                        logger.info(`${err.message} Error occured in    processAllInvestorsFromBlockchain`);
                                        reject(err);
                                }
                            }
                        ); 
                    },  
                    function fun3(callback) {
                        if( sharetype.blockchainProtocol == 7 ) {
                            closeGlobalPolymeshConnection(params.mnemonic).then(()=> {
                                resolve("done");
                            })
                        } else                      
                            resolve("done");                    
                    }
                ])
        });
    },

    loadInvestorBlockchainBalances(investorid, contractAddress, sharetypeid, blockchainProtocol, stoid) {
        return new Promise((resolve, reject) => {
            const params = {};

            async.waterfall ( [
                function fun0(callback) {
                    if( blockchainProtocol == 7 ) {

                        mysql.executeSQLStatement("select polymeshAccountID from sharetypes where id = ?", [sharetypeid]) .then((result) => {                                    
                            mysql.executeSQLStatement("select mnemonic from polymeshAccounts where id = ?", [result[0].polymeshAccountID]) .then((result2) => {                                    
                                common.decryptAsync(result2[0].mnemonic).then((mnemonic)=> {
                                    params.mnemonic = mnemonic;
                                    setGlobalPolymeshConnection (mnemonic).then(() => {
                                        callback();
                                    })
                                })
                            }).catch((error) => {
                                logger.info(`${error.message}`);
                                reject(`${error.message} Error occured in   common processAllInvestorsFromBlockchain`);
                            });
                        }).catch((error) => {
                            logger.info(`${error.message}`);
                            reject(`${error.message} Error occured in   common processAllInvestorsFromBlockchain`);
                        });

                    } else
                        callback();
                },                
                function getInvestorData (callback) {
                    const sql = `select id, publickey from shareswallet where investorID = ? and sharesID = ? and publickey != 'platform';  select COALESCE( sum(shares), 0 ) as sum from shareswallet where investorID = ? and sharesID = ? and publickey = 'platform'`;
                    mysql.executeSQLStatement(sql, [investorid, sharetypeid, investorid, sharetypeid]).then((result) => {

                            var count = 0;
                            params.totalWalletTokens = 0;

                            if(result[1].length == 0)
                                params.totalOffchainBalance = 0;
                            else
                                params.totalOffchainBalance = parseFloat( result[1][0].sum );
                        
                            async.whilst(
                                function() {
                                    return count < result[0].length
                                },                                
                                function (callbackInner) {

                                    blockchainApi.isInvestorWhiteListed(result[0][count].publickey, sharetypeid).then((currentStatus) => {

                                        blockchainApi.getAccountBalance(sharetypeid, result[0][count].publickey).then((data) => {

                                            params.totalWalletTokens = math.sum(params.totalWalletTokens ?? 0, parseFloat( data ?? 0 ));                                
                                            var isBloked = 0;
                                            if(currentStatus==false)
                                                isBloked = 1;
                                            const stmt = 'update shareswallet set shares = ?, isBlocked = ? where investorID = ? and sharesID = ? and publicKey = ?;';
                                                mysql.executeSQLStatement(stmt, [data, isBloked, investorid, sharetypeid, result[0][count].publickey]).then(() => {
                                                    count++;
                                                    callbackInner(null, count);
                                            }).catch((error) => {
                                                logger.info(`${error.message}`);
                                                reject(`${error.message} Error in refreshBlockchainBalances`);
                                            });

                                        }, (error) => {
                                            logger.info(`${error.message}`);
                                            reject(`${error.message} - Error occured in  refreshBlockchainBalances 1`);
                                        });

                                    }, (error) => {
                                        logger.info(`${error.message}`);
                                        reject(`${error.message} - Error occured in  refreshBlockchainBalances 2`);
                                    });

                                },
                                function(error, n) {
                                    if (!error) {
                                        callback(null);
                                    } else {
                                        logger.info(`${error.message}`);
                                        reject(`${error.message} Error in loadInvestorBlockchainBalances`);
                                    }
                                }
                            );

                    }).catch((error) => {
                            logger.info(`${error.message}`);
                            reject(`${error.message} - Error in loadInvestorBlockchainBalances `); 
                    });
                }, 
                function updateInvestorData (callback) {
                    async.waterfall([
                            function checkrecord(callbackinner) {
                                const stmt = 'select id from shares where shareTypeid=? and investorID=? and stoid=?';
                                    mysql.executeSQLStatement(stmt, [sharetypeid, investorid, stoid]).then((result) => {

                                        if(result.length > 0) 
                                            params.recordFound = 1;
                                        else
                                            params.recordFound = 0;                                             

                                        callbackinner(null);
                                }).catch((error2) => {
                                        logger.error(`${error2.message}`);
                                        reject(`${error2.message} Error in loadInvestorBlockchainBalances`);
                                });                                  
                            },
                            function setinvestorrec(callbackinner) {
                                
                                if(params.recordFound == 0) {                                   
                                    const stmt = 'insert into shares(stoid, shareTypeid, isBlockchainFrozen, isBlockchainAuthorized, shares, investorID, sharesHistoryID)  values(?, ?, 0, 1, ?, ?, 0)';    

                                        mysql.executeSQLStatement(stmt, [stoid, sharetypeid, math.sum(parseFloat( params.totalWalletTokens ?? 0 ), params.totalOffchainBalance ?? 0),  investorid]).then((result) => {
                                            callbackinner(null);
                                    }).catch((error2) => {
                                            logger.info(`${error2.message}`);
                                            reject(`${error2.message} Error in loadInvestorBlockchainBalances`);
                                    });                                     
                                } else {
                                    const stmt = 'update shares set shares=? where shareTypeid=? and investorID=? and stoid=?';
                                        mysql.executeSQLStatement(stmt, [math.sum(parseFloat( params.totalWalletTokens ?? 0), params.totalOffchainBalance ?? 0), sharetypeid, investorid, stoid]).then((result) => {
                                            callbackinner(null);
                                    }).catch((error2) => {
                                            logger.info(`${error2.message}`);
                                            reject(`${error2.message} Error in loadInvestorBlockchainBalances`);
                                    }); 
                                }
                            },
                            function getdone(callbackinner) {
                                if( blockchainProtocol == 7 ) {
                                    closeGlobalPolymeshConnection(params.mnemonic).then(()=> {
                                        resolve("done");
                                    })
                                } else                      
                                    resolve("done");                                 
                            }
                    ])
                }
            ]);
        })
    },

    updateBlockchainCompanyTotalBalances(blockchainProtocol, ethereumBlockchainPublicAddress, ethereumContractAddress, shareTypeID, stoid) {
        return new Promise((resolve, reject) => {
            const params = {};

            async.waterfall ([
                function fun1(callback) {
                    if( blockchainProtocol == 7 ) {

                        mysql.executeSQLStatement("select polymeshAccountID from sharetypes where id = ?", [shareTypeID]) .then((result) => {                                    
                            mysql.executeSQLStatement("select mnemonic from polymeshAccounts where id = ?", [result[0].polymeshAccountID]) .then((result2) => {                                    
                                common.decryptAsync(result2[0].mnemonic).then((mnemonic)=> {
                                    params.mnemonic = mnemonic;
                                    setGlobalPolymeshConnection (mnemonic).then(() => {
                                        callback();
                                    })
                                })
                            }).catch((error) => {
                                logger.info(`${error.message}`);
                                reject(`${error.message} Error occured in   common processAllInvestorsFromBlockchain`);
                            });
                        }).catch((error) => {
                            logger.info(`${error.message}`);
                            reject(`${error.message} Error occured in   common processAllInvestorsFromBlockchain`);
                        });


                    } else
                        callback();
                }, 
                function fun2(callback) {                                
                    blockchainApi.getAccountBalance(shareTypeID, ethereumBlockchainPublicAddress).then((balance) => {

                        blockchainApi.getTotalSupplyOfTokens(shareTypeID).then((totalSupply) => {

                            const stmt = `select COALESCE( sum(shares), 0 ) as sum from shareswallet where sharesID = ? and publicKey = 'platform'`;
                            mysql.executeSQLStatement(stmt, [shareTypeID]).then((resultBalance) => {
                                    var bal1 =  balance - parseFloat( resultBalance[0].sum );
                                
                                    const stmt = 'update sharetypes set companyShares=?, totalShares=? where id=? and stoid=?';
                                    mysql.executeSQLStatement(stmt, [bal1, parseFloat(totalSupply), shareTypeID, stoid]).then(() => {     

                                        params = {
                                            "companyBalanceInBlockchain": balance,
                                            "companyBalance": bal1, 
                                            "totalSupply": parseFloat(totalSupply)
                                        };
                                        
                                        callback(null);

                                    }).catch((error) => {
                                        reject(`${error.message} - Error occured updateBlockchainCompanyTotalBalances updateBlockchainCompanyTotalBalances` ); 
                                    });

                            }).catch((error) => {
                                    reject(`${error.message} - Error occured updateBlockchainCompanyTotalBalances updateBlockchainCompanyTotalBalances` ); 
                            });

                        }, (error) => {
                            reject(`${error.message} - Error occured updateBlockchainCompanyTotalBalances updateBlockchainCompanyTotalBalances` ); 
                        });

                    }, (error) => {
                        reject(`${error.message} - Error occured updateBlockchainCompanyTotalBalances updateBlockchainCompanyTotalBalances` ); 
                    });
                },
                function fun3(callback) {
                    if( blockchainProtocol == 7 ) {
                        closeGlobalPolymeshConnection(params.mnemonic).then(()=> {
                            resolve (params);
                        })
                    } else 
                        resolve (params);
                }            
            ]);

        });
    },

    removeSTOFromList(stoid) {
        return new Promise((resolve, reject) => {        
                var temp = [];
                var i;
                for (i = 0; i < global.config.blockchainRefreshingstos.length; i++) {
                     if(global.config.blockchainRefreshingstos[i] != stoid)
                         temp.push(  global.config.blockchainRefreshingstos[i]  );
                }
                global.config.blockchainRefreshingstos = temp;
                resolve("done");
        });

    }

};

