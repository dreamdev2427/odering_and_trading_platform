import React, { useEffect } from 'react';

import { Card, CardBody, Col, Row, Button } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import styles from '../../../assets/css/verifyInvestorPopUp.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const VerifyInvestorCom = ({ investor, stoID, accessToken, url }) => {
  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.async = true;
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  });

  const { t } = useTranslation();
  const initiateVerifiyInvestorComButton = () => {
    const token = `${accessToken}`;
    const identifier = `${investor.ID}-${stoID}`;
    window.verifyInvestor(token, identifier);
  };

  return (
    <div className="content">
      <Card className={styles}>
        <CardHeader text={t('verifyInvestorComCardTitle')} caption={t('verifyInvestorComCardCaption')} />
        <CardBody>
          <Row>
            <Col>
              <Button id="invest" size="sm" onClick={() => initiateVerifiyInvestorComButton()}>
                Verify Investor Com
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default VerifyInvestorCom;
