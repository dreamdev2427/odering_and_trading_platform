import React, { useEffect, useState } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import {
  AccreditationRequirementEnum,
  Investor,
  InvestorAppDataQuery,
  InvestorSto,
  KycRequirementStep,
  useRootKycSubscription,
} from 'services/apollo';
import InvestorLayout from 'layouts/InvestorLayout';
import { getRedirectUrl } from './Root';
import { accreditationProcess } from '../lib/routing/route-sets/verify-routes';

interface KycState {
  isKyc: boolean;
  needsAccreditation: boolean;
}
interface Condition {
  condition: boolean;
  redirect: string;
}
interface RouterPaths {
  path: string;
  conditions: Condition[];
}

const fillKycState = (isKyc: boolean, needsAccreditation: boolean): KycState => {
  return {
    isKyc,
    needsAccreditation,
  };
};

interface RootRoutesProps {
  appData: InvestorAppDataQuery;
  investor: Investor | undefined;
  investorSto: Partial<InvestorSto> | undefined;
}

const RootRoutes: React.FC<RootRoutesProps> = (props) => {
  const { appData, investorSto, investor } = props;
  const history = useHistory();
  const [kycData, setKycData] = useState(fillKycState(!!investorSto?.isKYC || false, false));

  const { data: subscriptionData } = useRootKycSubscription();

  const { status, isKYC } = subscriptionData?.rootKyc || {};
  useEffect(() => {
    const trueIsKyc = isKYC !== undefined ? !!isKYC : !!investorSto?.isKYC;
    const trueStatus = status ?? investorSto?.status ?? 7;

    const { isAccreditationEnabled, accreditationRequiringCountries } = appData?.investorAppParameters || {};

    const investorCountry = (investor?.taxCountry ?? investor?.country) || '';
    const needsAccreditation =
      (isAccreditationEnabled &&
        accreditationRequiringCountries?.find((c) => c.toLowerCase() === investorCountry.toLowerCase()) &&
        trueStatus !== 3) ||
      false;
    setKycData(fillKycState(trueIsKyc, needsAccreditation));
  }, [
    investor,
    history,
    isKYC,
    investorSto?.isKYC,
    status,
    appData?.investorAppParameters,
    investorSto,
    kycData.isKyc,
    kycData.needsAccreditation,
  ]);

  const {
    KycProvider: kycProvider,
    KycRequirementStep: kycRequirementStep,
    accreditationRequirementStep,
  } = appData.investorAppParameters;

  let kycPath = '/kyc-process/start';
  if (!isKYC) {
    kycPath = getRedirectUrl(kycProvider);
  }

  const accreditationPath = accreditationProcess.path;

  const paths: RouterPaths[] = [
    {
      path: '/investor/buy-property',
      conditions: [
        {
          condition:
            kycData.needsAccreditation && accreditationRequirementStep === AccreditationRequirementEnum.OnPurchase,
          redirect: accreditationPath,
        },
        {
          condition: !kycData.isKyc && kycRequirementStep === KycRequirementStep.OnPurchase,
          redirect: kycPath,
        },
      ],
    },
    {
      path: '/investor/trading',
      conditions: [
        {
          condition:
            kycData.needsAccreditation && accreditationRequirementStep === AccreditationRequirementEnum.OnPurchase,
          redirect: accreditationPath,
        },
        {
          condition: !kycData.isKyc && kycRequirementStep === KycRequirementStep.OnPurchase,
          redirect: kycPath,
        },
      ],
    },
    {
      path: '/investor',
      conditions: [
        {
          condition: !kycData.isKyc && kycRequirementStep === KycRequirementStep.OnRegister,
          redirect: kycPath,
        },
        {
          condition:
            kycData.needsAccreditation && accreditationRequirementStep === AccreditationRequirementEnum.OnRegister,
          redirect: accreditationPath,
        },
      ],
    },
  ];
  return (
    <Switch>
      {paths.map((p, index) => (
        <Route
          key={index}
          path={p.path}
          render={() => {
            p.conditions.forEach((c) => {
              if (c.condition) {
                history.push(c.redirect);
              }
            });
            return <InvestorLayout investorAppParameters={appData.investorAppParameters} />;
          }}
        />
      ))}
    </Switch>
  );
};

export default RootRoutes;
