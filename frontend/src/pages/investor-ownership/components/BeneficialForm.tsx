import React, { ChangeEvent, useEffect, useState } from 'react';
import { formatISO, parseISO } from 'date-fns';

import {
  InvestorActiveStoDocument,
  InvestorBeneficialInput,
  InvestorSto,
  useBeneficialUpdateMutation,
} from 'services/apollo';

import { BsSwal, Button, Col, DatePicker, Form, FormGroup, Input, Row, Select } from 'atoms';
import { Label } from 'reactstrap';
import { useTranslation } from "react-i18next";

interface BeneficialFormProps {
  person: InvestorSto;
  countries: Array<Country>;
}

const getFormData: (person: InvestorSto) => InvestorBeneficialInput = (person) => {
  const {
    ID,
    beneficialFirstName = '',
    beneficialLastName = '',
    beneficialAddress = '',
    beneficialCity = '',
    beneficialCountry = '',
    beneficialEmail = '',
    beneficialNationality = '',
  } = person;

  return {
    ID,
    beneficialFirstName,
    beneficialLastName,
    beneficialAddress,
    beneficialCity,
    beneficialCountry,
    beneficialEmail,
    beneficialNationality,
  } as InvestorBeneficialInput ;
};

type Country = { value: string; label: string };

const getDOB: (person: InvestorSto) => Date | any = ({ beneficialBirth = null }) => {
  return beneficialBirth && parseISO(beneficialBirth);
};

const BeneficialFrom: React.FC<BeneficialFormProps> = ({ person, countries }) => {
  const [editMode, setEditMode] = useState(false);
  const [state, setState] = useState<InvestorBeneficialInput>(getFormData(person));
  const [dob, setDob] = useState<Date | null>(getDOB(person));
  const [update] = useBeneficialUpdateMutation();
  const { t } = useTranslation();

  useEffect(() => {
    setState(getFormData(person));
  }, [person]);

  const onChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const onSelectChange: (e: Country) => void = (e) => {
    setState({ ...state, beneficialCountry: e.value });
  };

  const onSave = () => {
    const data = { ...state };
    if (!dob) {
      return BsSwal.fire({
        title: '"Date of Birth" is not allowed to be empty',
        icon: 'error',
      });
    }

    data.beneficialBirth = formatISO(dob, { representation: 'date' });
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
    setDob(getDOB(person));
  };

  return (
    <Form>
      <Row>
        <Col lg={6} xs={12}>
          <FormGroup>
            <Label for="beneficial-first-name">{t('First-Name')}</Label>
            <Input
              id="beneficial-first-name"
              max="70"
              disabled={!editMode}
              name="beneficialFirstName"
              placeholder="Enter Beneficial’s Full Name"
              onChange={onChange}
              value={state.beneficialFirstName}
            />
          </FormGroup>
        </Col>
        <Col lg={6} xs={12}>
          <FormGroup>
            <Label for="beneficial-last-name">{t('Last Name')}</Label>
            <Input
              id="beneficial-last-name"
              max="70"
              disabled={!editMode}
              onChange={onChange}
              name="beneficialLastName"
              placeholder="Enter Beneficial’s Full Name"
              value={state.beneficialLastName}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xl={10}>
          <FormGroup>
            <Label for="beneficial-address">{t('Address')}</Label>
            <Input
              id="beneficial-address"
              max="90"
              disabled={!editMode}
              name="beneficialAddress"
              onChange={onChange}
              placeholder="Enter Beneficial’s Address"
              value={state.beneficialAddress}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg={6} xs={12}>
          <FormGroup>
            <Label for="beneficial-city">{t('City')}</Label>
            <Input
              id="beneficial-city"
              max="70"
              disabled={!editMode}
              onChange={onChange}
              name="beneficialCity"
              placeholder="Enter Beneficial’s City"
              value={state.beneficialCity}
            />
          </FormGroup>
        </Col>
        <Col lg={6} xs={12}>
          <FormGroup>
            <Label for="beneficial-country">{t('Country')}</Label>
            <Select
              name="country"
              overrideStyles={!editMode ? { background: '#e9ecef', borderColor: '#ced4da' } : null}
              isDisabled={!editMode}
              value={{ value: state.beneficialCountry, label: state.beneficialCountry }}
              onChange={onSelectChange}
              options={countries}
              placeholder="Enter Beneficial’s Country"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xl={8}>
          <FormGroup>
            <Label for="beneficial-email">{t('Email')}</Label>
            <Input
              id="beneficial-email"
              max="70"
              disabled={!editMode}
              onChange={onChange}
              name="beneficialEmail"
              placeholder="Enter Beneficial’s Email Address"
              value={state.beneficialEmail}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg={6} xs={12}>
          <FormGroup>
            <Label for="beneficial-dob">{t('Date-of-Birth')}</Label>
            <DatePicker
              id="beneficial-dob"
              placeholderText="Enter Beneficial’s DOB"
              dateFormat="dd.MM.yyyy"
              showPopperArrow={false}
              disabled={!editMode}
              selected={dob}
              onChange={(date: Date) => setDob(date)}
            />
          </FormGroup>
        </Col>
        <Col lg={6} xs={12}>
          <FormGroup>
            <Label for="beneficial-nationality">{t('Nationality')}</Label>
            <Input
              id="beneficial-nationality"
              max="70"
              disabled={!editMode}
              onChange={onChange}
              name="beneficialNationality"
              placeholder="Enter Beneficial’s Nationality"
              value={state.beneficialNationality}
            />
          </FormGroup>
        </Col>
      </Row>
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

export default BeneficialFrom;
