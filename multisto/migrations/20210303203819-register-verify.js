'use strict';

exports.up = (db) =>
  db.changeColumn('register', 'secret', {
    type: 'varchar',
    length: 30,
  });

exports.down = (db) => db.changeColumn('register', 'secret', { type: 'int', length: 11 });

exports._meta = {
  version: 1,
};
