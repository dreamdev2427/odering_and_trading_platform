import React, { ChangeEvent } from 'react';

import { InvestorDepositWithdrawAlertInput } from 'services/apollo';
import { Button, CardBody, Col, Input, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import BANK from 'assets/img/bank.png';
import { FormFeedback } from 'reactstrap';

interface DepositFormBankProps {
  hideModal: () => void;
  channelDetails: string;
  investorID: number;
  state: InvestorDepositWithdrawAlertInput;
  error: InvestorDepositWithdrawAlertInput;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (isWithdrawRequest: boolean, title: string) => void;
}

const DepositFormBank: React.FC<DepositFormBankProps> = ({
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
      <CardHeader imgSrc={BANK} text={t('depositFormCardHeader')} />
      <CardBody>
        <div style={{ whiteSpace: 'pre-wrap' }}>{channelDetails}</div>
        <br />
        <b>{t('depositFormCardBody')} </b>
        <br />
        <hr />
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
          <Col md={7}>
            <b>{t('depositFormBankName')}</b> * <br />
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
        <Row>
          <Col md={5}>
            <b>{t('depositFormSwift')}</b> * <br />
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
            <b>{t('depositFormBankNumber')}</b> * <br />
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
        <br />
        <hr />
        <Row>
          <Col md={12}>
            <b>{t('depositFormDetails')}</b> * <br />
            <label>{t('depositFormInvestorIdLabel', {investorID})}</label>
            <textarea rows={5} className="w-100" maxLength={1000}
                      name="details" placeholder="" onChange={onChange}
                      defaultValue={`InvestorID: ${investorID}`}/>
            <FormFeedback>{error.details}</FormFeedback>
          </Col>
        </Row>
        <hr />
        <div className="d-flex justify-content-end">
          <Button className="ml-auto" onClick={onSubmit}>
            {t('depositFormSendButton')}
          </Button>
          <Button onClick={() => hideModal()}>
            {t('Cancel')}
          </Button>
        </div>
      </CardBody>
    </>
  );
};

export default DepositFormBank;
