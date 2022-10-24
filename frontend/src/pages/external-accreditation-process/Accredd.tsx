import React from 'react';
import { Card, CardBody, Col, Button, Row, BsSwal } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';

interface AccreddProps {
  accreddRedirectLink: string;
}

const Accredd: React.FC<AccreddProps> = (props) => {
  const { t } = useTranslation();
  const { accreddRedirectLink } = props;

  const handleClick = () => {
    BsSwal.fire({
      title: t('Accredd-bsswal-title'),
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: t('Accredd-bsswal-confirm'),
      cancelButtonText: t('Accredd-bsswal-cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        goToAccredd();
      }
    });
  };

  const goToAccredd = () => {
    const newWindow = window.open(accreddRedirectLink, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div className="content">
      <Card>
        <CardHeader text={t('Accredd-CardTitle')} caption={t('Accredd-CardCaption')} />
        <CardBody>
          <Row>
            <Col>
              <Button id="invest" size="sm" onClick={handleClick}>
                Accredd
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default Accredd;
