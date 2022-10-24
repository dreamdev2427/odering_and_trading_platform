import React, { useState } from 'react';
import { BsSwal, Button, CardBody, Col, FontAweIcon, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import BANK from 'assets/img/bank.png';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import erc1404TokenAbi from 'abis/erc1404TokenAbi.json';
import { InvestorInvoiceAlert, InvestorWalletChannel } from 'services/apollo/multisto';

interface DepositFormSendTxBlockchainProps {
  invoice: InvestorInvoiceAlert;
  hideModal: () => void;
  channel: InvestorWalletChannel;
  onSubmit: () => void;
}

const DepositFormSendTxBlockchain: React.FC<DepositFormSendTxBlockchainProps> = ({
  hideModal,
  channel,
  onSubmit,
  invoice,
}) => {
  const { t } = useTranslation();
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // This will be later on refactored into a custom hook
  const handleConnectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await window.web3.eth.getAccounts();
      setWalletAddress(accounts[0]);
      setConnected(true);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      BsSwal.fire({
        title: t('tradingComponentsAtomicSwapMetamaskRequiredButton'),
        icon: 'error',
      });
    }
  };

  const handleSendTransaction = async () => {
    if (
      walletAddress !== '' &&
      channel.currency.Address &&
      channel.currency.cryptoReceivingAddress &&
      invoice.amountToPay
    ) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(erc1404TokenAbi as AbiItem[], channel.currency.Address);
      await contract.methods
        .transfer(channel.currency.cryptoReceivingAddress, web3.utils.toWei(invoice.amountToPay.toString(), 'ether'))
        .send({ from: walletAddress })
        .then(() => onSubmit())
        .catch(() => {
          BsSwal.fire({
            title: 'Error',
            icon: 'error',
          });
        });
    } else if (walletAddress === '') {
      BsSwal.fire({
        title: t('tradingComponentsAtomicSwapConnectWalletLabel'),
        icon: 'error',
      });
    }
  };

  return (
    <>
      <CardHeader text="Metamask Payment Request" imgSrc={BANK} />
      <CardBody>
        <div style={{ whiteSpace: 'pre-wrap' }}>{channel.details}</div>
        <br />
        {t('tradingComponentsAtomicSwapConnectWalletText')}
        <Row>
          <Col md={5}>
            <Button size="sm" onClick={handleConnectWallet}>
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
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>{t('InvoiceReview-Shares')}</Col>
          <Col>{t('InvoiceReview-PricePerShare')}</Col>
          <Col>{t('InvoiceReview-Quantity')}</Col>
          <Col>{t('InvoiceReview-Total')}</Col>
        </Row>
        <hr />
        <Row>
          <Col>{invoice?.shareType.title}</Col>
          <Col>
            {invoice?.shareType.currency.symbol} {invoice?.shareType.premiumValue}
          </Col>
          <Col>{invoice?.shares}</Col>
          <Col>
            {invoice?.shareType.currency.symbol} {invoice?.amountToPay}
          </Col>
        </Row>
        <hr />
        <div className="d-flex justify-content-end">
          <Button className="ml-auto" onClick={handleSendTransaction}>
            {t('tradingComponentsAtomicSwapSendPayment')}
          </Button>
          <Button onClick={() => hideModal()}>{t('Cancel')}</Button>
        </div>
      </CardBody>
    </>
  );
};

export default DepositFormSendTxBlockchain;
