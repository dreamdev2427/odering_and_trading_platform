/* eslint-disable no-param-reassign */
import * as math from "mathjs";
import path from "path";

import approveAffiliateInvestor from './investors/affiliateCtl/approveAffiliateInvestor';
import registerAffiliateInvestorFromEmail from './investors/affiliateCtl/registerAffiliateInvestorFromEmail';
import wallet from './investors/paymentsCtl/wallet';
import getInvestingEntityDetails from "./stoAdmin/investingEntity/getInvestingEntityDetails";
import * as emailTextsController from '../services/platform/emails/controllers/EmailTexts.controller';
import getSTOFromConfig from '../services/getSTOFromConfig';
import postAccreditEntity from "./stoAdmin/investingEntity/post-Accredit-Entity";
import postUpdateInvestorKyc from "./stoAdmin/investor/post-update-investor-kyc";
import getNonKycInvestorsFromApi, { getInvestorInvitations } from "./stoAdmin/investor/get-nonKyc-investors-from-api";
import reviewInvestorTransactionAlert from "./share-transfer/review-investor-transaction-alert";
import transactionTransferShares from "./share-transfer/transaction-transfer-shares";
import { mutation$ } from "../graphql/fetchers";

const express = require('express');

const router = express.Router();
const async = require('async');
const fs = require('fs-extra');
const validator = require('validator');
const request = require('request');
const mainFilename = require("require-main-filename")();
const logger = require('../logger');
const mysql = require('../modules/mysql');
const common = require('../modules/common');
const blockchainApi = require('../modules/blockchain');
const ethereumApi = require('../modules/ethereum');
const refreshBlockchain = require('../modules/refreshBlockchain');
const { default: getInvestorsDividendsOverview } = require('./investors/dividendsCtl/getInvestorsDividendsOverview');
const { default: getInvestorsAffiliateOverview } = require('./investors/affiliateCtl/getInvestorsAffiliateOverview');
const { default: getReferralNetworkDetails } = require('./investors/affiliateCtl/getReferralNetworkDetails');
const emailTexts = require('../data/text.json');

