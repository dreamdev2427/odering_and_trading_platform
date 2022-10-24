import styled from 'styled-components';

const TD = styled.td<{ max?: string; min?: string }>`
  min-width: ${(p) => p.min || '0px'};
  max-width: ${(p) => p.max || 'none'};
`;

export default TD;
