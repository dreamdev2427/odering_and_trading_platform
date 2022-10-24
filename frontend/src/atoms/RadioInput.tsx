import { CustomInput } from 'reactstrap';
import styled, { css } from 'styled-components';

const RadioInput = styled(CustomInput)<{ big?: boolean }>`
  ${p => p.big ? css`
    &.custom-control {
      padding-left: 2.5rem;

      input {
        width: 2rem;
        height: 2.25rem;
      }

      .custom-control-label {
        width: 100%;
        &:before, &:after {
          left: -2.5rem;
          width: 2rem;
          height: 2rem;
        }
      }
    }
  ` : ''}
`;

export default RadioInput;
