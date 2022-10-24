import React from 'react';
import { useMoonpayWidgetUrlQuery } from 'services/apollo';
import { Loading } from 'atoms';

export interface MoonpayWidgetProps {
  shares: number;
  shareTypeId: number;
  alertId?: number;
}

/**
 * For initiating MoonPay transactions
 */
const MoonpayWidget: React.FC<MoonpayWidgetProps> = ({ shares, shareTypeId, alertId }) => {
  const { data, loading } = useMoonpayWidgetUrlQuery({
    variables: {
      shares,
      shareTypeId,
      alertId,
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
      {data?.moonpayWidgetUrl ? (
        <iframe
          width="400"
          height="700"
          title="moonpay"
          src={data.moonpayWidgetUrl}
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
