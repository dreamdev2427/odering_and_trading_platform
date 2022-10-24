import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import styled, { css } from 'styled-components';
import { Markup } from 'interweave';

import { MetaContentProps } from './MetaContent';

const ContentTabs: React.FC<MetaContentProps> = ({ meta }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  return (
    <>
      <Nav tabs className="justify-content-start">
        <NavItemStyledScrollbar className="d-flex pointer" style={{ overflowY: 'hidden' }}>
          {meta.map(({ key }, i) => (
            <NavLink
              key={key}
              active={active === i}
              className={active === i ? 'bg-white' : ''}
              onClick={() => setActive(i)}
            >
              {t(key)}
            </NavLink>
          ))}
        </NavItemStyledScrollbar>
      </Nav>
      <MetaTap activeTab={active} className="bg-white">
        {meta.map(({ key, value }, i) => (
          <TabPane key={key} tabId={i} className="p-2">
            <Markup content={value} />
          </TabPane>
        ))}
      </MetaTap>
    </>
  );
};

export default ContentTabs;

const MetaTap = styled(TabContent)`
  border-bottom: 1px solid #dee2e6;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  margin-bottom: 10px;
`;

const NavItemStyledScrollbar = styled(NavItem)`
  //MS EDGE, CHROME, SAFARI AND OPERA SUPPORTED
  ::-webkit-scrollbar {
    width: 10px; /* width of the entire scrollbar */
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    ${(p) => css`
      background-color: ${p.theme.colorControls}; /* color of the scroll thumb */
    `}

    border-radius: 20px;
    border: 3px solid transparent; /* roundness of the scroll thumb */ /* creates padding around scroll thumb */
  }
  // FIREFOX SUPPORTED

  ${(p) => css`
    scrollbar-color: ${p.theme.colorControls} transparent; /* color of the scroll thumb */
  `}
`;
