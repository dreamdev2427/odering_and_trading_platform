import styled from 'styled-components';
import { Input as BootInput } from 'reactstrap';

const Input = styled(BootInput)`
  align-items: center;
  height: 50px;
  background: ${(p) => p.theme.backgroundControls};
  width: 100%;
  color: black;
  outline: 0 !important;
  &:focus {
    box-shadow:  0 0 7px 0 ${(p) => p.theme.colorControls}; !important;
    border-color: ${(p) => p.theme.colorControls};
    background: ${(p) => p.theme.backgroundControls};
  }
  border-radius: ${(p) => {
    switch (p.theme.typeAppCorner) {
      case 'boxy':
        return '0px';
      case 'light-round':
        return '2px';
      case 'default':
        return '6px'
      case 'rounded':
        return '26px';
      default:
        return '6px'
    }
  }};
`;

export default Input;
