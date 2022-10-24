import React from 'react';
import { Loading, BsSwal } from 'atoms';
import { useTranslation } from 'react-i18next';
import { useSendHelloSignTemplateSignRequestQuery } from 'services/apollo';
import { useParams } from 'react-router';
import HelloSign from 'hellosign-embedded';
import { useHistory } from 'react-router-dom';

const HelloSignSharePurchasingContract: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams<{ sharepurchaseid: string; documentid: string }>();
  const documentID: number = parseInt(params.documentid, 10);
  const sharePurchaseID: number = parseInt(params.sharepurchaseid, 10);
  const { data, loading } = useSendHelloSignTemplateSignRequestQuery({
    variables: {
      documentID,
      sharePurchaseID,
    },
  });

  if (!data || loading) {
    return <Loading />;
  }
  const signUrl = data.sendHelloSignTemplateSignRequest;
  const helloSignClientID = data.findSto?.helloSignClientID ?? '';
  const client = new HelloSign();

  client.open(signUrl, {
    clientId: helloSignClientID,
    container: document.getElementById('helloSignEmbedded') ?? undefined,
    skipDomainVerification: true,
    allowCancel: true,
  });
  client.once('close' || 'cancel', () => {
    client.close();
    BsSwal.fire({
      icon: 'warning',
      title: t('helloSignSharePurchasingContract-helloSignWarnMessage'),
      willClose: () => history.push('/investor/Portfolio'),
    });
  });
  client.once('error', () => {
    client.close();
    BsSwal.fire({
      icon: 'error',
      title: t('helloSignSharePurchasingContract-helloSignErrorMessage'),
      willClose: () => history.push(`/investor/Portfolio`),
    });
  });
  // moving back to sharepurchasesigning with any callback because of faulty CSP on client.close
  client.once('sign', () => {
    client.close();
    BsSwal.fire({
      icon: 'success',
      title: t('helloSignSharePurchasingContract-helloSignWaitingMessage'),
      willClose: () => history.push(`/investor/share-purchase-signing/${sharePurchaseID}`),
    });
  });

  return <label key="helloSignEmbedded1" id="helloSignEmbedded" />;
};

export default HelloSignSharePurchasingContract;
