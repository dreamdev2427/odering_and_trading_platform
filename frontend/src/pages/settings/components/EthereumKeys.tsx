import React, { useState } from 'react';
import { ButtonGroup, Col, Collapse, Input, Label, Row } from 'reactstrap';
import { useMetaMask } from 'metamask-react';
import Web3 from 'web3';

import {
  InvestorPublicKeysDocument,
  useInvestorPublicKeyAddMutation,
  useInvestorPublicKeyDeleteMutation,
  useInvestorPublicKeysQuery,
  useInvestorAppDataQuery,
} from 'services/apollo';

import { BsSwal, Button, Card, CardBody, FormGroup, Loading } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import WALLET from 'assets/img/blockchainwallet.png';
import { useTranslation } from 'react-i18next';

const EthereumKeys: React.FC = () => {
  const { data: appData } = useInvestorAppDataQuery();
  const { data, loading } = useInvestorPublicKeysQuery();
  const [addKey] = useInvestorPublicKeyAddMutation();
  const [deleteKey] = useInvestorPublicKeyDeleteMutation();
  const { t } = useTranslation();
  const [publickey, setPublickey] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const { status, connect, account } = useMetaMask();
  const [radioEthereumStatus, setradioEthereumStatus] = React.useState(0);
  const [radioVerifyAddressTypeStatus, setRadioVerifyAddressTypeStatus] = React.useState(0);

  if (loading || !data) {
    return <Loading />;
  }

  const onAdd = () => {
    if (!publickey) {
      return BsSwal.fire({
        title: t('Please-enter-new-public-key'),
        icon: 'error',
      });
    }

    let isAlreadyInList = 0;
    data?.investorPublicKeys?.forEach((obj) => {
      if (obj.title.toLowerCase() === publickey.toLowerCase()) isAlreadyInList = 1;
    });

    if (isAlreadyInList === 1) {
      return BsSwal.fire({
        title: t('duplicate-address-in-list'),
        icon: 'error',
      });
    }

    if (radioEthereumStatus === 0) {
      return BsSwal.fire({
        title: t('please-select-address-type'),
        icon: 'error',
      });
    }

    if (radioEthereumStatus === 1) {
      if (Web3.utils.isAddress(publickey) === false) {
        return BsSwal.fire({
          title: t('invalid-etherium-address'),
          icon: 'error',
        });
      }

      if (radioVerifyAddressTypeStatus === 1) {
        if (status !== 'connected') {
          return BsSwal.fire({
            title: t('metamask-disconnected-verify'),
            icon: 'error',
          });
        }

        if (publickey?.toLowerCase() !== account?.toLowerCase()) {
          return BsSwal.fire({
            title: t('incorrect-metamask-account-selected'),
            icon: 'error',
          });
        }

        setradioEthereumStatus(0);
        saveNewKey();
      } else {
        if (cryptoAmount === '') {
          return BsSwal.fire({
            title: t('input-eth'),
            icon: 'error',
          });
        }

        if (Number.isNaN(Number(cryptoAmount))) {
          return BsSwal.fire({
            title: t('non-numeric'),
            icon: 'error',
          });
        }

        const tmpLinkToBlockchainServer: string = appData?.investorAppParameters.web3Address
          ? appData?.investorAppParameters.web3Address
          : '';
        const web3 = new Web3(new Web3.providers.HttpProvider(tmpLinkToBlockchainServer));

        web3.eth.getBalance(publickey, function (err, result) {
          if (err) {
            return BsSwal.fire({
              title: t('amount-failed-verify'),
              icon: 'error',
            });
          }
          if (Number(cryptoAmount) !== Number(web3.utils.fromWei(result, 'ether'))) {
            return BsSwal.fire({
              title: t('incorrect-wallet-amount'),
              icon: 'error',
            });
          }

          setradioEthereumStatus(0);
          saveNewKey();
        });
      }
    }

    if (radioEthereumStatus === 5) {
      if (publickey.length <= 32) {
        return BsSwal.fire({
          title: t('invalid-ravencoin-address'),
          icon: 'error',
        });
      }

      saveNewKey();
      setradioEthereumStatus(0);
    }

    if (radioEthereumStatus === 6) {
      // TODO add check to verify polymesh key
      saveNewKey();
      setradioEthereumStatus(0);
    }
  };

  const saveNewKey = () => {
    return addKey({
      variables: { title: publickey, blockchainID: radioEthereumStatus },
      refetchQueries: [{ query: InvestorPublicKeysDocument }],
    }).then(() => {
      setPublickey('');
    });
  };

  const onDelete = (_id: number) =>
    BsSwal.fire({
      title: t('Are-you-sure-you-want-to-delete-this-public-key'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Delete'),
      cancelButtonText: t('Cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        return deleteKey({
          variables: { _id },
          refetchQueries: [{ query: InvestorPublicKeysDocument }],
        });
      }
    });

  return (
    <Card>
      <CardHeader
        text={t('Shared-Ethereum-Public-Keys')}
        caption={t('Please-provide-the-list-of-public-keys-from-your-wallet')}
        imgSrc={WALLET}
      />
      <CardBody>
        <h3> List of Wallets </h3>
        {data?.investorPublicKeys?.length ? (
          data?.investorPublicKeys?.map((key) => (
            <Row key={key.ID}>
              <Col xs="auto">
                <Button size="sm" onClick={() => onDelete(key.ID)}>
                  {t('Delete')}
                </Button>
              </Col>
              <Col>
                <p className="mt-2">{key.title}</p>
              </Col>
            </Row>
          ))
        ) : (
          <h3>{t('No-Public-Keys-Found')}</h3>
        )}

        <br />
        <Label for="publickey">{t('Enter-a-new-key-from-your-wallet')}</Label>
        <Row>
          <Col>
            <FormGroup className="mt-2">
              <Input
                id="publickey"
                name="publickey"
                max="50"
                type="text"
                placeholder={t('Enter-Public-Key')}
                onChange={(e) => setPublickey(e.currentTarget.value)}
                value={publickey}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={3}>{t('Add-Address-Type')}</Col>
          <Col>
            <ButtonGroup size="md">
              <Button color="success" onClick={() => setradioEthereumStatus(1)} active={radioEthereumStatus === 1}>
                Ethereum
              </Button>
              <Button color="success" onClick={() => setradioEthereumStatus(5)} active={radioEthereumStatus === 5}>
                Ravencoin
              </Button>
              <Button color="success" onClick={() => setradioEthereumStatus(6)} active={radioEthereumStatus === 6}>
                Polymesh
              </Button>
            </ButtonGroup>
          </Col>
        </Row>

        <Collapse isOpen={radioEthereumStatus === 1}>
          {radioEthereumStatus === 1 && (
            <div>
              <br />

              <Row>
                <Col xs={3} />
                <Col>
                  <ButtonGroup size="md">
                    <Button
                      color="success"
                      onClick={() => setRadioVerifyAddressTypeStatus(0)}
                      active={radioVerifyAddressTypeStatus === 0}
                    >
                      {t('verify-crypto-amount')}
                    </Button>
                    <Button
                      color="success"
                      onClick={() => setRadioVerifyAddressTypeStatus(1)}
                      active={radioVerifyAddressTypeStatus === 1}
                    >
                      {t('verify-metamask')}
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>

              <Collapse isOpen={radioVerifyAddressTypeStatus === 0}>
                {radioVerifyAddressTypeStatus === 0 && (
                  <div>
                    <Row>
                      <Col xs={3} />
                      <Col xs={3}>
                        {t('eth-wallet-balance')}
                        <br />
                        <FormGroup className="mt-2">
                          <Input
                            id="amount"
                            name="amount"
                            max="50"
                            type="text"
                            onChange={(e) => setCryptoAmount(e.currentTarget.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                )}
              </Collapse>
              <Collapse isOpen={radioVerifyAddressTypeStatus === 1}>
                {radioVerifyAddressTypeStatus === 1 && (
                  <div>
                    <Row>
                      <Col xs={3} />
                      <Col xs={9}>
                        <Button onClick={connect}>{t('connect-metamask')}</Button>
                        {status === 'connected' ? (
                          <span>
                            <br />
                            <b>{t('connected')}</b> - {account}
                          </span>
                        ) : (
                          <span>
                            <br />
                            <b>{t('not-connected')}</b>
                          </span>
                        )}
                      </Col>
                    </Row>
                  </div>
                )}
              </Collapse>
            </div>
          )}
        </Collapse>

        <Row>
          <Col>
            <Button size="md" onClick={onAdd}>
              {t('Add-Key')}
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default EthereumKeys;
