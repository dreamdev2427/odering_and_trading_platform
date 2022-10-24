'use strict';

import { updateBlockPassDataMiddleWare, queryBlockPassForInvestorData } from "../services/investorClient/externalKyc/blockPass/BlockPassService";
import registerAffiliateInvestorFromEmail from './investors/affiliateCtl/registerAffiliateInvestorFromEmail';
import * as priceOracle from '../services/platform/price-oracle/controller';
import * as emailTextsController from '../services/platform/emails/controllers/EmailTexts.controller';
import getSTOFromConfig, { getSTOFromConfigByHostname } from '../services/getSTOFromConfig';
import VersionRedirect from '../modules/VersionRedirect';

const express = require('express');

const router = express.Router();
const fs = require('fs-extra');
const async = require('async');
const formidable = require('formidable');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');
const request = require('request');
const mysql = require('../modules/mysql');
const common = require('../modules/common');
const emailTexts = require('../data/text.json');
const logger = require('../logger');
const ethereumApi = require('../modules/ethereum');
const blockchainApi = require('../modules/blockchain');
import {round} from "mathjs";
import * as math from "mathjs";
import wallet from './investors/paymentsCtl/wallet';
import { getSumSubAccessTokenForInvestor } from "../services/investorClient/externalKyc/sumsub/SumSubService";
import accreditationMiddleware from "./investorClient/accreditation/accreditationMiddleware";
import ExternalKycService from "../services/investorClient/externalKyc/ExternalKycService";
import { getMercuryParam } from "../services/mercury/defs";
import getMercuryAccountInfo from "../services/mercury/getMercuryAccountInfo";
import EmailSendingService from "../services/investorClient/email/EmailSendingService";
import SharePurchaseDocumentsSqlService
  from "../services/investorClient/sharePurchaseDocuments/data/SharePurchaseDocumentsSqlService";
import { getQueryfactory } from "../services/investorClient/documents/data/SqlQuery";
import SharePurchaseDocumentsService
  from "../services/investorClient/sharePurchaseDocuments/SharePurchaseDocumentsService";
import InvestorBuyPropertyAlertSqlService
  from "../services/investorClient/sharePurchaseDocuments/data/InvestorBuyPropertyAlertSqlService";
import { Type } from "../services/platform/fees/IFeeService";
import applyFee from "../controllers/admin/feesCtl/applyFee";

