import React, { useState } from 'react';

import { useInvestorAppDataQuery, useInvestorWalletQuery } from 'services/apollo';
import { useActiveSto } from 'hooks';

import { Loading } from 'atoms';
import WalletManagement from './components/WalletManagement';
import DepositHistory from './components/DepositHistory';

const Wallet: React.FC = () => {
  const { sto } = useActiveSto();
  const [selectedSto, setSto] = useState(sto);
  const { data, loading } = useInvestorWalletQuery({
    variables: { _id: Number(selectedSto) },
    fetchPolicy: 'no-cache',
  });
  const { data: data1, loading: loading1 } = useInvestorAppDataQuery({ fetchPolicy: 'no-cache' });

  if (loading || !data || loading1 || !data1) {
    return <Loading />;
  }

  const { investorBalances: accounts, investorPaymentChannels: channels, investorDepositHistory: history } = data;

  const { investorAppParameters } = data1;
  const {
    IsInternalWalletGlobal,
    IsInternalWalletStoSpecific,
    doAutomaticBlockchainTransactionChecks,
    IsMarketSpace: isMarketspace,
  } = investorAppParameters;

  return (
    <div className="content">
      <WalletManagement
        accounts={accounts}
        channels={channels}
        sto={Number(selectedSto)}
        setSto={(value) => setSto(Number(value))}
        IsInternalWalletGlobal={IsInternalWalletGlobal}
        IsInternalWalletStoSpecific={IsInternalWalletStoSpecific}
        doAutomaticBlockchainTransactionChecks={doAutomaticBlockchainTransactionChecks}
        isMarketspace={isMarketspace}
      />
      <DepositHistory history={history} />
    </div>
  );
};

export default Wallet;