const investorsAPI = {

	investorsListSto(req, res) {

		common.checkUserAuthorizationForModuleSTO(req, res, 1);

        const searchCriteria = common.getInvestorSearchSQLSearchCritetia(req, false);
        const preparedSQL = common.getInvestorSearchSQL(searchCriteria, req);
        const params = {};
        /** @type InvestorDividendsDataRowVM[] */
        let dividendRows = [];
        /** @type InvestorAffiliateDataRowVM[] */
        let affiliateRows = [];


        function getSummaryInfo(callback) {
            var stmt2 =  `Select sum(totalShares) as TotalShares, sum(companyShares) as TotalCompanyShares from sharetypes where stoid = ${getSTOFromConfig(req.session.stoid).stoid} \
            ;\
            Select count(*) as count from investor i, investorsto s where i.id = s.investorid and i.investorBulkUploadStatus = 1 and s.stoid = ${getSTOFromConfig(req.session.stoid).stoid}`;

            mysql.executeSQLStatement(stmt2, []).then((result) => {
                if(result[0][0].TotalShares == null)
                    params.TotalShares = 0;
                else
                    params.TotalShares = result[0][0].TotalShares;

                if(result[0][0].TotalCompanyShares == null)
                    params.TotalCompanyShares = 0;
                else
                    params.TotalCompanyShares = result[0][0].TotalCompanyShares;

                params.TotalInvestorShares = math.subtract(params.TotalShares ?? 0, params.TotalCompanyShares ?? 0) ?? 0;
                params.BulkUploadsInvestors = result[1][0].count;

                callback(null);
            }).catch((error) => {
                logger.error(`Error occured in investorsList getSummaryInfo - ${error.message}`);
            });
        }
        function getDatabaseInformation(callback) {
            mysql.executeSQLStatement(`Select  count(*) as count ${preparedSQL.sql} and iskyc = 1`, preparedSQL.data).then((result) => {
                    params.recordCount = result[0].count;

                    var sql = `Select i.ID,  IF(i.investorType = 1, i.CompanyName,  concat(i.FirstName, " ", i.LastName) ) as DisplayName,   i.country, i.FirstName, i.LastName,  i.NamePrimaryContact, KYCCurrentStatus, i.investorType, i.CompanyName, i.investorType, i.CompanyName, i.investorBulkUploadStatus, iskyc, KYCApplied, (select sum(shares) from shares where investorid =  i.ID and stoid = ${getSTOFromConfig(req.session.stoid).stoid}) as Shares, s.isActive, s.KYCApplied  ${preparedSQL.sql} and iskyc = 1`;



                  if(searchCriteria.sortby != null) {
                      if(searchCriteria.sortby != "")
                          if(searchCriteria.sortby == "name")
                              sql = sql + " order by DisplayName";
                          if(searchCriteria.sortby == "id")
                               sql = sql + " order by i.id";
                          if(searchCriteria.sortby == "country")
                              sql = sql + " order by i.country";
                          if(searchCriteria.sortby == "shares")
                              sql = sql + " order by Shares";

                      sql = sql + " " + searchCriteria.sortingby;
                  }


                   let currentPage = 0;
                    if (req.query.page != null) {
                        currentPage = req.query.page;
                    }

                    if (currentPage === 0) {
                        sql = `${sql} LIMIT 0, ${global.config.RecordsPerPaging}`;
                    } else {
                        sql = `${sql} LIMIT ${currentPage * global.config.RecordsPerPaging}, ${global.config.RecordsPerPaging}`;
                    }



                  mysql.executeSQLStatement(sql, [preparedSQL.data]).then((result2) => {
                      params.investorsRecord = result2;
                      sql = null;
                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in investorsList getDatabaseInformation`);
                  });

              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in investorsList getDatabaseInformation`);
            });
        }
        function getDividendInformation(callback) {
            getInvestorsDividendsOverview().then(rows => {
                dividendRows = rows;
                params.investorsRecord.forEach((record) => {
                    // eslint-disable-next-line no-param-reassign
                    record.dividendVm = rows[record.ID];
                });
                callback(null);
            })
            .catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in investorsList getDividendInformation`)
                callback(null);
            });
        }
        function getAffiliateInformation(callback) {
            getInvestorsAffiliateOverview(getSTOFromConfig(req.session.stoid).stoid).then(rows => {
                affiliateRows = rows;
                params.investorsRecord.forEach((record) => {
                    // eslint-disable-next-line no-param-reassign
                    record.affiliateVm = rows[record.ID];
                });
                callback(null);
            })
            .catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in investorsList getAffiliateInformation`)
                callback(null);
            });
        }
        async.waterfall([
            getSummaryInfo,
            getDatabaseInformation,
            getDividendInformation,
            getAffiliateInformation,
        ], (err) => {
            if (!err) {
                res.render('investorssto',
                {
                    Data: common.getCommonPageProperties(req),
                    DataRows: params.investorsRecord,
                    RecordCount: params.recordCount,
                    TotalShares: params.TotalShares,
                    TotalCompanyShares: params.TotalCompanyShares,
                    BulkUploadsInvestorsCount: params.BulkUploadsInvestors,
                    partials: common.getPartials(),
                    investorAddEditEnabled: common.isUserAuthorizationForModule(req, res, 2),
                    RecordsPerPaging: global.config.RecordsPerPaging,
                    TotalInvestorShares: params.TotalInvestorShares,
                    STOInvestorTypes: common.getSTOInvestorTypes(req),
                    displayDividends: dividendRows && dividendRows.length > 0,
                    displayAffiliate: affiliateRows && affiliateRows.length > 0,
                    ShareCountInFractions: global.config.ShareCountInFractions
                });
            }
        });
	},
	investorsViewSto(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 1);

        function getDatabaseInformation(callback) {
			var stmt = `select *, DATE_FORMAT(BeneificalDOB,'%M %d %Y') as BeneificalDOBFormat, DATE_FORMAT(dob,'%M %d %Y') as DOB, DATE_FORMAT(DateIncorporation,'%M %d %Y') as DateIncorporation from investor i, investorsto s where i.id = s.investorid and  i.id = ? and s.stoid = ${req.session.stoid} \
            ;\
            SELECT Description, DATE_FORMAT(LogDate,'%M %d %Y %H:%i:%s') as LogDate, users.ID, users.FirstName as UserFirstName, users.LastName as UserLastName, users.Username, investor.FirstName as InvestorFirstName, investor.LastName as InvestorLastName FROM logs LEFT JOIN investor ON investor.ID = logs.InvestorID LEFT JOIN users ON logs.UserID = users.ID Where investor.ID = ? and logs.stoid = ${req.session.stoid} order by logs.ID DESC \
            ;\
            select DATE_FORMAT(inv.DateTime,'%M %d %Y %H:%i:%s') as DateTime, inv.TokensTransferred, inv.AmountInvested, inv.Description, inv.CurrencyID, cur.Abbreviation, st.title from investments inv, currency cur, sharetypes st where st.id = inv.sharetypeid and investorid = ? and inv.CurrencyID = cur.ID and  inv.stoid = ${req.session.stoid} Order by inv.DateTime DESC \
            ;\
            select * from changeaddresserequest where InvestorID = ? and stoid = ${req.session.stoid}\
            ;\
            Select DATE_FORMAT(DateClosed,'%M %d %Y') as DateClosed, CaseTitle, CaseDetails, CaseNotes, CaseFilePath, tokens from closedaccounts where InvestorID = ? and isPartial = 0 and stoid = ${req.session.stoid}\
            ;\
            Select ID, DATE_FORMAT(DateClosed,'%M %d %Y') as DateClosed, CaseTitle, CaseDetails, CaseNotes, CaseFilePath, tokens  from closedaccounts where InvestorID = ? and isPartial = 1 and stoid = ${req.session.stoid}  order by DateClosed Desc \
            ;\
            Select ID, DATE_FORMAT(DateOffered,'%M %d %Y') as DateOffered, ContractTitle, ContractDetails, DATE_FORMAT(DateSigned,'%M %d %Y') as DateSigned, CurrentStatus, ContractFilePath, SignedFilePath from contracts where investorid=? and stoid = ${req.session.stoid} order by ID desc \
            ;\
            Select ID, DocumentTitle, DATE_FORMAT(UploadDate,'%M %d %Y') as UploadDate from investordocuments where InvestorID = ? and stoid = ${req.session.stoid} order by ID DESC
            ;\
            Select p.ID as shareTypeID, s.ID as investorShareID, p.title, p.nominalValue, p.premimum, s.isBlockchainAuthorized, s.isBlockchainFrozen, s.PublicKey, s.shares, p.isblockchain, p.currencyid from shares s, sharetypes p where s.investorID = ? and s.shareTypeid = p.id and s.shares > 0 and p.stoid = ${req.session.stoid}
            ;\
            select p.ID, title, nominalValue, premimum, currencyid, isblockchain from sharetypes p where id not in (select p.id from sharetypes p left join shares s on p.id = s.shareTypeid where s.investorID= ? and p.stoid = ${req.session.stoid} and s.shares > 0) and stoid = ${req.session.stoid}
            ;\
            select *, DATE_FORMAT(d.signaturedate,'%M %d %Y') as signaturedate2, d.ID as docid from documentuser d, documentofferinvestor o where d.investorid=? and d.DocumentStatus=3 and d.documentofferinvestorid = o.id
            ;\
            Select  ID, DATE_FORMAT(PaymentSendDate,'%M %d %Y') as PaymentSendDate,  paymentRequested, currencyIDRequested,  isSettled, DATE_FORMAT(PaymentReceiveDate,'%M %d %Y') as PaymentReceiveDate, currencyIDReceived, paymentReceived from paymentinvestors p where investorid = ? and stoid = ${req.session.stoid}
            ;\
            select * from currency \
            ;\
            select  COALESCE(SUM(shares),0) as ShareSum from shares s, sharetypes t where s.investorid = ? and s.shareTypeid = t.ID and t.stoid = ${req.session.stoid};\
            select du.ID as duID, du.signaturefilepath, firstname, lastname, d.*, 
            DATE_FORMAT(du.signaturedate,'%d %M %Y | %H:%i:%ss') as signatureDate
            from documentuser du
            inner join investor i on i.ID = du.investorID
            inner join documents d on d.ID = du.documentid
            where du.stoid = ${req.session.stoid}
            and du.investorID = ?
            and DocumentStatus = 3
            order by du.signaturedate desc`;

            const data = [req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id, req.query.id]

            if(global.config.InvestorCombinePropertiesMode == 1) {
                /* stmt = stmt + `; select a.ID as balanceID, a.*, c.* from InvestorBalancesInCompanyAccounts a, currency c where investorid = ? and a.currencyID = c.id and stoid = ?; \
                              \
                              select *, i.currencyID as depositAlertCurrencyID, DATE_FORMAT(DateReceived,'%M %d %Y') as DateReceivedPayment  from InvestorDepositReceivedAlert i, paymentchannels p, currency c where i.investorID = ? and i.ChannelID = p.ID and c.id = p.currencyid and i.isApproved = 1 and storid = ? order by i.ID DESC` ;

                    data.push( req.query.id, req.session.stoid, req.query.id, req.session.stoid )
                */

                stmt = stmt + `; select *, i.currencyID as depositAlertCurrencyID, DATE_FORMAT(DateReceived,'%M %d %Y %H:%i:%s') as DateReceivedPayment  from InvestorDepositReceivedAlert i, paymentchannels p, currency c where i.investorID = ? and i.ChannelID = p.ID and c.id = p.currencyid and i.isApproved = 1 and storid = ? order by i.ID DESC` ;

                data.push( req.query.id, req.session.stoid )
            }


			mysql.executeSQLStatement(stmt, data).then((result) => {

                if(result[0].length == 0) {
                    common.handleError(req, res, `Admin ${req.session.user.ID} is trying to access investor ${req.query.id} record who do not belong to this STO. Error in investorsView getDatabaseInformation`);
                    return;
                }

                const params = {};
                params.InvestorRecord = result[0][0];
                params.LogRecords = result[1];
                params.InvestRecords = result[2];
                if (result[2].length > 0) { params.investRecordsSection = 1; } else { params.investRecordsSection = 0; }
                if (result[3] != null) { params.changePublicAddressRequestRec = result[3][0]; } else { params.changePublicAddressRequestRec = null; }
                if (result[4] != null) { params.closeAccountRec = result[4][0]; }
                params.ForceTakeOver = result[5];
                params.contracts = result[6];
                params.DocumentsRecords = result[7];
                if (result[7].length > 0) { params.documentsRecordsSection = 1; } else { params.documentsRecordsSection = 0; }
                params.HoldingRecords = result[8];
                params.ZeroHoldingShareRecords = result[9];
                params.contractDocuments = result[10];
                params.paymentRecords = result[11];
                params.currencies = result[12];
                params.totalSharesInSTO = result[13][0].ShareSum;
                params.signedContracts = result[14].map((c) => {
                    if (c.signaturefilepath?.includes("docusignViewSignedDocumentsUrl")) {
                        return {
                            ...c,
                            signaturefilepath: c.signaturefilepath.replace(
                                "docusignViewSignedDocumentsUrl/",
                                ""
                            ),
                        };
                    }
                    if (c.signaturefilepath?.includes("helloSignViewSignedDocumentsUrl/")) {
                        return {
                            ...c,
                            signaturefilepath: c.signaturefilepath.replace(
                                "helloSignViewSignedDocumentsUrl/",
                                ""
                            ),
                        };
                    }
                    return { ...c, signaturefilepath: "" };
                });

                    if(global.config.InvestorCombinePropertiesMode == 1) {
                        // params.InvestorBalancesInCompanyAccounts = result[14];
                        // params.DepositRecords = result[15];
                        params.DepositRecords = result[15];
                    } else {
                        // params.InvestorBalancesInCompanyAccounts = [];
                        params.DepositRecords = [];
                    }

                callback(null, params);

            }).catch((error) => {
				common.handleError(req, res, `${error.message} - Error occured in investorsView getDatabaseInformation`);
            });
		}
        function getInvestorBalance(params, callback) {
            wallet.getInvestorSTOBalances( req.query.id, req.session.stoid, global.config.investorInternalWalletProjectSpecific ).then((balances) => {
                params.InvestorBalancesInCompanyAccounts = balances;

                callback(null, params);
            })
        }
        function getInvestorAffiliateNetwork(params, callback) {
            getReferralNetworkDetails(req.query.id, req.session.stoid)
            .then((investors) => {
                // eslint-disable-next-line no-param-reassign
                params.referralNetwork = investors;
                callback(null, params);
            })
            .catch((error) => {
                callback(null, params);
                logger.error(`Error in investors getInvestorAffiliateNetwork:\n${error}`)
            });
        }
        async function getInvestingEntity(params, callback) {
          if (global.config.IsMarketSpace === 1) {
            params.investingEntity = await getInvestingEntityDetails(req.query.id);
          }
          const appDir = path.dirname(mainFilename);
          params.investingEntityPartialView = `${appDir}/../views/partials/investingEntityDetails`;
          callback(null, params);
        }
		async.waterfall([
			getDatabaseInformation,
        getInvestorBalance,
        getInvestorAffiliateNetwork,
        getInvestingEntity,
		], (err, params) => {
      let isPublicKeyEmpty = 1;
      if (params.InvestorRecord.PublicKey !== '' && params.InvestorRecord.PublicKey !== null) {
          isPublicKeyEmpty = 0;
      }

      var contractsSection = 0;
      if(params.contracts.length > 0 || params.contractDocuments.length > 0)
          contractsSection = 1;

        var EnablePaymentModule = 0;
        if( getSTOFromConfig(req.session.stoid).settings.hasOwnProperty('EnablePaymentModule') )
            EnablePaymentModule = 1;

			res.render('investorviewsto', {
                signedContracts: params.signedContracts,
				changePublicAddressRequestRec: params.changePublicAddressRequestRec,
				Data: common.getCommonPageProperties(req),
				investorRec: params.InvestorRecord,
        InvestorTypeText : getSTOFromConfig(req.session.stoid).settings.InvestorCategory[params.InvestorRecord.investorType.toString()],
				LogRecords: params.LogRecords,
        currencies: params.currencies,
				partials: common.getPartials({investingEntityPartialView: params.investingEntityPartialView}),
				InvestRecords: params.InvestRecords,
        HoldingRecords: params.HoldingRecords,
        ZeroHoldingShareRecords: params.ZeroHoldingShareRecords,
        InvestorBalancesInCompanyAccounts: params.InvestorBalancesInCompanyAccounts,
				closeAccountRec: params.closeAccountRec,
				ForceTakeOver: params.ForceTakeOver,
        DepositRecords: params.DepositRecords,
        AuthorizationType: common.getAuthorizationType(params.InvestorRecord.KYCCurrentStatus),
				errorMessage: req.flash('errorMessage'),
        investRecordsSection: params.investRecordsSection,
        isPublicKeyEmpty,
				contracts: params.contracts,
        EnablePaymentModule: EnablePaymentModule,
        contractDocuments: params.contractDocuments,
        contractsSection: contractsSection,
				DocumentsRecords: params.DocumentsRecords,
        documentsRecordsSection: params.documentsRecordsSection,
        paymentRecords: params.paymentRecords,
        totalSharesInSTO: params.totalSharesInSTO,
        csrfToken: req.csrfToken(),
        referralNetwork: params.referralNetwork,
        investingEntityEncoded: encodeURIComponent(JSON.stringify(params.investingEntity)),
        investingEntity: params.investingEntity,
        isDriversLicenseEnabled: global.config.isDriversLicenseEnabled,
			});
		});
	},
	investorsKYCList(req, res) {
        const params = {};
		common.checkUserAuthorizationForModuleSTO(req, res, 4);


		async function getDatabaseKYCInformation(callback) {
      const data = await getNonKycInvestorsFromApi(req);
      params.recordCount = data.length;
      params.investorsRecord = data;
      params.investorRecordsFound = +(data.length > 0);
      callback(null);
    }
    async function getInvitations(callback) {
      params.inviteRecord = await getInvestorInvitations(req);
      callback(null);
    }
		async.waterfall([
			getDatabaseKYCInformation,
            getInvitations
		], (err) => {
      if (!err) {
        res.render('admin/kyc', {
         Data: common.getCommonPageProperties(req),
         DataRows: params.investorsRecord,
         inviteRecord: params.inviteRecord,
         partials: common.getPartials(),
         privateInvestorTypeText: getSTOFromConfig(req.session.stoid).settings.InvestorCategory["0"],
         companyInvestorTypeText: getSTOFromConfig(req.session.stoid).settings.InvestorCategory["1"],
         RecordCount: params.recordCount,
         RecordsPerPaging: global.config.RecordsPerPaging,
         investorRecordsFound: params.investorRecordsFound,
         SingleSignInEnabled: global.config.SingleSignInEnabled,
         errorMessage: parseInt(req.flash('errorKYCMessage'), 10)
        });
      }
		});
	},
	KYCView(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 9);

		function getInvestorInfo(callback) {
			mysql.getInvestorRecordFromDatabase({ id: req.query.id }, req)
				.then((result) => {

                    if(!result[0] || result[0].length == 0) {
                        common.handleError(req, res, `Admin ${req.session.user.ID} is trying to access investor ${req.query.id} record who do not belong to this STO. Error in KYCView getInvestorInfo`);
                        return;
                    }

					const params = {};
					params.investor = result[0];
                    params.authType = common.getAuthorizationType(result[0].KYCApplied);
					params.currentAuthStatus = common.getAuthorizationType(result[0].KYCCurrentStatus);
					callback(null, params);
				}, (err) => {
					common.handleError(req, res, `${err.message} - Error occured in KYCView getInvestorInfo`);
				});
		}
		function getInvestorKYCData(params, callback) {
			const stmt = 'Select * from kyc where investorID = ?';
			mysql.executeSQLStatement(stmt, [req.query.id]).then((result) => {
                if (result[0] != null)
                   params.kyc = JSON.parse(result[0].kyc);
                else
                    params.kyc = {};

                callback(null, params);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in KYCView getInvestorKYCData`);
            });
		}
        function getInvestorKycExtended(params, callback) {
          mysql
            .executeSQLStatement(`SELECT kyc FROM investor WHERE ID = ?`, [
              req.query.id,
            ])
            .then((result) => {
              params.kycExtended = undefined;
              params.kycExclusive = undefined;
              if (result[0] != null && result[0].kyc != null) {
                params.kycExtended = JSON.parse(result[0].kyc);
                // These are excluded from the "general" section because they are written somewhere else
                params.kycExclusive = Object.keys(params.kycExtended)
                  .filter(
                    (key) =>
                      ![
                        "investor-documents",
                        "identity",
                        "schedule-k1",
                        "currency",
                        "amount",
                        "type-investor",
                        "general-invest-experience",
                        "cre-investing-experience",
                        "expected-total-investments",
                        "expected-amount-investments",
                      ].includes(key)
                  )
                  .filter(
                    (key) => typeof key === "string" || Array.isArray(key)
                  )
                  .map((key) => ({
                    key,
                    value: params.kycExtended[key]?.toString() ?? "-",
                  }));
              }
              callback(null, params);
            })
            .catch((e) => {
              common.handleError(
                req,
                res,
                `${e.stack}\n\nError occured in KYCView getInvestorKycExtended`
              );
            });
        }
		async.waterfall([
			getInvestorInfo,
			getInvestorKYCData,
			getInvestorKycExtended,
		], (err, params) => {

			res.render('admin/kycview', {
				Data: common.getCommonPageProperties(req),
				investorRec: params.investor,
                InvestorTypeText : getSTOFromConfig(req.session.stoid).settings.InvestorCategory[params.investor.investorType.toString()],
                DefaultSTOCurreny: getSTOFromConfig(req.session.stoid).settings.DefaultSTOCurreny,
				kyc: params.kyc,
				kycExtended: params.kycExtended,
				kycExclusive: params.kycExclusive,
				authType: params.authType,
				currentAuthStatus: params.currentAuthStatus,
				partials: common.getPartials(),
				errorMessage: req.flash('errorMessage'),
				csrfToken: req.csrfToken(),
                KYCPersonalInfoScreen: global.config.KYCPersonalInfoScreen,
                link: req.query.link,
                viewRegisteredKYCInvestor: 1,
                STOInvestorTypes: common.getSTOInvestorTypes(req)
			});
		});

	},
	investorKYCAuthroize(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 4);
        const params = {};

		function getInvestorRecordFromDB(callback) {
            if(req.body.op == "1") {
                mysql.getInvestorRecordFromDatabase({ id: req.body.id }, req).then((data) => {

                    if(data[0].length == 0) {
                        common.handleError(req, res, `Admin ${req.session.user.ID} is trying to modify investor ${req.body.id} record who do not belong to this STO. Error in investorKYCAuthroize getInvestorRecordFromDB`);
                        return;
                    }

                    params.investorRecord = data[0];
                    if (data[0].isKYC === 1) {
                        if (data[0].KYCCurrentStatus === parseInt(req.body.authType))
                            params.sendEmail = 0;
                        else
                            params.sendEmail = 1;

                        params.copyFiles = 0;
                    } else {
                        params.copyFiles = 1;
                        params.sendEmail = 1;
                    }

                    callback(null);
                },(err) => {
                    common.handleError(req, res, `${err.message} - Error occured in investorKYCAuthroize getInvestorRecordFromDB`);
                });
            } else if(req.body.op == "0") {
                const sql = `select * from investor where id = ?`;
                mysql.executeSQLStatement(sql, [req.body.id]).then((data) => {
                    params.investorRecord = data[0];
                    params.copyFiles = 1;
                    params.sendEmail = 1;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} - Error occured in investorKYCAuthroize setInvestorAuthorization`);
                });
            }
		}
		async function setInvestorAuthorization(callback) {
      if (req.body.op == "1") {
        const status = parseInt(req.body.authType, 10);
        postUpdateInvestorKyc(
            parseInt(req.body.id, 10),
            status !== 7,
            status,
            req
        ).then(() => {
            callback(null);
        }).catch((e) => {
            common.handleError(req, res, `${e} - Error occurred in investorKYCAuthroize setInvestorAuthorization`);
        });
      } else if (req.body.op == "0") {
        const sql = `insert into investorsto(investorid, isAccountClosed, stoid, expectedShares, expectedInvestment, isKYC, KYCApplied, KYCUpdateDate, KYCCurrentStatus)  value (?, 0, ?, 0, 0, 1, 0, now(), ?)`;
        mysql.executeSQLStatement(sql, [req.body.id, getSTOFromConfig(req.session.stoid).stoid, req.body.authType]).then(() => {
          callback(null);
        }).catch((error) => {
          common.handleError(req, res, `${error.message} - Error occured in investorKYCAuthroize setInvestorAuthorization`);
        });
      }
    }
        function getKYCRecord(callback) {
            const stmt = 'Select * from kyc where investorID = ?';
            mysql.executeSQLStatement(stmt, [req.body.id]).then((result) => {
              if (result[0] != null) {
                params.kyc = JSON.parse(result[0].kyc);
              } else {
                params.kyc = {};
              }
              callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in investorKYCAuthroize getKYCRecord`);
            });
        }
		function createUploadedKYCDocumentsRecordsID(callback) {
            if(params?.copyFiles == 1) {
                if (params.kyc.hasOwnProperty('IDDoc')) {
                    if (params.kyc.IDDoc.hasOwnProperty('fileID')) {
                        var count = 0;
                        if(count < params.kyc.IDDoc.fileID.length) {
                            async.whilst(
                            () => count < params.kyc.IDDoc.fileID.length,
                            (callbackInner) => {
                                const destinationFile = "verifiedkycdocs/" + Math.floor(Math.random() * Math.floor(99999)) + params.kyc.IDDoc.fileID[count];

                                fs.copyFile(common.getUserFileUploadsLocationFullPath(params.kyc.IDDoc.fileID[count]), common.getUserFileUploadsLocationFullPath(destinationFile), (err) => {
                                    if (!err) {
                                        const sql = 'insert into investordocuments (investorid, documenttitle, uploaddate, link, stoid) values(?, ?, Now(), ?, ?)';
                                        mysql.executeSQLStatement(sql, [req.body.id, 'Proof of Identity ' + count, destinationFile, req.session.stoid]).then(() => {
                                            count++;
                                            callbackInner(null);
                                        }).catch((error) => {
                                            common.handleError(req, res, `${error.message} - Error occurred in investorKYCAuthroize createUploadedKYCDocumentsRecordsID`);
                                        });
                                    } else {
                                        common.handleError(req, res, `${error.message} - Error occured in investorKYCAuthroize createUploadedKYCDocumentsRecordsID`);
                                    }
                                });
                                }, (err, n) => {
                                    if (!err) {
                                        callback(null);
                                    } else {
                                        logger.info(`${err} ${n}`);
                                    }
                                },
                            );
                        } else { callback(null); }
                    } else { callback(null); }
                } else { callback(null); }
            } else
                 callback(null);
		}
		function createUploadedKYCDocumentsRecordsAddess(callback) {
            if(params.copyFiles == 1) {
                if (params.kyc.hasOwnProperty('IDDoc')) {
                    if (params.kyc.IDDoc.hasOwnProperty('fileAddress')) {
                        var count = 0;
                        if (count < params.kyc.IDDoc.fileAddress.length) {
                            async.whilst(
                                () => count < params.kyc.IDDoc.fileAddress.length,
                                (callbackInner) => {
                                    const destinationFile = "verifiedkycdocs/" + Math.floor(Math.random() * Math.floor(99999)) + params.kyc.IDDoc.fileAddress[count];

                                    fs.copyFile(common.getUserFileUploadsLocationFullPath(params.kyc.IDDoc.fileAddress[count]), common.getUserFileUploadsLocationFullPath(destinationFile), (err) => {
                                        if (!err) {
                                            const sql = 'insert into investordocuments (investorid, documenttitle, uploaddate, link, stoid) values(?, ?, Now(), ?, ?)';
                                            mysql.executeSQLStatement(sql, [req.body.id, 'Proof of Address ' + count, destinationFile, req.session.stoid]).then(() => {
                                                count++;
                                                callbackInner(null);
                                            }).catch((error) => {
                                                common.handleError(req, res, `${error.message} - Error occured in investorKYCAuthroize createUploadedKYCDocumentsRecordsID`);
                                            });
                                        } else {
                                            common.handleError(req, res, `${error.message} - Error occured in investorKYCAuthroize createUploadedKYCDocumentsRecordsID`);
                                        }
                                    });

                                }, (err, n) => {
                                    if (!err) {
                                        callback(null);
                                    } else {
                                        logger.info(`${err} ${n}`);
                                    }
                                },
                            );
                        } else { callback(null); }
                    } else { callback(null); }
                } else { callback(null); }
            } else
                 callback(null);
		}
        function deleteInvitationRecord(callback) {
            if(req?.body?.op == "0") {
                const stmt = 'delete from investorinvitation where stoid = ? and email = ?';
                mysql.executeSQLStatement(stmt, [getSTOFromConfig(req.session.stoid).stoid, params.investorRecord.email]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in investorKYCAuthroize deleteInvitationRecord`);
                });
            } else
                callback(null);
        }
        function logActivityPrepare(callback) {
                params.LogDescription = `Investor Authorized as ${common.getAuthorizationType(parseInt(req.body.authType, 10))}`;

                const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid) values (?,NOW(),?,?,?,?)';
                const sqlparams = [req.session.user.ID, params.LogDescription, req.body.id, 8, req.session.stoid];
                 mysql.executeSQLStatement(stmt, sqlparams).then(() => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} Error occured in systemUserAddEditPost updateUserRecord`);
                });
        }
        function sendExternalAuthorization(callback) {
              if(global.config.CurrentClientID == 2) {
                        // RedSwan needs to be updated if KYC is done
                       common.getRedSwanAccessToken(req).then((data) => {

                                request.post({
                                    url: global.config.ExternalAPILink + "/users/kyc-validation",
                                    headers: { 'content-type': 'application/json',  'x-integrator-token':  data.idToken},
                                    body:  JSON.stringify(  { 'email': params.investorRecord.email,  'confirmed':  'true'    }  )
                                },
                                function(err,httpResponse,body) {
                                        logger.info( body + " - RedSwan kyc-validation was called for email " + params.investorRecord.email )
                                        callback(null);
                                });

                       }).catch((error) => {
                                logger.error(`Error - ${error.toString()} - RedSwan kyc-validation was called but some error occured for email ` + params.investorRecord.email )
                                callback(null);
                       });

              } else
                  callback(null);
        }
        function registerAffiliate(callback) {
            // Needed to update KYC in affiliate program
            // Does nothing if disabled
            approveAffiliateInvestor(params.investorRecord);

            // Below used to be the old scenario, but registration has been
            // moved to investorClient and other places where an investor
            // record is created.
            //
            // Change back if ever needed:
            // registerAffiliateInvestor(params.investorRecord);
            callback(null);
        }
		async.waterfall([
			getInvestorRecordFromDB,
			setInvestorAuthorization,
			getKYCRecord,
			createUploadedKYCDocumentsRecordsID,
			createUploadedKYCDocumentsRecordsAddess,
            deleteInvitationRecord,
            logActivityPrepare,
            sendExternalAuthorization,
            registerAffiliate,
		], (err) => {
            if (err) {
                logger.error(err);
            }
			// send email to investor that he has been authoerized
            if(params.sendEmail === 1) {
              const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
              if (!stoEmailTexts) throw new Error(`Email texts not found for InvestorMessageNormalConfirm`);
              let txtEmail = emailTextsController.format(stoEmailTexts.InvestorMessageNormalConfirm.Line1, {
                firstname: params.investorRecord.FirstName,
                lastname: params.investorRecord.LastName,
                stoLink: getSTOFromConfig(req.session.stoid).stolinkfull,
              });
				  // let txtEmail = '';
				  // txtEmail = `Dear ${params.investorRecord.FirstName} ${params.investorRecord.LastName}`;
				  // txtEmail += '<br /><br />';
				  // txtEmail += emailTexts.InvestorMessageNormalConfirm.Line1;
				  // txtEmail = `${txtEmail}<br /> ${getSTOFromConfig(req.session.stoid).stolinkfull}`;
				  txtEmail += '<br /><br />';
				  txtEmail += getSTOFromConfig(req.session.stoid).emailFooter

				  common.sendEmail(req.hostname, params.investorRecord.email, emailTexts.InvestorMessageNormalConfirm.Subject, txtEmail, []).then( () => res.redirect('investorsKYCList'),
                 (err2) => {
                    common.handleDebug(req, `${err2.message} Error sending email occured in investorKYCAuthroize`);
                    res.redirect('investorsKYCList');
                 });
            } else
                res.redirect('investorsKYCList');
		});
	},
    rejectInvestorUpgradeRequest(req, res) {
        const params = {};

        function getCurrentSharesOfInvestorInSTO(callback) {
            const stmt = `select  COALESCE(SUM(shares),0) as ShareSum from shares s, sharetypes t where s.investorid = ? and s.shareTypeid = t.ID and t.stoid = ${req.session.stoid}`;
            mysql.executeSQLStatement(stmt, [req.query.id]).then((result) => {
                params.shares = parseFloat(result[0].ShareSum);
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in rejectInvestorUpgradeRequest deleteReq`);
            });
        }
        function deleteShareRecordsIfAny(callback) {
            if(params.shares == 0) {
                const stmt = 'delete from shares where investorid = ? and stoid = ?';
                mysql.executeSQLStatement(stmt, [req.query.id, req.session.stoid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message}Error in rejectInvestorUpgradeRequest deleteReq`);
                });
            } else
                callback(null);
        }
        function deleteReq(callback) {
            if(params.shares == 0) {
                const stmt = 'delete from investor where id = ?; delete from investorsto where investorId = ? and stoid = ?';
                mysql.executeSQLStatement(stmt, [req.query.id, req.query.id, req.session.stoid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message}Error in rejectInvestorUpgradeRequest deleteReq`);
                });
            } else
                callback(null);
        }
        async.waterfall([
            getCurrentSharesOfInvestorInSTO,
            deleteShareRecordsIfAny,
            deleteReq
        ], (err) => {
            res.redirect(`investorsKYCList`)
        });
    },
    investorExpectedInvestment(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 4);


        function setInvestorExpectedInvestment(callback) {
            var expectedShares = 0;
            var expectedInvestment = 0;

            if(req.body.txtShares != null || req.body.txtShares != "")
                expectedShares = parseInt(req.body.txtShares);

            if(req.body.txtInvestment != null || req.body.txtInvestment != "")
                expectedInvestment = parseInt(req.body.txtInvestment);

            const currentDate = new Date()

            const sql = `update investorsto set KYCUpdateDate=?, expectedShares=?, expectedInvestment=? where investorid=? and stoid=?;update investor set investmentLimitUpdateDate=?, allowedTotalInvestment=? where ID = ?`;

            mysql.executeSQLStatement(sql, [currentDate, expectedShares, expectedInvestment, req.body.id, req.session.stoid, currentDate, expectedInvestment, req.body.id])
				.then((data) => {
					callback(null);
				})
				.catch((error) => {
					common.handleError(req, res, `${error.message} - Error occured in investorKYCAuthroize setInvestorAuthorization`);
				});
		}
		async.waterfall([
            setInvestorExpectedInvestment
		], (err, params) => {
            res.redirect(`KYCView?id=${req.body.id}&link=1`);
		});
    },
    searchNewInvestorsForInvitation(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 4);

        res.render('admin/searchinvestor/searchinvestors', {
            Data: common.getCommonPageProperties(req),
            partials: common.getPartials(),
            csrfToken: req.csrfToken(),
            isResultsIncluded: 0
        });
    },
    manageinvestorwallet(req, res) {
        // common.checkUserAuthorizationForModuleSTO(req, res, 4);

		function getInvestorRecord(callback) {
			const stmt = 'Select i.ID, i.FirstName, i.LastName, i.country, i.email, i.town, i.state from investor i, investorsto s where i.id = ? and i.id = s.investorid and s.stoid = ?';
			mysql.executeSQLStatement(stmt, [req.query.investorid, req.session.stoid]).then((result) => {
				const params = {};
                if(result.length == 0) {
                    common.handleError(req, res, `Admin ${req.session.user.ID} is trying to send tokens to investor ${req.query.id} who do not belong to this STO. Error in manageinvestorwallet getInvestorRecord`);
                    return;
                }
				params.investorRec = result[0];
				callback(null, params);
			}).catch((error) => {
				common.handleError(req, res, `${error.message} Error in manageinvestorwallet getInvestorRecord`);
            });
		}
		function getTokenInformation(params, callback) {
			const stmt = 'select * from sharetypes where id=? and stoid=?';
			mysql.executeSQLStatement(stmt, [req.query.sid, req.session.stoid]).then((result) => {
                if(result.length == 0) {
                    common.handleError(req, res, `Admin ${req.session.user.ID} is trying to send share types to investor ${req.query.sid} that do not belong to this STO. Error in manageinvestorwallet getTokenInformation`);
                    return;
                }
				params.shareType = result[0];
				callback(null, params);
			}).catch((error) => {
				common.handleError(req, res, `${error.message} Error in manageinvestorwallet getTokenInformation`);
            });
		}
        function getInvestorData(params, callback) {
			const stmt = `select * from shares where investorid = ? and stoid = ? and shareTypeid = ? \
                                ;\
                                select * from investorpublickeys where investorid = ? and title not in (select publickey from shareswallet where investorid = ? and sharesid = ? and publicKey != 'platform') \
                                ;\
                                select * from shareswallet where investorid = ? and sharesid = ? and publicKey != 'platform' \
                                ;\
                                select shares from shareswallet where publicKey = 'platform' and investorID = ? and sharesID = ?`;

			mysql.executeSQLStatement(stmt, [req.query.investorid, req.session.stoid, req.query.sid, req.query.investorid, req.query.investorid, req.query.sid, req.query.investorid, req.query.sid, req.query.investorid, req.query.sid]).then((result) => {


                    if(result[0].length) {
                        params.investorShareFound = 1;
                        params.investorShare = result[0][0];
                    } else
                        params.investorShareFound = 0;

                    params.investorKeys = result[1];
                    params.investorWallet = result[2];

                    if(result[3].length > 0)
                        params.OffChainWalletBalance = result[3][0].shares;
                    else
                        params.OffChainWalletBalance = 0;

                    callback(null, params);
			}).catch((error) => {
				common.handleError(req, res, `${error.message} Error in manageinvestorwallet getTokenInformation`);
            });
        }
		async.waterfall([
			getInvestorRecord,
			getTokenInformation,
            getInvestorData
		], (err, params) => {
            const dat = new Date();

            res.render('admin/manageinvestorwallet.hbs', {
                Data: common.getCommonPageProperties(req),
                sid: req.query.sid,
                partials: common.getPartials(),
                csrfToken: req.csrfToken(),
                investorRec: params.investorRec,
                csrfToken: req.csrfToken(),
                shareType: params.shareType,
                investorShareFound: params.investorShareFound,
                investorShare: params.investorShare,
                investorKeys: params.investorKeys,
                investorWallet: params.investorWallet,
                OffChainWalletBalance: params.OffChainWalletBalance,
                errorMessage: req.flash('errorMessage')
            });
		});
    },
    showinvestorcompanypaymenthistory(req, res) {

			const stmt = `select *, i.CurrencyID as CurrencyIDDeposit, DATE_FORMAT(DateReceived,'%M %d %Y') as DateReceived, DATE_FORMAT(DateApproved,'%M %d %Y') as DateApproved   from InvestorDepositReceivedAlert i left join paymentchannels p on i.channelid = p.id where i.investorID = ? and isApproved > 0 and i.storid = ? order by DateReceived desc, i.ID desc`;

            mysql.executeSQLStatement(stmt, [req.query.id, req.session.stoid]).then((result) => {

                    res.render('admin/investorcompanypaymenthistory', {
                        Data: common.getCommonPageProperties(req),
                        partials: common.getPartials(),
                        csrfToken: req.csrfToken(),
                        records: result,
                        id: req.query.id
                    });

			}).catch((error) => {
				common.handleError(req, res, `${error.message} Error in showinvestorcompanypaymenthistory`);
            });

    },
    showinvestorbalancereport(req, res) {
            const params = {}

            function getDatabaseInformation(callback) {
                  const sql = `select *, DATE_FORMAT(DateApproved,'%M %d %Y') as DateApprovedFormated  from InvestorDepositReceivedAlert where investorID = ? and currencyID = ? and isApproved in (1,3,4,5) and storid = ? order by DateApproved desc \
								 ;\
								 select * from currency where id = ?`;
                  mysql.executeSQLStatement(sql, [req.query.id, req.query.currencyid, req.session.stoid, req.query.currencyid]).then((result) => {
                        params.records = result[0];
                        params.currencyRecord = result[1][0];
                        callback(null);
                  }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - showinvestorbalancereport Error occured `);
                  });
            }

            async.waterfall([
                     getDatabaseInformation
            ], function (err) {
                    res.render('admin/singlecompany/balancereport', {
                        Data: common.getCommonPageProperties(req),
                        records: params.records,
                        partials: common.getPartials(),
                        currencyRecord: params.currencyRecord,
                        csrfToken: req.csrfToken(),
                        id: req.query.id
                    });
            });

    },

    searchInvestorsinPlatform(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 4);

        const params = {};
        params.RecordStatus = 0;

        function searchExistingItems(callback) {
			const sql = `select i.id from investor i, investorsto s where FirstName=? and lastname=? and email=? and country=? and town=? and s.stoid=? and i.id = s.investorid`;
			mysql.executeSQLStatement(sql, [req.body.firstname, req.body.lastname, req.body.email, req.body.country, req.body.city, req.session.stoid]).then((results) => {
                if(results.length > 0)
                    params.RecordStatus = 2;

				callback(null);
            }).catch((error) => {
				common.handleError(req, res, `${error.message} - Error occured in searchInvestorsinPlatform searchRecords`);
            });
        }
        function searchRecordsInInvitations(callback) {
            if(params.RecordStatus == 0) {
                const sql = `select id, firstname, lastname from investorinvitation where FirstName = ? and lastname = ? and email = ? and country =? and city = ? and stoid = ?`;
                mysql.executeSQLStatement(sql, [req.body.firstname, req.body.lastname, req.body.email, req.body.country, req.body.city, req.session.stoid]).then((results) => {
                    if(results.length > 0)
                        params.RecordStatus = 1;

                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} - Error occured in searchInvestorsinPlatform searchRecords`);
                });
            } else
                callback(null);
		}
        function searchRecords(callback) {
            if(params.RecordStatus == 0) {
                const sql = `select id, firstname, lastname from investor where FirstName = ? and lastname = ? and email = ? and country =? and town = ?`;
                mysql.executeSQLStatement(sql, [req.body.firstname, req.body.lastname, req.body.email, req.body.country, req.body.city]).then((results) => {
                    if(results.length > 0)
                        params.records = results;
                    else
                        params.records = [];

                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} - Error occured in searchInvestorsinPlatform searchRecords`);
                });
            } else
                callback(null);
		}
		async.waterfall([
            searchExistingItems,
            searchRecordsInInvitations,
            searchRecords
		], (err) => {
            res.render('admin/searchinvestor/searchinvestors', {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                city: req.body.city,
                country: req.body.country,
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
                Records: params.records,
                csrfToken: req.csrfToken(),
                isResultsIncluded: 1,
                RecordStatus: params.RecordStatus
            });
		});

    },
    sendEmailInvitationToInvestor(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 4);

        const params = {};
        function searchRecords(callback) {

            const sql = `insert into investorinvitation(stoid, email, emailtext, city, country, currentStatus, firstname, lastname) value(?, ?, ?, ?, ?, 0, ?, ?)`;
            mysql.executeSQLStatement(sql, [req.session.stoid, req.body.email2, req.body.emailText, req.body.city2, req.body.country2, req.body.firstname2, req.body.lastname2]).then((results) => {
              const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
              if (!stoEmailTexts) throw new Error(`Email texts not found for sendInvitationToInvestor`);

              let txtEmail = emailTextsController.format(stoEmailTexts.sendInvitationToInvestor.Line1, {
                firstname: req.body.firstname2,
                lastname: req.body.lastname2,
                text: req.body.emailText,
              });
              txtEmail += '<br /><br />';
              txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

                // let txtEmail = '';
                // txtEmail = `Dear ${req.body.firstname2} ${req.body.lastname2}`;
                // txtEmail += '<br /><br />';
                // txtEmail += emailTexts.sendInvitationToInvestor.Line1;
                // txtEmail += '<br /><br />';
                // txtEmail += emailTexts.sendInvitationToInvestor.Line2;
                // txtEmail = `<br /><br /> ${req.body.emailText} <br /><br />`;
                // txtEmail += '<br /><br />';
                // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter

                common.sendEmail(req.hostname, req.body.email2, emailTexts.sendInvitationToInvestor.Subject, txtEmail, []).then( () => {
                    req.flash('errorKYCMessage', '2');
                    callback(null);
                }, (err2) => {
                    req.flash('errorKYCMessage', '1');
                    callback(null);
                });

            }).catch((error) => {
                common.handleError(req, res, `${error.message} - Error occured in sendEmailInvitationToInvestor searchRecords`);
            });

		}
		async.waterfall([
            searchRecords
		], (err) => {
            res.redirect("investorsKYCList");
		});
    },
    deleteInvestorInvitation(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 4);

        const sql = `delete from investorinvitation where id = ? and stoid = ?`;
        mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((results) => {
            res.redirect("investorsKYCList");
        }).catch((error) => {
            common.handleError(req, res, `${error.message} - Error occured in deleteInvestorInvitation`);
        });
    },
    viewInvitedInvestorKYC(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 4);

		common.checkUserAuthorizationForModuleSTO(req, res, 1);
        const params = {};

        function getRec(callback) {
			const stmt = 'select * from investorinvitation where id = ?';
			mysql.executeSQLStatement(stmt, [req.query.id]).then((result) => {
                params.invitation = result[0];
				callback(null);
            }).catch((error) => {
				common.handleError(req, res, `${error.message} Error occured in viewInvitedInvestorKYC getRec`);
            });
        }
		function getInvestorInfo(callback) {
            if(params.invitation.currentStatus == 1) {
                const stmt = `select *, DATE_FORMAT(BeneificalDOB,'%M %d %Y') as BeneificalDOBFormat from investor i, investorsto s where i.id = s.investorid and i.id = ?; select * from kyc where investorid = ?`;

                mysql.executeSQLStatement(stmt, [params.invitation.investorID, params.invitation.investorID]).then((result) => {
                    params.investor = result[0][0];
                    params.kyc = result[1][0];

                    if (result[1][0] != null)
                        params.kyc = JSON.parse(result[1][0].kyc);
                    else
                        params.kyc = {};

                    callback(null);
                }, (err) => {
                    common.handleError(req, res, `${err.message} - Error occured in viewInvitedInvestorKYC getInvestorInfo`);
                });
            } else
                common.handleError(req, res, `invited investor kyc info was accessed by admin while investor has not authorizxed the access or accepted invitation - Error occured in viewInvitedInvestorKYC getInvestorInfo`);
		}
		async.waterfall([
            getRec,
			getInvestorInfo
		], (err) => {
			res.render('admin/kycview', {
				Data: common.getCommonPageProperties(req),
				investorRec: params.investor,
				kyc: params.kyc,
				partials: common.getPartials(),
				csrfToken: req.csrfToken(),
                link: 0,
                viewRegisteredKYCInvestor: 0,
                STOInvestorTypes: common.getSTOInvestorTypes(req)
			});
		});
    },

    searchInvestorEmailtoRegister(req, res) {
        res.render('admin/searchinvestor/newinvestoremail', {
            Data: common.getCommonPageProperties(req),
            partials: common.getPartials(),
            errorMessage: parseInt( req.flash('errorEmailTaken') ),
            csrfToken: req.csrfToken(),
        });
    },
    searchInvestorEmailtoRegisterPost(req, res) {

        if( req.body.email == "no" ) {
            res.redirect(`/admin/editInvestor?email=no`);
        } else {
            if(global.config.SingleSignInEnabled == 1) {

                if( validator.isEmail(req.body.email) )  {
                    const sql = 'select id from investor where email = ?';
                    mysql.executeSQLStatement(sql, [req.body.email]).then((result) => {
                        if (result.length !== 0) {

                                const sql = 'select i.id from investor i, investorsto s where i.email = ? and i.id = s.investorid and s.stoid = ?';
                                mysql.executeSQLStatement(sql, [req.body.email, req.session.stoid]).then((result) => {
                                    if(result.length > 0)
                                        req.flash('errorEmailTaken', '1')       // email already register with this STO
                                    else
                                        req.flash('errorEmailTaken', '2')       // email already in platfor with some other STO

                                    return res.redirect(`/admin/searchInvestorEmailtoRegister`);

                                }).catch((error) => {
                                    common.handleError(req, res, `${error.message} Error occured in searchInvestorEmailtoRegisterPost`);
                                });

                        } else
                            res.redirect(`/admin/editInvestor?email=${req.body.email}`);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.message} Error occured in searchInvestorEmailtoRegisterPost`);
                    });
                } else
                    common.handleError(req, res, `Email address is not valid. Admin ${req.session.user.ID} is bypassing the security check check on frontend and entered ${req.body.email}  searchInvestorEmailtoRegisterPost`);

            } else {
                // if single signin is not enabled
                const sql = 'select i.id from investor i, investorsto s where i.email = ? and i.id = s.investorid and s.stoid = ?';
                mysql.executeSQLStatement(sql, [req.body.email, req.session.stoid]).then((result) => {

                    if(result.length > 0) {
                        req.flash('errorEmailTaken', '1')       // email already register with this STO
                        return res.redirect(`/admin/searchInvestorEmailtoRegister`);
                    } else
                        res.redirect(`/admin/editInvestor?email=${req.body.email}`);

                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in searchInvestorEmailtoRegisterPost`);
                });

            }
        }

    },
	investorsEdit(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 2);

		let isEditing = 0;
		let InvestorRecord = {};

		if (req.query.id)
            isEditing = 1;


		function getDatabaseInformation(callback) {
			if (isEditing === 1) {
				const stmt = "Select *, DATE_FORMAT(dob,'%M %d %Y') as DOB from investor i, investorsto s where i.id = ? and i.id = s.investorid and s.stoid = ?";
				mysql.executeSQLStatement(stmt, [req.query.id, req.session.stoid]).then((result) => {
                    if(result.length > 0)
                        callback(null, result);
                    else
                        common.handleError(req, res, `admin is trying to edit an investor who does not belong to this STO. Admin ${req.session.user.ID} is bypassing the security check check on frontend and entered ${req.query.id} investorsEdit getDatabaseInformation`);
				}).catch((error) => {
				    common.handleError(req, res, `${error.message}Error occured in investorsEdit getDatabaseInformation`);
				});
			} else {


                    if(global.config.SingleSignInEnabled == 1) {
                        if(req.query.email == "no") {
                            callback(null, {});
                        } else {
                            if( validator.isEmail(req.query.email) )  {
                                mysql.executeSQLStatement('select id from investor where email = ?', [req.query.email]).then((result) => {
                                    if(result.length == 0)
                                        callback(null, {});
                                    else
                                        common.handleError(req, res, `Email address is already taken. Admin ${req.session.user.ID} is bypassing the security check check on frontend and entered ${req.body.email} investorsEdit getDatabaseInformation`);
                                }).catch((error) => {
                                    common.handleError(req, res, `${error.message} Error occured in investorsEdit getDatabaseInformation`);
                                });
                            } else
                                common.handleError(req, res, `Email address is not valid. Admin ${req.session.user.ID} is bypassing the security check check on frontend and entered ${req.body.email}  investorsEdit getDatabaseInformation`);
                        }
                    } else
                        callback(null, {});

            }
		}
		async.waterfall([
			getDatabaseInformation,
		], (err, databaseRecord) => {
			var InvestorRecord = {};
            var InvestorTypeText = "";
			if (databaseRecord.length > 0) {
                InvestorRecord = databaseRecord[0];
                InvestorTypeText = getSTOFromConfig(req.session.stoid).settings.InvestorCategory[InvestorRecord.investorType.toString()];
            }

            var ListCountry = "";
            if( getSTOFromConfig(req.session.stoid).settings.hasOwnProperty('ListCountry') )
                ListCountry = getSTOFromConfig(req.session.stoid).settings.ListCountry;

			res.render('investoredit', {
					Data: common.getCommonPageProperties(req),
					isEditing,
					InvestorRecord,
                    ListCountry,
                    InvestorTypeText,
                    InvestorCategory: getSTOFromConfig(req.session.stoid).settings.InvestorCategory,
					csrfToken: req.csrfToken(),
					partials: common.getPartials(),
                    email: req.query.email,
					messages: req.flash('UserNameTaken'),
                    countryList: common.getCountries(),
                    STOInvestorTypes: common.getSTOInvestorTypes(req)
            });
		});
	},
	addNewInvestor(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 2);
        const params = {};

		if (req.body.FormOperation === '0') {

            var sql = "";
            var data = [];

            if(req.body.email == "no") {
                // feed a sql that returns nothing
                sql = 'select id from investor where id = -99';
                data = [];
                req.body.email = "";
            } else {
                if( validator.isEmail(req.body.email) )  {
                    if(global.config.SingleSignInEnabled == 1) {
                        sql = 'select id from investor where email = ?';
                        data = [req.body.email];
                    } else {
                        sql = 'select i.id from investor i, investorsto s where i.email = ? and i.id = s.investorid and s.stoid = ?';
                        data = [req.body.email, req.session.stoid];
                    }
                } else {
                    common.handleError(req, res, `Email address is empty or no valid. Admin ${req.session.user.ID} is bypassing the security check check on frontend and entered ${req.body.email} addNewInvestor`);
                    return;
                }
            }

            mysql.executeSQLStatement(sql, data).then((result) => {
                if(result.length > 1) {
                    common.handleError(req, res, `Email address is already taken. Admin ${req.session.user.ID} is bypassing the security check check on frontend and entered ${req.body.email} addNewInvestor`);
                    return;
                }

                var dobval = "";
                if(req.body.investorType == "0"){
                    if(req.body.dob == null  || req.body.dob == "" )
                        dobval = null;
                     else
                        dobval = req.body.dob;
                } else
                    dobval = null;

                const randomPassword = Math.random().toString(36).substring(7);
                // admin registration of investor
				const stmt = 'INSERT INTO investor(FirstName, LastName, Address, zip, town, state, country, phone, PassportNumber, NationalID, email, Password, investorType, CompanyName, TitleWithinCompany, dob) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
				const todo = [req.body.FirstName, req.body.LastName, req.body.Address, req.body.zip, req.body.town, req.body.state, req.body.country, req.body.phone, req.body.PassportNumber, req.body.NationalID, req.body.email, common.getSHA256Hash(randomPassword), req.body.investorType, req.body.companyName, req.body.titleWithinCompany, dobval];
				mysql.executeSQLStatement(stmt, todo).then((result) => {
                    params.id = result.insertId;

                        const sql = 'Insert into investorsto(InvestorID, stoid, isKYC, KYCCurrentStatus, notes) values(?, ?, ?, ?, ?)';
                        mysql.executeSQLStatement(sql, [params.id, getSTOFromConfig(req.session.stoid).stoid, 1, req.body.KYCCurrentStatus, req.body.notes]).then((result) => {

                                const sql = `insert into kyc(InvestorID, appliedFor, kyc) value(?, 0, '{}')`;
                                mysql.executeSQLStatement(sql, [params.id])
                                .then(() => {
                                    registerAffiliateInvestorFromEmail(req.body.email);
                                })
                                .then(() => {
                                    res.redirect('investorsSto');
                                }).catch((error) => {
                                    common.handleError(req, res, `${error.message} Error occured in ADD section addNewInvestor`);
                                });

                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error occured in ADD section addNewInvestor`);
                        });
                }).catch((error) => {
				    common.handleError(req, res, `${error.message} Error occured in ADD section addNewInvestor`);
				});
			}, (err) => {
				common.handleError(req, res, `${err.message} - Error occured in addNewInvestor`);
			});

		} else {

            const stmt = "Select i.id from investor i, investorsto s where i.id = ? and i.id = s.investorid and s.stoid = ?";
            mysql.executeSQLStatement(stmt, [req.body.ID, req.session.stoid]).then((result) => {
                if(result.length > 0) {
                    mysql.updateInvestorRecord(req, 0).then(() => res.redirect(`investorsViewSto?id=${req.body.ID}`))
                    .catch((error) => {
                        common.handleError(req, res, `${error.message}Error occured when updating a new investor record`);
                    });
                } else
                    common.handleError(req, res, `admin is trying to edit an investor who does not belong to this STO. Admin ${req.session.user.ID} is bypassing the security check check on frontend and entered ${req.body.email} investorsEdit getDatabaseInformation`);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in investorsEdit getDatabaseInformation`);
            });

		}
	},

	/* authorizeInvestor(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 9);

        const privateKey = ethereumApi.decryptKey(JSON.parse(req.body.filecontents), req.body.password);
        if (privateKey === 'error') {
             req.flash('errorMessage', 'Private key cannot be authenticated');
             res.redirect(`investorsViewSto?id=${req.body.id}`);
        } else {
            function getTokenNameFromParametersTable(callback) {
                mysql.getAppParameterRecords("'Distribution','Token'", req.session.stoid)
                    .then((result) => {
                        let flagtemp = 1;
                        if (req.body.boolFlag === 'true') { flagtemp = 0; }

                        const params = {
                            token: common.getAppParameterFromDataSet(result, 'Token').ValueString,
                                  DistributionPublicKey: common.getAppParameterFromDataSet(result, 'Distribution').ValueString,
                                  InvestorID: req.body.id,
                                  boolFlag: flagtemp,
                        };

                        callback(null, params);
                    })
                    .catch((error) => {
                        common.handleError(req, res, `${error.message}Error occured in  authorizeInvestor getTokenNameFromParametersTable`);
                    });
            }
            function getInvestorRecord(params, callback) {
				const stmt = 'Select * from investor where id = ?';
				mysql.executeSQLStatement(stmt, [req.body.id])
					.then((result) => {
                        params.FirstName = result[0].FirstName;
                        params.LastName = result[0].LastName;
                        params.email = result[0].email;
                        callback(null, params);
                });
            }
            function authorizeInvestor(params, callback) {
                const json = { params };

                if (req.body.op === '0') // whitelist investor
                    { json.type = 4; }
                else if (req.body.op === '1') // release assets
                    { json.type = 7; }
                else if (req.body.op === '2') // freeze assets
                    { json.type = 3; }

                json.params.type = json.type; // save type in the object itself because it is needed in module callback to send emails or set status

                blockchainApi.whitelisInvestor(req.hostname, params.DistributionPublicKey, req.body.publicKey, req.body.boolFlag, tid, privateKey, req.session.ethereumContractAddress, req.session.ethereumWhitelistAddress, req.session.stoid)
                .then(() => { callback(null); },
                (err) => {
                    common.handleError(req, res, `${err.message} - ${JSON.stringify(params)} - Error occured in  authorizeInvestor authorizeInvestor - trying to authorize the investor `);
                });
            }
            async.waterfall([
                getTokenNameFromParametersTable,
                getInvestorRecord,
                authorizeInvestor,
              ], (err) => { if (!err) res.redirect(`investorsViewSto?id=${req.body.id}`); });
        }
	},  */
    resetInvestorPassword(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 2);

        const params = {};
		function getInvestorData(callback) {
            if (req.query.password == '') {
                common.handleError(req, res, 'Empty password was provided - resetInvestorPassword getInvestorData');
                return;
            }

            const stmt = 'Select * from investor where id = ?';
            mysql.executeSQLStatement(stmt, [req.query.ID]).then((result) => {
                params.InvestorRec = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in resetInvestorPassword getInvestorData`);
            });
		}
        function setPassword(callback) {
            const stmt = 'Update investor set password = ? where ID = ?';
            mysql.executeSQLStatement(stmt, [common.getSHA256Hash(req.query.password), req.query.ID]).then(() => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in resetInvestorPassword setPassword`);
            });
        }
        function sendEmail(callback) {
            if (req.query.email === 'true') {
              const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
              if (!stoEmailTexts) throw new Error(`Email texts not found for PasswordChanged`);

              let txtEmail = emailTextsController.format(stoEmailTexts.PasswordChanged.Line1, {
                firstname: params.InvestorRec.FirstName,
                lastname: params.InvestorRec.LastName,
                password: req.query.password,
              });

              txtEmail += '<br /><br />';
              txtEmail += getSTOFromConfig(req.session.stoid).emailFooter
                // let txtEmail = '';
                // txtEmail = `Dear ${params.InvestorRec.FirstName} ${params.InvestorRec.LastName}`;
                // txtEmail += '<br /><br />';
                // txtEmail += emailTexts.PasswordChanged.Line1;
                // txtEmail += '<br /><br />';
                // txtEmail = `${txtEmail} Login with your email &nbsp;&nbsp; <b>${params.InvestorRec.email}</b><br />`;
                // txtEmail = `${txtEmail} Your new password is &nbsp;&nbsp; <b>${req.query.password}</b>`;
                // txtEmail += '<br /><br />';
                // txtEmail += emailTexts.PasswordChanged.Line2;
                // txtEmail += '<br /><br />';
                // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter

                common.sendEmail(req.hostname, params.InvestorRec.email, emailTexts.PasswordChanged.Subject, txtEmail, []).then(() => {
                    txtEmail = null;
                    params.message = "Email to investor has been sent";
                    callback(null);
                }, (err) => {
                    common.handleDebug(req, `${err.message} - Error occured in resetInvestorPassword sendPassword`);
                    params.message = "Error sending email";
                    callback(null);
                });
            } else {
                params.message = '';
                callback(null);
            }
        }
		async.waterfall([
			getInvestorData,
            setPassword,
            sendEmail,
		], (err) => {
            if (!err) {
                req.flash('errorMessage', `Investor password has been reset. ${params.message}`);
                res.redirect(`investorsViewSto?id=${req.query.ID}`);
            }
		});
    },
    enableDisableInvestorLogin(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 2);

        const params = {};
		function getInvestorData(callback) {
            const stmt = 'Select * from investor where id = ?';
            mysql.executeSQLStatement(stmt, [req.query.ID]).then((result) => {
                params.InvestorRec = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in enableDisableInvestorLogin  getInvestorData`);
            });
		}
        function enableDisableInvestorAccount(callback) {
            const stmt = 'Update investorsto set isActive = ? where investorid = ? and stoid = ?';
            mysql.executeSQLStatement(stmt, [req.query.op, req.query.ID, req.session.stoid]).then(() => {
                 callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in enableDisableInvestorLogin enableDisableInvestorAccount`);
            });
        }
        function sendEmail(callback) {
          const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
            if (req.query.op === '1') {
              if (!stoEmailTexts) throw new Error(`Email texts not found for enableAccountEmail`);

              let txtEmail = emailTextsController.format(stoEmailTexts.enableAccountEmail.Line1, {
                firstname: params.InvestorRec.FirstName,
                lastname: params.InvestorRec.LastName,
              });
              txtEmail += '<br /><br />';
              txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;
                // let txtEmail = '';
                // txtEmail = `Dear ${params.InvestorRec.FirstName} ${params.InvestorRec.LastName}`;
                // txtEmail += '<br /><br />';
                // txtEmail += emailTexts.enableAccountEmail.Line1;
                // txtEmail += '<br /><br />';
                // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter

                common.sendEmail(req.hostname, params.InvestorRec.email, emailTexts.enableAccountEmail.Subject, txtEmail, []).then(() => {
                    txtEmail = null;
                    req.flash('errorMessage', 'Investor Account is enabled');
                    callback(null);
                }, (err) => {
                    common.handleDebug(req, `${err.message} - Error occured in enableDisableInvestorLogin sendEmail`);
                    req.flash('errorMessage', 'Investor Account is enabled. Error sending email');
                    callback(null);
                });
            } else {
              if (!stoEmailTexts?.disableAccountEmail?.Line1) {
                throw new Error(`Email texts not found for disableAccountEmail`);
              }
              let txtEmail = emailTextsController.format(stoEmailTexts.disableAccountEmail.Line1, {
                firstname: params.InvestorRec.FirstName,
                lastname: params.InvestorRec.LastName,
              });
              txtEmail += '<br /><br />';
              txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

                // let txtEmail = '';
                // txtEmail = `Dear ${params.InvestorRec.FirstName} ${params.InvestorRec.LastName}`;
                // txtEmail += '<br /><br />';
                // txtEmail += emailTexts.disableAccountEmail.Line1;
                // txtEmail += '<br /><br />';
                // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter

                common.sendEmail(req.hostname, params.InvestorRec.email, emailTexts.disableAccountEmail.Subject, txtEmail, []).then(() => {
                    txtEmail = null;
                    req.flash('errorMessage', 'Investor Account is disabled');
                    callback(null);
                }, (err) => {
                    common.handleDebug(req, `${err.message} - Error occured in enableDisableInvestorLogin sendEmail`);
                    req.flash('errorMessage', 'Investor Account is disabled. Error sending email');
                    callback(null);
                });
            }
        }
		async.waterfall([
			getInvestorData,
            enableDisableInvestorAccount,
            sendEmail,
		], (err) => {
            if (!err) res.redirect(`investorsViewSto?id=${req.query.ID}`);
		});
    },

	uploaddocument(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 39);

		res.render('uploaddocument', {
			Data: common.getCommonPageProperties(req),
			id: req.query.id,
			csrfToken: req.csrfToken(),
			partials: common.getPartials(),
		});
	},
	uploaddocumentPost(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 39);
        const params = {};

        function transferfiles(callback) {
            var j = JSON.parse(req.body.files);

            common
                .moveMultipleFilesToLocation(
                    j,
                    common.getUserFileUploadsLocationFullPath(
                        "verifiedkycdocs"
                    ),
                    req.hostname + "-"
                )
                .then((data) => {
                    params.file = "verifiedkycdocs/" + data[0];
                    callback(null);
                })
                .catch((error) => {
                    common.handleError(
                        req,
                        res,
                        `${error.message} Error occured in uploaddocumentPost`
                    );
                });
        }
        function InsertDatabaseInDocumentinformation(callback) {
            const sql =
                "insert into investordocuments (investorid, documenttitle, uploaddate, link, stoid) values(?, ?, Now(), ?, ?)";
            mysql
                .executeSQLStatement(sql, [
                    req.body.id,
                    req.body.title,
                    params.file,
                    req.session.stoid,
                ])
                .then(() => {
                    callback(null);
                })
                .catch((error) => {
                    common.handleError(
                        req,
                        res,
                        `${error.message}Error occured in uploaddocumentPost`
                    );
                });
        }
        async.waterfall(
            [transferfiles, InsertDatabaseInDocumentinformation],
            (err) => {
                if (!err) {
                    res.redirect(`investorsViewSto?id=${req.body.id}`);
                } else {
                    common.handleError(
                        req,
                        res,
                        `${err.message} ${investorsRecord} - Error occured in uploaddocumentPost`
                    );
                }
            }
        );

        /* let id = 0;
		let title = '';
		let filename = '';

		const form = new formidable.IncomingForm();

		form.parse(req);

		form.on('fileBegin', (name, file) => {
			// begin file uploadings
			filename = `${Math.floor(Math.random() * Math.floor(9999999))}_${file.name}`;
			file.path = common.getUserFileUploadsLocationFullPath(filename);
		}).on('field', (name, value) => {
			// this contains each file/value received from HTML FORM or query string
			if (name === 'id') { id = value; }
			if (name === 'title') { title = value; }
		// }).on('file', (name, file) => {
			// file received
		}).on('error', () => res.redirect(`investorsViewSto?id=${id}`))
        .on('aborted', () => res.redirect(`investorsViewSto?id=${id}`))
        .on('end', () => {
            // file(s) / fields  has been received an this is the end of all data received from user
            function InsertDatabaseInDocumentinformation(callback) {
                const sql = 'insert into investordocuments (investorid, documenttitle, uploaddate, link, stoid) values(?, ?, Now(), ?, ?)';
                mysql.executeSQLStatement(sql, [id, title, filename, req.session.stoid])
                .then(() => {
                        callback(null);
                    })
                    .catch((error) => {
                        common.handleError(req, res, `${error.message}Error occured in uploaddocumentPost`);
                    });
            }
            async.waterfall([
                InsertDatabaseInDocumentinformation,
            ], (err, investorsRecord) => {
                if (!err) {
                    res.redirect(`investorsViewSto?id=${id}`);
                } else {
                    common.handleError(req, res, `${err.message} ${investorsRecord} - Error occured in uploaddocumentPost`);
            investorKYCAuthroize    }
            });
        }); */
    },
	downloadDocument(req, res) {
		// common.checkUserAuthorizationForModuleSTO(req, res, 1);

        const sql = 'Select * from investordocuments where id= ? and stoid = ?';
        mysql.executeSQLStatement(sql, [req.query.docid, req.session.stoid])
            .then((result) => {
                const file = common.getUserFileUploadsLocationFullPath(result[0].Link);

                fs.exists(file, (exists) => {
                    if (exists) res.download(file);
                    else logger.error(`File(${file}) not found Error occured in downloadDocument`);
                });
            })
            .catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in downloadDocument`);
            });
	},
	downloadDocumentFromKYC(req, res) {
        // common.checkUserAuthorizationForModuleSTO(req, res, 9);

        const stmt = 'Select * from investorsto where investorid = ? and stoid = ?';
        mysql.executeSQLStatement(stmt, [req.query.id, req.session.stoid]).then((result) => {

            if(result[0].length == 0) {
                common.handleError(req, res, `Admin ${req.session.user.ID} is trying to download investor ${req.query.id} KYC document who do not belong to this STO. Error in KYCView downloadDocumentFromKYC`);
                return;
            }

            // TODO    make check that user has access to this file
            const params = {};
            params.InvestorID = req.query.id;
            params.fileID = req.query.fileID;
            params.index = req.query.index;
            params.stepid = req.query.stepid;
            mysql.downloadDocmentFromKYCRecord(params, req, res);

        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in KYCView getInvestorKYCData`);
        });

	},
	deleteDocument(req, res) {
		common.checkUserAuthorizationForModuleSTO(req, res, 39);

		function getDocumentRecord(callback) {
			const sql = 'Select * from investordocuments where id = ? and stoid = ?';
			const params = {};
			mysql.executeSQLStatement(sql, [req.query.docid, req.session.stoid])
				.then((result) => {
					params.rec = result[0];
					callback(null, params);
				})
				.catch((error) => {
					common.handleError(req, res, `${error.message} Error occured in deleteDocument getDocumentRecord`);
				});
		}
		function deleteUserDocumentFormDB(params, callback) {
			const sql = 'Delete from investordocuments where id = ? and stoid = ?';
			mysql.executeSQLStatement(sql, [req.query.docid, req.session.stoid])
				.then(() => {
					callback(null, params);
				})
				.catch((error) => {
					common.handleError(req, res, `${error.message} Error occured in deleteDocument deleteDocument`);
				});
		}
		function deleteUserDocumentFromDisk(params, callback) {
			fs.exists(common.getUserFileUploadsLocationFullPath(params.rec.Link), (exists) => {
				if (exists) {
					fs.unlink(common.getUserFileUploadsLocationFullPath(params.rec.Link), (err) => {
						if (err) { logger.error(`${params.rec.Link} User Document deleted from disk outside platform`); }
						callback(null);
					});
				} else { callback(null); }
			});
		}
		async.waterfall([
			getDocumentRecord,
			deleteUserDocumentFormDB,
			deleteUserDocumentFromDisk,
		], (err) => {
            if (!err) {
                res.redirect(`investorsViewSto?id=${req.query.id}`);
            }
        });
	},


    sendtokentoinvestor(req, res) {

    common.checkUserAuthorizationForModuleSTO(req, res, 3);
    const isSellRequest = req.query.sellReq;

    function getInvestorRecord(callback) {
      const stmt = 'Select i.ID, i.FirstName, i.LastName, i.country, i.email, i.town, i.state from investor i, investorsto s where i.id = ? and i.id = s.investorid and s.stoid = ?';
      mysql.executeSQLStatement(stmt, [req.query.id, req.session.stoid]).then((result) => {
        const params = {};
        if (result.length == 0) {
          common.handleError(req, res, `Admin ${req.session.user.ID} is trying to send tokens to investor ${req.query.id} who do not belong to this STO. Error in sendtokentoinvestor getInvestorRecord`);
          return;
        } else {
          params.investorRec = result[0];
          callback(null, params);
        }
      }).catch((error) => {
        common.handleError(req, res, `${error.message} Error in sendtokentoinvestor getInvestorRecord`);
      });
    }

    function getTokenInformation(params, callback) {
      const stmt = 'select * from sharetypes where id=? and stoid=?';
      mysql.executeSQLStatement(stmt, [req.query.sid, req.session.stoid]).then((result) => {
        if (result.length == 0) {
          common.handleError(req, res, `Admin ${req.session.user.ID} is trying to send share types to investor ${req.query.sid} that do not belong to this STO. Error in sendtokentoinvestor getTokenInformation`);
          return;
        } else {
          params.shareType = result[0];
          if (params.shareType.premimum == null)
            params.shareType.premimum = 0;

          callback(null, params);
        }
      }).catch((error) => {
        common.handleError(req, res, `${error.message} Error in sendtokentoinvestor getTokenInformation`);
      });
    }

    function getInvestorPurchaseRequest(params, callback) {
      if (req.query.tid != null) {      //tid if not null means buy share transfer is being triggered as result of buy shares request
        const stmt = `select i.ID, i.Shares, s.currencyid as toCurrencyID, s.premimum, i.purchasePriceOffered, i.fromCurrencyID from InvestorBuyPropertyAlert i, sharetypes s where i.sharetypeid = s.id and i.id = ? and i.investorid = ?`;
        mysql.executeSQLStatement(stmt, [req.query.tid, req.query.id]).then((result) => {
          params.buyPropertyAlert = result[0];
          if (!params.buyPropertyAlert.fromCurrencyID) {
            params.buyPropertyAlert.fromCurrencyID = params.buyPropertyAlert.toCurrencyID;
          }
          if (!result[0].purchasePriceOffered) {
            result[0].purchasePriceOffered = math.multiply(result[0].premimum ?? 0, result[0].Shares ?? 0).toFixed(global.config.BlockchainBalanceInFractions)
          }
          params.buyPropertyAlertShow = 1;

          callback(null, params);
        }).catch((error) => {
          common.handleError(req, res, `${error.message} Error in sendtokentoinvestor getInvestorPurchaseRequest`);
        });
      } else {
        params.buyPropertyAlertShow = 0;
        params.buyPropertyAlert = [];
        callback(null, params);
      }
    }

    function getInvestorCurrentBalance(params, callback) {

      if (params.buyPropertyAlertShow == 1) {
        // if triggered as result of buy request   get balance of the investor that will be deducted

        wallet.getInvestorBalance(req.query.id, req.session.stoid, params.buyPropertyAlert.fromCurrencyID, global.config.investorInternalWalletProjectSpecific).then((balance) => {
          params.investorCurrencyBalance = { Amount: balance, currencyID: params.buyPropertyAlert.fromCurrencyID };
          callback(null, params);
        })

      } else {
        params.investorCurrencyBalance = {};
        callback(null, params);
      }
    }

    function getInvestorWalletAddressesIfBlockchain(params, callback) {
      if (params.shareType.isblockchain) {
        const stmt = `SELECT * FROM shareswallet where investorid = ? and sharesID = ? and isBlocked = 0 and publicKey != 'platform'`;
        mysql.executeSQLStatement(stmt, [req.query.id, req.query.sid]).then((result) => {
          params.investorWallet = result;
          callback(null, params);
        }).catch((error) => {
          common.handleError(req, res, `${error.message} Error in sendtokentoinvestor getInvestorWalletAddressesIfBlockchain`);
        });
      } else {
        params.investorWallet = [];
        callback(null, params);
      }
    }

    function getShareTypeRecordFromDB(params, callback) {
      const stmt = 'select companyShares from sharetypes  where id=? and stoid=?';
      mysql.executeSQLStatement(stmt, [req.query.sid, req.session.stoid]).then((result) => {
        params.companyDBBalance = result[0].companyShares;
        callback(null, params);
      }).catch((error) => {
        common.handleError(req, res, `${error.message} Error in sendtokentoinvestor getShareTypeRecordFromDB`);
      });
    }

    function getCompanyBlockchainCurrentBalance(params, callback) {
      if (params.shareType.isblockchain) {

        refreshBlockchain.updateBlockchainCompanyTotalBalances(params.shareType.blockchainProtocol, params.shareType.ethereumBlockchainPublicAddress, params.shareType.ethereumContractAddress, params.shareType.ID, req.session.stoid).then((data) => {

          params.companyBlockchainBalance = data.companyBalanceInBlockchain;
          params.companyWalletBalance = data.companyBalance;

          callback(null, params);

        }, (error) => {
          callback(null, params);
        });

      } else {
        callback(null, params);
      }

    }

    function getOffChainTransfersFromDB(params, callback) {
      if (params.shareType.isblockchain) {
        const stmt = 'select COALESCE(sum(shares), 0) as sum from shareswallet where sharesid = ? and publickey = \'platform\' ';
        mysql.executeSQLStatement(stmt, [req.query.sid]).then((result) => {
          params.companyWalletBalance = params.companyBlockchainBalance - parseFloat(result[0].sum);
          callback(null, params);
        }).catch((error) => {
          common.handleError(req, res, `${error.message} Error in sendtokentoinvestor getOffChainTransfersFromDB`);
        });
      } else {
        params.companyWalletBalance = 0;     //on the GUI side for non blockchain shares the balance will always be 0
        callback(null, params);
      }
    }

    function setCompanyBalanceInDB(params, callback) {
      if (params.shareType.isblockchain) {
        const stmt = 'update sharetypes set companyShares=? where id=? and stoid=?';
        mysql.executeSQLStatement(stmt, [params.companyWalletBalance, req.query.sid, req.session.stoid]).then((result) => {
          callback(null, params);
        }).catch((error) => {
          common.handleError(req, res, `${error.message} Error in sendtokentoinvestor setCompanyBalanceInDB`);
        });
      } else {
        callback(null, params);
      }
    }

    async.waterfall([
      getInvestorRecord,
      getTokenInformation,
      getInvestorPurchaseRequest,
      getInvestorCurrentBalance,
      getInvestorWalletAddressesIfBlockchain,
      getShareTypeRecordFromDB,
      getCompanyBlockchainCurrentBalance,
      //getOffChainTransfersFromDB,
      //setCompanyBalanceInDB
    ], (err, params) => {
      const dat = new Date();


      // Deduct number of shares admin has setup not available for selling
      if (params.shareType.reduceSharesForPurchase > 0) {
        params.companyWalletBalance = math.subtract(params.companyWalletBalance ?? 0, params.shareType.reduceSharesForPurchase ?? 0) ?? 0;
        params.shareType.companyShares = math.subtract(params.shareType.companyShares ?? 0, params.shareType.reduceSharesForPurchase ?? 0) ?? 0;
      }
      res.render('admin/sendtokenstoinvestor', {
        Data: common.getCommonPageProperties(req),
        sid: req.query.sid,
        defaultDate: common.getMonthName(dat.getMonth()) + ' ' + dat.getDate() + ' ' + dat.getFullYear(),
        id: req.query.id,
        smartContractAddress: params.shareType.ethereumContractAddress,
        buyPropertyAlertShow: params.buyPropertyAlertShow,
        buyPropertyAlert: params.buyPropertyAlert,
        investorCurrencyBalance: params.investorCurrencyBalance,
        isSellRequest: isSellRequest == 1,
        partials: common.getPartials(),
        investorRec: params.investorRec,
        csrfToken: req.csrfToken(),
        shareType: params.shareType,
        investorWallet: params.investorWallet,
        companyWalletBalance: params.companyWalletBalance,
      });
		});
	},
    sendtokenstoinvestorblockchaincall(req, res) {

        /**
         * Investor amount is only required if there is a buy order.
         * @param {number} buyPropertyAlertID
         * @param {number} Investment
         * @param {number} investorID
         * Are the variables that indicate if this is a transfer as a result of a buy order from the investor.
         * The amount to reduce is in the Investment variable.
         */

        common.checkUserAuthorizationForModuleSTO(req, res, 3);
        const isSellRequest = req.body.sellRequestCheck;
        const tokensToTransfer = req.body.tokens;
        const investorID = req.body.id;

        function getTokenDBRecord(callback) {
          const stmt = 'SELECT * FROM sharetypes WHERE id=? AND stoid=?';
          mysql.executeSQLStatement(stmt, [req.body.sid, req.session.stoid]).then((result) => {
            if (result.length == 0) {
              common.handleError(
                req,
                res,
                `Admin ${req.session.user.ID} is trying to send share types to investor ${req.query.sid} that do not belong to this STO.
                Error in sendtokenstoinvestorblockchaincall getTokenDBRecord`
                );
              return;
            } else {

              var buyPropertyAlertID = 0;
              if (req.body.buyPropertyAlertID != null)
                buyPropertyAlertID = parseInt(req.body.buyPropertyAlertID);

              var sendEmailToInvestor = 0;
              if (req.body.chkSendEmail != null)
                if (req.body.chkSendEmail == 'on')
                  sendEmailToInvestor = 1;

              var params = {
                Investment: parseFloat(req.body.investment),
                InvestmentDescription: req.body.description,
                sendEmailToInvestor: sendEmailToInvestor,
                buyPropertyAlertID: buyPropertyAlertID,
              };

              params.shareType = result[0];
              callback(null, params);
            }

          }).catch((error) => {
            common.handleError(req, res, `${error.message} Error in sendtokenstoinvestorblockchaincall getTokenDBRecord`);
          });
        }

        function getInvestorRecord(params, callback) {
          const stmt = 'SELECT i.ID, i.FirstName, i.LastName, i.email FROM investor i, investorsto s WHERE i.id = ? AND i.id = s.investorid AND s.stoid = ?';

          mysql.executeSQLStatement(stmt, [investorID, req.session.stoid]).then((result) => {

            if (result.length == 0) {
              common.handleError(
                req,
                res,
                `Admin ${req.session.user.ID} is trying to send tokens to investor ${investorID} who do not belong to this STO.
                Error in sendtokenstoinvestorblockchaincall getInvestorRecord 1`
                );
              return;
            } else {
              params.investorName = `${result[0].FirstName} ${result[0].LastName}`;
              params.FirstName = result[0].FirstName;
              params.LastName = result[0].LastName;
              params.email = result[0].email;
              callback(null, params);
            }

          }).catch((error) => {
            common.handleError(req, res, `${error.message} Error in sendtokenstoinvestorblockchaincall getInvestorRecord 2`);
          });
        }

        function getInvestorPurchaseRequest(params, callback) {
          const stmt = `SELECT i.fromCurrencyID FROM InvestorBuyPropertyAlert i WHERE i.id = ?`;
          mysql.executeSQLStatement(stmt, [params.buyPropertyAlertID]).then((result) => {
            params.fromCurrencyID = result[0]?.fromCurrencyID ?? params.shareType.currencyid;

            callback(null, params);
          }).catch((error) => {
            common.handleError(req, res, `${error.message} Error in sendtokentoinvestor getInvestorPurchaseRequest`);
          });
        }

        function sendTransaction(params, callback) {

          if (params.shareType.isblockchain === 0 || req.body.transferSharesOnChain == '0') {
              //Non-Blockchain Shares Transfer
            transferSharesService(investorID, req.session.stoid, req.body.sid, tokensToTransfer, req.session.user.ID, isSellRequest)
              .then((income) => {

                if (req.body.buyPropertyAlertID != null) {
                  // Condition set by Genius that commission will only be given as result of purchase request from investor
                  // This block of code will not execute if admin is transferring shares directly to investor through admin panel

                  // Genius Specific Code.
                  registerAffiliatePurchase(
                    investorID,
                    req.session.stoid,
                    parseInt(req.body.sid),
                    tokensToTransfer,
                  ).then(() => {
                    callback(null, params);
                  }).catch(error => { // there is error handling inside that controller, this won't occur
                    common.handleError(
                        req,
                        res,
                        `${error} - Error in sendtokenstoinvestorblockchaincall - 
                        Purchase of tokens:${tokensToTransfer} tokens for id:${investorID} in sto:${req.session.stoid} not registered in affiliate system!`);
                    callback(null, params);
                  });

                } else
                  callback(null, params);

              });

          } else if (params.shareType.isblockchain === 1) {

            var keys = {};
            if (params.shareType.walletCustodayType == 0 && (common.isEthereumBasedProtocolID(params.shareType.blockchainProtocol))) {
              if (req.body.metaMaskTransaction == '0') {
                keys = ethereumApi.decryptKey(JSON.parse(req.body.filecontents), req.body.password);
                if (keys === 'error') {
                  req.flash('errorMessage', 'Private key cannot be authenticated. No shares transferred');
                  res.redirect(`investorsViewSto?id=${investorID}`);
                  return;
                }
              } else {
                keys.public = '';
                keys.private = '';
              }
            } else {
              keys.public = '';
              keys.private = '';
            }

            const sql = `
                    INSERT INTO blockchainSharesTransferTransactions (
                        hostname,
                        toAddress,
                        stoid, 
                        adminid, 
                        investorID, 
                        shareTypeID, 
                        amountToSend, 
                        investmentDetails, 
                        investmentAmount, 
                        reduceInvestorBalance, 
                        status, 
                        transactionID, 
                        recordDate)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, '', now())
                    `;

            mysql.executeSQLStatement(sql,
                [
                    req.hostname,
                    req.body.publicAddress,
                    req.session.stoid,
                    req.session.user.ID,
                    investorID,
                    req.body.sid,
                    tokensToTransfer,
                    params.InvestmentDescription,
                    params.Investment, 0
                ]).then((result) => {
                    var reduceInvestorBalance = 0;
                    if (params.buyPropertyAlertID != 0)
                        reduceInvestorBalance = 1;

                    blockchainApi.sendTokens(1,
                        keys.private,
                        req.body.publicAddress,
                        tokensToTransfer,
                        req.session.stoid,
                        investorID,
                        req.session.user.ID,
                        req.body.sid,
                        params.Investment,
                        params.InvestmentDescription,
                        params.buyPropertyAlertID,
                        reduceInvestorBalance,
                        params.sendEmailToInvestor,
                        result.insertId,
                        req.body.metaMaskTransaction,
                        req.body.blockchainTransactionID
                    ).then(() => {

                    // Genius Specific Code
                    if (req.body.buyPropertyAlertID != null) {
                    // Condition set by Genius that commission will only be given as result of purchase request from investor
                    // This block of code will not execute if admin is transferring shares directly to investor through admin panel

                        // Genius Specific Code.
                        registerAffiliatePurchase(
                            investorID,
                            req.session.stoid,
                            parseInt(req.body.sid),
                            tokensToTransfer,
                        ).then(() => {
                            callback(null, params);
                        }).catch(error => { // there is error handling inside that controller, this won't occur
                            common.handleError(
                                req,
                                res,
                                `${error} - Error in sendtokenstoinvestorblockchaincall -
                                 Purchase of tokens:${tokensToTransfer} tokens for id:${investorID} in sto:${req.session.stoid} not registered in affiliate system!`
                            );
                        }).finally(
                            Promise.resolve(),
                        );
                    } else
                        callback(null, params);
                    }).catch((error) => {
                        req.flash('errorMessage', 'Error Occured Sending Shares in blockchain');
                        logger.error(`Error Occured Sending Shares in blockchain - ${error.message}`);
                        res.redirect(`investorsViewSto?id=${investorID}`);
                        return;
                    })
                }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in sendtokenstoinvestorblockchaincall`);
                });
          }
        }

        function createInvestmentRecord(params, callback) {
          // only Non-Blockchain execution block

          if (params.shareType.isblockchain === 0 || req.body.transferSharesOnChain == '0') {
            const stmt = `INSERT INTO investments(
                            UserID, 
                            InvestorID, 
                            DateTime, 
                            TokensTransferred, 
                            AmountInvested, 
                            CurrencyID, 
                            Description, 
                            stoid, 
                            sharetypeid) 
                        VALUES (?, ?, now(), ?, ?, ?, ?, ?, ?)`;

            // req.body.txtOpenDate,   date is comig from interface but for some reason 1970-01-01 default date is being inserted
            // in production     need investigation why this is happening on production
            const values = [req.session.user.ID, investorID, tokensToTransfer, params.Investment, params.fromCurrencyID, params.InvestmentDescription, req.session.stoid, req.body.sid];

            mysql.executeSQLStatement(stmt, values).then(() => {
              callback(null, params);
            }).catch((error) => {
              logger.error(`${error.message} - Error in sendtokenstoinvestorblockchaincall createInvestmentHistroy`);
            });
          } else {
            callback(null, params);
          }

        }

        async function reduceInvestorBalance(params, callback) {
            // only Non-Blockchain execution block

            if (params.shareType.isblockchain === 0 || req.body.transferSharesOnChain == '0' && !isSellRequest) {
                if (req.body.buyPropertyAlertID != null) {
                    if (global.config.platformConfiguration === 3) {
                        await wallet.reduceInvestorBalance(
                            investorID,
                            req.session.stoid,
                            params.fromCurrencyID,
                            params.Investment,
                            req.session.user.ID,
                            5,
                            `${parseFloat(tokensToTransfer)} ${params.shareType.title} Shares Transfer`,
                            1,
                            global.config.investorInternalWalletProjectSpecific
                        )
                    }
                    const logDescription = `Request For Share Purchasing Approved (Non-Blockchain). InvestorBuyPropertyAlert.ID: ${req.body.buyPropertyAlertID}`;
                    const sql = `
                                UPDATE InvestorBuyPropertyAlert SET status = 2 WHERE id = ?;
                                INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) VALUES (?,?,NOW(),?,?,?,?);
                            `;
                    mysql.executeSQLStatement(sql, [
                        req.body.buyPropertyAlertID,
                        req.session.stoid,
                        req.session.user.ID,
                        logDescription,
                        investorID,
                        23,
                        req.body.buyPropertyAlertID,
                    ]).then((result) => {
                        logger.info(`Request For Share Purchasing Approved (Non-Blockchain). InvestorBuyPropertyAlert.ID: ${req.body.buyPropertyAlertID} STO ID: ${req.session.stoid} User ID: ${req.session.user.ID} Investor ID: ${investorID} Activity Type ID: 23 Rec ID: ${req.body.buyPropertyAlertID}`);
                        const st = `update InvestorInvoices set status = 2 where buyAlertID = ?`;
                        mysql.executeSQLStatement(st, [req.body.buyPropertyAlertID]).catch((error) => {
                            common.handleError(req, res, `${error.message} Error update invoice status`);
                        });
                        callback(null, params);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.message}Error in sendtokenstoinvestorblockchaincall reduceInvestorBalance update InvestorBuyPropertyAlert`);
                    });
                } else {
                    callback(null, params);
                }
            } else {
                callback(null, params);
            }
        }         // investor buy request processing

        async function increaseInvestorBalance(params, callback) {
            // only Non-Blockchain execution block
            if (params.shareType.isblockchain === 0 || req.body.transferSharesOnChain == '0' && isSellRequest) {
                if (req.body.buyPropertyAlertID != null) {
                    if (global.config.platformConfiguration === 3) {
                        await wallet.increaseInvestorBalance(
                            investorID,
                            req.session.stoid,
                            params.fromCurrencyID,
                            params.Investment,
                            req.session.user.ID,
                            5,
                            -1,
                            `${parseFloat(tokensToTransfer)} ${params.shareType.title} Shares sellback`,
                            1,
                            global.config.investorInternalWalletProjectSpecific
                        )
                    }
                    const logDescription = `Request for share sell back approved (non-blockain call). InvestorBuyPropertyAlert.ID: ${req.body.buyPropertyAlertID}`;
                    const sql = `
                                        UPDATE InvestorBuyPropertyAlert SET status = 2 WHERE id = ?;
                                        INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) VALUES (?,?,NOW(),?,?,?,?);`;

                    mysql.executeSQLStatement(sql, [
                        req.body.buyPropertyAlertID,
                        req.session.stoid,
                        req.session.user.ID,
                        logDescription,
                        investorID,
                        23,
                        req.body.buyPropertyAlertID,
                    ]).then((result) => {
                        logger.info(`Request for share sellback approved (non-blockchain call). InvestorBuyPropertyAlert.ID: ${req.body.buyPropertyAlertID} STO ID: ${req.session.stoid} User ID: ${req.session.user.ID} Investor ID: ${investorID} Activity Type ID: 23 Rec ID: ${req.body.buyPropertyAlertID}`);
                        callback(null, params);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.message}Error in sendtokenstoinvestorblockchaincall increaseInvestorBalance update InvestorBuyPropertyAlert`);
                    });
                } else {
                    callback(null, params);
                }
            } else {
                callback(null, params);
            }
        }

        function sendEmail(params, callback) {
          // only Non-Blockchain execution block
          if ((params.shareType.isblockchain === 0 || req.body.transferSharesOnChain == '0') && params.sendEmailToInvestor === 1) {
            const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
            if (!stoEmailTexts) throw new Error(`Email texts not found for sharesTransferredNonBlockchain`);

            let txtEmail = emailTextsController.format((isSellRequest ? stoEmailTexts.sharesSoldBackNonBlockchain : stoEmailTexts.sharesTransferredNonBlockchain.Line1), {
              firstname: params.FirstName,
              lastname: params.LastName,
              tokens: parseFloat(tokensToTransfer),
              title: params.shareType.title,
              currency: common.getCurrentcySymbol(params.shareType.currencyid),
              nominal: params.shareType.nominalValue,
              // YES "PREMIMUM" IS CORRECT
              premium: params.shareType.premimum,
            });
            txtEmail += '<br /><br />';
            txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

            common.sendEmail(req.hostname, params.email, `${getSTOFromConfig(req.session.stoid).title}: ${(isSellRequest ? emailTexts.sharesSoldBackNonBlockchain.Subject : emailTexts.sharesTransferredNonBlockchain.Subject)}`, txtEmail, [])
              .then(() => {
                callback(null, params);
              }, (err2) => {
                logger.info(`${err2.message} Error occured in sendtokenstoinvestorblockchaincall send email`);
                callback(null, params);
              });
          } else callback(null, params);
        }

        function shareHistoryRecordUpdate(params, callback) {

          if (params.shareType.isblockchain === 0 || req.body.transferSharesOnChain == '0') {
            const stmt = 'SELECT * FROM shares WHERE investorid=? AND stoid=? AND sharetypeid = ?';
            mysql.executeSQLStatement(stmt, [investorID, req.session.stoid, req.body.sid]).then((result) => {

              params.investorShares = result[0];
              mysql.executeSQLStatement('UPDATE shareshistory SET isActive = 0 WHERE id = ?', [params.investorShares.sharesHistoryID]).then((result) => {
                mysql.executeSQLStatement('SELECT * FROM shareshistory WHERE id = ?', [params.investorShares.sharesHistoryID]).then((result) => {
                  params.historyRecord = result;
                  callback(null, params);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error in sendtokenstoinvestorblockchaincall createHistoryRecordIfNewOrGetExisting`);
                });
              }).catch((error) => {
                common.handleError(req, res, `${error.message} Error in sendtokenstoinvestorblockchaincall createHistoryRecordIfNewOrGetExisting`);
              });

            }).catch((error) => {
              common.handleError(req, res, `${error.message} Error in sendtokenstoinvestorblockchaincall getInvestorSharesOfSTO`);
            });
          } else {
            callback(null, params);
          }

        }

        function shareHistoryRecordCreate(params, callback) {
          if (params.shareType.isblockchain === 0 || req.body.transferSharesOnChain == '0') {
            const tot = params.investorShares.shares;
            var certificateSeries = req.body.certificatesnos;
            var sharesSeries = req.body.sharenos;

            if (params.historyRecord.length > 0) {
              certificateSeries = params.historyRecord[0].CertificateSerials + '     ' + certificateSeries;
              sharesSeries = params.historyRecord[0].ShareSerials + '     ' + sharesSeries;
            }

            const stmt = 'INSERT INTO shareshistory(sharesid, isActive, investorID, shares, shareTypeid, CertificateSerials, ShareSerials, purchaserID, datePurchase) VALUES (-1, 1, ?, ?, ?, ?, ?, -1, ?)';
            mysql.executeSQLStatement(stmt, [investorID, tot, req.body.sid, certificateSeries, sharesSeries, req.body.txtOpenDate]).then((result) => {

              mysql.executeSQLStatement('UPDATE shares SET sharesHistoryID = ? WHERE id = ?',
                [result.insertId, params.investorShares.ID]).then((result) => {
                console.log('history created')
                callback(null, params);
              });

            }).catch((error) => {
              common.handleError(req, res, `${error.message} Error in sendtokenstoinvestorblockchaincall updateShareHistoryRecordWithShareRecordID`);
            });
          } else {
            callback(null, params);
          }
        }

        async.waterfall([
          getTokenDBRecord,
          getInvestorRecord,
          getInvestorPurchaseRequest,
          sendTransaction,
          createInvestmentRecord,
          reduceInvestorBalance,
          increaseInvestorBalance,
          sendEmail,
          shareHistoryRecordUpdate,
          shareHistoryRecordCreate,
        ], (err, params) => {
          if (!err) {
            if (params.shareType.isblockchain === 0 || req.body.transferSharesOnChain == '0'){
              req.flash('errorMessage', 'Shares transferred to investor');
            }
            else {
              req.flash('errorMessage', 'Blockchain Transaction is being processed. Please refresh later');
            }
            res.redirect(`investorsViewSto?id=${investorID}`);
          }
        });

      },
    transferShares(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 19);
        const params = {};

        function getInvestorSharesOfSTO(callback) {
            const stmt = 'select s.ID, s.investorID, s.shares, s.sharesHistoryID, t.nominalValue, t.premimum, t.currencyid, t.title from shares s, sharetypes t where s.id=? and s.stoid=? and t.id = s.sharetypeid';
            mysql.executeSQLStatement(stmt, [req.query.id, req.session.stoid]).then((result) => {
                if(result.length > 0) {
                    params.investorShares = result[0];
                    callback(null);
                }
                else
                    callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in transferShares getInvestorSharesOfSTO`);
            });
        }
        function getInvestorRecord(callback) {
            const stmt = 'Select * from investor i, investorsto s where i.id = ? and i.id = s.investorid and s.stoid = ?';
            mysql.executeSQLStatement(stmt, [params.investorShares.investorID, req.session.stoid]).then((result) => {
               if(result.length == 0) {
                    common.handleError(req, res, `transferShares getInvestorRecord - Admin ${req.session.user.ID}  is trying to send tokens from investor ${params.investorShares.investorID} who do not belong to this STO. Error in transferShares getInvestorRecord`);
                } else {
					params.investorRec = result[0];
					callback(null);
				}
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in transferShares getInvestorRecord`);
            });
        }
        function getShareHistoryRecord(callback) {
            const stmt = 'Select * from shareshistory where id = ?';

            mysql.executeSQLStatement(stmt, [params.investorShares.sharesHistoryID]).then((result) => {
                params.sharesHistoryRec = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in transferShares getShareHistoryRecord`);
            });
        }
        async.waterfall([
            getInvestorSharesOfSTO,
            getInvestorRecord,
            getShareHistoryRecord
        ], (err) => {
            res.render('admin/transfershares', {
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
                investorShares: params.investorShares,
                investorRec: params.investorRec,
                sharesHistoryRec: params.sharesHistoryRec,
                csrfToken: req.csrfToken(),
            });
        });

    },
    transferSharesSubmit(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 19);
        var params = {};

        function checkReceiverInvestorBelongToSTO(callback) {

            if(req.body.companyinvestorselected == "2") {     // check shares are being transferred to another investor
                const stmt = 'select * from investorsto where investorid = ? and stoid = ?';
                mysql.executeSQLStatement(stmt, [req.body.investorID, req.session.stoid]).then((result) => {
                    if(result.length > 0) {
                        callback(null);
                    } else {
                        common.handleError(req, res, ` Admin ${req.session.user.ID} - Share transfer requested to  another investor ${req.body.investorID} who does not belong to this STO `);
                        return;
                    }
                }).catch((error) => {
                    common.handleError(req, res, `${error.message}Error in transferSharesSubmit getInvestorSharesOfSTO`);
                });
            } else   // share are being transferred back to company so no need to check above
                callback(null);
        }
        function getInvestorSharesOfSTO(callback) {
            const stmt = 'select s.ID, s.investorID, s.shares, s.sharesHistoryID, t.nominalValue, t.premimum, t.title, t.currencyid, t.id as shareTypeid, t.title from shares s, sharetypes t where s.id=? and s.stoid=? and t.id = s.sharetypeid';
            mysql.executeSQLStatement(stmt, [req.body.id, req.session.stoid]).then((result) => {
                if(result.length > 0) {
                    params.investorShares = result[0];
                    callback(null);
                }
                else {
                    common.handleError(req, res, ` Admin ${req.session.user.ID} - Share transfer requested from one investor to another but look like sharetype and share records do not match each other. seems like something called out of normal application flow that needs investigration`);
                    return;
                }
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in transferSharesSubmit getInvestorSharesOfSTO`);
            });
        }
        function getShareHistoryRecord(callback) {
            const stmt = 'Select * from shareshistory where id = ?';
            mysql.executeSQLStatement(stmt, [params.investorShares.sharesHistoryID]).then((result) => {
                params.sharesHistoryRec = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in transferShares getShareHistoryRecord`);
            });
        }
        function checkShares(callback) {
            const sh = parseInt(req.body.sharesToTransfer, 10);
            if(sh > params.investorShares.shares) {
                common.handleError(req, res, ` Admin ${req.session.user.ID} - Admin is trying to transfer more shares from one investor to another investor which is illegal.`);
                return;
            } else
                callback(null);
        }
        function addNewHistoryRecord(callback) {
            const newBalance = math.subtract(params.investorShares.shares ?? 0, parseInt(req.body.sharesToTransfer, 10) ?? 0) ?? 0;
            const stmt = 'insert into shareshistory(sharesid, isActive, investorID, shares, shareTypeid, CertificateSerials, ShareSerials, purchaserID, datePurchase) values(?, 1, ?, ?, ?, ?, ?, -1, ?)';
            mysql.executeSQLStatement(stmt, [req.body.id, params.investorShares.investorID, newBalance, params.investorShares.shareTypeid, req.body.certificatesnos, req.body.sharenos, req.body.purchaseDate]).then((result) => {
                params.newSenderShareHistoryId = result.insertId;
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in transferShares addNewHistoryRecord`);
            });
        }
        function updateExistingSharesRecord(callback) {
            const newBalance = math.subtract(params.investorShares.shares ?? 0, parseInt(req.body.sharesToTransfer, 10) ?? 0);
            const stmt = 'update shares set shares=?, sharesHistoryID=? where investorid=? and stoid=? and sharetypeid = ?';
            mysql.executeSQLStatement(stmt, [newBalance, params.newSenderShareHistoryId, params.investorShares.investorID, req.session.stoid, params.investorShares.shareTypeid]).then((result)=> {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in transferSharesSubmit updateExistingSharesRecord`);
            });

        }
        function updateOldSharesHistroyRecord(callback) {
            const stmt = 'update shareshistory set isActive=0, purchaserID = ? where id = ?';
            mysql.executeSQLStatement(stmt, [req.body.selectedInvestorID, params.sharesHistoryRec.ID]).then((result)=> {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error in transferSharesSubmit updateOldSharesHistroyRecord`);
            });
        }
        function addSenderShareTransferLog(callback) {
            var LogDescription = "";
            if(req.body.companyinvestorselected == "2")
                LogDescription = `${req.body.sharesToTransfer} ${params.investorShares.title} transferred to other Investor (ID:${req.body.investorID})`;
            else
                LogDescription = `${req.body.sharesToTransfer} ${params.investorShares.title} transferred back to Company`;

            const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid, recid) values (?,NOW(),?,?,?,?,?)';
            const sqlparams = [req.session.user.ID, LogDescription, params.investorShares.investorID, 5, req.session.stoid, -1];
            mysql.executeSQLStatement(stmt, sqlparams)
            .then(() => {
                callback(null);
            }).catch((error) => {
                logger.error(`${error.message} - Error occured in transferSharesSubmit addSenderShareTransferLog`);
            });
        }

        function transferSharesToCompanyIfSelected(callback) {
            if(req.body.companyinvestorselected == "2")
                callback(null);
            else {
                const stmt = 'update sharetypes set companyshares = companyshares + ? where id = ? and stoid = ?';
                mysql.executeSQLStatement(stmt, [ parseInt(req.body.sharesToTransfer, 10), params.investorShares.shareTypeid, req.session.stoid]).then((result)=> {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error in transferSharesSubmit transferSharesToCompanyIfSelected`);
                });
            }
        }

        function getReceiverInvestorSharesOfSTO(callback) {
            if(req.body.companyinvestorselected == "2") {
                const stmt = 'select * from shares where investorid=? and stoid=? and sharetypeid = ?';
                mysql.executeSQLStatement(stmt, [req.body.investorID, req.session.stoid, params.investorShares.shareTypeid]).then((result) => {
                    if(result.length > 0) {
                        params.investorReceiverShares = result[0];
                        params.receiverInvestorSharesRecFound = 1;
                        params.receiverShares = params.investorReceiverShares.shares
                        callback(null);
                    }
                    else {
                        params.receiverInvestorSharesRecFound = 0;
                        params.receiverShares = 0;
                        callback(null);
                    }
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error in transferSharesSubmit getReceiverInvestorSharesOfSTO`);
                });
            } else
                callback(null);
        }
        function createReceiverHistoryRecordIfNewOrGetExisting(callback) {

            if(req.body.companyinvestorselected == "2") {

                if (params.receiverInvestorSharesRecFound === 1) {
                    mysql.executeSQLStatement('update shareshistory set isActive = 0 where id = ?', [params.investorReceiverShares.sharesHistoryID]).then((result) => {

                                mysql.executeSQLStatement('select * from shareshistory where id = ?', [params.investorReceiverShares.sharesHistoryID]).then((result) => {
                                    params.historyReceiverRecord = result[0];
                                    callback(null);
                                }).catch((error) => {
                                    common.handleError(req, res, `${error.message} Error in transferSharesSubmit createReceiverHistoryRecordIfNewOrGetExisting`);
                                });

                    }).catch((error) => {
                        common.handleError(req, res, `${error.message} Error in transferSharesSubmit createReceiverHistoryRecordIfNewOrGetExisting`);
                    });
                } else
                    callback(null);
            } else
                callback(null);

        }
        function updateReceiverShareHistoryRecordWithShareRecordID(callback) {
            if(req.body.companyinvestorselected == "2") {      // if receiver is another investor.     1 = company receiver

                const tot = params.receiverShares + parseInt(req.body.sharesToTransfer, 10);
                var certificateSeries = req.body.certificatesnospurchaser;
                var sharesSeries = req.body.sharenospurchase;

                if(  params.historyReceiverRecord  != null ) {
                    if (params.receiverInvestorSharesRecFound === 1) {
                        certificateSeries = params.historyReceiverRecord.CertificateSerials + "     " + certificateSeries;
                        sharesSeries = params.historyReceiverRecord.ShareSerials + "     " + sharesSeries;
                    }
                }

                const stmt = 'insert into shareshistory(sharesid, isActive, investorID, shares, shareTypeid, CertificateSerials, ShareSerials, purchaserID, datePurchase) values(-1, 1, ?, ?, ?, ?, ?, -1, ?)';
                mysql.executeSQLStatement(stmt, [req.body.investorID, tot, params.investorShares.shareTypeid, certificateSeries.trim(), sharesSeries.trim(), req.body.purchaseDate]).then((result) => {
                    params.newReceiverShareHistoryId = result.insertId;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error in transferSharesSubmit updateReceiverShareHistoryRecordWithShareRecordID`);
                });


                /* if (params.receiverInvestorSharesRecFound === 0) {
                    const stmt = 'update shareshistory set sharesid = ? where id = ?';
                    mysql.executeSQLStatement(stmt, [params.shareReceiverRecordID, params.newReceiverShareHistoryId]).then((result) => {
                        callback(null);
                    });
                } else {
                    const tot = params.receiverShares + parseInt(req.body.sharesToTransfer, 10);
                    const certificateSeries = params.historyReceiverRecord.CertificateSerials + "     " + req.body.certificatesnospurchaser;
                    const sharesSeries = params.historyReceiverRecord.ShareSerials + "     " + req.body.sharenospurchase;

                    const stmt = 'update shareshistory set shares = ?, CertificateSerials = ?, ShareSerials = ? where id = ?';
                    mysql.executeSQLStatement(stmt, [tot, certificateSeries, sharesSeries,  params.newReceiverShareHistoryId]).then((result) => {
                        callback(null);
                    });
                } */

            } else
                callback(null);
        }
        function updateReceiverInvestorRecord(callback) {
            if(req.body.companyinvestorselected == "2") {

                const tot = params.receiverShares + parseInt(req.body.sharesToTransfer, 10);

                var stmt = "";
                var data = [];
                if (params.receiverInvestorSharesRecFound === 1) {
                    stmt = 'update shares set shares = ?, sharesHistoryID = ? where investorid=? and stoid=? and sharetypeid = ?';
                    data = [tot, params.newReceiverShareHistoryId, req.body.investorID, req.session.stoid, params.investorShares.shareTypeid];
                } else {
                    stmt = 'insert into shares(shares, investorID, stoid, shareTypeid, sharesHistoryID) values (?, ?, ?, ?, ?)';
                    data = [tot, req.body.investorID, req.session.stoid, params.investorShares.shareTypeid, params.newReceiverShareHistoryId];
                }

                mysql.executeSQLStatement(stmt, data).then((result)=> {

                        if (params.receiverInvestorSharesRecFound === 0)
                            params.shareReceiverRecordID = result.insertId;
                        else
                            params.shareReceiverRecordID = params.investorReceiverShares.ID

                        mysql.executeSQLStatement('update shareshistory set sharesid = ? where id = ?', [params.shareReceiverRecordID, params.newReceiverShareHistoryId]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error in transferSharesSubmit updateReceiverInvestorRecord`);
                        });

                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error in transferSharesSubmit updateReceiverInvestorRecord`);
                });


                /* const tot = params.receiverShares + parseInt(req.body.sharesToTransfer, 10);

                var stmt = "";
                if (params.receiverInvestorSharesRecFound === 1)
                    stmt = 'update shares set shares = ? where investorid=? and stoid=? and sharetypeid = ?';
                else
                    stmt = 'insert into shares(shares, investorID, stoid, shareTypeid, sharesHistoryID) values (?, ?, ?, ?, ?)';

                mysql.executeSQLStatement(stmt, [tot, req.body.investorID, req.session.stoid, params.investorShares.shareTypeid, params.newReceiverShareHistoryId]).then((result)=> {
                    if (params.receiverInvestorSharesRecFound === 0)
                        params.shareReceiverRecordID = result.insertId;
                    //else
                        //params.shareReceiverRecordID = params.investorReceiverShares.ID;

                    callback(null);

                }).catch((error) => {
                    common.handleError(req, res, `${error.message}Error in sendtokenstoinvestorblockchaincall updateInvestorRecord`);
                }); */

            } else
                callback(null);
        }
        function addReceiverShareTransferLog(callback) {
            if(req.body.companyinvestorselected == "2") {
                const LogDescription = `${req.body.sharesToTransfer} ${params.investorShares.title} Received from investor (ID:${params.investorShares.investorID})`;
                const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid, recid) values (?,NOW(),?,?,?,?,?)';
                const sqlparams = [req.session.user.ID, LogDescription, req.body.investorID, 5, req.session.stoid, -1];
                mysql.executeSQLStatement(stmt, sqlparams)
                .then(() => {
                    callback(null);
                }).catch((error) => {
                    logger.error(`${error.message} - Error occured in transferSharesSubmit addReceiverShareTransferLog`);
                });
            } else
                callback(null);
        }
        function createInvestmentRecordForReceiver(callback) {
            if(req.body.companyinvestorselected == "2") {
                const stmt = 'Insert into investments(UserID, InvestorID, DateTime, TokensTransferred, AmountInvested, CurrencyID, Description, stoid, sharetypeid) values(?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const LogDescription = `${req.body.sharesToTransfer} ${params.investorShares.title} Received from investor (ID:${params.investorShares.investorID})`;
                const values = [req.session.user.ID, req.body.investorID, req.body.purchaseDate, req.body.sharesToTransfer, math.multiply(params.investorShares.premimum ?? 0, parseInt(req.body.sharesToTransfer ?? 0, 10) ), params.investorShares.currencyid, LogDescription, req.session.stoid, params.investorShares.shareTypeid];

                mysql.executeSQLStatement(stmt, values).then(() => {
                    callback(null);
                }).catch((error) => {
                    logger.error(`${error.message} - Error in transferSharesSubmit createInvestmentRecordForReceiver`);
                });
            } else
                callback(null);
        }

        async.waterfall([
            checkReceiverInvestorBelongToSTO,
            getInvestorSharesOfSTO,
            getShareHistoryRecord,
            checkShares,
            addNewHistoryRecord,
            updateExistingSharesRecord,
            updateOldSharesHistroyRecord,
            addSenderShareTransferLog,

            transferSharesToCompanyIfSelected,

            getReceiverInvestorSharesOfSTO,
            createReceiverHistoryRecordIfNewOrGetExisting,
            updateReceiverShareHistoryRecordWithShareRecordID,
            updateReceiverInvestorRecord,
            addReceiverShareTransferLog,
            createInvestmentRecordForReceiver,
        ], (err) => {

                common.removeRedisKey(req, "dashboard").then(() => {
                    req.flash("errorMessage", "Shares transferred");
                    res.redirect(`investorsViewSto?id=${params.investorShares.investorID}`)
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} - Error occured in  dashboardsto loadData`);
                });

        });

    },
    burnPrivateWalletTokens(req, res) {

        const params = {};
        async.waterfall ( [
            function getSTORecord (callback) {
                const sql = "select * from shareswallet where id = ?";
                mysql.executeSQLStatement(sql, [req.body.idPri]).then((result) => {
                    params.record = result[0];
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in burnPrivateWalletTokens` );
                });
            },
            function function2 (callback) {
                blockchainApi.waitForTransactionCompletion(req.body.transactionIDPri, params.record.sharesID).then((result) => {
                    refreshBlockchain.loadInvestorBlockchainBalances(params.record.investorID, req.body.contractAddress, params.record.sharesID, req.body.protocolPri, req.session.stoid).then((result) => {
                        console.log("investor balance is updated");
                    });
                })
                
                callback(null);
            },
            function function3 (callback) {
                req.flash("errorMessage", "Blockchain transaction is send. Please refresh in few minutes");
                res.redirect("/admin/manageinvestorwallet?investorid=" + params.record.investorID + "&sid=" + params.record.sharesID);
            }
        ])
    },
    transferBlockchainSharesWithCustodian(req, res) {
        const params = {};
        function getinvestorrec(callback) {
                  const sql = "select * from InvestorBuyPropertyAlert where id = ? and stoid = ?";
                  mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                        params.record = result[0];
                        callback(null);
                  }).catch((error) => {
                        common.handleError(req, res, `${error.message} Error occured in transferBlockchainSharesWithCustodian`);
                  });
        }
        function getsharetypeid(callback) {
                  const sql = "select * from sharetypes where id = ? and stoid = ?";
                  mysql.executeSQLStatement(sql, [params.record.ShareTypeID, req.session.stoid]).then((result) => {
                        params.sharetype = result[0];
                        params.investmentRequired = math.multiply(result[0].premimum ?? 0, params.record.Shares ?? 0);

                        callback(null);
                  }).catch((error) => {
                        common.handleError(req, res, `${error.message} Error occured in settings getinvestordata`);
                  });
        }
        function getCurrencyBalance(callback) {

            wallet.getInvestorBalance( params.record.investorID, req.session.stoid, params.sharetype.currencyid, global.config.investorInternalWalletProjectSpecific ).then((balance) => {
                params.Amount = balance;

                if(params.investmentRequired > params.Amount) {

                } else {
                    params.newRunningBalance = math.subtract(params.Amount ?? 0, params.investmentRequired ?? 0) ?? 0;
                }

                callback(null);
            })

            /* const sql = "select amount from InvestorBalancesInCompanyAccounts where stoid = ? and investorID = ? and currencyID = ?";

            mysql.executeSQLStatement(sql, [req.session.stoid, params.record.investorID, params.sharetype.currencyid]).then((result) => {
                if(result.length > 0)
                    params.Amount = result[0].amount;
                else
                    params.Amount = 0;

                if(params.investmentRequired > params.Amount) {

                } else {
                    params.newRunningBalance = params.Amount - params.investmentRequired;
                }

                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in settings getinvestordata`);
            }); */
        }
        function addWhitelistAddress(callback) {
            const sql = "insert into shareswallet(investorID, sharesID, shares, publicKey, isBlocked) values(?, ?, ?, ?, 0)";
            mysql.executeSQLStatement(sql, [params.record.investorID, params.record.ShareTypeID, 0, params.record.publickey]).then((result) => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in settings getinvestordata`);
            });
        }
        function reduceBalance(callback) {

            wallet.reduceInvestorBalance( params.record.investorID, req.session.stoid, params.sharetype.currencyid, params.investmentRequired, req.session.user.ID,
                  5,
                  `${params.record.Shares} ${params.sharetype.title} Shares Transfer`,
                  1, global.config.investorInternalWalletProjectSpecific ).then(() => {
                    callback(null);
            })

            /* const sql = "update InvestorBalancesInCompanyAccounts set amount = amount - ? where stoid = ? and investorID = ? and currencyID = ?";
            mysql.executeSQLStatement(sql, [ params.investmentRequired, req.session.stoid, params.record.investorID, params.sharetype.currencyid] ).then((result) => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in settings getinvestordata`);
            }); */
        }
        function deleteRecord(callback) {
            const sql = "delete from InvestorBuyPropertyAlert where id = ? and stoid = ?";
            mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in settings getinvestordata`);
            });
        }
        /* function insertDepositRecord(callback) {
            // Deposit table also works as account balance statement with running balances    multiple events like transfer of shares, deposit received etc hit this table

                const sql = 'insert into InvestorDepositReceivedAlert(investorID, isApproved, storid, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, runningBalance, currencyID) values(?, 5, ?, now(), 0, ?, ?, now(), ?, ?, ?)';

                mysql.executeSQLStatement(sql, [params.record.investorID, req.session.stoid, params.investmentRequired, `${params.record.Shares} ${params.sharetype.title} Shares Transfer`, req.session.user.ID, params.newRunningBalance, params.sharetype.currencyid]).then((result) => {
                       callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message}Error in insertDepositRecord transferBlockchainSharesWithCustodian`);
                });
        } */
        function createInvestmentRecord(callback) {
                const stmt = 'Insert into investments(UserID, InvestorID, DateTime, TokensTransferred, AmountInvested, CurrencyID, Description, stoid, sharetypeid) values(?, ?, now(), ?, ?, ?, ?, ?, ?)';

                const values = [req.session.user.ID, params.record.investorID, params.record.Shares, params.investmentRequired, params.sharetype.currencyid, `${params.record.Shares} ${params.sharetype.title} Shares Transfer`, req.session.stoid, params.sharetype.ID];

                mysql.executeSQLStatement(stmt, values).then(() => {
                    callback(null);
                }).catch((error) => {
                    logger.error(`${error.message} - Error in transferBlockchainSharesWithCustodian createInvestmentHistroy`);
                });
        }
        function createLog(callback) {
            // TODO
            callback(null);
        }
        async.waterfall([
            getinvestorrec,
            getsharetypeid,
            getCurrencyBalance,
            addWhitelistAddress,
            reduceBalance,
            deleteRecord,
            // insertDepositRecord,
            createInvestmentRecord,
            createLog
        ], () => {
            res.redirect("currentOrders");
        });
    },       // called from   PurchaseRequest.hsb    it only adds whitelist address and then refresh will update investor balance.     THis function for timebeing not being called from above page.
    transferInvestorOffChainBalance(req, res) {
        const params = {};
        async.waterfall ([
            function getShareRecord(callback) {
                    const stmt = `select * from sharetypes where id = ?`;
                    mysql.executeSQLStatement(stmt, [req.body.ShateTypeID]).then((result) => {
                        params.ethereumContractAddress = result[0].ethereumContractAddress;
                        params.blockchainProtocol = result[0].blockchainProtocol;
                        params.ethereumBlockchainPublicAddress = result[0].ethereumBlockchainPublicAddress;
						params.walletCustodayType = result[0].walletCustodayType

                        callback(null, params);
                    }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error transferInvestorOffChainBalance`);
                    });
            },
            function getInvestorSharesOfSTO(params, callback) {
                const stmt = `select shares from shareswallet where investorID = ? and sharesID = ? and publicKey = 'platform'`;
                mysql.executeSQLStatement(stmt, [req.body.investorID, req.body.ShateTypeID]).then((result) => {
                    if(result.length > 0) {
                        params.investorShares = result[0].shares;
                        callback(null, params);
                    } else {
                        params.investorShares = 0;
                        callback(null, params);
                    }
                }).catch((error) => {
                        common.handleError(req, res, `${error.message} Error transferInvestorOffChainBalance`);
                });
            },
            function getInvestorRecord(params, callback) {
                const stmt = 'Select i.ID, i.FirstName, i.LastName, i.email from investor i, investorsto s where i.id = ? and i.id = s.investorid and s.stoid = ?';
                mysql.executeSQLStatement(stmt, [req.body.investorID, req.session.stoid]).then((result) => {

                    if(result.length == 0) {
                        common.handleError(req, res, `Admin ${req.session.user.ID} is trying to send tokens to investor ${req.body.id} who do not belong to this STO. Error in transferInvestorOffChainBalance getInvestorRecord`);
                        return;
                    } else {
							callback(null, params);
					}

                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error in transferInvestorOffChainBalance getInvestorRecord`);
                });
            },
            function checkTokenAmount(params, callback) {

                    if ( req.body.shares > params.investorShares ) {
                        common.handleError(req, res, `Admin ${req.session.user.ID} is tyring to send more tokens are being transferred than available - Error occured in  sendtokenstoinvestorblockchaincall checkTokenAmount`);
                        return;
                    } else
						callback(null, params);

            },
            function detectShares(params, callback) {
                if(req.body.offChainTransferOrOnChain == "0") {

                    const stmt = `update shareswallet set shares = shares - ?  where investorID = ? and sharesID = ? and publicKey = 'platform'; update shares set shares = shares - ? where stoid = ? and shareTypeid = ? and investorID = ?`;
                    mysql.executeSQLStatement(stmt, [req.body.shares, req.body.investorID, req.body.ShateTypeID, req.body.shares, req.session.stoid, req.body.ShateTypeID, req.body.investorID]).then((result) => {
                            callback(null, params);
                    }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error transferInvestorOffChainBalance`);
                    });
                } else
                    callback(null, params);
            },
            function getCurrentOffChainBalanceFromDB(params, callback) {
                    const stmt = `select COALESCE(SUM(shares),0) as sum from shareswallet where sharesID = ? and publicKey = 'platform';`;
                    mysql.executeSQLStatement(stmt, [req.body.ShateTypeID]).then((result) => {
                            params.OffChainBalanceOfSharesType = parseFloat( result[0].sum );

                            callback(null, params);
                    }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error transferInvestorOffChainBalance`);
                    });
            },
            function updateCompanyShares(params, callback) {
                if(req.body.offChainTransferOrOnChain == "0") {

						 blockchainApi.getAccountBalance(req.body.ShateTypeID, params.ethereumBlockchainPublicAddress).then((balance) => {

									const stmt = `update sharetypes set companyShares = ?  where ID = ? and stoid = ?`;
									mysql.executeSQLStatement(stmt, [balance -  params.OffChainBalanceOfSharesType, req.body.ShateTypeID, req.session.stoid]).then((result) => {
											callback(null, params);
									}).catch((error) => {
											common.handleError(req, res, `${error.message} Error transferInvestorOffChainBalance`);
									});

						  }, (err) => {
								logger.error(`${err.message} - ${JSON.stringify(params)} - Error occured in  takeinvestorshares getInvestorBlockchainBalance - getting latest investor token amounts ${req.query.publicKey}`);
								callback(null, params);
						  });

                } else
                    callback(null, params);
            },
            function sendBlockchainRequest(params, callback) {

                    if(req.body.offChainTransferOrOnChain == "1") {

							var keys = {};
							if(params.walletCustodayType == 0) {
									keys = ethereumApi.decryptKey(JSON.parse(req.body.filecontents), req.body.password);
									if (keys === 'error') {
										req.flash('errorMessage', 'Private key cannot be authenticated. No shares transferred');
										res.redirect("manageinvestorwallet?investorid=" + req.body.investorID + "&sid=" + req.body.ShateTypeID);
										return;
									}
							} else {
								  keys.public = "";
								  keys.private = "";
							}


							const sql = `insert into blockchainSharesTransferTransactions (hostname, toAddress, stoid, adminid, investorID, shareTypeID, amountToSend, investmentDetails, investmentAmount, reduceInvestorBalance, status, transactionID, recordDate) values
												(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, '', now())`;

							mysql.executeSQLStatement(sql, [req.hostname, req.body.publicaddress, req.session.stoid, req.session.user.ID,  req.body.investorID, req.body.ShateTypeID, req.body.shares, "", 0, 0]).then((result) => {


									blockchainApi.sendTokens(0, keys.private, req.body.publicaddress, req.body.shares, req.session.stoid, req.body.investorID, req.session.user.ID, req.body.ShateTypeID, 0, "" ,0, 0, 0, result.insertId).then(() => {

											req.flash("errorMessage", "Blockchain Transaction has been send. Please refresh later");
											res.redirect("manageinvestorwallet?investorid=" + req.body.investorID + "&sid=" + req.body.ShateTypeID);

									}).catch((error) => {
										req.flash("errorMessage", "Error Occured Sending Shares in blockchain");
										logger.error(`Error Occured Sending Shares in blockchain - ${error.message}`);
										callback(null, params);
									});


							}).catch((error) => {
								common.handleError(req, res, `${error.message}Error in sendtokenstoinvestorblockchaincall`);
							});



                    } else {
							req.flash("errorMessage", "Shares are transferred");
							res.redirect("manageinvestorwallet?investorid=" + req.body.investorID + "&sid=" + req.body.ShateTypeID)
					}

            }
        ]);
    },                   // called from   ManageInvestorOffChainBalance.hsb   transfer investor offchain shares to their private wallet


    investorIncreaseDecreaseBalanceLink(req, res) {
        logger.error('here');
        var stmt = "";
        const params = {};

        logger.error(req.query.op);

		if(req.query.op == "1") {
			 // increase investment

	 		wallet.increaseInvestorBalance(req.query.invid, req.session.stoid, req.query.cid, parseFloat(req.query.amt), req.session.user.ID, 3, -1, req.query.desc, 1, global.config.investorInternalWalletProjectSpecific).then(() => {

					req.flash('errorMessage', 'Investor balance has been increased by ' + req.query.amt);
					res.redirect("investorsViewSto?id=" + req.query.invid);
			})
		} else {
			// decrease investment
	 		wallet.reduceInvestorBalance(req.query.invid, req.session.stoid, req.query.cid, parseFloat(req.query.amt), req.session.user.ID, 4, req.query.desc, 1, global.config.investorInternalWalletProjectSpecific).then(() => {

					req.flash('errorMessage', 'Investor balance has been decreased by ' + req.query.amt);
					res.redirect("investorsViewSto?id=" + req.query.invid);
			})
		}

    },
    whitelistInvestorNewAddress(req, res) {
            common.checkUserAuthorizationForModuleSTO(req, res, 2);

                var params = {};
                var keys = {"private": ""};

                if( common.isEthereumBasedProtocolID( parseInt(req.body.protocol)) ) {
                    if(req.body.metaMaskTransaction == "0") {
                        keys = ethereumApi.decryptKey(JSON.parse(req.body.filecontents), req.body.password);
                        if (keys === 'error') {
                            req.flash('errorMessage', 'Private key cannot be authenticated');
                            res.redirect(`manageinvestorwallet?investorid=${req.body.investorID}&sid=${req.body.sid}`);
                        }
                    }
                }

                function getDatabaseInformation(callback) {
                    if(req.body.isCurrentWallet == "false") {
                          const sql = `select * from  investorpublickeys where id = ? and investorid = ?`;
                          mysql.executeSQLStatement(sql, [req.body.recID, req.body.investorID])
                          .then((result) => {
                              params.changePublicAddress = result[0].title;
                              params.InvestorID = req.body.id;
                              callback(null);
                          }).catch((error) => {
                              common.handleError(req, res, `${error.message} Error occured in whitelistInvestorNewAddress getDatabaseInformation`);
                          });
                    } else {
                          const sql = `select * from  shareswallet where id = ? and investorid = ?`;
                          mysql.executeSQLStatement(sql, [req.body.recID, req.body.investorID])
                          .then((result) => {
                              params.changePublicAddress = result[0].publicKey;
                              params.InvestorID = req.body.id;
                              callback(null);
                          })
                          .catch((error) => {
                              common.handleError(req, res, `${error.message} Error occured in whitelistInvestorNewAddress getDatabaseInformation`);
                          });
                    }
                }
                function getInvestorRecord(callback) {
                    const stmt = 'Select FirstName, LastName, email from investor where id = ?; select blockchainProtocol, whitelist_abi,  ethereumWhitelistAddress, ethereumContractAddress, token_abi from sharetypes where id = ?';
                    mysql.executeSQLStatement(stmt, [req.body.investorID, req.body.sid])
                        .then((result) => {
                            params.FirstName = result[0][0].FirstName;
                            params.LastName = result[0][0].LastName;
                            params.email = result[0][0].email;
                            params.shareTypeRec = result[1][0];
                            callback(null);
                    });
                }
                function authorizeInvestor(callback) {

                    blockchainApi.whitelistInvestorNewAddress(  params.changePublicAddress, req.body.auth, keys.private, req.body.sid, req.body.investorID, req.session.stoid, req.body.isCurrentWallet, req.body.recID, req.body.metaMaskTransaction, req.body.blockchainTransactionID).then(() => {
                        callback(null);
                    }, (err) => {
                        common.handleError(req, res, `${err.message} - ${JSON.stringify(params)} - Error occured in  whitelistInvestorNewAddress authorizeInvestor - trying to authorize the investor `);
                    });

                }
                async.waterfall([
                    getDatabaseInformation,
                    getInvestorRecord,
                    authorizeInvestor,
                ], (err) => {
                    if (!err)
                        req.flash('errorMessage', 'Blockchain Transaction is send. It may take few minutes. Please refresh page later to see results')
                        res.redirect(`manageinvestorwallet?investorid=${req.body.investorID}&sid=${req.body.sid}`);
                });

    },
    refreshwalleblockchain(req, res) {
    const params = {};

        async.waterfall ( [
            function getSTORecord (callback) {

                const sql = `select * from sharetypes where id = ? and stoid = ?`;
                mysql.executeSQLStatement(sql, [req.query.sid, req.session.stoid]).then((result) => {

                    refreshBlockchain.loadInvestorBlockchainBalances(req.query.id, result[0].ethereumContractAddress,   req.query.sid, result[0].blockchainProtocol, req.session.stoid).then((data) => {

                        common.removeRedisKey(req, "dashboard").then(() => {
                            res.redirect("manageinvestorwallet?investorid=" + req.query.id + "&sid=" + req.query.sid);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} - Error occured in  refreshwalleblockchain`);
                        });

                    }, (err) => {
                        common.handleError(req, res, `${err.message} - ${JSON.stringify(params)} - Error occured in  refreshwalleblockchain`);
                    });

                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - refreshwalleblockchain Error occured `);
                 });
            }
        ] );

    },

    addNewInvestorWhitelistAddress(req, res) {      // admin adding a new whirelist and checking

        const params = {}
        function checkAccountValidify(callback) {
                    if(req.query.address != null) {
                        mysql.checkEthereumKeyIsAlreadyBeenTakenInPlatorm(req.query.address, req.session.stoid).then((result) => {
                                params.showAddAddressSection = 1;
                                params.accountAlreadyTaken = 0;
                                callback(null);
                        }).catch((error) => {
                                params.showAddAddressSection = 1;
                                params.accountAlreadyTaken = 1;
                                callback(null);
                        });
                    } else {
                        params.showAddAddressSection = 0;
                        params.accountAlreadyTaken = 0;
                        callback(null);
                }
        }
        function getBlockchainInfo(callback) {
                if(req.query.address != null) {
                    blockchainApi.getAccountBalance(req.query.sid, req.query.address).then((result) => {
                        params.address = req.query.address;
                        params.balance = result;
                        callback(null);

                }).catch((error) => {
                    logger.debug(`${error.message} Error in addNewInvestorWhitelistAddress getBlockchainInfo`);
                });
            } else {
                params.address = "";
                params.balance = -1;
                callback(null);
            }
        }
        function isAddressAlreadyListed(callback) {
            if(req.query.address != null) {
                const sql = `select * from shareswallet where publicKey = ? and sharesID = ?`;
                mysql.executeSQLStatement(sql, [req.query.address, req.query.sid])
                .then((result) => {
                    if (result.length != 0) {
                        params.showAddAddressSection = 1;
                        params.accountAlreadyTaken = 1;
                        callback(null);
                    } else {
                        callback(null);
                    }
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in whitelistInvestorNewAddress getDatabaseInformation`);
                });
            } else {
                callback(null);
            }
        }
        async.waterfall([
                checkAccountValidify,
                getBlockchainInfo,
                isAddressAlreadyListed
        ], function (err) {
                res.render('admin/investorwhitelistaddress', {
                    showAddAddressSection: params.showAddAddressSection,
                    accountAlreadyTaken: params.accountAlreadyTaken,
                    address: params.address,
                    balance: params.balance,
                    sid: req.query.sid,
                    id: req.query.id,
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                    csrfToken: req.csrfToken(),
                });
        });

    },
    addNewInvestorWhitelistAddressPost(req, res) {     // admin is adding a new whitelist address to investor
        const params = {};

        async.waterfall ([
            function checkRecords(callback) {
                mysql.checkEthereumKeyIsAlreadyBeenTakenInPlatorm(req.query.address, req.session.stoid).then((result) => {
                        params.accountAlreadyTaken = 0;
                        callback(null);
                }).catch((error) => {
                        params.accountAlreadyTaken = 1;
                        callback(null);
                });
            },
            function getSTORecord(callback) {
                const sql = 'select ethereumContractAddress, blockchainProtocol from sharetypes where id = ?';
                mysql.executeSQLStatement(sql, [req.query.sid]).then((record) => {
                    params.sharerecord = record[0];
                    callback(null)
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error in addNewInvestorWhitelistAddressPost`);
                });
            },
            function addData(callback) {

                if(params.accountAlreadyTaken == 1) {
                    req.flash('errorMessage', 'Account alreadybeen taken in platform');
                    callback(null);
                } else {
                    const sql = 'insert into shareswallet(investorID, sharesID, shares, publicKey, isBlocked) values (?, ?, ?, ?, ?); insert into investorpublickeys(investorID, title) values (?, ?);';
                    mysql.executeSQLStatement(sql, [req.query.id, req.query.sid, 0, req.query.address, 0, req.query.id, req.query.address]).then(() => {
                        refreshBlockchain.loadInvestorBlockchainBalances(req.query.id, params.sharerecord.ethereumContractAddress, req.query.sid, params.sharerecord.blockchainProtocol, req.session.stoid).then(() => {
                            callback(null);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error in addNewInvestorWhitelistAddressPost`);
                        });
                    }).catch((error) => {
                        common.handleError(req, res, `${error.message} Error in addNewInvestorWhitelistAddressPost`);
                    });
                }

            },
            function refreshBlockchain(callback) {
                    res.redirect("manageinvestorwallet?investorid=" + req.query.id + "&sid=" + req.query.sid)
            }
        ])
    },

    propertiesRequestFromInvestor(req, res) {
      var isNewInvestor = 0;
      var params = {};
      const isSellRequest = req.url.includes('purchasePropertiesRequestFromInvestor') ? 0 : 1;
      const sql = `SELECT a.*, i.country, i.phone, i.town, i.state, i.email, DATE_FORMAT(i.DOB,'%M %d %Y') as InvDOB, 
      DATE_FORMAT(a.DateReceived,'%M %d %Y') as DateReceivedFormat, i.FirstName, i.LastName, i.ID as investorID, 
      s.id as shareTypeID, s.title, s.nominalValue, s.premimum, s.sellValue, s.currencyid as toCurrencyID, s.companyShares,
      i.investorType, i.taxResidencyCountry
        FROM InvestorBuyPropertyAlert a, investor i, sharetypes s 
        WHERE a.id = ?
         AND i.ID = a.investorID 
         AND a.isSellRequest = ${isSellRequest}
         AND a.ShareTypeID = s.id`;
      mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
        async.waterfall ([
          function checkRecords(callback) {
            if( result[0].status != 1) {
              common.handleError(req, res,
            `purchasePropertiesRequestFromInvestor Error occurred ${req.session.user.ID} admin is trying to access a buy request that has already been approved and processed`);
            } else {
              if (!result[0].fromCurrencyID) {
                result[0].fromCurrencyID = result[0].toCurrencyID;
              }
              if (!result[0].purchasePriceOffered) {
                result[0].purchasePriceOffered = math.multiply(result[0].premimum ?? 0, result[0].Shares ?? 0).toFixed(global.config.BlockchainBalanceInFractions)
              }
              wallet.getInvestorBalance( result[0].investorID, req.session.stoid, result[0].fromCurrencyID, global.config.investorInternalWalletProjectSpecific ).then((balance) => {
                  params.balance = balance;
                  callback(null);
              })
            }
          },
          function checkRecords(callback) {
            wallet.getInvestorSTOBalances(result[0].investorID,
              req.session.stoid,
              global.config.investorInternalWalletProjectSpecific)
                .then((balances) => {
                params.balances = balances;
                callback(null);
              })
          },
          function checkRecords(callback) {
            const sql3 = `SELECT i.id 
              FROM investor i, investorsto s 
              WHERE i.id = s.investorid
               AND i.id = ?
               AND stoid = ?;
               
               SELECT * FROM investing_entity e
                  INNER JOIN InvestorBuyPropertyAlert a ON a.entityID = e.ID
                  WHERE a.ID = ?;`;
            mysql.executeSQLStatement(sql3, [result[0].investorID, req.session.stoid, req.query.id])
              .then((data) => {
                const investorSTORec = data[0];
                const entity = data[1][0];

                let investorCountry;
                let investorType;
                if (global.config.IsMarketSpace === 1) {
                  if (entity?.type) {
                    investorType = entity?.type === 'Individual Account' ? 'Individual' : 'Entity';
                  } else {
                    investorType = result[0]?.investorType === 1 ? 'Entity' : 'Individual';
                  }
                  if (entity?.country) {
                    investorCountry = entity?.country;
                  } else {
                    investorCountry = (result[0]?.taxResidencyCountry !== null &&
                      result[0]?.taxResidencyCountry !== '') ?
                      result[0]?.taxResidencyCountry :
                      result[0]?.country;
                  }
                } else {
                  investorType = result[0]?.investorType === 1 ? 'Entity' : 'Individual';

                  investorCountry = (result[0]?.taxResidencyCountry !== null &&
                    result[0]?.taxResidencyCountry !== '') ?
                    result[0]?.taxResidencyCountry :
                    result[0]?.country;
                }

                if(investorSTORec.length > 0)
                  isNewInvestor = 0;
                else
                  isNewInvestor = 1;

                let docuSignParam = "NULL";
                let helloSignParam = "NULL";
                const mode = global.config.sharePurchaseDocumentsMode;
                if (mode ==='docuSign') {
                  docuSignParam = "NOT NULL";
                } else if (mode === 'helloSign') {
                  helloSignParam = "NOT NULL";
                }
                /*
                const sql2 = `select * from InvestorBalancesInCompanyAccounts i, currency c where investorid = ? and i.currencyID = c.id and stoid = ?;\
                                select amount from InvestorBalancesInCompanyAccounts where investorid = ? and stoid = ? and currencyid = ?;\
                                select docusign_contract_signed_id from docu_sign_sto_contracts where  investor_id = ?;\
                                SELECT * FROM submittedSharePurchaseDocuments LEFT JOIN documentuser on documentuser.ID = submittedSharePurchaseDocuments.submittedDocumentID LEFT JOIN documents on documentuser.documentid = documents.ID where submittedSharePurchaseDocuments.sharePurchaseRequestID=?`;
                mysql.executeSQLStatement(sql2, [result[0].investorID, req.session.stoid, result[0].investorID, req.session.stoid, result[0].currencyid, result[0].investorID,req.query.id]).then((balances) => {
                */
                const sql2 = `
                  SELECT docusign_contract_signed_id 
                    FROM docu_sign_sto_contracts 
                    WHERE investor_id = ?;
                    
                  SELECT *
                    FROM submittedSharePurchaseDocuments sspd
                    LEFT JOIN documentuser du ON du.ID = sspd.submittedDocumentID 
                    LEFT JOIN sharePurchaseDocuments spd ON spd.ID = du.documentid
                    LEFT JOIN documents d ON du.documentid = d.ID 
                    WHERE d.docusignDocumentID IS ${docuSignParam}
                        AND d.helloSignDocumentID IS ${helloSignParam}
                        AND du.investorID = ?
                        AND (
                          d.countriesWhitelist = '["ALL"]'
                          OR d.countriesWhitelist LIKE '%"${investorCountry}"%'
                        )
                        AND ( 
                          d.investorTypesWhitelist = '["ALL"]'
                          OR d.investorTypesWhitelist LIKE '%"${investorType}"%'
                        )
                        AND ((sspd.sharePurchaseRequestID = ? AND spd.requireOnce = 0 AND du.DocumentStatus = 3)
                        OR (d.stoid = ? AND spd.requireOnce = 1 AND du.DocumentStatus = 3));`;
                mysql.executeSQLStatement(sql2, [result[0].investorID, result[0].investorID, req.query.id, req.session.stoid])
                  .then((balances) => {
                    var currentCurrencyBalance = 0;
                    /*
                    if(balances[1].length > 0)
                      currentCurrencyBalance = balances[1][0].amount
                    else
                      currentCurrencyBalance = 0;
                    */
                    currentCurrencyBalance = params.balance;
                    var investmentRequired = 0
                    if(result[0].purchasePriceOffered && result[0].purchasePriceOffered != 0) {
                      investmentRequired = result[0].purchasePriceOffered;
                    } else {
                      investmentRequired = math.multiply(result[0].premimum ?? 0, result[0].Shares ?? 0).toFixed(3);
                    }
                    var InvestmentIsAvailable = 1;
                    if( parseFloat(currentCurrencyBalance) < parseFloat(investmentRequired)) {
                        InvestmentIsAvailable = 0;
                    }

                    const signedContracts = balances[1].map((c) => {
                      if (c.signaturefilepath?.includes("docusignViewSignedDocumentsUrl")) {
                        return {
                          ...c,
                          signaturefilepath: c.signaturefilepath.replace(
                            "docusignViewSignedDocumentsUrl/",
                            ""
                          ),
                        };
                      }
                      if (c.signaturefilepath?.includes("helloSignViewSignedDocumentsUrl/")) {
                        return {
                          ...c,
                          signaturefilepath: c.signaturefilepath.replace(
                            "helloSignViewSignedDocumentsUrl/",
                            ""
                          ),
                        };
                      }
                      return { ...c, signaturefilepath: "" };
                    });
                    if(result[0].isSellRequest === 1){
                        return res.render('admin/singlecompany/sellerrequest', {
                            Data: common.getCommonPageProperties(req),
                            id: req.query.id,
                            record: result[0],
                            internalMode: mode ==='internal',
                            investmentRequired,
                            balances: params.balances,
                            isNewInvestor,
                            isSellRequest,
                            csrfToken: req.csrfToken(),
                            currentCurrencyBalance,
                            partials: common.getPartials(),
                            InvestmentIsAvailable,
                            isMarketSpace: global.config.IsMarketSpace,
                        })
                    }
                    res.render('admin/singlecompany/purchaserequest', {
                      Data: common.getCommonPageProperties(req),
                      id: req.query.id,
                      record: result[0],
                      submittedDocuments: signedContracts,
                      internalMode: mode ==='internal',
                      investmentRequired,
                      balances: params.balances,
                      isNewInvestor,
                      csrfToken: req.csrfToken(),
                      currentCurrencyBalance,
                      partials: common.getPartials(),
                      InvestmentIsAvailable,
                      AdvistoryContractID: balances[0][0] && balances[0][0].docusign_contract_signed_id,
                      isMarketSpace: global.config.IsMarketSpace,
                      docusignBaseUrl: global.config.docusignViewSignedDocumentsUrl
                    });
                  }).catch((error) => {
                    common.handleError(req, res,
                      `${error.toString()} - purchasePropertiesRequestFromInvestor Error occurred `);
                  });
            }).catch((error) => {
              common.handleError(req, res,
                `${error.toString()} - purchasePropertiesRequestFromInvestor Error occurred `);
            });

          }
        ])
      }).catch((error) => {
        common.handleError(req, res,
          `${error.toString()} - purchasePropertiesRequestFromInvestor Error occurred `);
      });
    },
    purchaseSharesRequestDeclined(req, res) {
        const DECLINE_TRANSACTION = mutation$.investorBuyAlertDeclineAdmin();
        req.gqlExecute(DECLINE_TRANSACTION,{
            variables: {
                alertID: parseInt(req.query.id,10)
            }
        }).then(() => {
            res.redirect( "currentOrders" );
        }).catch(error => {
            common.handleError(req, res, `${error.message} Error purchaseSharesRequestDeclined`);
        });
    },
    downloadfilesubscriptionform(req, res) {
        res.download(
            common.getUserFileUploadsLocationFullPath(`contracts/${req.query.file}`)
        );
    },

    assignEmailToInvestorAccount(req, res) {
        // TODO  check security
        // common.checkUserAuthorizationForModuleSTO(req, res, 39);

        function getRecord(callback) {
            const sql = 'select i.id, i.email from investor i, investorsto s where i.id = s.investorid and i.id=? and s.stoid=?';
            mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                if(result.length > 0)
                    callback(null);
                else
                    common.handleError(req, res, `admin ${req.session.user.ID} is tryingt to assign a email address to investor ${req.query.id} who does not belong to this STO Error occured in assignEmailToInvestorAccount`);

            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in assignEmailToInvestorAccount getRecord`);
            });
        }
        function checkRecordNotToken(callback) {
            let sql = '';

            if(global.config.SingleSignInEnabled == 1)
                sql = 'select id from investor where email = ?';
            else
                sql = 'select i.id from investor i, investorsto s where i.id = s.investorid and i.email=? and s.stoid=?';

            mysql.executeSQLStatement(sql, [req.query.email, req.session.stoid]).then((result) => {
                if(result.length == 0)
                    callback(null);
                else {
                    req.flash('errorMessage', 'Another investor profile with same email address found. Pleae select another email address');
                    res.redirect("investorsViewSto?id=" + req.query.id);
                }
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in assignEmailToInvestorAccount checkRecordNotToken`);
            });
        }
        function InsertDatabaseInDocumentinformation(callback) {
            const sql = 'update investor set email = ? where id = ?';
            mysql.executeSQLStatement(sql, [req.query.email, req.query.id]).then(() => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in assignEmailToInvestorAccount InsertDatabaseInDocumentinformation`);
            });
        }
        async.waterfall([
            getRecord,
            checkRecordNotToken,
            InsertDatabaseInDocumentinformation,
        ], (err) => {
            req.flash('errorMessage', 'Email is set with this investor profile');
            res.redirect("investorsViewSto?id=" + req.query.id);
        });

    },

    forcerecoverydetails(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 3);

        const sql = "select c.id as RecID, DATE_FORMAT(c.DateClosed,'%M %d %Y') as Date, c.tokens, c.isPartial, i.ID, i.FirstName, i.LastName, c.CaseTitle, c.CaseDetails, c.CaseNotes from closedaccounts c, investor i where c.InvestorID = i.ID and c.id = ?";
        mysql.executeSQLStatement(sql, [req.query.id])
        .then((result) => {
            res.render('admin/forcerecoverdetails', {
                Record: result[0],
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
            });
        })
        .catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in deleteDocument deleteDocument`);
        });
    },
    takeoverassets(req, res) {
          common.checkUserAuthorizationForModuleSTO(req, res, 3);

          const stmt = 'Select * from investor i, investorsto s where i.id = ? and i.id = s.investorid';
          mysql.executeSQLStatement(stmt, [req.query.id])
          .then((result) => {
                res.render('admin/takeinvestorassets', {
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                    csrfToken: req.csrfToken(),
                    investorID: req.query.id,
                    investorShares: result[0].Shares,
                });
          }).catch((error) => {
              common.handleError(req, res, `${error.message}Error occured in takeinvestorshares getInvestorDBInfo`);
          });
	},
    downloadCaseFileFromWeb(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 1);

        const sql = 'Select * from closedaccounts where id= ?';
        mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
            let link = '';
            link = common.getUserFileUploadsLocationFullPath(result[0].CaseFilePath);

            fs.exists(link, (exists) => {
                if (exists) res.download(link); // Set disposition and send it.
                else logger.error(`File(${link}) not found Error occured in downloadCaseFileFromWeb`);
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in downloadInvestorContractPDF`);
        });
    },

    // these are pdf based contracts
	createNewContract(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 5);

        if (req.body.operation === '0') { // single investor contract creation.    req.body.investorID contains investor id
            mysql.createANewInvestorContract(req, req.body.investorID).then(() => {

                req.flash('errorMessage', 'Contract has been sent to investor')
                res.redirect(`investorsviewsto?id=${req.body.investorID}`);
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in createNewContract`);
            });
        } else {
            const preparedSQL = common.getInvestorSearchSQL(common.getInvestorSearchSQLSearchCritetia(req, true), req);

              mysql.executeSQLStatement(`Select i.ID ${preparedSQL.sql}`, preparedSQL.data).then((result2) => {
                  mysql.sendContractToGroup(result2, req).then(() => {
                     res.redirect('dashboardsto');
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in createNewContract`);
                  });
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in createNewContract`);
              });

        }
	},
	contractView(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 1);
        const params = {};

        function getDatabaseInformation(callback) {
            const sql = "Select s.title, s.logo, c.ID, DATE_FORMAT(DateOffered,'%M %d %Y') as DateOffered, ContractTitle, ContractDetails, DATE_FORMAT(DateSigned,'%M %d %Y') as DateSigned, CurrentStatus, ContractFilePath, SignedFilePath, InvestorID from contracts c, stos s where c.id = ? and s.id = c.stoid";
            mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                params.contract = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} - Error occured in contractView contractView`);
            });
        }
		function getInvestorRec(callback) {
            const stmt = 'Select * from investor where id = ?';
            mysql.executeSQLStatement(stmt, [params.contract.InvestorID])
                .then((result) => {
                    params.invRec = result[0];
                    callback(null);
                })
                .catch((error) => {
                    common.handleError(req, res, `${error.message}Error occured in contractView getInvestorRec`);
                });
		}
		async.waterfall([
			getDatabaseInformation,
            getInvestorRec
		], (err) => {
			res.render('admin/contractview', {
                messages: req.flash('ContractMessage'),
				Data: common.getCommonPageProperties(req),
				partials: common.getPartials(),
				rec: params.contract,
                invRec: params.invRec,
			});
        });

	},
    downloadContractDocument(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 1);

        const sql = 'Select * from contracts where id= ?';
        mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
            let link = '';
            if (req.query.filetype === '0') link = common.getUserFileUploadsLocationFullPath(result[0].ContractFilePath);
            else link = common.getUserFileUploadsLocationFullPath(result[0].SignedFilePath);

            fs.exists(link, (exists) => {
                if (exists) res.download(link); // Set disposition and send it.
                else logger.error(`File(${link}) not found Error occured in downloadContractDocument`);
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in downloadInvestorContractPDF`);
        });
    },
    settleInvestorContract(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 5);
	  	  const params = {};

		  function getDatabaseInformation(callback) {
                const sql = 'Select * from contracts where id= ?';
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.Record = result[0];
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in getDatabaseInformation deleteInvestorContract`);
                });
		  }
	      function deletefile(callback) {
                fs.exists(common.getUserFileUploadsLocationFullPath(params.Record.ContractFilePath), (exists) => {
                    if (exists) {
                        fs.unlink(common.getUserFileUploadsLocationFullPath(params.Record.ContractFilePath), (err) => {
                            if (err) { logger.error(`${params.Record.ContractFilePath} User Document deleted from disk outside platform`); }
                            callback(null);
                        });
                    } else { callback(null); }
                });
          }
          function updatecontract(callback) {
                const sql = 'Update contracts set CurrentStatus=2, ContractFilePath=\'\' where id = ?';
                mysql.executeSQLStatement(sql, [req.query.id]).then(() => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in downloadInvestorContractPDF`);
                });
          }
          async.waterfall([
			getDatabaseInformation,
            deletefile,
            updatecontract,
		  ], (err) => {
              req.flash('ContractMessage', 'Contract has been settled');
			  if (!err) res.redirect(`contractView?id=${req.query.id}`);
		  });
    },
    deleteInvestorContract(req, res) {
          common.checkUserAuthorizationForModuleSTO(req, res, 5);
	  	  const params = {};

          function getcontractrec(callback) {
              const sql = 'Select * from contracts where id= ?';
              mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                  params.investorID = result[0].InvestorID;
                  params.filePath = result[0].ContractFilePath;
                  callback(null);
              });
          }
          function deletecontractfile(callback) {
              fs.unlink(common.getUserFileUploadsLocationFullPath(params.filePath), (err) => {
                    if (!err) { callback(null); }
                });
          }
          function deletecontract(callback) {
              const sql = 'delete from contracts where id= ?';
              mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                  callback(null);
              });
          }
 		  async.waterfall([
             getcontractrec,
             deletecontractfile,
             deletecontract,
		  ], (err) => {
			   if (!err) res.redirect(`investorsviewsto?id=${params.investorID}`);
		  });
    },
    shownewcontractsforinvestors(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 1);

		const sql = "Select c.ID, DATE_FORMAT(DateOffered,'%M %d %Y') as DateOffered, ContractTitle, DATE_FORMAT(DateSigned,'%M %d %Y') as DateSigned, InvestorID, FirstName, LastName from contracts c, investor i where i.ID = c.InvestorID and CurrentStatus = 0 order by c.ID desc \
        ;\
        Select c.ID, DATE_FORMAT(DateOffered,'%M %d %Y') as DateOffered, ContractTitle, DATE_FORMAT(DateSigned,'%M %d %Y') as DateSigned, InvestorID, FirstName, LastName from contracts c, investor i where i.ID = c.InvestorID and CurrentStatus = 1 order by c.ID desc \
        ;";
		mysql.executeSQLStatement(sql, []).then((result) => {
            var showNewContractsSection = 0;
            if (result[0].length > 0) {
               showNewContractsSection = 1;
            }

            var showSignedContractsSection = 0;
            if (result[1].length > 0) {
               showSignedContractsSection = 1;
            }

			res.render('admin/shownewcontractsforinvestors', {
				Data: common.getCommonPageProperties(req),
				partials: common.getPartials(),
                showNewContractsSection,
				notSignedRecs: result[0],
                showSignedContractsSection,
                signedRecs: result[1],
			});
		}).catch((error) => {
			common.handleError(req, res, `${error.message} - Error occured in shownewcontractsforinvestors`);
		});
    },
    

    uploadInvestorKYCDoc(req, res) {
        const params = {};

        function transferfiles(callback) {
            var j = JSON.parse(  req.body.files );

            common.moveMultipleFilesToLocation(j, common.getUserFileUploadsLocationFullPath(""), req.hostname + "-").then((data) => {
                params.file = data[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in uploadInvestorKYCDoc transferfiles`);
            });
        }
        function getKYCRecord(callback) {
            const stmt = 'Select * from kyc where investorID = ?';
            mysql.executeSQLStatement(stmt, [req.body.id])
                .then((result) => {
                    if(result.length > 0) {
                        params.kyc = JSON.parse(result[0].kyc);
                        params.kycrecfound = 1;
                    } else {
                        params.kyc = {};
                        params.kycrecfound = 0;
                    }

                    callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in uploadInvestorKYCDoc getKYCRecord`);
            });
        }
        function updateKYCRecord(callback) {
            if (!params.kyc.hasOwnProperty("IDDoc"))
                params.kyc["IDDoc"] = {"fileID":[],"fileAddress":[]};

            if(req.body.fileType == 1) {
                if (!params.kyc.IDDoc.hasOwnProperty("fileID"))
                    params.kyc.IDDoc.fileID = [];
                params.kyc.IDDoc.fileID.push(params.file)
            } else if(req.body.fileType == 2) {
                if (!params.kyc.IDDoc.hasOwnProperty("fileAddress"))
                    params.kyc.IDDoc.fileAddress = [];
                params.kyc.IDDoc.fileAddress.push(params.file)
            }

            var stmt = '';
            if( params.kycrecfound == 1)
                stmt = 'Update kyc set KYC = ? where investorID = ?';
            else
                stmt = 'insert into kyc(kyc, investorid, appliedfor) values(?, ?, 0)';

            mysql.executeSQLStatement(stmt, [JSON.stringify(params.kyc), req.body.id]).then(() => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in investorWizardPostFile updateKYCRecord`);
            });
        }
        async.waterfall([
            transferfiles,
            getKYCRecord,
            updateKYCRecord
        ], (err) => {
            if (!err) {
                res.redirect(`KYCView?id=${req.body.id}&link=1`);
            } else {
                common.handleError(req, res, `${err.message} ${investorsRecord} - Error occured in uploaddocumentPost`);
            }
        });

    },

};

