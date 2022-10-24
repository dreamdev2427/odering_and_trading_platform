import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import { KycProviders, useGetThemeConfigQuery, useInvestorAppDataQuery, useMeQuery } from 'services/apollo';
import publicRoutes, { signIn, twoFactor } from 'lib/routing/route-sets/public-routes';
import verifyRoutes from 'lib/routing/route-sets/verify-routes';
import Auth from 'services/core/auth';
import { useIdle, useLoadTranslations } from 'hooks';
import { Loading } from 'atoms';
import { Helmet } from 'react-helmet';
import Favicon from 'react-favicon';
import { ThemeContext } from 'lib/themes/themeController';
import RootRoutes from './RootRoutes';

const routes = [...publicRoutes, ...verifyRoutes];

export const getRedirectUrl = (kycProvider: KycProviders = KycProviders.Internal): string => {
  switch (kycProvider) {
    case KycProviders.SumSub:
      return '/sumsub';
    case KycProviders.BlockPass:
      return '/blockpass';
    case KycProviders.Netki:
      return '/netki';
    default:
      return '/kyc-process/start';
  }
};

const Root: React.FC = () => {
  const { setTheme } = useContext(ThemeContext);

  const { data, loading } = useMeQuery({
    fetchPolicy: 'network-only',
  });

  const { data: appData, loading: appDataLoad } = useInvestorAppDataQuery();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    Auth.signOut().then(() => {
      const { SSORedirectFrontEnd, isSSOModeEnabled } = appData?.investorAppParameters || {};
      if (isSSOModeEnabled && SSORedirectFrontEnd && SSORedirectFrontEnd !== '') {
        window.location.href = SSORedirectFrontEnd;
      } else {
        history.push(signIn.path);
      }
    });
  };
  const { sto, investor, investorSto } = data?.investorUser || {};
  useEffect(() => {
    const isPrivate = location.pathname.includes('investor') || location.pathname === '/';
    if (!loading && !investor && isPrivate) {
      history.push(signIn.path);
    }
    if (investor && isPrivate && Auth.need2FA()) {
      history.push(twoFactor.path);
    }
  }, [investor, loading, history, location.pathname, appData?.investorAppParameters]);

  const { data: themeConfig, loading: themeLoading } = useGetThemeConfigQuery();
  const themeData = themeConfig?.investorAppParameters?.investorDashboardTheme || '';

  useLayoutEffect(() => {
    try {
      const config = themeData ? JSON.parse(themeData) : null;
      if (config) {
        setTheme(config);
      }
    } catch (err) {
      console.log('theme not set', err);
    }
  }, [themeData, setTheme]);

  useLoadTranslations();

  useIdle({
    timeout: 0, // isDev() ? 0 : 10, disabled temporarily
    onTimeout: logout,
    onExpired: logout,
  });
  if (loading || appDataLoad || themeLoading || !appData) {
    return <Loading />;
  }

  const params = appData.investorAppParameters;
  if (investorSto?.isActive === 0) {
    logout();
  }
  return (
    <>
      <Favicon url={sto?.parsedSettings.favicon ?? ''} />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{sto?.parsedSettings.tabTitle ?? 'DigiShares'}</title>
      </Helmet>
      <Switch>
        {routes.map((p) => {
          if (p.featureFlagName && !params[p.featureFlagName as keyof typeof params]) {
            return <Redirect exact from={p.path} to="/investor" key={p.path} />;
          }
          return p.getRoute();
        })}
        <Redirect exact from="/" to="/investor" />
      </Switch>
      <RootRoutes appData={appData} investor={investor} investorSto={investorSto} />
    </>
  );
};

export default Root;
