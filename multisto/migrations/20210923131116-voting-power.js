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
  return db.runSql(`ALTER TABLE sharetypes ADD COLUMN votingPower DECIMAL(8,2) NOT NULL DEFAULT 1;`, (err) => {
    console.log(err);
  });
};

exports.down = function(db) {
  return db.runSql(`ALTER TABLE sharetypes DROP COLUMN votingPower;`, (err) => {
    console.log(err);
  });
};

exports._meta = {
  "version": 1
};
