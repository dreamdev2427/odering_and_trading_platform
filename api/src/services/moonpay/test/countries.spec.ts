import { assert } from 'chai';
import { describe, it } from 'mocha';
import { findCountryCode } from '../helpers/country-codes';

describe(`DIG-422 ISO Country code derivation`, () => {
  it(`should detect 'uNiTeD StAtEs' case insensitive`, () => {
    assert.deepEqual(findCountryCode(`uNiTeD StAtEs`), `USA`);
  });
  it(`should detect 'united states of america'`, () => {
    assert.deepEqual(findCountryCode(`united states of america`), `USA`);
  });
  it(`should detect 'usa'`, () => {
    assert.deepEqual(findCountryCode(`usa`), `USA`);
  });
});
