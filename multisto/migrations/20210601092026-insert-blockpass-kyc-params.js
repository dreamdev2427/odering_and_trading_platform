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
  return Promise.all([
    db.runSql(`INSERT INTO \`params\` (\`param\`, \`isglobal\`, \`datatype\`, \`stringValue\`, \`intValue\`) 
                VALUES ('KycProvider', '1', '2', '', '0')`),
    db.runSql(`INSERT INTO \`params\` (\`param\`, \`isglobal\`, \`datatype\`, \`stringValue\`, \`intValue\`) 
                VALUES ('BlockPassApiJson', '1', '3', '{"ClientId":"","ApiKey":"", "BlockPassWebhookToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmxvY2tQYXNzV2ViaG9vayJ9.V2wtYW6HdxA0KrN6kl-kULo55rV279_mVGmUaV7XbIE"}', '0')`)
  ]);
};

exports.down = function(db) {
  return Promise.all([
    db.runSql(`DELETE FROM params WHERE param ="KycProvider"`),
    db.runSql(`DELETE FROM params WHERE param ="BlockPassApiJson"`),
  ]);
};

exports._meta = {
  "version": 1
};
