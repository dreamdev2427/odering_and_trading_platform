import React, { useState } from 'react';
import { Alert, FormFeedback } from 'reactstrap';

import Auth from 'services/core/auth';
import { useSignUpMutation } from 'services/apollo';

import { Button, Col, Form, FormGroup, Input, Row, Select, GrayDot } from 'atoms';
import { Markup } from 'interweave';
import prepareError from './prepareError';
// import { isMulti } from 'services/core/helpers';

const checkPass = (value) => {
  let passChecks = 0;
  passChecks += /[a-z]/.test(value) ? 1 : 0;
  passChecks += /[A-Z]/.test(value) ? 1 : 0;
  passChecks += /\d/.test(value) ? 1 : 0;
  passChecks += /[^\w\d\s]/.test(value) ? 1 : 0;
  return passChecks > 2;
};

const RegistrationForm = ({ registrationText, title, InvestorTypes, brokerID }) => {
  const [stateForm, setStateForm] = useState({
    investorType: InvestorTypes[0],
  });
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setMessage('');
    setErrors({});
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setStateForm({ ...stateForm, ...newState });
  };

  const validation = (form) => {
    if (!form.firstName) {
      setErrors({ firstName: 'first name is required' });
      setMessage('Please enter your first name');
      return false;
    }

    if (!form.lastName) {
      setErrors({ lastName: 'last name is required' });
      setMessage('Please enter your last name');
      return false;
    }

    if (isLegalInvestor && !form.companyName) {
      setErrors({ companyName: 'Company Name is required' });
      setMessage('Please enter your Company Name');
      return false;
    }

    if (!form?.email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      setMessage('Please enter a valid email address');
      return false;
    }

    if (rePassword !== stateForm.password) {
      setMessage('Passwords do not match');
      return false;
    }

    if (!checkPass(stateForm.password)) {
      setMessage(
        // eslint-disable-next-line max-len
        'Password is not valid. Password must contain at least 1 upper case letter, 1 lower case letter, 1 special letter (@ # % ! etc) or 1 number',
      );
      return false;
    }

    if (form.password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return false;
    }

    if (form.password.length > 100) {
      setMessage('Password must be maximum of 100 characters long');
      return false;
    }

    return true;
  };

  const isLegalInvestor = stateForm.investorType?.value !== 0;
  const [signup] = useSignUpMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...stateForm,
      investorType: stateForm.investorType.value,
      stoID: Number(Auth.STO),
      ...(brokerID && {brokerID}),
    };
    if (validation(data)) {
      signup({ variables: { data } })
        .then(() => setSuccess(true))
        .catch((error) => {
          const result = prepareError(error, setErrors);
          setMessage('Fix Error and Try Again.');
          if (result !== true) setMessage(result);
        });
    }
  };

  if (success) {
    return (
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <img src="/img/2stepverification_banner.png" width="100%" alt="2FA"/>
          <Alert color="success">
            <h3>Thank you for registering your information</h3>
            <p>
              We sent an email with a verification link to your email address {stateForm.email}. Please open your email
              and hit the verification link.
            </p>
            <p>Your email address will be verified and you can start your verification steps.</p>
            <p className="text-muted">
              Note: If you do not receive the email in few minutes:
              <br />
              <br />
              <ul>
                <li>Check the spam folder</li>
                <li>Verify that you typed your email correctly</li>
                <li>If you can&apos;t resolve the issue, please contact support@digishares.io</li>
              </ul>
            </p>
          </Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div style={{ width: '70%' }}>
      <h3>Registration Instructions</h3>
      <Markup content={registrationText}/>
      <p> Start your registration process and get verified to invest through the platform </p>
      <p> Here are the steps </p>
      <Row>
        <Col xs="auto">
          <GrayDot /> <b>Step 1</b>
        </Col>
        <Col tag="p">
          Create your personal investor profile by filling out the following simple form. Your profile will be
          created with your personal email address as username.
          <br />
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <GrayDot /> <b>Step 2</b>
        </Col>
        <Col tag="p">
          After submitting the registration form, you will be directed to an email verification page. Please check
          your email box and open the email from {title} which contains a verification code. Enter your code to
          verify your email address.
          <br />
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <GrayDot /> <b>Step 3</b>
        </Col>
        <Col tag="p">
          After email verification you will be logged into your personal profile dashboard where you can follow
          some simple steps through a KYC (Know Your Customer) verification process as required by regulators.
          <br />
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <GrayDot /> <b>Step 4</b>
        </Col>
        <Col tag="p">
          After entering the required KYC information and documents, please submit your profile to be reviewed by{' '}
          {title}.
          <br />
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <GrayDot /> <b>Step 5</b>
        </Col>
        <Col tag="p">
          After approval from {title} your profile will be activated and you will be notified by email. You will
          then be able to purchase {title} shares
          <br />
        </Col>
      </Row>
      <h3>Registration Form</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={5}>
            <FormGroup>
              <label>Are you *</label>
              <Select
                name="investorType"
                value={stateForm.investorType}
                onChange={(item) => {
                  const newState = { investorType: item };
                  setStateForm({ ...stateForm, ...newState, companyName: '' });
                }}
                options={InvestorTypes}
              />
            </FormGroup>
          </Col>
        </Row>
        {isLegalInvestor && (
          <Row>
            <Col md={7}>
              <FormGroup>
                <label>Company Name *</label>
                <Input
                  max="60"
                  name="companyName"
                  onChange={onChange}
                  placeholder="Enter Company Name"
                  value={stateForm.companyName || ''}
                  invalid={message.includes('Company Name') || !!errors.companyName}
                />
                <FormFeedback className="h6 text-lowercase">{errors.companyName} </FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        )}
        <Row>
          <Col md={7}>
            <FormGroup>
              <label>
                First Name
                {isLegalInvestor && <span> of Company Representative</span>} *
              </label>
              <Input
                max="60"
                name="firstName"
                placeholder="Enter your first name"
                onChange={onChange}
                value={stateForm.firstName || ''}
                invalid={message.includes('first name')}
              />
              <FormFeedback className="h6 text-lowercase">{errors.firstName} </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <FormGroup>
              <label>Last Name *</label>
              <Input
                max="60"
                name="lastName"
                placeholder="Enter your last name"
                value={stateForm.lastName || ''}
                onChange={onChange}
                invalid={message.includes('last name')}
              />
              <FormFeedback className="h6 text-lowercase">{errors.lastName} </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <FormGroup>
              <label>
                Email Address
                {isLegalInvestor && <span className="companySpanArea"> of Company</span>}*
              </label>
              <Input
                max="70"
                name="email"
                onChange={onChange}
                value={stateForm.email || ''}
                autoComplete="new-email"
                placeholder="Enter your email address"
                invalid={!!errors.email || message.includes('email')}
              />
              <FormFeedback className="h6 text-lowercase">{errors.email} </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <FormGroup>
              <label>Password *</label>
              <Input
                type="password"
                name="password"
                onChange={onChange}
                value={stateForm.password || ''}
                autoComplete="new-password"
                placeholder="Enter your password"
                invalid={!!errors.password || message.startsWith('Password')}
              />
              <label>
                {' '}
                Password must contain at least 1 upper case letter, 1 lower case letter, 1 special letter (@ # % ! etc)
                or 1 number
              </label>
              <FormFeedback className="mt-n2 h6 text-lowercase">{errors.password} </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <FormGroup>
              <label>Re-type Password *</label>
              <Input
                type="password"
                name="rePassword"
                value={rePassword || ''}
                onChange={({ target: { value } }) => setRePassword(value)}
                placeholder="Re-type password"
                invalid={!!message.startsWith('Passwords')}
              />
            </FormGroup>
          </Col>
        </Row>
        {message && <span style={{ color: 'red', fontSize: '16px' }}>{message}</span>}
        <br />
        <Button type="submit" size="md">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
