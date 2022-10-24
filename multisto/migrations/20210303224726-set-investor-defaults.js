'use strict';

const changeInvestor = (db, spec) =>
  Promise.all([
    db.runSql(`ALTER TABLE investor CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE Address Address VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE zip zip VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE town town VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE country country VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE phone phone VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE cell cell VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE PassportNumber PassportNumber VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE NationalID NationalID VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE state state VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE kinemail kinemail VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE kinname kinname VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.runSql(`ALTER TABLE investor CHANGE kinphone kinphone VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`),
    db.changeColumn('investor', 'Address', spec),
    db.changeColumn('investor', 'zip', spec),
    db.changeColumn('investor', 'town', spec),
    db.changeColumn('investor', 'country', spec),
    db.changeColumn('investor', 'phone', spec),
    db.changeColumn('investor', 'cell', spec),
    db.changeColumn('investor', 'PassportNumber', spec),
    db.changeColumn('investor', 'NationalID', spec),
    db.changeColumn('investor', 'state', spec),
    db.changeColumn('investor', 'kinemail', spec),
    db.changeColumn('investor', 'kinname', spec),
    db.changeColumn('investor', 'kinphone', {
      type: 'varchar',
      length: 20,
      defaultValue: '',
      null: true,
    }),
  ]);

exports.up = (db) =>
  changeInvestor(db, {
    type: 'varchar',
    length: 255,
    defaultValue: '',
    null: true,
  });

exports.down = (db) =>
  changeInvestor(db, {
    type: 'varchar',
    length: 255,
    defaultValue: null,
    null: true,
  });

exports._meta = {
  version: 1,
};
