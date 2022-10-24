import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Auth from 'services/core/auth';
import { signUp, forgotPassword } from 'lib/routing/route-sets/public-routes';

import { Button, Container, Form, FormGroup, Input, StoLogo, Loading } from 'atoms';
import Favicon from 'react-favicon';
import { Helmet } from 'react-helmet';
import { useInfoQuery, useInvestorAppDataQuery } from 'services/apollo';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { t } = useTranslation();
  const { data, loading } = useInfoQuery({ variables: { _id: 0 } });
  const { data: appData, loading: appDataLoading } = useInvestorAppDataQuery();

  if (loading || appDataLoading || !data || !appData) {
    return <Loading />;
  }

  const onSubmit = (e: React.FormEvent) => {
    setError('');
    e.preventDefault();

    Auth.signIn(username, password)
      .then(() => {
        if (Auth.need2FA()) {
          history.push('/two-factor');
        } else {
          history.push('/');
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const { allowInvestorsToRegister } = appData.investorAppParameters;

  return (
    <div className="login-page">
      <Favicon url={data?.publicSto?.settings?.favicon ?? ''} />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.publicSto?.settings?.tabTitle ?? 'DigiShares'}</title>
      </Helmet>
      <Container>
        <LoginForm>
          <div className="main-div">
            <div className="panel">
              <div className="mb-1 logo-img red-swan-custom">
                <StoLogo />
              </div>
              <h1>{t('Login-Title')}</h1>
              <p>{t('Login-SubTitle')}</p>
            </div>

            <Form id="Login" onSubmit={onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  maxLength="70"
                  placeholder="Email Username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="password"
                  maxLength="100"
                  placeholder="Password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                />
              </FormGroup>
              <br />
              <Button type="submit" color="info" block size="lg">
                {t('Login-LoginButton')}
              </Button>
            </Form>
            <forgotPassword.Link>Forgot Password</forgotPassword.Link>
            <br />
            {error ? <ErrorB>{error}</ErrorB> : ''}
            <br />
            {allowInvestorsToRegister && (
              <>
                <b>{t('Login-Register-Label')}</b>
                <br />
                <signUp.Link>Create your profile</signUp.Link>
              </>
            )}
          </div>
        </LoginForm>
      </Container>
    </div>
  );
};

export default Login;

const ErrorB = styled.b`
  color: ${(p) => p.theme.errorColor};
`;

const LoginForm = styled.div`
  text-align: center;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