const clientinvestor = {
    login2(req, res) {
        if(req.session.user) {
            res.render('investors/login2', {
                CustomPlatformCSSStyles: global.config.CustomPlatformCSSStyles,
                csrfToken: encodeURI( req.csrfToken() ),
                Message: req.flash('Message'),
                logo: global.config.stos[req.hostname].logo
            });
        } else
            res.redirect("login");
    },
    login2post(req, res) {
        if(req.session.user) {
            if(req.session.user.AuthCode == req.body.txtCode) {
                req.session.user.AuthCode = 0;
                res.redirect("dashboard");
            } else {
                res.redirect("login2");
            }
        } else
            res.redirect("login");
    },
    commonredirect(req, res) {
        /*
            SingleSignInEnabled
            InvestorCombinePropertiesMode
            SSOModeEnabled
        */
        try {
            const obj = common.getGloablSTORecordWithID(req.session.user.investorSTOs[0].id);
            const stolink = global.config.areSTOHostnamesEnabled ? obj.stolinkfull : "";

            if(global.config.InvestorCombinePropertiesMode == 1) {

                //common redirect means the investor always get register in STO 0    so make sure his isKYC is marked as 1 otherwise he is not yet gone through KYC process and redirect him to KYC steps
                mysql.executeSQLStatement(`select iskyc from investorsto where investorid = ${req.session.user.ID} and stoid = 0`, []).then((data) => {

                    if (data[0].iskyc === 0) {
                        res.redirect('/wizard?step=0');
                    } else {

                            if(req.query.propertyId != "0") {
                                    const sql = 'select id from stos where externalSystemID = ?'; 
                                    mysql.executeSQLStatement(sql, [req.query.propertyId]).then((result) => { 
                                        if(result.length == 0)
                                            res.redirect(  "/dashboard"  );
                                        else
                                            res.redirect("/buycombineproperty?id=" + result[0].id  );

                                    }).catch((error) => { 
                                        common.handleError(req, res, `${error.toString()} - Error occured in commonredirect`); 
                                    }); 
                            } else
                                    res.redirect(  stolink + "/dashboard"  );
                    }

                }).catch(
                (error) => {
                    common.handleError(req, res, `${error.message} - Error occured in commonredirect`);
                });
            } else {
                    res.redirect(  stolink + "/dashboard"  );
            }
        } catch(error){
            common.handleError(req, res, `${error.message} - Error occured in commonredirect`);
        }

    },
    investortypeselect(req, res) {
            const obj = common.getGloablSTORecordWithID(0);

            res.render('investors/investortypeselect', {
                    logo: obj.logo,
                    csrfToken: encodeURI( req.csrfToken() ),
                    partials: common.getInvestorRegisterPartials(),
                    Data: common.getCommonInvestorNotLoginPageProperties(req),
            });

    },
    investortypeselectpost(req, res) {
        // this interface will only trigger once when users is first time redirected from
        // external serveice through Cognito interface and must be registered in the system with this
        // email address
        const params = {};

        async.waterfall ( [
            function checkValidRedirect(callback) {
                if(req.session.email == null)
                    common.handleError(req, res, `${error.message} - Error occured in investortypeselectpost checkValidRedirect Session variables are `);
                else
                    callback(null);

            },
            function checkInvestorRecordAlredyExists(callback) {
                // which registration is this???
                const sql = "select * from investor where email = ?";

                mysql.executeSQLStatement(sql, [req.session.email]).then((result) => {
                    if(result.length > 0)
                        res.redirect(  `/investorsessionlogin`  )
                    else
                        callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} - Error occured in investortypeselectpost createNewInvestorRecordAfterVetification`);
                });
            },
            function createNewInvestorRecordAfterVetification(callback) {
                // which registration is this???
                const sql = "Insert into investor(Firstname, Lastname, email, password, Address, zip, town, country, phone, cell, PassportNumber, NationalID, investorType, CompanyName) values(?, ?, ?, ?, '', '', '', '', '', '', '', '', ?, ?)";

                mysql.executeSQLStatement(sql, [req.session.firstName, req.session.lastName, req.session.email, common.getSHA256Hash("4747384734873483"), req.query.val, ""]).then((result) => {
                    params.newID = result.insertId;

                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} - Error occured in investortypeselectpost createNewInvestorRecordAfterVetification`);
                });
            },
            function registerAffiliate(callback) {
                // Does nothing if disabled
                //registerAffiliateInvestorFromEmail(req.session.email);
                callback(null);
            },
            function createNewKYCRecord(callback) {
                const sql = 'Insert into kyc(InvestorID, KYC) values(?, ?)';
                mysql.executeSQLStatement(sql, [params.newID, '{}']).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in investortypeselectpost createNewKYCRecord`);
                });
            },
            function createInvestorSTORecord(callback) {
                const sql = 'Insert into investorsto(InvestorID, stoid, expectedShares, expectedInvestment, isKYC, KYCApplied, KYCUpdateDate, KYCCurrentStatus) values(?, ?, 0, 0, 0, 0, now(), 0)';
                mysql.executeSQLStatement(sql, [params.newID, 0]).then((result) => {
                        res.redirect(  `/investorsessionlogin`  )
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in investortypeselectpost createInvestorSTORecords`);
                });
            }
        ]);

    },

	register(req, res) {
        if (VersionRedirect.toV2(req, res))
            return;

        const sql = 'select registrationtext from stos where id = ?';
        mysql.executeSQLStatement(sql, [global.config.stos[req.hostname].stoid]).then((result) => {
            res.render('investors/register', {
                    csrfToken: encodeURI( req.csrfToken() ),
                    registrationtext: result[0].registrationtext,
                    partials: common.getInvestorRegisterPartials(),
                    userNameTaken: req.flash('UserNameTaken'),
                    firstName: req.flash('Firstname'),
                    lastName: req.flash('Lastname'),
                    InvestorCategory: global.config.stos[req.hostname].settings.InvestorCategory,
                    Data: common.getCommonInvestorNotLoginPageProperties(req),
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.message} - Error occured in register`);
        });
	},
    registerPost(req, res) {
        let registrationID;
		function checkInvestorUsernameTaken(callback) {
			const params = { email: req.body.email };

            var errors = "";
            if(req.body.firstname == "" || req.body.firstname.length > 60 || req.body.firstname.length < 2)
                errors = errors + "First Name is required and min 2 and max 60 characters";
            if(req.body.lastname == "" || req.body.lastname.length > 60 || req.body.lastname.length < 2)
                errors = errors + "Last Name is required and min 2 and max 60 characters";
            if(req.body.email == "" || req.body.email.length > 70)
                errors = errors + "Email is required, or email is not in correct format";
            if(req.body.password == "" || req.body.password.length < 10 || req.body.password.length > 100)
                errors = errors + "password is required or it is not between 10 and 100 characters long";
            if(req.body.retypepassword == "" || req.body.retypepassword.length < 10 || req.body.retypepassword.length > 100)
                errors = errors + "retype password is required or it is not between 10 and 100 characters long";
            if( !validator.isEmail(req.body.email) )
                errors = errors + "<li>Email address is not valid</li>";

            if(errors != "") {
                common.handleError(req, res, `${errors} - Post data validation error occured in registerPost`);
                return;
            } else {

					if(global.config.SingleSignInEnabled == 1) {
						mysql.executeSQLStatement('select id from investor where email = ?', [req.body.email]).then((result) => {
							if (result.length !== 0)
								return res.redirect(`/accountalreadytaken?email=${req.body.email}`);
							else
								callback(null);
						}).catch((error) => {
							common.handleError(req, res, `${error.message} Error occured in registerPost checkInvestorUsernameTaken`);
						});
					} else {
						mysql.getInvestorRecordFromDatabase(params, req).then((data) => {
							if (data.length !== 0) {
								req.flash('UserNameTaken', 'Somebody has already used this email address. Please select another one');
								req.flash('Firstname', req.body.firstname);
								req.flash('Lastname', req.body.lastname);
								return res.redirect('/register');
							} else {
								callback(null);
								return null;
							}
						}, (err) => {
							common.handleError(req, res, `${err.message} - Error occured in registerPost checkInvestorUsernameTaken`);
						});
					}
			}
		}
        function updateEmailTexts(callback) {
            emailTextsController.getEmailTexts(+(global.config.stos[req.hostname].stoid))
            .then(() => callback(null))
            .catch((e) => common.handleError(req, res, `Error in registerPost updateEmailTexts\n${e.stack}`))
        }
		function checkTempRegisterTableForNewInvestorRecord(callback) {
            var stml = "";
            if(global.config.SingleSignInEnabled == 1)
                stml = `Select * from register where email = ?`;
            else
                stml = `Select * from register where email = ? and stoid = ${global.config.stos[req.hostname].stoid}`;

            mysql.executeSQLStatement(stml, [req.body.email]).then((data) => {
					if (data.length !== 0) {
                        const stoEmails = emailTextsController.default.globalEmailTexts();
                        let txtEmail = emailTextsController.format(
                            stoEmails.RegistrationEmailText.Line1,
                            {
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                link: `${global.config.stos[req.hostname].stolinkfull}/verificationcode`,
                                code: data[0].secret,
                            });
                        txtEmail += '<br /><br />';
                        txtEmail += global.config.stos[req.hostname].emailFooter;

						common.sendEmail(req.hostname, req.body.email, emailTexts.RegistrationEmailText.Subject, txtEmail, []).then(() => {
				            req.flash('UserNameTaken', 'This email was used to register with us previously. We re-send your security code / password in your email. Please check your email inbox now');
				            req.flash('Firstname', req.body.firstname);
				            req.flash('Lastname', req.body.lastname);
				            return res.redirect('/register');
				        }, (err) => {
				            common.handleDebug(req, `${err.message} - Error occured in registerPost checkTempRegisterTableForNewInvestorRecord`);

				            req.flash('UserNameTaken', 'This email was used to register with us previously. There is an error sending email with verification code so please try again');
				            req.flash('Firstname', req.body.firstname);
				            req.flash('Lastname', req.body.lastname);
				            return res.redirect('/register');
				        });
					} else { callback(null); }
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in registerPost checkTempRegisterTableForNewInvestorRecord`);
            });
		}
		function saveNewInvestorGetStartedRequest(callback) {
			const code = Math.floor(Math.random() * Math.floor(99999));
			const sql = `Insert into register(CompanyName, FirstName, LastName, Email, Password, secret, investorType, stoid, referByInvestorID, dateregister) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

			var referID = "0";
			if( req.body.referalID != null )
				referID = req.body.referalID;
            const date = new Date();
            const dateString = date.toISOString().slice(0, 19).replace('T', ' ');
			mysql.executeSQLStatement(sql, [req.body.companyName, req.body.firstname, req.body.lastname, req.body.email, common.getSHA256Hash(req.body.password), code, req.body.investorType, global.config.stos[req.hostname].stoid, referID, dateString])
                .then((result) => {
                         registrationID = result.insertId;
                      const stoEmails = emailTextsController.default.globalEmailTexts();
                      let txtEmail = emailTextsController.format(
                          stoEmails.RegistrationEmailText.Line1,
                          {
                              firstname: req.body.firstname,
                              lastname: req.body.lastname,
                              link: `${global.config.stos[req.hostname].stolinkfull}/verificationcode?registrationID=${result.insertId}`,
                              code,
                          });
                      txtEmail += '<br /><br />';
                      txtEmail += global.config.stos[req.hostname].emailFooter;

                      common.sendEmail(req.hostname, req.body.email, emailTexts.RegistrationEmailText.Subject, txtEmail, [])
                      .then(() => {
                          callback(null);
                      }, (err) => {
                          common.handleDebug(req, `${err.message} Error occured in registerPost saveNewInvestorGetStartedRequest`);
                          callback(null);
                      });
				}).catch((error) => {
					common.handleError(req, res, `${error.message} Error occured in registerPost saveNewInvestorGetStartedRequest`);
				});
		}
		async.waterfall([
			checkInvestorUsernameTaken,
            updateEmailTexts,
			checkTempRegisterTableForNewInvestorRecord,
			saveNewInvestorGetStartedRequest,
		], (err) => { if (!err) res.redirect(`/verificationcode?registrationID=${registrationID}`); });
	},
    accountalreadytaken(req, res) {
        res.render('investors/accountalreadytaken', {
            logo: global.config.stos[req.hostname].logo,
            link: global.config.stos[req.hostname].stolinkfull,
            title: global.config.stos[req.hostname].title,
            partials: common.getInvestorRegisterPartials()
        });
    },

	verificationcode(req, res) {

            mysql.executeSQLStatement('select SMTP_FromAddress from stos where id = ?', [global.config.stos[req.hostname].stoid]).then((result) => {
                            res.render('investors/secretcode', {
                                SMTP_FromAddress: result[0].SMTP_FromAddress,
                                csrfToken: encodeURI( req.csrfToken() ),
                                Message: req.flash('Message'),
                                registrationID: req.query.registrationID,
                                partials: common.getInvestorRegisterPartials(),
                                Data: common.getCommonInvestorNotLoginPageProperties(req),
                            });

            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in registerPost checkInvestorUsernameTaken`);
            });

	},
	verificationcodePost(req, res) {

        var errors = "";
        if( req.body.email.length > 70 )
            errors = errors + "email must be 70 character or less";
        if( req.body.password.length > 100 )
            errors = errors + "password must be 100 characters or less";
        if( req.body.secretcode.length > 15)
            errors = errors + "secretcode  must be 15 character or less";

        if(errors != "") {
            common.handleError(req, res, `${errors} - Post data validation error occured in secretcodePost`);
            return;
        }  else {

				function getNewInvestorGettingStartedDataFromDatabase(callback) {
					const sql = 'select * from register where email = ? and password = ? and secret = ?';
					mysql.executeSQLStatement(sql, [req.body.email, common.getSHA256Hash(req.body.password), req.body.secretcode])
						.then((result) => {
							if (result.length === 0) {
								req.flash('Message', '<li>Username, password or verification code do not match</li>');
								return res.redirect(`/verificationcode?registrationID=${req.body.registrationID}`);
							}

							if (result[0].stoid != global.config.stos[req.hostname].stoid) {
								req.flash('Message', '<li>We did not found your record in this STO</li>');
								return res.redirect(`/verificationcode?registrationID=${req.body.registrationID}`);
							}

							const params = {};
							params.newRec = result[0];
							callback(null, params);
							return null;
						})
						.catch((error) => {
							common.handleError(req, res, `${error.message} - Error occured in secretcodePost getNewInvestorGettingStartedDataFromDatabase`);
						});
				}
				function createNewInvestorRecordAfterVetification(params, callback) {
					// registration process
					const sql = "Insert into investor(Firstname, Lastname, email, password, Address, zip, town, country, phone, cell, PassportNumber, NationalID, investorType, CompanyName, referByInvestorID) values(?, ?, ?, ?, '', '', '', '', '', '', '', '', ?, ?,?)";

					mysql.executeSQLStatement(sql, [params.newRec.FirstName, params.newRec.LastName, params.newRec.Email, params.newRec.Password, params.newRec.investorType, params.newRec.CompanyName, params.newRec. referByInvestorID]).then((result) => {
						params.newID = result.insertId;
						callback(null, params);
					}).catch((error) => {
						common.handleError(req, res, `${error.message} - Error occured in secretcodePost createNewInvestorRecordAfterVetification`);
					});
				}
                function checkBrokerID(params, callback) {
                    /* Invited by a Broker */
                    if (params.newRec.brokerID) {
                        const sql = 'INSERT INTO investor_brokers (investorID, brokerID) VALUES (?, ?)';
					    mysql.executeSQLStatement(sql, [params.newID, params.newRec.brokerID]).then((result) => {
                            applyFee(Type.Registration, params.newID, params.newRec.stoid, 0, 0).then((result) => {
                                callback(null, params);
                            }).catch((error) => {
                                common.handleError(req, res, `${error.message} Error Occurred in investors/verify > checkBrokerID > applyFee`);
                            });
					    }).catch((error) => {
						    common.handleError(req, res, `${error.message} Error Occurred in investors/verify > checkBrokerID`);
					    });
                    } else {
                        callback(null, params);
                    }
				}
				function createNewKYCRecord(params, callback) {
					const sql = 'Insert into kyc(InvestorID, KYC) values(?, ?)';
					mysql.executeSQLStatement(sql, [params.newID, '{}']).then((result) => {
						callback(null, params);
					}).catch((error) => {
						common.handleError(req, res, `${error.message} Error occured in secretcodePost createNewKYCRecord`);
					});
				}
				function createInvestorSTORecord(params, callback) {
					const sql = 'Insert into investorsto(InvestorID, stoid, expectedShares, expectedInvestment, isKYC, KYCApplied, KYCUpdateDate, KYCCurrentStatus) values(?, ?, 0, 0, 0, 0, now(), 0)';
					mysql.executeSQLStatement(sql, [params.newID, global.config.stos[req.hostname].stoid]).then((result) => {
						callback(null, params);
					}).catch((error) => {
						common.handleError(req, res, `${error.message} Error occured in secretcodePost createInvestorSTORecords`);
					});
				}
				function deleteOldRegisterRecord(params, callback) {
					const sql = 'Delete from register where id = ?';

					mysql.executeSQLStatement(sql, [params.newRec.ID]).then(() => {
						callback(null, params);
					}).catch((error) => {
						common.handleError(req, res, `${error.message} Error occured in secretcodePost deleteOldRegisterRecord`);
					});
				}
				function registerAffiliate(params, callback) {
					// Does nothing if disabled
					registerAffiliateInvestorFromEmail(params.newRec.Email);
					callback(null, params);
				}
				async.waterfall([
					getNewInvestorGettingStartedDataFromDatabase,
					createNewInvestorRecordAfterVetification,
                    checkBrokerID,
					registerAffiliate,
					createNewKYCRecord,
					createInvestorSTORecord,
					deleteOldRegisterRecord,
				], (err, params) => {
					if (!err) {
						res.render('investors/verify', {
							partials: common.getInvestorRegisterPartials(),
							Data: common.getCommonInvestorNotLoginPageProperties(req),
						});
					} else {
						common.handleError(req, res, `${err.message} - Error occured in registerPost`);
					}
				});
		}
	},

	dashboard(req, res) {
        function getInvestorLanguage(callback) {
            if(req.cookies['locale'] == null) {
                  const sql = 'select language from investor where id = ?'; 
                  mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => { 
                      res.cookie('locale', result[0].language, { maxAge: 900000, httpOnly: true });
                      res.redirect("/dashboard")
                  }).catch((error) => { 
                      common.handleError(req, res, `${error.toString()} - Error occured `); 
                  });
            } else
                callback(null);
        }
		function getInvestorDatabaseInformation(callback) {
			const params = { id: req.session.user.ID };
			mysql.getInvestorRecordFromDatabase(params, req).then((data) => {
                if (data[0].isKYC === 0) { return res.redirect('/wizard?step=0'); }
                params.InvestorRec = data[0];
                callback(null, params);
            },
            (error) => {
                common.handleError(req, res, `${error.message} - Error occured in dashboard getInvestorDatabaseInformation`);
            });
		}
        function redirectAccordingToInvestorCombinePropertiesMode(params, callback) {
            if(global.config.InvestorCombinePropertiesMode == 0)
                callback(null, params);
            else
                res.redirect("/activeproperties");
        }
        function getOtherDBData(params, callback) {
              //check investor is registered investor
              var sqlinvestorcontract = "";
              //if( global.config.stos[req.hostname].stoinvestortypes.includes(params.InvestorRec.KYCCurrentStatus) )
                //  sqlinvestorcontract = " or investorStatusID = -1";

			  const sql = `Select u.ID, u.TITLE, DATE_FORMAT(UpdateDate,'%M %d %Y') as UpdateDate from updates u where u.stoid = ${global.config.stos[req.hostname].stoid} Order by ID desc limit 0, 5\
              ;\
              select * from changeaddresserequest where InvestorID = ${req.session.user.ID} and stoid = ${global.config.stos[req.hostname].stoid}\
              ;\
              Select p.ID as shareTypeID, s.ID as investorShareID, p.title, p.nominalValue, p.premimum, s.isBlockchainAuthorized, s.isBlockchainFrozen, s.PublicKey, s.shares, p.isblockchain, p.currencyid from shares s, sharetypes p where s.investorID = ${req.session.user.ID} and s.shareTypeid = p.id and s.shares > 0 and p.stoid = ${global.config.stos[req.hostname].stoid}\
              ;\
              select DATE_FORMAT(inv.DateTime,'%M %d %Y') as DateTime, inv.TokensTransferred, inv.AmountInvested, inv.Description, inv.CurrencyID, cur.Abbreviation, st.title from investments inv, currency cur, sharetypes st where st.id = inv.sharetypeid and investorid = ${req.session.user.ID} and inv.CurrencyID = cur.ID and  inv.stoid = ${global.config.stos[req.hostname].stoid} Order by inv.DateTime DESC \
              ;\
              select *, (select count(*) from documentuser u where investorID=${req.session.user.ID} and d.id = u.documentofferinvestorid and u.DocumentStatus = 2 ) as count, (select count(*) from documentuser u where investorID=${req.session.user.ID} and d.id = u.documentofferinvestorid and u.DocumentStatus = 3) as settledContract from documentofferinvestor d where d.DateFrom <= Date(now()) and d.DataTo >= Date(now()) and stoid = ${global.config.stos[req.hostname].stoid}  \
              ;\
              select ID, title, isactiveforinvestorsType, isactiveforinvestorsNames from documents where stoid = ${global.config.stos[req.hostname].stoid} and isactiveforinvestors = 1 and filetype = 0; \
              \
              select i.id, s.title, s.logo from investorinvitation i, stos s where i.stoid = s.id and i.email = ?; \
              \
              select id, currencyIDRequested, paymentRequested, DATE_FORMAT(PaymentSendDate,'%M %d %Y') as PaymentSendDate from paymentinvestors where isSettled = 0 and investorid=${req.session.user.ID}  and stoid = ${global.config.stos[req.hostname].stoid};  \
              \
              select  COALESCE(SUM(shares),0) as sum from shares where stoid = ${global.config.stos[req.hostname].stoid} and investorID = ${req.session.user.ID}`;

			  mysql.executeSQLStatement(sql, [params.InvestorRec.email]).then((result) => {

                  params.ShowDocumentContractOfferSection = 0;
                  result[4].forEach((rec) => {
                      if( common.checkInvestorFallInCategory(rec.InvestorsName, rec.investorStatusID, (params.InvestorRec.FirstName + " " + params.InvestorRec.LastName).toLowerCase(), params.InvestorRec.KYCCurrentStatus, req.hostname) ) {
                          rec.showForInvestor = 1;
                          params.ShowDocumentContractOfferSection = 1;
                      } else
                          rec.showForInvestor = 0;
                  });

                  params.ShowDocumentCommentsSection = 0;
                  result[5].forEach((rec) => {
                      if( common.checkInvestorFallInCategory(rec.isactiveforinvestorsNames, rec.isactiveforinvestorsType, (params.InvestorRec.FirstName + " " + params.InvestorRec.LastName).toLowerCase(), params.InvestorRec.KYCCurrentStatus, req.hostname) ) {
                          rec.showForInvestor = 1;
                          params.ShowDocumentCommentsSection = 1;
                      } else
                          rec.showForInvestor = 0;
                  });

				  params.updateRecords = result[0];
                  params.investorSharesRecs = result[2];
                  params.transactionsRecs = result[3];
                  params.documensOfferRecs = result[4];
                  params.documentforreview = result[5];
                  params.invitations = result[6];
                  params.paymentAlerts = result[7];
                  params.investorTotalNumberOfShares = result[8][0].sum;

				  callback(null, params);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} - Error occured in dashboard getDatabaseInformation`);
			  });
		  }
        function getVotingInfo(params, callback) {

            if(params.investorTotalNumberOfShares > 0) {
                    const sql = `select v.id, v.title, DATE_FORMAT(opendate,'%M %d %Y') as opendate, DATE_FORMAT(closedate,'%M %d %Y') as closedate from voting v where v.opendate <= Date(now()) and v.closedate >= Date(now()) and v.stoid = ${global.config.stos[req.hostname].stoid} and v.type=0\
                    ;\
                    select v.id, v.title, DATE_FORMAT(v.opendate,'%M %d %Y') as opendate, DATE_FORMAT(date_add(opendate, interval v.timepadding minute), '%H:%i') as starttime, DATE_FORMAT(date_add(closedate, interval v.timepadding minute), '%H:%i') as closetime, place, z.timezone from voting v, timezone z where v.timezoneid = z.id and v.opendate is not null and v.closedate >= now() and v.stoid = ${global.config.stos[req.hostname].stoid} and v.type=1`;

                    mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => {
                        params.votingRec = result[0];
                        params.meetingRec = result[1];
                        callback(null, params);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.message} - Error occured in dashboard getVotingInfo`);
                    });
            } else {
                params.votingRec = [];
                params.meetingRec = [];
                callback(null, params);
            }

        }
        function getInvestorPageData(params, callback) {
            common.getCommonInvestorDashboardPageProperties(req, res)
            .then((data) => {
                params.Data = data;
                callback(null, params);
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in dashboard getInvestorPageData`);
            });
        }
		async.waterfall([
            getInvestorLanguage,
			getInvestorDatabaseInformation,
            redirectAccordingToInvestorCombinePropertiesMode,
			getOtherDBData,
            getVotingInfo,
            getInvestorPageData
		], (err, params) => {

			res.render('investors/dashboard', {
                changeKeyRequestRec: params.changeKeyRequestRec,
				authType: common.getAuthorizationType(params.InvestorRec.KYCCurrentStatus),
				investorRec: params.InvestorRec,
                updateRecords: params.updateRecords,
				partials: common.getInvestorDashboardPartials(),
				Data: params.Data,
				newContracts: params.newContracts,
                investorSharesRecs: params.investorSharesRecs,
                message: req.flash('message'),
                votingRec: params.votingRec,
                meetingRecCount:params.meetingRec.length,
                meetingRec: params.meetingRec,
                documentforreview: params.documentforreview,
                ShowDocumentCommentsSection: params.ShowDocumentCommentsSection,
                documensOfferRecs: params.documensOfferRecs,
                ShowDocumentContractOfferSection: params.ShowDocumentContractOfferSection,
                stoid: global.config.stos[req.hostname].stoid,
                transactionsRecs: params.transactionsRecs,
                logo: global.config.stos[req.hostname].logo,
                invitations: params.invitations,
                paymentAlerts: params.paymentAlerts,
			});
		});
	},
    viewInvitationsFromOtherCompany(req, res) {
        const params = {};

		function getInvestorDatabaseInformation(callback) {
			  const sql = `Select email from investor where id = ?`;
			  mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => {
				  params.email = result[0].email;
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in viewInvitationsFromOtherCompany getDatabaseInformation`);
			  });
		}
        function getDatabaseInformation(callback) {
			  const sql = `Select * from investorinvitation where id = ? and email = ?`;
			  mysql.executeSQLStatement(sql, [req.query.id, params.email]).then((result) => {
				  params.record = result[0];
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in viewInvitationsFromOtherCompany getDatabaseInformation`);
			  });
        }
        function getInvestorPageData(callback) {
            common.getCommonInvestorDashboardPageProperties(req, res).then((data) => {
                params.Data = data;
                callback(null);
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in viewInvitationsFromOtherCompany getInvestorPageData`);
            });
        }
        async.waterfall([
            getInvestorDatabaseInformation,
			getDatabaseInformation,
            getInvestorPageData
        ], (err) => {
              if (!err) {
                res.render('investors/viewinvitation', {
                    record: params.record,
                    stoObj: common.getGloablSTORecordWithID(params.record.stoid),
                    csrfToken: encodeURI( req.csrfToken() ),
                    partials: common.getInvestorDashboardPartials(),
                    Data: params.Data,
                });
              }
        });

    },
    investorInvitationReaction(req, res) {
        const params = {};

		function getInvestorDatabaseInformation(callback) {
			  const sql = `Select email from investor where id = ?`;
			  mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => {
				  params.email = result[0].email;
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in investorInvitationReaction getDatabaseInformation`);
			  });
		}
        function setDatabaseInformation(callback) {
			  const sql = `update investorinvitation set currentStatus = ?, investorid = ? where id = ? and email = ?`;
			  mysql.executeSQLStatement(sql, [req.query.status, req.session.user.ID, req.query.id, params.email]).then((result) => {
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in investorInvitationReaction setDatabaseInformation`);
			  });
        }
        async.waterfall([
            getInvestorDatabaseInformation,
			setDatabaseInformation
        ], (err) => {
              if (!err) {
                  res.redirect("viewInvitationsFromOtherCompany?id=" + req.query.id);
              }
        });
    },
    viewInvestorWallet(req, res) {
        const params = {};

        async.waterfall([
            function fun1(callback) {
                  const sql = `select * from shares where investorid = ? and id = ? and stoid = ?`;
                  mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.id, global.config.stos[req.hostname].stoid]).then((result) => {
                      if(result.length === 0) {
                          common.handleError(req, res, `user ${req.session.user.ID} try to access a wallet of share class ${req.query.id} that he does not belong to him`);
						  return;
                      } else {
						  params.shareRec = result[0];
						  callback(null);
					  }
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in viewInvestorWallet`);
                  });
            },
            function fun2(callback) {
                  const sql = `select title, nominalValue, ethereumContractAddress, premimum, currencyid from sharetypes where id = ?; select * from shareswallet where sharesID = ?  and investorID = ${req.session.user.ID} `;
                  mysql.executeSQLStatement(sql, [params.shareRec.shareTypeid, params.shareRec.shareTypeid]).then((result) => {
                      params.shareTypeRec = result[0][0];
                      params.walletRec = result[1];
                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in viewInvestorWallet`);
                  });
            },
            function fun3(callback) {
                common.getCommonInvestorDashboardPageProperties(req, res).then((data) => {
                    res.render('investors/wallet', {
                        shareTypeRec: params.shareTypeRec,
                        walletRec: params.walletRec,
                        shareRec: params.shareRec,
                        partials: common.getInvestorDashboardPartials(),
                        Data: data,
                        ShareCountInFractions: global.config.ShareCountInFractions
                    });
                }, (err) => {
                    common.handleError(req, res, `${err.message} - Error occured in viewInvitationsFromOtherCompany getInvestorPageData`);
                });
            }
        ]);
    },
	investorWizard(req, res) {
        var currentPage = [];




        function loadSteps(callback) {

			const stmt = `Select steps from stos where id = ${global.config.stos[req.hostname].stoid}`;
			mysql.executeSQLStatement(stmt, []).then((result) => {
                currentPage = JSON.parse(result[0].steps).steps[req.query.step];

                const params = {
                    //title: currentPage.Title,
                    liID: currentPage.liID,
                    pageTemplate: currentPage.pageTemplate,
                };

                params.sideTitles = common.getKYCSideLinks(JSON.parse(result[0].steps));

                callback(null, params);
            }).catch((error) => {
				common.handleError(req, res, `${error.message}Error occured in investorWizard loadSteps`);
            });
        }
		function getInvestorDatabaseInformation(params, callback) {
			mysql.getInvestorRecordFromDatabase({ id: req.session.user.ID }, req).then((data) => {

				params.InvestorRecord = data[0];
				callback(null, params);
            },(error) => {
				common.handleError(req, res, `${error.message} - Error occured in investorWizard getInvestorDatabaseInformation`);
            });
		}
		function getInvestorKYCRecordFromDatabase(params, callback) {
			const stmt = 'Select * from kyc where investorID = ?';
			mysql.executeSQLStatement(stmt, [req.session.user.ID]).then((result) => {
                let kycdata = {};
                if (result[0] != null) {
				    kycdata = JSON.parse(result[0].kyc);
				    params.stepData = kycdata[currentPage.liID];
                    params.allStepsData = kycdata;
                } else {
                    params.stepData = {};
                }

                callback(null, params);
            }).catch((error) => {
				common.handleError(req, res, `${error.message}Error occured in investorWizard getInvestorKYCRecordFromDatabase`);
            });
		}
        function getCompanySpecificData(params, callback) {

            if(   parseInt( req.query.step ) === 2  &&  global.config.CurrentClientID === 2  ) {

                    /*var data = {}

                    var body = {
                            "investorType": {
                            "REG_S": "Regulation S (Investors outside the U.S.).Regulation S provides an SEC compliant way for US companies to raise capital from investors who are outside the U.S."
                            },
                            "investorSocialType": {
                            "INDIVIDUAL": "Individual"
                            },
                            "institutionalInvestorType": {},
                            "propertyClasses": {
                            "CLASS_A": "Class A",
                            "CLASS_B": "Class B"
                            },
                            "propertyTypes": {
                            "STUDENT_HOUSING": "Student housing",
                            "APARTMENTS": "Apartments"
                            },
                            "commercialRealEstateRate": {
                            "RANGE_1M_1_AND_HALF_M": "$1,000,000 – $1,500,000"
                            },
                            "riskTolerance": {
                            "MODERATE_AGGRESSIVE": "Moderately Aggressive: I am willing to accept high risk to my initial investment, including high volatility, to seek high returns over time, and understand I could lose a substantial amount of the money invested."
                            }
                        };

                    for (var key in body) {
                            if (body.hasOwnProperty(key)) {

                                data[ key ] = [];
                                var newObj = body[key]

                                for (var key2 in  newObj   )  {
                                        data[ key ].push (  newObj[key2]    )
                                }

                            }
                        }

                    params.clientSPecificData = data;
                    callback(null, params);*/

                common.getRedSwanAccessToken(req).then((data) => {

                        request.post(
                                {  url: global.config.ExternalAPILink + "/users/questionnaire",
                                    headers: { 'content-type': 'application/json',  'x-integrator-token':  data.idToken},
                                    json: {"email": params.InvestorRecord.email}
                                },
                                function(err,httpResponse, body) {


                                        if(!err) {
                                            var data = {};

                                            for (var key in body) {
                                                    if (body.hasOwnProperty(key)) {

                                                        data[ key ] = [];
                                                        var newObj = body[key]

                                                        for (var key2 in  newObj   )  {
                                                                data[ key ].push (  newObj[key2]    )
                                                        }

                                                    }
                                                }

                                            params.clientSPecificData = data;
                                            callback(null, params);
                                        } else {

                                            logger.error(`Error in RedSwan Access Login - ${error.message}`);
                                            params.clientSPecificData = {};
                                            callback(null, params);
                                        }

                                }
                        );

                }).catch((error) => {
                    logger.error(`Error in RedSwan SSO Access Login - ${error.message}`);
                    params.clientSPecificData = {};
                    callback(null, params);
                });

            } else {
                params.clientSPecificData = {};
                callback(null, params);
            }

        }
        async function getBlockPassIvenstorData(params, callback) {

            if (global.config.KycProvider === 1){
                try {
                    const stoId = global.config.stos[req.hostname].stoid;
                    const investorId = req.session.user.ID;
                    params.blockPassResponseJson = await queryBlockPassForInvestorData(investorId, stoId);
                    callback(null, params);
                } catch {
                    callback(null, params);
                }
            }else {
                callback(null, params);
            }
        }
        async function getSumSubToken(params, callback) {

            if (global.config.KycProvider === 2){
                try {
                    params.sumSubAccessToken = await getSumSubAccessTokenForInvestor(req);
                    callback(null, params);
                } catch {
                    callback(null, params);
                }
            } else {
                callback(null, params);
            }
        }
		async.waterfall([
            loadSteps,
			getInvestorDatabaseInformation,
			getInvestorKYCRecordFromDatabase,
            getCompanySpecificData,
            getBlockPassIvenstorData,
            getSumSubToken
		], (err, params) => {
            var ListCountry = "";
            if( global.config.stos[req.hostname].settings.hasOwnProperty('ListCountry') )
                ListCountry = global.config.stos[req.hostname].settings.ListCountry;

			res.render('investors/wizard', {
				liID: params.liID,
                sideTitles: params.sideTitles,
				partials: common.getInvestorWizardPartials(params.pageTemplate),
				Data: common.getCommonInvestorWizardPageProperties(req),
                ListCountry: ListCountry,
				csrfToken: encodeURI( req.csrfToken() ),
				InvestorRecord: params.InvestorRecord,          // this will only be used on page 0
				currentPageID: req.query.step,
                nextPageID: parseInt(req.query.step) + 1,
				stepData: params.stepData,
                allStepsData: params.allStepsData,
                clientSPecificData: params.clientSPecificData,
                investorTypeText: global.config.stos[req.hostname].settings.InvestorCategory[params.InvestorRecord.investorType],
				authType: common.getAuthorizationType(params.InvestorRecord.KYCCurrentStatus),
                countryList: common.getCountries(),
				message: req.flash('message'),
                blockPassResponseJson: params.blockPassResponseJson,
                blockPassClientId: global.config.BlockPassApiJson?.ClientId,
                kycProvider: global.config.KycProvider,
                stoId: global.config.stos[req.hostname].stoid,
                sumSubAccessToken: params.sumSubAccessToken
			});
		});
	},
	investorWizardPost(req, res) {
		let currentPageSubmitted = parseInt(req.body.CurrentPageSubmitted);
        var currentPage;
        const params = { id: req.session.user.ID };

        async function resetKYC(callback) {
            const stmt = `SELECT isKYC FROM investorsto WHERE investorid = ? AND stoid = ?`;
            mysql.executeSQLStatement(stmt, [req.session.user.ID, global.config.stos[req.hostname].stoid]).then( async (result) => {
                if(result[0].isKYC) {
                    const externalKycService = new ExternalKycService();
                    const investorRecord = {
                        kycStatus: 0,
                        kycCurrentStatus: 7,
                        investorId: req.session.user.ID,
                        stoId: global.config.stos[req.hostname].stoid,
                        kycApplied: 1
                    }
                    await externalKycService.updateKycStatus(investorRecord);
                }
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in investorWizardPost loadSteps`);
            });
        }
        function loadSteps(callback) {
			const stmt = `Select steps from stos where id = ${global.config.stos[req.hostname].stoid}`;
			mysql.executeSQLStatement(stmt, []).then((result) => {
                currentPage = JSON.parse(result[0].steps).steps[currentPageSubmitted];
                callback(null);
            }).catch((error) => {
				common.handleError(req, res, `${error.message}Error occured in investorWizardPost loadSteps`);
            });
        }
        function saveInvestorRecord(callback) {
            if (currentPageSubmitted === global.config.KYCInvestorPersonalInfoStep) { // if investor is on page 0 then save his investor table record and redirect to next page
                    mysql.updateInvestorRecord(req, 1).then(() => {
                            currentPageSubmitted += 1;
                            return res.redirect(`/wizard?step=${currentPageSubmitted}`);
                    }).catch((error) => {
                            common.handleError(req, res, `${error.message}Error occured in investorWizardPost saveInvestorRecord`);
                    });

            } else {
                const stmt = 'Select * from kyc where investorID = ?';
                mysql.executeSQLStatement(stmt, [req.session.user.ID]).then((result) => {
                    if (result[0] != null) {
                        params.dboperation = 0;
                        params.kyc = JSON.parse(result[0].kyc);
                    } else {
                        params.dboperation = 1;
                        params.kyc = {};
                    }

                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message}Error occured in investorWizardPost saveInvestorRecord`);
                });
            }
        }
        function saveOtherPage(callback) {
            const formValuesGathered = {};
            for (let temp = 0; temp < currentPage.Variables.length; temp++) {
                formValuesGathered[currentPage.Variables[temp].name] = req.body[currentPage.Variables[temp].name];
            }
            params.kyc[currentPage.liID] = formValuesGathered;

            let stmt = '';
            let data = [];
            // dboperation = 0 means KYC data structure does not exists in DB table KYC field KYC otherwise update it
            if (params.dboperation === 0) {
                stmt = 'update kyc set KYC = ? where investorID = ?';
                data = [JSON.stringify(params.kyc), req.session.user.ID];
            } else {
                stmt = 'insert into kyc(InvestorID, appliedFor, kyc) values (?,?,?)';
                data = [req.session.user.ID, 0, JSON.stringify(params.kyc)];
            }

            mysql.executeSQLStatement(stmt, data).then(() => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in investorWizardPost saveOtherPages`);
            });
        }
        async.waterfall([
            resetKYC,
            loadSteps,
            saveInvestorRecord,
            saveOtherPage,
        ], (err) => {
            if (!err) {
                currentPageSubmitted += 1;
                return res.redirect(`/wizard?step=${currentPageSubmitted}`);
            }

            return null;
        });
	},
    investorWizardPostFile(req, res) {
        const params = {};
        const currentPageSubmitted = parseInt( req.body.CurrentPageSubmitted );
        var currentPage;
        const fileFieldName = req.body.fileFieldName;

        function transferFiles(callback) {
            var j = JSON.parse(  req.body.files );
            //const newLoc = common.getUserFileLocation( path.join(__dirname, "../temp2") )
            const newLoc = common.getUserFileUploadsLocationFullPath("");
            common.moveMultipleFilesToLocation(j, newLoc, req.hostname + "-").then((data) => {
                params.filejson = data;
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in transferFiles investorWizardPostFile`);
            });
        }
        function loadSteps(callback) {
            const stmt = `Select steps from stos where id = ${global.config.stos[req.hostname].stoid}`;
            mysql.executeSQLStatement(stmt, []).then((result) => {
                currentPage = JSON.parse(result[0].steps).steps[currentPageSubmitted];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in investorWizardPost loadSteps`);
            });
        }
        function getKYCRecord(callback) {
            const stmt = 'Select * from kyc where investorID = ?';
            mysql.executeSQLStatement(stmt, [req.session.user.ID])
                .then((result) => {
                    params.kyc = JSON.parse(result[0].kyc);
                    callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in investorWizardPostFile getKYCRecord`);
            });
        }
        function InsertDatabaseInDocumentinformation(callback) {

            if (!params.kyc.hasOwnProperty(currentPage.liID)) {
                params.kyc[currentPage.liID] = {};
                params.kyc[currentPage.liID][fileFieldName] = [];
                callback(null);
            } else {
                if (! params.kyc[currentPage.liID].hasOwnProperty(fileFieldName)) {
                    params.kyc[currentPage.liID][fileFieldName] = [];
                    callback(null);
                } else {
                    callback(null);
                }
            }

        }
        function updateKYCRecord(callback) {
            //params.kyc[currentPage.liID][fileFieldName] = params.filejson;

            params.filejson.forEach(obj => {
                params.kyc[currentPage.liID][fileFieldName].push(obj);
            });

            const stmt = 'Update kyc set KYC = ? where investorID = ?';
            mysql.executeSQLStatement(stmt, [JSON.stringify(params.kyc), req.session.user.ID]).then(() => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in investorWizardPostFile updateKYCRecord`);
            });
        }
        function getInvestorCurrentKYCSettings(callback) {
            const stmt = 'Select isKYC from investorsto where investorID = ?';
            mysql.executeSQLStatement(stmt, [req.session.user.ID]).then((result) => {
                params.isKYC = result[0].isKYC;
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in investorWizardPostFile getInvestorCurrentKYCSettings`);
            });
        }
        async.waterfall([
            transferFiles,
            loadSteps,
            getKYCRecord,
            InsertDatabaseInDocumentinformation,
            updateKYCRecord,
            getInvestorCurrentKYCSettings
        ], (err) => {
            if (!err) {
                if(params.isKYC == 1) {
                    const LogDescription = `Investor has changed their KYC documents`;
                    const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid) values (?,NOW(),?,?,?, ?)';
                    const sqlparams = [-1, LogDescription, req.session.user.ID, 9, global.config.stos[req.hostname].stoid];
                    mysql.executeSQLStatement(stmt, sqlparams).then(() => {
                        res.redirect(`/wizard?step=${currentPageSubmitted}`);
                    }).catch((error) => {
                        logger.error(`${error.message} - Error occured in investorWizardPostFile`);
                    });
                } else
                    res.redirect(`/wizard?step=${currentPageSubmitted}`);
            } else {
                common.handleError(req, res, `${err.message} - ${investorsRecord} Error occured in investorWizardPostFile updateKYCRecord`);
            }
        });

    },
	wizardSubmit(req, res) {
		const currentPageSubmitted = parseInt(req.body.CurrentPageSubmitted);

		function getInvestorRecordFromDatabase(callback) {

			const params = { id: req.session.user.ID };
			if (typeof req.body.getEmails === 'undefined') { params.receiveEmails = 0; } else { params.receiveEmails = 1; }

			mysql.getInvestorRecordFromDatabase(params, req).then((data) => {
				params.InvestorRec = data[0];
				params.InvestorID = req.session.user.ID;
				callback(null, params);
            },(err) => {
				common.handleError(req, res, `${err.message} Error occured in wizardSubmit getInvestorRecordFromDatabase`);
            });
		}
        function getKYCRecord(params, callback) {
            const stmt = 'Select * from kyc where investorID = ?';
            mysql.executeSQLStatement(stmt, [req.session.user.ID])
                .then((result) => {
                    params.kyc = JSON.parse(result[0].kyc);
                    callback(null, params);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in wizardSubmit getKYCRecord`);
            });
        }
		function checkRecordsCompleteness(params, callback) {
			// check if user already has the approval that he requested
			if (params.InvestorRec.isKYC === 1) {
				if (params.InvestorRec.KYCCurrentStatus == parseInt(req.body.applyFor)) {
					req.flash('message', `You already have &nbsp;&nbsp; <b> ${common.getAuthorizationType(parseInt(req.body.applyFor))}</b>  &nbsp;&nbsp;  level approval in our platform`);
					return res.redirect('/wizardError');
				}
			}

			let errorMessages = '';
			if (params.InvestorRec.FirstName === '') { errorMessages += 'First Name cannot be empty<br /><br />'; }
			if (params.InvestorRec.LastName === '') errorMessages += 'Last Name cannot be empty<br /><br />';



			// check files are uploaded or not
			if (params.kyc.hasOwnProperty('IDDoc')) {

                    if (!params.kyc.IDDoc.hasOwnProperty('fileID')) {
                            if(global.config.KYCPersonalInfoScreen == 1)
                                errorMessages += 'Prove of identity document was not uploaded';
                            else if(global.config.KYCPersonalInfoScreen == 2) {
                                    if(params.InvestorRec.investorType == 0)
                                        errorMessages += 'Prove of identity document was not uploaded';
                                    else
                                        errorMessages += 'Proof of Existence was not uploaded';
                            }
                    }


                    //this check is disabled for Clietn ID 8    Afri-x
                    if( global.config.CurrentClientID != 8 ) {

                            if (!params.kyc.IDDoc.hasOwnProperty('fileAddress')) {
                                if(global.config.KYCPersonalInfoScreen == 1)
                                        errorMessages += 'Proof of address document was not uploaded';
                                else if(global.config.KYCPersonalInfoScreen == 2) {
                                            if(params.InvestorRec.investorType == 0)
                                                errorMessages += 'Proof of address document was not uploaded';
                                            else
                                                errorMessages += 'Proof of Principal Place of Business';
                                }
                            }

                    }

			} else {

                    if(global.config.KYCPersonalInfoScreen == 1)
                            errorMessages += 'No documents uploaded. Plese upload Prove of Address and Prove of Identity documents';
                    else if(global.config.KYCPersonalInfoScreen == 2) {
                                if(params.InvestorRec.investorType == 0)
                                    errorMessages += 'No documents uploaded. Plese upload Prove of Address and Prove of Identity documents';
                                else
                                    errorMessages += 'No documents uploaded. Plese upload Proof of Existence  and Proof of Principal Place of Business';
                    }
            }


			if (errorMessages !== '') {
				errorMessages = `We found the following missing in your profile <br /><br />${errorMessages}`;

				req.flash('message', errorMessages);
				return res.redirect('/wizardError');
			}


			params.isComplte = true;
			callback(null, params);
            return null;
		}
		function updateInvestorTableRecord(params, callback) {
			if (params.isComplte === true) {
				const stmt = 'Update investor set receiveEmails = ? where id = ?; Update investorsto set KYCApplied = ?, KYCUpdateDate = now() where investorID = ? and stoid = ?';
				mysql.executeSQLStatement(stmt, [params.receiveEmails, req.session.user.ID, req.body.applyFor, req.session.user.ID, global.config.stos[req.hostname].stoid]).then(() => {

				    callback(null, params);
				}).catch((error) => {
				    common.handleError(req, res, `${error.message} - Error occured in wizardSubmit updateInvestorTableRecord`);
				});
			} else { callback(null, params); }
		}
		function sendEmailToSupportAboutNewSubmission(params, callback) {
      const stoEmailTexts = emailTextsController.default.globalEmailTexts(req.session.stoid);
      if (!stoEmailTexts) throw new Error(`Email texts not found for InvestorRegistration`);

      let txtEmail = emailTextsController.format(stoEmailTexts.InvestorRegistration.Line1, {
        firstname: params.InvestorRec.FirstName,
        lastname: params.InvestorRec.LastName,
        ID: params.InvestorID,
      });
      txtEmail += '<br /><br />';
      txtEmail += getSTOFromConfig(req.session.stoid).emailFooter
			  // let txtEmail = '';
			  // txtEmail += 'Dear Admin';
			  // txtEmail += '<br /><br />';
			  // txtEmail += emailTexts.InvestorRegistration.Line1;
			  // txtEmail += '<br /><br />';
			  // txtEmail = `${txtEmail}New Investor : ${params.InvestorRec.FirstName} ${params.InvestorRec.LastName} ( ID ${params.InvestorID} )`;
			  // txtEmail += '<br /><br />';
			  // txtEmail += global.config.stos[req.hostname].emailFooter;
			  // txtEmail += '<br />';
			  // txtEmail += global.config.stos[req.hostname].stolinkfull;

			  let emailAdd = '';
			  if (global.NODE_ENV === 'production') { emailAdd = global.config.stos[req.hostname].SMTP_FromAddress; } else { emailAdd = emailTexts.InvestorRegistration.TestingEmail; }
			  common.sendEmail(req.hostname, emailAdd, emailTexts.InvestorRegistration.Subject, txtEmail, [])
			  .then(() => {
				   callback(null, params);
			  }, (err) => {
				  logger.error('Error occured sending email to admin in wizardSubmit sendEmailToSupportAboutNewSubmission');
				  logger.error(err.message);
				  callback(null, params);
			  });
		}
		async.waterfall([
			getInvestorRecordFromDatabase,
			getKYCRecord,
			checkRecordsCompleteness,
			updateInvestorTableRecord,
			sendEmailToSupportAboutNewSubmission,
		], (err, params) => {
			if (params.isComplte === false) { res.redirect('/wizardError'); } else { res.redirect('/wizardComplte'); }
		});
	},
	wizardError(req, res) {
        const stmt = `Select steps from stos where id = ${global.config.stos[req.hostname].stoid}`;
        mysql.executeSQLStatement(stmt, []).then((result) => {
            res.render('investors/wizard', {
                partials: common.getInvestorWizardPartials(JSON.parse(result[0].steps).errorPage),
                Data: common.getCommonInvestorWizardPageProperties(req),
                sideTitles: common.getKYCSideLinks( JSON.parse(result[0].steps) ),
                message: req.flash('message'),
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.message}Error occured in wizardError`);
        });
	},
	wizardComplte(req, res) {
        const stmt = `Select steps, registrationsuccesstext from stos where id = ${global.config.stos[req.hostname].stoid}`;
        mysql.executeSQLStatement(stmt, []).then((result) => {
            res.render('investors/wizard', {
                successtext: result[0].registrationsuccesstext,
                partials: common.getInvestorWizardPartials(JSON.parse(result[0].steps).completePage),
                Data: common.getCommonInvestorWizardPageProperties(req),
                sideTitles: common.getKYCSideLinks( JSON.parse(result[0].steps ) ),
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.message} - Error occured in wizardError`);
        });
	},
    changeinvestorauth(req, res) {
        mysql.executeSQLStatement('Update investor set twofactorenable = ? where id = ?', [req.query.auth, req.session.user.ID]).then((result) => {
            if(req.query.auth == "0")
                req.flash('message', '2-factor authentication disabled');
            else
                req.flash('message', '2-factor authentication enabled');

            res.redirect("/settings");
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in changeinvestorauth`);
        });
    },
	changePassword(req, res) {

        var errors = "";
        if(req.body.oldpassword == "" || req.body.oldpassword.length > 100)
            errors = errors + "old password required and min 2 and max 100 characters";
        if(req.body.newPassword == "" || req.body.newPassword.length < 10 || req.body.newPassword.length > 100)
            errors = errors + "new password required and min 10 and max 100 characters";
        if(req.body.retypeNewPassword == "" || req.body.retypeNewPassword.length < 10 || req.body.retypeNewPassword.length > 100)
            errors = errors + "retype password required and min 10 and max 100 characters";

        if(errors != "") {
            common.handleError(req, res, `${errors} - Post data validation error occured in changePassword`);
            return;
        } else {

				function getInvestorRecord(callback) {
					const params = { id: req.session.user.ID };

					mysql.getInvestorRecordFromDatabase(params, req).then((data) => {
						params.InvestorRec = data[0];
						callback(null, params);
					},(err) => {
						common.handleError(req, res, `${err.message} Error occured in changePassword getInvestorRecord`);
					});
				}
				function checkPasswords(params, callback) {
					if (params.InvestorRec.Password !== common.getSHA256Hash(req.body.oldpassword)) {
						req.flash('message', 'Old password is not correct');
						return res.redirect('/settings');
					}

					if (req.body.newPassword === '') {
						req.flash('message', 'Password cannot be empty');
						return res.redirect('/settings');
					}

					if (req.body.newPassword !== req.body.retypeNewPassword) {
						req.flash('message', 'Re-type password is not correct');
						return res.redirect('/settings');
					}

					callback(null, params);
					return null;
				}
				function changePassword2(params, callback) {
					const stmt = 'Update investor set password = ? where ID = ?';
					mysql.executeSQLStatement(stmt, [common.getSHA256Hash(req.body.newPassword), req.session.user.ID]).then(() => {
						req.flash('message', 'Password changed');
						callback(null, params);
					}).catch((error) => {
						common.handleError(req, res, `${error.toString()} - Error occured in changePassword changePassword2`);
					});
				}
				async.waterfall([
					getInvestorRecord,
					checkPasswords,
					changePassword2,
				], (err, params) => {
					if (!err) {
						res.redirect('/settings');
					} else {
						common.handleError(req, res, `${err} ${params} - Error occured in changePassword changePassword2`);
					}
				});
		}
	},
	downloadDocumentFromKYC(req, res) {
		const params = {};
		params.InvestorID = req.session.user.ID;
        params.stepid = req.query.stepid;
		params.fileID = req.query.fileID;
        params.index = req.query.index;
		mysql.downloadDocmentFromKYCRecord(params, req, res);
	},
    deleteInvestorDocumentsFromKYC(req, res) {
        var params = {};
        var currentPage = "";

        function loadSteps(callback) {
            const stmt = `Select steps from stos where id = ${global.config.stos[req.hostname].stoid}`;
            mysql.executeSQLStatement(stmt, []).then((result) => {
                var pageID = parseInt(req.query.stepid);
                currentPage = JSON.parse(result[0].steps).steps[pageID];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in investorWizardPost loadSteps`);
            });
        }
        function getKYCRecord(callback) {
            const stmt = 'Select * from kyc where investorID = ?';
            mysql.executeSQLStatement(stmt, [req.session.user.ID])
                .then((result) => {
                    params.kyc = JSON.parse(result[0].kyc);
                    callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in deleteInvestorDocumentsFromKYC`);
            });
        }
        function deleteFile(callback) {
             var files = [];
             var temp = 0;

             for( temp=0; temp<params.kyc[currentPage.liID][req.query.filenode].length; temp++  ) {
                    if(temp != req.query.index )
                        files.push(  params.kyc[currentPage.liID][req.query.filenode][temp]  );
             }

            params.kyc[currentPage.liID][req.query.filenode] = files;

             callback(null);
        }
        function updateKYCRecord(callback) {
            const stmt = 'Update kyc set KYC = ? where investorID = ?';
            mysql.executeSQLStatement(stmt, [JSON.stringify(params.kyc), req.session.user.ID]).then(() => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message}Error occured in investorWizardPostFile updateKYCRecord`);
            });
        }
        async.waterfall([
            loadSteps,
            getKYCRecord,
            deleteFile,
            updateKYCRecord
        ], (err) => {
            if (!err) {
                    res.redirect(`/wizard?step=${req.query.stepid}`);
            } else {
                common.handleError(req, res, `${err.message} - ${investorsRecord} Error occured in investorWizardPostFile updateKYCRecord`);
            }
        });


        //console.log(   req.query.stepid   );
        //console.log(   req.query.index   );
        //console.log(   req.query.jsonnode   );
    },

	changeNextOfKin(req, res) {

        var errors = "";
        if( req.body.kinname.length > 70 )
            errors = errors + "kinname must be 70 character or less";
        if( req.body.kinphone.length > 20 )
            errors = errors + "kinphone  must be 20 character or less";
        if( req.body.kinemail.length > 30)
            errors = errors + "kinemail  must be 30 character or less";

        if(errors != "") {
            common.handleError(req, res, `${errors} - Post data validation error occured in changeNextOfKin`);
            return;
        } else {
				const stmt = 'Update investor set kinname = ?, kinphone=?, kinemail=? where ID = ?';
				mysql.executeSQLStatement(stmt, [req.body.kinname, req.body.kinphone, req.body.kinemail, req.session.user.ID])
				.then(() => res.redirect('/ownership'))
				.catch((error) => {
					common.handleError(req, res, `${error.message}Error occured in changeNextOfKin`);
				});
		}
	},
	changeUsufructuaries(req, res) {

        var errors = "";
        if( req.body.UsufructuariesFirstName.length > 70 )
            errors = errors + "UsufructuariesFirstName must be 70 character or less";
        if( req.body.UsufructuariesLastName.length > 70 )
            errors = errors + "UsufructuariesLastName  must be 70 character or less";
        if( req.body.UsufructuariesAddress.length > 90)
            errors = errors + "UsufructuariesAddress  must be 90 character or less";
        if( req.body.UsufructuariesCity.length > 70)
            errors = errors + "UsufructuariesCity  must be 70 character or less";
        if( req.body.UsufructuariesCountry.length > 70)
            errors = errors + "UsufructuariesCountry  must be 70 character or less";
        if( req.body.UsufructuariesEmail.length > 70)
            errors = errors + "UsufructuariesEmail  must be 70 character or less";

        if(errors != "") {
            common.handleError(req, res, `${errors} - Post data validation error occured in changeUsufructuaries`);
            return;
        }

		const stmt = 'Update investorsto set UsufructuariesFirstName=?, UsufructuariesLastName=?, UsufructuariesAddress=?, UsufructuariesCity=?, UsufructuariesCountry=?, UsufructuariesEmail=?, isUsufructuary=? where investorid = ? and stoid = ?';
		mysql.executeSQLStatement(stmt, [req.body.UsufructuariesFirstName, req.body.UsufructuariesLastName, req.body.UsufructuariesAddress, req.body.UsufructuariesCity, req.body.UsufructuariesCountry, req.body.UsufructuariesEmail, req.body.userUnFlucture, req.session.user.ID, global.config.stos[req.hostname].stoid])
        .then(() => res.redirect('/ownership'))
        .catch((error) => {
            common.handleError(req, res, `${error.message} - user id ${req.session.user.ID} - Error occured in changeUsufructuaries`);
        });
	},
	changeBeneifical(req, res) {

        var errors = "";
        if( req.body.BeneificalFirstName.length > 70 )
            errors = errors + "BeneificalFirstName must be 70 character or less";
        if( req.body.BeneificalLastName.length > 70 )
            errors = errors + "BeneificalLastName  must be 20 character or less";
        if( req.body.BeneificalAddress.length > 90)
            errors = errors + "BeneificalAddress  must be 30 character or less";
        if( req.body.BeneificalCity.length > 70)
            errors = errors + "BeneificalCity  must be 30 character or less";
        if( req.body.BeneificalCountry.length > 70)
            errors = errors + "BeneificalCountry  must be 30 character or less";
        if( req.body.BeneificalEmail.length > 70)
            errors = errors + "BeneificalEmail  must be 30 character or less";
        if( req.body.BeneificalDOB.length > 30)
            errors = errors + "BeneificalDOB  must be 30 character or less";
        if( req.body.BeneificalNationality.length > 70)
            errors = errors + "BeneificalNationality  must be 30 character or less";

        if(errors != "") {
            common.handleError(req, res, `${errors} - user id ${req.session.user.ID} Post data validation error occured in changeBeneifical`);
            return;
        } else {

				var DOB = null;
				if(req.body.BeneificalDOB != "")
					DOB = req.body.BeneificalDOB;

				const stmt = 'Update investorsto set BeneificalFirstName=?, BeneificalLastName=?, BeneificalAddress=?, BeneificalCity=?, BeneificalCountry=?, BeneificalEmail=?, BeneificalDOB=?, BeneificalNationality=?  where investorid = ? and stoid = ?';
				mysql.executeSQLStatement(stmt, [req.body.BeneificalFirstName, req.body.BeneificalLastName, req.body.BeneificalAddress, req.body.BeneificalCity, req.body.BeneificalCountry, req.body.BeneificalEmail, DOB, req.body.BeneificalNationality, req.session.user.ID, global.config.stos[req.hostname].stoid])
				.then(() => res.redirect('/ownership'))
				.catch((error) => {
					common.handleError(req, res, `${error.message}Error occured in changeBeneifical`);
				});
		}
	},

	updates(req, res) {
		  function getDatabaseInformation(callback) {
			  const sql = `Select u.ID, u.TITLE, DATE_FORMAT(UpdateDate,'%M %d %Y') as UpdateDate from updates u where u.stoid = ${global.config.stos[req.hostname].stoid}  Order by ID DESC limit 0, 50`;

			  mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => {
				  const params = {};
				  params.UpdateRecords = result;
				  callback(null, params);
			  })
			  .catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in updates getDatabaseInformation`);
			  });
		  }
          function getInvestorPageData(params, callback) {
                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                    params.Data = data;
                    callback(null, params);
                }, (err) => {
                    common.handleError(req, res, `${err.message} - Error occured in updates getInvestorPageData`);
                });
          }

		  async.waterfall([
			getDatabaseInformation,
            getInvestorPageData
		  ], (err, params) => {
			 res.render('investors/updates', {
				partials: common.getInvestorDashboardPartials(),
				Data: params.Data,
				UpdateRecords: params.UpdateRecords,
			 });
		  });
	},
	updateDetails(req, res) {
		  const sql = `Select ID, Details, TITLE, DATE_FORMAT(UpdateDate,'%M %d %Y') as UpdateDate from updates where id = ? and stoid = ${global.config.stos[req.hostname].stoid}`;
		  mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                 const record = result;
                 record[0].Details = record[0].Details.replace(/(?:\r\n|\r|\n)/g, '<br />');

                    common.getCommonInvestorDashboardPageProperties(req, res)
                    .then((data) => {
                         res.render('investors/updatesdetails', {
                                partials: common.getInvestorDashboardPartials(),
                                Data: data,
                                record: record[0],
                         });
                    }, (err) => {
                        common.handleError(req, res, `${error.message} - Error occured in updateDetails getInvestorPageData`);
                    });

		  }).catch((error) => {
			  common.handleError(req, res, `${error.message} Error occured in updateDetails getDatabaseInformation`);
		  });
	},

	inbox(req, res) {
		  function getDatabaseInformation(callback) {
			  const sql = `Select inbox.ID, inbox.Title, DATE_FORMAT(DateEmail,'%M %d %Y') as Date, isResponded, Response, DATE_FORMAT(ResponseDate,'%M %d %Y') as ResponseDate from inbox Where InvestorID = ${req.session.user.ID} and stoid = ${global.config.stos[req.hostname].stoid} Order by ID DESC limit 0, 500`;
			  mysql.executeSQLStatement(sql, [])
			  .then((result) => {
				  const params = {};
				  params.records = result;
				  callback(null, params);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in inbox getDatabaseInformation`);
			  });
		  }
        function getInvestorPageData(params, callback) {
            common.getCommonInvestorDashboardPageProperties(req, res)
            .then((data) => {
                params.Data = data;
                callback(null, params);
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in dashboard getInvestorPageData`);
            });
        }

		  async.waterfall([
			getDatabaseInformation,
            getInvestorPageData
		  ], (err, params) => {
            var messageList = 0;
            if(params.records.length > 0)
                messageList = 1;
            else
                messageList = 0;

			res.render('investors/inbox', {
                messageList: messageList,
                messages: req.flash('EmailMessage'),
				Records: params.records,
				partials: common.getInvestorDashboardPartials(),
				Data: params.Data,
			});
		  });
	},
	email(req, res) {

        if (req.query.op === '0') {    //display the email + response from admin
              const sql = `Select * from inbox where ID = ? and investorid = ${req.session.user.ID}`;
              mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    common.getCommonInvestorDashboardPageProperties(req, res).then((data) => {
                        res.render('investors/email', {
                            record: result[0],
                            partials: common.getInvestorDashboardPartials(),
                            Data: data,
                            operation: 0,
                        });
                    }, (err) => {
                        common.handleError(req, res, `${error.message} - Error occured in investor/email`);
                    });
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in  investor/email`);
              });
        } else {
            common.getCommonInvestorDashboardPageProperties(req, res).then((data) => {
                res.render('investors/email', {
                    csrfToken: encodeURI( req.csrfToken() ),
                    partials: common.getInvestorDashboardPartials(),
                    Data: data,
                    operation: 1,
                });
            }, (err) => {
                common.handleError(req, res, `${error.message} - Error occured in investor/email`);
            });
        }


	},
	sendCompanyMessage(req, res) {
		  const sql = 'Insert into inbox(InvestorID, Title, Details, stoid, DateEmail) values(?, ?, ?, ?, Now())';
		  mysql.executeSQLStatement(sql, [req.session.user.ID, req.body.emailTitle, req.body.emailText.replace(/(?:\r\n|\r|\n)/g, '<br />'), global.config.stos[req.hostname].stoid])
		  .then(() => {
        const stoEmailTexts = emailTextsController.default.globalEmailTexts(global.config.stos[req.hostname].stoid);
        if (!stoEmailTexts) throw new Error(`Email texts not found for newInvestorEmailReceived`);

        let txtEmail = emailTextsController.format(stoEmailTexts.newInvestorEmailReceived.Line1, {
          title: req.body.emailTitle,
          text: req.body.emailText.replace(/(?:\r\n|\r|\n)/g, '<br />'),
        });
        txtEmail += '<br /><br />';
        txtEmail += getSTOFromConfig(global.config.stos[req.hostname].stoid).emailFooter;
                // let txtEmail = 'Hi <br /><br />';
                // txtEmail += emailTexts.newInvestorEmailReceived.Line1;
                // txtEmail += '<br /><br /><b>' + req.body.emailTitle + '</b><br /><br />' + req.body.emailText.replace(/(?:\r\n|\r|\n)/g, '<br />') + '<br /><br />';
                // txtEmail += global.config.stos[req.hostname].emailFooter;

                common.sendEmail(req.hostname, global.config.stos[req.hostname].SMTP_FromAddress, emailTexts.newInvestorEmailReceived.Subject, txtEmail, []).then(() => {
                    req.flash('EmailMessage', 'Message sent to company');
                    res.redirect('/inbox');
                }, (err) => {
                    logger.error(`${err.message} - Error occured in sendCompanyMessage`);
                    req.flash('EmailMessage', 'Error sending email to company');
                    //res.redirect('/inbox');
                });
                res.redirect('/inbox');
           }).catch((error) => {
			  common.handleError(req, res, `${error.message} Error occured in sendCompanyMessage`);
		  });
	},

	changePublciAddress(req, res) {
        const params = {};

        req.checkQuery('publickey', '').notEmpty().trim().escape();

        const errors = req.validationErrors();
        if (errors) {
           common.handleError(req, res, `${errors} - updatePublicAddress Post data validation error occured`);
           return;
        } else {

				mysql.checkPublicKeyAlreadyTaken(req, res, req.query.publickey, req.query.stoid, req.session.user.ID).then(() => {
				function getInvestorRecord(callback) {
					  const sql = 'select * from investorsto where InvestorID = ? and stoid = ?';
					  mysql.executeSQLStatement(sql, [req.session.user.ID, global.config.stos[req.hostname].stoid])
					  .then((result) => {
						  params.investorRec = result[0];
						  callback(null);
					  })
					  .catch((error) => {
						  common.handleError(req, res, `${error.message} Error occured in inbox changePublciAddress getInvestorRecord`);
					  });
				}
				function checkInvestorAlreadyHasRequested(callback) {
					  const sql = 'select * from changeaddresserequest where InvestorID = ? and stoid = ?';
					  mysql.executeSQLStatement(sql, [req.session.user.ID, global.config.stos[req.hostname].stoid])
					  .then((result) => {
						  if (result != null) { params.record = result[0]; } else { params.record = null; }

						  callback(null);
					  })
					  .catch((error) => {
						  common.handleError(req, res, `${error.message} Error occured in inbox getDatabaseInformation`);
					  });
				  }
				function addRequestToDatabase(callback) {
					if (params.investorRec.PublicKey === '' || params.investorRec.isAuthorized === 0) {
						const sql = 'update investorsto set PublicKey = ? where investorid = ? and stoid = ?';
						mysql.executeSQLStatement(sql, [req.query.publickey, req.session.user.ID, global.config.stos[req.hostname].stoid])
							.then(() => {
								callback(null);
							})
							.catch((error) => {
								common.handleError(req, res, `${error.message} Error occured in inbox getDatabaseInformation`);
							});
					} else if (params.record == null) {
						const sql = 'insert into changeaddresserequest(InvestorID, PublicKey, stoid, Tokens) values(?, ?, ?, 0)';
						mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.publickey, global.config.stos[req.hostname].stoid])
							.then(() => {
								req.flash('message', 'Public Key change request has been sent');
								callback(null);
							})
							.catch((error) => {
								common.handleError(req, res, `${error.message} Error occured in inbox getDatabaseInformation`);
							});
					} else if (params.record.isActivated === 0) {
						const sql = 'update changeaddresserequest set PublicKey = ? where InvestorID = ? and stoid = ?';
						mysql.executeSQLStatement(sql, [req.query.publickey, req.session.user.ID, global.config.stos[req.hostname].stoid]).then(() => {
							req.flash('message', 'Public Key change request has been sent');
							callback(null);
						})
							.catch((error) => {
								common.handleError(req, res, `${error.message} Error occured in inbox getDatabaseInformation`);
							});
					} else { callback(null); }
				  }
				async.waterfall([
					getInvestorRecord,
					checkInvestorAlreadyHasRequested,
					addRequestToDatabase,
				], (err) => {
					if (err != null) { req.flash('message', 'Public Key is already been used. Please select another public key'); }
					res.redirect('/dashboard');
				});
			}).catch((error) => {
				if (error != null) { req.flash('message', 'Public Key is already been used. Please select another public key'); }
				res.redirect('/dashboard');
			});

		}

	},
	deleteChangeKeyRequest(req, res) {
		  const params = {};

		  function checkInvestorAlreadyHasRequested(callback) {
			  const sql = 'select * from changeaddresserequest where InvestorID = ? and stoid = ?';
			  mysql.executeSQLStatement(sql, [req.session.user.ID, global.config.stos[req.hostname].stoid])
			  .then((result) => {
				  if (result != null) { params.record = result[0]; } else { params.record = null; }
				  callback(null);
			  })
			  .catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in inbox getDatabaseInformation`);
			  });
		  }
		  function IfUserAlreadyAppliedThenCheckhisCurrentKeyContainsToken(callback) {
              //TODO   is this necessary ?
			  callback(null);
		  }
		  function deleteInvestorKeyChangeRequest(callback) {
			  if (params.record.isActivated === 0) {
				  const sql = 'delete from changeaddresserequest where InvestorID = ? and stoid = ?';
				  mysql.executeSQLStatement(sql, [req.session.user.ID, global.config.stos[req.hostname].stoid])
				  .then(() => {
					  callback(null);
				  })
				  .catch((error) => {
					  common.handleError(req, res, `${error.message} Error occured in inbox getDatabaseInformation`);
				  });
			  } else { callback(null); }
		  }
		  async.waterfall([
			 checkInvestorAlreadyHasRequested,
			 IfUserAlreadyAppliedThenCheckhisCurrentKeyContainsToken,
			 deleteInvestorKeyChangeRequest,
		  ], (err) => {
              if (!err) {
			     res.redirect('/dashboard');
              }
		  });
	},

	downloadInvestorContractPDF(req, res) {
        const sql = 'Select * from contracts where id= ? and investorid = ?';
        mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID]).then((result) => {
            let link = '';
            if (req.query.file === '0') link = common.getUserFileUploadsLocationFullPath(result[0].ContractFilePath);
            else link = common.getUserFileUploadsLocationFullPath(result[0].SignedFilePath);

            fs.exists(link, (exists) => {
                if (exists) res.download(link); // Set disposition and send it.
                else logger.error(`File(${link}) not found Error occured in downloadInvestorContractPDF`);
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in downloadInvestorContractPDF`);
        });
    },
    deleteInvestorContract(req, res) {
	  	  const params = {};

		  function getDatabaseInformation(callback) {
            const sql = 'select * from contracts where id= ? and investorid = ?';
            mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID]).then((result) => {
                params.record = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in deleteInvestorContract getDatabaseInformation`);
            });
          }
          function deletefile(callback) {
             fs.unlink(common.getUserFileUploadsLocationFullPath(params.record.SignedFilePath), (err) => {
                 if (err) { logger.error(`${params.record.SignedFilePath} deleteInvestorContract User Document deleted from disk outside platform`); }
                 callback(null);
             });
          }
          function updateRecord(callback) {
            const sql = 'update contracts set CurrentStatus = 0 where id= ? and investorid = ?';
            mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID]).then(() => {
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in  downloadInvestorContractPDF updateRecord`);
            });
          }
		  async.waterfall([
			getDatabaseInformation,
            deletefile,
            updateRecord,
		  ], (err) => {
              if (!err) res.redirect('/contractview?id=' + req.query.id);
		  });
    },

    //----------------------------------------------------------------------------------
    //  Document Module - Investor Contract
    contractview2(req, res) {
          const params = {};
          common.handleDebug(req,'old eee')
          function getDatabaseInformation(callback) {
			  const sql = `select * from documentofferinvestor where id = ? and stoid = ${global.config.stos[req.hostname].stoid}`;
			  mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                  params.rec = result[0];
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in contractview2 getDatabaseInformation`);
			  });
		  }
          function getDocumentRec(callback) {
			  const sql = `select * from documents where id = ? and stoid = ${global.config.stos[req.hostname].stoid} \
              ;\ 
              select * from documentfields where documentid = ? and stoid = ${global.config.stos[req.hostname].stoid} order by ID ASC \
              ;\
              select *, DATE_FORMAT(signaturedate,'%M %d %Y') as signaturedate2 from documentuser where investorID=? and stoid=? and documentid=? and documentofferinvestorid=? \
              ;\
              select firstname, lastname from investor where id = ?`

			  mysql.executeSQLStatement(sql, [params.rec.documentid, params.rec.documentid, req.session.user.ID, global.config.stos[req.hostname].stoid, params.rec.documentid, req.query.id, req.session.user.ID, global.config.stos[req.hostname].stoid, params.rec.documentid, req.query.id, req.session.user.ID]).then((result) => {
                  params.doc = result[0][0];
                  params.docfields = result[1];
                  if(result[2].length > 0) {
                      if(result[2][0].DocumentStatus == 2 || result[2][0].DocumentStatus == 3) {
                            params.fieldValuesJson = result[2][0].fieldValuesJson;
                            params.documentuser = result[2][0];
                            params.documentuserfound = 1;
                            if(result[2][0].DocumentStatus == 3)
                                params.documentusersettled = 1;
                            else
                                params.documentusersettled = 0;
                            params.signaturedate2 = result[2][0].signaturedate2;
                            params.fullname = result[3][0].firstname + " " + result[3][0].lastname;

                            fs.readFile(common.getUserFileUploadsLocationFullPath(result[2][0].signaturefilepath), 'base64', function(err, contents) {
                                params.signatureFileContents = contents;
                                callback(null);
                            });
                      } else {
                            params.fieldValuesJson = result[2][0].fieldValuesJson;
                            params.documentuser = result[2][0];
                            params.documentuserfound = 0;
                            callback(null);
                      }
                  } else {
                      params.fieldValuesJson = '[]';
                      params.documentuser = {};
                      params.documentuserfound = 0;
                      callback(null);
                  }


			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in contractview2 getDatabaseInformation`);
			  });
          }
          function getInvestorPageData(callback) {
                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                    params.Data = data;
                    callback(null);
                }, (err) => {
                    common.handleError(req, res, `${err.message} - Error occured in settlements getInvestorPageData`);
                });
          }
          async.waterfall([
			getDatabaseInformation,
            getDocumentRec,
            getInvestorPageData
		  ], (err) => {
              if (!err) {
                    res.render('investors/contractsview2', {
                        record: params.rec,
                        fieldValuesJson: params.fieldValuesJson,
                        signatureFileContents: params.signatureFileContents,
                        document: params.doc,
                        documentfiels: params.docfields,
                        signaturedate2: params.signaturedate2,
                        fullname: params.fullname,
                        csrfToken: encodeURI( req.csrfToken() ),
                        partials: common.getInvestorDashboardPartials(),
                        Data: params.Data,
                        documentuser: params.documentuser,
                        documentuserfound: params.documentuserfound,
                        documentusersettled: params.documentusersettled,
                        UserMessage: parseInt( req.flash('UserMessage') ),
                    });
              }
		  });
    },
    contractview2sign(req, res) {
          const params = {};

          //TODO   check the received data length issues

          function getDatabaseInformation(callback) {
              const sql = `select ID from documentuser where investorID=? and stoid=? and documentid=? and documentofferinvestorid=?`;
              mysql.executeSQLStatement(sql, [req.session.user.ID, global.config.stos[req.hostname].stoid, req.body.docid, req.body.offerid]).then((result) => {
                  if(result.length > 0) {
                      params.documentuserid = result[0].ID;

                      const sql = "update documentuser set fieldValuesJson=?, contents=? where investorID=? and stoid=? and documentid=? and documentofferinvestorid=?";
                      mysql.executeSQLStatement(sql, [req.body.jsondata, req.body.contents, req.session.user.ID, global.config.stos[req.hostname].stoid, req.body.docid, req.body.offerid]).then(() => {
                          callback(null);
                      }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in contractview2sign getDatabaseInformation`);
                      });
                  } else {
                      const sql = "insert into documentuser(investorID, stoid, directoryid, documentid, DocumentStatus, fieldValuesJson, documentofferinvestorid, contents) values(?, ?, ?, ?, ?, ?, ?, ?)";
                      mysql.executeSQLStatement(sql, [req.session.user.ID, global.config.stos[req.hostname].stoid, req.body.dirid ,req.body.docid ,1 ,req.body.jsondata ,req.body.offerid ,req.body.contents]).then((result) => {
                          params.documentuserid = result.insertId;
                          callback(null);
                      }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in contractview2sign getDatabaseInformation`);
                      });
                  }
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in contractview2sign getDatabaseInformation`);
              });
          }
          function getInvestorPageData(callback) {
                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                    params.Data = data;
                    callback(null);
                }, (err) => {
                    common.handleError(req, res, `${err.message} - Error occured in settlements getInvestorPageData`);
                });
          }
          async.waterfall([
            getDatabaseInformation,
            getInvestorPageData
          ], (err) => {
              if (!err) {
                  if(req.body.op == "1") {
                        res.render('investors/contractview2sign', {
                            ID: params.documentuserid,
                            offerid: req.body.offerid,
                            csrfToken: encodeURI( req.csrfToken() ),
                            contents: req.body.contents,
                            partials: common.getInvestorDashboardPartials(),
                            Data: params.Data
                        });
                  } else {
                      req.flash('UserMessage', 1);
                      res.redirect("contractview2?id=" + req.body.offerid)
                  }
              }
          });
    },
    contractview2signpost(req, res) {

        const params = {};
        const base64Data = req.body.signatureData.replace('data:image/octet-stream;base64,', '');

        function deleteOldFile(callback) {
			  const sql = `select signaturefilepath from documentuser where id=? and investorid=? and stoid=?`;
			  mysql.executeSQLStatement(sql, [req.body.id, req.session.user.ID, global.config.stos[req.hostname].stoid])
			  .then((result) => {
                    if(result[0].signaturefilepath != '') {
                         fs.unlink(common.getUserFileUploadsLocationFullPath(result[0].signaturefilepath), (err) => {
                             if (err)
                                callback(null);
                             else
                                callback(null);
                         });
                    } else
                        callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in contractview2signpost getInvestorPageData`);
			  });
        }
        function saveFileToDis(callback) {
            params.filenameSignature = `documemtsigns/${req.hostname}_${uuidv4()}_sig.png`;
            fs.writeFile(common.getUserFileUploadsLocationFullPath(params.filenameSignature), base64Data, 'base64', (err) => {
                if (!err) {
                    callback(null);
                } else
                     common.handleError(req, res, `${err.message} Error occured in contractview2signpost saveFileToDis`);
            })
        }
        function getInvestorPageData(callback) {
			  const sql = `update documentuser set signaturefilepath=?, signaturedate=now(), DocumentStatus=2 where id = ?`;
			  mysql.executeSQLStatement(sql, [params.filenameSignature, req.body.id]).then((result) => {
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in contractview2signpost getInvestorPageData`);
			  });
        }
		  async.waterfall([
            deleteOldFile,
            saveFileToDis,
            getInvestorPageData
		  ], (err) => {
              if (!err) {
                  res.redirect("/contractview2?id=" + req.body.offerid);
              }
		  });

    },
    deletedocumentusersignatures(req, res) {
        const params = {};

        function deleteOldFile(callback) {
			  const sql = `select signaturefilepath from documentuser where documentid=? and documentofferinvestorid=? and investorid=? and stoid=?`;
			  mysql.executeSQLStatement(sql, [req.query.docid, req.query.offerid, req.session.user.ID, global.config.stos[req.hostname].stoid])
			  .then((result) => {
                    if(result[0].signaturefilepath != '') {
                         fs.unlink(common.getUserFileUploadsLocationFullPath(result[0].signaturefilepath), (err) => {
                             if (err)
                                callback(null);
                             else
                                callback(null);
                         });
                    } else
                        callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in deletedocumentusersignatures deleteOldFile`);
			  });
        }
        function setInvestorPageData(callback) {
			  const sql = `update documentuser set signaturefilepath='', DocumentStatus=1 where documentid=? and documentofferinvestorid=? and investorid=? and stoid=?`;
			  mysql.executeSQLStatement(sql, [req.query.docid, req.query.offerid, req.session.user.ID, global.config.stos[req.hostname].stoid]).then((result) => {
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in deletedocumentusersignatures setInvestorPageData`);
			  });
        }
        async.waterfall([
            deleteOldFile,
            setInvestorPageData
        ], (err) => {
              if (!err) {
                  res.redirect("/contractview2?id=" + req.query.offerid);
              }
        });
    },

    // Signing Contracts
    documentviewforcomments(req, res) {
        const params = {};

        function getDatabaseInformation(callback) {
			  const sql = `select * from documents where stoid = ? and id= ? and isactiveforinvestors = 1 \
              ;\
              select *, d.id as commentID, d.investorid, DATE_FORMAT(d.datecomment,'%M %d %Y %h:%i %p') as datecomment, i.FirstName, i.LastName from documentcomments d, investor i where d.stoid=? and d.documentid=? and d.investorid = i.id`;
			  mysql.executeSQLStatement(sql, [global.config.stos[req.hostname].stoid, req.query.id, global.config.stos[req.hostname].stoid, req.query.id])
              .then((result) => {
                  params.rec = result[0][0];
                  params.comments = result[1];
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in documentviewforcomments getDatabaseInformation`);
			  });
        }
        function getInvestorPageData(callback) {
            common.getCommonInvestorDashboardPageProperties(req, res)
            .then((data) => {
                params.Data = data;
                callback(null);
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in documentviewforcomments getDatabaseInformation`);
            });
        }
		  async.waterfall([
			getDatabaseInformation,
            getInvestorPageData
		  ], (err) => {
              if (!err) {
                    res.render('investors/documentcomments', {
                        recordID: req.query.id,
                        loginUserID: req.session.user.ID,
                        record: params.rec,
                        comments: params.comments,
                        partials: common.getInvestorDashboardPartials(),
                        Data: params.Data,
                        csrfToken: encodeURI(  req.csrfToken() )
                    });
              }
		  });
    },
    documentsuggestion(req, res) {
        const params = {};

        function checkDBRecord(callback) {
			  const sql = `select * from documents where stoid = ? and id = ?`;
			  mysql.executeSQLStatement(sql, [global.config.stos[req.hostname].stoid, req.body.id]).then((result) => {
                  if(result.length > 0)
				     callback(null);
                  else
                     common.handleError(req, res, `user ${req.session.user.ID} tried to comment on documentid ${req.body.id} Error occured in documentsuggestion checkDBRecord`);

			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in documentsuggestion checkDBRecord`);
			  });
        }
        function getDatabaseInformation(callback) {
              if(req.body.txtsuggestion.length > 1000) {
                    common.handleError(req, res, `txtsuggestion must be less than 1000 - Post data validation error occured in documentsuggestion`);
              }

			  const sql = `insert into documentcomments(stoid, documentid, comment, reply, isaccepted, isnew, investorid, datecomment, replybyid) value(?, ?, ?, ?, ?, ?, ?, now(), ?)`;
			  mysql.executeSQLStatement(sql, [global.config.stos[req.hostname].stoid, req.body.id, req.body.txtsuggestion, "", 0, 1, req.session.user.ID, -1]).then((result) => {
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in documentsuggestion getDatabaseInformation`);
			  });
        }
        async.waterfall([
            checkDBRecord,
			getDatabaseInformation,
        ], (err) => {
            res.redirect("documentviewforcomments?id=" + req.body.id);
        });
    },
    documentDeleteComment(req, res) {
          const sql = `delete from documentcomments where id = ? and investorid = ? and stoid = ?`;
          mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID, global.config.stos[req.hostname].stoid]).then((result) => {
              res.redirect("documentviewforcomments?id=" + req.query.recid);
          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in documentDeleteComment`);
          });
    },
    changecommenttext(req, res) {
          if(req.body.comment.length > 1000) {
              common.handleError(req, res, `txtsuggestion must be less than 1000 - Post data validation error occured in documentsuggestion`);
          } else {
			  const sql = `update documentcomments set comment = ? where id = ? and investorid = ? and stoid = ?`;
			  mysql.executeSQLStatement(sql, [req.body.comment, req.body.id, req.session.user.ID,  global.config.stos[req.hostname].stoid]).then((result) => {
				  res.redirect("documentviewforcomments?id=" + req.body.recid);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in documentDeleteComment`);
			  });
		  }
    },
    //----------------------------------------------------------------------------------

    settlements(req, res) {
          const params = {};

		function getInvestorDatabaseInformation(callback) {
			const params2 = { id: req.session.user.ID };
			mysql.getInvestorRecordFromDatabase(params2, req).then((data) => {
                params.InvestorRec = data[0];
				callback(null);
            },(error) => {
				common.handleError(req, res, `${error.message} - Error occured in dashboard getInvestorDatabaseInformation`);
            });
		}
        function getDocNameCriteria(callback) {
             // another place where isactiveforinvestorsNames, isactiveforinvestorsType criteria is being used is in the main dashboard screen where it needs to be found that if a contract document needs to be shown or not   and if a document is for investor review.   the criteria also needs to be applied on those two places.

              const sql = 'select id, isactiveforinvestorsNames, isactiveforinvestorsType from documents where isactiveforinvestors = 1 and filetype = 2  and  isactiveforinvestorsNames != ""'; 
              mysql.executeSQLStatement(sql, [req.query.id]).then((result) => { 

                    var recordIDFound = "-1";
                    var tempFound = 0;
                    var word2 = "";

                    result.forEach(obj=> {
                         obj.isactiveforinvestorsNames.split(",").forEach(obj2=> {

                             word2 = obj2.trim().toLowerCase();
                             tempFound = 0;

                               if (params.InvestorRec.FirstName.toLowerCase().indexOf( word2 ) >= 0    ||   params.InvestorRec.LastName.toLowerCase().indexOf( word2 ) >= 0  || params.InvestorRec.CompanyName.toLowerCase().indexOf( word2 ) >= 0  )  {

                                       if(obj.isactiveforinvestorsType == 0)
                                            tempFound = 1;
                                       else {
                                           if(obj.isactiveforinvestorsType == params.InvestorRec.KYCCurrentStatus )
                                               tempFound = 1;
                                           else
                                               tempFound = 0;
                                       }

                               } else
                                   tempFound = 0;


                           if(tempFound == 1) {
                               if(  recordIDFound == "" )
                                   recordIDFound = obj.id
                               else
                                   recordIDFound = recordIDFound + ", " + obj.id
                           }

                         })
                    })

                    params.recordIDFound = recordIDFound;

                    callback(null); 
              }).catch((error) => { 
                    common.handleError(req, res, `${error.toString()} - Error occured `); 
              });

        }
      function getDatabaseInformation(callback) {
        var sql = `
          SELECT du.ID as duID, du.documentid, DATE_FORMAT(du.signaturedate,'%d %M %Y | %H:%i:%ss') AS signatureDate,
           du.DocumentStatus, d.*, s.title as stoName, du.signaturefilepath as signaturefilepath
          FROM documentuser du
            INNER JOIN investor i on i.ID = du.investorID
            INNER JOIN documents d on d.ID = du.documentid
            INNER JOIN stos s on s.ID = du.stoid
          WHERE du.investorID = ?
          ORDER BY du.signaturedate DESC;
          
          SELECT *, s.title as stoName
          FROM documents d
          INNER JOIN stos s on s.ID = d.stoid
          WHERE isactiveforinvestors = 1 
            AND filetype = 2 
            AND isactiveforinvestorsType = 0 
            AND isactiveforinvestorsNames = ""
          UNION 
            SELECT *, s.title as stoName
            FROM documents d 
            INNER JOIN stos s on s.ID = d.stoid
            WHERE isactiveforinvestors = 1 
              AND filetype = 2 
              AND isactiveforinvestorsType = ${params.InvestorRec.KYCCurrentStatus} 
              AND isactiveforinvestorsNames = "" `;

        if(params.recordIDFound != "") {
          sql += `UNION 
          SELECT *, s.title as stoName
           FROM documents d 
           INNER JOIN stos s on s.ID = d.stoid
           WHERE isactiveforinvestors = 1 
            AND filetype = 2 
            AND d.ID in (${params.recordIDFound}) `;
        }
        mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => {
          params.Records = result[0];
          params.RecordsDocs = result[1];
          callback(null);
        }).catch((error) => {
          common.handleError(req, res, `${error.message} Error occurred in settlements getDatabaseInformation`);
        });
      }
        function getInvestorPageData(callback) {
            common.getCommonInvestorDashboardPageProperties(req, res).then((data) => {
                params.Data = data;
                callback(null);
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in settlements getInvestorPageData`);
            });
        }
        async.waterfall([
            getInvestorDatabaseInformation,
            getDocNameCriteria,
			getDatabaseInformation,
            getInvestorPageData
        ], (err) => {
              if (!err) {
                res.render('investors/settlements', {
                    Records: params.Records,
                    RecordsDocs: params.RecordsDocs,
                    partials: common.getInvestorDashboardPartials(),
                    Data: params.Data,
                });
              }
        });
    },

	settings(req, res) {
		const params = { id: req.session.user.ID };

        function getInvestorRecord(callback) {
			mysql.getInvestorRecordFromDatabase(params, req)
				.then((data) => {
					params.investorRec = data[0];
					callback(null);
				},
				(err) => {
					common.handleError(req, res, `${err.message} Error occured in settings getInvestorRecord`);
				});
		  }
        function getInvestorData(callback) {
			  const sql = `select * from investorpublickeys where investorid = ?`;
			  mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => {
                  params.publickeys = result;
				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in settings getInvestorData`);
			  });
        }
        function getInvestorPageData(callback) {
            common.getCommonInvestorDashboardPageProperties(req, res)
            .then((data) => {
                params.Data = data;
                callback(null);
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in settings getInvestorPageData`);
            });
         }
        async.waterfall([
			 getInvestorRecord,
             getInvestorData,
             getInvestorPageData,
        ], (err) => {
              if (!err) {
                res.render('investors/settings', {
                    publickeys: params.publickeys,
                    investorRec: params.investorRec,
                    changeKeyRequestRec: params.changeKeyRequestRec,
                    partials: common.getInvestorDashboardPartials(),
                    Data: params.Data,
                    csrfToken: encodeURI( req.csrfToken() ),
                    message: req.flash('message'),
                });
              }
        });
	},
    addnewpublickeyofinvestor(req, res) {

        if(req.query.key != "") {
            const sql = `insert into investorpublickeys(investorid, title) values(?, ?)`;
            mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.key]).then((result) => {
                res.redirect("settings");
            }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in addnewpublickeyofinvestor`);
            });
        } else
            res.redirect("settings");

    },
    deleteinvestorpublickey(req, res) {
        const sql = `delete from investorpublickeys where investorid = ? and id = ?`;
        mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.id]).then((result) => {
            res.redirect("settings");
        }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in deleteinvestorpublickey`);
        });
    },

	ownership(req, res) {
		const params = { id: req.session.user.ID };

        function getInvestorRecord(callback) {
			mysql.getInvestorRecordFromDatabase(params, req)
				.then((data) => {
					params.investorRec = data[0];
					callback(null);
				},
				(err) => {
					common.handleError(req, res, `${err.message} Error occured in wizardSubmit getInvestorRecordFromDatabase`);
				});
		  }
        function getInvestorPageData(callback) {
            common.getCommonInvestorDashboardPageProperties(req, res)
            .then((data) => {
                params.Data = data;
                callback(null);
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in dashboard getInvestorPageData`);
            });
         }
        async.waterfall([
			 getInvestorRecord,
             getInvestorPageData,
        ], (err) => {
              if (!err) {
                res.render('investors/ownership', {
                    investorRec: params.investorRec,
                    changeKeyRequestRec: params.changeKeyRequestRec,
                    partials: common.getInvestorDashboardPartials(),
                    Data: params.Data,
                    csrfToken: encodeURI( req.csrfToken() ),
                    message: req.flash('message'),
                });
              }
        });
	},
	tellafriend(req, res) {
		const params = { id: req.session.user.ID };

        function getInvestorRecord(callback) {
			mysql.getInvestorRecordFromDatabase(params, req)
				.then((data) => {
					params.investorRec = data[0];
					callback(null);
				},
				(err) => {
					common.handleError(req, res, `${err.message} Error occured in wizardSubmit getInvestorRecordFromDatabase`);
				});
		  }
        function getInvestorPageData(callback) {
            common.getCommonInvestorDashboardPageProperties(req, res)
            .then((data) => {
                params.Data = data;
                callback(null);
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in dashboard getInvestorPageData`);
            });
         }
        async.waterfall([
			 getInvestorRecord,
             getInvestorPageData,
        ], (err) => {
              if (!err) {
                res.render('investors/tellafriend', {
                    investorRec: params.investorRec,
                    changeKeyRequestRec: params.changeKeyRequestRec,
                    partials: common.getInvestorDashboardPartials(),
                    Data: params.Data,
                    csrfToken: encodeURI( req.csrfToken() ),
                    message: req.flash('message'),
                });
              }
        });
	},
    sendemail(req, res) {

      const sql = `select tellafriendtext from stos where id = ${global.config.stos[req.hostname].stoid}`;
      mysql.executeSQLStatement(sql, []).then((result) => {
        const stoEmailTexts = emailTextsController.default.globalEmailTexts(global.config.stos[req.hostname].stoid);
        if (!stoEmailTexts) throw new Error(`Email texts not found for TellAFriend`);
        const tags = {
          username: req.session.user.UserName,
          invitation: req.body.txtinvitation,
        }
        if (result[0].tellafriendtext) {
          tags.tell = `${result[0].tellafriendtext}<br/><br/>`;
        }
        let txtEmail = '';
        // if client is Konsento then send this messag format.  text is coming from email json file
        if (global.config.CurrentClientID === 0) {
          txtEmail = emailTextsController.format(stoEmailTexts.TellAFriend.Line2, tags);
        } else {
          txtEmail = emailTextsController.format(stoEmailTexts.TellAFriend.Line1, tags);
            // For all other clients use the following message format
        }

        txtEmail += '<br /><br />';
        txtEmail += getSTOFromConfig(global.config.stos[req.hostname].stoid).emailFooter;

          // if(  global.config.CurrentClientID == 0 ) {
                    // if client is Konsento then send this messag format.  text is coming from email json file
                    // txtEmail = emailTexts.TellAFriend.Line1;
                    // txtEmail += '<br /><br />';
                    // txtEmail += `${req.session.user.UserName} ${emailTexts.TellAFriend.Line2}`;
                    // txtEmail += '<br /><br />';
                    // txtEmail += req.body.txtinvitation;
                    // txtEmail += '<br /><br />';
                    // if(result[0].tellafriendtext != "" && result[0].tellafriendtext != null) {
                    //     txtEmail += result[0].tellafriendtext;
                    //     txtEmail += '<br /><br />';
                    // }
          // } else {
                    // For all other clients use the following message format
                    // txtEmail += 'Hi <br /><br />';
                    // txtEmail += `${req.session.user.UserName} has invited you to our platform`;
                    // txtEmail += '<br /><br />';
                    // if(result[0].tellafriendtext != "" && result[0].tellafriendtext != null) {
                    //     txtEmail += result[0].tellafriendtext;
                    //     txtEmail += '<br /><br />';
                    // }
                    // txtEmail += `Here is the message from ${req.session.user.UserName}`;
                    // txtEmail += req.body.txtinvitation;
                    // txtEmail += '<br /><br />';
          // }
          //   txtEmail += global.config.stos[req.hostname].emailFooter;

            const sql = `update investorsto set inviteFriendEmailText = ? where investorid = ? and stoid = ${global.config.stos[req.hostname].stoid}`;
            mysql.executeSQLStatement(sql, [req.body.txtinvitation, req.session.user.ID]).then((result) => {

                    common.sendEmail(req.hostname, req.body.emailaddress, `Invitation to join company ${global.config.stos[req.hostname].title}`, txtEmail, []).then(() => {
                        req.flash('message', 'Your proposal has been submitted');
                        res.redirect("/tellafriend");
                    }, (err2) => {
                        common.handleDebug(req, `${err2.message} Error occured in sendemail`);
                        req.flash('message', 'Some problems occured sending email. Please trying again after some time');
                        res.redirect("/tellafriend");
                    });

            }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in sendemail`);
            });

      }).catch((error) => {
          common.handleError(req, res, `${error.message} Error occured in sendemail`);
      });

    },

    forgotpassword(req, res) {
        if (VersionRedirect.toV2(req, res))
            return;

        const sto0 = global.config.stos[Object.keys(global.config.stos)[0]];
        res.render('investors/forgotpassword', {
            CustomPlatformCSSStyles: global.config.CustomPlatformCSSStyles,
            SiteParameter_PageTitle: sto0.title,
            csrfToken: encodeURI( req.csrfToken() ),
            showLogin: 1,
            logo: sto0.logo
        });
    },
    forgotpasswordpost(req, res) {
	  	  var params = {}
          const sto0 = global.config.stos[Object.keys(global.config.stos)[0]];

          function getinvestordata(callback) {
            var sql = "";
            var data = [];
            if(global.config.SingleSignInEnabled == 1) {
                sql = "select * from investor where email = ?";
                data = [req.body.iusername];
            } else {
                sql = "select * from investor i, investorsto s where i.email = ? and s.stoid = ? and i.id = s.investorid";
                data = [req.body.iusername, sto0.stoid];
            }

              mysql.executeSQLStatement(sql,data).then((result) => {

                  if(result.length == 0) {
                      params.errorCode = 1;
                      callback("error");
                  }
                  else {
                      params.id = result[0].ID;
                      params.FirstName = result[0].FirstName;
                      params.LastName = result[0].LastName;
                      params.email = result[0].email;
                      params.errorCode = 0;
                      callback(null);
                  }
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in forgotpasswordpost getinvestordata`);
              });
          }
          function deleteAllPreviousRecords(callback) {
               //delete all previous day records
               if( params.errorCode === 0) {
                  const sql = "delete from changepassword where date < CURDATE() and userid = ?";
                  mysql.executeSQLStatement(sql, [params.id]).then((result) => {
                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in forgotpasswordpost deleteAllPreviousRecords`);
                  });
               } else
                   callback(null);
          }
          function checkUserHasNotRequestedMoreThanXToday(callback) {
               //delete all previous day records
               if( params.errorCode === 0) {
                  const sql = "select count(*) as cnt from changepassword where date = CURDATE() and userid = ?";
                  mysql.executeSQLStatement(sql, [params.id]).then((result) => {
                      if(result[0].cnt > 10) {
                          params.errorCode = 2;
                          callback("error");
                      } else
                          callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in forgotpasswordpost checkUserHasNotRequestedMoreThanXToday`);
                  });
               } else
                   callback(null);
          }
		  function generateRandomData(callback) {
              if( params.errorCode === 0) {
                   var result = '';
                   var result2 = '';
                   var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                   for ( var i = 0; i < 50; i++ ) {
                      result += characters.charAt(Math.floor(Math.random() * (characters.length)));
                   }
                   characters = "0123456789";
                   for ( var i = 0; i < 5; i++ ) {
                      result2 += characters.charAt(Math.floor(Math.random() * (characters.length)));
                   }
                   params.link = result;
                   params.secretCode = result2;
                   callback(null);
              } else
                   callback(null);
		  }
          function insertDB(callback) {
               if( params.errorCode === 0) {
                  const sql = "insert into changepassword(userid, date, securelink, securecode) values(?, now(), ?, ?)";
                  mysql.executeSQLStatement(sql, [params.id, params.link, params.secretCode]).then((result) => {
                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in forgotpasswordpost insertDB`);
                  });
               } else
                   callback(null);
          }
          function sendEmail(callback) {
               if( params.errorCode === 0) {
                 const sto0 = getSTOFromConfig(0);
                 const stoCurrent = getSTOFromConfigByHostname(req.hostname) ?? sto0;
                 // If hostnames (subdomains) are used, try to capture currently active sto
                 const sto = (global.config.areSTOHostnamesEnabled === 1) ? stoCurrent : sto0;

                 const stoEmailTexts = emailTextsController.default.globalEmailTexts(sto.stoid);
                 if (!stoEmailTexts) throw new Error(`Email texts not found for forgotPassword`);

                 const link = `${sto.stolinkfull}/resetpasswordcall?id=${params.link}`
                 let txtEmail = emailTextsController.format(stoEmailTexts.forgotPassword.Line1, {
                   firstname: params.FirstName,
                   lastname: params.LastName,
                   linkHref: link,
                   linkTitle: link,
                   code: params.secretCode,
                 });
                 txtEmail += '<br /><br />';
                 txtEmail += getSTOFromConfigByHostname(req.hostname).emailFooter;

                    // let txtEmail = '';
                    // txtEmail = `Dear ${params.FirstName} ${params.LastName}`;
                    // txtEmail += '<br /><br />';
                    // txtEmail += emailTexts.forgotPassword.Line1;
                    // txtEmail += '<br /><br />';
                    // txtEmail += `<b>Link </b> : <a href='${sto0.stolinkfull}/resetpasswordcall?id=${params.link}'> ${sto0.stolinkfull}/resetpasswordcall?id=${params.link}  </a>`;
                    // txtEmail += '<br /><br />';
                    // txtEmail += `<b>Verification Code</b> : ${params.secretCode}`;
                    // txtEmail += '<br /><br />';
                    // txtEmail += sto0.emailFooter

                    common.sendEmail(req.hostname, params.email, emailTexts.forgotPassword.Subject, txtEmail, [])
                    .then(() => {
                        callback(null);
                    }, (err2) => {
                        common.handleDebug(req `${err2.message} Error occured in forgotpasswordpost sendEmail`);
                        callback(null);
                    }).catch(() => {
                        params.errorCode = 3;
                        callback("error");
                      });
               } else
                   callback(null);
          }
		  async.waterfall([
            getinvestordata,
            deleteAllPreviousRecords,
            checkUserHasNotRequestedMoreThanXToday,
			generateRandomData,
            insertDB,
            sendEmail
		  ], function (err) {
              if( params.errorCode === 1) {
                    res.render('investors/forgotpassword', {
                        SiteParameter_PageTitle: global.config.stos[req.hostname].title,
                        csrfToken: encodeURI( req.csrfToken() ),
                        showLogin: 1,
                        logo: global.config.stos[req.hostname].logo
                    });
               } else {
                      res.render('investors/forgotpassword', {
                          SiteParameter_PageTitle: global.config.stos[req.hostname].title,
                          errorCode: params.errorCode,
                          logo: global.config.stos[req.hostname].logo,
                          showLogin: 0,
                      });
                }
		  });

    },
    resetpasswordcall(req, res) {
        var params = {}

          function getinvestordata(callback) {
              /*const sql = "select * from changepassword where securelink = ?";
              mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                  if(result == null) {
                      params.errorCode = 1;
                      callback("error");
                  }
                  else {
                      params.id = result[0].ID;
                      params.email = result[0].email;
                      callback(null);
                  }
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in settlements getDatabaseInformation`);
              });*/
              callback(null);
          }
		  async.waterfall([
            getinvestordata,
		  ], function (err) {
              res.render('investors/resetpassword', {
                  operation: 1,
                  csrfToken: encodeURI( req.csrfToken() ),
                  id: req.query.id,
                  SiteParameter_PageTitle: global.config.stos[req.hostname].title,
                  showLogin: 0,
                  logo: global.config.stos[req.hostname].logo
              });
		  });
    },
    resetpasswordpost(req, res) {
        var params = {}

          function getinvestordata(callback) {
              const sql = "select * from changepassword where securelink = ?";
              mysql.executeSQLStatement(sql, [req.body.id]).then((result) => {
                  if(result.length === 0) {
                      params.errorCode = 2;
                      callback(null);
                  }
                  else {
                      params.errorCode = 0;
                      params.rec = result[0];
                      callback(null);
                  }
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in resetpasswordpost getinvestordata`);
              });
          }
          function checkDataInfo(callback) {
              if(params.errorCode === 0) {
                  if(params.rec.securecode != req.body.secretcode) {
                     params.errorCode = 2;
                     callback(null);
                  } else {
                      if(req.body.newPassword != req.body.newResetPassword) {
                         params.errorCode = 2;
                         callback(null);
                      } else {
                         params.errorCode = 3;
                         callback(null);
                      }
                  }
              } else {
                 callback(null);
              }
          }
          function changePassword(callback) {
              if(params.errorCode === 3) {
                  const sql = "update investor set password = ? where id = ?";
                  mysql.executeSQLStatement(sql, [common.getSHA256Hash(req.body.newPassword), params.rec.userid]).then((result) => {

                          const sql2 = "delete from changepassword where securelink = ?";
                          mysql.executeSQLStatement(sql2, [req.body.id]).then((result) => {
                              callback(null);
                          });

                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in resetpasswordpost changePassword`);
                  });
              } else {
                  callback(null);
              }
          }
		  async.waterfall([
            getinvestordata,
            checkDataInfo,
            changePassword
		  ], function (err) {
              res.render('investors/resetpassword', {
                  operation: params.errorCode,
                  SiteParameter_PageTitle: global.config.stos[req.hostname].title,
                  logo: global.config.stos[req.hostname].logo
              });
		  });
    },

    votingdetails(req, res) {
          var params = {};

          function getVotingDetails(callback) {

              const STOUnRegisteredInvestorTypeIDsinCommaDelimitedText= global.config.stos[req.hostname].stoinvestortypesnotonshareregister.reduce((acc,val) =>
                      acc + "," + val
                  ,"").slice(1);
              mysql.getVotingDetails(req.query.id).then((result) => {
                  params = result;
                  callback(null);
              }).catch((error) => {
                  logger.error(`Error occurred in  votingdetails getVotingDetails - ${error.message}`);
              });
          }
          function getInvestorRecord(callback) {
                  const sql = `select * from investor i, investorsto t where i.id = t.investorid and i.id = ? and t.stoid = ?`;
                  mysql.executeSQLStatement(sql, [req.session.user.ID, global.config.stos[req.hostname].stoid]).then((result) => {
                      if(result.length === 0)
                          common.handleError(req, res, `user ${req.session.user.ID} try to vote for a STO ${global.config.stos[req.hostname].stoid} meeting/poll ${req.query.id} that he is not authorized to`);
                      else {
                          params.KYCCurrentStatus = result[0].KYCCurrentStatus;
                          params.expectedShares = result[0].expectedShares;
                          params.expectedInvestment = result[0].expectedInvestment;
                          callback(null);
                      }
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in castVote isusereligibleforvote`);
                  });
          }
          function getCurrentUserOption(callback) {
              var sql = `select * from votinguser u, votingoptions o where u.votingoptionsid = o.id and u.votingid=? and u.userid=?;`

              mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID]).then((result) => {
                  if(result.length != 0) {
                      params.userSelectionOption = result[0].optiontxt;
                      params.userSelection = 1;
                  }
                  else
                      params.userSelection = 0;

                  callback(null);
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in settlements getDatabaseInformation`);
              });

          }
          function getInvestorCurrentSharesinSTO(callback) {

                if( global.config.stos[req.hostname].stoinvestortypesnotonshareregister.includes(params.KYCCurrentStatus) ) {
                      params.InvestorShares = params.expectedShares;
                      params.InvestorInvestment = params.expectedInvestment;
                      callback(null);
                } else {
                      var sql = `select sum(shares) as shares, sum( t.premimum * s.shares ) as investment  from shares s, sharetypes t where investorid = ? and s.shareTypeid = t.id and isVotingRightsApplicable = 1 and t.stoid = ?`;

                      mysql.executeSQLStatement(sql, [req.session.user.ID, global.config.stos[req.hostname].stoid]).then((result) => {
                          params.InvestorShares = result[0].shares;
                          params.InvestorInvestment = result[0].investment;
                          callback(null);
                      }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in settlements getDatabaseInformation`);
                      });
                }

          }
          function getInvestorPageData(callback) {
                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                    params.Data = data;
                    callback(null);
                }, (err) => {
                    common.handleError(req, res, `${err.message} - Error occured in dashboard getInvestorPageData`);
                });
          }
		  async.waterfall([
            getVotingDetails,
            getInvestorRecord,
            getCurrentUserOption,
            getInvestorCurrentSharesinSTO,
            getInvestorPageData
		  ], (err) => {
            res.render('investors/votingdetails', {
                 userSelectionOption: params.userSelectionOption,
                 userSelection: params.userSelection,
                 id: req.query.id,
                 open: params.open,
                 stoid: req.query.stoid,
                 TotalInvestorsInSTO: params.TotalInvestorsInSTO,
                 VotesCasted: params.VotesCasted,
                 Record: params.Record,
                 OptionRecord: params.OptionRecord,
                 InvestorShares: params.InvestorShares,
                 InvestorInvestment: params.InvestorInvestment,
                 SharesRecord: params.SharesRecord,
                 partials: common.getInvestorDashboardPartials(),
                 Data: params.Data,
                 totalTokens: params.totalTokens,
                 totalInvestment: params.totalInvestment,
                 inhandShares: params.inhandTokens,
                 inhandInvestment: params.inhandInvestment,
                 expectedshares: params.expectedshares,
                 expectedinvestment: params.expectedinvestment
                 //soldShares: params.soldShares,
            });
		  });
    },
    votings(req, res) {
        const params = {};

        function getInvestorPageData(callback) {
            common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                    params.Data = data;
                    callback(null);
                }, (err) => {
                    common.handleError(req, res, `${err.message} - Error occured in votings getInvestorPageData`);
                });
        }
        function checkIfUserHasAnyShares(callback) {
              const sql = `select  COALESCE(SUM(shares),0) as sum from shares where investorID = ?`; 
              mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => { 
                    params.InvestorShareCount = parseFloat( result[0].sum );
                    callback(null); 
              }).catch((error) => { 
                    common.handleError(req, res, `${error.toString()} - votings checkIfUserHasAnyShares Error occured `); 
              }); 
        }
        function getAllCurrentVotings(callback) {
            const votingTypes = [];
            const pastVotingTypes = [];
            if(common.isInvestorInRegisteredInvesotorType(req) === 1) {
                pastVotingTypes.push(0);
                pastVotingTypes.push(1);
                if (params.Data.isVotingForThisInvestorEnabled === 1) {
                    votingTypes.push(0);
                }
                if (params.Data.isMeetingForThisInvestorEnabled === 1) {
                    votingTypes.push(1);
                }
            } else {
                pastVotingTypes.push(0);
                if (params.Data.isVotingForThisInvestorEnabled === 1) {
                    votingTypes.push(0);
                }
            }
            if(params.InvestorShareCount > 0) {
                let sql = `select s.title as stoTitle, v.stoid, v.id, v.title, v.type, DATE_FORMAT(opendate,'%M %d %Y') as opendate, DATE_FORMAT(closedate,'%M %d %Y') as closedate  from voting v inner join stos s on s.id = v.stoid where  v.type in(${pastVotingTypes}) and v.closedate < now() order by closedate desc;`;
                if (votingTypes.length) {
                    sql += ` select s.title as stoTitle, v.stoid, v.id, v.title, v.type, DATE_FORMAT(opendate,'%M %d %Y') as opendate, DATE_FORMAT(closedate,'%M %d %Y') as closedate from voting v inner join stos s on s.id = v.stoid where v.type in(${votingTypes}) and v.opendate > now() order by closedate desc;
                            select s.title as stoTitle, v.stoid, v.id, v.title, v.type, DATE_FORMAT(opendate,'%M %d %Y') as opendate, DATE_FORMAT(closedate,'%M %d %Y') as closedate from voting v inner join stos s on s.id = v.stoid where v.type in(${votingTypes}) and v.opendate <= now() and v.closedate >= now() order by closedate desc;`;
                }
                mysql.executeSQLStatement(sql, []).then((result) => {
                    if (votingTypes.length) {
                        params.pastVotingRec = result[0];
                        params.futureVotingRec = result[1];
                        params.currentVotingRec = result[2];
                    } else {
                        params.pastVotingRec = result;
                    }
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} - Error occured in votings getAllCurrentVotings`);
                });
            } else {
                    //investor do not have any shares in the company so do not show him the voting campaigns
                    params.futureVotingRec = [];
                    params.currentVotingRec = [];
                    params.pastVotingRec = [];
                    callback(null);
            }

		  }
		  async.waterfall([
            getInvestorPageData,
            checkIfUserHasAnyShares,
			getAllCurrentVotings
		  ], (err) => {
              if (!err) {
                    res.render('investors/voting', {
                            futureVotingRec: params.futureVotingRec,
                            currentVotingRec: params.currentVotingRec,
                            pastVotingRec: params.pastVotingRec,
                            partials: common.getInvestorDashboardPartials(),
                            Data: params.Data,
                    });
              }
		  });
    },
    castVote(req, res) {
          const params = {};

          function isusereligibleforvote(callback) {
              const sql = `select * from investor i, investorsto t where i.id = t.investorid and i.id = ?; Select isActiveByAdmin from votingoptions where id = ?`;
              mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.oid]).then((result) => {
                  if(result[0].length === 0)
                      common.handleError(req, res, `user ${req.session.user.ID} try to vote for a meeting/poll ${req.query.id} that he is not authorized to`);
                  else {
                      // from meetingview in function submitAgendaChoise type is set to 1 with option value type indicates this is meeting
                      // with option = (yes not or absentation)
                      if(result[1][0].isActiveByAdmin == 1 && req.query.type != null) {
                          //if this is meeting and vote has already been casted then return
                          req.flash('MeetingMessage', 'Voting is closed and your vote for the agenda item is not casted')
                          return res.redirect(`/meetingdetails?id=${req.query.id}`);
                      } else {
                          params.KYCCurrentStatus = result[0][0].KYCCurrentStatus;
                          params.expectedShares = result[0][0].expectedShares;
                          params.expectedInvestment = result[0][0].expectedInvestment;
                          callback(null);
                      }
                  }
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in castVote isusereligibleforvote`);
              });
          }
          function getinvestorcontrinutedvotes(callback) {
              if( global.config.stos[req.hostname].stoinvestortypesnotonshareregister.includes(params.KYCCurrentStatus) ) {
                    params.investmentContributed = params.expectedInvestment;
                    params.sharesContributed = params.expectedShares;
                    params.nominalInvestmentContributed = params.expectedInvestment;
                    callback(null);
              } else {
                  const sql = `select sum(s.shares * t.votingPower) as sums, sum(t.premimum * s.shares) as investmentsum, sum(t.nominalValue * s.shares) as nominalinvestmentsum from shares s, sharetypes t where investorid = ? and s.shareTypeid = t.id and t.isVotingRightsApplicable = 1`;
                  mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => {
                      if(result != null) {
                          if(result[0].sums != null)
                              params.sharesContributed = result[0].sums;
                          else
                              params.sharesContributed = 0;

                          if(result[0].sums != null)
                              params.investmentContributed = result[0].investmentsum;
                          else
                              params.investmentContributed = 0;

                          if(result[0].sums != null)
                              params.nominalInvestmentContributed = result[0].nominalinvestmentsum;
                          else
                              params.nominalInvestmentContributed = 0;

                          callback(null);
                      }
                      else {
                          params.investmentContributed = 0;
                          params.sharesContributed = 0;
                          params.nominalInvestmentContributed = 0;
                          callback(null);
                      }
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in forgotpasswordpost getinvestordata`);
                  });
              }
          }
          function deleteOldOption(callback) {
              var sql = '';
              var data = [];

              if(req.query.type != null) {
                  sql = `delete from votinguser where votingid = ? and userid = ? and votingoptionsid = ?`;
                  data = [req.query.id, req.session.user.ID, req.query.oid]
              } else {
                  sql = `delete from votinguser where votingid = ? and userid = ?`;
                  data = [req.query.id, req.session.user.ID];
              }

              mysql.executeSQLStatement(sql, data).then((result) => {
                  callback(null);
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in castVote deleteOldOption`);
              });
          }
          function saveNewOption(callback) {
              var optionValue = '0';
              if(req.query.type != null)             // from meetingview in function submitAgendaChoise type is set to 1 with option value
                  optionValue = req.query.option;    // (yes not or absentation)
              if(params.sharesContributed > 0) {
                  var sql = `insert into votinguser(votingid, userid, votingoptionsid, votingoptionsvalue, votesContributed,  isCastedByInvestor, investmentContributed, nominalInvestmentContributed) values(?, ?, ?, ?, ?, 1, ?, ?)`;
                  mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID, req.query.oid, optionValue, params.sharesContributed, params.investmentContributed, params.nominalInvestmentContributed]).then((result) => {
                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in castVote saveNewOption`);
                  });
              } else
                  callback(null);
          }
		  async.waterfall([
            isusereligibleforvote,
            getinvestorcontrinutedvotes,
			deleteOldOption,
            saveNewOption
		  ], (err) => {
              if(req.query.type != null)
                return res.redirect(`/meetingdetails?id=${req.query.id}`);
              else
                return res.redirect(`/votingdetails?id=${req.query.id}`);
          });
    },
    meetingdetails(req, res) {
        const paramsdata = {};

        function gettatistics(callback) {
            /*select count(*) as count from investor i, investorsto t where t.stoid = ${global.config.stos[req.hostname].stoid} and i.id = t.investorid and t.iskyc=1 \
            ;\
            select sum(s.shares) as TotalShares from shares s, sharetypes p where s.shareTypeid = p.id and p.stoid = ${global.config.stos[req.hostname].stoid} and p.isVotingRightsApplicable = 1 \
            ;\*/

            const stmt = `select votingoptionsid, count(*) as investorCount, sum(votesContributed) as totalVotesContributed, sum(nominalInvestmentContributed) as totalNominalInvestment from votinguser where votingid = ? group by votingoptionsid;`

			mysql.executeSQLStatement(stmt, [req.query.id]).then((result) => {
                //paramsData.totalInvestors = result[0][0].count;
                //paramsData.totalShares = result[1][0].TotalShares;

                paramsdata.totals = {};
                result.forEach((obj) => {
                    paramsdata.totals[obj.votingoptionsid] = {
                        "totalInvestors": obj.investorCount,
                        "totalShares": obj.totalVotesContributed,
                        "totalNominalShares": obj.totalNominalInvestment
                    }
                })

                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error occured in meetingView gettatistics`);
            });

        }
        function isusereligibleforvote(callback) {
              const sql = `select * from investor i, investorsto t where i.id = t.investorid and i.id = ? and t.stoid = ?`;
              mysql.executeSQLStatement(sql, [req.session.user.ID, global.config.stos[req.hostname].stoid]).then((result) => {
                  if(result.length === 0)
                      common.handleError(req, res, `user ${req.session.user.ID} try to access for a voting data of STO ${global.config.stos[req.hostname].stoid} that he is not authorized to`);
                  else
                      callback(null);
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in castVote isusereligibleforvote`);
              });
        }
        function getInvestorPageData(callback) {
			const stmt = `SELECT * FROM votinguser where userid=? and votingid=? \
            ;\
            Select * from votinguserdata where investorID = ? and votingid = ? \
            ;\
            SELECT votingoptionsid, votingoptionsvalue, sum(votescontributed) as sum, sum(nominalInvestmentContributed) as sumNominalInvestment, count(*) as count FROM votinguser v, investorsto vs  where vs.investorid = v.userid and vs.stoid = ${global.config.stos[req.hostname].stoid} and v.votingid = ?  group by votingoptionsid, votingoptionsvalue`;

			mysql.executeSQLStatement(stmt, [req.session.user.ID, req.query.id, req.session.user.ID, req.query.id, req.query.id]).then((result) => {
				paramsdata.UserVoting = result[0];
                if(result[1].length != 0)
                    paramsdata.userData = result[1][0];
                else
                    paramsdata.userData = {"attendMeeting":-1, "unannounceDecision":1 };

                paramsdata.votingData = result[2];

                for (let i = 0; i < paramsdata.votingData.length; i++) {
                    paramsdata.votingData[i].PercentInvestorCount = math.multiply(
                        math.divide(paramsdata.votingData[i].count ?? 0, paramsdata.totals[paramsdata.votingData[i].votingoptionsid].totalInvestors ?? 0) ?? 0,
                        100
                        ).toFixed(2).toString();

                    paramsdata.votingData[i].PercentShares = math.multiply(
                        math.divide(paramsdata.votingData[i].sum ?? 0, paramsdata.totals[paramsdata.votingData[i].votingoptionsid].totalShares ?? 0) ?? 0,
                        100
                        ).toFixed(2).toString();

                    paramsdata.votingData[i].PercentNominalInvestment = math.multiply(
                        math.divide(paramsdata.votingData[i].sumNominalInvestment ?? 0, paramsdata.totals[paramsdata.votingData[i].votingoptionsid].totalNominalShares ?? 0) ?? 0,
                        100
                        ).toFixed(2).toString();
                }
				callback(null);
            }).catch((error) => {
				common.handleError(req, res, `${error.message}Error occured in signcontract getContractRecord`);
            });
        }
		  async.waterfall([
            gettatistics,
            isusereligibleforvote,
			getInvestorPageData
		  ], (err) => {
                mysql.getMeetingData(req.query.id, req.hostname).then((params) => {

                      for(var i=0; i<paramsdata.UserVoting.length; i++) {
                          for(var j=0; j<params.AgendaItems.length; j++) {
                               if(paramsdata.UserVoting[i].votingoptionsid == params.AgendaItems[j].optionID)
                                   params.AgendaItems[j].userVotedOption = paramsdata.UserVoting[i].votingoptionsvalue
                          }
                      }

                        var allowVoting = 0;
                        if( params.MeetingRecord.open == 2 || (paramsdata.userData.attendMeeting == 2 && params.MeetingRecord.open == 1) )
                           allowVoting = 1;

                        var page = "investors/meetingview";
                        if(req.query.op != null)
                            if(req.query.op == "print")
                                page = "admin/voting/votingresultsprint";

                        common.getCommonInvestorDashboardPageProperties(req, res).then((data) => {
                             res.render(page, {
                                callFromAdmin: 0,
                                MeetingRecord: params.MeetingRecord,
                                AgendaItems: params.AgendaItems,
                                votingData: paramsdata.votingData,
                                partials: common.getInvestorDashboardPartials(),
                                Data: data,
                                allowVoting: allowVoting,
                                companytype: global.config.stos[req.hostname].companytype,
                                userData: paramsdata.userData,
                                message: req.flash('MeetingMessage'),
                             });
                        }, (err) => {
                            common.handleError(req, res, `${error.message} - Error occured in meetingdetails`);
                        });

                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in meetingView`);
                });
		  });
    },
    getVotingAgendaItemsStatuses(req, res) {

    },

    saveUserMeetingDetails(req, res) {
          const params = {};

          function deleteOldOption(callback) {
              var sql = `delete from votinguserdata where investorID = ? and votingid = ?`;
              mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.id]).then((result) => {
                  callback(null);
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in saveUserMeetingDetails deleteOldOption`);
              });
          }
          function saveNewOption(callback) {
              var sql = `insert into votinguserdata(investorID, votingid, attendMeeting, unannounceDecision) values(?, ?, ?, ?)`;
              mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.id, req.query.attend, req.query.unannounce]).then((result) => {
                  callback(null);
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in saveUserMeetingDetails saveNewOption`);
              });
          }
		  async.waterfall([
			deleteOldOption,
            saveNewOption
		  ], (err) => {
              if(req.query.type != null)
                return res.redirect(`/meetingdetails?id=${req.query.id}`);
              else
                return res.redirect(`/votingdetails?id=${req.query.id}`);
          });

    },
	downloadAgendaIemDocument(req, res) {
        mysql.downloadAgendaItem(req, res);
	},

    paypalPayment(req, res) {
        common.getCommonInvestorDashboardPageProperties(req, res)
        .then((data) => {
                 res.render('investors/payments/paypal', {
                    partials: common.getInvestorDashboardPartials(),
                    Data: data,
                 });
        }, (err) => {
            common.handleError(req, res, `${error.message} - Error occured in paypalPayment`);
        });
    },
    sendPayPalPayment(req, res) {

            // create payment object
            var payment = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://127.0.0.1:3001/pyamentSuccess",
                    "cancel_url": "http://127.0.0.1:3001/pyamentFailure"
                },
                "transactions": [{
                    "amount": {
                        "total": 1.00,
                        "currency": "USD"
                    },
                    "description": " a book on mean stack "
                }]
            }


            // call the create Pay method
            common.createPayPalPaymentObject( payment )
            .then( ( transaction ) => {
                var id = transaction.id;
                var links = transaction.links;
                var counter = links.length;
                while( counter -- ) {
                    if ( links[counter].method == 'REDIRECT') {
                        // redirect to paypal where user approves the transaction
                        return res.redirect( links[counter].href )
                    }
                }
            }).catch( ( err ) => {
                console.log( err );
                res.redirect('/err');
            });

    },
    pyamentSuccess(req, res) {
        common.getCommonInvestorDashboardPageProperties(req, res)
        .then((data) => {
             res.render('investors/payments/success', {
                partials: common.getInvestorDashboardPartials(),
                Data: data,
             });
        }, (err) => {
            common.handleError(req, res, `${error.message} - Error occured in pyamentSuccess`);
        });
    },
    pyamentFailure(req, res) {
        common.getCommonInvestorDashboardPageProperties(req, res)
        .then((data) => {
                 res.render('investors/payments/err', {
                    partials: common.getInvestorDashboardPartials(),
                    Data: data,
                 });
        }, (err) => {
            common.handleError(req, res, `${error.message} - Error occured in pyamentFailure`);
        });
    },




// ---------------------------------------------------------------------------------
//   Trading Module
// ---------------------------------------------------------------------------------
	trading(req, res) {
        const params = {};

        async.waterfall([
            function fun1(callback) {
                  const sql = `select t.id, t.title, s.shares, t.nominalValue, t.premimum, t.currencyid from shares s, sharetypes t where s.shareTypeid = t.ID and s.investorID = ? and t.stoid = ${global.config.stos[req.hostname].stoid} and t.isInvestorTradable = 1\
                  ;\
                  select e.ID, DATE_FORMAT(dateFrom,'%M %d %Y') as dateFrom,  DATE_FORMAT(dateTo,'%M %d %Y') as dateTo, t.title, e.rateFrom, e.rateTo, t.currencyid, e.type, e.shares,  e.atomicSwapCurrentStatus, e.atomicSwapAcceptable from exchangeorders e, sharetypes t where t.stoid = ${global.config.stos[req.hostname].stoid} and  e.sharesTypeID = t.id and e.investorID = ? and e.type = 1 and t.isInvestorTradable = 1 order by dateFrom desc \
                  ;\
                  select e.ID, DATE_FORMAT(dateFrom,'%M %d %Y') as dateFrom,  t.title, e.rateFrom, e.rateTo, t.currencyid, e.shares, e.type, e.atomicSwapCurrentStatus, e.atomicSwapAcceptable from exchangeorders e, sharetypes t where  DATE(CURDATE()) >= e.dateFrom and DATE(CURDATE()) <= e.dateTo and atomicSwapCurrentStatus != 5 and atomicSwapCurrentStatus != 6 and atomicSwapCurrentStatus != 7 and t.stoid = ${global.config.stos[req.hostname].stoid} and e.sharesTypeID = t.id and t.isInvestorTradable = 1 order by dateFrom desc \
                  ;\
                  select e.ID, o.ID as offerID, t.title, t.currencyid,  DATE_FORMAT(dateFrom,'%M %d %Y') as dateFrom,  DATE_FORMAT(dateTo,'%M %d %Y') as dateTo, e.rateFrom as AskingRate, o.rateFrom as offeredRate, o.sharesPartial,  e.atomicSwapCurrentStatus, e.atomicSwapAcceptable from exchangeoffers o, exchangeorders e, sharetypes t where o.exchangeOrderID = e.ID and t.id = e.sharesTypeID and o.investorID = ? and e.type = 1 and t.stoid = ${global.config.stos[req.hostname].stoid} and t.isInvestorTradable = 1\
                  ;\
                  select DATE_FORMAT(exchangeOpenDate,'%M %d %Y') as exchangeOpenDate from stos where id = ? \
                  ;\
                  select e.ID, DATE_FORMAT(dateFrom,'%M %d %Y') as dateFrom,  DATE_FORMAT(dateTo,'%M %d %Y') as dateTo, t.title, e.rateFrom, e.rateTo, t.currencyid, e.type, e.shares,  e.atomicSwapCurrentStatus, e.atomicSwapAcceptable from exchangeorders e, sharetypes t where e.sharesTypeID = t.id and e.investorID = ? and e.type = 2 and t.stoid = ${global.config.stos[req.hostname].stoid} and t.isInvestorTradable = 1 order by dateFrom desc \
                ;\
                  select e.ID, o.ID as offerID, t.title, t.currencyid,  DATE_FORMAT(dateFrom,'%M %d %Y') as dateFrom,  DATE_FORMAT(dateTo,'%M %d %Y') as dateTo, e.rateFrom,  e.atomicSwapCurrentStatus, e.atomicSwapAcceptable as AskingRate, o.sharesPartial,  o.rateFrom as offeredRate from exchangeoffers o, exchangeorders e, sharetypes t where o.exchangeOrderID = e.ID and t.id = e.sharesTypeID and o.investorID = ? and e.type = 2 and t.stoid = ${global.config.stos[req.hostname].stoid} and t.isInvestorTradable = 1\
                  ;\                `;

                  mysql.executeSQLStatement(sql, [req.session.user.ID, req.session.user.ID, req.session.user.ID, global.config.stos[req.hostname].stoid, req.session.user.ID, req.session.user.ID] ).then((result) => {
                      params.sharesRec = result[0];
                      params.sells = result[1];                        //   My Sell Trade
                      params.exchange = result[2];                //  All Current Exchange Orders
                      params.buys = result[3];                        //  My Buy Offers for other sellers in result 1
                      params.myBuys = result[5];                   //  My Buy Trade
                      params.mySellOffers = result[6];           //  My Sell Offers for other buyers in result 5

                    var date2 = new Date(  result[4][0].exchangeOpenDate  );
                    var today = new Date();
                    if(date2 > today)
                        params.exchangeIsClose = 1;
                    else
                        params.exchangeIsClose = 0;

                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in castVote isusereligibleforvote`);
                  });
            },
            function fun1(callback) {
                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                        res.render('investors/exchange/trading', {
                            myBuys: params.myBuys,
                            mySellOffers: params.mySellOffers,
                            buys: params.buys,
                            sells: params.sells,
                            sharesRec: params.sharesRec,
                            exchange: params.exchange,
                            exchangeIsClose: params.exchangeIsClose,
                            partials: common.getInvestorDashboardPartials(),
                            Data: data,
                        });
                }, (err) => {
                    common.handleError(req, res, `${error.message} - Error occured in trading`);
                });
            }
        ]);
	},

    //these sets of function are related to when other investors open current trades open in exchange and make their offers
    //both buy and sell are handled with these same functions

    //NEW Trades end points
    //open a new SELL trade in the system
    tradingsell(req, res) {
        const params = {};

        async.waterfall([
            function fun1(callback) {
                if(req.query.op == "0") {
                        //new record
                        const sql = `select t.currencyid, t.nominalValue, t.premimum, t.title, s.shares, t.isblockchain from sharetypes t, shares s where t.id = s.shareTypeid and s.investorID = ? and t.ID = ?;   SELECT coalesce(sum(shares), 0) as sum from shareswallet where investorid = ? and sharesid = ? and publickey != "platform" `;

                        mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.id, req.session.user.ID, req.query.id]).then((result) => {
                            params.record = result[0][0];
                            params.record.shares = math.subtract(params.record.shares ?? 0, parseFloat(result[1][0].sum) ?? 0) ?? 0;
                            callback(null);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error occured in tradingsell`);
                        });

                } else {
                        //edit
                        const sql = `select t.currencyid, t.title, e.shares, e.type, DATE_FORMAT(e.dateFrom,'%M %d %Y') as dateFrom, DATE_FORMAT(dateTo,'%M %d %Y') as dateTo, e.rateFrom, e.rateTo, e.description from sharetypes t, exchangeorders e where t.id = e.sharesTypeID and e.investorID = ? and e.id = ?`;
                        mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.id]).then((result) => {
                            params.record = result[0];
                            callback(null);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error occured in tradingsell`);
                        });

                }
            },
            function fun2(callback) {
                // get blockchain count
                const sql = `SELECT * FROM shareswallet where investorid = ? and sharesid = ? and publickey != "platform"`;
                mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.id]).then((result) => {
                    params.blockchainShares = result;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in tradingsell`);
                });
            },
            function fun3(callback) {
                const sql = `select * from swaptokens`;
                mysql.executeSQLStatement(sql, []).then((result) => {
                    params.swaptokens = result;
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in tradingsell`);
                });
            },
            function fun4(callback) {
                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                        res.render('investors/exchange/sell', {
                            op: parseInt(req.query.op),
                            record: params.record,
                            id: req.query.id,
                            swaptokens: params.swaptokens,
                            partials: common.getInvestorDashboardPartials(),
                            blockchainShares: params.blockchainShares,
                            Data: data,
                            csrfToken: encodeURI( req.csrfToken() ),
                            ShareCountInFractions: global.config.ShareCountInFractions
                        });
                }, (err) => {
                    common.handleError(req, res, `${error.message} - Error occured in tradingsell`);
                });
            }
        ]);
    },
    tradingsellpost(req, res) {
        var params = {};

        function checkValues(callback) {
            //TODO check values
            //console.log(req.body.dateFrom);
            //console.log(req.body.dateTo);
            //console.log(req.body.currentSharesWalletID);
            //console.log(req.body.currentShares);
            //console.log(req.body.currentAmount);
            callback();
        }
        function insertData(callback) {
            if(req.body.op == "0") {

                if(req.body.currentSharesWalletID == "0") {
                        const sql = `insert into exchangeorders(type, investorID, dateFrom, dateTo, sharesTypeID, shares, rateFrom, rateTo, description, atomicSwapAcceptable, atomicSwapCurrentStatus) values(?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)`;
                        mysql.executeSQLStatement(sql, [1, req.session.user.ID, req.body.dateFrom, req.body.dateTo, req.body.sid, req.body.currentShares, req.body.currentAmount, req.body.rateTo, req.body.desc]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error occured in tradingsellpost`);
                        });
                } else {
                        const sql = `insert into exchangeorders(type, investorID, dateFrom, dateTo, sharesTypeID, shares, 
                                            rateFrom, rateTo, description, atomicSwapCurrentStatus, atomicSwapExchangeOffersID, 
                                            atomicSwapAcceptable, atomicSwapTokenAddressAcceptable, atomicSwapSharesWalletID ) 
                                            values(?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 1, ?, ?)`;
                        mysql.executeSQLStatement(sql, [1, req.session.user.ID, req.body.dateFrom, req.body.dateTo, req.body.sid, req.body.currentShares, req.body.currentAmount, req.body.rateTo, req.body.desc, req.body.swaptoken, req.body.currentSharesWalletID]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                            common.handleError(req, res, `${error.message} Error occured in tradingsellpost`);
                        });
                }

            } else {
                const sql = `update exchangeorders set dateTo = ?, rateFrom = ?, rateTo = ?, description = ? where id = ?`;
                mysql.executeSQLStatement(sql, [req.body.dateTo, req.body.rateFrom, req.body.rateTo, req.body.desc, req.body.id]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in tradingsellpost`);
                });
            }
        }
        async.waterfall([
            checkValues,
            insertData
        ], (err) => {
            if (!err) {
                res.redirect("trading");
            }
        });
    },

    //open a new BUY trade in the system
    opennewbuyorder(req, res) {
        const sql = 'select * from sharetypes where stoid = ? and isInvestorTradable = 1'; 
        mysql.executeSQLStatement(sql, [global.config.stos[req.hostname].stoid]).then((result) => { 
                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                        var currencyID = 0;
                        if(result.length > 0)
                            currencyID = result[0].currencyid;

                        res.render('investors/exchange/newbuy', {
                            currencyID: currencyID,
                            shareTypes: result,
                            partials: common.getInvestorDashboardPartials(),
                            Data: data,
                            csrfToken: encodeURI( req.csrfToken() ),
                            ShareCountInFractions: global.config.ShareCountInFractions
                        });
                }, (err) => {
                    common.handleError(req, res, `${error.message} - Error occured in trading`);
                });
        }).catch((error) => { 
            common.handleError(req, res, `${error.toString()} - Error occured `); 
        });
    },
    opennewbuyorderpost(req, res) {
            const params = {};

            async.waterfall ( [
                function getSTORecord (callback) {

                    const sql = `insert into exchangeorders(type, investorID, dateFrom, dateTo, sharesTypeID, shares, rateFrom, rateTo, description, atomicSwapCurrentStatus, atomicSwapAcceptable) values(?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)`;
                    mysql.executeSQLStatement(sql, [2, req.session.user.ID, req.body.dateFrom, req.body.dateTo, req.body.shareTypeSelect, req.body.shares, req.body.rateFrom, req.body.rateTo, req.body.desc]).then((result) => {

                            res.redirect("trading")

                    }).catch((error) => {
                        common.handleError(req, res, `${error.message} Error occured in tradingsellpost`);
                    });

                }, function function2 (callback) {
                    res.redirect("trading");
                }
            ]);
    },

    //MAKE A OFFER to a BUY or SEL trade in exchange or updare current trade
    tradingbuy(req, res) {
        const params = {};

        async.waterfall([
            function fun1(callback) {
                const sql = `select e.ID, investorid, DATE_FORMAT(e.dateFrom,'%M %d %Y') as dateFrom,  DATE_FORMAT(e.dateTo,'%M %d %Y') as dateTo, e.rateFrom, e.rateTo, e.shares, e.description, s.id as shareTypeID, s.title, s.currencyid, s.isblockchain, e.type, atomicSwapCurrentStatus, atomicSwapExchangeOffersID, atomicSwapAcceptable, atomicSwapTokenAddressAcceptable, atomicSwapSharesWalletID FROM exchangeorders e, sharetypes s where e.id = ? and e.sharesTypeID = s.id \
                              ;\
                              select w.publickey from shareswallet w, sharetypes s where w.sharesID = s.ID and s.stoid = ${global.config.stos[req.hostname].stoid} and investorID = ${req.session.user.ID} and publicKey != "platform"`;
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.record = result[0][0];
                    params.publickeys =  result[1];         //used for list of public keys for buyer

                    params.isRecordBelongToUser = 0;
                    if(req.session.user.ID == params.record.investorid)
                        params.isRecordBelongToUser = 1;

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in tradingbuy fun1`);
                });
            },
            function fun2(callback) {
                const sql = `select amount from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?`;
                mysql.executeSQLStatement(sql, [req.session.user.ID, params.record.currencyid, global.config.stos[req.hostname].stoid ]).then((result) => {
                    if(result.length > 0)
                        params.investorAmount = result[0].amount;
                    else
                        params.investorAmount = 0;

                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in tradingbuy fun2`);
                });
            },
            function fun22(callback) {
                if( params.record.isblockchain == 0 ) {

                            const sql = `select shares from shares where investorid = ? and sharetypeid = ? and stoid = ?`;
                            mysql.executeSQLStatement(sql, [req.session.user.ID,  params.record.shareTypeID, global.config.stos[req.hostname].stoid]).then((result) => {

                                    if(result.length > 0)
                                        params.investorNonBlockchainShares = result[0].shares;
                                    else
                                        params.investorNonBlockchainShares = 0;

                                    callback(null);

                            }).catch((error) => {
                                common.handleError(req, res, `${error.message} Error occured in tradingbuy fun22`);
                            });

                } else {

                            const sql = `select * from shareswallet where investorID = ? and sharesID = ? and publicKey = "platform"`;
                            mysql.executeSQLStatement(sql, [ req.session.user.ID,  params.record.shareTypeID ]).then((result) => {

                                    if(result.length > 0)
                                        params.investorNonBlockchainShares = result[0].shares;
                                    else
                                        params.investorNonBlockchainShares = 0;

                                    callback(null);
                            }).catch((error) => {
                                common.handleError(req, res, `${error.message} Error occured in tradingbuy fun22`);
                            });

                    //params.investorNonBlockchainShares = 0;
                    //callback(null);
                }
            },
            function fun3(callback) {
                if(params.record.atomicSwapAcceptable) {
                    const sql = `select publicKey, sharesID from shareswallet where id = ?`;
                    mysql.executeSQLStatement(sql, [params.record.atomicSwapSharesWalletID]).then((result) => {
                        params.sellerPublicKey = result[0].publicKey;
                        params.sharesID = result[0].sharesID;
                        callback(null);
                    }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in tradingbuy`);
                    });
                } else {
                    params.sellerPublicKey = "";
                    params.sharesID = -1;
                    callback(null);
                }
            },
            function fun4(callback) {

                const sql = `select * from exchangeoffers where exchangeOrderID = ? and investorID = ?`;
                mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID]).then((result) => {

                    if(result.length > 0) {
                        params.offerRecFound = 1;
                        params.offerRec = result[0];
                    } else {
                        params.offerRecFound = 0;
                        params.offerRec = [];
                    }

                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in tradingbuy`);
                });

            },
            function fun5(callback) {
                if(params.record.atomicSwapCurrentStatus == 3) {
                        blockchainApi.getAccountAllowance(params.sharesID,  params.offerRec.atomicBuyerPublicKey, global.config.ethereumSwapAddress).then((data) => {

                                if(data >= params.offerRec.rateFrom ) {

                                        const sql = `update exchangeorders set atomicSwapCurrentStatus = 4 where id = ?`;
                                        mysql.executeSQLStatement(sql, [params.record.ID]).then((result) => {
                                             res.redirect("tradingbuy?id=" + params.record.ID)
                                        }).catch((error) => {
                                          common.handleError(req, res, `${error.message} Error occured in tradingbuy`);
                                        });

                                } else {
                                    callback(null);
                                }

                        }, (error) => {
                                logger.info(`${error.message}`);
                                reject(`${error.message} - Error occured in  tradingbuy`);
                        });
                } else
                     callback(null);
            },
            function fun6(callback) {

                params.isOfferSectionEnabled = 1;

                if( params.record.atomicSwapAcceptable == 1 ) {
                    if( params.publickeys.length == 0 )
                         params.isOfferSectionEnabled = 0;
                } else {
                    if( params.investorAmount < params.record.rateFrom )  {
                        params.isOfferSectionEnabled = 0;
                    }
                }

                common.getCommonInvestorDashboardPageProperties(req, res).then((data) => {
                    res.render('investors/exchange/buy', {
                        investorNonBlockchainShares: params.investorNonBlockchainShares,
                        isRecordBelongToUser: params.isRecordBelongToUser,
                        record: params.record,
                        publickeys: params.publickeys,
                        offerRecFound: params.offerRecFound,
                        offerRec: params.offerRec,
                        sellerPublicKey: params.sellerPublicKey,
                        partials: common.getInvestorDashboardPartials(),
                        investorAmount: params.investorAmount,
                        Data: data,
                        isOfferSectionEnabled: params.isOfferSectionEnabled,
                        csrfToken: encodeURI( req.csrfToken() ),
                        ShareCountInFractions: global.config.ShareCountInFractions
                    });
                }, (err) => {
                    common.handleError(req, res, `${error.message} - Error occured in tradingbuy`);
                });
            }
        ])
    },
    tradingbuypost(req, res) {
        var params = {};

        function insertData(callback) {
                  const sql = `insert into exchangeoffers(exchangeOrderID, investorID, sharesPartial, rateFrom, rateTo, offerDescription, atomicBuyerPublicKey) values (?, ?, ?, ?, ?, ?, ?)`;
                  mysql.executeSQLStatement(sql, [req.body.exchangeid, req.session.user.ID, req.body.shares, req.body.rate, 0, req.body.desc, req.body.publickey]).then((result) => {
                      callback(null);
                  }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in tradingbuypost`);
                  });
        }
        async.waterfall([
            insertData
        ], (err) => {
            if (!err) {
                res.redirect("/trading");
            }
        });
    },
    //delete my offer for BUY or SELL trade
    deleteBuyOffer(req, res) {
          const sql = `delete from exchangeoffers where investorID = ? and ID = ?`;
          mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.id]).then((result) => {
              res.redirect("/trading");
          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in deleteBuyOffer`);
          });
    },

    //DELETE my BUY or SELL trade and it's offers
    tradingselldelete(req, res) {
        var params = {};
        const sql = `delete from exchangeorders where id = ? and investorID = ?`;
        mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID, req.query.id]).then((result) => {
            if(result.affectedRows > 0) {
                    const sql = `delete from exchangeoffers where exchangeOrderID = ?`;
                    mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                        res.redirect("trading");
                    }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in tradingselldelete`);
                    });
            } else
                res.redirect("trading");
        }).catch((error) => {
          common.handleError(req, res, `${error.message} Error occured in tradingselldelete`);
        });
    },
    //VIew Offers i have receibed from other investors against my BUY or SELL trade
    tradingsellview(req, res) {
        const params = {};

        async.waterfall([
            function fun1(callback) {
                const sql = `select e.ID, DATE_FORMAT(e.dateFrom,'%M %d %Y') as dateFrom,  DATE_FORMAT(e.dateTo,'%M %d %Y') as dateTo, e.type, e.rateFrom, e.rateTo, e.shares, e.description, s.title, s.currencyid, atomicSwapCurrentStatus, atomicSwapExchangeOffersID, atomicSwapAcceptable, atomicSwapSharesWalletID, atomicSwapTokenAddressAcceptable from exchangeorders e, sharetypes s where e.id = ? and e.sharesTypeID = s.id \
                ;\
                select *,  e.ID as offerID from exchangeoffers e, investor i where exchangeOrderID = ? and e.investorid = i.id`;
                mysql.executeSQLStatement(sql, [req.query.id, req.query.id]).then((result) => {
                    params.record = result[0][0];
                    params.offers = result[1];
                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in tradingsellview`);
                });
            },
            function fun2(callback) {

                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                    res.render('investors/exchange/tradeoffers', {
                        message: req.flash('messageInternalSwap'),
                        record: params.record,
                        offers: params.offers,
                        partials: common.getInvestorDashboardPartials(),
                        Data: data,
                        csrfToken: encodeURI( req.csrfToken() ),
                    });
                }, (err) => {
                    common.handleError(req, res, `${error.message} - Error occured in tradingsellview`);
                });
            }
        ])
    },

    atomicSwap(req, res) {
        const params = {};

        async.waterfall([
            function fun1(callback) {
                const sql = `select * from exchangeorders where id = ?;`;
                mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    params.order = result[0];
                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in tradingsellview`);
                });
            },
            function fun2(callback) {
                const sql = `select blockchainProtocol, ethereumContractAddress from sharetypes where id = ?;`;
                mysql.executeSQLStatement(sql, [params.order.sharesTypeID]).then((result) => {
                    params.ethereumContractAddress = result[0].ethereumContractAddress;
                    params.blockchainProtocol = result[0].blockchainProtocol;
                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in tradingsellview`);
                });
            },
            function fun3(callback) {
                    const sql = `select * from exchangeoffers where id = ?`;
                    mysql.executeSQLStatement(sql, [params.order.atomicSwapExchangeOffersID]).then((result) => {
                        params.offer = result[0];
                        callback(null);
                    }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in tradingsellview`);
                    });
            },
            function fun4(callback) {
                const sql = `select * from shareswallet where id = ?`;
                mysql.executeSQLStatement(sql, [params.order.atomicSwapSharesWalletID]).then((result) => {
                    params.wallet = result[0];
                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in tradingsellview`);
                });
            },
            function fun5(callback) {

                if(params.order.atomicSwapCurrentStatus == 1) {
                    blockchainApi.getAccountAllowance(params.order.sharesTypeID, params.wallet.publicKey, global.config.ethereumSwapAddress).then((data) => {

                            if(data >= params.offer.sharesPartial) {

                                    const sql = `update exchangeorders set atomicSwapCurrentStatus = 2 where id = ?`;
                                    mysql.executeSQLStatement(sql, [params.order.ID]).then((result) => {
                                            res.redirect("atomicswap?id=" + params.order.ID)
                                    }).catch((error) => {
                                        common.handleError(req, res, `${error.message} Error occured in tradingsellview`);
                                    });

                            } else {
                                callback(null);
                            }
                    }, (error) => {
                            logger.info(`${error.message}`);
                            reject(`${error.message} - Error occured in  refreshBlockchainBalances`);
                    });
                } else
                     callback(null);
            },
            function fun6(callback) {
                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                    res.render('investors/exchange/atomicswap', {
                        order: params.order,
                        offer: params.offer,
                        wallet: params.wallet,
                        partials: common.getInvestorDashboardPartials(),
                        ethereumContractAddress: params.ethereumContractAddress,
                        Data: data,
                        csrfToken: encodeURI( req.csrfToken() ),
                    });
                }, (err) => {
                    common.handleError(req, res, `${error.message} - Error occured in tradingsellview`);
                });
            }
        ])
    },
    acceptSwap(req, res) {
        async.waterfall([
            function fun1(callback) {
                const sql = `update exchangeorders set atomicSwapCurrentStatus=1, atomicSwapExchangeOffersID=? where id = ?`;
                mysql.executeSQLStatement(sql, [req.query.offerid, req.query.id]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in tradingsellview`);
                });
            },
            function fun2(callback) {
                 var random = Math.floor(Math.random()*90000) + 10000;
                const sql = `update exchangeoffers set atomicSwapSecret = ? where id = ?`;
                mysql.executeSQLStatement(sql, [random, req.query.offerid]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in tradingsellview`);
                });
            },
            function fun3(callback) {
                res.redirect("atomicswap?id=" + req.query.id)
            }
        ])
    },
    acceptSellSwapInternal(req, res) {
        const params = {};
        //  This is Sell order trade.   Seller is in    exchangeorders    while buyer is an offer in     exchangeoffers

        async.waterfall([
            function fun1(callback) {
                const sql = `select * from exchangeoffers where id = ?`;
                mysql.executeSQLStatement(sql, [req.query.offerid]).then((result) => {
                    params.offerRecord = result[0];
                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun1`);
                });
            },
            function fun2(callback) {
                const sql = `select * from exchangeorders where id = ?`;
                mysql.executeSQLStatement(sql, [params.offerRecord.exchangeOrderID]).then((result) => {
                    if(result[0].atomicSwapCurrentStatus == 7) {
                        common.handleError(req, res, `Exchange order ${params.offerRecord.exchangeOrderID} swap has already been executed and it was tried to be executed again`);
                        return;
                    } else {
						params.exchangeRecord = result[0];
						callback(null);
					}
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun2`);
                });
            },
            function fun3(callback) {
                const sql = `select currencyid, stoid, isblockchain from sharetypes where id = ?`;
                mysql.executeSQLStatement(sql, [params.exchangeRecord.sharesTypeID]).then((result) => {
                    params.sharestypecurrencyid = result[0].currencyid;
                    params.sharestypestoid = result[0].stoid;
                    params.sharestypeIsBlockchain = result[0].isblockchain;

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun3`);
                });
            },
            function fun4(callback) {
                const sql = `select amount from InvestorBalancesInCompanyAccounts where  stoid=? and  investorID = ? and currencyID=?`;
                mysql.executeSQLStatement(sql, [params.sharestypestoid, params.offerRecord.investorID, params.sharestypecurrencyid ]).then((result) => {

                    if(result.length > 0)
                        params.buyerAmount = result[0].amount;
                    else
                        params.buyerAmount = 0;

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun4`);
                });
            },
            function fun5(callback) {
                const sql = `select amount from InvestorBalancesInCompanyAccounts where  stoid=? and  investorID = ? and currencyID=?`;
                mysql.executeSQLStatement(sql, [params.sharestypestoid, params.exchangeRecord.investorID, params.sharestypecurrencyid ]).then((result) => {
                    if(result.length > 0)
                        params.sellerAmountRecordExists = 1;
                    else
                        params.sellerAmountRecordExists = 0;

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun5`);
                });
            },
            function fun6(callback) {
                const sql = `select id from shares where shareTypeid = ? and investorID = ? and stoid = ?`;
                mysql.executeSQLStatement(sql, [ params.exchangeRecord.sharesTypeID,  params.offerRecord.investorID, params.sharestypestoid ]).then((result) => {
                    if(result.length > 0)
                        params.buyerSharesRecordFound = 1;
                    else
                        params.buyerSharesRecordFound = 0;

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun55`);
                });
            },
            function fun66(callback) {
                if(params.sharestypeIsBlockchain == 1) {
                    const sql = `select id from shareswallet where investorID = ? and sharesID = ? and publicKey = "platform"`;
                    mysql.executeSQLStatement(sql, [ params.offerRecord.investorID, params.exchangeRecord.sharesTypeID ]).then((result) => {
                        if(result.length > 0)
                            params.buyerSharesWalletRecordFound = 1;
                        else
                            params.buyerSharesWalletRecordFound = 0;

                        callback(null);
                    }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun55`);
                    });
                } else
                    callback(null);
            },
            function fun7(callback) {
                if( params.buyerAmount < params.offerRecord.rateFrom ) {
                    req.flash('messageInternalSwap', 'Swap cannot occur. The buyer does not have sufficient funds in his wallet') 
                    res.redirect("tradingsellview?id=" + params.offerRecord.exchangeOrderID);
                    return;
                } else
                    callback(null);
            },
            function fun8(callback) {
                if(params.buyerSharesRecordFound == 0) {
                        const sql = `insert into shares(stoid, shareTypeid, shares, investorID, sharesHistoryID) values(?,?,?,?,?)`;
                        mysql.executeSQLStatement(sql, [params.sharestypestoid, params.exchangeRecord.sharesTypeID , 0,  params.offerRecord.investorID, 0]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun1`);
                        });
                }  else
                    callback(null);
            },
            function fun88(callback) {
                if(params.buyerSharesWalletRecordFound == 0) {
                        const sql = `insert into shareswallet(investorID, sharesID, shares, publicKey, isBlocked) values(?, ?, 0, 'platform', 0)`;
                        mysql.executeSQLStatement(sql, [params.offerRecord.investorID, params.exchangeRecord.sharesTypeID ]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun88`);
                        });
                }  else
                    callback(null);
            },
            function fun9(callback) {
                if( params.sellerAmountRecordExists == 0 ) {
                    const sql = `insert into InvestorBalancesInCompanyAccounts(stoid, investorID, currencyID, Amount) values(?,?,?,?)`;
                    mysql.executeSQLStatement(sql, [params.sharestypestoid, params.exchangeRecord.investorID, params.sharestypecurrencyid,0]).then((result) => {
                        callback(null);
                    }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun1`);
                    });
                } else
                    callback(null);
            },
            function fun10(callback) {
                const sql = `update InvestorBalancesInCompanyAccounts set amount = amount + ? where stoid = ? and investorID = ? and currencyID = ?;   update InvestorBalancesInCompanyAccounts set amount = amount - ? where stoid = ? and investorID = ? and currencyID = ?;  `;
                mysql.executeSQLStatement(sql, [params.offerRecord.rateFrom, params.sharestypestoid, params.exchangeRecord.investorID, params.sharestypecurrencyid, params.offerRecord.rateFrom, params.sharestypestoid, params.offerRecord.investorID, params.sharestypecurrencyid]).then((result) => {

                        callback();
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun8`);
                });
            },
            function fun11(callback) {
                const sql = `update shares set shares = shares - ? where investorID = ? and shareTypeid = ? and stoid = ?; update shares set shares = shares + ? where investorID = ? and shareTypeid = ? and stoid = ?; `;
                mysql.executeSQLStatement(sql, [params.offerRecord.sharesPartial, params.exchangeRecord.investorID,  params.exchangeRecord.sharesTypeID, params.sharestypestoid,  params.offerRecord.sharesPartial, params.offerRecord.investorID,  params.exchangeRecord.sharesTypeID, params.sharestypestoid  ]).then((result) => {

                        callback(null)
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun8`);
                });
            },
            function fun112(callback) {
                if(params.sharestypeIsBlockchain == 1) {
                        const sql = `update shareswallet set shares = shares - ? where investorID = ? and sharesID = ?; update shareswallet set shares = shares + ? where investorID = ? and sharesID = ? `;
                        mysql.executeSQLStatement(sql, [params.offerRecord.sharesPartial, params.exchangeRecord.investorID,  params.exchangeRecord.sharesTypeID,  params.offerRecord.sharesPartial, params.offerRecord.investorID,  params.exchangeRecord.sharesTypeID  ]).then((result) => {

                                callback(null)
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun8`);
                        });
                } else
                    callback(null);
            },
            function fun12(callback) {
                let logDescription;
                const sql = `
                    update exchangeorders set atomicSwapCurrentStatus = ? where id = ?;
                    INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);
                    `;
                logDescription = `Trading of Shares Within The Platform (Sell). ExchangeOrders.ID: ${req.query.id} Seller.ID: ${params.exchangeRecord.investorID} Buyer.ID: ${params.offerRecord.investorID} Amount: ${params.offerRecord.sharesPartial}`;
                mysql.executeSQLStatement(sql, [
                    7, req.query.id, params.sharestypestoid, -1, logDescription,
                     params.exchangeRecord.investorID, 29, req.query.id
                ]).then((result) => {
                    logger.info(`
                        Trading of Shares Within The Platform (Sell). ExchangeOrders.ID: ${req.query.id} 
                        Seller.ID: ${params.exchangeRecord.investorID} Buyer.ID: ${params.offerRecord.investorID} 
                        Amount: ${params.offerRecord.sharesPartial} STO ID: ${params.sharestypestoid} 
                        User ID: -1 Investor ID: ${params.exchangeRecord.investorID} Activity Type ID: 29 Rec ID: ${req.query.id}`);
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in changeSwapStatus`);
                });
            },
            function fun13(callback) {

                //setup sellet currency wallet information
                const sql = `select amount from InvestorBalancesInCompanyAccounts where  stoid=? and  investorID = ? and currencyID=?`;
                mysql.executeSQLStatement(sql, [params.sharestypestoid, params.exchangeRecord.investorID, params.sharestypecurrencyid ]).then((result) => {

                        const sql = `insert into InvestorDepositReceivedAlert(investorID, isApproved, storid, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, runningBalance, currencyID) values (?, 5, ?, now(), 0, ?, ?, now(), 0, ?, ?)`;
                        mysql.executeSQLStatement(sql, [ params.exchangeRecord.investorID, params.sharestypestoid, params.offerRecord.rateFrom, "Shares sold on the Exchange", result[0].amount, params.sharestypecurrencyid  ]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun13`);
                        });

                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun13`);
                });

            },
            function fun14(callback) {

                //setup buyer currency wallet information
                const sql = `select amount from InvestorBalancesInCompanyAccounts where  stoid=? and  investorID = ? and currencyID=?`;
                mysql.executeSQLStatement(sql, [params.sharestypestoid, params.offerRecord.investorID, params.sharestypecurrencyid ]).then((result) => {

                        const sql = `insert into InvestorDepositReceivedAlert(investorID, isApproved, storid, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, runningBalance, currencyID) values (?, 5, ?, now(), 0, ?, ?, now(), 0, ?, ?)`;
                        mysql.executeSQLStatement(sql, [ params.offerRecord.investorID, params.sharestypestoid, params.offerRecord.rateFrom, "Shares bought on the Exchange", result[0].amount, params.sharestypecurrencyid  ]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun13`);
                        });

                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun13`);
                });

            },
            function fun15(callback) {
                req.flash('messageInternalSwap', 'Swap is complete') 
                res.redirect("tradingsellview?id=" + params.offerRecord.exchangeOrderID);
            }
        ])

    },
    acceptBuySwapInternal(req, res) {
        const params = {};

        async.waterfall([
            function fun1(callback) {
                const sql = `select * from exchangeoffers where id = ?`;
                mysql.executeSQLStatement(sql, [req.query.offerid]).then((result) => {
                    params.offerRecord = result[0];

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun1`);
                });
            },
            function fun2(callback) {
                const sql = `select * from exchangeorders where id = ?`;
                mysql.executeSQLStatement(sql, [params.offerRecord.exchangeOrderID]).then((result) => {

                    if(result[0].atomicSwapCurrentStatus == 7) {
                        common.handleError(req, res, `Exchange order ${params.offerRecord.exchangeOrderID} swap has already been executed and it was tried to be executed again`);
                        return;
                    } else {
						params.exchangeRecord = result[0];
						callback(null);
					}
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun2`);
                });
            },
            function fun3(callback) {
                const sql = `select currencyid, stoid, isblockchain from sharetypes where id = ?`;
                mysql.executeSQLStatement(sql, [params.exchangeRecord.sharesTypeID]).then((result) => {
                    params.sharestypecurrencyid = result[0].currencyid;
                    params.sharestypestoid = result[0].stoid;
                    params.sharestypeIsBlockchain = result[0].isblockchain;

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun3`);
                });
            },
            function fun4(callback) {
                const sql = `select amount from InvestorBalancesInCompanyAccounts where  stoid=? and  investorID = ? and currencyID=?`;
                mysql.executeSQLStatement(sql, [params.sharestypestoid, params.exchangeRecord.investorID, params.sharestypecurrencyid ]).then((result) => {

                    if(result.length > 0)
                        params.buyerAmount = result[0].amount;
                    else
                        params.buyerAmount = 0;

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun4`);
                });
            },
            function fun5(callback) {
                const sql = `select amount from InvestorBalancesInCompanyAccounts where  stoid=? and  investorID = ? and currencyID=?`;
                mysql.executeSQLStatement(sql, [params.sharestypestoid, params.offerRecord.investorID, params.sharestypecurrencyid ]).then((result) => {
                    if(result.length > 0)
                        params.sellerAmountRecordExists = 1;
                    else
                        params.sellerAmountRecordExists = 0;

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun5`);
                });
            },
            function fun6(callback) {
                const sql = `select * from shares where shareTypeid = ? and investorID = ? and stoid = ?`;
                mysql.executeSQLStatement(sql, [ params.exchangeRecord.sharesTypeID,  params.exchangeRecord.investorID, params.sharestypestoid ]).then((result) => {
                    if(result.length > 0)
                        params.buyerSharesRecordFound = 1;
                    else
                        params.buyerSharesRecordFound = 0;

                    callback(null);
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun55`);
                });
            },
            function fun66(callback) {
                if(params.sharestypeIsBlockchain == 1) {
                    const sql = `select id from shareswallet where investorID = ? and sharesID = ? and publicKey = "platform"`;
                    mysql.executeSQLStatement(sql, [ params.exchangeRecord.investorID, params.exchangeRecord.sharesTypeID ]).then((result) => {
                        if(result.length > 0)
                            params.buyerSharesWalletRecordFound = 1;
                        else
                            params.buyerSharesWalletRecordFound = 0;

                        callback(null);
                    }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in acceptBuySwapInternal fun55`);
                    });
                } else
                    callback(null);
            },
            function fun7(callback) {

                if( params.buyerAmount < params.offerRecord.rateFrom ) {
                    req.flash('messageInternalSwap', 'Swap cannot occur. The buyer does not have sufficient funds in his wallet') 
                    res.redirect("tradingsellview?id=" + params.offerRecord.exchangeOrderID);
                    return;
                } else
                    callback(null);

            },
            function fun8(callback) {
                if(params.buyerSharesRecordFound == 0) {
                        const sql = `insert into shares(stoid, shareTypeid, shares, investorID, sharesHistoryID) values(?,?,?,?,?)`;
                        mysql.executeSQLStatement(sql, [params.sharestypestoid, params.exchangeRecord.sharesTypeID , 0,  params.exchangeRecord.investorID, 0]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun1`);
                        });
                }  else
                    callback(null);
            },
            function fun88(callback) {
                if(params.buyerSharesWalletRecordFound == 0) {
                        const sql = `insert into shareswallet(investorID, sharesID, shares, publicKey, isBlocked) values(?, ?, 0, 'platform', 0)`;
                        mysql.executeSQLStatement(sql, [params.exchangeRecord.investorID, params.exchangeRecord.sharesTypeID ]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun88`);
                        });
                }  else
                    callback(null);
            },
            function fun9(callback) {

                if( params.sellerAmountRecordExists == 0 ) {
                    const sql = `insert into InvestorBalancesInCompanyAccounts(stoid, investorID, currencyID, Amount) values(?,?,?,?)`;
                    mysql.executeSQLStatement(sql, [params.sharestypestoid, params.offerRecord.investorID, params.sharestypecurrencyid,0]).then((result) => {
                        callback(null);
                    }).catch((error) => {
                      common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun1`);
                    });
                } else
                    callback(null);

            },
            function fun10(callback) {
                const sql = `update InvestorBalancesInCompanyAccounts set amount = amount + ? where stoid = ? and investorID = ? and currencyID = ?;   update InvestorBalancesInCompanyAccounts set amount = amount - ? where stoid = ? and investorID = ? and currencyID = ?;  `;
                mysql.executeSQLStatement(sql, [params.offerRecord.rateFrom, params.sharestypestoid, params.offerRecord.investorID, params.sharestypecurrencyid, params.offerRecord.rateFrom, params.sharestypestoid, params.exchangeRecord.investorID, params.sharestypecurrencyid]).then((result) => {

                        callback();
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun8`);
                });
            },
            function fun11(callback) {

                const sql = `update shares set shares = shares - ? where investorID = ? and shareTypeid = ? and stoid = ?; update shares set shares = shares + ? where investorID = ? and shareTypeid = ? and stoid = ?`;
                mysql.executeSQLStatement(sql, [params.offerRecord.sharesPartial, params.offerRecord.investorID,  params.exchangeRecord.sharesTypeID, params.sharestypestoid,  params.offerRecord.sharesPartial, params.exchangeRecord.investorID,  params.exchangeRecord.sharesTypeID, params.sharestypestoid  ]).then((result) => {

                        callback(null)
                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun8`);
                });
            },
            function fun112(callback) {
                if(params.sharestypeIsBlockchain == 1) {
                        const sql = `update shareswallet set shares = shares - ? where investorID = ? and sharesID = ?; update shareswallet set shares = shares + ? where investorID = ? and sharesID = ? `;
                        mysql.executeSQLStatement(sql, [params.offerRecord.sharesPartial, params.offerRecord.investorID,  params.exchangeRecord.sharesTypeID,  params.offerRecord.sharesPartial, params.exchangeRecord.investorID,  params.exchangeRecord.sharesTypeID  ]).then((result) => {

                                callback(null)
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun8`);
                        });
                } else
                    callback(null);
            },
            function fun12(callback) {
                let logDescription;
                const sql = `
                    update exchangeorders set atomicSwapCurrentStatus = ? where id = ?;
                    INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);
                    `;
                logDescription = `Trading of Shares Within The Platform (Buy). ExchangeOrders.ID: ${req.query.id} Buyer.ID: ${params.exchangeRecord.investorID} Seller.ID: ${params.offerRecord.investorID} Amount: ${params.offerRecord.sharesPartial}`;
                mysql.executeSQLStatement(sql, [
                    7, req.query.id, params.sharestypestoid, -1, logDescription,
                    params.exchangeRecord.investorID, 30, req.query.id
                ]).then((result) => {
                    logger.info(`
                    Trading of Shares Within The Platform (Buy). ExchangeOrders.ID: ${req.query.id} 
                    Buyer.ID: ${params.exchangeRecord.investorID} Seller.ID: ${params.offerRecord.investorID} 
                    Amount: ${params.offerRecord.sharesPartial} STO ID: ${params.sharestypestoid} 
                    User ID: -1 Investor ID: ${params.exchangeRecord.investorID} Activity Type ID: 30 Rec ID: ${req.query.id}`);
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in changeSwapStatus`);
                });
            },
            function fun13(callback) {

                //setup sellet currency wallet information
                const sql = `select amount from InvestorBalancesInCompanyAccounts where  stoid=? and  investorID = ? and currencyID=?`;
                mysql.executeSQLStatement(sql, [params.sharestypestoid, params.offerRecord.investorID, params.sharestypecurrencyid ]).then((result) => {

                        const sql = `insert into InvestorDepositReceivedAlert(investorID, isApproved, storid, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, runningBalance, currencyID) values (?, 5, ?, now(), 0, ?, ?, now(), 0, ?, ?)`;
                        mysql.executeSQLStatement(sql, [ params.offerRecord.investorID, params.sharestypestoid, params.offerRecord.rateFrom, "Shares sold in Exchange", result[0].amount, params.sharestypecurrencyid  ]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun13`);
                        });

                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun13`);
                });

            },
            function fun14(callback) {

                //setup buyer currency wallet information
                const sql = `select amount from InvestorBalancesInCompanyAccounts where  stoid=? and  investorID = ? and currencyID=?`;
                mysql.executeSQLStatement(sql, [params.sharestypestoid, params.exchangeRecord.investorID, params.sharestypecurrencyid ]).then((result) => {

                        const sql = `insert into InvestorDepositReceivedAlert(investorID, isApproved, storid, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, runningBalance, currencyID) values (?, 5, ?, now(), 0, ?, ?, now(), 0, ?, ?)`;
                        mysql.executeSQLStatement(sql, [ params.exchangeRecord.investorID, params.sharestypestoid, params.offerRecord.rateFrom, "Shares sold in Exchange", result[0].amount, params.sharestypecurrencyid  ]).then((result) => {
                            callback(null);
                        }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun13`);
                        });

                }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun13`);
                });
            },
            function fun15(callback) {
                req.flash('messageInternalSwap', 'Swap is complete') 
                res.redirect("tradingsellview?id=" + params.offerRecord.exchangeOrderID);
            }
        ])

    },
    changeSwapStatus(req, res) {
        async.waterfall([
            function fun1(callback) {
                const sql = `update exchangeorders set atomicSwapCurrentStatus = ? where id = ?`;
                mysql.executeSQLStatement(sql, [req.query.status, req.query.id]).then((result) => {
                    callback(null);
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in changeSwapStatus`);
                });
            },
            function fun3(callback) {
                /*
                    0 = swap has not been initiated
                    1 = Atomic Swap has been accepted by seller
                    2 = Seller has commited his shares for transfer in swap contract
                    3 = Seller has send his tokens to swap contract
                    4 = Buyer has committed his tokens for transfers in swap contract
                    5 = Buyer completed Swap
                    6 = Swap was not successful and tokens given back to investor
                    7 = it was internal swap and swap is complete    this status is set in the acceptSwapInternal
                */
                if(req.query.status == "2" ||  req.query.status == "3" )
                    res.redirect("atomicswap?id=" + req.query.id)
                else if(req.query.status == "4" ||  req.query.status == "5" )
                    res.redirect("tradingbuy?id=" + req.query.id)
            }
        ])
    },
// ---------------------------------------------------------------------------------
//   Trading Module
// ---------------------------------------------------------------------------------





    legalinformation(req, res) {
        const sql = `SELECT LegalDetails, projectAddress, title 
            FROM stos 
            WHERE id = ?; 

        SELECT FirstName, LastName, Address, country, zip, town, state, investorType, CompanyName,
        TitleWithinCompany FROM investor WHERE id = ${req.session.user.ID}; 

        SELECT s.shares, t.title, t.isblockchain, t.ethereumContractAddress, t.votingPower
            FROM shares s, sharetypes t 
            WHERE s.shareTypeid = t.ID 
            AND s.stoid = ? 
            AND s.investorID = ${req.session.user.ID}`;

        mysql.executeSQLStatement(sql, [req.query.id, req.query.id]).then((result) => {
            common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                    res.render('investors/legalinformation', {
                        record: result[0][0],
                        investor: result[1][0],
                        shares: result[2],
                        partials: common.getInvestorDashboardPartials(),
                        Data: data,
                        csrfToken: encodeURI( req.csrfToken() ),
                        ShareCountInFractions: global.config.ShareCountInFractions,
                    });
            }, (err) => {
                common.handleError(req, res, `${err.message} - Error occured in legalinformation`);
            });
        }).catch((error) => {
            common.handleError(req, res, `${error.toString()} - Error occured `);
        });

    },

    purchaseshares(req, res) {
        var params = {};

        common.getCommonInvestorDashboardPageProperties(req, res)
        .then((data) => {
                res.render('investors/payments/purchase', {
                    partials: common.getInvestorDashboardPartials(),
                    Data: data,
                    csrfToken: encodeURI( req.csrfToken() ),
                });
        }, (err) => {
            common.handleError(req, res, `${error.message} - Error occured in trading`);
        });
    },
    viewinvestorpaymentalert(req, res) {

        const sql = `select p.ID, paymentChannelDetails, c.title as PaymentTitle, c.paymentDetails as PaymentDetails, isSettled, DATE_FORMAT(PaymentSendDate,'%M %d %Y') as PaymentSendDate, currencyIDRequested, paymentRequested, InvestorComments, Details, sharesOffered, s.title as ShareTypeText  from paymentinvestors p, paymentchannels c, sharetypes s where p.paymentChannelID = c.id and p.id = ? and p.stoid = ${global.config.stos[req.hostname].stoid} and p.investorid = ${req.session.user.ID} and s.id = p.sharesTypeOffered`;
        mysql.executeSQLStatement(sql, [req.query.id]).then((paymentrecord) => {

                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                    res.render('investors/payments/paymentalert', {
                        paymentrec: paymentrecord[0],
                        partials: common.getInvestorDashboardPartials(),
                        Data: data,
                        csrfToken: encodeURI( req.csrfToken() ),
                    });
                }, (err) => {
                    common.handleError(req, res, `${error.message} - Error occured in viewinvestorpaymentalert`);
                });

          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in viewinvestorpaymentalert`);
          });
    },
    investorpaymentalertedit(req, res) {
        const sql = `update paymentinvestors set InvestorComments = ? where stoid = ${global.config.stos[req.hostname].stoid} and investorid = ${req.session.user.ID} and id = ? and isSettled = 0`;
        mysql.executeSQLStatement(sql, [req.body.feedback, req.body.id]).then((paymentrecord) => {
            res.redirect("viewinvestorpaymentalert?id=" + req.body.id);
        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in investorpaymentalert`);
        });
    },

    proxy(req, res) {

        const paramsdata = {};

        function getvotingid(callback) {
            const stmt = `select id, isVotingOpenForProxy from voting where type = 1 and votetype = 0 and secretaccesscode = ?`;
			mysql.executeSQLStatement(stmt, [req.query.id]).then((result) => {
                if(result.length > 0) {
                    paramsdata.meetingid = result[0].id;
                    paramsdata.isVotingOpenForProxy = result[0].isVotingOpenForProxy;
                    callback(null);
                }
                else
                    common.handleError(req, res, `Non-existance meeting id accessed Error occured in proxy getvotingid`);
            });
        }
        function getInvestorPageData(callback) {
			const stmt = `select count(*) as InPersonMeetingAttend from votinguserdata where votingid = ? and attendMeeting = 1 \
            ;\
            select count(*) as votingOnline from votinguserdata where votingid = ? and attendMeeting = 2 \ 
            ;\
            select count(*) as votingOnlineAdvance from votinguserdata where votingid = ? and attendMeeting = 3 \ 
            ;\
            select count(*) as deregisterMeeting from votinguserdata where votingid = ? and attendMeeting = 4 \ 
            ;\
            select i.id, firstname, lastname, companyname, investortype from investor i, investorsto s where i.id = s.investorid and s.stoid = ${global.config.stos[req.hostname].stoid} and i.id in(  select investorID from votinguserdata where votingid = ? and unannounceDecision = 1  ) \ 
            ;\
            select i.id, firstname, lastname, companyname, investortype from investor i, investorsto s where i.id = s.investorid and s.stoid = ${global.config.stos[req.hostname].stoid} and i.id in(  select investorID from votinguserdata where votingid = ? and unannounceDecision = 2  ) \ 
            ;\
            select i.id, firstname, lastname, companyname, investortype from investor i, investorsto s where i.id = s.investorid and s.stoid = ${global.config.stos[req.hostname].stoid} and i.id in(  select investorID from votinguserdata where votingid = ? and unannounceDecision = 3  ) \ 
            ;\
            select i.id, firstname, lastname, companyname, investortype from investor i, investorsto s where i.id = s.investorid and s.stoid = ${global.config.stos[req.hostname].stoid} and i.id in(  select investorID from votinguserdata where votingid = ? and unannounceDecision = 4  ) \ 
            ;\
            select i.id, firstname, lastname, companyname, investortype from investor i, investorsto s where i.id = s.investorid and s.stoid = ${global.config.stos[req.hostname].stoid} and i.id in(  select investorID from votinguserdata where votingid = ? and unannounceDecision = 5  ) \ 
            ;\
            select i.id, firstname, lastname, town, country, email, companyname, investortype from investor i, investorsto s where i.id = s.investorid and s.stoid = ${global.config.stos[req.hostname].stoid} and i.id not in(  select investorid from votinguserdata where attendMeeting in (2,3,4) and votingid = ?  )`;

			mysql.executeSQLStatement(stmt, [paramsdata.meetingid, paramsdata.meetingid, paramsdata.meetingid, paramsdata.meetingid, paramsdata.meetingid, paramsdata.meetingid, paramsdata.meetingid, paramsdata.meetingid, paramsdata.meetingid, paramsdata.meetingid]).then((result) => {
                  paramsdata.stats = {};
                  paramsdata.stats.InPersonMeetingAttend = result[0][0].InPersonMeetingAttend;
                  paramsdata.stats.votingOnline = result[1][0].votingOnline;
                  paramsdata.stats.votingOnlineAdvance = result[2][0].votingOnlineAdvance;
                  paramsdata.stats.deregisterMeeting = result[3][0].deregisterMeeting;

                  paramsdata.stats.BODfavor = result[4];
                  paramsdata.stats.proxyfavor = result[5];
                  paramsdata.stats.proposerfavor =result[6];
                  paramsdata.stats.rejectfavor = result[7];
                  paramsdata.stats.absentfavor = result[8];
                  paramsdata.investorsRec = result[9];

				callback(null);
            }).catch((error) => {
				common.handleError(req, res, `${error.message}Error occured in signcontract getContractRecord`);
            });
        }
        function getAllVotesContributedByProxy(callback) {
            const stmt = `select firstname, lastname, companyname, investortype, votingoptionsid, votingoptionsvalue from investor i, votinguser v where i.id = v.userid and votingid = ? and isCastedByInvestor = 0`;
			mysql.executeSQLStatement(stmt, [paramsdata.meetingid]).then((result) => {
                paramsdata.voters = result;
                callback(null);
            });
        }
        async.waterfall([
            getvotingid,
			getInvestorPageData,
            getAllVotesContributedByProxy
        ], (err) => {

            mysql.getMeetingData(paramsdata.meetingid, req.hostname).then((params) => {

                var canProxyAccessMeeting = 0;
                if( paramsdata.isVotingOpenForProxy == 1 ) {
                    canProxyAccessMeeting = 1;
                }

                res.render('investors/proxy', {
                    canProxyAccessMeeting: canProxyAccessMeeting,
                    MeetingRecord: params.MeetingRecord,
                    AgendaItems: params.AgendaItems,
                    stats: paramsdata.stats,
                    paramsdata: paramsdata.stats,
                    voters: paramsdata.voters,
                    investorsRec: paramsdata.investorsRec,
                    partials: common.getInvestorDashboardPartials(),
                    csrfToken: encodeURI( req.csrfToken() )
                });
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in meetingView`);
            });
        });
    },
    proxyInvestorsSelection(req, res) {
        const params = {};

        function preparedata(callback) {
            params.idsYes = "";
            params.idsNo = "";
            params.idsAbs = "";

            try {
                JSON.parse(req.body.investorsSelectedYes);

                req.body.investorsSelectedYes.forEach((id) => {
                    params.idsYes = params.idsYes + "," + id;
                });
                if(params.idsYes.length > 0)
                    params.idsYes = params.idsYes.substr(1);
            } catch (e) {
                params.idsYes = req.body.investorsSelectedYes;
            }

            try {
                JSON.parse(req.body.investorsSelectedNo);

                req.body.investorsSelectedNo.forEach((id) => {
                    params.idsNo = params.idsNo + "," + id;
                });
                if(params.idsNo.length > 0)
                    params.idsNo = params.idsNo.substr(1);
            } catch (e) {
                params.idsNo = req.body.investorsSelectedNo;
            }

            try {
                JSON.parse(req.body.investorsSelectedAbs);

                req.body.investorsSelectedAbs.forEach((id) => {
                    params.idsAbs = params.idsAbs + "," + id;
                });
                if(params.idsAbs.length > 0)
                    params.idsAbs = params.idsAbs.substr(1);
            } catch (e) {
                params.idsAbs = req.body.investorsSelectedAbs;
            }

            if(params.idsYes == "" || params.idsYes == null  || params.idsYes == undefined)
                params.idsYes = "-99";

            if(params.idsNo == "" || params.idsNo == null || params.idsNo == undefined)
                params.idsNo = "-99";

            if(params.idsAbs == "" || params.idsAbs == null || params.idsAbs == undefined)
                params.idsAbs = "-99";

            callback(null);
        }
        function getInvestorRecords(callback) {
            const stmt = `select investorid, sum(s.shares * t.votingPower) as sums, sum(t.premimum * s.shares) as investmentsum, sum(t.nominalValue * s.shares) as nominalinvestmentsum from shares s, sharetypes t where s.stoid = ${global.config.stos[req.hostname].stoid} and investorid in (${params.idsYes}) and s.shareTypeid = t.id and t.isVotingRightsApplicable = 1 group by investorid \
            ;\
            select investorid, sum(s.shares * t.votingPower) as sums, sum(t.premimum * s.shares) as investmentsum, sum(t.nominalValue * s.shares) as nominalinvestmentsum from shares s, sharetypes t where s.stoid = ${global.config.stos[req.hostname].stoid} and investorid in (${params.idsNo}) and s.shareTypeid = t.id and t.isVotingRightsApplicable = 1 group by investorid \
            ;\
            select investorid, sum(s.shares * t.votingPower) as sums, sum(t.premimum * s.shares) as investmentsum, sum(t.nominalValue * s.shares) as nominalinvestmentsum from shares s, sharetypes t where s.stoid = ${global.config.stos[req.hostname].stoid} and investorid in (${params.idsAbs}) and s.shareTypeid = t.id and t.isVotingRightsApplicable = 1 group by investorid`;

            mysql.executeSQLStatement(stmt, []).then((results) => {
                params.investorRecsYes = results[0];
                params.investorRecsNo = results[1];
                params.investorRecsAbs = results[2];
                callback(null);
            }).catch((error) => {
                logger.error(`${error.message} - Error occured in signcontract logSigning`);
            });
        }
        function setVotes(callback) {
            let count = 0;
            let countLoop = 1;
            var investorRecs;

            async.whilst(() => countLoop < 4, (callbackLoop) => {
                    count = 0;
                    if(countLoop == 1)
                        investorRecs = params.investorRecsYes;
                    else if(countLoop == 2)
                        investorRecs = params.investorRecsNo;
                    else if(countLoop == 3)
                        investorRecs = params.investorRecsAbs;

                    async.whilst(() => count < investorRecs.length, (callbackInner) => {

                            const stmt = `select isCastedByInvestor from votinguser where userid = ? and votingid = ? and votingoptionsid = ?`;
                            mysql.executeSQLStatement(stmt, [investorRecs[count].investorid, req.body.meetingID, req.body.optionID]).then((result) => {

                                var processData = 0;
                                if(result.length > 0) {
                                    if (result[0].isCastedByInvestor != 1)
                                        processData = 1;
                                } else
                                    processData = 1;

                                if(processData === 1) {
                                    const stmt = `delete from votinguser where  userid = ? and votingid = ? and votingoptionsid = ?`;
                                    mysql.executeSQLStatement(stmt, [investorRecs[count].investorid, req.body.meetingID, req.body.optionID]).then((result) => {

                                        var sql = `insert into votinguser(votingid, userid, votingoptionsid, votingoptionsvalue, votesContributed, isCastedByInvestor, investmentContributed, nominalInvestmentContributed) values(?, ?, ?, ?, ?, 0, ?, ?)`;
                                          mysql.executeSQLStatement(sql, [req.body.meetingID, investorRecs[count].investorid, req.body.optionID, countLoop, investorRecs[count].sums, investorRecs[count].investmentsum, investorRecs[count].nominalinvestmentsum ]).then((result) => {
                                              count++;
                                              callbackInner(null);
                                          }).catch((error) => {
                                              common.handleError(req, res, `${error.message} Error occured in castVote saveNewOption`);
                                          });

                                    }).catch((error) => {
                                        logger.error(`${error.message} - Error occured in signcontract logSigning`);
                                    });
                                } else {
                                    count++;
                                    callbackInner(null);
                                }

                        }).catch((error) => {
                            logger.error(`${error.message} - Error occured in signcontract logSigning`);
                        });

                    }, (err, n) => {
                        if (!err) {
                            countLoop++;
                            callbackLoop(null);
                        } else {
                            logger.info(`${err} ${n}`);
                        }
                    })

            }, (err, n) => {
                if (!err) {
                    callback(null);
                } else {
                    logger.info(`${err} ${n}`);
                }
            })

        }
		async.waterfall([
            preparedata,
            getInvestorRecords,
            setVotes
		], (err) => {
            if (!err) {
                const stmt = `select secretaccesscode from voting where id = ?`;
                mysql.executeSQLStatement(stmt, [req.body.meetingID]).then((result) => {
                    if(result.length > 0) {
                        res.redirect('/proxy?id=' + result[0].secretaccesscode);
                    }
                    else
                        common.handleError(req, res, `Non-existance meeting id accessed Error occured in proxy getvotingid`);
                });
            }
		});
    },

    publicpoll(req, res) {
        const params = {};

        function getvotingid(callback) {
			  const sql = `select id, stoid from voting where secretaccesscode = ?`;
			  mysql.executeSQLStatement(sql, [req.query.id.substr(0, 80)]).then((result) => {
                  if(result.length > 0) {
                      params.rec = result[0]
                      params.showvoting = 1;
                  } else
                      params.showvoting = 0;

				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in contractview2signpost getInvestorPageData`);
			  });
        }
        function getrecord(callback) {
            if(params.showvoting == 1) {
                mysql.getPublicPollsDetails(params.rec.id, params.rec.stoid).then((data) => {
                    params.votingdata = data;
                    if(data.open != 2)
                        params.showvoting = 0;

                    callback(null);
                });
            } else
                callback(null);
        }
        async.waterfall([
            getvotingid,
            getrecord
        ], (err) => {
            if(params.showvoting == 0) {
                res.render('investors/publicpoll', {
                    showvoting: 0,
                    partials: common.getInvestorDashboardPartials()
                });
            } else {
                res.render('investors/publicpoll', {
                    showvoting: 1,
                    id: params.rec.id,
                    open: params.votingdata.open,
                    Record: params.votingdata.Record,
                    OptionRecord: params.votingdata.OptionRecord,
                    VotesCasted: params.votingdata.VotesCasted,
                    TotalUsers: params.votingdata.TotalUsers,
                    partials: common.getInvestorDashboardPartials()
                });
            }
        });

    },
    publicpollpost(req, res) {

        function getvotingid(callback) {
			  const sql = `select id, stoid from voting where secretaccesscode = ?`;
			  mysql.executeSQLStatement(sql, [req.query.id.substr(0, 80)]).then((result) => {
                  if(result.length > 0) {

                      const sql = `update publicpollsdata set optionid = ? where id = ? and votingid = ?`;
                      mysql.executeSQLStatement(sql, [req.query.opt, req.query.id.substr(80), result[0].id ]).then(() => {
                          callback(null);
                      }).catch((error) => {
                          common.handleError(req, res, `${error.message} Error occured in contractview2signpost getInvestorPageData`);
                      });

                  } else
				    callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in contractview2signpost getInvestorPageData`);
			  });
        }
        async.waterfall([
            getvotingid
        ], (err) => {
            res.redirect("poll?op=1&id=" + req.query.id);
        });

    },

    uploadFiles(req, res) {
       common.uploadMultipleFiles(req).then((files) => {
            res.json(files);
       }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in uploadFiles`);
       });
    },
    downloadUploadedDocFile(req, res) {
        mysql.downloadUploadedFileDocument(0, req, res);
    },

    changeInvestorSTO(req, res) {
        const obj = common.getGloablSTORecordWithID(  parseInt(req.query.id)   );
        res.redirect(  obj.stolinkfull + "/dashboard"  );
    },

    activeproperties(req, res) {

        const sql = `select id, title, details, propertypicture, isBuyButtonEnabled  from stos where isActive = 1 and id > 0 and isICOShareTypeCompany = 0`;
        mysql.executeSQLStatement(sql, []).then((result) => {

            common.getCommonInvestorDashboardPageProperties(req, res)
            .then((data) => {
                     res.render('investors/singlecompany/propertylist', {
                        records: result,
                        partials: common.getInvestorDashboardPartials(),
                        Data: data,
                     });
            }, (err) => {
                common.handleError(req, res, `${error.message} - Error occured in activeproperties`);
            });

        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in activeproperties`);
        });

    },
    mycombineportfolio(req, res) {
        const sql = `select  shares, t.stoid, t.title, t.isblockchain,  stos.title as stotitle, stos.isActive, stos.details as stodetails, propertypicture, isBuyButtonEnabled from shares s, sharetypes t, stos where investorid = ? and s.sharetypeid = t.id and t.stoid = stos.id order by s.stoid;
                select a.ID, s.ID as stoID, t.title as sharetitle, a.Shares, s.title as companyname, DATE_FORMAT(DateReceived,'%M %d %Y') as DateReceived, isBuySharesFormSigned from InvestorBuyPropertyAlert a, stos s, sharetypes t where t.id = a.ShareTypeID and a.stoid = s.id and a.investorID = ? and a.status = 1`;

        mysql.executeSQLStatement(sql, [req.session.user.ID, req.session.user.ID]).then((recs) => {

                    recs[1].forEach(obj=> {
                        if(obj.isBuySharesFormSigned == 1)
                            obj.buyRequestContractsSigned = 1;
                        else
                            obj.buyRequestContractsSigned = 0;
                    })

                    /**
                     * @type ReportRowVM[]
                     */
                    // let paymentReportRows = [];
                    // getPaymentsReport(req)
                    // .then((data) => {
                    //     paymentReportRows = data;
                    // })
                    // .catch((error) => { // Not sure if this error is handled on the bottom or not
                    //    common.handleError(req, res, `${error.message} - Error occured in mycombineportfolio`)
                    // })
                    // .then(() => {
                        common.getCommonInvestorDashboardPageProperties(req, res)
                    // })
                    .then((data) => {
                             res.render('investors/singlecompany/singleviewholdings', {
                                records: recs[0],
                                buys: recs[1],
                                partials: common.getInvestorDashboardPartials(),
                                Data: data,
                                ShareCountInFractions: global.config.ShareCountInFractions
                             });
                    }, (err) => {
                        common.handleError(req, res, `${error.message} - Error occured in mycombineportfolio`);
                    });

        }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in mycombineportfolio`);
        });
    },
    combinedpropertydetails(req, res) {

          const sql = `select id, title, details, PropertyFullDetails, propertypicture, isActive, isBuyButtonEnabled from stos where id = ?; select * from PropertyFiles where stoid = ? and type = 1; select * from PropertyFiles where stoid = ? and type = 2`;
          mysql.executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id]).then((result) => {

                    common.getCommonInvestorDashboardPageProperties(req, res)
                    .then((data) => {
                             res.render('investors/singlecompany/propertydetails', {
                                 record: result[0][0],
                                 images: result[1],
                                 docs: result[2],
                                 partials: common.getInvestorDashboardPartials(),
                                 Data: data,
                             });
                    }, (err) => {
                        common.handleError(req, res, `${error.message} - Error occured in combinedpropertydetails`);
                    });

          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in combinedpropertydetails`);
          });

    },
    async buycombineproperty(req, res) {
      const params = {};

      function getDatabaseInformation(callback) {
        const sql = 'select * from InvestorBuyPropertyAlert where stoid = ? and investorID = ? and status = 1; ';
        mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID]).then((result) => {
          if (result.length > 0)
            params.InvestorOrderForSTOExists = 1;
          else
            params.InvestorOrderForSTOExists = 0;

          callback(null);
        }).catch((error) => {
          common.handleError(req, res, `${error.toString()} - buycombineproperty Error occured `);
        });
      }

      function getInvestorBalance(callback) {
        //todo: check if wallet can be converted to share class currency
        wallet.getInvestorSTOBalances(req.session.user.ID, req.query.id, global.config.investorInternalWalletProjectSpecific).then((balances) => {
          params.InvestorBalancesInCompanyAccounts = balances;
          callback(null);
        })
      }

      async.waterfall([
        getDatabaseInformation,
        getInvestorBalance
      ], function(err) {

        const sql = `select id, title, details, propertypicture, isActive from stos where id = ?; \
                        \
                        select ID, title, (companyShares - reduceSharesForPurchase) as companyShares, stoid, currencyid, minimumSharesToBuyByInvestor, isblockchain, premimum as totalPrice, blockchainBuyOrdersAllowed, isEnabled from sharetypes where stoid = ?;
                        
                        select p.ID as channelID, p.stoid, p.paymentType, p.title, p.paymentDetails, p.isActive, 
                                p.conversionEnabled, p.currencyToConvert, p.conversionRate, p.canWithdrawFunds,
                                p.sendInstructionalDepositEmail,
                                c.ID as currencyID, c.isBlockchainBased, c.Country, c.Currency, c.Abbreviation, c.Symbol,
                                cconv.Abbreviation as currencyTo, cconv.Symbol as currencySymbolTo,
                                crlock.rate as lockedRate, crlock.lockedAt, crlock.status
                            from paymentchannels p
                            INNER JOIN currency AS c ON c.ID = p.currencyID
                            LEFT JOIN currency AS cconv ON cconv.ID = p.currencyToConvert
                            LEFT JOIN ConversionRateLocks crlock ON crlock.ID =  (
                                SELECT id FROM ConversionRateLocks
                                WHERE currencyFrom = c.ID AND currencyTo = cconv.ID
                                AND (crlock.status = "pending" OR crlock.status = "temporary")
                                ORDER BY status DESC, lockedAt DESC LIMIT 1) -- prefer latest pending

                            where p.stoid = ? and  p.isActive = 1 and p.conversionEnabled = 1;`;

        mysql.executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id]).then((result) => {
          let totalAmount = 0;
          params.InvestorBalancesInCompanyAccounts.forEach(obj => {
            totalAmount = math.sum(totalAmount, parseFloat(obj.Amount ?? 0));
          });

          const formattedShareTypes = result[1].map((sharetype) => (
            {
              ...sharetype,
              totalPrice: round(sharetype.totalPrice, 3),
              companyShares: round(sharetype.companyShares, 3),
              minimumSharesToBuyByInvestor: round(sharetype.minimumSharesToBuyByInvestor, 3)
            }))
          common.getCommonInvestorDashboardPageProperties(req, res)
            .then((data) => {
              res.render('investors/singlecompany/payment', {
                stoid: req.query.id,
                message: req.flash('buyPropertyMessage'),
                totalAmount,
                walletBalances: params.InvestorBalancesInCompanyAccounts,
                walletBalancesString: encodeURIComponent(JSON.stringify(params.InvestorBalancesInCompanyAccounts)),
                record: result[0][0],
                shareTypesRec: formattedShareTypes,
                InvestorOrderForSTOExists: params.InvestorOrderForSTOExists,
                partials: common.getInvestorDashboardPartials(),
                csrfToken: encodeURI(req.csrfToken()),
                Data: data,
                ShareCountInFractions: global.config.ShareCountInFractions,
                channels: JSON.stringify(result[2])
              });
            }, (err) => {
              common.handleError(req, res, `${error.message} - Error occured in buycombineproperty`);
            });

        }).catch((error) => {
          common.handleError(req, res, `${error.message} Error occured in buycombineproperty`);
        });

      });

    },
    depositfundsinwallet(req, res) {
        const params = {};
        function getActiveProject(callback) {
            const sql = 'select id, title, isICOShareTypeCompany from stos where id > 0 order by isICOShareTypeCompany, id desc';
            mysql.executeSQLStatement(sql, []).then((results) => {
                    params.stos = results
                    callback(null);
            }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in depositfundsinwallet`);
            });
        }
        function getInvestorBalance(callback) {

            if(typeof req.query.stoid !== 'undefined') {
                if(req.query.stoid.length > 6){
                    common.handleError(req, res, `stoid > 6   Error occured in depositfundsinwallet`);
                }
            }

            params.currentSTOID = -1;
            if( params.stos.length > 0 ) {
                if(typeof req.query.stoid == 'undefined')
                    params.currentSTOID = params.stos[0].id;
                else
                    params.currentSTOID = req.query.stoid;
            }


            wallet.getInvestorSTOBalances( req.session.user.ID, params.currentSTOID, global.config.investorInternalWalletProjectSpecific ).then((balances) => {
                params.InvestorBalancesInCompanyAccounts = balances;
                callback(null);
            })
        }
        function lockConversionRates(callback) {
            priceOracle.lockConversionRatesTemp(params.currentSTOID, req.session.user.ID)
            .then(callback(null))
            .catch(e => {
                common.handleError(req, res, `Could not properly lock conversion rates in depositfundsinwallet.`);
            });
        }
        async function getMercuryAccount(callback) {
          params.mercuryConfig = await getMercuryParam();
          if (params.mercuryConfig.enabled) {
            params.mercuryAccount = await getMercuryAccountInfo(params.mercuryConfig);
          }
          callback(null);
        }
        async.waterfall([
            getActiveProject,
            getInvestorBalance,
            lockConversionRates,
            getMercuryAccount
        ], function (err) { 

                // ORIGINAL FIRST SQL LINE
                // const sql = `select *, p.ID as channelID, c.ID as currencyID, c.isBlockchainBased from paymentchannels p, currency c where stoid = ${params.currentSTOID} and p.currencyid = c.id and  p.isActive = 1; \
                const sql = `select p.ID as channelID, p.stoid, p.paymentType, p.title, p.paymentDetails, p.isActive, 
                                p.conversionEnabled, p.currencyToConvert, p.conversionRate, p.canWithdrawFunds,
                                p.sendInstructionalDepositEmail,
                                c.ID as currencyID, c.isBlockchainBased, c.Country, c.Currency, c.Abbreviation, c.Symbol,
                                cconv.Abbreviation as currencyTo, cconv.Symbol as currencySymbolTo,
                                crlock.rate as lockedRate, crlock.lockedAt, crlock.status
                            from paymentchannels p
                            INNER JOIN currency AS c ON c.ID = p.currencyID
                            LEFT JOIN currency AS cconv ON cconv.ID = p.currencyToConvert
                            LEFT JOIN ConversionRateLocks crlock ON crlock.ID =  (
                                SELECT id FROM ConversionRateLocks
                                WHERE currencyFrom = c.ID AND currencyTo = cconv.ID
                                AND (crlock.status = "pending" OR crlock.status = "temporary")
                                ORDER BY status DESC, lockedAt DESC LIMIT 1) -- prefer latest pending

                            where p.stoid = ${params.currentSTOID} and  p.isActive = 1 ; \
                            \
                            select *, i.CurrencyID as CurrencyIDDeposit, DATE_FORMAT(DateReceived,'%M %d %Y') as DateReceived, DATE_FORMAT(DateApproved,'%M %d %Y') as DateApproved   from InvestorDepositReceivedAlert i left join paymentchannels p on i.channelid = p.id where i.investorID = ${req.session.user.ID} and i.storid = ${params.currentSTOID} and i.isApproved != 5  order by DateReceived asc; \
                            \
                            select isICOShareTypeCompany from stos where id = ${params.currentSTOID}`;

                var data = [];

                mysql.executeSQLStatement(sql, []).then((paymentrecord) => {

                    // Set the proper conversion rate for each channel if a locked rate is available
                    paymentrecord[0].forEach(record => record.conversionRate = record.lockedRate ?? record.conversionRate);

                        var CurrentisICOShareTypeCompany = 0;
                        if(paymentrecord[2].length > 0)
                                CurrentisICOShareTypeCompany = paymentrecord[2][0].isICOShareTypeCompany;

                        common.getCommonInvestorDashboardPageProperties(req, res)
                        .then((data) => {

                            res.render('investors/singlecompany/wallet', {
                                investorID: req.session.user.ID,
                                message: req.flash('WalletMessage') ,
                                channels: paymentrecord[0],
                                stos: params.stos,
                                stoid: params.currentSTOID,
                                walletBalances: params.InvestorBalancesInCompanyAccounts,
                                balanceHistory: paymentrecord[1],
                                csrfToken:  encodeURI ( req.csrfToken() ),
                                partials: common.getInvestorDashboardPartials(),
                                CurrentisICOShareTypeCompany: CurrentisICOShareTypeCompany,
                                Data: data,
                                mercuryAccount: { ...params.mercuryAccount, note:`I${req.session.user.ID}S${params.currentSTOID}` },
                            });

                        }, (err) => {
                            common.handleError(req, res, `${error.message} - Error occured in depositfundsinwallet`);
                        });

                    }).catch((error) => {
                        common.handleError(req, res, `${error.message} Error occured in depositfundsinwallet`);
                    });

        });

    },
    depositAmountsBalancesAccount(req, res) {

        var errors = "";

        if( req.body.accountID.length > 7 )
            errors = errors + "depositAmountsBalancesAccount accountID is > 7 characters";
        if ( Number.isNaN(+(req.body.amount)) )
            errors = errors + "depositAmountBalancesAmount amount is not a number"
        if( +(req.body.amount) > 999999999 )
           errors = errors + "depositAmountsBalancesAccount amount is is ≥ 1 billion";
        if( req.body.details.length > 1000 )
            errors = errors + "depositAmountsBalancesAccount details is > 1000 characters";
        if( req.body.currencyID.length > 7 )
           errors = errors + "depositAmountsBalancesAccount currencyID > 7 characters";

        if( req.body.sendingbankname.length > 120 )
           errors = errors + "depositAmountsBalancesAccount sendingbankname > 120 characters";
        if( req.body.swiftcode.length > 30 )
           errors = errors + "depositAmountsBalancesAccount swiftcode > 30 characters";
        if( req.body.bankaccountnumber.length > 80 )
           errors = errors + "depositAmountsBalancesAccount bankaccountnumber > 80 characters";
        if( req.body.publicAddress.length > 180 )
           errors = errors + "depositAmountsBalancesAccount publicAddress > 180 characters";

        if(errors != "") {
            common.handleError(req, res, `${errors} Error occured in depositAmountsBalancesAccount`);
            return;
        } else {
            var details = "";
            var transactionID = "";
            if(req.body.isBlockchainIDTransfer == "0") {
                details = "Bank Name :  " + req.body.sendingbankname;

                if(req.body.swiftcode != null)
                    if(req.body.swiftcode != "")
                        details = details + "\r\n Swift Code : " + req.body.swiftcode;

                if(req.body.bankaccountnumber != null)
                    if(req.body.bankaccountnumber != "")
                        details = details + "\r\n Bank Account Number : " + req.body.bankaccountnumber;
                if(req.body.amount)
                    details += "\r\n Amount : " + req.body.amount;
            } else if(req.body.isBlockchainIDTransfer == "1") {
                details = "Blockchain Details";
                if (req.body.isWithdrawRequest) {
                    details = details + "\r\n Investor's Blockchain Public Wallet Address : " + req.body.publicAddress;
                } else {
                    details = details + "\r\nTransaction ID / TxID / TxHash : " + req.body.publicAddress;
                }
                transactionID = req.body.publicAddress;
            }

            details = details +  "\r\n " + req.body.details;

            let logDescription;

            priceOracle.lockConversionRatesForPurchase(req.body.stoid, req.session.user.ID, req.body.accountID)
            .then((conversionLock) => {
                const sql = `
                    insert into InvestorDepositReceivedAlert(storid, investorid, isApproved, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, currencyID, transactionID, isWithdrawFundsRequest, conversionRateLock)  values (?, ?,  0, now(), ?, ?, ?, now(), -1, ?, ?, ?, ${conversionLock?.id ?? `null`});
                    INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);
                    `;
                logDescription = "Admin Receiving a Payment Request.";
                const data = [
                    req.body.stoid, req.session.user.ID, req.body.accountID, req.body.amount,
                    details, req.body.currencyID, transactionID, req.body.isWithdrawRequest,
                    req.body.stoid, -1, logDescription, req.session.user.ID, 26, -1
                    ]
                mysql.executeSQLStatement(sql, data)
            }).then(async (paymentrecord) => {
              if (global.config.instructionalEmailsForPaymentChannelDeposits) {
                const paymentChannelID = req.body.accountID;
                const investorID = req.session.user.ID;
                const emailService = new EmailSendingService();
                await emailService.sendInstructionalDepositEmail(paymentChannelID, investorID, req.body.stoid,req.body.amount, +(req.body.isWithdrawRequest));
              }
              logger.info(`Admin Receiving a Payment Request. STO ID: ${req.body.stoid} User ID: -1 Investor ID: ${req.session.user.ID} Activity Type ID: 26 Rec ID: -1`);
              req.flash('WalletMessage', 'Your funds transfer message has been sent to the administration. They will verify the transfer and will update your balance. An email will be sent if the funds transfer has been approved or not')
              res.redirect("depositfundsinwallet?stoid=" + req.body.stoid);
            }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in depositAmountsBalancesAccount`);
            });

		}
    },
    buyInvestorPropertyShares(req, res) {
        var errors = "";

        if( req.body.pid.length > 7 )
           errors = errors + "pid > 7 characters";
        if( req.body.shares.length > 9 )
           errors = errors + "shares is > 9 characters";
        if( req.body.id.length > 7 )
            errors = errors + "id is > 7 characters";
        if( req.body.details.length > 1500 )
            errors = errors + "txtTextArea is > 1500 characters";

        if(errors != "") {
            common.handleError(req, res, `${errors} Error occured in buyInvestorPropertyShares`);
            return;
        } else {

				// if client interface is sending signForms=yes then this particular purchase do not require siging forms
				var signForms = 0;
				if( req.query.signForms != null )
					if( req.query.signForms == "yes" )
						signForms = 1;

				// if purchase amount is different then standard DB amounts (shares * nominal value)  like in case Genius needs
				// specific discounts to offer while making purchases and those calculations are on their interface then save this special
				// amount with purchase request and use this amount to dedect from investor balances instead of normal purchase price
				var offeredAmount = 0;
        let fromCurrencyID = 0;
				if( req.body.offeredAmount != null ) {
          offeredAmount = req.body.offeredAmount;
          fromCurrencyID = req.body.fromCurrencyID;
        }


				const params = { };


				function buyRecordInsert(callback) {
          // TODO Change this property alert logic
            const sql = `insert into InvestorBuyPropertyAlert(stoid, investorID, Shares, ShareTypeID, Details, status, DateReceived, publickey, isblockchain, isBuySharesFormSigned, purchasePriceOffered, fromCurrencyID ) values( ?, ?, ?, ?, ?, 1, now(), ?, ?, ?, ?, ? )`;

            mysql.executeSQLStatement(sql, [req.body.pid, req.session.user.ID, req.body.shares, req.body.id, req.body.details, req.body.key, req.body.isblockchain, signForms, offeredAmount, fromCurrencyID]).then((result) => {

              params.newID = result.insertId;
              callback(null);

            }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in buyInvestorPropertyShares`);
            });
				}
				function checkRequireOnceDocuments(callback) {
					if(global.config.sharePurchaseDocumentsMode==='internal'){
						// const stoID = (global).config.stos[req.hostname].stoid;
						const sql = `SELECT max(sharePurchaseDocuments.requireOnce) as requireOnce, min(du.ID) as ID FROM sharePurchaseDocuments 
						LEFT JOIN (
							SELECT * FROM documentuser 
							WHERE documentuser.DocumentStatus>1 and documentuser.investorID=?
							GROUP BY(documentuser.ID)
						) du on du.documentid = sharePurchaseDocuments.ID 
						group by (sharePurchaseDocuments.ID)`;
						mysql.executeSQLStatement(sql, [req.session.user.ID]).then( async (result) => {
							const alertAdminSQl = 'update InvestorBuyPropertyAlert set isBuySharesFormSigned=1 where ID=?'
							// const requiredOnce = result.filter(result=>result.requiredOnce===1)
							if(result.length>0 && result.every(row=>row.requiredOnce===1 && row.ID))
								await mysql.executeSQLStatement(alertAdminSQl,[params.newID]);

							const submittedSharePurchaseDocumentsSql = result
								.filter(row=>row.ID && row.requiredOnce===1)
								.map(row=>`insert into submittedSharePurchaseDocuments(sharePurchaseRequestID, submittedDocumentID ) values(${params.newID},${row.ID});`)
								.join('');

							if(submittedSharePurchaseDocumentsSql.length>0)
								await mysql.executeSQLStatement(submittedSharePurchaseDocumentsSql,[]);

							callback();
						}).catch((error) => {
							  common.handleError(req, res, `${error.message} Error occured in buyInvestorPropertyShares`);
						});
					} else {
						callback();
					}

			}
				async.waterfall([
					 buyRecordInsert,
					 checkRequireOnceDocuments
				], (err) => {
					  if (!err) {
						  if(signForms == 0)
								res.redirect( `signSubscriptionForms?id=${params.newID}&stoID=${req.body.pid}` );
						  else
								res.redirect( "mycombineportfolio" );
					  }
				});

		}

    },
    deletecombinepropertybuyrequest(req, res) {
        const params = {};

        function getRecord(callback) {
              const sql = `select * from InvestorBuyPropertyAlert where id = ? and investorid = ${req.session.user.ID}`;
              mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {

                  if(result.length == 0) {
                          common.handleError(req, res, `Error occured in deletecombinepropertybuyrequest ${req.session.user.ID} trying to delete a contract id ${req.query.id} that does not belong to him`);
                  } else {
						params.record = result[0];
						callback(null);
				  }

              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in deletecombinepropertybuyrequest`);
              });
        }
        function deleteRecord(callback) {
              const sql = `delete from InvestorBuyPropertyAlert where id = ?`;
              mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    callback(null);
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in deletecombinepropertybuyrequest`);
              });
        }
        function getContractsCount(callback) {
              //TODO   this may not be required.   as if investor has signed a contract then even if he delete the request. his contract is signed and should not be signed again even if he delete his first request. Previously if he started buying shares and delete his request then this code will check if he has any previous contracts. if not then delete this record as well    but the contract in docusign is not deleted
              const sql = `select count(*) as count from InvestorBuyPropertyAlert where investorid = ${req.session.user.ID}`;
              mysql.executeSQLStatement(sql, []).then((result) => {

                        if(result[0].count == 0) {
                              const sql = `delete from docu_sign_sto_contracts where investor_id = ${req.session.user.ID} `;
                              mysql.executeSQLStatement(sql, []).then((result) => {
                                    callback(null);
                              }).catch((error) => {
                                  common.handleError(req, res, `${error.message} Error occured in deletecombinepropertybuyrequest`);
                              });
                        } else
                            callback(null);

              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in deletecombinepropertybuyrequest`);
              });
        }
        async.waterfall([
             getRecord,
             deleteRecord,
             //getContractsCount
        ], (err) => {
              if (!err) {
                    res.redirect("/mycombineportfolio")
              }
        });

    },
    signSubscriptionForms(req, res) {
        const mode = global.config.sharePurchaseDocumentsMode;
        const params = {}
        function getDatabaseInformation(callback) {
            const sql = `select * from InvestorBuyPropertyAlert where id = ? and investorid = ?`;
            mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID]).then((result) => {
            if(result.length == 0) {
                common.handleError(req, res, `investorclient signSubscriptionForms Something went wrong. InvestorBuyPropertyAlert ID ${req.query.id} does not exits for investor ${req.session.user.ID}`); 
            } else {
                params.buyRequest = result[0];
                callback(null);
            }
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured `);
            });
        }
        function getInvestorRec(callback) {
            const sql = 'select * from investor where id = ?';
            mysql.executeSQLStatement(sql, [params.buyRequest.investorID]).then((result) => {
                params.investorRec = result[0];
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured `);
            });
        }
        async function getIsSTOSubscriptionFormSigned(callback) {
          const investorCountry = (params.investorRec.taxResidencyCountry !== null &&
            params.investorRec.taxResidencyCountry !== '') ?
            params.investorRec.taxResidencyCountry :
            params.investorRec.country;
          const investorType = params.investorRec.investorType === 1 ? 'Entity' : 'Individual';
          let docuSignParam = "NULL";
          let helloSignParam = "NULL";
          if (mode === 'docuSign') {
            docuSignParam = "NOT NULL";
          } else if (mode === 'helloSign') {
            helloSignParam = "NOT NULL";
          }
          // removed document legacy mode
          //  if (global.config.CurrentClientID === 14) {
          const stoID = req.query.stoID;

          const sharePurchaseDocumentsSqlService = new SharePurchaseDocumentsSqlService(
            getQueryfactory(mysql.executeSQLStatement)
          );
          params.documents = await sharePurchaseDocumentsSqlService.findAllWithDocuments(
            stoID,
            req.session.user.ID,
            params.buyRequest.ID,
            investorCountry ?? '',
            investorType,
            docuSignParam,
            helloSignParam
          );
          if (
            !params.documents.length ||
            params.documents.every(
              (spd) => spd.status?? 0 >= 2
            )
          ) {
            const investorBuyPropertyAlertService = new InvestorBuyPropertyAlertSqlService(
              mysql.executeSQLStatement
            );
            await investorBuyPropertyAlertService.updateDocumentsSigned(
              // Mark alert as signed
              true,
              params.buyRequest.ID,
              req.session.user.ID
            );
            res.redirect("/mycombineportfolio");
          } else {
            callback(null);
          }
        }
        function getShareTypeRec(callback) {
            const sql = 'select * from sharetypes where id = ?';
            mysql.executeSQLStatement(sql, [params.buyRequest.ShareTypeID]).then((result) => {
                params.shareType = result[0];
                params.purchasePrice = math.multiply(math.sum(params.shareType.premimum ?? 0, params.shareType.nominalValue ?? 0), params.buyRequest.Shares ?? 0);
                callback(null);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured `);
            });
        }
        async.waterfall([
            getDatabaseInformation,
            getInvestorRec,
            getIsSTOSubscriptionFormSigned,
            getShareTypeRec
        ], function (err) {
                common.getCommonInvestorDashboardPageProperties(req, res).then((data) => {
                        var AllContractsAreSigned = 0;
                        if(params.STOContractSigned ==1 && params.buyRequest.isBuySharesFormSigned ==1)
                            AllContractsAreSigned = 1;
                        const subscriptionForm = global.config.sharePurchaseDocumentsMode === 'docuSign' ? 'docusignDefault' :
                          params.shareType.subscriptionform;
                        res.render('investors/subscription/' + subscriptionForm , {
                            partials: common.getInvestorDashboardPartials(),
                            Data: data,
                            AllContractsAreSigned: AllContractsAreSigned,
                            internalMode: mode === "internal",
                            documents: params.documents,
                            shareRec: params.shareType,
                            buyRequest: params.buyRequest,
                            purchasePrice: params.purchasePrice,
                            investorRec: params.investorRec,
                            STOContractSigned: params.STOContractSigned || 0,
                            csrfToken: encodeURI( req.csrfToken() ),
                        });
                }, (error) => {
                    common.handleError(req, res, `${error.message} - Error occured in investorclient signSubscriptionForms`);
                });
        });
    },
    signSubscriptonFormsSubmit(req, res) {
        if(req.body.contentstype == "file") {
                // this is when investor uploads a signed contract PDF or document file
                var j = JSON.parse(  req.body.contents );
                const newLoc = common.getUserFileUploadsLocationFullPath("contracts");
                common.moveMultipleFilesToLocation(j, newLoc, "subscription-").then((data) => {
                    const sql = 'update InvestorBuyPropertyAlert set isSubScriptionFormSigned = 1, SubScriptionFormContents = ?, SubScriptionFormPath = "file" where id = ?' ; 
                      mysql.executeSQLStatement(sql, [data[0], req.body.id]).then((result) => { 
                            res.redirect("mycombineportfolio")
                      }).catch((error) => { 
                            common.handleError(req, res, `${error.toString()} - Error occured signSubscriptionForms`); 
                      });
                }).catch((error) => {
                    common.handleError(req, res, `${error.message} Error occured in signSubscriptionForms`);
                });
        } else{
                // DocuSign contract signing
                 const sql = 'update InvestorBuyPropertyAlert set isSubScriptionFormSigned = 1, SubScriptionFormContents = ?, SubScriptionFormPath = "html" where id = ?' ; 
                  mysql.executeSQLStatement(sql, [req.body.contents, req.body.id]).then((result) => { 
                        res.redirect("mycombineportfolio")
                  }).catch((error) => { 
                        common.handleError(req, res, `${error.toString()} - Error occured signSubscriptionForms`); 
                  });
        }

    },


    // Genius Specific Requirements
    // -----------------------------------------
    transferInvestorBalance(req, res) {
        const params = {};
        function getDatabaseInformation(callback) {
              const sql = `SELECT b.ID, b.stoid,  b.investorID, b.currencyID, b.Amount, s.title FROM InvestorBalancesInCompanyAccounts b, stos s where b.id = ? and b.stoid = s.id`;
              mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                    if(  req.session.user.ID  != result[0].investorID ) {
                          common.handleError(req, res, `Error occured in transferInvestorBalance ${req.session.user.ID} trying to access investor balance record id ${req.query.id} that does not belong to him`);
						return;
                    } else {
						params.record = result[0];
						callback(null)
					}
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in transferInvestorBalance`);
              });
        }
        function getAllSTOExceptTransferFrom(callback) {
              const sql = `select id, title from stos where id != ? and id != 0  and isICOShareTypeCompany = 0`;
              mysql.executeSQLStatement(sql, [params.record.stoid]).then((result) => {
                    params.stos = result;
                    callback(null)
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in transferInvestorBalance`);
              });
        }
        async.waterfall([ 
            getDatabaseInformation,
            getAllSTOExceptTransferFrom
        ], function (err) { 
                common.getCommonInvestorDashboardPageProperties(req, res)
                .then((data) => {
                         res.render('investors/singlecompany/transferbalance', {
                            record: params.record,
                            stos: params.stos,
                            partials: common.getInvestorDashboardPartials(),
							csrfToken: encodeURI( req.csrfToken() ),
                            Data: data,
                         });
                }, (err) => {
                    common.handleError(req, res, `${error.message} - Error occured in transferInvestorBalance`);
                });
        });

    },
    transferInvestorBalanceGet(req, res) {
        const params = {};

        function getDatabaseInformation(callback) {
              const sql = `SELECT * FROM InvestorBalancesInCompanyAccounts where id = ?`;
              mysql.executeSQLStatement(sql, [req.body.id]).then((result) => {
                    if(  req.session.user.ID  != result[0].investorID ) {
                          common.handleError(req, res, `Error occured in transferInvestorBalanceGet ${req.session.user.ID} trying to access investor balance record id ${req.body.id} that does not belong to him`);
						return;
                    } else {

							if(  parseInt( req.body.amount )  > result.Amount  ) {
								  common.handleError(req, res, `Error occured in transferInvestorBalanceGet ${req.session.user.ID} trying to transfer more balance ${req.body.amount} than his current balance in record id ${req.body.id}`);
							} else {
								params.record = result[0];
								callback(null)
							}

					}
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in transferInvestorBalance`);
              });
        }
        function checkSTOExists(callback) {
              const sql = `select id from stos where id =?`;
              mysql.executeSQLStatement(sql, [req.body.toSTOID]).then((result) => {

                    if(  result.length == 0  ) {
                          common.handleError(req, res, `Error occured in transferInvestorBalanceGet ${req.session.user.ID} trying to transfer balance to STO that does not exist in the platform. the STO ID ${req.body.toSTOID} is wrong `);
                    } else
                    	callback(null);

              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in transferInvestorBalance`);
              });
        }
        function checkInvestorBalanceRecordExistsInTargetSTO(callback) {
              const sql = `select * from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?`;
              mysql.executeSQLStatement(sql, [req.session.user.ID, params.record.currencyID, req.body.toSTOID]).then((result) => {

                    if(result.length > 0)
                        params.recordExists = 1;
                    else
                        params.recordExists = 0;

                    callback(null)
              }).catch((error) => {
                  common.handleError(req, res, `${error.message} Error occured in transferInvestorBalance`);
              });
        }
        function transferFunds(callback) {

            if(params.recordExists == 0) {

				  const sql = `update InvestorBalancesInCompanyAccounts set amount = amount - ? where stoid=? and investorID=? and currencyID=?; insert into InvestorBalancesInCompanyAccounts(stoid, investorID, currencyID, Amount) values(?, ?, ?, ?)`;
				  mysql.executeSQLStatement(sql, [req.body.amount, params.record.stoid, req.session.user.ID, params.record.currencyID,  req.body.toSTOID, req.session.user.ID, params.record.currencyID, req.body.amount]).then((result) => {
						callback(null)
				  }).catch((error) => {
					  common.handleError(req, res, `${error.message} Error occured in transferInvestorBalance`);
				  });
			} else {

				  const sql = `update InvestorBalancesInCompanyAccounts set amount = amount - ? where stoid=? and investorID=? and currencyID=?; update InvestorBalancesInCompanyAccounts set amount = amount + ? where stoid=? and investorID=? and currencyID=?`;
				  mysql.executeSQLStatement(sql, [ req.body.amount, params.record.stoid, req.session.user.ID, params.record.currencyID,  req.body.amount, req.body.toSTOID, req.session.user.ID, params.record.currencyID]).then((result) => {
						callback(null)
				  }).catch((error) => {
					  common.handleError(req, res, `${error.message} Error occured in transferInvestorBalance`);
				  });
			}
        }
		function getCurrentBalancesOfInvestor(callback) {
				  const sql = `select amount from  InvestorBalancesInCompanyAccounts where stoid=? and investorID=? and currencyID=?; select amount from InvestorBalancesInCompanyAccounts where stoid=? and investorID=? and currencyID=?`;
				  mysql.executeSQLStatement(sql, [ params.record.stoid, req.session.user.ID, params.record.currencyID,  req.body.toSTOID, req.session.user.ID, params.record.currencyID]).then((result) => {
					    console.log( result[0][0].amount + " " +  result[1][0].amount );
						callback(null)
				  }).catch((error) => {
					  common.handleError(req, res, `${error.message} Error occured in transferInvestorBalance`);
				  });
		}
		function createInvestorBalanceLog(callback) {

				const sql = `insert into InvestorDepositReceivedAlert(investorID, isApproved, storid, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, runningBalance, currencyID) values (?, 5, ?, now(), 0, ?, ?, now(), 0, ?, ?) \
				;\
				insert into InvestorDepositReceivedAlert(investorID, isApproved, storid, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, runningBalance, currencyID) values (?, 5, ?, now(), 0, ?, ?, now(), 0, ?, ?)`;
				mysql.executeSQLStatement(sql, [ params.exchangeRecord.investorID, params.sharestypestoid, params.offerRecord.rateFrom, "Shares sold on the Exchange", result[0].amount, params.sharestypecurrencyid  ]).then((result) => {
					callback(null);
				}).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in acceptSwapInternal fun13`);
				});

		}
        async.waterfall([ 
            getDatabaseInformation,
            checkSTOExists,
            checkInvestorBalanceRecordExistsInTargetSTO,
            transferFunds,
			getCurrentBalancesOfInvestor
			//createInvestorBalanceLog
        ], function (err) { 
            res.redirect( "/depositfundsinwallet?stoid=" + req.body.toSTOID )
        });

    },
	icolist(req, res) {
        const params = {};

        async.waterfall([
            function fun1(callback) {
        		const sql = `select id, title, details, propertypicture,isBuyButtonEnabled  from stos where isActive = 1 and id > 0 and isICOShareTypeCompany = 1`;
				mysql.executeSQLStatement(sql, []).then((result) => {
					params.records = result;
					callback(null);
				}).catch((error) => {
					common.handleError(req, res, `${error.toString()} - Error occured` );
				});
			},
			function fun2(callback) {
				if(params.records.length == 1) {
					res.redirect('/icodetails?id=' + params.records[0].id )
				} else {
						common.getCommonInvestorDashboardPageProperties(req, res)
						.then((data) => {
								 res.render('investors/ico/icoList', {
									records: params.records,
									partials: common.getInvestorDashboardPartials(),
									Data: data,
								 });
						}, (err) => {
							common.handleError(req, res, `${error.message} - Error occured in activeproperties`);
						});
				}
			}
		])
	},
	icodetails(req, res) {
          const sql = `select id, title, details, PropertyFullDetails, propertypicture, isActive, isBuyButtonEnabled from stos where id = ?; select * from PropertyFiles where stoid = ? and type = 1; select * from PropertyFiles where stoid = ? and type = 2`;
          mysql.executeSQLStatement(sql, [req.query.id, req.query.id, req.query.id]).then((result) => {

                    common.getCommonInvestorDashboardPageProperties(req, res)
                    .then((data) => {
                             res.render('investors/ico/icodetails', {
                                 record: result[0][0],
                                 images: result[1],
                                 docs: result[2],
                                 partials: common.getInvestorDashboardPartials(),
                                 Data: data,
                             });
                    }, (err) => {
                        common.handleError(req, res, `${error.message} - Error occured in icodetails`);
                    });

          }).catch((error) => {
              common.handleError(req, res, `${error.message} Error occured in combinedpropertydetails`);
          });
	},
	icobuy(req, res) {
            const params = {};

            function getDatabaseInformation(callback) {               
                  const sql = 'select * from InvestorBuyPropertyAlert where stoid = ? and investorID = ? and status = 1; ';
                  mysql.executeSQLStatement(sql, [req.query.id, req.session.user.ID]).then((result) => {
                        if(result.length > 0)
                            params.InvestorOrderForSTOExists = 1;
                        else
                            params.InvestorOrderForSTOExists = 0;

                        callback(null); 
                  }).catch((error) => { 
                        common.handleError(req, res, `${error.toString()} - buycombineproperty Error occured `); 
                  });
            }
			function getInvestorCurrentSharesInAllProjects(callback) {
                  const sql = 'select COALESCE(sum(shares), 0) as sum from shares where investorID = ? and stoid not in (select id from stos where isICOShareTypeCompany = 1 )';
                  mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => {
                        params.investorTotalShares = parseFloat( result[0].sum );

                        callback(null); 
                  }).catch((error) => { 
                        common.handleError(req, res, `${error.toString()} - buycombineproperty Error occured `); 
                  });
			}
            async.waterfall([ 
                getDatabaseInformation,
				getInvestorCurrentSharesInAllProjects
            ], function (err) { 

                        const sql = "select * from InvestorBalancesInCompanyAccounts a, currency c where investorid = ? and a.currencyID = c.id and stoid = ?; select id, title, details, propertypicture, isActive from stos where id = ? \
											;\
											select ID, title, (companyShares - reduceSharesForPurchase) as companyShares, isEnabled, stoid, currencyid, minimumSharesToBuyByInvestor, isblockchain, premimum as totalPrice, blockchainBuyOrdersAllowed from sharetypes where stoid = ?;";

                        mysql.executeSQLStatement(sql, [req.session.user.ID, req.query.id, req.query.id, req.query.id]).then((result) => {
                                var totalAmount = 0;
                                result[0].forEach(obj => {
                                        totalAmount = math.sum(totalAmount, obj.Amount ?? 0);
                                });

								// Initially ICO is only being used for Genius and they have special pricing model. which are implemented on following
								// template.   later develop a geneal template for all other companies and select the template baed on company
								const templateToDispaly = "buyicogenius"

                                common.getCommonInvestorDashboardPageProperties(req, res)
                                .then((data) => {
                                         res.render('investors/ico/' + templateToDispaly, {
                                                stoid: req.query.id,
                                                message: req.flash('buyPropertyMessage'),
                                                totalAmount: totalAmount,
                                                walletBalances: result[0],
											 	investorTotalShares: params.investorTotalShares,
                                                record: result[1][0],
                                                shareTypesRec: result[2],
                                                InvestorOrderForSTOExists: params.InvestorOrderForSTOExists,
                                                partials: common.getInvestorDashboardPartials(),
											 	csrfToken:  encodeURI ( req.csrfToken() ),
                                                Data: data,
                                         });
                                }, (err) => {
                                    common.handleError(req, res, `${error.message} - Error occured in buycombineproperty`);
                                });

                          }).catch((error) => {
                              common.handleError(req, res, `${error.message} Error occured in buycombineproperty`);
                          });

            });       

	},
    // -----------------------------------------



	error(req, res) {
		req.logout();
		res.render('error', {
			message: req.flash('message'),
			partials: common.getPartials(),
		});
	},

    languageChange(req, res) {
        const sql = 'update investor set language = ? where id = ?'; 
        mysql.executeSQLStatement(sql, [req.query.llang, req.session.user.ID]).then((result) => { 
            res.cookie('locale', req.query.llang, { maxAge: 900000, httpOnly: true });
            logger.info("DB Language changed")
            res.redirect(req.query.lurlto);
        }).catch((error) => { 
            common.handleError(req, res, `${error.toString()} - Error occured `); 
        });
    },

    //RedSwan
    signRedSwanDocuSignSubscriptionForm(req, res) {
            const params = {} 
            function getDatabaseInformation(callback) {               
                  const sql = `select * from InvestorBuyPropertyAlert where id = ? and investorid = ${req.session.user.ID}`; 
                  mysql.executeSQLStatement(sql, [req.query.id]).then((result) => { 
                        if(result.length == 0) {
                               common.handleError(req, res, `Something went wrong. InvestorBuyPropertyAlert ID ${req.query.id} does not exits for investor ${req.session.user.ID}`); 
                        } else {
							params.buyRequest = result[0];
							callback(null);
						}
                  }).catch((error) => { 
                        common.handleError(req, res, `${error.toString()} - signRedSwanDocuSignSubscriptionForm Error occured `); 
                  }); 
            } 
            function getShareTypeRec(callback) {               
                  const sql = 'select * from sharetypes where id = ?; select title from stos where id = ?';
                  mysql.executeSQLStatement(sql, [params.buyRequest.ShareTypeID, params.buyRequest.stoid]).then((result) => { 
                        params.shareType = result[0][0];
                        params.companyName = result[1][0].title;
                        params.purchasePrice = math.multiply(math.sum(params.shareType.premimum ?? 0, params.shareType.nominalValue ?? 0), params.buyRequest.Shares ?? 0);
                        callback(null);
                  }).catch((error) => { 
                        common.handleError(req, res, `${error.toString()} - signRedSwanDocuSignSubscriptionForm Error occured `); 
                  }); 
            } 
            function getInvestorRec(callback) {
                  const sql = 'select *from investor where id = ?; select Symbol from currency where id = ?';
                  mysql.executeSQLStatement(sql, [req.session.user.ID, params.shareType.currencyid]).then((result) => { 
                        params.investorRec = result[0][0];
                        params.currencySymbol = result[1][0].Symbol;
                        callback(null);
                  }).catch((error) => { 
                        common.handleError(req, res, `${error.toString()} - signRedSwanDocuSignSubscriptionForm Error occured `); 
                  }); 
            }
            async.waterfall([ 
                     getDatabaseInformation,
                     getShareTypeRec,
                     getInvestorRec
            ], function (err) {

                var nameOfInvestor = "";
                var titleOFEmail = "";
                var json = [];

                if(req.query.formid == "1") {
                       json =   [
                                {
                                    "tabLabel": "ClientStreetAddress",
                                    "value": params.investorRec.Address
                                },
                                {
                                    "tabLabel": "ClientCity",
                                    "value": params.investorRec.town
                                },
                                {
                                    "tabLabel": "ClientState",
                                    "value": params.investorRec.state
                                },
                                {
                                    "tabLabel": "ClientZip",
                                    "value": params.investorRec.zip
                                },
                                {
                                    "tabLabel": "ClientEnail",
                                    "value": params.investorRec.email
                                },
                        ];

                        if( params.investorRec.investorType == 0 ) {
                                json.push({
                                    "tabLabel": "ClientName",
                                    "value": params.investorRec.FirstName + " " + params.investorRec.LastName
                                });

                                json.push({
                                    "tabLabel": "ClientPhone",
                                    "value": params.investorRec.phone
                                });

                                json.push({
                                    "tabLabel": "Initials1",
                                    "value": params.investorRec.FirstName.charAt(0) + " " + params.investorRec.LastName.charAt(0)
                                });

                                json.push({
                                    "tabLabel": "Initials2",
                                    "value": params.investorRec.FirstName.charAt(0) + " " + params.investorRec.LastName.charAt(0)
                                });


                                var nameOfInvestor = params.investorRec.FirstName + " " + params.investorRec.LastName;
                                var titleOFEmail = params.companyName + " - Investment Advisory Contract";
                        }

                        if( params.investorRec.investorType == 1 ) {
                                json.push({
                                    "tabLabel": "ClientName",
                                    "value": params.investorRec.CompanyName
                                });

                                json.push({
                                    "tabLabel": "ClientPhone",
                                    "value": params.investorRec.PhonePrimaryContact
                                });

                                const splitname = params.investorRec.NamePrimaryContact.split(" ")
                                var Initials =  "";
                                splitname.forEach((obj) => {
                                    Initials = Initials + obj.charAt(0);
                                })

                                json.push({
                                    "tabLabel": "Initials1",
                                    "value": Initials
                                });

                                json.push({
                                    "tabLabel": "Initials2",
                                    "value": Initials
                                });


                                var nameOfInvestor = params.investorRec.CompanyName;
                                var titleOFEmail = params.companyName + " - Investment Advisory Contract";
                        }

                        json.push({
                            "tabLabel": "ClientType",
                            "value": params.investorRec.investorType
                        });

                } else  if(req.query.formid == "2") {

                       json =   [
                                {
                                    "tabLabel": "ProjectName",
                                    "value":  params.companyName
                                },
                                {
                                    "tabLabel": "NumberOfTokens",
                                    "value": params.buyRequest.Shares
                                },
                                {
                                    "tabLabel": "AggregatePurchasePrice",
                                    "value": params.currencySymbol + " " + params.purchasePrice
                                },
                                {
                                    "tabLabel": "DayOfPurchase",
                                    "value": new Date().getDate()
                                },
                                {
                                    "tabLabel": "MonthOfPurchase",
                                    "value": common.getMonthName(   new Date().getMonth()   )
                                },
                                {
                                    "tabLabel": "YearLastCharacter",
                                    "value": new Date().getFullYear().toString().charAt( new Date().getFullYear().toString().length - 1 )
                                }
                        ];

                        if( params.investorRec.investorType == 0 ) {
                                json.push({ "tabLabel": "PrintNameofSubscriber",
                                    "value": params.investorRec.FirstName + " " + params.investorRec.LastName
                                })


                                var nameOfInvestor = params.investorRec.FirstName + " " + params.investorRec.LastName;
                                var titleOFEmail = params.companyName + " - " + params.buyRequest.Shares + " " + " Subscription Agreement";

                        }

                        if( params.investorRec.investorType == 1 ) {
                                json.push({
                                    "tabLabel": "PrintNameofSubscribingEntity",
                                    "value": params.investorRec.CompanyName
                                })

                                json.push({
                                    "tabLabel": "PrintNameandTitleofSignatory",
                                    "value":   params.investorRec.NamePrimaryContact
                                })

                                var nameOfInvestor = params.investorRec.CompanyName;
                                var titleOFEmail = params.companyName + " - " + params.buyRequest.Shares + " " +  " Subscription Agreement";
                        }

                        json.push({
                            "tabLabel": "ClientType",
                            "value": params.investorRec.investorType
                        });

                }

                const redirectURL = `${global.config.stos[req.hostname].stolinkfull}/redSwanDocuSignSubscriptionFormRedirect?id=${req.query.id}&formid=${req.query.formid}`;


                common.redirectDocuSignSigningURL(req, res, json, redirectURL, req.query.formid, nameOfInvestor, titleOFEmail, params.investorRec.email);
        });

    },
    redSwanDocuSignSubscriptionFormRedirect(req, res) {

            const params = {} 
            function getDatabaseInformation(callback) {               
                  const sql = `select * from InvestorBuyPropertyAlert where id = ?  and investorid = ${req.session.user.ID}`; 
                  mysql.executeSQLStatement(sql, [req.query.id]).then((result) => {
                        if(result.length == 0) {
                               common.handleError(req, res, `Something went wrong. InvestorBuyPropertyAlert ID ${req.query.id} does not exits for investor ${req.session.user.ID}`); 
                        } else {
							params.buyRequest = result[0];
							callback(null);
						}
                  }).catch((error) => { 
                        common.handleError(req, res, `${error.toString()} - Error occured `); 
                  }); 
            } 
            function checkAndSetSTOContractSign(callback) {
                if(req.query.event == "signing_complete") {

                        if(req.query.formid == "1") {

                                const sql = `select * from docu_sign_sto_contracts where investor_id = ${req.session.user.ID} and is_docusign_contract_signed = 1`;

                                  mysql.executeSQLStatement(sql, []).then((result) => {
                                            if(result.length > 0)
                                                callback(null);
                                            else {
                                                        const sql = `insert into docu_sign_sto_contracts(stoid, investor_id, is_docusign_contract_signed, docusign_contract_signed_id) values(?, ?, 1, ?)`;
                                                        mysql.executeSQLStatement(sql, [0, req.session.user.ID, req.query.envelopeId]).then((result) => {
                                                                callback(null);

                                                        }).catch((error) => { 
                                                            common.handleError(req, res, `${error.toString()} - Error occured `); 
                                                        }); 

                                            }
                                  }).catch((error) => {
                                        common.handleError(req, res, `${error.toString()} - Error occured `); 
                                  }); 

                        } else
                            callback(null);

                } else
                    callback(null);

            }
            function checkAndSetSharesContractSign(callback) {               

                if(req.query.event == "signing_complete") {
                    var sql = "";

                        if(req.query.formid == "2") {
                             sql = `update InvestorBuyPropertyAlert set isBuySharesFormSigned = 1, BuySharesFormPath = ?  where id = ? and investorid = ${req.session.user.ID}`;

                              mysql.executeSQLStatement(sql, [req.query.envelopeId, req.query.id]).then((result) => {
                                    callback(null);
                              }).catch((error) => { 
                                    common.handleError(req, res, `${error.toString()} - Error occured `); 
                              }); 
                        } else
                            callback(null);

                } else
                    callback(null);
            } 
            async.waterfall([ 
                getDatabaseInformation,
                checkAndSetSTOContractSign,
                checkAndSetSharesContractSign
            ], function (err) {
                    res.redirect(  "signSubscriptionForms?id=" + req.query.id  )
            });

    }

};


router.get('/login2', clientinvestor.login2);
router.post('/login2post', clientinvestor.login2post);
router.get('/commonredirect', updateBlockPassDataMiddleWare, clientinvestor.commonredirect);
router.get('/investortypeselect', clientinvestor.investortypeselect);
router.get('/investortypeselectpost', clientinvestor.investortypeselectpost);

// Open API
router.get('/register', clientinvestor.register);
router.post('/registerPost', clientinvestor.registerPost);
router.get('/accountalreadytaken', clientinvestor.accountalreadytaken);

router.get('/verificationcode', clientinvestor.verificationcode);
router.post('/verificationcodePost', clientinvestor.verificationcodePost);

router.get('/forgotpassword', clientinvestor.forgotpassword);
router.post('/forgotpasswordpost', clientinvestor.forgotpasswordpost);
router.get('/resetpasswordcall', clientinvestor.resetpasswordcall);
router.post('/resetpasswordpost', clientinvestor.resetpasswordpost);


// Password protected.  Need investor login
router.get('/dashboard', common.isInvestorUserAuthenticated, clientinvestor.dashboard);
router.get('/viewInvestorWallet', common.isInvestorUserAuthenticated, clientinvestor.viewInvestorWallet)
router.get('/wizard', common.isInvestorUserAuthenticated, clientinvestor.investorWizard);
router.post('/wizardPost', common.isInvestorUserAuthenticated, clientinvestor.investorWizardPost);
router.post('/wizardPostFile', common.isInvestorUserAuthenticated, clientinvestor.investorWizardPostFile);
router.get('/wizardError', common.isInvestorUserAuthenticated, clientinvestor.wizardError);
router.get('/wizardComplte', common.isInvestorUserAuthenticated, clientinvestor.wizardComplte);
router.get('/changeinvestorauth', common.isInvestorUserAuthenticated, clientinvestor.changeinvestorauth);
router.post('/wizardSubmit', common.isInvestorUserAuthenticated, clientinvestor.wizardSubmit);
router.post('/changePassword', common.isInvestorUserAuthenticated, clientinvestor.changePassword);
router.get('/deleteInvestorDocumentsFromKYC', common.isInvestorUserAuthenticated, clientinvestor.deleteInvestorDocumentsFromKYC);


router.get('/settings', common.isInvestorUserAuthenticated, clientinvestor.settings);
router.get('/addnewpublickeyofinvestor', common.isInvestorUserAuthenticated, clientinvestor.addnewpublickeyofinvestor);
router.get('/deleteinvestorpublickey', common.isInvestorUserAuthenticated, clientinvestor.deleteinvestorpublickey);

router.get('/ownership', common.isInvestorUserAuthenticated,  clientinvestor.ownership);
router.get('/tellafriend', common.isInvestorUserAuthenticated, clientinvestor.tellafriend);

router.get('/viewInvitationsFromOtherCompany', common.isInvestorUserAuthenticated, clientinvestor.viewInvitationsFromOtherCompany);
router.get('/investorInvitationReaction', common.isInvestorUserAuthenticated, clientinvestor.investorInvitationReaction);

router.post('/changenextofkin', common.isInvestorUserAuthenticated, clientinvestor.changeNextOfKin);
router.post('/changeUsufructuaries', common.isInvestorUserAuthenticated, clientinvestor.changeUsufructuaries);
router.post('/changeBeneifical', common.isInvestorUserAuthenticated, clientinvestor.changeBeneifical);

router.get('/downloadDocumentFromKYCRecord', common.isInvestorUserAuthenticated, clientinvestor.downloadDocumentFromKYC);
router.get('/updates', common.isInvestorUserAuthenticated,  clientinvestor.updates);
router.get('/updateDetails', common.isInvestorUserAuthenticated, clientinvestor.updateDetails);
router.get('/inbox', common.isInvestorUserAuthenticated,  clientinvestor.inbox);
router.get('/email', common.isInvestorUserAuthenticated, clientinvestor.email);
router.post('/sendCompanyMessage', common.isInvestorUserAuthenticated, clientinvestor.sendCompanyMessage);
router.post('/sendemail', common.isInvestorUserAuthenticated, clientinvestor.sendemail);
router.get('/changePublciAddress', common.isInvestorUserAuthenticated, clientinvestor.changePublciAddress);
router.get('/deleteChangeKeyRequest', common.isInvestorUserAuthenticated, clientinvestor.deleteChangeKeyRequest);
router.get('/settlements', common.isInvestorUserAuthenticated,  clientinvestor.settlements);

router.get('/downloadInvestorContractPDF', common.isInvestorUserAuthenticated, clientinvestor.downloadInvestorContractPDF);
router.get('/deleteInvestorContract', common.isInvestorUserAuthenticated, clientinvestor.deleteInvestorContract);

// router.get('/documentviewforcomments', common.isInvestorUserAuthenticated, clientinvestor.documentviewforcomments);
// router.post('/documentsuggestion', common.isInvestorUserAuthenticated, clientinvestor.documentsuggestion);
// router.get('/documentDeleteComment', common.isInvestorUserAuthenticated, clientinvestor.documentDeleteComment);
// router.post('/changecommenttext', common.isInvestorUserAuthenticated, clientinvestor.changecommenttext);

// router.get('/contractview2', common.isInvestorUserAuthenticated, documentsController.contractview2);
// router.post('/contractview2sign', common.isInvestorUserAuthenticated, clientinvestor.contractview2sign);
// router.post('/contractview2signpost', common.isInvestorUserAuthenticated, clientinvestor.contractview2signpost);
// router.get('/deletedocumentusersignatures', common.isInvestorUserAuthenticated, clientinvestor.deletedocumentusersignatures);

router.get('/votingdetails', common.isInvestorUserAuthenticated, clientinvestor.votingdetails);
router.get('/votings', common.isInvestorUserAuthenticated,  clientinvestor.votings);
router.get('/castVote', common.isInvestorUserAuthenticated, clientinvestor.castVote);
router.get('/meetingdetails', common.isInvestorUserAuthenticated, clientinvestor.meetingdetails);
router.get('/getVotingAgendaItemsStatuses', common.isInvestorUserAuthenticated, clientinvestor.getVotingAgendaItemsStatuses);
router.get('/saveUserMeetingDetails', common.isInvestorUserAuthenticated, clientinvestor.saveUserMeetingDetails);
router.get('/downloadAgendaIemDocument', common.isInvestorUserAuthenticated, clientinvestor.downloadAgendaIemDocument);

router.get('/paypalPayment', common.isInvestorUserAuthenticated, clientinvestor.paypalPayment);
router.get('/pyamentSuccess', common.isInvestorUserAuthenticated, clientinvestor.pyamentSuccess);
router.get('/pyamentFailure', common.isInvestorUserAuthenticated, clientinvestor.pyamentFailure);
router.get('/sendPayPalPayment', common.isInvestorUserAuthenticated, clientinvestor.sendPayPalPayment);

router.get('/trading', common.isInvestorUserAuthenticated, accreditationMiddleware,  clientinvestor.trading); // Refactored
router.get('/tradingsellview', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.tradingsellview);
router.get('/tradingbuy', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.tradingbuy);
router.post('/tradingbuypost', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.tradingbuypost);
router.get('/tradingsell', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.tradingsell);
router.post('/tradingsellpost', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.tradingsellpost);
router.get('/tradingselldelete', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.tradingselldelete);
router.get('/deleteBuyOffer', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.deleteBuyOffer);
router.get('/opennewbuyorder', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.opennewbuyorder);
router.post('/opennewbuyorderpost', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.opennewbuyorderpost);
router.get('/atomicSwap', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.atomicSwap);
router.get('/acceptSwap', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.acceptSwap);
router.get('/changeSwapStatus', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.changeSwapStatus);
router.get('/acceptSellSwapInternal', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.acceptSellSwapInternal);
router.get('/acceptBuySwapInternal', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.acceptBuySwapInternal);


router.get('/legalinformation', common.isInvestorUserAuthenticated, clientinvestor.legalinformation);

router.get('/purchaseshares', common.isInvestorUserAuthenticated, clientinvestor.purchaseshares);
router.post('/uploadFiles', common.isInvestorUserAuthenticated, clientinvestor.uploadFiles);
router.get('/downloadUploadedDocFile', common.isInvestorUserAuthenticated, clientinvestor.downloadUploadedDocFile);
router.get('/changeInvestorSTO', common.isInvestorUserAuthenticated, clientinvestor.changeInvestorSTO);
router.get('/viewinvestorpaymentalert', common.isInvestorUserAuthenticated, clientinvestor.viewinvestorpaymentalert);
router.post('/investorpaymentalertedit', common.isInvestorUserAuthenticated, clientinvestor.investorpaymentalertedit);
router.post('/buyInvestorPropertyShares', common.isInvestorUserAuthenticated, accreditationMiddleware, clientinvestor.buyInvestorPropertyShares);

router.get('/languageChange', common.isInvestorUserAuthenticated, clientinvestor.languageChange);

router.get('/activeproperties', common.isInvestorUserAuthenticated,  clientinvestor.activeproperties);
router.get('/mycombineportfolio', common.isInvestorUserAuthenticated,  clientinvestor.mycombineportfolio);
router.get('/combinedpropertydetails', common.isInvestorUserAuthenticated, clientinvestor.combinedpropertydetails);
router.get('/buycombineproperty', common.isInvestorUserAuthenticated, clientinvestor.buycombineproperty);
router.get('/depositfundsinwallet', common.isInvestorUserAuthenticated,  clientinvestor.depositfundsinwallet);
router.post('/depositAmountsBalancesAccount', common.isInvestorUserAuthenticated, clientinvestor.depositAmountsBalancesAccount);
router.get('/deletecombinepropertybuyrequest', common.isInvestorUserAuthenticated, clientinvestor.deletecombinepropertybuyrequest);
router.get('/signSubscriptionForms', common.isInvestorUserAuthenticated, clientinvestor.signSubscriptionForms);
router.post('/signSubscriptonFormsSubmit', common.isInvestorUserAuthenticated, clientinvestor.signSubscriptonFormsSubmit);
router.get('/transferInvestorBalance', common.isInvestorUserAuthenticated, clientinvestor.transferInvestorBalance);
router.post('/transferInvestorBalanceGet', common.isInvestorUserAuthenticated, clientinvestor.transferInvestorBalanceGet);


router.get('/icolist', common.isInvestorUserAuthenticated,  clientinvestor.icolist);
router.get('/icodetails', common.isInvestorUserAuthenticated,  clientinvestor.icodetails);
router.get('/icobuy', common.isInvestorUserAuthenticated,  clientinvestor.icobuy);


router.get('/error', clientinvestor.error);
router.get('/poll', clientinvestor.publicpoll);
router.get('/pollpost', clientinvestor.publicpollpost);
router.get('/downloadAgendaIemDocumentProxy', clientinvestor.downloadAgendaIemDocument);


router.get('/proxy', clientinvestor.proxy);
router.post('/proxyInvestorsSelection', clientinvestor.proxyInvestorsSelection);


router.get('/signRedSwanDocuSignSubscriptionForm', common.isInvestorUserAuthenticated, clientinvestor.signRedSwanDocuSignSubscriptionForm);
router.get('/redSwanDocuSignSubscriptionFormRedirect', common.isInvestorUserAuthenticated, clientinvestor.redSwanDocuSignSubscriptionFormRedirect);

export default clientinvestor;
module.exports = router;