router.get('/investorssto', common.isAdminUserAuthenticated, investorsAPI.investorsListSto);
router.get('/editInvestor', common.isAdminUserAuthenticated, investorsAPI.investorsEdit);
router.post('/addnewinvestor', common.isAdminUserAuthenticated, investorsAPI.addNewInvestor);
router.get('/searchInvestorEmailtoRegister', common.isAdminUserAuthenticated, investorsAPI.searchInvestorEmailtoRegister);
router.post('/searchInvestorEmailtoRegisterPost', common.isAdminUserAuthenticated, investorsAPI.searchInvestorEmailtoRegisterPost);
router.get('/investorsViewSto', common.isAdminUserAuthenticated, investorsAPI.investorsViewSto);
router.post('/accreditEntity', common.isAdminUserAuthenticated, postAccreditEntity);
// router.post('/authorizeInvestor', common.isAdminUserAuthenticated, investorsAPI.authorizeInvestor);
router.get('/manageinvestorwallet', common.isAdminUserAuthenticated, investorsAPI.manageinvestorwallet);
router.post('/investorExpectedInvestment', common.isAdminUserAuthenticated, investorsAPI.investorExpectedInvestment);


router.get('/reviewInvestorTransaction', common.isAdminUserAuthenticated, reviewInvestorTransactionAlert);
router.post('/transactionTransferShares', common.isAdminUserAuthenticated, transactionTransferShares);

