import React from 'react';

import { useSendMercuryInstructionalEmailMutation } from 'services/apollo';
import { Button, CardBody, Col, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import BANK from 'assets/img/bank.png';
import { MercuryInfo } from 'services/apollo/graphql';

interface DepositFormMercuryProps {
  hideModal: () => void;
  investorID: number;
  stoID: number;
  mercuryAccount: MercuryInfo;
}

const DepositFormMercury: React.FC<DepositFormMercuryProps> = ({ hideModal, investorID, stoID, mercuryAccount }) => {
  const { t } = useTranslation();
  const [sendEmail] = useSendMercuryInstructionalEmailMutation();

  const sendIntructionalEmail = () => {
    sendEmail({
      variables: {
        note: `I${investorID}S${stoID}`,
        routingNumber: mercuryAccount.routingNumber,
        accountNumber: mercuryAccount.accountNumber,
        stoId: stoID,
      },
    }).then(() => hideModal());
  };
  return (
    <>
      <CardHeader imgSrc={BANK} text="Mercury Transaction Details" />
      <CardBody>
        <h6>
          Initiate a payment to the following account, if your balance does not update within 3 business days, please
          contact the site administrator
        </h6>
        <hr />
        <Row>
          <Col md={3}>
            <label>Routing Number: </label>
          </Col>
          <Col md={5}>
            <label htmlFor="">{mercuryAccount.routingNumber}</label>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <label htmlFor="">Account Number: </label>
          </Col>
          <Col md={5}>
            <label htmlFor="">{mercuryAccount.accountNumber}</label>
          </Col>
        </Row>
        <hr />
        <p className="text-center">
          <b>
            <label>You must include the following note in your transaction: </label>
          </b>
        </p>
        <p className="text-center">
          <h6>{`I${investorID}S${stoID}`}</h6>
        </p>
        <div className="d-flex justify-content-end">
          <Button onClick={sendIntructionalEmail}>{t('Send Instructional Email')}</Button>
          <Button onClick={hideModal}>{t('Close')}</Button>
        </div>
      </CardBody>
    </>
  );
};

export default DepositFormMercury;
