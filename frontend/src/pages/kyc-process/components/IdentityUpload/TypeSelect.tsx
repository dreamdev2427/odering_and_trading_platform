import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'atoms';

interface TypeSelectProps {
  type: string;
  changeType: (type: string) => void;
  disabled: boolean;
}

const types = ['driving_license', 'national_identity_card', 'passport', 'proof_of_address', 'residence_permit'];

const TypeSelect: React.FC<TypeSelectProps> = ({ type, changeType, disabled }) => {
  const { t } = useTranslation();

  const handleChange = (newType: string): void => {
    if (disabled) {
      return;
    }
    changeType(newType);
  };

  if (type) {
    return (
      <Button active color="primary" size="sm" onClick={() => handleChange('')} disabled={disabled}>
        {t(`kyc.upload.${type}`)}
      </Button>
    );
  }

  return (
    <>
      {types.map((tp) => (
        <Button color="primary" size="sm" key={tp} onClick={() => handleChange(tp)}>
          {t(`kyc.upload.${tp}`)}
        </Button>
      ))}
    </>
  );
};

export default TypeSelect;
