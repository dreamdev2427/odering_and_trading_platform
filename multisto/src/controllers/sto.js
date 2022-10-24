'use strict';

import * as emailTextsController from '../services/platform/emails/controllers/EmailTexts.controller';
import getSTOFromConfig from '../services/getSTOFromConfig';

const express = require('express');
const router = express.Router();
const async = require('async');
const fs = require('fs-extra');
const ethereumApi = require('../modules/ethereum');
const common = require('../modules/common');
const mysql = require('../modules/mysql');
const logger = require('../logger');
const refreshBlockchain = require('../modules/refreshBlockchain');
const emailTexts = require('../data/text.json');
const formidable = require('formidable');
const path = require('path');
const math = require('mathjs');
const blockchainApi = require('../modules/blockchain');

import getInvestorAffiliateTokenIncome from './investors/affiliateCtl/getInvestorAffiliateTokenIncome';

const sto = {
     // Documents links is clicked
    backdir(req, res) {
        const params = {};

		  function getDatabaseInformation(callback) {
            if(req.query.id != null) {
                const sql = `select parentid, title from documentdirectories where id = ? and stoid = ${req.session.stoid}`;
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.parentid = result[0].parentid;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in backdir`);
                });
            } else
                params.id = -1;
		  }
		  async.waterfall([
			   getDatabaseInformation
		  ], function (err) {
               res.redirect("directorylist?id=" + params.parentid);
		  });
    },                // Back button clicked
    createdir(req, res) {
          common.checkUserAuthorizationForModuleSTO(req, res, 32);

	  	  const params = {}

		  function setDatabaseInformation(callback) {
            const sql = `insert into documentdirectories(title, stoid, parentid) values(?, ?, ?)`;
            mysql.executeSQLStatement(sql, [req.query.dir, req.session.stoid, req.query.id]).then(() => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in createdir setDatabaseInformation`);
            });
		  }
		  async.waterfall([
			setDatabaseInformation
		  ], function (err) {
              res.redirect("directorylist?id=" + req.query.id);
		  });
    },
    changeDirectoryName(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 32);

        const sql = `update documentdirectories set title = ? where id = ? and stoid = ?`;
        mysql.executeSQLStatement(sql, [req.query.name, req.query.dirid, req.session.stoid]).then(() => {
            res.redirect("directorylist?id=" + req.query.id);
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in changeDirectoryName`);
        });
    },
    deletedir(req, res) {
        var deldir = 1;
        common.checkUserAuthorizationForModuleSTO(req, res, 32);
          function checkdirhasdir(callback) {
                const sql = "select count(*) as count from documentdirectories where parentid = ? and stoid = ?";
                mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                    if(result[0].count > 0)
                        deldir = 0;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in deletedir checkdirhasdir`);
                });
          }
          function checkdirhasfiles(callback) {
                const sql = "select count(*) as count from documents where directoryid = ? and stoid = ?";
                mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                    if(result[0].count > 0)
                        deldir = 0;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in deletedir checkdirhasfiles`);
                });
          }
          function checkdirhascontracts(callback) {
                const sql = "select count(*) as count from documentuser where directoryid = ? and stoid = ?";
                mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                    if(result[0].count > 0)
                        deldir = 0;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in deletedir checkdirhascontracts`);
                });
          }
		  function delinfo(callback) {
              if(deldir == 1) {
                    const sql = "delete from documentdirectories where id = ? and stoid = ?";
                    mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in deletedir delinfo`);
                    });
              } else {
                  callback(null);
              }
		  }
		  async.waterfall([
              checkdirhasdir,
              checkdirhasfiles,
			  delinfo
		  ], function (err) {
               res.redirect("directorylist?id=" + req.query.dirid);
		  });
    },

    // contract document editing
    // documents
    // documentcomments
    // documentdirectories
    // documentfields
    // documentfieldvalues
    // documentofferinvestor     documents offered to investor for signing
    // documentuser                  signed documents
    doc(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 30);
        const params = {};

          function getDatabaseInformation(callback) {
                if(req.query.id != null) {
                    const sql = `select * from documents where id = ? and stoid = ${req.session.stoid} and docusignDocumentID is null and helloSignDocumentID is null\
                    ;\
                    select * from documentfields where documentid = ?  and stoid = ${req.session.stoid} order by ID ASC
                    ;\
                    select count(*) as count from documentcomments where documentid = ?  and stoid = ${req.session.stoid}`;
                    params.id = req.query.id;
                    mysql.executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id]).then((result) => {

                        if(result[0].length === 0) {
                            common.handleError(req, res, `User try to access a document that either do not belong to STO or he enter something randombly in URL`);
                            return;
                        } else {
                            params.rec = result[0][0];
                            params.fieldsrec = result[1];
                            params.commentsCount = result[2][0].count;
                            callback(null);
                        }

                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in doc getDatabaseInformation`);
                    });
                }
                else {
                    params.id = 0;
                    params.rec = {};
                    params.fieldsrec = {};
                    params.commentsCount = 0;
                    callback(null);
                }
          }
          function getInvestorsOfferDetails(callback) {
              if(req.query.id != null) {
                  if(params.rec.offerID != 0) {
                        const sql = `select *, DATE_FORMAT(datefrom,'%M %d %Y') as datefrom, DATE_FORMAT(datato,'%M %d %Y') as datato from documentofferinvestor where id = ? and stoid = ?`;

                        mysql.executeSQLStatement(sql, [params.rec.offerID, req.session.stoid]).then((result) => {
                            params.offerRecord = result[0];
                            callback(null);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.toString()} - Error occured in doc getInvestorsOfferDetails`);
                        });
                  } else {
                      params.offerRecord = {"investorStatusID": 0};
                      callback(null);
                  }
              } else {
                  params.offerRecord = {"investorStatusID": 0};
                  callback(null);
              }
          }
        function getSharePurchaseDocument(callback) {
            if(global.config.sharePurchaseDocumentsMode==='internal'){
                const sql = `SELECT * FROM sharePurchaseDocuments WHERE ID=?;`
                mysql.executeSQLStatement(sql, [req.query.id]).then((doc) => {
                    if(doc[0]){
                        params.enabled = true;
                        params.requireOnce = doc[0].requireOnce===1;
                    }
                    callback(null)
                })

            } else callback(null)
        }
        async.waterfall([
            getDatabaseInformation,
            getInvestorsOfferDetails,
            getSharePurchaseDocument
        ], (err) => {
            res.render('admin/documents/doc', {
                Record: params.rec,
                offerRecord: params.offerRecord,
                fieldRecords: params.fieldsrec,
                id: req.query.id,
                investorTypeText: common.getInvestorTypeText(params.offerRecord.investorStatusID),
                commentsCount: params.commentsCount,
                dirid: req.query.dirid,
                csrfToken: req.csrfToken(),
                Data: common.getCommonPageProperties(req),
                partials: common.getPartials(),
                // sharePurchaseData
                sharePurchaseDocumentsMode: global.config.sharePurchaseDocumentsMode,
                enabled:params.enabled,
                requireOnce: params.requireOnce,
                countryList: common.getCountries(),
                investorTypes: common.getDocumentInvestorTypes()
            });
        });
    },
    docpost(req, res) {
        var params = {};
        common.checkUserAuthorizationForModuleSTO(req, res, 33);
		  function getDatabaseInformation(callback) {
                var sql = "";
                var data = [];
                if(req.body.id == null) {
                    sql = "insert into documents(title, contents, stoid, directoryid) values(?, ?, ?, ?)";
                    data = [req.body.title, req.body.docText, req.session.stoid, req.body.dirid];
                }
                else {
                    sql = "update documents set title=?, contents=? where id=? and stoid = ?";
                    data = [req.body.title, req.body.docText, req.body.id, req.session.stoid];
                }

                mysql.executeSQLStatement(sql, data).then((result) => {
                    if(req.body.id == null)
                        params.id = result.insertId;
                    else
                        params.id = req.body.id;

                    params.dirid = req.body.dirid;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in docpost`);
                });
		  }
		  async.waterfall([
			   getDatabaseInformation
		  ], function (err) {
               res.redirect("doc?id=" + params.id + "&dirid=" + req.body.dirid);
		  });
    },
    docfieldpost(req, res) {
         common.checkUserAuthorizationForModuleSTO(req, res, 33);
		  function saveinfo(callback) {
                const sql = "insert into documentfields(title, fieldid, fieldtype, fieldhelpertext, stoid, documentid, externalFileDataLabel)  values(?, ?, ?, ?, ?, ?, ?)";
                mysql.executeSQLStatement(sql, [req.body.title, req.body.fldid, req.body.activityType, req.body.helpertext,
                    req.session.stoid, req.body.id, req.body.externalFileDataLabel]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in docfieldpost saveinfo`);
                });
		  }
		  async.waterfall([
			   saveinfo
		  ], function (err) {
              if (global.config.sharePurchaseDocumentsMode === 'internal') {
                res.redirect("doc?id=" + req.body.id + "&dirid=" + req.body.dirid);
              } else {
                res.redirect("externalDoc?id=" + req.body.id + "&dirid=" + req.body.dirid);
              }
		  });
    },
    async sharePurchaseDocSettings(req,res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 33);
        const {enable:enableRaw,requireOnce:requireOnceRaw,id} = req.body;
        const enable = enableRaw==='on';
        const requireOnce = requireOnceRaw==='on';
        if(enable){
            const findSharePurchaseDocSQL = `SELECT * FROM sharePurchaseDocuments where ID =?;`
            const updateSharePurchaseDocSQL = `UPDATE sharePurchaseDocuments set requireOnce = ? WHERE ID=?;`
            const insertSharePurchaseDocSQL = `INSERT INTO sharePurchaseDocuments(requireOnce, ID) values(?, ?);`
            const [sharePurchaseDoc] = await mysql.executeSQLStatement(findSharePurchaseDocSQL, [id])
            if(sharePurchaseDoc)
                await mysql.executeSQLStatement(updateSharePurchaseDocSQL, [requireOnce?1:0,id])
            else
                await mysql.executeSQLStatement(insertSharePurchaseDocSQL, [requireOnce?1:0,id])

        } else {
            const deleteSql = `DELETE FROM sharePurchaseDocuments where ID =?;`
            await mysql.executeSQLStatement(deleteSql, [id])
        }
        if (global.config.sharePurchaseDocumentsMode === 'internal') {
          res.redirect("doc?id=" + req.body.id + "&dirid=" + req.body.dirid);
        } else {
          res.redirect("externalDoc?id=" + req.body.id + "&dirid=" + req.body.dirid);
        }
    },
    async setDocumentCountriesWhitelist(req, res){
        common.checkUserAuthorizationForModuleSTO(req, res, 33);
        const {countryWhitelist, id} = req.body;
        const sql = `UPDATE documents set countriesWhitelist = ? WHERE ID=?;`;
        const whitelist = countryWhitelist?? '';
        await mysql.executeSQLStatement(sql, [JSON.stringify(whitelist),id]);
        if (global.config.sharePurchaseDocumentsMode === 'internal') {
          res.redirect("doc?id=" + req.body.id + "&dirid=" + req.body.dirid);
        } else {
          res.redirect("externalDoc?id=" + req.body.id + "&dirid=" + req.body.dirid);
        }
    },
    async setDocumentInvestorTypeWhitelist(req, res) {
      common.checkUserAuthorizationForModuleSTO(req, res, 33);
      const {investorTypeWhitelist, id} = req.body;
      const sql = `UPDATE documents set investorTypesWhitelist = ? WHERE ID=?;`;
      const whitelist = investorTypeWhitelist?? '';
      await mysql.executeSQLStatement(sql, [JSON.stringify(whitelist),id]);
      if (global.config.sharePurchaseDocumentsMode === 'internal') {
        res.redirect("doc?id=" + req.body.id + "&dirid=" + req.body.dirid);
      } else {
        res.redirect("externalDoc?id=" + req.body.id + "&dirid=" + req.body.dirid);
      }
    },
    deletedocfield(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 33);
		  function delinfo(callback) {
                const sql = "delete from documentfields where id = ? and stoid = ?";
                mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in deletedocfield delinfo`);
                });
		  }
		  async.waterfall([
			   delinfo
		  ], function (err) {
        if (global.config.sharePurchaseDocumentsMode === 'internal') {
          res.redirect("doc?id=" + req.body.id + "&dirid=" + req.body.dirid);
        } else {
          res.redirect("externalDoc?id=" + req.body.id + "&dirid=" + req.body.dirid);
        }
		  });
    },
    docdelete(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 33);
		  function delinfo(callback) {
                const sql = "delete from documents where id = ? and stoid = ?";
                mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in docdelete delinfo`);
                });
		  }
		  async.waterfall([
			   delinfo
		  ], function (err) {
               res.redirect("directorylist?id=" + req.query.dirid);
		  });
    },

    senddoc(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 17);

        const params = {};
          function getDatabaseInformation(callback) {
                if(req.query.id != null) {
                    const sql = `select ID, documentid, title, DATE_FORMAT(datefrom,'%M %d %Y') as datefrom, DATE_FORMAT(datato,'%M %d %Y') as datato, contents, investorStatusID, investorsName from documentofferinvestor where id = ? and stoid = ${req.session.stoid}; \
                    Select directoryid from documents where id = ?`;
                    params.id = req.query.id;
                    mysql.executeSQLStatement(sql, [req.query.id, req.query.docid]).then((result) => {
                        params.rec = result[0][0];
                        params.dirid = result[1][0].directoryid;
                        params.open = common.checkTimePeriod(params.rec.datefrom, params.rec.datato);
                        params.isEditing = 1;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in senddoc getDatabaseInformation`);
                    });
                }
                else {

                    const sql = `Select directoryid from documents where id = ?`;
                    mysql.executeSQLStatement(sql, [req.query.docid]).then((result) => {
                        params.isEditing = 0;
                        params.dirid = result[0].directoryid;
                        params.id = 0;
                        params.rec = {};
                        params.open = 1;
                        callback(null);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in senddoc getDatabaseInformation`);
                    });
                }
          }
          async.waterfall([
               getDatabaseInformation
          ], function (err) {
                var type = "";
                if(req.query.id != null)
                    type = common.getSTOinvestorTypeWIthID(params.rec.investorStatusID);

                res.render('admin/documents/senddoc', {
                    Record: params.rec,
                    isEditing: params.isEditing,
                    id: params.id,
                    STOInvestorTypes: common.getSTOInvestorTypes(req),
                    investorStatusIDtext: type,
                    dirid: params.dirid,
                    open: params.open,
                    docid: req.query.docid,
                    csrfToken: req.csrfToken(),
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials()
                });
          });

    },
    senddocpost(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 17);
        var params = {};

		  function getDatabaseInformation(callback) {
                var sql = "";
                var data = [];
                if(req.body.id == null) {
                    sql = "insert into documentofferinvestor(stoid, title, documentid, DateFrom, DataTo, documentOffetType, investorStatusID, InvestorsName, contents) values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    data = [req.session.stoid, req.body.title, req.body.docid, req.body.openDate, req.body.closeDate, 1, req.body.typesearch, req.body.namesearch, req.body.details];
                }
                else {
                    sql = "update documentofferinvestor set title=?, DateFrom=?, DataTo=?, contents=? where id = ? and stoid = ?";
                    data = [req.body.title, req.body.openDate, req.body.closeDate, req.body.details, req.body.id, req.session.stoid];
                }

                mysql.executeSQLStatement(sql, data).then((result) => {
                    if(req.body.id == null)
                        params.id = result.insertId;
                    else
                        params.id = req.body.id;

                    params.dirid = req.body.dirid;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in senddocpost getDatabaseInformation`);
                });
		  }
          function updateDocument(callback) {
                const sql = "update  documents set offerID = ? where id = ? and stoid = ?";
                mysql.executeSQLStatement(sql, [params.id, req.body.docid, req.session.stoid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in senddocpost updateDocument`);
                });
          }
          function sendbulkemail(callback) {

            const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
            if (!stoEmailTexts) throw new Error(`Email texts not found for contractReceivedFromAdmin`);

            let txtEmail = emailTextsController.format(stoEmailTexts.contractReceivedFromAdmin.Line1, {});
            txtEmail += '<br /><br />';
            txtEmail += getSTOFromConfig(req.session.stoid).emailFooter
                    // let txtEmail = '';
                    // txtEmail += `${emailTexts.contractReceivedFromAdmin.Line1} <br /><br />`;
                    // txtEmail += getSTOFromConfig(req.session.stoid).emailFooter;

                    const emaildata = {
                        text: txtEmail,
                        attachments: []
                    };

                    const preparedSQL = common.getInvestorSearchSQL(common.getInvestorSearchSQLSearchCritetia(req, true), req);

                   const sql = "insert into bulkemails(stoid, hostname, title, typeOfQuery, InvestorsSelectionSQL, BulkEmailsCommaSeperated, emailText, fromEmail) values (?, ?, ?, ?, ?, ?, ?, ?)";

                   mysql.executeSQLStatement(sql, [req.session.stoid, req.hostname, emailTexts.contractReceivedFromAdmin.Subject, 1, JSON.stringify(preparedSQL), "", JSON.stringify(emaildata), getSTOFromConfig(req.session.stoid).SMTP_FromAddress]).then(() => {

                            callback(null);

                    }).catch((error) => {
                        logger.error(`${error.message} - Error occured in updatesPost`);
                    });

        }
		  async.waterfall([
			   getDatabaseInformation,
               updateDocument,
               sendbulkemail
		  ], function (err) {

                  if(req.body.id == null)
                      req.flash('docmessage', 'Contract offer has been activated on investor dashboard(s)');
                  else
                      req.flash('docmessage', 'Contract offer has been modified')

                  res.redirect("directorylist?id=" + req.body.dirid);

		  });

    },
    senddoccontracts(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 37);
        const params = {};

        function getDatabaseInformation(callback) {
            var sql = `select firstname, lastname, email, town, country, documentid, directoryid, investorid, d.ID as DocID, DATE_FORMAT(signaturedate,'%M %d %Y') as signaturedate from documentuser d, investor i where d.documentid = ? and d.documentofferinvestorid = ?  and i.ID = d.investorid and stoid = ${req.session.stoid} and DocumentStatus = 2 \
            ;\
            select firstname, lastname, email, country, town, documentid, directoryid, investorid, d.ID as DocID, DATE_FORMAT(signaturedate,'%M %d %Y') as signaturedate from documentuser d, investor i where d.documentid = ? and d.documentofferinvestorid = ?  and i.ID = d.investorid and stoid = ${req.session.stoid} and DocumentStatus = 3`;
            mysql.executeSQLStatement(sql, [req.query.docid, req.query.id, req.query.docid, req.query.id]).then((result) => {
                params.SignedRecords = result[0];
                params.SettledRecords = result[1];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in senddoccontracts getDatabaseInformation`);
            });
        }
        function getInvestorsOfferDetails(callback) {
            const sql = `select *, DATE_FORMAT(datefrom,'%M %d %Y') as datefrom, DATE_FORMAT(datato,'%M %d %Y') as datato from documentofferinvestor where id = ? and stoid = ?`;
            mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
                params.offerRecord = result[0];
                params.open = common.checkTimePeriod(result[0].DateFrom, result[0].DataTo);

                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in senddoccontracts getInvestorsOfferDetails`);
            });
        }
        async.waterfall([
            getDatabaseInformation,
            getInvestorsOfferDetails
        ], function (err) {
            res.render('admin/documents/opensignedcontracts', {
                    open: params.open,
                    offerRecord: params.offerRecord,
                    investorTypeText: common.getInvestorTypeText(params.offerRecord.investorStatusID),
                    SignedRecords: params.SignedRecords,
                    SettledRecords: params.SettledRecords,
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials()
                });
        });
    },
    viewsenddoccontracts(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 37);
        var params = {};

        function getDatabaseInformation(callback) {
            const sql = `select *, d.ID as iddoc, DATE_FORMAT(d.signaturedate,'%M %d %Y') as signaturedate2, c.url as url
              from documentuser d
              inner join investor i on i.id = d.investorID
              left join cloudFiles c on c.id = d.signatureFileID
              where d.id = ? 
                and d.investorid = i.ID`;
            mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                params.record = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occurred in viewsenddoccontracts getDatabaseInformation`);
            });
        }
        function getImageData(callback) {
          if (params.record.signaturefilepath) {
            fs.readFile(common.getUserFileUploadsLocationFullPath(params.record.signaturefilepath), 'base64', function(err, contents) {
              params.signatureFileContents = contents;
              callback(null);
            })
          } else {
            params.signatureFileContents = params.record.url.includes('googleapis')? params.record.url : `data:image/png;base64, ${params.record.url}`;
            callback(null);
          }
        }
        async.waterfall([
            getDatabaseInformation,
            getImageData
        ], function (err) {
            res.render('admin/documents/opensignedcontractsview', {
                errorMessage: req.flash('errorMessage'),
                record: params.record,
                internalSignatureMode: global.config.internalSignatureMode ?? "",
                signatureFileContents: params.signatureFileContents,
                Data: common.getCommonPageProperties(req),
                csrfToken: req.csrfToken(),
                partials: common.getPartials()
            });
        });
    },
    viewcontract(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 37);
        var params = {};

        function getDatabaseInformation(callback) {
            const sql = `select *, d.contents as usercontents, DATE_FORMAT(signaturedate,'%M %d %Y') as signaturedate2, c.url
              from documentuser d
              inner join investor i on i.id = d.investorID
              left join cloudFiles c on c.id = d.signatureFileID
              where d.id = ? 
                and d.stoid=${req.session.stoid}`;

            mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                params.rec = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in viewcontract getDatabaseInformation`);
            });
        }
        function getImageData(callback) {
          if (params.rec.signaturefilepath) {
            fs.readFile(common.getUserFileUploadsLocationFullPath(params.rec.signaturefilepath), 'base64', function(err, contents) {
              params.signatureFileContents = contents;
              callback(null);
            })
          } else {
            params.signatureFileContents = params.rec.url.includes('googleapis')? params.rec.url : `data:image/png;base64, ${params.rec.url}`;
            callback(null);
          }
        }
        async.waterfall([
            getDatabaseInformation,
            getImageData
        ], function (err) {
          res.render('admin/documents/contractview', {
            Record: params.rec,
            signatureFileContents: params.signatureFileContents,
            internalSignatureMode: global.config.internalSignatureMode ?? "",
            Data: common.getCommonPageProperties(req),
            partials: common.getPartials()
          });
        });
    },
    settleinvestorDocumentContract(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 37);
        var params = {};

        function getDatabaseInformation(callback) {
            var sql = `update documentuser set DocumentStatus=3 where id=? and stoid=${req.session.stoid}`;
            mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in settleinvestorDocumentContract getDatabaseInformation`);
            });
        }
        async.waterfall([
            getDatabaseInformation
        ], function (err) {
            res.redirect(`senddoccontracts?docid=${req.query.docid}&id=${req.query.offerid}&dirid=${req.query.dirid}`);
        });
    },
    activatedirectoryforinvestoreview(req, res) {
       common.checkUserAuthorizationForModuleSTO(req, res, 37);

          function delinfo(callback) {
                const sql = "update documents set isactiveforinvestors = ?  where id = ? and stoid = ?";
                mysql.executeSQLStatement(sql, [req.query.act, req.query.id, req.session.stoid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in activatedirectoryforinvestoreview`);
                });
		  }
		  async.waterfall([
			   delinfo
		  ], function (err) {
               res.redirect("directorylist?id=" + req.query.dirid);
		  });
    },
    doccommentoffer(req, res) {

        const sql = "select * from documents where id = ? and stoid = ?";
        mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid]).then((result) => {
            var activate = 1;
            if(result[0].isactiveforinvestors == 1)
                activate = 0;

            res.render('admin/documents/commentoffer', {
                docid: req.query.id,
                dirid: req.query.dirid,
                activate: activate,
                record: result[0],
                partials: common.getPartials(),
                Data: common.getCommonPageProperties(req),
                csrfToken: req.csrfToken()
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in doccommentoffer`);
        });

    },
    documentoffersubmit(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 37);

        function setinfo(callback) {
            const sql = "update documents set isactiveforinvestors = ?, isactiveforinvestorsNames = ?, isactiveforinvestorsType= ?  where id = ? and stoid = ?";
            mysql.executeSQLStatement(sql, [req.body.act, req.body.namesearch, req.body.typesearch, req.body.id, req.session.stoid]).then((result) => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in documentoffersubmit setinfo`);
            });
        }
        async.waterfall([
           setinfo
        ], function (err) {
           res.redirect("directorylist?id=" + req.body.dirid);
        });
    },
    viewdocdocumentcomment(req, res) {
        const params = {};

        function getDatabaseInformation(callback) {
			  const sql = `select * from documents where stoid = ? and id= ? \
              ;\
              select *, d.ID as commentID, DATE_FORMAT(d.datecomment,'%M %d %Y') as datecomment, DATE_FORMAT(d.datereplycomment,'%M %d %Y') as datereplycomment, i.FirstName, i.LastName, u.FirstName as uFirstName, u.LastName as uLastName from documentcomments d left join investor i on d.investorid = i.id left join users u on u.id = d.replybyid where d.stoid=? and d.documentid=?
              `;
			  mysql.executeSQLStatement(sql, [req.session.stoid, req.query.id, req.session.stoid, req.query.id])
			  .then((result) => {
                  params.rec = result[0][0];
                  params.comments = result[1];
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in viewdocdocumentcomment`);
			  });
        }
		  async.waterfall([
			getDatabaseInformation
		  ], (err) => {
              if (!err) {
                    res.render('admin/documents/viewdocdocument', {
                        docid: req.query.id,
                        record: params.rec,
                        comments: params.comments,
                        partials: common.getPartials(),
                        Data: common.getCommonPageProperties(req),
                        csrfToken: req.csrfToken()
                    });
              }
		  });

    },
    sendDocumentResponse(req, res) {
        const params = {};

        function getDatabaseInformation(callback) {
			  const sql = `update documentcomments set reply=?, replybyid=?, datereplycomment=now() where id =? and stoid=?`;
			  mysql.executeSQLStatement(sql, [req.body.commentresponse, req.session.user.ID, req.body.commentid, req.session.stoid ]).then((result) => {
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in sendDocumentResponse`);
			  });
        }
		  async.waterfall([
			getDatabaseInformation
		  ], (err) => {
                res.redirect("viewdocdocumentcomment?id=" + req.body.docid);
		  });

    },
    fileUploadinDirectory(req, res) {
        const params = {};
        function transferfiles(callback) {
            var j = JSON.parse(  req.body.files );
            var newLoc = "";
            if(req.body.type == "2")
                newLoc = common.getUserFileLocation( path.join(__dirname, "/../../uploads/docs") );
            else if(req.body.type == "3")
                newLoc = common.getUserFileLocation( path.join(__dirname, "/../../public/docs") );

            common.moveMultipleFilesToLocation(j, newLoc, req.hostname + "-").then((data) => {
                if(req.body.type == "2")
                    params.file = "docs/" + data[0];
                else if(req.body.type == "3")
                    params.file = data[0];

                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in fileUploadinDirectory`);
            });
        }
        function setDatabaseInformation(callback) {
			  const sql = `insert into documents(title, contents, stoid, directoryid, isactiveforinvestors, filetype) values (?, ?, ?, ?, 1, ?)`;
			  mysql.executeSQLStatement(sql, [req.body.title, params.file, req.session.stoid, req.body.id, req.body.type]).then((result) => {
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in fileUploadinDirectory setDatabaseInformation`);
			  });
        }
        async.waterfall([
            transferfiles,
			setDatabaseInformation
        ], (err) => {
            res.redirect("directorylist?id=" + req.body.id);
        });
    },
    deleteFileFromDirectory(req, res) {
        const params = {};

        function getFileName(callback) {
			  const sql = `select contents, filetype from documents where id = ? and stoid = ?`;
			  mysql.executeSQLStatement(sql, [req.query.filid, req.session.stoid]).then((result) => {
                  if(result.length > 0) {
                     params.fileFound = 1;
                     params.filetype = result[0].filetype;
                     if(result[0].filetype == 2)
                         params.filePath = result[0].contents
                      else if(result[0].filetype == 3)
                         params.filePath = result[0].contents

                  } else
                      params.fileFound = 0;

				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in deleteFileFromDirectory getFileName`);
			  });
        }
        function deleteFileFromDir(callback) {
            if(params.fileFound == 1) {
                if(params.filetype == 2) {
                    common.deleteFileFromDisk(params.filePath).then(() => {
                        callback(null);
                    }).catch((error) => {
                        callback(null);
                    });
                } else if(params.filetype == 3) {
                    const url = path.join(__dirname, `/../../public/docs/${params.filePath}`);
                    fs.unlink(common.getUserFileLocation(url), (err) => {
                        callback(null);
                    });
                }

            } else
                callback(null);
        }
        function deleteRecord(callback) {
			  const sql = `delete from documents where id = ? and stoid = ?`;
			  mysql.executeSQLStatement(sql, [req.query.filid, req.session.stoid]).then((result) => {
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in deleteFileFromDirectory deleteRecord`);
			  });
        }
        async.waterfall([
            getFileName,
            deleteFileFromDir,
			deleteRecord
        ], (err) => {
            res.redirect("directorylist?id=" + req.query.id);
        });

    },
    downloadUploadedDocFile(req, res) {
        mysql.downloadUploadedFileDocument(1, req, res);
    },

    adddividend(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 42);
        res.render('admin/dividends/dividends', {
            currencyID: getSTOFromConfig(req.session.stoid).settings.DefaultSTOCurreny,
            partials: common.getPartials(),
            Data: common.getCommonPageProperties(req),
            csrfToken: req.csrfToken()
        });
    },
    adddividendpost(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 42);
        var params = {};

        function getSharesInformation(callback) {
              const sql = 'select totalShares, companyShares, nominalValue, premimum from sharetypes where stoid = ?'; 
              mysql.executeSQLStatement(sql, [req.session.stoid]).then((result) => {
                    params.totalShares = 0;
                    params.totalInvestorShares = 0;

                    result.forEach(obj=> {
						    params.totalShares = math.sum(params.totalShares ?? 0, bj.totalShares ?? 0);
                            params.totalInvestorShares = math.sum(params.totalInvestorShares ?? 0, math.subtract(obj.totalShares ?? 0, obj.companyShares ?? 0));
                    })

                    callback(null);
              }).catch((error) => { 
                    common.handleError(req, res, `${error.toString()} - Error occured adddividendpost getSharesInformation`); 
              });
        }
        function generateDividend(callback) {
              const sql = 'insert into dividend(title, stoid, adminid, status, Details, DateReport, totalamount, currencyid, investorTotalShares, companyTotalShares, payouttype) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; 
              mysql.executeSQLStatement(sql, [req.body.title, req.session.stoid, req.session.user.ID, 0, req.body.notes, req.body.txtDate,  req.body.txtAmount, req.body.currencyID, params.totalInvestorShares, params.totalShares, req.body.payoutselect] ).then((result) => {
                    params.newID = result.insertId;
                    params.totalAmount = parseFloat( req.body.txtAmount );
                    callback(null); 
              }).catch((error) => { 
                    common.handleError(req, res, `${error.toString()} - Error occured adddividendpost generateDividend`); 
              });
        }
        function updatetDatabaseInformation(callback) {
            var sql = "select investorid from investorsto where stoid = ?";

            mysql.executeSQLStatement(sql, [req.session.stoid]).then((result) => {

                    params.totalInvestors = result.length;

                    var count = 0;
                    async.whilst(
                        function() {
                            return count < result.length;
                        },
                        function (callbackInner) {

                                function getDatabaseInformation(callback) {               
                                      const sql = 'select s.investorid, s.shares, p.premimum, p.nominalValue from shares s, sharetypes p where p.id = s.sharetypeid and s.investorid = ? and s.stoid = ?'; 
                                      mysql.executeSQLStatement(sql, [result[count].investorid, req.session.stoid]).then((result) => { 
                                            params.records = result;

                                            callback(null);
                                      }).catch((error) => { 
                                            common.handleError(req, res, `${error.toString()} - Error occured adddividendpost updatetDatabaseInformation`); 
                                      });
                                }
                                function processInfo(callback) {
                                    params.investorShares = 0;

                                    params.records.forEach(obj=>{
                                        if(obj.shares > 0) {
                                            params.investorShares = math.sum(params.investorShares ?? 0, obj.shares ?? 0);
                                        }
                                    })

                                    callback(null);
                                }
								function getOtherValues(callback){

									getInvestorAffiliateTokenIncome(result[count].investorid, req.session.stoid)
									.then((income) => {
										// income is a very precise decimal string such as "10.000000000000000000"
										params.AffiliateShares = income;
										callback(null);
									})
									.catch((error) => {
										params.AffiliateShares = 0;
										callback(null);
									});
								}
                                function saverecord(callback) {
                                    var shareValue = 0;
                                    if( params.investorShares > 0 ) {

                                            if(req.body.payoutselect == "1")
                                                    shareValue = math.multiply(math.divide(params.totalAmount ?? 0, params.totalShares ?? 0) ?? 0, params.investorShares ?? 0);
                                            else
                                                    shareValue =  math.multiply(math.divide(params.totalAmount ?? 0, params.totalInvestorShares ?? 0) ?? 0, params.investorShares ?? 0);


											const AffiliateAmount = math.multiply(math.divide(params.totalAmount ?? 0, params.totalShares ?? 0) ?? 0, params.AffiliateShares ?? 0);

                                            const sql = 'insert into dividendreceivers(dividendid, investorid, shares, amounttopaid, status, Details,  BankPaidDetails, CryptoPaidDetails, AffiliateAmount) values(?, ?, ?, ?, ?, ?, ?, ?, ?)'; 
                                            mysql.executeSQLStatement(sql, [params.newID, result[count].investorid, params.investorShares, shareValue, 0, "", "", "", AffiliateAmount]).then((result) => {
                                                    callback(null); 
                                            }).catch((error) => { 
                                                common.handleError(req, res, `${error.toString()} - Error occured adddividendpost updatetDatabaseInformation`); 
                                            });

                                    } else
                                        callback(null);
                                }
                                async.waterfall([ 
                                    getDatabaseInformation,
                                    processInfo,
									getOtherValues,
                                    saverecord
                                ], function (err) { 
                                    //console.log(result[count].investorid);
                                    count++;
                                    callbackInner(null, count);
                                });       

                        },
                        function(err, n) {
                            if (!err) {
                                const sql = 'update dividend set totalInvestors = ? where id = ? ';
                                mysql.executeSQLStatement(sql, [params.totalInvestors, params.newID]).then((result) => { 
                                        callback(null); 
                                }).catch((error) => { 
                                        common.handleError(req, res, `${error.toString()} - Error occured adddividendpost`); 
                                });

                            } else {
                                logger.info(`${err}`);
                            }
                        }
                    );

            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in adddividendpost`);
            });
        }
        async.waterfall([
            getSharesInformation,
            generateDividend,
            updatetDatabaseInformation
        ], function (err) {
             res.redirect("/admin/listdividend")
        });
    },
    listdividend(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 42);
        const params = {};

		  function getRecords(callback) {
                const sql = "select *, DATE_FORMAT(DateReport,'%M %d %Y') as DateReport from dividend where stoid = ?";
                mysql.executeSQLStatement(sql, [req.session.stoid]).then((result) => {
                    params.records = result;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in viewdividend`);
                });
		  }
		  async.waterfall([
			   getRecords
		  ], function (err) {
                    res.render('admin/dividends/listdividend', {
                        records: params.records,
                        partials: common.getPartials(),
                        Data: common.getCommonPageProperties(req),
                        csrfToken: req.csrfToken()
                    });
		  });
    },
    deleteDividend(req, res){
        common.checkUserAuthorizationForModuleSTO(req, res, 42);

        function checkRecords(callback) {
            const sql = "SELECT COUNT(*) as count FROM dividendreceivers dr WHERE dr.dividendid = ? AND dr.status = 1;";

            mysql.executeSQLStatement(sql, [req.body.dividendId]).then((result) => {
                if (result[0].count !== 0) {
                    res.redirect("/admin/listdividend");
                } else {
                    callback(null);
                }
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in checkRecords`);
            });
        }
        function deleteRecords(callback) {
            const sql = "DELETE d, dr\n" +
                "FROM dividend d\n" +
                "INNER JOIN dividendreceivers dr\n" +
                "    ON d.ID = dr.dividendid\n" +
                "WHERE\n" +
                "    d.ID = ? AND\n" +
                "    dr.ID > 0 AND\n" +
                "    dr.status = 0 AND\n" +
                "    d.DateReport > now();";
            mysql.executeSQLStatement(sql, [req.body.dividendId]).then(() => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in deleteDividend`);
                callback(null);
            });
        }
        async.waterfall([
            checkRecords,
            deleteRecords
        ], function (err) {
            res.redirect("/admin/listdividend");
        });
    },
    viewdividenddetails(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 42);
        const params = {};

		  function getDividendInfo(callback) {
                const sql = "select d.title, d.payouttype, d.status, d.Details, DATE_FORMAT(d.DateReport,'%M %d %Y') as DateReport, d.totalamount,  d.investorTotalShares, d.companyTotalShares, d.totalInvestors, d.currencyid, s.title as ShareTitle   from dividend d, sharetypes s where  d.id = ?";
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.record = result[0];
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in viewdividend`);
                });
		  }
		  function getDividendInvestorData(callback) {
                const sql = "select d.ID, firstName, lastName, shares, amounttopaid, d.status, DATE_FORMAT(d.DatePaid,'%M %d %Y') as DatePaid  from dividendreceivers d, investor i where d.investorid = i.id and  d.dividendid = ?";
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.listrecords = result;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in viewdividend`);
                });
		  }
		  async.waterfall([
			  getDividendInfo,
              getDividendInvestorData
		  ], function (err) {
                res.render('admin/dividends/dividendsdetails', {
                    record: params.record,
                    listrecords: params.listrecords,
                    partials: common.getPartials(),
                    Data: common.getCommonPageProperties(req),
                    csrfToken: req.csrfToken()
                });
		  });
    },
    viewdividend(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 42);

        const params = {};
		  function getInfo(callback) {
                const sql = "select firstName, lastName, d.ID, d.dividendid, d.shares, d.amounttopaid, d.status, d.Details, BankPaidDetails, CryptoPaidDetails, DATE_FORMAT(DatePaid,'%M %d %Y') as DatePaid from dividendreceivers d, investor s where s.id = d.investorid and d.id = ?";
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.record = result[0];
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in viewdividend`);
                });
		  }
		  function getdividend(callback) {
                const sql = "select title, DATE_FORMAT(DateReport,'%M %d %Y') as DateReport, currencyid, payouttype, Details, stoid from dividend where id = ?";
                mysql.executeSQLStatement(sql, [params.record.dividendid]).then((result) => {
                    params.dividendrec = result[0];
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in viewdividend`);
                });
		  }
		  function getInvestorBankAccount(callback) {
                const sql = "select * from InvestorBanksDividend d, InvestorBanks b where d.id = d.InvestorBanksID and d.stoid = ?";
                mysql.executeSQLStatement(sql, [params.dividendrec.stoid]).then((result) => {
                    params.banks = result;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in viewdividend`);
                });
		  }
		  async.waterfall([
			   getInfo,
              getdividend,
			  getInvestorBankAccount
		  ], function (err) {
                    res.render('admin/dividends/viewdividend', {
                        dividendrec: params.dividendrec,
                        record: params.record,
						banks: params.banks,
                        partials: common.getPartials(),
                        Data: common.getCommonPageProperties(req),
                        csrfToken: req.csrfToken()
                    });
		  });
    },
    dividendpayment(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 42);

        const params = {};
		  function setInfo(callback) {
                const sql = "update dividendreceivers set status = 1, Details = ?, BankPaidDetails = ?, CryptoPaidDetails = ?, DatePaid = ? where id = ?";
                mysql.executeSQLStatement(sql, [req.body.Details, req.body.BankPaidDetails, req.body.CryptoPaidDetails,  req.body.DatePaid, req.body.ID ]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in viewdividend`);
                });
		  }
		  async.waterfall([
			   setInfo
		  ], function (err) {
                res.redirect ("viewdividend?id=" + req.body.ID);
		  });

    },
	dividendinvestors(req, res) {
		var type = "1";
		if(req.query.type != null)
			type = req.query.type;

		const sql = "select i.id, firstName, lastName, b.AmountPaid, b.AmountNotYetPaid \
                            from investor i \
                            JOIN investorsto s ON i.id = s.investorid \
                            LEFT JOIN ( select investorid, SUM(IF(r.status = 1, r.amounttopaid, NULL)) AS AmountPaid, \
                                SUM(IF(r.status = 0, r.amounttopaid, NULL)) AS AmountNotYetPaid \
                                from dividendreceivers r, dividend d where d.id = r.dividendid and stoid = ? \
                                group by investorid) b \
                            ON (b.investorid = i.id) \
                            where s.stoid = ? and i.dividendPeriod = ? \
							;\
							select settings from stos where id = ?";

		mysql.executeSQLStatement(sql, [req.session.stoid, req.session.stoid, type, req.session.stoid]).then((result) => {

				const settings =  JSON.parse( result[1][0].settings );

				res.render('admin/dividends/dividendinvestors', {
					result: result[0],
					DefaultSTOCurreny: settings.DefaultSTOCurreny,
					partials: common.getPartials(),
					Data: common.getCommonPageProperties(req),
					csrfToken: req.csrfToken()
				});

		}).catch((error) => {
			common.handleError(req, res, `${error.toString()} - Error occured in dividendinvestors`);
		});

	},
	viewdividendinvestors(req, res) {
		const sql = "select d.title, r.*,  DATE_FORMAT(d.DateReport,'%M %d %Y') as DateReport,   DATE_FORMAT(r.DatePaid,'%M %d %Y') as DatePaid  from dividendreceivers r, dividend d where d.id = r.dividendid and investorid = ? and stoid = ? and r.status = 0 \
				;\
				select d.title, r.*,  DATE_FORMAT(d.DateReport,'%M %d %Y') as DateReport,   DATE_FORMAT(r.DatePaid,'%M %d %Y') as DatePaid  from dividendreceivers r, dividend d where d.id = r.dividendid and investorid = ? and stoid = ? and r.status = 1 \
				;\
				select firstName, lastName from investor where id = ? \
				; \
				select settings from stos where id = ?";
		mysql.executeSQLStatement(sql, [req.query.id, req.session.stoid, req.query.id, req.session.stoid, req.query.id, req.session.stoid ]).then((result) => {

				const settings =  JSON.parse( result[3][0].settings );

				var totalAmountPaid = 0;
				result[1].forEach(obj=> {
					totalAmountPaid = math.sum(totalAmountPaid, obj.amounttopaid ?? 0);
				})

				var totalAmountNotPaid = 0;
				result[0].forEach(obj=> {
					totalAmountNotPaid = math.sum(totalAmountNotPaid, obj.amounttopaid ?? 0);
				})

				res.render('admin/dividends/viewdividendinvestor', {
					record: result[2][0],
					dividendpaid: result[1],
					dividendnotpaid: result[0],
					totalAmountPaid: totalAmountPaid,
					totalAmountNotPaid: totalAmountNotPaid,
					DefaultSTOCurreny: settings.DefaultSTOCurreny,
					partials: common.getPartials(),
					Data: common.getCommonPageProperties(req),
					csrfToken: req.csrfToken()
				});

		}).catch((error) => {
			common.handleError(req, res, `${error.toString()} - Error occured in viewdividendinvestors`);
		});
	},

    currentOrders(req, res) {
        const matchDeposit = (global.config.isInvoicingEnabled === 1 && global.config.IsMarketSpace !== 1);
        const sql = `
            select
                b.ID,
                i.FirstName,
                i.LastName,
                b.Shares,
                s.title, 
                ${matchDeposit
                    ? "DATE_FORMAT(b.DateReceived,'%M %d %Y') as DateReceived"
                    : "DATE_FORMAT(DateReceived,'%M %d %Y') as DateReceived"
                },
                isSellRequest
            from
                InvestorBuyPropertyAlert b,
                investor i,
                sharetypes s${matchDeposit
                    ? ", InvestorDepositReceivedAlert d"
                    : ""
                }
            where
                b.stoid = ${req.session.stoid}
            and b.investorID = i.id
            and b.ShareTypeID = s.id
            and status = 1
            and isBuySharesFormSigned = 1
            and b.isblockchain = 0
            and isSellRequest = 0
            ${matchDeposit
                ? `and d.isApproved = 1
                   and d.buyAlertID = b.id`
                : ``
            }
            ;

            select
                b.ID,
                i.FirstName,
                i.LastName,
                b.Shares,
                s.title,
                ${matchDeposit
                    ? "DATE_FORMAT(b.DateReceived,'%M %d %Y') as DateReceived,"
                    : "DATE_FORMAT(DateReceived,'%M %d %Y') as DateReceived,"
                }
                publickey,
                isSellRequest
            from
                InvestorBuyPropertyAlert b,
                investor i,
                sharetypes s${matchDeposit
                    ? `, InvestorDepositReceivedAlert d`
                    : ``
                }
            where
                b.stoid = ${req.session.stoid}
            and b.investorID = i.id
            and b.ShareTypeID = s.id
            and status = 1
            and isBuySharesFormSigned = 1
            and b.isblockchain = 1
            and isSellRequest = 0
            ${matchDeposit
                ? `and d.isApproved = 1
                   and d.buyAlertID = b.id`
                : ``
            }
            ;
            
            select
                b.ID,
                i.FirstName,
                i.LastName,
                b.Shares,
                s.title,
                DATE_FORMAT(DateReceived,'%M %d %Y') as DateReceived,
                isSellRequest
            from
                InvestorBuyPropertyAlert b,
                investor i,
                sharetypes s
            where
                b.stoid = ${req.session.stoid}
            and b.investorID = i.id
            and b.ShareTypeID = s.id
            and status = 1
            and b.isblockchain = 0
            and isSellRequest = 1
            ;
            
            select
                b.ID,
                i.FirstName,
                i.LastName,
                b.Shares,
                s.title,
                DATE_FORMAT(DateReceived,'%M %d %Y') as DateReceived,
                publickey,
                isSellRequest
            from
                InvestorBuyPropertyAlert b,
                investor i,
                sharetypes s
            where
                b.stoid = ${req.session.stoid}
            and b.investorID = i.id
            and b.ShareTypeID = s.id
            and status = 1
            and b.isblockchain = 1
            and isSellRequest = 1`;

        mysql.executeSQLStatement(sql, []).then((result) => {
                res.render('admin/public/order', {
                    newPropertyReceivedAlerts: result[0],
                    newPropertyReceivedAlertsBlockchain: result[1],
                    newPropertySellReceivedAlerts: result[2],
                    newPropertySellReceivedAlertsBlockchain: result[3],
                    isSellBackEnabled: global.config.isSellBackEnabled,
                    csrfToken: req.csrfToken(),
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials(),
                    ShareCountInFractions: global.config.ShareCountInFractions
              });
        }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in currentOrders`);
        });
  },

    searchInvestorjson(req, res) {
        const preparedSQL = common.getInvestorSearchSQL(common.getInvestorSearchSQLSearchCritetia(req, false), req);

        mysql.executeSQLStatement("select i.id, firstname, lastname, country, town, email, companyname, investortype " + preparedSQL.sql, preparedSQL.data).then((result) => {
            res.json(result);
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in searchInvestorjson`);
        });

    },
    searchInvestorcountjson(req, res) {
        const preparedSQL = common.getInvestorSearchSQL(common.getInvestorSearchSQLSearchCritetia(req, false), req);

        mysql.executeSQLStatement("select count(*) as count " + preparedSQL.sql, preparedSQL.data).then((result) => {
            res.json({"count":result[0].count});
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in searchInvestorcountjson`);
        });
    },

    bulkWhitelistAddressList(req, res) {

        const protocols = common.getEthereumBasedProtocolIDs();
        const tmpStr = "";
        for (var i=0; i < protocols.length; i++) {
            tmpStr = tmpStr + "," + protocols[i];
        }
        tmpStr = tmpStr.substring(1, tmpStr.length);

        mysql.executeSQLStatement("select b.ID, b.address, i.FirstName, i.LastName from bulkwhitelistingaddresses b, investor i where b.investorID = i.id; select title, ethereumContractAddress from sharetypes where blockchainProtocol in (" + tmpStr + ")").then((result) => {

            var strlist = "";
            result[0].forEach((obj)=> {
                strlist = strlist + "\"" + obj.address + "\","
            })
            strlist = strlist.substring(0, strlist.length-1);
            strlist = "[" + strlist + "]";

            res.render('admin/bulkWhitelisting', {
                records: result[0],
                tokens: result[1],
                tokenJSON: strlist,
                partials: common.getPartials(),
                Data: common.getCommonPageProperties(req),
                csrfToken: req.csrfToken()
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in searchInvestorcountjson`);
        });

    },
    addAddressToWhitelistedList(req, res) {

        mysql.executeSQLStatement("delete from bulkwhitelistingaddresses where address = ?", [req.query.address]).then((result) => {

            mysql.executeSQLStatement("insert into bulkwhitelistingaddresses(address, investorID) values (?, ?)", [req.query.address, req.query.id]).then((result) => {
                res.redirect("investorssto");
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in searchInvestorcountjson`);
            });

        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in searchInvestorcountjson`);
        });

    },
    deleteWhitelistAddress(req, res) {
        mysql.executeSQLStatement("delete from bulkwhitelistingaddresses where id = ?", [req.query.id]).then((result) => {
            res.redirect("bulkWhitelistAddressList");
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in searchInvestorcountjson`);
        });
    },
    clearwhitelistaddressesfromdb(req, res) {
        mysql.executeSQLStatement("delete from bulkwhitelistingaddresses ", []).then((result) => {
            res.redirect("bulkWhitelistAddressList");
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in searchInvestorcountjson`);
        });
    },
    processBulkWhitelistTransaction(req, res) {
        mysql.executeSQLStatement("select id from sharetypes where ethereumContractAddress = ?", [req.query.address]).then((result) => {

            const tmpShareTypeID = result[0].id;
            blockchainApi.waitForTransactionCompletion(req.query.transactionID, result[0].id).then((result) => {

                mysql.executeSQLStatement("select * from bulkwhitelistingaddresses", []).then((result) => {

                    var insertSQL = "";
                    result.forEach((obj) => {
                        insertSQL = insertSQL + `insert into shareswallet(investorID, sharesID, shares, publicKey, isBlocked) values('${obj.investorID}', '${tmpShareTypeID}', 0, '${obj.address}', 0);`
                    });

                    mysql.executeSQLStatement(insertSQL, []).then(() => {
                        mysql.executeSQLStatement("delete from bulkwhitelistingaddresses", []).then(() => {
                            console.log("Data processed   check now");
                        }).catch((error) => {
                            common.handleError(req, res, `${error.toString()} - Error occured in processBulkWhitelistTransaction 1`);
                        });                                                        
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in processBulkWhitelistTransaction 2`);
                    });

                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in processBulkWhitelistTransaction 3`);
                }); 

            })

        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured in processBulkWhitelistTransaction 5`);
        });

        req.flash('errorMessage', `Transaction is send. Please check results after some time`);
        res.redirect("investorssto");
    }

};

