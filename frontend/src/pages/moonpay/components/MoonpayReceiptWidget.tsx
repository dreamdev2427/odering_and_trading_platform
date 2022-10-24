import React from 'react';
import { useMoonpayBuyAlertTransactionReceiptUrlQuery as getReceiptUrl } from 'services/apollo';
import { Loading } from 'atoms';
import { InvestorPortfolioBuyAlert } from 'services/apollo/multisto';

export interface MoonpayWidgetProps {
  alert: InvestorPortfolioBuyAlert;
}

/**
 * For initiating MoonPay transactions
 */
const MoonpayWidget: React.FC<MoonpayWidgetProps> = ({ alert }) => {
  const { data, loading } = getReceiptUrl({
    variables: {
      alertId: alert.ID,
    },
  });

  if (loading) return <Loading />;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {data?.moonpayBuyAlertTransactionReceiptUrl ? (
        <iframe
          width="400"
          height="700"
          title="moonpay-receipt"
          src={data.moonpayBuyAlertTransactionReceiptUrl}
          sandbox="allow-scripts allow-same-origin"
          allow="accelerometer; autoplay; camera; gyroscope; payment"
          style={{
            border: 0,
          }}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MoonpayWidget;
