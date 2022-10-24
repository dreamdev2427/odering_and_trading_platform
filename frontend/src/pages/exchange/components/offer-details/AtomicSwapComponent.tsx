import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Web3 from 'web3';
import styled from 'styled-components';
import { AtomicSwapStatus, ExchangeType, useMeQuery } from 'services/apollo';
import Auth from 'services/core/auth';
import { ExchangeOfferDetailOffer, ExchangeOfferDetailOrder } from 'services/apollo/exchange';
import { BsSwal, Button, FontAweIcon, Loading } from 'atoms';
import useAtomicSwap from 'pages/exchange/hooks/useAtomicSwap';

const AtomicSwapComponent: React.FC<{ order: ExchangeOfferDetailOrder; offer: ExchangeOfferDetailOffer }> = ({
  order,
  offer,
}) => {
  const { t } = useTranslation();
  const [connected, setConnected] = useState(false);
  const [atomicSwapCurrentStatus, setAtomicSwapCurrentStatus] = useState(order.atomicSwapCurrentStatus);
  const [isStepOneEnabled, setIsStepOneEnabled] = useState(false);
  const [isStepTwoEnabled, setIsStepTwoEnabled] = useState(false);
  const [isStepThreeEnabled, setIsStepThreeEnabled] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isSwapLoading, setIsSwapLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { loading, data: investorData } = useMeQuery();
  const [isInvestorWhiteListed, handleApproveTransfers, handleOpenSwap, handleCloseSwap] = useAtomicSwap(
    order,
    offer,
    walletAddress,
    setAtomicSwapCurrentStatus,
    setIsApproveLoading,
    setIsSwapLoading,
  );

  useEffect(() => {
    if (walletAddress) {
      if (isInvestorWhiteListed()) {
        setConnected(true);
      } else {
        BsSwal.fire({
          title: t('tradingComponentsAtomicSwapIsWhiteListedFailedTitle'),
          text: t('tradingComponentsAtomicSwapIsWhiteListedFailedDescription'),
          icon: 'error',
        });
        setWalletAddress('');
        setConnected(false);
      }
    }
  }, [walletAddress, isInvestorWhiteListed, t]);

  useEffect(() => {
    if (order.type === ExchangeType.Sell) {
      if (Auth.payload.ID === order.investorID) {
        setIsStepOneEnabled(
          [AtomicSwapStatus.Accepted, AtomicSwapStatus.SellerCommitted].includes(atomicSwapCurrentStatus),
        );
        setIsStepTwoEnabled(isStepOneEnabled && connected);
        setIsStepThreeEnabled([AtomicSwapStatus.SellerCommitted].includes(atomicSwapCurrentStatus) && connected);
      } else {
        setIsStepOneEnabled(
          [AtomicSwapStatus.SellerSent, AtomicSwapStatus.BuyerCommitted].includes(atomicSwapCurrentStatus),
        );
        setIsStepTwoEnabled(isStepOneEnabled && connected);
        setIsStepThreeEnabled([AtomicSwapStatus.BuyerCommitted].includes(atomicSwapCurrentStatus) && connected);
      }
    }
    if (order.type === ExchangeType.Buy) {
      if (Auth.payload.ID === order.investorID) {
        setIsStepOneEnabled(
          [AtomicSwapStatus.Accepted, AtomicSwapStatus.BuyerCommitted].includes(atomicSwapCurrentStatus),
        );
        setIsStepTwoEnabled(isStepOneEnabled && connected);
        setIsStepThreeEnabled([AtomicSwapStatus.BuyerCommitted].includes(atomicSwapCurrentStatus) && connected);
      } else {
        setIsStepOneEnabled(
          [AtomicSwapStatus.BuyerCompleted, AtomicSwapStatus.SellerCommitted].includes(atomicSwapCurrentStatus),
        );
        setIsStepTwoEnabled(isStepOneEnabled && connected);
        setIsStepThreeEnabled([AtomicSwapStatus.SellerCommitted].includes(atomicSwapCurrentStatus) && connected);
      }
    }
  }, [atomicSwapCurrentStatus, connected, isStepOneEnabled, order.investorID, order.type]);

  if (loading || !investorData) {
    return <Loading />;
  }

  const isOrderCreator = investorData.investorUser?.investor.ID === order.investorID;

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await window.web3.eth.getAccounts();
      setWalletAddress(accounts[0]);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      BsSwal.fire({
        title: t('tradingComponentsAtomicSwapMetamaskRequiredButton'),
        icon: 'error',
      });
    }
  };

  if (order.atomicSwapCurrentStatus === AtomicSwapStatus.NotInitialized) {
    return <></>;
  }

  return (
    <>
      {isOrderCreator ? null : (
        <>
          <h4>{t('tradingComponentsOfferDetailsOffersCardAtomicComponentHeader')}</h4>
          <hr />
        </>
      )}
      <StepPanel disabled={!isStepOneEnabled} color="#f6fadc">
        <h5>{t('tradingComponentsOfferDetailsOffersCardAtomicComponentStep1Header')}</h5>
        <Button size="lg" onClick={handleConnectWallet}>
          {t('tradingComponentsOfferDetailsOffersCardAtomicComponentConnectWalletButton')}
        </Button>
        {connected ? (
          <p>
            <FontAweIcon icon="circle" className="text-success mr-2" />
            {t('tradingComponentsOfferDetailsOffersCardAtomicComponentWalletConnected')}
          </p>
        ) : (
          <p>
            <FontAweIcon icon="circle" className="text-danger mr-2" />
            {t('tradingComponentsOfferDetailsOffersCardAtomicComponentWalletNotConnected')}
          </p>
        )}
        <p>
          <b>{t('tradingComponentsOfferDetailsOffersCardAtomicComponentSelectAccountInWallet')}</b>
          <span id="selectedAccount"> {walletAddress}</span>
        </p>
      </StepPanel>
      <hr />
      <StepPanel disabled={!isStepTwoEnabled} color="#faf0f3">
        <h5>{t('tradingComponentsOfferDetailsOffersCardAtomicComponentStep2Header')}</h5>
        {isOrderCreator && order.shareType.ethereumContractAddress ? (
          <Button
            size="lg"
            disabled={isApproveLoading}
            onClick={() => handleApproveTransfers(order.shares, order.shareType.ethereumContractAddress ?? '')}
          >
            {t('tradingComponentsOfferDetailsOffersCardAtomicComponentApproveTransfer')}
          </Button>
        ) : (
          <Button
            size="lg"
            disabled={isApproveLoading}
            onClick={() => handleApproveTransfers(order.rateFrom, order.atomicSwapTokenAddressAcceptable ?? '')}
          >
            {t('tradingComponentsOfferDetailsOffersCardAtomicComponentApproveTransfer')}
          </Button>
        )}
        {isApproveLoading ? (
          <p>
            <FontAweIcon icon="circle-notch" spin className="text-primary mr-2" />
            {t('tradingComponentsOfferDetailsOffersCardAtomicComponentBlockchainTransactionInProgress')}
          </p>
        ) : null}
      </StepPanel>
      <hr />
      <StepPanel disabled={!isStepThreeEnabled} color="#f2fcf9">
        <h5>{t('tradingComponentsOfferDetailsOffersCardAtomicComponentStep3Header')}</h5>
        {isOrderCreator ? (
          <Button size="lg" disabled={isSwapLoading} onClick={handleOpenSwap}>
            {t('tradingComponentsOfferDetailsOffersCardAtomicComponentOpenSwapButton')}
          </Button>
        ) : (
          <Button size="lg" disabled={isSwapLoading} onClick={handleCloseSwap}>
            {t('tradingComponentsOfferDetailsOffersCardAtomicComponentFinalizeSwapButton')}
          </Button>
        )}
        {isSwapLoading ? (
          <p>
            <FontAweIcon icon="circle-notch" spin className="text-primary mr-2" />
            {t('tradingComponentsOfferDetailsOffersCardAtomicComponentBlockchainTransactionInProgress')}
          </p>
        ) : null}
      </StepPanel>
    </>
  );
};

const StepPanel = styled.div<{ disabled: boolean; color: string }>`
  pointer-events: ${(p) => (p.disabled ? 'none' : 'auto')};
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${(p) => p.color};
`;

export default AtomicSwapComponent;
