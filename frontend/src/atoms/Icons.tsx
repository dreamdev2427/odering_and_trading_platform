import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faFile,
  faTrash,
  faCopy,
  faEye,
  faSquare,
  faCircle,
  faCircleNotch,
  faExchangeAlt,
  faInfo,
  faSortAmountUp,
  faSortAmountDown,
  faComment,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';
import { Badge as BSBadge, BadgeProps } from 'reactstrap';

library.add(
  fab,
  faFile,
  faSquare,
  faTrash,
  faCopy,
  faEye,
  faCircle,
  faCircleNotch,
  faExchangeAlt,
  faInfo,
  faSortAmountDown,
  faSortAmountUp,
  faComment,
  faHeadset,
);

interface WrapProps {
  color?: string;
  pill?: boolean;
}

interface BrandIconProps extends FontAwesomeIconProps, WrapProps {}

const BrandIcon: React.FC<BrandIconProps> = ({ pill, color, ...props }) => {
  return (
    <Wrap color={color} pill={pill}>
      <FontAwesomeIcon {...props} />
    </Wrap>
  );
};

const BadgeIcon: React.FC<BadgeProps> = (props) => {
  return <Badge {...props} />;
};

const WrapIcon: React.FC<WrapProps> = ({ color, pill, children }) => {
  return (
    <Wrap color={color} pill={pill}>
      {children}
    </Wrap>
  );
};

export { FontAwesomeIcon as FontAweIcon, BrandIcon, BadgeIcon, WrapIcon };

const Wrap = styled.div<WrapProps>`
  width: 25px;
  height: 25px;
  font-size: 15px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(p) => (p.pill ? '50%' : 0)};
  background: ${(p) => (p.color ? p.theme.colors[p.color] || p.color : p.theme.colors.red)};
`;

const Badge = styled(BSBadge)`
  background: ${(p) => (p.color ? p.theme.colors[p.color] || p.color : p.theme.colors.red)};
`;
