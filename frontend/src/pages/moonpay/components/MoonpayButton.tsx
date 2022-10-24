import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BuyAlertStatus } from 'services/apollo';
import { InvestorPortfolioBuyAlert } from 'services/apollo/multisto';
import { Button } from 'atoms';
import MoonpayModal from './MoonpayModal';
import MoonpayReceiptModal from './MoonpayReceiptModal';

interface MoonpayButtonProps {
  alert: InvestorPortfolioBuyAlert;
}

/**
 * For initiating MoonPay transactions on alert items or checking a receipt
 */
const MoonpayButton: React.FC<MoonpayButtonProps> = ({ alert }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleOpenModal = () => {
    if (!showModal) {
      setTimeout(() => {
        setShowModal(false);
      }, 1000); // Re-enable if user clicks Cancel
    }
    setShowModal(true);
  };

  const handleOpenReceiptModal = () => {
    if (!showReceiptModal) {
      setTimeout(() => {
        setShowReceiptModal(false);
      }, 1000); // Re-enable if user clicks Cancel
    }
    setShowReceiptModal(true);
  };

  return (
    <>
      {alert.status === BuyAlertStatus.PaymentAwaiting ? (
        <Button size="sm" onClick={handleOpenModal} disabled={showModal}>
          {t('Moonpay-payWithMoonpay')}
        </Button>
      ) : (
        <Button size="sm" onClick={handleOpenReceiptModal} disabled={showReceiptModal}>
          {t('Moonpay-receipt')}
        </Button>
      )}
      {showModal && (
        <>
          <MoonpayModal
            shares={alert.shares}
            shareTypeId={alert.shareTypeID}
            shareType={alert.shareType}
            alertId={alert.ID}
          />
        </>
      )}
      {showReceiptModal && (
        <>
          <MoonpayReceiptModal alert={alert} />
        </>
      )}
    </>
  );
};

export default MoonpayButton;
