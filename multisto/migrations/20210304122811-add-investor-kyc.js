'use strict';

exports.up = (db) =>
  db.addColumn('investor', 'kyc', {
    type: 'text',
    null: true,
  });

exports.down = (db) => db.removeColumn('investor', 'kyc');

exports._meta = {
  version: 1,
};
