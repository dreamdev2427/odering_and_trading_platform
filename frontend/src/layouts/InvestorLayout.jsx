import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';

import routes, { IntermalRoutes } from 'routes';
import verifyRoutes from 'lib/routing/route-sets/verify-routes';
import Sidebar from 'components/sidebar/Sidebar';
import InvestorNavbar from 'components/navbar/InvestorNavbar';
import ModalForm, { ModalProvider } from 'components/Modal';
import FixedPlugin from 'components/fixed-plugin/FixedPlugin';
import { isSingle } from 'services/core/helpers';
import Footer from 'components/Footer';

const InvestorLayout = (props) => {
  const { investorAppParameters } = props;
  const { t, i18n } = useTranslation();

  const [showStyling, setShowStyling] = useState(investorAppParameters.toggleThemeEditor);
  useHotkeys('ctrl+k', () => setShowStyling(investorAppParameters.toggleThemeEditor && !showStyling), {}, [
    showStyling,
  ]);
  const [state, setState] = useState({
    language: 'English',
    isOpen: false,
    leftSideMenuFont: '',
    poweredByLabel: '',
  });

  const handleChangeLang = (lg) => {
    i18n.changeLanguage(lg);
  };

  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const theme = useTheme();

  const getRoutes = (routs) =>
    routs.map(({ show, featureFlagName, ...prop }) => {
      if (show && show() === false) {
        return null;
      }
      if (featureFlagName && !investorAppParameters[featureFlagName]) {
        return <Redirect exact from={prop.layout + prop.path} to="/" key={prop.path} />;
      }
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/investor') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={prop.path} />;
      }
      return null;
    });

  const { language } = state;

  const isProfileLocation = Boolean(verifyRoutes.find((e) => pathname.includes(e.path)));

  const currentRoutes = (isProfileLocation && verifyRoutes) || routes(t);
  if (pathname === '/investor') {
    if (isSingle()) {
      return <Redirect to="/investor/overview" />;
    }
    return <Redirect to="/investor/active-properties" />;
  }

  const { isOpen, modalData } = state;
  const showModal = (data) =>
    setState({
      isOpen: true,
      modalData: data,
    });
  const hideModal = () => setState({ isOpen: false });
  return (
    <div className="wrapper">
      <Sidebar
        routes={currentRoutes}
        showBtnDashboard={isProfileLocation}
        investorAppParameters={investorAppParameters}
      />

      <MainPanel className="main-panel" background={theme.backgroundApp}>
        <ModalProvider
          value={{
            showModal,
            hideModal,
          }}
        >
          <InvestorNavbar language={language} changeLanguage={handleChangeLang} />
          <Switch>
            {getRoutes(routes(t))}
            {getRoutes(IntermalRoutes(t))}
          </Switch>

          {showStyling && <FixedPlugin />}
          <ModalForm isOpen={isOpen} hideModal={hideModal} data={modalData} />
        </ModalProvider>
        <Footer />
      </MainPanel>
    </div>
  );
};

const MainPanel = styled.div`
  background: ${(p) => (p.background ? p.background : 'none')};
`;

export default InvestorLayout;
