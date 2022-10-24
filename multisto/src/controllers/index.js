/* eslint-disable no-param-reassign */
import * as math from 'mathjs';
import bimountDepositNotification from "../services/bimountDepositNotification";
import * as priceOracle from "../services/platform/price-oracle/controller";
import * as emailTextsController from '../services/platform/emails/controllers/EmailTexts.controller';
import ShareCapTable from '../services/investors/sharecap/sharecap-table.service';
import getSTOFromConfig from '../services/getSTOFromConfig';
import { getCountOfAccreditionsWithWaitingStatus, getAccreditionsWithWaitingStatus } from './stoAdmin/accredition/get-all-accreditions'
import { setAccreditationStatus } from './stoAdmin/accredition/get-all-accreditions';
import {accreditionStatus} from '../graphql/enums/index'
import { mutation$ } from "../graphql/fetchers"

const express = require('express');

const router = express.Router();

const async = require('async');
const fs = require('fs-extra');
const common = require('../modules/common');
const mysql = require('../modules/mysql');
const logger = require('../logger');
const refreshBlockchain = require('../modules/refreshBlockchain');
const emailTexts = require('../data/text.json');
const formidable = require('formidable');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const ethereumApi = require('../modules/ethereum');
const blockchainApi = require('../modules/blockchain');
const multer = require('multer')
const upload = multer({ dest: path.join(__dirname, '/../../public/img/newsletter' )})
import wallet from './investors/paymentsCtl/wallet';
import { investingEntity$$, query$ } from '../graphql/fetchers';


