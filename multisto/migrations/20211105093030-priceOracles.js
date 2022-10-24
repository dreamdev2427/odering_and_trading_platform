'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  const sql =
    `INSERT INTO params(param,isglobal,datatype,stringValue,intValue) VALUES ('lcwAccessToken',1,1,'',NULL);`+
    `INSERT INTO params(param,isglobal,datatype,stringValue,intValue) VALUES ('priceOracles',1,3,'[]',NULL);`;
  return db.runSql(sql);
};

exports.down = function(db) {
  return db.runSql(`DELETE FROM params WHERE param = 'lcwAccessToken' OR param = 'priceOracles';`);
};

exports._meta = {
  "version": 1
};
