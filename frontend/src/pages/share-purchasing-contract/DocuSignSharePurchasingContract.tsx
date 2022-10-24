import React from 'react';
import { Loading } from 'atoms';
import { useGetDocuSignUrlQuery } from 'services/apollo';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { BsSwal } from '../../atoms';

const DocuSignSharePurchasingContract: React.FC = () => {
  const params = useParams<{ sharepurchaseid: string; documentid: string }>();
  const documentID: number = parseInt(params.documentid, 10);
  const sharePurchaseID: number = parseInt(params.sharepurchaseid, 10);
  const history = useHistory();

  useGetDocuSignUrlQuery({
    variables: {
      documentID,
      sharePurchaseID,
      preferredReturnURL: `${window.location.origin}/investor/share-purchase-docu-sign-return`,
    },
    onCompleted: (queryResult) => {
      if (queryResult.getDocuSignUrl) {
        window.location.replace(queryResult.getDocuSignUrl);
      } else {
        BsSwal.fire({
          icon: 'error',
          title: 'DocuSignReturn-InternalErrorMessage',
          willClose: () => history.goBack(),
        });
      }
    },
    onError: (error) => {
      BsSwal.fire({
        icon: 'error',
        title: error.message,
        willClose: () => history.push('/investor/Portfolio'),
      });
    },
  });
  return <Loading />;
};

export default DocuSignSharePurchasingContract;