const index = {

    //if investor has set 2 factor authenticaton then he will be redirected here to enter code in emial
    login2(req, res) {
        if(req.session.user) {
            res.render('admin/login2', {
                csrfToken: req.csrfToken(),
                Message: req.flash('Message'),
                logo: getSTOFromConfig(req.session.stoid).logo
            });
        } else
            res.redirect("login");
    },
    login2post(req, res) {
        if(req.session.user) {
            if(req.session.user.AuthCode == req.body.txtCode) {
                req.session.user.AuthCode = 0;
                res.redirect("dashboardsto");
            } else {
                res.redirect("login2");
            }
        } else
            res.redirect("login");
    },

    dashboardsto(req, res) {
        var params = {};
        async function getCount(callback) {
            let count = await getCountOfAccreditionsWithWaitingStatus(req)
            params.count = count
            callback(null)

        }
		  async.waterfall([
              getCount,
			  function loadParameters(callback) {
                        const sql = `select * from sharetypes where stoid = ${req.session.stoid}`;
                        mysql.executeSQLStatement(sql, []).then((result) => {
							//Totals
                            var Totals = 0;
                            var TotalTransfered = 0;
                            var TotalInHand = 0;

							//Total Blockchain
                            var totalShares = 0;
                            var tokenInHand = 0;
                            var sharesTransfered = 0;

							//Total NonBlockchain
                            var NonBlockchainSharesTotal = 0;
                            var NonBlockchainDistribution = 0;
                            var NonBSharesNotSold = 0;

                            result.forEach((obj) => {
									obj.issuedShares = math.subtract(obj.totalShares ?? 0, obj.companyShares ?? 0) ?? 0;
									Totals = math.sum(Totals, obj.totalShares ?? 0);
									TotalInHand = math.sum(TotalInHand, obj.companyShares ?? 0);

									if(obj.isblockchain == 1) {
									   totalShares = math.sum(totalShares, obj.totalShares ?? 0);
									   tokenInHand = math.sum(tokenInHand, obj.companyShares ?? 0);
									} else {
									   NonBlockchainSharesTotal = math.sum(NonBlockchainSharesTotal, obj.totalShares ?? 0);
									   NonBlockchainDistribution = math.sum(NonBlockchainDistribution, obj.companyShares ?? 0);
									}
                            });
                            TotalTransfered = math.subtract(Totals, TotalInHand) ?? 0;
                            sharesTransfered = math.subtract(totalShares, tokenInHand) ?? 0;
                            NonBSharesNotSold = math.subtract(NonBlockchainSharesTotal, NonBlockchainDistribution) ?? 0;

                            const tokenInfo = {
                                Totals: Totals,
                                TotalTransfered: TotalTransfered,
                                TotalInHand: TotalInHand,
                                totalShares: totalShares,
                                tokenInHand: tokenInHand,
                                sharesTransfered: sharesTransfered,
                                NonBlockchainSharesTotal: NonBlockchainSharesTotal,
                                NonBSharesNotSold: NonBSharesNotSold,
                                NonBlockchainDistribution: NonBlockchainDistribution
                            }

                            params.tokenInfo = tokenInfo;
                            params.shareTypesRecords = result;

                            callback(null);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} - Error occured in  dashboardsto loadParameters`);
                        });
			  },
			  function loadData(callback) {
                        let sql = `select 'Total' as param, count(*) as count from investor i, investorsto s where isKYC = 1 and i.id = s.investorid and stoid=${req.session.stoid} \
                        union \
                        select 'inbox' as param, count(*) as count from inbox where isResponded = 0 and stoid=${req.session.stoid} \
                        union \
                        select 'TotalWhitelisted' as param, count(*) as count from ( select count(*) from shareswallet s, sharetypes t where s.sharesID = t.id and t.stoid = ${req.session.stoid} and s.isBlocked = 0 and s.publicKey != 'platform' group by investorID  ) as myCount
                        union \
                        select 'TotalBlocked' as param, count(*) as count from ( select count(*) from shareswallet s, sharetypes t where s.sharesID = t.id and t.stoid = ${req.session.stoid} and s.isBlocked = 1 and s.publicKey != 'platform' group by investorID  ) as myCount                        
                        ;\
                        SELECT Description, DATE_FORMAT(LogDate,'%M %d %Y %H:%i:%s') as LogDate, users.ID, users.FirstName as UserFirstName, users.LastName as UserLastName, users.Username, investor.FirstName as InvestorFirstName, investor.LastName as InvestorLastName FROM logs LEFT JOIN investor ON investor.ID = logs.InvestorID LEFT JOIN users ON logs.UserID = users.ID Where logs.activitytype in (5,6,7,8,9,10,15,16,17) and logdate >= DATE(NOW()) - INTERVAL 7 DAY and logs.stoid=${req.session.stoid} order by logs.ID DESC Limit 70 \
                        ;\
                        select count(*) as count from changeaddresserequest where isActivated = 0 and stoid=${req.session.stoid} \
                        ;\
                        select count(*) as count from changeaddresserequest where isActivated = 1 and stoid=${req.session.stoid} \
                        ;\
                        select t.ID, DATE_FORMAT(t.dattime,'%M %d %Y') as LogDate, s.premimum, s.nominalvalue, s.currencyid,  s.title, t.tokens, t.description, u.FirstName, u.LastName from sharetypes s, tokencreationrequests t, users u where s.id = t.sharetypeid and u.id = t.createdbyuserid and s.stoid = ${req.session.stoid}`

                        const matchDeposit = (global.config.isInvoicingEnabled === 1 && global.config.IsMarketSpace !== 1);

                        if(global.config.InvestorCombinePropertiesMode == 1) {
                            sql += `; select d.*, DATE_FORMAT(DateReceived,'%M %d %Y') as alertDateReceived, s.title, i.FirstName, i.LastName, i.investorType, i.CompanyName from InvestorDepositReceivedAlert d, paymentchannels s, investor i where d.isApproved = 0 and s.id = d.ChannelID and i.id = d.investorID and d.storid = ${req.session.stoid} \
                                ;\
                                select
                                    COALESCE( count(*), 0 ) as sum
                                from
                                    InvestorBuyPropertyAlert b
                                ${matchDeposit
                                    ? `inner join InvestorDepositReceivedAlert d on d.buyAlertID = b.id`
                                    : ``
                                }
                                inner join investor i on i.ID = b.investorID
                                where
                                    b.stoid = ${req.session.stoid}
                                and isBuySharesFormSigned = 1
                                and status = 1
                                ${matchDeposit
                                    ? `and d.isApproved = 1`
                                    : ``
                                }
                                `;
                        }


                        mysql.executeSQLStatement(sql, []).then((result) => {
								const InvestorInfo = {};

								result[0].forEach((obj) => {
									if (obj.param === 'Total') { InvestorInfo.Total = obj.count; }
									if (obj.param === 'inbox') { InvestorInfo.newEmails = obj.count; }
									if (obj.param === 'TotalWhitelisted') { InvestorInfo.TotalWhitelisted = obj.count; }
									if (obj.param === 'TotalBlocked') { InvestorInfo.TotalBlocked = obj.count; }
								});

								params.tokenInfo.stoLogo = getSTOFromConfig(req.session.stoid).logo;
								InvestorInfo.logCount = result[1].length;
								params.investorInfo = InvestorInfo;
								params.LogsRecords = result[1];
								params.newChangeRequest = result[2][0].count;
								params.processingChangeRequest = result[3][0].count;
								params.newShareCreateRequest = result[4];
								if(global.config.InvestorCombinePropertiesMode == 1) {
									params.newPaymentsReceivedAlerts = result[5];
									params.newPropertyReceivedAlertsCount = parseFloat(result[6][0].sum);
								} else {
									params.newPaymentsReceivedAlerts = [];
									params.newPropertyReceivedAlertsCount = 0;
								}

								callback(null);

                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} - Error occured in  dashboardsto loadData`);
                        });

			  },
              function checkPolymeshRecords(callback) {
                 const stmt = "select count(*) as count from sharetypes where blockchainProtocol = 7 and stoid = ?"
                 mysql.executeSQLStatement(stmt, [req.session.stoid]).then((result) => {
                    params.polymeshTransactionCount = result[0].count;
                    callback(null);
                 }).catch((error) => {
                    common.handleError(req, res, `${error.message}Error occured in  dashboardsto checkPolymeshRecords`);
                 });                 
              },
			  function renderForm() {
                  params.showNewAddressRequestSection = 0;
                  if (params.newChangeRequest > 0 || params.processingChangeRequest > 0)
                      params.showNewAddressRequestSection = 1;

                  var EnablePaymentModule = 0;
                  if( getSTOFromConfig(req.session.stoid).settings.hasOwnProperty('EnablePaymentModule') )
                      EnablePaymentModule = 1;
                 

				  var json = {                    
                        tokenInfo: params.tokenInfo,
                        investorInfo: params.investorInfo,
                        LogsRecords: params.LogsRecords,
                        newPropertyReceivedAlertsCount: params.newPropertyReceivedAlertsCount,
                        newPropertyReceivedAlerts: params.newPropertyReceivedAlerts,
                        partials: common.getPartials(),
                        Data: common.getCommonPageProperties(req),
                        entityCount: params.count,
                        EnablePaymentModule,
                        polymeshTransactionCount: params.polymeshTransactionCount,
                        showNewAddressRequestSection: params.showNewAddressRequestSection,
                        newShareCreateRequest: params.newShareCreateRequest,
                        newChangeRequest: params.newChangeRequest,
                        processingChangeRequest: params.processingChangeRequest,
                        companyType: common.getCompanyType(getSTOFromConfig(req.session.stoid)),
                        shareTypesRecords: params.shareTypesRecords,
                        blockchainRefreshing: global.config.blockchainRefreshingstos.includes(req.session.stoid) ? 1 : 0,
                        newPaymentsReceivedAlerts: params.newPaymentsReceivedAlerts,
                        platformConfiguration: global.config.platformConfiguration == 2 ? false : true
               	  };

                  params = null;
				  res.render('admin/indexsto', json);
                  json = null;
			  },
		  ]);
    },
    showChangeAddressRequests(req, res) {
        const stmt = `select InvestorID, i.FirstName, i.LastName, c.PublicKey from changeaddresserequest c, Investor i where c.InvestorID = i.ID and isActivated = 0 and stoid = ${req.session.stoid} \
        ;\
        select InvestorID, i.FirstName, i.LastName, c.PublicKey, c.Tokens, DATE_FORMAT(ActivatedDate,'%M %d %Y') as Date from changeaddresserequest c, Investor i where c.InvestorID = i.ID and isActivated = 1 and stoid = ${req.session.stoid}`;

        mysql.executeSQLStatement(stmt, [])
        .then((result) => {
            let newAddressRequestsRecords = 0;
            if (result[0].length > 0) newAddressRequestsRecords = 1;

            let oldAddressRequestsRecords = 0;
            if (result[1].length > 0) oldAddressRequestsRecords = 1;

            res.render('admin/changeaddressrequests', {
                newAddressRequestsRecords,
                newAddressRequests: result[0],
                oldAddressRequestsRecords,
                oldAddressRequests: result[1],
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
            });
        })
        .catch((error) => {
            common.handleError(req, res, `${error.message}Error occured in  dashboardsto getLogsDatabaseRecordsAll`);
        });
    },

	newtoken(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 8);

        function getAllShareTypes(callback) {
            const params = {};

            const sql = `select * from sharetypes where stoid = ? \
            ;\
            select t.ID, DATE_FORMAT(t.dattime,'%M %d %Y') as LogDate, s.premimum, s.nominalvalue, s.currencyid, s.title, t.tokens, t.description, u.FirstName, u.LastName from sharetypes s, tokencreationrequests t, users u where s.id = t.sharetypeid and u.id = t.createdbyuserid and s.stoid = ?`;
			mysql.executeSQLStatement(sql, [req.session.stoid, req.session.stoid]).then((result) => {
                params.shareTypes = result[0];
                params.pendingRequest = result[1];

				if(params.shareTypes.length == 0)
					res.redirect("dashboardsto")
				else
					callback(null, params);
			}).catch((error) => {
				common.handleError(req, res, `${error.message} Error occured in  newtoken getAllShareTypes`);
            });

        }
        function getSelectedShareType(params, callback) {
            var stmt = "";
            var data = [];
            if(req.query.id == null) {
                stmt ="select * from sharetypes where stoid = ? limit 1";
                data.push(req.session.stoid);
            }
            else {
                stmt ="select * from sharetypes where id = ? and stoid = ?";
                data.push(req.query.id, req.session.stoid);
            }

			mysql.executeSQLStatement(stmt, data).then((result) => {
                params.shareRec = result[0];
				callback(null, params);
			}).catch((error) => {
				common.handleError(req, res, `${error.message} Error occured in  newtoken getSelectedShareType`);
            });

        }
        function updateBlockchainInfo(params, callback) {
            if(params.shareRec.isblockchain == 1) {
                refreshBlockchain.updateBlockchainCompanyTotalBalances( params.shareRec.blockchainProtocol, params.shareRec.ethereumBlockchainPublicAddress, params.shareRec.ethereumContractAddress, params.shareRec.ID, req.session.stoid).then((data) => {
                    callback(null, params);
                }, (error) => {
                    callback(null, params);
                });
            } else
                callback(null, params);
        }
		function getNewSharesLogsInformationFromDatabase(params, callback) {
			const sql = "SELECT logs.ActivityType, Description, DATE_FORMAT(LogDate,'%M %d %Y %H:%i:%s') as LogDate, users.FirstName as UserFirstName, users.LastName as UserLastName FROM logs LEFT JOIN users ON logs.UserID = users.ID Where (logs.ActivityType = 7 or logs.ActivityType = 10) and logs.stoid=? and logs.recid=? order by logs.ID DESC";

			mysql.executeSQLStatement(sql, [req.session.stoid, params.shareRec.ID]).then((result) => {
				params.SharesLogRecords = result;
				callback(null, params);
			}).catch((error) => {
				common.handleError(req, res, `${error.message} Error occured in  newtoken getNewSharesLogsInformationFromDatabase`);
            });
		}
		async.waterfall([
            getAllShareTypes,
            getSelectedShareType,
            updateBlockchainInfo,
			getNewSharesLogsInformationFromDatabase
		], (err, params) => {

			res.render('admin/generatenewtoken', {
				SharesLogRecords: params.SharesLogRecords,
                tokenInfo: params.tokenInfo,
                pendingRequest: params.pendingRequest,
				Data: common.getCommonPageProperties(req),
				partials: common.getPartials(),
                csrfToken: req.csrfToken(),
                message: req.flash('message'),
                shareTypes: params.shareTypes,
                shareRec: params.shareRec
			});
		});
	},
	generatetoken(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 20);

        const params = {};
        function getDBRecord(callback) {

            if (req.body.nonTokens == null) {
                common.handleError(req, res, 'nonblockchain number of tokens field nonTokens to be created required. this field is empty. Error occured in  generatetoken getDBRecord');
                return;
            }

            if (isNaN(req.body.nonTokens)) {
                common.handleError(req, res, `non blockchain tokens to be created field nonTokens is not numeric ${req.body.nonTokens} Error occured in  generatetoken getDBRecord`);
                return;
            }

            /*if ( req.body.nonTokens % 1 != 0 ) {
                common.handleError(req, res, `tokens field cannot have fractions while creating non-blockchain token ${req.body.tokens} Error occured in  generatetoken getDBRecord`);
                return;
            }*/

            const sql = `select * from sharetypes where id = ${req.body.sid} and stoid = ${req.session.stoid}`;
            mysql.executeSQLStatement(sql, []).then((result) => {
                if(result.length == 0) {
                    common.handleError(req, res, `Share type not found. This should not occur in normal operations. generatetoken getDBRecord`);
                    return;
                } else {
                    params.shareTypeRec = result[0];
                    params.TokensToCreate = parseInt(req.body.nonTokens, 10);
                    callback(null);
                }
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in generatetoken getDBRecord`);
            });

        }
        function createorrecord(callback) {
            if(params.shareTypeRec.needauthorization == 0) {
                if (params.shareTypeRec.isblockchain === 0) {
                    mysql.createNewTokensNonBlockchain(req, params.TokensToCreate, req.body.sid, -1, req.body.txtaddreasons).then((data) => {
                        params.message = "Shares are created";
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in generatetoken createorrecord`);
                    });
                } else {
                    //call to create blockchain shares
                    var keys = {};
                    if(req.body.metaMaskTransaction == "0") {
                        if( common.isEthereumBasedProtocolID(params.shareTypeRec.blockchainProtocol) ) {
                            keys = ethereumApi.decryptKey(JSON.parse(req.body.filecontents), req.body.password);
                            if (keys === 'error') {
                                req.flash('message', "Private key cannot be authenticated");
                                res.redirect('newtoken?id=' + req.body.sid);
                            }
                        } else if(params.shareTypeRec.blockchainProtocol == 3)
                            keys.private = "";
                    }

                    blockchainApi.tokenCreateBurn(1, params.TokensToCreate, keys.private, req.session.stoid, params.shareTypeRec.ID, 0, req.session.user.ID, req.body.metaMaskTransaction, req.body.blockchainTransactionID, req.body.txtaddreasons).then(() => {
                        params.message = "Blockchain call is send. Plese refresh later"
                        callback(null);
                    }, (err) => {
                        common.handleError(req, res, `${err.message} -  Error occured in  createorrecord `);
                    });

                }
            } else {
                //record transaction for approvael
                const sql = `insert into tokencreationrequests(stoid, tokens, sharetypeid, createdbyuserid, dattime, description) values (?, ?, ?, ?, now(), ?)`;
                mysql.executeSQLStatement(sql, [req.session.stoid, params.TokensToCreate, req.body.sid, req.session.user.ID, req.body.txtaddreasons]).then((result) => {
                    params.message = "Share creation request has been created";
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in generatetoken createorrecord`);
                });
            }
        }
        async.waterfall([
            getDBRecord,
            createorrecord
        ], (err) => {
            if (!err) {
                req.flash('message', params.message);
                res.redirect('newtoken?id=' + req.body.sid);
            }
        });
	},
	burntokeninblockchain(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 20);

        function getDBRecord2(callback) {
            if (req.body.nonTokensdel == null) {
                common.handleError(req, res, 'nonblockchain number of tokens field nonTokens to be created required. this field is empty. Error occured in  generatetoken getDBRecord');
                return;
            }

            if (isNaN(req.body.nonTokensdel)) {
                common.handleError(req, res, `non blockchain tokens to be created field nonTokens is not numeric ${req.body.nonTokensdel} Error occured in  generatetoken getDBRecord`);
                return;
            }

            /*if ( req.body.nonTokensdel % 1 != 0 ) {
                common.handleError(req, res, `tokens field cannot have fractions while creating non-blockchain token ${req.body.nonTokensdel} Error occured in  generatetoken getDBRecord`);
                return;
            }*/

            const sql = `select * from sharetypes where id = ${req.body.sid} and stoid = ${req.session.stoid}`;
            mysql.executeSQLStatement(sql, []).then((result) => {
                const params = {};
                if(result.length == 0) {
                    common.handleError(req, res, `- Share type not found. This should not occur in normal operations. burntokeninblockchain getDBRecord2`);
                    return;
                } else {
                    params.shareTypeRec = result[0];
                    params.TokensToRemove = parseInt(req.body.nonTokensdel, 10);
                    callback(null, params);
                }
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in burntokeninblockchain getDBRecord2`);
            });
        }
        function updateNonBlockChain1(params, callback) {
            if (params.shareTypeRec.isblockchain === 0) {
                const tot1 = math.subtract(params.shareTypeRec.totalShares ?? 0, params.TokensToRemove ?? 0) ?? 0;
                const tot2 = math.subtract(params.shareTypeRec.companyShares ?? 0, params.TokensToRemove ?? 0) ?? 0;
                const sql = `update sharetypes set totalShares=?, companyShares=? where id=? and stoid = ${req.session.stoid}`;
                mysql.executeSQLStatement(sql, [tot1, tot2, req.body.sid]).then(() => {
                    callback(null, params);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in burntokeninblockchain updateNonBlockChain1`);
                });
            } else {
                // Blockchain
                callback(null, params);
            }
        }
        function updateNonBlockChain3(params, callback) {
            if (params.shareTypeRec.isblockchain === 0) {
                const tot1 = math.subtract(params.shareTypeRec.companyShares ?? 0, params.TokensToRemove ?? 0) ?? 0;

                var LogDescription = `${params.TokensToRemove} ${params.shareTypeRec.title} removed. ${req.body.txtremovereasons}`;

                const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid, recid) values (?,NOW(),?,?,?,?,?)';
                const sqlparams = [req.session.user.ID, LogDescription, -1, 10, req.session.stoid, params.shareTypeRec.ID];
                mysql.executeSQLStatement(stmt, sqlparams).then(() => {
                    logger.info(`${LogDescription} ShareTypes.ID: ${req.body.sid} STO ID: ${req.session.stoid} User ID: ${req.session.user.ID} Investor ID: -1 Activity Type ID: 10 Rec ID: ${req.body.sid}`);
                    callback(null, params);
                }).catch((error) => {
                    logger.error(`${error.message} - Error occured in burntokeninblockchain updateNonBlockChain3`);
                });
            } else { callback(null, params); }
        }
        function sendBlockchainTransaction2(params, callback) {
            if (params.shareTypeRec.isblockchain === 1) {

                var publicKey = {};
                if(req.body.metaMaskTransaction == "0") {
                    if( common.isEthereumBasedProtocolID(params.shareTypeRec.blockchainProtocol) ) {
                        publicKey = ethereumApi.decryptKey(JSON.parse(req.body.filecontents), req.body.password);
                        if (publicKey === 'error') {
                            req.flash('message', 'Private key cannot be authenticated');
                            res.redirect('newtoken');
                            return;
                        }
                    } else if (params.shareTypeRec.blockchainProtocol == 3)
                        publicKey.private = "";
                }

                if (params.shareTypeRec.companyShares < params.TokensToRemove) {
                    common.handleError(req, res, 'Error occured in burntokeninblockchain sendBlockchainTransaction2  Tokens to remove from blockchain are > what company is holding. This call is not generated by platform as there is a check on interface. Investigate how this call is generated ');
                } else {
                    blockchainApi.tokenCreateBurn(2, params.TokensToRemove, publicKey.private, req.session.stoid, params.shareTypeRec.ID, 0, req.session.user.ID, req.body.metaMaskTransaction ,req.body.blockchainTransactionID, req.body.txtremovereasons ).then(() => {
                        params.message = "Blockchain call is send. Plese refresh later"
                        callback(null, params);
                    }, (err) => {
                        common.handleError(req, res, `${err.message} -  Error occured in  createorrecord `);
                    });
				}

            } else { callback(null, params); }
        }
        async.waterfall([
            getDBRecord2,
            updateNonBlockChain1,
            updateNonBlockChain3,
            sendBlockchainTransaction2,
        ], (err, params) => {
            if (params.shareTypeRec.isblockchain == 0)
                req.flash("message", "Shares are removed from company balance");
            else
                req.flash("message", "Transaction has been send to blockchain for execution");

            if (!err) res.redirect('newtoken?id=' + req.body.sid);
        });

	},
    approveshares(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 18);

        var params = {};

        function getInvestorPageData(callback) {
			  const sql = `select t.ID, DATE_FORMAT(t.dattime,'%M %d %Y') as LogDate, s.title, s.isblockchain, t.tokens, t.description, u.FirstName, u.LastName from sharetypes s, tokencreationrequests t, users u where s.id = t.sharetypeid and u.id = t.createdbyuserid and s.stoid = ${req.session.stoid} and t.ID = ?`;
			  mysql.executeSQLStatement(sql, [req.query.id])
			  .then((result) => {
                  params.rec = result[0];
				  callback(null);
			  })
			  .catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in tradingnewpost`);
			  });
        }
		  async.waterfall([
            getInvestorPageData
		  ], (err) => {
              if (!err) {
                    res.render('admin/approveshares', {
                        Record: params.rec,
                        Data: common.getCommonPageProperties(req),
                        partials: common.getPartials(),
                        csrfToken: req.csrfToken(),
                    });
              }
		  });

    },
    approveShareCreation(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 18);
        var params = {};

        function getInvestorPageData(callback) {
              const sql = `select * from tokencreationrequests where id = ? and stoid = ${req.session.stoid}`;
              mysql.executeSQLStatement(sql, [req.body.id])
              .then((result) => {
                  params.rec = result[0];
                  callback(null);
              })
              .catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in approveShareCreation getInvestorPageData`);
              });
        }
        function getShareType(callback) {
            const sql = `SELECT * FROM sharetypes where id = ? and stoid = ?`;
              mysql.executeSQLStatement(sql, [params.rec.sharetypeid, req.session.stoid]).then((result) => {
                  if(result.length == 0) {
                      common.handleError(req, res, ` Admin ${req.session.user.ID} is trying to manipulate share type id ${req.body.id} that does not belong to his STO `);
                      return;
                  } else {
					  params.shareTypeRec = result[0];
					  callback(null);
				  }
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in approveShareCreation getShareType`);
              });
        }
        function approveandcreateshares(callback) {
            if(req.body.op == "1") {
                if(params.shareTypeRec.isblockchain == 1) {

                    const keys = ethereumApi.decryptKey(JSON.parse(req.body.filecontents), req.body.password);

                    if (keys === 'error') {
                             params.message = "Password is not correct";
                             callback(null);

                    } else {
                        blockchainApi.tokenCreateBurn(1, params.rec.tokens, keys.private, req.session.stoid, params.shareTypeRec.ID, params.rec.ID, "" ).then(() => {
                            //ethereumApi.createNewToken(params.shareTypeRec.blockchainProtocol,  keys.public, params.rec.tokens, keys.private, params.shareTypeRec.ethereumContractAddress, [], req.session.stoid, params.shareTypeRec.ID, params.rec.ID ).then(() => {
                            params.message = "Blockchain request to token creation has been send. Transaction is executing";
                            callback(null);
                        }, (err) => {
                            common.handleError(req, res, `${err.message} -  Error occured in  approveShareCreation approveandcreateshares - trying to burn token `);
                        });
                    }

                } else {

                        mysql.createNewTokensNonBlockchain(req, params.rec.tokens, params.rec.sharetypeid, params.rec.createdbyuserid, params.rec.description).then((data) => {
                            params.message = "Shares are created";
                            callback(null);
                        }).catch((error) => {
                            logger.error(`${error.message} - Error occured in approveShareCreation approveandcreateshares`);
                        });

                }
            } else {
                params.message = "Shares creation request has been denied";
                callback(null);
            }
        }
        function deleteReques(callback) {

                      const sql = `delete from tokencreationrequests where id = ? and stoid = ${req.session.stoid}`;
                      mysql.executeSQLStatement(sql, [req.body.id])
                      .then((result) => {
                          if(req.body.op == "0") {
                                var LogDescription = "Request for share creation rejected. " + params.rec.tokens + "  shares were requested to be created with reason - " + params.rec.description + ", and the reason for rejection is - " + req.body.desc;

                                const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid, recid) values (?,NOW(),?,?,?,?,?)';
                                const sqlparams = [req.session.user.ID, LogDescription, -1, 10, req.session.stoid, params.rec.sharetypeid];
                                mysql.executeSQLStatement(stmt, sqlparams).then(() => {
                                    callback(null);
                                }).catch((error) => {
                                    logger.error(`${error.message} - Error occured in approveShareCreation deleteReques`);
                                });

                          } else
                              callback(null);
                      })
                      .catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in approveShareCreation deleteReques`);
                      });


        }
        async.waterfall([
            getInvestorPageData,
            getShareType,
            approveandcreateshares,
            deleteReques
		  ], (err) => {
              if (!err) {

                    common.removeRedisKey(req, "dashboard").then(() => {
                        req.flash("message", params.message);
                        res.redirect("newtoken?id=" + params.rec.sharetypeid);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.message} - Error occured in  dashboardsto loadData`);
                    });

              }
        });

    },
    refreshBlockchainBalances(req, res) {
   const params = {};

        logger.info("User Triggered - Blockchain refresh started for STO - " + req.session.stoid);
        refreshBlockchain.refreshTokensFromBlockahin(req.session.stoid).then(() => {
                logger.info("User Triggered - Blockchain Refresh done for STO - " + req.session.stoid);
        }).catch((error) => {
                logger.error(`${error.message} - Error occured in  refreshBlockchainBalances`);
        });

        res.redirect("dashboardsto");
    },

	/*refreshDistributionAccountTokens(req, res) {
		function getTokenNameFromParametersTable2(callback) {
              mysql.getAppParameterRecords("'Token'", req.session.stoid)
              .then((result) => {
                  const params = { token: common.getAppParameterFromDataSet(result, 'Token').ValueString };

                  callback(null, params);
              })
              .catch((error) => {
                  common.handleError(req, res, `${error.message}Error occured in  refreshDistributionAccountTokens getTokenNameFromParametersTable2`);
              });
		}
		function getDistributionAccountInfoFromBlockchain(params, callback) {
            ethereumApi.getAccountBalance(req.query.publicKey, req.session.ethereumContractAddress, req.session.ethereumWhitelistAddress, req.session.stoid)
				.then((data) => {
				    params.distributionAccountBalance = parseInt(data, 10);
					callback(null, params);
				}, (err) => {
					common.handleError(req, res, `${err.message} - Error occured in  refreshDistributionAccountTokens getDistributionAccountInfoFromBlockchain`);
				});
		}
		function updateInvestorRecord(params, callback) {
			const stmt = `update app_parameters set ValueInt = ? where Param = 'Distribution' and stoid = ${req.session.stoid}`;
			mysql.executeSQLStatement(stmt, [params.distributionAccountBalance])
				.then(() => {
					callback(null);
				})
				.catch((error) => {
					common.handleError(req, res, `${error.message} Error occured in  updateInvestorRecord updateInvestorRecord`);
				});
		}
		async.waterfall([
			getTokenNameFromParametersTable2,
			getDistributionAccountInfoFromBlockchain,
			updateInvestorRecord,
		], (err) => {
            if (!err) res.redirect('dashboard');
        });
	},

	activitylog(req, res) {
		  common.checkUserAuthorizationForModuleSTO(req, res, 7);
          req.session.stoid = -1;      //reset selected sto
		  async.waterfall([
			  function getDBData1(callback) {
				  const params = {};
				  const data = [];

				  let sql = '  FROM logs LEFT JOIN investor ON investor.ID = logs.InvestorID LEFT JOIN users ON logs.UserID = users.ID left join stos on logs.stoid = stos.id ';

				  let criteriaWhere = ` where logs.id > 0 `;
				  if (req.query.fromDate != null) {
					  criteriaWhere += ' and LogDate >= ?';
					  data.push(req.query.fromDate);
				  }

				  if (req.query.toDate != null) {
					  criteriaWhere += ' and LogDate <= ?';
					  data.push(req.query.toDate);
				  }

				  if (req.query.activityType != null) {
					  criteriaWhere += ' and activityType = ?';
					  data.push(req.query.activityType);
				  }

				  sql = `${sql + criteriaWhere} Order by logs.ID DESC`;

				  mysql.executeSQLStatement(`Select count(*) as count ${sql}`, data)
				  .then((result) => {
					  params.recordCount = result[0].count;

					  if (req.query.page == null) { sql = `${sql} LIMIT 0,${global.config.RecordsPerPaging}`; } else { sql = `${sql} LIMIT ${req.query.page * global.config.RecordsPerPaging},${global.config.RecordsPerPaging}`; }

					  sql = `Select Description, DATE_FORMAT(LogDate,'%M %d %Y %H:%i:%s') as LogDate, users.ID, users.FirstName as UserFirstName, users.LastName as UserLastName, users.Username, investor.FirstName as InvestorFirstName, investor.LastName as InvestorLastName, stos.logo ${sql}`;



					  mysql.executeSQLStatement(sql, data)
					  .then((result2) => {
						  params.logRecords = result2;
						  callback(null, params);
					  })
					  .catch((error) => {
						  common.handleError(req, res, `${error.message}Error occured in  activitylog getLogsDatabaseRecordsAll`);
					  });
				  })
				  .catch((error) => {
					  logger.error(`Error occured in  activitylog getLogsDatabaseRecordsAll - ${error.message}`);
				  });
              },
              function renderPage(params) {
				res.render('admin/activitylog', {
					DataRows: params.logRecords,
					RecordCount: params.recordCount,
					RecordsPerPaging: global.config.RecordsPerPaging,
					Data: common.getCommonPageProperties(req),
					partials: common.getPartials(),
				});
		  	  },
		  ]);
	},*/
	activitylogsto(req, res) {

		  async.waterfall([
			  function getDBData1(callback) {
				  const params = {};
				  const data = [];

				  let sql = ' FROM logs LEFT JOIN investor ON investor.ID = logs.InvestorID LEFT JOIN users ON logs.UserID = users.ID ';

				  let criteriaWhere = ` where logs.stoid = ${req.session.stoid} `;
				  if (req.query.fromDate != null) {
					  criteriaWhere += ' and LogDate >= ?';
					  data.push(req.query.fromDate);
				  }

				  if (req.query.toDate != null) {
					  criteriaWhere += ' and LogDate <= ?';
					  data.push(req.query.toDate);
				  }

				  if (req.query.activityType != null) {
					  criteriaWhere += ' and activityType = ?';
					  data.push(req.query.activityType);
				  }

				  sql = `${sql + criteriaWhere} Order by logs.ID DESC`;

				  mysql.executeSQLStatement(`Select count(*) as count ${sql}`, data)
				  .then((result) => {
					  params.recordCount = result[0].count;

					  if (req.query.page == null) { sql = `${sql} LIMIT 0,${global.config.RecordsPerPaging}`; } else { sql = `${sql} LIMIT ${req.query.page * global.config.RecordsPerPaging},${global.config.RecordsPerPaging}`; }

					  sql = `Select Description, DATE_FORMAT(LogDate,'%M %d %Y %H:%i:%s') as LogDate, users.ID, users.FirstName as UserFirstName, users.LastName as UserLastName, users.Username, investor.FirstName as InvestorFirstName, investor.LastName as InvestorLastName ${sql}`;

					  mysql.executeSQLStatement(sql, data)
					  .then((result2) => {
						  params.logRecords = result2;
						  callback(null, params);
					  })
					  .catch((error) => {
						  common.handleError(req, res, `${error.message}Error occured in  activitylogsto`);
					  });
				  })
				  .catch((error) => {
					  logger.error(`Error occured in  activitylogsto - ${error.message}`);
				  });
              },
              function renderPage(params) {
				res.render('admin/activitylogsto', {
					DataRows: params.logRecords,
					RecordCount: params.recordCount,
					RecordsPerPaging: global.config.RecordsPerPaging,
					Data: common.getCommonPageProperties(req),
					partials: common.getPartials(),
				});
		  	  },
		  ]);
	},

	settings(req, res) {
	  	const params = {}

		  function getDatabaseInformation(callback) {
            const sql = `select * from stos where id = ? \
            ;\
            select twofactorenable from users where id = ?
            `;
            mysql.executeSQLStatement(sql, [getSTOFromConfig(req.session.stoid).stoid, req.session.user.ID]).then((result) => {
                params.rec = result[0][0];
                params.twofactorenable =  result[1][0].twofactorenable;
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in settings getDatabaseInformation`);
            });
		  }
		  async.waterfall([
			getDatabaseInformation
		  ], function (err) {
                var tempDisclaimer = 1;
                if( getSTOFromConfig(req.session.stoid).settings.hasOwnProperty('disclaimer') )
                    tempDisclaimer = 0;

                var tempRegistration = 1;
                if( getSTOFromConfig(req.session.stoid).settings.hasOwnProperty('Registration') )
                    tempRegistration = 0;

                var tempRegistrationBanner = 1;
                if( getSTOFromConfig(req.session.stoid).settings.hasOwnProperty('RegistrationBanner') )
                    tempRegistrationBanner = 0;

                res.render('admin/settings', {
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                    csrfToken: req.csrfToken(),
                    disclaimer: params.rec.disclamer,
                    emailFooter: params.rec.emailFooter,
                    registrationtext: params.rec.registrationtext,
                    logo: getSTOFromConfig(req.session.stoid).logo,
                    banner: getSTOFromConfig(req.session.stoid).logo,
                    Disclaimer: tempDisclaimer,
                    Registration: tempRegistration,
                    RegistrationBanner: tempRegistrationBanner,
                    tellafriend: params.rec.tellafriendtext,
                    twofactorenable: params.twofactorenable,
                    message: parseInt(req.flash('message'))
                });
		  });
	},
    updateDisclaimer(req, res) {
        mysql.updateDisclaimer(req, req.session.stoid).then((result) => {
            res.redirect('settings');
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in index updateDisclaimer`);
        });
    },
    updateEmailFooter(req, res) {
        mysql.updateEmailFooter(req, req.hostname).then((result) => {
            res.redirect('settings');
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in index  updateEmailFooter`);
        });
    },
    updateRegistrationText(req, res) {
        mysql.updateRegistrationText(req, req.session.stoid).then((result) => {
            res.redirect('settings');
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in index  updateRegistrationText`);
        });
    },
    changelogosite(req, res) {
        mysql.updateFileInLocation(req, `../../public/img/stologo/${getSTOFromConfig(req.session.stoid).logo}`).then(() => {
            res.redirect("settings");
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in changelogosite`);
        });
    },
    changebannersite(req, res) {
        mysql.updateFileInLocation(req, `../../public/img/stobanners/${getSTOFromConfig(req.session.stoid).logo}`).then(() => {
            res.redirect("settings");
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in changelogosite`);
        });
    },
    changetellafriend(req, res) {
        mysql.updateTellAFriend(req, req.session.stoid).then((result) => {
            res.redirect("settings");
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in changetellafriend`);
        });
    },

	voting(req, res) {

        var listType = "-1";
        if(req.query.type != null)
            listType = req.query.type;
        else {
            listType = "1";
        }

        //meeting 1    14
        //internal poll 0  27
        //public poll 2  28

        if(listType == "0" && (! common.isUserAuthenticatedForModule(req, 27) ) ) {   //if internal polls are allowed ?
            if(common.isUserAuthenticatedForModule(req, 14) )   //if meetings allowed then ?
                listType = "1"
            else if(common.isUserAuthenticatedForModule(req, 28) )   //public polls allowed
                listType = "2"
            else
                listType = "-1"
        } else {
            if(listType == "1" && (! common.isUserAuthenticatedForModule(req, 14) )) {  //if meetings allowed then ?
                 if( common.isUserAuthenticatedForModule(req, 28) )   //public polls allowed
                    listType = "2"
                else
                    listType = "-1"
            } else {
                if(listType == "2" && (! common.isUserAuthenticatedForModule(req, 28) ))  //if public polls allowed
                    listType = "-1"
            }
        }

        if( listType == "-1" ) {
            res.redirect("dashboardsto");
        }
        const params = {};

        mysql.executeSQLStatement(`select id,title,votingPower from sharetypes where stoid=?`,req.session.stoid)
        .then((results) => {
            params.shareTypes = results;
        })
        .then(() => {

           const sql = `select voting.id, voting.title, DATE_FORMAT(opendate,'%M %d %Y') as opendate, DATE_FORMAT(closedate,'%M %d %Y') as closedate, opendate as DBOpenDate, closedate as DBCloseDate, DATE_FORMAT(date_add(opendate, interval voting.timepadding minute), '%H:%i') as starttime, DATE_FORMAT(date_add(closedate, interval voting.timepadding minute), '%H:%i') as endtime, place, votetype, timezone from voting, timezone where voting.timezoneid = timezone.id and stoid= ${req.session.stoid} and type = ? order by opendate desc limit 200`;

		  mysql.executeSQLStatement(sql, [listType]).then((result) => {
                const curTime = new Date();
                var tempHour = 0;

                result.forEach(function(rec) {
                    if(rec.opendate != null) {
                        rec.open = common.checkTimePeriod(rec.DBOpenDate, rec.DBCloseDate);
                    } else
                        rec.open = 100;       //meeting is still in future
                });

                res.render('admin/voting/voting', {
                    csrfToken: req.csrfToken(),
                    records: result,
                    shareTypes: params.shareTypes,
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                    listType: parseInt(listType)
                });
		  }).catch((error) => {
			  common.handleError(req, res, `${error.message} Error occured in voting`);
		  });

        });
	},
    votingdetails(req, res) {
        var params = {};
        common.checkUserAuthorizationForModuleSTO(req, res, 27);

         function getVotingDetails(callback) {
              mysql.getVotingDetails(req.query.id, req.session.stoid, common.getSTOUnRegisteredInvestorTypeIDsinCommaDelimitedText(req))
              .then((result) => {
                  params = result;
                  callback(null);
              }).catch((error) => {
                  logger.error(`Error occured in  votingdetails getVotingDetails - ${error.message}`);
              });
         }
		  async.waterfall([
			getVotingDetails,
		  ], (err) => {
            res.render('admin/voting/votingdetails', {
                id: req.query.id,
                TotalInvestorsInSTO: params.TotalInvestorsInSTO,
                VotesCasted: params.VotesCasted,
                Record: params.Record,
                totalShares: params.totalTokens,
                totalInvestment: params.totalInvestment,
                inhandShares: params.inhandTokens,
                inhandInvestment: params.inhandInvestment,
                expectedshares: params.expectedshares,
                expectedinvestment: params.expectedinvestment,
                OptionRecord: params.OptionRecord,
                SharesRecord: params.SharesRecord,
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
            });
		  });
    },
	votingedit(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 27);
        var params = {};

        if(req.query.id != null) {

            function getDatabaseInformation(callback) {
                  const sql = `select id, title, DATE_FORMAT(opendate,'%M %d %Y') as opendate, opendate as votingOpenDate, DATE_FORMAT(closedate,'%M %d %Y') as closedate, contents, votetype from voting where id = ? and stoid =  ${req.session.stoid}`;
                  mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                        if(result.length == 0)
                            common.handleError(req, res, `Voting id does not belong to STO. please check why this happen votingedit getDatabaseInformation`);
                        else {
                                params.Record = result[0];
                                params.open = common.checkTimePeriod(result[0].opendate, result[0].closedate);
                                callback(null);
                        }
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in votingedit getDatabaseInformation`);
                  });
              }
            function getOption(callback) {
                  const sql = `SELECT optiontxt FROM votingoptions where votingid = ?`;
                  mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                      params.OptionRecord = result;
                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in votingedit getOption`);
                  });
            }
              async.waterfall([
                getDatabaseInformation,
                getOption
              ], (err) => {
                  res.render('admin/voting/votingedit', {
                      open: params.open,
                      id: req.query.id,
                      OptionRecord: params.OptionRecord,
                      Record: params.Record,
                      isEditing: 1,
                      companytype: getSTOFromConfig(req.session.stoid).companytype,
                      csrfToken: req.csrfToken(),
                      Data: common.getCommonPageProperties(req),
                      partials: common.getPartials(),
                  });
              });

        } else {
                  res.render('admin/voting/votingedit', {
                      open: 1,    //needed on the client side to options are collected    1=voting in future and record can be edited
                      isEditing: 0,
                      csrfToken: req.csrfToken(),
                      Data: common.getCommonPageProperties(req),
                      partials: common.getPartials(),
                      companytype: getSTOFromConfig(req.session.stoid).companytype
                  });
        }

	},

    meetingedit(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
        var params = {};

         function getMeetingDetails(callback) {
            if(req.query.id != null) {
                const sql = `select voting.id, voting.title, DATE_FORMAT(opendate,'%M %d %Y') as opendate,  date_add(opendate, interval voting.timepadding minute) as DBOpenDate, DATE_FORMAT(closedate,'%M %d %Y') as closedate,  date_add(closedate, interval voting.timepadding minute) as DBCloseDate, DATE_FORMAT(date_add(opendate, interval voting.timepadding minute), '%H:%i') as starttime, DATE_FORMAT(date_add(closedate, interval voting.timepadding minute), '%H:%i') as closetime,  opendate as DBOpenUncangedDate, closedate as DBUnchangeDate, place, contents, nameResponsiblePerson, phoneResponsiblePerson, emailResponsiblePerson, nameProxyPerson, phoneProxyPerson, emailProxyPerson, timezone.timezone as timezone, timezone.title as timezonetitle from voting, timezone where voting.timezoneid = timezone.id and stoid= ${req.session.stoid} and voting.id = ?`;


                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    if(result.length === 0) {
                        common.handleError(req, res, `No voting record existing for this ID(${req.query.id}) for STO (${req.session.stoid}) somebody try to access a wrong id  User id is (${req.session.user.ID}) - Error occured in meetingEditPost saveCampaign`);
                        return;
                    } else {
                        params.id = req.query.id;
                        params.record = result[0];
                        params.isEditing = 1;
                        callback(null);
                    }
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in meetingedit getMeetingDetails`);
                });
            } else {
                params.record = [];
                params.id = 0;
                params.isEditing = 0;
                callback(null);
            }
         }
         function getMeetingAgendaItems(callback) {
            if(req.query.id != null) {
                const sql = `select * from votingoptions where votingid=? order by id \
                ;\
                select * from timezone where id != 0`;
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.agendaitems = result[0];
                    params.timezones = result[1];
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in meetingedit getMeetingAgendaItems`);
                });
            } else
                callback(null);
         }
         function meetingTimeFrame(callback) {
             if( params.record.opendate != null ) {
                params.isMeetingScheduled = common.checkTimePeriod(params.record.DBOpenUncangedDate, params.record.DBUnchangeDate);

                if(params.isMeetingScheduled == 1)
                     params.showDeleteButton = 1;
                 else
                     params.showDeleteButton = 0;

             } else {
                 params.isMeetingScheduled = 0;
                 params.showDeleteButton = 1;
             }

             callback(null);
         }
          async.waterfall([
			getMeetingDetails,
            getMeetingAgendaItems,
            meetingTimeFrame
		  ], (err) => {
            res.render('admin/voting/meetingedit', {
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
                isEditing: params.isEditing,
                id: params.id,
                Record: params.record,
                timezones: params.timezones,
                csrfToken: req.csrfToken(),
                agendaitems: params.agendaitems,
                isMeetingScheduled: params.isMeetingScheduled,
                currentCloseDateTime: params.record.DBUnchangeDate,
                showDeleteButton: params.showDeleteButton
            });
		  });

    },
    meetingEditPost(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
        var params = {};

		  function checkValues(callback) {
              //TODO check values
              callback(null);
          }
          function saveCampaign(callback) {
              if (req.body.isEditing === '0') {
                    const sql = `insert into voting (stoid, title, place, contents, type, nameResponsiblePerson, phoneResponsiblePerson, emailResponsiblePerson, nameProxyPerson, phoneProxyPerson, emailProxyPerson, secretaccesscode ) values(?,?,?,?,1,?,?,?,?,?,?,?)`;
                    mysql.executeSQLStatement(sql, [req.session.stoid, req.body.title, req.body.place, req.body.details, req.body.nameResponsiblePerson, req.body.phoneResponsiblePerson, req.body.emailResponsiblePerson, req.body.nameProxyPerson, req.body.phoneProxyPerson, req.body.emailProxyPerson, ""]).then((result) => {
                        params.id = result.insertId;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in meetingEditPost saveCampaign`);
                    });

              } else {
                    const sql = `update voting set title=?, place=?, contents=?, nameResponsiblePerson=?, phoneResponsiblePerson=?, emailResponsiblePerson=?, nameProxyPerson=?, phoneProxyPerson=?, emailProxyPerson=? where id=? and stoid = ${req.session.stoid}`;
                    mysql.executeSQLStatement(sql, [req.body.title, req.body.place, req.body.details, req.body.nameResponsiblePerson, req.body.phoneResponsiblePerson, req.body.emailResponsiblePerson, req.body.nameProxyPerson, req.body.phoneProxyPerson, req.body.emailProxyPerson, req.body.id]).then((result) => {
                        params.id = req.body.id;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in meetingEditPost saveCampaign`);
                    });
              }
          }
		  async.waterfall([
			checkValues,
            saveCampaign
		  ], (err) => {
              res.redirect("meetingedit?id=" + params.id);
		  });
    },
    agendaitem(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
	  	  const params = {}

		  function getDatabaseInformation(callback) {
                params.meetingid = req.query.meetingid;

                if(req.query.id != null) {
                    const sql = 'select * from votingoptions where id = ?';
                    mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                        params.Record = result[0];
                        params.id = req.query.id;
                        params.isEditing = 1;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in agendaitem getDatabaseInformation`);
                    });
                } else {
                    params.Record = [];
                    params.isEditing = 0;
                    params.id = 0;
                    callback(null);
                }
		  }
          function getDocumentsList(callback) {
                if(req.query.id != null) {
                    const sql = 'select * from votingdocuments where votingoptionid = ?';
                    mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                        params.documentsRecord = result;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in agendaitem getDocumentsList`);
                    });
                } else
                    callback(null);
          }
          function checkItemBelongsToMeetingSTOID(callback) {
              if(req.query.id != null) {
                    const sql = 'select stoid from voting where id = ? and stoid = ?';
                    mysql.executeSQLStatement(sql, [params.Record.votingid, req.session.stoid]).then((result) => {
                        if(result.length > 0)
                            callback(null);
                        else
                            common.handleError(req, res, `Error occured in agendaitem getDocumentsList. THis option ID does not belong to any company voting. user changed voting id in URL`);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in agendaitem checkItemBelongsToMeetingSTOID`);
                    });
              } else
                  callback(null);
          }
		  async.waterfall([
			getDatabaseInformation,
            getDocumentsList,
            checkItemBelongsToMeetingSTOID
		  ], function (err) {
                res.render('admin/voting/agendaitem', {
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                    csrfToken: req.csrfToken(),
                    id: params.id,
                    meetingid: params.meetingid,
                    isEditing: params.isEditing,
                    Record: params.Record,
                    documentsRecord: params.documentsRecord
                });
		  });
    },
    meetingView(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
        const paramsData = {};

        function getMeetingData(callback) {
            mysql.getMeetingData(req.query.id, req.hostname).then((meetingData) => {
                paramsData.meetingData = meetingData;
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in meetingView`);
            });
        }
        function gettatistics(callback) {     // this piece of coding only needed in admin view to calculate summary of totals
            const stmt = `select votingoptionsid, count(*) as investorCount, sum(votesContributed) as totalVotesContributed, sum(nominalInvestmentContributed) as totalNominalInvestment from votinguser where votingid = ? group by votingoptionsid;`

			mysql.executeSQLStatement(stmt, [req.query.id]).then((result) => {

                paramsData.totalInvestors = paramsData.meetingData.MeetingRecord.totalInvestors;
                paramsData.totalShares = paramsData.meetingData.MeetingRecord.totalShares;
                paramsData.totalNominalShares = paramsData.meetingData.MeetingRecord.totalNominalShares;

                paramsData.totals = {};
                result.forEach((obj) => {
                    paramsData.totals[obj.votingoptionsid] = {
                        "totalInvestors": obj.investorCount,
                        "totalShares": obj.totalVotesContributed,
                        "totalNominalShares": obj.totalNominalInvestment,

                        "totalInvestorsPercentage": math.multiply(math.divide(obj.investorCount ?? 0, paramsData.totalInvestors ?? 0) ?? 0, 100).toFixed(2).toString(),
                        "totalSharesPercentage": math.multiply(math.divide(obj.totalVotesContributed ?? 0, paramsData.totalShares ?? 0 ) ?? 0, 100).toFixed(2).toString() ,
                        "totalNominalSharesPercentage": math.multiply(math.divide(obj.totalNominalInvestment ?? 0, paramsData.totalNominalShares ?? 0), 100).toFixed(2).toString(),
                    }
                })
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in meetingView gettatistics`);
            });
        }
        function getVotingData(callback) {
              const sql = `SELECT votingoptionsid, votingoptionsvalue, sum(votescontributed) as sum, sum(nominalInvestmentContributed) as sumNominalInvestment, count(*) as count FROM votinguser v, investorsto vs  where vs.investorid = v.userid and vs.stoid = ${req.session.stoid} and v.votingid = ? group by votingoptionsid, votingoptionsvalue \
              ;\
              select count(*) as InPersonMeetingAttend from votinguserdata where votingid = ? and attendMeeting = 1 \
              ;\
              select count(*) as votingOnline from votinguserdata where votingid = ? and attendMeeting = 2 \ 
              ;\
              select count(*) as BODfavor from votinguserdata where votingid = ? and unannounceDecision = 1 \ 
              ;\
              select count(*) as proxyfavor from votinguserdata where votingid = ? and unannounceDecision = 2 \ 
              ;\
              select count(*) as proposerfavor from votinguserdata where votingid = ? and unannounceDecision = 3 \ 
              ;\
              select count(*) as rejectfavor from votinguserdata where votingid = ? and unannounceDecision = 4 \
              ;\
              select count(*) as absentfavor from votinguserdata where votingid = ? and unannounceDecision = 5 \
              ;\
              select count(*) as InPersonMeetingAttendOnline from votinguserdata where votingid = ? and attendMeeting = 3 \
              ;\
              select count(*) as deregisterCount from votinguserdata where votingid = ? and attendMeeting = 4 \
              ;`;
              mysql.executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id]).then((result) => {
                  paramsData.votingData = result[0];
                  paramsData.stats = {};
                  paramsData.stats.InPersonMeetingAttend = result[1][0].InPersonMeetingAttend;
                  paramsData.stats.votingOnline = result[2][0].votingOnline;
                  paramsData.stats.InPersonMeetingAttendOnline = result[8][0].InPersonMeetingAttendOnline;
                  paramsData.stats.BODfavor = result[3][0].BODfavor;
                  paramsData.stats.proxyfavor = result[4][0].proxyfavor;
                  paramsData.stats.proposerfavor =result[5][0].proposerfavor;
                  paramsData.stats.rejectfavor = result[6][0].rejectfavor;
                  paramsData.stats.absentfavor = result[7][0].absentfavor;
                  paramsData.stats.deregisterCount = result[9][0].deregisterCount;
                  callback(null);
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in meetingView getVotingData`);
              });
        }
        async.waterfall([
            getMeetingData,
            gettatistics,
            getVotingData
        ], (err) => {
                for (let i = 0; i < paramsData.votingData.length; i++) {
                    paramsData.votingData[i].PercentInvestorCount = math.multiply(
                        math.divide(paramsData.votingData[i].count ?? 0, paramsData.totals[paramsData.votingData[i].votingoptionsid].totalInvestors ?? 0) ?? 0,
                        100
                        ).toFixed(2).toString();

                    paramsData.votingData[i].PercentShares = math.multiply(
                        math.divide(paramsData.votingData[i].sum ?? 0, paramsData.totals[paramsData.votingData[i].votingoptionsid].totalShares ?? 0) ?? 0,
                        100
                        ).toFixed(2).toString();

                    paramsData.votingData[i].PercentNominalInvestment = math.multiply(
                        math.divide(paramsData.votingData[i].sumNominalInvestment ?? 0, paramsData.totals[paramsData.votingData[i].votingoptionsid].totalNominalShares ?? 0) ?? 0,
                        100
                        ).toFixed(2).toString();
                }
                //calculate meeting option levels calculations

                var template = "";
                if(req.query.type == null)
                    template = "meetingview";
                if(req.query.type == "1")
                    template = "votingprint";
                if(req.query.type == "2")
                    template = "votingresultsprint";

                res.render(`admin/voting/${template}`, {
                    callFromAdmin: 1,
                    AgendaItemsTotals: paramsData.totals,
                    totalInvestors: paramsData.totalInvestors,
                    totalShares: paramsData.totalShares,
                    totalNominalShares: paramsData.totalNominalShares,
                    id: req.query.id,
                    MeetingRecord: paramsData.meetingData.MeetingRecord,
                    AgendaItems: paramsData.meetingData.AgendaItems,
                    votingData: paramsData.votingData,
                    stats: paramsData.stats,
                    message: req.flash('message'),
                    Data: common.getCommonPageProperties(req),
                    companytype: getSTOFromConfig(req.session.stoid).companytype,
                    csrfToken: req.csrfToken(),
                    partials: common.getPartials()
                });
        });
    },
    meetingAgendaItemComments(req, res) {
          common.checkUserAuthorizationForModuleSTO(req, res, 14);

          const sql = `update votingoptions set CompanyComments = ? where id = ? and votingid = ?`;
          mysql.executeSQLStatement(sql, [req.body.comment, req.body.agendaID, req.body.id]).then((result) => {
              res.redirect("meetingView?id=" + req.body.id);
          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in meetingAgendaItemComments`);
          });
    },
    deleteAgendaItem(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
        var params = {};

          function checkItemBelongsToMeetingSTOID(callback) {
                const sql = 'select stoid from voting where id = ? and stoid = ?';
                mysql.executeSQLStatement(sql, [req.query.vid, req.session.stoid]).then((result) => {
                    if(result.length > 0)
                        callback(null);
                    else {
                        common.handleError(req, res, `Error occured in deleteAgendaItem checkItemBelongsToMeetingSTOID. THis option ID does not belong to any company voting. user changed id in URL`);
                        return;
                    }
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in deleteAgendaItem checkItemBelongsToMeetingSTOID`);
                });
          }
          function deleteItem(callback) {
            const sql = `delete from votingoptions where id = ? and votingid = ?; delete from votinguser where votingoptionsid = ? and votingid = ?; delete from votingdocuments where votingoptionid = ? and votingid = ?; delete from votinguser where votingoptionsid = ? and votingid = ?`;
            mysql.executeSQLStatement(sql, [req.query.id, req.query.vid, req.query.id, req.query.vid, req.query.id, req.query.vid, req.query.id, req.query.vid]).then((result) => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in meetingEditPost saveCampaign`);
            });
          }
		  async.waterfall([
			checkItemBelongsToMeetingSTOID,
            deleteItem
		  ], (err) => {
              res.redirect("meetingedit?id=" + req.query.vid);
		  });
    },
    activateAgendaItem(req, res) {
          common.checkUserAuthorizationForModuleSTO(req, res, 14);
          var params = {};

          function checkItemBelongsToMeetingSTOID(callback) {
                const sql = 'select stoid from voting where id = ? and stoid = ?';
                mysql.executeSQLStatement(sql, [req.query.vid, req.session.stoid]).then((result) => {
                    if(result.length > 0)
                        callback(null);
                    else
                        common.handleError(req, res, `Error occured in activateAgendaItem checkItemBelongsToMeetingSTOID. THis option ID does not belong to any company voting. user changed voting id in URL`);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in activateAgendaItem checkItemBelongsToMeetingSTOID`);
                });
          }
          function activatItem(callback) {
                const sql = `update votingoptions set isActiveByAdmin = ? where id = ? and votingid = ?`;
                mysql.executeSQLStatement(sql, [req.query.status, req.query.id, req.query.vid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in meetingEditPost saveCampaign`);
                });
          }
          function setDefaultValues(callback) {
              mysql.setVotingDataAfterMeetingIsOverPerOption(req.hostname, req.query.vid , req.query.id).then(() => {
                  callback(null);
              }).catch((error) => {
                  common.handleError(req, res, `${error.toString()} - Error occured in activateAgendaItem setDefaultValues`);
              });
          }
          function overallstatistics(callback) {
                const stmt = `select count(*) as count from investor i, investorsto t where t.stoid = ${getSTOFromConfig(req.session.stoid).stoid} and i.id = t.investorid and t.iskyc=1 \
                ;\
                select sum(s.shares * p.votingPower) as TotalShares, sum(s.shares * p.nominalValue) as totalNominalShares from shares s, sharetypes p where s.shareTypeid = p.id and p.stoid = ${getSTOFromConfig(req.session.stoid).stoid} and p.isVotingRightsApplicable = 1`;

                mysql.executeSQLStatement(stmt, []).then((result) => {

                    const stmt = `update voting set totalInvestors = ?, totalShares = ?, totalNominalShares = ? where id = ?`;
                    mysql.executeSQLStatement(stmt, [result[0][0].count, result[1][0].TotalShares, result[1][0].totalNominalShares, req.query.vid]).then((result) => {
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in activateAgendaItem overallstatistics`);
                    });

                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in activateAgendaItem overallstatistics`);
                });
          }
		  async.waterfall([
            checkItemBelongsToMeetingSTOID,
            activatItem,
            setDefaultValues,
            overallstatistics
		  ], (err) => {
              res.redirect("meetingView?id=" + req.query.vid);
		  });
    },
    enableAgendaItemForDiscussion(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
        var params = {};
          function activatItem(callback) {
                const sql = `update votingoptions set isItemCurrentlyDiscussing = 0 where votingid = ?;  update votingoptions set isItemCurrentlyDiscussing = 1 where id = ? and votingid = ?`;
                mysql.executeSQLStatement(sql, [req.query.vid, req.query.id, req.query.vid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in meetingEditPost saveCampaign`);
                });
          }
		  async.waterfall([
            activatItem,
		  ], (err) => {
              res.redirect("meetingView?id=" + req.query.vid);
		  });
    },
    scheduleMeeting(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
        var params = {};

		  function checkValues(callback) {
              //TODO check values
                const sql = 'select * from timezone where id = ?';
                mysql.executeSQLStatement(sql, [req.body.timezone]).then((result) => {
                    params.timezone = result[0];
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in scheduleMeeting checkValues`);
                });
          }
          function saveCampaign(callback) {
              common.generateRandomString(80).then((randomtxt) => {
                    params.secretcode = randomtxt;
                    const sql = 'update voting set opendate=?, closedate=?, timezoneid=?, timepadding=?, secretaccesscode = ? where id = ? and stoid = ?';
                    var d1 = new Date(req.body.scheduleDate + " " + req.body.startTime);
                    var d11 = new Date(d1.getTime() + (params.timezone.timepadding * 60000));
                    var d2 = new Date(req.body.scheduleDate + " " + req.body.endTime);
                    var d22 = new Date(d2.getTime() + (params.timezone.timepadding * 60000));
                    mysql.executeSQLStatement(sql, [d11, d22, params.timezone.ID, -params.timezone.timepadding, randomtxt,  req.body.id, req.session.stoid]).then((result) => {
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in scheduleMeeting saveCampaign`);
                    });
               });
          }
          function sendEmailToProxy(callback) {
              mysql.sendMeetingLinkToProxyPerson(req, req.body.id).then((result) => {
                    callback(null);
              }).catch((error) => {
                  //TODO  display this error on the frontend as well
                  common.handleDebug(req, `${error.message} - Error occured in scheduleMeeting sendEmailToProxy`);
                  callback(null);
              });
          }
		  async.waterfall([
			checkValues,
            saveCampaign,
            sendEmailToProxy
		  ], (err) => {
              res.redirect(`meetingedit?id=${req.body.id}`);
		  });
    },
    sendEmailToProxyPerson(req, res) {
          function sendEmailToProxy(callback) {
              mysql.sendMeetingLinkToProxyPerson(req, req.query.id).then((result) => {
                  req.flash('message', 'Email is send to Proxy')
                  callback(null);
              }).catch((error) => {
                  req.flash('message', 'Error occured sending email. Please try again')
                  common.handleDebug(req, res, `${error.toString()} - Error occured in scheduleMeeting saveCampaign`);
                  callback(null);
              });
          }
		  async.waterfall([
            sendEmailToProxy
		  ], (err) => {
              res.redirect(`meetingView?id=${req.query.id}`);
		  });
    },
    extendMeetingTime(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
        const sql = `update voting set closedate=? where id = ? and stoid = ${req.session.stoid}`;
        mysql.executeSQLStatement(sql, [req.query.timeToExtend, req.query.id]).then((result) => {
            res.redirect(`meetingedit?id=${req.query.id}`);
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in extendMeetingTime`);
        });
    },
    agendaItemPost(req, res) {
          common.checkUserAuthorizationForModuleSTO(req, res, 14);
          var params = {};

          function checkItemBelongsToMeetingSTOID(callback) {
                const sql = 'select stoid from voting where id = ? and stoid = ?';
                mysql.executeSQLStatement(sql, [req.body.meetingid, req.session.stoid]).then((result) => {
                    if(result.length > 0)
                        callback(null);
                    else
                        common.handleError(req, res, `Error occured in agendaItemPost checkItemBelongsToMeetingSTOID. THis option ID does not belong to any company voting. user changed voting id in URL`);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in agendaItemPost checkItemBelongsToMeetingSTOID`);
                });
          }
          function saveCampaign(callback) {
              if (req.body.isEditing === '0') {
                    const sql = 'insert into votingoptions(votingid, optiontxt, description) values(?, ?, ?)';
                    mysql.executeSQLStatement(sql, [req.body.meetingid, req.body.optiontxt, req.body.description]).then((result) => {
                        params.id = result.insertId;
                        params.isEditing = 1;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in agendaItemPost saveCampaign`);
                    });
              } else {
                    params.id = req.body.id;
                    const sql = 'update votingoptions set optiontxt=?, description=? where id = ?';
                    mysql.executeSQLStatement(sql, [req.body.optiontxt, req.body.description, req.body.id]).then((result) => {
                        params.id = req.body.id;
                        params.isEditing = 1;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in agendaItemPost saveCampaign`);
                    });
              }
          }
		  async.waterfall([
            checkItemBelongsToMeetingSTOID,
            saveCampaign
		  ], (err) => {
              res.redirect(`agendaitem?meetingid=${req.body.meetingid}&id=${params.id}`);
		  });
    },
    uploadAgendDocument(req, res) {
		/*const size = req.headers['content-length'];
		if (size > (global.config.SMTP_MaxFileSize * 1000000)) {
			req.flash('message', `File size is greater than ${global.config.SMTP_MaxFileSize}MB. Please upload file <= ${global.config.SMTP_MaxFileSize}MB`);
			return res.redirect('/error');
		}*/
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
		let documentDesc = '';
        let id = '';
        let title = '';
        let meetingid = '';

		//    const investorID = '';
		let filename = '';
		let fileFieldName = '';

		const form = new formidable.IncomingForm();

		form.parse(req);

		form.on('fileBegin', (name, file) => {
			// begin file uploadings
			fileFieldName = name;
			filename = `${req.hostname}-${uuidv4()}.${file.name.split('.').pop()}`;
			file.path = common.getUserFileUploadsLocationFullPath(`agendaitems/${filename}`);
		}).on('field', (name, value) => {
			// this contains each file/value received from HTML FORM or query string
			// if(name == "ID")              //picked this from session below
			//    investorID = value;

			if (name === 'desc') { documentDesc = value; }
            if (name === 'id') { id = value; }
            if (name === 'title') { title = value; }
            if (name === 'meetingid') { meetingid = value; }
		})
			.on('error', (err) => {
				logger.error(`${err} - some erro occured`);
			})
			.on('aborted', () => {
				// if user aborted the request
			})
			.on('end', () => {
				// file(s) / fields  has been received an this is the end of all data received from user


                function checkItemBelongsToMeetingSTOID(callback) {
                        const sql = 'select stoid from voting where id = ? and stoid = ?';
                        mysql.executeSQLStatement(sql, [meetingid, req.session.stoid]).then((result) => {
                            if(result.length > 0)
                                callback(null);
                            else
                                common.handleError(req, res, `Error occured in agendaitem getDocumentsList. THis option ID does not belong to any company voting. user changed voting id in URL`);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.toString()} - Error occured in agendaitem checkItemBelongsToMeetingSTOID`);
                        });
                }
                function insertData(callback) {
                    const stmt = `insert into votingdocuments(votingid, votingoptionid, documentlink, title, description) values(?,?,?,?,?)`;

                    mysql.executeSQLStatement(stmt, [meetingid, id, `agendaitems/${filename}`, title, documentDesc]).then((result) => {
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.message}Error occured in uploadAgendDocument`);
                    });
                }
				async.waterfall([
                    checkItemBelongsToMeetingSTOID,
                    insertData
				], (err) => {
                    if (!err) {
                        res.redirect(`agendaitem?meetingid=${meetingid}&id=${id}`);
                    } else {
                        common.handleError(req, res, `${err.message} - ${investorsRecord} Error occured in uploadAgendDocument`);
                    }
                });
			});

    },
    createNewVotingCampaign(req, res) {
          common.checkUserAuthorizationForModuleSTO(req, res, 14);
	  	  var params = {};

		  function checkValues(callback) {
               if (req.body.isEditing === '1') {
                    const sql = 'select stoid from voting where id = ? and stoid = ?';
                    mysql.executeSQLStatement(sql, [req.body.id, req.session.stoid]).then((result) => {
                        if(result.length > 0)
                            callback(null);
                        else
                            common.handleError(req, res, `Error occured in agendaitem getDocumentsList. THis option ID does not belong to any company voting. user changed voting id in URL`);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in agendaitem checkItemBelongsToMeetingSTOID`);
                    });
               } else
                  callback(null);
          }
          function saveCampaign(callback) {
              if (req.body.isEditing === '0') {
                    const sql = `insert into voting (stoid, title, contents, type, opendate, closedate, votetype) values(?,?,?,0,?,?,?)`;
                    mysql.executeSQLStatement(sql, [req.session.stoid, req.body.title, req.body.details, req.body.openDate + " 0:0:0", req.body.closeDate + " 23:59:59", req.body.votetype]).then((result) => {
                        params.id = result.insertId;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in createNewVotingCampaign saveCampaign`);
                    });
              } else {
                    const sql = `update voting set title=?, contents=?, opendate=?, closedate=? where id=? and stoid = ?`;
                    mysql.executeSQLStatement(sql, [req.body.title, req.body.details, req.body.openDate + " 0:0:0", req.body.closeDate + " 23:59:59", req.body.id, req.session.stoid]).then((result) => {
                        params.id = req.body.id;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in createNewVotingCampaign saveCampaign`);
                    });
              }
          }
          function deleteOldOptions(callback) {
              if (req.body.isEditing === '1') {
                  if(req.body.open == '1') {  //voting in future
                        const sql = `delete from votingoptions where votingid = ?`;
                        mysql.executeSQLStatement(sql, [req.body.id]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.toString()} - Error occured in createNewVotingCampaign deleteOldOptions`);
                        });
                  } else
                      callback(null);
              } else
                callback(null);
          }
          function saveOptions(callback) {
              if(req.body.open == '1') {  //voting in future
                  var stmt = "";
                  var data = [];
                  var options = JSON.parse(req.body.optionValues)
                  options.forEach((obj) => {
                      stmt = stmt + "insert into votingoptions(votingid, optiontxt) values(?, ?);"
                      data.push(params.id);
                      data.push(obj);
                  })
                  mysql.executeSQLStatement(stmt, data).then((result) => {
                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.toString()} - Error occured in createNewVotingCampaign saveOptions`);
                  });
              } else
                  callback(null);
          }
		  async.waterfall([
			checkValues,
            saveCampaign,
            deleteOldOptions,
            saveOptions
		  ], function (err) {
              if (req.body.isEditing === '0')
                  res.redirect("voting");
              else
                  res.redirect("votingedit?id=" + req.body.id);
		  });
    },
    unscheduleMeeting(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
	  	  const params = {}

		  function setDatabaseInformation(callback) {
            const sql = 'update voting set opendate = null, closedate = null, timezoneid=0 where id = ? and stoid = ?';
            mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                params.rec = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in unscheduleMeeting setDatabaseInformation`);
            });
		  }
		  async.waterfall([
			setDatabaseInformation
		  ], function (err) {
              res.redirect(`meetingedit?id=${req.query.id}`);
		  });
    },
    deleteVoting(req, res) {

        const sql = 'select stoid from voting where id = ? and stoid = ?';
        mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
            if(result.length > 0) {

                  const sql = `delete from votinguser where votingid = ?; delete from votingoptions where votingid = ?; delete from voting where id = ? and stoid = ${getSTOFromConfig(req.session.stoid).stoid}`;
                  mysql.executeSQLStatement(sql, [req.query.id,req.query.id, req.query.id]).then((result) => {
                      res.redirect("voting");
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in deleteVoting`);
                  });

            } else
                common.handleError(req, res, `Error occured in deleteVoting. THis option ID does not belong to any company voting. user changed voting id in URL`);
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in deleteVoting`);
        });

    },
    deleteagendadocument(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 14);
        var params = {};

          function checkItemBelongsToMeetingSTOID(callback) {
                const sql = 'select stoid from voting where id = ? and stoid = ?';
                mysql.executeSQLStatement(sql, [req.query.meetingid, req.session.stoid]).then((result) => {
                    if(result.length > 0)
                        callback(null);
                    else
                        common.handleError(req, res, `Error occured in agendaitem getDocumentsList. THis option ID does not belong to any company voting. user changed voting id in URL`);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in agendaitem checkItemBelongsToMeetingSTOID`);
                });
          }
          function getItemRec(callback) {
                const sql = 'select documentlink from votingdocuments where id=? and votingoptionid=? and votingid=?';
                mysql.executeSQLStatement(sql, [req.query.itemid, req.query.id, req.query.meetingid]).then((result) => {

                    if(result.length == 0) {
                        common.handleError(req, res, `- Error occured in settings getDatabaseInformation`);
                        return;
                    }

                     fs.unlink(common.getUserFileUploadsLocationFullPath(result[0].documentlink), (err) => {
                         if (err) {
                             common.handleDebug(req, `${result[0].documentlink} deleteagendadocument User Document deleted from disk outside platform`);
                         }
                         callback(null);
                     });

                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in deleteagendadocument getItemRec`);
                });
          }
          function deletedocItem(callback) {
                const sql = 'delete from votingdocuments where id=? and votingoptionid=? and votingid=?';
                mysql.executeSQLStatement(sql, [req.query.itemid, req.query.id, req.query.meetingid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in deleteagendadocument deletedocItem`);
                });
          }
		  async.waterfall([
            checkItemBelongsToMeetingSTOID,
            getItemRec,
            deletedocItem
		  ], (err) => {
              res.redirect(`agendaitem?meetingid=${req.query.meetingid}&id=${req.query.id}`);
		  });
    },
	downloadAgendaIemDocument(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 1);
        mysql.downloadAgendaItem(req, res);
	},
    activateDeactivateProxyLink(req, res) {
        var params = {};
          function activatItem(callback) {
                const sql = `update voting set isVotingOpenForProxy = ? where id = ? and stoid = ?`;
                mysql.executeSQLStatement(sql, [req.query.status, req.query.id, req.session.stoid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in activateDeactivateProxyLink`);
                });
          }
		  async.waterfall([
            activatItem,
		  ], (err) => {
              res.redirect("meetingView?id=" + req.query.id);
		  });
    },

    polledit(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 28);
        res.render('admin/voting/polledit', {
              open: 1,    //needed on the client side to options are collected    1=voting in future and record can be edited
              isEditing: 0,
              csrfToken: req.csrfToken(),
              Data: common.getCommonPageProperties(req),
              partials: common.getPartials()
        });
    },
    polleditpost(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 28);
        const params = {};

          function createrecord(callback) {
              common.generateRandomString(80).then((randomtxt) => {
                    const sql = `insert into voting (stoid, title, contents, type, opendate, closedate, secretaccesscode ) values(?,?,?,2,?,?,?)`;
                    mysql.executeSQLStatement(sql, [req.session.stoid, req.body.title, req.body.details, req.body.openDate, req.body.closeDate, randomtxt]).then((result) => {
                        params.recid = result.insertId;
                        params.randomtxt = randomtxt;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in polleditpost createrecord`);
                    });
              });
          }
          function sendbulkemails(callback) {
                const sql = "insert into bulkemails(stoid, hostname, title, typeOfQuery, InvestorsSelectionSQL, BulkEmailsCommaSeperated, emailText, fromEmail) values (?, ?, ?, ?, ?, ?, ?, ?)";

                var emailText = `<br /> Voting will start from <b>${req.body.openDate}</b> to <b>${req.body.closeDate}</b> <br /><br />  ${req.body.details}`;

                const bulkemail = {
                    title: req.body.title,
                    text: emailText,
                    footer: getSTOFromConfig(req.session.stoid).emailFooter,
                    attachments: [],
                    votingid: params.recid,
                    emailSubject: req.body.subject,
                    randomtxt: params.randomtxt
                };

                mysql.executeSQLStatement(sql, [req.session.stoid, "", req.body.title, 2, "", req.body.emailaddressesJSON, JSON.stringify(bulkemail), getSTOFromConfig(req.session.stoid).SMTP_FromAddress]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in polleditpost sendbulkemails`);
                });
          }
          function saveOptions(callback) {
                  var stmt = "";
                  var data = [];
                  var options = JSON.parse(req.body.optionValues)
                  options.forEach((obj) => {
                      stmt = stmt + "insert into votingoptions(votingid, optiontxt) values(?, ?);"
                      data.push(params.recid);
                      data.push(obj);
                  })
                  mysql.executeSQLStatement(stmt, data).then((result) => {
                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.toString()} - Error occured in polleditpost saveOptions`);
                  });

          }
		  async.waterfall([
            createrecord,
            sendbulkemails,
            saveOptions
		  ], (err) => {
              res.redirect(`voting?type=2`);
		  });

    },
    viewpublicpoll(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 28);
        var params = {};

        function getrecord(callback) {
            mysql.getPublicPollsDetails(req.query.id, getSTOFromConfig(req.session.stoid).stoid).then((data) => {
                params = data;
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in viewpublicpoll getrecord`);
            });;
        }
        async.waterfall([
            getrecord
        ], (err) => {

            res.render('admin/voting/viewpublicpoll', {
                id: req.query.id,
                open: params.open,
                Record: params.Record,
                OptionRecord: params.OptionRecord,
                Data: common.getCommonPageProperties(req),
                VotesCasted: params.VotesCasted,
                TotalUsers: params.TotalUsers,
                partials: common.getPartials()
            });

        });
    },
    deletePublicVoting(req, res) {

		  function getDatabaseInformation(callback) {
			  const sql = "select * from voting where id = ? and stoid = ?";
			  mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                  if(result.length == 0)
                     common.handleError(req, res, ` Error occured in getDatabaseInformation deletePublicVoting some body try to delete a voting campaign that does not belong to their STO. check`);
                  else
				     callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in deletePublicVoting getDatabaseInformation `);
			  });
		  }
          function deleteCampaign(callback) {
			  const sql = "delete from voting where id = ?; delete from votingoptions where votingid = ?; delete from publicpollsdata where votingid = ?";
			  mysql.executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id]).then((result) => {
				    callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in deletePublicVoting getDatabaseInformation deleteCampaign`);
			  });
          }
		  async.waterfall([
			getDatabaseInformation,
            deleteCampaign
		  ], (err) => {
              res.redirect("/admin/voting?type=2");
		  });

    },

    updates(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 11);
        const params = {};

		  function getDatabaseInformation(callback) {
			  const sql = "Select u.ID, u.TITLE, DATE_FORMAT(UpdateDate,'%M %d %Y') as UpdateDate from updates u where u.stoid = ? Order by ID DESC";
			  mysql.executeSQLStatement(sql, [req.session.stoid]).then((result) => {
				  params.UpdateRecords = result;
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in updates getDatabaseInformation`);
			  });
		  }
		  async.waterfall([
			getDatabaseInformation,
		  ], (err) => {
			 res.render('admin/updates/updates', {
				 Data: common.getCommonPageProperties(req),
				 partials: common.getPartials(),
				 UpdateRecords: params.UpdateRecords,
                 stos: params.stos
			 });
		  });

	},
    deleteUpdate(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 11);
		  const sql = `Delete from updates where id = ? and stoid = ${req.session.stoid}`;
		  mysql.executeSQLStatement(sql, [req.query.id])
		  .then(() => res.redirect('updates'))
		  .catch((error) => {
			  common.handleError(req, res, `${error.message}Error occured in deleteUpdate`);
		  });
	  },
    addEditUpdate(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 11);
          const params = {};
		  let isEditing = 0;
		  if (req.query.id) { isEditing = 1; }

		  function getCompanyUpdates(callback) {
			  if (isEditing === 1) {
				  const sql = `SELECT * FROM updates where id = ? and stoid = ${req.session.stoid}`;
				  mysql.executeSQLStatement(sql, [req.query.id])
				  .then((result) => {
                      params.updateRecord = result[0]
					  callback(null);
				  })
				  .catch((error) => {
					  common.handleError(req, res, `${error.message} Error occured in addEditUpdate getCompanyUpdates`);
				  });
			  } else { callback(null, {}); }
		  }
		  async.waterfall([
			getCompanyUpdates,
		  ], (err) => {
				 res.render('admin/updates/add', {
					 Data: common.getCommonPageProperties(req),
					 isEditing,
					 partials: common.getPartials(),
					 csrfToken: req.csrfToken(),
					 updateRecord: params.updateRecord
				 });
		  });

	  },
    updatesPost(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 11);
        let fullPhotoUrl = ''
        if(req.file){
            const newFileName = Date.now() + Math.round(Math.random() * 1E9) + req.file.filename + req.file.originalname
            fullPhotoUrl = req.protocol + "://" + req.headers.host + '/img/newsletter/' + newFileName
            fs.rename(req.file.path, path.join(__dirname, '/../../public/img/newsletter', newFileName), function (err) {
                if (err) return err
                // fs.unlink(path.join(__dirname, 'uploads', req.file.filename))
            })
        }
        console.log(newFileName)
        let sql = '';
        let data = [];

        if (req.body.FormOperation === '0') {
            sql = 'Insert into updates(Title, Details, stoid, coverphoto, UpdateDate) values(?,?,?,?,Now())';
            data = [req.body.title, req.body.notes, req.session.stoid, fullPhotoUrl];
        } else if (req.body.FormOperation === '1') {
            if(req.file?.filename){
                sql = 'Update updates set Title = ?, Details = ?, coverphoto = ? where id = ? and stoid = ?';
                data = [req.body.title, req.body.notes, fullPhotoUrl, req.body.ID, req.session.stoid];

            } else{
                sql = 'Update updates set Title = ?, Details = ? where id = ? and stoid = ?';
                data = [req.body.title, req.body.notes, req.body.ID, req.session.stoid];
            }
        }

        mysql.executeSQLStatement(sql, data)
            .then(() => {

                var LogDescription = ``;
                if (req.body.FormOperation === '0')
                    LogDescription = `New news/update added (${req.body.title})`;
                else
                    LogDescription = `New news/update updated (${req.body.title})`;

                const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid, recid) values (?,NOW(),?,?,?,?,?)';

                const sqlparams = [req.session.user.ID, LogDescription, -1, 15, req.session.stoid, -1];
                mysql.executeSQLStatement(stmt, sqlparams)
                    .then(() => {

                        if (req.body.chkSendBulkEmail) {
                            const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
                            if (!stoEmailTexts) throw new Error(`Email texts not found for NewCompanyNews`);

                            let txtEmail = emailTextsController.format(stoEmailTexts.NewCompanyNews.Line1, {
                                title: req.body.title,
                            });
                            txtEmail += '<br /><br />';
                            txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;
                            // let txtEmail = '';
                            // txtEmail += `${emailTexts.NewCompanyNews.Line1} <br /><br />`;
                            // txtEmail += ` <b>${req.body.title}</b> <br /><br />`;
                            // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

                            const emaildata = {
                                text: txtEmail,
                                attachments: []
                            };

                            const preparedSQL = {
                                "sql": ` from investor i, investorsto s where s.investorid = i.id and s.stoid = ${req.session.stoid}`,
                                "data": []
                            };

                            const sql = "insert into bulkemails(stoid, hostname, title, typeOfQuery, InvestorsSelectionSQL, BulkEmailsCommaSeperated, emailText, fromEmail) values (?, ?, ?, ?, ?, ?, ?, ?)";

                            mysql.executeSQLStatement(sql, [req.session.stoid, req.hostname, `${getSTOFromConfig(req.session.stoid).title} ${emailTexts.NewCompanyNews.Subject}`, 1, JSON.stringify(preparedSQL), "", JSON.stringify(emaildata), getSTOFromConfig(req.session.stoid).SMTP_FromAddress]).then(() => {

                                res.redirect('updates');

                            }).catch((error) => {
                                logger.error(`${error.message} - Error occured in updatesPost`);
                            });

                        } else
                            res.redirect('updates')

                    }).catch((error) => {
                        logger.error(`${error.message} - Error occured in updatesPost`);
                    });

            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error updatesPost`);
            });

    },
	updateDetails(req, res) {
		  const sql = `Select ID, Details, TITLE, DATE_FORMAT(UpdateDate,'%M %d %Y') as UpdateDate, coverphoto from updates where id = ? and stoid = ${req.session.stoid}`;
		  mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                 const record = result;
                 record[0].Details = record[0].Details.replace(/(?:\r\n|\r|\n)/g, '<br />');

                 res.render('admin/updates/view', {
                        Data: common.getCommonPageProperties(req),
                        partials: common.getPartials(),
                        record: record[0],
                 });

		  }).catch((error) => {
			  common.handleError(req, res, `${error.message} Error occured in updates getDatabaseInformation`);
		  });
	},

	changePassword(req, res) {
        mysql.changePassword(req).then((result) => {
            req.flash('message', result);
            res.redirect('settings');
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in admin changePassword`);
        });
	},

    shares(req, res) {

        ShareCapTable.getShareCapTable(req.session.stoid)
        .then((table) => {
            res.render('admin/shares', {
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
                csrfToken: req.csrfToken(),

                ShareCapTable: table,
                ShareCapTableJson: JSON.stringify(table, null, 4),
            });
        }).catch((e) => {
            common.handleError(req, res, `Error in admin/shares getShareCapTable:\n${e.stack}\n\n`);
        });

    },

    shares_legacy(req, res) {
	  	const params = {};

        if( ! (common.isUserAuthenticatedForModule(req, 10) || common.isUserAuthenticatedForModule(req, 22) || common.isUserAuthenticatedForModule(req, 23) ) ) {
            res.redirect("dashboardsto");
            return;
        } else {
            if( ! common.isUserAuthenticatedForModule(req, 10) ) {
                if( common.isUserAuthenticatedForModule(req, 22) ) {
                    res.redirect("sharessummary");
                    return;
                }
                else if( common.isUserAuthenticatedForModule(req, 23) ) {
                    res.redirect("shareshistory");
                    return;
                }
            }
        }


		function checkIfThereAreAnyShares(callback) {
			const sql = `select count(*) from sharetypes where stoid = ${req.session.stoid}`;
			mysql.executeSQLStatement(sql, []).then((result) => {

				if(result.length > 0)
					callback(null);
				else {
					res.redirect("dashboardsto")
				}

			}).catch((error) => {
				common.handleError(req, res, `${error.toString()} Error occured in investorsView`);
			});
		}
        function calculateCompanyShares(callback) {
			const sql = `select title, totalShares, companyShares, isblockchain, nominalvalue, premimum, currencyid from sharetypes where stoid = ?\
            ;\
            select sum(totalShares) as totalShares, sum(companyShares) as totalCompanyShares, sum(custodianShares) as totalCustodianShares from sharetypes where stoid = ?;`;
			mysql.executeSQLStatement(sql, [req.session.stoid, req.session.stoid]).then((result) => {
                params.shareTypes = result[0];
                params.totalShares = result[1][0];
                params.totalCompanyShares = result[1][0];
                params.totalCustodianShares = result[1][2];

				callback(null);
			}).catch((error) => {
				common.handleError(req, res, `${error.toString()} Error occured in investorsView`);
			});
        }
        function calculateTotalVoteableShares(callback) {
            const sql = "select sum(shares) * votingPower as sums from shares s, sharetypes p where s.sharetypeid = p.id and isvotingrightsapplicable = 1 and p.stoid = ?"
            mysql.executeSQLStatement(sql, [req.session.stoid]).then((result) => {

                params.totalVotingPower = result[0].sums;
                callback(null);
            });
        }
		function getNonBlockchainData(callback) {
            const sql = `SELECT 
                    s.investorid, s.shareTypeid, i.firstname, i.lastname,
                    nominalvalue, premimum, currencyid,isVotingRightsApplicable,
                    isDividendRightsApplicable, votingPower, p.title,
                    sum(shares) as shares, sum(shares) * votingPower as voteShares,
                    investorType, CompanyName
                FROM shares s
                JOIN sharetypes p
                    ON s.shareTypeid = p.id AND s.shares > 0
                JOIN investor i
                    ON i.id = s.investorid
                WHERE s.stoid = ?
                GROUP BY s.investorid, s.shareTypeid  WITH ROLLUP`;

            // let temporaryFixUsed = false;
            mysql
            .executeSQLStatement(sql, [req.session.stoid])
            .then((result) => {
                params.SoldPercentage = 0;
                let investorid = "test";
                let totalInvestorInvestment = 0;
                let totalinvestorDividend = 0;
                let totalInvestorVotingShares = 0;
                let totalInvestmentInCompany = 0;

                result.forEach((obj) => {
                if (investorid !== obj.investorid) {
                    investorid = obj.investorid;
                } else {
                    obj.firstname = "";
                    obj.lastname = "";
                    obj.CompanyName = "";
                }

                if (obj.isVotingRightsApplicable === 1) {
                    obj.Percent = math
                    .multiply(
                        math.divide(obj.voteShares ?? 0, params.totalVotingPower ?? 0) ?? 0,
                        100
                    )
                    .toFixed(global.config.VotingPowerInFractions);
                    // if (obj.Percent > 100) {
                    // TEMPORARY FIX
                    // temporaryFixUsed = true;
                    obj.Percent /= 10;
                    // }
                    obj.AmountInvested = math.multiply(obj.premimum ?? 0, obj.shares ?? 0);

                    if (obj.shareTypeid != null) {
                    totalInvestorVotingShares = math.sum(
                        totalInvestorVotingShares,
                        obj.voteShares ?? 0
                    );
                    totalInvestmentInCompany = math.sum(
                        totalInvestmentInCompany,
                        obj.AmountInvested ?? 0
                    );
                    }
                }

                if (obj.shareTypeid != null) {
                    params.SoldPercentage += math.multiply(
                    math.divide(
                        math.number(obj.shares ?? 0),
                        math.number(params.totalShares.totalShares ?? 0)
                    ) ?? 0,
                    100
                    );
                    totalinvestorDividend = math.sum(
                    totalinvestorDividend,
                    obj.shares ?? 0
                    );
                    if (obj.AmountInvested != null)
                    totalInvestorInvestment = math.sum(
                        totalInvestorInvestment,
                        obj.AmountInvested ?? 0
                    );
                } else {
                    obj.shareTypeid = -1;

                    obj.Percent = math
                    .multiply(
                        math.divide(obj.shares ?? 0, params.totalVotingPower ?? 1) ?? 0,
                        100
                    )
                    .toFixed(global.config.VotingPowerInFractions);
                    // if (obj.Percent > 100) {
                    // TEMPORARY FIX
                    // temporaryFixUsed = true;
                    obj.Percent /= 10;
                    // }

                    obj.totalInvestorInvestment = totalInvestorInvestment;
                    totalInvestorInvestment = 0;
                    obj.totalinvestorDividend = totalinvestorDividend;
                    totalinvestorDividend = 0;
                    obj.totalInvestorVotingSharesPercent = math
                    .multiply(
                        math.divide(
                        totalInvestorVotingShares ?? 0,
                        params.totalVotingPower ?? 1
                        ) ?? 0,
                        100
                    )
                    .toFixed(global.config.VotingPowerInFractions);
                    // if (obj.totalInvestorVotingSharesPercent > 100) {
                    // TEMPORARY FIX
                    // temporaryFixUsed = true;
                    obj.totalInvestorVotingSharesPercent = math.divide(
                    obj.totalInvestorVotingSharesPercent ?? 0,
                    10
                    );
                    // }
                    obj.totalInvestorVotingShares = totalInvestorVotingShares;
                    totalInvestorVotingShares = 0;

                    if (obj.investorid == null) obj.investorid = -1;
                }
                });

                params.DataRows = result;
                params.SoldPercentage = params.SoldPercentage.toFixed(2);
                params.totalInvestmentInCompany = totalInvestmentInCompany;

                callback(null);
            })
            .catch((error) => {
                common.handleError(
                req,
                res,
                `${error.toString()} Error occured in investorsView`
                );
            });

		}
        function getShareCapTable(callback) {
            ShareCapTable.getShareCapTable(req.session.stoid).then((table) => {
                params.shareCapTable = table;
                callback(null);
            }).catch((e) => {
                common.handleError(req, res, `Error in admin/shares getShareCapTable:\n${e.stack}\n\n`);
            });
        }
        async.waterfall([
			checkIfThereAreAnyShares,
            calculateCompanyShares,
            calculateTotalVoteableShares,
			getNonBlockchainData,
            getShareCapTable,
        ], (err) => {
            if (!err) {
                let companySoldPercentage = 0;
                let companySold = 0;
                if (params.TotalCompanyShares > 0) {
                    companySoldPercentage = math.multiply(
                        math.divide(
                            math.subtract(params.TotalCompanyShares ?? 0, params.CompanyShares ?? 0) ?? 0,
                            params.TotalCompanyShares ?? 0) ?? 0,
                    100
                    ).toFixed(2);
                }
                const TotalPercent = math.number(
                  math.multiply(
                    math.divide(
                      math.number(params.totalShares.totalCompanyShares ?? 0),
                      math.number(params.totalShares.totalShares ?? 0)
                    ) ?? 0,
                  100
                  )).toFixed(2);

                const TotalCustodianPercent = math.number(
                  math.multiply(
                    math.divide(
                      math.number(params.totalShares.totalCustodianShares ?? 0),
                      math.number(params.totalShares.totalShares ?? 0)
                      ) ?? 0,
                    100
                  )).toFixed(2);

                const TotalSoldPercentage = math.number(
                  math.divide(
                    math.multiply(
                      math.subtract(
                        math.number(params.totalShares.totalShares ?? 0),
                        math.number(params.totalShares.totalCompanyShares ?? 0)
                      ) ?? 0,
                      100
                    ),
                    math.number(params.totalShares.totalShares ?? 0)
                  )
                ).toFixed(2);


                  res.render('admin/shares_legacy', {
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                    DataRows: params.DataRows,
                    shareTypes: params.shareTypes,
                    csrfToken: req.csrfToken(),

                    TotalShares: params.totalShares.totalShares,
                    TotalCustodianShares: params.totalShares.totalCustodianShares,

                    TotalDistribution: params.totalShares.totalCompanyShares,
                    TotalPercent,
                    TotalCustodianPercent,
                    TotalSold: math.subtract(params.totalShares.totalShares ?? 0, params.totalShares.totalCompanyShares ?? 0) ?? 0,
                    TotalSoldPercentage,

                    totalInvestmentInCompany: params.totalInvestmentInCompany,

                    ShareCapTable: params.shareCapTable,
                    ShareCapTableJson: JSON.stringify(params.shareCapTable, null, 4),
                });
            }
        });

	  },
    sharessummary(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 22);

        const sql = `select p.title, sum(s.shares) as sums, p.nominalValue, 
                        p.premimum, currencyid, 
                        ((p.totalShares - p.companyShares) * p.nominalValue) as nominalCapital,
                        ((p.totalShares - p.companyShares) * p.premimum) as premimumCapital,
                        ( ((p.totalShares - p.companyShares) * p.nominalValue) +  ((p.totalShares - p.companyShares) * p.premimum) ) as totalCapital,
                        if(isVotingRightsApplicable, (p.totalShares - p.companyShares), 0) * p.votingPower as VotingPower,
                        sum(s.shares) as dividendRights
                        from shares s join sharetypes p on s.shareTypeid = p.id 
                        where p.stoid = ? group by p.currencyid, p.id`;

        mysql.executeSQLStatement(sql, [req.session.stoid]).then((result) => {
            res.render('admin/sharessummary', {
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
                records: result
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} Error occured in sharessummary`);
        });

    },
    shareshistory(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 23);

        const params = {};

        function getAllShareTypesOfSTO(callback) {
            const stmt = "select * from sharetypes where stoid = ?";
            mysql.executeSQLStatement(stmt, [req.session.stoid]).then((result) => {
                params.shareTypes = result;
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} Error occured in shareshistory`);
            });
        }
        function getShareTypeID(callback) {
            if(req.query.sid != null) {
                params.shareTypes.forEach((obj) => {
                  if(obj.ID == parseInt(req.query.sid, 10))
                      params.currentShareType = obj;
                });
            } else {
                params.currentShareType = params.shareTypes[0];
            }
            callback(null);
        }
        function getSharesStatistics(callback) {
            var stmt = "select totalShares from sharetypes where id = ?";
            mysql.executeSQLStatement(stmt, [params.currentShareType.ID]).then((result) => {
                params.totalShares = result[0].totalShares;
                params.totalCapital = math.multiply(params.currentShareType.nominalValue ?? 0, params.totalShares ?? 0);
                callback(null);
            });
        }
        async.waterfall([
            getAllShareTypesOfSTO,
            getShareTypeID,
            getSharesStatistics
        ], (err) => {

            var stmt = `select distinct i.firstname as HolderFirstName, i.lastname as HolderLastName, i.investorType, i.CompanyName, s.shares, s.isActive,
                i.Address as HolderAddress, i.country as HolderCountry, i.town as HolderTown, i.zip as HolderZip, 
                UsufructuariesFirstName, UsufructuariesLastName, UsufructuariesAddress, UsufructuariesCity, UsufructuariesCountry, UsufructuariesEmail, p.currencyid,
                BeneificalFirstName, BeneificalLastName, BeneificalAddress, BeneificalCity, BeneificalCountry, BeneificalEmail,
                BeneificalNationality, BeneificalEmail, DATE_FORMAT(BeneificalDOB,'%M %d %Y') as BeneificalDOB,
                s.CertificateSerials, s.ShareSerials, DATE_FORMAT(s.datePurchase,'%M %d %Y') as datePurchase, s.purchaserID, 
                i2.FirstName as PurchaserFirstName, i2.LastName as PurchaserLastName, i2.Address as PurchaserAddress, i2.country as PurchaserCountry, i2.town as PurchaserTown, i2.zip as PurchaserZip, p.nominalValue, p.premimum
                FROM shareshistory s left join investor i on i.id = s.investorID  
                left join investor i2 on i2.id = s.purchaserID
                left join sharetypes p on s.shareTypeid = p.ID
                left join investorsto isto on i.id = isto.investorid
                where p.ID = ? and p.stoid = ? and isto.stoid = ?
                order by s.datePurchase asc, s.id asc`;

                var date = new Date();
                var year = date.getUTCFullYear();
                var month = common.getMonthName( date.getUTCMonth() );
                var day = date.getUTCDate();
                if(day < 9)
                    day = "0" + day;

                mysql.executeSQLStatement(stmt, [params.currentShareType.ID,  req.session.stoid, req.session.stoid]).then((result) => {
                    res.render('admin/shareshistory', {
                        Data: common.getCommonPageProperties(req),
                        partials: common.getPartials(),
                        records: result,
                        shareTypes: params.shareTypes,
                        currentShareType: params.currentShareType,
                        dateReport: month + " " + day + " " + year,
                        totalCapital: params.totalCapital,
                        totalShares: params.totalShares,
                        currentShareID: params.currentShareType.ID
                    });
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} Error occured in shareshistory`);
                });
        })

    },

    stopublic(req, res) {
          var params = {};

		  async.waterfall([
			function getMainRecord(callback) {
					  const sql = 'SELECT * FROM stopublic where stoid = ? and type = 1';
					  mysql.executeSQLStatement(sql, [req.query.id])
					  .then((result) => {
                          params.mainrecord = result[0];
						  callback(null);
					  })
					  .catch((error) => {
						  common.handleError(req, res, `${error.message}Error occured in systemuserslist getsystemuserslist`);
					  });
			},
			function getMainRecord(callback) {
					  const sql = 'SELECT * FROM stopublic where stoid = ? and type = 2';
					  mysql.executeSQLStatement(sql, [req.query.id])
					  .then((result) => {
                          params.records = result;
						  callback(null);
					  })
					  .catch((error) => {
						  common.handleError(req, res, `${error.message}Error occured in systemuserslist getsystemuserslist`);
					  });
			},
            function showPage() {
				res.render('admin/public/stopublic',
					{
						mainrecord: params.mainrecord,
                        records: params.records,
						partials: common.getPartials(),
						Data: common.getCommonPageProperties(req),
					});
			},
		  ]);

    },
    stopublicedit(req, res) {
          var params = {};

		  async.waterfall([
			function getMainRecord(callback) {
                if(req.query.op === '2') {
					  const sql = 'SELECT * FROM stopublic where id = ?';
					  mysql.executeSQLStatement(sql, [req.query.id])
					  .then((result) => {
                          params.mainrecord = result[0];
                          params.stoid = result[0].stoid;
						  callback(null);
					  })
					  .catch((error) => {
						  common.handleError(req, res, `${error.message} Error occured in stopublicedit`);
					  });
                } else if (req.query.op === '1') {
                    params.mainrecord = {};
                    params.mainrecord.title='';
                    params.mainrecord.contents = '';
                    params.mainrecord.id = -1;
                    params.stoid = req.query.stoid;
                    callback(null);
                }
			},
            function showPage() {
				res.render('admin/public/stopublicedit',
					{
                        csrfToken: req.csrfToken(),
                        op: req.query.op,
                        stoid: params.stoid,
						mainrecord: params.mainrecord,
						partials: common.getPartials(),
						Data: common.getCommonPageProperties(req),
					});
			},
		  ]);

    },
    saveHTMLSection(req, res) {

          function saveSection(callback) {
              if(req.body.op === '2') {
                const stmt = 'update stopublic set title=?, contents=? where id=?';
                mysql.executeSQLStatement(stmt, [req.body.title, req.body.htmlText, req.body.id])
                    .then((result) => {
                        callback(null);
                    })
                    .catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in saveHTMLSection`);
                    });
              } else if(req.body.op === '1') {
                    const stmt = 'insert into stopublic(`stoid`, `title`, `contents`, `type`, `order`, `isActive`) values(?, ?, ?, 2, 1, 1)';
                    mysql.executeSQLStatement(stmt, [req.body.stoid, req.body.title, req.body.htmlText])
                    .then((result) => {
                        callback(null);
                    })
                    .catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in saveHTMLSection`);
                    });
              }
          }
          async.waterfall([
            saveSection,
		  ], function (err) {
			   res.redirect("stopublic?id=" + req.body.stoid);
		  });

    },
    stopublicdelete(req, res) {

          function deleteSection(callback) {
			const stmt = 'delete from stopublic where id=?';
			mysql.executeSQLStatement(stmt, [req.query.id])
				.then((result) => {
                    callback(null);
				})
				.catch((error) => {
					common.handleError(req, res, `${error.toString()} - Error occured in stopublicdelete`);
				});
          }
          async.waterfall([
            deleteSection,
		  ], function (err) {
			   res.redirect("stopublic?id=" + req.query.stoid);
		  });

    },
    stopublicenabled(req, res) {

          function deleteSection(callback) {
			const stmt = 'update stopublic set isActive=? where id=?';
			mysql.executeSQLStatement(stmt, [req.query.en, req.query.id])
				.then((result) => {
                    callback(null);
				})
				.catch((error) => {
					common.handleError(req, res, `${error.toString()} - Error occured in stopublicdelete`);
				});
          }
          async.waterfall([
            deleteSection,
		  ], function (err) {
			   res.redirect("stopublic?id=" + req.query.stoid);
		  });

    },
    enableDisablePublicSTO(req, res) {

          function setSTO(callback) {
			const stmt = 'update stos set isActive=? where id=?';
			mysql.executeSQLStatement(stmt, [req.query.en, req.query.id])
				.then((result) => {
                    callback(null);
				})
				.catch((error) => {
					common.handleError(req, res, `${error.toString()} - Error occured in enableDisablePublicSTO`);
				});
          }
          async.waterfall([
            setSTO,
		  ], function (err) {
			   res.redirect("sto");
		  });

    },

    getSTOList(req, res) {
      const sql = 'select s.id, s.title as stoName, s.logo, p.title, p.contents  from stos s, stopublic p where s.id = p.stoid and p.type = 1 and s.isActive = 1';
      mysql.executeSQLStatement(sql, [])
      .then((result) => {
          res.json(result);
      })
      .catch((error) => {
          common.handleError(req, res, `${error.message} Error occured in stopublicedit`);
      });
    },
    getSTODetails(req, res) {
          var params = {};

          function selectMainRecord(callback) {
                const sql = 'select s.id, s.title as stoName, s.logo, p.title, p.contents  from stos s, stopublic p where s.id = p.stoid and p.type = 1 and s.id = ?;';
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.main = result[0];
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in stopublicdelete`);
                });
          }
          function selectOtherRecords(callback) {
                const sql = 'select title, contents from stopublic where type = 2 and stoid = ? and  isActive = 1 order by stopublic.order';
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.records = result;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in stopublicdelete`);
                });
          }
          async.waterfall([
             selectMainRecord,
             selectOtherRecords
          ], function (err) {
               res.json(params);
          });

    },

    inbox(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 12);

        var showBulkEmailInBox = 0;
        if (common.isUserAuthenticatedForModule(req, 24) )
            showBulkEmailInBox = 1;

        const sql = "Select inv.ID as InvestorID, inv.FirstName, inv.LastName, i.ID, i.Title, DATE_FORMAT(i.DateEmail,'%M %d %Y') as Date, i.isResponded, i.Response, DATE_FORMAT(i.ResponseDate,'%M %d %Y') as ResponseDate from inbox i, investor inv where i.InvestorID = inv.ID and stoid = ? Order by i.ID DESC limit 0, 500";
        mysql.executeSQLStatement(sql, [req.session.stoid]).then((result) => {
				res.render('admin/inbox', {
					Records: result,
                    errorMessage: req.flash('errorMessage'),
					Data: common.getCommonPageProperties(req),
                    showBulkEmailInBox: showBulkEmailInBox,
					partials: common.getPartials(),
				});
        }).catch((error) => {
			  common.handleError(req, res, `${error.message} Error occured in inbox`);
        });
    },
    email(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 12);
        const params = { id: req.query.investorID };

        mysql.getInvestorRecordFromDatabase(params, req).then((data) => {
              params.investorRec = data[0];

              const sql = `Select * from inbox where ID = ? and stoid = ${req.session.stoid}`;
              mysql.executeSQLStatement(sql, [req.query.id])
              .then((result) => {
                    res.render('admin/email', {
                        record: result[0],
                        Data: common.getCommonPageProperties(req),
                        partials: common.getPartials(),
                        csrfToken: req.csrfToken(),
                        investorID: req.query.investorID,
                        invRec: params.investorRec
                    });
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in email`);
              });

          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in email`);
          });
	  },
    emailResponse(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 12);

        const params = { id: req.body.investorID };
        emailTextsController.getEmailTexts().then(() =>
            mysql.getInvestorRecordFromDatabase(params, req)
        ).then((data) => {

            const txt = req.body.emailText.replace(/(?:\r\n|\r|\n)/g, '<br />');

            const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
            if (!stoEmailTexts) throw new Error(`Email texts not found for MessageToInvestor`);

            let txtEmail = emailTextsController.format(stoEmailTexts.MessageToInvestor.Line1, {
                firstname: data[0].firstname,
                lastname: data[0].lastname,
                message: txt,
            });
            txtEmail += '<br /><br />';
            txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;
            // txtEmail = `${txtEmail}Dear ${data[0].FirstName} ${data[0].LastName} <br /><br />`;
            // txtEmail += `${stoEmailTexts.MessageToInvestor.Line1} <br /><br /> ${txt} <br /><br />`;
            // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

            var message2 = "Response recorded in investor dashboard. ";
            const sql = `Update inbox set isResponded=1,  Response=?,  ResponseDate=Now() Where id = ? and stoid = ${req.session.stoid}`;
            mysql.executeSQLStatement(sql, [txt, req.body.id]).then(() => {

                common.sendEmail(req.hostname, data[0].email, `Message from ${getSTOFromConfig(req.session.stoid).title}`, txtEmail, [])
                .then(() => {
                    message2 = message2 + " Email sent to investor";
                    req.flash('errorMessage', message2);
                    res.redirect('inbox');
                }, (err) => {
                    if (err) {
                        message2 = message2 + " Error occured sending email";
                        logger.error(`${err} - Error occured in emailResponse`);
                    }
                    req.flash('errorMessage', message2);
                    //res.redirect('inbox');
                });
                res.redirect('inbox');
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in emailResponse`);
            });

        });

	  },
    bulkEmail(req, res) {

        //if investor do not have any bulk email sending right
        var isModuleAccessible = 0;
        if (common.isUserAuthenticatedForModule(req, 24) || common.isUserAuthenticatedForModule(req, 25) || common.isUserAuthenticatedForModule(req, 26) )
            isModuleAccessible = 1;

        if(isModuleAccessible == 0)
            res.redirect("dashboardsto");


        function getDatabaseInformation(callback) {
              callback(null);
          }
		  async.waterfall([
			getDatabaseInformation,
		  ], function (err) {
              if (!err) {
                res.render('admin/bulkemail', {
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                    csrfToken: req.csrfToken()
                });
              }
		  });
    },
    sendBulkEmail(req, res) {
        //if investor do not have any bulk email sending right
        var isModuleAccessible = 0;
        if (common.isUserAuthenticatedForModule(req, 24) || common.isUserAuthenticatedForModule(req, 25) || common.isUserAuthenticatedForModule(req, 26) )
            isModuleAccessible = 1;

        if(isModuleAccessible == 0)
            res.redirect("dashboardsto");

        /*if (! common.isUserAuthenticatedForModule(req, 24)) {
            //if send email to all investors is not then check

            if(req.body.typesearch == "" || req.body.typesearch == "-1") {
                //all investors
            }

        }*/
        const preparedSQL = common.getInvestorSearchSQL(common.getInvestorSearchSQLSearchCritetia(req, true), req);


        const data = {
            text: req.body.emailText + "<br />" + getSTOFromConfig(req.session.stoid).emailFooter,
            attachments: JSON.parse(req.body.files)
        };


          const sql = "insert into bulkemails(stoid, hostname, title, typeOfQuery, InvestorsSelectionSQL, BulkEmailsCommaSeperated, emailText, fromEmail) values (?, ?, ?, ?, ?, ?, ?, ?)";

          mysql.executeSQLStatement(sql, [req.session.stoid, req.hostname, req.body.emailTitle, 1, JSON.stringify(preparedSQL), "", JSON.stringify(data), getSTOFromConfig(req.session.stoid).SMTP_FromAddress]).then(() => {
                const LogDescription = `Bulk email send ( ${req.body.emailTitle} )`;
                const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid, recid) values (?,NOW(),?,?,?,?,?)';
                const sqlparams = [req.session.user.ID, LogDescription, -1, 16, req.session.stoid, -1];
                mysql.executeSQLStatement(stmt, sqlparams).then(() => {
                    if(req.body.bulkemailchkbx == 0){
                        mysql.executeSQLStatement("select i.id, firstname, lastname, country, town, email, companyname, investortype " + preparedSQL.sql, preparedSQL.data).then((result) => {

                            result.forEach(element => {
                                        let txtEmail = '';
                                txtEmail = `Dear ${element.firstname} ${element.lastname} <br /><br />`;
                                txtEmail += `${req.body.emailTitle} <br /><br /> ${req.body.emailText} <br /><br />`;
                                txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

                                var attachments = [];
                                try {
                                    attachments = JSON.parse(req.body.files)
                                } catch {
                                    attachments = [];
                                }

                                common.sendEmail(req.hostname, element.email, "Message from " + getSTOFromConfig(req.session.stoid).title, txtEmail, attachments).then((emailresp) => {

                                }, (err) => {
                                    common.handleError(`${err.toString()} - Error occured in sendBulkEmail`);
                                    res.redirect('inbox');
                                }).catch((error) => {
                                    common.handleError(`${error.toString()} - Error occured in sendBulkEmail`);
                                    res.redirect('inbox');
                                });;
                            });
                            res.redirect('inbox');
                        }).catch((error) => {
                            common.handleError(`${error.toString()} - Error occured in searchInvestorjson`);
                            res.redirect('inbox');
                        });
                    }else{
                         res.redirect('inbox');
                    }

                }).catch((error) => {
                    logger.error(`${error.message} - Error occured in sendBulkEmail`);
                });

          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in sendBulkEmail`);
          });

    },
	sendEmailToInvestor(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 2);

        const params = { id: req.body.id2 };

        mysql.getInvestorRecordFromDatabase(params, req).then((data) => {
            const txt = req.body.emailText.replace(/(?:\r\n|\r|\n)/g, '<br />');

            if(data.length == 0) {
                common.handleError(req, res, ` Admin ${req.session.user.ID} is trying to email to investor ${req.body.id2} who does not belong to his STO `);
                return;
            }

          const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
          if (!stoEmailTexts) throw new Error(`Email texts not found for MessageToInvestor`);

            let txtEmail = emailTextsController.format(stoEmailTexts.MessageToInvestor.Line1, {
              firstname: data[0].FirstName,
              lastname: data[0].LastName,
              message: txt,
            });
            txtEmail += '<br /><br />';
            txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

            // txtEmail = `Dear ${data[0].FirstName} ${data[0].LastName} <br /><br />`;
            // txtEmail += `${emailTexts.MessageToInvestor.Line1} <br /><br /> ${txt} <br /><br />`;
            // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

            var attachments = [];
            try {
                attachments = JSON.parse(req.body.files)
            } catch {
                attachments = [];
            }

            common.sendEmail(req.hostname, data[0].email, "Message from " + getSTOFromConfig(req.session.stoid).title, txtEmail, attachments).then(() => {

                        req.flash('errorMessage', 'Email sent to investor');
                        if (req.body.id1 === '1') return res.redirect(`KYCView?id=${req.body.id2}&link=${req.body.link}`);
                        if (req.body.id1 === '3') return res.redirect(`investorsViewSto?id=${req.body.id2}`);
                        if (req.body.id1 === '4') return res.redirect(`viewsenddoccontracts?id=${req.body.docid}`);

                return null;
            }, (err) => {

                if (err) logger.error(`${err} - Error occured in sendEmailToInvestor`);
                if (req.body.id1 === '1') {
                    req.flash('errorMessage', 'Error occured sending email');
                    return res.redirect(`KYCView?id=${req.body.id2}&link=${req.body.link}`);
                }
                if (req.body.id1 === '2') {
                    req.flash('errorMessage', 'Error occured sending email');
                    return res.redirect(`investorsViewSto?id=${req.body.id2}`);
                }
                if (req.body.id1 === '3') {
                    req.flash('errorMessage', 'Error occured sending email');
                    return res.redirect(`investorsViewSto?id=${req.body.id2}`);
                }
                if (req.body.id1 === '4') {
                    req.flash('errorMessage', 'Error occured sending email');
                    return res.redirect(`viewsenddoccontracts?id=${req.body.docid}`);
                }


                return null;
            });
        }, (err) => {
            common.handleError(req, res, `${err.message} - 2 Error occured in sendEmailToInvestor`);
        });

	},

    paymentchannels(req, res) {
        const sql = 'select *, p.id as paymentchannelid, p.title as channelTitle, b.title as blockchainName from paymentchannels p inner join currency c on  p.currencyid = c.id left join blockchains b on b.id=c.blockchainID where stoid = ?';
        mysql.executeSQLStatement(sql, [req.session.stoid]).then((result) => {
            res.render('admin/public/paymentchallenls', {
                Records: result,
                errorMessage: req.flash('paymentErrorMessage'),
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in doclinksdocuments`);
        });
    },
    activatePaymentChannel(req, res) {

        const sql = 'update paymentchannels set isActive = ? where id = ? and stoid = ?';
        mysql.executeSQLStatement(sql, [req.query.status, req.query.id, req.session.stoid]).then((result) => {
            res.redirect("/admin/paymentchannels");
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in activatePaymentChannel`);
        });
    },

    addsendinvestorpayment(req, res) {
        const sql = 'select i.ID, i.FirstName, i.LastName from investor i, investorsto s where i.id = ? and i.id = s.investorid and s.stoid = ?';
        mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((record) => {

            if(record.length == 0) {
                common.handleError(req, res, `Admin ${req.session.user.ID} is trying to send payemnt alter to investor ${req.query.id} who do not belong to this STO. Error in addsendinvestorpayment`);
                return;
            }

            const sql = 'select * from paymentchannels where stoid = ?; select * from currency; select id, title from sharetypes where stoid = ?';
            mysql.executeSQLStatement(sql, [req.session.stoid, req.session.stoid]).then((result) => {
                res.render('admin/public/sendpayment', {
                    csrfToken: req.csrfToken(),
                    Investor: record[0],
                    Records: result[0],
                    currency: result[1],
                    sharetypes: result[2],
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                });
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in addsendinvestorpayment`);
            });

        });
    },
    sendpaymentalerttoinvestor(req, res) {
        const params = {};

        if(  req.body.details.length > 3500  ) {
            common.handleError(req, res, `details value is > 300 Error occured in sendpaymentalerttoinvestor`);
            return;
        }

        if(  req.body.internalnotes.length > 3500  ) {
            common.handleError(req, res, `internalnotes value is > 3500 Error occured in sendpaymentalerttoinvestor`);
            return;
        }

        if(  req.body.amount.length > 10  ) {
            common.handleError(req, res, `amount value is > 10 Error occured in sendpaymentalerttoinvestor`);
            return;
        }

        if(  req.body.sharesno.length > 10  ) {
            common.handleError(req, res, `sharesno value is > 10 Error occured in sendpaymentalerttoinvestor`);
            return;
        }

        if(  req.body.sharetypeid.length > 10  ) {
            common.handleError(req, res, `sharetypeid value is > 10 Error occured in sendpaymentalerttoinvestor`);
            return;
        }

        if(  req.body.currencyid.length > 3  ) {
            common.handleError(req, res, `currencyid value is > 10 Error occured in sendpaymentalerttoinvestor`);
            return;
        }

        function checkinvestor(callback) {
            const sql = 'select i.ID, i.FirstName, i.LastName, i.email from investor i, investorsto s where i.id = ? and i.id = s.investorid and s.stoid = ?';
            mysql.executeSQLStatement(sql, [req.body.id, req.session.stoid]).then((record) => {
                if(record.length == 0) {
                    common.handleError(req, res, `Admin ${req.session.user.ID} is trying to send payemnt alter to investor ${req.query.id} who do not belong to this STO. Error in sendpaymentalerttoinvestor`);
                    return;
                }

                params.investorec = record[0];
                callback(null);
            });
        }
        function saverec(callback) {
            const sql = 'insert into paymentinvestors(stoid, Investorid, paymentChannelID, userid, Details, PaymentSendDate, isSettled, InternalNotes, paymentRequested, currencyIDRequested, sharesOffered, sharesTypeOffered) values (?, ?, ?, ?, ?, now(), ?, ?, ?, ?, ?, ?)';
            mysql.executeSQLStatement(sql, [req.session.stoid, req.body.id, req.body.paymentchannelid, req.session.user.ID, req.body.details, 0, req.body.internalnotes, req.body.amount, req.body.currencyid, req.body.sharesno, req.body.sharetypeid]).then((result) => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in sendpaymentalerttoinvestor`);
            });
        }
        function sendEmail(callback) {
          const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
          if (!stoEmailTexts) throw new Error(`Email texts not found for paymentAlert`);

          let txtEmail = emailTextsController.format(stoEmailTexts.paymentAlert.Line1, {
            firstname: params.investorec.FirstName,
            lastname: params.investorec.LastName,
            details: req.body.details,
            amount: `${common.getCurrentcySymbol(parseInt(req.body.currencyid, 10))} ${req.body.amount}`,
          });
          txtEmail += '<br /><br />';
          txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

            // let txtEmail = '';
            // txtEmail = `Dear ${params.investorec.FirstName} ${params.investorec.LastName} <br /><br />`;
            // txtEmail += `${emailTexts.paymentAlert.Line1} <br /><br />`;
            // txtEmail += `${req.body.details} <br /><br />`;
            // txtEmail += `<b>Amount Requested ${common.getCurrentcySymbol( parseInt(req.body.currencyid) )} ${req.body.amount}</b> <br /><br />`;
            // txtEmail += `${emailTexts.paymentAlert.Line2} <br /><br />`;
            // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

            common.sendEmail(req.hostname, params.investorec.email, `Payment Alert from ${getSTOFromConfig(req.session.stoid).title}`, txtEmail, [])
            .then(() => {
                req.flash('errorMessage', "Payment alert is added in DB");
                callback(null);
            }, (err) => {
                req.flash('errorMessage', "Payment alert is added in DB. Error occured sending email");
                callback(null);
            });
        }
        async.waterfall([
            checkinvestor,
			saverec,
            sendEmail
        ], function (err) {
            if (!err) {
                res.redirect("/admin/investorsViewSto?id=" + req.body.id);
            }
        });

    },
    deletePatmentAlert(req, res) {

        const sql = 'select i.ID, i.FirstName, i.LastName from investor i, investorsto s where i.id = ? and i.id = s.investorid and s.stoid = ?';
        mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((record) => {

            if(record.length == 0) {
                common.handleError(req, res, `Admin ${req.session.user.ID} is trying to delete payemnt alter to investor ${req.query.id} who do not belong to this STO. Error in deletePatmentAlert`);
                return;
            }

            const sql = 'delete from paymentinvestors where id = ? and investorid = ? and stoid = ?';
            mysql.executeSQLStatement(sql, [req.query.pid, req.query.id, req.session.stoid]).then((result) => {
                req.flash('errorMessage', 'Payment Record Deleted');
                res.redirect("/admin/investorsViewSto?id=" + req.query.id);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in deletePatmentAlert`);
            });

        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in deletePatmentAlert`);
        });

    },
    viewInvestorPaymemtDetails(req, res) {

        const sql = `select p.ID, p.Investorid, paymentChannelID, paymentChannelDetails, c.title as PaymentTitle, c.paymentDetails as PaymentDetails, isSettled, DATE_FORMAT(PaymentSendDate,'%M %d %Y') as PaymentSendDate, currencyIDRequested, paymentRequested, DATE_FORMAT(PaymentReceiveDate,'%M %d %Y') as PaymentReceiveDate, currencyIDReceived, paymentReceived, InternalNotes, InvestorComments, Details, sharesOffered, s.title as ShareTypeText from paymentinvestors p, paymentchannels c, sharetypes s where p.paymentChannelID = c.id and p.id = ? and p.stoid = ? and p.paymentChannelID = c.id and s.id = p.sharesTypeOffered`;
        mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((paymentrecord) => {

            const sql = 'select ID, FirstName, LastName from investor where id = ?; select ID, Abbreviation from currency;';
            mysql.executeSQLStatement(sql, [paymentrecord[0].Investorid]).then((result) => {
                res.render('admin/public/paymentdetails', {
                    investor: result[0][0],
                    paymentrec: paymentrecord[0],
                    currency: result[1],
                    csrfToken: req.csrfToken(),
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                });
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in viewInvestorPaymemtDetails`);
            });

        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in viewInvestorPaymemtDetails`);
        });

    },
    settleinvestorpayment(req, res) {

        const sql = 'select * from paymentchannels where id =?';
        mysql.executeSQLStatement(sql, [req.body.channelid]).then((result) => {

                const sql = 'update paymentinvestors set paymentReceived = ?, currencyIDReceived = ?, InternalNotes = ?, isSettled = 1, PaymentReceiveDate = ?, paymentChannelDetails = ? where id = ? and stoid = ? and isSettled = 0';
                mysql.executeSQLStatement(sql, [req.body.settleamount, req.body.settlecurrencyid, req.body.internalnotes, req.body.txtDate, "<b>" + result[0].title + "</b><br />" + result[0].paymentDetails, req.body.id, req.session.stoid]).then((result) => {
                    res.redirect("viewInvestorPaymemtDetails?id=" + req.body.id);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in settleinvestorpayment`);
                });

        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in settleinvestorpayment`);
        });

    },


    showINvestorTransferDetailsForApproval(req, res) {
            const params = {}

            function getDatabaseInformation(callback) {
                  const sql = `select d.*, cc.isBlockchainBased, DATE_FORMAT(DateReceived,'%M %d %Y') as alertDateReceived, s.title, s.paymentDetails, i.FirstName, i.LastName, i.ID as investorID, i.investorType, i.CompanyName, s.conversionEnabled,  s.currencyToConvert, s.conversionRate from InvestorDepositReceivedAlert d, paymentchannels s, investor i, currency cc where cc.id = d.currencyid and d.id = ? and s.id = d.ChannelID and i.id = d.investorID`;
                  mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {

                        if(result[0].isApproved != 0) {
                            common.handleError(req, res, `showINvestorTransferDetailsForApproval  admin ${req.session.user.ID} try to access a payment request that has alread been processed  `);
                        } else {
							params.rec = result[0];
							callback(null);
						}

                  }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - showINvestorTransferDetailsForApproval Error occured `);
                  });
            }
            function getConversionRateLock(callback) {
                const sql = `SELECT crLock.* FROM InvestorDepositReceivedAlert alert INNER JOIN ConversionRateLocks crLock on crLock.id = alert.conversionRateLock WHERE alert.id = ?`;
                mysql.executeSQLStatement(sql, [req.query.id])
                .then((record) => {
                    [params.conversionRateLock] = record;
                    params.rec.conversionRate = params.conversionRateLock?.rate ?? params.rec.conversionRate;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error in showINvestorTransferDetailsForApproval occured getConversionRateLock`);
                });
            }
            async.waterfall([
                    getDatabaseInformation,
                    getConversionRateLock,
            ], function (err) {

					var amountConversion = 0;
					if( params.rec.conversionEnabled == 1 ) {
						amountConversion = math.number(math.multiply(math.bignumber(params.rec.Amount ?? 0), math.bignumber(params.rec.conversionRate ?? 0))); // params.rec.Amount  *  params.rec.conversionRate;
					}

                    res.render('admin/singlecompany/showINvestorTransferDetailsForApproval', {
						web3Address: global.config.web3Address,
                        record: params.rec,
						amountConversion: amountConversion,
                        csrfToken: req.csrfToken(),
                        Data: common.getCommonPageProperties(req),
                        partials: common.getPartials(),
                        UserMessage: req.flash('UserMessage')
                    });
            });

    },
    approveInvestorFundsTransferInAccount(req, res) {
            const params = {};

            function getDatabaseInformation(callback) {
                  const sql = `select * from InvestorDepositReceivedAlert where id = ? and storid = ?`;
                  mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                        params.rec = result[0];
                        callback(null);
                  }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured `);
                  });
            }
            function getInvestorRecord(callback) {
                  const sql = `select firstname, lastname, email from investor where id = ?`;
                  mysql.executeSQLStatement(sql, [params.rec.investorID]).then((result) => {
                        params.investorec = result[0];
                        callback(null);
                  }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured `);
                  });
            }
            function getCurrencyOfChannel(callback) {
                  const sql = `select ID, currencyID, conversionEnabled, currencyToConvert, conversionRate from paymentchannels where id = ?`;
                  mysql.executeSQLStatement(sql, [params.rec.ChannelID]).then((result) => {
                        params.channelRecord = result[0];
                        callback(null);
                  }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error in approveInvestorFundsTransferInAccount occured getCurrencyOfChannel`);
                  });
            }
            function getConversionRateLock(callback) {
                const sql = `SELECT crLock.* FROM InvestorDepositReceivedAlert alert INNER JOIN ConversionRateLocks crLock on crLock.id = alert.conversionRateLock WHERE alert.id = ?`;
                mysql.executeSQLStatement(sql, [req.query.id])
                .then((record) => {
                    [params.conversionRateLock] = record;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error in approveInvestorFundsTransferInAccount occured getConversionRateLock`);
                });
            }
			function updateInvestorBalance(callback)  {
                /* moved to conversion at the time of purchase
                if( params.channelRecord.conversionEnabled == 1 )
                    params.currencyID = params.channelRecord.currencyToConvert;
                else
                    */
                    params.currencyID = params.channelRecord.currencyID;

                if (Number.isNaN(params.rec?.Amount)) {
                    common.handleError(req, res, `Amount is NaN - Error in approveInvestorFundsTransferInAccount occured updateInvestorBalance`);
                }
                    params.calculatedAmount = params.rec.Amount;

                if (params.rec.isWithdrawFundsRequest) {
                    wallet.reduceInvestorBalance(params.rec.investorID, req.session.stoid, params.currencyID, params.calculatedAmount, req.session.user.ID, 5,``, 0, global.config.investorInternalWalletProjectSpecific).then(() => {

                        wallet.getInvestorBalance(params.rec.investorID, req.session.stoid, params.currencyID, global.config.investorInternalWalletProjectSpecific).then((balance) => {
                            params.currentAmount = balance;
                            callback(null);
                        })

                    }).catch((error) => {
                        req.flash('UserMessage', error.message);
                        res.redirect(`/admin/showINvestorTransferDetailsForApproval?id=${req.query.id}`);
                    });
                } else {
                    // console.log(`${params.rec.investorID}, ${req.session.stoid}, ${params.currencyID}, ${params.calculatedAmount}, ${req.session.user.ID}, 5, -1,\`\`, 0, ${global.config.investorInternalWalletProjectSpecific}`);
                    wallet.increaseInvestorBalance(params.rec.investorID, req.session.stoid, params.currencyID, params.calculatedAmount, req.session.user.ID, 5, -1,``, 0, global.config.investorInternalWalletProjectSpecific).then(() => {
                        wallet.getInvestorBalance(params.rec.investorID, req.session.stoid, params.currencyID, global.config.investorInternalWalletProjectSpecific)
                        .then((balance) => {
                            params.currentAmount = balance;
                            callback(null);
                        }).catch((error) => {
                            req.flash('UserMessage', `Server error`);
                            const err = new Error(error);
                            logger.error(err.stack);
                            res.redirect(`/admin/showINvestorTransferDetailsForApproval?id=${req.query.id}`);
                        });

                    });
                }
			}
            function updateRecord(callback) {
                let newDescription = params.rec.Details;
                let paymentDescription;
                /* moved to conversion at the time of purchase
                if( params.channelRecord.conversionEnabled == 1 ) {
                    const conversionRate = params.conversionRateLock?.rate ?? params.channelRecord.conversionRate; // If a locked rate exists, use that, otherwise use channel's conversion rate
                    const rateLockedAt = params.conversionRateLock?.lockedAt;
                    paymentDescription = `. Deposit payment received for investor ID: ${params.rec.investorID}, amount: ${ common.getCurrentcySymbol(params.rec.currencyID)} ${params.rec.Amount} and settled in ${common.getCurrentcySymbol(params.currencyID)} ${params.calculatedAmount} at conversion rate ${common.getCurrentcySymbol(params.channelRecord.currencyToConvert)} ${conversionRate}.${params.conversionRateLock ? ` Conversion rate was last updated and locked at ${params.conversionRateLock.lockedAt} using a price oracle.` : ``}`;
                    newDescription = newDescription + paymentDescription;
                } else {

                 */
                paymentDescription = `Deposit payment received for investor ID: ${params.rec.investorID}, amount: ${ common.getCurrentcySymbol(params.rec.currencyID)} ${params.rec.Amount}`;
                logger.error(`paymentDescription: ${paymentDescription}`);

                const sql = `
                    UPDATE InvestorDepositReceivedAlert set isApproved = 1, Amount = ?, runningBalance = ?, ApprovedByUserID = ?, currencyID = ?, details = ?, DateApproved = now() where id = ?;
                    INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);`;
                mysql.executeSQLStatement(sql, [
                    params.calculatedAmount,  params.currentAmount, req.session.user.ID, params.currencyID, newDescription, req.query.id,
                    req.session.stoid, req.session.user.ID, paymentDescription, params.rec.investorID, 18, req.query.id,
                ])
                .then(() => {
                    priceOracle.releaseConversionRateLocks(req.session.stoid, params.rec.investorID, params.channelRecord.ID);
                    logger.info(`Funds Deposited In Wallet. STO ID: ${req.session.stoid} User ID: ${req.session.user.ID} Investor ID: ${params.rec.investorID} Activity Type ID: 18 Rec ID: ${req.query.id}`);
                })
                .then((result) => {
                    callback(null);
                }).catch((error) => {
                    const err = new Error(error);
                    common.handleError(req, res, `${error.stack} - Error occured `);
                });
            }
			function checkInvestorIsPartOfThisSTO(callback) {
                  const sql = `select id, stoid from investorsto where investorID = ? and stoid = ?`;
                  mysql.executeSQLStatement(sql, [params.rec.investorID, req.session.stoid]).then((result) => {
                        if(result.length == 0) {
								const stmt = `insert into investorsto(investorid, isAccountClosed, stoid, expectedShares, expectedInvestment, isKYC, KYCApplied, KYCCurrentStatus, isActive) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
								mysql.executeSQLStatement(stmt, [params.rec.investorID, 0, req.session.stoid, 0, 0, 1, 0, global.config.DefaultInvstorKYCStatusWhenActivatedInProject, 1]).then((result) => {
										callback(null);
								}).catch((error) => {
										common.handleError(req, res, `${error.message} Error activateNewInvestorInSTO`);
								});
						}
					  	else {
                        	callback(null);
						}
                  }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in Error in approveInvestorFundsTransferInAccount checkInvestorIsPartOfThisSTO`);
                  });
			}
            function sendEmail(callback) {
              const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
              if (!stoEmailTexts) throw new Error(`Email texts not found for depositApproved`);
              const currency = common.getCurrentcySymbol(params.channelRecord.currencyID);

              let txtEmail = emailTextsController.format(stoEmailTexts.depositApproved.Line1, {
                firstname: params.investorec.firstname,
                lastname: params.investorec.lastname,
                type: params.rec.isWithdrawFundsRequest ? 'Amount Sent and confirmed' : 'Amount Received and confirmed',
                amount: `${currency} ${params.rec.Amount}`,
                balance: `${currency} ${params.currentAmount}`,
              });
              txtEmail += '<br /><br />';
              txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;
                    // let txtEmail = '';
                    // txtEmail = `Dear ${params.investorec.firstname} ${params.investorec.lastname} <br /><br />`;
                    // txtEmail += `${emailTexts.depositApproved.Line1} <br /><br />`;
                    // if (params.rec.isWithdrawFundsRequest) {
                    //     txtEmail += `Amount Sent and confirmed`;
                    // } else {
                    //     txtEmail += `Amount Received and confirmed`;
                    // }
                    // txtEmail += `&nbsp;&nbsp;&nbsp;   <b> ${common.getCurrentcySymbol(params.channelRecord.currencyID)}  ${params.rec.Amount} <b>    <br /><br />`;
                    // txtEmail += `Your New Balance   &nbsp;&nbsp;&nbsp;   <b>  ${common.getCurrentcySymbol(params.currencyID)}  ${params.currentAmount} <b>    <br /><br />`;
                    // txtEmail += `${emailTexts.depositApproved.Line2} <br /><br />`;
                    // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;
                    common.sendEmail(req.hostname, params.investorec.email, emailTexts.depositApproved.Subject, txtEmail, [])
                    .then(() => {
                        callback(null);
                    }, (err) => {
                        callback(null);
                    });
            }
            function notifyBimount(callback) {
                if (params.rec.isWithdrawFundsRequest) {
                    callback(null);
                } else {
                    bimountDepositNotification(req.query.id).catch(logger.error).then(callback);
                }
            }
            async.waterfall([
                getDatabaseInformation,
                getInvestorRecord,
                getCurrencyOfChannel,
                getConversionRateLock,
                updateInvestorBalance,
                updateRecord,
				checkInvestorIsPartOfThisSTO,
                sendEmail,
                notifyBimount
            ], function (err) {
                    common.removeRedisKey(req, "dashboard").then(() => {
                            res.redirect("dashboardsto");
                    }).catch((error) => {
                        common.handleError(req, res, `${error.message} - Error occured in  dashboardsto loadData`);
                    });
            });

    },
    rejectInvestorFundsTransferInAccount(req, res) {
            const params = {};

            function getDatabaseInformation(callback) {
                  const sql = `select * from InvestorDepositReceivedAlert where id = ?`;
                  mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                        params.rec = result[0];
                        callback(null);
                  }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured `);
                  });
            }
            function getInvestorRecord(callback) {
                  const sql = `select firstname, lastname, email from investor where id = ?`;
                  mysql.executeSQLStatement(sql, [params.rec.investorID]).then((result) => {
                        params.investorec = result[0];
                        callback(null);
                  }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured `);
                  });
            }
            function getCurrencyOfChannel(callback) {
                  const sql = `select currencyID from paymentchannels where id = ?`;
                  mysql.executeSQLStatement(sql, [params.rec.ChannelID]).then((result) => {
                        params.currencyID = result[0].currencyID;
                        callback(null);
                  }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured `);
                  });
            }
            function updateRecord(callback) {
                let logDescription;
                const sql = `
                    update InvestorDepositReceivedAlert set isApproved = 2 where id = ?;
                    INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);
                    `;
                logDescription = `Admin Declining a Payment Request. InvestorDepositReceivedAlert.ID: ${req.query.id}`;
                mysql.executeSQLStatement(sql, [
                    req.query.id, req.session.stoid, req.session.user.ID, logDescription,
                    params.rec.investorID, 27, req.query.id
                ]).then((result) => {
                    logger.info(`Admin Declining a Payment Request. InvestorDepositReceivedAlert.ID: ${req.query.id} STO ID: ${req.session.stoid} User ID: ${req.session.user.ID} Investor ID: ${params.rec.investorID} Activity Type ID: 27 Rec ID: ${req.query.id}`);
                    callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.toString()} - Error occured rejectInvestorFundsTransferInAccount`);
                  });
            }
            function sendEmail(callback) {
              const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
              if (!stoEmailTexts) throw new Error(`Email texts not found for depositDeclined`);

              let txtEmail = emailTextsController.format(stoEmailTexts.depositDeclined.Line1, {
                firstname: params.investorec.firstname,
                lastname: params.investorec.lastname,
                amount: `${common.getCurrentcySymbol(params.currencyID)}  ${params.rec.Amount}`,
              });
              txtEmail += '<br /><br />';
              txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;
                    // let txtEmail = '';
                    // txtEmail = `Dear ${params.investorec.firstname} ${params.investorec.lastname} <br /><br />`;
                    // txtEmail += `${emailTexts.depositDeclined.Line1} <br /><br />`;
                    // txtEmail += `Amount Received and declined   &nbsp;&nbsp;&nbsp;   <b> ${common.getCurrentcySymbol(params.currencyID)}  ${params.rec.Amount} <b>    <br /><br />`;
                    // txtEmail += `${emailTexts.depositDeclined.Line2} <br /><br />`;
                    // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;
                    common.sendEmail(req.hostname, params.investorec.email, emailTexts.depositDeclined.Subject, txtEmail, [])
                    .then(() => {
                        callback(null);
                    }, (err) => {
                        callback(null);
                    });
            }
            async.waterfall([
                getDatabaseInformation,
                getInvestorRecord,
                getCurrencyOfChannel,
                updateRecord,
                sendEmail
            ], function (err) {
                    common.removeRedisKey(req, "dashboard").then(() => {
                            res.redirect("dashboardsto");
                    }).catch((error) => {
                        common.handleError(req, res, `${error.message} - Error occured in  rejectInvestorFundsTransferInAccount`);
                    });
            });
    },

    polymeshtransactions(req, res) {
        const params = {};

        function getDatabaseInformation(callback) {
            if(req.query.id == undefined) {            
                const stmt = `Select b.ID, i.FirstName, i.LastName, b.amountToSend, s.title from investor i, sharetypes s, blockchainSharesTransferTransactions b where s.blockchainProtocol = 7 and s.id = b.shareTypeID and b.investorid = i.id and b.polymeshInstructionStatus = 0 and s.stoid = ?; 
                Select b.ID, i.FirstName, i.LastName, b.amountToSend, s.title from investor i, sharetypes s, blockchainSharesTransferTransactions b where s.blockchainProtocol = 7 and s.id = b.shareTypeID and b.investorid = i.id and b.polymeshInstructionStatus = 1 and s.stoid = ? limit 200;`
                mysql.executeSQLStatement(stmt, [req.session.stoid, req.session.stoid]).then((result) => {
                    params.pendingRecords = result[0];
                    params.settleRecords = result[1];
                    callback(null);
                }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in  dashboardsto checkPolymeshRecords`);
                });  
            } else {
                params.records = "";
                callback(null);
            }   
        }
        function getSingleRecord(callback) {
            if(req.query.id != undefined) {
                const stmt = "select * from investor i, sharetypes s, blockchainSharesTransferTransactions b where s.blockchainProtocol = 7 and s.id = b.shareTypeID and b.investorid = i.id and b.id = ?";
                mysql.executeSQLStatement(stmt, [req.query.id]).then((result) => {
                    params.showRecord = 1;
                    params.rec = result[0];
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message}Error occured in  dashboardsto checkPolymeshRecords`);
                });
            } else {
                params.showRecord = 0;
                params.rec = "";
                callback(null);                
            }
        }
        async.waterfall([
            getDatabaseInformation,
            getSingleRecord
        ], function (err) {
            res.render('admin/polymeshTransactionsList', {
                pendingRecords: params.pendingRecords,
                settleRecords: params.settleRecords,
                showRecord: params.showRecord,
                rec: params.rec,
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
                csrfToken: req.csrfToken()
            });
        });
    },
      
    changeinvestorauth(req, res) {
        const stmt = 'Update users set twofactorenable = ? where id = ?';
        mysql.executeSQLStatement(stmt, [req.query.auth, req.session.user.ID]).then((result) => {
            res.redirect("/admin/settings");
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in changeinvestorauth`);
        });
    },

    doneBulkUploadInvestor(req, res) {
        const stmt = 'Update investor set investorBulkUploadStatus = 0 where id = ?';
        mysql.executeSQLStatement(stmt, [req.query.id]).then((result) => {
            res.redirect("investorsViewSto?id=" + req.query.id);
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in doneBulkUploadInvestor`);
        });
    },

    uploadFiles(req, res) {
       common.uploadMultipleFiles(req).then((files) => {
            res.json(files);
       }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in changeinvestorauth`);
       });
    },
    /*uploadFiles2(req, res) {
        var j = JSON.parse(  req.body.fil1 );
        const newLoc = common.getUserFileLocation( path.join(__dirname, "../temp2") )

        common.moveMultipleFilesToLocation(j, newLoc, req.hostname + "-").then(() => {
            res.send("check");
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in changeinvestorauth`);
        });
    }*/

    generatePDFFile(req, res) {


        /*pdf.create(req.body.pdfHTMLText).toStream(function(err, stream){
            if (err) {
                console.log(err)
            } else {
                res.set('Content-type', 'application/pdf');
                stream.pipe(res)
            }
        });*/

    },
    viewaccreditionrequests(req, res){
       const params = {
            Data: common.getCommonPageProperties(req),
            partials: common.getPartials(),
            csrf: req.csrfToken(),
        };
        async function getAccreditionList(callback) {
            let entities = await getAccreditionsWithWaitingStatus(req);
            params.entities = entities;
            callback(null)

        }
        async.waterfall([
            getAccreditionList,
            function render(){

                res.render('admin/accreditation',params)
            }
        ])
        
    },
    async setApiAccreditationStatus(req, res){
        await setAccreditationStatus(req, res)        
    }
};

