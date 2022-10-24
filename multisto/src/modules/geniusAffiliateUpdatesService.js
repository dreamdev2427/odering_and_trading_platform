'use strict';

import AffiliateReportViewSqlService from "../services/investorClient/affiliate/data/AffiliateReportViewSqlService";

const async = require('async');
const mysql = require('./mysql');
const common = require('./common');
const logger = require('../logger');
import AffiliateReportService from '../services/investorClient/affiliate/data/AffiliateReportDataService'


module.exports = {

	refreshGeniusAffiliateData(fromDate, toDate) {

		return new Promise((resolve, reject) => {
			const params = [];
			logger.debug("Starting Genius Processing");

			global.config.affiliateUpdateServiceInProgress = 1;
			const affiliateReportViewService = new AffiliateReportViewSqlService();
			affiliateReportViewService.deleteTableData()
				.then(() => {
					const sql = 'select id from investor order by id';
					mysql.executeSQLStatement(sql, []).then((result) => {
						var count = 0;

						async.whilst(
							function() {
								return count < result.length;
							},
							function (callbackInner) {

								AffiliateReportService(  result[count].id, fromDate, toDate  ).then(() => {
									console.log(   result[count].id   )
									count++;
									global.config.affiliateUpdateServiceInProgress = `${count} / ${result.length}`;
									callbackInner(null, count);
								});

							},
							function(err, n) {
								global.config.affiliateUpdateServiceInProgress = 0;
								console.log("Processing complete");
							}
						)

					}).catch((error) => {
					});
					console.log("return")
					resolve("done");
				});
        });
	}

}