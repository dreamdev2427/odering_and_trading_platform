import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  InvestingEntityMember,
  InvestingEntityMemberInput,
  InvestingEntityMemberRoles,
  InvestorInvestingEntitiesDocument,
  useInvestorInvestingEntityMemberCreateMutation,
  useInvestorInvestingEntityMemberRemoveMutation,
  useInvestorInvestingEntityMemberUpdateMutation,
} from 'services/apollo';
import { Card, CardBody, Col, Form, FormGroup, Row, Input, Label, Select, Button, BsSwal } from 'atoms';
import { keys } from 'lib/helpers';
import { INVESTING_MEMBER_ROLES } from 'pages/investor-ownership/constants';
import { Alert } from 'reactstrap';
import { QueryInfo } from '@apollo/client/core/QueryInfo';
import useGqlErrorExtractor from '../../../hooks/useGqlErrorExtractor';

interface InvestingEntityMemberFormProps {
  member?: InvestingEntityMember;
  entityID: number;
  close?: () => void;
}

const fillState = (entityID: number, member?: InvestingEntityMember): InvestingEntityMemberInput => {
  return {
    entityID,
    firstName: member?.firstName || '',
    lastName: member?.lastName || '',
    role: member?.role || InvestingEntityMemberRoles.Investor,
    signatory: member?.signatory || false,
    email: member?.email || '',
  };
};

const InvestingEntityMemberForm: React.FC<InvestingEntityMemberFormProps> = ({ member, entityID, close }) => {
  const [state, setState] = useState(fillState(entityID, member));
  const [error, setGqlError] = useGqlErrorExtractor(fillState(0));

  const onChange = (data: Partial<InvestingEntityMemberInput>) => {
    setState((prev) => ({ ...prev, ...data }));
  };
  const { t } = useTranslation();

  const roleOptions = keys(INVESTING_MEMBER_ROLES).map((key) => ({
    value: key,
    label: INVESTING_MEMBER_ROLES[key],
  }));

  const selectedOption = roleOptions.find((x) => x.value === state.role);

  const signatoryOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const selectedSignatory = signatoryOptions.find((x) => (state.signatory ? x.value === 'yes' : x.value === 'no'));

  const [createMember] = useInvestorInvestingEntityMemberCreateMutation({
    refetchQueries: [{ query: InvestorInvestingEntitiesDocument }],
  });
  const [updateMember] = useInvestorInvestingEntityMemberUpdateMutation({
    refetchQueries: [{ query: InvestorInvestingEntitiesDocument }],
  });
  const [removeMember] = useInvestorInvestingEntityMemberRemoveMutation({
    refetchQueries: [{ query: InvestorInvestingEntitiesDocument }],
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (member) {
      updateMember({ variables: { data: state, memberID: member.ID } }).catch((err: QueryInfo) => {
        setGqlError(err);
      });
    } else if (close) {
      createMember({ variables: { data: state } })
        .then(() => {
          close();
        })
        .catch((err: QueryInfo) => {
          setGqlError(err);
        });
    }
  };

  const remove = () => {
    if (!member) {
      return;
    }

    BsSwal.fire({
      title: 'Delete the memeber?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Delete'),
      cancelButtonText: t('Cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        removeMember({ variables: { memberID: member.ID } }).then(() => {
          // show toast
        });
      }
    });
  };

  return (
    <Card>
      <CardBody className="mb-2">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Label>{t('entityItemRowLegalEntityNameLabel')}</Label>
                <Input
                  name="firstName"
                  invalid={error.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ firstName: e.target.value });
                    error.firstName = '';
                  }}
                  placeholder={t('entityItemRowLegalEntityNameLabel')}
                  value={state.firstName}
                />
                {error.firstName ? <Alert color="danger">{error.firstName}</Alert> : ''}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>{t('entityItemMemberLastNameLabel')}</Label>
                <Input
                  name="lastName"
                  invalid={error.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ lastName: e.target.value });
                    error.lastName = '';
                  }}
                  placeholder={t('entityItemMemberLastNameLabel')}
                  value={state.lastName}
                />
                {error.lastName ? <Alert color="danger">{error.lastName}</Alert> : ''}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>{t('entityItemMemberRoleLabel')}</Label>
                <Select
                  class="form-control border-input"
                  name="memberRole"
                  options={roleOptions}
                  value={selectedOption}
                  onChange={({ value }: { value: InvestingEntityMemberRoles }) => onChange({ role: value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>{t('entityItemMemberSignatoryLabel')}</Label>
                <Select
                  class="form-control border-input"
                  name="accountType"
                  options={signatoryOptions}
                  value={selectedSignatory}
                  onChange={({ value }: { value: string }) => onChange({ signatory: value === 'yes' })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>{t('entityItemMemberEmailLabel')}</Label>
                <Input
                  name="email"
                  type="email"
                  invalid={error.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ email: e.target.value });
                    error.email = '';
                  }}
                  placeholder={t('entityItemMemberEmailLabel')}
                  value={state.email}
                />
                {error.email ? <Alert color="danger">{error.email}</Alert> : ''}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="submit">Save</Button>
            </Col>
            {member?.ID ? (
              <Col>
                <Button className="btn-danger btn-fill btn-lg ti-trash" onClick={remove} />
              </Col>
            ) : null}
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default InvestingEntityMemberForm;