router.get('/login2', index.login2);
router.post('/login2post', index.login2post);

router.get('/dashboardsto', common.isAdminUserAuthenticated, index.dashboardsto);
router.get('/showChangeAddressRequests', common.isAdminUserAuthenticated, index.showChangeAddressRequests);

router.get('/newtoken', common.isAdminUserAuthenticated, index.newtoken); // generate form
router.post('/generatetoken', common.isAdminUserAuthenticated, index.generatetoken); // generate new token
router.post('/burntokeninblockchain', common.isAdminUserAuthenticated, index.burntokeninblockchain); // burn
//router.get('/refreshDistributionAccountTokens', common.isAdminUserAuthenticated, index.refreshDistributionAccountTokens);
router.get('/approveshares', common.isAdminUserAuthenticated, index.approveshares);
router.post('/approveShareCreation', common.isAdminUserAuthenticated, index.approveShareCreation);
router.get('/refreshBlockchainBalances', common.isAdminUserAuthenticated, index.refreshBlockchainBalances);

router.get('/voting', common.isAdminUserAuthenticated, index.voting);
router.get('/votingdetails', common.isAdminUserAuthenticated, index.votingdetails);
router.get('/votingedit', common.isAdminUserAuthenticated, index.votingedit);
router.get('/meetingedit', common.isAdminUserAuthenticated, index.meetingedit);
router.get('/extendMeetingTime', common.isAdminUserAuthenticated, index.extendMeetingTime);
router.post('/meetingEditPost', common.isAdminUserAuthenticated, index.meetingEditPost);
router.post('/meetingAgendaItemComments', common.isAdminUserAuthenticated, index.meetingAgendaItemComments);
router.get('/deleteAgendaItem', common.isAdminUserAuthenticated, index.deleteAgendaItem);
router.get('/activateAgendaItem', common.isAdminUserAuthenticated, index.activateAgendaItem);
router.get('/enableAgendaItemForDiscussion', common.isAdminUserAuthenticated, index.enableAgendaItemForDiscussion);
router.get('/agendaitem', common.isAdminUserAuthenticated, index.agendaitem);
router.get('/meetingView', common.isAdminUserAuthenticated, index.meetingView);
router.post('/agendaItemPost', common.isAdminUserAuthenticated, index.agendaItemPost);
router.post('/scheduleMeeting', common.isAdminUserAuthenticated, index.scheduleMeeting);
router.get('/sendEmailToProxyPerson', common.isAdminUserAuthenticated, index.sendEmailToProxyPerson);
router.get('/unscheduleMeeting', common.isAdminUserAuthenticated, index.unscheduleMeeting);
router.post('/uploadAgendDocument', common.isAdminUserAuthenticated, index.uploadAgendDocument);
router.post('/createNewVotingCampaign', common.isAdminUserAuthenticated, index.createNewVotingCampaign);
router.get('/deleteVoting', common.isAdminUserAuthenticated, index.deleteVoting);
router.get('/deleteagendadocument', common.isAdminUserAuthenticated, index.deleteagendadocument);
router.get('/downloadAgendaIemDocument', common.isAdminUserAuthenticated, index.downloadAgendaIemDocument);
router.get('/activateDeactivateProxyLink', common.isAdminUserAuthenticated, index.activateDeactivateProxyLink);


