import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import { signIn } from 'lib/routing/route-sets/public-routes';
import { useInvestorSetPasswordMutation } from 'services/apollo';

import { Button, Container, Form, FormGroup, Input, StoLogo } from 'atoms';
import { BsSwal } from 'atoms/Swal';
import useGqlErrorExtractor from '../../hooks/useGqlErrorExtractor';

const SetNewPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  const params = useParams<{ token: string }>();
  const [error, setGqlError] = useGqlErrorExtractor({ password: '' });

  const [changePassword] = useInvestorSetPasswordMutation();
  useEffect(() => {
    if (error.password && error.password !== '') {
      BsSwal.fire({
        title: error.password,
        icon: 'error',
      });
    }
  }, [error]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGqlError(null);
    const errs = [];
    if (!password) {
      errs.push('password');
    }

    if (!repeat) {
      errs.push('repeat');
    }

    if (errs.length) {
      setErrors(errs);
      return;
    }

    if (password !== repeat) {
      return BsSwal.fire({
        title: 'Password and repeat do not match',
        icon: 'error',
      });
    }
    const data = { token: params.token, password };
    changePassword({ variables: { data } })
      .then(() =>
        BsSwal.fire({
          title: 'Password has been changed',
          icon: 'success',
        }).then(() => history.push(signIn.path)),
      )
      .catch((err) => {
        setGqlError(err);
      });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = errors.indexOf('password');
    if (index !== -1) {
      errors.splice(index, 1);
      setErrors(errors);
    }
    setPassword(e.currentTarget.value);
  };

  const handleRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = errors.indexOf('repeat');
    if (index !== -1) {
      errors.splice(index, 1);
      setErrors(errors);
    }
    setRepeat(e.currentTarget.value);
  };

  return (
    <div className="login-page">
      <Container>
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <div className="mb-1 logo-img red-swan-custom">
                <StoLogo />
              </div>
              <h1>Reset Password</h1>
              <p>Enter your new password</p>
            </div>

            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Input
                  invalid={errors.includes('password')}
                  type="password"
                  placeholder="New password*"
                  value={password}
                  onChange={handlePassword}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  invalid={errors.includes('repeat')}
                  type="password"
                  placeholder="Repeat password*"
                  value={repeat}
                  onChange={handleRepeat}
                />
              </FormGroup>
              <Button color="info" block size="lg">
                Set my password
              </Button>
            </Form>
            <signIn.Link>Login here</signIn.Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SetNewPassword;
