import React, { useState } from 'react';
import { Alert, CustomInput, FormFeedback } from 'reactstrap';
import { Button, Col, Form, Input, Loading, Row, Select } from 'atoms';
import { useCountriesQuery, useSignUpMarketSpaceMutation } from 'services/apollo';
import Auth from 'services/core/auth';
import { useTranslation } from 'react-i18next';
import prepareError from './prepareError';
import {useInvestorAppDataQuery} from "../../../services/apollo";

const checkPass = (value) => {
  let passChecks = 0;
  passChecks += /[a-z]/.test(value) ? 1 : 0;
  passChecks += /[A-Z]/.test(value) ? 1 : 0;
  passChecks += /\d/.test(value) ? 1 : 0;
  passChecks += /[^\w\d\s]/.test(value) ? 1 : 0;
  return passChecks > 2;
};

const MarketSpaceRegistrationForm = ({ InvestorTypes }) => {
  const { t } = useTranslation();
  const [stateForm, setStateForm] = useState({
    investorType: InvestorTypes[0],
  });

  const [signup] = useSignUpMarketSpaceMutation();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const { data, loading } = useCountriesQuery();
  const [country, setCountry] = useState('United States');
  const [errors, setErrors] = useState({});

  const [agree, setAgree] = useState(false);
  const [agreeTeam, setAgreeTeam] = useState(false);
  const { data: appData, loading: appDataLoading } = useInvestorAppDataQuery();


  if (loading || appDataLoading || !appData || !data) {
    return <Loading />;
  }

  const countries = data.countries?.map((value) => ({ value, label: value })) || [];
  const termsAndConditionsLink = appData?.investorAppParameters?.termsAndConditionsConfig?.link;
  const termsAndConditionstext = appData?.investorAppParameters?.termsAndConditionsConfig?.text;

  const onChange = (e) => {
    setMessage('');
    setErrors({});
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setStateForm({ ...stateForm, ...newState });
  };

  const onChangeCountry = (ctr) => {
    if (!ctr.value) return;
    setCountry(ctr.value);
  };

  const validation = (form) => {
    const fields = {
      email: 'Email',
      password: 'Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      state: 'State',
      country: 'Country',
      zip: 'Zip',
    };
    const tempErrors = {};
    Object.keys(fields).forEach((value) => {
      if (!form[value]) {
        tempErrors[value] = `${fields[value]} ${t('is-required')}`;
      }
    });

    if (Object.keys(tempErrors).length !== 0) {
      setErrors(tempErrors);
      setMessage(t('marketSpaceForm-setRequiredFieldError'));
      return false;
    }

    if (!checkPass(form.password)) {
      setErrors({
        password:
          // eslint-disable-next-line max-len
          t('marketSpaceForm-passwordStrengthRequirement')});
      setMessage(t('marketSpaceForm-passwordStrengthError'));
      return false;
    }

    if (form.password !== form.repeatPassword) {
      setErrors({
        repeatPassword:
        // eslint-disable-next-line max-len
          t('passwords-do-not-match')});
      setMessage(t('passwords-do-not-match'));
      return false;
    }

    if (!agree) {
      setMessage(t('marketSpaceForm-termsAndConditionsError'));
      return false;
    }

    if (!agreeTeam) {
      setMessage(t('marketSpaceForm-investmentRiskAcknowledgementError'));
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signInData = {
      ...stateForm,
      country,
      investorType: stateForm.investorType.value,
      stoID: Number(Auth.STO),
    };
    if (validation(signInData)) {
      delete signInData.repeatPassword;
      signup({ variables: { data: signInData } })
        .then(() => setSuccess(true))
        .catch((error) => {
          const result = prepareError(error, setErrors);
          setMessage(t('marketSpaceForm-generalErrorMessage'));
          if (result !== true) setMessage(error.message);
        });
    }
  };

  if (success) {
    return (
      <Row className="mb-3">
        <Col md={{ size: 8, offset: 2 }}>
          <img src="/img/2stepverification_banner.png" width="100%" alt="banner"/>
          <Alert color="success">
            <h3>{t('marketSpaceForm-thankYouForYourInfo')}</h3>
            <p>
              {t('marketSpaceForm-emailSentAcknowledgement', {email: stateForm.email})}
            </p>
            <p>{t('marketSpaceForm-success-popUp-header')}</p>
            <p className="text-muted">
              {t('marketSpaceForm-success-note')}
              <br />
              <br />
              <ul>
                <li>{t('marketSpaceForm-success-note-checkSpam')}</li>
                <li>{t('marketSpaceForm-success-note-verifyEmailText')}</li>
                <li>{t('marketSpaceForm-success-note-serviceEmail')}</li>
              </ul>
            </p>
          </Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div style={{ width: '60%' }} className="m-auto">
      <h3>{t('marketSpaceForm-card-title')}</h3>
      <Form onSubmit={handleSubmit} className="w-100">
        <Row className="mb-3">
          <Col>
            <label>{t('Email-Address')} *</label>
            <Input
              max="70"
              name="email"
              onChange={onChange}
              value={stateForm.email || ''}
              autoComplete="new-email"
              placeholder="Enter your email address"
              invalid={!!errors.email || message.includes('valid email')}
            />
            <FormFeedback className="h6 text-lowercase"> {errors.email} </FormFeedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <label>{t('First-Name')} *</label>
            <Input
              max="60"
              name="firstName"
              placeholder="Enter your first name"
              onChange={onChange}
              value={stateForm.firstName || ''}
              invalid={!!errors.firstName}
            />
            <FormFeedback className="h6 text-lowercase"> {errors.firstName} </FormFeedback>
          </Col>
          <Col md={6}>
            <label>{t('Last-Name')} *</label>
            <Input
              max="60"
              name="lastName"
              placeholder="Enter your last name"
              value={stateForm.lastName || ''}
              onChange={onChange}
              invalid={!!errors.lastName}
            />
            <FormFeedback className="h6 text-lowercase"> {errors.lastName} </FormFeedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <label>{t('Create-Password')} *</label>
            <Input
              type="password"
              name="password"
              onChange={onChange}
              value={stateForm.password || ''}
              autoComplete="new-password"
              placeholder="Enter your password"
              invalid={!!errors.password}
            />
            {!errors.password ? (
              <label>
                {t('marketSpaceForm-passwordStrengthRequirement')}
              </label>
            ) : (
              <FormFeedback className="h6 text-lowercase"> {errors.password} </FormFeedback>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <label>{t('Repeat-Password')} *</label>
            <Input
              type="password"
              name="repeatPassword"
              onChange={onChange}
              value={stateForm.repeatPassword || ''}
              placeholder={t('Repeat-Password')}
              invalid={!!errors.repeatPassword}
            />
            {!errors.repeatPassword ? (
              ''
            ) : (
              <FormFeedback className="h6 text-lowercase"> {errors.repeatPassword} </FormFeedback>
            )}
          </Col>
        </Row>
        <hr className="mt-md-3" />
        <Row className="mb-3">
          <Col>
            <label>{t('Referred-By')}</label>
            <Input
              max="70"
              name="referredBy"
              onChange={onChange}
              value={stateForm.referredBy || ''}
              placeholder=""
            />
          </Col>
        </Row>
        <hr className="mt-md-3" />
        <Row className="mb-3">
          <Col>
            <label>{t('Phone Number')} *</label>
            <Input
              max="30"
              name="phone"
              onChange={onChange}
              placeholder="Phone Number"
              value={stateForm.phone}
              invalid={!!errors.phone}
            />
            <FormFeedback className="h6 text-lowercase"> {errors.phone} </FormFeedback>
          </Col>
        </Row>
        <hr className="mt-md-3" />
        <Row className="mb-3">
          <Col>
            <label>{t('Street Address')} *</label>
            <Input
              max="150"
              id="Address"
              name="address"
              placeholder="Street Address"
              value={stateForm.address}
              onChange={onChange}
              invalid={!!errors.address}
            />
            <FormFeedback className="h6 text-lowercase"> {errors.address} </FormFeedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <label>{t('City')} *</label>
            <Input
              max="50"
              id="city"
              name="city"
              placeholder="City/Town"
              value={stateForm.city}
              onChange={onChange}
              invalid={!!errors.city}
            />
            <FormFeedback className="h6 text-lowercase"> {errors.city} </FormFeedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <label>{t('State')} *</label>
            <Input
              max="50"
              id="state"
              name="state"
              placeholder="State"
              value={stateForm.state}
              onChange={onChange}
              invalid={!!errors.state}
            />
            <FormFeedback className="h6 text-lowercase"> {errors.state} </FormFeedback>
          </Col>
          <Col md={6}>
            <label>{t('Zip')} *</label>
            <Input
              max="28"
              name="zip"
              placeholder="zip"
              value={stateForm.zip}
              onChange={onChange}
              invalid={!!errors.zip}
            />
            <FormFeedback className="h6 text-lowercase"> {errors.zip} </FormFeedback>
          </Col>
        </Row>
        <Row style={{ zIndex: '100' }}>
          <Col>
            <label>{t('Country')} *</label>
            <Select
              name="country"
              style={{ zIndex: '100' }}
              options={countries}
              value={{ value: country, label: country }}
              onChange={onChangeCountry}
            />
            <label style={{ color: '#dc3545' }} className="h6 text-lowercase">
              {errors.country}
            </label>
          </Col>
        </Row>
        <hr className="mt-mb-3" />
        <Row className="mb-2" style={{ zIndex: '90' }}>
          <Col md={1}>
            <CustomInput
              id="id_0"
              className="z-none"
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
          </Col>
          <Col>
            {t('marketSpaceForm-termsAndConditions')}
            <a href={termsAndConditionsLink}> {termsAndConditionstext}</a>
          </Col>
        </Row>
        <Row className="mt-mb-3">
          <Col md={1}>
            <CustomInput
              id="id_1"
              className="z-none"
              type="checkbox"
              checked={agreeTeam}
              onChange={() => setAgreeTeam(!agreeTeam)}
            />
          </Col>
          <Col>
            {t('marketSpaceForm-riskyInvestmentNotice')}
          </Col>
        </Row>

        {message && <span style={{ color: 'red', fontSize: '16px' }}>{message}</span>}
        <br />
        <Button type="submit" size="md">
          {t('Submit')}
        </Button>
      </Form>
    </div>
  );
};

export default MarketSpaceRegistrationForm;
