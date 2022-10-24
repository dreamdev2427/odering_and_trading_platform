import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'atoms';

interface SideSelectProps {
  side: string;
  changeSide: (side: string) => void;
  disabled: boolean;
}

const sides = ['front', 'back'];

const SideSelect: React.FC<SideSelectProps> = ({ side, changeSide, disabled }) => {
  const { t } = useTranslation();

  const handleChange = (newSide: string): void => {
    if (disabled) {
      return;
    }
    changeSide(newSide);
  };

  if (side) {
    return (
      <Button active color="primary" size="sm" onClick={() => handleChange('')} disabled={disabled}>
        {t(`kyc.upload.${side}`)}
      </Button>
    );
  }

  return (
    <>
      {sides.map((tp) => (
        <Button color="primary" size="sm" key={tp} onClick={() => handleChange(tp)} disabled={disabled}>
          {t(`kyc.upload.${tp}`)}
        </Button>
      ))}
    </>
  );
};

export default SideSelect;
