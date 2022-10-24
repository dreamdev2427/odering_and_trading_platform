'use strict';

var fs = require('fs');
var path = require('path');
var Promise;
var sqlstring = require('sqlstring');

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options) {
  Promise = options.Promise;
}

exports.up = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20210402055730-unicode-collation-up.sql');
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).then(function(data) {
    var dbName = process.env.DB_Database || process.env.MYSQL_DATABASE;
    return Promise.all([
      db.runSql(`ALTER DATABASE \`${dbName}\` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`),
      db.runSql(sqlstring.format(data, [dbName, dbName])),
    ]);
  });
}

exports.down = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20210402055730-unicode-collation-down.sql');
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).then(function(data) {
    return db.runSql(data);
  });
}

exports._meta = {
  version: 1,
};
