import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { useCreateNewSellOrderMutation, useGetInvestorShareQuery } from 'services/apollo';

import { CardHeader } from 'components/card-header/CardHeader';
import { Button, Card, CardBody, Col, Form, Row, Loading, BsSwal, BrandIcon } from 'atoms';
import SellOrderMainInfo from './components/new-sell-order/SellOrderMainInfo';
import useSellOrderState from './components/new-sell-order/useSellOrderState';
import SellOrderSharesSelect from './components/new-sell-order/SellOrderSharesSelect';

const NewSellOrder: React.FC = () => {
  const params = useParams<{ shareID: string }>();
  const ID = parseInt(params.shareID, 10);
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSellOrderState();
  const [disabled, setDisabled] = useState<boolean>(true);

  const { shareTypeID, atomicSwapTokenAddressAcceptable, atomicSwapSharesWalletID, rateFrom } = state.order;

  useEffect(() => {
    if (!shareTypeID) {
      setDisabled(true);
      return;
    }
    if (atomicSwapSharesWalletID && !atomicSwapTokenAddressAcceptable) {
      setDisabled(true);
      return;
    }

    if (!rateFrom) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [shareTypeID, atomicSwapTokenAddressAcceptable, atomicSwapSharesWalletID, rateFrom]);

  const [createSellOrder] = useCreateNewSellOrderMutation();
  const { loading, data } = useGetInvestorShareQuery({ variables: { ID } });
  if (loading || !data || !data.investorShare) {
    return <Loading />;
  }
  const { shareType, shares } = data.investorShare;

  const handleCancel = () => {
    history.push(`/investor/trading`);
  };

  const handleSubmit = () => {
    return createSellOrder({ variables: { order: state.order } })
      .then(() => {
        history.push(`/investor/trading`);
      })
      .catch((err) => {
        BsSwal.fire({
          icon: 'error',
          text: err.message,
        });
      });
  };

  return (
    <div className="content">
      <Card>
        <CardHeader
          text={t('tradingComponentsNewSellOrderCardHeader')}
          caption={t('tradingComponentsNewSellOrderCardCaption')}
          icon={<BrandIcon icon="info" color="cyan" pill />}
        />
        <CardBody>
          <Form className="m-2">
            <SellOrderMainInfo shareType={shareType} {...state} />
            <SellOrderSharesSelect shareType={shareType} shares={shares} {...state} />
            <Row>
              <Col md={6}>
                <Button size="m" onClick={handleSubmit} className="mr-2" disabled={disabled}>
                  {t('tradingComponentsNewSellOrderSellOrderButton')}
                </Button>
                <Button size="m" onClick={handleCancel}>
                  {t('tradingComponentsNewSellOrderCancelOrderButton')}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewSellOrder;
