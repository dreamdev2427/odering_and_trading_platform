import { before, after, describe, it } from 'mocha';
import { assert } from 'chai';
import * as db from './helpers/db.spec';

const mysql = require('../modules/db');

/**
 * This file is for setting up and tearing down our test suite only.
 */

/**
 * Set up our test suite
 */
before(async function () {
  this.timeout(5 * 60000);
  console.log('===[ 🧪 Global Test Setup ]===');
  await db.setup();
});

describe('Test suite', async () => {
  it('should set up db params', async () => {
    const appParams = await mysql.Pool.execute(`SELECT * FROM params;`);

    assert(appParams.length > 1);
  });
});

/**
 * Tear down our test suite
 */
after(async function () {
  this.timeout(5 * 60000);
  console.log('===[ ⏎ Global Test Teardown ]===');
  const beginTime = new Date();
  await db.teardown();
  const endTime = new Date();
  console.log(`Done! Teardown time: ${(endTime.getTime() - beginTime.getTime()) / 1000}s`);
});
