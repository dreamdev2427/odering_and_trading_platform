import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useTwoFaConfirmMutation } from 'services/apollo/graphql';
import Auth from 'services/core/auth';

import { BsSwal, Button, Container, Form, FormGroup, Input } from 'atoms';

const TwoFactorConfirm: React.FC = () => {
  const [code, setCode] = useState('');
  const history = useHistory();
  const [faConfirm] = useTwoFaConfirmMutation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      return;
    }

    faConfirm({ variables: { code: parseInt(code, 10) } })
      .then(({ data }) => {
        if (data?.investor2FAConfirm) {
          Auth.token = data.investor2FAConfirm;
          history.push('/');
        }
      })
      .catch(() =>
        BsSwal.fire({
          title: 'Bad code',
          icon: 'error',
        }),
      );
  };

  return (
    <div className="factor-page" style={{ paddingLeft: '35%' }}>
      <Container>
        <div className="factor-form">
          <div className="main-div">
            <div className="panel">
              <h1>2 Factor Authentication</h1>
            </div>

            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  maxLength="6"
                  placeholder="Code"
                  value={code}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.currentTarget.value)}
                />
              </FormGroup>
              <br />
              <Button type="submit" color="info" block size="lg">
                Send code
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TwoFactorConfirm;
