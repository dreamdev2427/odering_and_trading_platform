'use strict';

import * as emailTextsController from '../services/platform/emails/controllers/EmailTexts.controller';
import getSTOFromConfig from '../services/getSTOFromConfig';

const common = require('./common');
const mysql = require('../modules/mysql');
const logger = require('../logger');
const async = require('async');
var LineByLineReader = require('line-by-line');
var fs = require('fs');
var moment = require('moment');
const emailTexts = require('../data/text.json');
const { default: registerAffiliateInvestorFromEmail } = require('../controllers/investors/affiliateCtl/registerAffiliateInvestorFromEmail');

let isJobRunning = 0;
var fileName = "";
var stoid = 0;
var stoCurrencyID = 0;
var investorID = 0;
var sharesID = 0;
var historyID = 0;
var tmp = 0;
var InvestorCombinePropertiesMode = 0;
let sendPasswordEmail = 'true';

var fld = [];

process.on('message', (msg) => {

	InvestorCombinePropertiesMode = msg.InvestorCombinePropertiesMode;

    if(msg.op == 1) {
        sendPasswordEmail = msg.sendPasswordEmail;

        fileName = msg.fileName;

        logger.error( "----------------------------------------------------------------------------------------" );
        logger.error( "Bulk Investor Uploads Job starts" );
        logger.error( "----------------------------------------------------------------------------------------" );
        logger.error( "Following Shares are going to be transferred to new investors" );
        logger.error("Filename - " + fileName);


        var stmt = "Select  1;";     //default SQL to be executed if there are no shares to add
        var keys = Object.keys(msg.shareTypes);

        for (var i = 0; i < keys.length; i++) {
            if(msg.shareTypes[keys[i]].count > 0) {
                logger.error(  "ID-" + keys[i] + "    Shares-" + msg.shareTypes[keys[i]].count  );
                stmt = stmt + `update sharetypes set companyShares = companyShares - ${msg.shareTypes[keys[i]].count} where id = ${keys[i]} and stoid = ${msg.stoid}; `;
            }
        }

        mysql.executeSQLStatement(stmt, []).then((result) => {
            logger.info( "Shares has been reduced from company account" );
            fileName = msg.fileName;
            stoid = parseInt( msg.stoid );
            stoCurrencyID = msg.currencyid;

            process.send({ "status": 1 });
        }).catch((error) => {
            logger.error(`${error.toString()} - Error occured in bulkinvestorupload LoadUploadFile`);
        });

    }

});

