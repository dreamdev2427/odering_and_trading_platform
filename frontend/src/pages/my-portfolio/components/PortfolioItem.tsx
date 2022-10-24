import React from 'react';
import { useTranslation } from 'react-i18next';

import { InvestorPortfolioShares } from 'services/apollo/multisto';
import { useFindShareHistoricalValuesQuery } from 'services/apollo';

import BCWALLET from 'assets/img/blockchainwallet.png';
import NBC from 'assets/img/nonblockchain.png';
import { Col, Row, Loading } from 'atoms';

interface PortfolioItemProps {
  share: InvestorPortfolioShares;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ share }) => {
  const { shareType } = share;
  const { i18n } = useTranslation();

  const { data: shareHistoricalData, loading: load } = useFindShareHistoricalValuesQuery({
    variables: { shareTypeID: Number(shareType?.ID) },
    fetchPolicy: 'no-cache',
  });

  // if (!share.shares) {
  //   return <></>;
  // }

  if (load || !shareHistoricalData || !shareType) {
    return <Loading />;
  }

  const sharesValue = shareType.premiumValue && share.shares ? shareType.premiumValue * share.shares : 0;

  return (
    <div>
      <Row className="mt-2">
        <Col className=" d-flex justify-content-xl-between">
          <Col md={9} className="w-75 align-self-start">
            <img className="mr-2" src={shareType.isBlockchain ? BCWALLET : NBC} width="20px" alt="" />
            <label style={{ fontSize: '1rem' }}>{shareType.title}</label>
          </Col>
          <Col md={3}>
            {share.shares.toLocaleString(i18n.language, {
              minimumFractionDigits: 2,
            })}{' '}
            Shares / {shareType.currency.symbol}
            {sharesValue.toLocaleString(i18n.language, { minimumFractionDigits: 2 })}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default PortfolioItem;
