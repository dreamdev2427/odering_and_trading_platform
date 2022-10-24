import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Row, Col, Button } from 'atoms';
import { InvestingEntityMember } from 'services/apollo';
import InvestingEntityMemberForm from './InvestingEntityMemberForm';

interface InvestingEntityMembersProps {
  entityID: number;
  members: InvestingEntityMember[];
}

const InvestingEntityMembers: React.FC<InvestingEntityMembersProps> = ({ entityID, members }) => {
  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <h3>{t('entityItemRowEntityMembers')}</h3>
      <p>{t('entityItemRowEntityMembersNote')}</p>
      <Row>
        {members.map(member => (
          <InvestingEntityMemberForm key={member.ID} entityID={entityID} member={member} />
        ))}
        {isOpen ? (
          <Col md={4}>
            <InvestingEntityMemberForm entityID={entityID} close={() => setOpen(false)} />
          </Col>
        ) : (
          <Col md={4}>
            <Button onClick={() => setOpen(true)}>
              {t('entityItemRowAddNewMember')}
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export default InvestingEntityMembers;
