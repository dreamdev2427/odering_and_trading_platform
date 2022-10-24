import React, { useState } from 'react';
import { formatISO, parseISO } from 'date-fns';
import {
  Investor,
  InvestorProfileInput,
  MeDocument,
  InvestorSto,
  useInvestorProfileMutation,
} from 'services/apollo/graphql';

import { BsSwal, Button, Col, DatePicker, Form, FormGroup, Input, Row, Select } from 'atoms/index';
import { useTranslation } from 'react-i18next';
import { Alert, CustomInput } from 'reactstrap';
import { AppData } from 'services/apollo/core';

export type Country = { value?: string; label?: string };

interface PersonalInformationFormProps {
  investor: Investor;
  investorSTO: Partial<InvestorSto>;
  investorTypes: number[];
  countries: Country[];
  nextStep?(): void;
  appData: AppData;
}

type FormState = Partial<Investor> & Partial<InvestorSto>;

const defaultInfo: (investor: Investor, investorSTO: Partial<InvestorSto>) => FormState = (investor, investorSTO) => {
  const state = {
    firstName: investor.firstName || '',
    lastName: investor.lastName || '',
    address: investor.address || '',
    zip: investor.zip || '',
    town: investor.town || '',
    state: investor.state || '',
    phone: investor.phone,
    passportNumber: investor.passportNumber || '',
    nationalID: investor.nationalID || '',
    driversLicenseID: investor.driversLicenseID || '',
    kinname: investor.kinname || '',
    kinphone: investor.kinphone || '',
    kinemail: investor.kinemail || '',
    notes: investorSTO.notes || '',
  };

  if (investor.investorType === 0) {
    return state;
  }

  return {
    ...state,
    companyName: investor.companyName,
    titleWithinCompany: investor.titleWithinCompany,
    powerToBindCompany: investor.powerToBindCompany,
  };
};

const getDOB: (investor: Investor) => Date | null = ({ birthDate = null }) => {
  return birthDate ? parseISO(birthDate) : null;
};

const optionalFields = [
  'kinname',
  'kinphone',
  'kinemail',
  'notes',
  'powerToBindCompany',
  'nationalID',
  'passportNumber',
  'driversLicenseID',
];

