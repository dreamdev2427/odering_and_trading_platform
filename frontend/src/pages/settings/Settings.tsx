import React from 'react';
import { useInvestorAppDataQuery } from 'services/apollo';
import { Loading } from 'atoms';
import { MetaMaskProvider } from 'metamask-react';
import ChangePassword from './components/ChangePassword';
import TwoFactor from './components/TwoFactor';
import EthereumKeys from './components/EthereumKeys';
import BankAccount from './components/BankAccounts';

const Settings: React.FC = () => {
  const { data, loading } = useInvestorAppDataQuery();

  if (loading || !data) {
    return <Loading />;
  }

  const { isBankDetailsSwitchEnabled, isBlockchainAddressSwitchEnabled, is2FAForcedForAll } =
    data.investorAppParameters;

  return (
    <div className="content">
      {isBankDetailsSwitchEnabled ? <BankAccount /> : null}
      <ChangePassword />
      {!is2FAForcedForAll ? <TwoFactor /> : null}
      {isBlockchainAddressSwitchEnabled ? (
        <MetaMaskProvider>
          <EthereumKeys />
        </MetaMaskProvider>
      ) : null}
    </div>
  );
};

export default Settings;
