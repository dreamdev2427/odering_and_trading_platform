import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  InvestorActiveStoDocument,
  InvestorSto,
  InvestorUsufructuaryInput,
  useUsufructuaryUpdateMutation,
} from 'services/apollo';

import { BsSwal, Button, Col, Form, FormGroup, GrayDot, Input, Row, Select } from 'atoms';
import { CustomInput, Label } from 'reactstrap';
import { useTranslation } from "react-i18next";

interface UsufructuaryFormProps {
  person: InvestorSto;
  countries: Array<Country>;
}

type Country = { value: string; label: string };

const getFormData: (person: InvestorSto) => InvestorUsufructuaryInput = (person) => {
  const {
    ID,
    isUsufructuary = 0,
    usufructuaryAddress = '',
    usufructuaryCity = '',
    usufructuaryCountry = '',
    usufructuaryEmail = '',
    usufructuaryFirstName = '',
    usufructuaryLastName = '',
  } = person;

  return {
    ID,
    isUsufructuary,
    usufructuaryAddress,
    usufructuaryCity,
    usufructuaryCountry,
    usufructuaryEmail,
    usufructuaryFirstName,
    usufructuaryLastName,
  } as InvestorUsufructuaryInput;
};

const UsufructuaryFrom: React.FC<UsufructuaryFormProps> = ({ person, countries }) => {
  const [editMode, setEditMode] = useState(false);
  const [state, setState] = useState<InvestorUsufructuaryInput>(getFormData(person));
  const [update] = useUsufructuaryUpdateMutation();

  const { t } = useTranslation();
  useEffect(() => {
    setState(getFormData(person));
  }, [person]);

  const onSelectChange: (e: Country) => void = (e) => {
    setState({ ...state, usufructuaryCountry: e.value });
  };

  const onChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const changeRadio: (isUsufructuary: number) => void = (isUsufructuary) => {
    setState((prevState) => ({ ...prevState, isUsufructuary }));
  };

  const onSave = () => {
    let data = { isUsufructuary: 0, ID: state.ID } as InvestorUsufructuaryInput;
    if (state.isUsufructuary === 1) {
      data = { ...state };
    }

    return update({
      variables: { data },
      refetchQueries: [{ query: InvestorActiveStoDocument, variables: { _id: person.stoID } }],
    })
      .then(() => {
        setEditMode(false);
      })
      .catch((err) =>
        BsSwal.fire({
          title: err.message,
          icon: 'error',
        }),
      );
  };

  const onCancel = () => {
    setEditMode(false);
    setState(getFormData(person));
  };

  return (
    <Form>
      {editMode ? (
        <Row>
          <Col xs="auto">
            <FormGroup check>
              <CustomInput
                id="type-retail"
                type="radio"
                name="type"
                checked={state.isUsufructuary === 0}
                onChange={() => changeRadio(0)}
                label={t('I-am-the-legal-owner-of-the-shares')}
              />
            </FormGroup>
          </Col>
          <Col xs="auto">
            <FormGroup check>
              <CustomInput
                id="type-angel"
                type="radio"
                name="type"
                checked={state.isUsufructuary === 1}
                onChange={() => changeRadio(1)}
                label={t('I-am-the-usufructuary-of-the-shares')}
              />
            </FormGroup>
          </Col>
        </Row>
      ) : (
        <div className="text-success d-flex">
          <GrayDot big />
          <p>
            {state.isUsufructuary
              ? t('I-am-the-usufructuary-of-the-shares')
              : t('I-am-the-legal-owner-of-the-shares')}
          </p>
        </div>
      )}
      {state.isUsufructuary === 1 ? (
        <>
          <Row>
            <Col lg={6} xs={12}>
              <FormGroup>
                <Label for="first-name">{t('First-Name')}</Label>
                <Input
                  id="first-name"
                  max="70"
                  disabled={!editMode}
                  name="usufructuaryFirstName"
                  placeholder="Enter Legal Owner’s First Name"
                  onChange={onChange}
                  value={state.usufructuaryFirstName}
                />
              </FormGroup>
            </Col>
            <Col lg={6} xs={12}>
              <FormGroup>
                <Label for="last-name">{t('Last Name')}</Label>
                <Input
                  id="last-name"
                  max="70"
                  disabled={!editMode}
                  onChange={onChange}
                  name="usufructuaryLastName"
                  placeholder="Enter Legal Owner’s Last Name"
                  value={state.usufructuaryLastName}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={10}>
              <FormGroup>
                <Label for="address">{t('Address')}</Label>
                <Input
                  id="address"
                  max="90"
                  disabled={!editMode}
                  name="usufructuaryAddress"
                  onChange={onChange}
                  placeholder="Enter Legal Owner’s Address"
                  value={state.usufructuaryAddress}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6} xs={12}>
              <FormGroup>
                <Label for="city">{t('City')}</Label>
                <Input
                  id="city"
                  max="70"
                  disabled={!editMode}
                  onChange={onChange}
                  name="usufructuaryCity"
                  placeholder="Enter Legal Owner’s City"
                  value={state.usufructuaryCity}
                />
              </FormGroup>
            </Col>
            <Col lg={6} xs={12}>
              <FormGroup>
                <label>{t('Country')}</label>
                <Select
                  id="country"
                  name="country"
                  overrideStyles={!editMode ? { background: '#e9ecef', borderColor: '#ced4da' } : null}
                  isDisabled={!editMode}
                  placeholder="Enter Legal Owner’s Country"
                  value={{ value: state.usufructuaryCountry, label: state.usufructuaryCountry }}
                  onChange={onSelectChange}
                  options={countries}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <FormGroup>
                <Label for="email">{t('Email')}</Label>
                <Input
                  id="email"
                  max="70"
                  disabled={!editMode}
                  onChange={onChange}
                  name="usufructuaryEmail"
                  placeholder="Enter Legal Owner’s Email Address"
                  value={state.usufructuaryEmail}
                />
              </FormGroup>
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}
      <FormGroup>
        <Row>
          <Col>
            {editMode ? (
              <>
                <Button key="save-btn-0" size="md" type="button" onClick={onSave}>
                  {t('Save')}
                </Button>
                <Button key="cancel-btn-0" size="md" type="button" onClick={onCancel}>
                  {t('Cancel')}
                </Button>
              </>
            ) : (
              <Button size="md" onClick={() => setEditMode(true)}>
                {t('Edit')}
              </Button>
            )}
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
};

export default UsufructuaryFrom;