router.get('/polledit', common.isAdminUserAuthenticated, index.polledit);
router.post('/polleditpost', common.isAdminUserAuthenticated, index.polleditpost);
router.get('/viewpublicpoll', common.isAdminUserAuthenticated, index.viewpublicpoll);
router.get('/deletePublicVoting', common.isAdminUserAuthenticated, index.deletePublicVoting);

//router.get('/activitylog', common.isAdminUserAuthenticated, index.activitylog); // activity logs
router.get('/activitylogsto', common.isAdminUserAuthenticated, index.activitylogsto); // activity logs

router.get('/updates', common.isAdminUserAuthenticated, index.updates);
router.get('/updateDetails', common.isAdminUserAuthenticated, index.updateDetails);
router.get('/deleteUpdate', common.isAdminUserAuthenticated, index.deleteUpdate);
router.get('/addEditUpdate', common.isAdminUserAuthenticated, index.addEditUpdate);
router.post('/updatesPost', upload.single('cover'), common.isAdminUserAuthenticated, index.updatesPost);
router.get('/stopublic', common.isAdminUserAuthenticated, index.stopublic);
router.get('/stopublicedit', common.isAdminUserAuthenticated, index.stopublicedit);
router.post('/saveHTMLSection', common.isAdminUserAuthenticated, index.saveHTMLSection);
router.get('/stopublicdelete', common.isAdminUserAuthenticated, index.stopublicdelete);
router.get('/stopublicenabled', common.isAdminUserAuthenticated, index.stopublicenabled);
router.get('/enableDisablePublicSTO', common.isAdminUserAuthenticated, index.enableDisablePublicSTO);

