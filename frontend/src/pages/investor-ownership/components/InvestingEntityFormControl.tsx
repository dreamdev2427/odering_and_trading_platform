import React from 'react';

import { Row, Col, Button, BsSwal } from 'atoms';
import { useTranslation } from 'react-i18next';
import { InvestorInvestingEntitiesDocument, useInvestorInvestingEntityRemoveMutation } from 'services/apollo';

interface InvestingEntityFormControlProps {
  entityID: number;
}

const InvestingEntityFormControl: React.FC<InvestingEntityFormControlProps> = ({ entityID }) => {
  const { t } = useTranslation();
  const [remove] = useInvestorInvestingEntityRemoveMutation({
    variables: { entityID },
    refetchQueries: [{ query: InvestorInvestingEntitiesDocument }],
  });

  const handleDiscardEntity = () => {
    BsSwal.fire({
      title: t('entityItemRowConfirmDelete'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Delete'),
      cancelButtonText: t('Cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        remove().then(() => {
          // show toast
        });
      }
    });
  };

  return (
    <>
      <Row>
        <Col>
          <Button type="submit">{t('entityItemRowSaveEntity')}</Button>
          {entityID ? <Button onClick={handleDiscardEntity}>{t('entityItemRowDiscardEntity')}</Button> : null}
        </Col>
      </Row>
    </>
  );
};

export default InvestingEntityFormControl;
