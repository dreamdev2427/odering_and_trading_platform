import React, { useState } from 'react';
import { History } from 'history';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'reactstrap';

import { Row, Col, Label } from 'atoms';
import InvestingEntityForm from './InvestingEntityForm';

function handleEntityView(history: History) {
  return !!history.location.state;
}

const InvestingEntityNew: React.FC = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(handleEntityView(history));
  const { t } = useTranslation();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Row>
      <Col>
        <Row className="bg-light pointer" onClick={toggle}>
          <Col md={1}>
            <Label className="ti-plus" />
          </Col>

          <Col>
            <b style={{ fontSize: '1rem' }}>{t('entityManagementAddNewEntity')}</b>
          </Col>

          <Col md={1}>
            <Label className="ti-angle-down" />
          </Col>
        </Row>

        <Collapse className="justify-content-end" isOpen={isOpen}>
          <InvestingEntityForm close={toggle} />
        </Collapse>
        <hr style={{ height: '50px' }} />
      </Col>
    </Row>
  );
};

export default InvestingEntityNew;
