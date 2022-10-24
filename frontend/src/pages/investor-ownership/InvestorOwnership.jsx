import React from 'react';

import { useInvestorAppDataQuery } from 'services/apollo';

import { Loading } from 'atoms';
import BasicOwnership from './BasicOwnership';
import InvestingEntities from './InvestorEntities';


const InvestorOwnership = () => {
  const { data, loading } = useInvestorAppDataQuery({fetchPolicy: 'no-cache'});

  if (loading || !data) {
    return <Loading />
  }

  if (data.investorAppParameters.IsMarketSpace) {
    return <InvestingEntities />
  }

  return <BasicOwnership />
};

export default InvestorOwnership;