const getEmpty = (data: InvestorProfileInput) => {
  const errors = (Object.keys(data) as Array<keyof InvestorProfileInput>)
    .map((key) => (data[key] ? '' : key))
    .filter(Boolean);

  return errors.filter((x) => !optionalFields.includes(x));
};

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  investor,
  investorSTO,
  investorTypes,
  countries,
  appData,
}) => {
  const { t } = useTranslation();
  const [empty, setEmpty] = useState<string[]>([]);
  const [state, setState] = useState<FormState>(defaultInfo(investor, investorSTO));
  const [dob, setDob] = useState<Date | null>(getDOB(investor));
  const [country, setCountry] = useState<string>(investor.country || '');
  const [succsees, setSucsees] = useState<boolean>(false);
  const [update] = useInvestorProfileMutation({ refetchQueries: [{ query: MeDocument }] });

  const onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {
    const index = empty.indexOf(e.currentTarget.name);
    if (index !== -1) {
      empty.splice(index, 1);
      setEmpty(empty);
    }
    const newState: {
      [x: string]: string;
    } = { [e.currentTarget.name]: e.currentTarget.value };
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const onChangeCheck: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setState((prevState) => ({
      ...prevState,
      PowerToBindCompany: prevState.powerToBindCompany ? 0 : 1,
    }));
  };

  const onChangeDob = (date: Date) => {
    const index = empty.indexOf('birthDate');
    if (index !== -1) {
      empty.splice(index, 1);
      setEmpty(empty);
    }
    setDob(date);
  };

  const onChangeCountry = (ctr: Country) => {
    const index = empty.indexOf('country');
    if (index !== -1) {
      empty.splice(index, 1);
      setEmpty(empty);
    }
    if (!ctr.value) return;
    setCountry(ctr.value);
  };

  const handleSubmit: (e: React.FormEvent) => void = (e) => {
    e.preventDefault();
    const data = {
      ...state,
      birthDate: dob ? formatISO(dob, { representation: 'date' }) : '',
      country,
    } as InvestorProfileInput;

    const errors = getEmpty(data);
    if (errors.length) {
      setEmpty(errors);
      return;
    }

    update({ variables: { data } })
      .then(() => {
        setSucsees(true);
        setTimeout(() => {
          setSucsees(false);
        }, 4000);
      })
      .catch((err) => {
        let text = '';
        const message = err.graphQLErrors[0].extensions.exception.validationErrors[0].constraints ?? null;
        if (message) {
          const textKey = Object.keys(message)[0];
          text = message[textKey];
        }
        return BsSwal.fire({
          title: err.message,
          text,
          icon: 'error',
        });
      });
  };

  const typeText = investorTypes?.find((x) => x === investor.investorType);

  const { isDriversLicenseEnabled } = appData;

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <label>{t('My Investor ID')}</label>
            <span className="ml-3">{investor.ID}</span>
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <label>{t('I am a registered as a')}</label>
            <span className="ml-2">{typeText}</span>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <label>
              {t('First-Name')}
              {investor.investorType ? t('of Company Representative') : ''} *
            </label>
            <Input
              invalid={empty.includes('firstName')}
              max="60"
              name="firstName"
              placeholder="First Name"
              onChange={onChange}
              value={state.firstName || ''}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <label>{t('Last-Name')} *</label>
            <Input
              invalid={empty.includes('lastName')}
              max="60"
              name="lastName"
              onChange={onChange}
              placeholder="Last Name"
              value={state.lastName || ''}
            />
          </FormGroup>
        </Col>
      </Row>

      {investor.investorType ? (
        <>
          <Row>
            <Col md={6}>
              <FormGroup>
                <label>{t('Company Name')} *</label>
                <Input
                  invalid={empty.includes('companyName')}
                  max="60"
                  name="companyName"
                  onChange={onChange}
                  placeholder="Company Name"
                  value={state.companyName || ''}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <label>{t('Title within Company')}</label>
                <Input
                  invalid={empty.includes('titleWithinCompany')}
                  max="60"
                  name="titleWithinCompany"
                  placeholder="Title Within Company"
                  value={state.titleWithinCompany || ''}
                  onChange={onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="pt-2">
            <Col md={6}>
              <FormGroup>
                <label>{t('Do you the power to bind the company')} ? </label>
                <CustomInput
                  id="id_3"
                  type="checkbox"
                  className="ml-2 mt-0 z-none"
                  name="powerToBindCompany"
                  onChange={onChangeCheck}
                  checked={Boolean(state.powerToBindCompany)}
                />
              </FormGroup>
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}

      <Row>
        <Col>
          <FormGroup>
            <label>
              {t('Passport Number')} * ( {t('Either Passport or National ID required')} ){' '}
            </label>
            <Input
              max="45"
              invalid={empty.includes('passportNumber')}
              name="passportNumber"
              placeholder="Passport Number"
              value={state.passportNumber}
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label>{t('National ID')} *</label>
            <Input
              invalid={empty.includes('nationalID')}
              max="60"
              name="nationalID"
              placeholder="National ID Number"
              value={state.nationalID}
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        {isDriversLicenseEnabled ? (
          <Col md={4}>
            <FormGroup>
              <label>{t('PersonalInformationForm-DriversLicenseID')} *</label>
              <Input
                max="60"
                invalid={empty.includes('driversLicenseID')}
                name="driversLicenseID"
                placeholder={t('PersonalInformationForm-DriversLicenseID')}
                value={state.driversLicenseID}
                onChange={onChange}
              />
            </FormGroup>
          </Col>
        ) : null}
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <label>
              {t('Street Address')} {investor.investorType ? t('of Company') : ''} *
            </label>
            <Input
              invalid={empty.includes('address')}
              max="150"
              name="address"
              placeholder="Home Address"
              value={state.address}
              onChange={onChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <label>
              {t('Zip')} {investor.investorType ? t('of Company') : ''} *
            </label>
            <Input
              invalid={empty.includes('zip')}
              max="28"
              name="zip"
              placeholder="Zip"
              value={state.zip}
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <label>
              {t('City')} {investor.investorType ? t('of Company') : ''} *
            </label>
            <Input
              invalid={empty.includes('town')}
              max="50"
              name="town"
              placeholder="City/Town"
              value={state.town}
              onChange={onChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <label>
              {t('State')} {investor.investorType ? t('of Company') : ''} *
            </label>
            <Input
              invalid={empty.includes('state')}
              max="50"
              name="state"
              placeholder="State"
              value={state.state}
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <label>
              {t('Country')} {investor.investorType ? t('of Company') : ''} *
            </label>

            <Select
              invalid={empty.includes('country')}
              name="country"
              options={countries}
              value={{ value: country, label: country }}
              onChange={onChangeCountry}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <FormGroup>
            <label>
              {t('Phone Number')} {investor.investorType ? t('of Company') : ''} *
            </label>
            <Input
              invalid={empty.includes('phone')}
              max="30"
              name="phone"
              onChange={onChange}
              placeholder="Phone Number"
              value={state.phone}
            />
          </FormGroup>
        </Col>
        <Col md={2} />
        <Col md={3}>
          <FormGroup>
            <label>{t('Date of Birth')} *</label>
            <DatePicker
              invalid={empty.includes('birthDate')}
              dateFormat="dd.MM.yyyy"
              showPopperArrow={false}
              selected={dob}
              onChange={onChangeDob}
            />
          </FormGroup>
        </Col>
      </Row>

      <hr />
      <h4>{t('Next of Kin')}</h4>
      <label>{t('Please-specify-who-is-your-next-of-kin')}</label>

      <Row>
        <Col>
          <Row>
            <Col md={6}>
              <FormGroup>
                <label>{t('Full-Name')}</label>
                <Input
                  type="text"
                  max="70"
                  id="kinname"
                  name="kinname"
                  placeholder="Enter Full Name"
                  value={state.kinname}
                  onChange={onChange}
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <label>{t('Phone Number')}</label>
                <Input
                  type="text"
                  max="20"
                  id="kinphone"
                  name="kinphone"
                  placeholder="Enter Phone Number"
                  value={state.kinphone}
                  onChange={onChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <div className="col-md-6">
              <FormGroup>
                <label>{t('Email')}</label>
                <Input
                  type="text"
                  max="30"
                  id="kinemail"
                  name="kinemail"
                  placeholder="Type Email"
                  value={state.kinemail}
                  onChange={onChange}
                />
              </FormGroup>
            </div>
          </Row>
        </Col>
      </Row>

      <hr />
      <h4>{t('Investor Notes')}</h4>
      <Row>
        <Col>
          <FormGroup>
            <label>{t('Enter-any-notes-additional-information-you-may-want')}</label>
            <Input
              type="textarea"
              id="notes"
              name="notes"
              onChange={onChange}
              placeholder="Enter Investor Notes"
              rows={8}
              value={state.notes || ''}
            />
          </FormGroup>
        </Col>
      </Row>
      {succsees && <Alert color="success">Saved successfully</Alert>}
      <Row>
        <Col>
          <FormGroup>
            <Button size="md" type="submit">
              {t('Save')}
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default PersonalInformationForm;