router.get('/createdir', common.isAdminUserAuthenticated, sto.createdir);
router.get('/changeDirectoryName', common.isAdminUserAuthenticated, sto.changeDirectoryName);
router.get('/backdir', common.isAdminUserAuthenticated, sto.backdir);
router.get('/doc', common.isAdminUserAuthenticated, sto.doc);
router.post('/docpost', common.isAdminUserAuthenticated, sto.docpost);
router.post('/docfieldpost', common.isAdminUserAuthenticated, sto.docfieldpost);
router.post('/sharePurchaseDocSettings', common.isAdminUserAuthenticated, sto.sharePurchaseDocSettings);
router.post('/setDocumentCountriesWhitelist', common.isAdminUserAuthenticated, sto.setDocumentCountriesWhitelist);
router.post('/setDocumentInvestorTypeWhitelist', common.isAdminUserAuthenticated, sto.setDocumentInvestorTypeWhitelist);
router.get('/deletedocfield', common.isAdminUserAuthenticated, sto.deletedocfield);
router.get('/docdelete', common.isAdminUserAuthenticated, sto.docdelete);
router.get('/deletedir', common.isAdminUserAuthenticated, sto.deletedir);
router.get('/senddoc', common.isAdminUserAuthenticated, sto.senddoc);
router.get('/senddoccontracts', common.isAdminUserAuthenticated, sto.senddoccontracts);
router.post('/senddocpost', common.isAdminUserAuthenticated, sto.senddocpost);
router.get('/viewsenddoccontracts', common.isAdminUserAuthenticated, sto.viewsenddoccontracts);
router.get('/settleinvestorDocumentContract', common.isAdminUserAuthenticated, sto.settleinvestorDocumentContract);
router.get('/viewcontract', common.isAdminUserAuthenticated, sto.viewcontract);
router.get('/activatedirectoryforinvestoreview', common.isAdminUserAuthenticated, sto.activatedirectoryforinvestoreview);
router.get('/viewdocdocumentcomment', common.isAdminUserAuthenticated, sto.viewdocdocumentcomment);
router.get('/doccommentoffer', common.isAdminUserAuthenticated, sto.doccommentoffer);
router.post('/documentoffersubmit', common.isAdminUserAuthenticated, sto.documentoffersubmit);
router.post('/sendDocumentResponse', common.isAdminUserAuthenticated, sto.sendDocumentResponse);
router.post('/fileUploadinDirectory', common.isAdminUserAuthenticated, sto.fileUploadinDirectory);
router.get('/deleteFileFromDirectory', common.isAdminUserAuthenticated, sto.deleteFileFromDirectory);
router.get('/downloadUploadedDocFile', common.isAdminUserAuthenticated, sto.downloadUploadedDocFile);

