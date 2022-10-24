import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InvestorShares } from 'services/apollo/shares';

import { useModal } from 'components/Modal';
import NBC from 'assets/img/nonblockchain.png';
import BCWALLET from 'assets/img/blockchainwallet.png';
import { Button, Row, CenteredCol } from 'atoms';
import SellShareForm from 'pages/active-properties/components/SellShareForm';

interface ShareItemProps {
  share: InvestorShares;
}

const ShareItem: React.FC<ShareItemProps> = ({ share }) => {
  const modal = useModal();
  const { t, i18n } = useTranslation();
  const { shareType } = share;
  const [shareQty, setShareQty] = useState(share.shares ?? 0);
  const handleShowModal = () => {
    modal.showModal({
      noWrapper: true,
      className: 'w-50 mw-100 minw-400',
      bodyContent: ({ hideModal }: { hideModal: () => void }) => (
        <SellShareForm share={share} hideModal={hideModal} shareQty={shareQty} setShareQty={setShareQty} />
      ),
    });
  };
  const sell = () => handleShowModal();

  const { symbol } = shareType.currency;
  return (
    <>
      <Row className="mb-2">
        <CenteredCol md={3}>
          <img className="mr-2" src={shareType.isBlockchain ? BCWALLET : NBC} width="20px" />
          {shareType.title}
        </CenteredCol>
        <CenteredCol md={2}>{shareQty.toLocaleString(i18n.language)}</CenteredCol>
        {/* <CenteredCol md={2}>
          {symbol} {(shareType?.nominalValue ?? 0).toLocaleString(i18n.language, { minimumFractionDigits: 2 })}
        </CenteredCol> */}
        <CenteredCol md={2}>
          {symbol} {(shareType.premiumValue ?? 0).toLocaleString(i18n.language, { minimumFractionDigits: 2 })}
        </CenteredCol>
        <CenteredCol md={3}>
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={shareType.sellToCompany ? t('shareItem-toolTip-sellEnabled') : t('shareItem-toolTip-sellDisabled')}
          >
            <Button disabled={!shareType.sellToCompany} onClick={sell} size="sm">
              {t('sellToCompany')}
            </Button>
          </span>
        </CenteredCol>
      </Row>
    </>
  );
};

export default ShareItem;
