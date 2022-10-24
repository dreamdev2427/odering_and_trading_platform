import React, { ChangeEvent } from 'react';

import { InvestorDepositWithdrawAlertInput, VerifyCryptoReciepeInput } from 'services/apollo';
import { Button, CardBody, Col, Input, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import BANK from 'assets/img/bank.png';
import { Alert, FormFeedback } from 'reactstrap';

interface DepositFormVerifyTxBlockchainProps {
  hideModal: () => void;
  channelDetails: string;
  investorID: number;
  state: VerifyCryptoReciepeInput;
  error: InvestorDepositWithdrawAlertInput;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

const DepositFormVerifyTxBlockchain: React.FC<DepositFormVerifyTxBlockchainProps> = ({
  hideModal,
  channelDetails,
  investorID,
  state,
  error,
  onChange,
  onSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <CardHeader text={t('depositFormCardHeaderBlockchain')} imgSrc={BANK} />
      <CardBody>
        <div style={{ whiteSpace: 'pre-wrap' }}>{channelDetails}</div>
        <br />
        {t('depositFormCardBodyBlockchain')}
        <Row>
          <Col md={5}>
            <b>{t('depositFormAmount')}</b> * <br />
            <Input
              invalid={!!error.amount}
              name="amount"
              placeholder=""
              type="number"
              onChange={onChange}
              value={state.amount}
            />
            <FormFeedback>{error.amount}</FormFeedback>
          </Col>
        </Row>
        <br />
        <hr />
        <Row>
          <Col md={12}>
            <b>{t('depositFormTransactionID')}</b> * <br />
            <Input
              type="text"
              max="120"
              value={state.transactionHash}
              onChange={onChange}
              name="transactionHash"
              placeholder=""
            />
            <FormFeedback>{error.transactionID}</FormFeedback>
          </Col>
        </Row>
        <br />
        <hr />
        <Row>
          <Col md={12}>
            <b>{t('depositFormDetails')}</b> * <br />
            <label>{t('depositFormInvestorIdLabel')}</label>
            <textarea
              value={state.details}
              rows={5}
              className="w-100"
              name="details"
              placeholder=""
              onChange={onChange}
            />
            {error.details ? <Alert color="danger">{error.details}</Alert> : ''}
          </Col>
        </Row>
        <hr />
        <div className="d-flex justify-content-end">
          <Button className="ml-auto" onClick={onSubmit}>
            {t('depositFormSendButton')}
          </Button>
          <Button onClick={() => hideModal()}>{t('Cancel')}</Button>
        </div>
      </CardBody>
    </>
  );
};

export default DepositFormVerifyTxBlockchain;
