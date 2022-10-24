import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalDate from 'hooks/useLocalDate';
import { useTranslation } from 'react-i18next';
import {
  SharePurchaseModeEnum,
  useDownloadSignedDocuSignLazyQuery,
  useDownloadSignedHelloSignLazyQuery,
} from 'services/apollo';
import { FontAweIcon, Row, CenteredCol } from 'atoms';
import ViewDocumentButton from '../../components/ViewDocumentButton';

type ContractInputProps = {
  ID: number;
  title: string;
  date?: string;
  status: number;
  docuSign?: string | null;
  helloSign?: string | null;
  filePath?: string | null;
};

function convertBase64ToBlob(base64Pdf: string) {
  const decodedData = window.atob(base64Pdf);
  const uInt8Array = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: 'application/pdf' });
}

const SignedOffer: React.FC<ContractInputProps> = ({ ID, title, date, docuSign, helloSign, filePath }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const toLocalDate = useLocalDate();
  const [getHelloSignUrl, { data }] = useDownloadSignedHelloSignLazyQuery();
  const [getDocuSignString, { data: docuSignData }] = useDownloadSignedDocuSignLazyQuery();
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [viewClicked, setViewClicked] = useState(false);
  const [downloaded, setDownloaded] = useState('');

  let newPath = '';
  let provider = SharePurchaseModeEnum.Internal;
  if (docuSign) {
    provider = SharePurchaseModeEnum.Docusign;
    newPath = filePath?.includes('docusignViewSignedDocumentsUrl/')
      ? filePath?.replace('docusignViewSignedDocumentsUrl/', '')
      : '';
  } else if (helloSign) {
    provider = SharePurchaseModeEnum.Hellosign;
    if (filePath?.includes('helloSignViewSignedDocumentsUrl/')) {
      newPath = filePath?.split('/').pop() || '';
    }
  }

  useEffect(() => {
    const openNewTab = (base64: string) => {
      const file = convertBase64ToBlob(base64);
      const urlObject = URL.createObjectURL(file);
      setDownloaded(urlObject);
      window.open(urlObject, '_blank');
      setViewClicked(false);
    };

    const downloadFile = (base64: string) => {
      const element = document.createElement('a');
      element.href = `data:application/pdf;base64,${base64}`;
      element.download = `${title}.pdf`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      setDownloadClicked(false);
    };
    if (!(downloadClicked || viewClicked)) {
      return;
    }
    const docuSignString = docuSignData?.downloadSignedDocuSign;
    const helloSignString = data?.downloadSignedHelloSign;
    const base64 = docuSignString || (helloSignString?.split(' ')[1] ?? '');
    if (downloadClicked && base64.length > 1) {
      downloadFile(base64);
    }
    if (viewClicked && base64.length > 1) {
      openNewTab(base64);
    }
  }, [title, data, docuSignData, downloadClicked, viewClicked, newPath]);

  const handleFetchClick = (documentProvider: SharePurchaseModeEnum, isView: boolean) => {
    if (isView) {
      setViewClicked(true);
    } else {
      setDownloadClicked(true);
    }
    switch (documentProvider) {
      case SharePurchaseModeEnum.Hellosign:
        getHelloSignUrl({ variables: { fileID: newPath } });
        break;
      case SharePurchaseModeEnum.Docusign:
        getDocuSignString({ variables: { envelopeID: newPath } });
        break;
      case SharePurchaseModeEnum.Internal:
        if (isView) {
          window.open(`/investor/signed-contract/${ID}`, '_blank');
          setViewClicked(false);
        } else {
          history.push(`/investor/signed-contract/${ID}`, { print: true });
          setDownloadClicked(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Row style={{ fontSize: '1rem' }} key={ID}>
      <CenteredCol md={5}>
        <img alt="green button" width="15px" src="/img/greendot.png" />
        {title}
      </CenteredCol>
      <CenteredCol md={2}>{toLocalDate(new Date(date ?? ''))}</CenteredCol>

      <CenteredCol md={2}>
        <FontAweIcon icon="copy" />
        {docuSign && t('Document-Provider-DocuSign')}
        {helloSign && t('Document-Provider-HelloSign')}
        {!docuSign && !helloSign && t('Document-Provider-Internal')}
      </CenteredCol>

      <CenteredCol md={3}>
        <ViewDocumentButton
          handleDownloadedClick={handleFetchClick}
          provider={provider}
          downloaded={downloaded}
          loading={downloadClicked || viewClicked}
        />
      </CenteredCol>
    </Row>
  );
};
export default SignedOffer;
