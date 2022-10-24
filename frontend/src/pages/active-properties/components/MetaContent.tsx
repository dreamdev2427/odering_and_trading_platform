import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { Markup, Node } from 'interweave';

import { StoMetaValue } from 'services/apollo';

import ContentTabs from './ContentTabs';
import WrapMetaContent from './WrapMetaContent';

export interface MetaContentProps {
  meta: Array<StoMetaValue>;
  name: string;
}

const MetaContent: React.FC<MetaContentProps> = ({ meta, name }) => {
  const { t } = useTranslation();
  const [collapse, toggle] = useState(true);

  const content = meta.filter((x) => x.key === name);
  // get tab content meta and it has value and can be displayed
  const tabContent = meta
    .filter((x) => x.key.startsWith(name) && x.key !== name && x.display && x.value)
    .sort((a, b) => a.order - b.order);

  if (!content[0]?.value && !tabContent.length) {
    return <></>;
  }

  const handleIframe = (node: HTMLElement, children: Node[]): React.ReactNode => {
    if (node.tagName === 'IFRAME') {
      return (
        <iframe
          width={node.getAttribute('width') ?? 'auto'}
          height={node.getAttribute('height') ?? 'auto'}
          title={node.title}
          src={node.getAttribute('src') ?? ''}
          sandbox="allow-scripts allow-same-origin"
        >
          {children}
        </iframe>
      );
    }
  };

  return (
    <WrapMetaContent>
      <MetaHead className="py-2 px-4" onClick={() => toggle(!collapse)}>
        <h5 className="mb-0 w-90 d-inline">{t(name)}</h5>
        <Chevron className="ti-angle-double-left" open={collapse} />
      </MetaHead>
      <div className="p-2">
        <Collapse isOpen={collapse}>
          {tabContent.length ? (
            <ContentTabs meta={tabContent} name={name} />
          ) : (
            <Markup content={content[0].value} transform={handleIframe} />
          )}
        </Collapse>
      </div>
    </WrapMetaContent>
  );
};

export default MetaContent;

const MetaHead = styled.div`
  color: ${({ theme }) => (theme ? 'white' : 'black')};
  background-color: ${({ theme }) => (theme ? theme.backgroundSideBar : 'rgb(250, 250, 250)')};
  border-radius: 2px;
`;

export const Chevron = styled.i<{ open: boolean }>`
  color: ${(props) => (props.theme ? 'white' : 'black')};
  margin: 5px 0 0;
  font-size: 18px;
  float: right;
  transform: ${({ open }) => (open && 'rotateZ(-100grad)') || 'rotateZ(100grad)'};
  transition-duration: 0.6s;
  transition-property: transform;
  transform-origin: center;
`;