setInterval(() => {
    if(isJobRunning == 0 && fileName != "") {
        isJobRunning = 1;

        var lineReader = new LineByLineReader( __dirname + "/../../temp/" + fileName );

        lineReader.on('error', function (err) {
            logger.error( "----------------------------------------------------------------------------------------" );
            logger.error("Error processing bulk upload of investors from CSV file");
            logger.error("Filename - " + fileName);
            logger.error(err.toString());
            logger.error( "End processing of investor bulk uploads" );
            logger.error( "----------------------------------------------------------------------------------------" );
        });

        lineReader.on('line', function (line) {

            logger.error("Investor Bulkuploads Line - " + line);

            lineReader.pause();
            fld = line.split(",");

            if(fld.length > 1) {      //igonor line with no record or nothing  an empty line has length 1  most probably last line

                if(fld.length >= 16) {

                    function insertInvestor(callback) {
                        //Record Format
                        //0 investorType	1 FirstName	 2LastName	3email	4CompanyName	5TitleWithinCompany	6PowerToBindCompany	7Address
                        //8country	9phone	10zip	 11city	 12state	13Passport Number	14NationalID	15DOB	16Notes
                        var currentdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                        var ptb = 0;
                        if(fld[6] != "")
                            if( ! isNaN(fld[6]) )
                                ptb = parseInt(fld[6]);

                        var dob = "";
                        if( fld[15] != "" )
                            dob = fld[15]
                        else
                            dob = "1970-01-01";

                        var ityp = 0;
                        if(fld[0] != "")
                            if( ! isNaN(fld[0]) )
                                ityp = parseInt(fld[0]);


                        // bulk registration
                        const sql = 'insert into investor(FirstName, LastName, Address, country, phone, zip, town, state, Password, email, PassportNumber, NationalID, receiveEmails, investorType, CompanyName, TitleWithinCompany, PowerToBindCompany, DOB, twofactorenable, investorBulkUploadStatus, uploadDate) values (?, ?, ?, ?, ?, ?, ?, ?, "", ?, ?, ?, 1, ?, ?, ?, ?, ?, 0, 1, ?)';
                        const values = [fld[1], fld[2], fld[7], fld[8], fld[9], fld[10], fld[11], fld[12], fld[3], fld[13], fld[14], ityp, fld[4],  fld[5],  ptb, dob, currentdate ];
                        // TODO: Are we sure these fields are set correctly? Email = fld[3] is the 10th argument in 'sql', but in 'values' it's fld[13] = PassportNumber
                        logger.info("Investor being added with values" + JSON.stringify(values));

                        mysql.executeSQLStatement(sql, values).then((result) => {
                                    registerAffiliateInvestorFromEmail(fld[3]); // This happens ASYNC here and error handling is inside
									investorID = result.insertId;
                                    // prevent hanging up
                                    const notes = fld[16] ? fld[16] : "notes"

									var sql = "insert into investorsto(investorid, isAccountClosed, stoid, isKYC, KYCApplied, KYCCurrentStatus, KYCUpdateDate, isActive, notes) values (?, 0, ?, 1, 0, 1, now(), 1, ?); insert into kyc(InvestorID, appliedFor, kyc) values(?, 0, '{}')";
                            var values = [investorID, stoid, notes, investorID];


									if( InvestorCombinePropertiesMode == 1 ) {
											sql = sql + "; insert into investorsto(investorid, isAccountClosed, stoid, isKYC, KYCApplied, KYCCurrentStatus, KYCUpdateDate, isActive, notes) values (?, 0, 0, 1, 0, 1, now(), 1, ?)";
											values.push(investorID);
                                            values.push(notes);
									}

									mysql.executeSQLStatement(sql, values).then((result) => {

											logger.info("Investor added with id - " + investorID);
											callback(null);

									}).catch((error) => {
										logger.error(`${error.toString()} - Error occured in bulkinvestorupload`);
										setTimeout(function () { lineReader.resume(); }, 200);
									});

                        }).catch((error) => {
                            logger.error(`${error.toString()} - Error occured in bulkinvestorupload`);
                            setTimeout(function () { lineReader.resume(); }, 200);
                        });
                    }
                    function insertShares(callback) {
                        // record contains shares data
                        // 0 investorType	1 FirstName	 2LastName	3email	4CompanyName	5TitleWithinCompany	6PowerToBindCompany	7Address
                        // 8country	9phone	10zip	 11city	 12state	13Passport Number	14NationalID	15DOB	16Notes

                        tmp = 17;
                        var sql = "";
                        var values = [];
                        async.whilst(
                            function() {
                                return tmp < fld.length;
                            },
                            function (callbackInner) {
                                if((fld.length-1) >= (tmp + 3)) {

                                        function insertShares(callbackShares) {
                                            sql = 'insert into shares(stoid, shareTypeid, shares, investorID, sharesHistoryID) values(?, ?, ?, ?, ?); insert into shareswallet(investorID, sharesID, shares, publicKey, isBlocked) values(?, ?, ?, ?, 0)';

                                            values = [stoid, parseInt(fld[tmp]), parseFloat(fld[tmp + 1]), investorID, 0, investorID, parseInt(fld[tmp]), parseFloat(fld[tmp + 1]), 'platform'];
                                            logger.error("Shares transfering" + JSON.stringify(values))

                                            mysql.executeSQLStatement(sql, values).then((result) => {
                                                sharesID = result[0].insertId;

                                                callbackShares(null);
                                            }).catch((error) => {
                                                logger.error(`${error.toString()} - Error occured in bulkinvestorupload insertShares`);
                                                setTimeout(function () { lineReader.resume(); }, 200);
                                            });

                                        }
                                        function insertInvestments(callbackShares) {
                                            sql = 'insert into investments(stoid, UserID, InvestorID, TokensTransferred, AmountInvested, CurrencyID, Description, sharetypeid, DateTime) values(?, ?, ?, ?, ?, ?, ?, ?, ?)'
                                            values = [stoid, 0, investorID, parseFloat(fld[tmp + 1]), 0, stoCurrencyID, fld[tmp + 3], parseInt(fld[tmp + 0]), fld[tmp + 2]];
                                            logger.info("History adding" + JSON.stringify(values))

                                            mysql.executeSQLStatement(sql, values).then((result) => {
                                                callbackShares(null);
                                            }).catch((error) => {
                                                logger.error(`${error.toString()} - Error occured in bulkinvestorupload insertInvestments`);
                                                setTimeout(function () { lineReader.resume(); }, 200);
                                            });
                                        }
                                        function insertSharesHistory(callbackShares) {
                                            sql = 'insert into shareshistory(sharesid, isActive, investorID, shares, shareTypeid, CertificateSerials, ShareSerials, purchaserID, datePurchase) values (?,?,?,?,?,?,?,?,?)'
                                            values = [ sharesID, 1, investorID, parseFloat(fld[tmp + 1]), parseInt(fld[tmp + 0]), "", "", -1, fld[tmp + 2] ];
                                            logger.info("Share History adding" + JSON.stringify(values))

                                            mysql.executeSQLStatement(sql, values).then((result) => {
                                                historyID = result.insertId;
                                                callbackShares(null);
                                            }).catch((error) => {
                                                logger.error(`${error.toString()} - Error occured in bulkinvestorupload insertSharesHistory`);
                                                setTimeout(function () { lineReader.resume(); }, 200);
                                            });
                                        }
                                        function linkSharesWithHistory(callbackShares) {
                                            sql = 'update shares set sharesHistoryID = ? where id = ?';
                                            values = [historyID, sharesID];
                                            logger.info("Share History Linking" + JSON.stringify(values))

                                            mysql.executeSQLStatement(sql, values).then((result) => {
                                                callbackShares(null);
                                            }).catch((error) => {
                                                logger.error(`${error.toString()} - Error occured in bulkinvestorupload linkSharesWithHistory`);
                                                setTimeout(function () { lineReader.resume(); }, 200);
                                            });
                                        }
                                        async.waterfall([
                                            insertShares,
                                            insertInvestments,
                                            insertSharesHistory,
                                            linkSharesWithHistory
                                        ], (err) => {
                                            tmp=tmp+4;
                                            callbackInner(null);
                                        });

                                } else {
                                    tmp=tmp+4;
                                    callbackInner(null);
                                }
                            },
                            function (err, n)  {
                                callback(null);
                            },
                        );

                    }
                    function sendEmail(callback) {
                        if (sendPasswordEmail === 'true') {
                            const investorEmailAddress = fld[3];
                            const firstName = fld[1];
                            const lastName = fld[2];
                            //const stoId = parseInt(msg.stoid);
                            const stmt = "select stolink, stolinkfull, SMTP_Host, SMTP_Port, SMTP_User, SMTP_Password, " +
                                "SMTP_FromAddress, emailFooter, EmailTxtInvestorBulkUpload from stos where ID = ?";
                            logger.info(`Sending email to investor with email ${investorEmailAddress}`);
                            mysql.executeSQLStatement(stmt, [stoid.toString()]).then((result) => {
                                const hostName = result[0].stolink;
                                // const hostLink = result[0].stolinkfull;
                                const emailTxtInvestorBulkUpload = result[0].EmailTxtInvestorBulkUpload;
                                const frontendUrl = common.getFrontEndUrl();
                                const linkHref = `${frontendUrl}/forgot-password`;
                                const linkTitle = `${frontendUrl}/forgot-password`;

                                const stoEmailTexts = emailTextsController.default?.globalEmailTexts(stoid.toString()) || emailTexts;
                                if (!stoEmailTexts) throw new Error(`Email texts not found for BulkInvestorRegistrationPasswordResetEmailText`);

                                let txtEmail = '';
                                if (JSON.stringify(emailTxtInvestorBulkUpload) !== 'null') {
                                    txtEmail = emailTextsController.format(stoEmailTexts.BulkInvestorRegistrationPasswordResetEmailText.Line1, {
                                        firstname: firstName,
                                        lastname: lastName,
                                        bulkUpload: emailTxtInvestorBulkUpload,
                                        linkHref,
                                        linkTitle,
                                    });
                                } else {
                                    txtEmail = emailTextsController.format(stoEmailTexts.BulkInvestorRegistrationPasswordResetEmailText.Line2, {
                                        firstname: firstName,
                                        lastname: lastName,
                                        hostName,
                                        linkHref,
                                        linkTitle,
                                    });
                                }

                                txtEmail += '<br /><br />';
                                txtEmail += result[0].emailFooter || '';

                                // let txtEmail = '';
                                // txtEmail = `${txtEmail}Dear ${firstName} ${lastName}`;
                                // txtEmail += '<br /><br />';
                                // if (JSON.stringify(emailTxtInvestorBulkUpload) !== 'null') {
                                //     txtEmail += emailTxtInvestorBulkUpload + "<br />";
                                // } else {
                                //     txtEmail += `${emailTexts.BulkInvestorRegistrationPasswordResetEmailText.Line1 + hostName} `;
                                //     txtEmail += `${emailTexts.BulkInvestorRegistrationPasswordResetEmailText.Line2} <br />`;
                                // }
                                // txtEmail += '<br /><br />';
                                // txtEmail += `${emailTexts.BulkInvestorRegistrationPasswordResetEmailText.Line3} <br />`;
                                // txtEmail += `<a href="${hostLink}/forgotpassword" > ${hostLink}/passwordSetup </a>`;
                                // txtEmail += '<br /><br />';
                                // if (JSON.stringify(result[0].emailFooter) !== 'null')
                                //     txtEmail += result[0].emailFooter;

                                const smtpConfig = {
                                    SMTP_Host: result[0].SMTP_Host,
                                    SMTP_Port: result[0].SMTP_Port,
                                    SMTP_User: result[0].SMTP_User,
                                    SMTP_Password: result[0].SMTP_Password,
                                    SMTP_FromAddress: result[0].SMTP_FromAddress
                                };
                                common.sendEmailForBulkInvestorAddition(hostName, investorEmailAddress,
                                    emailTexts.BulkInvestorRegistrationPasswordResetEmailText.Subject, txtEmail,
                                    [], smtpConfig)
                                    .then(() => {
                                        callback(null);
                                    }, (err) => {
                                        logger.error(`${err.toString()} - Error occured in bulkinvestorupload while sending the email to ${investorEmailAddress}`);
                                        callback(null);
                                    });

                            }).catch((error) => {
                                logger.error(`${error.toString()} - Error occured in bulkInvestorUpload Email`);
                                callback(null);
                            });
                        } else {
                            callback(null);
                        }
                    }
                    async.waterfall([
                        insertInvestor,
                        insertShares,
                        sendEmail
                    ], (err) => {
                        setTimeout(function () { lineReader.resume(); }, 200);
                    });

                } else
                    setTimeout(function () { lineReader.resume(); }, 200);
            } else
                setTimeout(function () { lineReader.resume(); }, 200);
        });

        lineReader.on('end', function () {
            process.send({ "status": 0 });

            fs.unlink(__dirname + "/../../temp/" + fileName, (err) => {
                logger.info( "Bulk Uploads jobs done" );
                logger.info("Filename - " + fileName);
                logger.info( "----------------------------------------------------------------------------------------" );
                isJobRunning = 0;
                fileName = "";
            });
        });

    }

}, 60000);