router.get('/inbox', common.isAdminUserAuthenticated, index.inbox);
router.get('/email', common.isAdminUserAuthenticated, index.email);
router.post('/emailResponse', common.isAdminUserAuthenticated, index.emailResponse);

router.post('/changePassword', common.isAdminUserAuthenticated, index.changePassword);
router.post('/sendEmailToInvestor', common.isAdminUserAuthenticated, index.sendEmailToInvestor);
router.get('/shares', common.isAdminUserAuthenticated, index.shares);
router.get('/shares/legacy', common.isAdminUserAuthenticated, index.shares_legacy);
router.get('/sharessummary', common.isAdminUserAuthenticated, index.sharessummary);
router.get('/shareshistory', common.isAdminUserAuthenticated, index.shareshistory);


router.get('/bulkEmail', common.isAdminUserAuthenticated, index.bulkEmail);
router.post('/sendBulkEmail', common.isAdminUserAuthenticated, index.sendBulkEmail);

router.get('/settings', common.isAdminUserAuthenticated, index.settings);
router.post('/updateDisclaimer', common.isAdminUserAuthenticated, index.updateDisclaimer);
router.post('/updateEmailFooter', common.isAdminUserAuthenticated, index.updateEmailFooter);
router.post('/updateRegistrationText', common.isAdminUserAuthenticated, index.updateRegistrationText);
router.post('/changelogosite', common.isAdminUserAuthenticated, index.changelogosite);
router.post('/changebannersite', common.isAdminUserAuthenticated, index.changebannersite);
router.post('/changetellafriend', common.isAdminUserAuthenticated, index.changetellafriend);

