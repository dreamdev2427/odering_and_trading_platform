import { Button as BootButton } from 'reactstrap';
import styled from 'styled-components';
import { getSuitableColor, setBackgroundColor } from 'lib/utils';

const Button = styled(BootButton)`
  min-width: ${(p) => (p.wmin ? p.wmin : 'none')};
  width: ${(p) => (p.width ? p.width : 'none')};
  ${(p) => {
    if (p.theme.colorControlsFont) {
      return `
          color: ${p.theme.colorControlsFont};
          background-color: ${p.theme.colorControls};
       `;
    }
    if (p.color === 'primary' || !p.color) {
      return `
          background-color: ${setBackgroundColor(p.theme.colorControls)};
          border-color: ${p.theme.colorControls};
          color: ${getSuitableColor(p.theme.colorControls)};
        `;
    }
  }
  }
  font-size: 12px;
  border-radius: ${(p) => {
    switch (p.theme.typeAppCorner) {
      case 'boxy':
        return '0px !important';
      case 'light-round':
        return '5px';
      case 'rounded':
        return '26px';
      default:
        return '26px'
    }
  }};
  font-weight: 500;
`;

export default Button;
