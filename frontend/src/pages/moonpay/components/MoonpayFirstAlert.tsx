import React from 'react';
import { BuyAlertStatus, InvestorBuyAlert } from 'services/apollo';
// import { InvestorPortfolioBuyAlert } from 'services/apollo/multisto';
import MoonpayModal from './MoonpayModal';

interface MoonpayFirstAlertProps {
  alerts: InvestorBuyAlert[];
}

/**
 * For initiating MoonPay on the first alert item
 */
const MoonpayFirstAlert: React.FC<MoonpayFirstAlertProps> = ({ alerts }) => {
  const alert = alerts.find((a) =>
    [BuyAlertStatus.PaymentAwaiting, BuyAlertStatus.Pending, BuyAlertStatus.Unused].includes(a.status),
  );
  return (
    <>
      {alert && (
        <MoonpayModal
          shares={alert.shares}
          shareTypeId={alert.shareTypeID}
          shareType={alert.shareType}
          alertId={alert.ID}
        />
      )}
    </>
  );
};

export default MoonpayFirstAlert;
