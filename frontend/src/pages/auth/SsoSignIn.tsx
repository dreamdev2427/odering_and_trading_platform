import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Auth from 'services/core/auth';
import { useParams } from 'react-router';

const SsoSignIn: React.FC = () => {
  const history = useHistory();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    Auth.signInSSO(token)
      .then((isTwoFactorEnabled) => {
        if (isTwoFactorEnabled) {
          history.push('/two-factor');
        } else {
          history.push('/');
        }
      })
      .catch(() => {
        history.push('/sign-in');
      });
  }, [history, token]);

  return <></>;
};

export default SsoSignIn;
