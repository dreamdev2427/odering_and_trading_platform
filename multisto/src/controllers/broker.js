"use strict";

const express = require("express");
const router = express.Router();
const async = require("async");
const common = require("../modules/common");
const mysql = require("../modules/mysql");
const logger = require("../logger");
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
const math = require('mathjs');

import getCommissions from "./broker/commissionsCtl/getCommissions";
import getInvitedInvestors from "./broker/investorsCtl/getInvitedInvestors";

const broker = {
  dashboard(req, res) {
    req.session.stoid = -1; //reset selected sto
    const params = {};

    async.waterfall([
      function loadData(callback) {
        const sql = `
          select id, title, logo, details, propertypicture from stos where id in (select stoid from brokerrights where brokerid = ?);
          SELECT brokerID FROM brokers WHERE ID = ?;
          SELECT COUNT(*) AS count FROM investor_brokers WHERE brokerID = (SELECT brokerID FROM brokers WHERE ID = ?);
        `;
        mysql
          .executeSQLStatement(sql, [
            req.session.user.ID,
            req.session.user.ID,
            req.session.user.ID,
          ])
          .then((result) => {
            params.sto = result[0];
            params.brokerID = result[1][0].brokerID;
            params.invitedInvestorsCount = result[2][0].count;
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  dashboard getbrokerInformation`
            );
          });
      },
      function renderForm() {
        let showNewAddressRequestSection = 0;

        const json = {
          brokerID: params.brokerID,
          invitedInvestorsCount: params.invitedInvestorsCount,
          frontendURL: process.env.FRONTEND_URL,
          csrfToken: req.csrfToken(),
          sto: params.sto,
          platformdashboardmessage: req.flash("brokerdashboardmessage"),
          partials: common.getBrokerWizardPartials(),
          Data: common.getBrokerWizardPageProperties(req),
        };
        res.render("broker/dashboard", json);
      },
    ]);
  },
  generateBrokerID(req, res) {
    mysql
      .generateBrokerID(req, uuidv4())
      .then((result) => {
        res.redirect("dashboard");
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.toString()} - Error occurred in broker generateBrokerID`
        );
      });
  },
  sto(req, res) {
    req.session.stoid = -1; //reset selected sto
    const params = {};

    async.waterfall([
      function loadData(callback) {
        const sql = `select * from stos where id = ?`;
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
              `${error.message} - Error occured in  broker sto`
            );
          });
      },
      function loadSharesData(callback) {
        const sql = `select * from sharetypes where stoid = ?`;
        mysql
          .executeSQLStatement(sql, [req.query.id])
          .then((result) => {
            params.shares = result;
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  broker sto`
            );
          });
      },
      function loadinvestordata(callback) {
        const sql = `select count(*) as count from investor i,investorsto s where i.id=s.investorid and s.stoid = ? \
                    ;\
                    Select sum(totalShares) as TotalShares, sum(companyShares) as TotalCompanyShares from sharetypes where stoid = ?`;
        mysql
          .executeSQLStatement(sql, [req.query.id, req.query.id])
          .then((result) => {
            params.countInvestors = result[0][0].count;

            if (result[1][0].TotalShares == null) params.TotalShares = 0;
            else params.TotalShares = result[1][0].TotalShares;

            if (result[1][0].TotalCompanyShares == null)
              params.TotalCompanyShares = 0;
            else params.TotalCompanyShares = result[1][0].TotalCompanyShares;

            params.TotalInvestorShares = math.substract(params.TotalShares, params.TotalCompanyShares);

            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  broker sto`
            );
          });
      },
      function renderForm() {
        const json = {
          countInvestors: params.countInvestors,
          record: params.record,
          shares: params.shares,
          partials: common.getBrokerWizardPartials(),
          Data: common.getBrokerWizardPageProperties(req),
          TotalShares: params.TotalShares,
          TotalCompanyShares: params.TotalCompanyShares,
          TotalInvestorShares: params.TotalInvestorShares,
        };
        res.render("broker/sto", json);
      },
    ]);
  },
  exchange(req, res) {
    async.waterfall([
      function loadData(callback) {
        const sql = `select 1`;
        mysql
          .executeSQLStatement(sql, [])
          .then((result) => {
            callback(null);
          })
          .catch((error) => {
            common.handleError(
              req,
              res,
              `${error.message} - Error occured in  dashboard getbrokerInformation`
            );
          });
      },
      function renderForm() {
        const json = {
          partials: common.getBrokerWizardPartials(),
          Data: common.getBrokerWizardPageProperties(req),
        };
        res.render("broker/exchange", json);
      },
    ]);
  },
  investors(req, res) {
    const params = {};

    var storec = common.getGloablSTORecordWithID(parseInt(req.query.id));

    var types = [];
    storec.stoinvestortypes.forEach((obj) => {
      //obj is an array of id like [1, 2, 3]
      types.push({ id: obj, type: global.config.stoinvestortype[obj] });
    });

    function getDatabaseInformation(callback) {
      mysql
        .executeSQLStatement(
          `Select  count(*) as count from investor i, investorsto s where i.id = s.investorid and s.iskyc = 1 and s.stoid= ?`,
          [req.query.id]
        )
        .then((result) => {
          params.recordCount = result[0].count;

          var sql = `Select i.ID, i.country, i.FirstName, i.LastName, KYCCurrentStatus, i.investorType, i.CompanyName, i.investorType, i.CompanyName, i.investorBulkUploadStatus, iskyc, KYCApplied, (select sum(shares) from shares where investorid =  i.ID and stoid = ?) as Shares, s.isActive, s.KYCApplied   from investor i, investorsto s where i.id = s.investorid and s.iskyc = 1 and s.stoid= ? order by i.FirstName, i.CompanyName`;

          let currentPage = 0;
          if (req.query.page != null) {
            currentPage = req.query.page;
          }

          if (currentPage === 0) {
            sql = `${sql} LIMIT 0, ${global.config.RecordsPerPaging}`;
          } else {
            sql = `${sql} LIMIT ${
              currentPage * global.config.RecordsPerPaging
            }, ${global.config.RecordsPerPaging}`;
          }

          mysql
            .executeSQLStatement(sql, [req.query.id, req.query.id])
            .then((result2) => {
              params.investorsRecord = result2;
              sql = null;
              callback(null);
            })
            .catch((error) => {
              common.handleError(
                req,
                res,
                `${error.message} Error occured in broker investors getDatabaseInformation`
              );
            });
        })
        .catch((error) => {
          common.handleError(
            req,
            res,
            `${error.message} Error occured in broker investors getDatabaseInformation`
          );
        });
    }
    async.waterfall([getDatabaseInformation], (err) => {
      if (!err) {
        res.render("broker/investors", {
          id: req.query.id,
          DataRows: params.investorsRecord,
          RecordCount: params.recordCount,
          partials: common.getBrokerWizardPartials(),
          RecordsPerPaging: global.config.RecordsPerPaging,
          Data: common.getBrokerWizardPageProperties(req),
          investorTypes: types,
          ShareCountInFractions: global.config.ShareCountInFractions,
        });
      }
    });
  },
  investorview(req, res) {
    const sql = `select *, DATE_FORMAT(dob,'%M %d %Y') as DOB from investor i, investorsto s where i.id = ? and i.id = s.investorid; select * from kyc where investorid = ?`;
    mysql
      .executeSQLStatement(sql, [req.query.id, req.query.id])
      .then((result) => {
        var storec = common.getGloablSTORecordWithID(parseInt(req.query.stoid));
        const kycdata = JSON.parse(result[1][0].kyc);

        res.render("broker/investorview", {
          stoid: req.query.stoid,
          kyc: kycdata,
          investorRec: result[0][0],
          partials: common.getBrokerWizardPartials(),
          Data: common.getBrokerWizardPageProperties(req),
          AuthorizationType: common.getAuthorizationType(
            result[0][0].KYCCurrentStatus
          ),
          InvestorTypeText:
            storec.settings.InvestorCategory[
              result[0][0].investorType.toString()
            ],
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} - Error occured in  dashboard getbrokerInformation`
        );
      });
  },
};

router.get("/dashboard", common.isBrokerUserAuthenticated, broker.dashboard);
router.get("/commissions", common.isBrokerUserAuthenticated, getCommissions);
router.get(
  "/invitedInvestors",
  common.isBrokerUserAuthenticated,
  getInvitedInvestors
);
router.get("/sto", common.isBrokerUserAuthenticated, broker.sto);
router.get("/exchange", common.isBrokerUserAuthenticated, broker.exchange);
router.get("/investors", common.isBrokerUserAuthenticated, broker.investors);
router.get(
  "/investorview",
  common.isBrokerUserAuthenticated,
  broker.investorview
);
router.post(
  "/generateBrokerID",
  common.isBrokerUserAuthenticated,
  broker.generateBrokerID
);

module.exports = router;
