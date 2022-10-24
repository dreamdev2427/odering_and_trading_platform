const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('log')) {
	fs.mkdirSync('log');
}


const dailyRotateFileTransport = new transports.DailyRotateFile({
	levels: { debug: 1, info: 2, warn: 3, error: 4, cricitcal: 5},
	filename: 'log/%DATE%-results.log',
	datePattern: 'YYYY-MM-DD',
});
const consoleFileTransport = new transports.Console({
	format: format.simple(),
})

const logger = createLogger({
	level: global.NODE_ENV === 'development' ? 'debug' : 'info',
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf(info => `${info.timestamp} ${global.revision} ${info.level}: ${info.message}`),
	),
	transports: [
		/*new transports.Console({          //stop console logging as it increases the heap size of the server
			level: global.NODE_ENV === 'development' ? 'debug' : 'info',
			format: format.combine(
				format.colorize(),
				format.printf(
					info => `${info.timestamp} ${info.level}: ${info.message}`,
				),
			),
		}),*/
		dailyRotateFileTransport,consoleFileTransport
	],
});


module.exports = logger;


/*

Specifying a lower log level will log the levels above e.g.
specifying silly will log all other levels while specifying
debug will log all but silly

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

*/
