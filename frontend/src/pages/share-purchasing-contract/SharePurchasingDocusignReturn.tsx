import React, { useEffect } from 'react';
import { useSetDocuSignSignatureMutation } from 'services/apollo';
import { Loading, BsSwal } from 'atoms';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SharePurchasingDocusignReturn: React.FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const event = searchParams.get('event');
  const sharePurchaseID: number = parseInt(searchParams.get('sharepurchaseid') ?? '', 10);
  const documentID: number = parseInt(searchParams.get('documentid') ?? '', 10);
  const docusignEnvelopeID: string = searchParams.get('envelopeid') ?? '';
  const history = useHistory();
  const { t } = useTranslation();

  const goBack = () => {
    history.replace(`/investor/share-purchase-signing/${sharePurchaseID}`);
  };

  const [setSignature] = useSetDocuSignSignatureMutation();

  useEffect(() => {
    if (event === 'signing_complete') {
      setSignature({
        variables: { documentID, sharePurchaseID, docusignEnvelopeID },
      })
        .then(() =>
          BsSwal.fire({
            icon: 'success',
            title: t('DocuSignReturn-SuccessMessage'),
            timer: 1000,
          }),
        )
        .then(() => goBack())
        .catch((e) =>
          BsSwal.fire({
            icon: 'error',
            title: t('DocuSignReturn-InternalErrorMessage'),
            text: `${e as Error}`,
          }).then(() => goBack()),
        );
    } else {
      BsSwal.fire({
        icon: 'error',
        title: t('DocuSignReturn-NotSignedTitle'),
        text: t('DocuSignReturn-NotSignedMessage'),
      }).then(() => goBack());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading />;
};

export default SharePurchasingDocusignReturn;

export {};
