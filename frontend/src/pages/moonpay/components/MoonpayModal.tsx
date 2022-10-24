import React, { useEffect } from 'react';
import { useModal } from 'components/Modal';
import { useTranslation } from 'react-i18next';
import { InvestorShareType } from 'services/apollo/shares';
import { FontAweIcon } from 'atoms/Icons';
import { useHistory } from 'react-router-dom';
import { useMoonpayWidgetUrlQuery } from 'services/apollo';
import MoonpayWidget, { MoonpayWidgetProps } from './MoonpayWidget';

interface MoonpayModalProps extends MoonpayWidgetProps {
  shareType?: InvestorShareType;
}

/**
 * For initiating MoonPay transactions
 */
const MoonpayModal: React.FC<MoonpayModalProps> = ({ shares, shareTypeId, shareType, alertId }) => {
  const { t } = useTranslation();
  const modal = useModal();
  const history = useHistory();

  const { data } = useMoonpayWidgetUrlQuery({
    variables: {
      shares,
      shareTypeId,
      alertId,
    },
  });

  const handleShowModal = () => {
    modal.hideModal();
    modal.showModal({
      // noWrapper: true,
      // In the future, could write a custom minimalistic wrapper
      className: 'w-25 mw-100 minw-400',
      title: `${t('Moonpay-purchasingShareType')} ${shareType?.title}`,
      cancelText: t('Cancel'),
      submitText: (
        <>
          <FontAweIcon icon="arrow-square-up" /> {t('Moonpay-openOnMoonpay')}
        </>
      ),
      eventSubmit: () => {
        if (data?.moonpayWidgetUrl) {
          // window.location.replace(data.moonpayWidgetUrl);
          window.open(data.moonpayWidgetUrl);
        } else {
          history.push(`/investor/Portfolio`);
        }
      },
      bodyContent: () => <MoonpayWidget shareTypeId={shareTypeId} shares={shares} alertId={alertId} />,
    });
  };

  useEffect(() => {
    handleShowModal();
    // Work in Progress
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <></>;
};

export default MoonpayModal;
