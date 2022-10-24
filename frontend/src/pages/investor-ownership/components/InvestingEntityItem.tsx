import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { InvestingEntity } from 'services/apollo';
import { Row, Label, CenteredCol, Col } from 'atoms';
import InvestingEntityForm from './InvestingEntityForm';

interface InvestingEntityProps {
  entity: InvestingEntity;
}

const InvestingEntityItem: React.FC<InvestingEntityProps> = ({ entity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Row key={entity.ID} className="bg-light pointer" onClick={toggle}>
        <CenteredCol>{entity.nickname || entity.name}</CenteredCol>
        <CenteredCol>{entity.members.length}</CenteredCol>
        <CenteredCol>{entity.type.title}</CenteredCol>
        <CenteredCol> {t(`Investing-Entity-Status-${entity.isApprovedByAdmin}`)}</CenteredCol>
        <CenteredCol md={1}>
          <Label className="ti-angle-down" />
        </CenteredCol>
      </Row>
      <br />
      <Collapse className="justify-content-end" isOpen={isOpen}>
        <Row className="bg-light pointer">
          <Col>
            <InvestingEntityForm entity={entity} />
          </Col>
        </Row>
      </Collapse>
    </>
  );
};

export default InvestingEntityItem;
