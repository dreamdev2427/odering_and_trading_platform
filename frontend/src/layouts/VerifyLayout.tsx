import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import {
  JsonKycQuery,
  KycRequirementStep,
  useGetInvestorTypesQuery,
  useInvestorAppDataQuery,
  useJsonKycQuery,
  useMeQuery,
} from 'services/apollo/graphql';
import { Loading } from 'atoms';
import Sidebar from 'components/sidebar/Sidebar';
import AuthNavbar from 'components/navbar/AuthNavbar';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme } from 'styled-components';
import Footer from '../components/Footer';
import MarketSpaceJson from '../pages/kyc-process/MarketSpace.json';
import { ThemeType } from '../lib/themes/themeTypes';
import DiliCapitalJson from '../pages/kyc-process/DiliCapital.json';
import MyProfileStatus from './MyProfileStatus';

export interface KycData {
  isKyc: boolean;
  status: number;
  showDashboardBtn: boolean;
}

export const defaultValues = (isKyc = false, status = 7, showDashboardBtn = false): KycData => {
  return {
    isKyc,
    status,
    showDashboardBtn,
  };
};

interface VerifyLayoutProps {
  children: React.ReactElement;
  singleSidebarRoute: boolean;
  name: string;
}

const VerifyLayout: React.FC<VerifyLayoutProps> = (props) => {
  const { children, singleSidebarRoute, name } = props;
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' });
  const { data: appData } = useInvestorAppDataQuery();
  const { data: investorTypeData } = useGetInvestorTypesQuery();

  const { t } = useTranslation();
  const { investorSto, investor } = data?.investorUser || {};
  const history = useHistory();
  const theme = useTheme() as ThemeType;

  const isMarketSpace = appData?.investorAppParameters?.IsMarketSpace;
  const clientKYC = appData?.investorAppParameters?.clientKYC;

  const transValue = (val: string | undefined) => {
    return (val && t(val)) || val || '';
  };

  const { data: RemoteJsonData, loading: loadKYC } = useJsonKycQuery();

  const kycRequirementStep = appData?.investorAppParameters?.KycRequirementStep;
  const showDashboard = kycRequirementStep !== KycRequirementStep.OnRegister || !!investorSto?.isKYC;
  const [kycData, setKycData] = useState(defaultValues(!!investorSto?.isKYC, investorSto?.status, showDashboard));

  if (loading || loadKYC || !investor || !investorSto || !RemoteJsonData || !investorTypeData) {
    return <Loading />;
  }

  const updateKyc = (newState: Partial<KycData>) => {
    setKycData((prevState) => ({ ...prevState, ...newState }));
  };

  const { isKYC, status } = investorSto;
  if ((isKYC && !!isKYC !== kycData.isKyc) || (status && status !== kycData.status)) {
    const showDashboardBtn = kycRequirementStep !== KycRequirementStep.OnRegister || !!isKYC;
    setKycData(defaultValues(!!investorSto.isKYC, investorSto.status, showDashboardBtn));
  }
  let queryData: JsonKycQuery;
  if (clientKYC === 'DiliCapital') {
    queryData = DiliCapitalJson.data;
  } else if (isMarketSpace) {
    queryData = MarketSpaceJson.data;
  } else {
    queryData = RemoteJsonData;
  }

  const { kyc } = queryData;

  const kycProvider = appData?.investorAppParameters?.KycProvider;
  const VerifyRoutes = !singleSidebarRoute
    ? kyc.map((e, i) => {
        return {
          path: `/kyc-process/${e.name}`,
          name: `${i + 1} - ${transValue(e.title)}`,
          icon: e.icon,
        };
      })
    : [
        {
          // show only the first element of KYC when using external providers
          path: `/${kycProvider}`,
          name: `${1} - ${name}`,
          icon: 'ti-id-badge',
        },
      ];

  let alertText: string;
  let bannerColor = 'success';
  switch (kycData.status) {
    case 10:
      alertText = t('kyc_failed');
      bannerColor = 'danger';
      break;
    case 11:
      alertText = t('kyc_restarted');
      bannerColor = 'warning';
      break;
    default:
      alertText = t('kyc_submitted');
      break;
  }

  // todo@leonid we dont need use js for styling!  we can change theme in code! for example white theme for profile

  const whiteTheme: ThemeType = {
    ...theme,
    backgroundSideBar: theme.colors.white,
    fontColorSideBar: theme.colors.grayDark,
  };
  return (
    <div className="wrapper">
      <ThemeProvider theme={whiteTheme}>
        <Sidebar showBtnDashboard={kycData.showDashboardBtn} routes={VerifyRoutes} />
      </ThemeProvider>
      <div className="main-panel">
        <AuthNavbar />
        <div className="content">
          {investorSto.applied ? (
            <Alert className="w-100" color={bannerColor}>
              {alertText}
            </Alert>
          ) : null}
          <MyProfileStatus
            investorID={investor.ID}
            kycData={kycData}
            updateKyc={updateKyc}
            investorTypeData={investorTypeData}
            kycRequirementStep={appData?.investorAppParameters?.KycRequirementStep ?? KycRequirementStep.Ignore}
          />
          {/* the custom kyc elements are handled by the CustomKYC.jsx component */}
          {React.cloneElement(children, { key: history.location.key, data: [...kyc] })}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default VerifyLayout;
