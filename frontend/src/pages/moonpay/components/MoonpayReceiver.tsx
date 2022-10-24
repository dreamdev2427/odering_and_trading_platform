import React, { useEffect } from 'react';
import { BsSwal, Loading } from 'atoms';
import { useMoonpayAddTransactionDefaultMutation } from 'services/apollo';
import { useHistory, useLocation } from 'react-router-dom';

/**
 * For initiating MoonPay transactions
 */
const MoonpayReceiver: React.FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const moonpayId = searchParams.get('transactionId') ?? 'null';
  const status = searchParams.get('transactionStatus') ?? 'null';
  const [addTransaction] = useMoonpayAddTransactionDefaultMutation({});

  const history = useHistory();
  const goBack = () => history.replace(`/investor/Portfolio`);

  useEffect(() => {
    addTransaction({
      variables: {
        moonpayId,
        status,
      },
    })
      .then(() => goBack())
      .catch((e) =>
        BsSwal.fire({
          title: 'Internal Server Error',
          text: `${e as Error}`,
          icon: 'error',
        }),
      );
  });

  return (
    <div>
      Processing Moonpay data...
      <Loading />
    </div>
  );
};

export default MoonpayReceiver;
