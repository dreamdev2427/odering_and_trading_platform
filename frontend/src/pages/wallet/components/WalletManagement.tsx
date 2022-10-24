import React from 'react';

import { useModal } from 'components/Modal';
import { InvestorWalletBalance, InvestorWalletChannel } from 'services/apollo/multisto';

import WALLET from 'assets/img/wallet.png';
import { Card, CardBody, Col, GrayDot, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import ActiveStoSelect from 'components/ActiveStoSelect';
import { useTranslation } from 'react-i18next';
import AccountItem from './AccountItem';
import ChannelItem from './ChannelItem';
import DepositWithdrawFormManagement from './Forms/DepositWithdrawFormManagement';

interface WalletManagementProps {
  channels: InvestorWalletChannel[];
  accounts: InvestorWalletBalance[];
  sto: number;
  setSto: (value: number) => void;
  IsInternalWalletGlobal: boolean;
  IsInternalWalletStoSpecific: boolean;
  doAutomaticBlockchainTransactionChecks: boolean;
  isMarketspace: boolean;
}

const WalletManagement: React.FC<WalletManagementProps> = ({
  channels,
  accounts,
  sto,
  setSto,
  IsInternalWalletGlobal,
  IsInternalWalletStoSpecific,
  doAutomaticBlockchainTransactionChecks,
  isMarketspace,
}) => {
  const modal = useModal();
  const investorID = accounts[0]?.investorID ?? 0;

  if (IsInternalWalletGlobal) {
    sto = 0;
  }
  const { t } = useTranslation();

  const handleShowModal = (channel: InvestorWalletChannel, isWithdraw: boolean) => {
    modal.showModal({
      noWrapper: true,
      className: 'w-50 mw-100 minw-400',
      bodyContent: ({ hideModal }: { hideModal: () => void }) => (
        <DepositWithdrawFormManagement
          channel={channel}
          stoID={sto}
          investorID={investorID}
          isWithdraw={isWithdraw}
          hideModal={hideModal}
          doAutomaticBlockchainTransactionChecks={doAutomaticBlockchainTransactionChecks}
        />
      ),
    });
  };

  return (
    <Card>
      <CardHeader text="Wallet Management" imgSrc={WALLET} />
      <CardBody className="mb-2">
        <Row>
          <Col md={4}>
            <h4 className="mt-0 pb-2"> {t('WalletManagement-CurrentBalance')} </h4>
            {accounts.length > 0 ? (
              <>
                <label>{t('WalletManagement-CurrentBalanceInProject')}</label>
                {accounts.map((acc) => (
                  <AccountItem key={acc.ID} account={acc} />
                ))}
              </>
            ) : (
              <label>{t('WalletManagement-NoBalance')}</label>
            )}
          </Col>
          {IsInternalWalletStoSpecific ? (
            <Col md={8}>
              <h4 className="mt-0 mb-4"> {t('WalletManagement-DepositFundsInProject')}</h4>
              <h6 className="mt-0 mb-2">
                <GrayDot big />
                <span className="mr-5"> Step 1</span>
                {t('WalletManagement-SelectProject')}
              </h6>
              <label>{t('WalletManagement-SelectProjectLabel')}</label>
              <Row className="mb-3">
                <Col md={8}>
                  <ActiveStoSelect sto={sto} setSto={setSto} />
                </Col>
              </Row>

              <h6 className="mt-0 mb-2">
                <GrayDot big />
                <span className="mr-5"> Step 2</span>
                {t('WalletManagement-DepositFunds')}
              </h6>
              <label>{t('WalletManagement-DepositFundsLabel')}</label>
              {channels.length > 0 ? (
                channels.map((chn) => (
                  <ChannelItem
                    key={chn.ID}
                    channel={chn}
                    deposit={() => handleShowModal(chn, false)}
                    withdraw={() => handleShowModal(chn, true)}
                    isMarketspace={isMarketspace}
                  />
                ))
              ) : (
                <label>{t('WalletManagement-NoPaymentChannelFoundForProject')}</label>
              )}
            </Col>
          ) : (
            <></>
          )}
          {IsInternalWalletGlobal ? (
            <Col md={8}>
              <h4 className="mt-0 mb-4"> {t('WalletManagement-DepositFundsInAccount')}</h4>
              <label>{t('WalletManagement-DepositFundsInAccountLabel')}</label>
              {channels.length > 0 ? (
                channels.map((chn) => (
                  <ChannelItem
                    key={chn.ID}
                    channel={chn}
                    deposit={() => handleShowModal(chn, false)}
                    withdraw={() => handleShowModal(chn, true)}
                    isMarketspace={isMarketspace}
                  />
                ))
              ) : (
                <b>{t('WalletManagement-NoPaymentChannelFound')}</b>
              )}
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default WalletManagement;
