import MainRouter from './communication/MainRouter';

import * as emailTexts from './data/text.json';
import Bootstrap from './modules/Bootstrap';
import preStart from './modules/preStart';
import * as emailTextsController from './services/platform/emails/controllers/EmailTexts.controller';
import getSTOFromConfig from './services/getSTOFromConfig';
import VersionRedirect from './modules/VersionRedirect';
import { execute } from './services/gql-execute';

import './services/passport-admin';
import './services/passport-platform';
import { exit } from 'process';

const childProcess = require('child_process');
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const https = require('https');
const validator = require('validator');
const request = require('request');
const { fork } = require('child_process');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cons = require('consolidate');
const handlebars = require('handlebars');
const async = require('async');
const hpp = require('hpp'); // this is HTTP Parameter Pollution (HPP)     check security section in notes
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const compression = require('compression');
const csurf = require('csurf');
const flash = require('connect-flash');
const helmet = require('helmet');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const i18n = require('i18n');
const cors = require('cors');
const common = require('./modules/common');
const mysql = require('./modules/mysql');
const logger = require('./logger');
const mercuryCronJob = require('./services/mercury/mercuryCronJob');
const blockchainApi = require('./modules/blockchain');

/**
 * Saves byte values of the request body for /api/investorSumSubWebhookPost action
 * this is necessary for SumSub webhook token validation as they encode the key with the bytes of the body
 * @param req
 * @param res
 * @param buf
 * @param encoding
 */
function rawBodySaver(req, res, buf, encoding) {
    if (req.path.startsWith('/api/investorSumSubWebhookPost')) {
        if (buf && buf.length) {
            req.rawBody = buf.toString(encoding || 'utf8'); // additional property set on req object
        }
    }
}

// Bootstrap is a management process before multisto attempts to load

