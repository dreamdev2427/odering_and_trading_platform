
const async = require('async');
const fs = require('fs-extra');
const formidable = require('formidable');
const validator = require('validator');
const moment = require('moment');
const LineByLineReader = require('line-by-line');
const db = require('./db');
const logger = require('../logger');
const common = require('./common');
const emailTexts = require('../data/text.json');
const getSTOFromConfig = require('../services/getSTOFromConfig');
const math = require('mathjs');

// Circular dependency!!!
// import * as emailTextsController from '../services/platform/emails/controllers/EmailTexts.controller';


module.exports = {

	async executeSQLStatement(sql, data) {
        try {
	        const [result] = await db.execute(sql, data)
            return result
        } catch (error) {
            logger.error(`Error calling a mysql query - ${error}`);
            logger.error(`SQL - ${sql}`);
            throw error
        }
	},

	getAppParameterRecords(parameters, stoid) {
		return new Promise(((resolve, reject) => {
			const stmt = `select * from app_parameters where Param in (${parameters}) and stoid = ${stoid}`;
			module.exports.executeSQLStatement(stmt, [])
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					logger.error(`Error in mssql database module - ${error.message}`);
					reject(error);
				});
		}));
	},

	getInvestorRecordFromDatabase(data, req) {
		return new Promise(((resolve, reject) => {
			let stmt = '';
			let params = {};
            const stoid  = req.session.stoid || global.config.stos[req.hostname]?.stoid || 0; // Assume STO 0 on SaaS
			if (data.hasOwnProperty('id')) {
				//stmt = `select * from investor where id = ?`;
                stmt = `select *, DATE_FORMAT(KYCUpdateDate,'%M %d %Y') as KYCUpdateDate, DATE_FORMAT(BeneificalDOB,'%M %d %Y') as BeneificalDOBFormat, DATE_FORMAT(dob,'%M %d %Y') as DOB, DATE_FORMAT(DateIncorporation,'%M %d %Y') as DateIncorporation from investor i, investorsto s where i.id = s.investorid and s.stoid=${stoid} and i.id = ?`;
				params = [data.id];
			} else if (data.hasOwnProperty('email') && !data.hasOwnProperty('password')) {
				//stmt = `select * from investor where email = ?`;
                stmt = `select *, DATE_FORMAT(KYCUpdateDate,'%M %d %Y') as KYCUpdateDate, DATE_FORMAT(BeneificalDOB,'%M %d %Y') as BeneificalDOBFormat, DATE_FORMAT(DateIncorporation,'%M %d %Y') as DateIncorporation from investor i, investorsto s where i.id = s.investorid and i.email = ? and s.stoid = ${stoid}`;
				params = [data.email];
			} else if (data.hasOwnProperty('email') && data.hasOwnProperty('password')) {
				//stmt = `select * from investor where email = ? and password = ?`;
                stmt = `select *, DATE_FORMAT(KYCUpdateDate,'%M %d %Y') as KYCUpdateDate, DATE_FORMAT(BeneificalDOB,'%M %d %Y') as BeneificalDOBFormat, DATE_FORMAT(DateIncorporation,'%M %d %Y') as DateIncorporation from investor i, investorsto s where i.id = s.investorid and i.email = ? and i.password = ? and s.stoid = ${stoid}`;
				params = [data.email, data.password];
			}

			module.exports.executeSQLStatement(stmt, params).then((result) => {
                stmt = null;
                params = null;
				resolve(result);
            }).catch((error) => {
				logger.error(`Error in mssql database module - ${error.message}`);
				reject(error);
            });
		}));
	},
    changeInvestorKycStatus(kycCurrentStatus, kycStatus, investorId, stoId, kycExpiryDate = null, kycApplied = null){
        return new Promise(((resolve, reject) => {
            let stmt =`update investorsto set KYCUpdateDate = now() `;
            const data = [];
            if (kycApplied) {
                stmt += `, KYCApplied = ? `;
                data.push(kycApplied);
            }
            if (kycStatus !== undefined && kycStatus !== null) {
                stmt += `, isKYC = ? `;
                data.push(kycStatus);
            }
            if (kycCurrentStatus) {
                stmt += `, KYCCurrentStatus = ? `;
                data.push(kycCurrentStatus);
            }
            if (kycExpiryDate) {
                stmt += `, KycExpiryDate = ? `;
                data.push(kycExpiryDate);
            }
            if (data.length !== 0) {
                stmt += ` WHERE investorID = ?`;
                data.push(investorId);
                module.exports.executeSQLStatement(stmt, data).then((result) => {
                    resolve("done");
                }).catch((error) => {
                    logger.error(`Error in mssql database module - ${error.message}`);
                    reject(error);
                });
            } else {
                resolve("Nothing to update");
            }
        }));
    },
    updateInvestorRecordFromExternalKYC(investorRecord){
        return new Promise(((resolve, reject) => {
            let errors = "";
            if( investorRecord.firstName?.length > 60 )
                errors = errors + "First Name is > 60 characters";
            if( investorRecord.lastName?.length > 60 )
                errors = errors + "last Name is is > 60 characters";
            if( investorRecord.residencyAddress?.address?.length > 150 )
                errors = errors + "address is is > 150 characters";
            if( investorRecord.residencyAddress?.postalCode?.length > 28 )
                errors = errors + "zip is is > 28 characters";
            if( investorRecord.residencyAddress?.city?.length > 50 )
                errors = errors + "town is is > 50 characters";
            if( investorRecord.residencyAddress?.state?.length > 50 )
                errors = errors + "state is is > 50 characters";
            if( investorRecord.residencyAddress?.country?.length > 80 )
                errors = errors + "country is is > 80 characters";
            if( investorRecord.phoneNumber?.length > 30 )
                errors = errors + "phone is is > 30 characters";
            if( investorRecord.passportNumber?.length > 45 )
                errors = errors + "PassportNumber is is > 45 characters";
            if( investorRecord.nationalIdNumber?.length > 60 )
                errors = errors + "NationalID is is > 60 characters";
            if( investorRecord.dob?.length > 50)
                errors = errors + "DOB has some extra information";
            if( investorRecord.middleNames?.length > 60)
                errors = errors + "MiddleName has some extra information";

            if(errors != "") {
                logger.error(`Error in mssql database module - ${errors}`);
                reject(errors);
            }

            let stmt =`update investor set ID = ID `;
            const data = [];
            if (investorRecord.firstName) {
                stmt += `, FirstName = ? `;
                data.push(investorRecord.firstName);
            }
            if (investorRecord.middleNames) {
                stmt += `, MiddleName = ? `;
                data.push(investorRecord.middleNames);
            }
            if (investorRecord.lastName) {
                stmt += `, LastName = ? `;
                data.push(investorRecord.lastName);
            }
            if (investorRecord.passportNumber) {
                stmt += `, PassportNumber = ? `;
                data.push(investorRecord.passportNumber);
            }
            if (investorRecord.nationalIdNumber) {
                stmt += `, NationalID = ? `;
                data.push(investorRecord.nationalIdNumber);
            }
            if (investorRecord.dob) {
                stmt += `, dob = ? `;
                data.push(investorRecord.dob);
            }
            if (investorRecord.phoneNumber) {
                stmt += `, phone = ? `;
                data.push(investorRecord.phoneNumber);
            }
            if (investorRecord.residencyAddress.address) {
                stmt += `, Address = ? `;
                data.push(investorRecord.residencyAddress.address);
            }
            if (investorRecord.residencyAddress.postalCode) {
                stmt += `, zip = ? `;
                data.push(investorRecord.residencyAddress.postalCode);
            }
            if (investorRecord.residencyAddress.city) {
                stmt += `, town = ? `;
                data.push(investorRecord.residencyAddress.city);
            }
            if (investorRecord.residencyAddress.state) {
                stmt += `, State = ? `;
                data.push(investorRecord.residencyAddress.state);
            }
            if (investorRecord.residencyAddress.country) {
                stmt += `, country = ? `;
                data.push(investorRecord.residencyAddress.country);
            }
            if (investorRecord.countryCitizenship) {
                stmt += `, countryOfCitizenship = ? `;
                data.push(investorRecord.countryCitizenship);
            }
            if (investorRecord.residencyAddress.country) {
                stmt += `, taxResidencyCountry = ? `;
                data.push(investorRecord.residencyAddress.country);
            }
            if (investorRecord.socialSecurityNumber) {
                stmt += `, SocialSecurity = ? `;
                data.push(investorRecord.socialSecurityNumber);
            }
            if (investorRecord.taxIdNo) {
                stmt += `, TaxIDNo = ? `;
                data.push(investorRecord.taxIdNo);
            }
            if (data.length !== 0) {
                stmt += ` WHERE id = ?`;
                data.push(investorRecord.investorId);

                module.exports.executeSQLStatement(stmt, data).then((result) => {

                    resolve("done");

                }).catch((error) => {
                    logger.error(`Error in mssql database module - ${error.message}`);
                    reject(error);
                });
            }
            resolve("nothing to update");
        }));
    },
	updateInvestorRecord(req, calledFromInvestorWizard) {
		return new Promise(((resolve, reject) => {

                    if(global.config.KYCPersonalInfoScreen == 1) {

                                let stmt = '';
                                let todo = [];
                                let tempNotes = "";

                                // 0 means do not save public key
                                // 1 means  save public key

                                    var errors = "";
                                    if( req.body.FirstName.length > 60 )
                                        errors = errors + "First Name is > 60 characters";
                                    if( req.body.LastName.length > 60 )
                                       errors = errors + "last Name is is > 60 characters";
                                    if( req.body.Address.length > 150 )
                                        errors = errors + "address is is > 150 characters";
                                    if( req.body.zip.length > 28 )
                                       errors = errors + "zip is is > 28 characters";
                                    if( req.body.town.length > 70 )
                                       errors = errors + "town is is > 70 characters";
                                    if( req.body.state.length > 50 )
                                       errors = errors + "state is is > 50 characters";


                                    if(req.body.country != null)
                                            if( req.body.country.length > 80 )
                                               errors = errors + "country is is > 80 characters";

                                    if(req.body.countryOfCitizenship != null)
                                            if( req.body.countryOfCitizenship.length > 80 )
                                               errors = errors + "countryOfCitizenship is > 80 characters";

                                    if(req.body.DOBCountry != null)
                                            if( req.body.DOBCountry.length > 80 )
                                               errors = errors + "DOBCountry is > 80 characters";

                                    if(req.body.taxResidencyCountry != null)
                                            if( req.body.taxResidencyCountry.length > 80 )
                                               errors = errors + "taxResidencyCountry is > 80 characters";


                                    if(req.body.PoliticallyExposedPerson != null) {
                                            if( req.body.PoliticallyExposedPersonPost.length > 240 )
                                               errors = errors + " PoliticallyExposedPersonPost is > 240 characters";
									}


                                    if( req.body.phone.length > 30 )
                                       errors = errors + "phone is is > 30 characters";

                                    if(req.body.notes != null) {
                                            if( req.body.notes.length > 2000 )
                                               errors = errors + "notes is is > 2000 characters";
                                            else
                                                tempNotes = req.body.notes;
                                    }

                                    if( req.body.PassportNumber.length > 45 )
                                       errors = errors + "PassportNumber is is > 45 characters";
                                    if( req.body.NationalID.length > 60 )
                                       errors = errors + "NationalID is is > 60 characters";
                                    if(req.body.dob.length > 50)
                                       errors = errors + "DOB has some extra information";



                                      if(req.body.kinname != null) {
                                                if (calledFromInvestorWizard === 1) {
                                                    if( req.body.kinname.length > 70 )
                                                        errors = errors + "kinname is > 70 characters";
                                                    if( req.body.kinphone.length > 20 )
                                                        errors = errors + "kinphone is > 20 characters";
                                                    if( req.body.kinemail.length > 30 )
                                                        errors = errors + "kinemail is > 30 characters";
                                                }
                                      }


                                    if (req.body.investorType === '1') {           //company type investor
                                        if(req.body.companyName.length > 700)
                                             errors = errors + "companyName is is > 700 characters";
                                        if(req.body.titleWithinCompany.length > 60)
                                            errors = errors + "titleWithinCompany is is > 60 characters";
                                        if(typeof req.body.powerToBindCompany != 'undefined')
                                            if(req.body.powerToBindCompany.length > 5)
                                                 errors = errors + "powerToBindCompany is is > 3 characters";
                                    }


                                    if(errors != "") {
                                        logger.error(`Error in mssql database module - ${errors}`);
                                        reject(errors);
                                    }


                                    var dobval = "";
                                    if(req.body.investorType == "0"){
                                        if(req.body.dob == null  || req.body.dob == "" )
                                            dobval = null;
                                        else {
                                            dobval = req.body.dob;
                                        }
                                    } else
                                        dobval = null;


                                    var countryOfCitizenship = "";
                                    if(req.body.countryOfCitizenship != null)
                                        countryOfCitizenship = req.body.countryOfCitizenship


									var PoliticallyExposedPerson = 0;
									var PoliticallyExposedPersonPost = ""
                                    if(req.body.PoliticallyExposedPerson != null) {
										 PoliticallyExposedPerson = 1;
										 PoliticallyExposedPersonPost = req.body.PoliticallyExposedPersonPost;
									}


									var TaxIDNo = ""
									if(req.body.TaxIDNo != null)
										TaxIDNo = req.body.TaxIDNo;


                                    stmt = 'Update investor set FirstName=?, LastName=?, Address=?, zip=?, town=?, state=?, country=?, taxResidencyCountry=?, phone=?, PassportNumber=?, NationalID=?, dob=?, countryOfCitizenship = ?, PoliticallyExposedPerson= ?, PoliticallyExposedPersonPost= ?, TaxIDNo = ?';
                                    todo = [req.body.FirstName.trim(), req.body.LastName.trim(), req.body.Address.trim(), req.body.zip.trim(), req.body.town.trim(), req.body.state.trim(), req.body.country.trim(), req.body.country.trim(), req.body.phone.trim(), req.body.PassportNumber.trim(), req.body.NationalID.trim(), dobval, countryOfCitizenship, PoliticallyExposedPerson, PoliticallyExposedPersonPost, TaxIDNo];



                                    if(req.body.dividendPeriod != null) {        //1 = Quarterly        2= Yearly
                                            stmt = `${stmt} , dividendPeriod=? `;
                                            todo.push(req.body.dividendPeriod);
                                    }


                                    if(req.body.DOBCountry != null) {
                                            stmt = `${stmt} , DOBCountry=? `;
                                            todo.push(req.body.DOBCountry);
                                    }


                                    if(req.body.taxResidencyCountry != null) {
                                            stmt = `${stmt} , taxResidencyCountry=? `;
                                            todo.push(req.body.taxResidencyCountry);
                                    }



                                    if (req.body.investorType === '1') {         //company type investor
                                        stmt = `${stmt} ,CompanyName=?, TitleWithinCompany=?, PowerToBindCompany=? `;
                                        todo.push(req.body.companyName.trim());
                                        todo.push(req.body.titleWithinCompany.trim());

                                        if (typeof req.body.powerToBindCompany !== 'undefined') {
                                            todo.push(1);
                                        } else {
                                            todo.push(0);
                                        }
                                    }


                                      if(req.body.kinname != null) {
                                            if (calledFromInvestorWizard === 1) {
                                                //text sizes already checked above
                                                stmt = `${stmt} ,kinname=?, kinphone=?, kinemail=? `;
                                                todo.push(req.body.kinname.trim());
                                                todo.push(req.body.kinphone.trim());
                                                todo.push(req.body.kinemail.trim());
                                            }
                                      }

                                stmt = `${stmt} where ID=?`;


                                const stoid  = req.session.stoid || global.config.stos[req.hostname].stoid;


                                if (calledFromInvestorWizard === 0) {
                                            // This section is called when STO admin is editing or adding investor information.
                                            //  bHere a check m ust be implemented that investor belong to the STO
                                            // Alos investor id comes in as body parameter
                                            todo.push(req.body.ID);


                                            module.exports.executeSQLStatement("select id from investorsto where investorid = ? and stoid = ?", [req.body.ID, stoid]).then((result) => {


                                                if(result.length > 0) {
                                                        module.exports.executeSQLStatement(stmt, todo).then((result) => {

                                                                module.exports.executeSQLStatement("update investorsto set notes =? where investorid = ? and stoid = ?", [tempNotes, req.body.ID, stoid]).then((result) => {
                                                                    resolve(result);
                                                                }).catch((error) => {
                                                                    logger.error(`Error in mssql database module - ${error.message}`);
                                                                    reject(error);
                                                                });

                                                        }).catch((error) => {
                                                            logger.error(`Error in mssql database module - ${error.message}`);
                                                            reject(error);
                                                        });
                                                } else {
                                                    logger.error(`Somebody is trying to save investor data wbo does not belong to this STO`);
                                                    reject(error);
                                                }

                                            }).catch((error) => {
                                                logger.error(`Error in mssql database module - ${error.message}`);
                                                reject(error);
                                            });

                                } else {
                                        //This section is being called by investor dashboard and investor must be logged in
                                        //take investor id from user session
                                        todo.push(req.session.user.ID);

                                        module.exports.executeSQLStatement(stmt, todo).then((result) => {

                                                module.exports.executeSQLStatement("update investorsto set notes =? where investorid = ? and stoid = ?", [tempNotes, req.session.user.ID, stoid]).then((result) => {
                                                    resolve(result);
                                                }).catch((error) => {
                                                    logger.error(`Error in mssql database module - ${error.message}`);
                                                    reject(error);
                                                });

                                        }).catch((error) => {
                                            logger.error(`Error in mssql database module - ${error.message}`);
                                            reject(error);
                                        });

                                }

                    } else if( global.config.KYCPersonalInfoScreen == 2 ) {     //RedSwan Implementation

                            if (req.body.investorType === '1') {         // company type investor

                                var GovtIDNoIsTaxNotmp = 0;

                                if (typeof req.body.GovtIDNoIsTaxNo !== 'undefined')
                                    GovtIDNoIsTaxNotmp = 1;
                                else
                                    GovtIDNoIsTaxNotmp = 0;

                                var errors = "";

                                if(req.body.companyName.length > 70 )
                                    errors = errors + "Red Swan Company Name > 70 characters";
                                if(req.body.Address.length > 200 )
                                    errors = errors + "Red Swan Address  > 200  characters";
                                if(req.body.zip.length > 30 )
                                    errors = errors + "Red Swan  zip >  characters";
                                if(req.body.town.length > 50 )
                                    errors = errors + "Red Swan town > 50  characters";
                                if(req.body.state.length > 50 )
                                    errors = errors + "Red Swan  state 50 >  characters";
                                if(req.body.country.length > 200 )
                                    errors = errors + "Red Swan  country > 200 characters";
                                if(req.body.TrustOrBusinessEntity.length > 10 )
                                    errors = errors + "Red Swan TrustOrBusinessEntity  > 10  characters";
                                if(req.body.DateIncorporation.length > 70 )
                                    errors = errors + "Red Swan DateIncorporation  70 >  characters";
                                if(req.body.TaxIDNo.length > 60 )
                                    errors = errors + "Red Swan TaxIDNo > 60  characters";
                                if(req.body.GovtIDNo.length > 70 )
                                    errors = errors + "Red Swan  GovtIDNo > 70  characters";
                                if(req.body.NamePrimaryContact.length > 70 )
                                    errors = errors + "Red Swan NamePrimaryContact  > 70  characters";
                                if(req.body.PhonePrimaryContact.length > 70 )
                                    errors = errors + "Red Swan  PhonePrimaryContact > 70 characters";
                                if(req.body.EmailPrimaryContact.length > 100 )
                                    errors = errors + "Red Swan EmailPrimaryContact  > 100 characters";
                                if(req.body.NameSecondaryContact.length > 70 )
                                    errors = errors + "Red Swan NameSecondaryContact  > 70 characters";
                                if(req.body.PhoneSecondaryContact.length > 70 )
                                    errors = errors + "Red Swan PhoneSecondaryContact  >70   characters";
                                if(req.body.EmailSecondaryContact.length > 100 )
                                    errors = errors + "Red Swan EmailSecondaryContact  > 100  characters";
                                if(req.body.PrincipalCountryOfBusiness.length > 240 )
                                    errors = errors + "Red Swan PrincipalCountryOfBusiness  > 240 characters";
                                if(req.body.ID.length > 20 )
                                    errors = errors + "Red Swan ID > 20  characters";

                                    if(errors != "") {
                                        logger.error(`Error in mssql database module - ${errors}`);
                                        reject(errors);
                                    }

                                    const stmt = "update investor set CompanyName = ?, Address = ?, Zip = ?, town = ?, state = ?, country = ?, TrustOrBusinessEntity = ?, DateIncorporation = ?, TaxIDNo = ?, GovtIDNo = ?, GovtIDNoIsTaxNo = ?,  NamePrimaryContact = ?, PhonePrimaryContact = ?, EmailPrimaryContact = ?, NameSecondaryContact = ?,  PhoneSecondaryContact = ?, EmailSecondaryContact = ?, PrincipalCountryOfBusiness = ? where id = ?";

                                    let data = [   req.body.companyName, req.body.Address, req.body.zip, req.body.town, req.body.state, req.body.country, req.body.TrustOrBusinessEntity, req.body.DateIncorporation, req.body.TaxIDNo, req.body.GovtIDNo, GovtIDNoIsTaxNotmp, req.body.NamePrimaryContact, req.body.PhonePrimaryContact, req.body.EmailPrimaryContact, req.body.NameSecondaryContact, req.body.PhoneSecondaryContact, req.body.EmailSecondaryContact, req.body.PrincipalCountryOfBusiness, req.body.ID   ]


                                    module.exports.executeSQLStatement(stmt, data).then((result) => {

                                            resolve("done");

                                    }).catch((error) => {
                                        logger.error(`Error in mssql database module - ${error.message}`);
                                        reject(error);
                                    });


                            } else {                    // individual type investor

                                var RetirementAccounttmp = 0;

                                if (typeof req.body.RetirementAccount !== 'undefined')
                                    RetirementAccounttmp = 1;
                                else
                                    RetirementAccounttmp = 0;


                                var errors = "";
                                if( req.body.FirstName.length > 60 )
                                    errors = errors + "First Name is > 60 characters";
                                if( req.body.LastName.length > 60 )
                                   errors = errors + "last Name is is > 60 characters";
                                if( req.body.Address.length > 150 )
                                    errors = errors + "address is is > 150 characters";
                                if( req.body.zip.length > 28 )
                                   errors = errors + "zip is is > 28 characters";
                                if( req.body.town.length > 50 )
                                   errors = errors + "town is is > 50 characters";
                                if( req.body.state.length > 50 )
                                   errors = errors + "state is is > 50 characters";
                                if( req.body.country.length > 80 )
                                   errors = errors + "country is is > 80 characters";
                                if( req.body.phone.length > 30 )
                                   errors = errors + "phone is is > 30 characters";
                                if( req.body.PassportNumber.length > 45 )
                                   errors = errors + "PassportNumber is is > 45 characters";
                                if( req.body.NationalID.length > 60 )
                                   errors = errors + "NationalID is is > 60 characters";
                                if(req.body.dob.length > 50)
                                   errors = errors + "DOB has some extra information";
                                if(req.body.MiddleName.length > 60)
                                   errors = errors + "MiddleName has some extra information";
                                if(req.body.SocialSecurity.length > 45)
                                   errors = errors + "SocialSecurity has some extra information";
                                if(req.body.MailingAddress.length > 150)
                                   errors = errors + "MailingAddress has some extra information";
                                if(req.body.FaxNumber.length > 30)
                                   errors = errors + "FaxNumber has some extra information";
                                if(req.body.MaritalStatus.length > 10)
                                   errors = errors + "MaritalStatus has some extra information";
                                if(req.body.Occupation.length > 30)
                                   errors = errors + "Occupation has some extra information";
                                if(req.body.EmployerName.length > 91)
                                   errors = errors + "EmployerName has some extra information";
                                if(req.body.EmployerAddress.length > 200)
                                   errors = errors + "EmployerAddress has some extra information";
                                if(req.body.ID.length > 20 )
                                    errors = errors + "Red Swan ID > 20  characters";


                                    if(errors != "") {
                                        logger.error(`Error in mssql database module - ${errors}`);
                                        reject(errors);
                                    }





                                    const stmt = "update investor set FirstName = ?, MiddleName = ?, LastName = ?, PassportNumber = ?, NationalID = ?, dob = ?, phone = ?, Address = ?, zip = ?, town = ?, State = ?, country= ?, SocialSecurity = ?, MailingAddress = ?, FaxNumber = ?, MaritalStatus = ?, Occupation = ?, EmployerName = ?, EmployerAddress = ?, RetirementAccount = ? where id = ?";



                                    let data = [   req.body.FirstName, req.body.MiddleName, req.body.LastName, req.body.PassportNumber, req.body.NationalID, req.body.dob, req.body.phone, req.body.Address, req.body.zip, req.body.town, req.body.state, req.body.country, req.body.SocialSecurity, req.body.MailingAddress, req.body.FaxNumber, req.body.MaritalStatus, req.body.Occupation, req.body.EmployerName, req.body.EmployerAddress, RetirementAccounttmp, req.body.ID  ];


                                    module.exports.executeSQLStatement(stmt, data).then((result) => {

                                            resolve("done");

                                    }).catch((error) => {
                                        logger.error(`Error in mssql database module - ${error.message}`);
                                        reject(error);
                                    });

                            }

                    }



		}));
	},

    checkPublicKeyAlreadyTaken(req, res, publicKey, investorID) {
        return new Promise((resolve, reject) => {
            if (publicKey === '') {
                resolve('ok');
                return;
            }

            function checkInvestorPublicKey(callback) {
                const sql = 'select * from investorsto where PublicKey = ?';
                module.exports.executeSQLStatement(sql, [publicKey]).then((result) => {
                    if (result.length > 0) { callback('Error'); } else { callback(null); }
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in checkPublicKeyAlreadyTaken checkInvestorPublicKey`);
                });
            }
            function checkForCompanyPublicKey(callback) {
                  /*module.exports.getAppParameterRecords("'Distribution'").then((result) => {
                      if (common.getAppParameterFromDataSet(result, 'Distribution').ValueString === publicKey) {
                          callback('Error');
                      } else {
                          callback(null);
                      }
                  }).catch((error) => {
                      common.handleError(req, res, `${error.toString()} - Error occured in checkPublicKeyAlreadyTaken checkForCompanyPublicKey`);
                  });*/
                //TODO:     apply this check
                callback(null);
            }
            function checkKeysAlreadyApplied(callback) {
                const sql = 'select * from changeaddresserequest where PublicKey = ?';
                module.exports.executeSQLStatement(sql, [publicKey]).then((result) => {
                    if (result.length > 0) { callback('Error'); } else { callback(null); }
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in checkPublicKeyAlreadyTaken checkInvestorPublicKey`);
                });
            }
            async.waterfall([
                checkInvestorPublicKey,
                checkForCompanyPublicKey,
                checkKeysAlreadyApplied,
            ], (err) => {
                if (err) {
                    reject('Error');
                } else {
                    resolve('ok');
                }
            });
        });
    },
    initializeGlobals() {
        return new Promise((resolve, reject) => {

            function loadSTOS(callback) {
                const sql = 'select * from stos';
                module.exports.executeSQLStatement(sql, []).then((result) => {
                    const stos = {};
                    var tempPassword = "";

                    async.eachSeries(result, function(rec, callback2) {
                          function decryptPassword(callbackPass) {
                              if(rec.SMTP_Password == null || rec.SMTP_Password == "") {
                                  tempPassword = "";
                                  callbackPass(null);
                              } else {
                                  common.decryptAsync(rec.SMTP_Password).then((pass) => {
                                      tempPassword = pass;
                                      callbackPass(null);
                                  }).catch((error) => {
                                    logger.debug(`${error.message} Error occured in initializeGlobals loadSTOS`);
                                    reject(error.message);
                                  });
                              }
                          }
                          async.waterfall([
                            decryptPassword
                          ], function (err) {
                                const info = {
                                    stoid: rec.ID,
                                    title: rec.title,
                                    disclamer: rec.disclamer,
                                    logo: rec.logo,
                                    stolink: rec.stolink,
                                    stolinkfull: rec.stolinkfull,
                                    stoType: rec.stoType,               //0=both     1=only blockchain     2=only non-blockchain
                                    stoinvestortypes: JSON.parse(rec.stoinvestortypes),
                                    stoinvestortypesnotonshareregister: JSON.parse(rec.stoinvestortypesnotonshareregister),
                                    emailFooter: rec.emailFooter,
                                    website: rec.website,
                                    SMTP_Host: rec.SMTP_Host,
                                    SMTP_Port: rec.SMTP_Port,
                                    SMTP_User: rec.SMTP_User,
                                    SMTP_Password: tempPassword,
                                    SMTP_FromAddress: rec.SMTP_FromAddress,
                                    SMTP_FromName: rec.SMTP_FromName,
                                    companytype: rec.companytype,
                                    settings : JSON.parse(rec.settings),
                                    VerifyInvestorComHostToken: rec.VerifyInvestorComHostToken
                                }
                                stos[rec.stolink] = info;
                                callback2(null);
                          });

                    }, function(err){
                       if (err) {
                           logger.error(err);
                       } else {
                            global.config.stos = stos;
                            callback(null)
                       }
                    });

                }).catch((error) => {
                    logger.debug(`${error.message} Error occured in mysql initializeGlobals loadSTOS`);
                    reject(error.message);
                });
            }
            function loadStoinvestortypes(callback) {
                const types = {};
                const sql = 'select * from stoinvestortype';
                module.exports.executeSQLStatement(sql, []).then((result) => {
                    for(var k in result) {
                        types[result[k].id] = result[k].type;
                    }

                    global.config.stoinvestortype = types;
                    callback(null);
                }).catch((error) => {
                    logger.debug(`${error.message} Error occured in mysql initializeGlobals loadStoinvestortypes`);
                    reject(error.message);
                });
            }
            function loadglobalvariablefromdb(callback) {
                const sql = 'select * from params where isglobal = 1';
                module.exports.executeSQLStatement(sql, []).then((result) => {
                    for(var k in result) {
                        if(result[k].datatype == 1)
                            global.config[result[k].param] = result[k].stringValue;
                        else if(result[k].datatype == 2)
                            global.config[result[k].param] = result[k].intValue;
                        else if(result[k].datatype == 3) {
                            try {
                                global.config[result[k].param] = JSON.parse(result[k].stringValue);
                            } catch (e) {
                                throw new Error(`Bad JSON in DB param '${result[k].param}': ${e}`);
                            }
                        }
                    }

                    callback(null);
                }).catch((error) => {
                    logger.debug(`${error.message} Error occured in mysql initializeGlobals loadglobalvariablefromdb`);
                    reject(error.message);
                });
            }
            function loadCurrencySymbols(callback) {
                const sql = 'select id, symbol from currency';
                module.exports.executeSQLStatement(sql, []).then((result) => {
                    const currency1 = {};
                    result.forEach((obj)=> {
                        currency1[obj.id] = obj.symbol;
                    });

                    global.config.currency = currency1;
                    callback(null);
                }).catch((error) => {
                    logger.debug(`${error.message} Error occured in mysql initializeGlobals loadglobalvariablefromdb`);
                    reject(error.message);
                });
            }
            async.waterfall([
                loadSTOS,
                loadStoinvestortypes,
                loadglobalvariablefromdb,
                loadCurrencySymbols
            ], (err) => {
                resolve("done");
            });

        });
    },

	changePassword(req) {
        //this is used to set login admin (STO and Platform) to chaneg thier password.

        return new Promise((resolve, reject) => {
            function getUserRecord(callback) {
                const stmt = 'Select Password from users where ID = ?';
                module.exports.executeSQLStatement(stmt, [req.session.user.ID])
                    .then((result) => {
                        const params = {};
                        params.user = result[0];
                        callback(null, params);
                    })
                    .catch((error) => {
                        logger.debug(`${error.message} Error occured in mysql changePassword getUserRecord`);
                        reject(error.message);
                    });
            }
            function checkPasswords(params, callback) {
                if (params.user.Password !== common.getSHA256Hash(req.body.oldpassword)) {
                    //req.flash('message', 'Old password is not correct');
                    resolve(2);
                }

                if (req.body.newPassword === '') {
                    //req.flash('message', 'Password cannot be empty');
                    resolve(3);
                }

                if (req.body.newPassword !== req.body.retypeNewPassword) {
                    //req.flash('message', 'Re-type password is not correct');
                    resolve(4);
                }

                callback(null, params);
            }
            function changePassword2(params, callback) {
                const stmt = 'Update users set password = ? where ID = ?';
                module.exports.executeSQLStatement(stmt, [common.getSHA256Hash(req.body.newPassword), req.session.user.ID])
                    .then(() => {
                        //req.flash('message', 'Password changed');
                        callback(null, params);
                    })
                    .catch((error) => {
                        logger.debug(`${error.message} Error occured in mysql changePassword changePassword2`);
                        reject(error.message);
                    });
            }
            async.waterfall([
                getUserRecord,
                checkPasswords,
                changePassword2,
            ], (err, params) => {
                if (!err) {
                    resolve(1);
                } else {
                    logger.debug(`${error.message} Error occured in mysql changePassword`);
                    reject(error.message);
                }
            });
        });
	},

    generateBrokerID(req, brokerID) {
        return new Promise((resolve, reject) => {
                const sql = "UPDATE brokers SET brokerID = ? WHERE ID = ?";
                module.exports.executeSQLStatement(sql, [brokerID, req.session.user.ID]).then((result) => {
                    resolve("done");
                }).catch((error) => {
                    logger.debug(`${error.message} Error occurred in mysql generateBrokerID updateDatabaseInformation`);
                    reject(error.message);
                });
        });
    },

    updateDisclaimer(req, res, stoid) {
      return new Promise((resolve, reject) => {
        const sql = 'update stos set disclamer = ? where id = ?';
        module.exports.executeSQLStatement(sql, [req.body.txtDisclaimer, req.body.stoid]).then((result) => {
          resolve("done");
        }).catch((error) => {
          common.handleError(req, res, `${error.toString()} - Error occured in mysql updateDisclaimer updateDatabaseInformation`);
        });
      });
    },
    updateEmailFooter(req, res, stoid) {
      return new Promise((resolve, reject) => {
        const sql = 'update stos set emailFooter = ? where id = ?';
        module.exports.executeSQLStatement(sql, [req.body.txtFooter, req.body.stoid]).then((result) => {
          resolve("done");
        }).catch((error) => {
          common.handleError(req, res, `${error.toString()} - Error occurred in mysql updateEmailFooter updateDatabaseInformation`);
        });
      });
    },
    updateRegistrationText(req, stoid) {
        return new Promise((resolve, reject) => {
                const sql = 'update stos set registrationtext = ? where id = ?';
                module.exports.executeSQLStatement(sql, [req.body.txtregistrationtext, stoid]).then((result) => {
                    resolve("done");
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in mysql updateRegistrationText updateDatabaseInformation`);
                });
        });
    },
    updateRegistrationSuccessText(req, stoid) {
        return new Promise((resolve, reject) => {
                const sql = 'update stos set registrationsuccesstext = ? where id = ?';
                module.exports.executeSQLStatement(sql, [req.body.txtsuccesstext, stoid]).then((result) => {
                    resolve("done");
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in mysql updateRegistrationSuccessText`);
                });
        });
    },
    updateTellAFriend(req, stoid) {
        return new Promise((resolve, reject) => {
                const sql = 'update stos set tellafriendtext = ? where id = ?';
                module.exports.executeSQLStatement(sql, [req.body.txttellafriend, stoid]).then((result) => {
                    resolve("done");
                }).catch((error) => {
                    logger.debug(`${error.message} Error occured in mysql updateTellAFriend`);
                });
        });
    },
    updateEmailInvestorBulkUpload(req, stoid) {
        return new Promise((resolve, reject) => {
            const sql = 'update stos set EmailTxtInvestorBulkUpload = ? where id = ?';
            module.exports.executeSQLStatement(sql, [req.body.txtinvestorbulkupload, stoid]).then((result) => {
                resolve("done");
            }).catch((error) => {
                logger.debug(`${error.message} Error occured in mysql updateTellAFriend`);
            });
        });
    },

    updateFileInLocation(req, filepathandname) {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            const params = {};
            form.parse(req);

            form.on('fileBegin', (name, file) => {
                // begin file uploadings
                const rawData = fs.readFileSync(file.path)
                const newPath = path.join(__dirname, 'uploads', 'newsletters') + '/' + file.name
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                    params['filename'] = file.name
                    return res.send("Successfully uploaded")
                })
            }).on('field', (name, value) => {
                // this contains each file/value received from HTML FORM or query string
                params[name] = value;
            }).on('error', (err) => {
                logger.error(`${err} - error occured in mysql updateFileInLocation`);
                reject(err);
            }).on('aborted', () => {
                // if user aborted the request
            }).on('end', () => {
                // file(s) / fields  has been received an this is the end of all data received from user
                resolve(params);
            });
        });
    },

    getMeetingData(id, hostname) {
        return new Promise((resolve, reject) => {
              const params = {}
              /* execute one SQL to get all Meeting data    meeting data is in different table  and this one statement will get all record
               Meeting Data consit of       1. Meeting Record         2. Multiple Agenda Items       3. Each Agenda Items has multiple file
               that means if a meeting has 2 agenda items and each agenda items has 2 documents then this SQL will return 4 records in this  format             Meeting Record     Agenda Item 1    Doc 1
                                 Meeting Record     Agenda Item 1    Doc 2
                                 Meeting Record     Agenda Item 2    Doc 1
                                 Meeting Record     Agenda Item 2    Doc 2
              /*/

              function getDBMeetingRecord(callback) {
                    const sql = `SELECT v.id as meetingID, v.isVotingOpenForProxy, v.secretaccesscode, v.title, v.contents, v.place, v.nameResponsiblePerson, v.phoneResponsiblePerson, v.phoneResponsiblePerson, v.nameProxyPerson, v.phoneProxyPerson, v.emailProxyPerson, v.opendate, v.closedate, DATE_FORMAT(v.opendate,'%M %d %Y') as openonlydate, DATE_FORMAT(date_add(opendate, interval v.timepadding minute), '%H:%i') as starttime, DATE_FORMAT(date_add(closedate, interval v.timepadding minute), '%H:%i') as closetime, v.totalInvestors, v.totalShares, v.totalNominalShares,  o.ID as optionID, o.optiontxt as meetingoptiontext, o.id as meetingoptionid, o.description as meetingoptiondesc, o.CompanyComments, d.documentlink, d.title as documentTitle, d.ID as DocumentID, d.description as documentDescription, d.id as documentID, z.title as timezonetitle, z.timezone as timezone, o.isActiveByAdmin, o.isItemCurrentlyDiscussing FROM voting v left join votingoptions o  on v.id = o.votingid  left join votingdocuments d  on o.id = d.votingoptionid left join timezone z on z.id = v.timezoneid where v.id = ? order by o.id`;
                    module.exports.executeSQLStatement(sql, [id]).then((result) => {
                        if(result.length == 0)
                            reject("Meeting id does not belong to STO. please check why this happen");
                        else {
                            params.Record = result;
                            callback(null);
                        }

                    }).catch((error) => {
                        reject(error);
                    });
              }
              function prepareRecord(callback) {
                  /*
                        In this function records are for formatted in this form
                        {   MeetingRecord: {   }
                            AgendaItems: [
                                { field: val,
                                  field: val,
                                  documents: [ doc1, doc 2 ]
                            ]
                        }
                  */

                  params.MeetingRecord = {};
                  params.MeetingRecord.meetingID = params.Record[0].meetingID;
                  params.MeetingRecord.title = params.Record[0].title;
                  params.MeetingRecord.secretaccesscode = params.Record[0].secretaccesscode;
                  params.MeetingRecord.contents = params.Record[0].contents;
                  params.MeetingRecord.place = params.Record[0].place;
                  params.MeetingRecord.timezonetitle = params.Record[0].timezonetitle;
                  params.MeetingRecord.timezone = params.Record[0].timezone;


                  params.MeetingRecord.openonlydate = params.Record[0].openonlydate;
                  params.MeetingRecord.starttime = params.Record[0].starttime;
                  params.MeetingRecord.closetime = params.Record[0].closetime;

                  params.MeetingRecord.nameResponsiblePerson = params.Record[0].nameResponsiblePerson;
                  params.MeetingRecord.phoneResponsiblePerson = params.Record[0].phoneResponsiblePerson;
                  params.MeetingRecord.phoneResponsiblePerson = params.Record[0].phoneResponsiblePerson;
                  params.MeetingRecord.nameProxyPerson = params.Record[0].nameProxyPerson;
                  params.MeetingRecord.phoneProxyPerson = params.Record[0].phoneProxyPerson;
                  params.MeetingRecord.emailProxyPerson = params.Record[0].emailProxyPerson;
                  params.MeetingRecord.isVotingOpenForProxy = params.Record[0].isVotingOpenForProxy;
                  params.MeetingRecord.open = common.checkTimePeriod(params.Record[0].opendate ,params.Record[0].closedate);

                  params.MeetingRecord.totalInvestors = params.Record[0].totalInvestors;
                  params.MeetingRecord.totalShares = params.Record[0].totalShares;
                  params.MeetingRecord.totalNominalShares = params.Record[0].totalNominalShares;

                  params.MeetingRecord.currentItemBeingDiscussed = params.Record[0].meetingoptionid;

                  params.AgendaItems = [];
                  var lastID = 0;
                  var currentindex = -1;
                  params.Record.forEach((obj) => {
                      if(obj.meetingoptionid != lastID) {
                          lastID = obj.meetingoptionid;
                          currentindex = currentindex + 1;
                          params.AgendaItems.push({});
                          params.AgendaItems[currentindex].CompanyComments = obj.CompanyComments;
                          params.AgendaItems[currentindex].optionID = obj.meetingoptionid;
                          params.AgendaItems[currentindex].title = obj.meetingoptiontext;
                          params.AgendaItems[currentindex].desc = obj.meetingoptiondesc;
                          params.AgendaItems[currentindex].documents = [];
                          params.AgendaItems[currentindex].meetingID = obj.meetingID;
                          params.AgendaItems[currentindex].optionID = obj.optionID;
                          params.AgendaItems[currentindex].isActiveByAdmin = obj.isActiveByAdmin;
                          params.AgendaItems[currentindex].isItemCurrentlyDiscussing = obj.isItemCurrentlyDiscussing;

                          if(obj.isItemCurrentlyDiscussing == 1)
                              params.MeetingRecord.currentItemBeingDiscussed = obj.meetingoptionid;
                      }
                      if(obj.documentID != null) {
                            params.AgendaItems[currentindex].documents.push({ title: obj.documentTitle, desc: obj.documentDescription, id: obj.documentID   });
                      }
                  });

                  delete params.Record;

                  callback(null);
              }
              async.waterfall([
                getDBMeetingRecord,
                prepareRecord
              ], function (err) {
                  resolve(params);
              });
        })
    },
    sendMeetingLinkToProxyPerson(req, id) {
        return new Promise((resolve, reject) => {

            const stoid  = req.session.stoid || global.config.stos[req.hostname].stoid;


            const sql = `select *, DATE_FORMAT(v.opendate,'%M %d %Y') as openonlydate, DATE_FORMAT(date_add(opendate, interval v.timepadding minute), '%H:%i') as starttime, DATE_FORMAT(date_add(closedate, interval v.timepadding minute), '%H:%i') as closetime from voting v where id = ? and stoid=${stoid}`;
            module.exports.executeSQLStatement(sql, [id]).then((data) => {

                if(data.length == 0)
                    reject("Meeting id does not belong to STO. please check why this happen");
                else {
                // Circular dependency with mysql module !!!
                //   const stoEmailTexts = emailTextsController.default.globalEmailTexts(stoid);
                //   if (!stoEmailTexts) throw new Error(`Email texts not found for MeetingNotificationToProxy`);

                //   let txtEmail = emailTextsController.format(stoEmailTexts.MeetingNotificationToProxy.Line1, {
                //     username: data[0].nameProxyPerson,
                //     title: data[0].title,
                //     date: data[0].openonlydate,
                //     start: data[0].starttime,
                //     end: data[0].closetime,
                //     place: data[0].place,
                //     person: `${data[0].nameResponsiblePerson} (${data[0].phoneResponsiblePerson})`,
                //     link: `${global.config.stos[req.hostname].stolinkfull}/proxy?id=${data[0].secretaccesscode}`
                //   });
                //   txtEmail += '<br /><br />';
                //   txtEmail += getSTOFromConfig(stoid).emailFooter;

                    let txtEmail = '';
                    txtEmail = `Dear ${data[0].nameProxyPerson} <br /><br />`;
                    txtEmail += `${emailTexts.MeetingNotificationToProxy.Line1} <br /><br />`;
                    txtEmail += `<b>${data[0].title}</b> <br /><br />`;
                    txtEmail += `<b>Date</b> : ${data[0].openonlydate} <br /><br />`;
                    txtEmail += `<b>Time</b> : ${data[0].starttime} to ${data[0].closetime} <br /><br />`;
                    txtEmail += `<b>Place</b> : ${data[0].place} <br /><br />`;
                    txtEmail += `<b>Responsible Person</b> : ${data[0].nameResponsiblePerson} (${data[0].phoneResponsiblePerson}) <br /><br />`;
                    txtEmail += `<b>Link</b> : ${global.config.stos[req.hostname].stolinkfull}/proxy?id=${data[0].secretaccesscode} <br /><br /><br />`;
                    txtEmail += global.config.stos[req.hostname].emailFooter;

                    common.sendEmail(req.hostname, data[0].emailProxyPerson, emailTexts.MeetingNotificationToProxy.Subject, txtEmail, []).then(() => {
                        resolve("done");
                    }, (err) => {
                        if (err) logger.error(`${err.message} - Error occured in sendMeetingLinkToProxyPerson`);
                        reject(err);
                    });
                }

            }).catch((error) => {
                reject(error);
            });
        });
    },
    getVotingDetails(id, stononregisteredid) {
        return new Promise((resolve, reject) => {
            const params = {};

            function loadParameters(callback) {
                  //get total issues  shares/investment  and  expected shares/investment  to current investors
                  const sql = `select sum(s.shares) as TotalShares, sum( p.premimum * s.shares) as TotalInvestment from shares s, sharetypes p where s.shareTypeid = p.id and p.isVotingRightsApplicable = 1
                  ;\
                  select sum(expectedShares) as expectedshares, sum(expectedInvestment) as expectedinvestment from investor i, investorsto t where i.id = t.investorid and t.isKYC = 1 and t.KYCCurrentStatus in (?)`;
                  module.exports.executeSQLStatement(sql, [stononregisteredid, id]).then((result) => {
                        params.inhandTokens = result[0][0].TotalShares;
                        params.inhandInvestment = result[0][0].TotalInvestment;

                        params.expectedshares = result[1][0].expectedshares;
                        params.expectedinvestment = result[1][0].expectedinvestment;

                        params.totalTokens = math.sum(params.inhandTokens ?? 0, params.expectedshares ?? 0);
                        params.totalInvestment = math.sum(params.inhandInvestment ?? 0, params.expectedinvestment ?? 0);
                        callback(null);
                  }).catch((error) => {
                      logger.debug(`${error.message} Error occured in mysql getVotingDetails getDatabaseInformation`);
                      reject(error.message);
                  });
			}
            function getDatabaseInformation(callback) {
                  const sql = `select id, title, votetype, DATE_FORMAT(opendate,'%M %d %Y') as opendate, opendate as DBOpenDate,  DATE_FORMAT(closedate,'%M %d %Y') as closedate, closedate as DBCloseDate, contents from voting where id = ?`;
                  module.exports.executeSQLStatement(sql, [id]).then((result) => {
                      if(result.length == 0)
                          reject("voting id does not belong to STO. check why user access this id");
                      else {
                          params.Record = result[0];
                          params.open = common.checkTimePeriod(result[0].DBOpenDate, result[0].DBCloseDate);
                          callback(null);
                      }

                  }).catch((error) => {
                      logger.debug(`${error.message} Error occured in mysql getVotingDetails getDatabaseInformation`);
                      reject(error.message);
                  });
              }
            function getStatistics(callback) {
                  const sql = `select count(*) as count from votinguser where votingid = ?
                  ;\
                  select count(*) as count from investor i, investorsto t where i.id = t.investorid and t.iskyc=1`;
                  module.exports.executeSQLStatement(sql, [id]).then((result) => {
                      params.VotesCasted = result[0][0].count;
                      params.TotalInvestorsInSTO = result[1][0].count;
                      callback(null);
                  }).catch((error) => {
                      logger.debug(`${error.message} Error occured in mysql getVotingDetails getStatistics`);
                      reject(error.message);
                  });
            }
            function getOptionCount(callback) {
                  const sql = `SELECT id, optiontxt, (SELECT COUNT(id) FROM  votinguser WHERE votinguser.votingoptionsid = votingoptions.id) as 'count' FROM votingoptions where votingid = ?  order by id`;
                  module.exports.executeSQLStatement(sql, [id]).then((result) => {
                      params.OptionRecord = result;

                      for (let i = 0; i < params.OptionRecord.length; i++) {
                            params.OptionRecord[i].PercentInvestorCount = ((params.OptionRecord[i].count / params.TotalInvestorsInSTO) * 100).toFixed(2).toString();
                      }

                      callback(null);
                  }).catch((error) => {
                      logger.debug(`${error.message} Error occured in mysql getVotingDetails getOptionCount`);
                      reject(error.message);
                  });
            }
            function getSharesCount(callback) {
                  const sql = `SELECT id, optiontxt, (SELECT COALESCE(sum(votesContributed),0) FROM votinguser where votingid = ? and votingoptionsid = votingoptions.id) as 'count', (SELECT COALESCE(sum(investmentContributed),0) FROM votinguser where votingid = ? and votingoptionsid = votingoptions.id) as 'investment', (SELECT COALESCE(sum(nominalInvestmentContributed),0) FROM votinguser where votingid = ? and votingoptionsid = votingoptions.id) as 'nominalInvestment', (SELECT COALESCE(count(*),0) FROM votinguser where votingid = ? and votingoptionsid = votingoptions.id) as 'recordcount' FROM votingoptions where votingid = ? order by id`;
                  module.exports.executeSQLStatement(sql, [id, id, id, id, id]).then((result) => {
                      params.SharesRecord = result;

                      for (let i = 0; i < params.SharesRecord.length; i++) {
                          params.SharesRecord[i].Percent = math.multiply(
                            math.divide(params.SharesRecord[i].count ?? 0, params.totalTokens ?? 0) ?? 0,
                            100
                            ).toFixed(2).toString();
                          params.SharesRecord[i].PercentInvestment = math.multiply(
                            math.divide(params.SharesRecord[i].investment ?? 0, params.totalInvestment ?? 0) ?? 0,
                            100
                            ).toFixed(2).toString();
                          params.SharesRecord[i].PercentInvestmentNominal = math.multiply(
                            math.divide(params.SharesRecord[i].nominalInvestment ?? 0, params.nominalInvestmentContributed ?? 0) ?? 0,
                            100
                            ).toFixed(2).toString();
                      }

                      callback(null);
                  }).catch((error) => {
                      logger.debug(`${error.message} Error occured in mysql getVotingDetails getSharesCount`);
                      reject(error.message);
                  });
            }
            async.waterfall([
                loadParameters,
                getDatabaseInformation,
                getStatistics,
                getOptionCount,
                getSharesCount
            ], (err) => {
                resolve(params);
            });

        });


        /*
            {
                "inhandTokens": 3410,
                "inhandInvestment": 28450,
                "expectedshares": null,
                "expectedinvestment": null,
                "totalTokens": null,
                "totalInvestment": null,
                "nominalInvestmentContributed": null,
                "Record": { Record Details },
                "open": 0,
                "VotesCasted": 0,
                "TotalInvestorsInSTO": 5,
                "OptionRecord": [              // number of investor based statisctis
                    {
                        "id": 273,
                        "optiontxt": "> $50001",
                        "count": 0,
                        "PercentInvestorCount": "0.00"
                    } . . . . more records for each option
                ],
                "SharesRecord": [             // number of share based statistics
                    {
                        "id": 273,
                        "optiontxt": "> $50001",
                        "count": 0,
                        "investment": 0,
                        "nominalInvestment": 0,
                        "recordcount": 0,
                        "Percent": "NaN",
                        "PercentInvestment": "NaN",
                        "PercentInvestmentNominal": "NaN"
                    } . . . . .   more records for each option
                ]
            }
        */
    },
    getPublicPollsDetails(id, stoid) {
        return new Promise((resolve, reject) => {
            const params = {};

            function getDatabaseInformation(callback) {
                  const sql = `select id, title, votetype, DATE_FORMAT(opendate,'%M %d %Y') as opendate, opendate as DBOpenDate,  DATE_FORMAT(closedate,'%M %d %Y') as closedate, closedate as DBCloseDate, contents from voting where id = ? and stoid = ?`;
                  module.exports.executeSQLStatement(sql, [id, stoid]).then((result) => {
                      if(result.length == 0)
                          reject("Public Voting ID does not belong to this STO. check why user access this ID");
                      else {
                          params.Record = result[0];
                          params.open = common.checkTimePeriod(result[0].DBOpenDate, result[0].DBCloseDate);
                          callback(null);
                      }
                  }).catch((error) => {
                      logger.debug(`${error.message} Error occured in mysql getPublicPollsDetails getDatabaseInformation`);
                      reject(error.message);
                  });
              }
            function getStatistics(callback) {
                  const sql = `select count(*) as count from publicpollsdata where stoid = ? and votingid = ? and optionid > 0
                  ;\
                  select count(*) as count from publicpollsdata where stoid = ? and votingid = ?`;
                  module.exports.executeSQLStatement(sql, [stoid, id, stoid, id]).then((result) => {
                      params.VotesCasted = result[0][0].count;
                      params.TotalUsers = result[1][0].count;
                      callback(null);
                  }).catch((error) => {
                      logger.debug(`${error.message} Error occured in mysql getPublicPollsDetails getStatistics`);
                      reject(error.message);
                  });
            }
            function getOptionCount(callback) {
                  const sql = `SELECT id, optiontxt, (SELECT COUNT(id) FROM publicpollsdata WHERE publicpollsdata.optionid = votingoptions.id and stoid = ? and votingid = ?) as 'count' FROM votingoptions where votingid = ? order by id`;
                  module.exports.executeSQLStatement(sql, [stoid, id, id]).then((result) => {
                      params.OptionRecord = result;

                      for (let i = 0; i < params.OptionRecord.length; i++) {
                        params.OptionRecord[i].PercentInvestorCount = ((params.OptionRecord[i].count / params.TotalInvestorsInSTO) * 100).toFixed(2).toString();
                      }

                      callback(null);
                  }).catch((error) => {
                      logger.debug(`${error.message} Error occured in mysql getPublicPollsDetails getOptionCount`);
                      reject(error.message);
                  });
            }
            async.waterfall([
                getDatabaseInformation,
                getStatistics,
                getOptionCount
            ], (err) => {
                resolve(params);
            });

        });
    },

    downloadAgendaItem(req, res) {
        const sql = 'Select * from votingdocuments where id= ?';
        module.exports.executeSQLStatement(sql, [req.query.id]).then((result) => {
            const file = common.getUserFileUploadsLocationFullPath(result[0]?.documentlink);

            const sql = 'select stoid from voting where id = ?';
            module.exports.executeSQLStatement(sql, [result[0].votingid]).then((result) => {
                if(result.length > 0) {

                    fs.exists(file, (exists) => {
                        if (exists) res.download(file);
                        else {
                          common.handleError(req, res,`File(${file}) not found Error occured in mysql downloadAgendaItem` );
                        }
                    });

                } else
                    common.handleError(req, res, `Error occured in mysql downloadAgendaItem. THis option ID does not belong to any company voting. user changed voting id in URL`);
            }).catch((error) => {
                common.handleError(req, res, `${error.toString()} - Error occured in mysql downloadAgendaItem`);
            });

        }).catch((error) => {
            common.handleError(req, res, `${error.message} Error occured in mysql downloadAgendaItem`);
        });
    },
	downloadDocmentFromKYCRecord(params, req, res) {
		function callGetInvestorKYCRecordFucntion(callback) {
            const stmt = 'Select * from kyc where investorID = ?';
            module.exports.executeSQLStatement(stmt, [params.InvestorID])
                .then((result) => {
                    params.kyc = JSON.parse(result[0].kyc);
                    callback(null, params);
            }).catch((error) => {
                logger.error(`Error in mssql database module - ${error.message}`);
            });
		}
		function downloadDocument(params2) {
			  const file = common.getUserFileUploadsLocationFullPath(  params2.kyc[params2.stepid][params2.fileID][[params2.index]]  );

			  if (fs.existsSync(file)) {
                  res.download(file);
              } else {
				  logger.error(`File(${file}) isdeleted and not found - Error occured in mysql downloadDocmentFromKYCRecord`);
			  }
		}
		async.waterfall([
			callGetInvestorKYCRecordFucntion,
			downloadDocument,
		], (err) => {
            if (err) {
                logger.error(`${err} - Error in mysql downloadDocmentFromKYCRecord`);
            }
		});
	},
	downloadUploadedFileDocument(admincall, req, res) {
        const params = {};
        const stoid  = req.session.stoid || global.config.stos[req.hostname].stoid;

		function getfilename(callback) {
			  const sql = `select contents from documents where id = ? and stoid = ?`;
			  module.exports.executeSQLStatement(sql, [req.query.id, stoid]).then((result) => {
                  if(result.length > 0) {
                     params.fileFound = 1;
                     params.filePath = result[0].contents
                  } else
                      params.fileFound = 0;

				  callback(null);
			  }).catch((error) => {
				  common.handleError(req, res, `${error.message} Error occured in deleteFileFromDirectory getFileName`);
			  });
		}
		function downloadDocument() {
            if(params.fileFound == 1) {
                  const file = common.getUserFileUploadsLocationFullPath(params.filePath);

                  if (fs.existsSync(file)) {
                      res.download(file);
                  } else {
                      logger.error(`File(${file}) is deleted and not found - Error occured in mysql downloadDocmentFromKYCRecord`);
                  }
            }
		}
		async.waterfall([
			getfilename,
			downloadDocument,
		], (err) => {
            if (err) {
                logger.error(`${err} - Error in mysql downloadUploadedFileDocument`);
            }
		});
	},

    createNewTokensNonBlockchain(req, tokenstocreate, sharetypeid, requestedby, reason) {

        return new Promise((resolve, reject) => {
            function getDBRecord(callback) {
                const stoid  = req.session.stoid || global.config.stos[req.hostname].stoid;
                const sql = `select * from sharetypes where id = ? and stoid = ${stoid}`;
                module.exports.executeSQLStatement(sql, [sharetypeid]).then((result) => {
                    const params = {};
                    if(result.length == 0) {
                        common.handleError(req, res, `${error.toString()} - Share type not found. This should not occur in normal operations. mysql createNewTokensNonBlockchain getDBRecord`);
                        return;
                    } else {
                        params.shareTypeRec = result[0];
                        params.TokensToCreate = tokenstocreate;
                        callback(null, params);
                    }
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in mysql createNewTokensNonBlockchain`);
                });
            }
            function updateNonBlockcChain1(params, callback) {
                const tot1 = math.sum(params.shareTypeRec.totalShares ?? 0, params.TokensToCreate ?? 0);
                const tot2 = math.sum(params.shareTypeRec.companyShares ?? 0, params.TokensToCreate ?? 0);
                const stoid  = req.session.stoid || global.config.stos[req.hostname].stoid;
                const sql = `update sharetypes set totalShares=?, companyShares=? where id=? and stoid = ${stoid}`;
                module.exports.executeSQLStatement(sql, [tot1, tot2, sharetypeid]).then(() => {
                    callback(null, params);
                }).catch((error) => {
                    common.handleError(req, res, `${error.toString()} - Error occured in  mysql createNewTokensNonBlockchain updateNonBlockcChain1`);
                });
            }
            function getUserNameID(params, callback) {
                if(requestedby != -1) {
                    const sql = `select FirstName, LastName from users where id = ?`;
                    module.exports.executeSQLStatement(sql, [requestedby]).then((result) => {
                        params.userName = result[0].FirstName + " " + result[0].LastName
                        callback(null, params);
                    }).catch((error) => {
                        common.handleError(req, res, `${error.toString()} - Error occured in mysql createNewTokensNonBlockchain getUserNameID`);
                    });
                } else
                    callback(null, params);
            }
            function updateNonBlockcChain3(params, callback) {
                    const tot1 = math.sum(params.shareTypeRec.companyShares ?? 0, params.TokensToCreate ?? 0);

                    var LogDescription = `${params.TokensToCreate} ${params.shareTypeRec.title} created`;
                    if(requestedby != -1)
                        LogDescription = LogDescription + ", Request generated by " + params.userName;
                    LogDescription = LogDescription + ", " + reason;

                    const stoid  = req.session.stoid || global.config.stos[req.hostname].stoid;

                    const stmt = 'Insert into logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid, recid) values (?,NOW(),?,?,?,?,?)';
                    const sqlparams = [req.session.user.ID, LogDescription, -1, 7, stoid, params.shareTypeRec.ID];
                    module.exports.executeSQLStatement(stmt, sqlparams).then(() => {
                        callback(null);
                    }).catch((error) => {
                        logger.error(`${error.message} - Error occured in mysql createNewTokensNonBlockchain updateNonBlockcChain3`);
                    });
            }
            async.waterfall([
                getDBRecord,
                updateNonBlockcChain1,
                getUserNameID,
                updateNonBlockcChain3,
            ], (err) => {
                if (err)
                    reject(err);
                else
                    resolve("done");
            });
        });

        /*function sendBlockchainTransaction(params, callback) {
                if (req.body.newTokenType === '1') {

                    const privateKey = ethereumApi.decryptKey(JSON.parse(req.body.filecontents), req.body.password);
                    if (privateKey === 'error') {
                        req.flash('message', 'Private key cannot be authenticated');
                        res.redirect('newtoken');
                        return;
                    }

                    const json = { type: 1, params };
                    ethereumApi.createNewToken(params.DistributionPublicKey, req.body.tokens, tid, privateKey, req.session.ethereumContractAddress, req.session.ethereumWhitelistAddress, global.config.stos[hostname].stoid)
                    .then(() => {
                        callback(null);
                    },
                    (err) => {
                        common.handleError(req, res, `${err.message} -  Error occured in  generatetoken sendBlockchainTransaction - trying to create new token `);
                    });

                } else { callback(null); }
            }*/
    },

    /*setVotingDataAfterMeetingIsOver(hostname, meetingID) {


        return new Promise((resolve, reject) => {
            const params = {};

            function getAllAgendaItems(callback) {
                const sql = `select id from votingoptions where votingid = ?`;
                module.exports.executeSQLStatement(sql, [meetingID]).then((result) => {
                    params.agendaItems = result;
                    callback(null);
                }).catch((error) => {
                    logger.error(`${error.toString()} - Error occured in checkPublicKeyAlreadyTaken checkInvestorPublicKey`);
                });
            }
            function setVotes(callback) {
				let countAgendaItems = 0;
				async.whilst(() => countAgendaItems < params.agendaItems.length, (callbackAgendaItems) => {

                        const sql = `select investorid from votinguserdata where votingid = 101 and attendMeeting in (1,3) and investorid not in ( select userid from votinguser where votingoptionsid = ${params.agendaItems[countAgendaItems].id} )`;
                        module.exports.executeSQLStatement(sql, []).then((investorsRecs) => {

                            let countInvestorCounts = 0;

                            async.whilst(() => countInvestorCounts < investorsRecs.length, (callbackInvestors) => {

                                    const stmt = `select investorid, sum(s.shares) as sums, sum(t.premimum * s.shares) as investmentsum, sum(t.nominalValue * s.shares) as nominalinvestmentsum from shares s, sharetypes t where s.stoid = ${global.config.stos[hostname].stoid} and investorid = ${investorsRecs[countInvestorCounts].investorid} and s.shareTypeid = t.id and t.isVotingRightsApplicable = 1 group by investorid`;

                                    module.exports.executeSQLStatement(stmt, []).then((rec) => {

                                            var sql = `insert into votinguser(votingid, userid, votingoptionsid, votingoptionsvalue, votesContributed, isCastedByInvestor, investmentContributed, nominalInvestmentContributed) values(?, ?, ?, ?, ?, 0, ?, ?)`;
                                            module.exports.executeSQLStatement(sql, [meetingID, investorsRecs[countInvestorCounts].investorid, params.agendaItems[countAgendaItems].id, 3, rec[0].sums, rec[0].investmentsum, rec[0].nominalinvestmentsum ]).then((result) => {
                                                countInvestorCounts++;
                                                callbackInvestors(null);
                                            }).catch((error) => {
                                                  logger.error(`${error.message} Error occured in castVote saveNewOption`);
                                            });

                                    }).catch((error) => {
                                        logger.error(`${error.message} - Error occured in signcontract logSigning`);
                                    });


                            }, (err, n) => {
                                if (!err) {
                                    countAgendaItems++;
                                    callbackAgendaItems(null);
                                } else {
                                    logger.info(`${err} ${n}`);
                                }
                            })


                        }).catch((error) => {
                            logger.error(`${error.toString()} - Error occured in checkPublicKeyAlreadyTaken checkInvestorPublicKey`);
                        });

                }, (err, n) => {
                    if (!err) {
                        callback(null);
                    } else {
                        logger.info(`${err}`);
                    }
				})
            }
            async.waterfall([
                getAllAgendaItems,
                setVotes,
            ], (err) => {
                if (err) {
                    reject('Error');
                } else {
                    const sql = `update voting set isMeetingFinalResultsCalculated = 1 where id = ?`;
                    module.exports.executeSQLStatement(sql, [meetingID]).then((result) => {
                        resolve('ok');
                    }).catch((error) => {
                        logger.error(`${error.toString()} - Error occured in checkPublicKeyAlreadyTaken checkInvestorPublicKey`);
                    });
                }
            });
        });

    },*/
    setVotingDataAfterMeetingIsOverPerOption(hostname, meetingID, optionID) {
        /*
            get agenda items
            for each agenda items
                get all investor who choose   1, 3    and not in voting data
                set their votes
            each
        */

        return new Promise((resolve, reject) => {
            const params = {};

            function setVotes(callback) {

                const sql = `select investorid from votinguserdata where votingid = ? and attendMeeting in (1,3) and investorid not in ( select userid from votinguser where votingoptionsid = ? )`;
                module.exports.executeSQLStatement(sql, [meetingID, optionID]).then((investorsRecs) => {

                    let countInvestorCounts = 0;

                    async.whilst(() => countInvestorCounts < investorsRecs.length, (callbackInvestors) => {

                            const stmt = `select investorid, sum(s.shares) as sums, sum(t.premimum * s.shares) as investmentsum, sum(t.nominalValue * s.shares) as nominalinvestmentsum from shares s, sharetypes t where s.stoid = ${global.config.stos[hostname].stoid} and investorid = ${investorsRecs[countInvestorCounts].investorid} and s.shareTypeid = t.id and t.isVotingRightsApplicable = 1 group by investorid`;

                            module.exports.executeSQLStatement(stmt, []).then((rec) => {

                                    var sql = `insert into votinguser(votingid, userid, votingoptionsid, votingoptionsvalue, votesContributed, isCastedByInvestor, investmentContributed, nominalInvestmentContributed) values(?, ?, ?, ?, ?, 0, ?, ?)`;
                                    module.exports.executeSQLStatement(sql, [meetingID, investorsRecs[countInvestorCounts].investorid, optionID, 3, rec[0].sums, rec[0].investmentsum, rec[0].nominalinvestmentsum ]).then((result) => {
                                        countInvestorCounts++;
                                        callbackInvestors(null);
                                    }).catch((error) => {
                                          logger.error(`${error.message} Error occured in castVote saveNewOption`);
                                    });

                            }).catch((error) => {
                                logger.error(`${error.message} - Error occured in signcontract logSigning`);
                            });


                    }, (err, n) => {
                        if (!err) {
                            callback(null);
                        } else {
                            logger.info(`${err} ${n}`);
                            callback(null);
                        }
                    })

                }).catch((error) => {
                    logger.error(`${error.toString()} - Error occured in checkPublicKeyAlreadyTaken checkInvestorPublicKey`);
                });

            }
            async.waterfall([
                setVotes,
            ], (err) => {
                if (err) {
                    reject('Error');
                } else {
                    resolve('ok');
                }
            });
        });

    },

    loadBulkUploadInvestorDataFile(req) {

        return new Promise((resolve, reject) => {

            var params = {};

            params.totalLines = 0;
            params.recordsNotComplete = 0;     //this checks many thing like atleast minimum number of fileds must be there, records has correct values etc.
            params.recordsNotCompleteLines = "";

            params.emailNotFoundOrNotCorrectFormat = 0;
            params.emailNotFoundOrNotCorrectFormatLines = "";

            params.AllFieldsNotFound = 0;       //min fields must be 16  not less than that
            params.AllFieldsNotFoundLines = "";

            params.ShareValuesAreNotCorrectlyDefined = 0;
            params.ShareValuesAreNotCorrectlyDefinedLines = "";

            params.ShareValuesAreNotComplete= 0;
            params.ShareValuesAreNotCompleteLines = "";

            var collectEmails = [];
            params.DuplicateEmailsFound= 0;
            params.DuplicateEmailsFoundLines = "";

            params.EmailsFound = [];
            params.fileName = "";

            var currentLineNo = 0;

            function getSTOShareTypeID(callback) {
                const stmt = 'select id,title,companyShares,isblockchain from sharetypes where stoid = ?';
                module.exports.executeSQLStatement(stmt, [req.body.stoid]).then((result) => {
                    params.shareTypes = {};
                    result.forEach((obj) => {
                        params.shareTypes[obj.id] = {"title": obj.title, "shares": obj.companyShares, "count":0, "isblockchain": obj.isblockchain };
                    });

                    callback(null);
                }).catch((error) => {
                     reject(`${error.message} - Error occured in mysql getSTOShareTypeID`);
                });
            }
            function checkValues(callback) {
                // read contents of the file
                const v = JSON.parse(req.body.fileupload);

                params.fileName = v[0].filename;

                var lineReader = new LineByLineReader( __dirname + "/../../temp/" + v[0].filename );
                var fld = [];


                lineReader.on('error', function (err) {
                    // 'err' contains error object
                });

                lineReader.on('line', function (line) {
                    lineReader.pause();

                    fld = line.split(",");

                    if(fld.length > 1) {      //igonor line with no record or nothing  an empty line has length 1  most probably last line
                        currentLineNo++;

                        if(fld.length < 16) {
                            params.AllFieldsNotFound++;
                            params.AllFieldsNotFoundLines = params.AllFieldsNotFoundLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                            setTimeout(function () { lineReader.resume(); }, 100);
                        } else {

                            //Record Format
                            //0 investorType	1 FirstName	 2LastName	3email	4CompanyName	5TitleWithinCompany	6PowerToBindCompany	7Address
                            //8country	9phone	10zip	 11city	 12state	13Passport Number	14NationalID	15DOB	16Notes
                            if (global.config.CurrentClientID === 10) { // temporary EziStake request
                                if (fld[0] == "" || fld[3] == "") {
                                    params.recordsNotComplete++;
                                    params.recordsNotCompleteLines = params.recordsNotCompleteLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                                }
                            } else if(fld[0] == "" || fld[1] == "" || fld[2] == ""|| fld[3] == "") {
                                params.recordsNotComplete++;
                                params.recordsNotCompleteLines = params.recordsNotCompleteLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                            }

                            if(fld[6] != "") {
                                if( isNaN(fld[6]) ) {
                                    params.recordsNotComplete++;
                                    params.recordsNotCompleteLines = params.recordsNotCompleteLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                                }
                            }

                            if(fld[0] == "0" || fld[0] == "1") {} else {
                                params.recordsNotComplete++;
                                params.recordsNotCompleteLines = params.recordsNotCompleteLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                            }

                            if( fld[15] != "" ) {
                                if( ! moment(fld[15]).isValid() ) {
                                    params.recordsNotCompleteLines = params.recordsNotCompleteLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                                    params.recordsNotComplete++;
                                }
                            }

                            // record contains shares data
                            for(var tmp = 17; tmp < fld.length; tmp=tmp+4) {

                                if ((fld.length-1) < (tmp + 3)) {
                                    params.ShareValuesAreNotComplete++;
                                    params.ShareValuesAreNotCompleteLines = params.ShareValuesAreNotCompleteLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                                } else {

                                    if( fld[tmp] == "" || fld[tmp + 1] == "" || fld[tmp + 2] == "" ) {
                                            params.ShareValuesAreNotCorrectlyDefined++;
                                            params.ShareValuesAreNotCorrectlyDefinedLines = params.ShareValuesAreNotCorrectlyDefinedLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                                    } else {

                                        if( isNaN(fld[tmp]) == true ||  isNaN(fld[tmp + 1]) == true || (!moment(fld[tmp + 2]).isValid()) ) {
                                            params.ShareValuesAreNotCorrectlyDefined++;
                                            params.ShareValuesAreNotCorrectlyDefinedLines = params.ShareValuesAreNotCorrectlyDefinedLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                                        }
                                        else {
                                            if(! params.shareTypes.hasOwnProperty(fld[tmp])) {
                                                params.ShareValuesAreNotCorrectlyDefined++;
                                                params.ShareValuesAreNotCorrectlyDefinedLines = params.ShareValuesAreNotCorrectlyDefinedLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                                            } else {

                                                params.shareTypes[fld[tmp]].count = ((params.shareTypes[fld[tmp]].count * 100) + (parseFloat( fld[tmp + 1] * 100) )) / 100;

                                            }
                                        }
                                    }

                                }
                            }

                            if( fld[3] == "" || (! validator.isEmail(fld[3])) ) {
                                params.emailNotFoundOrNotCorrectFormat++;
                                params.emailNotFoundOrNotCorrectFormatLines = params.emailNotFoundOrNotCorrectFormatLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;
                                setTimeout(function () { lineReader.resume(); }, 100);
                            } else {
                                if(collectEmails.includes(fld[3])) {
                                    params.DuplicateEmailsFound++;
                                    params.DuplicateEmailsFoundLines = params.DuplicateEmailsFoundLines + "&nbsp;&nbsp;&nbsp;" + currentLineNo;

                                    setTimeout(function () { lineReader.resume(); }, 100);
                                } else {
                                    collectEmails.push(fld[3]);

                                    const stmt = 'select FirstName, LastName, Email from investor where email in (\'' + fld[3] + '\')';
                                    module.exports.executeSQLStatement(stmt, []).then((result) => {
                                        if(result.length > 0) {
                                            params.EmailsFound.push({
                                                FirstName: result[0].FirstName,
                                                LastName: result[0].LastName,
                                                Email: result[0].Email,
                                            });
                                        }
                                        setTimeout(function () { lineReader.resume(); }, 100);
                                    }).catch((error) => {
                                        logger.error(`${error.message} - Error occured in mysql loadBulkUploadInvestorDataFile checkEmails`);
                                        setTimeout(function () { lineReader.resume(); }, 100);
                                    });
                                }
                            }

                        }
                    } else
                        setTimeout(function () { lineReader.resume(); }, 100);

                });

                lineReader.on('end', function () {
                    callback(null);
                });

            }
            async.waterfall([
                getSTOShareTypeID,
                checkValues
            ], function (err) {
                params.totalLines = currentLineNo;
                resolve(params);
            });

        });
    },

    checkEthereumKeyIsAlreadyBeenTakenInPlatorm(address, sto) {

        return new Promise((resolve, reject) => {
              const sql = `select count(*) as count  from sharetypes where ethereumBlockchainPublicAddress = ? AND stoid = ? \
                          ;\ 
                          select count(*) as count  from InvestorBuyPropertyAlert where publickey = ? AND stoid = ?; `; 

              module.exports.executeSQLStatement(sql, [address, sto, address, sto]).then((result) => { 
                    if (result[0][0].count == 0 && result[1][0].count == 0)
                         resolve("done");
                     else
                        reject ("Already taken");
              }).catch((error) => { 
                    eject ("Already taken");
              });
        });

    }

};
