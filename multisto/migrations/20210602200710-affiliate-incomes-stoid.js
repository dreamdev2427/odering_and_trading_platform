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
  return db.runSql(`ALTER TABLE affiliateincomes
    ADD stoId INT NOT NULL DEFAULT 0,
    ADD awarded TINYINT NOT NULL DEFAULT 0,
    ADD dateEarned DATE NULL,
    ADD dateAwarded DATE NULL;`);
};

exports.down = function(db) {
  return db.runSql(`ALTER TABLE affiliateincomes
    DROP COLUMN stoId,
    DROP COLUMN awarded,
    DROP COLUMN dateEarned,
    DROP COLUMN dateAwarded;`);
};

exports._meta = {
  "version": 1
};
