import React from 'react';
import { SpinnerSmall, Button, CenteredCol } from 'atoms';
import { useTranslation } from 'react-i18next';
import { SharePurchaseModeEnum } from 'services/apollo';

interface ViewDocumentButtonProps {
  handleDownloadedClick: (provider: SharePurchaseModeEnum, isView: boolean) => void;
  provider: SharePurchaseModeEnum;
  downloaded: string;
  loading: boolean;
}

const ViewDocumentButton: React.FC<ViewDocumentButtonProps> = ({
  handleDownloadedClick,
  provider,
  downloaded,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <CenteredCol>
        <Button size="sm" onClick={() => handleDownloadedClick(provider, true)}>
          {t('ViewDocumentButton-View')}
        </Button>
      </CenteredCol>
      <CenteredCol>
        <Button size="sm" onClick={() => handleDownloadedClick(provider, false)}>
          {t('ViewDocumentButton-Download')}
        </Button>
      </CenteredCol>
      <CenteredCol>{loading && !downloaded && <SpinnerSmall />}</CenteredCol>
    </>
  );
};

export default ViewDocumentButton;
