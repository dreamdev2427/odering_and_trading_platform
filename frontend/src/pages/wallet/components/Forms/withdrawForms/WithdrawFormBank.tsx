import React, { ChangeEvent } from 'react';

import { InvestorDepositWithdrawAlertInput } from 'services/apollo';
import { Button, CardBody, Col, Input, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import BANK from 'assets/img/bank.png';
import { FormFeedback } from 'reactstrap';

interface WithdrawFormBankProps {
  hideModal: () => void;
  channelDetails: string;
  investorID: number;
  state: InvestorDepositWithdrawAlertInput;
  error: InvestorDepositWithdrawAlertInput;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (isWithdrawRequest: boolean, title: string) => void;
}

const WithdrawFormBank: React.FC<WithdrawFormBankProps> = ({
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
      <CardHeader text={t('withdrawFormCardHeader')} imgSrc={BANK} />
      <CardBody>
        <div style={{ whiteSpace: 'pre-wrap' }}>{channelDetails}</div>
        <br />
        {t('withdrawFormCardBody')}
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
          <Col md={7}>
            <b>{t('withdrawFormBankName')}</b> * <br />
            <Input
              invalid={!!error.bankName}
              type="text"
              max="120"
              value={state.bankName}
              onChange={onChange}
              name="bankName"
              placeholder=""
            />
            <FormFeedback>{error.bankName}</FormFeedback>
          </Col>
        </Row>
        <br />
        <hr />
        <Row>
          <Col md={5}>
            <b>{t('withdrawFormSwift')}</b>* <br />
            <Input
              invalid={!!error.swiftCode}
              type="text"
              max="30"
              value={state.swiftCode}
              onChange={onChange}
              name="swiftCode"
              placeholder=""
            />
            <FormFeedback>{error.swiftCode}</FormFeedback>
          </Col>

          <Col md={5}>
            <b>{t('withdrawFormBankNumber')}</b> *<br />
            <Input
              invalid={!!error.bankAccount}
              type="text"
              max="80"
              name="bankAccount"
              value={state.bankAccount}
              onChange={onChange}
              placeholder=""
            />
            <FormFeedback>{error.bankAccount}</FormFeedback>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <b>{t('withdrawFormDetails')}</b> * <br />
            <label>{t('withdrawFormInvestorIdLabel', {investorID})}</label>
            <textarea rows={5} className="w-100" maxLength={1000} name="details" placeholder="" onChange={onChange} />
            <FormFeedback>{error.details}</FormFeedback>
          </Col>
        </Row>
        <br />
        <hr />
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

export default WithdrawFormBank;
