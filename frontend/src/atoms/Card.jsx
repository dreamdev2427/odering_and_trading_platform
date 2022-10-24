import { Card as InitCard } from 'reactstrap';
import styled from 'styled-components';

const Card = styled(InitCard)`
  max-width: ${(p) => (p.wmax ? p.wmax : 'none')};
  min-width: ${(p) => (p.wmin ? p.wmin : 'none')};
  width: ${(p) => (p.width ? p.width : 'none')};
  height: ${(p) => (p.height ? p.height : 'none')};
  border-radius: ${(p) => {
    switch (p.theme.typeAppCorner) {
      case 'boxy':
        return '0px';
      case 'light-round':
        return '6px';
      case 'default':
        return '12px'
      case 'rounded':
        return '26px';
      default:
        return '12px';
    }
  }};
`;

export default Card;
