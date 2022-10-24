import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { InvestorWalletChannel } from 'services/apollo/multisto';

import { Button, Col, Row } from 'atoms';
import { PaymentChannelType } from 'services/apollo';
import { Markup } from 'interweave';
import { useReactToPrint } from 'react-to-print';

interface ChannelItemProps {
  channel: InvestorWalletChannel;
  deposit: () => void;
  withdraw: () => void;
  isMarketspace: boolean;
}

const ChannelItem: React.FC<ChannelItemProps> = ({ channel, deposit, withdraw, isMarketspace }) => {
  const { t } = useTranslation();
  const componentRef = useRef(null);

  const download = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${t('ChannelItem-download-document-title')} - ${channel.title}`,
  });

  return (
    <Row className="border-bottom pb-2 mb-2">
      <Col md={8}>
        <b>{channel.title} </b>
        {channel.channelType === PaymentChannelType.Mercury ? (
          <label style={{ color: 'gray' }}>- {t('ChannelItem-MercuryChannelLabel')}</label>
        ) : null}
        <br />
        <b>Currency</b>: {channel.currency?.abbreviation} ( {channel.currency?.symbol} )
        <br />
        <div ref={componentRef}>
          <Markup content={channel.details || ''} />
        </div>
      </Col>
      <Col md={4}>
        <Row>
          <Col>
            <Button onClick={download} size="sm">
              {t('ChannelItem-download-button')}
            </Button>
          </Col>
        </Row>
        {!isMarketspace ? (
          <>
            <Row>
              <Col>
                <Button onClick={deposit} size="sm">
                  {t('channelItemDepositFunds')}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {channel.canWithdrawFunds ? (
                  <Button onClick={withdraw} size="sm">
                    {t('channelItemWithdrawFunds')}
                  </Button>
                ) : null}
              </Col>
            </Row>
          </>
        ) : null}
      </Col>
    </Row>
  );
};

export default ChannelItem;
