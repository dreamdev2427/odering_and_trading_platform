import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  InvestingEntity,
  InvestingEntityInput,
  InvestingEntityPaymentMethods,
  useInvestorInvestingEntityCreateMutation,
  useInvestorInvestingEntityUpdateMutation,
  InvestorInvestingEntitiesDocument,
} from 'services/apollo';
import { BsSwal, Form } from 'atoms';
import { QueryInfo } from '@apollo/client/core/QueryInfo';
import useGqlErrorExtractor from 'hooks/useGqlErrorExtractor';
import InvestingEntityFormControl from './InvestingEntityFormControl';
import InvestingEntityFormBase from './InvestingEntityFormBase';
import InvestingEntityFormAddress from './InvestingEntityFormAddress';
import InvestingEntityMembers from './InvestingEntityMembers';
import InvestingEntityFormPayment from './InvestingEntityFormPayment';

interface InvestingEntityFormProps {
  entity?: InvestingEntity;
  close?: () => void;
}

const fillState = (entity?: Partial<InvestingEntity>): InvestingEntityInput => {
  return {
    name: entity?.name || '',
    nickname: entity?.nickname || '',
    typeID: entity?.type?.ID || 1,
    accredited: entity?.accredited || false,
    taxId: entity?.taxId || '',
    address: entity?.address || '',
    city: entity?.city || '',
    state: entity?.state || '',
    postalCode: entity?.postalCode || '',
    country: entity?.country || '',
    paymentMethod: entity?.paymentMethod || InvestingEntityPaymentMethods.Ach,
  };
};

const InvestingEntityForm: React.FC<InvestingEntityFormProps> = ({ entity, close }) => {
  const prefUS = entity || { country: 'United States' };
  const [state, setState] = useState(fillState(prefUS));
  const [error, setGqlError] = useGqlErrorExtractor(fillState());
  const history = useHistory<{ id: string }>();
  const { t } = useTranslation();

  const [createEntity] = useInvestorInvestingEntityCreateMutation({
    refetchQueries: [{ query: InvestorInvestingEntitiesDocument }],
  });
  const [updateEntity] = useInvestorInvestingEntityUpdateMutation({
    refetchQueries: [{ query: InvestorInvestingEntitiesDocument }],
  });

  const handleChange = (data: Partial<InvestingEntityInput>) => {
    setState((prev) => ({ ...prev, ...data }));
    if (data.accredited) {
      return BsSwal.fire({
        title: t('Accredition-Acceptence-popup-title'),
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: t('Accredition-Acceptence-popup-confirm-button'),
        cancelButtonText: t('Accredition-Acceptence-popup-cancel-button'),
      }).then((result) => {
        if (result.isConfirmed) {
          return false;
        }
        setState((prev) => ({ ...prev, accredited: false }));
      });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { ...state, taxId: state.taxId.replace(/[^A-Z0-9]/gi, '') };
    if (entity) {
      updateEntity({ variables: { data, entityID: entity.ID } })
        .then(() => {
          BsSwal.fire({
            title: t('InvestingEntityForm-saveEntity-success-popUp-title'),
            icon: 'success',
            confirmButtonText: t('ok'),
          });
        })
        .catch((err: QueryInfo) => {
          setGqlError(err);
        });
    } else if (close) {
      createEntity({ variables: { data } })
        .then(() => {
          close();
          setState(fillState(prefUS));

          if (history?.location?.state) {
            BsSwal.fire({
              title: t('MarketSpace-createnewEntity-redirect-popup-title-text'),
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: t('MarketSpace-createnewEntity-redirect-confirm-text'),
              cancelButtonText: t('MarketSpace-createnewEntity-redirect-cancel-text'),
            }).then((result) => {
              if (result.isConfirmed) {
                history.push({
                  pathname: `/investor/buy-property/${history.location.state.id}`,
                  state: { ...history.location.state },
                });
              }
            });
          }

          BsSwal.fire({
            title: t('InvestingEntityForm-saveEntity-success-popUp-title'),
            icon: 'success',
            confirmButtonText: t('ok'),
          }).then((result) => {
            if (result.isConfirmed) {
              history.push({
                pathname: `/investor/buy-property/${history.location.state.id}`,
                state: { ...history.location.state },
              });
            }
          });
        })
        .catch((err: QueryInfo) => {
          setGqlError(err);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InvestingEntityFormBase state={state} onChange={handleChange} validationError={error} />
        <InvestingEntityFormAddress state={state} onChange={handleChange} validationError={error} />
        <InvestingEntityFormPayment state={state} onChange={handleChange} />
        <InvestingEntityFormControl entityID={entity?.ID || 0} />
      </Form>
      {entity ? <InvestingEntityMembers entityID={entity.ID} members={entity.members} /> : null}
    </>
  );
};

export default InvestingEntityForm;
