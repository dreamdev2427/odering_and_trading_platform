import React, { useEffect } from 'react';

import { Button } from 'atoms';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import BlockpassKYCConnect from 'assets/js/blockPassKycConnectProd';

type ButtonProps = {
  investorID: number;
  clientID: string;
  investorEmail: string;
};

const BlockPassButton: React.FC<ButtonProps> = (props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { investorID, clientID, investorEmail } = props;

  useEffect(() => {
    const blockpass = new BlockpassKYCConnect(
      clientID, // service client_id from the admin console
      {
        refId: investorID.toString(), // assign the local user_id of the connected user
        email: investorEmail,
      },
    );

    blockpass.startKYCConnect();

    blockpass.on('KYCConnectSuccess', () => {
      // add code that will trigger when data have been sent.
      history.go(0);
    });
  }, [clientID, history, investorEmail, investorID]);

  return (
    <>
      <Button id="blockpass-kyc-connect">{t('BlockPassButton-button-text')}</Button>
    </>
  );
};

export default BlockPassButton;