router.get('/showinvestorbalancereport', common.isAdminUserAuthenticated, investorsAPI.showinvestorbalancereport);
router.post('/transferSharesSubmit', common.isAdminUserAuthenticated, investorsAPI.transferSharesSubmit);
router.get('/transferShares', common.isAdminUserAuthenticated, investorsAPI.transferShares);
router.post('/burnPrivateWalletTokens', common.isAdminUserAuthenticated, investorsAPI.burnPrivateWalletTokens);
router.get('/transferBlockchainSharesWithCustodian', common.isAdminUserAuthenticated, investorsAPI.transferBlockchainSharesWithCustodian);
router.get('/showinvestorcompanypaymenthistory', common.isAdminUserAuthenticated, investorsAPI.showinvestorcompanypaymenthistory);
router.get('/investorIncreaseDecreaseBalanceLink', common.isAdminUserAuthenticated, investorsAPI.investorIncreaseDecreaseBalanceLink);
router.get('/refreshwalleblockchain', common.isAdminUserAuthenticated, investorsAPI.refreshwalleblockchain);
router.post('/transferInvestorOffChainBalance', common.isAdminUserAuthenticated, investorsAPI.transferInvestorOffChainBalance);


router.get('/uploaddocument', common.isAdminUserAuthenticated, investorsAPI.uploaddocument);
router.post('/uploaddocumentPost', common.isAdminUserAuthenticated, investorsAPI.uploaddocumentPost);
router.get('/downloadDocument', common.isAdminUserAuthenticated, investorsAPI.downloadDocument);
router.get('/deleteDocument', common.isAdminUserAuthenticated, investorsAPI.deleteDocument);
router.get('/investorsKYCList', common.isAdminUserAuthenticated, investorsAPI.investorsKYCList);
router.get('/KYCView', common.isAdminUserAuthenticated, investorsAPI.KYCView);
router.post('/investorKYCAuthroize', common.isAdminUserAuthenticated, investorsAPI.investorKYCAuthroize);
router.get('/rejectInvestorUpgradeRequest', common.isAdminUserAuthenticated, investorsAPI.rejectInvestorUpgradeRequest);
router.get('/downloadDocumentFromKYCRecord', common.isAdminUserAuthenticated, investorsAPI.downloadDocumentFromKYC);
router.get('/takeoverassets', common.isAdminUserAuthenticated, investorsAPI.takeoverassets);
router.post('/whitelistInvestorNewAddress', common.isAdminUserAuthenticated, investorsAPI.whitelistInvestorNewAddress);
router.get('/addNewInvestorWhitelistAddress', common.isAdminUserAuthenticated, investorsAPI.addNewInvestorWhitelistAddress);
router.get('/addNewInvestorWhitelistAddressPost', common.isAdminUserAuthenticated, investorsAPI.addNewInvestorWhitelistAddressPost);


