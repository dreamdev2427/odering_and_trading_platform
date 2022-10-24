import React, { useEffect } from 'react';
import { useModal } from 'components/Modal';
import { useTranslation } from 'react-i18next';
import { FontAweIcon } from 'atoms/Icons';
import { useHistory } from 'react-router-dom';
import { useMoonpayBuyAlertTransactionReceiptUrlQuery as getReceiptUrl } from 'services/apollo';
import { InvestorPortfolioBuyAlert } from 'services/apollo/multisto';
import MoonpayReceiptWidget from './MoonpayReceiptWidget';

interface MoonpayReceiptModalProps {
  alert: InvestorPortfolioBuyAlert;
}

/**
 * For viewing MoonPay receipts
 */
const MoonpayReceiptModal: React.FC<MoonpayReceiptModalProps> = ({ alert }) => {
  const { t } = useTranslation();
  const modal = useModal();
  const history = useHistory();

  const { data } = getReceiptUrl({
    variables: {
      alertId: alert.ID,
    },
  });

  const handleShowModal = () => {
    modal.hideModal();
    modal.showModal({
      // noWrapper: true,
      // In the future, could write a custom minimalistic wrapper
      className: 'w-25 mw-100 minw-400',
      title: `${t('Moonpay-receiptForShareType')} ${alert?.shareType?.title}`,
      cancelText: t('Cancel'),
      submitText: (
        <>
          <FontAweIcon icon="arrow-square-up" /> {t('Moonpay-openOnMoonpay')}
        </>
      ),
      eventSubmit: () => {
        if (data?.moonpayBuyAlertTransactionReceiptUrl) {
          window.open(data.moonpayBuyAlertTransactionReceiptUrl);
        } else {
          history.push(`/investor/Portfolio`);
        }
      },
      bodyContent: () => <MoonpayReceiptWidget alert={alert} />,
    });
  };

  useEffect(() => {
    handleShowModal();
    // Work in Progress
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <></>;
};

export default MoonpayReceiptModal;