router.post('/uploadFiles', common.isAdminUserAuthenticated, index.uploadFiles);
router.post('/generatePDFFile', common.isAdminUserAuthenticated, index.generatePDFFile);

router.get('/paymentchannels', common.isAdminUserAuthenticated, index.paymentchannels);
router.get('/addsendinvestorpayment', common.isAdminUserAuthenticated, index.addsendinvestorpayment);
router.get('/activatePaymentChannel', common.isAdminUserAuthenticated, index.activatePaymentChannel);
router.post('/sendpaymentalerttoinvestor', common.isAdminUserAuthenticated, index.sendpaymentalerttoinvestor);
router.get('/deletePatmentAlert', common.isAdminUserAuthenticated, index.deletePatmentAlert);
router.get('/viewInvestorPaymemtDetails', common.isAdminUserAuthenticated, index.viewInvestorPaymemtDetails);
router.post('/settleinvestorpayment', common.isAdminUserAuthenticated, index.settleinvestorpayment);

router.get('/showINvestorTransferDetailsForApproval', common.isAdminUserAuthenticated, index.showINvestorTransferDetailsForApproval);
router.get('/approveInvestorFundsTransferInAccount', common.isAdminUserAuthenticated, index.approveInvestorFundsTransferInAccount);
router.get('/rejectInvestorFundsTransferInAccount', common.isAdminUserAuthenticated, index.rejectInvestorFundsTransferInAccount);

router.get('/polymeshtransactions', common.isAdminUserAuthenticated, index.polymeshtransactions);

router.get('/viewaccreditionrequests', common.isAdminUserAuthenticated, index.viewaccreditionrequests);
router.post('/setApiAccreditationStatus', common.isAdminUserAuthenticated, index.setApiAccreditationStatus)
router.get('/changeinvestorauth', common.isAdminUserAuthenticated, index.changeinvestorauth);

router.get('/doneBulkUploadInvestor', common.isAdminUserAuthenticated, index.doneBulkUploadInvestor);

//public interfaces
router.get('/getSTOList', index.getSTOList);
router.get('/getSTODetails', index.getSTODetails);



module.exports = router;