(async function startup() {
  await Bootstrap.all();
  logger.info(`✔ Bootstrap complete`);
  return Promise.resolve();
}()).catch((e) => {
  logger.error(`Error in the bootstrap procedure. Aborting.`);
  logger.error(e.stack);
  process.exit(1);
}).then(() => {

try {
    // extend Request with gqlExecute
    app.use((req, _, next) => {
        req.gqlExecute = execute;
        next();
    });

    app.use(flash());
    app.use(compression());

    // Determine current build version from current Git commit ------------------------------------------------------
    // Store in global.revision and global.revisionFull
    if (process.env.NODE_ENV === 'production') {
        // On production, we don't have Git installed and therefore we get the version of the production branch
        // global.revision = fs.readFileSync('.git/HEAD').toString().trim();
        global.revisionFull = process.env.commit_hash;
        global.revision = process.env.commit_hash;
    } else {
        // Obtain current branch version using Git
        childProcess.exec('git rev-parse HEAD', (err, stdout) => {
            global.revision = stdout.trim();
            global.revisionFull = global.revision;
            global.revision = global.revision.substring(0, 8);
        });
    }
    // --------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------
    //      Load global variables
    global.config = {};
    global.NODE_ENV = process.env.NODE_ENV || 'staging';
    if (global.NODE_ENV === 'staging' || global.NODE_ENV === 'production') {
        logger.info('Reading variables from environment');
        global.config.SESSION_SECRET = process.env.SESSION_SECRET;
        global.config.COOKIE_PARSERSECRET = process.env.COOKIEPARSER_SECRET;
        global.config.SERVER_PORT = process.env.SERVER_PORT;
        global.config.PASSWORD_SALT = process.env.PASSWORD_SALT;
        global.config.DB_SERVER = process.env.DB_SERVER;
        global.config.DB_USER = process.env.DB_USER;
        global.config.DB_PASSWORD = process.env.DB_PASSWORD;
        global.config.DB_Database = process.env.DB_Database;
        global.config.SMTP_Host = process.env.SMTP_Host;
        global.config.SMTP_Port = process.env.SMTP_Port;
        global.config.SMTP_User = process.env.SMTP_User;
        global.config.SMTP_Password = process.env.SMTP_Password;
        global.config.SMTP_FromAddress = process.env.SMTP_FromAddress;
        global.config.SMTP_MaxFileSize = process.env.SMTP_MaxFileSize; // file size in MB
        global.config.investorInvalidLoginAttempts = process.env.investorInvalidLoginAttempts || 10;
        global.config.REDIS_URL = process.env.REDIS_URL;
        global.config.max_file_upload_size = process.env.MAX_FILE_UPLOAD_SIZE || '2mb';
        if (process.env.isHTTPSessionSecure === 'true')
            global.config.isHTTPSessionSecure = true;
        else
            global.config.isHTTPSessionSecure = false;
    }

    global.config.SecondsInvestorSideMenuCountsFromDBChanges = 10 * 60 * 1000;
    //global.config.stos [];        this is also global variable intialized in common
    global.config.bulkInvestorUploadProcessStatus = 0;
    global.config.affiliateUpdateServiceInProgress = 0;
    global.config.blockchainRefreshingstos = [];
    global.config.ethereumSwapAddress = "0x3cb6df9845af79ab7c2af9530da0b046bacb6cf9";

    // Log access attempts ------------------------------------------------------------------------------------------
    // This middleware has to be called in before the others, so as to be the first handler in line
    global.config.doPathLoggingAll = process.env.DO_PATH_LOGGING_ALL;
    if (global.config.doPathLoggingAll === 1) {
        console.log("-- Path logging is enabled for all requests.");
        app.use('*', (req, res, next) => {
            console.log(`[${req.method}] ${req.hostname}${req.path}`);
            logger.info(`[${req.method}] ${req.hostname}${req.path}`);
            next();
        });
    }
    //---------------------------------------------------------------------------------------------------------------
    app.use(helmet.hidePoweredBy({ setTo: 'App-Server 1.0' })); // change value of X-Powered-By header to given value
    app.use(helmet.noCache({ noEtag: true })); // set Cache-Control header
    app.use(helmet.noSniff()); // set X-Content-Type-Options header
    app.use(helmet.frameguard()); // set X-Frame-Options header
    app.use(helmet.xssFilter()); // set X-XSS-Protection header

    // This must be before passport initializing
    app.use(cors({ origin: true }),express.static(`${__dirname}/../public`));


    const cookieVar = {
        secure: global.config.isHTTPSessionSecure, // if site is https then must be true otherwise must be false
        maxAge: 240000 * 60, /* Session expires in 4 hour */
        httpOnly: true, // Mitigate XSS, cookies are not accessible from javascript
        path : '/',
        //domain: 'testingserver.com',
    }
    if(process.env.CommonDomainName != "NO")
        cookieVar.domain =  process.env.CommonDomainName;

    const redis   = require("redis");
    const redisStore = require('connect-redis')(session);
    const redisClient = redis.createClient(
        (process.env.REDIS_URL)?
        { url: global.config.REDIS_URL }:
        {host: process.env.REDIS_HOSTNAME,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD});
    app.use(session({
        name: 'Digishares-387674',
        secret: global.config.SESSION_SECRET,
        store: new redisStore({client: redisClient, ttl : 260}),
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: cookieVar
    }));
    global.config.redisClient = redisClient;

    app.use(hpp());


    //app.use(bodyParser.json());
    //app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({limit: '100mb', strict: false, verify: rawBodySaver}));
    app.use(bodyParser.urlencoded({limit: global.config.max_file_upload_size, extended: false}));


    //  ---------------------------------------------------------------------------------------------
    //  google cloud storage setup
    //  ---------------------------------------------------------------------------------------------

    const gcsFilename = 'ds-sa.json';
    fs.access(gcsFilename,(err,)=>{
        if(err){
            if (!process.env.GCS_SA) {
                logger.error(`GCS Service Account json in base64 not provided`);
            } else {
                try {
                    const buff = Buffer.from(process.env.GCS_SA, 'base64');
                    fs.writeFile(gcsFilename, buff, (writeError) => {
                        if (writeError)
                            logger.error(`${writeError} - occured while writing to ds-sa.json`);
                    });
                } catch (writeBlockError){
                    logger.error(`${writeBlockError} - occured in write ds-sa.json block`);
                }
            }
        }
    });

    //  ---------------------------------------------------------------------------------------------
    //  Passport settings
    //  ---------------------------------------------------------------------------------------------
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, JSON.stringify(user));
    });
    passport.deserializeUser((user, done) => {
        done(null, JSON.parse(user));
    });

    //  ---------------------------------------------------------------------------------------------
    //  Admin user login
    //  ---------------------------------------------------------------------------------------------

    //  ---------------------------------------------------------------------------------------------
    //  Investor user login
    //  ---------------------------------------------------------------------------------------------
    passport.use('investorlocal', new LocalStrategy({
        usernameField: 'iusername',
        passwordField: 'ipassword',
        passReqToCallback: true, // passback entire req to call back
    }, ((req, username, password, done) => {
          if (!username || !password) {
              return done(null, false, req.flash('UserMessage1', 'All fields are required.'));
          }

          if(username.length > 70 || password.length > 30) {
            return done(null, false, req.flash('UserMessage1', 'Something gone wrong'));
         }

          function getInvestorRecord(callback) {
              let stmt = `select * from investor i, investorsto s where i.id = s.investorid and i.email = ? and s.stoid = ${global.config.stos[req.hostname].stoid}`;

              mysql.executeSQLStatement(stmt, [username]).then((rows) => {
                    if (!rows.length) {
                        return done(null, false, req.flash('UserMessage1', 'Invalid username or password'));
                    }

                    // should investor record can be enabled or disbaled ?
                    if (rows[0].isActive === 0) {
                        return done(null, false, req.flash('UserMessage1', 'Account blocked. Please contact admin'));
                    }

                    const encPassword = common.getSHA256Hash(password);
                    const dbPassword = rows[0].Password;

                    if (!(dbPassword === encPassword)) {
                        if (req.session.loginAttempts == null) req.session.loginAttempts = {};

                        if (req.session.loginAttempts[rows[0].email] != null) {
                            req.session.loginAttempts[rows[0].email] = req.session.loginAttempts[rows[0].email] + 1;
                            if (req.session.loginAttempts[rows[0].email] > global.config.investorInvalidLoginAttempts) {
                                req.session.loginAttempts[rows[0].email] = 0;
                                const stmt = 'Update investor set isActive = 0 where email = ?';
                                mysql.executeSQLStatement(stmt, [rows[0].email]).then(() => done(null, false, req.flash('UserMessage1', 'Multiple incorrect login attempts detected. This account has been blocked'))).catch((error) => {
                                    logger.error(`${error.toString()} - Error occured in server.js passportInvestor getInvestorRecord`);
                                });
                            }
                        } else { req.session.loginAttempts[rows[0].email] = 1; }

                        return done(null, false, req.flash('UserMessage1', 'Invalid username or password'));
                    }


                    mysql.executeSQLStatement("select s.id, s.title, s.logo, i.KYCCurrentStatus, s.stolink from stos s, investorsto i where s.id = i.stoid and investorid = ?;", [rows[0].ID]).then((stoRows) => {

                            const investorSTOs = [];
                            stoRows.forEach((obj) => {
                                investorSTOs.push(
                                    {
                                        id: obj.id,
                                        title: obj.title,
                                        logo: obj.logo,
                                        KYCCurrentStatus: obj.KYCCurrentStatus,
                                        stolink: obj.stolink
                                    }
                                );
                            });



                            req.session.regenerate((err) => { // regenerate session to prevent session hijacking
                                if (!err) {
                                    const SessionUser = {};
                                    SessionUser.ID = rows[0].ID;

                                    if (rows[0].FirstName.length > 20)
                                        SessionUser.UserName = rows[0].FirstName.substring(0, 20) + "..."
                                    else
                                        SessionUser.UserName = rows[0].FirstName;

                                    SessionUser.investorSTOs = investorSTOs;

                                    req.session._ip = req.ip;
                                    req.session._ua = req.headers['user-agent'];

                                    if( rows[0].twofactorenable == 1 ) {
                                            const cod = Math.floor(Math.random() * 9999 + 1000);
                                            SessionUser.AuthCode = cod;

                                        const stoEmailTexts = emailTextsController.default.globalEmailTexts(global.config.stos[req.hostname].stoid);
                                        if (!stoEmailTexts) throw new Error(`Email texts not found for twoFactorAuthentication`);

                                        let txtEmail = emailTextsController.format(stoEmailTexts.twoFactorAuthentication.Line1, {
                                            username: `${rows[0].FirstName} ${rows[0].LastName}`,
                                            code: cod,
                                        });
                                        txtEmail += '<br /><br />';
                                        txtEmail += getSTOFromConfig(global.config.stos[req.hostname].stoid).emailFooter;
                                            // let txtEmail = `Dear ${rows[0].FirstName} ${rows[0].LastName}`;
                                            // txtEmail += '<br /><br />';
                                            // txtEmail += emailTexts.twoFactorAuthentication.Line1;
                                            // txtEmail += '<br /><br />Your Code &nbsp;&nbsp;&nbsp; <b>' + cod + '</b><br /><br />';
                                            // txtEmail += global.config.stos[req.hostname].emailFooter;
                                            common.sendEmail(req.hostname, rows[0].email, emailTexts.twoFactorAuthentication.Subject, txtEmail, []).then(() => {
                                                callback(null, SessionUser);
                                            }, (err) => {
                                                logger.error(`${err} ${err.message} - Error occured sending email`);
                                                callback(null, SessionUser);
                                            });
                                    } else {
                                        SessionUser.AuthCode = 0;
                                        callback(null, SessionUser);
                                    }

                                }
                            });
                    });

              }).catch(error => done(req.flash('UserMessage1', `${error} - Some uidentified error occured. Contact support`)));
          }
          async.waterfall([
            getInvestorRecord,
          ], (err, SessionUser) => {
              req.session.userType = 'investor';
              req.session.user = SessionUser;
              return done(null, SessionUser);
          });
    })));
    /*passportInvestor.serializeUser((user, done) => {
        done(null, JSON.stringify(user));
    });
    passportInvestor.deserializeUser((user, done) => {
        done(null, JSON.parse(user));
    });*/
    app.get('/debug', (req, res) => {
        const revision = global.revision
        const revisionFull = global.revisionFull

        res.json({revision, revisionFull})
    })

    app.get('/', (req, res) => res.redirect('/login'));
    app.get('/login', (req, res) => {

        if(process.env.ADMIN_ONLY){
            res.redirect('/adminlogin');
        } else if(global.config.SingleSignInEnabled == 1) {
            res.redirect(global.config.SingleSignInLoginURL);
        } else if(global.config.isSaaS) {
            res.redirect('/platform/adminlogin');
        } else if(VersionRedirect.toV2(req, res)) {
           // eslint-disable-next-line no-useless-return
           return;
        } else {
            try {
                /** Custom layout can be activated either by string or json value */
                const layout = global.config.LoginScreenLayout;
                if (layout === 'login-big' || layout?.name === 'login-big') {
                    res.render("investors/login-big", {
                        logo: global.config.stos[req.hostname].logo,
                        SiteParameter_PageTitle:
                            global.config.stos[req.hostname].title,
                        UserMessage: req.flash("UserMessage1"),
                        favicon: common.getFevIcon(req),
                        /* Layout-specific optional json parameters */
                        bgGradient1: layout?.bgGradient1,
                        bgGradient2: layout?.bgGradient2,
                        greetingHeading: layout?.greetingHeading,
                        greetingSubHeading: layout?.greetingSubHeading,
                        greetingTextColor: layout?.greetingTextColor,
                        noLogo: layout?.noLogo,
                    });
                } else {
                    res.render("investors/login", {
                        logo: global.config.stos[req.hostname].logo,
                        SiteParameter_PageTitle:
                            global.config.stos[req.hostname].title,
                        UserMessage: req.flash("UserMessage1"),
                        favicon: common.getFevIcon(req),
                    });
                }
            } catch (e) {
                logger.error("/login - " + e.toString());
                res.redirect("/error");
            }
        }
    });

    app.get('/logout', (req, res) => {
        const investorID = req.session.user.ID;
        res.cookie('locale', null, { maxAge: 0, httpOnly: true });
        req.session.destroy();
        req.logout();

        try {
            const logDescription = `Investor Log Out. Investor.ID: ${investorID}`;
            const sql = `
                INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);
            `;
            mysql.executeSQLStatement(sql, [
                -1, -1, logDescription, investorID, 24, -1
            ]).then(() => {
              logger.info(`Investor Log Out. Investor.ID: ${investorID} STO ID: -1 User ID: -1 Investor ID: ${investorID} Activity Type ID: 24 Rec ID: -1`);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error in INSERT INTO logs`);
            });
        } catch (error) {
            logger.error(`${error} - Error occurred in logout`);
        }

        if(global.config.SSOModeEnabled == 1) {
            res.redirect(global.config.SSORedirectFrontEnd);
        } else {
            if(global.config.SingleSignInEnabled == 1)
                res.redirect(global.config.SingleSignInLoginURL);
            else
               res.redirect('/login');
        }
    });

    app.post('/signin', passport.authenticate('investorlocal', {
        // successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true,
    }), (req, res, info) => {
        try {
            const logDescription = `Investor Log In. Investor.ID: ${req.session.user.ID}`;
            const sql = `
                INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);
            `;
            mysql.executeSQLStatement(sql, [
                -1, -1, logDescription, req.session.user.ID, 19, -1
            ]).then(() => {
              logger.info(`Investor Log In. Investor.ID: ${req.session.user.ID} STO ID: -1 User ID: -1 Investor ID: ${req.session.user.ID} Activity Type ID: 19 Rec ID: -1`);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error in INSERT INTO logs`);
            });
        } catch (error) {
            logger.error(`${error} - Error occurred in login`);
        }
        res.redirect('/dashboard');
        // logger.info('Function should not execute');
    });

    //  ---------------------------------------------------------------------------------------------




    //  ---------------------------------------------------------------------------------------------
    //  common user login
    //  ---------------------------------------------------------------------------------------------

    passport.use('commonlocal', new LocalStrategy({
        usernameField: 'iusername',
        passwordField: 'ipassword',
        passReqToCallback: true, // passback entire req to call back
    }, ((req, username, password, done) => {
          if (!username || !password) {
              return done(null, false, req.flash('UserMessage1', 'All fields are required.'));
          }

          if(username.length > 70 || password.length > 30) {
            return done(null, false, req.flash('UserMessage1', 'Something gone wrong'));
         }

          function getInvestorRecord(callback) {
              let stmt = `select * from investor i, investorsto isto where i.ID = isto.investorid and i.email = ?`;
              mysql.executeSQLStatement(stmt, [username]).then((rows) => {
                    if (!rows.length) {
                        return done(null, false, req.flash('UserMessage1', 'Invalid username or password'));
                    }

                    const encPassword = common.getSHA256Hash(password);
                    const dbPassword = rows[0].Password;

                    if (! (dbPassword === encPassword)) {
                            if (! (dbPassword === password)) {
                                return done(null, false, req.flash('UserMessage1', 'Invalid username or password'));
                            }
                    }

                    // should investor record can be enabled or disbaled ?
                  const bannedStos = [-1];
                  if (rows.length === 1 && rows[0].isActive === 0) {
                      return done(null, false, req.flash('UserMessage1', 'Account blocked. Please contact admin'));
                  } else {
                      rows.forEach((row) => {
                          if (row.isActive === 0) {
                              bannedStos.push(row.stoid);
                          }
                      })
                  }
                  if (bannedStos.length - 1 >= rows.length) {
                      return done(null, false, req.flash('UserMessage1', 'Account blocked. Please contact admin'));
                  }
                  const stoStmt = `select s.id, s.title, s.logo, i.KYCCurrentStatus, s.stolinkfull 
                                    from stos s, investorsto i 
                                    where s.id = i.stoid 
                                        and investorid = ? 
                                        and i.stoid NOT IN (?);`;
                    mysql.executeSQLStatement(stoStmt, [rows[0].ID, bannedStos])
                        .then((stoRows) => {
                            const investorSTOs = [];
                            stoRows.forEach((obj) => {
                                if(obj.id == 0) {
                                    if(stoRows.length == 1)    //only allow default site if there is no other site
                                        investorSTOs.push({
                                             id: obj.id,
                                            title: obj.title,
                                            logo: obj.logo,
                                            KYCCurrentStatus: obj.KYCCurrentStatus,
                                            stolinkfull: obj.stolinkfull
                                        });
                                } else
                                    investorSTOs.push(
                                        {   id: obj.id,
                                            title: obj.title,
                                            logo: obj.logo,
                                            KYCCurrentStatus: obj.KYCCurrentStatus,
                                            stolinkfull: obj.stolinkfull
                                        }
                                    );
                            });


                            req.session.regenerate((err) => { // regenerate session to prevent session hijacking
                                if (!err) {
                                    const SessionUser = {};
                                    SessionUser.ID = rows[0].ID;

                                    if (rows[0].FirstName.length > 20)
                                        SessionUser.UserName = rows[0].FirstName.substring(0, 20) + "..."
                                    else
                                        SessionUser.UserName = rows[0].FirstName;

                                    SessionUser.investorSTOs = investorSTOs;

                                    req.session._ip = req.ip;
                                    req.session._ua = req.headers['user-agent'];

                                    if( rows[0].twofactorenable == 1 ) {
                                            const cod = Math.floor(Math.random() * 9999 + 1000);
                                            SessionUser.AuthCode = cod;
                                        const stoEmailTexts = emailTextsController.default.globalEmailTexts(global.config.stos[req.hostname].stoid);
                                        if (!stoEmailTexts) throw new Error(`Email texts not found for twoFactorAuthentication`);

                                        let txtEmail = emailTextsController.format(stoEmailTexts.twoFactorAuthentication.Line1, {
                                            username: `${rows[0].FirstName} ${rows[0].LastName}`,
                                            code: cod,
                                        });
                                        txtEmail += '<br /><br />';
                                        txtEmail += getSTOFromConfig(global.config.stos[req.hostname].stoid).emailFooter;

                                            // let txtEmail = `Dear ${rows[0].FirstName} ${rows[0].LastName}`;
                                            // txtEmail += '<br /><br />';
                                            // txtEmail += emailTexts.twoFactorAuthentication.Line1;
                                            // txtEmail += '<br /><br />Your Code &nbsp;&nbsp;&nbsp; <b>' + cod + '</b><br /><br />';
                                            // txtEmail += global.config.stos[req.hostname].emailFooter;

                                            common.sendEmail(req.hostname, rows[0].email, emailTexts.twoFactorAuthentication.Subject, txtEmail, []).then(() => {
                                                callback(null, SessionUser);
                                            }, (err) => {
                                                logger.error(`${err.message} - Error occured in common user login`);
                                                callback(null, SessionUser);
                                            });
                                    } else {
                                        SessionUser.AuthCode = 0;
                                        callback(null, SessionUser);
                                    }
                                }
                            });
                    });

              }).catch(error => done(req.flash('UserMessage1', `${error} - Some uidentified error occured. Contact support`)));
          }
          async.waterfall([
            getInvestorRecord,
          ], (err, SessionUser) => {
              req.session.userType = 'investor';
              req.session.user = SessionUser;
              return done(null, SessionUser);
          });
    })));

    app.get('/platform', (req, res) => res.redirect('/platform/login'));
    app.get('/platform/login', (req, res) => {

            try {

                /** Custom layout can be activated either by string or json value */
                const layout = global.config.LoginScreenLayout;
                if (layout === 'login-big' || layout?.name === 'login-big') {

                    res.render("investors/login-big", {
                        logo: Object.values(global.config.stos)[0].logo,
                        SiteParameter_PageTitle:
                        Object.values(global.config.stos)[0].title,
                        UserMessage: req.flash("UserMessage1"),
                        favicon: common.getFevIcon(req),
                        /* Layout-specific optional json parameters */
                        bgGradient1: layout?.bgGradient1,
                        bgGradient2: layout?.bgGradient2,
                        greetingHeading: layout?.greetingHeading,
                        greetingSubHeading: layout?.greetingSubHeading,
                        greetingTextColor: layout?.greetingTextColor,
                        noLogo: layout?.noLogo,
                    });

                } else {

                    res.render('investors/logincommon', {
                        logo: Object.values(global.config.stos)[0].logo,
                        SiteParameter_PageTitle: Object.values(global.config.stos)[0].title,
                        CustomPlatformCSSStyles: global.config.CustomPlatformCSSStyles,
                        UserMessage: req.flash('UserMessage1'),
                        favicon: common.getFevIcon(req)
                    });

                }



                /*res.render('investors/logincommon', {
                    logo: global.config.stos[req.hostname].logo,
                    SiteParameter_PageTitle: global.config.stos[req.hostname].title,
                    CustomPlatformCSSStyles: global.config.CustomPlatformCSSStyles,
                    UserMessage: req.flash('UserMessage1'),
                    favicon: common.getFevIcon(req)
                });*/
            } catch (e) {
                logger.error("/login - " + e.toString());
                res.redirect("/error");
            }

    });

    app.get('/platform/logout', (req, res) => {
        const investorID = req.session.user.ID;
        res.cookie('locale', null, { maxAge: 0, httpOnly: true });
        req.session.destroy();
        req.logout();

        try {
            const logDescription = `Investor Log Out. Investor.ID: ${investorID}`;
            const sql = `
                INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);
            `;
            mysql.executeSQLStatement(sql, [
                -1, -1, logDescription, investorID, 24, -1
            ]).then(() => {
              logger.info(`Investor Log Out. Investor.ID: ${investorID} STO ID: -1 User ID: -1 Investor ID: ${investorID} Activity Type ID: 24 Rec ID: -1`);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error in INSERT INTO logs`);
            });
        } catch (error) {
            logger.error(`${error} - Error occurred in logout`);
        }

        if(global.config.SSOModeEnabled == 1) {
            res.redirect(global.config.SSORedirectFrontEnd);
        } else {
            if(global.config.SingleSignInEnabled == 1)
                res.redirect(global.config.SingleSignInLoginURL);
            else
               res.redirect('/platform/login');
        }
    });

    app.post('/platform/signin', passport.authenticate('commonlocal', {
        // successRedirect: '/commonredirect?propertyId=0',
        failureRedirect: '/platform/login',
        failureFlash: true,
    }), (req, res, info) => {
        try {
            const logDescription = `Investor Log In. Investor.ID: ${req.session.user.ID}`;
            const sql = `
                INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);
            `;
            mysql.executeSQLStatement(sql, [
                -1, -1, logDescription, req.session.user.ID, 19, -1
            ]).then(() => {
              logger.info(`Investor Log In. Investor.ID: ${req.session.user.ID} STO ID: -1 User ID: -1 Investor ID: ${req.session.user.ID} Activity Type ID: 19 Rec ID: -1`);
            }).catch((error) => {
                common.handleError(req, res, `${error.message} Error in INSERT INTO logs`);
            });
        } catch (error) {
            logger.error(`${error} - Error occurred in login`);
        }
        res.redirect('/commonredirect?propertyId=0');
        // logger.info('Function should not execute');
    });

    //Direct Cognito single signin login
    app.post('/ssologin', (req, res,next) => {
        const params = {};


        if( validator.isEmail(req.query.email) )  {
                async.waterfall([
                     function getDatabaseInformation(callback) {
                         if(  typeof(global.config.CognitoJWKS) === 'undefined' ) {
                            const poolData = {
                                UserPoolId: global.config.CognitoUserPoolId,
                                ClientId: global.config.CognitoClientId,
                            };
                            const pool_region = global.config.CognitoPool_region;
                            const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

                               request(
                                 {
                                   url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
                                   json: true,
                                 },
                                 function (error, response, body) {
                                   if (!error && response.statusCode === 200) {
                                     global.config.CognitoJWKS = body;
                                     callback(null);
                                   } else {
                                     logger.error(
                                       `${error} - SSO login - Link access error Error occured in server ssologin 2`
                                     );
                                     res.redirect(
                                       global.config.SSORedirectFrontEnd
                                     );
                                   }
                                 }
                               );

                         } else {
                             callback(null);
                         }
                     },
                     function checkToken(callback) {
                            const tokenData = req.body["accessToken"];
                            const refreshTokenData = req.body["refreshToken"];
                            var propertyId = 0;
                            if( req.query["propertyId"]  != null ) {
                                if( ! isNaN(req.query["propertyId"]))
                                    propertyId = req.query["propertyId"];
                            }

                            common.validateCognitoToken(tokenData, refreshTokenData, req.query.email, req).then((result) => {

                                      let stmt = `select * from investor where email = ?`;
                                      mysql.executeSQLStatement(stmt, [req.query.email]).then((rows) => {

                                            if(rows.length == 0) {
                                                    req.session.firstName = req.query.firstName;
                                                    req.session.lastName = req.query.lastName;
                                                    req.session.email = req.query.email;
                                                    req.session.XToken = tokenData;
                                                    req.session.refreshXToken = result.refresh;

                                                    res.redirect("/investortypeselect");
                                            } else {

                                                    mysql.executeSQLStatement("select s.id, s.title, s.logo, i.KYCCurrentStatus, s.stolinkfull from stos s, investorsto i where s.id = i.stoid and investorid = ?;", [rows[0].ID]).then((stoRows) => {

                                                                    const investorSTOs = [];
                                                                    stoRows.forEach((obj) => {
                                                                        if(obj.id == 0) {
                                                                            if(stoRows.length == 1)    //only allow default project if there is no other project
                                                                                investorSTOs.push(
                                                                                    {   id: obj.id,
                                                                                        title: obj.title,
                                                                                        logo: obj.logo,
                                                                                        KYCCurrentStatus: obj.KYCCurrentStatus,
                                                                                        stolinkfull: obj.stolinkfull
                                                                                    }
                                                                                );
                                                                        } else
                                                                            investorSTOs.push(
                                                                                {   id: obj.id,
                                                                                    title: obj.title,
                                                                                    logo: obj.logo,
                                                                                    KYCCurrentStatus: obj.KYCCurrentStatus,
                                                                                    stolinkfull: obj.stolinkfull
                                                                                }
                                                                            );
                                                                     });

                                                                    req.session.regenerate((err) => { // regenerate session to prevent session hijacking
                                                                            const SessionUser = {};
                                                                            SessionUser.ID = rows[0].ID;

                                                                            if (rows[0].FirstName.length > 20)
                                                                                SessionUser.UserName = rows[0].FirstName.substring(0, 20) + "..."
                                                                            else
                                                                                SessionUser.UserName = rows[0].FirstName;

                                                                            SessionUser.email = rows[0].email;
                                                                            SessionUser.investorSTOs = investorSTOs;
                                                                            SessionUser.XToken = result.token;
                                                                            SessionUser.refreshXToken = result.refresh;

                                                                            SessionUser.AuthCode = 0;
                                                                            req.session._ip = req.ip;
                                                                            req.session._ua = req.headers['user-agent'];
                                                                            req.session.userType = 'investor';
                                                                            req.session.user = SessionUser;

                                                                            // login is Passport function
                                                                            req.login(SessionUser, (erre) => {
                                                                                        if(err) {
                                                                                            logger.error(`${erre} - Error occured in login`);
                                                                                            return next(err);
                                                                                        }

                                                                                        res.redirect("/commonredirect?propertyId=" +  propertyId);
                                                                            });
                                                                    });
                                                    });
                                            }

                                      }).catch(error => {
                                             logger.error(`${error} - Error occured in server ssologin 1`);
                                             res.redirect(global.config.SSORedirectFrontEnd);
                                      });
                             }).catch((error) => {
                                    //redirect user back as his token has expired
                                    res.redirect(global.config.SSORedirectFrontEnd);
                             });

                     }
                ]);
        } else {
            logger.info("INvalid email - SSO Login for email " + req.query.email );
            res.redirect("/logout");
        }

    });
    app.get('/investorsessionlogin', (req, res) => {

          let stmt = `select * from investor where email = ?`;
          mysql.executeSQLStatement(stmt, [req.session.email]).then((rows) => {

                if(rows.length == 0) {
                        logger.error(`Error occured in  server investorsessionlogin investor record must be found`);
                        res.redirect(global.config.SSORedirectFrontEnd);
                } else {

                        mysql.executeSQLStatement("select s.id, s.title, s.logo, i.KYCCurrentStatus, s.stolinkfull from stos s, investorsto i where s.id = i.stoid and investorid = ?;", [rows[0].ID]).then((stoRows) => {


                                        const investorSTOs = [];
                                        stoRows.forEach((obj) => {
                                            if(obj.id == 0) {
                                                if(stoRows.length == 1)    //only allow default site if there is no other site
                                                    investorSTOs.push({id: obj.id, title: obj.title, logo: obj.logo});
                                            } else
                                                investorSTOs.push(
                                                    {   id: obj.id,
                                                        title: obj.title,
                                                        logo: obj.logo,
                                                        KYCCurrentStatus: obj.KYCCurrentStatus,
                                                        stolinkfull: obj.stolinkfull
                                                    }
                                                );
                                         });



                                        const xtokentemp = req.session.XToken;
                                        const xtokenrefreshtemp = req.session.refreshXToken;


                                        req.session.regenerate((err) => { // regenerate session to prevent session hijacking
                                                const SessionUser = {};
                                                SessionUser.ID = rows[0].ID;

                                                //TODO  check this as i think this is also needed
                                                SessionUser.XToken = xtokentemp;
                                                SessionUser.refreshXToken = xtokenrefreshtemp;

                                                if (rows[0].FirstName.length > 20)
                                                    SessionUser.UserName = rows[0].FirstName.substring(0, 20) + "..."
                                                else
                                                    SessionUser.UserName = rows[0].FirstName;

                                                SessionUser.investorSTOs = investorSTOs;
                                                // user XToken     refreshXToken   are already in session

                                                SessionUser.AuthCode = 0;
                                                req.session._ip = req.ip;
                                                req.session._ua = req.headers['user-agent'];
                                                req.session.userType = 'investor';
                                                req.session.user = SessionUser;

                                                //login is Passport function
                                                req.login(SessionUser, function(err){
                                                    if(err) return next(err);

                                                    res.redirect("/commonredirect");
                                                });
                                        });
                        });
                }

    })
    });
    //  ---------------------------------------------------------------------------------------------




    //  ---------------------------------------------------------------------------------------------
    //  platform admin login
    //  ---------------------------------------------------------------------------------------------
    //  ---------------------------------------------------------------------------------------------




    //  ---------------------------------------------------------------------------------------------
    //  broker user login
    //  ---------------------------------------------------------------------------------------------

    passport.use('broker', new LocalStrategy({
        usernameField: 'iusername',
        passwordField: 'ipassword',
        passReqToCallback: true, // passback entire req to call back
    }, ((req, username, password, done) => {
          if (!username || !password) {
              return done(null, false, req.flash('UserMessage1', 'All fields are required.'));
          }

          if(username.length > 70 || password.length > 30) {
            return done(null, false, req.flash('UserMessage1', 'Something gone wrong'));
         }

          function getInvestorRecord(callback) {
              const encPassword = common.getSHA256Hash(password);
              let stmt = `select * from brokers where username = ? and password = ?`;

              mysql.executeSQLStatement(stmt, [username, encPassword]).then((rows) => {

                    if (!rows.length) {
                        return done(null, false, req.flash('UserMessage1', 'Invalid username or password'));
                    }

                    // should investor record can be enabled or disbaled ?
                    if (rows[0].isActive === 0) {
                        return done(null, false, req.flash('UserMessage1', 'Account blocked. Please contact admin'));
                    }

                    req.session.regenerate((err) => { // regenerate session to prevent session hijacking
                                if (!err) {
                                    const SessionUser = {};
                                    SessionUser.ID = rows[0].ID;
                                    SessionUser.UserName = rows[0].FirstName + " " + rows[0].LastName;

                                    req.session._ip = req.ip;
                                    req.session._ua = req.headers['user-agent'];

                                    if( rows[0].twofactorenable == 1 ) {
                                            const cod = Math.floor(Math.random() * 9999 + 1000);
                                            SessionUser.AuthCode = cod;

                                        const stoEmailTexts = emailTextsController.default.globalEmailTexts(global.config.stos[req.hostname].stoid);
                                        if (!stoEmailTexts) throw new Error(`Email texts not found for twoFactorAuthentication`);

                                        let txtEmail = emailTextsController.format(stoEmailTexts.twoFactorAuthentication.Line1, {
                                            username: `${rows[0].FirstName} ${rows[0].LastName}`,
                                            code: cod,
                                        });
                                        txtEmail += '<br /><br />';
                                        txtEmail += getSTOFromConfig(global.config.stos[req.hostname].stoid).emailFooter;


                                            // let txtEmail = `Dear ${rows[0].FirstName} ${rows[0].LastName}`;
                                            // txtEmail += '<br /><br />';
                                            // txtEmail += emailTexts.twoFactorAuthentication.Line1;
                                            // txtEmail += '<br /><br />Your Code &nbsp;&nbsp;&nbsp; <b>' + cod + '</b><br /><br />';
                                            // txtEmail += global.config.stos[req.hostname].emailFooter;

                                            common.sendEmail(req.hostname, rows[0].email, emailTexts.twoFactorAuthentication.Subject, txtEmail, []).then(() => {
                                                callback(null, SessionUser);
                                            }, (err) => {
                                                logger.error(`${err.message} - Error occured in common user login`);
                                                callback(null, SessionUser);
                                            });
                                    } else {
                                        SessionUser.AuthCode = 0;
                                        callback(null, SessionUser);
                                    }
                                }
                            });

              }).catch(error => done(req.flash('UserMessage1', `${error} - Some uidentified error occured. Contact support`)));
          }
          async.waterfall([
            getInvestorRecord,
          ], (err, SessionUser) => {
              req.session.userType = 'broker';
              req.session.user = SessionUser;
              return done(null, SessionUser);
          });
    })));

    app.get('/broker', (req, res) => res.redirect('/broker/login'));
    app.get('/broker/login', (req, res) => {
        try {
            res.render('broker/login', {
                logo: global.config.stos[req.hostname].logo,
                SiteParameter_PageTitle: global.config.stos[req.hostname].title,
                UserMessage: req.flash('UserMessage1'),
                favicon: common.getFevIcon(req)
            });
        } catch (e) {
            logger.error("/login - " + e.toString());
            res.redirect("/error");
        }
    });
    app.get('/broker/logout', (req, res) => {
        res.cookie('locale', null, { maxAge: 0, httpOnly: true });
        req.session.destroy();
        req.logout();
        res.redirect('/broker/login');
    });
    app.post('/broker/signin', passport.authenticate('broker', {
        successRedirect: '/broker/dashboard',
        failureRedirect: '/broker/login',
        failureFlash: true,
    }), (req, res, info) => {
        logger.info('Function should not execute');
    });
    //  ---------------------------------------------------------------------------------------------





    //---------------------------------------------------------------------------------------------------------------
    // Prevent CSRF (Cross Site Request Forgery)
    // this has to be after session configuration
    app.use(cookieParser(global.config.COOKIE_PARSERSECRET));
    const csrf = csurf({ cookie: true });
    app.use((req, res, next) => {
        // DO NOT REMOVE OR API STUFF BREAKS
        if (req.path.startsWith('/api/')) { // Disable CSRF protection on API endpoints
           return next();
        }
        csrf(req, res, next);
    });      //this must be done after above cookieParser if cookie is true
    //---------------------------------------------------------------------------------------------------------------



    i18n.configure({
      locales: ['en', 'gr', 'es', 'ro', 'ru'],
      defaultLocale: 'en',
      cookie: 'locale',
      queryParameter: 'lang',
      directory: path.join(__dirname + '/../locales'),
      directoryPermissions: '755',
      autoReload: true,
      updateFiles: true
      //api: {
      // '__': '__',  //now req.__ becomes req.__
      // '__n': '__n' //and req.__n can be called as req.__n
      //}
    });
    app.use(i18n.init);
    //Exmaple below
    //<span id="text">{{{__ "Total-Shares"}}}</span>

    //  ---------------------------------------------------------------------------------------------



    //---------------------------------------------------------------------------------------------------------------
    //      handlebars   helpers
    //---------------------------------------------------------------------------------------------------------------
    handlebars.registerHelper('showImageORLink', (url) => {
        if (typeof url !== 'undefined') { // check if variable is undefined  sometime the IDFile section has not been created in KYC record
            const ext = path.extname(url).substring(1);
            let txt = '';

            txt = `<b>Currently uploaded ${ext} file</b> <br /><br />`;
            txt += url;
            return new handlebars.SafeString(txt);
        }
        return new handlebars.SafeString('No file selected');
    });
    handlebars.registerHelper('ifEqual', function ifCountFunction(v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    handlebars.registerHelper('ifGreater', function ifCountFunction(v1, v2, options) {
        if (v1 > v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });
    handlebars.registerHelper('json', (context) => JSON.stringify(context));
    handlebars.registerHelper('jsonParse', (context, propertyName) => JSON.parse(context)[`${propertyName}`]);
    handlebars.registerHelper('localeDate', (context) => new Date(context).toLocaleDateString());
    handlebars.registerHelper('currencySymbol', (currency, options) => {
        return new handlebars.SafeString(  common.getCurrentcySymbol(currency)  );
    });
    handlebars.registerHelper('addTovalue', function (v1, v2) {
        return v1 + v2;
    });
    handlebars.registerHelper('subtractTovalue', function (v1, v2) {
        return v1 - v2;
    });
    handlebars.registerHelper('multiplyTovalue', function (v1, v2) {
        return v1 * v2;
    });
    handlebars.registerHelper('ifIn', function(elem, list, options) {
      if(list?.indexOf(elem) > -1) {
        return options.fn(this);
      }
      return options.inverse(this);
    });
    handlebars.registerHelper({
        /*{{#if (or
                (eq section1 "foo")
                (ne section2 "bar"))}}
        .. content
        {{/if}}*/

        eq: function (v1, v2) {
            return v1 === v2;
        },
        ne: function (v1, v2) {
            return v1 !== v2;
        },
        lt: function (v1, v2) {
            return v1 < v2;
        },
        gt: function (v1, v2) {
            return v1 > v2;
        },
        lte: function (v1, v2) {
            return v1 <= v2;
        },
        gte: function (v1, v2) {
            return v1 >= v2;
        },
        and: function () {
            return Array.prototype.slice.call(arguments).every(Boolean);
        },
        or: function () {
            return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
        }
    });
    handlebars.registerHelper('roundNumber', function (amount, zeroes) {
        if (Number.isNaN(+amount)) return NaN;
        amount = +amount;
        zeroes = +zeroes;
        if (!zeroes || Number.isNaN(zeroes) || zeroes < 0) zeroes = 2;
        const multiplier = Math.pow(10, zeroes);
        return (amount * multiplier / multiplier).toFixed(zeroes);
    });
    handlebars.registerHelper('localeNumber', function (value, locale) {
        if (!locale) locale = 'en-US';
        return (+amount).toLocaleString(locale);
    });

    handlebars.registerHelper('localeCurrency', function (value, locale, currency) {
        if (!locale) locale = 'en-US';
        if (!currency) currency = 'USD';
        return (+amount).toLocaleString(locale, { style: 'currency', currency });
    });
    handlebars.registerHelper('numberFormat', function (value, options) {
        // Helper parameters
        //var dl = options.hash['decimalLength'] || 2;
        var dl = 0
        if(options.hash['decimalLength'] == "-") {
            dl = global.config.BlockchainBalanceInFractions
        }
        else
        if(isNaN(options.hash['decimalLength']) && global.config[options.hash['decimalLength']])
        {
            dl = global.config[options.hash['decimalLength']];
        }
        else {
            dl = options.hash['decimalLength'];
        }

        var ts = options.hash['thousandsSep'] || global.config.NumberSeparatorCharacter;
        var ds = options.hash['decimalSep'] || '.';

        // Parse to float
        var value = parseFloat(value);

        // The regex
        var re = '\\d(?=(\\d{3})+' + (dl > 0 ? '\\D' : '$') + ')';

        // Formats the number with the decimals
        var num = value.toFixed(Math.max(0, ~~dl));

        // Returns the formatted number
        return (ds ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), '$&' + ts);
    });
    handlebars.registerHelper('decimal', (value) => {
        const n = `${value}`;
        return parseFloat(n);
    });
    handlebars.registerHelper('textBreakLinesEnters', function(text) {
        text = handlebars.Utils.escapeExpression(text);
        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return new handlebars.SafeString(text);
    });
    handlebars.registerHelper('grouped_each', function(every, context, options) {
        var out = "", subcontext = [], i;
        if (context && context.length > 0) {
            for (i = 0; i < context.length; i++) {
                if (i > 0 && i % every === 0) {
                    out += options.fn(subcontext);
                    subcontext = [];
                }
                subcontext.push(context[i]);
            }
            out += options.fn(subcontext);
        }
        return out;
    });      //this will group records in #  like   {{#grouped_each 3 records}}
    handlebars.registerHelper("setVariable", function(varName, varValue, options) {
        options.data.root[varName] = varValue;
    });
    handlebars.registerHelper('ifArray', (val, options) => {
        if (Array.isArray(val)) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    // For admin panel KYC strings
    handlebars.registerHelper('__', function() { return i18n.__.apply(this, arguments); });
    handlebars.registerHelper('kyc', (keyRaw) =>
        i18n.__(`kyc-${keyRaw}`) ?? keyRaw);
    //seems like following i18n are not required
    //handlebars.registerHelper('__', function() { return i18n.__.apply(this, arguments); });     //i18n
    //handlebars.registerHelper('__n', function() { return i18n.__n.apply(this, arguments); });   //i18n
    //---------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------
    app.set('views', `${__dirname}/../views`);
    app.engine('hbs', cons.handlebars);
    app.set('view engine', 'hbs');

    // Set cache control header to eliminate cookies from cache
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

        res.header('Cache-Control', 'no-cache="Set-Cookie, Set-Cookie2"');
        next();
    });

    const pathLogger = (req, res, next) => {
        console.log(`[${req.method}] ${req.hostname}${req.path}`);
        logger.info(`[${req.method}] ${req.hostname}${req.path}`);
        next();
    }

    global.config.doPathLoggingAdmin = process.env.DO_PATH_LOGGING_ADMIN;
    global.config.doPathLoggingStoAdmin = process.env.DO_PATH_LOGGING_STOADMIN;
    global.config.doPathLoggingInvestorClient = process.env.DO_PATH_LOGGING_INVESTORCLIENT;
    if (global.config.doPathLoggingAdmin === '1') {
        console.log("-- Path logging enabled on /platform/admin");
        app.use('/platform', pathLogger);
    }
    if (global.config.doPathLoggingStoAdmin === '1') {
        console.log("-- Path logging enabled on /admin");
        app.use('/admin', pathLogger);
    }

    app.use('/admin', require('./controllers/index'), require('./controllers/investors'), require('./controllers/sto'));
    app.use('/platform', require('./controllers/admin'));
    app.use('/broker', require('./controllers/broker'));
    if (global.config.doPathLoggingInvestorClient === '1') {
        console.log("-- Path logging enabled on investorClient and etc...");
        app.use(pathLogger);
    }
    app.use(require('./controllers/investorclient'));

    // const { default: mainRouter } = require('./communication/MainRouter');

    app.use(MainRouter);


    // this is default error handling when no error handling has been detected
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        // var stack = new Error().stack;
        logger.error( "----------------------------------------------------------------------------------------" );
        logger.error("occured in STO - " + req.hostname + ", ip - " + req.ip + ", original url - " + req.originalUrl);
        // logger.error( stack ); // the stacktrace would always point to the "new Error()" above
        logger.error(`${err.message} - Default Error handling`);
        logger.error( "----------------------------------------------------------------------------------------" );
        res.redirect('/error');
    });

    // Catch unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
        throw reason; // Uncaught errors are handled below
    })
    process.on('uncaughtException', (err) => {
        console.error(err);
        logger.error('There was an un-catch error - ' + err)
        var stack = new Error().stack
        logger.error( stack )
        process.exit(1) //mandatory (as per the Node docs)
    })

    //CHECK
    require('events').EventEmitter.prototype._maxListeners = 100;

    setInterval(function () {
        const stmt = 'SELECT 1';
        mysql.executeSQLStatement(stmt, []).then(() => {
            //console.log("refreshed");
        })
        .catch((error) => {
            common.handleError(req, null, `${error} - Error occured in setInterval of server class to refresh DB`);
        });

    }, 300000);


    global.config.forkedBulkEmail = fork(__dirname+"/modules/bulkemail.js");
    global.config.forkedBulkEmail.on('message', (msg) => {
      //console.log('Message from Email Server - ', msg);
    });
    global.config.forkedBulkEmail.send({ op: 1, salt: global.config.PASSWORD_SALT });


	global.config.blockchainBackgroundProcess = fork(__dirname+"/modules/blockchainBackground.js");


    global.config.forkedBulkInvestorUpload = fork(__dirname+"/modules/bulkinvestor.js");
    global.config.forkedBulkInvestorUpload.on('message', (msg) => {
        global.config.bulkInvestorUploadProcessStatus = msg.status;
    });


    console.log('Before intitialization and server start');
    mysql.initializeGlobals().then((result) => {
        preStart()
        .catch((error) => {
            console.log(`Pre-start hook failed with error:\n${error}`);
            logger.error(`Pre-start hook failed with error:\n${error}`);
        })
        .then(() => {
            console.log('After intitialization and before server start')

			global.config.blockchainBackgroundProcess.send({ op: 1,  investorInternalWalletProjectSpecific: global.config.investorInternalWalletProjectSpecific, web3Address: global.config.web3Address });

            // MERCURY CRON JOB
            mercuryCronJob.sync()
            setInterval(()=>mercuryCronJob.sync(),1000*60*10)


            const sql = `select * from RavenAssetDeployment where isAssetDeployed = 0`;
            mysql.executeSQLStatement(sql, []).then((result) => {
                if(result.length > 0) {
                    blockchainApi.ravencoinDeployment(result[0]).then((result) => {
                        logger.info("Ravencoin deployment re-started . . .. . ")
                    }).catch((error) => {
                        logger.error("Server.js  error trying to access RavenAssetDeployment")
                    });
                }
            }).catch((error) => {
               logger.error("Server.js  error trying to access RavenAssetDeployment")
            });


            if(global.config.LocalHttpsStart == 1) {

                console.log("Local HTTPs Start")
                https.createServer({
                    key: fs.readFileSync(`${__dirname}/../https.key`),
                    cert: fs.readFileSync(`${__dirname}/../https.cert`)
                }, app).listen(global.config.SERVER_PORT, () => {
                    console.log('Listening...')
                })

            } else {
                app.listen(global.config.SERVER_PORT, () => {
                    console.log('After server started');
                    logger.info(`Server Started. Listening on port ${global.config.SERVER_PORT}`);
                });
            }
        });
    }).catch((error) => {
        console.log('Server not started', { error });
        logger.debug(`${error.toString()} - Error occured starting server `);
    });

} catch (e) {
    console.log("-------------------------------");
    console.log("Error occured during startup in server.js");
    console.log(e.toString());
    console.log("--------------------------------");
}

});

module.exports = app;
