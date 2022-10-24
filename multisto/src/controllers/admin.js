import exportInvestorsToCSV  from"../services/platform/exportInvestorsToCSV";
import getParamsList from "./admin/environmentParameters/getParamsList";
import getSTOFromConfig from "../services/getSTOFromConfig";
import { param } from "./broker";
import * as emailTextsController from "../services/platform/emails/controllers/EmailTexts.controller";

'use strict';

const moment = require('moment');
const express = require('express');
const axios = require('axios');
const router = express.Router();
const async = require('async');
const formidable = require('formidable');
const fs = require('fs-extra');
const path = require('path');
const math = require('mathjs');
const validator = require('validator');
const request = require('request');
const Web3 = require('web3');
const { v4: uuidv4 } = require('uuid');
import { create } from 'ipfs-http-client'
import IStoService from "../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../services/investorClient/affiliate/data/StoSqlService";
import getFilteredCurrency from "../services/platform/currency/getFilteredCurrenc";
const ethereumApi = require('../modules/ethereum');
const blockchainApi = require('../modules/blockchain');
const common = require('../modules/common');
const mysql = require('../modules/mysql');
const logger = require('../logger');
const refreshBlockchain = require('../modules/refreshBlockchain');
const { default: RemoteAffiliateService } = require('../services/investorClient/affiliate/api/RemoteAffiliateService');
const { loadConfig } = require('../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig');
const { default: upsertAffiliateProject } = require('./investors/affiliateCtl/updateAffiliateProject');
const { default: registerAffiliateProject } = require('./investors/affiliateCtl/registerAffiliateProject');
const { default: SharesSqlService } = require('../services/investorClient/affiliate/data/SharesSqlService');
const { default: getStoAffiliateInformation } = require('./admin/getStoAffiliateInformation');
const { default: entityTypeView } = require('./admin/entityTypes/entityTypeView');
const { default: postEntityType } = require('./admin/entityTypes/postEntityType');
const ERC1404Token = require("../data/abi/erc1404id4.json");
const mainFilename = require("require-main-filename")();
const math = require('mathjs');

const geniusAffiliateUpdatesService = require('../modules/geniusAffiliateUpdatesService');

