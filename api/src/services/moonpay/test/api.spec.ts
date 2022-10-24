/** Disabled until I mock it */
/*
import { describe, it } from 'mocha';
import { apiAction, ApiConfig, Endpoint } from '../api-integration';

const api: ApiConfig = {
  baseUrl: `http://localhost:3100`,
  headers: {
    'Content-Type': 'application/json',
  },
};

type TestMsg = {
  message: string;
};

const getTestMsg: Endpoint<void, TestMsg> = {
  method: 'GET',
  path: '/test',
};

const postEcho: Endpoint<TestMsg, TestMsg> = {
  method: 'POST',
  path: '/echo',
  body: { message: 'Test echo' },
  query: {
    testing: `true`,
  },
};
describe(`api`, async () => {
  it(`Should make GET requests`, async () => {
    const res = await apiAction(api, getTestMsg);
    console.log(res);
  });

  it(`Should make POST requests`, async () => {
    const res = await apiAction(api, postEcho);
    console.log(res);
  });
});
*/
