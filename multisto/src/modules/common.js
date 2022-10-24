const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');
const nodemailer = require('nodemailer');
const mainFilename = require('require-main-filename')();
const async = require('async');
const paypal = require('paypal-rest-sdk');
const { v4: uuidv4 } = require('uuid');
const formidable = require('formidable');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const request = require('request');
const docusign = require('docusign-esign');
const logger = require('../logger');
const { default: getSTOFromConfig } = require('../services/getSTOFromConfig');
// const mysql = require("./mysql");    mysql module also require common
require('dotenv').config();

const getTransporter = (_host, _port, _user, _pass) => {
    const isSSL3Enabled = global.config?.SMTP_SSL3 === 1;
    const tls = isSSL3Enabled && {tls: { ciphers:'SSLv3'} };
    const transport = {
        host: _host,
        port: _port,
        secure: !isSSL3Enabled,
        pool: isSSL3Enabled,
        auth: {
            user: _user,
            pass: _pass,
        },
    };
    if (!_host.toLowerCase().includes('socketlabs')) {
        transport.tls = tls;
    }

    return nodemailer.createTransport(transport);
}

// 1 = R-Token
// 2 = PolyMath
// 3 = Ravencoin
// 4 = ERC1404 Ethereum
// 5 = ERC1404 Polygon
// 6 = ERC1404 Binance
const ethereumBasedProtocolIDs = [1, 2, 4, 5, 6];

