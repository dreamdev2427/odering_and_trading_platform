'use strict';

var dbm;
var type;
var seed;
var fs = require('fs');
var path = require('path');
var Promise;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20210402053859-build-db-up.sql');
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).then(function(data) {
    // Requires correct name for database
    const dbName = process.env.DB_Database ? process.env.DB_Database : process.env.MYSQL_DATABASE;
    // TODO: Escape the string from process.env
    return Promise.all([
      db.runSql(`ALTER DATABASE \`${dbName}\` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`),
      db.runSql(data),
    ]);
  });
};

exports.down = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20210402053859-build-db-down.sql');
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).then(function(data) {
    return db.runSql(data);
  });
};

exports._meta = {
  version: 1,
};
