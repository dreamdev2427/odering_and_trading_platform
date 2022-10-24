import React, { useState } from 'react';

import { signIn } from 'lib/routing/route-sets/public-routes';
import { useInvestorResetMutation } from 'services/apollo';
import Auth from 'services/core/auth';

import { Button, Container, Form, FormGroup, Input, StoLogo } from 'atoms';
import { BsSwal } from 'atoms/Swal';

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [reset] = useInvestorResetMutation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(true);
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    reset({ variables: { email, STO: Number(Auth.STO) } })
      .then(() =>
        BsSwal.fire({
          title: 'We have sent an email with link to change password',
          icon: 'success',
        }).then(() => setEmail('')),
      )
      .catch((err) =>
        BsSwal.fire({
          title: err.message,
          icon: 'error',
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setEmail(e.currentTarget.value);
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
              <h1>Forgot Password</h1>
              <p>
                Please enter your email address
                <br />
                You will receive an email with link. To set a new password follow the link.
              </p>
            </div>

            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Input
                  invalid={error}
                  type="text"
                  maxLength="70"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button disabled={loading} color="info" block size="lg">
                Send Link
              </Button>
            </Form>
            <signIn.Link>Login here</signIn.Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
