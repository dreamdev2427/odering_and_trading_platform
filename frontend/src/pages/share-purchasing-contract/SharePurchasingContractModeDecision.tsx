import React from 'react';
import { Loading } from 'atoms';
import { useInvestorAppDataQuery } from 'services/apollo';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

const SharePurchasingContractModeDecision: React.FC = () => {
  const params = useParams<{ sharepurchaseid: string; documentid: string }>();
  const documentID: number = parseInt(params.documentid, 10);
  const sharePurchaseID: number = parseInt(params.sharepurchaseid, 10);
  const history = useHistory();
  const { data: appData, loading } = useInvestorAppDataQuery();

  if (!appData || loading) {
    return <Loading />;
  }
  const isDocuSignActive = appData.investorAppParameters.IsDocuSignActive;
  const isHelloSignActive = appData.investorAppParameters.IsHelloSignActive;

  if (isDocuSignActive) {
    history.push(`/investor/docu-sign-share-purchase-contract/${sharePurchaseID}/${documentID}`);
  } else if (isHelloSignActive) {
    history.push(`/investor/hello-sign-share-purchase-contract/${sharePurchaseID}/${documentID}`);
  } else {
    history.push(`/investor/internal-sign-share-purchase-contract/${sharePurchaseID}/${documentID}`);
  }
  return <Loading />;
};

export default SharePurchasingContractModeDecision;
