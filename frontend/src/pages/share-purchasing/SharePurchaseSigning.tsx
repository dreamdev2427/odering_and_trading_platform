import React from 'react';

import { Loading } from 'atoms';
import { useParams } from 'react-router';
import { useInvestorAppDataQuery, useSharePurchaseDocumentsQuery } from 'services/apollo';
import ContractsList from './components/ContractsList';

const SharePurchaseSigning: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const sharePurchaseID: number = parseInt(id, 10);
  const { data, loading } = useSharePurchaseDocumentsQuery({ variables: { sharePurchaseID }, fetchPolicy: 'no-cache' });
  const { data: appData, loading: appDataLoading } = useInvestorAppDataQuery();

  if (!data || !appData || loading || appDataLoading) {
    return <Loading />;
  }

  const {
    AccreddRedirectLink: accreddRedirectLink,
    skipDocumentSignScreen,
    IsMarketSpace: isMarketspace,
    KycProvider: kycProvider,
  } = appData.investorAppParameters;

  return (
    <div className="content">
      <ContractsList
        accreddRedirectLink={accreddRedirectLink}
        skipDocumentSignScreen={skipDocumentSignScreen}
        isMarketspace={isMarketspace}
        kycProvider={kycProvider}
        sharePurchaseID={sharePurchaseID}
        sharePurchaseDocuments={data.sharePurchaseDocuments}
        appData={appData}
      />
    </div>
  );
};

export default SharePurchaseSigning;

export {};
