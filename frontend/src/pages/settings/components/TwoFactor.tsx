import React from 'react';
import { CustomInput } from 'reactstrap';

import { MeDocument, useMeQuery, useToggleTwoFaMutation, useInvestorAppDataQuery } from 'services/apollo';
import { BsSwal, Card, CardBody, FormGroup } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import LOCK from 'assets/img/lock.png';
import { useTranslation } from 'react-i18next';

const TwoFactor: React.FC = () => {
  const { t } = useTranslation();

  const { data } = useMeQuery();
  const { investor } = data?.investorUser || {};

  const { data: appData } = useInvestorAppDataQuery({
    fetchPolicy: 'network-only',
  });
  const is2FAEnabledByDefault = appData?.investorAppParameters?.is2FAEnabledByDefault;
  const is2FAForcedForAll = appData?.investorAppParameters?.is2FAForcedForAll;

  const [change] = useToggleTwoFaMutation({
    refetchQueries: [{ query: MeDocument }],
  });

  const onChange = () => {
    const enable = investor?.isTwoFactorEnabled;

    const title = t(
      enable
        ? 'Are you sure you want to de-activate 2 factor authentication'
        : 'Are you sure you want to activate 2 factor authentication',
    );
    const confirmButtonText = t(enable ? 'Yes Disable Authentication' : 'Yes Enable Authentication');

    return BsSwal.fire({
      title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: t('Cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        return change().then(() =>
          BsSwal.fire({
            icon: 'success',
            title: `2-factor authentication ${enable ? 'disabled' : 'enable'}`,
          }),
        );
      }
    });
  };

  return (
    <Card>
      <CardHeader
        text={t('2-Factor-Authentication')}
        caption={t('2-Factor-Authentication-will-enable-you-to-secure-your-account')}
        imgSrc={LOCK}
      />
      <CardBody>
        <FormGroup switch>
          <CustomInput
            id="two-factor"
            type="switch"
            onChange={onChange}
            label={t('2-Factor-Authentication')}
            checked={!!investor?.isTwoFactorEnabled}
            disabled={is2FAEnabledByDefault || is2FAForcedForAll}
          />
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default TwoFactor;
