import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import Auth from 'services/core/auth';

import { isMulti } from 'services/core/helpers';
import { signIn } from 'lib/routing/route-sets/public-routes';
import {
  kycProcess,
  personalInfo,
  sumSubProcess,
  blockPassProcess,
  netkiProcess,
} from 'lib/routing/route-sets/verify-routes';
import LanguageSelector from 'components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { Button, StoLogo, Loading } from 'atoms';
import CustomizationComponent from 'components/CustomizationComponent';
import { useModal } from '../Modal';
import StoSwichList from './StoSwitchList';
import { KycProviders, useInfoQuery, useInvestorAppDataQuery, useMeQuery } from '../../services/apollo';
import { useActiveSto } from '../../hooks';

const InvestorNavbar = (props) => {
  const { data: appData, loading: appDataLoad } = useInvestorAppDataQuery();
  const { data: userData, loading: userLoading } = useMeQuery();
  const [state, setState] = useState({
    collapseOpen: false,
    color: 'navbar-transparent',
  });
  const { sto } = useActiveSto();
  const stoID = sto <= 0 ? 0 : sto;
  const { data, loading } = useInfoQuery({ variables: { _id: stoID } });
  const modal = useModal();
  const { t } = useTranslation();
  useEffect(() => {
    if (
      window.outerWidth < 993 &&
      props.history.location.pathname !== props.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
  }, [props.history.location.pathname, props.location.pathname]);
  if (loading || !data?.publicSto) {
    return <></>;
  }
  const { publicSto } = data;

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
  };

  const toggleCollapse = () => {
    const newState = {
      collapseOpen: !state.collapseOpen,
    };
    if (!state.collapseOpen) {
      newState.color = 'bg-white';
    } else {
      newState.color = 'navbar-transparent';
    }
    setState(newState);
  };

  const handleShowModal = () => {
    modal.showModal({
      title: t('investorNavbar-popUp-title'),
      showFooter: true,
      className: 'w-50 mw-100',
      cancelText: 'Cancel',
      showXButton: true,
      bodyContent: () => <StoSwichList modal={modal} />,
    });
  };

  const logout = (e) => {
    e.preventDefault();
    const { history } = props;
    Auth.signOut().then(() => {
      const { SSORedirectFrontEnd, isSSOModeEnabled } = appData.investorAppParameters;
      if (isSSOModeEnabled && SSORedirectFrontEnd !== '') {
        window.location.href = SSORedirectFrontEnd;
      } else {
        history.push(signIn.path);
      }
    });
  };

  if (appDataLoad || !appData || !userData || userLoading) {
    return <Loading />;
  }

  const isMarketspace = appData?.investorAppParameters?.IsMarketSpace;
  const investorUser = userData.investorUser?.investor;
  const { KycProvider } = appData.investorAppParameters;
  const MarkeetspaceProfileLink = isMarketspace ? kycProcess.path : personalInfo.path;
  const link = (kycProvider) => {
    switch (kycProvider) {
      case KycProviders.Internal:
        return MarkeetspaceProfileLink;
      case KycProviders.SumSub:
        return sumSubProcess.path;
      case KycProviders.BlockPass:
        return blockPassProcess.path;
      case KycProviders.Netki:
        return netkiProcess.path;
      default:
        return personalInfo.path;
    }
  };
  const myProfileLink = link(KycProvider);
  return (
    <>
      <CustomizationComponent name="Navbar" />
      <Navbar className={classnames('navbar-absolute p-0', state.color)} expand="lg" style={{ height: '80px' }}>
        <Container fluid className="bg-white">
          <div className="navbar-wrapper">
            <div className={classnames('navbar-toggle', { toggled: state.sidebarOpen })}>
              <button className="navbar-toggler ml-2" type="button" onClick={toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              <span className="font-weight-bolder ml-2">{t('Investor-Dashboard')}</span>
            </NavbarBrand>
            <span
              className="logo"
              style={{
                verticalAlign: 'middle',
                height: '79px',
              }}
            >
              <div className="logo-img red-swan-custom">
                <StoLogo
                  style={{ height: '30px', objectFit: 'contain', margin: 'auto' }}
                  title={publicSto.title ?? 'ALL'}
                />
                {isMulti && (
                  <Button type="button" size="sm" className="ml-4" onClick={handleShowModal}>
                    {t('Switch')}
                  </Button>
                )}
              </div>
            </span>
          </div>
          <button
            aria-controls="navigation-index"
            aria-expanded={state.collapseOpen}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-toggle="collapse"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse className="justify-content-end" navbar isOpen={state.collapseOpen}>
            <Nav navbar>
              <LanguageSelector />
              <NavItem className="pt-1">
                <NavLink className="nav-link" to={myProfileLink}>
                  <span style={{ fontWeight: '400' }}>
                    <span style={{ color: '#9a9a9a' }}>
                      <i className="ti-user mr-2" />
                    </span>
                    {investorUser.firstName} {investorUser.lastName}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem className="pt-1">
                <NavLink to="#" className="nav-link" onClick={logout}>
                  <i className="ti-arrow-circle-up pr-1" />
                  <span style={{ fontSize: '13px' }}>{t('Logout')}</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default withRouter(InvestorNavbar);