module.exports = {

    isNotAllowed(req, res, next) {
        res.status(403).send("Forbidden");
    },

    getUserFileUploadsLocationFullPath(filename, applyFix = false) { // filename can be empty
        // In some outdated cases, this has to be empty, but newer functions should have it
        const upOne = (applyFix) ? `` : `../`;
        const tmp = path.join(__dirname, `/${upOne}../uploads/${filename}`);
        // I saw that newer functions do /../../uploads/${filename}
        // but I found a case where it needs to be /../${filename}

        if (process.platform === 'win32') { return path.win32.normalize(tmp); }
        return path.posix.normalize(tmp);
    },
    getUserFileLocation(filepath) {
        if (process.platform === 'win32')
            return path.win32.normalize(filepath);
        else
            return path.posix.normalize(filepath);
    },
    getFrontEndUrl() {
        return process.env.FRONTEND_URL
    },

    deleteFileFromDisk(url) {
        return new Promise((resolve, reject) => {
            fs.unlink(module.exports.getUserFileUploadsLocationFullPath(url), (err) => {
                if (err) { reject(err); }
                resolve('del');
            });
        });
    },

    getAppParameterFromDataSet(dataset, parameter) {
        let z = {};
        dataset.forEach((obj) => {
            if (obj.Param === parameter) { z = { ValueString: obj.ValueString, ValueInt: obj.ValueInt }; }
        });

        return z;
    },

    // Platform Area Commons
    getPlatformPartials(customPartials) {
        const appDir = path.dirname(mainFilename);

        return {
            Header: `${appDir}/../views/partials/header`,
            HeaderInnerPlatform: `${appDir}/../views/partials/headerinnerplatform`,
            FooterInner: `${appDir}/../views/partials/footerinner`,
            Footer: `${appDir}/../views/partials/footer`,
            multifileupload: `${appDir}/../views/partials/multifileupload`,
            accreditationSettings: `${appDir}/../views/admin/accreditationSettings`,
            privateKeySelectorDialog: `${appDir}/../views/partials/secretKeyFileSelector`,
            atomicswap: `${appDir}/../views/investors/partials/atomicswap`,
            ValidationBackend: `${appDir}/../views/partials/validationBackend`,
            LoadingRipple: `${appDir}/../views/partials/loadingRipple`,
            ...customPartials,
        };
    },
    getPlatformCommonPageProperties(req) {
        const sto = getSTOFromConfig(req.session.stoid)
        const verifyInvestorEnabled = global.config.AccreditationEnabled &&
          global.config.VerifyInvestorComApiToken &&
          global.config.verifyInvestorComUrl?.frontendURL.includes('staging') &&
          global.config.verifyInvestorComUrl?.backendURL.includes('staging');
        const sto0 = getSTOFromConfig(0);
        const json = {
            poweredByLabel: global.config.poweredByLabel,
            sto0Title: sto0.title,
            logo: sto.logo,
            Login_UserName: req.session.user.UserName,
            SiteParameter_PageTitle: sto.title,
            CurrentClientID: global.config.CurrentClientID,
            isPrivateKeyEnabled: global.config.isPrivateModuleEnabled,
            favicon: module.exports.getFevIcon(req),
            blockPassClientId: global.config.BlockPassApiJson.ClientId,
            kycProvider: global.config.KycProvider,
            affiliateEnabled: global.config.affiliateConfig && global.config.affiliateConfig.enabled,
            revision: global.revision,
            revisionFull: global.revisionFull,
            verifyInvestorEnabledAndStaging: verifyInvestorEnabled
        };

        return json;
    },
    isPlatformAdminUserAuthenticated(req, res, next) {
        if (req.isAuthenticated() && req.session.userType === 'platform' && req.session._ip === req.ip && req.session._ua === req.headers['user-agent']) { return next(); }

        req.session.regenerate(() => {
            res.redirect('/platform/adminlogin');
        });
    },
    // Admin Area Commons
    getCommonPageProperties(req) {
        // These rights are put in the Data for every page template because it will be used in the templates and menu on the left
        // There can be rights used on only individual pages and not on every page   and they are set in their respective renders
        const sto = getSTOFromConfig(req.session.stoid);
        const json = {
          poweredByLabel: global.config.poweredByLabel,
          stoID: req.session.stoid,
          stoTitle: sto.title,
          logo: sto.logo,
          stoType: sto.stoType,
          disclaimer: sto.disclamer,
          website: sto.website,
          stolinkfull: sto.stolinkfull,
          Login_UserName: req.session.user.UserName,
          STOInvestorTypes: module.exports.getSTOInvestorTypes(req),
          SiteParameter_PageTitle: getSTOFromConfig(req.session.stoid).title,
          AdminRights: req.session.user.Rights,
          InvestorCombinePropertiesMode:
            global.config.InvestorCombinePropertiesMode,
          KYCPersonalInfoScreen: global.config.KYCPersonalInfoScreen,
          favicon: module.exports.getFevIcon(req),
          CurrentClientID: global.config.CurrentClientID,
          revision: global.revision,
          revisionFull: global.revisionFull,
          blockPassClientId: global.config.BlockPassApiJson.ClientId,
          kycProvider: global.config.KycProvider,
          currencyID: sto.settings.DefaultSTOCurreny,
        };

        if (module.exports.isUserAuthenticatedForModule(req, 14) || module.exports.isUserAuthenticatedForModule(req, 27) || module.exports.isUserAuthenticatedForModule(req, 28))
            json.showVotingModuleMenuItem = 1;
        else
            json.showVotingModuleMenuItem = 0;


        if (module.exports.isUserAuthenticatedForModule(req, 10) || module.exports.isUserAuthenticatedForModule(req, 22) || module.exports.isUserAuthenticatedForModule(req, 23))
            json.showReportsModuleMenuItem = 1;
        else
            json.showReportsModuleMenuItem = 0;


        return json;
    },
    getPartials(customPartials) {
        const appDir = path.dirname(mainFilename);

        return {
            HeaderInner: `${appDir}/../views/partials/headerinner`,

            Header: `${appDir}/../views/partials/header`,
            HeaderInnerSto: `${appDir}/../views/partials/headerinnersto`,
            FooterInner: `${appDir}/../views/partials/footerinner`,
            Footer: `${appDir}/../views/partials/footer`,
            InvestorView: `${appDir}/../views/partials/investerviewcommon`,
            privateKeySelectorDialog: `${appDir}/../views/partials/secretKeyFileSelector`,
            investorSearchModule: `${appDir}/../views/partials/investorsearch`,
            investorSearchModuleJSON: `${appDir}/../views/partials/investorsearchjson`,
            multifileupload: `${appDir}/../views/partials/multifileupload`,
			atomicswap: `${appDir}/../views/investors/partials/atomicswap`,
            ValidationBackend: `${appDir}/../views/partials/validationBackend`,
            LoadingRipple: `${appDir}/../views/partials/loadingRipple`,
            ...customPartials,
        };
    },
    isAdminUserAuthenticated(req, res, next) {

        if (req.isAuthenticated() && req.session.userType === 'admin' && req.session._ip === req.ip && req.session._ua === req.headers['user-agent']) {
            if (req.session.user.AuthCode != 0)
                return res.redirect('/admin/login2');
            else {

                if (global.config.areSTOHostnamesEnabled===1 && req.session.stoid != global.config.stos[req.hostname].stoid) {
                    res.redirect(module.exports.getGloablSTORecordWithID(req.session.stoid).stolinkfull + "/admin/dashboardsto");
                }
                else
                    return next();
            }
        } else {
            req.session.regenerate(() => {
                res.redirect('/admin/login');
            });
        }
    },

    // Investor wizard area commons
    getCommonInvestorWizardPageProperties(req) {

        return {
            logo: global.config.stos[req.hostname].logo,
            disclaimer: global.config.stos[req.hostname].disclamer,
            website: global.config.stos[req.hostname].website,
            Login_UserName: req.session.user.UserName,
            Login_UserID: req.session.user.ID,
            SiteParameter_PageTitle: global.config.stos[req.hostname].title,
            UploadFile_Size: global.config.SMTP_MaxFileSize,
            langauges: global.config.languages,
            currentLanguage: (req.cookies['locale'] != null) ? req.cookies['locale'] : "en",
            CustomPlatformCSSStyles: global.config.CustomPlatformCSSStyles,
            SSORedirectFrontEnd: global.config.SSORedirectFrontEnd,
            favicon: module.exports.getFevIcon(req)
        };
    },
    getInvestorWizardPartials(pageTemplate) {
        const appDir = path.dirname(mainFilename);

        return {
            HeaderInner: `${appDir}/../views/investors/partials/${global.config.InvestorLayoutThemes}/headerinner`,
            Header: `${appDir}/../views/investors/partials/header`,
            FooterInner: `${appDir}/../views/investors/partials/footerinner`,
            Footer: `${appDir}/../views/investors/partials/footer`,
            StepPageTemplate: `${appDir}/../views/investors/kyc/${pageTemplate}`,
            languageSelection: `${appDir}/../views/partials/language`,
            stolistselection: `${appDir}/../views/investors/partials/selectstolist`,
            multifileupload: `${appDir}/../views/partials/multifileupload`
        };
    },
    isInvestorUserAuthenticated(req, res, next) {

        const  checkIsActiveAndKYC = () => {
            const stmt = `select * 
                        from investor i, investorsto s 
                            where i.id = s.investorid 
                            and i.id = ? 
                            and s.stoid = ${global.config.stos[req.hostname].stoid}`;
            const mysql = require("./mysql");
            mysql.executeSQLStatement(stmt, [req.session.user.ID]).then((rows) => {
                if (rows[0].isActive !== 1) {
                    req.flash('UserMessage1', 'Account blocked. Please contact admin');
                    return res.redirect('/login');
                } else if ((!rows.length || rows[0].isKYC !== 1 || rows[0].KYCCurrentStatus <= 0)
                  && !(req.originalUrl.includes('/wizard') || req.originalUrl.includes('/uploadFiles') || req.originalUrl.includes('/deleteInvestorDocumentsFromKYC')) ) {
                    return res.redirect('/wizard?step=0');
                } else {
                    return next();
                }
            }).catch((error) => {
                req.flash('UserMessage1', 'Something Happened. Please contact admin');
                logger.error(`${error} - Error occurred in common/isInvestorUserAuthenticated/nonSSO`);
                return res.redirect('/login');
            });
        };

        if (global.config.SSOModeEnabled == 1) {  // try to refresh token from cognito

            if (typeof req.session.user !== "undefined") {

                module.exports.validateCognitoToken(req.session.user.XToken, req.session.user.refreshXToken, req.session.user.email, req).then((data) => {

                    if (typeof data.status !== 'undefined') {
                        try {
                            req.session.user.XToken = data.token;
                            req.session.user.refreshXToken = data.refresh;
                        } catch (e) {
                            res.redirect(global.config.SSORedirectFrontEnd);
                        }
                    }

                    return next();
                    // checkIsActiveAndKYC(req, res, next);
                }).catch((err) => {
                    logger.error("error in common isInvestorUserAuthenticated ")
                    logger.error(err)
                    req.session.regenerate(() => {
                        res.redirect(global.config.SSORedirectFrontEnd);
                    });
                });
            } else {
                res.redirect(global.config.SSORedirectFrontEnd);
            }

        } else if (req.isAuthenticated() && req.session.userType === 'investor') {
            if (req.session.user.AuthCode != 0) {
                return res.redirect("/login2");
            }
            else {
                checkIsActiveAndKYC();
            }
        } else {
            req.session.regenerate(() => {
                res.redirect('/login');
            });
        }
    },
    // Investor dashboard area commons
    getCommonInvestorDashboardPageProperties(req, res) {
        return new Promise((resolve, reject) => {
            const mysql = require('./mysql');
            const params = {}
            function getDatabaseInformation(callback) {
                /*var VotingCount = req.cookies.VotingCount;

                if (VotingCount === undefined) {
                    const sql = `select count(*) as count from investorsto i,  voting v, stos s  where i.stoid = v.stoid and s.id = i.stoid and v.opendate <= now() and v.closedate >= now() and i.investorid = ? and v.stoid = ${global.config.stos[req.hostname].stoid}`;
                    mysql.executeSQLStatement(sql, [req.session.user.ID]).then((result) => {
                          res.cookie('VotingCount', result[0][0].count, { maxAge: global.config.SecondsInvestorSideMenuCountsFromDBChanges, httpOnly: true });
                          params.VotingCount = result[0][0].count;
                          callback(null);
                    }).catch((error) => {
                      reject(error);
                    });

                } else {
                    params.VotingCount = req.cookies.VotingCount;
                    callback(null);
                }*/
                //params.VotingCount = 0;
                callback(null);
            }
            function getStoSettings(callback) {
                const sql = `SELECT settings FROM stos`;
                mysql.executeSQLStatement(sql, []).then((result) => {
                    try {
                        params.isInternalExchangeEnabled = result.some((sto) => {
                            const settings = JSON.parse(sto.settings);
                            return settings?.isInternalExchangeEnabled !== undefined && settings?.isInternalExchangeEnabled === 1;
                        }) === true ? 1 : 0;
                    } catch (e) {
                        params.isInternalExchangeEnabled = 0;
                        logger.error(`${e} - Error occurred in getCommonInvestorDashboardPageProperties.getStoSettings `);
                    }
                    callback(null);
                }).catch((error) => {
                    reject(error);
                });
            }
            function getIsVotingForThisInvestorEnabled(callback) {
                const sql = ` SELECT v.id
                                FROM voting v 
                                WHERE v.closedate < now()
                                LIMIT 1;

                            SELECT SUM(st.isVotingRightsApplicable) as votingRights,  SUM(st.isMeetingRightsApplicable) as meetingRights
                                FROM sharetypes st 
                                    JOIN shares s ON s.shareTypeid = st.id
                                WHERE s.investorID = ?`;
                mysql.executeSQLStatement(sql, [req.session.user.ID]
                ).then((result) => {
                    if (result[0].length) {
                        params.pastMeetings = 1;
                    } else {
                        params.pastMeetings = 0;
                    }
                    if (result[1][0].votingRights === 0) {
                        params.isVotingForThisInvestorEnabled = 0;
                    } else {
                        params.isVotingForThisInvestorEnabled = 1;
                    }
                    if (result[1][0].meetingRights === 0) {
                        params.isMeetingForThisInvestorEnabled = 0;
                    } else {
                        params.isMeetingForThisInvestorEnabled = 1;
                    }
                    callback(null);
                }).catch((error) => {
                    reject(error);
                });
            }
            async.waterfall([
                getDatabaseInformation,
                getStoSettings,
                getIsVotingForThisInvestorEnabled
            ], function (err) {
                resolve({
                    logo: global.config.stos[req.hostname].logo,
                    website: global.config.stos[req.hostname].website,
                    stoType: global.config.stos[req.hostname].stoType,
                    disclaimer: global.config.stos[req.hostname].disclamer,
                    NODE_ENV: global.NODE_ENV,
                    isInternalExchangeEnabled: params.isInternalExchangeEnabled,
                    isRegisteredInvestorInSTO: module.exports.isInvestorInRegisteredInvesotorType(req),
                    VotingCount: 0,
                    Login_UserName: req.session.user.UserName,
                    Login_UserID: req.session.user.ID,
                    SiteParameter_PageTitle: global.config.stos[req.hostname].title,
                    investorSTOs: req.session.user.investorSTOs,
                    CurrentClientID: global.config.CurrentClientID,
                    revision: global.revision,
                    revisionFull: global.revisionFull,
                    revision: global.revision,
                    revisionFull: global.revisionFull,
                    langauges: global.config.languages,
                    currentLanguage: (req.cookies['locale'] != null) ? req.cookies['locale'] : "en",
                    CustomPlatformCSSStyles: global.config.CustomPlatformCSSStyles,
                    InvestorCombinePropertiesMode: global.config.InvestorCombinePropertiesMode,
                    SSORedirectFrontEnd: global.config.SSORedirectFrontEnd,
                    favicon: module.exports.getFevIcon(req),
                    isVotingForThisInvestorEnabled: params.isVotingForThisInvestorEnabled,
                    isMeetingForThisInvestorEnabled: params.isMeetingForThisInvestorEnabled,
                    pastMeetings: params.pastMeetings
                });
            });
        });
    },
    getCommonInvestorNotLoginPageProperties(req) {
        return {
            title: global.config.stos[req.hostname].title,
            disclaimer: global.config.stos[req.hostname].disclamer,
            logo: global.config.stos[req.hostname].logo,
            SiteParameter_PageTitle: global.config.stos[req.hostname].title,
            CustomPlatformCSSStyles: global.config.CustomPlatformCSSStyles
        };
    },
    getInvestorDashboardPartials() {
        const appDir = path.dirname(mainFilename);
        return {
            HeaderInner: `${appDir}/../views/investors/partials/${global.config.InvestorLayoutThemes}/headerinner-dashboard`,
            Header: `${appDir}/../views/investors/partials/header`,
            FooterInner: `${appDir}/../views/investors/partials/footerinner`,
            Footer: `${appDir}/../views/investors/partials/footer`,
            multifileupload: `${appDir}/../views/partials/multifileupload`,
            languageSelection: `${appDir}/../views/partials/language`,
            stolistselection: `${appDir}/../views/investors/partials/selectstolist`,
            atomicswap: `${appDir}/../views/investors/partials/atomicswap`,
            affiliatetree: `${appDir}/../views/investors/partials/affiliatetree`,
            kickoffchallenge: `${appDir}/../views/investors/partials/kickoffchallenge`,
            accreditationVerifyInvestorCom: `${appDir}/../views/investors/partials/accreditationProviders/verifyInvestorCom`,
        };
    },
    validateCognitoToken(token, refreshtoken, email, req) {

        return new Promise((resolve, reject) => {

            var pems = {};
            var keys = global.config.CognitoJWKS['keys'];
            for (var i = 0; i < keys.length; i++) {
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent };
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }

            var decodedJwt = jwt.decode(token, { complete: true });

            if (!decodedJwt) {
                res.redirect(global.config.SSORedirectFrontEnd);
            }
            var kid = decodedJwt.header.kid;
            try {
                var pem = pems[kid];
                if (!pem) {
                    logger.error(`problems with pem - Error occured in server ssologin `);
                    res.redirect(global.config.SSORedirectFrontEnd);
                }
            } catch (error) {
                logger.error(`${error.toString()} problems with pem - key not found - Error occured in server ssologin `);
                res.redirect(global.config.SSORedirectFrontEnd);
            }

            jwt.verify(token, pem, function (err, payload) {
                if (err) {
                    const poolData = {
                        UserPoolId: global.config.CognitoUserPoolId,
                        ClientId: global.config.CognitoClientId,
                    };


                    const pool_region = global.config.CognitoPool_region;

                    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

                    const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: refreshtoken });

                    const userData = {
                        Username: email,
                        Pool: userPool
                    };

                    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

                    cognitoUser.refreshSession(RefreshToken, (err, data) => {

                        if (err) {
                            reject("invalid");
                        } else {
                            resolve({
                                "result": "valid",
                                "status": "refreshed",
                                "token": data.idToken.jwtToken,
                                "refresh": data.refreshToken.token
                            });
                        }
                    });
                } else {
                    resolve({
                        "result": "valid",
                        "token": token,
                        "refresh": refreshtoken
                    });
                }
            });

        });

    },

    // broker area
    getBrokerWizardPageProperties(req) {
        return {
            logo: getSTOFromConfig(req.session.stoid).logo,
            disclaimer: getSTOFromConfig(req.session.stoid).disclamer,
            Login_UserName: req.session.user.UserName,
            SiteParameter_PageTitle: getSTOFromConfig(req.session.stoid).title,
            KYCPersonalInfoScreen: global.config.KYCPersonalInfoScreen,
            favicon: module.exports.getFevIcon(req)
        };
    },
    getBrokerWizardPartials(pageTemplate) {
        const appDir = path.dirname(mainFilename);

        return {
            Header: `${appDir}/../views/partials/header`,
            HeaderInnerBroker: `${appDir}/../views/partials/headerbroker`,
            FooterInner: `${appDir}/../views/partials/footerinner`,
            Footer: `${appDir}/../views/partials/footer`,
            InvestorView: `${appDir}/../views/partials/investerviewcommon`,
        };
    },
    isBrokerUserAuthenticated(req, res, next) {

        if (req.isAuthenticated() && req.session.userType === 'broker' && req.session._ip === req.ip && req.session._ua === req.headers['user-agent']) {
            if (req.session.user.AuthCode != 0)
                return res.redirect('/broker/login2');
            else {
                return next();
            }
        } else {
            req.session.regenerate(() => {
                res.redirect('/broker/login');
            });
        }
    },

    getFevIcon(req) {
        if (getSTOFromConfig(req.session.stoid).settings.hasOwnProperty("favicon"))
            return getSTOFromConfig(req.session.stoid).settings.favicon;
        else
            return "default.png";
    },

    isInvestorInRegisteredInvesotorType(req) {
        var isRegisteredInvestorInSTO = 1;
        req.session.user.investorSTOs.forEach((obj) => {
            if (obj.id == global.config.stos[req.hostname].stoid) {
                if (global.config.stos[req.hostname].stoinvestortypesnotonshareregister.includes(obj.KYCCurrentStatus))
                    isRegisteredInvestorInSTO = 0;
            }
        });
        return isRegisteredInvestorInSTO;
    },

    // register area commons
    getInvestorRegisterPartials() {
        return {
            HeaderInner: `partials/${global.config.InvestorLayoutThemes}/headerinner-register`,
            Header: 'partials/header',
            FooterInner: 'partials/footerinner',
            Footer: 'partials/footer',
        };
    },

    handleError(req, res, message) {
        logger.error("----------------------------------------------------------------------------------------");
        logger.error(message);
        var stack = new Error().stack;
        logger.error("occured in STO - " + req.hostname + ", ip - " + req.ip + ", original url - " + req.originalUrl);
        logger.error(stack);
		res.redirect('/error');
		logger.error("IGNORE BELOW ERROR - Cannot set headers after they are sent to the client");
		logger.error("----------------------------------------------------------------------------------------");
    },

    handleDebug(req, res, message) {
        logger.error("----------------------------------------------------------------------------------------");
        logger.error(message);
        var stack = new Error().stack;
        logger.error("occured in STO - " + req.hostname + ", ip - " + req.ip + ", original url - " + req.originalUrl);
        logger.error(stack);
        logger.error("----------------------------------------------------------------------------------------");
    },

    getSHA256Hash(str) {
        return crypto.createHash('sha256').update(global.config.PASSWORD_SALT + str).digest('hex');
    },
    encryptAsync(data) {
        return new Promise((resolve, reject) => {
            try {
                var mykey = crypto.createCipher('aes-128-cbc', global.config.PASSWORD_SALT);
                var mystr = mykey.update(data, 'utf8', 'hex')
                mystr += mykey.final('hex');
                resolve(mystr);
            } catch (exception) {
                reject({ message: exception.message });
            }
        });
    },
    decryptAsync(data) {
        return new Promise((resolve, reject) => {
            try {
                var mykey = crypto.createDecipher('aes-128-cbc', global.config.PASSWORD_SALT);
                var mystr = mykey.update(data, 'hex', 'utf8')
                mystr += mykey.final('utf8');
                resolve(mystr);
            } catch (exception) {
                reject({ message: exception.message });
            }
        });
    },

    // checkUserAuthorizationForModule(req, res, moduleID) {
    //     if (!req.session.user.Rights.includes(moduleID)) {
    //         logger.error("----------------------------------------------------------------------------------------");
    //         logger.error("Un-Authorized Module Access was  tried");
    //         logger.error("occured in STO - " + req.hostname + ", ip - " + req.ip + ", original url - " + req.originalUrl);
    //         logger.error("Module Right denied was " + moduleID);
    //         logger.error("----------------------------------------------------------------------------------------");
    //         res.redirect('/dashboardsto');
    //         return res.end();
    //     }
    // },
    checkUserAuthorizationForModuleSTO(req, res, moduleID) {
        //this is used to return  true or false is user has a specific right ?    the caller logic will decided what to do
        //checkUserAuthorizationForModuleSTO function is used to redirect user to dashboard if he does not has specific right
        if (!req.session.user.Rights.includes(moduleID)) {
            logger.error("----------------------------------------------------------------------------------------");
            logger.error(`Un-Authorized Module Access was tried by admin ${req.session.user.ID}`);
            logger.error("occured in STO - " + req.hostname + ", ip - " + req.ip + ", original url - " + req.originalUrl);
            logger.error("Module Right denied was " + moduleID);
            logger.error("----------------------------------------------------------------------------------------");
            res.redirect('/admin/dashboardsto');
            return res.end();
        }
    },
    isUserAuthenticatedForModule(req, moduleID) {
        //this is used to return  true or false is user has a specific right ?    the caller logic will decided what to do
        //checkUserAuthorizationForModuleSTO function is used to redirect user to dashboard if he does not has specific right
        return req.session.user.Rights.includes(moduleID);
    },

    isUserAuthorizationForModule(req, res, moduleID) {
        if (req.session.user.Rights.includes(moduleID)) { return 1; }
        return 0;
    },

    /*GenerateLog(req, res, params, callback) {

        if (params.ActivityType !== -1) {
            const mysql = require('./mysql');

            let AdminUserID = null;
            if (req.session.userType === 'admin') { AdminUserID = req.session.user.ID; }

            const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid) values (?,NOW(),?,?,?,?)';
            const sqlparams = [AdminUserID, params.LogDescription, params.InvestorID, params.ActivityType, req.session.stoid];

            mysql.executeSQLStatement(stmt, sqlparams)
                .then(() => {
                    callback(null, params);
                })
                .catch((error) => {
                    module.exports.handleError(req, res, `${error.toString()} Error occured in GenerateLog`);
                });
        } else { callback(null, params); }
    },*/

    isFileExtensionImage(ext) {
        const json = ['png', 'jpeg', 'jpg', 'tif', 'tiff', 'gif'];

        if (json.includes(ext)) { return true; }
        return false;
    },

    getKYCSideLinks(steps) {
        const sideTitles = [];
        for (let tmp = 0; tmp < steps.steps.length; tmp++) {
            sideTitles.push({
                liID: steps.steps[tmp].liID,
                sideTitle: steps.steps[tmp].SideTitle,
                icon: steps.steps[tmp].icon,
                stepLink: steps.steps[tmp].stepLink,
            });
        }
        return sideTitles;
    },
    senEmailDirect(_toEmail, _txtSubject, _txtText, _host, _port, _user, _pass, _from, attachmentJSON) {

        return new Promise((resolve, reject) => {

            var attachment2 = [];

            attachmentJSON.forEach((obj) => {
                if (obj.filename != "")
                    attachment2.push(obj);
            });

            const transporter = getTransporter(_host, _port, _user, _pass);

            const mailOptions = {
                from: _from,
                to: _toEmail,
                subject: _txtSubject,
                html: _txtText,
            };

            if (attachment2.length > 0) {
                mailOptions.attachments = attachment2;
            }


            transporter.sendMail(mailOptions, (error, info) => {   //Try 1
                if (error) {
                        transporter.sendMail(mailOptions, (error, info) => {  //Try 2
                            if (error) {
                                    transporter.sendMail(mailOptions, (error, info) => { //Try 3
                                        if (error) {
                                            logger.error(error + " - in common senEmailDirect ");
                                            reject(error);
                                        } else {
                                            resolve(info);
                                        }
                                    });
                            } else {
                                resolve(info);
                            }
                        });
                } else {
                    resolve(info);
                }
            });

        });

    },
    sendEmailForBulkInvestorAddition(hostname, toEmail, txtSubject, txtText, attachmentJSON, smtpConfig){
        return new Promise((resolve, reject) => {
            const { SMTP_FromName: name, SMTP_FromAddress: address } = smtpConfig;
            const from = name ? `${name} <${address}>` : address;

            module.exports.senEmailDirect(toEmail,
                txtSubject,
                txtText,
                smtpConfig.SMTP_Host,
                parseInt(smtpConfig.SMTP_Port, 10),
                smtpConfig.SMTP_User,
                smtpConfig.SMTP_Password,
                from,
                attachmentJSON).then(() => {
                resolve("done");
            }, (err) => {
                reject(err);
            });

        });
    },

    sendEmailByStoId(stoId, toEmail, txtSubject, txtText, attachmentJSON) {
        const sto = module.exports.getGloablSTORecordWithID(stoId);
        return new Promise((resolve, reject) => {
            const { SMTP_FromName: name, SMTP_FromAddress: address } = sto;
            const from = name ? `${name} <${address}>` : address;

            module.exports.senEmailDirect(toEmail,
                txtSubject,
                txtText,
                sto.SMTP_Host,
                parseInt(sto.SMTP_Port, 10),
                sto.SMTP_User,
                sto.SMTP_Password,
                from,
                attachmentJSON).then(() => {

                resolve("done");
            }, (err) => {
                reject(err);
            });

        });
    },

    sendEmail(hostname, toEmail, txtSubject, txtText, attachmentJSON) {
        const sto0 = global.config.stos[Object.keys(global.config.stos)[0]];
        return new Promise((resolve, reject) => {
            const { SMTP_FromName: name, SMTP_FromAddress: address } = sto0;
            const from = name ? `${name} <${address}>` : address;

            module.exports.senEmailDirect(toEmail,
                txtSubject,
                txtText,
                sto0.SMTP_Host,
                parseInt(sto0.SMTP_Port, 10),
                sto0.SMTP_User,
                sto0.SMTP_Password,
              from,
                attachmentJSON).then(() => {
                    resolve("done");
                }, (err) => {
                    reject(err);
                });

        });

        /*return new Promise((resolve, reject) => {

            const transporter = nodemailer.createTransport({
                host: global.config.stos[hostname].SMTP_Host,
                port: parseInt(global.config.stos[hostname].SMTP_Port),
                secure: true,
                auth: {
                    user: global.config.stos[hostname].SMTP_User,
                    pass: global.config.stos[hostname].SMTP_Password,
                },
            });

            const mailOptions = {
                from: global.config.stos[hostname].SMTP_FromAddress,
                to: toEmail,
                subject: txtSubject,
                html: txtText,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });

        });*/
    },
    sendBulkEmails(records, txtSubject, txtText, _host, _port, _user, _pass, _from, attachmentsJSON) {
        return new Promise((resolve, reject) => {

                    var attachment2 = [];

                    attachmentsJSON.forEach((obj) => {
                        if (obj.filename != "")
                            attachment2.push(obj);
                    });
                    const transporter = nodemailer.createTransport({
                        host: _host,
                        port: _port,
                        secure: true,
                        pool: true,
                        auth: {
                            user: _user,
                            pass: _pass,
                        },
                    });

                    var mailOptions = {
                        from: _from,
                        //to: _toEmail,
                        subject: txtSubject,
                        //html: _txtText,
                    };

                    if (attachment2.length > 0) {
                        mailOptions.attachments = attachment2;
                    }

                    async.eachSeries(records, function (rec, callback) {
                            if (rec.email != "" && rec.email != null)  {

                                   mailOptions.to = rec.email;
                                   mailOptions.html = "Hi " + rec.FirstName + "  " + rec.LastName + "<br /><br />" + txtText;

                                    transporter.sendMail(mailOptions, (error, info) => { //Try 1
                                        if (error) {
                                                transporter.sendMail(mailOptions, (error, info) => { //Try 2
                                                    if (error) {
                                                                transporter.sendMail(mailOptions, (error, info) => { //Try 3
                                                                    if (error) {
                                                                                transporter.sendMail(mailOptions, (error, info) => { //Try 4
                                                                                    if (error) {
                                                                                        logger.error(error + " - " + rec.email +" - in common senEmailDirect ");
                                                                                        callback(null);
                                                                                    } else {
                                                                                        callback(null);
                                                                                    }
                                                                                });
                                                                    } else {
                                                                        callback(null);
                                                                    }
                                                                });
                                                    } else {
                                                        callback(null);
                                                    }
                                                });
                                        } else {
                                            callback(null);
                                        }
                                    });
                            } else
                                callback(null);

                    }, function (err) {
                        if (err) {
                            logger.error("Error in Bulk emails")
                            logger.error( err.toString() );
                        } else {
                            logger.debug('Bulk emails send');
                        }
                    });


                    resolve('done');

        });
    },

    // Get textual informations
    getAuthorizationType(authType) {
        if (authType === 0) { return 'New'; }
        return global.config.stoinvestortype[authType];
        return '';
    },
    getInvestorTypeText(type) {
        if (type === 0) { return 'All Investor'; }
        if (type === -1) { return 'All Registered Investor'; }
        return global.config.stoinvestortype[type];
        return '';
    },
    getSTOInvestorTypes(req) {
        var types = [];
        const stoInvestorTypes = getSTOFromConfig(req.session.stoid).stoinvestortypes;
        const investorTypesArray = (typeof stoInvestorTypes === 'string' || stoInvestorTypes instanceof String) ?
          stoInvestorTypes.split(',') :
          stoInvestorTypes;
        investorTypesArray.forEach((obj) => {           //obj is an array of id like [1, 2, 3]
            types.push({ "id": obj, "type": global.config.stoinvestortype[obj] });
        });
        return types;
    },
    getSTOinvestorTypeWIthID(id) {
        if (id == 0)
            return "All";
        else if (id == -1)
            return "Registered";
        else
            return global.config.stoinvestortype[id];
    },
    getCompanyType(sto) {
        if (sto.companytype == 0)
            return "Stock Corporation";
        else if (sto.companytype == 1)
            return "Corporation";
        else
            return "";
    },

    getInvestorSearchSQLSearchCritetia(req, isPost) {
        let searchCriteria = {};
        var namesearch = "";
        var typesearch = 0;
        var sortby = "";
        var sortingby = "";

        if (isPost === false) {
            namesearch = req.query.namesearch;
            typesearch = req.query.typesearch;
            sortby = req.query.sortby;
            sortingby = req.query.sortingby;
        } else {
            namesearch = req.body.namesearch;
            typesearch = req.body.typesearch;
            sortby = req.body.sortby;
            sortingby = req.body.sortingby;
        }

        if (namesearch != null) {
            searchCriteria.name = [];

            const names = namesearch.split(',');
            for (let i = 0; i < names.length; i++) {

                searchCriteria.name.push(
                    escape(names[i].trim())
                        .replace('%20', ' ')
                        .replace('%E4', 'ä')
                        .replace('%FC', 'ü')
                        .replace('%F6', 'ö')
                );
            }
        }

        if (typesearch != null) {
            if (typesearch !== '') {
                searchCriteria.type = typesearch.trim();
                if (isNaN(searchCriteria.type)) searchCriteria.type = '0';
            }
        }

        if (sortby != null) {
            if (sortby !== '') {
                searchCriteria.sortby = sortby.trim();
            } else
                searchCriteria.sortby = "name";
        } else
            searchCriteria.sortby = "name";


        if (sortingby != null) {
            if (sortingby !== '') {
                searchCriteria.sortingby = sortingby.trim();
            } else
                searchCriteria.sortingby = "asc";
        } else
            searchCriteria.sortingby = "asc";


        return searchCriteria;
    },
    getInvestorSearchSQL(searchCriteria, req) {
        let sql = '';
        const data = [];

        sql = `FROM investor i, investorsto s WHERE i.id = s.investorid and s.stoid = ${req.session.stoid} and isKYC = 1 `;

        if (searchCriteria.name != null) {
            if (searchCriteria.name != '') {
                sql += `and ( `;
                searchCriteria.name.forEach((itm, index) => {
                    if (index > 0)
                        sql += ` or `;
                    sql += ` (CONCAT(FirstName, ' ', LastName) like '%${itm}%' or CompanyName like '%${itm}%') `;
                });
                sql += `) `;
            }
        }


        if (searchCriteria.type != null) {
            if (searchCriteria.type != "0") {
                if (searchCriteria.type == "-1") {
                    var registeredInvestors = "";
                    const sto = getSTOFromConfig(req.session.stoid);
                    const stoInvestorTypes = sto.stoinvestortypes;
                    const investorTypesArray = (typeof stoInvestorTypes === 'string' || stoInvestorTypes instanceof String) ?
                      stoInvestorTypes.split(',') :
                      stoInvestorTypes;
                    investorTypesArray.forEach((obj) => {
                        if (!sto.stoinvestortypesnotonshareregister.includes(obj)) {
                            registeredInvestors = registeredInvestors + obj + ",";
                        }
                    });
                    registeredInvestors = registeredInvestors.substring(0, registeredInvestors.length - 1);
                    sql += ` and KYCCurrentStatus in (${registeredInvestors}) `;
                } else if (searchCriteria.type == "-2") {
                    sql += ' and investorBulkUploadStatus = 1 ';
                } else {
                    sql += ' and KYCCurrentStatus = ? ';
                    data.push(searchCriteria.type);
                }
            }
        } /*else {
            sql += ` and (select KYCCurrentStatus 
                            from investorsto 
                            where investorid = 350 
                            and stoid = 0
                        ) != ? `;       //select all Normal , Credited, Accelerated investors    not 0 (based on sto0 info
            data.push(0);
        }*/

        //handle sorting on the calling side.


        const status = searchCriteria.status;
        return {
            sql, data,
        };
    },

    checkTimePeriod(t1, t2) {
        //    1 - 2 - 0
        const curTime = new Date();
        const openTime = new Date(t1);
        const closeTime = new Date(t2);

        if (curTime.getTime() <= closeTime.getTime()) {
            if (curTime.getTime() < openTime.getTime())
                return 1;      //voting in future
            else
                return 2;      //voting started
        }
        else
            return 0;        //voting closed
    },



    getPolyMathERC1400InfoContractABI() {
        return require("../data/abi/polymathid2.json").contractInfo;
    },

    createPayPalPaymentObject(payment) {
        return new Promise((resolve, reject) => {

            // configure paypal with the credentials you got when you created your paypal app
            paypal.configure({
                'mode': 'sandbox', //sandbox or live
                // please provide your client id here
                'client_id': 'ATle5_WKgbZQEWtIXJem6tZEuhJGbjlfci4edfz4kCDUTItaEC7TfxutPmSbelaKxhUccYhQRTC5hQ4o',
                // provide your client secret here
                'client_secret': 'EC62ri1PZGSqksWe8Y4OytRxgeFXie0ywlfLLx6d8yB4XYMaNP2XpmPIJUwm9JIF9t6YwA_r9aKMdpen'
            });

            paypal.payment.create(payment, function (err, payment) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(payment);
                }
            });
        });

    },
    getSTOUnRegisteredInvestorTypeIDsinCommaDelimitedText(req) {

       return  getSTOFromConfig(req.session.stoid).stoinvestortypesnotonshareregister.reduce((acc,val) =>
                acc + "," + val
            ,"").slice(1)
    },

    testingdelay() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                resolve("done");
            }, 5000);
        });
    },

    generateRandomString(CharacterCount) {
        return new Promise((resolve, reject) => {
            var randomText = '';
            var arr = 'abcdefghijklmopqrstuvwxyz1234567890';
            for (var i = CharacterCount; i > 0; i--) {
                randomText += arr[Math.floor(Math.random() * arr.length)];
            }
            resolve(randomText);
        });
    },

    getMonthName(num) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        return monthNames[num];
    },

    uploadMultipleFiles(req) {

        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();

            var params = {
                attachments: []
            };

            var tempFileName = {};
            var tempName = "";

            form.parse(req);
            form.on('fileBegin', (name, file) => {
                var tempName = "";
                path.basename(file.name).split('.').slice(0, -1).forEach(obj => {
                    if (tempName == "")
                        tempName = obj;
                    else
                        tempName = tempName + "-" + obj;
                })
                tempName = tempName + "-" + uuidv4() + path.extname(file.name)

                tempFileName[file.name] = tempName;
                file.path = module.exports.getUserFileLocation(path.join(__dirname, "/../../temp/" + tempName));
            }).on('field', (name, value) => {

            }).on('error', (err) => {
                reject(err);
            }).on('aborted', () => {
                // if user aborted the request
            }).on('file', (name, file) => {
                params.attachments.push({ "filename": tempFileName[file.name], "path": file.path });
            }).on('end', () => {
                // file(s) / fields  has been received an this is the end of all data received from user
                //if (err) throw err;
                resolve(params.attachments);
            });
        });

    },
    moveMultipleFilesToLocation(filesJson, location) {
        return new Promise((resolve, reject) => {
            const filename = [];
            var tmpfilnm = "";


            async.eachSeries(filesJson, function (obj, callbackinternal) {

                tmpfilnm = module.exports.generateFileName( obj.filename);
                filename.push(tmpfilnm);

                const source = fs.createReadStream(module.exports.getUserFileLocation(obj.path));
                const dest = fs.createWriteStream(module.exports.getUserFileLocation(path.join(location, tmpfilnm)));

                source.pipe(dest);
                source.on('end', function () {

                    fs.unlink(module.exports.getUserFileLocation(obj.path), (err) => {
                        if (err) {
                            logger.error(err);
                        }
                        callbackinternal(null);
                    });

                });
                source.on('error', function (err) {
                    logger.error(err);
                });


            }, function (err) {
                if (err) {
                    logger.error(err);
                } else {
                    resolve(filename);
                }
            });


        });
    },
    generateFileName(filename) {
        //return uuidv4() + filename;
        return filename;
    },

    getCurrentcySymbol(currency) {
        return global.config.currency[currency];
    },

    getGloablSTORecordWithID(id) {
        var obj2 = {};
        for (var key in global.config.stos) {
            if (global.config.stos[key].stoid == id)
                obj2 = global.config.stos[key];
        }
        return obj2;
    },

    getRedisKey(req, key) {
        return new Promise((resolve, reject) => {
            global.config.redisClient.get(`Dashboard ${req.session.stoid}${key}`, (err, data) => {
                if (!err)
                    resolve(data)
                else
                    reject(err);
            });
        });
    },
    setRedisKey(req, key, value) {
        return new Promise((resolve, reject) => {
            global.config.redisClient.set(`Dashboard${req.session.stoid}${key}`, value, 'EX', 100);
            resolve("ok");
        });
    },
    removeRedisKey(req, key) {
        return new Promise((resolve, reject) => {
            global.config.redisClient.del(`Dashboard${req.session.stoid}${key}`);
            resolve("ok");
        });
    },

    checkInvestorFallInCategory(names, type, investorName, investorType, hostname) {

        var isNameSearchOK = 0;
        var isTypeSearchOK = 0;

        if (names != null && names != "") {
            const searchNamesArray = names.split(",")

            searchNamesArray.forEach((name) => {
                if (investorName.includes(name.trim().toLowerCase())) {
                    isNameSearchOK = 1;
                }
            });
        } else
            isNameSearchOK = 1;


        if (type == 0)
            isTypeSearchOK = 1;
        else {
            if (type == -1) {
                if (global.config.stos[hostname].stoinvestortypesnotonshareregister.includes(investorType)) {
                    isTypeSearchOK = 0;
                } else
                    isTypeSearchOK = 1;
            } else {
                if (investorType == type)
                    isTypeSearchOK = 1;
                else
                    isTypeSearchOK = 0;
            }
        }


        if (isNameSearchOK == 1 && isTypeSearchOK == 1)
            return true;
        else
            return false;


    },

    redirectDocuSignSigningURL(req, res, json, returnURL, templateid, nameOfRecipient, emailSubject, investorEmail) {

        var password = "";

        const
            email = global.config.DocuSignEmail,                                // your account email
            integratorKey = global.config.DocuSignIntegrationKey,
            linkToDOcuSignLoginServer = global.config.DocuSignlinkToLoginServer,

            recipientName = nameOfRecipient,          // recipient (signer) name
            templateRoleName = "signer";                 // template role that exists on template referenced above

        var baseUrl = "";
        var envelopeId = "";
        var templateId = "";

        if (templateid == "1")
            templateId = global.config.DocuSignSTOContractID;
        else if (templateid == "2")
            templateId = global.config.DocuSignSharesPurchaseContractID;

        async.waterfall([
            function (next) {
                module.exports.decryptAsync(global.config.DocuSignPassword).then((result) => {
                    password = result;
                    next(null);
                });
            },

            //////////////////////////////////////////////////////////////////////
            // Step 1 - Login (used to retrieve accountId and baseUrl)
            //////////////////////////////////////////////////////////////////////
            function (next) {
                var body = "";  // no request body for login api call

                // set request url, method, body, and headers
                var options = initializeRequest(linkToDOcuSignLoginServer, "GET", body, email, password);

                // send the request...
                request(options, function (err, res, body) {
                    if (!parseResponseBody(err, res, body)) {
                        return;
                    }
                    baseUrl = JSON.parse(body).loginAccounts[0].baseUrl;
                    //console.log(baseUrl)
                    next(null); // call next function
                });
            },

            //////////////////////////////////////////////////////////////////////
            // Step 2 - Send envelope with one Embedded recipient (using clientUserId property)
            //////////////////////////////////////////////////////////////////////
            function (next) {

                var jsonParameters = {
                    "emailSubject": emailSubject,
                    "templateId": templateId,
                    "templateRoles": [{
                        "email": investorEmail,
                        "name": recipientName,
                        "roleName": "signer",
                        "clientUserId": "1201",  // user-configurable  do not remove   necessay otherwise no onpage siging
                        "tabs": {
                            "textTabs": json
                        }
                    }],
                    "status": "sent"
                };

                var url = baseUrl + "/envelopes";
                var body = JSON.stringify(jsonParameters);

                // set request url, method, body, and headers
                var options = initializeRequest(url, "POST", body, email, password);

                // send the request...
                request(options, function (err, res, body) {
                    if (!parseResponseBody(err, res, body)) {
                        return;
                    }

                    envelopeId = JSON.parse(body).envelopeId;
                    next(null);
                });

            },

            //////////////////////////////////////////////////////////////////////
            // Step 3 - Get the Embedded Signing View (aka the recipient view)
            //////////////////////////////////////////////////////////////////////
            function (next) {
                var url = baseUrl + "/envelopes/" + envelopeId + "/views/recipient";
                var method = "POST";
                returnURL = returnURL + "&envelopeId=" + envelopeId;
                var body = JSON.stringify({
                    "returnUrl": returnURL,
                    "authenticationMethod": "email",
                    "email": investorEmail,
                    "userName": recipientName,
                    "clientUserId": "1201", // must match clientUserId in step 2    do not remove and must be defined above
                });

                // set request url, method, body, and headers
                var options = initializeRequest(url, "POST", body, email, password);

                // send the request...
                request(options, function (err, res2, body) {
                    if (!parseResponseBody(err, res2, body))
                        return;
                    else
                        res.redirect(JSON.parse(body).url);
                });

            }
        ]);

        //***********************************************************************************************
        // --- HELPER FUNCTIONS ---
        //***********************************************************************************************
        function initializeRequest(url, method, body, email, password) {
            var options = {
                "method": method,
                "uri": url,
                "body": body,
                "headers": {}
            };
            addRequestHeaders(options, email, password);
            return options;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////
        function addRequestHeaders(options, email, password) {
            // JSON formatted authentication header (XML format allowed as well)
            const dsAuthHeader = JSON.stringify({
                "Username": email,
                "Password": password,
                "IntegratorKey": integratorKey  // global
            });
            // DocuSign authorization header
            options.headers["X-DocuSign-Authentication"] = dsAuthHeader;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////
        function parseResponseBody(err, res, body) {
            if (res != null) {
                if (res.statusCode != 200 && res.statusCode != 201) { // success statuses
                    logger.error("Error calling DocuSign webservice - status is: " + res.statusCode);
                    logger.error(err);
                    logger.error(body);
                    return false;
                } else
                    return true;
            } else {
                logger.error("Error calling DocuSign, res object did not initialized");
                logger.error(err);
                logger.error(body);
                return false;
            }

        }

    },

    getCountries() {
        return [
            ["Afghanistan", "Afghanistan"],
            ["Albania", "Albania"],
            ["Algeria", "Algeria"],
            ["American Samoa", "American Samoa"],
            ["Andorra", "Andorra"],
            ["Angola", "Angola"],
            ["Anguilla", "Anguilla"],
            ["Antartica", "Antarctica"],
            ["Antigua and Barbuda", "Antigua and Barbuda"],
            ["Argentina", "Argentina"],
            ["Armenia", "Armenia"],
            ["Aruba", "Aruba"],
            ["Australia", "Australia"],
            ["Austria", "Austria"],
            ["Azerbaijan", "Azerbaijan"],
            ["Bahamas", "Bahamas"],
            ["Bahrain", "Bahrain"],
            ["Bangladesh", "Bangladesh"],
            ["Barbados", "Barbados"],
            ["Belarus", "Belarus"],
            ["Belgium", "Belgium"],
            ["Belize", "Belize"],
            ["Benin", "Benin"],
            ["Bermuda", "Bermuda"],
            ["Bhutan", "Bhutan"],
            ["Bolivia", "Bolivia"],
            ["Bosnia and Herzegowina", "Bosnia and Herzegowina"],
            ["Botswana", "Botswana"],
            ["Bouvet Island", "Bouvet Island"],
            ["Brazil", "Brazil"],
            ["British Indian Ocean Territory", "British Indian Ocean Territory"],
            ["Brunei Darussalam", "Brunei Darussalam"],
            ["Bulgaria", "Bulgaria"],
            ["Burkina Faso", "Burkina Faso"],
            ["Burundi", "Burundi"],
            ["Cambodia", "Cambodia"],
            ["Cameroon", "Cameroon"],
            ["Canada", "Canada"],
            ["Cape Verde", "Cape Verde"],
            ["Cayman Islands", "Cayman Islands"],
            ["Central African Republic", "Central African Republic"],
            ["Chad", "Chad"],
            ["Chile", "Chile"],
            ["China", "China"],
            ["Christmas Island", "Christmas Island"],
            ["Cocos Islands", "Cocos (Keeling) Islands"],
            ["Colombia", "Colombia"],
            ["Comoros", "Comoros"],
            ["Congo", "Congo"],
            ["Congo", "Congo"],
            ["Cook Islands", "Cook Islands"],
            ["Costa Rica", "Costa Rica"],
            ["Cota D'Ivoire", "Cote d'Ivoire"],
            ["Croatia", "Croatia (Hrvatska)"],
            ["Cuba", "Cuba"],
            ["Cyprus", "Cyprus"],
            ["Czech Republic", "Czech Republic"],
            ["Denmark", "Denmark"],
            ["Djibouti", "Djibouti"],
            ["Dominica", "Dominica"],
            ["Dominican Republic", "Dominican Republic"],
            ["East Timor", "East Timor"],
            ["Ecuador", "Ecuador"],
            ["Egypt", "Egypt"],
            ["El Salvador", "El Salvador"],
            ["Equatorial Guinea", "Equatorial Guinea"],
            ["Eritrea", "Eritrea"],
            ["Estonia", "Estonia"],
            ["Ethiopia", "Ethiopia"],
            ["Falkland Islands", "Falkland Islands (Malvinas)"],
            ["Faroe Islands", "Faroe Islands"],
            ["Fiji", "Fiji"],
            ["Finland", "Finland"],
            ["France", "France"],
            ["France Metropolitan", "France, Metropolitan"],
            ["French Guiana", "French Guiana"],
            ["French Polynesia", "French Polynesia"],
            ["French Southern Territories", "French Southern Territories"],
            ["Gabon", "Gabon"],
            ["Gambia", "Gambia"],
            ["Georgia", "Georgia"],
            ["Germany", "Germany"],
            ["Ghana", "Ghana"],
            ["Gibraltar", "Gibraltar"],
            ["Greece", "Greece"],
            ["Greenland", "Greenland"],
            ["Grenada", "Grenada"],
            ["Guadeloupe", "Guadeloupe"],
            ["Guam", "Guam"],
            ["Guatemala", "Guatemala"],
            ["Guinea", "Guinea"],
            ["Guinea-Bissau", "Guinea-Bissau"],
            ["Guyana", "Guyana"],
            ["Haiti", "Haiti"],
            ["Heard and McDonald Islands", "Heard and Mc Donald Islands"],
            ["Holy See", "Holy See (Vatican City State)"],
            ["Honduras", "Honduras"],
            ["Hong Kong", "Hong Kong"],
            ["Hungary", "Hungary"],
            ["Iceland", "Iceland"],
            ["India", "India"],
            ["Indonesia", "Indonesia"],
            ["Iran", "Iran"],
            ["Iraq", "Iraq"],
            ["Ireland", "Ireland"],
            ["Israel", "Israel"],
            ["Italy", "Italy"],
            ["Jamaica", "Jamaica"],
            ["Japan", "Japan"],
            ["Jordan", "Jordan"],
            ["Kazakhstan", "Kazakhstan"],
            ["Kenya", "Kenya"],
            ["Kiribati", "Kiribati"],
            ["Kuwait", "Kuwait"],
            ["Kyrgyzstan", "Kyrgyzstan"],
            ["Lao", "Lao"],
            ["Latvia", "Latvia"],
            ["Lebanon", "Lebanon"],
            ["Lesotho", "Lesotho"],
            ["Liberia", "Liberia"],
            ["Libya", "Libya"],
            ["Liechtenstein", "Liechtenstein"],
            ["Lithuania", "Lithuania"],
            ["Luxembourg", "Luxembourg"],
            ["Macau", "Macau"],
            ["Republic of North Macedonia", "Republic of North Macedonia"],
            ["Madagascar", "Madagascar"],
            ["Malawi", "Malawi"],
            ["Malaysia", "Malaysia"],
            ["Maldives", "Maldives"],
            ["Mali", "Mali"],
            ["Malta", "Malta"],
            ["Marshall Islands", "Marshall Islands"],
            ["Martinique", "Martinique"],
            ["Mauritania", "Mauritania"],
            ["Mauritius", "Mauritius"],
            ["Mayotte", "Mayotte"],
            ["Mexico", "Mexico"],
            ["Micronesia", "Micronesia"],
            ["Moldova", "Moldova"],
            ["Monaco", "Monaco"],
            ["Mongolia", "Mongolia"],
            ["Montserrat", "Montserrat"],
            ["Morocco", "Morocco"],
            ["Mozambique", "Mozambique"],
            ["Myanmar", "Myanmar"],
            ["Namibia", "Namibia"],
            ["Nauru", "Nauru"],
            ["Nepal", "Nepal"],
            ["Netherlands", "Netherlands"],
            ["Netherlands Antilles", "Netherlands Antilles"],
            ["New Caledonia", "New Caledonia"],
            ["New Zealand", "New Zealand"],
            ["Nicaragua", "Nicaragua"],
            ["Niger", "Niger"],
            ["Nigeria", "Nigeria"],
            ["Niue", "Niue"],
            ["Norfolk Island", "Norfolk Island"],
            ["North Korea", "North Korea"],
            ["Northern Mariana Islands", "Northern Mariana Islands"],
            ["Norway", "Norway"],
            ["Oman", "Oman"],
            ["Pakistan", "Pakistan"],
            ["Palau", "Palau"],
            ["Panama", "Panama"],
            ["Papua New Guinea", "Papua New Guinea"],
            ["Paraguay", "Paraguay"],
            ["Peru", "Peru"],
            ["Philippines", "Philippines"],
            ["Pitcairn", "Pitcairn"],
            ["Poland", "Poland"],
            ["Portugal", "Portugal"],
            ["Puerto Rico", "Puerto Rico"],
            ["Qatar", "Qatar"],
            ["Reunion", "Reunion"],
            ["Romania", "Romania"],
            ["Russia", "Russian Federation"],
            ["Rwanda", "Rwanda"],
            ["Saint Kitts and Nevis", "Saint Kitts and Nevis"],
            ["Saint Lucia", "Saint Lucia"],
            ["Saint Vincent", "Saint Vincent and the Grenadines"],
            ["Samoa", "Samoa"],
            ["San Marino", "San Marino"],
            ["Sao Tome and Principe", "Sao Tome and Principe"],
            ["Saudi Arabia", "Saudi Arabia"],
            ["Senegal", "Senegal"],
            ["Serbia", "Serbia"],
            ["Seychelles", "Seychelles"],
            ["Sierra", "Sierra Leone"],
            ["Singapore", "Singapore"],
            ["Slovakia", "Slovakia (Slovak Republic)"],
            ["Slovenia", "Slovenia"],
            ["Solomon Islands", "Solomon Islands"],
            ["Somalia", "Somalia"],
            ["South Africa", "South Africa"],
            ["South Georgia", "South Georgia and the South Sandwich Islands"],
            ["South Korea", "South Korea"],
            ["Spain", "Spain"],
            ["SriLanka", "Sri Lanka"],
            ["Saint Helena", "Saint Helena"],
            ["Saint Pierre and Miguelon", "Saint Pierre and Miquelon"],
            ["Sudan", "Sudan"],
            ["Suriname", "Suriname"],
            ["Svalbard", "Svalbard and Jan Mayen Islands"],
            ["Swaziland", "Swaziland"],
            ["Sweden", "Sweden"],
            ["Switzerland", "Switzerland"],
            ["Syria", "Syria"],
            ["Taiwan", "Taiwan, Province of China"],
            ["Tajikistan", "Tajikistan"],
            ["Tanzania", "Tanzania, United Republic of"],
            ["Thailand", "Thailand"],
            ["Togo", "Togo"],
            ["Tokelau", "Tokelau"],
            ["Tonga", "Tonga"],
            ["Trinidad and Tobago", "Trinidad and Tobago"],
            ["Tunisia", "Tunisia"],
            ["Turkey", "Turkey"],
            ["Turkmenistan", "Turkmenistan"],
            ["Turks and Caicos", "Turks and Caicos Islands"],
            ["Tuvalu", "Tuvalu"],
            ["Uganda", "Uganda"],
            ["Ukraine", "Ukraine"],
            ["United Arab Emirates", "United Arab Emirates"],
            ["United Kingdom", "United Kingdom"],
            ["United States", "United States"],
            ["United States Minor Outlying Islands", "United States Minor Outlying Islands"],
            ["Uruguay", "Uruguay"],
            ["Uzbekistan", "Uzbekistan"],
            ["Vanuatu", "Vanuatu"],
            ["Venezuela", "Venezuela"],
            ["Vietnam", "Viet Nam"],
            ["Virgin Islands (British)", "Virgin Islands (British)"],
            ["Virgin Islands (U.S)", "Virgin Islands (U.S.)"],
            ["Wallis and Futana Islands", "Wallis and Futuna Islands"],
            ["Western Sahara", "Western Sahara"],
            ["Yemen", "Yemen"],
            ["Zambia", "Zambia"],
            ["Zimbabwe", "Zimbabwe"]

        ]
    },
    getDocumentInvestorTypes() {
        return[
          "Individual",
          "Entity"
        ]
    },

    //RedSwan Specific APIs
    getRedSwanAccessToken(req) {

        return new Promise((resolve, reject) => {

            module.exports.getRedisKey(req, "RedSwanAPIPropertiesList").then(obj => {

                if (!obj) {

                    request.post(
                        {
                            url: global.config.ExternalAPILink + "/access/login",
                            headers: { 'content-type': 'application/json', },
                            json: { username: global.config.ExternalAPILinkUser, password: global.config.ExternalAPILinkPassword }
                        },
                        function (err, httpResponse, body) {
                            if (!err) {
                                resolve({
                                    idToken: body.idToken
                                })
                            } else
                                reject(err)
                        }
                    );

                } else {
                    resolve(JSON.parse(obj));
                    //params.apidata =  JSON.parse(obj);
                    //callback(null);
                }

            })
        });

    },


    getEthereumBasedProtocolIDs() {
        return ethereumBasedProtocolIDs;
    },
    isEthereumBasedProtocolID(id) {        
        return ethereumBasedProtocolIDs.includes(id);
    },
    getEthereumProtocolContractABI(protocol) {
        if (protocol == 1) {
            return require("../data/abi/rtokenid1.json").abi
        } else if (protocol == 2) {
            return require("../data/abi/polymathid2.json").abi
        } else if (protocol == 4 || protocol == 5 || protocol == 6) {
            return require("../data/abi/erc1404id4.json").abi
        }
    },
    getEthereumProtocolWhiteListABI(protocol) {
        if (protocol == 1) {
            return require("../data/abi/rtokenid1.json").whitelist;
        } else if (protocol == 2) {
            return require("../data/abi/polymathid2.json").whitelist;
        } else if (protocol == 4 || protocol == 5 || protocol == 6) {
            return require("../data/abi/erc1404id4.json").whitelist;
        }
    },


};