router.get('/contractView', common.isAdminUserAuthenticated, investorsAPI.contractView);
router.get('/resetInvestorPassword', common.isAdminUserAuthenticated, investorsAPI.resetInvestorPassword);
router.get('/downloadContractDocument', common.isAdminUserAuthenticated, investorsAPI.downloadContractDocument);
router.get('/settleInvestorContract', common.isAdminUserAuthenticated, investorsAPI.settleInvestorContract);
router.get('/deleteInvestorContract', common.isAdminUserAuthenticated, investorsAPI.deleteInvestorContract);
router.get('/forcerecoverydetails', common.isAdminUserAuthenticated, investorsAPI.forcerecoverydetails);
router.get('/downloadCaseFileFromWeb', common.isAdminUserAuthenticated, investorsAPI.downloadCaseFileFromWeb);
router.get('/shownewcontractsforinvestors', common.isAdminUserAuthenticated, investorsAPI.shownewcontractsforinvestors);

router.get('/searchNewInvestorsForInvitation', common.isAdminUserAuthenticated, investorsAPI.searchNewInvestorsForInvitation);
router.post('/searchInvestorsinPlatform', common.isAdminUserAuthenticated, investorsAPI.searchInvestorsinPlatform);
router.post('/sendEmailInvitationToInvestor', common.isAdminUserAuthenticated, investorsAPI.sendEmailInvitationToInvestor);
router.get('/deleteInvestorInvitation', common.isAdminUserAuthenticated, investorsAPI.deleteInvestorInvitation);
router.get('/viewInvitedInvestorKYC', common.isAdminUserAuthenticated, investorsAPI.viewInvitedInvestorKYC);
router.post('/uploadInvestorKYCDoc', common.isAdminUserAuthenticated, investorsAPI.uploadInvestorKYCDoc);
router.get('/assignEmailToInvestorAccount', common.isAdminUserAuthenticated, investorsAPI.assignEmailToInvestorAccount);

router.get('/purchasePropertiesRequestFromInvestor', common.isAdminUserAuthenticated, investorsAPI.propertiesRequestFromInvestor);
router.get('/sellPropertiesRequestFromInvestor', common.isAdminUserAuthenticated, investorsAPI.propertiesRequestFromInvestor);
router.get('/purchaseSharesRequestDeclined' , common.isAdminUserAuthenticated, investorsAPI.purchaseSharesRequestDeclined);
router.get('/downloadfilesubscriptionform' , common.isAdminUserAuthenticated, investorsAPI.downloadfilesubscriptionform);


module.exports = router;