const admin = {

  dashboard(req, res) {
    req.session.stoid = -1; // reset selected sto
    const params = { MemoryData: [] };

    async.waterfall([
      function loadData(callback) {
        const sql = `Select count(*) as count from stos; `;
        mysql
          .executeSQLStatement(sql, [])
          .then((result) => {
            params.totalSTO = result[0].count;
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  dashboard loadData`
            );
          });
      },
      function collectData(callback) {
        if (req.query.op != null) {
          if (req.query.op == "1") {
            const used = process.memoryUsage();
            for (const key in used) {
              params.MemoryData[key] =
                `${Math.round((used[key] / 1024 / 1024) * 100) / 100  } MB`;
            }
          }
        }

        callback(null);
      },
      function renderForm() {
        const showNewAddressRequestSection = 0;

        const json = {
          debug: global.config.debug === 1,
          totalSTO: params.totalSTO,
          currentInvestorBulkUploadStatus:
          global.config.bulkInvestorUploadProcessStatus,
          MemoryData: params.MemoryData,
          platformdashboardmessage: req.flash("platformdashboardmessage"),
          investorInfo: params.investorInfo,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
        };
        res.render("platform/index", json);
      },
    ]);
  },
  sto(req, res) {

    req.session.stoid = -1; // reset selected sto
    const params = {};
    async.waterfall([
      function getStos(callback) {
        let sql = "";
        sql =
          `select * from stos where id = 0; \
          select s.ID, s.title, s.logo, s.stolink, s.isActive, s.isBuyButtonEnabled, s.defaultBlockchain,  b.title as BlockchainName from stos s left join blockchains b on s.defaultBlockchain = b.id where s.id != 0 and s.isICOShareTypeCompany = 0 order by s.id; \
          select s.ID, s.title, s.logo, s.stolink, s.isActive, s.isBuyButtonEnabled, s.defaultBlockchain,  b.title as BlockchainName from stos s left join blockchains b on s.defaultBlockchain = b.id where s.id != 0 and s.isICOShareTypeCompany = 1 order by s.id; `;

        mysql
          .executeSQLStatement(sql, [req.session.user.ID])
          .then((result) => {
            params.mainrecord = result[0];
            params.records = result[1];
            params.icorecords = result[2];

            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} Error occured in getStos sto`
            );
          });
      },
      function renderForm() {
        res.render("platform/sto", {
          message: req.flash("stoerrormessage"),
          csrfToken: req.csrfToken(),
          mainrecord: params.mainrecord,
          ICORecords: params.icorecords,
          STORecords: params.records,
          Data: common.getPlatformCommonPageProperties(req),
          partials: common.getPlatformPartials(),
        });
      },
    ]);
  },
  newsto(req, res) {
    const params = {};
    /** Affiliate ViewModel
     * @type StoAffiliateViewModel
     */
    let stoAffiliateVm = {
      affiliatePlans: [],
      shareTypes: [],
      affiliateEnabled: false,
    }; // Optional


    async function getDatabaseInformation(callback) {

      const sql = `select * from stos where id = ?`;
      if (req.query.id != null) {
          mysql.executeSQLStatement(sql, [req.query.id]).then(async (result) => {
              params.record = result[0];
              params.record.dateCreated = moment(params.record.createdAt).format('YYYY-MM-DD');
              params.currency = [];
              params.op = 1;

              // Fetch affiliate data if module is enabled and sto record exists ---------
              stoAffiliateVm = await getStoAffiliateInformation(
                req.query.id,
                params.record.affiliatePlanId,
                params.record.affiliateShareTypeId
              );
              //---------
              callback(null);
          })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  newsto getInvestorInformation`
              );
          });
      } else {
          const sql = `select * from currency`;
          mysql
            .executeSQLStatement(sql, [])
            .then((result) => {
              params.currency = result;
              params.record = [];
              params.op = 0;
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  newsto getInvestorInformation`
              );
            });
      }
    }
    async function getBlockchains(callback) {
      const sql = `select * from blockchains`;
      mysql
        .executeSQLStatement(sql, [])
        .then((result) => {
            params.blockchains = result;
            callback(null);
        })
        .catch((error) => {
            common.handleError( req, res, `${error.message} - Error occured in newsto getBlockchains`);
        });
    }
    async.waterfall([
      getDatabaseInformation,
      getBlockchains
    ], (err) => {
        if (err) {
          logger.error(err);
          return;
        }
        const sql = `select stringvalue from params where param = 'stoTypes'`;
        mysql.executeSQLStatement(sql, [])
          .then((result) => {
            res.render("platform/sto/sto", {
              record: params.record,
              currency: getFilteredCurrency(params.currency),
              blockchains: params.blockchains,
              supportedTokenStudios: params.blockchains.filter(elem => [1, 5, 6].includes(elem.id)),
              op: params.op,
              stoTypes: JSON.parse(result[0].stringvalue),
              defaultProjectType: global.config.defaultProjectType,
              csrfToken: req.csrfToken(),
              partials: common.getPlatformPartials(),
              Data: common.getPlatformCommonPageProperties(req),
              affiliatePlans: stoAffiliateVm ? stoAffiliateVm.affiliatePlans : [], // AffiliatePlanDto[], nullable links to affiliatePlanId on post request
              affiliateEnabled: stoAffiliateVm
                ? stoAffiliateVm.affiliateEnabled
                : false, // nullable
              shareTypes: stoAffiliateVm ? stoAffiliateVm.shareTypes : null, // nullable
              isICOProject: req.query.isICO,
              areSTOHostnamesEnabled: global.config.areSTOHostnamesEnabled,
              randomLink: `${uuidv4()}.${req.hostname}`,
              bimountEnabled: global.config.bimountEnabled,
            });
        }).catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  dashboard getInvestorInformation`
            );
        });
    });
  },
  stoaddition(req, res) {
    const params = {};
    async.waterfall([
      function checkurl(callback) {
        let sql = ``;

        if (req.body.op == "0") sql = `select * from stos where stolink = ?`;
        else sql = `select * from stos where stolink = ? and id not in (?)`;

        mysql
          .executeSQLStatement(sql, [req.body.stolink.trim(), req.body.id])
          .then((result) => {
            if (result.length > 0) {
              req.flash(
                "stoerrormessage",
                `STO Link &nbsp; &nbsp; ${req.body.stolink} &nbsp; &nbsp; is already assigned to another STO`
              );
              res.redirect("/platform/sto");
            } else callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  stoaddition`
            );
          });
      },
      function loadData(callback) {
        if (req.body.op == "0") {
          // 1 = editing      0 = addition
          const sql = `select max(id) + 1 as id from stos; \
                    select stringValue from params where param = 'stoinvestortypes'; \
                    select stringValue from params where param = 'stoinvestortypesnotonshareregister'; \
                    select stringValue from params where param = 'steps'; \
                    select stringValue from params where param = 'settings';`;
          mysql
            .executeSQLStatement(sql, [])
            .then((result) => {
              params.data = result;
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  stoaddition`
              );
            });
        } else callback(null);
      },
      function SaveData(callback) {
        if (req.body.op == "0") {
          // 1 = editing      0 = addition

          const settings1 = JSON.parse(params.data[4][0].stringValue);
          settings1.DefaultSTOCurreny = parseInt(req.body.stoCurrency);

          const sql = `insert into stos(id, title, details, isActive, logo, disclamer, stolink, stolinkfull, stoType, stoinvestortypes, emailFooter, steps, registrationtext, website, stoinvestortypesnotonshareregister, companytype, settings, registrationsuccesstext, ethereumContractAddress, ethereumWhitelistAddress, PropertyFullDetails, projectAddress, LegalDetails, affiliatePlanId, isICOShareTypeCompany, isBimountEnabled, projectCost, defaultBlockchain, defualtTokenStudio) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', '',?,?,?,?,?,?,?,?,?)`;
          const data = [
            params.data[0][0].id, // id
            req.body.title,
            req.body.details,
            0, // not Active
            `${req.body.title.replace(/\s+/g, "")  }.png`, // logo
            "Disclamer",
            req.body.stolink.trim(),
            req.body.stolinkfull,
            req.body.stoType,
            params.data[1][0].stringValue, // stoinvestortypes
            "Email Footer",
            params.data[3][0].stringValue, // steps
            "Registration Text",
            "website",
            params.data[2][0].stringValue, // stoinvestortypesnotonshareregister
            req.body.companyType,
            JSON.stringify(settings1), // settings
            "Registration Success Text",
            req.body.PropertyFullDetails,
            req.body.projectAddress,
            req.body.LegalDetailsm,
            req.body.affiliatePlanId, // optional and nullable
            req.body.isICOProject,
            req.body.bimountEnabled ? 1 : 0,
            req.body.projectCost,
            req.body.blockchainSelectID,
            req.body.stoTokenStudio
          ];

          mysql
            .executeSQLStatement(sql, data)
            .then(() => {
              mysql
                .executeSQLStatement(
                  `SELECT * FROM stos WHERE title = ?`,
                  req.body.title
                )
                .then((record) => {
                  registerAffiliateProject(
                    record.id,
                    req.body.title,
                    req.body.affiliatePlanId
                  );
                })
                .catch((error) => {
                  common.handleError(
                    req,
                    res,
                    `${error.message} - Error occured in  stoaddition SaveData registerAffiliateProject`
                  );
                });
            })
            .then(() => {
              mysql.initializeGlobals();
            })
            .then(() => {
              res.redirect("/platform/sto");
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  stoaddition SaveData`
              );
            });
        } else {
          const sql = `update stos set
								title = ?,
								stolink = ?,
								stolinkfull = ?,
								details = ?,
								companytype = ?,
								PropertyFullDetails = ?,
								projectAddress = ?,
								LegalDetails = ?,
								affiliatePlanId = ?,
								affiliateShareTypeId = ?,
								isBimountEnabled = ?,
								createdAt = ?,
								projectCost = ?
								where id = ?`;

          mysql
            .executeSQLStatement(sql, [
              req.body.title,
              req.body.stolink,
              req.body.stolinkfull,
              req.body.details,
              req.body.companyType,
              req.body.PropertyFullDetails,
              req.body.projectAddress,
              req.body.LegalDetails,
              req.body.affiliatePlanId,
              req.body.affiliateShareTypeId,
              req.body.bimountEnabled ? 1 : 0,
              moment(req.body.createdAt).toDate(),
              req.body.projectCost,
              req.body.id,
            ])
            .then(async () => {
              upsertAffiliateProject(
                req.body.id,
                req.body.title,
                req.body.affiliatePlanId
              );
            })
            .then(() => {
              mysql.initializeGlobals();
            })
            .then(() => {
              res.redirect("/platform/sto");
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  stoaddition SaveData (update)`
              );
            });
        }
      },
    ]);
  },
  shareslist(req, res) {
    const sql =
      "select * from sharetypes where stoid = ?; select title, logo, stolink, companytype, defualtTokenStudio from stos where id = ?; select * from blockchains";
    mysql
      .executeSQLStatement(sql, [req.query.id, req.query.id])
      .then((result) => {
        res.render("platform/sto/shares", {
          message: req.flash("errorMessage"),
          id: req.query.id,
          recs: result[0],
          sto: result[1][0],
          blockchains: result[2],
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in shareslist`
        );
      });
  },
  newshare(req, res) {
    const params = {};

    async.waterfall([
      function check(callback) {
        if (req.query.id == null) {
          const sql = "select settings from stos where id = ?";
          mysql.executeSQLStatement(sql, [req.query.cid]).then((result) => {
            const settings = JSON.parse(result[0].settings);
            params.currencyid = settings.DefaultSTOCurreny;
            params.record = {};
            params.op = 0;
            callback(null);
          });
        } else {
          const sql = "select * from sharetypes where id = ?";
          mysql
            .executeSQLStatement(sql, [req.query.id])
            .then((result) => {
              params.record = result[0];
              params.currencyid = params.record.currencyid;
              params.op = 1;
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  newshare`
              );
            });
        }
      },
      function fun1(callback) {
        if (req.query.id == null) {
          mysql
            .executeSQLStatement("select stotype from stos where id = ?", [
              req.query.cid,
            ])
            .then((result) => {
              params.stoType = result[0].stotype;
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  newshare`
              );
            });
        } else callback(null);
      },
      function fun2(callback) {
          if (req.query.id != null) {
              mysql.executeSQLStatement("select * from paymentchannels where stoid = ?", [
                  params.record.stoid
              ]).then((result) => {
                  params.paymentChannels = result;
                  callback(null);
              }).catch((error) => {
                  common.handleError( req, res, `${error.message} - Error occured in  newshare`);
              });
          } else {
            params.paymentChannels = [];
            callback(null);
          }
      },
      function getBlockchainDetails(callback){
        const sql = `select * from blockchains;select * from params where param = 'selectedTokenStudio'`
        mysql.executeSQLStatement(sql).then((result) => {
          params.blockchains = result[0];
          params.selected = result[1];
          callback(null);
        }).catch((error) => {
          common.handleError(req, res, `${error.message} - Error occured in  newshare`);
        });
      },
      function fun3(callback) {
        res.render("platform/sto/newshare", {
          isSellBackEnabled: global.config.isSellBackEnabled,
          stoType: params.stoType,
          currencyid: params.currencyid,
          currencySymbol2: common.getCurrentcySymbol(params.currencyid),
          paymentChannels: params.paymentChannels,
          op: params.op,
          blockchain: params.blockchains,
          selectedBlockchain: params.selected,
          record: params.record,
          cid: req.query.cid,
          csrfToken: req.csrfToken(),
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
          isAutomaticShareClassSettingsEnabled: global.config.isAutomaticShareClassSettingsEnabled,
        });
      },
    ]);
  },
  viewshare(req, res) {
    const params = {};

    async.waterfall([
      function getRecord(callback) {

        const sql = "select * from sharetypes where id = ?";
        mysql
          .executeSQLStatement(sql, [req.query.id])
          .then((result) => {
            params.record = result[0];
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  viewshare`
            );
          });
      },
      function getDecimals(callback) {
          if (params.record.isblockchain == 1) {
              blockchainApi.getDecimals(req.query.id).then((data) => {
                    const sql = "update sharetypes set blockchainDecimals = ? where id = ?";
                    mysql.executeSQLStatement(sql, [data, req.query.id]).then((result) => {
                        params.blockchainDecimals = data;
                        callback(null);
                    });
                },
                (err) => {
                  // there is some error getting the balance from ethereum network     get it from DB
                  logger.debug(`${err.message} - Error occured in  viewshare getDecimals`);
                  params.blockchainDecimals = 18;
                  callback(null);
                }
              );
          } else {
            params.currentTotalShares = params.record.totalShares;
            callback(null);
          }
      },
      function getBlockchainBalance(callback) {

        if (params.record.isblockchain == 1) {
            /*blockchainApi.getTotalSupplyOfTokens(req.query.id).then((data) => {
                  const sql = "update sharetypes set totalShares = ? where id = ?";
                  mysql.executeSQLStatement(sql, [parseInt(data), req.query.id]).then((result) => {
                      params.currentTotalShares = data;
                      callback(null);
                  });
              },
              (err) => {
                // there is some error getting the balance from ethereum network     get it from DB
                logger.debug(
                  `${err.message} - Error occured in  viewshare getBlockchainBalance`
                );
                params.currentTotalShares = 0;
                callback(null);
              }
            );*/

            //This call is already been covered in updateBlockchainCompanyTotalBalances so just move forward
            callback(null);

        } else {
          params.currentTotalShares = params.record.totalShares;
          callback(null);
        }
      },
      function getERC1400WhitelistAddress(callback) {

          if(params.record.blockchainProtocol == 2) {
              blockchainApi.getPolyMathERC1400WhitelistAddress(req.query.id).then((address) => {
                  const sql = "update sharetypes set ethereumWhitelistAddress = ? where id = ?";
                  mysql.executeSQLStatement(sql, [address[0], req.query.id]).then(() => {
                      callback(null);
                  });
              })
          } else
            callback(null);
      },
      function getCompanySharesBlockchain(callback) {

        if (params.record.isblockchain == 1) {
            refreshBlockchain.updateBlockchainCompanyTotalBalances(
                  params.record.blockchainProtocol,
                  params.record.ethereumBlockchainPublicAddress,
                  params.record.ethereumContractAddress,
                  req.query.id,
                  params.record.stoid
            ).then((data) => {
                  console.log( JSON.stringify(data) );
                  params.availableCompanyShares = data.companyBalance;
                  params.currentTotalShares = data.totalSupply;
                  callback(null);
              },
              (error) => {
                callback(null);
              }
            );
        } else {
          params.availableCompanyShares = params.record.companyShares;
          callback(null);
        }
      },
      function getFreshRecord(callback) {

        const sql = "select * from sharetypes where id = ?";
        mysql
          .executeSQLStatement(sql, [req.query.id])
          .then((result) => {
            params.record = result[0];
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  viewshare`
            );
          });
      },
      function getblockchainParams(callback){
        const sql = `select * from params where param in ('selectedTokenStudio', 'platformConfiguration')`;
        mysql
          .executeSQLStatement(sql)
          .then((result) => {
            const tokenStudioArray = result[1].stringValue
            params.platformConfig = result[0].intValue == 2? true: false;
            params.defaultBlockchainEtherum = tokenStudioArray.includes(1);
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  viewshare getBlockchainparams`
            );
          });
      },
      function render(callback) {
        res.render("platform/sto/viewshare", {
          currentTotalShares: params.currentTotalShares,
          availableCompanyShares: params.availableCompanyShares,
          sharesForPurchase: math.subtract(params.availableCompanyShares ?? 0, params.record.reduceSharesForPurchase ?? 0) ?? 0,
          record: params.record,
          platformConfig: params.platformConfig,
          defaultBlockchainEtherum: params.defaultBlockchainEtherum,
          cid: params.record.stoid,
          csrfToken: req.csrfToken(),
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
        });
      },
    ]);
  },
  restrictSharesToPurchase(req, res) {
    const sql =
      "update sharetypes set reduceSharesForPurchase = ? where id = ? and stoid = ? ";
    mysql
      .executeSQLStatement(sql, [req.query.val, req.query.id, req.query.stoid])
      .then((result) => {
        res.redirect(`viewshare?id=${req.query.id}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in shareslist`
        );
      });
  },
  sharesaddition(req, res) {
    const params = {};

    async.waterfall([
      function check(callback) {
        let votingRIghts = 1;
        if (req.body.votingrights == null) votingRIghts = 0;

        let meetingRights = 1;
        if (req.body.meetingRights == null) meetingRights = 0;

        let needapproval = 1;
        if (req.body.needapproval == null) needapproval = 0;

        let blockchainBuyOrdersAllowed = 1;
        if (req.body.blockchainBuyOrdersAllowed == null)
          blockchainBuyOrdersAllowed = 0;

        let investorCanPurchaseDirectly = 1;
        if (req.body.investorCanPurchaseDirectly == null)
          investorCanPurchaseDirectly = 0;

        let isInvestorTradable = 1;
        if (req.body.isInvestorTradable == null) isInvestorTradable = 0;

        let sellToCompany = 1;
        if (req.body.sellToCompany == null) sellToCompany = 0;

        let isShareNosApplicable = 1;
        if (req.body.isShareNosApplicable == null) isShareNosApplicable = 0;

        let isCertificateNosApplicable = 1;
        if (req.body.isCertificateNosApplicable == null) isCertificateNosApplicable = 0;

        const votingPower = +req.body.votingPower;
        if (
          Number.isNaN(votingPower) ||
          votingPower < 0 ||
          votingPower > 1000000
        ) {
          throw new Error(
            `Voting power must be provided and it must be a number 0-1000000.`
          );
        }

        if (req.body.op === "0") {
          const sql = `insert into sharetypes (title, minimumSharesToBuyByInvestor, stoid, totalShares, companyShares, 
                        nominalValue, premimum, isVotingRightsApplicable, isblockchain, currencyid, needauthorization, 
                        reduceSharesForPurchase, investorCanPurchaseDirectly, blockchainProtocol, ethereumContractAddress, 
                        ethereumWhitelistAddress, ethereumBlockchainPublicAddress, walletCustodayType, tanganyWalletID, 
                        AssetName, AssetTag, votingPower, isMeetingRightsApplicable, isInvestorTradable, sellValue, 
                        sellToCompany, isShareNosApplicable, isCertificateNosApplicable) 
                        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          const data = [
            req.body.title,
            parseFloat(req.body.minimumSharesToBuyByInvestor),
            req.body.cid,
            parseInt(req.body.totalshares, 10),
            parseInt(req.body.totalshares, 10),
            parseFloat(req.body.nominalvalue),
            parseFloat(req.body.premiumvalue),
            votingRIghts,
            req.body.shareType,
            req.body.currencyid,
            needapproval,
            req.body.reduceSharesForPurchase,
            investorCanPurchaseDirectly,
          ];

          if (req.body.shareType === "1") {
            data.push(req.body.blockchainprotocoltype);
            data.push(req.body.tokenaddress);
            data.push(req.body.whitelistaddress);
            data.push(req.body.ethereumPublicKey);
            data.push(req.body.walletCustodayType);
            data.push(req.body.tanganyWalletID);
            data.push(req.body.AssetName);
            data.push(req.body.AssetTag);
          } else {
            data.push("0");
            data.push("");
            data.push("");
            data.push("");
            data.push(0);
            data.push("");
            data.push("");
            data.push("");
          }

          data.push(votingPower);
          data.push(meetingRights);
          data.push(isInvestorTradable);
          data.push(parseFloat(req.body.sellvalue ?? 0));
          data.push(sellToCompany);
          data.push(isShareNosApplicable);
          data.push(isCertificateNosApplicable);
          mysql
            .executeSQLStatement(sql, data)
            .then((result) => {
              mysql.executeSQLStatement(`INSERT INTO sharesHistoricalData (shareTypeID, stoID, premiumValue, dateOfChange) VALUES (?, ?, ?, NOW())`,
              [result.insertId, req.body.cid, parseFloat(req.body.premiumvalue)]).then(result => {
              }).catch(error => console.log(error+ " in sharesaddition"));
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  sharesaddition`
              );
            });
        } else {
          const sql = `update sharetypes set title = ?, minimumSharesToBuyByInvestor = ?, nominalValue = ?, premimum = ?, 
                    isVotingRightsApplicable = ?, isMeetingRightsApplicable = ?, isInvestorTradable = ?, sellValue = ?, 
                    sellToCompany = ?, isShareNosApplicable = ?, isCertificateNosApplicable = ?, needauthorization = ?, 
                    reduceSharesForPurchase = ?,  investorCanPurchaseDirectly = ?,   blockchainProtocol = ?,  
                    ethereumContractAddress = ?,  ethereumWhitelistAddress = ?,  ethereumBlockchainPublicAddress = ?, 
                    blockchainBuyOrdersAllowed = ?, walletCustodayType = ?, tanganyWalletID = ?, AssetName = ?, AssetTag = ?, 
                    votingPower = ? 
                    where id = ?`;

          const data = [
            req.body.title,
            parseFloat(req.body.minimumSharesToBuyByInvestor),
            parseFloat(req.body.nominalvalue),
            parseFloat(req.body.premiumvalue),
            votingRIghts,
            meetingRights,
            isInvestorTradable,
            parseFloat(req.body.sellvalue || 0),
            sellToCompany || 0,
            isShareNosApplicable,
            isCertificateNosApplicable,
            needapproval,
            req.body.reduceSharesForPurchase,
            investorCanPurchaseDirectly,
          ];

          if (req.body.shareType === "1") {
            data.push(req.body.blockchainprotocoltype);
            data.push(req.body.tokenaddress);
            data.push(req.body.whitelistaddress);
            data.push(req.body.ethereumPublicKey);
            data.push(blockchainBuyOrdersAllowed);
            data.push(req.body.walletCustodayType);
            data.push(req.body.tanganyWalletID);
            data.push(req.body.AssetName);
            data.push(req.body.AssetTag);
          } else {
            data.push("0");
            data.push("");
            data.push("");
            data.push("");
            data.push("0");
            data.push(0);
            data.push("");
            data.push("");
            data.push("");
          }

          data.push(votingPower);

          data.push(req.body.id);
          mysql
            .executeSQLStatement(sql, data)
            .then((result) => {
              mysql.executeSQLStatement(`INSERT INTO sharesHistoricalData (shareTypeID, stoID, premiumValue, dateOfChange) VALUES (?, ?, ?, NOW())`,
              [req.body.id, req.body.cid, parseFloat(req.body.premiumvalue)]).then(result => {
              }).catch(error => console.log(error+ " in sharesaddition"));
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  sharesaddition`
              );
            });
        }
      },
      function function2(callback) {
        res.redirect(`/platform/shareslist?id=${req.body.cid}`);
      },
    ]);
  },
  roleslist(req, res) {
    const sql =
      "select * from rolessto where stoid = ?; select title, logo, stolink, companytype from stos where id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.id, req.query.id])
      .then((result) => {
        res.render("platform/sto/roles", {
          cid: req.query.id,
          recs: result[0],
          sto: result[1][0],
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in shareslist`
        );
      });
  },
  newrole(req, res) {
    const params = {};

    async.waterfall([
      function check(callback) {
        if (req.query.id == null) {
          params.op = 0;
          params.record = [];
          params.rights = [];
          callback(null);
        } else {
          params.op = 1;

          const sql =
            "select * from rolessto where id = ?; select * from rolesrightssto where roleid = ?";
          mysql
            .executeSQLStatement(sql, [req.query.id, req.query.id])
            .then((result) => {
              params.record = result[0][0];
              params.rights = [];
              result[1].forEach((rec) => {
                params.rights.push(rec.RightID);
              });

              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  newrole`
              );
            });
        }
      },
      function finalFun(callback) {
        res.render("platform/sto/newrole", {
          op: params.op,
          record: params.record,
          rights: params.rights,
          cid: req.query.cid,
          csrfToken: req.csrfToken(),
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
        });
      },
    ]);
  },
  deleteAllUsers(req, res) {
    if (global.config.debug !== 1) {
      res.redirect("/platform/dashboard");
    } else {
      const tablesToDelete = [
        "investor",
        "investorsto",
        "investments",
        "shares",
        "shareshistory",
      ];
      const deleteSql = tablesToDelete.map(() => `DELETE FROM ??;`).join(" ");
      const clearSharesSql = "update shares set sharesHistoryID = 0";
      const sql = deleteSql + clearSharesSql;
      mysql
        .executeSQLStatement(sql, [...tablesToDelete])
        .then(() => {
          res.redirect("/platform/dashboard");
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in deleteAllUsers`
          );
        });
    }
  },
  rolesaddition(req, res) {
    const params = {};

    async.waterfall([
      function check(callback) {
        if (req.body.op == "0") {
          const sql = "Insert into rolessto(role, stoid) values (?, ?)";
          mysql
            .executeSQLStatement(sql, [req.body.title, req.body.cid])
            .then((result) => {
              params.newID = result.insertId;
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  rolesaddition`
              );
            });
        } else {
          const sql = "update rolessto set role = ? where id = ?";
          mysql
            .executeSQLStatement(sql, [req.body.title, req.body.id])
            .then((result) => {
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  rolesaddition`
              );
            });
        }
      },
      function fun2(callback) {
        if (req.body.op == "1") {
          const sql = "delete from rolesrightssto where RoleID = ?";
          mysql
            .executeSQLStatement(sql, [req.body.id])
            .then((result) => {
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} - Error occured in  rolesaddition`
              );
            });
        } else callback(null);
      },
      function fun3(callback) {
        let roleID = 0;
        if (req.body.op == "0") roleID = params.newID;
        else roleID = req.body.id;

        let str = "select 1;";
        for (let i = 0; i < 60; i++) {
          if (req.body[`chk${  i}`] != null)
            str +=
              `insert into rolesrightssto (RoleID, RightID) values(${roleID}, ${i});`;
        }

        mysql
          .executeSQLStatement(str, [])
          .then((result) => {
            res.redirect(`/platform/roleslist?id=${  req.body.cid}`);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  rolesaddition`
            );
          });
      },
    ]);
  },
  activtepropertystatu(req, res) {
    const sql = "update stos set isActive = ? where id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.status, req.query.id])
      .then((result) => {
        res.redirect("sto");
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} - Error occured in  activtepropertystatu`
        );
      });
  },
  activtepropertystatusBuy(req, res) {
    const sql = "update stos set isBuyButtonEnabled = ? where id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.status, req.query.id])
      .then((result) => {
        res.redirect("sto");
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} - Error occured in  activtepropertystatusBuy`
        );
      });
  },
  enableDisableShareType(req, res) {
    const sql = "update sharetypes set isEnabled = ? where id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.enable, req.query.sid])
      .then((result) => {
        res.redirect(`shareslist?id=${  req.query.cid}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} - Error occured in  enableDisableShareType`
        );
      });
  },

  resetsharetypes(req, res) {
    const sql = "select * from sharetypes where id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.id])
      .then((result) => {
        const shareTransferred = math.subtract(result[0].totalShares ?? 0, result[0].companyShares ?? 0) ?? 0;

        res.render("platform/sto/resetsharesclass", {
          shareTransferred,
          record: result[0],
          id: req.query.id,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
          ShareCountInFractions: global.config.ShareCountInFractions,
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} - Error occured in  resetsharetypes`
        );
      });
  },
  resetsharetypespost(req, res) {
    const sql = `delete from shareshistory where shareTypeid = ${req.query.id}; delete from shares where shareTypeid = ${req.query.id}; update sharetypes set companyshares = totalshares where id = ${req.query.id}; delete from investments where shareTypeid = ${req.query.id};`;
    mysql
      .executeSQLStatement(sql, [])
      .then((result) => {
        res.redirect(`shareslist?id=${  req.query.cid}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} - Error occured in  resetsharetypespost`
        );
      });
  },
  resetInvestorShareType(req, res) {
    const params = {};

    async.waterfall([
      function getSTORecord(callback) {
        const sql =
          "select t.title as sharetitle, s.title as stotitle, t.stoid from sharetypes t, stos s where t.id = ? and s.id = t.stoid ";
        mysql
          .executeSQLStatement(sql, [req.query.id])
          .then((result) => {
            params.shareRec = result[0];
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured `
            );
          });
      },
      function fun1(callback) {
        params.investorRecFound = 0;

        if (req.query.investorid != null) {
          const sql =
            "select i.id as investorID, firstname, lastname, email, sh.shares from investor i, investorsto s, shares sh where i.id = ? and i.id = s.investorid and s.stoid = ? and sh.investorid = ? and sh.sharetypeid = ? and sh.stoid = ?";
          mysql
            .executeSQLStatement(sql, [
              req.query.investorid,
              params.shareRec.stoid,
              req.query.investorid,
              req.query.id,
              params.shareRec.stoid,
            ])
            .then((result) => {
              if (result.length > 0) {
                params.investorRecFound = 1;
                params.investorRec = result[0];
              } else {
                params.investorRec = [];
                params.investorRecFound = 0;
              }
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.toString()} - Error occured `
              );
            });
        } else {
          params.investorRec = [];
          callback(null);
        }
      },
      function fun2(callback) {
        if (req.query.investorid != null && params.investorRecFound == 1) {
          const sql = `select shares, CertificateSerials, ShareSerials, DATE_FORMAT(datePurchase,'%M %d %Y') as datePurchase  from shareshistory where shareTypeid = ? and investorID = ?; select TokensTransferred, AmountInvested, CurrencyID, Description, DATE_FORMAT(DateTime,'%M %d %Y') as DateTime from investments where shareTypeid = ? and InvestorID = ?`;
          mysql
            .executeSQLStatement(sql, [
              req.query.id,
              req.query.investorid,
              req.query.id,
              req.query.investorid,
            ])
            .then((result) => {
              params.historyRecs = result[0];
              params.investmentRecs = result[1];
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.toString()} - Error occured `
              );
            });
        } else {
          params.historyRecs = [];
          callback(null);
        }
      },
      function funclast(callback) {
        let showInvSec = 0;
        if (req.query.investorid != null) showInvSec = 1;

        res.render("platform/resetinvestoraccount", {
          investmentRecs: params.investmentRecs,
          historyRecs: params.historyRecs,
          showInvSec,
          investorRecFound: params.investorRecFound,
          id: req.query.id,
          investorRec: params.investorRec,
          shareRec: params.shareRec,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
        });
      },
    ]);
  },
  resetInvestorShareTypePost(req, res) {
    const params = {};

    async.waterfall([
      function getSTORecord(callback) {
        const sql =
          "select shares, stoid from shares where investorid = ? and sharetypeid = ?";
        mysql
          .executeSQLStatement(sql, [req.query.investorid, req.query.id])
          .then((result) => {
            params.shares = result[0].shares;
            params.stoid = result[0].stoid;
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured `
            );
          });
      },
      function function2(callback) {
        const sql = `delete from shareshistory where shareTypeid = ? and investorID = ?; 
                             delete from shares where shareTypeid = ? and investorID = ?;
                             update sharetypes set companyshares = companyshares + ? where id = ?;
                             delete from investments where shareTypeid = ? and InvestorID = ?`;
        mysql
          .executeSQLStatement(sql, [
            req.query.id,
            req.query.investorid,
            req.query.id,
            req.query.investorid,
            params.shares,
            req.query.id,
            req.query.id,
            req.query.investorid,
          ])
          .then((result) => {
            res.redirect(`/platform/shareslist?id=${  params.stoid}`);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured `
            );
          });
      },
    ]);
  },

  systemuserslist(req, res) {
    // common.checkUserAuthorizationForModule(req, res, 6);
    let storec = null;

    async.waterfall([
      function getSTORecord(callback) {
        const sql = "SELECT * FROM stos where id = ?";
        mysql
          .executeSQLStatement(sql, [req.query.stoid])
          .then((result) => {
            storec = result[0];
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message}Error occured in systemuserslist getsystemuserslist`
            );
          });
      },
      function getRecords(callback) {
        const sql = "SELECT * FROM users where stoid = ?";
        mysql
          .executeSQLStatement(sql, [req.query.stoid])
          .then((result) => {
            callback(null, result);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message}Error occured in systemuserslist getsystemuserslist`
            );
          });
      },
      function showPage(investorsRecord) {
        res.render("systemusers", {
          stotitle: storec.title,
          DataRows: investorsRecord,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
          stoid: parseInt(req.query.stoid),
        });
      },
    ]);
  },
  systemuserView(req, res) {
    // common.checkUserAuthorizationForModule(req, res, 6);

    const params = {};

    function getUserRecord(callback) {
      const stmt = "Select * from users where ID = ?";
      mysql
        .executeSQLStatement(stmt, [req.query.id])
        .then((result) => {
          params.user = result[0];
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in systemuserView getUserRecord`
          );
        });
    }
    function getAllRoles(callback) {
      const stmt = "select * from rolessto";

      mysql
        .executeSQLStatement(stmt, [])
        .then((result) => {
          params.Roles = result;
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in systemuserView getAllRoles`
          );
        });
    }
    function getUserRole(callback) {
      const stmt = "Select * from userssto where UserID = ?";

      mysql
        .executeSQLStatement(stmt, [req.query.id])
        .then((result) => {
          params.RoleID = result[0].roleid;

          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()}Error occured in systemuserView getUserRole`
          );
        });
    }
    function getUserRoleRights(callback) {
      const stmt =
        "select * from rolesrightssto rr, rights r where RoleID = ? and rr.RightID = r.ID and r.typeadminorsto = 1";

      mysql
        .executeSQLStatement(stmt, [params.RoleID])
        .then((result) => {
          let rightStr = "<ul>";
          for (let i = 0; i < result.length; i++) {
            rightStr = `${rightStr} <li> ${result[i].RightName}</li>`;
          }
          rightStr += "</ul>";
          params.Rights = rightStr;
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message}Error occured in systemuserView getUserRoleRights`
          );
        });
    }
    async.waterfall(
      [getUserRecord, getAllRoles, getUserRole, getUserRoleRights],
      (err) => {
        try {
          let userRole = "";

          for (let i = 0; i < params.Roles.length; i++) {
            if (params.Roles[i].ID === params.RoleID) {
              userRole = params.Roles[i].Role;
              break;
            }
          }

          res.render("systemuserview", {
            Data: common.getPlatformCommonPageProperties(req),
            userRec: params.user,
            Roles: params.Roles,
            userRole,
            Rights: params.Rights,
            STORoles: params.STORoles,
            UserHasSTOAccess: params.UserHasSTOAccess,
            partials: common.getPlatformPartials(),
          });
        } catch (error) {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in systemuserView`
          );
        }
      }
    );
  },
  systemUserAddEdit(req, res) {
    // common.checkUserAuthorizationForModule(req, res, 6);
    let isEditing = 0;
    if (req.query.id) {
      isEditing = 1;
    }

    function getDatabaseInformation(callback) {
      const params = {};

      if (isEditing === 1) {
        const stmt = "select * from users where id = ?";
        mysql
          .executeSQLStatement(stmt, [req.query.id])
          .then((result) => {
            params.userRecord = result[0];
            params.stoid = result[0].stoid;
            callback(null, params);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} Error occured in systemUserAddEdit getDatabaseInformation`
            );
          });
      } else {
        params.stoid = parseInt(req.query.stoid);
        callback(null, params);
      }
    }
    function getRoles(params, callback) {
      const stmt = `Select * from rolessto where stoid = ${params.stoid}`;

      mysql
        .executeSQLStatement(stmt, [])
        .then((result) => {
          params.Roles = result;
          callback(null, params);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in systemUserAddEdit getRoles`
          );
        });
    }
    function getUserRole(params, callback) {
      if (isEditing === 1) {
        const stmt = "Select * from userssto where UserID = ?";

        mysql
          .executeSQLStatement(stmt, [req.query.id])
          .then((result) => {
            params.RoleID = result[0].roleid;

            callback(null, params);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in systemUserAddEdit getUserRole`
            );
          });
      } else {
        params.RoleID = -2;
        callback(null, params);
      }
    }
    try {
      async.waterfall(
        [getDatabaseInformation, getRoles, getUserRole],
        (err, params) => {
          if (err) {
            common.handleError(req, res, `${err.message} - Error occurred in systemUserAddEdit\n${err.stack}`)
          } else {
            res.render("systemuseredit", {
              Data: common.getPlatformCommonPageProperties(req),
              rolesCount: params.Roles.length,
              isEditing,
              userRecord: params.userRecord,
              csrfToken: req.csrfToken(),
              Roles: params.Roles,
              userRoleID: params.RoleID,
              partials: common.getPlatformPartials(),
              stoid: params.stoid,
              message: req.flash("message"),
            });
          }
        }
      );
    } catch (err) {
      common.handleError(req, res, `${err.message} - Error occurred in systemUserAddEdit render\n${err.stack}`);
    }
  },
  systemUserAddEditPost(req, res) {
    // common.checkUserAuthorizationForModule(req, res, 6);

    function checkUserNameAlreadyExistsAdd(callback) {
      const stmt = "Select * from users where Username = ? and stoid = ?";
      mysql
        .executeSQLStatement(stmt, [req.body.Username, req.body.stoid])
        .then((result) => {
          if (result.length > 0) {
            req.flash(
              "message",
              `Username (${req.body.Username}) already exists`
            );
            return res.redirect(`systemUserAddEdit?stoid=${  req.body.stoid}`);
          }

          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in systemUserAddEditPost checkUserNameAlreadyExists`
          );
        });
    }
    function addUserRecordAdd(callback) {
      const stmt =
        "INSERT INTO users(FirstName, LastName, isActive, Username, Password, email, stoid) VALUES(?,?,?,?,?,?,?)";
      const todo = [
        req.body.FirstName,
        req.body.LastName,
        0,
        req.body.Username,
        common.getSHA256Hash(req.body.Password),
        req.body.email,
        req.body.stoid,
      ];
      mysql
        .executeSQLStatement(stmt, todo)
        .then((result) => {
          callback(null, result.insertId);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in systemUserAddEditPost addUserRecord`
          );
        });
    }
    function addUserRole2Add(NewUserID, callback) {
      let stmt = "";
      let data = [];
      stmt = "Insert into userssto (RoleID, UserID, Stoid) values (?, ?, ?)";
      data = [req.body.UserRole, NewUserID, req.body.stoid];

      mysql
        .executeSQLStatement(stmt, data)
        .then(() => {
          const stmt =
            "Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid) values (?,NOW(),?,?,?,?)";
          const sqlparams = [
            req.session.user.ID,
            "New System User Created",
            -1,
            1,
            req.session.stoid,
          ];
          mysql
            .executeSQLStatement(stmt, sqlparams)
            .then(() => {
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.toString()} Error occured in systemUserAddEditPost addUserRole2`
              );
            });
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in systemUserAddEditPost addUserRole2`
          );
        });
    }

    function updateUserRecordEdit(callback) {
      let stmt = "";
      let todo = [];
      const params = {};
      params.LogDescription = `System User ID ${req.body.ID} (${req.body.FirstName} ${req.body.LastName}) Record Modified`;

      if (req.body.Password !== "") {
        stmt =
          "Update users set FirstName=?, LastName=?, Password=? where ID=?";
        todo = [
          req.body.FirstName,
          req.body.LastName,
          common.getSHA256Hash(req.body.Password),
          req.body.ID,
        ];
        params.LogDescription = `System User ID ${req.body.ID} (${req.body.FirstName} ${req.body.LastName}). Record Modified and Password Changed`;
      } else {
        stmt = "Update users set FirstName=?, LastName=?, email=? where ID=?";
        todo = [
          req.body.FirstName,
          req.body.LastName,
          req.body.email,
          req.body.ID,
        ];
      }

      mysql
        .executeSQLStatement(stmt, todo)
        .then(() => {
          const stmt =
            "Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid) values (?,NOW(),?,?,?,?)";
          const sqlparams = [
            req.session.user.ID,
            params.LogDescription,
            -1,
            4,
            req.session.stoid,
          ];
          mysql
            .executeSQLStatement(stmt, sqlparams)
            .then(() => {
              callback(null, params);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.toString()} Error occured in systemUserAddEditPost updateUserRecord`
              );
            });
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} -Error occured in systemUserAddEditPost updateUserRecord`
          );
        });
    }
    function deleteUserRoleEdit(params, callback) {
      let stmt = "";
      if (req.body.stoid === 0) stmt = "Delete from userroles where UserID = ?";
      else stmt = "Delete from userssto where UserID = ?";

      mysql
        .executeSQLStatement(stmt, [req.body.ID])
        .then(() => {
          callback(null, params);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in systemUserAddEditPost deleteUserRole`
          );
        });
    }
    function addUserRoleEdit(params, callback) {
      let stmt = "";
      let data = [];
      if (req.body.stoid === 0) {
        stmt = "Insert into userroles (RoleID, UserID) values (?, ?)";
        data = [req.body.UserRole, req.body.ID];
      } else {
        stmt = "Insert into userssto (RoleID, UserID, Stoid) values (?, ?, ?)";
        data = [req.body.UserRole, req.body.ID, req.body.stoid];
      }

      mysql
        .executeSQLStatement(stmt, data)
        .then(() => {
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in systemUserAddEditPost addUserRole`
          );
        });
    }

    if (req.body.FormOperation === "0") {
      async.waterfall(
        [checkUserNameAlreadyExistsAdd, addUserRecordAdd, addUserRole2Add],
        (err) => {
          if (!err) {
            res.redirect(`systemuserslist?stoid=${  req.body.stoid}`);
          } else {
            common.handleError(
              req,
              res,
              `${params} - Error occured in systemUserAddEditPost addUserRole2`
            );
          }
        }
      );
    } else {
      async.waterfall(
        [updateUserRecordEdit, deleteUserRoleEdit, addUserRoleEdit],
        (err) => {
          if (!err) {
            res.redirect(`systemuserView?id=${req.body.ID}`);
          } else {
            common.handleError(
              req,
              res,
              `${params} - Error occured in systemUserAddEditPost`
            );
          }
        }
      );
    }
  },
  systemUserActivateDeactivate(req, res) {
    // common.checkUserAuthorizationForModule(req, res, 6);

    function activateDeactivateUser(callback) {
      let flagtemp = 0;
      if (req.query.boolFlag === "true") {
        flagtemp = 1;
      }

      const stmt = "Update users set isActive = ? where id = ?";
      mysql
        .executeSQLStatement(stmt, [flagtemp, req.query.id])
        .then(() => {
          const params = {};
          if (req.query.boolFlag === "true")
            params.LogDescription = `System User id ${req.query.id} Activated`;
          else
            params.LogDescription = `System User id ${req.query.id} Deactivated`;

          params.InvestorID = -1;

          const stmt =
            "Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid) values (?,NOW(),?,?,?,?)";
          const sqlparams = [
            req.session.user.ID,
            params.LogDescription,
            -1,
            2,
            req.session.stoid,
          ];
          mysql
            .executeSQLStatement(stmt, sqlparams)
            .then(() => {
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.toString()} Error occured in systemUserActivateDeactivate activateDeactivateUser`
              );
            });
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - DB error occured in systemUserActivateDeactivate activateDeactivateUser`
          );
        });
    }
    async.waterfall([activateDeactivateUser], (err) => {
      if (!err) {
        res.redirect(`systemuserView?id=${req.query.id}`);
      } else {
        common.handleError(
          req,
          res,
          `${params} - Error occured in systemUserActivateDeactivate`
        );
      }
    });
  },
  deleteSTORight(req, res) {
    function deleteRightFromSTO(callback) {
      const stmt = "delete from  userssto where id = ?";
      mysql
        .executeSQLStatement(stmt, [req.query.id])
        .then((result) => {
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in deleteSTORight deleteRightFromSTO`
          );
        });
    }
    async.waterfall([deleteRightFromSTO], (err) => {
      res.redirect(`systemuserView?id=${  req.query.userid}`);
    });
  },
  setNewSTORightForUser(req, res) {
    function deleteOldRightFromDB(callback) {
      const stmt = "delete from userssto where userid = ? and stoid = ?";
      mysql
        .executeSQLStatement(stmt, [req.query.userid, req.query.stoid])
        .then((result) => {
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in setNewSTORightForUser deleteOldRightFromDB`
          );
        });
    }
    function insertRecordIntoTableSTO(callback) {
      const stmt =
        "insert into userssto(userid, stoid, roleid) values(?, ?, ?)";
      mysql
        .executeSQLStatement(stmt, [
          req.query.userid,
          req.query.stoid,
          req.query.roleid,
        ])
        .then((result) => {
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in setNewSTORightForUser insertRecordIntoTableSTO`
          );
        });
    }
    async.waterfall(
      [deleteOldRightFromDB, insertRecordIntoTableSTO],
      (err) => {
        res.redirect(`systemuserView?id=${  req.query.userid}`);
      }
    );
  },
  activateSystemUserForPlaformLogin(req, res) {
    const sql = "update users set isPlatformAdminLogin = ? where id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.enable, req.query.id])
      .then((result) => {
        res.redirect("systemuserslist?stoid=0");
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message}Error occured in activateSystemUserForPlaformLogin`
        );
      });
  },

  updateGloablVariables(req, res) {
    mysql.initializeGlobals().then((result) => {
      req.flash("platformdashboardmessage", "Global Variables are Reset");
      res.redirect("dashboard");
    });
  },
  checkMemoryUsage(req, res) {
    const used = process.memoryUsage();
    const data = {};
    for (const key in used) {
      data[key] = `${Math.round((used[key] / 1024 / 1024) * 100) / 100  } MB`;
    }
    res.send(data);
  },
  getLogFileData(req, res) {
    const file = common.getUserFileUploadsLocationFullPath(
      `../log/${req.query.file}`
    );
    fs.exists(file, (exists) => {
      if (exists) res.download(file);
      // Set disposition and send it.
      else
        logger.error(
          `File(${file}) not found Error occured in downloadDocument`
        );
    });
  },
  getTodayLogFileData(req, res) {
    const dt = new Date();
    const month = `${dt.getMonth() + 1}`.padStart(2, 0);
    const day = `${dt.getDate()}`.padStart(2, 0);

    const file = common.getUserFileUploadsLocationFullPath(
      `../log/${dt.getFullYear()}-${month}-${day}-results.log`
    );
    console.log(file);
    fs.exists(file, (exists) => {
      if (exists) res.download(file);
      else {
        req.flash("platformdashboardmessage", "No file exists");
        res.redirect("dashboard");
      }
    });
  },

  platformsettings(req, res) {
    const sql =
      `select * from timezone where id != 0; select * from params where param = 'DocuSignEmail';
       select * from params where param = 'DocuSignIntegrationKey';
       select * from params where param = 'DocuSignSTOContractID';
       select * from params where param = 'DocuSignlinkToLoginServer';
       select * from params where param = 'DocuSignSharesPurchaseContractID';
       select * from params where param = 'Ravencoin_ServerURL';
       select * from params where param = 'Ravencoin_Username';
       select * from params where param = 'Ravencoin_Password';
       select * from params where param = 'web3Address';
       select * from params where param = 'sharePurchaseDocumentsMode';
       select * from params where param = 'areSTOHostnamesEnabled';
       select * from params where param = 'CurrentClientID';
       select * from params where param = 'polygonWeb3Address';
       select * from params where param = 'SSORedirectFrontEnd';
       select * from params where param = 'CognitoUserPoolId';
       select * from params where param = 'CognitoClientId';
       select * from params where param = 'CognitoPool_region';
       select * from params where param = 'ExternalAPILink';
       select * from params where param = 'ExternalAPILinkUser';
       select * from params where param = 'ExternalAPILinkPassword';
       select * from params where param = 'BlockPassApiJson';
       select * from params where param = 'VotingPowerInFractions';
       select * from params where param = 'SumSubApiJson';
       select * from params where param = 'stoinvestortypes';
       select * from params where param = 'stoinvestortypesnotonshareregister';
       select * from stoinvestortype;
       select * from params where param = 'SSOModeEnabled';
       select * from params where param = 'bimountEnabled';
       select * from params where param = 'binanceWeb3Address';
       select * from investing_entity_types;
       select settings from stos where id = 0;
       select * from params where param = 'isSaaS';
       `;
    let paramsList = [];
    mysql
      .executeSQLStatement(sql, [])
      .then((result) => {
        getParamsList().then(async (data) => {
          paramsList = data;
          const stoService  = new StoSqlService();
          const sto0 = await stoService.getSto(0);
          const stoSettings = JSON.parse(sto0.settings);

          const appDir = path.dirname(mainFilename);
          const commonPath = 'platform/partial-switches';
          const partialPath = {
            platformSwitchesIndex: `${appDir}/../views/${commonPath}/index`,
            isPropertySortingSwitch: `${appDir}/../views/${commonPath}/isPropertySortingSwitch`,
            isContactTheSponsorFontSwitch: `${appDir}/../views/${commonPath}/isContactTheSponsorFontSwitch`,
            isBankDetailsSwitch: `${appDir}/../views/${commonPath}/isBankDetailsSwitch`,
            isBlockchainAddressSwitch: `${appDir}/../views/${commonPath}/isSharedBlockchainAddressesSwitch`,
            showThemeEngineSwitch: `${appDir}/../views/${commonPath}/showThemeEngineSwitch`,
            termsAndConditionsInput: `${appDir}/../views/${commonPath}/termsAndConditionsInput`,
          };

          res.render("platform/platformsettings", {
            timezone: result[0],
            DocuSignEmail: result[1][0].stringValue,
            DocuSignIntegrationKey: result[2][0].stringValue,
            DocuSignSTOContractID: result[3][0].stringValue,
            DocuSignlinkToLoginServer: result[4][0].stringValue,
            DocuSignSharesPurchaseContractID: result[5][0].stringValue,
            Ravencoin_ServerURL: result[6][0].stringValue,
            Ravencoin_Username: result[7][0].stringValue,
            Ravencoin_Password: result[8][0].stringValue,
            web3Address: result[9][0].stringValue,
            sharePurchaseDocumentsMode: result[10][0].stringValue,
            areSTOHostnamesEnabled: result[11][0].intValue,
            CurrentClientID: result[12][0].intValue,
            polygonWeb3Address: result[13][0].stringValue,
            SSORedirectFrontEnd: result[14][0].stringValue,
            CognitoUserPoolId: result[15][0].stringValue,
            CognitoClientId: result[16][0].stringValue,
            CognitoPool_region: result[17][0].stringValue,
            ExternalAPILink: result[18][0].stringValue,
            ExternalAPILinkUser: result[19][0].stringValue,
            ExternalAPILinkPassword: result[20][0].stringValue,
            BlockPassApiJson: result[21][0].stringValue,
            VotingPowerInFractions: result[22][0].intValue,
            SumSubApiJson: result[23][0].stringValue,
            stoinvestortypes: result[24][0].stringValue,
            stoinvestortypesnotonshareregister: result[25][0].stringValue,
            stoinvestortype: result[26],
            SSOModeEnabled: result[27][0].intValue,
            bimountEnabled: result[28][0].intValue,
            binanceWeb3Address: result[29][0].stringValue,
            entityTypes: result[30],
            countryList: common.getCountries(),
            isSaaS: result[31][0].intValue,
            partials: common.getPlatformPartials(partialPath),
            Data: common.getPlatformCommonPageProperties(req),
            csrfToken: req.csrfToken(),
            message: parseInt(req.flash("message")),
            DataRows: encodeURIComponent(JSON.stringify(paramsList)),
            favicon: stoSettings?.favicon ?? '',
            tabTitle: stoSettings?.tabTitle ?? '',
            platformConfiguration: global.config.platformConfiguration == 2? false : true,
            toggleThemeEditor: global.config.toggleThemeEditor,
            tcJSON: global.config.termsAndConditionsConfig,
            isInvestorOwnershipModuleEnabled: global.config.isInvestorOwnershipModuleEnabled,
          });
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} Error occured in settings getinvestordata`
        );
      });
  },
  changePassword(req, res) {
    mysql
      .changePassword(req)
      .then((result) => {
        req.flash("message", result);
        res.redirect(`platformsettings`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in admin changePassword`
        );
      });
  },
  changeRavencoinPassword(req, res) {
      if (req.body.txtPassword != "") {
        common.encryptAsync(req.body.txtPassword).then((pass) => {
            const stmt = "update params set stringvalue = ? where param = 'Ravencoin_UserWalletPassword'";
            mysql.executeSQLStatement(stmt, [pass]).then(() => {
                res.redirect("/platform/platformsettings")
            }).catch((error) => {
                common.handleError(req,res,`${error.message} Error occured in changeRavencoinPassword`);
            });
        });
      } else
        res.redirect("/platform/platformsettings")

  },

  changetimezone(req, res) {
    const sql = "update timezone set timepadding = ? where id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.value, req.query.id])
      .then((result) => {
        res.redirect("platformsettings");
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} Error occured in changetimezone`
        );
      });
  },
  setDocuSignInfo(req, res) {
    let pass = "";

    async.waterfall([
      function function1(callback) {
        if (req.body.txtPassword != "") {
          common.encryptAsync(req.body.txtPassword).then((result) => {
            pass = result;
            callback(null);
          });
        } else callback(null);
      },
      function function2(callback) {
        let stmt = `update params set stringvalue = ? where param = 'DocuSignEmail';
                      update params set stringvalue = ? where param = 'DocuSignlinkToLoginServer';
                      update params set stringvalue = ? where param = 'DocuSignIntegrationKey';
                      update params set stringvalue = ? where param = 'DocuSignSTOContractID'; 
                      update params set stringvalue = ? where param = 'DocuSignSharesPurchaseContractID'`;
        const data = [req.body.DocuSignEmail, req.body.DocuSignlinkToLoginServer, req.body.DocuSignIntegrationKey,
          req.body.DocuSignSTOContractID, req.body.DocuSignSharesPurchaseContractID];

        if (req.body.txtPassword !== "") {
          stmt += `; update params set stringvalue = ? where param = 'DocuSignPassword'`;
          data.push(pass);
        }
        mysql
          .executeSQLStatement(stmt, data)
          .then((result) => {
            if (req.body.txtPassword != "")
              global.config.DocuSignPassword = pass;

            global.config.DocuSignEmail = req.body.DocuSignEmail;
            global.config.DocuSignIntegrationKey =
              req.body.DocuSignIntegrationKey;
            global.config.DocuSignlinkToLoginServer =
              req.body.DocuSignlinkToLoginServer;
            global.config.DocuSignSTOContractID =
              req.body.DocuSignSTOContractID;
            global.config.DocuSignSharesPurchaseContractID =
              req.body.DocuSignSharesPurchaseContractID;

            res.redirect("/platform/platformsettings");
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} Error occured in setDocuSignInfo`
            );
          });
      },
    ]);
  },

  settings(req, res) {
    const params = {};
    function getDatabaseInformation(callback) {
      const sql = `select *, DATE_FORMAT(exchangeOpenDate,'%M %d %Y') as exchangeOpenDateFormat from stos where id = ?`;
      mysql
        .executeSQLStatement(sql, [req.query.id])
        .then((result) => {
            params.rec = result[0];
            const date2 = new Date(result[0].exchangeOpenDateFormat);
            const today = new Date();
            if (date2 > today) params.exchangeIsClose = 1;
            else params.exchangeIsClose = 0;

            const settings2 = JSON.parse(result[0].settings);
            if (settings2.isInternalExchangeEnabled == 1)
              params.exchangeModuleEnabled = 1;
            else params.exchangeModuleEnabled = 0;

            callback(null);
        }).catch((error) => {
          common.handleError( req, res, `${error.toString()} - Error occured in settings getDatabaseInformation`);
        });
    }
    function fetchStoMetadata(callback){
      const sql = `SELECT stosMetaKeys.key, stosMetaKeys.type, stosMetaKeys.order, metaValues.value FROM stosMetaKeys LEFT JOIN (SELECT * FROM stosMetaValues where stosMetaValues.stoID = ? ) as metaValues on stosMetaKeys.key=metaValues.key ORDER BY stosMetaKeys.order ASC;`;
      mysql
        .executeSQLStatement(sql, [req.query.id])
        .then((result = []) => {
          params.stoMetadata = result.map((meta) => {
            if (meta.type === 'chart') {
              if (!meta.value) {
                return {
                  ...meta,
                  value: {
                    title: '',
                    height: 150,
                    data: [
                      { title: '', value: 0, color: '#2082af' },
                      { title: '', value: 0, color: '#58a7ce' },
                      { title: '', value: 0, color: '#98c8df' },
                    ],
                  },
                }
              }

              return {
                ...meta,
                value: JSON.parse(meta.value),
              }
            }
            return meta;
          });
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in settings fetchStoMetadata`
          );
        });
    }
    function decryptPassword(callback) {
      if (params.rec.SMTP_Password == null || params.rec.SMTP_Password == "") {
          params.password = "";
          callback(null);
      } else {
          common.decryptAsync(params.rec.SMTP_Password).then((pass) => {
              params.password = pass;
              callback(null);
          }).catch((error) => {
              common.handleError( req, res, `${error.message} Error occured in updatesmtpinfosto`);
          });
      }
    }
    function getEmailTexts(callback) {
      let stoId = +(req.query.id);
      if (Number.isNaN(stoId))
        stoId = 0;

      emailTextsController.getEmailTexts(stoId)
      .then((vm) => {
        params.emailTexts = vm;
        callback(null);
      })
      .catch(error => {
        console.error(`Couldn't get email texts - Platfrom admin STO settings for stoID:${stoId}\n${error}\n${error.stack}`);
      });
    }
    async.waterfall([getDatabaseInformation, fetchStoMetadata, decryptPassword, getEmailTexts], (err) => {
      res.render("platform/settings", {
        id: req.query.id,
        partials: common.getPlatformPartials(),
        Data: common.getPlatformCommonPageProperties(req),
        companyType: common.getCompanyType(params.rec),
        csrfToken: req.csrfToken(),
        exchangeIsClose: params.exchangeIsClose,
        exchangeModuleEnabled: params.exchangeModuleEnabled,
        record: params.rec,
        stoMetadata: params.stoMetadata,
        stoMetadataString: encodeURIComponent(JSON.stringify(params.stoMetadata)),
        password: params.password,
        message: req.flash("message"),
        kycProvider: global.config.KycProvider,
        accreditationEnabled: global.config.AccreditationEnabled,
        verifyInvestorEnabled: global.config.VerifyInvestorComApiToken ?? 0,
        emailTextsData: params.emailTexts,
        emailTextsDataDebug: JSON.stringify(params.emailTexts ?? {}),
        isInvestmentReturnCalculationEnabled: global.config.isInvestmentReturnCalculationEnabled,
      });
    });
  },
  updateDisclaimer(req, res) {
    mysql
      .updateDisclaimer(req, req.body.stoid)
      .then((result) => {
        res.redirect(`settings?id=${req.body.stoid}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in index updateDisclaimer`
        );
      });
  },
  updateEmailFooter(req, res) {
    mysql
      .updateEmailFooter(req, req.body.stoid)
      .then((result) => {
        res.redirect(`settings?id=${req.body.stoid}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in index  updateEmailFooter`
        );
      });
  },
  updatesmtpinfosto(req, res) {
    common
      .encryptAsync(req.body.txtPassword)
      .then((result) => {
        const sql =
          "update stos set SMTP_Host = ?, SMTP_Port = ?, SMTP_User = ?, SMTP_Password = ?, SMTP_FromAddress = ?, SMTP_FromName = ?  where id = ?";
        mysql
          .executeSQLStatement(sql, [
            req.body.txtHost,
            req.body.txtPort,
            req.body.txtUser,
            result,
            req.body.txtFromEmail,
            req.body.txtFromName,
            req.body.stoid,
          ])
          .then((result) => {
            getSTOFromConfig(req.body.stoid).SMTP_Host = req.body.txtHost;
            getSTOFromConfig(req.body.stoid).SMTP_Port = req.body.txtPort;
            getSTOFromConfig(req.body.stoid).SMTP_User = req.body.txtUser;
            getSTOFromConfig(req.body.stoid).SMTP_Password =
              req.body.txtPassword;
            getSTOFromConfig(req.body.stoid).SMTP_FromAddress =
              req.body.txtFromEmail;
            getSTOFromConfig(req.body.stoid).SMTP_FromName =
              req.body.txtFromName;

            res.redirect(`settings?id=${req.body.stoid}`);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured in admin  updatesmtpinfosto`
            );
          });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} Error occured in updatesmtpinfosto`
        );
      });
  },
  updateRegistrationText(req, res) {
    mysql
      .updateRegistrationText(req, req.body.stoid)
      .then((result) => {
        res.redirect(`settings?id=${req.body.stoid}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in index  updateRegistrationText`
        );
      });
  },
  changelogosite(req, res) {
    const form = new formidable.IncomingForm();
    let stoid = "";
    let tempfilepath = "";

    form.parse(req);
    form
      .on("fileBegin", (name, file) => {
        // begin file uploadings
        file.path = common.getUserFileLocation(
          path.join(__dirname, `/../../temp/${  file.name}`)
        );
      })
      .on("field", (name, value) => {
        // this contains each file/value received from HTML FORM or query string
        if (name == "stoid") stoid = value;
      })
      .on("file", (name, file) => {
        tempfilepath = file.path;
      })
      .on("error", (err) => {
        logger.error(`${err} - some erro occured`);
        reject(err);
      })
      .on("aborted", () => {
        // if user aborted the request
      })
      .on("end", () => {
        // file(s) / fields  has been received an this is the end of all data received from user

        fs.copy(
          common.getUserFileLocation(tempfilepath),
          common.getUserFileLocation(
            path.join(
              __dirname,
              `/../../public/img/stologo/${getSTOFromConfig(stoid).logo}`
            )
          ),
          (error) => {
            if (!error) {
              fs.remove(common.getUserFileLocation(tempfilepath))
                .then(() => {
                  res.redirect(`settings?id=${stoid}`);
                })
                .catch((error) => {
                  common.handleError(
                    req,
                    res,
                    `${error.toString()} - Error occured in changelogosite`
                  );
                });
            } else
              common.handleError(
                req,
                res,
                `${error.toString()} - Error occured in changelogosite`
              );
          }
        );
      });
  },
  changebannersite(req, res) {
    const form = new formidable.IncomingForm();
    let stoid = "";
    let tempfilepath = "";

    form.parse(req);
    form
      .on("fileBegin", (name, file) => {
        // begin file uploadings
        file.path = common.getUserFileLocation(
          path.join(__dirname, `/../../temp/${  file.name}`)
        );
      })
      .on("field", (name, value) => {
        // this contains each file/value received from HTML FORM or query string
        if (name == "stoid") stoid = value;
      })
      .on("file", (name, file) => {
        tempfilepath = file.path;
      })
      .on("error", (err) => {
        logger.error(`${err} - some erro occured`);
        reject(err);
      })
      .on("aborted", () => {
        // if user aborted the request
      })
      .on("end", () => {
        // file(s) / fields  has been received an this is the end of all data received from user

        fs.copy(
          common.getUserFileLocation(tempfilepath),
          common.getUserFileLocation(
            path.join(
              __dirname,
              `/../../public/img/stobanners/${getSTOFromConfig(stoid).logo}`
            )
          ),
          (error) => {
            if (!error) {
              fs.remove(common.getUserFileLocation(tempfilepath))
                .then(() => {
                  res.redirect(`settings?id=${stoid}`);
                })
                .catch((error) => {
                  common.handleError(
                    req,
                    res,
                    `${error.toString()} - Error occured in settings getDatabaseInformation`
                  );
                });
            } else
              common.handleError(
                req,
                res,
                `${error.toString()} - Error occured in settings getDatabaseInformation`
              );
          }
        );
      });
  },
  changeregistrationsuccesstext(req, res) {
    mysql
      .updateRegistrationSuccessText(req, req.body.stoid)
      .then((result) => {
        res.redirect(`settings?id=${req.body.stoid}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in index  updateRegistrationText`
        );
      });
  },
  changetellafriend(req, res) {
    mysql
      .updateTellAFriend(req, req.body.stoid)
      .then((result) => {
        res.redirect(`settings?id=${req.body.stoid}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in index  updateEmailFooter`
        );
      });
  },
  changeEmailInvestorBulkUpload(req, res) {
    mysql
      .updateEmailInvestorBulkUpload(req, req.body.stoid)
      .then((result) => {
        res.redirect(`settings?id=${req.body.stoid}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in index  updateEmailFooter`
        );
      });
  },
  changeExchangeOpenDate(req, res) {
    const sql = "update stos set exchangeOpenDate = ? where id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.date, req.query.id])
      .then((result) => {
        res.redirect(`settings?id=${  req.query.id}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message}Error occured in systemuserslist getsystemuserslist`
        );
      });
  },
  changeIsInternalExchangeEnabled(req, res) {
    const findSettingSql = `SELECT settings FROM stos WHERE id = ?`;
    mysql
      .executeSQLStatement(findSettingSql, [req.query.id])
      .then((result) => {
        const settings = JSON.parse(result[0].settings);
        settings.isInternalExchangeEnabled =
          req.query.isInternalExchangeEnabled === "1" ? 1 : 0;
        const setSettingsSql = `UPDATE stos SET settings = ? WHERE id = ?`;
        mysql
          .executeSQLStatement(setSettingsSql, [
            JSON.stringify(settings),
            req.query.id,
          ])
          .then(() => {
            res.redirect(`settings?id=${req.query.id}`);
          })
          .catch((setError) => {
            common.handleError(
              req,
              res,
              `${setError.message} - Error occurred in admin.js changeIsInternalExchangeEnabled while setting new settings`
            );
          });
      })
      .catch((selectError) => {
        common.handleError(
          req,
          res,
          `${selectError.message} - Error occurred in admin.js changeIsInternalExchangeEnabled while selecting existing settings`
        );
      });
  },

  // External links documents
  // tables       doclinks    doclinksdocuments
  doclinks(req, res) {
    const sto = common.getGloablSTORecordWithID(0);

    const sql =
      "select *, (select count(*) from doclinksdocuments where DocLinksID = doclinks.id and isNew = 1) as NewDocs, (select count(*) from doclinksdocuments  where DocLinksID = doclinks.id) as TotalDocs from doclinks";
    mysql
      .executeSQLStatement(sql, [])
      .then((result) => {
        res.render("platform/doclinks", {
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
          mainSTO: sto.stolinkfull,
          Records: result,
          message: req.flash("doclinkmessage"),
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in doclinks`
        );
      });
  },
  createNewLink(req, res) {
    common.generateRandomString(15).then((randomtxt) => {
      const sql =
        "insert into doclinks(isEnabled, title, secret) values(?, ?, ?)";
      mysql
        .executeSQLStatement(sql, [1, req.query.title, randomtxt])
        .then((result) => {
          res.redirect("/platform/doclinks");
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in createNewLink`
          );
        });
    });
  },
  doclinksdocuments(req, res) {
    const sql = `select *, DATE_FORMAT(dateuploaded,'%M %d %Y') as dateuploaded2 from doclinksdocuments where DocLinksID = ? order by dateuploaded desc limit 500`;
    mysql
      .executeSQLStatement(sql, [req.query.id])
      .then((result) => {
        res.render("platform/doclinksdocments", {
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
          Records: result,
          listid: req.query.id,
          message: req.flash("doclinkmessage"),
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in doclinksdocuments`
        );
      });
  },
  doclinksenabledisable(req, res) {
    const sql = "update doclinks set isEnabled = ? where id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.en, req.query.id])
      .then((result) => {
        res.redirect("/platform/doclinks");
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in doclinks`
        );
      });
  },
  link(req, res) {
    const sql = "select * from doclinks where secret = ?";
    mysql
      .executeSQLStatement(sql, [req.query.id])
      .then((result) => {
        let isAvailable = 0;

        if (result.length > 0) if (result[0].isEnabled == 1) isAvailable = 1;

        res.render("platform/link", {
          isAvailable,
          csrfToken: req.csrfToken(),
          partials: common.getPlatformPartials(),
          code: req.query.id,
          logo: Object.values(global.config.stos)[0].logo,
          SiteParameter_PageTitle: Object.values(global.config.stos)[0].title,
          message: req.flash("stolinkmessage"),
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in link`
        );
      });
  },
  linkupload(req, res) {
    const params = {};
    if (req.body.filetitle.length > 120) {
      common.handleError(
        req,
        res,
        `Public file upload link. file size is > 120. the check is on the client side but somehow the size is > 120 - ${req.body.filetitle}`
      );
    }

    function checkCode(callback) {
      const sql = "select id, isEnabled from doclinks where secret = ?";
      mysql
        .executeSQLStatement(sql, [req.body.code])
        .then((result) => {
          if (result.length > 0) {
            if (result[0].isEnabled == 1) {
              params.id = result[0].id;
              callback(null);
            } else {
              common.handleError(
                req,
                res,
                `File is being uploaded when link is down.`
              );
            }
          } else {
            common.handleError(
              req,
              res,
              `File is being uploaded for a link that does not exists`
            );
          }
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in linkupload checkCode`
          );
        });
    }
    function copyFiles(callback) {
      const j = JSON.parse(req.body.fileupload);
      const newLoc = common.getUserFileUploadsLocationFullPath("linkdocs");
      common
        .moveMultipleFilesToLocation(j, newLoc)
        .then((data) => {
          params.filejson = data;
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} Error occured in linkupload copyFiles`
          );
        });
    }
    function insertRec(callback) {
      const sql = `insert into doclinksdocuments(DocLinksID, title, dateuploaded, details, files, isNew) values (?, ?, now(), '', ?, 1);`;
      mysql
        .executeSQLStatement(sql, [
          params.id,
          req.body.filetitle,
          params.filejson[0],
        ])
        .then((result) => {
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in linkupload insertRec`
          );
        });
    }
    async.waterfall([checkCode, copyFiles, insertRec], (err) => {
      // res.send(params.filejson);
      req.flash(
        "stolinkmessage",
        "File is uploaded to platform and is now available to administration. <br /> You can upload more file(s)"
      );
      res.redirect(`/platform/link?id=${  req.body.code}`);
    });
  },
  downloadlinkdocument(req, res) {
    const params = {};

    function getRec(callback) {
      const sql = `select * from doclinksdocuments where id = ?`;
      mysql
        .executeSQLStatement(sql, [req.query.id])
        .then((result) => {
          if (result.length > 0) {
            params.rec = result[0];
            callback(null);
          } else
            common.handleError(
              req,
              res,
              `Wrong ID for link file was provided downloadlinkdocument getRec`
            );
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in downloadlinkdocument getRec`
          );
        });
    }
    function updateRec(callback) {
      const sql = `update doclinksdocuments set isnew = 0 where id = ?`;
      mysql
        .executeSQLStatement(sql, [req.query.id])
        .then((result) => {
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in downloadlinkdocument updateRec`
          );
        });
    }
    async.waterfall([getRec, updateRec], (err) => {
      const file = common.getUserFileUploadsLocationFullPath(
        `linkdocs/${  params.rec.files}`
      );

      fs.exists(file, (exists) => {
        if (exists) res.download(file);
        else
          logger.error(
            `File(${file}) not found Error occured in downloadlinkdocument `
          );
      });
    });
  },
  deletelinkdocument(req, res) {
    const params = {};

    function getRec(callback) {
      const sql = `select * from doclinksdocuments where id = ?`;
      mysql
        .executeSQLStatement(sql, [req.query.id])
        .then((result) => {
          if (result.length > 0) {
            params.rec = result[0];
            callback(null);
          } else
            common.handleError(
              req,
              res,
              `Wrong ID for link file was provided deletelinkdocument getRec`
            );
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in deletelinkdocument getRec`
          );
        });
    }
    function delRec(callback) {
      const sql = `delete from doclinksdocuments where id = ?`;
      mysql
        .executeSQLStatement(sql, [req.query.id])
        .then((result) => {
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in deletelinkdocument delRec`
          );
        });
    }
    async.waterfall([getRec, delRec], (err) => {
      const file = common.getUserFileUploadsLocationFullPath(
        `linkdocs/${  params.rec.files}`
      );
      fs.unlink(file, (err) => {
        res.redirect(`/platform/doclinksdocuments?id=${  req.query.listid}`);
      });
    });
  },
  deleteplatformlinkdoc(req, res) {
    const sql =
      "select count(*) as count from doclinksdocuments where DocLinksID = ?";
    mysql
      .executeSQLStatement(sql, [req.query.id])
      .then((result) => {
        if (result[0].count > 0) res.redirect("/platform/doclinks");
        else {
          const sql = "delete from doclinks where id = ?";
          mysql
            .executeSQLStatement(sql, [req.query.id])
            .then((result) => {
              res.redirect("/platform/doclinks");
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.toString()} - Error occured in deleteplatformlinkdoc`
              );
            });
        }
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in deleteplatformlinkdoc`
        );
      });
  },

  uploadFiles(req, res) {
    common
      .uploadMultipleFiles(req)
      .then((files) => {
        res.json(files);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} Error occured in changeinvestorauth`
        );
      });
  },
  setstopropertyfile(req, res) {
    const j = JSON.parse(req.body.fil1);
    const newLoc = common.getUserFileUploadsLocationFullPath(
      "../public/img/stobanners"
    );
    common
      .moveMultipleFilesToLocation(j, newLoc, "")
      .then((data) => {
        const sql = "select propertypicture from stos where id = ?";
        mysql
          .executeSQLStatement(sql, [req.body.id])
          .then((result) => {
            fs.unlink(`${newLoc  }/${  result[0].propertypicture}`, (err) => {
              const sql = "update stos set propertypicture = ? where id = ?";
              mysql
                .executeSQLStatement(sql, [data[0], req.body.id])
                .then((result) => {
                  res.redirect(`newsto?id=${  req.body.id}`);
                })
                .catch((error) => {
                  common.handleError(
                    req,
                    res,
                    `${error.toString()} - Error occured in setstopropertyfile`
                  );
                });
            });
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured in setstopropertyfile`
            );
          });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} Error occured in linkupload copyFiles`
        );
      });
  },

  viewLinkedDocuments(req, res) {
    const sql = "select pf.Title as Title, pf.ID as pfid, pf.Link as Link, std.id as stdid, std.sharetypesid, std.documentid from sharetypesdocuments std, PropertyFiles pf WHERE std.sharetypesid = ? AND std.documentid = pf.ID AND pf.Type = 1;\
                 select pf.Title as Title, pf.ID as pfid, pf.Link as Link, std.id as stdid, std.sharetypesid, std.documentid from sharetypesdocuments std, PropertyFiles pf WHERE std.sharetypesid = ? AND std.documentid = pf.ID AND pf.Type = 2;";
    mysql
      .executeSQLStatement(sql, [req.query.id, req.query.id])
      .then((result) => {
        res.render("platform/sto/viewlinkeddocuments", {
          images: result[0],
          docs: result[1],
          csrfToken: req.csrfToken(),
          id: req.query.id,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in uploadSTORelatedFilesPost`
        );
      });
  },

  deleteDocumentRelatedtoShareClass(req, res) {
    const sql = "DELETE FROM sharetypesdocuments WHERE id = ?";
    mysql
      .executeSQLStatement(sql, [req.query.id])
      .then(() => {
        res.redirect(`viewlinkeddocuments?id=${req.query.shareTypesId}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - DB error occured in linkToShareClass`
        );
      });
  },


  uploadSTORelatedFiles(req, res) {
    const sql =
      "select * from PropertyFiles where stoid = ? and type = 1;\
               select * from PropertyFiles where stoid = ? and type = 2;\
               select * from sharetypes where stoid = ?;\
               select pf.ID, pf.stoid, pf.Type, std.documentid, std.sharetypesid, st.title from PropertyFiles pf INNER JOIN sharetypesdocuments std ON std.documentid = pf.ID INNER JOIN sharetypes st ON st.ID = std.sharetypesid WHERE pf.stoid = ? and pf.Type = 1;\
               select pf.ID, pf.stoid, pf.Type, std.documentid, std.sharetypesid, st.title from PropertyFiles pf INNER JOIN sharetypesdocuments std ON std.documentid = pf.ID INNER JOIN sharetypes st ON st.ID = std.sharetypesid WHERE pf.stoid = ? and pf.Type = 2;";
    mysql
      .executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id, req.query.id, req.query.id])
      .then((result) => {
        result[1].forEach(res => {
          res.ShareClasses = [];
          res.ShareClasses = [];
          result[4].forEach(res2 => {
            if(res.ID == res2.documentid) {
              res.ShareClasses.push(res2);
            }
          });
        });
        result[0].forEach(res => {
          res.ShareClasses = [];
          res.ShareClasses = [];
          result[3].forEach(res2 => {
            if(res.ID == res2.documentid) {
              res.ShareClasses.push(res2);
            }
          });
        });
        res.render("platform/sto/uploadfiles", {
          images: result[0],
          docs: result[1],
          shareTypes: result[2],
          csrfToken: req.csrfToken(),
          id: req.query.id,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occured in uploadSTORelatedFilesPost`
        );
      });
  },
  uploadSTORelatedFilesPost(req, res) {
    const j = JSON.parse(req.body.fil1);
    const newLoc = common.getUserFileUploadsLocationFullPath(
      "../public/img/stobanners"
    );
    common
      .moveMultipleFilesToLocation(j, newLoc, "")
      .then((data) => {
        const sql =
          "insert into PropertyFiles(stoid, Type, Details, Title, Link) values(?, ?, ?, ?, ?)";
        mysql
          .executeSQLStatement(sql, [
            req.body.id,
            req.body.type,
            "",
            req.body.title,
            data[0],
          ])
          .then((result) => {
            res.redirect(`uploadSTORelatedFiles?id=${  req.body.id}`);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured in uploadSTORelatedFilesPost`
            );
          });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} Error occured in uploadSTORelatedFilesPost`
        );
      });
  },
  linkDocumentToShareType(req, res) {
    const params = {};
    async.waterfall([
      function deleteExistingLinkedDocument(callback) {
        const sql = "DELETE FROM sharetypesdocuments WHERE documentid = ? AND sharetypesid = ?;";
        mysql
          .executeSQLStatement(sql, [req.body.documentId, req.body.shareType])
          .then((result) => {
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured in deleteLinkedDocument`
            );
          });
      },
      function linkToShareClass(callback) {
        const sql = "insert into sharetypesdocuments(sharetypesid, documentid) values(?, ?)";
        mysql
          .executeSQLStatement(sql, [req.body.shareType, req.body.documentId])
          .then(() => {
            callback(null);
            res.redirect(`uploadSTORelatedFiles?id=${req.body.stoId}`);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - DB error occured in linkToShareClass`
            );
          });
      },
    ]);
    },
  deletepropertyrelatedfile(req, res) {
    const params = {};

    async.waterfall([
      function getPropertyDetails(callback) {
        const sql = "select Link from PropertyFiles where id = ?";
        mysql
          .executeSQLStatement(sql, [req.query.id])
          .then((result) => {
            params.fileName = result[0].Link;
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured in deleteplatformlinkdoc`
            );
          });
      },
      function deleteFile(callback) {
        fs.unlink(
          `${__dirname  }/../../public/img/stobanners/${  params.fileName}`,
          (err) => {
            const sql = "delete from PropertyFiles where id = ?";
            mysql
              .executeSQLStatement(sql, [req.query.id])
              .then((result) => {
                res.redirect(`uploadSTORelatedFiles?id=${  req.query.pid}`);
              })
              .catch((error) => {
                common.handleError(
                  req,
                  res,
                  `${error.toString()} - Error occured in deleteplatformlinkdoc`
                );
              });
          }
        );
      },
    ]);
  },

  bulkuploads(req, res) {
    const stmt = "select id, title from stos order by id";
    mysql
      .executeSQLStatement(stmt, [])
      .then((result) => {
        res.render("platform/bulkuploads", {
          stos: result,
          currentUploadStatus: global.config.bulkInvestorUploadProcessStatus,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
          csrfToken: req.csrfToken(),
          message: req.flash("bulkmessage"),
        });
      })
      .catch((error) => {
        reject(`${error.message} - Error occured in bulkuploads`);
      });
  },
  bulkuploadspost(req, res) {
    mysql
      .loadBulkUploadInvestorDataFile(req)
      .then((params) => {
        let allDataIsCorrect = 1;
        let companySharesLessthanBeingTransferred = 0;

        if (
          params.recordsNotComplete > 0 ||
          params.emailNotFoundOrNotCorrectFormat > 0 ||
          params.AllFieldsNotFound > 0 ||
          params.ShareValuesAreNotCorrectlyDefined > 0 ||
          params.ShareValuesAreNotComplete > 0 ||
          params.DuplicateEmailsFound > 0 ||
          params.EmailsFound.length > 0
        )
          allDataIsCorrect = 0;

        Object.keys(params.shareTypes).forEach((key) => {
          if (params.shareTypes[key].shares < params.shareTypes[key].count) {
            companySharesLessthanBeingTransferred = 1;
            allDataIsCorrect = 0;
          }
        });

        if (
          allDataIsCorrect == 0 ||
          companySharesLessthanBeingTransferred == 1
        ) {
          fs.unlink(`${__dirname  }/../../temp/${  params.fileName}`, (err) => {});
        }

        res.render("platform/bulkuploadspost", {
          totalLines: params.totalLines,
          recordsNotComplete: params.recordsNotComplete,
          recordsNotCompleteLines: params.recordsNotCompleteLines,
          emailNotFoundOrNotCorrectFormat:
            params.emailNotFoundOrNotCorrectFormat,
          emailNotFoundOrNotCorrectFormatLines:
            params.emailNotFoundOrNotCorrectFormatLines,
          AllFieldsNotFound: params.AllFieldsNotFound,
          AllFieldsNotFoundLines: params.AllFieldsNotFoundLines,
          ShareValuesAreNotCorrectlyDefined:
            params.ShareValuesAreNotCorrectlyDefined,
          ShareValuesAreNotCorrectlyDefinedLines:
            params.ShareValuesAreNotCorrectlyDefinedLines,
          ShareValuesAreNotComplete: params.ShareValuesAreNotComplete,
          ShareValuesAreNotCompleteLines: params.ShareValuesAreNotCompleteLines,
          DuplicateEmailsFound: params.DuplicateEmailsFound,
          DuplicateEmailsFoundLines: params.DuplicateEmailsFoundLines,
          EmailsFound: params.EmailsFound,
          allDataIsCorrect,
          shareTypes: params.shareTypes,
          shareTypesString: JSON.stringify(params.shareTypes),
          fileName: params.fileName,
          stoid: req.body.stoid,
          stotitle: req.body.stotitle,
          companySharesLessthanBeingTransferred,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
          csrfToken: req.csrfToken(),
          ShareCountInFractions: global.config.ShareCountInFractions,
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} - Error occured in  bulkuploadspost`
        );
      });
  },

  bulkDownloads(req, res) {
    const stmt = "select id, title from stos order by id";
    mysql
      .executeSQLStatement(stmt, [])
      .then((result) => {
        res.render("platform/bulkdownloads", {
          stos: result,
          currentUploadStatus: global.config.bulkInvestorUploadProcessStatus,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
          csrfToken: req.csrfToken(),
          message: req.flash("bulkmessage"),
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} - Error occurred in bulkDownloads`
        );
      });
  },
  bulkDownloadsPost(req, res) {
    exportInvestorsToCSV(req.body.stoid)
      .then((csv) => {
        res.header("Content-Type", "text/csv");
        res.attachment(`${req.body.stotitle}-export.csv`);
        return res.send(csv);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} - Error occurred in bulkDownloadsPost`
        );
      });
  },
  processUploadInvestors(req, res) {
    const currencyid = Object.values(global.config.stos)[0].settings
      .DefaultSTOCurreny;

    const shareTypes = JSON.parse(req.body.shareTypes);

    global.config.forkedBulkInvestorUpload.send({
      op: 1,
      fileName: req.body.fileName,
      stoid: req.body.stoid,
      currencyid,
      shareTypes,
      InvestorCombinePropertiesMode:
        global.config.InvestorCombinePropertiesMode,
      sendPasswordEmail: req.body.sendPasswordEmail,
    });
    res.redirect("dashboard");
  },

  brokerlinks(req, res) {
    // common.checkUserAuthorizationForModule(req, res, 6);
    const storec = null;

    async.waterfall([function getRecords(callback) {

        const sql = "SELECT * FROM brokers";
        mysql
          .executeSQLStatement(sql, [])
          .then((result) => {
            callback(null, result);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message}Error occured in brokerlinks`
            );
          });
      },
      function showPage(brokerRecord) {
        res.render("platform/broker/list", {
          DataRows: brokerRecord,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
        });
      },
    ]);
  },
  brokeradd(req, res) {
    let isEditing = 0;
    if (req.query.id) {
      isEditing = 1;
    }

    function getDatabaseInformation(callback) {
      const params = {};

      if (isEditing === 1) {
        const stmt = "Select * from brokers where id = ?";
        mysql
          .executeSQLStatement(stmt, [req.query.id])
          .then((result) => {
            params.userRecord = result[0];
            callback(null, params);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} Error occured in brokeradd getDatabaseInformation`
            );
          });
      } else {
        callback(null, params);
      }
    }
    function getRoles(params, callback) {
      const stmt = `select id, title from stos where id != 0`;

      mysql
        .executeSQLStatement(stmt, [])
        .then((result) => {
          params.stos = result;
          callback(null, params);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in brokeradd getDatabaseInformation`
          );
        });
    }
    function getUserRole(params, callback) {
      if (isEditing === 1) {
        let stmt;
        stmt = "Select * from brokerrights where brokerID = ?";

        mysql
          .executeSQLStatement(stmt, [req.query.id])
          .then((result) => {
            params.Roles = result;

            callback(null, params);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in brokeradd getDatabaseInformation`
            );
          });
      } else {
        params.RoleID = -2;
        callback(null, params);
      }
    }
    async.waterfall(
      [getDatabaseInformation, getRoles, getUserRole],
      (err, params) => {
        res.render("platform/broker/add", {
          Data: common.getPlatformCommonPageProperties(req),
          isEditing,
          userRecord: params.userRecord,
          stos: params.stos,
          csrfToken: req.csrfToken(),
          Roles: params.Roles,
          partials: common.getPlatformPartials(),
          message: req.flash("message"),
        });
      }
    );
  },
  brokeraddpost(req, res) {
    function checkUserNameAlreadyExistsAdd(callback) {
      const stmt = "Select * from brokers where Username = ?";
      mysql
        .executeSQLStatement(stmt, [req.body.Username])
        .then((result) => {
          if (result.length > 0) {
            req.flash(
              "message",
              `Username (${req.body.Username}) already exists`
            );
            return res.redirect("brokeradd");
          }

          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in brokeraddpost checkUserNameAlreadyExists`
          );
        });
    }
    function addUserRecordAdd(callback) {
      const stmt =
        "INSERT INTO brokers(FirstName, LastName, isActive, Username, Password, email) VALUES(?,?,?,?,?,?)";
      const data = [
        req.body.FirstName,
        req.body.LastName,
        0,
        req.body.Username,
        common.getSHA256Hash(req.body.Password),
        req.body.email,
      ];
      mysql
        .executeSQLStatement(stmt, data)
        .then((result) => {
          callback(null, result.insertId);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} - Error occured in systemUserAddEditPost addUserRecord`
          );
        });
    }

    function updateUserRecordEdit(callback) {
      let stmt = "";
      let todo = [];
      const params = {};

      if (req.body.Password !== "") {
        stmt =
          "Update brokers set FirstName=?, LastName=?, Password=? where ID=?";
        todo = [
          req.body.FirstName,
          req.body.LastName,
          common.getSHA256Hash(req.body.Password),
          req.body.ID,
        ];
      } else {
        stmt = "Update brokers set FirstName=?, LastName=?, email=? where ID=?";
        todo = [
          req.body.FirstName,
          req.body.LastName,
          req.body.email,
          req.body.ID,
        ];
      }

      mysql
        .executeSQLStatement(stmt, todo)
        .then(() => {
          callback(null, params);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} -Error occured in brokeraddpost updateUserRecord`
          );
        });
    }

    if (req.body.FormOperation === "0") {
      async.waterfall(
        [checkUserNameAlreadyExistsAdd, addUserRecordAdd],
        (err) => {
          if (!err) {
            res.redirect("brokerlinks");
          } else {
            common.handleError(
              req,
              res,
              `${params} - Error occured in systemUserAddEditPost brokeraddpost`
            );
          }
        }
      );
    } else {
      async.waterfall([updateUserRecordEdit], (err) => {
        if (!err) {
          res.redirect(`brokerview?id=${req.body.ID}`);
        } else {
          common.handleError(
            req,
            res,
            `${params} - Error occured in systemUserAddEditPost`
          );
        }
      });
    }
  },
  brokerview(req, res) {
    const params = {};
    function getUserRecord(callback) {
      const stmt = "Select * from brokers where ID = ?";
      mysql
        .executeSQLStatement(stmt, [req.query.id])
        .then((result) => {
          params.user = result[0];
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in brokerview getUserRecord`
          );
        });
    }
    function getAllSTO(callback) {
      const stmt =
        "select id, title from stos where id != 0 and id not in (select stoid from brokerrights where brokerid = ?) ";
      mysql
        .executeSQLStatement(stmt, [req.query.id])
        .then((result) => {
          params.stos = result;
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in brokerview getUserRecord`
          );
        });
    }
    function getAllBrokerSTOs(callback) {
      const stmt =
        "select s.id, s.title from stos s, brokerrights b where b.stoid = s.id and b.brokerid = ? ";
      mysql
        .executeSQLStatement(stmt, [req.query.id])
        .then((result) => {
          params.brokerstos = result;
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - Error occured in brokerview getUserRecord`
          );
        });
    }
    async.waterfall([getUserRecord, getAllSTO, getAllBrokerSTOs], (err) => {
      try {
        res.render("platform/broker/view", {
          Data: common.getPlatformCommonPageProperties(req),
          stos: params.stos,
          brokerstos: params.brokerstos,
          userRec: params.user,
          partials: common.getPlatformPartials(),
        });
      } catch (error) {
        common.handleError(
          req,
          res,
          `${error.message} - Error occured in brokerview`
        );
      }
    });
  },
  brokerenabledisable(req, res) {
    // common.checkUserAuthorizationForModule(req, res, 6);

    function activateDeactivateUser(callback) {
      let flagtemp = 0;
      if (req.query.boolFlag === "true") {
        flagtemp = 1;
      }

      const stmt = "Update brokers set isActive = ? where id = ?";
      mysql
        .executeSQLStatement(stmt, [flagtemp, req.query.id])
        .then(() => {
          const params = {};
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.toString()} - DB error occured in brokerenabledisable`
          );
        });
    }
    async.waterfall([activateDeactivateUser], (err) => {
      if (!err) {
        res.redirect(`brokerview?id=${req.query.id}`);
      } else {
        common.handleError(
          req,
          res,
          `${err.toString()} - Error occured in brokerenabledisable`
        );
      }
    });
  },
  addSTOtoBroker(req, res) {
    const stmt = "insert into brokerrights(brokerID, stoid) values(?, ?)";
    mysql
      .executeSQLStatement(stmt, [req.query.id, req.query.stoid])
      .then(() => {
        res.redirect(`brokerview?id=${  req.query.id}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - DB error occured in addSTOtoBroker`
        );
      });
  },
  removeSTOfromBroker(req, res) {
    const stmt = "delete from brokerrights where brokerID = ? and stoid = ?";
    mysql
      .executeSQLStatement(stmt, [req.query.id, req.query.stoid])
      .then(() => {
        res.redirect(`brokerview?id=${  req.query.id}`);
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - DB error occured in addSTOtoBroker`
        );
      });
  },
  deleteRegisterRecord(req, res) {
    const sql = `delete from register where id = ?`;
    mysql
    .executeSQLStatement(sql, [req.query.id])
    .then((result) => {
      res.redirect("registerlist");
    })
    .catch((error) => {
      common.handleError(
        req,
        res,
        `${error.message}Error occured in deleteRegisterRecord`
      );
    });
  },
  incompletedelete(req, res) {
    const registers = null;

    const sql = `delete from investor where id = ?; delete from investorsto where investorid = ?; delete from kyc where investorid = ?`;
    mysql
      .executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id])
      .then((result) => {
        res.redirect("investors");
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message}Error occured in incompletedelete`
        );
      });
  },

  setAutomaticTransferShares(req, res) {
    const web3 = new Web3(new Web3.providers.HttpProvider(global.config.web3Address));
    const data =  web3.eth.accounts.encrypt(req.body.ethereumPrivateKeysField, req.body.ethereumPassword);

    common.encryptAsync(req.body.ethereumPassword).then((pass) => {
        const stmt = "update sharetypes set channelIDForAutoPayments = ?, keyStoreFileAutoPayments = ?, keyStoreFileAutoPaymentsPassword = ? where id = ?";
        mysql.executeSQLStatement(stmt, [req.body.selectedChannelID, JSON.stringify(data), pass, req.body.recordID ]).then(() => {
            res.redirect( "shareslist?id=" + req.body.cid )
        }).catch((error) => {
            common.handleError(req,res,`${error.message} Error occured in setAutomaticTransferShares`);
        });
    });

  },

  // token Studio
  tokenStudio(req, res) {
    const params = {};

    let blockchainLink = "";
    let web3 = null;

    function func0(callback) {
        const sql = `select defaultBlockchain, title from stos where id = ?; select stringValue from params where param = 'atomicSwapContractAddress'`;
        mysql.executeSQLStatement(sql, [req.query.id])
        .then((result) => {
            params.stoBlockchainID = result[0][0].defaultBlockchain;
            params.stoTitle = result[0][0].title;
            params.swapContractAddress = result[1][0].stringValue;
            callback(null);            
        })
        .catch((error) => {
          logger.error(error);
          common.handleError(req, res, `${error.message} Error occured in tokenStudio in func0` );
        });
    }
    function func1(callback) {
        if( params.stoBlockchainID == 0 )
            params.stoBlockchainID = 1;

        if(params.stoBlockchainID == 1)
          blockchainLink = global.config.web3Address;
        else if(params.stoBlockchainID == 2)
          blockchainLink = global.config.binanceWeb3Address;
        else if(params.stoBlockchainID == 3)
          blockchainLink = global.config.polygonWeb3Address;


      if(blockchainLink != "") {
          web3 = new Web3(new Web3.providers.HttpProvider(blockchainLink));
          params.isBlockchainConnection = 1;
      } else
          params.isBlockchainConnection = 0;


       if( req.query.ethereumAddress != null && params.isBlockchainConnection == 1 ) {
            params.ethereumAddress = req.query.ethereumAddress;

            web3.eth.getBalance(req.query.ethereumAddress)
            .then((data)=> {
                params.ethereumAddressValue = web3.utils.fromWei(data, "ether");
                callback(null);
            }).catch((error) => {
              logger.error(error);
                common.handleError(req, res, `${error.message} Error occured in tokenStudio in func1` );
            });

       } else {
            params.ethereumAddress = "";
            params.ethereumAddressValue = 0;
            callback(null);
       }

    }
    function func2(callback) {

      if(params.isBlockchainConnection == 1) {
        web3.eth.getBlock("latest").then((blockInfo) => {

          web3.eth.getGasPrice().then((gasPrice) => {
              // console.log(gasPrice1);

              const encodedParameters = web3.eth.abi.encodeParameters(
                ['uint256', 'string', 'string', 'uint256', 'uint256', 'string', 'string', 'string'],
                ['8000000000000000000000000', 'E1404', 'E1404', 5, 18, "Dummy String for link information set by issuerDummy String for", "Dummy String for link information set by issuerDummy String for", "Dummy String for link information set by issuerDummy String for"]
              ).slice(2);

              params.gasPrice = web3.utils.fromWei(gasPrice, 'gwei');
              params.gasLimit = blockInfo.gasLimit;

              const byteSize = ERC1404Token.sizeOfByteCode + ERC1404Token.increaseSize;
              params.etherValue = web3.utils.fromWei(gasPrice, 'ether');
              params.ethCost = params.etherValue * byteSize;
              callback(null);

          }).catch((error) => {
            logger.error(error);
              common.handleError(req, res, `${error.message} Error occured in tokenStudio in func2 gasPrice` );
          });

        }).catch((error) => {
          logger.error(error);
            common.handleError(req, res, `${error.message} Error occured in tokenStudio in func2 getBlock` );
        });
      } else {
          params.gasPrice = 0;
          params.gasLimit = 0;
          params.etherValue = 0;
          params.ethCost = 0;
          callback(null);
      }
    }
    async.waterfall(
      [func0, func1, func2],
      (err) => {
        let showTokenCreationSection = 0;

        if(params.ethereumAddressValue != 0 || params.ethereumAddress != "") {
            if( params.ethereumAddressValue > params.ethCost )
              showTokenCreationSection = 1;
            else
              showTokenCreationSection = 2;

            params.ethereumAddressValue = parseFloat(params.ethereumAddressValue).toFixed(4);
        }

        let platformInvestorDashboardLink = "";
        const linkToInvestorDashboardSet = 1;
        // if(global.config.platformInvestorDashboardLink == "Update investor dashboard link" || global.config.platformInvestorDashboardLink == "")
          platformInvestorDashboardLink = `${req.protocol}://${req.get('host')}/legalinformation`;
        // else
        //  platformInvestorDashboardLink = global.config.platformInvestorDashboardLink

        res.render("platform/tokenstudio", {
            swapContractAddress: params.swapContractAddress,
            stoTitle: params.stoTitle,
            selectedSTOID: req.query.id,
            stoBlockchainID: params.stoBlockchainID,
            linkToInvestorDashboardSet,
            isBlockchainConnection: params.isBlockchainConnection,
            platformInvestorDashboardLink,
            ERC1404ByteCode: ERC1404Token.bytecode,
            ERC1404ByteSize: ERC1404Token.sizeOfByteCode + ERC1404Token.increaseSize,
            Data: common.getPlatformCommonPageProperties(req),
            gasLimit: params.gasLimit,
            showTokenCreationSection,
            ethereumAddress: params.ethereumAddress,
            ethereumAddressValue: params.ethereumAddressValue,
            ethCost: parseFloat(params.ethCost).toFixed(4),
            gasPrice: parseFloat(params.gasPrice).toFixed(2),
            csrfToken: req.csrfToken(),
            partials: common.getPlatformPartials(),
            message: req.flash("ethereumDeplyMessage"),
        });
      }
    );
  },
  tokenStudioPost(req, res) {
      /*
      console.log( req.body.tokenName )
      console.log( req.body.tokenSymbol )
      console.log( req.body.initialSupply )
      console.log( req.body.chkRestrictNumber )
      console.log( req.body.txtRestriceNumber )
      console.log( req.body.chkTokenDivisible )
      console.log( req.body.titleToken )
      console.log( req.body.nominalvalue )
      console.log( req.body.premiumvalue )
      */

      let blockchainLink = "";
      if( req.body.blockchainID != null ) {
          if(req.body.blockchainID == "1")
            blockchainLink = global.config.web3Address;
          else if(req.body.blockchainID == "2")
            blockchainLink = global.config.binanceWeb3Address;
          else if(req.body.blockchainID == "3")
            blockchainLink = global.config.polygonWeb3Address;
      } else
          blockchainLink = global.config.web3Address;

      let restrictInvestorCount = "0";
      if( req.body.chkRestrictNumber != null)
        restrictInvestorCount = req.body.txtRestrictNumber;

      var chkTokenDivisible = "0";
      var numberOfTokens = req.body.initialSupply.toString();
      if( req.body.chkTokenDivisible != null ) {
        var chkTokenDivisible = "18";
        var numberOfTokens = `${req.body.initialSupply.toString()  }000000000000000000`;
      }
      const param = {};

      const web3 = new Web3(new Web3.providers.HttpProvider(blockchainLink));
      async.waterfall ([
          function deployContract (callback) {

            if(req.body.metaMaskTransaction == "0") {
                  web3.eth.getBlock("latest").then((blockInfo) => {

                      const keys = ethereumApi.decryptKey(JSON.parse(req.body.filecontents), req.body.password);
                      if (keys === 'error') {
                          logger.error(`ERC1404 - Error authenticating Private key cannot be authenticated.`);
                          req.flash("ethereumDeplyMessage", "Private key cannot be authenticated.");
                          res.redirect("tokenStudio");
                      } else {

                            logger.info(`ERC1404 token being deployed with public key ${keys.public}`)

                            const encodedParameters = web3.eth.abi.encodeParameters(
                              ['uint256', 'string', 'string', 'uint256', 'uint256', 'string', 'string', 'string'],
                              [numberOfTokens, req.body.tokenName, req.body.tokenSymbol, restrictInvestorCount, chkTokenDivisible, req.body.shareCertificate, req.body.companyHomePage, req.body.companyLegalDocs]
                            ).slice(2);

                            // prepare the transaction:
                            const rawTx = {
                                from: keys.public,
                                data: ERC1404Token.bytecode  + encodedParameters,
                                // gas: blockInfo.gasLimit,
                                gasLimit: ERC1404Token.sizeOfByteCode + ERC1404Token.increaseSize
                            }

                            // sign and send the transaction
                            // let contractAddress
                            web3.eth.accounts.signTransaction(rawTx, keys.private )
                            .then((signedTx) => {

                                  logger.info (`ERC1404 contract is deploying for STO ${req.body.stoid} - Public Key ${keys.public}`);

                                  web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction, (err10, txId) => {

                                        if (err10) {
                                            logger.error(`ERC1404 contract deployment transaction error - ${err10.message}`);
                                            req.flash(`ethereumDeplyMessage", "There is some error deploying ERC1404 security token  - ${err10.message}`);
                                            res.redirect("tokenStudio");
                                        } else {
                                            param.txId = txId;
                                            callback(null);
                                        }

                                  }).catch((err6) => {
                                    logger.error(`ERC1404 contract deployment transaction error - ${err6.message}`);
                                    req.flash("ethereumDeplyMessage", `There is some error deploying ERC1404 security token - ${err6.message}`);
                                    res.redirect("tokenStudio");
                                  });

                            }).catch((err5) => {
                              logger.error(`ERC1404 contract deployment transaction error - ${err5.message}`);
                              req.flash("ethereumDeplyMessage", `There is some error deploying ERC1404 security token - ${err5.message}`);
                              res.redirect("tokenStudio");
                            });

                      }

                  }).catch((err4) => {
                    logger.error(`ERC1404 contract deployment transaction error - ${err4.message}`);
                    req.flash("ethereumDeplyMessage", `There is some error deploying ERC1404 security token - ${err4.message}`);
                    res.redirect("tokenStudio");
                  });
            } else {
                logger.info ("ERC1404 contract depoyment in progress. Transaction initiated by MetaMask")
                param.txId = req.body.blockchainTransactionID;
                callback(null);
            }

          },
          function setDB (callback) {

                  logger.info(`ERC1404 contract deployment transaction ID - ${param.txId}`)

                  const sql = "select settings from stos where id = ?";
                  mysql.executeSQLStatement(sql, [req.body.stoid]).then((result) => {
                        const settings = JSON.parse(result[0].settings);

                        async.retry(
                          { times: 1000, interval: 25000 },
                          (callbackRetry) => {
                              web3.eth.getTransactionReceipt(param.txId).then((data) => {
                                  console.log(data);
                                  if (data == null) {
                                      callbackRetry("ERC1404 Transaction cannot be verified in retries", 0);
                                  } else {
                                      callbackRetry(null, data);     // passing null as first parameter indicates success
                                  }
                              });
                          }, (err2, result) => {

                              if (err2 != null) {
                                  logger.error(`ERC1404 contract deployment transaction error - ${err2.message}`);
                                  req.flash("ethereumDeplyMessage", "There is some error deploying ERC1404 security token");
                                  res.redirect("tokenStudio");
                              } else {

                                    const sql = `insert into sharetypes (title, minimumSharesToBuyByInvestor, stoid, totalShares, companyShares, 
                                      nominalValue, premimum, isVotingRightsApplicable, isblockchain, currencyid, needauthorization, 
                                      reduceSharesForPurchase, investorCanPurchaseDirectly, blockchainProtocol, ethereumContractAddress, 
                                      ethereumWhitelistAddress, ethereumBlockchainPublicAddress, walletCustodayType, tanganyWalletID, 
                                      AssetName, AssetTag, votingPower, isMeetingRightsApplicable, isInvestorTradable, blockchainDecimals) 
                                      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                                    const data = [
                                      req.body.titleToken,
                                      0,
                                      req.body.stoid,
                                      parseInt(req.body.initialSupply, 10),
                                      parseInt(req.body.initialSupply, 10),
                                      parseFloat(req.body.nominalvalue),
                                      parseFloat(req.body.premiumvalue),
                                      1,  // votingRIghts,
                                      1,  // req.body.shareType,
                                      settings.DefaultSTOCurreny,  // req.body.currencyid,
                                      0,  // needapproval,
                                      0,  // req.body.reduceSharesForPurchase,
                                      1,   // investorCanPurchaseDirectly,
                                      req.body.blockchainProtocolType,  // req.body.blockchainprotocoltype,
                                      result.contractAddress,  // req.body.tokenaddress,
                                      result.contractAddress,  // req.body.whitelistaddress,
                                      result.from,  // req.body.ethereumPublicKey,
                                      0,  // req.body.walletCustodayType,
                                      "",  // req.body.tanganyWalletID,
                                      "",  // req.body.AssetName,
                                      "",  // req.body.AssetTag,
                                      1,  // votingPower
                                      0,  // meetingRights
                                      0,   // isInvestorTradable
                                      chkTokenDivisible
                                    ];


                                    mysql.executeSQLStatement(sql, data).then((res) => {
                                        logger.info("----------------------------------------------------");
                                        logger.info(`ERC1404 token deployment success for sto ${req.body.stoid}`);
                                        logger.info( JSON.stringify(result) );
                                        logger.info("----------------------------------------------------");
                                    }).catch((error) => {
                                        common.handleError(req, res, `${error.message} - Error occured in  sharesaddition`);
                                    });

                              }
                          },
                        );

                  });

                  req.flash("errorMessage", "Security Token is getting deployed. Please refresh this page in few minutes");
                  res.redirect(`shareslist?id=${  req.body.stoid}` );
          }
      ]);

  },


  ravencoinstudio(req, res) {
    const params = {};

    /*
        Fields

        PublicKey
        mainAssetTransactionID
        isMainAssetTransactionSend
        isMainAssetTransactionDone

        qualifierName
        qualifierNameTransactionID
        isQualifierNameTrnasactionSend
        isQualifierNameTrnasactionDone

        qualifierAssignTransactionID
        qualifierAssignTransactionIDSend
        qualifierAssignTransactionIDDone

        createRestrictedAssetTransactionID
        createRestrictedAssetTransactionIDSend
        isAssetDeployed
    */
    function func0(callback) {
        if(req.query.deleteCall != null) {
          if (req.query.deleteCall == "true") {
              mysql.executeSQLStatement("delete from RavenAssetDeployment where isAssetDeployed = 0", []).then((result) => {
                  callback(null);
              }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in ravencoinstudio` );
              });
          } else
            callback(null);
        } else
          callback(null);
    }
    function func1(callback) {
        const sql = `select defaultBlockchain, title from stos where id = ?`;
        mysql.executeSQLStatement(sql, [req.query.id])
        .then((result) => {
            params.stoBlockchainID = result[0].defaultBlockchain;
            params.stoTitle = result[0].title;
            callback(null);
        })
        .catch((error) => {
          common.handleError(req, res, `${error.message} Error occured in tokenStudio` );
        });
    }
    function func2(callback) {
      const sql = `select * from RavenAssetDeployment where isAssetDeployed = 0;`;
      mysql.executeSQLStatement(sql, []).then((result) => {
          if(result.length > 0) {
            params.record = result[0];
            params.recordFound = 1;
          } else {
            params.record = [];
            params.recordFound = 0;
          }

          callback(null);
      }).catch((error) => {
        common.handleError(req, res, `${error.message} Error occured in ravencoinstudio` );
      });
    }
    function func4(callback) {
      params.currentRVNBalance = 0;
      params.errorMessage = "";
      params.serverConnected = 0;
      if(global.config.Ravencoin_ServerURL != "" && global.config.Ravencoin_ServerURL != null) {

          blockchainApi.getRavenRVNBalance().then((data) => {
            params.serverConnected = 1;
              params.currentRVNBalance = data;
              callback(null);
          }).catch((error) => {
              params.serverConnected = 0;
              params.errorMessage = "Could not connect with Ravencoin wallet server";
              callback(null);
          });
      } else {
          params.serverConnected = 0;
          params.errorMessage = "Could not connect with Ravencoin wallet server";
          callback(null);
      }
    }
    async.waterfall(
      [func0, func1, func2, func4],
      (err) => {
        let linkToInvestorDashboardSet = 1;
        if(global.config.platformInvestorDashboardLink == "Update investor dashboard link" || global.config.platformInvestorDashboardLink == "")
          linkToInvestorDashboardSet = 0;

          //TODO:   problem still persist that if wallet is not connected then control reaches here but then crashes
          // need more investigations
          mysql.executeSQLStatement("select * from ravencoinPublicAddresses", []).then((results) => {

                res.render("platform/ravencoinstudio", {
                  selectedSTOID: req.query.id,
                  stoTitle: params.stoTitle,
                  ravencoinAddress: results,
                  linkToInvestorDashboardSet,
                  studioMessage: `${req.flash('studioMessage')  } ${  params.errorMessage}`,
                  ravenServerConnected: params.serverConnected,
                  currentRVNBalance: params.currentRVNBalance,
                  csrfToken: req.csrfToken(),
                  recordFound: params.recordFound,
                  record: params.record,
                  stos: params.stos,
                  partials: common.getPlatformPartials(),
              });

          }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in ravencoinstudio` );
          });

      }
    );

  },
  ravencoinstudiopost(req, res) {
      /*
          title  mainAsset  PublicKey   premimum   nominal   stoid  mainAssetTransactionID isMainAssetTransactionDone

          qualifierName  qualifierNameTransactionID   isQualifierNameTrnasactionDone

          qualifierAssignTransactionID   qualifierAssignTransactionIDDone

          createRestrictedAssetTransactionID    isAssetDeployed

          PublicKey
          mainAssetTransactionID
          isMainAssetTransactionSend
          isMainAssetTransactionDone

          qualifierName
          qualifierNameTransactionID
          isQualifierNameTrnasactionSend
          isQualifierNameTrnasactionDone

          qualifierAssignTransactionID
          qualifierAssignTransactionIDSend
          qualifierAssignTransactionIDDone

          createRestrictedAssetTransactionID
          createRestrictedAssetTransactionIDSend
          isAssetDeployed
      */
      const params = {};

      function checkAddressInWallet(callback) {
          logger.debug("ravencoinstudiopost - Wallet address checking");
          blockchainApi.listreceivedbyaddress().then((data) => {

                var isPublicKeyInWallet = 0;
                data.forEach(obj=> {
                    if (req.body.PublicKey == obj.address)
                    isPublicKeyInWallet = 1;
                })


                if(isPublicKeyInWallet == 0) {
                  req.flash('studioMessage', `${req.body.PublicKey} public address does not seems to be in current wallet`);
                  res.redirect("ravencoinstudio?id=" + req.body.stoid)
                } else
                  callback(null);

          }).catch((error) => {
            console.log(error.toString())
                req.flash('studioMessage', `Some error occurred accessing ravencoin wallet`);
                res.redirect("ravencoinstudio")
          });
      }
      function checkResource(callback) {

          logger.debug("ravencoinstudiopost - Check resource");
        // if(req.body.action == "1" && req.body.op == "0") {
            blockchainApi.getRavenResourceData(req.body.mainAsset.toUpperCase()).then((data) => {

                if(data == null) {
                  callback(null);
                } else {
                  req.flash('studioMessage', `${req.body.mainAsset.toUpperCase()} name for Main Asset already exist in Ravencoin blockchain. Please select another name`);
                  res.redirect("ravencoinstudio?id=" + req.body.stoid)
                }
                // callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in ravencoinstudio post` );
            });
        // }
        /*
        if(req.body.action == "2") {
          blockchainApi.getRavenResourceData("#" + req.body.qualifierAsset).then((data) => {
              if(data == null) {
                callback(null);
              } else {
                req.flash('studioMessage', `${req.body.mainAsset} name for Qualifier already exist in Ravencoin blockchain. Please select another name`);
                res.redirect("ravencoinstudio")
              }
            //callback(null);
          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in ravencoinstudio post` );
          });
        }
        if(req.body.action == "3" || req.body.action == "4")
          callback(null);
        */
      }
      async function setupIPFSIfNew(callback) {
          logger.debug("ravencoinstudiopost - Setup IPFS file");
          const platformInvestorDashboardLink = `${req.protocol}://${req.get('host')}/legalinformation?id=${req.body.stoid}`;
          try {

              const ipfs = create('https://ipfs.infura.io:5001/api/v0');
              const testFile = `This is the link to your share certificate: \n\n ${platformInvestorDashboardLink}  \n\n Raven Asset Name: ${req.body.mainAsset}`;
              const cid = await ipfs.add(testFile);

              param.ipfsDocumentHash = cid.path;

              const url = `https://api.pinata.cloud/pinning/pinByHash`;
              return axios
              .post(url, {
                    "hashToPin": cid.path,
                    pinataMetadata: {
                      name: req.body.titleToken + " / " + req.body.mainAsset
                    }
                  }, {
                  headers: {
                      pinata_api_key: "0b6af1c0c4938e364724",
                      pinata_secret_api_key: "53c1e27e943ded028af202b534b0697cd5f41da1d43150eeafc2e0bd93f0de4e"
                  }
              })
              .then(function (response) {
                  callback(null);
              })
              .catch(function (error) {
                  //handle error here
              });


          } catch (err) {
            common.handleError(req, res, `${err.message} Error occured in ravencoinstudio ` );
          }
      }
      function initDeployment(callback) {
          logger.debug("ravencoinstudiopost - init Deployment - save in DB");
          let unitDecimals = 0;
          if( req.body.unitDecimals != null )
            unitDecimals = 8;

          params.unitDecimals = unitDecimals;


          const sql = `insert into RavenAssetDeployment(stoid, premimum, nominal, title, mainAsset, PublicKey, isAssetDeployed, mainAssetTransactionID, isMainAssetTransactionDone,
            isMainAssetTransactionSend, isQualifierNameTrnasactionSend, isQualifierNameTrnasactionDone, qualifierAssignTransactionIDSend, qualifierAssignTransactionIDDone, 
            createRestrictedAssetTransactionIDSend, ipfsDocumentHash, unitDecimals, amount) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          mysql.executeSQLStatement(sql, [req.body.stoid, req.body.premimum, req.body.nominal, req.body.titleToken, req.body.mainAsset.toUpperCase(), req.body.PublicKey, 0, "", 0, 0, 0, 0, 0, 0, 0, param.ipfsDocumentHash, unitDecimals, req.body.tokenAmount]).then((result) => {
              params.recid = result.insertId;
              callback(null);
          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in ravencoinstudio` );
          });

      }
      function getRecord(callback) {
          logger.debug("ravencoinstudiopost - get deployment reocrd");
          const sql = `select * from RavenAssetDeployment where id = ?`;
          mysql.executeSQLStatement(sql, [params.recid]).then((result) => {
              params.record = result[0];
              callback(null);
          }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in ravencoinstudio` );
          });

      }
      function startDeloyment(callback) {
          logger.debug("ravencoinstudiopost - Start deployments");
          blockchainApi.ravencoinDeployment(params.record).then((data) => {
              callback(null);
          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in ravencoinstudio post 3 for record id ${req.body.recid}` );
          });
      }
      async.waterfall(
        [checkAddressInWallet,checkResource, setupIPFSIfNew, initDeployment, getRecord, startDeloyment],
        (err) => {
          res.redirect("ravencoinstudio?id=" + req.body.stoid)
      })

  },
  generateNewRavenAddress(req, res) {

    blockchainApi.getnewaddress().then((data) => {

        mysql.executeSQLStatement("insert into ravencoinPublicAddresses(publicKey) values (?)", [data]).then(() => {
          res.redirect("ravencoinstudio");
        }).catch((error) => {
          common.handleError(req, res, `${error.message} Error occured in ravencoinstudio` );
        });

    }).catch((error) => {

    });

  },
  addNewRavenAddress(req, res) {
      mysql.executeSQLStatement("insert into ravencoinPublicAddresses(publicKey) values (?)", [req.query.address]).then(() => {
        res.redirect("ravencoinstudio");
      }).catch((error) => {
        common.handleError(req, res, `${error.message} Error occured in addNewRavenAddress` );
      });
  },


  polymeshtokenstudio(req, res) {
    const params = {};

    function func1(callback) {
        const sql = `select defaultBlockchain, title from stos where id = ?; select * from polymeshAccounts;`;
        mysql.executeSQLStatement(sql, [req.query.id])
        .then((result) => {
            params.stoBlockchainID = result[0][0].defaultBlockchain;
            params.stoTitle = result[0][0].title;
            params.polymeshAccounts = result[1];
            callback(null);
        })
        .catch((error) => {
          common.handleError(req, res, `${error.message} Error occured in tokenStudio` );
        });
    }
    async.waterfall(
      [func1],
      (err) => {

          res.render("platform/tokenstudiopolymesh", {
              polymeshAccounts: params.polymeshAccounts,
              selectedSTOID: req.query.id,
              stoTitle: params.stoTitle,
              polymeshStudioMessage: req.flash('polymeshStudioMessage'),
              csrfToken: req.csrfToken(),
              partials: common.getPlatformPartials(),
          });

      }
    );

  },
  polymeshcoinstudiopost(req, res) {
    //  TODO
    //     //let temp3: boolean = await api.assets.isTickerAvailable({"ticker": "DIGISHARE2"}) ;
    var decimals1 = 0;
    if( req.body.unitDecimals != null && req.body.unitDecimals != undefined )
       decimals1 = 1;

    mnemonic = "";
    
    const stmt = "select mnemonic from polymeshAccounts where id = ?";
    mysql.executeSQLStatement(stmt, [req.body.polymeshAccountsID]).then((result) => {
        common.decryptAsync(result[0].mnemonic).then((mnemonic)=> {

            blockchainApi.deployPolymeshToken(req.body.mainAsset, req.body.tokenAmount, req.body.titleToken, req.body.stoid, req.body.nominal, req.body.premimum, decimals1, mnemonic, req.body.polymeshAccountsID, req.body.assetTypeSelect).then(() => {
              req.flash("errorMessage", "Security Token is getting deployed. Please refresh this page in few minutes");
              res.redirect(`shareslist?id=${  req.body.stoid}` );
            }).catch((err4) => {
              logger.error(`Polymesh contract deployment transaction error - ${err4.message}`);
              req.flash("errorMessage", `There is some error deploying ERC1404 security token - ${err4.message}`);
              res.redirect(`shareslist?id=${  req.body.stoid}` );
            });

        })
    }).catch((error) => {
      logger.error(`${error.message} DB error occured in getTotalSupplyOfToken`);
    });

  },
  polymeshConfigurations(req, res) {
    const params = {};

    async.waterfall([
        function fun1(callback) {
          if(req.query.op == "1") {
              blockchainApi.setupPolymeshPortfoliosInformation(req.query.id).then(()=> {
                  callback(null);
              }).catch((err4) => {
                logger.error(`Polymesh contract deployment transaction error - ${err4.message}`);
                req.flash("errorMessage", `There is some error deploying ERC1404 security token - ${err4.message}`);
                res.redirect(`shareslist?id=${ req.query.id }` );
              });
          } else 
              callback(null);
        },
        function fun2(callback) {
            const sql = `select id, stoid, title, AssetTag, polyMeshDistributionVenueID, polymeshAccountID from sharetypes where id = ?; 
                          select * from polymeshAttestationProviders where sharetypeid = ?;
                          select * from polymeshTokenRestrictionsSettings where sharetypeid = ?`;
            mysql.executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id])
            .then((result) => {
                params.record = result[0][0];
                params.atesters = result[1];
                if(result[2].length > 0) {
                    params.isTokenRestrictionsSet = 1;
                    params.tokenRestriction = result[2][0];
                } else {
                  params.isTokenRestrictionsSet = 0;
                  params.tokenRestriction = [];
                }
                callback(null);
            })
            .catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in polymeshConfigurations` );
            });
        },
        function fun3(callback) {

            const sql = `select p.ID, b.balance from polymeshPortfolios p, polymeshPortfoliosBalances b where p.id = b.polymeshPortfoliosID
            and p.polymeshAccoundID = ? and b.ticker = ?; select *, 0 as balance from polymeshPortfolios where polymeshAccoundID = ?;`;
            mysql.executeSQLStatement(sql, [params.record.polymeshAccountID, params.record.AssetTag, params.record.polymeshAccountID])
            .then((result) => {
                params.defaultPortfolioBalance = 0;
                var tmpBalance = 0;
                const balances = [];
                result[1].forEach((obj)=> {
                    tmpBalance = 0;
                    result[0].forEach((objTmp)=>{
                        if(objTmp.ID == obj.ID) {
                          tmpBalance = objTmp.balance;
                        }
                        
                    })

                    if(obj.title == "Default")
                      params.defaultPortfolioBalance = tmpBalance;

                    balances.push({
                        id: obj.ID,
                        polymeshAccoundID: obj.polymeshAccoundID,
                        polymeshBlockchainID: obj.polymeshBlockchainID,
                        title: obj.title,
                        balance: tmpBalance
                    })
                })

                params.portfolioBalances = balances;                
                callback(null);
            })
            .catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in polymeshConfigurations` );
            });          

        },
        function fun4(callback) {
            res.render("platform/sto/polymeshConfiguration", {
              recordID: req.query.id,
              defaultPortfolioBalance: params.defaultPortfolioBalance,
              polymeshMessage: req.flash("polymeshMessage"),
              isTokenRestrictionsSet: params.isTokenRestrictionsSet,
              tokenRestriction: params.tokenRestriction,
              record: params.record,
              portfolioBalances: params.portfolioBalances,
              atesters: params.atesters,
              csrfToken: req.csrfToken(),
              partials: common.getPlatformPartials()
            });
        }
    ]);

  },
  addpolymeshatestation(req, res) {

    mysql.executeSQLStatement("select * from polymeshAttestationProviders where did = ? and sharetypeid = ?", [req.body.did, req.body.id]).then((result) => {

      if(result.length == 0) {
          blockchainApi.setupPolymeshAtestationProvider(req.body).then(()=> {
            req.flash("polymeshMessage", "Transaction is send to blockchain. Please refresh after 1 minute");
            res.redirect("polymeshConfigurations?id=" + req.body.id)
          });
      } else {
          req.flash("polymeshMessage", "DID provided is already is attestation  provider's list. Please check the list");
          res.redirect("polymeshConfigurations?id=" + req.body.id)
      }

    }).catch((error) => {
      common.handleError(req, res, `${error.message} Error occured in addNewRavenAddress` );
    });

  },
  deleteAtestationRecord(req, res) {
    blockchainApi.deleteAtestationProvider(req.query.id).then(()=> {
      res.redirect("polymeshConfigurations?id=" + req.query.sid);
    })
  },
  updatePolymeshRestrictions(req, res) {
    blockchainApi.setupPolymeshTokenRestrictions(req.body).then(()=> {
        req.flash("polymeshMessage", "Transaction is send to blockchain. Please refresh after 1 minute");
        res.redirect("polymeshConfigurations?id=" + req.body.id);
    })
  },
  polymeshAccounts(req, res) {
    const params = {};

    function func1(callback) {
        const sql = `select * from polymeshAccounts`;
        mysql.executeSQLStatement(sql, [])
        .then((results) => {
            params.accounts = results;
            callback(null);
        })
        .catch((error) => {
          common.handleError(req, res, `${error.message} Error occured in polymeshAccounts` );
        });
    }
    function func2(callback) {
        if(req.query.id !== undefined ) {
            const sql = `select * from polymeshPortfolios where polymeshAccoundID = ?; 
                         select title from polymeshAccounts where id = ?`;
            mysql.executeSQLStatement(sql, [req.query.id, req.query.id])
            .then((results) => {
                params.portfolios = results[0];
                params.currentAccountTitle = results[1][0].title;
                params.currentAccountID = req.query.id;
                callback(null);
            })
            .catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in polymeshAccounts` );
            });
        } else {
            params.currentAccountID = 0;  
            params.currentAccountTitle = "";         
            params.portfolios = [];
            callback(null);
        }
    }
    async.waterfall(
      [func1, func2],
      (err) => {
        
        res.render("platform/polymeshAccounts", {
          currentAccountTitle: params.currentAccountTitle,
          accounts: params.accounts,
          currentAccountID: params.currentAccountID,
          portfolios: params.portfolios,
          polymeshStudioMessage: req.flash('polymeshAccountsMessage'),
          csrfToken: req.csrfToken(),
          partials: common.getPlatformPartials(),
        });

      }
    );

  },
  saveNewPolymeshAccount(req, res){

      common.encryptAsync(req.body.accountMnemonics).then((data)=> {

              const sql = `insert into polymeshAccounts(title, mnemonic) values(?, ?)`;
              mysql.executeSQLStatement(sql, [req.body.newAccountName, data]).then((result) => {

              const sql2 = "insert into polymeshPortfolios(polymeshAccoundID, polymeshBlockchainID, title) values(?, 0, 'Default')"
              mysql.executeSQLStatement(sql2, [result.insertId]).then(() => {
                    res.redirect("polymeshAccounts")
              })
              .catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in saveNewPolymeshAccount` );
              });

        }).catch((error) => {
          common.handleError(req, res, `${error.message} Error occured in saveNewPolymeshAccount` );
        });

    })


  },
  saveNewPolymeshPortfolio(req, res) {
      blockchainApi.createPolymeshPortfolioAPI(req.body.accountID, req.body.newPortfolioTitile).then(() => {
          res.redirect("polymeshAccounts");
      })      
  },
  transferPolymeshFundsBetweenPortfolios(req, res) {

    const sql = `select polymeshBlockchainID, polymeshAccoundID from polymeshPortfolios where id = ?`;
    mysql.executeSQLStatement(sql, [req.body.polymeshPortfolioIDToSend]).then((result) => {
        blockchainApi.transferTokenToPolymeshPortfolioAPI(result[0].polymeshBlockchainID, req.body.polymeshAssetTag, req.body.polymestAmountToSend, result[0].polymeshAccoundID).then(() => {
          res.redirect("polymeshConfigurations?id=" + req.body.recordID);    
        })
    })
    .catch((error) => {
      common.handleError(req, res, `${error.message} Error occured in transferPolymeshFundsBetweenPortfolios` );
    });

  },



  privateKeys(req, res) {
    res.render("platform/privateKey", {
      csrfToken: req.csrfToken(),
      partials: common.getPlatformPartials(),
    });
  },
  privateKeysPost(req, res) {
    const Web3 = require('web3');

    const web3 = new Web3(new Web3.providers.HttpProvider(global.config.web3Address));
    const data =  web3.eth.accounts.encrypt(req.body.privateKey, req.body.password);
    res.attachment(`PrivateKeyStore-${  data.address  }.txt`);
    res.type('json');
    res.send(data);
  },

  // RedSwan Related
  redswaninfo(req, res) {
    const params = {};

    function unlinkProperty(callback) {
      if (req.query.unlink != null) {
        const sql = "update stos set externalSystemID = 0 where id = ?";
        mysql
          .executeSQLStatement(sql, [req.query.id])
          .then((result) => {
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured `
            );
          });
      } else {
        callback(null);
      }
    }
    function getAPIData(callback) {
      common
        .getRedSwanAccessToken(req)
        .then((data) => {
          request.get(
            {
              url: `${global.config.ExternalAPILink  }/properties`,
              headers: {
                "content-type": "application/json",
                "x-integrator-token": data.idToken,
              },
            },
            (err, httpResponse, body) => {
              if (!err) {
                common
                  .setRedisKey(req, "RedSwanAPIPropertiesList", body)
                  .then(() => {
                    if (body.trim() != "" || body != null) {
                      try {
                        params.apidata = JSON.parse(body);
                        callback(null);
                      } catch (err) {
                        logger.error(
                          `Error in RedSwan redswaninfo.  Bad JSON ${body}`
                        );
                        params.apidata = [];
                        callback(null);
                      }
                    } else {
                      params.apidata = [];
                      callback(null);
                    }
                  });
              } else
                logger.error(
                  `Error in RedSwan redswaninfo  trying to call API - ${error.message}`
                );
            }
          );
        })
        .catch((error) => {
          logger.error(`Error in RedSwan Access Login - ${error.message}`);
          // reject(error);
        });
    }
    function getstodatainfo(callback) {
      const sql = "select id, title from stos where id != 0";
      mysql
        .executeSQLStatement(sql, [])
        .then((result) => {
          params.records = result;

          callback(null);
        })
        .catch((error) => {
          common.handleError(req, res, `${error.toString()} - Error occured `);
        });
    }
    function getCurrentProperyID(callback) {
      if (req.query.id == null) params.id = params.records[0].id;
      else params.id = req.query.id;

      callback(null);
    }
    function getinvestorrec(callback) {
      const sql = `select externalSystemID from stos where id =${  params.id}`;
      mysql
        .executeSQLStatement(sql, [])
        .then((result) => {
          params.linkid = result[0].externalSystemID;
          callback(null);
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} Error occured in settings getinvestordata`
          );
        });
    }
    async.waterfall(
      [
        unlinkProperty,
        getAPIData,
        getstodatainfo,
        getCurrentProperyID,
        getinvestorrec,
      ],
      (err) => {
        if (!err) {
          res.render("platform/redswan/redswaninfo", {
            id: params.id,
            linkid: params.linkid,
            apidata: params.apidata,
            Records: params.records,
            partials: common.getPlatformPartials(),
            Data: common.getPlatformCommonPageProperties(req),
            message: req.flash("linkmessage"),
          });
        }
      }
    );
  },
  setExternalCompanyLink(req, res) {
    const params = {};
    function getDatabaseInformation(callback) {
      const sql = "select id from stos where externalSystemID = ?";
      mysql
        .executeSQLStatement(sql, [req.query.linkid])
        .then((result) => {
          if (result.length > 0) params.found = 1;
          else params.found = 0;

          callback(null);
        })
        .catch((error) => {
          common.handleError(req, res, `${error.toString()} - Error occured `);
        });
    }
    function saveDBInfo(callback) {
      if (params.found == 0) {
        const sql = "update stos set externalSystemID = ? where id = ?";
        mysql
          .executeSQLStatement(sql, [req.query.linkid, req.query.id])
          .then(() => {
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.toString()} - Error occured `
            );
          });
      } else {
        req.flash(
          "linkmessage",
          `Another project is found that is linked with RedSwan Project ID  ${
            req.query.linkid}`
        );
        callback(null);
      }
    }
    async.waterfall([getDatabaseInformation, saveDBInfo], (err) => {
      res.redirect(`redswaninfo?id=${  req.query.id}`);
    });
  },

  // Genius Related
  updateGeniusStatistics(req, res) {
    console.log("Statistics going to update");

    geniusAffiliateUpdatesService
      .refreshGeniusAffiliateData(
        req.query.affiliateInvestmentFromDate,
        req.query.affiliateInvestmentToDate
      )
      .then(() => {
        res.redirect("dashboard");
      })
      .catch((error) => {
        console.log(error.toString());
        res.redirect("dashboard");
      });
  },

  test(req, res) {

  },
  updateBlockchainDataOnBackground(req, res) {
    refreshBlockchain.refreshTokensFromBlockahin(req.query.id);

    return res.redirect("dashboard");
  },
  setMassEmailingServer(req, res) {
    if (req.query.op == "1") {
      global.config.forkedBulkEmail.send({ op: 2, data: 1 });
    } else {
      global.config.forkedBulkEmail.send({ op: 2, data: 0 });
    }
  },
  garbageCollector(req, res) {
    // node --expose-gc server.js
    try {
      global.gc();
    } catch (e) {
      process.exit();
    }
    res.send("Done GC");
  },
  setRavenCoinInfo(req, res) {
    const sql = `UPDATE params SET stringValue = ? WHERE param = "Ravencoin_ServerURL";
                 UPDATE params SET stringValue = ? WHERE param = "Ravencoin_Username";
                 UPDATE params SET stringValue = ? WHERE param = "Ravencoin_Password";`
    mysql.executeSQLStatement(sql, [req.body.ravenUrl, req.body.ravenUsername, req.body.ravenPassword])
      .then((result) => {
        res.status(200).send("OK")
      })
      .catch(error => res.send(400).send(error))
  },
  setIndividualParam(req, res) {
    const sql = `UPDATE params SET ${req.body.typeName} = ? WHERE param = ?`
    mysql.executeSQLStatement(sql, [req.body.value, req.body.param])
      .then((result) => {
        mysql.initializeGlobals()
        res.status(200).send("OK")
      })
      .catch(error => {
        res.status(400).send(error)
      })
  },
  getStoDetails(req, res) {
    const id = req.query.stoid
    const sql = `SELECT title, settings FROM stos WHERE ID = ?; SELECT * FROM currency`
    mysql.executeSQLStatement(sql, id)
    .then(response => {
      res.render('platform/stodetails', {
          message: req.flash("messageEmail"),
          ID: id,
          Datarows: response[0][0],
          Currency: getFilteredCurrency(response[1]),
          csrfToken: req.csrfToken()
      })
    })
  },
  sendTestEmail(req, res) {

      common.sendEmailByStoId(req.query.id, req.query.email, "Test Email", "This is the test email from Admim to test SMTP server" , []).then(data=> {
          req.flash("messageEmail", "Email is send successfully")
          res.redirect(`stoparam?stoid=${  req.query.id}`);
      }).catch(error => {
        req.flash("messageEmail", `Email is NOT send. An error occurred while sending email.${  error.message}`)
        res.redirect(`stoparam?stoid=${  req.query.id}`);
      })

  },
  updatestoconfig(req, res) {
    const parsed =  req.body.field
    const query = `UPDATE stos SET settings = \'${JSON.stringify(parsed)}\' WHERE ID = ?`
    mysql.executeSQLStatement(query, req.query.stoid)
    .then(data => {
      res.status(200).send("OK")
    })
    .catch(error => res.status(400).send(error))
  },
  setCognitoService(req, res) {
    const sql = `UPDATE params SET stringValue = ? WHERE param = 'CognitoUserPoolId';UPDATE params SET stringValue = ? WHERE param = 'CognitoClientId';UPDATE params SET stringValue = ? WHERE param = 'CognitoPool_region';`
    mysql.executeSQLStatement(sql, [req.body.CognitoUserPoolId, req.body.CognitoClientId, req.body.CognitoPool_region])
    .then(data => {
      res.status(200).send("OK")
    })
    .catch(error => {
      res.status(400).send(JSON.stringify(error))
    })
  },
  updateTokenStudio(req, res){
    const tokenList = JSON.stringify(req.body)
    const sql = `UPDATE params SET stringValue = ? where param = 'selectedTokenStudio'`
    mysql.executeSQLStatement(sql, [tokenList])
      .then(data => {
        res.status(200).send("OK")
      })
      .catch(error => {
        res.status(400).send(JSON.stringify(error))
      })
  },
  setExternalApi(req, res) {
    const sql = `UPDATE params SET stringValue = ? WHERE param = 'ExternalAPILink';UPDATE params SET stringValue = ? WHERE param = 'ExternalAPILinkUser';UPDATE params SET stringValue = ? WHERE param = 'ExternalAPILinkPassword';`
    mysql.executeSQLStatement(sql, [req.body.ExternalAPILink, req.body.ExternalAPILinkUser, req.body.ExternalAPILinkPassword])
      .then(data => {
        res.status(200).send("OK")
      })
      .catch(error => {
        res.status(400).send(JSON.stringify(error))
      })
  },
  setSSOParams(req, res) {
    const sql = `UPDATE params SET stringValue = ? WHERE param = 'SSORedirectFrontEnd';UPDATE params SET intValue = ? WHERE param = 'SSOModeEnabled';`
    mysql.executeSQLStatement(sql, [req.body.SSORedirectFrontEnd, req.body.SSOModeEnabled])
      .then(data => {
        res.status(200).send("OK")
      })
      .catch(error => {
        res.status(400).send(JSON.stringify(error))
      })

  },
};

router.get('/dashboard', common.isPlatformAdminUserAuthenticated, admin.dashboard);
router.get('/sto', common.isPlatformAdminUserAuthenticated, admin.sto);
router.get('/newsto', common.isPlatformAdminUserAuthenticated, admin.newsto);
router.post('/stoaddition', common.isPlatformAdminUserAuthenticated, admin.stoaddition);
router.get('/shareslist', common.isPlatformAdminUserAuthenticated, admin.shareslist);
router.get('/roleslist', common.isPlatformAdminUserAuthenticated, admin.roleslist);
router.get('/newrole', common.isPlatformAdminUserAuthenticated, admin.newrole);
router.get('/deleteAllUsers', common.isPlatformAdminUserAuthenticated, admin.deleteAllUsers);
router.post('/rolesaddition', common.isPlatformAdminUserAuthenticated, admin.rolesaddition);
router.get('/newshare', common.isPlatformAdminUserAuthenticated, admin.newshare);
router.get('/restrictSharesToPurchase', common.isPlatformAdminUserAuthenticated, admin.restrictSharesToPurchase);
router.get('/viewshare', common.isPlatformAdminUserAuthenticated, admin.viewshare);
router.get('/viewlinkeddocuments', common.isPlatformAdminUserAuthenticated, admin.viewLinkedDocuments);
router.get('/deletedocumentrelatedtoshareclass', common.isPlatformAdminUserAuthenticated, admin.deleteDocumentRelatedtoShareClass);
router.post('/sharesaddition', common.isPlatformAdminUserAuthenticated, admin.sharesaddition);
router.get('/activtepropertystatu', common.isPlatformAdminUserAuthenticated, admin.activtepropertystatu);
router.get('/activtepropertystatusBuy', common.isPlatformAdminUserAuthenticated, admin.activtepropertystatusBuy);
router.get('/enableDisableShareType', common.isPlatformAdminUserAuthenticated, admin.enableDisableShareType);

router.get('/resetsharetypes', common.isPlatformAdminUserAuthenticated, admin.resetsharetypes);
router.get('/resetsharetypespost', common.isPlatformAdminUserAuthenticated, admin.resetsharetypespost);
router.get('/resetInvestorShareType', common.isPlatformAdminUserAuthenticated, admin.resetInvestorShareType);
router.get('/resetInvestorShareTypePost', common.isPlatformAdminUserAuthenticated, admin.resetInvestorShareTypePost);

router.get('/platformsettings', common.isPlatformAdminUserAuthenticated, admin.platformsettings);
router.get('/entityTypeView',common.isPlatformAdminUserAuthenticated, entityTypeView);
router.get('/settings', common.isPlatformAdminUserAuthenticated, admin.settings);
router.post('/updateDisclaimer', common.isPlatformAdminUserAuthenticated, admin.updateDisclaimer);
router.post('/updateEmailFooter', common.isPlatformAdminUserAuthenticated, admin.updateEmailFooter);
router.post('/updateRegistrationText', common.isPlatformAdminUserAuthenticated, admin.updateRegistrationText);
router.post('/updatesmtpinfosto', common.isPlatformAdminUserAuthenticated, admin.updatesmtpinfosto);
router.post('/changelogosite', common.isPlatformAdminUserAuthenticated, admin.changelogosite);
router.post('/changebannersite', common.isPlatformAdminUserAuthenticated, admin.changebannersite);
router.post('/changeregistrationsuccesstext', common.isPlatformAdminUserAuthenticated, admin.changeregistrationsuccesstext);
router.post('/changetellafriend', common.isPlatformAdminUserAuthenticated, admin.changetellafriend);
router.post('/changeemailinvestorbulkupload', common.isPlatformAdminUserAuthenticated, admin.changeEmailInvestorBulkUpload);
router.get('/changeExchangeOpenDate', common.isPlatformAdminUserAuthenticated, admin.changeExchangeOpenDate);
router.get('/changeIsInternalExchangeEnabled', common.isPlatformAdminUserAuthenticated, admin.changeIsInternalExchangeEnabled);
// STO specific routes
router.get('/stoparam', common.isPlatformAdminUserAuthenticated, admin.getStoDetails);
router.post('/stoparam', common.isPlatformAdminUserAuthenticated, admin.updatestoconfig);

router.post('/changePassword', common.isPlatformAdminUserAuthenticated, admin.changePassword);
router.post('/changeRavencoinPassword', common.isPlatformAdminUserAuthenticated, admin.changeRavencoinPassword);
router.post('/setCognitoService', common.isPlatformAdminUserAuthenticated, admin.setCognitoService);
router.post('/setExternalApi', common.isPlatformAdminUserAuthenticated, admin.setExternalApi);
router.post('/setSSOParams', common.isPlatformAdminUserAuthenticated, admin.setSSOParams);
router.post('/postEntityType',common.isPlatformAdminUserAuthenticated, postEntityType);

router.get('/systemuserslist', common.isPlatformAdminUserAuthenticated, admin.systemuserslist);// system user list
router.get('/systemuserView', common.isPlatformAdminUserAuthenticated, admin.systemuserView);// system user view
router.get('/systemUserAddEdit', common.isPlatformAdminUserAuthenticated, admin.systemUserAddEdit);// system user view
router.get('/systemUserActivateDeactivate', common.isPlatformAdminUserAuthenticated, admin.systemUserActivateDeactivate);// system user act/deact
router.post('/systemUserAddEditPost', common.isPlatformAdminUserAuthenticated, admin.systemUserAddEditPost);
router.get('/deleteSTORight', common.isPlatformAdminUserAuthenticated, admin.deleteSTORight);
router.get('/setNewSTORightForUser', common.isPlatformAdminUserAuthenticated, admin.setNewSTORightForUser);
router.get('/activateSystemUserForPlaformLogin', common.isPlatformAdminUserAuthenticated, admin.activateSystemUserForPlaformLogin);


router.get('/doclinks', common.isPlatformAdminUserAuthenticated, admin.doclinks);
router.get('/createNewLink', common.isPlatformAdminUserAuthenticated, admin.createNewLink);
router.get('/doclinksdocuments', common.isPlatformAdminUserAuthenticated, admin.doclinksdocuments);
router.get('/doclinksenabledisable', common.isPlatformAdminUserAuthenticated, admin.doclinksenabledisable);
router.get('/downloadlinkdocument', common.isPlatformAdminUserAuthenticated, admin.downloadlinkdocument);
router.get('/deletelinkdocument', common.isPlatformAdminUserAuthenticated, admin.deletelinkdocument);
router.get('/deleteplatformlinkdoc', common.isPlatformAdminUserAuthenticated, admin.deleteplatformlinkdoc);
router.get('/changetimezone', common.isPlatformAdminUserAuthenticated, admin.changetimezone);
router.get('/deleteRegisterRecord', common.isPlatformAdminUserAuthenticated, admin.deleteRegisterRecord);
router.get('/link', admin.link);
router.post('/linkupload', admin.linkupload);

router.get('/bulkuploads', common.isPlatformAdminUserAuthenticated, admin.bulkuploads);
router.post('/bulkuploadspost', common.isPlatformAdminUserAuthenticated, admin.bulkuploadspost);
router.get('/bulkdownloads', common.isPlatformAdminUserAuthenticated, admin.bulkDownloads);
router.post('/bulkdownloadspost', common.isPlatformAdminUserAuthenticated, admin.bulkDownloadsPost);
router.post('/processUploadInvestors', common.isPlatformAdminUserAuthenticated, admin.processUploadInvestors);

router.post('/setAutomaticTransferShares', common.isPlatformAdminUserAuthenticated, admin.setAutomaticTransferShares);

router.post('/uploadFiles', admin.uploadFiles);
router.post('/setstopropertyfile', common.isPlatformAdminUserAuthenticated, admin.setstopropertyfile);
router.get('/uploadSTORelatedFiles', common.isPlatformAdminUserAuthenticated, admin.uploadSTORelatedFiles);
router.post('/uploadSTORelatedFilesPost', common.isPlatformAdminUserAuthenticated, admin.uploadSTORelatedFilesPost);
router.get('/deletepropertyrelatedfile', common.isPlatformAdminUserAuthenticated, admin.deletepropertyrelatedfile);
router.post('/linkDocumentToShareType', common.isPlatformAdminUserAuthenticated, admin.linkDocumentToShareType);

router.get('/updateBlockchainDataOnBackground', common.isPlatformAdminUserAuthenticated, admin.updateBlockchainDataOnBackground);
router.get('/getLogFileData', common.isPlatformAdminUserAuthenticated, admin.getLogFileData);
router.get('/getTodayLogFileData', common.isPlatformAdminUserAuthenticated, admin.getTodayLogFileData);
router.get('/checkMemoryUsage', common.isPlatformAdminUserAuthenticated, admin.checkMemoryUsage);
router.get('/updateGloablVariables', common.isPlatformAdminUserAuthenticated, admin.updateGloablVariables);
router.get('/setMassEmailingServer', common.isPlatformAdminUserAuthenticated, admin.setMassEmailingServer);
router.get('/gc', common.isPlatformAdminUserAuthenticated, admin.garbageCollector);

router.get('/brokerlinks', common.isPlatformAdminUserAuthenticated, admin.brokerlinks);
router.get('/brokeradd', common.isPlatformAdminUserAuthenticated, admin.brokeradd);
router.get('/brokerview', common.isPlatformAdminUserAuthenticated, admin.brokerview);
router.post('/brokeraddpost', common.isPlatformAdminUserAuthenticated, admin.brokeraddpost);
router.get('/brokerenabledisable', common.isPlatformAdminUserAuthenticated, admin.brokerenabledisable);
router.get('/addSTOtoBroker', common.isPlatformAdminUserAuthenticated, admin.addSTOtoBroker);
router.get('/removeSTOfromBroker', common.isPlatformAdminUserAuthenticated, admin.removeSTOfromBroker);

router.get('/sendTestEmail', common.isPlatformAdminUserAuthenticated, admin.sendTestEmail);


// Token Studio
router.get('/tokenStudio', common.isPlatformAdminUserAuthenticated, admin.tokenStudio);
router.post('/tokenStudioPost', common.isPlatformAdminUserAuthenticated, admin.tokenStudioPost);
router.post('/updateTokenStudio', common.isPlatformAdminUserAuthenticated, admin.updateTokenStudio)

router.get('/ravencoinstudio', common.isPlatformAdminUserAuthenticated, admin.ravencoinstudio);
router.post('/ravencoinstudiopost', common.isPlatformAdminUserAuthenticated, admin.ravencoinstudiopost);
router.get('/generateNewRavenAddress', common.isPlatformAdminUserAuthenticated, admin.generateNewRavenAddress);
router.get('/addNewRavenAddress', common.isPlatformAdminUserAuthenticated, admin.addNewRavenAddress);

router.get('/polymeshtokenstudio', common.isPlatformAdminUserAuthenticated, admin.polymeshtokenstudio);
router.post('/polymeshcoinstudiopost', common.isPlatformAdminUserAuthenticated, admin.polymeshcoinstudiopost);
router.get('/polymeshConfigurations', common.isPlatformAdminUserAuthenticated, admin.polymeshConfigurations);
router.post('/addpolymeshatestation', common.isPlatformAdminUserAuthenticated, admin.addpolymeshatestation);
router.get('/deleteAtestationRecord', common.isPlatformAdminUserAuthenticated, admin.deleteAtestationRecord);
router.post('/updatePolymeshRestrictions', common.isPlatformAdminUserAuthenticated, admin.updatePolymeshRestrictions);
router.get('/polymeshAccounts', common.isPlatformAdminUserAuthenticated, admin.polymeshAccounts);
router.post('/saveNewPolymeshAccount', common.isPlatformAdminUserAuthenticated, admin.saveNewPolymeshAccount);
router.post('/saveNewPolymeshPortfolio', common.isPlatformAdminUserAuthenticated, admin.saveNewPolymeshPortfolio);
router.post('/transferPolymeshFundsBetweenPortfolios', common.isPlatformAdminUserAuthenticated, admin.transferPolymeshFundsBetweenPortfolios);


router.post('/setRavenCoinInfo', common.isPlatformAdminUserAuthenticated, admin.setRavenCoinInfo);
router.post('/setIndividualParam', common.isPlatformAdminUserAuthenticated, admin.setIndividualParam)

router.get('/privateKeys', common.isPlatformAdminUserAuthenticated, admin.privateKeys);
router.post('/privateKeysPost', common.isPlatformAdminUserAuthenticated, admin.privateKeysPost);

router.get('/redswaninfo', common.isPlatformAdminUserAuthenticated, admin.redswaninfo);
router.get('/setExternalCompanyLink', common.isPlatformAdminUserAuthenticated, admin.setExternalCompanyLink);

router.get('/incompletedelete', common.isPlatformAdminUserAuthenticated, admin.incompletedelete);

router.get('/updateGeniusStatistics', common.isPlatformAdminUserAuthenticated, admin.updateGeniusStatistics);

router.get('/test', admin.test);

module.exports = router;