router.get('/adddividend', common.isAdminUserAuthenticated, sto.adddividend);
router.post('/adddividendpost', common.isAdminUserAuthenticated, sto.adddividendpost);
router.get('/listdividend', common.isAdminUserAuthenticated, sto.listdividend);
router.post('/deleteDividend', common.isAdminUserAuthenticated, sto.deleteDividend);
router.get('/viewdividenddetails', common.isAdminUserAuthenticated, sto.viewdividenddetails);
router.get('/viewdividend', common.isAdminUserAuthenticated, sto.viewdividend);
router.post('/dividendpayment', common.isAdminUserAuthenticated, sto.dividendpayment);
router.get('/dividendinvestors', common.isAdminUserAuthenticated, sto.dividendinvestors);
router.get('/viewdividendinvestors', common.isAdminUserAuthenticated, sto.viewdividendinvestors);

router.get('/currentOrders', common.isAdminUserAuthenticated, sto.currentOrders);
router.get('/searchInvestorjson', common.isAdminUserAuthenticated, sto.searchInvestorjson);
router.get('/searchInvestorcountjson', common.isAdminUserAuthenticated, sto.searchInvestorcountjson);

router.get('/bulkWhitelistAddressList', common.isAdminUserAuthenticated, sto.bulkWhitelistAddressList);
router.get('/addAddressToWhitelistedList', common.isAdminUserAuthenticated, sto.addAddressToWhitelistedList);
router.get('/deleteWhitelistAddress', common.isAdminUserAuthenticated, sto.deleteWhitelistAddress);
router.get('/clearwhitelistaddressesfromdb', common.isAdminUserAuthenticated, sto.clearwhitelistaddressesfromdb);
router.get('/processBulkWhitelistTransaction', common.isAdminUserAuthenticated, sto.processBulkWhitelistTransaction);


module.exports = router;


    /*listofcurrentoffers(req, res) {
        common.checkUserAuthorizationForModuleSTO(req, res, 37);
        var params = {};
        function getDatabaseInformation(callback) {
            var sql = "select ID, documentid, title, DATE_FORMAT(datefrom,'%M %d %Y') as datefrom, DATE_FORMAT(datato,'%M %d %Y') as datato from documentofferinvestor where stoid = ?";
            mysql.executeSQLStatement(sql, [req.session.stoid]).then((result) => {
                params.records = result;

                result.forEach(function(rec) {
                    rec.open = common.checkTimePeriod(rec.datefrom, rec.datato);
                });

                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in listofcurrentoffers getDatabaseInformation`);
            });
        }
        async.waterfall([
            getDatabaseInformation
        ], function (err) {
                res.render('admin/documents/offerlists', {
                    records: params.records,
                    Data: common.getCommonPageProperties(req),
                    partials: common.getPartials()
                });
        });
    },*/
