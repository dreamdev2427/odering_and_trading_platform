import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

import Auth from 'services/core/auth';
import { signIn } from 'lib/routing/route-sets/public-routes';
import LanguageSelector from 'components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useInvestorAppDataQuery } from '../../services/apollo';

const AuthNavbar = (props) => {
  const { data: appData } = useInvestorAppDataQuery();
  const [state, setState] = useState({
    collapseOpen: false,
    color: 'navbar-transparent',
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (
      window.outerWidth < 993 &&
      props.history.location.pathname !== props.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
  });

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

  return (
    <>
      <Navbar className={classnames('navbar-absolute p-0', state.color)} expand="lg" style={{ height: '80px' }}>
        <Container fluid className="h-100 bg-white">
          <div className="navbar-wrapper">
            <div className={classnames('navbar-toggle', { toggled: state.sidebarOpen })}>
              <button className="navbar-toggler ml-2" type="button" onClick={toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              <span className="ml-2">{t('AuthNavbar-title')}</span>
            </NavbarBrand>
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
                <NavLink to="#" className="nav-link" onClick={logout}>
                  <i className="ti-arrow-circle-up pr-1" />
                  <span>Logout</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default withRouter(AuthNavbar);
