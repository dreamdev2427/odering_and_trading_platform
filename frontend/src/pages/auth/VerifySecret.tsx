import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'atoms';
import { Alert } from 'reactstrap';

import Auth from 'services/core/auth';
import { signIn } from 'lib/routing/route-sets/public-routes';

const VerifySecret: React.FC = () => {
  const { secret } = useParams<{ secret: string }>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setError('');
    Auth.verify(secret)
      .then(() => setSuccess(true))
      .catch((err) => {
        setError(err.message);
      });
  }, [secret]);

  return (
    <Container>
      {error ? <Alert color="danger">{error}</Alert> : ''}
      {success ? (
        <h1>
          <Alert color="success">
            Your account has been verified. Please sign in on <signIn.Link>login page.</signIn.Link>
          </Alert>
        </h1>
      ) : (
        ''
      )}
    </Container>
  );
};

export default VerifySecret;
