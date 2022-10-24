import styled from 'styled-components';
import { CustomInput } from 'reactstrap';

const CheckBox = styled(CustomInput)`
  label {
    padding-top: 5px;
    padding-left: 5px;
  }
  .custom-control-label {
    &:before {
      border: none;
      border-radius: ${(p) => {
        switch (p.theme.typeAppCorner) {
          case 'boxy':
            return '0px !important';
          case 'light-round':
            return '2px';
          case 'default':
            return '6px'
          case 'rounded':
            return '12px';
          default:
            return '6px';
        }
      }};
      background-color: ${(p) => p.theme.colorControls};
      width: 22px;
      height: 22px;
    }
    &:after {
      border: none;
      border-radius: ${(p) => {
        switch (p.theme.typeAppCorner) {
          case 'boxy':
            return '0px !important';
          case 'light-round':
            return '2px';
          case 'default':
            return '6px'
          case 'rounded':
            return '12px';
          default:
            return '6px';
        }
      }};
      background-color: ${(p) => p.theme.colorControls};
      width: 22px;
      height: 22px;
    }
  }
`;

// id for element is required case work via jquery

export default CheckBox;
