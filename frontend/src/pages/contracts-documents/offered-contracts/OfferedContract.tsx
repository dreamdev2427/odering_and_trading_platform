import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { useContractsPageQuery } from 'services/apollo';

import { Card, CardBody, Loading } from 'atoms';
import { useModal } from 'components/Modal';
import { CardHeader } from 'components/card-header/CardHeader';
import { Offer } from './components/Offer';
import Contract from '../contract/Contract';

export const OfferedContracts: FC = (): ReactElement => {
  const modal = useModal();
  const { t } = useTranslation();
  const handleShowModal = (title: string, id: string) => {
    modal.showModal({
      title,
      className: 'w-75 mw-100',
      submitText: 'Save',
      showFooter: false,
      cancelText: 'Cancel',
      bodyContent: () => <Contract id={id} />,
    });
  };

  const { data, loading } = useContractsPageQuery({
    fetchPolicy: 'no-cache',
  });
  if (loading || !data) return <Loading />;
  return (
    <Card>
      <CardHeader text={t('offered-contracts')} caption={t('offered-contracts-caption')} imgSrc="/img/contracts.png" />
      <CardBody className="mb-2">
        {data.offeredDocuments.length === 0 ? (
          <label className="my-3 m-auto">{t('No-Records-Found')}</label>
        ) : (
          data.offeredDocuments.map((offer) => (
            <Offer
              key={offer.document?.ID ?? 0}
              ID={offer.document?.ID ?? 0}
              title={offer.title}
              to={offer.to}
              handleShowModal={handleShowModal}
            />
          ))
        )}
      </CardBody>
    </Card>
  );
};
