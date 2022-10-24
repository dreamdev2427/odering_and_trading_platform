/*
import { describe, it } from 'mocha';
import { expect } from 'chai';

import axios from 'axios';


Disabled until we figure out a better way to run it
*/

/*
Before running tests make sure Api service is running

Please provide your own token and StoId for tests
and add --timeout=100000 flag to mocha
Integration tests are time consuming otherwise tests will fail

*/
/*
describe('Auth Integration Test', async () => {
  let apiUrl = process.env.REACT_APP_GRAPHQL_URI ?? 'http://localhost:3000/gql';
  if (!apiUrl.endsWith('/gql')) {
    apiUrl = `${apiUrl}/gql`;
  }

  it('Authenication without token ', async () => {
    await axios({
      method: 'POST',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `
        query InvestorDetailProperty($stoId: Int!) {
  investorDetailProperty(stoID: $stoId) {
    ID
    title
    details
    picture
    fullDetails
    images {
      ID
      title
      url
    }
    documents {
      ID
      title
      url
    }
  }
}
      `,
        variables: {
          stoId: 5,
        },
      }),
    }).then((response: any) => {
      expect(response.data).to.have.any.keys('errors');
      //assert.hasAnyKeys(response.data, ['errors'])
    });
  });

  it('Authenication with token', () => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/gql',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJJRCI6MjY2LCJzdG9JRCI6MCwicm9sZSI6MH0.FZGMn0YThUrJKnT4__mUq3ssdxsz86kTkihUP0kxSY4',
      },
      data: JSON.stringify({
        query: `
        query InvestorDetailProperty($stoId: Int!) {
  investorDetailProperty(stoID: $stoId) {
    ID
    title
    details
    picture
    fullDetails
    images {
      ID
      title
      url
    }
    documents {
      ID
      title
      url
    }
  }
}
      `,
        variables: {
          stoId: 5,
        },
      }),
    }).then((response: any) => {
      expect(response.data).to.have.any.keys('data');
    });
  });
});
*/
