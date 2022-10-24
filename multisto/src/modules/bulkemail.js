'use strict';

const common = require('./common');
const mysql = require('../modules/mysql');
const logger = require('../logger');
const async = require('async');
const crypto = require('crypto');

let serverRunning = 1;
let isJobRunning = 0;
let passwordsalt = "";

process.on('message', (msg) => {

    if(msg.op == 1) {
        passwordsalt = msg.salt;
        process.send({ "msg": "Password Salt Set" });
    }

    if(msg.op == 2) {
        serverRunning = msg.data;

        if(serverRunning == 1)
            process.send({ "msg": "Email Server Resumed" });
        else
            process.send({ "msg": "Email Server Paused" });
    }

    if(msg.op == 3) {
        process.send({ "status": serverRunning });
    }

});

setInterval(() => {
    // if(serverRunning == 1) {
    if(false) { // TEMPORARY CHECK
        if(isJobRunning == 0) {
              var params = {};
              function checkForNewJob(callback) {

                    const sql = 'select * from bulkemails order by id asc limit 1';
                    mysql.executeSQLStatement(sql, []).then((result) => {
                        if(result.length > 0) {
                            params.record = result[0];
                            params.runjob = 1;
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
                        const sql = 'select SMTP_Host, SMTP_Port, SMTP_User, SMTP_Password, SMTP_FromAddress, stolinkfull from stos where id = ?';
                        mysql.executeSQLStatement(sql, [params.record.stoid]).then((result) => {
                            params.storec = result[0];

                            var mykey = crypto.createDecipher('aes-128-cbc', passwordsalt);
                            //console.log(params.storec);
                            var mystr = mykey.update(params.storec.SMTP_Password, 'hex', 'utf8')
                            mystr += mykey.final('utf8');
                            params.descryptpassword = mystr;
                            callback(null);

                        }).catch((error) => {
                            logger.error(`${error.toString()} - Error in bulk email Server getSTOInfo`);
                        });
                  } else
                      callback(null);
              }
              function getEmailAddresses(callback) {
                  if(params.runjob == 1) {
                      isJobRunning = 1;

                      if(params.record.typeOfQuery == 1) {
                            const sqlJSON = JSON.parse(params.record.InvestorsSelectionSQL);
                            mysql.executeSQLStatement(`select FirstName, LastName, email ${sqlJSON.sql}`, sqlJSON.data).then((result) => {
                                params.emailstosend = result;
                                callback(null);
                            }).catch((error) => {
                                logger.error(`${error.toString()} - Error in bulk email Server getEmailAddresses`);
                            });
                      } else if(params.record.typeOfQuery == 2) {
                            //this is public poll so insert all email addressses in the public polls DB
                            params.emailstosend = JSON.parse(params.record.BulkEmailsCommaSeperated);
                            const data = JSON.parse(params.record.emailText);
                            async.eachSeries(params.emailstosend, function(rec, callbackinternal) {
                                const sql = 'insert into publicpollsdata(stoid, votingid, email, optionid) values(?, ?, ?, ?)';
                                mysql.executeSQLStatement(sql, [params.record.stoid, data.votingid, rec.email, 0]).then((result) => {
                                    rec.id = result.insertId;
                                    callbackinternal(null);
                                });

                            }, function(err){
                               if (err) {
                                   logger.error(err);
                               } else {
                                   callback(null);
                               }
                            });
                      }

                  } else
                      callback(null);
              }
              function executejob(callback) {
                  if(params.runjob == 1) {
                      isJobRunning = 1;
                      const data = JSON.parse(params.record.emailText);

                      if(params.record.typeOfQuery == 1) {

                              common.sendBulkEmails(params.emailstosend,
                                    params.record.title,
                                    data.text,
                                    params.storec.SMTP_Host,
                                    params.storec.SMTP_Port,
                                    params.storec.SMTP_User,
                                    params.descryptpassword,
                                    params.storec.SMTP_FromAddress,
                                    data.attachments
                              ).then(() => {
                                  callback(null);
                              }).catch((error) => {
                                  logger.error(`${error.toString()} - Error in bulk email Server executejob 1`);
                              });

                        } else if(params.record.typeOfQuery == 2) {

                            var emailtext = "";
                            async.eachSeries(params.emailstosend, function(rec, callbackinternal) {

                                    emailtext = `<b>${data.title}</b>   <br /><br />  ${data.text}`;
                                    emailtext = `${emailtext}  <br/><br/><b> Click here to go to polls and cast your vote </b> <br/><br/>  `;
                                    emailtext = `${emailtext} ${params.storec.stolinkfull}/poll?id=${data.randomtxt + rec.id}`;
                                    emailtext = `${emailtext} <br/><br/> ${data.footer}`;

                                    common.senEmailDirect(rec.email, data.emailSubject, emailtext, params.storec.SMTP_Host,
                                        params.storec.SMTP_Port,
                                        params.storec.SMTP_User,
                                        params.descryptpassword,
                                        params.storec.SMTP_FromAddress,
                                        data.attachments
                                    ).then(() => {
                                        callbackinternal(null);
                                    }, (err) => {
                                        callbackinternal(null);
                                    });

                            }, function(err){
                               if (err) {
                                   logger.error(err);
                               } else {
                                   callback(null);
                               }
                            });

                        }
                  } else
                      callback(null);
              }
              function deletejobrecord(callback) {
                if(params.runjob == 1) {
                        const sql = `delete from bulkemails where id = ${params.record.ID}`;
                        mysql.executeSQLStatement(sql, []).then(() => {
                            isJobRunning = 0;
                            callback(null);
                        }).catch((error) => {
                            logger.error(`${error.toString()} - Error in bulk email Server deletejobrecord`);
                        });
                } else
                    callback(null);
              }
              async.waterfall([
                 checkForNewJob,
                 getSTOInfo,
                 getEmailAddresses,
                 executejob,
                 deletejobrecord
              ], function (err) {
                   params = null;
              });
        }
    }
}, 60000);



