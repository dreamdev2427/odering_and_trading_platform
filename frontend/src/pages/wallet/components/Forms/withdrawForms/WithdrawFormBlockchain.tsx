import React, { ChangeEvent } from 'react';

import { InvestorDepositWithdrawAlertInput } from 'services/apollo';
import { Button, CardBody, Col, Input, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import BANK from 'assets/img/bank.png';
import { FormFeedback } from 'reactstrap';

interface WithdrawFormBlockchainProps {
  hideModal: () => void;
  channelDetails: string;
  investorID: number;
  state: InvestorDepositWithdrawAlertInput;
  error: InvestorDepositWithdrawAlertInput;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (isWithdrawRequest: boolean, title: string) => void;
}

const WithdrawFormBlockchain: React.FC<WithdrawFormBlockchainProps> = ({
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
      <CardHeader text={t('withdrawFormCardHeaderBlockchain')} imgSrc={BANK} />
      <CardBody>
        <div style={{ whiteSpace: 'pre-wrap' }}>{channelDetails}</div>
        <br />
        {t('withdrawFormCardBodyBlockchain')}
        <Row>
          <Col md={5}>
            <b>{t('withdrawFormAmount')}</b> * <br />
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
            <b>{t('withdrawFormTransactionID')}</b> * <br />
            <Input
              invalid={!!error.transactionID}
              type="text"
              value={state.transactionID}
              onChange={onChange}
              name="transactionID"
              placeholder=""
            />
            <FormFeedback>{error.transactionID}</FormFeedback>
          </Col>
        </Row>
        <br />
        <hr />
        <Row>
          <Col md={12}>
            <b>{t('withdrawFormDetails')}</b> * <br />
            <label>{t('withdrawFormInvestorIdLabel', {investorID})}</label>
            <textarea rows={5} className="w-100" maxLength={1000} name="details" placeholder="" />
            <FormFeedback>{error.details}</FormFeedback>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button className="ml-auto" onClick={onSubmit}>
            {t('withdrawFormSendButton')}
          </Button>
          <Button onClick={() => hideModal()}>
            {t('Cancel')}
          </Button>
        </div>
      </CardBody>
    </>
  );
};

export default WithdrawFormBlockchain;
