import React, { useRef, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Collapse, Nav } from 'reactstrap';
import styled from 'styled-components';
import { SenderType } from 'services/apollo';
import { Button, StoLogo } from 'atoms';
import MessagesBadge from 'components/MessagesBadge';

const Sidebar = (props) => {
  const { showBtnDashboard, history, investorAppParameters } = props;
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      }
      if (window.location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };

  const [state, setState] = useState(getCollapseStates(props.routes));
  const sidebar = useRef(null);
  const createLinks = (routes) =>
    routes.map(({ show, featureFlagName, ...prop }, key) => {
      if (prop.redirect || (show && show() === false) || (featureFlagName && !investorAppParameters[featureFlagName])) {
        return null;
      }
      if (prop.collapse) {
        const st = {};
        st[prop.state] = !state[prop.state];
        return (
          <li key={key} className={getCollapseInitialState(prop.views) ? 'active' : ''}>
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              onClick={(e) => {
                e.preventDefault();
                setState(st);
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={state[prop.state]}>
              <ul className="nav">{createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      const isActive = activeRoute((prop.layout || '') + prop.path);
      return (
        <MenuItem className={isActive ? 'active' : ''} active={isActive} key={prop.path}>
          <NavLink to={(prop.layout || '') + prop.path}>
            {prop?.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <span>
                  {prop.name}
                  {prop.path === '/chat' ? <MessagesBadge sender={SenderType.Admin} /> : null}
                  {prop.path === '/support' ? <MessagesBadge sender={SenderType.Platform} /> : null}
                </span>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </NavLink>
        </MenuItem>
      );
    });

  const activeRoute = (routeName) => !props.location.pathname.indexOf(routeName);

  return (
    <Sidebarr className="sidebar">
      <div className="logo logoheader" style={{ height: '80px' }}>
        <div className="logo-img red-swan-custom">
          <StoLogo style={{ height: '59px', objectFit: 'contain', margin: 'auto', marginTop: '-4px' }} />
        </div>
      </div>

      <div className="sidebar-wrapper w-100 h-100 overflow-hidden" ref={sidebar}>
        {showBtnDashboard && (
          <Button size="md" onClick={() => history.push('/investor')} className="mt-3 ml-4">
            Dashboard
          </Button>
        )}
        <Nav
          className="mt-0 w-100 h-100"
          style={{
            overflowY: 'scroll',
            paddingRight: '17px',
            boxSizing: 'content-box',
          }}
        >
          {createLinks(props.routes)}
        </Nav>
      </div>
    </Sidebarr>
  );
};

export default withRouter(Sidebar);

export const Sidebarr = styled.div`
  &:after {
    background: ${(p) => p.theme.backgroundSideBar};
  }
  .logoheader {
    background-color: ${(p) => p.theme.extendedNavigationBar ? p.theme.fontColorSideBar : p.theme.backgroundSideBar};
  }
  .nav {
    li {
      &:hover:not(.active) > a,
      &:focus:not(.active) > a {
        opacity: 1;
      }
    }
  }

  .sidebar-wrapper {
    li.active {
      > a:not([data-toggle='collapse']),
      > [data-toggle='collapse'] + div .nav li {
        &:before {
          border-right: 17px solid ${(p) => (p.theme.backgroundApp ? p.theme.backgroundApp : '#f4f3ef')};
          display: ${(p) => (p.theme.name === 'MarketSpaceTheme' ? 'none' : 'block')};
        }

        &:after {
          border-right: 17px solid ${(p) => (p.theme.backgroundApp ? p.theme.backgroundApp : '#f4f3ef')};
          display: ${(p) => (p.theme.name === 'MarketSpaceTheme' ? 'none' : 'block')};
        }
      }
    }
  }
`;

const MenuItem = styled.li`
  ${(props) => {
    let css = `
      a, i, span {
        font-weight: ${props.theme.fontWeightSideBar && `${props.theme.fontWeightSideBar} !important`};
        color: ${props.theme.fontColorSideBar ? `${props.theme.fontColorSideBar} !important` : 'white'};
        opacity: 1;
      }
    `;
    if (props.active)
      css = `
        a.active i, a.active span {
          font-weight: ${props.theme.fontWeightSideBar && `${props.theme.fontWeightSideBar} !important`};
          color: ${props.theme.fontActiveItemSideBar} !important
        }
        
    `;
    if (props.theme.name === 'MarketSpaceTheme' && props.active) {
      css += `
        background: ${props.theme.colors.white};
      `;
    }
    return css;
  }}
`;

// <div className="user">
//   <div className="photo">
//     <img src={avatar} alt="Avatar" />
//   </div>
//   <div className="info">
//     <a
//       href="#pablo"
//       data-toggle="collapse"
//       aria-expanded={this.state.openAvatar}
//       onClick={() => this.setState((prev) => ({ openAvatar: !prev.openAvatar }))}
//     >
//                 <span>
//                   Chet Faker
//                   <b className="caret" />
//                 </span>
//     </a>
//     <Collapse isOpen={this.state.openAvatar}>
//       <ul className="nav">
//         <li>
//           <NavLink to="/admin/user-profile" activeClassName="">
//             <span className="sidebar-mini-icon">MP</span>
//             <span className="sidebar-normal">My Profile</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admin/user-profile" activeClassName="">
//             <span className="sidebar-mini-icon">EP</span>
//             <span className="sidebar-normal">Edit Profile</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admin/user-profile" activeClassName="">
//             <span className="sidebar-mini-icon">S</span>
//             <span className="sidebar-normal">Settings</span>
//           </NavLink>
//         </li>
//       </ul>
//     </Collapse>
//   </div>
//  </div>
