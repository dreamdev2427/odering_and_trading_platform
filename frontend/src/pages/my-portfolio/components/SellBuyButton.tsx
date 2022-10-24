import { Button } from 'atoms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

interface SellBuyButtonProps {
  isVisible: boolean;
  isEnabled: boolean;
  text: string;
  redirectURL: string;
}

const SellBuyButton: React.FC<SellBuyButtonProps> = ({ isVisible, isEnabled, text, redirectURL }) => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <>
      {isVisible ? (
        <Button disabled={!isEnabled} size="sm" wmin="130px" className="m-2" onClick={() => history.push(redirectURL)}>
          {t(text)}
        </Button>
      ) : null}
    </>
  );
};

export default SellBuyButton;
