import React, { useState } from 'react';

import { useChangePasswordMutation } from 'services/apollo';

import { BsSwal, Button, Card, CardBody, Form, FormGroup, Input, Label } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import LOCK from 'assets/img/lock.png';
import { useTranslation } from 'react-i18next';
import { FormFeedback } from 'reactstrap';
import useGqlErrorExtractor from '../../../hooks/useGqlErrorExtractor';

const fillState = () => {
  return { oldPassword: '', newPassword: '', repeatPassword: '' };
}

const ChangePassword = () => {
  const [state, setState] = useState(fillState());
  const [error, setGqlError] = useGqlErrorExtractor(fillState());
  const { t } = useTranslation();
  const onChange = (e) => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const [change] = useChangePasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setGqlError(null);

    change({ variables: { data: state } })
      .then(() =>
        BsSwal.fire({
          title: 'Password successfully changed',
          icon: 'success',
        }),
      )
      .catch((err) => {
        setGqlError(err);
        if (err.message !== 'Argument Validation Error') {
          BsSwal.fire({
            title: err.message,
            icon: 'error',
          });
        }
      });
  };

  return (
    <Card>
      <CardHeader text={t('Change-Password')} caption={t('Change-your-password')} imgSrc={LOCK} />
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="old-password">{t('Enter-old-password')}*</Label>
            <Input
              invalid={!!error.oldPassword}
              type="password"
              name="oldPassword"
              id="old-password"
              value={state.oldPassword}
              onChange={onChange}
            />
            <FormFeedback>{error.oldPassword}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="new-password">{t('Enter-new-password')}*</Label>
            <Input
              invalid={!!error.newPassword}
              type="password"
              name="newPassword"
              id="new-password"
              value={state.newPassword}
              onChange={onChange}
            />
            <FormFeedback>{error.newPassword}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="repeat-password">{t('Re-Type-new-password')}*</Label>
            <Input
              invalid={!!error.repeatPassword}
              type="password"
              name="repeatPassword"
              id="repeat-password"
              value={state.repeatPassword}
              onChange={onChange}
            />
            <FormFeedback>{error.repeatPassword}</FormFeedback>
          </FormGroup>
          <Button type="submit" color="primary">
            {t('Change-Password')}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ChangePassword;
